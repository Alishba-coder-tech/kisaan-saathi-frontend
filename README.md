# کسان ساتھی — Kisaan Saathi (React + Tailwind CSS)

## What changed in this version
- **Rebuilt with Tailwind CSS** (inline styles removed, `tailwind.config.js` + `postcss.config.js` added).
- **Simple login screen** — the farm photo you shared is now the full-screen login background (`public/farm-hero.png`) with a glass card on top.
- **Field Monitoring simplified**: the old pixel-by-pixel NDVI heatmap (hard for a farmer to read) is replaced with a **Farm Projection view** — the field is shown as 6 big, clearly-labeled zones, each with a color (green/yellow/red), a face emoji, and a one-line plain-Urdu instruction (e.g. "فوری آبپاشی کریں"). No numbers or jargon required to understand it.
- All other screens (Home, Chatbot, Prediction, Officer Dashboard, Sidebar) converted to Tailwind utility classes for a lighter, more consistent, "eye-catching" look while keeping the original functionality (charts still use Recharts).

## Run it
```bash
npm install
npm start       # dev server
npm run build   # production build
```

## Notes
- `public/farm-hero.png` is the image you uploaded — swap it for a higher-resolution version any time by replacing that file.
- Officer Dashboard intentionally keeps more detailed data (NDVI numbers, tables) since it's built for agricultural officers, not farmers.
- Demo login accepts any phone number and password.
