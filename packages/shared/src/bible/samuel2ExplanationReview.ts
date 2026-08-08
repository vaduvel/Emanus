import type { BibleChapter, BibleUnit } from "./types.js"

const source = (label: string) => `Emanus — exegeză canonică + sursa Poonen unde este indicată: ${label}`

function replaceUnit(chapter: BibleChapter, unitId: string, patch: Partial<BibleUnit>): BibleChapter {
  return {
    ...chapter,
    units: chapter.units.map((unit) => (unit.id === unitId ? { ...unit, ...patch } : unit)),
  }
}

function reviewChapter24(chapter: BibleChapter): BibleChapter {
  let reviewed = replaceUnit(chapter, "2-samuel-24-1-9", {
    heading: "DOMNUL judecă Israelul, Satan este agentul numit de Cronici, iar David alege recensământul",
    teaching: [
      "Capitolul începe înainte de păcatul lui David: «mânia DOMNULUI s-a aprins din nou împotriva lui Israel». Apoi 2 Samuel spune că David este stârnit să numere Israelul și Iuda. Textul trebuie lăsat să spună această cauzalitate suverană, nu rescris ca și cum Dumnezeu ar fi fost absent din eveniment.",
      "1 Cronici 21:1 descrie același recensământ spunând: «Satan s-a ridicat împotriva lui Israel și l-a stârnit pe David să numere Israelul». Cele două texte pot fi ținute împreună prin cauzalitate pe niveluri diferite: Samuel privește evenimentul în cadrul mâniei și judecății suverane a DOMNULUI; Cronici identifică agentul advers care îl împinge pe David. O structură asemănătoare apare în Iov 1–2, unde Satan lovește numai în limitele îngăduite de Dumnezeu, fără ca răutatea lui Satan să devină bună sau Dumnezeu să devină autor moral al păcatului.",
      "Această explicație nu-l scutește pe David. Ioab îl avertizează, porunca regelui prevalează, iar după recensământ conștiința lui David îl lovește și el spune explicit: «am păcătuit foarte mult». Providența divină și responsabilitatea omului nu sunt rivale în narațiune.",
      "Poonen leagă recensământul de încrederea lui David în numărul oamenilor și al armatei în locul încrederii în Dumnezeu. Aplicația lui este puternică: slujirea poate ajunge să se sprijine pe statistici, efective și resurse ca pe adevărata siguranță. Dar nu transformăm aceasta în afirmația că orice numărătoare sau statistică este păcat. Dumnezeu Însuși poruncește recensăminte în Numeri 1 și 26. Problema nu este aritmetica, ci actul neascultător și inima din acest recensământ concret.",
      "Exod 30:11–16 cere un preț de răscumpărare când Israel este numărat și avertizează asupra unei urgii. Unii interpreți au văzut aici cheia păcatului lui David — un recensământ făcut fără rânduiala răscumpărării. Este o legătură posibilă și relevantă, dar 2 Samuel 24 nu spune explicit că aceasta a fost încălcarea precisă. Nu o prezentăm ca fapt sigur.",
    ].join("\n\n"),
    explanationKind: "exposition",
    explanationSource: source("2 Samuel 24:1-9; 1 Cronici 21:1-6; Iov 1-2; Numeri 1; Numeri 26; Exod 30:11-16; Zac Poonen — Through The Bible: 2 Samuel"),
    crossRefs: ["1 Cronici 21:1-6", "Iov 1:6-12", "Numeri 1:1-3", "Numeri 26:1-4", "Exod 30:11-16", "Psalmul 20:7"],
    forYourHeart:
      "Măsurarea nu este păcat în sine. Devine idol când numărul îți spune în cine te încrezi mai mult decât îți spune Dumnezeu.",
  })

  reviewed = replaceUnit(reviewed, "2-samuel-24-10-17", {
    heading: "Judecata era deja asupra lui Israel, David își asumă păcatul, iar moartea celor 70.000 rămâne o tensiune reală",
    teaching: [
      "După numărătoare, inima lui David îl lovește. El nu spune «Satan m-a făcut, deci nu sunt vinovat» și nici «Dumnezeu m-a stârnit, deci nu am răspundere». Spune: «am păcătuit foarte mult» și cere ca nelegiuirea lui să fie îndepărtată. Aceasta este maniera biblică de a ține providența și răspunderea împreună.",
      "Prin Gad, David primește trei forme de judecată și alege să cadă în mâna DOMNULUI, pentru că îndurările Lui sunt mari. Alegerea nu este o tehnică prin care David controlează suferința; toate cele trei opțiuni sunt grele. Mărturisirea lui este că, chiar sub judecată, caracterul lui Dumnezeu este mai sigur decât mila vrăjmașului omenesc.",
      "Ciuma ucide șaptezeci de mii de oameni. Nu trebuie ascunsă gravitatea morală a scenei și nici explicată superficial prin «au murit numai pentru păcatul lui David». Versetul 1 spusese deja că mânia DOMNULUI era aprinsă împotriva lui Israel înainte ca David să dea ordinul recensământului. Recensământul devine astfel parte dintr-un act mai larg de judecată asupra poporului, deși textul nu ne spune aici care fusese păcatul colectiv concret care aprinsese mânia.",
      "David însuși simte tensiunea și spune: «iată, eu am păcătuit și eu am făcut răul; dar oile acestea ce au făcut? Mâna Ta să fie împotriva mea și împotriva casei tatălui meu». Nu anulăm această întrebare printr-o explicație rece. Biblia lasă chiar regele să protesteze în favoarea poporului și să-și asume vina.",
      "În același timp, viziunea biblică despre judecată nu este individualism modern simplu: regele reprezintă poporul, deciziile conducerii au consecințe comunitare, iar începutul capitolului situează întregul episod în mânia asupra Israelului. Acest lucru explică structura narațiunii fără să ne oblige să spunem că putem identifica vina personală a fiecăruia dintre cei morți.",
      "Când îngerul ajunge la Ierusalim, DOMNUL Se îndură de nenorocire și spune «destul». Judecata are o limită pusă de Dumnezeu. Narațiunea nu descrie un mecanism scăpat de sub control pe care altarul îl va opri prin magie.",
    ].join("\n\n"),
    explanationKind: "exposition",
    explanationSource: source("2 Samuel 24:1,10-17; 1 Cronici 21:7-17"),
    crossRefs: ["1 Cronici 21:7-17", "Plângerile 3:31-33", "Evrei 10:31"],
    forYourHeart:
      "Nu folosi suveranitatea lui Dumnezeu ca să fugi de propria răspundere. David știa că judecata era în mâna DOMNULUI și tot a spus: «eu am păcătuit». ",
  })

  reviewed = replaceUnit(reviewed, "2-samuel-24-18-25", {
    heading: "Altarul lui Aravna: jertfa care costă și locul unde judecata se oprește",
    teaching: [
      "Gad îl trimite pe David să ridice un altar în aria lui Aravna/Arauna iebusitul. Regele nu inventează singur un ritual pentru a controla ciuma; răspunde unei porunci profetice. Aravna îi oferă gratuit locul, boii și lemnul, dar David refuză: nu va aduce DOMNULUI o ardere-de-tot care nu îl costă nimic.",
      "Poonen face din 24:24 un principiu de păstrat toată viața: dacă slujirea lui Dumnezeu nu te costă niciodată nimic, trebuie să te întrebi ce fel de jertfă aduci. Aplicarea nu înseamnă că prețul sau suferința dau automat valoare spirituală unui proiect. O lucrare poate fi costisitoare și totuși nechibzuită. Punctul este refuzul de a numi «jertfă» ceea ce transferă tot costul asupra altuia.",
      "David cumpără aria și boii, aduce arderi-de-tot și jertfe de pace, iar DOMNUL răspunde rugăciunii pentru țară și urgia se oprește. Altarul nu mituiește un Dumnezeu reticent; chiar Dumnezeu indicase locul și oprise deja îngerul la Ierusalim. Jertfa este răspunsul de pocăință și închinare în cadrul milei pe care El o inițiază.",
      "Cronici dezvoltă importanța locului. 1 Cronici 21:28–22:1 îl face pe David să recunoască aria lui Ornan drept loc al Casei DOMNULUI, iar 2 Cronici 3:1 spune că Solomon începe Templul pe muntele Moria, în locul pregătit de David, la aria lui Ornan. Astfel cartea lui Samuel se încheie nu numai cu pedeapsa unui recensământ, ci cu locul unde judecata este oprită și unde va fi ridicat Templul.",
      "Pentru lectura creștină, aceasta poate pregăti tipologic tema ispășirii și prezenței lui Dumnezeu, dar nu spunem că fiecare detaliu al ariei este o profeție explicită despre Cruce. Linia canonică sigură este că păcatul, judecata, mila, jertfa și locul templului sunt legate de narațiune într-un mod care pregătește istoria închinării lui Israel.",
    ].join("\n\n"),
    explanationKind: "exposition",
    explanationSource: source("2 Samuel 24:18-25; 1 Cronici 21:18-22:1; 2 Cronici 3:1; Zac Poonen — Through The Bible: 2 Samuel"),
    crossRefs: ["1 Cronici 21:18-30", "1 Cronici 22:1", "2 Cronici 3:1"],
    forYourHeart:
      "Jertfa nu este ceea ce îi costă pe toți ceilalți, dar pe tine nimic. David refuză să-I ofere lui Dumnezeu ceea ce nu l-a costat.",
  })

  return reviewed
}

export function reviewSamuel2Explanations(chapters: BibleChapter[]): BibleChapter[] {
  return chapters.map((chapter) => (chapter.number === 24 ? reviewChapter24(chapter) : chapter))
}
