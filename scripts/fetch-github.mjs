import { readFile, mkdir, writeFile, rename } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { fetchPublicGithub, unavailableSnapshot } from './github-api.mjs';

const root=new URL('../',import.meta.url);
const config=JSON.parse(await readFile(new URL('github.config.json',root),'utf8'));
let snapshot;
try {
  snapshot=await fetchPublicGithub(config,{token:process.env.GITHUB_TOKEN||process.env.GH_TOKEN,perPage:Number(process.env.GITHUB_PAGE_SIZE||100)});
  console.log(`GitHub: fetched ${snapshot.repositories.length} public repositories across ${snapshot.pagesFetched} page(s).`);
} catch {
  // Do not log response bodies, credentials, or unfiltered repository payloads.
  console.warn('GitHub public feed unavailable or rate limited. Building a safe profile-link fallback.');
  snapshot=unavailableSnapshot(config.username);
}
const dir=new URL('public/data/',root);await mkdir(dir,{recursive:true});
const target=new URL('github.json',dir),temporary=new URL('github.json.tmp',dir);
await writeFile(temporary,JSON.stringify(snapshot,null,2)+'\n');await rename(fileURLToPath(temporary),fileURLToPath(target));
