import type { BibleChapter, BibleUnit } from "./types.js"

const REVIEW_SOURCE =
  "Emanus canonical exegesis — Levitic 25 + Deuteronom 15 + canonical cross-references/WLC-OSHB; legacy editorial source retained internally where supported"

function replaceUnit(chapter: BibleChapter, unitId: string, patch: Partial<BibleUnit>): BibleChapter {
  return {
    ...chapter,
    units: chapter.units.map((unit) => (unit.id === unitId ? { ...unit, ...patch } : unit)),
  }
}

function reviewChapter25(chapter: BibleChapter): BibleChapter {
  let reviewed: BibleChapter = {
    ...chapter,
    title: "Levitic 25 — Odihna pământului, Jubileul, răscumpărarea și limitele stăpânirii",
    summary:
      "La fiecare al șaptelea an, pământul primește un sabat. După șapte cicluri de câte șapte ani este proclamat Jubileul: libertatea este vestită, oamenii se întorc la proprietatea și familia lor, iar prețul pământului este calculat după anii de rod rămași până la Jubileu. Capitolul protejează israelitul sărăcit de dobândă și de stăpânire aspră și îi păstrează dreptul de răscumpărare. În același timp, vv. 44–46 permit Israelului să cumpere și să lase moștenire robi dintre popoarele din jur; explicația nu ascunde această diferență juridică și nu o prezintă drept ideal creștin. Levitic 25 nu spune că toate datoriile sunt anulate la Jubileu; remiterea datoriilor este reglementată separat în Deuteronom 15.",
    literaryContext:
      "Capitolul dezvoltă faptul că pământul și poporul Îi aparțin DOMNULUI. Proprietatea ereditară a lui Israel nu este tratată ca bun absolut pe care omul îl poate înstrăina pentru totdeauna, iar israelitul sărăcit nu trebuie tratat ca un rob străin. Totuși, textul face o distincție reală între israelit și robul cumpărat dintre popoarele din jur. Tocmai această diferență trebuie lăsată vizibilă pentru ca lectura canonică ulterioară despre demnitatea persoanei, fraternitatea în Hristos și condamnarea răpirii de oameni să nu fie construită pe o versiune cosmetizată a legii vechi.",
    historicalContext:
      "Levitic 25 reglementează pământul, sărăcia, servitutea și răscumpărarea în Israelul antic. Nu afirmăm că toate societățile vecine aveau numai sclavie ereditară fără nicio ieșire sau că Israelul ar fi fost singura cultură cu forme temporare de servitute pentru datorii; asemenea comparații cer dovezi istorice separate. Nici nu putem demonstra din acest capitol cât de complet a fost aplicat Jubileul în practica Israelului. 2 Cronici 36:21 interpretează exilul ca timp în care țara și-a primit sabatele, dar nu ne oferă o contabilitate completă a fiecărui an sabatic omis. Explicația rămâne la regulile pe care textul le prescrie și la felul în care canonul le dezvoltă.",
  }

  reviewed = replaceUnit(reviewed, "levitic-25-1-7", {
    heading: "Sabat pentru pământ: producția spontană rămâne hrană, dar recolta obișnuită se oprește",
    teaching: [
      "Șase ani Israel poate semăna, tăia via și strânge recolta. În al șaptelea an pământul trebuie să aibă un sabat solemn pentru DOMNUL: nu se seamănă și nu se administrează recolta ca într-un an agricol obișnuit.",
      "Ceea ce crește de la sine nu dispare. Textul spune că roadele sabatului sunt hrană pentru proprietar, rob, roabă, lucrător tocmit, străin, animale și fiare. Accentul este accesul la hrana produsă fără exploatarea normală a terenului, nu o afirmație că toate diferențele sociale și economice sunt abolite pentru un an.",
      "Nu spunem că «nimeni nu putea culege mai mult decât altul»; textul nu fixează asemenea cote. El interzice secerarea și culesul în forma obișnuită de proprietar-producător și lasă ceea ce pământul produce drept hrană disponibilă casei și celor dependenți de ea.",
      "2 Cronici 36:21 leagă exilul de sabatele de care țara fusese lipsită. Legătura arată că porunca a fost tratată serios de tradiția biblică, dar nu ne permite să calculăm din cei șaptezeci de ani o istorie completă și sigură a fiecărui sabat omis.",
      "O aplicație modernă despre ritm, odihnă și refuzul exploatării fără limită este legitimă ca principiu, dar nu transformăm anul sabatic într-o lege agricolă obligatorie pentru orice creștin sau stat contemporan.",
    ].join("\n\n"),
    explanationKind: "exposition",
    explanationSource: REVIEW_SOURCE,
    crossRefs: ["Exod 23:10-12", "2 Cronici 36:20-21", "Psalmul 24:1"],
    forYourHeart:
      "Faptul că poți scoate încă puțin rod dintr-un lucru nu înseamnă că trebuie să-l storci fără oprire. Dumnezeu poate pune limite chiar asupra lucrurilor pe care le numești «ale mele».",
  })

  reviewed = replaceUnit(reviewed, "levitic-25-8-17", {
    heading: "Jubileul: libertate proclamată și proprietate ereditară întoarsă — nu anularea generică a tuturor datoriilor",
    teaching: [
      "După șapte sabate de ani, cornul este sunat în Ziua Ispășirii și al cincizecilea an este sfințit. Textul poruncește proclamarea libertății și întoarcerea fiecăruia la proprietatea și familia lui. Numele și imaginea Jubileului sunt legate de această proclamare publică.",
      "Când un ogor este vândut, prețul trebuie calculat după numărul de recolte rămase până la Jubileu. În logica textului, cumpărătorul nu dobândește proprietatea ereditară pentru totdeauna, ci valoarea anilor de producție rămași. De aceea vânzătorul aflat în nevoie nu trebuie exploatat printr-un preț care ignoră limita stabilită de Dumnezeu.",
      "Trebuie corectată o confuzie frecventă: Levitic 25 nu spune că în Jubileu «cad toate datoriile». Deuteronom 15 reglementează separat remiterea creanțelor în anul al șaptelea. Cele două instituții sunt înrudite prin grija față de sărăcie și libertate, dar nu trebuie contopite într-o singură poruncă.",
      "Faptul că trâmbița Jubileului este sunată în Ziua Ispășirii oferă o legătură teologică puternică între restaurare și relația de legământ cu Dumnezeu. Totuși textul nu spune prin aceasta că plata unei datorii civile este literal ispășită de ritual.",
      "În Luca 4, Isus citește Isaia 61 despre «anul de îndurare al DOMNULUI» și spune că Scriptura s-a împlinit în auzul celor prezenți. Limbajul libertății rezonează cu Jubileul și poate susține o lectură canonică despre eliberarea adusă de Mesia; este mai exact să vorbim despre această rezonanță decât să pretindem că Isus citează direct Levitic 25 sau declară fiecare regulă economică a Jubileului împlinită una-la-una.",
    ].join("\n\n"),
    explanationKind: "exposition",
    explanationSource: REVIEW_SOURCE,
    crossRefs: ["Deuteronom 15:1-11", "Isaia 61:1-2", "Luca 4:16-21"],
    forYourHeart:
      "Dumnezeu nu vrea ca necazul altuia să devină pentru tine o ocazie de a-i lua viitorul fără întoarcere. Întreabă-te dacă felul în care negociezi lasă loc dreptății, nu numai avantajului.",
  })

  reviewed = replaceUnit(reviewed, "levitic-25-18-22", {
    heading: "«Ce vom mânca?» — promisiunea privește exact riscul anului sabatic",
    teaching: [
      "Textul anticipează întrebarea practică: dacă nu semănăm și nu strângem recolta în al șaptelea an, ce vom mânca? Dumnezeu promite binecuvântare în al șaselea an, suficientă pentru perioada până când noua recoltă va putea fi mâncată.",
      "Aceasta este o promisiune de legământ legată de porunca sabatului pământului. Nu trebuie transformată într-o garanție universală că orice creștin care își oprește activitatea economică un an va primi automat o recoltă triplă.",
      "Explicația nu adaugă că surplusul «trebuia păstrat și nu vândut»; versetele nu dau această poruncă. Ceea ce cer este încrederea și ascultarea de rânduiala sabatică, pe baza purtării de grijă promise de Dumnezeu.",
      "Nici nu spunem că poporul vedea întotdeauna toată siguranța «în hambar» înainte să fie nevoie de credință. Promisiunea însăși cere încredere că rodul și timpul vor fi suficiente până la recolta următoare.",
    ].join("\n\n"),
    explanationKind: "exposition",
    explanationSource: REVIEW_SOURCE,
    crossRefs: ["Exod 16:22-30", "Matei 6:31-34"],
    forYourHeart:
      "Credința nu inventează riscuri ca să-L testeze pe Dumnezeu; ea ascultă atunci când Dumnezeu a vorbit limpede și se sprijină pe promisiunea pe care El chiar a făcut-o.",
  })

  reviewed = replaceUnit(reviewed, "levitic-25-39-46", {
    heading: "Israelitul sărăcit nu trebuie tratat ca rob permanent; străinii sunt însă tratați diferit în lege",
    teaching: [
      "Dacă un frate israelit sărăcește și se vinde unui alt israelit, textul interzice tratarea lui ca pe un rob de tip permanent. El trebuie să fie ca un lucrător tocmit sau un rezident și să iasă împreună cu copiii lui la Jubileu. Motivul este explicit: israeliții sunt robii DOMNULUI, scoși de El din Egipt; nu trebuie vânduți ca sclavi și nu trebuie stăpâniți cu asprime.",
      "Versetele 44–46 fac însă o diferență pe care explicația nu are voie s-o ascundă. Legea permite cumpărarea de robi și roabe dintre popoarele din jur și dintre rezidenții străini, permite ca ei să fie ținuți ca proprietate și lăsați moștenire copiilor și spune că pot fi slujiți «pentru totdeauna», în contrast cu fratele israelit.",
      "Aceasta nu este doar servitute temporară pentru datorii și nu trebuie rescrisă ca și cum Leviticul ar aboli sclavia. Este o permisiune juridică reală și moral dificilă într-o ordine veche care acordă privilegii distincte membrilor Israelului.",
      "Tot la fel de greșit ar fi să folosim această permisiune ca justificare pentru sclavia rasială, comerțul modern cu oameni sau răpirea persoanelor. Exod 21:16 și Deuteronom 24:7 condamnă răpirea și vânzarea oamenilor; 1 Timotei 1:10 îi include pe răpitorii/comercianții de oameni între cei condamnați. Nici clasificările etnice moderne nu pot fi proiectate în «popoarele din jur» ale lui Levitic.",
      "Noul Testament nu transformă printr-un singur verset toate instituțiile civile ale lumii romane, dar pune în comunitatea lui Hristos principii care subminează pretenția stăpânului la superioritate spirituală: rob și liber sunt una în Hristos, stăpânul are același Stăpân în cer, iar Filimon este chemat să-l primească pe Onisim «nu ca pe un rob, ci mai mult decât pe un rob: ca pe un frate iubit». Acesta este un traseu canonic spre fraternitate și libertate, nu o pretinsă traducere alternativă a Leviticului 25:44–46.",
      "Așadar ținem împreună două adevăruri: Leviticul limitează dur stăpânirea asupra fratelui israelit, dar permite o sclavie permanentă a străinului; lectura creștină nu poate ascunde primul text și nici nu poate folosi al doilea pentru a legitima înrobirea oamenilor astăzi.",
    ].join("\n\n"),
    explanationKind: "exposition",
    explanationSource: REVIEW_SOURCE,
    crossRefs: ["Exod 21:16", "Deuteronom 24:7", "Galateni 3:28", "Efeseni 6:5-9", "Filimon 15-17", "1 Timotei 1:9-10"],
    forYourHeart:
      "Nu cere Scripturii să facă un text greu să dispară. Citește-l întreg, refuză să-l folosești pentru a domina oameni și lasă Evanghelia să-ți schimbe felul în care vezi persoana aflată sub puterea ta: nu obiect, ci om înaintea aceluiași Stăpân.",
  })

  reviewed = replaceUnit(reviewed, "levitic-25-47-55", {
    heading: "Ruda răscumpărătoare și dreptul israelitului de a ieși din servitute",
    teaching: [
      "Dacă un israelit sărăcește și se vinde unui străin sau unui descendent al unei familii străine stabilite în țară, el păstrează dreptul de răscumpărare. Un frate, unchi, văr sau altă rudă apropiată îl poate răscumpăra; dacă omul dobândește mijloace, se poate răscumpăra singur.",
      "Prețul este calculat după anii rămași până la Jubileu, în raport cu munca unui lucrător tocmit. Textul cere și ca stăpânul străin să nu domnească asupra israelitului cu asprime sub ochii comunității.",
      "Motivul final revine la Exod: fiii lui Israel sunt robii DOMNULUI, pe care El i-a scos din Egipt. Dreptul de răscumpărare nu este prezentat ca favoare sentimentală, ci ca parte din apartenența lor de legământ.",
      "Tema rudei răscumpărătoare apare și în alte contexte ale Vechiului Testament, iar creștinii pot vedea o legătură canonică cu Hristos, Care a luat parte la carnea și sângele nostru și ne-a răscumpărat. Totuși Levitic 25 nu spune că fiecare condiție juridică a `goel`-ului este o profeție directă și exclusivă despre Isus. Legătura este tipologică și canonică, întărită de limbajul explicit al răscumpărării din Noul Testament.",
      "Iov 19, Rut 4, Levitic 25 și 1 Petru 1 folosesc tema răscumpărării în contexte diferite. Ele se luminează reciproc, dar nu trebuie reduse la o singură definiție lexicală identică în fiecare pasaj.",
    ].join("\n\n"),
    explanationKind: "exposition",
    explanationSource: REVIEW_SOURCE,
    crossRefs: ["Rut 4:1-10", "Iov 19:25", "Evrei 2:14-18", "1 Petru 1:18-19"],
    forYourHeart:
      "Răscumpărarea biblică nu este un slogan despre valoarea ta, ci vestea că libertatea costă și că Dumnezeu nu te lasă fără un Răscumpărător.",
  })

  return reviewed
}

export function reviewLevitic25Explanation(chapters: BibleChapter[]): BibleChapter[] {
  return chapters.map((chapter) => (chapter.number === 25 ? reviewChapter25(chapter) : chapter))
}
