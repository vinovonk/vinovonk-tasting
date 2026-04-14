# Contributing

## Source of truth

This repository is a **subtree export** of `src/components/proeven/` from the vinovonk mono-repo at [vinovonk.com](https://vinovonk.com). All canonical changes happen there first.

## For bug reports and feature requests

Open an issue here on GitHub. We will evaluate and, if accepted, implement in the upstream vinovonk repo and re-publish here.

## For code contributions

1. Fork this repository
2. Create a feature branch: `git checkout -b feature/my-fix`
3. Make your changes in the fork
4. Open a pull request with a clear description

If the change is significant, we'll port it upstream to vinovonk and re-sync. Smaller fixes may be applied directly.

## Keeping the standalone wrapper updated

The Vite wrapper in `standalone/` is NOT part of the subtree — it lives only in this repo. If the `TastingApp` API changes (e.g., new props), update `standalone/src/main.tsx` accordingly.

## Syncing from upstream

The vinovonk maintainer pushes updates using:

```bash
# From vinovonk repo root:
git subtree push \
  --prefix=src/components/proeven \
  git@github.com:vinovonk/tasting-notes.git \
  main
```

The `standalone/` directory is excluded from the subtree push and must be maintained separately in this repo.

## Code style

- TypeScript strict mode
- React functional components with hooks
- No external state management (localStorage only)
- Brutalist design system: `border-radius: 0`, `box-shadow: 4px 4px 0 #000`, CSS custom properties via `--color-*` and `--font-*`
- Bilingual: all UI strings through `FL[lang]` in `lib/form-labels.ts`
