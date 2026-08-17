import { rutChapter, teaching } from "./rutHelpers.js"
import { rutPassage } from "./rutText.js"
import { RUT_STATUSES } from "./rutPublication.js"

/*
 * Transcript Poonen: judges-ruth.txt, liniile 2450-2660.
 * Explicația urmează munca Rutiei, grija ei pentru Naomi, protecția oferită
 * de Boaz și caracterul pe care Dumnezeu l-a văzut în ea.
 */
export const RUT_2 = rutChapter({
  number: 2,
  title: "Rut 2 — În ogorul lui Boaz: muncă, bunătate și adăpost",
  summary:
    "Rut merge să strângă spice rămase pentru ea și Naomi și ajunge în ogorul lui Boaz. El află cine este, îi recunoaște credincioșia, o protejează și îi oferă hrană din belșug. La întoarcere, Naomi înțelege că Boaz este una dintre rudele lor cu drept de răscumpărare.",
  literaryContext:
    "După hotărârea din capitolul 1, alegerea Rutiei se vede în muncă și grijă concretă. Poonen arată că ea nu a plecat să caute un soț, ci L-a căutat pe Dumnezeu și a lucrat pentru a se îngriji de Naomi; în acest drum Dumnezeu a condus-o la ogorul lui Boaz.",
  historicalContext:
    "Legea lui Israel cerea ca proprietarii să nu strângă până la ultimul spic, ci să lase ceva pentru sărac, străin, orfan și văduvă. Rut intră în această protecție ca femeie săracă și străină, iar Boaz nu se limitează la minimul cerut, ci îi asigură și siguranța.",
  units: [
    {
      id: "rut-2-1-7",
      ref: "Rut 2:1-7",
      heading: "Rut caută de lucru ca să aibă grijă de Naomi",
      text: rutPassage(2, 1, 7),
      teaching: teaching(
        "Rut cere voie să meargă la câmp și să strângă spicele rămase. Poonen o prezintă ca pe o femeie harnică, dispusă să facă munca smerită a unei culegătoare pentru ca ea și soacra ei să aibă hrană.",
        "Ea nu cunoaște planul lui Naomi despre ruda apropiată și nu merge în ogor ca să-și găsească un soț. Merge să lucreze și să-și împlinească responsabilitatea, iar Dumnezeu o conduce în ogorul lui Boaz.",
        "Poonen vede aici principiul că omul care caută mai întâi împărăția lui Dumnezeu și umblă credincios în datoria sa poate primi și celelalte lucruri fără să le transforme în scopul principal al vieții.",
      ),
      crossRefs: ["Levitic 19:9-10", "Deuteronom 24:19-22", "Matei 6:33"],
      forYourHeart:
        "Fă cu credincioșie lucrarea smerită care este înaintea ta. Nu trebuie să alergi după toate lucrurile pe care Dumnezeu știe să le adauge la vremea potrivită.",
    },
    {
      id: "rut-2-8-16",
      ref: "Rut 2:8-16",
      heading: "Boaz îi vede caracterul și îi oferă protecție",
      text: rutPassage(2, 8, 16),
      teaching: teaching(
        "Boaz află că Rut este tânăra moabită venită împreună cu Naomi. El îi spune să rămână în ogorul lui și le poruncește slujitorilor să nu se atingă de ea. Poonen subliniază bunătatea și integritatea lui Boaz, care folosește autoritatea pentru a proteja o femeie vulnerabilă.",
        "Rut cade cu fața la pământ și întreabă de ce a găsit bunăvoință, deși este străină. Poonen vede în ea smerenie, muncă, credință, bunătate, respect și dragoste față de Naomi — calități pe care Dumnezeu le privește și astăzi.",
        "Boaz îi amintește că a lăsat țara și familia ei pentru a veni la un popor pe care nu-l cunoscuse. El se roagă ca plata ei să fie deplină de la DOMNUL, sub ale Cărui aripi a venit să se adăpostească.",
      ),
      words: [
        {
          original: "כְּנָפָיו",
          transliteration: "kenafav",
          language: "ebraica",
          meaning:
            "aripile Lui. Boaz descrie alegerea Rutiei ca venire sub protecția DOMNULUI; același cuvânt va reapărea în cererea ei din Rut 3:9.",
        },
      ],
      crossRefs: ["Psalmul 91:1-4", "Rut 3:9"],
      forYourHeart:
        "Caracterul se vede în muncă, smerenie și felul în care îi tratezi pe cei apropiați. Folosește orice autoritate ai pentru a proteja, nu pentru a profita.",
    },
    {
      id: "rut-2-17-23",
      ref: "Rut 2:17-23",
      heading: "Naomi recunoaște în Boaz o rudă-răscumpărătoare",
      text: rutPassage(2, 17, 23),
      teaching: teaching(
        "Rut lucrează până seara, duce acasă ceea ce a strâns și îi spune Naomei în ogorul cui a lucrat. Poonen continuă să accentueze hărnicia și grija ei: binecuvântarea primită nu este păstrată numai pentru sine.",
        "Când aude numele lui Boaz, Naomi recunoaște că el este o rudă apropiată. De aici povestea trece de la simpla strângere a spicelor la posibilitatea răscumpărării familiei și a moștenirii.",
        "Rut rămâne în ogorul lui Boaz, unde este protejată. Bunătatea lui nu este un gest izolat, ci un cadru în care ea poate continua să lucreze în siguranță.",
      ),
      words: [
        {
          original: "מִגֹּאֲלֵנוּ",
          transliteration: "mi-go'alenu",
          language: "ebraica",
          meaning:
            "dintre răscumpărătorii noștri. Termenul vine din rădăcina ga'al și desemnează ruda apropiată care putea răscumpăra proprietatea și apăra continuitatea familiei.",
        },
      ],
      crossRefs: ["Levitic 25:25", "Deuteronom 25:5-10"],
      forYourHeart:
        "Bunătatea adevărată nu oferă doar un moment plăcut, ci creează un loc sigur în care cel vulnerabil poate lucra și trăi cu demnitate.",
    },
  ],
  prayer:
    "Doamne, dă-ne hărnicia și smerenia Rutiei și învață-ne să avem grijă de cei pe care ni i-ai dat.\n\nAjută-ne să Te căutăm mai întâi pe Tine și să ne facem datoria fără calcule ascunse.\n\nDă-ne caracterul lui Boaz, care protejează și face bine celui vulnerabil.\n\nȚine-ne sub aripile Tale și condu-ne pașii. Amin.",
  status: RUT_STATUSES[2],
})
