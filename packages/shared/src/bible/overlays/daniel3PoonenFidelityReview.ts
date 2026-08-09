import type { ExplainedBookOverlay, ExplainedOverlayChapter } from "../explainedOverlay.js"

const transcript = ".research/poonen-through-the-bible-OT/transcripts/daniel.txt"

function restoreDaniel3(chapter: ExplainedOverlayChapter): ExplainedOverlayChapter {
  if (chapter.number !== 3) return chapter

  return {
    ...chapter,
    title: "Daniel 3 — Cel mai mare miracol: când toți se pleacă, trei oameni rămân în picioare",
    summary:
      "Nebucadnețar cere închinare înaintea chipului de aur, dar Șadrac, Meșac și Abed-Nego refuză chiar dacă Dumnezeu nu îi va izbăvi fizic. Cel mai mare miracol al capitolului nu este doar ieșirea lor din cuptor, ci faptul că, atunci când toți ceilalți se pleacă, trei oameni rămân în picioare. În foc ard numai frânghiile: încercările pe care Satan le folosește împotriva credinciosului pot arde tocmai lucrurile pământești care îl leagă și îl pot scoate mai liber.",
    units: chapter.units.map((unit) => {
      if (unit.from === 1 && unit.to === 18) {
        return {
          ...unit,
          heading: "Cel mai mare miracol: trei oameni nu se pleacă",
          teaching:
            "Împăratul ridică chipul și poruncește tuturor să se plece. Presiunea este totală: majoritatea se închină, iar refuzul înseamnă cuptorul. Cei trei nu negociază și nu spun: «ne plecăm acum și cerem iertare după aceea».\n\nEi spun că Dumnezeu este capabil să-i izbăvească, dar adaugă: «chiar dacă nu», tot nu se vor închina idolului. Ascultarea lor nu depinde de rezultatul pe care Dumnezeu îl va alege.\n\nCel mai mare miracol al capitolului este acesta: când toată mulțimea se pleacă, trei oameni rămân în picioare. Miracolul începe înainte de cuptor, în conștiința care refuză compromisul chiar când este singură.\n\nCredința adevărată nu spune numai «Dumnezeu mă va scoate». Ea poate spune și «dacă nu mă scoate, tot nu mă voi pleca». Dumnezeu este vrednic de ascultare indiferent de rezultatul imediat.",
          source: {
            kind: "poonen",
            transcript,
            anchor:
              "Daniel 3 ... if God delivers us well and good; if he doesn't we're still not going to bow down ... greatest miracle ... when everybody bowed down three people did not bow down",
          },
          explanationKind: "exposition",
          forYourHeart:
            "Nu aștepta cuptorul ca să hotărăști cui îi aparții. Biruința începe când toți se pleacă și tu rămâi în picioare înaintea lui Dumnezeu.",
        }
      }

      if (unit.from === 19 && unit.to === 25) {
        return {
          ...unit,
          heading: "În foc ard frânghiile — încercarea arde lucrurile care ne leagă",
          teaching:
            "Cei trei sunt aruncați în cuptor legați, dar înăuntru Nebucadnețar îi vede umblând liberi. În foc ard frânghiile: ceea ce arde sunt frânghiile cu care fuseseră legați.\n\nAceasta este o imagine minunată a încercărilor. Când Satan ne hărțuiește și ajungem în foc, focul poate arde tocmai lucrurile care ne leagă. Atașamentele față de lucrurile pământești pot fi arse, iar omul poate ieși mai liber decât a intrat.\n\nDe aceea putem mulțumi lui Dumnezeu pentru focuri și pentru încercări. Vrăjmașul intenționează să ne distrugă, dar Dumnezeu poate folosi chiar focul ca să ardă legăturile care ne țineau.\n\nCei trei nu ies doar supraviețuitori; ies dezlegați. Aceasta este lucrarea pe care Dumnezeu o poate face prin încercare în omul care refuză să se plece înaintea idolului.",
          source: {
            kind: "poonen",
            transcript,
            anchor:
              "Daniel 3 ... only the ropes got burned ... when Satan harasses us ... he burns the things that bind us ... attachment to earthly things goes ... ropes are burnt and we come out free ... thank God for the fires, thank God for the trials",
          },
          explanationKind: "exposition",
          forYourHeart:
            "În încercare, întreabă-L pe Dumnezeu ce frânghie vrea să ardă. Poți ieși din foc mai liber decât ai intrat.",
        }
      }

      return unit
    }),
  }
}

export function restoreDaniel3PoonenFidelity(book: ExplainedBookOverlay): ExplainedBookOverlay {
  return { ...book, chapters: book.chapters.map(restoreDaniel3) }
}
