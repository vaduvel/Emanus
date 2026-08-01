import { useState } from "react"
import { Cloud, HardDrive, Route, ShieldCheck, Trash2, UserRound } from "lucide-react"
import { cloudBackupEnabled, cloudEnabled, cloudReady } from "../cloud"
import { currentPath, eraseJourneyData, load, setBackupEnabled } from "../journey"
import { navigate } from "../router"

export function Profile() {
  const state = load()
  const path = currentPath()
  const configured = cloudEnabled()
  const [backupActive, setBackupActive] = useState(() => cloudBackupEnabled())
  const [busy, setBusy] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function toggleBackup() {
    const next = !backupActive
    setBusy(true)
    setMessage(null)
    const synced = await setBackupEnabled(next)
    setBackupActive(next)
    setMessage(
      next
        ? synced
          ? "Backup-ul a fost activat și sincronizat."
          : "Backup-ul este activat; sincronizarea va fi reluată când conexiunea este disponibilă."
        : "Backup-ul este oprit. Datele rămân pe acest dispozitiv.",
    )
    setBusy(false)
  }

  async function eraseEverything() {
    setBusy(true)
    setMessage(null)
    const removed = await eraseJourneyData()
    if (!removed) {
      setMessage("Copia din cloud nu a putut fi ștearsă. Verifică internetul și încearcă din nou.")
      setBusy(false)
      return
    }
    navigate("/")
  }

  return (
    <section className="profile-screen">
      <header className="today__head">
        <UserRound size={22} strokeWidth={1.7} aria-hidden />
        <h1>Eu</h1>
      </header>
      <p className="muted">
        Aici controlezi drumul și felul în care se păstrează datele tale.
      </p>

      <div className="tile profile-screen__section">
        <p className="today__kicker">
          <Route size={16} aria-hidden /> Drumul meu
        </p>
        <h2>{path?.title ?? "Niciun drum ales"}</h2>
        <p className="muted">
          Poți alege alt drum fără să pierzi rugăciunile sau ce ai scris.
        </p>
        <button type="button" className="ghost" onClick={() => navigate("/intrare")}>
          Schimbă drumul
        </button>
      </div>

      <div className="tile profile-screen__section">
        <p className="today__kicker">
          {backupActive ? (
            <Cloud size={16} aria-hidden />
          ) : (
            <HardDrive size={16} aria-hidden />
          )}
          Păstrarea datelor
        </p>
        <h2>{backupActive ? "Backup ales de tine" : "Numai pe dispozitiv"}</h2>
        <p className="muted">
          {backupActive
            ? "Drumul, progresul, jurnalul și rugăciunile sunt copiate în contul anonim al sesiunii tale."
            : "Nimic nu este trimis în cloud. Ștergerea datelor browserului le va șterge și pe ele."}
        </p>
        <p className="privacy-note">
          <ShieldCheck size={16} aria-hidden />
          Regulile de acces separă utilizatorii, dar backup-ul nu este criptat end-to-end.
          Răspunsurile la alegeri și schițele lecțiilor rămân locale.
        </p>
        {configured ? (
          <button type="button" className="ghost" disabled={busy} onClick={toggleBackup}>
            {backupActive ? "Oprește backup-ul" : "Activează backup-ul"}
          </button>
        ) : (
          <p className="muted">Backup-ul nu este configurat în această instalare.</p>
        )}
        {backupActive && !cloudReady() ? (
          <p className="muted">Sincronizarea nu este conectată acum; datele locale rămân disponibile.</p>
        ) : null}
        {message ? <p className="profile-screen__status" role="status">{message}</p> : null}
      </div>

      <div className="tile profile-screen__section">
        <p className="today__kicker">Ce păstrăm</p>
        <p className="muted">
          {state.journal.length} însemnări și {state.prayers.length} rugăciuni.
          Nu calculăm nivel, serie, scor spiritual sau profil psihologic.
        </p>
      </div>

      <div className="tile profile-screen__section profile-screen__danger">
        <p className="today__kicker"><Trash2 size={16} aria-hidden /> Ștergerea datelor</p>
        <h2>Șterge tot ce ai păstrat</h2>
        <p className="muted">
          Șterge drumul, progresul, jurnalul și rugăciunile de pe dispozitiv și din cloud.
          Acțiunea nu poate fi anulată.
        </p>
        {confirmDelete ? (
          <div className="profile-screen__confirm">
            <p>Confirmi ștergerea definitivă?</p>
            <div>
              <button type="button" className="profile-screen__delete" disabled={busy} onClick={eraseEverything}>
                Da, șterge definitiv
              </button>
              <button type="button" className="ghost" disabled={busy} onClick={() => setConfirmDelete(false)}>
                Renunță
              </button>
            </div>
          </div>
        ) : (
          <button type="button" className="ghost profile-screen__delete-link" onClick={() => setConfirmDelete(true)}>
            Șterge datele mele
          </button>
        )}
      </div>
    </section>
  )
}
