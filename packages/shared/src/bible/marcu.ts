import type { BibleBook } from "./types.js"
import { marcuChapter, teaching } from "./marcuHelpers.js"

/*
 * Evanghelia după Marcu, explicată pe unități de sens.
 *
 * Textul biblic: Cornilescu, editia corectata (RCCV), păstrat separat în marcuText.ts.
 * Explicația: scrisă pentru Emanus după cercetarea textului și a surselor
 * declarate în docs/41-plan-scriere-marcu.md. Nu se copiază formularea
 * niciunui predicator sau comentator.
 */

const MARCU_1 = marcuChapter({
  number: 1,
  title: "Marcu 1 — Începutul Evangheliei",
  summary:
    "Evanghelia se deschide cu glasul pregătirii, cu botezul și ispitirea Domnului Isus, apoi cu chemarea primilor ucenici și cu prima zi de lucrare la Capernaum. Cel care începe să vestească este Fiul lui Dumnezeu, și vestea Lui este una singură: Împărăția este aproape.",
  literaryContext:
    "Marcu este Evanghelia care aleargă: cuvântul «îndată» revine mereu, iar povestirea trece repede de la pregătire la slujire. Capitolul așază fundația întregii cărți: cine este Isus (versetul 1), cum a fost pregătită venirea Lui (1:2-8), cum a fost confirmat de Tatăl (1:9-11), cum a fost încercat (1:12-13) și cum și-a început lucrarea (1:14-45). Tot ce urmează în Evanghelie este desfășurarea acestor prime versete.",
  historicalContext:
    "Galileea era o provincie sub stăpânire romană, condusă de Irod Antipa. Botezul lui Ioan era o chemare neobișnuită pentru un iudeu: spălările rituale curățau lucruri, botezul lui Ioan cerea întoarcerea inimii. Sinagoga din Capernaum era locul de învățătură din fiecare Sabat. Leproșii erau izolați de lege (Levitic 13), iar porunca lui Moise cerea celui curățit să se arate preotului și să aducă o jertfă (Levitic 14).",
  units: [
    {
      verses: [1, 3],
      heading: "Începutul Evangheliei",
      teaching: teaching(
        "Marcu nu începe cu o genealogie și nici cu povestea nașterii. Începe cu o declarație: cine este Isus. Hristos înseamnă Mesia cel făgăduit, iar Fiul lui Dumnezeu spune cine este El înaintea lumii. Tot ce se va povesti în carte — cuvinte, vindecări, patimă, înviere — stă sub acest titlu.",
        "Nici acest început nu este o noutate absolută. Marcu îl leagă îndată de Scriptură: glasul care pregătește calea a fost făgăduit cu secole înainte. Vestea bună nu este o invenție târzie, ci împlinirea a ceea ce Dumnezeu spusese din vechime prin profeți. Evanghelia nu aduce alt plan al lui Dumnezeu; aduce împlinirea planului Lui.",
      ),
      words: [
        {
          original: "εὐαγγέλιον",
          transliteration: "euangelion",
          language: "greaca",
          meaning:
            "veste bună, veste binevestitoare. Evanghelia nu este o colecție de sfaturi, ci o veste care se primește și se crede.",
        },
      ],
      crossRefs: ["Isaia 40:3", "Maleahi 3:1", "Luca 3:1-6"],
      forYourHeart:
        "Vestea bună nu începe cu ce ești tu, ci cu Cine este El. Poți să intri în Evanghelie exact de aici: nu cu faptele tale, ci cu numele Lui.",
    },
    {
      verses: [4, 8],
      heading: "Glasul celui ce strigă în pustiu",
      teaching: teaching(
        "Ioan este glasul făgăduit. Mesajul lui nu este despre vremuri mai bune, ci despre pocăință: întoarcerea care duce la iertarea păcatelor. Este un adevăr de care avem nevoie și noi: inima nu este pregătită să-L primească pe Domnul Isus dacă nu s-a întors mai întâi de la păcat. O credință fără întoarcere rămâne numai în minte și nu produce rod.",
        "Oamenii ies la Ioan, își mărturisesc păcatele și sunt botezați. N-au înțeles toate amănuntele botezului; au înțeles că Dumnezeu a poruncit și că răspunsul este ascultarea. E o regulă pe care o vedem în toată Scriptura: cine ascultă, înțelege; cine vrea să înțeleagă totul înainte să asculte, rămâne adesea în afară.",
        "Ioan este smerit. Deși era rudă cu Isus, nu își permite nicio familiaritate: «nu sunt vrednic să mă plec să-I dezleg curelele încălțămintei». Și face o deosebire pe care nu o putem uita: el botează cu apă, dar Cel ce vine va boteza cu Duhul Sfânt. Cufundarea în apă este ascultare; cufundarea în Duhul este putere de la Dumnezeu pentru a trăi și a sluji.",
      ),
      words: [
        {
          original: "μετανοέω",
          transliteration: "metanoeo",
          language: "greaca",
          meaning:
            "îmi schimb felul de gândire, mă întorc. Pocăința nu este numai părere de rău, ci o întoarcere care schimbă drumul.",
        },
        {
          original: "βαπτίζω",
          transliteration: "baptizo",
          language: "greaca",
          meaning:
            "cufund, scufund. Botezul nu este o stropire, ci o cufundare în apă, asemenea morții și învierii (Romani 6:3-4).",
        },
      ],
      crossRefs: ["Matei 3:1-12", "Ioan 1:19-28", "Fapte 1:5"],
      forYourHeart:
        "Nu trebuie să știi tot ca să-L urmezi pe Dumnezeu; trebuie să asculți de ce ți-a spus. Începe cu întoarcerea cea simplă și sinceră, și lumina vine pe drum.",
    },
    {
      verses: [9, 11],
      heading: "Fiul Meu preaiubit",
      teaching: teaching(
        "Isus nu avea de ce să se pocăiască. Și totuși stă la rând cu păcătoșii și primește botezul. Botezul Lui nu este spălare de păcat, ci identificare: intră în apa aceea ca Unul care se alătură poporului Lui și care merge deja spre moarte și înviere.",
        "Tatăl răspunde prin trei semne: cerurile se deschid, Duhul coboară peste El ca un porumbel, și un glas spune: «Tu ești Fiul Meu preaiubit, în Tine Îmi găsesc toată plăcerea Mea». Isus nu este recunoscut după lucrare, ci înaintea ei. Glasul acesta stă la început: iubirea Tatălui nu se câștigă prin fapte, ci se primește.",
        "Ioan văzuse cerul închis peste oameni; acum vede cerul deschis peste Fiul. Duhul coboară și rămâne, ca o putere care nu se ia înapoi. Isus este uns pentru lucrare, dar înainte de lucrare este iubit. Și noi avem nevoie să auzim întâi cine suntem înaintea Tatălui, ca să putem umbla apoi.",
      ),
      crossRefs: ["Psalmul 2:7", "Isaia 42:1", "Matei 3:13-17"],
      forYourHeart:
        "Dumnezeu nu te iubește pentru ce ai făcut, ci te primește ca să faci ceva din dragoste. Adevărul acesta te eliberează de gândul că trebuie să meriți înainte de a veni.",
    },
    {
      verses: [12, 13],
      heading: "Ispitit în pustiu",
      teaching: teaching(
        "Îndată Duhul Îl mână pe Isus în pustiu. Aceeași putere care a coborât peste El la botez Îl duce acum în încercare. Scriptura spune limpede că Dumnezeu nu ispitește pe nimeni (Iacov 1:13); dar îngăduie ispita, pentru că numai în încercare se vede dacă omul Îi este cu adevărat credincios. O credincioșie care nu a fost încercată încă nu s-a dovedit încă.",
        "Patruzeci de zile, cu fiarele sălbatice de jur împrejur și cu îngerii care Îi slujesc. Ispitele nu vin la fel pentru toți: ele cresc odată cu maturitatea spirituală, căci Dumnezeu nu îngăduie să fim ispitiți peste puterea noastră (1 Corinteni 10:13). Ceea ce a îndurat Isus în pustiu nu se înțelege pe deplin decât din umblarea cu El.",
        "Pustietatea aceasta nu este o întâmplare fără rost. Isus iese din ea fără păcat și începe lucrarea. Cine vrea să slujească Domnului trebuie să fie gata să treacă prin locuri pustii — locuri în care nimeni nu vede, dar Dumnezeu lucrează. Acolo se dovedește dacă Îl urmăm pentru El sau pentru roade.",
      ),
      crossRefs: ["Matei 4:1-11", "Luca 4:1-13", "Evrei 4:15", "1 Corinteni 10:13"],
      forYourHeart:
        "Ispita nu înseamnă că ești părăsit; dimpotrivă, Duhul Însuși este cel care te conduce prin ea. Nu te teme de pustiu: și acolo sunt îngerii, și acolo te ține Tatăl.",
    },
    {
      verses: [14, 20],
      heading: "Veniți după Mine",
      teaching: teaching(
        "Ioan este închis, dar lucrarea nu se oprește. Isus continuă exact acolo unde a rămas Ioan: «S-a împlinit vremea, și Împărăția lui Dumnezeu este aproape. Pocăiți-vă și credeți în Evanghelie». Pocăința și credința sunt legate de Dumnezeu una de alta; cine le desparte, preface Evanghelia. Vestea nu este o veste rea: este cea mai bună veste a lui Dumnezeu.",
        "Pe malul mării, Isus cheamă oameni care erau deja la lucru. Nu cheamă leneși, ci pescari credincioși în meseria lor: Simon, Andrei, Iacov și Ioan. Învățătura stă la suprafață și ne privește pe toți: credincioșia în lucrurile mărunte ale vieții de zi cu zi este pregătirea pentru orice slujire mare. Dumnezeu nu cheamă de obicei oameni neîncercați.",
        "Răspunsul lor este îndată. Când voia lui Dumnezeu este clară, nu mai e nevoie să cântărim consecințele; se lasă mrejele, se lasă corabia, se lasă chiar și tatăl, ca în cazul lui Iacov și Ioan. Nu pentru că familia nu contează, ci pentru că o chemare a lui Isus este mai mare decât orice legătură omenească.",
      ),
      words: [
        {
          original: "δεῦτε ὀπίσω μου",
          transliteration: "deute opiso mou",
          language: "greaca",
          meaning:
            "veniți după Mine. Chemarea nu este o invitație la o opinie, ci la o urmare: Isus înainte, ucenicul în urma Lui.",
        },
      ],
      crossRefs: ["Matei 4:12-22", "Luca 5:1-11", "Ioan 1:35-42", "Luca 16:10"],
      forYourHeart:
        "Poate nu ești chemat să lași meseria, dar ești chemat să fii credincios în ea. Fă-ți lucrul de azi ca un ucenic — și Dumnezeu știe unde să te pună mâine.",
    },
    {
      verses: [21, 28],
      heading: "Învățătură cu putere",
      teaching: teaching(
        "La Capernaum, în ziua Sabatului, Isus intră în sinagogă și învață. Oamenii sunt uimiți: îi învață ca unul care are putere, nu ca și cărturarii. Cei doi învățători citesc din aceeași Scriptură, dar nu cu același glas. Puterea lui Isus nu venea din teorie, ci din treizeci de ani de viață ascunsă, trăită în ascultare, și din Duhul care era peste El. Așa se face și azi deosebirea dintre o vorbă despre Dumnezeu și un cuvânt de la Dumnezeu.",
        "În sinagogă se află un om cu un duh necurat. Dușmanul poate sta liniștit câtă vreme se spune o învățătură moartă; dar când vine Cuvântul cu putere, se descoperă. Nu ne este dat să diagnosticăm de la distanță pe nimeni; povestirea aceasta ne învață însă că niciun om nu este cu adevărat ascuns, și că prezența Domnului aduce la lumină ceea ce era tăinuit.",
        "Duhul necurat mărturisește: «Te știu cine ești: ești Sfântul lui Dumnezeu». Este o mărturie adevărată — și Isus o refuză. El nu primește laude din partea duhurilor necurate și nu lasă duhurile să vorbească. Cine știe că Tatăl e mulțumit de el nu are nevoie de mărturia dușmanului. Iar eliberarea vine printr-o singură poruncă: «Taci și ieși afară din omul acesta!»",
      ),
      words: [
        {
          original: "ἐξουσία",
          transliteration: "exousia",
          language: "greaca",
          meaning:
            "autoritate, drept de stăpânire. Nu este vorba de un ton mai tare, ci de o putere reală, care ascultă de cuvântul Domnului.",
        },
      ],
      crossRefs: ["Luca 4:31-37", "Matei 7:28-29", "Iacov 2:19"],
      forYourHeart:
        "Prezența lui Isus tulbură lucrurile ascunse — și asta este o veste bună. Nu te teme că Dumnezeu vede ce e în tine; teme-te mai degrabă să nu rămâi pe veci nescuturat de El.",
    },
    {
      verses: [29, 34],
      heading: "Toți bolnavii la ușă",
      teaching: teaching(
        "Din sinagogă, Isus intră în casa lui Simon. Soacra lui Simon zace cu friguri; I se vorbește despre ea, El o apucă de mână, o ridică, și frigurile o lasă. Vindecarea este îndată, iar femeia începe să le slujească. E o învățătură pe care o găsim în tot Noul Testament: cine este ridicat de Domnul, este ridicat ca să slujească, nu ca să trăiască numai pentru sine.",
        "Seara, după asfințitul soarelui, toată cetatea se adună la ușă. Isus vindecă pe mulți bolnavi și scoate mulți draci — și nu lasă dracii să vorbească, pentru că Îl cunoșteau. El nu vrea mărturie nici din partea oamenilor, nici din partea duhurilor. Singura mărturie de care avea nevoie venise deja din cer: «Tu ești Fiul Meu preaiubit».",
        "Pentru noi, aici stă o întrebare simplă și adâncă: de ce ne dorim să fim sănătoși? Ca să ne întoarcem la viața noastră — sau ca să slujim? Cine a înțeles că a fost ridicat ca să slujească, a înțeles și de ce îl vindecă Dumnezeu. Iar cine este bolnav poate chema și doctorul: credința nu cere să rămânem fără ajutorul celor pricepuți, ci să punem totul în mâna Domnului.",
      ),
      crossRefs: ["Matei 8:14-17", "Luca 4:38-41"],
      forYourHeart:
        "Dacă Domnul te-a ridicat dintr-o suferință, întreabă-te pentru ce te-a lăsat aici: ca să te bucuri de zile, sau ca să slujești? Slujirea este răspunsul cel mai firesc al celui vindecat.",
    },
    {
      verses: [35, 39],
      heading: "Dis-de-dimineață, într-un loc pustiu",
      teaching: teaching(
        "După o seară întreagă de vindecări, Isus S-a sculat dis-de-dimineață, pe întuneric, și S-a dus într-un loc pustiu, ca să Se roage. Se întâlnește cu Tatăl înainte de a Se întâlni cu oamenii. Tocmai după o lucrare mare, nu înaintea ei, are nevoie de rugăciune: să nu se ridice în el mândria, și să știe unde îl cheamă Tatăl mai departe.",
        "Ucenicii Îl caută și Îi spun: «Toți Te caută». Este momentul în care succesul îl cheamă să rămână. Dar Isus răspunde: «Haidem să mergem în altă parte, ca să propovăduiesc și acolo; căci pentru aceasta am ieșit». În rugăciune nu căutăm să ne facem lucrarea mai ușoară, ci să aflăm lucrarea Tatălui. Popularitatea nu este un indicator de direcție.",
        "Și S-a dus prin toată Galileea, propovăduind în sinagogi și scoțând dracii. Rugăciunea nu L-a oprit din lucrare; L-a păzit în lucrare. Cine se roagă înainte de a vorbi, vorbește altfel. Și noi nu avem o putere mai mare pentru zilele noastre decât aceasta: să ne întâlnim cu Tatăl înainte de a ne întâlni cu oamenii.",
      ),
      crossRefs: ["Luca 5:15-16", "Luca 6:12", "Ioan 5:19"],
      forYourHeart:
        "Înainte de a deschide gura, deschide-ți inima. Nu rugăciunea care se grăbește între două treburi te păzește, ci întâlnirea cea tăcută, înainte să înceapă zgomotul zilei.",
    },
    {
      verses: [40, 45],
      heading: "Dacă voiești, poți să mă curățești",
      teaching: teaching(
        "Un lepros vine la Isus, cade în genunchi și Îi spune: «Dacă voiești, poți să mă curățești». Este o credință frumoasă: nu pune la îndoială puterea, ci lasă voia în seama Domnului. Și Isus răspunde cu milă: întinde mâna, Se atinge de el — un gest interzis de lege pentru oricine se apropia de un lepros — și îi zice: «Da, voiesc, fii curățat!» Puterea și voia s-au întâlnit în cuvântul Său.",
        "Apoi Isus îi poruncește omului să tacă și să se ducă să se arate preotului, cum cerea legea lui Moise. Dar leprosul, cu inima plină de bucurie, nu ascultă: vestește în gura mare, și Isus nu mai poate intra pe față în nicio cetate. Putem face un lucru greșit chiar și cu o inimă bună; aici se vede prețul ascultării simple. Cine se crede mai înțelept decât Domnul, își strică adesea chiar lucrul pe care voia să-l slujească.",
        "Isus nu căuta să fie cunoscut ca vindecător, ci ca Mântuitor. De aceea îi trimitea pe oameni la preot și le cerea să tacă: ca nimeni să nu fie atras doar de minuni, departe de Evanghelie. Și noi nu promitem nimănui că va fi vindecat; vindecarea stă în voia Domnului, iar El este același și azi (Evrei 13:8). Nevoia cea mai adâncă a omului nu este trupul sănătos, ci păcatul iertat.",
      ),
      words: [
        {
          original: "σπλαγχνίζομαι",
          transliteration: "splanchnizomai",
          language: "greaca",
          meaning:
            "mi se face milă, mă îndur din adâncul ființei. Milă înseamnă că Dumnezeu nu se întoarce de la cel necurat; Se apropie și Se atinge.",
        },
      ],
      crossRefs: ["Levitic 13:45-46", "Levitic 14:1-7", "Matei 8:1-4", "Evrei 13:8"],
      forYourHeart:
        "Leprosul avea dreptate: Domnul poate. Întrebarea era dacă voiește — și răspunsul Său este același pentru tine: «Da, voiesc». Vino cu necurăția ta, fără să te temi de atingerea Lui.",
    },
  ],
  prayer:
    "Doamne Isuse, Fiul lui Dumnezeu, Îți mulțumim că ai intrat în lume ca să vestești vestea bună și că ai lăsat pilda ascultării în lucrurile mărunte. Întoarce-ne de la păcat și dă-ne credința care ascultă îndată, ca pescarii de la mare. Învață-ne să ne întâlnim cu Tatăl înainte de a ne întâlni cu oamenii, și păzește-ne de mândria faptelor mari. Fie ca viața noastră să vestească nu minunile noastre, ci mântuirea Ta. Amin.",
})

export const MARCU: BibleBook = {
  id: "marcu",
  name: "Marcu",
  testament: "nt",
  order: 41,
  blurb:
    "Evanghelia după Marcu este cea mai scurtă și cea mai alertă dintre cele patru. Începe fără genealogii și fără povestea nașterii: cu un titlu, cu un glas în pustiu și cu Isus care se mișcă repede din faptă în faptă. Marcu Îl arată pe Fiul lui Dumnezeu ca Slujitor: cheamă, vindecă, alungă, învață — și apoi Își dă viața ca răscumpărare pentru mulți.\n\nPentru cititorul grăbit, Marcu este o bună veste: nu trebuie să treci printr-o genealogie ca să-L vezi pe Isus la lucru. Pentru cel care stă, Marcu pune întrebarea care nu poate fi ocolită: cine este Acesta, de până și duhurile necurate Îl ascultă?\n\nMarcu a fost scris întâi pentru oameni care nu cunoșteau îndeaproape obiceiurile iudaice, de aceea explică lucruri pe care alții le lasă în pace. Dar inima cărții este aceeași cu a tuturor Evangheliilor: să crezi că Isus este Fiul lui Dumnezeu și să-L urmezi.",
  chapters: [MARCU_1],
}
