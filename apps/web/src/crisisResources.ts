import {
  CRISIS_INTENTS,
  SAFETY_RESOURCES,
  type CrisisIntent,
  type CrisisResource,
} from "@emanus/shared/safety-resources"

export type { CrisisIntent } from "@emanus/shared/safety-resources"

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

const DRUG_EMERGENCY_PATTERNS = [
  /\bsupradoz(?:a|at|ata)?\b/,
  /\boverdose\b/,
  /\bam luat prea multe pastile\b/,
]

export function detectCrisisIntents(input: string): CrisisIntent[] {
  const value = normalize(input)
  const intents: CrisisIntent[] = []

  if (matchesAny(value, SUICIDE_PATTERNS)) intents.push("suicide")

  const violence = matchesAny(value, VIOLENCE_PATTERNS)
  const child = matchesAny(value, CHILD_PATTERNS)
  if (child && violence) intents.push("child")
  if (violence) intents.push("violence")
  if (matchesAny(value, DRUG_EMERGENCY_PATTERNS)) intents.push("drugs")

  return intents
}

export function parseCrisisIntents(value: string | null): CrisisIntent[] {
  if (!value) return []
  const allowed = new Set<CrisisIntent>(CRISIS_INTENTS)
  return [...new Set(value.split(",").filter((item): item is CrisisIntent => allowed.has(item as CrisisIntent)))]
}

export function crisisPath(intents: CrisisIntent[]): string {
  const query = intents.length > 0 ? "?motiv=" + encodeURIComponent(intents.join(",")) : ""
  return "/criza" + query
}

export function crisisResourcesFor(intents: CrisisIntent[]): CrisisResource[] {
  if (intents.length === 0) return SAFETY_RESOURCES
  return SAFETY_RESOURCES.filter(
    (resource) => resource.id === "112" || resource.intents.some((intent) => intents.includes(intent)),
  )
}
