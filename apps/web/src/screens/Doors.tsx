import { useEffect, useMemo, useState } from "react"
import { ArrowLeft, ArrowRight, Compass, LifeBuoy, Search, ShieldCheck, Sparkles } from "lucide-react"
import {
  COMMON_DOORS,
  EXPLORE_DOORS,
  MORE_DOORS,
  doorHasOwnRoom,
  getDoor,
  getPathForDoor,
  hasSafetySignal,
  isPathReviewed,
  searchDoors,
} from "@emanus/shared/paths"
import { chooseDoor } from "../journey"
import { learningProgramUrl, pathProgramId } from "../learningPrograms"
import { navigate } from "../router"

function doorFromLink(): string | null {
  const hash = window.location.hash
  const q = hash.indexOf("?")
  if (q === -1) return null
  const id = new URLSearchParams(hash.slice(q + 1)).get("u")
  return id && getDoor(id) ? id : null
}

export function Doors() {
  const fromLink = useMemo(doorFromLink, [])
  const [picked, setPicked] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)
  const [q, setQ] = useState("")
  const [askLink, setAskLink] = useState<string | null>(fromLink)
  const [safetyChecked, setSafetyChecked] = useState(false)

  useEffect(() => {
    if (fromLink) setAskLink(fromLink)
  }, [fromLink])

  if (!safetyChecked) return <SafetyCheck onContinue={() => setSafetyChecked(true)} />

  if (askLink) {
    return <FromCreator doorId={askLink} onYes={(id) => { setAskLink(null); setPicked(id) }} onNo={() => setAskLink(null)} />
  }
  if (picked) return <Confirm doorId={picked} onBack={() => setPicked(null)} />

  const term = q.trim()
  const danger = hasSafetySignal(term)
  const rest = term
    ? searchDoors(term)
    : MORE_DOORS

  return (
    <section className="doors experience-shell" aria-labelledby="doors-title">
      <header className="experience-header">
        <button type="button" className="experience-back" onClick={() => navigate("/")} aria-label="Înapoi"><ArrowLeft aria-hidden /></button>
        <div className="experience-brand"><img src="/emanus-mark.svg" alt="" aria-hidden /><span>Emanus</span></div>
        <span className="experience-header__space" />
      </header>

      <div className="doors__intro">
        <p className="experience-eyebrow">Poarta de intrare</p>
        <h1 id="doors-title" className="doors__title">Ce te-a adus aici?</h1>
        <p className="doors__sub">Nu trebuie să știi cum se numește. Alege propoziția care seamănă cel mai mult cu ce trăiești.</p>
      </div>

      <div className="doors__visual" aria-hidden="true">
        <img src="/bible-pain-light.svg" alt="" />
        <span><Compass size={22} /> Începem din locul real</span>
      </div>

      {showAll || term ? (
        <label className="doors__search">
          <Search size={19} aria-hidden />
          <input type="search" value={q} onChange={(event) => setQ(event.target.value)} placeholder="Caută o situație sau un cuvânt" aria-label="Caută o situație sau un cuvânt" autoFocus />
        </label>
      ) : null}

      {!term ? <ul className="doors__list">{COMMON_DOORS.map((door) => <DoorButton key={door.id} label={door.label} onClick={() => setPicked(door.id)} />)}</ul> : null}

      {!showAll && !term ? <button type="button" className="doors__more" onClick={() => setShowAll(true)}><Search size={17} aria-hidden /> Arată-mi toate opțiunile</button> : null}

      {showAll && danger ? (
        <div className="confirm__card doors__danger" role="alert">
          <LifeBuoy size={22} aria-hidden />
          <h2 className="confirm__title">Siguranța vine înaintea unei lecții</h2>
          <p className="confirm__promise">Dacă ești în pericol acum sau te gândești să îți faci rău, oprește alegerea unui drum și deschide Ajutor.</p>
          <button type="button" onClick={() => navigate("/criza")}>Am nevoie de ajutor acum</button>
        </div>
      ) : null}

      {showAll && !danger ? (
        <>
          <p className="doors__section-title">Mai multe situații</p>
          <ul className="doors__list">{rest.map((door) => <DoorButton key={door.id} label={door.label} onClick={() => setPicked(door.id)} />)}</ul>
          {term && rest.length === 0 ? <p className="doors__empty">Nu găsim exact expresia aceasta. Alege propoziția cea mai apropiată sau începe cu una dintre opțiunile de mai jos.</p> : null}
        </>
      ) : null}

      {!danger ? <ul className="doors__list doors__list--quiet">{EXPLORE_DOORS.map((door) => <DoorButton key={door.id} label={door.label} quiet onClick={() => setPicked(door.id)} />)}</ul> : null}

      <aside className="doors__safety">
        <ShieldCheck size={21} aria-hidden />
        <p><strong>Tu păstrezi controlul.</strong> Poți schimba drumul oricând. Emanus nu înlocuiește medicul, psihologul, poliția sau 112.</p>
      </aside>
    </section>
  )
}

function DoorButton({ label, quiet = false, onClick }: { label: string; quiet?: boolean; onClick: () => void }) {
  return <li><button type="button" className={`door${quiet ? " door--quiet" : ""}`} onClick={onClick}><Sparkles size={15} aria-hidden /><span>{label}</span><ArrowRight size={18} aria-hidden /></button></li>
}

function SafetyCheck({ onContinue }: { onContinue: () => void }) {
  return <section className="confirm experience-shell"><div className="experience-brand"><img src="/emanus-mark.svg" alt="" aria-hidden /><span>Emanus</span></div><LifeBuoy size={28} aria-hidden /><p className="experience-eyebrow">Întâi, siguranța</p><h1 className="doors__title">Ești în pericol acum?</h1><p className="confirm__lead">Te gândești să îți faci rău, ai făcut pregătiri, ești lovit sau amenințat ori îți este frică să rămâi unde ești?</p><div className="confirm__card"><p className="confirm__promise">Răspunsul tău nu este salvat local, în jurnal sau în cloud.</p></div><button type="button" className="experience-cta" onClick={() => navigate("/criza")}>Da, am nevoie de ajutor acum</button><button type="button" className="experience-link" onClick={onContinue}>Nu, pot continua spre uși</button></section>
}

function FromCreator({ doorId, onYes, onNo }: { doorId: string; onYes: (doorId: string) => void; onNo: () => void }) {
  const door = getDoor(doorId)
  if (!door) { onNo(); return null }
  return (
    <section className="confirm experience-shell">
      <div className="experience-brand"><img src="/emanus-mark.svg" alt="" aria-hidden /><span>Emanus</span></div>
      <div className="confirm__visual"><img src="/bible-pain-light.svg" alt="O cale luminată înainte" /></div>
      <p className="experience-eyebrow">Ai ajuns aici dintr-un material despre</p>
      <h1 className="confirm__echo">„{door.label}”</h1>
      <p className="confirm__note">Este și locul din care ai nevoie să începi acum?</p>
      <button type="button" className="experience-cta" onClick={() => onYes(door.id)}>Da, începe aici <ArrowRight size={18} aria-hidden /></button>
      <button type="button" className="experience-link" onClick={onNo}>Nu, vreau să aleg eu</button>
    </section>
  )
}

function Confirm({ doorId, onBack }: { doorId: string; onBack: () => void }) {
  const door = getDoor(doorId)
  const path = getPathForDoor(doorId)
  if (!door || !path) { onBack(); return null }
  const own = doorHasOwnRoom(doorId)
  const explore = door.roomId === null
  const minutes = path.lessons[0]?.estMinutes ?? 10
  const pathId = path.id
  function start() {
    chooseDoor(doorId)
    navigate(learningProgramUrl(pathProgramId(pathId)))
  }

  if (!isPathReviewed(path)) return (
    <section className="confirm experience-shell">
      <header className="experience-header">
        <button type="button" className="experience-back" onClick={onBack} aria-label="Înapoi la porți"><ArrowLeft aria-hidden /></button>
        <div className="experience-brand"><img src="/emanus-mark.svg" alt="" aria-hidden /><span>Emanus</span></div>
        <span className="experience-header__space" />
      </header>
      <p className="experience-eyebrow">Ai ales</p>
      <h1 className="confirm__echo">„{door.label}”</h1>
      <p className="confirm__lead">Conținutul este scris, dar revizia cerută pentru această situație nu este încă închisă. Nu îți oferim o lecție sensibilă doar pentru că există în cod.</p>
      <div className="confirm__card"><h2 className="confirm__title">Poți continua în siguranță din celelalte zone</h2><p className="confirm__promise">Ajutor, Biblia, Rugăciuni și ecranul Azi rămân disponibile.</p></div>
      <button type="button" className="experience-cta" onClick={() => navigate("/criza")}>Am nevoie de ajutor acum</button>
      <button type="button" className="experience-link" onClick={onBack}>Alege altă ușă</button>
    </section>
  )

  return (
    <section className="confirm experience-shell">
      <header className="experience-header">
        <button type="button" className="experience-back" onClick={onBack} aria-label="Înapoi la porți"><ArrowLeft aria-hidden /></button>
        <div className="experience-brand"><img src="/emanus-mark.svg" alt="" aria-hidden /><span>Emanus</span></div>
        <span className="experience-header__space" />
      </header>
      <div className="confirm__visual"><img src="/bible-road-hero.svg" alt="Un drum luminat care se deschide înainte" /></div>
      <p className="experience-eyebrow">Ai ales</p>
      <h1 className="confirm__echo">„{door.label}”</h1>
      {own && !explore ? <p className="confirm__lead">Bine că ai spus-o. Nu o micșorăm și nu te grăbim. Mergem de aici.</p> : null}
      {!own ? <p className="confirm__lead">Drumul scris exact pentru această situație nu este gata încă. Nu îți oferim ceva pe jumătate; începem cu adevărul de la rădăcină.</p> : null}
      {own && explore ? <p className="confirm__lead">Nu toată lumea vine cu o rană anume. Poți începe prin a-L cunoaște mai bine pe Dumnezeu.</p> : null}
      <div className="confirm__card">
        <p className="experience-eyebrow">Traseul tău</p>
        <h2 className="confirm__title">{path.title}</h2>
        <p className="confirm__promise">{path.promise}</p>
        <p className="confirm__meta">{path.lessons.length} sesiuni · ritm ghidat · {minutes} minute primul pas</p>
      </div>
      <p className="confirm__note">Progresul rămâne aici când faci o pauză. Poți schimba drumul oricând.</p>
      <button type="button" className="experience-cta" onClick={start}>Începe drumul <ArrowRight size={18} aria-hidden /></button>
      <button type="button" className="experience-link" onClick={onBack}>Nu acesta este drumul meu</button>
    </section>
  )
}
