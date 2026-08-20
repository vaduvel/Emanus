import type { JourneyState } from "./journey"
import { DOCTRINE_LESSONS } from "@emanus/shared/paths"
import { getSupabase } from "./supabase"

/*
 * Sincronizarea opțională cu Supabase.
 *
 * REGULI:
 *  1. Local rămâne sursa de adevăr pentru ecrane.
 *  2. Nicio sesiune anonimă și nicio încărcare nu pornesc fără consimțământul
 *     explicit dat în ecranul Profil.
 *  3. Dacă rețeaua cade, aplicația locală nu se blochează.
 *  4. Nu se urcă nimic ce nu vede omul: fără scoruri, evenimente sau analitică.
 *
 * DRUMUL EMAUS ȘI NORUL:
 *
 * Schema curentă păstrează și ușa, istoricul Emaus și ID-urile globale de doctrină.
 * `supabase/schema.sql` conține upgrade-uri idempotente pentru instalațiile existente.
 *
 * LECȚIE, ca să nu se repete: `JourneyState` se construiește în DOUĂ locuri — `EMPTY`
 * în `journey.ts` și rândul citit aici. Cine adaugă un câmp obligatoriu trebuie să treacă
 * pe la amândouă.
 */

let userId: string | null = null
let ready = false
const BACKUP_CONSENT_KEY = "emanus.backup.consent.v1"

export type CloudBackupStatus = "unavailable" | "on_device" | "connecting" | "cloud"

export function cloudEnabled(): boolean {
  return getSupabase() !== null
}

/** Configurarea Supabase nu este consimțământ. Acesta este singurul gate de backup. */
export function cloudBackupEnabled(): boolean {
  if (!cloudEnabled()) return false
  try {
    return localStorage.getItem(BACKUP_CONSENT_KEY) === "enabled"
  } catch {
    return false
  }
}

export function cloudBackupStatus(): CloudBackupStatus {
  if (!cloudEnabled()) return "unavailable"
  if (!cloudBackupEnabled()) return "on_device"
  return ready ? "cloud" : "connecting"
}

/** Persistă alegerea. Dacă localStorage este blocat, backup-ul nu poate fi activat. */
export function setCloudBackupConsent(enabled: boolean): boolean {
  try {
    if (enabled) localStorage.setItem(BACKUP_CONSENT_KEY, "enabled")
    else localStorage.removeItem(BACKUP_CONSENT_KEY)
    if (!enabled) ready = false
    return cloudBackupEnabled() === enabled
  } catch {
    return false
  }
}

/** Intrare anonimă. Returnează id-ul sau null dacă nu se poate (offline, neconfigurat). */
async function ensureUser(): Promise<string | null> {
  if (!cloudBackupEnabled()) return null
  const sb = getSupabase()
  if (!sb) return null
  if (userId) return userId
  try {
    const { data } = await sb.auth.getSession()
    if (data.session?.user) {
      userId = data.session.user.id
      return userId
    }
    const { data: anon, error } = await sb.auth.signInAnonymously()
    if (error || !anon.user) return null
    userId = anon.user.id
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

/** Urcă starea curentă numai după consimțământ explicit. */
export async function pushState(s: JourneyState): Promise<boolean> {
  if (!cloudBackupEnabled()) return false
  const sb = getSupabase()
  const uid = await ensureUser()
  if (!sb || !uid) return false
  try {
    const baseRow = {
      user_id: uid,
      seen_welcome: s.seenWelcome,
      path_id: s.pathId,
      lessons_done: s.lessonsDone,
      doctrine_done: s.completedDoctrineLessonIds.length,
      last_lesson_date: s.lastLessonDate,
      prayer_invite_seen: s.prayerInviteSeen,
      path_completed_seen: s.pathCompletedSeen,
      updated_at: new Date().toISOString(),
    }
    const { error: journeyError } = await sb.from("journey").upsert({
      ...baseRow,
      door_id: s.doorId,
      completed_doctrine_lesson_ids: s.completedDoctrineLessonIds,
      completed_lesson_ids: s.completedLessonIds,
      emmaus_max_station: s.emmausMaxStation,
      emmaus_station_seen_at: s.emmausStationSeenAt,
      cross_visited_at: s.crossVisitedAt,
      schema_version: s.schemaVersion,
    })
    // O instalare nemigrată continuă să sincronizeze starea veche; următoarea
    // salvare va urca și câmpurile noi după aplicarea migrării SQL.
    if (journeyError) {
      const { error: legacyError } = await sb.from("journey").upsert(baseRow)
      if (legacyError) {
        ready = false
        return false
      }
    }

    if (!(await deleteStaleRows("journal", "lesson_id", s.journal.map((entry) => entry.lessonId), uid))) {
      ready = false
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
      if (error) {
        ready = false
        return false
      }
    }

    if (!(await deleteStaleRows("prayers", "id", s.prayers.map((prayer) => prayer.id), uid))) {
      ready = false
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
      if (error) {
        ready = false
        return false
      }
    }
    ready = true
    return true
  } catch {
    ready = false
    return false
  }
}

/** Aduce starea din nor. Returnează null dacă nu există nimic salvat. */
export async function pullState(): Promise<JourneyState | null> {
  if (!cloudBackupEnabled()) return null
  const sb = getSupabase()
  const uid = await ensureUser()
  if (!sb || !uid) return null
  try {
    const [journeyResult, journalResult, prayersResult] = await Promise.all([
      sb.from("journey").select("*").eq("user_id", uid).maybeSingle(),
      sb.from("journal").select("*").eq("user_id", uid).order("entry_date"),
      sb.from("prayers").select("*").eq("user_id", uid).order("created_date", { ascending: false }),
    ])
    if (journeyResult.error || journalResult.error || prayersResult.error) {
      ready = false
      return null
    }
    ready = true
    const j = journeyResult.data
    const jr = journalResult.data
    const pr = prayersResult.data
    if (!j) return null

    /*
     * Rândul se citește ca valoare netipizată, nu ca `JourneyState`. Coloanele Emaus pot
     * lipsi cu totul (tabela nu e migrată încă), iar o coloană absentă vine `undefined`.
     * Aici se decide o singură dată ce înseamnă "lipsă", ca ecranele să primească mereu
     * forma întreagă.
     */
    const row = j as Record<string, unknown>
    const legacyDoctrineCount = Number(row.doctrine_done ?? 0)
    const legacyDoctrineLessonIds = Number.isFinite(legacyDoctrineCount)
      ? DOCTRINE_LESSONS
        .slice(0, Math.max(0, Math.floor(legacyDoctrineCount)))
        .map((lesson) => lesson.id)
      : []
    const storedDoctrineLessonIds = Array.isArray(row.completed_doctrine_lesson_ids)
      ? row.completed_doctrine_lesson_ids.map(String)
      : null

    return {
      schemaVersion: 2,
      seenWelcome: Boolean(j.seen_welcome),
      pathId: (j.path_id as string | null) ?? null,
      doorId: typeof row.door_id === "string" ? row.door_id : null,
      lessonsDone: Number(j.lessons_done ?? 0),
      completedDoctrineLessonIds:
        storedDoctrineLessonIds && (storedDoctrineLessonIds.length > 0 || legacyDoctrineLessonIds.length === 0)
          ? storedDoctrineLessonIds
          : legacyDoctrineLessonIds,
      lastLessonDate: (j.last_lesson_date as string | null) ?? null,
      prayerInviteSeen: Boolean(j.prayer_invite_seen),
      pathCompletedSeen: Boolean(j.path_completed_seen),
      completedLessonIds: Array.isArray(row.completed_lesson_ids)
        ? row.completed_lesson_ids.map((id) => String(id))
        : [],
      emmausMaxStation:
        typeof row.emmaus_max_station === "number" && row.emmaus_max_station >= 1
          ? row.emmaus_max_station
          : 1,
      emmausStationSeenAt:
        typeof row.emmaus_station_seen_at === "object" && row.emmaus_station_seen_at !== null
          ? (row.emmaus_station_seen_at as Record<string, string>)
          : {},
      crossVisitedAt: typeof row.cross_visited_at === "string" ? row.cross_visited_at : null,
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
    ready = false
    return null
  }
}

export function cloudReady(): boolean {
  return cloudBackupEnabled() && ready
}

export function markCloudReady(): void {
  if (cloudBackupEnabled()) ready = true
}

async function existingUser(): Promise<string | null> {
  const sb = getSupabase()
  if (!sb) return null
  try {
    const { data } = await sb.auth.getSession()
    if (!data.session?.user) {
      userId = null
      return null
    }
    userId = data.session.user.id
    return userId
  } catch {
    return null
  }
}

/** Șterge explicit identitatea curentă; nu creează niciodată un utilizator. */
export async function deleteCloudData(): Promise<boolean> {
  const sb = getSupabase()
  if (!sb) return true
  const uid = await existingUser()
  if (!uid) return true
  try {
    const { error } = await sb.rpc("delete_own_account")
    if (error) {
      ready = false
      return false
    }
    try {
      await sb.auth.signOut({ scope: "local" })
    } catch {
      // Contul și datele remote sunt deja șterse; curățarea Emanus poate continua.
    }
    userId = null
    ready = false
    return true
  } catch {
    ready = false
    return false
  }
}

/**
 * Leagă un e-mail peste contul anonim, ca omul să-și regăsească drumul pe alt telefon.
 * Se oferă doar dacă cere el, niciodată ca poartă de intrare. Primește un link pe mail,
 * fără parolă de ținut minte.
 */
export async function linkEmail(email: string): Promise<boolean> {
  if (!cloudBackupEnabled()) return false
  const sb = getSupabase()
  const uid = await ensureUser()
  if (!sb || !uid) return false
  try {
    const { error } = await sb.auth.updateUser({ email: email.trim() })
    return !error
  } catch {
    return false
  }
}
