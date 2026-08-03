import { galateniChapter, teaching } from "./galateniHelpers.js"

/*
 * Textul biblic este materializat separat din RCCV.
 * Explicațiile sunt redactate în română pe baza studiilor verse-by-verse
 * ale lui Zac Poonen, fără copiere 1:1. Daniel rămâne reviewerul final.
 */

export const GALATENI_3 = galateniChapter({
  number: 3,
  title: "Galateni 3 — Promisiunea primită prin credință",
  summary: "Pavel le amintește galatenilor că au primit Duhul prin credință, nu prin faptele Legii. El explică binecuvântarea lui Avraam, răscumpărarea de sub blestem, rolul temporar al Legii și unitatea tuturor în Hristos.",
  literaryContext: "După afirmația din 2:20, Pavel trece de la mărturie la argument biblic. Experiența galatenilor, exemplul lui Avraam și scopul Legii converg spre aceeași concluzie: moștenirea este darul promisiunii.",
  historicalContext: "Învățătorii iudaizanți invocau probabil descendența din Avraam și Legea lui Moise. Pavel arată că promisiunea precede Legea cu secole și se împlinește în Hristos.",
  units: [
    {
      verses: [1, 9],
      heading: "Început și maturizare prin Duhul",
      teaching: teaching(
        "Galatenii primiseră Duhul auzind cu credință, dar încercau să ajungă la maturitate prin efortul firii. Viața creștină nu începe prin dependență de Dumnezeu ca apoi să fie dusă la capăt prin încredere în sine.",
        "Avraam L-a crezut pe Dumnezeu, iar adevărații lui fii sunt cei care trăiesc prin aceeași credință. Binecuvântarea nu se oprește la confortul nostru; Dumnezeu ne binecuvântează ca să devenim o binecuvântare pentru alții.",
      ),
      crossRefs: ["Geneza 12:1-3", "Romani 4:1-5", "Filipeni 1:6"],
      forYourHeart: "Nu înlocui dependența de Duhul cu o disciplină care te face autosuficient.",
    },
    {
      verses: [10, 14],
      heading: "Hristos a purtat blestemul",
      teaching: teaching(
        "Legea cere ascultare deplină și, prin urmare, condamnă orice om care se bizuie pe performanța sa. Hristos ne-a răscumpărat luând asupra Lui blestemul crucii.",
        "Scopul răscumpărării este pozitiv: binecuvântarea lui Avraam ajunge la neamuri și promisiunea Duhului este primită prin credință. Iertarea deschide drumul unei vieți conduse și întărite de Duhul.",
      ),
      crossRefs: ["Deuteronomul 27:26", "Habacuc 2:4", "Faptele 2:33"],
      forYourHeart: "Mulțumește-I lui Hristos că a purtat condamnarea și cere plinătatea Duhului pentru o viață nouă.",
    },
    {
      verses: [15, 22],
      heading: "Promisiunea nu este anulată de Lege",
      teaching: teaching(
        "Legământul făgăduit lui Avraam nu este desființat de Legea venită mai târziu. Moștenirea nu poate fi simultan salariu pentru performanță și dar al promisiunii.",
        "Legea a arătat păcatul și neputința omului; nu a fost dată ca să producă viața. Scriptura îi închide pe toți sub păcat pentru ca promisiunea să fie oferită tuturor pe aceeași cale: credința în Isus Hristos.",
      ),
      crossRefs: ["Geneza 15:1-6", "Romani 7:7-13", "Romani 11:32"],
      forYourHeart: "Recunoaște-ți neputința fără disperare; promisiunea lui Dumnezeu este pentru cei care cred.",
    },
    {
      verses: [23, 29],
      heading: "Conduși la Hristos și uniți în El",
      teaching: teaching(
        "Legea a funcționat ca un îndrumător care expune nevoia și conduce spre Hristos. Odată venită credința, credinciosul nu mai trăiește ca minor ținut sub supravegherea vechiului sistem.",
        "În Hristos, originea etnică, statutul social și sexul nu stabilesc valoarea sau accesul la Dumnezeu. Textul nu șterge diferențele dintre oameni, ci interzice folosirea lor pentru superioritate, excludere, exploatare sau abuz.",
      ),
      crossRefs: ["Coloseni 3:10-11", "Efeseni 2:13-18", "Iacov 2:1-9"],
      forYourHeart: "Privește fiecare credincios prin apartenența lui la Hristos, nu prin rangurile lumii.",
    },
  ],
  prayer: "Dumnezeule al promisiunii, păstrează-mă în credință și dependență de Duhul. Mulțumesc că Hristos a purtat blestemul meu. Învață-mă să trăiesc ca moștenitor și să-i primesc pe ceilalți ca egali în El. Amin.",
})
