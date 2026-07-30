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

// Manifestul publicat și drumul omului se hidratează în paralel. Ecranul pornește
// imediat din fallback-ul compact, apoi se redesenează numai dacă s-a schimbat ceva.
void Promise.all([hydrateContentManifest(), hydrateFromCloud()]).then(
  ([contentChanged, journeyRestored]) => {
    if (contentChanged || journeyRestored) render()
  },
)
