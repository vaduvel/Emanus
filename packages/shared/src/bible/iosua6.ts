import { iosuaChapter, teaching } from "./iosuaHelpers.js"
import { iosuaPassage } from "./iosuaText.js"
import { IOSUA_STATUSES } from "./iosuaPublication.js"

const POONEN_SOURCE =
  "Zac Poonen — Through The Bible: Joshua (Joshua 6 and book-level Canaan/judgment exposition)"
const EDITORIAL_SOURCE =
  "Emanus canonical exegesis — Iosua 6 + biblical cross-references; Poonen source used only where the transcript develops the point"

export const IOSUA_6 = iosuaChapter({
  number: 6,
  title: "Iosua 6 — Ierihonul: o biruință deja dată",
  summary:
    "DOMNUL îi spune lui Iosua înainte să cadă vreun zid: «Am dat Ierihonul în mâna ta». Poonen face din această propoziție centrul aplicației lui: credinciosul nu luptă ca să inventeze victoria asupra Satanei, ci stă în victoria deja câștigată de Hristos. Marșul și trâmbițele nu sunt însă o formulă magică; Poonen cere o conștiință curată și supunere față de Dumnezeu. Capitolul păstrează în același timp judecata severă asupra Ierihonului, salvarea lui Rahab și interdicția de a lua lucrurile puse deoparte.",
  literaryContext:
    "Capitolul vine imediat după întâlnirea lui Iosua cu Căpetenia oștirii DOMNULUI. Poonen leagă cele două scene: Iosua nu-L cheamă pe Dumnezeu să intre în planul lui; el trebuie să urmeze Căpetenia. Apoi, înainte de luptă, Dumnezeu vorbește despre Ierihon la timpul împlinit — cetatea este deja dată. În lectura tipologică a lui Poonen, Canaanul nu este cerul, ci viața de biruință în care păcatul este pus la moarte.",
  historicalContext:
    "Poonen tratează fără ocol problema judecății canaaniților. El o leagă de Geneza 15:16: Dumnezeu a așteptat generații până când nelegiuirea amoriților a ajuns la măsura judecății. Folosește imaginea unei amputări făcute pentru a opri gangrena și numește judecata «surgery, not murder». Tot el subliniază că Dumnezeu nu este părtinitor: când Israel și apoi Iuda au persistat în aceleași păcate, au fost scoși și ei din țară. Aceasta este explicația lui Poonen pentru textul veterotestamentar; aplicația lui pentru credinciosul Noului Legământ este războiul împotriva păcatului și a Satanei, nu violența împotriva oamenilor.",
  units: [
    {
      id: "iosua-6-1-5",
      ref: "Iosua 6:1-5",
      heading: "«Am dat Ierihonul în mâna ta» — înainte să cadă zidul",
      text: iosuaPassage(6, 1, 5),
      teaching: teaching(
        "Ierihonul este închis, zidul este încă în picioare și nimeni nu a început atacul. Dar DOMNUL nu spune: «Peste șapte zile îți voi da cetatea». Spune: «Iată, am dat Ierihonul în mâna ta». Poonen se oprește exact la timpul acesta al verbului: biruința este declarată înainte ca Israel să vadă rezultatul.",
        "El aplică acest lucru luptei creștinului împotriva Satanei: Hristos nu urmează să câștige cândva victoria de la Calvar; victoria a fost câștigată. Chemarea credinciosului este să umble și să lupte pe temeiul unei biruințe deja realizate de Hristos, nu să se poarte ca și cum rezultatul final ar depinde de puterea lui.",
        "Aceasta se potrivește cu tema pe care Poonen o dă întregii cărți Iosua: Canaanul nu este cerul, pentru că în cer nu există uriași de ucis. În tipologia lui, țara reprezintă viața de biruință în care poftele firii sunt omorâte una câte una, iar Iosua — al cărui nume corespunde lui Isus — îl prefigurează pe Căpetenia care merge înainte.",
        "De aceea cuvântul «am dat» nu produce pasivitate. Dumnezeu dă cetatea, iar Israel trebuie totuși să asculte și să umble în jurul ei. Harul nu înseamnă că lupta împotriva păcatului dispare; înseamnă că luptăm urmând o Căpetenie care a biruit deja.",
      ),
      explanationKind: "exposition",
      explanationSource: POONEN_SOURCE,
      crossRefs: ["Coloseni 2:14-15", "Evrei 2:14-15", "Romani 6:14", "Evrei 12:1-2"],
      forYourHeart:
        "În ce ispită te porți ca și cum Satana ar trebui încă să fie învins? Începe de la ce a făcut Hristos, apoi ascultă pasul pe care ți-l cere Dumnezeu.",
    },
    {
      id: "iosua-6-6-14",
      ref: "Iosua 6:6-14",
      heading: "Trâmbița mărturisirii — dar nu o tehnică",
      text: iosuaPassage(6, 6, 14),
      teaching: teaching(
        "Israel merge în jurul cetății după cuvântul primit. Poonen vede în trâmbițe o imagine a mărturisirii credinței și leagă scena de Apocalipsa 12:11: biruința prin sângele Mielului și prin cuvântul mărturisirii. El îi îndeamnă pe credincioși să-i amintească Satanei că a fost învins la cruce.",
        "Poonen spune foarte apăsat însă că aceasta nu este o «tehnică». Omul nu poate trăi cu o conștiință murdară și apoi să creadă că o formulă rostită dimineața îl pune automat deasupra diavolului. El invocă Fapte 19: duhurile rele nu sunt impresionate de cuvinte corecte rostite fără realitatea unei vieți supuse lui Dumnezeu.",
        "Ordinea sănătoasă este cea din Iacov 4:7: supuneți-vă lui Dumnezeu, apoi împotriviți-vă diavolului. Mărturisirea victoriei lui Hristos are autoritate în omul care stă sub autoritatea lui Dumnezeu. Trâmbița nu înlocuiește ascultarea.",
        "Cele șase zile în care zidul pare neschimbat mai arată ceva simplu din narațiune: Israel nu primește dreptul de a inventa o metodă mai rapidă. Face exact ce i s-a spus, chiar când rezultatul încă nu se vede.",
      ),
      explanationKind: "exposition",
      explanationSource: POONEN_SOURCE,
      crossRefs: ["Apocalipsa 12:11", "Iacov 4:7", "Fapte 19:13-16", "Efeseni 6:10-18"],
      forYourHeart:
        "Mărturisești victoria lui Hristos dintr-o viață supusă Lui, sau ai transformat cuvintele spirituale într-o formulă care încearcă să înlocuiască ascultarea?",
    },
    {
      id: "iosua-6-15-21",
      ref: "Iosua 6:15-21",
      heading: "Zidul cade, iar judecata Ierihonului nu este ascunsă",
      text: iosuaPassage(6, 15, 21),
      teaching: teaching(
        "În ziua a șaptea, după cele șapte înconjurări, poporul strigă și zidul cade. Textul trece apoi la partea pe care nu avem voie nici s-o ștergem, nici s-o cosmetizăm: cetatea este dată spre nimicire, iar versetul 21 spune că bărbați, femei, tineri, bătrâni și animale sunt loviți cu sabia. Explicația trebuie să lase această afirmație la întreaga ei greutate.",
        "Poonen răspunde la întrebarea despre această judecată încă din introducerea cărții. El merge la Geneza 15:16 și subliniază că Dumnezeu nu i-a folosit pe Avraam și oamenii lui ca să-i nimicească pe canaaniți cu patru sute de ani mai devreme, pentru că nelegiuirea lor «nu ajunsese încă deplină». Dumnezeu a așteptat până la timpul judecății.",
        "Imaginea folosită de Poonen este dură: un medic care amputează un membru cu gangrenă ca să nu moară întregul trup. El numește ceea ce se întâmplă în Canaan «surgery, not murder» și leagă judecata de corupția pe care Leviticul o descrie. Nu îi schimbăm cuvintele doar fiindcă sunt incomode.",
        "Dar îi păstrăm și limita. Poonen spune că standardul lui Dumnezeu nu era etnic: când Israel și Iuda au persistat în păcat, Dumnezeu i-a scos și pe ei din țară prin Asiria și Babilon. Iar tipologia pe care o aplică astăzi nu este «ucide păcătosul», ci «omoară păcatul»: uriașii Canaanului sunt folosiți ca imagine a poftelor firii care trebuie răstignite. A transforma Iosua 6 într-o autorizație creștină pentru uciderea vrăjmașilor ar răsturna chiar aplicația pe care Poonen o face cărții.",
      ),
      explanationKind: "exposition",
      explanationSource: POONEN_SOURCE,
      crossRefs: ["Geneza 15:16", "Levitic 18:24-30", "Galateni 5:24", "Romani 8:13", "Efeseni 6:12"],
      forYourHeart:
        "Nu folosi severitatea judecății asupra altora ca să uiți războiul pe care Dumnezeu îl cere în tine. Ce păcat tolerezi deși spui că vrei viața de biruință?",
    },
    {
      id: "iosua-6-22-27",
      ref: "Iosua 6:22-27",
      heading: "Rahab este scoasă, lucrurile Domnului nu se ating",
      text: iosuaPassage(6, 22, 27),
      teaching: teaching(
        "În mijlocul judecății este păstrat jurământul făcut lui Rahab. Cei doi oameni care cercetaseră țara o scot pe ea și casa ei, iar textul spune că a locuit în mijlocul lui Israel. Capitolul nu o prezintă ca pe o excepție ascunsă, ci îi numește salvarea în mod deschis chiar în relatarea căderii Ierihonului.",
        "Argintul, aurul, bronzul și fierul sunt puse în vistieria DOMNULUI. Poonen revine imediat la această poruncă atunci când explică păcatul lui Acan în capitolul 7: Ierihonul era testul în care Israel nu trebuia să ia pentru sine ceea ce Dumnezeu pusese deoparte.",
        "El urmărește apoi contrastul cu capitolul 8, unde prada din Ai le este îngăduită. Acan a apucat înaintea lui Dumnezeu ceea ce îi fusese interzis în primul test și a pierdut totul, deși în luptele următoare ar fi putut primi mult. Aplicația lui Poonen este despre lăcomie și nerăbdare: omul care nu poate lăsa în mâna lui Dumnezeu ceea ce Dumnezeu îi oprește acum ajunge să piardă lucruri pe care Dumnezeu i le-ar fi putut da la vremea potrivită.",
        "Blestemul asupra reconstruirii Ierihonului încheie episodul, iar vestea despre Iosua se răspândește pentru că DOMNUL era cu el. Centrul nu este o tehnică militară și nici gloria liderului, ci cuvântul lui Dumnezeu împlinit prin ascultare.",
      ),
      explanationKind: "exposition",
      explanationSource: EDITORIAL_SOURCE,
      crossRefs: ["Iosua 2:8-21", "Iosua 7:20-21", "Iosua 8:2", "Evrei 11:31", "Iacov 2:25"],
      forYourHeart:
        "Poți lăsa în mâna lui Dumnezeu lucrul pe care ți-l oprește astăzi, sau îl iei acum fiindcă nu crezi că El știe ce și când să-ți dea?",
    },
  ],
  prayer:
    "Doamne, fă-ne să trăim din victoria lui Hristos fără să transformăm credința într-o formulă. Dă-ne o conștiință curată, supunere adevărată și curaj să punem la moarte păcatul din noi. Păzește-ne și să nu folosim judecățile Vechiului Testament ca scuză pentru ura și violența noastră. Amin.",
  status: IOSUA_STATUSES[6],
})