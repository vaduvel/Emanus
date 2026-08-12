import { useMemo, useState } from "react"
import { ArrowLeft, ArrowRight, Check, Footprints, Heart, ScrollText } from "lucide-react"
import { ScriptureReveal } from "../components/ScriptureReveal"
import { devotionalToday, devotionalWelcomeBack, markDevotionalRead } from "../dailyGifts"
import { navigate } from "../router"

export default function Devotional() {
  const day = useMemo(() => devotionalToday(), [])
  const welcomeBack = useMemo(() => devotionalWelcomeBack(), [])
  const [done, setDone] = useState(false)

  if (!day) {
    return (
      <section className="daily-gift experience-shell">
        <DailyHeader label="Devoțional" />
        <div className="daily-gift__empty"><ScrollText size={28} aria-hidden /><p>Următoarele zile ale devoționalului sunt în lucru.</p></div>
      </section>
    )
  }

  function finish() {
    markDevotionalRead()
    setDone(true)
  }

  return (
    <section className="daily-gift daily-gift--devotional experience-shell" aria-labelledby="devotional-title">
      <DailyHeader label="Devoționalul zilei" />

      <div className="daily-gift__intro">
        <p className="experience-eyebrow">Un singur lucru pentru azi</p>
        <h1 id="devotional-title">{day.theme}</h1>
        <p>Primește Scriptura, las-o să te cerceteze și răspunde printr-un pas concret.</p>
      </div>

      {welcomeBack ? <p className="daily-gift__welcome">{welcomeBack}</p> : null}

      <ScriptureReveal variant="scroll" verseText={day.verseText} verseRef={day.verseRef} />

      <div className="daily-gift__story">
        <article className="daily-gift__card daily-gift__card--lead">
          <span className="experience-icon"><ScrollText size={21} aria-hidden /></span>
          <div><p className="experience-eyebrow">Meditație</p><p>{day.meditation}</p></div>
        </article>
        <article className="daily-gift__card">
          <span className="experience-icon"><Heart size={21} aria-hidden /></span>
          <div><h2>Întrebarea de azi</h2><p>{day.question}</p></div>
        </article>
        <article className="daily-gift__card">
          <span className="experience-icon"><Heart size={21} aria-hidden /></span>
          <div><h2>Roagă-te astfel</h2><p className="scripture">{day.prayer}</p></div>
        </article>
        <article className="daily-gift__card">
          <span className="experience-icon"><Footprints size={21} aria-hidden /></span>
          <div><h2>Pasul pentru azi</h2><p>{day.step}</p></div>
        </article>
      </div>

      {done ? (
        <div className="daily-gift__complete">
          <Check size={22} aria-hidden />
          <div><strong>Ajunge pentru azi.</strong><p>Mana de mâine se strânge mâine. Nu ai nimic restant.</p></div>
          <div className="daily-gift__complete-actions">
            <button type="button" onClick={() => navigate("/candela")}>Aprinde candela seara <ArrowRight size={17} /></button>
            <button type="button" className="is-secondary" onClick={() => navigate("/legamant")}>Deschide Legământul familiei</button>
          </div>
        </div>
      ) : (
        <button type="button" className="experience-cta" onClick={finish}>Am citit și răspund <ArrowRight size={19} aria-hidden /></button>
      )}
    </section>
  )
}

function DailyHeader({ label }: { label: string }) {
  return (
    <header className="experience-header daily-gift__header">
      <button type="button" className="experience-back" onClick={() => navigate("/")} aria-label="Înapoi la Azi"><ArrowLeft aria-hidden /></button>
      <div className="experience-brand"><img src="/emanus-mark.svg" alt="" aria-hidden /><span>{label}</span></div>
      <span className="experience-header__space" />
    </header>
  )
}
