import { deuteronomChapter, teaching } from "./deuteronomHelpers.js"
import { deuteronomPassage } from "./deuteronomText.js"
import { DEUTERONOM_STATUSES } from "./deuteronomPublication.js"

/*
 * Cartea Deuteronom, explicată pe unități de sens.
 */

export const DEUTERONOM_17 = deuteronomChapter({
  number: 17,
  title: "Deuteronom 17 — Cercetare temeinică, și un rege sub Legea lui Dumnezeu",
  summary:
    "Moise cere cercetare temeinică în cazurile de idolatrie, cu mărturia a doi sau trei martori, și îndrumă cazurile grele către preoți și judecători la locul ales. Capitolul se încheie cu legea regelui: ales de DOMNUL, dintre frați, care nu-și înmulțește cai, neveste sau argint, și care trebuie să-și copieze și să citească zilnic Legea.",
  literaryContext:
    "Acest capitol dezvoltă tema justiției din finalul capitolului 16, extinzând-o de la judecători locali la sistemul judiciar central și, în cele din urmă, la conducerea supremă a națiunii — regele, care este și el, ca toți ceilalți, supus Legii lui Dumnezeu.",
  historicalContext:
    "Legea regelui este remarcabilă în contextul Orientului Antic: regii vecini se considerau reprezentanți divini absoluți, fără vreo lege scrisă mai sus decât voința lor. Israel primește aici, cu secole înainte de a avea vreun rege, o limitare constituțională a puterii regale sub autoritatea Legii scrise.",
  units: [
    {
      id: "deuteronom-17-1",
      ref: "Deuteronom 17:1",
      heading: "Nicio jertfă cu cusur",
      text: deuteronomPassage(17, 1, 1),
      teaching: teaching(
        "Legea repetă aici principiul deja stabilit în capitolul 15: „să nu jertfești DOMNULUI... un bou sau un miel care are vreun cusur sau vreo meteahnă, căci ar fi o urâciune pentru DOMNUL”. Această repetare arată cât de important era pentru Moise ca poporul să nu ofere lui Dumnezeu doar rămășițele.",
      ),
      words: [
        {
          original: "תועבת יהוה",
          transliteration: "to'avat YHWH",
          language: "ebraica",
          meaning:
            "o urâciune pentru DOMNUL. Termen folosit în Deuteronom pentru păcate care sunt în mod special respingente pentru caracterul sfânt al lui Dumnezeu.",
        },
      ],
      crossRefs: ["Deuteronom 15:21", "Leviticul 22:19-25", "Maleahi 1:8"],
      forYourHeart:
        "Ce-i dai lui Dumnezeu ar trebui să fie ce ai mai bun, nu ce nu-ți mai servește ție.",
    },
    {
      id: "deuteronom-17-2-7",
      ref: "Deuteronom 17:2-7",
      heading: "Idolatria cercetată temeinic, cu doi sau trei martori",
      text: deuteronomPassage(17, 2, 7),
      teaching: teaching(
        "Când se aude de un om sau o femeie care s-a închinat „soarelui, lunii sau vreunei stele de pe cer”, legea cere o cercetare serioasă: „să cercetezi bine lucrul, să-l vezi cu de-amănuntul, și dacă se află adevărat, sigur”. Zvonul nu era suficient pentru o sentință capitală.",
        "Principiul martorilor — „pe mărturia a doi sau trei martori să fie omorât cel vinovat de moarte, iar nu pe mărturia unui singur martor” — protejează viața de acuzații singulare și nedovedite. Martorii înșiși trebuie să înceapă executarea, o măsură care descuraja mărturia mincinoasă.",
      ),
      words: [
        {
          original: "על-פי שנים עדים או שלשה עדים",
          transliteration: "al-pi shnayim edim o shlosha edim",
          language: "ebraica",
          meaning:
            "pe mărturia a doi sau trei martori. Principiul juridic care va fi citat și de Domnul Isus și de apostoli în Noul Testament pentru confirmarea faptelor.",
        },
      ],
      crossRefs: ["Deuteronom 19:15", "Matei 18:16", "2 Corinteni 13:1"],
      forYourHeart:
        "Nu judeca pe bază de zvon; cercetarea temeinică și dovezile solide protejează dreptatea, nu o întârzie.",
    },
    {
      id: "deuteronom-17-8-13",
      ref: "Deuteronom 17:8-13",
      heading: "Cazurile grele, la locul ales",
      text: deuteronomPassage(17, 8, 13),
      teaching: teaching(
        "Pentru cazurile prea grele pentru judecătorii locali — „pricini de ucis, de judecată, de răni” — legea prevede o instanță superioară la locul ales, formată din preoți leviți și judecătorul de atunci: „ei înșiși vor cerceta pricina și ți-o vor spune”.",
        "Ascultarea de această verdict este obligatorie și severă: „omul care, din îndrăzneală, nu va asculta de preot... sau de judecător, omul acela să moară”. Un sistem judiciar funcțional cere supunere față de verdict, nu doar accesul la judecată.",
      ),
      words: [
        {
          original: "ובאת אל-הכהנים ואל-השפט",
          transliteration: "uvata el-hakohanim ve'el-hashofet",
          language: "ebraica",
          meaning:
            "să te înfățișezi la preoți și la judecătorul de atunci. Formula descrie sistemul de recurs pentru cazurile care nu se pot rezolva la nivel local.",
        },
      ],
      crossRefs: ["Exod 18:22-26", "Deuteronom 16:18", "2 Cronici 19:8-10"],
      forYourHeart:
        "Nu orice problemă se rezolvă singur; cazurile grele au nevoie de înțelepciune mai mare, la care să te supui cu smerenie.",
    },
    {
      id: "deuteronom-17-14-20",
      ref: "Deuteronom 17:14-20",
      heading: "Legea regelui, supus și el Legii scrise",
      text: deuteronomPassage(17, 14, 20),
      teaching: teaching(
        "Legea regelui anticipează dorința viitoare a lui Israel de a avea un rege „ca toate neamurile de împrejur”, dar impune limite strâmte: regele trebuie ales de DOMNUL, să fie „dintre frații tăi”, nu străin, și să nu-și înmulțească cai, neveste sau argint și aur — cele trei mijloace clasice de acumulare a puterii absolute.",
        "Cea mai remarcabilă cerință este scrisul: regele trebuie să-și „scrie o copie a acestei legi” și „s-o citească în toate zilele vieții lui, ca să învețe a se teme de DOMNUL, Dumnezeul lui... și să nu se înalțe mai pe sus de frații lui”. Regele lui Israel nu este mai sus de Lege, ci sub ea, ca orice alt israelit.",
      ),
      words: [
        {
          original: "לבלתי גבה-לבבו מאחיו",
          transliteration: "levilti gvoh-levavo me'echav",
          language: "ebraica",
          meaning:
            "ca să nu se înalțe inima lui mai pe sus de frații lui. Scopul copierii și cititului zilnic al Legii de către rege: păzirea de mândrie și de înstrăinarea puterii de popor.",
        },
      ],
      crossRefs: ["1 Samuel 8:4-9", "1 Regi 10:26-11:4", "Psalmul 119:97-98"],
      forYourHeart:
        "Autoritatea pe care o ai peste alții nu te scoate de sub Legea lui Dumnezeu; ea trebuie să te facă mai smerit, nu mai înalt.",
    },
  ],
  prayer:
    "Doamne, învață-ne să-ți dăm ce-i mai bun, nu rămășițele vieții noastre.\n\nDă-ne înțelepciune să cercetăm temeinic înainte de a judeca, și smerenie să ne supunem verdictelor drepte.\n\nRidică peste noi conducători care se supun Legii Tale, nu se înalță mai pe sus de frații lor.\n\nȘi învață-ne și pe noi să citim zilnic Cuvântul Tău, ca să ne temem întotdeauna de Tine. Amin.",
  status: DEUTERONOM_STATUSES[17],
})
