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

export const NUMERI_18 = numeriChapter({
  number: 18,
  title: "Numeri 18 — Răspunderile și partea preoților și leviților",
  summary:
    "Direct după teamă poporului în fața morții și a semnului toiagului înverzit, DOMNUL explică rolul distinct al preoților și leviților: Aaron și fiii lui poartă răspunderea nelegiuirii Sfântului Lăcaș, leviții își slujesc, iar ambă categorii primesc partea lor de trai din darurile aduse DOMNULUI, nu o moștenire de pământ.",
  literaryContext:
    "Acest capitol răspunde direct întrebării cu care se încheiase capitolul precedent — „vom pieri noi oare toți?” — explicând sistemul rânduit de DOMNUL prin care apropierea de lucrurile sfinte devine sigură: nu prin inițiativă individuală, ci prin slujitorii rânduiți și prin darurile aduse prin ei.",
  historicalContext:
    "Sistemul zeciuielilor descris aici — poporul dă zeciuială leviților, iar leviții dau o zecime din aceea preoților — formează baza economică a întregii preoții israelite până la distrugerea celui de-al doilea Templu și este citat direct în Evrei 7:5 ca fundal pentru argumentul despre preoția lui Melhisedec.",
  units: [
    {
      id: "numeri-18-1-5",
      ref: "Numeri 18:1-5",
      heading: "Aaron și fiii lui poartă nelegiuirea Sfântului Lăcaș",
      text: numeriPassage(18, 1, 5),
      teaching: teaching(
        "Răspunsul DOMNULUI la groaza poporului este direct și personal, adresat lui Aaron: „tu, fiii tăi și casa tatălui tău cu tine veți purta nelegiuirea Sfântului Lăcaș”. Preoția nu este doar un privilegiu, ci o răspundere grea, purtată în numele întregului popor.",
        "Leviții sunt chemați să se alăture lui Aaron și să-i slujească, dar cu o graniță clară: „de uneltele Sfântului Lăcaș și de altar să nu se apropie, ca să nu moară, nici ei, nici voi”. Chiar leviții, chemați mai aproape decât restul poporului, au propriile lor limite, distincte de cele ale preoților.",
      ),
      words: [],
      crossRefs: ["Numeri 3:7-8", "Numeri 17:12-13"],
      forYourHeart:
        "Fiecare chemare are propriile ei granițe rânduite de Dumnezeu; a fi mai aproape de lucrurile sfinte nu înseamnă acces nelimitat, ci răspundere pe măsură.",
    },
    {
      id: "numeri-18-6-7",
      ref: "Numeri 18:6-7",
      heading: "Leviții, un dar; preoția, o slujbă de dar",
      text: numeriPassage(18, 6, 7),
      teaching: teaching(
        "DOMNUL descrie leviții ca fiind „dați ca un dar pentru DOMNUL” lui Aaron și fiilor lui, pentru slujba Cortului Întâlnirii. Nu este un dar pe care Aaron l-a câștigat sau meritat, ci o binecuvântare așezată asupra lui de DOMNUL.",
        "Preoția Însăși este numită „o slujbă de dar”, nu un drept câștigat: „vă dau preoția ca o slujbă de dar”. Acest limbaj răspunde direct disputei lui Core din capitolul șaisprezece, care văzuse preoția ca pe o poziție de câștigat, nu ca pe un har primit.",
      ),
      words: [],
      crossRefs: ["Numeri 16:9-10", "Evrei 5:4"],
      forYourHeart:
        "O slujire sfântă este întotdeauna un dar primit, niciodată un drept câștigat prin insistență sau dorință personală.",
    },
    {
      id: "numeri-18-8-10",
      ref: "Numeri 18:8-10",
      heading: "Partea din lucrurile preasfinte",
      text: numeriPassage(18, 8, 10),
      teaching: teaching(
        "DOMNUL explică lui Aaron că partea lui din darurile poporului nu este o remunerație oarecare, ci un dar direct de la DOMNUL Însăși: „Eu ți-am dat în grijă toate prinosurile Mele ridicate”, „ca drept de ungere, ca o orânduială veșnică”.",
        "Lucrurile preasfinte — jertfele de mâncare, jertfele pentru păcat, jertfele pentru vină — pot fi mâncate doar „într-un loc preasfânt” de către bărbații din familia preoțească. Sfințenia darului determină unde și de către cine poate fi consumat.",
      ),
      words: [],
      crossRefs: ["Levitic 6:16-18", "Levitic 7:6"],
      forYourHeart:
        "Ceea ce este consacrat lui Dumnezeu păstrează restricții asupra felului în care este folosit; sfințenia unui dar nu se pierde odată primit.",
    },
    {
      id: "numeri-18-11-14",
      ref: "Numeri 18:11-14",
      heading: "Prinosul legănat, cele mai bune roade, lucrurile dăruite prin jurământ",
      text: numeriPassage(18, 11, 14),
      teaching: teaching(
        "O a doua categorie de daruri — prinosul ridicat, jertfele legănate — este mai puțin restrictivă: „oricine este curat în casa ta va putea să mănânce din ele”, nu doar bărbații preoți. Familia întreagă a preotului beneficiază de această categorie de daruri.",
        "Cele dintâi roade din ulei, must și grâu, precum și tot ce este dăruit prin jurământ, revin de asemenea familiei preoțești. Această varietate de surse asigura că preoții, care nu aveau pământ propriu, trăiau din generozitatea continuă a întregului popor.",
      ),
      words: [],
      crossRefs: ["Deuteronom 18:3-5", "1 Corinteni 9:13"],
      forYourHeart:
        "Dumnezeu rânduiește ca cei ce slujesc la altar să trăiască din altar, susținuți de generozitatea celor cărora le slujesc.",
    },
    {
      id: "numeri-18-15-19",
      ref: "Numeri 18:15-19",
      heading: "Întâii născuți și legământul de sare",
      text: numeriPassage(18, 15, 19),
      teaching: teaching(
        "Legea întâiului născut, deja stabilită în Exod, este reluată aici din perspectiva venitului preoțesc: întâiul născut al omului trebuie răscumpărat cu cinci șecheli de argint, dar „pe întâiul născut al vacii, al oii sau al caprei să nu-l răscumperi: sunt sfinte” — acestea sunt jertfite, cu carnea lor mergand la preoți.",
        "Această secțiune se încheie cu o formulă solemnă: „acesta este un legământ de sare veșnic înaintea DOMNULUI”. Sarea, folosită ca element de conservare și incoruptibilitate, simbolizează permanența și statornicia acestui aranjament între DOMNUL și preoție, netulburată de nicio răzvrătire viitoare.",
      ),
      words: [
        {
          original: "בְּרִית מֶלַח עוֹלָם",
          transliteration: "berit melach olam",
          language: "ebraica",
          meaning:
            "legământ de sare veșnic. Sarea, folosită pentru a conserva jertfele de mâncare (Levitic 2:13), reprezenta un legământ statornic și nealterabil, invocat de mai multe ori în legătură cu preoția și domnia lui David.",
        },
      ],
      crossRefs: ["Levitic 2:13", "2 Cronici 13:5"],
      forYourHeart:
        "Un legământ „de sare” cu Dumnezeu nu se alterează în timp; ceea ce El rostiește ca veșnic rămâne statornic dincolo de orice tulburare vremelnică.",
    },
    {
      id: "numeri-18-20-24",
      ref: "Numeri 18:20-24",
      heading: "„Eu sunt partea ta și moștenirea ta”",
      text: numeriPassage(18, 20, 24),
      teaching: teaching(
        "DOMNUL îi spune lui Aaron un adevăr care va rămâne definitor pentru întreaga preoție: „tu nu vei avea nicio moștenire în țara lor... Eu sunt partea ta și moștenirea ta în mijlocul fiilor lui Israel”. Lipsa de pământ propriu nu este o lipsă, ci o binecuvântare: DOMNUL Însăși devine moștenirea lor.",
        "Leviții, la rândul lor, primesc „toate zeciuielile din Israel” ca moștenire, în schimbul slujbei Cortului Întâlnirii. Această aranjament închide definitiv problema de la rădăcina răzvrătirii lui Core: nimeni nu acționează din interes propriu, ci fiecare este susținut prin dărnicia rânduită de DOMNUL.",
      ),
      words: [],
      crossRefs: ["Deuteronom 10:9", "Deuteronom 18:1-2", "Psalmul 16:5"],
      forYourHeart:
        "Când Dumnezeu Însăși îți este partea și moștenirea, lipsa altor bunuri pământești nu mai este o pierdere, ci un semn al unei binecuvântări mai mari.",
    },
    {
      id: "numeri-18-25-32",
      ref: "Numeri 18:25-32",
      heading: "Zeciuiala din zeciuială",
      text: numeriPassage(18, 25, 32),
      teaching: teaching(
        "DOMNUL adaugă o instrucțiune finală pentru leviți: din zeciuielile pe care le primesc de la popor, să aducă la rândul lor „o zecime din zeciuială” ca prinos ridicat DOMNULUI, dat preotului Aaron. Nici leviții nu sunt scutiți de a dărui din ce au primit.",
        "DOMNUL asigură explicit leviții că, după ce vor fi adus partea cea mai bună către preoți, restul îl pot mânca „în orice loc, voi și casele voastre, căci este plata voastră pentru slujba voastră”, fără să poarte vreun păcat pentru asta — cu condiția să fi dat mai întâi ce este mai bun.",
      ),
      words: [],
      crossRefs: ["Neemia 10:38", "Evrei 7:5"],
      forYourHeart:
        "A primi de la Dumnezeu vine întotdeauna împreună cu chemarea de a dărui mai departe partea cea mai bună; nimeni nu este doar primitor într-un lanț al dărniciei rânduite de El.",
    },
  ],
  prayer:
    "Doamne, mulțumesc-Ți că orice chemare pe care mi-o dai vine împreună cu partea de care am nevoie ca să o împlinesc.\n\nÎnvață-mă să privesc slujirea mea ca pe un dar primit, nu ca pe un drept câștigat.\n\nFii Tu Însăți partea și moștenirea mea, ca să nu trăiesc pentru câștig pământesc, ci pentru părtia cu Tine.\n\nȘi învață-mă să dau mai departe partea cea mai bună din ce am primit, așa cum ai rânduit pentru leviți și preoți. Amin.",
  status: NUMERI_STATUSES[18],
})
