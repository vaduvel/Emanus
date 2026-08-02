import { marcuChapter, teaching } from "./marcuHelpers.js"

/*
 * Evanghelia după Marcu, explicată pe unități de sens.
 *
 * Textul biblic: Cornilescu, editia corectata (RCCV), păstrat separat în marcuText.ts.
 * Explicația: scrisă pentru Emanus după cercetarea textului și a surselor
 * declarate în docs/41-plan-scriere-marcu.md. Nu se copiază formularea
 * niciunui predicator sau comentator.
 */

export const MARCU_5 = marcuChapter({
  number: 5,
  title: "Marcu 5 — Stăpân peste duhuri, boală și moarte",
  summary:
    "Isus trece în ținutul gadarenilor și eliberează un om stăpânit de o legiune de draci; întors peste mare, pe drum spre casa lui Iair, vindecă o femeie care de doisprezece ani avea o scurgere de sânge, apoi Își arată stăpânirea asupra morții când scoală fetița fruntașului sinagogii. În toate cele trei întâlniri se arată același lucru: Isus este Domn — peste duhurile necurate, peste boala fără leac și peste moarte.",
  literaryContext:
    "Capitolul 5 răspunde întrebării care a rămas în corabie la sfârșitul capitolului 4: «Cine este Acesta de Îl ascultă chiar și vântul și marea?». Răspunsul vine pe trei trepte: ascultarea duhurilor necurate (5:1-20), ascultarea bolii (5:25-34) și ascultarea morții (5:35-43). Marcu împletește aici două povestiri una în alta: drumul spre casa lui Iair este întrerupt de femeia cu scurgerea de sânge, încât întârzierea care pare o piedică devine parte a lucrării. Numărul doisprezece leagă cele două nevoi: doisprezece ani de suferință pentru femeie, doisprezece ani de viață pentru copilă.",
  historicalContext:
    "Gadara făcea parte din Decapole, zece cetăți elenistice la est de Iordan, unde creșterea porcilor — necurată după lege (Levitic 11:7) — era obișnuită. Locuința în morminte îl făcea pe om necurat (Numeri 19:11), iar femeia cu scurgere de sânge era oprită de lege de la închinare (Levitic 15:25-30): doisprezece ani în afara comunității. La înmormântări, bocitoarele umpleau casa cu zarva plânsului (Matei 9:23), iar cuvintele „Talita, cumi”, păstrate de Marcu în aramaică, ne lasă să auzim glasul Domnului așa cum a răsunat în casa aceea.",
  units: [
    {
      verses: [1, 20],
      heading: "Legiune este numele meu",
      teaching: teaching(
        "Isus trece marea cu întrebarea care rămăsese în corabie: cine este Acesta, de Îl ascultă chiar și vântul și marea (4:41)? Pe celălalt țărm, îl așteaptă un om pe care nimeni nu mai putea să-l țină: locuia în morminte, rupsese cătușele și sfărâmase obezile, țipa zi și noapte și se tăia cu pietre (5:2-5). Povestirea nu ne explică de unde vine o asemenea robie și nici nu o preface în învățătură despre altcineva; se mărginește să ne arate ce face Domnul Isus când întâlnește robia: nu o ocolește.",
        "Omul aleargă, I se închină și strigă: „Ce am eu a face cu Tine, Isuse, Fiul Dumnezeului celui Preaînalt?”. Duhurile Îl recunosc pe Fiul lui Dumnezeu mai repede decât oamenii care tocmai Îl văzuseră liniștind marea. Isus nu se apucă să discute cu ele: întreabă numele, și aude răspunsul: „Numele meu este „legiune””. Un singur nume arată cât întuneric încăpea într-un singur om — și o singură poruncă a fost de ajuns: „Duh necurat, ieși afară din omul acesta!”. Povestirea nu descrie nicio metodă de eliberare; ea ne arată o Persoană cu autoritate. Porcii, aproape două mii, s-au înecat în mare, iar omul este găsit îmbrăcat și întreg la minte: pierderea turmei a fost prețul mărturiei văzute că duhurile au plecat. Domnul cântărește altfel decât oamenii: un suflet omensec valorează mai mult decât orice turmă din lume.",
        "Cei din cetate îl găsesc pe om schimbat și se înspăimântă; apoi Îl roagă pe Isus să plece din ținutul lor. Pierderea porcilor a contat pentru ei mai mult decât omul eliberat: voiau să rămână cu turma lor, nu cu Domnul. Povestirea ne pune și nouă aceeași întrebare: ce este gata să ceară Isus de la noi — și ce suntem gata să lăsăm? Omul eliberat Îl roagă să rămână cu El, dar Domnul îl trimite acasă: „Du-te acasă la ai tăi și povestește-le tot ce ți-a făcut Domnul și cum a avut milă de tine”. El pleacă și vestește prin Decapole, în zece cetăți, tot ce-i făcuse Isus. Așa devine un eliberat martor: nu o metodă de vestit, ci o milă de povestit. De aici nu luăm dreptul să căutăm duhuri în oameni și nici să diagnosticăm pe cineva de la distanță; creștinii înțeleg practica eliberării în moduri diferite, dar toți stăm înaintea aceluiași Domn, a cărui poruncă este de ajuns. Crucea Lui a dezarmat puterile întunericului (Coloseni 2:15): cine stă în lumina Lui, nu mai stă în frică.",
      ),
      words: [
        {
          original: "λεγιών",
          transliteration: "legion",
          language: "greaca",
          meaning:
            "legiune — o cohortă romană cu mii de soldați. Un singur nume arată câte duhuri stăpâneau omul acela — și o singură poruncă a Domnului a fost de ajuns.",
        },
      ],
      crossRefs: ["Matei 8:28-34", "Luca 8:26-39", "Coloseni 2:15"],
      forYourHeart:
        "Niciun lanț n-a ținut pe omul acela, dar o poruncă a Domnului l-a eliberat. Acolo unde ești tu acum, poate ajunge El — și te cheamă să povestești ce a făcut.",
    },
    {
      verses: [21, 34],
      heading: "Credința ta te-a mântuit",
      teaching: teaching(
        "Isus pleacă din ținutul gadarenilor, pentru că acolo nu mai era primit, și Se întoarce peste mare. Îl așteaptă un fruntaș al sinagogii, Iair, care cade la picioarele Lui: „Fetița mea trage să moară; rogu-Te, vino de-Ți pune mâinile peste ea, ca să se facă sănătoasă și să trăiască”. Isus se oprește din drum: nu făcuse planul să întâlnească un fruntaș îndurerat, dar nu întoarce spatele unei nevoi care I se pune în cale. Pe drum, mulțimea Îl îmbulzește; în mulțime este o femeie care de doisprezece ani avea o scurgere de sânge. Suferise mult de la mulți doctori, cheltuise tot ce avea și nu simțise nicio ușurare; legea o oprea de la închinare (Levitic 15:25-30): doisprezece ani în afara casei și a comunității. Povestirea istorisește ce a pățit femeia aceasta cu doctorii ei — nu judecă medicina: Dumnezeu lucrează și prin doctori și prin leacuri, iar credința nu cere să rămânem fără ajutorul celor pricepuți.",
        "Femeia a auzit vorbindu-se despre Isus și își zicea: „Dacă aș putea doar să mă ating de haina Lui, mă voi tămădui”. Vine pe dinapoi, se atinge — și îndată îi secă izvorul sângelui; simte în tot trupul ei că s-a tămăduit. Mulțimea îmbrâncea, dar numai credința atinge: Isus simte puterea care a ieșit din El și întreabă: „Cine s-a atins de hainele Mele?”. E deosebirea dintre a fi lângă Domnul și a ajunge la Domnul: mulți erau în mulțime, una singură s-a atins. Femeia vine înfricoșată, se aruncă la picioarele Lui și spune tot adevărul. Isus nu o ceartă: o cheamă „fiică” — cuvântul care o întoarce din izolare în familie — și îi zice: „credința ta te-a mântuit; du-te în pace și fii tămăduită de boala ta”. Nu haina a vindecat; credința ei într-o Persoană a vindecat.",
        "Vindecarea n-a fost o formulă, ci o întâlnire: puterea a ieșit din Isus, iar El a căutat fața femeii ca s-o întoarcă la oameni, nu s-o lase ascunsă în frică. Cuvântul grecesc pentru „mântuit” acoperă și trupul, și sufletul: mântuirea nu este doar despre lumea de dincolo, ci despre omul întreg. Și totuși povestirea nu ne promite că oricine va fi vindecat: vindecarea stă în voia Domnului, iar El este același și azi. Ceea ce ne rămâne din episod este credința: să ne atingem de El — nu ca de un obicei, ci ca de o Persoană vie. Femeia n-a întrebat dacă este vrednică; s-a atins. Domnul n-a întrebat-o cine este; a chemat-o „fiică”.",
      ),
      words: [
        {
          original: "σώζω",
          transliteration: "sozo",
          language: "greaca",
          meaning:
            "mântuiesc, fac întreg, tămăduiesc. Cuvântul acoperă și sufletul, și trupul: mântuirea nu este doar despre lumea de dincolo.",
        },
      ],
      crossRefs: ["Levitic 15:25-30", "Matei 9:20-22", "Luca 8:43-48"],
      forYourHeart:
        "Femeia a venit din spate, cu frică, și a plecat în pace, chemată „fiică”. Și tu nu ești unul din mulțime pentru Domnul: credința ta este văzută.",
    },
    {
      verses: [35, 43],
      heading: "Copila n-a murit, ci doarme",
      teaching: teaching(
        "Pe când vorbea Isus încă, vin oameni de la casa lui Iair cu vestea care pare să închidă totul: „Fiica ta a murit; pentru ce mai superi pe Învățătorul?”. Pentru oameni, cazul s-a terminat. Isus nu primește vestea ca un verdict: „Nu te teme, crede numai!”. Credința este chemată tocmai atunci când veștile o contrazic — și nu i se spune fetiței, ci tatălui: nimeni nu este chemat să creadă singur. Iar la ușa casei, Isus întâlnește zarva și plânsul și le zice: „Pentru ce faceți atâta zarvă și pentru ce plângeți? Copila n-a murit, ci doarme”. Lumea plânge moartea; Isus o cheamă somn — nu ca s-o micșoreze, ci pentru că El are cuvântul deșteptării.",
        "Cei din casă râd de El, și Isus îi scoate afară; înăuntru rămân numai părinții și cei trei ucenici. Nu este o ceremonie în fața lumii; este lucrarea liniștită a unui Domn. A apucat-o de mână pe fetiță și i-a zis: „Talita, cumi”, care tălmăcit înseamnă: „Fetițo, scoală-te îți zic!”. Marcu ne lasă să auzim glasul aramaic al Domnului: El n-a cerut ca să se facă, ci a poruncit ca să fie. Îndată fetița s-a sculat și a început să umble; cei de față au rămas încremeniți. Și Isus, în loc să facă din minune un spectacol, poruncește să nu spună nimănui și cere să i se dea de mâncare fetiței: minunea este adevărată, iar viața reia cursul firesc — copila mănâncă și umblă, ca orice fetiță de doisprezece ani.",
        "Minunile Domnului n-au fost un spectacol, ci semnele prin care Tatăl Îl arăta lumii pe Fiul Său (Fapte 2:22). De aceea Isus nu căuta publicitate și cerea să nu se vestească: El nu venise să fie cunoscut ca făcător de minuni, ci ca Mântuitor. Și nici noi n-avem aici o formulă pentru moarte: puterea n-a stat în cuvintele „Talita, cumi”, ci în Cine le rostea. Stăpânirea Lui asupra morții se întărește puțin mai târziu, când El Însuși trece prin moarte și învie (Marcu 16:6). De aceea Biserica a învățat să vorbească despre moarte ca despre somn — nu pentru că moartea n-ar fi reală și dureroasă, ci pentru că la capătul ei stă Cel care deșteaptă. Credința aceasta nu promite că cineva drag se va întoarce acum; ea este nădejdea că moartea nu are ultimul cuvânt, pentru că Domnul a înviat.",
      ),
      words: [
        {
          original: "καθεύδω",
          transliteration: "katheudo",
          language: "greaca",
          meaning:
            "dorm. Isus vorbește despre moarte cu un cuvânt pe care îl vor folosi apoi toți ai Lui: pentru cine este al Lui, moartea este somnul dinaintea deșteptării.",
        },
      ],
      crossRefs: ["Matei 9:23-26", "Luca 8:49-56", "Ioan 11:1-44", "Marcu 16:6"],
      forYourHeart:
        "Când veștile oamenilor spun „s-a terminat”, Domnul spune: „Nu te teme, crede numai!”. Moartea nu are ultimul cuvânt pentru cine se încrede în Cel care a înviat.",
    },
  ],
  prayer:
    "Doamne Isuse, Fiul Dumnezeului celui Preaînalt, Tu ești Domn peste duhurile necurate, peste boală și peste moarte. Îți mulțumim că nu întorci spatele niciunei nevoi: ai stat în drum pentru femeia din mulțime, ai mers cu Iair, ai sculat copila. Dă-ne credința care se atinge de Tine, curajul care crede când veștile sunt rele și smerenia celui eliberat, care vestește mila Ta. Păzește-ne să nu punem nimic în locul Tău — nici turma, nici frica, nici o formulă — și dă-ne nădejdea care privește moartea cu ochii Tăi, pentru că Tu ai înviat. Amin.",
})
