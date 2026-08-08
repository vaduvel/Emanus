import type { ExplainedBookOverlay, ExplainedOverlayChapter } from "../explainedOverlay.js"

const transcript = ".research/poonen-through-the-bible-OT/transcripts/daniel.txt"
const source = (anchor: string) => ({ kind: "poonen" as const, transcript, anchor })

function restoreDaniel4(chapter: ExplainedOverlayChapter): ExplainedOverlayChapter {
  if (chapter.number !== 4) return chapter

  return {
    ...chapter,
    title: "Daniel 4 — Babilonul omului, smerirea lui Nebucadnețar și un împărat ajuns probabil în cer",
    summary:
      "Nebucadnețar este avertizat, nu se smerește la timp și apoi este coborât până când recunoaște stăpânirea Celui Preaînalt. Babilonul lui este imaginea lucrării zidite prin înțelepciunea omului, puterea omului și pentru gloria omului. Mărturisirea finală a regelui îl face pe Poonen să creadă că Nebucadnețar este probabil în cer; el spune în contrast că Solomon este în iad și Nebucadnețar în cer.",
    units: chapter.units.map((unit) => {
      if (unit.from === 28 && unit.to === 33) {
        return {
          ...unit,
          heading: "«Eu am zidit» — formula Babilonului: prin om, cu puterea omului, pentru gloria omului",
          teaching:
            "Nebucadnețar privește Babilonul și spune că l-a zidit prin puterea lui și pentru gloria lui. Aceasta este formula Babilonului spiritual: lucrare făcută după înțelepciunea omului, prin puterea și resursele omului și pentru gloria omului.\n\nO biserică poate avea doctrină evanghelică și totuși să fie babiloniană dacă lucrarea ei este construită în felul acesta. În contrast, lucrarea lui Dumnezeu trebuie să vină din planul Lui, să fie făcută prin puterea Duhului și să urmărească gloria Lui.\n\nProblema nu este numai o propoziție mândră spusă de un rege păgân; este principiul după care se poate construi și o lucrare religioasă. Dumnezeu judecă ceea ce omul ridică pentru propriul nume.\n\nCând omul spune prin viața lui «eu am zidit, prin puterea mea, pentru gloria mea», el reproduce spiritul Babilonului.",
          source: source(
            "Daniel 4:30 ... by man through man to man ... church built with human wisdom by human power and for man's glory that is Babylon",
          ),
          explanationKind: "exposition",
          forYourHeart:
            "Testează orice lucrare prin trei întrebări: al cui plan, a cui putere și a cui glorie?",
        }
      }

      if (unit.from === 34 && unit.to === 37) {
        return {
          ...unit,
          heading: "Nebucadnețar Îl recunoaște pe Dumnezeu — probabil în cer; Solomon în iad",
          teaching:
            "După smerire, Nebucadnețar își ridică ochii spre cer, Îl binecuvântează pe Cel Preaînalt și mărturisește că domnia Lui este veșnică, că nimeni nu-I poate opri mâna și că El poate smeri pe cei mândri.\n\nAceastă mărturisire îl face să creadă că Nebucadnețar este probabil în cer astăzi. Contrastul este puternic: Solomon este în iad și Nebucadnețar este în cer. Un om care a avut o lumină enormă poate ajunge să se îndepărteze, iar un împărat păgân zdrobit de Dumnezeu poate ajunge la o mărturisire reală a Celui Preaînalt.\n\nAceasta este o avertizare împotriva încrederii în trecutul spiritual, cunoaștere sau privilegiu. Nu contează numai de unde ai început, ci unde ajungi și dacă te smerești sub mâna lui Dumnezeu.\n\nNebucadnețar învață prin zdrobire ceea ce mândria lui nu voia să primească prin avertisment: cerul conduce.",
          source: source(
            "Daniel 4:34-35 ... this is what makes me believe that Nebuchadnezzar is probably in heaven today ... Solomon is in hell and Nebuchadnezzar is in heaven",
          ),
          explanationKind: "exposition",
          forYourHeart:
            "Nu te bizui pe câtă lumină ai avut ieri. Rămâi smerit și credincios până la sfârșit.",
        }
      }

      return unit
    }),
  }
}

function restoreDaniel6(chapter: ExplainedOverlayChapter): ExplainedOverlayChapter {
  if (chapter.number !== 6) return chapter

  return {
    ...chapter,
    summary:
      "Adversarii lui Daniel nu găsesc nicio vină în slujirea lui și construiesc o lege împotriva rugăciunii. Daniel nu închide fereastra pentru acea zi; o ține deschisă și se roagă ca înainte — «să vadă toți, să știe toți că sunt creștin și ucenic al lui Isus Hristos», în aplicația predicii. Dumnezeu îl izbăvește de lei. Pentru credinciosul de astăzi, Dumnezeu poate permite leului fizic sau focului fizic să-i omoare trupul; însă Satan, leul spiritual, nu trebuie să poată pune în el ura, amărăciunea sau focul iadului.",
    units: chapter.units.map((unit) => {
      if (unit.from === 10 && unit.to === 18) {
        return {
          ...unit,
          heading: "Fereastra rămâne deschisă: «să vadă toți că mă rog»",
          teaching:
            "Când Daniel află că legea a fost semnată, ar fi putut spune: «astăzi închid fereastra și mă rog în ascuns». Nu o face. Ține fereastra deschisă și se roagă de trei ori pe zi așa cum făcuse întotdeauna.\n\nAplicația este directă: «să vadă toți că mă rog; să știe toți că sunt creștin, că sunt ucenic al lui Isus Hristos. Orice legi ați da, aceasta nu schimbă fidelitatea mea față de Dumnezeu».\n\nCredința nu trebuie ascunsă din frica oamenilor atunci când ascultarea de Dumnezeu este atacată direct. Daniel nu lasă legea împăratului să-i rescrie relația cu Dumnezeu.\n\nAceastă îndrăzneală nu s-a născut în ziua decretului. El se ruga deja de trei ori pe zi. Criza doar a arătat că omul care umbla cu Dumnezeu înainte nu avea de gând să-și schimbe viața ca să salveze aparențele.",
          source: source(
            "Daniel 6 ... he could have thought let me close it today, but he doesn't, he keeps it open and prays ... let everybody see that I'm praying ... let everybody know I'm a Christian, I'm a disciple of Jesus Christ. Whatever laws you may pass, it doesn't make a difference to me",
          ),
          explanationKind: "exposition",
          forYourHeart:
            "Nu lăsa frica de oameni să închidă fereastra unei vieți care până ieri era deschisă înaintea lui Dumnezeu.",
        }
      }

      if (unit.from === 19 && unit.to === 24) {
        return {
          ...unit,
          heading: "Leul fizic poate omorî trupul; leul spiritual nu trebuie să-ți atingă duhul",
          teaching:
            "Dumnezeu închide gura leilor și Daniel iese nevătămat. Dar istoria bisericii arată că Dumnezeu poate permite leilor fizici să mănânce credincioși și focului fizic să le ardă trupurile. Daniel 6 nu este promisiunea că fiecare martir va scăpa fizic.\n\nLeii sunt însă și o imagine a lui Satan, leul care răcnește. Satan nu trebuie să mă poată atinge chiar dacă leii fizici îmi mănâncă trupul. Focul iadului — ura, amărăciunea, răzbunarea și compromisul — nu trebuie să intre în mine chiar dacă un foc fizic îmi arde trupul.\n\nAdevărata biruință nu este numai supraviețuirea trupului, ci păstrarea duhului necontaminat de vrăjmaș. Omul poate muri și totuși să biruie.\n\nDaniel a fost izbăvit fizic; alți sfinți pot fi martirizați. În ambele cazuri, ținta este aceeași: Satan să nu câștige omul dinăuntru.",
          source: source(
            "Daniel 6 ... God may allow physical lions to eat us up ... physical fire to burn us ... lions are a picture of Satan ... Satan cannot touch me even if these physical lions eat me up ... fire of hell cannot touch me",
          ),
          explanationKind: "exposition",
          forYourHeart:
            "Cea mai mare biruință nu este să ieși din fiecare groapă viu, ci să nu lași duhul vrăjmașului să intre în tine în nicio groapă.",
        }
      }

      return unit
    }),
  }
}

export function restoreDaniel04And06PoonenFidelity(book: ExplainedBookOverlay): ExplainedBookOverlay {
  return {
    ...book,
    chapters: book.chapters.map((chapter) => restoreDaniel6(restoreDaniel4(chapter))),
  }
}
