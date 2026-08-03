import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { registerSW } from "virtual:pwa-register"
import "./lessonOverrides"
import App from "./App"
import { initializeBiblePersonal } from "./biblePersonal"
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

registerSW({ immediate: true })
initReminder()
initializeBiblePersonal()

const root = createRoot(document.getElementById("root")!)

function render() {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

render()

void hydrateFromCloud().then((restored) => {
  if (restored) render()
})
