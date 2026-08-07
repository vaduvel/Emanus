import type { ExplainedOverlayChapter } from "../explainedOverlay.js"

const n = {
  kind: "biblia-emanus" as const,
  note: "rezumat narativ fără doctrină adăugată" as const,
}

export const ECLESIASTUL_TEXTUAL_CHAPTERS: Readonly<Record<number, ExplainedOverlayChapter>> = {
  4: {
    number: 4,
    title: "Asuprire, muncă din rivalitate și valoarea tovărășiei",
    summary: "Qohelet privește lacrimile celor asupriți, competiția care împinge munca, singurătatea omului care acumulează fără cineva apropiat și avantajul a doi oameni care se pot ajuta. Finalul observă cât de trecătoare este și popularitatea politică.",
    units: [
      { from: 1, to: 8, heading: "Asuprirea și munca ce se hrănește din comparație nu aduc odihnă", teaching: "Capitolul începe cu cei asupriți care plâng fără mângâietor și continuă cu observația că multă muncă și pricepere pot fi alimentate de invidia dintre oameni. Qohelet nu laudă lenea, dar nici agitația fără capăt: o mână plină cu odihnă este pusă lângă două mâini pline de trudă, iar omul singur care acumulează fără să știe pentru cine muncește este întrebat ce sens are această lipsire de bine.", source: n },
      { from: 9, to: 16, heading: "Doi sunt mai buni decât unul, iar succesul politic rămâne trecător", teaching: "Tovărășia este descrisă foarte practic: doi primesc răsplată pentru muncă, unul îl ridică pe celălalt când cade, se pot încălzi și pot rezista mai bine atacului. Funia împletită în trei nu se rupe repede. Ultima scenă mută privirea spre rege și popularitate: chiar un tânăr sărac și înțelept poate ajunge în locul unui rege nechibzuit, dar mulțimea care îl urmează astăzi nu garantează că generația următoare îl va celebra.", source: n },
    ],
  },
  6: {
    number: 6,
    title: "Bogăția fără puterea de a te bucura de ea și dorința care nu se satură",
    summary: "Capitolul descrie omul care primește bogăție, onoare și familie, dar nu poate gusta binele lor. Dorința continuă poate transforma belșugul într-o altă formă de gol, iar omul rămâne limitat în fața lucrurilor pe care nu le poate controla sau cunoaște.",
    units: [
      { from: 1, to: 6, heading: "A avea mult nu este același lucru cu a putea primi binele ca dar", teaching: "Qohelet numește un rău greu: omul poate avea bogății, avere și cinste și totuși să nu primească puterea de a se bucura de ele, astfel încât altul ajunge să le consume. Chiar viața foarte lungă și o familie numeroasă sunt puse sub aceeași întrebare dacă omul nu gustă binele și moare fără odihnă; accentul rămâne pe limita posesiei ca sursă de sens.", source: n },
      { from: 7, to: 12, heading: "Apetitul continuă, iar omul nu cunoaște ce este mai bine pentru toate zilele lui", teaching: "Toată truda gurii nu satură definitiv dorința, iar simplul fapt că cineva este înțelept sau sărac nu îl scoate din condiția umană. Qohelet preferă ceea ce ochii pot primi în fața poftei care rătăcește fără capăt și încheie cu limitele omului: nu poate disputa ca egal cu Cel mai puternic și nu știe singur ce este cel mai bun pentru toate zilele vieții lui trecătoare.", source: n },
    ],
  },
  8: {
    number: 8,
    title: "Înțelepciune sub autoritate și nedreptatea pe care omul nu o poate explica deplin",
    summary: "Qohelet discută purtarea înaintea regelui, limitele puterii omului asupra morții și situațiile în care cei răi primesc temporar onoare, iar cei drepți suferă. El se întoarce la limita înțelepciunii de a descifra toate lucrările lui Dumnezeu.",
    units: [
      { from: 1, to: 9, heading: "Înțelepciunea, cuvântul regelui și limitele puterii omenești", teaching: "Înțelepciunea schimbă fața omului și îl ajută să știe timpul și judecata potrivită. Qohelet sfătuiește prudență înaintea regelui și recunoaște puterea ordinului regal, dar imediat pune limitele oricărei autorități omenești: nimeni nu stăpânește vântul, ziua morții sau consecințele tuturor faptelor sale. Chiar puterea politică poate ajunge să rănească pe cel care o exercită.", source: n },
      { from: 10, to: 17, heading: "Când răul nu este judecat repede și când dreptatea pare inversată", teaching: "Qohelet observă oameni răi care au mers la locul sfânt și au fost uitați sau chiar onorați, iar întârzierea pedepsei poate încuraja inima spre rău. El afirmă totuși că binele final este legat de frica de Dumnezeu, chiar dacă «sub soare» vede drepți tratați ca răii și răi tratați ca drepții. Capitolul se încheie recunoscând că omul nu poate descoperi complet lucrarea lui Dumnezeu, oricât de mult ar pretinde că o înțelege.", source: n },
    ],
  },
  9: {
    number: 9,
    title: "Moartea comună, valoarea vieții prezente și înțelepciunea care poate fi ignorată",
    summary: "Qohelet privește faptul că drepții și răii mor deopotrivă, apoi îndeamnă omul să primească viața, mâncarea, relațiile și munca drept daruri în timpul pe care îl are. Finalul arată că înțelepciunea poate salva o cetate și totuși să fie repede uitată.",
    units: [
      { from: 1, to: 10, heading: "Același sfârșit pământesc și chemarea de a primi cu seriozitate viața care rămâne", teaching: "Qohelet observă că, privită numai dinspre mormânt, moartea îi ajunge pe toți și produce nedumerire morală. Totuși concluzia lui practică nu este abandonul: omul viu are încă speranță și este chemat să primească mâncarea, bucuria, relația cu persoana iubită și munca în zilele trecătoare care îi sunt date. Textul vorbește din perspectiva vieții «sub soare» și nu este o negare a revelației biblice ulterioare despre înviere.", source: n },
      { from: 11, to: 18, heading: "Rezultatul nu aparține automat celui mai rapid, iar înțelepciunea poate fi uitată", teaching: "Cursa nu este câștigată întotdeauna de cel mai rapid și nici lupta de cel mai tare, deoarece timpul și împrejurările ating pe toți. O cetate mică poate fi salvată prin înțelepciunea unui om sărac, dar acel om poate rămâne fără recunoaștere. Capitolul încheie preferând înțelepciunea armelor de război și avertizând că un singur păcătos poate distruge mult bine.", source: n },
    ],
  },
  10: {
    number: 10,
    title: "Puțină nebunie poate strica multă onoare",
    summary: "Capitolul adună observații despre nebunie în conducere, răspunsul calm la mânia superiorului, munca făcută fără pricepere, vorbirea nebunului și o societate slăbită de lideri imaturi și administrare neglijentă.",
    units: [
      { from: 1, to: 10, heading: "Nebunia mică, conducerea inversată și munca fără ascuțirea uneltei", teaching: "Așa cum câteva muște pot strica parfumul, puțină nebunie poate cântări mai mult decât multă înțelepciune și cinste. Qohelet recomandă să nu-ți abandonezi locul impulsiv când conducătorul se mânie și descrie o ordine socială răsturnată în care nebunia este ridicată, iar cei potriviți sunt coborâți. Imaginile gropii, zidului și fierului neascuțit arată că acțiunea fără pricepere mărește pericolul și efortul.", source: n },
      { from: 11, to: 20, heading: "Cuvintele nebunului îl consumă, iar conducerea imatură slăbește casa", teaching: "Farmecul nu ajută dacă șarpele a mușcat înainte, iar vorbirea înțeleptului și cea a nebunului produc roade opuse. Nebunul înmulțește cuvintele despre lucruri pe care nu le cunoaște, iar munca fără pricepere îl epuizează. O țară suferă când liderii trăiesc pentru ospăț și plăcere, iar casa se degradează prin lene; finalul avertizează și asupra cuvintelor nechibzuite rostite despre cei aflați în autoritate.", source: n },
    ],
  },
  11: {
    number: 11,
    title: "Acționează în mijlocul incertitudinii și amintește-ți că tinerețea trece",
    summary: "Qohelet folosește imagini ale comerțului, semănatului și vremii pentru a spune că omul nu controlează toate rezultatele și totuși trebuie să lucreze. Finalul cheamă tânărul să se bucure de viață fără să uite responsabilitatea înaintea lui Dumnezeu.",
    units: [
      { from: 1, to: 6, heading: "Generozitatea și munca nu trebuie amânate până când dispare orice risc", teaching: "Pâinea trimisă pe ape, împărțirea către mai mulți și semănatul în momente diferite descriu acțiunea într-o lume în care viitorul nu este cunoscut. Cel care urmărește vântul perfect nu mai seamănă, iar cel care așteaptă norii ideali nu mai seceră. Omul nu cunoaște drumul vântului sau formarea vieții în pântece și nici toate lucrările lui Dumnezeu, dar această limită nu este o scuză pentru pasivitate.", source: n },
      { from: 7, to: 10, heading: "Bucuria tinereții rămâne sub realitatea trecerii timpului și a judecății", teaching: "Lumina este plăcută și viața trebuie primită cu bucurie, chiar dacă omul trebuie să-și amintească și zilele întunericului. Tânărul este chemat să se bucure, dar nu să trăiască fără răspundere: textul amintește că Dumnezeu va aduce viața la judecată. Capitolul se încheie cerând îndepărtarea mâniei și răului, deoarece tinerețea și zorii vieții sunt trecători.", source: n },
    ],
  },
}
