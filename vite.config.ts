import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

// GitHub Pages project site base path
const base = process.env.FIGMA_PUBLIC_URL
  ? `${process.env.FIGMA_PUBLIC_URL}/`
  : process.env.GITHUB_ACTIONS
    ? '/Night-ride-share/'
    : '/'

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: true,
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
})
