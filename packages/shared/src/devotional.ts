// Devoțional de un an (docs/27 §2).
//
// Conținut ORIGINAL Emanus. Nu se rescriu devoționale existente de pe web:
// un devoțional rescris rămâne operă derivată (docs/27 §1.2). Versetele sunt
// din traducerea Cornilescu (domeniu public).
//
// Regula manei (Exod 16, docs/27 §4.5): ziua ta, nu ziua din calendar. Zilele
// lipsă nu se acumulează ca datorie și nu se recuperează. `dayIndex` avansează
// doar când omul deschide o zi.
import type { AgeCategoryId, GrowthAxisId } from "./domain.js"

export const DEVOTIONAL_TRACK_ID = "anul-1"

export interface DevotionalAgeVariant {
  meditation: string
  question: string
  prayer: string
  step: string
}

export interface DevotionalDay {
  id: string
  dayNumber: number
  theme: string
  axis: GrowthAxisId
  verseRef: string
  verseText: string
  meditation: string
  question: string
  prayer: string
  step: string
  ageVariants?: Partial<Record<AgeCategoryId, DevotionalAgeVariant>>
}

export interface DevotionalProgress {
  dayIndex: number
  openedDays: number[]
  lastOpenedAt: string | null
}

/** Structura anului: 2 luni pe fiecare axă, identitatea prima (docs/27 §2.4). */
export const DEVOTIONAL_MONTHS: { month: number; axis: GrowthAxisId; theme: string }[] = [
  { month: 1, axis: "identity", theme: "Din orfan în fiu" },
  { month: 2, axis: "identity", theme: "Cine ești, pentru că El a făcut ce a făcut" },
  { month: 3, axis: "emotional_peace", theme: "Frica și grija" },
  { month: 4, axis: "emotional_peace", theme: "Odihna" },
  { month: 5, axis: "relationships", theme: "Iertarea" },
  { month: 6, axis: "relationships", theme: "Ai tăi și singurătatea" },
  { month: 7, axis: "living_faith", theme: "Rugăciunea" },
  { month: 8, axis: "living_faith", theme: "Când Dumnezeu tace" },
  { month: 9, axis: "character", theme: "Ce crește pe nevăzut" },
  { month: 10, axis: "character", theme: "Lucrurile mici" },
  { month: 11, axis: "freedom", theme: "Rușinea" },
  { month: 12, axis: "freedom", theme: "Har la cădere" },
]

const LUNA_1 = "Din orfan în fiu"

/**
 * Luna 1 completă (31 de zile). Restul lunilor se adaugă pe rând, ca la cursuri
 * (D-004): nu se publică zile fără verset-ancoră.
 */
export const DEVOTIONAL_DAYS: DevotionalDay[] = [
  {
    id: "dev_001",
    dayNumber: 1,
    theme: LUNA_1,
    axis: "identity",
    verseRef: "Ioan 1:12",
    verseText: "Dar tuturor celor ce L-au primit le-a dat dreptul să se facă copii ai lui Dumnezeu.",
    meditation:
      "Observă ce nu spune versetul. Nu spune că ai devenit un om mai bun, nici că ai primit o listă de reguli. Spune că ai primit un drept — dreptul de a fi copil. Dreptul nu se câștigă cu purtarea, se primește cu numele. Astăzi începi un drum de un an, și primul lucru pe care trebuie să-l știi e că nu pornești ca să ajungi fiu. Pornești pentru că ești.",
    question: "Unde te-ai purtat în ultima vreme ca un angajat al lui Dumnezeu, nu ca un copil al Lui?",
    prayer:
      "Doamne, azi nu vin să Îți dovedesc nimic. Vin ca un copil. Învață-mă, în anul care începe, cine sunt pentru Tine. Amin.",
    step: "Spune cu voce tare, o dată, azi: „Sunt copilul lui Dumnezeu.” Chiar dacă nu simți nimic.",
  },
  {
    id: "dev_002",
    dayNumber: 2,
    theme: LUNA_1,
    axis: "identity",
    verseRef: "Galateni 4:7",
    verseText: "Așa că nu mai ești rob, ci fiu; și dacă ești fiu, ești și moștenitor.",
    meditation:
      "Robul și fiul pot face aceeași muncă în aceeași casă. Diferența nu e în ce fac, e în ce se întâmplă dacă greșesc. Robul se teme că va fi dat afară. Fiul știe că rămâne. Dacă te rogi cu frica de a fi dat afară, te rogi ca un rob într-o casă unde ești fiu.",
    question: "Ce ai face azi altfel, dacă ai fi absolut sigur că nu poți fi dat afară?",
    prayer:
      "Doamne, scoate din mine frica robului. Vreau să Îți vorbesc ca un fiu, nu ca un om care își apără locul. Amin.",
    step: "Fă azi un lucru bun pe care nu îl va vedea nimeni. Nu ca să câștigi ceva, ci pentru că nu ai nevoie să câștigi.",
  },
  {
    id: "dev_003",
    dayNumber: 3,
    theme: LUNA_1,
    axis: "identity",
    verseRef: "Romani 8:15",
    verseText:
      "Și voi n-ați primit un duh de robie, ca să mai aveți frică; ci ați primit un duh de înfiere, care ne face să strigăm: „Ava!”, adică „Tată!”",
    meditation:
      "„Ava” nu e un cuvânt teologic. E cuvântul pe care un copil mic îl strigă prin casă când s-a lovit. Pavel spune că exact acel cuvânt ți-a fost dat. Nu ți s-a dat un formular, ți s-a dat un strigăt. Iar strigătul nu are nevoie să fie frumos ca să fie auzit.",
    question: "Când te-ai rugat ultima dată cu cuvintele tale, nu cu cele corecte?",
    prayer: "Tată. Atât. Ascultă-mă azi așa cum sunt. Amin.",
    step: "Spune-I azi un lucru exact cum ți-a venit, fără să-l aranjezi înainte.",
  },
  {
    id: "dev_004",
    dayNumber: 4,
    theme: LUNA_1,
    axis: "identity",
    verseRef: "1 Ioan 3:1",
    verseText: "Vedeți ce dragoste ne-a arătat Tatăl: să ne numim copii ai lui Dumnezeu!",
    meditation:
      "Ioan nu argumentează aici, se miră. „Vedeți ce dragoste” e exclamația unui om care nu s-a obișnuit cu ce a primit. Pericolul, după câțiva ani, nu e să nu crezi. E să te obișnuiești. Mirarea nu e un sentiment de începător; e semnul că încă vezi limpede.",
    question: "Cu ce te-ai obișnuit atât de mult încât nu te mai miră?",
    prayer: "Doamne, nu mă lăsa să mă obișnuiesc cu Tine. Dă-mi din nou mirarea. Amin.",
    step: "Scrie azi, într-un rând, un lucru pe care Dumnezeu l-a făcut pentru tine și pe care îl consideri deja normal.",
  },
  {
    id: "dev_005",
    dayNumber: 5,
    theme: LUNA_1,
    axis: "identity",
    verseRef: "Efeseni 1:5",
    verseText: "Ne-a rânduit mai dinainte să fim înfiați prin Isus Hristos, după buna plăcere a voii Sale.",
    meditation:
      "Un copil înfiat nu ajunge în familie din întâmplare. Cineva a vrut, a semnat și a plătit. Copilul născut poate spune „așa s-a nimerit”; cel înfiat nu poate spune asta niciodată. Tu ești înfiat. Nu ești în familia asta din întâmplare, ci pentru că Cineva a vrut anume pe tine.",
    question: "Te vezi mai des ca pe un om tolerat de Dumnezeu sau ca pe unul dorit de El?",
    prayer:
      "Doamne, mulțumesc că nu am ajuns la Tine din întâmplare. M-ai vrut. Ajută-mă să trăiesc azi ca un om dorit. Amin.",
    step: "Când te prinzi azi gândind „Dumnezeu mă suportă”, oprește-te și corectează: „Dumnezeu m-a vrut”.",
  },
  {
    id: "dev_006",
    dayNumber: 6,
    theme: LUNA_1,
    axis: "identity",
    verseRef: "Isaia 43:1",
    verseText: "Nu te teme de nimic, căci Eu te izbăvesc, te chem pe nume: ești al Meu.",
    meditation:
      "Sunt trei lucruri aici, în ordinea asta: te izbăvesc, te chem pe nume, ești al Meu. Nu „fă ceva și vei fi al Meu”. Numele vine înaintea faptelor. Dumnezeu nu te strigă „omule”, te strigă cu numele tău — și e singurul care îl rostește fără nicio așteptare ascunsă.",
    question: "Ce nume îți dai tu, în gând, când greșești?",
    prayer:
      "Doamne, Tu îmi știi numele și nu Ți-e rușine de el. Vindecă felul în care îmi vorbesc despre mine. Amin.",
    step: "Observă azi o singură dată cum îți vorbești în gând după o greșeală. Nu te lupta, doar observă.",
  },
  {
    id: "dev_007",
    dayNumber: 7,
    theme: LUNA_1,
    axis: "identity",
    verseRef: "Psalmul 139:14",
    verseText: "Te laud că sunt o făptură așa de minunată.",
    meditation:
      "E ciudat de citit versetul acesta într-o zi în care nu te placi. Dar observă: David nu se laudă pe el, Îl laudă pe Dumnezeu. Nu spune „sunt grozav”, spune „ai lucrat bine”. Poți spune asta și într-o zi grea, pentru că nu vorbește despre performanța ta, ci despre meseria Lui.",
    question: "Ce parte din tine îți vine cel mai greu să crezi că a fost făcută intenționat?",
    prayer:
      "Doamne, nu mă pricep să mă apreciez. Dar Tu Te pricepi la ce ai făcut. Te laud pentru ce n-am ochi să văd. Amin.",
    step: "Nu spune azi despre tine nimic pe care nu l-ai spune despre un prieten.",
  },
  {
    id: "dev_008",
    dayNumber: 8,
    theme: LUNA_1,
    axis: "identity",
    verseRef: "Ieremia 1:5",
    verseText: "Mai înainte ca să te fi întocmit în burta mamei tale, te cunoșteam.",
    meditation:
      "Dumnezeu nu te-a cunoscut pe parcurs. Nu a aflat despre tine ce fel de om ești, dezamăgindu-se treptat. Te cunoștea înainte să existe cineva care să te cunoască. Deci nimic din ce a ieșit la lumină în tine în ultimii ani nu a fost o surpriză pentru El.",
    question: "Ce crezi că a descoperit Dumnezeu despre tine și l-a dezamăgit?",
    prayer: "Doamne, Tu m-ai știut de la început și tot m-ai chemat. Amin.",
    step: "Spune-I azi un lucru despre tine de care ți-e rușine. Îl știe deja; spusul e pentru tine.",
  },
  {
    id: "dev_009",
    dayNumber: 9,
    theme: LUNA_1,
    axis: "identity",
    verseRef: "Efeseni 2:10",
    verseText: "Căci noi suntem lucrarea Lui.",
    meditation:
      "Cuvântul din original spune „lucrare”, ca despre ceva lucrat cu mâna, nu produs în serie. Un om care se crede accident se poartă ca un accident. Un om care știe că e lucrare are răbdare cu el însuși, pentru că știe că lucrarea nu e gata.",
    question: "În ce parte a vieții tale te grăbești să fii deja gata?",
    prayer: "Doamne, nu sunt gata, dar sunt în mâinile Tale. Dă-mi răbdare cu ce lucrezi în mine. Amin.",
    step: "Alege azi un lucru la care ești nerăbdător cu tine și spune-ți: „încă se lucrează”.",
  },
  {
    id: "dev_010",
    dayNumber: 10,
    theme: LUNA_1,
    axis: "identity",
    verseRef: "Romani 8:38-39",
    verseText:
      "Nici moartea, nici viața, nici o altă făptură nu ne va putea despărți de dragostea lui Dumnezeu.",
    meditation:
      "Pavel face o listă lungă și lasă înadins un loc gol: „nici o altă făptură”. Adică inclusiv tu. Ești o făptură. Nici tu nu te poți despărți de dragostea Lui. Asta e cel mai greu de crezut, pentru că mulți oameni cred că Dumnezeu îi iubește, dar bănuiesc că ei pot strica lucrul.",
    question: "Ce crezi, în adâncul tău, că ar putea rupe legătura dintre tine și Dumnezeu?",
    prayer:
      "Doamne, nici eu nu mă pot smulge din dragostea Ta. Ține-mă, chiar când mă zbat. Amin.",
    step: "Scrie pe hârtie lucrul de care ți-e frică că te-ar despărți de El. Apoi scrie dedesubt: „nici o altă făptură”.",
  },
  {
    id: "dev_011",
    dayNumber: 11,
    theme: LUNA_1,
    axis: "identity",
    verseRef: "Ioan 15:15",
    verseText: "Nu vă mai numesc robi... v-am numit prieteni.",
    meditation:
      "Isus schimbă cuvântul în mijlocul relației. Nu la început, când nu Îl cunoșteau, ci după ce L-au văzut obosit, trist și trădat de unul de-al lor. Prietenia nu e o promovare pentru cei care s-au descurcat bine. E felul în care El a decis să numească oameni care aveau să-L lase singur în noaptea aceea.",
    question: "Te-ai purta cu Dumnezeu diferit dacă ai crede că te consideră prieten?",
    prayer: "Doamne, mă numești prieten. Nu știu ce să fac cu asta, dar Îți mulțumesc. Amin.",
    step: "Vorbește-I azi o dată cum vorbești cu un prieten, nu cum vorbești la o instituție.",
  },
  {
    id: "dev_012",
    dayNumber: 12,
    theme: LUNA_1,
    axis: "identity",
    verseRef: "2 Corinteni 5:17",
    verseText: "Dacă este cineva în Hristos, este o făptură nouă. Cele vechi s-au dus.",
    meditation:
      "Versetul nu spune că amintirile s-au dus, nici că lupta s-a dus. Spune că „cele vechi” — ce te definea — s-au dus. Un om care a fost eliberat din închisoare poate încă visa noaptea celula. Visul nu îl întoarce înăuntru. Trecutul tău poate să te viziteze, dar nu mai are drept de proprietate.",
    question: "Ce lucru vechi încă vorbește despre tine ca și cum ar avea dreptul?",
    prayer:
      "Doamne, cele vechi s-au dus. Ajută-mă să nu mai plătesc chirie pentru o casă în care nu mai stau. Amin.",
    step: "Când azi te lovește un gând despre cine erai, răspunde-i o dată: „aceea s-a dus”.",
  },
  {
    id: "dev_013",
    dayNumber: 13,
    theme: LUNA_1,
    axis: "identity",
    verseRef: "Coloseni 3:3",
    verseText: "Căci viața voastră este ascunsă cu Hristos în Dumnezeu.",
    meditation:
      "„Ascunsă” e un cuvânt bun. Înseamnă că cea mai importantă parte din tine nu e la vedere și nu poate fi atinsă de ce se vede. Reputația ta poate fi lovită, corpul poate obosi, planurile pot cădea. Viața, cea adevărată, e pusă la păstrare în alt loc.",
    question: "Ce parte din tine ai crezut că e viața ta, deși e doar vitrina ei?",
    prayer: "Doamne, viața mea e la Tine. Ce se vede poate să tremure; ce e ascuns e în siguranță. Amin.",
    step: "Când azi te apasă ce cred alții despre tine, spune-ți: „aceea nu e viața mea”.",
  },
  {
    id: "dev_014",
    dayNumber: 14,
    theme: LUNA_1,
    axis: "identity",
    verseRef: "Isaia 49:16",
    verseText: "Iată, te-am săpat pe mâinile Mele.",
    meditation:
      "Nu scris, nu notat: săpat. Un lucru săpat nu se poate șterge fără să rămână urma. Iar mâna e locul pe care îl vezi de o sută de ori pe zi, fără să vrei. Dumnezeu spune că ești în locul la care se uită mereu, într-o formă care nu se poate șterge.",
    question: "Ce te face să crezi că Dumnezeu te-a uitat?",
    prayer: "Doamne, sunt săpat în mâna Ta. Nu mă poți uita. Amin.",
    step: "Uită-te azi o dată la mâna ta și amintește-ți versetul. Un gest mic, cinci secunde.",
  },
  {
    id: "dev_015",
    dayNumber: 15,
    theme: LUNA_1,
    axis: "identity",
    verseRef: "Psalmul 27:10",
    verseText: "Căci tatăl meu și mama mea mă părăsesc, dar Domnul mă primește.",
    meditation:
      "Psalmul nu neagă durerea, o numește. Sunt oameni care au fost părăsiți de cine nu avea dreptul să-i părăsească, și lor le e greu să creadă că Dumnezeu e altfel — pentru că primul tată pe care l-au văzut a plecat. Dumnezeu nu cere să uiți asta. Spune doar: Eu primesc.",
    question: "Cine ar fi trebuit să te primească și nu te-a primit?",
    prayer:
      "Doamne, port o rană de la cineva care trebuia să rămână. Primește-mă Tu și vindecă locul acela. Amin.",
    step: "Spune-I azi pe nume persoanei care te-a părăsit. Nu ca acuzație, ci ca să nu duci povara singur.",
  },
  {
    id: "dev_016",
    dayNumber: 16,
    theme: LUNA_1,
    axis: "identity",
    verseRef: "Luca 15:20",
    verseText: "Când era încă departe, tatăl său l-a văzut și i s-a făcut milă de el; a alergat de i s-a aruncat pe gât.",
    meditation:
      "Fiul avea un discurs pregătit. Tatăl nu l-a lăsat să-l termine. Observă cine aleargă în povestea asta: nu cel care s-a întors, ci cel care aștepta. Iar tatăl l-a văzut „când era încă departe”, ceea ce înseamnă că se uita spre drum de mult timp.",
    question: "Ce discurs de scuze ai pregătit pentru Dumnezeu, crezând că fără el nu ești primit?",
    prayer: "Doamne, nu mai repet scuzele. Am venit. Amin.",
    step: "Întoarce-te azi la El fără introducere. Începe cu ce ai pe suflet.",
  },
  {
    id: "dev_017",
    dayNumber: 17,
    theme: LUNA_1,
    axis: "identity",
    verseRef: "Romani 5:8",
    verseText: "Pe când eram noi încă păcătoși, Hristos a murit pentru noi.",
    meditation:
      "Ordinea din verset e totul. Nu „a murit pentru noi după ce ne-am îndreptat”. Dovada dragostei a venit în cel mai prost moment al nostru, nu în cel mai bun. Deci nu poți fi într-o zi atât de rea încât dovada să nu mai fie valabilă — a fost dată exact pentru zilele acelea.",
    question: "Aștepți să te aranjezi puțin înainte să te apropii de El?",
    prayer: "Doamne, ai murit pentru mine când eram la cel mai rău. Vin acum, așa cum sunt. Amin.",
    step: "Nu amâna azi rugăciunea până te simți mai bine. Roagă-te exact în starea în care ești.",
  },
  {
    id: "dev_018",
    dayNumber: 18,
    theme: LUNA_1,
    axis: "identity",
    verseRef: "Efeseni 1:7",
    verseText: "În El avem răscumpărarea, prin sângele Lui, iertarea păcatelor.",
    meditation:
      "Răscumpărare înseamnă că prețul a fost plătit de altcineva, integral, o dată. Un om iertat care încă își plătește pedeapsa în gând nu trăiește iertarea, ci o rescrie. Dacă prețul a fost plătit, a-l mai plăti tu nu e smerenie, e neîncredere.",
    question: "Pentru ce lucru iertat te mai pedepsești singur?",
    prayer: "Doamne, prețul a fost plătit. Nu mai plătesc a doua oară. Amin.",
    step: "Numește azi un lucru pentru care încă te pedepsești și oprește pedeapsa, o zi.",
  },
  {
    id: "dev_019",
    dayNumber: 19,
    theme: LUNA_1,
    axis: "identity",
    verseRef: "1 Petru 2:9",
    verseText: "Voi însă sunteți o seminție aleasă, o preoție împărătească, un neam sfânt.",
    meditation:
      "Petru scrie asta unor oameni împrăștiați, fără putere și fără poziție în lume. Nu le spune ce vor deveni dacă se organizează. Le spune ce sunt deja, în timp ce sunt slabi. Identitatea nu e recompensa pentru forță; e ce ai când n-ai nimic altceva.",
    question: "Ce crezi că trebuie să obții ca să fii cineva?",
    prayer: "Doamne, sunt al Tău și asta e destul. Amin.",
    step: "Nu te prezenta azi nimănui prin ce faci. O dată, spune doar numele tău.",
  },
  {
    id: "dev_020",
    dayNumber: 20,
    theme: LUNA_1,
    axis: "identity",
    verseRef: "Psalmul 103:13",
    verseText: "Cum se îndură un tată de copiii lui, așa Se îndură Domnul de cei ce se tem de El.",
    meditation:
      "Cuvântul „se îndură” înseamnă că I se mișcă ceva înăuntru. Dumnezeu nu te privește din spatele unui geam. Când te doare, nu doar știe — Îl mișcă. Un tată bun nu ține o listă cu cât de repede s-a ridicat copilul; se apleacă.",
    question: "Îl vezi pe Dumnezeu aplecat spre tine sau uitându-se de la distanță?",
    prayer: "Doamne, apleacă-Te spre mine azi. Nu-mi trebuie explicații, îmi trebuie apropierea Ta. Amin.",
    step: "Spune-I azi ce te doare, fără să ceri nimic. Doar spune.",
  },
  {
    id: "dev_021",
    dayNumber: 21,
    theme: LUNA_1,
    axis: "identity",
    verseRef: "Matei 3:17",
    verseText: "Acesta este Fiul Meu preaiubit, în care Îmi găsesc plăcerea.",
    meditation:
      "Tatăl spune asta înainte ca Isus să fi predicat, vindecat sau făcut vreo minune. Aprobarea vine înaintea lucrării, nu după. Dacă la Fiul a fost așa, nu e altfel la tine: Dumnezeu nu Își găsește plăcerea în tine după ce livrezi. E o mare diferență între „lucrez ca să fiu iubit” și „lucrez pentru că sunt”.",
    question: "Ce faci în viața ta ca să obții o aprobare pe care o ai deja?",
    prayer: "Doamne, Îți găsești plăcerea în mine înainte să fac orice. Ajută-mă să lucrez din odihnă. Amin.",
    step: "Lasă azi un lucru nefăcut, dinadins, ca să vezi că valoarea ta nu scade.",
  },
  {
    id: "dev_022",
    dayNumber: 22,
    theme: LUNA_1,
    axis: "identity",
    verseRef: "Isaia 62:4",
    verseText: "Nu te vor mai numi Părăsită... ci te vor numi Plăcerea Mea.",
    meditation:
      "Dumnezeu schimbă numele oamenilor și al locurilor. Cine a trăit mult timp cu un nume urât — ratat, singur, nefolositor — ajunge să răspundă la el fără să se gândească. Dumnezeu nu îți cere să te motivezi. Îți schimbă numele.",
    question: "La ce nume vechi mai răspunzi, deși El l-a schimbat?",
    prayer: "Doamne, spune-mi Tu cum mă numesc. Nu mai vreau numele pe care mi l-am dat singur. Amin.",
    step: "Scrie numele vechi pe o hârtie, taie-l, scrie dedesubt ce spune El despre tine.",
  },
  {
    id: "dev_023",
    dayNumber: 23,
    theme: LUNA_1,
    axis: "identity",
    verseRef: "Ioan 14:18",
    verseText: "Nu vă voi lăsa orfani, Mă voi întoarce la voi.",
    meditation:
      "Isus folosește exact cuvântul „orfani”. Știa ce urmează pentru ucenici: trei zile în care aveau să se simtă rămași fără nimeni. Nu le-a promis că nu vor simți asta. Le-a promis că nu va fi adevărat. Sunt zile în care te simți orfan; simțirea nu e o informație despre realitate.",
    question: "Când te-ai simțit ultima dată singur, deși nu erai?",
    prayer: "Doamne, mă simt uneori orfan. Amintește-mi că nu sunt. Amin.",
    step: "Când te lovește azi singurătatea, spune tare: „nu sunt orfan”.",
  },
  {
    id: "dev_024",
    dayNumber: 24,
    theme: LUNA_1,
    axis: "identity",
    verseRef: "Romani 8:1",
    verseText: "Acum dar nu este nici o osândire pentru cei ce sunt în Hristos Isus.",
    meditation:
      "Nu „mai puțină osândire”. Nici una. Vocea care te acuză dimineața, înainte să te trezești bine, nu e vocea lui Dumnezeu — pentru că Dumnezeu nu are ce să acuze acolo unde a plătit. Vinovăția care te duce la El e de la El. Cea care te ține departe de El nu e.",
    question: "Vinovăția pe care o simți acum te trage spre Dumnezeu sau te ține departe?",
    prayer: "Doamne, nu e nici o osândire. Închide gura care mă acuză în numele Tău. Amin.",
    step: "Când te acuză azi un gând, întreabă-l o dată: „mă duci la El sau mă ții departe?”",
  },
  {
    id: "dev_025",
    dayNumber: 25,
    theme: LUNA_1,
    axis: "identity",
    verseRef: "Psalmul 34:5",
    verseText: "Când îți întorci privirile spre El, te luminezi de bucurie și nu ți se roșește obrazul de rușine.",
    meditation:
      "Rușinea are un obicei: îți apleacă privirea. Nu întâmplător versetul vorbește despre a ridica ochii. Nu poți argumenta cu rușinea, dar poți privi în altă direcție. Iar când privești spre El, se întâmplă un lucru pe care nu-l poți produce singur: fața ta se schimbă.",
    question: "În ce lucru din viața ta mergi cu privirea în jos?",
    prayer: "Doamne, ridic ochii spre Tine. Ia-mi rușinea de pe față. Amin.",
    step: "Ridică azi capul, la propriu, când te prinzi cu privirea în pământ. Corpul învață primul.",
  },
  {
    id: "dev_026",
    dayNumber: 26,
    theme: LUNA_1,
    axis: "identity",
    verseRef: "1 Ioan 4:18",
    verseText: "În dragoste nu este frică; ci dragostea desăvârșită izgonește frica.",
    meditation:
      "Ioan spune că frica de pedeapsă și siguranța de a fi iubit nu pot locui în același loc. Deci frica de Dumnezeu, în sensul de teroare, nu e semn de evlavie — e semn că încă nu te-ai așezat în dragostea Lui. Nu te lupta direct cu frica. Așază-te în dragoste, și frica pierde locul.",
    question: "De ce te temi cel mai mult în legătura ta cu Dumnezeu?",
    prayer: "Doamne, dragostea Ta e mai mare decât frica mea. Fă loc în mine. Amin.",
    step: "Numește azi frica ta în rugăciune, cu voce tare. Frica nenumită crește.",
  },
  {
    id: "dev_027",
    dayNumber: 27,
    theme: LUNA_1,
    axis: "identity",
    verseRef: "Ioan 10:14",
    verseText: "Eu sunt Păstorul cel bun. Eu Îmi cunosc oile Mele, și ele Mă cunosc pe Mine.",
    meditation:
      "O oaie nu e un animal impresionant. Nu se apără, se rătăcește ușor și nu ține minte drumul. Isus nu se compară cu un cioban de oi grozave. Faptul că te rătăcești ușor nu te scoate din turmă; e chiar motivul pentru care ai un Păstor.",
    question: "Te crezi prea neputincios ca să mai fii căutat?",
    prayer: "Doamne, mă rătăcesc ușor. Mulțumesc că Tu Te pricepi la asta. Amin.",
    step: "Spune-I azi unde te-ai rătăcit ultima dată. Nu ca să te justifici.",
  },
  {
    id: "dev_028",
    dayNumber: 28,
    theme: LUNA_1,
    axis: "identity",
    verseRef: "Psalmul 23:1",
    verseText: "Domnul este Păstorul meu: nu voi duce lipsă de nimic.",
    meditation:
      "David a scris asta după ce fusese vânat, trădat și silit să doarmă în peșteri. Deci „nu voi duce lipsă” nu e naivitatea unui om care a avut viață ușoară. E concluzia unuia care a rămas fără multe, dar nu fără Păstor. Uneori Dumnezeu nu îți dă ce ceri, ci Se dă pe Sine.",
    question: "Ce îți lipsește acum și pe ce loc din inima ta stă lipsa aceea?",
    prayer: "Doamne, Tu ești Păstorul meu. Chiar și azi, chiar și așa. Amin.",
    step: "Mulțumește azi pentru un lucru pe care îl ai și nu l-ai cerut niciodată.",
  },
  {
    id: "dev_029",
    dayNumber: 29,
    theme: LUNA_1,
    axis: "identity",
    verseRef: "Ioan 15:16",
    verseText: "Nu voi M-ați ales pe Mine; ci Eu v-am ales pe voi.",
    meditation:
      "Cine crede că el l-a ales pe Dumnezeu trăiește cu frica de a se răzgândi — sau de a fi găsit nepotrivit. Isus întoarce ordinea. Alegerea nu a pornit de la tine, deci nu se termină cu tine. Ești ținut de o hotărâre care nu e a ta.",
    question: "Legătura ta cu Dumnezeu depinde mai mult de statornicia ta sau de a Lui?",
    prayer: "Doamne, Tu m-ai ales. Nu mă țin eu de Tine; Tu mă ții. Amin.",
    step: "Când te prinzi azi că te ții cu dinții, oprește-te și spune: „El m-a ales”.",
  },
  {
    id: "dev_030",
    dayNumber: 30,
    theme: LUNA_1,
    axis: "identity",
    verseRef: "Galateni 2:20",
    verseText: "Nu mai trăiesc eu, ci Hristos trăiește în mine.",
    meditation:
      "Asta nu înseamnă că nu mai exiști. Înseamnă că nu mai ești sursa. Un om care crede că e sursa obosește, pentru că trebuie să producă tot: puterea, bunătatea, răbdarea. Un om care știe că e locuit poate cere, în loc să scoată din el ce nu are.",
    question: "Ce încerci să produci singur, deși ai de unde cere?",
    prayer: "Doamne, nu mai trag din rezervele mele. Trăiește Tu în mine azi. Amin.",
    step: "Cere azi, o singură dată, o calitate de care ai nevoie, în loc să te forțezi s-o ai.",
  },
  {
    id: "dev_031",
    dayNumber: 31,
    theme: LUNA_1,
    axis: "identity",
    verseRef: "Filipeni 1:6",
    verseText:
      "Sunt încredințat că Acela care a început în voi această bună lucrare o va isprăvi.",
    meditation:
      "O lună. Dacă ai lipsit zile, nu s-a stricat nimic — mana de azi e pentru azi, nu pentru zilele în care n-ai strâns. Versetul acesta e semnătura lunii: cel care a început nu e tu, deci nici cel care duce la capăt nu ești tu. Luna viitoare continuăm de aici.",
    question: "Ce s-a mișcat în tine în luna asta, chiar și puțin?",
    prayer:
      "Doamne, Tu ai început și Tu duci la capăt. Mulțumesc pentru luna asta. Mergem mai departe. Amin.",
    step: "Scrie un rând despre luna care a trecut și păstrează-l. La sfârșitul anului îl vei reciti.",
  },
]

export function devotionalDay(dayNumber: number): DevotionalDay | null {
  return DEVOTIONAL_DAYS.find((d) => d.dayNumber === dayNumber) ?? null
}

/** Câte zile de conținut există efectiv (nu 365 până se scrie tot). */
export function devotionalDaysAvailable(): number {
  return DEVOTIONAL_DAYS.length
}

/**
 * Regula manei (Exod 16): zilele lipsă nu se acumulează ca datorie.
 * Mesajul de revenire nu numără ce s-a pierdut, pentru că nu s-a pierdut nimic.
 */
export function manaMessage(awayDays: number): string {
  if (awayDays <= 0) return "Mana de azi e pentru azi."
  if (awayDays === 1) return "Ai lipsit o zi. Nu e nimic de recuperat: mana de azi e pentru azi."
  return "Ai lipsit o vreme. Nu ai zile restante — mana nu se strânge pentru mâine. Continuăm de unde ai rămas."
}

export const DEVOTIONAL_EMPTY_PROGRESS: DevotionalProgress = {
  dayIndex: 1,
  openedDays: [],
  lastOpenedAt: null,
}
