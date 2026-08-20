const STORAGE_KEY = "emanus_learning_progress_v1"
let volatileStore: LearningProgressStore | null = null

export interface ProgramLearningProgress {
  completedLessonIds: string[]
  lastLessonId: string | null
  journals: Record<string, string>
  updatedAt: string | null
  drafts?: Record<string, LessonProgressDraft>
}

export interface LessonProgressDraft {
  mainStepId: string
  mainStepIndex: number
  revealedStepIds: string[]
  choices: Record<string, string>
  multiChoices: Record<string, string[]>
  textResponses: Record<string, string>
  quizAnswers: Record<string, number>
  checkIns: Record<string, string>
  journal: string
  updatedAt?: string
}

interface LearningProgressStore {
  version: 1
  programs: Record<string, ProgramLearningProgress>
}

const EMPTY_PROGRAM: ProgramLearningProgress = {
  completedLessonIds: [],
  lastLessonId: null,
  journals: {},
  updatedAt: null,
}

function emptyStore(): LearningProgressStore {
  return { version: 1, programs: {} }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value)
}

function stringRecord(value: unknown): Record<string, string> {
  if (!isRecord(value)) return {}
  return Object.fromEntries(
    Object.entries(value).filter((entry): entry is [string, string] => typeof entry[1] === "string"),
  )
}

function numberRecord(value: unknown): Record<string, number> {
  if (!isRecord(value)) return {}
  return Object.fromEntries(
    Object.entries(value).filter((entry): entry is [string, number] => (
      typeof entry[1] === "number" && Number.isInteger(entry[1]) && entry[1] >= 0
    )),
  )
}

function stringArrayRecord(value: unknown): Record<string, string[]> {
  if (!isRecord(value)) return {}
  const result: Record<string, string[]> = {}
  for (const [key, candidate] of Object.entries(value)) {
    if (!Array.isArray(candidate)) continue
    result[key] = [...new Set(candidate.filter((item): item is string => typeof item === "string"))]
  }
  return result
}

function lessonDraft(value: unknown): LessonProgressDraft | undefined {
  if (!isRecord(value)) return undefined
  const mainStepId = typeof value.mainStepId === "string" ? value.mainStepId : ""
  const mainStepIndex = Number.isInteger(value.mainStepIndex) && Number(value.mainStepIndex) >= 0
    ? Number(value.mainStepIndex)
    : -1
  if (!mainStepId || mainStepIndex < 0) return undefined
  const revealedStepIds = Array.isArray(value.revealedStepIds)
    ? [...new Set(value.revealedStepIds.filter((id): id is string => typeof id === "string" && Boolean(id)))]
    : []
  return {
    mainStepId,
    mainStepIndex,
    revealedStepIds: revealedStepIds.length ? revealedStepIds : [mainStepId],
    choices: stringRecord(value.choices),
    multiChoices: stringArrayRecord(value.multiChoices),
    textResponses: stringRecord(value.textResponses),
    quizAnswers: numberRecord(value.quizAnswers),
    checkIns: stringRecord(value.checkIns),
    journal: typeof value.journal === "string" ? value.journal : "",
    updatedAt: typeof value.updatedAt === "string" ? value.updatedAt : undefined,
  }
}

function draftRecord(value: unknown): Record<string, LessonProgressDraft> {
  if (!isRecord(value)) return {}
  const drafts: Record<string, LessonProgressDraft> = {}
  for (const [lessonId, candidate] of Object.entries(value)) {
    const draft = lessonDraft(candidate)
    if (draft) drafts[lessonId] = draft
  }
  return drafts
}

function programProgress(value: unknown): ProgramLearningProgress | undefined {
  if (!isRecord(value)) return undefined
  return {
    completedLessonIds: Array.isArray(value.completedLessonIds)
      ? [...new Set(value.completedLessonIds.filter((id): id is string => typeof id === "string" && Boolean(id)))]
      : [],
    lastLessonId: typeof value.lastLessonId === "string" ? value.lastLessonId : null,
    journals: stringRecord(value.journals),
    updatedAt: typeof value.updatedAt === "string" ? value.updatedAt : null,
    drafts: draftRecord(value.drafts),
  }
}

function loadStore(): LearningProgressStore {
  if (volatileStore) return volatileStore
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyStore()
    const parsed: unknown = JSON.parse(raw)
    if (!isRecord(parsed) || parsed.version !== 1 || !isRecord(parsed.programs)) return emptyStore()
    const programs: Record<string, ProgramLearningProgress> = {}
    for (const [programId, candidate] of Object.entries(parsed.programs)) {
      const progress = programProgress(candidate)
      if (progress) programs[programId] = progress
    }
    return { version: 1, programs }
  } catch {
    return emptyStore()
  }
}

function saveStore(store: LearningProgressStore): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
    volatileStore = null
  } catch {
    // Păstrăm progresul în memorie cât timp fila rămâne deschisă, chiar dacă
    // browserul blochează persistența sau spațiul local este plin.
    volatileStore = store
  }
}

export function getProgramProgress(programId: string): ProgramLearningProgress {
  const progress = loadStore().programs[programId]
  if (!progress) return { ...EMPTY_PROGRAM, completedLessonIds: [], journals: {} }
  return { ...progress, drafts: { ...progress.drafts } }
}

export function getLearningProgressSnapshot(): Record<string, ProgramLearningProgress> {
  const programs = loadStore().programs
  return Object.fromEntries(Object.entries(programs).map(([programId, progress]) => [programId, {
    ...progress,
    completedLessonIds: [...progress.completedLessonIds],
    journals: { ...progress.journals },
    drafts: Object.fromEntries(Object.entries(progress.drafts ?? {}).map(([lessonId, draft]) => [lessonId, {
      ...draft,
      revealedStepIds: [...draft.revealedStepIds],
      choices: { ...draft.choices },
      multiChoices: Object.fromEntries(Object.entries(draft.multiChoices).map(([stepId, values]) => [stepId, [...values]])),
      textResponses: { ...draft.textResponses },
      quizAnswers: { ...draft.quizAnswers },
      checkIns: { ...draft.checkIns },
    }])),
  }]))
}

export function getLessonDraft(programId: string, lessonId: string): LessonProgressDraft | undefined {
  const draft = getProgramProgress(programId).drafts?.[lessonId]
  return draft ? {
    ...draft,
    revealedStepIds: [...draft.revealedStepIds],
    choices: { ...draft.choices },
    multiChoices: Object.fromEntries(Object.entries(draft.multiChoices).map(([stepId, values]) => [stepId, [...values]])),
    textResponses: { ...draft.textResponses },
    quizAnswers: { ...draft.quizAnswers },
    checkIns: { ...draft.checkIns },
  } : undefined
}

export function saveLessonDraft(programId: string, lessonId: string, draft: LessonProgressDraft): void {
  const validated = lessonDraft(draft)
  if (!validated) return
  const store = loadStore()
  const current = getProgramProgress(programId)
  store.programs[programId] = {
    ...current,
    lastLessonId: lessonId,
    drafts: { ...current.drafts, [lessonId]: { ...validated, updatedAt: new Date().toISOString() } },
    updatedAt: new Date().toISOString(),
  }
  saveStore(store)
}

export function clearLessonDraft(programId: string, lessonId: string): void {
  const store = loadStore()
  const current = getProgramProgress(programId)
  if (!current.drafts?.[lessonId]) return
  const drafts = { ...current.drafts }
  delete drafts[lessonId]
  store.programs[programId] = { ...current, drafts }
  saveStore(store)
}

export function completeProgramLesson(programId: string, lessonId: string, journalText: string): ProgramLearningProgress {
  const store = loadStore()
  const current = getProgramProgress(programId)
  const alreadyCompleted = current.completedLessonIds.includes(lessonId)
  const journal = journalText.trim()
  const journalChanged = Boolean(journal) && current.journals[lessonId] !== journal

  if (alreadyCompleted && !journalChanged) {
    if (!current.drafts?.[lessonId]) return current
    const drafts = { ...current.drafts }
    delete drafts[lessonId]
    const withoutDraft = { ...current, drafts }
    store.programs[programId] = withoutDraft
    saveStore(store)
    return withoutDraft
  }

  const next: ProgramLearningProgress = {
    completedLessonIds: alreadyCompleted ? current.completedLessonIds : [...current.completedLessonIds, lessonId],
    lastLessonId: alreadyCompleted ? current.lastLessonId : lessonId,
    journals: journal ? { ...current.journals, [lessonId]: journal } : current.journals,
    drafts: { ...current.drafts },
    updatedAt: new Date().toISOString(),
  }
  delete next.drafts?.[lessonId]
  store.programs[programId] = next
  saveStore(store)
  return next
}

/**
 * Șterge progresul Bibliotecii și copia volatilă folosită când localStorage nu
 * poate scrie. Este chemat numai după ce ștergerea remote a fost confirmată.
 */
export function clearLearningProgress(): boolean {
  volatileStore = null
  try {
    localStorage.removeItem(STORAGE_KEY)
    return localStorage.getItem(STORAGE_KEY) === null
  } catch {
    return false
  }
}
