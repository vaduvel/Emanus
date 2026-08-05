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

export const NUMERI_3 = numeriChapter({
  number: 3,
  title: "Numeri 3 — Leviții luați în locul întâilor născuți",
  summary:
    "Capitolul începe cu familia lui Aaron — doi fii morți pentru foc străin, doi rămași în slujbă — apoi recensământul leviților de la o lună în sus: gherșoniți, chehatiți și merariți, fiecare familie cu locul ei în tabără și cu slujba ei aparte la Cort. La urmă vine o socoteală: DOMNUL ia leviții în locul tuturor întâilor născuți ai lui Israel, iar diferența de două sute șaptezeci și trei se răscumpără cu argint.",
  literaryContext:
    "Dacă în capitolul întâi leviții fuseseră doar lăsați deoparte de recensământul de război, aici li se dă în sfârșit propriul lor recensământ și propria lor rânduială. Capitolul se împarte limpede: familia lui Aaron (1-4), predarea leviților către Aaron (5-10), temeiul teologic al schimbului — leviți în locul întâilor născuți (11-13), numărătoarea celor trei familii ale lui Levi cu tabăra și slujba fiecăreia (14-39), și răscumpărarea prin argint a diferenței dintre cele două numere (40-51). Fiecare parte pregătește tema centrală a cărții: cine se poate apropia de sfințenia lui Dumnezeu, și cu ce preț.",
  historicalContext:
    "Moartea lui Nadab și a lui Abihu, povestită pe larg în Levitic 10:1-3, este amintită aici pe scurt, ca fundal pentru rânduiala care urmează: apropierea de sfințenie fără ascultare aduce moarte, nu cinste. Ideea răscumpărării întâiului născut vine chiar din noaptea Paștelui, când DOMNUL a cruțat pe întâii născuți ai lui Israel și i-a socotit de atunci ai Săi (Exod 13:1-2, 11-15). Numărătoarea leviților de la o lună în sus — nu de la douăzeci de ani, ca la recensământul de război — arată că închinarea lor nu ține de vârsta puterii, ci de apartenența de la naștere.",
  units: [
    {
      id: "numeri-3-1-4",
      ref: "Numeri 3:1-4",
      heading: "Patru fii, doi morți pentru foc străin",
      text: numeriPassage(3, 1, 4),
      teaching: teaching(
        "Capitolul începe cu o genealogie scurtă, dar ea ascunde una din cele mai grele povești din cartea Levitic: Nadab și Abihu "au murit înaintea DOMNULUI când au adus foc străin înaintea DOMNULUI". Textul nu se oprește să repete întreaga întâmplare din Levitic 10, dar nici nu o ascunde: o pune chiar în capul listei preoților, ca o piatră de aducere-aminte pentru tot ce va urma.",
        "Ia aminte ce înseamnă a fi "preoți unși, învestiți ca să slujească": nu este o slujbă pe care oricine o poate lua după plac. Nadab și Abihu fuseseră ei înșiși unși și învestiți, și tot au pierit pentru o apropiere neascultătoare. Rânduiala aceasta nu este împotriva preoției, ci temeiul pentru care preoția are nevoie de o rânduială atât de strictă.",
        "Și totuși capitolul nu se oprește în întuneric: "Eleazar și Itamar au slujit ca preoți în fața tatălui lor, Aaron". Căderea a doi fii nu a stins slujba; ceilalți doi au continuat-o. Dumnezeu nu lasă slujba Lui să se piardă din pricina păcatului unora, dar nici nu îngăduie ca păcatul să fie trecut cu vederea de dragul continuității.",
      ),
      words: [
        {
          original: "אֵשׁ זָרָה",
          transliteration: "eș zara",
          language: "ebraica",
          meaning:
            "foc străin. Nu focul luat de la altarul rânduit de DOMNUL, ci unul adus după voia proprie a preotului; a apropia de Dumnezeu ceva neporuncit este tot atât de grav ca a nu apropia nimic.",
        },
      ],
      crossRefs: ["Levitic 10:1-3", "Exod 28:41", "1 Cronici 24:1-2"],
      forYourHeart:
        "A fi uns pentru o slujbă nu te scutește de ascultare; dimpotrivă, cu cât ești mai aproape de lucrurile sfinte, cu atât ascultarea contează mai mult.",
    },
    {
      id: "numeri-3-5-10",
      ref: "Numeri 3:5-10",
      heading: "Leviții, dați cu totul lui Aaron",
      text: numeriPassage(3, 5, 10),
      teaching: teaching(
        "DOMNUL poruncește ca semința lui Levi să fie apropiată de Aaron, "ca să-i slujească". Nu se apropie de la sine, nu-și aleg singuri locul; sunt puși într-o rânduială de slujire care începe de la Aaron și coboară spre toată adunarea.",
        "De două ori se repetă cuvântul "pază": leviții "vor păzi toate uneltele Cortului" și vor "îndeplini slujba". Slujba lor este mai ales o veghe, o grijă neîntreruptă pentru lucrurile sfinte, nu doar o muncă de o clipă. Cine păzește ceva sfânt trebuie să rămână treaz la datoria lui multă vreme, nu doar în ziua în care se vede lucrul.",
        "Cel mai greu de primit este poate rândul: "ei îi sunt dați cu totul din mijlocul fiilor lui Israel". Nu sunt împrumutați, nu sunt angajați pentru o vreme; sunt dăruiți întreg, fără rest. Iar la capătul unității stă din nou avertismentul cunoscut deja din capitolul întâi: "străinul care se va apropia să fie dat la moarte". Sfințenia Cortului cere o rânduială care nu se lasă înmuiată de bunăvoința nimănui.",
      ),
      words: [
        {
          original: "נָתוּן נְתֻנִים",
          transliteration: "natun netunim",
          language: "ebraica",
          meaning:
            "dați, cu totul dați. Repetarea aceluiași verb subliniază caracterul deplin, fără rezervă, al dăruirii leviților către slujba Cortului.",
        },
      ],
      crossRefs: ["Numeri 1:51", "Numeri 18:1-7", "1 Cronici 23:28-32"],
      forYourHeart:
        "Slujirea adevărată nu este împrumutată din când în când, ci dăruită cu totul. Ce parte din viața ta ai ținut-o încă pentru tine, în loc s-o dai lui Dumnezeu întreagă?",
    },
    {
      id: "numeri-3-11-13",
      ref: "Numeri 3:11-13",
      heading: "În locul tuturor întâilor născuți",
      text: numeriPassage(3, 11, 13),
      teaching: teaching(
        "Aici stă temeiul teologic al întregului capitol: "Eu i-am luat pe leviți din mijlocul fiilor lui Israel în locul tuturor întâilor născuți". Nu este doar o organizare de trib pentru o muncă; este un schimb pe care DOMNUL Însuși îl rânduiește, cu leviții stând acum acolo unde ar fi trebuit să stea, prin drept de întâi-născut, un băiat din fiecare familie a lui Israel.",
        "Motivul acestui drept este amintit direct: "în ziua în care i-am lovit pe toți întâii născuți în țara Egiptului, Mi-am sfințit toți întâii născuți din Israel". Este noaptea Paștelui. Când moartea a trecut prin Egipt și a cruțat pe cei acoperiți de sânge, viața cruțată a fiecărui întâi-născut a devenit, din clipa aceea, proprietatea DOMNULUI. Nu se poate uita cui i se datorează viața.",
        "Vezi cât de departe merge cuvântul "ai Mei": "toți întâii născuți sunt ai Mei... de la om până la animal". Cruțarea din noaptea aceea nu s-a oprit la marginea vieții omenești, ci a cuprins tot ce trăia. Iar acum, ca semn văzut al acestei apartenențe, o singură semințe — Levi — stă în locul tuturor celorlalte.",
      ),
      words: [
        {
          original: "פֶּטֶר רֶחֶם",
          transliteration: "peter rehem",
          language: "ebraica",
          meaning:
            "cel care deschide pântecele, adică întâiul născut. Expresia leagă direct rânduiala leviților de noaptea Paștelui, când fiecare întâi-născut cruțat a devenit al DOMNULUI.",
        },
      ],
      crossRefs: ["Exod 13:1-2", "Exod 13:11-15", "Exod 12:12-13", "Luca 2:22-23"],
      forYourHeart:
        "Viața ta, dacă ai fost cruțat de moarte prin sângele Mielului, nu-ți mai aparține ție. Ai luat aminte cui Îi datorezi fiecare zi pe care o trăiești?",
    },
    {
      id: "numeri-3-14-20",
      ref: "Numeri 3:14-20",
      heading: "Numărătoarea din pustia Sinai: trei fii, trei familii",
      text: numeriPassage(3, 14, 20),
      teaching: teaching(
        "Numărătoarea leviților este altfel decât cea din capitolul întâi: nu se numără doar bărbații buni de război, ci "toți bărbații de la vârsta de o lună în sus". Apartenența lor la DOMNUL nu ține de puterea trupului, ci de faptul că s-au născut în semnția aleasă. Un prunc de o lună este numărat la fel de îndreptățit ca un bărbat în putere.",
        "Cei trei fii ai lui Levi — Gherșon, Chehat și Merari — dau numele celor trei familii mari care vor purta întreaga slujbă a Cortului. Fiecare are locul lui rostuit: casele lor, familiile lor, numele capilor lor sunt scrise cu aceeași grijă cu care fuseseră scrise numele căpeteniilor de trib în capitolele anterioare.",
        "Ia aminte că genealogia aceasta nu este doar administrativă: din Chehat, prin Amram, se va naște Moise însuși, iar prin el Aaron. Cel care scrie această carte face parte din familia pe care o numără; nu privește lucrarea leviților din afară, ci din chiar mijlocul ei.",
      ),
      words: [
        {
          original: "מִבֶּן־חֹדֶשׁ וָמָעְלָה",
          transliteration: "miben-hodeș vamala",
          language: "ebraica",
          meaning:
            "de la vârsta de o lună în sus. Măsura arată că apartenența leviților la DOMNUL nu se leagă de vârsta puterii de muncă, spre deosebire de recensământul de război din capitolul întâi.",
        },
      ],
      crossRefs: ["Exod 6:16-20", "1 Cronici 6:1-3", "Numeri 26:57-59"],
      forYourHeart:
        "Nu trebuie să fii puternic sau matur ca să aparții lui Dumnezeu; apartenența aceasta începe de la cea mai mică vârstă, dacă ai fost dat Lui.",
    },
    {
      id: "numeri-3-21-26",
      ref: "Numeri 3:21-26",
      heading: "Gherșoniții: la apus, cu grija covoarelor și a perdelelor",
      text: numeriPassage(3, 21, 26),
      teaching: teaching(
        "Familia lui Gherșon, cu cele două ramuri ale ei — libniți și șimeiți — numără șapte mii cinci sute de bărbați și tăbărăște în spatele Cortului, spre apus, chiar în tabăra centrală rânduită în capitolul al doilea.",
        "Slujba lor este numită cu de-amănuntul: Cortul, învelitoarea lui, perdelele, pânzele curții, frânghiile. Nimic din ce ține de partea văzută, țesută și cusută a Lăcașului nu este lăsat la voia întâmplării; fiecare bucată de material are un rând de oameni răspunzători de ea.",
        "Nu este o slujbă strălucită. Nimeni nu vede vreo minune în purtarea unei perdele sau în strângerea unei frânghii. Și totuși, fără grija aceasta tăcută, sfântul Lăcaș nu ar putea fi nici ridicat, nici strâns, nici purtat prin pustie. Slujba cea mai simplă poartă, de multe ori, tot ce este mai sfânt.",
      ),
      words: [
        {
          original: "מִשְׁכָּן",
          transliteration: "mișkan",
          language: "ebraica",
          meaning:
            "locuință, Lăcaș. Este cuvântul folosit pentru Cort ca loc de locuire a DOMNULUI printre oameni, purtat mereu de aceeași familie de leviți care îi poartă și pânzele.",
        },
      ],
      crossRefs: ["Exod 26:1-14", "Numeri 4:24-28", "Numeri 2:18-24"],
      forYourHeart:
        "Slujba ta poate să nu fie niciodată văzută sau lăudată. Dumnezeu nu măsoară slujirea după cât de strălucită pare, ci după cât de credincioasă este.",
    },
    {
      id: "numeri-3-27-32",
      ref: "Numeri 3:27-32",
      heading: "Chehatiții: la sud, cu paza lucrurilor celor mai sfinte",
      text: numeriPassage(3, 27, 32),
      teaching: teaching(
        "Familia lui Chehat, cea mai numeroasă dintre cele trei — opt mii șase sute de bărbați — tăbărăște pe partea de sud a Cortului. În paza lor stau lucrurile cele mai sfinte dintre toate: chivotul, masa, sfeșnicul, altarele, uneltele Sfântului Lăcaș.",
        "Ia aminte cine este pus căpetenie peste toate căpeteniile leviților: Eleazar, fiul preotului Aaron, "va supraveghea pe cei ce îndeplinesc slujba Sfântului Lăcaș". Cu cât slujba este mai apropiată de lucrurile cele mai sfinte, cu atât rânduiala de supraveghere este mai strânsă. Nu există apropiere de sfințenie fără o răspundere pe măsură.",
        "Capitolul următor va arăta cu de-amănuntul cum se acoperă și se poartă chiar aceste lucruri, ca nimeni din familia lui Chehat să nu le atingă direct și să nu piară; deocamdată, textul se mulțumește să spună cine poartă răspunderea pentru ele.",
      ),
      words: [
        {
          original: "אֲרוֹן",
          transliteration: "aron",
          language: "ebraica",
          meaning:
            "chivot, ladă. Chivotul Mărturiei, cel mai sfânt dintre toate lucrurile Cortului, se afla în paza — dar nu în atingerea directă — a familiei lui Chehat.",
        },
      ],
      crossRefs: ["Exod 25:10-22", "Numeri 4:1-20", "1 Cronici 15:2"],
      forYourHeart:
        "Cu cât ești chemat mai aproape de lucrurile sfinte, cu atât mai mare este răspunderea pusă asupra ta. Nu cere apropierea fără să primești și rânduiala ei.",
    },
    {
      id: "numeri-3-33-39",
      ref: "Numeri 3:33-39",
      heading: "Merariții la nord, iar Moise și Aaron chiar la răsărit",
      text: numeriPassage(3, 33, 39),
      teaching: teaching(
        "Familia lui Merari, șase mii două sute de bărbați, tăbărăște la nordul Cortului, cu grija celor mai grele și mai puțin luminoase părți ale lui: scândurile, drugii, stâlpii, picioarele — scheletul de lemn și de bronz care ținea în picioare toată clădirea Cortului și curtea din jurul lui.",
        "Cu numărătoarea celor trei familii ale lui Levi se încheie douăzeci și două de mii de bărbați, iar textul ține să arate un ultim loc: chiar în fața Cortului, spre răsărit, tăbărăsc Moise, Aaron și fiii lui. Locul cel mai apropiat de intrarea Cortului nu este dat celei mai mari familii, ci celui pus să poarte întreaga răspundere a preoției.",
        "Și din nou revine avertismentul: "străinul care se va apropia să fie dat la moarte". De trei ori în capitolul acesta se repetă acest cuvânt greu — la predarea leviților către Aaron, și acum la locul lui Moise și al preoților. Sfințenia lui Dumnezeu nu este o idee frumoasă; este o realitate care cere o rânduială pe măsura ei.",
      ),
      words: [
        {
          original: "קְרָשִׁים",
          transliteration: "kerashim",
          language: "ebraica",
          meaning:
            "scânduri. Bucățile de lemn de salcâm îmbrăcate în aur care alcătuiau pereții Cortului; grija lor era încredințată familiei lui Merari, cea mai puțin văzută dintre cele trei.",
        },
      ],
      crossRefs: ["Exod 26:15-30", "Numeri 4:29-33", "Numeri 2:1-2"],
      forYourHeart:
        "Nu tot ce susține sfințenia se vede din afară. Uneori slujba ta este ca scândurile din spatele covoarelor: nimeni nu o laudă, dar fără ea nimic nu ar sta în picioare.",
    },
    {
      id: "numeri-3-40-51",
      ref: "Numeri 3:40-51",
      heading: "Diferența de argint: două sute șaptezeci și trei de suflete",
      text: numeriPassage(3, 40, 51),
      teaching: teaching(
        "Vine acum socoteala din urmă a capitolului. Întâii născuți ai lui Israel, numărați de la o lună în sus, au fost douăzeci și două de mii două sute șaptezeci și trei. Leviții, numărați cu aceeași măsură, au fost exact douăzeci și două de mii. Diferența — două sute șaptezeci și trei de suflete — nu are un levit care s-o înlocuiască.",
        "Ia aminte cât de exactă este socoteala aceasta înaintea lui Dumnezeu: nu s-a rotunjit, nu s-a trecut cu vederea. Fiecare din cei două sute șaptezeci și trei rămași fără schimb trebuie răscumpărat aparte, cu câte cinci sicli de argint de cap, după sichelul Sfântului Lăcaș.",
        "Argintul acesta nu se pierde nicăieri: "să-i dai banii lui Aaron și fiilor lui". Răscumpărarea celui care nu are un înlocuitor viu se face tot prin preoție, tot legată de Cort. Nu există cale de a fi socotit înaintea lui Dumnezeu în afara rânduielii pe care El Însuși a așezat-o.",
        "Capitolul se încheie cu aceeași formulă de ascultare pe care am întâlnit-o deja de două ori: Moise a făcut "după cuvântul DOMNULUI, așa cum îi poruncise DOMNUL lui Moise". O socoteală atât de amănunțită, până la ultimul suflet și ultimul siclu, a fost împlinită întocmai. Pentru cititorul care va ajunge, peste veacuri, să înțeleagă cum s-a răscumpărat sufletul lui, capitolul acesta rămâne o icoană: nimeni nu se apropie de Dumnezeu fără preț plătit, și niciun suflet nu este uitat din socoteală.",
      ),
      words: [
        {
          original: "פִּדְיוֹם",
          transliteration: "pidion",
          language: "ebraica",
          meaning:
            "răscumpărare, preț de răscumpărare. Cei care nu aveau un levit ca înlocuitor trebuiau răscumpărați cu argint, semn că apropierea de Dumnezeu are întotdeauna un preț plătit, fie prin persoană, fie prin preț.",
        },
        {
          original: "שֶׁקֶל הַקֹּדֶשׁ",
          transliteration: "șechel hakodeș",
          language: "ebraica",
          meaning:
            "siclul Sfântului Lăcaș. O măsură fixă de argint, deosebită de siclul obișnuit de comerț, folosită special pentru plățile legate de sfințenie.",
        },
      ],
      crossRefs: ["Exod 30:11-16", "Levitic 27:6", "1 Petru 1:18-19"],
      forYourHeart:
        "Nimeni nu este uitat din socoteala lui Dumnezeu — nici cel de-al douăzeci și doua de mii, nici cel din urmă, al doilea sute șaptezeci și treilea. Fiecare suflet are un preț plătit pentru el.",
    },
  ],
  prayer:
    "Doamne, Tu ai luat leviții în locul întâilor născuți, și ne-ai arătat că nicio viață cruțată nu-Ți mai aparține.\n\nÎnvață-ne să ne dăm Ție cu totul, nu doar o parte, așa cum leviții au fost dați cu totul din mijlocul poporului.\n\nDă-ne răbdare pentru slujbele tăcute, cele pe care nimeni nu le vede și nu le laudă, dar fără de care nimic nu ar sta în picioare.\n\nȘi ține-ne aminte că niciun suflet nu este uitat din socoteala Ta; fiecare are un preț plătit, ca să poată sta înaintea Ta. Amin.",
  status: NUMERI_STATUSES[3],
})
