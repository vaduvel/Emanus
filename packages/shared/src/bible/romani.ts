import { romaniChapter, teaching } from "./romaniHelpers.js"
import type { BibleBook } from "./types.js"
import { ROMANI_16 } from "./romani16.js"
import { ROMANI_15 } from "./romani15.js"
import { ROMANI_14 } from "./romani14.js"
import { ROMANI_13 } from "./romani13.js"
import { ROMANI_12 } from "./romani12.js"
import { ROMANI_11 } from "./romani11.js"
import { ROMANI_10 } from "./romani10.js"
import { ROMANI_9 } from "./romani9.js"
import { ROMANI_8 } from "./romani8.js"
import { ROMANI_7 } from "./romani7.js"
import { ROMANI_6 } from "./romani6.js"
import { ROMANI_5 } from "./romani5.js"
import { ROMANI_4 } from "./romani4.js"
import { ROMANI_3 } from "./romani3.js"
import { ROMANI_2 } from "./romani2.js"

const ROMANI_1 = romaniChapter({
  number: 1,
  title: "Romani 1 — Evanghelia, puterea lui Dumnezeu pentru mântuire",
  summary: "Pavel prezintă Evanghelia care conduce la ascultarea credinței, apoi arată cum omul care respinge lumina lui Dumnezeu alunecă de la nerecunoștință la idolatrie și la o minte tot mai întunecată.",
  literaryContext: "Introducerea anunță tema întregii epistole: dreptatea lui Dumnezeu descoperită prin credință. Restul capitolului începe demonstrarea nevoii universale de Evanghelie, pornind de la omul care trăiește fără Dumnezeu.",
  historicalContext: "Comunitatea din Roma cuprindea credincioși dintre iudei și dintre neamuri. Într-un oraș dominat de putere, prestigiu și idolatrie, Pavel proclamă o putere diferită: mesajul crucii care schimbă omul dinăuntru.",
  units: [
    {
      verses: [1, 7],
      heading: "Chemați la ascultarea credinței",
      teaching: teaching(
        "Pavel se numește rob al lui Isus Hristos înainte de a vorbi despre autoritatea sa apostolică. Pentru el, slujirea nu este o carieră, ci o viață pusă deoparte pentru Evanghelia promisă în Scripturi și centrată în Fiul lui Dumnezeu.",
        "Poonen urmărește expresia „ascultarea credinței” de la începutul până la sfârșitul epistolei. Credința adevărată nu se reduce la acord intelectual; ea Îl primește pe Isus ca Domn și produce o ascultare care izvorăște din har, nu din frică.",
      ),
    },
    {
      verses: [8, 17],
      heading: "Evanghelia este puterea lui Dumnezeu",
      teaching: teaching(
        "Pavel mulțumește, se roagă și dorește să împărtășească un dar spiritual, dar recunoaște și că el însuși poate fi încurajat de credința celorlalți. Slujitorul matur nu se consideră autosuficient.",
        "Evanghelia nu este doar informație despre iertare, ci puterea lui Dumnezeu care duce omul spre o viață dreaptă prin credință. Poonen subliniază că întreaga epistolă descrie un drum: de la vinovăție și justificare până la viața în Duhul, trupul lui Hristos și ascultarea credinței.",
      ),
    },
    {
      verses: [18, 23],
      heading: "Lumina primită și adevărul înăbușit",
      teaching: teaching(
        "Mânia lui Dumnezeu se descoperă împotriva omului care înăbușă adevărul prin nedreptate. Creația oferă o mărturie suficientă despre puterea și dumnezeirea Creatorului, astfel încât problema nu este lipsa totală de lumină, ci refuzul luminii primite.",
        "Primul pas al coborârii este nerecunoștința: oamenii Îl cunosc într-o măsură pe Dumnezeu, dar nu-L slăvesc și nu-I mulțumesc. Inima care încetează să mulțumească se umple ușor de raționamente deșarte și înlocuiește slava Creatorului cu lucruri create.",
      ),
    },
    {
      verses: [24, 32],
      heading: "Când Dumnezeu îl lasă pe om să-și urmeze alegerea",
      teaching: teaching(
        "Expresia repetată „Dumnezeu i-a lăsat” arată judecata teribilă prin care omul este lăsat să culeagă roadele alegerilor sale. Păcatul nu rămâne izolat: afectează trupul, relațiile, gândirea și capacitatea de a numi binele bine.",
        "Textul numește limpede păcatul, inclusiv dezordinea sexuală, dar nu autorizează disprețul, violența sau dezumanizarea nimănui. Lista se încheie și cu lăcomie, invidie, bârfă, mândrie și lipsă de milă; toți oamenii au nevoie de harul lui Hristos și trebuie tratați cu demnitate.",
      ),
    },
  ],
  prayer: "Doamne, fă-mă un rob bucuros al lui Isus și dă-mi credința care ascultă. Păzește-mă de nerecunoștință, de idolii inimii și de judecarea altora. Lasă puterea Evangheliei să-mi transforme gândirea, trupul și relațiile. Amin.",
})

export const ROMANI: BibleBook = {
  id: "romani",
  name: "Romani",
  testament: "nt",
  order: 45,
  blurb: "Evanghelia lui Dumnezeu îl justifică pe păcătos, îl unește cu Hristos, îl conduce prin Duhul și îl așază într-un trup care trăiește ascultarea credinței.",
  chapters: [
    ROMANI_1,
    ROMANI_2,
    ROMANI_3,
    ROMANI_4,
    ROMANI_5,
    ROMANI_6,
    ROMANI_7,
    ROMANI_8,
    ROMANI_9,
    ROMANI_10,
    ROMANI_11,
    ROMANI_12,
    ROMANI_13,
    ROMANI_14,
    ROMANI_15,
    ROMANI_16,
  ],
}
