import { iosuaChapter, teaching } from "./iosuaHelpers.js"
import { iosuaPassage } from "./iosuaText.js"
import { IOSUA_STATUSES } from "./iosuaPublication.js"

export const IOSUA_15 = iosuaChapter({
  number: 15,
  title: "Iosua 15 — Teritoriul lui Iuda",
  summary:
    "Se descriu hotarele detaliate ale moștenirii seminției lui Iuda, cea mai mare și mai importantă dintre semințiile lui Israel. În mijlocul listei geografice, este relatat episodul lui Otniel, care cucerește Chiriat-Sefer și o primește pe Acsa, fiica lui Caleb, de soție.",
  literaryContext:
    "Iuda primește atenție specială în această listă, atât prin lungimea descrierii, cât și prin poziția sa întâi între semințiile de la apus de Iordan — anticipare a rolului central pe care această seminție îl va avea în istoria lui Israel, culminând cu regele David și, mai departe, cu Mesia.",
  historicalContext:
    "Teritoriul lui Iuda se întinde de la sud, spre granița cu Edomul și pustia Ȟin, până aproape de Ierusalim la nord, incluzând orașe importante precum Hebron, Debir și Lachiș, deja menționate în campania militară din capitolele 10 și 12.",
  units: [
    {
      id: "iosua-15-1-12",
      ref: "Iosua 15:1-12",
      heading: "Hotarele teritoriului lui Iuda",
      text: iosuaPassage(15, 1, 12),
      teaching: teaching(
        "Textul trasează cu minuțiozitate hotarele lui Iuda: la sud până la hotarul Edomului și pustia Ȟin, la răsărit Marea Sărată, la apus Marea cea Mare (Mediterana) — un teritoriu vast, care acoperă practic tot sudul țării.",
        "Preciz ia geografică extremă — fiecare vârf de deal, fiecare văioagă, fiecare punct de hotar numit — arată că moștenirea nu este o promisiune vagă, ci un dar concret, cu hotare pe care contemporanii puteau să le verifice pe teren.",
        "Această atenție la detaliu reflectă o teologie importantă: Dumnezeul lui Israel este un Dumnezeu al detaliilor, care împarte cu grijă și dreptate, nu la întâmplare, moștenirea promisă fiecărei seminții.",
      ),
      crossRefs: ["Geneza 49:8-12", "Numeri 34:3-5"],
      forYourHeart:
        "Dumnezeu se preocupă de detaliile vieții tale la fel de mult ca de marile Sale promisiuni; nimic din moștenirea pe care ți-o dă nu este lăsat la întâmplare.",
    },
    {
      id: "iosua-15-13-19",
      ref: "Iosua 15:13-19",
      heading: "Otniel, Chiriat-Sefer și Acsa, fiica lui Caleb",
      text: iosuaPassage(15, 13, 19),
      teaching: teaching(
        "Caleb primește în mijlocul teritoriului lui Iuda partea sa specială, Chiriat-Arba (Hebron), și alungă de acolo pe cei trei fii ai lui Anac — împlinirea concretă a curajului declarat în capitolul anterior.",
        "Caleb promite pe fiica sa, Acsa, de soție celui care va cuceri Chiriat-Sefer (Debir). Otniel, ruda lui Caleb, cucerește cetatea și o primește pe Acsa — același Otniel care va deveni mai târziu primul judecător al lui Israel (Judecători 3:9-11).",
        "Acsa îl îndeamnă pe soțul ei să ceară de la Caleb un câmp, apoi cere ea însăși, cu îndrăzneală, și izvoare de apă, spunând: „dă-mi și izvoare de apă”. Caleb îi dă „izvoarele de sus și izvoarele de jos” — un exemplu de generozitate părintească față de o cerere îndrăzneață, dar potrivită.",
      ),
      crossRefs: ["Judecători 1:11-15", "Judecători 3:9-11"],
      forYourHeart:
        "Nu te teme să ceri de la Tatăl tăl ceresc mai mult decât partea aparent suficientă — la fel ca Acsa, poți cere și izvoarele de care ai nevoie pentru moștenirea ta.",
    },
    {
      id: "iosua-15-20-63",
      ref: "Iosua 15:20-63",
      heading: "Lista cetăților lui Iuda și mențiunea despre iebusiți",
      text: iosuaPassage(15, 20, 63),
      teaching: teaching(
        "Urmează o listă lungă și detaliată a cetăților lui Iuda, grupate pe regiuni — sud, câmpie de nord, munte, pustie — însumând peste o sută de nume de localități. Această arhivă geografică servea drept temei legal pentru revendicările de pământ în generațiile următoare.",
        "Textul se încheie cu o mărturisire onestă: „fiii lui Iuda n-au putut izgoni pe iebusiții care locuiau la Ierusalim, așa că iebusiții au locuit cu fiii lui Iuda la Ierusalim până în ziua de azi”. Nici cea mai puternică dintre seminții nu împlinește cucerirea în întregime.",
        "Această mărturisire reia tema deja văzută în capitolul 13: promisiunea este fermă, dar împlinirea ei deplină rămâne o lucrare continuă, care va cere credincioșie și în generațiile următoare, nu doar într-un moment triumfător unic.",
      ),
      crossRefs: ["Iosua 13:1-2", "2 Samuel 5:6-7"],
      forYourHeart:
        "Chiar și cele mai mari izbânzi spirituale lasă adesea zone necucerite în viața noastră, care cer perseverență continuă, nu doar un moment de biruință.",
    },
  ],
  prayer:
    "Doamne, mulțumim că moștenirea pe care ne-o dai este concretă și sigură, cu granițe pe care le poți verifica în viața noastră.\n\nDă-ne îndrăzneala Acsei să cerem izvoarele de care avem nevoie pentru moștenirea noastră.\n\nÎnvață-ne să recunoaștem cu smerenie zonele încă necucerite din viața noastră.\n\nȘi dă-ne perseverență să continuăm lupta credinței până la deplina biruință. Amin.",
  status: IOSUA_STATUSES[15],
})
