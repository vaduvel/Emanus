import { cloudReady } from "./cloud"

export function privateTextNotice(): string {
  return cloudReady()
    ? "Privat. Se salvează pe dispozitiv și în backup-ul protejat al sesiunii tale."
    : "Privat. Rămâne doar pe acest dispozitiv."
}
