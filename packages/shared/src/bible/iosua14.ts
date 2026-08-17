import { iosuaChapter, teaching } from "./iosuaHelpers.js"
import { iosuaPassage } from "./iosuaText.js"
import { IOSUA_STATUSES } from "./iosuaPublication.js"

export const IOSUA_14 = iosuaChapter({
  number: 14,
  title: "Iosua 14 — Moștenirea lui Caleb",
  summary:
    "Se stabilește principiul împărțirii pământului la apus de Iordan, prin sorți, între cele nouă seminții și jumătate. Caleb, la optzeci și cinci de ani, cere și primește muntele Hebron, împlinind promisiunea făcută de Moise pentru credincioșia lui de acum patruzeci și cinci de ani.",
  literaryContext:
    "Povestea lui Caleb este plasată deliberat la începutul secțiunii de împărțire a pământului, ca exemplu viu al credincioșiei răsplătite — el este singurul, alături de Iosua, din generația ieșită din Egipt care mai trăiește și moștenește pământul promis.",
  historicalContext:
    "Caleb fusese una dintre cele douăsprezece iscoade trimise de Moise în Canaan (Numeri 13-14) și, împreună cu Iosua, adusese un raport de credință, spre deosebire de celelalte zece iscoade. Patruzeci și cinci de ani mai târziu, el își revendică promisiunea făcută atunci.",
  units: [
    {
      id: "iosua-14-1-5",
      ref: "Iosua 14:1-5",
      heading: "Principiul împărțirii pământului prin sorți",
      text: iosuaPassage(14, 1, 5),
      teaching: teaching(
        "Împărțirea pământului se face prin trei autorități împreună: preotul Eleazar, Iosua și căpeteniile familiilor semințiilor. Nicio persoană nu decide singură soarta moștenirii — procesul este comunitar și supravegheat spiritual.",
        "Metoda folosită este sorțul, exact cum poruncise DOMNUL prin Moise — o metodă care înlătură favoritismul uman și lasă rezultatul în mâna lui Dumnezeu, chiar și într-un proces administrativ, nu doar în bătălii.",
        "Se reamintește din nou că leviții nu primesc parte de pământ, ci doar cetăți de locuit și pășuni pentru vitele lor — principiul repetat consecvent în toată secțiunea de împărțire.",
      ),
      crossRefs: ["Numeri 26:55-56", "Numeri 35:2-3"],
      forYourHeart:
        "Deciziile importante pentru comunitate se iau bine când sunt împărțite între autorități spirituale și sunt lăsate, în cele din urmă, în mâna lui Dumnezeu.",
    },
    {
      id: "iosua-14-6-15",
      ref: "Iosua 14:6-15",
      heading: "Caleb cere și primește Hebronul",
      text: iosuaPassage(14, 6, 15),
      teaching: teaching(
        "Caleb vine la Iosua și îi reamintește cuvânt cu cuvânt promisiunea lui Moise de la Cadeș-Barnea: „Pământul pe care l-au călcat picioarele tale va fi moștenirea ta și a copiilor tăi pe vecie, pentru că ai urmat în totul calea DOMNULUI, Dumnezeul meu”.",
        "La optzeci și cinci de ani, Caleb declară cu vigoare: „astăzi sunt tot atât de tare ca în ziua când m-a trimis Moise; azi am tot atâta putere câtă aveam atunci, fie ca să lupt, fie ca să merg încoace și încolo”. Nu cere odihnă la bătrânețe, ci cere muntele cu anachimi, uriașii care înspaimintaseră celelalte iscoade patruzeci și cinci de ani înainte.",
        "Iosua îl binecuvântează și îi dă Hebronul de moștenire, „pentru că urmase în totul calea DOMNULUI, Dumnezeul lui Israel”. Textul încheie notând că „țara s-a odihnit de război”, încă o dată, după acest episod de credință personală.",
      ),
      crossRefs: ["Numeri 13:30", "Numeri 14:24"],
      forYourHeart:
        "Urmarea deplină a lui Dumnezeu, chiar împotriva fricii majorității, este răsplătită, uneori după zeci de ani de așteptare — dar răsplata vine sigur.",
    },
  ],
  prayer:
    "Doamne, dă-ne credința lui Caleb, care a urmat în totul calea Ta, chiar împotriva fricii celor din jur.\n\nPăstrează-ne vigoarea și râvna, chiar la bătrânețe, ca să continuăm să cerem munții pe care Tu ni-i pregătești.\n\nÎnvață-ne să așteptăm cu răbdare împlinirea promisiunilor Tale, chiar dacă durează zeci de ani.\n\nȘi mulțumim că răsplătești pe cei care Te urmează în totul. Amin.",
  status: IOSUA_STATUSES[14],
})
