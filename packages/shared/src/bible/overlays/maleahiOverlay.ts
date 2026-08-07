import { assertCompleteOverlay, type ExplainedBookOverlay } from "../explainedOverlay.js"

const sourceUrl = "https://www.cfcindia.com/through-the-bible/malachi"
const p = (section: string) => ({ kind: "poonen-official" as const, sourceUrl, section })

const MALEAHI_OVERLAY: ExplainedBookOverlay = {
  bookId: "maleahi",
  bibleEmanusBookId: "MAL",
  name: "Maleahi",
  testament: "vt",
  order: 39,
  transcript: sourceUrl,
  status: "in_review",
  coverageMode: "transcript-focused",
  chapters: [
    {
      number: 1,
      title: "«V-am iubit» și preoția care aduce lui Dumnezeu ce nu ar oferi unui dregător",
      summary: "Maleahi începe cu dragostea declarată de Dumnezeu și trece imediat la închinarea degradată a preoților.",
      units: [{
        from: 1, to: 5,
        heading: "First Burden — The Love of God",
        teaching: "Prima «povară» din structura oficială Poonen este dragostea lui Dumnezeu. Poporul răspunde cu întrebarea «în ce ne-ai iubit?», iar profetul îi aduce aminte de alegerea și istoria lor. Cartea nu începe prin a cere performanță, ci prin declarația relației pe care poporul a ajuns să o trateze cu indiferență.",
        source: p("First Burden - The Love of God"),
      }, {
        from: 6, to: 14,
        heading: "Second Burden — Degenerate Priesthood",
        teaching: "A doua secțiune Poonen privește preoția degenerată. Problema nu este că nu există jertfe, ci că se aduce ceea ce este orb, șchiop sau bolnav și se numește aceasta onoare față de Dumnezeu. Maleahi testează standardul printr-o întrebare foarte concretă: ai oferi același lucru dregătorului? Slujirea nu devine sfântă doar fiindcă păstrează forma liturgică.",
        source: p("Second Burden - Degenerate Priesthood"),
        forYourHeart: "Nu măsura ce Îi dai lui Dumnezeu numai prin faptul că «ai dat ceva». Întreabă dacă Îl tratezi cu o seriozitate pe care o ai chiar față de oamenii pe care îi respecți.",
      }],
    },
    {
      number: 2,
      title: "Legământul preotului și trădarea legământului căsătoriei",
      summary: "Maleahi continuă acuzația împotriva preoților și apoi confruntă necredincioșia în căsătorie.",
      units: [{
        from: 1, to: 9,
        heading: "Second Burden — Degenerate Priesthood",
        teaching: "Preotul trebuia să păstreze cunoașterea și să fie mesager al DOMNULUI, dar liderii se abătuseră și făcuseră pe mulți să se poticnească. Autoritatea spirituală este legată de fidelitatea față de adevăr; titlul nu protejează un lider care folosește greșit rolul.",
        source: p("Second Burden - Degenerate Priesthood"),
      }, {
        from: 10, to: 16,
        heading: "Third Burden — Divorce",
        teaching: "A treia secțiune oficială Poonen tratează divorțul. Maleahi descrie bărbați care își trădează soțiile tinereții și leagă căsătoria de legământ și fidelitate. Pasajul este o condamnare a trădării, nu o armă prin care o victimă a violenței sau abuzului este obligată să rămână în pericol. Învățătura creștină despre căsătorie și separare trebuie citită împreună cu întregul Noul Testament și cu obligația de a proteja viața și persoana vulnerabilă.",
        source: p("Third Burden - Divorce"),
        words: [{
          original: "בָּגַד",
          transliteration: "bagad",
          language: "ebraica",
          meaning: "a acționa cu trădare/necredincioșie; verb repetat în Maleahi 2 pentru încălcarea loialității de legământ.",
          verseRef: "Maleahi 2:14-16",
          lexicalSource: "WLC-OSHB",
        }],
      }, {
        from: 17, to: 17,
        heading: "Fourth Burden — Messiah's Coming începe cu întrebarea despre dreptatea lui Dumnezeu",
        teaching: "Versetul final deschide următoarea povară: oamenii Îl obosesc pe Dumnezeu spunând fie că răul este bun, fie întrebând unde este Dumnezeul dreptății. Capitolul 3 răspunde prin venirea mesagerului și a Domnului la templul Său.",
        source: p("Fourth Burden - Messiah's Coming"),
      }],
    },
    {
      number: 3,
      title: "Mesagerul, curățirea, întoarcerea și oamenii care vorbesc unii cu alții despre DOMNUL",
      summary: "Capitolul vorbește despre mesagerul care pregătește calea, venirea Domnului, curățirea poporului, chemarea la întoarcere și diferența dintre cei care Îl slujesc și cei care Îl acuză.",
      units: [{
        from: 1, to: 6,
        heading: "Fourth Burden — Messiah's Coming",
        teaching: "Structura Poonen numește această secțiune venirea Mesiei. Maleahi 3:1 vorbește despre mesagerul care pregătește calea și despre Domnul care vine la templu. Evangheliile aplică limbajul mesagerului lui Ioan Botezătorul. Venirea este descrisă și ca foc curățitor, nu numai ca încurajare sentimentală.",
        source: p("Fourth Burden - Messiah's Coming"),
        words: [{
          original: "מַלְאָכִי",
          transliteration: "malakhi",
          language: "ebraica",
          meaning: "«mesagerul Meu»; aceeași formă este și numele tradițional al cărții, iar în 3:1 desemnează mesagerul trimis înaintea Domnului.",
          verseRef: "Maleahi 3:1",
          lexicalSource: "WLC-OSHB",
        }],
      }, {
        from: 7, to: 12,
        heading: "Fifth Burden — Repentance",
        teaching: "A cincea povară este pocăința. Poporul este chemat «întoarceți-vă la Mine», iar problema zeciuielilor apare în cadrul legământului și al întreținerii Casei. Maleahi 3:10 nu este tratat de Emanus ca schemă de investiție prin care o donație obligă pe Dumnezeu să ofere îmbogățire financiară; este un text al legământului vechi despre fidelitate și resursele aduse în visterie.",
        source: p("Fifth Burden - Repentance"),
      }, {
        from: 13, to: 18,
        heading: "Sixth Burden — Complaints Against God",
        teaching: "Oamenii spun că este zadarnic să-L slujești pe Dumnezeu pentru că nu văd avantajul imediat. În contrast, cei ce se tem de DOMNUL vorbesc unii cu alții, iar o carte de aducere aminte este scrisă înaintea Lui. Textul mută valoarea slujirii din câștigul imediat în relația și evaluarea lui Dumnezeu.",
        source: p("Sixth Burden - Complaints Against God"),
      }],
    },
    {
      number: 4,
      title: "Ziua DOMNULUI, Soarele dreptății și promisiunea mesagerului înainte de ziua cea mare",
      summary: "Ultimul capitol al VT-ului profetic privește spre ziua judecății, vindecare pentru cei ce se tem de Dumnezeu și venirea unui mesager în duhul lui Ilie.",
      units: [{
        from: 1, to: 6,
        heading: "Seventh Burden — Day of the Lord",
        teaching: "Ultima povară Poonen este Ziua DOMNULUI. Maleahi contrastează mândria și răul cu cei care se tem de Numele lui Dumnezeu și vorbește despre «Soarele dreptății» cu vindecare. Finalul anunță trimiterea lui Ilie înainte de ziua cea mare; Noul Testament leagă această așteptare de lucrarea lui Ioan Botezătorul, fără a spune că Ioan era literal reîncarnarea lui Ilie. Imaginile zilei de judecată rămân în mâna lui Dumnezeu și nu autorizează violență religioasă.",
        source: p("Seventh Burden - Day of the Lord"),
        forYourHeart: "VT-ul canonic se încheie nu cu ideea că omul și-a rezolvat singur problema, ci cu așteptarea intervenției lui Dumnezeu și a mesagerului care pregătește calea.",
      }],
    },
  ],
}

export const MALEAHI_EXPLAINED = assertCompleteOverlay(MALEAHI_OVERLAY, 4)
