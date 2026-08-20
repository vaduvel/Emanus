import { useMemo, useState } from "react"
import {
  ArrowLeft,
  Cloud,
  CloudOff,
  HardDrive,
  Route,
  ShieldCheck,
  Trash2,
  UserRound,
} from "lucide-react"
import { cloudBackupEnabled, cloudBackupStatus, cloudEnabled } from "../cloud"
import { currentPath, eraseAllEmanusData, load, setBackupEnabled } from "../journey"
import { getLearningProgressSnapshot } from "../learningProgress"
import { navigate } from "../router"
import "../profile.css"

type BusyAction = "backup" | "delete" | null

export function Profile() {
  const journey = load()
  const path = currentPath()
  const configured = cloudEnabled()
  const libraryLessonCount = useMemo(() => {
    const progress = getLearningProgressSnapshot()
    return new Set(
      Object.values(progress).flatMap((program) => program.completedLessonIds),
    ).size
  }, [])
  const [backupActive, setBackupActive] = useState(() => cloudBackupEnabled())
  const [busy, setBusy] = useState<BusyAction>(null)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function toggleBackup() {
    const next = !backupActive
    setBusy("backup")
    setMessage(null)
    const succeeded = await setBackupEnabled(next)
    const active = cloudBackupEnabled()
    setBackupActive(active)
    if (!next) {
      setMessage(
        succeeded
          ? "Backup-ul este oprit. Copia existentă din cloud rămâne până când alegi ștergerea definitivă."
          : "Backup-ul nu a putut fi oprit în acest browser. Încearcă din nou.",
      )
    } else if (!active) {
      setMessage("Backup-ul nu a putut fi activat în acest browser.")
    } else {
      setMessage(
        succeeded
          ? "Backup-ul a fost activat și sincronizat."
          : "Ai activat backup-ul. Sincronizarea va fi reluată când serviciul este disponibil.",
      )
    }
    setBusy(null)
  }

  async function eraseEverything() {
    setBusy("delete")
    setMessage(null)
    const removed = await eraseAllEmanusData()
    if (!removed) {
      setMessage(
        "Ștergerea nu a fost confirmată complet. Reîncearcă; dacă problema continuă, șterge datele site-ului din setările browserului.",
      )
      setBusy(null)
      return
    }
    navigate("/")
  }

  const statusCopy = backupActive
    ? cloudBackupStatus() === "cloud"
      ? {
          icon: <Cloud size={19} aria-hidden />,
          title: "Backup cloud activ",
          detail: "Ultima conectare la spațiul tău privat a reușit.",
        }
      : {
          icon: <CloudOff size={19} aria-hidden />,
          title: "Backup ales, momentan neconectat",
          detail: "Datele rămân pe dispozitiv și sincronizarea va fi reîncercată.",
        }
    : {
        icon: <HardDrive size={19} aria-hidden />,
        title: "Numai pe dispozitiv",
        detail: "Nicio sesiune cloud nu este creată și nimic nu este încărcat.",
      }

  return (
    <section className="profile-screen">
      <header className="profile-screen__header">
        <button
          type="button"
          className="profile-screen__back"
          aria-label="Înapoi la Azi"
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={22} aria-hidden />
        </button>
        <div>
          <p className="profile-screen__eyebrow"><UserRound size={15} aria-hidden /> Profil</p>
          <h1>Datele mele</h1>
        </div>
      </header>

      <p className="profile-screen__intro">
        Emanus funcționează local. Tu alegi dacă vrei și o copie de siguranță în cloud.
      </p>

      <article className="tile profile-screen__section">
        <p className="today__kicker"><Route size={16} aria-hidden /> Drumul meu</p>
        <h2>{path?.title ?? "Niciun drum ales"}</h2>
        <p className="muted">
          {journey.completedLessonIds.length} sesiuni în Drumul Emaus și {libraryLessonCount} sesiuni în Bibliotecă.
        </p>
        <button type="button" className="ghost" onClick={() => navigate("/intrare")}>
          Schimbă poarta de intrare
        </button>
      </article>

      <article className="tile profile-screen__section">
        <div className={`profile-screen__storage profile-screen__storage--${backupActive ? "cloud" : "device"}`}>
          <span>{statusCopy.icon}</span>
          <div>
            <p className="today__kicker">Păstrarea datelor</p>
            <h2>{statusCopy.title}</h2>
            <p className="muted">{statusCopy.detail}</p>
          </div>
        </div>

        <p className="profile-screen__privacy">
          <ShieldCheck size={17} aria-hidden />
          <span>
            Backup-ul include drumul, istoricul Emaus, jurnalul și rugăciunile. Progresul Bibliotecii și schițele sesiunilor rămân numai pe acest dispozitiv. Backup-ul este separat prin reguli de acces, dar nu este criptat end-to-end.
          </span>
        </p>

        {configured ? (
          <button
            type="button"
            className="ghost profile-screen__backup-action"
            disabled={busy !== null}
            onClick={toggleBackup}
          >
            {busy === "backup"
              ? "Se actualizează…"
              : backupActive
                ? "Oprește backup-ul"
                : "Activează backup-ul"}
          </button>
        ) : (
          <p className="profile-screen__notice">Backup-ul nu este configurat în această instalare.</p>
        )}
      </article>

      <article className="tile profile-screen__section">
        <p className="today__kicker">Ce este păstrat acum</p>
        <p className="muted">
          {journey.journal.length} însemnări și {journey.prayers.length} rugăciuni. Nu calculăm scor spiritual, serie de zile sau profil psihologic.
        </p>
      </article>

      <article className="tile profile-screen__section profile-screen__danger">
        <p className="today__kicker"><Trash2 size={16} aria-hidden /> Ștergerea datelor</p>
        <h2>Șterge tot ce ai păstrat</h2>
        <p className="muted">
          Mai întâi ștergem contul și copia remote, dacă există. Abia după confirmarea remote ștergem toate datele Emanus de pe acest dispozitiv, inclusiv progresul Bibliotecii.
        </p>
        {confirmDelete ? (
          <div className="profile-screen__confirm">
            <p>Confirmi ștergerea definitivă? Acțiunea nu poate fi anulată.</p>
            <div>
              <button
                type="button"
                className="profile-screen__delete"
                disabled={busy !== null}
                onClick={eraseEverything}
              >
                {busy === "delete" ? "Se șterge…" : "Da, șterge definitiv"}
              </button>
              <button
                type="button"
                className="ghost"
                disabled={busy !== null}
                onClick={() => setConfirmDelete(false)}
              >
                Renunță
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className="ghost profile-screen__delete-link"
            disabled={busy !== null}
            onClick={() => setConfirmDelete(true)}
          >
            Șterge datele mele
          </button>
        )}
      </article>

      {message ? <p className="profile-screen__status" role="status">{message}</p> : null}
    </section>
  )
}
