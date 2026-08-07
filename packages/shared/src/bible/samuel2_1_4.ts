import { samuel2Chapter, teaching } from "./samuel2Helpers.js"
import { samuel2Passage } from "./samuel2Text.js"
import { SAMUEL2_STATUSES } from "./samuel2Publication.js"

export const SAMUEL2_1 = samuel2Chapter({
  number: 1,
  title: "2 Samuel 1 — David plânge moartea omului care îl urmărea",
  summary:
    "Un amalecit vine la David cu coroana și brățara lui Saul și pretinde că el l-a omorât. David și oamenii lui jelesc pentru Saul, Ionatan și Israel. Amalecitul este judecat după propria mărturie, iar David compune o cântare de jale în care cinstește binele văzut în Saul și iubirea lui Ionatan.",
  literaryContext:
    "Cartea începe după moartea lui Saul și urmărește domnia lui David. Poonen deschide studiul prin reacția lui David față de moartea vrăjmașului său, prezentând-o ca una dintre trăsăturile omului după inima lui Dumnezeu.",
  historicalContext:
    "Relatarea amalecitului diferă de 1 Samuel 31, unde Saul cade în propria sabie. El pare să aștepte răsplată pentru veste și pentru afirmația că l-a ucis pe regele uns.",
  units: [
    {
      id: "2-samuel-1-1-16",
      ref: "2 Samuel 1:1-16",
      heading: "David nu răsplătește omul care pretinde că l-a ucis pe Saul",
      text: samuel2Passage(1, 1, 16),
      teaching: teaching(
        "Amalecitul îi spune lui David că l-a găsit pe Saul și l-a omorât la cererea lui. Poonen compară afirmația cu relatarea sinuciderii lui Saul din 1 Samuel 31 și o numește minciuna prin care omul spera să obțină favoarea noului conducător.",
        "David nu se bucură. Își rupe hainele, plânge și postește pentru Saul, Ionatan și poporul DOMNULUI.",
        "El îl întreabă pe amalecit cum nu s-a temut să-și întindă mâna împotriva unsului DOMNULUI și îl judecă după mărturia propriei guri. Textul aparține justiției regale din lumea veche; nu dă cititorului dreptul de a aplica pedeapsă privată.",
      ),
      words: [
        {
          original: "מְשִׁיחַ יְהוָה",
          transliteration: "meșiah YHWH",
          language: "ebraica",
          meaning:
            "unsul DOMNULUI. David continuă să recunoască poziția dată cândva lui Saul, deși Saul îl persecutase și pierduse favoarea lui Dumnezeu.",
        },
      ],
      crossRefs: ["1 Samuel 24:6", "1 Samuel 31:4-6"],
      forYourHeart:
        "Nu transforma căderea celui care ți-a făcut rău într-un motiv de sărbătoare sau într-o ocazie de câștig.",
    },
    {
      id: "2-samuel-1-17-27",
      ref: "2 Samuel 1:17-27",
      heading: "Cântarea de jale: David vede și binele din Saul",
      text: samuel2Passage(1, 17, 27),
      teaching: teaching(
        "David compune o cântare pentru Saul și Ionatan și repetă: «Cum au căzut vitejii!» Despre Ionatan vorbește ca despre prietenul iubit, dar îl cinstește sincer și pe Saul.",
        "Poonen subliniază capacitatea lui David de a recunoaște vitejia și binele unui om care își pierduse ungerea și îi urmărise viața.",
        "El leagă atitudinea lui David de porunca lui Iisus de a iubi vrăjmașii, de a binecuvânta și de a nu răspunde răului prin ură.",
      ),
      crossRefs: ["Matei 5:44", "Romani 12:14"],
      forYourHeart:
        "Poți spune adevărul despre răul primit fără să ștergi orice bine din omul care ți-a fost vrăjmaș.",
    },
  ],
  prayer:
    "Doamne, eliberează-ne de bucuria răzbunării și învață-ne să ne iubim vrăjmașii.\n\nDă-ne o inimă care poate plânge căderea altuia și poate recunoaște binele fără să falsifice adevărul. Amin.",
  status: SAMUEL2_STATUSES[1],
})

export const SAMUEL2_2 = samuel2Chapter({
  number: 2,
  title: "2 Samuel 2 — David întreabă pe DOMNUL și așteaptă la Hebron",
  summary:
    "David întreabă dacă trebuie să urce într-o cetate a lui Iuda, iar DOMNUL îl trimite la Hebron. Oamenii lui Iuda îl ung împărat. Abner îl pune pe Iș-Boșet peste restul lui Israel, iar confruntarea dintre cele două tabere duce la moartea lui Asael și la începutul unui război lung.",
  literaryContext:
    "David fusese uns de Samuel cu mulți ani înainte, dar nu apucă împărăția imediat după moartea lui Saul. Poonen folosește capitolele 2 și 5 pentru a arăta deprinderea lui de a cere călăuzire și răbdarea cu care așteaptă timpul lui Dumnezeu.",
  historicalContext:
    "Hebron devine capitala lui David peste Iuda timp de șapte ani și șase luni. Casa lui Saul continuă sub Iș-Boșet, sprijinit de comandantul Abner.",
  units: [
    {
      id: "2-samuel-2-1-7",
      ref: "2 Samuel 2:1-7",
      heading: "«Să mă sui?» — David nu presupune următorul pas",
      text: samuel2Passage(2, 1, 7),
      teaching: teaching(
        "După moartea lui Saul, David întreabă pe DOMNUL dacă trebuie să urce și în ce cetate. Răspunsul îl trimite la Hebron.",
        "Poonen vede aici obiceiul care l-a păzit în multe împrejurări: chiar dacă promisiunea împărăției era cunoscută, David nu presupune singur locul, timpul și strategia.",
        "Oamenii lui Iuda îl ung rege. David nu îi pedepsește pe oamenii din Iabeș-Galaad pentru loialitatea față de Saul, ci îi binecuvântează pentru bunătatea arătată stăpânului lor.",
      ),
      crossRefs: ["1 Samuel 23:2-4", "1 Samuel 30:8"],
      forYourHeart:
        "O promisiune cunoscută nu face inutilă călăuzirea pentru pasul concret de astăzi.",
    },
    {
      id: "2-samuel-2-8-32",
      ref: "2 Samuel 2:8-32",
      heading: "Două case intră într-un război dureros",
      text: samuel2Passage(2, 8, 32),
      teaching: teaching(
        "Abner îl așază pe Iș-Boșet peste Israel, iar taberele se întâlnesc la iazul Gabaonului. Jocul dintre tineri se transformă în luptă și moarte.",
        "Asael îl urmărește pe Abner, refuză avertismentele repetate și este ucis. Ioab și Abișai continuă urmărirea până când Abner întreabă dacă sabia va mânca fără încetare.",
        "Narațiunea nu idealizează războiul civil. Ea arată prețul tranziției și faptul că împlinirea chemării lui David nu trebuia grăbită printr-un conflict produs de ambiția oamenilor.",
      ),
      crossRefs: ["2 Samuel 3:1"],
      forYourHeart:
        "Nu transforma o tranziție sau o dispută de conducere într-un război în care frații se consumă unii pe alții.",
    },
  ],
  prayer:
    "Doamne, învață-ne să cerem călăuzire și să așteptăm timpul Tău.\n\nOprește ambiția și conflictul care îi fac pe frați să se rănească pentru poziții. Amin.",
  status: SAMUEL2_STATUSES[2],
})

export const SAMUEL2_3 = samuel2Chapter({
  number: 3,
  title: "2 Samuel 3 — Casa lui David crește, dar familia și armata lui poartă semințe de durere",
  summary:
    "Războiul dintre case continuă, iar David se întărește. Sunt enumerați fiii născuți din mai multe soții. Abner se rupe de Iș-Boșet și negociază trecerea lui Israel la David. Ioab îl ucide pe Abner pentru sângele lui Asael, iar David îl jelește și își declară nevinovăția.",
  literaryContext:
    "Capitolul arată progresul politic al lui David, dar și slăbiciuni care vor rodi mai târziu: multiplicarea soțiilor și imposibilitatea de a controla violența oamenilor puternici din jurul lui.",
  historicalContext:
    "Căsătoriile regale puteau forma alianțe politice, dar Poonen refuză explicația «așa era atunci» ca justificare morală și amintește exemplele anterioare ale lui Isaac și Moise.",
  units: [
    {
      id: "2-samuel-3-1-5",
      ref: "2 Samuel 3:1-5",
      heading: "David nu întreabă dacă trebuie să-și înmulțească soțiile",
      text: samuel2Passage(3, 1, 5),
      teaching: teaching(
        "Casa lui David se întărește, iar lista fiilor arată că fiecare dintre primii șase are altă mamă.",
        "Poonen contrastează această alegere cu deprinderea lui David de a cere călăuzire în război: aici nu îl auzim întrebând dacă trebuie să ia a doua, a treia sau a patra soție.",
        "Narațiunea descrie poligamia veche, dar nu o oferă drept model. Poonen arată că oameni mai vechi decât David, precum Isaac și Moise, avuseseră câte o singură soție și că lumina Noului Legământ cere fidelitate conjugală.",
      ),
      crossRefs: ["Deuteronom 17:17", "Matei 19:4-6"],
      forYourHeart:
        "Nu presupune că succesul spiritual face sigure domeniile în care ai încetat să ceri călăuzirea lui Dumnezeu.",
    },
    {
      id: "2-samuel-3-6-39",
      ref: "2 Samuel 3:6-39",
      heading: "Abner caută pacea, iar Ioab răspunde prin răzbunare",
      text: samuel2Passage(3, 6, 39),
      teaching: teaching(
        "După ruptura cu Iș-Boșet, Abner vorbește cu bătrânii și vine la David pentru a aduce Israelul sub domnia lui. David îl trimite în pace.",
        "Ioab îl cheamă înapoi și îl omoară pentru sângele lui Asael. David se declară nevinovat, îl jelește public și compune o cântare de jale.",
        "David nu folosește moartea lui Abner pentru a-și consolida imaginea prin calomnie. El numește crima, recunoaște măreția celui căzut și spune că fiii Țeruiei sunt prea puternici pentru el.",
      ),
      crossRefs: ["2 Samuel 2:18-23", "Romani 12:19"],
      forYourHeart:
        "Nu lăsa răzbunarea oamenilor din jurul tău să fie confundată cu voia sau cauza ta.",
    },
  ],
  prayer:
    "Doamne, păzește-ne în domeniile în care succesul ne face neatenți.\n\nDă-ne fidelitate în familie și curajul de a numi răzbunarea chiar când vine de la oamenii noștri puternici. Amin.",
  status: SAMUEL2_STATUSES[3],
})

export const SAMUEL2_4 = samuel2Chapter({
  number: 4,
  title: "2 Samuel 4 — David refuză o împărăție adusă prin crimă",
  summary:
    "După moartea lui Abner, Iș-Boșet slăbește. Recab și Baana îl ucid în pat și îi aduc capul lui David, prezentând fapta ca răzbunare dată de DOMNUL. David le amintește soarta amalecitului și îi judecă pentru uciderea unui om nevinovat în casa lui.",
  literaryContext:
    "Capitolul repetă testul din 2 Samuel 1: oameni care ucid un rival al lui David așteaptă răsplată. David refuză din nou să primească împărăția prin sângele vărsat de oportuniști.",
  historicalContext:
    "Iș-Boșet rămăsese fără principalul său sprijin politic după moartea lui Abner. Ucigașii săi erau căpetenii din propria structură militară.",
  units: [
    {
      id: "2-samuel-4-1-12",
      ref: "2 Samuel 4:1-12",
      heading: "«DOMNUL m-a izbăvit din toate primejdiile»",
      text: samuel2Passage(4, 1, 12),
      teaching: teaching(
        "Recab și Baana îl omoară pe Iș-Boșet când acesta se odihnește și îi aduc capul lui David, folosind numele DOMNULUI pentru a prezenta crima drept răzbunare divină.",
        "David nu acceptă interpretarea lor. El mărturisește că DOMNUL Însuși l-a izbăvit din toate primejdiile și nu are nevoie ca ucigașii să-i construiască tronul.",
        "Poonen subliniază în carte răbdarea lui David: el nu apucă poziția, ci așteaptă ca Dumnezeu să-i dea ceea ce i-a promis la timpul potrivit.",
      ),
      crossRefs: ["2 Samuel 1:14-16", "Psalmul 37:5-7"],
      forYourHeart:
        "Refuză avantajul adus prin păcatul altuia, chiar când pare să grăbească o promisiune bună.",
    },
  ],
  prayer:
    "Doamne, învață-ne să așteptăm ce ai pregătit și să refuzăm câștigul adus prin nedreptate.\n\nFă-ne să spunem cu David că Tu ne izbăvești, nu manevrele oamenilor. Amin.",
  status: SAMUEL2_STATUSES[4],
})
