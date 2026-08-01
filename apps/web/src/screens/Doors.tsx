import { useEffect, useMemo, useState } from "react"
import { ArrowRight, Search } from "lucide-react"
import {
  commonContentDoors,
  contentDoor as getDoor,
  contentPath as getPath,
  doorHasOwnRoom,
  exploreContentDoors,
  moreContentDoors,
  resolveDoorPath,
} from "../content"
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
  const commonDoors = commonContentDoors()
  const moreDoors = moreContentDoors()
  const exploreDoors = exploreContentDoors()
  const fromLink = useMemo(doorFromLink, [])
  const [picked, setPicked] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)
  const [q, setQ] = useState("")
  const [askLink, setAskLink] = useState<string | null>(fromLink)

  useEffect(() => {
    if (fromLink) setAskLink(fromLink)
  }, [fromLink])

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

  const term = q.trim().toLowerCase()
  const rest = term
    ? [...commonDoors, ...moreDoors].filter((d) => d.label.toLowerCase().includes(term))
    : moreDoors

  return (
    <section className="doors">
      <p className="doors__mark">Emanus</p>
      <h1 className="doors__title">Ce te-a adus aici?</h1>
      <p className="doors__sub">Alege propoziția care seamănă cel mai mult cu ce trăiești.</p>
      {!term && <ul className="doors__list">{commonDoors.map((d) => <li key={d.id}><button type="button" className="door" onClick={() => setPicked(d.id)}><span>{d.label}</span><ArrowRight size={18} aria-hidden /></button></li>)}</ul>}
      {!showAll && !term && <button type="button" className="doors__more" onClick={() => setShowAll(true)}>Arată-mi toate opțiunile</button>}
      {showAll && <><label className="doors__search"><Search size={16} aria-hidden /><input type="text" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Caută în cuvintele tale" aria-label="Caută în cuvintele tale" /></label><ul className="doors__list">{rest.map((d) => <li key={d.id}><button type="button" className="door" onClick={() => setPicked(d.id)}><span>{d.label}</span><ArrowRight size={18} aria-hidden /></button></li>)}</ul>{term && rest.length === 0 && <p className="doors__sub">Nu găsim propoziția asta. Nu înseamnă că nu e loc pentru tine — alege de mai jos.</p>}</>}
      <ul className="doors__list doors__list--quiet">{exploreDoors.map((d) => <li key={d.id}><button type="button" className="door door--quiet" onClick={() => setPicked(d.id)}><span>{d.label}</span><ArrowRight size={16} aria-hidden /></button></li>)}</ul>
      <p className="doors__note">Nu îți cerem bani, nu îți cerem date și nu îți dăm note. Poți schimba drumul oricând.</p>
      <p className="doors__note">Emanus nu înlocuiește medicul, psihologul, poliția sau 112.</p>
    </section>
  )
}

function FromCreator({ doorId, onYes, onNo }: { doorId: string; onYes: (doorId: string) => void; onNo: () => void }) {
  const door = getDoor(doorId)
  useEffect(() => {
    if (!door) onNo()
  }, [door, onNo])
  if (!door) return null
  return <section className="confirm"><p className="doors__mark">Emanus</p><p className="confirm__lead">Ai ajuns aici dintr-un material despre:</p><p className="confirm__echo">„{door.label}”</p><p className="confirm__note">E și ce ai nevoie tu acum?</p><button type="button" className="confirm__cta" onClick={() => onYes(door.id)}>Da, începe <ArrowRight size={18} aria-hidden /></button><button type="button" className="today__back" onClick={onNo}>Nu, vreau să aleg eu</button></section>
}

function Confirm({ doorId, onBack }: { doorId: string; onBack: () => void }) {
  const door = getDoor(doorId)
  const pathId = resolveDoorPath(doorId)
  const path = getPath(pathId)
  useEffect(() => {
    if (!door || !path) onBack()
  }, [door, onBack, path])
  if (!door || !path) return null
  const own = doorHasOwnRoom(doorId)
  const explore = door.roomId === null
  const minutes = path.lessons[0]?.estMinutes ?? 10
  function start() { chooseDoor(doorId); navigate("/") }
  return <section className="confirm"><p className="confirm__echo">„{door.label}”</p>{own && !explore && <p className="confirm__lead">Bine că ai spus-o. Mergem de aici.</p>}{!own && <p className="confirm__lead">Bine că ai spus-o. Drumul scris exact pentru asta nu e gata încă — nu îți dau ceva pe jumătate. Dar începem cu ce e dedesubt oricum, la toată lumea.</p>}{own && explore && <p className="confirm__lead">Nu toată lumea vine cu o rană anume, și nu e nimic în neregulă cu asta.</p>}<div className="confirm__card"><h2 className="confirm__title">{path.title}</h2><p className="confirm__promise">{path.promise}</p><p className="confirm__meta">{path.lessons.length} lecții &middot; câte una la două zile &middot; {minutes} minute prima</p></div><p className="confirm__note">Nu îți cerem bani și nu îți dăm note. Poți schimba drumul oricând, fără să pierzi ce ai scris.</p><button type="button" className="confirm__cta" onClick={start}>Începe <ArrowRight size={18} aria-hidden /></button><button type="button" className="today__back" onClick={onBack}>Nu asta e a mea</button></section>
}
