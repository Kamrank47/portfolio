# Kamran Hashmi — portfolio

A static portfolio for a DevOps engineer, built with Astro and deployed on Cloudflare Pages.
Two CVs are generated from the same source and shipped with the site.

## What's in here

| Path | Purpose |
| --- | --- |
| `src/pages/index.astro` | Home page: hero, impact, selected work, stack, experience, writing, contact |
| `src/pages/resume.astro` | Resume page with both CV downloads and page previews |
| `src/data/profile.ts` | All content. Edit copy here, not in the templates |
| `src/styles/global.css` | Design tokens, layout and components |
| `cv/reference.html` | Traditional two-page CV (ATS-friendly, single column) |
| `cv/modern.html` | Modern two-page CV (impact-first layout) |
| `cv/og.html` | 1200x630 social card |
| `scripts/build-cv.mjs` | Renders both CVs to PDF, plus previews and `og.png` |
| `public/resume/` | Generated PDFs and preview images (committed) |

## Local development

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static output in dist/
npm run preview    # serve dist/
```

Node 22 (see `.nvmrc`).

## Regenerating the CVs

The CVs are HTML with print CSS, rendered to A4 PDF with Chromium through Playwright.

```bash
npm run cv
```

This writes:

- `public/resume/Kamran-Hashmi-CV.pdf` — traditional format
- `public/resume/Kamran-Hashmi-CV-Modern.pdf` — modern format
- `public/resume/preview-reference.png`, `preview-modern.png` — page-one previews
- `public/og.png` — social card

If Chromium is not already installed for Playwright, either install it
(`npx playwright install chromium`) or point at an existing binary:

```bash
CHROMIUM_PATH=/usr/bin/chromium npm run cv
```

Both PDFs are two A4 pages. If an edit pushes one to three pages, tighten the
spacing in the relevant `cv/*.html` rather than shrinking type below 8.5pt.

## Deploying to Cloudflare Pages

### Option A: Cloudflare Git integration (automatic deploys)

1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Select this repository.
3. Build settings:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node version: set `NODE_VERSION=22` if the build image defaults to something older.
4. Save and deploy. Every push to `main` deploys to production; every other branch gets a preview URL.

### Option B: Deploy from GitHub Actions

Set the repository variable `ENABLE_CLOUDFLARE_DEPLOY` to `true`, then add:

- `CLOUDFLARE_API_TOKEN` — token with **Cloudflare Pages: Edit** permission
- `CLOUDFLARE_ACCOUNT_ID`

`.github/workflows/deploy.yml` builds and deploys with Wrangler. You can also run it
manually from the Actions tab. Use one option, not both, to avoid duplicate deploys.

### Option C: Deploy from this machine

```bash
npx wrangler login
npx wrangler pages project create kamranhashmi --production-branch main
npx wrangler pages deploy dist --project-name kamranhashmi
```

## CI

`.github/workflows/ci.yml` runs on every push and pull request:

1. `npm ci`
2. `npm run build`
3. Verifies the expected static files exist (including both CV PDFs and `og.png`)
4. Runs `scripts/check-links.mjs` to catch broken internal links
5. Uploads the build as an artifact

## Custom domain

In the Pages project, open **Custom domains** and add the domain. If DNS is on
Cloudflare, the CNAME is created automatically. Update `site` in
`astro.config.mjs` and the absolute URLs in `public/robots.txt` to match, then
rebuild so canonical and social URLs point at the real domain.

## Security

Details in [SECURITY.md](SECURITY.md). The deployed site sends a strict CSP
(`script-src 'self'`, `style-src 'self'`, no `unsafe-inline`), HSTS, frame denial,
`nosniff`, COOP/CORP and a restrictive Permissions-Policy from `public/_headers`.
`scripts/check-csp.mjs` fails CI if a build reintroduces inline scripts, inline
style attributes or inline event handlers. Dependabot, CodeQL and secret scanning
with push protection are enabled on the repository.

Report a vulnerability to kamranali.k47@gmail.com.

## Content edits

- Copy and metrics: `src/data/profile.ts`
- CV wording: `cv/reference.html` and `cv/modern.html`, then `npm run cv`
- Colours, type and spacing: the token block at the top of `src/styles/global.css`
