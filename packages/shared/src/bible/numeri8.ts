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

export const NUMERI_8 = numeriChapter({
  number: 8,
  title: "Numeri 8 — Lumina sfeșnicului și punerea deoparte a leviților",
  summary:
    "Un capitol scurt, cu trei părți: așezarea celor șapte candele ale sfeșnicului în fața lui, apoi ceremonia amănunțită prin care leviții sunt curățiți, legănați ca jertfă și puși deoparte pentru slujba Cortului, și în final vârstele între care un levit slujea activ: de la douăzeci și cinci până la cincizeci de ani.",
  literaryContext:
    "După capitolul șapte, dedicat dăruirii căpeteniilor și încheiat cu Glasul de pe capacul ispășirii, capitolul opt revine la înăuntrul Cortului — lumina lui statornică — și apoi la punerea deoparte a slujitorilor care îl vor întreține, încheind astfel secțiunea de organizare a Cortului și a leviților începută în capitolul trei.",
  historicalContext:
    "Ceremonia de curățire a leviților — apa de curățire, briciul peste tot trupul, spălarea hainelor, punerea mâinilor și legănarea ca jertfă — se aseamănă mult cu rânduiala de curățire a leprosului din Levitic 14, dar cu o deosebire: aici nu este vorba de o boală, ci de o consacrare. Întregul popor participă, punându-și mâinile pe leviți, ca semn că îi dă pe aceștia din mijlocul lui, întocmai cum legănau o jertfă înaintea DOMNULUI.",
  units: [
    {
      id: "numeri-8-1-4",
      ref: "Numeri 8:1-4",
      heading: "Șapte candele care luminează în fața sfeșnicului",
      text: numeriPassage(8, 1, 4),
      teaching: teaching(
        "Porunca este simplă: cele șapte candele ale sfeșnicului trebuie să lumineze „în fața sfeșnicului”, nu împrăștiate în toate direcțiile. Lumina lor era îndreptată spre înainte, spre masa pâinilor prezentării, arătând o rată anume, nu doar o luminozitate generală în încăpere.",
        "Textul amintește că întregul sfeșnic era „lucrătură de aur bătut... după modelul pe care i-l arătase DOMNUL lui Moise”. Nici măcar forma lucrurilor de aur nu venea din închipuirea vreunui meșter, ci dintr-un model arătat de sus. Ascultarea lui Aaron — „a făcut așa” — este notată la fel de simplu ca ascultarea lui Moise la ridicarea Cortului.",
      ),
      words: [
        {
          original: "מִקְשָׁה זָהָב",
          transliteration: "mikshah zahav",
          language: "ebraica",
          meaning:
            "lucrătură de aur bătut. Sfeșnicul nu era turnat în formă, ci ciocnit dintr-o bucată unică de aur, formă după formă, după modelul primit de Moise pe munte.",
        },
      ],
      crossRefs: ["Exod 25:31-40", "Exod 37:17-24", "Zaharia 4:2-6"],
      forYourHeart:
        "Lumina pe care o porți în lume nu trebuie să strălucească la întâmplare; ea are un sens și o direcție, după modelul pe care Dumnezeu ți l-a arătat.",
    },
    {
      id: "numeri-8-5-7",
      ref: "Numeri 8:5-7",
      heading: "Apa de curățire, briciul și hainele spălate",
      text: numeriPassage(8, 5, 7),
      teaching: teaching(
        "Punerea deoparte a leviților începe cu o curățire trupească totală: stropiți cu apă de curățire, cu briciul trecut peste întreg trupul lor, cu hainele spălate. Nimic din vechea lor stare nu este lăsat neatins; consacrarea începe de la exterior spre interior.",
        "Această curățire radicală — briciul peste tot trupul, nu doar peste cap — se apropie de ritualul de curățire a leprosului din Levitic 14, deși leviții nu erau bolnavi. Consacrarea pentru slujba sfințeniei cere aceeași temeinicie ca vindecarea de o boală gravă; nimic din vechea viață nu poate rămâne nespălat.",
      ),
      words: [
        {
          original: "מֵי חַטָּאת",
          transliteration: "mei hatat",
          language: "ebraica",
          meaning:
            "apa de curățire de păcat. Această apă, folosită și în Numeri 19 pentru curățirea de atingerea unui mort, înlătura o necurăție rituală, nu doar una fizică.",
        },
      ],
      crossRefs: ["Levitic 14:8-9", "Numeri 19:9-13", "Evrei 10:22"],
      forYourHeart:
        "Nicio slujbă sfântă nu începe fără o curățire temeinică. Ce trebuie spălat în viața ta înainte să fii gata pentru slujba pe care o cauți?",
    },
    {
      id: "numeri-8-8-14",
      ref: "Numeri 8:8-14",
      heading: "Întregul popor pune mâinile pe leviți",
      text: numeriPassage(8, 8, 14),
      teaching: teaching(
        "Ceremonia continuă cu doi tauri: unul cu darul de cereale, celălalt ca jertfă pentru păcat. Toată adunarea este strânsă înaintea Cortului, iar „fiii lui Israel să-și pună mâinile peste leviți” — nu doar Moise sau Aaron, ci întregul popor, ca semn că leviții sunt dați din mijlocul lor, cu deplina lor încuviințare.",
        "Aaron își legeală pe leviți „ca o jertfă legănată înaintea DOMNULUI din partea fiilor lui Israel”. Este o imagine străină pentru cititorul modern: oamenii își sunt legănați ca o jertfă, nu în sensul distrugerii, ci al dăruirii depline către DOMNUL, înălțați și coborâți înaintea Lui ca semn că aparțin acum în întregime slujbei.",
        "Leviii își pun și ei mâinile pe capul taurilor, iar unul devine jertfă pentru păcat, celălalt ardere-de-tot, „ca să facă ispășire pentru leviți”. Chiar cei chemați să facă ispășire pentru alții au nevoie, mai întâi, de ispășire pentru ei înșiși.",
      ),
      words: [
        {
          original: "תְנוּפָה",
          transliteration: "tenufah",
          language: "ebraica",
          meaning:
            "jertfă legănată. Gestul mișcării înainte-înapoi sau sus-jos arăta simbolic că darul era prezentat înaintea DOMNULUI și apoi primit înapoi pentru folosirea rânduită; aici, chiar oamenii sunt legănați în același fel.",
        },
      ],
      crossRefs: ["Levitic 8:14-17", "Romani 12:1", "Exod 29:24"],
      forYourHeart:
        "A fi pus deoparte pentru slujba lui Dumnezeu începe cu ispășire, nu cu mândrie. Chiar cei chemați să slujească alții au nevoie întâi de curățirea proprie.",
    },
    {
      id: "numeri-8-15-19",
      ref: "Numeri 8:15-19",
      heading: "Dați cu totul, ca să nu fie nicio urgie în popor",
      text: numeriPassage(8, 15, 19),
      teaching: teaching(
        "Textul reia, cu alte cuvinte, temeiul deja rostit în capitolul trei: leviții sunt luați „în locul tuturor întâilor născuți”, pentru că toți întâii născuți ai lui Israel au devenit ai DOMNULUI în noaptea în care Egiptul și-a pierdut pe ai săi.",
        "Dar aici apare un motiv nou, spus limpede: leviții sunt dați lui Aaron „ca să facă ispășire pentru fiii lui Israel, ca să nu existe nicio urgie printre fiii lui Israel când fiii lui Israel se vor apropia de Sfântul Lăcaș”. Leviții nu sunt doar o forță de muncă pentru Cort; sunt o măsură de protecție pentru întreg poporul, o barieră vie între sfințenia periculoasă și mulțimea neinstruită.",
        "Ia aminte cum se împletesc mila și rânduiala: dacă fiecare israelit s-ar apropia direct de Cort, fără mijlocitorii rânduiți, urgia ar veni. Leviții, puși între popor și sfințenie, fac posibil ca poporul să se apropie de DOMNUL și să trăiască.",
      ),
      words: [
        {
          original: "וְלֹא־יִהְיֶה בִבְנֵי יִשְׁרָאֵל נֲֶגֶף",
          transliteration: "velo-ihie bivnei Israel negef",
          language: "ebraica",
          meaning:
            "și să nu fie o urgie între fiii lui Israel. Cuvântul „negef” denumește o lovitură aducată direct de DOMNUL, nu o boală obișnuită; rânduiala leviților era menită exact să oprească o astfel de lovitură.",
        },
      ],
      crossRefs: ["Numeri 1:53", "Numeri 18:5", "1 Timotei 2:5"],
      forYourHeart:
        "Un mijlocitor rânduit de Dumnezeu între tine și sfințenia Lui nu este un obstacol; este calea prin care poți trăi în siguranță aproape de El.",
    },
    {
      id: "numeri-8-20-22",
      ref: "Numeri 8:20-22",
      heading: "Făcut întocmai",
      text: numeriPassage(8, 20, 22),
      teaching: teaching(
        "Ascultarea este descrisă de două ori în această unitate scurtă: „le-au făcut leviților după tot ce-i poruncise DOMNUL” și, la final, „cum îi poruncise DOMNUL lui Moise... așa le-au făcut”. Între cele două formule stă fapta însăși: leviții „s-au curățit de păcat și și-au spălat hainele”, au fost legănați ca jertfă, și abia după aceea au intrat în slujbă.",
        "Ordinea nu poate fi inversată: curățirea înainte de slujire, ispășirea înainte de lucrare. Niciun levit nu a intrat în Cort înainte de a fi trecut prin toată ceremonia rânduită.",
      ),
      words: [],
      crossRefs: ["Numeri 3:5-10", "1 Petru 2:5"],
      forYourHeart:
        "Rostul slujirii nu vine înaintea pregătirii pentru ea. Primește întâi curățirea pe care Dumnezeu o cere, și abia apoi lucrarea la care te cheamă.",
    },
    {
      id: "numeri-8-23-26",
      ref: "Numeri 8:23-26",
      heading: "Slujba activă, de la douăzeci și cinci la cincizeci de ani",
      text: numeriPassage(8, 23, 26),
      teaching: teaching(
        "Aici apare o a treia vârstă de numărare pentru leviți, diferită de cea de la o lună (capitolul trei) și de cea de treizeci de ani (capitolul patru): slujba activă începe la douăzeci și cinci de ani. Comentatorii evreiești observă de mult timp că diferența dintre douăzeci și cinci și treizeci ar putea fi anii de ucenicie și pregătire înainte de slujba deplină.",
        "La cincizeci de ani, levitul „iese din slujba lucrării și nu va mai sluji” — dar textul nu îl lasă fără rost: „vor putea ajuta pe frații lor... să păzească paza, dar nu vor mai face slujbă activă”. Retragerea din munca grea nu înseamnă îndepărtare din Cort; înseamnă o schimbare de rol, de la purtarea sarcinilor la sprijinirea celor mai tineri.",
        "Capitolul se încheie astfel cu o învățătură tăcută despre înaintarea în vârstă înaintea lui Dumnezeu: puterea trupească se pierde, dar locul în familia slujitorilor rămâne, și experiența unui levit bătrân devine, la rândul ei, un fel de slujbă.",
      ),
      words: [
        {
          original: "וְשָׂרַת אֶת־מִשְׁמֶרֶת",
          transliteration: "veshamar et-mishmeret",
          language: "ebraica",
          meaning:
            "și să păzească paza. Chiar după retragerea din munca de purtare, levitul în vârstă rămâne cu o răspundere de veghe și sprijin, nu iese complet din slujire.",
        },
      ],
      crossRefs: ["Numeri 4:3", "1 Cronici 23:24-27", "Tit 2:2-3"],
      forYourHeart:
        "Puterea trupească pentru o slujbă anume are un sfârșit, dar locul tău în lucrarea lui Dumnezeu nu se încheie odată cu ea. Înțelepciunea vârstei rămâne o slujbă prețuită.",
    },
  ],
  prayer:
    "Doamne, învață-mă să primesc curățirea Ta înainte de orice slujbă pe care o caut, așa cum leviții au fost spălați și ispășiți înainte să intre în Cort.\n\nDă-mi să fiu ca lumina sfeșnicului, îndreptată cu un scop și o direcție, după modelul pe care Tu mi l-ai arătat.\n\nMulțumescu-Ți pentru mijlocitorii pe care i-ai rânduit între mine și sfințenia Ta, ca să pot trăi aproape de Tine fără primejdie.\n\nȘi învață-mă că slujba mea nu se încheie odată cu puterea tinereții; dă-mi înțelepciunea de a sprijini pe cei tineri la vremea bătrâneții. Amin.",
  status: NUMERI_STATUSES[8],
})
