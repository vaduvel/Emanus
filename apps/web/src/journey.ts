import type { LessonAnswers } from "@emanus/shared/domain"
import type {
  ContentDayPlan,
  ContentLessonSummary,
  ContentPath,
} from "@emanus/shared/content-catalog"
import { cloudEnabled, cloudReady, pullState, pushState } from "./cloud"
import {
  contentPath,
  nextDoctrineLesson,
  planTodayFromContent,
} from "./content"

/*
 * Starea drumului.
 *
 * Sursa de adevăr pentru ecrane e localStorage — aplicația merge întreagă fără
 * internet și fără cont. Supabase e copia de siguranță: după fiecare salvare se
 * urcă tăcut în fundal, iar pe un telefon nou se aduce înapoi.
 *
 * NU se salvează, nicăieri: scoruri, serii de zile, nivele, profil. (docs/20 §1)
 */

const K = "emanus_journey_v1"

export interface JournalEntry {
  lessonId: string
  text: string
  date: string
}

export interface Prayer {
  id: string
  text: string
  createdAt: string
  /** ISO date când omul a marcat că s-a răspuns. */
  answeredAt: string | null
  answerNote?: string
}

export interface LessonResponse extends LessonAnswers {
  completedAt: string
}

export interface LessonDraft extends LessonAnswers {
  mainStepId: string
  revealedStepIds: string[]
  updatedAt: string
}

export interface JourneyState {
  /** A văzut ecranele de primul contact (ce e Emanus). */
  seenWelcome: boolean
  pathId: string | null
  lessonsDone: number
  /** Câte lecții de doctrină generală a terminat, în ordine. */
  doctrineDone: number
  /** YYYY-MM-DD */
  lastLessonDate: string | null
  /** Invitația la prima rugăciune se face O SINGURĂ DATĂ, apoi nu mai insistăm. */
  prayerInviteSeen: boolean
  journal: JournalEntry[]
  prayers: Prayer[]
  /** Răspunsurile interactive rămân locale; nu sunt incluse în backup-ul cloud. */
  lessonResponses: Record<string, LessonResponse>
  /** Poziția curentă permite reluarea unei lecții după închiderea aplicației. */
  lessonDrafts: Record<string, LessonDraft>
  /** Marcat când omul a văzut ecranul de final de parcurs. */
  pathCompletedSeen: boolean
  /** Lecțiile terminate în cursurile bibliotecii, grupate pe curs. */
  courseProgress: Record<string, string[]>
}

const EMPTY: JourneyState = {
  seenWelcome: false,
  pathId: null,
  lessonsDone: 0,
  doctrineDone: 0,
  lastLessonDate: null,
  prayerInviteSeen: false,
  journal: [],
  prayers: [],
  lessonResponses: {},
  lessonDrafts: {},
  pathCompletedSeen: false,
  courseProgress: {},
}

export function today(): string {
  const d = new Date()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${d.getFullYear()}-${m}-${day}`
}

function daysBetween(fromIso: string, toIso: string): number {
  const a = new Date(`${fromIso}T00:00:00`)
  const b = new Date(`${toIso}T00:00:00`)
  return Math.round((b.getTime() - a.getTime()) / 86400000)
}

export function load(): JourneyState {
  try {
    const raw = localStorage.getItem(K)
    if (!raw) return { ...EMPTY }
    return { ...EMPTY, ...(JSON.parse(raw) as Partial<JourneyState>) }
  } catch {
    return { ...EMPTY }
  }
}

function writeLocal(s: JourneyState): JourneyState {
  try {
    localStorage.setItem(K, JSON.stringify(s))
  } catch {
    /* mod privat / cotă plină — aplicația merge, dar nu ține minte */
  }
  return s
}

function save(s: JourneyState): JourneyState {
  writeLocal(s)
  // Copia în nor pleacă în fundal. Dacă nu merge, nimeni nu află și nimic nu se blochează.
  if (cloudEnabled()) void pushState(s)
  return s
}

function isEmpty(s: JourneyState): boolean {
  return (
    s.pathId === null &&
    s.journal.length === 0 &&
    s.prayers.length === 0 &&
    Object.keys(s.courseProgress).length === 0
  )
}

/**
 * De apelat o dată la pornire, înainte de primul randare.
 * Telefon nou și local gol -> aduce din nor. Altfel localul învinge și se urcă.
 * Returnează true dacă s-a adus ceva din nor sau dacă sesiunea de backup a
 * devenit disponibilă (ecranele trebuie redesenate).
 */
export async function hydrateFromCloud(): Promise<boolean> {
  if (!cloudEnabled()) return false
  const cloudWasReady = cloudReady()
  const local = load()
  const remote = await pullState()
  if (remote && isEmpty(local) && !isEmpty(remote)) {
    writeLocal(remote)
    return true
  }
  if (!isEmpty(local)) void pushState(local)
  return cloudReady() !== cloudWasReady
}

// --- Primul contact ---

export function hasSeenWelcome(): boolean {
  return load().seenWelcome
}

export function markWelcomeSeen(): void {
  save({ ...load(), seenWelcome: true })
}

export function hasStarted(): boolean {
  return load().pathId !== null
}

export function chooseDoor(pathId: string): JourneyState {
  const s = load()
  return save({
    ...s,
    seenWelcome: true,
    pathId,
    lessonsDone: 0,
    lastLessonDate: null,
    pathCompletedSeen: false,
  })
}

export function currentPath(): ContentPath | undefined {
  return contentPath(load().pathId)
}

export function plan(): ContentDayPlan | null {
  const s = load()
  const path = contentPath(s.pathId)
  if (!path) return null
  const since = s.lastLessonDate === null ? null : daysBetween(s.lastLessonDate, today())
  return planTodayFromContent(path, s.lessonsDone, since)
}

/**
 * Lecția de doctrină disponibilă acum, dacă există.
 * Se deschide după lecția 5 din parcurs; nu înlocuiește niciodată lecția zilei,
 * stă alături, ca lucru opțional.
 *
 * Pe drumul "De la zero" nu se oferă: acolo doctrina ESTE drumul.
 */
export function doctrineAvailable(): ContentLessonSummary | undefined {
  const s = load()
  if (s.pathId === "path_temelie") return undefined
  const path = contentPath(s.pathId)
  if (!path) return undefined
  return nextDoctrineLesson(s.lessonsDone, path.lessons.length, s.doctrineDone)
}

export function saveLessonDraft(lessonId: string, draft: LessonDraft): JourneyState {
  const s = load()
  return writeLocal({
    ...s,
    lessonDrafts: { ...s.lessonDrafts, [lessonId]: draft },
  })
}

export function lessonDraft(lessonId: string): LessonDraft | undefined {
  return load().lessonDrafts[lessonId]
}

export function courseLessonsDone(courseId: string): string[] {
  return load().courseProgress[courseId] ?? []
}

export function completeLesson(
  lessonId: string,
  answers: LessonAnswers,
  courseId?: string,
): JourneyState {
  const s = load()
  const alreadyCompleted = Boolean(s.lessonResponses[lessonId])
  const journalText = Object.values(answers.textResponses)
    .map((text) => text.trim())
    .filter(Boolean)
    .join("\n\n")
  const journal = journalText
    ? [...s.journal.filter((j) => j.lessonId !== lessonId), { lessonId, text: journalText, date: today() }]
    : s.journal
  const lessonDrafts = { ...s.lessonDrafts }
  delete lessonDrafts[lessonId]
  const lessonResponses = {
    ...s.lessonResponses,
    [lessonId]: { ...answers, completedAt: new Date().toISOString() },
  }
  const completedInCourse = courseId
    ? Array.from(new Set([...(s.courseProgress[courseId] ?? []), lessonId]))
    : undefined
  const courseProgress = completedInCourse && courseId
    ? { ...s.courseProgress, [courseId]: completedInCourse }
    : s.courseProgress

  // Doctrina făcută ca supliment nu consumă ziua și nu avansează parcursul personal.
  // Excepție: pe drumul "De la zero", aceleași lecții sunt chiar parcursul.
  if (lessonId.startsWith("doctrina_") && s.pathId !== "path_temelie") {
    return save({
      ...s,
      doctrineDone: alreadyCompleted ? s.doctrineDone : s.doctrineDone + 1,
      journal,
      lessonDrafts,
      lessonResponses,
      courseProgress,
    })
  }

  const lessonIndex = indexOfLesson(lessonId)
  if (lessonIndex < 0) {
    return save({
      ...s,
      journal,
      lessonDrafts,
      lessonResponses,
      courseProgress,
    })
  }

  return save({
    ...s,
    lessonsDone: Math.max(s.lessonsDone, lessonIndex + 1),
    lastLessonDate: today(),
    journal,
    lessonDrafts,
    lessonResponses,
    courseProgress,
  })
}

function indexOfLesson(lessonId: string): number {
  const path = currentPath()
  if (!path) return 0
  return path.lessons.findIndex((l) => l.id === lessonId)
}

export function firstJournalEntry(): JournalEntry | undefined {
  return load().journal[0]
}

export function markPathSeen(): void {
  save({ ...load(), pathCompletedSeen: true })
}

/** Trece pe alt drum, păstrând tot ce a scris (jurnal și rugăciuni). */
export function switchPath(pathId: string): JourneyState {
  const s = load()
  return save({
    ...s,
    pathId,
    lessonsDone: 0,
    doctrineDone: 0,
    lastLessonDate: null,
    pathCompletedSeen: false,
  })
}

export function resetJourney(): void {
  const s = load()
  save({
    ...EMPTY,
    seenWelcome: true,
    prayerInviteSeen: s.prayerInviteSeen,
    prayers: s.prayers,
    journal: s.journal,
    courseProgress: s.courseProgress,
  })
}

// --- Memorialul: rugăciuni și răspunsuri (docs/20; cârligul lung) ---

/**
 * Cine nu scrie nicio rugăciune nu ajunge niciodată la memorial — adică pierde
 * exact lucrul pentru care se întoarce peste un an. Deci îl invităm o dată,
 * după a doua lecție, când deja știe cu cine vorbește. O dată, nu mereu.
 */
export function shouldInviteFirstPrayer(): boolean {
  const s = load()
  return !s.prayerInviteSeen && s.prayers.length === 0 && s.lessonsDone >= 2
}

export function dismissPrayerInvite(): void {
  save({ ...load(), prayerInviteSeen: true })
}

export function addPrayer(text: string): Prayer[] {
  const s = load()
  const p: Prayer = {
    id: `pr_${Date.now()}`,
    text: text.trim(),
    createdAt: today(),
    answeredAt: null,
  }
  return save({ ...s, prayerInviteSeen: true, prayers: [p, ...s.prayers] }).prayers
}

export function markAnswered(id: string, note: string): Prayer[] {
  const s = load()
  const prayers = s.prayers.map((p) =>
    p.id === id ? { ...p, answeredAt: today(), answerNote: note.trim() || undefined } : p,
  )
  return save({ ...s, prayers }).prayers
}

export function removePrayer(id: string): Prayer[] {
  const s = load()
  return save({ ...s, prayers: s.prayers.filter((p) => p.id !== id) }).prayers
}

export function listPrayers(): Prayer[] {
  return load().prayers
}

/**
 * Rugăciuni mai vechi de 21 de zile, fără răspuns marcat.
 * Aplicația întreabă O SINGURĂ DATĂ despre cea mai veche: "Unde e acum?".
 */
export function oldestUnanswered(minDays = 21): Prayer | undefined {
  const t = today()
  return load()
    .prayers.filter((p) => p.answeredAt === null && daysBetween(p.createdAt, t) >= minDays)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt))[0]
}

export function daysAgo(iso: string): number {
  return daysBetween(iso, today())
}
