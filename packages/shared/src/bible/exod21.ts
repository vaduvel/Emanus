import { exodChapter, teaching } from "./exodHelpers.js"

/*
 * Cartea Exod, explicată pe unități de sens.
 *
 * Textul biblic: păstrat separat în exodText.ts (fișierele exodTextN.ts).
 * Explicația: scrisă pentru Emanus după cercetarea textului. Nu se copiază
 * formularea niciunui predicator sau comentator.
 */

export const EXOD_21 = exodChapter({
  number: 21,
  title: "Exod 21 — Legea coboară în viața de toate zilele",
  summary:
    "După cele zece cuvinte rostite din foc urmează rânduielile de zi cu zi. Încep cu robul evreu, care are dreptul să iasă liber în al șaptelea an, și cu cel care alege să rămână din dragoste; urmează ocrotirea femeii vândute într-o casă, cu trei lucruri pe care stăpânul nu are voie să i le taie. Vin apoi legile despre lovituri: deosebirea între uciderea cu voie și cea fără voie, locul de scăpare, plata pentru zilele pierdute și vindecare, măsura dreaptă „ochi pentru ochi”, și dreptul robului lovit. La urmă vin pricinile obișnuite dintre vecini: boul care ucide, groapa lăsată descoperită, vita căzută în ea și boul care lovește alt bou.",
  literaryContext:
    "Cu capitolul acesta începe partea numită de obicei „cartea legământului”, care se întinde până la sfârșitul capitolului douăzeci și trei. Ia aminte la așezare: mai întâi glasul din foc și cele zece cuvinte, apoi pământul — robi, boi, gropi, oase rupte. Nu sunt două lucruri deosebite: cel dintâi se dovedește în cel de-al doilea. Și vezi de unde începe: nu de la avere, nu de la închinare, ci de la cel mai lipsit de drepturi din toată casa. Un popor abia ieșit din robie primește, întâi de toate, legi despre cum să se poarte cu robii lui. Multe din pricinile de aici se rostesc în chipul „dacă se întâmplă așa, atunci așa”, și tocmai de aceea nu sunt un chip desăvârșit al voii lui Dumnezeu, ci o mărginire a răului într-o lume stricată.",
  historicalContext:
    "Legiuirile popoarelor din jur cunosc pricini asemănătoare — boul care lovește, groapa, robul vătămat — și uneori aproape cu aceleași vorbe. Deosebirile se văd îndată. Acolo, pedeapsa atârna de starea omului: cine lovea un om de sus plătea greu, cine lovea un sărac plătea puțin. Aici viața omului nu se plătește cu bani, iar robul are dreptul să fie răzbunat și chiar să iasă liber pentru un ochi scos. Acolo robia nu avea sfârșit; aici are un capăt, al șaptelea an. Se cade să spunem și că robia din legea aceasta nu se aseamănă cu robia din vremurile noi: era mai ales o plată a datoriei, cu vreme hotărâtă, iar răpirea unui om ca să fie vândut se pedepsea cu moartea. Iar „ochi pentru ochi” era, în lumea aceea, o mărginire a răzbunării, nu o îngăduire a ei: atât, și nimic mai mult.",
  units: [
    {
      verses: [1, 6],
      heading: "Robia are un capăt — și o ureche străpunsă din dragoste",
      teaching: teaching(
        "Ia aminte de unde începe Legea după Sinai: de la robi. Nu de la jertfe, nu de la sărbători, nu de la avere. Cel dintâi om ocrotit în cartea legământului este cel care nu se poate apăra singur. Așa Îl cunoaștem pe Dumnezeu: nu prin ce spune despre Sine, ci prin cine Îi este întâi în grijă.",
        "Și cea dintâi rânduială este un capăt: șase ani să slujească, iar în al șaptelea să iasă liber, fără să plătească nimic. Un popor abia scăpat din robie primește porunca să nu țină pe nimeni în robie fără sfârșit. Cine a fost izbăvit și nu izbăvește nu a înțeles ce i s-a făcut.",
        "Sunt aici și cuvinte grele, la care nu se cade să îndulcim nimic: dacă stăpânul i-a dat femeie, femeia și copiii rămân ai stăpânului. Nu scrie că lucrul acesta este bun. Legea aceasta nu ne arată lumea așa cum a voit-o Dumnezeu la început; ea așează hotare într-o lume căzută. Domnul Iisus va spune în alt loc că unele rânduieli au fost date „pentru împietrirea inimii” oamenilor — și tocmai de aceea nu se poate lua orice rânduială de aici ca măsură a desăvârșirii.",
        "Dar ia aminte ce se întâmplă în cel din urmă verset al unității: robul poate spune „iubesc pe stăpânul meu și nu vreau să ies”. Atunci urechea lui se străpunge la ușorul ușii, și rămâne pe viață. Ia seama ce fel de robie este aceasta: nu se începe cu lanț, ci cu libertatea de a pleca. Nu este rob adevărat cine nu a fost mai întâi liber să se ducă. Și semnul rămâne pe ureche — la locul cu care se ascultă.",
      ),
      words: [
        {
          original: "משפטים",
          transliteration: "mișpatim",
          language: "ebraica",
          meaning:
            "rânduieli, hotărâri de judecată. Cele zece cuvinte se rostesc din foc; acestea coboară în curte și în ogradă.",
        },
        {
          original: "יצא לחפשי חנם",
          transliteration: "iețe lahofși hinam",
          language: "ebraica",
          meaning:
            "să iasă liber, fără plată. Robia are un capăt hotărât; cine a fost izbăvit este ținut să izbăvească.",
        },
        {
          original: "ורצע את אזנו",
          transliteration: "veraаț et azno",
          language: "ebraica",
          meaning:
            "și să-i străpungă urechea. Semnul robiei din dragoste stă la locul cu care se ascultă.",
        },
      ],
      crossRefs: ["Deuteronom 15:12-17", "Levitic 25:39-42", "Matei 19:8", "Psalmi 40:6-8", "Romani 6:16-18"],
      forYourHeart:
        "Nu este rob din dragoste cine nu a fost mai întâi liber să plece. Îi slujești lui Dumnezeu fiindcă te temi, sau fiindcă Îl iubești?",
    },
    {
      verses: [7, 11],
      heading: "Trei lucruri care nu se pot tăia unei femei",
      teaching: teaching(
        "Urmează rânduiala despre fata vândută de tatăl ei ca slujnică. Este printre locurile cele mai grele din carte, și nu se cade îmblânzit. În sărăcia din vremea aceea, un părinte împins la capăt Își putea da copilul într-o altă casă. Legea nu laudă lucrul acesta: îl găsește făcut și pune un zid în jurul celei mai neapărate dintre toți.",
        "Și ia aminte ce spune: ea nu iese cum ies robii, adică nu poate fi zvârlită afară când nu mai place. Dacă stăpânul nu o mai vrea, nu are dreptul să o vândă la străini. Dacă a fost dată fiului, să fie ținută ca o fiică. Iar dacă stăpânul Își ia altă femeie, celei dintâi nu are voie să-i taie trei lucruri: hrana, îmbrăcămintea și dreptul ei de soție.",
        "Se cade zăbovit asupra celor trei. Nu se vorbește doar de pâine și haine: al treilea lucru este dreptul ei de a nu fi lăsată singură și nebăgată în seamă în casa în care trăiește. În lumea veche, o femeie lăsată fără acest drept era o nimică. Dumnezeu Îl scrie în lege. Ia aminte că Dumnezeu apără nu numai viața, ci și cinstea, și chiar dragostea datorată cuiva.",
        "Și vezi încheierea: dacă nu-i dă aceste trei lucruri, ea iese slobodă, fără plată. Cine nu Își împlinește datoria față de omul din casa lui pierde dreptul asupra lui. Înaintea lui Dumnezeu, stăpânirea nu se ține cu puterea, ci cu grija.",
      ),
      words: [
        {
          original: "לאמה",
          transliteration: "leama",
          language: "ebraica",
          meaning:
            "ca slujnică. Legea nu laudă lucrul acesta: îl găsește făcut și pune un zid în jurul celei mai neapărate.",
        },
        {
          original: "שארה כסותה וענתה",
          transliteration: "șeera kesuta veonata",
          language: "ebraica",
          meaning:
            "hrana ei, îmbrăcămintea ei și dreptul ei de soție. Trei lucruri pe care stăpânul nu are voie să le taie.",
        },
        {
          original: "ויצאה חנם אין כסף",
          transliteration: "veița hinam ein kasef",
          language: "ebraica",
          meaning:
            "și să iasă slobodă, fără plată. Cine nu Își face datoria pierde dreptul asupra omului din casa lui.",
        },
      ],
      crossRefs: ["Deuteronom 21:14", "Levitic 19:20", "Maleahi 2:14-16", "1 Petru 3:7", "Efeseni 5:28-29"],
      forYourHeart:
        "Înaintea lui Dumnezeu, stăpânirea nu se ține cu puterea, ci cu grija. Ce datorezi omului pus în mâna ta?",
    },
    {
      verses: [12, 17],
      heading: "Cu voie sau fără voie: locul de scăpare",
      teaching: teaching(
        "Cine lovește un om și-l omoară să fie pedepsit cu moartea. Dar îndată se face o deosebire mare: dacă nu a făcut-o cu gând, ci Dumnezeu a îngăduit ca așa să se întâmple, i se dă un loc unde să fugă. Iată cel dintâi temei al dreptei judecăți: nu se cântărește numai fapta, ci și gândul din care a ieșit.",
        "Și tot atât de limpede se spune și celălalt capăt: pentru cine a ucis cu vicleșug și cu gând hotărât nu este scăpare, nici măcar la altar. Ia aminte: locul cel mai sfânt nu este ascunziș pentru cel care ucide cu bună știință. Sfințenia unui loc nu acoperă răutatea unei inimi. Când Îl vom vedea pe Ioab prinzându-se de coarnele altarului și totuși judecat, se va vedea împlinirea cuvântului acestuia.",
        "Urmează apoi trei fapte pentru care se dă aceeași pedeapsă: lovirea părinților, răpirea unui om ca să fie vândut și blestemarea tatălui sau a mamei. Vezi ce stă alături: în ochii lui Dumnezeu, a răpi un om și a-l vinde este ca uciderea. Aici este și răspunsul la o întrebare pe care mulți o pun: Scriptura nu îngăduie robia de felul celei cu oameni furați — o pedepsește cu moartea.",
        "Și se cade să spunem ce înseamnă pentru noi „cine blestemă pe tatăl său”. Nu este vorba de o clipă de mânie a unui copil, ci de a călca și a lepăda pe cei care i-au dat viață. În lumea veche, un părinte bătrân lepădat de copii murea. Legea stă aici împotriva unei nedreptăți tăcute, care nu se vede în piață, dar rupe o casă.",
      ),
      words: [
        {
          original: "לא צדה",
          transliteration: "lo țada",
          language: "ebraica",
          meaning:
            "nu a stat la pândă, nu a făcut-o cu gând. Nu se cântărește numai fapta, ci și gândul din care a ieșit.",
        },
        {
          original: "מקום אשר ינוס שמה",
          transliteration: "makom așer ianus șama",
          language: "ebraica",
          meaning:
            "un loc unde să fugă. Cel dintâi semn al cetăților de scăpare de mai târziu.",
        },
        {
          original: "גנב איש",
          transliteration: "gonev iș",
          language: "ebraica",
          meaning:
            "cine fură un om. Răpirea unui om ca să fie vândut stă în lege alături de ucidere.",
        },
      ],
      crossRefs: ["Numeri 35:11-25", "1 Împărați 2:28-31", "Deuteronom 24:7", "1 Timotei 1:9-10", "Proverbe 20:20"],
      forYourHeart:
        "Sfințenia unui loc nu acoperă răutatea unei inimi. Nu te ascunzi tu în lucruri sfinte de ceea ce știi că ai făcut?",
    },
    {
      verses: [18, 27],
      heading: "Zile pierdute, măsură dreaptă, și un rob care are drepturi",
      teaching: teaching(
        "Dacă doi se ceartă și unul rămâne la pat, cel care a lovit plătește zilele pierdute și vindecarea. Ia aminte ce fel de dreptate este aceasta: nu se încheie cu o pedeapsă, ci cu o îndreptare. Cel vătămat nu primește răzbunare, ci ce a pierdut. Dumnezeu nu Se îndestulează cu vinovatul pedepsit; vrea pe cel lovit ridicat.",
        "Urmează un loc greu, despre robul lovit de stăpân. Se cade spus cinstit: rânduiala aceasta este departe de ce vedem noi astăzi ca drept. Și totuși vezi ce face, în vremea ei: pune stăpânul sub judecată pentru un rob — lucru nemaiîntâlnit în legiuirile din jur — și spune despre rob că „este sângele lui”, adică sângele lui se cere. Un om socotit avere în toată lumea aceea are aici sânge care strigă.",
        "La mijloc stă pricina femeii însărcinate lovite în încăierare, și apoi cuvintele cele mai cunoscute și cele mai rău înțelese: viață pentru viață, ochi pentru ochi, dinte pentru dinte. Ia aminte că nu sunt o îngăduire a răzbunării, ci hotarul ei: atât, și nici un pas mai mult. Fără legea aceasta, un ochi scos cere în lumea oamenilor o casă arsă. Iar Domnul Iisus nu a stricat măsura aceasta: a arătat că ucenicul Lui nu Își mai ia nici măcar ce i se cuvine.",
        "Și vezi cum se încheie unitatea: dacă stăpânul scoate ochiul robului sau Îi sparge un dinte, robul iese liber. Un dinte spart îl scoate din robie. Nu era îngăduit să socotești că ce este al tău poți să-l strici. Dumnezeu așează aici, în vremea robiei, sămânța sfârșitului ei.",
      ),
      words: [
        {
          original: "שבתו יתן ורפא ירפא",
          transliteration: "șivto iten verapo ierape",
          language: "ebraica",
          meaning:
            "să plătească zilele pierdute și să-l facă sănătos. Dreptatea nu se încheie cu pedeapsă, ci cu îndreptare.",
        },
        {
          original: "נפש תחת נפש",
          transliteration: "nefeș tahat nefeș",
          language: "ebraica",
          meaning:
            "viață pentru viață. Nu o îngăduire a răzbunării, ci hotarul ei: atât, și nici un pas mai mult.",
        },
        {
          original: "לחפשי ישלחנו",
          transliteration: "lahofși ișalhenu",
          language: "ebraica",
          meaning:
            "să-l lase să plece liber. Un dinte spart îl scoate din robie: sămânța sfârșitului robiei.",
        },
      ],
      crossRefs: ["Levitic 24:19-20", "Matei 5:38-42", "Deuteronom 19:21", "Iov 31:13-15", "Filimon 1:15-16"],
      forYourHeart:
        "Dumnezeu nu Se îndestulează cu vinovatul pedepsit: vrea pe cel lovit ridicat. Pe cine ai lovit și nu ai ridicat încă?",
    },
    {
      verses: [28, 32],
      heading: "Boul care a ucis — și stăpânul care știa",
      teaching: teaching(
        "Dacă un bou ucide un om, boul să fie omorât și carnea lui să nu se mănânce, dar stăpânul nu este vinovat. Iar dacă boul lovea de mai înainte și stăpânul știa și nu l-a ținut, stăpânul răspunde cu viața. Aici este o învățătură pe care nu o învață nimeni cu voie bună: se poate ucide și prin nepăsare.",
        "Ia aminte că deosebirea nu o face fapta boului, care este aceeași, ci ce știa omul. Răul pe care l-am cunoscut în casa noastră, în purtarea noastră, în omul lăsat de noi fără frâu, și pe care nu l-am oprit, ne stă pe socoteală. Nu se poate spune înaintea lui Dumnezeu „nu am făcut nimic”, când tocmai a nu face nimic era vina.",
        "Și mai vezi că nici carnea boului nu se mănâncă. Nu se scoate niciun câștig din ce a vărsat sânge de om. Viața omului nu se prețuiește în piele și în carne.",
        "Iar cel din urmă verset este iarăși greu: pentru un rob ucis se plătesc treizeci de sicli stăpânului. Nu se cade îmblânzit: legea aceasta se rostea într-o lume care socotea robul avere. Și totuși ține minte prețul: treizeci de sicli de argint — cât s-a plătit, la vremea hotărâtă, pentru Domnul slăvei. Cel care a dat legea a fost socotit, mai târziu, la prețul unui rob.",
      ),
      words: [
        {
          original: "שור נגח",
          transliteration: "șor nagah",
          language: "ebraica",
          meaning:
            "bou care lovește cu coarnele. Deosebirea nu o face fapta boului, ci ce știa stăpânul.",
        },
        {
          original: "והועד בבעליו",
          transliteration: "vehuad bivalav",
          language: "ebraica",
          meaning:
            "și stăpânul a fost înștiințat. Se poate ucide și prin nepăsare: a nu face nimic poate fi vina.",
        },
        {
          original: "שלשים שקלים",
          transliteration: "șeloșim șekalim",
          language: "ebraica",
          meaning:
            "treizeci de sicli. Prețul unui rob în legea aceasta; și prețul cu care a fost vândut Domnul.",
        },
      ],
      crossRefs: ["Geneza 9:5-6", "Zaharia 11:12-13", "Matei 26:15", "Iacov 4:17", "Luca 12:47-48"],
      forYourHeart:
        "Nu se poate spune înaintea lui Dumnezeu „nu am făcut nimic”, când tocmai a nu face nimic era vina. Ce rău știut de tine ai lăsat nelegat?",
    },
    {
      verses: [33, 36],
      heading: "Groapa lăsată descoperită",
      teaching: teaching(
        "Dacă cineva lasă o groapă descoperită și cade în ea vita vecinului, plătește. Nu a împins nimic, nu a lovit nimic: a săpat și nu a acoperit. Iată iarăși învățătura pe care Legea o repetă: răspundem și pentru ce am lăsat deschis.",
        "Și ia aminte că Dumnezeu Se coboară în lucruri atât de mici: un bou, un măgar, o groapă într-o ogradă. Cel care a vorbit din foc pe muntele care fumega vorbește acum despre paguba unui vecin. Nu este niciun lucru al vieții noastre prea mărunt pentru sfințenia Lui.",
        "Iar la boul care lovește boul altuia se face o judecată înțeleaptă: dacă nu se știa de răul lui, paguba se împarte între cei doi — se vinde boul mort și se împarte, și se împarte și cel viu. Dacă se știa, plătește stăpânul întreg. Nici cel păgubit nu rămâne singur cu paguba, nici cel nevinovat nu este încărcat cu tot.",
        "Și vezi ce fel de popor voia Dumnezeu să facă. Nu unul care se ceartă la poartă pentru fiecare vită, ci unul în care vecinul nu rămâne păgubit și în care fiecare acoperă gropile din curtea lui. Sfințenia se dovedește în felul în care ne purtăm cu paguba altuia.",
      ),
      words: [
        {
          original: "בור",
          transliteration: "bor",
          language: "ebraica",
          meaning:
            "groapă, puț. Răspundem și pentru ce am lăsat deschis, nu doar pentru ce am făcut cu mâna.",
        },
        {
          original: "ולא יכסנו",
          transliteration: "velo iehasenu",
          language: "ebraica",
          meaning:
            "și nu a acoperit-o. Vina nu este săpatul, ci nepăsarea de după el.",
        },
        {
          original: "וחצו את כספו",
          transliteration: "vehațu et kaspo",
          language: "ebraica",
          meaning:
            "și să împartă prețul. Nici cel păgubit nu rămâne singur cu paguba, nici cel nevinovat nu duce tot.",
        },
      ],
      crossRefs: ["Deuteronom 22:8", "Levitic 19:13", "Romani 13:10", "Luca 6:31", "Filipeni 2:4"],
      forYourHeart:
        "Sfințenia se dovedește în felul în care te porți cu paguba altuia. Ce groapă din curtea ta ai lăsat descoperită?",
    },
  ],
  prayer:
    "Doamne, Tu ai început rânduielile Tale cu cel care nu se putea apăra singur; învață-ne să privim ca Tine.\n\nNu ne lăsa să socotim că suntem curați doar pentru că nu am lovit pe nimeni cu mâna.\n\nArată-ne gropile pe care le-am lăsat descoperite și răul pe care l-am știut și nu l-am oprit.\n\nȘi fă din noi oameni care nu doar plătesc, ci ridică pe cei pe care i-au lovit. Amin."
})
