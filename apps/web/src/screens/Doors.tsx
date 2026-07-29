import { useEffect, useMemo, useState } from "react"
import { ArrowRight, Search } from "lucide-react"
import {
  COMMON_DOORS,
  EXPLORE_DOORS,
  MORE_DOORS,
  doorHasOwnRoom,
  getDoor,
  getPath,
  resolveDoorPath,
} from "@emanus/shared"
import { chooseDoor } from "../journey"
import { navigate } from "../router"

/*
 * INTRAREA. (docs/21 §4)
 *
 * Trei ecrane, o singură atingere. Lista de uși ESTE bifurcația — nu îl întrebăm
 * niciodată pe om "ai un scop anume sau doar explorezi?". Nimeni nu se
 * autoclasifică la două noaptea.
 *
 * Zece propoziții întâi, restul la "Arată-mi tot". 31 de opțiuni deodată obosesc
 * pe telefon și produc indecizie. Căutarea apare doar în lista completă: omul
 * care plânge alege, nu tastează.
 *
 * INTERZIS aici: câmpuri despre om, vârstă, denominație, scale, cont.
 */

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

  // Venit din clipul unui creator: întrebăm o dată, nu presupunem.
  const [askLink, setAskLink] = useState<string | null>(fromLink)

  useEffect(() => {
    if (fromLink) setAskLink(fromLink)
  }, [fromLink])

  if (askLink) {
    return <FromCreator doorId={askLink} onNo={() => setAskLink(null)} />
  }

  if (picked) {
    return <Confirm doorId={picked} onBack={() => setPicked(null)} />
  }

  const term = q.trim().toLowerCase()
  const rest = term
    ? [...COMMON_DOORS, ...MORE_DOORS].filter((d) => d.label.toLowerCase().includes(term))
    : MORE_DOORS

  return (
    <section className="doors">
      <p className="doors__mark">Emanus</p>
      <h1 className="doors__title">Ce te-a adus aici?</h1>
      <p className="doors__sub">Alege propoziția care semănă cel mai mult cu ce trăiești.</p>

      {!term && (
        <ul className="doors__list">
          {COMMON_DOORS.map((d) => (
            <li key={d.id}>
              <button type="button" className="door" onClick={() => setPicked(d.id)}>
                <span>{d.label}</span>
                <ArrowRight size={18} aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      )}

      {!showAll && !term && (
        <button type="button" className="doors__more" onClick={() => setShowAll(true)}>
          Arată-mi toate opțiunile
        </button>
      )}

      {showAll && (
        <>
          <label className="doors__search">
            <Search size={16} aria-hidden />
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Caută în cuvintele tale"
              aria-label="Caută în cuvintele tale"
            />
          </label>
          <ul className="doors__list">
            {rest.map((d) => (
              <li key={d.id}>
                <button type="button" className="door" onClick={() => setPicked(d.id)}>
                  <span>{d.label}</span>
                  <ArrowRight size={18} aria-hidden />
                </button>
              </li>
            ))}
          </ul>
          {term && rest.length === 0 && (
            <p className="doors__sub">
              Nu găsim propoziția asta. Nu înseamnă că nu e loc pentru tine — alege de mai jos.
            </p>
          )}
        </>
      )}

      {/* Cine nu vine cu o rană anume. Trei feluri, nu unul. */}
      <ul className="doors__list doors__list--quiet">
        {EXPLORE_DOORS.map((d) => (
          <li key={d.id}>
            <button type="button" className="door door--quiet" onClick={() => setPicked(d.id)}>
              <span>{d.label}</span>
              <ArrowRight size={16} aria-hidden />
            </button>
          </li>
        ))}
      </ul>

      <p className="doors__note">
        Nu îți cerem bani, nu îți cerem date și nu îți dăm note. Poți schimba drumul oricând.
      </p>
    </section>
  )
}

/*
 * Venit din materialul unui creator. Clipul a fost onboardingul — dar tot îl
 * întrebăm o dată, ca să nu presupunem despre el pe baza unui video.
 */
function FromCreator({ doorId, onNo }: { doorId: string; onNo: () => void }) {
  const door = getDoor(doorId)
  if (!door) {
    onNo()
    return null
  }
  return (
    <section className="confirm">
      <p className="doors__mark">Emanus</p>
      <p className="confirm__lead">Ai ajuns aici dintr-un material despre:</p>
      <p className="confirm__echo">„{door.label}”</p>
      <p className="confirm__note">E și ce ai nevoie tu acum?</p>
      <button type="button" className="confirm__cta" onClick={() => navigate(`/intrare?pick=${door.id}`)}>
        Da, începe <ArrowRight size={18} aria-hidden />
      </button>
      <button type="button" className="today__back" onClick={onNo}>
        Nu, vreau să aleg eu
      </button>
    </section>
  )
}

/* Ecranul 3: confirmarea. Prima propoziție de pe ecran e propoziția LUI. */
function Confirm({ doorId, onBack }: { doorId: string; onBack: () => void }) {
  const door = getDoor(doorId)
  const pathId = resolveDoorPath(doorId)
  const path = getPath(pathId)
  if (!door || !path) {
    onBack()
    return null
  }

  const own = doorHasOwnRoom(doorId)
  const explore = door.roomId === null
  const minutes = path.lessons[0]?.estMinutes ?? 10

  function start() {
    chooseDoor(pathId)
    navigate("/")
  }

  return (
    <section className="confirm">
      <p className="confirm__echo">„{door.label}”</p>

      {own && !explore && <p className="confirm__lead">Bine că ai spus-o. Mergem de aici.</p>}
      {!own && (
        <p className="confirm__lead">
          Bine că ai spus-o. Drumul scris exact pentru asta nu e gata încă — nu îți dau ceva pe
          jumătate. Dar începem cu ce e dedesubt oricum, la toată lumea.
        </p>
      )}
      {own && explore && (
        <p className="confirm__lead">
          Nu toată lumea vine cu o rană anume, și nu e nimic în neregulă cu asta.
        </p>
      )}

      <div className="confirm__card">
        <h2 className="confirm__title">{path.title}</h2>
        <p className="confirm__promise">{path.promise}</p>
        <p className="confirm__meta">
          {path.lessons.length} lecții &middot; câte una la două zile &middot; {minutes} minute prima
        </p>
      </div>

      <p className="confirm__note">
        Nu îți cerem bani și nu îți dăm note. Poți schimba drumul oricând, fără să pierzi ce ai
        scris.
      </p>

      <button type="button" className="confirm__cta" onClick={start}>
        Începe <ArrowRight size={18} aria-hidden />
      </button>
      <button type="button" className="today__back" onClick={onBack}>
        Nu asta e a mea
      </button>
    </section>
  )
}
