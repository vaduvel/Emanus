import { deuteronomChapter, teaching } from "./deuteronomHelpers.js"
import { deuteronomPassage } from "./deuteronomText.js"
import { DEUTERONOM_STATUSES } from "./deuteronomPublication.js"

/*
 * Cartea Deuteronom, explicată pe unități de sens.
 */

export const DEUTERONOM_22 = deuteronomChapter({
  number: 22,
  title: "Deuteronom 22 — Grijă pentru aproapele, ordine în creație, curatăție în familie",
  summary:
    "Moise cere grijă activă pentru bunurile rătăcite ale fratelui, interzice amestecurile nefirești între genuri, specii și materiale, și reglementează acuzațiile de necurățenie și relațiile sexuale interzise, cu accent pe protejarea celui vulnerabil și pedepsirea celui care exploatează.",
  literaryContext:
    "Acest capitol trece de la legile familiale din capitolul 21 la o serie mai largă de legi de ordine socială și morală, unind grija practică pentru bunurile aproapelui cu principii mai profunde despre păstrarea distincțiilor puse de Dumnezeu în creație.",
  historicalContext:
    "Multe dintre aceste legi — amestecul semințelor, jugul mixt, țesătura mixtă — aveau probabil o legătură cu practicile de fertilitate păgâne din Canaan, care încercau să manipuleze forțele naturii prin ritualuri de amestecare simbolică.",
  units: [
    {
      id: "deuteronom-22-1-4",
      ref: "Deuteronom 22:1-4",
      heading: "Grijă activă pentru bunul rătăcit al fratelui",
      text: deuteronomPassage(22, 1, 4),
      teaching: teaching(
        "Legea interzice indiferența față de bunurile pierdute ale altuia: „să nu te prefaci că nu le vezi, ci să i le duci neapărat fratelui tău”. Această poruncă se aplică la animale rătăcite, haine pierdute, și orice alt bun, indiferent dacă proprietarul este cunoscut sau nu.",
        "Grija se extinde și la animalul căzut pe drum: „să-i ajuți neapărat să se ridice”. Legea nu acceptă pasivitatea morală — a vedea o nevoie și a trece pe lângă ea fără să intervii este și el un fel de nedreptate.",
      ),
      words: [
        {
          original: "לא תתעלם",
          transliteration: "lo tit'alam",
          language: "ebraica",
          meaning:
            "să nu te prefaci că nu vezi/să nu te ascunzi. Termenul descrie exact tentativa de a evita responsabilitatea morală prin ignorarea deliberată a nevoii văzute.",
        },
      ],
      crossRefs: ["Exod 23:4-5", "Luca 10:30-37", "Iacov 2:15-16"],
      forYourHeart:
        "Nu te preface că nu vezi nevoia de alături; grija activă pentru bunul aproapelui este poruncă, nu opțiune.",
    },
    {
      id: "deuteronom-22-5-12",
      ref: "Deuteronom 22:5-12",
      heading: "Fără amestecuri nefirești, ordinea din creație păzită",
      text: deuteronomPassage(22, 5, 12),
      teaching: teaching(
        "O serie de legi păzesc distincțiile puse de Dumnezeu în creație: îmbrăcămintea specifică fiecărui gen, cuibul păsării cruțat când mama stă pe pui, boul și măgarul care nu se înhamă împreună la jug — două specii cu forță diferită nu trebuie înjugate laolaltă.",
        "Semințele mixte în vie, țesătura din lână și in împreună, sunt interzise, pe când ciucurii la cele patru colțuri ale hainei sunt porunciți ca amintire permanentă. Aceste legi, dincolo de aplicația lor practică, învață pe Israel să respecte categoriile pe care Dumnezeu le-a stabilit în lumea creată.",
      ),
      words: [
        {
          original: "לא תמצאתוום",
          transliteration: "lo tikach ha'em al habanim",
          language: "ebraica",
          meaning:
            "să nu iei mama împreună cu puii. Formula păstrată exact ca lege a compasiunii față de creație — chiar prinderea unei păsări respectă legătura de îngrijire părintească.",
        },
      ],
      crossRefs: ["Leviticul 19:19", "1 Corinteni 11:14-15", "Numeri 15:38-39"],
      forYourHeart:
        "Ordinea pe care Dumnezeu a pus-o în creație — în genuri, în specii, în categorii — nu este întâmplătoare; păzirea ei este și ea o formă de ascultare.",
    },
    {
      id: "deuteronom-22-13-21",
      ref: "Deuteronom 22:13-21",
      heading: "Acuzația de necurățenie, cercetată cu dovezi",
      text: deuteronomPassage(22, 13, 21),
      teaching: teaching(
        "Când un bărbat acuză fals nevasta proaspăt căsătorită de necuratenie, tatăl fetei poate prezenta dovezi concrete înaintea bătrânilor cetății. Dacă acuzația este dovedită falsă, bărbatul este pedepsit, plătește o amendă, și nu poate niciodată s-o alunge — minciuna care ar fi ruinat viața fetei este pedepsită sever.",
        "Dacă acuzația este însă adevărată, pedeapsa cade asupra fetei, pentru că „a săvârșit o faptă de rușine în Israel”. Legea antică protejează astfel integritatea legământului căsătoriei, dar cere și dovezi solide, nu doar afirmații, înainte de a aplica pedeapsa cea mai gravă.",
      ),
      words: [
        {
          original: "והוציאו את-בתולי הנערה",
          transliteration: "vehotzi'u et-betulei hana'arah",
          language: "ebraica",
          meaning:
            "să aducă semnele fecioriei fetei. Formula legală pentru procedura de apărare împotriva unei acuzații false, care necesită dovadă concretă, nu doar cuvântul acuzatorului.",
        },
      ],
      crossRefs: ["Deuteronom 24:1", "Matei 1:19", "1 Timotei 5:19"],
      forYourHeart:
        "Acuzațiile grave care pot distruge o viață merită cercetare temeinică și dovezi, nu doar cuvinte aruncate cu ușurință.",
    },
    {
      id: "deuteronom-22-22-27",
      ref: "Deuteronom 22:22-27",
      heading: "Adulter și logodnică violată, dreptatea față de victimă",
      text: deuteronomPassage(22, 22, 27),
      teaching: teaching(
        "Adulterul consensual este pedepsit egal pentru amândoi participanții. Dar legea face o distincție morală esențială între logodnica găsită în cetate — unde absența strigătului ei este considerată relevantă — și cea găsită pe câmp, izolată, unde forța este evidentă și doar agresorul este pedepsit.",
        "Explicația dată este remarcabil de sensibilă pentru vremea ei: „fata n-a săvârșit niciun păcat vrednic de moarte; căci este ca și cum un om s-ar ridica împotriva aproapelui său și l-ar omorâ”. Victima violului nu este făcută responsabilă pentru agresiunea suferită.",
      ),
      words: [
        {
          original: "ואין מושיע לה",
          transliteration: "ve'ein moshia lah",
          language: "ebraica",
          meaning:
            "și nu era nimeni să o scape. Fraza care justifică nevinovăția deplină a fetei atacate pe câmp — izolarea ei fără ajutor este dovada forței folosite împotriva ei.",
        },
      ],
      crossRefs: ["Deuteronom 21:14", "Leviticul 20:10", "2 Samuel 13:12-14"],
      forYourHeart:
        "Dreptatea adevărată distinge cu grijă între vinovăție și victimizare; nu toată suferința este vină.",
    },
    {
      id: "deuteronom-22-28-30",
      ref: "Deuteronom 22:28-30",
      heading: "Fecioara neangajată, și interdicția incestului",
      text: deuteronomPassage(22, 28, 30),
      teaching: teaching(
        "Pentru fata fecioară neangajată, bărbatul care se culcă cu ea trebuie să plătească tatălui și să o ia de nevastă permanent, „pentru că a smerit-o”, fără dreptul de a o alunga vreodată. Legea nu permite exploatarea urmată de abandon.",
        "Capitolul se încheie cu interdicția absolută a incestului cu nevasta tatălui: „un om să nu ia pe nevasta tatălui său”. Această graniță fundamentală protejează structura familială de la cea mai profundă formă de trădare posibilă.",
      ),
      words: [
        {
          original: "לא-יגלה כנף אביו",
          transliteration: "lo yigleh knaf aviv",
          language: "ebraica",
          meaning:
            "să nu descopere/dea la o parte poala/învelitoarea tatălui său. Expresie eufemistică ebraică pentru interzicerea absolută a relației sexuale cu nevasta tatălui.",
        },
      ],
      crossRefs: ["Leviticul 18:8", "1 Corinteni 5:1", "Geneza 35:22"],
      forYourHeart:
        "Anumite granițe familiale nu sunt negociabile; încălcarea lor rupe fundamentul de încredere al întregii familii.",
    },
  ],
  prayer:
    "Doamne, învață-ne să nu ne prefacem că nu vedem nevoia aproapelui, ci să intervenîm cu grijă activă.\n\nAjută-ne să respectăm ordinea pe care ai pus-o în creație, fără să o amestecăm nesăbuit.\n\nDă-ne înțelepciune să cercetăm temeinic acuzațiile grave, și milă față de cei victimizați fără vină.\n\nȘi păzește-ne familiile de trădare, în cele mai intime legături de încredere. Amin.",
  status: DEUTERONOM_STATUSES[22],
})
