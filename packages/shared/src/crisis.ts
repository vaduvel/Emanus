export type CrisisResourceId =
  | "emergency"
  | "child_protection"
  | "child_helpline"
  | "emotional_support"
  | "domestic_violence"

export interface CrisisResource {
  id: CrisisResourceId
  label: string
  phone: string
  availability: string
  note: string
}

/**
 * Resurse verificate pentru România.
 *
 * Numerele se țin într-un singur loc. Nu adăugăm un număr într-o lecție până
 * când nu poate fi confirmat dintr-o sursă oficială. Pentru dependențe, Emanus
 * recomandă medicul de familie / serviciile locale și 112 în pericol imediat;
 * nu afișează un TelVerde neconfirmat.
 */
export const CRISIS_RESOURCES: CrisisResource[] = [
  {
    id: "emergency",
    label: "Urgență și pericol imediat",
    phone: "112",
    availability: "24/7",
    note: "Sună acum dacă tu sau altcineva sunteți în pericol imediat.",
  },
  {
    id: "child_protection",
    label: "Abuz, neglijare sau violență asupra unui copil",
    phone: "119",
    availability: "24/7",
    note: "Numărul național pentru raportarea situațiilor care privesc un copil.",
  },
  {
    id: "child_helpline",
    label: "Telefonul Copilului",
    phone: "116 111",
    availability: "Luni–vineri, 10:00–20:00",
    note: "Linie gratuită pentru copii și adolescenți. În pericol imediat: 112 sau 119.",
  },
  {
    id: "emotional_support",
    label: "Sprijin emoțional",
    phone: "116 123",
    availability: "Conform disponibilității serviciului",
    note: "Număr armonizat pentru sprijin psihologic și emoțional. În pericol imediat: 112.",
  },
  {
    id: "domestic_violence",
    label: "Violență domestică, trafic de persoane și discriminare",
    phone: "0800 500 333",
    availability: "24/7",
    note: "Linie națională gratuită. În pericol imediat: 112.",
  },
]

export function getCrisisResource(id: CrisisResourceId): CrisisResource {
  const found = CRISIS_RESOURCES.find((resource) => resource.id === id)
  if (!found) throw new Error(`Resursa de criză nu există: ${id}`)
  return found
}

export function crisisResources(ids?: CrisisResourceId[]): CrisisResource[] {
  if (!ids) return [...CRISIS_RESOURCES]
  const wanted = new Set(ids)
  return CRISIS_RESOURCES.filter((resource) => wanted.has(resource.id))
}
