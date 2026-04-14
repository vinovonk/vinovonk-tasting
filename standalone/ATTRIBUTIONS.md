# Attributions

## Tasting Methodologies

### Systematic Approach to Tasting (SAT)
The wine tasting form follows the **SAT framework** — a structured tasting method across Appearance, Nose, Palate and Conclusions, with a quality assessment using the BLIC model (Balance, Length, Intensity, Complexity).

> Used here for educational and personal purposes only. Not an official examination or certification.

---

### CIVC Champagne Tasting Methodology
The champagne form uses tasting parameters and terminology developed by the **Comité Interprofessionnel du vin de Champagne (CIVC)**, including mousse quality, bubble size and persistence, autolytic character, disgorgement date and dosage classification.

**Organisation:** Comité Interprofessionnel du vin de Champagne  
**Website:** [champagne.fr](https://www.champagne.fr)

---

## Biodynamic Calendar

### Maria Thun — Biodynamic Sowing Calendar
The **biodynamic day-type system** (fruit / flower / leaf / root days) is based on the agricultural calendar work of **Maria Thun (1922–2012)**. Through years of field trials, Thun established that the moon's position in the sidereal zodiac influences plant growth and, by extension, how wine tastes.

**Publication:** *"Aussaattage" / "Working with the Stars"* (annual edition)  
**Website:** [mariathun.com](https://www.mariathun.com)

---

### Jean Meeus — Astronomical Algorithms
The **sidereal moon position calculation** in `lib/biodynamisch.ts` is based on the simplified algorithm from Chapter 47 of:

> Jean Meeus, *Astronomical Algorithms*, 2nd ed.  
> Willmann-Bell, Richmond VA, 1998.  
> ISBN: 978-0943396613

The implementation includes an ayanamsa correction (tropical ↔ sidereal offset), resulting in an accuracy of approximately ±1–2°. Since the moon stays in each zodiac sign for 2–3 days, this accuracy is sufficient for day-type determination.

---

### Cees van Casteren MW
**Cees van Casteren** (Master of Wine, BBC wine presenter) has championed the use of the biodynamic calendar in professional wine tasting. His recommendation — avoid serious wine assessments on **root days** — is explicitly incorporated in the app's biodynamic view and dashboard badge.

---

## Open-Source Libraries

| Library | License | Purpose |
|---------|---------|---------|
| [React](https://react.dev) | MIT | UI library |
| [Zod](https://zod.dev) | MIT | Schema validation |
| [Sonner](https://sonner.emilkowal.ski) | MIT | Toast notifications |
| [Radix UI](https://www.radix-ui.com) | MIT | Accessible UI primitives |
| [date-fns](https://date-fns.org) | MIT | Date utilities |
| [lucide-react](https://lucide.dev) | ISC | Icons |
| [uuid](https://github.com/uuidjs/uuid) | MIT | Unique ID generation |
| [clsx](https://github.com/lukeed/clsx) | MIT | CSS class utilities |
| [Vite](https://vitejs.dev) | MIT | Build tool |
| [TypeScript](https://www.typescriptlang.org) | Apache-2.0 | Type checking |

---

## Original Source

This standalone repository was extracted from **vinovonk.com** — a Dutch wine platform built with Astro 6 + Cloudflare Pages.

**Website:** [vinovonk.com](https://vinovonk.com)  
**Tasting notes app:** [vinovonk.com/proeven/](https://vinovonk.com/proeven/) (NL) / [vinovonk.com/en/tasting/](https://vinovonk.com/en/tasting/) (EN)

> This repository is a subtree export. The canonical source of truth is the vinovonk mono-repo. Changes are pushed here periodically — contributions should target the main vinovonk repo or be coordinated via issues.
