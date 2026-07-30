import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { registerSW } from "virtual:pwa-register"
import App from "./App"
import { hydrateContentManifest } from "./content"
import { hydrateFromCloud } from "./journey"
import { initReminder } from "./reminder"
import "./ds/tokens.css"
import "./styles.css"
import "./components/components.css"
import "./components/screens.css"
import "./components/entry.css"
import "./components/immersive.css"
import "./ds/ds.css"
import "./components/motion.css"

// Înregistrează service worker-ul PWA (auto-update).
registerSW({ immediate: true })

// O singură notificare pe zi, doar dacă omul a spus da o dată. (docs/18)
initReminder()

const root = createRoot(document.getElementById("root")!)

function render() {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

// Desenăm imediat din datele locale — aplicația nu așteaptă niciodată rețeaua.
render()

// Restaurarea din cloud, sesiunea de backup și catalogul publicat pot cere o
// singură redesenare după pornirea imediată din datele locale.
void Promise.all([hydrateFromCloud(), hydrateContentManifest()]).then(
  ([cloudChanged, refreshedContent]) => {
    if (cloudChanged || refreshedContent) render()
  },
)
