import { Cloud, HardDrive, Route, ShieldCheck, UserRound } from "lucide-react"
import { cloudReady } from "../cloud"
import { currentPath, load } from "../journey"
import { navigate } from "../router"

export function Profile() {
  const state = load()
  const path = currentPath()
  const backupActive = cloudReady()

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
        <h2>{backupActive ? "Backup protejat activ" : "Numai pe dispozitiv"}</h2>
        <p className="muted">
          {backupActive
            ? "Drumul, jurnalul și rugăciunile sunt salvate în spațiul privat al sesiunii tale, protejat prin reguli de acces."
            : "Datele sunt păstrate în acest browser. Ștergerea datelor browserului le va șterge și pe ele."}
        </p>
        <p className="privacy-note">
          <ShieldCheck size={16} aria-hidden />
          Răspunsurile la alegeri și schițele lecțiilor rămân locale.
        </p>
      </div>

      <div className="tile profile-screen__section">
        <p className="today__kicker">Ce păstrăm</p>
        <p className="muted">
          {state.journal.length} însemnări și {state.prayers.length} rugăciuni.
          Nu calculăm nivel, serie, scor spiritual sau profil psihologic.
        </p>
      </div>
    </section>
  )
}
