import { rutChapter, teaching } from "./rutHelpers.js"
import { rutPassage } from "./rutText.js"
import { RUT_STATUSES } from "./rutPublication.js"

/*
 * Transcript Poonen: judges-ruth.txt, liniile 2130-2500.
 * Explicația urmează alegerea Rut pentru Dumnezeu, fidelitatea față de Naomi
 * și avertismentul împotriva interpretării pripite a lucrării lui Dumnezeu.
 */
export const RUT_1 = rutChapter({
  number: 1,
  title: "Rut 1 — La răscruce: «Dumnezeul tău va fi Dumnezeul meu»",
  summary:
    "Foametea duce familia lui Elimelec în Moab, unde Naomi își pierde soțul și cei doi fii. La întoarcerea spre Betleem, Orpa se întoarce la poporul ei, dar Rut se alipește de Naomi, de poporul ei și de Dumnezeul ei. Naomi ajunge acasă spunând că s-a întors goală, fără să știe încă lucrarea pe care Dumnezeu o pregătea prin Rut.",
  literaryContext:
    "Cartea urmează după Judecători și așază, în mijlocul acelei epoci, povestea unei femei moabite care Îl alege pe Dumnezeul lui Israel. Poonen folosește povestea ca încurajare că trecutul familial sau originea nu împiedică o viață evlavioasă atunci când Dumnezeu vede o inimă care Îl caută.",
  historicalContext:
    "Moabiții descindeau din Moab, fiul născut din relația incestuoasă dintre Lot și fiica lui cea mare, relatată în Geneza 19. Poonen accentuează originea dificilă a Rutiei, dar Scriptura arată că Dumnezeu nu o judecă după neamul din care vine, ci îi onorează alegerea și caracterul.",
  units: [
    {
      id: "rut-1-1-5",
      ref: "Rut 1:1-5",
      heading: "O familie pleacă din Betleem și rămân trei văduve",
      text: rutPassage(1, 1, 5),
      teaching: teaching(
        "Poonen rezumă începutul cărții prin pierderile succesive ale familiei: Elimelec și Naomi pleacă în Moab din cauza foametei, fiii lor se căsătoresc cu Rut și Orpa, apoi Elimelec și cei doi fii mor.",
        "Rut vine dintr-un popor cu o istorie rușinoasă, dar aceasta nu îi hotărăște viitorul. Povestea ei arată că Dumnezeu poate ridica o femeie evlavioasă dintr-un trecut familial foarte rău și o poate așeza chiar în linia lui David și a lui Iisus Hristos.",
      ),
      crossRefs: ["Geneza 19:30-38", "Matei 1:5-6"],
      forYourHeart:
        "Originea familiei tale și trecutul din care vii nu trebuie să devină verdictul vieții tale. Dumnezeu privește la inima care Îl caută.",
    },
    {
      id: "rut-1-6-18",
      ref: "Rut 1:6-18",
      heading: "Orpa se întoarce, iar Rut se alipește de Naomi și de Dumnezeu",
      text: rutPassage(1, 6, 18),
      teaching: teaching(
        "Naomi le lasă libere pe cele două nurori să se întoarcă. Amândouă plâng, dar la această răscruce Orpa alege să revină la vechea ei viață, iar Rut alege calea lui Dumnezeu.",
        "Hotărârea Rutiei este deplină: unde merge Naomi va merge și ea, poporul ei va fi poporul Rutiei, iar Dumnezeul ei va fi Dumnezeul Rutiei. Poonen subliniază că asemenea răscruci sunt decisive: alegerea făcută atunci poate schimba întreaga direcție a vieții.",
        "Rut nu caută în primul rând un alt soț și o viață mai ușoară. Ea se ține de Naomi pentru că a cunoscut ceva despre Dumnezeul adevărat și nu vrea să se întoarcă la dumnezeii Moabului.",
      ),
      words: [
        {
          original: "חֶסֶד",
          transliteration: "hesed",
          language: "ebraica",
          meaning:
            "bunătate loială, îndurare arătată într-o relație. Naomi se roagă ca DOMNUL să Se poarte cu nurorile ei cu aceeași bunătate pe care ele au arătat-o familiei.",
        },
        {
          original: "דָּבְקָה",
          transliteration: "daveqah",
          language: "ebraica",
          meaning:
            "s-a alipit, s-a ținut strâns. Forma descrie hotărârea Rutiei de a nu o părăsi pe Naomi, în contrast cu întoarcerea Orpei.",
        },
      ],
      crossRefs: ["Iosua 24:15", "Matei 6:33"],
      forYourHeart:
        "Când drumul se desparte, nu alege numai ce pare mai sigur sau mai ușor. Alege-L pe Dumnezeu și rămâi hotărât în acea alegere.",
    },
    {
      id: "rut-1-19-22",
      ref: "Rut 1:19-22",
      heading: "Naomi spune că s-a întors goală, dar Dumnezeu adusese cu ea pe Rut",
      text: rutPassage(1, 19, 22),
      teaching: teaching(
        "La Betleem, Naomi spune că a plecat în belșug și că DOMNUL a adus-o înapoi cu mâinile goale. Poonen observă că ea nu știa încă ce urma să facă Dumnezeu și cât de repede această aparentă goliciune avea să fie schimbată.",
        "Rut nu răspunde plângerii prin nemulțumire. Ea continuă să aibă grijă de soacra ei, iar Dumnezeu vede credincioșia, respectul și dragostea unei femei venite dintr-un mediu păgân.",
        "Capitolul se încheie la începutul seceratului orzului. Naomi vede numai pierderea, dar cititorul vede deja începutul unei noi lucrări.",
      ),
      words: [
        {
          original: "נָעֳמִי / מָרָא",
          transliteration: "Naomi / Mara",
          language: "ebraica",
          meaning:
            "Naomi este legat de plăcere sau desfătare, iar Mara înseamnă amară. Naomi cere schimbarea numelui pentru a exprima felul în care își interpreta suferința.",
        },
      ],
      crossRefs: ["Rut 4:14-17"],
      forYourHeart:
        "Nu numi definitiv «gol» un capitol pe care Dumnezeu încă nu l-a încheiat. El poate fi deja la lucru prin omul credincios aflat lângă tine.",
    },
  ],
  prayer:
    "Doamne, ajută-ne să Te alegem la răscrucile vieții și să nu ne întoarcem la vechii dumnezei.\n\nFă-ne credincioși, buni și statornici față de oamenii pe care ni i-ai încredințat.\n\nPăzește-ne să nu numim goală lucrarea pe care încă o pregătești.\n\nPrivește la inima noastră și condu-ne pe calea Ta. Amin.",
  status: RUT_STATUSES[1],
})
