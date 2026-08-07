import { deuteronomChapter, teaching } from "./deuteronomHelpers.js"
import { deuteronomPassage } from "./deuteronomText.js"
import { DEUTERONOM_STATUSES } from "./deuteronomPublication.js"

/*
 * Cartea Deuteronom, explicată pe unități de sens.
 */

export const DEUTERONOM_18 = deuteronomChapter({
  number: 18,
  title: "Deuteronom 18 — Leviții hrăniți de DOMNUL, și Prorocul care va veni",
  summary:
    "Moise arată că preoții leviți nu au moștenire de pământ, ci se hrănesc din jertfele DOMNULUI, interzice categoric practicile oculte ale neamurilor, și promite un Proroc ca Moise pe care Israel trebuie să-l asculte, cu un test clar pentru distincția dintre prorocul adevărat și cel fals.",
  literaryContext:
    "Acest capitol completează sistemul de autorități instituite în capitolul 17 — judecători și rege — cu cele două autorități spirituale rămase: preoția levitică și profeția. Ambele sunt limitate și supravegheate, nu absolute.",
  historicalContext:
    "Popoarele canaanite se bazau pe ghicitori, vrăjitori și necromanți pentru a cunoaște viitorul. Israel este chemat să nu caute cunoașterea divină prin manipulare ocultă, ci prin ascultarea de prorocii ridicați chiar de DOMNUL.",
  units: [
    {
      id: "deuteronom-18-1-8",
      ref: "Deuteronom 18:1-8",
      heading: "Leviții, fără moștenire de pământ, dar hrăniți de DOMNUL",
      text: deuteronomPassage(18, 1, 8),
      teaching: teaching(
        "Preoții leviți nu primesc parte de pământ ca celelalte triburi: „DOMNUL este moștenirea lor”. În locul unei moșii, ei se hrănesc din jertfele mistuite de foc și din părțile preoțești — spata, fălcile, pântecele — plus cele dintâi roade din grâu, must și ulei.",
        "Orice levit are dreptul să vină la locul ales și să slujească alături de frații lui, primind parte egală din hrana preoțească, indiferent de unde vine. Sistemul asigură că slujirea la altar nu depinde de avere personală, ci de chemarea DOMNULUI.",
      ),
      words: [
        {
          original: "יהוה הוא נחלתו",
          transliteration: "YHWH hu nachalato",
          language: "ebraica",
          meaning:
            "DOMNUL este moștenirea lui. Formula centrală care explică de ce Levi nu primește pământ: identitatea lui este definită direct de relația cu DOMNUL, nu de proprietate.",
        },
      ],
      crossRefs: ["Numeri 18:20-24", "Deuteronom 10:9", "1 Corinteni 9:13-14"],
      forYourHeart:
        "Slujirea ta lui Dumnezeu nu trebuie să depindă de cât ai adunat, ci de faptul că El Însuși este partea ta.",
    },
    {
      id: "deuteronom-18-9-14",
      ref: "Deuteronom 18:9-14",
      heading: "Urâciunile oculte, interzise categoric",
      text: deuteronomPassage(18, 9, 14),
      teaching: teaching(
        "Legea interzice o listă amplă de practici oculte: trecerea copiilor prin foc, ghicirea, citirea în stele, vrăjitoria, descântecul, legătura cu duhurile, necromanția. Fiecare din aceste practici este numită direct „o urâciune înaintea DOMNULUI”.",
        "Contrastul este clar: neamurile din jur ascultă de cititori în stele și ghicitori, dar „ție DOMNUL, Dumnezeul tău, nu ți-a îngăduit așa ceva”. Israel este chemat să fie „nesfârșit de curat înaintea DOMNULUI”, nu să caute cunoașterea viitorului prin mijloace interzise.",
      ),
      words: [
        {
          original: "תמים תהיה עם יהוה אלהיך",
          transliteration: "tamim tihye im YHWH Elohekha",
          language: "ebraica",
          meaning:
            "să fii desăvârșit/curat cu DOMNUL, Dumnezeul tău. Alternativa pozitivă oferită în locul practicilor oculte interzise — o relație de integritate totală cu Dumnezeu.",
        },
      ],
      crossRefs: ["Leviticul 19:31", "Leviticul 20:6", "Isaia 8:19-20"],
      forYourHeart:
        "Nevoia de a cunoaște viitorul nu se satisface prin practici interzise, ci prin încredere deplină în DOMNUL, care singur cunoaște ce va veni.",
    },
    {
      id: "deuteronom-18-15-19",
      ref: "Deuteronom 18:15-19",
      heading: "Un Proroc ca Moise",
      text: deuteronomPassage(18, 15, 19),
      teaching: teaching(
        "DOMNUL promite să ridice „din mijlocul tău, dintre frații tăi, un Proroc ca mine”, ca răspuns la cererea lui Israel de la Horeb de a nu mai auzi direct glasul DOMNULUI din foc. Acest Proroc va primi cuvintele lui Dumnezeu direct în gură și le va rosti fidel poporului.",
        "Ascultarea de acest Proroc nu este opțională: „de el să ascultați!”. Cel care nu va asculta de cuvintele Lui va da socoteală direct lui Dumnezeu — o promisiune pe care Noul Testament o citește ca împlinită în Hristos.",
      ),
      words: [
        {
          original: "נביא מקרבך מאחיך כמוני",
          transliteration: "navi miqirbekha me'achekha kamoni",
          language: "ebraica",
          meaning:
            "un proroc din mijlocul tău, dintre frații tăi, ca mine. Promisiunea are un orizont istoric imediat (linia prorocilor lui Israel), dar permite și o lectură mesianică mai profundă, fără a fi impusă direct de text.",
        },
      ],
      crossRefs: ["Fapte 3:22-23", "Fapte 7:37", "Ioan 1:21"],
      forYourHeart:
        "Dumnezeu nu te lasă fără glas viu prin care să-ți vorbească; ascultă de Cuvântul pe care El l-a trimis, nu de vocile care pretind cunoaștere ocultă.",
    },
    {
      id: "deuteronom-18-20-22",
      ref: "Deuteronom 18:20-22",
      heading: "Testul prorocului adevărat",
      text: deuteronomPassage(18, 20, 22),
      teaching: teaching(
        "Prorocul care vorbește îndrăzneț în Numele DOMNULUI un cuvânt neporuncit, sau care vorbește în numele altor dumnezei, este dat la moarte — falsificarea autorității divine este o crimă gravă, nu o simplă greșeală.",
        "Testul practic este dat direct: dacă cuvântul prorocului „nu se va întâmpla și nu se va adeveri”, acela nu a fost rostit de DOMNUL. Israel nu trebuie să se teamă de un asemenea proroc — adevărul se dovedește în timp, prin împlinire.",
      ),
      words: [
        {
          original: "לא יבא ולא יהיה הדבר",
          transliteration: "lo yavo velo yihye hadavar",
          language: "ebraica",
          meaning:
            "cuvântul nu se va întâmpla și nu se va adeveri. Criteriul empiric dat pentru discernerea prorociei false — împlinirea sau nereușita profeției.",
        },
      ],
      crossRefs: ["Ieremia 28:9", "1 Ioan 4:1", "Matei 7:15-20"],
      forYourHeart:
        "Nu te teme de cuvinte care pretind autoritate divină; verifică-le răbdător prin roadele și împlinirea lor.",
    },
  ],
  prayer:
    "Doamne, Tu Însuți ești partea celor care Te slujesc; învață-ne să ne mulțumim cu Tine, nu doar cu ce adunăm.\n\nPăzește-ne de orice practică ocultă, și dă-ne o inimă curată și încrezătoare în Tine.\n\nÎți mulțumim pentru Cuvântul viu pe care ni L-ai trimis; dă-ne ascultare deplină de El.\n\nȘi dă-ne discernământ să distingem adevărul de minciună, prin roadele și împlinirea lor. Amin.",
  status: DEUTERONOM_STATUSES[18],
})
