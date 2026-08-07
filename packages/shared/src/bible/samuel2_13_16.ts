import { samuel2Chapter, teaching } from "./samuel2Helpers.js"
import { samuel2Passage } from "./samuel2Text.js"
import { SAMUEL2_STATUSES } from "./samuel2Publication.js"

export const SAMUEL2_13 = samuel2Chapter({
  number: 13,
  title: "2 Samuel 13 — Tamar violată, David mânios și Absalom răzbunător",
  summary:
    "Amnon dorește pe Tamar, sora lui vitregă, și urmează planul lui Ionadab pentru a o aduce singură în camera lui. El o violează, apoi o urăște și o alungă. David se mânie, dar textul nu consemnează că îl disciplinează. Absalom păstrează tăcerea doi ani, apoi organizează uciderea lui Amnon și fuge.",
  literaryContext:
    "Capitolul începe împlinirea cuvântului lui Natan că sabia și răul se vor ridica din casa lui David. Poonen amintește violul Tamarei și uciderea lui Amnon ca parte a roadelor amare care urmează păcatului regelui.",
  historicalContext:
    "Prințul Amnon folosește accesul, boala prefăcută și autoritatea casei regale pentru a o izola pe Tamar. Hainele, cenușa și mâna pusă pe cap sunt semne publice ale durerii și rușinii suferite.",
  units: [
    {
      id: "2-samuel-13-1-19",
      ref: "2 Samuel 13:1-19",
      heading: "Amnon numește iubire o dorință care ignoră voința și demnitatea Tamarei",
      text: samuel2Passage(13, 1, 19),
      teaching: teaching(
        "Amnon spune că o iubește pe Tamar, dar acceptă un plan prin care o izolează și îi învinge împotrivirea prin forță.",
        "Tamar vorbește limpede: îi spune să nu o constrângă, numește fapta o ticăloșie și îi cere să nu-i facă răul. El refuză să o asculte și o violează.",
        "După faptă, dorința lui se schimbă în ură și o alungă, adăugând o nouă nedreptate. Textul nu învinovățește victima și nu numește comportamentul lui iubire adevărată. Constrângerea sexuală, inclusiv în familie sau într-o relație, este abuz, nu dragoste.",
      ),
      words: [
        {
          original: "אַל־תְּעַנֵּנִי",
          transliteration: "al-te'aneni",
          language: "ebraica",
          meaning:
            "nu mă constrânge, nu mă umili. Cuvintele Tamarei exprimă refuzul explicit pe care Amnon îl ignoră.",
        },
      ],
      crossRefs: ["Deuteronom 22:25-27", "1 Corinteni 13:5"],
      forYourHeart:
        "Refuzul trebuie ascultat. Dacă ai suferit violență sexuală, vina nu este a ta; caută siguranță și sprijin medical, psihologic, juridic și pastoral competent.",
    },
    {
      id: "2-samuel-13-20-29",
      ref: "2 Samuel 13:20-29",
      heading: "Tăcerea și lipsa dreptății lasă răzbunarea să crească",
      text: samuel2Passage(13, 20, 29),
      teaching: teaching(
        "Tamar rămâne pustiită în casa fratelui ei Absalom. David aude și se mânie, dar narațiunea nu consemnează o pedeapsă aplicată lui Amnon sau o restaurare urmărită pentru Tamar.",
        "Absalom îi spune Tamarei să tacă pentru moment, apoi păstrează ura timp de doi ani. În lipsa unei dreptăți curate, el construiește propria răzbunare.",
        "Ucigându-l pe Amnon la ospăț, Absalom nu vindecă rana surorii și nu reface dreptatea; adaugă o altă crimă în familie.",
      ),
      crossRefs: ["Romani 12:19", "Psalmul 82:3-4"],
      forYourHeart:
        "Tăcerea instituțională după abuz nu păstrează pacea. Protejează victima, cercetează faptele și cere răspundere fără a transforma dreptatea în răzbunare.",
    },
    {
      id: "2-samuel-13-30-39",
      ref: "2 Samuel 13:30-39",
      heading: "Absalom fuge, iar casa lui David rămâne ruptă",
      text: samuel2Passage(13, 30, 39),
      teaching: teaching(
        "Vestea inițială exagerează dezastrul, spunând că toți fiii au murit, dar Ionadab știe că ținta fusese Amnon.",
        "David și casa lui plâng, iar Absalom fuge la Gheșur pentru trei ani. Regele ajunge să tânjească după fiul său, dar nu există încă o reconciliere adevărată.",
        "Poonen așază această ruptură între consecințele familiale care urmează păcatului din capitolul 11. Iertarea lui David nu a făcut casa imună la ceea ce fusese semănat.",
      ),
      crossRefs: ["2 Samuel 12:10-12"],
      forYourHeart:
        "Păcatul ascuns al celui puternic poate răni generații și relații. Pocăința trebuie să includă și asumarea consecințelor asupra familiei.",
    },
  ],
  prayer:
    "Dumnezeule al dreptății, apără victimele violenței sexuale și descoperă răul ascuns în familii și instituții.\n\nDă-ne curaj să credem victima, să căutăm siguranță și răspundere și să nu înlocuim dreptatea prin tăcere sau răzbunare. Amin.",
  status: SAMUEL2_STATUSES[13],
})

export const SAMUEL2_14 = samuel2Chapter({
  number: 14,
  title: "2 Samuel 14 — Absalom revine fără ca ruptura să fie vindecată",
  summary:
    "Ioab trimite o femeie înțeleaptă din Tecoa să-i spună regelui o poveste și să-l determine să-l readucă pe Absalom. David acceptă întoarcerea, dar refuză să-l vadă timp de doi ani. Absalom își folosește presiunea și violența pentru a-l obliga pe Ioab să intervină, iar în cele din urmă este primit de rege.",
  literaryContext:
    "Capitolul descrie o întoarcere fizică fără o rezolvare clară a crimei, durerii și responsabilității. Acest spațiu va permite ambiției lui Absalom să se dezvolte în capitolul următor.",
  historicalContext:
    "Femeia din Tecoa folosește forma unei petiții juridice pentru a-l face pe David să se pronunțe asupra unui caz asemănător propriei sale familii.",
  units: [
    {
      id: "2-samuel-14-1-24",
      ref: "2 Samuel 14:1-24",
      heading: "O întoarcere negociată, dar fără apropiere",
      text: samuel2Passage(14, 1, 24),
      teaching: teaching(
        "Ioab înțelege dorul regelui și pregătește o poveste prin femeia din Tecoa. David recunoaște în cele din urmă mâna lui Ioab și poruncește întoarcerea lui Absalom.",
        "Totuși Absalom trebuie să meargă în propria casă și nu vede fața regelui. Problema nu este rezolvată prin simpla mutare înapoi la Ierusalim.",
        "Capitolul nu oferă un model complet de reconciliere. El arată pericolul apropierii administrative fără adevăr, răspundere, pocăință și refacerea încrederii.",
      ),
      crossRefs: ["Luca 17:3-4"],
      forYourHeart:
        "Nu numi vindecare simpla revenire în același loc. Reconcilierea are nevoie de adevăr, răspundere și o relație refăcută în siguranță.",
    },
    {
      id: "2-samuel-14-25-33",
      ref: "2 Samuel 14:25-33",
      heading: "Frumusețea publică și caracterul care folosește focul pentru a obține acces",
      text: samuel2Passage(14, 25, 33),
      teaching: teaching(
        "Absalom este lăudat pentru frumusețea lui, iar părul său devine un semn public al înfățișării care atrage atenția.",
        "Când Ioab nu răspunde, Absalom îi arde ogorul ca să-l forțeze să vină. El obține audiența nu prin răbdare și adevăr, ci prin pagubă și presiune.",
        "David îl sărută, dar narațiunea următoare va arăta că apropierea exterioară nu a schimbat ambiția și resentimentul lui Absalom.",
      ),
      crossRefs: ["1 Samuel 16:7"],
      forYourHeart:
        "Nu confunda farmecul exterior și accesul obținut cu un caracter vindecat. Presiunea și paguba nu sunt instrumente ale reconcilierii.",
    },
  ],
  prayer:
    "Doamne, dă-ne reconciliere adevărată, nu doar apropiere de suprafață.\n\nPăzește-ne de manipulare, presiune și încrederea în aparență și formează în noi pocăință și caracter. Amin.",
  status: SAMUEL2_STATUSES[14],
})

export const SAMUEL2_15 = samuel2Chapter({
  number: 15,
  title: "2 Samuel 15 — Absalom fură inimile, iar David părăsește Ierusalimul",
  summary:
    "Absalom își construiește imaginea regală, stă la poarta cetății, aprobă plângerile oamenilor și le fură inimile. După patru ani declară conspirația la Hebron. David pleacă din Ierusalim pentru a cruța cetatea, primește loialitatea lui Itai și trimite chivotul înapoi, încredințându-și viitorul lui Dumnezeu.",
  literaryContext:
    "Capitolul prezintă răzvrătirea deschisă a lui Absalom. Poonen folosește scena porții ca avertisment împotriva omului care adună ucenici pentru sine și slăbește conducerea existentă ca să-i ia locul.",
  historicalContext:
    "Poarta era locul judecății și al petițiilor. Absalom se poziționează acolo înaintea regelui și transformă fiecare caz într-o oportunitate de a câștiga loialitate politică.",
  units: [
    {
      id: "2-samuel-15-1-12",
      ref: "2 Samuel 15:1-12",
      heading: "Absalom aprobă fiecare om și îi fură inima",
      text: samuel2Passage(15, 1, 12),
      teaching: teaching(
        "Absalom își pregătește care, cai și oameni care să alerge înaintea lui. Imaginea de conducător este construită înainte ca el să aibă chemarea sau responsabilitatea tronului.",
        "La poartă, îi spune fiecărui om că pricina lui este bună și că regele nu a rânduit pe nimeni să-l asculte. Apoi declară cât de drept ar judeca el dacă ar fi pus în poziție.",
        "Poonen numește aceasta furtul inimilor: omul slăbește încrederea în conducere, confirmă tuturor că au dreptate și adună oameni după sine. Noul Testament avertizează și el asupra liderilor care trag ucenici după propria persoană.",
      ),
      crossRefs: ["Faptele 20:29-30"],
      forYourHeart:
        "Ferește-te de liderul care îți spune mereu că ai dreptate doar pentru a-ți câștiga loialitatea față de el.",
    },
    {
      id: "2-samuel-15-13-23",
      ref: "2 Samuel 15:13-23",
      heading: "David pleacă, iar Itai alege fidelitatea în necaz",
      text: samuel2Passage(15, 13, 23),
      teaching: teaching(
        "Când află că inimile oamenilor s-au întors spre Absalom, David decide să plece ca să nu aducă sabia peste Ierusalim.",
        "Itai era străin și venise de curând, iar David îi oferă libertatea de a se întoarce. El răspunde că va rămâne cu regele fie la viață, fie la moarte.",
        "Criza descoperă cine era legat de avantajul palatului și cine era legat prin fidelitate de om chiar în exil.",
      ),
      crossRefs: ["Rut 1:16-17"],
      forYourHeart:
        "Fidelitatea se vede când poziția și avantajul omului pe care îl urmezi dispar.",
    },
    {
      id: "2-samuel-15-24-37",
      ref: "2 Samuel 15:24-37",
      heading: "David trimite chivotul înapoi și își lasă viitorul în mâna lui Dumnezeu",
      text: samuel2Passage(15, 24, 37),
      teaching: teaching(
        "Preoții aduc chivotul, dar David îl trimite înapoi în cetate. El nu repetă greșeala veche de a folosi obiectul sfânt ca garanție a victoriei sau a revenirii.",
        "Spune că, dacă va găsi bunăvoință, DOMNUL îl va aduce înapoi; iar dacă Dumnezeu nu găsește plăcere în el, este gata să primească ceea ce va hotărî.",
        "David se roagă ca sfatul lui Ahitofel să fie zădărnicit și îl trimite pe Hușai în cetate. Dependența de Dumnezeu nu exclude folosirea mijloacelor responsabile, dar refuză controlul superstițios.",
      ),
      crossRefs: ["1 Samuel 4:3-11"],
      forYourHeart:
        "Nu folosi lucrurile sfinte ca garanție că Dumnezeu trebuie să-ți păstreze poziția. Încredințează-I rezultatul și umblă responsabil.",
    },
  ],
  prayer:
    "Doamne, păzește-ne de ambiția care fură inimile și adună oameni după sine.\n\nDă-ne fidelitatea lui Itai și smerenia de a-Ți încredința poziția, viitorul și întoarcerea noastră. Amin.",
  status: SAMUEL2_STATUSES[15],
})

export const SAMUEL2_16 = samuel2Chapter({
  number: 16,
  title: "2 Samuel 16 — David primește blestemul fără răzbunare, iar Absalom abuzează de putere",
  summary:
    "Țiba îl întâmpină pe David cu provizii și îl acuză pe Mefiboșet, iar regele hotărăște pripit asupra bunurilor. Șimei îl blestemă și aruncă cu pietre, dar David refuză să-l omoare și se încredințează DOMNULUI. La Ierusalim, Hușai intră în slujba lui Absalom, iar Ahitofel îl sfătuiește pe Absalom să ia public concubinele tatălui său.",
  literaryContext:
    "Capitolul prezintă reacțiile lui David în coborârea de pe tron și începutul sfaturilor date lui Absalom. Poonen pune accentul pe felul în care David primește blestemul lui Șimei prin înțelegerea suveranității lui Dumnezeu.",
  historicalContext:
    "Șimei aparține casei lui Saul și folosește momentul slăbiciunii lui David pentru a-l acuza. Ahitofel fusese bunicul Bat-Șebei, conform legăturii dintre 2 Samuel 11:3 și 23:34, și trecuse în tabăra lui Absalom.",
  units: [
    {
      id: "2-samuel-16-1-14",
      ref: "2 Samuel 16:1-14",
      heading: "David nu îi taie capul omului care îl blestemă",
      text: samuel2Passage(16, 1, 14),
      teaching: teaching(
        "Țiba aduce provizii și îl acuză pe Mefiboșet. David îi atribuie imediat averea, deși capitolul 19 va arăta că mărturia trebuia cercetată mai atent.",
        "Șimei îl blestemă, îl numește om al sângelui și aruncă pietre. Abișai cere voie să-i taie capul.",
        "David refuză și spune că este posibil ca DOMNUL să fi îngăduit blestemul; poate Dumnezeu va privi la necazul lui și îi va întoarce bine. Poonen vede aici înțelegerea că nimeni nu îl poate atinge fără permisiunea lui Dumnezeu și că răzbunarea trebuie lăsată Lui.",
      ),
      crossRefs: ["Romani 12:19", "1 Petru 2:23"],
      forYourHeart:
        "Când ești insultat în ziua slăbiciunii, nu da imediat ordinul răzbunării. Lasă loc suveranității și judecății lui Dumnezeu.",
    },
    {
      id: "2-samuel-16-15-23",
      ref: "2 Samuel 16:15-23",
      heading: "Sfatul lui Ahitofel transformă femeile în instrumente de război politic",
      text: samuel2Passage(16, 15, 23),
      teaching: teaching(
        "Hușai îl convinge pe Absalom că îi va sluji, în timp ce lucrează pentru zădărnicirea sfatului lui Ahitofel.",
        "Ahitofel îl sfătuiește pe Absalom să intre la concubinele lăsate de David să păzească palatul, pentru a face ruptura cu tatăl său publică și ireversibilă.",
        "Femeile nu sunt consultate și sunt tratate ca simboluri ale puterii masculine. Textul consemnează împlinirea consecinței vestite în capitolul 12, dar nu aprobă abuzul și nu îl transformă în model politic sau sexual.",
      ),
      crossRefs: ["2 Samuel 12:11-12"],
      forYourHeart:
        "Nicio luptă de putere nu dă dreptul de a folosi trupul altuia ca mesaj, răzbunare sau proprietate.",
    },
  ],
  prayer:
    "Doamne, dă-ne răbdare înaintea blestemului și oprește în noi impulsul răzbunării.\n\nPăzește-ne și de hotărârile luate după o singură mărturie.\n\nApără persoanele transformate în instrumente ale conflictelor de putere și fă-ne să respectăm demnitatea fiecăruia. Amin.",
  status: SAMUEL2_STATUSES[16],
})
