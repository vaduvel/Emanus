// Mesajul zilei — cardul distribuibil (docs/27 §3).
//
// REGULA CARE NU SE NEGOCIAZĂ (docs/00-DIRECTIE §7, D-005, docs/27 §3.2):
// aplicația nu pune cuvinte noi în gura lui Dumnezeu. Orice text la persoana I
// este parafraza unui verset REAL, iar `verseRef` apare pe card, la vedere.
// Formula „Dumnezeu îți transmite astăzi” + frază inventată este interzisă.
//
// Conținut original Emanus. Cardurile care circulă pe rețele aparțin autorilor
// lor și nu se copiază (docs/27 §1.2). Versetele sunt Cornilescu, ediția
// corectată (RCCV), colaționate verset cu verset. ATENȚIE: drepturile asupra
// traducerii Cornilescu NU sunt lămurite pentru România (docs/39).
//
// Stările vin din vocabularul unic (docs/41, `needs.ts`). Câmpul `moods` s-a
// numit așa până la unificare; acum e `needs` și cunoaște toate cele 20.
//
// Cardurile stau în cinci fișiere, ca lunile devoționalului: cele 45 dintâi aici,
// restul pe grupe de durere (pierdere, familie, robie, tăcere).
import type { AgeCategoryId, GrowthAxisId } from "./domain.js"
import { LEGACY_MOOD_IDS, needById, NEEDS, type MessageMood, type NeedId } from "./needs.js"

export type { MessageMood, NeedId }

/** Cele 7 stări vechi din check-in, cu etichetele luate din vocabularul unic. */
export const MESSAGE_MOODS: { id: MessageMood; label: string }[] = LEGACY_MOOD_IDS.map((id) => ({
  id,
  label: needById(id)?.label ?? id,
}))

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
  /** Stările pentru care se potrivește cardul (docs/41). */
  needs: NeedId[]
  background: CardBackground
  ageVariants?: Partial<Record<AgeCategoryId, { title: CardTitle; body: string }>>
}

import { MESSAGE_CARDS_PIERDERE } from "./messageCardsPierdere.js"
import { MESSAGE_CARDS_FAMILIE } from "./messageCardsFamilie.js"
import { MESSAGE_CARDS_ROBIE } from "./messageCardsRobie.js"
import { MESSAGE_CARDS_TACERE } from "./messageCardsTacere.js"

/** Cele 45 de carduri scrise întâi, mutate pe vocabularul unic. */
const CARDS_BAZA: MessageCard[] = [
  {
    id: "msg_ajunge_zilei",
    title: "Dumnezeu ți-a spus deja:",
    body: "Ajunge zilei necazul ei. Nu duci azi și povara de mâine.",
    verseRef: "Matei 6:34",
    verseText:
      "Nu vă îngrijorați dar de ziua de mâine; căci ziua de mâine se va îngrijora de ea însăși. Ajunge zilei necazul ei.",
    axis: "emotional_peace",
    needs: ["obosit", "speriat"],
    background: "pergament",
  },
  {
    id: "msg_candela",
    title: "Astăzi, din Scriptură, pentru tine:",
    body: "Cuvântul Meu îți luminează pasul următor. Nu tot drumul — pasul.",
    verseRef: "Psalmul 119:105",
    verseText: "Cuvântul Tău este o candelă pentru picioarele mele și o lumină pe cărarea mea.",
    axis: "living_faith",
    needs: ["fara_directie", "speriat"],
    background: "pergament-cald",
  },
  {
    id: "msg_nu_te_las_orfan",
    title: "Dumnezeu ți-a spus deja:",
    body: "Nu te las orfan. Mă întorc la tine.",
    verseRef: "Ioan 14:18",
    verseText: "Nu vă voi lăsa orfani, Mă voi întoarce la voi.",
    axis: "identity",
    needs: ["singur", "doliu"],
    background: "pergament",
  },
  {
    id: "msg_nici_o_osandire",
    title: "Dumnezeu ți-a spus deja:",
    body: "Nu mai e nicio osândire pentru tine. Prețul a fost plătit o dată.",
    verseRef: "Romani 8:1",
    verseText: "Acum dar nu este nicio osândire pentru cei ce sunt în Hristos Isus.",
    axis: "freedom",
    needs: ["vinovat"],
    background: "pergament-umbra",
  },
  {
    id: "msg_sapat_in_mana",
    title: "Dumnezeu ți-a spus deja:",
    body: "Te-am săpat în mâinile Mele. Nu te pot uita.",
    verseRef: "Isaia 49:16",
    verseText: "Iată că te-am săpat pe mâinile Mele, și zidurile tale sunt totdeauna înaintea ochilor Mei!",
    axis: "identity",
    needs: ["singur", "obosit"],
    background: "pergament",
  },
  {
    id: "msg_te_chem_pe_nume",
    title: "Dumnezeu ți-a spus deja:",
    body: "Te chem pe nume. Ești al Meu.",
    verseRef: "Isaia 43:1",
    verseText: "Nu te teme de nimic, căci Eu te izbăvesc, te chem pe nume: ești al Meu.",
    axis: "identity",
    needs: ["speriat", "fara_directie"],
    background: "pergament-cald",
  },
  {
    id: "msg_odihna",
    title: "Dumnezeu ți-a spus deja:",
    body: "Vino la Mine, tu care ești trudit și împovărat. Eu îți dau odihnă.",
    verseRef: "Matei 11:28",
    verseText: "Veniți la Mine, toți cei trudiți și împovărați, și Eu vă voi da odihnă.",
    axis: "emotional_peace",
    needs: ["obosit"],
    background: "pergament",
  },
  {
    id: "msg_pacea_mea",
    title: "Dumnezeu ți-a spus deja:",
    body: "Ți-am lăsat pacea Mea. Nu se ia după cum îți merge azi.",
    verseRef: "Ioan 14:27",
    verseText: "Vă las pacea, vă dau pacea Mea. Nu v-o dau cum o dă lumea.",
    axis: "emotional_peace",
    needs: ["speriat", "obosit"],
    background: "pergament-cald",
  },
  {
    id: "msg_asteapta_domnul",
    title: "Ce îți spune Dumnezeu astăzi, din Cuvântul Său:",
    body: "Cine Mă așteaptă nu rămâne fără putere. Își schimbă puterea.",
    verseRef: "Isaia 40:31",
    verseText:
      "Dar cei ce se încred în Domnul își înnoiesc puterea; ei zboară ca vulturii; aleargă, și nu obosesc, umblă, și nu ostenesc.",
    axis: "living_faith",
    needs: ["in_asteptare", "obosit"],
    background: "pergament",
  },
  {
    id: "msg_nu_te_voi_lasa",
    title: "Dumnezeu ți-a spus deja:",
    body: "Nicidecum n-am să te las, cu niciun chip nu te voi părăsi.",
    verseRef: "Evrei 13:5",
    verseText: "Căci El Însuși a zis: „Nicidecum n-am să te las, cu niciun chip nu te voi părăsi.”",
    axis: "identity",
    needs: ["singur", "speriat", "departe"],
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
    needs: ["vinovat"],
    background: "pergament-umbra",
  },
  {
    id: "msg_aproape_de_inima_zdrobita",
    title: "Ce îți spune Dumnezeu astăzi, din Cuvântul Său:",
    body: "Sunt aproape de cei cu inima înfrântă. Nu M-am dat la o parte.",
    verseRef: "Psalmul 34:18",
    verseText: "Domnul este aproape de cei cu inima înfrântă și mântuiește pe cei cu duhul zdrobit.",
    axis: "emotional_peace",
    needs: ["singur", "vinovat", "doliu", "casa_rupta"],
    background: "pergament-umbra",
  },
  {
    id: "msg_planurile_mele",
    title: "Dumnezeu ți-a spus deja:",
    body: "Gândurile Mele cu tine sunt gânduri de pace, nu de nenorocire.",
    verseRef: "Ieremia 29:11",
    verseText:
      "Căci Eu știu gândurile pe care le am cu privire la voi, zice Domnul, gânduri de pace, și nu de nenorocire, ca să vă dau un viitor și o nădejde.",
    axis: "living_faith",
    needs: ["fara_directie", "in_asteptare"],
    background: "pergament-cald",
  },
  {
    id: "msg_toate_lucrurile",
    title: "Ce îți spune Dumnezeu astăzi, din Cuvântul Său:",
    body: "Nu tot ce ți se întâmplă e bun. Dar Eu lucrez spre bine și din ce e rău.",
    verseRef: "Romani 8:28",
    verseText: "De altă parte, știm că toate lucrurile lucrează împreună spre binele celor ce iubesc pe Dumnezeu.",
    axis: "living_faith",
    needs: ["fara_directie", "in_asteptare", "de_ce"],
    background: "pergament",
  },
  {
    id: "msg_ma_indur",
    title: "Ce îți spune Dumnezeu astăzi, din Cuvântul Său:",
    body: "Mă îndur de tine cum se îndură un tată de copilul lui.",
    verseRef: "Psalmul 103:13",
    verseText: "Cum se îndură un tată de copiii lui, așa Se îndură Domnul de cei ce se tem de El.",
    axis: "identity",
    needs: ["vinovat", "obosit"],
    background: "pergament-cald",
  },
  {
    id: "msg_libertate",
    title: "Dumnezeu ți-a spus deja:",
    body: "Dacă Fiul te face slobod, ești slobod cu adevărat.",
    verseRef: "Ioan 8:36",
    verseText: "Deci, dacă Fiul vă face slobozi, veți fi cu adevărat slobozi.",
    axis: "freedom",
    needs: ["vinovat", "fara_directie", "patima_bautura", "pofta"],
    background: "pergament",
  },
  {
    id: "msg_lauda",
    title: "Ce îți spune Dumnezeu astăzi, din Cuvântul Său:",
    body: "Mulțumirea ta nu e o formalitate. E felul în care Îți amintești că nu ești singur.",
    verseRef: "Psalmul 103:2",
    verseText: "Binecuvântează, suflete, pe Domnul și nu uita niciuna din binefacerile Lui!",
    axis: "character",
    needs: ["recunoscator"],
    background: "pergament-cald",
  },
  {
    id: "msg_lucrarea_lui",
    title: "Dumnezeu ți-a spus deja:",
    body: "Ești lucrarea Mea. Încă lucrez la tine.",
    verseRef: "Efeseni 2:10",
    verseText:
      "Căci noi suntem lucrarea Lui și am fost zidiți în Hristos Isus pentru faptele bune pe care le-a pregătit Dumnezeu mai dinainte ca să umblăm în ele.",
    axis: "identity",
    needs: ["vinovat", "fara_directie"],
    background: "pergament",
  },
  {
    id: "msg_dus_la_capat",
    title: "Ce îți spune Dumnezeu astăzi, din Cuvântul Său:",
    body: "Cel care a început lucrarea în tine o duce și la capăt. Nu tu.",
    verseRef: "Filipeni 1:6",
    verseText:
      "Sunt încredințat că Acela care a început în voi această bună lucrare o va isprăvi până în ziua lui Isus Hristos.",
    axis: "character",
    needs: ["obosit", "in_asteptare"],
    background: "pergament",
  },
  {
    id: "msg_pasii_mei",
    title: "Ce îți spune Dumnezeu astăzi, din Cuvântul Său:",
    body: "Nu te bizui pe înțelepciunea ta. Eu îți netezesc cărările.",
    verseRef: "Proverbele 3:5-6",
    verseText:
      "Încrede-te în Domnul din toată inima ta și nu te bizui pe înțelepciunea ta! Recunoaște-L în toate căile tale, și El îți va netezi cărările.",
    axis: "living_faith",
    needs: ["fara_directie"],
    background: "pergament",
  },
  {
    id: "msg_lacrimile",
    title: "Ce îți spune Dumnezeu astăzi, din Cuvântul Său:",
    body: "Lacrimile tale nu s-au pierdut. Le-am pus la păstrare.",
    verseRef: "Psalmul 56:8",
    verseText: "Tu numeri pașii vieții mele de pribeag; pune-mi lacrimile în burduful Tău! Nu sunt ele scrise în cartea Ta?",
    axis: "emotional_peace",
    needs: ["singur", "in_asteptare", "doliu"],
    background: "pergament-umbra",
  },
  {
    id: "msg_apa_vie",
    title: "Dumnezeu ți-a spus deja:",
    body: "Dacă îți este sete, vino la Mine și bea.",
    verseRef: "Ioan 7:37",
    verseText: "Dacă însetează cineva, să vină la Mine și să bea.",
    axis: "living_faith",
    needs: ["obosit", "fara_directie"],
    background: "pergament-cald",
  },
  {
    id: "msg_pasarile_cerului",
    title: "Ce îți spune Dumnezeu astăzi, din Cuvântul Său:",
    body: "Hrănesc păsările cerului. Tu prețuiești mai mult decât ele.",
    verseRef: "Matei 6:26",
    verseText:
      "Uitați-vă la păsările cerului: ele nici nu seamănă, nici nu seceră și nici nu strâng nimic în grânare, și totuși Tatăl vostru cel ceresc le hrănește. Oare nu sunteți voi cu mult mai de preț decât ele?",
    axis: "emotional_peace",
    needs: ["speriat", "obosit", "bani"],
    background: "pergament",
  },
  {
    id: "msg_pace_desavarsita",
    title: "Dumnezeu ți-a spus deja:",
    body: "Celui cu inima tare Îi chezășuiesc pacea, pentru că se încrede în Mine.",
    verseRef: "Isaia 26:3",
    verseText: "Celui cu inima tare, Tu-i chezășuiești pacea; da, pacea, căci se încrede în Tine.",
    axis: "emotional_peace",
    needs: ["speriat", "in_asteptare"],
    background: "pergament",
  },
  {
    id: "msg_te_intaresc",
    title: "Dumnezeu ți-a spus deja:",
    body: "Nu te teme, căci Eu sunt cu tine. Te sprijin cu dreapta Mea biruitoare.",
    verseRef: "Isaia 41:10",
    verseText:
      "Nu te teme, căci Eu sunt cu tine; nu te uita cu îngrijorare, căci Eu sunt Dumnezeul tău; Eu te întăresc, tot Eu îți vin în ajutor. Eu te sprijin cu dreapta Mea biruitoare.",
    axis: "emotional_peace",
    needs: ["speriat", "singur", "boala"],
    background: "pergament-cald",
  },
  {
    id: "msg_arunca_ingrijorarile",
    title: "Ce îți spune Dumnezeu astăzi, din Cuvântul Său:",
    body: "Pune jos ce duci. Îmi pasă de tine.",
    verseRef: "1 Petru 5:7",
    verseText: "Și aruncați asupra Lui toate îngrijorările voastre, căci El Însuși îngrijește de voi.",
    axis: "emotional_peace",
    needs: ["obosit", "speriat"],
    background: "pergament",
  },
  {
    id: "msg_departe_ca_rasaritul",
    title: "Dumnezeu ți-a spus deja:",
    body: "Ți-am dus păcatele departe, cât e răsăritul de apus.",
    verseRef: "Psalmul 103:12",
    verseText: "Cât de departe este răsăritul de apus, atât de mult depărtează El fărădelegile noastre de la noi.",
    axis: "freedom",
    needs: ["vinovat"],
    background: "pergament-umbra",
  },
  {
    id: "msg_alb_ca_zapada",
    title: "Dumnezeu ți-a spus deja:",
    body: "Vino să stăm de vorbă. Ce e roșu ca purpura se face alb ca zăpada.",
    verseRef: "Isaia 1:18",
    verseText:
      "Veniți totuși să ne judecăm, zice Domnul. De vor fi păcatele voastre cum e cârmâzul, se vor face albe ca zăpada; de vor fi roșii ca purpura, se vor face ca lâna.",
    axis: "freedom",
    needs: ["vinovat"],
    background: "pergament-umbra",
  },
  {
    id: "msg_tata_a_alergat",
    title: "Ce îți spune Dumnezeu astăzi, din Cuvântul Său:",
    body: "Te văd de departe. Alerg spre tine înainte să-ți termini scuza.",
    verseRef: "Luca 15:20",
    verseText:
      "Când era încă departe, tatăl său l-a văzut și i s-a făcut milă de el, a alergat de a căzut pe grumazul lui și l-a sărutat mult.",
    axis: "identity",
    needs: ["vinovat", "singur", "copil_departat"],
    background: "pergament-cald",
  },
  {
    id: "msg_inima_noua",
    title: "Dumnezeu ți-a spus deja:",
    body: "Îți dau o inimă nouă. Nu o repar pe cea de piatră.",
    verseRef: "Ezechiel 36:26",
    verseText:
      "Vă voi da o inimă nouă și voi pune în voi un duh nou; voi scoate din trupul vostru inima de piatră și vă voi da o inimă de carne.",
    axis: "character",
    needs: ["vinovat", "fara_directie", "patima_bautura", "pofta"],
    background: "pergament",
  },
  {
    id: "msg_nu_minte",
    title: "Ce îți spune Dumnezeu astăzi, din Cuvântul Său:",
    body: "Ce ți-am spus are un timp al lui. Dacă întârzie, așteaptă-l.",
    verseRef: "Habacuc 2:3",
    verseText:
      "Căci este o prorocie a cărei vreme este hotărâtă, se apropie de împlinire și nu va minți; dacă zăbovește, așteapt-o, căci va veni și se va împlini negreșit.",
    axis: "living_faith",
    needs: ["in_asteptare", "rugaciune_fara_raspuns"],
    background: "pergament",
  },
  {
    id: "msg_intareste_ti_inima",
    title: "Ce îți spune Dumnezeu astăzi, din Cuvântul Său:",
    body: "Așteaptă-Mă. Întărește-ți inima și așteaptă-Mă.",
    verseRef: "Psalmul 27:14",
    verseText: "Nădăjduiește în Domnul! Fii tare, îmbărbătează-ți inima și nădăjduiește în Domnul!",
    axis: "living_faith",
    needs: ["in_asteptare", "obosit"],
    background: "pergament",
  },
  {
    id: "msg_frumos_la_vremea_lui",
    title: "Ce îți spune Dumnezeu astăzi, din Cuvântul Său:",
    body: "Fac orice lucru frumos la vremea lui. Nu la vremea ta.",
    verseRef: "Eclesiastul 3:11",
    verseText: "Orice lucru El îl face frumos la vremea lui.",
    axis: "living_faith",
    needs: ["in_asteptare", "fara_directie"],
    background: "pergament-cald",
  },
  {
    id: "msg_nu_dormiteaza",
    title: "Dumnezeu ți-a spus deja:",
    body: "Nu dormitez și nu adorm cât timp te păzesc.",
    verseRef: "Psalmul 121:3-4",
    verseText: "Iată că nu dormitează, nici nu doarme Cel ce păzește pe Israel.",
    axis: "emotional_peace",
    needs: ["speriat", "singur"],
    background: "pergament-umbra",
  },
  {
    id: "msg_unde_sa_ma_duc",
    title: "Ce îți spune Dumnezeu astăzi, din Cuvântul Său:",
    body: "Nu există loc în care să ajungi și Eu să nu fiu deja acolo.",
    verseRef: "Psalmul 139:7-8",
    verseText:
      "Unde mă voi duce departe de Duhul Tău și unde voi fugi departe de Fața Ta? Dacă mă voi sui în cer, Tu ești acolo.",
    axis: "identity",
    needs: ["singur", "fara_directie", "departe"],
    background: "pergament",
  },
  {
    id: "msg_tata_al_orfanilor",
    title: "Dumnezeu ți-a spus deja:",
    body: "Dau o familie celor singuri. Nu te-am uitat în casa goală.",
    verseRef: "Psalmul 68:6",
    verseText: "Dumnezeu dă o familie celor părăsiți, El izbăvește pe prinșii de război și-i face fericiți.",
    axis: "relationships",
    needs: ["singur", "casa_rupta"],
    background: "pergament-cald",
  },
  {
    id: "msg_multumiti_pentru_toate",
    title: "Ce îți spune Dumnezeu astăzi, din Cuvântul Său:",
    body: "Mulțumește în orice împrejurare. Nu pentru orice — în orice.",
    verseRef: "1 Tesaloniceni 5:18",
    verseText: "Mulțumiți lui Dumnezeu pentru toate lucrurile, căci aceasta este voia lui Dumnezeu, în Hristos Isus, cu privire la voi.",
    axis: "character",
    needs: ["recunoscator"],
    background: "pergament",
  },
  {
    id: "msg_ziua_facuta_de_domnul",
    title: "Ce îți spune Dumnezeu astăzi, din Cuvântul Său:",
    body: "Ziua asta e făcută de Mine. Poți să te bucuri în ea.",
    verseRef: "Psalmul 118:24",
    verseText: "Aceasta este ziua pe care a făcut-o Domnul: să ne bucurăm și să ne veselim în ea!",
    axis: "character",
    needs: ["recunoscator"],
    background: "pergament-cald",
  },
  {
    id: "msg_orice_dar_bun",
    title: "Ce îți spune Dumnezeu astăzi, din Cuvântul Său:",
    body: "Orice lucru bun din viața ta a coborât de la Mine.",
    verseRef: "Iacov 1:17",
    verseText:
      "Orice ni se dă bun și orice dar desăvârșit este de sus, coborându-se de la Tatăl luminilor, în care nu este nici schimbare, nici umbră de mutare.",
    axis: "character",
    needs: ["recunoscator"],
    background: "pergament",
  },
  {
    id: "msg_te_invat_calea",
    title: "Dumnezeu ți-a spus deja:",
    body: "Te învăț calea pe care să mergi și nu-Mi iau ochii de la tine.",
    verseRef: "Psalmul 32:8",
    verseText:
      "„Eu”, zice Domnul, „te voi învăța și-ți voi arăta calea pe care trebuie s-o urmezi, te voi sfătui și voi avea privirea îndreptată asupra ta.”",
    axis: "living_faith",
    needs: ["fara_directie"],
    background: "pergament",
  },
  {
    id: "msg_intelepciune",
    title: "Ce îți spune Dumnezeu astăzi, din Cuvântul Său:",
    body: "Dacă nu știi ce să faci, cere-Mi. Dau fără să mustru.",
    verseRef: "Iacov 1:5",
    verseText:
      "Dacă vreunuia dintre voi îi lipsește înțelepciunea, s-o ceară de la Dumnezeu, care dă tuturor cu mână largă și fără mustrare, și ea îi va fi dată.",
    axis: "living_faith",
    needs: ["fara_directie", "in_asteptare"],
    background: "pergament",
  },
  {
    id: "msg_glas_inapoia_ta",
    title: "Dumnezeu ți-a spus deja:",
    body: "Când o iei la stânga sau la dreapta, auzi înapoia ta: aceasta e calea.",
    verseRef: "Isaia 30:21",
    verseText:
      "Urechile tale vor auzi după tine glasul care va zice: „Iată drumul, mergeți pe el!”, când veți voi să vă mai abateți la dreapta sau la stânga.",
    axis: "living_faith",
    needs: ["fara_directie"],
    background: "pergament-cald",
  },
  {
    id: "msg_puterea_in_slabiciune",
    title: "Dumnezeu ți-a spus deja:",
    body: "Harul Meu îți este de ajuns. Puterea Mea se vede tocmai unde ești slab.",
    verseRef: "2 Corinteni 12:9",
    verseText: "Harul Meu îți este de ajuns, căci puterea Mea în slăbiciune este făcută desăvârșită.",
    axis: "character",
    needs: ["obosit", "vinovat", "boala"],
    background: "pergament-umbra",
  },
  {
    id: "msg_indurari_noi",
    title: "Ce îți spune Dumnezeu astăzi, din Cuvântul Său:",
    body: "Îndurările Mele se înnoiesc în fiecare dimineață. Și în asta.",
    verseRef: "Plângerile lui Ieremia 3:22-23",
    verseText:
      "Bunătățile Domnului nu s-au sfârșit, îndurările Lui nu sunt la capăt, ci se înnoiesc în fiecare dimineață. Și credincioșia Ta este atât de mare!",
    axis: "freedom",
    needs: ["vinovat", "obosit"],
    background: "pergament-cald",
  },
  {
    id: "msg_nimic_nu_desparte",
    title: "Dumnezeu ți-a spus deja:",
    body: "Nimic din tot ce există nu te poate despărți de dragostea Mea.",
    verseRef: "Romani 8:38-39",
    verseText:
      "Căci sunt bine încredințat că nici moartea, nici viața... nici o altă făptură nu vor fi în stare să ne despartă de dragostea lui Dumnezeu.",
    axis: "identity",
    needs: ["singur", "speriat", "doliu", "frica_moarte"],
    background: "pergament",
  },
]

export const MESSAGE_CARDS: MessageCard[] = [
  ...CARDS_BAZA,
  ...MESSAGE_CARDS_PIERDERE,
  ...MESSAGE_CARDS_FAMILIE,
  ...MESSAGE_CARDS_ROBIE,
  ...MESSAGE_CARDS_TACERE,
]

/** Verificare de siguranță: un card fără verset-ancoră nu are ce căuta în app. */
export function isCardAnchored(card: MessageCard): boolean {
  return card.verseRef.trim().length > 0 && card.verseText.trim().length > 0
}

export function messageCardById(id: string): MessageCard | null {
  return MESSAGE_CARDS.find((c) => c.id === id) ?? null
}

export function cardsForNeed(need: NeedId): MessageCard[] {
  return MESSAGE_CARDS.filter((c) => c.needs.includes(need))
}

/**
 * Cât de acoperită e fiecare stare față de ținta din docs/41. Folosită de
 * verificarea `check:pergament` și de raportul editorial.
 */
export function needCoverage(): {
  need: NeedId
  label: string
  have: number
  target: number
  missing: number
}[] {
  return NEEDS.map((n) => {
    const have = cardsForNeed(n.id).length
    return {
      need: n.id,
      label: n.label,
      have,
      target: n.target,
      missing: Math.max(0, n.target - have),
    }
  })
}

/** Stările pentru care nu s-a scris încă niciun card. */
export function needsWithoutCards(): NeedId[] {
  return NEEDS.filter((n) => cardsForNeed(n.id).length === 0).map((n) => n.id)
}

/** Id-uri scrise de două ori. Cu cinci fișiere, greșeala devine ușoară. */
export function duplicateCardIds(): string[] {
  const seen = new Set<string>()
  const dupes = new Set<string>()
  for (const card of MESSAGE_CARDS) {
    if (seen.has(card.id)) dupes.add(card.id)
    seen.add(card.id)
  }
  return [...dupes]
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
 *
 * Ocolirea repetării se face pe VERSET, nu doar pe card (docs/41 §5.6): două
 * carduri pe același verset i se par omului același lucru spus de două ori.
 * Dacă ocolirea pe verset nu mai lasă nimic, se slăbește la ocolirea pe card,
 * ca omul să primească totuși ceva potrivit cu starea lui.
 */
export function pickMessageCard(input: {
  need?: NeedId
  /** @deprecated numele vechi al stării; folosește `need`. */
  mood?: MessageMood
  focusAxis?: GrowthAxisId
  recentIds?: string[]
  recentVerseRefs?: string[]
  date?: Date
}): MessageCard {
  const recentIds = new Set(input.recentIds ?? [])
  const recentRefs = new Set(input.recentVerseRefs ?? [])
  const date = input.date ?? new Date()
  const need: NeedId | undefined = input.need ?? input.mood

  const byNeed = need ? MESSAGE_CARDS.filter((c) => c.needs.includes(need)) : []
  const byAxis = input.focusAxis ? MESSAGE_CARDS.filter((c) => c.axis === input.focusAxis) : []
  const lists = [byNeed, byAxis, MESSAGE_CARDS]

  for (const list of lists) {
    const fresh = list.filter((c) => !recentIds.has(c.id) && !recentRefs.has(c.verseRef))
    if (fresh.length > 0) return fresh[dayNumber(date) % fresh.length]
  }
  for (const list of lists) {
    const fresh = list.filter((c) => !recentIds.has(c.id))
    if (fresh.length > 0) return fresh[dayNumber(date) % fresh.length]
  }
  return MESSAGE_CARDS[dayNumber(date) % MESSAGE_CARDS.length]
}
