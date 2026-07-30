import type { Lesson } from "../domain.js"
import type { LibraryCourse, LibraryShelf } from "./index.js"
import * as base from "./index.js"
import { FUNDAMENTUL_LESSONS } from "./fundamentul.js"
import { DOCTRINE_BIBLIA_LESSONS } from "./doctrineBiblia2.js"
import { DOCTRINE_BISERICA_LESSONS } from "./doctrineBiserica2.js"
import { RUGACIUNE_INCEPUT_LESSONS } from "./rugaciuneInceput3.js"
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
 lib_fundamentul:ids("fund_l",8),
 doctrine_c1_biblia:ids("biblia_l",6),doctrine_c3_biserica:ids("biserica_l",5),lib_rug_inceput:ids("rug_inceput_l",9),
 spiritual_c1_lumea_nevazuta:ids("spirit_lumea_l",6),spiritual_c2_discernamant:ids("spirit_discern_l",6),
 spiritual_c3_blessings:ids("spirit_blestem_l",6),spiritual_c4_libertate:ids("spirit_libertate_l",7),
}
const open=(course:LibraryCourse):LibraryCourse=>liveCourses[course.id]?{...course,lessonIds:liveCourses[course.id],plannedLessons:liveCourses[course.id].length,state:"live"}:course
const spiritualShelf:LibraryShelf={
 id:"lib_spiritual",title:"Lumea nevăzută și libertatea",blurb:"Îngeri, demoni, discernământ și libertatea în Hristos — fără folclor, panică sau diagnostice prin ecran.",courses:[
  {id:"spiritual_c1_lumea_nevazuta",title:"Lumea nevăzută: ce spune Biblia",forWhom:"Vrei să înțelegi îngerii, demonii și autoritatea lui Iisus.",plannedLessons:6,lessonIds:liveCourses.spiritual_c1_lumea_nevazuta,state:"live",source:"Scriptura; Carta doctrinară; cercetare Allen Nolan"},
  {id:"spiritual_c2_discernamant",title:"Discerne lupta",forWhom:"Nu știi dacă trăirea vine din fire, lume, traumă, boală sau atac spiritual.",plannedLessons:6,lessonIds:liveCourses.spiritual_c2_discernamant,state:"live",source:"Scriptura; Carta doctrinară; îngrijire interdisciplinară"},
  {id:"spiritual_c3_blessings",title:"Blesteme, legături și uși deschise",forWhom:"Te temi de trecut, practici oculte sau tipare de familie.",plannedLessons:6,lessonIds:liveCourses.spiritual_c3_blessings,state:"live",source:"Scriptura; Carta doctrinară"},
  {id:"spiritual_c4_libertate",title:"Libertate și autoritate în Hristos",forWhom:"Vrei să înțelegi pocăința, renunțarea, împotrivirea și rugăciunea pentru eliberare.",plannedLessons:7,lessonIds:liveCourses.spiritual_c4_libertate,state:"live",source:"Scriptura; Carta doctrinară; practică și limite prezentate ca temă deschisă"},
 ]
}
export const SHELVES:LibraryShelf[]=[...base.SHELVES.map(s=>({...s,courses:s.courses.map(open)})),spiritualShelf]
export function visibleShelves(){return SHELVES.filter(s=>!s.gated)}
export function getShelf(id:string){return SHELVES.find(s=>s.id===id)}
export const ALL_LIBRARY_COURSES=SHELVES.flatMap(s=>s.courses)
export function getLibraryCourse(id:string){return ALL_LIBRARY_COURSES.find(c=>c.id===id)}
export const courseIsOpen=base.courseIsOpen
export const nextCourseLesson=base.nextCourseLesson
export const LIBRARY_LESSONS:Lesson[]=[...base.LIBRARY_LESSONS,...FUNDAMENTUL_LESSONS,...DOCTRINE_BIBLIA_LESSONS,...DOCTRINE_BISERICA_LESSONS,...RUGACIUNE_INCEPUT_LESSONS,...SPIRITUAL_LUMEA_LESSONS,...SPIRITUAL_DISCERN_LESSONS,...SPIRITUAL_BLESTEM_LESSONS,...SPIRITUAL_LIBERTATE_LESSONS]
export function findLibraryLesson(id:string){return LIBRARY_LESSONS.find(l=>l.id===id)}
export function libraryCourseLessons(courseId:string):Lesson[]{const c=getLibraryCourse(courseId);return c?c.lessonIds.map(findLibraryLesson).filter((x):x is Lesson=>Boolean(x)):[]}
export const WRITING_ORDER=base.WRITING_ORDER.filter(id=>!["lib_fundamentul","doctrine_c1_biblia","doctrine_c3_biserica","lib_rug_inceput"].includes(id))
