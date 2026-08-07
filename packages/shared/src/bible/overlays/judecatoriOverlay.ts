import {
  assertCompleteOverlay,
  transcriptFocusedChapters,
  type ExplainedBookOverlay,
  type ExplainedOverlayChapter,
} from "../explainedOverlay.js"

const transcript = ".research/poonen-through-the-bible-OT/transcripts/judges-ruth.txt"
const p = (anchor: string) => ({ kind: "poonen" as const, transcript, anchor })

const focused: Record<number, ExplainedOverlayChapter> = {
  1: {
    number: 1,
    title: "După Iosua: cucerire neterminată și începutul compromisului",
    summary: "Judecători pornește imediat după victoriile lui Iosua, dar Israel nu duce ascultarea până la capăt și lasă popoare pe care trebuia să le izgonească.",
    units: [{
      from: 1, to: 36,
      heading: "Ascultarea incompletă pregătește robia care urmează",
      teaching: "Poonen introduce Judecători ca imagine a unei căderi rapide după o perioadă de biruință. Poporul ajunge să raționeze și să modifice porunca în loc să o urmeze. El aplică acest tipar compromisului spiritual: ceea ce refuzi să confrunți ajunge să conviețuiască cu tine și să te influențeze. Această aplicație nu transformă războaiele de cucerire ale lui Israel în model pentru violență sau eliminarea unor grupuri moderne; conflictul din Canaan aparține cadrului istoric al textului.",
      source: p("Judges ... backslidden state ... failed to conquer Canaan ... did not follow exactly what God said"),
    }],
  },
  2: {
    number: 2,
    title: "O generație care nu-L cunoștea pe DOMNUL și ciclul Judecătorilor",
    summary: "După moartea lui Iosua și a bătrânilor, se ridică o generație care nu-L cunoaște pe DOMNUL, iar cartea intră în cicluri de abatere, apăsare, strigăt și izbăvire.",
    units: [{
      from: 1, to: 23,
      heading: "Doctrina moștenită nu este același lucru cu a-L cunoaște pe Dumnezeu",
      teaching: "Poonen face din 2:10 cheia cărții: noua generație poate păstra numele și informația, dar nu cunoaște pe DOMNUL și lucrările Lui așa cum le cunoscuse generația anterioară. El avertizează împotriva dependenței de un fondator sau lider carismatic. Când oamenii plâng la mustrare, transcriptul observă că lacrimile și jertfele nu schimbă nimic dacă nu urmează o viață schimbată. Mai târziu, Poonen rezumă șapte cicluri de cădere și izbăvire.",
      source: p("chapter 2 verse 10 ... did not know the Lord ... seven cycles"),
      forYourHeart: "Credința generației dinainte poate să-ți dea limbaj, dar nu poate trăi în locul tău. Întrebarea este dacă Îl cunoști tu pe Dumnezeu.",
    }],
  },
  3: {
    number: 3,
    title: "Otniel, Ehud și Șamgar: izbăvitori ridicați după ce poporul strigă",
    summary: "Primele trei judecători arată tiparul cărții și accentul pe puterea dată de Dumnezeu.",
    units: [{
      from: 1, to: 31,
      heading: "Duhul DOMNULUI, nu certificatul, îl califică pe Otniel",
      teaching: "Poonen se oprește la 3:10: Duhul DOMNULUI vine peste Otniel și el judecă Israelul. Pentru transcript, calificarea slujirii nu este doar informația sau certificatul, ci lucrarea Duhului. El observă apoi cât de mult așteaptă Israel înainte să strige după ajutor și descrie pe Ehud și Șamgar ca alte instrumente prin care Dumnezeu aduce izbăvire. Narațiunile violente rămân acte din istoria judecătorilor și nu sunt metode pentru slujirea creștină modernă.",
      source: p("Othniel ... Spirit of the Lord came upon him ... Ehud ... Shamgar"),
    }],
  },
  4: {
    number: 4,
    title: "Debora și Barac într-o generație în care Dumnezeu caută un om disponibil",
    summary: "Israel ajunge din nou sub apăsare, iar Dumnezeu ridică pe Debora și îl cheamă pe Barac la luptă.",
    units: [{
      from: 1, to: 24,
      heading: "Dumnezeu o folosește pe Debora fără ca textul să-i micșoreze autoritatea profetică",
      teaching: "Poonen folosește Debora ca încurajare pentru femei și spune că Dumnezeu a ridicat-o într-o vreme în care nu găsea un bărbat de aceeași disponibilitate. El exprimă în transcript și convingerea sa despre conducerea masculină în biserică, bazată pe lectura lui din 1 Timotei. Acea poziție este interpretarea lui Poonen asupra rânduielii bisericești și nu trebuie confundată cu faptul explicit din Judecători 4: Debora este prorociță și judecă Israelul, iar Dumnezeu vorbește prin ea.",
      source: p("God couldn't find a man ... woman called Deborah ... encouragement to all the sisters"),
      forYourHeart: "Nu disprețui persoana prin care Dumnezeu spune adevărul doar pentru că nu se potrivește așteptării tale sociale.",
    }],
  },
  6: {
    number: 6,
    title: "Ghedeon: Duhul îl îmbracă pe omul care se simțea mic",
    summary: "Madian pustiește țara, iar Ghedeon este chemat și echipat pentru izbăvire.",
    units: [{
      from: 1, to: 40,
      heading: "«Duhul DOMNULUI l-a îmbrăcat pe Ghedeon»",
      teaching: "Poonen se oprește la 6:34 și la imaginea marginală: Duhul DOMNULUI îl «îmbracă» pe Ghedeon ca o haină. El folosește aceasta în aceeași linie cu Otniel și Samson: puterea pentru lucrare vine de la Dumnezeu. Ghedeon începe bine și va deveni un exemplu că un început bun și o experiență reală cu Duhul nu garantează un sfârșit bun.",
      source: p("chapter 6 ... Gideon ... Spirit of the Lord clothed Gideon like a dress"),
      words: [{
        original: "וְרוּחַ יְהוָה לָבְשָׁה",
        transliteration: "ve-ruah YHWH laveșah",
        language: "ebraica",
        meaning: "«Duhul DOMNULUI l-a îmbrăcat»; verbul folosește imaginea îmbrăcării pentru echiparea lui Ghedeon.",
        verseRef: "Judecători 6:34",
        lexicalSource: "WLC-OSHB",
      }],
    }],
  },
  7: {
    number: 7,
    title: "Trei sute, vase de lut și lumina care se vede când vasul se sparge",
    summary: "Dumnezeu reduce armata lui Ghedeon, îl încurajează înaintea luptei și folosește trâmbițe, vase și făclii în noapte.",
    units: [{
      from: 1, to: 25,
      heading: "Biruința trebuie să lase puțin spațiu pentru lauda omului",
      teaching: "Poonen urmărește selectarea celor trei sute, încurajarea dată lui Ghedeon prin ceea ce aude în tabăra vrăjmașă și vasele cu lumină înăuntru. El leagă imaginea vaselor sparte de 2 Corinteni 4: comoara în vase de lut și purtarea morții lui Iisus pentru ca viața Lui să se arate. Legătura paulină este aplicația lui Poonen; Judecători 7 în sine relatează strategia și biruința. Reducerea armatei are în text scopul explicit ca Israel să nu spună «mâna mea m-a izbăvit».",
      source: p("Gideon's army ... vessel with a light inside ... 2 Corinthians 4 7-10"),
    }],
  },
  8: {
    number: 8,
    title: "Ghedeon refuză coroana, dar efodul lui devine idol",
    summary: "După victorie, Ghedeon declară că DOMNUL trebuie să domnească, dar cere aur și face un efod care devine cursă.",
    units: [{
      from: 1, to: 35,
      heading: "Poți începe bine și totuși să nu rămâi până la capăt",
      teaching: "Poonen folosește finalul lui Ghedeon ca avertisment repetat: omul a început bine, a fost îmbrăcat de Duhul și folosit puternic, dar după victorie aurul primit devine un efod care ajunge idol. Transcriptul subliniază că lucrarea trecută nu ne scutește de nevoia de veghere prezentă.",
      source: p("chapter 8 verse 22 ... Gideon ... 1700 shekels of gold ... became an idol ... backslid"),
      forYourHeart: "Nu te hrăni cu povestea începutului tău bun. Întreabă ce face succesul de azi cu inima ta.",
    }],
  },
  13: {
    number: 13,
    title: "Samson este consacrat înainte de naștere și Duhul începe să-l miște",
    summary: "Un cuplu fără copii primește vestea nașterii unui nazireu care va începe izbăvirea lui Israel.",
    units: [{
      from: 1, to: 25,
      heading: "Chemare și putere înaintea unei vieți care va rămâne amestecată",
      teaching: "Poonen introduce pe Samson ca al treisprezecelea judecător din carte și subliniază nazireatul și faptul că Duhul lui Dumnezeu începe să lucreze în el. Acest început extraordinar face cu atât mai grav declinul ulterior. Darul spiritual și chemarea nu sunt garanția caracterului matur.",
      source: p("13th Samson ... chapter 13 ... Nazarite ... spirit of God"),
      words: [{
        original: "נְזִיר אֱלֹהִים",
        transliteration: "nezir Elohim",
        language: "ebraica",
        meaning: "nazireu/om consacrat lui Dumnezeu; separarea lui Samson este semn al chemării sale, nu o putere magică a părului.",
        verseRef: "Judecători 13:5",
        lexicalSource: "WLC-OSHB",
      }],
    }],
  },
  14: {
    number: 14,
    title: "Samson «s-a coborât» și viața lui începe să alterneze între putere și dorințe necontrolate",
    summary: "Samson dorește o femeie filisteancă, omoară un leu prin puterea Duhului și intră într-un șir de conflicte personale.",
    units: [{
      from: 1, to: 20,
      heading: "Puterea spirituală nu compensează lipsa disciplinei în dorințe",
      teaching: "Poonen observă chiar formularea «Samson s-a coborât» și dezvoltă contrastul dintre Samson și Iosif în domeniul sexual. Transcriptul folosește limbaj foarte general despre femei; Emanus restrânge aplicația la problema explicită a lui Samson: el își lasă dorințele să-i conducă alegerile și caută repetat relații care îl duc spre compromis. Vina nu este pusă generic asupra femeilor; responsabilitatea pentru alegerile lui Samson îi aparține lui Samson.",
      source: p("Samson went down ... saw a woman ... contrast to Joseph"),
    }],
  },
  16: {
    number: 16,
    title: "Samson pierde libertatea după ce se joacă repetat cu limita consacrării",
    summary: "Relația cu Dalila ajunge la divulgarea secretului nazireatului, iar Samson este prins, orbit și adus în templul lui Dagon.",
    units: [{
      from: 1, to: 31,
      heading: "O slujire puternică nu salvează automat o viață privată nevegheată",
      teaching: "Poonen încheie povestea lui Samson ca avertisment despre un om cu o lucrare extraordinară care este ruinat prin domeniul pe care nu l-a păzit. El subliniază contrastul dintre numărul oamenilor binecuvântați prin lucrare și starea personală a slujitorului. Finalul violent al lui Samson aparține războiului cu filistenii și nu este model pentru sinucidere, atac asupra civililor sau martiriu provocat. Aplicația sigură este nevoia de caracter și curăție alături de dar.",
      source: p("message of Samson ... wonderful ministry ... many people blessed"),
      forYourHeart: "Nu folosi rodul public ca dovadă că totul este sănătos în viața privată. Darul nu ține locul ascultării.",
    }],
  },
}

const JUDECATORI_OVERLAY: ExplainedBookOverlay = {
  bookId: "judecatori",
  bibleEmanusBookId: "JDG",
  name: "Judecători",
  testament: "vt",
  order: 7,
  transcript,
  status: "in_review",
  coverageMode: "transcript-focused",
  chapters: transcriptFocusedChapters("Judecători", 21, focused),
}

export const JUDECATORI_EXPLAINED = assertCompleteOverlay(JUDECATORI_OVERLAY, 21)
