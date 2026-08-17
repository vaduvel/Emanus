import { exodChapter, teaching } from "./exodHelpers.js"

/*
 * Cartea Exod, explicată pe unități de sens.
 *
 * Textul biblic: păstrat separat în exodText.ts (fișierele exodTextN.ts).
 * Explicația: scrisă pentru Emanus după cercetarea textului. Nu se copiază
 * formularea niciunui predicator sau comentator.
 */

export const EXOD_35 = exodChapter({
  number: 35,
  title: "Exod 35 — Când poporul aduce mai mult decât trebuie",
  summary:
    "Moise strânge toată adunarea și începe cu ziua de odihnă: șase zile să se lucreze, iar a șaptea să fie sfântă, și să nu se aprindă foc în casele lor. Apoi cere darul pentru cortul întâlnirii: aur, argint, aramă, fire, piei, untdelemn, mirodenii și pietre scumpe — dar numai de la cine aduce cu inimă bună. Le înșiră tot ce trebuie făcut, de la cort până la hainele preoților. Și poporul se întoarce: fiecare al cărui suflet a fost îndemnat aduce, bărbați și femei, brățări și cercei, iar femeile iscusite torc firele cu mâinile lor. La sfârșit Moise le vestete pe cei chemați: Bețaleel, umplut cu Duhul lui Dumnezeu, și Aholiab — iar acestora Dumnezeu le-a dat și darul de a-i învăța pe alții.",
  literaryContext:
    "Ia aminte că aici începe partea din urmă a cărții, în care se spune iarăși, aproape cu aceleași cuvinte, tot ce se poruncise în capitolele douăzeci și cinci până treizeci și unu. Numai că acolo Dumnezeu spunea ce trebuie făcut; aici oamenii fac. Și vezi întoarcerea limpede a lucrurilor: în treizeci și doi poporul Își scosese cerceii de aur pentru un vițel, aici Își scoate cerceii de aur pentru cortul Domnului. Același aur, aceeași mână, altă inimă. Și ia seama că și aici, cum și în treizeci și unu, ziua de odihnă stă alături de lucrarea cortului: nici graba pentru Dumnezeu nu îneacă odihna dată de Dumnezeu.",
  historicalContext:
    "Cortul se ridica în pustie, unde nu se afla nici aur, nici in subțire, nici piatră scumpă. Tot ce se aduce aici venise din Egipt, la ieșire. Țesutul și torsul erau, în lumea aceea, lucrarea femeilor, și ele apar aici numite pe măsura meșteșugului lor. Oprirea de a aprinde focul în ziua de odihnă privea gătitul și lucrul cu metalul, care cerea cuptor; așa se opreau meșterii de la lucrarea cortului chiar în vremea în care se grăbeau. Iar darul se aducea nu prin dări hotărâte de mai înainte, cum se făcea la templele altor popoare, ci după îndemnul inimii.",
  units: [
    {
      verses: [1, 3],
      heading: "Întâi odihna, apoi lucrul",
      teaching: teaching(
        "Cel dintâi cuvânt spus adunării înainte de a se începe lucrarea nu este despre lucrare: este despre odihnă. Șase zile să se lucreze, iar ziua a șaptea să vă fie sfântă. Ia aminte la așezarea aceasta: nu s-a spus „grăbiți-vă, că avem multe de făcut”, ci „să nu uitați să vă opriți”.",
        "Și vezi că oprirea aceasta lovea tocmai în meșteri: nu aprindeți foc în casele voastre. Fără foc nu se topea aurul și nu se lucra arama. Adică lucrarea cea mai sfântă din tabără stătea o zi din șapte. Cine socotește că lucrarea lui pentru Dumnezeu nu poate sta niciodată pune lucrarea mai sus decât Cel pentru care se face.",
        "Se cade să spunem și ce nu înseamnă asta pentru noi. Ziua a șaptea a fost semnul legământului cu Israel, și Pavel scrie să nu ne judece nimeni cu privire la zile. Nu ținem ziua ca lege. Dar învățătura ei rămâne întreagă: cine nu se oprește niciodată nu crede, în faptă, că lucrarea este a lui Dumnezeu.",
      ),
      words: [
        {
          original: "שבת שבתון",
          transliteration: "șabat șabaton",
          language: "ebraica",
          meaning: "odihnă desăvârșită. Nici lucrarea cortului nu a fost scăpată de ea.",
        },
        {
          original: "לא תבערו אש",
          transliteration: "lo tevaaru eș",
          language: "ebraica",
          meaning: "să nu aprindeți foc. Adică să stea cuptorul meșterului.",
        },
      ],
      crossRefs: ["Exod 31:12-17", "Marcu 2:27", "Coloseni 2:16-17", "Evrei 4:9-10", "Psalmi 127:1-2"],
      forYourHeart:
        "Cine nu se oprește niciodată nu crede, în faptă, că lucrarea este a lui Dumnezeu.",
    },
    {
      verses: [4, 9],
      heading: "Numai de la cine dă din inimă",
      teaching: teaching(
        "Moise spune: luați din ce aveți și aduceți un dar Domnului; oricine are inima binevoitoare să aducă. Ia aminte la hotarul acesta: nu s-a pus nici o dare și nu s-a scris nici o listă cu numele celor care trebuie să dea. Dumnezeu nu primește în casa Lui aur dat cu sila.",
        "Și se cade spus limpede, fiindcă s-a stricat mult în privința aceasta: cine strânge bani pentru lucrarea lui Dumnezeu prin rușinare, prin făgăduințe de răsplată sau prin apăsarea celor săraci nu urmează tiparul de aici. Pavel scrie același lucru: fiecare să dea cum a hotărât în inima lui, nu cu părere de rău, căci Dumnezeu iubește pe cel care dă cu bucurie.",
        "Și vezi ce se cere: aur, dar și piei; pietre scumpe, dar și păr de capră. Nu toți aveau smaralde. În lista aceasta Își află loc și cel sărac. Dumnezeu a rânduit lucrarea Lui astfel încât să poată aduce ceva și cel care nu are mult.",
      ),
      words: [
        {
          original: "כל נדיב לבו",
          transliteration: "kol nediv libo",
          language: "ebraica",
          meaning: "oricine are inima binevoitoare. Nu s-a pus nici o dare.",
        },
        {
          original: "תרומה",
          transliteration: "truma",
          language: "ebraica",
          meaning: "dar ridicat, pus deoparte pentru Domnul.",
        },
      ],
      crossRefs: ["2 Corinteni 9:7", "Exod 25:1-2", "Marcu 12:41-44", "1 Cronici 29:9", "Fapte 5:4"],
      forYourHeart:
        "Dumnezeu nu primește în casa Lui aur dat cu sila. Și a lăsat loc în listă și pentru cel sărac.",
    },
    {
      verses: [10, 19],
      heading: "Tot ce trebuia făcut, spus pe nume",
      teaching: teaching(
        "Moise înșiră toată lucrarea: cortul și acoperișurile, chivotul și capacul ispășirii, masa și pâinile, candelabrul și untdelemnul, altarele, ligheanul, curtea, țărușii și frânghiile, hainele preoților. Ia aminte că nu s-a lăsat nimic în ceață: fiecare știa ce se cere.",
        "Și vezi că în aceeași listă stă chivotul și țărușii. Cine bătea țărușii în pământ făcea parte din aceeași lucrare cu cel care bătea aurul capacului. Nu se cade să socotim că sunt lucrări mari și lucrări mărunte în casa lui Dumnezeu; sunt numai lucrări făcute și lucrări nefăcute.",
        "Și ia seama că Moise începe cu chemarea „oricine este iscusit între voi”. Nu a așteptat să fie împinsă lucrarea numai de meșterii cei doi chemați pe nume. În adunarea lui Dumnezeu, cei chemați pe nume nu sunt puși ca să lucreze în locul tuturor, ci ca să-i strângă pe toți la lucru.",
      ),
      words: [
        {
          original: "כל חכם לב",
          transliteration: "kol haham lev",
          language: "ebraica",
          meaning: "oricine este iscusit cu inima. Meșteșugul stă alături de inimă.",
        },
        {
          original: "יתדתיו ומיתריו",
          transliteration: "itedotav umeitarav",
          language: "ebraica",
          meaning: "țărușii și frânghiile. Stăteau în aceeași listă cu chivotul.",
        },
      ],
      crossRefs: ["1 Corinteni 12:22-25", "Efeseni 4:11-12", "Neemia 3:1-12", "Luca 16:10", "Romani 12:4-8"],
      forYourHeart:
        "Nu sunt lucrări mari și lucrări mărunte în casa Lui. Sunt lucrări făcute și lucrări nefăcute.",
    },
    {
      verses: [20, 29],
      heading: "Aceiași cercei, altă inimă",
      teaching: teaching(
        "Poporul se întoarce, și vine fiecare al cărui suflet a fost îndemnat, și aduc brățări, cercei, inele, tot felul de lucruri de aur, fire albastre și roșii, piei și aramă. Ia aminte de unde vine aurul acesta: din aceleași cutii din care se scoseseră cerceii pentru vițel. Câteva capitole mai înainte, aceleași mâini dăduseră aur pentru un idol.",
        "Iată dar ce este pocința: nu numai lăsarea răului, ci întoarcerea aceluiași lucru într-altă parte. Ce s-a folosit greșit poate fi pus în mâna lui Dumnezeu. Nu ți se cere să fii alt om, cu alte daruri; ți se cere să duci ce ai într-alt loc.",
        "Și vezi că se spune anume: bărbați și femei, și că toate femeile iscusite torceau cu mâinile lor și aduceau firul tors. Nu au adus bani ca să se cumpere fir; au adus lucrul lor. Sunt oameni care nu au aur, dar au mâini și vreme, și darul acesta este primit la fel.",
        "Și se spune de trei ori în puține versete că aduceau de bunăvoie. Nu se laudă cât s-a strns, ci felul în care s-a strns. În socotelile lui Dumnezeu, măsura darului nu este greutatea aurului, ci îndemnul din care a ieșit.",
      ),
      words: [
        {
          original: "כל אשר נשאו לבו",
          transliteration: "kol așer nesao libo",
          language: "ebraica",
          meaning: "oricine a fost purtat de inima lui. Darul a venit din îndemn, nu din poruncă.",
        },
        {
          original: "טוו בידיהם",
          transliteration: "tavu veiadeihem",
          language: "ebraica",
          meaning: "torceau cu mâinile lor. Cine nu avea aur a adus lucrul lui.",
        },
        {
          original: "נדבה",
          transliteration: "nedava",
          language: "ebraica",
          meaning: "dar de bunăvoie. Cuvântul se repetă, ca să nu rămână nici o îndoială.",
        },
      ],
      crossRefs: ["Exod 32:2-3", "Romani 6:13", "Luca 8:2-3", "2 Corinteni 8:12", "Fapte 9:36"],
      forYourHeart:
        "Pocința nu Îți cere alte daruri. Îți cere să duci ce ai într-altă parte.",
    },
    {
      verses: [30, 35],
      heading: "Meșteri cărora li s-a dat și darul de a învăța pe alții",
      teaching: teaching(
        "Moise le spune: Domnul a chemat pe nume pe Bețaleel și l-a umplut cu Duhul lui Dumnezeu, cu înțelepciune, pricepere și știință în tot felul de lucrări. Ia aminte că poporul află acum ce se hotărâse pe munte. Chemarea nu s-a ținut ascunsă: adunarea a știut cine lucrează și de ce.",
        "Și vezi cuvântul cel mai bun din tot capitolul: le-a dat și darul de a învăța pe alții. Iată semnul unui dar cu adevărat de la Dumnezeu: nu se strânge într-un singur om. Cine știe să facă și nu știe să arate altuia va lăsa în urma lui o lucrare care se oprește când se oprește el.",
        "Se cade să ne cercetăm aici, fiindcă mulți Își păzesc meșteșugul ca pe o avere. Bețaleel a fost umplut cu Duhul ca să lucreze și ca să facă meșteri din alții. Ce ai primit nu este al tău ca să-l ții; este al tău ca să-l dai mai departe.",
        "Și încheie șirul cu meșteșugurile: săpare în piatră, țesut, cusătură, lucrarea aurului. Sunt oameni al căror nume nu-l știm, care au învățat de la acești doi și au făcut cortul cu mâinile lor. Cea mai mare parte a lucrării lui Dumnezeu s-a făcut totdeauna de oameni pe care nu-i pomenește nimeni.",
      ),
      words: [
        {
          original: "ראו קרא יהוה בשם",
          transliteration: "reu kara YHWH veșem",
          language: "ebraica",
          meaning: "vedeți, Domnul a chemat pe nume. Chemarea a fost spusă înaintea adunării.",
        },
        {
          original: "ולהורת נתן בלבו",
          transliteration: "ulehorot natan belibo",
          language: "ebraica",
          meaning: "i-a pus în inimă și darul de a învăța pe alții. Darul lui Dumnezeu nu se strânge într-un om.",
        },
        {
          original: "חרש וחשב ורקם",
          transliteration: "haraș vehoșev verokem",
          language: "ebraica",
          meaning: "meșter, iscoditor și cusător. Trei feluri de mâini, o singură lucrare.",
        },
      ],
      crossRefs: ["2 Timotei 2:2", "Exod 31:1-6", "Efeseni 4:12", "1 Petru 4:10", "Faptele apostolilor 18:26"],
      forYourHeart:
        "Ce ai primit nu este al tău ca să-l ții, ci ca să-l dai mai departe.",
    },
  ],
  prayer:
    "Doamne, ia ce am folosit greșit și pune-l în mâna Ta.\n\nDă-ne să aducem din îndemnul inimii, nu din rușinare.\n\nDacă nu avem aur, primește mâinile și vremea noastră.\n\nȘi învață-ne să dăm altora ce am învățat, ca lucrarea să nu se oprească la noi. Amin.",
})
