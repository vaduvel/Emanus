import type { ExplainedBookOverlay, ExplainedOverlayChapter } from "../explainedOverlay.js"

const transcript = ".research/poonen-through-the-bible-OT/transcripts/proverbs.txt"
const source = (anchor: string) => ({ kind: "poonen" as const, transcript, anchor })

function restoreProverbe3(chapter: ExplainedOverlayChapter): ExplainedOverlayChapter {
  if (chapter.number !== 3) return chapter

  return {
    ...chapter,
    title: "Proverbe 3 — Încrede-te în DOMNUL și nu lăsa rațiunea să ia conducerea Duhului",
    summary:
      "Proverbe 3:5–6 este o promisiune sigură de călăuzire, cu condiții: încrede-te în DOMNUL din toată inima, nu te sprijini pe propria pricepere și recunoaște-L în toate căile. Cel mai mare dușman al credinței este propria rațiune atunci când omul trăiește prin ea în loc să trăiască prin credință. Rațiunea este necesară și utilă, dar trebuie să rămână slujitoare, supusă luminării Duhului Sfânt.",
    units: chapter.units.map((unit) => {
      if (unit.from !== 1 || unit.to !== 8) return unit

      return {
        ...unit,
        heading: "Rațiunea este slujitoare; Duhul Sfânt trebuie să conducă",
        teaching:
          "«Încrede-te în DOMNUL din toată inima și nu te sprijini pe priceperea ta. Recunoaște-L în toate căile tale și El îți va îndrepta cărările.» Aceasta este o promisiune pentru călăuzire. Dumnezeu Își împlinește promisiunea când omul împlinește condițiile ei.\n\nPrima condiție este să te încrezi în Dumnezeu cu toată inima. A doua este să nu te sprijini pe propria inteligență și rațiune. Cel mai mare dușman al credinței este propria rațiune atunci când ea devine autoritatea după care trăiești. Poți trăi prin rațiune sau poți trăi prin credință.\n\nRațiunea nu este rea și nu trebuie aruncată. Este foarte folositoare, dar trebuie să fie slujitoare. Ea este comparată cu o soție într-o casă: foarte utilă, dar dacă preia conducerea care nu-i aparține, apare dezordinea. Tot astfel, rațiunea trebuie să fie supusă Duhului Sfânt.\n\nFolosește-ți rațiunea când studiezi Scriptura, dar depinde de Duhul Sfânt ca El să o lumineze. Altfel, chiar ani întregi de studiu biblic pot rămâne academici și uscați.\n\nA treia condiție este să-L recunoști pe Dumnezeu în toate căile tale — adică să asculți de lumina pe care ți-a dat-o în fiecare domeniu. Atunci promisiunea este sigură: El îți va călăuzi pașii, pas cu pas, de-a lungul vieții.",
        source: source(
          "Proverbs 3:5-6 ... promise for guidance ... trust in the Lord with all your heart ... biggest enemy of faith is your own reason ... reason has to be like a wife ... subject to the Holy Spirit ... use my reason ... depend on Holy Spirit to enlighten my reason",
        ),
        explanationKind: "exposition",
        forYourHeart:
          "Folosește-ți mintea, dar nu o lăsa să ia tronul. Pune rațiunea sub Duhul Sfânt și ascultă de lumina pe care Dumnezeu ți-o dă.",
      }
    }),
  }
}

function restoreProverbe22(chapter: ExplainedOverlayChapter): ExplainedOverlayChapter {
  if (chapter.number !== 22) return chapter

  return {
    ...chapter,
    units: chapter.units.map((unit) => {
      if (unit.from !== 7 || unit.to !== 16) return unit

      return {
        ...unit,
        heading: "Nebunia este în inimă; nuiaua disciplinei o îndepărtează",
        teaching:
          "Versetul 15 spune că nebunia este legată de inima copilului, dar nuiaua disciplinei o va îndepărta de la el. Copiii trebuie disciplinați.\n\nNebunia este în inimă, dar calea de a ajunge la inimă este folosirea nuielei la fundul copilului. Există o legătură între acel loc și inimă: când nuiaua este folosită la fund, nebunia este scoasă din inimă.\n\nPărintele nu trebuie să lase copilul să crească fără corectare. Iubirea nu înseamnă să-i permiți copilului să facă tot ce dorește, ci să-l formezi astfel încât nebunia să nu ajungă să-i conducă viața.\n\nCapitolul leagă apoi caracterul de muncă: omul harnic în lucrul lui va ajunge să stea înaintea împăraților. Disciplina din copilărie și hărnicia de mai târziu fac parte din aceeași formare a omului care învață să nu fie condus de lene și nebunie.",
        source: source(
          "Proverbs 22:15 ... foolishness is bound in the heart of a child, but the rod of correction will drive it far from him ... way to reach the heart is by hitting him in the bottom ... use a rod at the bottom ... children must be disciplined ... verse 29 hard-working man",
        ),
        explanationKind: "exposition",
        forYourHeart:
          "Nu confunda iubirea cu lipsa disciplinei. Copilul are nevoie să fie format și corectat, iar omul matur are nevoie să învețe hărnicia.",
      }
    }),
  }
}

function restoreProverbe31(chapter: ExplainedOverlayChapter): ExplainedOverlayChapter {
  if (chapter.number !== 31) return chapter

  return {
    ...chapter,
    title: "Proverbe 31 — Femeia evlavioasă pe care tânărul trebuie s-o caute și femeia care trebuie să devină sora",
    summary:
      "Proverbe 31:10–31 arată cum este o soție evlavioasă în ochii lui Dumnezeu. Este foarte muncitoare, se ridică devreme, lucrează cu mâinile, este întreprinzătoare, îi ajută pe săraci, își sprijină soțul, își îngrijește casa și vorbește cu înțelepciune și bunătate. Mâinile ei sunt tari de la muncă, iar limba ei este moale. Tinerilor li se spune: acesta este tipul de soție pe care trebuie să-l cauți. Surorilor: acesta este tipul de femeie care trebuie să fii. Farmecul este înșelător, frumusețea este deșartă, dar femeia care se teme de DOMNUL va fi lăudată.",
    units: chapter.units.map((unit) => {
      if (unit.from === 10 && unit.to === 27) {
        return {
          ...unit,
          heading: "Mâini tari de la muncă și o limbă moale prin bunătate",
          teaching:
            "Acest pasaj este foarte important pentru tinerii bărbați și pentru tinerele femei, fiindcă arată cum este o soție evlavioasă în ochii lui Dumnezeu.\n\nEa este foarte muncitoare. Lucrează cu mâinile, se ridică devreme, pregătește hrana, este întreprinzătoare, cumpără un ogor și plantează o vie. Își întinde mâna spre sărac, își protejează familia și își sprijină soțul, al cărui inimă se încrede în ea.\n\nCând își deschide gura, vorbește cu înțelepciune, iar pe limbă are legea bunătății. Imaginea poate fi rezumată astfel: mâinile ei sunt tari pentru că muncește; limba ei este moale. La multe fete de astăzi este exact invers: mâinile sunt moi pentru că nu muncesc din greu, iar limba este tare. Fii diferită.\n\nCaracterul acestei femei nu este pasiv. Ea muncește, administrează, ajută, produce, gândește și vorbește cu bunătate. Frica de Dumnezeu se vede în felul în care trăiește zilnic.",
          source: source(
            "Proverbs 31:10-31 ... godly wife ... very hardworking ... gets up early ... enterprising ... supports her husband ... opens her mouth with wisdom ... hands are hard because she's working, tongue is soft ... young girls today exactly the opposite",
          ),
          explanationKind: "exposition",
          forYourHeart:
            "Caută o viață în care munca este serioasă și limba este blândă. Frica de Dumnezeu se vede în amândouă.",
        }
      }

      if (unit.from === 28 && unit.to === 31) {
        return {
          ...unit,
          heading: "Tineri: aceasta este soția pe care s-o căutați; surori: aceasta este femeia care să fiți",
          teaching:
            "Copiii și soțul ei se ridică și o numesc fericită. Rodul vieții ei ajunge să fie recunoscut în propria casă.\n\nTinerilor bărbați li se spune direct: acesta este tipul de soție pe care trebuie să-l cauți. Surorilor li se spune: acesta este tipul de femeie care trebuie să fii.\n\nVersetul 30 pune criteriul final: farmecul este înșelător și frumusețea este deșartă, dar femeia care se teme de DOMNUL va fi lăudată. Când alegi o soție, criteriul principal nu trebuie să fie farmecul sau frumusețea, ci frica de Dumnezeu și caracterul descris în acest capitol.\n\nIar pentru femeie, ținta nu este să câștige admirația prin aparență, ci să devină o femeie pe care Dumnezeu o numește evlavioasă — muncitoare, înțeleaptă, bună și temătoare de DOMNUL.",
          source: source(
            "Proverbs 31 ... Her children and her husband will rise up and say you are blessed ... Be a woman like that. Marry a woman like that ... Young brothers, this is the type of wife you must look for. Sisters, this is the type of woman you must be. Charm is deceitful. Beauty is empty. A woman who fears the Lord shall be praised",
          ),
          explanationKind: "exposition",
          forYourHeart:
            "Nu lăsa farmecul și frumusețea să-ți aleagă criteriile. Uită-te la frica de Dumnezeu și la rodul caracterului.",
        }
      }

      return unit
    }),
  }
}

export function restoreProverbePoonenFidelity(book: ExplainedBookOverlay): ExplainedBookOverlay {
  return {
    ...book,
    chapters: book.chapters.map((chapter) =>
      restoreProverbe31(restoreProverbe22(restoreProverbe3(chapter))),
    ),
  }
}
