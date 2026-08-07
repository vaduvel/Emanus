import react from "@vitejs/plugin-react"
import path from "node:path"
import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa"

function bibleChunk(id: string): string | undefined {
  if (!id.includes("packages/shared/dist/bible/")) return undefined

  const file = path.basename(id).replace(/\.js$/, "")

  // Păstrăm fiecare carte într-un chunk separat. Biblia trebuie să rămână
  // disponibilă offline prin Workbox, fără un monolit care depășește limita
  // standard de precache de 2 MiB.
  const books: Array<[RegExp, string]> = [
    [/^geneza/i, "bible-geneza"],
    [/^exod/i, "bible-exod"],
    [/^levitic/i, "bible-levitic"],
    [/^numeri/i, "bible-numeri"],
    [/^deuteronom/i, "bible-deuteronom"],
    [/^iosua/i, "bible-iosua"],
    [/^judecatori/i, "bible-judecatori"],
    [/^rut/i, "bible-rut"],
    [/^samuel/i, "bible-samuel"],
    [/^imparati/i, "bible-imparati"],
    [/^cronici/i, "bible-cronici"],
    [/^ezra/i, "bible-ezra"],
    [/^neemia/i, "bible-neemia"],
    [/^estera/i, "bible-estera"],
    [/^iov/i, "bible-iov"],
    [/^psalm/i, "bible-psalmi"],
    [/^proverbe/i, "bible-proverbe"],
    [/^eclesiast/i, "bible-eclesiastul"],
    [/^cantarea/i, "bible-cantarea"],
    [/^isaia/i, "bible-isaia"],
    [/^ieremia/i, "bible-ieremia"],
    [/^planger/i, "bible-plangerile"],
    [/^ezechiel/i, "bible-ezechiel"],
    [/^daniel/i, "bible-daniel"],
    [/^osea/i, "bible-osea"],
    [/^ioel/i, "bible-ioel"],
    [/^amos/i, "bible-amos"],
    [/^obadia/i, "bible-obadia"],
    [/^iona/i, "bible-iona"],
    [/^mica/i, "bible-mica"],
    [/^naum/i, "bible-naum"],
    [/^habacuc/i, "bible-habacuc"],
    [/^tefania/i, "bible-tefania"],
    [/^hagai/i, "bible-hagai"],
    [/^zaharia/i, "bible-zaharia"],
    [/^maleahi/i, "bible-maleahi"],
    [/^matei/i, "bible-matei"],
    [/^marcu/i, "bible-marcu"],
    [/^luca/i, "bible-luca"],
    [/^ioan/i, "bible-ioan"],
    [/^fapte/i, "bible-fapte"],
    [/^romani/i, "bible-romani"],
  ]

  for (const [pattern, chunk] of books) {
    if (pattern.test(file)) return chunk
  }

  if (
    id.includes("/bible/overlays/") ||
    file.startsWith("vtFullNarratives") ||
    file === "completeOverlay" ||
    file === "explainedOverlay" ||
    file === "vtExplainedCoverage"
  ) {
    return "bible-vt-explanations"
  }

  return "bible-core"
}

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
        importScripts: ["push-sw.js"],
        runtimeCaching: [{
          urlPattern: ({ url }) => url.pathname.startsWith("/api"),
          handler: "NetworkFirst",
          options: { cacheName: "emanus-api", networkTimeoutSeconds: 3 },
        }],
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
          return bibleChunk(id)
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
