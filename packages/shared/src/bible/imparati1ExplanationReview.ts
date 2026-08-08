import type { BibleChapter, BibleUnit } from "./types.js"

const canonicalSource = (label: string) => `Emanus — exegeză canonică + Poonen unde este indicat: ${label}`

function replaceUnit(chapter: BibleChapter, unitId: string, patch: Partial<BibleUnit>): BibleChapter {
  return {
    ...chapter,
    units: chapter.units.map((unit) => (unit.id === unitId ? { ...unit, ...patch } : unit)),
  }
}

function reviewChapter22(chapter: BibleChapter): BibleChapter {
  return replaceUnit(chapter, "1-imparati-22-1-28", {
    heading: "Patru sute spun ce vrea regele; Mica dezvăluie chiar duhul de minciună înainte ca Ahab să aleagă",
    teaching: [
      "Ahab vrea să recucerească Ramot-Galaad și îl atrage pe Iosafat în alianță. Când se cere cuvântul DOMNULUI, aproximativ patru sute de proroci spun într-un glas: «suie-te, DOMNUL îl va da în mâna regelui». Unanimitatea nu este aici dovada adevărului.",
      "Iosafat simte că lipsește ceva și întreabă dacă mai există un proroc al DOMNULUI. Ahab răspunde că există Mica, dar îl urăște deoarece «nu-mi proroceste bine, ci rău». Acesta este contextul moral decisiv al scenei: regele nu pornește ca un căutător neutru care vrea adevărul cu orice preț. El a stabilit deja ce fel de mesaj iubește și ce fel de mesager urăște.",
      "Mesagerul îl presează pe Mica să-și acordeze cuvântul la consensul celorlalți. Mica răspunde: «ce-mi va spune DOMNUL, aceea voi vorbi». Poonen vede aici standardul slujitorului profetic: nu majoritatea, nu accesul la rege și nu perspectiva de a evita închisoarea decid mesajul.",
      "După ironia inițială și după vedenia lui Israel risipit ca niște oi fără păstor, Mica descrie consiliul ceresc: DOMNUL întreabă cine îl va ademeni pe Ahab ca să cadă la Ramot-Galaad, un duh se oferă să fie «duh de minciună» în gura prorocilor, iar DOMNUL îi spune că va izbuti și îl trimite. Textul nu trebuie îndulcit până la formula «Dumnezeu doar a stat deoparte». Narațiunea atribuie judecata suverană lui Dumnezeu și agentul înșelător unui duh care lucrează minciuna.",
      "Dar tocmai aici se vede că Dumnezeu nu devine mincinos. Profetul adevărat îi spune lui Ahab, înainte de luptă, exact ce s-a întâmplat: «iată, DOMNUL a pus un duh de minciună în gura tuturor prorocilor tăi și DOMNUL a hotărât rău împotriva ta». Ahab aude adevărul despre amăgire chiar înainte de a decide. Judecata lui este strâns legată de faptul că preferă mesajul care confirmă planul lui.",
      "Această structură se potrivește cu Ezechiel 14: omul își ridică idolii în inimă și poate ajunge sub o amăgire judiciară; și cu 2 Tesaloniceni 2: cei care nu primesc iubirea adevărului ajung sub o lucrare de rătăcire. Nu este imaginea unui Dumnezeu care păcălește arbitrar omul sincer, ci a adevărului refuzat până când minciuna iubită devine parte din judecată.",
      "Iacov 1 spune că Dumnezeu nu ispitește pe nimeni la rău și nu trebuie citit împotriva lui 1 Împărați 22. Dumnezeu rămâne sfânt și adevărat; duhul este agentul minciunii, iar Ahab este responsabil pentru răspunsul lui. Providența judiciară asupra înșelării nu transformă falsitatea în virtute divină.",
      "Nici nu folosim pasajul ca armă pentru a eticheta orice om care nu este de acord cu noi drept «trimis în amăgire de Dumnezeu». Mica are un cuvânt verificabil, se opune interesului regelui și rezultatul îi confirmă avertismentul. În comunitatea creștină, afirmațiile profetice trebuie testate prin Scriptură, adevăr și rod, nu prin satisfacția de a ne declara pe noi singurul glas autentic.",
      "Țedechia îl lovește pe Mica, iar Ahab îl trimite în închisoare cu hrană și apă puține. Mesajul adevărat nu este protejat de popularitate. Dar suferința mesagerului nu dovedește singură că mesajul este adevărat; dovada rămâne fidelitatea față de cuvântul lui Dumnezeu și împlinirea avertismentului.",
    ].join("\n\n"),
    explanationKind: "exposition",
    explanationSource: canonicalSource("1 Împărați 22:1-28; Ezechiel 14:1-11; 2 Tesaloniceni 2:9-12; Iacov 1:13-17; Zac Poonen — Through The Bible: 1 Kings"),
    crossRefs: ["Ezechiel 14:1-11", "2 Tesaloniceni 2:9-12", "Iacov 1:13-17", "Deuteronom 13:1-4", "1 Ioan 4:1"],
    forYourHeart:
      "Cel mai periculos profet fals nu este întotdeauna cel care spune ceva evident absurd, ci cel care îți spune exact ce ai decis deja că vrei să auzi.",
  })
}

export function reviewImparati1Explanations(chapters: BibleChapter[]): BibleChapter[] {
  return chapters.map((chapter) => (chapter.number === 22 ? reviewChapter22(chapter) : chapter))
}
