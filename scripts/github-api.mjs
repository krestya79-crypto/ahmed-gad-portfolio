import { classifyRepository, normalizeName, safeWebUrl } from '../src/github-metadata.js';

const api = 'https://api.github.com';
const sleep = ms => new Promise(resolve=>setTimeout(resolve,ms));
const nonnegative = n => Number.isSafeInteger(n)&&n>=0?n:0;
export function publicRepository(repo, username, languages={}) {
  // Fail closed. Check privacy and ownership BEFORE using names or fetching languages.
  if (repo?.private !== false || repo.visibility !== 'public' || repo.owner?.login?.toLowerCase() !== username.toLowerCase()) return null;
  if (!Number.isSafeInteger(repo.id) || !/^[\w.-]+$/.test(repo.name || '')) return null;
  const url = `https://github.com/${username}/${repo.name}`;
  const safeLanguages=Object.fromEntries(Object.entries(languages).filter(([k,v])=>k.length<100&&Number.isFinite(v)&&v>=0));
  const output={id:repo.id,name:repo.name,description:typeof repo.description==='string'?repo.description:null,url,homepage:safeWebUrl(repo.homepage),language:typeof repo.language==='string'?repo.language:null,languages:safeLanguages,stars:nonnegative(repo.stargazers_count),forks:nonnegative(repo.forks_count),updatedAt:Number.isNaN(Date.parse(repo.updated_at))?null:repo.updated_at,topics:Array.isArray(repo.topics)?repo.topics.filter(t=>typeof t==='string'):[],visibility:'public',owner:username,fork:repo.fork===true,archived:repo.archived===true};
  output.categories=classifyRepository(output);
  return output;
}
export function unavailableSnapshot(username, now=new Date()) {
  // No stale repository metadata: a previously public project may have become private.
  return {schemaVersion:1,status:'unavailable',generatedAt:now.toISOString(),profile:{username,url:`https://github.com/${username}`,contributionsUrl:`https://github.com/${username}?tab=overview`,publicRepositoryCount:null,followers:null},repositories:[],pagesFetched:0};
}
export async function requestJson(url,{fetchImpl=fetch,token,wait=sleep,now=Date.now}={}) {
  if (new URL(url).origin!==api) throw new Error('Invalid API origin');
  for(let attempt=0;attempt<3;attempt++){
    let response;
    try {response=await fetchImpl(url,{headers:{Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28',...(token?{Authorization:`Bearer ${token}`}:{})},signal:AbortSignal.timeout(12000)});} catch {if(attempt===2)throw new Error('GitHub API unavailable');await wait(500*(attempt+1));continue;}
    if(response.ok) return {data:await response.json(),headers:response.headers};
    const retryAfter=Number(response.headers.get('retry-after'));
    const reset=Number(response.headers.get('x-ratelimit-reset'))*1000;
    const limited=response.status===429||response.status===403;
    if((limited||response.status>=500)&&attempt<2){
      const delay=limited ? (retryAfter>0?retryAfter*1000:(reset>now()?reset-now():1500*(attempt+1))) : 500*(attempt+1);
      // A long reset must not stall Pages deployment. Fail to the safe public-profile fallback.
      if(delay>15000)throw new Error('GitHub API rate limit; safe fallback selected');
      await wait(Math.max(250,delay));continue;
    }
    throw new Error(`GitHub API request failed (${response.status})`);
  }
}
export async function fetchPublicGithub(config,{perPage=100,...options}={}) {
  const username=config.username;
  if(!/^[a-z\d](?:[a-z\d-]{0,38})$/i.test(username))throw new Error('Invalid GitHub username');
  if(!Number.isInteger(perPage)||perPage<1||perPage>100)throw new Error('Invalid page size');
  const {data:profile}=await requestJson(`${api}/users/${username}`,options);
  if(profile.login?.toLowerCase()!==username.toLowerCase())throw new Error('GitHub identity mismatch');
  const allowedPaths=[`/users/${username}/repos`.toLowerCase(),...(Number.isSafeInteger(profile.id)?[`/user/${profile.id}/repos`]:[])];
  let next=`${api}/users/${username}/repos?type=owner&sort=full_name&per_page=${perPage}&page=1`;
  const seenPages=new Set(),repos=new Map();
  while(next){
    const parsed=new URL(next);
    if(parsed.origin!==api||!allowedPaths.includes(parsed.pathname.toLowerCase())||seenPages.has(next))throw new Error('Invalid pagination');
    seenPages.add(next);
    const {data,headers}=await requestJson(next,options);
    if(!Array.isArray(data))throw new Error('Unexpected repository response');
    for(const raw of data){const repo=publicRepository(raw,username);if(repo)repos.set(repo.id,{raw,repo});}
    next=headers.get('link')?.match(/<([^>]+)>;\s*rel="next"/)?.[1]||null;
  }
  const featured=config.featured.map(normalizeName),result=[];
  for(const {raw,repo} of repos.values()){
    const {data:languages}=await requestJson(`${api}/repos/${username}/${encodeURIComponent(repo.name)}/languages`,options);
    const complete=publicRepository(raw,username,languages);
    complete.featuredRank=featured.indexOf(normalizeName(repo.name));
    complete.featured=complete.featuredRank>=0||config.autoFeatureCategories.some(c=>complete.categories.includes(c));
    result.push(complete);
  }
  result.sort((a,b)=>Number(b.featured)-Number(a.featured)||(a.featuredRank<0?999:a.featuredRank)-(b.featuredRank<0?999:b.featuredRank)||(b.updatedAt||'').localeCompare(a.updatedAt||'')||a.name.localeCompare(b.name));
  return {schemaVersion:1,status:'ready',generatedAt:new Date().toISOString(),profile:{username,url:`https://github.com/${username}`,contributionsUrl:`https://github.com/${username}?tab=overview`,publicRepositoryCount:result.length,followers:nonnegative(profile.followers)},repositories:result,pagesFetched:seenPages.size};
}
