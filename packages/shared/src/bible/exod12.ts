import { exodChapter, teaching } from "./exodHelpers.js"

/*
 * Cartea Exod, explicată pe unități de sens.
 *
 * Textul biblic: păstrat separat în exodText.ts (fișierele exodTextN.ts).
 * Explicația: scrisă pentru Emanus după cercetarea textului. Nu se copiază
 * formularea niciunui predicator sau comentator.
 */

export const EXOD_12 = exodChapter({
  number: 12,
  title: "Exod 12 — Mielul, sângele la ușă și noaptea ieșirii",
  summary:
    "Capitolul cel mai însemnat al cărții. Înainte ca Dumnezeu să lovească Egiptul, Își adăpostește poporul, și o face printr-un miel: unul pentru fiecare casă, fără vină, jertfit în aceeași seară de toată adunarea, iar sângele pus la ușă. Cine este înăuntru, sub sânge, trăiește; nu pentru că este mai bun, ci pentru că este acoperit. Alături de miel se rânduiește sărbătoarea azimilor și scoaterea aluatului din case. La miezul nopții lovitura vine, iar Egiptul îi împinge afară. Poporul iese noaptea, în grabă, cu mâinile pline, după patru sute treizeci de ani — și cu ei ies și străini care s-au alipit. La urmă se dau rânduielile Paștelui, și între ele una pe care Ioan o va pomeni la crucea Domnului: niciun os să nu-i fie zdrobit.",
  literaryContext:
    "Aici cartea își schimbă felul de a vorbi: până acum am avut poveste — vestire, lovitură, împietrire — iar acum, deodată, avem rânduieli. Ia aminte la așezare: porunca despre miel vine înaintea lovirii, nu după. Dumnezeu nu-Și scoate poporul și apoi îl învață să se închine; îl învață să se închine înainte ca să fie scos, și tocmai închinarea aceea îl adăpostește. Capitolul ține trei firi de vorbire împreună: porunca dată lui Moise (1-20), porunca spusă bătrânilor (21-28) și împlinirea (29-42), iar la urmă o întoarcere la rânduieli (43-51), fiindcă Paștele nu a fost o întâmplare de o noapte, ci o așezământ de veacuri. Și ia seama că de două ori se pune în gura copilului o întrebare — ce înseamnă slujba aceasta — ca să se vadă că toată rânduiala a fost dată spre povestire.",
  historicalContext:
    "Luna de care se vorbește aici cade la începutul primăverii, iar Dumnezeu o face întâia lună a anului: poporul primește un alt început de vreme, fiindcă viața lui începe de acum din nou. Mielul de un an, fără vină, era ce avea de preț un păstor; iar mielul și berbecul erau închinați de unii în Egipt — deci jertfirea lui în noaptea aceea era și o despărțire curățită de închinările țării. Isopul, o iarbă măruntă și la îndemâna oricui, arată că nu era nevoie de nimic scump ca să fie pus sângele la ușă: la îndemâna săracului era. Prânzul se lua în grabă, cu haina strânsă la mijloc și cu încălțămintea în picioare, adică în chipul omului gata de drum — lucru neașteptat la o masă de sărbătoare, unde omul ședea lungit și fără grabă. Iar aluatul se scotea din case fiindcă pâinea nedospită este pâinea drumețului: se face repede și se mănâncă pe drum.",
  units: [
    {
      verses: [1, 13],
      heading: "Un miel pentru fiecare casă",
      teaching: teaching(
        "Dumnezeu începe cu vremea: luna aceasta să fie întâia lună a anului. Cine este scos din robie primește un alt început de socoteală — nu se mai numără de la ce a fost, se numără de la ce a făcut Dumnezeu. Iar ia aminte că scăparea nu vine prin luptat și nici prin fugit; vine prin ceva ce se face în casă.",
        "Mielul se ia în a zecea zi și se ține până în a patrusprezecea. Patru zile în casă, cu copiii în jur — destul ca să se vadă că nu are nicio vină, și destul ca să nu fie o jertfă grăbită, fără luare-aminte. Iar dacă o casă este prea mică pentru un miel întreg, să se adune cu vecinii: nimeni nu rămâne pe din afară pentru că este prea sărac sau prea singur.",
        "Toată adunarea îl jertfește în aceeași seară, dar sângele se pune la fiecare ușă în parte. Aici stau alături două lucruri pe care nu se cade să le despărțim: scăparea este a întregului popor și totuși trece prin ușa fiecărei case. Nu te scapă credința vecinului, nici a părinților tăi; sângele trebuia pus la ușa ta.",
        "Și vezi pentru ce se pune sângele: când îl voi vedea, voi trece pe lângă voi. Nu se spune: când voi vedea cât sunteți de buni. În noaptea aceea deosebirea dintre o casă și alta nu era purtarea oamenilor dinlăuntru, ci sângele de la ușă. Nici un evreu nu putea zice că a scăpat pentru că a fost vrednic. Aceasta ține pentru totdeauna: nu suntem primiți pentru că suntem mai buni, ci pentru că suntem acoperiți.",
        "Iar sângele nu era destul pus la ușă și nimic mai mult: mielul se și mânca, fript la foc, cu ierburi amare și cu azime. Cel jertfit pentru tine îți este și hrană; iar ierburile amare nu lasă să se uite din ce aș fost scos. Bucuria scăpării și amarul robiei se mănâncă la aceeași masă. Cine nu-și mai aduce aminte de amărăciunea din care a fost scos începe să socotească scăparea ca pe un lucru de la sine.",
      ),
      words: [
        {
          original: "שה תמים",
          transliteration: "se tamim",
          language: "ebraica",
          meaning:
            "miel desăvârșit, fără vină, întreg. Ținut patru zile în casă tocmai ca să se vadă că nu are nimic de învinuit.",
        },
        {
          original: "פסח",
          transliteration: "pesah",
          language: "ebraica",
          meaning:
            "trecere pe lângă, cruțare. De aici și numele sărbătorii: Domnul trece pe lângă casa însemnată cu sânge.",
        },
        {
          original: "מררים",
          transliteration: "merorim",
          language: "ebraica",
          meaning:
            "ierburi amare. Se mănâncă la aceeași masă cu mielul: nu se uită din ce ai fost scos.",
        },
      ],
      crossRefs: ["Ioan 1:29", "1 Corinteni 5:7", "1 Petru 1:18-19", "Evrei 9:22", "Apocalipsa 5:9"],
      forYourHeart:
        "În noaptea aceea, deosebirea dintre case nu era purtarea celor dinlăuntru, ci sângele de la ușă. Nu ești primit pentru că ești mai bun, ci pentru că ești acoperit.",
    },
    {
      verses: [14, 20],
      heading: "Aluatul scos din case",
      teaching: teaching(
        "Alături de miel se rânduiește o săptămână de azime, și întâia poruncă este să fie scos aluatul din case. Ia aminte că nu se spune să fie mai puțin, ci să nu mai fie. Scăparea nu se încheie în noaptea în care ai fost cruțat; urmează curățirea casei. Cine socotește că poate lua Mielul și ține și aluatul nu a înțeles pentru ce a fost scos din Egipt.",
        "Aluatul este mic și nu se vede, dar dospește tot în tăcere; de aceea Învățătura noastră îl ia mai târziu drept chip al păcatului ascuns și al fățărniciei. Nu ne primește un păcat mare dintr-o dată; ne prinde ceva mic pe care nu l-am scos afară din casă la vreme.",
        "Și se cade să vedem că sărbătoarea este dată spre aducere-aminte, din veac în veac. Dumnezeu știe că uităm; de aceea a legat cea mai mare lucrare a Lui de o masă pe care o iau și copiii. Și astăzi Domnul ne-a lăsat o masă, tot cu pâine, tot spre aducere-aminte.",
      ),
      words: [
        {
          original: "מצות",
          transliteration: "mațot",
          language: "ebraica",
          meaning:
            "azime, pâine nedospită. Este pâinea drumețului: se face repede și se mănâncă pe drum.",
        },
        {
          original: "שאר",
          transliteration: "seor",
          language: "ebraica",
          meaning:
            "aluat dospit. Puțin și nevăzut, dar dospește toată plămădeala — chip al păcatului ascuns.",
        },
      ],
      crossRefs: ["1 Corinteni 5:6-8", "Luca 12:1", "Matei 16:6", "Luca 22:19", "Deuteronom 16:3"],
      forYourHeart:
        "Nu ne prinde un păcat mare dintr-o dată, ci ceva mic pe care nu l-am scos din casă la vreme. Ce stă în casa ta și știi că trebuie scos afară?",
    },
    {
      verses: [21, 28],
      heading: "„Ce înseamnă slujba aceasta?”",
      teaching: teaching(
        "Moise nu ține porunca pentru sine: cheamă pe bătrâni și le spune ce să facă. Iar uneltele sunt de nimic: un mănunchi de isop și un vas cu sânge. Dumnezeu nu a cerut nimic scump, ca să nu fie nici o casă săracă lăsată pe din afară.",
        "Și vine porunca cea mai greu de ținut pentru un om speriat: nimeni să nu iasă din casă până dimineață. Adăpostul era înlăuntru, sub sânge. Nu era vremea să alergi, să vezi, să îndrepți; era vremea să stai unde te-a pus Dumnezeu și să crezi ce a spus. Uneori credința se arată în rămas, nu în făcut.",
        "Apoi Dumnezeu se gândește la copii înainte ca ei să fie născuți: când vă vor întreba copiii voștri ce înseamnă slujba aceasta, să le spuneți. Vezi ce nădejde așează aici: că se va naște un neam care să întrebe. Și vezi ce așteaptă de la părinți: nu să-i creadă pe copii prea mici, ci să le spună. Un obicei fără povestire se pierde într-o generație.",
        "Iar poporul s-a plecat și s-a închinat, apoi s-a dus și a făcut. Aceasta este rânduiala credinței: întâi plecarea, apoi facerea. Nu au înțeles noaptea aceea mai bine decât o înțelegem noi; au ascultat, și au fost cruțați.",
      ),
      words: [
        {
          original: "אזוב",
          transliteration: "ezov",
          language: "ebraica",
          meaning:
            "isop, iarbă măruntă și la îndemâna oricui. Dumnezeu n-a cerut nimic scump pentru punerea sângelui.",
        },
        {
          original: "ופסח יהוה",
          transliteration: "ufasah YHWH",
          language: "ebraica",
          meaning:
            "și Domnul va trece pe lângă. Cruțarea nu este uitare din partea Lui; este trecere văzând semnul.",
        },
      ],
      crossRefs: ["Exod 10:2", "Exod 13:8", "Deuteronom 6:20-21", "Iosua 4:21-22", "Evrei 11:28"],
      forYourHeart:
        "În noaptea aceea credința se arăta în rămas în casă, nu în alergat afară. Uneori ascultarea înseamnă să stai unde te-a pus Dumnezeu până se face dimineață.",
    },
    {
      verses: [29, 36],
      heading: "Miezul nopții, și o țară care îi împinge afară",
      teaching: teaching(
        "Se împlinesc cuvintele vestite, la ceasul vestit. Cine a citit capitolul de dinainte nu află nimic nou aici — și tocmai asta se cade luat aminte: Dumnezeu face ce a spus. Iar țipatul din țară este acum țipatul Egiptului; în cartea aceasta a strigat întâi poporul asuprit, și Dumnezeu a auzit.",
        "Faraon cheamă noaptea, nu dimineața, și spune tot ce nu voise să spună la nouă lovituri: plecați, cu copii și cu vite, și binecuvântați-mă și pe mine. Ia aminte că acum dă tot ce se târguise să țină. Cine se împotrivește lui Dumnezeu până la capăt nu ajunge să dea mai puțin; ajunge să dea tot, dar mai târziu și cu pierdere.",
        "Iar egiptenii îi zoreau să plece. Cel care nu-i lăsa să iasă acum îi împinge afară. Dumnezeu nu are nevoie să înmoaie inima vrăjmașului ca să-Și împlineăscă lucrarea; în ceasul Său, chiar împotrivirea lucrează spre ieșirea alor Săi.",
        "Și au ieșit cu lucruri de argint și de aur — plata pentru veacuri de muncă fără simbrie. Dumnezeu nu-Și scoate copiii goi și rușinați din casa robiei. Iar ceea ce li s-a dat în noaptea aceea va fi mai târziu și argintul cortului în care va locui El în mijlocul lor — dar, spre amărăciune, și aurul vițelului turnat. Același dar poate fi adus la Dumnezeu sau întors îmtr-un idol; deosebirea nu stă în dar, ci în inimă.",
      ),
      words: [
        {
          original: "צעקה גדלה",
          transliteration: "țeaka gdola",
          language: "ebraica",
          meaning:
            "un țipat mare. Același cuvânt care fusese folosit despre strigătul poporului asuprit; acum strigă Egiptul.",
        },
        {
          original: "וינצלו",
          transliteration: "vainaațlu",
          language: "ebraica",
          meaning:
            "au scăpat, au luat ca scăpare de la egipteni. Nu jaf: plată întârziată pentru veacuri de muncă fără simbrie.",
        },
      ],
      crossRefs: ["Exod 2:23", "Exod 11:4-6", "Exod 3:21-22", "Exod 35:22", "Exod 32:2-4"],
      forYourHeart:
        "Faraon a dat la urmă tot ce se târguise să țină. Împotrivirea nu te scapă să dai mai puțin; te face să dai tot, mai târziu și cu pierdere.",
    },
    {
      verses: [37, 42],
      heading: "Patru sute treizeci de ani, și o noapte de veghe",
      teaching: teaching(
        "Au ieșit mulți — și cu ei o mulțime amestecată, adică oameni care nu erau din neamul lor. Ia aminte la asta: din noaptea întâi, scăparea lui Dumnezeu a fost mai largă decât un neam. Cine s-a alipit și a intrat sub sânge a ieșit împreună cu ei.",
        "Iar pâinea lor a fost nedospită, fiindcă au fost zoriți și n-a avut vreme să dospească. Așa se împlinise porunca înainte ca ei să știe de ce: Dumnezeu le ceruse ceva ce noaptea aceea avea să facă oricum de nevoie. Poruncile Lui nu sunt sarcini fără rost; de multe ori sunt înainte-știința Lui despre ce vom avea nevoie.",
        "Se pomenește și măsura vremii: patru sute treizeci de ani. Este mult, și nu se cade să trecem repede peste asta. Cei mai mulți din cei care au strigat la început n-au văzut noaptea aceasta. Dumnezeu Își ține cuvântul, dar nu în răbdarea noastră; îl ține în a Lui. Iar împlinirea a venit întocmai în ziua hotărâtă.",
        "Iar noaptea aceea se numește noapte de veghe a Domnului. Se cade să fie citit în două chipuri: El a vegheat peste ei atunci, și ei vor veghea înaintea Lui în toți anii care vin. Aducerea-aminte nu este numai a noastră: mai întâi El nu a dormit în noaptea în care noi eram în primejdie.",
      ),
      words: [
        {
          original: "ערב רב",
          transliteration: "erev rav",
          language: "ebraica",
          meaning:
            "mulțime amestecată. Oameni care nu erau din neam au ieșit împreună cu poporul: scăparea a fost mai largă decât o rudă.",
        },
        {
          original: "ליל שמרים",
          transliteration: "leil șimurim",
          language: "ebraica",
          meaning:
            "noapte de veghe, de păzire. El a vegheat peste ei atunci; ei vor veghea înaintea Lui în anii care vin.",
        },
      ],
      crossRefs: ["Geneza 15:13-14", "Exod 12:48-49", "Galateni 3:17", "Psalmi 121:4", "Numeri 11:4"],
      forYourHeart:
        "Mulți din cei care au strigat întâi n-au văzut noaptea ieșirii. Dumnezeu Își ține cuvântul în răbdarea Lui, nu în a noastră — și îl ține întocmai.",
    },
    {
      verses: [43, 51],
      heading: "Rânduiala mesei: străinul primit și osul nezdrobit",
      teaching: teaching(
        "La urmă vin rânduieli despre cine poate mânca. Și aici stă alături ceva care pare potrivnic: masa este închisă — nu mănâncă oricine — și totuși este deschisă oricui vrea să intre cu adevărat: străinul care se alipește și primește semnul legământului este ca cel născut în țară, și pentru el este o singură lege. Dumnezeu nu are două măsuri, una pentru ai Lui de mult și alta pentru cei veniți de curand.",
        "Iar mielul nu se scotea din casă, și nici nu se împărțea pe afară: se mânca acolo, într-un singur loc, de o casă întreagă. Se învață de aici că scăparea nu se ține singură, în ascuns; se ține împreună, între ai tăi.",
        "Și vine o poruncă măruntă la vedere, care va ajunge cea mai grea de purtat în gând: să nu i se zdrobească niciun os. Un miel jertfit, dar neatins în oase. Cine citește la Ioan cum s-au frant fluierele picioarelor celor răstigniți, iar ale Domnului nu, vede de ce a fost pusă aici porunca aceasta încă în Egipt. Dumnezeu a scris chipul împăcării înainte de vreme, în amănunte pe care nimeni nu le înțelegea atunci.",
        "Și se încheie așa cum s-a încheiat fiecare parte a capitolului: au făcut întocmai cum poruncise Domnul. Ieșirea nu s-a făcut prin răscoală, nici prin istețime, ci prin ascultare de un cuvânt pe care nu-l puteau cerceta. Și în aceeași zi, Domnul i-a scos afară.",
      ),
      words: [
        {
          original: "תורה אחת",
          transliteration: "tora ahat",
          language: "ebraica",
          meaning:
            "o singură lege — pentru cel născut în țară și pentru străinul alipit. Dumnezeu nu are două măsuri.",
        },
        {
          original: "ועצם לא תשברו בו",
          transliteration: "veețem lo tișberu vo",
          language: "ebraica",
          meaning:
            "și să nu-i zdrobiți niciun os. Amănunt fără pricină vădită atunci; Ioan îl va pomeni la crucea Domnului.",
        },
      ],
      crossRefs: ["Ioan 19:33", "Ioan 19:36", "Numeri 9:12", "Psalmi 34:20", "Efeseni 2:12-13", "Isaia 56:6-7"],
      forYourHeart:
        "Străinul alipit mânca la aceeași masă, sub aceeași lege. Dacă te socotești venit târziu și din afară, ia aminte: Dumnezeu nu are o masă mai săracă pentru tine.",
    },
  ],
  prayer:
    "Doamne, Tu ai adăpostit întâi și ai lovit după aceea; și n-ai cerut nimic scump ca să fim cruțați — numai sânge la ușă și ascultare în casă.\n\nMulțumim pentru Mielul fără vină, În care ne-ai cruțat.\n\nScoate aluatul din casele noastre, și nu ne lăsa să credem că stăm în picioare pentru că suntem mai buni decât alții.\n\nDă-ne să povestim copiilor noștri ce ai făcut, iar celor veniți de departe să le facem loc la aceeași masă. Amin.",
})
