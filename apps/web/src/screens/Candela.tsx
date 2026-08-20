import { useMemo, useState } from "react"
import { ArrowLeft, ArrowRight, Check, Flame, PenLine } from "lucide-react"
import { sectionForMood } from "@emanus/shared"
import { ScriptureReveal } from "../components/ScriptureReveal"
import { dailyVerse, eveningNoteSavedToday, lastMood, saveEveningNote, walkedDays } from "../dailyGifts"
import { navigate } from "../router"

export default function Candela() {
  const [note, setNote] = useState("")
  const [saved, setSaved] = useState(() => eveningNoteSavedToday())
  const verse = useMemo(() => {
    const mood = lastMood()
    return dailyVerse({ slot: "lamp", section: mood ? sectionForMood(mood) : undefined })
  }, [])
  const behind = useMemo(() => walkedDays(), [])

  function save() {
    saveEveningNote(note)
    setSaved(true)
    setNote("")
  }

  return (
    <section className="daily-gift daily-gift--lamp experience-shell" aria-labelledby="lamp-title">
      <header className="experience-header daily-gift__header">
        <button type="button" className="experience-back" onClick={() => navigate("/")} aria-label="Înapoi la Azi"><ArrowLeft aria-hidden /></button>
        <div className="experience-brand"><img src="/emanus-mark.svg" alt="" aria-hidden /><span>Candela</span></div>
        <span className="experience-header__space" />
      </header>
      <div className="daily-gift__intro">
        <p className="experience-eyebrow">Încheierea zilei</p>
        <h1 id="lamp-title">Lumina pentru următorul pas</h1>
        <p>Candela nu îți arată tot drumul. Luminează piatra pe care o ai acum înainte.</p>
      </div>
      <ScriptureReveal variant="lamp" verseText={verse.text} verseRef={verse.ref} stepText={verse.step} walkedDays={behind} />

      <article className="daily-gift__card daily-gift__card--lamp">
        <span className="experience-icon"><Flame size={21} aria-hidden /></span>
        <div><h2>Ține minte</h2><p>Cuvântul lui Dumnezeu este o candelă pentru picioare, nu un reflector peste toate zilele care urmează.</p></div>
      </article>

      {saved ? (
        <div className="daily-gift__complete"><Check size={22} aria-hidden /><div><strong>Gândul a fost păstrat.</strong><p>Poți stinge lumina liniștit.</p></div><button type="button" onClick={() => navigate("/")}>Înapoi la Azi <ArrowRight size={17} /></button></div>
      ) : (
        <div className="lamp-journal">
          <label htmlFor="candela-note"><PenLine size={20} aria-hidden /><span><strong>Unde a fost Dumnezeu azi?</strong><small>Două rânduri sunt suficiente.</small></span></label>
          <textarea id="candela-note" rows={3} value={note} placeholder="Scrie ce vrei să păstrezi din ziua aceasta…" onChange={(event) => setNote(event.target.value)} />
          <button type="button" className="experience-cta" disabled={!note.trim()} onClick={save}>Pun deoparte <ArrowRight size={18} aria-hidden /></button>
          <button type="button" className="experience-link" onClick={() => navigate("/")}>Nu acum</button>
        </div>
      )}
    </section>
  )
}
