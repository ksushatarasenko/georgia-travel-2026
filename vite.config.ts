import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  // GitHub Pages project site: /georgia-travel-2026/
  // Local dev and Vercel stay at `/`.
  base: process.env.BASE_PATH || '/',
  build: {
    chunkSizeWarningLimit: 1200,
  },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      // Static manifest lives in /public/manifest.webmanifest
      manifest: false,
      includeAssets: [
        'app-icon.svg',
        'apple-touch-icon.png',
        'icons/icon-192.png',
        'icons/icon-512.png',
        'icons/icon-512-maskable.png',
        'manifest.webmanifest',
      ],
      injectManifest: {
        globPatterns: [
          '**/*.{js,css,html,ico,svg,png,jpg,jpeg,webp,gif,woff,woff2,ttf,otf,json,webmanifest,txt,map,pdf}',
        ],
        maximumFileSizeToCacheInBytes: 20 * 1024 * 1024,
      },
      devOptions: {
        enabled: false,
      },
    }),
  ],
})
