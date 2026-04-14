import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  root: '.',
  // Base path for GitHub Pages: change to '/vinovonk/' if deploying to a sub-path
  base: '/',
  resolve: {
    // Ensure parent-directory source files (../TastingApp, ../forms/*, etc.)
    // can resolve their npm imports from standalone/node_modules.
    modules: [resolve(__dirname, 'node_modules'), 'node_modules'],
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
