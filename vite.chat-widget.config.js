/**
 * Builds the chat widget as an ES module into ./js for static hosting.
 * Code-splits marked / DOMPurify / highlight.js into separate chunks.
 */
import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  // Relative URLs so chunks resolve from /js/ on the static MPA, not site root.
  base: './',
  publicDir: false,
  build: {
    emptyOutDir: false,
    outDir: resolve(__dirname, 'js'),
    sourcemap: true,
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      input: resolve(__dirname, 'src/chat-widget/index.ts'),
      output: {
        format: 'es',
        entryFileNames: 'chat-widget.js',
        chunkFileNames: 'chat-widget-[name]-[hash].js',
        assetFileNames: 'chat-widget-[name][extname]',
      },
    },
  },
});
