import type { Lesson } from "./domain.js"

export type LessonSafety = NonNullable<Lesson["safety"]>

const ABUSE_NOTICE =
  "Lecția atinge abuzul, controlul sau pericolul. Poți opri oricând. Nu confrunta singur o persoană periculoasă și nu folosi lecția în locul protecției, autorităților sau ajutorului competent."
const SEXUAL_VIOLENCE_NOTICE =
  "Lecția atinge constrângerea sexuală, trauma sau încălcarea consimțământului. Poți opri oricând și nu trebuie să scrii detalii. Ce ți s-a făcut nu devine păcatul tău."
const SUBSTANCE_DEPENDENCY_NOTICE =
  "Lecția atinge dependența, compulsia sau recăderea. Poți opri oricând. Sevrajul și riscul medical cer evaluare de specialitate; rugăciunea și pocăința nu înlocuiesc tratamentul."
const BEHAVIORAL_COMPULSION_NOTICE =
  "Lecția atinge o compulsie comportamentală, pierderea controlului sau recăderea. Poți opri oricând. Barierele concrete, responsabilizarea și ajutorul psihologic ori financiar competent pot face parte din recuperare."
const DEBT_NOTICE =
  "Lecția atinge datoria și comportamentele care o pot agrava. Poți opri oricând. Protejează banii esențiali și caută ajutor financiar competent; dacă există joc de noroc sau cumpărături compulsive, tratează și cauza, nu doar ratele."
const CHANGE_PATTERN_NOTICE =
  "Lecția atinge un tipar greu, compulsia sau recăderea. Poți opri oricând și poți cere ajutor competent. Dacă tiparul implică alcool, droguri ori medicamente, oprirea bruscă poate necesita evaluare medicală."
const MENTAL_HEALTH_NOTICE =
  "Lecția atinge depresia, trauma sau gândurile de autovătămare. Poți opri oricând. Dacă nu ești în siguranță sau te gândești să îți faci rău, folosește acum ecranul de ajutor."
const SUICIDE_LOSS_NOTICE =
  "Lecția atinge pierderea prin sinucidere, vina traumatică și propriile gânduri de moarte. Nu îți cere detalii despre metodă. Poți opri oricând; dacă nu ești în siguranță, folosește acum ecranul de ajutor."

/**
 * Lista este editorială și intenționată. Nu o înlocuim cu detecție după cuvinte:
 * multe lecții numesc abuzul doar pentru a-l delimita, fără să ceară omului să
 * intre în propria traumă.
 */
export const LESSON_SAFETY_POLICIES: Readonly<Record<string, LessonSafety>> = {
  rusine_l1: {
    topic: "abuse",
    notice:
      "Lecția poate atinge o faptă gravă, avortul, infidelitatea sau răul făcut împotriva ta. Scrie numai cât poți duce în siguranță și nu lua legătura cu un agresor.",
  },
  rusine_l5: { topic: "abuse", notice: ABUSE_NOTICE },
  neiertare_o1: {
    topic: "abuse",
    notice:
      "Lecția vorbește despre răni, nedreptate și abuz. Nu îți cere să contactezi persoana care te-a rănit și nu îți cere să rămâi într-un loc periculos.",
  },
  neiertare_o2: {
    topic: "abuse",
    notice:
      "Lecția te invită să numești o rană. Scrie numai cât poți duce în siguranță acum; poți opri conversația oricând și poți cere ajutor.",
  },
  neiertare_l6: {
    topic: "abuse",
    notice:
      "Iertarea din această lecție nu înseamnă împăcare, contact cu agresorul, renunțarea la dreptate sau întoarcerea într-un loc periculos.",
  },
  suferinta_l1: {
    topic: "mental_health",
    notice:
      "Lecția atinge pierderea, boala și durerea care poate copleși. Poți opri oricând. Dacă nu ești în siguranță sau te gândești să îți faci rău, folosește acum ecranul de ajutor.",
  },
  suferinta_l5: {
    topic: "mental_health",
    notice:
      "Lecția vorbește despre funcționare, boală și ajutor. Simptomele noi, severe sau urgente cer evaluare medicală; rugăciunea nu înlocuiește tratamentul.",
  },
  schimbare_l1: { topic: "dependency", notice: CHANGE_PATTERN_NOTICE },
  schimbare_l5: { topic: "dependency", notice: CHANGE_PATTERN_NOTICE },
  schimbare_l6: { topic: "mental_health", notice: MENTAL_HEALTH_NOTICE },
  impreuna_l3: { topic: "violence", notice: ABUSE_NOTICE },
  impreuna_l4: { topic: "abuse", notice: ABUSE_NOTICE },
  umblare_l6: { topic: "mental_health", notice: MENTAL_HEALTH_NOTICE },
  biserica_l4: { topic: "abuse", notice: ABUSE_NOTICE },
  pilda_robul_datornic: { topic: "abuse", notice: ABUSE_NOTICE },
  rug_inceput_l7: { topic: "abuse", notice: ABUSE_NOTICE },
  casnicie_l4: { topic: "sexual_violence", notice: SEXUAL_VIOLENCE_NOTICE },
  casnicie_l6: { topic: "violence", notice: ABUSE_NOTICE },
  bani_l3: { topic: "dependency", notice: DEBT_NOTICE },
  barbat_lupta_l4: { topic: "dependency", notice: BEHAVIORAL_COMPULSION_NOTICE },
  barbat_lupta_l7: { topic: "self_harm", notice: MENTAL_HEALTH_NOTICE },
  femeie_lupta_l7: { topic: "mental_health", notice: MENTAL_HEALTH_NOTICE },
  femeie_relatii_l6: { topic: "violence", notice: ABUSE_NOTICE },
  sot_hristos_l4: { topic: "sexual_violence", notice: SEXUAL_VIOLENCE_NOTICE },
  sot_hristos_l7: { topic: "violence", notice: ABUSE_NOTICE },
  sotie_legamant_l4: { topic: "sexual_violence", notice: SEXUAL_VIOLENCE_NOTICE },
  sotie_legamant_l7: { topic: "violence", notice: ABUSE_NOTICE },
  mama_fara_pierdere_l3: { topic: "self_harm", notice: MENTAL_HEALTH_NOTICE },
  sexualitate_l3: { topic: "dependency", notice: BEHAVIORAL_COMPULSION_NOTICE },
  sexualitate_l5: { topic: "sexual_violence", notice: SEXUAL_VIOLENCE_NOTICE },
  sexualitate_l6: { topic: "sexual_violence", notice: SEXUAL_VIOLENCE_NOTICE },
  limite_l4: { topic: "violence", notice: ABUSE_NOTICE },
  limite_l5: { topic: "abuse", notice: ABUSE_NOTICE },
  siguranta_l1: { topic: "abuse", notice: ABUSE_NOTICE },
  siguranta_l2: { topic: "abuse", notice: ABUSE_NOTICE },
  siguranta_l3: { topic: "violence", notice: ABUSE_NOTICE },
  siguranta_l4: { topic: "abuse", notice: ABUSE_NOTICE },
  siguranta_l5: { topic: "abuse", notice: ABUSE_NOTICE },
  siguranta_l6: { topic: "violence", notice: ABUSE_NOTICE },
  partener_l5: { topic: "violence", notice: ABUSE_NOTICE },
  copii_emotii_l3: {
    topic: "self_harm",
    notice:
      "Lecția vorbește cu un copil despre tristețe și gânduri de autovătămare. Dacă te gândești să te rănești, nu continua singur: spune imediat unui adult sigur și folosește ecranul de ajutor. În pericol imediat, sună la 112 împreună cu un adult.",
  },
  spirit_discern_l4: {
    topic: "mental_health",
    notice:
      "Lecția discută suferința psihică și limbajul despre posesie. Nu pune singur un diagnostic spiritual sau medical. În pericol ori criză, caută imediat ajutor competent.",
  },
  alcool_l1: { topic: "dependency", notice: SUBSTANCE_DEPENDENCY_NOTICE },
  alcool_l2: { topic: "dependency", notice: SUBSTANCE_DEPENDENCY_NOTICE },
  alcool_l3: { topic: "dependency", notice: SUBSTANCE_DEPENDENCY_NOTICE },
  alcool_l4: { topic: "dependency", notice: SUBSTANCE_DEPENDENCY_NOTICE },
  alcool_l5: { topic: "dependency", notice: SUBSTANCE_DEPENDENCY_NOTICE },
  alcool_l6: { topic: "dependency", notice: SUBSTANCE_DEPENDENCY_NOTICE },
  droguri_l1: { topic: "dependency", notice: SUBSTANCE_DEPENDENCY_NOTICE },
  droguri_l2: { topic: "dependency", notice: SUBSTANCE_DEPENDENCY_NOTICE },
  droguri_l3: { topic: "dependency", notice: SUBSTANCE_DEPENDENCY_NOTICE },
  droguri_l4: { topic: "dependency", notice: SUBSTANCE_DEPENDENCY_NOTICE },
  droguri_l5: { topic: "dependency", notice: SUBSTANCE_DEPENDENCY_NOTICE },
  droguri_l6: { topic: "dependency", notice: SUBSTANCE_DEPENDENCY_NOTICE },
  jocuri_l1: { topic: "dependency", notice: BEHAVIORAL_COMPULSION_NOTICE },
  jocuri_l2: { topic: "dependency", notice: BEHAVIORAL_COMPULSION_NOTICE },
  jocuri_l3: { topic: "dependency", notice: BEHAVIORAL_COMPULSION_NOTICE },
  jocuri_l4: { topic: "dependency", notice: BEHAVIORAL_COMPULSION_NOTICE },
  jocuri_l5: { topic: "dependency", notice: BEHAVIORAL_COMPULSION_NOTICE },
  jocuri_l6: { topic: "dependency", notice: BEHAVIORAL_COMPULSION_NOTICE },
  doliu_suicid_l1: { topic: "suicide_loss", notice: SUICIDE_LOSS_NOTICE },
  doliu_suicid_l2: { topic: "suicide_loss", notice: SUICIDE_LOSS_NOTICE },
  doliu_suicid_l3: { topic: "suicide_loss", notice: SUICIDE_LOSS_NOTICE },
  doliu_suicid_l4: { topic: "suicide_loss", notice: SUICIDE_LOSS_NOTICE },
  doliu_suicid_l5: { topic: "suicide_loss", notice: SUICIDE_LOSS_NOTICE },
}

export function safetyPolicyForLesson(lessonId: string): LessonSafety | undefined {
  return LESSON_SAFETY_POLICIES[lessonId]
}
