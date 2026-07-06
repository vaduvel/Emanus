import { useEffect, useState } from "react"
import type { CSSProperties, ComponentType } from "react"
import {
  HandHeart,
  LifeBuoy,
  MessagesSquare,
  Milestone,
  Sprout,
  Sunrise,
  Users,
} from "lucide-react"
import type {
  CommunityPostView,
  DailyView,
  DashboardView,
  GrowthAxisId,
} from "@emanus/shared"
import { getCommunity, getDaily, getDashboard, prayForPost } from "./api"
import { navigate } from "./router"
import { getCategory } from "./session"
import { CheckIn, GrowthRadar, Hero, JourneyPath } from "./components"
import type { NextLesson } from "./components"
import { Avatar } from "./ds"

const AXIS_LABEL: Record<GrowthAxisId, string> = {
  identity: "Identitate",
  emotional_peace: "Pace",
  relationships: "Relații",
  living_faith: "Credință",
  character: "Caracter",
  freedom: "Libertate",
}

// Pilonii aplicației — Acasa „mix-first” oferă intrări echilibrate spre toate lumile,
// nu doar spre parcursul de învățare (docs/00-DIRECTIE: bible app x learning x comunitate).
const PILLARS: Array<{ label: string; icon: ComponentType<{ size?: number; style?: CSSProperties; "aria-hidden"?: boolean }>; route: string }> = [
  { label: "Timp cu Dumnezeu", icon: Sunrise, route: "/daily" },
  { label: "Rugăciune", icon: HandHeart, route: "/prayer" },
  { label: "Creșterea mea", icon: Sprout, route: "/dashboard" },
  { label: "Zidul Ebenezer", icon: Milestone, route: "/ebenezer" },
  { label: "Familie", icon: Users, route: "/family" },
  { label: "Comunitate", icon: MessagesSquare, route: "/community" },
]

const moreBtnStyle = { marginTop: 10 }
const verseStyle = { cursor: "pointer" } as const
const sosStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  alignSelf: "flex-start",
  background: "var(--danger-soft)",
  color: "var(--bad)",
  border: "1px solid var(--bad)",
  borderRadius: "var(--radius-pill)",
  padding: "8px 14px",
  fontSize: "0.85rem",
  fontWeight: 600,
  boxShadow: "none",
  cursor: "pointer",
}
const pillarGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 10,
}
const pillarTileStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 8,
  padding: "16px 8px",
  background: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-lg)",
  boxShadow: "var(--shadow-sm)",
  cursor: "pointer",
  textAlign: "center",
}
const pillarIconStyle: CSSProperties = { color: "var(--accent)" }
const pillarLabelStyle: CSSProperties = {
  fontSize: "0.82rem",
  fontWeight: 600,
  color: "var(--text)",
  lineHeight: 1.2,
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
  const [daily, setDaily] = useState<DailyView | null>(null)
  const [posts, setPosts] = useState<CommunityPostView[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [prayed, setPrayed] = useState(false)
  const [prayCount, setPrayCount] = useState<number | null>(null)

  useEffect(() => {
    getDashboard()
      .then(setDash)
      .catch((e: unknown) => setError(e instanceof Error ? e.message : String(e)))
    getDaily()
      .then(setDaily)
      .catch(() => {
        /* versetul e opțional pentru Acasă */
      })
    getCommunity(getCategory())
      .then((r) => setPosts(r.posts))
      .catch(() => {
        /* comunitatea e opțională pentru Acasă */
      })
  }, [])

  if (error) return <p className="error">{error}</p>
  if (!dash) return <p className="muted">Se încarcă…</p>

  const { gam, growth, modules, next } = dash
  const currentModule = modules.find((m) => !m.locked && m.lessonsCompleted < m.lessonsTotal)
  const nextLesson: NextLesson | null = next
    ? {
        lessonId: next.lessonId,
        title: next.title,
        lessonsCompleted: currentModule?.lessonsCompleted,
        lessonsTotal: currentModule?.lessonsTotal,
      }
    : null

  const byScore = [...growth].sort((a, b) => a.current - b.current)
  const weakest = byScore[0]
  const strongest = byScore[byScore.length - 1]

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

      <button type="button" style={sosStyle} onClick={() => navigate("/crisis")}>
        <LifeBuoy size={16} aria-hidden />
        Ai nevoie de ajutor acum?
      </button>

      {daily && (
        <div
          className="verse-strip"
          role="button"
          tabIndex={0}
          style={verseStyle}
          onClick={() => navigate("/daily")}
        >
          <span className="verse-strip__q">„{daily.ritual.verseText}”</span>
          <span className="verse-strip__ref">{daily.ritual.verseRef} · Timp cu Dumnezeu →</span>
        </div>
      )}

      <section className="tile">
        <h2 className="tile__title">Explorează</h2>
        <div style={pillarGridStyle}>
          {PILLARS.map((p) => {
            const Icon = p.icon
            return (
              <button
                key={p.route}
                type="button"
                style={pillarTileStyle}
                onClick={() => navigate(p.route)}
              >
                <Icon size={22} style={pillarIconStyle} aria-hidden />
                <span style={pillarLabelStyle}>{p.label}</span>
              </button>
            )
          })}
        </div>
      </section>

      <CheckIn />

      <section className="tile">
        <h2 className="tile__title">
          Creșterea ta
          <button type="button" className="ghost" onClick={() => navigate("/dashboard")}>
            Detalii
          </button>
        </h2>
        <div className="growth-mini">
          <GrowthRadar scores={growth} size={150} showLabels={false} />
          <div className="growth-mini__side">
            {strongest && weakest ? (
              <p className="growth-mini__cap">
                Cel mai mult crești la <b>{AXIS_LABEL[strongest.axis]}</b>. Zona ta de sprijin acum:{" "}
                <b>{AXIS_LABEL[weakest.axis]}</b>.
              </p>
            ) : (
              <p className="growth-mini__cap">Începe o lecție ca să-ți vezi radarul de creștere.</p>
            )}
          </div>
        </div>
      </section>

      <section className="tile">
        <h2 className="tile__title">
          Parcursul tău
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
        <h2 className="tile__title">Din comunitate</h2>
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
            <span className="social-strip__text">Alți frați cresc alături de tine chiar acum.</span>
          </div>
        )}
        <button type="button" className="ghost" style={moreBtnStyle} onClick={() => navigate("/community")}>
          Vezi comunitatea →
        </button>
      </section>
    </section>
  )
}
