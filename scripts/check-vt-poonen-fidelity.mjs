#!/usr/bin/env node

import {
  JUDECATORI_FULL,
  ESTERA_FULL,
  IOV_FULL,
  PSALMI_FULL,
  PROVERBE_FULL,
  CANTAREA_CANTARILOR_FULL,
  ISAIA_FULL,
  IEREMIA_FULL,
  EZECHIEL_FULL,
  DANIEL_FULL,
} from "../packages/shared/dist/bible/overlays/index.js"
import { SAMUEL1 } from "../packages/shared/dist/bible/samuel1.js"
import { SAMUEL2 } from "../packages/shared/dist/bible/samuel2.js"

function need(condition, message) {
  if (!condition) throw new Error(`[VT Poonen fidelity] ${message}`)
}

function normalize(text) {
  return String(text ?? "").toLocaleLowerCase("ro-RO")
}

function assertOverlayChapter(book, chapterNumber, expected) {
  const chapter = book.chapters.find((item) => item.number === chapterNumber)
  need(chapter, `${book.name} ${chapterNumber}: capitol lipsă`)

  const sourceUnits = chapter.units.filter(
    (unit) => unit.explanationKind === "exposition" && unit.source?.kind === "poonen",
  )
  need(sourceUnits.length > 0, `${book.name} ${chapterNumber}: nicio unitate Poonen finală`)

  const sourceTeaching = normalize(sourceUnits.map((unit) => unit.teaching).join("\n\n"))
  for (const phrase of expected) {
    need(
      sourceTeaching.includes(normalize(phrase)),
      `${book.name} ${chapterNumber}: a dispărut afirmația-sursă «${phrase}»`,
    )
  }
}

const overlayTargets = [
  // Judecători / Estera
  [JUDECATORI_FULL, 4, ["Dumnezeu a rânduit bărbații", "Dumnezeu poate ridica o Debora"]],
  [ESTERA_FULL, 1, ["Numele lui Dumnezeu nu apare", "nu Se identifică public"]],
  [ESTERA_FULL, 2, ["împărat păgân", "compromis"]],
  [ESTERA_FULL, 8, ["Dumnezeu nu îi abandonase", "îi protejează"]],

  // Iov
  [IOV_FULL, 29, ["mândria spirituală", "mândria în propria lui evlavie"]],
  [IOV_FULL, 31, ["mândrie în faptul că ești un om bun și curat", "discursurile lui devin autojustificare"]],
  [IOV_FULL, 42, ["a ajuns acum la zero", "binecuvântează dublu", "roagă-te pentru cei care te persecută"]],

  // Psalmi
  [PSALMI_FULL, 32, ["curățirea păcatului a venit după moartea lui Isus", "sângele lui Isus ne curățește"]],
  [PSALMI_FULL, 51, ["adevăr în omul dinăuntru", "nu lua de la mine Duhul Tău cel Sfânt", "frica lui cea mai mare"]],
  [PSALMI_FULL, 69, ["Isus a murit literalmente de inimă frântă", "sânge și apă"]],
  [PSALMI_FULL, 73, ["Dacă ai îndoieli, ține-le pentru tine", "Nu-i poticni pe alții"]],
  [PSALMI_FULL, 74, ["singurul verset din Biblie", "lipsa profetului"]],
  [PSALMI_FULL, 103, ["iertarea și vindecarea erau disponibile în Vechiul Legământ", "biruință asupra păcatului"]],
  [PSALMI_FULL, 105, ["Nu trebuie să calomniem", "nu sunt de acord"]],

  // Proverbe
  [PROVERBE_FULL, 3, ["Cel mai mare dușman al credinței este propria rațiune", "supusă Duhului Sfânt"]],
  [PROVERBE_FULL, 22, ["folosirea nuielei la fundul copilului", "Copiii trebuie disciplinați"]],
  [PROVERBE_FULL, 23, ["nu era tipul de vin pe care l-a făcut la Cana"]],
  [PROVERBE_FULL, 31, ["mâinile ei sunt tari", "limba ei este moale", "tipul de soție pe care trebuie să-l cauți", "tipul de femeie care trebuie să fii"]],

  // Cântarea Cântărilor
  [CANTAREA_CANTARILOR_FULL, 1, ["Relația sexuală fără iubire este demonică", "Hristos și Biserica", "via mea este propria mea viață", "bărbatul vrea sex", "femeia vrea siguranță"]],
  [CANTAREA_CANTARILOR_FULL, 2, ["nu este, în acest text, un titlu al lui Isus", "șase luni până la un an", "ascuns în Hristos", "vulpile mici", "micile iritații"]],
  [CANTAREA_CANTARILOR_FULL, 4, ["demoni, principate și puteri", "vântul rece al suferinței", "vântul binecuvântării"]],
  [CANTAREA_CANTARILOR_FULL, 5, ["nu acum", "Străjerii sunt prezbiteri și predicatori", "legaliști", "Prietenul cel mai mare"]],
  [CANTAREA_CANTARILOR_FULL, 8, ["Te am pe Tine și aceasta îmi este de ajuns"]],

  // Isaia
  [ISAIA_FULL, 7, ["nașterea lui Isus din fecioară", "fără relații cu un bărbat"]],
  [ISAIA_FULL, 10, ["Asiria este și un tip al Antihristului", "jugul este nimicit prin ungere", "Duhului Sfânt"]],
  [ISAIA_FULL, 11, ["lucrarea în șapte aspecte a Duhului Sfânt", "vremea Mileniului", "deja adevărată în biserică"]],
  [ISAIA_FULL, 14, ["Lucifer", "De cinci ori apare «eu voi»"]],

  // Ieremia
  [IEREMIA_FULL, 23, ["venirea lui Isus Hristos", "Dreptatea noastră", "nu stau în sfatul DOMNULUI să asculte", "Cuvântul adevărat al lui Dumnezeu: ca un foc", "ca un ciocan"]],
  [IEREMIA_FULL, 29, ["biserica adevărată", "caută pe Dumnezeu din toată inima", "profeți falși", "îi numește"]],
  [IEREMIA_FULL, 31, ["Te iubesc cu o iubire veșnică"]],

  // Ezechiel
  [EZECHIEL_FULL, 14, ["Dumnezeu Însuși poate lăsa profeții falși să fie amăgiți", "idoli în inimă"]],
  [EZECHIEL_FULL, 16, ["mândrie, lene, belșug", "păcatul sexual"]],
  [EZECHIEL_FULL, 28, ["Satan", "Eden anterior"]],
  [EZECHIEL_FULL, 36, ["mare profeție a vieții Noului Legământ", "Dacă nu te rogi, nu primești", "semnele unui om plin de Duhul Sfânt"]],
  [EZECHIEL_FULL, 43, ["bisericii Noului Legământ", "sfințenie absolută"]],
  [EZECHIEL_FULL, 47, ["adevăratei plinătăți a Duhului", "picioarele sunt ridicate de la pământ"]],
  [EZECHIEL_FULL, 48, ["numele bisericii Noului Legământ", "DOMNUL este acolo"]],

  // Daniel
  [DANIEL_FULL, 2, ["fierul vorbește despre dictatură", "zece împărății", "Antihristului"]],
  [DANIEL_FULL, 3, ["cel mai mare miracol", "trei oameni rămân în picioare", "În foc ard frânghiile", "lucrurile care ne leagă"]],
  [DANIEL_FULL, 4, ["formula Babilonului spiritual", "pentru gloria omului", "Nebucadnețar este probabil în cer", "Solomon este în iad"]],
  [DANIEL_FULL, 6, ["să vadă toți că mă rog", "sunt creștin", "leilor fizici", "Satan nu trebuie să mă poată atinge"]],
  [DANIEL_FULL, 7, ["Babilonul, Medo-Persia, Grecia și Roma", "zece împărății", "Antihristului"]],
  [DANIEL_FULL, 9, ["483 de ani", "șapte ani", "Antihristul"]],
  [DANIEL_FULL, 10, ["înainte de Crucea de la Calvar", "din prima zi"]],
  [DANIEL_FULL, 12, ["două învieri", "Antihristului"]],
]

for (const [book, chapter, expected] of overlayTargets) {
  assertOverlayChapter(book, chapter, expected)
}

function assertLegacyUnit(book, chapterNumber, unitId, expected) {
  const chapter = book.chapters.find((item) => item.number === chapterNumber)
  need(chapter, `${book.name} ${chapterNumber}: capitol lipsă`)
  const unit = chapter.units.find((item) => item.id === unitId)
  need(unit, `${book.name} ${chapterNumber}: unitatea ${unitId} lipsește`)
  need(unit.explanationKind === "exposition", `${book.name} ${chapterNumber} ${unitId}: nu mai este exposition`)
  need(/Poonen/iu.test(unit.explanationSource ?? ""), `${book.name} ${chapterNumber} ${unitId}: provenance Poonen a dispărut`)
  const teaching = normalize(unit.teaching)
  for (const phrase of expected) {
    need(teaching.includes(normalize(phrase)), `${book.name} ${chapterNumber} ${unitId}: a dispărut «${phrase}»`)
  }
}

assertLegacyUnit(SAMUEL1, 16, "1-samuel-16-14-23", [
  "Duhul DOMNULUI îl părăsește pe Saul",
  "pierde ungerea",
  "gelozia",
])
assertLegacyUnit(SAMUEL1, 28, "1-samuel-28-7-25", [
  "ajunge acum să caute o femeie care cheamă morții",
  "degenerării lui",
])
assertLegacyUnit(SAMUEL2, 24, "2-samuel-24-1-9", [
  "cât de puternică este armata lui",
  "nu Îl întreabă aici pe Dumnezeu",
])
assertLegacyUnit(SAMUEL2, 24, "2-samuel-24-18-25", [
  "nu voi aduce DOMNULUI",
  "nu mă costă nimic",
])

console.log(
  `[VT Poonen fidelity] OK — ${overlayTargets.length} capitole overlay critice + 4 unități legacy păstrează învățătura-sursă după toate review-urile.`,
)
