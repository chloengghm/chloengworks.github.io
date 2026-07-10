# Chloe Ng Hui Min — Portfolio

The PDF portfolio rebuilt as a real React + Vite site: selectable text, working
links (LinkedIn, YouTube, Figma, Canva, Wix, TikTok, Instagram), fully responsive.

## Run it locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs to /dist
```

## Where to edit
- **`src/data.js`** — all the words and links. Titles, years, descriptions, and every
  `href` live here. Change text, reorder projects, or set a card's `href` to `null`
  to make it non-clickable. This is the only file you need for content edits.
- **`src/assets/`** — the screenshots (named `hero.jpg`, `smu_research.jpg`, …).
  Drop in a replacement with the same filename to swap an image.
- **`src/styles.css`** — colours, spacing, fonts. Brand colours are the `--…` variables at the top.
- **`src/App.jsx`** — layout/structure, only if you want to change how sections are arranged.

## Deploy
**Vercel** — push to GitHub and "Import Project", or run `npx vercel`. Framework preset
auto-detects Vite; no config needed.

**GitHub Pages** — `npm run build`, then publish the `dist/` folder (e.g. via the
`gh-pages` package or an Actions workflow). `base:'./'` in `vite.config.js` already makes
asset paths work under a `/repo/` subpath.

Images in `src/assets/` are the **raw originals** extracted from the PDF (no
recompression), so quality is as good as the source. Vite serves each one separately
and lazy-loads them, so the page stays fast without shipping one giant file.
