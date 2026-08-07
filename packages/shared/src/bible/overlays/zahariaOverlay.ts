import {
  assertCompleteOverlay,
  transcriptFocusedChapters,
  type ExplainedBookOverlay,
  type ExplainedOverlayChapter,
} from "../explainedOverlay.js"

const sourceUrl = "https://www.cfcindia.com/through-the-bible/zechariah"
const p = (section: string) => ({ kind: "poonen-official" as const, sourceUrl, section })
const n = {
  kind: "biblia-emanus" as const,
  note: "rezumat narativ fără doctrină adăugată" as const,
}

const focused: Record<number, ExplainedOverlayChapter> = {
  1: {
    number: 1,
    title: "Întoarceți-vă la Mine și Eu Mă voi întoarce la voi",
    summary: "Zaharia începe printr-o chemare la pocăință și apoi deschide seria vedenilor de noapte.",
    units: [{
      from: 1, to: 6,
      heading: "Call to Repentance",
      teaching: "Prima secțiune oficială Poonen este chemarea la pocăință. Generația lui Zaharia este avertizată să nu repete răspunsul părinților care au auzit profeții și nu s-au întors. Formula «întoarceți-vă la Mine» pune restaurarea în relația cu Dumnezeu, nu doar în reconstruirea unor structuri.",
      source: p("Call to Repentance"),
    }, {
      from: 7, to: 21,
      heading: "Eight Visions — începutul seriei",
      teaching: "De la 1:7 începe seria celor opt vedenii. Imaginile despre călăreți și coarne comunică faptul că puterile care au risipit poporul nu sunt în afara stăpânirii lui Dumnezeu. Overlay-ul nu transformă simbolurile într-o hartă geopolitică modernă fără o ancoră explicită în text.",
      source: p("Eight Visions"),
    }],
  },
  2: {
    number: 2,
    title: "Ierusalimul măsurat, protejat și chemat să se bucure de prezența DOMNULUI",
    summary: "Vedenia funiei de măsurat trece de la dimensiunile cetății la promisiunea că Dumnezeu Însuși va fi protecția și slava ei. Cei rămași în Babilon sunt chemați să iasă, iar finalul privește spre neamuri care se alipesc de DOMNUL.",
    units: [
      {
        from: 1, to: 5,
        heading: "Funia de măsurat și cetatea pe care Dumnezeu o înconjoară",
        teaching: "Zaharia vede un om cu o funie de măsurat care merge să măsoare Ierusalimul. Mesajul vedeniei depășește însă limitele zidurilor: cetatea este descrisă ca ajungând prea plină pentru vechile granițe, iar DOMNUL declară că El Însuși va fi un zid de foc în jurul ei și slava din mijlocul ei. Pasajul ține împreună restaurarea concretă a cetății și prezența protectoare a lui Dumnezeu.",
        source: n,
      },
      {
        from: 6, to: 9,
        heading: "Ieșiți din țara de la miazănoapte; puterile care au jefuit nu rămân stăpâne",
        teaching: "Chemarea se îndreaptă spre cei încă aflați în țara din care fuseseră împrăștiați: Sionul este chemat să scape din Babilon. Textul afirmă că neamurile care au jefuit poporul vor fi la rândul lor răsturnate și folosește imaginea sensibilă a celui care se atinge de lumina ochilor lui Dumnezeu. Accentul pasajului este pe recuperarea și protejarea poporului risipit, nu pe autorizarea răzbunării personale.",
        source: n,
      },
      {
        from: 10, to: 13,
        heading: "DOMNUL vine să locuiască în Sion și multe neamuri se alipesc de El",
        teaching: "Finalul cheamă fiica Sionului la bucurie pentru că DOMNUL spune că vine să locuiască în mijlocul ei. Viziunea se lărgește dincolo de Iuda: multe neamuri se vor alipi de DOMNUL și vor fi numite poporul Lui. Ultimul verset cere tăcere înaintea lui Dumnezeu, pentru că acțiunea decisivă Îi aparține Lui.",
        source: n,
      },
    ],
  },
  3: {
    number: 3,
    title: "Iosua, hainele murdare și Odrasla promisă",
    summary: "Marele preot Iosua stă acuzat, dar Dumnezeu îl curăță și vorbește despre Robul Său, Odrasla.",
    units: [{
      from: 1, to: 10,
      heading: "Curățire și promisiunea Odraslei",
      teaching: "În seria vedenilor, Iosua nu se apără singur; hainele murdare sunt schimbate, iar acuzatorul este mustrat. Capitolul apoi vorbește despre «Odrasla». Lectura creștină vede aici o linie mesianică, în continuitate cu alte texte profetice despre Odraslă. Curățirea nu este justificare pentru a minimaliza păcatul, ci lucrarea lui Dumnezeu care îndepărtează necurăția și cheamă la umblare în căile Lui.",
      source: p("Eight Visions"),
      words: [{
        original: "צֶמַח",
        transliteration: "țemah",
        language: "ebraica",
        meaning: "odraslă, vlăstar; titlu profetic folosit în Zaharia pentru figura mesianică promisă.",
        verseRef: "Zaharia 3:8",
        lexicalSource: "WLC-OSHB",
      }],
    }],
  },
  4: {
    number: 4,
    title: "«Nu prin putere, nici prin tărie, ci prin Duhul Meu»",
    summary: "Vedenia sfeșnicului și a măslinilor îl încurajează pe Zorobabel că lucrarea va fi terminată prin Duhul lui Dumnezeu.",
    units: [{
      from: 1, to: 14,
      heading: "Eight Visions — lucrarea prin Duhul",
      teaching: "Zaharia 4:6 explică lucrarea lui Zorobabel: nu prin forța omenească, ci prin Duhul DOMNULUI. Versetul nu condamnă organizarea, priceperea sau munca — Zorobabel chiar construiește — ci refuză ca acestea să devină sursa ultimă a lucrării lui Dumnezeu. «Cine disprețuiește ziua începuturilor mici?» completează încurajarea către o comunitate care reconstruiește după ruină.",
      source: p("Eight Visions"),
      forYourHeart: "Lucrează serios, dar nu confunda instrumentele tale cu sursa vieții și puterii spirituale.",
    }],
  },
  5: {
    number: 5,
    title: "Sulul care zboară și nelegiuirea închisă în efă",
    summary: "Două vedenii scurte descriu îndepărtarea răului din țară. Prima confruntă furtul și jurământul mincinos, iar a doua personifică nelegiuirea într-o efă care este dusă în Șinear.",
    units: [
      {
        from: 1, to: 4,
        heading: "Sulul zburător intră în casa hoțului și a celui ce jură strâmb",
        teaching: "Prima vedenie arată un sul de dimensiuni neobișnuite care poartă un blestem împotriva furtului și a jurământului mincinos. Mesajul nu rămâne abstract: sulul este descris intrând în casa celui vinovat și mistuind-o. În cadrul seriei de vedenii, restaurarea comunității nu înseamnă doar reconstruirea cetății și templului, ci și confruntarea răului care ar corupe din nou viața ei.",
        source: n,
      },
      {
        from: 5, to: 11,
        heading: "Efa cu nelegiuirea este ridicată și dusă în Șinear",
        teaching: "A doua vedenie folosește o efă, o greutate de plumb și o femeie identificată în text cu nelegiuirea. Ea este închisă în recipient, apoi efa este ridicată și dusă în țara Șinear pentru a fi așezată acolo. Explicația rămâne la imaginile oferite de pasaj: nelegiuirea este personificată, limitată și îndepărtată din locul pe care vedenia îl are în vedere; textul nu cere identificarea simbolului cu o persoană sau mișcare modernă.",
        source: n,
      },
    ],
  },
  6: {
    number: 6,
    title: "Coroana lui Iosua și omul numit Odrasla",
    summary: "După ultima vedenie, profetul pune o coroană pe marele preot Iosua și vorbește despre Odrasla care va zidi templul DOMNULUI.",
    units: [{
      from: 1, to: 8,
      heading: "Eight Visions — finalul seriei",
      teaching: "Ultima vedenie continuă tema stăpânirii lui Dumnezeu asupra neamurilor și a odihnei Duhului. Simbolurile sunt păstrate în cadrul cărții fără identificări speculative obligatorii cu state moderne.",
      source: p("Eight Visions"),
    }, {
      from: 9, to: 15,
      heading: "Crowning of Joshua",
      teaching: "Structura oficială Poonen separă «încoronarea lui Iosua». Un preot primește simbolic coroana, iar textul imediat vorbește despre omul numit Odrasla, care va zidi templul și va purta onoare regală, ținând împreună limbajul preotului și al domniei. Lectura creștină vede o linie spre Hristos, fără a transforma ceremonia într-un model prin care liderii religioși moderni își revendică statut regal.",
      source: p("Crowning of Joshua"),
    }],
  },
  7: {
    number: 7,
    title: "Întrebarea despre post și întrebarea mai adâncă despre motiv",
    summary: "După ani de post legat de distrugerea templului, oamenii întreabă dacă trebuie să continue practica. Răspunsul lui Dumnezeu cercetează pentru cine posteau de fapt.",
    units: [{
      from: 1, to: 14,
      heading: "Questions About Fasting",
      teaching: "Poonen grupează capitolele 7–8 sub întrebările despre post. Dumnezeu nu răspunde doar cu un calendar, ci întreabă dacă postul și mâncarea erau cu adevărat pentru El. Apoi readuce în centru dreptatea, mila și refuzul asupririi. Practica spirituală este judecată și prin motivație și rod.",
      source: p("Questions About Fasting"),
    }],
  },
  8: {
    number: 8,
    title: "Posturile devin sărbători când cetatea este restaurată în adevăr și pace",
    summary: "Dumnezeu promite să Se întoarcă spre Sion, să adune poporul și să transforme zilele de post în bucurie.",
    units: [{
      from: 1, to: 23,
      heading: "Questions About Fasting — adevăr și pace",
      teaching: "Răspunsul continuă: zilele de post pot deveni sărbători, dar chemarea este «iubiți adevărul și pacea». Finalul vede oameni din multe neamuri căutând pe DOMNUL. Restaurarea religioasă nu este separată de relații adevărate și drepte.",
      source: p("Questions About Fasting"),
    }],
  },
  9: {
    number: 9,
    title: "Împăratul vine smerit, călare pe un măgar",
    summary: "Mesajele finale se îndreaptă spre Împăratul care vine; Zaharia 9:9 este citat în Evanghelii la intrarea lui Iisus în Ierusalim.",
    units: [{
      from: 1, to: 17,
      heading: "Messages Concerning the Coming King",
      teaching: "Secțiunea oficială Poonen pentru capitolele 9–14 este despre Împăratul care vine. Zaharia 9:9 Îl descrie drept drept, aducător de mântuire și smerit, călare pe un măgar. Evangheliile aplică explicit textul lui Iisus. Modelul împărăției prezentat aici contrastează cu ostentația puterii și nu autorizează conducerea religioasă dominatoare.",
      source: p("Messages Concerning the Coming King"),
    }],
  },
  10: {
    number: 10,
    title: "Cereți ploaie de la DOMNUL; păstorii falși sunt confruntați, iar turma este adunată",
    summary: "Zaharia contrastează darul pe care numai DOMNUL îl poate da cu promisiunile goale ale idolilor și ghicitorilor. Apoi Dumnezeu confruntă păstorii, întărește Iuda și descrie adunarea celor risipiți.",
    units: [
      {
        from: 1, to: 2,
        heading: "Ploaia vine de la DOMNUL, nu de la terafimi și ghicitori",
        teaching: "Capitolul începe chemând poporul să ceară ploaia de primăvară de la DOMNUL și Îl prezintă ca pe Cel care dă ploaia și verdeața. Versetul următor pune în contrast această sursă cu terafimii, ghicitorii și visele mincinoase, care oferă mângâieri deșarte. Rezultatul descris este o turmă rătăcită și fără păstor.",
        source: n,
      },
      {
        from: 3, to: 5,
        heading: "Păstorii sunt cercetați, iar Iuda este făcut ca un cal de slavă",
        teaching: "Mânia este îndreptată împotriva păstorilor care nu și-au împlinit rolul, în timp ce DOMNUL spune că Își cercetează propria turmă, casa lui Iuda. Din Iuda sunt enumerate piatra din capul unghiului, țărușul, arcul și căpeteniile, iar poporul este descris luptând cu putere pentru că DOMNUL este cu el. Pasajul aparține limbajului restaurării și conflictului profetic al cărții, nu unui mandat contemporan de violență religioasă.",
        source: n,
      },
      {
        from: 6, to: 12,
        heading: "Iuda și Iosif sunt întăriți, răscumpărați și adunați din depărtare",
        teaching: "Ultima parte repetă verbe ale restaurării: Dumnezeu întărește, izbăvește, aduce înapoi, ascultă, fluieră pentru a aduna și răscumpără. Cei risipiți printre popoare își vor aduce aminte de El și se vor întoarce din locurile depărtării. Capitolul se încheie nu cu puterea lor autonomă, ci cu declarația că vor fi întăriți în DOMNUL și vor umbla în Numele Lui.",
        source: n,
      },
    ],
  },
  11: {
    number: 11,
    title: "Păstorii și cei treizeci de arginți",
    summary: "Capitolul confruntă păstorirea coruptă și include suma de treizeci de arginți, reluată în relatarea lui Matei despre Iuda.",
    units: [{
      from: 1, to: 17,
      heading: "Împăratul promis contrastează cu păstorul lipsit de grijă",
      teaching: "Zaharia 11 arată consecințele păstoririi care nu caută oaia pierdută și nu îngrijește pe cea rănită. Cele treizeci de arginți sunt preluate de Matei în povestea trădării lui Iisus. Textul nu este bază pentru calcule numerologice; legătura sigură este cea pe care Noul Testament o face explicit.",
      source: p("Messages Concerning the Coming King"),
    }],
  },
  12: {
    number: 12,
    title: "Vor privi spre Cel pe care L-au străpuns",
    summary: "În contextul restaurării Ierusalimului, profetul vorbește despre un duh de har și rugăciune și despre plâns pentru Cel străpuns.",
    units: [{
      from: 1, to: 14,
      heading: "Mesaj mesianic despre Cel străpuns",
      teaching: "Ioan citează Zaharia 12:10 în relatarea crucificării lui Iisus. Capitolul leagă harul, rugăciunea și plânsul de privirea spre Cel străpuns. Această ancoră neotestamentară este păstrată fără a transforma fiecare element al capitolelor 12–14 într-o cronologie politică obligatorie.",
      source: p("Messages Concerning the Coming King"),
    }],
  },
  13: {
    number: 13,
    title: "Izvor pentru curățire și Păstorul lovit",
    summary: "Capitolul vorbește despre curățire de păcat și idolatrie și conține cuvintele despre Păstorul lovit, citate de Iisus înainte de arestare.",
    units: [{
      from: 1, to: 9,
      heading: "Curățire și Păstorul lovit",
      teaching: "Zaharia 13:1 deschide un izvor pentru păcat și necurăție, iar 13:7 vorbește despre Păstorul lovit și oile risipite. Iisus aplică ultimul text ucenicilor în noaptea arestării. Pasajul despre îndepărtarea profeților falși aparține acestui cadru profetic și nu autorizează violență împotriva persoanelor care susțin idei religioase false în societatea modernă.",
      source: p("Messages Concerning the Coming King"),
    }],
  },
  14: {
    number: 14,
    title: "DOMNUL va fi Împărat peste tot pământul",
    summary: "Ultimul capitol folosește imagini cosmice și de conflict pentru Ziua DOMNULUI și se încheie cu sfințenia extinsă asupra vieții obișnuite.",
    units: [{
      from: 1, to: 21,
      heading: "Coming King — domnie și sfințenie",
      teaching: "Cartea se încheie cu declarația că DOMNUL va fi Împărat peste tot pământul și cu inscripția «Sfânt DOMNULUI» extinsă până la obiectele obișnuite. Detaliile geografice și escatologice din Zaharia 14 sunt interpretate diferit între creștini; Emanus nu transformă o schemă particulară într-o condiție doctrinară și nu folosește imaginile luptei pentru violență religioasă modernă.",
      source: p("Messages Concerning the Coming King"),
    }],
  },
}

const ZAHARIA_OVERLAY: ExplainedBookOverlay = {
  bookId: "zaharia",
  bibleEmanusBookId: "ZEC",
  name: "Zaharia",
  testament: "vt",
  order: 38,
  transcript: sourceUrl,
  status: "in_review",
  coverageMode: "transcript-focused",
  chapters: transcriptFocusedChapters("Zaharia", 14, focused),
}

export const ZAHARIA_EXPLAINED = assertCompleteOverlay(ZAHARIA_OVERLAY, 14)
