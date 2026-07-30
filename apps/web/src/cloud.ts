import type { JourneyState } from "./journey"
import { getSupabase } from "./supabase"

/*
 * Sincronizarea cu Supabase. (pasul 6 din ordinea de fluxuri)
 *
 * REGULI:
 *  1. Nu se cere cont și nu se cere e-mail. Intrare anonimă, făcută tăcut, în fundal.
 *     Omul nu vede niciodată un ecran de "înregistrează-te ca să salvezi".
 *  2. Local rămâne sursa de adevăr pentru ecrane. Norul e doar copia de siguranță.
 *     Dacă rețeaua cade, aplicația nu se blochează și nu arată nicio eroare.
 *  3. La prima pornire pe un telefon nou, dacă local e gol și în nor există ceva,
 *     se aduce din nor. Altfel, localul învinge și se urcă.
 *  4. Nu se urcă nimic ce nu vede și omul: fără scoruri, fără evenimente, fără analitică.
 */

let userId: string | null = null
let ready = false

export function cloudEnabled(): boolean {
  return getSupabase() !== null
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

/** Urcă starea curentă. Se apelează după fiecare salvare locală; eșecul se ignoră. */
export async function pushState(s: JourneyState): Promise<void> {
  const sb = getSupabase()
  const uid = await ensureUser()
  if (!sb || !uid) return
  try {
    await sb.from("journey").upsert({
      user_id: uid,
      seen_welcome: s.seenWelcome,
      path_id: s.pathId,
      lessons_done: s.lessonsDone,
      doctrine_done: s.doctrineDone,
      last_lesson_date: s.lastLessonDate,
      prayer_invite_seen: s.prayerInviteSeen,
      path_completed_seen: s.pathCompletedSeen,
      updated_at: new Date().toISOString(),
    })

    if (s.journal.length > 0) {
      await sb.from("journal").upsert(
        s.journal.map((j) => ({
          user_id: uid,
          lesson_id: j.lessonId,
          text: j.text,
          entry_date: j.date,
          updated_at: new Date().toISOString(),
        })),
      )
    }

    if (s.prayers.length > 0) {
      await sb.from("prayers").upsert(
        s.prayers.map((p) => ({
          id: p.id,
          user_id: uid,
          text: p.text,
          created_date: p.createdAt,
          answered_date: p.answeredAt,
          answer_note: p.answerNote ?? null,
        })),
      )
    }
  } catch {
    /* rețea proastă — se reia la următoarea salvare */
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
      pathId: (j.path_id as string | null) ?? null,
      lessonsDone: Number(j.lessons_done ?? 0),
      doctrineDone: Number(j.doctrine_done ?? 0),
      lastLessonDate: (j.last_lesson_date as string | null) ?? null,
      prayerInviteSeen: Boolean(j.prayer_invite_seen),
      pathCompletedSeen: Boolean(j.path_completed_seen),
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
