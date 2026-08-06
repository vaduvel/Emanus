import { samuel1Chapter, teaching } from "./samuel1Helpers.js"
import { samuel1Passage } from "./samuel1Text.js"
import { SAMUEL1_STATUSES } from "./samuel1Publication.js"

export const SAMUEL1_29 = samuel1Chapter({
  number: 29,
  title: "1 Samuel 29 — David este trimis înapoi de filisteni",
  summary: "David merge cu Achiș în tabăra filisteană, dar căpeteniile nu au încredere în el și cer să fie trimis înapoi. Achiș îl laudă, însă acceptă hotărârea lor, iar David se întoarce la Țiclag fără să lupte împotriva lui Israel.",
  literaryContext: "Capitolul îl scoate pe David dintr-o situație în care alianța sa cu Achiș îl adusese aproape de lupta împotriva propriului popor. Transcriptul Poonen nu dezvoltă separat scena.",
  historicalContext: "Filistenii se pregătesc pentru confruntarea care va duce la moartea lui Saul. Căpeteniile se tem că David se va împăca cu stăpânul său prin întoarcerea armelor împotriva lor.",
  units: [
    {
      id: "1-samuel-29-1-11",
      ref: "1 Samuel 29:1-11",
      heading: "David este scos din conflictul în care ajunsese prin alianța sa",
      text: samuel1Passage(29, 1, 11),
      teaching: teaching(
        "Achiș are încredere în David, dar celelalte căpetenii își amintesc cântecele despre victoriile lui și refuză prezența lui în luptă.",
        "David întreabă ce a făcut, însă hotărârea rămâne: trebuie să se întoarcă.",
        "Capitolul relatează o ieșire dintr-o situație complicată fără a atribui merit strategiilor înșelătoare care o precedaseră. Uneori omul este oprit de împrejurări înainte de a ajunge la consecința deplină a propriilor alegeri.",
      ),
      crossRefs: ["1 Corinteni 10:13"],
      forYourHeart: "Primește și ușa închisă care te scoate dintr-un compromis înainte ca el să ceară un preț mai mare.",
    },
  ],
  prayer: "Doamne, oprește-ne înainte ca alegerile noastre greșite să ne ducă într-un conflict mai adânc.\n\nDă-ne smerenie să primim și ușile pe care le închizi. Amin.",
  status: SAMUEL1_STATUSES[29],
})

export const SAMUEL1_30 = samuel1Chapter({
  number: 30,
  title: "1 Samuel 30 — David se întărește în DOMNUL și recuperează totul",
  summary: "Amaleciții ard Țiclagul și iau captive familiile. David și oamenii plâng până nu mai au putere, iar oamenii vor să-l omoare. David se întărește în DOMNUL, cere călăuzire, îi urmărește pe amaleciți și recuperează toate persoanele și bunurile. El împarte prada și cu cei rămași la bagaje.",
  literaryContext: "Capitolul îl readuce pe David la deprinderea de a-L întreba pe Dumnezeu. După compromisul din teritoriul filistean, criza de la Țiclag devine locul întăririi în DOMNUL.",
  historicalContext: "Raidul are loc în timp ce David și oamenii lui erau plecați cu armata filisteană. Două sute de oameni sunt prea obosiți pentru a traversa pârâul Besor.",
  units: [
    {
      id: "1-samuel-30-1-10",
      ref: "1 Samuel 30:1-10",
      heading: "David se întărește în DOMNUL, Dumnezeul său",
      text: samuel1Passage(30, 1, 10),
      teaching: teaching(
        "David și oamenii lui își găsesc cetatea arsă și familiile luate. Ei plâng până nu mai au putere, iar durerea oamenilor se întoarce împotriva lui David.",
        "În acel punct, David se întărește în DOMNUL, Dumnezeul său. El nu își construiește curajul pe o resursă vizibilă, ci se întoarce la Dumnezeu și cere din nou călăuzire.",
        "Răspunsul îl trimite în urmărire cu promisiunea recuperării.",
      ),
      words: [
        {
          original: "וַיִּתְחַזֵּק דָּוִד בַּיהוָה אֱלֹהָיו",
          transliteration: "vayithazek David ba-YHWH Elohav",
          language: "ebraica",
          meaning: "David s-a întărit în DOMNUL, Dumnezeul său. Verbul exprimă primirea unei puteri interioare în relația cu Dumnezeu când sprijinul omenesc dispăruse.",
        },
      ],
      crossRefs: ["Psalmul 18:1-2"],
      forYourHeart: "Când chiar oamenii tăi se întorc împotriva ta, întărește-te mai întâi în Dumnezeu și apoi cere direcția următorului pas.",
    },
    {
      id: "1-samuel-30-11-20",
      ref: "1 Samuel 30:11-20",
      heading: "Nimic nu lipsește",
      text: samuel1Passage(30, 11, 20),
      teaching: teaching(
        "Un egiptean abandonat de stăpânul său îi conduce spre tabăra amaleciților. David lovește grupul și recuperează totul.",
        "Textul repetă că nu a lipsit nimeni, mic sau mare, fiu sau fiică. Bucuria recuperării răspunde plânsului de la începutul capitolului.",
        "Ajutorul vine și printr-un om bolnav, lăsat să moară de cei pe care îi slujise. David îl hrănește înainte de a primi informația de care avea nevoie.",
      ),
      crossRefs: ["Proverbe 19:17"],
      forYourHeart: "Nu trece pe lângă omul abandonat. Mila arătată celui slab poate deveni chiar drumul spre ceea ce cauți.",
    },
    {
      id: "1-samuel-30-21-31",
      ref: "1 Samuel 30:21-31",
      heading: "Partea celui rămas la bagaje",
      text: samuel1Passage(30, 21, 31),
      teaching: teaching(
        "Oamenii care au luptat nu vor să împartă prada cu cei rămași în urmă din cauza epuizării.",
        "David stabilește că partea celui care coboară la luptă va fi aceeași cu partea celui care păzește bagajele.",
        "El trimite daruri și bătrânilor din Iuda. Biruința nu devine prilej de egoism, ci este împărțită cu cei care au avut un rol mai puțin vizibil.",
      ),
      crossRefs: ["1 Corinteni 3:8"],
      forYourHeart: "Nu măsura valoarea numai după rolul vizibil din prima linie. Lucrarea comună cere și oameni care rămân la bagaje.",
    },
  ],
  prayer: "Doamne, învață-ne să ne întărim în Tine când toate sprijinirile dispar.\n\nDă-ne călăuzire, milă față de cel abandonat și generozitate față de cei cu roluri mai puțin vizibile. Amin.",
  status: SAMUEL1_STATUSES[30],
})

export const SAMUEL1_31 = samuel1Chapter({
  number: 31,
  title: "1 Samuel 31 — Sfârșitul tragic al lui Saul",
  summary: "Filistenii înving Israelul pe muntele Ghilboa. Ionatan și ceilalți fii ai lui Saul mor, iar Saul este grav rănit. El se aruncă în propria sabie, iar purtătorul lui de arme face la fel. Filistenii îi expun trupul, dar oamenii din Iabeș-Galaad îl recuperează și îl îngroapă.",
  literaryContext: "Cartea se încheie cu moartea regelui care începuse smerit și înzestrat, dar coborâse prin neascultare, frica de oameni, gelozie și violență. Poonen numește finalul lui un sfârșit trist.",
  historicalContext: "Bătălia are loc pe muntele Ghilboa. Oamenii din Iabeș-Galaad își amintesc de izbăvirea primită prin Saul la începutul domniei lui și îi recuperează trupul.",
  units: [
    {
      id: "1-samuel-31-1-13",
      ref: "1 Samuel 31:1-13",
      heading: "Un început bun nu a fost păstrat până la capăt",
      text: samuel1Passage(31, 1, 13),
      teaching: teaching(
        "Saul, fiii lui și armata sunt învinși. Regele cere purtătorului de arme să-l omoare, iar când acesta refuză, se aruncă în propria sabie.",
        "Poonen așază acest final la capătul unei coborâri lungi: pierderea ascultării, teama de oameni, căutarea cinstei publice, gelozia față de David, violența și consultarea unui medium.",
        "Moartea lui Saul nu este un model de curaj și nu justifică sinuciderea. Este finalul tragic al unui om care a refuzat repetat întoarcerea. Când cineva se află în pericol să-și facă rău, răspunsul potrivit este siguranță imediată și ajutor omenesc competent, nu imitarea narațiunii.",
        "Oamenii din Iabeș-Galaad îi recuperează trupul, amintind fără cuvinte că viața lui Saul avusese și un început în care îi salvase.",
      ),
      crossRefs: ["1 Samuel 11:1-13", "1 Cronici 10:13-14"],
      forYourHeart: "Nu te sprijini pe calitățile și experiențele de la început. Păstrează ascultarea până la capăt și cere ajutor imediat când disperarea îți amenință viața.",
    },
  ],
  prayer: "Doamne, păzește-ne să nu pierdem prin neascultare ceea ce ne-ai încredințat.\n\nEliberează-ne de gelozie, frica oamenilor și disperare și dă-ne harul de a umbla cu Tine până la capăt. Amin.",
  status: SAMUEL1_STATUSES[31],
})
