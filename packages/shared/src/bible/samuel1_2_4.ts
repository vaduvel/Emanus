import { samuel1Chapter, teaching } from "./samuel1Helpers.js"
import { samuel1Passage } from "./samuel1Text.js"
import { SAMUEL1_STATUSES } from "./samuel1Publication.js"

export const SAMUEL1_2 = samuel1Chapter({
  number: 2,
  title: "1 Samuel 2 — Cei care Îl cinstesc pe Dumnezeu și cei care Îl disprețuiesc",
  summary: "Ana Îl laudă pe DOMNUL, care smerește și înalță. În timp ce Samuel slujește și crește, fiii lui Eli disprețuiesc jertfele și trăiesc în necurăție. Eli îi mustră slab, iar un om al lui Dumnezeu vestește judecata asupra casei sale.",
  literaryContext: "Capitolul așază cântecul Anei lângă contrastul dintre Samuel și fiii lui Eli. Poonen vede aici două direcții: un copil consacrat care crește în mijlocul corupției și o familie preoțească în care tatăl își cinstește fiii mai mult decât pe Dumnezeu.",
  historicalContext: "Slujirea se desfășoară la Silo, înaintea stabilirii templului din Ierusalim. Fiii lui Eli ocupă poziții preoțești, dar folosesc slujirea pentru câștig și imoralitate.",
  units: [
    {
      id: "1-samuel-2-1-10",
      ref: "1 Samuel 2:1-10",
      heading: "Ana Îl laudă pe Dumnezeul care smerește și înalță",
      text: samuel1Passage(2, 1, 10),
      teaching: teaching(
        "Rugăciunea Anei mută atenția de la dar la Dătător. Ea Îl laudă pe DOMNUL ca sfânt, tare și drept, Cel care răstoarnă mândria și ridică pe cel slab.",
        "Poonen vede în rugăciunea ei începutul lucrării care îl va face pe Samuel legătura dintre haosul Judecătorilor și domnia lui David.",
      ),
      crossRefs: ["Luca 1:46-55"],
      forYourHeart: "După ce primești răspunsul, nu lăsa darul să ia locul Celui care l-a dat.",
    },
    {
      id: "1-samuel-2-11-26",
      ref: "1 Samuel 2:11-26",
      heading: "Samuel crește în timp ce fiii lui Eli corup slujirea",
      text: samuel1Passage(2, 11, 26),
      teaching: teaching(
        "Fiii lui Eli sunt numiți oameni fără valoare, care nu-L cunosc pe DOMNUL. Poonen subliniază gravitatea faptului că oameni lipsiți de frica lui Dumnezeu rămân activi în slujire.",
        "Eli aude ce fac, dar răspunsul său este slab. Nu îi îndepărtează din slujirea pe care o dezonorează, deși răul lor îi atinge pe oamenii veniți să se închine.",
        "În același mediu, Samuel slujește și crește în trecere înaintea DOMNULUI și a oamenilor. Corupția din jur nu trebuie să devină scuza coruperii lui.",
      ),
      crossRefs: ["Luca 2:52"],
      forYourHeart: "Poți rămâne curat chiar într-un mediu religios compromis. Nu lăsa păcatul altora să-ți stabilească standardul.",
    },
    {
      id: "1-samuel-2-27-36",
      ref: "1 Samuel 2:27-36",
      heading: "«Pe cei ce Mă cinstesc îi voi cinsti»",
      text: samuel1Passage(2, 27, 36),
      teaching: teaching(
        "Omul lui Dumnezeu îi spune lui Eli că și-a cinstit fiii mai mult decât pe DOMNUL. Poonen face din 1 Samuel 2:30 un adevăr de păstrat toată viața: Dumnezeu îi cinstește pe cei care Îl cinstesc.",
        "Problema lui Eli nu este doar slăbiciunea de părinte, ci refuzul de a opri răul atunci când slujirea și poporul lui Dumnezeu sunt vătămate.",
        "Poziția preoțească nu anulează răspunderea. Dumnezeu nu acceptă ca legăturile de familie să fie puse deasupra cinstei datorate Lui.",
      ),
      words: [
        {
          original: "כָּבוֹד",
          transliteration: "kavod",
          language: "ebraica",
          meaning: "greutate, cinste, slavă. În context, Eli a dat mai multă greutate fiilor săi decât DOMNULUI, iar Dumnezeu declară că îi va cinsti pe cei care Îl cinstesc.",
        },
      ],
      crossRefs: ["Matei 10:37"],
      forYourHeart: "Nu proteja relația, funcția sau reputația familiei cu prețul adevărului și al cinstei lui Dumnezeu.",
    },
  ],
  prayer: "Doamne, fă-ne oameni care Te cinstesc mai mult decât poziția, familia și reputația.\n\nPăzește-ne curați în mijlocul compromisului și dă-ne curaj să oprim răul care rănește poporul Tău. Amin.",
  status: SAMUEL1_STATUSES[2],
})

export const SAMUEL1_3 = samuel1Chapter({
  number: 3,
  title: "1 Samuel 3 — «Vorbește, căci robul Tău ascultă»",
  summary: "Într-o vreme când cuvântul DOMNULUI era rar, Dumnezeu îl cheamă pe Samuel. El învață să răspundă, primește mesajul greu despre casa lui Eli și îl spune fără să ascundă nimic. DOMNUL este cu el și nu lasă niciunul dintre cuvintele lui să cadă la pământ.",
  literaryContext: "După contrastul din capitolul 2, capitolul 3 arată începutul lucrării profetice a lui Samuel. Poonen concentrează lecția asupra disponibilității de a asculta și asupra fidelității de a spune tot ce a spus Dumnezeu.",
  historicalContext: "Samuel este încă tânăr și slujește la Silo sub Eli. Lipsa viziunilor și raritatea cuvântului profetic marchează sărăcia spirituală a perioadei.",
  units: [
    {
      id: "1-samuel-3-1-10",
      ref: "1 Samuel 3:1-10",
      heading: "O inimă mereu gata să asculte",
      text: samuel1Passage(3, 1, 10),
      teaching: teaching(
        "Samuel nu recunoaște imediat glasul DOMNULUI, dar răspunde de fiecare dată cu disponibilitate. Când Eli înțelege ce se întâmplă, îl învață să spună: «Vorbește, căci robul Tău ascultă».",
        "Poonen prezintă această propoziție ca atitudinea de păstrat toată viața. Dumnezeu poate vorbi prin Scriptură, printr-un om, în adunare sau în singurătate; esențial este ca robul să fie atent și dornic să asculte.",
      ),
      words: [
        {
          original: "דַּבֵּר כִּי שֹׁמֵעַ עַבְדֶּךָ",
          transliteration: "daber ki șomea avdekha",
          language: "ebraica",
          meaning: "vorbește, căci robul Tău ascultă. Verbul șama înseamnă a auzi cu atenție și, în limbajul legământului, implică răspunsul ascultării.",
        },
      ],
      crossRefs: ["Psalmul 119:18"],
      forYourHeart: "Păstrează înaintea lui Dumnezeu o inimă care spune nu doar «vreau să vorbesc», ci «vreau să ascult».",
    },
    {
      id: "1-samuel-3-11-18",
      ref: "1 Samuel 3:11-18",
      heading: "Samuel spune tot mesajul, deși este greu",
      text: samuel1Passage(3, 11, 18),
      teaching: teaching(
        "Primul mesaj încredințat lui Samuel este o vestire de judecată asupra casei lui Eli. Dimineața îi este teamă să-l spună, dar când este întrebat nu ascunde nimic.",
        "Poonen arată că un slujitor adevărat nu schimbă mesajul pentru că omul din fața lui i-a făcut bine sau pentru că vestea îl va durea. Ascultarea de Dumnezeu este mai presus de dorința de a păstra aprobarea omului.",
      ),
      crossRefs: ["Faptele 20:27"],
      forYourHeart: "Adevărul spus cu respect nu trebuie tăiat ca să păstrezi sprijinul unei persoane importante.",
    },
    {
      id: "1-samuel-3-19-21",
      ref: "1 Samuel 3:19-21",
      heading: "Niciun cuvânt nu cade la pământ",
      text: samuel1Passage(3, 19, 21),
      teaching: teaching(
        "DOMNUL este cu Samuel, iar cuvintele lui nu rămân goale. Poonen vede aici o chemare pentru orice om care vorbește: să caute o viață cu Dumnezeu din care cuvintele publice și conversațiile private să ajungă la inimă, nu să fie risipite.",
        "Secretul nu este tehnica vorbirii, ci faptul că DOMNUL era cu Samuel. Pentru că a ascultat, a putut să spună ceea ce primise.",
      ),
      crossRefs: ["Isaia 55:10-11"],
      forYourHeart: "Înainte să dorești cuvinte puternice, caută prezența lui Dumnezeu și deprinderea de a asculta.",
    },
  ],
  prayer: "Vorbește, Doamne, căci robii Tăi ascultă.\n\nDă-ne curaj să nu ascundem adevărul și fă ca vorbele noastre să vină dintr-o viață în care Tu ești prezent. Amin.",
  status: SAMUEL1_STATUSES[3],
})

export const SAMUEL1_4 = samuel1Chapter({
  number: 4,
  title: "1 Samuel 4 — Chivotul nu poate înlocui ascultarea",
  summary: "Israel este înfrânt de filisteni și aduce chivotul legământului în tabără, crezând că simbolul prezenței lui Dumnezeu îi va garanta victoria. Înfrângerea devine mai grea, Hofni și Fineas mor, chivotul este capturat, iar moartea lui Eli și nașterea lui I-Cabod încheie capitolul.",
  literaryContext: "Capitolul împlinește judecata vestită casei lui Eli și arată că obiectul sfânt nu poate fi folosit ca talisman. Poonen tratează această scenă ca avertisment împotriva simbolului, ritualului și entuziasmului fără o conștiință curată.",
  historicalContext: "Chivotul reprezenta legământul și prezența DOMNULUI în mijlocul lui Israel. Bătrânii îl mută din Silo pe câmpul de luptă fără ca textul să consemneze pocăință sau poruncă divină.",
  units: [
    {
      id: "1-samuel-4-1-11",
      ref: "1 Samuel 4:1-11",
      heading: "Simbolul este adus în locul pocăinței",
      text: samuel1Passage(4, 1, 11),
      teaching: teaching(
        "După prima înfrângere, bătrânii întreabă de ce i-a lovit DOMNUL, dar răspunsul lor nu este cercetarea păcatului, ci aducerea chivotului.",
        "Poonen avertizează că poți avea simbolul fără Dumnezeu: poți participa la ritual, poți striga și poți folosi limbajul închinării, dar acestea nu înlocuiesc o conștiință curată și despărțirea de idolatrie.",
        "Strigătul puternic nu schimbă realitatea spirituală. După aducerea chivotului, pierderea este mult mai mare, iar chivotul este capturat.",
      ),
      crossRefs: ["1 Corinteni 10:1-12"],
      forYourHeart: "Nu folosi un obiect, un ritual sau intensitatea emoției ca înlocuitor pentru ascultare și pocăință.",
    },
    {
      id: "1-samuel-4-12-22",
      ref: "1 Samuel 4:12-22",
      heading: "Judecata casei lui Eli și numele I-Cabod",
      text: samuel1Passage(4, 12, 22),
      teaching: teaching(
        "Moartea fiilor lui Eli, pierderea chivotului și moartea lui Eli împlinesc cuvântul vestit anterior.",
        "Nora lui Eli își numește copilul I-Cabod, legând nașterea de plecarea slavei din Israel. Numele surprinde nu lipsa de putere a lui Dumnezeu, ci prăbușirea unui popor care a încercat să poarte simbolul fără să-I cinstească prezența.",
      ),
      words: [
        {
          original: "אִי־כָבוֹד",
          transliteration: "I-kavod",
          language: "ebraica",
          meaning: "fără slavă sau unde este slava? Numele exprimă durerea provocată de capturarea chivotului și de judecata asupra casei preoțești.",
        },
      ],
      crossRefs: ["1 Samuel 2:27-36"],
      forYourHeart: "Nu te liniști cu semnul exterior al credinței când viața ta Îl dezonorează pe Dumnezeu.",
    },
  ],
  prayer: "Doamne, păzește-ne de credința care se sprijină pe simboluri, ritualuri și zgomot, dar nu vrea pocăință.\n\nDă-ne o conștiință curată și o viață care cinstește prezența Ta. Amin.",
  status: SAMUEL1_STATUSES[4],
})
