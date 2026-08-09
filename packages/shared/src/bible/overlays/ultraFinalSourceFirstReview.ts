import type { ExplainedBookOverlay, ExplainedOverlayUnit } from "../explainedOverlay.js"

const TEXTUAL_META = /\b(?:Emanus|overlay(?:-ul)?|transcript(?:ul|ului|e)?|(?:Zac\s+)?Poonen)\b/iu
const TEXTUAL_MODERN = /\b(?:modern(?:ă|e|i)?|contemporan(?:ă|e|i)?|creștin(?:ă|e|i)?)\b|\bcredincioșilor de astăzi\b/iu
const TEXTUAL_DOCTRINAL = /\b(?:doctrin(?:ă|ar|ară|are)|teologi(?:e|c|că))\b/iu
const TEXTUAL_TRANSFER = /\bnu (?:constituie|devine|devin|este|sunt).{0,55}\b(?:mandat|model|metodă|poruncă|regulă)\b|\bnu (?:se )?transfer(?:ă|ăm)\b|\bnu autorizează\b|\bnu justifică\b/iu
const TEXTUAL_NT = /\b(?:Noul Testament|Iisus|Hristos|apostol(?:ul|ii)?|Evrei|Romani|Ioan|Matei|Marcu|Luca)\b/iu

function isNonTextualSentence(sentence: string): boolean {
  return (
    TEXTUAL_META.test(sentence) ||
    TEXTUAL_MODERN.test(sentence) ||
    TEXTUAL_DOCTRINAL.test(sentence) ||
    TEXTUAL_TRANSFER.test(sentence) ||
    TEXTUAL_NT.test(sentence)
  )
}

/**
 * `textual-overview` este doar rezumatul pasajului. Eliminăm propozițiile de
 * laborator, precauțiile moderne și aplicațiile canonice/doctrinare care au
 * fost adăugate în golurile unde sursa Poonen nu dezvoltă pasajul.
 *
 * Important: această funcție NU se aplică unităților Poonen.
 */
function purifyTextualOverview(unit: ExplainedOverlayUnit): ExplainedOverlayUnit {
  if (unit.explanationKind !== "textual-overview" || unit.source.kind !== "biblia-emanus") return unit

  const sentences = unit.teaching
    .split(/(?<=[.!?])\s+/u)
    .map((part) => part.trim())
    .filter(Boolean)

  const kept: string[] = []
  for (const sentence of sentences) {
    if (!isNonTextualSentence(sentence)) {
      kept.push(sentence)
      continue
    }

    // Unele rezumate au o propoziție textuală urmată după punct și virgulă
    // de o precauție editorială. Păstrăm numai partea textuală demonstrabilă.
    const clauses = sentence.split(/;\s+/u).map((part) => part.trim()).filter(Boolean)
    const cleanClauses = clauses.filter((clause) => !isNonTextualSentence(clause))
    if (cleanClauses.length && cleanClauses.length < clauses.length) {
      const clean = cleanClauses.join("; ").replace(/[,:;]\s*$/u, "").trim()
      if (clean.length >= 35) kept.push(/[.!?]$/u.test(clean) ? clean : `${clean}.`)
    }
  }

  const teaching = kept.join(" ").replace(/\s+/gu, " ").trim()
  if (!teaching) {
    throw new Error(
      `[VT ultra-final] ${unit.from}-${unit.to}: textual-overview a rămas fără conținut după eliminarea materialului nesusținut.`,
    )
  }

  return {
    ...unit,
    teaching,
    forYourHeart: undefined,
    words: undefined,
  }
}

function canonicalPsalm(unit: ExplainedOverlayUnit, sources: string[], note: string): ExplainedOverlayUnit {
  return {
    ...unit,
    source: { kind: "canonical-exegesis", sources, note },
    explanationKind: "exposition",
  }
}

function repairCanonicalGap(bookOrder: number, chapterNumber: number, unit: ExplainedOverlayUnit): ExplainedOverlayUnit {
  if (bookOrder !== 19) return unit

  if (chapterNumber === 31 && unit.from === 1 && unit.to === 24) {
    return canonicalPsalm(unit, ["Psalmii 31:1-24", "Luca 23:46"], "Psalmul 31:5 este reluat explicit de Iisus pe cruce.")
  }
  if (chapterNumber === 41 && unit.from === 1 && unit.to === 13) {
    return canonicalPsalm(unit, ["Psalmii 41:1-13", "Ioan 13:18"], "Ioan 13:18 citează Psalmul 41:9 în contextul trădării lui Iisus.")
  }
  if (chapterNumber === 44 && unit.from === 1 && unit.to === 26) {
    return canonicalPsalm(unit, ["Psalmii 44:1-26", "Romani 8:36"], "Romani 8:36 citează Psalmul 44:22 în argumentul despre suferință și dragostea lui Hristos.")
  }
  if (chapterNumber === 95 && unit.from === 1 && unit.to === 11) {
    return canonicalPsalm(unit, ["Psalmii 95:1-11", "Evrei 3:7-4:11"], "Evrei 3-4 dezvoltă explicit avertismentul și «astăzi»-ul Psalmului 95.")
  }
  if (chapterNumber === 118 && unit.from === 1 && unit.to === 29) {
    return canonicalPsalm(unit, ["Psalmii 118:1-29", "Matei 21:9", "Matei 21:42"], "Matei 21 aplică lui Iisus strigătul și piatra respinsă din Psalmul 118.")
  }
  return unit
}

function repairPoonenUnit(bookOrder: number, chapterNumber: number, unit: ExplainedOverlayUnit): ExplainedOverlayUnit {
  if (unit.source.kind !== "poonen" && unit.source.kind !== "poonen-official") return unit

  // Judecători 1 — sursa aplică direct cucerirea incompletă la păcatul tolerat.
  if (bookOrder === 7 && chapterNumber === 1 && unit.from === 1 && unit.to === 36) {
    return {
      ...unit,
      heading: "Ascultarea incompletă pregătește robia care urmează",
      teaching:
        "Poonen introduce Judecători ca imagine a unei căderi rapide după biruințele din Iosua. Israel nu a urmat exact ce spusese Dumnezeu, ci a început să raționeze și să modifice porunca. Poonen aplică direct acest lucru vieții spirituale: dacă nu biruim păcatul și îl lăsăm să rămână, vom trăi cu acele probleme, ele vor deveni spini și curse, iar mai târziu ceea ce am tolerat ne poate robi. Plânsul, postul sau jertfa nu înlocuiesc schimbarea vieții și ascultarea exactă de Cuvântul lui Dumnezeu.",
      forYourHeart:
        "Nu negocia cu păcatul pe care Dumnezeu îți cere să-l biruiești. Ceea ce tolerezi astăzi poate ajunge mâine să te robească.",
    }
  }

  // Judecători 3 — calificarea slujirii este venirea Duhului DOMNULUI peste Otniel.
  if (bookOrder === 7 && chapterNumber === 3 && unit.from === 1 && unit.to === 31) {
    return {
      ...unit,
      heading: "Duhul DOMNULUI, nu certificatul, îl califică pe Otniel",
      teaching:
        "Poonen se oprește la 3:10: Duhul DOMNULUI vine peste Otniel și el judecă Israelul. Calificarea pentru slujire nu este numai informația biblică, pregătirea sau un certificat, ci puterea și lucrarea Duhului lui Dumnezeu. El urmărește apoi pe Ehud și Șamgar ca alte instrumente ridicate de Dumnezeu pentru izbăvirea poporului și observă cât de mult așteaptă Israel înainte să strige după ajutor.",
    }
  }

  // Judecători 4 — păstrăm fără relativizare exact convingerea exprimată de Poonen.
  if (bookOrder === 7 && chapterNumber === 4 && unit.from === 1 && unit.to === 24) {
    return {
      ...unit,
      heading: "Debora: Dumnezeu ridică o femeie când nu găsește un bărbat disponibil",
      teaching:
        "Poonen spune că Dumnezeu a rânduit bărbații să fie conducători în biserică, dar când bărbații nu împlinesc ceea ce trebuie, Dumnezeu poate ridica o Debora. El prezintă Debora ca o mare încurajare pentru surori: Dumnezeu o folosește pe femeia care Îi este disponibilă, iar Debora a fost prorociță, judecător al lui Israel și conducătoare într-o vreme în care Dumnezeu nu găsise un bărbat de aceeași disponibilitate. Poonen spune că Îl laudă pe Dumnezeu pentru fiecare «Debora» pe care a ridicat-o de-a lungul anilor.",
      forYourHeart:
        "Fii disponibil înaintea lui Dumnezeu. El caută oameni care Îl cunosc și Îi sunt predați, iar lipsa altora nu Îi oprește lucrarea.",
    }
  }

  // Judecători 14 — Poonen folosește în mod direct coborârea lui Samson ca început al declinului.
  if (bookOrder === 7 && chapterNumber === 14 && unit.from === 1 && unit.to === 20) {
    return {
      ...unit,
      heading: "Samson începe să coboare",
      teaching:
        "Poonen urmărește începutul declinului lui Samson din momentul în care coboară la Timna și își fixează dorința asupra unei femei care nu era alegerea lui Dumnezeu pentru el. El folosește această «coborâre» ca imagine a direcției spirituale a lui Samson: omul care fusese separat pentru Dumnezeu începe să cedeze dorințelor lui și merge tot mai jos. Puterea pe care o primise nu îl scutea de nevoia de ascultare și curăție.",
      forYourHeart:
        "Darul sau puterea primită de la Dumnezeu nu compensează neascultarea. O coborâre începe adesea când insiști asupra dorinței tale în locul voii Lui.",
    }
  }

  // Judecători 17 — sursa rezumă ultimele capitole prin lipsa unui conducător și voia proprie.
  if (bookOrder === 7 && chapterNumber === 17 && unit.from === 1 && unit.to === 13) {
    return {
      ...unit,
      heading: "Fiecare făcea ce era drept în ochii lui",
      teaching:
        "Poonen privește capitolele 17-21 ca tabloul degradării care apare când nu există un conducător care să țină poporul pe calea lui Dumnezeu. Idolatria, confuzia religioasă și răul se dezvoltă într-un popor în care fiecare ajunge să facă ceea ce este drept în propriii ochi. El indică Judecători 21:25 drept rezumatul acestei stări.",
    }
  }

  // 1 Cronici 4 — restaurăm fără calificări străine rugăciunea lui Iabeț așa cum o dezvoltă sursa.
  if (bookOrder === 13 && chapterNumber === 4 && unit.from === 9 && unit.to === 10) {
    return {
      ...unit,
      heading: "Iabeț: durerea, rugăciunea și lărgirea hotarelor spirituale",
      teaching:
        "Poonen leagă faptul că Iabeț era mai vrednic de cinste decât frații lui de durerea și suferința amintite în numele lui și spune direct: să nu disprețuim durerea. Iabeț era un om al rugăciunii. El cere binecuvântare, lărgirea hotarului, mâna lui Dumnezeu peste el și păzire de rău. Poonen aplică lărgirea hotarului la viața spirituală: să nu fim mulțumiți cu cât am experimentat din Dumnezeu, ci să cerem mai mult; iar mâna lui Dumnezeu înseamnă puterea Lui. Dumnezeu i-a dat lui Iabeț ceea ce ceruse, iar Poonen spune că Dumnezeu îți va da ceea ce ceri.",
      forYourHeart:
        "Nu disprețui durerea prin care Dumnezeu te formează. Cere-I să-ți lărgească hotarele spirituale, să-Și pună mâna — puterea — peste tine și să te păzească de rău.",
    }
  }

  // 1 Cronici 13 — sursa laudă direct conducerea care consultă și nu acționează de una singură.
  if (bookOrder === 13 && chapterNumber === 13 && unit.from === 1 && unit.to === 14) {
    return {
      ...unit,
      heading: "Un om evlavios nu conduce de unul singur",
      teaching:
        "Poonen se oprește la faptul că David s-a sfătuit cu căpeteniile miilor, sutelor și cu fiecare conducător. El spune că un om cu adevărat evlavios nu face lucrurile de unul singur, cu atitudinea «eu am hotărât, voi mergeți și faceți». David îi implică pe ceilalți conducători, iar acest lucru este prezentat ca o trăsătură bună a conducerii lui.",
      forYourHeart:
        "Nu confunda autoritatea cu decizia solitară. Un conducător evlavios știe să se sfătuiască și să-i implice pe ceilalți.",
    }
  }

  // 2 Cronici 18 — Micaia spune numai ce îi spune DOMNUL, chiar cu prețul persecuției.
  if (bookOrder === 14 && chapterNumber === 18 && unit.from === 1 && unit.to === 34) {
    return {
      ...unit,
      heading: "Micaia nu repetă ce spun ceilalți; vorbește ce îi spune DOMNUL",
      teaching:
        "Poonen se concentrează pe Micaia, adevăratul proroc căruia i se cere să-și facă mesajul asemenea mesajului celorlalți proroci. Micaia răspunde că va spune ceea ce îi spune DOMNUL. Poonen aplică aceasta slujitorului lui Dumnezeu: să nu fie un ecou care repetă ce a citit sau ce spun ceilalți, ci un om care Îl ascultă pe Dumnezeu și vorbește ceea ce primește de la El. Micaia este lovit și pus în închisoare pentru că nu spune ce spun ceilalți, iar Poonen subliniază că adevărații proroci au fost persecutați de-a lungul istoriei.",
      forYourHeart:
        "Nu fi ecoul oamenilor. Ascultă-L pe Dumnezeu și spune adevărul pe care ți-l arată, chiar când nu este mesajul popular.",
    }
  }

  return unit
}

function mergeDuplicateWholeChapterUnits(bookOrder: number, chapterNumber: number, units: ExplainedOverlayUnit[]): ExplainedOverlayUnit[] {
  // Iov 19 și Psalmul 74 aveau aceeași explicație lungă copiată în două intervale.
  // Dacă cele două unități sunt contigue și identice semantic, o singură unitate
  // pe capitol păstrează exact explicația, fără repetiție artificială.
  if ((bookOrder === 18 && chapterNumber === 19) || (bookOrder === 19 && chapterNumber === 74)) {
    if (units.length === 2) {
      const [a, b] = units
      const same = a.to + 1 === b.from && a.teaching.trim() === b.teaching.trim() && a.source.kind === b.source.kind
      if (same) {
        return [{ ...a, to: b.to, forYourHeart: a.forYourHeart ?? b.forYourHeart }]
      }
    }
  }
  return units
}

/**
 * Ultimul strat editorial înainte de publicare.
 *
 * Ordinea este deliberată:
 * 1. reparațiile Poonen se aplică numai unităților cu provenance Poonen;
 * 2. legăturile canonice explicite sunt reclasificate ca canonical-exegesis;
 * 3. abia apoi `textual-overview` este curățat de orice material care nu este
 *    simplă descriere a pasajului.
 */
export function applyUltraFinalSourceFirstReview(book: ExplainedBookOverlay): ExplainedBookOverlay {
  return {
    ...book,
    chapters: book.chapters.map((chapter) => {
      let units = chapter.units.map((original) => {
        const poonenRepaired = repairPoonenUnit(book.order, chapter.number, original)
        const canonicallyClassified = repairCanonicalGap(book.order, chapter.number, poonenRepaired)
        return purifyTextualOverview(canonicallyClassified)
      })
      units = mergeDuplicateWholeChapterUnits(book.order, chapter.number, units)
      return { ...chapter, units }
    }),
  }
}
