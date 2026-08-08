import { useMemo } from "react"
import { ArrowRight, BookOpen, HandHeart, LifeBuoy, Mountain } from "lucide-react"
import { otherPaths } from "@emanus/shared"
import { currentPath, firstJournalEntry, load, markPathSeen, switchPath } from "../journey"
import { navigate } from "../router"

/*
 * Finalul unui parcurs. (docs/20 §9)
 *
 * Aici NU se dă certificat, insignă, procent sau felicitare de aplicație.
 * Singura dovadă că s-a schimbat ceva sunt propriile lui cuvinte, din prima zi
 * și din ultima. Nu-i spunem noi ce s-a schimbat — citește și vede singur.
 *
 * Și, imediat după: ce urmează. Un om care termină un drum și rămâne cu un ecran
 * gol închide aplicația și nu mai revine.
 *
 * PATRU IEȘIRI, NU UNA (docs/25, drumurile provizorii): pe lângă lista de
 * drumuri, ecranul trebuie să ofere Azi, Biblia, Ajutor și Rugăciuni. Motivul e
 * concret: `path_tristete` și `path_anxietate` au cinci lecții, nu șapte, deci
 * omul ajunge aici repede și nu amândouă săptămânile de rutină în spate. Dacă
 * singura continuare oferită e "începe alt drum", omului care abia a ieșit
 * dintr-un drum despre depresie îi spunem, de fapt, că următorul lucru de făcut
 * e încă un curs.
 *
 * IEȘIREA CĂTRE AJUTOR stă pe TOATE finalurile, nu doar pe cele două. Nu costase
 * nimic să fie acolo și la `path_acasa` sau `path_suferinta`, iar alternativa —
 * să decidem noi după ce drum "merită" un buton de ajutor — e exact felul de
 * judecată pe care docs/22 ne cere să nu o facem. Butonul e tăcut, nu alarmant.
 */
export function PathEnd() {
  const path = currentPath()
  const state = load()
  const first = useMemo(() => firstJournalEntry(), [])
  const last = useMemo(() => {
    const j = load().journal
    return j[j.length - 1]
  }, [])
  const next = useMemo(() => otherPaths(state.pathId), [state.pathId])

  function go(pathId: string) {
    switchPath(pathId)
    navigate("/")
  }

  function leave(to: string) {
    markPathSeen()
    navigate(to)
  }

  return (
    <section className="pathend">
      <Mountain size={26} strokeWidth={1.6} aria-hidden />
      <h1>Ai mers până la capăt</h1>
      <p className="muted">{path?.title}</p>

      {first && last && first.text !== last.text && (
        <>
          <p className="pathend__line">
            Nu-ți spun eu ce s-a schimbat. Citește-le încă o dată.
          </p>
          <p className="today__kicker">În prima zi ai scris:</p>
          <blockquote className="pathend__quote">{first.text}</blockquote>
          <p className="today__kicker" style={{ marginTop: 16 }}>
            Ultima dată ai scris:
          </p>
          <blockquote className="pathend__quote">{last.text}</blockquote>
        </>
      )}

      <p className="pathend__line">
        Drumul ăsta s-a terminat. Relația, nu. Mâine e tot o zi în care poți vorbi cu El.
      </p>

      {/* Ce urmează — concret, cu nume, nu „explorează”. */}
      {next.length > 0 && (
        <>
          <p className="today__kicker">De aici poți merge mai departe</p>
          <ul className="doors__list">
            {next.map((p) => (
              <li key={p.id}>
                <button type="button" className="door" onClick={() => go(p.id)}>
                  <span>
                    <strong>{p.title}</strong>
                    <br />
                    <small className="muted">{p.promise}</small>
                  </span>
                  <ArrowRight size={18} aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      {/*
        * Ieșirile care nu înseamnă "încă un curs": ziua de azi, Biblia,
        * rugăciunea. Un om are voie să termine un drum și să nu înceapă altul.
        */}
      <div className="pathend__actions">
        <button type="button" onClick={() => leave("/rugaciuni")}>
          <HandHeart size={18} aria-hidden /> Scrie o rugăciune pentru ce urmează
        </button>
        <button type="button" className="ghost" onClick={() => leave("/")}>
          Vezi ce e azi
        </button>
        <button type="button" className="ghost" onClick={() => leave("/biblia")}>
          <BookOpen size={18} aria-hidden /> Citește în Biblie
        </button>
        <button type="button" className="ghost" onClick={() => leave("/intrare")}>
          Vreau altă ușă
        </button>
      </div>

      {/*
        * Ajutorul NU cheamă `markPathSeen()`. Dacă omul apasă aici, nu vrem să
        * bifăm tăcut că "a văzut finalul" și să-i luăm ecranul ăsta când se
        * întoarce. Se întoarce și îl găsește tot aici.
        */}
      <button
        type="button"
        className="ghost"
        style={{ marginTop: 12 }}
        onClick={() => navigate("/criza")}
      >
        <LifeBuoy size={18} aria-hidden /> Am nevoie de ajutor acum
      </button>

      <p className="muted" style={{ marginTop: 18, fontSize: "0.85rem" }}>
        Ce ai scris rămâne al tău, oricare drum alegi.
      </p>
    </section>
  )
}
