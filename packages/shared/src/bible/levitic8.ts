import { leviticChapter, teaching } from "./leviticHelpers.js"

/*
 * Cartea Levitic, explicată pe unități de sens.
 *
 * Textul biblic: păstrat separat în leviticText.ts (fișierele leviticTextN.ts).
 * Explicația: scrisă pentru Emanus după cercetarea textului. Nu se copiază
 * formularea niciunui predicator sau comentator.
 */

export const LEVITIC_8 = leviticChapter({
  number: 8,
  title: "Levitic 8 — Cine îl pune pe om în slujbă",
  summary:
    "După șapte capitole de rânduieli, cartea trece la o zi anume. Moise adună toată adunarea la ușa cortului și face înaintea ochilor tuturor ce i s-a poruncit: îi spală cu apă pe Aaron și pe fiii lui, îi îmbracă, unge cortul, altarul și pe marele preot, apoi aduce un vițel pentru păcat, un berbec ca ardere de tot și un al doilea berbec, al punerii în slujbă. Din sângele celui din urmă pune pe vârful urechii drepte, pe degetul cel mare al mâinii drepte și pe degetul cel mare al piciorului drept. La sfârșit, preoții rămân șapte zile la ușa cortului, fără să iasă.",
  literaryContext:
    "Ia aminte că aici se schimbă felul vorbirii. Până acum cartea spunea „dacă cineva aduce” și „să facă așa”; de la capitolul acesta încolo se povestește ce s-a făcut, într-o zi anume. Rânduiala trece în faptă. Și vezi ce se repetă de mai multe ori: cum poruncise Domnul lui Moise. Nu se laudă nici Moise, nici Aaron; se însemnează doar că nu s-a adăugat și nu s-a scos nimic. Ce s-a poruncit în Exod, la muntele Sinai, se împlinește aici punct cu punct.",
  historicalContext:
    "La popoarele din jur, preoția se moștenea sau se cumpăra, iar preoții se puneau ei înșiși în slujbă, cu descantări și cu semne tainice, departe de ochii oamenilor. Aici totul se face la ușa cortului, înaintea întregii adunări, și nu se pune în slujbă nimeni singur: Moise, care nu era preot, este cel care spală, îmbracă și unge. Untdelemnul de ungere avea o rețetă dată dinainte și era oprit să fie făcut pentru vreo altă folosință. Cele șapte zile de rămas la cort erau și o despărțire de viața de mai înainte: șapte zile în care omul nu se mai întorcea la casa lui.",
  units: [
    {
      verses: [1, 5],
      heading: "La ușa cortului, înaintea tuturor",
      teaching: teaching(
        "Moise ia untdelemnul, jertfele și hainele și adună toată adunarea la ușa cortului. Ia aminte unde se face lucrul acesta: nu înăuntru, ci la ușă, înaintea ochilor tuturor. Cine este pus în slujbă în taină nu are cine să-l cerceteze mai târziu.",
        "Și vezi cine face punerea în slujbă: nu Aaron pe sine însuși, ci Moise, care nu era preot. Nimeni nu se pune singur în slujba lui Dumnezeu. Cine se ridică el însuși într-un loc de slujire și-a luat ceea ce nu i s-a dat.",
        "Ia seama și la cuvintele de început: acesta este lucrul pe care a poruncit Domnul să-l facem. Moise nu spune „acesta este lucrul pe care l-am gândit”. Nu era ceremonia lui și nu era ziua lui. Slujba nu se face după cum ni se pare frumos.",
        "Și ține minte că poporul a fost chemat să vadă. Nu era o adunare de bărbați aleși, ci toată adunarea. Cine slujește răspunde înaintea lui Dumnezeu, dar și înaintea oamenilor care l-au văzut pus în slujbă.",
      ),
      words: [
        {
          original: "הקהל את כל העדה",
          transliteration: "hakhel et kol haeda",
          language: "ebraica",
          meaning:
            "adună toată adunarea. Nu o mână de oameni aleși: tot poporul a fost chemat să vadă.",
        },
        {
          original: "אל פתח אהל מועד",
          transliteration: "el petah ohel moed",
          language: "ebraica",
          meaning:
            "la ușa cortului întâlnirii. Punerea în slujbă nu s-a făcut în taină.",
        },
        {
          original: "זה הדבר אשר צוה יהוה",
          transliteration: "ze hadavar așer țiva YHWH",
          language: "ebraica",
          meaning:
            "acesta este lucrul pe care l-a poruncit Domnul. Nu era ziua lui Moise și nu era rânduiala lui.",
        },
      ],
      crossRefs: ["Evrei 5:4", "Fapte 6:5-6", "1 Timotei 3:7", "Exod 29:4", "Numeri 16:8-10"],
      forYourHeart:
        "Nimeni nu se pune singur în slujba lui Dumnezeu. Cine te-a așezat în ce faci?",
    },
    {
      verses: [6, 13],
      heading: "Spălat cu apă, îmbrăcat și uns",
      teaching: teaching(
        "Întâi i-a spălat cu apă, apoi i-a îmbrăcat, apoi a turnat untdelemnul. Ia aminte la ordine și nu o schimba: nimeni nu primește haina slujbei înainte de a fi spălat, și nimeni nu primește ungerea înainte de a purta haina. Cine sare peste spălare va purta haine curate peste o viață necurățită.",
        "Și vezi că nu s-a spălat singur: a fost spălat. Nu s-a îmbrăcat singur: a fost îmbrăcat. Tot ce era pe el în ziua aceea venea din mâna altcuiva. Nu avem nimic al nostru în slujba lui Dumnezeu, nici curățirea, nici îmbrăcămintea, nici puterea.",
        "Ia seama că s-a uns întâi cortul și altarul, și abia apoi omul. Locul și uneltele au fost puse deoparte înaintea celui care avea să slujească în ele. Nu omul sfințește lucrarea; lucrarea era a lui Dumnezeu și înainte de a intra el în ea.",
        "Și ține minte că ungerea aceasta nu se imită. Untdelemnul avea o rețetă dată de Dumnezeu și era oprit să fie făcut pentru altceva. Mai târziu, un om a vrut să cumpere cu bani puterea Duhului și a fost mustrat greu. Ce dă Dumnezeu nu se cumpără și nu se face acasă.",
      ),
      words: [
        {
          original: "וירחץ אתם במים",
          transliteration: "vairhaț otam bamaim",
          language: "ebraica",
          meaning:
            "și i-a spălat cu apă. Nu s-au spălat singuri: au fost spălați.",
        },
        {
          original: "שמן המשחה",
          transliteration: "șemen hamișha",
          language: "ebraica",
          meaning:
            "untdelemnul ungerii. Avea o rețetă dată de Dumnezeu și nu se făcea pentru alte folosințe.",
        },
        {
          original: "ויקדש אתם",
          transliteration: "vaikadeș otam",
          language: "ebraica",
          meaning:
            "și le-a sfințit. Cortul și uneltele au fost puse deoparte înaintea omului.",
        },
      ],
      crossRefs: ["Tit 3:5", "Isaia 61:10", "Fapte 8:18-21", "Exod 30:31-33", "1 Ioan 2:27"],
      forYourHeart:
        "Nu avem nimic al nostru în slujire: nici curățirea, nici haina, nici puterea. Ce ai primit tu?",
    },
    {
      verses: [14, 17],
      heading: "Cel care va sluji aduce întâi pentru păcatul lui",
      teaching: teaching(
        "Întâia jertfă din ziua aceea a fost un vițel pentru păcat, și Aaron cu fiii lui și-au pus mâinile pe capul lui. Ia aminte cine avea nevoie întâi de ispășire: nu poporul, ci preoții. Înainte de a putea sluji pentru alții, au avut nevoie să fie iertați ei înșiși.",
        "Și vezi cât de departe este lucrul acesta de închipuirea noastră despre cei puși în față. Nu au fost aleși fiindcă erau mai buni. Cel dintâi lucru pe care l-a făcut Aaron în slujba lui a fost să-și pună mâna peste un animal care murea pentru păcatul lui.",
        "Ia seama unde s-a dus vițelul: carnea, pielea și băligărele au fost arse afară din tabără. Se păstrează rânduiala din capitolul al patrulea. Și tot afară din tabără a fost dus Domnul Iisus, ca să ne sfințească pe noi cu sângele Lui.",
        "Și ține minte deosebirea, fiindcă este mare: Aaron a avut nevoie de o jertfă pentru sine, în fiecare an, toată viața. Marele nostru Preot n-a avut nevoie de niciuna. Iată de ce preoția Lui nu se moștenește și nu se înlocuiește.",
      ),
      words: [
        {
          original: "פר החטאת",
          transliteration: "par hahatat",
          language: "ebraica",
          meaning:
            "vițelul pentru păcat. Întâia jertfă a zilei a fost pentru păcatul preoților.",
        },
        {
          original: "ויסמכו את ידיהם",
          transliteration: "vaismehu et iedeihem",
          language: "ebraica",
          meaning:
            "și și-au pus mâinile. Cel dintâi lucru al slujbei a fost mărturisirea propriului păcat.",
        },
        {
          original: "מחוץ למחנה",
          transliteration: "mihuț lamahane",
          language: "ebraica",
          meaning:
            "afară din tabără. Acolo s-a ars vițelul; acolo a fost dus și Domnul.",
        },
      ],
      crossRefs: ["Evrei 7:26-27", "Evrei 13:11-13", "Levitic 4:11-12", "Evrei 5:2-3", "Fapte 10:26"],
      forYourHeart:
        "Cine slujește altora are nevoie întâi de iertare pentru sine. Ai stat tu întâi în locul acela?",
    },
    {
      verses: [18, 21],
      heading: "Berbecul ars întreg",
      teaching: teaching(
        "A doua jertfă a fost un berbec adus ca ardere de tot, tăiat în bucăți, spălat și ars întreg pe altar. Ia aminte că nu s-a păstrat nimic. După iertare vine dăruirea. Cine a fost iertat nu rămâne la iertare; se dă întreg.",
        "Și vezi ce s-a făcut înainte de a fi pus pe foc: bucățile au fost spălate. Nu se punea nimic nespălat pe altar. Nu se cade să socotim că, dacă un lucru se dă lui Dumnezeu, nu mai are nevoie de curățenie. Se dă întreg și se dă curat.",
        "Ia seama că arderea de tot vine după jertfa pentru păcat, și nu înaintea ei. Nu se începe cu dăruirea. Cine vrea să se dea lui Dumnezeu înainte de a primi iertarea Lui va munci mult și va rămâne tot neliniștit.",
        "Și ține minte cum se numește totul aici: un miros plăcut Domnului. Nu era plăcut fumul; era plăcută ascultarea. Și tot așa se va spune despre Cel care S-a dat pe Sine pentru noi, ca un dar de bun miros.",
      ),
      words: [
        {
          original: "איל העלה",
          transliteration: "ail haola",
          language: "ebraica",
          meaning:
            "berbecul arderii de tot. Ars întreg: după iertare vine dăruirea.",
        },
        {
          original: "רחץ במים",
          transliteration: "rahaț bamaim",
          language: "ebraica",
          meaning:
            "spălat cu apă. Nu se punea nimic nespălat pe altar.",
        },
        {
          original: "ריח ניחוח",
          transliteration: "reah nihoah",
          language: "ebraica",
          meaning:
            "miros plăcut. Nu fumul era plăcut, ci ascultarea.",
        },
      ],
      crossRefs: ["Romani 12:1", "Efeseni 5:2", "1 Samuel 15:22", "Levitic 1:9", "Filipeni 4:18"],
      forYourHeart:
        "Nu se începe cu dăruirea, ci cu iertarea. Ai primit-o, înainte de a te osteni?",
    },
    {
      verses: [22, 30],
      heading: "Sânge pe ureche, pe mână și pe picior",
      teaching: teaching(
        "Din sângele celui de al doilea berbec, Moise a pus pe vârful urechii drepte a lui Aaron, pe degetul cel mare al mâinii drepte și pe degetul cel mare al piciorului drept. Ia aminte ce a fost însemnat: auzul, lucrul mâinilor și drumul picioarelor. Nu i-a fost însemnat capul, ca să se știe că este mai mare; i-au fost însemnate părțile cu care se ascultă, se muncește și se merge.",
        "Și vezi ce fel de om era cerut pentru slujba aceea: unul care aude întâi, apoi face, apoi merge. Trei lucruri, în această ordine. Cine începe cu mâinile și cu drumurile, fără să fi ascultat, se va osteni pentru nimic.",
        "Ia seama că același lucru s-a făcut și fiilor lui, nu numai lui Aaron. Nu era o însemnare pentru cel mai mare, ci pentru toți cei care slujeau. Și noi toți suntem numiți o preoție sfântă; deci însemnarea aceasta ne privește pe toți.",
        "Și ține minte că la sfârșit Moise a stropit și untdelemn și sânge peste ei și peste hainele lor. Sângele și untdelemnul au fost puse împreună. Nu se poate una fără cealaltă: iertarea fără putere lasă omul slab, iar puterea fără iertare îl face primejdios.",
      ),
      words: [
        {
          original: "איל המלאים",
          transliteration: "ail hamiluim",
          language: "ebraica",
          meaning:
            "berbecul punerii în slujbă; la cuvânt, al umplerii mâinilor. Slujba începe cu mâini umplute de altcineva.",
        },
        {
          original: "תנוך אזן",
          transliteration: "tenuh ozen",
          language: "ebraica",
          meaning:
            "vârful urechii. Cel dintâi loc însemnat cu sânge a fost auzul.",
        },
        {
          original: "בהן יד ובהן רגל",
          transliteration: "bohen iad uvohen regel",
          language: "ebraica",
          meaning:
            "degetul cel mare al mâinii și al piciorului. Lucrul mâinilor și drumul picioarelor.",
        },
        {
          original: "מן השמן ומן הדם",
          transliteration: "min hașemen umin hadam",
          language: "ebraica",
          meaning:
            "din untdelemn și din sânge. Puse împreună: nu se poate una fără cealaltă.",
        },
      ],
      crossRefs: ["1 Petru 2:9", "Iacov 1:22", "Isaia 50:4-5", "Romani 10:15", "Exod 29:20"],
      forYourHeart:
        "Auzul, mâinile și picioarele au fost însemnate, în această ordine. Cu care începi tu?",
    },
    {
      verses: [31, 36],
      heading: "Șapte zile fără să iasă pe ușă",
      teaching: teaching(
        "La sfârșit, Moise le-a spus să fiarbă carnea la ușa cortului și să o mănânce acolo, și să nu iasă din cort șapte zile. Ia aminte că punerea în slujbă nu s-a sfârșit într-o zi. Apte zile de așteptare, în care nu se făcea nimic mare și nu se vedea nimic.",
        "Și vezi ce învață zilele acestea. Un om pus într-o slujbă vrea să înceapă îndată. Dumnezeu îl ține întâi pe loc. Ce se pune la o parte pentru El nu se grăbește; întâi stă lângă El, și abia pe urmă lucrează pentru El.",
        "Ia seama la vorba grea de la sfârșit: să păziți ce a poruncit Domnul, ca să nu muriți. Nu era o amenințare aruncată la întâmplare; capitolul care urmează va arăta ce s-a întâmplat când doi dintre fiii lui Aaron au adus înaintea Domnului un foc care nu le fusese poruncit.",
        "Și ține minte cum se încheie capitolul: Aaron și fiii lui au făcut toate lucrurile pe care le poruncise Domnul prin Moise. Cel din urmă cuvânt nu este despre haine, nici despre untdelemn, ci despre ascultare. Iar ascultarea aceasta a fost ținută șapte zile, înainte de a fi văzută de cineva.",
      ),
      words: [
        {
          original: "שבעת ימים",
          transliteration: "șivat iamim",
          language: "ebraica",
          meaning:
            "șapte zile. Punerea în slujbă nu s-a sfârșit într-o zi.",
        },
        {
          original: "לא תצאו",
          transliteration: "lo tețeu",
          language: "ebraica",
          meaning:
            "să nu ieșiți. Șapte zile în care nu se făcea nimic văzut de oameni.",
        },
        {
          original: "ושמרתם את משמרת יהוה",
          transliteration: "ușmartem et mișmeret YHWH",
          language: "ebraica",
          meaning:
            "să păziți ce a poruncit Domnul. Cel din urmă cuvânt al capitolului este despre ascultare.",
        },
      ],
      crossRefs: ["Fapte 1:4", "Luca 24:49", "Levitic 10:1-2", "Marcu 3:14", "Psalmi 27:14"],
      forYourHeart:
        "Dumnezeu ține pe loc înainte de a trimite. Poți tu să stai șapte zile fără să faci nimic văzut?",
    },
  ],
  prayer:
    "Doamne, nu ne lăsa să ne punem singuri în slujbe pe care nu ni le-ai dat.\n\nSpală-ne întâi, și abia apoi ne îmbracă.\n\nÎnsemnează-ne auzul înaintea mâinilor și a drumurilor.\n\nDă-ne răbdare să stăm lângă Tine înainte de a lucra pentru Tine. Amin."
})
