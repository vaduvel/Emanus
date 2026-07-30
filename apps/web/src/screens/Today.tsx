import { useEffect, useMemo, useState } from "react"
import { ArrowRight, BellRing, BookOpen, HandHeart, Library as LibraryIcon, Sunrise } from "lucide-react"
import type { ContentLessonSummary } from "@emanus/shared/content-catalog"
import {
  addPrayer,
  currentPath,
  daysAgo,
  dismissPrayerInvite,
  doctrineAvailable,
  oldestUnanswered,
  plan,
  shouldInviteFirstPrayer,
} from "../journey"
import { declineReminder, enableReminder, shouldOfferReminder } from "../reminder"
import { navigate } from "../router"
import { cloudEnabled } from "../cloud"

/*
 * "Azi" — singurul ecran principal. (docs/20 §8)
 *
 * Ce NU are voie să apară aici, niciodată:
 * serie de zile, XP, nivel, procent, "ziua 4 din 7", clasament.
 * Dacă aplicația măsoară ceva, devine obicei. (docs/20 §1)
 *
 * REGULĂ DE ONESTITATE (docs/22 §8): nu promitem niciodată că datele "nu pleacă
 * de pe telefon" cât timp există backup în cloud. Textul se schimbă după cum e
 * configurată aplicația, nu după cum ar suna mai bine.
 */

function memoryVerse(lesson: ContentLessonSummary): { text: string; ref: string } | null {
  return lesson.memoryVerse
}

/** Ce scrie sub câmpul de rugăciune. Adevărul, nu ce sună mai liniștitor. */
function privacyLine(): string {
  return cloudEnabled()
    ? "Nu o citește nimeni. Se salvează pe telefonul tău și într-un spațiu de backup legat doar de tine, ca să n-o pierzi dacă schimbi telefonul."
    : "Nu o citește nimeni și nu pleacă nicăieri de pe telefonul tău."
}

export function Today() {
  const path = currentPath()
  const dayPlan = useMemo(() => plan(), [])
  const memorial = useMemo(() => oldestUnanswered(), [])
  const doctrine = useMemo(() => doctrineAvailable(), [])
  const [yesterday, setYesterday] = useState<string | null>(null)
  const [inviteOpen, setInviteOpen] = useState(() => shouldInviteFirstPrayer())
  const [prayerText, setPrayerText] = useState("")
  const [prayerSaved, setPrayerSaved] = useState(false)
  const [askReminder, setAskReminder] = useState(() => shouldOfferReminder())

  const complete = dayPlan?.kind === "path_complete"
  useEffect(() => {
    if (complete) navigate("/final")
  }, [complete])

  if (!path || !dayPlan || complete) return null

  const lastLesson = path.lessons[dayPlan.lessonIndex]
  const verse = lastLesson ? memoryVerse(lastLesson) : null
  const isFirstEver = dayPlan.kind === "lesson" && dayPlan.lessonIndex === 0
  const away = dayPlan.awayDays

  function saveFirstPrayer() {
    if (!prayerText.trim()) return
    addPrayer(prayerText)
    setPrayerSaved(true)
  }

  return (
    <section className="today">
      <header className="today__head">
        <Sunrise size={22} strokeWidth={1.7} aria-hidden />
        <h1>{away ? "Te-ai întors" : "Bine că ești aici"}</h1>
      </header>

      {/*
        Întoarcerea după tăcere. NU e o mustrare și nu se afișează ca statistică.
        Omul care lipsește trei săptămâni se întoarce cu vinovăție; dacă primește
        și de la noi o palmă, pleacă definitiv.
      */}
      {away && (
        <div className="tile today__back">
          <p>
            Au trecut {away} de zile de când n-ai mai intrat. Nu s-a șters nimic și nu
            începem de la capăt.
          </p>
          <p className="muted">
            Reluăm exact de unde ai rămas. Și, dacă vrei să știi: nici El nu ține socoteala
            zilelor în care n-ai vorbit cu El.
          </p>
        </div>
      )}

      {/* "Cum a fost ieri?" — o singură atingere, nu chestionar. Nu se salvează. */}
      {!isFirstEver && !away && dayPlan.kind === "lesson" && (
        <div className="tile today__yesterday">
          <p className="today__q">Pasul de data trecută — cum a fost?</p>
          {yesterday === null ? (
            <div className="today__chips">
              <button type="button" onClick={() => setYesterday("da")}>
                L-am făcut
              </button>
              <button type="button" onClick={() => setYesterday("nu")}>
                N-am reușit
              </button>
              <button type="button" onClick={() => setYesterday("uitat")}>
                Am uitat
              </button>
            </div>
          ) : (
            <p className="muted">
              {yesterday === "da"
                ? "Bine. Mergem mai departe."
                : "Nu s-a stricat nimic. Continuăm de unde am rămas."}
            </p>
          )}
        </div>
      )}

      {dayPlan.kind === "lesson" && dayPlan.lesson && (
        <div className="tile today__main">
          <p className="today__kicker">{path.title}</p>
          <h2>{dayPlan.lesson.title}</h2>
          <p className="muted">
            {dayPlan.lesson.estMinutes} minute. Un singur lucru azi.
          </p>
          <button
            type="button"
            className="today__cta"
            onClick={() => navigate(`/lesson/${dayPlan.lesson?.id ?? ""}`)}
          >
            {away ? "Reia" : "Începe"} <ArrowRight size={18} aria-hidden />
          </button>
          {isFirstEver && <p className="muted today__promise">{path.promise}</p>}
        </div>
      )}

      {dayPlan.kind === "practice" && (
        <div className="tile today__main">
          <p className="today__kicker">Ziua dintre</p>
          <h2>Azi nu înveți nimic nou</h2>
          <p>{dayPlan.practiceText}</p>
          <p className="muted today__promise">
            Lecția următoare te așteaptă mâine. Nu se pierde.
          </p>
        </div>
      )}

      {dayPlan.kind === "done_today" && (
        <div className="tile today__main">
          <h2>Ai fost azi aici</h2>
          <p>{dayPlan.practiceText}</p>
          <p className="muted today__promise">Ne vedem mâine.</p>
        </div>
      )}

      {verse && (
        <blockquote className="scripture today__verse">
          {verse.text}
          <cite>{verse.ref}</cite>
        </blockquote>
      )}

      {/*
        Prima rugăciune. O singură invitație, după a doua lecție.
        Fără ea, memorialul nu pornește niciodată — și memorialul e motivul
        pentru care omul se întoarce peste un an.
      */}
      {inviteOpen && (
        <div className="tile today__invite">
          {prayerSaved ? (
            <>
              <p className="today__kicker">
                <HandHeart size={15} aria-hidden /> Am scris-o
              </p>
              <p>
                Nu ți-o mai amintim mâine. Dar peste câteva săptămâni te întrebăm o dată
                unde a ajuns.
              </p>
              <button type="button" className="ghost" onClick={() => setInviteOpen(false)}>
                Bine
              </button>
            </>
          ) : (
            <>
              <p className="today__kicker">
                <HandHeart size={15} aria-hidden /> Un lucru pe care Îl aștepți
              </p>
              <p>
                Scrie un singur lucru pentru care te rogi acum. {privacyLine()}
              </p>
              <textarea
                className="journal"
                rows={3}
                value={prayerText}
                placeholder="Doamne, aș vrea să…"
                onChange={(e) => setPrayerText(e.target.value)}
              />
              <div className="today__invite-actions">
                <button type="button" className="today__cta" onClick={saveFirstPrayer}>
                  Scrie
                </button>
                <button
                  type="button"
                  className="ghost"
                  onClick={() => {
                    dismissPrayerInvite()
                    setInviteOpen(false)
                  }}
                >
                  Nu acum
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/*
        Notificarea. Se cere o singură dată, după prima lecție — nu la instalare,
        când omul încă nu știe ce primește. (docs/18)
      */}
      {askReminder && (
        <div className="tile today__invite">
          <p className="today__kicker">
            <BellRing size={15} aria-hidden /> O dată pe zi, dimineața
          </p>
          <p>
            Îți trimitem un singur mesaj pe zi, cu ce urmează. Niciodată două și niciodată
            „ai pierdut șirul”.
          </p>
          <div className="today__invite-actions">
            <button
              type="button"
              className="today__cta"
              onClick={() => {
                void enableReminder().then(() => setAskReminder(false))
              }}
            >
              Da, o dată pe zi
            </button>
            <button
              type="button"
              className="ghost"
              onClick={() => {
                declineReminder()
                setAskReminder(false)
              }}
            >
              Nu, mulțumesc
            </button>
          </div>
        </div>
      )}

      {/*
        Doctrina generală — se deschide abia după lecția 5 din parcurs. (docs/20 §6)
        Nu înlocuiește ziua de azi, stă alături și e opțională.
      */}
      {doctrine && (
        <div className="tile today__extra">
          <p className="today__kicker">
            <BookOpen size={15} aria-hidden /> Dacă vrei și limpezime, nu doar vindecare
          </p>
          <h3>{doctrine.title}</h3>
          <p className="muted">{doctrine.estMinutes} minute. Când ai chef, nu azi obligatoriu.</p>
          <button
            type="button"
            className="ghost"
            onClick={() => navigate(`/lesson/${doctrine.id}`)}
          >
            Deschide
          </button>
        </div>
      )}

      {/* Cârligul lung: aplicația ține minte ce a cerut. Întreabă o singură dată. */}
      {memorial && (
        <div className="tile today__memorial">
          <p className="today__kicker">
            <HandHeart size={15} aria-hidden /> Acum {daysAgo(memorial.createdAt)} de zile te rugai
            pentru:
          </p>
          <p className="today__prayer-text">„{memorial.text}”</p>
          <button type="button" className="ghost" onClick={() => navigate("/rugaciuni")}>
            Unde e acum?
          </button>
        </div>
      )}

      {/*
        Biblioteca. Stă jos, după ce e de azi, și nu e tab: cine intră să caute
        altceva o găsește, dar nu concurează cu singurul lucru de azi.
      */}
      <button
        type="button"
        className="today__switch"
        onClick={() => navigate("/biblioteca")}
      >
        <LibraryIcon size={15} aria-hidden /> Vreau să învăț și altceva
      </button>

      {/*
        Ieșirea. Alegerea de la intrare nu îl închide pe om într-un singur drum, și
        asta nu se ascunde în setări: sunt oameni care aleg greșit prima dată, și
        alții pe care îi doare altceva peste două săptămâni.
        Ce a scris rămâne al lui, oricare drum alege.
      */}
      <button type="button" className="today__switch" onClick={() => navigate("/intrare")}>
        Nu mă mai regăsesc aici. Vreau alt drum.
      </button>
    </section>
  )
}
