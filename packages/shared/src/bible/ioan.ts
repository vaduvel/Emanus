import type { BibleBook } from "./types.js"

/*
 * Ioan, explicata verset cu verset.
 *
 * Textul biblic: Cornilescu, editia corectata (RCCV, domeniu public).
 * Explicatia: scrisa in intregime pentru Emanus. Nu se copiaza formularea
 * niciunui autor. Cercetam din surse, dar propozitiile sunt ale noastre.
 *
 * Sursa video principala pentru aceasta carte: Zac Poonen, verse by verse.
 * Allen Nolan ramane sursa secundara, mai ales in locurile despre Cuvantul.
 *
 * Registrul este cel aprobat: asezat, bisericesc, de amvon. Fara jargon.
 */

export const IOAN: BibleBook = {
  id: "ioan",
  name: "Ioan",
  testament: "nt",
  order: 43,
  blurb:
    "Evanghelia dupa Ioan arata, cu o limpezime deosebita, cine este Domnul Isus: Cuvantul facut trup, Fiul lui Dumnezeu, Mielul lui Dumnezeu, Painea vietii, Lumina lumii, Usa oilor, Pastorul cel bun, Invierea si Viata, Calea, Adevarul si Viata, Vita cea adevarata. Dintre cele patru Evanghelii, aceasta se opreste mult asupra semnelor si asupra cuvintelor prin care slava Lui se face vazuta.\n\nIoan nu strange doar intamplari, ci le alege si le aseaza cu grija, ca sa ne duca la o singura marturisire: Isus este Hristosul, Fiul lui Dumnezeu, si crezand sa avem viata in Numele Lui. Cartea merge de la marturia lui Ioan Botezatorul la cruce, la mormantul gol si la restaurarea lui Petru, iar pe tot drumul acesta se aude aceeasi chemare: vino si vezi, ramai, crede, urmeaza.\n\nIn scrierea acestei carti se cere multa masura, pentru ca Ioan vorbeste despre nasterea din Dumnezeu, despre viata vesnica, despre lucrarea Duhului Sfant, despre unirea cu Hristos si despre dragostea Tatalui. Tocmai de aceea, fiecare capitol va ramane `in_review` pana la citirea finala umana.",
  chapters: [
    {
      id: "ioan-1",
      bookId: "ioan",
      number: 1,
      title: "Ioan 1 — Cuvantul S-a facut trup",
      summary:
        "Capitolul intai Il arata pe Domnul Isus ca pe Cuvantul vesnic, Lumina adevarata si Fiul lui Dumnezeu, apoi urmareste marturia lui Ioan Botezatorul si chemarea celor dintai ucenici.",
      literaryContext:
        "Ioan nu incepe cu ieslea, nici cu neamul pamantesc al Domnului Isus, ci cu vesnicia Lui. Capitolul sta in doua miscari mari. Mai intai, prologul arata cine este Isus: Cuvantul, viata, lumina, Singurul nascut din Tatal. Apoi, de la versetul nouasprezece, slava aceasta intra in istorie prin marturia lui Ioan Botezatorul si prin chemarea celor dintai ucenici. Tot capitolul merge de la marturisire la urmare: cine vede cine este Isus nu poate ramane numai spectator.",
      historicalContext:
        "Ioan scrie intr-o lume in care iudeii asteptau pe Mesia, iar grecii vorbeau despre logos ca despre un principiu al ratiunii si al ordinii. Evanghelia ia cuvantul acesta si il umple cu o persoana vie: nu o idee, ci Fiul, care era cu Dumnezeu si era Dumnezeu. In acelasi timp, randurile despre Ioan Botezatorul se aseaza in tensiunea reala a vremii: preoti, leviti, farisei, asteptarea lui Ilie, asteptarea prorocului si dorinta de semne. Capitolul spune raspicat ca toate aceste asteptari isi afla capatul in Isus Hristos.",
      status: "in_review",
      units: [
        {
          id: "ioan-1-1-5",
          ref: "Ioan 1:1-5",
          heading: "Cuvantul, viata si lumina",
          text:
            "La început era Cuvântul, şi Cuvântul era cu Dumnezeu, şi Cuvântul era Dumnezeu. El era la început cu Dumnezeu. Toate lucrurile au fost făcute prin El; şi nimic din ce a fost făcut, n-a fost făcut fără El. În El era viaţa, şi viaţa era lumina oamenilor. Lumina luminează în întuneric, şi întunericul n-a biruit-o.",
          teaching:
            "Sa ne oprim aici si sa nu trecem mai departe cu usurinta. Ioan deschide Evanghelia aproape cu aceeasi poarta cu care se deschide Geneza: la inceput. Numai ca aici nu ni se spune ce a inceput, ci Cine era deja acolo. Inainte de iesle, inainte de Betleem, inainte de Avraam, inainte de Adam, era Cuvantul.\n\nSe cuvine sa fim cinstiti cu textul. Ioan nu ne lasa loc sa coboram pe Domnul Isus la rangul unui invatator mare ori al unei fapturi inalte. Cuvantul era cu Dumnezeu, deci era deosebit de Tatal; si Cuvantul era Dumnezeu, deci nu era mai prejos decat Dumnezeu. Taina aceasta nu este o incurcatura, ci inceputul descoperirii crestine: Fiul este cu Tatal si este una in dumnezeire cu Tatal.\n\nApoi ia aminte la toate lucrurile. Nu se spune ca unele au fost facute prin El, iar altele fara El. Se spune limpede: nimic din ce a fost facut n-a fost facut fara El. Deci Cuvantul nu sta in randul celor facute. El este de partea Facatorului, nu de partea fapturii.\n\nSi mai ia aminte la legatura dintre viata si lumina. In El era viata; nu doar darul vietii, ci izvorul ei. Si viata aceasta era lumina oamenilor. Fara El, omul nu este doar slab, ci si in intuneric. Pacatul nu a adus numai vina, ci si orbire. De aceea venirea lui Hristos nu este doar ajutor, ci lumina adevarata pentru omul care nu mai vede drumul spre Tatal.\n\nLa urma, Ioan spune ca intunericul n-a biruit-o. Cuvantul poate insemna si ca n-a cuprins-o, si ca n-a invins-o. Amandoua sunt adevarate in mersul Evangheliei. Lumea cazuta nu L-a inteles pe deplin si nici nu L-a putut stinge. Crucea nu este biruinta intunericului asupra luminii, ci locul in care lumina trece prin intuneric si iese biruitoare.",
          words: [
            {
              original: "Λόγος",
              transliteration: "Logos",
              language: "greaca",
              meaning:
                "Cuvantul. Nu o simpla vorbire, ci Persoana prin care Dumnezeu Se face cunoscut si prin care toate au fost facute."
            },
            {
              original: "ζωή",
              transliteration: "zoe",
              language: "greaca",
              meaning:
                "viata. La Ioan, nu numai suflare biologica, ci viata deplina care este in Fiul si se daruieste prin El."
            },
            {
              original: "φῶς",
              transliteration: "phos",
              language: "greaca",
              meaning:
                "lumina. Ceea ce descopera, curata si arata drumul."
            }
          ],
          crossRefs: [
            "Geneza 1:1-3",
            "Ioan 8:12",
            "Ioan 17:5",
            "Coloseni 1:16-17",
            "Evrei 1:1-3",
            "1 Ioan 1:5"
          ],
          forYourHeart:
            "Daca Domnul Isus este Cuvantul care era la inceput, atunci credinta nu se sprijina pe o emotie trecatoare, ci pe Cel ce era inainte de toate. Iar daca lumina Lui n-a fost biruita de intuneric, nici intunericul din viata ta nu este mai tare decat El."
        },
        {
          id: "ioan-1-6-13",
          ref: "Ioan 1:6-13",
          heading: "Martorul si cei ce primesc Lumina",
          text:
            "A venit un om trimis de Dumnezeu: numele lui era Ioan. El a venit ca martor, ca să mărturisească despre Lumină, pentru ca toţi să creadă prin el. Nu era el Lumina, ci el a venit ca să mărturisească despre Lumină. Lumina aceasta era adevărata Lumină, care luminează pe orice om, venind în lume. El era în lume, şi lumea a fost făcută prin El, dar lumea nu L-a cunoscut. A venit la ai Săi, şi ai Săi nu L-au primit. Dar tuturor celor ce L-au primit, adică celor ce cred în Numele Lui, le-a dat dreptul să se facă copii ai lui Dumnezeu; născuţi nu din sânge, nici din voia firii lor, nici din voia vreunui om, ci din Dumnezeu.",
          teaching:
            "Ia aminte cum intra aici Ioan Botezatorul: nu ca lumina, ci ca martor. Se cuvine sa luam bine seama la randuiala aceasta. Cel mai mare om din randurile acestea nu este decat un glas si un martor. In lucrarea lui Dumnezeu, omul nu este izvorul luminii, ci cel care arata spre ea.\n\nApoi vine una dintre cele mai dureroase propozitii din Evanghelie: lumea nu L-a cunoscut. Tocmai lumea facuta prin El n-a recunoscut pe Facatorul ei. Si ai Sai nu L-au primit. Pacatul se vede aici nu doar ca necuratie, ci ca orbire si impotrivire fata de Cel care vine la noi.\n\nDar ia aminte si la rasturnarea plina de har: tuturor celor ce L-au primit, le-a dat dreptul sa se faca copii ai lui Dumnezeu. Nu se spune ca si-au castigat dreptul, nici ca l-au mostenit din neam, nici ca l-au cumparat prin ravna lor. L-au primit. La Ioan, credinta nu este o plata adusa lui Dumnezeu, ci mana intinsa care primeste pe Fiul.\n\nSi se cuvine sa fim foarte atenti la nasterea aceasta. Nu din sange, nici din voia firii, nici din voia vreunui om, ci din Dumnezeu. Cu alte cuvinte, filiatia aceasta nu se mosteneste prin familie, nu se produce prin efort si nu se fabrica prin religie. Numai Dumnezeu o da. Aici sta una dintre marile mangaieri ale Evangheliei: copil al lui Dumnezeu nu devii fiindca ai avut inceputul potrivit pe pamant, ci fiindca Dumnezeu te naste de sus.",
          words: [
            {
              original: "μαρτυρία",
              transliteration: "martyria",
              language: "greaca",
              meaning:
                "marturie. Spunerea adevarului despre cine este Cineva."
            },
            {
              original: "τέκνα θεοῦ",
              transliteration: "tekna Theou",
              language: "greaca",
              meaning:
                "copii ai lui Dumnezeu. Expresia filiatiei date prin har."
            },
            {
              original: "ἐκ θεοῦ",
              transliteration: "ek Theou",
              language: "greaca",
              meaning:
                "din Dumnezeu. Originea noii nasteri nu este omeneasca, ci dumnezeiasca."
            }
          ],
          crossRefs: [
            "Ioan 3:3-8",
            "Ioan 8:12",
            "Galateni 3:26",
            "Efeseni 2:8-9",
            "1 Ioan 3:1-2"
          ],
          forYourHeart:
            "Daca ai primit pe Fiul, nu traiesti inaintea lui Dumnezeu ca un strain tolerat, ci ca un copil primit. Iar daca inca nu L-ai primit, usa nu sta inchisa prin trecutul tau, ci deschisa prin harul Lui."
        },
        {
          id: "ioan-1-14-18",
          ref: "Ioan 1:14-18",
          heading: "Cuvantul S-a facut trup",
          text:
            "Şi Cuvântul S-a făcut trup şi a locuit printre noi, plin de har şi de adevăr. Şi noi am privit slava Lui, o slavă întocmai ca slava Singurului născut din Tatăl. – Ioan a mărturisit despre El, când a strigat: „El este Acela despre care ziceam eu: „Cel ce vine după mine este înaintea mea, pentru că era înainte de mine”. – Şi noi toţi am primit din plinătatea Lui şi har după har; căci Legea a fost dată prin Moise, dar harul şi adevărul au venit prin Isus Hristos. Nimeni n-a văzut vreodată pe Dumnezeu; singurul Lui Fiu, care este în sânul Tatălui, Acela L-a făcut cunoscut.”",
          teaching:
            "Sa ne oprim aici cu multa luare-aminte, fiindca acesta este unul dintre cele mai mari randuri din toata Sfanta Scriptura: Cuvantul S-a facut trup. Nu se spune ca a parut trup, nici ca a locuit numai pentru o vreme intr-un trup strain. Se spune ca S-a facut trup. Fiul lui Dumnezeu a intrat cu adevarat in omenitatea noastra, fara sa inceteze sa fie ce era din vesnicie.\n\nSe cuvine sa pastram cele doua maluri ale adevarului. Domnul Isus este cu adevarat Dumnezeu, cum s-a spus mai sus, si este cu adevarat om, cum se spune aici. Cine rupe una dintre acestea pierde Evanghelia. Daca nu este Dumnezeu, nu ne poate mantui in chip desavarsit. Daca nu este om, nu sta cu adevarat in locul nostru.\n\nApoi ia aminte la a locuit printre noi. Cuvantul acesta suna ca asezarea cortului. Ioan ne arata astfel ca in Isus Dumnezeu a venit sa locuiasca in mijlocul nostru, cum slava statea odinioara peste cortul intalnirii. Numai ca acum nu mai privim umbra, ci plinatatea.\n\nSi iarasi har si adevar. Nu har fara adevar, care mangaie fara sa vindece; nici adevar fara har, care loveste fara sa ridice. In Domnul Isus vin amandoua impreuna. De aceea omul nu este chemat nici sa se ascunda de lumina, nici sa deznadajduiasca sub ea.\n\nLa urma, Ioan spune ca nimeni n-a vazut vreodata pe Dumnezeu, iar Fiul L-a facut cunoscut. De aceea, cand vrei sa stii cum este Dumnezeu, nu trebuie sa-L ghicesti din frica, nici sa-L plamadesti dupa gandurile tale. Te uiti la Fiul. Cine Il vede pe Isus cum vorbeste, cum plange, cum mustra, cum primeste si cum Se jertfeste, acela incepe sa-L cunoasca pe Tatal.",
          words: [
            {
              original: "σὰρξ",
              transliteration: "sarx",
              language: "greaca",
              meaning:
                "trup, carne. Aici arata omenitatea adevarata asumata de Fiul."
            },
            {
              original: "ἐσκήνωσεν",
              transliteration: "eskenosen",
              language: "greaca",
              meaning:
                "a locuit, si-a intins cortul. Cuvant care trimite spre prezenta lui Dumnezeu in mijlocul poporului."
            },
            {
              original: "μονογενής",
              transliteration: "monogenes",
              language: "greaca",
              meaning:
                "singurul nascut, unicul de acest fel. Arata unicitatea Fiului fata de Tatal."
            }
          ],
          crossRefs: [
            "Exod 33:18-23",
            "Exod 40:34-35",
            "Ioan 14:9",
            "Coloseni 2:9",
            "Evrei 1:3"
          ],
          forYourHeart:
            "Nu trebuie sa te intrebi daca Dumnezeu stie din afara ce inseamna slabiciunea omeneasca. In Domnul Isus, El a venit aproape. Si nu trebuie sa alegi intre adevar si har, ca si cum unul te-ar vindeca iar celalalt te-ar pierde. In Fiul le gasesti pe amandoua."
        },
        {
          id: "ioan-1-19-34",
          ref: "Ioan 1:19-34",
          heading: "Iata Mielul lui Dumnezeu",
          text:
            "Iată mărturisirea făcută de Ioan, când iudeii au trimis din Ierusalim pe nişte preoţi şi leviţi să-l întrebe: „Tu cine eşti?” El a mărturisit şi n-a tăgăduit: a mărturisit că nu este el Hristosul. Şi ei l-au întrebat: „Dar cine eşti? Eşti Ilie?” Şi el a zis: „Nu sunt!” „Eşti prorocul?” Şi el a răspuns: „Nu!” Atunci i-au zis: „Dar cine eşti? Ca să dăm un răspuns celor ce ne-au trimis. Ce zici tu despre tine însuţi?” „Eu”, a zis el, „sunt glasul celui ce strigă în pustiu: „Neteziţi calea Domnului!”, cum a zis prorocul Isaia.” Trimişii erau din partea fariseilor. Ei i-au mai pus următoarea întrebare: „Atunci de ce botezi dacă nu eşti Hristosul, nici Ilie, nici prorocul?” Drept răspuns, Ioan le-a zis: „Eu botez cu apă; dar în mijlocul vostru stă Unul pe care voi nu-L cunoaşteţi. El este Acela care vine după mine – şi care este înaintea mea – eu nu sunt vrednic să-I dezleg cureaua încălţămintei Lui.” Aceste lucruri s-au petrecut în Betabara, dincolo de Iordan, unde boteza Ioan. A doua zi, Ioan a văzut pe Isus venind la el şi a zis: „Iată Mielul lui Dumnezeu care ridică păcatul lumii! El este Acela despre care ziceam: „După mine vine un Om care este înaintea mea, căci era înainte de mine. Eu nu-L cunoşteam, dar tocmai pentru aceasta am venit să botez cu apă: ca El să fie făcut cunoscut lui Israel.” Ioan a făcut următoarea mărturisire: „Am văzut Duhul coborându-Se din cer ca un porumbel şi oprindu-Se peste El. Eu nu-L cunoşteam; dar Cel ce m-a trimis să botez cu apă mi-a zis: „Acela peste care vei vedea Duhul coborându-Se şi oprindu-Se este Cel ce botează cu Duhul Sfânt.” Şi eu am văzut lucrul acesta şi am mărturisit că El este Fiul lui Dumnezeu.”",
          teaching:
            "Ia aminte la smerenia lui Ioan. Toata lumea il intreaba cine este, iar el raspunde mai ales spunand cine nu este. Nu este Hristosul, nu este centrul, nu este lumina. In casa lui Dumnezeu, lucrarea cea mai curata este aceea care nu strange oamenii in jurul numelui nostru, ci ii muta spre Domnul Isus.\n\nApoi vine strigarea mare: Iata Mielul lui Dumnezeu. Se cuvine sa luam bine seama la cuvantul acesta. Ioan nu zice numai iata Invatatorul, nici numai iata Imparatul, ci iata Mielul. Inca de la inceputul Evangheliei, crucea sta in fata. Fiul vine nu doar sa invete, ci sa poarte pacatul.\n\nSi ia aminte la pacatul lumii. Nu se spune doar pacatul unui neam ori al unei categorii. Mielul lui Dumnezeu sta inaintea unei nevoi universale. Tot omul poarta vina pe care nu si-o poate ridica singur, iar Dumnezeu da Mielul pe care omul nu-l putea da.\n\nMai departe, Ioan marturiseste despre Duhul care S-a coborat si a ramas peste El. Aici nu ni se spune ca Domnul Isus ar fi devenit atunci Fiul lui Dumnezeu; Ioan tocmai a marturisit ca El era mai inainte de el. Semnul acesta este pentru descoperirea publica a Celui care era deja Fiul.\n\nSi se cuvine sa pastram si ultima propozitie cu multa evlavie: El este Cel ce boteaza cu Duhul Sfant. Nu Ioan, nu vreun alt slujitor, ci Isus. Numai El poate sa dea omului nu doar apa din afara, ci viata dinlauntru.",
          words: [
            {
              original: "ἀμνός",
              transliteration: "amnos",
              language: "greaca",
              meaning:
                "miel. La Ioan, cuvantul trimite spre jertfa si spre purtarea pacatului."
            },
            {
              original: "μαρτυρέω",
              transliteration: "martyreo",
              language: "greaca",
              meaning:
                "a marturisi. A spune deschis adevarul despre cine este Hristos."
            },
            {
              original: "μένω",
              transliteration: "meno",
              language: "greaca",
              meaning:
                "a ramane. Duhul nu doar atinge, ci ramane peste Fiul."
            }
          ],
          crossRefs: [
            "Isaia 40:3",
            "Isaia 53:7",
            "Exod 12:3-13",
            "Ioan 3:30-34",
            "1 Petru 1:18-19",
            "Apocalipsa 5:6"
          ],
          forYourHeart:
            "Marea intrebare nu este ce nume iti faci tu, ci daca L-ai vazut pe Mielul lui Dumnezeu. Cand ochii omului se opresc cu adevarat asupra Lui, incep sa se aseze si locul lui, si lucrarea lui, si nadejdea lui."
        },
        {
          id: "ioan-1-35-51",
          ref: "Ioan 1:35-51",
          heading: "Veniti de vedeti",
          text:
            "A doua zi, Ioan stătea iarăşi cu doi din ucenicii lui. Şi, pe când privea pe Isus umblând, a zis: „Iată Mielul lui Dumnezeu!” Cei doi ucenici l-au auzit rostind aceste vorbe şi au mers după Isus. Isus S-a întors; şi, când i-a văzut că merg după El, le-a zis: „Ce căutaţi?” Ei I-au răspuns: „Rabi (care tălmăcit înseamnă Învăţătorule), unde locuieşti?” „Veniţi de vedeţi”, le-a zis El. S-au dus şi au văzut unde locuia; şi în ziua aceea au rămas la El. Era cam pe la ceasul al zecelea. Unul din cei doi, care auziseră cuvintele lui Ioan şi merseseră după Isus, era Andrei, fratele lui Simon Petru. El, cel dintâi, a găsit pe fratele său Simon şi i-a zis: „Noi am găsit pe Mesia” (care tălmăcit înseamnă Hristos). Şi l-a adus la Isus. Isus l-a privit şi i-a zis: „Tu eşti Simon, fiul lui Iona; tu te vei chema Chifa” (care tălmăcit înseamnă Petru). A doua zi Isus a vrut să Se ducă în Galileea şi a găsit pe Filip. Şi i-a zis: „Vino după Mine.” Filip era din Betsaida, cetatea lui Andrei şi a lui Petru. Filip a găsit pe Natanael şi i-a zis: „Noi am găsit pe Acela despre care a scris Moise în Lege şi Prorocii: pe Isus din Nazaret, fiul lui Iosif.” Natanael i-a zis: „Poate ieşi ceva bun din Nazaret?” „Vino şi vezi!”, i-a răspuns Filip. Isus a văzut pe Natanael venind la El şi a zis despre el: „Iată cu adevărat un israelit în care nu este vicleşug.” „De unde mă cunoşti?”, I-a zis Natanael. Drept răspuns, Isus i-a zis: „Te-am văzut mai înainte ca să te cheme Filip, când erai sub smochin.” Natanael I-a răspuns: „Rabi, Tu eşti Fiul lui Dumnezeu, Tu eşti Împăratul lui Israel!” Drept răspuns, Isus i-a zis: „Pentru că ţi-am spus că te-am văzut sub smochin, crezi? Lucruri mai mari decât acestea vei vedea.” Apoi i-a zis: „Adevărat, adevărat vă spun că, de acum încolo, veţi vedea cerul deschis şi pe îngerii lui Dumnezeu suindu-se şi coborându-se peste Fiul omului.”",
          teaching:
            "Ia aminte cum se face chemarea. Doi ucenici il aud pe Ioan spunand iarasi: Iata Mielul lui Dumnezeu. Si merg dupa Isus. Lucrarea buna a unui martor nu se supara cand cei ce il ascultau incep sa mearga dupa Domnul.\n\nApoi vine intrebarea lui Isus: Ce cautati? Nu este o intrebare aruncata la intamplare. Evanghelia dupa Ioan pune mereu omul inaintea acestei cercetari: ce cauti de fapt? semn, paine, slava, scapare, ori pe El Insusi?\n\nSi ia aminte la raspunsul Domnului: Veniti de vedeti. Credinta nu incepe cu un tratat rece, ci cu apropierea de Persoana Lui. Ei au venit, au vazut si au ramas la El. Asa incepe ucenicia adevarata: omul vine, vede si ramane.\n\nDe acolo, marturia curge mai departe firesc. Andrei il aduce pe Simon. Filip il cheama pe Natanael. Cine L-a gasit cu adevarat pe Mesia nu tine vestea numai pentru sine. Dar ia aminte si la felul in care este adus Natanael. Nu prin constrangere, ci printr-o chemare simpla: vino si vezi.\n\nLa urma, Domnul Isus isi spune numele de Fiul omului si vorbeste despre cerul deschis si ingerii care se suie si se coboara peste El. Ioan ne trimite astfel inapoi la visul lui Iacov. Scara dintre cer si pamant nu mai este acum un semn vazut intr-o noapte, ci Persoana Fiului. In El se ating cerul si pamantul. In El vine Dumnezeu la om si in El este dus omul la Dumnezeu.",
          words: [
            {
              original: "ῥαββί",
              transliteration: "rabbi",
              language: "greaca",
              meaning:
                "Invatatorule. Titlul cu care ucenicii se apropie de Isus."
            },
            {
              original: "Μεσσίας",
              transliteration: "Messias",
              language: "greaca",
              meaning:
                "Mesia, Unsul. Cel asteptat in fagaduintele lui Dumnezeu."
            },
            {
              original: "υἱὸς τοῦ ἀνθρώπου",
              transliteration: "huios tou anthropou",
              language: "greaca",
              meaning:
                "Fiul omului. Nume prin care Domnul Isus vorbeste despre sine cu smerenie si slava laolalta."
            }
          ],
          crossRefs: [
            "Geneza 28:12-17",
            "Daniel 7:13-14",
            "Ioan 6:35-37",
            "Ioan 20:30-31"
          ],
          forYourHeart:
            "Domnul Isus nu-i alunga pe cei care vin intrebatori si neasezati. El le spune: Veniti de vedeti. Daca ai ajuns pana aici cu indoieli, cu foame sau cu inima impartita, chemarea nu este sa te prefaci, ci sa vii la El si sa ramai langa El."
        }
      ],
      prayer:
        "Doamne Isuse Hristoase, Cuvant vesnic al Tatalui, Iti multumim ca nu ai ramas departe de noi, ci Te-ai facut trup si ai locuit printre noi, plin de har si de adevar.\n\nLumina Ta lumineaza si astazi in intuneric. Lasa lumina aceasta sa intre si in noi, acolo unde inca ne ascundem, unde inca ne temem si unde inca nu vedem limpede.\n\nInvata-ne sa Te privim ca pe Mielul lui Dumnezeu, nu doar ca pe un Invatator mare. Rupe in noi orice nadejde pusa in noi insine si fa-ne sa venim iarasi la Tine, cu mainile goale si cu inima deschisa.\n\nSi cum ai chemat pe cei dintai ucenici cu vorba blanda: Veniti de vedeti, cheama-ne si pe noi la o ramanere adevarata cu Tine. Amin."
    },
    {
      id: "ioan-2",
      bookId: "ioan",
      number: 2,
      title: "Ioan 2 — Slava din Cana si ravna pentru casa Tatalui",
      summary:
        "Capitolul al doilea arata inceputul semnelor Domnului Isus la nunta din Cana, apoi curatirea Templului si deosebirea dintre credinta trezita de semne si cunoasterea deplina a inimii omului pe care o are El.",
      literaryContext:
        "Dupa chemarea celor dintai ucenici, Ioan incepe sa aseze semnele Domnului Isus. Capitolul sta in trei miscari. Mai intai, la Cana, slava Lui se arata in taina unui sat si in bucuria unei case. Apoi, la Ierusalim, aceeasi slava se arata cu putere si curatie in Templu. La sfarsit, Ioan pune o observatie scurta si grea: multi cred in Numele Lui vazand semnele, dar Isus stie ce este in om. Capitolul leaga astfel semnul, casa Tatalui si inima omului.",
      historicalContext:
        "Nunta era una dintre cele mai mari bucurii ale lumii iudaice, iar rusinea lipsei la masa cadea greu asupra casei. Vasele de piatra pomenite de Ioan tin de curatirile iudaice, iar curatirea Templului se petrece in apropierea Pastelor, cand Ierusalimul era plin. Curtea Templului ajunsese loc de vanzare si schimb de bani pentru jertfe si moneda. In acest cadru, Domnul Isus Se descopera atat ca aducator al bucuriei curate, cat si ca Domn al casei Tatalui Sau.",
      status: "in_review",
      units: [
        {
          id: "ioan-2-1-12",
          ref: "Ioan 2:1-12",
          heading: "Inceputul semnelor in Cana",
          text:
            "A treia zi s-a făcut o nuntă în Cana din Galileea. Mama lui Isus era acolo. Şi la nuntă a fost chemat şi Isus cu ucenicii Lui. Când s-a isprăvit vinul, mama lui Isus I-a zis: „Nu mai au vin.” Isus i-a răspuns: „Femeie, ce am a face Eu cu tine? Nu Mi-a venit încă ceasul.” Mama Lui a zis slugilor: „Să faceţi orice vă va zice.” Şi acolo erau şase vase de piatră, puse după obiceiul de curăţare al iudeilor; şi în fiecare vas încăpeau câte două sau trei vedre. Isus le-a zis: „Umpleţi vasele acestea cu apă.” Şi le-au umplut până sus. „Scoateţi acum”, le-a zis El, „şi aduceţi nunului.” Şi i-au adus: Nunul, după ce a gustat apa făcută vin – el nu ştia de unde vine vinul acesta (slugile însă, care scoseseră apa, ştiau) – a chemat pe mire şi i-a zis: „Orice om pune la masă întâi vinul cel bun; şi, după ce oamenii au băut bine, atunci pune pe cel mai puţin bun; dar tu ai ţinut vinul cel bun până acum.” Acest început al semnelor Lui l-a făcut Isus în Cana din Galileea. El Şi-a arătat slava Sa, şi ucenicii Lui au crezut în El. După aceea S-a coborât la Capernaum împreună cu mama, fraţii şi ucenicii Lui; şi acolo n-au rămas multe zile.",
          teaching:
            "Sa luam bine seama unde incepe Ioan semnele Domnului Isus. Nu in palat, nu in mijlocul unei dezbateri, ci la o nunta. Evanghelia nu intra in lume ca sa usuce bucuria curata a omului, ci sa o curateasca si sa o umple de slava lui Dumnezeu.\n\nApoi vine lipsa. Nu mai au vin. Se cuvine sa observam ca semnul acesta nu este facut pentru spectacol, ci in miezul unei nevoi care ar fi adus rusine unei case. Domnul vede nevoia omeneasca si nu o dispretuieste. Dar tot textul ne pazeste sa nu coboram semnul la un simplu ajutor social ori la o reteta pentru confortul nostru. Ioan spune limpede: acesta a fost inceputul semnelor Lui si prin el Si-a aratat slava.\n\nCuvintele spuse mamei Sale trebuie citite cu evlavie si cu masura. Domnul nu o cinsteste mai putin, dar arata ca lucrarea Lui nu este condusa nici de apropierea de familie, nici de presiunea clipei, ci de ceasul hotarat de Tatal. In Evanghelia aceasta, ceasul Lui merge spre cruce si spre slava.\n\nSi ia aminte la vorba mamei Lui catre slugi: Sa faceti orice va va zice. Este una dintre cele mai simple si mai curate chemari la ascultare din toata Scriptura. Acolo incepe si minunea: nu in zgomotul multimii, ci in ascultarea celor care umplu vasele pana sus.\n\nLa urma, Ioan spune ca ucenicii au crezut in El. Nu inseamna ca pana atunci nu avusesera niciun fel de credinta, ci ca prin semnul acesta credinta lor a fost adancita. Asa lucreaza si Domnul cu ai Sai: arata slava Lui pe rand, ca sa-i aseze mai adanc in incredere.",
          words: [
            {
              original: "σημεῖον",
              transliteration: "semeion",
              language: "greaca",
              meaning:
                "semn. La Ioan, nu minune goala, ci lucrare care arata cine este Isus."
            },
            {
              original: "ὥρα",
              transliteration: "hora",
              language: "greaca",
              meaning:
                "ceasul. Vremea hotarata a lucrarii si a slavei lui Hristos."
            },
            {
              original: "δόξα",
              transliteration: "doxa",
              language: "greaca",
              meaning:
                "slava. Frumusetea si greutatea dumnezeiasca aratate in Fiul."
            }
          ],
          crossRefs: [
            "Ioan 1:14",
            "Ioan 7:30",
            "Ioan 19:26-27",
            "Apocalipsa 19:7-9"
          ],
          forYourHeart:
            "Domnul Isus poate lucra si in locul in care ti se pare ca a ramas numai rusinea unei lipse. Dar mai mult decat rezolvarea lipsei, El urmareste sa-Si arate slava si sa te aseze intr-o ascultare mai simpla si mai adanca."
        },
        {
          id: "ioan-2-13-22",
          ref: "Ioan 2:13-22",
          heading: "Casa Tatalui Meu",
          text:
            "Paştile iudeilor era aproape; şi Isus S-a suit la Ierusalim. În Templu a găsit pe cei ce vindeau boi, oi şi porumbei, şi pe schimbătorii de bani şezând jos. A făcut un bici de ştreanguri şi i-a scos pe toţi afară din Templu, împreună cu oile şi boii; a vărsat banii schimbătorilor şi le-a răsturnat mesele. Şi a zis celor ce vindeau porumbei: „Ridicaţi acestea de aici şi nu faceţi din Casa Tatălui Meu o casă de negustorie.” Ucenicii Lui şi-au adus aminte că este scris: „Râvna pentru Casa Ta Mă mănâncă pe Mine.” Iudeii au luat cuvântul şi I-au zis: „Prin ce semn ne arăţi că ai putere să faci astfel de lucruri?” Drept răspuns, Isus le-a zis: „Stricaţi templul acesta, şi în trei zile îl voi ridica.” Iudeii au zis: „Au trebuit patruzeci şi şase de ani, ca să se zidească Templul acesta, şi Tu îl vei ridica în trei zile?” Dar El le vorbea despre templul trupului Său. Tocmai de aceea, când a înviat din morţi, ucenicii Lui şi-au adus aminte că le spusese vorbele acestea şi au crezut Scriptura şi cuvintele pe care le spusese Isus.",
          teaching:
            "Ia aminte la schimbarea de tablou. Din bucuria unei nunti ajungem la curtile Templului. Acelasi Domn care a umplut lipsa unei case este si Domnul care curata casa Tatalui Sau. Harul Lui nu inseamna nepasare fata de profanare.\n\nSe cuvine sa fim cinstiti cu textul. Mania aceasta nu este capriciu, nici iesire necontrolata. Este ravna sfanta pentru locul in care Dumnezeu trebuia cinstit, nu vandut. Ceea ce trebuia sa ajute inchinarea ajunsese sa o acopere. Si aceasta ramane o cercetare pentru orice vreme: lucrurile religioase se pot inmulti pana acopera pe Dumnezeu Insusi.\n\nApoi ia aminte la vorba: casa Tatalui Meu. Domnul Isus nu Se poarta aici ca un reformator oarecare, ci ca Fiul. Tocmai de aceea cererea de semn nu este nevinovata. Ei nu vad sfintenia casei, ci se impiedica de autoritatea Fiului.\n\nRaspunsul Lui merge mai adanc decat au inteles cei de fata: Stricati templul acesta, si in trei zile il voi ridica. Ioan insusi ne pazeste de orice ratacire spunand ca El vorbea despre templul trupului Sau. Cu alte cuvinte, adevarata intalnire dintre Dumnezeu si om nu se va mai odihni in ziduri, ci in Persoana Fiului care va muri si va invia.\n\nUcenicii au inteles deplin abia dupa inviere. Si aici se cuvine sa luam mangaie-re. Sunt cuvinte ale Domnului pe care le auzim acum fara sa le putem purta pe deplin. Dar dupa ce trecem prin cruce si inviere, lumina lor se aseaza altfel in noi.",
          words: [
            {
              original: "ζῆλος",
              transliteration: "zelos",
              language: "greaca",
              meaning:
                "ravna. Foc sfant pentru onoarea lui Dumnezeu."
            },
            {
              original: "ναός",
              transliteration: "naos",
              language: "greaca",
              meaning:
                "templu. In vorba Domnului de aici, Ioan arata ca se refera la trupul Sau."
            }
          ],
          crossRefs: [
            "Psalmul 69:9",
            "Matei 21:12-13",
            "Ioan 1:14",
            "Ioan 14:19",
            "1 Corinteni 3:16"
          ],
          forYourHeart:
            "Domnul Isus nu vine doar sa-ti aline lipsurile, ci si sa curete ce a ajuns negustorie in locul inchinarii. Harul care mangaie este acelasi har care rasturna mesele inimii atunci cand casa Tatalui a fost umpluta cu altceva."
        },
        {
          id: "ioan-2-23-25",
          ref: "Ioan 2:23-25",
          heading: "El stia ce este in om",
          text:
            "Pe când era Isus în Ierusalim, la praznicul Paştilor, mulţi au crezut în Numele Lui; căci vedeau semnele pe care le făcea. Dar Isus nu Se încredea în ei, pentru că îi cunoştea pe toţi. Şi n-avea trebuinţă să-I facă cineva mărturisiri despre niciun om, fiindcă El însuşi ştia ce este în om.",
          teaching:
            "Sa nu trecem cu graba peste aceste trei versete, fiindca ele sunt grele. Multi au crezut in Numele Lui, vazand semnele. Si totusi Isus nu Se incredea in ei. Ioan foloseste aproape acelasi cuvant pentru credinta lor si pentru increderea pe care El nu Si-o pune in ei. Se vede astfel ca nu orice miscare a omului spre Isus este inca predare adanca a inimii.\n\nSe cuvine sa fim cinstiti cu textul si cu noi insine. Exista o credinta starnita de uimire, de folosul primit ori de puterea vazuta, care inca nu a ajuns la zdrobirea adevarata inaintea Fiului. Domnul nu dispretuieste omul aflat la inceput, dar nici nu se lasa inselat de entuziasmul de suprafata.\n\nApoi vine una dintre cele mai patrunzatoare propozitii despre El: stia ce este in om. Nu doar ce spune omul, nici numai ce arata in clipa aceea, ci ce este in om. De aceea Evanghelia nu se sprijina pe impresia pe care o lasam noi inaintea Lui. Ea se sprijina pe faptul ca El ne cunoaste mai adanc decat ne cunoastem noi si totusi cheama la Sine.",
          words: [
            {
              original: "πιστεύω",
              transliteration: "pisteuo",
              language: "greaca",
              meaning:
                "a crede, a se increde. Acelasi verb arata aici si credinta oamenilor, si faptul ca Isus nu Se incredea in ei."
            },
            {
              original: "γινώσκω",
              transliteration: "ginosko",
              language: "greaca",
              meaning:
                "a cunoaste. La Ioan, cunoastere reala, nu simpla informatie."
            }
          ],
          crossRefs: [
            "1 Samuel 16:7",
            "Ioan 6:26",
            "Ioan 16:30",
            "Apocalipsa 2:23"
          ],
          forYourHeart:
            "Domnul Isus nu Se lasa impresionat de masca omului, dar tocmai aici este si nadejdea ta. El stie ce este in tine mai bine decat oricine si totusi nu-ti inchide drumul spre El. Credinta adevarata incepe cand omul inceteaza sa mai joace un rol inaintea Lui."
        }
      ],
      prayer:
        "Doamne Isuse, Iti multumim ca inceputul semnelor Tale nu a fost spre slava omului, ci spre aratarea slavei Tale. Da-ne ochi sa vedem in toate lucrarile Tale nu doar folosul primit, ci cine esti Tu.\n\nCurateste-ne inima, ca sa nu facem nici din inchinare, nici din lucrurile sfinte o negustorie a intereselor noastre. Pazeste-ne sa nu ne ascundem dupa forme si sa nu alergam doar dupa semne.\n\nTu stii ce este in om. Cerceteaza-ne cu adevar si atrage-ne la o credinta mai adanca, mai curata si mai smerita. Amin."
    }
  ],
}
