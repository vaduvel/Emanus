import { exodChapter, teaching } from "./exodHelpers.js"

/*
 * Cartea Exod, explicată pe unități de sens.
 *
 * Textul biblic: Cornilescu, editia corectata (RCCV), păstrat separat în exodText.ts.
 * Explicația: scrisă pentru Emanus după cercetarea textului. Nu se copiază
 * formularea niciunui predicator sau comentator.
 */

export const EXOD_6 = exodChapter({
  number: 6,
  title: "Exod 6 — „Eu sunt Domnul”: răspunsul la întrebarea fără răspuns",
  summary:
    "La întrebarea amară a lui Moise — „pentru ce m-ai trimis?” — Dumnezeu nu răspunde cu o lămurire, ci cu Numele Său și cu un șir de făgăduințe la persoana întâi: vă voi izbăvi, vă voi scăpa, vă voi lua ca popor al Meu, vă voi aduce în țară. Moise duce solia, dar poporul nu o poate primi: sunt prea zdrobiți ca să mai asculte. Moise se împotrivește iarăși cu vechea lui plângere despre gura sa, și în mijlocul povestirii Scriptura așază pe neașteptate o spiță de neam — nume de oameni, fiindcă izbăvirea nu se face pentru o mulțime fără nume.",
  literaryContext:
    "Capitolul începe exact în locul unde se încheiase cel dinainte: acolo Moise spusese „n-ai izbăvit pe poporul Tău”, aici Dumnezeu începe cu „vei vedea acum ce voi face”. Ia aminte că miezul capitolului (versetele 6-8) este ținut în șapte făgăduințe care încep toate cu „Eu” și sunt încadrate de două ori de „Eu sunt Domnul” — aceleași șapte care vor fi citite în fiecare an la masa de Paște a evreilor. Spița neamului din versetele 14-25 pare a rupe șirul povestirii, dar are un rost: se oprește la Levi, ca să arate din ce casă vin Moise și Aaron, și se încheie legând firul înapoi: „aceștia sunt Aaron acela și Moise acela”. Iar capitolul se încheie iarăși cu plângerea lui Moise, ca să știm că tot ce urmează se face prin cineva care nu se simțea în stare.",
  historicalContext:
    "„Eu sunt Domnul” stă în ebraică pentru Numele descoperit la rug, YHWH. Textul nu spune că patriarhii n-ar fi rostit niciodată Numele acesta, ci că nu L-au cunoscut în puterea lui: ei L-au cunoscut pe Dumnezeu ca El Șadai, Cel Atotputernic, Care făgăduiește; urmașii lor Îl vor cunoaște ca Domnul, Cel Care Își împlinetește făgăduința în istorie. „Vă voi izbăvi” din versetul 6 folosește un cuvânt din rânduiala familiei: ruda cea mai apropiată avea datoria să plătească și să scoată din robie pe cel din neamul ei. „Braț întins” era o vorbire obișnuită în Egipt pentru puterea împăratului, și este întoarsă aici împotriva lui. Spițele de neam se păstrau cu grijă pentru că de ele atârnau moștenirea și, mai târziu, dreptul de preoție; așa se știe că Moise și Aaron erau din Levi, iar Core, care se va răscula în pustie, era văr cu ei.",
  units: [
    {
      verses: [1, 8],
      heading: "Șapte făgăduințe între două „Eu sunt Domnul”",
      teaching: teaching(
        "Moise încheiase cu „n-ai izbăvit”. Dumnezeu începe cu „vei vedea acum”. Nu îl ceartă pentru întrebare și nu-i explică de ce a îngăduit îngreunarea; îi dă altceva, mai bun decât o lămurire: pe Sine Însuși. „Eu sunt Domnul.” Adesea Dumnezeu nu ne răspunde la „pentru ce?”, ci ne descoperă cine este El — și abia acolo se liniștește inima.",
        "Ia aminte la deosebirea din versetul 3: patriarhii Îl cunoscuseră ca Cel Atotputernic, Care făgăduiește; poporul acesta Îl va cunoaște ca Domnul, Care Își împlinetește făgăduința în văzul lumii. Nu se spune că Numele era necunoscut, ci că puterea Numelui nu fusese încă văzută. Este cu putință să știi un nume al lui Dumnezeu și să nu-L fi cunoscut încă în felul acela.",
        "Și vezi ce sprijin își aduce Dumnezeu în minte: legământul. Nu vrednicia poporului — care nu era — ci cuvântul dat de El cu patru sute de ani mai înainte. „Mi-am adus aminte de legământul Meu.” Temeiul izbăvirii tale nu este starea ta de acum, ci făgăduința Lui de atunci.",
        "Apoi vin cele șapte, și toate încep cu „Eu”: vă voi izbăvi din munci, vă voi izbăvi din robie, vă voi scăpa cu braț întins, vă voi lua ca popor al Meu, Eu voi fi Dumnezeul vostru, veți cunoaște că Eu sunt Domnul, vă voi aduce în țară. Nu se cere nimic de la ei în rândurile acestea; toate sunt lucrări ale Lui. Și ia seama la rânduială: nu se oprește la scăparea din munci. Scopul nu este numai ieșirea din robie, ci „vă voi lua ca popor al Meu”. Cine înțelege mântuirea numai ca scăpare de ceva a auzit doar jumătate din făgăduință.",
        "Iar cuvântul folosit pentru „vă voi izbăvi” este luat din rânduiala familiei: ruda apropiată, care plătește și scoate din robie pe cel din neamul ei. Dumnezeu nu Se apropie de ei ca un stăpân mai bun, ci ca o rudă care are datorie de sânge față de ai Lui.",
      ),
      words: [
        {
          original: "אֵל שַדָּי",
          transliteration: "El Șadai",
          language: "ebraica",
          meaning:
            "Dumnezeul Cel Atotputernic. Numele sub care L-au cunoscut patriarhii, în vremea făgăduinței; urmașii Îl vor cunoaște ca Domnul, în vremea împlinirii.",
        },
        {
          original: "גָּאַל",
          transliteration: "gaal",
          language: "ebraica",
          meaning:
            "a răscumpăra ca rudă apropiată. Cel mai de aproape din neam avea datoria să plătească și să scoată din robie pe al său.",
        },
      ],
      crossRefs: [
        "Exod 5:22-23",
        "Exod 3:14-15",
        "Exod 2:24",
        "Geneza 17:1",
        "Rut 4:1-6",
        "Tit 2:14",
      ],
      forYourHeart:
        "Dumnezeu nu i-a lămurit lui Moise „pentru ce”; i-a spus cine este El. Poate că nici tu nu vei primi lămurirea pe care o ceri, ci ceva mai bun decât ea.",
    },
    {
      verses: [9, 13],
      heading: "Un popor prea zdrobit ca să asculte",
      teaching: teaching(
        "Cea mai frumoasă făgăduință din carte a fost dusă poporului — și nu a intrat. „Deznădejdea și robia aspră în care se aflau i-au împiedicat să asculte.” În ebraică stă acolo o vorbă care se traduce „scurtime de duh”: omul căruia nu i-a mai rămas suflare de la atâta apăsare. Nu era împotrivire și nu era necredință batjocoritoare; era sfârșeală.",
        "Ia aminte la lucrul acesta, căci se cade să fim blânzi cu oamenii: se poate ca o făgăduință adevărată, spusă în ceasul cel mai potrivit, să nu fie primită, și asta nu fiindcă omul nu vrea, ci fiindcă este strivit. Cine este strivit are nevoie întâi să fie ușurat, ca să mai poată auzi. Ia însă aminte și că Dumnezeu nu Se oprește fiindcă ei nu pot asculta — îi va scoate și pe niște oameni care nu mai aveau puterea să creadă făgăduința.",
        "Iar Moise vine cu vechea lui plângere, și acum îi dă un temei nou: „nici copiii lui Israel nu m-au ascultat: cum are să m-asculte Faraon?” Ne facem din nereușitele de ieri o socoteală despre ce va fi mâine. Este o socoteală din care Dumnezeu lipsește.",
        "Și vezi ce face Dumnezeu: „a vorbit lui Moise și lui Aaron, și le-a dat porunci”. Nu îl mustră, nu îl roagă, nu Se ceartă cu el: îi dă poruncă mai departe. Uneori leacul împotriva descurajării nu este o vorbă de mângâiere, ci ceea ce ai de făcut astăzi.",
      ),
      words: [
        {
          original: "מִקֹצֶר רוּחַ",
          transliteration: "mikkoțer ruah",
          language: "ebraica",
          meaning:
            "din scurtime de duh; suflarea tăiată de apăsare. Nu împotrivire, ci sfârșeală: omul strivit nu mai are cu ce să primească o făgăduință.",
        },
        {
          original: "עֲרַל שְפָתַיִם",
          transliteration: "aral sfatayim",
          language: "ebraica",
          meaning:
            "netăiat împrejur la buze. Așa își numește Moise slăbiciunea vorbirii; textul îl lasă să se plângă și îi dă poruncă mai departe.",
        },
      ],
      crossRefs: [
        "Exod 4:31",
        "Exod 5:21",
        "Exod 4:10",
        "Matei 12:20",
        "Psalmi 34:18",
      ],
      forYourHeart:
        "Erau prea striviți ca să mai poată crede o făgăduință bună — și Dumnezeu i-a scos oricum. Dacă astăzi nu ai putere nici să crezi, El nu Se oprește din pricina asta.",
    },
    {
      verses: [14, 25],
      heading: "O spiță de neam în mijlocul izbăvirii",
      teaching: teaching(
        "În mijlocul unei povestiri încordate, Scriptura se oprește și înșiră nume. Nu pare la locul lui, și tocmai de aceea trebuie luat aminte: Dumnezeu nu scoate „o mulțime”, ci fii ai lui Ruben, ai lui Simeon, ai lui Levi, cu numele lor și cu anii vieții lor. Faraon vedea o mână de lucru; Dumnezeu îi știa pe nume, unul cu unul.",
        "Și vezi unde se oprește șirul: ajunge la Levi și rămâne acolo. Nu se înșiră toate cele douăsprezece seminții, fiindcă rostul nu este o socoteală întreagă, ci un răspuns la o întrebare pe care cititorul o are pe limbă: cine sunt acești doi oameni? Sunt din casa lui Levi. Nu vin din senin și nu se ridică singuri; au un neam, o casă, o însemnare în carte.",
        "Ia aminte și la ce nu se ascunde. Amram a luat de nevastă pe mătușa lui — lucru pe care Legea dată mai târziu îl va opri. În șirul acesta stă și Core, care se va răscula împotriva lui Moise în pustie. Scriptura nu își înnegrește și nu își înfrumusețează oamenii; îi scrie așa cum au fost, și din case ca acestea ridică Dumnezeu pe cei prin care lucrează.",
        "Iar la capătul șirului stă Fineas, născut din Eleazar — om care va trăi abia în vremea pustiei. Însemnarea aceasta privește înainte: izbăvirea nu se încheie cu cei care ies din Egipt. Dumnezeu lucrează pe măsura neamurilor, nu a unei singure vieți. Iar dacă numele acestor robi au fost ținute minte și scrise, atunci și numele tău este știut.",
      ),
      words: [
        {
          original: "רָאשֵי בֵּית־אֲבֹתָם",
          transliteration: "rașei beit avotam",
          language: "ebraica",
          meaning:
            "căpeteniile caselor părinților lor. Nu o listă fără rost: din spița aceasta atârnau moștenirea și, mai târziu, preoția.",
        },
        {
          original: "לֵוִי",
          transliteration: "Levi",
          language: "ebraica",
          meaning:
            "Levi — fiul care se făcuse vinovat de vărsare de sânge în Geneza. Din casa lui vin Moise și Aaron, și mai târziu preoția.",
        },
      ],
      crossRefs: [
        "Geneza 46:8-11",
        "Levitic 18:12",
        "Numeri 16:1-3",
        "Numeri 25:10-13",
        "Isaia 43:1",
      ],
      forYourHeart:
        "Faraon vedea o mână de lucru; Dumnezeu a pus în carte numele robilor, unul cu unul. Nu ești pentru El un număr din mulțime.",
    },
    {
      verses: [26, 30],
      heading: "„Aceștia sunt Moise acela și Aaron acela”",
      teaching: teaching(
        "După șirul numelor, textul se întoarce la povestire și îi arată cu degetul: „aceștia sunt Aaron acela și Moise acela, cărora le-a zis Domnul”. Se spune de două ori, și o dată cu numele în ordine întoarsă, ca să nu rămână nicio îndoială că tot lucrul cel mare care urmează se face prin doi oameni cu neam, cu părinți și cu vieți numărate în ani — nu prin îngeri.",
        "„Spune lui Faraon tot ce-ți spun.” Tot: nu ce se poate primi, nu ce sună bine înaintea unui împărat. Cel trimis nu este stăpânul soliei, ci purtătorul ei. Iar de aici încolo Moise nu va mai fi întrebat dacă se simte în stare.",
        "Și totuși, capitolul se încheie cu plângerea: „Iată că eu nu vorbesc ușor: cum are să m-asculte Faraon?” Ia aminte că Scriptura nu ascunde asta și nu-l face pe Moise mai tare decât a fost. Omul acesta nu se schimbă dintr-o întrebare; el va merge la Faraon tot cu gura lui încurcată și tot cu îndoiala nedusă pe deplin. Dumnezeu nu așteaptă să fim gata; așteaptă să pornim.",
        "Ia seama, la urmă, cum stau lucrurile la capătul acestor două capitole: robia s-a îngreunat, poporul nu poate asculta, trimisul nu se simte în stare, iar împăratul nici nu vrea să știe cine este Domnul. Ai socoti că lucrarea a eșuat înainte de a începe. Și tocmai aici încep urăciunile și ieșirea. Cel care judecă lucrarea lui Dumnezeu după cum arată ea la mijloc se înșală mai totdeauna.",
      ),
      words: [
        {
          original: "צִבְאֹתָם",
          transliteration: "țivotam",
          language: "ebraica",
          meaning:
            "oștirile lor. Robii care strângeau miriște sunt numiți de Dumnezeu oștiri — numele acesta merge înaintea stării lor de acum.",
        },
        {
          original: "כָּל־אֲשֶר אֲנִי דֹבֵר",
          transliteration: "kol așer ani dover",
          language: "ebraica",
          meaning:
            "tot ce vorbesc Eu. Solia se duce întreagă; cel trimis nu are voie să aleagă din ea partea care se primește mai lesne.",
        },
      ],
      crossRefs: [
        "Exod 6:12",
        "Exod 7:1-2",
        "Ieremia 1:7",
        "Fapte 20:27",
        "1 Corinteni 1:26-29",
      ],
      forYourHeart:
        "Robia se îngreunase, poporul nu putea asculta, trimisul nu se simțea în stare — și exact de aici a început ieșirea. Nu judeca lucrarea lui Dumnezeu după cum arată la mijloc.",
    },
  ],
  prayer:
    "Doamne, Tu ai răspuns la întrebarea amară a lui Moise cu Numele Tău: „Eu sunt Domnul”.\n\nCând nu primim lămurirea pe care o cerem, descoperă-Te Tu Însuți, că este mai mult.\n\nAdu-ți aminte de legământul Tău, căci nu avem alt temei; și împlinetește pentru noi făgăduințele în care Tu faci totul.\n\nFii blând cu cei care sunt atât de striviți încât nu mai pot primi nici o veste bună; ușurează-i, și dă-le iarăși suflare. Și învață-ne să nu ne oprim când lucrarea Ta arată la mijloc ca o înfrângere. Amin.",
})
