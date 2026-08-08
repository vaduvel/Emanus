import type { ExplainedBookOverlay, ExplainedOverlayChapter } from "../explainedOverlay.js"

const transcript = ".research/poonen-through-the-bible-OT/transcripts/psalms.txt"

function restorePsalm32(chapter: ExplainedOverlayChapter): ExplainedOverlayChapter {
  if (chapter.number !== 32) return chapter

  return {
    ...chapter,
    title: "Psalmul 32 — Fericirea iertării, păcatul acoperit și curățirea adusă prin sângele lui Isus",
    summary:
      "David vorbește despre fericirea omului a cărui fărădelege este iertată și al cărui păcat este acoperit. Tăcerea asupra păcatului îl usucă pe om, dar mărturisirea aduce iertare. În Vechiul Legământ era iertare și acoperire a păcatului; curățirea păcatului a venit după moartea lui Isus, prin sângele Lui. După iertare, omul este chemat să primească învățătura și călăuzirea lui Dumnezeu și să nu mai fie încăpățânat.",
    units: chapter.units.map((unit) => {
      if (unit.from !== 1 || unit.to !== 5) return unit
      return {
        ...unit,
        heading: "Iertat și acoperit — iar sângele lui Isus aduce curățirea",
        teaching:
          "Psalmul începe cu fericirea omului a cărui fărădelege este iertată și al cărui păcat este acoperit. David descrie apoi ce s-a întâmplat cât timp a tăcut: puterea i se usca și mâna lui Dumnezeu apăsa asupra lui. Când și-a recunoscut păcatul și nu și-a mai ascuns nelegiuirea, a primit iertare.\n\nÎn Vechiul Legământ găsim iertare și acoperirea păcatului. Curățirea păcatului a venit după moartea lui Isus: sângele lui Isus ne curățește. Jertfele vechi arătau înainte spre lucrarea deplină care avea să fie făcută prin Hristos.\n\nDe aceea, pentru creștin, vestea bună nu este numai că vina este iertată și acoperită, ci că sângele lui Isus curățește de păcat. Nu trebuie să ne întoarcem de la realitatea Noului Legământ la umbra celui vechi.\n\nDrumul spre această libertate începe cu adevărul înaintea lui Dumnezeu. David nu mai ascunde, nu mai justifică și nu mai păstrează păcatul în tăcere; îl mărturisește. Dumnezeu răspunde prin iertare, iar omul iertat poate merge mai departe sub călăuzirea Lui.",
        source: {
          kind: "poonen",
          transcript,
          anchor:
            "Psalm 32 ... whose sin is covered, not cleansed ... There's no cleansing of sin in the Old Covenant ... There's forgiveness and covering. Cleansing came only after Jesus died. The blood of Jesus cleanses us.",
        },
        explanationKind: "exposition",
        forYourHeart:
          "Nu ascunde păcatul înaintea lui Dumnezeu. Mărturisește-l, primește iertarea și trăiește în curățirea pe care sângele lui Isus o aduce în Noul Legământ.",
      }
    }),
  }
}

function restorePsalm51(chapter: ExplainedOverlayChapter): ExplainedOverlayChapter {
  if (chapter.number !== 51) return chapter

  return {
    ...chapter,
    title: "Psalmul 51 — Spală-mă, creează în mine o inimă curată și nu lua Duhul Tău de la mine",
    summary:
      "David scrie acest psalm după păcatul cu Bat-Șeba. El cere să fie spălat, recunoaște că Dumnezeu dorește adevăr în omul dinăuntru, cere o inimă curată și un duh statornic și se roagă: «nu lua Duhul Tău cel Sfânt de la mine». Aceasta era frica lui cea mai mare. Apoi cere să-i fie redată bucuria mântuirii și promite să-i învețe pe alții căile lui Dumnezeu.",
    units: chapter.units.map((unit) => {
      if (unit.from === 1 && unit.to === 6) {
        return {
          ...unit,
          heading: "Spală-mă și pune adevăr în omul dinăuntru",
          teaching:
            "David scrie după păcatul cu Bat-Șeba și vine la Dumnezeu fără să-și ascundă vina. El cere milă, ștergerea fărădelegii și spălare. Pocăința nu este numai regret pentru consecințe; este dorința de a fi curățit.\n\nÎn versetul 6, David recunoaște că Dumnezeu dorește adevăr în omul dinăuntru. Problema păcatului nu este numai fapta văzută în afară, ci lipsa adevărului în inimă. De aceea David cere ca Dumnezeu să lucreze în interior, acolo unde s-au născut minciuna și păcatul.\n\nAceasta este pocăința reală: omul încetează să-și apere imaginea și vrea adevăr înaintea lui Dumnezeu. Nu cere doar să scape de pedeapsă, ci să fie spălat și schimbat.",
          source: {
            kind: "poonen",
            transcript,
            anchor: "Psalm 51 ... David wrote when he sinned with Bathsheba ... wash me Lord ... truth in the inward parts",
          },
          explanationKind: "exposition",
        }
      }
      if (unit.from === 7 && unit.to === 12) {
        return {
          ...unit,
          heading: "Creează în mine o inimă curată — și nu lua Duhul Tău de la mine",
          teaching:
            "David cere curățire, o inimă curată și un duh statornic. El nu se mulțumește să fie iertat în exterior; vrea ca Dumnezeu să facă ceva nou înăuntrul lui.\n\nApoi vine versetul care arată frica lui cea mai mare: «nu mă lepăda de la Fața Ta și nu lua de la mine Duhul Tău cel Sfânt». Mai mult decât pierderea tronului, a reputației sau a confortului, David se teme să nu piardă prezența și Duhul lui Dumnezeu.\n\nAceasta arată ce prețuia cu adevărat. Omul poate pierde multe lucruri și totuși să rămână bogat dacă Îl are pe Dumnezeu; dar succesul exterior nu poate înlocui prezența Lui.\n\nDavid cere apoi: «dă-mi iarăși bucuria mântuirii Tale». Păcatul îi luase bucuria. Restaurarea nu este doar o schimbare de situație, ci revenirea bucuriei unei relații drepte cu Dumnezeu.",
          source: {
            kind: "poonen",
            transcript,
            anchor:
              "Psalm 51 ... create in me a clean heart ... verse 11 ... that's what he scared about the most ... don't take your Holy Spirit from me Lord ... restore to me the joy",
          },
          explanationKind: "exposition",
          words: [
            {
              original: "לֵב טָהוֹר בְּרָא־לִי",
              transliteration: "lev tahor bera-li",
              language: "ebraica",
              meaning: "creează pentru mine/în mine o inimă curată",
              verseRef: "Psalmul 51:10",
              lexicalSource: "WLC-OSHB",
            },
          ],
          forYourHeart:
            "Ce te sperie mai mult să pierzi: confortul și reputația, sau prezența lui Dumnezeu? David știa ce era cu adevărat de neînlocuit.",
        }
      }
      return unit
    }),
  }
}

export function restorePsalmiPoonenFidelity(book: ExplainedBookOverlay): ExplainedBookOverlay {
  return {
    ...book,
    chapters: book.chapters.map((chapter) => restorePsalm51(restorePsalm32(chapter))),
  }
}
