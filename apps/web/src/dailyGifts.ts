// Starea locală a celor trei daruri de zi (docs/27 §2.5, §3.4, §4.5).
//
// De ce local: funcționează offline (docs/00-DIRECTIE §15, <2s) și nu atinge
// apps/api. Sincronizarea în cloud vine separat, dacă e nevoie.
//
// NU se afișează niciodată din datele de aici: serie de zile, procent, XP,
// „ziua 4 din 7” (docs/20 §1 — dacă aplicația măsoară ceva, devine obicei).
// `dayIndex` există doar ca să știm ce conținut deschidem, nu ca scor.
import {
  DEVOTIONAL_EMPTY_PROGRESS,
  devotionalDay,
  devotionalDaysAvailable,
  manaMessage,
  FAMILY_COVENANT_EMPTY_DRAFT,
  SCROLL_VERSES,
  drawScrollVerse,
  type DevotionalAgeMode,
  type DevotionalDay,
  type DevotionalProgress,
  type FamilyCovenantDraft,
  type MessageMood,
  type ScrollSectionId,
  type ScrollVerse,
} from "@emanus/shared"

const KEY = "emanus.daruri.v1"

/** Fără repetare la versete și carduri (docs/27 §3.4). */
const NO_REPEAT_DAYS = 60

interface Seen {
  id: string
  at: string
}

interface SavedCovenant {
  draft: FamilyCovenantDraft
  text: string
  at: string
}

export type DailyVerseSlot = "scroll" | "lamp"

interface DailyVerseSelection {
  id: string
  at: string
  section?: ScrollSectionId
}

interface GiftsState {
  devotional: DevotionalProgress
  seenCards: Seen[]
  seenVerses: Seen[]
  eveningNotes: { at: string; text: string }[]
  lastMood: MessageMood | null
  ageMode: DevotionalAgeMode
  covenant: SavedCovenant | null
  dailyVerses: Partial<Record<DailyVerseSlot, DailyVerseSelection>>
}

const EMPTY: GiftsState = {
  devotional: { ...DEVOTIONAL_EMPTY_PROGRESS, openedDays: [] },
  seenCards: [],
  seenVerses: [],
  eveningNotes: [],
  lastMood: null,
  ageMode: "adult",
  covenant: null,
  dailyVerses: {},
}

function read(): GiftsState {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { ...EMPTY }
    const parsed = JSON.parse(raw) as Partial<GiftsState>
    return {
      devotional: parsed.devotional ?? { ...DEVOTIONAL_EMPTY_PROGRESS, openedDays: [] },
      seenCards: parsed.seenCards ?? [],
      seenVerses: parsed.seenVerses ?? [],
      eveningNotes: parsed.eveningNotes ?? [],
      lastMood: parsed.lastMood ?? null,
      ageMode: parsed.ageMode ?? "adult",
      covenant: parsed.covenant ?? null,
      dailyVerses: parsed.dailyVerses ?? {},
    }
  } catch {
    return { ...EMPTY }
  }
}

function write(state: GiftsState): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    // memoria plină sau mod privat: darul de azi funcționează oricum
  }
}

function daysSince(iso: string | null): number {
  if (!iso) return 0
  const then = new Date(iso).getTime()
  if (Number.isNaN(then)) return 0
  return Math.max(0, Math.floor((Date.now() - then) / 86400000))
}

function fresh(list: Seen[]): string[] {
  const limit = Date.now() - NO_REPEAT_DAYS * 86400000
  return list.filter((s) => new Date(s.at).getTime() >= limit).map((s) => s.id)
}

function remember(list: Seen[], id: string): Seen[] {
  const limit = Date.now() - NO_REPEAT_DAYS * 86400000
  const kept = list.filter((s) => s.id !== id && new Date(s.at).getTime() >= limit)
  return [...kept, { id, at: new Date().toISOString() }]
}

function isToday(iso: string | null): boolean {
  if (!iso) return false
  const d = new Date(iso)
  const now = new Date()
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  )
}

// —— Devoțional —————————————————————————————————————

/**
 * Ziua de citit acum. Regula manei (Exod 16, docs/27 §4.5): zilele în care
 * n-ai deschis app-ul nu se acumulează ca datorie și nu se pot citi înainte.
 */
export function devotionalToday(): DevotionalDay | null {
  const s = read()
  const total = devotionalDaysAvailable()
  let index = Math.min(Math.max(1, s.devotional.dayIndex), total)
  const opened = new Set(s.devotional.openedDays)

  // Migrare pentru versiunea veche, care muta indexul imediat după apăsare.
  if (isToday(s.devotional.lastOpenedAt) && !opened.has(index) && opened.has(index - 1)) {
    index -= 1
  } else if (!isToday(s.devotional.lastOpenedAt) && opened.has(index)) {
    if (index >= total) return null
    index += 1
    write({ ...s, devotional: { ...s.devotional, dayIndex: index } })
  }
  return devotionalDay(index)
}

export function devotionalReadToday(): boolean {
  const s = read()
  if (!isToday(s.devotional.lastOpenedAt)) return false
  const current = Math.min(Math.max(1, s.devotional.dayIndex), devotionalDaysAvailable())
  return s.devotional.openedDays.includes(current) || s.devotional.openedDays.includes(current - 1)
}

export function devotionalIsComplete(): boolean {
  const total = devotionalDaysAvailable()
  return total > 0 && read().devotional.openedDays.includes(total)
}

/** Mesajul de revenire după o pauză. Niciodată numărătoare de zile pierdute. */
export function devotionalWelcomeBack(): string | null {
  const s = read()
  const away = daysSince(s.devotional.lastOpenedAt)
  if (away <= 0) return null
  return manaMessage(away)
}

/** Marchează ziua ca deschisă. Următoarea se deschide abia într-o nouă zi calendaristică. */
export function markDevotionalRead(): void {
  const s = read()
  if (isToday(s.devotional.lastOpenedAt)) return
  const total = devotionalDaysAvailable()
  const current = Math.min(Math.max(1, s.devotional.dayIndex), total)
  write({
    ...s,
    devotional: {
      // `dayIndex` rămâne darul zilei curente. devotionalToday îl avansează mâine.
      dayIndex: current,
      openedDays: s.devotional.openedDays.includes(current)
        ? s.devotional.openedDays
        : [...s.devotional.openedDays, current],
      lastOpenedAt: new Date().toISOString(),
    },
  })
}

/** Recitire: doar zile deja deschise. Înainte nu se poate citi. */
export function canReadDevotionalDay(dayNumber: number): boolean {
  const s = read()
  return dayNumber <= s.devotional.dayIndex && dayNumber >= 1
}

/** Zile deja parcurse — folosit de candelă pentru pietrele din spate. */
export function walkedDays(): number {
  return read().devotional.openedDays.length
}

// —— Varianta pe vârstă (faza G, docs/27 §6) ————————————————————

/** Cu cine citești azi. Alegerea rămâne, nu se întreabă zilnic. */
export function devotionalAgeMode(): DevotionalAgeMode {
  return read().ageMode
}

export function setDevotionalAgeMode(mode: DevotionalAgeMode): void {
  write({ ...read(), ageMode: mode })
}

// —— Legământul familiei ——————————————————————————————

export function familyCovenant(): SavedCovenant | null {
  return read().covenant
}

export function familyCovenantDraft(): FamilyCovenantDraft {
  return read().covenant?.draft ?? { ...FAMILY_COVENANT_EMPTY_DRAFT, names: ["", ""] }
}

export function saveFamilyCovenant(draft: FamilyCovenantDraft, text: string): void {
  write({
    ...read(),
    covenant: { draft, text, at: new Date().toISOString() },
  })
}

export function clearFamilyCovenant(): void {
  write({ ...read(), covenant: null })
}

// —— Mesajul zilei ——————————————————————————————————

export function recentCardIds(): string[] {
  return fresh(read().seenCards)
}

export function rememberCard(id: string): void {
  const s = read()
  write({ ...s, seenCards: remember(s.seenCards, id) })
}

// —— Pergament / candelă ——————————————————————————————

export function recentVerseIds(): string[] {
  return fresh(read().seenVerses)
}

export function rememberVerse(id: string): void {
  const s = read()
  write({ ...s, seenVerses: remember(s.seenVerses, id) })
}

export function savedVerseToday(slot: DailyVerseSlot): ScrollVerse | null {
  const selected = read().dailyVerses[slot]
  if (!selected || !isToday(selected.at)) return null
  return SCROLL_VERSES.find((verse) => verse.id === selected.id) ?? null
}

/** Un singur verset per suprafață și zi; redeschiderea nu mai retrage altul. */
export function dailyVerse(input: {
  slot: DailyVerseSlot
  section?: ScrollSectionId
  mood?: MessageMood
}): ScrollVerse {
  const cached = savedVerseToday(input.slot)
  if (cached) return cached
  const s = read()
  const drawn = drawScrollVerse({
    section: input.section,
    mood: input.mood,
    recentIds: fresh(s.seenVerses),
  })
  write({
    ...s,
    seenVerses: remember(s.seenVerses, drawn.id),
    dailyVerses: {
      ...s.dailyVerses,
      [input.slot]: {
        id: drawn.id,
        at: new Date().toISOString(),
        ...(input.section ? { section: input.section } : {}),
      },
    },
  })
  return drawn
}

export function lastMood(): MessageMood | null {
  return read().lastMood
}

export function setLastMood(mood: MessageMood | null): void {
  write({ ...read(), lastMood: mood })
}

/** Jurnalul de seară: două rânduri, nu un formular (docs/27 §4.6). */
export function saveEveningNote(text: string): void {
  const trimmed = text.trim()
  if (!trimmed) return
  const s = read()
  write({
    ...s,
    eveningNotes: [...s.eveningNotes.slice(-364), { at: new Date().toISOString(), text: trimmed }],
  })
}

export function eveningNotes(): { at: string; text: string }[] {
  return [...read().eveningNotes].reverse()
}

export function eveningNoteSavedToday(): boolean {
  const notes = read().eveningNotes
  const last = notes[notes.length - 1]
  return last ? isToday(last.at) : false
}
