import { numeriChapter, teaching } from "./numeriHelpers.js"
import { numeriPassage } from "./numeriText.js"
import { NUMERI_STATUSES } from "./numeriPublication.js"

/*
 * Cartea Numeri, explicată pe unități de sens.
 *
 * Textul biblic: păstrat separat în numeriText.ts (fișierele numeriTextN.ts).
 * Explicația: scrisă pentru Emanus după cercetarea textului. Nu se copiază
 * formularea niciunui predicator sau comentator.
 */

export const NUMERI_6 = numeriChapter({
  number: 6,
  title: "Numeri 6 — Nazireul închinat și binecuvântarea cu Numele DOMNULUI",
  summary:
    "Capitolul dă legea nazireatului — o închinare de sine liber asumată, cu trei semne: fără vin sau struguri, fără briciul pe cap, fără atingere de trup mort — apoi jertfele de încheiere ale jurământului. Se încheie cu una din cele mai cunoscute binecuvântări din toată Scriptura, rostită de Aaron și de fiii lui peste popor.",
  literaryContext:
    "După capitolul curăției obștești și al dreptății între oameni, capitolul șase arată o curăție asumată de bunăvoie, personal, de orice bărbat sau femeie din Israel — nu doar de preoți sau de leviți. Iar capitolul se încheie potrivit: după legile de despărțire și de restituire, vine cuvântul de binecuvântare care pune Numele DOMNULUI însuși peste tot poporul, încheind secțiunea legilor de curăție înainte de dăruirile căpeteniilor din capitolul șapte.",
  historicalContext:
    "Nazireatul nu era o slujbă rezervată unei caste, ca preoția leviților, ci un jurământ liber, deschis oricărui israelit, pentru o perioadă hotărâtă de el însuși. Cunoaștem câțiva nazirei pe viață în Scriptură: Samson (Judecători 13), Samuel (1 Samuel 1) și, după mărturia lui Luca, Ioan Botezătorul (Luca 1:15). Binecuvântarea preoțească de la sfârșitul capitolului este cea mai veche binecuvântare scrisă din Israel găsită arheologic: pe două plăcuțe de argint de la Ketef Hinnom, din secolul al șaptelea înainte de Hristos, s-au găsit tocmai aceste cuvinte.",
  units: [
    {
      id: "numeri-6-1-5",
      ref: "Numeri 6:1-5",
      heading: "Trei semne ale închinării: fără vin, fără brici",
      text: numeriPassage(6, 1, 5),
      teaching: teaching(
        "Jurământul de nazirat este deschis oricărui „bărbat sau femeie” care vrea „să se închine în mod deosebit” DOMNULUI. Nu este cerut de Lege pentru toți; este ales de bunăvoie, pentru o vreme hotărâtă, ca un semn văzut al unei consacrări deosebite.",
        "Primul semn este abținerea totală de la rodul viței: nu doar vinul, ci și strugurii proaspeți, cei uscați, oțetul, sucul — „de la sâmburi până la coajă”. Nicio parte a rodului petrecerii nu este îngăduită, ca semn că nazireul și-a pus deoparte chiar bucuriile obișnuite ale vieții, pentru o vreme, de dragul unei bucurii mai mari.",
        "Al doilea semn este părul care crește nescăpat: „briciul să nu treacă peste capul lui... va fi sfânt”. Pletele lungi deveneau o mărturie publică, văzută de oricine îl întâlnea, a jurământului pe care și-l luase.",
      ),
      words: [
        {
          original: "נָזִיר",
          transliteration: "nazir",
          language: "ebraica",
          meaning:
            "cel separat, cel consacrat. Vine din rădăcina care înseamnă „a se abține” sau „a se separa”; nazireul se separă de bucuriile obișnuite ca să se apropie mai mult de DOMNUL.",
        },
      ],
      crossRefs: ["Judecători 13:4-5", "Luca 1:15", "1 Samuel 1:11"],
      forYourHeart:
        "Consacrarea adevărată nu se vede doar în cuvinte, ci în lucrurile la care aleși să renunți, pentru o vreme sau pentru totdeauna, de dragul lui Dumnezeu.",
    },
    {
      id: "numeri-6-6-8",
      ref: "Numeri 6:6-8",
      heading: "Al treilea semn: nicio apropiere de moarte",
      text: numeriPassage(6, 6, 8),
      teaching: teaching(
        "Al treilea semn al nazireatului este cel mai greu de purtat: „să nu se apropie de niciun trup mort”, nici măcar pentru tatăl, mama, fratele sau sora lui. În orice altă împrejurare, participarea la înmormântarea unui părinte era o datorie sfântă în Israel; pentru nazireu, ea este suspendată pe toată durata jurământului.",
        "Motivul este rostit direct: „purtarea închinării lui Dumnezeu este pe capul lui”. Părul necreșcut nu este doar un semn exterior; el arată că întreaga persoană a nazireului, până și legăturile de familie cele mai firești, sunt puse sub o singură stăpânire, pentru vremea aceasta.",
        "Această cerință aspră apropie nazireul de rânduiala marelui preot, care de asemenea nu se putea apropia de un mort, nici de părinții lui (Levitic 21:10-12). Un om obișnuit din Israel putea alege, pentru o vreme, să trăiască după o măsură de sfințenie apropiată de cea a preoției.",
      ),
      words: [
        {
          original: "נֵזֶר אֱלֹהָיו",
          transliteration: "nezer elohav",
          language: "ebraica",
          meaning:
            "consacrarea Dumnezeului său, cununa închinării lui Dumnezeu. Același cuvânt „nezer” denumește și coroana marelui preot (Exod 29:6); nazireul poartă pe cap o consacrare asemănătoare, deși temporară.",
        },
      ],
      crossRefs: ["Levitic 21:10-12", "Exod 29:6", "Numeri 19:11-13"],
      forYourHeart:
        "Uneori consacrarea cere să pui deoparte, pentru o vreme, chiar și lucruri firești și bune. Ce ar trebui să lași deoparte tu, ca să trăiești mai aproape de Dumnezeu?",
    },
    {
      id: "numeri-6-9-12",
      ref: "Numeri 6:9-12",
      heading: "Când jurământul este întrerupt de o moarte fulgerătoare",
      text: numeriPassage(6, 9, 12),
      teaching: teaching(
        "Legea prevede și cazul în care cineva moare pe neașteptate chiar lângă nazireu, fără voia lui, și îi spurcă astfel consacrarea. Nu este vina lui, și totuși consacrarea este întreruptă: „zilele dinainte vor fi pierdute, pentru că nazireul lui a fost spurcat”.",
        "Refacerea cere ras capul în ziua a șaptea, două păsări aduse ca jertfă pentru păcat și ardere-de-tot, și un miel adus ca jertfă pentru vină, iar apoi „să-I închine din nou DOMNULUI zilele nazirelui său”. Totul începe iar de la zero.",
        "Ia aminte cât de serios tratează Dumnezeu o întrerupere care nu vine din nesocotința omului, ci din împrejurarea neașteptată a morții. Sfințenia nu se măsoară după intenție, ci după starea reală; și totuși, calea de refacere este deschisă imediat, fără respingere.",
      ),
      words: [
        {
          original: "וְהַיָמִים הָרִאשֹנִים יִפְלוּ",
          transliteration: "vehaiamim harișonim ipelu",
          language: "ebraica",
          meaning:
            "iar zilele dinainte vor cădea, se vor pierde. Timpul deja trăit în consacrare nu se socotește când spurcarea a intervenit; consacrarea trebuie reluată întreagă, nu doar completată.",
        },
      ],
      crossRefs: ["Levitic 5:1-6", "Numeri 19:14-16"],
      forYourHeart:
        "O întrerupere neînvinovățită nu înseamnă eșec fără întoarcere. Calea de refacere stă deschisă pentru cine vrea să reia consacrarea, chiar de la început.",
    },
    {
      id: "numeri-6-13-17",
      ref: "Numeri 6:13-17",
      heading: "Încheierea jurământului: trei jertfe și o coș cu pâini",
      text: numeriPassage(6, 13, 17),
      teaching: teaching(
        "Când zilele nazirelui se împlinesc, nazireul este adus „la intrarea Cortului Întâlnirii” cu trei jertfe: un miel pentru ardere-de-tot, o mioară pentru păcat, un berbec pentru pace, plus o coș cu pâini fără plămădeală și turte cu ulei.",
        "Observă că nici la încheierea unui jurământ îndeplinit cu credincioșie nu lipsește jertfa pentru păcat. Consacrarea cea mai atentă nu scutește pe nimeni de nevoia de ispășire; chiar și la încheierea unei închinări desăvârșite, omul rămâne dependent de jertfa care acoperă păcatul.",
        "Cele trei jertfe împreună — pentru păcat, pentru ardere deplină și pentru pace — spun povestea întreagă a închinării: mai întâi curățirea, apoi dăruirea deplină, apoi părtășia sărbătorească cu Dumnezeu.",
      ),
      words: [],
      crossRefs: ["Levitic 1:1-4", "Levitic 3:1-5", "Levitic 4:27-31"],
      forYourHeart:
        "Nicio consacrare, oricât de sinceră și de îndelungată, nu ne scapă de nevoia de ispășire. Chiar și cel mai devotat om are nevoie de jertfa pentru păcat.",
    },
    {
      id: "numeri-6-18-21",
      ref: "Numeri 6:18-21",
      heading: "Părul ars pe altar și vinul îngăduit din nou",
      text: numeriPassage(6, 18, 21),
      teaching: teaching(
        "În fața tuturor, la intrarea Cortului, nazireul își rade capul și pune părul „pe focul care este sub jertfa de pace”. Semnul văzut al consacrării lui, purtat poate luni sau ani de zile, este ars într-o clipă, întors chiar lui Dumnezeu, ca parte din jertfa care sigilează împreună lucrarea.",
        "Preotul își primește partea lui rânduită — spata, pâinea, turta — iar apoi vine ultimul cuvânt, cel mai așteptat: „după aceea, nazireul va putea bea vin”. Restricția care păruse pe viață se încheie odată cu împlinirea jurământului; bucuria pe care o pusese deoparte își este înapoiată.",
        "Legea se încheie cu o observație importantă: totul se face „pe lângă ce-i vor îngădui mijloacele lui”. Cel sărac și cel bogat pot deopotrivă să-și asume acest jurământ; închinarea deosebită nu este rezervată celor cu avere multă.",
      ),
      words: [
        {
          original: "וְאַחַר יִשְׁתֶּה־יַיִן הַנָּזִיר",
          transliteration: "veahar ishte-iain hanazir",
          language: "ebraica",
          meaning:
            "și după aceea nazireul va bea vin. Verbul revine, după interdicția din capul capitolului, ca semn că renunțarea nu era permanentă, ci legată de durata jurământului.",
        },
      ],
      crossRefs: ["Fapte 21:23-26", "Fapte 18:18"],
      forYourHeart:
        "Ce porți ca semn al consacrării tale trebuie, la vremea lui, întors lui Dumnezeu însuși — iar bucuriile puse deoparte pentru o vreme îți vor fi înapoiate.",
    },
    {
      id: "numeri-6-22-27",
      ref: "Numeri 6:22-27",
      heading: "Binecuvântarea preotească: Numele DOMNULUI peste popor",
      text: numeriPassage(6, 22, 27),
      teaching: teaching(
        "Cea mai cunoscută binecuvântare din toată Scriptura vine chiar aici, la încheierea capitolului consacrării personale: „DOMNUL să te binecuvânteze și să te păzească! DOMNUL să facă să lumineze Fața Lui peste tine și să Se îndure de tine! DOMNUL Să-și înalte Fața peste tine și să-ți dea pacea!”",
        "Structura ei este de o simetrie desăvârșită: trei rânduri, fiecare mai lung decât cel dinainte, fiecare începând cu Numele DOMNULUI, fiecare rostind o binecuvântare către cel din urmă, la singular — „te”, nu „vă”. Chiar rostită peste întreaga adunare, binecuvântarea aceasta se adresează fiecărui suflet în parte.",
        "Ultimul verset dezvăluie taina: „Astfel să pună Numele Meu peste fiii lui Israel, iar Eu îi voi binecuvânta”. Preoții rostesc cuvintele, dar binecuvântarea nu vine de la ei; ei pun doar Numele DOMNULUI peste popor, iar lucrarea este a lui Dumnezeu Însuși. Aceste cuvinte vechi de peste treizeci de secole au fost găsite săpate pe plăcuțe de argint din vremea lui Isaia, dovadă că poporul le purta la piept, aproape de inimă, veacuri întregi.",
      ),
      words: [
        {
          original: "יָאֵר יְהוָה פָּנָיו אֵלֶיךָ",
          transliteration: "iaer Adonai panav elecha",
          language: "ebraica",
          meaning:
            "DOMNUL să facă să lumineze Fața Lui peste tine. A avea fața cuiva luminată spre tine în ebraică înseamnă favoare și bunăvoință; a căuta fața lui Dumnezeu este dorința centrală a psalmilor de rugăciune.",
        },
      ],
      crossRefs: ["Psalmi 4:6", "Psalmi 67:1", "2 Corinteni 13:14"],
      forYourHeart:
        "Numele DOMNULUI pus peste tine nu este doar o formulă rostită; este o realitate: ești păzit, ești privit cu bunăvoință, ți se oferă pacea Lui.",
    },
  ],
  prayer:
    "Doamne, învață-mă să pun deoparte, pentru o vreme sau pentru totdeauna, orice îmi stă în calea unei închinări depline către Tine.\n\nDă-mi să nu mă tem de reînceperea consacrării, atunci când o întrerupere neașteptată îmi spurcă drumul.\n\nȚine-mă aproape de jertfa pentru păcat, chiar și în clipa în care încheia o consacrare pe care am dus-o cu credincioșie.\n\nȘi pune Numele Tău peste mine, ca DOMNUL să mă binecuvânteze și să mă păzească, să-și lumineze Fața peste mine și să-mi dea pacea Lui. Amin.",
  status: NUMERI_STATUSES[6],
})
