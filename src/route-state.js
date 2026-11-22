export function resolveRoute(hash='') {
  const value=hash.replace(/^#/,'').replace(/\/$/,'')||'/';
  if(['work','github-projects','/projects'].includes(value))return {page:'projects'};
  if(value==='research'||value==='/research')return {page:'research'};
  if(value==='/hackathons')return {page:'hackathons'};
  const project=value.match(/^\/projects\/([a-z0-9-]+)$/);
  if(project)return {page:'case-study',id:project[1]};
  if(value.startsWith('/projects/')||value.startsWith('/')&&value!=='/')return {page:'not-found'};
  return {page:'home',anchor:value==='/'?'home':value};
}
