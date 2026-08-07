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

export const NUMERI_7 = numeriChapter({
  number: 7,
  title: "Numeri 7 — Doisprezece zile, doisprezece daruri identice",
  summary:
    "Cel mai lung capitol din Numeri povestește un singur eveniment: doisprezece zile la rând, câte o căpetenie de seminție își aduce darul de sfințire a altarului, exact același dar, fără nicio deosebire de la o zi la alta. Începe cu căruțele și boii dați leviților pentru purtarea Cortului și se încheie cu Moise auzind Glasul DOMNULUI de pe capacul ispășirii, dintre heruvimi.",
  literaryContext:
    "Repetarea aproape identică a acelorași șase versete, de douăsprezece ori la rând, nu este o greșeală de copiere, ci însăși mesajul capitolului: fiecare seminție, mare sau mică, întâi născută sau mai tânără, aduce exact același dar, în aceeași măsură, fără favoritism și fără întrecere. Capitolul încheie secțiunea de pregătire a taberei începută în capitolul întâi și deschide, prin ultimul verset, legătura directă cu glasul viu al DOMNULUI care va vorbi în capitolele următoare.",
  historicalContext:
    "Evenimentul povestit aici s-a petrecut de fapt înaintea recensământului din capitolul întâi, în ziua în care Cortul a fost ridicat și uns pentru prima dată (compară cu Exod 40:17, aceeași lună). Cartea Numeri nu urmează strict ordinea cronologică; capitolul acesta este așezat aici pentru că încheie firesc tema închinării și a dăruirii căpeteniilor, înainte ca tabăra să pornească efectiv la drum.",
  units: [
    {
      id: "numeri-7-1-11",
      ref: "Numeri 7:1-11",
      heading: "Căruțele și boii pentru purtarea Cortului",
      text: numeriPassage(7, 1, 11),
      teaching: teaching(
        "În chiar ziua în care Cortul a fost ridicat, uns și sfințit, căpeteniile celor douăsprezece seminții au adus primul lor dar: șase cărucioare acoperite și doisprezece boi, câte unul de la fiecare pereche de căpetenii. Nu este un dar personal păstrat pentru ei; DOMNUL le poruncește lui Moise să le ia și să le dea leviților.",
        "Împarțirea cărucioarelor arată o înțelepciune practică: gherșoniții, care poartă covoare și învelitori ușoare, primesc două cărucioare și patru boi; merariții, care poartă scândurile și stâlpii grei, primesc patru cărucioare și opt boi — de două ori mai mult, potrivit greutății sarcinii lor. Chehatiții nu primesc niciunul, pentru că slujba lor cerea să poarte lucrurile sfinte „pe umeri”, nu în căruță.",
        "Ia aminte cum dăruirea căpeteniilor este imediat pusă în slujba altcuiva: nu rămâne un tezaur strâns, ci devine unealtă de lucru pentru leviții care poartă Cortul. Darul cel mai frumos este cel care ajută pe altul să-și împlinească slujba lui.",
      ),
      words: [
        {
          original: "עֲגָלות צָב",
          transliteration: "agalot tzav",
          language: "ebraica",
          meaning:
            "cărucioare acoperite. Erau căruțe cu învelitoare, potrivite pentru a proteja covoarele și țesăturile Cortului de praful și arsura pustiei pe drum.",
        },
      ],
      crossRefs: ["Numeri 3:25-37", "Numeri 4:24-33", "1 Cronici 29:9"],
      forYourHeart:
        "Un dar potrivit nu este întotdeauna cel mai mare cu putință, ci cel care se potrivește exact nevoii celui care îl primește.",
    },
    {
      id: "numeri-7-12-17",
      ref: "Numeri 7:12-17",
      heading: "Ziua întâi: Nahșon deschide șirul darurilor",
      text: numeriPassage(7, 12, 17),
      teaching: teaching(
        "Exact ca la ordinea de marș din capitolul al doilea, Nahșon al lui Iuda este primul care își aduce darul pentru sfințirea altarului. Darul lui devine șablonul pentru toate celelalte unsprezece: un potir de argint, un potir de stropit, o lingură de aur cu tămâie, un taur, un berbec și un miel pentru ardere-de-tot, un țap pentru păcat, și o jertfă de pace bogată: doi boi, cinci berbeci, cinci țapi, cinci miei.",
        "Observă proporția: jertfele de pace — cele în care oamenii își împart masa înaintea DOMNULUI împreună cu preoții — sunt cu mult mai numeroase decât cele de ardere-de-tot sau de păcat. Sfințirea altarului nu se încheie doar cu ispășire și dăruire; se încheie cu sărbătoare și părtășie.",
        "Nahșon este același om care va deschide marșul în capitolul zece, din seminția din care va veni David și, prin El, Domnul Iisus. Că tocmai el este cel dintâi în orice rând al cărții — la recensământ, la tabără, la dar, la marș — nu este întâmplător.",
      ),
      words: [
        {
          original: "קְעָרָה אַחַת כֶסֶף־עשָׂרִים וְמֵאָה מִשְׁקָלָהּ",
          transliteration: "kearah ahat kesef-esrim umea mishkalah",
          language: "ebraica",
          meaning:
            "un potir de argint de o sută treizeci de șecheli. Precizia greutății, repetată identic de douăsprezece ori, arată că niciun trib nu a adus mai mult sau mai puțin decât altul.",
        },
      ],
      crossRefs: ["Numeri 2:3", "Rut 4:18-22", "Matei 1:4"],
      forYourHeart:
        "A fi primul într-un șir nu înseamnă a primi mai multă onoare pentru un dar mai mare; Nahșon aduce exact ce vor aduce și ceilalți unsprezece după el.",
    },
    {
      id: "numeri-7-18-83",
      ref: "Numeri 7:18-83",
      heading: "Încă unsprezece zile, același dar",
      text: numeriPassage(7, 18, 83),
      teaching: teaching(
        "Zi după zi, întâi Netanel al lui Isahar, apoi Eliab al lui Zabulon, Elizur al lui Ruben, Șelumiel al lui Simeon, Eliasaf al lui Gad, Elișama al lui Efraim, Gamaliel al lui Manase, Abidan al lui Beniamin, Ahiezer al lui Dan, Paghiel al lui Așer și Ahira al lui Neftali își aduc darul lor — și de fiecare dată este întocmai același, până la ultimul șechel și ultimul miel.",
        "Această repetare, care ar putea părea plictisitoare la citire, este de fapt cea mai puternică predică tăcută a capitolului: înaintea DOMNULUI, Efraim — cea mai mică tabără — nu aduce mai puțin decât Iuda, cea mai mare. Ruben, cel care pierduse întâietatea, nu aduce mai puțin decât Nahșon care a deschis șirul. Fiecare seminție stă înaintea altarului cu aceeași măsură de dăruire.",
        "Douasprezece zile la rând, fără grăbire, fără să îngrămădească toate darurile într-o singură zi mare: DOMNUL primește fiecare dar în parte, în ziua lui, cu aceeași luare-aminte. Răbdarea aceasta a primirii spune ceva despre felul în care Dumnezeu prețuiește fiecare dăruire, oricât de asemănătoare ar părea cu cea dinainte.",
      ),
      words: [
        {
          original: "בַּיוֹם הַשְׁמִינִי",
          transliteration: "baiom hașmini",
          language: "ebraica",
          meaning:
            "în ziua a opta (și așa mai departe pentru fiecare zi). Marcarea exactă a fiecărei zile în parte arată că fiecare căpetenie a avut ziua ei proprie, netulburată de graba de a termina mai repede.",
        },
      ],
      crossRefs: ["Numeri 1:5-15", "2 Corinteni 8:12", "Marcu 12:41-44"],
      forYourHeart:
        "Darul tău nu trebuie să fie mai mare decât al altcuiva ca să fie primit cu aceeași bucurie. Înaintea lui Dumnezeu, credincioșia egală contează mai mult decât mărimea.",
    },
    {
      id: "numeri-7-84-88",
      ref: "Numeri 7:84-88",
      heading: "Totalul: doisprezece din fiecare, adunate împreună",
      text: numeriPassage(7, 84, 88),
      teaching: teaching(
        "După douăsprezece zile identice, textul adună totul într-un singur bilanț: douăsprezece potire de argint, douăsprezece potire de stropit, douăsprezece linguri de aur, două mii patru sute de șecheli de argint în total, o sută douăzeci de șecheli de aur, douăsprezece tauri, douăsprezece berbeci și miei pentru arderea-de-tot, douăsprezece țapi pentru păcat și o mulțime mare de vite pentru jertfele de pace: douăzeci și patru de boi, șaizeci de berbeci, șaizeci de țapi, șaizeci de miei.",
        "Această socoteală finală arată întâi și întâi că nimic din darurile aduse în cele douăsprezece zile nu s-a pierdut sau s-a amestecat fără socoteală. Fiecare piesa a fost și rămas rânduită în numărul ei, chiar și după ce toate au fost strânse împreună.",
      ),
      words: [],
      crossRefs: ["Exod 30:11-16", "1 Cronici 29:6-9"],
      forYourHeart:
        "Dumnezeu ține socoteala fiecărui dar adus cu credincioșie, chiar după ce toate darurile par contopite într-un singur număr mare.",
    },
    {
      id: "numeri-7-89",
      ref: "Numeri 7:89",
      heading: "Glasul de pe capacul ispășirii",
      text: numeriPassage(7, 89, 89),
      teaching: teaching(
        "Ultimul verset al celui mai lung capitol din Numeri este și unul dintre cele mai intime din toată Scriptura: „când Moise intra în Cortul Întâlnirii ca să vorbească cu DOMNUL, auzea Glasul vorbindu-i de pe capacul ispășirii... dintre cei doi heruvimi”.",
        "Toate darurile, toate jertfele, toate rânduielile capitolelor anterioare duc spre acest singur lucru: un loc în care Dumnezeu vorbește cu omul, față către față, de pe locul acoperirii păcatului. Nu de pe un tron depărtat, ci de pe chiar capacul care acoperea Mărturia, dintre cei doi heruvimi care străjuiau sfințenia Lui.",
        "Acest verset încheie întreg parcursul de la Exod 25:22, unde DOMNUL făgăduise pentru întâia dată: „acolo Mă voi întâlni cu tine și îți voi vorbi”. După tot ce a fost construit, uns, sfințit, numit și rânduit, făgăduința s-a împlinit întocmai: Dumnezeu vorbește cu adevărat cu poporul Său, prin Moise, din chiar mijlocul taberei.",
      ),
      words: [
        {
          original: "מֵעַל הַכַּפֹּרֶת",
          transliteration: "meal hakaporet",
          language: "ebraica",
          meaning:
            "de pe capacul ispășirii. Același cuvânt, „kaporet”, vine din rădăcina „a acoperi, a ispăși”; glasul DOMNULUI vine tocmai din locul în care sfânta Lege era acoperită de mila Să. Vorbirea Lui cu omul se naște din ispășire, nu din judecată rece.",
        },
      ],
      crossRefs: ["Exod 25:17-22", "Evrei 4:16", "Evrei 9:5"],
      forYourHeart:
        "Dumnezeu nu-ți vorbește de pe un tron al judecății, ci de pe locul ispășirii. Glasul care ți se adresează vine întotdeauna însoțit de milă.",
    },
  ],
  prayer:
    "Doamne, învață-mă să aduc darul meu cu aceeași credincioșie cu care l-a adus Efraim, cel mai mic, ca și Iuda, cel mai mare.\n\nDă-mi răbdarea de a primi darul altuia fără să-l compar cu al meu și fără să mă grăbesc să trec la următorul.\n\nȚine-mă aproape de locul ispășirii, unde Glasul Tău vorbește însoțit de mila Ta, nu de judecata pe care o merit.\n\nȘi mulțumesc-Ți că vrei să vorbești cu poporul Tău, așa cum ai vorbit cu Moise, din mijlocul taberei. Amin.",
  status: NUMERI_STATUSES[7],
})
