import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.',
  // Base path for GitHub Pages: change to '/vinovonk/' if deploying to a sub-path
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  // Note: production builds require node_modules to be resolvable from repo root.
  // CI workflow creates a symlink: ln -s standalone/node_modules ../node_modules
  // For local production builds run: ln -sf node_modules ../node_modules (from standalone/)
});
