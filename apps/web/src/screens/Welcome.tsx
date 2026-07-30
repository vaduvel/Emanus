import { useState } from "react"
import { ArrowRight, Footprints } from "lucide-react"
import { markWelcomeSeen } from "../journey"
import { navigate } from "../router"

/*
 * Primul contact. Două ecrane, apoi ușile.
 *
 * Omul care deschide aplicația prima dată nu știe unde a intrat. Până acum
 * cădea direct în lista de uși și i se cerea să recunoască ceva despre el,
 * fără să știe cui. Aici îi spunem întâi cine suntem și ce NU-i cerem.
 *
 * Fără întrebări, fără câmpuri, fără cont. Doar două pagini și un buton.
 */
export function Welcome() {
  const [step, setStep] = useState(0)

  function enter() {
    markWelcomeSeen()
    navigate("/intrare")
  }

  return (
    <section className="welcome">
      <div className="welcome__mark">
        <Footprints size={26} strokeWidth={1.6} aria-hidden />
      </div>

      {step === 0 ? (
        <>
          <h1 className="welcome__title">Emanus</h1>
          <p className="welcome__lead">
            Numele vine din două locuri. <strong>Emanuel</strong> — „Dumnezeu este cu noi”.
            Și <strong>Emaus</strong> — drumul pe care doi oameni mergeau dezamăgiți, iar Iisus
            a mers lângă ei și le-a explicat Scripturile, fără ca ei să-Și dea seama cine e.
          </p>
          <p className="welcome__lead">
            Asta încearcă să fie aplicația: cineva care merge lângă tine pe drum și îți arată
            ce scrie acolo, pe înțelesul tău.
          </p>
          <button type="button" className="welcome__cta" onClick={() => setStep(1)}>
            Mai departe <ArrowRight size={18} aria-hidden />
          </button>
        </>
      ) : (
        <>
          <h1 className="welcome__title">Înainte să intri</h1>
          <ul className="welcome__list">
            <li>Nu îți cerem bani. Niciodată, pentru nimic.</li>
            <li>Nu îți cerem cont, nume sau număr de telefon.</li>
            <li>Nu îți punem întrebări ca să te încadrăm undeva.</li>
            <li>Nu numărăm zile și nu îți dăm puncte. Dacă lipsești, nu se strică nimic.</li>
            <li>Nu îți spunem la ce biserică să mergi.</li>
          </ul>
          <p className="welcome__lead">
            Un singur lucru pe zi, zece minute. Atât.
          </p>
          <button type="button" className="welcome__cta" onClick={enter}>
            Încep <ArrowRight size={18} aria-hidden />
          </button>
          <button type="button" className="welcome__skip" onClick={enter}>
            Sari peste
          </button>
        </>
      )}
    </section>
  )
}
