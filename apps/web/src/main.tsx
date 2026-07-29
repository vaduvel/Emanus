import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { registerSW } from "virtual:pwa-register"
import App from "./App"
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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
