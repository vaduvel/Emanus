import type { Lesson } from "../domain.js"
import { enrichLessonCollection } from "../interactionEnrichment.js"
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
import { RELATII_BARBATI_FEMEI_LESSONS } from "./relatiiBarbatiFemei.js"
import { SOTI_LEGAMANT_LESSONS } from "./sotiLegamant.js"
import { PARINTI_PREZENTI_LESSONS } from "./parintiPrezenti.js"
import { RELATII_COMUNE_1_LESSONS } from "./relatiiComune1.js"
import { RELATII_COMUNE_2_LESSONS } from "./relatiiComune2.js"
import { RELATII_COMUNE_3_LESSONS } from "./relatiiComune3.js"
import { SPIRITUAL_LUMEA_LESSONS } from "./spiritualLumeaNevazuta2.js"
import { SPIRITUAL_DISCERN_LESSONS } from "./spiritualDiscernamant2.js"
import { SPIRITUAL_BLESTEM_LESSONS } from "./spiritualBlesteme2.js"
import { SPIRITUAL_LIBERTATE_LESSONS } from "./spiritualLibertate2.js"
import { FORMARE_DOCTRINALA_LESSONS } from "./formareDoctrinala.js"
import { PSALMI_SI_DOLIU_LESSONS } from "./psalmiSiDoliu.js"
import { DEPENDENTE_DISTINCTE_LESSONS } from "./dependenteDistincte.js"

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
export * from "./relatiiBarbatiFemei.js"
export * from "./sotiLegamant.js"
export * from "./parintiPrezenti.js"
export * from "./relatiiComune1.js"
export * from "./relatiiComune2.js"
export * from "./relatiiComune3.js"
export * from "./spiritualLumeaNevazuta2.js"
export * from "./spiritualDiscernamant2.js"
export * from "./spiritualBlesteme2.js"
export * from "./spiritualLibertate2.js"
export * from "./conversationCourse.js"
export * from "./formareDoctrinala.js"
export * from "./psalmiSiDoliu.js"
export * from "./dependenteDistincte.js"

const ids=(p:string,n:number)=>Array.from({length:n},(_,i)=>`${p}${i+1}`)
const live:Record<string,string[]>={
 lib_fundamentul:ids("fund_l",8),lib_rug_context:ids("rug_context_l",11),lib_casnicie:ids("casnicie_l",6),lib_bani:ids("bani_l",5),lib_munca:ids("munca_l",5),lib_integritate:ids("integritate_l",4),lib_timp:ids("timp_l",4),
 lib_intoarcerea:ids("pocainta_l",6),lib_rug_psalmi:ids("psalmi_l",6),doctrine_c5_providenta:ids("providenta_l",6),doctrine_c6_context:ids("context_l",6),doctrine_c7_duhul_sfant:ids("duhul_l",6),doctrine_c8_botez_cina:ids("botez_cina_l",6),dependenta_alcool:ids("alcool_l",6),dependenta_droguri:ids("droguri_l",6),dependenta_jocuri:ids("jocuri_l",6),
 lib_micii_facut:ids("micii_facut_l",5),lib_copii_cine_sunt:ids("copii_identitate_l",5),lib_copii_emotii:ids("copii_emotii_l",4),lib_teens_identitate:ids("teens_identitate_l",5),lib_teens_indoieli:ids("teens_indoieli_l",5),
 identitate_c1_chip:ids("identitate_vocatie_l",6),identitate_c2_caracter:ids("caracter_hristos_l",7),barbati_c1_formare:ids("barbat_formare_l",7),barbati_c2_lupta:ids("barbat_lupta_l",7),barbati_c3_relatii:ids("barbat_relatii_l",6),barbati_c4_sot:ids("sot_hristos_l",7),barbati_c5_tata:ids("tata_prezent_l",6),femei_c1_formare:ids("femeie_formare_l",7),femei_c2_lupta:ids("femeie_lupta_l",7),femei_c3_relatii:ids("femeie_relatii_l",6),femei_c4_sotie:ids("sotie_legamant_l",7),femei_c5_mama:ids("mama_fara_pierdere_l",6),
 comun_c1_singuratate:ids("singuratate_l",5),comun_c2_intalniri:ids("intalniri_l",5),comun_c3_sexualitate:ids("sexualitate_l",6),comun_c4_limite:ids("limite_l",5),comun_c5_siguranta:ids("siguranta_l",6),comun_c6_partener:ids("partener_l",5),comun_c7_copil:ids("copil_indepartat_l",5),
 doctrine_c1_biblia:ids("biblia_l",6),doctrine_c3_biserica:ids("biserica_l",5),lib_rug_inceput:ids("rug_inceput_l",9),spiritual_c1_lumea_nevazuta:ids("spirit_lumea_l",6),spiritual_c2_discernamant:ids("spirit_discern_l",6),spiritual_c3_blessings:ids("spirit_blestem_l",6),spiritual_c4_libertate:ids("spirit_libertate_l",7),
}
const open=(c:LibraryCourse):LibraryCourse=>live[c.id]?{...c,lessonIds:live[c.id],plannedLessons:live[c.id].length,state:"live"}:c
const LIVE_COURSE_FOR_WHOM:Record<string,string>={
 identitate_c1_chip:"Te definești prin roluri, performanță sau părerea altora și vrei să-ți reașezi identitatea în lumina Scripturii.",
 identitate_c2_caracter:"Vrei să observi ce trăsături ale caracterului tău cer practică și formare după modelul lui Hristos.",
 barbati_c1_formare:"Simți presiunea stereotipurilor despre bărbăție și vrei repere biblice pentru o viață matură și responsabilă.",
 barbati_c2_lupta:"Te confrunți cu rușine, furie, izolare sau ispite și vrei să răspunzi cu adevăr și responsabilitate.",
 barbati_c3_relatii:"Vrei să comunici mai limpede, să respecți limitele și să fii prezent în relațiile importante.",
 barbati_c4_sot:"Ești soț sau te pregătești pentru căsătorie și vrei să practici iubirea jertfitoare, ascultarea și repararea relației.",
 barbati_c5_tata:"Ești tată și vrei să fii mai prezent, consecvent și atent la nevoile reale ale copilului tău.",
 femei_c1_formare:"Simți presiunea imaginii, a comparației sau a rolurilor și vrei repere biblice pentru formarea ta.",
 femei_c2_lupta:"Te lupți cu rușinea, comparația, frica sau resentimentul și vrei să le aduci în adevăr.",
 femei_c3_relatii:"Vrei să recunoști dinamici sănătoase, să pui limite și să comunici fără să te pierzi pe tine.",
 femei_c4_sotie:"Ești soție sau te pregătești pentru căsătorie și vrei să cultivi parteneriatul, respectul și dialogul sincer.",
 femei_c5_mama:"Te simți absorbită de rolul de mamă și vrei să păstrezi identitatea, limitele și relațiile importante.",
 comun_c1_singuratate:"Te simți singur chiar și între oameni și vrei să construiești apartenență prin pași mici și sinceri.",
 comun_c2_intalniri:"Ești la începutul unei relații sau cauți una și vrei criterii clare pentru alegeri, ritm și limite.",
 comun_c3_sexualitate:"Vrei să privești trupul, sexualitatea, pornografia și curăția fără rușine ascunsă sau răspunsuri simpliste.",
 comun_c4_limite:"Îți este greu să spui nu, să ceri acordul sau să respecți limitele și vrei să exersezi relații responsabile.",
 comun_c5_siguranta:"Ai trăit control, intimidare sau abuz și ai nevoie să recunoști pericolul și să cauți sprijin sigur.",
 comun_c6_partener:"Credința nu este împărtășită în cuplul tău și vrei să rămâi fidel fără presiune, dispreț sau izolare.",
 comun_c7_copil:"Relația cu copilul tău s-a răcit sau s-a rupt și vrei să păstrezi adevărul, răbdarea și o ușă deschisă.",
 spiritual_c1_lumea_nevazuta:"Ai întrebări despre îngeri, demoni și lupta spirituală și vrei să separi Scriptura de folclor și panică.",
 spiritual_c2_discernamant:"Vrei să deosebești ispita, suferința, responsabilitatea personală și limbajul biblic despre lupta spirituală.",
 spiritual_c3_blessings:"Te temi de blesteme, legături sau «uși deschise» și vrei să verifici aceste idei în context biblic.",
 spiritual_c4_libertate:"Cauți libertate și autoritate în Hristos și vrei repere biblice pentru rugăciune, rezistență și responsabilitate.",
}
const defaultForWhom=(id:string,title:string,state:"live"|"planned"):string=>{
 if(state==="planned")return `Cursul „${title}” este în pregătire; descrierea va fi publicată după revizia editorială.`
 const description=LIVE_COURSE_FOR_WHOM[id]
 if(!description)throw new Error(`Lipsește descrierea publicului pentru cursul live ${id}.`)
 return description
}
const course=(id:string,title:string,n:number,state:"live"|"planned"="planned",forWhom=defaultForWhom(id,title,state),extra:Partial<LibraryCourse>={}):LibraryCourse=>({id,title,forWhom,plannedLessons:n,lessonIds:state==="live"?live[id]:[],state,source:"Scriptura; Carta doctrinară; programa Emanus",...extra})
const shelf=(id:string,title:string,blurb:string,courses:LibraryCourse[]):LibraryShelf=>({id,title,blurb,courses})
const contextual=course("lib_rug_context","Rugăciuni pentru ritmul zilei",11,"live","Vrei rugăciuni pentru dimineață, muncă, masă, familie, călătorie, nevoi și seară.")
const providence=course("doctrine_c5_providenta","Providență, boală, disciplină și suferință",6,"live","Vrei adevăr despre suferință fără vină inventată și fără negarea disciplinei biblice.")
const context=course("doctrine_c6_context","Cum citesc Biblia în context",6,"live","Vrei să deosebești genul, contextul, descrierea, porunca, interpretarea și aplicația.")
const holySpirit=course("doctrine_c7_duhul_sfant","Duhul Sfânt și viața credinciosului",6,"live","Vrei să înțelegi Persoana, lucrarea, rodul, darurile și diferențele dintre tradiții.")
const baptismTable=course("doctrine_c8_botez_cina","Botezul, Cina și apartenența la Biserică",6,"live","Vrei temeiurile biblice și diferențele confesionale prezentate fără caricatură.")
const baseShelves=base.SHELVES.map(s=>({...s,courses:[...s.courses.map(open),...(s.id==="lib_intrebari"?[providence,holySpirit,baptismTable]:[]),...(s.id==="lib_cuvantul"?[context]:[]),...(s.id==="lib_rugaciune"?[contextual]:[])]}))
const identity=shelf("lib_identitate_vocatie","Identitate, trup și vocație","Om creat după chipul lui Dumnezeu și ucenic al lui Iisus înaintea rolurilor.",[course("identitate_c1_chip","Creat după chipul lui Dumnezeu",6,"live"),course("identitate_c2_caracter","Caracterul lui Hristos în mine",7,"live")])
const men=shelf("lib_barbati","Viața de bărbat","Bărbat format după chipul lui Hristos, nu după guru sau stereotipuri.",[course("barbati_c1_formare","Bărbat după chipul lui Hristos",7,"live"),course("barbati_c2_lupta","Lupta din interiorul bărbatului",7,"live"),course("barbati_c3_relatii","Bărbatul în relații",6,"live"),course("barbati_c4_sot","Soț care iubește asemenea lui Hristos",7,"live"),course("barbati_c5_tata","Tată prezent",6,"live")])
const women=shelf("lib_femei","Viața de femeie","Femeie formată de Scriptură, nu redusă la imagine, rol sau social media.",[course("femei_c1_formare","Femeie după inima lui Dumnezeu",7,"live"),course("femei_c2_lupta","Lupta din interiorul femeii",7,"live"),course("femei_c3_relatii","Femeia în relații",6,"live"),course("femei_c4_sotie","Soție, parteneră de legământ",7,"live"),course("femei_c5_mama","Mamă fără să se piardă pe sine",6,"live")])
const common=shelf("lib_relatii_comune","Relații, sexualitate și siguranță","Cursuri comune pentru femei și bărbați, fără presiunea statutului și fără acoperirea abuzului.",[course("comun_c1_singuratate","Singurătate și apartenență",5,"live"),course("comun_c2_intalniri","Întâlniri și discernământ",5,"live"),course("comun_c3_sexualitate","Trup, sexualitate, pornografie și curăție",6,"live"),course("comun_c4_limite","Limite și consimțământ",5,"live"),course("comun_c5_siguranta","Abuz, control și siguranță",6,"live"),course("comun_c6_partener","Partener necredincios",5,"live"),course("comun_c7_copil","Copil îndepărtat",5,"live")])
const spiritual=shelf("lib_spiritual","Lumea nevăzută și libertatea","Discernământ și libertate în Hristos fără folclor, panică sau diagnostic prin ecran.",[course("spiritual_c1_lumea_nevazuta","Lumea nevăzută: ce spune Biblia",6,"live"),course("spiritual_c2_discernamant","Discerne lupta",6,"live"),course("spiritual_c3_blessings","Blesteme, legături și uși deschise",6,"live"),course("spiritual_c4_libertate","Libertate și autoritate în Hristos",7,"live")])
const dependencies=shelf("lib_dependente","Ieșirea din dependențe","Adevăr biblic, tratament competent, oprirea accesului, reparare și o viață nouă — fără aceeași rețetă pentru probleme diferite.",[course("dependenta_alcool","Alcool: adevăr, tratament și trezvie",6,"live","Consumul te stăpânește, produce frică ori consecințe și ai nevoie de un plan sigur."),course("dependenta_droguri","Droguri: din robie spre viață",6,"live","Substanța îți controlează trupul, alegerile sau siguranța și ai nevoie de evaluare reală."),course("dependenta_jocuri","Jocuri de noroc: oprește pierderea",6,"live","Pariul, datoria și secretul au început să conducă banii, timpul sau relațiile.")])
const traumaticGrief=shelf("lib_doliu_traumatic","Doliu traumatic","Cursuri care nu se deschid până când materialul a primit revizia umană potrivită.",[course("pastoral_doliu_suicid","Doliu după pierderea prin sinucidere",5,"planned","Ai pierdut pe cineva prin sinucidere și ai nevoie de adevăr, siguranță și speranță fără verdicte inventate.",{requiredReviews:["pastoral","clinical"],approvedReviews:[],source:"Draft Emanus; publicarea cere revizie pastorală și clinică"})])
export const SHELVES:LibraryShelf[]=[...baseShelves,identity,men,women,common,dependencies,traumaticGrief,spiritual]
export function visibleShelves(){return SHELVES.filter(s=>!s.gated)}
export function getShelf(id:string){return SHELVES.find(s=>s.id===id)}
export const ALL_LIBRARY_COURSES=SHELVES.flatMap(s=>s.courses)
export function getLibraryCourse(id:string){return ALL_LIBRARY_COURSES.find(c=>c.id===id)}
export const courseIsOpen=base.courseIsOpen
export const nextCourseLesson=base.nextCourseLesson
const RAW_LIBRARY_LESSONS:Lesson[]=[...base.LIBRARY_LESSONS,...FUNDAMENTUL_LESSONS,...DOCTRINE_BIBLIA_LESSONS,...DOCTRINE_BISERICA_LESSONS,...RUGACIUNE_INCEPUT_LESSONS,...RUGACIUNI_CONTEXTUALE_LESSONS,...CASNICIE_LESSONS,...BANI_LESSONS,...MUNCA_LESSONS,...INTEGRITATE_LESSONS,...TIMP_LESSONS,...TRASEE_COPII_LESSONS,...TRASEE_ADOLESCENTI_LESSONS,...IDENTITATE_BARBATI_FEMEI_LESSONS,...CARACTER_HRISTOS_LESSONS,...LUPTE_INTERIOARE_LESSONS,...RELATII_BARBATI_FEMEI_LESSONS,...SOTI_LEGAMANT_LESSONS,...PARINTI_PREZENTI_LESSONS,...RELATII_COMUNE_1_LESSONS,...RELATII_COMUNE_2_LESSONS,...RELATII_COMUNE_3_LESSONS,...SPIRITUAL_LUMEA_LESSONS,...SPIRITUAL_DISCERN_LESSONS,...SPIRITUAL_BLESTEM_LESSONS,...SPIRITUAL_LIBERTATE_LESSONS,...FORMARE_DOCTRINALA_LESSONS,...PSALMI_SI_DOLIU_LESSONS,...DEPENDENTE_DISTINCTE_LESSONS]
export const LIBRARY_LESSONS:Lesson[]=enrichLessonCollection(
  RAW_LIBRARY_LESSONS,
  Object.fromEntries(ALL_LIBRARY_COURSES.map((course) => [course.id, course.ageHint])),
)
export function findLibraryLesson(id:string){return LIBRARY_LESSONS.find(l=>l.id===id)}
export function libraryCourseLessons(courseId:string):Lesson[]{const c=getLibraryCourse(courseId);return c?c.lessonIds.map(findLibraryLesson).filter((x):x is Lesson=>Boolean(x)):[]}
const done=new Set(Object.keys(live))
export const WRITING_ORDER=base.WRITING_ORDER.filter((id,i,a)=>!done.has(id)&&a.indexOf(id)===i)
