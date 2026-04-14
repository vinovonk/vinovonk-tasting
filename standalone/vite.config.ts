import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  root: '.',
  // Base path for GitHub Pages: change to '/tasting-notes/' if deploying to a sub-path
  base: '/',
  resolve: {
    // In standalone repo, ../TastingApp resolves to the repo root correctly
    // No alias needed — TypeScript paths handle this
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
