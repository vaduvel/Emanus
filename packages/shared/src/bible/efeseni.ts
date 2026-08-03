import type { BibleBook } from "./types.js"
import { efeseniChapter, teaching } from "./efeseniHelpers.js"
import { EFESENI_2 } from "./efeseni2.js"
import { EFESENI_3 } from "./efeseni3.js"
import { EFESENI_4 } from "./efeseni4.js"
import { EFESENI_5 } from "./efeseni5.js"
import { EFESENI_6 } from "./efeseni6.js"

/*
 * Textul biblic este materializat separat din RCCV.
 * Explicațiile sunt redactate în română pe baza studiilor verse-by-verse
 * ale lui Zac Poonen, fără copiere 1:1. Daniel rămâne reviewerul final.
 */

const EFESENI_1 = efeseniChapter({
  number: 1,
  title: "Efeseni 1 — Binecuvântați în Hristos",
  summary: "Pavel deschide scrisoarea privind mai întâi la ceea ce a făcut Dumnezeu pentru noi în Hristos: ne-a ales pentru sfințenie, ne-a așezat ca fii, ne-a răscumpărat și ne-a pecetluit cu Duhul Sfânt. Apoi se roagă ca ochii inimii să vadă chemarea, moștenirea și puterea învierii.",
  literaryContext: "Primele trei capitole pun temelia doctrinară înaintea poruncilor practice din capitolele patru până la șase. Accentul repetat este «în Hristos»: identitatea și binecuvântările credinciosului vin din unirea cu El, nu din performanță religioasă.",
  historicalContext: "Efesul era un centru important al Asiei Romane, marcat de cultul Artemisei, magie și putere economică. Pavel scrie unei comunități suficient de maturizate pentru a primi o prezentare amplă a planului lui Dumnezeu pentru Hristos și Biserică.",
  units: [
    {
      verses: [1, 6],
      heading: "Aleși pentru sfințenie și înfiere",
      teaching: teaching(
        "Pavel începe cu binecuvântările spirituale, nu cu promisiunea unei vieți comode. Dumnezeu ne-a ales în Hristos ca să fim sfinți și fără vină înaintea Lui. Alegerea nu este o scuză pentru pasivitate, ci descoperirea scopului: asemănarea cu Fiul.",
        "Înfierea arată că Dumnezeu nu ne ține la distanță ca pe niște tolerați, ci ne așază în familia Lui și ne dă demnitatea fiilor. Poonen subliniază că această siguranță eliberează de căutarea compulsivă a aprobării oamenilor.",
      ),
      words: [{ original: "huiothesia", transliteration: "huiothesia", language: "greaca", meaning: "așezare ca fiu, înfiere cu drepturi și responsabilitate" }],
      crossRefs: ["Romani 8:28-30", "Galateni 4:4-7", "1 Petru 1:15-16"],
      forYourHeart: "Primește identitatea dată de Tatăl și întreabă-L ce înseamnă astăzi să trăiești ca un copil al Lui.",
    },
    {
      verses: [7, 10],
      heading: "Răscumpărarea și taina voii lui Dumnezeu",
      teaching: teaching(
        "Răscumpărarea prin sângele lui Hristos înseamnă iertare și eliberare din robia păcatului. Harul nu este zgârcit sau calculat; Dumnezeu îl revarsă cu înțelepciune pentru a ne aduce sub conducerea lui Hristos.",
        "Planul final este ca toate lucrurile să fie reunite în Hristos. Viața creștină nu se reduce la salvarea individuală, ci intră în scopul mai larg al lui Dumnezeu de a restaura ordinea, pacea și unitatea sub Fiul Său.",
      ),
      crossRefs: ["Coloseni 1:13-20", "1 Petru 1:18-19", "Apocalipsa 5:9-10"],
      forYourHeart: "Nu folosi iertarea doar pentru liniștirea conștiinței; lasă răscumpărarea să rupă și vechile legături ale păcatului.",
    },
    {
      verses: [11, 14],
      heading: "Moștenire și pecetea Duhului",
      teaching: teaching(
        "În Hristos am primit o moștenire și am devenit parte din moștenirea lui Dumnezeu. Viața nu mai este o succesiune de accidente; Dumnezeu lucrează potrivit planului Său, fără a anula răspunsul și ascultarea noastră.",
        "Duhul Sfânt este pecetea apartenenței și arvuna lucrării viitoare. Prezența Lui nu este un titlu de prestigiu, ci începutul unei vieți în care caracterul lui Hristos se formează real în noi.",
      ),
      crossRefs: ["Romani 8:14-17", "2 Corinteni 1:21-22", "1 Petru 1:3-5"],
      forYourHeart: "Mulțumește pentru lucrarea începută de Duhul și cooperează cu El într-un domeniu concret al caracterului tău.",
    },
    {
      verses: [15, 23],
      heading: "Ochii inimii și puterea învierii",
      teaching: teaching(
        "Pavel nu se mulțumește că efesenii au credință și dragoste; el se roagă să primească duh de înțelepciune și descoperire. Adevărul biblic trebuie să lumineze inima, nu doar să umple mintea cu informații.",
        "Chemarea noastră are speranță, Dumnezeu prețuiește moștenirea Sa în sfinți, iar puterea care L-a înviat pe Hristos lucrează în cei ce cred. Hristos este deasupra oricărei autorități, iar Biserica este trupul Lui, chemat să manifeste plinătatea Capului.",
      ),
      crossRefs: ["2 Corinteni 4:6", "Filipeni 3:10", "Coloseni 1:18"],
      forYourHeart: "Roagă-te ca Dumnezeu să-ți lumineze inima într-un adevăr pe care îl cunoști, dar încă nu îl trăiești.",
    },
  ],
  prayer: "Tată, deschide ochii inimii mele să văd bogăția harului Tău în Hristos. Fă-mă sfânt, formează în mine caracterul Fiului și învață-mă să trăiesc prin puterea Duhului Sfânt. Amin.",
})

export const EFESENI: BibleBook = {
  id: "efeseni",
  name: "Efeseni",
  testament: "nt",
  order: 49,
  blurb: "În Hristos primim o identitate nouă, suntem zidiți într-un singur trup și învățăm să umblăm în dragoste, lumină, înțelepciune și puterea lui Dumnezeu.",
  chapters: [EFESENI_1, EFESENI_2, EFESENI_3, EFESENI_4, EFESENI_5, EFESENI_6],
}
