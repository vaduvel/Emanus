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
import { SAMUEL2 } from "../packages/shared/dist/bible/samuel2.js"

function need(condition, message) {
  if (!condition) throw new Error(`[VT Poonen fidelity] ${message}`)
}

function findOverlayUnit(book, chapterNumber, from, to) {
  const chapter = book.chapters.find((item) => item.number === chapterNumber)
  need(chapter, `${book.name} ${chapterNumber}: capitol lipsă`)
  const unit = chapter.units.find((item) => item.from === from && item.to === to)
  need(unit, `${book.name} ${chapterNumber}:${from}-${to}: unitate lipsă`)
  return unit
}

function assertPoonenUnit(book, chapter, from, to, expected) {
  const unit = findOverlayUnit(book, chapter, from, to)
  need(unit.explanationKind === "exposition", `${book.name} ${chapter}:${from}-${to}: nu mai este exposition`)
  need(unit.source?.kind === "poonen", `${book.name} ${chapter}:${from}-${to}: sursa Poonen a fost înlocuită cu ${unit.source?.kind ?? "nimic"}`)
  const teaching = unit.teaching.toLocaleLowerCase("ro-RO")
  for (const phrase of expected) {
    need(
      teaching.includes(phrase.toLocaleLowerCase("ro-RO")),
      `${book.name} ${chapter}:${from}-${to}: a dispărut afirmația-sursă «${phrase}»`,
    )
  }
}

const targets = [
  // Judecători / Estera
  [JUDECATORI_FULL, 4, 1, 24, ["Dumnezeu a rânduit bărbații", "a ridicat o femeie: Debora"]],
  [ESTERA_FULL, 1, 1, 22, ["Numele lui Dumnezeu nu apare", "nu Se identifică public"]],
  [ESTERA_FULL, 2, 1, 23, ["împărat păgân", "compromis"]],
  [ESTERA_FULL, 8, 1, 17, ["Dumnezeu nu îi abandonase", "îi protejează"]],

  // Iov
  [IOV_FULL, 29, 1, 25, ["mândria spirituală", "mândria în propria lui evlavie"]],
  [IOV_FULL, 31, 1, 12, ["mândrie în faptul că ești un om bun și curat"]],
  [IOV_FULL, 31, 13, 40, ["discursurile lui devin autojustificare"]],
  [IOV_FULL, 42, 1, 6, ["a ajuns acum la zero"]],
  [IOV_FULL, 42, 7, 17, ["binecuvântează dublu", "roagă-te pentru cei care te persecută"]],

  // Psalmi
  [PSALMI_FULL, 32, 1, 5, ["curățirea păcatului a venit după moartea lui Isus", "sângele lui Isus ne curățește"]],
  [PSALMI_FULL, 51, 1, 6, ["adevăr în omul dinăuntru"]],
  [PSALMI_FULL, 51, 7, 12, ["nu lua de la mine Duhul Tău cel Sfânt", "frica lui cea mai mare"]],
  [PSALMI_FULL, 69, 13, 29, ["Isus a murit literalmente de inimă frântă", "sânge și apă"]],
  [PSALMI_FULL, 73, 15, 20, ["Dacă ai îndoieli, ține-le pentru tine", "Nu-i poticni pe alții"]],
  [PSALMI_FULL, 74, 1, 12, ["singurul verset din Biblie", "lipsa profetului"]],
  [PSALMI_FULL, 103, 1, 5, ["iertarea și vindecarea erau disponibile în Vechiul Legământ", "biruință asupra păcatului"]],
  [PSALMI_FULL, 105, 1, 15, ["Nu trebuie să calomniem", "nu sunt de acord"]],

  // Proverbe
  [PROVERBE_FULL, 3, 1, 8, ["Cel mai mare dușman al credinței este propria rațiune", "supusă Duhului Sfânt"]],
  [PROVERBE_FULL, 22, 7, 16, ["folosirea nuielei la fundul copilului", "Copiii trebuie disciplinați"]],
  [PROVERBE_FULL, 23, 29, 35, ["nu era tipul de vin pe care l-a făcut la Cana"]],
  [PROVERBE_FULL, 31, 10, 27, ["mâinile ei sunt tari", "limba ei este moale"]],
  [PROVERBE_FULL, 31, 28, 31, ["tipul de soție pe care trebuie să-l cauți", "tipul de femeie care trebuie să fii"]],

  // Cântarea Cântărilor
  [CANTAREA_CANTARILOR_FULL, 1, 1, 4, ["Relația sexuală fără iubire este demonică", "Hristos și Biserica"]],
  [CANTAREA_CANTARILOR_FULL, 1, 5, 8, ["via mea este propria mea viață"]],
  [CANTAREA_CANTARILOR_FULL, 1, 9, 17, ["bărbatul vrea sex", "femeia vrea siguranță"]],
  [CANTAREA_CANTARILOR_FULL, 2, 1, 7, ["nu este, în acest text, un titlu al lui Isus", "șase luni până la un an"]],
  [CANTAREA_CANTARILOR_FULL, 2, 8, 14, ["ascuns în Hristos"]],
  [CANTAREA_CANTARILOR_FULL, 2, 15, 17, ["vulpile mici", "micile iritații"]],
  [CANTAREA_CANTARILOR_FULL, 4, 8, 11, ["demoni, principate și puteri"]],
  [CANTAREA_CANTARILOR_FULL, 4, 12, 16, ["vântul rece al suferinței", "vântul binecuvântării"]],
  [CANTAREA_CANTARILOR_FULL, 5, 1, 6, ["nu acum", "Mirele cheamă"]],
  [CANTAREA_CANTARILOR_FULL, 5, 7, 8, ["Străjerii sunt prezbiteri și predicatori", "legaliști"]],
  [CANTAREA_CANTARILOR_FULL, 5, 9, 16, ["Prietenul cel mai mare"]],
  [CANTAREA_CANTARILOR_FULL, 8, 5, 7, ["Te am pe Tine și aceasta îmi este de ajuns"]],

  // Isaia
  [ISAIA_FULL, 7, 10, 17, ["nașterea lui Isus din fecioară", "fără relații cu un bărbat"]],
  [ISAIA_FULL, 10, 5, 19, ["Asiria este și un tip al Antihristului"]],
  [ISAIA_FULL, 10, 20, 27, ["jugul este nimicit prin ungere", "Duhului Sfânt"]],
  [ISAIA_FULL, 11, 1, 5, ["lucrarea în șapte aspecte a Duhului Sfânt"]],
  [ISAIA_FULL, 11, 6, 9, ["vremea Mileniului", "deja adevărată în biserică"]],
  [ISAIA_FULL, 14, 12, 15, ["Lucifer", "De cinci ori apare «eu voi»"]],

  // Ieremia
  [IEREMIA_FULL, 23, 1, 8, ["venirea lui Isus Hristos", "Dreptatea noastră"]],
  [IEREMIA_FULL, 23, 9, 22, ["nu stau în sfatul DOMNULUI să asculte"]],
  [IEREMIA_FULL, 23, 23, 32, ["Cuvântul adevărat al lui Dumnezeu: ca un foc", "ca un ciocan"]],
  [IEREMIA_FULL, 29, 10, 14, ["biserica adevărată", "caută pe Dumnezeu din toată inima"]],
  [IEREMIA_FULL, 29, 15, 32, ["profeți falși", "îi numește"]],
  [IEREMIA_FULL, 31, 1, 14, ["Te iubesc cu o iubire veșnică"]],

  // Ezechiel
  [EZECHIEL_FULL, 14, 6, 11, ["Dumnezeu Însuși poate lăsa profeții falși să fie amăgiți", "idoli în inimă"]],
  [EZECHIEL_FULL, 16, 44, 58, ["mândrie, lene, belșug", "păcatul sexual"]],
  [EZECHIEL_FULL, 28, 11, 19, ["Satan", "Eden anterior"]],
  [EZECHIEL_FULL, 36, 22, 30, ["mare profeție a vieții Noului Legământ"]],
  [EZECHIEL_FULL, 36, 31, 38, ["Dacă nu te rogi, nu primești", "semnele unui om plin de Duhul Sfânt"]],
  [EZECHIEL_FULL, 43, 1, 12, ["bisericii Noului Legământ", "sfințenie absolută"]],
  [EZECHIEL_FULL, 47, 1, 5, ["adevăratei plinătăți a Duhului", "picioarele sunt ridicate de la pământ"]],
  [EZECHIEL_FULL, 48, 35, 35, ["numele bisericii Noului Legământ", "DOMNUL este acolo"]],

  // Daniel
  [DANIEL_FULL, 2, 31, 49, ["fierul vorbește despre dictatură", "zece împărății", "Antihristului"]],
  [DANIEL_FULL, 4, 28, 33, ["formula Babilonului spiritual", "pentru gloria omului"]],
  [DANIEL_FULL, 4, 34, 37, ["Nebucadnețar este probabil în cer", "Solomon este în iad"]],
  [DANIEL_FULL, 6, 10, 18, ["să vadă toți că mă rog", "sunt creștin"]],
  [DANIEL_FULL, 6, 19, 24, ["leilor fizici", "Satan nu trebuie să mă poată atinge"]],
  [DANIEL_FULL, 7, 1, 8, ["Babilonul, Medo-Persia, Grecia și Roma"]],
  [DANIEL_FULL, 7, 15, 28, ["zece împărății", "Antihristului"]],
  [DANIEL_FULL, 9, 20, 27, ["483 de ani", "șapte ani", "Antihristul"]],
  [DANIEL_FULL, 10, 10, 21, ["înainte de Crucea de la Calvar", "din prima zi"]],
  [DANIEL_FULL, 12, 1, 4, ["două învieri", "Antihristului"]],
]

for (const [book, chapter, from, to, expected] of targets) {
  assertPoonenUnit(book, chapter, from, to, expected)
}

const samuel24 = SAMUEL2.chapters.find((chapter) => chapter.number === 24)
need(samuel24, "2 Samuel 24: capitol lipsă")
for (const [unitId, expected] of [
  ["2-samuel-24-1-9", ["cât de puternică este armata lui", "nu Îl întreabă aici pe Dumnezeu"]],
  ["2-samuel-24-18-25", ["nu voi aduce DOMNULUI", "nu mă costă nimic"]],
]) {
  const unit = samuel24.units.find((item) => item.id === unitId)
  need(unit, `2 Samuel 24: unitatea ${unitId} lipsește`)
  need(unit.explanationKind === "exposition", `2 Samuel 24 ${unitId}: nu mai este exposition`)
  need(/Poonen/iu.test(unit.explanationSource ?? ""), `2 Samuel 24 ${unitId}: provenance Poonen a dispărut`)
  const teaching = unit.teaching.toLocaleLowerCase("ro-RO")
  for (const phrase of expected) {
    need(teaching.includes(phrase.toLocaleLowerCase("ro-RO")), `2 Samuel 24 ${unitId}: a dispărut «${phrase}»`)
  }
}

console.log(`[VT Poonen fidelity] OK — ${targets.length} unități overlay + 2 unități legacy păstrează învățătura-sursă.`)
