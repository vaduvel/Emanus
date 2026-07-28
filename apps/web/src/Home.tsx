import { useEffect, useState } from "react"
import type { CSSProperties } from "react"
import { HandHeart, LifeBuoy } from "lucide-react"
import type { CommunityPostView, DashboardView } from "@emanus/shared"
import { getCommunity, getDashboard, prayForPost } from "./api"
import { navigate } from "./router"
import { getCategory } from "./session"
import { CheckIn, Hero, JourneyPath } from "./components"
import type { NextLesson } from "./components"
import { Avatar } from "./ds"

/*
 * Acasă — "un singur lucru azi" (docs/19-decizii-ui.md §4).
 *
 * Ce a fost scos, si de ce:
 *  - rândul cu flacăra / XP / nivel  → nicio cifră care măsoară un om;
 *  - radarul hexagonal pe 6 axe      → formulă cu ponderi inventate, scos din navigare
 *                                      (rămâne accesibil doar din /dashboard);
 *  - grila "Exploreză" cu 6 piloni    → 6 blocuri egale = niciun lucru important;
 *  - versetul zilei deconectat        → devine pasul din modulul tău, nu un card separat.
 *
 * Ce a rămas, în ordinea în care se citește ecranul:
 *  1. un singur lucru de făcut azi (Hero + "Continuă");
 *  2. "Cum e cu sufletul tău azi?" — intrarea în motorul de memorie (docs/18);
 *  3. unde ești pe drum;
 *  4. o cerere reală de rugăciune de la altcineva.
 */

const moreBtnStyle = { marginTop: 10 }
const sosStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  alignSelf: "flex-start",
  background: "var(--crisis-soft)",
  color: "var(--crisis-ink)",
  border: "1px solid var(--crisis)",
  borderRadius: "var(--radius-pill)",
  padding: "8px 14px",
  fontSize: "0.85rem",
  fontWeight: 600,
  boxShadow: "none",
  cursor: "pointer",
}
const prayerLineStyle: CSSProperties = { display: "flex", alignItems: "center", gap: 10 }
const prayerLineTextStyle: CSSProperties = { flex: 1 }
const prayBtnStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  background: "var(--accent-soft)",
  color: "var(--accent-strong)",
  border: "1px solid var(--accent)",
  borderRadius: "var(--radius-pill)",
  padding: "6px 12px",
  fontSize: "0.8rem",
  fontWeight: 600,
  boxShadow: "none",
  cursor: "pointer",
  whiteSpace: "nowrap",
}
const prayCountStyle: CSSProperties = { fontSize: "0.78rem", marginTop: 6, display: "block" }

export function Home() {
  const [dash, setDash] = useState<DashboardView | null>(null)
  const [posts, setPosts] = useState<CommunityPostView[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [prayed, setPrayed] = useState(false)
  const [prayCount, setPrayCount] = useState<number | null>(null)

  useEffect(() => {
    getDashboard()
      .then(setDash)
      .catch((e: unknown) => setError(e instanceof Error ? e.message : String(e)))
    getCommunity(getCategory())
      .then((r) => setPosts(r.posts))
      .catch(() => {
        /* comunitatea e opțională pentru Acasă */
      })
  }, [])

  if (error) return <p className="error">{error}</p>
  if (!dash) return <p className="muted">Se încarcă…</p>

  const { gam, modules, next } = dash
  const currentModule = modules.find((m) => !m.locked && m.lessonsCompleted < m.lessonsTotal)
  const nextLesson: NextLesson | null = next
    ? {
        lessonId: next.lessonId,
        title: next.title,
        lessonsCompleted: currentModule?.lessonsCompleted,
        lessonsTotal: currentModule?.lessonsTotal,
      }
    : null

  const latestPrayer = posts?.find((p) => p.kind === "prayer_request") ?? null

  async function pray(postId: string) {
    if (prayed) return
    setPrayed(true)
    try {
      const r = await prayForPost(postId)
      setPrayCount(r.prayCount)
    } catch {
      setPrayed(false)
    }
  }

  return (
    <section className="home">
      <Hero gam={gam} next={nextLesson} onContinue={(id) => navigate(`/lesson/${id}`)} />

      {!nextLesson && (
        <section className="tile">
          <h2 className="tile__title">Ce te-a adus aici?</h2>
          <p className="muted">
            Alege de unde începi. Poți schimba oricând — nu se pierde nimic.
          </p>
          <button type="button" style={moreBtnStyle} onClick={() => navigate("/onboarding")}>
            Alege un început
          </button>
        </section>
      )}

      <button type="button" style={sosStyle} onClick={() => navigate("/crisis")}>
        <LifeBuoy size={16} aria-hidden />
        Ai nevoie de ajutor acum?
      </button>

      <CheckIn />

      {/* Lecție pilot, pentru validare de ton. Se scoate înainte de lansare. */}
      <section className="tile">
        <h2 className="tile__title">Lecție de probă</h2>
        <p className="muted">
          „N-ai fost făcut pentru tine” — pentru cine merge la biserică de ani de zile și nu s-a
          schimbat nimic. Aproximativ 11 minute. Nu se salvează nimic.
        </p>
        <button type="button" style={moreBtnStyle} onClick={() => navigate("/lesson/mohler_l1")}>
          Deschide lecția
        </button>
      </section>

      <section className="tile">
        <h2 className="tile__title">
          Unde ești pe drum
          <button type="button" className="ghost" onClick={() => navigate("/dashboard")}>
            Tot parcursul
          </button>
        </h2>
        <JourneyPath
          modules={modules}
          nextLessonId={next?.lessonId ?? null}
          onSelect={(id) => navigate(`/lesson/${id}`)}
        />
      </section>

      <section className="tile">
        <h2 className="tile__title">Cineva are nevoie de rugăciune</h2>
        {latestPrayer ? (
          <>
            <div className="social-strip" style={prayerLineStyle}>
              <Avatar name={latestPrayer.author.anonName} size="sm" />
              <span className="social-strip__text" style={prayerLineTextStyle}>
                <b>{latestPrayer.author.anonName}</b> a cerut rugăciune
              </span>
              <button
                type="button"
                style={prayBtnStyle}
                disabled={prayed}
                onClick={() => pray(latestPrayer.id)}
              >
                <HandHeart size={14} aria-hidden />
                {prayed ? "Te-ai rugat" : "Mă rog"}
              </button>
            </div>
            {(() => {
              const count = prayCount ?? latestPrayer.prayCount
              return count > 0 ? (
                <span className="muted" style={prayCountStyle}>
                  {count} {count === 1 ? "persoană s-a rugat" : "persoane s-au rugat"}
                </span>
              ) : null
            })()}
          </>
        ) : (
          <div className="social-strip">
            <div className="social-strip__avatars">
              <Avatar name="Andrei M" size="sm" />
              <Avatar name="Maria I" size="sm" />
              <Avatar name="David P" size="sm" />
              <Avatar name="Ioana R" size="sm" />
            </div>
            <span className="social-strip__text">Nu ești singur pe drumul ăsta.</span>
          </div>
        )}
        <button type="button" className="ghost" style={moreBtnStyle} onClick={() => navigate("/community")}>
          Vezi comunitatea →
        </button>
      </section>
    </section>
  )
}
