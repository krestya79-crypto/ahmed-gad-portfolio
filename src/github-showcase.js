import { categories, safeWebUrl } from './github-metadata.js';
import './github-showcase.css';
import config from '../github.config.json';

const escape = value => String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const branchIcon='<svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><circle cx="9" cy="7" r="3"/><circle cx="23" cy="8" r="3"/><circle cx="9" cy="25" r="3"/><path d="M9 10v12m14-11v2c0 5-14 3-14 8"/></svg>';
const date = value => value&&!Number.isNaN(Date.parse(value))?new Intl.DateTimeFormat('en',{dateStyle:'medium',timeZone:'UTC'}).format(new Date(value)):'Not provided';
const external = (url,text,cls='') => `<a class="${cls}" href="${escape(url)}" target="_blank" rel="noopener noreferrer">${text}</a>`;

export async function mountGithubShowcase({container,onLayoutChange=()=>{},onRepository=()=>{}}) {
  const root=document.createElement('div');root.className='github-collection';root.id='github-projects';
  root.innerHTML='<div class="section-kicker">PUBLIC GITHUB COLLECTION</div><h3 class="archive-title">The engineering archive.</h3><p role="status">Loading the public project collection…</p>';
  container.appendChild(root);
  const username=config.username,profileUrl=`https://github.com/${username}`;
  const fallback=()=>{root.innerHTML=`<div class="section-kicker">PUBLIC GITHUB COLLECTION</div><h3 class="archive-title">The engineering archive.</h3><div class="github-fallback" role="status"><h4>The collection is taking a moment.</h4><p>Repository details are temporarily unavailable. You can still explore my public work directly on GitHub.</p>${external(profileUrl+'?tab=repositories','Explore public repositories','button primary')}</div>`;onLayoutChange();};
  let data;
  try {
    const response=await fetch(`${import.meta.env.BASE_URL}data/github.json`,{signal:AbortSignal.timeout(10000)});
    if(!response.ok)throw new Error('Collection unavailable');data=await response.json();
    if(data.status!=='ready'||data.profile?.username!==username||!Array.isArray(data.repositories))throw new Error('Collection unavailable');
  } catch {fallback();return;}
  // Only allow the serialized, explicitly public entries to reach the DOM.
  const repos=data.repositories.filter(r=>r.visibility==='public'&&r.owner===username&&safeWebUrl(r.url)===`https://github.com/${username}/${r.name}`);
  repos.forEach(onRepository);
  const counts=Object.fromEntries(categories.map(c=>[c,c==='All Projects'?repos.length:repos.filter(r=>r.categories.includes(c)).length]));
  const followers=Number.isSafeInteger(data.profile.followers)?`<div><strong>${data.profile.followers}</strong><span>Followers</span></div>`:'';
  root.innerHTML=`<div class="archive-heading"><div><div class="section-kicker">PUBLIC GITHUB COLLECTION</div><h3 class="archive-title">The engineering archive.</h3><p>Experiments, explorations, and systems in the making.<br>Every public repository. Every part of the journey.</p></div><span class="archive-emblem" aria-hidden="true">${branchIcon}</span></div>
  <div class="github-profile"><div class="github-identity"><span class="github-mark" aria-hidden="true">${branchIcon}</span><div><span class="github-label">ON GITHUB</span>${external(profileUrl,`@${escape(username)}`,'github-username')}</div></div><div class="github-stats"><div><strong>${repos.length}</strong><span>Public repositories</span></div>${followers}</div><div class="github-profile-links">${external(profileUrl+'?tab=repositories','View repositories')}${external(profileUrl+'?tab=overview','Contribution profile')}</div></div>
  <div class="archive-controls"><div class="repository-filters" role="group" aria-label="Filter GitHub projects">${categories.map((c,i)=>`<button type="button" data-category="${escape(c)}" aria-pressed="${i===0}">${escape(c)}<span>${counts[c]}</span></button>`).join('')}</div><div class="archive-search-row"><label class="repository-search"><span>Search projects</span><input type="search" id="repository-search" placeholder="Name, topic, or technology…" autocomplete="off"></label><label class="repository-sort"><span>Sort collection</span><select id="repository-sort"><option value="featured">Featured & recent</option><option value="updated">Recently updated</option><option value="name">Name A–Z</option><option value="stars">Most stars</option></select></label></div></div>
  <div class="archive-results-bar"><p id="repository-results" role="status" aria-live="polite"></p><span>Public snapshot · ${escape(date(data.generatedAt))}</span></div><div class="repository-grid"></div><div class="repository-empty" hidden><h4>No matching projects.</h4><p>Try another discipline or clear your search to explore the full collection.</p><button type="button" class="underlined" id="reset-repository-filters">Reset filters <span>+</span></button></div><div class="archive-note">Only public repositories are shown. Forks and archived work are included and labeled. ${external(profileUrl+'?tab=repositories','Explore on GitHub')}</div>`;
  const grid=root.querySelector('.repository-grid'),search=root.querySelector('input'),sort=root.querySelector('select');let selected='All Projects';
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('repo-entered');observer.unobserve(e.target);}}),{threshold:.08});
  const render=()=>{
    observer.disconnect();const query=search.value.trim().toLowerCase();
    const visible=repos.filter(r=>(selected==='All Projects'||r.categories.includes(selected))&&[r.name,r.description,...r.topics,...Object.keys(r.languages),r.language].filter(Boolean).join(' ').toLowerCase().includes(query));
    if(sort.value==='updated')visible.sort((a,b)=>(b.updatedAt||'').localeCompare(a.updatedAt||''));
    if(sort.value==='name')visible.sort((a,b)=>a.name.localeCompare(b.name));
    if(sort.value==='stars')visible.sort((a,b)=>b.stars-a.stars||a.name.localeCompare(b.name));
    root.querySelector('#repository-results').textContent=`${visible.length} of ${repos.length} public repositories${selected==='All Projects'?'':` · ${selected}`}`;
    root.querySelector('.repository-empty').hidden=visible.length!==0;
    grid.innerHTML=visible.map(r=>`<article class="repo-card ${r.featured?'repo-featured':''}" data-repository="${escape(r.name)}"><div class="repo-top"><span class="repo-branch" aria-hidden="true">${branchIcon}</span><div class="repo-badges">${r.featured?'<span class="featured-label">Featured</span>':''}${r.fork?'<span>Fork</span>':''}${r.archived?'<span class="archived-label">Archived</span>':''}<span>Public</span></div></div><h4>${escape(r.name)}</h4><p class="repo-description">${escape(r.description||'No description provided on GitHub.')}</p><div class="repo-tags" aria-label="Repository languages and topics">${[...new Set([r.language,...Object.keys(r.languages),...r.topics].filter(Boolean))].map(t=>`<span>${escape(t)}</span>`).join('')||'<span>Technology not specified</span>'}</div><div class="repo-metadata"><span>${escape(r.language||'Language not specified')}</span><span aria-label="${r.stars} stars">☆ ${r.stars}</span><span aria-label="${r.forks} forks">⑂ ${r.forks}</span></div><div class="repo-updated">Updated <time ${r.updatedAt?`datetime="${escape(r.updatedAt)}"`:''}>${escape(date(r.updatedAt))}</time></div><div class="repo-links">${external(r.url,'GitHub repository','repo-source')}${safeWebUrl(r.homepage)?external(safeWebUrl(r.homepage),'Live demo','repo-demo'):''}</div></article>`).join('');
    grid.querySelectorAll('.repo-card').forEach(card=>{
      observer.observe(card);
      card.addEventListener('pointermove',event=>{if(reduced.matches||event.pointerType==='touch')return;const rect=card.getBoundingClientRect();const x=(event.clientX-rect.left)/rect.width-.5,y=(event.clientY-rect.top)/rect.height-.5;card.style.setProperty('--tilt-x',`${-y*4}deg`);card.style.setProperty('--tilt-y',`${x*4}deg`);card.style.setProperty('--shine-x',`${(x+.5)*100}%`);});
      card.addEventListener('pointerleave',()=>{card.style.setProperty('--tilt-x','0deg');card.style.setProperty('--tilt-y','0deg');});
    });onLayoutChange();
  };
  root.querySelectorAll('[data-category]').forEach(button=>button.onclick=()=>{selected=button.dataset.category;root.querySelectorAll('[data-category]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));render();});
  search.addEventListener('input',render);sort.addEventListener('change',render);
  root.querySelector('#reset-repository-filters').onclick=()=>{search.value='';sort.value='featured';root.querySelector('[data-category="All Projects"]').click();};
  render();
}
