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

export const NUMERI_21 = numeriChapter({
  number: 21,
  title: "Numeri 21 — Șarpele de aramă și victoriile asupra lui Sihon și Og",
  summary:
    "După o victorie asupra Aradului, poporul cârtește din nou și este pedepsit cu șerpi arzători; DOMNUL oferă vindecare prin privirea la un șarpe de aramă înalțat pe un stâlp. Israel cântă la fântâna Beer, apoi cucerește țările lui Sihon și Og, primii regi amoriți învinși înainte de intrarea în Canaan.",
  literaryContext:
    "Capitolul marchează trecerea de la rătăcire la cucerire: pentru prima dată de la Cadeș, Israel câștigă bătălii și ocupă teritorii — la Horma, apoi împotriva lui Sihon și Og. Generația nouă, născută în pustie, începe să vadă împlinirea făgăduinței pentru care părinții lor muriseră în necredință.",
  historicalContext:
    "Șarpele de aramă ridicat de Moise a fost păstrat de israeliți până pe vremea regelui Ezechia, care l-a sfărâmat pentru că poporul începuse să-i aducă tămâie ca unui idol (2 Împarați 18:4). Isus Hristos Însăși folosește această imagine în Ioan 3:14-15 ca prefigurare directă a Înălțării Sale pe cruce.",
  units: [
    {
      id: "numeri-21-1-3",
      ref: "Numeri 21:1-3",
      heading: "Victoria de la Horma împotriva Aradului",
      text: numeriPassage(21, 1, 3),
      teaching: teaching(
        "Canaanitul din Arad atacă și ia câțiva prinși de război. Răspunsul lui Israel este remarcabil: în loc să cârtească, face un jurământ către DOMNUL, promițând să nimicească total cetățile dacă va primi victoria — nu spre câștig personal, ci ca jertfă de recunoștință.",
        "DOMNUL ascultă și răspunde imediat, iar Israel împlinește jurământul. Numele locului, Horma, „nimicire”, este același cu locul înșfrângerii lor de la sfârșitul capitolului paisprezece — dar de data aceasta în sens invers, ca loc de victorie, nu de eșec.",
      ),
      words: [],
      crossRefs: ["Numeri 14:45", "Judecătorii 1:17"],
      forYourHeart:
        "Același loc care a fost odată scârba unei înfrângeri poate deveni, printr-o generație credincioasă, locul unei victorii pentru DOMNUL.",
    },
    {
      id: "numeri-21-4-9",
      ref: "Numeri 21:4-9",
      heading: "Șerpii arzători și șarpele de aramă",
      text: numeriPassage(21, 4, 9),
      teaching: teaching(
        "Ocolînd țara Edomului, „poporul și-a pierdut răbdarea pe drum”, repetând cârtirea veche despre lipsa hranei și apei, și numind mană „hrana mizerabilă”. DOMNUL trimite șerpi arzători a căror mușcătură ucide mult popor.",
        "Poporul recunoaște imediat păcatul — „am păcătuit, căci am vorbit împotriva DOMNULUI și împotriva ta” — și cere mijlocirea lui Moise. DOMNUL nu îndepărtează șerpii, ci oferă o cale de vindecare: un șarpe de aramă pe un stâlp, la care oricine mușcat privea și trăia.",
        "Vindecarea nu cerea efort, ci doar privire cu credință: „oricine va fi mușcat și va privi spre el va trăi”. Isus Însăși avea să explice această scenă ca prefigurare a morții Sale pe cruce: „precum a înălțat Moise șarpele în pustie, tot așa trebuie să fie înălțat și Fiul omului”.",
      ),
      words: [],
      crossRefs: ["Ioan 3:14-15", "2 Împarați 18:4", "1 Corinteni 10:9"],
      forYourHeart:
        "Vindecarea lui Dumnezeu vine adesea printr-o privire simplă de credință, nu prin efort omenesc; a privi spre ceea ce DOMNUL a înălțat este suficient pentru viață.",
    },
    {
      id: "numeri-21-10-16",
      ref: "Numeri 21:10-16",
      heading: "Popasurile până la Beer",
      text: numeriPassage(21, 10, 16),
      teaching: teaching(
        "O listă scurtă de popasuri — Obot, Iie-Abarim, valea Zered, dincolo de Arnon — marchează progresul spre est și nord, ocolind țările Edomului și Moabului, conform poruncii DOMNULUI de a nu ataca aceste popoare înrudite.",
        "Un citat din „Cartea Războaielor DOMNULUI”, o sursă antică pierdută nemenționată în altă parte, confirmă că Israel avea deja o tradiție scrisă de înregistrare a lucrărilor DOMNULUI în bătăliile lor, chiar înainte de a intra în țara făgăduită.",
      ),
      words: [],
      crossRefs: ["Deuteronom 2:9", "Deuteronom 2:18-19"],
      forYourHeart:
        "Progresul spre făgăduință vine adesea prin popasuri obișnuite, aparent fără dramatism, dar fiecare pas înainte este condus de DOMNUL.",
    },
    {
      id: "numeri-21-17-20",
      ref: "Numeri 21:17-20",
      heading: "Cântarea fântânii",
      text: numeriPassage(21, 17, 20),
      teaching: teaching(
        "La Beer, DOMNUL îi spune lui Moise: „strânge poporul și le voi da apă”, iar poporul răspunde nu prin cârtire, ca de atâtea ori înainte, ci prin cântare: „țâșnește, fântână! Cântați-i!” Este un contrast izbitor față de tiparul repetat al cârtirii pentru apă.",
        "Cântarea menționează că fântâna a fost săpată „de căpetenii, de fruntașii poporului, cu sceptrul, cu toiegele lor” — chiar conducătorii participă activ la munca de a scoate darul DOMNULUI la suprafață, nu doar așteaptă pasiv.",
      ),
      words: [],
      crossRefs: ["Ioan 4:14"],
      forYourHeart:
        "Când înțelegi că darul DOMNULUI este aproape, răspunsul potrivit este cântarea de mulțumire, nu așteptarea pasivă sau cârtirea.",
    },
    {
      id: "numeri-21-21-26",
      ref: "Numeri 21:21-26",
      heading: "Victoria asupra lui Sihon, împăratul amoriților",
      text: numeriPassage(21, 21, 26),
      teaching: teaching(
        "Israel repetă cererea făcută Edomului, de data aceasta lui Sihon: doar trecere pașnică pe Drumul Împărătesc. Spre deosebire de Edom, care doar refuzase, Sihon „nu i-a îngăduit lui Israel să treacă” și vine chiar el să lupte împotriva lui Israel la Iahat.",
        "De data aceasta, răspunsul lui Israel este diferit față de retragerea din fața Edomului: „Israel l-a lovit cu ascuțișul săbiei și i-a luat țara în stăpânire”. Această diferență arată că Israel nu evita conflictul din principiu, ci din ascultare față de porunca de a nu ataca rudele lor Edom și Moab; când un vrăjmaș fără această restricție ataca, DOMNUL le dădea victoria.",
      ),
      words: [],
      crossRefs: ["Deuteronom 2:24-25", "Judecătorii 11:19-22"],
      forYourHeart:
        "Ascultarea de granițele rânduite de Dumnezeu și disponibilitatea de a lupta atunci când El o cere merg mână în mână, fără contradicție.",
    },
    {
      id: "numeri-21-27-31",
      ref: "Numeri 21:27-31",
      heading: "Cântarea poeților despre Heșbon",
      text: numeriPassage(21, 27, 31),
      teaching: teaching(
        "Textul citează o cântare veche a „poeților”, care celebra deja cucerirea anterioară a Heșbonului de către Sihon de la Moab — o dovadă că teritoriul luat acum de Israel fusese deja pierdut de Moab înainte, astfel încât Israel nu lua pământ de la Moab Însăși, ci de la amoriți.",
        "Cântarea se încheie cu batjocura la adresa lui Chemoș, dumnezeul fals al Moabului, ale cărui fiice și fii „au ajuns fugari și captivi” — dovadă că idolii popoarelor din jur nu puteau apăra pe cei care li se închinau, spre deosebire de DOMNUL, care tocmai îi dăduse victoria lui Israel.",
      ),
      words: [],
      crossRefs: ["Judecătorii 11:24", "1 Împarați 11:7"],
      forYourHeart:
        "Istoria arată mereu neputința idolilor falși de a apăra pe cei ce se încred în ei, spre deosebire de puterea reală a DOMNULUI Cel viu.",
    },
    {
      id: "numeri-21-32-35",
      ref: "Numeri 21:32-35",
      heading: "Iaezer și înfrângerea lui Og, împăratul Basanului",
      text: numeriPassage(21, 32, 35),
      teaching: teaching(
        "După iscodirea și cucerirea Iaezerului, Israel se îndreaptă spre Basan, unde Og, un alt rege amorit cunoscut mai târziu pentru statura sa uriașă (Deuteronom 3:11), le iese în întâmpinare la Edrei cu tot poporul lui, gata de luptă.",
        "DOMNUL îl încurajează pe Moise cu aceeași formulă folosită și pentru Sihon: „nu te teme de el, căci l-am dat în mâinile tale”. Rezultatul este total: „l-au lovit pe el, pe fiii lui și tot poporul lui, fără să lase niciun supraviețuitor”, iar Israel stăpânește acum două regate amorite înainte chiar de a trece Iordanul.",
      ),
      words: [],
      crossRefs: ["Deuteronom 3:1-11", "Psalmul 135:11"],
      forYourHeart:
        "Chiar împotriva vrăjmașilor de statură uriașă, teamă se înfruntă nu prin propria putere, ci prin încrederea în asigurarea explicită a DOMNULUI: „l-am dat în mâinile tale”.",
    },
  ],
  prayer:
    "Doamne, învață-mă să răspund cu recunoștință și cântare, nu cu cârtire, când îmi arăți darurile Tale.\n\nMulțumescu-Ți pentru șarpele de aramă înălțat, care mă duce cu gândul la Hristos, Înălțat pe cruce pentru vindecarea mea; învață-mă să privesc spre El cu credință simplă.\n\nDă-mi ascultare față de granițele pe care le rânduiști și curaj atunci când îmi ceri să lupt.\n\nȘi învață-mă să nu mă tem de niciun vrăjmaș, oricât de mare, pentru că Tu ai spus: „l-am dat în mâinile tale”. Amin.",
  status: NUMERI_STATUSES[21],
})
