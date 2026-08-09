import { useEffect, useMemo, useState } from "react"
import { ArrowRight, LifeBuoy, Search } from "lucide-react"
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
    return (
      <FromCreator
        doorId={askLink}
        onYes={(id) => {
          setAskLink(null)
          setPicked(id)
        }}
        onNo={() => setAskLink(null)}
      />
    )
  }
  if (picked) return <Confirm doorId={picked} onBack={() => setPicked(null)} />

  const term = q.trim()
  const danger = hasSafetySignal(term)
  const rest = term
    ? searchDoors(term)
    : MORE_DOORS

  return (
    <section className="doors">
      <p className="doors__mark">Emanus</p>
      <h1 className="doors__title">Ce te-a adus aici?</h1>
      <p className="doors__sub">Alege propoziția care seamănă cel mai mult cu ce trăiești.</p>
      {!term && <ul className="doors__list">{COMMON_DOORS.map((d) => <li key={d.id}><button type="button" className="door" onClick={() => setPicked(d.id)}><span>{d.label}</span><ArrowRight size={18} aria-hidden /></button></li>)}</ul>}
      {!showAll && !term && <button type="button" className="doors__more" onClick={() => setShowAll(true)}>Arată-mi toate opțiunile</button>}
      {showAll && <><label className="doors__search"><Search size={16} aria-hidden /><input type="text" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Caută în cuvintele tale" aria-label="Caută în cuvintele tale" /></label>{danger ? <div className="confirm__card"><LifeBuoy size={22} aria-hidden /><h2 className="confirm__title">Siguranța vine înaintea unei lecții</h2><p className="confirm__promise">Dacă ești în pericol acum sau te gândești să îți faci rău, oprește alegerea unui drum și deschide Ajutor.</p><button type="button" onClick={() => navigate("/criza")}>Am nevoie de ajutor acum</button></div> : <><ul className="doors__list">{rest.map((d) => <li key={d.id}><button type="button" className="door" onClick={() => setPicked(d.id)}><span>{d.label}</span><ArrowRight size={18} aria-hidden /></button></li>)}</ul>{term && rest.length === 0 && <p className="doors__sub">Nu găsim propoziția asta. Nu înseamnă că nu e loc pentru tine — alege de mai jos.</p>}</>}</>}
      {!danger && <ul className="doors__list doors__list--quiet">{EXPLORE_DOORS.map((d) => <li key={d.id}><button type="button" className="door door--quiet" onClick={() => setPicked(d.id)}><span>{d.label}</span><ArrowRight size={16} aria-hidden /></button></li>)}</ul>}
      <p className="doors__note">Nu îți cerem bani, nu îți cerem date și nu îți dăm note. Poți schimba drumul oricând.</p>
      <p className="doors__note">Emanus nu înlocuiește medicul, psihologul, poliția sau 112.</p>
    </section>
  )
}

function SafetyCheck({ onContinue }: { onContinue: () => void }) {
  return <section className="confirm"><LifeBuoy size={28} aria-hidden /><p className="doors__mark">Întâi, siguranța</p><h1 className="doors__title">Ești în pericol acum?</h1><p className="confirm__lead">Te gândești să îți faci rău, ai făcut pregătiri, ești lovit sau amenințat ori îți este frică să rămâi unde ești?</p><div className="confirm__card"><p className="confirm__promise">Răspunsul tău nu este salvat local, în jurnal sau în cloud.</p></div><button type="button" className="confirm__cta" onClick={() => navigate("/criza")}>Da, am nevoie de ajutor acum</button><button type="button" className="confirm__secondary" onClick={onContinue}>Nu, pot continua spre uși</button></section>
}

function FromCreator({ doorId, onYes, onNo }: { doorId: string; onYes: (doorId: string) => void; onNo: () => void }) {
  const door = getDoor(doorId)
  if (!door) { onNo(); return null }
  return <section className="confirm"><p className="doors__mark">Emanus</p><p className="confirm__lead">Ai ajuns aici dintr-un material despre:</p><p className="confirm__echo">„{door.label}”</p><p className="confirm__note">E și ce ai nevoie tu acum?</p><button type="button" className="confirm__cta" onClick={() => onYes(door.id)}>Da, începe <ArrowRight size={18} aria-hidden /></button><button type="button" className="confirm__secondary" onClick={onNo}>Nu, vreau să aleg eu</button></section>
}

function Confirm({ doorId, onBack }: { doorId: string; onBack: () => void }) {
  const door = getDoor(doorId)
  const path = getPathForDoor(doorId)
  if (!door || !path) { onBack(); return null }
  const own = doorHasOwnRoom(doorId)
  const explore = door.roomId === null
  const minutes = path.lessons[0]?.estMinutes ?? 10
  function start() { chooseDoor(doorId); navigate("/") }
  if (!isPathReviewed(path)) return <section className="confirm"><p className="confirm__echo">„{door.label}”</p><p className="confirm__lead">Conținutul este scris, dar revizia cerută pentru această situație nu este încă închisă. Nu îți livrăm o lecție sensibilă doar pentru că există în cod.</p><div className="confirm__card"><h2 className="confirm__title">Poți continua în siguranță din celelalte zone</h2><p className="confirm__promise">Ajutor, Biblia, Rugăciuni și ecranul Azi rămân disponibile.</p></div><button type="button" className="confirm__cta" onClick={() => navigate("/criza")}>Am nevoie de ajutor acum</button><button type="button" className="confirm__secondary" onClick={onBack}>Alege altă ușă</button></section>
  return <section className="confirm"><p className="confirm__echo">„{door.label}”</p>{own && !explore && <p className="confirm__lead">Bine că ai spus-o. Mergem de aici.</p>}{!own && <p className="confirm__lead">Bine că ai spus-o. Drumul scris exact pentru asta nu e gata încă — nu îți dau ceva pe jumătate. Dar începem cu ce e dedesubt oricum, la toată lumea.</p>}{own && explore && <p className="confirm__lead">Nu toată lumea vine cu o rană anume, și nu e nimic în neregulă cu asta.</p>}<div className="confirm__card"><h2 className="confirm__title">{path.title}</h2><p className="confirm__promise">{path.promise}</p><p className="confirm__meta">{path.lessons.length} lecții &middot; câte una la două zile &middot; {minutes} minute prima</p></div><p className="confirm__note">Nu îți cerem bani și nu îți dăm note. Poți schimba drumul oricând, fără să pierzi ce ai scris.</p><button type="button" className="confirm__cta" onClick={start}>Începe <ArrowRight size={18} aria-hidden /></button><button type="button" className="confirm__secondary" onClick={onBack}>Nu asta e a mea</button></section>
}
