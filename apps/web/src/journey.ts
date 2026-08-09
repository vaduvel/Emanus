import type { Lesson } from "@emanus/shared/domain"
import type { DayPlan, PathDef } from "@emanus/shared/paths"
import {
  DOCTRINE_LESSONS,
  getPath,
  getPathForDoor,
  isPathReviewed,
  nextDoctrineLesson,
  planToday,
  resolveDoorPath,
} from "@emanus/shared/paths"
import { cloudEnabled, pullState, pushState } from "./cloud"

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

export interface JourneyState {
  schemaVersion: 2
  /** A văzut ecranele de primul contact (ce e Emanus). */
  seenWelcome: boolean
  pathId: string | null
  /** Ușa păstrează contextul și selectează secvența potrivită din același drum. */
  doorId: string | null
  /** Cursor pe drumul CURENT. Se pune la zero la fiecare schimbare de drum. */
  lessonsDone: number
  /** Doctrina este progres global; schimbarea drumului nu o resetează. */
  completedDoctrineLessonIds: string[]
  /** YYYY-MM-DD */
  lastLessonDate: string | null
  /** Invitația la prima rugăciune se face O SINGURĂ DATĂ, apoi nu mai insistăm. */
  prayerInviteSeen: boolean
  journal: JournalEntry[]
  prayers: Prayer[]
  /** Marcat când omul a văzut ecranul de final de parcurs. */
  pathCompletedSeen: boolean

  /*
   * ISTORICUL, nu cursorul.
   *
   * `lessonsDone` de mai sus se pierde la fiecare `chooseDoor` sau `switchPath`.
   * Așa trebuie: e poziția pe drumul curent. Dar înseamnă că până acum aplicația
   * nu ținea minte NIMIC din ce a făcut omul înainte. Cine termina tristețea,
   * apoi anxietatea, apoi neiertarea avea trei drumuri în spate și zero în
   * memorie.
   *
   * Drumul Emaus numără lecții pe cele șase axe, din tot ce a făcut omul, oricând.
   * Fără lista asta, harta ar arăta ceată unui om care a mers luni de zile — adică
   * exact mesajul că nimic nu contează.
   */
  completedLessonIds: string[]
  /** Stația maximă atinsă vreodată. Progresul nu dă înapoi când publicăm conținut nou. */
  emmausMaxStation: number
  /** Prima dată când a fost văzută fiecare stație, ca să nu repetăm animația de sosire. */
  emmausStationSeenAt: Record<string, string>
  /** Crucea e deschisă de la zero. Ținem minte doar că a fost, niciodată ca scor. */
  crossVisitedAt: string | null
}

const EMPTY: JourneyState = {
  schemaVersion: 2,
  seenWelcome: false,
  pathId: null,
  doorId: null,
  lessonsDone: 0,
  completedDoctrineLessonIds: [],
  lastLessonDate: null,
  prayerInviteSeen: false,
  journal: [],
  prayers: [],
  pathCompletedSeen: false,
  completedLessonIds: [],
  emmausMaxStation: 1,
  emmausStationSeenAt: {},
  crossVisitedAt: null,
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

/**
 * Aduce o stare salvată la forma curentă.
 *
 * Oamenii care au aplicația de dinainte de Drumul Emaus au în localStorage o stare
 * fără `completedLessonIds`. Dacă i-am lăsa așa, harta lor ar porni de la zero deși
 * au muncit. Recuperăm ce se poate din două surse sigure: lecțiile din drumul curent
 * până la cursor, și lecțiile la care au scris ceva în jurnal (acelea sunt terminate
 * prin definiție, indiferent pe ce drum erau).
 *
 * Ce s-a pierdut definitiv — drumuri terminate înainte de a schimba drumul — nu se
 * poate recupera. Nu a fost salvat niciodată.
 *
 * DE CE SE VERIFICĂ `raw` ȘI NU `s`:
 *
 * Ce iese din `JSON.parse` sau din nor NU are tipul pe care i-l dăm noi.
 * `Partial<JourneyState>` e o promisiune despre date scrise de o versiune mai veche
 * a aplicației, nu o garanție. Dacă verificăm pe `s`, compilatorul citește tipul
 * declarat și consideră verificarea imposibilă: pentru el `emmausStationSeenAt` e
 * `Record<string, string>`, deci `=== null` nu se poate întâmpla niciodată și e
 * eroare de compilare, nu avertisment. În realitate se poate întâmpla foarte bine —
 * exact de-aia există funcția asta. Verificăm deci pe valoarea netipizată, unde
 * întrebarea are sens, și scriem rezultatul în `s`, unde tipul e din nou ferm.
 *
 * Asta a picat CI-ul o dată; typecheck-ul nu vede diferența dintre date pe care le
 * scriem noi și date pe care doar le primim.
 */
export function normalizeJourneyState(parsed: unknown): JourneyState {
  const raw = typeof parsed === "object" && parsed !== null
    ? parsed as Record<string, unknown>
    : {}
  const s: JourneyState = { ...EMPTY, ...raw, schemaVersion: 2 } as JourneyState

  s.doorId = typeof raw.doorId === "string" ? raw.doorId : null
  s.pathId = typeof raw.pathId === "string" ? raw.pathId : null
  if (!Array.isArray(raw.completedLessonIds)) s.completedLessonIds = []
  if (Array.isArray(raw.completedDoctrineLessonIds)) {
    s.completedDoctrineLessonIds = raw.completedDoctrineLessonIds.map(String)
  } else {
    const legacyCount = typeof raw.doctrineDone === "number" ? Math.max(0, raw.doctrineDone) : 0
    s.completedDoctrineLessonIds = DOCTRINE_LESSONS.slice(0, legacyCount).map((lesson) => lesson.id)
  }
  if (!Array.isArray(raw.journal)) s.journal = []
  if (!Array.isArray(raw.prayers)) s.prayers = []
  if (typeof raw.emmausMaxStation !== "number" || raw.emmausMaxStation < 1) {
    s.emmausMaxStation = 1
  }
  if (typeof raw.emmausStationSeenAt !== "object" || raw.emmausStationSeenAt === null) {
    s.emmausStationSeenAt = {}
  }
  if (typeof raw.crossVisitedAt !== "string") s.crossVisitedAt = null

  if (s.completedLessonIds.length === 0) {
    const recovered = new Set<string>()
    const path = getPathForDoor(s.doorId) ?? getPath(s.pathId)
    if (path && s.lessonsDone > 0) {
      for (const lesson of path.lessons.slice(0, s.lessonsDone)) recovered.add(lesson.id)
    }
    for (const entry of s.journal) {
      if (entry?.lessonId) recovered.add(entry.lessonId)
    }
    if (recovered.size > 0) s.completedLessonIds = [...recovered]
  }

  for (const id of s.completedLessonIds) {
    if (DOCTRINE_LESSONS.some((lesson) => lesson.id === id) && !s.completedDoctrineLessonIds.includes(id)) {
      s.completedDoctrineLessonIds.push(id)
    }
  }

  return s
}

export function load(): JourneyState {
  try {
    const raw = localStorage.getItem(K)
    if (!raw) return { ...EMPTY }
    return normalizeJourneyState(JSON.parse(raw))
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
  return s.pathId === null && s.journal.length === 0 && s.prayers.length === 0
}

/**
 * De apelat o dată la pornire, înainte de primul randare.
 * Telefon nou și local gol -> aduce din nor. Altfel localul învinge și se urcă.
 * Returnează true dacă s-a adus ceva din nor (ecranele trebuie redesenate).
 */
export async function hydrateFromCloud(): Promise<boolean> {
  if (!cloudEnabled()) return false
  const local = load()
  const remote = await pullState()
  if (remote && isEmpty(local) && !isEmpty(remote)) {
    writeLocal(normalizeJourneyState(remote))
    return true
  }
  if (!isEmpty(local)) void pushState(local)
  return false
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

/*
 * Atenție la `chooseDoor` și `switchPath`: amândouă pun `lessonsDone` la zero, și
 * așa trebuie să facă — e cursorul pe drumul nou. Dar NU au voie să atingă
 * `completedLessonIds`. Ce a făcut omul rămâne făcut, oricare ușă alege după aceea.
 */
export function chooseDoor(doorId: string): JourneyState {
  const s = load()
  const path = getPathForDoor(doorId)
  if (!path || !isPathReviewed(path)) return s
  return save({
    ...s,
    seenWelcome: true,
    pathId: resolveDoorPath(doorId),
    doorId,
    lessonsDone: 0,
    lastLessonDate: null,
    pathCompletedSeen: false,
  })
}

export function currentPath(): PathDef | undefined {
  const state = load()
  return getPathForDoor(state.doorId) ?? getPath(state.pathId)
}

export function plan(): DayPlan | null {
  const s = load()
  const path = getPathForDoor(s.doorId) ?? getPath(s.pathId)
  if (!path) return null
  const since = s.lastLessonDate === null ? null : daysBetween(s.lastLessonDate, today())
  return planToday(path, s.lessonsDone, since)
}

/**
 * Lecția de doctrină disponibilă acum, dacă există.
 * Se deschide după lecția 5 din parcurs; nu înlocuiește niciodată lecția zilei,
 * stă alături, ca lucru opțional.
 *
 * Pe drumul "De la zero" nu se oferă: acolo doctrina ESTE drumul.
 */
export function doctrineAvailable(): Lesson | undefined {
  const s = load()
  const path = getPathForDoor(s.doorId) ?? getPath(s.pathId)
  if (!path) return undefined
  return nextDoctrineLesson(path, s.lessonsDone, s.completedDoctrineLessonIds)
}

export function completeLesson(lessonId: string, journalText: string): JourneyState {
  const s = load()
  const journal = journalText.trim()
    ? [...s.journal.filter((j) => j.lessonId !== lessonId), { lessonId, text: journalText.trim(), date: today() }]
    : s.journal

  // Istoricul crește o singură dată per lecție, indiferent de câte ori se reia.
  const completedLessonIds = s.completedLessonIds.includes(lessonId)
    ? s.completedLessonIds
    : [...s.completedLessonIds, lessonId]

  // Doctrina făcută ca supliment nu consumă ziua și nu avansează parcursul personal.
  // Excepție: pe drumul "De la zero", aceleași lecții sunt chiar parcursul.
  if (DOCTRINE_LESSONS.some((lesson) => lesson.id === lessonId)) {
    const completedDoctrineLessonIds = s.completedDoctrineLessonIds.includes(lessonId)
      ? s.completedDoctrineLessonIds
      : [...s.completedDoctrineLessonIds, lessonId]
    return save({ ...s, completedDoctrineLessonIds, journal, completedLessonIds })
  }

  return save({
    ...s,
    lessonsDone: Math.max(s.lessonsDone, indexOfLesson(lessonId) + 1),
    lastLessonDate: today(),
    journal,
    completedLessonIds,
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

/** Trece pe alt drum, păstrând tot ce a scris (jurnal și rugăciuni) și tot ce a terminat. */
export function switchPath(pathId: string): JourneyState {
  const s = load()
  return save({
    ...s,
    pathId,
    doorId: null,
    lessonsDone: 0,
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
  })
}

// --- Drumul Emaus (docs/43) ---

/** Toate lecțiile terminate, din toate drumurile. Intrarea în motorul hărții. */
export function completedLessons(): string[] {
  return load().completedLessonIds
}

/**
 * Ține minte că s-a ajuns la o stație. Se scrie doar în sus, niciodată în jos:
 * când publicăm conținut nou, numitorul crește și procentul ar scădea de la sine.
 * Un om care a ajuns la mormântul gol nu are voie să fie trimis înapoi la deal
 * pentru că noi am mai scris trei cărți.
 */
export function recordEmmausStation(stationId: number): JourneyState {
  const s = load()
  if (stationId <= s.emmausMaxStation && s.emmausStationSeenAt[String(stationId)]) return s
  return save({
    ...s,
    emmausMaxStation: Math.max(s.emmausMaxStation, stationId),
    emmausStationSeenAt: {
      ...s.emmausStationSeenAt,
      [String(stationId)]: s.emmausStationSeenAt[String(stationId)] ?? today(),
    },
  })
}

/** A fost la Cruce. Fără procent, fără XP, nu se marchează ca lecție. (docs/43 §2, P1) */
export function markCrossVisited(): void {
  const s = load()
  if (s.crossVisitedAt) return
  save({ ...s, crossVisitedAt: today() })
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
