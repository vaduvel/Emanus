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

export const NUMERI_14 = numeriChapter({
  number: 14,
  title: "Numeri 14 — Răscoala taberei și mijlocirea lui Moise",
  summary:
    "Raportul celor zece iscoade aruncă toată tabăra în răscoală deschisă: poporul vrea o căpetenie nouă care să-i ducă înapoi în Egipt și vrea să-i ucidă cu pietre pe Iosua și Caleb. Moise mijlocește din nou pentru popor, DOMNUL iartă vinovăția, dar rostiește sentința: generația aceasta va rătăci patruzeci de ani în pustie, un an pentru fiecare zi de iscodire, până va muri în ea.",
  literaryContext:
    "Acesta este punctul de cotitură al întregii cărți Numeri: momentul în care o generație care ar fi putut intra aproape imediat în țara făgăduită își pierde dreptul de a o vedea. Restul cărții — de la capitolul cincisprezece înainte — se desfășoară sub umbra acestei sentințe, până când o generație nouă va ajunge, în sfârșit, la marginea țării.",
  historicalContext:
    "Răzvrătirea de la Cadeș este pomenită de mai multe ori în restul Scripturii — Psalmul 95, Evrei 3-4 — ca exemplu suprem de necredință după ce Dumnezeu arătase deja nenumărate semne. Locul unde armata a fost înfrântă, Horma, înseamnă „nimicire”, un nume care va rămâne legat pentru totdeauna de această încăpățânare zadarnică.",
  units: [
    {
      id: "numeri-14-1-4",
      ref: "Numeri 14:1-4",
      heading: "„Să ne alegem o căpetenie și să ne întoarcem în Egipt!”",
      text: numeriPassage(14, 1, 4),
      teaching: teaching(
        "Raportul celor zece iscoade produce imediat efectul temut: „toată adunarea a ridicat glasul și a strigat; și poporul a plâns în noaptea aceea”. Plânsul nu este de pocăință, ci de disperare și răzvrătire.",
        "Cuvintele poporului depășesc simpla cârtire: „o, de am fi murit în țara Egiptului!” preferă moartea în robie decât riscul libertății făgăduite. Iar propunerea finală — „să ne alegem o căpetenie și să ne întoarcem în Egipt” — este o răsturnare completă a conducerii rânduite de DOMNUL prin Moise.",
      ),
      words: [],
      crossRefs: ["Exod 16:3", "Fapte 7:39", "Evrei 3:16-19"],
      forYourHeart:
        "Teamă dusă până la capăt nu doar refuză viitorul; ajunge să idealizeze o robie trecută, care părea la vremea ei de nesuportat.",
    },
    {
      id: "numeri-14-5-10",
      ref: "Numeri 14:5-10",
      heading: "Iosua și Caleb sfâșie hainele; slava DOMNULUI apare",
      text: numeriPassage(14, 5, 10),
      teaching: teaching(
        "Moise și Aaron cad cu fața la pământ înaintea întregii adunări, iar Iosua și Caleb își sfâșie hainele — gest de doliu și groază înaintea unui păcat de proporții uriașe. Cei doi repetă cu și mai multă tărie ce spusese Caleb înainte: „țara... este foarte, foarte bună”.",
        "Argumentul lor este pur teologic: „nu vă răzvrătiți împotriva DOMNULUI... căci îi vom mânca ca pe o pâine! Ocrotirea lor s-a depărtat de la ei, iar DOMNUL este cu noi”. Nu neagă puterea locuitorilor țării; susțin doar că puterea DOMNULUI este mai mare decât orice ocrotire păgână.",
        "Răspunsul poporului este cel mai grav până acum: „toată adunarea vorbea să-i ucidă cu pietre” pe Iosua și Caleb, pe Moise și pe Aaron. Exact în acest moment de criză maximă, „slava DOMNULUI S-a arătat peste Cortul Întâlnirii înaintea tuturor” — o intervenție directă care oprește lapidarea.",
      ),
      words: [],
      crossRefs: ["Numeri 13:30", "2 Cronici 20:20", "1 Ioan 4:4"],
      forYourHeart:
        "A spune adevărul înaintea unei mulțimi înspăimântate poate atrage o reacție violentă; dar DOMNUL își apară martorii credincioși exact la momentul cel mai critic.",
    },
    {
      id: "numeri-14-11-12",
      ref: "Numeri 14:11-12",
      heading: "Propunerea DOMNULUI de nimicire",
      text: numeriPassage(14, 11, 12),
      teaching: teaching(
        "DOMNUL pune întrebarea direct lui Moise: „până când Mă va disprtu i poporul acesta și până când nu va crede în Mine, cu toate semnele pe care le-am făcut?” Necredința nu este ignoranță; e refuzul de a crede în fața dovezilor deja multiple.",
        "Propunerea DOMNULUI reia tiparul din Exod 32, după vițelul de aur: nimicirea poporului și începerea unui neam nou din urmașii lui Moise. Încă o dată, DOMNUL oferă această posibilitate exact în momentul în care mijlocitorul Său are cel mai mult motiv să accepte, după tot ce a suferit de la acest popor nerecunoscător.",
      ),
      words: [],
      crossRefs: ["Exod 32:9-10", "Deuteronom 9:13-14"],
      forYourHeart:
        "Dumnezeu întâmpină uneori mijlocitorul cu o alegere aparent îngăduită, tocmai pentru a scoate la iveală adâncimea inimii lui pentru cei pentru care mijlocește.",
    },
    {
      id: "numeri-14-13-19",
      ref: "Numeri 14:13-19",
      heading: "„Să se arate puterea Stăpânului” — mijlocirea lui Moise",
      text: numeriPassage(14, 13, 19),
      teaching: teaching(
        "Moise nu se gândește la sine, ci la Numele DOMNULUI între neamuri: „egiptenii vor auzi... și le vor spune locuitorilor țării”. Dacă DOMNUL nimicește poporul în pustie, după tot ce arătase deja despre Sine, neamurile vor conchide că „DOMNUL nu a putut să ducă pe poporul acesta în țara pe care jurase”.",
        "Argumentul lui Moise se sprijină apoi pe propriile cuvinte ale DOMNULUI: „DOMNUL este încet la mânie și bogat în îndurare, iartă nelegiuirea și fărădelegea” — o citare aproape exactă din Exod 34:6-7, aceeași descoperire pe care DOMNUL o făcuse lui Moise după vițelul de aur. Moise își întemeiază rugăciunea nu pe merite omenești, ci pe Numele propriu al DOMNULUI, rostit deja de El Însăși.",
        "Cererea finală — „iartă, Te rog, nelegiuirea acestui popor, după mărimea îndurării Tale” — este îndrăzneață tocmai pentru că își cere temeiul în caracterul lui Dumnezeu, nu în lipsa de vinovăție a poporului.",
      ),
      words: [
        {
          original: "יְהוָה אֶרֶךְ אַפַּיִם וְרַבְ־חֶסֶד",
          transliteration: "Adonai erech apayim verav-chesed",
          language: "ebraica",
          meaning:
            "DOMNUL este încet la mânie și bogat în îndurare. Această formulă revine în mai multe locuri din Vechiul Testament ca temei de rugăciune pentru mijlocire, ancorată direct în auto-revelația DOMNULUI de la Sinai.",
        },
      ],
      crossRefs: ["Exod 34:6-7", "Ioel 2:13", "Psalmul 103:8"],
      forYourHeart:
        "O rugăciune de mijlocire cea mai puternică nu se sprijină pe vrednicia celui pentru care te rogi, ci pe caracterul lui Dumnezeu, așa cum ți l-a descoperit El Însăși.",
    },
    {
      id: "numeri-14-20-25",
      ref: "Numeri 14:20-25",
      heading: "„Iert, după cuvântul tău” — dar cu urmare",
      text: numeriPassage(14, 20, 25),
      teaching: teaching(
        "DOMNUL răspunde imediat: „iert, după cuvântul tău” — iertare completă pentru vinovăția națională, exact cum ceruse Moise. Dar iertarea nu șterge consecințele: „toți bărbații care au văzut slava Mea... și M-au ispitit deja de zece ori... nu vor vedea țara”.",
        "Numărul „de zece ori” arată că această răzvrătire nu era un accident izolat, ci punctul culminant al unui șir lung de necredință, de la marea Roșie până la Tabera și Chibrot-Hataava. Iertarea vine după multă răbdare, nu după prima greșeală.",
        "Excepția este limpede numită: „pentru că robul Meu Caleb a fost stăpânit de un alt duh și Mi-a urmat cu credincioșie, pe el îl voi duce în țara în care s-a dus”. Un „alt duh” nu înseamnă perfecțiune, ci o disponibilitate deosebită de a urma DOMNUL fără rezerve, chiar împotriva curentului mulțimii.",
      ),
      words: [
        {
          original: "רוּחַ אַחֶרֶת",
          transliteration: "ruach acheret",
          language: "ebraica",
          meaning:
            "un alt duh. Expresia arată o înclinație lăuntrică diferită de a celorlalți, o disponibilitate de a crede și a urma DOMNUL chiar împotriva presiunii mulțimii.",
        },
      ],
      crossRefs: ["Numeri 13:30", "Iosua 14:6-14", "Psalmul 78:41"],
      forYourHeart:
        "Iertarea lui Dumnezeu poate fi totală, dar consecințele deciziilor tale rămân reale. A urma DOMNUL cu „alt duh”, chiar împotriva mulțimii, aduce o răsplată pe măsură.",
    },
    {
      id: "numeri-14-26-35",
      ref: "Numeri 14:26-35",
      heading: "Patruzeci de ani: un an pentru fiecare zi",
      text: numeriPassage(14, 26, 35),
      teaching: teaching(
        "Sentința DOMNULUI este rostită cu o formulă solemnă: „precum este adevărat că Eu trăiesc... vă voi face întocmai cum ați vorbit la urechile Mele”. Poporul dorise să moară în pustie — „o, de am fi murit în pustia aceasta” (versetul 2) — iar DOMNUL împlinește exact acea dorință rostită din teamă.",
        "Toată generația numărată la Sinai, „de la vârsta de douăzeci de ani în sus”, va muri în pustie, cu excepția lui Caleb și Iosua. Copiii, pe care părinții își spuseseră că vor fi „o pradă” (versetul 3), vor fi tocmai cei care vor intra și vor moșteni țara.",
        "Numărul patruzeci nu este întâmplător: „după numărul celor patruzeci de zile în care ați iscodit țara, socotind un an de fiecare zi”. Fiecare zi de necredință în fața dovezilor văzute cu ochii devine un an de rătăcire în pustie — o măsură exactă și simbolică a proporției dintre păcat și consecință.",
      ),
      words: [],
      crossRefs: ["Numeri 32:13", "Deuteronom 2:14-15", "Ezechiel 4:6"],
      forYourHeart:
        "Dumnezeu împlinește uneori exact cuvintele rostite din teamă sau nemulțumire; ai grijă ce ceri, chiar în disperare, căci El te poate lua în serios.",
    },
    {
      id: "numeri-14-36-38",
      ref: "Numeri 14:36-38",
      heading: "Iscoadele necredincioase mor; Iosua și Caleb rămân",
      text: numeriPassage(14, 36, 38),
      teaching: teaching(
        "Cei zece bărbați care aduseseră zvonul rău „au murit loviți de o urgie înaintea DOMNULUI” — o judecată imediată și vizibilă, distinctă de sentința celor patruzeci de ani asupra restului poporului. Răspunderea lor pentru răspândirea fricii a fost mai mare decât a celor care doar i-au crezut.",
        "În contrast, „Iosua, fiul lui Nun, și Caleb, fiul lui Iefune, au rămas vii dintre bărbații care merseseră să iscodească țara”. Dintre doisprezece oameni care văzuseră aceeași țară, doar doi au trăit după credință, nu după frică — și doar aceștia doi au rămas în viață.",
      ),
      words: [],
      crossRefs: ["Numeri 26:65", "Iosua 14:10"],
      forYourHeart:
        "A vedea aceleași fapte ca toți ceilalți nu te scutește de răspunderea felului în care le împărtășești mai departe. Cuvintele tale pot fi viață sau moarte pentru cei care te ascultă.",
    },
    {
      id: "numeri-14-39-45",
      ref: "Numeri 14:39-45",
      heading: "Încăpățânarea târzie și înfrângerea la Horma",
      text: numeriPassage(14, 39, 45),
      teaching: teaching(
        "Auzind sentința, „poporul s-a întristat foarte mult” și, a doua zi dimineața, decid brusc să facă exact ce refuzaseră să facă cu o zi înainte: „iată-ne, suntem gata să ne suim... căci am păcătuit”. Recunoașterea păcatului vine prea târziu și din motivul greșit: nu din pocăință față de necredință, ci din dorința de a evita consecința.",
        "Moise le spune limpede: „de ce călcați porunca DOMNULUI?... nu vă suiți, căci DOMNUL nu este în mijlocul vostru”. Vremea de a asculta trecuse; a încerca acum, din propria voință, să repari o neascultare cu o altă formă de neascultare nu putea izbândi.",
        "„Chivotul legământului DOMNULUI și Moise nu au părăsit mijlocul taberei” — cel mai clar semn că această încercare era fără binecuvântarea DOMNULUI. Cei care s-au suit oricum „au fost loviți și zdrobiți până la Horma”, o înfrângere care încheie capitolul cu aceeași lecție amară: nici tecăpațina zadarnică, nici fuga temută, ci ascultarea la timpul potrivit era singura cale.",
      ),
      words: [
        {
          original: "חָרְמָה",
          transliteration: "Chormah",
          language: "ebraica",
          meaning:
            "Horma, „nimicire”. Numele locului rămâne ca mărturie a acestei încercări târzii și zadarnice de a repara prin propria putere ce fusese pierdut prin necredință.",
        },
      ],
      crossRefs: ["Deuteronom 1:41-45", "Evrei 3:16-19"],
      forYourHeart:
        "Părerea de rău pentru consecințe nu este același lucru cu pocăința adevărată. A încerca să repari singur, în afara voii lui Dumnezeu pentru momentul acela, poate adânci pierderea în loc s-o vindece.",
    },
  ],
  prayer:
    "Doamne, iartă-mă pentru fiecare dată când am idealizat o robie veche în fața unei libertăți care cere credință.\n\nÎnvață-mă să mijlocesc ca Moise, sprijinindu-mă pe caracterul Tău, nu pe vrednicia celor pentru care mă rog.\n\nDă-mi „alt duh”, ca al lui Caleb, să Te urmez cu credincioșie chiar împotriva curentului mulțimii.\n\nȘi învață-mă să ascult la timpul potrivit, fără să încerc mai târziu, din propria putere, să repar ce am pierdut prin necredință. Amin.",
  status: NUMERI_STATUSES[14],
})
