import type { Lesson } from "../domain.js"
import type { LibraryCourse, LibraryShelf } from "./index.js"
import * as base from "./index.js"
import { FUNDAMENTUL_LESSONS } from "./fundamentul.js"
import { DOCTRINE_BIBLIA_LESSONS } from "./doctrineBiblia2.js"
import { DOCTRINE_BISERICA_LESSONS } from "./doctrineBiserica2.js"
import { RUGACIUNE_INCEPUT_LESSONS } from "./rugaciuneInceput3.js"
import { RUGACIUNI_CONTEXTUALE_LESSONS } from "./rugaciuniContextuale.js"
import { CASNICIE_LESSONS, BANI_LESSONS } from "./viataCasaBani.js"
import { MUNCA_LESSONS, INTEGRITATE_LESSONS, TIMP_LESSONS } from "./viataZilnica.js"
import { TRASEE_ADOLESCENTI_LESSONS } from "./traseeAdolescenti.js"
import { TRASEE_COPII_LESSONS } from "./traseeCopii.js"
import { IDENTITATE_BARBATI_FEMEI_LESSONS } from "./identitateBarbatiFemei.js"
import { SPIRITUAL_LUMEA_LESSONS } from "./spiritualLumeaNevazuta2.js"
import { SPIRITUAL_DISCERN_LESSONS } from "./spiritualDiscernamant2.js"
import { SPIRITUAL_BLESTEM_LESSONS } from "./spiritualBlesteme2.js"
import { SPIRITUAL_LIBERTATE_LESSONS } from "./spiritualLibertate2.js"

export type { CourseState, LibraryCourse, LibraryShelf } from "./index.js"
export * from "./fundamentul.js"
export * from "./doctrineBiblia.js"
export * from "./doctrineBiblia2.js"
export * from "./doctrineBiserica.js"
export * from "./doctrineBiserica2.js"
export * from "./rugaciuneInceput.js"
export * from "./rugaciuneInceput2.js"
export * from "./rugaciuneInceput3.js"
export * from "./rugaciuniContextuale.js"
export * from "./viataCasaBani.js"
export * from "./viataZilnica.js"
export * from "./traseeAdolescenti.js"
export * from "./traseeCopii.js"
export * from "./identitateBarbatiFemei.js"
export * from "./spiritualLumeaNevazuta.js"
export * from "./spiritualLumeaNevazuta2.js"
export * from "./spiritualDiscernamant.js"
export * from "./spiritualDiscernamant2.js"
export * from "./spiritualBlesteme.js"
export * from "./spiritualBlesteme2.js"
export * from "./spiritualLibertate.js"
export * from "./spiritualLibertate2.js"

const ids=(prefix:string,count:number)=>Array.from({length:count},(_,i)=>`${prefix}${i+1}`)
const liveCourses:Record<string,string[]>={
 lib_fundamentul:ids("fund_l",8),lib_rug_context:ids("rug_context_l",11),lib_casnicie:ids("casnicie_l",6),lib_bani:ids("bani_l",5),
 lib_munca:ids("munca_l",5),lib_integritate:ids("integritate_l",4),lib_timp:ids("timp_l",4),
 lib_micii_facut:ids("micii_facut_l",5),lib_copii_cine_sunt:ids("copii_identitate_l",5),lib_copii_emotii:ids("copii_emotii_l",4),
 lib_teens_identitate:ids("teens_identitate_l",5),lib_teens_indoieli:ids("teens_indoieli_l",5),
 identitate_c1_chip:ids("identitate_vocatie_l",6),barbati_c1_formare:ids("barbat_formare_l",7),femei_c1_formare:ids("femeie_formare_l",7),
 doctrine_c1_biblia:ids("biblia_l",6),doctrine_c3_biserica:ids("biserica_l",5),lib_rug_inceput:ids("rug_inceput_l",9),
 spiritual_c1_lumea_nevazuta:ids("spirit_lumea_l",6),spiritual_c2_discernamant:ids("spirit_discern_l",6),
 spiritual_c3_blessings:ids("spirit_blestem_l",6),spiritual_c4_libertate:ids("spirit_libertate_l",7),
}
const open=(course:LibraryCourse):LibraryCourse=>liveCourses[course.id]?{...course,lessonIds:liveCourses[course.id],plannedLessons:liveCourses[course.id].length,state:"live"}:course
const contextualPrayerCourse:LibraryCourse={id:"lib_rug_context",title:"Rugăciuni pentru ritmul zilei",forWhom:"Vrei să aduci dimineața, munca, masa, familia, călătoria, nevoile și seara înaintea lui Dumnezeu.",plannedLessons:11,lessonIds:liveCourses.lib_rug_context,state:"live",source:"Scriptura; docs/Emanus — Ritmul zilnic & Rugăciunea"}
const planned=(id:string,title:string,forWhom:string,plannedLessons:number):LibraryCourse=>({id,title,forWhom,plannedLessons,lessonIds:[],state:"planned",source:"Scriptura; Carta doctrinară; programa Emanus"})
const identityShelf:LibraryShelf={id:"lib_identitate_vocatie",title:"Identitate, trup și vocație",blurb:"Om creat după chipul lui Dumnezeu și ucenic al lui Iisus înaintea rolurilor și statutului.",courses:[
 {id:"identitate_c1_chip",title:"Creat după chipul lui Dumnezeu",forWhom:"Vrei o temelie comună pentru identitate, trup, daruri și chemare.",plannedLessons:6,lessonIds:liveCourses.identitate_c1_chip,state:"live",source:"Scriptura; Carta doctrinară"},
 planned("identitate_c2_caracter","Caracterul lui Hristos în mine","Vrei putere fără dominație, blândețe fără pasivitate și curaj fără agresivitate.",7),
]}
const menShelf:LibraryShelf={id:"lib_barbati",title:"Viața de bărbat",blurb:"Bărbat format după chipul lui Hristos, nu după guru, algoritmi sau stereotipuri.",courses:[
 {id:"barbati_c1_formare",title:"Bărbat după chipul lui Hristos",forWhom:"Vrei să înțelegi filiația, responsabilitatea, puterea, emoțiile și integritatea.",plannedLessons:7,lessonIds:liveCourses.barbati_c1_formare,state:"live",source:"Scriptura; Carta doctrinară"},
 planned("barbati_c2_lupta","Lupta din interiorul bărbatului","Rușine, furie, izolare, pornografie, statut și pasivitate.",7),
 planned("barbati_c3_relatii","Bărbatul în relații","Prietenie, singurătate, apropiere, limite și curăție.",6),
 planned("barbati_c4_sot","Soț care iubește asemenea lui Hristos","Legământ, ascultare, conflict, fidelitate și responsabilitate comună.",7),
 planned("barbati_c5_tata","Tată prezent","Afecțiune, disciplină fără mânie, credință și repararea relației.",6),
]}
const womenShelf:LibraryShelf={id:"lib_femei",title:"Viața de femeie",blurb:"Femeie formată de Scriptură, nu redusă la imagine, rol sau așteptările social media.",courses:[
 {id:"femei_c1_formare",title:"Femeie după inima lui Dumnezeu",forWhom:"Vrei să înțelegi filiația, demnitatea trupului, tăria, limitele și vocea.",plannedLessons:7,lessonIds:liveCourses.femei_c1_formare,state:"live",source:"Scriptura; Carta doctrinară"},
 planned("femei_c2_lupta","Lupta din interiorul femeii","Comparație, rușine corporală, validare, abandon, perfecționism și relații toxice.",7),
 planned("femei_c3_relatii","Femeia în relații","Prietenie, singurătate, discernământ, limite și siguranță.",6),
 planned("femei_c4_sotie","Soție, parteneră de legământ","Respect, voce, comunicare, intimitate, muncă și ajutor în criză.",7),
 planned("femei_c5_mama","Mamă fără să se piardă pe sine","Maternitate, vinovăție, oboseală, disciplină și copilul care crește.",6),
]}
const spiritualShelf:LibraryShelf={id:"lib_spiritual",title:"Lumea nevăzută și libertatea",blurb:"Îngeri, demoni, discernământ și libertatea în Hristos — fără folclor, panică sau diagnostice prin ecran.",courses:[
 {id:"spiritual_c1_lumea_nevazuta",title:"Lumea nevăzută: ce spune Biblia",forWhom:"Vrei să înțelegi îngerii, demonii și autoritatea lui Iisus.",plannedLessons:6,lessonIds:liveCourses.spiritual_c1_lumea_nevazuta,state:"live",source:"Scriptura; Carta doctrinară; cercetare Allen Nolan"},
 {id:"spiritual_c2_discernamant",title:"Discerne lupta",forWhom:"Nu știi dacă trăirea vine din fire, lume, traumă, boală sau atac spiritual.",plannedLessons:6,lessonIds:liveCourses.spiritual_c2_discernamant,state:"live",source:"Scriptura; Carta doctrinară; îngrijire interdisciplinară"},
 {id:"spiritual_c3_blessings",title:"Blesteme, legături și uși deschise",forWhom:"Te temi de trecut, practici oculte sau tipare de familie.",plannedLessons:6,lessonIds:liveCourses.spiritual_c3_blessings,state:"live",source:"Scriptura; Carta doctrinară"},
 {id:"spiritual_c4_libertate",title:"Libertate și autoritate în Hristos",forWhom:"Vrei să înțelegi pocăința, renunțarea, împotrivirea și rugăciunea pentru eliberare.",plannedLessons:7,lessonIds:liveCourses.spiritual_c4_libertate,state:"live",source:"Scriptura; Carta doctrinară; practică și limite prezentate ca temă deschisă"},
]}
const baseShelves=base.SHELVES.map(s=>({...s,courses:[...s.courses.map(open),...(s.id==="lib_rugaciune"?[contextualPrayerCourse]:[])]}))
export const SHELVES:LibraryShelf[]=[...baseShelves,identityShelf,menShelf,womenShelf,spiritualShelf]
export function visibleShelves(){return SHELVES.filter(s=>!s.gated)}
export function getShelf(id:string){return SHELVES.find(s=>s.id===id)}
export const ALL_LIBRARY_COURSES=SHELVES.flatMap(s=>s.courses)
export function getLibraryCourse(id:string){return ALL_LIBRARY_COURSES.find(c=>c.id===id)}
export const courseIsOpen=base.courseIsOpen
export const nextCourseLesson=base.nextCourseLesson
export const LIBRARY_LESSONS:Lesson[]=[...base.LIBRARY_LESSONS,...FUNDAMENTUL_LESSONS,...DOCTRINE_BIBLIA_LESSONS,...DOCTRINE_BISERICA_LESSONS,...RUGACIUNE_INCEPUT_LESSONS,...RUGACIUNI_CONTEXTUALE_LESSONS,...CASNICIE_LESSONS,...BANI_LESSONS,...MUNCA_LESSONS,...INTEGRITATE_LESSONS,...TIMP_LESSONS,...TRASEE_COPII_LESSONS,...TRASEE_ADOLESCENTI_LESSONS,...IDENTITATE_BARBATI_FEMEI_LESSONS,...SPIRITUAL_LUMEA_LESSONS,...SPIRITUAL_DISCERN_LESSONS,...SPIRITUAL_BLESTEM_LESSONS,...SPIRITUAL_LIBERTATE_LESSONS]
export function findLibraryLesson(id:string){return LIBRARY_LESSONS.find(l=>l.id===id)}
export function libraryCourseLessons(courseId:string):Lesson[]{const c=getLibraryCourse(courseId);return c?c.lessonIds.map(findLibraryLesson).filter((x):x is Lesson=>Boolean(x)):[]}
export const WRITING_ORDER=["identitate_c2_caracter","barbati_c2_lupta","femei_c2_lupta","barbati_c3_relatii","femei_c3_relatii","barbati_c4_sot","femei_c4_sotie","barbati_c5_tata","femei_c5_mama",...base.WRITING_ORDER.filter(id=>!["lib_fundamentul","doctrine_c1_biblia","doctrine_c3_biserica","lib_rug_inceput","lib_casnicie","lib_bani","lib_munca","lib_integritate","lib_timp","lib_micii_facut","lib_copii_cine_sunt","lib_copii_emotii","lib_teens_identitate","lib_teens_indoieli"].includes(id))]
