import test from 'node:test';
import assert from 'node:assert/strict';
import {resolveRoute} from '../src/route-state.js';

test('dedicated destinations are compatible with static hash navigation',()=>{
  for(const page of ['projects','hackathons','research'])assert.deepEqual(resolveRoute('#/'+page),{page});
  for(const id of ['nasa','ecomind','sakina'])assert.deepEqual(resolveRoute('#/projects/'+id),{page:'case-study',id});
  assert.deepEqual(resolveRoute('#/projects/nasa/'),{page:'case-study',id:'nasa'});
});
test('home anchors and previously published project bookmarks still resolve',()=>{
  assert.deepEqual(resolveRoute(''),{page:'home',anchor:'home'});
  assert.deepEqual(resolveRoute('#/'),{page:'home',anchor:'home'});
  assert.deepEqual(resolveRoute('#about'),{page:'home',anchor:'about'});
  assert.deepEqual(resolveRoute('#experience'),{page:'home',anchor:'experience'});
  for(const hash of ['#work','#github-projects'])assert.deepEqual(resolveRoute(hash),{page:'projects'});
  assert.deepEqual(resolveRoute('#research'),{page:'research'});
});
test('invalid destinations and unsafe case-study paths do not become HTML',()=>{
  assert.deepEqual(resolveRoute('#/unexpected'),{page:'not-found'});
  assert.deepEqual(resolveRoute('#/projects/<script>'),{page:'not-found'});
});
