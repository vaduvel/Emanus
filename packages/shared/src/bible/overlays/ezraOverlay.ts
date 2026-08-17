import {
  assertCompleteOverlay,
  transcriptFocusedChapters,
  type ExplainedBookOverlay,
  type ExplainedOverlayChapter,
} from "../explainedOverlay.js"

const transcript = ".research/poonen-through-the-bible-OT/transcripts/chronicles-ezra.txt"
const p = (anchor: string) => ({ kind: "poonen" as const, transcript, anchor })
const n = { kind: "biblia-emanus" as const, note: "rezumat narativ fără doctrină adăugată" as const }

const focused: Record<number, ExplainedOverlayChapter> = {
  1: {
    number: 1,
    title: "Dumnezeu trezește duhul lui Cirus și deschide drumul întoarcerii",
    summary: "După anii exilului, Cirus proclamă reconstruirea Casei DOMNULUI și îi cheamă pe cei din popor să se întoarcă.",
    units: [
      {
        from: 1, to: 11,
        heading: "Restaurarea începe prin suveranitatea lui Dumnezeu",
        teaching: "Poonen deschide Ezra spunând că mișcarea întoarcerii începe cu Dumnezeu, care trezește duhul lui Cirus. Un împărat păgân devine instrument pentru redeschiderea drumului spre Ierusalim. Accentul transcriptului este că lucrarea lui Dumnezeu nu depinde de controlul poporului asupra tuturor structurilor politice; El poate mișca și oameni aflați în afara comunității legământului.",
        source: p("movement began with the sovereignty of God influencing King Cyrus"),
        forYourHeart: "Nu limita posibilitățile lui Dumnezeu la oamenii și instituțiile pe care le poți controla. El poate deschide o ușă dintr-un loc la care nu ai acces.",
      },
    ],
  },
  2: {
    number: 2,
    title: "Numele celor care s-au întors sunt păstrate",
    summary: "Ezra păstrează o listă detaliată a familiilor, slujitorilor și resurselor celor care s-au întors din exil.",
    units: [
      {
        from: 1, to: 70,
        heading: "O restaurare națională este alcătuită din persoane concrete",
        teaching: "În continuitate cu observația lui Poonen despre genealogii, lista nu este doar o cifră finală. Comunitatea restaurată este formată din familii și persoane cunoscute. Transcriptul nu dezvoltă fiecare nume, așa că overlay-ul nu inventează semnificații pentru ele.",
        source: p("God's kept a list"),
      },
    ],
  },
  3: {
    number: 3,
    title: "Altarul este ridicat înainte ca templul să fie terminat",
    summary: "Întorșii ridică altarul, reiau jertfele și pun temelia templului. Bucuria și plânsul se aud în același timp.",
    units: [
      {
        from: 1, to: 13,
        heading: "Închinarea începe în mijlocul unei lucrări încă neterminate",
        teaching: "Poonen se oprește la momentul punerii temeliei: preoții și leviții laudă pe DOMNUL, iar poporul răspunde că El este bun. Templul nu este încă ridicat, dar închinarea nu așteaptă finalizarea clădirii. Cei care cunoscuseră templul vechi plâng, iar alții strigă de bucurie; textul permite ambele reacții în aceeași restaurare.",
        source: p("laid the foundation of the temple ... began to praise the Lord"),
        forYourHeart: "Poți mulțumi pentru temelia pusă chiar dacă lucrarea nu arată încă așa cum speri. Bucuria prezentului nu trebuie să nege durerea pierderilor trecute.",
      },
    ],
  },
  4: {
    number: 4,
    title: "Opoziția încearcă întâi să se alăture, apoi să descurajeze și să oprească",
    summary: "Adversarii cer să participe la construcție, apoi folosesc frica, descurajarea, consilierii și acuzațiile pentru a opri lucrarea.",
    units: [
      {
        from: 1, to: 24,
        heading: "O lucrare poate întâlni opoziție fără ca opoziția să dovedească automat că este greșită",
        teaching: "Poonen descrie capitolul 4 printr-o succesiune de presiuni: frică, hărțuire, consilieri plătiți și încercarea de a frustra lucrarea. El aplică aceasta oamenilor care vor să urmărească gloria și voia lui Dumnezeu fără interes pentru bani sau onoare. Totuși simpla existență a opoziției nu demonstrează că o inițiativă este de la Dumnezeu; în Ezra, lucrarea avea deja mandatul explicit al întoarcerii și reconstruirii.",
        source: p("chapter 4 ... tried to frighten them ... harassment ... hired counselors"),
        forYourHeart: "Nu te opri numai fiindcă apar dificultăți, dar nici nu numi fiecare critic «dușman». Întoarce-te la mandatul, adevărul și motivele lucrării.",
      },
    ],
  },
  5: {
    number: 5,
    title: "Hagai și Zaharia vorbesc, iar construcția reîncepe",
    summary: "Prorocii Hagai și Zaharia îi încurajează pe iudei, iar Zorobabel și Ieșua reiau construcția în timp ce autoritățile cer verificarea decretului.",
    units: [
      {
        from: 1, to: 17,
        heading: "Cuvântul profetic pune din nou poporul în mișcare",
        teaching: "Poonen vede opoziția din Ezra nu ca ultimul cuvânt. Dumnezeu ridică proroci, iar lucrul reîncepe. Autoritățile cer apoi verificarea juridică a decretului. Narațiunea ține împreună încurajarea spirituală și procesele administrative, fără să le trateze ca opuse.",
        source: p("opposition ... God is sovereign ... He overcomes it"),
      },
    ],
  },
  6: {
    number: 6,
    title: "Decretul lui Cirus este găsit, iar opoziția ajunge să finanțeze lucrarea",
    summary: "Căutarea în arhive confirmă decretul lui Cirus. Darius poruncește ca lucrarea să nu fie împiedicată și chiar să fie sprijinită din veniturile împărătești.",
    units: [
      {
        from: 1, to: 22,
        heading: "Dumnezeu poate întoarce chiar procedura folosită împotriva lucrării",
        teaching: "Poonen evidențiază ironia: o verificare pornită în contextul opoziției scoate la lumină decretul original, iar Darius ajunge să ordone sprijin financiar pentru templu. Pentru el aceasta arată suveranitatea lui Dumnezeu. Nu este o promisiune că orice conflict administrativ se va termina favorabil, ci sensul pe care narațiunea îl dă acestui caz.",
        source: p("decree which Cyrus had made ... sovereignty of God ... opposition works for good"),
        forYourHeart: "Nu presupune că Dumnezeu poate lucra numai printr-un drum fără controale, întârzieri sau documente. Uneori chiar verificarea scoate adevărul la lumină.",
      },
    ],
  },
  7: {
    number: 7,
    title: "Ezra: om al Cuvântului trimis să învețe",
    summary: "Ezra ajunge la Ierusalim cu sprijinul împăratului. Este prezentat ca un cărturar priceput în Legea lui Moise și ca om peste care era mâna DOMNULUI.",
    units: [
      {
        from: 1, to: 28,
        heading: "Studiul adânc al Cuvântului pregătește slujirea de învățător",
        teaching: "Poonen îl descrie pe Ezra ca învățător și om care studiase adânc Cuvântul lui Dumnezeu. Pentru transcript, Dumnezeu nu folosește ignoranța ca virtute; omul chemat să învețe trebuie să se adâncească el însuși în Scriptură. Ezra nu este prezentat doar prin informație, ci și prin mâna lui Dumnezeu peste drumul și însărcinarea lui.",
        source: p("Ezra was a teacher ... a man who had studied deeply the word of God"),
        forYourHeart: "Dacă vrei să înveți pe alții, nu te grăbi să vorbești mai mult decât ai citit, trăit și cercetat.",
      },
    ],
  },
  8: {
    number: 8,
    title: "Al doilea grup se întoarce împreună cu Ezra",
    summary: "Ezra păstrează lista celor care merg cu el, caută leviți pentru slujire și organizează transportul darurilor spre Ierusalim.",
    units: [
      {
        from: 1, to: 36,
        heading: "O mișcare spirituală are și nume, responsabilități și bunuri de administrat",
        teaching: "Transcriptul menționează din nou lista oamenilor. Capitolul este păstrat în principal narativ: Ezra verifică cine este prezent, caută slujitori potriviți și încredințează bunurile unor oameni desemnați. Nu se adaugă o doctrină despre metode de călătorie sau protecție dincolo de text.",
        source: p("chapter 8 verse 1 ... another list of the people"),
      },
    ],
  },
  9: {
    number: 9,
    title: "Ezra află de căsătoriile care au amestecat din nou poporul cu idolatria",
    summary: "Conducătorii îi spun lui Ezra că o parte din popor, inclusiv lideri, a intrat în căsătorii interzise de legământ cu popoarele din jur. Ezra răspunde prin jale și rugăciune de mărturisire.",
    units: [
      {
        from: 1, to: 15,
        heading: "Compromisul este adus înaintea lui Dumnezeu, nu ascuns pentru reputația comunității",
        teaching: "Poonen numește direct problema «mixed marriages» și observă că ea este adusă înaintea bătrânilor. Cadrul este legământul vechi și pericolul întoarcerii la practicile idolate ale popoarelor din jur. Pasajul nu justifică rasismul, segregarea etnică sau ideea că o căsătorie modernă este necurată din cauza rasei ori naționalității partenerului.",
        source: p("chapter 9 verse 1 ... problem of mixed marriages ... brought it to the elders"),
        forYourHeart: "Nu ascunde compromisul liderilor ca să protejezi imaginea grupului. Adevărul și pocăința sunt mai importante decât reputația instituției.",
      },
    ],
  },
  10: {
    number: 10,
    title: "Comunitatea ia măsuri după mărturisirea păcatului",
    summary: "Poporul plânge, se adună și începe o examinare organizată a cazurilor de căsătorie interzisă. Cartea încheie cu o listă a celor implicați.",
    units: [
      {
        from: 1, to: 44,
        heading: "Pocăința nu rămâne numai emoție, dar soluția aparține cadrului acestui legământ",
        teaching: "Poonen observă că Ezra păstrează chiar și lista celor care au compromis standardul comunității: nu numai lucrătorii credincioși sunt cunoscuți pe nume. Capitolul descrie măsuri foarte dure privind familiile formate. Ele aparțin situației legământului post-exilic și nu trebuie transformate într-o comandă creștină generală de divorț sau abandon al soțului și copiilor. În Noul Testament, căsătoria existentă cu un necredincios este tratată explicit în 1 Corinteni 7, unde credinciosul nu este chemat să plece dacă celălalt dorește să rămână.",
        source: p("God's kept a list of the compromisers too ... that's how the book of Ezra ends"),
        forYourHeart: "Pocăința cere pași concreți, dar nu aplica mecanic o soluție din alt cadru de legământ fără să citești întregul sfat al Scripturii.",
      },
    ],
  },
}

const EZRA_OVERLAY: ExplainedBookOverlay = {
  bookId: "ezra",
  bibleEmanusBookId: "EZR",
  name: "Ezra",
  testament: "vt",
  order: 15,
  transcript,
  status: "in_review",
  coverageMode: "transcript-focused",
  chapters: transcriptFocusedChapters("Ezra", 10, focused),
}

export const EZRA_EXPLAINED = assertCompleteOverlay(EZRA_OVERLAY, 10)
