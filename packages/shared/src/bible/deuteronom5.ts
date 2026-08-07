import { deuteronomChapter, teaching } from "./deuteronomHelpers.js"
import { deuteronomPassage } from "./deuteronomText.js"
import { DEUTERONOM_STATUSES } from "./deuteronomPublication.js"

/*
 * Cartea Deuteronom, explicată pe unități de sens.
 */

export const DEUTERONOM_5 = deuteronomChapter({
  number: 5,
  title: "Deuteronom 5 — Decalogul rostit din nou, pentru o generație nouă",
  summary:
    "Moise adună tot Israelul și repetă Cele Zece Porunci date la Horeb, amintind fricii și cererii poporului ca el să fie mijlocitor între ei și DOMNUL. Capitolul se încheie cu chemarea de a merge în toate poruncile lui Dumnezeu, „ca să vă fie bine”.",
  literaryContext:
    "Aceasta este a doua rostire a Decalogului din Scriptură, după cea din Exod 20. Deosebirile mici dintre cele două versiuni — mai ales la porunca Sabatului — arată că aceeași lege este predicată din nou, cu accente potrivite unei generații care se pregătește să intre în țară, nu doar copiată mecanic.",
  historicalContext:
    "Generația căreia i se adresează Moise nu era, În mare parte, prezentă la Horeb ca adulți; mulți erau copii sau nu se născuseră Încă. Totuși Moise le spune: „DOMNUL a făcut acest legămînt cu noi, cu toți cei care sunt aici astăzi”, arătînd că legămîntul se Împropriază de fiecare generație, nu doar de cea care l-a văzut cu ochii.",
  units: [
    {
      id: "deuteronom-5-1-5",
      ref: "Deuteronom 5:1-5",
      heading: "Un legămînt însușit, nu doar auzit",
      text: deuteronomPassage(5, 1, 5),
      teaching: teaching(
        "Moise deschide capitolul cu o chemare la atenție deplină: „Ascultă, Israel, Învățăturile și poruncile pe care vi le spun astăzi, ca să le Învățați și să le păziți și să le faceți”. Trei verbe În șir — a Învăța, a păzi, a face — arată că ascultarea adevărată trece dincolo de cunoaștere spre păzire și Înfăptuire.",
        "Versetul 3 este surprinzător de direct: „DOMNUL n-a făcut acest legămînt numai cu părinții noștri, ci cu noi toți care suntem aici astăzi și suntem În viață”. Legămîntul de la Horeb nu este o istorie Îndepărtată pentru generația nouă; este propriul lor legămînt, la fel cum rămîne și pentru cei ce citesc acum aceste cuvinte.",
      ),
      words: [
        {
          original: "שמע ישראל",
          transliteration: "shema Yisrael",
          language: "ebraica",
          meaning:
            "Ascultă, Israel. Formula de chemare la atenție deplină, care va deveni celebră mai ales prin repetarea ei În Deuteronom 6:4.",
        },
      ],
      crossRefs: ["Exod 19:5-6", "Deuteronom 6:4", "Evrei 8:8-10"],
      forYourHeart:
        "Legămîntul lui Dumnezeu nu este o poveste veche pentru tine; este chiar legămîntul tău, astăzi.",
    },
    {
      id: "deuteronom-5-6-10",
      ref: "Deuteronom 5:6-10",
      heading: "Niciun alt dumnezeu, niciun chip cioplit",
      text: deuteronomPassage(5, 6, 10),
      teaching: teaching(
        "Prima poruncă se întemeiază pe un fapt istoric, nu pe o cerere abstractă: „Eu sunt DOMNUL, Dumnezeul tău, care te-am scos din țara Egiptului, din casa robiei”. Ascultarea nu este cerută de un stăpîn necunoscut, ci de Cel care a izbăvit deja poporul.",
        "Interzicerea chipurilor cioplite este direct legată de gelozia lui Dumnezeu, deja explicată În capitolul precedent. Pedeapsa se Întinde „pînă la al treilea și al patrulea neam”, dar mila „pînă la al miilea neam” celor ce iubesc pe Dumnezeu și păzesc poruncile Lui — disproportia arată că mila DOMNULUI Întrece cu mult mînia Lui.",
      ),
      words: [
        {
          original: "אל קנא",
          transliteration: "El qana",
          language: "ebraica",
          meaning:
            "Dumnezeu gelos. Aceeași rădăcină ca În Deuteronom 4:24; gelozia lui Dumnezeu este rîvna dreaptă a unui legămînt exclusiv, nu o pornire omenească.",
        },
      ],
      crossRefs: ["Exod 20:2-6", "Deuteronom 4:23-24", "Ioan 14:15"],
      forYourHeart:
        "Ascultarea ta nu este cerută de un străin; este răspunsul firesc către Cel care te-a izbăvit deja.",
    },
    {
      id: "deuteronom-5-11-15",
      ref: "Deuteronom 5:11-15",
      heading: "Numele DOMNULUI, și odihna care amintește de robie",
      text: deuteronomPassage(5, 11, 15),
      teaching: teaching(
        "Porunca despre Numele DOMNULUI oprește folosirea lui în deșert, „căci DOMNUL nu va lăsa nepedepsit pe cel ce va lua în deșert Numele Lui”. Numele lui Dumnezeu nu este o formulă magică sau o expresie oarecare; el poartă aceeași sfințenie ca și Persoana pe care o numește.",
        "Porunca Sabatului aici are un temei diferit de cel din Exod 20:11 (odihna lui Dumnezeu la creație): „amintește-ți că ai fost rob În țara Egiptului și DOMNUL... te-a scos de acolo”. Sabatul din Deuteronom este învățat ca amintire a eliberării din robie — odihna dată unui popor de sclavi care nu avea niciodată odihnă.",
        "Porunca include expres „robul tău, roaba ta... ca și tine” și vitele: odihna Sabatului nu este un privilegiu al stăpînilor, ci un dar care se întinde peste toată casa și peste toți cei care muncesc În ea.",
      ),
      words: [
        {
          original: "וזכרתא כי-עבד הייתא",
          transliteration: "vezakharta ki-eved hayita",
          language: "ebraica",
          meaning:
            "și îamintește-ți că ai fost rob. Temeiul special al Sabatului În Deuteronom: odihna ca amintire practică a eliberării din robie.",
        },
      ],
      crossRefs: ["Exod 20:8-11", "Exod 20:2", "Deuteronom 15:15"],
      forYourHeart:
        "Odihna ta nu este doar un drept câștigat; este o amintire a eliberării pe care ai primit-o gratuit de la Dumnezeu.",
    },
    {
      id: "deuteronom-5-16-21",
      ref: "Deuteronom 5:16-21",
      heading: "De la cinstirea părinților la stăpînirea poftei",
      text: deuteronomPassage(5, 16, 21),
      teaching: teaching(
        "Poruncile despre om În legătură cu semenul lui Încep chiar În casă: „Cinstește pe tatăl tău și pe mama ta... ca să-ți fie bine și să trăiești multă vreme”. Aceasta este singura poruncă din Decalog legată direct de o făgăduință, semn al importanței ei pentru Întreaga structură socială.",
        "Interzicerile care urmează — crima, adulterul, furtul, mărturia mincinoasă — protejează viața, căsnicia, avutul și adevărul În ordinea socială a legămîntului. Ultima poruncă, Împotriva poftei, se întinde În interiorul omului Însăși: nu doar fapta, ci dorința nesăturată este oprită.",
      ),
      words: [
        {
          original: "לא תחמד",
          transliteration: "lo tachmod",
          language: "ebraica",
          meaning:
            "să nu poftești. Unica poruncă din Decalog care nu vizează o faptă exterioară, ci starea lăuntrică a inimii însuși.",
        },
      ],
      crossRefs: ["Exod 20:12-17", "Efeseni 6:1-3", "Romani 7:7"],
      forYourHeart:
        "Legea lui Dumnezeu nu se oprește la faptă; ea ajunge la rădăcina dorinței din inima ta.",
    },
    {
      id: "deuteronom-5-22-27",
      ref: "Deuteronom 5:22-27",
      heading: "O frică care cere un mijlocitor",
      text: deuteronomPassage(5, 22, 27),
      teaching: teaching(
        "Poporul Îiși amintește propria lor spaimă la Horeb: „DOMNUL, Dumnezeul nostru, ne-a arătat mărirea Lui... noi am auzit glasul Lui din mijlocul focului”, și au tras concluzia „cine dintre oameni... ar putea să trăiască?”. Prezența nemijlocită a lui Dumnezeu era prea înfricoșătoare de îndurat.",
        "De aceea poporul cere: „Du-te tu și ascultă tot ce-ți va spune DOMNUL, Dumnezeul nostru, și spune-ne-l tu înapoi”. Nevoia unui mijlocitor Între un Dumnezeu sfînt și un popor care nu poate purta prezența Lui directă este recunoscută chiar de popor, și pregătește calea pentru întărirea slujbei preoțești și, mai tîrziu, pentru Mijlocitorul deplin.",
      ),
      words: [
        {
          original: "מ֪וך האש",
          transliteration: "mitokh ha-esh",
          language: "ebraica",
          meaning:
            "din mijlocul focului. Descrie locul de unde a auzit Israel glasul DOMNULUI la Horeb, repetat de mai multe ori În aceste capitole.",
        },
      ],
      crossRefs: ["Exod 20:18-19", "Evrei 12:18-21", "1 Timotei 2:5"],
      forYourHeart:
        "Nevoia unui mijlocitor Între tine și sfințenia lui Dumnezeu nu este slăbiciune; este smerenie recunoscută corect.",
    },
    {
      id: "deuteronom-5-28-33",
      ref: "Deuteronom 5:28-33",
      heading: "O inimă dorită, și o cale de urmat",
      text: deuteronomPassage(5, 28, 33),
      teaching: teaching(
        "DOMNUL primește cererea poporului și o numește bună: „Au spus bine tot ce ți-au spus”. Dar apoi rostirea Lui deschide o dorință mai profundă, spusă aproape ca un suspin: „O, de-ar avea ei mereu o inimă ca aceasta, ca să se teamă de Mine și să păzească poruncile Mele!”. Frica sfîntă de la Horeb era autentică, dar Dumnezeu știa deja că nu va ține.",
        "Capitolul se Încheie cu o chemare simplă și hotărîtoare: „să meargă pe toată calea pe care v-a poruncit-o DOMNUL, Dumnezeul vostru, ca să trăiți și să vă fie bine”. Nu există abatere în dreapta sau În stînga; calea legămîntului este una singură, dată pentru binele celor care o urmează.",
      ),
      words: [
        {
          original: "מי-יתן והיה לבבם זה",
          transliteration: "mi-yiten vehaya levavam ze",
          language: "ebraica",
          meaning:
            "o, de-ar fi/de-ar da cineva ca inima lor să fie aceasta. Expresie de dorință profundă, arătînd că statornicia inimii, nu doar frica de o clipă, este ceea ce dorește Dumnezeu.",
        },
      ],
      crossRefs: ["Deuteronom 29:4", "Ieremia 31:33", "Ezechiel 36:26-27"],
      forYourHeart:
        "Dumnezeu nu se satură cu o frică de o clipă; dorește o inimă statornică, care să-L urmeze pe deplin, mereu.",
    },
  ],
  prayer:
    "Doamne, Tu ne-ai izbăvit Înainte de a ne cere ascultarea; ajută-ne să răspundem din recunoștință, nu din frică goală.\n\nDă-ne o inimă statornică, nu doar o înfricoșare trecătoare În fața sfințeniei Tale.\n\nÎnvață-ne să păstrăm odihna Ta ca pe o amintire a eliberării, nu ca pe o povară.\n\nȘi ține-ne pe calea pe care ne-ai poruncit-o, fără abatere în dreapta sau În stînga. Amin.",
  status: DEUTERONOM_STATUSES[5],
})
