export * from "./types.js"

import type { BibleBook, BibleChapter, BibleUnit } from "./types.js"
import { GENEZA as GENEZA_BASE } from "./geneza.js"
import { GENEZA_2 } from "./geneza2.js"
import { GENEZA_3 } from "./geneza3.js"
import { GENEZA_4 } from "./geneza4.js"
import { GENEZA_5 } from "./geneza5.js"
import { GENEZA_6 } from "./geneza6.js"
import { GENEZA_7 } from "./geneza7.js"
import { GENEZA_8 } from "./geneza8.js"
import { GENEZA_9 } from "./geneza9.js"
import { GENEZA_10 } from "./geneza10.js"
import { GENEZA_11 } from "./geneza11.js"
import { GENEZA_12 } from "./geneza12.js"
import { GENEZA_13 } from "./geneza13.js"
import { GENEZA_14 } from "./geneza14.js"
import { GENEZA_15 } from "./geneza15.js"
import { GENEZA_16 } from "./geneza16.js"
import { GENEZA_17 } from "./geneza17.js"
import { GENEZA_18 } from "./geneza18.js"
import { GENEZA_19 } from "./geneza19.js"
import { GENEZA_20 } from "./geneza20.js"
import { GENEZA_21 } from "./geneza21.js"
import { GENEZA_22 } from "./geneza22.js"
import { GENEZA_23 } from "./geneza23.js"
import { GENEZA_24 } from "./geneza24.js"
import { GENEZA_25 } from "./geneza25.js"
import { GENEZA_26 } from "./geneza26.js"
import { GENEZA_27 } from "./geneza27.js"
import { GENEZA_28 } from "./geneza28.js"
import { GENEZA_29 } from "./geneza29.js"
import { GENEZA_30 } from "./geneza30.js"
import { GENEZA_31 } from "./geneza31.js"
import { GENEZA_32 } from "./geneza32.js"
import { GENEZA_33 } from "./geneza33.js"
import { GENEZA_34 } from "./geneza34.js"
import { GENEZA_35 } from "./geneza35.js"
import { GENEZA_36 } from "./geneza36.js"
import { GENEZA_37 } from "./geneza37.js"
import { GENEZA_38 } from "./geneza38.js"
import { GENEZA_39 } from "./geneza39.js"
import { GENEZA_40 } from "./geneza40.js"
import { GENEZA_41 } from "./geneza41.js"
import { GENEZA_42 } from "./geneza42.js"
import { GENEZA_43 } from "./geneza43.js"
import { GENEZA_44 } from "./geneza44.js"
import { GENEZA_45 } from "./geneza45.js"
import { GENEZA_46 } from "./geneza46.js"
import { GENEZA_47 } from "./geneza47.js"
import { GENEZA_48 } from "./geneza48.js"
import { GENEZA_49 } from "./geneza49.js"
import { GENEZA_50 } from "./geneza50.js"
import { EXOD } from "./exod.js"
import { LEVITIC } from "./levitic.js"
import { NUMERI } from "./numeri.js"
import { DEUTERONOM } from "./deuteronom.js"
import { IOSUA } from "./iosua.js"
import { RUT } from "./rut.js"
import { SAMUEL1 } from "./samuel1.js"
import { SAMUEL2 } from "./samuel2.js"

const GENEZA_LEGACY_EXPLANATION_SOURCE =
  "Emanus legacy synthesis — Allen/Nolan editorial flow + biblical text/cross-references"
const GENEZA_24_REVIEW_SOURCE =
  "Emanus canonical exegesis — Geneza 24 + WLC/biblical cross-references; Allen/Nolan editorial flow"
const HEBREW_WORD_SOURCE = "WLC-OSHB"

type GenezaUnitCorrection = {
  teaching: string
  forYourHeart?: string
}

const GENEZA_24_CORRECTIONS: Record<string, GenezaUnitCorrection> = {
  "geneza-24-1-9": {
    teaching:
      "Ia aminte cum incepe: DOMNUL il binecuvantase pe Avraam in toate. Si totusi batranul nu traieste ca si cum binecuvantarea ar insemna sa nu mai poarte raspundere pentru viitorul casei lui. Il cheama pe slujitorul cel mai batran, cel care administra tot ce avea, si ii incredinteaza o misiune care priveste direct continuarea fagaduintei prin Isaac.\n\nNumele slujitorului nu este dat in capitol. Multi il identifica cu Eliezer din Geneza 15:2, dar textul nu face identificarea, iar noi nu trebuie s-o transformam in fapt. Tocmai lipsa numelui a facut ca predicatorii crestini sa vada uneori in el o imagine frumoasa a slujitorului care nu se pune pe sine in centru. Asemanarea cu lucrarea Duhului Sfant poate sluji omiletic, dar naratorul nu spune ca slujitorul «este» Duhul Sfant.\n\nJuramantul cu mana sub coapsa este un gest solemn care apare din nou in Geneza 47:29. Exacta lui simbolistica este discutata; nu il numim «cel mai greu juramant» si nu pretindem mai mult decat ne da textul: Avraam cere un angajament solemn inaintea DOMNULUI.\n\nPrima limita este limpede: Isaac sa nu ia sotie dintre canaanitele in mijlocul carora locuieste Avraam. Avraam nu explica aici motivul printr-un discurs despre religia lor, deci nu punem in gura lui ce nu spune. Dar contextul canonic ulterior al legamantului arata ca problema casatoriilor cu popoarele Canaanului este legata de abaterea spre alti dumnezei, nu de o doctrina a puritatii rasiale. Rahav si Rut vor arata tocmai ca o femeie din afara poate intra prin credinta in poporul lui Dumnezeu.\n\nA doua limita este si mai repetata: Isaac sa nu fie dus inapoi in tara din care Avraam iesise. Chiar daca femeia refuza sa vina, slujitorul este dezlegat de juramant; Isaac nu trebuie readus acolo. Avraam tine mai tare de cuvantul lui Dumnezeu despre tara decat de dorinta fireasca de a rezolva casatoria cu orice pret.\n\nApoi vine increderea lui: DOMNUL, care l-a scos si i-a jurat fagaduinta tarii, va trimite ingerul Sau inaintea slujitorului. Credinta lui Avraam nu este optimism vag; argumentul lui este istoria fidelitatii lui Dumnezeu: Cel care m-a chemat si mi-a fagaduit va merge si inaintea acestei misiuni.\n\nSi observa libertatea femeii chiar in formularea juramantului: «daca femeia nu va vrea sa te urmeze». Capitolul nu descrie luarea unei femei cu forta. Mai tarziu, Rebeca va fi chemata si intrebata direct daca vrea sa plece.",
    forYourHeart:
      "Nu rezolva un lucru bun calcand peste o limita pe care Dumnezeu ti-a facut-o limpede. Credinta nu spune doar «Dumnezeu va purta de grija», ci si «nu ma intorc pe drumul din care El m-a scos»."
  },
  "geneza-24-10-14": {
    teaching:
      "Slujitorul ia zece camile, daruri si porneste spre cetatea lui Nahor. Face drumul, ajunge la fantana la vremea cand femeile ies sa scoata apa si apoi se roaga. Rugaciunea nu inlocuieste pasii pe care ii avea de facut, iar pasii nu inlocuiesc rugaciunea.\n\nEl spune: «DOMNUL, Dumnezeul stapanului meu Avraam». Nu numim aceasta o «mica lipsa» de credinta, ca si cum omul L-ar cunoaste numai prin religia altuia. Chiar in aceasta scena el se roaga direct DOMNULUI, cere indurare, iar mai tarziu se pleaca si se inchina. Formula identifica Dumnezeul legamantului cu Avraam si misiunea in care slujitorul se afla; textul nu o critica.\n\nSemnul cerut este foarte concret: fata care nu numai ca ii da lui de baut, ci se ofera sa adape si camilele, sa fie cea randuita pentru Isaac. Este o cerere extraordinara in aceasta povestire, nu o metoda biblica universala pentru alegerea sotului sau sotiei. Nu invatam din Geneza 24 sa-I stabilim lui Dumnezeu parole arbitrare — «daca face exact X, atunci acesta este omul».\n\nIn acelasi timp, semnul cerut nu este gol de continut moral. Raspunsul asteptat ar scoate la lumina disponibilitate, generozitate si harnicie fata de un strain si animalele lui. Textul nu ne spune cate galeti, cati litri sau cate ore ar fi trebuit pentru cele zece camile; nu avem nevoie sa umflam cifrele. Este suficient ce spune naratiunea: Rebeca alearga din nou la fantana si scoate apa pana cand toate camilele termina de baut.\n\n«Pe care ai randuit-o Tu» arata convingerea slujitorului ca aceasta casatorie nu trebuie construita numai prin calcul omenesc. El cere ca providenta lui Dumnezeu sa confirme drumul. Dar chiar el nu transforma primul indiciu intr-un verdict instantaneu: in versetul 21 o priveste in tacere ca sa vada daca DOMNUL ii facuse sau nu calatoria sa izbuteasca.",
    forYourHeart:
      "Roaga-te pentru calauzire, dar nu transforma rugaciunea intr-un joc de semne arbitrare. Cauta caracter, asculta Scriptura si lasa providenta lui Dumnezeu sa se confirme fara sa fortezi rezultatul."
  },
  "geneza-24-15-21": {
    teaching:
      "«Nu sfarsise el inca de vorbit» si Rebeca apare cu vadra pe umar. Naratiunea vrea sa simtim viteza raspunsului. Isaia 65:24 va folosi o formulare asemanatoare despre Dumnezeu care raspunde inainte ca poporul Sau sa termine de vorbit; este o trimitere canonica frumoasa, dar nu o promisiune ca fiecare rugaciune credincioasa va primi un raspuns vizibil inainte de ultimul cuvant.\n\nRebeca este chiar din familia cautata, dar slujitorul nu stie aceasta cand alearga sa-i ceara apa. Inainte sa afle genealogia, vede purtarea ei.\n\nEa nu face lucrul incet sau cu sila: textul repeta graba si alergarea. Ii da strainului sa bea si apoi, din proprie initiativa, se ofera sa scoata apa pentru toate camilele pana cand vor termina de baut. Nu stim volumul exact de apa si nu cronometram munca ei; stim ce vrea naratorul sa vedem — disponibilitatea de a continua pana la capat un serviciu greu pe care nu i-l ceruse nimeni.\n\nNu spunem nici ca «nimeni nu o vedea». Slujitorul o privea, oamenii lui erau in calatorie cu el, iar scena se petrecea la locul unde femeile veneau dupa apa. Aplicatia mai exacta este aceasta: Rebeca nu stia ca tocmai felul in care raspundea unei cereri obisnuite va deveni parte dintr-o schimbare uriasa a vietii ei. Caracterul se arata inainte ca omul sa stie ce usa poate deschide acea zi.\n\nSlujitorul, la randul lui, nu se grabeste sa proclame minunea. O priveste in tacere «ca sa vada daca DOMNUL facuse sa-i izbuteasca sau nu calatoria». Credinta lui nu exclude verificarea. Tocmai dupa o rugaciune cu un semn foarte precis, omul ramane atent la fapte pana cand tabloul se lamureste.",
    forYourHeart:
      "Nu stii ce zi obisnuita va scoate la lumina caracterul tau. Fa lucrul mic cu toata inima — si, cand crezi ca ai primit o calauzire, nu te teme sa o verifici in tacere inainte s-o proclami."
  },
  "geneza-24-22-27": {
    teaching:
      "Dupa ce camilele au terminat de baut, slujitorul ii da Rebecai podoabele si intreaba a cui fiica este si daca exista loc de gazduit. Abia atunci afla ca a ajuns chiar in ramura familiei lui Nahor si Milca. Purtarea pe care o vazuse si genealogia pe care o cauta se intalnesc in acelasi om.\n\nRebeca nu ofera numai gazduire, ci spune ca exista paie si nutret din belsug. Grija ei pentru camile continua, iar slujitorul primeste inca o confirmare ca a ajuns unde trebuia.\n\nReactia lui este imediata: isi pleaca capul si se inchina DOMNULUI. Multumirea nu este amanata pana la intoarcerea in Canaan. Cand omul vede clar o purtare de grija, este sanatos sa se opreasca si sa-L binecuvanteze pe Dumnezeu chiar acolo.\n\nEl Il lauda pe DOMNUL care nu Si-a parasit «hesed» si «emet» fata de Avraam. Hesed vorbeste despre bunatate loiala, iar emet despre adevar, stabilitate si credinciosie. Perechea devine importanta in limbajul Vechiului Testament. Ioan 1:14 spune despre Hristos ca este plin de «har si adevar»; crestinul poate auzi o rezonanta canonica intre aceste teme, dar nu pretindem ca expresia greceasca din Ioan este o traducere lexicala simpla si obligatorie a perechii din Geneza 24.\n\nApoi vine marturisirea: «DOMNUL m-a calauzit pe drum». Aici este una dintre cele mai frumoase lectii ale capitolului. Slujitorul nu primise de la inceput numele fetei, adresa casei si desfasurarea fiecarei ore. A pornit pe baza juramantului si a increderii lui Avraam, s-a rugat pe drum si acum, privind inapoi la pasii facuti, recunoaste calauzirea.\n\nNu facem din aceasta o lege absoluta ca Dumnezeu «aproape intotdeauna» calauzeste numai dupa ce pornesti. Uneori Scriptura spune sa astepti; alteori spune sa mergi. Lectia acestui capitol este mai precisa: cand Dumnezeu ti-a facut deja datoria limpede, nu cere sa vezi fiecare pas viitor inainte sa faci primul pas de ascultare.",
    forYourHeart:
      "Calauzirea nu inseamna sa stii tot drumul dinainte. Cand datoria de azi este limpede, fa pasul de azi; iar cand vezi mana lui Dumnezeu, opreste-te si multumeste-I."
  },
  "geneza-24-28-33": {
    teaching:
      "Rebeca alearga acasa, iar Laban alearga la fantana dupa ce textul spune ca vazuse veriga si bratarile si auzise relatarea surorii sale. Detaliul este deliberat, dar nu ne autorizeaza sa spunem ca aurul a fost singurul lui motiv. Naratorul ne spune ce a vazut; motivatia completa a inimii lui nu este expusa.\n\nTotusi, cititorul care il va intalni pe Laban in capitolele despre Iacov are motive sa tina minte acest prim detaliu. Mai tarziu chiar fiicele lui vor spune ca tatal lor le-a tratat ca pe niste straine si «ne-a vandut», iar Iacov va spune ca Laban i-a schimbat plata de multe ori. Este legitim sa vedem un tipar al interesului material, dar nu este legitim sa transformam fiecare cuvant ospitalier al lui Laban in prefacatorie demonstrata.\n\nSlujitorului i se ofera mancare, dar el spune: «nu mananc pana nu voi spune ce am de spus». Aici explicatia poate ramane taioasa: omul pune misiunea stapanului inaintea confortului imediat. Legatura cu Ioan 4 — «mancarea Mea este sa fac voia Celui ce M-a trimis» — este o aplicatie canonica potrivita, nu o afirmatie ca slujitorul ar fi fost un tip profetic explicit al lui Hristos.\n\nNu stim exact cat de obosit era, cati kilometri facuse in acea zi sau daca el insusi scosese apa. Nu avem nevoie de asemenea decor inventat. Masa este in fata lui si el refuza sa se aseze pana nu isi implineste mai intai sarcina cu care venise.\n\nNici nu spunem ca «a cerut voie ca sa nu strice cinstea gazdelor». Textul ne da pur si simplu hotararea lui: mai intai mesajul, apoi mancarea. Aceasta este destul pentru cercetare.",
    forYourHeart:
      "Poti vorbi despre Dumnezeu si totusi sa iubesti aurul; poti fi obosit si totusi sa pui ascultarea inaintea confortului. Care dintre cele doua linii se vede mai limpede in tine?"
  },
  "geneza-24-34-49": {
    teaching:
      "Slujitorul isi incepe discursul cu identitatea care conteaza pentru misiune: «eu sunt robul lui Avraam». Apoi povesteste binecuvantarea stapanului, nasterea lui Isaac, juramantul, drumul, rugaciunea si intalnirea cu Rebeca.\n\nO mare parte a capitolului este astfel repovestita, dar nu «aproape cuvant cu cuvant» in fiecare amanunt. Naratorul ne lasa chiar sa vedem o diferenta interesanta: in relatarea initiala, versetele 22–23 pun podoabele inaintea intrebarii despre familie; in discursul din versetul 47, slujitorul spune ca a intrebat a cui fiica este si apoi i-a pus podoabele. Aceasta nu este o problema care trebuie ascunsa, ci felul firesc in care o relatare poate reordona amanuntele fara sa schimbe substanta evenimentului.\n\nDe aceea renuntam la predica «nu schimba nimic, nu infrumuseteaza nimic». Textul insusi nu sustine o asemenea afirmatie. Lucrul impresionant este altul: in orice ordine povesteste amanuntele, slujitorul pune providenta DOMNULUI in centru si isi expune deschis mandatul. Familia poate intelege ce i-a cerut Avraam, ce s-a rugat slujitorul si ce s-a intamplat la fantana.\n\nEl mai adauga un amanunt pe care naratiunea anterioara nu-l rostise explicit: rugaciunea fusese «in inima mea». Dumnezeu nu are nevoie ca o rugaciune sa fie auzita de oamenii din jur ca s-o auda El. Ana va sta mai tarziu inaintea DOMNULUI miscandu-si buzele fara glas, iar Dumnezeu ii va cunoaste cererea.\n\nLa sfarsit slujitorul nu manipuleaza familia printr-o poveste misterioasa. Cere raspuns limpede: daca vor sa arate bunatate si credinciosie, sa spuna; daca nu, sa spuna si aceasta, pentru ca el sa stie incotro sa se indrepte.\n\nEste o lectie buna pentru orice lucrare facuta in Numele lui Dumnezeu: providenta nu are nevoie de exagerarea marturiei. Spune ce s-a intamplat, recunoaste mana lui Dumnezeu si nu falsifica amanuntele ca sa fortezi un «da»."
    ,forYourHeart:
      "Nu infrumuseta marturia ca sa-L faci pe Dumnezeu sa para mai convingator. Adevarul spus limpede este suficient pentru Dumnezeul care a lucrat cu adevarat."
  },
  "geneza-24-50-61": {
    teaching:
      "Laban si Betuel raspund: «de la DOMNUL vine lucrul acesta; noi nu-ti putem spune nici rau, nici bine». Ei recunosc in desfasurarea povestita o providenta pe care nu vor s-o contrazica, iar slujitorul se inchina din nou.\n\nDupa daruri, masa si noapte, slujitorul vrea sa plece imediat. Familia cere ca fata sa mai ramana «zile sau zece» — formularea ebraica permite intelegerea unei scurte perioade, posibil zece zile. Nu trebuie sa dramatizam cu o distanta exacta de o mie de kilometri si nici sa afirmam ca familia stia ca Rebeca «nu se va mai intoarce niciodata». Despartirea era mare chiar fara aceste adaosuri.\n\nApoi vine un detaliu care trebuie pastrat cu toata greutatea lui: o cheama pe Rebeca si o intreaba «vrei sa te duci cu omul acesta?» Iar ea raspunde: «ma voi duce». Capitolul, care spusese deja in versetul 8 ca femeia putea sa nu vrea sa urmeze slujitorul, consemneaza acum consimtamantul ei explicit. Nu avem nevoie de afirmatia antropologica larga ca «in lumea aceea fetele se dadeau, nu se intrebau» ca sa vedem ce face textul aici.\n\nHotararea Rebecai cere credinta si curaj: pleaca din casa ei cu un slujitor spre un barbat pe care nu-l intalnise. Exista o paralela frumoasa cu Avraam, care fusese chemat sa plece din tara si din casa rudeniei lui. Dar nu o numim «a doua persoana din Geneza care pleaca pe baza unui cuvant»; cartea are si alte plecari, iar numerotarea omiletica nu ne ajuta.\n\nBinecuvantarea familiei este insa remarcabil de apropiata de fagaduinta de la Moria: mii de zeci de mii si samanta care stapaneste poarta vrajmasilor. Fie ca rudele intelegeau sau nu intreaga greutate a acestor cuvinte, naratorul le aseaza astfel incat cititorul sa auda ecoul lui Geneza 22:17. Rebeca intra in familia prin care fagaduinta va merge mai departe.\n\nNu transformam insistenta slujitorului de a pleca imediat intr-o porunca universala de a refuza orice «zece zile» cand cineva crede ca Dumnezeu l-a calauzit. In aceasta poveste, drumul lui trebuie dus la capat; in viata noastra, graba trebuie judecata tot prin Scriptura, intelepciune si caracter, nu prin imitarea mecanica a unei scene.",
    forYourHeart:
      "Cand Dumnezeu iti face chemarea limpede, raspunde cu libertate si credinta — dar nu confunda presiunea omeneasca sau graba ta cu vocea Lui."
  },
  "geneza-24-62-67": {
    teaching:
      "Isaac se afla in Negev, in regiunea Beer-Lahai-Roi, fantana legata de intalnirea Agarei cu Dumnezeul care vede. Geneza 25:11 va spune mai tarziu ca Isaac a locuit langa Beer-Lahai-Roi. Este o legatura literara frumoasa, dar textul nu ne spune ca Isaac isi alesese locuinta acolo tocmai fiindca stia istoria Agarei.\n\nVersetul 63 foloseste un verb ebraic rar, lasuach, al carui sens este discutat. Traditia il reda adesea «a medita», iar alte propuneri sunt «a se plimba», «a se ruga» sau chiar «a se tangui». De aceea nu construim o doctrina pe certitudinea ca Isaac era atunci in rugaciune sau in doliu. Stim sigur numai ca iesise singur pe camp spre seara si atunci a ridicat ochii si a vazut camilele.\n\nContextul ne spune ca pierderea Sarei il apasa inca, pentru ca ultimul verset spune ca prin Rebeca Isaac a fost mangaiat dupa moartea mamei lui. Din datele Genezei rezulta ca trecusera aproximativ trei ani: Sara moare la 127 de ani, Isaac avea 37, iar Geneza 25:20 spune ca Isaac avea 40 cand a luat-o pe Rebeca. Durerea nu este prezentata ca ceva ce trebuia «sa depaseasca» repede.\n\nRebeca il vede, intreaba cine este, iar cand afla ca este stapanul slujitorului isi ia valul si se acopera. Gestul tine de intalnirea lor si de cutuma de modestie, dar naratorul nu explica valul ca pe un «semn universal al miresei» si nu construim de aici o regula vestimentara pentru nunti.\n\nSlujitorul ii povesteste lui Isaac «toate lucrurile pe care le facuse». Aceasta inchide misiunea printr-o dare de seama. Nu stim daca repeta pentru a treia oara fiecare amanunt al fantanii; stim ca nu pastreaza pentru sine povestea calauzirii.\n\nApoi vin cuvintele simple: Isaac o ia pe Rebeca, ea devine sotia lui si el o iubeste. Este prima afirmatie explicita din Geneza ca un sot isi iubeste sotia, iar despre Isaac nu este consemnata o alta sotie sau concubina. Este o casnicie care, spre deosebire de multe altele din istoria patriarhilor, ramane in naratiune intre un singur barbat si o singura femeie.\n\nOrdinea «a luat-o / a fost sotia lui / a iubit-o» ne permite sa observam ca dragostea este marturisita in interiorul casatoriei lor. Nu o transformam insa intr-o regula potrivit careia dragostea romantica trebuie sa apara numai dupa casatorie. Textul descrie povestea lor; nu emite aici o lege universala despre ordinea sentimentelor.\n\nSi ultimul rand este bland: Isaac este mangaiat dupa mama lui. Rebeca nu o inlocuieste pe Sara, iar casatoria nu este un tratament magic pentru doliu. Totusi, Dumnezeu lucreaza in poveste astfel incat, dupa pierdere, in viata lui Isaac intra o relatie reala de iubire si mangaiere.",
    forYourHeart:
      "Nu forta un «semn» si nu transforma fiecare coincidenta intr-o voce. Cauta o calauzire care poate fi spusa in lumina adevarului, verificata prin caracter si primita fara constrangere."
  }
}

const GENEZA_24_HISTORICAL_CONTEXT =
  "Juramantul cu mana sub coapsa este un gest solemn atestat in Geneza 24 si din nou in Geneza 47; simbolismul lui exact este discutat, de aceea nu il prezentam drept o formula al carei sens istoric ar fi sigur. Casatoria este negociata in cadrul familiei: Laban si Betuel raspund impreuna in versetul 50, iar mai tarziu fratele si mama cer o amanare; Rebeca insasi este chemata si intrebata daca vrea sa plece. Cele zece camile si darurile arata resursele casei lui Avraam, iar adapatul lor cere o munca reala, dar textul nu da litri, galeti sau durata. La final, Rebeca se acopera cu valul dupa ce afla cine este Isaac; gestul apartine cutumei si modestiei scenei, fara ca naratorul sa-i ofere o explicatie rituala universala."

function normalizeGenezaUnit(unit: BibleUnit, chapterNumber: number): BibleUnit {
  const correction = chapterNumber === 24 ? GENEZA_24_CORRECTIONS[unit.id] : undefined
  return {
    ...unit,
    teaching: correction?.teaching ?? unit.teaching,
    forYourHeart: correction?.forYourHeart ?? unit.forYourHeart,
    explanationKind: unit.explanationKind ?? "exposition",
    explanationSource:
      unit.explanationSource ??
      (chapterNumber === 24 ? GENEZA_24_REVIEW_SOURCE : GENEZA_LEGACY_EXPLANATION_SOURCE),
    wordSource:
      unit.words && unit.words.length > 0
        ? unit.wordSource ?? HEBREW_WORD_SOURCE
        : unit.wordSource,
  }
}

function normalizeGenezaChapter(chapter: BibleChapter): BibleChapter {
  return {
    ...chapter,
    historicalContext:
      chapter.number === 24 ? GENEZA_24_HISTORICAL_CONTEXT : chapter.historicalContext,
    units: chapter.units.map((unit) => normalizeGenezaUnit(unit, chapter.number)),
  }
}

/** Geneza, cu toate cele 50 de capitole și proveniență explicită pe fiecare unitate. */
export const GENEZA: BibleBook = {
  ...GENEZA_BASE,
  chapters: [
    ...GENEZA_BASE.chapters,
    GENEZA_2,
    GENEZA_3,
    GENEZA_4,
    GENEZA_5,
    GENEZA_6,
    GENEZA_7,
    GENEZA_8,
    GENEZA_9,
    GENEZA_10,
    GENEZA_11,
    GENEZA_12,
    GENEZA_13,
    GENEZA_14,
    GENEZA_15,
    GENEZA_16,
    GENEZA_17,
    GENEZA_18,
    GENEZA_19,
    GENEZA_20,
    GENEZA_21,
    GENEZA_22,
    GENEZA_23,
    GENEZA_24,
    GENEZA_25,
    GENEZA_26,
    GENEZA_27,
    GENEZA_28,
    GENEZA_29,
    GENEZA_30,
    GENEZA_31,
    GENEZA_32,
    GENEZA_33,
    GENEZA_34,
    GENEZA_35,
    GENEZA_36,
    GENEZA_37,
    GENEZA_38,
    GENEZA_39,
    GENEZA_40,
    GENEZA_41,
    GENEZA_42,
    GENEZA_43,
    GENEZA_44,
    GENEZA_45,
    GENEZA_46,
    GENEZA_47,
    GENEZA_48,
    GENEZA_49,
    GENEZA_50,
  ].map(normalizeGenezaChapter),
}

export { EXOD, LEVITIC, NUMERI, DEUTERONOM, IOSUA, RUT, SAMUEL1, SAMUEL2 }

/** Cărțile legacy VT integrate; 1 Împărați este adăugată separat în publicationBible. */
export const BIBLE_BOOKS: BibleBook[] = [
  GENEZA,
  EXOD,
  LEVITIC,
  NUMERI,
  DEUTERONOM,
  IOSUA,
  RUT,
  SAMUEL1,
  SAMUEL2,
]

export function findBook(id: string): BibleBook | undefined {
  return BIBLE_BOOKS.find((b) => b.id === id)
}

export function findChapter(bookId: string, number: number) {
  return findBook(bookId)?.chapters.find((c) => c.number === number)
}
