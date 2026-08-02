import { ensureCloudUser, onCloudUserChange } from "./cloudSession"
import { getSupabase } from "./supabase"

const STORAGE_KEY = "emanus.bible.personal.v1"
const LEGACY_LAST_KEY = "emanus.bible.last"
const LEGACY_SAVED_KEY = "emanus.bible.saved"
const LEGACY_QUESTIONS_KEY = "emanus.ask.trimise"
const PAGE_SIZE = 500
const WRITE_BATCH_SIZE = 100

export type BibleQuestionStatus = "queued" | "in_review" | "answered" | "closed"
export type BibleSyncStatus = "local" | "syncing" | "synced" | "offline" | "error"

export interface BibleSourceSnapshot {
  unitId?: string
  bookId?: string
  bookName?: string
  chapter?: number
  ref?: string
  heading?: string
}

export interface BibleProgress {
  bookId: string
  bookName: string
  chapter: number
  chapterTitle: string
  unitId?: string
  updatedAt: string
}

export interface BibleSavedUnit extends BibleSourceSnapshot {
  unitId: string
  bookId: string
  bookName: string
  chapter: number
  ref: string
  heading: string
  saved: boolean
  updatedAt: string
}

export interface BibleNote extends BibleSourceSnapshot {
  id: string
  unitId: string
  bookId: string
  bookName: string
  chapter: number
  ref: string
  heading: string
  body: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export interface BibleQuestion extends BibleSourceSnapshot {
  id: string
  question: string
  status: BibleQuestionStatus
  answer: string | null
  answeredAt: string | null
  createdAt: string
  updatedAt: string
}

export interface BiblePersonalState {
  version: 1
  progress: BibleProgress | null
  saved: Record<string, BibleSavedUnit>
  notes: BibleNote[]
  questions: BibleQuestion[]
}

export interface BiblePersonalSnapshot {
  state: BiblePersonalState
  syncStatus: BibleSyncStatus
  lastSyncedAt: string | null
}

const EMPTY: BiblePersonalState = {
  version: 1,
  progress: null,
  saved: {},
  notes: [],
  questions: [],
}

let state: BiblePersonalState | null = null
let syncStatus: BibleSyncStatus = "local"
let lastSyncedAt: string | null = null
let snapshot: BiblePersonalSnapshot
let syncTimer: number | null = null
let activeSync: Promise<boolean> | null = null
let initialized = false
const listeners = new Set<() => void>()

function now(): string {
  return new Date().toISOString()
}

function id(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID()
  return `00000000-0000-4000-8000-${Date.now().toString(16).padStart(12, "0").slice(-12)}`
}

function readJson(key: string): unknown {
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as unknown) : null
  } catch {
    return null
  }
}

function migrateLegacy(): BiblePersonalState {
  const next: BiblePersonalState = { ...EMPTY, saved: {}, notes: [], questions: [] }
  const legacyLast = readJson(LEGACY_LAST_KEY) as { bookId?: unknown; chapter?: unknown; title?: unknown } | null
  if (legacyLast && typeof legacyLast.bookId === "string" && typeof legacyLast.chapter === "number") {
    next.progress = {
      bookId: legacyLast.bookId,
      bookName: legacyLast.bookId,
      chapter: legacyLast.chapter,
      chapterTitle: typeof legacyLast.title === "string" ? legacyLast.title : `Capitolul ${legacyLast.chapter}`,
      updatedAt: now(),
    }
  }

  const legacySaved = readJson(LEGACY_SAVED_KEY)
  if (Array.isArray(legacySaved)) {
    for (const value of legacySaved) {
      if (typeof value !== "string") continue
      const location = value.match(/^([a-z0-9_]+)-(\d+)-/i)
      const legacyBookId = location?.[1] ?? ""
      const legacyChapter = Number(location?.[2] ?? 1)
      next.saved[value] = {
        unitId: value,
        bookId: legacyBookId,
        bookName: legacyBookId ? legacyBookId.charAt(0).toUpperCase() + legacyBookId.slice(1) : "Biblia",
        chapter: legacyChapter,
        ref: value,
        heading: "Loc salvat",
        saved: true,
        updatedAt: now(),
      }
    }
  }

  const legacyQuestions = readJson(LEGACY_QUESTIONS_KEY)
  if (Array.isArray(legacyQuestions)) {
    for (const value of legacyQuestions) {
      if (!value || typeof value !== "object") continue
      const row = value as { text?: unknown; despre?: unknown; cand?: unknown }
      if (typeof row.text !== "string" || row.text.trim().length === 0) continue
      const createdAt = typeof row.cand === "string" ? row.cand : now()
      next.questions.push({
        id: id(),
        question: row.text.trim(),
        ref: typeof row.despre === "string" ? row.despre : undefined,
        status: "queued",
        answer: null,
        answeredAt: null,
        createdAt,
        updatedAt: createdAt,
      })
    }
  }
  return next
}

function parseState(value: unknown): BiblePersonalState | null {
  if (!value || typeof value !== "object") return null
  const candidate = value as Partial<BiblePersonalState>
  if (candidate.version !== 1 || !candidate.saved || !Array.isArray(candidate.notes) || !Array.isArray(candidate.questions)) {
    return null
  }
  return {
    version: 1,
    progress: candidate.progress ?? null,
    saved: candidate.saved,
    notes: candidate.notes,
    questions: candidate.questions,
  }
}

function load(): BiblePersonalState {
  if (state) return state
  state = parseState(readJson(STORAGE_KEY)) ?? migrateLegacy()
  writeLocal(state)
  rebuildSnapshot()
  return state
}

function writeLocal(next: BiblePersonalState): void {
  state = next
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    /* Cache-ul local poate fi indisponibil; ecranul ramane functional in memorie. */
  }
}

function rebuildSnapshot(): void {
  snapshot = { state: state ?? EMPTY, syncStatus, lastSyncedAt }
}

function emit(): void {
  rebuildSnapshot()
  for (const listener of listeners) listener()
}

function replace(next: BiblePersonalState, shouldSync = true): void {
  writeLocal(next)
  emit()
  if (shouldSync) scheduleBibleSync()
}

function timestamp(value: string | null | undefined): number {
  const parsed = value ? Date.parse(value) : 0
  return Number.isFinite(parsed) ? parsed : 0
}

function newest<T>(local: T, remote: T, updated: (value: T) => string): T {
  return timestamp(updated(remote)) > timestamp(updated(local)) ? remote : local
}

function mergeById<T>(local: T[], remote: T[], getId: (value: T) => string, getUpdated: (value: T) => string): T[] {
  const merged = new Map<string, T>()
  for (const value of [...local, ...remote]) {
    const key = getId(value)
    const current = merged.get(key)
    merged.set(key, current ? newest(current, value, getUpdated) : value)
  }
  return [...merged.values()]
}

function mergeQuestions(local: BibleQuestion[], remote: BibleQuestion[]): BibleQuestion[] {
  const merged = new Map(local.map((question) => [question.id, question]))
  for (const question of remote) {
    const current = merged.get(question.id)
    if (!current || question.status !== "queued" || timestamp(question.updatedAt) >= timestamp(current.updatedAt)) {
      merged.set(question.id, question)
    }
  }
  return [...merged.values()]
}

function mergeStates(local: BiblePersonalState, remote: BiblePersonalState): BiblePersonalState {
  const saved: Record<string, BibleSavedUnit> = { ...local.saved }
  for (const [unitId, value] of Object.entries(remote.saved)) {
    saved[unitId] = saved[unitId] ? newest(saved[unitId], value, (entry) => entry.updatedAt) : value
  }
  return {
    version: 1,
    progress:
      local.progress && remote.progress
        ? newest(local.progress, remote.progress, (entry) => entry.updatedAt)
        : local.progress ?? remote.progress,
    saved,
    notes: mergeById(local.notes, remote.notes, (note) => note.id, (note) => note.updatedAt),
    questions: mergeQuestions(local.questions, remote.questions),
  }
}

function batches<T>(values: T[], size = WRITE_BATCH_SIZE): T[][] {
  const result: T[][] = []
  for (let index = 0; index < values.length; index += size) result.push(values.slice(index, index + size))
  return result
}

function checkError(label: string, error: { message: string } | null): void {
  if (error) throw new Error(`${label}: ${error.message}`)
}

async function selectOwnedRows(table: "bible_saved_units" | "bible_notes" | "bible_questions", userId: string) {
  const supabase = getSupabase()
  if (!supabase) return []
  const rows: Record<string, unknown>[] = []
  for (let offset = 0; ; offset += PAGE_SIZE) {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq("user_id", userId)
      .range(offset, offset + PAGE_SIZE - 1)
    checkError(`Citirea ${table}`, error)
    const page = (data ?? []) as Record<string, unknown>[]
    rows.push(...page)
    if (page.length < PAGE_SIZE) return rows
  }
}

async function pullRemote(userId: string): Promise<BiblePersonalState> {
  const supabase = getSupabase()
  if (!supabase) return { ...EMPTY, saved: {}, notes: [], questions: [] }
  const [progressResult, savedRows, noteRows, questionRows] = await Promise.all([
    supabase.from("bible_reading_progress").select("*").eq("user_id", userId).maybeSingle(),
    selectOwnedRows("bible_saved_units", userId),
    selectOwnedRows("bible_notes", userId),
    selectOwnedRows("bible_questions", userId),
  ])
  checkError("Progres", progressResult.error)

  const progressRow = progressResult.data
  const progress: BibleProgress | null = progressRow
    ? {
        bookId: String(progressRow.book_id),
        bookName: String(progressRow.book_name),
        chapter: Number(progressRow.chapter_number),
        chapterTitle: String(progressRow.chapter_title),
        unitId: progressRow.unit_id ? String(progressRow.unit_id) : undefined,
        updatedAt: String(progressRow.updated_at),
      }
    : null

  const saved: Record<string, BibleSavedUnit> = {}
  for (const row of savedRows) {
    const unitId = String(row.unit_id)
    saved[unitId] = {
      unitId,
      bookId: String(row.book_id),
      bookName: String(row.book_name),
      chapter: Number(row.chapter_number),
      ref: String(row.ref),
      heading: String(row.heading),
      saved: Boolean(row.is_saved),
      updatedAt: String(row.updated_at),
    }
  }

  return {
    version: 1,
    progress,
    saved,
    notes: noteRows.map((row) => ({
      id: String(row.id),
      unitId: String(row.unit_id),
      bookId: String(row.book_id),
      bookName: String(row.book_name),
      chapter: Number(row.chapter_number),
      ref: String(row.ref),
      heading: String(row.heading),
      body: String(row.body),
      createdAt: String(row.created_at),
      updatedAt: String(row.updated_at),
      deletedAt: row.deleted_at ? String(row.deleted_at) : null,
    })),
    questions: questionRows.map((row) => ({
      id: String(row.id),
      question: String(row.question),
      ref: row.source_ref ? String(row.source_ref) : undefined,
      bookId: row.book_id ? String(row.book_id) : undefined,
      chapter: row.chapter_number ? Number(row.chapter_number) : undefined,
      unitId: row.unit_id ? String(row.unit_id) : undefined,
      status: String(row.status) as BibleQuestionStatus,
      answer: row.answer ? String(row.answer) : null,
      answeredAt: row.answered_at ? String(row.answered_at) : null,
      createdAt: String(row.created_at),
      updatedAt: String(row.updated_at),
    })),
  }
}

async function pushRemote(userId: string, value: BiblePersonalState): Promise<void> {
  const supabase = getSupabase()
  if (!supabase) return
  if (value.progress) {
    const progress = value.progress
    const { error } = await supabase.from("bible_reading_progress").upsert({
      user_id: userId,
      book_id: progress.bookId,
      book_name: progress.bookName,
      chapter_number: progress.chapter,
      chapter_title: progress.chapterTitle,
      unit_id: progress.unitId ?? null,
      updated_at: progress.updatedAt,
    })
    checkError("Salvarea progresului", error)
  }

  const savedRows = Object.values(value.saved).map((entry) => ({
    user_id: userId,
    unit_id: entry.unitId,
    book_id: entry.bookId,
    book_name: entry.bookName,
    chapter_number: entry.chapter,
    ref: entry.ref,
    heading: entry.heading,
    is_saved: entry.saved,
    updated_at: entry.updatedAt,
  }))
  if (savedRows.length > 0) {
    for (const batch of batches(savedRows)) {
      const { error } = await supabase.from("bible_saved_units").upsert(batch)
      checkError("Salvarea locurilor", error)
    }
  }

  if (value.notes.length > 0) {
    const noteRows = value.notes.map((note) => ({
        id: note.id,
        user_id: userId,
        unit_id: note.unitId,
        book_id: note.bookId,
        book_name: note.bookName,
        chapter_number: note.chapter,
        ref: note.ref,
        heading: note.heading,
        body: note.body,
        created_at: note.createdAt,
        updated_at: note.updatedAt,
        deleted_at: note.deletedAt,
      }))
    for (const batch of batches(noteRows)) {
      const { error } = await supabase.from("bible_notes").upsert(batch)
      checkError("Salvarea notitelor", error)
    }
  }

  if (value.questions.length > 0) {
    const questionRows = value.questions.map((question) => ({
        id: question.id,
        user_id: userId,
        question: question.question,
        source_ref: question.ref ?? null,
        book_id: question.bookId ?? null,
        chapter_number: question.chapter ?? null,
        unit_id: question.unitId ?? null,
        status: "queued",
        answer: null,
        answered_at: null,
        answered_by: null,
        created_at: question.createdAt,
        updated_at: question.createdAt,
      }))
    for (const batch of batches(questionRows)) {
      const { error } = await supabase.from("bible_questions").upsert(batch, {
        onConflict: "id",
        ignoreDuplicates: true,
      })
      checkError("Trimiterea intrebarilor", error)
    }
  }
}

export function getBiblePersonalSnapshot(): BiblePersonalSnapshot {
  load()
  return snapshot
}

export function subscribeBiblePersonal(listener: () => void): () => void {
  load()
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function scheduleBibleSync(): void {
  if (!getSupabase()) return
  if (syncTimer !== null) window.clearTimeout(syncTimer)
  syncTimer = window.setTimeout(() => {
    syncTimer = null
    void syncBiblePersonal()
  }, 500)
}

export async function syncBiblePersonal(): Promise<boolean> {
  if (activeSync) return activeSync
  activeSync = (async () => {
    if (!getSupabase()) {
      syncStatus = "local"
      emit()
      return false
    }
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      syncStatus = "offline"
      emit()
      return false
    }
    syncStatus = "syncing"
    emit()
    try {
      const user = await ensureCloudUser()
      if (!user) throw new Error("Sesiunea cloud nu este disponibila")
      const local = load()
      const remote = await pullRemote(user.id)
      const merged = mergeStates(local, remote)
      replace(merged, false)
      await pushRemote(user.id, merged)
      syncStatus = "synced"
      lastSyncedAt = now()
      emit()
      return true
    } catch {
      syncStatus = typeof navigator !== "undefined" && !navigator.onLine ? "offline" : "error"
      emit()
      return false
    } finally {
      activeSync = null
    }
  })()
  return activeSync
}

/**
 * Sterge numai copia de pe dispozitiv la deconectare. Datele deja sincronizate
 * raman in cont, dar nu pot fi mostenite de urmatoarea sesiune anonima.
 */
export function clearBiblePersonalLocal(): void {
  if (syncTimer !== null) {
    window.clearTimeout(syncTimer)
    syncTimer = null
  }
  syncStatus = "local"
  lastSyncedAt = null
  writeLocal({ ...EMPTY, saved: {}, notes: [], questions: [] })
  emit()
}

export function initializeBiblePersonal(): void {
  load()
  if (initialized) return
  initialized = true
  window.addEventListener("online", scheduleBibleSync)
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") scheduleBibleSync()
  })
  onCloudUserChange(() => scheduleBibleSync())
  scheduleBibleSync()
}

export function setBibleProgress(progress: Omit<BibleProgress, "updatedAt">): void {
  replace({ ...load(), progress: { ...progress, updatedAt: now() } })
}

export function setBibleUnitSaved(source: Required<BibleSourceSnapshot>, saved: boolean): void {
  const current = load()
  replace({
    ...current,
    saved: {
      ...current.saved,
      [source.unitId]: { ...source, saved, updatedAt: now() },
    },
  })
}

/** Completeaza instantaneele unei salvari vechi fara sa schimbe rezultatul conflictului. */
export function refreshSavedMetadata(source: Required<BibleSourceSnapshot>): void {
  const current = load()
  const existing = current.saved[source.unitId]
  if (!existing || !existing.saved || (existing.bookId && existing.heading !== "Loc salvat")) return
  replace({
    ...current,
    saved: { ...current.saved, [source.unitId]: { ...existing, ...source } },
  })
}

export function addBibleNote(source: Required<BibleSourceSnapshot>, body: string): BibleNote | null {
  const clean = body.trim()
  if (!clean) return null
  const stamp = now()
  const note: BibleNote = {
    ...source,
    id: id(),
    body: clean.slice(0, 10000),
    createdAt: stamp,
    updatedAt: stamp,
    deletedAt: null,
  }
  const current = load()
  replace({ ...current, notes: [note, ...current.notes] })
  return note
}

export function updateBibleNote(noteId: string, body: string): void {
  const clean = body.trim()
  if (!clean) return
  const current = load()
  replace({
    ...current,
    notes: current.notes.map((note) =>
      note.id === noteId ? { ...note, body: clean.slice(0, 10000), updatedAt: now(), deletedAt: null } : note,
    ),
  })
}

export function deleteBibleNote(noteId: string): void {
  const stamp = now()
  const current = load()
  replace({
    ...current,
    notes: current.notes.map((note) =>
      note.id === noteId ? { ...note, deletedAt: stamp, updatedAt: stamp } : note,
    ),
  })
}

export function queueBibleQuestion(question: string, source: BibleSourceSnapshot = {}): BibleQuestion | null {
  const clean = question.trim()
  if (!clean) return null
  const stamp = now()
  const entry: BibleQuestion = {
    ...source,
    id: id(),
    question: clean.slice(0, 10000),
    status: "queued",
    answer: null,
    answeredAt: null,
    createdAt: stamp,
    updatedAt: stamp,
  }
  const current = load()
  replace({ ...current, questions: [entry, ...current.questions] })
  return entry
}
