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
import { CARACTER_HRISTOS_LESSONS } from "./caracterHristos.js"
import { LUPTE_INTERIOARE_LESSONS } from "./lupteInterioare.js"
import { SPIRITUAL_LUMEA_LESSONS } from "./spiritualLumeaNevazuta2.js"
import { SPIRITUAL_DISCERN_LESSONS } from "./spiritualDiscernamant2.js"
import { SPIRITUAL_BLESTEM_LESSONS } from "./spiritualBlesteme2.js"
import { SPIRITUAL_LIBERTATE_LESSONS } from "./spiritualLibertate2.js"

export type { CourseState, LibraryCourse, LibraryShelf } from "./index.js"
export * from "./fundamentul.js"
export * from "./doctrineBiblia2.js"
export * from "./doctrineBiserica2.js"
export * from "./rugaciuneInceput3.js"
export * from "./rugaciuniContextuale.js"
export * from "./viataCasaBani.js"
export * from "./viataZilnica.js"
export * from "./traseeAdolescenti.js"
export * from "./traseeCopii.js"
export * from "./identitateBarbatiFemei.js"
export * from "./caracterHristos.js"
export * from "./lupteInterioare.js"
export * from "./spiritualLumeaNevazuta2.js"
export * from "./spiritualDiscernamant2.js"
export * from "./spiritualBlesteme2.js"
export * from "./spiritualLibertate2.js"

const ids=(p:string,n:number)=>Array.from({length:n},(_,i)=>`${p}${i+1}`)
const live:Record<string,string[]>={
 lib_fundamentul:ids("fund_l",8),lib_rug_context:ids("rug_context_l",11),lib_casnicie:ids("casnicie_l",6),lib_bani:ids("bani_l",5),lib_munca:ids("munca_l",5),lib_integritate:ids("integritate_l",4),lib_timp:ids("timp_l",4),
 lib_micii_facut:ids("micii_facut_l",5),lib_copii_cine_sunt:ids("copii_identitate_l",5),lib_copii_emotii:ids("copii_emotii_l",4),lib_teens_identitate:ids("teens_identitate_l",5),lib_teens_indoieli:ids("teens_indoieli_l",5),
 identitate_c1_chip:ids("identitate_vocatie_l",6),identitate_c2_caracter:ids("caracter_hristos_l",7),barbati_c1_formare:ids("barbat_formare_l",7),barbati_c2_lupta:ids("barbat_lupta_l",7),femei_c1_formare:ids("femeie_formare_l",7),femei_c2_lupta:ids("femeie_lupta_l",7),
 doctrine_c1_biblia:ids("biblia_l",6),doctrine_c3_biserica:ids("biserica_l",5),lib_rug_inceput:ids("rug_inceput_l",9),spiritual_c1_lumea_nevazuta:ids("spirit_lumea_l",6),spiritual_c2_discernamant:ids("spirit_discern_l",6),spiritual_c3_blessings:ids("spirit_blestem_l",6),spiritual_c4_libertate:ids("spirit_libertate_l",7),
}
const open=(c:LibraryCourse):LibraryCourse=>live[c.id]?{...c,lessonIds:live[c.id],plannedLessons:live[c.id].length,state:"live"}:c
const course=(id:string,title:string,n:number,state:"live"|"planned"="planned",forWhom="Vrei formare biblică practică în această etapă."):LibraryCourse=>({id,title,forWhom,plannedLessons:n,lessonIds:state==="live"?live[id]:[],state,source:"Scriptura; Carta doctrinară; programa Emanus"})
const shelf=(id:string,title:string,blurb:string,courses:LibraryCourse[]):LibraryShelf=>({id,title,blurb,courses})
const contextual=course("lib_rug_context","Rugăciuni pentru ritmul zilei",11,"live","Vrei rugăciuni pentru dimineață, muncă, masă, familie, călătorie, nevoi și seară.")
const baseShelves=base.SHELVES.map(s=>({...s,courses:[...s.courses.map(open),...(s.id==="lib_rugaciune"?[contextual]:[])]}))
const identity=shelf("lib_identitate_vocatie","Identitate, trup și vocație","Om creat după chipul lui Dumnezeu și ucenic al lui Iisus înaintea rolurilor.",[
 course("identitate_c1_chip","Creat după chipul lui Dumnezeu",6,"live"),course("identitate_c2_caracter","Caracterul lui Hristos în mine",7,"live")])
const men=shelf("lib_barbati","Viața de bărbat","Bărbat format după chipul lui Hristos, nu după guru sau stereotipuri.",[
 course("barbati_c1_formare","Bărbat după chipul lui Hristos",7,"live"),course("barbati_c2_lupta","Lupta din interiorul bărbatului",7,"live"),course("barbati_c3_relatii","Bărbatul în relații",6),course("barbati_c4_sot","Soț care iubește asemenea lui Hristos",7),course("barbati_c5_tata","Tată prezent",6)])
const women=shelf("lib_femei","Viața de femeie","Femeie formată de Scriptură, nu redusă la imagine, rol sau social media.",[
 course("femei_c1_formare","Femeie după inima lui Dumnezeu",7,"live"),course("femei_c2_lupta","Lupta din interiorul femeii",7,"live"),course("femei_c3_relatii","Femeia în relații",6),course("femei_c4_sotie","Soție, parteneră de legământ",7),course("femei_c5_mama","Mamă fără să se piardă pe sine",6)])
const spiritual=shelf("lib_spiritual","Lumea nevăzută și libertatea","Discernământ și libertate în Hristos fără folclor, panică sau diagnostic prin ecran.",[
 course("spiritual_c1_lumea_nevazuta","Lumea nevăzută: ce spune Biblia",6,"live"),course("spiritual_c2_discernamant","Discerne lupta",6,"live"),course("spiritual_c3_blessings","Blesteme, legături și uși deschise",6,"live"),course("spiritual_c4_libertate","Libertate și autoritate în Hristos",7,"live")])
export const SHELVES:LibraryShelf[]=[...baseShelves,identity,men,women,spiritual]
export function visibleShelves(){return SHELVES.filter(s=>!s.gated)}
export function getShelf(id:string){return SHELVES.find(s=>s.id===id)}
export const ALL_LIBRARY_COURSES=SHELVES.flatMap(s=>s.courses)
export function getLibraryCourse(id:string){return ALL_LIBRARY_COURSES.find(c=>c.id===id)}
export const courseIsOpen=base.courseIsOpen
export const nextCourseLesson=base.nextCourseLesson
export const LIBRARY_LESSONS:Lesson[]=[...base.LIBRARY_LESSONS,...FUNDAMENTUL_LESSONS,...DOCTRINE_BIBLIA_LESSONS,...DOCTRINE_BISERICA_LESSONS,...RUGACIUNE_INCEPUT_LESSONS,...RUGACIUNI_CONTEXTUALE_LESSONS,...CASNICIE_LESSONS,...BANI_LESSONS,...MUNCA_LESSONS,...INTEGRITATE_LESSONS,...TIMP_LESSONS,...TRASEE_COPII_LESSONS,...TRASEE_ADOLESCENTI_LESSONS,...IDENTITATE_BARBATI_FEMEI_LESSONS,...CARACTER_HRISTOS_LESSONS,...LUPTE_INTERIOARE_LESSONS,...SPIRITUAL_LUMEA_LESSONS,...SPIRITUAL_DISCERN_LESSONS,...SPIRITUAL_BLESTEM_LESSONS,...SPIRITUAL_LIBERTATE_LESSONS]
export function findLibraryLesson(id:string){return LIBRARY_LESSONS.find(l=>l.id===id)}
export function libraryCourseLessons(courseId:string):Lesson[]{const c=getLibraryCourse(courseId);return c?c.lessonIds.map(findLibraryLesson).filter((x):x is Lesson=>Boolean(x)):[]}
const done=new Set(Object.keys(live))
export const WRITING_ORDER=["barbati_c3_relatii","femei_c3_relatii","barbati_c4_sot","femei_c4_sotie","barbati_c5_tata","femei_c5_mama",...base.WRITING_ORDER].filter((id,i,a)=>!done.has(id)&&a.indexOf(id)===i)
