import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { registerSW } from "virtual:pwa-register"
import App from "./App"
import "./styles.css"
import "./components/components.css"
import "./components/screens.css"
import "./components/entry.css"
import "./components/immersive.css"

// Înregistrează service worker-ul PWA (auto-update).
registerSW({ immediate: true })

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
