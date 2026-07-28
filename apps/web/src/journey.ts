import type { DayPlan, PathDef } from "@emanus/shared"
import { getPath, planToday } from "@emanus/shared"

/*
 * Starea drumului, ținută local (localStorage).
 *
 * DE CE LOCAL, DEOCAMDATĂ: aplicația trebuie să fie completă și testabilă pe oameni
 * reali fără server și fără cont. Când se leagă Supabase, se înlocuiește DOAR acest
 * fișier cu aceleași funcții peste tabele: journey (1 rând/user), journal, prayers.
 * Nimic din UI nu se schimbă.
 *
 * NU se salvează: scoruri, serii de zile, nivele. Niciodată. (docs/20 §1)
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

export interface JourneyState {
  pathId: string | null
  lessonsDone: number
  /** YYYY-MM-DD */
  lastLessonDate: string | null
  journal: JournalEntry[]
  prayers: Prayer[]
  /** Marcat când omul a văzut ecranul de final de parcurs. */
  pathCompletedSeen: boolean
}

const EMPTY: JourneyState = {
  pathId: null,
  lessonsDone: 0,
  lastLessonDate: null,
  journal: [],
  prayers: [],
  pathCompletedSeen: false,
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

function save(s: JourneyState): JourneyState {
  try {
    localStorage.setItem(K, JSON.stringify(s))
  } catch {
    /* mod privat / cotă plină — aplicația merge, dar nu ține minte */
  }
  return s
}

export function hasStarted(): boolean {
  return load().pathId !== null
}

export function chooseDoor(pathId: string): JourneyState {
  const s = load()
  return save({ ...s, pathId, lessonsDone: 0, lastLessonDate: null, pathCompletedSeen: false })
}

export function currentPath(): PathDef | undefined {
  return getPath(load().pathId)
}

export function plan(): DayPlan | null {
  const s = load()
  const path = getPath(s.pathId)
  if (!path) return null
  const since = s.lastLessonDate === null ? null : daysBetween(s.lastLessonDate, today())
  return planToday(path, s.lessonsDone, since)
}

export function completeLesson(lessonId: string, journalText: string): JourneyState {
  const s = load()
  const journal = journalText.trim()
    ? [...s.journal.filter((j) => j.lessonId !== lessonId), { lessonId, text: journalText.trim(), date: today() }]
    : s.journal
  return save({
    ...s,
    lessonsDone: Math.max(s.lessonsDone, indexOfLesson(lessonId) + 1),
    lastLessonDate: today(),
    journal,
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

export function resetJourney(): void {
  const s = load()
  save({ ...EMPTY, prayers: s.prayers, journal: s.journal })
}

// --- Memorialul: rugăciuni și răspunsuri (docs/20; cârligul lung) ---

export function addPrayer(text: string): Prayer[] {
  const s = load()
  const p: Prayer = {
    id: `pr_${Date.now()}`,
    text: text.trim(),
    createdAt: today(),
    answeredAt: null,
  }
  return save({ ...s, prayers: [p, ...s.prayers] }).prayers
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
