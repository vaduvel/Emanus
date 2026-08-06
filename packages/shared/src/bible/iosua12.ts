import { iosuaChapter, teaching } from "./iosuaHelpers.js"
import { iosuaPassage } from "./iosuaText.js"
import { IOSUA_STATUSES } from "./iosuaPublication.js"

export const IOSUA_12 = iosuaChapter({
  number: 12,
  title: "Iosua 12 — Lista regilor înfrânți",
  summary:
    "Capitolul încheie prima parte a cărții cu o listă solemnă a tuturor împăraților înfrânți de Israel: doi la răsărit de Iordan, sub Moise, și treizeci și unu la apus de Iordan, sub Iosua. Este un moment de bilanț și mărturie înainte de trecerea la împărțirea pământului.",
  literaryContext:
    "Această listă funcționează ca o încheiere solemnă a secțiunii de cucerire militară (cap. 1-12) și o punte spre secțiunea de împărțire a moștenirii (cap. 13-21). Structura în două părți — răsărit și apus de Iordan — unifică lucrarea lui Moise cu cea a lui Iosua.",
  historicalContext:
    "Numărul mare de „împărați” (treizeci și trei în total) reflectă structura politică a Canaanului acelei epoci: nu o națiune unificată, ci un mozaic de cetăți-stat, fiecare cu propriul conducător, ceea ce explică de ce cucerirea a necesitat atâtea bătălii separate.",
  units: [
    {
      id: "iosua-12-1-6",
      ref: "Iosua 12:1-6",
      heading: "Împărații învinși de Moise la răsărit de Iordan",
      text: iosuaPassage(12, 1, 6),
      teaching: teaching(
        "Lista începe cu teritoriul cucerit sub conducerea lui Moise, înainte de moartea lui: Sihon, împăratul amoriților din Hesbon, și Og, împăratul Basanului, ultimul dintre uriașii refaimiți. Aceste victorii, relatate în Numeri 21, sunt reamintite aici ca temelie a moștenirii de la răsărit de Iordan.",
        "Teritoriul lui Sihon și Og fusese deja atribuit rubeniților, gadiților și jumătății seminției lui Manase, exact cum poruncise Moise în Numeri 32. Menționarea aici confirmă continuitatea între lucrarea de sub Moise și cea de sub Iosua.",
        "Această secțiune scurtă arată că biruința în țara făgăduită nu a început cu Iosua, ci era deja în desfășurare sub Moise; Iosua continuă o lucrare, nu o începe de la zero.",
      ),
      crossRefs: ["Numeri 21:21-35", "Numeri 32:33"],
      forYourHeart:
        "Lucrarea lui Dumnezeu se continuă de la o generație la alta; cel care preia ștafeta zidește pe temelia pusă de înaintașii lui credincioși.",
    },
    {
      id: "iosua-12-7-24",
      ref: "Iosua 12:7-24",
      heading: "Cei treizeci și unu de împărați învinși de Iosua la apus de Iordan",
      text: iosuaPassage(12, 7, 24),
      teaching: teaching(
        "Lista celor treizeci și unu de împărați învinși de Iosua acoperă întreaga țară, de la Baal-Gad până la muntele Halac, incluzând Ierihon, Ai, Ierusalim, Hebron, Iarmut, Lachiș, Eglon, Ghezer, Debir, Huțor și multe altele — practic toate cetățile menționate în capitolele 6-11.",
        "Repetarea numelor împăraților și cetăților lor, unul după altul, are efectul liturgic al unei mărturii solemne: fiecare nume este o dovadă concretă a credincioșiei lui Dumnezeu față de promisiunea făcută lui Avraam, Isaac și Iacov.",
        "Faptul că lista este atât de lungă — treizeci și unu de împărați învinși într-un timp relativ scurt — subliniază, mai mult decât orice discurs, că nu iscusința militară a lui Israel, ci mâna lui Dumnezeu a înfăptuit această cucerire.",
      ),
      crossRefs: ["Geneza 15:18-21", "Iosua 21:43-45"],
      forYourHeart:
        "Fiecare victorie înregistrată în viața ta este o mărturie despre credincioșia lui Dumnezeu — nu uita să le numești și să le ții minte, așa cum Israel a păstrat această listă.",
    },
  ],
  prayer:
    "Doamne, mulțumim că fiecare biruință din viața noastră este o dovadă a credincioșiei Tale față de promisiunile făcute.\n\nAjută-ne să continuăm cu credincioșie lucrarea încep ută de cei dinaintea noastră, fără să uităm temelia pusă de ei.\n\nÎnvață-ne să ținem minte și să numim biruințele Tale, ca mărturie pentru generațiile care vin după noi.\n\nȘi dă-ne încrederea că nu prin puterea noastră, ci prin mâna Ta, se împlinesc făgăduințele. Amin.",
  status: IOSUA_STATUSES[12],
})
