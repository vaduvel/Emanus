import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa"

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "push-sw.js"],
      manifest: {
        name: "Emanus",
        short_name: "Emanus",
        description: "Crește spiritual, pas cu pas.",
        lang: "ro",
        theme_color: "#0f172a",
        background_color: "#0f172a",
        display: "standalone",
        start_url: "/",
        icons: [
          { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
          { src: "/icons/icon-512-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,woff2}"],
        // Fallback-ul editorial complet se descarcă doar dacă Supabase și API-ul
        // nu pot livra lecția. Lecțiile deschise sunt cache-uite de content.ts.
        globIgnores: [
          "assets/content-paths-*.js",
          "assets/content-library-*.js",
          "assets/lessonMohler-*.js",
          "assets/bible-chapter-*.js",
        ],
        cleanupOutdatedCaches: true,
        importScripts: ["push-sw.js"],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith("/api"),
            handler: "NetworkFirst",
            options: { cacheName: "emanus-api", networkTimeoutSeconds: 3 },
          },
          {
            urlPattern: ({ url }) =>
              url.origin === self.location.origin &&
              /^\/assets\/bible-chapter-.*\.js$/.test(url.pathname),
            handler: "CacheFirst",
            options: {
              cacheName: "emanus-bible-chapters",
              cacheableResponse: { statuses: [0, 200] },
              expiration: { maxEntries: 80, maxAgeSeconds: 31536000 },
            },
          },
        ],
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/react") || id.includes("node_modules/lucide-react")) return "vendor-react"
          if (id.includes("packages/shared/dist/library/")) return "content-library"
          if (id.includes("packages/shared/dist/paths/")) return "content-paths"
          const bibleChapter = id.match(
            /packages\/shared\/dist\/bible\/geneza(\d*)\.js$/,
          )
          if (bibleChapter) {
            return `bible-chapter-geneza-${bibleChapter[1] || "1"}`
          }
          return undefined
        },
      },
    },
  },
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api/, ""),
      },
    },
  },
})
