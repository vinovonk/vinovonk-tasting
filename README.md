# vinovonk-tasting

[![Deploy to GitHub Pages](https://github.com/vinovonk/vinovonk-tasting/actions/workflows/deploy.yml/badge.svg)](https://github.com/vinovonk/vinovonk-tasting/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Personal wine tasting note tool that runs entirely in your browser. No account, no server, no tracking — all data stored locally via `localStorage`.

**Live:** [vinovonk.com/en/tasting/](https://vinovonk.com/en/tasting/) (EN) · [vinovonk.com/proeven/](https://vinovonk.com/proeven/) (NL)

---

## Features

| | |
|---|---|
| **Wine form** | SAT — Appearance, Nose, Palate, Conclusions + BLIC quality assessment |
| **Champagne form** | Extended with mousse, bubble size, autolytic/oxidative character, dosage, disgorgement |
| **Spirits form** | Whisky, cognac, gin, rum and more — distillate-specific aroma picker |
| **Non-alcoholic** | Wines, beers, kombucha, tea, mocktails — with comparison field |
| **Aroma picker** | Structured clusters: primary fruit, secondary fermentation, tertiary oxidative/maturation |
| **Biodynamic calendar** | Today's day type (fruit/flower/leaf/root) + 14-day overview + moon phase |
| **Photo capture** | Bottle photo via camera or file library |
| **Archive & search** | Search and filter all notes across sessions |
| **Export / Import** | JSON backup; import on another device |
| **Bilingual** | Full Dutch (NL) and English (EN) interface |
| **Privacy** | 100% client-side — zero server, zero analytics |

---

## Quick start

```bash
git clone https://github.com/vinovonk/vinovonk-tasting.git
cd vinovonk-tasting/standalone
npm install
npm run dev
# → http://localhost:5173
```

---

## Repository structure

This repo is a **subtree export** of `src/components/proeven/` from the [vinovonk mono-repo](https://vinovonk.com). The `standalone/` directory contains the Vite wrapper to run the app outside of Astro.

```
vinovonk-tasting/
├── TastingApp.tsx          # Root island + hash router
├── router.ts               # useHashRoute() hook
├── types.ts                # Zod schemas: TastingNote, WijnProef, etc.
├── ui/                     # Brutalist UI kit (Button, Card, Tabs, Dialog…)
├── views/                  # Page views (Dashboard, SessionDetail, Archive…)
├── forms/                  # WijnForm, ChampagneForm, SpiritsForm, etc.
├── features/               # AromaPicker, DruivenInput, FotoCapture, BiodynamischBadge
├── data/                   # Option arrays, aroma lexicon, grape/region database
├── lib/
│   ├── storage.ts          # localStorage CRUD
│   ├── biodynamisch.ts     # Moon position + biodynamic day type (Jean Meeus)
│   └── form-labels.ts      # Bilingual UI strings (FL.nl / FL.en)
└── standalone/             # Vite wrapper for running outside Astro
    ├── index.html
    ├── package.json
    ├── vite.config.ts
    ├── ATTRIBUTIONS.md
    └── src/
        ├── main.tsx        # Mounts TastingApp with auto-detected lang
        └── index.css       # CSS tokens (brutalist design system)
```

---

## Tasting methodologies

- **SAT** — Systematic Approach to Tasting: Appearance, Nose, Palate, Conclusions
- **CIVC** — Comité Interprofessionnel du vin de Champagne ([champagne.fr](https://www.champagne.fr))
- **Biodynamic calendar** — Maria Thun framework, computed via Jean Meeus astronomical algorithm

See [standalone/ATTRIBUTIONS.md](standalone/ATTRIBUTIONS.md) for full credits.

---

## Contributing

Issues and PRs welcome. See [standalone/CONTRIBUTING.md](standalone/CONTRIBUTING.md).

This repo is a subtree export — the canonical source is the vinovonk mono-repo. Significant changes will be coordinated upstream.

---

## License

MIT — see [LICENSE](LICENSE)
