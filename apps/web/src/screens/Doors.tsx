import { useState } from "react"
import { ArrowRight, Feather } from "lucide-react"
import { DOORS, DOOR_NONE_LABEL, getPath } from "@emanus/shared"
import { chooseDoor } from "../journey"
import { navigate } from "../router"

/*
 * Intrarea în aplicație. O SINGURĂ ÎnTREBARE. (docs/20 §1 și §3)
 * Nu e onboarding, nu e chestionar, nu e profil. Omul spune de ce a venit,
 * și din secunda aia aplicația are un drum pentru el.
 *
 * REGULĂ: nicio alegere de aici nu se termină într-un mesaj. Nici ușile nescrise,
 * nici "niciuna nu e a mea". Omul care a avut curajul să apese pe durerea lui
 * trebuie să plece de pe ecranul ăsta cu ceva în mână.
 */

const READY = ["path_neiertare", "path_temelie"]

export function Doors() {
  const [pending, setPending] = useState<string | null>(null)

  function start(pathId: string) {
    chooseDoor(pathId)
    navigate("/")
  }

  function pick(pathId: string | null, label: string) {
    if (pathId) {
      start(pathId)
      return
    }
    setPending(label)
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
            <button type="button" className="door" onClick={() => pick(d.pathId, d.label)}>
              <span>{d.label}</span>
              {d.pathId ? (
                <ArrowRight size={18} aria-hidden />
              ) : (
                <em className="door__soon">în lucru</em>
              )}
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="doors__none"
        onClick={() => setPending(DOOR_NONE_LABEL)}
      >
        {DOOR_NONE_LABEL}
      </button>

      {pending && (
        <div className="doors__pending">
          {pending === DOOR_NONE_LABEL ? (
            <p>
              Bine că ai spus-o. Nu toată lumea vine cu o rană anume, și nu e nimic în neregulă
              cu asta.
            </p>
          ) : (
            <p>
              <strong>„{pending}”</strong> — drumul ăsta nu e scris încă. Nu îți dau ceva pe
              jumătate și nu îți cer să aștepți degeaba.
            </p>
          )}
          <p className="muted">
            Sunt gata două drumuri. Alege-l pe cel care sună mai aproape — poți schimba
            oricând, fără să pierzi ce ai scris.
          </p>

          <ul className="doors__list">
            {READY.map((id) => {
              const p = getPath(id)
              if (!p) return null
              return (
                <li key={id}>
                  <button type="button" className="door" onClick={() => start(id)}>
                    <span>
                      <strong>{p.title}</strong>
                      <br />
                      <small className="muted">{p.promise}</small>
                    </span>
                    <ArrowRight size={18} aria-hidden />
                  </button>
                </li>
              )
            })}
          </ul>

          <button type="button" className="doors__none" onClick={() => setPending(null)}>
            Înapoi la listă
          </button>
        </div>
      )}
    </section>
  )
}
