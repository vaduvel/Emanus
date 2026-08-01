export type CrisisIntent = "suicide" | "violence" | "child"

export interface CrisisResource {
  id: string
  intents: CrisisIntent[]
  dial: string
  display: string
  label: string
  availability: string
  note: string
  sourceLabel: string
  sourceUrl: string
  email?: string
}

const ALL_INTENTS: CrisisIntent[] = ["suicide", "violence", "child"]

export const CRISIS_RESOURCES: CrisisResource[] = [
  {
    id: "112",
    intents: ALL_INTENTS,
    dial: "112",
    display: "112",
    label: "Urgențe: ambulanță și poliție",
    availability: "Non-stop și gratuit",
    note: "Sună acum dacă viața ta sau a altcuiva este în pericol imediat.",
    sourceLabel: "Serviciul de Telecomunicații Speciale",
    sourceUrl: "https://www.112.ro/",
  },
  {
    id: "antisuicid",
    intents: ["suicide"],
    dial: "0800801200",
    display: "0800 801 200",
    label: "TelVerde Antisuicid",
    availability: "Vineri–duminică, 16:00–04:00",
    note: "Sprijin pentru adulți. În afara programului sau la pericol imediat, sună la 112.",
    email: "sos@antisuicid.ro",
    sourceLabel: "Findahelpline, verificat de linie",
    sourceUrl: "https://findahelpline.com/organizations/telverde-antisuicid?expand=true",
  },
  {
    id: "119",
    intents: ["child"],
    dial: "119",
    display: "119",
    label: "Numărul unic național pentru copii",
    availability: "Apel gratuit",
    note: "Pentru sesizarea abuzului, neglijării, exploatării sau violenței asupra unui copil.",
    sourceLabel: "Catalogul serviciilor publice",
    sourceUrl: "https://serviciipublice.gov.ro/serviciu/numarul-unic-national-pentru-copii-119",
  },
  {
    id: "116111",
    intents: ["child"],
    dial: "116111",
    display: "116 111",
    label: "Telefonul Copilului",
    availability: "Luni–vineri, 08:00–20:00",
    note: "Consiliere gratuită pentru copii și adolescenți.",
    sourceLabel: "Asociația Telefonul Copilului",
    sourceUrl: "https://bedrugfree.116111.ro/cum-te-ajutam/",
  },
  {
    id: "anes",
    intents: ["violence"],
    dial: "0800500333",
    display: "0800 500 333",
    label: "Linie națională pentru violență domestică",
    availability: "Non-stop și gratuit",
    note: "Sprijin pentru violență domestică, trafic de persoane și discriminare pe criteriul de sex.",
    sourceLabel: "Agenția Națională pentru Egalitatea de Șanse",
    sourceUrl: "https://anes.gov.ro/call-center/",
  },
]

function normalize(value: string): string {
  return value.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase()
}

function matchesAny(value: string, patterns: RegExp[]): boolean {
  return patterns.some((pattern) => pattern.test(value))
}

const SUICIDE_PATTERNS = [
  /\b(?:ma|m-?as) sinucid\b/,
  /\bsinucidere\b/,
  /\bsuicid(?:ar|ara|ez)?\b/,
  /\bvreau sa mor\b/,
  /\bnu mai vreau sa traiesc\b/,
  /\bma omor\b/,
  /\bimi fac rau\b/,
  /\bsa imi fac rau\b/,
  /\bsa-mi fac rau\b/,
  /\bautovatam(?:are|ez)?\b/,
]

const VIOLENCE_PATTERNS = [
  /\bma bate\b/,
  /\bm-a batut\b/,
  /\bma loveste\b/,
  /\bm-a lovit\b/,
  /\bma ameninta\b/,
  /\bviolenta\b/,
  /\bviol(?:at|ata|eaza)\b/,
  /\bagres(?:at|ata|eaza|iune)\b/,
  /\babuz(?:at|ata|eaza)?\b/,
  /\btrafic de persoane\b/,
]

const CHILD_PATTERNS = [
  /\b(?:un|o|acest|acel) copil\b/,
  /\bcopilul\b/,
  /\bminor(?:a|ul)?\b/,
  /\badolescent(?:a|ul)?\b/,
  /\btata ma bate\b/,
  /\bmama ma bate\b/,
  /\bparintii ma bat\b/,
]

export function detectCrisisIntents(input: string): CrisisIntent[] {
  const value = normalize(input)
  const intents: CrisisIntent[] = []

  if (matchesAny(value, SUICIDE_PATTERNS)) intents.push("suicide")

  const violence = matchesAny(value, VIOLENCE_PATTERNS)
  const child = matchesAny(value, CHILD_PATTERNS)
  if (child && violence) intents.push("child")
  if (violence) intents.push("violence")

  return intents
}

export function parseCrisisIntents(value: string | null): CrisisIntent[] {
  if (!value) return []
  const allowed = new Set<CrisisIntent>(ALL_INTENTS)
  return [...new Set(value.split(",").filter((item): item is CrisisIntent => allowed.has(item as CrisisIntent)))]
}

export function crisisPath(intents: CrisisIntent[]): string {
  const query = intents.length > 0 ? "?motiv=" + encodeURIComponent(intents.join(",")) : ""
  return "/criza" + query
}

export function crisisResourcesFor(intents: CrisisIntent[]): CrisisResource[] {
  if (intents.length === 0) return CRISIS_RESOURCES
  return CRISIS_RESOURCES.filter(
    (resource) => resource.id === "112" || resource.intents.some((intent) => intents.includes(intent)),
  )
}
