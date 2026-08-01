// Mesajul zilei — cardul distribuibil (docs/27 §3).
//
// REGULA CARE NU SE NEGOCIAZĂ (docs/00-DIRECTIE §7, D-005, docs/27 §3.2):
// aplicația nu pune cuvinte noi în gura lui Dumnezeu. Orice text la persoana I
// este parafraza unui verset REAL, iar `verseRef` apare pe card, la vedere.
// Formula „Dumnezeu îți transmite astăzi” + frază inventată este interzisă.
//
// Conținut original Emanus. Cardurile care circulă pe rețele aparțin autorilor
// lor și nu se copiază (docs/27 §1.2).
import type { AgeCategoryId, GrowthAxisId } from "./domain.js"

/** Stările din check-in-ul emoțional (docs/00-DIRECTIE §14). */
export type MessageMood =
  | "obosit"
  | "speriat"
  | "vinovat"
  | "in_asteptare"
  | "singur"
  | "recunoscator"
  | "fara_directie"

export const MESSAGE_MOODS: { id: MessageMood; label: string }[] = [
  { id: "obosit", label: "sunt obosit" },
  { id: "speriat", label: "mi-e frică" },
  { id: "vinovat", label: "mă simt vinovat" },
  { id: "in_asteptare", label: "aștept ceva" },
  { id: "singur", label: "sunt singur" },
  { id: "recunoscator", label: "vreau să mulțumesc" },
  { id: "fara_directie", label: "nu știu încotro" },
]

/** Doar aceste titluri sunt permise pe card (docs/27 §3.2). */
export const ALLOWED_CARD_TITLES = [
  "Dumnezeu ți-a spus deja:",
  "Ce îți spune Dumnezeu astăzi, din Cuvântul Său:",
  "Astăzi, din Scriptură, pentru tine:",
] as const

export type CardTitle = (typeof ALLOWED_CARD_TITLES)[number]

export type CardBackground = "pergament" | "pergament-cald" | "pergament-umbra"

export interface MessageCard {
  id: string
  title: CardTitle
  /** Parafrază fidelă versetului, la persoana I. Niciodată adăugată la el. */
  body: string
  verseRef: string
  verseText: string
  axis: GrowthAxisId
  moods: MessageMood[]
  background: CardBackground
  ageVariants?: Partial<Record<AgeCategoryId, { title: CardTitle; body: string }>>
}

export const MESSAGE_CARDS: MessageCard[] = [
  {
    id: "msg_ajunge_zilei",
    title: "Dumnezeu ți-a spus deja:",
    body: "Ajunge zilei necazul ei. Nu duci azi și povara de mâine.",
    verseRef: "Matei 6:34",
    verseText:
      "Nu vă îngrijorați dar de ziua de mâine; căci ziua de mâine se va îngrijora de ea Însăși. Ajunge zilei necazul ei.",
    axis: "emotional_peace",
    moods: ["obosit", "speriat"],
    background: "pergament",
  },
  {
    id: "msg_candela",
    title: "Astăzi, din Scriptură, pentru tine:",
    body: "Cuvântul Meu îți luminează pasul următor. Nu tot drumul — pasul.",
    verseRef: "Psalmul 119:105",
    verseText: "Cuvântul Tău este o candelă pentru picioarele mele și o lumină pe cărarea mea.",
    axis: "living_faith",
    moods: ["fara_directie", "speriat"],
    background: "pergament-cald",
  },
  {
    id: "msg_nu_te_las_orfan",
    title: "Dumnezeu ți-a spus deja:",
    body: "Nu te las orfan. Mă întorc la tine.",
    verseRef: "Ioan 14:18",
    verseText: "Nu vă voi lăsa orfani, Mă voi întoarce la voi.",
    axis: "identity",
    moods: ["singur"],
    background: "pergament",
  },
  {
    id: "msg_nici_o_osandire",
    title: "Dumnezeu ți-a spus deja:",
    body: "Nu mai e nici o osândire pentru tine. Prețul a fost plătit o dată.",
    verseRef: "Romani 8:1",
    verseText: "Acum dar nu este nici o osândire pentru cei ce sunt în Hristos Isus.",
    axis: "freedom",
    moods: ["vinovat"],
    background: "pergament-umbra",
  },
  {
    id: "msg_sapat_in_mana",
    title: "Dumnezeu ți-a spus deja:",
    body: "Te-am săpat în mâinile Mele. Nu te pot uita.",
    verseRef: "Isaia 49:16",
    verseText: "Iată, te-am săpat pe mâinile Mele.",
    axis: "identity",
    moods: ["singur", "obosit"],
    background: "pergament",
  },
  {
    id: "msg_te_chem_pe_nume",
    title: "Dumnezeu ți-a spus deja:",
    body: "Te chem pe nume. Ești al Meu.",
    verseRef: "Isaia 43:1",
    verseText: "Nu te teme de nimic, căci Eu te izbăvesc, te chem pe nume: ești al Meu.",
    axis: "identity",
    moods: ["speriat", "fara_directie"],
    background: "pergament-cald",
  },
  {
    id: "msg_odihna",
    title: "Dumnezeu ți-a spus deja:",
    body: "Vino la Mine, tu care ești trudit și încărcat. Eu îți dau odihnă.",
    verseRef: "Matei 11:28",
    verseText: "Veniți la Mine, toți cei trudiți și încărcați, și Eu vă voi da odihnă.",
    axis: "emotional_peace",
    moods: ["obosit"],
    background: "pergament",
  },
  {
    id: "msg_pacea_mea",
    title: "Dumnezeu ți-a spus deja:",
    body: "Ți-am lăsat pacea Mea. Nu se ia după cum îți merge azi.",
    verseRef: "Ioan 14:27",
    verseText: "Vă las pacea, vă dau pacea Mea. Nu v-o dau cum o dă lumea.",
    axis: "emotional_peace",
    moods: ["speriat", "obosit"],
    background: "pergament-cald",
  },
  {
    id: "msg_asteapta_domnul",
    title: "Ce îți spune Dumnezeu astăzi, din Cuvântul Său:",
    body: "Cine Mă așteaptă nu rămâne fără putere. Își schimbă puterea.",
    verseRef: "Isaia 40:31",
    verseText:
      "Dar cei ce se încred în Domnul își înnoiesc puterea; ei zboară ca vulturii; aleargă, și nu obosesc.",
    axis: "living_faith",
    moods: ["in_asteptare", "obosit"],
    background: "pergament",
  },
  {
    id: "msg_nu_te_voi_lasa",
    title: "Dumnezeu ți-a spus deja:",
    body: "Nu te voi părăsi și nu te voi lăsa.",
    verseRef: "Evrei 13:5",
    verseText: "Căci El Însuși a zis: „Nicidecum nu te voi lăsa și cu nici un chip nu te voi părăsi.”",
    axis: "identity",
    moods: ["singur", "speriat"],
    background: "pergament",
  },
  {
    id: "msg_iertare_curat",
    title: "Dumnezeu ți-a spus deja:",
    body: "Dacă Îți spui ce ai făcut, Eu iert și curățesc. Nu țin socoteala a doua oară.",
    verseRef: "1 Ioan 1:9",
    verseText:
      "Dacă ne mărturisim păcatele, El este credincios și drept ca să ne ierte păcatele și să ne curățească de orice nelegiuire.",
    axis: "freedom",
    moods: ["vinovat"],
    background: "pergament-umbra",
  },
  {
    id: "msg_aproape_de_inima_zdrobita",
    title: "Ce îți spune Dumnezeu astăzi, din Cuvântul Său:",
    body: "Sunt aproape de cei cu inima zdrobită. Nu M-am dat la o parte.",
    verseRef: "Psalmul 34:18",
    verseText: "Domnul este aproape de cei cu inima zdrobită și mântuiește pe cei cu duhul înăbușit.",
    axis: "emotional_peace",
    moods: ["singur", "vinovat"],
    background: "pergament-umbra",
  },
  {
    id: "msg_planurile_mele",
    title: "Dumnezeu ți-a spus deja:",
    body: "Gândurile Mele cu tine sunt gânduri de pace, nu de nenorocire.",
    verseRef: "Ieremia 29:11",
    verseText:
      "Căci Eu știu gândurile pe care le am cu privire la voi, zice Domnul, gânduri de pace și nu de nenorocire.",
    axis: "living_faith",
    moods: ["fara_directie", "in_asteptare"],
    background: "pergament-cald",
  },
  {
    id: "msg_toate_lucrurile",
    title: "Ce îți spune Dumnezeu astăzi, din Cuvântul Său:",
    body: "Nu tot ce ți se întâmplă e bun. Dar Eu lucrez spre bine și din ce e rău.",
    verseRef: "Romani 8:28",
    verseText: "De altfel, știm că toate lucrurile lucrează împreună spre binele celor ce iubesc pe Dumnezeu.",
    axis: "living_faith",
    moods: ["fara_directie", "in_asteptare"],
    background: "pergament",
  },
  {
    id: "msg_ma_indur",
    title: "Ce îți spune Dumnezeu astăzi, din Cuvântul Său:",
    body: "Mă îndur de tine cum se îndură un tată de copilul lui.",
    verseRef: "Psalmul 103:13",
    verseText: "Cum se îndură un tată de copiii lui, așa Se îndură Domnul de cei ce se tem de El.",
    axis: "identity",
    moods: ["vinovat", "obosit"],
    background: "pergament-cald",
  },
  {
    id: "msg_libertate",
    title: "Dumnezeu ți-a spus deja:",
    body: "Dacă Fiul te face liber, ești liber cu adevărat.",
    verseRef: "Ioan 8:36",
    verseText: "Deci, dacă Fiul vă face slobozi, veți fi într-adevăr slobozi.",
    axis: "freedom",
    moods: ["vinovat", "fara_directie"],
    background: "pergament",
  },
  {
    id: "msg_lauda",
    title: "Ce îți spune Dumnezeu astăzi, din Cuvântul Său:",
    body: "Mulțumirea ta nu e o formalitate. E felul în care Îți amintești că nu ești singur.",
    verseRef: "Psalmul 103:2",
    verseText: "Binecuvântează, suflete, pe Domnul și nu uita nici una din binefacerile Lui!",
    axis: "character",
    moods: ["recunoscator"],
    background: "pergament-cald",
  },
  {
    id: "msg_lucrarea_lui",
    title: "Dumnezeu ți-a spus deja:",
    body: "Ești lucrarea Mea. Încă lucrez la tine.",
    verseRef: "Efeseni 2:10",
    verseText: "Căci noi suntem lucrarea Lui și am fost zidiți în Hristos Isus pentru faptele bune.",
    axis: "identity",
    moods: ["vinovat", "fara_directie"],
    background: "pergament",
  },
  {
    id: "msg_dus_la_capat",
    title: "Ce îți spune Dumnezeu astăzi, din Cuvântul Său:",
    body: "Cel care a început lucrarea în tine o duce și la capăt. Nu tu.",
    verseRef: "Filipeni 1:6",
    verseText: "Sunt încredințat că Acela care a început în voi această bună lucrare o va isprăvi.",
    axis: "character",
    moods: ["obosit", "in_asteptare"],
    background: "pergament",
  },
  {
    id: "msg_pasii_mei",
    title: "Ce îți spune Dumnezeu astăzi, din Cuvântul Său:",
    body: "Nu te sprijini pe priceperea ta. Eu îți netezesc căile.",
    verseRef: "Proverbe 3:5-6",
    verseText:
      "Încrede-te în Domnul cu toată inima ta și nu te încrede în înțelepciunea ta; recunoaște-L în toate căile tale, și El îți va netezi cărările.",
    axis: "living_faith",
    moods: ["fara_directie"],
    background: "pergament",
  },
  {
    id: "msg_lacrimile",
    title: "Ce îți spune Dumnezeu astăzi, din Cuvântul Său:",
    body: "Lacrimile tale nu s-au pierdut. Le-am pus la păstrare.",
    verseRef: "Psalmul 56:8",
    verseText: "Tu numări pașii vieții mele de pribeag; pune-mi lacrimile în burduful Tău.",
    axis: "emotional_peace",
    moods: ["singur", "in_asteptare"],
    background: "pergament-umbra",
  },
]

/** Verificare de siguranță: un card fără verset-ancoră nu are ce căuta în app. */
export function isCardAnchored(card: MessageCard): boolean {
  return card.verseRef.trim().length > 0 && card.verseText.trim().length > 0
}

export function messageCardById(id: string): MessageCard | null {
  return MESSAGE_CARDS.find((c) => c.id === id) ?? null
}

function dayNumber(date: Date): number {
  return Math.floor(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) / 86400000,
  )
}

/**
 * Alegerea cardului de azi (docs/27 §3.4). NU e random:
 *  1. starea de la check-in, dacă există;
 *  2. altfel, axa cea mai fragedă din radar;
 *  3. altfel, rotație stabilă pe zi, evitând ce s-a văzut recent.
 */
export function pickMessageCard(input: {
  mood?: MessageMood
  focusAxis?: GrowthAxisId
  recentIds?: string[]
  date?: Date
}): MessageCard {
  const recent = new Set(input.recentIds ?? [])
  const date = input.date ?? new Date()

  const byMood = input.mood ? MESSAGE_CARDS.filter((c) => c.moods.includes(input.mood as MessageMood)) : []
  const byAxis = input.focusAxis ? MESSAGE_CARDS.filter((c) => c.axis === input.focusAxis) : []

  for (const list of [byMood, byAxis, MESSAGE_CARDS]) {
    const fresh = list.filter((c) => !recent.has(c.id))
    if (fresh.length > 0) return fresh[dayNumber(date) % fresh.length]
  }
  return MESSAGE_CARDS[dayNumber(date) % MESSAGE_CARDS.length]
}
