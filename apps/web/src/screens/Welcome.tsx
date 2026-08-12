import { useState } from "react"
import {
  ArrowRight,
  BookOpen,
  HeartHandshake,
  Lightbulb,
  MapPinned,
  Sparkles,
  Sunrise,
} from "lucide-react"
import { markWelcomeSeen } from "../journey"
import { navigate } from "../router"

const steps = [
  {
    eyebrow: "Biblia Emanus",
    title: "Biblia pentru viața ta de azi",
    description:
      "Nu doar citești. Emanus te ajută să vezi contextul, să înțelegi adevărul și să faci un pas concret.",
    image: "/bible-road-hero.svg",
    imageAlt: "Un drum luminat care conduce spre o Biblie deschisă",
    features: [
      { icon: BookOpen, title: "Citește", text: "Text biblic curat și ușor de urmărit." },
      { icon: Lightbulb, title: "Înțelege", text: "Context și explicații clare." },
      { icon: HeartHandshake, title: "Trăiește", text: "Rugăciune și pas practic." },
    ],
  },
  {
    eyebrow: "Un drum personal",
    title: "Pas cu pas, nu singur",
    description:
      "Primești un traseu potrivit locului în care ești, fără grabă și fără să pierzi firul dacă revii mai târziu.",
    image: "/bible-pain-light.svg",
    imageAlt: "Un om care pășește din întuneric spre lumină",
    features: [
      { icon: MapPinned, title: "Traseu recomandat", text: "Începi de acolo de unde ești." },
      { icon: Sunrise, title: "Practica zilei", text: "Un pas mic, clar și aplicabil." },
      { icon: Sparkles, title: "Biblia explicată", text: "Citești și înțelegi în același loc." },
    ],
  },
  {
    eyebrow: "Poarta",
    title: "Nu intri aici la întâmplare",
    description:
      "Poți începe din locul real în care te afli. Alegerea ta deschide un drum, nu o etichetă.",
    image: "/bible-road-hero.svg",
    imageAlt: "O cale luminoasă deschisă înainte",
    features: [
      { icon: HeartHandshake, title: "Durere", text: "Nu o micșorăm și nu o ascundem." },
      { icon: Sparkles, title: "Iertare", text: "Adevăr, mărturisire și eliberare." },
      { icon: Sunrise, title: "Pace", text: "Un pas biblic pentru ziua de azi." },
    ],
  },
] as const

export function Welcome() {
  const [step, setStep] = useState(0)
  const current = steps[step]
  const isLast = step === steps.length - 1

  function enter() {
    markWelcomeSeen()
    navigate("/intrare")
  }

  return (
    <section className="welcome experience-shell" aria-labelledby="welcome-title">
      <div className="experience-brand">
        <img src="/emanus-mark.svg" alt="" aria-hidden />
        <span>Emanus</span>
      </div>

      <div className="welcome__copy" key={step}>
        <p className="experience-eyebrow">{current.eyebrow}</p>
        <h1 id="welcome-title" className="welcome__title">{current.title}</h1>
        <p className="welcome__lead">{current.description}</p>
      </div>

      <div className="welcome__visual" key={`image-${step}`}>
        <img src={current.image} alt={current.imageAlt} />
      </div>

      <div className="welcome__features" aria-label="Ce oferă Emanus">
        {current.features.map(({ icon: Icon, title, text }) => (
          <article className="welcome__feature" key={title}>
            <span className="experience-icon"><Icon size={23} strokeWidth={1.7} aria-hidden /></span>
            <div><h2>{title}</h2><p>{text}</p></div>
          </article>
        ))}
      </div>

      <button type="button" className="experience-cta" onClick={isLast ? enter : () => setStep((value) => value + 1)}>
        {isLast ? "Alege poarta mea" : "Mai departe"} <ArrowRight size={20} aria-hidden />
      </button>
      <button type="button" className="experience-link" onClick={enter}>Sari peste introducere</button>

      <div className="experience-dots" aria-label={`Pasul ${step + 1} din ${steps.length}`}>
        {steps.map((_, index) => <span key={index} className={index === step ? "is-active" : ""} />)}
      </div>
    </section>
  )
}
