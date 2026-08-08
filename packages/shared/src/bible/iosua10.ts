import { iosuaChapter, teaching } from "./iosuaHelpers.js"
import { iosuaPassage } from "./iosuaText.js"
import { IOSUA_STATUSES } from "./iosuaPublication.js"

const BOOK_TYPOLOGY_SOURCE =
  "Zac Poonen — Through The Bible: Joshua (book-level overcoming-sin typology) + Iosua 10 biblical text/cross-references"
const TEXTUAL_SOURCE =
  "Emanus canonical exegesis — Iosua 10 + biblical cross-references; no physical mechanism added to the miracle"

export const IOSUA_10 = iosuaChapter({
  number: 10,
  title: "Iosua 10 — Campania din sud și ziua cea lungă",
  summary:
    "Cinci împărați amoriți se unesc împotriva Gabaonului după pacea acestuia cu Israel. Iosua vine în ajutorul gabaoniților, DOMNUL aruncă pietre mari din cer asupra oștirii care fuge, iar la rugăciunea lui Iosua soarele se oprește și nu se grăbește să apună până când Israel își duce lupta la capăt. Capitolul continuă cu moartea celor cinci împărați și campania severă împotriva cetăților din sudul Canaanului.",
  literaryContext:
    "Capitolul 10 este consecința directă a legământului din capitolul 9. Israel fusese înșelat de gabaoniți, dar căpeteniile juraseră în Numele DOMNULUI că îi vor lăsa în viață. Când Gabaonul este atacat, Iosua nu tratează jurământul ca nul fiindcă fusese obținut prin vicleșug, ci merge să-i apere. DOMNUL îi spune să nu se teamă și îi dă coaliția în mâini. Poonen nu dezvoltă separat această scenă în transcriptul disponibil; aplicațiile spirituale folosesc doar tema lui declarată pentru întreaga carte: Canaanul ca imagine a luptei credinciosului împotriva păcatului, nu împotriva oamenilor.",
  historicalContext:
    "Coaliția îi cuprinde pe regii Ierusalimului, Hebronului, Iarmutului, Lachișului și Eglonului. Textul prezintă luptele drept parte din judecata canaaniților și din ocuparea țării de către Israel. Explicația nu transformă aceste campanii într-un model pentru război religios modern. În relatarea despre soare și lună, nu adăugăm un mecanism astronomic pe care autorul nu îl explică și nu folosim legende moderne despre o presupusă «zi pierdută» dovedită de știință. Afirmația biblică rămâne cea a narațiunii: DOMNUL a răspuns într-un mod extraordinar, iar ziua luptei a fost prelungită pentru Israel.",
  units: [
    {
      id: "iosua-10-1-15",
      ref: "Iosua 10:1-15",
      heading: "DOMNUL luptă pentru Israel — și ziua nu se grăbește să apună",
      text: iosuaPassage(10, 1, 15),
      teaching: teaching(
        "Adoni-Țedec, împăratul Ierusalimului, aude că Iosua a luat Aiul și că Gabaonul a făcut pace cu Israel. Pentru că Gabaonul era o cetate importantă și oamenii ei erau războinici, el cheamă încă patru împărați să o atace. Pacea cu Israel pune astfel Gabaonul imediat sub presiunea foștilor vecini.",
        "Gabaoniții îi cer lui Iosua să nu-i părăsească. Aici se vede greutatea jurământului din capitolul 9: chiar dacă Israel fusese înșelat când îl făcuse, nu se folosește de atac ca să scape convenabil de obligație. Iosua urcă în ajutorul lor, iar DOMNUL îi spune: «Nu te teme de ei, căci i-am dat în mâinile tale». Dumnezeu nu binecuvântează minciuna gabaoniților, dar lucrează în cadrul jurământului pe care Israel îl luase în Numele Lui.",
        "Victoria este atribuită repetat DOMNULUI. El îi pune pe vrăjmași în învălmășeală și aruncă asupra celor care fug pietre mari din cer; naratorul spune că mor mai mulți din cauza pietrelor decât de sabia israelită. Nu avem nevoie să transformăm grindina într-un fenomen banal tocmai acolo unde textul o prezintă ca intervenție a lui Dumnezeu în luptă.",
        "Apoi Iosua rostește înaintea lui Israel cuvintele către soare și lună. Textul spune că soarele s-a oprit, luna a stat și soarele «nu s-a grăbit să apună aproape o zi întreagă». Aceasta este afirmația pe care explicația trebuie s-o păstreze. Nu știm din pasaj mecanica fizică a minunii și nu trebuie să alegem între teorii despre rotația pământului, refracție, eclipsă sau limbaj poetic ca și cum una dintre ele ar fi fost revelată. Miracolul nu devine mai credibil dacă îi inventăm mecanismul.",
        "Naratorul însuși spune ce îl uimește cel mai mult: «n-a mai fost nicio zi ca aceea, nici înainte, nici după aceea, când DOMNUL să fi ascultat glasul unui om; căci DOMNUL lupta pentru Israel». Centrul teologic nu este puterea verbală a lui Iosua asupra cosmosului, ci Dumnezeul care ascultă și luptă pentru poporul Său.",
      ),
      explanationKind: "exposition",
      explanationSource: TEXTUAL_SOURCE,
      crossRefs: ["Iosua 9:15-20", "Habacuc 3:11", "Psalmul 18:12-14", "Iacov 5:16-18"],
      forYourHeart:
        "Nu ai nevoie să inventezi o explicație științifică pentru ca Dumnezeu să rămână Dumnezeu. Crede ce spune textul, roagă-te și lasă mecanismul unei minuni în mâna Celui care a făcut cerul și pământul.",
    },
    {
      id: "iosua-10-16-27",
      ref: "Iosua 10:16-27",
      heading: "Cei cinci împărați sub picioarele căpeteniilor",
      text: iosuaPassage(10, 16, 27),
      teaching: teaching(
        "Cei cinci împărați fug și se ascund într-o peșteră la Macheda. Iosua nu oprește întreaga urmărire pentru ei; blochează peștera, pune pază și trimite oastea mai departe după oamenii care fug. Este o decizie tactică din războiul relatat, nu o poruncă universală că orice lucrare trebuie «terminată» prin aceeași duritate.",
        "După întoarcerea oștirii, împărații sunt scoși, iar căpeteniile pun picioarele pe grumazurile lor. Gestul este unul de înfrângere și supunere a adversarului. Iosua îl folosește pentru a întări armata: «Nu vă temeți și nu vă înspăimântați; întăriți-vă și îmbărbătați-vă, căci așa va face DOMNUL tuturor vrăjmașilor voștri». Nu ascundem faptul că după aceea împărații sunt omorâți și spânzurați până seara.",
        "Poonen folosește întreaga cucerire a Canaanului ca imagine a credinciosului care pune la moarte poftele firii. În această cheie, imaginea vrăjmașului sub picioare poate sluji predicării biruinței asupra păcatului. Dar ținta Noului Legământ nu este omul din fața noastră. Efeseni 6 spune că lupta noastră nu este împotriva cărnii și sângelui, iar Romani 8:13 ne cheamă să omorâm prin Duhul faptele trupului.",
        "De aceea nu spunem unui creștin să imite execuția celor cinci regi asupra adversarilor săi. Aplicarea spirituală fidelă direcției lui Poonen este mult mai incomodă personal: nu-l zdrobi pe omul care te supără; zdrobește compromisul cu păcatul pe care îl cruți în tine.",
      ),
      explanationKind: "exposition",
      explanationSource: BOOK_TYPOLOGY_SOURCE,
      crossRefs: ["Romani 8:13", "Galateni 5:24", "Efeseni 6:12", "Romani 16:20"],
      forYourHeart:
        "Este mai ușor să visezi la înfrângerea vrăjmașilor tăi decât să porți războiul cu păcatul tău. Canaanul lui Poonen te trimite spre al doilea război, nu spre primul.",
    },
    {
      id: "iosua-10-28-43",
      ref: "Iosua 10:28-43",
      heading: "Campania din sud și judecata care nu trebuie cosmetizată",
      text: iosuaPassage(10, 28, 43),
      teaching: teaching(
        "Ultima parte a capitolului trece repede prin Macheda, Libna, Lachiș, Ghezer, Eglon, Hebron și Debir. Formula se repetă cu o severitate pe care explicația nu are voie s-o ascundă: cetăți sunt luate, regi sunt loviți și în mai multe locuri textul spune că nu este lăsat nimeni cu viață.",
        "Poonen explică judecata generală asupra canaaniților prin Geneza 15:16: Dumnezeu nu i-a nimicit în vremea lui Avraam, ci a așteptat până când nelegiuirea ajunsese la maturitatea judecății. El folosește imaginea dură a amputării unui membru cu gangrenă și spune «surgery, not murder». Nu îi înmuiem formularea doar fiindcă este grea.",
        "Dar păstrăm și restul argumentului lui Poonen. Dumnezeu nu a fost părtinitor cu Israel: când Israel și Iuda au persistat în păcate, au fost scoși la rândul lor din țară prin asirieni și babilonieni. Judecata din Iosua nu trebuie citită ca o teorie a superiorității etnice a Israelului.",
        "Și păstrăm limita aplicației sale creștine: Canaanul este pentru Poonen imaginea vieții de biruință în care poftele firii sunt omorâte una câte una. El nu transformă campania lui Iosua într-un mandat pentru creștini să ucidă oameni. Noul Testament mută războiul spre păcat, puteri spirituale și propria fire.",
        "Versetul final rezumă motivul victoriei lui Israel: «DOMNUL, Dumnezeul lui Israel, lupta pentru Israel». Nu strategia militară devine centrul explicației și nici cruzimea omului. Textul își revendică evenimentele ca judecată și război legate de o etapă precisă din istoria legământului.",
      ),
      explanationKind: "exposition",
      explanationSource: BOOK_TYPOLOGY_SOURCE,
      crossRefs: ["Geneza 15:16", "Levitic 18:24-30", "2 Împărați 17:6-18", "2 Cronici 36:15-20", "Romani 8:13", "Galateni 5:24"],
      forYourHeart:
        "Nu folosi judecata asupra Canaanului ca să-ți hrănești ura față de oameni. Lasă severitatea ei să te întrebe cât de serios iei păcatul pe care îl tolerezi în tine.",
    },
  ],
  prayer:
    "Doamne, credem că Tu ai luptat pentru Israel și nu vrem să micșorăm minunea sau judecata pe care textul le mărturisește. Păzește-ne însă să nu folosim războaiele legământului vechi ca scuză pentru ura noastră. Dă-ne credință să ne rugăm, curaj să ascultăm și necruțare față de păcatul din noi. Amin.",
  status: IOSUA_STATUSES[10],
})