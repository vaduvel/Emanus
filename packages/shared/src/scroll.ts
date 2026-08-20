// Pergamentul cu versete (docs/27 §4).
//
// DE CE NU BORCAN (docs/27 §4.1, D-013): borcanul și cutia cu versete sunt
// produse fizice vândute de creatori creștini cu care vrem parteneriat, nu
// concurență. Obiectul digital e SULUL — forma reală a Scripturii (Luca 4:17,
// Isus desfășoară sulul lui Isaia). Borcanul fizic poate trimite în app prin QR.
//
// Diferența față de orice obiect de raft: acela e random, al nostru ascultă
// întâi (docs/00-DIRECTIE §14) — versetul vine din sertarul potrivit stării.
//
// Versete: Cornilescu VDC 1924 (domeniu public), colaționate verset cu verset.
import type { GrowthAxisId } from "./domain.js"
import type { MessageMood } from "./messageCards.js"

export type ScrollSectionId =
  | "cand_te_doare"
  | "cand_esti_speriat"
  | "cand_te_simti_vinovat"
  | "cand_astepti"
  | "cand_esti_singur"
  | "cand_multumesti"
  | "cand_nu_stii_incotro"

export interface ScrollSection {
  id: ScrollSectionId
  label: string
  mood: MessageMood
}

export const SCROLL_SECTIONS: ScrollSection[] = [
  { id: "cand_te_doare", label: "când te doare", mood: "obosit" },
  { id: "cand_esti_speriat", label: "când ești speriat", mood: "speriat" },
  { id: "cand_te_simti_vinovat", label: "când te simți vinovat", mood: "vinovat" },
  { id: "cand_astepti", label: "când aștepți", mood: "in_asteptare" },
  { id: "cand_esti_singur", label: "când ești singur", mood: "singur" },
  { id: "cand_multumesti", label: "când mulțumești", mood: "recunoscator" },
  { id: "cand_nu_stii_incotro", label: "când nu știi încotro", mood: "fara_directie" },
]

export interface ScrollVerse {
  id: string
  section: ScrollSectionId
  ref: string
  text: string
  axis: GrowthAxisId
  /** Pasul următor, folosit de candela de seară (docs/27 §4.6). */
  step?: string
}

export const SCROLL_VERSES: ScrollVerse[] = [
  // când te doare
  {
    id: "sv_ps34_18",
    section: "cand_te_doare",
    ref: "Psalmul 34:18",
    text: "Domnul este aproape de cei cu inima înfrântă și mântuiește pe cei cu duhul zdrobit.",
    axis: "emotional_peace",
    step: "Spune-I un lucru care te doare, fără să ceri nimic în schimb.",
  },
  {
    id: "sv_ps147_3",
    section: "cand_te_doare",
    ref: "Psalmul 147:3",
    text: "Tămăduiește pe cei cu inima zdrobită și le leagă rănile.",
    axis: "emotional_peace",
    step: "Numește rana, nu doar starea. „Mă doare că…”",
  },
  {
    id: "sv_mt11_28",
    section: "cand_te_doare",
    ref: "Matei 11:28",
    text: "Veniți la Mine, toți cei trudiți și împovărați, și Eu vă voi da odihnă.",
    axis: "emotional_peace",
    step: "Culcă-te azi cu o jumătate de oră mai devreme. Odihna e și ea ascultare.",
  },
  {
    id: "sv_ps56_8",
    section: "cand_te_doare",
    ref: "Psalmul 56:8",
    text: "Tu numeri pașii vieții mele de pribeag; pune-mi lacrimile în burduful Tău!",
    axis: "emotional_peace",
    step: "Nu-ți cere scuze azi pentru că te doare.",
  },
  {
    id: "sv_2co1_3",
    section: "cand_te_doare",
    ref: "2 Corinteni 1:3-4",
    text: "Dumnezeul oricărei mângâieri, care ne mângâie în toate necazurile noastre.",
    axis: "emotional_peace",
    step: "Trimite un mesaj cuiva care trece prin ce ai trecut tu.",
  },

  // când ești speriat
  {
    id: "sv_is41_10",
    section: "cand_esti_speriat",
    ref: "Isaia 41:10",
    text: "Nu te teme, căci Eu sunt cu tine; nu te uita cu îngrijorare, căci Eu sunt Dumnezeul tău.",
    axis: "emotional_peace",
    step: "Scrie de ce ți-e frică, într-o propoziție. Frica nenumită crește.",
  },
  {
    id: "sv_ps56_3",
    section: "cand_esti_speriat",
    ref: "Psalmul 56:3",
    text: "Ori de câte ori mă tem, eu mă încred în Tine.",
    axis: "living_faith",
    step: "Când te strânge frica azi, spune versetul o dată, cu voce tare.",
  },
  {
    id: "sv_mt6_34",
    section: "cand_esti_speriat",
    ref: "Matei 6:34",
    text: "Nu vă îngrijorați dar de ziua de mâine. Ajunge zilei necazul ei.",
    axis: "emotional_peace",
    step: "Alege un singur lucru din lista de mâine și lasă-l pe mâine.",
  },
  {
    id: "sv_2tim1_7",
    section: "cand_esti_speriat",
    ref: "2 Timotei 1:7",
    text: "Căci Dumnezeu nu ne-a dat un duh de frică, ci de putere, de dragoste și de chibzuință.",
    axis: "freedom",
    step: "Fă azi lucrul mic de care ți-e frică. Doar unul.",
  },
  {
    id: "sv_ps119_105",
    section: "cand_esti_speriat",
    ref: "Psalmul 119:105",
    text: "Cuvântul Tău este o candelă pentru picioarele mele și o lumină pe cărarea mea.",
    axis: "living_faith",
    step: "Nu cere azi harta. Cere pasul următor.",
  },

  // când te simți vinovat
  {
    id: "sv_ro8_1",
    section: "cand_te_simti_vinovat",
    ref: "Romani 8:1",
    text: "Acum dar nu este nicio osândire pentru cei ce sunt în Hristos Isus.",
    axis: "freedom",
    step: "Oprește o zi pedeapsa pe care ți-o dai singur.",
  },
  {
    id: "sv_1in1_9",
    section: "cand_te_simti_vinovat",
    ref: "1 Ioan 1:9",
    text: "Dacă ne mărturisim păcatele, El este credincios și drept ca să ne ierte păcatele.",
    axis: "freedom",
    step: "Spune-I lucrul pe care îl ții ascuns. Îl știe; spusul e pentru tine.",
  },
  {
    id: "sv_ps103_12",
    section: "cand_te_simti_vinovat",
    ref: "Psalmul 103:12",
    text: "Cât de departe este răsăritul de apus, atât de mult depărtează El fărădelegile noastre de la noi.",
    axis: "freedom",
    step: "Nu mai redeschide azi ce a fost iertat.",
  },
  {
    id: "sv_is1_18",
    section: "cand_te_simti_vinovat",
    ref: "Isaia 1:18",
    text: "De vor fi păcatele voastre cum e cârmâzul, se vor face albe ca zăpada.",
    axis: "freedom",
    step: "Cere iertare unui om, dacă e cazul. Scurt, fără explicații lungi.",
  },
  {
    id: "sv_lc15_20",
    section: "cand_te_simti_vinovat",
    ref: "Luca 15:20",
    text: "Când era încă departe, tatăl său l-a văzut și i s-a făcut milă de el.",
    axis: "identity",
    step: "Întoarce-te la El fără discursul de scuze.",
  },

  // când aștepți
  {
    id: "sv_is40_31",
    section: "cand_astepti",
    ref: "Isaia 40:31",
    text: "Cei ce se încred în Domnul își înnoiesc puterea; ei zboară ca vulturii; aleargă, și nu obosesc.",
    axis: "living_faith",
    step: "Scrie ce aștepți. Peste luni vei citi rândul acesta.",
  },
  {
    id: "sv_ps27_14",
    section: "cand_astepti",
    ref: "Psalmul 27:14",
    text: "Nădăjduiește în Domnul! Fii tare, îmbărbătează-ți inima și nădăjduiește în Domnul!",
    axis: "living_faith",
    step: "Nu forța azi lucrul care nu se mișcă. Fă altul, mic.",
  },
  {
    id: "sv_hab2_3",
    section: "cand_astepti",
    ref: "Habacuc 2:3",
    text: "Căci este o prorocie a cărei vreme este hotărâtă… dacă zăbovește, așteapt-o.",
    axis: "living_faith",
    step: "Spune-I unde ți se pare că întârzie. Sinceritatea nu e lipsă de respect.",
  },
  {
    id: "sv_ecl3_11",
    section: "cand_astepti",
    ref: "Eclesiastul 3:11",
    text: "Orice lucru El îl face frumos la vremea lui.",
    axis: "character",
    step: "Amintește-ți un lucru care a venit mai târziu și a fost mai bine așa.",
  },
  {
    id: "sv_ro8_25",
    section: "cand_astepti",
    ref: "Romani 8:25",
    text: "Pe când, dacă nădăjduim ce nu vedem, așteptăm cu răbdare.",
    axis: "living_faith",
    step: "Roagă-te o dată pentru răbdare, nu pentru grăbire.",
  },

  // când ești singur
  {
    id: "sv_in14_18",
    section: "cand_esti_singur",
    ref: "Ioan 14:18",
    text: "Nu vă voi lăsa orfani, Mă voi întoarce la voi.",
    axis: "identity",
    step: "Când te lovește singurătatea azi, spune tare: „nu sunt orfan”.",
  },
  {
    id: "sv_ps27_10",
    section: "cand_esti_singur",
    ref: "Psalmul 27:10",
    text: "Căci tatăl meu și mama mea mă părăsesc, dar Domnul mă primește.",
    axis: "identity",
    step: "Scrie numele celui care a plecat. Nu ca acuzație.",
  },
  {
    id: "sv_ev13_5",
    section: "cand_esti_singur",
    ref: "Evrei 13:5",
    text: "Nicidecum n-am să te las, cu niciun chip nu te voi părăsi.",
    axis: "identity",
    step: "Sună pe cineva. Singurătatea se rupe și cu un telefon.",
  },
  {
    id: "sv_ps139_7",
    section: "cand_esti_singur",
    ref: "Psalmul 139:7",
    text: "Unde mă voi duce departe de Duhul Tău și unde voi fugi departe de Fața Ta?",
    axis: "identity",
    step: "Stai cinci minute în liniște, fără telefon. Nu ești singur în cameră.",
  },
  {
    id: "sv_is49_16",
    section: "cand_esti_singur",
    ref: "Isaia 49:16",
    text: "Iată că te-am săpat pe mâinile Mele.",
    axis: "identity",
    step: "Uită-te o dată la mâna ta și amintește-ți versetul.",
  },

  // când mulțumești
  {
    id: "sv_ps103_2",
    section: "cand_multumesti",
    ref: "Psalmul 103:2",
    text: "Binecuvântează, suflete, pe Domnul și nu uita niciuna din binefacerile Lui!",
    axis: "character",
    step: "Numește trei lucruri de azi. Doar trei, dar concrete.",
  },
  {
    id: "sv_1te5_18",
    section: "cand_multumesti",
    ref: "1 Tesaloniceni 5:18",
    text: "Mulțumiți lui Dumnezeu pentru toate lucrurile.",
    axis: "character",
    step: "Mulțumește pentru un lucru care nu ți-a plăcut, dar te-a schimbat.",
  },
  {
    id: "sv_ps118_24",
    section: "cand_multumesti",
    ref: "Psalmul 118:24",
    text: "Aceasta este ziua pe care a făcut-o Domnul: să ne bucurăm și să ne veselim în ea!",
    axis: "character",
    step: "Spune-i unui om, azi, un lucru bun despre el.",
  },
  {
    id: "sv_iac1_17",
    section: "cand_multumesti",
    ref: "Iacov 1:17",
    text: "Orice ni se dă bun și orice dar desăvârșit este de sus, coborându-se de la Tatăl luminilor.",
    axis: "character",
    step: "Mulțumește pentru un lucru pe care îl ai și nu l-ai cerut niciodată.",
  },

  // când nu știi încotro
  {
    id: "sv_pr3_5",
    section: "cand_nu_stii_incotro",
    ref: "Proverbele 3:5-6",
    text: "Încrede-te în Domnul din toată inima ta… și El îți va netezi cărările.",
    axis: "living_faith",
    step: "Scrie decizia care te apasă și las-o o noapte înainte să alegi.",
  },
  {
    id: "sv_ps32_8",
    section: "cand_nu_stii_incotro",
    ref: "Psalmul 32:8",
    text: "Te voi învăța și-ți voi arăta calea pe care trebuie s-o urmezi, te voi sfătui și voi avea privirea îndreptată asupra ta.",
    axis: "living_faith",
    step: "Cere sfatul unui om mai înaintat, nu doar al internetului.",
  },
  {
    id: "sv_ier29_11",
    section: "cand_nu_stii_incotro",
    ref: "Ieremia 29:11",
    text: "Eu știu gândurile pe care le am cu privire la voi: gânduri de pace, și nu de nenorocire.",
    axis: "living_faith",
    step: "Fă azi un pas mic într-o direcție, chiar dacă nu vezi tot drumul.",
  },
  {
    id: "sv_iac1_5",
    section: "cand_nu_stii_incotro",
    ref: "Iacov 1:5",
    text: "Dacă vreunuia dintre voi îi lipsește înțelepciunea, s-o ceară de la Dumnezeu.",
    axis: "living_faith",
    step: "Cere azi înțelepciune, pe numele deciziei tale.",
  },
  {
    id: "sv_is30_21",
    section: "cand_nu_stii_incotro",
    ref: "Isaia 30:21",
    text: "Urechile tale vor auzi după tine glasul care va zice: „Iată drumul, mergeți pe el!”",
    axis: "living_faith",
    step: "Stai în liniște cinci minute înainte să mai ceri ceva.",
  },
]

export function scrollVersesInSection(section: ScrollSectionId): ScrollVerse[] {
  return SCROLL_VERSES.filter((v) => v.section === section)
}

export function scrollVerseById(id: string | null | undefined): ScrollVerse | undefined {
  if (!id) return undefined
  return SCROLL_VERSES.find((verse) => verse.id === id)
}

export function sectionForMood(mood: MessageMood): ScrollSectionId {
  return SCROLL_SECTIONS.find((s) => s.mood === mood)?.id ?? "cand_nu_stii_incotro"
}

function dayNumber(date: Date): number {
  return Math.floor(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) / 86400000,
  )
}

/**
 * Extrage un verset. Deterministic pe zi (același verset dacă închizi și
 * redeschizi app-ul în aceeași zi) și fără repetare cât timp există versete
 * nevăzute în sertar (docs/27 §4.10).
 */
export function drawScrollVerse(input: {
  section?: ScrollSectionId
  mood?: MessageMood
  recentIds?: string[]
  date?: Date
}): ScrollVerse {
  const date = input.date ?? new Date()
  const recent = new Set(input.recentIds ?? [])
  const section = input.section ?? (input.mood ? sectionForMood(input.mood) : undefined)
  const pool = section ? scrollVersesInSection(section) : SCROLL_VERSES
  const list = pool.length > 0 ? pool : SCROLL_VERSES
  const fresh = list.filter((v) => !recent.has(v.id))
  const chosen = fresh.length > 0 ? fresh : list
  return chosen[dayNumber(date) % chosen.length]
}
