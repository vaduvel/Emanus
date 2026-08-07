import { exodChapter, teaching } from "./exodHelpers.js"

/*
 * Cartea Exod, explicată pe unități de sens.
 *
 * Textul biblic: păstrat separat în exodText.ts (fișierele exodTextN.ts).
 * Explicația: scrisă pentru Emanus după cercetarea textului. Nu se copiază
 * formularea niciunui predicator sau comentator.
 */

export const EXOD_22 = exodChapter({
  number: 22,
  title: "Exod 22 — Paguba întoarsă, și cei care nu au cine să-i apere",
  summary:
    "Rânduielile merg mai departe, și intră în curtea omului. Cel care fură nu primește doar pedeapsă: întoarce înmulțit, iar dacă nu are cu ce, se vinde el însuși ca să plătească. Cine aprinde un foc care trece în holda vecinului plătește paguba. Urmează lucrurile date în păstrare și vita luată cu împrumut, cu deosebirea între paguba din nepăsare și cea fără vina nimanui. Apoi câteva cuvinte scurte și grele despre desfrâu, vrăjitorie și jertfe aduse altor dumnezei. Iar la mijlocul capitolului se schimbă glasul: să nu asupriți pe străin, pe văduvă și pe orfan, să nu luațţi camătă de la cel sărac și să-i întoarceți haina până la apusul soarelui, fiindcă Dumnezeu aude strigarea lor. Capitolul se încheie cu întâii născuți și cu chemarea la sfințenie.",
  literaryContext:
    "Capitolul acesta ține mai departe cartea legământului și începe cu pricini de avere, dar ia aminte cum se schimbă glasul de la versetul douăzeci și unu încolo. Până acolo se vorbește în chipul judecății, „dacă se întâmplă așa, să plătească atât”; de acolo încolo se vorbește cu pricină și cu mustrare: „fiindcă și voi ați fost străini”, „fiindcă Eu aud strigarea”. Vezi și cum sunt puse alături lucruri care nuți se par de un fel: boul, focul, vrăjitoria și haina văduvei. Legea nu împarte viața în sfânt și neînsemnat: totul stă înaintea aceluiși Dumnezeu. Iar cuvântul despre strigarea săracului este același cu cel de la începutul cărții, când Dumnezeu a auzit strigătul robilor din Egipt — și asta îl încarcă cu tot ce s-a întâmplat până aici.",
  historicalContext:
    "În legiuirile popoarelor din jur, hoțul prins plătea uneori cu viața sau era schilodit; aici plătește înmulțit și rămâne viu. Viața omului nu se dă pentru un bou. Cât despre împrumutul cu camătă: nu este oprită orice împrumutare cu plată în lăuntrul unei economii — mai târziu Legea îngăduie camăta față de străin — ci luarea de camătă de la fratele sărac, adică câștigul scos din nevoia cuiva. Haina de care se vorbește era mantaua largă în care omul sărac dormea noaptea; luată ca zălog și ținută peste noapte, îl lăsa în frig. Sfașierea de care se vorbește la urmă — carnea unui animal ucis de fiare — nu era pentru masa poporului lui Dumnezeu, fiindcă sângele nu se scursese. Iar vrăjitoria și jertfele aduse altor dumnezei erau, în Canaan și în Egipt, meșteșuguri de toate zilele, cu plată și cu clienți.",
  units: [
    {
      verses: [1, 6],
      heading: "Hoțul nu doar plătește: întoarce înmulțit",
      teaching: teaching(
        "Ia aminte cum se judecă furtul în legea aceasta: hoțul întoarce cinci boi pentru un bou și patru oi pentru o oaie. Nu este numai pedepsit: îndreaptă ce a stricat, și mai mult. Dreptatea lui Dumnezeu nu se încheie cu vinovatul umilit; se încheie cu cel păgubit întregit.",
        "Și dacă nu are cu ce să plătească, se vinde el însuși. Nu i se taie mâna, nu i se ia viața: Îl pune în rânduială munca lui. Iar robia aceasta avea, cum am văzut în capitolul de dinainte, un capăt hotărât. Legea urmărește îndreptarea omului, nu pierderea lui.",
        "Se cade privit și locul greu de la mijloc: cine lovește noaptea un hoț intrat în casă și acela moare, nu este vinovat; dacă se întâmplă ziua, este. Deosebirea nu este în faptă, ci în ce poți ști în clipa aceea: noaptea nu vezi cine a intrat și cu ce gând; ziua vezi. Dumnezeu nu cere să fim mai desăvârșiți decât se poate în întuneric, dar nici nu îngăduie să ucizi pentru un lucru când puteai să nu ucizi.",
        "Iar la urmă vine focul: cine aprinde în og-rada lui și focul trece în holda vecinului, plătește tot. Nu a voit să ardă nimic al altuia; a aprins numai la el. Iată învățătura, și este pentru noi: focurile pe care le aprindem în og-rada noastră nu rămân în og-rada noastră. Un cuvânt aruncat în casă, o mânie ținută aprinsă, o vorbă pusă pe drum — nu socoti că nu au să treacă hotarul.",
      ),
      words: [
        {
          original: "שלם ישלם",
          transliteration: "șalem ieșalem",
          language: "ebraica",
          meaning:
            "să plătească pe deplin, să întregească. Din aceeași rădăcină cu pacea: paguba plătită întoarce pacea.",
        },
        {
          original: "אין לו דמים",
          transliteration: "ein lo damim",
          language: "ebraica",
          meaning:
            "nu se cere sânge pentru el. Noaptea nu știi cine a intrat și cu ce gând; ziua știi.",
        },
        {
          original: "מבעיר הבערה",
          transliteration: "mavir habeera",
          language: "ebraica",
          meaning:
            "cel care a aprins focul. Focul aprins în og-rada ta nu rămâne în og-rada ta.",
        },
      ],
      crossRefs: ["Luca 19:8", "Proverbe 6:30-31", "Levitic 6:4-5", "Iacov 3:5-6", "Numeri 5:6-7"],
      forYourHeart:
        "Focurile aprinse în curtea ta nu rămân în curtea ta. Ce ai stricat și nu ai întors încă celui păgubit?",
    },
    {
      verses: [7, 15],
      heading: "Lucrul dat în păstrare, și vita luată cu împrumut",
      teaching: teaching(
        "Aici Legea se coboară într-o lucrare pe care o facem și noi în fiecare săptămână: ai lăsat ceva în mâna altuia, și s-a pierdut. Ia aminte că nu se caută numai lucrul: se caută dacă cel în grija căruia a fost și-a pus mâna pe el. Iar când nu se poate dovedi nici una, nici alta, pricina se aduce înaintea lui Dumnezeu.",
        "Vezi ce înseamnă aceasta. Sunt pricini care nu se pot limpezi cu martori. Legea nu spune „deci să fie lăsate”, și nici „să hotărască cel mai tare”: le duce înaintea lui Dumnezeu, și cere un jurământ. Un om care a jurat înaintea Domnului și a mințit nu a scăpat, măcar că a fost crezut de oameni. Cine se încrede în felul acesta de judecată crede că Dumnezeu vede.",
        "Și se face o deosebire înțeleaptă la vita luată cu împrumut: dacă se strică sau moare în lipsa stăpânului, cel care a luat-o plătește; dacă stăpânul era acolo, nu plătește; și dacă era luată cu plată, paguba se socotește în plată. Nu se cere de la nimeni mai mult decât răspunderea lui adevărată. Dreptatea nu înseamnă să plătească cineva, oricine, ci să plătească acela care răspundea.",
        "Și încă un lucru, mic în aparență: dacă fiara a sfășiat vita, să aducă ce a mai rămas ca dovadă, și nu plătește. Dumnezeu nu încarcă pe om cu ce nu a putut opri. Sunt pagube în viață pentru care nu ești vinovat, și este bine să le știi deosebi de cele pentru care ești.",
      ),
      words: [
        {
          original: "לשמר",
          transliteration: "lișmor",
          language: "ebraica",
          meaning:
            "spre păstrare, spre păzire. Ce ți s-a dat în grijă nu este al tău, dar răspunzi de el.",
        },
        {
          original: "עד האלהים",
          transliteration: "ad haelohim",
          language: "ebraica",
          meaning:
            "înaintea lui Dumnezeu, adică înaintea judecătorilor puși de El. Pricinile fără martori nu rămân fără judecător.",
        },
        {
          original: "שבעת יהוה",
          transliteration: "șevuat YHWH",
          language: "ebraica",
          meaning:
            "jurământ înaintea Domnului. Cine a mințit în el nu a scăpat, măcar că a fost crezut de oameni.",
        },
      ],
      crossRefs: ["Levitic 6:2-5", "Proverbe 15:3", "Evrei 4:13", "Matei 5:33-37", "Romani 13:7"],
      forYourHeart:
        "Sunt pagube pentru care nu ești vinovat — și altele pentru care ești. Știi tu să le deosebești cinstit?",
    },
    {
      verses: [16, 20],
      heading: "Cinci versete fără îmblânzire",
      teaching: teaching(
        "Cele două versete despre fecioara înșelată nu vorbesc despre o împăcare ieftină, ci despre răspundere. Cine a luat cinstea unei fete este ținut să o ia de femeie și să plătească prețul cuvenit casei ei; și dacă tatăl nu vrea să i-o dea, plătește oricum. În lumea aceea, o fată lăsată astfel rămânea fără viitor și fără pâine. Legea nu îngăduie ca plăcerea unuia să fie plătită cu viața altuia.",
        "Apoi vin trei cuvinte scurte și grele: vrăjitoarea să nu trăiască; cine se împreunează cu un animal să fie omorât; cine aduce jertfă altor dumnezei să fie nimicit. Nu le îmblânzim și nu le ascundem. Dar se cade să spunem limpede ce sunt: legi ale unei împărății în care Dumnezeu Însuși era împărat, date unui popor așezat pe un pământ anume. Biserica nu are cu privire la nimeni asemenea putere — armele noastre nu sunt trupești — și nimeni nu are dreptul să ia versetele acestea ca temei ca să ridice mâna asupra unui om.",
        "Și totuși, cine trece pe lângă ele fără să se cutremure nu a înțeles nimic. Ce se spune aici este că vrăjitoria și închinarea la alți dumnezei nu sunt obiceiuri fără urmări, ci lucruri care omoară un popor. Dumnezeu le privește ca pe otrava turnată în fântână. Vremea noastră le numește „energii”, „descantări”, „deschideri” — și le socotește nevinovate. Înaintea lui Dumnezeu nu sunt.",
        "Ia aminte că aici stă alături curvia, vrăjitoria și jertfa adusă altor dumnezei. Cele trei merg de obicei împreună în viața unui om și a unui popor, și toate trei încep cu același lucru: căutăm dincolo de Dumnezeu ceea ce numai El poate da.",
      ),
      words: [
        {
          original: "מכשפה",
          transliteration: "mehașefa",
          language: "ebraica",
          meaning:
            "vrăjitoare, cea care lucrează cu descantări. Nu un obicei fără urmări: otravă turnată în fântână.",
        },
        {
          original: "מהר ימהרנה",
          transliteration: "mahor imharena",
          language: "ebraica",
          meaning:
            "să plătească prețul cuvenit pentru ea. Plăcerea unuia nu se plătește cu viitorul altuia.",
        },
        {
          original: "יחרם",
          transliteration: "iohoram",
          language: "ebraica",
          meaning:
            "să fie dat cu totul nimicirii. Cuvânt al judecății dumnezeiești într-o împărăție în care Domnul era împărat.",
        },
      ],
      crossRefs: ["Deuteronom 18:10-12", "Deuteronom 22:28-29", "Levitic 20:6", "2 Corinteni 10:3-4", "Galateni 5:19-21"],
      forYourHeart:
        "Curvia, vrăjitoria și idolatria încep toate cu același lucru: cauți dincolo de Dumnezeu ce numai El poate da.",
    },
    {
      verses: [21, 27],
      heading: "Străinul, văduva, orfanul — și o strigare pe care Dumnezeu o aude",
      teaching: teaching(
        "Aici se schimbă glasul în tot capitolul. Nu se mai spune numai ce să se plătească: se spune și pentru ce. Să nu chinuiți pe străin, fiindcă și voi ați fost străini în țara Egiptului. Ia aminte că temeiul milei este amintirea: cine uită ce a fost devine asupritor.",
        "Și vin cuvintele cele mai înspăimântătoare din capitol: dacă va striga la Mine, Eu Îi voi auzi strigarea. Este același cuvânt cu cel de la începutul cărții, când Dumnezeu a auzit strigătul robilor din Egipt. Deci Dumnezeu nu are o singură dată această auzire. Cine face pe altul să strige așa a luat locul lui Faraon în povestea aceasta, chiar dacă este dintre cei izbăviți.",
        "Iar camăta: să nu iei camătă de la fratele sărac. Nu se oprește aici toată lucrarea cu bani, ci câștigul scos din nevoia cuiva. Este deosebire mare între a lucra cu banii tăi și a te îmb ogăți din strâmtorarea unui om care nu mai are unde să se ducă. Vremea noastră este plină de împrumuturi făcute pe socoteala disperării; Dumnezeu le numeţte pe nume.",
        "Și la urmă haina: dacă iei ca zălog mantaua aproapelui tău, i-o întorci până la apusul soarelui, fiindcă este singura lui învelitoare — în ce să se culce? Ia seama ce spune Dumnezeu la sfârșit: „sunt milostiv”. Nu spune „eu țin rânduiala”, ci „Eu sunt milostiv”. Legea Lui iese din firea Lui. Iar cine cere zălog și nu se gândește unde va dormi omul în noaptea aceea nu seamănă cu Dumnezeul căruia se închină.",
      ),
      words: [
        {
          original: "וגר לא תלחצנו",
          transliteration: "veger lo tilhațenu",
          language: "ebraica",
          meaning:
            "și pe străin să nu-l strâmtorezi. Temeiul milei este amintirea: cine uită ce a fost devine asupritor.",
        },
        {
          original: "שמע אשמע צעקתו",
          transliteration: "șamoa eșma țaakato",
          language: "ebraica",
          meaning:
            "Îi voi auzi strigarea. Același cuvânt cu strigătul robilor din Egipt, la începutul cărții.",
        },
        {
          original: "כי חנון אני",
          transliteration: "ki hanun ani",
          language: "ebraica",
          meaning:
            "căci Eu sunt milostiv. Legea Lui nu iese dintr-o rânduială rece, ci din firea Lui.",
        },
      ],
      crossRefs: ["Exod 2:23-25", "Deuteronom 24:12-15", "Iacov 5:4", "Levitic 25:35-37", "Iacov 1:27"],
      forYourHeart:
        "Cine face pe altul să strige la Dumnezeu a luat locul lui Faraon în povestea aceasta — chiar dacă este dintre cei izbăviți.",
    },
    {
      verses: [28, 31],
      heading: "Întâii născuți, și un popor pus deoparte",
      teaching: teaching(
        "Să nu blăstemi pe Dumnezeu și să nu vorbești de rău pe cârmuitorul poporului tău. Ia aminte că versetul acesta vine îndată după cuvintele despre asuprire. Deci nu este o oprire a dreptei mustrări — Scriptura este plină de prooroci care au mustrat împărați în față — ci a blăstămatului și a vorbei de rău care rupe rânduiala unui popor. Se poate spune adevărul unui cârmuitor fără să-l blestemi.",
        "Apoi se cere întâiul rod și întâiul născut. Nu ultima parte, nu ce a rămas: ce vine întâi. Ce dăm întâi arată cine este întâi în viața noastră. Iar pentru întâii născuți ai oamenilor, Dumnezeu a rânduit răscumpărare — nu i-a cerut niciodată pe ei. Aceasta este deosebirea cea mare între El și dumnezeii popoarelor din jur, care cereau copii în foc.",
        "Și încă un lucru, spus scurt: șapte zile să rămână vță sau mielul cu mama lui, și în a opta să fie adus. Nu se ia ce este de o zi. Dumnezeu nu Se grăbește și nu îngăduie grăbire nici în ce se aduce Lui.",
        "Iar capitolul se încheie cu temeiul întregii părți: să Îmi fiți oameni sfinți. Ia aminte că sfințenia nu este dată aici ca simțire, ci ca purtare — și chiar la masa lor: să nu mănânce carne sfașiată de fiare. Un popor pus deoparte se cunoaște în ce mănâncă, în ce plătește și în cum se poartă cu străinul. Sfințenia lui Dumnezeu nu stă numai în cort: intră în og-radă, în pungă și în oală.",
      ),
      words: [
        {
          original: "לא תקלל",
          transliteration: "lo tekalel",
          language: "ebraica",
          meaning:
            "să nu blăstemi, să nu faci de nimic. Nu este oprită mustrarea dreaptă, ci blăstămatul.",
        },
        {
          original: "בכור בניך תתן לי",
          transliteration: "behor baneha titen li",
          language: "ebraica",
          meaning:
            "întâiul născut al fiilor tăi să fie al Meu. Dumnezeu a rânduit îndată răscumpărare: nu a cerut niciodată copii în foc.",
        },
        {
          original: "אנשי קדש תהיון לי",
          transliteration: "anșei kodeș tihiun li",
          language: "ebraica",
          meaning:
            "să Îmi fiți oameni sfinți. Sfințenia nu stă numai în cort: intră în og-radă, în pungă și în oală.",
        },
      ],
      crossRefs: ["Fapte 23:5", "Exod 13:13", "Deuteronom 12:31", "Levitic 11:44-45", "1 Petru 1:15-16"],
      forYourHeart:
        "Ce dai întâi arată cine este întâi în viața ta. Iar sfințenia se vede în pungă și în purtarea cu străinul, nu doar în rugăciune.",
    },
  ],
  prayer:
    "Doamne, Tu nu Te îndestulezi cu vinovatul pedepsit: vrei pe cel păgubit întregit. Învață-ne să întoarcem ce am stricat.\n\nNu ne lăsa să uităm că și noi am fost străini și robi, și că Tu ne-ai auzit.\n\nPăzește-ne să nu ne îmb ogățim din nevoia nimanui și să nu lăsăm pe nimeni fără învelitoare peste noapte.\n\nTu ești milostiv; fă-ne să semănăm cu Tine. Amin.",
})
