import { useState } from "react"
import { ArrowRight, Feather } from "lucide-react"
import { DOORS, DOOR_NONE_LABEL } from "@emanus/shared"
import { chooseDoor } from "../journey"
import { navigate } from "../router"

/*
 * Intrarea în aplicație. O SINGURĂ ÎntREBARE. (docs/20 §1 și §3)
 * Nu e onboarding, nu e chestionar, nu e profil. Omul spune de ce a venit,
 * și din secunda aia aplicația are un drum pentru el.
 */
export function Doors() {
  const [pending, setPending] = useState<string | null>(null)

  function pick(pathId: string | null, label: string) {
    if (pathId) {
      chooseDoor(pathId)
      navigate("/")
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
              {d.pathId ? <ArrowRight size={18} aria-hidden /> : <em className="door__soon">în lucru</em>}
            </button>
          </li>
        ))}
      </ul>

      <button type="button" className="doors__none" onClick={() => pick(null, DOOR_NONE_LABEL)}>
        {DOOR_NONE_LABEL}
      </button>

      {pending && (
        <div className="doors__pending">
          <p>
            <strong>„{pending}”</strong> — drumul ăsta nu e scris încă. Nu îți dau ceva pe jumătate.
          </p>
          <p className="muted">
            Deocamdată e gata un singur drum: pentru cine nu poate ierta pe cineva. Multe dureri
            trec pe acolo, chiar dacă nu așa le spunem pe nume.
          </p>
          <button type="button" onClick={() => pick("path_neiertare", "")}>
            Merg pe drumul ăsta
          </button>
          <button type="button" className="ghost" onClick={() => setPending(null)}>
            Înapoi la listă
          </button>
        </div>
      )}
    </section>
  )
}
