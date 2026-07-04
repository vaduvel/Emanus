// Moderare automată + protocol de criză (workbook §15, §18). Motor pur, testabil.
// Listele de cuvinte sunt un start MVP — de înlocuit/completat cu un serviciu dedicat.

export interface CrisisResource {
  label: string
  phone: string
  note: string
}

// Resurse de criză în România (workbook §15).
export const CRISIS_RESOURCES: CrisisResource[] = [
  { label: "Urgențe", phone: "112", note: "Pericol imediat, non-stop." },
  {
    label: "Telefonul Copilului",
    phone: "116 111",
    note: "Gratuit, confidențial, non-stop — pentru copii și adolescenți.",
  },
  {
    label: "Sprijin emoțional (anti-suicid)",
    phone: "116 123",
    note: "Linie gratuită de sprijin emoțional.",
  },
]

export type ModerationDecision = "visible" | "pending" | "removed"

export interface ModerationResult {
  decision: ModerationDecision
  crisis: boolean
  reasons: string[]
}

// Normalizează: minuscule + fără diacritice, ca să prindă și scrierea fără semne.
function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
}

// Semnale de criză (autovătămare / suicid / abuz). Normalizate (fără diacritice).
const CRISIS_SIGNALS = [
  "vreau sa mor",
  "vreau sa dispar",
  "nu mai vreau sa traiesc",
  "nu vreau sa traiesc",
  "ma omor",
  "o sa ma omor",
  "ma sinucid",
  "sa ma sinucid",
  "sinucid",
  "sinuciga",
  "ma tai",
  "ma taiat",
  "autovatamare",
  "self harm",
  "selfharm",
  "ma bate",
  "sunt abuzat",
  "abuz sexual",
  "ma violeaza",
  "viol",
]

// Ură / insulte grave -> eliminare.
const HATE = ["jidan", "bozgor", "cioara imputita", "muie la"]

// Vulgaritate -> verificare umană (pending).
const PROFANITY = ["pula", "pizda", "muie", "cacat", "futu", "fut ", "cur "]

function hasAny(text: string, list: string[]): boolean {
  return list.some((k) => text.includes(k))
}

export function moderatePost(body: string): ModerationResult {
  const text = normalize(body)
  const reasons: string[] = []

  const crisis = hasAny(text, CRISIS_SIGNALS)
  if (crisis) reasons.push("crisis")

  const hate = hasAny(text, HATE)
  if (hate) reasons.push("hate")

  const profanity = hasAny(text, PROFANITY)
  if (profanity) reasons.push("profanity")

  let decision: ModerationDecision = "visible"
  if (hate) decision = "removed"
  else if (crisis)
    decision = "pending" // nu publica imediat; oferă sprijin + semnalează pentru om
  else if (profanity) decision = "pending"

  return { decision, crisis, reasons }
}
