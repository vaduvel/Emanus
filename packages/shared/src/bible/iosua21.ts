import { iosuaChapter, teaching } from "./iosuaHelpers.js"
import { iosuaPassage } from "./iosuaText.js"
import { IOSUA_STATUSES } from "./iosuaPublication.js"

export const IOSUA_21 = iosuaChapter({
  number: 21,
  title: "Iosua 21 — Cetățile leviților și împlinirea deplină a promisiunilor",
  summary:
    "Leviții cer și primesc cele patruzeci și opt de cetăți promise prin Moise, răspândite în teritoriul tuturor celorlalte seminții. Capitolul se încheie cu o declarație solemnă: DOMNUL a dat lui Israel toată țara promisă strămoșilor lor, și niciun cuvânt din făgăduințele Sale n-a rămas neîmplinit.",
  literaryContext:
    "Acest capitol încheie în mod solemn întreaga secțiune de împărțire a pământului (cap. 13-21), cu o afirmație teologică de o importanță covarșită: credincioșia lui Dumnezeu față de promisiunile Sale este totală și fără excepție.",
  historicalContext:
    "Leviții, neavând teritoriu propriu, sunt răspândiți în patruzeci și opt de cetăți în mijlocul celorlalte seminții — un aranjament care le permite să slujească spiritual întregul Israel, nu doar o regiune limitată.",
  units: [
    {
      id: "iosua-21-1-8",
      ref: "Iosua 21:1-8",
      heading: "Cererea leviților și împărțirea cetăților lor",
      text: iosuaPassage(21, 1, 8),
      teaching: teaching(
        "Căpeteniile familiilor leviților vin la Eleazar, Iosua și căpeteniile celorlalte seminții și reamintesc: „DOMNUL a poruncit prin Moise să ni se dea cetăți de locuit, cu locurile lor goale pentru vitele noastre”, invocând din nou o promisiune veche (Numeri 35).",
        "Fiii lui Israel dau leviților, din moștenirea lor, patruzeci și opt de cetăți cu locurile lor goale, „după porunca DOMNULUI”, împărțite între cele trei familii levitice — chehatiți, gherșoniți și merariți — fiecare primind cetăți din teritorii diferite.",
        "Sorțul este folosit și aici pentru a stabili exact care cetăți merg la fiecare familie levitică, menținând același principiu de corectitudine văzut în toată secțiunea de împărțire a pământului.",
      ),
      crossRefs: ["Numeri 35:1-8", "1 Cronici 6:54-81"],
      forYourHeart:
        "Cei chemați la slujire spirituală specială nu sunt uitați de Dumnezeu în privința nevoilor lor materiale, chiar dacă nu primesc moștenire în felul obișnuit.",
    },
    {
      id: "iosua-21-9-42",
      ref: "Iosua 21:9-42",
      heading: "Lista detaliată a cetăților levitice, inclusiv cele de refugiu",
      text: iosuaPassage(21, 9, 42),
      teaching: teaching(
        "Lista enumeră cetățile date fiecărei familii levitice, din teritoriul lui Iuda, Simeon, Beniamin, Efraim, Dan, jumătatea de Manase, Isahar, Așer, Neftali, Zabulon, Gad și Ruben — practic din teritoriul fiecărei seminții, fără excepție.",
        "Printre aceste cetăți se regăsesc și cele șase cetăți de refugiu deja stabilite în capitolul 20 — Chedes, Sihem, Hebron, Bețer, Ramot și Golan — confirmând legătura strânsă dintre slujirea levitică și sistemul de dreptate al lui Israel.",
        "Repartizarea leviților în toate colțurile țării însemna, practic, că fiecare seminție avea acces la învățătorii Legii și la slujitorii altarului în apropierea locuințelor lor, nu doar la un centru îndepărtat.",
      ),
      crossRefs: ["Deuteronom 33:10", "Maleahi 2:7"],
      forYourHeart:
        "Dumnezeu împrăștie intenționat pe cei care învață și slujesc în mijlocul poporului Său, ca nimeni să nu fie prea departe de hrană spirituală.",
    },
    {
      id: "iosua-21-43-45",
      ref: "Iosua 21:43-45",
      heading: "Împlinirea deplină a tuturor făgăduințelor",
      text: iosuaPassage(21, 43, 45),
      teaching: teaching(
        "Textul rezumă solemn întreaga carte până în acest punct: „DOMNUL a dat lui Israel toată țara pe care jurase că o va da părinților lor; ei au luat-o în stăpânire și s-au așezat în ea.” Promisiunea făcută lui Avraam, Isaac și Iacov, veche de sute de ani, este acum împlinită concret.",
        "DOMNUL le-a dat odihnă „din toate părțile, întocmai cum jurase părinților lor; niciunul din vrăjmașii lor n-a putut să le stea împotrivă” — confirmarea faptului că DOMNUL a luptat cu adevărat pentru Israel, așa cum promisese încă din Iosua 1.",
        "Versetul final este poate cel mai important din întreaga carte: „Niciuna din toate făgăduințele pe care le făcuse DOMNUL casei lui Israel nu a rămas neîmplinită; toate s-au împlinit.” Această afirmație devine temeiul încrederii întregii Scripturi în credincioșia absolută a lui Dumnezeu.",
      ),
      crossRefs: ["Geneza 15:18-21", "Iosua 23:14", "2 Corinteni 1:20"],
      forYourHeart:
        "Fiecare făgăduință a lui Dumnezeu, oricât de veche sau de îndepărtată ar părea, se împlinește întocmai; nu există nicio excepție în istoria credincioșiei Lui.",
    },
  ],
  prayer:
    "Doamne, mulțumim că nicio făgăduință a Ta nu rămâne neîmplinită, oricât de mult ar dura împlinirea ei.\n\nMulțumim că ai grijă și de cei chemați la slujire specială, răspândindu-i ca binecuvântare în mijlocul poporului Tău.\n\nDă-ne odihna pe care numai Tu o poți da, după fiecare sezon de luptă și așteptare.\n\nȘi învață-ne să ne încredem în fiecare cuvânt pe care Tu l-ai rostit asupra vieții noastre. Amin.",
  status: IOSUA_STATUSES[21],
})
