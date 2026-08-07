import { numeriChapter, teaching } from "./numeriHelpers.js"
import { numeriPassage } from "./numeriText.js"
import { NUMERI_STATUSES } from "./numeriPublication.js"

/*
 * Cartea Numeri, explicată pe unități de sens.
 *
 * Textul biblic: păstrat separat în numeriText.ts (fișierele numeriTextN.ts).
 * Explicația: scrisă pentru Emanus după cercetarea textului. Nu se copiază
 * formularea niciunui predicator sau comentator.
 */

export const NUMERI_12 = numeriChapter({
  number: 12,
  title: "Numeri 12 — Maria și Aaron împotriva lui Moise",
  summary:
    "Maria și Aaron, sora și fratele lui Moise, se ridică împotriva autorității lui unice, sub pretextul soției cușite. DOMNUL coboră în stâlpul de nor și apără locul singular al lui Moise între proroci. Maria rămâne leproasă, Aaron se pocăiește, Moise mijlocește, iar tabăra așteaptă șapte zile înainte de a porni mai departe.",
  literaryContext:
    "După cârtirea poporului din capitolul unsprezece, capitolul doisprezece aduce cârtirea înăuntrul chiar a familiei conducătoare. Este cel mai apropiat atac asupra lui Moise de până acum — nu venit din partea unei mulțimi anonime, ci din partea fratelui și surorii lui, care conduseseră alături de el încă de la ieșirea din Egipt.",
  historicalContext:
    "Femeia cușită pomenită aici rămâne un subiect discutat: unii o identifică drept Sefora, soția madianită a lui Moise, poate numită astfel după regiunea de origine; alții cred că este vorba de o a doua soție. Fie care ar fi identitatea ei exactă, textul arată limpede că obiecția adusă nu era motivul real al conflictului, ci doar pretextul pentru o contestare mai adâncă a autorității unice a lui Moise.",
  units: [
    {
      id: "numeri-12-1-3",
      ref: "Numeri 12:1-3",
      heading: "„Nu vorbește El oare și prin noi?”",
      text: numeriPassage(12, 1, 3),
      teaching: teaching(
        "Maria și Aaron „au vorbit împotriva lui Moise din pricina femeii cușite”, dar chiar versetul următor dezvăluie adevărata lor nemulțumire: „oare numai prin Moise vorbește DOMNUL? Nu vorbește El oare și prin noi?” Pretextul familial ascundea o râvnă pentru autoritate egală cu a lui Moise.",
        "În ebraică, verbul folosit pentru „au vorbit” este la forma feminină, sugerând că Maria a fost inițiatoarea, cu Aaron urând-o. Numele ei apare întotdeauna înaintea lui Aaron în acest capitol, o inversare a ordinii obișnuite care sprijină această observație.",
        "Versetul trei întrerupe firul narativ cu o observație despre Moise: „era un om foarte blând, mai blând decât orice om de pe fața pământului”. Această note explică de ce Moise nu răspunde el însuși acuzației; lăsa întreaga apărare în mâna DOMNULUI.",
      ),
      words: [
        {
          original: "וַתְּדַבֵּר מִרְיָם וְאַהֲרֹן",
          transliteration: "vatedaber Miryam ve-Aharon",
          language: "ebraica",
          meaning:
            "Maria și Aaron au vorbit. Forma verbală feminină („vatedaber”) arată că Maria conducea acuzația, chiar dacă numele ei este pomenit primul în text.",
        },
      ],
      crossRefs: ["Exod 15:20-21", "Mica 6:4", "Galateni 6:3"],
      forYourHeart:
        "Un pretext familial sau personal poate ascunde adesea o râvnă pentru poziție și recunoaștere. Verifică ce se ascunde cu adevărat sub o nemulțumire aparent minoră.",
    },
    {
      id: "numeri-12-4-9",
      ref: "Numeri 12:4-9",
      heading: "Gură către gură: locul unic al lui Moise",
      text: numeriPassage(12, 4, 9),
      teaching: teaching(
        "DOMNUL cheamă imediat pe toți trei „la Cortul Întâlnirii” și Se coboară în stâlpul de nor pentru a le vorbi direct — un semn al gravității momentului. Chiar dacă acuzația fusese împotriva lui Moise, DOMNUL îi cheamă pe Aaron și pe Maria să se apropie pentru mustrare.",
        "Explicația DOMNULUI arată o distincție fundamentală: cu un proroc obișnuit, DOMNUL Se face cunoscut „într-o vedenie” sau „într-un vis” — mijloace indirecte. Cu Moise, DOMNUL vorbește „gură către gură, lămurit, nu prin pilde”, iar Moise „vede chipul DOMNULUI”. Nu este vorba de o superioritate personală a lui Moise, ci de un rol unic pe care DOMNUL Însăși i l-a dat.",
        "Întrebarea finală — „cum de nu v-ați temut să vorbiți împotriva robului Meu?” — arată că atacul asupra lui Moise era, în fond, un atac asupra autorității DOMNULUI care îl trimisese. Cine se ridică împotriva unui slujitor rânduit de Dumnezeu se ridică, fără să vrea, împotriva Celui care l-a trimis.",
      ),
      words: [
        {
          original: "פֶּה אֶל־פֶּה",
          transliteration: "peh el-peh",
          language: "ebraica",
          meaning:
            "gură către gură. Expresia denotă comunicare directă și nemijlocită, fără vedenii sau simboluri de dezlegat, un privilegiu unic acordat lui Moise între toți prorocii Vechiului Legământ.",
        },
      ],
      crossRefs: ["Exod 33:11", "Deuteronom 34:10", "Evrei 3:1-6"],
      forYourHeart:
        "Rolul pe care Dumnezeu ți-l dă nu este întotdeauna identic cu al altcuiva; a-l contesta pe celălalt din invidie înseamnă a contesta însuși pe Cel care a rânduit rolurile.",
    },
    {
      id: "numeri-12-10-13",
      ref: "Numeri 12:10-13",
      heading: "Maria leproasă, Aaron se pocăiește, Moise mijlocește",
      text: numeriPassage(12, 10, 13),
      teaching: teaching(
        "Când norul se depărtează, „Maria era leproasă, albă ca zăpada”. Doar ea este lovită, nu și Aaron, sprijinând ideea că ea fusese inițiatoarea răzvrătirii. Poate și pentru că Aaron, ca mare preot, nu putea fi făcut necurat printr-o boală pe care ar fi trebuit el însuși să o diagnosticheze la alții.",
        "Aaron recunoaște imediat greșeala, numărându-se pe sine și pe Maria împreună: „nu ne pune în cârcă păcatul pe care l-am făcut cu nebunie”. Cererea lui către Moise — numindu-l „stăpânul meu”, deși este fratele lui mai mare — arată o smerenie totală, foarte diferită de tonul din începutul capitolului.",
        "Moise, care nu răspunsese pentru sine la acuzație, se roagă imediat pentru sora care îl atacase: „O, Dumnezeule, vindecă-o, Te rog!” Cea mai scurtă rugăciune înregistrată în Scriptură este rostită de un om care avea toate motivele să tacă, dar alege să mijlocească.",
      ),
      words: [],
      crossRefs: ["Levitic 13:1-3", "Matei 5:44", "1 Petru 3:9"],
      forYourHeart:
        "O rugăciune scurtă, rostită pentru cel care te-a rănit, poate valora mai mult decât o apărare îndelungată a propriei dreptăți.",
    },
    {
      id: "numeri-12-14-16",
      ref: "Numeri 12:14-16",
      heading: "Șapte zile afară din tabără, apoi pornirea",
      text: numeriPassage(12, 14, 16),
      teaching: teaching(
        "Răspunsul DOMNULUI îmbină mila și disciplina: Maria nu rămâne leproasă pentru totdeauna, dar trebuie să poarte șapte zile rușinea, la fel cum ar fi purtat-o dacă „tatăl ei ar fi scuipat-o în față” — o comparație cu cea mai umilitoare mustrare publică cunoscută în familie.",
        "Un detaliu remarcabil încheie episodul: „poporul nu a pornit până ce nu a fost primită din nou Maria”. Întreaga tabără, sute de mii de oameni, așteaptă șapte zile pentru o singură femeie. Comunitatea nu abandonează pe cel disciplinat; îl așteaptă să se întoarcă întreg înainte de a merge mai departe.",
        "Capitolul se încheie simplu, cu tabăra pornind spre pustia Paran — exact locul unde, în capitolul următor, doisprezece iscoade vor fi trimise să cerceteze țara făgăduită.",
      ),
      words: [],
      crossRefs: ["Deuteronom 24:9", "Galateni 6:1-2", "2 Corinteni 2:6-7"],
      forYourHeart:
        "Disciplina lui Dumnezeu are un scop și un sfârșit; o comunitate sănătoasă așteaptă restaurarea celui disciplinat, nu îl abandonează pe drum.",
    },
  ],
  prayer:
    "Doamne, păzește-mă de râvna ascunsă sub pretexte mici, care contestă în taină locul pe care Tu l-ai dat altcuiva.\n\nÎnvață-mă blândețea lui Moise, care nu s-a apărat singur, și mijlocirea lui, care s-a rugat imediat pentru cea care îl atacase.\n\nDă-mi smerenia lui Aaron de a recunoaște repede o greșeală, fără să caut scuze pentru ea.\n\nȘi învață-mă să aștept, alături de comunitatea Ta, restaurarea celor disciplinați, în loc să-i las în urmă. Amin.",
  status: NUMERI_STATUSES[12],
})
