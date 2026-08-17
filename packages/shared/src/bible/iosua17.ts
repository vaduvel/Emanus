import { iosuaChapter, teaching } from "./iosuaHelpers.js"
import { iosuaPassage } from "./iosuaText.js"
import { IOSUA_STATUSES } from "./iosuaPublication.js"

export const IOSUA_17 = iosuaChapter({
  number: 17,
  title: "Iosua 17 — Teritoriul lui Manase și fiicele lui țelofhad",
  summary:
    "Se descrie moștenirea jumătății de seminție a lui Manase de la apus de Iordan, incluzând cererea împlinită a fiicelor lui țelofhad. Fiii lui Iosif cer mai mult pământ de la Iosua, care îi îndeamnă să defrișeze pădurea și să alunge pe canaaniții cu care de fier.",
  literaryContext:
    "Episodul fiicelor lui țelofhad, deja relatat în Numeri 27 și 36, este reluat aici pentru a arăta împlinirea concretă a unei promisiuni legale făcute cu mult timp înainte, chiar înainte de intrarea în Canaan.",
  historicalContext:
    "Manase, prin dimensiunea sa, este singura seminție împărțită în două — jumătate la răsărit de Iordan (cap. 13), jumătate la apus (aici) — o particularitate legată de numărul mare de urmași și de cererile speciale făcute încă din vremea lui Moise.",
  units: [
    {
      id: "iosua-17-1-6",
      ref: "Iosua 17:1-6",
      heading: "Moștenirea lui Manase și fiicele lui țelofhad",
      text: iosuaPassage(17, 1, 6),
      teaching: teaching(
        "Textul amintește că Machir, întâiul născut al lui Manase, primise deja Galaadul și Basanul, la răsărit de Iordan, „căci era un bărbat războinic”. Restul familiei lui Manase primește acum moștenire la apus.",
        "Fiicele lui țelofhad — Mahla, Noa, Hogla, Milca și Tirla — vin la Eleazar, Iosua și căpetenii și cer: „DOMNUL a poruncit lui Moise să ni se dea o moștenire în mijlocul fraților noștri”, referindu-se la decizia din Numeri 27:1-11.",
        "Textul confirmă simplu: „Ii s-a dat, după porunca DOMNULUI, o moștenire în mijlocul fraților tatălui lor”. O promisiune legală făcută cu ani înainte, încă din pustie, este împlinită întocmai, fără ezitare, arătând continuitate între generația lui Moise și cea a lui Iosua.",
      ),
      crossRefs: ["Numeri 27:1-11", "Numeri 36:1-12"],
      forYourHeart:
        "Promisiunile făcute de Dumnezeu prin conducători credincioși rămân valabile și sunt împlinite întocmai, chiar după mulți ani și o schimbare de conducere.",
    },
    {
      id: "iosua-17-7-13",
      ref: "Iosua 17:7-13",
      heading: "Hotarele detaliate ale teritoriului lui Manase",
      text: iosuaPassage(17, 7, 13),
      teaching: teaching(
        "Hotarul lui Manase este trasat cu grijă, incluzând ținutul dintre Efraim și Manase, cu precizări despre cetăți care, deși pe teritoriul lui Manase, aparțineau efectiv lui Efraim — un semn al împletirii strânse dintre cele două seminții frațe.",
        "Ca și la Iuda și Efraim, textul mărturisește onest: „fiii lui Manase n-au putut izgoni pe locuitorii acestor cetăți, și canaaniții au izbutit să rămână în această țară”, chiar dacă mai târziu au fost puși să plătească bir când Israel a devenit mai puternic.",
        "Repetarea acestui tipar — moștenire promisă, cucerire parțială, bir în loc de izgonire deplină — în trei seminții consecutive (Iuda, Efraim, Manase) subliniază că această realitate nu era o excepție, ci o problemă generală pentru întregul Israel.",
      ),
      crossRefs: ["Iosua 16:10", "Judecători 1:27-28"],
      forYourHeart:
        "Recunoașterea repetată a lucrurilor lăsate necucerite este o chemare pentru fiecare generație să continue lucrarea, nu să se mulțumească cu jumătăți de măsură.",
    },
    {
      id: "iosua-17-14-18",
      ref: "Iosua 17:14-18",
      heading: "Fiii lui Iosif cer mai mult pământ",
      text: iosuaPassage(17, 14, 18),
      teaching: teaching(
        "Fiii lui Iosif se plâng lui Iosua: „pentru ce ne-ai dat moștenire un singur sorț, o singură parte, când noi suntem un popor mare la număr și DOMNUL ne-a binecuvântat până acum?”. Cererea vine dintr-o poziție de belșug, nu de lipsă.",
        "Iosua le răspunde ferm, dar practic: dacă sunteți un popor mare, suiți-vă în pădure și curățiți-o pentru voi, în țara fereziților și refaimiților, dacă muntele lui Efraim este prea strâmt pentru voi. Belșugul cere efort suplimentar, nu doar o nouă împărțire pasivă.",
        "Când ei obiectează că muntele nu este de ajuns și că canaaniții din vale au care de fier, Iosua îi încurajează: „veți izgoni pe canaaniți, măcar că au care de fier și măcar că sunt puternici”. Aceeași încredere în DOMNUL, arătată în campaniile militare majore, trebuie aplicată și în lupta zilnică de a-și cuceri propria moștenire.",
      ),
      crossRefs: ["Iosua 11:6", "Judecători 1:19"],
      forYourHeart:
        "Belșugul primit de la Dumnezeu vine adesea cu chemarea de a munci și a lupta mai mult pentru a lua în stăpânire ceea ce ți-a fost promis, nu pasiv, ci prin credință activă.",
    },
  ],
  prayer:
    "Doamne, mulțumim pentru belșugul cu care ne-ai binecuvântat și pentru moștenirea pe care ne-o pregătești.\n\nAjută-ne să nu ne plângem de părțile primite, ci să munc im și să luptăm pentru a le lua în stăpânire deplină.\n\nDă-ne încrederea că nici carele de fier ale vrăjmașului nu pot sta împotriva Ta.\n\nȘi învață-ne, ca fiicele lui țelofhad, să cerem cu îndrăzneală ceea ce ne-ai promis. Amin.",
  status: IOSUA_STATUSES[17],
})
