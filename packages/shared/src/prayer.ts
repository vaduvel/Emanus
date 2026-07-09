// Antrenorul de rugăciune progresiv (docs/00-DIRECTIE §4) + baza Zidului Ebenezer (§5).

export type PrayerLevelId = 1 | 2 | 3 | 4 | 5

export interface PrayerLevel {
  id: PrayerLevelId
  title: string
  subtitle: string
  forWho: string
  intro: string
  /** Rânduri de completat (schela). Gol la nivelul 5 (rugăciune liberă). */
  prompts: string[]
}

export const PRAYER_LEVELS: PrayerLevel[] = [
  {
    id: 1,
    title: "Primele cuvinte",
    subtitle: "4 degete",
    forWho: "Copii, începători",
    intro:
      "Rugăciunea e o vorbă cu Dumnezeu, ca între prieteni. Începe cu 4 gânduri simple.",
    prompts: [
      "Îți mulțumesc pentru…",
      "Iartă-mă pentru…",
      "Te rog pentru…",
      "Te iubesc pentru că…",
    ],
  },
  {
    id: 2,
    title: "Structura",
    subtitle: "A.C.M.C.",
    forWho: "Adolescenți, adulți",
    intro:
      "Patru pași care țin rugăciunea echilibrată: Adorare · Căință · Mulțumire · Cerere.",
    prompts: [
      "Adorare — Doamne, Tu ești…",
      "Căință — Îmi pare rău pentru…",
      "Mulțumire — Îți mulțumesc pentru…",
      "Cerere — Te rog pentru…",
    ],
  },
  {
    id: 3,
    title: "Tiparul lui Isus",
    subtitle: "Tatăl nostru",
    forWho: "Toți",
    intro:
      "Chiar Isus ne-a învățat cum să ne rugăm. Ia fiecare frază și fă-o a ta.",
    prompts: [
      "Tatăl nostru care ești în ceruri — azi Te văd ca…",
      "Sfințească-se Numele Tău — Îți dau slavă pentru…",
      "Vie Împărăția Ta — predau Ție…",
      "Pâinea noastră cea de toate zilele — am nevoie de…",
      "Iartă-ne greșelile — iert și eu pe…",
      "Izbăvește-ne de cel rău — apără-mă de…",
    ],
  },
  {
    id: 4,
    title: "Completezi tu",
    subtitle: "cu cuvintele tale",
    forWho: "Cei ce prind curaj",
    intro: "Mai puțină schelă, mai multă inimă. Spune-I direct ce ai de spus.",
    prompts: ["Doamne, azi Îți mulțumesc pentru…", "…și Te rog pentru…"],
  },
  {
    id: 5,
    title: "Rugăciune liberă",
    subtitle: "din inima ta",
    forWho: "Ținta finală",
    intro: "Fără schelă. Doar tu și Dumnezeu. Spune-I tot ce e pe inima ta.",
    prompts: [],
  },
]

export function getPrayerLevel(id: number): PrayerLevel {
  return PRAYER_LEVELS.find((l) => l.id === id) ?? PRAYER_LEVELS[0]
}

/** Nivel sugerat de pornire după categoria de vârstă (docs/00-DIRECTIE §4). */
export function suggestedPrayerLevel(categoryId?: string): PrayerLevelId {
  if (categoryId === "kids0_5" || categoryId === "kids6_11") return 1
  return 2
}

// --- Zidul de aducere-aminte (Ebenezer) — 1 Samuel 7:12 (docs/00-DIRECTIE §5) ---

export interface PrayerRequest {
  id: string
  userId: string
  text: string
  createdAt: string
  answered: boolean
  answeredAt?: string
  answerNote?: string
}

export const EBENEZER_VERSE = {
  text: "Până aici Domnul ne-a ajutat.",
  ref: "1 Samuel 7:12",
}
