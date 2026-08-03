import type { BibleBook } from "./types.js"
import { buildNtChapter, ntTeaching, type NtCompletionBookSpec } from "./ntCompletionHelpers.js"
import { doiTesaloniceniPassage, doiTesaloniceniVerseCount } from "./doiTesaloniceniText.js"
import { unuTimoteiPassage, unuTimoteiVerseCount } from "./unuTimoteiText.js"
import { doiTimoteiPassage, doiTimoteiVerseCount } from "./doiTimoteiText.js"
import { evreiPassage, evreiVerseCount } from "./evreiText.js"
import { iacovPassage, iacovVerseCount } from "./iacovText.js"
import { unuPetruPassage, unuPetruVerseCount } from "./unuPetruText.js"
import { doiPetruPassage, doiPetruVerseCount } from "./doiPetruText.js"
import { unuIoanPassage, unuIoanVerseCount } from "./unuIoanText.js"
import { doiIoanPassage, doiIoanVerseCount } from "./doiIoanText.js"
import { treiIoanPassage, treiIoanVerseCount } from "./treiIoanText.js"
import { iudaPassage, iudaVerseCount } from "./iudaText.js"
import { apocalipsaPassage, apocalipsaVerseCount } from "./apocalipsaText.js"

interface CompletionBookDefinition extends NtCompletionBookSpec {
  order: number
  blurb: string
  themes: string[]
}

const PHASES = [
  ["Deschiderea pasajului", "așază fundația capitolului"],
  ["Adevărul pus în lumină", "dezvoltă argumentul și corectează perspectivele greșite"],
  ["Chemarea inimii", "mută adevărul din informație în caracter și ascultare"],
  ["Viața comunității", "arată cum se vede credința în relații și responsabilitate"],
  ["Încheiere și speranță", "leagă îndemnul de promisiunea și fidelitatea lui Dumnezeu"],
] as const

function rangesFor(last: number): Array<readonly [number, number]> {
  const pieces = last <= 15 ? 3 : last <= 25 ? 4 : 5
  const cuts = [1]
  for (let index = 1; index < pieces; index += 1) {
    cuts.push(Math.round((index * last) / pieces) + 1)
  }
  cuts.push(last + 1)
  return cuts
    .slice(0, -1)
    .map((start, index) => [start, cuts[index + 1] - 1] as const)
    .filter(([start, end]) => start <= end)
}

function editorialGuard(id: string, chapter: number, theme: string): string {
  const lowered = theme.toLowerCase()
  if (["1-timotei", "2-timotei", "1-petru", "3-ioan"].includes(id)) {
    return "Autoritatea spirituală este slujire sub Cuvânt, nu drept de a controla conștiința, banii, relațiile sau accesul unei persoane la ajutor și siguranță."
  }
  if (["suferin", "persecu", "încerc", "disciplin"].some((word) => lowered.includes(word))) {
    return "Suferința pentru Hristos nu obligă o victimă să rămână în abuz; protecția, raportarea răului și ajutorul competent sunt compatibile cu credința."
  }
  if (["2-tesaloniceni", "2-petru", "apocalipsa", "iuda"].includes(id)) {
    return "Profeția biblică cheamă la trezvie și sfințenie, nu la panică, fixarea de date, teorii conspiraționiste sau manipularea oamenilor prin frică."
  }
  if (id === "iacov" && chapter === 5) {
    return "Rugăciunea nu exclude îngrijirea medicală, psihologică ori juridică; credința nu cere ascunderea bolii, violenței sau exploatării."
  }
  if (["1-ioan", "2-ioan"].includes(id)) {
    return "Dragostea creștină nu cere tolerarea minciunii, abuzului ori coerciției; adevărul, limitele sănătoase și protejarea celui vulnerabil rămân necesare."
  }
  return "Aplicația rămâne sub caracterul lui Isus: adevărul nu poate fi folosit pentru rușinare, constrângere, exploatare sau anularea responsabilității personale."
}

function buildBook(definition: CompletionBookDefinition): BibleBook {
  const chapters = definition.themes.map((theme, index) => {
    const number = index + 1
    const last = definition.verseCount(number)
    const units = rangesFor(last).map(([from, to], unitIndex) => {
      const [phase, action] = PHASES[Math.min(unitIndex, PHASES.length - 1)]
      return {
        verses: [from, to] as const,
        heading: `${phase}: ${theme}`,
        teaching: ntTeaching(
          `Versetele ${from}–${to} fac parte din tema capitolului: ${theme}. În această secțiune, textul ${action}. Sensul fiecărei afirmații trebuie păstrat în curgerea capitolului, în centrul Evangheliei și în lumina caracterului lui Isus.`,
          "O citire verset cu verset nu urmărește doar acumularea de informații, ci pocăință, credință și o viață transformată. Întrebarea practică este ce descoperă pasajul despre Dumnezeu, ce corectează în motivațiile noastre și ce pas concret de ascultare cere.",
          editorialGuard(definition.id, number, theme),
        ),
        forYourHeart: `În lumina versetelor ${from}–${to}, ce trebuie să crezi, să părăsești sau să practici astăzi?`,
      }
    })
    return buildNtChapter(definition, {
      number,
      title: `${definition.name} ${number} — ${theme}`,
      summary: `${definition.name} ${number} urmărește tema: ${theme}. Capitolul unește adevărul despre lucrarea lui Dumnezeu cu răspunsul concret al credinței, astfel încât doctrina să devină caracter, închinare și slujire.`,
      literaryContext: `Capitolul ${number} continuă argumentul cărții ${definition.name} și trebuie citit împreună cu pasajele dinainte și de după el. Unitățile editoriale păstrează acoperirea integrală a textului RCCV, fără să înlocuiască Scriptura cu explicația.`,
      historicalContext: `Cartea ${definition.name} se adresează unor credincioși reali, cu presiuni, întrebări și responsabilități concrete. Contextul inițial împiedică folosirea izolată a unui verset pentru a susține controlul, frica sau o doctrină străină de întregul mesaj apostolic.`,
      units,
      prayer: `Doamne Isuse, luminează-mi mintea prin ${definition.name} ${number}. Fă adevărul despre ${theme.toLowerCase()} să devină ascultare, dragoste și curaj. Păzește-mă de înșelare și de folosirea greșită a Scripturii. Amin.`,
    })
  })
  return { id: definition.id, name: definition.name, testament: "nt", order: definition.order, blurb: definition.blurb, chapters }
}

export const DOI_TESALONICENI = buildBook({ id: "2-tesaloniceni", name: "2 Tesaloniceni", order: 53, blurb: "Statornicie în necaz, discernământ despre ziua Domnului și o viață responsabilă până la venirea lui Hristos.", themes: ["Credința care crește în persecuție și dreptatea lui Dumnezeu la arătarea lui Hristos", "Ziua Domnului, lepădarea de credință, omul fărădelegii și chemarea la statornicie", "Rugăciune, disciplină frățească și munca liniștită în așteptarea Domnului"], passage: doiTesaloniceniPassage, verseCount: doiTesaloniceniVerseCount })
export const UNU_TIMOTEI = buildBook({ id: "1-timotei", name: "1 Timotei", order: 54, blurb: "Învățătură sănătoasă, conducere curată și o comunitate în care evlavia se vede în relații, grijă și administrarea responsabilă.", themes: ["Evanghelia harului, combaterea speculațiilor și mărturia lui Pavel ca model al îndurării", "Rugăciune pentru toți, mijlocirea unică a lui Hristos și mărturia ordonată a bisericii", "Caracterul supraveghetorilor și diaconilor, casa lui Dumnezeu și taina evlaviei", "Apostazia, disciplina personală și slujitorul care veghează la viață și învățătură", "Grija pentru văduve, respectul față de prezbiteri și judecata fără părtinire", "Evlavia cu mulțumire, pericolul iubirii de bani și responsabilitatea celor bogați"], passage: unuTimoteiPassage, verseCount: unuTimoteiVerseCount })
export const DOI_TIMOTEI = buildBook({ id: "2-timotei", name: "2 Timotei", order: 55, blurb: "Ultima chemare a lui Pavel la curaj, fidelitate față de Evanghelie, folosirea dreaptă a Scripturii și terminarea alergării.", themes: ["Darul reaprins, curajul în suferință și păzirea comorii Evangheliei", "Harul care întărește, lucrătorul încercat și vasul curățit pentru orice lucrare bună", "Vremurile grele, puterea aparentă fără evlavie și Scriptura insuflată de Dumnezeu", "Propovăduirea Cuvântului, alergarea încheiată și credincioșia Domnului în singurătate"], passage: doiTimoteiPassage, verseCount: doiTimoteiVerseCount })
export const EVREI = buildBook({ id: "evrei", name: "Evrei", order: 58, blurb: "Supremația lui Hristos, noul legământ și chemarea de a ne apropia de Dumnezeu cu credință, perseverență și închinare.", themes: ["Fiul, revelația deplină a lui Dumnezeu, mai presus de îngeri și susținător al tuturor lucrurilor", "Isus făcut asemenea fraților, biruitor asupra morții și Mare Preot milos", "Isus mai mare decât Moise și avertismentul împotriva inimii împietrite", "Odihna lui Dumnezeu, Cuvântul care cercetează și tronul harului", "Marele Preot chemat de Dumnezeu și maturizarea dincolo de începuturile credinței", "Pericolul stagnării, nădejdea sigură și ancora care intră dincolo de perdea", "Melhisedec și preoția veșnică, desăvârșirea adusă prin Hristos", "Un legământ mai bun și lucrarea Marelui Preot în adevăratul sanctuar", "Umbra vechiului cort, sângele lui Hristos și curățirea conștiinței pentru slujire", "Jertfa unică, accesul deplin, perseverența și avertismentul de a nu da înapoi", "Credința care vede promisiunea și ascultă înainte de împlinire", "Alergarea cu ochii la Isus, disciplina Tatălui și împărăția care nu se clatină", "Dragostea frățească, sfințenia relațiilor, conducerea sănătoasă și închinarea prin Isus"], passage: evreiPassage, verseCount: evreiVerseCount })
export const IACOV = buildBook({ id: "iacov", name: "Iacov", order: 59, blurb: "Credință pusă în practică prin răbdare, stăpânirea limbii, dreptate fără părtinire, smerenie și rugăciune.", themes: ["Încercarea care produce răbdare, înțelepciunea cerută cu credință și ascultarea Cuvântului", "Fără părtinire, legea împărătească și credința demonstrată prin fapte", "Puterea limbii și înțelepciunea de sus, curată și pașnică", "Războaiele poftelor, prietenia cu lumea, smerenia și dependența de voia lui Dumnezeu", "Dreptate față de lucrători, răbdare până la venirea Domnului și rugăciunea credinței"], passage: iacovPassage, verseCount: iacovVerseCount })
export const UNU_PETRU = buildBook({ id: "1-petru", name: "1 Petru", order: 60, blurb: "Nădejde vie în suferință, identitate sfântă și mărturie blândă într-o lume ostilă.", themes: ["Nădejdea vie prin înviere, credința încercată și chemarea la sfințenie", "Creștere prin Cuvânt, pietre vii și mărturie onorabilă sub autorități", "Relații în care binele nu justifică abuzul, răspuns blând și suferință pentru dreptate", "Mintea lui Hristos, administrarea darurilor și bucuria în încercarea pentru Numele Lui", "Păstorire fără dominație, smerenie, veghe și restaurarea făcută de Dumnezeu"], passage: unuPetruPassage, verseCount: unuPetruVerseCount })
export const DOI_PETRU = buildBook({ id: "2-petru", name: "2 Petru", order: 61, blurb: "Creștere în caracterul lui Hristos, discernerea învățătorilor falși și o viață sfântă în lumina zilei Domnului.", themes: ["Tot ce trebuie pentru viață și evlavie, virtuțile credinței și mărturia apostolică despre Hristos", "Învățători falși, exploatare religioasă și dreptatea lui Dumnezeu care păzește pe cei evlavioși", "Batjocura despre venirea Domnului, răbdarea lui Dumnezeu și chemarea la sfințenie"], passage: doiPetruPassage, verseCount: doiPetruVerseCount })
export const UNU_IOAN = buildBook({ id: "1-ioan", name: "1 Ioan", order: 62, blurb: "Siguranța vieții veșnice prin Hristos, umblare în lumină, ascultare, iubire și discernerea duhurilor.", themes: ["Cuvântul vieții, părtășia în lumină și mărturisirea sinceră a păcatului", "Isus Mijlocitorul, ascultarea, iubirea fraților și discernerea amăgirii", "Identitatea de copii ai lui Dumnezeu, curățirea speranței și iubirea în faptă", "Încercarea duhurilor, mărturisirea lui Hristos și dragostea care alungă frica", "Credința care biruie lumea, mărturia despre Fiul și siguranța vieții veșnice"], passage: unuIoanPassage, verseCount: unuIoanVerseCount })
export const DOI_IOAN = buildBook({ id: "2-ioan", name: "2 Ioan", order: 63, blurb: "Adevărul și dragostea rămân împreună, iar ospitalitatea creștină cere discernământ față de învățătura falsă.", themes: ["Umblarea în adevăr și dragoste, păzirea învățăturii lui Hristos și ospitalitatea cu discernământ"], passage: doiIoanPassage, verseCount: doiIoanVerseCount })
export const TREI_IOAN = buildBook({ id: "3-ioan", name: "3 Ioan", order: 64, blurb: "Ospitalitatea față de lucrătorii adevărului, opoziția față de dominația religioasă și imitarea binelui.", themes: ["Gaiu, ospitalitatea care cooperează cu adevărul, Diotref și refuzul conducerii dominatoare"], passage: treiIoanPassage, verseCount: treiIoanVerseCount })
export const IUDA = buildBook({ id: "iuda", name: "Iuda", order: 65, blurb: "Lupta pentru credința dată sfinților, discernerea corupției și păstrarea în dragostea lui Dumnezeu.", themes: ["Credința apărată fără ură, avertismentul față de corupție și zidirea în dragostea lui Dumnezeu"], passage: iudaPassage, verseCount: iudaVerseCount })
export const APOCALIPSA = buildBook({ id: "apocalipsa", name: "Apocalipsa", order: 66, blurb: "Descoperirea lui Isus Hristos: chemare la biruință, judecata răului și speranța noii creații în care Dumnezeu locuiește cu oamenii.", themes: ["Isus Hristos descoperit ca Domn al istoriei și Cel care umblă în mijlocul bisericilor", "Mesajele către Efes, Smirna, Pergam și Tiatira: dragoste, fidelitate și pocăință", "Mesajele către Sardes, Filadelfia și Laodiceea: trezire, ușă deschisă și părtășie cu Hristos", "Tronul lui Dumnezeu, sfințenia închinării și Creatorul vrednic", "Mielul înjunghiat, singurul vrednic să deschidă cartea și închinarea întregii creații", "Pecețile, suferința istoriei și suveranitatea Mielului în mijlocul judecății", "Poporul pecetluit și mulțimea din toate neamurile înaintea tronului", "Trâmbițele, rugăciunile sfinților și avertismentele care cheamă la pocăință", "Judecăți care demască idolatria și refuzul omenirii de a se pocăi", "Îngerul puternic, cartea dulce și amară și responsabilitatea mărturiei", "Cei doi martori, împărăția Domnului și fidelitatea până la moarte", "Femeia, copilul și balaurul: conflictul spiritual și biruința prin sângele Mielului", "Fiarele, puterea politică și religioasă coruptă și chemarea la discernământ", "Mielul pe Sion, mesajele îngerilor și răbdarea sfinților", "Secerișul pământului și seriozitatea judecății drepte", "Cele șapte potire și avertismentul de a rămâne treaz", "Babilonul religios și alianța seducătoare dintre putere, lux și infidelitate", "Căderea Babilonului economic și chemarea de a nu participa la nedreptatea lui", "Nunta Mielului, Cuvântul credincios și victoria lui Hristos asupra puterilor răului", "Judecata finală, biruința asupra morții și cartea vieții", "Cer nou, pământ nou și Dumnezeu locuind cu oamenii fără moarte și plâns", "Râul vieții, venirea lui Isus și invitația finală: vino și ia apa vieții"], passage: apocalipsaPassage, verseCount: apocalipsaVerseCount })
