import { defineConfig } from 'vite';

export default defineConfig({
  base: '/kotisivut/', // Set the base path for GitHub Pages
  build: {
    outDir: 'dist', // Ensure output is still in the dist folder
  },
  server: {
    port: 3002, // You can change the port if needed
    open: true, // Automatically open in browser
  },
}); 