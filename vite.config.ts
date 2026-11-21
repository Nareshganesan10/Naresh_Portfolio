import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // This repository is the account-level GitHub Pages site: username.github.io
  base: '/',
});
