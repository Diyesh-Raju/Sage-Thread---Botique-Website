# Sage Thread — Boutique Website

A fast, fully static boutique website with five pages — **Home, Furniture, Fashion, Marble, Contact** — each with its own colour theme, font pairing, imagery, video and scroll animations. Built with plain HTML/CSS/JS (no build step) so it deploys to Vercel effortlessly and runs smoothly on every browser.

## Why it's smooth on every browser
- **No framework, no build step** — just static files. Nothing can fail at deploy time.
- **Animations use only `transform` + `opacity`** (GPU-accelerated) — no layout thrash, no jank.
- **Scroll reveals use `IntersectionObserver`** (not scroll math), with a single throttled `requestAnimationFrame` loop for the sticky header + parallax. All listeners are `passive`.
- **`prefers-reduced-motion`** is fully respected.
- **Self-hosted, optimised media** — images are sized/compressed, videos are short H.264 **mp4 + VP9 webm** with poster frames and `playsinline` (so iOS Safari autoplays them). Marble textures are tiny procedural **SVG**.

## Structure
```
index.html        Home          css/base.css      shared styles + components + animations
furniture.html    Furniture     css/home.css      per-page palette + fonts
fashion.html      Fashion       css/furniture.css
marble.html       Marble        css/fashion.css
contact.html      Contact       css/marble.css
js/main.js        interactions  css/contact.css
assets/img/*      images + marble SVGs + video posters
assets/video/*    optimised mp4 + webm clips
```

## Run locally
Any static server works, e.g.:
```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy to Vercel
1. Push this folder to a Git repo (GitHub/GitLab/Bitbucket).
2. In Vercel: **Add New → Project → Import** the repo.
3. Framework preset: **Other**. Build command: **(none)**. Output dir: **/** (root).
4. Deploy. That's it — `vercel.json` adds long-lived caching for `/assets`.

> The `node_modules`, `_shot.mjs`, `_diag.mjs` and `_gen_marble.py` files are **dev-only** (used to generate marble textures and take test screenshots) and are git-ignored. They are not part of the site and not needed to deploy.

## Customising
- **Brand name**: replace `Sage Thread` / `boutique` in the header & footer of each `.html`.
- **Colours / fonts per page**: edit the `:root` block at the top of each `css/<page>.css`.
- **Images**: drop your own into `assets/img/` using the same filenames (or update the `src`s).
- **Marble textures**: tweak colours/seeds in `assets/img/_gen_marble.py`, then `python3 assets/img/_gen_marble.py`.
- **Contact form / newsletter**: currently front-end only (no backend). Point them at Formspree, your API, etc.
```
```
