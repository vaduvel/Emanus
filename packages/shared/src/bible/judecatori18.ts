import { judecatoriChapter, teaching } from "./judecatoriHelpers.js"
import { judecatoriStatus } from "./judecatoriPublication.js"

/* Judecători 18 — text Biblia Emanus; explicație originală Emanus după cercetarea textului și a transcrierii Through The Bible. */
export const JUDECATORI_18 = judecatoriChapter({
  number: 18,
  title: "Judecători 18 — Dan, preotul cumpărat și idolatria mutată de la o casă la o seminție",
  summary:
    "Seminția lui Dan caută un teritoriu și trimite cinci iscoade. Acestea îl întâlnesc pe levitul lui Mica și îi cer o binecuvântare. Mai târziu, șase sute de oameni fură idolii și îl conving pe preot să-i urmeze pentru o poziție mai mare. Dan cucerește Laișul, o cetate lipsită de apărare, și instituționalizează cultul furat.",
  literaryContext:
    "Capitolul extinde dezordinea din casa lui Mica la nivel tribal. Ceea ce fusese un sanctuar privat devine centrul religios al unei seminții. Narațiunea leagă ambiția teritorială, violența și oportunismul spiritual sub diagnosticul lipsei unei autorități ascultate.",
  historicalContext:
    "Dan nu reușise să ocupe deplin teritoriul primit și caută o nouă așezare în nord. Laișul era izolat, prosper și fără alianțe apropiate. În lumea veche, mutarea unui preot și a obiectelor de cult putea fi privită ca transfer al protecției divine asupra unei noi comunități.",
  units: [
    {
      verses: [1, 10],
      heading: "Iscoadele cer binecuvântare pentru un plan pe care l-au hotărât deja",
      teaching: teaching(
        "Seminția lui Dan caută o moștenire, dar problema nu este numai lipsa teritoriului. În loc să confrunte neascultarea care îi împiedicase să stăpânească partea primită, oamenii caută o țintă mai ușoară.",
        "Iscoadele recunosc glasul levitului și îi cer să întrebe pe Dumnezeu dacă drumul lor va izbuti. Preotul le oferă o asigurare favorabilă din interiorul unui sanctuar idolatru. Limbajul spiritual poate confirma foarte ușor planul pe care clientul vrea deja să-l audă.",
        "Laișul este descris ca liniștit și fără apărare apropiată. Oportunitatea militară este confundată cu dreptatea morală. Faptul că poți lua ceva nu înseamnă că Dumnezeu ți l-a dat.",
      ),
      words: [
        {
          original: "נַחֲלָה",
          transliteration: "nahala",
          language: "ebraica",
          meaning:
            "moștenire sau parte primită. În Scriptură, moștenirea nu este o scuză pentru a numi orice cucerire oportună drept dar al lui Dumnezeu.",
        },
      ],
      crossRefs: ["Iosua 19:40-48", "Judecători 1:34", "Iacov 4:2-3"],
      forYourHeart:
        "Cauți călăuzire reală sau doar o binecuvântare religioasă pentru o decizie deja luată? Lasă adevărul să poată spune și «nu» planului tău.",
    },
    {
      verses: [11, 20],
      heading: "Idolii sunt furați, iar preotul alege o platformă mai mare",
      teaching: teaching(
        "Cei șase sute de oameni iau chipul, efodul și idolii lui Mica. Preotul îi întreabă ce fac, dar oferta lor îi atinge ambiția: este mai bine să fii preotul unei seminții decât al unei singure case.",
        "Inima lui se bucură și pleacă împreună cu obiectele furate. El nu apără adevărul, nici măcar loialitatea față de omul care îl întreținuse; alege locul cu mai multă influență.",
        "O slujire măsurată prin mărimea audienței poate vinde repede adevărul, relația și conștiința. Creșterea platformei nu este dovadă că Dumnezeu a aprobat mutarea.",
      ),
      crossRefs: ["Judecători 17:7-13", "Ioan 10:12-13", "1 Petru 5:2-3"],
      forYourHeart:
        "Nu evalua chemarea numai prin numărul oamenilor, bani sau vizibilitate. Întreabă ce adevăr, promisiune și persoane ar trebui trădate pentru a ajunge acolo.",
    },
    {
      verses: [21, 31],
      heading: "Mica își pierde dumnezeii, Laișul este ars, iar idolatria devine instituție",
      teaching: teaching(
        "Mica strigă că i-au luat dumnezeii și preotul, astfel încât nu i-a mai rămas nimic. Propoziția expune neputința idolului: un dumnezeu care poate fi furat și are nevoie de pază nu poate salva pe cel care îl posedă.",
        "Dan atacă o cetate liniștită și izolată, o arde și o reconstruiește sub propriul nume. Textul descrie violența unei epoci degradate; nu o oferă drept justificare pentru cuceriri, epurări sau războaie religioase moderne.",
        "Chipul lui Mica este instalat pentru generații. Păcatul privat primește clădire, preot, tradiție și continuitate. Longevitatea unei instituții nu dovedește adevărul originii ei.",
      ),
      crossRefs: ["Psalmul 115:4-8", "Osea 8:4-6", "Fapte 17:24-25"],
      forYourHeart:
        "Ce lucru ți-ar lăsa impresia că «nu-ți mai rămâne nimic» dacă l-ai pierde? Un dumnezeu pe care trebuie să-l posezi, protejezi și controlezi nu este Dumnezeul viu.",
    },
  ],
  prayer:
    "Doamne, nu ne lăsa să cerem binecuvântare pentru planuri nedrepte sau să confundăm oportunitatea cu voia Ta.\n\nPăzește slujitorii de ambiția platformei și comunitățile de cumpărarea unei confirmări religioase.\n\nDescoperă idolii care pot fi furați, mutați și transformați în instituții.\n\nDă-ne închinare curată și o moștenire primită prin ascultare, nu luată prin exploatarea celui vulnerabil. Amin.",
  status: judecatoriStatus(18),
})
