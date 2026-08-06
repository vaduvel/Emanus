import { iosuaChapter, teaching } from "./iosuaHelpers.js"
import { iosuaPassage } from "./iosuaText.js"
import { IOSUA_STATUSES } from "./iosuaPublication.js"

export const IOSUA_6 = iosuaChapter({
  number: 6,
  title: "Iosua 6 — Căderea Ierihonului",
  summary:
    "DOMNUL îi dă lui Iosua planul de bătălie: șase zile de înconjurare tăcută a Ierihonului, iar a șaptea zi șapte înconjurări, urmate de un strigăt și de prăbușirea zidurilor. Cetatea este nimicită cu totul, cu excepția lui Rahab și a casei ei, iar Iosua rostește un blestem asupra celui care ar reconstrui-o.",
  literaryContext:
    "Bătălia Ierihonului este radical diferită de orice strategie militară obișnuită: victoria vine printr-un ritual liturgic — chivotul, preoții, trâmbițele — nu prin asalt armat. Cartea subliniază astfel de la prima bătălie că țara este dată de DOMNUL, nu cucerită prin puterea sabiei lui Israel.",
  historicalContext:
    "Ierihonul, aflat lângă Iordan, era o cetate fortificată foarte veche, controlând drumul de acces spre regiunea muntoasă a Canaanului. Căderea ei deschidea calea pentru restul campaniei militare a lui Israel.",
  units: [
    {
      id: "iosua-6-1-5",
      ref: "Iosua 6:1-5",
      heading: "Planul de bătălie dat de DOMNUL",
      text: iosuaPassage(6, 1, 5),
      teaching: teaching(
        "Ierihonul este descris ca fiind „închis și întărit bine, din pricina fiilor lui Israel; nimeni nu ieșea din el și nimeni nu intra în el”. Cetatea se baricadase complet, dar zidurile ei nu vor rezista în fața planului DOMNULUI.",
        "DOMNUL îi vorbește lui Iosua — probabil continuarea întâlnirii cu Căpetenia oștirii din capitolul anterior — și îi spune deja rezultatul înainte de luptă: „Iată, dau în mâinile tale Ierihonul”. Verbul este la timpul trecut în structura promisiunii: victoria este deja hotărâtă înainte de prima înconjurare.",
        "Planul este neobișnuit: șapte preoți cu șapte trâmbițe de corn de berbec merg înaintea chivotului, înconjurând cetatea o dată pe zi timp de șase zile, iar a șaptea zi de șapte ori, urmat de un strigăt puternic al întregului popor.",
      ),
      crossRefs: ["Evrei 11:30"],
      forYourHeart:
        "Când Dumnezeu spune „am dat” înainte ca tu să vezi biruința, credința ta constă în a asculta planul Lui, oricât de neobișnuit ar părea.",
    },
    {
      id: "iosua-6-6-14",
      ref: "Iosua 6:6-14",
      heading: "Cele șase zile de înconjurare tăcută",
      text: iosuaPassage(6, 6, 14),
      teaching: teaching(
        "Iosua transmite poporului exact planul primit, fără să adauge sau să scadă ceva: preoții cu trâmbițele merg înaintea chivotului, oastea înarmată înainte, iar coada oastei în urma chivotului, sunând mereu din trâmbițe.",
        "Poporului i se cere tăcere: „să nu scoateți niciun strigăt, să nu vi se audă glasul și să nu vă iasă nicio vorbă din gură, până în ziua când vă voi spune să strigați”. Disciplina tăcerii, timp de șase zile de mers repetitiv în jurul unei cetăți fortificate, cere o răbdare pe care doar credința o poate susține.",
        "Repetarea zilnică, identică, fără niciun rezultat vizibil timp de șase zile, testează exact tipul de necredință care i-a ținut pe părinții lor patruzeci de ani în pustie: dorința de rezultate imediate. De data aceasta, generația nouă ascultă fără să cârtească.",
      ),
      crossRefs: ["Iosua 3:3-4"],
      forYourHeart:
        "Ascultarea repetitivă, fără rezultat vizibil, este adesea forma cea mai grea a credinței — și tocmai ea pregătește biruința promisă.",
    },
    {
      id: "iosua-6-15-21",
      ref: "Iosua 6:15-21",
      heading: "A șaptea zi: strigătul și prăbușirea zidurilor",
      text: iosuaPassage(6, 15, 21),
      teaching: teaching(
        "În a șaptea zi, poporul înconjoară cetatea de șapte ori, iar la a șaptea înconjurare, Iosua le poruncește: „strigați, căci DOMNUL v-a dat cetatea!”. Strigătul vine doar la porunca lui Iosua, nu din nerăbdarea poporului — disciplina se menține până în ultima clipă.",
        "Iosua rostește dinainte hotărârea de nimicire totală (herem): tot ce este în cetate va fi „dat spre nimicire pentru DOMNUL”, cu excepția lui Rahab și a celor din casa ei, „pentru că a ascuns pe solii pe care i-am trimis”. Legământul făcut printr-un jurământ în capitolul 2 este respectat cu strictețe.",
        "Argintul, aurul, obiectele de bronz și de fier sunt puse deoparte pentru vistieria DOMNULUI, nu pentru folosul personal al soldaților — un detaliu esențial care va explica gravitatea păcatului lui Acan din capitolul următor.",
      ),
      crossRefs: ["Iosua 2:12-14", "Iosua 7:1"],
      forYourHeart:
        "Zidurile care par de netrecut cad la porunca lui Dumnezeu, dar biruința nu îndreptățește niciodată încălcarea cuvântului dat.",
    },
    {
      id: "iosua-6-22-27",
      ref: "Iosua 6:22-27",
      heading: "Rahab salvată și blestemul asupra reconstrucției Ierihonului",
      text: iosuaPassage(6, 22, 27),
      teaching: teaching(
        "Iosua le poruncește celor doi iscoade să împlinească jurământul făcut lui Rahab: „intrați în casa acelei femei curve și scoateți-o afară, pe ea și pe toți ai ei, cum i-ați jurat”. Cuvântul dat unei străine este ținut cu aceeași seriozitate ca orice legământ din Israel.",
        "Textul precizează că familia lui Rahab a fost așezată „afară din tabăra lui Israel” la început — o perioadă de tranziție, poate legată de curățirea rituală necesară pentru cineva venit dintr-o cetate păgână dată nimicirii —, dar ea rămâne în mijlocul lui Israel „până în ziua de azi”, semn al integrării ei depline în popor.",
        "Iosua rostește un blestem solemn asupra oricui ar reconstrui Ierihonul: va pune temeliile cu prețul întâiului său născut și porțile cu prețul celui mai tânăr fiu al său. Acest blestem se va împlini literal veacuri mai târziu, în zilele lui Ahab (1 Împărați 16:34).",
      ),
      crossRefs: ["Matei 1:5", "1 Împărați 16:34"],
      forYourHeart:
        "Un jurământ făcut în numele DOMNULUI trebuie ținut, chiar și față de cineva din afara poporului legământului.",
    },
  ],
  prayer:
    "Doamne, Tu dai biruința chiar înainte ca noi să o vedem cu ochii; ajută-ne să credem cuvântul Tău mai mult decât ceea ce vedem.\n\nDă-ne răbdarea de a asculta tăcut, fără să cârtim, atunci când planul Tău pare lent sau ciudat.\n\nÎnvață-ne să ținem cuvântul dat, chiar și celor din afara poporului Tău, așa cum a fost ținut jurământul față de Rahab.\n\nȘi ferește-ne de a lua pentru noi ceea ce Tu ai pus deoparte pentru Tine. Amin.",
  status: IOSUA_STATUSES[6],
})
