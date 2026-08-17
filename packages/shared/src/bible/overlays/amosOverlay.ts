import {
  assertCompleteOverlay,
  transcriptFocusedChapters,
  type ExplainedBookOverlay,
  type ExplainedOverlayChapter,
} from "../explainedOverlay.js"

const sourceUrl = "https://www.cfcindia.com/through-the-bible/amos-obadiah"
const p = (section: string) => ({ kind: "poonen-official" as const, sourceUrl, section })
const n = {
  kind: "biblia-emanus" as const,
  note: "rezumat narativ fără doctrină adăugată" as const,
}

const focused: Record<number, ExplainedOverlayChapter> = {
  1: {
    number: 1,
    title: "Judecata începe asupra neamurilor din jur",
    summary: "Amos rostește sentințe împotriva mai multor popoare înainte ca mesajul să ajungă direct la Iuda și Israel.",
    units: [{
      from: 1, to: 15,
      heading: "Judgement",
      teaching: "Structura oficială Poonen începe cu «Judgement». Amos nu folosește alegerea lui Israel ca scut împotriva dreptății lui Dumnezeu; cartea lărgește mai întâi perspectiva asupra răului dintre neamuri. Judecata aparține lui Dumnezeu și nu este mandat pentru comunități religioase moderne să pedepsească violent alte popoare.",
      source: p("Judgement"),
    }],
  },
  2: {
    number: 2,
    title: "Privilegiul nu micșorează responsabilitatea lui Israel",
    summary: "După judecarea vecinilor, profeția se întoarce spre Iuda și Israel și numește nedreptatea, exploatarea și coruperea darurilor lui Dumnezeu.",
    units: [{
      from: 1, to: 16,
      heading: "Privilege Brings Dangers and Responsibility",
      teaching: "Titlul tematic Poonen pentru Amos este «privilegiul aduce pericole și responsabilitate». Israel primise revelație și izbăvire, dar tocmai aceste privilegii măresc răspunderea, nu oferă imunitate. Capitolul numește vânzarea celui drept pentru bani și călcarea celor săraci. Apartenența la poporul lui Dumnezeu nu poate fi folosită pentru a normaliza nedreptatea.",
      source: p("Privilege Brings Dangers and Responsibility"),
    }],
  },
  3: {
    number: 3,
    title: "Alegerea lui Israel aduce răspundere, iar prorocul vorbește pentru că DOMNUL a vorbit",
    summary: "Amos leagă relația specială dintre Dumnezeu și Israel de răspunderea pentru nelegiuire. Apoi explică inevitabilitatea mesajului profetic și cheamă martori să vadă violența strânsă în Samaria.",
    units: [
      {
        from: 1, to: 8,
        heading: "«Numai pe voi v-am cunoscut» — de aceea vă voi cerceta nelegiuirile",
        teaching: "Capitolul începe amintind întregii familii scoase din Egipt relația ei specială cu Dumnezeu, dar consecința formulată în text este cercetarea nelegiuirilor, nu imunitatea. Seria de întrebări care urmează leagă cauze de efecte și culminează cu afirmația că, atunci când DOMNUL vorbește, prorocul nu poate trata mesajul ca pe ceva lipsit de urmări.",
        source: n,
      },
      {
        from: 9, to: 15,
        heading: "Samaria este chemată să-și vadă violența și palatele pline de pradă",
        teaching: "A doua parte cheamă martori din afara Israelului să privească tulburarea din Samaria. Textul vorbește despre oameni care nu mai știu să facă ce este drept și despre violență și jaf adunate în palate. Judecata ajunge până la altarele Betelului și la casele luxoase, astfel încât religia, puterea și bogăția nu rămân zone separate de răspunderea morală descrisă de profet.",
        source: n,
      },
    ],
  },
  4: {
    number: 4,
    title: "Asuprirea, cultul ironizat și avertismentele după care Israel tot nu se întoarce",
    summary: "Amos confruntă luxul construit pe apăsarea celor slabi, apoi ironizează închinarea care înmulțește fărădelegile. O serie de lovituri este urmată de același refren: Israel tot nu s-a întors la Dumnezeu.",
    units: [
      {
        from: 1, to: 5,
        heading: "Luxul care apasă pe sărac și închinarea care înmulțește păcatul",
        teaching: "Primele versete le confruntă pe femeile bogate din Samaria pentru asuprirea celor săraci și pentru cererea continuă de confort. Apoi profetul trece la Betel și Ghilgal într-un ton ironic: oamenii pot aduce jertfe și zeciuieli cu zel, dar textul spune că tocmai acolo își înmulțesc fărădelegile. Activitatea religioasă nu schimbă diagnosticul moral al pasajului.",
        source: n,
      },
      {
        from: 6, to: 11,
        heading: "«Și tot nu v-ați întors la Mine»",
        teaching: "Foametea, lipsa ploii, uscarea recoltelor, lăcustele, molima și distrugerea sunt enumerate succesiv. După fiecare grup de avertismente revine aceeași propoziție: poporul nu s-a întors la Dumnezeu. Repetiția este chiar structura pasajului și arată că problema urmărită de Amos nu este doar suferința produsă de criză, ci lipsa întoarcerii în ciuda avertismentelor.",
        source: n,
      },
      {
        from: 12, to: 13,
        heading: "Pregătește-te să întâlnești pe Dumnezeul tău",
        teaching: "După avertismentele repetate, textul formulează concluzia solemnă: Israel trebuie să se pregătească să-L întâlnească pe Dumnezeul său. Ultimul verset Îl descrie pe Dumnezeu ca Făcător al munților și vântului, Cel care cunoaște și descoperă gândul și stăpânește peste creație. Identitatea Celui întâlnit dă greutatea chemării.",
        source: n,
      },
    ],
  },
  5: {
    number: 5,
    title: "Căutați pe DOMNUL și trăiți; lăsați dreptatea să curgă",
    summary: "Amos confruntă cultul separat de dreptate și cheamă poporul să caute binele și pe DOMNUL.",
    units: [{
      from: 1, to: 27,
      heading: "Why Israel was being Judged",
      teaching: "A doua temă oficială Poonen este motivul pentru care Israel era judecat. Amos 5 răspunde prin viața publică și religioasă: oamenii urăsc mustrarea, apasă pe sărac și țin sărbători pe care Dumnezeu le respinge când dreptatea lipsește. «Să curgă dreptatea ca apele» nu opune închinarea dreptății, ci refuză închinarea care coexistă liniștit cu exploatarea.",
      source: p("Why Israel was being Judged"),
      words: [{
        original: "מִשְׁפָּט",
        transliteration: "mișpat",
        language: "ebraica",
        meaning: "judecată dreaptă, dreptate aplicată; în Amos 5:24 este ceva ce trebuie să curgă continuu, nu doar o declarație religioasă.",
        verseRef: "Amos 5:24",
        lexicalSource: "WLC-OSHB",
      }],
      forYourHeart: "Dacă devoțiunea ta nu schimbă felul în care tratezi omul mai slab, Amos nu te lasă să separi cele două domenii.",
    }],
  },
  6: {
    number: 6,
    title: "Siguranța celor nepăsători nu poate opri exilul",
    summary: "Capitolul descrie oameni care trăiesc în siguranță și lux, fără să se întristeze de ruina lui Iosif. Tocmai cei care se consideră cei dintâi sunt anunțați ca primii care vor merge în exil.",
    units: [
      {
        from: 1, to: 7,
        heading: "Paturi de fildeș, cântece și nepăsare față de ruina lui Iosif",
        teaching: "Amos pronunță un «vai» asupra celor care se simt fără grijă în Sion și în Samaria. El descrie paturi luxoase, mâncare aleasă, muzică, vin și parfum, apoi numește lipsa centrală: nu se întristează de ruina lui Iosif. Verdictul întoarce statutul lor social pe dos — cei care stăteau în frunte vor merge în fruntea exilaților.",
        source: n,
      },
      {
        from: 8, to: 14,
        heading: "Mândria este urâtă, iar dreptatea a fost transformată în otravă",
        teaching: "A doua parte leagă judecata de mândria lui Iacov și de siguranța pusă în fortificații și putere. Profetul folosește două întrebări absurde — cai alergând pe stâncă și boi arând marea — pentru a descrie absurditatea transformării dreptății în otravă. Capitolul se încheie cu ridicarea unei națiuni care va apăsa hotarele Israelului.",
        source: n,
      },
    ],
  },
  7: {
    number: 7,
    title: "Viziunile judecății și conflictul dintre Amos și Amația",
    summary: "Amos vede lăcuste, foc și firul cu plumb, apoi este atacat de preotul Amația pentru mesajul său.",
    units: [{
      from: 1, to: 17,
      heading: "Visions of Judgement",
      teaching: "Tema finală Poonen include «viziuni ale judecății». Amos mijlocește în primele două viziuni, iar apoi primește imaginea firului cu plumb care arată că evaluarea vine după standardul lui Dumnezeu. Conflictul cu Amația arată tensiunea dintre mesajul profetic și instituția care vrea liniște. Aceasta nu înseamnă că orice persoană care se ceartă cu un lider religios este automat profet; cuvântul trebuie verificat prin Scriptură și adevăr.",
      source: p("Visions of Judgement and Promises of Restoration"),
    }],
  },
  8: {
    number: 8,
    title: "Coșul cu fructe coapte, exploatarea săracului și foametea după cuvânt",
    summary: "Vedenia fructelor coapte anunță că sfârșitul a ajuns. Amos leagă verdictul de comerțul nedrept și descrie apoi o foamete în care oamenii vor căuta cuvântul DOMNULUI și nu îl vor găsi.",
    units: [
      {
        from: 1, to: 6,
        heading: "Sfârșitul este copt, iar negustorii așteaptă să poată înșela din nou",
        teaching: "Coșul cu fructe de vară devine semnul că sfârșitul a ajuns pentru Israel. Imediat, profetul descrie oameni care calcă pe sărac și așteaptă nerăbdători să treacă sărbătoarea pentru a relua comerțul cu măsuri micșorate, prețuri mărite și cântare înșelătoare. Textul leagă direct verdictul profetic de practicile economice concrete.",
        source: n,
      },
      {
        from: 7, to: 10,
        heading: "DOMNUL jură că nu va uita faptele lor",
        teaching: "Dumnezeu spune că nu va uita niciuna dintre faptele descrise, iar imaginea judecății cuprinde cutremurarea țării, întunecarea zilei și transformarea sărbătorilor în jale. Pasajul nu prezintă doar o pierdere materială, ci răsturnarea publică a bucuriei pe care societatea o continua în timp ce îi exploata pe cei vulnerabili.",
        source: n,
      },
      {
        from: 11, to: 14,
        heading: "Foamete nu de pâine, ci de auzirea cuvintelor DOMNULUI",
        teaching: "Ultima imagine este diferită de seceta obișnuită: oamenii vor umbla dintr-un loc în altul căutând să audă cuvintele DOMNULUI și nu le vor găsi. Tinerii ajung istoviți, iar cei care jură pe idolii Samariei cad. Textul descrie pierderea accesului la cuvânt după o perioadă în care avertismentul fusese prezent și respins.",
        source: n,
      },
    ],
  },
  9: {
    number: 9,
    title: "Judecata nu este ultimul cuvânt: cortul lui David este ridicat",
    summary: "Finalul trece de la imposibilitatea de a fugi de judecată la promisiunea restaurării.",
    units: [{
      from: 1, to: 15,
      heading: "Promises of Restoration",
      teaching: "Structura oficială Poonen încheie Amos cu «promisiuni de restaurare». După judecată, Dumnezeu vorbește despre ridicarea cortului căzut al lui David. Faptele Apostolilor 15 citează această secțiune în discuția despre includerea neamurilor. Restaurarea nu șterge severitatea avertismentelor precedente, ci arată că scopul lui Dumnezeu trece dincolo de ruină.",
      source: p("Visions of Judgement and Promises of Restoration"),
    }],
  },
}

const AMOS_OVERLAY: ExplainedBookOverlay = {
  bookId: "amos",
  bibleEmanusBookId: "AMO",
  name: "Amos",
  testament: "vt",
  order: 30,
  transcript: sourceUrl,
  status: "in_review",
  coverageMode: "transcript-focused",
  chapters: transcriptFocusedChapters("Amos", 9, focused),
}

export const AMOS_EXPLAINED = assertCompleteOverlay(AMOS_OVERLAY, 9)
