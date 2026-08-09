import { useMemo } from "react"
import { ArrowRight, BookOpen, HandHeart, LifeBuoy, Mountain } from "lucide-react"
import { bridgeForPath } from "@emanus/shared"
import { currentPath, firstJournalEntry, load, markPathSeen } from "../journey"
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
 * ORDINEA DE AICI E STRATEGIA APLICAȚIEI, nu o preferință de așezare în pagină.
 *
 * Omul intră printr-o durere: o ușă, sau o categorie de vârstă. Face un parcurs
 * scurt și ajunge aici. Dacă tot ce-i oferim în clipa asta e o listă de alte
 * dureri prin care ar putea trece, aplicația e un raft de cursuri despre
 * suferință. De aceea primul lucru de după parcurs e Drumul Emaus: nu încă o
 * rană de rezolvat, ci drumul întreg, în care rana prin care a intrat era doar
 * primul kilometru. Abia după ce merge acolo se deschide ucenicia — exact
 * ordinea din Luca 24, unde trimiterea vine după ce Iisus li Se descoperă, nu
 * înainte.
 *
 * Celelalte ieșiri rămân toate, dedesubt. Nu îl obligăm nimeni pe hartă.
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
  const first = useMemo(() => firstJournalEntry(), [])
  const last = useMemo(() => {
    const j = load().journal
    return j[j.length - 1]
  }, [])
  const bridge = useMemo(() => bridgeForPath(path?.bridgeId ?? path?.id ?? ""), [path])

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

      {/*
        * Drumul Emaus. Primul lucru de după parcurs, înaintea oricărei alte uși.
        * Fără procent și fără "ai deblocat" — e o invitație, nu o recompensă.
        */}
      <div className="pathend__emmaus">
        <p className="today__kicker">Mai e ceva</p>
        <h2 style={{ marginTop: 4 }}>{bridge?.title ?? "Drumul Emaus"}</h2>
        {bridge ? <><p>{bridge.lookBack}</p><p>{bridge.nameIt}</p>{bridge.handoff.map((line) => <p key={line}>{line}</p>)}<p className="muted">{bridge.invitation}</p></> : <p>Drumul acesta nu se închide cu încă o rană. Poți continua pe Drumul Emaus când alegi tu.</p>}
        <button type="button" onClick={() => leave("/drum")}>
          Continuă pe Drumul Emaus <ArrowRight size={18} aria-hidden />
        </button>
      </div>

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
