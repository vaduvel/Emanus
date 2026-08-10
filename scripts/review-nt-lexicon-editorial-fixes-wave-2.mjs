#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const CORPUS_DIRS = [
  path.join(ROOT, "docs", "data", "biblia-explicata", "nt-reviewed-recovered"),
  path.join(ROOT, "docs", "data", "biblia-explicata", "nt-source-first"),
]

function fail(message) {
  console.error(`[NT lexicon editorial fixes wave 2] ${message}`)
  process.exit(1)
}

const UPDATE = [
  { bookId: "matei", chapter: 8, ref: "Matei 8:1-4", original: "καθαρίζω", before: "a curăți. Termen medical și ritual, potrivit întoarcerii omului în comunitate.", after: "a curăți, a purifica." },
  { bookId: "matei", chapter: 12, ref: "Matei 12:22-32", original: "βλασφημία", before: "hulă, vorbire defăimătoare împotriva lui Dumnezeu și a lucrării Sale.", after: "hulă, defăimare, vorbire insultătoare; în context, împotriva lui Dumnezeu și a lucrării Sale." },
  { bookId: "matei", chapter: 16, ref: "Matei 16:13-20", original: "ἐκκλησία", before: "adunare, comunitate chemată. Aici, Biserica pe care Hristos o numește a Sa.", after: "adunare, comunitate; aici, Biserica pe care Hristos o numește a Sa." },
  { bookId: "matei", chapter: 18, ref: "Matei 18:15-20", original: "ἔλεγξον", before: "arată-i greșeala, confruntă prin adevăr cu scopul de a câștiga.", after: "arată-i greșeala, mustră-l; în context, confruntarea urmărește câștigarea fratelui." },
  { bookId: "matei", chapter: 20, ref: "Matei 20:1-16", original: "ὀφθαλμός ... πονηρός", before: "Literal, «ochi rău»: o expresie pentru invidie și zgârcenie, aici stârnite de bunătatea stăpânului.", after: "literal, «ochi rău»; în context, exprimă invidia față de bunătatea stăpânului." },
  { bookId: "matei", chapter: 28, ref: "Matei 28:16-20", original: "μαθητεύσατε", before: "Faceți ucenici: formați oameni care Îl urmează pe Isus, sunt botezați și învață să păzească poruncile Lui.", after: "faceți ucenici; verbul μαθητεύω înseamnă a face pe cineva ucenic." },

  { bookId: "marcu", chapter: 1, ref: "Marcu 1:14-20", original: "δεῦτε ὀπίσω μου", before: "veniți după Mine. Chemarea nu este o invitație la o opinie, ci la o urmare: Isus înainte, ucenicul în urma Lui.", after: "veniți după Mine; literal, «veniți» + «după/în urma» + «Mine»." },
  { bookId: "marcu", chapter: 1, ref: "Marcu 1:21-28", original: "ἐξουσία", before: "autoritate, drept de stăpânire. Nu este vorba de un ton mai tare, ci de o putere reală, care ascultă de cuvântul Domnului.", after: "autoritate, drept, putere de a acționa; în context, autoritatea reală a lui Isus." },
  { bookId: "marcu", chapter: 1, ref: "Marcu 1:40-45", original: "σπλαγχνίζομαι", before: "mi se face milă, mă îndur din adâncul ființei. Milă înseamnă că Dumnezeu nu se întoarce de la cel necurat; Se apropie și Se atinge.", after: "a avea milă, a simți compasiune profundă; în context, mila lui Isus față de omul necurat." },
  { bookId: "marcu", chapter: 3, ref: "Marcu 3:20-30", original: "βλασφημέω", before: "a huli, a vorbi de rău. Hula nu este orice cuvânt aspru, ci luarea de poziție împotriva a ceea ce se știe că este adevărat.", after: "a huli, a defăima, a vorbi insultător; în context, împotrivirea verbală față de lucrarea Duhului." },
  { bookId: "marcu", chapter: 4, ref: "Marcu 4:10-12", original: "μυστήριον", before: "taină, secret. În Scriptură nu înseamnă ceva de neînțeles, ci un plan al lui Dumnezeu pe care El Însuși îl descoperă celor care Îl urmează.", after: "taină, mister, secret; în Noul Testament poate desemna ceva ascuns și apoi descoperit de Dumnezeu." },
  { bookId: "marcu", chapter: 5, ref: "Marcu 5:1-20", original: "λεγιών", before: "legiune — unitate militară romană de ordinul miilor de soldați. Termenul nu este sinonim cu «cohortă»; în Marcu 5 numele subliniază numărul foarte mare al duhurilor.", after: "legiune; termen latin pentru o mare unitate militară romană, folosit aici ca nume care sugerează un număr foarte mare." },
  { bookId: "marcu", chapter: 5, ref: "Marcu 5:21-34", original: "σώζω", before: "mântuiesc, fac întreg, tămăduiesc. Cuvântul acoperă și sufletul, și trupul: mântuirea nu este doar despre lumea de dincolo.", after: "a salva, a mântui, a izbăvi; în unele contexte, a vindeca." },
  { bookId: "marcu", chapter: 5, ref: "Marcu 5:35-43", original: "καθεύδω", before: "dorm. Isus vorbește despre moarte cu un cuvânt pe care îl vor folosi apoi toți ai Lui: pentru cine este al Lui, moartea este somnul dinaintea deșteptării.", after: "a dormi; aici Isus folosește somnul ca imagine pentru moarte." },
  { bookId: "marcu", chapter: 8, ref: "Marcu 8:27-30", original: "Χριστός", before: "Unsul, Mesia cel făgăduit. Mărturisirea lui Petru nu Îl face pe Isus un profet între profeți, ci Unsul lui Dumnezeu, Cel așteptat de Israel.", after: "Unsul; titlul grecesc corespunzător lui Mesia/Hristos." },
  { bookId: "marcu", chapter: 8, ref: "Marcu 8:31-38", original: "ψυχή", before: "viața sufletească, viața care se caută pe sine. Isus nu vorbește despre viața trupului, ci despre acea viață care își apără propria păstrare, propria onoare și propria plăcere; a o pierde pentru El înseamnă a o câștiga cu adevărat.", after: "suflet, viață, persoană sau sine, după context; în Marcu 8 sensul are legătură cu viața/sinele pe care omul încearcă să-l păstreze." },

  { bookId: "luca", chapter: 1, ref: "Luca 1:26-38", original: "ῥῆμα", before: "cuvânt rostit. În context, făgăduința lui Dumnezeu nu este goală, ci poartă puterea necesară împlinirii ei.", after: "cuvânt, rostire, declarație; în context, cuvântul sau promisiunea lui Dumnezeu." },

  { bookId: "ioan", chapter: 1, ref: "Ioan 1:1-5", original: "Λόγος", before: "Cuvântul. Nu o simplă vorbire, ci Persoana prin care Dumnezeu Se face cunoscut și prin care toate au fost făcute.", after: "cuvânt, mesaj, rostire; în Ioan 1, «Cuvântul» este titlul folosit pentru Persoana prezentată în pasaj." },
  { bookId: "ioan", chapter: 1, ref: "Ioan 1:1-5", original: "φῶς", before: "lumina. Ceea ce descoperă, curată și arată drumul.", after: "lumină; în context, imagine pentru descoperire și călăuzire." },
  { bookId: "ioan", chapter: 1, ref: "Ioan 1:14-18", original: "μονογενής", before: "singurul născut, unicul de acest fel. Arată unicitatea Fiului fata de Tatăl.", after: "unic, singurul de acest fel; în context, unicitatea Fiului față de Tatăl." },
  { bookId: "ioan", chapter: 1, ref: "Ioan 1:35-51", original: "υἱὸς τοῦ ἀνθρώπου", before: "Fiul omului. Nume prin care Domnul Isus vorbește despre sine cu smerenie și slava laolalta.", after: "Fiul omului; titlu folosit de Isus despre Sine." },
  { bookId: "ioan", chapter: 2, ref: "Ioan 2:1-12", original: "δόξα", before: "slava. Frumusetea și greutatea dumnezeiasca aratate în Fiul.", after: "slavă, glorie, onoare; în context, slava arătată în Fiul." },
  { bookId: "ioan", chapter: 2, ref: "Ioan 2:13-22", original: "ζῆλος", before: "ravna. Foc sfant pentru onoarea lui Dumnezeu.", after: "râvnă, zel." },
  { bookId: "ioan", chapter: 3, ref: "Ioan 3:9-21", original: "κρίσις", before: "judecata. Punerea lucrurilor la lumina și aratarea lor asa cum sunt.", after: "judecată, actul sau hotărârea de judecare." },
  { bookId: "ioan", chapter: 5, ref: "Ioan 5:19-30", original: "ζωὴ ἐν ἑαυτῷ", before: "viață în Sine. Viață neîmprumutată, proprie dumnezeirii.", after: "viață în Sine; ζωή = viață, ἐν = în, ἑαυτῷ = în Sine/în el însuși." },
  { bookId: "ioan", chapter: 5, ref: "Ioan 5:19-30", original: "κρίσις", before: "judecata. Autoritatea de a pune toate lucrurile la lumina și de a da hotararea dreapta.", after: "judecată, actul sau hotărârea de judecare." },
  { bookId: "ioan", chapter: 5, ref: "Ioan 5:19-30", original: "τιμῶσι", before: "sa cinsteasca. Respect, onoare și inchinare cuvenite Fiului.", after: "să cinstească, să onoreze; în context, cinstirea Fiului." },
  { bookId: "ioan", chapter: 10, ref: "Ioan 10:1-18", original: "ποιμὴν ὁ καλός", before: "Pastorul cel bun. Pastor frumos, adevărat, vrednic și plin de jertfire.", after: "Păstorul cel bun; ποιμήν = păstor, καλός = bun, frumos sau nobil." },
  { bookId: "ioan", chapter: 10, ref: "Ioan 10:1-18", original: "περισσόν", before: "din belșug. viața dată de Hristos nu este saraca, ci plina.", after: "din belșug, din abundență, peste măsură." },
  { bookId: "ioan", chapter: 10, ref: "Ioan 10:19-30", original: "ἕν", before: "una. Unitate adanca intre Tatăl și Fiul.", after: "una, unul (formă neutră); în context, expresia despre Tatăl și Fiul." },
  { bookId: "ioan", chapter: 13, ref: "Ioan 13:1-17", original: "τέλος", before: "capat, deplinatate. Iubirea dusa pana la implinirea ei intreaga.", after: "sfârșit, capăt, țintă; în expresia εἰς τέλος poate avea sensul «până la capăt»." },
  { bookId: "ioan", chapter: 14, ref: "Ioan 14:15-26", original: "παράκλητος", before: "Mângâietor, ajutor, apărător. Cel chemat alături de ai lui Hristos.", after: "sfătuitor, ajutor, apărător; tradițional, Mângâietor." },
  { bookId: "ioan", chapter: 15, ref: "Ioan 15:18-27", original: "κόσμος", before: "lume. Omenirea organizată în răzvrătire față de Dumnezeu.", after: "lume; în contextul opoziției din Ioan 15, omenirea ostilă lui Hristos." },
  { bookId: "ioan", chapter: 16, ref: "Ioan 16:1-15", original: "παράκλητος", before: "Mângâietor, ajutor, apărător. Duhul Sfânt dat ucenicilor.", after: "sfătuitor, ajutor, apărător; tradițional, Mângâietor; aici, Duhul Sfânt." },
  { bookId: "ioan", chapter: 16, ref: "Ioan 16:1-15", original: "ἐλέγχω", before: "a dovedi vinovat, a aduce la lumină. Lucrarea Duhului asupra lumii.", after: "a mustra, a convinge de vină, a expune; în context, lucrarea Duhului față de lume." },
  { bookId: "ioan", chapter: 17, ref: "Ioan 17:1-5", original: "δόξα", before: "slavă. Greutatea și frumusețea dumnezeiască arătate în Fiul.", after: "slavă, glorie, onoare; în context, slava Fiului." },
  { bookId: "ioan", chapter: 19, ref: "Ioan 19:17-30", original: "παραδίδωμι τὸ πνεῦμα", before: "a-Și da duhul. Predarea vieții în mod voit.", after: "a da, a preda duhul; παραδίδωμι = a da/preda, πνεῦμα = duh/spirit." },
  { bookId: "ioan", chapter: 21, ref: "Ioan 21:15-19", original: "ἀγαπᾷς / φιλεῖς", before: "iubești. Limbajul dragostei cercetate și mărturisite înaintea Domnului.", after: "iubești; ἀγαπάω și φιλέω pot ambele însemna «a iubi», iar o opoziție rigidă între ele nu trebuie dedusă numai din lexic." },

  { bookId: "efeseni", chapter: 1, ref: "Efeseni 1:1-6", original: "huiothesia", originalAfter: "υἱοθεσία", before: "așezare ca fiu, înfiere cu drepturi și responsabilitate", after: "înfiere, adopție ca fiu; așezare în statutul de fiu." },
  { bookId: "efeseni", chapter: 2, ref: "Efeseni 2:8-10", original: "poiēma", originalAfter: "ποίημα", before: "lucrare făcută, operă, ceea ce este modelat de un creator", after: "lucrare, lucru făcut, operă sau creație." },
  { bookId: "filimon", chapter: 1, ref: "Filimon 1:8-16", original: "Ὀνήσιμος", before: "folositor, de folos. Pavel folosește sensul numelui pentru a arăta schimbarea omului care fusese nefolositor și acum devenise folositor.", after: "Onesimus, nume propriu; în versetul 11 Pavel construiește un joc de cuvinte între «nefolositor» și «folositor»." }
]

const REMOVE = [
  { bookId: "ioan", chapter: 5, ref: "Ioan 5:1-18", original: "Βηθεσδά", meaning: "Betesda. Numele a fost legat de ideea milei ori a harului, potrivit cu scena neputintei omenesti." },
  { bookId: "ioan", chapter: 20, ref: "Ioan 20:1-18", original: "ῥαββουνί", meaning: "Învățătorule. Formă caldă și personală de adresare." }
]

const files = []
for (const dir of CORPUS_DIRS) {
  if (!fs.existsSync(dir)) fail(`missing corpus ${path.relative(ROOT, dir)}`)
  for (const name of fs.readdirSync(dir).filter((item) => item.endsWith(".json"))) files.push(path.join(dir, name))
}

function findTarget(op) {
  const hits = []
  for (const file of files) {
    const book = JSON.parse(fs.readFileSync(file, "utf8"))
    if (book.id !== op.bookId) continue
    const chapter = (book.chapters ?? []).find((item) => item.number === op.chapter)
    if (!chapter) continue
    for (const unit of chapter.units ?? []) {
      if (unit.ref !== op.ref) continue
      for (let index = 0; index < (unit.words ?? []).length; index += 1) {
        const word = unit.words[index]
        if (word.original === op.original) hits.push({ file, book, unit, index, word })
      }
    }
  }
  return hits
}

let updated = 0
let removed = 0
for (const op of UPDATE) {
  const hits = findTarget(op)
  if (hits.length !== 1) fail(`${op.ref} ${op.original}: expected exactly one target, found ${hits.length}`)
  const hit = hits[0]
  if (hit.word.meaning !== op.before) fail(`${op.ref} ${op.original}: current meaning changed unexpectedly: ${hit.word.meaning}`)
  hit.word.meaning = op.after
  if (op.originalAfter) hit.word.original = op.originalAfter
  fs.writeFileSync(hit.file, JSON.stringify(hit.book, null, 2) + "\n", "utf8")
  updated += 1
}
for (const op of REMOVE) {
  const hits = findTarget(op)
  if (hits.length !== 1) fail(`${op.ref} ${op.original}: expected exactly one removal target, found ${hits.length}`)
  const hit = hits[0]
  if (hit.word.meaning !== op.meaning) fail(`${op.ref} ${op.original}: removal meaning changed unexpectedly: ${hit.word.meaning}`)
  hit.unit.words.splice(hit.index, 1)
  fs.writeFileSync(hit.file, JSON.stringify(hit.book, null, 2) + "\n", "utf8")
  removed += 1
}

console.log(`NT lexicon editorial fixes wave 2: ${updated} updated / ${removed} unsupported name notes removed.`)
