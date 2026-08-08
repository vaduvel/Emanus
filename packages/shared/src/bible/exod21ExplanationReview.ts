import type { BibleChapter, BibleUnit } from "./types.js"

const REVIEW_SOURCE =
  "Emanus canonical exegesis — Exod 21 + biblical cross-references/WLC-OSHB; legacy editorial source retained only where supported"

function replaceUnit(chapter: BibleChapter, unitId: string, patch: Partial<BibleUnit>): BibleChapter {
  return {
    ...chapter,
    units: chapter.units.map((unit) => (unit.id === unitId ? { ...unit, ...patch } : unit)),
  }
}

function reviewChapter21(chapter: BibleChapter): BibleChapter {
  let reviewed: BibleChapter = {
    ...chapter,
    historicalContext:
      "Exod 21 face parte din «cartea legământului» și reglementează conflicte reale dintr-o societate antică: servitute, vătămare, omor, răspunderea pentru animale și pagube. Nu trebuie să prezentăm aceste rânduieli drept abolirea completă a servituții și nici să inventăm contraste absolute cu toate legile popoarelor vecine. Textul însuși oferă limite diferite pentru situații diferite: robul evreu din vv. 2–6 are ieșire în al șaptelea an, dar poate alege o slujire de durată; femeia din vv. 7–11 are protecții specifice; răpirea unui om pentru vânzare este o infracțiune capitală; iar vătămarea gravă a unui rob poate duce la eliberarea lui. În cazul boului cunoscut ca periculos, vv. 29–30 prevăd chiar posibilitatea unui preț de răscumpărare în locul pedepsei capitale a proprietarului, de aceea nu spunem absolut că legea nu permite niciodată o compensație legată de viață. Capitolul trebuie citit ca drept de legământ care limitează și judecă răul într-o lume deja căzută, nu ca descriere completă a idealului creației.",
  }

  reviewed = replaceUnit(reviewed, "exod-21-1-6", {
    heading: "Robul evreu: șase ani, ieșire în al șaptelea și alegerea de a rămâne",
    teaching: [
      "Rânduiala din vv. 2–6 vorbește precis despre un «rob evreu». După șase ani de slujire, în al șaptelea iese liber fără plată. Nu extindem această regulă ca și cum orice formă de servitute descrisă în Pentateuh s-ar încheia automat după șase ani; textul reglementează aici o categorie anume.",
      "Capitolul păstrează și partea grea: dacă omul intrase singur, iese singur; dacă intrase cu soție, ea iese cu el; dar dacă stăpânul îi dăduse o soție, femeia și copiii născuți în acea casă rămân ai stăpânului. Nu numim aceasta idealul moral al creației și nu o cosmetizăm. Este o structură juridică antică în care familia și statutul de proprietate se pot ciocni dureros.",
      "Robul poate declara că își iubește stăpânul, soția și copiii și că nu vrea să iasă. Atunci este adus înaintea lui Dumnezeu/judecătorilor și urechea îi este străpunsă la ușă, iar el rămâne în slujire pe termen nedeterminat. Textul prezintă o alegere legală reală în interiorul unei relații inegale; nu o romantizăm prin afirmația că «adevărata robie» ar fi numai cea aleasă din dragoste.",
      "Deuteronom 15 reia aceeași ieșire și adaugă că robul eliberat nu trebuie trimis cu mâna goală. Levitic 25 îi amintește lui Israel că israeliții sunt robii DOMNULUI, scoși din Egipt, și interzice stăpânirea nemiloasă asupra fratelui. Linia canonică este că izbăvirea primită de la Dumnezeu limitează felul în care omul poate stăpâni peste alt om.",
      "Urechea străpunsă poate primi o aplicație omiletică despre ascultare, dar aceasta rămâne aplicație. Sensul juridic imediat este semnul public al alegerii de a rămâne în slujire.",
    ].join("\n\n"),
    explanationKind: "exposition",
    explanationSource: REVIEW_SOURCE,
    crossRefs: ["Deuteronom 15:12-18", "Levitic 25:39-43", "Exod 20:2"],
    forYourHeart:
      "Faptul că Dumnezeu te-a scos din robie trebuie să pună limite felului în care folosești puterea asupra altuia. Nu transforma libertatea ta în povară pentru cel mai slab.",
  })

  reviewed = replaceUnit(reviewed, "exod-21-7-11", {
    heading: "Femeia vândută în casă: textul nu laudă situația, dar îi fixează protecții concrete",
    teaching: [
      "Versetele 7–11 vorbesc despre o fiică vândută ca `amah`, o slujnică aflată într-un cadru care poate include desemnarea ei pentru stăpân sau pentru fiul lui. Tocmai de aceea regulile nu sunt identice cu cele ale robului evreu din vv. 2–6. Nu trebuie să reducem scena la o simplă angajare domestică și nici să o prezentăm ca ideal al căsătoriei.",
      "Dacă nu mai este plăcută stăpânului care o destinase pentru sine, el trebuie să permită răscumpărarea ei și nu are dreptul să o vândă unui popor străin, deoarece s-a purtat necredincios față de ea. Dacă o destinează fiului său, trebuie să se poarte cu ea după dreptul fiicelor.",
      "Dacă ia o altă femeie, nu are voie să-i micșoreze cele trei lucruri numite de text: `she'er`, `kesut` și `onah`. Primele două sunt hrana/întreținerea și îmbrăcămintea; `onah` este înțeles tradițional ca drept/datorie conjugală, deși nu construim dintr-un singur termen o definiție modernă completă a intimității. Textul spune suficient de clar că noua relație nu îi anulează obligațiile față de prima femeie.",
      "Dacă nu îi asigură aceste trei lucruri, ea iese liberă fără plată. Aceasta este protecția juridică explicită. Putem vedea aici limitarea puterii stăpânului, dar nu trebuie să spunem că instituția descrisă devine astfel egală cu libertatea modernă sau că toate tensiunile ei morale dispar.",
    ].join("\n\n"),
    explanationKind: "exposition",
    explanationSource: REVIEW_SOURCE,
    crossRefs: ["Deuteronom 15:12-18", "Deuteronom 21:10-14", "Maleahi 2:14-16"],
    forYourHeart:
      "Puterea nu anulează obligația. Dacă un om depinde de tine, Dumnezeu nu îți dă dreptul să-i tai ceea ce i-ai datorat doar pentru că ai găsit pe altcineva mai convenabil.",
  })

  reviewed = replaceUnit(reviewed, "exod-21-12-17", {
    heading: "Omor cu intenție, omor fără premeditare și infracțiuni pe care legea le tratează ca fiind capitale",
    teaching: [
      "Legea deosebește omorul intenționat de moartea produsă fără premeditare. Pentru cel care nu a stat la pândă, textul spune într-o formulare puternică faptul că Dumnezeu «a făcut să-i cadă în mână» situația și promite un loc de scăpare. Nu slăbim automat această formulare la simplul «Dumnezeu n-a avut nimic de-a face», dar nici nu o folosim ca să anulăm cercetarea juridică a intenției.",
      "Pentru uciderea cu viclenie și premeditare, nici altarul nu oferă azil. Sfințenia locului nu poate fi folosită ca scut împotriva răspunderii pentru omor.",
      "Răpirea unui om și vânzarea lui — sau faptul că persoana răpită este găsită în mâna răpitorului — este tratată ca infracțiune capitală. Acesta este un text decisiv împotriva comerțului cu persoane răpite. Faptul că primește aceeași pedeapsă ca alte infracțiuni capitale nu înseamnă însă că toate aceste fapte sunt identice în fiecare privință.",
      "Lovirea tatălui sau a mamei și blestemarea lor sunt, de asemenea, tratate aici ca infracțiuni capitale în dreptul legământului. Nu redefinim «a blestema» ca și cum ar însemna numai abandonarea unui părinte bătrân; textul folosește termenul pentru blestem/dispreț grav și trebuie lăsat la greutatea lui.",
      "Aceste pedepse aparțin ordinii juridice a Israelului antic. Biserica Noului Legământ nu primește aici mandat de execuție a copiilor neascultători sau a celor care rostesc cuvinte rele; principiile morale se citesc în lumina întregului canon și a ordinii civile în care trăiește cititorul.",
    ].join("\n\n"),
    explanationKind: "exposition",
    explanationSource: REVIEW_SOURCE,
    crossRefs: ["Numeri 35:9-34", "Deuteronom 24:7", "1 Timotei 1:9-10", "1 Împărați 2:28-34"],
    forYourHeart:
      "Lucrurile sfinte nu sunt ascunzătoare pentru răul făcut cu bună știință. Pocăința adevărată nu caută un altar după care să se ascundă, ci aduce adevărul la lumină.",
  })

  reviewed = replaceUnit(reviewed, "exod-21-18-27", {
    heading: "Despăgubire, proporționalitate și limite puse chiar asupra stăpânului care lovește",
    teaching: [
      "Dacă într-o ceartă un om este lovit, supraviețuiește, dar pierde timp de muncă, agresorul trebuie să-i plătească timpul pierdut și vindecarea. Dreptatea urmărește nu numai pedepsirea celui vinovat, ci și repararea concretă a pierderii celui vătămat.",
      "Versetele despre robul lovit de stăpân trebuie explicate fără înfrumusețare. Dacă robul moare sub lovitură, textul cere pedepsirea/răzbunarea juridică a morții. Dacă supraviețuiește o zi sau două, v.21 spune că stăpânul nu este răzbunat în același mod «pentru că este argintul lui». Această propoziție recunoaște explicit statutul de proprietate al robului în sistemul antic; nu trebuie falsificată spunând că textul ar declara aici că robul «este sângele lui». Este un pasaj moral greu, nu o formulă modernă de egalitate juridică.",
      "În aceeași secțiune, dacă stăpânul îi distruge ochiul sau îi sparge dintele robului ori roabei, persoana trebuie eliberată ca despăgubire pentru vătămare. Aceasta pune o limită reală asupra violenței stăpânului, dar nu ne cere să numim întreaga instituție bună sau egală.",
      "Cazul femeii însărcinate lovite și formula «viață pentru viață, ochi pentru ochi, dinte pentru dinte» cer proporționalitate judiciară: sancțiunea nu trebuie să depășească răul stabilit de instanță. Detaliile interpretării vv.22–25 au fost discutate mult, inclusiv întrebarea dacă vătămarea se referă la mamă, copil sau amândoi; nu construim o certitudine modernă din ceea ce textul nu explică pe larg.",
      "În Matei 5, Isus citează «ochi pentru ochi» atunci când interzice ucenicului răzbunarea personală și îl cheamă să răspundă răului fără spirit de represalii. Aceasta nu transformă instanțele în spații fără justiție; mută inima ucenicului de la dreptul de a se răzbuna la iubirea vrăjmașului.",
    ].join("\n\n"),
    explanationKind: "exposition",
    explanationSource: REVIEW_SOURCE,
    crossRefs: ["Levitic 24:17-22", "Deuteronom 19:15-21", "Matei 5:38-48", "Filimon 1:15-16"],
    forYourHeart:
      "Nu folosi un text despre limitarea răului ca să justifici răul pe care îl poți face. Dumnezeu vede și persoana aflată sub puterea ta, nu numai drepturile pe care societatea ți le-a dat asupra ei.",
  })

  reviewed = replaceUnit(reviewed, "exod-21-28-32", {
    heading: "Boul cunoscut ca periculos: răspunderea crește odată cu avertizarea primită",
    teaching: [
      "Dacă un bou ucide un om fără ca proprietarul să fi avut înainte un avertisment despre animal, boul este omorât, iar proprietarul nu poartă răspundere capitală. Dacă însă boul era cunoscut ca împungător, proprietarul fusese avertizat și tot nu l-a ținut sub pază, răspunderea se schimbă radical: moartea produsă prin neglijență cunoscută îl pune și pe proprietar sub sentință.",
      "Versetul 30 adaugă o precizare pe care explicația nu are voie s-o omită: dacă i se impune un preț de răscumpărare, proprietarul poate plăti suma stabilită pentru viața sa. De aceea nu spunem absolut că în acest capitol viața omului «nu se plătește niciodată cu bani». Textul însuși prevede aici o răscumpărare juridică în locul pedepsei capitale.",
      "Fiul și fiica sunt tratați după aceeași regulă. Când victima este rob sau roabă, proprietarul boului plătește stăpânului treizeci de sicli de argint, iar boul este omorât. Plata reflectă statutul juridic și economic al robului în acea societate; nu este o declarație că valoarea persoanei înaintea lui Dumnezeu ar fi de treizeci de sicli.",
      "Treizeci de arginți reapar mai târziu în Zaharia 11 și în relatarea trădării lui Isus. Creștinul poate observa rezonanța canonică a unei sume asociate cu disprețul și evaluarea scăzută, dar Exod 21 nu este citat în Evanghelii ca o profeție explicită despre suma lui Iuda și nu trebuie prezentat ca și cum identitatea monedelor ar fi demonstrată de acest verset.",
      "Principiul cel mai limpede al unității rămâne răspunderea pentru pericolul cunoscut. «N-am lovit eu» nu este o apărare suficientă când omul știa că lăsase liber ceva capabil să ucidă și a refuzat să-l țină sub control.",
    ].join("\n\n"),
    explanationKind: "exposition",
    explanationSource: REVIEW_SOURCE,
    crossRefs: ["Geneza 9:5-6", "Zaharia 11:12-13", "Matei 26:14-16", "Luca 12:47-48"],
    forYourHeart:
      "Răspunderea începe și înainte de dezastru, atunci când știi că există un pericol și alegi să nu-l oprești. Ce lucru cunoscut de tine are nevoie de o limită pusă astăzi?",
  })

  return reviewed
}

export function reviewExodExplanations(chapters: BibleChapter[]): BibleChapter[] {
  return chapters.map((chapter) => (chapter.number === 21 ? reviewChapter21(chapter) : chapter))
}
