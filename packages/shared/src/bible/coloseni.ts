import type { BibleBook } from "./types.js"
import { coloseniChapter, teaching } from "./coloseniHelpers.js"
import { COLOSENI_2 } from "./coloseni2.js"
import { COLOSENI_3 } from "./coloseni3.js"
import { COLOSENI_4 } from "./coloseni4.js"

/*
 * Textul biblic este materializat separat din RCCV.
 * Explicațiile sunt redactate în română pe baza studiilor verse-by-verse
 * ale lui Zac Poonen, fără copiere 1:1. Daniel rămâne reviewerul final.
 */

const COLOSENI_1 = coloseniChapter({
  number: 1,
  title: "Coloseni 1 — Hristos are întâietatea în toate",
  summary: "Pavel mulțumește pentru credința, dragostea și speranța credincioșilor, apoi se roagă ca ei să-L cunoască pe Dumnezeu într-un mod care le schimbă umblarea. Capitolul Îl prezintă pe Hristos ca Domn al creației și Cap al Bisericii, prin care avem răscumpărare, împăcare și nădejdea slavei.",
  literaryContext: "Introducerea leagă viața comunității de persoana lui Hristos. Rugăciunea lui Pavel conduce spre imnul despre supremația Fiului, apoi spre misiunea slujitorului care vestește taina «Hristos în voi» pentru maturizarea fiecărui credincios.",
  historicalContext: "Biserica din Colose fusese slujită de Epafra, iar Pavel nu îi întâlnise personal pe cei mai mulți dintre membri. Scrisoarea îi întărește împotriva învățăturilor care diminuau suficiența lui Hristos prin filozofie, ritual și practici ascetice.",
  units: [
    {
      verses: [1, 8],
      heading: "Credință în Hristos, dragoste pentru toți și speranță cerească",
      teaching: teaching(
        "Pavel își recunoaște chemarea fără să se transforme în centrul lucrării și îl include pe Timotei alături de el. Poonen observă aici o slujire trăită în realitatea Trupului lui Hristos: darurile diferă, dar niciun slujitor nu are valoare mai mare înaintea lui Dumnezeu și nimeni nu trebuie să atragă oamenii spre propria persoană.",
        "Credința lor se vedea în dependența de Hristos, iar dragostea se extindea la toți sfinții, nu doar la grupul apropiat. Speranța păstrată în cer nu este simpla scăpare din necaz, ci transformarea după chipul lui Hristos. Evanghelia adevărată produce roadă și creștere, iar Epafra este amintit ca slujitor credincios, nu ca proprietar al comunității.",
      ),
      crossRefs: ["Efeseni 1:15-18", "1 Ioan 3:2-3", "1 Corinteni 3:5-7"],
      forYourHeart: "Mulțumește-I lui Dumnezeu pentru lucrarea Lui într-un credincios din afara cercului tău apropiat și roagă-te să iubești întregul Trup al lui Hristos.",
    },
    {
      verses: [9, 14],
      heading: "Cunoașterea voii lui Dumnezeu devine o umblare vrednică",
      teaching: teaching(
        "Rugăciunea lui Pavel nu urmărește doar acumularea de informații, ci umplerea cu o cunoaștere spirituală care schimbă viața. Înțelegerea voii lui Dumnezeu trebuie să producă o umblare plăcută Lui, rod în orice faptă bună și o cunoaștere tot mai profundă a caracterului Său.",
        "Puterea Duhului nu este prezentată în primul rând ca spectacol, ci ca tărie pentru statornicie, îndelungă răbdare și bucurie în încercare. Tatăl ne-a făcut potriviți pentru moștenire, ne-a eliberat de autoritatea întunericului și ne-a mutat în împărăția Fiului, unde răscumpărarea și iertarea sunt daruri primite prin Hristos.",
      ),
      crossRefs: ["Efeseni 1:17-19", "Efeseni 3:16-19", "Faptele 26:18"],
      forYourHeart: "Nu cere doar să știi ce este corect; cere ca adevărul cunoscut să producă astăzi răbdare, rod și o alegere care Îl bucură pe Dumnezeu.",
    },
    {
      verses: [15, 20],
      heading: "Creatorul tuturor și Capul Bisericii",
      teaching: teaching(
        "Hristos face cunoscut Dumnezeul nevăzut. Expresia «întâiul născut» nu Îl așază între lucrurile create, deoarece textul spune că toate au fost create în El, prin El și pentru El. El exista înainte de toate și susține întreaga creație.",
        "Același Hristos este Capul Trupului, Biserica, și întâiul în noua creație, pentru ca El să aibă întâietatea în toate. Plinătatea lui Dumnezeu locuiește în El, iar pacea cu Dumnezeu nu se obține prin performanță religioasă, ci prin sângele crucii. Împăcarea nu declară răul bun; ea înlătură vrăjmășia și ne readuce sub domnia dreaptă a lui Dumnezeu.",
      ),
      crossRefs: ["Ioan 1:1-3", "Evrei 1:2-3", "Efeseni 1:20-23"],
      forYourHeart: "Observă domeniul în care Hristos este doar o parte a vieții tale și oferă-I din nou întâietatea, nu doar un loc onorific.",
    },
    {
      verses: [21, 23],
      heading: "Împăcați pentru a fi prezentați sfinți și statornici",
      teaching: teaching(
        "Păcatul ne înstrăinase de Dumnezeu și făcuse mintea ostilă față de El, dar moartea reală a lui Hristos în trup deschide împăcarea. Scopul este mai mult decât anularea vinei: Dumnezeu lucrează să ne prezinte sfinți, fără pată și fără acuzație înaintea Lui.",
        "Pavel leagă această speranță de continuarea statornică în credință. Nu este o chemare la panică, ci la o credință vie care rămâne în Hristos și nu abandonează speranța Evangheliei. Slujitorul nu manipulează oamenii prin frică, ci îi ajută să rămână ancorați în persoana și lucrarea lui Hristos.",
      ),
      crossRefs: ["Ioan 15:4-6", "Evrei 3:12-14", "Iuda 24-25"],
      forYourHeart: "Întărește astăzi o practică prin care rămâi în Hristos: rugăciune sinceră, ascultarea unui adevăr sau părtășie cu un credincios matur.",
    },
    {
      verses: [24, 29],
      heading: "Hristos în voi și slujirea pentru maturitatea fiecăruia",
      teaching: teaching(
        "Suferințele lui Pavel pentru Biserică nu completează jertfa ispășitoare a lui Hristos, care este deplină. Ele descriu prețul personal al slujirii, al lepădării de sine, al rugăciunii și al purtării poverilor altora pentru zidirea Trupului.",
        "O asemenea chemare vine de la Dumnezeu și nu îi oferă liderului control nelimitat asupra altora. Nicio chemare la suferință nu obligă o victimă să rămână în abuz, violență, exploatare, infracțiune sau pericol; căutarea siguranței, a sprijinului competent și a autorităților este compatibilă cu credința.",
        "Taina descoperită acum este «Hristos în voi, nădejdea slavei». Pavel vestește, avertizează și învață cu înțelepciune pentru a prezenta fiecare om matur în Hristos. El lucrează din greu, dar recunoaște că energia eficientă vine de la Dumnezeu, nu din ambiție, talent sau presiune exercitată asupra oamenilor.",
      ),
      crossRefs: ["Galateni 2:20", "2 Corinteni 1:3-7", "Efeseni 4:11-16"],
      forYourHeart: "Identifică partea ta concretă în zidirea Trupului și fă-o fără comparație, fără control și fără a numi abuzul o cruce spirituală.",
    },
  ],
  prayer: "Doamne Isuse, ocupă primul loc în toate. Umple-mă cu înțelepciune spirituală, putere pentru răbdare și dragoste pentru întregul Tău Trup. Fă reală în mine taina prezenței Tale și folosește-mă pentru maturizarea altora, cu smerenie și adevăr. Amin.",
})

export const COLOSENI: BibleBook = {
  id: "coloseni",
  name: "Coloseni",
  testament: "nt",
  order: 51,
  blurb: "Hristos este suficient și suprem: în El avem împăcare, plinătate, o viață nouă și relații transformate.",
  chapters: [COLOSENI_1, COLOSENI_2, COLOSENI_3, COLOSENI_4],
}
