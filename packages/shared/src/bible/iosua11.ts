import { iosuaChapter, teaching } from "./iosuaHelpers.js"
import { iosuaPassage } from "./iosuaText.js"
import { IOSUA_STATUSES } from "./iosuaPublication.js"

export const IOSUA_11 = iosuaChapter({
  number: 11,
  title: "Iosua 11 — Campania din nord",
  summary:
    "Iabin, împăratul Huțorului, adună o coaliție mare de împărați din nordul Canaanului, cu cai și care de război în număr mare, la apele Merom. Israel îi învinge prin surprindere, iar Iosua nimicește întregul nord, încheind astfel cucerirea generală a țării.",
  literaryContext:
    "După campania din sud (cap. 10), aceasta este ultima mare confruntare militară a cărții, încheind structura în două valuri — sud și nord — care acoperă practic întreaga țară a Canaanului înainte de împărțirea ei între seminții.",
  historicalContext:
    "Huțorul era cea mai importantă cetate din nordul Canaanului, un centru regional de putere; coaliția condusă de Iabin reprezenta cea mai mare amenințare militară întâlnită până atunci, datorită carelor de război, o tehnologie militară superioară.",
  units: [
    {
      id: "iosua-11-1-15",
      ref: "Iosua 11:1-15",
      heading: "Coaliția de la apele Merom și porunca nimicirii",
      text: iosuaPassage(11, 1, 15),
      teaching: teaching(
        "Iabin, împăratul Huțorului, adună o coaliție vastă, „un popor foarte mare... cu cai și care în număr foarte mare”, comparat cu nisipul de pe malul mării. Amenințarea militară pare, omenește vorbind, copleșitoare pentru Israel, care nu avea care de război.",
        "DOMNUL îi spune lui Iosua: „Nu te teme de ei, căci mâine, pe vremea aceasta, î-i voi da bătuți înaintea lui Israel. Să tai vinele picioarelor cailor lor și să le arzi carele de război în foc”. Porunca de a distruge carele și caii previne ca Israel să se încreadă în tehnologia militară preluată, nu în DOMNUL.",
        "Israel căde asupra taberei lor „pe neașteptate”, la apele Merom, și îi nimicește, urmărindu-i până departe. Iosua ascultă întocmai porunca privind caii și carele, la fel cum făcuse cu tot restul poruncilor DOMNULUI — textul repetă de mai multe ori: „n-a lăsat nimic nefăcut din tot ce poruncise DOMNUL lui Moise”.",
      ),
      crossRefs: ["Deuteronom 17:16", "Psalmul 20:7"],
      forYourHeart:
        "Superioritatea vizibilă a vrăjmașului nu este un motiv de teamă când DOMNUL a promis biruința; încrederea trebuie așezată în El, nu în resursele preluate de la vrăjmaș.",
    },
    {
      id: "iosua-11-16-23",
      ref: "Iosua 11:16-23",
      heading: "Rezumatul cuceririi țării și odihna țării de război",
      text: iosuaPassage(11, 16, 23),
      teaching: teaching(
        "Textul face un rezumat cuprinzător: „Iosua a luat toată țara aceasta, muntele, tot ținutul de miazăzi, toată țara Gosen, valea... de la muntele Halac... până la Baal-Gad”. Aria descrisă acoperă aproape întreaga țară făgăduită, un rezultat remarcabil după doar câțiva ani de campanie.",
        "Se notează explicit că majoritatea împăraților canaaniți au luptat împotriva lui Israel din pricină că „DOMNUL le împietrise inima” ca să iasla luptă și să fie nimiciți fără milă, exact cum poruncise Moise — un ecou al împietririi inimii lui Faraon în Exod.",
        "Capitolul se încheie cu formula: „țara s-a odihnit de război”, după ce Iosua o împarte ca moștenire lui Israel, după semințiile lor. Este primul moment de pace deplină din carte, tranziția către partea a doua a cărții, dedicată împărțirii pământului.",
      ),
      crossRefs: ["Exod 9:12", "Deuteronom 2:30"],
      forYourHeart:
        "Dumnezeu împlinește promisiunile Lui în timpul Său, dar după fiecare sezon de luptă pregătește și un timp de odihnă pentru poporul Său.",
    },
  ],
  prayer:
    "Doamne, învață-ne să nu ne încredem în resursele și tehnologia lumii, ci în puterea Ta care biruiește orice coaliție.\n\nMulțumim că împlinit întotdeauna ce ai promis, chiar dacă amenințarea părea copleșitoare.\n\nDă-ne ascultarea deplină a lui Iosua, care n-a lăsat nimic nefăcut din porunca Ta.\n\nȘi mulțumim pentru vremurile de odihnă pe care le așezi după fiecare sezon de luptă. Amin.",
  status: IOSUA_STATUSES[11],
})
