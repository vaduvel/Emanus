import type { ExplainedBookOverlay, ExplainedOverlayChapter } from "../explainedOverlay.js"

const transcript = ".research/poonen-through-the-bible-OT/transcripts/jeremiah-lamentations.txt"
const source = (anchor: string) => ({ kind: "poonen" as const, transcript, anchor })

function restoreIeremia23(chapter: ExplainedOverlayChapter): ExplainedOverlayChapter {
  if (chapter.number !== 23) return chapter

  return {
    ...chapter,
    title: "Ieremia 23 — Hristos, Dreptatea noastră, și profetul care trebuie să audă de la Dumnezeu",
    summary:
      "Ieremia 23 vorbește despre venirea lui Isus Hristos, Odrasla dreaptă, numită «DOMNUL, Dreptatea noastră», și despre justificare. Restul capitolului este un avertisment puternic pentru predicatori: profeții falși nu stau în sfatul DOMNULUI să asculte, spun «am avut un vis» și «așa vorbește DOMNUL» când Dumnezeu nu a vorbit. Cuvântul venit cu adevărat de la Dumnezeu este ca focul și ca ciocanul care sfărâmă stânca.",
    units: chapter.units.map((unit) => {
      if (unit.from === 1 && unit.to === 8) {
        return {
          ...unit,
          heading: "Odrasla dreaptă: Isus Hristos, DOMNUL Dreptatea noastră",
          teaching:
            "După condamnarea păstorilor care au risipit turma, Dumnezeu promite să ridice lui David o Odraslă dreaptă. Aceasta vorbește despre venirea lui Isus Hristos.\n\nNumele Lui este «DOMNUL, Dreptatea noastră». Aici apare adevărul justificării: dreptatea noastră înaintea lui Dumnezeu nu este produsul cu care ne lăudăm noi, ci Hristos devine dreptatea noastră.\n\nEșecul păstorilor omenești nu anulează planul lui Dumnezeu. El ridică Păstorul-Rege drept, Care domnește cu înțelepciune și dreptate.\n\nDe aceea speranța poporului lui Dumnezeu nu este că va apărea un lider omenesc fără greșeală, ci în Hristos, Dreptatea noastră.",
          source: source(
            "Jeremiah 23 ... coming of Jesus Christ ... righteous branch ... the Lord our righteousness ... justification",
          ),
          explanationKind: "exposition",
        }
      }

      if (unit.from === 9 && unit.to === 22) {
        return {
          ...unit,
          heading: "Profetul fals nu a stat în sfatul DOMNULUI să asculte",
          teaching:
            "Capitolul 23 este foarte important pentru oricine predică. Problema profeților falși este că vor să vorbească, dar nu stau în sfatul DOMNULUI să asculte.\n\nDumnezeu întreabă cine a stat înaintea Lui ca să vadă și să audă Cuvântul Lui. Profetul adevărat trebuie să fie mai întâi un om care ascultă. Nu poți trăi departe de Dumnezeu și apoi să pui formula «DOMNUL spune» peste gândurile tale.\n\nDacă acești profeți ar fi stat în sfatul Lui, cuvintele lor ar fi întors poporul de la căile lui rele. Profetul nu este chemat să le confirme oamenilor păcatul, ci să aducă un cuvânt care îi întoarce spre Dumnezeu.\n\nPredicatorul trebuie să se teamă mai mult să vorbească fără să fi auzit decât să rămână fără ceva spectaculos de spus.",
          source: source(
            "Jeremiah 23 ... false prophets ... don't stand in the counsel of the Lord to listen ... if they had stood in My counsel they would turn people from evil",
          ),
          explanationKind: "exposition",
          forYourHeart:
            "Nu căuta mai întâi ceva de spus. Stai înaintea lui Dumnezeu până când ai auzit.",
        }
      }

      if (unit.from === 23 && unit.to === 32) {
        return {
          ...unit,
          heading: "«Am avut un vis» nu dovedește nimic — Cuvântul lui Dumnezeu este foc și ciocan",
          teaching:
            "Profeții falși spun: «am avut un vis, am avut un vis» și apoi pun peste el autoritatea lui Dumnezeu. Nu te lăsa impresionat de cineva numai pentru că spune că a avut un vis.\n\nEste periculos să spui «așa vorbește DOMNUL» când Domnul nu a vorbit. Un om poate lua ceva născut din propria minte și să pretindă că este Cuvântul lui Dumnezeu.\n\nVersetul 29 spune cum este Cuvântul adevărat al lui Dumnezeu: ca un foc și ca un ciocan care sfărâmă stânca. De ce atâtea cuvinte despre care oamenii spun «Dumnezeu mi-a spus» nu merg ca un foc și nu sparg inimile ca un ciocan? Pentru că nu au venit de la Domnul.\n\nCel care vorbește în Numele lui Dumnezeu trebuie să aibă frică sfântă de a nu pune Numele Lui peste propriile idei.",
          source: source(
            "Jeremiah 23 ... I had a dream ... thus said the Lord but the Lord hasn't spoken ... my word is like a fire and like a hammer ... why isn't your word going like a fire / hammer ... because it never came from the Lord",
          ),
          explanationKind: "exposition",
          forYourHeart:
            "Mai bine taci decât să pui «Dumnezeu spune» peste ceva ce Dumnezeu nu ți-a spus.",
        }
      }

      return unit
    }),
  }
}

function restoreIeremia29(chapter: ExplainedOverlayChapter): ExplainedOverlayChapter {
  if (chapter.number !== 29) return chapter

  return {
    ...chapter,
    title: "Ieremia 29 — Șaptezeci de ani în Babilon, apoi caută-L din toată inima și ieși spre voia Lui deplină",
    summary:
      "Exilații vor sta șaptezeci de ani în Babilon, nu se vor întoarce imediat. În Babilon sunt și profeți falși de care trebuie să se păzească. Dar Dumnezeu promite că, atunci când vor fi sătui de viața babiloniană și Îl vor căuta cu toată inima, Îl vor găsi. Mișcarea spirituală din Babilon spre Ierusalim este mișcarea din creștinismul corupt și compromis spre voia deplină a lui Dumnezeu și spre biserica adevărată; ea începe cu un om care Îl caută pe Dumnezeu din toată inima.",
    units: chapter.units.map((unit) => {
      if (unit.from === 10 && unit.to === 14) {
        return {
          ...unit,
          heading: "Când te-ai săturat de viața babiloniană, caută-L pe Dumnezeu din toată inima",
          teaching:
            "Dumnezeu spune că exilul va dura șaptezeci de ani. Aceasta este profeția pe care Daniel o va citi și care îl va mișca la rugăciune.\n\nDar în mijlocul Babilonului vine promisiunea: «Mă veți chema... Mă veți căuta și Mă veți găsi când Mă veți căuta din toată inima». Dacă nu-L cauți din toată inima, nu-L vei găsi.\n\nAceasta descrie și mișcarea spirituală din Babilon spre Ierusalim, din creștinismul corupt și compromis spre voia deplină a lui Dumnezeu și spre biserica adevărată. Ea începe când un om se satură de viața babiloniană și primește o povară să-L caute pe Dumnezeu fără rezervă.\n\nRestaurarea nu începe cu o tehnică de organizare și nici cu mutarea dintr-o clădire în alta. Începe cu o inimă care spune: «vreau voia deplină a lui Dumnezeu și Îl voi căuta din toată inima».",
          source: source(
            "Jeremiah 29 ... seventy years in Babylon ... movement from Babylon to Jerusalem to the true church ... when you're sick and tired of that Babylonian life, seek Me with all your heart and then you'll find Me. If you don't seek Me wholeheartedly, you will not find Me",
          ),
          explanationKind: "exposition",
          words: unit.words,
          forYourHeart:
            "Nu te mulțumi să fii nemulțumit de Babilon. Caută-L pe Dumnezeu din toată inima până când te conduce în voia Lui deplină.",
        }
      }

      if (unit.from === 15 && unit.to === 32) {
        return {
          ...unit,
          heading: "În Babilon există profeți falși — Ieremia îi numește",
          teaching:
            "Chiar în Babilon, poporul trebuie să se păzească de profeți falși. Ieremia îi numește pe cei care vorbesc minciună în Numele lui Dumnezeu.\n\nUn slujitor al lui Dumnezeu nu trebuie să se teamă să identifice profeții falși atunci când învățătura lor îi duce pe oameni în rătăcire. Ieremia nu îi protejează prin ambiguitate; îi numește.\n\nAcest lucru este cu atât mai important într-un context babilonian, unde oamenii vor mesaje care să le permită să rămână confortabili și să creadă că totul este bine. Profeția falsă îi ține pe oameni în compromis; cuvântul adevărat îi cheamă spre Dumnezeu.\n\nDe aceea ieșirea din Babilon cere și discernământ față de vocile religioase care pretind că vorbesc pentru Dumnezeu.",
          source: source(
            "Jeremiah 29 ... even in Babylon be careful about the false prophets ... verse 21 and verse 31 ... false prophets ... he names them",
          ),
          explanationKind: "exposition",
        }
      }

      return unit
    }),
  }
}

function restoreIeremia31(chapter: ExplainedOverlayChapter): ExplainedOverlayChapter {
  if (chapter.number !== 31) return chapter

  return {
    ...chapter,
    units: chapter.units.map((unit) => {
      if (unit.from !== 1 || unit.to !== 14) return unit

      return {
        ...unit,
        heading: "«Te iubesc cu o iubire veșnică»",
        teaching:
          "Ieremia 31:3 este un verset minunat de încurajare: «Te iubesc cu o iubire veșnică; de aceea te-am atras cu bunătate».\n\nDragostea lui Dumnezeu nu începe când reușești să fii suficient de bun. Este o iubire veșnică, iar bunătatea Lui te atrage spre El.\n\nPoporul care trecuse prin disciplină și exil aude din nou această declarație. Dumnezeu nu Și-a pierdut inima pentru ei. El îi adună, îi zidește și îi aduce din nou la bucurie.\n\nCând treci prin zdrobire, nu interpreta disciplina ca dovadă că Dumnezeu a încetat să te iubească. El spune: «te iubesc cu o iubire veșnică».",
          source: source(
            "Jeremiah 31:3 ... wonderful verse to encourage us ... I have loved you with an everlasting love, therefore I've drawn you with loving kindness",
          ),
          explanationKind: "exposition",
          forYourHeart:
            "Lasă bunătatea Lui să te atragă. Disciplina nu înseamnă că iubirea Lui s-a terminat.",
        }
      }

      return unit
    }),
  }
}

export function restoreIeremiaPoonenFidelity(book: ExplainedBookOverlay): ExplainedBookOverlay {
  return {
    ...book,
    chapters: book.chapters.map((chapter) =>
      restoreIeremia31(restoreIeremia29(restoreIeremia23(chapter))),
    ),
  }
}
