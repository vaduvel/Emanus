// „Ușa, nu unghiul” (docs/00-DIRECTIE §13): după onboarding sugerăm un parcurs
// personalizat pornind de la (1) unde e omul cu Dumnezeu (FaithStage) și
// (2) axa cea mai fragedă din diagnostic. Un singur prag de intrare, pentru orice om.
import type { GrowthAxisId } from "./domain.js"

export type FaithStage = "walking" | "seeking" | "skeptic"

export interface FaithStageOption {
  id: FaithStage
  emoji: string
  label: string
  blurb: string
}

export const FAITH_STAGES: FaithStageOption[] = [
  {
    id: "walking",
    emoji: "🕊️",
    label: "Am o relație vie cu Iisus",
    blurb: "Vreau să merg mai adânc și să cresc.",
  },
  {
    id: "seeking",
    emoji: "🌱",
    label: "Caut / sunt la început",
    blurb: "Vreau să înțeleg cine e Dumnezeu, pas cu pas.",
  },
  {
    id: "skeptic",
    emoji: "🤔",
    label: "Sunt sceptic / nu știu ce cred",
    blurb: "Încă nu văd cum m-ar putea schimba Iisus.",
  },
]

// Mesaj de întâmpinare adaptat la punctul de plecare — dar aceeași Ușă pentru toți.
const STAGE_WELCOME: Record<FaithStage, string> = {
  walking: "Ai deja o relație cu Iisus — hai să mergem mai adânc. Nu de la zero, ci mai aproape.",
  seeking: "Ești la început de drum, și e exact locul potrivit. Mergem pas cu pas, fără grabă.",
  skeptic:
    "Ai întrebări — și e în regulă. Nu-ți cerem să crezi tot azi, doar să privești. Ușa e deschisă.",
}

const AXIS_LABEL: Record<GrowthAxisId, string> = {
  identity: "identitate",
  emotional_peace: "pace emoțională",
  relationships: "relații",
  living_faith: "credință vie",
  character: "caracter",
  freedom: "libertate",
}

export interface RecommendedCourse {
  moduleId: string
  courseId: string
  title: string
  struggle: string
  truth: string
  firstLessonId?: string
}

export interface RecommendationInput {
  faithStage: FaithStage
  categoryName: string
  focusAxis: GrowthAxisId
  course?: RecommendedCourse
}

export interface RecommendationView {
  faithStage: FaithStage
  focusAxis: GrowthAxisId
  focusAxisLabel: string
  welcome: string
  reason: string
  course?: RecommendedCourse
}

export function isFaithStage(v: unknown): v is FaithStage {
  return v === "walking" || v === "seeking" || v === "skeptic"
}

export function buildRecommendation(input: RecommendationInput): RecommendationView {
  const focusAxisLabel = AXIS_LABEL[input.focusAxis]
  const welcome = STAGE_WELCOME[input.faithStage]
  const reason = input.course
    ? `Am pornit de la ce ai spus: zona ta cea mai fragedă acum e „${focusAxisLabel}”. De aceea începem cu „${input.course.title}” — exact despre asta.`
    : `Zona ta cea mai fragedă acum e „${focusAxisLabel}”. Pregătim un parcurs pe măsură; până atunci poți începe cu ce avem.`
  return {
    faithStage: input.faithStage,
    focusAxis: input.focusAxis,
    focusAxisLabel,
    welcome,
    reason,
    course: input.course,
  }
}
