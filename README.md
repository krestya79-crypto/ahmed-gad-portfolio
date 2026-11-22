# Ahmed Waleed Gad — AI Security Portfolio

A responsive portfolio built with Vite, Three.js, and GSAP. The suspended profile card has a spring entrance and pointer-driven perspective. The on-demand Three.js neural network pauses off screen; motion controls and reduced-motion preferences are supported.

## Run locally

```sh
npm install
npm run dev
```

## Production

```sh
npm run build
npm run preview
```

The deployable output is `dist/`.

## GitHub Pages deployment

Repository: https://github.com/krestya79-crypto/ahmed-gad-portfolio

Live website: https://krestya79-crypto.github.io/ahmed-gad-portfolio/

Every push to `main` runs `.github/workflows/deploy.yml`: clean dependency installation with `npm ci`, Vite production build, Pages artifact upload, and deployment through the official GitHub Actions. You can also run it manually from the Actions tab. The repository Pages source must be **GitHub Actions**.

Vite's base is `/ahmed-gad-portfolio/`. Portrait and CV paths use `import.meta.env.BASE_URL`; Vite rewrites bundled JavaScript, CSS, favicon, and the lazy-loaded Three.js chunk. Navigation uses section hashes, so static hosting needs no server route fallback. To preview locally, run `npm run preview` after building and open the printed URL with `/ahmed-gad-portfolio/` appended.

All functionality runs in the browser. There is no backend, SSR, API route, or server-side form. Email opens the visitor's mail client. Google Fonts loads externally with local sans-serif fallbacks. Project demo, source-code, and credential URLs are displayed only when supplied; missing destinations remain clearly labeled. The personal portrait uses transparent 640px and 960px WebP versions, and the Three.js scene loads as it approaches the viewport, pauses outside it, and caps pixel ratio.

## GitHub project collection

`github.config.json` records the GitHub username verified against the authenticated CLI and Git remote. Its ordered `featured` array accepts repository names (spaces, punctuation, and case are normalized); EcoMind and Sakina aliases are initially prioritized. `autoFeatureCategories` highlights repositories with explicit AI metadata. EcoMind remains a CV-backed case study until a matching public repository exists; Sakina links to its verified repository.

`npm run build` first runs `scripts/fetch-github.mjs`. It follows every REST API pagination link, keeps owned repositories only when `private` is explicitly false and `visibility` is public, includes forks and archived repositories, and retrieves each public repository's language breakdown. It writes only an allowlist of public metadata to `public/data/github.json`. The file is generated and ignored by Git. Vite copies it to `dist/data/github.json`; the browser reads that static file under the repository base path and never calls the GitHub API or receives a token. `npm run dev` also refreshes this data; `npm run github:sync` refreshes it independently.

GitHub Actions passes its short-lived built-in `GITHUB_TOKEN` only to the build step. No personal access token is required. Short API rate limits and server errors have bounded retries; long reset times, network outages, or incomplete collection retrieval produce a safe profile-link fallback. No stale repository cache is published after a failure, since a previously public repository may have become private. Previously deployed static data remains a snapshot until the next successful deployment; trigger the workflow after changing repository visibility if it needs immediate updating.

Filters use topics, complete language breakdowns, and explicit AI/ML claims in repository descriptions. AI Security requires an explicit security-related AI topic, avoiding classification based on a portfolio owner's job title. Names alone never determine categories. Unknown projects are classified as Other Technologies. An empty filter is a valid state, not an invented category match. Zero stars/followers are displayed as actual zeros.

Pushes to `main` regenerate the feed and deploy it automatically. Changes in other repositories appear after the next portfolio build; run the workflow manually from GitHub Actions to refresh without a code change. No scheduled task has been added.

Run `npm test` for privacy, pagination, categories, missing metadata, unsafe URLs, bounded rate-limit retries, API failure, and pagination origin checks. No backend or extra dependencies are required.

## Update content

Edit `src/content.js`. Facts are transcribed from the supplied Ahmed_Gad_CV.pdf and brief. No proficiency percentages or unsupported project stacks are included. Add verified GitHub, project demo, or credential URLs when available; missing URLs do not produce broken links.

The profile portrait uses Ahmed's supplied photograph, with the original venue removed and subtle cinematic rim lighting. Optimized transparent WebP assets live in `public/images/`; the full-resolution edited master is preserved in `design/portrait/`. Set `profile.photo` and `profile.photoLarge` to update both responsive versions. The card environment, reflections, and shadows are applied in `src/portrait.css` without painting over the face. Replace `public/Ahmed_Gad_CV.pdf` to update the downloadable CV. Project visualizations remain conceptual illustrations, not screenshots of the projects.

`src/main.js` contains the sections and UI interactions; `src/scene.js` owns Three.js resources; `src/style.css` contains responsive layouts and reduced-motion styles. No backend or contact-form data collection is required: contact uses the verified email and LinkedIn URL.

## Verification

Production build and browser checks covered desktop (1440px), mobile (390px), horizontal overflow, skills expansion, project and research dialogs, Escape behavior, CV download response, certificate expansion, network loading and pause, mobile navigation, reduced motion, and runtime errors.
