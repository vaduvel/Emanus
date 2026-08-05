import { numeriChapter, teaching } from "./numeriHelpers.js"
import { numeriPassage } from "./numeriText.js"
import { NUMERI_STATUSES } from "./numeriPublication.js"

/*
 * Cartea Numeri, explicată pe unități de sens.
 *
 * Textul biblic: păstrat separat în numeriText.ts (fișierele numeriTextN.ts).
 * Explicația: scrisă pentru Emanus după cercetarea textului. Nu se copiază
 * formularea niciunui predicator sau comentator.
 */

export const NUMERI_25 = numeriChapter({
  number: 25,
  title: "Numeri 25 — Baal-Peor și râvna lui Fineas",
  summary:
    "După patru capitole în care Balaam nu a putut blâstema Israel din afară, poporul cade singur în păcat prin curvia cu fiicele Moabului și idolatria la Baal-Peor. Mânia DOMNULUI se aprinde și o urgie ucide 24.000 de israeliți, până când Fineas, plin de râvnă, oprește judecata printr-o intervenție directă, primind un legământ de pace și preoție veșnică.",
  literaryContext:
    "Acest capitol încheie tragic secțiunea Balaam: ceea ce niciun blestem extern nu putuse face — să aducă pierzarea asupra lui Israel — se întâmplă prin păcatul intern al poporului Însăși. Numeri 31:16 va confirma mai târziu că această cursă fusese chiar sfătuită de Balaam Însăși, arătând că el a găsit o cale indirectă de a face rău lui Israel, deși nu putuse să-l blesteme direct.",
  historicalContext:
    "Baal-Peor era un cult canaanit legat de fertilitate, practicat pe muntele Peor — același loc unde Balac îl dusese pe Balaam pentru a treia sa încercare de blestem în Numeri 23:28. Cultele de fertilitate din regiune implicau frecvent relații sexuale rituale ca parte a adorării zeității, explicând legătura directă dintre curvie și idolatrie în acest capitol.",
  units: [
    {
      id: "numeri-25-1-3",
      ref: "Numeri 25:1-3",
      heading: "Curvia cu Moabul și idolatria la Baal-Peor",
      text: numeriPassage(25, 1, 3),
      teaching: teaching(
        "La Șitim, poporul care rezistase la 40 de ani de încercări în pustie — foamete, sete, atacuri, chiar șerpi arzători — cade în păcat nu prin forță, ci prin ademenire: „ei au poftit poporul la jertfele zeilor lor; poporul a mâncat și s-a închinat zeilor lor.”",
        "Curvia și idolatria sunt legate direct: „Israel s-a alipit de Baal-Peor” nu este doar o abatere morală, ci o rupere a legământului cu DOMNUL în favoarea unui zeu străin. Răspunsul este imediat: „mânia DOMNULUI S-a aprins împotriva lui Israel”.",
      ),
      words: [],
      crossRefs: ["Numeri 31:16", "Osea 9:10", "1 Corinteni 10:8"],
      forYourHeart:
        "Cel mai mare pericol pentru poporul lui Dumnezeu nu vine adesea din afară, prin forță sau blestem, ci din interior, prin ademenire și compromis treptat.",
    },
    {
      id: "numeri-25-4-5",
      ref: "Numeri 25:4-5",
      heading: "Porunca judecății asupra căpeteniilor",
      text: numeriPassage(25, 4, 5),
      teaching: teaching(
        "DOMNUL cere o judecată exemplară și publică: „spânzură pe toate căpeteniile poporului înaintea DOMNULUI, în fața soarelui”, ca să se depărteze mânia aprinsă de la Israel. Judecata trebuia să fie văzută, nu ascunsă, arătând seriozitatea păcatului comis.",
        "Moise transmite porunca judecătorilor lui Israel: „ucideți fiecare dintre oamenii voștri pe cei ce s-au alipit de Baal-Peor!” — responsabilitatea de a purifica tabăra era distribuită către fiecare conducător local, nu doar centralizată la Moise.",
      ),
      words: [],
      crossRefs: ["Deuteronom 13:6-11"],
      forYourHeart:
        "Păcatul care amenință să corupă întregul popor cere o judecată la fel de publică și de serioasă pe cât a fost de publică abaterea.",
    },
    {
      id: "numeri-25-6-9",
      ref: "Numeri 25:6-9",
      heading: "Râvna lui Fineas oprește urgia",
      text: numeriPassage(25, 6, 9),
      teaching: teaching(
        "În mijlocul unei adunări care plângea la intrarea Cortului Întâlnirii, un bărbat din Israel aduce sfidător o madianită chiar sub ochii lui Moise și ai întregii adunări — un act de răzvrătire deschisă în fața judecății deja declarate.",
        "Fineas, fiul lui Eleazar, se scoală fără poruncă explicită, ia o suliță și îi străpunge pe amândoi deodată. Acțiunea lui, deși violentă, oprește imediat urgia care ucisese deja 24.000 de oameni — răvna lui pentru sfințenia DOMNULUI a făcut ceea ce judecata formală încă nu apâta pe deplin.",
      ),
      words: [],
      crossRefs: ["Psalmul 106:29-31", "1 Corinteni 10:8"],
      forYourHeart:
        "O râvnă curată și curăjoasă pentru sfințenia lui Dumnezeu poate opri o judecată care altfel ar continua să se întindă asupra multora.",
    },
    {
      id: "numeri-25-10-13",
      ref: "Numeri 25:10-13",
      heading: "Legământul de pace cu Fineas",
      text: numeriPassage(25, 10, 13),
      teaching: teaching(
        "DOMNUL vorbește El Însăși despre motivația lui Fineas: „a abătut mânia Mea de la fiii lui Israel, plin fiind de râvna Mea în mijlocul lor” — nu răzbunare personală, ci identificare cu râvna Însăși a lui Dumnezeu pentru sfințenia poporului Său.",
        "Recompensa este remarcabilă: „legământul unei preoții veșnice” pentru Fineas și urmașii lui. Aceasta plasează linia preoției veșnice a lui Aaron prin descendența specifică a lui Fineas, ca răsplată pentru că „a făcut ispășire pentru fiii lui Israel”.",
      ),
      words: [],
      crossRefs: ["Psalmul 106:30-31", "1 Cronici 6:4-15"],
      forYourHeart:
        "Râvna care aduce ispășire și îndepărtează mânia lui Dumnezeu de la alții este recunoscută și răsplătită de El, chiar dincolo de generația care a acționat.",
    },
    {
      id: "numeri-25-14-15",
      ref: "Numeri 25:14-15",
      heading: "Numele celor uciși: Zimri și Cozbi",
      text: numeriPassage(25, 14, 15),
      teaching: teaching(
        "Textul reține numele exacte ale celor doi vinovați: Zimri, fiul lui Salu, căpetenie a unei case părintești a simeoniților, și Cozbi, fiica lui Ţur, cap al unor neamuri madianite. Faptul că ambii proveneau din familii cu funcții de conducere arată că păcatul nu venise doar de la oamenii de rând, ci ajunsese până la căpetenii.",
      ),
      words: [],
      crossRefs: [],
      forYourHeart:
        "Păcatul nu ale bine numai pe cei simpli; cănd atinge și pe cei puși în funcții de conducere, consecințele afectează întregul popor.",
    },
    {
      id: "numeri-25-16-18",
      ref: "Numeri 25:16-18",
      heading: "Porunca împotriva madianiților",
      text: numeriPassage(25, 16, 18),
      teaching: teaching(
        "DOMNUL identifică sursa externă a ispitei: madianiții și-au fost vrăjmași „prin vicleniile lor cu care v-au amăgit în lucrul lui Peor”. Porunca este clară: „tratați-i pe madianiți ca pe niște vrăjmași și loviți-i”, pregătind răzbunarea care va veni în Numeri 31.",
        "Această poruncire nu este răzbunare arbitrară, ci răspuns direct la o strategie deliberată de coruperea a lui Israel prin ademenire spirituală și sexuală — o formă de război mai subtilă, dar la fel de periculoasă, ca o luptă cu sabia.",
      ),
      words: [],
      crossRefs: ["Numeri 31:1-3"],
      forYourHeart:
        "Ademenirea deliberată spre păcat este o formă de război spiritual la fel de reală și periculoasă ca o confruntare armată directă.",
    },
  ],
  prayer:
    "Doamne, păzește-mi inima de ademenirea treptată spre compromis, care este adesea mai periculoasă decât un atac deschis împotriva credinței mele.\n\nDă-mi râvna lui Fineas — nu pentru răzbunare personală, ci pentru sfințenia Ta și pentru binele celor din jurul meu.\n\nÎnvață-mă să văd legătura dintre idolatrie și necurăție, și să fug de amb ele cu toată seriozitatea.\n\nȘi mulțumescu-Ţi că o râvnă curată pentru Tine poate opri judecata și aduce ispășire pentru alții. Amin.",
  status: NUMERI_STATUSES[25],
})
