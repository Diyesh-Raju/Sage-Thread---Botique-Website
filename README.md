# Sage Thread — Boutique Website

A boutique website with five pages — **Home, Furniture, Fashion, Marble, Contact** — each with its own colour theme, font pairing, imagery, video and scroll animations. Built with **Next.js (App Router)** and statically prerendered, so it deploys to Vercel with zero configuration.

## Why it's smooth on every browser
- **Statically prerendered** — every route is generated to static HTML at build time; nothing is rendered on the server at request time.
- **Animations use only `transform` + `opacity`** (GPU-accelerated) — no layout thrash, no jank.
- **Scroll reveals use `IntersectionObserver`** (not scroll math), with a single throttled `requestAnimationFrame` loop for the sticky header + parallax. All listeners are `passive`.
- **`prefers-reduced-motion`** is fully respected.
- **Self-hosted, optimised media** — images are sized/compressed, videos are short H.264 **mp4 + VP9 webm** with poster frames and `playsInline` (so iOS Safari autoplays them). Marble textures are tiny procedural **SVG**.

## Structure
```
app/layout.js            root layout (imports base.css, mounts interactions)
app/page.js              Home          app/base.css       shared styles + components + animations
app/furniture/page.js    Furniture     app/home.css       per-page palette + fonts
app/fashion/page.js      Fashion       app/furniture.css
app/marble/page.js       Marble        app/fashion.css
app/contact/page.js      Contact       app/marble.css
components/Header.js      shared nav                       app/contact.css
components/SiteScripts.js client-side interactions (IntersectionObserver, counters, parallax, forms, tilt)
public/assets/img/*      images + marble SVGs + video posters
public/assets/video/*    optimised mp4 + webm clips
```

Each page imports `base.css` (shared) plus its own page stylesheet. Next.js scopes the per-page CSS to that route, so each page keeps its own `:root` palette and Google Fonts with no cross-page bleed.

## Run locally
```bash
npm install
npm run dev      # http://localhost:3000
```
Production build:
```bash
npm run build && npm run start
```

## Deploy to Vercel
1. Push this repo to GitHub/GitLab/Bitbucket.
2. In Vercel: **Add New → Project → Import** the repo.
3. Vercel auto-detects the **Next.js** preset — leave the build settings at their defaults.
4. Deploy.

## Customising
- **Brand name**: replace `Sage Thread` / `boutique` in `components/Header.js` and each page's footer.
- **Colours / fonts per page**: edit the `:root` block at the top of each `app/<page>.css`, and the Google Fonts `<link>` near the top of the matching `app/<page>/page.js`.
- **Images**: drop your own into `public/assets/img/` using the same filenames (or update the `src`s).
- **Contact form / newsletter**: currently front-end only (no backend). Point them at Formspree, your API, etc.
