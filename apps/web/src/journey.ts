import type { Lesson } from "@emanus/shared/domain"
import type { DayPlan, PathDef } from "@emanus/shared/paths"
import { getPath, nextDoctrineLesson, planToday } from "@emanus/shared/paths"
import { cloudEnabled, pullState, pushState } from "./cloud"

/*
 * Starea drumului este offline-first. Nu există XP, nivel, serie sau clasament.
 * Progresul fiecărui drum se păstrează separat, ca omul să poată schimba drumul
 * și să revină fără să piardă locul în care a ajuns.
 */

const K = "emanus_journey_v1"

export interface JournalEntry {
  lessonId: string
  /** Drumul sau cursul în care a fost scrisă intrarea. */
  contextId?: string
  text: string
  date: string
}

export interface Prayer {
  id: string
  text: string
  createdAt: string
  answeredAt: string | null
  answerNote?: string
}

export interface PathProgress {
  lessonsDone: number
  doctrineDone: number
  lastLessonDate: string | null
  pathCompletedSeen: boolean
}

export interface JourneyState {
  seenWelcome: boolean
  pathId: string | null

  /** Câmpuri active păstrate pentru compatibilitate cu backupurile vechi. */
  lessonsDone: number
  doctrineDone: number
  lastLessonDate: string | null
  pathCompletedSeen: boolean

  /** Sursa nouă pentru progresul tuturor drumurilor. */
  pathProgressById: Record<string, PathProgress>
  /** Lecțiile opționale terminate în Bibliotecă. */
  libraryDone: string[]

  prayerInviteSeen: boolean
  journal: JournalEntry[]
  prayers: Prayer[]
}

const EMPTY_PROGRESS: PathProgress = {
  lessonsDone: 0,
  doctrineDone: 0,
  lastLessonDate: null,
  pathCompletedSeen: false,
}

const EMPTY: JourneyState = {
  seenWelcome: false,
  pathId: null,
  lessonsDone: 0,
  doctrineDone: 0,
  lastLessonDate: null,
  pathCompletedSeen: false,
  pathProgressById: {},
  libraryDone: [],
  prayerInviteSeen: false,
  journal: [],
  prayers: [],
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

function progressFromActive(s: Pick<JourneyState, "lessonsDone" | "doctrineDone" | "lastLessonDate" | "pathCompletedSeen">): PathProgress {
  return {
    lessonsDone: Number.isFinite(s.lessonsDone) ? Math.max(0, s.lessonsDone) : 0,
    doctrineDone: Number.isFinite(s.doctrineDone) ? Math.max(0, s.doctrineDone) : 0,
    lastLessonDate: s.lastLessonDate ?? null,
    pathCompletedSeen: Boolean(s.pathCompletedSeen),
  }
}

function normalize(raw: Partial<JourneyState>): JourneyState {
  const base: JourneyState = {
    ...EMPTY,
    ...raw,
    pathProgressById: { ...(raw.pathProgressById ?? {}) },
    libraryDone: Array.isArray(raw.libraryDone) ? [...new Set(raw.libraryDone)] : [],
    journal: Array.isArray(raw.journal) ? raw.journal : [],
    prayers: Array.isArray(raw.prayers) ? raw.prayers : [],
  }

  // Migrare fără pierdere: primul backup vechi devine progresul drumului activ.
  if (base.pathId && !base.pathProgressById[base.pathId]) {
    base.pathProgressById[base.pathId] = progressFromActive(base)
  }

  const active = base.pathId ? base.pathProgressById[base.pathId] : undefined
  if (active) {
    base.lessonsDone = active.lessonsDone
    base.doctrineDone = active.doctrineDone
    base.lastLessonDate = active.lastLessonDate
    base.pathCompletedSeen = active.pathCompletedSeen
  }
  return base
}

export function load(): JourneyState {
  try {
    const raw = localStorage.getItem(K)
    if (!raw) return normalize({})
    return normalize(JSON.parse(raw) as Partial<JourneyState>)
  } catch {
    return normalize({})
  }
}

function withActiveProgress(s: JourneyState): JourneyState {
  if (!s.pathId) return s
  return {
    ...s,
    pathProgressById: {
      ...s.pathProgressById,
      [s.pathId]: progressFromActive(s),
    },
  }
}

function writeLocal(s: JourneyState): JourneyState {
  const normalized = normalize(withActiveProgress(s))
  try {
    localStorage.setItem(K, JSON.stringify(normalized))
  } catch {
    /* mod privat / cotă plină — aplicația merge, dar nu ține minte */
  }
  return normalized
}

function save(s: JourneyState): JourneyState {
  const stored = writeLocal(s)
  if (cloudEnabled()) void pushState(stored)
  return stored
}

function isEmpty(s: JourneyState): boolean {
  return (
    s.pathId === null &&
    s.journal.length === 0 &&
    s.prayers.length === 0 &&
    s.libraryDone.length === 0 &&
    Object.keys(s.pathProgressById).length === 0
  )
}

export async function hydrateFromCloud(): Promise<boolean> {
  if (!cloudEnabled()) return false
  const local = load()
  const remote = await pullState()
  if (remote && isEmpty(local) && !isEmpty(remote)) {
    writeLocal(remote)
    return true
  }
  if (!isEmpty(local)) void pushState(local)
  return false
}

export function hasSeenWelcome(): boolean { return load().seenWelcome }
export function markWelcomeSeen(): void { save({ ...load(), seenWelcome: true }) }
export function hasStarted(): boolean { return load().pathId !== null }

function activatePath(s: JourneyState, pathId: string): JourneyState {
  const storedCurrent = withActiveProgress(s)
  const target = storedCurrent.pathProgressById[pathId] ?? EMPTY_PROGRESS
  return {
    ...storedCurrent,
    seenWelcome: true,
    pathId,
    lessonsDone: target.lessonsDone,
    doctrineDone: target.doctrineDone,
    lastLessonDate: target.lastLessonDate,
    pathCompletedSeen: target.pathCompletedSeen,
  }
}

export function chooseDoor(pathId: string): JourneyState {
  return save(activatePath(load(), pathId))
}

export function currentPath(): PathDef | undefined { return getPath(load().pathId) }

export function plan(): DayPlan | null {
  const s = load()
  const path = getPath(s.pathId)
  if (!path) return null
  const since = s.lastLessonDate === null ? null : daysBetween(s.lastLessonDate, today())
  return planToday(path, s.lessonsDone, since)
}

export function doctrineAvailable(): Lesson | undefined {
  const s = load()
  if (s.pathId === "path_temelie") return undefined
  const path = getPath(s.pathId)
  if (!path) return undefined
  return nextDoctrineLesson(s.lessonsDone, path.lessons.length, s.doctrineDone)
}

function journalAfterLesson(s: JourneyState, lessonId: string, contextId: string | undefined, journalText: string): JournalEntry[] {
  const text = journalText.trim()
  if (!text) return s.journal
  return [
    ...s.journal.filter((entry) => !(entry.lessonId === lessonId && entry.contextId === contextId)),
    { lessonId, contextId, text, date: today() },
  ]
}

export function completeLesson(lessonId: string, journalText: string): JourneyState {
  const s = load()
  const path = getPath(s.pathId)
  const index = path?.lessons.findIndex((lesson) => lesson.id === lessonId) ?? -1
  const journal = journalAfterLesson(s, lessonId, s.pathId ?? undefined, journalText)

  // Doctrina opțională nu consumă ritmul drumului.
  if (lessonId.startsWith("doctrina_") && s.pathId !== "path_temelie" && index === -1) {
    return save({ ...s, doctrineDone: s.doctrineDone + 1, journal })
  }

  // Protecție: o lecție care nu aparține drumului activ nu poate modifica ziua.
  if (index < 0) return save({ ...s, journal })

  return save({
    ...s,
    lessonsDone: Math.max(s.lessonsDone, index + 1),
    lastLessonDate: today(),
    journal,
  })
}

export function completeLibraryLesson(lessonId: string, courseId: string, journalText: string): JourneyState {
  const s = load()
  return save({
    ...s,
    libraryDone: s.libraryDone.includes(lessonId) ? s.libraryDone : [...s.libraryDone, lessonId],
    journal: journalAfterLesson(s, lessonId, `library:${courseId}`, journalText),
  })
}

export function libraryCompletedLessonIds(): string[] { return [...load().libraryDone] }

export function pathJournalEntries(pathId: string | null | undefined): JournalEntry[] {
  if (!pathId) return []
  const path = getPath(pathId)
  if (!path) return []
  const lessonIds = new Set(path.lessons.map((lesson) => lesson.id))
  return load().journal.filter((entry) => entry.contextId === pathId || (!entry.contextId && lessonIds.has(entry.lessonId)))
}

export function firstJournalEntry(pathId: string | null | undefined = load().pathId): JournalEntry | undefined {
  return pathJournalEntries(pathId)[0]
}

export function lastJournalEntry(pathId: string | null | undefined = load().pathId): JournalEntry | undefined {
  return pathJournalEntries(pathId).at(-1)
}

export function markPathSeen(): void { save({ ...load(), pathCompletedSeen: true }) }

export function switchPath(pathId: string): JourneyState {
  return save(activatePath(load(), pathId))
}

export function resetJourney(): void {
  const s = load()
  save({
    ...EMPTY,
    seenWelcome: true,
    prayerInviteSeen: s.prayerInviteSeen,
    prayers: s.prayers,
    journal: s.journal,
    libraryDone: s.libraryDone,
    pathProgressById: s.pathProgressById,
  })
}

/** Șterge copia locală fără să suprascrie copia contului din cloud. */
export function clearJourneyLocal(): void {
  writeLocal({ ...EMPTY, journal: [], prayers: [] })
}

export function shouldInviteFirstPrayer(): boolean {
  const s = load()
  return !s.prayerInviteSeen && s.prayers.length === 0 && s.lessonsDone >= 2
}

export function dismissPrayerInvite(): void { save({ ...load(), prayerInviteSeen: true }) }

export function addPrayer(text: string): Prayer[] {
  const s = load()
  const p: Prayer = { id: `pr_${Date.now()}`, text: text.trim(), createdAt: today(), answeredAt: null }
  return save({ ...s, prayerInviteSeen: true, prayers: [p, ...s.prayers] }).prayers
}

export function markAnswered(id: string, note: string): Prayer[] {
  const s = load()
  const prayers = s.prayers.map((p) => p.id === id
    ? { ...p, answeredAt: today(), answerNote: note.trim() || undefined }
    : p)
  return save({ ...s, prayers }).prayers
}

export function removePrayer(id: string): Prayer[] {
  const s = load()
  return save({ ...s, prayers: s.prayers.filter((p) => p.id !== id) }).prayers
}

export function listPrayers(): Prayer[] { return load().prayers }

export function oldestUnanswered(minDays = 21): Prayer | undefined {
  const t = today()
  return load().prayers
    .filter((p) => p.answeredAt === null && daysBetween(p.createdAt, t) >= minDays)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt))[0]
}

export function daysAgo(iso: string): number { return daysBetween(iso, today()) }
