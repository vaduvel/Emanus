import { iosuaChapter, teaching } from "./iosuaHelpers.js"
import { iosuaPassage } from "./iosuaText.js"
import { IOSUA_STATUSES } from "./iosuaPublication.js"

export const IOSUA_13 = iosuaChapter({
  number: 13,
  title: "Iosua 13 — Pământul rămas și moștenirea de la răsărit de Iordan",
  summary:
    "Iosua, acum înaintat în vârstă, primește porunca DOMNULUI de a împărți țara ca moștenire, deși mai rămâne pământ necucerit. Capitolul reamintește moștenirea celor două seminții și jumătate așezate deja la răsărit de Iordan, sub Moise.",
  literaryContext:
    "Acesta este începutul celei de-a doua părți a cărții (cap. 13-21), dedicată împărțirii pământului între seminții. Tonul se schimbă de la naraiune militară dinamică la un registru administrativ-geografic, la fel de important teologic: promisiunea făcută patriarhilor prinde formă concretă, măsurabilă.",
  historicalContext:
    "Deși campaniile militare majore se încheiaseră, rămâneau încă zone necucerite — ținutul filistenilor, regiunea gheșuriților, Liban — pe care generațiile următoare vor trebui să le cucerească treptat, o realitate recunoscută deschis în text.",
  units: [
    {
      id: "iosua-13-1-7",
      ref: "Iosua 13:1-7",
      heading: "Porunca de a împărți țara, chiar cu pământ rămas necucerit",
      text: iosuaPassage(13, 1, 7),
      teaching: teaching(
        "DOMNUL îi spune lui Iosua, „înaintat în vârstă”: „mai rămâne o țară foarte mare de împărțit”, enumerând regiunile filistenilor, gheșuriților și altele încă necucerite. Onestitatea textului — recunoașterea că lucrarea nu este completă — este remarcabilă într-o carte a biruinței.",
        "Porunca este totuși să se împartă țara „ca moștenire” chiar înainte de cucerirea deplină: „Eu î-i voi izgoni dinaintea fiilor lui Israel; dă numai țara aceasta prin sorți ca moștenire lui Israel, cum ți-am poruncit”. Credința trebuie să primească moștenirea prin promisiune înainte de a o vedea deplin împlinită.",
        "Această tensiune — țară promisă, dar nu în întregime cucerită — va rămâne o temă constantă în cărțile următoare (Judecători), arătând că împlinirea deplină a promisiunilor lui Dumnezeu are adesea o componentă „deja, dar nu încă”.",
      ),
      crossRefs: ["Judecători 1:1-3", "Evrei 11:39-40"],
      forYourHeart:
        "Poți primi prin credință o moștenire pe care nu ai luat-o încă în deplină stăpânire; Dumnezeu împlinește promisiunile Lui în etape.",
    },
    {
      id: "iosua-13-8-33",
      ref: "Iosua 13:8-33",
      heading: "Reamintirea moștenirii celor două seminții și jumătate",
      text: iosuaPassage(13, 8, 33),
      teaching: teaching(
        "Textul reia detaliat teritoriul primit deja de rubeniți, gadiți și jumătatea seminției lui Manase la răsărit de Iordan, sub Moise — confirmarea acestei moșteniri anterioare înainte de a trece la împărțirea pământului de la apus de Iordan.",
        "Se menționează din nou că leviții nu primesc moștenire de pământ: „jertfele mistuite de foc înaintea DOMNULUI, Dumnezeul lui Israel, iată care este moștenirea lui”. Leviții trăiesc din slujirea la altar, nu din pământ propriu — un principiu repetat de trei ori în acest capitol.",
        "Detaliul geografic minuțios — orașe, văi, munți, hotare — arată că promisiunile lui Dumnezeu nu sunt vagi sau generale, ci concrete și măsurabile, capabile să fie înregistrate și verificate de generațiile următoare.",
      ),
      crossRefs: ["Numeri 32:1-42", "Deuteronom 18:1-2"],
      forYourHeart:
        "Slujirea înaintea lui Dumnezeu poate fi ea însăși o moștenire mai prețioasă decât orice bun pământesc.",
    },
  ],
  prayer:
    "Doamne, învață-ne să primim prin credință promisiunile Tale, chiar înainte de a le vedea împlinite în întregime.\n\nMulțumim că făgăduințele Tale sunt concrete și sigure, nu vagi sau nesigure.\n\nAjută-ne să prețuim slujirea înaintea Ta mai mult decât orice bun pământesc.\n\nȘi dă-ne răbdare în etapele împlinirii planului Tău pentru viața noastră. Amin.",
  status: IOSUA_STATUSES[13],
})
