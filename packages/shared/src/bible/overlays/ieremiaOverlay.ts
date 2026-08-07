import {
  assertCompleteOverlay,
  transcriptFocusedChapters,
  type ExplainedBookOverlay,
  type ExplainedOverlayChapter,
} from "../explainedOverlay.js"

const transcript = ".research/poonen-through-the-bible-OT/transcripts/jeremiah-lamentations.txt"
const p = (anchor: string) => ({ kind: "poonen" as const, transcript, anchor })

const focused: Record<number, ExplainedOverlayChapter> = {
  1: {
    number: 1,
    title: "Chemat înainte de naștere, trimis tânăr și făcut gură pentru cuvântul lui Dumnezeu",
    summary: "Poonen deschide Ieremia prin sensibilitatea și tăria profetului, chemarea lui timpurie și lucrarea care presupune mai întâi dărâmare, apoi zidire.",
    units: [{
      from: 1, to: 19,
      heading: "«Nu spune: sunt un copil»",
      teaching: "Poonen se oprește la faptul că Dumnezeu îl cunoștea și îl pusese deoparte pe Ieremia înainte de naștere, apoi la ezitarea lui: «nu știu să vorbesc, sunt tânăr». Răspunsul lui Dumnezeu este prezența și cuvântul pus în gură. Cele șase verbe din 1:10 sunt importante: patru vorbesc despre smulgere și dărâmare, două despre zidire și plantare. Poonen aplică aceasta slujirii profetice care nu pune doar un petic peste structuri greșite. Chemarea prenatală a lui Ieremia este despre Ieremia; nu trebuie folosită ca dovadă că fiecare persoană are exact aceeași funcție profetică prestabilită.",
      source: p("chapter one ... before I formed you in the womb ... don't say I'm a youth ... pluck up break down destroy overthrow build and plant"),
      forYourHeart: "Lipsa experienței nu te scutește de ascultare când chemarea este clară, dar nici zelul nu te scutește de formare și verificare.",
    }],
  },
  2: {
    number: 2,
    title: "Izvorul de apă vie părăsit pentru cisterne crăpate",
    summary: "Ieremia descrie idolatria prin două rele: părăsirea DOMNULUI și construirea unor surse care nu pot ține apa.",
    units: [{
      from: 1, to: 37,
      heading: "Idolul nu este doar un lucru rău, ci un înlocuitor incapabil",
      teaching: "Poonen alege 2:13 ca mesaj de bază: poporul părăsește Izvorul apelor vii și își sapă cisterne fisurate. Imaginea arată atât abandonul relației cu Dumnezeu, cât și efortul de a obține viață din surse care nu pot păstra apa. Aplicația nu cere să numim orice plăcere, muncă sau relație «idol» automat; devine idol când primește încrederea, ascultarea și speranța care aparțin lui Dumnezeu.",
      source: p("chapter 2 verse 13 ... forsaken me ... fountain of water ... cisterns that can contain no water"),
    }],
  },
  3: {
    number: 3,
    title: "Întoarcerea începe prin recunoașterea fărădelegii",
    summary: "Iuda este avertizată să învețe din căderea Israelului. DOMNUL cheamă rămășița să se întoarcă și promite păstori după inima Lui.",
    units: [{
      from: 11, to: 25,
      heading: "Păstori după inima lui Dumnezeu, nu doar oameni cu informație",
      teaching: "Poonen insistă asupra faptului că Iuda nu a învățat din căderea regatului de nord. Chemarea este: recunoaște-ți fărădelegea și întoarce-te. El se oprește la 3:15 — Dumnezeu va da păstori după inima Lui care vor hrăni cu cunoaștere și pricepere. Poonen aplică «Zionul» bisericii adevărate; aceasta este aplicația lui tipologică, nu sensul istoric exclusiv al versetului. Criteriul pastoral pe care îl păstrează textul este inima orientată spre Dumnezeu și hrănirea poporului, nu exploatarea lui.",
      source: p("chapter 3 ... acknowledge your iniquity ... shepherds after my own heart"),
    }],
  },
  4: {
    number: 4,
    title: "Desțeleniți pământul și circumcideți inima",
    summary: "Judecata se apropie, iar profetul vorbește dintr-o inimă care suferă pentru popor.",
    units: [{
      from: 1, to: 31,
      heading: "Mesajul puternic trebuie să vină dintr-o inimă atinsă",
      teaching: "Poonen evidențiază 4:3–4 — nu semănați între spini, circumcideți-vă inimile — și apoi strigătul lui Ieremia din 4:19. Pentru el, profetul nu este numai o gură care anunță dezastrul, ci un om a cărui inimă este în durere pentru cei cărora le vorbește. Fermitatea fără compasiune nu reproduce modelul lui Ieremia.",
      source: p("chapter 4 ... break up your fallow ground ... foreskins of your heart ... my soul my soul"),
      words: [{
        original: "לֵבָב",
        transliteration: "levav",
        language: "ebraica",
        meaning: "inimă, centrul interior al voinței și orientării; «circumcizia inimii» mută semnul de la exterior spre realitatea lăuntrică.",
        verseRef: "Ieremia 4:4",
        lexicalSource: "WLC-OSHB",
      }],
    }],
  },
  5: {
    number: 5,
    title: "Dumnezeu caută un om care face dreptate și caută adevărul",
    summary: "Ieremia primește imaginea unei cetăți în care chiar și un singur om drept ar conta, dar corupția este răspândită.",
    units: [{
      from: 1, to: 31,
      heading: "Un om credincios poate conta mult, dar nu este un talisman pentru comunitate",
      teaching: "Poonen se oprește la 5:1 și îl compară cu mijlocirea pentru Sodoma: Dumnezeu îi spune lui Ieremia să caute un om care face dreptate și caută adevărul. El aplică aceasta influenței pe care o singură viață dreaptă o poate avea într-o casă sau comunitate. Nu trebuie însă transformat într-o formulă că prezența unui singur credincios va împiedica orice consecință colectivă; în Ieremia, cetatea tot ajunge la judecată pentru că starea generală rămâne neschimbată.",
      source: p("chapter 5 verse 1 ... if you find one person ... who does justice and seeks the truth"),
    }],
  },
  6: {
    number: 6,
    title: "Întrebați de cărările cele vechi și umblați pe calea bună",
    summary: "Poporul este chemat să se oprească și să întrebe de calea bună, dar răspunde că nu va umbla pe ea.",
    units: [{
      from: 16, to: 30,
      heading: "Vechi nu înseamnă automat adevărat; criteriul este calea bună a lui Dumnezeu",
      teaching: "Poonen citează 6:16 și aplică «cărările cele vechi» drumului apostolic. Este util să păstrăm formularea completă: textul nu sfințește orice tradiție veche, ci cere «calea bună». Vechimea unei practici nu o face biblică; întrebarea este dacă aparține drumului lui Dumnezeu.",
      source: p("chapter 6 verse 16 ... ask for the old paths ... find the good way"),
    }],
  },
  7: {
    number: 7,
    title: "«Templul DOMNULUI» nu poate acoperi furtul, minciuna și adulterul",
    summary: "Ieremia stă la poarta templului și confruntă încrederea într-un simbol religios fără schimbarea vieții.",
    units: [{
      from: 1, to: 34,
      heading: "Un revival superficial nu schimbă verdictul dacă viața privată rămâne aceeași",
      teaching: "Poonen leagă Ieremia 7 de mișcarea religioasă din zilele lui Iosia și avertizează împotriva revivalului care rămâne exterior. Repetarea «Templul DOMNULUI» devine o formulă falsă de siguranță când oamenii continuă furtul, minciuna și adulterul. Iisus va cita din acest capitol la curățirea templului. Apartenența la o biserică, tradiție sau mișcare nu este înlocuitor pentru pocăință.",
      source: p("chapter 7 ... temple of the Lord ... change your ways ... steal murder commit adultery tell lies"),
    }],
  },
  23: {
    number: 23,
    title: "Odrasla dreaptă și profeții care vorbesc din propria imaginație",
    summary: "Capitolul pune alături promisiunea Împăratului drept și o denunțare severă a păstorilor și profeților falși.",
    units: [{
      from: 1, to: 8,
      heading: "Odrasla dreaptă",
      teaching: "Poonen se oprește la 23:5–6 și îl citește ca profeție mesianică despre Hristos, Odrasla dreaptă. Promisiunea vine în contrast cu păstorii care risipesc turma.",
      source: p("chapter twenty-three ... coming of Jesus Christ ... righteous branch"),
    }, {
      from: 9, to: 40,
      heading: "Nu spune «DOMNUL mi-a spus» când cuvântul vine din mintea ta",
      teaching: "Poonen recomandă capitolul 23 celor care predică. El se oprește la profeții care nu au stat în sfatul DOMNULUI, dar spun mesaje din propria inimă și folosesc formula «așa vorbește DOMNUL». Pentru Emanus, aceasta devine control important: o impresie, intuiție sau text generat nu trebuie atribuit lui Dumnezeu fără temei. Nici majoritatea, nici intensitatea emoției nu transformă propria imaginație în revelație.",
      source: p("chapter twenty-three ... false prophets ... don't listen ... thus says the Lord ... own mind"),
      forYourHeart: "Este mai sigur să spui «cred că» decât «Dumnezeu mi-a spus» când nu ai un cuvânt pe care îl poți susține responsabil.",
    }],
  },
  29: {
    number: 29,
    title: "Șaptezeci de ani, viață în exil și căutarea lui Dumnezeu din toată inima",
    summary: "Ieremia scrie exilaților să construiască, să planteze și să caute binele cetății, în timp ce așteaptă timpul restaurării.",
    units: [{
      from: 1, to: 32,
      heading: "«Mă veți căuta și Mă veți găsi» în contextul unui exil lung",
      teaching: "Poonen se oprește la 29:12–13: după anunțarea celor șaptezeci de ani, Dumnezeu promite că poporul Îl va găsi când Îl va căuta din toată inima. Celebrul 29:11 nu trebuie scos din context ca promisiune că fiecare plan personal va prospera repede; destinatarii primesc tocmai vestea unei perioade lungi în Babilon. Speranța este legată de fidelitatea lui Dumnezeu dincolo de durata necazului.",
      source: p("chapter twenty-nine ... seventy years ... verse twelve and thirteen ... seek me"),
    }],
  },
  31: {
    number: 31,
    title: "Iubire veșnică și Noul Legământ scris în inimă",
    summary: "Capitolul vorbește despre restaurare și conține promisiunea Noului Legământ pe care Evrei o va cita extensiv.",
    units: [{
      from: 1, to: 40,
      heading: "De la table exterioare la Legea pusă înăuntru",
      teaching: "Poonen evidențiază 31:3 — «Te iubesc cu o iubire veșnică» — și spune că Ieremia profețește mult despre Noul Legământ. În 31:31–34, Dumnezeu promite un legământ diferit, Legea pusă înăuntru, cunoașterea personală a DOMNULUI și iertarea păcatului. Evrei folosește acest pasaj ca text central despre Noul Legământ în Hristos.",
      source: p("chapter thirty-one ... everlasting love ... new covenant"),
      words: [{
        original: "בְּרִית חֲדָשָׁה",
        transliteration: "berit hadașah",
        language: "ebraica",
        meaning: "legământ nou; expresia explicită din Ieremia 31:31, preluată în Evrei pentru lucrarea lui Hristos.",
        verseRef: "Ieremia 31:31",
        lexicalSource: "WLC-OSHB",
      }],
    }],
  },
  32: {
    number: 32,
    title: "Ieremia cumpără un ogor în timp ce cetatea este asediată",
    summary: "Profetul este închis, dar cumpără un teren ca semn că Dumnezeu va restaura viața în țară.",
    units: [{
      from: 1, to: 44,
      heading: "Speranță exprimată printr-un act concret când situația vizibilă spune contrariul",
      teaching: "Poonen amintește că Ieremia era întemnițat în această perioadă. Textul însuși prezintă cumpărarea ogorului drept semn profetic: case, ogoare și vii vor fi iar cumpărate. Nu este un sfat de investiții în vreme de război; actul are sens pentru că Dumnezeu îi dă explicit lui Ieremia acest semn.",
      source: p("chapter thirty-two ... Jeremiah being imprisoned"),
    }],
  },
}

const IEREMIA_OVERLAY: ExplainedBookOverlay = {
  bookId: "ieremia",
  bibleEmanusBookId: "JER",
  name: "Ieremia",
  testament: "vt",
  order: 24,
  transcript,
  status: "in_review",
  coverageMode: "transcript-focused",
  chapters: transcriptFocusedChapters("Ieremia", 52, focused),
}

export const IEREMIA_EXPLAINED = assertCompleteOverlay(IEREMIA_OVERLAY, 52)
