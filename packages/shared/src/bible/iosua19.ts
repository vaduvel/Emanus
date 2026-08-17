import { iosuaChapter, teaching } from "./iosuaHelpers.js"
import { iosuaPassage } from "./iosuaText.js"
import { IOSUA_STATUSES } from "./iosuaPublication.js"

export const IOSUA_19 = iosuaChapter({
  number: 19,
  title: "Iosua 19 — Restul semințiilor și moștenirea lui Iosua",
  summary:
    "Se împarte moștenirea pentru Simeon (în mijlocul lui Iuda), Zabulon, Isahar, Așer, Neftali și Dan, iar la final Iosua însuși primește cetatea pe care a cerut-o, Timnat-Serah, încheind astfel împărțirea țării între seminții.",
  literaryContext:
    "Acest capitol încheie secțiunea propriu-zisă de împărțire a moștenirilor (începute în cap. 13), iar faptul că Iosua primește moștenirea sa personală abia la final, după toate celelalte seminții, este un semn deliberat de smerenie și slujire a conducătorului.",
  historicalContext:
    "Dan, neîncapătând loc în teritoriul său inițial din pricina presiunii amoriților și filistenilor, va migra mai târziu spre nord, cucerind Laiș, eveniment relatat detaliat în Judecători 18.",
  units: [
    {
      id: "iosua-19-1-16",
      ref: "Iosua 19:1-16",
      heading: "Moștenirea lui Simeon în mijlocul lui Iuda și a lui Zabulon",
      text: iosuaPassage(19, 1, 16),
      teaching: teaching(
        "Simeon primește moștenirea sa „în mijlocul moștenirii fiilor lui Iuda, căci partea fiilor lui Iuda era prea mare pentru ei; de aceea fiii lui Simeon și-au avut moștenirea în mijlocul moștenirii lor”. Este o împărțire flexibilă, adaptată la nevoile reale, nu rigidă.",
        "Această împletire cu Iuda va însemna, cu timpul, absorbția treptată a lui Simeon în teritoriul lui Iuda — o împlinire indirectă a profeției lui Iacov din Geneza 49:7, care spusese că Simeon și Levi vor fi împrăștiați în Israel.",
        "Zabulon primește un teritoriu în nordul țării, cu hotare care includ mai multe cetăți și sate, încheind cu formula caracteristică acestui capitol: „iată moștenirea fiilor lui Zabulon, după familiile lor, cetățile acestea și satele lor”.",
      ),
      crossRefs: ["Geneza 49:5-7", "1 Cronici 4:24-27"],
      forYourHeart:
        "Chiar și o profeție aparent negativă rostită de un părinte spiritual se poate împlini într-un mod pe care Dumnezeu îl folosește pentru bine în timp.",
    },
    {
      id: "iosua-19-17-51",
      ref: "Iosua 19:17-51",
      heading: "Isahar, Așer, Neftali, Dan și moștenirea lui Iosua",
      text: iosuaPassage(19, 17, 51),
      teaching: teaching(
        "Isahar, Așer și Neftali primesc teritorii în nordul țării, fiecare cu liste detaliate de cetăți și hotare, continuând tiparul de grijă minuțioasă pentru fiecare seminție, indiferent de mărimea sau importanța ei istorică.",
        "Dan primește un teritoriu la vest, dar textul notează: „teritoriul fiilor lui Dan s-a întins și mai departe decât acesta; căci fiii lui Dan s-au suit și s-au luptat cu Leșem, l-au luat... l-au numit Dan” — un semn timpuriu al presiunii pe care Dan o va simți din partea vecinilor filisteni.",
        "Capitolul se încheie frumos: „După ce au isprovit de împărțit țara... fiii lui Israel au dat lui Iosua, fiul lui Nun, o moștenire în mijlocul lor. După porunca DOMNULUI, i-au dat cetatea pe care o cerea el, Timnat-Serah, în muntele lui Efraim.” Conducătorul care a împărțit țara tuturor primește partea sa cea din urmă, nu cea dintâi.",
      ),
      crossRefs: ["Judecători 18:1", "Iosua 24:30"],
      forYourHeart:
        "Un conducător după inima lui Dumnezeu se servește pe sine cel din urmă, după ce a avut grijă de partea tuturor celor încredințați lui.",
    },
  ],
  prayer:
    "Doamne, mulțumim că împărțirea Ta este dreaptă și adaptată nevoilor fiecăruia, nu rigidă și nedreaptă.\n\nÎnvață-ne smerenia lui Iosua, care s-a servit pe sine cel din urmă, după ce a avut grijă de toți ceilalți.\n\nDă-ne încredere că și împotrivirile sau presiunile pe care le întâmpinăm pot fi transformate în bine de mâna Ta.\n\nȘi mulțumim că nicio seminție, oricât de mică, nu a fost uitată din moștenirea promisă. Amin.",
  status: IOSUA_STATUSES[19],
})
