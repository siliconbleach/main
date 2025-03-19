import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    outDir: '../../scripts', // This specifies the output directory
    rollupOptions: {
      output: {
        entryFileNames: 'app.js', // This specifies the output filename
        sourcemap: true, // Optional, for debugging purposes
      },
    },
  },
})
