import {
  assertCompleteOverlay,
  transcriptFocusedChapters,
  type ExplainedBookOverlay,
  type ExplainedOverlayChapter,
} from "../explainedOverlay.js"

const transcript = ".research/poonen-through-the-bible-OT/transcripts/ezekiel.txt"
const p = (anchor: string) => ({ kind: "poonen" as const, transcript, anchor })

const focused: Record<number, ExplainedOverlayChapter> = {
  1: {
    number: 1,
    title: "Cerurile deschise, mâna DOMNULUI și roțile aflate sub stăpânirea Duhului",
    summary: "Ezechiel, pregătit pentru preoție, este chemat profet în exil. Viziunea inaugurală îi arată slava lui Dumnezeu, făpturile vii, roțile și tronul.",
    units: [{
      from: 1, to: 28,
      heading: "Dumnezeu rămâne suveran chiar în Babilon",
      teaching: "Poonen subliniază că Dumnezeu nu își abandonează poporul nici în perioada de disciplină: le trimite profeți în Babilon. Ezechiel acceptă o chemare mai grea decât drumul preoției pentru care fusese pregătit. Poonen se oprește apoi la roțile care se mișcă împreună cu Duhul și le aplică suveranității lui Dumnezeu asupra împrejurărilor. Aceasta nu înseamnă că orice faptă rea este voia morală a lui Dumnezeu; textul mărturisește tronul Lui deasupra haosului, nu transformă răul în bine. Curcubeul din jurul tronului îi amintește lui Poonen de legământ și fidelitate.",
      source: p("chapter one ... wheels ... spirit ... sovereignty ... rainbow ... covenant"),
      forYourHeart: "Exilul poate schimba locul în care te afli fără să-L scoată pe Dumnezeu de pe tron.",
    }],
  },
  2: {
    number: 2,
    title: "Trimis la un popor care poate refuza să asculte",
    summary: "Dumnezeu îl ridică pe Ezechiel și îl trimite la o casă răzvrătită, poruncindu-i să vorbească fără frica fețelor lor.",
    units: [{
      from: 1, to: 10,
      heading: "Fidelitatea mesajului nu este măsurată numai prin reacția audienței",
      teaching: "Poonen accentuează chemarea specifică: Ezechiel trebuie să știe la cine este trimis și să vorbească fie că ascultă, fie că refuză. El aplică aceasta slujirii care nu își alege mesajul doar după popularitate. Totuși o convingere personală despre propria chemare trebuie verificată prin Scriptură, caracter și comunitate; episodul profetic al lui Ezechiel nu dă oricărei persoane dreptul de a declara criticile sale cuvânt direct de la Dumnezeu.",
      source: p("chapter 2 ... I'm sending you ... don't be afraid ... whether they listen or not"),
    }],
  },
  3: {
    number: 3,
    title: "Mănâncă sulul înainte să vorbești altora",
    summary: "Ezechiel trebuie să primească el însuși mesajul înainte să îl ducă poporului și primește responsabilitatea unui străjer.",
    units: [{
      from: 1, to: 15,
      heading: "Cuvântul predicat altora trebuie să intre mai întâi în predicator",
      teaching: "Poonen face din sulul mâncat un principiu al slujirii Cuvântului: mesajul trebuie să fie primit și lucrat în viața celui care îl predică înainte de a deveni predică pentru alții. El dă exemple din vorbire, furt și curăție. Aceasta nu cere perfecțiune fără păcat înainte ca cineva să poată învăța, ci respinge ipocrizia în care predicatorul refuză să se lase el însuși judecat de text.",
      source: p("chapter three ... eat the scroll ... message for other people, you must eat yourself first"),
      forYourHeart: "Înainte să întrebi cui trebuie să trimiți un verset, întreabă ce cere acel verset de la tine.",
    }, {
      from: 16, to: 27,
      heading: "Străjerul avertizează; nu controlează răspunsul celuilalt",
      teaching: "Poonen spune că Dumnezeu repetă lui Ezechiel responsabilitatea de a avertiza. După ce mesajul este dat fidel, răspunsul aparține celui care îl aude. Ideea nu autorizează hărțuirea repetată, amenințările sau controlul religios; responsabilitatea străjerului este să spună adevărul pe care Dumnezeu i-l încredințează, nu să forțeze ascultarea.",
      source: p("once you have told them the message ... your hands are clean"),
    }],
  },
  33: {
    number: 33,
    title: "Străjerul și responsabilitatea omului de a răspunde",
    summary: "După căderea Ierusalimului, chemarea străjerului este reafirmată, iar poporul este chemat să se întoarcă din calea lui.",
    units: [{
      from: 1, to: 20,
      heading: "Dumnezeu nu are plăcere de moartea celui rău",
      teaching: "Poonen rezumă 33:1–16 ca text despre responsabilitatea omului de a răspunde lui Dumnezeu. Străjerul avertizează, iar ascultătorul nu poate transfera responsabilitatea alegerii sale asupra mesagerului. În același timp, pasajul spune că Dumnezeu nu Își găsește plăcerea în moartea celui rău, ci în întoarcerea lui. Avertismentul urmărește viața, nu satisfacția de a condamna.",
      source: p("Chapter 33 verses 1 to 16 speak of man's responsibility to respond to God"),
    }],
  },
  34: {
    number: 34,
    title: "Păstorii care se hrănesc pe ei înșiși și Păstorul care caută oile",
    summary: "Dumnezeu confruntă liderii care folosesc turma și promite că El Însuși va căuta și va îngriji oile.",
    units: [{
      from: 1, to: 31,
      heading: "Turma nu există pentru confortul păstorului",
      teaching: "Poonen numește Ezechiel 34 un capitol pe care orice pastor trebuie să îl citească. Acuzația este că păstorii se hrănesc pe ei înșiși, dar nu întăresc pe cea slabă, nu vindecă pe cea bolnavă și nu caută pe cea pierdută. Dumnezeu promite că El Însuși va păstori și vorbește despre robul Său David. Pentru conducerea creștină, textul este un control împotriva exploatării spirituale și financiare a oamenilor.",
      source: p("chapter 34 ... all those who are shepherds and pastors ... must read"),
      forYourHeart: "Măsura păstoririi nu este cât primește liderul de la turmă, ci ce se întâmplă cu oaia slabă, rănită și pierdută.",
    }],
  },
  36: {
    number: 36,
    title: "Curățire, inimă nouă și Duh nou",
    summary: "Restaurarea promisă nu se oprește la întoarcerea în țară, ci merge spre curățire interioară și ascultare.",
    units: [{
      from: 22, to: 38,
      heading: "Dumnezeu își sfințește Numele schimbând inima poporului",
      teaching: "Transcriptul lui Poonen urmărește constant nevoia unei lucrări interioare a Duhului, iar Ezechiel 36 este unul dintre textele majore ale acestei promisiuni: apă curată, inimă nouă, duh nou și Duhul lui Dumnezeu care îi face să umble în căile Lui. Restaurarea nu este meritul poporului — pasajul spune că Dumnezeu lucrează pentru Numele Său. Nota aceasta este ancorată în textul biblic; nu este folosită pentru a promite automat prosperitate națională modernă.",
      source: p("Holy Spirit ... life led by the Spirit ... covenant"),
      words: [{
        original: "לֵב חָדָשׁ",
        transliteration: "lev hadaș",
        language: "ebraica",
        meaning: "inimă nouă; imaginea transformării interioare pe care Dumnezeu o promite poporului.",
        verseRef: "Ezechiel 36:26",
        lexicalSource: "WLC-OSHB",
      }],
    }],
  },
  37: {
    number: 37,
    title: "Oase uscate, Cuvânt și suflare",
    summary: "Ezechiel vede o vale plină de oase foarte uscate. Prorocia aduce structură, dar viața vine când suflarea intră în trupuri.",
    units: [{
      from: 1, to: 14,
      heading: "Forma fără suflare nu este încă viață",
      teaching: "Poonen pune împreună două elemente: Cuvântul este rostit și oasele se adună, dar este nevoie și de suflare pentru ca trupurile să trăiască. El aplică imaginea bisericii: doctrină și structură pot aduce ordine, dar viața spirituală cere lucrarea Duhului. Contextul direct al viziunii este restaurarea casei lui Israel, explicitată chiar de text; aplicația la biserică este analogia lui Poonen, nu înlocuirea sensului istoric.",
      source: p("chapter 37 ... valley of dry bones ... word of God ... one more thing"),
      words: [{
        original: "רוּחַ",
        transliteration: "ruah",
        language: "ebraica",
        meaning: "vânt, suflare sau duh, după context; jocul de sensuri este esențial în viziunea oaselor uscate.",
        verseRef: "Ezechiel 37:9",
        lexicalSource: "WLC-OSHB",
      }],
    }],
  },
  47: {
    number: 47,
    title: "Râul care iese din templu și aduce viață",
    summary: "Apa pornește de sub templu, devine tot mai adâncă și vindecă locurile în care ajunge.",
    units: [{
      from: 1, to: 12,
      heading: "Viața curge din prezența lui Dumnezeu spre locurile moarte",
      teaching: "Poonen vede râul din Ezechiel 47 ca imagine a vieții Duhului care curge dintr-o comunitate a lui Dumnezeu și leagă tema de Ioan 7. Contextul direct este viziunea templului restaurat; aplicația la biserică este tipologică. Caracteristica sigură a imaginii este că apa nu este stagnantă: acolo unde ajunge aduce vindecare și rod.",
      source: p("chapter 47 ... river begins to flow ... passage ... John chapter 7"),
      forYourHeart: "Viața primită de la Dumnezeu nu este destinată doar păstrării într-un spațiu religios; ea trebuie să aducă viață acolo unde curge.",
    }],
  },
}

const EZECHIEL_OVERLAY: ExplainedBookOverlay = {
  bookId: "ezechiel",
  bibleEmanusBookId: "EZK",
  name: "Ezechiel",
  testament: "vt",
  order: 26,
  transcript,
  status: "in_review",
  coverageMode: "transcript-focused",
  chapters: transcriptFocusedChapters("Ezechiel", 48, focused),
}

export const EZECHIEL_EXPLAINED = assertCompleteOverlay(EZECHIEL_OVERLAY, 48)
