import { useEffect, useState } from "react"
import { ArrowRight, Feather } from "lucide-react"
import {
  DOORS,
  EXPLORE_DOORS,
  doorHasOwnRoom,
  getDoor,
  getPath,
  resolveDoorPath,
} from "@emanus/shared"
import { chooseDoor } from "../journey"
import { navigate } from "../router"

/*
 * Intrarea în aplicație. O SINGURĂ ATINGERE. (docs/21 §4)
 *
 * Nu întrebăm omul de ce a venit și apoi ce vrea. Nu îl punem să se
 * autoclasifice în "am un scop anume" vs "doar explorez" — nimeni nu poate
 * răspunde onest la asta, iar cel mai disper[at om nu bifează categorii la 2
 * noaptea. Lista de uși ESTE bifurcația: cine are o durere o vede scrisă și o
 * apasă; cine explorează ajunge la capătul listei.
 *
 * REGULI:
 * - nicio ușă nu e fundătură; camerele nescrise duc în temelie, cu un rând onest
 * - zero întrebări despre om; reținem doar ușa aleasă
 * - nu-l întoarcem la un ecran de pornire: din confirmare merge direct în ziua lui
 */

/** Linkul de creator: /#/intrare?u=neiertare. Clipul a fost onboardingul. (docs/21 §5) */
function doorFromLink(): string | null {
  const hash = window.location.hash
  const q = hash.indexOf("?")
  if (q < 0) return null
  const id = new URLSearchParams(hash.slice(q + 1)).get("u")
  if (!id) return null
  return getDoor(id) ? id : null
}

export function Doors() {
  const [picked, setPicked] = useState<string | null>(null)
  const [fromLink, setFromLink] = useState(false)

  useEffect(() => {
    const id = doorFromLink()
    if (id) {
      setPicked(id)
      setFromLink(true)
    }
  }, [])

  if (picked) {
    return (
      <Confirm
        doorId={picked}
        fromLink={fromLink}
        onBack={() => {
          setPicked(null)
          setFromLink(false)
        }}
      />
    )
  }

  return (
    <section className="doors">
      <div className="doors__mark">
        <Feather size={28} strokeWidth={1.6} aria-hidden />
      </div>
      <h1 className="doors__title">Ce te-a adus aici?</h1>
      <p className="muted doors__sub">
        Alege ce e mai aproape de adevăr azi. Poți schimba oricând — nu se pierde nimic.
      </p>

      <ul className="doors__list">
        {DOORS.map((d) => (
          <li key={d.id}>
            <button type="button" className="door" onClick={() => setPicked(d.id)}>
              <span>{d.label}</span>
              <ArrowRight size={18} aria-hidden />
            </button>
          </li>
        ))}
      </ul>

      <ul className="doors__list doors__list--quiet">
        {EXPLORE_DOORS.map((d) => (
          <li key={d.id}>
            <button type="button" className="door door--quiet" onClick={() => setPicked(d.id)}>
              <span>{d.label}</span>
              <ArrowRight size={18} aria-hidden />
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

/*
 * Ecranul 3: confirmarea. Numele drumului, ce primește, cât durează, și "Începe".
 * Aici, și numai aici, spunem adevărul dacă camera lui nu e scrisă încă.
 */
function Confirm({
  doorId,
  fromLink,
  onBack,
}: {
  doorId: string
  fromLink: boolean
  onBack: () => void
}) {
  const door = getDoor(doorId)
  const pathId = resolveDoorPath(doorId)
  const path = getPath(pathId)
  const own = doorHasOwnRoom(doorId)
  const explore = door?.roomId == null

  if (!door || !path) return null

  function start() {
    chooseDoor(pathId)
    navigate("/")
  }

  return (
    <section className="doors confirm">
      <p className="confirm__echo">„{door.label}”</p>

      {own && (
        <p className="confirm__lead">
          Bine că ai spus-o. Nu ești primul și nu e ceva de care să-ți fie rușine aici.
        </p>
      )}
      {!own && !explore && (
        <p className="confirm__lead">
          Bine că ai spus-o. Drumul scris exact pentru asta încă nu e gata — nu-ți dau ceva pe
          jumătate. Dar începe cu ce e dedesubt oricum, la toată lumea.
        </p>
      )}
      {explore && (
        <p className="confirm__lead">
          Nu toată lumea vine cu o rană anume, și nu e nimic în neregulă cu asta.
        </p>
      )}

      <div className="confirm__card">
        <h1 className="confirm__title">{path.title}</h1>
        <p className="confirm__promise">{path.promise}</p>
        <p className="muted confirm__meta">
          {path.lessons.length} lecții · câte una la două zile · {path.lessons[0].estMinutes} minute
          prima
        </p>
      </div>

      <p className="muted confirm__note">
        Nu-ți cerem bani, nu-ți cerem date și nu măsurăm nimic. Poți schimba drumul oricând — ce
        scrii rămâne al tău.
      </p>

      <button type="button" className="confirm__cta" onClick={start}>
        Începe
        <ArrowRight size={18} aria-hidden />
      </button>

      <button type="button" className="doors__none" onClick={onBack}>
        {fromLink ? "Nu asta e a mea" : "Înapoi la listă"}
      </button>
    </section>
  )
}
