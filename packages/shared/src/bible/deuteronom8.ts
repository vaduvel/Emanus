import { deuteronomChapter, teaching } from "./deuteronomHelpers.js"
import { deuteronomPassage } from "./deuteronomText.js"
import { DEUTERONOM_STATUSES } from "./deuteronomPublication.js"

/*
 * Cartea Deuteronom, explicată pe unități de sens.
 */

export const DEUTERONOM_8 = deuteronomChapter({
  number: 8,
  title: "Deuteronom 8 — Nu numai cu pêine, și nu prin puterea ta",
  summary:
    "Moise Îl învață pe Israel să înțeleagă cei patruzeci de ani În pustie ca pe o învățătură de smerenie și încredere, nu ca pe o pedeapsă fără rost. În țara bună care vine, cel mai mare pericol nu va fi lipsa, ci belșugul care poate naște mîndrie și uitare a Celui care a dat totul.",
  literaryContext:
    "Acest capitol dezvoltă mai adnc avertismentul din Deuteronom 6:10-15 despre pericolul belșugului, adăugînd o învățătură teologică profundă despre scopul Încercărilor din pustie: nu pedeapsă goală, ci disciplină părintească.",
  historicalContext:
    "Mana, hrana zilnică primită În pustie fără muncă sau depozit, era o hrană pe care Israel n-o cunoștea înainte. Ea Învăța poporul să depindă zilnic de Dumnezeu, nu de propriile rezerve — o lecție care avea să fie greu de păstrat În țara belșugului care vine.",
  units: [
    {
      id: "deuteronom-8-1-5",
      ref: "Deuteronom 8:1-5",
      heading: "Mana, și o disciplină părintească",
      text: deuteronomPassage(8, 1, 5),
      teaching: teaching(
        "Cei patruzeci de ani sunt reinterpretați aici cu o profunzime rară: „DOMNUL, Dumnezeul tău, te-a călăuzit... ca să te smerească și să te Încerce, ca să știe ce ai În inimă”. Timpul În pustie nu era doar consecință a păcatului generației precedente; era și o formă de învățare voită de Dumnezeu.",
        "Faimosul verset 3 spune direct scopul manei: „ca să te învețe că omul nu trebuie să trăiască numai cu pêine, ci... cu tot ce iese din gura DOMNULUI”. Domnul Iisus va cita exact acest verset În ispitirea din pustie (Matei 4:4), arătînd Întărirea Lui prin același cuvînt care hrănește sufletul, nu numai trupul.",
        "Comparația finală este caldă, nu înfricoșătoare: „DOMNUL, Dumnezeul tău, te disciplinează cum disciplinează un om pe copilul lui”. Anii de pustie sunt învățate ca disciplină părintească, nu ca abandon sau răzbunare.",
      ),
      words: [
        {
          original: "מוצא פי-יהוה",
          transliteration: "motza pi-YHWH",
          language: "ebraica",
          meaning:
            "ceea ce iese din gura DOMNULUI. Expresia arată că cuvîntul lui Dumnezeu însuși este o hrană reală pentru viață, la fel de necesară ca pîinea.",
        },
      ],
      crossRefs: ["Matei 4:4", "Exod 16:2-4", "Evrei 12:5-11"],
      forYourHeart:
        "Nu doar trupul tău are nevoie de hrană; viața ta se ține În picioare prin fiecare cuvînt care iese din gura lui Dumnezeu.",
    },
    {
      id: "deuteronom-8-6-10",
      ref: "Deuteronom 8:6-10",
      heading: "O țară bună, și o binecuvîntare care cere răspuns",
      text: deuteronomPassage(8, 6, 10),
      teaching: teaching(
        "Descrierea țării făgăduite este una din cele mai frumoase din toată Scriptura: „pîrêe de apă, izvoare... grînî, orz, viță de vie, smocřni, rodii, măslini... pêine din belșug, fără sărmanță”. Contrastul cu pustia secătoasă nu putea fi mai mare.",
        "Din belșug decurge o poruncă simplă: „vei mênca, te vei satura și vei binecuvînta pe DOMNUL, Dumnezeul tău, pentru țara cea bună pe care ți-a dat-o”. Belșugul cere recunoștință rostită, nu tacită; săturarea trebuie să nască binecuvîntarea, nu uitarea.",
      ),
      words: [
        {
          original: "ואכל֪ ושבע֪ וברכ֪",
          transliteration: "veakhalta vesavata uverakhta",
          language: "ebraica",
          meaning:
            "vei mînca, te vei satura și vei binecuvînta. Trei verbe În șir care leagă direct săturarea de recunoștința rostită, verset care a devenit temeiul binecuvîntărilor de masă iudaice.",
        },
      ],
      crossRefs: ["Deuteronom 6:11-12", "Psalmul 103:1-2", "1 Tesaloniceni 5:18"],
      forYourHeart:
        "Cînd te sațini, nu lașa să fie sfîrșit de recunoștință; săturarea trebuie să nască binecuvîntarea rostită.",
    },
    {
      id: "deuteronom-8-11-16",
      ref: "Deuteronom 8:11-16",
      heading: "Păzește-te să nu uiți În belșug",
      text: deuteronomPassage(8, 11, 16),
      teaching: teaching(
        "Avertismentul din acest capitol întrece înainte pas cu pas, la fel ca belșugul însuși: „case frumoase... vitele și oile se vor înmulți... argintul și aurul se vor înmulți”, și În mijlocul acestui belșug se află pericolul cel mai mare: „să nu se înălțe inima ta și să uiți pe DOMNUL”.",
        "Detaliile amintirii din pustie întresc din nou aici: șarpele și scorpionul din pustia „plină de secetă”, apa scoasă din stînca cea tăre, mana necunoscută părinților lor. Fiecare din aceste amintiri este menită să nască recunoștință ca antidot față de mîndria belșugului.",
      ),
      words: [
        {
          original: "ורם לבבך",
          transliteration: "veram levavekha",
          language: "ebraica",
          meaning:
            "și se va înălța inima ta. Expresia descrie mîndria născută din belșug, prima etapă a căderii spre uitarea lui Dumnezeu.",
        },
      ],
      crossRefs: ["Deuteronom 6:10-12", "Proverbe 30:9", "Osea 13:6"],
      forYourHeart:
        "Belșugul nu vine niciodată singur; el poartă cu el pericolul unei inimi înălțate, care începe să uite de unde a venit totul.",
    },
    {
      id: "deuteronom-8-17-20",
      ref: "Deuteronom 8:17-20",
      heading: "Nu puterea ta, ci DOMNUL care dă putere să câștigi",
      text: deuteronomPassage(8, 17, 20),
      teaching: teaching(
        "Moise numesc greșeala cea mai periculoasă direct În cuvintele ei viitoare: „puteța ta și tăria mênii tale mi-au câștigat aceste bogății”. Uitarea de Dumnezeu se manifestă concret prin însușirea meritului pentru ceea ce, de fapt, este dar.",
        "Corectivul teologic este direct: „amintește-ți de DOMNUL, Dumnezeul tău, căci El înți dă putere să câștigi bogății, ca să-și țină legămîntul”. Chiar puterea de a munci și câștiga este ea însăși un dar, nu o realizare autonomă.",
        "Capitolul se Încheie cu o amenințare vârstă: uitarea de Dumnezeu și alergarea după alți dumnezei va duce la aceeași nimicire pe care au suferit-o neamurile pe care Israel le va izgoni. Nu există imunitate specială pentru poporul aleas, dacă uită pe Cel care l-a ales.",
      ),
      words: [
        {
          original: "כחי ועצם ידי",
          transliteration: "khochi veotzem yadi",
          language: "ebraica",
          meaning:
            "puterea mea și tăria mînii mele. Formula exactă a mndriei autonome, respinsă de textul care afirmă că orice putere de a câștiga vine de la DOMNUL.",
        },
      ],
      crossRefs: ["1 Corinteni 4:7", "Iacov 1:17", "Deuteronom 8:19-20"],
      forYourHeart:
        "Chiar puterea ta de a munci și câștiga este un dar; însușirea deplină a meritului te îndreaptă spre uitarea Celui care l-a dat.",
    },
  ],
  prayer:
    "Doamne, Tu ne-ai smerit În pustie ca să ne înveți că nu trăim numai cu pêine, ci cu fiecare cuvînt care iese din gura Ta.\n\nÎn belșug, amintește-ne să binecuvîntăm, nu să uităm.\n\nPăzește-ne de inima înălțată care spune „puteța mea mi-a câștigat aceasta”.\n\nȘi Învață-ne că orice putere de a câștiga vine de la Tine, ca să ținem legămîntul Tău. Amin.",
  status: DEUTERONOM_STATUSES[8],
})
