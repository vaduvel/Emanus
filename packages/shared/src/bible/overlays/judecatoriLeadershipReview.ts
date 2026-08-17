import type { ExplainedBookOverlay, ExplainedOverlayUnit } from "../explainedOverlay.js"

const transcript = ".research/poonen-through-the-bible-OT/transcripts/judges-ruth.txt"
const source = (anchor: string) => ({ kind: "poonen" as const, transcript, anchor })

const CH17_1_6: ExplainedOverlayUnit = {
  from: 1,
  to: 6,
  heading: "Un cult făcut după ochii omului într-o vreme fără conducere spirituală",
  teaching:
    "Mica mărturisește furtul argintului, mama lui rostește o binecuvântare și apoi consacră argint pentru un chip. În aceeași casă apar un sanctuar privat, un efod, terafimi și un fiu instalat ca preot. Limbajul religios este prezent peste tot, dar prezența vocabularului despre DOMNUL nu face automat cultul ascultător de DOMNUL.\n\nVersetul 6 dă diagnosticul editorial: «în vremea aceea nu era împărat în Israel; fiecare făcea ce era drept în ochii lui». Poonen folosește acest refren pentru întreaga carte și îl aplică foarte direct lipsei de conducere spirituală: când nu există oameni care Îl cunosc pe Dumnezeu și care țin poporul la standardul Cuvântului, fiecare ajunge să-și fabrice propria măsură a ceea ce este drept.\n\nPoonen nu laudă orice conducător doar fiindcă are titlu. La începutul expunerii spune tocmai contrariul: liderul care caută popularitate, ca Aaron în contrastul lui, nu poate conduce poporul pe calea necompromisă; problema Judecătorilor este că lipseau oameni care Îl cunoșteau pe Dumnezeu. Așadar antidotul la «fiecare face ce crede» nu este autoritarismul, ci conducerea supusă lui Dumnezeu.\n\nMica este o ilustrație perfectă a religiei după ochii proprii: folosește numele DOMNULUI, obiecte cultice și limbaj de consacrare, dar construiește un sistem pe care Dumnezeu nu i l-a poruncit. Omul poate fi foarte religios și, în același timp, să fie propriul lui standard final.\n\nAplicația lui Poonen este incomodă pentru creștinul modern: nu este suficient să spui «eu simt pace», «eu cred că e bine» sau «așa văd eu». Întrebarea este dacă ceea ce faci stă sub Cuvântul lui Dumnezeu și dacă accepți corectarea venită prin oameni care Îl cunosc cu adevărat pe Dumnezeu.",
  source: source("there was no king ... everyone did what was right in his own eyes ... no leader"),
  explanationKind: "exposition",
  forYourHeart:
    "Unde ai înlocuit «ce spune Dumnezeu?» cu «mie mi se pare corect»? Religia făcută după ochii tăi poate păstra vocabular biblic și totuși să fie idolatrie.",
}

const CH21_25: ExplainedOverlayUnit = {
  from: 25,
  to: 25,
  heading: "Ultimul verdict: fiecare făcea ce era drept în ochii lui",
  teaching:
    "Cartea se încheie cu propoziția care a explicat din interior degradarea ei: «în vremea aceea nu era împărat în Israel; fiecare făcea ce era drept în ochii lui». După idolatria lui Mica, cultul danit, violența din Ghibea, războiul civil, masacrul de la Iabeș-Galaad și răpirea femeilor de la Șilo, refrenul nu este o laudă a autonomiei morale. Este diagnosticul unei comunități în care oamenii își justifică propriile soluții.\n\nPoonen ia acest refren și spune că exact așa trăiesc mulți creștini când nu au conducere spirituală: fiecare face ceea ce este drept în propriii ochi. El leagă problema de începutul cărții, unde generația nouă «nu Îl cunoștea pe DOMNUL». Nu lipsa unei structuri administrative este rădăcina cea mai adâncă, ci lipsa oamenilor care Îl cunosc pe Dumnezeu.\n\nTrebuie păstrată și partea ascuțită a predicii lui Poonen despre lideri. El spune că un lider care caută popularitate nu poate ține poporul pe calea dreaptă și necompromisă. Prin urmare, soluția nu este «fă ce zice orice lider», ci caută conducerea unui om supus Cuvântului, care Îl cunoaște pe Dumnezeu mai mult decât își iubește popularitatea.\n\nNoul Testament nu îl face pe fiecare credincios propriul papă. El dă Duhul Sfânt fiecărui credincios, dar dă și păstori, învățători, prezbiteri, mustrare reciprocă și porunca de a cerceta toate lucrurile după adevăr. Maturitatea nu este nici independență încăpățânată, nici supunere oarbă.\n\nFinalul Judecătorilor rămâne astfel o întrebare pentru cititor: cine stabilește în practică ce este drept în viața ta — ochii tăi, cultura, liderul popular sau Cuvântul Dumnezeului pe care spui că Îl urmezi?",
  source: source("book of Judges ... no leader ... everyone did what was right in their own eyes"),
  explanationKind: "exposition",
  forYourHeart:
    "Nu te mulțumi că alegerea ta «pare dreaptă». Întreabă dacă poate sta în lumina Scripturii și dacă ești suficient de smerit ca să fii corectat.",
}

export function reviewJudecatoriLeadership(book: ExplainedBookOverlay): ExplainedBookOverlay {
  return {
    ...book,
    chapters: book.chapters.map((chapter) => {
      if (chapter.number === 17) {
        return {
          ...chapter,
          units: chapter.units.map((unit) =>
            unit.from === 1 && unit.to === 6 ? CH17_1_6 : unit,
          ),
        }
      }
      if (chapter.number === 21) {
        return {
          ...chapter,
          units: chapter.units.map((unit) =>
            unit.from === 25 && unit.to === 25 ? CH21_25 : unit,
          ),
        }
      }
      return chapter
    }),
  }
}
