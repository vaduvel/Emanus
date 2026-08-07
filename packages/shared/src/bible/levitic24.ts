import { leviticChapter, teaching } from "./leviticHelpers.js"

/*
 * Cartea Levitic, explicată pe unități de sens.
 *
 * Textul biblic: păstrat separat în leviticText.ts (fișierele leviticTextN.ts).
 * Explicația: scrisă pentru Emanus după cercetarea textului. Nu se copiază
 * formularea niciunui predicator sau comentator.
 */

export const LEVITIC_24 = leviticChapter({
  number: 24,
  title: "Levitic 24 — Candela care nu se stinge și o singură măsură pentru toți",
  summary:
    "Întâi două lucruri de fiecare zi la cort: untdelemnul pentru candele și cele douăsprezece pâini așezate înaintea Domnului. Apoi o întâmplare grea din tabără, cu un om care a hulit Numele, și rânduiala judecății: aceeași măsură pentru cel din țară și pentru străin.",
  literaryContext:
    "Ia aminte că între șirurile de rânduieli se deschide aici o povestire, un lucru rar în cartea aceasta. Și vezi ce se pune alături: lumina care arde neapărat și pâinea care stă mereu înaintea Domnului, iar apoi un om care a stricat Numele. Slujba de fiecare zi nu se oprește când în tabără se întâmplă ceva greu.",
  historicalContext:
    "Untdelemnul se făcea din măsline zdrobite, curat, adus de popor; candelabrul stătea în locul sfânt și era îngrijit de preoți seară și dimineață. Pâinile se schimbau în fiecare zi de odihnă, iar cele scoase se mâncau de preoți. Și se cade știut că omul din povestire era fiu de mamă din Israel și de tată egiptean; tocmai de aceea se încheie cu vorba despre străin și despre om din țară.",
  units: [
    {
      verses: [1, 4],
      heading: "Untdelemn adus de popor, lumină ținută de preot",
      teaching: teaching(
        "Poporul aducea untdelemn curat din măsline zdrobite, iar Aaron ținea candelele arzând înaintea Domnului, necurmat. Ia aminte cum se împarte lucrarea: poporul aduce, preotul îngrijește. Lumina din locul sfânt atârna și de mâna omului de rând.",
        "Și vezi că untdelemnul se făcea din măsline zdrobite. Nu se aduna de pe ramuri; ieșea sub piatră. Ce luminează în casa Lui trece mai întâi printr-o apăsare.",
        "Ia seama la cuvântul necurmat: candela nu se stingea, dar se îngrijea de două ori pe zi. Nu ardea de la sine. Lumina se ține, nu se ține minte.",
        "Și ține minte că Domnul ne-a numit lumina lumii și a spus că nimeni nu aprinde o candelă ca să o pună sub un vas. Nu ne-am aprins singuri; dar avem de îngrijit ce ni s-a dat."
      ),
      words: [
        {
          original: "שמן זית זך כתית",
          transliteration: "șemen zait zah katit",
          language: "ebraica",
          meaning:
            "untdelemn curat din măsline zdrobite. Iese sub piatră."
        },
        {
          original: "להעלת נר תמיד",
          transliteration: "lehaalot ner tamid",
          language: "ebraica",
          meaning:
            "ca să ardă candela necurmat. Se ținea, nu ardea de la sine."
        },
        {
          original: "לפני יהוה תמיד",
          transliteration: "lifnei Domnul tamid",
          language: "ebraica",
          meaning:
            "înaintea Domnului, mereu. Lumina nu era pentru ochii oamenilor."
        }
      ],
      crossRefs: ["Matei 5:14-16", "Exod 27:20-21", "Ioan 8:12", "2 Corinteni 4:6-7", "Apocalipsa 1:20"],
      forYourHeart:
        "Ce luminează în casa Lui trece mai întâi printr-o apăsare."
    },
    {
      verses: [5, 9],
      heading: "Douăsprezece pâini, niciun trib uitat",
      teaching: teaching(
        "Se coceau douăsprezece pâini și se așezau în două șiruri pe masa din locul sfânt, cu tămâie deasupra, și se schimbau în fiecare zi de odihnă. Ia aminte la număr: douăsprezece, câte seminții. Fiecare trib stătea înaintea Domnului, și cele mici la fel ca cele mari.",
        "Și vezi că pâinile stăteau acolo o săptămână întreagă, și El le privea când nimeni nu le mai privea. Poporul își vedea de treburi, iar chipul lui rămânea înaintea Lui. Așa este și mijlocirea Domnului Iisus pentru noi: nu se întrerupe când noi uităm.",
        "Ia seama că pâinile scoase se mâncau de preoți în locul sfânt. Ce fusese înaintea Lui hrănea apoi pe cei care slujeau. Nu se arunca nimic din ce stătuse înaintea Domnului.",
        "Și ține minte că David a mâncat din pâinile acestea când era flămând și fugarit, iar Domnul Iisus a pomenit fapta lui ca să arate ceva: mila trece înaintea rânduielii. Dumnezeu nu ține pâinea încuiată când un om piere de foame."
      ),
      words: [
        {
          original: "לחם הפנים",
          transliteration: "lehem hapanim",
          language: "ebraica",
          meaning:
            "pâinea feței, adică pâinea stătută înaintea Lui."
        },
        {
          original: "שתים עשרה חלות",
          transliteration: "șteim esre halot",
          language: "ebraica",
          meaning:
            "douăsprezece pâini. Câte seminții, niciuna uitată."
        },
        {
          original: "לאזכרה",
          transliteration: "leazkara",
          language: "ebraica",
          meaning:
            "spre aducere-aminte. Tămâia arsă în locul pâinii."
        }
      ],
      crossRefs: ["Marcu 2:25-27", "Evrei 7:25", "Isaia 49:16", "Exod 25:30", "Ioan 6:35"],
      forYourHeart:
        "Chipul tău rămâne înaintea Lui și în zilele în care tu nu te gândești la El."
    },
    {
      verses: [10, 14],
      heading: "O întâmplare grea și o judecată care așteaptă",
      teaching: teaching(
        "În tabără s-a iscat o certă, și un om, fiu de mamă din Israel și de tată egiptean, a hulit Numele. L-au pus sub păzire până să se spună ce este de făcut. Ia aminte la lucrul acesta: nu s-a făcut dreptate în clipa mâniei. S-a așteptat.",
        "Și vezi cât de rar se întâmplă la noi. Când cineva lovește cu vorba, judecăm pe loc și în gura mare. Tabăra aceea a așteptat un cuvânt de la Dumnezeu înainte de a hotărî.",
        "Ia seama că lucrul a început cu o certă. Nimeni nu începe ziua vrând să hulească; se ajunge acolo prin mânie. Cine nu-și păzește gura la certă ajunge să spună ce nu credea că va spune.",
        "Și ține minte cum se cade citită pedeapsa care a urmat: era hotărârea unei țări de atunci, sub așezământul acela. Adunarea de azi nu are sabie. Ce rămâne este greutatea lucrului: Numele Lui nu este de aruncat într-o certă."
      ),
      words: [
        {
          original: "וינצו במחנה",
          transliteration: "vainațu bamahane",
          language: "ebraica",
          meaning:
            "s-au certat în tabără. De acolo a pornit totul."
        },
        {
          original: "ויקב את השם ויקלל",
          transliteration: "vaikov et hașem vaikalel",
          language: "ebraica",
          meaning:
            "a străpuns Numele și a blestemat."
        },
        {
          original: "ויניחהו במשמר",
          transliteration: "vaianihuhu bamișmar",
          language: "ebraica",
          meaning:
            "l-au pus sub păzire. Nu s-a judecat în clipa mâniei."
        }
      ],
      crossRefs: ["Iacov 1:19-20", "Proverbe 18:13", "Matei 12:36", "Efeseni 4:26", "Ioan 8:7"],
      forYourHeart:
        "Nimeni nu începe ziua vrând să hulească. Se ajunge acolo prin mânie."
    },
    {
      verses: [15, 16],
      heading: "Numele Lui nu se ia în gură oricum",
      teaching: teaching(
        "S-a dat apoi rânduiala: cine își blestemă Dumnezeul își va purta vina, și cine hulește Numele va fi omorât; și străinul și cel din țară, la fel. Ia aminte la vorba care se întoarce mereu în aceste capitole: aceeași măsură pentru toți. Nu se ținea partea nimănui.",
        "Și vezi cât de greu atârnă Numele Lui. Nu este o vorbă ca oricare alta. Poruncile din Sinai puseseră același lucru: să nu iei în deșert Numele Domnului.",
        "Ia seama că nu se vorbește aici de o împiedicare la vorbă sau de un cuvânt scăpat în durere; Iov s-a plâns amarnic și Dumnezeu nu l-a osnd it. Aici este vorba de omul care ia Numele Lui și îl aruncă la pământ cu bună știință.",
        "Și ține minte că pe Domnul Iisus L-au omorât cu litera acestui verset în gură, zicând că a hulit. Cel care era Însuși Numele a fost osndit pentru hulă. Și n-a răspuns nimic."
      ),
      words: [
        {
          original: "ונשא חטאו",
          transliteration: "venasa hato",
          language: "ebraica",
          meaning:
            "își va purta vina."
        },
        {
          original: "נקב שם",
          transliteration: "nokev șem",
          language: "ebraica",
          meaning:
            "cine străpunge Numele. Nu o vorbă scăpată, ci o lepădare cu știință."
        },
        {
          original: "כגר כאזרח",
          transliteration: "kager kaezrah",
          language: "ebraica",
          meaning:
            "străinul ca și cel din țară. Aceeași măsură pentru toți."
        }
      ],
      crossRefs: ["Exod 20:7", "Matei 26:65-66", "1 Petru 2:23", "Iov 3:1", "Fapte 10:34"],
      forYourHeart:
        "Cel care era Însuși Numele a fost osndit pentru hulă, și nu a răspuns nimic."
    },
    {
      verses: [17, 22],
      heading: "Ochi pentru ochi: hotar pus răzbunării",
      teaching: teaching(
        "Urmează rânduiala judecății: viață pentru viață, frntură pentru frntură, ochi pentru ochi, dinte pentru dinte. Ia aminte ce este în adevăr cuvântul acesta: nu o învoire la răzbunare, ci un hotar pus ei. Se plătește atât, și nu mai mult. Lumea de atunci răspundea la un dinte cu o casă arsă.",
        "Și vezi că judecata era dată în mâna judecătorilor, nu în mâna celui lovit. Nu își lua omul dreptatea singur. Tocmai aceasta desparte legea de vendetă.",
        "Ia seama la ce a făcut Domnul Iisus cu versetul acesta: ați auzit că s-a zis ochi pentru ochi; Eu însă vă spun să nu vă împotriviți celui ce vă face rău. Nu a stricat dreptatea; a scos-o din mâna noastră și a lăsat-o în mâna Tatălui.",
        "Și ține minte încheierea, spusă iarăși: o singură lege pentru străin și pentru cel din țară. Dumnezeu nu are două cântare. Acolo unde adunarea judecă altfel pe cel de-al casei decât pe cel venit de departe, s-a stricat ceva."
      ),
      words: [
        {
          original: "שבר תחת שבר",
          transliteration: "șever tahat șever",
          language: "ebraica",
          meaning:
            "frntură pentru frntură. Atât, și nu mai mult."
        },
        {
          original: "עין תחת עין",
          transliteration: "ain tahat ain",
          language: "ebraica",
          meaning:
            "ochi pentru ochi. Hotar pus răzbunării, nu învoire la ea."
        },
        {
          original: "משפט אחד יהיה לכם",
          transliteration: "mișpat ehad ihie lahem",
          language: "ebraica",
          meaning:
            "să fie o singură lege pentru voi. Dumnezeu nu are două cântare."
        }
      ],
      crossRefs: ["Matei 5:38-39", "Romani 12:19", "Iacov 2:1-4", "Deuteronomul 1:16-17", "Romani 2:11"],
      forYourHeart:
        "Dreptatea nu se ia în mâna noastră. A fost lăsată în mâna Tatălui."
    },
    {
      verses: [23, 23],
      heading: "Și au făcut cum poruncise Domnul",
      teaching: teaching(
        "Capitolul se încheie cu o singură vorbă: copiii lui Israel au făcut cum poruncise Domnul lui Moise. Ia aminte că nu se spune că au înțeles tot și nu se spune că le-a fost ușor. Se spune numai că au făcut.",
        "Și vezi ce fel de încheiere este aceasta pentru o întâmplare atât de grea. Nu s-a mai adus nicio îndreptățire și nicio lămurire. Se ascultă și când nu se înțelege tot.",
        "Ia seama însă la deosebire: sub așezământul acela ascultarea a cerut o pedeapsă; sub Noul Legământ, ascultarea noastră se arată în altfel de fapte. Nu duce nimeni azi o piatră în mână în numele lui Dumnezeu.",
        "Și ține minte spre ce a mers tot capitolul: candela nu s-a stins, pâinile au rămas pe masă, și lucrarea a mers înainte. În adunarea în care s-a întâmplat un lucru greu, lumina și pâinea nu se opresc."
      ),
      words: [
        {
          original: "ויעשו כאשר צוה יהוה",
          transliteration: "vaiaasu kaașer țiva Domnul",
          language: "ebraica",
          meaning:
            "și au făcut cum poruncise Domnul."
        },
        {
          original: "כאשר צוה את משה",
          transliteration: "kaașer țiva et Moșe",
          language: "ebraica",
          meaning:
            "cum poruncise lui Moise. Nu se spune că au înțeles tot."
        }
      ],
      crossRefs: ["Ioan 14:15", "Iacov 1:22", "Luca 5:5", "Evrei 11:8", "Ioan 8:11"],
      forYourHeart:
        "În adunarea în care s-a întâmplat un lucru greu, lumina și pâinea nu se opresc."
    }
  ],
  prayer:
    "Doamne, ține aprinsă candela în casa Ta și în inima noastră.\n\nMulțumim că numele nostru rămâne înaintea Ta și în zilele în care noi uităm de Tine.\n\nPăzește-ne gura la ceartă și scoate din noi pofta de a ne face singuri dreptate.\n\nȘi fă să fie în mijlocul nostru o singură măsură pentru toți. Amin."
})
