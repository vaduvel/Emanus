import type { Lesson } from "../domain.js"

type CourseLessonLoader = () => Promise<readonly Lesson[]>

const loadBaseHar: CourseLessonLoader = () =>
  import("./doctrineHar2.js").then((module) => module.DOCTRINE_HAR_LESSONS)
const loadBaseVesnicia: CourseLessonLoader = () =>
  import("./doctrineVesnicia2.js").then((module) => module.DOCTRINE_VESNICIA_LESSONS)
const loadPildeTatal: CourseLessonLoader = () =>
  import("./pildeTatal2.js").then((module) => module.PILDE_TATAL_LESSONS)
const loadPildeFiul: CourseLessonLoader = () =>
  import("./pildeFiul2.js").then((module) => module.PILDE_FIUL_LESSONS)
const loadPildeImparatia: CourseLessonLoader = () =>
  import("./pildeImparatia2.js").then((module) => module.PILDE_IMPARATIA_LESSONS)
const loadPildeVesnicia: CourseLessonLoader = () =>
  import("./pildeVesnicia2.js").then((module) => module.PILDE_VESNICIA_LESSONS)
const loadFundamentul: CourseLessonLoader = () =>
  import("./fundamentul.js").then((module) => module.FUNDAMENTUL_LESSONS)
const loadDoctrinaBiblia: CourseLessonLoader = () =>
  import("./doctrineBiblia2.js").then((module) => module.DOCTRINE_BIBLIA_LESSONS)
const loadDoctrinaBiserica: CourseLessonLoader = () =>
  import("./doctrineBiserica2.js").then((module) => module.DOCTRINE_BISERICA_LESSONS)
const loadRugaciuneInceput: CourseLessonLoader = () =>
  import("./rugaciuneInceput3.js").then((module) => module.RUGACIUNE_INCEPUT_LESSONS)
const loadRugaciuniContextuale: CourseLessonLoader = () =>
  import("./rugaciuniContextuale.js").then((module) => module.RUGACIUNI_CONTEXTUALE_LESSONS)
const loadCasaBani: CourseLessonLoader = () =>
  import("./viataCasaBani.js").then((module) => [
    ...module.CASNICIE_LESSONS,
    ...module.BANI_LESSONS,
  ])
const loadViataZilnica: CourseLessonLoader = () =>
  import("./viataZilnica.js").then((module) => [
    ...module.MUNCA_LESSONS,
    ...module.INTEGRITATE_LESSONS,
    ...module.TIMP_LESSONS,
  ])
const loadAdolescenti: CourseLessonLoader = () =>
  import("./traseeAdolescenti.js").then((module) => module.TRASEE_ADOLESCENTI_LESSONS)
const loadCopii: CourseLessonLoader = () =>
  import("./traseeCopii.js").then((module) => module.TRASEE_COPII_LESSONS)
const loadIdentitate: CourseLessonLoader = () =>
  import("./identitateBarbatiFemei.js").then((module) => module.IDENTITATE_BARBATI_FEMEI_LESSONS)
const loadCaracter: CourseLessonLoader = () =>
  import("./caracterHristos.js").then((module) => module.CARACTER_HRISTOS_LESSONS)
const loadLupte: CourseLessonLoader = () =>
  import("./lupteInterioare.js").then((module) => module.LUPTE_INTERIOARE_LESSONS)
const loadRelatii: CourseLessonLoader = () =>
  import("./relatiiBarbatiFemei.js").then((module) => module.RELATII_BARBATI_FEMEI_LESSONS)
const loadSoti: CourseLessonLoader = () =>
  import("./sotiLegamant.js").then((module) => module.SOTI_LEGAMANT_LESSONS)
const loadParinti: CourseLessonLoader = () =>
  import("./parintiPrezenti.js").then((module) => module.PARINTI_PREZENTI_LESSONS)
const loadRelatiiComune1: CourseLessonLoader = () =>
  import("./relatiiComune1.js").then((module) => module.RELATII_COMUNE_1_LESSONS)
const loadRelatiiComune2: CourseLessonLoader = () =>
  import("./relatiiComune2.js").then((module) => module.RELATII_COMUNE_2_LESSONS)
const loadRelatiiComune3: CourseLessonLoader = () =>
  import("./relatiiComune3.js").then((module) => module.RELATII_COMUNE_3_LESSONS)
const loadLumeaNevazuta: CourseLessonLoader = () =>
  import("./spiritualLumeaNevazuta2.js").then((module) => module.SPIRITUAL_LUMEA_LESSONS)
const loadDiscernamant: CourseLessonLoader = () =>
  import("./spiritualDiscernamant2.js").then((module) => module.SPIRITUAL_DISCERN_LESSONS)
const loadBlesteme: CourseLessonLoader = () =>
  import("./spiritualBlesteme2.js").then((module) => module.SPIRITUAL_BLESTEM_LESSONS)
const loadLibertate: CourseLessonLoader = () =>
  import("./spiritualLibertate2.js").then((module) => module.SPIRITUAL_LIBERTATE_LESSONS)
const loadFormareDoctrinala: CourseLessonLoader = () =>
  import("./formareDoctrinala.js").then((module) => module.FORMARE_DOCTRINALA_LESSONS)
const loadPsalmiSiDoliu: CourseLessonLoader = () =>
  import("./psalmiSiDoliu.js").then((module) => module.PSALMI_SI_DOLIU_LESSONS)
const loadDependente: CourseLessonLoader = () =>
  import("./dependenteDistincte.js").then((module) => module.DEPENDENTE_DISTINCTE_LESSONS)

const COURSE_LOADERS: Readonly<Record<string, CourseLessonLoader>> = {
  doctrine_c2_har: loadBaseHar,
  doctrine_c4_vesnicia: loadBaseVesnicia,
  parables_c1_tatal: loadPildeTatal,
  parables_c2_imparatia: loadPildeImparatia,
  parables_c3_fiul: loadPildeFiul,
  parables_c4_vesnicia: loadPildeVesnicia,
  lib_fundamentul: loadFundamentul,
  doctrine_c1_biblia: loadDoctrinaBiblia,
  doctrine_c3_biserica: loadDoctrinaBiserica,
  lib_rug_inceput: loadRugaciuneInceput,
  lib_rug_context: loadRugaciuniContextuale,
  lib_casnicie: loadCasaBani,
  lib_bani: loadCasaBani,
  lib_munca: loadViataZilnica,
  lib_integritate: loadViataZilnica,
  lib_timp: loadViataZilnica,
  lib_teens_identitate: loadAdolescenti,
  lib_teens_indoieli: loadAdolescenti,
  lib_micii_facut: loadCopii,
  lib_copii_cine_sunt: loadCopii,
  lib_copii_emotii: loadCopii,
  identitate_c1_chip: loadIdentitate,
  barbati_c1_formare: loadIdentitate,
  femei_c1_formare: loadIdentitate,
  identitate_c2_caracter: loadCaracter,
  barbati_c2_lupta: loadLupte,
  femei_c2_lupta: loadLupte,
  barbati_c3_relatii: loadRelatii,
  femei_c3_relatii: loadRelatii,
  barbati_c4_sot: loadSoti,
  femei_c4_sotie: loadSoti,
  barbati_c5_tata: loadParinti,
  femei_c5_mama: loadParinti,
  comun_c1_singuratate: loadRelatiiComune1,
  comun_c2_intalniri: loadRelatiiComune1,
  comun_c3_sexualitate: loadRelatiiComune2,
  comun_c4_limite: loadRelatiiComune2,
  comun_c5_siguranta: loadRelatiiComune3,
  comun_c6_partener: loadRelatiiComune3,
  comun_c7_copil: loadRelatiiComune3,
  spiritual_c1_lumea_nevazuta: loadLumeaNevazuta,
  spiritual_c2_discernamant: loadDiscernamant,
  spiritual_c3_blessings: loadBlesteme,
  spiritual_c4_libertate: loadLibertate,
  lib_intoarcerea: loadFormareDoctrinala,
  doctrine_c5_providenta: loadFormareDoctrinala,
  doctrine_c6_context: loadFormareDoctrinala,
  doctrine_c7_duhul_sfant: loadFormareDoctrinala,
  doctrine_c8_botez_cina: loadFormareDoctrinala,
  lib_rug_psalmi: loadPsalmiSiDoliu,
  pastoral_doliu_suicid: loadPsalmiSiDoliu,
  dependenta_alcool: loadDependente,
  dependenta_droguri: loadDependente,
  dependenta_jocuri: loadDependente,
}

export async function loadLibraryCourseLessons(courseId: string): Promise<Lesson[]> {
  const loader = COURSE_LOADERS[courseId]
  if (!loader) return []
  return (await loader()).filter((lesson) => lesson.courseId === courseId)
}
