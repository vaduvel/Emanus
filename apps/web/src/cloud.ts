import type { JourneyState } from "./journey"
import { getSupabase } from "./supabase"

/*
 * Sincronizarea opțională cu Supabase.
 *
 * REGULI:
 *  1. Local rămâne sursa de adevăr.
 *  2. Nicio sesiune anonimă și nicio încărcare nu pornesc fără acordul explicit
 *     dat în ecranul „Eu”.
 *  3. Nu se urcă răspunsurile la alegeri, schițele, scoruri sau analitică.
 */

let userId: string | null = null
let ready = false
const BACKUP_CONSENT_KEY = "emanus_backup_consent_v1"

export function cloudEnabled(): boolean {
  return getSupabase() !== null
}

export function cloudBackupEnabled(): boolean {
  if (!cloudEnabled()) return false
  try {
    return localStorage.getItem(BACKUP_CONSENT_KEY) === "enabled"
  } catch {
    return false
  }
}

export function setCloudBackupConsent(enabled: boolean): void {
  try {
    if (enabled) localStorage.setItem(BACKUP_CONSENT_KEY, "enabled")
    else localStorage.removeItem(BACKUP_CONSENT_KEY)
  } catch {
    // Dacă browserul blochează localStorage, backup-ul rămâne oprit.
  }
}

/** Intrare anonimă. Returnează id-ul sau null dacă nu se poate (offline, neconfigurat). */
async function ensureUser(): Promise<string | null> {
  const sb = getSupabase()
  if (!sb) return null
  if (userId) return userId
  try {
    const { data } = await sb.auth.getSession()
    if (data.session?.user) {
      userId = data.session.user.id
      ready = true
      return userId
    }
    const { data: anon, error } = await sb.auth.signInAnonymously()
    if (error || !anon.user) return null
    userId = anon.user.id
    ready = true
    return userId
  } catch {
    return null
  }
}

async function deleteStaleRows(
  table: "journal" | "prayers",
  idColumn: "lesson_id" | "id",
  localIds: string[],
  uid: string,
): Promise<boolean> {
  const sb = getSupabase()
  if (!sb) return false
  const { data, error } = await sb.from(table).select(idColumn).eq("user_id", uid)
  if (error) return false
  const local = new Set(localIds)
  const stale = (data ?? [])
    .map((row) => String((row as Record<string, unknown>)[idColumn]))
    .filter((id) => !local.has(id))
  if (stale.length === 0) return true
  const { error: deleteError } = await sb
    .from(table)
    .delete()
    .eq("user_id", uid)
    .in(idColumn, stale)
  return !deleteError
}

/** Urcă starea curentă numai după acord; returnează dacă sincronizarea a reușit. */
export async function pushState(s: JourneyState): Promise<boolean> {
  const sb = getSupabase()
  const uid = await ensureUser()
  if (!sb || !uid) return false
  try {
    const journeyRow = {
      user_id: uid,
      seen_welcome: s.seenWelcome,
      selected_door_id: s.selectedDoorId,
      path_id: s.pathId,
      lessons_done: s.lessonsDone,
      doctrine_done: s.doctrineDone,
      last_lesson_date: s.lastLessonDate,
      prayer_invite_seen: s.prayerInviteSeen,
      path_completed_seen: s.pathCompletedSeen,
      course_progress: s.courseProgress,
      updated_at: new Date().toISOString(),
    }
    let { error: journeyError } = await sb.from("journey").upsert(journeyRow)
    if (journeyError?.message.includes("selected_door_id")) {
      const legacyJourneyRow = Object.fromEntries(
        Object.entries(journeyRow).filter(([key]) => key !== "selected_door_id"),
      )
      journeyError = (
        await sb.from("journey").upsert(legacyJourneyRow)
      ).error
    }
    if (journeyError) return false

    if (!(await deleteStaleRows("journal", "lesson_id", s.journal.map((item) => item.lessonId), uid))) {
      return false
    }
    if (s.journal.length > 0) {
      const { error } = await sb.from("journal").upsert(
        s.journal.map((j) => ({
          user_id: uid,
          lesson_id: j.lessonId,
          text: j.text,
          entry_date: j.date,
          updated_at: new Date().toISOString(),
        })),
      )
      if (error) return false
    }

    if (!(await deleteStaleRows("prayers", "id", s.prayers.map((item) => item.id), uid))) {
      return false
    }
    if (s.prayers.length > 0) {
      const { error } = await sb.from("prayers").upsert(
        s.prayers.map((p) => ({
          id: p.id,
          user_id: uid,
          text: p.text,
          created_date: p.createdAt,
          answered_date: p.answeredAt,
          answer_note: p.answerNote ?? null,
        })),
      )
      if (error) return false
    }
    return true
  } catch {
    return false
  }
}

/** Aduce starea din nor. Returnează null dacă nu există nimic salvat. */
export async function pullState(): Promise<JourneyState | null> {
  const sb = getSupabase()
  const uid = await ensureUser()
  if (!sb || !uid) return null
  try {
    const [{ data: j }, { data: jr }, { data: pr }] = await Promise.all([
      sb.from("journey").select("*").eq("user_id", uid).maybeSingle(),
      sb.from("journal").select("*").eq("user_id", uid).order("entry_date"),
      sb.from("prayers").select("*").eq("user_id", uid).order("created_date", { ascending: false }),
    ])
    if (!j) return null
    return {
      seenWelcome: Boolean(j.seen_welcome),
      selectedDoorId: (j.selected_door_id as string | null) ?? null,
      pathId: (j.path_id as string | null) ?? null,
      lessonsDone: Number(j.lessons_done ?? 0),
      doctrineDone: Number(j.doctrine_done ?? 0),
      lastLessonDate: (j.last_lesson_date as string | null) ?? null,
      prayerInviteSeen: Boolean(j.prayer_invite_seen),
      pathCompletedSeen: Boolean(j.path_completed_seen),
      courseProgress:
        j.course_progress &&
        typeof j.course_progress === "object" &&
        !Array.isArray(j.course_progress)
          ? Object.fromEntries(
              Object.entries(j.course_progress as Record<string, unknown>)
                .filter(([, lessonIds]) => Array.isArray(lessonIds))
                .map(([courseId, lessonIds]) => [
                  courseId,
                  (lessonIds as unknown[]).filter(
                    (lessonId): lessonId is string => typeof lessonId === "string",
                  ),
                ]),
            )
          : {},
      lessonResponses: {},
      lessonDrafts: {},
      journal: (jr ?? []).map((r) => ({
        lessonId: String(r.lesson_id),
        text: String(r.text),
        date: String(r.entry_date),
      })),
      prayers: (pr ?? []).map((r) => ({
        id: String(r.id),
        text: String(r.text),
        createdAt: String(r.created_date),
        answeredAt: (r.answered_date as string | null) ?? null,
        answerNote: (r.answer_note as string | undefined) ?? undefined,
      })),
    }
  } catch {
    return null
  }
}

export function cloudReady(): boolean {
  return ready
}

async function existingUser(): Promise<string | null> {
  const sb = getSupabase()
  if (!sb) return null
  if (userId) return userId
  try {
    const { data } = await sb.auth.getSession()
    if (!data.session?.user) return null
    userId = data.session.user.id
    ready = true
    return userId
  } catch {
    return null
  }
}

/** Șterge contul anonim/legat și toate datele Emanus prin cascade. */
export async function deleteCloudData(): Promise<boolean> {
  const sb = getSupabase()
  const uid = await existingUser()
  if (!sb || !uid) return true
  try {
    const { error: accountError } = await sb.rpc("delete_own_account")
    if (!accountError) {
      await sb.auth.signOut({ scope: "local" })
      userId = null
      ready = false
      return true
    }

    // Compatibilitate până când migrarea ajunge în proiectul Supabase.
    const results = await Promise.all([
      sb.from("journal").delete().eq("user_id", uid),
      sb.from("prayers").delete().eq("user_id", uid),
      sb.from("journey").delete().eq("user_id", uid),
    ])
    return results.every(({ error }) => !error)
  } catch {
    return false
  }
}

/**
 * Leagă un e-mail peste contul anonim, ca omul să-și regăsească drumul pe alt telefon.
 * Se oferă doar dacă cere el, niciodată ca poartă de intrare. Primește un link pe mail,
 * fără parolă de ținut minte.
 */
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
