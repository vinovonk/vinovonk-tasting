# Tasting Notes

A personal wine tasting note tool that runs entirely in your browser. No account, no server, no tracking — all data is stored locally via `localStorage`.

Built on established tasting methodologies: **SAT** (wine), **CIVC** (champagne), with a **biodynamic calendar** based on the work of Maria Thun and computed via the Jean Meeus astronomical algorithm.

Live demo: **[vinovonk.com/en/tasting/](https://vinovonk.com/en/tasting/)** (EN) · **[vinovonk.com/proeven/](https://vinovonk.com/proeven/)** (NL)

---

## Features

| Feature | Description |
|---------|-------------|
| **Wine form** | SAT — Appearance, Nose, Palate, Conclusions + BLIC quality assessment |
| **Champagne form** | Extended with mousse, bubble size, autolytic/oxidative character, dosage, disgorgement |
| **Spirits form** | Whisky, cognac, gin, rum and more — distillate-specific aroma picker |
| **Non-alcoholic form** | Wines, beers, kombucha, tea, mocktails — with comparison field |
| **Generic form** | Beer, sake, cider, mead or anything else |
| **Aroma picker** | Structured clusters: primary fruit, secondary fermentation, tertiary oxidative/maturation |
| **Biodynamic calendar** | Today's day type (fruit/flower/leaf/root) + 14-day overview + moon phase |
| **Photo capture** | Bottle photo via camera or file library, compressed to localStorage |
| **Archive & search** | Search and filter all notes across sessions |
| **Export / Import** | JSON export for backup; import on another device |
| **Bilingual** | Full Dutch (NL) and English (EN) interface |
| **Privacy** | Runs 100% client-side — zero server, zero analytics |

---

## Quick Start

```bash
# Clone
git clone https://github.com/vinovonk/tasting-notes.git
cd tasting-notes

# Install (from the standalone/ directory, which contains package.json)
cd standalone
npm install

# Start dev server
npm run dev
# → http://localhost:5173
```

---

## Repository Structure

This repository is a **subtree export** of `src/components/proeven/` from the [vinovonk mono-repo](https://vinovonk.com). The `standalone/` directory contains the Vite wrapper to run the app outside of Astro.

```
tasting-notes/
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
    ├── tsconfig.json
    ├── ATTRIBUTIONS.md
    └── src/
        ├── main.tsx        # Mounts TastingApp with auto-detected lang
        └── index.css       # Standalone CSS tokens (brutalist design system)
```

---

## Attributions

See [ATTRIBUTIONS.md](ATTRIBUTIONS.md) for full credits.

**Tasting methodology references:**
- **SAT** — Systematic Approach to Tasting
- **CIVC** — Comité Interprofessionnel du vin de Champagne ([champagne.fr](https://www.champagne.fr))

**Biodynamic calendar:**
- **Maria Thun** (1922–2012) — biodynamic sowing calendar framework
- **Jean Meeus** — *Astronomical Algorithms* (ISBN 978-0943396613) — sidereal moon position algorithm
- **Cees van Casteren MW** — inspiration for integrating the calendar into wine tasting practice

---

## License

MIT — see [LICENSE](LICENSE)

---

## Source

Extracted from [vinovonk.com](https://vinovonk.com). The canonical source of truth is the vinovonk mono-repo. For significant changes, please open an issue so coordination with the upstream source can happen.
