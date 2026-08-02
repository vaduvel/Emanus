import type { JourneyState } from "./journey"
import { ensureCloudUser } from "./cloudSession"
import { getSupabase } from "./supabase"

let ready = false

export function cloudEnabled(): boolean {
  return getSupabase() !== null
}

type RowId = string

async function deleteStaleRows(
  table: "journal" | "prayers",
  idColumn: "lesson_id" | "id",
  userId: string,
  localIds: RowId[],
): Promise<void> {
  const sb = getSupabase()
  if (!sb) return
  const { data } = await sb.from(table).select(idColumn).eq("user_id", userId)
  const keep = new Set(localIds)
  const stale = (data ?? [])
    .map((row) => String(row[idColumn]))
    .filter((id) => !keep.has(id))
  if (stale.length > 0) await sb.from(table).delete().eq("user_id", userId).in(idColumn, stale)
}

/**
 * Urcă imaginea completă a stării. Nu facem numai upsert: ștergerile locale se
 * reflectă și în cloud, altfel o rugăciune ștearsă reapare pe telefonul următor.
 */
export async function pushState(s: JourneyState): Promise<void> {
  const sb = getSupabase()
  const uid = (await ensureCloudUser())?.id ?? null
  if (!sb || !uid) return
  try {
    const stamp = new Date().toISOString()
    await sb.from("journey").upsert({
      user_id: uid,
      seen_welcome: s.seenWelcome,
      path_id: s.pathId,
      lessons_done: s.lessonsDone,
      doctrine_done: s.doctrineDone,
      last_lesson_date: s.lastLessonDate,
      prayer_invite_seen: s.prayerInviteSeen,
      path_completed_seen: s.pathCompletedSeen,
      path_progress: s.pathProgressById,
      library_done: s.libraryDone,
      updated_at: stamp,
    })

    if (s.journal.length > 0) {
      await sb.from("journal").upsert(
        s.journal.map((entry) => ({
          user_id: uid,
          lesson_id: entry.lessonId,
          context_id: entry.contextId ?? null,
          text: entry.text,
          entry_date: entry.date,
          updated_at: stamp,
        })),
      )
    }
    await deleteStaleRows("journal", "lesson_id", uid, s.journal.map((entry) => entry.lessonId))

    if (s.prayers.length > 0) {
      await sb.from("prayers").upsert(
        s.prayers.map((prayer) => ({
          id: prayer.id,
          user_id: uid,
          text: prayer.text,
          created_date: prayer.createdAt,
          answered_date: prayer.answeredAt,
          answer_note: prayer.answerNote ?? null,
        })),
      )
    }
    await deleteStaleRows("prayers", "id", uid, s.prayers.map((prayer) => prayer.id))
  } catch {
    /* Offline sau schema încă neaplicată: localul rămâne sursa de adevăr. */
  }
}

export async function pullState(): Promise<JourneyState | null> {
  const sb = getSupabase()
  const uid = (await ensureCloudUser())?.id ?? null
  if (!sb || !uid) return null
  try {
    const [{ data: journey }, { data: journal }, { data: prayers }] = await Promise.all([
      sb.from("journey").select("*").eq("user_id", uid).maybeSingle(),
      sb.from("journal").select("*").eq("user_id", uid).order("entry_date"),
      sb.from("prayers").select("*").eq("user_id", uid).order("created_date", { ascending: false }),
    ])
    if (!journey) return null
    return {
      seenWelcome: Boolean(journey.seen_welcome),
      pathId: (journey.path_id as string | null) ?? null,
      lessonsDone: Number(journey.lessons_done ?? 0),
      doctrineDone: Number(journey.doctrine_done ?? 0),
      lastLessonDate: (journey.last_lesson_date as string | null) ?? null,
      prayerInviteSeen: Boolean(journey.prayer_invite_seen),
      pathCompletedSeen: Boolean(journey.path_completed_seen),
      pathProgressById:
        journey.path_progress && typeof journey.path_progress === "object"
          ? journey.path_progress as JourneyState["pathProgressById"]
          : {},
      libraryDone: Array.isArray(journey.library_done)
        ? journey.library_done.map(String)
        : [],
      journal: (journal ?? []).map((row) => ({
        lessonId: String(row.lesson_id),
        contextId: row.context_id ? String(row.context_id) : undefined,
        text: String(row.text),
        date: String(row.entry_date),
      })),
      prayers: (prayers ?? []).map((row) => ({
        id: String(row.id),
        text: String(row.text),
        createdAt: String(row.created_date),
        answeredAt: (row.answered_date as string | null) ?? null,
        answerNote: (row.answer_note as string | undefined) ?? undefined,
      })),
    }
  } catch {
    return null
  }
}

export function cloudReady(): boolean { return ready }
export function markCloudReady(): void { ready = true }

export async function linkEmail(email: string): Promise<boolean> {
  const sb = getSupabase()
  if (!sb) return false
  try {
    const { error } = await sb.auth.updateUser({ email: email.trim() })
    return !error
  } catch {
    return false
  }
}
