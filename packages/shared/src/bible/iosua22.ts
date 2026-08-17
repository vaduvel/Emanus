import { iosuaChapter, teaching } from "./iosuaHelpers.js"
import { iosuaPassage } from "./iosuaText.js"
import { IOSUA_STATUSES } from "./iosuaPublication.js"

export const IOSUA_22 = iosuaChapter({
  number: 22,
  title: "Iosua 22 — Altarul „Martor”",
  summary:
    "Iosua trimite acasă, cu binecuvântare, pe rubeniți, gadiți și jumătatea seminției lui Manase, care se întorc la răsărit de Iordan și zidesc acolo un altar mare. Restul lui Israel, crezând că este o răzvrătire, se pregătește de război, dar explicația celor două seminții și jumătate aduce împăcare.",
  literaryContext:
    "Acest capitol încheie firul narativ deschis încă din Numeri 32 și reluat în Iosua 1: promisiunea făcută de cele două seminții și jumătate de a lupta alături de frații lor până la cucerirea deplină a țării. Tema unității poporului, în ciuda despărțirii geografice, este centrală.",
  historicalContext:
    "Iordanul forma un hotar natural care putea, cu timpul, să ducă la înstrăinarea celor două seminții și jumătate de restul lui Israel. Grija lor de a construi un altar-martor arată conștientizarea acestui pericol real.",
  units: [
    {
      id: "iosua-22-1-9",
      ref: "Iosua 22:1-9",
      heading: "Iosua binecuvântează și trimite acasă semințiile de la răsărit",
      text: iosuaPassage(22, 1, 9),
      teaching: teaching(
        "Iosua le recunoaște credincioșia: „ați păzit tot ce v-a poruncit Moise... n-ați părăsit pe frații voștri în timpul acesta atât de lung”. Promisiunea făcută cu peste șapte ani înainte, înaintea trecerii Iordanului, a fost ținută întocmai, până la sfârșit.",
        "Iosua îi îndeamnă la ascultare continuă: „Dați-vă toată silința... să iubiți pe DOMNUL, Dumnezeul vostru, să umblați întotdeauna pe căile Lui, să păziți poruncile Lui, să vă alipiți de El și să-I slujiți din toată inima voastră și din tot sufletul vostru” — o binecuvântare care rezumă esența întregii legături de legământ.",
        "Ei se întorc acasă „cu bogății mari” — vite, argint, aur, aramă, fier și haine în mare cantitate, cu porunca de a împărți prada de război cu frații lor rămași acasă, un semn de solidaritate care întărește legătura frumoasă dintre seminții.",
      ),
      crossRefs: ["Numeri 32:20-22", "Deuteronom 6:5"],
      forYourHeart:
        "O promisiune ținută cu credincioșie timp de ani îndelungați este răsplătită cu binecuvântare deplină și cu recunoașterea publică a celor din jur.",
    },
    {
      id: "iosua-22-10-20",
      ref: "Iosua 22:10-20",
      heading: "Altarul de la Iordan și suspiciunea de răzvrătire",
      text: iosuaPassage(22, 10, 20),
      teaching: teaching(
        "Cele două seminții și jumătate zidesc un altar mare „lângă Iordan, de partea țării Canaan”. Când restul lui Israel aude, se adună la Silo, gata de război împotriva fraților lor — o reacție extrem de rapidă și de severă, bazată doar pe zvon, fără clarificare prealabilă.",
        "Finees, fiul preotului Eleazar, este trimis împreună cu zece căpetenii pentru a cere socoteală: „Ce călcare de legământ este aceasta pe care ați făcut-o față de Dumnezeul lui Israel, întorcându-vă astăzi de la DOMNUL?”, amintind exemplul grav al lui Peor și al lui Acan, unde păcatul unora a adus judecată peste întreaga adunare.",
        "Grija lor era îndreptățită teologic: un altar separat de cel legitim de la cortul întâlnirii ar fi putut fi interpretat ca o ruptură de închinarea unică poruncită de Lege — dar răspunsul avea nevoie să fie ascultat înainte de a se acționa cu sabia.",
      ),
      crossRefs: ["Numeri 25:1-9", "Deuteronom 12:5-14"],
      forYourHeart:
        "Zelul pentru puritatea închinării este bun, dar trebuie însoțit de întrebare și ascultare, nu de judecată pripită bazată doar pe aparențe.",
    },
    {
      id: "iosua-22-21-34",
      ref: "Iosua 22:21-34",
      heading: "Explicația și împăcarea: altarul „Martor”",
      text: iosuaPassage(22, 21, 34),
      teaching: teaching(
        "Rubeniții, gadiții și jumătatea de Manase explică imediat intenția lor: altarul nu este pentru arderi de tot sau jertfe, ci un „Martor”, ca generațiile viitoare de la răsărit de Iordan să nu fie excluse de frații lor de la apus din partea lor la DOMNUL.",
        "Temerea lor era exact opusă acuzației primite: „peste timp, fiii voștri ar putea zice fiilor noștri: ce legătură este între voi și DOMNUL, Dumnezeul lui Israel?... așa că fiii voștri ar face pe fiii noștri să înceteze de a se teme de DOMNUL”. Altarul era un act de prevedere pentru unitate, nu un act de separare.",
        "Finees și căpeteniile acceptă explicația cu bucurie: „astăzi cunoaștem că DOMNUL este în mijlocul nostru, fiindcă nu ați săvârșit păcatul acesta împotriva DOMNULUI”, iar războiul plănuit este evitat. Altarul este numit „Martor că DOMNUL este Dumnezeu”, încheind capitolul cu unitate restaurată în loc de conflict fratricid.",
      ),
      crossRefs: ["Iosua 22:16", "Efeseni 4:3"],
      forYourHeart:
        "Comunicarea sinceră și disponibilitatea de a asculta explicația celuilalt pot preveni un conflict pe care suspiciunea singură l-ar fi transformat într-un război inutil.",
    },
  ],
  prayer:
    "Doamne, mulțumim pentru credincioșia celor care țin promisiunile făcute, chiar după ani îndelungați.\n\nDă-ne înțelepciune să ascultăm înainte de a judeca, mai ales pe cei din propria noastră familie de credință.\n\nPăzește-ne unitatea, ca să nu lăsăm granițele geografice sau timpul să ne înstrăineze de frații noștri.\n\nȘi învață-ne să fim întotdeauna martori vii ai legăturii noastre cu Tine, pentru generațiile care vin. Amin.",
  status: IOSUA_STATUSES[22],
})
