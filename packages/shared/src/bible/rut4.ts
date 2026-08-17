import { rutChapter, teaching } from "./rutHelpers.js"
import { rutPassage } from "./rutText.js"
import { RUT_STATUSES } from "./rutPublication.js"

/*
 * Transcript Poonen: judges-ruth.txt, liniile 2760-3000.
 * Explicația urmează refuzul rudei mai apropiate, hotărârea publică a lui
 * Boaz și felul în care Dumnezeu a onorat caracterul Rutiei.
 */
export const RUT_4 = rutChapter({
  number: 4,
  title: "Rut 4 — Boaz răscumpără, iar Dumnezeu o așază pe Rut în linia lui David",
  summary:
    "Boaz aduce problema la poarta cetății și îl cheamă pe răscumpărătorul mai apropiat. Acesta dorește ogorul, dar renunță când află că răscumpărarea o include și pe Rut. Boaz cumpără moștenirea, o ia pe Rut de soție, iar fiul lor Obed devine tatăl lui Isai și bunicul lui David.",
  literaryContext:
    "Cartea ajunge la împlinirea posibilității deschise în capitolele 2 și 3. Răscumpărarea nu este făcută în ascuns, ci înaintea bătrânilor și a martorilor. Finalul lărgește povestea unei văduve moabite până la genealogia regelui David.",
  historicalContext:
    "Poonen explică dreptul rudei apropiate de a răscumpăra proprietatea și de a păstra numele familiei. La poarta cetății, locul hotărârilor publice, ruda mai apropiată renunță prin obiceiul scoaterii sandalei, iar Boaz își asumă înaintea martorilor cumpărarea moștenirii și căsătoria cu Rut.",
  units: [
    {
      id: "rut-4-1-8",
      ref: "Rut 4:1-8",
      heading: "Ruda mai apropiată dorește ogorul, dar nu și responsabilitatea față de Rut",
      text: rutPassage(4, 1, 8),
      teaching: teaching(
        "Boaz merge la poarta cetății, îl oprește pe cel cu drept mai apropiat și adună martori. El respectă ordinea despre care îi vorbise Rutiei și nu încearcă să obțină rezultatul printr-o înțelegere ascunsă.",
        "Ruda este gata să răscumpere ogorul, dar se retrage când află că trebuie să o ia și pe Rut, pentru a păstra numele celui mort. Poonen redă motivul lui: se teme să nu-și primejduiască propria moștenire.",
        "Prin scoaterea sandalei, omul renunță public la dreptul său. Boaz primește astfel libertatea de a răscumpăra fără să încalce dreptul celui care era înaintea lui.",
      ),
      words: [
        {
          original: "וְגָאַלְתִּי / לִגְאָל",
          transliteration: "ve-ga'alti / lig'ol",
          language: "ebraica",
          meaning:
            "voi răscumpăra / a răscumpăra. Verbul ga'al descrie acțiunea concretă a rudei care recuperează moștenirea familiei și îi apără continuitatea.",
        },
      ],
      crossRefs: ["Levitic 25:25", "Deuteronom 25:5-10", "Rut 3:12-13"],
      forYourHeart:
        "Este ușor să dorești avantajul unei moșteniri și să refuzi responsabilitatea legată de ea. Caracterul primește împreună darul și datoria.",
    },
    {
      id: "rut-4-9-12",
      ref: "Rut 4:9-12",
      heading: "Boaz își asumă răscumpărarea înaintea martorilor",
      text: rutPassage(4, 9, 12),
      teaching: teaching(
        "Boaz declară înaintea bătrânilor și a întregului popor că a cumpărat ceea ce aparținuse familiei lui Elimelec și că o ia pe Rut de soție pentru ca numele celui mort să nu fie șters.",
        "Poonen numește aceasta o hotărâre îndrăzneață pentru un israelit respectat: Rut era moabită și venise dintr-un mediu păgân. Boaz nu o judecă după originea ei, ci a văzut credința, hărnicia, smerenia și bunătatea ei.",
        "Mulțimea devine martoră și rostește binecuvântarea. Ceea ce fusese discutat noaptea este confirmat acum public, cu responsabilitate deplină.",
      ),
      crossRefs: ["Rut 2:11-12", "Rut 3:10-11"],
      forYourHeart:
        "Nu judeca un om după mediul din care vine. Privește la caracterul pe care Dumnezeu l-a format și fii gata să faci ceea ce este drept chiar când alții îl consideră neobișnuit.",
    },
    {
      id: "rut-4-13-22",
      ref: "Rut 4:13-22",
      heading: "Obed, Isai și David: Dumnezeu îi onorează pe cei ce-L onorează",
      text: rutPassage(4, 13, 22),
      teaching: teaching(
        "Rut și Boaz au un fiu, Obed, iar genealogia ajunge la Isai și David. Poonen subliniază cât de mult a onorat Dumnezeu o femeie venită dintre moabiți: a făcut-o străbunica regelui David și a așezat-o în linia genealogică a lui Iisus Hristos.",
        "Motivul accentuat de Poonen nu este originea Rutiei, ci faptul că ea L-a onorat pe Dumnezeu prin alegerea și caracterul ei. El leagă finalul cărții de adevărul din 1 Samuel 2:30: «pe cei ce Mă cinstesc îi voi cinsti».",
        "Cartea se încheie arătând că Dumnezeu nu este părtinitor. O femeie dintr-un trecut păgân, care Îl alege pe Dumnezeul adevărat și umblă în credincioșie, primește un loc de cinste în istoria răscumpărării.",
      ),
      crossRefs: ["1 Samuel 2:30", "Matei 1:5-6", "Faptele 10:34-35"],
      forYourHeart:
        "Cinstește-L pe Dumnezeu prin alegeri și caracter, nu numai prin cuvinte. El nu este părtinitor și poate scrie un viitor nou pentru omul care Îl caută.",
    },
  ],
  prayer:
    "Doamne, dă-ne integritatea lui Boaz, care își ține cuvântul în lumină și își asumă responsabilitatea.\n\nPăzește-ne să nu judecăm oamenii după originea lor și ajută-ne să vedem caracterul pe care îl vezi Tu.\n\nÎnvață-ne să Te cinstim prin alegerile noastre, cu încrederea că Tu îi cinstești pe cei ce Te cinstesc. Amin.",
  status: RUT_STATUSES[4],
})
