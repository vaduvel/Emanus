import type { Lesson, LessonStep } from "../domain.js"

/**
 * Modulul 7 din docs/41-module-teme-poonen.md: "Lauda ca arma".
 * Temele 25-30.
 *
 * Sursa: Zac Poonen, "Basic Christian Teachings", capitolele 25-30 (cfcindia.com).
 * Tradus fidel din textul autorului. Vezi docs/42-sursa-si-atribuire-poonen.md.
 * Stare: in_review.
 */

type Input = {
  id: string
  order: number
  title: string
  refs: string[]
  ref: string
  hook: string
  word: string
  truth: string[]
  wrongA: string
  wrongB: string
  right: string
  explanation: string
  step: string
  prayer: string
  journal: string
  memory: string
}

const COURSE_ID = "teme_c7_lauda"

const b = (...text: string[]) => text.map((line) => ({ from: "guide" as const, text: line }))

function make(i: Input): Lesson {
  const p = i.id.replace(/_/g, "")
  const steps: LessonStep[] = [
    { id: `${p}h`, type: "hook", order: 1, bubbles: b(i.hook) },
    {
      id: `${p}c`,
      type: "choice",
      order: 2,
      choice: {
        prompt: "Ce canti tu, de obicei?",
        options: [
          { id: `${p}c1`, label: "Cantecul vechi: ma plang." },
          { id: `${p}c2`, label: "Depinde cum imi merge." },
          { id: `${p}c3`, label: "Vreau sa invat cantarea cea noua." },
        ],
      },
    },
    { id: `${p}s`, type: "scripture", order: 3, scripture: { text: i.word, ref: i.ref } },
    { id: `${p}t`, type: "truth_simple", order: 4, bubbles: b(...i.truth) },
    {
      id: `${p}q`,
      type: "quiz",
      order: 5,
      quiz: {
        question: "Care este raspunsul asezat?",
        options: [
          { text: i.wrongA, correct: false },
          { text: i.right, correct: true },
          { text: i.wrongB, correct: false },
        ],
        explanation: i.explanation,
      },
    },
    {
      id: `${p}a`,
      type: "how_god_helps",
      order: 6,
      bubbles: b(
        "Cel ce aduce multumiri ca jertfa Ma proslaveste si isi pregateste calea ca sa-i arat mantuirea Mea.",
        "Dumnezeu deschide usa, dar noi Ii facem loc prin lauda.",
      ),
    },
    { id: `${p}p`, type: "step", order: 7, bubbles: b(i.step) },
    { id: `${p}r`, type: "prayer", order: 8, bubbles: b(i.prayer) },
    { id: `${p}j`, type: "journal", order: 9, journalPrompt: i.journal },
    { id: `${p}m`, type: "memory_verse", order: 10, scripture: { text: i.memory, ref: i.ref } },
  ]
  return {
    id: i.id,
    courseId: COURSE_ID,
    order: i.order,
    title: i.title,
    estMinutes: 9,
    anchorRefs: i.refs,
    memoryVerseRef: i.ref,
    steps,
  }
}

export const LAUDA_CA_ARMA_LESSONS: Lesson[] = [
  make({
    id: "lauda_l1",
    order: 1,
    title: "Credinta si lauda",
    refs: ["Psalmul 106:11-12", "Psalmul 22:3", "Evrei 2:12-13", "Filipeni 2:14"],
    ref: "Psalmul 106:12",
    hook: "Cand un om are credinta, Il va lauda pe Dumnezeu. Cand este in necredinta, va cari, se va plange, va critica si va fi nemultumit.",
    word: "Atunci au crezut in cuvintele Lui si au cantat laudele Lui.",
    truth: [
      "Israelitii au putut sa-L laude pe Dumnezeu abia dupa ce au vazut pe egipteni inecati inaintea ochilor lor. Ei traiau prin vedere: dupa ce se rezolva totul, dupa ce furtuna s-a potolit, atunci laudau. Asta poate face oricine; si un pagan multumeste cand i s-au rezolvat toate problemele.",
      "Noi umblam prin credinta. Putem crede Cuvantul inainte de a vedea vrajmasii inecati. Putem sa-L laudam pe Dumnezeu cu vrajmasii inca in fata noastra, cum spunea David: Tu imi intinzi masa in fata potrivnicilor mei.",
      "Cu cat cartesti si te plangi mai mult, cu atat iti maresti singur necazul. Amaraciunea pe care o tii in inima te distruge: iti distruge trupul, sufletul, duhul si legatura cu Dumnezeu.",
      "Dumnezeu este un Imparat mare si nu sade pe un scaun ieftin, de argint sau de aur; ar fi prea ieftin pentru El. Este scris: Tu esti sfant, Tu care locuiesti in mijlocul laudelor lui Israel - astazi, ale Bisericii.",
      "Deci cum Ii facem lui Dumnezeu un tron? Prin laudele noastre. Lauda este tronul pe care sade Dumnezeu ca Imparat. De aceea cerul este un loc de lauda neintrerupta.",
      "Vrei ca Dumnezeu sa locuiasca in inima ta? Pregateste-I un tron. Vrei sa locuiasca in casa ta? Pregateste-I un tron si acolo.",
      "Este vorba de duhul laudei, nu neaparat de cuvinte. Nu putem lauda cu vorbe douazeci si patru de ore. Dar putem scoate cu totul din viata noastra cartirea, plangerea si nemultumirea, pentru ca ele darama tronul pe care ar trebui sa sada Dumnezeu.",
      "Cand cartesti, cand te manii si te enervezi, pregatesti de fapt un tron pentru Satana. Sunt doua tronuri pe care le poti face in viata si in casa ta: unul al laudei si unul al nemultumirii.",
    ],
    wrongA: "Voi lauda dupa ce Dumnezeu imi rezolva problema.",
    right: "Lauda vine din credinta si merge inaintea izbavirii, nu dupa ea.",
    wrongB: "Lauda inseamna sa spui cuvinte frumoase la adunare.",
    explanation:
      "Sub Vechiul Legamant se lauda prin vedere. Noi umblam prin credinta si putem lauda in mijlocul necazului, crezand ca Dumnezeu este pe tron.",
    step: "Alege un lucru de care te-ai plans azi si multumeste-I lui Dumnezeu pentru el, cu inima.",
    prayer: "Doamne, iarta-mi cartirea. Iti pregatesc un tron de lauda in inima si in casa mea.",
    journal: "Ce plangere repeti de saptamani intregi?",
    memory: "Atunci au crezut in cuvintele Lui si au cantat laudele Lui.",
  }),
  make({
    id: "lauda_l2",
    order: 2,
    title: "Rastignirea si lauda",
    refs: ["Psalmul 22:22", "Psalmul 118:24", "Romani 6:6", "Galateni 2:20"],
    ref: "Psalmul 118:24",
    hook: "Rastignirea lui Isus a fost cel mai mare rau savarsit vreodata pe pamant - si cel mai bun lucru care s-a intamplat vreodata pe pamant.",
    word: "Aceasta este ziua pe care a facut-o Domnul; sa ne bucuram si sa ne veselim in ea.",
    truth: [
      "Lauda nu este o tehnica. Daca o incerci ca tehnica, iti spun de pe acum ca va da gres. Tehnica este ceva pe care il folosim egoist, ca pe o descantare. Nu vorbesc despre cuvinte, ci despre lauda care vine dintr-o inima care crede in puterea, in dragostea si in intelepciunea lui Dumnezeu.",
      "Psalmul 22 este un psalm al crucii. Incepe cu: Dumnezeul Meu, Dumnezeul Meu, pentru ce M-ai parasit? La versetul 3 vorbeste despre Dumnezeu asezat pe laudele poporului Sau, iar la versetul 16 despre mainile si picioarele strapunse.",
      "Si tocmai din pozitia aceea rastignita, Isus ii cheama pe fratii Lui mai mici - pe tine si pe mine - sa I Se alature in a-I pregati Tatalui un tron de lauda.",
      "Daca cel mai mare rau facut vreodata a fost intors de Dumnezeu in cel mai mare bine, spune-mi: ce ti-ar putea face tie oamenii, ca Dumnezeu sa nu poata intoarce spre bine? Totul este mai mic decat aceea.",
      "Ce faceau talharii cand atarnau pe cruce? Nu laudau pe Dumnezeu; blestemau. Isus, dimpotriva, Si-a intins palmele si Si-a asezat picioarele ca sa poata fi batute cuiele mai usor. Era fericit. A suferit? Da, a simtit durerea la fel ca noi. Dar era fericit ca facea voia Tatalui Sau.",
      "Mai stii pe cineva care a fost rastignit pe aceeasi cruce cu Isus? Nu talharii, de o parte si de alta. Scriptura spune: omul nostru cel vechi a fost rastignit impreuna cu El; si: am fost rastignit impreuna cu Hristos.",
      "Lauda este un duh. Nu o poti aprinde duminica dimineata pentru doua ore si stinge cand ajungi acasa. Daca zici aleluia in adunare si dupa-amiaza tipi la sotia ta, nu ai duhul laudei; ai o forma.",
      "Sunt oameni care spun ca Il iubesc pe Isus in acelasi duh in care L-a sarutat Iuda in Ghetsimani.",
      "Este usor sa spui: aceasta este ziua pe care a facut-o Domnul, cand primesti o marire de salariu sau o casa mai buna. Sa o spui in ziua in care esti rastignit cere credinta. Care este ziua pe care nu a facut-o Domnul? Diavolul nu face nicio zi.",
    ],
    wrongA: "Lauda este o metoda care functioneaza daca o repeti.",
    right: "Lauda adevarata izvoraste dintr-o viata rastignita impreuna cu Hristos.",
    wrongB: "Poti lauda duminica si trai altfel in restul saptamanii.",
    explanation:
      "In amandoua psalmii crucii, lauda apare in mijlocul rastignirii. Numai murind fata de viata mea egoista pot intra in duhul laudei.",
    step: "Spune-I lui Dumnezeu, in ziua ta cea mai grea: aceasta este ziua pe care ai facut-o Tu.",
    prayer: "Doamne, am fost rastignit impreuna cu Tine. Nu vreau o lauda de suprafata, ci una din inima.",
    journal: "In ce zi ti-a fost imposibil sa multumesti? Ce ai fi putut spune atunci?",
    memory: "Aceasta este ziua pe care a facut-o Domnul; sa ne bucuram si sa ne veselim in ea.",
  }),
  make({
    id: "lauda_l3",
    order: 3,
    title: "Lauda il scoate afara pe Satana",
    refs: ["Isaia 61:1-3", "Psalmul 8:2", "Matei 21:15-16", "1 Ioan 2:6"],
    ref: "Isaia 61:3",
    hook: "Duhul de apasare nu este de la Dumnezeu. Este o haina pe care incearca sa ti-o puna diavolul. Scutur-o de pe tine.",
    word: "Sa le dau o cununa in loc de cenusa, un untdelemn de bucurie in locul plansului, o haina de lauda in locul unui duh mahnit.",
    truth: [
      "Isus a venit sa dea drumul celor robiti si sa dea haina de lauda in locul duhului de apasare. Nu doar scoate afara duhul acela si te lasa gol - te si imbraca cu lauda, ca sa nu se intoarca.",
      "Nu este voia lui Dumnezeu ca noi sa fim deznadajduiti sau prost dispusi. Poate veni ca o ispita; noi trebuie sa o scuturam. Spune: in Numele lui Isus, ma impotrivesc tie, Satano; sangele lui Isus m-a curatat, nu ma mai poti invinui.",
      "Este scris: cine zice ca ramane in El trebuie sa traiasca asa cum a trait Isus. A fost Isus vreodata deznadajduit sau prost dispus? Niciodata. Dar in fiecare zi Isi lua crucea.",
      "Cand copiii strigau in Templu: Osana Fiului lui David, preotii cei mai de seama nu au putut suferi zgomotul. Ei credeau ca singurul fel de a te inchina este in tacere si cu solemnitate, ca la o inmormantare. Sunt si azi oameni care gandesc la fel.",
      "Cred din toata inima ca exista si o lauda in tacere. Dar exista si lauda cu strigate de bucurie: strigati de bucurie catre Domnul. Ai vazut cum se ridica un stadion cand echipa a castigat? Atunci de ce nu sunt crestinii tulburati de bucurie ca Isus le-a iertat pacatele si l-a biruit pe diavol?",
      "Isus a raspuns criticilor cu Psalmul 8: din gura pruncilor si a copiilor de tata Ti-ai scos o intaritura, ca sa amutesti pe vrajmas. Prin lauda se astupa gura diavolului.",
      "Diavolul uraste lauda. De aceea ii face pe oameni posomorati si cartitori: asa poate domni in vietile si in casele lor. Nu poate sta in cer, unde toti ingerii striga lauda; si nu poate sta intr-o casa in care se lauda Dumnezeu.",
      "Satana izbuteste in doua feluri: ori opreste cu totul lauda, ori, unde nu poate, ii face pe oameni nesinceri, ca sa spuna din gura ce nu este in inima.",
      "Israelitii au strigat tare la vitelul de aur si l-au numit Domnul; Moise si Iosua au auzit de departe. Dar nu era lauda adevarata: era curvie in mijlocul ei.",
    ],
    wrongA: "Inchinarea adevarata este numai in tacere si cu solemnitate.",
    right: "Si lauda in tacere, si strigatul de bucurie sunt primite; ce conteaza este sinceritatea inimii.",
    wrongB: "Deznadejdea este o incercare pe care Dumnezeu ne-o trimite.",
    explanation:
      "Lauda sincera, dintr-o viata sfanta, are putere sa astupe gura vrajmasului. Lauda goala nu are nicio putere.",
    step: "Cand vine apasarea azi, spune cu glas tare o lauda si nu-i da loc.",
    prayer: "Doamne, ia de pe mine haina de intristare si imbraca-ma cu haina de lauda.",
    journal: "Unde a intrat posomorala in casa ta si a alungat bucuria?",
    memory: "O haina de lauda in locul unui duh mahnit.",
  }),
  make({
    id: "lauda_l4",
    order: 4,
    title: "Cantarea cea noua",
    refs: ["Apocalipsa 14:3", "1 Tesaloniceni 5:18", "Efeseni 5:20", "1 Timotei 2:1"],
    ref: "1 Tesaloniceni 5:18",
    hook: "Daca te-ai hotarat sa te muti in Franta pentru tot restul vietii, ce ai face inainte de plecare? Ai invata franceza. Limba cerului este lauda. Este bine sa o invatam de aici.",
    word: "Multumiti lui Dumnezeu pentru toate lucrurile; caci aceasta este voia lui Dumnezeu, in Hristos Isus, cu privire la voi.",
    truth: [
      "In Apocalipsa sunt sapte priviri spre cer. In fiecare dintre ele, oamenii si ingerii Il lauda pe Dumnezeu, si de multe ori se spune limpede: cu glas tare.",
      "Nu este niciun inger asezat acolo posomorat sau ingrijorat de ce se va intampla maine cu lumea. Toti Il lauda pe Dumnezeu, pentru ca stiu ca El este pe tron. Ingeri posomorati vei gasi doar in iad.",
      "Cu cat esti mai posomorat, cu atat aduci duhul iadului in viata ta. Cu cat esti mai vesel, recunoscand ca Dumnezeu este pe tron, cu atat aduci duhul cerului in viata ta, in casa ta si in adunarea ta.",
      "Poti spune: cand ajung in cer, o sa incep sa laud. Atunci de ce a venit Duhul Sfant? A venit ca sa ne pregateasca pentru cer si ca sa ne invete limba cerului inainte sa ajungem acolo.",
      "Despre cei o suta patruzeci si patru de mii se spune ca au cantat o cantare noua pe care nimeni altcineva nu o putea invata - si au invatat-o cat erau pe pamant.",
      "Care este cantarea cea veche? Cea pe care o canta toata lumea: cartirea si plangerea impotriva oamenilor si a imprejurarilor. Strofa intai, strofa a doua, strofa a treia - toate la fel: cineva a facut ceva, ceva a mers rau, cutare m-a inselat, vremurile sunt grele.",
      "In Noul Testament ni se spune sa multumim intotdeauna. Pentru cate lucruri sa multumesti? Pentru toate. Cum poti multumi pentru ceva ce nu pare deloc bun? Pentru ca crezi ca Dumnezeu face ca toate lucrurile sa lucreze impreuna spre binele tau.",
      "Este ca un filtru de apa: orice apa murdara ai turna in el, la capat iese apa curata. Asa lucreaza fagaduinta ca toate lucrurile lucreaza spre bine.",
      "Trei locuri ne arata cat de larg este: in toate imprejurarile, in orice vreme, pentru toate lucrurile si pentru toti oamenii.",
      "Si tocmai de aceea cantarea cea noua se invata numai pe pamant: in cer nu mai sunt imprejurari grele, nici oameni greu de suportat, nici incercari.",
    ],
    wrongA: "Voi invata sa laud cand voi ajunge in cer.",
    right: "Cantarea cea noua se poate invata numai aici, in imprejurari grele si cu oameni grei.",
    wrongB: "Multumim pentru lucrurile bune si tacem la cele rele.",
    explanation:
      "Duhul Sfant a venit sa aduca in inimile, in casele si in adunarile noastre atmosfera cerului, care este atmosfera laudei.",
    step: "Numeste azi trei lucruri grele si multumeste-I lui Dumnezeu pentru fiecare.",
    prayer: "Doamne, invata-ma limba cerului acum, cat mai sunt aici, unde este greu.",
    journal: "Care este strofa ta preferata din cantarea cea veche?",
    memory: "Multumiti lui Dumnezeu pentru toate lucrurile.",
  }),
  make({
    id: "lauda_l5",
    order: 5,
    title: "Lauda aduce izbavire",
    refs: ["Psalmul 50:23", "2 Cronici 20:6-12", "2 Cronici 20:22", "Iacov 1:5"],
    ref: "Psalmul 50:23",
    hook: "Dumnezeu va face izbavirea, dar nu o poate face pana nu Ii deschizi calea. Iar calea se deschide prin lauda.",
    word: "Cine aduce multumiri ca jertfa, acela Ma proslaveste, si celui ce vegheaza asupra caii lui, aceluia ii voi arata mantuirea lui Dumnezeu.",
    truth: [
      "Dumnezeu ingaduie ca Satana sa-Si necajeasca copiii. De ce? Focul este primejdios, dar focul curata aurul. Asa foloseste Dumnezeu incercarile ca sa ne curete - dar trebuie sa raspundem cum se cuvine.",
      "Felul potrivit de a raspunde, daca ai credinta, este duhul laudei: Doamne, sufar, dar nu-mi pierd credinta. Tu esti pe tron, diavolul a fost invins la cruce, pacatele mele sunt iertate, si Tu faci ca toate sa lucreze spre binele meu.",
      "Sunt multe situatii din care am fi fost izbaviti daca L-am fi laudat pe Dumnezeu in loc sa ne plangem de oameni si de diavol. Lauda este semnul credintei.",
      "Numai rugaciunea nu ne scoate din orice situatie. Este bine sa te rogi la strâmtoare, dar pe langa rugaciune trebuie sa invatam sa laudam. Ne rugam pana ajungem in locul in care nu mai trebuie sa ne rugam: avem marturia in inima ca Dumnezeu ne-a auzit. Atunci ne oprim din cerut si incepem sa multumim.",
      "Cand Iosafat a fost inconjurat de o multime de vrajmasi, a chemat tot Iuda la post si la rugaciune. In rugaciunea lui a marturisit trei lucruri: neputinta, lipsa de intelepciune si credinta. Este usor sa spunem primele doua, dar daca ne oprim acolo nu se intampla nimic.",
      "Rugaciunea lui este un tipar: intai a laudat suveranitatea lui Dumnezeu; apoi si-a adus aminte ce a facut Dumnezeu in trecut; apoi I-a amintit fagaduinta din Cuvant; apoi ca noi suntem mostenirea Lui, cumparata; apoi ca nu are putere; apoi ca nu are intelepciune; si la urma: dar ochii nostri sunt indreptati spre Tine.",
      "Cand esti la strâmtoare, uita-te inapoi peste viata ta si adu-ti aminte de cate ori ai crezut ca nu mai este iesire si Dumnezeu a facut o cale. Asta aprinde credinta.",
      "Este bine sa stii pe de rost fagaduintele Scripturii, ca sa le poti spune in rugaciune. Sunt ca lemnele puse pe foc: fara ele, focul credintei arde slab.",
      "Au iesit laudandu-L pe Domnul, fara arcuri si sageti, cu un cor inaintea ostirii. Si cand au inceput sa cante si sa laude, Domnul a deschis usa izbavirii, iar vrajmasii au fost zdrobiti. Ba mai mult, Israel s-a imbogatit cu prada lor.",
    ],
    wrongA: "Este de ajuns sa marturisesc ca sunt slab si neputincios.",
    right: "Neputinta plus incredere: ochii nostri sunt indreptati spre Tine.",
    wrongB: "Rugaciunea singura este de ajuns; lauda vine la sfarsit.",
    explanation:
      "A spune doar ca esti bun de nimic nu este smerenie, ci necredinta. Iosafat a marturisit neputinta si apoi a crezut, si atunci a lucrat Dumnezeu.",
    step: "Ia o problema nerezolvata si roaga-te dupa tiparul lui Iosafat, terminand cu multumire.",
    prayer: "Doamne, nu am nici putere, nici intelepciune, dar ochii mei sunt indreptati spre Tine. Iti multumesc dinainte.",
    journal: "Aminteste-ti trei izbaviri din trecut. Ce iti spun ele despre ziua de azi?",
    memory: "Cine aduce multumiri ca jertfa, acela Ma proslaveste.",
  }),
  make({
    id: "lauda_l6",
    order: 6,
    title: "Lauda deschide usi inchise",
    refs: ["2 Corinteni 12:9", "2 Cronici 20:15-17", "Iona 2:9-10", "Faptele Apostolilor 16:25-26"],
    ref: "2 Corinteni 12:9",
    hook: "Cand esti biruit de pacat, spui ca este pentru ca esti slab. Nu, prietene. Este pentru ca esti tare.",
    word: "Puterea Mea in slabiciune este facuta desavarsita.",
    truth: [
      "Dumnezeu ingaduie sa ajungem in situatii in care ne vedem cu totul neputinciosi. Cand a vorbit despre rugaciune, Isus a infatisat Biserica precum o vaduva saraca si neputincioasa, necajita de un potrivnic. Asa suntem.",
      "Numai oamenii slabi pot lauda pe Dumnezeu. Cei tari se lauda pe ei insisi. Omul tare are pareri tari, spune vorbe intepatoare si judeca repede pe altii.",
      "Du-te intr-un spital si uita-te la un om cu tuburi in gura si in nas, care abia poate vorbi. Acela este un om slab. Nu-l vezi criticand pe nimeni. Abia cand se face bine incepe sa dea vina pe doctori, pe rude si pe vrajmasi.",
      "Cand te certi si te iei la disputa cu oamenii, esti slab sau tare? Esti tare - iar oamenii tari sunt tinte usoare pentru Satana. Asa a castigat lupta cu Eva.",
      "De aceea a asteptat Isus cand a auzit ca Lazar este bolnav. Cat era bolnav, Lazar mai era inca putin tare. Cand a slabit de tot si a murit, atunci l-a inviat Dumnezeu.",
      "Sunt trei feluri de credinciosi. Cei care au multa incredere in ei insisi - nu pot face nicio lucrare vesnica pentru Dumnezeu. Cei care nu au incredere nici in ei, nici in Dumnezeu - si acestia sunt nefolositori. Si cei care nu au nicio incredere in ei insisi, dar au toata increderea in Dumnezeu - numai acestia Ii sunt de folos.",
      "Cand au spus: nu avem putere, nu stim ce sa facem, dar ochii nostri sunt indreptati spre Tine, atunci a vorbit Dumnezeu prin prooroc: lupta nu este a voastra, ci a lui Dumnezeu; nu voi veti lupta, ci stati pe loc si veti vedea izbavirea Domnului.",
      "Iona a stat trei zile si trei nopti in pantecele pestelui zbatandu-se. Abia dupa aceea a inceput sa se roage. Asa facem si noi: intai incercam noi, saptamani intregi, si abia cand nu mai merge nimic, ne rugam.",
      "S-a rugat, s-a rugat, si tot nu s-a intamplat nimic. Apoi a spus: cu glas de multumire Iti voi aduce jertfe. Si abia atunci a poruncit Domnul pestelui sa-l verse pe uscat.",
      "Pavel si Sila, inchisi la temnita, in loc sa doarma sau sa carteasca, laudau pe Domnul. Si pe cand cantau, s-au deschis usile temnitei.",
      "Cheia gurii oricarui peste este in mana lui Dumnezeu, si cheia oricarei usi de temnita. Nu este usa pe care Domnul sa nu o poata deschide.",
    ],
    wrongA: "Sunt biruit pentru ca sunt prea slab.",
    right: "Esti biruit pentru ca esti inca tare in tine insuti; puterea lui Dumnezeu se desavarseste in slabiciune.",
    wrongB: "Sa spun ca sunt bun de nimic este smerenie.",
    explanation:
      "Iona a fost scos cand a inceput sa multumeasca. Usile temnitei s-au deschis cand Pavel si Sila cantau. Lauda deschide usa izbavirii.",
    step: "Recunoaste-ti neputinta intr-un lucru anume si spune-I lui Dumnezeu ca astepti izbavirea de la El.",
    prayer: "Doamne, ma las slab in mainile Tale. Iti multumesc chiar acum, inainte sa vad usa deschisa.",
    journal: "Unde te-ai tinut tare si de aceea ai fost biruit?",
    memory: "Puterea Mea in slabiciune este facuta desavarsita.",
  }),
]
