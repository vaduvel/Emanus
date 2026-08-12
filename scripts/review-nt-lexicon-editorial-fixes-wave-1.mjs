#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const CORPUS_DIRS = [
  path.join(ROOT, "docs", "data", "biblia-explicata", "nt-reviewed-recovered"),
  path.join(ROOT, "docs", "data", "biblia-explicata", "nt-source-first"),
]

function fail(message) {
  console.error(`[NT lexicon editorial fixes wave 1] ${message}`)
  process.exit(1)
}

const FIXES = [
  { bookId: "matei", chapter: 1, ref: "Matei 1:1-17", original: "βίβλος γενέσεως", before: "cartea neamului sau a obârșiei. Expresia face punte spre Geneza și deschide istoria unui nou început.", after: "carte a obârșiei sau a genealogiei; literal, «carte» + «origine/naștere»." },
  { bookId: "matei", chapter: 1, ref: "Matei 1:1-17", original: "Χριστός", before: "Unsul. Titlul grecesc corespunzător lui Mesia, Împăratul și Mântuitorul făgăduit.", after: "Unsul; ca titlu, Mesia sau Hristosul." },
  { bookId: "matei", chapter: 1, ref: "Matei 1:18-25", original: "Ἰησοῦς", before: "Isus, forma grecească a numelui Ieșua: Domnul mântuiește. Numele este legat chiar în text de mântuirea de păcate.", after: "Isus; forma grecească a numelui Iosua/Ieșua." },
  { bookId: "matei", chapter: 1, ref: "Matei 1:18-25", original: "Ἐμμανουήλ", before: "Emanuil: Dumnezeu este cu noi.", after: "Emanuil; nume transliterat, explicat în Matei 1:23 prin «Dumnezeu este cu noi»." },
  { bookId: "matei", chapter: 2, ref: "Matei 2:1-12", original: "μάγοι", before: "magi, învățați ai Răsăritului. Textul nu îi numește împărați și nu precizează numărul lor.", after: "magi; înțelepți sau savanți." },
  { bookId: "matei", chapter: 3, ref: "Matei 3:1-12", original: "μετανοεῖτε", before: "pocăiți-vă, schimbați-vă mintea și întoarceți-vă. Nu simplă emoție, ci schimbarea direcției.", after: "pocăiți-vă; verbul μετανοέω înseamnă a se pocăi, a-și schimba gândirea." },
  { bookId: "matei", chapter: 3, ref: "Matei 3:1-12", original: "καρπός", before: "rod. Dovada vizibilă că întoarcerea mărturisită este reală.", after: "rod, fruct; figurat, rezultat." },
  { bookId: "matei", chapter: 3, ref: "Matei 3:13-17", original: "βαπτίζω", before: "a cufunda, a scufunda; în uzul Noului Testament, a boteza. Câmpul lexical descrie sensul cuvântului; aplicația doctrinară a botezului rămâne în explicația pasajului.", after: "a boteza; în uz literal, a cufunda sau a scufunda." },
  { bookId: "matei", chapter: 4, ref: "Matei 4:18-22", original: "δεῦτε ὀπίσω μου", before: "veniți după Mine. Chemare la apropiere, urmare și ascultare personală.", after: "veniți după Mine; literal, «veniți» + «după/în urma» + «Mine»." },
  { bookId: "matei", chapter: 5, ref: "Matei 5:1-12", original: "μακάριοι", before: "fericiți, binecuvântați, aflați sub bunăvoința lui Dumnezeu.", after: "fericiți, binecuvântați." },
  { bookId: "matei", chapter: 5, ref: "Matei 5:1-12", original: "πτωχοὶ τῷ πνεύματι", before: "săraci în duh: cei care își recunosc nevoia deplină înaintea lui Dumnezeu.", after: "săraci în duh; πτωχός = sărac/nevoiaș, πνεῦμα = duh/spirit." },
  { bookId: "matei", chapter: 5, ref: "Matei 5:17-20", original: "πληρόω", before: "a împlini, a umple, a duce la ținta deplină.", after: "a umple, a împlini, a aduce la deplinătate." },
  { bookId: "matei", chapter: 5, ref: "Matei 5:27-32", original: "ἐπιθυμέω", before: "a pofti, a dori cu intenție. Contextul vorbește despre privirea întreținută pentru posesie sexuală.", after: "a dori, a pofti, a tânji după ceva." },
  { bookId: "matei", chapter: 5, ref: "Matei 5:43-48", original: "τέλειοι", before: "maturi, întregi, ajunși la țintă. Aici, iubirea care nu rămâne fragmentată de favoritism.", after: "desăvârșiți, compleți, maturi; ajunși la deplinătate." },
  { bookId: "matei", chapter: 6, ref: "Matei 6:9-13", original: "ἐπιούσιον", before: "de fiecare zi sau necesar zilei; un cuvânt rar legat de dependența zilnică.", after: "zilnic, pentru ziua de față sau necesar zilei; termen rar." },
  { bookId: "matei", chapter: 6, ref: "Matei 6:25-34", original: "μεριμνάω", before: "a fi îngrijorat, tras în mai multe direcții de grijă.", after: "a se îngrijora, a fi preocupat sau anxios." },
  { bookId: "matei", chapter: 7, ref: "Matei 7:6-12", original: "αἰτεῖτε, ζητεῖτε, κρούετε", before: "cereți, căutați, bateți: o chemare continuă la dependență și stăruință.", after: "cereți, căutați, bateți; trei forme imperative ale verbelor αἰτέω, ζητέω și κρούω." },
  { bookId: "matei", chapter: 7, ref: "Matei 7:15-23", original: "καρπός", before: "rod, rezultatul vizibil și repetat al naturii unui pom.", after: "rod, fruct; figurat, rezultat." },
  { bookId: "matei", chapter: 7, ref: "Matei 7:15-23", original: "ἀνομία", before: "fărădelege, trăire care respinge voia și stăpânirea lui Dumnezeu.", after: "fărădelege, nelegiuire; ceea ce este contrar legii." }
]

const files = []
for (const dir of CORPUS_DIRS) {
  if (!fs.existsSync(dir)) fail(`missing corpus ${path.relative(ROOT, dir)}`)
  for (const name of fs.readdirSync(dir).filter((item) => item.endsWith(".json"))) files.push(path.join(dir, name))
}

let applied = 0
for (const fix of FIXES) {
  let matches = 0
  for (const file of files) {
    const book = JSON.parse(fs.readFileSync(file, "utf8"))
    if (book.id !== fix.bookId) continue
    const chapter = (book.chapters ?? []).find((item) => item.number === fix.chapter)
    if (!chapter) continue
    for (const unit of chapter.units ?? []) {
      if (unit.ref !== fix.ref) continue
      for (const word of unit.words ?? []) {
        if (word.original !== fix.original) continue
        if (word.meaning !== fix.before) fail(`${fix.ref} ${fix.original}: current meaning changed unexpectedly: ${word.meaning}`)
        word.meaning = fix.after
        matches += 1
        applied += 1
      }
    }
    if (matches) fs.writeFileSync(file, JSON.stringify(book, null, 2) + "\n", "utf8")
  }
  if (matches !== 1) fail(`${fix.ref} ${fix.original}: expected exactly one lexical target, found ${matches}`)
}

console.log(`NT lexicon editorial fixes wave 1: ${applied}/${FIXES.length} targeted meanings separated from passage application.`)
