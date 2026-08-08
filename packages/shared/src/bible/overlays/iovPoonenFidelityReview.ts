import type { ExplainedBookOverlay, ExplainedOverlayChapter } from "../explainedOverlay.js"

const transcript = ".research/poonen-through-the-bible-OT/transcripts/job.txt"
const source = (anchor: string) => ({ kind: "poonen" as const, transcript, anchor })

function restoreIov29(chapter: ExplainedOverlayChapter): ExplainedOverlayChapter {
  if (chapter.number !== 29) return chapter

  return {
    ...chapter,
    title: "Iov 29 — Un om evlavios care era mândru de evlavia lui",
    summary:
      "Iov își amintește vremea când oamenii îl respectau, îi ajuta pe săraci, pe văduve, pe orfani și pe cei slabi. Toate acestea erau lucruri bune și reale. Dar în discursurile lungi din Iov 26–31 iese la suprafață problema pe care Iov nu o vedea: mândria spirituală. Era un om evlavios și era mândru de evlavia lui; era conștient de propria dreptate și se justifica prin ceea ce făcuse.",
    units: chapter.units.map((unit) => {
      if (unit.from !== 1 || unit.to !== 25) return unit

      return {
        ...unit,
        heading: "«Am făcut... am ajutat...» — mândria ascunsă în propria neprihănire",
        teaching:
          "Iov își amintește zilele când Dumnezeu îl păzea, când oamenii îl respectau și când cuvântul lui avea greutate. Apoi enumeră binele pe care îl făcuse: îngrijea de văduvă, de sărac, de orb și de orfan și era un om extrem de folositor altora.\n\nProblema nu era că aceste fapte erau false. Iov era într-adevăr un om evlavios. Problema era că nu avea lumină asupra unui singur lucru: mândria spirituală — mândria în propria lui evlavie. Era evlavios și era mândru de aceasta.\n\nDiscursurile din capitolele 26–31 sunt aproape printre cele mai lungi predici din Biblie și sunt pline de autojustificare: «am făcut aceasta», «am avut grijă de văduvă», «am avut grijă de sărac», «am ajutat pe orb». Iov devenise foarte conștient de toate lucrurile bune pe care le făcuse și nu vedea mândria care se afla în propria lui dreptate.\n\nAici este una dintre cele mai subtile forme ale eului. Poți să fii cu adevărat evlavios, să faci mult bine și tocmai acele lucruri să devină materialul din care se hrănește mândria spirituală. Dumnezeu voia să-l ducă pe Iov mai adânc decât moralitatea exterioară: până la sfârșitul încrederii și admirației de sine.",
        source: source(
          "Job 26-31 ... longest sermons ... all self-justification ... I did this, cared for the widow, cared for the poor ... extremely helpful man ... spiritual pride ... pride in his godliness ... he was godly and proud of it ... conscious of all these things ... pride in his righteousness",
        ),
        explanationKind: "exposition",
        forYourHeart:
          "Nu întreba doar dacă binele pe care îl faci este real. Întreabă și dacă eul tău se hrănește din faptul că ești conștient de propria evlavie.",
      }
    }),
  }
}

function restoreIov31(chapter: ExplainedOverlayChapter): ExplainedOverlayChapter {
  if (chapter.number !== 31) return chapter

  return {
    ...chapter,
    title: "Iov 31 — Culmea autojustificării unui om cu standarde morale înalte",
    summary:
      "Iov enumeră curăția ochilor, fidelitatea, dreptatea față de slujitori, grija pentru văduve și orfani, refuzul iubirii de bani și alte fapte bune. Standardele lui erau într-adevăr înalte. Tocmai aici ajunge însă la culmea autojustificării: era conștient de toate aceste lucruri și nu vedea mândria din propria dreptate. Dumnezeu nu avea să-l zdrobească prin acuzațiile prietenilor, ci să-i arate măreția Lui până când Iov avea să devină zero în propriii ochi.",
    units: chapter.units.map((unit) => {
      if (unit.from === 1 && unit.to === 12) {
        return {
          ...unit,
          heading: "Curăție reală — și totuși o inimă încă mândră de propria evlavie",
          teaching:
            "Iov poate spune că a făcut legământ cu ochii lui și că nu a umblat în înșelăciune sau adulter. Aceste standarde sunt remarcabile, mai ales pentru un om care nu avea Scriptura pe care o avem noi.\n\nDar faptul că viața lui era curată nu înseamnă că Dumnezeu terminase lucrarea în el. Iov era conștient de evlavia lui și mândru de ea. Aceasta este mândria spirituală: nu neapărat mândrie în bani, poziție sau păcat grosolan, ci mândrie în faptul că ești un om bun și curat.\n\nDumnezeu avea să-i dea lumină asupra acestui lucru. Nu pentru a spune că puritatea era rea, ci pentru a face ca omul curat să nu-și mai găsească gloria în propria puritate.",
          source: source(
            "Job ... wonderful man ... spiritual pride, pride in his godliness ... he was godly and he was proud of it ... chapter 26 to 31 self-justification",
          ),
          explanationKind: "exposition",
        }
      }

      if (unit.from === 13 && unit.to === 40) {
        return {
          ...unit,
          heading: "«Am făcut aceasta» — dosarul dreptății proprii ajunge la capăt",
          teaching:
            "Iov continuă: a tratat drept slujitorii, a avut grijă de sărac, văduvă și orfan, nu și-a pus încrederea în aur și nu s-a bucurat de nenorocirea vrăjmașului. Sunt fapte frumoase.\n\nDar tocmai repetarea lor arată cât de conștient devenise Iov de propriul dosar. «Am făcut aceasta, nu am făcut aceea.» Discursurile lui devin autojustificare. El încă nu vede mândria din dreptatea lui.\n\nCei patru predicatori îl atacaseră pentru păcate pe care Dumnezeu nu le numise. Dumnezeu nu urmează metoda lor. El nu scoate la iveală o listă de imoralități ascunse, ci îi descoperă lui Iov propria măreție și putere. Această revelație va face ceea ce acuzațiile oamenilor n-au putut face: îl va coborî pe Iov la zero.\n\nAici se vede diferența dintre condamnarea religioasă și lucrarea lui Dumnezeu. Omul te poate zdrobi prin acuzații; Dumnezeu te smerește prin lumină.",
          source: source(
            "Job 31 ... helped the blind, cared for widows and orphans ... conscious of all these things ... pride in his righteousness ... four people directly attack Job for his sin ... God never said a word about that ... showed him His sovereignty and almighty power",
          ),
          explanationKind: "exposition",
          forYourHeart:
            "Nu te apăra înaintea lui Dumnezeu cu dosarul lucrurilor bune pe care le-ai făcut. Lasă-L să-ți arate cine este El până când eul nu mai are cu ce să se laude.",
        }
      }

      return unit
    }),
  }
}

function restoreIov42(chapter: ExplainedOverlayChapter): ExplainedOverlayChapter {
  if (chapter.number !== 42) return chapter

  return {
    ...chapter,
    title: "Iov 42 — «Mă pocăiesc în țărână și cenușă»: zero înaintea lui Dumnezeu și binecuvântarea dublă",
    summary:
      "După ce Îl vede pe Dumnezeu, Iov își retrage cuvintele, se așază în țărână și cenușă și se pocăiește. A ajuns la zero în propriii ochi. Dumnezeu îi mustră pe prietenii lui, iar Iov se roagă pentru oamenii care îl acuzaseră și îl persecutaseră. Atunci Dumnezeu îl binecuvântează dublu. Dacă vrei ca Domnul să te binecuvânteze dublu, roagă-te pentru cei care te persecută și iubește-ți vrăjmașii.",
    units: chapter.units.map((unit) => {
      if (unit.from === 1 && unit.to === 6) {
        return {
          ...unit,
          heading: "«Retrag tot ce am spus și mă pocăiesc» — Iov ajunge la zero",
          teaching:
            "Iov spune: «am vorbit despre lucruri pe care nu le înțelegeam». Apoi ajunge la versetul 6: «retrag tot ce am spus, stau în țărână și cenușă și mă pocăiesc». Acesta este locul minunat la care Dumnezeu voia să-l aducă.\n\nOmul care fusese conștient de evlavia, dreptatea și faptele lui bune a ajuns acum la zero. Nu mai are nevoie să-și prezinte dosarul. Vederea lui Dumnezeu a făcut eul să cadă.\n\nAceasta este lucrarea pe care Dumnezeu o urmărește și în noi: să ne aducă repede la acel punct zero de unde El poate să ne binecuvânteze. Mândria spirituală trebuie să moară, nu doar păcatele vizibile.\n\nAdevărata pocăință nu înseamnă doar «am făcut o faptă rea», ci și o lumină asupra eului care s-a admirat pe sine pentru binele lui.",
          source: source(
            "Job 42:6 ... I take back everything I said ... I sit in dust and ashes and I repent ... what a wonderful place ... bring us down quickly to that zero point",
          ),
          explanationKind: "exposition",
          forYourHeart:
            "Cere-I lui Dumnezeu să te aducă repede la zero, înainte ca mândria spirituală să aibă nevoie de ani de zdrobire.",
        }
      }

      if (unit.from === 7 && unit.to === 17) {
        return {
          ...unit,
          heading: "Roagă-te pentru cei care te persecută — și Dumnezeu îl binecuvântează pe Iov dublu",
          teaching:
            "Dumnezeu îi mustră pe prietenii care îl acuzaseră și le spune să meargă la Iov. Apoi Iov se roagă pentru ei — pentru oamenii care îi făcuseră viața și mai grea prin predicile și acuzațiile lor.\n\nCând face aceasta, Dumnezeu îi schimbă starea și îl binecuvântează dublu față de ceea ce avusese înainte.\n\nVrei ca Domnul să te binecuvânteze dublu? Roagă-te pentru cei care te persecută. Iubește-ți vrăjmașii. Roagă-te pentru cei geloși pe tine și pentru cei care te-au înțeles greșit.\n\nResentimentul te ține legat de omul care te-a rănit. Rugăciunea pentru el te eliberează înaintea lui Dumnezeu. Iov nu intră în binecuvântarea finală ținând în mână lista predicilor greșite pe care le-a primit; se roagă pentru cei care i le-au spus.",
          source: source(
            "Job 42 ... when he prayed for those who are jealous of him ... Lord blessed him double ... You want the Lord to bless you double? Pray for those who persecute you. Love those who are your enemies.",
          ),
          explanationKind: "exposition",
          forYourHeart:
            "Dacă încă porți în inimă pe cineva care te-a rănit, începe să te rogi pentru el. Iov a intrat în binecuvântarea finală rugându-se pentru acuzatorii lui.",
        }
      }

      return unit
    }),
  }
}

export function restoreIovPoonenFidelity(book: ExplainedBookOverlay): ExplainedBookOverlay {
  return {
    ...book,
    chapters: book.chapters.map((chapter) => restoreIov42(restoreIov31(restoreIov29(chapter)))),
  }
}
