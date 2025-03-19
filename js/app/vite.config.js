import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    outDir: '../../scripts', // Output directory
    sourcemap: true, // Correct placement for sourcemap
    lib: {
      entry: 'src/main.js', // Entry point
      name: 'MySvelteApp',  // Global name for the injected script
      fileName: () => 'app.js' // Output filename
    },
    rollupOptions: {
      output: {
        format: 'iife', // Ensures the script can be injected directly
        entryFileNames: 'app.js', // Output filename
      },
    },
  },
});