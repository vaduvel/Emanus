import { rutChapter, teaching } from "./rutHelpers.js"
import { rutPassage } from "./rutText.js"
import { RUT_STATUSES } from "./rutPublication.js"

/*
 * Transcript Poonen: judges-ruth.txt, liniile 2620-2810.
 * Explicația urmează inițiativa Naomei, cererea Rutiei către ruda apropiată,
 * aprecierea caracterului ei și respectarea ordinii răscumpărării.
 */
export const RUT_3 = rutChapter({
  number: 3,
  title: "Rut 3 — «Întinde-ți aripa peste roaba ta»",
  summary:
    "Naomi caută un loc de odihnă și siguranță pentru Rut și o îndrumă să meargă la Boaz. Rut îi cere să-și împlinească rolul de rudă-răscumpărătoare. Boaz îi laudă caracterul, dar îi spune că există o rudă mai apropiată, al cărei drept trebuie respectat înainte ca el să poată acționa.",
  literaryContext:
    "Capitolul dezvoltă posibilitatea anunțată în Rut 2:20. Boaz nu este doar proprietarul unui ogor bun, ci una dintre rudele care ar putea răscumpăra moștenirea familiei. Poonen urmărește mai ales alegerea Rutiei de a nu alerga după tineri și integritatea lui Boaz, care nu ocolește dreptul rudei mai apropiate.",
  historicalContext:
    "Naomi se raportează la datoria rudei apropiate de a păstra numele și moștenirea familiei, lege amintită de Poonen din Deuteronom 25:5-9. În cazul Rutiei, răscumpărarea proprietății și căsătoria ajung legate în discuția purtată mai târziu la poarta cetății.",
  units: [
    {
      id: "rut-3-1-5",
      ref: "Rut 3:1-5",
      heading: "Naomi caută odihnă și siguranță pentru Rut",
      text: rutPassage(3, 1, 5),
      teaching: teaching(
        "Naomi îi spune Rutiei că dorește să-i caute un loc de odihnă și siguranță. Ea îi explică faptul că Boaz este ruda lor și o îndrumă cum să-i prezinte cererea.",
        "Rut răspunde simplu că va face ceea ce i-a spus Naomi. Poonen păstrează accentul pe relația dintre ele: Rut, care își îngrijise soacra fără să se plângă, primește acum din partea ei grija pentru propriul viitor.",
        "Scopul nu este o cucerire romantică făcută pe ascuns, ci aducerea situației înaintea omului care putea împlini responsabilitatea de rudă apropiată.",
      ),
      words: [
        {
          original: "מָנוֹחַ",
          transliteration: "manoah",
          language: "ebraica",
          meaning:
            "loc de odihnă, stare de siguranță. Naomi folosește termenul pentru viitorul stabil pe care îl dorește pentru Rut.",
        },
      ],
      crossRefs: ["Rut 1:9", "Deuteronom 25:5-10"],
      forYourHeart:
        "Bunătatea dintre oameni poate merge în ambele direcții: cel îngrijit ieri poate deveni cel care caută binele tău mâine.",
    },
    {
      id: "rut-3-6-13",
      ref: "Rut 3:6-13",
      heading: "Rut cere răscumpărarea, iar Boaz îi laudă caracterul",
      text: rutPassage(3, 6, 13),
      teaching: teaching(
        "Rut se prezintă și îi spune lui Boaz că este rudă apropiată. Cererea ei este exprimată prin imaginea întinderii aripii peste ea, legând protecția personală de responsabilitatea răscumpărătorului.",
        "Boaz o binecuvântează și spune că bunătatea ei de acum este mai mare decât cea dintâi, fiindcă nu a alergat după tineri, bogați sau săraci. Poonen deduce că Boaz era probabil mai în vârstă și vede în alegerea Rutiei încă o dovadă că ea nu era condusă de avantaj sau de atracția unei vieți ușoare.",
        "Boaz afirmă că oamenii cetății cunosc caracterul ei, dar nu profită de situație și nu sare peste ordinea stabilită. Există o rudă mai apropiată, iar aceasta trebuie întrebată întâi.",
      ),
      words: [
        {
          original: "כְנָפֶךָ",
          transliteration: "kenafekha",
          language: "ebraica",
          meaning:
            "aripa ta sau marginea veșmântului tău. Rut cere protecția de legământ a lui Boaz; expresia răspunde imaginii din Rut 2:12, unde ea venise sub aripile DOMNULUI.",
        },
        {
          original: "גֹאֵל",
          transliteration: "go'el",
          language: "ebraica",
          meaning:
            "răscumpărător, rudă apropiată cu responsabilitatea de a recupera moștenirea familiei și de a-i apăra continuitatea.",
        },
      ],
      crossRefs: ["Rut 2:12", "Rut 2:20", "Rut 4:1-10"],
      forYourHeart:
        "Caracterul nu caută numai ceea ce poate obține repede. El respectă adevărul, ordinea dreaptă și responsabilitatea chiar atunci când dorința este bună.",
    },
    {
      id: "rut-3-14-18",
      ref: "Rut 3:14-18",
      heading: "Boaz trimite hrană și preia responsabilitatea rezolvării",
      text: rutPassage(3, 14, 18),
      teaching: teaching(
        "Rut se întoarce la Naomi cu grânele primite de la Boaz și îi povestește ce s-a întâmplat. Boaz nu îi oferă doar cuvinte, ci și o dovadă concretă că nu o trimite înapoi fără nimic.",
        "Naomi îi spune să aștepte rezultatul, fiind convinsă că Boaz nu se va odihni până nu va lămuri situația. Poonen trece imediat la scena porții, unde el îl cheamă pe cel cu drept mai apropiat.",
        "Integritatea lui Boaz se vede prin faptul că își asumă acțiunea publică și legală, nu lasă lucrurile într-o promisiune secretă și neclară.",
      ),
      crossRefs: ["Rut 4:1-4"],
      forYourHeart:
        "O promisiune serioasă caută lumină, martori și responsabilitate. Nu construi decizii importante numai pe vorbe ascunse.",
    },
  ],
  prayer:
    "Doamne, învață-ne să căutăm binele și siguranța celor pe care îi iubim.\n\nDă-ne caracterul Rutiei, care nu urmărește avantajul, și integritatea lui Boaz, care respectă ceea ce este drept.\n\nAcoperă-ne sub aripile Tale și fă-ne oameni ale căror promisiuni intră în lumină și devin responsabilitate. Amin.",
  status: RUT_STATUSES[3],
})
