import { iosuaChapter, teaching } from "./iosuaHelpers.js"
import { iosuaPassage } from "./iosuaText.js"
import { IOSUA_STATUSES } from "./iosuaPublication.js"

export const IOSUA_18 = iosuaChapter({
  number: 18,
  title: "Iosua 18 — Pământul rămas și teritoriul lui Beniamin",
  summary:
    "Adunarea lui Israel se strânge la Silo, unde este așezat cortul întâlnirii. Iosua mustră cele șapte seminții care încă nu și-au luat moștenirea în stăpânire și organizează o cercetare a pământului rămas, apoi teritoriul lui Beniamin este descris detaliat.",
  literaryContext:
    "Mutarea cortului întâlnirii la Silo marchează un moment central: locul de închinare devine stabil în mijlocul țării, semn că procesul de așezare a poporului în țara promisă este bine înaintat.",
  historicalContext:
    "Silo, situat în centrul țării, în teritoriul lui Efraim, va rămâne locul cortului întâlnirii timp de generații, până în vremea lui Samuel, fiind un loc central de pelerinaj și închinare pentru întregul Israel.",
  units: [
    {
      id: "iosua-18-1-10",
      ref: "Iosua 18:1-10",
      heading: "Cortul întâlnirii la Silo și cercetarea pământului rămas",
      text: iosuaPassage(18, 1, 10),
      teaching: teaching(
        "„Toată adunarea copiilor lui Israel s-a strâns la Silo și au așezat acolo cortul întâlnirii. Țara era supusă înaintea lor.” Stabilirea unui loc central de închinare marchează trecerea de la o viață de tabără militară la o viață organizată în țara promisă.",
        "Iosua mustră direct cele șapte seminții rămase: „până când vă veți lenevi (întârzia) să mergeți să luați în stăpânire țara pe care v-a dat-o DOMNUL, Dumnezeul părinților voștri?”. Moștenirea promisă de Dumnezeu tot mai cere inițiativă și acțiune umană pentru a fi luată în stăpânire efectivă.",
        "Se organizează o echipă de bărbați care să cutreiere țara și s-o împartă în șapte părți scrise într-o carte, iar apoi Iosua aruncă sorțul „înaintea DOMNULUI, la Silo” — procesul rămâne consacrat, nu doar administrativ.",
      ),
      crossRefs: ["1 Samuel 1:3", "Ieremia 7:12"],
      forYourHeart:
        "Nu amâna luarea în stăpânire a binecuvântărilor pe care Dumnezeu ți le-a promis deja; lenevia spirituală poate ține departe o moștenire deja dată.",
    },
    {
      id: "iosua-18-11-28",
      ref: "Iosua 18:11-28",
      heading: "Teritoriul și cetățile lui Beniamin",
      text: iosuaPassage(18, 11, 28),
      teaching: teaching(
        "Seminția lui Beniamin primește un teritoriu situat strategic între Iuda, la sud, și fiii lui Iosif, la nord — o poziție geografică mică, dar centrală, care va deveni importantă în istoria de mai târziu a lui Israel.",
        "Printre cetățile enumerate se află Ierusalimul (numit aici Iebus), Ghibea și Rama — nume care vor deveni centrale în povestea regatului lui Israel, de la Saul (din Ghibea lui Beniamin) până la David și capitala sa la Ierusalim.",
        "Lista detaliată de douăzeci și șase de cetăți, „cu satele lor”, arată aceeași grijă minuțioasă pentru fiecare seminție, chiar și pentru cea mai mică dintre ele, confirmând că în împărțirea lui Dumnezeu nu există seminții de rangul doi.",
      ),
      crossRefs: ["Judecători 19:10", "1 Samuel 10:26"],
      forYourHeart:
        "Dumnezeu are grijă la fel de multă de cele mai mici moșteniri ca și de cele mai mari; mărimea aparentă a chemării tale nu îi diminuează valoarea înaintea Lui.",
    },
  ],
  prayer:
    "Doamne, ajută-ne să nu amânăm luarea în stăpânire a binecuvântărilor pe care ni le-ai promis deja.\n\nMulțumim că Tu ai grijă de fiecare parte a moștenirii noastre, oricât de mică ar părea.\n\nÎnvață-ne să facem din închinarea înaintea Ta centrul stabil al vieții noastre, ca și Silo pentru Israel.\n\nȘi dă-ne hărnicie să cutreierăm și să luăm în stăpânire tot ce ne-ai pregătit. Amin.",
  status: IOSUA_STATUSES[18],
})
