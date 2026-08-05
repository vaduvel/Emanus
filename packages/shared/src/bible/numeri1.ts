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

export const NUMERI_1 = numeriChapter({
  number: 1,
  title: "Numeri 1 — Un Dumnezeu care numește fiecare cap",
  summary:
    "La un an după ieșirea din Egipt, în pustia Sinai, DOMNUL poruncește un recensământ al tuturor bărbaților de la douăzeci de ani în sus, buni de mers la război. Sunt aleși pe nume doisprezece căpetenii, câte una din fiecare seminție, iar numărătoarea scoate la iveală o oștire de șase sute trei mii cinci sute cincizeci de bărbați. Leviții rămân în afara numărătorii de război, fiindcă sunt păstrați pentru o altă slujbă: paza și purtarea Cortului Întâlnirii.",
  literaryContext:
    "În ebraică, cartea aceasta nu se numește „Numeri”, ci Bemidbar — „În pustie” — după al cincilea cuvânt al capitolului întâi. Numele grecesc, luat de Septuaginta și moștenit de traducerile noastre, vine de la cele două recensăminte care deschid și, după treizeci și opt de ani de rătăcire, închid cartea în capitolul douăzeci și șase. Ambele nume spun ceva adevărat: cartea este așezată în pustie, și este țesută din numere. Dar numărătoarea nu este răceală de arhivă; ia aminte cum începe capitolul întâi — nu cu o cifră, ci cu nume, unul câte unul, seminție cu seminție. Cartea Numeri va povesti căderea unei generații întregi în pustie, dar începe prin a spune că fiecare din cei care vor cădea a fost mai întâi numit pe nume.",
  historicalContext:
    "Recensământul se face în prima zi a lunii a doua din al doilea an după ieșirea din Egipt — la doar o lună după ce Cortul fusese ridicat (Exod 40:17) și la aproape un an de la Sinai. Popoarele vecine își numărau și ele oștirile, dar aici recensământul nu se face pentru slava unui împărat, ci la porunca DOMNULUI, prin Moise și Aaron, cu câte o căpetenie din fiecare seminție de față. Numărul șase sute trei mii cinci sute cincizeci se apropie de cel din Exod 12:37 („ca la șase sute de mii de bărbați”) și de jumătatea de siclu plătită la numărătoarea din Exod 30:11-16. Leviții sunt lăsați deoparte de această numărătoare fiindcă nu aparțin oștirii de război, ci slujbei Cortului — lucru pe care capitolele următoare îl vor lămuri pe larg.",
  units: [
    {
      id: "numeri-1-1-4",
      ref: "Numeri 1:1-4",
      heading: "Porunca de a număra În mijlocul pustiei",
      text: numeriPassage(1, 1, 4),
      teaching: teaching(
        "Cartea Numeri se deschide cu un glas care vorbește „în pustia Sinai, în Cortul Întâlnirii”. Ia aminte la locul acesta: nu un templu de piatră, nu o cetate, ci un cort într-un pustiu fără hotare. Dumnezeu nu a așteptat ca poporul Său să ajungă undeva anume ca să-i vorbească; a venit să locuiască în mijlocul lor chiar în pustie, și de acolo dă cea dintâi poruncă a cărții.",
        "Porunca este un recensământ, dar unul cu un scop limpede: „toți cei din Israel buni de mers la război”. Nu se numără poporul ca să se laude cineva cu mărimea lui, ci ca să se știe cu ce oștire va merge mai departe spre țara făgăduită. Un Dumnezeu care a făgăduit un pământ pregătește acum poporul pentru drumul și pentru lupta care vor urma.",
        "Vezi și cine face numărătoarea: nu niște slujbași fără nume, ci Moise și Aaron, împreună cu câte un bărbat din fiecare seminție, „fiecare fiind cap al casei părinților săi”. Lucrarea aceasta nu se face de sus, peste capul poporului, ci prin cei pe care poporul însuși îi recunoaște drept căpetenii ale caselor lor.",
        "Amintirea numelor cere atenție: fiecare din cei numărați va fi „unul câte unul”, nu o masă amestecată. Dumnezeu, care va aduce peste puțin cea mai grea judecată asupra acestei generații, o numește acum om cu om. Judecata care vine în capitolele următoare nu va cădea peste o mulțime fără chip, ci peste oameni pe care Îi-i cunoștea deja pe nume.",
      ),
      words: [
        {
          original: "מדבר",
          transliteration: "midbar",
          language: "ebraica",
          meaning:
            "pustie, loc nelocuit. Dă numele ebraic al cărții, Bemidbar („În pustie”): Dumnezeu vorbește și lucrează tocmai acolo unde nu este nimic omenesc de care să se sprijine poporul.",
        },
        {
          original: "שאו צבא",
          transliteration: "seu rosh",
          language: "ebraica",
          meaning:
            "ridicați capul, adică numărați. Expresia ebraică pentru recensământ înseamnă literal a „ridica” fiecare cap dintr-o mulțime, ca să fie socotit aparte.",
        },
      ],
      crossRefs: ["Exod 30:11-16", "Exod 40:17", "Exod 12:37", "1 Cronici 21:1-6"],
      forYourHeart:
        "Dumnezeu ți-a rostit cuvintele cele mai însemnate ale vieții tale nu într-un loc încăpător, ci poate într-o pustie a ta. Nu socoti că vorbește doar acolo unde este belșug.",
    },
    {
      id: "numeri-1-5-16",
      ref: "Numeri 1:5-16",
      heading: "Doisprezece bărbați aleși pe nume",
      text: numeriPassage(1, 5, 16),
      teaching: teaching(
        "Urmează o listă de doisprezece nume, câte unul din fiecare seminție: Elizur, Şelumiel, Nahşon, Netanel, Eliab, Elişama, Gamaliel, Abidan, Ahiezer, Paghiel, Eliasaf, Ahira. Multe dintre ele nu vor mai fi pomenite niciodată în Scriptură dincolo de câteva rânduri din Numeri. Și totuși Duhul lui Dumnezeu a socotit de cuviință să le scrie, unul câte unul, cu tatăl fiecăruia. Nu este nevoie să fii pomenit în multe capitole ca să fii prețuit înaintea lui Dumnezeu.",
        "Ia aminte că aceste nume poartă adesea în ele Însuși Numele lui Dumnezeu: Elizur — „Dumnezeul meu este stâncă”; Netanel — „Dumnezeu a dat”; Eliasaf — „Dumnezeu a adăugat”. Părinții care le-au pus copiilor asemenea nume, încă pe când erau robi în Egipt sau abia scoși de acolo, mărturiseau prin numele pruncului lor o credință pe care poate nu au apucat să o vadă împlinită.",
        "Se cuvine arătat și un lucru mai ascuns: din seminția lui Iuda este numit Nahşon, fiul lui Amminadab. Neștiind-o încă, acest căpetenie de oștire stă în genealogia care duce, peste veacuri, la David și la Domnul Iisus Însăși, așa cum se vede în Matei 1:4 și Rut 4:20. Dumnezeu își țese lucrarea Sa cea mare chiar prin rândurile care par doar o listă administrativă.",
        "Textul încheie spunând că aceștia sunt „cei chemați din adunare”, „fruntașii semințiilor”. Vezi cum se așează rânduiala: nu se ridică nimeni singur la o slujbă de căpetenie; este chemat, recunoscut de ai săi, așezat într-o listă pe care Moise și Aaron o pun alături de porunca DOMNULUI.",
      ),
      words: [
        {
          original: "נשיאי מטות",
          transliteration: "nesiei matot",
          language: "ebraica",
          meaning:
            "căpeteniile semințiilor. Nu sunt dușmani aleși din întâmplare, ci oameni deja recunoscuți de frații lor drept capi ai caselor părinților lor.",
        },
        {
          original: "נחשון",
          transliteration: "Nahşon",
          language: "ebraica",
          meaning:
            "căpetenia lui Iuda din acest capitol; strămoș al lui David și, prin el, strămoș după trup al Domnului Iisus (Matei 1:4).",
        },
      ],
      crossRefs: ["Rut 4:20", "Matei 1:4", "1 Cronici 2:10", "Numeri 2:3"],
      forYourHeart:
        "Numele tău poate să nu ajungă niciodată vestit; Dumnezeu tot îl scrie și ține seama de tine ca de un cap al casei tale.",
    },
    {
      id: "numeri-1-17-19",
      ref: "Numeri 1:17-19",
      heading: "Ascultarea care pregătește numărătoarea",
      text: numeriPassage(1, 17, 19),
      teaching: teaching(
        "În trei versete scurte, cartea arată cum s-a făcut lucrarea: Moise și Aaron i-au luat pe căpeteniile numite pe nume și au strâns toată adunarea. Fiecare și-a declarat originea „după familiile lor, după casele părinților lor”. Nimeni nu intră în numărătoare fără să-și spună de unde vine.",
        "Cel mai scurt rând al unității este și cel mai greu de trecut cu vederea: „așa cum îi poruncise DOMNUL lui Moise”. În mijlocul unei lucrări lungi, obositoare, care va ține încă puțin în capitolele următoare, textul se oprește să spună că tot ce s-a făcut a fost făcut așa cum se poruncise, nici mai mult, nici mai puțin.",
        "Ascultarea aceasta nu este strigătoare; nu se vede în ea nicio minune. Este munca migaloasă de a strânge un popor întreg, familie cu familie, și de a scrie numele fiecăruia. De multe ori credincioșia înaintea lui Dumnezeu arată exact așa: nu ca un fulger, ci ca o numărătoare făcută până la capăt.",
      ),
      words: [
        {
          original: "ויתילדו על משפחתם",
          transliteration: "vaitiladu al mișpehotam",
          language: "ebraica",
          meaning:
            "și-au declarat nașterea/originea după familiile lor. Nimeni nu era socotit în Israel fără legătura cu casa părinților lui.",
        },
      ],
      crossRefs: ["Exod 39:32", "Exod 39:42-43", "1 Cronici 5:17"],
      forYourHeart:
        "Cea mai mare parte a ascultării tale de Dumnezeu nu va fi spectaculoasă. Va arăta ca o lucrare făcută până la capăt, așa cum s-a poruncit.",
    },
    {
      id: "numeri-1-20-46",
      ref: "Numeri 1:20-46",
      heading: "Oștirea numărată, seminție cu seminție",
      text: numeriPassage(1, 20, 46),
      teaching: teaching(
        "Urmează partea cea mai lungă a capitolului: douăsprezece numere, unul pentru fiecare seminție, repetate aproape cuvânt cu cuvânt. Ruben — patruzeci și șase de mii cinci sute; Simeon — cincizeci și nouă de mii trei sute; Gad — patruzeci și cinci de mii șase sute cincizeci; și tot așa, până la Neftali. Cine citește în grabă poate să sară peste rândurile acestea; dar cine încetinește vede că fiecare număr ascunde o muncă făcută om cu om, familie cu familie.",
        "Ia aminte la ordinea semințiilor. Ruben, întâiul născut, deschide lista, dar nu este cel mai mare la număr; Iuda, cu șaptezeci și patru de mii șase sute, este departe cea mai numeroasă seminție, iar mai târziu, în capitolul următor, va merge în fruntea tăberei. Nu întâietatea nașterii hotărăște locul înaintea lui Dumnezeu, ci felul în care seminția Își trăiește chemarea — iar din Iuda, așa cum spusese Iacov în Geneza 49:10, avea să vină toiagul de cârmuire.",
        "Vezi și pomenirea fiilor lui Iosif despărțiți în două: Efraim și Manase, fiecare cu numărul lui. Binecuvântarea pe care Iosif o primise de la Iacov — partea îndoită a întâiului născut, așa cum se vede în 1 Cronici 5:1-2 — se face acum trup viu: două seminții în locul uneia.",
        "Până la urmă, toate numerele se adună și către finalul capitolului textul le va strânge: șase sute trei mii cinci sute cincizeci de bărbați buni de război. Este numărul cu care Israel va porni la drum. Și este cutremărător să știi, citind înainte în carte, că din toți acești oameni numărați acum, afară de Iosua și Caleb, niciunul nu va intra în țara făgăduită (Numeri 14:29-30). Recensământul de la începutul cărții este, fără să se știe încă, numărarea unei generații care se va pierde în pustie.",
      ),
      words: [
        {
          original: "לבית אבתם",
          transliteration: "levet avotam",
          language: "ebraica",
          meaning:
            "după casa părinților lor. Formula se repetă la fiecare seminție: nimeni nu este numărat rupt de neamul lui.",
        },
        {
          original: "יצא צבא",
          transliteration: "iotze tzava",
          language: "ebraica",
          meaning:
            "bun de mers la război, literal cel care iese la oștire. Numai bărbații în putere sunt numărați, fiindcă scopul recensământului este drumul și lupta care vin.",
        },
      ],
      crossRefs: ["Geneza 49:10", "1 Cronici 5:1-2", "Numeri 2:3-31", "Numeri 14:29-30"],
      forYourHeart:
        "Fiecare număr din lista aceasta a fost, la vremea lui, un om cu nume, care nu știa încă ce va urma. Nici tu nu vezi tot ce vede Dumnezeu despre ziua de mâine.",
    },
    {
      id: "numeri-1-47-54",
      ref: "Numeri 1:47-54",
      heading: "Leviții, lăsați deoparte pentru o slujbă altfel",
      text: numeriPassage(1, 47, 54),
      teaching: teaching(
        "La capătul numărătorii vine o lămurire: leviții nu au fost numărați împreună cu restul semințiilor. Nu pentru că ar fi mai puțin însemnați, ci pentru că li s-a dat o altă chemare: „rânduiește-i pe leviți peste Cortul Mărturiei”. Nu orice slujbă pentru Dumnezeu intră în aceleași măsuri ca celelalte; unii sunt chemați la război, alții la pază și slujire în preajma lucrurilor sfinte.",
        "Ia aminte cum se descrie slujba lor: „vor purta Cortul și toate uneltele lui, vor sluji în el și vor tăbărî în jurul Cortului”. Leviții nu trăiesc răsfirați printre celelalte seminții; locul lor este chiar în preajma Cortului, mai aproape de el decât oricine altcineva în tabără. Apropierea aceasta nu este o răsplătire căutată, ci o răspundere: „stăinul care se va apropia să fie dat la moarte”.",
        "Iar această apropiere înseamnă și o pază care apară întregul popor: „Leviții vor avea paza Cortului Mărturiei... ca să nu vină mânia peste adunarea fiilor lui Israel”. Sfințenia lui Dumnezeu, dacă este apropiată fără rânduială, nu aduce viață, ci mânie; leviții sunt așezați tocmai ca zid de ocrotire între poporul de rând și sfințenia din mijlocul lor. Capitolele următoare vor arăta cu de-amănuntul cum se face aceasta.",
        "Capitolul se încheie cu un singur rând, dar hotărâtor: „Fiii lui Israel au făcut întocmai; au făcut după tot ce-i poruncise DOMNUL lui Moise”. La fel se va încheia și capitolul următor, și multe altele din carte. Ascultarea deplină, fără abătere, este piatra de temelie pe care stă tot ce va urma — chiar dacă, după puțină vreme, această ascultare va începe să se clatine.",
      ),
      words: [
        {
          original: "משכן העדות",
          transliteration: "mișkan haedut",
          language: "ebraica",
          meaning:
            "Cortul Mărturiei. Numit așa după tablele Mărturiei păstrate în chivot; locul unde locuia între oameni prezența lui Dumnezeu.",
        },
        {
          original: "קצף",
          transliteration: "qetzef",
          language: "ebraica",
          meaning:
            "mânie, izbucnire de urgie. Rânduiala leviților este așezată tocmai ca să oprească această mânie de a cădea peste întreaga adunare.",
        },
      ],
      crossRefs: ["Numeri 3:5-10", "Numeri 8:19", "Numeri 18:22-23", "1 Cronici 23:32"],
      forYourHeart:
        "Nu toată chemarea ta va arăta ca a celui de lângă tine. Unii sunt trimiși în față, alții sunt puși să vegheze aproape de lucrurile sfinte; amândouă sunt de la Dumnezeu.",
    },
  ],
  prayer:
    "Doamne, Tu ne cunoști pe fiecare pe nume, chiar într-o mulțime de sute de mii.\n\nÎnvață-ne să nu ne prețuim după cât se vede din noi, ci după chemarea pe care ne-ai dat-o.\n\nDă-ne ascultarea care duce lucrarea până la capăt, chiar când nu este nimic strălucit în ea.\n\nȘi păzește-ne să nu ne apropiem de sfințenia Ta fără rânduiala pe care Tu Însți ai așezat-o. Amin.",
  status: NUMERI_STATUSES[1],
})
