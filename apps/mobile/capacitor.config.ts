import type { CapacitorConfig } from "@capacitor/cli"

// Împachetează același build web (apps/web/dist) ca aplicație iOS și Android.
const config: CapacitorConfig = {
  appId: "com.emanus.app",
  appName: "Emanus",
  webDir: "../web/dist"
}

export default config
