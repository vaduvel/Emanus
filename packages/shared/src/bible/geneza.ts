import type { BibleBook } from "./types.js"

/*
 * Geneza, explicata verset cu verset.
 *
 * Textul biblic: Cornilescu 1924, editia originala (domeniu public).
 * Explicatia: scrisa in intregime pentru Emanus. Nu se copiaza formularea
 * niciunui autor. Faptele istorice si sensurile cuvintelor ebraice provin din
 * cercetare, dar propozitiile sunt ale noastre.
 *
 * Registrul este cel aprobat: asezat, bisericesc, de amvon. Fara jargon.
 */

export const GENEZA: BibleBook = {
  id: "geneza",
  name: "Geneza",
  testament: "vt",
  order: 1,
  blurb:
    "Cartea inceputurilor. Aici afli de unde vine lumea, de unde vii tu, cum s-a rupt totul si cine a fagaduit cel dintai ca va drege ruptura.",
  chapters: [
    {
      id: "geneza-1",
      bookId: "geneza",
      number: 1,
      title: "Geneza 1 — Dumnezeu vorbeste si lumea se face",
      summary:
        "Sase zile in care Dumnezeu ia ceea ce este pustiu si gol, ii da hotare, il umple si il numeste bun. La urma il aseaza pe om acolo, purtand chipul Sau.",
      literaryContext:
        "Capitolul intai nu este o dezbatere, ci o marturie. Este scris asezat, cu formule care se intorc mereu: Dumnezeu a zis, si asa a fost, Dumnezeu a vazut ca lucrul acesta era bun, a fost o seara si apoi o dimineata. Cele sase zile stau in doua siruri de cate trei. In zilele intai, a doua si a treia se fac hotarele: lumina despartita de intuneric, apele despartite de ape, uscatul despartit de mare. In zilele a patra, a cincea si a sasea se umplu aceleasi hotare: luminatorii in cer, pestii si pasarile in apa si in vazduh, fiarele si omul pe uscat. Nu este o randuiala intamplatoare. Se arata astfel ca Dumnezeu nu lucreaza in graba, ci cu socoteala.",
      historicalContext:
        "Israel a primit aceste cuvinte intr-o lume in care fiecare neam avea povestea lui despre inceput. La cei din jur, lumea se nastea din razboi intre dumnezei, iar omul era facut ca sa fie rob si sa duca truda lor. Soarele era un dumnezeu, luna era un dumnezeu, marea era o fiara temuta. Geneza intra in mijlocul acestei lumi si spune altceva: nu este niciun razboi, nu sunt multi dumnezei, nu exista alt inceput decat vointa Unuia singur. Iar omul nu este rob, ci purtator al chipului Sau.",
      status: "in_review",
      units: [
        {
          id: "geneza-1-1",
          ref: "Geneza 1:1",
          heading: "La inceput",
          text: "La inceput, Dumnezeu a facut cerurile si pamantul.",
          teaching:
            "Sa ne oprim aici si sa nu trecem mai departe cu usurinta. Sunt zece cuvinte in randul acesta, si in ele incape tot ce se poate spune despre lume.\n\nIa aminte intai la ce nu se spune. Nu se spune de unde vine Dumnezeu. Nu se aduce nicio dovada ca El este. Sfanta Scriptura nu incepe cu o dovedire, ci cu o marturisire. Cel ce vorbeste era acolo inainte de a fi ceva de vazut, si nu are nevoie sa Se sprijine pe nimic din ceea ce a facut. Cand cineva iti cere astazi sa dovedesti ca Dumnezeu este, adu-ti aminte ca nici Scriptura nu incepe asa. Ea incepe cu El, si de acolo se lamureste tot restul.\n\nIa aminte apoi la cuvantul la inceput. In limba ebraica sta bereșit. Nu inseamna doar ca atunci s-a intamplat ceva. Inseamna ca atunci a inceput timpul insusi. Nu era un ceas care mergea si intr-o zi Dumnezeu a lucrat. Ceasul a inceput sa mearga acolo. Ceea ce a fost mai inainte de randul acesta nu se poate masura in ani, pentru ca anii se nasc aici.\n\nCuvantul a facut este bara. Se cuvine sa fim cinstiti cu textul: cuvantul acesta, in toata Sfanta Scriptura, nu se spune niciodata despre om. Omul cioplește, zidește, tese, insa nu bara niciodata. Omul lucreaza numai cu ce i s-a dat mai inainte. Lemnul il gaseste, lutul il gaseste, cantecul il gaseste in sine. Numai Dumnezeu incepe fara nimic in mana.\n\nSi mai ia aminte la cerurile si pamantul. Evreul nu avea un cuvant pentru tot ce este. Cand voia sa spuna totul, punea cele doua margini una langa alta si intelegea prin ele tot ce se afla intre ele. Asa se spune si astazi: din varf pana in talpa. Deci randul acesta nu vorbeste despre doua locuri, ci despre tot. Nu a ramas nimic pe dinafara.",
          words: [
            {
              original: "בְּרֵאשִׁית",
              transliteration: "bereșit",
              language: "ebraica",
              meaning:
                "la inceput, in capul lucrurilor. Nu un inceput oarecare, ci inceputul de la care se socoteste tot."
            },
            {
              original: "בָּרָא",
              transliteration: "bara",
              language: "ebraica",
              meaning:
                "a face aducand la fiinta. In Sfanta Scriptura, subiectul acestui cuvant este intotdeauna Dumnezeu, niciodata omul."
            },
            {
              original: "אֱלֹהִים",
              transliteration: "Elohim",
              language: "ebraica",
              meaning:
                "Dumnezeu. Forma cuvantului este de mai multi, dar verbul de langa el este intotdeauna de unul singur. Limba insasi pastreaza o taina pe care Noul Testament o va deschide."
            }
          ],
          crossRefs: ["Ioan 1:1-3", "Coloseni 1:16-17", "Evrei 11:3", "Apocalipsa 4:11"],
          forYourHeart:
            "Daca lumea a inceput fiindca Cineva a voit-o, atunci nici tu nu esti aici din intamplare. Cel ce a inceput totul nu a obosit intre timp. Ziua ta de maine nu cade in gol; cade in mainile Aceluia care a facut cerurile si pamantul."
        },
        {
          id: "geneza-1-2",
          ref: "Geneza 1:2",
          heading: "Pustiu si gol",
          text:
            "Pamantul era pustiu si gol; peste fata adancului de ape era intuneric, si Duhul lui Dumnezeu se misca pe deasupra apelor.",
          teaching:
            "Sa luam bine seama la cele doua cuvinte de la inceputul randului. In ebraica ele suna tohu va-vohu si se aud aproape ca o batjocura a golului. Nu inseamna ca nu era nimic. Inseamna ca era ceva, dar fara chip si fara rost. O intindere pe care nu poti sa te asezi si in care nu poti sa traiesti.\n\nAici se vede randuiala intregului capitol. Pamantul era pustiu, adica nu avea forma, si era gol, adica nu avea cine sa-l locuiasca. Cele sase zile raspund la aceste doua lipsuri, pe rand. Zilele intai, a doua si a treia dau forma. Zilele a patra, a cincea si a sasea aduc locuitori. Dumnezeu nu lucreaza la intamplare. El vede intai ce lipseste, si apoi implineste in ordine.\n\nIa aminte la cuvantul se misca. In ebraica sta merahefet, si nu este un cuvant obisnuit. Se mai afla o singura data in toata Legea, in cantarea lui Moise, unde se spune despre vulturul care isi roteste aripile deasupra puilor lui. Aceasta este imaginea. Duhul lui Dumnezeu nu trece pe deasupra apelor ca un vant rece. Sta deasupra lor cum sta pasarea deasupra cuibului, cu grija, aproape, gata sa acopere.\n\nSe cuvine sa fim cinstiti si cu ceea ce randul acesta nu lamureste. Nu ni se spune de ce era pustiu, nici cat a stat asa. Oamenii s-au certat mult pe punctul acesta. Textul insa nu se opreste acolo. El grabeste sa ne spuna un singur lucru: peste pustiu era intuneric, dar deasupra intunericului era Duhul.",
          words: [
            {
              original: "תֹהוּ וָבֹהוּ",
              transliteration: "tohu va-vohu",
              language: "ebraica",
              meaning:
                "fara chip si fara locuitori. Nu neantul, ci intinderea nelucrata, in care inca nu se poate trai."
            },
            {
              original: "רוּחַ",
              transliteration: "ruah",
              language: "ebraica",
              meaning: "duh, suflare, vant. Acelasi cuvant le cuprinde pe toate trei."
            },
            {
              original: "מְרַחֶפֶת",
              transliteration: "merahefet",
              language: "ebraica",
              meaning:
                "a se roti deasupra, cum se roteste pasarea deasupra cuibului ei. A ocroti stand aproape."
            }
          ],
          crossRefs: ["Deuteronom 32:11", "Ieremia 4:23", "Isaia 45:18", "Psalmul 104:30"],
          forYourHeart:
            "Sunt vremuri in viata omului cand launtrul lui seamana cu randul acesta: pustiu, gol si intunecat. Ia aminte ca Duhul lui Dumnezeu nu asteapta sa se faca ordine ca sa Se apropie. El sta deasupra apelor tocmai cand ele sunt inca tulburi. Nu esti parasit fiindca inca nu vezi limpede."
        },
        {
          id: "geneza-1-3-5",
          ref: "Geneza 1:3-5",
          heading: "Ziua intai: lumina",
          text:
            "Dumnezeu a zis: „Să fie lumină!\" Şi a fost lumină. Dumnezeu a văzut că lumina era bună; şi Dumnezeu a despărţit lumina de întunerec. Dumnezeu a numit lumina zi, iar întunerecul l-a numit noapte. Astfel, a fost o seară, şi apoi a fost o dimineaţă: aceasta a fost ziua întîi.",
          teaching:
            "Sa ne oprim asupra felului in care se face lumina. Nu se spune ca Dumnezeu a aprins ceva. Se spune ca a vorbit. Intre porunca Lui si implinirea ei nu este nicio departare, niciun mijloc, nicio unealta. Dumnezeu a zis, si a fost. Cuvantul Lui nu cere ajutor.\n\nIa aminte ca lumina vine in ziua intai, iar soarele abia in ziua a patra. Multi s-au impiedicat aici. Insa textul spune tocmai ce vrea sa spuna: lumina nu vine de la soare, ci de la Dumnezeu. Soarele este numai un vas prin care ea se imparte. Cine intelege lucrul acesta nu se va inchina niciodata soarelui. La sfarsitul Scripturii, in cetatea cea noua, soarele nu mai este de trebuinta, si totusi lumina ramane.\n\nApoi vine cuvantul a despartit. Se aude de mai multe ori in capitolul acesta. Dumnezeu nu face numai lucruri; face si hotare intre ele. Lumina nu inghite intunericul, ci primeste un loc al ei, si intunericul primeste alt loc. Acolo unde totul se amesteca nu se poate trai. Randuiala nu este o ingradire a vietii, ci temelia ei.\n\nSi mai ia aminte la faptul ca Dumnezeu a numit. In lumea de atunci, cel ce dadea numele era stapanul. Cand Dumnezeu numeste ziua si noaptea, El arata ca amandoua Ii stau supuse. Noaptea nu este taramul altcuiva. Are si ea nume dat de El.\n\nSe cuvine sa spunem lamurit si acest lucru: seara vine intai, si apoi dimineata. Ziua evreiasca incepe la asfintit. Asa se face ca in socoteala lui Dumnezeu intunericul nu este sfarsitul, ci inceputul unei zile care merge spre lumina.",
          words: [
            {
              original: "אוֹר",
              transliteration: "or",
              language: "ebraica",
              meaning: "lumina. Cea dintai faptura numita buna."
            },
            {
              original: "בָּדַל",
              transliteration: "badal",
              language: "ebraica",
              meaning:
                "a desparti, a pune hotar. Acelasi cuvant se va folosi mai tarziu pentru despartirea dintre curat si necurat, dintre sfant si de rand."
            }
          ],
          crossRefs: [
            "Psalmul 33:6-9",
            "2 Corinteni 4:6",
            "Ioan 1:4-5",
            "Ioan 8:12",
            "Apocalipsa 21:23"
          ],
          forYourHeart:
            "Acelasi glas care a chemat lumina peste ape poate chema lumina si in launtrul tau. Apostolul spune limpede ca Dumnezeu, care a zis sa lumineze lumina din intuneric, a luminat inimile noastre. Nu ai nevoie sa te faci intai luminos ca sa fii auzit. Ai nevoie sa fii de fata cand El vorbeste."
        },
        {
          id: "geneza-1-6-8",
          ref: "Geneza 1:6-8",
          heading: "Ziua a doua: intinderea",
          text:
            "Dumnezeu a zis: „Să fie o întindere între ape, şi ea să despartă apele de ape.\" Şi Dumnezeu a făcut întinderea, şi ea a despărţit apele cari sînt dedesuptul întinderii de apele cari sînt deasupra întinderii. Şi aşa a fost. Dumnezeu a numit întinderea cer. Astfel, a fost o seară, şi apoi a fost o dimineaţă: aceasta a fost ziua a doua.",
          teaching:
            "Cuvantul talmacit intindere este raqia. El vine de la o radacina care inseamna a bate un metal pana se subtiaza si se lateste. Nu inseamna ca cerul ar fi o tabla, cum au socotit unii. Inseamna ca cerul este intins, larg, boltit peste noi ca un acoperis pe care nu-l poti atinge.\n\nSa luam bine seama la ce se face aici. Se face loc. In ziua intai s-a pus hotar intre lumina si intuneric. Acum se pune hotar intre ape si ape. Dumnezeu scoate un spatiu gol la mijloc, si in golul acela va putea sa sufle vantul, sa zboare pasarea, sa respire omul. Ceea ce noua ni se pare simpla nimica, adica aerul dintre pamant si nor, este de fapt cea dintai incapere facuta pentru vietate.\n\nIa aminte ca ziua a doua este singura despre care nu se spune ca lucrul era bun. Invatatorii evrei au bagat de seama aceasta inca de demult. Cea mai asezata lamurire este ca lucrarea acestei zile nu se sfarseste in ea insasi; apele de dedesubt vor primi randuiala abia a treia zi, si atunci se va spune de doua ori ca lucrul era bun. Dumnezeu nu numeste bun ceea ce este inca la jumatate.\n\nSi se cuvine sa fim cinstiti cu textul: apele acestea infricosau lumea veche. Marea era, la vecinii lui Israel, o fiara neimblanzita. Aici insa apa nu se lupta cu nimeni. Sta acolo unde i s-a spus sa stea.",
          words: [
            {
              original: "רָקִיעַ",
              transliteration: "raqia",
              language: "ebraica",
              meaning:
                "intindere boltita. De la radacina care inseamna a bate si a lati, ca pe o foita de metal."
            }
          ],
          crossRefs: ["Iov 37:18", "Psalmul 19:1", "Psalmul 104:2-3", "Isaia 40:22"],
          forYourHeart:
            "Sunt lucruri in viata ta care par nesfarsite tocmai fiindca sunt la jumatate. Ia aminte ca Dumnezeu nu Se grabeste sa numeasca bun ceea ce inca lucreaza. Nu inseamna ca a plecat. Inseamna ca nu a terminat."
        },
        {
          id: "geneza-1-9-13",
          ref: "Geneza 1:9-13",
          heading: "Ziua a treia: uscatul si samanta",
          text:
            "Dumnezeu a zis: „Să se strîngă la un loc apele cari sînt dedesuptul cerului, şi să se arate uscatul!\" Şi aşa a fost. Dumnezeu a numit uscatul pămînt, iar grămada de ape a numit-o mări. Dumnezeu a văzut că lucrul acesta era bun. Apoi Dumnezeu a zis: „Să dea pămîntul verdeaţă, iarbă cu sămînţă, pomi roditori, cari să facă rod după soiul lor şi cari să aibă în ei sămînţa lor pe pămînt.\" Şi aşa a fost. Pămîntul a dat verdeaţă, iarbă cu sămînţă după soiul ei, şi pomi cari fac rod şi cari îşi au sămînţa în ei, după soiul lor. Dumnezeu a văzut că lucrul acesta era bun. Astfel, a fost o seară, şi apoi a fost o dimineaţă: aceasta a fost ziua a treia.",
          teaching:
            "In ziua aceasta se aude de doua ori ca lucrul era bun, ca si cum s-ar implini si ceea ce ramasese neispravit in ziua trecuta. Apele primesc hotarul lor, uscatul se arata, si indata pamantul incepe sa rodeasca.\n\nIa aminte la o vorba care se repeta: dupa soiul lor. Se spune de patru ori in randurile acestea. Dumnezeu nu face numai vietate, ci face si feluri de vietate, si fiecare fel isi tine randuiala lui. Lumea nu este o gramada, ci o randuiala. Cine se uita cu luare-aminte la o livada vede ca marul da mere si nu da smochine, si asta nu din saracie, ci din asezare.\n\nSi mai ia aminte la samanta. Dumnezeu nu face doar pomul, ci face pomul care poarta in el urmatorul pom. Din ziua a treia, lumea este facuta sa mearga inainte fara sa fie inceputa iarasi. Cel ce a facut la inceput nu trebuie sa refaca in fiecare primavara. A pus in faptura insasi puterea de a se innoi.\n\nSe cuvine sa bagam de seama si aceasta: pamantul da verdeata. Dumnezeu porunceste, si pamantul lucreaza. Nu fiindca pamantul ar avea putere de la sine, ci fiindca asa a randuit El, sa lucreze prin cele facute. Este intaiul semn ca Dumnezeu nu Se sfieste sa lucreze prin unelte.",
          words: [
            {
              original: "מִין",
              transliteration: "min",
              language: "ebraica",
              meaning: "soi, fel. Hotarul launtric dupa care fiecare faptura isi da rodul ei."
            },
            {
              original: "זֶרַע",
              transliteration: "zera",
              language: "ebraica",
              meaning: "samanta, si totodata urmasii. Acelasi cuvant va suna in fagaduintele facute lui Avraam."
            }
          ],
          crossRefs: ["Iov 38:8-11", "Psalmul 104:5-9", "Ieremia 5:22", "Galateni 6:7"],
          forYourHeart:
            "Dumnezeu a pus in samanta rodul care nu se vede inca. Asa lucreaza El si cu omul. Ceea ce se seamana astazi in ascuns, in rugaciune si in ascultare, are in el rodul de maine. Nu cere sa vezi pomul in ziua in care ai ingropat samanta."
        },
        {
          id: "geneza-1-14-19",
          ref: "Geneza 1:14-19",
          heading: "Ziua a patra: luminatorii",
          text:
            "Dumnezeu a zis: „Să fie nişte luminători în întinderea cerului, ca să despartă ziua de noapte; ei să fie nişte semne cari să arate vremile, zilele şi anii; şi să slujească de luminători în întinderea cerului, ca să lumineze pămîntul.\" Şi aşa a fost. Dumnezeu a făcut cei doi mari luminători, şi anume: luminătorul cel mai mare ca să stăpînească ziua, şi luminătorul cel mai mic ca să stăpînească noaptea; a făcut şi stelele. Dumnezeu i-a aşezat în întinderea cerului, ca să lumineze pămîntul, să stăpînească ziua şi noaptea, şi să despartă lumina de întunerec. Dumnezeu a văzut că lucrul acesta era bun. Astfel, a fost o seară, şi apoi a fost o dimineaţă: aceasta a fost ziua a patra.",
          teaching:
            "Sa ne oprim aici, fiindca este unul din locurile in care textul loveste tacut in idolii lumii de atunci.\n\nIa aminte ca nu se spune soare si nu se spune luna. Se spune luminatorul cel mai mare si luminatorul cel mai mic. Nu este o scapare. In limbile din jur, numele soarelui si al lunii erau numele unor dumnezei. Sfanta Scriptura nu le rosteste. Le zice pe nume dupa slujba pe care o fac, ca si cum ar spune: acestea nu sunt fete carora sa te inchini, ci felinare puse in cer.\n\nSi mai ia aminte la cele patru cuvinte prin care se spune ce fac ele. Despart, arata vremurile, lumineaza, stapanesc. Toate patru sunt slujbe primite, nu puteri avute. Chiar si cuvantul stapaneasca este dat, nu luat. Cerul intreg lucreaza sub porunca.\n\nApoi vine o vorba scurta, aruncata parca la o parte: a facut si stelele. Neamurile de atunci isi citeau soarta in stele, isi randuiau razboaiele dupa ele, se temeau de ele. Iar Moise le pomeneste in trei cuvinte, la coada randului. Nu din nebagare de seama, ci fiindca asa este masura lor fata de Cel ce le-a facut.\n\nSe cuvine sa spunem si ce nu spune textul. Nu ni se lamureste cum stau la un loc ziua intai, cu lumina ei, si ziua a patra, cu luminatorii. Oamenii credinciosi au dat mai multe raspunsuri de-a lungul vremii. Textul insa nu se ostenește sa raspunda, fiindca nu despre asta vrea sa ne invete. Vrea sa ne invete cine porunceste soarelui.",
          words: [
            {
              original: "מְאֹרֹת",
              transliteration: "meorot",
              language: "ebraica",
              meaning:
                "purtatori de lumina, luminatori. Acelasi cuvant se foloseste pentru candelele din cortul intalnirii."
            },
            {
              original: "מוֹעֲדִים",
              transliteration: "moadim",
              language: "ebraica",
              meaning:
                "vremuri randuite. Nu doar anotimpuri, ci si sarbatorile hotarate ale Domnului."
            }
          ],
          crossRefs: [
            "Deuteronom 4:19",
            "Psalmul 8:3-4",
            "Psalmul 136:7-9",
            "Ieremia 10:2",
            "Iov 9:7-9"
          ],
          forYourHeart:
            "Tot ce sta astazi mare inaintea ochilor tai si iti hotaraste linistea a fost facut de Cel caruia I te rogi. Ce te tine treaz noaptea nu este mai mare decat El. El le-a asezat pe toate in cer si le-a spus la ce sa slujeasca."
        },
        {
          id: "geneza-1-20-23",
          ref: "Geneza 1:20-23",
          heading: "Ziua a cincea: apele si vazduhul se umplu",
          text:
            "Dumnezeu a zis: „Să mişune apele de vieţuitoare, şi să sboare păsări deasupra pămîntului pe întinderea cerului.\" Dumnezeu a făcut peştii cei mari şi toate vieţuitoarele cari se mişcă şi de cari mişună apele, după soiurile lor; a făcut şi orice pasăre înaripată după soiul ei. Dumnezeu a văzut că erau bune. Dumnezeu le-a binecuvîntat, şi a zis: „Creşteţi, înmulţiţi-vă, şi umpleţi apele mărilor; să se înmulţească şi păsările pe pămînt\". Astfel a fost o seară, şi apoi a fost o dimineaţă: aceasta a fost ziua a cincea.",
          teaching:
            "Aici incep sa se umple incaperile facute mai inainte. Apele de dedesubt si intinderea cerului primesc locuitori.\n\nIa aminte la cuvantul talmacit petii cei mari. In ebraica sta tanninim, si nu inseamna simplu peste. Este cuvantul pentru dihaniile cele mari ale adancului, fapturile de care se temea lumea veche si pe care neamurile le socoteau puteri potrivnice dumnezeilor. Sfanta Scriptura le pune intre celelalte lucruri facute, la rand cu pasarile, si adauga ca erau bune. Nimic din adanc nu sta in afara stapanirii Lui.\n\nApoi apare intaia oara in Scriptura cuvantul a binecuvantat. Sa luam bine seama: cea dintai binecuvantare din Biblie nu se da omului, ci vietuitoarelor. Iar binecuvantarea nu este o vorba frumoasa; este o putere data, puterea de a creste si de a umple. A binecuvanta, in Sfanta Scriptura, inseamna a face pe cineva in stare de rod.\n\nSe cuvine sa bagam de seama ca Dumnezeu nu voieste o lume goala. De trei ori in randurile acestea se aude porunca de a umple. Golul nu este starea pe care o iubeste El.",
          words: [
            {
              original: "תַּנִּינִם",
              transliteration: "tanninim",
              language: "ebraica",
              meaning:
                "dihaniile cele mari ale apelor. Cuvant folosit in alte parti pentru fiara adancului de care se temeau neamurile."
            },
            {
              original: "בָּרַךְ",
              transliteration: "barak",
              language: "ebraica",
              meaning: "a binecuvanta; a da putere de rod si de crestere."
            }
          ],
          crossRefs: ["Psalmul 104:24-26", "Iov 41:1-11", "Isaia 27:1", "Matei 6:26"],
          forYourHeart:
            "Cel ce hraneste pasarile cerului si stapaneste dihaniile adancului stie de tine. Domnul Isus Insusi a aratat spre pasari cand a vrut sa scoata grija din inima ucenicilor. Uita-te la ele si intreaba-te daca nu cumva pretuiesti mai mult."
        },
        {
          id: "geneza-1-24-25",
          ref: "Geneza 1:24-25",
          heading: "Ziua a sasea: fapturile uscatului",
          text:
            "Dumnezeu a zis: „Să dea pămîntul vieţuitoare după soiul lor, vite, tîrîtoare şi fiare pămînteşti, după soiul lor.\" Şi aşa a fost. Dumnezeu a făcut fiarele pămîntului după soiul lor, vitele după soiul lor şi toate tîrîtoarele pămîntului după soiul lor. Dumnezeu a văzut că erau bune.",
          teaching:
            "Ziua a sasea incepe fara zarva. Se umple uscatul, asa cum s-au umplut apele si vazduhul in ziua trecuta.\n\nIa aminte ca omul si dobitoacele sunt facute in aceeasi zi. Nu i se da omului o zi a lui deosebita. Sta pe acelasi pamant, este facut din acelasi tarana, respira acelasi aer. Sfanta Scriptura nu-l ridica pe om desprinzandu-l de faptura. Il aseaza in mijlocul ei, si abia apoi ii da ceva ce nimic altceva nu are.\n\nSi iarasi se aude dupa soiul lor, de trei ori. Randuiala tine pana la capat.",
          crossRefs: ["Psalmul 50:10-11", "Psalmul 145:15-16", "Proverbe 12:10"],
          forYourHeart:
            "Faptul ca esti facut din tarana, in aceeasi zi cu dobitoacele, nu este o injosire. Este o aducere aminte. Cel ce se stie tarana nu se mai poarta ca si cum ar fi Dumnezeu."
        },
        {
          id: "geneza-1-26-28",
          ref: "Geneza 1:26-28",
          heading: "Omul, dupa chipul lui Dumnezeu",
          text:
            "Apoi Dumnezeu a zis: „Să facem om după chipul Nostru, după asemănarea Noastră; el să stăpînească peste peştii mării, peste păsările cerului, peste vite, peste tot pămîntul şi peste toate tîrîtoarele cari se mişcă pe pămînt.\" Dumnezeu a făcut pe om după chipul Său, l-a făcut după chipul lui Dumnezeu; parte bărbătească şi parte femeiască i-a făcut. Dumnezeu i-a binecuvîntat, şi Dumnezeu le-a zis: „Creşteţi, înmulţiţi-vă, umpleţi pămîntul, şi supuneţi-l; şi stăpîniţi peste peştii mării, peste păsările cerului, şi peste orice vieţuitoare care se mişcă pe pămînt.\"",
          teaching:
            "Sa ne oprim aici mai mult decat oriunde in capitolul acesta.\n\nIa aminte intai la schimbarea glasului. Pana acum s-a spus de fiecare data sa fie. Acum se spune sa facem. Nu mai este o porunca aruncata catre faptura, ci o sfatuire launtrica. Unii au socotit ca Dumnezeu vorbeste cu ingerii, insa omul nu este facut dupa chipul ingerilor. Cei mai multi dintre credinciosi au vazut aici cel dintai licar din ceea ce Noul Testament va spune deschis: ca Dumnezeu nu este singur in Sine.\n\nApoi vin cele doua cuvinte grele. Chip este țelem, si inseamna statuie, infatisare cioplita, ceva pus undeva ca sa arate pe altcineva. In lumea veche, imparatul care cucerea o tara aseza in ea chipul lui de piatra, ca sa se stie a cui este acea tara. Sfanta Scriptura spune ca Dumnezeu a asezat pe pamant un chip al Sau, si acela este omul. Nu de piatra, ci viu.\n\nAsemanare este demut, si mai domoleste putin cuvantul dintai, ca sa nu socotim ca omul ar fi la fel cu Dumnezeu. Este asemenea, nu deopotriva.\n\nSi acum sa luam bine seama la un lucru pe care lumea de atunci nu-l spunea niciodata: parte barbateasca si parte femeiasca i-a facut. La celelalte neamuri, chipul dumnezeului era imparatul, si numai el. Aici, chipul lui Dumnezeu este omul, tot omul, barbat si femeie deopotriva. Nu este scris ca barbatul poarta chipul si femeia il poarta prin barbat. Amandoi il poarta, in acelasi rand al Scripturii.\n\nRamane cuvantul stapaniti. In ebraica sunt doua cuvinte tari, radah si kabaș, si se cuvine sa fim cinstiti: sunt cuvinte de domnie. Insa domnia se masoara dupa Cel al carui chip il porti. Un imparat rau jefuieste tara pe care o are in mana. Cel ce stapaneste in numele lui Dumnezeu ingrijeste. Cine se poarta cu faptura ca un pradator nu-si implineste porunca, ci si-o calca.",
          words: [
            {
              original: "צֶלֶם",
              transliteration: "țelem",
              language: "ebraica",
              meaning:
                "chip, infatisare asezata. In lumea veche, chipul imparatului pus intr-o tara arata cui apartine acea tara."
            },
            {
              original: "דְּמוּת",
              transliteration: "demut",
              language: "ebraica",
              meaning: "asemanare. Omul este asemenea lui Dumnezeu, nu deopotriva cu El."
            },
            {
              original: "רָדָה",
              transliteration: "radah",
              language: "ebraica",
              meaning:
                "a stapani, a domni. Se spune si despre imparat. Felul domniei se judeca dupa Cel in numele caruia se domneste."
            }
          ],
          crossRefs: [
            "Geneza 9:6",
            "Psalmul 8:4-8",
            "Iacov 3:9",
            "Coloseni 1:15",
            "Coloseni 3:10",
            "2 Corinteni 4:4"
          ],
          forYourHeart:
            "Pretul tau nu sta in ce ai izbutit, nici in ce spun oamenii despre tine. Sta in Cel al carui chip il porti. De aceea nici nu-l poti pierde cand gresesti, si nici nu-l poti castiga cand te straduiesti. Iar daca omul de langa tine poarta acelasi chip, atunci felul in care ii vorbesti nu este un lucru marunt."
        },
        {
          id: "geneza-1-29-31",
          ref: "Geneza 1:29-31",
          heading: "Foarte bun",
          text:
            "Şi Dumnezeu a zis: „Iată că v'am dat orice iarbă care face sămînţă şi care este pe faţa întregului pămînt, şi orice pom, care are în el rod cu sămînţă: aceasta să fie hrana voastră.\" Iar tuturor fiarelor pămîntului, tuturor păsărilor cerului, şi tuturor vietăţilor cari se mişcă pe pămînt, cari au în ele o suflare de viaţă, le-am dat ca hrană toată iarba verde.\" Şi aşa a fost. Dumnezeu S'a uitat la tot ce făcuse; şi iată că erau foarte bune. Astfel a fost o seară, şi apoi a fost o dimineaţă: aceasta a fost ziua a şasea. Wordproject® is a registered name of the International Biblical Association, a non-profit organization registered in Macau, China. Contact | Disclaimer | Statement of Faith | Mission |",
          teaching:
            "La sfarsit, Dumnezeu da hrana. Ia aminte ca nu porunceste omului sa si-o smulga singur. I-o pune inainte. Lumea nu este un loc in care trebuie sa te lupti pentru fiecare imbucatura; asa va ajunge dupa cadere, dar nu asa a fost facuta.\n\nApoi vine randul cel mai cuprinzator din tot capitolul. Pana acum s-a spus de sase ori ca lucrul era bun. Acum se spune altfel. In ebraica sta tov meod, foarte bun, si nu se mai spune despre o parte, ci despre tot ce facuse, laolalta. Fiecare lucru era bun in sine; toate impreuna erau mai mult decat suma lor.\n\nSe cuvine sa fim cinstiti cu ceea ce urmeaza. Peste doua capitole, lumea aceasta se rupe. Insa Scriptura a avut grija sa aseze intai randul de fata. Raul nu este de la inceput. Nu este parte din faptura. A intrat. Iar ceea ce a intrat poate fi scos afara.\n\nDe aceea, cand Sfanta Scriptura vorbeste mai tarziu despre mantuire, nu vorbeste despre fuga din lume, ci despre dregerea ei. Cerul nou si pamantul nou nu sunt altceva decat ceea ce s-a spus aici, adus inapoi la cuvantul foarte bun.",
          words: [
            {
              original: "טוֹב מְאֹד",
              transliteration: "tov meod",
              language: "ebraica",
              meaning:
                "foarte bun. Nu doar fara cusur, ci implinit, potrivit intru totul cu ceea ce a fost menit sa fie."
            }
          ],
          crossRefs: [
            "Geneza 3:17-19",
            "Romani 8:20-22",
            "1 Timotei 4:4",
            "Apocalipsa 21:1-5"
          ],
          forYourHeart:
            "Ai fost facut pentru o lume care era foarte buna. De aceea te doare atat de tare cand ceva se strica. Durerea aceea nu este slabiciune; este aducerea aminte a unei randuieli pe care ai pierdut-o si pe care Dumnezeu a fagaduit ca o va aduce inapoi."
        }
      ],
      prayer:
        "Doamne Dumnezeule, Cel ce ai facut cerurile si pamantul, si Care nu ai avut nevoie de nimic in mana ca sa incepi: Iti multumim ca lumea aceasta nu s-a facut singura si ca nici viata noastra nu merge singura.\n\nTu ai vazut pustiul si nu Te-ai indepartat de el; Duhul Tau statea deasupra apelor. Vino si peste ceea ce este inca fara chip in noi. Zi si acolo sa fie lumina.\n\nInvata-ne sa purtam cu cinste chipul Tau, sa nu-l dispretuim in noi si sa nu-l calcam in altii. Da-ne sa pretuim randuiala Ta si sa nu ne temem de intuneric, stiind ca si noaptea are nume de la Tine.\n\nSi cand privim in jur la ce s-a stricat, adu-ne aminte ca raul a intrat mai tarziu si ca Tu ai fagaduit sa faci toate lucrurile noi. Amin."
    }
  ]
}
