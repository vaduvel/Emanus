import { cloudBackupEnabled } from "./cloud"

export function privateTextNotice(): string {
  return cloudBackupEnabled()
    ? "Se salvează pe dispozitiv și în backup-ul activat de tine. Nu este publicat și nu este folosit pentru analiză."
    : "Privat. Rămâne doar pe acest dispozitiv."
}
