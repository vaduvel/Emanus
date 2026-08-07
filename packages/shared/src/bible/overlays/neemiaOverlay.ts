import {
  assertCompleteOverlay,
  transcriptFocusedChapters,
  type ExplainedBookOverlay,
  type ExplainedOverlayChapter,
} from "../explainedOverlay.js"

const transcript = ".research/poonen-through-the-bible-OT/transcripts/nehemiah-esther.txt"
const p = (anchor: string) => ({ kind: "poonen" as const, transcript, anchor })

const focused: Record<number, ExplainedOverlayChapter> = {
  1: {
    number: 1,
    title: "Neemia întreabă de Ierusalim, plânge, postește și se roagă",
    summary: "Neemia trăiește într-o poziție de încredere la curtea persană, dar poartă în inimă starea Ierusalimului. Când află că zidurile sunt dărâmate, răspunsul lui este jale, post și rugăciune.",
    units: [
      {
        from: 1, to: 11,
        heading: "Lucrarea începe cu o povară, nu cu o funcție",
        teaching: "Poonen insistă asupra preocupării lui Neemia. Hanani nu îi impune subiectul; Neemia întreabă cum este Ierusalimul. Când află starea cetății, plânge pentru ceva ce nu privește confortul lui personal, ci onoarea Numelui lui Dumnezeu. Transcriptul contrastează postul pentru propriile nevoi cu postul născut din dorința ca Dumnezeu să fie onorat în poporul Său. Neemia nu era un «lucrător cu normă întreagă», ci un om credincios într-o slujbă seculară.",
        source: p("Nehemiah ... has a concern ... sat down and wept ... fasted and prayed"),
        forYourHeart: "Înainte să întrebi ce rol ai putea primi, întreabă ce stare a poporului lui Dumnezeu te face să te rogi chiar dacă nu îți aduce niciun avantaj personal.",
      },
    ],
  },
  2: {
    number: 2,
    title: "Neemia simte frica, se roagă scurt și face pasul",
    summary: "Împăratul observă tristețea lui Neemia. El se teme, dar vorbește, cere permisiunea de a merge la Ierusalim, apoi inspectează zidurile fără să-și publice imediat planul.",
    units: [
      {
        from: 1, to: 10,
        heading: "Frica simțită nu trebuie să devină frica după care acționezi",
        teaching: "Poonen apreciază onestitatea lui Neemia: textul spune că s-a temut foarte mult. El nu pretinde că omul credincios nu mai simte frica; diferența este că Neemia nu lasă frica să decidă. Face o rugăciune scurtă și răspunde împăratului. Transcriptul distinge prudența de acțiunea condusă de necredință.",
        source: p("he was afraid ... we will feel fear ... must never act on fear"),
        forYourHeart: "Curajul nu înseamnă absența senzației de frică. Înseamnă să nu-i dai fricii ultimul cuvânt asupra ascultării.",
      },
      {
        from: 11, to: 20,
        heading: "Inspectează înainte să anunțe și adună oameni care au aceeași povară",
        teaching: "Ajuns la Ierusalim, Neemia nu face reclamă imediată proiectului. Inspectează zidurile noaptea cu puțini oameni și spune că nu le dezvăluise încă ce pusese Dumnezeu în inima lui. Poonen vede aici discreție și discernământ: nu orice plan trebuie anunțat înainte să fie înțeles și nu orice mulțime este potrivită pentru începutul unei lucrări. Când Sanbalat și Tobia îl batjocoresc, Neemia nu abandonează mandatul primit.",
        source: p("I did not tell anyone what God was putting into my mind ... gathered a few who had a burden"),
      },
    ],
  },
  3: {
    number: 3,
    title: "Zidul este împărțit în porțiuni: «lângă el», fără goluri",
    summary: "Neemia organizează refacerea zidului pe familii și grupuri, astfel încât fiecare să lucreze la o porțiune concretă.",
    units: [
      {
        from: 1, to: 32,
        heading: "Liderii și oamenii lucrează cu mâinile lor",
        teaching: "Poonen citește capitolul 3 ca dovadă a capacității lui Neemia de a organiza și motiva fără să se ridice deasupra lucrătorilor. Marele preot lucrează, familiile lucrează, apar și fiicele lui Șalum. Transcriptul observă repetarea «lângă el / lângă ei»: lucrarea este distribuită astfel încât zidul să nu rămână cu goluri. Conducerea nu este doar supraveghere de pe scaun, ci participare și coordonare.",
        source: p("chapter 3 ... everybody's got their job ... next to him ... without a gap"),
        forYourHeart: "O comunitate nu se zidește numai prin câțiva oameni vizibili. Întrebarea sănătoasă este: care este porțiunea mea și cu cine lucrez umăr la umăr?",
      },
    ],
  },
  4: {
    number: 4,
    title: "Batjocura și amenințarea cresc, dar zidul continuă",
    summary: "Sanbalat și aliații lui ridiculizează lucrarea și apoi pregătesc atacul. Oamenii se roagă, pun strajă și continuă să zidească pregătiți pentru apărare.",
    units: [
      {
        from: 1, to: 23,
        heading: "Rugăciune, vigilență și muncă în același timp",
        teaching: "Poonen prezintă opoziția ca parte repetată a restaurării Ierusalimului: batjocură, descurajare, amenințare și încercarea de a opri. Neemia nu răspunde prin abandon și nici prin spiritualitate pasivă; poporul se roagă și pune strajă. Lucrarea continuă în timp ce pericolul este luat în serios. Opoziția nu dovedește singură că o lucrare este de la Dumnezeu, dar nici nu este motiv suficient pentru a o abandona când mandatul este clar.",
        source: p("opposition ... devil ... hinder me and harass me"),
        forYourHeart: "Nu pune rugăciunea împotriva responsabilității practice. Uneori credința înseamnă să te rogi și să pui strajă.",
      },
    ],
  },
  5: {
    number: 5,
    title: "Neemia confruntă exploatarea din interior și refuză avantajele funcției",
    summary: "Criza nu mai vine numai din exterior: iudeii mai săraci sunt apăsați de propriii frați. Neemia cere restituire și renunță la drepturile economice pe care funcția de guvernator i le permitea.",
    units: [
      {
        from: 1, to: 13,
        heading: "Nu poți zidi zidul lui Dumnezeu în timp ce îți exploatezi fratele",
        teaching: "Textul arată că o lucrare publică de restaurare poate ascunde nedreptate economică în interior. Neemia îi confruntă pe dregători și cere restituirea. Transcriptul nu permite ca lupta împotriva adversarilor externi să devină scuză pentru a ignora felul în care oamenii vulnerabili sunt tratați în comunitate.",
        source: { kind: "biblia-emanus", note: "rezumat narativ fără doctrină adăugată" },
      },
      {
        from: 14, to: 19,
        heading: "Neemia nu cere hrana guvernatorului",
        teaching: "Poonen se oprește explicit la exemplul financiar al lui Neemia. Deși muncește intens și are dreptul la o alocație de guvernator, nu o cere, pentru că povara asupra poporului era deja mare. Transcriptul îl descrie ca om ospitalier care slujește pe cheltuiala lui. Aceasta este mărturia unei alegeri personale într-un context concret, nu o regulă că slujitorii creștini nu pot primi niciodată susținere materială; Noul Testament recunoaște și dreptul lucrătorului la sprijin.",
        source: p("chapter 5 ... I did not demand the governor's food allowance"),
        forYourHeart: "Dreptul tău poate fi real și totuși dragostea să te cheme uneori să renunți la el pentru binele celor apăsați.",
      },
    ],
  },
  6: {
    number: 6,
    title: "«Fac o lucrare mare și nu pot coborî»",
    summary: "Adversarii încearcă să-l scoată pe Neemia din lucrare prin întâlniri, zvonuri și intimidare religioasă. Zidul este terminat în cincizeci și două de zile.",
    units: [
      {
        from: 1, to: 14,
        heading: "Nu fiecare invitație la discuție merită timpul lucrării",
        teaching: "Poonen citează răspunsul lui Neemia: «fac o lucrare mare și nu pot coborî». Sanbalat îl cheamă repetat, apoi folosește zvonul și presiunea. Neemia discerne că unele discuții nu caută adevărul, ci distragerea sau frica. Aceasta nu justifică refuzul oricărei critici; Neemia răspunde acuzației și cercetează amenințarea, dar nu abandonează însărcinarea pentru negocieri fără rost.",
        source: p("I'm doing a great work and I cannot come down for all these useless discussions"),
        forYourHeart: "Discernământul include și alegerea conversațiilor în care nu intri. Nu orice provocare are dreptul la orele tale.",
      },
      {
        from: 15, to: 19,
        heading: "Zidul este încheiat în cincizeci și două de zile",
        teaching: "Poonen contrastează durata scurtă a lucrării lui Neemia cu anii în care zidul rămăsese neterminat. Povara, organizarea, cooperarea și perseverența schimbă situația. Textul spune chiar că adversarii recunosc că lucrarea fusese făcută cu ajutorul lui Dumnezeu.",
        source: p("wall was completed in 52 days"),
      },
    ],
  },
  8: {
    number: 8,
    title: "Ezra citește Cartea, iar poporul înțelege",
    summary: "După zidire, atenția comunității se mută spre Cuvânt. Ezra citește Legea, leviții o explică, iar oamenii răspund prin închinare, înțelegere și sărbătoare.",
    units: [
      {
        from: 1, to: 18,
        heading: "Zidurile nu sunt finalul: comunitatea trebuie formată de Cuvânt",
        teaching: "Poonen face trecerea rapidă la Ezra din capitolul 8. După organizarea cetății, restaurarea nu este completă fără Cuvântul lui Dumnezeu. Textul subliniază nu numai citirea, ci și explicarea astfel încât poporul să înțeleagă. «Bucuria DOMNULUI este tăria voastră» apare într-un context de auzire a Legii și de chemare de la plâns la o zi sfântă de bucurie.",
        source: p("we read about Ezra in chapter 8"),
      },
    ],
  },
  9: {
    number: 9,
    title: "Poporul își mărturisește păcatul în lumina istoriei harului lui Dumnezeu",
    summary: "Legea este citită, poporul postește și își mărturisește păcatele. Rugăciunea lungă trece prin istoria lui Israel și contrastează fidelitatea lui Dumnezeu cu repetatele răzvrătiri ale poporului.",
    units: [
      {
        from: 1, to: 38,
        heading: "Mărturisirea nu ascunde istoria și nu uită mila",
        teaching: "Transcriptul menționează în mod direct mărturisirea din capitolul 9. Rugăciunea nu rescrie trecutul pentru a proteja reputația poporului: numește răzvrătirea și încăpățânarea, dar repetă și mila, răbdarea și purtarea de grijă a lui Dumnezeu. Pocăința sănătoasă vede ambele lucruri.",
        source: p("Nehemiah and the people confessing their sin in chapter 9"),
        forYourHeart: "Mărturisirea nu înseamnă să spui că totul a fost rău și nici să minimalizezi răul. Spune adevărul despre păcat în lumina adevărului despre mila lui Dumnezeu.",
      },
    ],
  },
  13: {
    number: 13,
    title: "Neemia se întoarce și găsește din nou dezordine în templu și cetate",
    summary: "După o perioadă de absență, Neemia descoperă compromisuri privind încăperile templului, zeciuielile, Sabatul și căsătoriile cu popoarele din jur. El intervine ferm pentru a restabili rânduiala legământului.",
    units: [
      {
        from: 1, to: 14,
        heading: "Camera templului nu poate deveni spațiu privat pentru relațiile celui puternic",
        teaching: "Poonen compară fermitatea lui Neemia cu curățirea templului făcută mai târziu de Iisus. Neemia găsește o încăpere importantă pusă la dispoziția lui Tobia și o golește. Ideea transcriptului este că relațiile și influența nu trebuie să ocupe spațiul rezervat slujirii lui Dumnezeu. Acțiunea fizică din cadrul guvernării lui Neemia nu devine permisiune pentru violență sau evacuări arbitrare în biserică.",
        source: p("chapter 13 ... inside the temple ... put their unconverted relatives there ... chased them all out"),
      },
      {
        from: 15, to: 31,
        heading: "Reforma trebuie păzită după entuziasmul inițial",
        teaching: "Capitolul arată cât de repede pot reveni vechile practici: comerțul în Sabat, neglijarea slujitorilor și alianțele de familie contrare legământului. Neemia organizează din nou. Ca și în Ezra, căsătoriile sunt tratate în cadrul identității religioase post-exilice și nu oferă o bază pentru rasism sau o comandă creștină generală de divorț.",
        source: p("Nehemiah sets a lot of things in order"),
        forYourHeart: "O reformă nu se păstrează singură. După schimbarea mare vin obiceiurile mici prin care adevărul trebuie protejat zi de zi.",
      },
    ],
  },
}

const NEEMIA_OVERLAY: ExplainedBookOverlay = {
  bookId: "neemia",
  bibleEmanusBookId: "NEH",
  name: "Neemia",
  testament: "vt",
  order: 16,
  transcript,
  status: "in_review",
  coverageMode: "transcript-focused",
  chapters: transcriptFocusedChapters("Neemia", 13, focused),
}

export const NEEMIA_EXPLAINED = assertCompleteOverlay(NEEMIA_OVERLAY, 13)
