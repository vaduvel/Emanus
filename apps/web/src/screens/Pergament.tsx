import { useState } from "react"
import { ArrowLeft, ArrowRight, BookOpen, Send, Sparkles } from "lucide-react"
import { SCROLL_SECTIONS, type ScrollSectionId, type ScrollVerse } from "@emanus/shared"
import { ScriptureReveal } from "../components/ScriptureReveal"
import { dailyVerse, savedVerseToday, setLastMood } from "../dailyGifts"
import { scriptureUrlForReference } from "../scriptureReference"
import { navigate } from "../router"

export default function Pergament() {
  const [verse, setVerse] = useState<ScrollVerse | null>(() => savedVerseToday("scroll"))

  function open(id: ScrollSectionId) {
    const drawn = dailyVerse({ slot: "scroll", section: id })
    const mood = SCROLL_SECTIONS.find((section) => section.id === id)?.mood ?? null
    setLastMood(mood)
    setVerse(drawn)
  }

  if (verse) {
    return (
      <section className="daily-gift daily-gift--scroll experience-shell" aria-labelledby="scroll-result-title">
        <DailyHeader />
        <div className="daily-gift__intro">
          <p className="experience-eyebrow">Cuvânt pentru dimineața aceasta</p>
          <h1 id="scroll-result-title">Pergamentul s-a deschis</h1>
          <p>Rămâi la acest verset. Nu este nevoie să tragi altul până găsești unul mai ușor.</p>
        </div>
        <ScriptureReveal variant="scroll" verseText={verse.text} verseRef={verse.ref} />
        <div className="daily-gift__actions">
          <button type="button" onClick={() => navigate(scriptureUrlForReference(verse.ref) ?? "/biblia")}><BookOpen size={19} aria-hidden /><span><strong>Citește în context</strong><small>Deschide capitolul în Biblia Emanus</small></span><ArrowRight size={17} /></button>
          <button type="button" onClick={() => navigate(`/mesaj?verset=${encodeURIComponent(verse.id)}`)}><Send size={19} aria-hidden /><span><strong>Trimite cuiva</strong><small>Dă mai departe cuvântul primit</small></span><ArrowRight size={17} /></button>
        </div>
        <p className="daily-gift__quiet">Sulul se strânge acum. Mâine dimineață îl desfacem din nou.</p>
      </section>
    )
  }

  return (
    <section className="daily-gift daily-gift--scroll experience-shell" aria-labelledby="scroll-title">
      <DailyHeader />
      <div className="daily-gift__intro">
        <p className="experience-eyebrow">Pergamentul de dimineață</p>
        <h1 id="scroll-title">Ce duci azi?</h1>
        <p>Alege locul în care te afli și deschidem Scriptura acolo. Versetul nu este ales la întâmplare.</p>
      </div>
      <div className="daily-gift__hero"><img src="/bible-road-hero.svg" alt="Un drum luminat spre o Biblie deschisă" /><span><Sparkles size={18} /> Ascultă înainte să deschizi</span></div>
      <div className="scroll-choices">
        {SCROLL_SECTIONS.map((section) => (
          <button key={section.id} type="button" onClick={() => open(section.id)}>
            <span className="experience-icon"><Sparkles size={18} aria-hidden /></span>
            <span>{section.label}</span><ArrowRight size={18} aria-hidden />
          </button>
        ))}
      </div>
      <p className="daily-gift__quiet">Sulul este forma în care Isus a citit Scriptura. Vei primi un singur verset pentru astăzi.</p>
    </section>
  )
}

function DailyHeader() {
  return <header className="experience-header daily-gift__header"><button type="button" className="experience-back" onClick={() => navigate("/")} aria-label="Înapoi la Azi"><ArrowLeft aria-hidden /></button><div className="experience-brand"><img src="/emanus-mark.svg" alt="" aria-hidden /><span>Pergamentul</span></div><span className="experience-header__space" /></header>
}
