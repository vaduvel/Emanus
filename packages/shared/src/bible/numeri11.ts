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

export const NUMERI_11 = numeriChapter({
  number: 11,
  title: "Numeri 11 — Tabera, pofta de carne și cei șaptezeci de bătrâni",
  summary:
    "Prima cârtire de pe drum aprinde focul DOMNULUI la marginea taberei. Apoi o poftă de carne cuprinde poporul, care tânjește după bucătăria Egiptului și disprețuiește mana. Copleșit, Moise se plânge DOMNULUI, care rânduiește șaptezeci de bătrâni să-i poarte sarcina și trimite prepelițe într-o măsură care se încheie cu o urgie mare la Chibrot-Hataava.",
  literaryContext:
    "Acesta este primul capitol al cărții Numeri în care lucrurile merg prost. După zece capitole de ordine, sfințire și ascultare desăvârșită, tocmai când tabăra pornește în sfârșit la drum, tiparul cârtirii — repetat de multe ori până la sfârșitul cărții — își face aici prima apariție: o poftă, o plângere, mânia DOMNULUI, mijlocirea lui Moise, un răspuns care poartă în el și judecată.",
  historicalContext:
    "„Adunătura de oameni” pomenită la începutul poftei de carne se referă probabil la mulțimea eterogenă care ieșise din Egipt odată cu Israel (compară Exod 12:38) — persoane care nu aveau amintirea legământului, dar a căror nemulțumire s-a răspândit repede în tot poporul. Chibrot-Hataava înseamnă literal „mormintele poftei”, un nume care avea să rămână legat pentru totdeauna de acest episod.",
  units: [
    {
      id: "numeri-11-1-3",
      ref: "Numeri 11:1-3",
      heading: "Tabera: focul DOMNULUI la cârtirea amară",
      text: numeriPassage(11, 1, 3),
      teaching: teaching(
        "Textul nu spune ce anume cârtea poporul; spune doar că a cârtit „amar la urechile DOMNULUI”. Absența unui motiv explicit este ea însăși un mesaj: nu conta cauza, ci felul cârtirii — o nemulțumire generală, fără nume, care s-a ridicat direct înaintea DOMNULUI.",
        "Focul DOMNULUI a mistuit „o parte din marginea taberei”, nu tot poporul; a fost un avertisment, nu o nimicire totală. Când poporul a strigat către Moise, iar Moise s-a rugat, „focul s-a potolit” — un tipar de mijlocire care se va repeta, cu variații, de mai multe ori în carte.",
      ),
      words: [
        {
          original: "תַּבְעֵרָה",
          transliteration: "Tavera",
          language: "ebraica",
          meaning:
            "Tabera, „ardere”. Numele locului păstrează pentru totdeauna amintirea judecății, exact așa cum Chibrot-Hataava va păstra amintirea poftei.",
        },
      ],
      crossRefs: ["Deuteronom 9:22", "Psalmul 78:21", "1 Corinteni 10:10"],
      forYourHeart:
        "O nemulțumire fără nume și fără motiv clar poate fi la fel de gravă înaintea lui Dumnezeu ca o plângere îndreptățită; verifică rădăcina cârtirii tale, nu doar cuvintele ei.",
    },
    {
      id: "numeri-11-4-9",
      ref: "Numeri 11:4-9",
      heading: "„Cine ne va da carne?” — amintirea Egiptului",
      text: numeriPassage(11, 4, 9),
      teaching: teaching(
        "Pofta pornește de la „adunătura de oameni” din mijlocul taberei, dar se răspândește repede: „chiar fiii lui Israel au început să plângă din nou”. Amintirea Egiptului este înfrumusețată până la absurd — peștele, castraveciorii, pepenii, prazul, ceapa și usturoiul sunt pomenite ca și cum ar fi fost mâncate „pe degeaba”, uitând cu totul robia care le însoțea masa.",
        "Contrastul este dureros: „acum sufletul nostru este uscat; nu este nimic: ochii noștri nu văd decât mana aceasta!” Mana — hrana zilnică, dată direct din cer, fără muncă de recoltat — a devenit obiectul disprețului tocmai pentru că era constantă și lipsită de varietate.",
        "Descrierea amănunțită a manei — cum arăta, cum se aduna, cum se măcina sau se zdrobea, cum se fierbea sau se cocea, gustul ei „ca o turtă preparată cu ulei” — arată că nu lipsa hranei era problema, ci monotonia ei. Poporul avea ce mânca din belșug; nu mai avea recunoștință pentru felul în care primea acea hrană.",
      ),
      words: [
        {
          original: "הָאסַפְסֻף",
          transliteration: "ha-asafsuf",
          language: "ebraica",
          meaning:
            "adunătura, mulțimea amestecată. Cuvântul apare doar aici în toată Scriptura și denumește o mulțime fără rădăcini clare, care a purtat prima poftă necuvenită în mijlocul taberei.",
        },
      ],
      crossRefs: ["Exod 16:31", "Exod 12:38", "Psalmul 106:14"],
      forYourHeart:
        "Recunoștința pentru hrana zilnică a lui Dumnezeu se pierde repede când memoria înfrumusețează robia veche în locul libertății prezente.",
    },
    {
      id: "numeri-11-10-15",
      ref: "Numeri 11:10-15",
      heading: "Plângerea lui Moise: „este prea greu pentru mine”",
      text: numeriPassage(11, 10, 15),
      teaching: teaching(
        "Auzind poporul plângând „în toate familiile lor, fiecare la intrarea cortului său”, Moise este el însuși copleșit, alături de mânia DOMNULUI aprinsă foarte tare. Rugăciunea lui către DOMNUL este una dintre cele mai sincere și mai dureroase din toată Scriptura: „de ce l-ai făcut pe robul Tău să sufere?”",
        "Moise pune întrebări care merg direct la limita curajului îngăduit unui om înaintea lui Dumnezeu: „oare eu am zămislit tot poporul acesta? Oare eu l-am născut?” El refuză imaginea de „doică” pentru un popor întreg, o sarcină pe care nu și-a asumat-o de la sine, ci i-a fost pusă pe umeri.",
        "Cuvintele finale — „ucide-mă mai bine, te rog... ca să nu-mi mai văd nenorocirea” — arată o epuizare totală, aproape de disperare. Nu este o cerere de sinucidere, ci strigătul unui slujitor extenuat care nu mai are resurse să continue singur.",
      ),
      words: [],
      crossRefs: ["Exod 18:17-18", "1 Împărați 19:4", "2 Corinteni 1:8-9"],
      forYourHeart:
        "Chiar cei mai mari slujitori ai lui Dumnezeu ajung la limita puterii lor. Recunoașterea aceasta înaintea DOMNULUI nu este o cădere, ci un prim pas spre ajutorul de care ai nevoie.",
    },
    {
      id: "numeri-11-16-23",
      ref: "Numeri 11:16-23",
      heading: "Șaptezeci de bătrâni și îndoiala lui Moise",
      text: numeriPassage(11, 16, 23),
      teaching: teaching(
        "Răspunsul DOMNULUI la povara lui Moise nu este o eliberare de sarcină, ci o împărțire a ei: șaptezeci de bătrâni vor primi „din Duhul care este peste tine”, ca să poarte împreună cu el greutatea poporului. Darul de conducere al lui Moise nu se împuținează prin împărțire; se răspândește fără să se piardă.",
        "Către popor, cuvântul DOMNULUI este aspru: mâncarea de carne cerută le va fi dată, dar „nu doar o zi... ci o lună întreagă, până vă va ieși pe nări și vă va fi scârbă de ea”. Împlinirea unei pofte necuvenite, dusă până la saturație, devine ea însăși o formă de judecată.",
        "Chiar Moise se îndoiește de făgăduința DOMNULUI: „șase sute de mii de bărbați pedestri... și Tu zici: le voi da carne!” Răspunsul DOMNULUI este scurt și definitiv: „oare mâna DOMNULUI este scurtată?” — o întrebare retorică ce va rămâne valabilă pentru fiecare îndoială ulterioară a lui Israel în pustie.",
      ),
      words: [
        {
          original: "הֲיַד יְהוָה תִּקְצָר",
          transliteration: "hayad Adonai tikzar",
          language: "ebraica",
          meaning:
            "oare mâna DOMNULUI este scurtată? Expresia „mână scurtată” înseamnă putere limitată sau insuficientă; întrebarea DOMNULUI respinge orice îndoială cu privire la puterea Lui de a împlini ce a promis.",
        },
      ],
      crossRefs: ["Exod 18:21-22", "Isaia 59:1", "Faptele Apostolilor 6:2-4"],
      forYourHeart:
        "Când o sarcină pare prea grea de purtat singur, întreabă-te nu doar cine te poate ajuta, ci și dacă îndoiala ta despre puterea lui Dumnezeu de a împlini este partea cea mai grea a poverii.",
    },
    {
      id: "numeri-11-24-30",
      ref: "Numeri 11:24-30",
      heading: "Eldad și Medad, și gelozia lui Iosua",
      text: numeriPassage(11, 24, 30),
      teaching: teaching(
        "Șaptezeci de bătrâni se strâng în jurul Cortului, iar Duhul Se odihnește peste ei; „au prorocit, dar nu au mai continuat” — un semn dat o singură dată, ca dovadă a darului primit, nu o slujbă continuă. Dar doi dintre cei înscriși, Eldad și Medad, nu ieșiseră la Cort și totuși „Duhul S-a odihnit peste ei... și au prorocit în tabără”.",
        "Un tânăr aleargă îngrijorat la Moise, iar Iosua, „slujitorul lui Moise din tinerețea lui”, cere: „Stăpâne Moise, oprește-i!” Gelozia lui Iosua pentru cinstea lui Moise este de înțeles, dar răspunsul lui Moise depășește cu mult orice gelozie personală: „ești gelos pentru mine? O, de ar fi tot poporul DOMNULUI alcătuit din proroci și de ar pune DOMNUL Duhul Lui peste ei!”",
        "Moise nu apără vreun monopol asupra Duhului; dorește contrariul — ca darul să se răspândească la tot poporul. Este una dintre cele mai largi și mai generoase dorințe rostite de un conducător din toată Scriptura, cu ecou direct în profeția lui Ioel despre revărsarea Duhului peste „orice făptură”.",
      ),
      words: [],
      crossRefs: ["Ioel 2:28-29", "Faptele Apostolilor 2:17-18", "Marcu 9:38-39"],
      forYourHeart:
        "Bucură-te când Dumnezeu lucrează prin cineva neașteptat, în afara cadrului obișnuit; gelozia pentru „locul tău” poate stinge o revărsare pe care Dumnezeu vrea să o dea mai larg.",
    },
    {
      id: "numeri-11-31-35",
      ref: "Numeri 11:31-35",
      heading: "Prepelițele și mormintele poftei",
      text: numeriPassage(11, 31, 35),
      teaching: teaching(
        "Un vânt trimis de DOMNUL aduce prepelițe „de peste mare” într-o cantitate uriașă, întinse „cale de o zi” în fiecare direcție, la doar „doi coți deasupra feței pământului” — la îndemâna oricui vroia să le prindă. Poporul strânge fără oprire timp de o zi întreagă, o noapte și încă o zi, „cel ce strânsese cel mai puțin strânsese zece omeri”.",
        "Judecata vine chiar în mijlocul poftei împlinite: „carnea era încă în dinții lor, fără să fie mestecată, când mânia DOMNULUI S-a aprins... și DOMNUL a lovit poporul cu o urgie foarte mare”. Nu răbdarea de a aștepta hrana a fost pedepsită, ci disprețul rostit față de mana dăruită și dorința de a-L testa pe DOMNUL cu o poftă necontrolată.",
        "Numele locului rămâne ca mărturie: Chibrot-Hataava, „mormintele poftei”, pentru că „acolo au îngropat poporul apucat de poftă”. Capitolul se încheie cu tabăra pornind mai departe, spre Hațerot, purtând cu ea, în amintire, prețul unei pofte împlinite fără recunoștință.",
      ),
      words: [
        {
          original: "קִבְרוֹת הַתַּאֲוָה",
          transliteration: "Kivrot ha-Taavah",
          language: "ebraica",
          meaning:
            "mormintele poftei. Numele locului leagă pentru totdeauna disprețul față de mana dăruită de DOMNUL cu pierderea de vieți omenești, ca avertisment pentru generațiile următoare.",
        },
      ],
      crossRefs: ["Psalmul 78:29-31", "Psalmul 106:15", "1 Corinteni 10:6"],
      forYourHeart:
        "O poftă împlinită fără recunoștință nu aduce mulțumirea căutată; poate lăsa în urmă doar un nume de amintire tristă, ca mormintele poftei din pustie.",
    },
  ],
  prayer:
    "Doamne, iartă-mi cârtirile fără nume, nemulțumirile care se ridică din inima mea fără motiv limpede, doar din obișnuință.\n\nÎnvață-mă să nu disprețuiesc darul Tău zilnic, oricât de simplu ar părea, comparându-l cu o robie înfrumusețată de memorie.\n\nCând povara mea este prea grea, dă-mi curajul lui Moise de a Ți-o mărturisi limpede, și dă-mi apoi harul de a primi ajutorul pe care Tu îl trimiți prin alții.\n\nȘi învață-mă să mă bucur, ca Moise, când Duhul Tău lucrează prin cineva neașteptat, în loc să apăr cu gelozie locul meu. Amin.",
  status: NUMERI_STATUSES[11],
})
