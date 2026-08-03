import { ensureCloudUser } from "./cloudSession"
import { getSupabase } from "./supabase"
import type { BibleQuestionStatus } from "./biblePersonal"

export type BibleStaffRole = "pastoral" | "admin"

export interface InboxQuestion {
  id: string
  userId: string
  question: string
  sourceRef: string | null
  bookId: string | null
  chapter: number | null
  unitId: string | null
  status: BibleQuestionStatus
  answer: string | null
  createdAt: string
  updatedAt: string
}

function mapQuestion(row: Record<string, unknown>): InboxQuestion {
  return {
    id: String(row.id),
    userId: String(row.user_id),
    question: String(row.question),
    sourceRef: row.source_ref ? String(row.source_ref) : null,
    bookId: row.book_id ? String(row.book_id) : null,
    chapter: row.chapter_number ? Number(row.chapter_number) : null,
    unitId: row.unit_id ? String(row.unit_id) : null,
    status: String(row.status) as BibleQuestionStatus,
    answer: row.answer ? String(row.answer) : null,
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  }
}

export async function getBibleStaffRole(): Promise<BibleStaffRole | null> {
  const supabase = getSupabase()
  const user = await ensureCloudUser()
  if (!supabase || !user) return null
  const { data, error } = await supabase.from("app_roles").select("role").eq("user_id", user.id).maybeSingle()
  if (error || !data) return null
  const role = String(data.role)
  return role === "pastoral" || role === "admin" ? role : null
}

export async function loadBibleQuestionInbox(includeClosed = false): Promise<InboxQuestion[]> {
  const supabase = getSupabase()
  const role = await getBibleStaffRole()
  if (!supabase || !role) throw new Error("Acest cont nu are acces pastoral.")
  let query = supabase.from("bible_questions").select("*").order("created_at", { ascending: true }).limit(100)
  if (!includeClosed) query = query.in("status", ["queued", "in_review"])
  const { data, error } = await query
  if (error) throw error
  return (data ?? []).map((row) => mapQuestion(row as Record<string, unknown>))
}

export async function answerBibleQuestion(
  questionId: string,
  status: "in_review" | "answered" | "closed",
  answer?: string,
): Promise<InboxQuestion> {
  const supabase = getSupabase()
  if (!supabase) throw new Error("Supabase nu este configurat.")
  const { data, error } = await supabase.rpc("answer_bible_question", {
    p_question_id: questionId,
    p_status: status,
    p_answer: answer?.trim() || null,
  })
  if (error) throw error
  const row = Array.isArray(data) ? data[0] : data
  if (!row) throw new Error("Întrebarea nu mai există.")
  return mapQuestion(row as Record<string, unknown>)
}
