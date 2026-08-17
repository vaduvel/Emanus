import type { BibleChapter, BibleUnit } from "./types.js"

const canonicalSource = (label: string) => `Emanus — exegeză canonică: ${label}`

function replaceUnit(chapter: BibleChapter, unitId: string, patch: Partial<BibleUnit>): BibleChapter {
  return {
    ...chapter,
    units: chapter.units.map((unit) => (unit.id === unitId ? { ...unit, ...patch } : unit)),
  }
}

function reviewChapter16(chapter: BibleChapter): BibleChapter {
  const teaching = [
    "Textul spune două lucruri în aceeași propoziție și nu trebuie să ștergem niciunul: Duhul DOMNULUI Se depărtase de Saul, iar un `ruah ra'ah me'et YHWH` — un duh rău/vătămător «de la DOMNUL» — îl înspăimânta sau îl tulbura. `Ra'ah` poate descrie rău moral, dar și ceva vătămător/calamitos; aici agentul este un duh, iar narațiunea îl așază explicit sub suveranitatea judiciară a lui Dumnezeu.",
    "Aceasta nu înseamnă că Dumnezeu devine moral rău sau că produce păcatul ca păcat. Scriptura poate spune că Dumnezeu trimite sau lasă să lucreze un agent de judecată și, în același timp, să păstreze responsabilitatea morală a creaturii. Judecători 9:23 folosește o formulă asemănătoare despre un duh rău trimis între Abimelec și oamenii din Sihem, iar 1 Împărați 22 descrie un duh de minciună care intră într-o judecată autorizată de Dumnezeu asupra lui Ahab. Iacov 1:13–17 limitează clar concluzia morală: Dumnezeu nu ispitește pe nimeni la rău și orice dar bun vine de la El.",
    "Contextul lui Saul este unul de judecată după neascultare repetată, nu un manual pentru diagnosticarea tulburărilor psihice. Nu este biblic să vezi depresie, anxietate, psihoză sau altă suferință psihică la un om modern și să concluzionezi automat «are un duh rău de la Dumnezeu». Capitolul relatează cazul profetic al unui rege anume.",
    "David este chemat să cânte, iar Saul primește alinare și duhul se retrage. Muzica este un mijloc real de liniștire în această poveste, dar nu devine tehnică universală de exorcizare. Textul accentuează și drumul lui David: omul uns pentru viitorul tron intră mai întâi să slujească în casa regelui care îl va persecuta.",
    "Contrastul capitolului rămâne puternic: Duhul DOMNULUI vine peste David, iar Saul intră sub o judecată în care pacea lui se destramă. Ungerea nu îi dă însă lui David dreptul să grăbească tronul; urmează ani de slujire, fugă și formare.",
  ].join("\n\n")

  return replaceUnit(chapter, "1-samuel-16-14-23", {
    heading: "Duhul DOMNULUI Se depărtează de Saul, iar un duh vătămător «de la DOMNUL» îl tulbură",
    teaching,
    explanationKind: "exposition",
    explanationSource: canonicalSource("1 Samuel 16:14-23; Judecători 9:23; 1 Împărați 22; Iacov 1:13-17"),
    crossRefs: ["Judecători 9:23", "1 Împărați 22:19-23", "Iacov 1:13-17"],
    forYourHeart:
      "Nu micșora suveranitatea lui Dumnezeu ca să rezolvi pasajul greu, dar nici nu-L transforma pe Dumnezeu în autor moral al păcatului. Judecata Lui și sfințenia Lui trebuie ținute împreună.",
  })
}

function reviewChapter28(chapter: BibleChapter): BibleChapter {
  const teaching = [
    "Saul se deghizează și caută la En-Dor tocmai practica pe care Legea o interzicea și pe care el însuși încercase s-o îndepărteze din țară. Criza nu transformă o practică interzisă într-o cale legitimă de călăuzire. 1 Cronici 10:13–14 va interpreta moartea lui Saul spunând explicit că a fost necredincios și pentru că a consultat un medium în loc să caute pe DOMNUL în ascultare.",
    "Narațiunea nu spune «un demon care s-a prefăcut că este Samuel». După ce femeia vede apariția, naratorul folosește repetat numele Samuel: Saul înțelege că este Samuel, Samuel îi vorbește, iar mesajul lui Samuel este redat ca atare. De aceea explicația cea mai apropiată de forma textului este că povestirea prezintă evenimentul ca apariția lui Samuel, permisă suveran de Dumnezeu în acest caz extraordinar. Au existat în istoria interpretării și alte opinii — iluzie, spirit înșelător, reprezentare — dar nu trebuie să le transformăm în ceea ce «spune clar» textul.",
    "Reacția femeii poate sugera că ceea ce se întâmplă îi depășește controlul obișnuit, însă aceasta rămâne o inferență. Punctul sigur este că mediumul nu produce un mesaj alternativ de salvare. Mesajul repetă judecata deja dată prin profetul legitim: Saul nu a ascultat de DOMNUL, împărăția a fost dată altuia, iar înfrângerea este aproape.",
    "Cuvintele «mâine tu și fiii tăi veți fi cu mine» nu trebuie folosite ca un curs complet despre starea morților sau ca dovadă că necromanția poate obține informație sigură despre lumea de dincolo. În idiomul narațiunii, Saul și fiii lui vor intra în moarte foarte curând. Doctrina despre moarte, înviere și judecată trebuie construită din întregul canon, nu dintr-o consultație pe care Scriptura o condamnă.",
    "Capitolul este și finalul unei traiectorii. Saul primise cuvânt prin Samuel când încă putea asculta; după ce l-a respins repetat, ajunge să caute noaptea o voce din lumea pe care Dumnezeu îi interzisese s-o consulte. Problema nu este că Dumnezeu ar fi fost prea greu de găsit, ci că Saul a dorit răspunsul fără ascultarea pe care o ceruse deja răspunsul precedent.",
  ].join("\n\n")

  return replaceUnit(chapter, "1-samuel-28-7-25", {
    heading: "Naratorul îl numește Samuel, dar episodul condamnă — nu legitimează — consultarea morților",
    teaching,
    explanationKind: "exposition",
    explanationSource: canonicalSource("1 Samuel 28:7-25; Levitic 19:31; Deuteronom 18:9-14; 1 Cronici 10:13-14"),
    crossRefs: ["Leviticul 19:31", "Deuteronom 18:9-14", "1 Cronici 10:13-14", "1 Samuel 15:22-29"],
    forYourHeart:
      "Nu căuta o cale ocultă spre răspunsul pe care ascultarea l-ar fi făcut deja limpede. Dumnezeu nu îți datorează o nouă revelație care să anuleze cuvântul pe care ai refuzat să-l primești.",
  })
}

export function reviewSamuel1Explanations(chapters: BibleChapter[]): BibleChapter[] {
  return chapters.map((chapter) => {
    if (chapter.number === 16) return reviewChapter16(chapter)
    if (chapter.number === 28) return reviewChapter28(chapter)
    return chapter
  })
}
