import { deuteronomChapter, teaching } from "./deuteronomHelpers.js"
import { deuteronomPassage } from "./deuteronomText.js"
import { DEUTERONOM_STATUSES } from "./deuteronomPublication.js"

/*
 * Cartea Deuteronom, explicată pe unități de sens.
 */

export const DEUTERONOM_4 = deuteronomChapter({
  number: 4,
  title: "Deuteronom 4 — Un Dumnezeu fără chip, și un popor chemat să nu-L schimonosească",
  summary:
    "Moise cere poporului să asculte legile fără să adauge sau să scoată nimic din ele, aducându-și aminte de ziua de la Horeb când au auzit glasul DOMNULUI fără să vadă vreun chip. De aici vine porunca hotărâtoare împotriva oricărui idol, avertismentul că necredincioșia va duce la exil, și făgăduința că pocăința îi va aduce înapoi. Capitolul se încheie cu cetățile de scăpare de la răsărit de Iordan și introducerea legii care va urma.",
  literaryContext:
    "Acesta este primul capitol pur exhortativ al cărții, cel care pregătește trecerea de la povestirea drumului la rostirea legii însăși. Tema lui centrală — Dumnezeu aud, dar niciodată văzut sub o formă — este piatra de temelie pentru interzicerea chipurilor cioplite în tot Vechiul Legământ.",
  historicalContext:
    "Neamurile din jurul lui Israel închipuiau divinitățile prin statui, animale sau corpuri cerești. Israel a auzit un glas la Horeb, dar nu a văzut niciun chip („n-ați văzut niciun chip în ziua când v-a vorbit DOMNUL”) — fapt care îl deosebește radical de religiile înconjurătoare și pune temeiul pentru interzicerea absolută a idolatriei.",
  units: [
    {
      id: "deuteronom-4-1-8",
      ref: "Deuteronom 4:1-8",
      heading: "Nici să adaugi, nici să scazi",
      text: deuteronomPassage(4, 1, 8),
      teaching: teaching(
        "Porunca de a nu adăuga și nu scoate nimic din cuvântul DOMNULUI apare aici pentru prima dată în Scriptură, și va răsuna din nou la finalul cărții (Deuteronom 12:32) și în Apocalipsa 22:18-19. Legea nu este un material brut pe care poporul îl poate modela cum îi convine, ci un cuvânt complet, dat spre păzire.",
        "Moise le amintește de Baal-Peor, o întâmplare recentă din propria lor generație (Numeri 25:1-9), ca dovadă văzută cu ochii lor a ce se întâmplă celor care se abat spre alți dumnezei: „DOMNUL, Dumnezeul tău, a nimicit din mijlocul tău pe toți cei ce s-au dus după Baal-Peor”.",
        "Israel este chemat să fie o mărturie înaintea neamurilor: „Este vreun neam așa de mare care să aibă legi și porunci așa de drepte ca acelea pe care vi le pun înainte astăzi?”. Învățătura lor însuși este menită să fie o binecuvântare văzută de restul lumii.",
      ),
      words: [
        {
          original: "לא תוספו עליו ולא תגרעו ממנו",
          transliteration: "lo tosifu alav velo tigreu mimenu",
          language: "ebraica",
          meaning:
            "să nu adăugați la el și să nu luați de la el. Formula de păstrare intactă a Legii, repetată identic în Deuteronom 12:32.",
        },
      ],
      crossRefs: ["Numeri 25:1-9", "Deuteronom 12:32", "Apocalipsa 22:18-19"],
      forYourHeart:
        "Cuvântul lui Dumnezeu nu este material de modelat pentru confortul tău; este dat spre păzire întocmai.",
    },
    {
      id: "deuteronom-4-9-14",
      ref: "Deuteronom 4:9-14",
      heading: "Un glas auzit, niciun chip văzut",
      text: deuteronomPassage(4, 9, 14),
      teaching: teaching(
        "Moise nu cere doar amintire, ci transmitere: „nu le uita și învață-le pe fiii tăi și pe fiii fiilor tăi”. Ceea ce ai văzut cu ochii tăi nu-ți aparține numai ție; este încredințat spre transmitere generațiilor care nu vor vedea niciodată ce ai văzut tu.",
        "Descrierea zilei de la Horeb este cutremurătoare în sobrietatea ei: „muntele era în flăcări până la mijlocul cerului, cu întuneric, nori și negură deasă”, și totuși — subliniat de două ori — „n-ați văzut niciun chip; n-ați auzit decât un glas”. Revelația lui Dumnezeu la Sinai este auditivă, nu vizuală.",
      ),
      words: [
        {
          original: "קול דברים",
          transliteration: "qol devarim",
          language: "ebraica",
          meaning:
            "glas de cuvinte. Israel a experimentat pe DOMNUL prin auz — cuvinte rostite — nu prin vedere; temeiul direct al interzicerii chipurilor cioplite.",
        },
      ],
      crossRefs: ["Exod 19:16-19", "Exod 20:18-21", "Ioan 1:18"],
      forYourHeart:
        "Credința ta se întemeiază pe cuvântul auzit și crezut, nu pe un chip văzut. Învață să asculți mai mult decât să ceri să vezi.",
    },
    {
      id: "deuteronom-4-15-24",
      ref: "Deuteronom 4:15-24",
      heading: "Un Dumnezeu gelos, care nu îngăduie chipuri",
      text: deuteronomPassage(4, 15, 24),
      teaching: teaching(
        "Porunca împotriva idolatriei se întinde în amănunt: nici chip de om, nici de femeie, nici de animal, pasăre, târâtoare sau pește, nici măcar de soare, lună sau stele. Orice lucru creat, oricât de măreț, devine idol în clipa în care omul îl închină în locul Creatorului lui.",
        "Motivul este direct: „DOMNUL, Dumnezeul tău, este un foc mistuitor, un Dumnezeu gelos”. Gelozia aceasta nu este o slăbiciune, ci râvna dreaptă a unui soț credincios față de un legământ exclusiv; Dumnezeu nu împarte cinstea cuvenită Lui cu niciun chip cioplit.",
        "Amenințarea capitolului este limpede din timp: dacă se vor strica făcând chipuri cioplite, „vă veți pierde cu totul și nu veți mai trăi multă vreme în țară”. Avertismentul de aici anticipează direct exilul care va fi descris în capitolul următor.",
      ),
      words: [
        {
          original: "אש אכלה",
          transliteration: "esh okhla",
          language: "ebraica",
          meaning:
            "foc mistuitor. Imaginea lui Dumnezeu ca foc arată deopotrivă sfințenia care nu îngăduie păcatul și puterea care poate apăra sau nimici.",
        },
      ],
      crossRefs: ["Exod 20:4-6", "Deuteronom 5:8-9", "Evrei 12:29"],
      forYourHeart:
        "Nu doar statuile sunt idoli; orice lucru creat pe care îl închini în locul lui Dumnezeu Îi ia locul cuvenit numai Lui.",
    },
    {
      id: "deuteronom-4-25-31",
      ref: "Deuteronom 4:25-31",
      heading: "Exilul prorocit, și mila care Îl urmează",
      text: deuteronomPassage(4, 25, 31),
      teaching: teaching(
        "Cu generații Înainte de a se ÎntÎmpla, Moise prorocește exact ce va urma: „veți fi nimiciți de grabă din țara pe care o veți lua în stăpÎnire... DOMNUL vă va Împrăștia Între neamuri”. Aceasta nu este o presupunere, ci o cunoaștere dinainte a inconstanței omenești, scrisă în text Înainte de întreaga istorie a împărățiilor de mai târziu.",
        "Chiar în mijlocul acestei amenințări grave stă o făgăduință mai mare: „Vei căuta pe DOMNUL, Dumnezeul tău, și-L vei găsi, dacă Îl vei căuta cu toată inima ta”. Exilul nu este cuvântul final; căutarea sinceră duce mereu Înapoi la un Dumnezeu Îndurător, care „nu te va părăsi, nici nu te va nimici, și nu va uita legământul”.",
      ),
      words: [
        {
          original: "בקשתם משם",
          transliteration: "biqashtem misham",
          language: "ebraica",
          meaning:
            "vei căuta de acolo (din exil). Căutarea lui Dumnezeu în mijlocul consecințelor păcatului rămâne mereu posibilă, oricât de Îndepărtată este țara în care te afli.",
        },
      ],
      crossRefs: ["2 Cronici 36:15-21", "Ieremia 29:12-14", "Neemia 1:8-9"],
      forYourHeart:
        "Nici cea mai grea consecință a păcatului tău nu este mai mare decât mila lui Dumnezeu pentru cel care Îl caută cu toată inima.",
    },
    {
      id: "deuteronom-4-32-40",
      ref: "Deuteronom 4:32-40",
      heading: "Fără seamăn în istoria lumii",
      text: deuteronomPassage(4, 32, 40),
      teaching: teaching(
        "Moise cere poporului să cerceteze toată istoria omenirii, „din ziua când a făcut Dumnezeu pe om pe pământ”, și să găsească vreun alt neam care a auzit glasul lui Dumnezeu vorbind din mijlocul focului și a trăit. Experiența lor la Horeb nu are asemănare în istoria omenirii.",
        "Concluzia teologică este rostită fără echivoc: „DOMNUL este Dumnezeu, în cer și pe pământ, și nu este altul”. Această declarație de monoteism absolut, rar exprimată așa de răspicat în restul Vechiului Legământ, este piatra de temelie a întregii teologii biblice.",
        "Din această unicitate decurge porunca practică: „să păzești poruncile Lui... ca să-ți fie bine, ție și copiilor tăi”. Cunoașterea corectă a lui Dumnezeu nu este scop în sine, ci temei pentru o ascultare care duce la bine.",
      ),
      words: [
        {
          original: "יהוה הוא האלהים",
          transliteration: "YHWH hu ha-Elohim",
          language: "ebraica",
          meaning:
            "DOMNUL, El este Dumnezeu. Formula de credință fundamentală a monoteismului biblic, repetată mai târziu în 1 Împărați 18:39 la Cara Carmel.",
        },
      ],
      crossRefs: ["1 Împarați 18:36-39", "Isaia 45:5-6", "Deuteronom 6:4"],
      forYourHeart:
        "Nicio experiență spirituală, oricât de măreață, are valoare în sine; valoarea ei este în ascultarea pe care o naște.",
    },
    {
      id: "deuteronom-4-41-49",
      ref: "Deuteronom 4:41-49",
      heading: "Cetăți de scăpare, și o carte care Începe",
      text: deuteronomPassage(4, 41, 49),
      teaching: teaching(
        "Înainte de a rosti legile din inima cărții, Moise așază trei cetăți de scăpare la răsărit de Iordan: Beser, Ramot și Golan. Chiar din primele pagini ale legislației sale, mila pentru cel ce ucide fără voie este pregătită practic, nu doar promisă teoretic.",
        "Capitolul se încheie cu o însemnare care marchează o răsucire literară: „Iată legea pe care a pus-o Moise înaintea fiilor lui Israel”, urmată de o reamintire geografică a locului — țara lui Sihon, cucerită deja. Recapitularea istorică se încheie aici, și îoi face loc rostirii legii însăși, care va începe în capitolul 5 cu Decalogul.",
      ),
      words: [
        {
          original: "ערי מקלט",
          transliteration: "arei miqlat",
          language: "ebraica",
          meaning:
            "cetăți de scăpare, refugiu pentru cel care a ucis fără voie, până la judecată. Rânduiala este dezvoltată pe larg în Numeri 35 și Deuteronom 19.",
        },
      ],
      crossRefs: ["Numeri 35:9-15", "Deuteronom 19:1-13", "Iosua 20:8"],
      forYourHeart:
        "Dumnezeu pregătește căi de scăpare pentru cel vinovat fără voie, chiar Înainte de a-ți cere toată ascultarea.",
    },
  ],
  prayer:
    "Doamne, Tu ne-ai vorbit prin cuvântul Tău, nu printr-un chip pe care să-l vedem și să-l stăpÎnim.\n\nPăzește-ne de orice idol, oricât de măreț ar fi lucrul creat pe care Îl punem în locul Tău.\n\nÎn ziua când vom cădea, amintește-ne că căutarea Ta cu toată inima ne va afla mereu pe Tine.\n\nȘi Învață-ne să trăim ca un neam fără asemănare, nu pentru slava noastră, ci pentru că Tu, DOMNUL, ești Dumnezeu, și nu este altul. Amin.",
  status: DEUTERONOM_STATUSES[4],
})
