import type { Lesson } from "../domain.js"
import { DOCTRINE_HAR_LESSONS } from "./doctrineHar2.js"
import { DOCTRINE_VESNICIA_LESSONS } from "./doctrineVesnicia2.js"
import { PILDE_TATAL_LESSONS } from "./pildeTatal2.js"
import { PILDE_FIUL_LESSONS } from "./pildeFiul2.js"
import { PILDE_IMPARATIA_LESSONS } from "./pildeImparatia2.js"
import { PILDE_VESNICIA_LESSONS } from "./pildeVesnicia2.js"
import { SPIRITUAL_MIJLOCITOR_LESSONS } from "./spiritualMijlocitor.js"
import { NEW_AGE_LESSONS } from "./newAge.js"
import { SPIRITUAL_VRAJITORIE_LESSONS } from "./spiritualVrajitorie.js"

export * from "./doctrineHar.js"
export * from "./doctrineHar2.js"
export * from "./doctrineVesnicia.js"
export * from "./doctrineVesnicia2.js"
export * from "./pildeTatal.js"
export * from "./pildeTatal2.js"
export * from "./pildeFiul.js"
export * from "./pildeFiul2.js"
export * from "./pildeImparatia.js"
export * from "./pildeImparatia2.js"
export * from "./pildeVesnicia.js"
export * from "./pildeVesnicia2.js"
export * from "./spiritualMijlocitor.js"
export * from "./newAge.js"
export * from "./spiritualVrajitorie.js"

export type CourseState = "live" | "partial" | "planned"
export type LibraryCourse = {
  id: string; title: string; forWhom: string; plannedLessons: number
  lessonIds: string[]; state: CourseState; source?: string
  ageHint?: "0-5" | "6-11" | "12-18" | "adult" | "bunici"
}
export type LibraryShelf = { id: string; title: string; blurb: string; courses: LibraryCourse[]; gated?: boolean }

const c = (id: string, title: string, forWhom: string, plannedLessons: number, extra: Partial<LibraryCourse> = {}): LibraryCourse => ({ id, title, forWhom, plannedLessons, lessonIds: [], state: "planned", ...extra })
const shelf = (id: string, title: string, blurb: string, courses: LibraryCourse[], gated = false): LibraryShelf => ({ id, title, blurb, courses, ...(gated ? { gated } : {}) })

const shelfTemelie = shelf("lib_temelie", "Temelia", "De la zero: cine e Dumnezeu, ce a făcut Iisus și ce înseamnă asta pentru tine.", [
  c("lib_fundamentul", "Fundamentul", "Nu știi de unde să începi, sau vrei să reașezi ce ai auzit pe apucate.", 7, { lessonIds: ["doctrina_l1", "doctrina_l2", "doctrina_l3"], state: "partial", source: "docs/06-curs-fundamentul.md" }),
  c("lib_intoarcerea", "Întoarcerea", "Ai înțeles că ceva nu e în ordine și vrei să știi ce faci mai departe.", 5, { source: "docs/17-modul-intoarcerea.md" }),
])

const shelfIntrebari = shelf("lib_intrebari", "Întrebări mari", "Lucrurile care te opresc să crezi, luate pe rând și cinstit — inclusiv unde nu avem răspuns.", [
  c("doctrine_c2_har", "Religie sau credință — ce mă mântuiește?", "Ai crescut cu ideea că ești creștin din naștere, sau că faptele bune se cântăresc la final.", 6, { lessonIds: ["har_d_l1", "har_d_l2", "har_d_l3", "har_d_l4", "har_d_l5", "har_d_l6"], state: "live", source: "docs/15-doctrina-generala.md §Cursul 2" }),
  c("doctrine_c4_vesnicia", "Ce urmează după moarte?", "Nu știi ce e raiul, ce e iadul, sau dacă poți fi sigur de ceva.", 5, { lessonIds: ["vesnicia_l1", "vesnicia_l2", "vesnicia_l3", "vesnicia_l4", "vesnicia_l5"], state: "live", source: "docs/15-doctrina-generala.md §Cursul 4" }),
  c("doctrine_c1_biblia", "Pot să am încredere în Biblie?", "Ți s-a spus că e o carte scrisă de oameni, rescrisă de nu știu câte ori.", 6, { source: "docs/15-doctrina-generala.md §Cursul 1" }),
  c("doctrine_c3_biserica", "Cine e Biserica lui Iisus?", "Dacă fiecare zice altceva, cine are dreptate? Sau ai fost rănit acolo.", 5, { source: "docs/15-doctrina-generala.md §Cursul 3" }),
  c("spiritual_c5_mijlocitor", "Cine te aude când te rogi", "Crezi că Dumnezeu e real, dar simți că nu ai voie să-I vorbești tu, direct.", 4, { lessonIds: ["spirit_mijl_l1", "spirit_mijl_l2", "spirit_mijl_l3", "spirit_mijl_l4"], state: "live", source: "docs/42-module-ocult-newage.md §Cursul 1" }),
  c("lib_alte_credinte", "Energii, horoscop, karma", "Ai luat de peste tot câte puțin și nu mai știi ce se bate cap în cap.", 6, { lessonIds: ["newage_l1", "newage_l2", "newage_l3", "newage_l4", "newage_l5", "newage_l6"], state: "live", source: "docs/42-module-ocult-newage.md §Cursul 2" }),
  c("spiritual_c6_vrajitorie", "Vrăjitoria: reală, dar nu suverană", "Ți s-a spus că ți s-a făcut ceva, sau ai fost tu la cineva care face.", 4, { lessonIds: ["vraj_l1", "vraj_l2", "vraj_l3", "vraj_l4"], state: "live", source: "docs/42-module-ocult-newage.md §Cursul 3" }),
])

const shelfCuvantul = shelf("lib_cuvantul", "Cuvântul", "Cum se citește, de unde se începe și ce înseamnă ce citești.", [
  c("parables_c1_tatal", "Pildele — cine e Tatăl", "Le-ai auzit de mic și tot nu știi ce cer de la tine.", 5, { lessonIds: ["pilda_risipitor", "pilda_oaia", "pilda_vamesul", "pilda_lucratorii", "pilda_robul_datornic"], state: "live", source: "docs/16-modul-pilde.md §Cursul 1" }),
  c("parables_c3_fiul", "Pildele — cum trăiește un fiu", "Înțelegi ce a făcut Iisus și întrebi: bun, și acum concret ce fac?", 5, { lessonIds: ["pilda_samariteanul", "pilda_talantii", "pilda_doi_fii", "pilda_casa_stanca", "pilda_smochinul"], state: "live", source: "docs/16-modul-pilde.md §Cursul 3" }),
  c("parables_c2_imparatia", "Pildele — ce e Împărăția și cine intră", "Auzi «Împărăția lui Dumnezeu» și nu știi la ce se referă.", 5, { lessonIds: ["pilda_semanatorul", "pilda_neghina", "pilda_mustarul", "pilda_comoara", "pilda_fecioarele"], state: "live", source: "docs/16-modul-pilde.md §Cursul 2" }),
  c("parables_c4_vesnicia", "Pildele — bani, moarte și ce rămâne", "Te întrebi ce rămâne din ce strângi și ce contează la capăt.", 5, { lessonIds: ["pilda_bogatul_nebun", "pilda_bogatul_lazar", "pilda_iconomul_viclean", "pilda_nunta_imparatului", "pilda_judecatorul_nedrept"], state: "live", source: "docs/16-modul-pilde.md §Cursul 4" }),
  c("lib_carti", "Cărțile Bibliei, una câte una", "Ai deschis la Geneza, ai ajuns la Levitic și te-ai oprit.", 12),
  c("lib_trasee", "Trasee scurte de citire", "Vrei să citești, dar ai nevoie de un capăt și de un final.", 4),
])

const shelfRugaciune = shelf("lib_rugaciune", "Rugăciunea", "Cum se vorbește cu El, mai ales când nu ai cuvinte și când nu primești răspuns.", [
  c("lib_rug_inceput", "Doamne, învață-mă să mă rog", "Vrei să înțelegi «Tatăl nostru» ca tipar viu, nu ca poezie repetată.", 9, { source: "docs/Emanus — Ritmul zilnic & Rugăciunea" }),
  c("lib_rug_psalmi", "Psalmii ca școală de rugăciune", "Vrei să te rogi cinstit, inclusiv când ești supărat pe El.", 5),
  c("lib_rug_mijlocire", "Postul și mijlocirea", "Te rogi pentru cineva de mult și nu se schimbă nimic.", 4),
])

const shelfCasa = shelf("lib_casa", "Casa", "Ce se întâmplă cu credința acolo unde te vede lumea cel mai puțin.", [
  c("lib_casnicie", "Căsnicia", "Sunteți doi oameni obosiți care nu mai vorbesc despre nimic important.", 6, { source: "docs/12-continut-parinti.md" }),
  c("lib_partener_necredincios", "Când partenerul nu crede", "Tu ai venit la Iisus, partenerul nu. Și doare zilnic.", 4),
  c("lib_cresc_copii", "Cresc copii de credință", "Vrei să le dai ce nu ai avut, fără să le impui nimic.", 5, { source: "docs/12-continut-parinti.md" }),
  c("lib_copil_departe", "Când copilul se îndepărtează", "L-ai crescut în biserică și acum nu vrea să audă.", 4),
  c("lib_mostenirea", "Moștenirea pe care o las", "Ai ajuns la vârsta la care te întrebi ce rămâne după tine.", 5, { source: "docs/13-continut-bunici.md", ageHint: "bunici" }),
])

const shelfViata = shelf("lib_viata", "Viața de zi cu zi", "Bani, muncă, timp, cinste — acolo unde Scriptura se aplică sau nu se aplică deloc.", [
  c("lib_bani", "Bani și datorii", "Ai rate, ai frică de mâine și ți-e rușine să vorbești despre asta.", 5, { source: "docs/11-continut-barbati.md" }),
  c("lib_munca", "Muncă și rost", "Muncești mult și tot pare că nu însemni nimic.", 5),
  c("lib_integritate", "Cinstea când nu te vede nimeni", "Se fură mărunt în jurul tău și pare normal.", 4),
  c("lib_timp", "Timpul și oboseala", "Nu ai zece minute, dar ai două ore pe telefon.", 4),
])

const shelfCeiMici = shelf("lib_cei_mici", "Pentru cei mici", "De parcurs împreună cu copilul. Nu îl lăsăm singur cu întrebările mari.", [
  c("lib_micii_facut", "Dumnezeu m-a făcut", "Copil de 2-5 ani, cu tine lângă el.", 5, { source: "docs/08-continut-bebelusi.md", ageHint: "0-5" }),
  c("lib_copii_cine_sunt", "Cine sunt eu?", "Copil de 6-11 ani, singur sau cu tine.", 5, { source: "docs/09-continut-copii.md", ageHint: "6-11" }),
  c("lib_copii_emotii", "Când mi-e frică sau sunt supărat", "Copil care se închide și nu spune ce are.", 4, { source: "docs/09-continut-copii.md", ageHint: "6-11" }),
  c("lib_teens_identitate", "Cine sunt eu, de fapt?", "Adolescent prins între comparație și presiune.", 5, { source: "docs/02-programa-curriculum.md", ageHint: "12-18" }),
  c("lib_teens_indoieli", "Pot să cred cu adevărat?", "Adolescent cu întrebări la care nimeni nu i-a răspuns cinstit.", 5, { ageHint: "12-18" }),
])

const shelfCreatori = shelf("lib_creatori", "De la creatori", "Cursuri scrise de oameni care duc mai departe ce au primit. Fiecare trece prin validare înainte să apară aici.", [
  c("lib_creator_pilot", "Curs-pilot de creator", "Ai venit din materialul cuiva și vrei să continui cu el.", 5, { source: "docs/07-sablon-curs-creatori.md" }),
], true)

export const SHELVES: LibraryShelf[] = [shelfTemelie, shelfIntrebari, shelfCuvantul, shelfRugaciune, shelfCasa, shelfViata, shelfCeiMici, shelfCreatori]
export function visibleShelves(): LibraryShelf[] { return SHELVES.filter((s) => !s.gated) }
export function getShelf(id: string): LibraryShelf | undefined { return SHELVES.find((s) => s.id === id) }
export const ALL_LIBRARY_COURSES: LibraryCourse[] = SHELVES.flatMap((s) => s.courses)
export function getLibraryCourse(id: string): LibraryCourse | undefined { return ALL_LIBRARY_COURSES.find((x) => x.id === id) }
export function courseIsOpen(course: LibraryCourse): boolean { return course.lessonIds.length > 0 }
export function nextCourseLesson(course: LibraryCourse, lessonsDone: string[]): string | null { return course.lessonIds.find((id) => !lessonsDone.includes(id)) ?? null }

export const LIBRARY_LESSONS: Lesson[] = [
  ...DOCTRINE_HAR_LESSONS, ...DOCTRINE_VESNICIA_LESSONS,
  ...PILDE_TATAL_LESSONS, ...PILDE_FIUL_LESSONS,
  ...PILDE_IMPARATIA_LESSONS, ...PILDE_VESNICIA_LESSONS,
  ...SPIRITUAL_MIJLOCITOR_LESSONS, ...NEW_AGE_LESSONS,
  ...SPIRITUAL_VRAJITORIE_LESSONS,
]
export function findLibraryLesson(id: string): Lesson | undefined { return LIBRARY_LESSONS.find((x) => x.id === id) }
export function libraryCourseLessons(courseId: string): Lesson[] {
  const course = getLibraryCourse(courseId)
  return course ? course.lessonIds.map(findLibraryLesson).filter((x): x is Lesson => Boolean(x)) : []
}

export const WRITING_ORDER: string[] = ["doctrine_c1_biblia", "doctrine_c3_biserica", "lib_rug_inceput", "lib_casnicie", "lib_bani"]
