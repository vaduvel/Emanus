// Vocabularul unic al stărilor (docs/41).
//
// Aplicația avea DOUĂ liste ale durerii care nu se vorbeau între ele: cele 7
// stări din check-in și cele 14 uși din „Când te doare, citește”. Aici este una
// singură. Același `NeedId` alege pergamentul, pornește căutarea în Biblia
// explicată și stă la check-in.
//
// Cele 7 identificatoare vechi (`MessageMood`) sunt păstrate NESCHIMBATE, ca să
// nu se rupă ce e salvat deja în telefonul omului (`emanus.daruri.v1`) și ca
// `scroll.ts` să meargă mai departe fără mutare de date.

/** Ce fel de stare este: durere care doare acum, sau stare de drum. */
export type NeedKind = "durere" | "stare"

export type NeedId =
  // cele 7 vechi, cu id-urile neatinse
  | "obosit"
  | "speriat"
  | "vinovat"
  | "in_asteptare"
  | "singur"
  | "recunoscator"
  | "fara_directie"
  // cele 13 aduse din ușile „Când te doare, citește”
  | "doliu"
  | "boala"
  | "casa_rupta"
  | "bani"
  | "departe"
  | "patima_bautura"
  | "pofta"
  | "neiertare"
  | "frica_moarte"
  | "rugaciune_fara_raspuns"
  | "de_ce"
  | "ocult"
  | "copil_departat"

export interface Need {
  id: NeedId
  /** Cum îi spunem omului. Prima persoană, fără cuvinte de specialitate. */
  label: string
  kind: NeedKind
  /** Se arată din prima la check-in, fără să apese „altceva mă apasă”. */
  showAtCheckin: boolean
  /** Câte carduri ar trebui să aibă starea aceasta (docs/41 §1). */
  target: number
  /**
   * Sub cardul acestor stări stă și rândul către /criza și numerele de ajutor
   * (docs/22-siguranta). Un pergament scurt nu ține loc de om viu.
   */
  needsCrisisLine?: boolean
}

export const NEEDS: Need[] = [
  { id: "obosit", label: "sunt obosit, nu mai pot", kind: "stare", showAtCheckin: true, target: 20 },
  { id: "speriat", label: "mi-e frică de ce vine", kind: "durere", showAtCheckin: true, target: 18 },
  { id: "singur", label: "sunt singur", kind: "durere", showAtCheckin: true, target: 18 },
  { id: "vinovat", label: "mi-e rușine de ce am făcut", kind: "durere", showAtCheckin: true, target: 16 },
  { id: "fara_directie", label: "nu știu încotro", kind: "stare", showAtCheckin: true, target: 14 },
  { id: "in_asteptare", label: "aștept ceva și întârzie", kind: "stare", showAtCheckin: true, target: 12 },
  { id: "recunoscator", label: "vreau să mulțumesc", kind: "stare", showAtCheckin: true, target: 10 },
  { id: "doliu", label: "mi-a murit cineva", kind: "durere", showAtCheckin: true, target: 12 },
  { id: "neiertare", label: "nu pot să iert în familie", kind: "durere", showAtCheckin: false, target: 12 },
  { id: "boala", label: "boală și spital", kind: "durere", showAtCheckin: false, target: 10 },
  { id: "casa_rupta", label: "s-a rupt casa mea", kind: "durere", showAtCheckin: false, target: 10 },
  { id: "copil_departat", label: "copilul meu s-a depărtat", kind: "durere", showAtCheckin: false, target: 10 },
  { id: "de_ce", label: "de ce a îngăduit Dumnezeu", kind: "durere", showAtCheckin: false, target: 10 },
  {
    id: "rugaciune_fara_raspuns",
    label: "mă rog și nu simt nimic",
    kind: "durere",
    showAtCheckin: false,
    target: 10,
  },
  { id: "bani", label: "bani și datorii", kind: "durere", showAtCheckin: false, target: 8 },
  { id: "departe", label: "sunt departe de ai mei", kind: "durere", showAtCheckin: false, target: 8 },
  {
    id: "patima_bautura",
    label: "beau și nu mă pot opri",
    kind: "durere",
    showAtCheckin: false,
    target: 8,
    needsCrisisLine: true,
  },
  { id: "pofta", label: "pofta care mă ține", kind: "durere", showAtCheckin: false, target: 8 },
  {
    id: "frica_moarte",
    label: "mi-e frică de moarte",
    kind: "durere",
    showAtCheckin: false,
    target: 8,
    needsCrisisLine: true,
  },
  {
    id: "ocult",
    label: "am umblat cu descântece",
    kind: "durere",
    showAtCheckin: false,
    target: 6,
    needsCrisisLine: true,
  },
]

export function needById(id: string): Need | null {
  return NEEDS.find((n) => n.id === id) ?? null
}

/** Cele opt care se arată din prima. Restul, sub „altceva mă apasă”. */
export function checkinNeeds(): Need[] {
  return NEEDS.filter((n) => n.showAtCheckin)
}

export function hiddenNeeds(): Need[] {
  return NEEDS.filter((n) => !n.showAtCheckin)
}

/**
 * Numele vechi al celor 7 stări din check-in. Rămâne ca să nu se rupă
 * `scroll.ts`, `dailyGifts.ts` și ce e salvat în telefon. La cod nou se
 * folosește `NeedId`.
 */
export const LEGACY_MOOD_IDS = [
  "obosit",
  "speriat",
  "vinovat",
  "in_asteptare",
  "singur",
  "recunoscator",
  "fara_directie",
] as const

export type MessageMood = (typeof LEGACY_MOOD_IDS)[number]

export function isLegacyMood(id: string): id is MessageMood {
  return (LEGACY_MOOD_IDS as readonly string[]).includes(id)
}
