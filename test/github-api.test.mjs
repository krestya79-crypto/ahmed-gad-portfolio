import test from 'node:test';
import assert from 'node:assert/strict';
import {fetchPublicGithub,publicRepository,unavailableSnapshot,requestJson} from '../scripts/github-api.mjs';
import {classifyRepository,safeWebUrl} from '../src/github-metadata.js';

const config={username:'researcher',featured:['EcoMind AI','Sakina'],autoFeatureCategories:['Artificial Intelligence','AI Security']};
const raw=(name,extra={})=>({id:name.length,name,private:false,visibility:'public',owner:{login:'researcher'},description:null,language:null,topics:[],updated_at:'2026-11-22T10:00:00Z',stargazers_count:0,forks_count:0,...extra});
const json=(data,headers={},status=200)=>new Response(JSON.stringify(data),{status,headers});
test('pagination retrieves originals, forks and archives; filters privacy before enrichment',async()=>{
  const calls=[];
  const snapshot=await fetchPublicGithub(config,{perPage:2,fetchImpl:async url=>{calls.push(url);if(url.endsWith('/users/researcher'))return json({id:42,login:'researcher',followers:4});
    if(url.includes('page=1'))return json([raw('Sakina',{id:1}),raw('private-secret',{id:2,private:true,visibility:'private'})],{link:'<https://api.github.com/user/42/repos?page=2>; rel="next"'});
    if(url.includes('page=2'))return json([raw('forked',{id:3,fork:true}),raw('archived',{id:4,archived:true}),raw('outsider',{id:5,owner:{login:'someone-else'}})]);
    if(url.endsWith('/languages'))return json({Python:100});throw new Error('Unexpected URL');}});
  assert.equal(snapshot.pagesFetched,2);assert.equal(snapshot.repositories.length,3);assert.equal(snapshot.profile.publicRepositoryCount,3);assert.equal(snapshot.profile.followers,4);
  assert.equal(snapshot.repositories[0].name,'Sakina');assert(snapshot.repositories.find(r=>r.fork));assert(snapshot.repositories.find(r=>r.archived));
  assert(!JSON.stringify(snapshot).includes('private-secret'));assert(!calls.some(u=>u.includes('private-secret')||u.includes('outsider')));
});
test('serializer rejects ambiguous privacy and uses an explicit field allowlist',()=>{
  assert.equal(publicRepository(raw('hidden',{private:undefined}),'researcher'),null);assert.equal(publicRepository(raw('internal',{visibility:'internal'}),'researcher'),null);
  const repo=publicRepository(raw('safe',{token:'not-for-public',permissions:{admin:true},security_and_analysis:{secret:'private'}}),'researcher');assert(!JSON.stringify(repo).includes('not-for-public'));assert(!('permissions' in repo));assert(!('security_and_analysis' in repo));
});
test('categories use explicit metadata, without inferring AI or security from names',()=>{
  assert.deepEqual(classifyRepository({name:'Super-AI-security',description:null,topics:[],language:null,languages:{}}),['Other Technologies']);
  assert.deepEqual(classifyRepository({language:'C++',topics:[],languages:{}}),['C++']);
  assert(classifyRepository({topics:['ai-security'],languages:{}}).includes('AI Security'));
  assert(classifyRepository({description:'AI-powered support chatbot',languages:{}}).includes('Artificial Intelligence'));
  assert(!classifyRepository({description:'AI-powered support chatbot',languages:{}}).includes('Machine Learning'));
  assert(!classifyRepository({description:'Portfolio of an engineer specializing in AI Security',languages:{}}).includes('AI Security'));
  assert(classifyRepository({language:'JavaScript',languages:{Python:200},topics:['machine-learning']}).includes('Python'));
});
test('missing metadata and unsafe homepage URLs degrade safely',()=>{
  const repo=publicRepository(raw('minimal',{homepage:'javascript:alert(1)',updated_at:'bad'}),'researcher');assert.equal(repo.description,null);assert.equal(repo.language,null);assert.equal(repo.homepage,null);assert.equal(repo.updatedAt,null);assert.deepEqual(repo.categories,['Other Technologies']);assert.equal(safeWebUrl('https://user:password@example.com'),null);assert.equal(safeWebUrl('https://example.com'),'https://example.com/');
});
test('short rate limits retry, long rate limits stop without leaking response payloads',async()=>{
  let requests=0;const waits=[];
  const result=await requestJson('https://api.github.com/users/researcher',{wait:async n=>waits.push(n),fetchImpl:async()=>++requests===1?json({message:'secret response'}, {'retry-after':'1'},429):json({ok:true})});assert.equal(result.data.ok,true);assert.deepEqual(waits,[1000]);
  await assert.rejects(requestJson('https://api.github.com/users/researcher',{fetchImpl:async()=>json({message:'secret response'},{'retry-after':'3600'},403),wait:async()=>assert.fail('Must not wait an hour')}),/rate limit/);
});
test('network outages retry within budget and safe fallback exposes no cached repositories',async()=>{
  let count=0;await assert.rejects(requestJson('https://api.github.com/users/researcher',{fetchImpl:async()=>{count++;throw new Error('secret credential');},wait:async()=>{}}),/unavailable/);assert.equal(count,3);
  const fallback=unavailableSnapshot('researcher');assert.equal(fallback.status,'unavailable');assert.deepEqual(fallback.repositories,[]);assert.equal(fallback.profile.publicRepositoryCount,null);assert.equal(fallback.profile.followers,null);
});
test('pagination cannot exfiltrate the build token to another host',async()=>{
  await assert.rejects(fetchPublicGithub(config,{token:'build-only-secret',fetchImpl:async url=>url.endsWith('/users/researcher')?json({login:'researcher'}):json([],{link:'<https://untrusted.example/repositories>; rel="next"'})}),/pagination/);
});
