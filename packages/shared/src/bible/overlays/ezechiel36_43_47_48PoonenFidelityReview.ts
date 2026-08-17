import type { ExplainedBookOverlay, ExplainedOverlayChapter } from "../explainedOverlay.js"

const transcript = ".research/poonen-through-the-bible-OT/transcripts/ezekiel.txt"
const source = (anchor: string) => ({ kind: "poonen" as const, transcript, anchor })

function restoreEzechiel36(chapter: ExplainedOverlayChapter): ExplainedOverlayChapter {
  if (chapter.number !== 36) return chapter

  return {
    ...chapter,
    summary:
      "Ezechiel 36 este una dintre marile profeții ale Noului Legământ: Dumnezeu stropește cu apă curată, dă inimă nouă, pune Duhul Său înăuntru și face poporul să umble în căile Lui. Promisiunea trebuie cerută în rugăciune: dacă nu te rogi pentru ea, nu o primești. Iar când Duhul Sfânt lucrează astfel, omul își amintește păcatele trecute și se urăște/detestă pe sine pentru ele; acesta este unul dintre semnele omului plin de Duhul Sfânt.",
    units: chapter.units.map((unit) => {
      if (unit.from === 22 && unit.to === 30) {
        return {
          ...unit,
          heading: "Inimă nouă și Duhul lui Dumnezeu înăuntru — viața Noului Legământ",
          teaching:
            "Dumnezeu promite să stropească poporul cu apă curată, să-l curățească de idoli, să-i dea o inimă nouă și să scoată inima de piatră. Punctul culminant este: «voi pune Duhul Meu în voi și vă voi face să urmați poruncile Mele».\n\nAceasta este o mare profeție a vieții Noului Legământ. Dumnezeu nu ne dă numai porunci din afară; pune Duhul Sfânt înăuntru ca să putem umbla în voia Lui.\n\nViața creștină nu este doar efortul omului de a imita un standard. Este lucrarea Duhului lui Dumnezeu în omul care a primit o inimă nouă. De aceea biruința și ascultarea Noului Legământ sunt legate de plinătatea Duhului.\n\nPromisiunea nu ne face pasivi. Dumnezeu spune ce va face, iar câteva versete mai târziu spune că Se va lăsa rugat pentru această lucrare. El vrea un popor care dorește și cere ceea ce a promis.",
          source: source("Ezekiel 36 ... new covenant ... sprinkle clean water ... put my spirit in you verse 27"),
          explanationKind: "exposition",
        }
      }

      if (unit.from === 31 && unit.to === 38) {
        return {
          ...unit,
          heading: "Roagă-te pentru promisiune — iar omul plin de Duh își detestă păcatul",
          teaching:
            "Versetul 37 arată că această lucrare se va întâmpla numai dacă poporul se roagă pentru ea. Dacă nu te rogi, nu primești. Dumnezeu a promis inima nouă și Duhul Său, dar ne cheamă să-L căutăm și să cerem împlinirea promisiunii.\n\nVersetul 31 arată ce se întâmplă când această lucrare devine reală: îți amintești căile rele și păcatele din trecut și te urăști/detești pe tine pentru tot păcatul. Acesta este unul dintre semnele unui om plin de Duhul Sfânt.\n\nOmul firesc vede repede păcatele altora și se justifică pe sine. Omul în care Duhul lucrează vede tot mai adânc cât de urât este păcatul în propria lui viață. Cu cât se apropie mai mult de Dumnezeu, cu atât încetează să se admire pe sine.\n\nAceastă vedere nu îl împinge să fugă de Dumnezeu, ci îl face să prețuiască harul și curățirea Lui mai mult. Duhul Sfânt nu produce mândrie spirituală, ci o judecată serioasă asupra propriului păcat.",
          source: source(
            "Ezekiel 36 ... verse 37 ... this is going to happen only if you pray for it. If you don't pray you won't receive ... verse 31 remember your past sins and hate yourself ... one of the marks of a man filled with the Holy Spirit ... he detests himself for all the sin",
          ),
          explanationKind: "exposition",
          forYourHeart:
            "Nu măsura plinătatea Duhului prin cât de bine vezi greșelile altora. Lasă-L să-ți arate cât de serios trebuie să judeci păcatul din propria viață.",
        }
      }

      return unit
    }),
  }
}

function restoreEzechiel43(chapter: ExplainedOverlayChapter): ExplainedOverlayChapter {
  if (chapter.number !== 43) return chapter

  return {
    ...chapter,
    title: "Ezechiel 43 — Biserica Noului Legământ: locul tronului și legea sfințeniei absolute",
    summary:
      "Slava lui Dumnezeu se întoarce și umple templul. Această viziune este o imagine a bisericii Noului Legământ pe care Dumnezeu a început s-o zidească din ziua Cincizecimii. Domnul spune: «acesta este locul tronului Meu». Legea fundamentală a acestui templu, a acestei biserici, este sfințenia absolută — același standard pentru fiecare persoană din biserică.",
    units: chapter.units.map((unit) => {
      if (unit.from !== 1 || unit.to !== 12) return unit

      return {
        ...unit,
        heading: "Locul tronului lui Dumnezeu și legea fundamentală: sfințenia absolută",
        teaching:
          "Slava care părăsise templul se întoarce și umple Casa. Aceasta este o imagine a bisericii Noului Legământ pe care Dumnezeu a început s-o zidească din ziua Cincizecimii.\n\nDomnul spune în versetul 7: «acesta este locul tronului Meu». Astăzi, biserica adevărată trebuie să fie locul în care Dumnezeu domnește, nu locul în care voia unui om, tradiția sau programul organizației ocupă tronul.\n\nVersetul 12 spune legea de bază a acestui templu: sfințenie absolută. Dacă vrei să zidești biserica drept Trup al lui Hristos, există o lege fundamentală — sfințenie absolută pentru fiecare persoană din biserică. Standardul este același pentru toți.\n\nAceasta a fost și povara profeților: poporul lui Dumnezeu să nu negocieze cu păcatul și să nu creadă că prezența Lui poate locui împreună cu o viață în care păcatul este tolerat conștient. Slava și sfințenia merg împreună.",
        source: source(
          "Ezekiel 43 ... picture of the new covenant church that God began to establish from the day of Pentecost onwards ... this is the place of my throne ... one fundamental law / basic law of this temple ... absolute holiness ... same standard for every person in the church",
        ),
        explanationKind: "exposition",
        forYourHeart:
          "Dacă vrei prezența și domnia lui Dumnezeu în biserică, nu coborî standardul pe care El îl numește fundamental: sfințenia.",
      }
    }),
  }
}

function restoreEzechiel47(chapter: ExplainedOverlayChapter): ExplainedOverlayChapter {
  if (chapter.number !== 47) return chapter

  return {
    ...chapter,
    title: "Ezechiel 47 — De la glezne la ape de înotat: adevărata plinătate a Duhului",
    summary:
      "Râul care iese din templu devine tot mai adânc: glezne, genunchi, coapse, apoi ape în care trebuie să înoți. Aceasta este imaginea vieții pline de Duhul. Cât timp picioarele ating pământul, omul încă este legat de lucrurile pământești și păstrează controlul. Adevărata plinătate a Duhului este atunci când picioarele sunt ridicate de pe pământ și omul este purtat și condus de Duhul.",
    units: chapter.units.map((unit) => {
      if (unit.from !== 1 || unit.to !== 5) return unit

      return {
        ...unit,
        heading: "Adevărata plinătate: picioarele nu mai sunt pe pământ, Duhul te poartă",
        teaching:
          "Ezechiel intră în apă treptat: mai întâi până la glezne, apoi până la genunchi, apoi până la coapse. De fiecare dată putea încă să stea cu picioarele pe fundul râului. Dar el nu spune «îmi ajunge». Ca Elisei, vrea mai mult.\n\nÎn cele din urmă ajunge la ape în care trebuie să înoate. Aici este imaginea adevăratei plinătăți a Duhului. Când apa este doar la glezne, genunchi sau coapse, picioarele sunt încă pe pământ. Când trebuie să înoți, picioarele sunt ridicate de la pământ și nu mai ești legat de lucrurile pământești.\n\nOmul cu adevărat plin de Duhul este condus de Duhul. Nu mai are picioarele fixate în iubirea banilor, statutului, confortului și lucrurilor acestei lumi. Râul îl poartă.\n\nNu te mulțumi cu o experiență parțială a Duhului. Spune: «vreau mai mult», până când viața nu mai este controlată de alipirea de pământ, ci de Duhul lui Dumnezeu.",
        source: source(
          "Ezekiel 47 ... ankles ... knees ... waist ... waters to swim in ... picture of the spirit filled life ... real fullness of the spirit is where your feet are taken off the earth ... lifted from earthly things ... led by the spirit",
        ),
        explanationKind: "exposition",
        forYourHeart:
          "Nu te opri la apa până la glezne. Cere o viață în care Duhul, nu alipirea de lucrurile pământești, îți conduce pașii.",
      }
    }),
  }
}

function restoreEzechiel48(chapter: ExplainedOverlayChapter): ExplainedOverlayChapter {
  if (chapter.number !== 48) return chapter

  return {
    ...chapter,
    summary:
      "Cartea se încheie cu numele cetății: YHWH Shammah — «DOMNUL este acolo». Acesta este numele bisericii Noului Legământ pe care tu și eu suntem chemați s-o zidim. După toată învățătura despre sfințenie, Duh și prezența lui Dumnezeu, semnul final al bisericii este acesta: Domnul este acolo.",
    units: chapter.units.map((unit) => {
      if (unit.from !== 35 || unit.to !== 35) return unit

      return {
        ...unit,
        heading: "YHWH Shammah — numele bisericii pe care suntem chemați s-o zidim",
        teaching:
          "Ultimul verset al lui Ezechiel dă cetății un nume: «DOMNUL este acolo» — YHWH Shammah. Acesta este numele bisericii Noului Legământ pe care tu și eu suntem chemați s-o zidim.\n\nȚinta nu este o organizație care îi impresionează pe oameni prin mărime, activitate sau reputație. Ținta este un loc în care realitatea prezenței și domniei lui Dumnezeu face posibil să se spună: «Domnul este acolo».\n\nAcest final vine după sfințenia absolută din capitolul 43 și după râul vieții pline de Duhul din capitolul 47. Biserica în care Domnul este acolo este o comunitate în care El are tronul, oamenii caută sfințenia și sunt conduși de Duhul.\n\nAceasta este biserica pe care suntem chemați s-o zidim: nu în jurul personalității unui om, ci în jurul prezenței Domnului.",
        source: source(
          "Ezekiel 48:35 ... name of this new covenant church is the Lord is there, Jehovah Shammah ... this is the church you and I are called to build",
        ),
        explanationKind: "exposition",
        words: [
          {
            original: "יְהוָה שָׁמָּה",
            transliteration: "YHWH Shammah",
            language: "ebraica",
            meaning: "DOMNUL este acolo",
            verseRef: "Ezechiel 48:35",
            lexicalSource: "WLC-OSHB",
          },
        ],
        forYourHeart:
          "La capătul tuturor planurilor pentru biserică, întrebarea rămâne simplă: este Domnul cu adevărat acolo și are El tronul?",
      }
    }),
  }
}

export function restoreEzechiel36_43_47_48PoonenFidelity(
  book: ExplainedBookOverlay,
): ExplainedBookOverlay {
  return {
    ...book,
    chapters: book.chapters.map((chapter) =>
      restoreEzechiel48(restoreEzechiel47(restoreEzechiel43(restoreEzechiel36(chapter)))),
    ),
  }
}
