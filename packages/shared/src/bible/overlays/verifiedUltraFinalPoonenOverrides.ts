import type { ExplainedBookOverlay, ExplainedOverlayUnit } from "../explainedOverlay.js"

function overrideUnit(
  bookOrder: number,
  chapterNumber: number,
  unit: ExplainedOverlayUnit,
): ExplainedOverlayUnit {
  if (unit.source.kind !== "poonen" && unit.source.kind !== "poonen-official") return unit

  // Judecători 14: transcriptul urmărește explicit începutul coborârii lui Samson la Timna.
  if (bookOrder === 7 && chapterNumber === 14 && unit.from === 1 && unit.to === 4) {
    return {
      ...unit,
      heading: "Samson începe să coboare",
      teaching:
        "Poonen urmărește începutul declinului lui Samson din momentul în care coboară la Timna și își fixează dorința asupra unei femei care nu era alegerea lui Dumnezeu pentru el. El folosește această «coborâre» ca imagine a direcției spirituale a lui Samson: omul care fusese separat pentru Dumnezeu începe să cedeze dorințelor lui și merge tot mai jos. Puterea pe care o primise nu îl scutea de nevoia de ascultare și curăție.",
      forYourHeart:
        "Darul sau puterea primită de Dumnezeu nu compensează neascultarea. O coborâre începe adesea când insiști asupra dorinței tale în locul voii Lui.",
    }
  }

  // Judecători 17: Poonen folosește Jud. 21:25 ca rezumat al degradării din capitolele finale.
  if (bookOrder === 7 && chapterNumber === 17 && unit.from === 1 && unit.to === 6) {
    return {
      ...unit,
      heading: "Fiecare făcea ce era drept în ochii lui",
      teaching:
        "Poonen privește capitolele finale din Judecători ca tabloul degradării care apare când nu există un conducător care să țină poporul pe calea lui Dumnezeu. Idolatria, confuzia religioasă și răul se dezvoltă într-un popor în care fiecare ajunge să facă ceea ce este drept în propriii ochi. El indică Judecători 21:25 drept rezumatul acestei stări.",
    }
  }

  // 1 Cronici 13: sursa laudă direct conducerea care se sfătuiește cu ceilalți.
  if (bookOrder === 13 && chapterNumber === 13 && unit.from === 1 && unit.to === 4) {
    return {
      ...unit,
      heading: "Un om evlavios nu conduce de unul singur",
      teaching:
        "Poonen se oprește la faptul că David s-a sfătuit cu căpeteniile miilor, sutelor și cu fiecare conducător. El spune că un om cu adevărat evlavios nu face lucrurile de unul singur, cu atitudinea «eu am hotărât, voi mergeți și faceți». David îi implică pe ceilalți conducători, iar acest lucru este prezentat ca o trăsătură bună a conducerii lui.",
      forYourHeart:
        "Nu confunda autoritatea cu decizia solitară. Un conducător evlavios știe să se sfătuiască și să-i implice pe ceilalți.",
    }
  }

  // 2 Cronici 18: Micaia nu devine ecoul celorlalți profeți; vorbește ce îi spune DOMNUL.
  if (bookOrder === 14 && chapterNumber === 18 && unit.from === 1 && unit.to === 27) {
    return {
      ...unit,
      heading: "Micaia nu repetă ce spun ceilalți; vorbește ce îi spune DOMNUL",
      teaching:
        "Poonen se concentrează pe Micaia, adevăratul proroc căruia i se cere să-și facă mesajul asemenea mesajului celorlalți proroci. Micaia răspunde că va spune ceea ce îi spune DOMNUL. Poonen aplică aceasta slujitorului lui Dumnezeu: să nu fie un ecou care repetă ce a citit sau ce spun ceilalți, ci un om care Îl ascultă pe Dumnezeu și vorbește ceea ce primește de la El. Micaia este lovit și pus în închisoare pentru că nu spune ce spun ceilalți, iar Poonen subliniază că adevărații proroci au fost persecutați de-a lungul istoriei.",
      forYourHeart:
        "Nu fi ecoul oamenilor. Ascultă-L pe Dumnezeu și spune adevărul pe care ți-l arată, chiar când nu este mesajul popular.",
    }
  }

  // Psalmul 91: verificat și în materialele oficiale CFC ale lui Poonen.
  // Satan citează promisiunea despre îngeri; Iisus refuză să-L ispitească pe Dumnezeu.
  if (bookOrder === 19 && chapterNumber === 91 && unit.from === 1 && unit.to === 16) {
    return {
      ...unit,
      heading: "Ocrotirea lui Dumnezeu nu este o invitație să-L ispitești",
      teaching:
        "Poonen leagă Psalmul 91 de ispitirea lui Iisus: Satan citează promisiunea despre îngeri, dar Iisus răspunde că nu trebuie să-L ispitești pe Domnul Dumnezeul tău. Poonen aplică direct acest principiu: credința nu înseamnă să cauți ceva spectaculos sau să refuzi mijloacele obișnuite pe care Dumnezeu le-a pus la dispoziție. El folosește exemplele scărilor, doctorilor și medicamentelor și avertizează că Dumnezeu nu face fiecare minune pentru fiecare credincios. Psalmul trebuie primit în ascultare de întregul Cuvânt al lui Dumnezeu, nu folosit pentru a cere o demonstrație spectaculoasă care să aducă onoare omului.",
      forYourHeart:
        "Încrede-te în ocrotirea lui Dumnezeu, dar nu transforma credința într-un test prin care Îi ceri să facă ceva spectaculos pentru tine.",
    }
  }

  // Zaharia 14: lectura escatologică a lui Poonen este afirmată direct, nu relativizată.
  // Materialele oficiale CFC o leagă de atacul final asupra Ierusalimului, Antihrist,
  // întoarcerea lui Iisus pe Muntele Măslinilor și instaurarea împărăției Sale pe pământ.
  if (bookOrder === 38 && chapterNumber === 14 && unit.from === 1 && unit.to === 21) {
    return {
      ...unit,
      heading: "DOMNUL vine, Își așază picioarele pe Muntele Măslinilor și devine Împărat peste tot pământul",
      teaching:
        "Poonen citește Zaharia 14 ca profeție despre evenimentele de la sfârșit. Națiunile se strâng împotriva Ierusalimului sub Antihrist, apoi Domnul Iisus Se întoarce, picioarele Lui stau pe Muntele Măslinilor și El nimicește forțele Antihristului. După aceasta Își întemeiază împărăția pe pământ. Capitolul descrie apele vii care ies din Ierusalim și declară că DOMNUL va fi Împărat peste tot pământul. În lectura lui Poonen, aceasta aparține venirii vizibile a lui Hristos și domniei care urmează.",
      forYourHeart:
        "Trăiește pregătit pentru întoarcerea lui Hristos. Scopul profeției nu este curiozitatea, ci o viață care Îl așteaptă pe Împărat.",
    }
  }

  return unit
}

export function applyVerifiedUltraFinalPoonenOverrides(book: ExplainedBookOverlay): ExplainedBookOverlay {
  return {
    ...book,
    chapters: book.chapters.map((chapter) => ({
      ...chapter,
      units: chapter.units.map((unit) => overrideUnit(book.order, chapter.number, unit)),
    })),
  }
}
