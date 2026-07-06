// „Creșterea mea” — al doilea onboarding profund (docs/00-DIRECTIE).
// Utilizatorul scrie liber ce îl frământă; motăm textul pe cele 6 axe de creștere
// și extragem un profil de nevoi care alimentează conținut adaptiv.
// Clasificator simplu bazat pe cuvinte-cheie (fără ML) — rulează și offline, e explicabil.
import type { GrowthAxisId } from "./domain.js"
import { GROWTH_AXES } from "./domain.js"

export const GROWTH_AXIS_LABELS_RO: Record<GrowthAxisId, string> = {
  identity: "Identitate",
  emotional_peace: "Pace",
  relationships: "Relații",
  living_faith: "Credință",
  character: "Caracter",
  freedom: "Libertate",
}

export interface NeedTag {
  id: string
  label: string
  axis: GrowthAxisId
  /** Cuvinte-cheie normalizate (fără diacritice, litere mici, rădăcini scurte). */
  keywords: string[]
}

export interface DetectedNeed {
  id: string
  label: string
  axis: GrowthAxisId
  score: number
}

export interface NeedProfile {
  text: string
  axisScores: Record<GrowthAxisId, number>
  topAxes: GrowthAxisId[]
  needs: DetectedNeed[]
  primaryAxis: GrowthAxisId | null
}

// Taxonomia de nevoi ancorată în cele 6 axe. Cheile sunt rădăcini normalizate,
// ca să prindă variante („anxios”, „anxietate” prin „anxi”).
export const NEED_TAXONOMY: NeedTag[] = [
  // --- Identitate ---
  {
    id: "self_worth",
    label: "Valoare și stimă de sine",
    axis: "identity",
    keywords: ["valoare", "stima", "increder", "nu valor", "bun de nimic", "respect de sine", "nu ma simt bun"],
  },
  {
    id: "identity_confusion",
    label: "Cine sunt eu",
    axis: "identity",
    keywords: ["cine sunt", "identitate", "nu stiu cine", "cine sunt eu"],
  },
  {
    id: "shame",
    label: "Rușine și vinovăție",
    axis: "identity",
    keywords: ["rusine", "vinovat", "vinovati", "ma simt vinovat", "regret"],
  },
  {
    id: "comparison",
    label: "Comparație și invidie",
    axis: "identity",
    keywords: ["ma compar", "comparati", "invidi", "gelos", "altii sunt mai"],
  },
  // --- Pace ---
  {
    id: "anxiety",
    label: "Anxietate și îngrijorare",
    axis: "emotional_peace",
    keywords: ["anxi", "ingrijor", "griji", "stres", "tensiune", "nu am liniste", "agitat"],
  },
  {
    id: "fear",
    label: "Frică și panică",
    axis: "emotional_peace",
    keywords: ["fric", "team", "panic", "spaim"],
  },
  {
    id: "sadness",
    label: "Tristețe și descurajare",
    axis: "emotional_peace",
    keywords: ["trist", "descuraj", "deprim", "depres", "fara speranta", "plang", "gol pe dinauntru"],
  },
  {
    id: "loneliness",
    label: "Singurătate",
    axis: "emotional_peace",
    keywords: ["singur", "insingur", "izolat", "nimeni langa mine"],
  },
  // --- Relații ---
  {
    id: "marriage",
    label: "Căsnicie / soț-soție",
    axis: "relationships",
    keywords: ["casnic", "sotul", "sotia", "sot ", "sotie", "casator", "partener", "cuplu", "divort"],
  },
  {
    id: "parenting",
    label: "Creșterea copiilor",
    axis: "relationships",
    keywords: ["copil", "copii", "parinte", "adolescentul meu", "fiul meu", "fiica mea"],
  },
  {
    id: "conflict",
    label: "Conflicte",
    axis: "relationships",
    keywords: ["cearta", "conflict", "ne certam", "nu ne intelegem", "tensiuni cu"],
  },
  {
    id: "forgiveness",
    label: "Iertare",
    axis: "relationships",
    keywords: ["iert", "nu pot ierta", "ranit de", "resentiment"],
  },
  {
    id: "friendship",
    label: "Prietenii și apartenență",
    axis: "relationships",
    keywords: ["prieten", "apartenen", "relatii cu ceilalti", "sa fac parte"],
  },
  // --- Credință ---
  {
    id: "doubt",
    label: "Îndoială",
    axis: "living_faith",
    keywords: ["indoial", "dubi", "ma indoiesc", "exista dumnezeu", "nu stiu daca cred"],
  },
  {
    id: "prayer_life",
    label: "Viața de rugăciune",
    axis: "living_faith",
    keywords: ["rugaciun", "sa ma rog", "nu stiu sa ma rog", "legatura cu dumnezeu"],
  },
  {
    id: "bible",
    label: "Înțelegerea Bibliei",
    axis: "living_faith",
    keywords: ["bibli", "scriptur", "cuvantul lui dumnezeu"],
  },
  {
    id: "purpose",
    label: "Sens și scop",
    axis: "living_faith",
    keywords: ["sens", "scop", "rost", "de ce traiesc", "chemare", "planul lui dumnezeu"],
  },
  // --- Caracter ---
  {
    id: "anger",
    label: "Mânie",
    axis: "character",
    keywords: ["manie", "furie", "furios", "nervos", "ma enervez", "izbucnesc"],
  },
  {
    id: "patience",
    label: "Răbdare",
    axis: "character",
    keywords: ["rabdare", "nerabdator", "impulsiv"],
  },
  {
    id: "pride",
    label: "Mândrie și egoism",
    axis: "character",
    keywords: ["mandri", "orgoli", "egoism", "egoist"],
  },
  {
    id: "discipline",
    label: "Disciplină și obiceiuri bune",
    axis: "character",
    keywords: ["disciplin", "amanare", "procrastin", "lene", "nu am vointa"],
  },
  // --- Libertate ---
  {
    id: "addiction",
    label: "Dependențe",
    axis: "freedom",
    keywords: ["dependent", "adict", "pornograf", "porno", "alcool", "droguri", "jocuri de noroc", "fumat", "robie"],
  },
  {
    id: "screens",
    label: "Timp pe ecrane / telefon",
    axis: "freedom",
    keywords: ["telefon", "ecran", "social media", "scrolling", "prea mult timp pe"],
  },
  {
    id: "temptation",
    label: "Ispită și păcat repetat",
    axis: "freedom",
    keywords: ["ispit", "tentat", "pacat repetat", "recad", "cad mereu"],
  },
]

/** Normalizează textul: litere mici, fără diacritice, doar litere/cifre/spații. */
export function normalizeGrowthText(input: string): string {
  return input
    .toLowerCase()
    .replace(/ș|ş/g, "s")
    .replace(/ț|ţ/g, "t")
    .replace(/ă|â/g, "a")
    .replace(/î/g, "i")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function countOccurrences(haystack: string, needle: string): number {
  if (!needle) return 0
  let count = 0
  let idx = haystack.indexOf(needle)
  while (idx !== -1) {
    count += 1
    idx = haystack.indexOf(needle, idx + needle.length)
  }
  return count
}

/** Analizează textul liber și întoarce profilul de nevoi (axe + etichete detectate). */
export function analyzeGrowthText(text: string): NeedProfile {
  const haystack = ` ${normalizeGrowthText(text)} `
  const axisScores = Object.fromEntries(GROWTH_AXES.map((a) => [a, 0])) as Record<
    GrowthAxisId,
    number
  >
  const needs: DetectedNeed[] = []
  for (const tag of NEED_TAXONOMY) {
    let score = 0
    for (const kw of tag.keywords) score += countOccurrences(haystack, kw)
    if (score > 0) {
      needs.push({ id: tag.id, label: tag.label, axis: tag.axis, score })
      axisScores[tag.axis] += score
    }
  }
  needs.sort((a, b) => b.score - a.score)
  const topAxes = [...GROWTH_AXES]
    .filter((a) => axisScores[a] > 0)
    .sort((a, b) => axisScores[b] - axisScores[a])
  return {
    text: text.trim(),
    axisScores,
    topAxes,
    needs,
    primaryAxis: topAxes[0] ?? null,
  }
}
