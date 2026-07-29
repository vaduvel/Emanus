import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { registerSW } from "virtual:pwa-register"
import App from "./App"
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

// Telefon nou: dacă local e gol și în nor există un drum, îl aducem și redesenăm o dată.
void hydrateFromCloud().then((restored) => {
  if (restored) render()
})
