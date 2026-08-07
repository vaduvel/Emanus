import { assertCompleteOverlay, type ExplainedBookOverlay } from "../explainedOverlay.js"

const transcript = ".research/poonen-through-the-bible-OT/transcripts/kings-2.txt"
const p = (anchor: string) => ({ kind: "poonen" as const, transcript, anchor })
const n = { kind: "biblia-emanus" as const, note: "rezumat narativ fără doctrină adăugată" as const }

const IMPARATI2_OVERLAY: ExplainedBookOverlay = {
  bookId: "2-imparati",
  bibleEmanusBookId: "2KI",
  name: "2 Împărați",
  testament: "vt",
  order: 12,
  transcript,
  status: "in_review",
  chapters: [
    {
      number: 1,
      title: "Ahazia caută răspuns la Baal-Zebub, iar Ilie rostește cuvântul DOMNULUI",
      summary: "Ahazia caută verdictul unui idol în loc să caute pe Dumnezeul lui Israel. Ilie îl confruntă, iar episodul focului coborât peste cetele trimise de împărat încheie aproape slujirea lui.",
      units: [
        {
          from: 1, to: 18,
          heading: "Este Dumnezeu în Israel?",
          teaching: "Poonen pune accentul pe contrastul dintre împăratul care caută răspuns la un idol și prorocul care stă sub cuvântul DOMNULUI. El leagă apoi focul chemat de Ilie de episodul din Evanghelii în care Iacov și Ioan vor să repete gestul, iar Iisus îi mustră. Aplicația lui este explicită: narațiunea arată cadrul vechiului legământ; ucenicul lui Hristos nu primește de aici permisiunea de a chema judecată violentă peste cei care îl resping.",
          source: p("chapter 1 ... fire come down ... Jesus rebuked them"),
          forYourHeart: "Nu transforma un episod de judecată din vechiul legământ într-o justificare pentru răzbunare. Întrebarea de bază rămâne: când ai nevoie de răspuns, către cine te îndrepți?",
        },
      ],
    },
    {
      number: 2,
      title: "Ilie este ridicat, iar Elisei cere o îndoită măsură",
      summary: "Elisei refuză să se oprească la Ghilgal, Betel sau Ierihon. Îl urmează pe Ilie până dincolo de Iordan și cere nu poziția lui, ci o îndoită măsură din duhul lui.",
      units: [
        {
          from: 1, to: 18,
          heading: "Nu titlul, ci ungerea",
          teaching: "Poonen dezvoltă insistent perseverența lui Elisei. De trei ori i se oferă posibilitatea să rămână în urmă, dar el continuă. Când Ilie îl întreabă ce dorește, Elisei nu cere funcția de succesor, salariu sau onoare, ci o îndoită măsură din duhul care era peste Ilie. Pentru Poonen, aceasta devine imaginea omului care nu se mulțumește cu experiențe, vizibilitate sau lucrare, ci caută lucrarea Duhului și asemănarea cu Hristos.",
          source: p("Gilgal ... Bethel ... Jericho ... double portion of your spirit"),
          words: [
            {
              original: "פִּי־שְׁנַיִם",
              transliteration: "pi-șenayim",
              language: "ebraica",
              meaning: "literal «parte dublă»; expresie folosită și pentru partea întâiului născut. În cererea lui Elisei subliniază moștenirea spirituală dorită, nu o formulă magică de putere.",
              verseRef: "2 Împărați 2:9",
              lexicalSource: "WLC-OSHB",
            },
          ],
          forYourHeart: "Ce cauți de fapt de la Dumnezeu: poziție și recunoaștere sau o viață tot mai supusă Duhului Lui?",
        },
        {
          from: 19, to: 25,
          heading: "Primele semne ale slujirii lui Elisei",
          teaching: "După trecerea Iordanului, autoritatea primită devine vizibilă fără ca Elisei să fie nevoit să o proclame. Poonen observă că adevărata ungere se face cunoscută prin viață și slujire, nu prin revendicări. Restul capitolului relatează vindecarea apei și judecata de la Betel; acestea rămân în cadrul narațiunii și nu sunt transformate într-o doctrină despre reacția la batjocură.",
          source: p("the spirit of Elijah ... rests upon Elisha ... life and ministry will make it manifest"),
        },
      ],
    },
    {
      number: 3,
      title: "Elisei, omul care turnase apă pe mâinile lui Ilie",
      summary: "În războiul împotriva Moabului, împărații caută un cuvânt de la DOMNUL. Elisei este identificat nu printr-un titlu impresionant, ci drept omul care îl slujise pe Ilie în lucrurile mici.",
      units: [
        {
          from: 1, to: 27,
          heading: "Credincioșie în slujirea mică",
          teaching: "Poonen se oprește la descrierea lui Elisei ca omul care «turna apă pe mâinile lui Ilie». El vede aici o regulă de formare: Dumnezeu încredințează responsabilități mai mari oamenilor care au fost credincioși în sarcini umile. Elisei nu a început prin a cere o platformă, ci prin slujire concretă. Narațiunea militară a capitolului este păstrată ca atare; aplicația centrală preluată din transcript este disponibilitatea de a sluji fără statut.",
          source: p("Elisha ... used to pour water on the hands of Elijah"),
          forYourHeart: "Nu disprețui sarcina pe care nimeni nu o aplaudă. Felul în care o faci spune mult despre felul în care vei purta o responsabilitate mai mare.",
        },
      ],
    },
    {
      number: 4,
      title: "Uleiul văduvei, sunamita și Dumnezeul care poartă grijă",
      summary: "Elisei slujește unor oameni aflați în nevoi foarte diferite: o văduvă îndatorată, o femeie din Sunem și copilul ei, apoi comunitatea fiilor prorocilor.",
      units: [
        {
          from: 1, to: 7,
          heading: "Vase goale și uleiul care nu se oprește până nu mai există vas",
          teaching: "Poonen folosește episodul văduvei pentru a sublinia dependența și disponibilitatea. Femeia aduce vase goale, iar uleiul curge cât timp există vase care pot primi. Accentul lui nu este pe o tehnică de prosperitate, ci pe Dumnezeu care poartă grijă și pe spațiul pe care omul îl pune la dispoziție.",
          source: p("widow ... oil ... vessels"),
          forYourHeart: "Nu transforma minunea într-o promisiune financiară automată. Adu înaintea lui Dumnezeu nevoia reală și ceea ce ai la dispoziție.",
        },
        {
          from: 8, to: 44,
          heading: "Credință în mijlocul darului, pierderii și restaurării",
          teaching: "Povestea sunamitei arată un dar primit, o pierdere devastatoare și căutarea prorocului. Poonen folosește minunile lui Elisei pentru a arăta lucrarea puterii lui Dumnezeu și tema vieții care vine acolo unde omul nu o poate produce. Textul nu oferă o garanție că fiecare copil mort va fi înviat în această viață; este un act particular al lui Dumnezeu în această narațiune.",
          source: p("Elisha ... miracles ... raised ... from the dead"),
        },
      ],
    },
    {
      number: 5,
      title: "Naaman se smerește, iar Ghehazi aleargă după bani",
      summary: "Naaman vine cu statut, dar trebuie să primească o poruncă simplă. După vindecare, Elisei refuză darul, însă Ghehazi folosește numele slujitorului lui Dumnezeu pentru câștig personal.",
      units: [
        {
          from: 1, to: 19,
          heading: "Drumul vindecării trece prin smerenie",
          teaching: "Poonen scoate în evidență mândria lui Naaman și simplitatea poruncii primite. Naaman se aștepta la un gest spectaculos, dar trebuie să renunțe la propriul scenariu și să se coboare în Iordan. Puterea nu era în apa râului, ci în Dumnezeu și în ascultarea de cuvântul dat.",
          source: p("Naaman ... Jordan ... humble"),
          forYourHeart: "Uneori obstacolul nu este lipsa unui răspuns, ci faptul că răspunsul nu seamănă cu felul în care ai decis că Dumnezeu trebuie să lucreze.",
        },
        {
          from: 20, to: 27,
          heading: "Slujirea nu este cale de îmbogățire",
          teaching: "Poonen folosește puternic cazul lui Ghehazi împotriva folosirii slujirii pentru bani și a minciunii prin care un slujitor încearcă să impresioneze sau să câștige de la oameni bogați. Darul lui Dumnezeu nu trebuie transformat în produs, iar apropierea de un om al lui Dumnezeu nu protejează o inimă care iubește câștigul.",
          source: p("Gehazi ... money ... lies ... rich people"),
          forYourHeart: "Păzește diferența dintre a sluji oamenii și a-i folosi. Banii pot descoperi foarte repede ce urmărește de fapt inima.",
        },
      ],
    },
    {
      number: 6,
      title: "Fierul plutește și prorocul vede unde se pregătește atacul",
      summary: "Elisei intervine într-o nevoie mică a fiilor prorocilor și apoi devine, prin descoperirea lui Dumnezeu, omul care avertizează Israelul despre mișcările armatei siriene.",
      units: [
        {
          from: 1, to: 7,
          heading: "Dumnezeu nu disprețuiește pierderea mică",
          teaching: "Poonen menționează fierul toporului care plutește ca o nouă imagine a puterii lui Dumnezeu asupra unei situații omenești imposibile. Împrumutul pierdut conta pentru omul care îl folosise; narațiunea arată că slujirea lui Elisei nu era rezervată numai crizelor naționale.",
          source: p("axe ... fell into the river ... iron begins to float"),
        },
        {
          from: 8, to: 23,
          heading: "Prorocia avertizează înainte ca vrăjmașul să lovească",
          teaching: "Poonen numește această scenă un exemplu de prorocie adevărată: Dumnezeu îi descoperă lui Elisei unde se pregătește atacul, iar el avertizează poporul. Aplicația lui pentru biserică este că slujirea profetică sănătoasă pregătește oamenii pentru ispite și primejdii, nu îi impresionează cu informații misterioase. Mai târziu, Elisei refuză uciderea celor capturați și cere să fie hrăniți.",
          source: p("true prophecy ... warning people about where the enemy is going to come"),
          forYourHeart: "Un cuvânt care vine de la Dumnezeu te pregătește pentru ascultare și vigilență, nu te face dependent de spectacolul celui care vorbește.",
        },
        {
          from: 24, to: 33,
          heading: "Asediul și foametea din Samaria",
          teaching: "Ultima parte descrie prăbușirea produsă de asediu și deschide direct scena din capitolul 7. Nu este transformată într-o afirmație că orice foamete are o singură cauză spirituală; textul descrie o criză istorică precisă.",
          source: n,
        },
      ],
    },
    {
      number: 7,
      title: "Patru leproși găsesc hrană și nu păstrează vestea pentru ei",
      summary: "DOMNUL golește tabăra siriană, iar patru oameni excluși social găsesc mai întâi belșugul. Ei își dau seama că nu este drept să tacă și duc vestea cetății flămânde.",
      units: [
        {
          from: 1, to: 20,
          heading: "«Ziua aceasta este o zi de veste bună»",
          teaching: "Poonen folosește explicit cei patru leproși ca imagine pentru evanghelizare: oameni care nu au produs hrana și nu au câștigat victoria găsesc ceea ce Dumnezeu a pregătit și își dau seama că nu pot păstra vestea numai pentru ei. Accentul este pe har primit și împărtășit, nu pe superioritatea mesagerului.",
          source: p("four lepers ... this day is a day of good news ... we are keeping silent"),
          forYourHeart: "Vestea bună nu devine proprietatea celui care a găsit-o primul. Ce ai primit prin har este de spus și celui care încă flămânzește.",
        },
      ],
    },
    {
      number: 8,
      title: "Sunamita primește înapoi ce pierduse, iar Hazael ajunge împărat",
      summary: "Capitolul leagă restaurarea proprietății sunamitei de schimbările politice din Siria și Iuda. Elisei plânge când vede răul pe care Hazael îl va face Israelului.",
      units: [
        {
          from: 1, to: 29,
          heading: "Restaurare personală și durerea profetului înaintea violenței viitoare",
          teaching: "Transcriptul nu dezvoltă separat capitolul 8. Overlay-ul păstrează aici numai firul narațiunii: Dumnezeu folosește mărturia despre lucrarea lui Elisei pentru restaurarea sunamitei, iar apoi profetul privește cu durere răul care va veni prin Hazael. Nu se adaugă o doctrină nouă peste această relatare.",
          source: n,
        },
      ],
    },
    {
      number: 9,
      title: "Iehu este uns, iar casa lui Ahab și Izabela ajung la judecată",
      summary: "Iehu este trimis împotriva casei lui Ahab. Ioram și Ahazia mor, iar Izabela este aruncată de la fereastră, împlinindu-se cuvântul rostit prin Ilie.",
      units: [
        {
          from: 1, to: 37,
          heading: "Puterea care îl folosise pe Ahab ajunge la capăt",
          teaching: "Poonen amintește moartea Izabelei și o folosește ca avertisment împotriva controlului spiritual exercitat din culise asupra unui lider. Ideea utilă este despre manipulare și control, nu despre a transforma numele «Izabela» într-o etichetă pentru femei puternice sau persoane cu care nu suntem de acord. Narațiunea este una de judecată a casei lui Ahab și nu autorizează eliminarea violentă a adversarilor în biserică.",
          source: p("chapter 9 ... death of Jezebel ... controlled Ahab"),
          forYourHeart: "Conducerea trebuie să poată fi cercetată în lumină. Nu lăsa relația, frica sau influența din culise să înlocuiască adevărul și răspunderea personală.",
        },
      ],
    },
    {
      number: 10,
      title: "Iehu nimicește cultul lui Baal, dar nu părăsește vițeii lui Ieroboam",
      summary: "Iehu execută judecata asupra casei lui Ahab și distruge centrul cultului lui Baal, dar continuă păcatul religios al lui Ieroboam.",
      units: [
        {
          from: 1, to: 36,
          heading: "Zel fără ascultare deplină",
          teaching: "Capitolul arată un om care poate fi foarte hotărât împotriva unei forme de idolatrie și totuși păstrează alta. Transcriptul nu dezvoltă separat toate actele lui Iehu; explicația rămâne la contrastul textului dintre misiunea împlinită împotriva casei lui Ahab și refuzul de a se depărta de vițeii lui Ieroboam.",
          source: n,
          forYourHeart: "Este mai ușor să vezi idolul altuia decât pe cel care îți protejează propriul sistem. Ascultarea selectivă nu este ascultare întreagă.",
        },
      ],
    },
    {
      number: 11,
      title: "Atalia încearcă să nimicească sămânța regală, iar Ioas este păstrat",
      summary: "În mijlocul violenței din casa regală, Ioas este ascuns și păstrat. După șase ani este adus înaintea poporului, iar Atalia este îndepărtată.",
      units: [
        {
          from: 1, to: 21,
          heading: "O viață păstrată în ascuns",
          teaching: "Transcriptul nu oferă o dezvoltare separată pentru capitolul 11. Narațiunea este păstrată în termenii textului: o încercare de a șterge linia regală eșuează pentru că un copil este ascuns și protejat, iar mai târziu legământul și ordinea publică sunt restaurate.",
          source: n,
        },
      ],
    },
    {
      number: 12,
      title: "Ioas repară Casa DOMNULUI",
      summary: "Ioas urmărește repararea templului și schimbă sistemul de administrare când lucrarea nu înaintează. Banii destinați reparațiilor sunt apoi gestionați direct pentru lucrare.",
      units: [
        {
          from: 1, to: 21,
          heading: "Responsabilitate și administrare în lucrarea Casei",
          teaching: "Poonen nu dezvoltă separat capitolul. Textul însuși arată că intenția bună nu este suficientă: când sistemul inițial nu produce repararea templului, Ioas cere socoteală și schimbă procesul. Explicația nu trece dincolo de acest fir administrativ al narațiunii.",
          source: n,
        },
      ],
    },
    {
      number: 13,
      title: "Ultimele zile ale lui Elisei și săgețile unei biruințe neterminate",
      summary: "Elisei se îmbolnăvește și moare. Înainte de moarte, Ioas primește un semn al izbăvirii, dar lovește pământul numai de trei ori. Chiar după moartea prorocului, un mort revine la viață când atinge oasele lui.",
      units: [
        {
          from: 1, to: 25,
          heading: "Slujirea se încheie, Dumnezeul care a lucrat prin slujitor rămâne",
          teaching: "Poonen folosește viața lui Elisei ca exemplu al omului care a căutat o măsură mai mare din lucrarea Duhului și observă că narațiunea îi atribuie minuni chiar până după moarte. Capitolul nu este folosit pentru venerarea relicvelor; accentul transcriptului este pe Dumnezeu care a lucrat printr-un slujitor perseverent, nu pe o putere autonomă a oaselor.",
          source: p("Elisha ... double the number of miracles ... one after he died"),
        },
      ],
    },
    {
      number: 14,
      title: "Amația câștigă o luptă și apoi își supraestimează puterea",
      summary: "Amația începe cu măsuri de dreptate, învinge Edomul, apoi provoacă Israelul și este înfrânt. Ieroboam al doilea extinde din nou hotarele Israelului.",
      units: [
        {
          from: 1, to: 29,
          heading: "O biruință nu face omul invincibil",
          teaching: "Transcriptul nu se oprește separat la Amația. Rezumatul rămâne narativ: o victorie reală este urmată de o provocare nechibzuită și de înfrângere. Nu se construiește o doctrină suplimentară din acest episod.",
          source: n,
        },
      ],
    },
    {
      number: 15,
      title: "Regi care se succed, iar instabilitatea crește",
      summary: "În Iuda și Israel se succed mai mulți regi. În nord, conspirațiile și asasinatele devin tot mai frecvente, iar Asiria începe să apese direct asupra țării.",
      units: [
        {
          from: 1, to: 38,
          heading: "Păcatul repetat devine structură politică",
          teaching: "Poonen prezintă 2 Împărați ca o carte din care trebuie învățat din greșelile liderilor. Capitolul 15 oferă exact această acumulare: regi care repetă păcatul, lovituri de palat și presiune străină. Nu fiecare schimbare de guvern este interpretată spiritual; aici textul evaluează explicit regii prin raportarea lor la DOMNUL.",
          source: p("learn from the mistakes of others ... kings ... good points ... weak points"),
        },
      ],
    },
    {
      number: 16,
      title: "Ahaz copiază altarul Damascului și își trece fiul prin foc",
      summary: "Ahaz caută ajutorul Asiriei, adoptă modelul altarului văzut la Damasc și introduce practici idolate, inclusiv sacrificarea copilului său.",
      units: [
        {
          from: 1, to: 20,
          heading: "Un rege poate remodela închinarea după ceea ce admiră în lume",
          teaching: "Poonen îl numește pe Ahaz un rege foarte rău și amintește explicit sacrificarea unuia dintre copiii lui. Fiul lui, Ezechia, va alege alt drum. Narațiunea nu este folosită pentru a învinovăți copiii pentru păcatele părinților; dimpotrivă, transcriptul subliniază că Ezechia a putut fi diferit de tatăl său.",
          source: p("Ahaz ... sacrificed one of his own children ... Hezekiah grew up different"),
          forYourHeart: "Moștenirea familiei te influențează, dar nu te obligă să repeți răul. Frica de Dumnezeu poate începe o direcție nouă.",
        },
      ],
    },
    {
      number: 17,
      title: "Samaria cade: «se temeau de DOMNUL și slujeau dumnezeilor lor»",
      summary: "Regatul de nord este dus în robie după o istorie lungă de idolatrie și refuz al avertismentelor. Populațiile așezate ulterior în țară combină o formă de teamă de DOMNUL cu slujirea propriilor dumnezei.",
      units: [
        {
          from: 1, to: 41,
          heading: "Respect religios și idoli păstrați în același timp",
          teaching: "Poonen se oprește la formula din capitol: oamenii «se temeau de DOMNUL și slujeau dumnezeilor lor». Pentru el aceasta descrie religia amestecată: respect exterior pentru Dumnezeu, dar viața reală rămâne condusă de bani, poziție, plăcere sau alți idoli. Căderea Samariei este prezentată în text ca rezultatul unui drum lung de refuz al prorocilor și al legământului.",
          source: p("chapter 17 ... feared the Lord and served their own gods"),
          forYourHeart: "Întrebarea nu este doar dacă Îl respecți pe Dumnezeu, ci cine primește în practică timpul, ascultarea, încrederea și sacrificiul tău.",
        },
      ],
    },
    {
      number: 18,
      title: "Ezechia sfărâmă chiar și șarpele de aramă care devenise idol",
      summary: "Ezechia curăță închinarea și distruge șarpele de aramă pe care israeliții ajunseseră să-l tămâieze. Mai târziu, Asiria invadează Iuda și încearcă să distrugă încrederea poporului în DOMNUL.",
      units: [
        {
          from: 1, to: 8,
          heading: "Un obiect folosit cândva de Dumnezeu poate deveni idol",
          teaching: "Poonen subliniază că șarpele de aramă avusese o origine legitimă și fusese folosit de Dumnezeu în pustiu, dar asta nu îl făcea vrednic de închinare. Ezechia primește lumină să distrugă ceea ce generațiile anterioare toleraseră. Aplicația este despre smerenie: un om mai puțin cunoscut poate vedea un lucru pe care un slujitor mare din trecut nu l-a văzut.",
          source: p("Hezekiah ... bronze serpent ... finally burnt it down ... good for us to be humble"),
          words: [
            {
              original: "נְחֻשְׁתָּן",
              transliteration: "Nehushtan",
              language: "ebraica",
              meaning: "numele dat șarpelui de aramă; joc lexical legat de «aramă/bronze». În context, Ezechia îl reduce de la obiect venerat la ceea ce este: un obiect de aramă.",
              verseRef: "2 Împărați 18:4",
              lexicalSource: "WLC-OSHB",
            },
          ],
          forYourHeart: "Nu venera instrumentul doar pentru că Dumnezeu l-a folosit cândva. Darul, locul, metoda sau omul nu devin Dumnezeu.",
        },
        {
          from: 9, to: 37,
          heading: "Vocea Asiriei încearcă să transforme frica în necredință",
          teaching: "Restul capitolului pregătește rugăciunea din capitolul 19. Rabșache vorbește public pentru a rupe încrederea poporului și a-l convinge că DOMNUL nu poate izbăvi. Poonen urmărește răspunsul lui Ezechia în capitolul următor, nu o tehnică de negociere politică pentru toate situațiile.",
          source: n,
        },
      ],
    },
    {
      number: 19,
      title: "Ezechia întinde scrisoarea înaintea DOMNULUI",
      summary: "În fața amenințării asiriene, Ezechia caută pe DOMNUL și se roagă. Isaia îi aduce răspunsul, iar tabăra asiriană este lovită într-o singură noapte.",
      units: [
        {
          from: 1, to: 37,
          heading: "Primejdia este adusă înaintea lui Dumnezeu",
          teaching: "Poonen se oprește la rugăciunea lui Ezechia și la izbăvirea printr-un singur înger. Accentul lui este pe puterea lui Dumnezeu și pe rugăciunea unui rege care nu poate rezolva militar criza. Narațiunea despre moartea armatei asiriene este o judecată istorică și nu oferă creștinilor o promisiune de distrugere fizică a adversarilor.",
          source: p("chapter 19 ... Hezekiah prays ... one angel ... destroyed a hundred and eighty five thousand"),
          forYourHeart: "Când problema este mai mare decât puterea ta, pune-o înaintea lui Dumnezeu fără să transformi rugăciunea într-o chemare la violență împotriva oamenilor.",
        },
      ],
    },
    {
      number: 20,
      title: "Ezechia cere ani în plus și își arată comorile Babilonului",
      summary: "Ezechia se îmbolnăvește, se roagă și primește încă cincisprezece ani. Mai târziu îi primește pe solii Babilonului și le arată toate comorile sale; Isaia vestește viitorul exil.",
      units: [
        {
          from: 1, to: 11,
          heading: "Când Dumnezeu spune că timpul s-a încheiat",
          teaching: "Poonen folosește episodul ca avertisment personal: Ezechia nu vrea să moară și cere mai mult timp. El observă că Manase se va naște în perioada adăugată și va deveni un rege foarte rău. Aplicația lui este să nu ne agățăm de această viață atunci când Dumnezeu hotărăște sfârșitul. Aceasta nu înseamnă că rugăciunea bolnavului este greșită sau că medicina trebuie refuzată; transcriptul vorbește despre disponibilitatea de a pleca atunci când Dumnezeu spune clar că vremea a venit.",
          source: p("set your house in order ... add 15 years ... Manasseh ... born in those extra 15 years"),
          forYourHeart: "Poți cere vindecare și totuși să-I spui lui Dumnezeu: viața mea Îți aparține și nu vreau să mă țin de ea împotriva voii Tale.",
        },
        {
          from: 12, to: 21,
          heading: "Oaspeții Babilonului și mândria de a arăta tot ce ai",
          teaching: "Textul mută atenția de la boală la felul în care Ezechia își arată comorile. Isaia leagă această expunere de viitorul Babilonului. Transcriptul nu dezvoltă separat scena, așa că overlay-ul rămâne la avertismentul narativ despre ceea ce regele a ales să pună înaintea vizitatorilor.",
          source: n,
        },
      ],
    },
    {
      number: 21,
      title: "Manase duce Iuda mai adânc în idolatrie",
      summary: "Manase inversează reformele lui Ezechia, ridică altare idolatre, practică ocultismul și varsă sânge nevinovat. Amon continuă același drum.",
      units: [
        {
          from: 1, to: 26,
          heading: "Un fiu nu moștenește automat credința tatălui",
          teaching: "Poonen îl numește pe Manase unul dintre cei mai răi regi și leagă nașterea lui de anii suplimentari ai lui Ezechia. 2 Împărați consemnează răul lui fără relatarea pocăinței târzii pe care o va păstra 2 Cronici. Aici accentul este avertismentul: o generație poate inversa repede reforma generației anterioare dacă nu Îl cunoaște ea însăși pe Dumnezeu.",
          source: p("Manasseh ... worst king ... practiced witchcraft ... more evil"),
          forYourHeart: "O casă credincioasă nu poate trăi credința în locul copilului. Fiecare generație trebuie să-L caute pe Dumnezeu pentru ea însăși.",
        },
      ],
    },
    {
      number: 22,
      title: "Cartea Legii este găsită, iar Iosia se smerește",
      summary: "În timpul reparării templului este găsită Cartea Legii. Iosia aude cuvintele ei, își sfâșie hainele și caută pe DOMNUL prin prorocița Hulda.",
      units: [
        {
          from: 1, to: 20,
          heading: "Cuvântul redescoperit produce smerire, nu mândrie religioasă",
          teaching: "Transcriptul nu dezvoltă capitolul 22 în detaliu. Textul arată însă reacția directă a lui Iosia: când descoperă distanța dintre viața poporului și Lege, nu se justifică, ci se smerește și caută să înțeleagă cuvântul DOMNULUI.",
          source: n,
        },
      ],
    },
    {
      number: 23,
      title: "Iosia curăță țara și ține Paștele, dar judecata anunțată rămâne",
      summary: "Iosia citește legământul înaintea poporului, îndepărtează obiectele idolatre, dărâmă altarele și ține Paștele. Totuși consecințele acumulate ale răului lui Manase nu sunt șterse din istoria regatului.",
      units: [
        {
          from: 1, to: 30,
          heading: "Reforma merge dincolo de emoție și schimbă practicile",
          teaching: "Capitolul arată o reformă concretă: Cuvântul este citit, legământul reînnoit, idolii îndepărtați și Paștele restaurat. Overlay-ul nu adaugă o teorie despre reformă dincolo de aceste acțiuni ale textului. Faptul că judecata istorică nu este anulată arată și că unele consecințe colective pot continua după întoarcerea unui lider.",
          source: n,
        },
        {
          from: 31, to: 37,
          heading: "După Iosia, drumul spre cădere se reia",
          teaching: "Succesorii lui Iosia se întorc rapid la rău. Aceasta pregătește ultimele două capitole și confirmă tema lui Poonen: Iuda nu a învățat suficient nici din propria istorie, nici din căderea regatului de nord.",
          source: p("southern kingdom did not learn any lessons from the failure of the northern kingdom"),
        },
      ],
    },
    {
      number: 24,
      title: "Babilonul înlocuiește Asiria, iar Ierusalimul intră sub jug",
      summary: "Babilonul devine noua putere dominantă. Ioiachim se răzvrătește, apoi Ioiachin și elitele Ierusalimului sunt duși în exil, iar Zedechia este pus împărat.",
      units: [
        {
          from: 1, to: 20,
          heading: "Iuda ajunge pe drumul pe care îl văzuse deja în Israel",
          teaching: "Poonen rezumă finalul cărții prin schimbarea imperiilor: după Asiria vine Babilonul, iar Iuda este dus pe același drum al exilului pe care îl văzuse deja la regatul de nord. Pentru el aceasta întărește lecția de început a cărții: omul înțelept învață din greșelile altora înainte să fie nevoit să le repete.",
          source: p("Babylon ... came against Judah ... southern kingdom did not learn"),
          forYourHeart: "Istoria altuia poate deveni avertismentul care te scutește de propria prăbușire, dacă accepți să înveți înainte de consecință.",
        },
      ],
    },
    {
      number: 25,
      title: "Ierusalimul arde și poporul merge în Babilon",
      summary: "Zidurile sunt străpunse, templul și casele Ierusalimului sunt arse, conducerea este judecată și o mare parte a poporului este dusă în exil. Finalul păstrează totuși o mică deschidere prin ridicarea lui Ioiachin din închisoare.",
      units: [
        {
          from: 1, to: 30,
          heading: "Cartea începe cu Ilie ridicat la cer și se încheie cu poporul dus în Babilon",
          teaching: "Poonen încheie seria printr-un contrast memorabil: începutul cărții îl arată pe Ilie ridicat la cer, iar finalul arată poporul lui Dumnezeu dus în Babilon. El formulează alegerea ca avertisment spiritual: apropierea de Dumnezeu și ascultarea duc într-o direcție, iar idolatria persistentă duce în robie. Narațiunea istorică a exilului nu este redusă la o formulă prin care orice necaz personal ar fi declarat pedeapsă directă.",
          source: p("book of Kings begin with Elijah being taken up to heaven ... ends with the people of God being taken to Babylon"),
          forYourHeart: "Nu aștepta capătul drumului ca să întrebi unde duce. Scriptura îți dă și istoria altora ca să poți schimba direcția astăzi.",
        },
      ],
    },
  ],
}

export const IMPARATI2_EXPLAINED = assertCompleteOverlay(IMPARATI2_OVERLAY, 25)
