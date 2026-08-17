import {
  assertCompleteOverlay,
  transcriptFocusedChapters,
  type ExplainedBookOverlay,
  type ExplainedOverlayChapter,
} from "../explainedOverlay.js"

const transcript = ".research/poonen-through-the-bible-OT/transcripts/isaiah.txt"
const p = (anchor: string) => ({ kind: "poonen" as const, transcript, anchor })

const focused: Record<number, ExplainedOverlayChapter> = {
  1: {
    number: 1,
    title: "Ritual mult, conștiință murdară și chemarea la curățire",
    summary: "Isaia confruntă un popor care păstrează adunări, jertfe și rugăciuni, dar trăiește în nedreptate. Poonen insistă asupra diferenței dintre religie și ascultare.",
    units: [{
      from: 1, to: 31,
      heading: "Dumnezeu nu separă închinarea de dreptate",
      teaching: "Poonen evidențiază faptul că DOMNUL respinge sărbătorile, darurile și rugăciunile când mâinile care se ridică înaintea Lui sunt implicate în rău. Chemarea din 1:16–18 este concretă: încetați să faceți răul, învățați să faceți binele, căutați dreptatea, apărați pe cel vulnerabil, apoi veniți la curățire. Transcriptul aplică sever aceasta liderilor care exploatează oameni săraci. Nu rezultă că fiecare rugăciune a unui om imperfect este inutilă; textul atacă religia folosită pentru a acoperi refuzul pocăinței.",
      source: p("chapter one ... prayer meetings ... wash yourself ... seek justice defend the orphans"),
      forYourHeart: "Nu folosi activitatea religioasă ca substitut pentru repararea răului pe care știi că îl faci.",
    }],
  },
  6: {
    number: 6,
    title: "Tronul, sfințenia, buzele curățite și «Iată-mă, trimite-mă»",
    summary: "Poonen numește Isaia 6 capitolul central al primei părți: profetul vede tronul, sfințenia lui Dumnezeu, propria necurăție și primește chemarea.",
    units: [{
      from: 1, to: 13,
      heading: "Slujirea începe cu o vedere mai mare a lui Dumnezeu și una mai adevărată a propriei persoane",
      teaching: "Moartea lui Ozia nu lasă universul fără tron: Isaia vede pe DOMNUL înălțat și aude «Sfânt, sfânt, sfânt». Reacția lui nu este comparația cu poporul păcătos pe care tocmai îl mustrase, ci «vai de mine». Curățirea buzelor precede trimiterea. Poonen pune împreună tronul din capitolul 6 și Mielul din capitolul 53: autoritatea și jertfa lui Dumnezeu trebuie ținute împreună.",
      source: p("most important ... chapter 6 ... throne ... holy holy holy ... commissioned"),
      words: [{
        original: "קָדוֹשׁ",
        transliteration: "qadoș",
        language: "ebraica",
        meaning: "sfânt, pus deoparte, cu totul distinct în curăția și măreția Lui; repetarea de trei ori intensifică proclamarea sfințeniei lui Dumnezeu.",
        verseRef: "Isaia 6:3",
        lexicalSource: "WLC-OSHB",
      }],
    }],
  },
  9: {
    number: 9,
    title: "Copilul promis și domnia păcii",
    summary: "În mijlocul întunericului și al amenințării, Isaia vorbește despre Copilul dat și despre o domnie fără sfârșit.",
    units: [{
      from: 1, to: 7,
      heading: "Lumina și Împăratul promis",
      teaching: "Poonen tratează Isaia ca profeție care Îl prezintă în mod repetat pe Mesia și pregătește partea a doua a cărții despre Robul DOMNULUI. Isaia 9:6–7 este citit creștin despre Hristos: Copilul dat, Fiul și domnia Lui. Titlurile nu sunt mandate pentru conducători omenești să-și atribuie autoritate mesianică.",
      source: p("Isaiah ... Jesus ... servant of Jehovah"),
    }],
  },
  40: {
    number: 40,
    title: "«Mângâiați pe poporul Meu» și începutul părții de încurajare",
    summary: "Poonen vede capitolul 40 ca începutul celei de-a doua mari secțiuni, pe care o compară orientativ cu partea de «nou legământ» a cărții.",
    units: [{
      from: 1, to: 31,
      heading: "Pregătiți calea, priviți măreția lui Dumnezeu și așteptați în El",
      teaching: "Poonen spune că Isaia 40–66 este o zonă la care se întoarce pentru încurajare. Capitolul începe cu mângâiere și cu glasul care pregătește calea DOMNULUI, citat în Evanghelii despre Ioan Botezătorul. Apoi mărește perspectiva asupra Creatorului și încheie cu cei ce așteaptă în DOMNUL și își înnoiesc puterea. Această promisiune nu spune că omul credincios nu obosește fizic sau nu are nevoie de odihnă.",
      source: p("chapter 40 ... new covenant life ... discouraged go to Isaiah 40 to 66"),
      forYourHeart: "Când problema ți-a umplut tot câmpul vizual, Isaia 40 nu începe prin a spune că problema este mică, ci prin a-ți arăta din nou cât de mare este Dumnezeu.",
    }],
  },
  42: {
    number: 42,
    title: "Robul care nu zdrobește trestia frântă",
    summary: "Isaia Îl prezintă pe Robul ales peste care este Duhul și care aduce dreptate fără agresivitatea puterii omenești.",
    units: [{
      from: 1, to: 9,
      heading: "Puterea Robului se vede și în blândețe",
      teaching: "Poonen spune că partea a doua a lui Isaia Îl arată în mod special pe Iisus ca Rob al DOMNULUI și, prin El, modelul slujitorului. Noul Testament citează 42:1–4 despre Iisus. Trestia frântă nu este ruptă și fitilul fumegând nu este stins. Aceasta nu înseamnă tolerarea abuzului sau refuzul dreptății; textul spune tocmai că Robul aduce dreptatea, dar o face în caracterul Lui.",
      source: p("latter chapters ... Jesus ... servant of Jehovah ... example for us"),
    }],
  },
  53: {
    number: 53,
    title: "Mielul, Robul suferind și păcatele purtate de El",
    summary: "Poonen numește Isaia 53 capitolul central al celei de-a doua secțiuni și profeția crucii.",
    units: [{
      from: 1, to: 12,
      heading: "El a fost străpuns pentru fărădelegile noastre",
      teaching: "Poonen pune Isaia 53 lângă Isaia 6: în primul este tronul, aici Mielul. Robul este disprețuit, poartă durerile, este străpuns pentru fărădelegile altora și merge ca un miel spre tăiere. Noul Testament aplică repetat acest capitol lui Iisus. Suferința Lui nu legitimează cererea ca victimele abuzului să rămână pasive sub agresor; este lucrarea unică a Robului care poartă păcatul și aduce împăcare.",
      source: p("chapter 53 ... Lamb ... prophecy of the cross"),
      words: [{
        original: "עֶבֶד",
        transliteration: "eved",
        language: "ebraica",
        meaning: "rob, slujitor; în secțiunile Robului desemnează slujirea supusă voii lui Dumnezeu, culminând pentru lectura creștină în Hristos.",
        verseRef: "Isaia 53:11",
        lexicalSource: "WLC-OSHB",
      }],
    }],
  },
  55: {
    number: 55,
    title: "Veniți fără bani și lăsați căile voastre pentru căile Lui",
    summary: "Poonen numește capitolul o invitație evanghelică: darul este oferit gratuit, iar omul este chemat să-L caute pe DOMNUL și să se întoarcă.",
    units: [{
      from: 1, to: 13,
      heading: "Har gratuit și o gândire care trebuie schimbată",
      teaching: "Poonen evidențiază chemarea «veniți, cumpărați fără bani» și apoi 55:8–9: căile și gândurile lui Dumnezeu sunt mai înalte decât ale noastre. Gratuitatea nu exclude pocăința: același pasaj spune celui rău să-și lase calea și să se întoarcă la DOMNUL. Cuvântul care iese din gura Lui nu se întoarce gol.",
      source: p("chapter 55 ... invitation ... buy freely ... verse eight and nine"),
    }],
  },
  61: {
    number: 61,
    title: "Duhul DOMNULUI peste Uns pentru veste bună și eliberare",
    summary: "Poonen subliniază că Iisus citează acest capitol în sinagoga din Nazaret și îl aplică propriei slujiri.",
    units: [{
      from: 1, to: 11,
      heading: "Anul de îndurare și ziua răzbunării",
      teaching: "Iisus citește Isaia 61:1–2 în Luca 4 și se oprește înaintea expresiei despre ziua răzbunării, declarând împlinirea slujirii de veste bună, eliberare și vindecare. Poonen observă contrastul dintre «anul» favorii și «ziua» răzbunării ca accent asupra harului. Aceasta nu neagă judecata finală; arată caracterul misiunii inaugurate de Hristos.",
      source: p("chapter 61 ... Jesus quoted ... Spirit of the Lord is upon me ... year of favor ... day of vengeance"),
    }],
  },
  63: {
    number: 63,
    title: "În toate necazurile lor, El a fost împreună cu ei",
    summary: "Poonen se oprește la compasiunea lui Dumnezeu și la avertismentul că poporul a întristat Duhul Sfânt.",
    units: [{
      from: 7, to: 19,
      heading: "Prezență în suferință și avertisment împotriva împietririi",
      teaching: "Poonen evidențiază 63:9–10: Dumnezeu nu privește rece necazul poporului, dar poporul poate răspunde harului prin răzvrătire și poate întrista Duhul Sfânt. Aceste versete nu cer ca omul să interpreteze orice suferință ca semn că Dumnezeu este mânios; ele privesc istoria relației de legământ descrisă în pasaj.",
      source: p("chapter 63 ... in all our affliction ... grieved his Holy Spirit"),
    }],
  },
  64: {
    number: 64,
    title: "«O, de ai despica cerurile!» — rugăciune pentru intervenția lui Dumnezeu",
    summary: "Poonen numește capitolul o rugăciune pentru trezire și observă folosirea lui 64:4 în 1 Corinteni 2.",
    units: [{
      from: 1, to: 12,
      heading: "Dor după prezență și recunoașterea stării poporului",
      teaching: "Rugăciunea cere ca Dumnezeu să Se manifeste astfel încât Numele Lui să fie cunoscut. În același timp, comunitatea își recunoaște necurăția și dependența de Creator ca lutul de olar. Poonen leagă versetul 4 de citarea paulină, dar Noul Testament continuă spunând că Dumnezeu a descoperit prin Duhul ceea ce ochiul și urechea nu au putut atinge singure.",
      source: p("chapter 64 ... prayer for revival ... quoted in 1 Corinthians 2"),
    }],
  },
  66: {
    number: 66,
    title: "Cerul este tronul Lui, dar privirea Lui se oprește la omul smerit",
    summary: "Finalul lui Isaia ține împreună măreția lui Dumnezeu, omul care tremură la Cuvânt, judecata și speranța unei creații noi.",
    units: [{
      from: 1, to: 24,
      heading: "Clădirea nu Îl poate cuprinde, iar adevărata închinare nu este autosuficientă",
      teaching: "Isaia se încheie cu Dumnezeul pentru care cerul este tron și pământul așternut, dar care privește la cel smerit, zdrobit în duh și care tremură la Cuvântul Lui. Aceasta recapitulază una dintre liniile lui Poonen din carte: sfințenia și măreția lui Dumnezeu produc smerenie și ascultare. Ultimele imagini de judecată nu autorizează violență religioasă; judecata aparține lui Dumnezeu.",
      source: p("Isaiah ... holiness ... servant ... 40 to 66 encouragement"),
    }],
  },
}

const ISAIA_OVERLAY: ExplainedBookOverlay = {
  bookId: "isaia",
  bibleEmanusBookId: "ISA",
  name: "Isaia",
  testament: "vt",
  order: 23,
  transcript,
  status: "in_review",
  coverageMode: "transcript-focused",
  chapters: transcriptFocusedChapters("Isaia", 66, focused),
}

export const ISAIA_EXPLAINED = assertCompleteOverlay(ISAIA_OVERLAY, 66)
