import {
  assertCompleteOverlay,
  transcriptFocusedChapters,
  type ExplainedBookOverlay,
  type ExplainedOverlayChapter,
} from "../explainedOverlay.js"

const transcript = ".research/poonen-through-the-bible-OT/transcripts/proverbs.txt"
const p = (anchor: string) => ({ kind: "poonen" as const, transcript, anchor })

const focused: Record<number, ExplainedOverlayChapter> = {
  1: {
    number: 1,
    title: "Frica de DOMNUL, compania pe care o alegi și înțelepciunea care strigă",
    summary: "Poonen prezintă primele nouă capitole ca instrucțiune adresată în special tinerilor și pune începutul întregii înțelepciuni în reverența față de Dumnezeu.",
    units: [{
      from: 1, to: 33,
      heading: "Înțelepciunea începe prin a-L lua pe Dumnezeu în serios",
      teaching: "Poonen distinge între frica servilă că Dumnezeu te va răni și reverența prin care te temi să-L întristezi prin felul în care trăiești. Apoi se oprește la avertismentul despre companie: când păcătoșii te atrag, învață să spui nu. În 1:23 el leagă Cuvântul de lucrarea Duhului: studiul fără luminare rămâne ca citirea într-o cameră întunecată. Aceste aplicații nu transformă orice prieten necredincios într-un om de evitat; avertismentul este împotriva companiei care te trage spre rău.",
      source: p("chapter one ... fear of the Lord is the beginning ... if sinners entice you"),
      words: [{
        original: "יִרְאַת יְהוָה",
        transliteration: "yir'at YHWH",
        language: "ebraica",
        meaning: "frica/reverența față de DOMNUL; în Proverbe este orientarea fundamentală a omului care Îl ia pe Dumnezeu și cuvântul Lui în serios.",
        verseRef: "Proverbe 1:7",
        lexicalSource: "WLC-OSHB",
      }],
    }],
  },
  2: {
    number: 2,
    title: "Caută înțelepciunea ca pe argint",
    summary: "Înțelepciunea trebuie căutată, iar ea păzește de oameni înșelători și de seducție.",
    units: [{
      from: 1, to: 22,
      heading: "Înțelepciunea nu este dobândită prin interes superficial",
      teaching: "Poonen se oprește la imaginea căutării argintului și a comorilor ascunse. Cunoașterea lui Dumnezeu și frica de DOMNUL cer o căutare serioasă. Înțelepciunea dobândită astfel protejează atât de omul care te înșală, cât și de seducția sexuală care te scoate de pe drum.",
      source: p("chapter 2 ... seek for wisdom ... as you seek for silver"),
    }],
  },
  3: {
    number: 3,
    title: "Încrede-te în DOMNUL cu toată inima",
    summary: "Poonen dezvoltă Proverbe 3:5–6 ca promisiune de călăuzire legată de încredere, smerirea propriei înțelegeri și recunoașterea lui Dumnezeu în toate drumurile.",
    units: [{
      from: 1, to: 35,
      heading: "Rațiunea este slujitor, nu stăpân",
      teaching: "Poonen nu condamnă gândirea, ci spune să nu te sprijini pe ea ca autoritate finală. El însuși spune că folosește rațiunea pentru studiu, dar depinde de luminarea Duhului. Promisiunea că Dumnezeu va netezi cărările este legată în text de încrederea în El și de recunoașterea Lui în toate căile, nu de refuzul planificării, medicinei, expertizei sau faptelor verificabile.",
      source: p("Proverbs three five ... trust in the Lord with all your heart ... direct your paths"),
      forYourHeart: "Folosește mintea pe care ți-a dat-o Dumnezeu, dar nu-i cere să ocupe locul lui Dumnezeu.",
    }],
  },
  4: {
    number: 4,
    title: "Drumul se deschide pas cu pas și inima trebuie păzită",
    summary: "Poonen evidențiază drumul care se lărgește înaintea celui ce merge, lumina crescândă a dreptului și chemarea de a păzi inima și ochii.",
    units: [{
      from: 1, to: 27,
      heading: "Nu trebuie să vezi zece pași înainte",
      teaching: "Poonen parafrazează 4:12 prin imaginea drumului care se deschide pe măsură ce înaintezi și îl compară cu ușile automate care se deschid când ajungi aproape. La 4:18 vede viața dreptului ca lumină care crește, iar la 4:23 pune centrul în păzirea inimii. Capitolul încheie și cu disciplina privirii: tentația văzută nu trebuie hrănită prin întoarcerea deliberată a ochilor.",
      source: p("chapter four ... step by step, the way will open ... keep your heart with all diligence"),
      words: [{
        original: "לֵב",
        transliteration: "lev",
        language: "ebraica",
        meaning: "inimă în sensul centrului interior al gândurilor, voinței și dorințelor; din ea «ies izvoarele vieții».",
        verseRef: "Proverbe 4:23",
        lexicalSource: "WLC-OSHB",
      }],
    }],
  },
  5: {
    number: 5,
    title: "Fidelitate sexuală în propria căsătorie",
    summary: "Capitolul avertizează împotriva adulterului și cheamă soțul să se bucure de propria soție.",
    units: [{
      from: 1, to: 23,
      heading: "«Bea apă din fântâna ta»",
      teaching: "Poonen citește imaginea fântânii ca chemare la satisfacție și fidelitate în căsătorie. Sexualitatea conjugală nu este prezentată ca rușinoasă; problema este dorința orientată spre partenerul altuia. Aceasta nu justifică posesivitatea sau obligația sexuală fără consimțământ; fidelitatea biblică merge împreună cu dragoste și respect.",
      source: p("chapter five ... satisfied with your wife ... drink water out of your own well"),
    }],
  },
  6: {
    number: 6,
    title: "Cuvântul care conduce, lenevia și pericolul adulterului",
    summary: "Proverbe 6 adună avertismente despre datorii pripite, lene, caracterul omului rău și seducția sexuală.",
    units: [{
      from: 20, to: 35,
      heading: "Cuvântul legat de inimă te însoțește pe drum",
      teaching: "Poonen evidențiază promisiunea despre învățătura părinților și Cuvânt: când mergi, te conduce; când dormi, te păzește; când te trezești, vorbește cu tine. În context, această formare interioară este protecție în special împotriva seducției și deciziilor care distrug casa.",
      source: p("chapter six ... bind God's word upon your heart ... when you go, it will lead you"),
    }],
  },
  7: {
    number: 7,
    title: "Seducția nu începe în ultimul pas",
    summary: "Tânărul lipsit de minte se apropie de locul ispitei, ascultă și este atras până la ruină.",
    units: [{
      from: 1, to: 27,
      heading: "Nu planifica apropierea de locul în care știi că vei cădea",
      teaching: "În primele nouă capitole, Poonen grupează avertismentele către tineri despre sexualitate, privire și companie. Proverbe 7 arată că prăbușirea are pași: omul se apropie de colț, ascultă vorbele și urmează. Înțelepciunea nu constă doar în a rezista în ultima secundă, ci și în a nu organiza drumul spre ispită.",
      source: p("first nine chapters ... warnings ... sexually pure"),
    }],
  },
  8: {
    number: 8,
    title: "Înțelepciunea strigă în locurile publice",
    summary: "Înțelepciunea vorbește deschis și își prezintă valoarea mai presus de bogății.",
    units: [{
      from: 1, to: 36,
      heading: "Înțelepciunea este mai de preț decât ceea ce poți cumpăra",
      teaching: "Poonen tratează Proverbele ca o chemare la înțelepciune practică și la cunoașterea lui Dumnezeu. Capitolul 8 personifică înțelepciunea și o așază mai presus de argint, aur și rubine. Unele tradiții au citit anumite versete cristologic; overlay-ul nu construiește o doctrină despre natura eternă a Fiului exclusiv din personificarea poetică a Înțelepciunii.",
      source: p("book of Proverbs ... wisdom ... daily walk"),
    }],
  },
  9: {
    number: 9,
    title: "Două invitații: Înțelepciunea și Nebunia",
    summary: "Primele nouă capitole se încheie cu două mese și două chemări opuse.",
    units: [{
      from: 1, to: 18,
      heading: "Frica de DOMNUL reapare ca început al înțelepciunii",
      teaching: "Poonen rezumă primele nouă capitole prin nevoia tânărului de înțelepciune, ascultare, companie bună, puritate, disciplină financiară și muncă. Proverbe 9 adună aceste fire sub două chemări concurente și repetă că frica de DOMNUL este începutul înțelepciunii.",
      source: p("first nine chapters ... warning to young men ... seek for wisdom"),
    }],
  },
  10: {
    number: 10,
    title: "Încep proverbele scurte: înțelepciunea intră în vorbire, muncă și relații",
    summary: "De la capitolul 10 înainte, multe învățături apar ca propoziții scurte și contraste între omul înțelept și cel nebun.",
    units: [{
      from: 1, to: 32,
      heading: "Dragostea nu face spectacol din slăbiciunea altuia",
      teaching: "Poonen spune că de la capitolul 10 apar multe instrucțiuni de o propoziție și alege 10:12: «dragostea acoperă toate greșelile». El aplică aceasta împotriva expunerii răutăcioase a slăbiciunilor altuia. «A acoperi» nu înseamnă ascunderea abuzului, infracțiunii sau pericolului; dragostea nu protejează agresorul de răspundere. Sensul pastoral este refuzul bârfei și al umilirii inutile.",
      source: p("chapter 10 ... love covers all sins"),
      forYourHeart: "Nu numi bârfă «transparență». Dar nici nu numi tăcerea asupra abuzului «dragoste». Dragostea protejează persoana vulnerabilă și refuză expunerea răutăcioasă.",
    }],
  },
  22: {
    number: 22,
    title: "Smerenia și frica de DOMNUL",
    summary: "Poonen se oprește la 22:4 ca rezumat al unei vieți care primește bogățiile, onoarea și viața venite de la Dumnezeu.",
    units: [{
      from: 1, to: 29,
      heading: "Bogăția spirituală începe jos, nu sus",
      teaching: "Poonen citează «prin smerenie și frica de DOMNUL vin bogăția, slava și viața» și precizează aplicația spre bogăție și onoare spirituală. Versetul nu trebuie transformat într-o formulă de îmbogățire materială garantată. Smerenia și reverența sunt orientarea caracterului care îl așază pe om sub Dumnezeu.",
      source: p("chapter 22 ... by humility and the fear of the Lord"),
      words: [{
        original: "עֲנָוָה",
        transliteration: "anavah",
        language: "ebraica",
        meaning: "smerenie, modestie; în 22:4 apare alături de frica de DOMNUL ca drum al vieții înțelepte.",
        verseRef: "Proverbe 22:4",
        lexicalSource: "WLC-OSHB",
      }],
    }],
  },
  31: {
    number: 31,
    title: "Înțelepciune regală și femeia vrednică",
    summary: "Cartea se încheie cu învățătura mamei lui Lemuel și cu poemul alfabetic despre femeia vrednică.",
    units: [{
      from: 1, to: 31,
      heading: "Caracter, muncă, generozitate și frica de DOMNUL",
      teaching: "Poonen prezintă Proverbele ca înțelepciune pentru viața reală, inclusiv familie, muncă, bani și vorbire. Capitolul final adună aceste teme într-o femeie activă, competentă, generoasă și temătoare de DOMNUL. Poemul nu trebuie folosit ca listă imposibilă prin care femeile sunt comparate și rușinate; centrul evaluării este frica de DOMNUL, iar multe dintre virtuți sunt virtuți umane și spirituale valabile pentru întreaga comunitate.",
      source: p("Proverbs ... daily working life ... home situations ... fear of the Lord"),
      words: [{
        original: "אֵשֶׁת־חַיִל",
        transliteration: "eșet-hayil",
        language: "ebraica",
        meaning: "femeie de valoare, putere/capacitate, vrednică; expresia descrie caracter și competență, nu doar domesticitate.",
        verseRef: "Proverbe 31:10",
        lexicalSource: "WLC-OSHB",
      }],
    }],
  },
}

const PROVERBE_OVERLAY: ExplainedBookOverlay = {
  bookId: "proverbe",
  bibleEmanusBookId: "PRO",
  name: "Proverbele",
  testament: "vt",
  order: 20,
  transcript,
  status: "in_review",
  coverageMode: "transcript-focused",
  chapters: transcriptFocusedChapters("Proverbe", 31, focused),
}

export const PROVERBE_EXPLAINED = assertCompleteOverlay(PROVERBE_OVERLAY, 31)
