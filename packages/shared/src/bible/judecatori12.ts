import { judecatoriChapter, teaching } from "./judecatoriHelpers.js"
import { judecatoriStatus } from "./judecatoriPublication.js"

/* Judecători 12 — text Biblia Emanus; explicație originală Emanus după cercetarea textului și a transcrierii Through The Bible. */
export const JUDECATORI_12 = judecatoriChapter({
  number: 12,
  title: "Judecători 12 — Șibolet: orgoliul frățesc ajunge război civil",
  summary:
    "Efraimiții îl acuză pe Iefta că nu i-a chemat la luptă, iar disputa dintre seminții se transformă într-un măcel la vadurile Iordanului. Pronunția cuvântului «șibolet» devine test de identitate. După Iefta, Ibțan, Elon și Abdon judecă Israelul în perioade mai liniștite.",
  literaryContext:
    "Conflictul repetă tensiunea din Judecători 8, dar de data aceasta răspunsul nu este blând. După victoria asupra unui vrăjmaș exterior, Israel își întoarce armele asupra propriilor frați. Ultima parte comprimă trei judecători și face trecerea spre ciclul lui Samson.",
  historicalContext:
    "Vadurile Iordanului erau puncte strategice de trecere. Diferențele de pronunție dintre grupurile tribale puteau identifica originea unui om. Termenul «șibolet» înseamnă spic sau pârâu, dar aici devine marcă de apartenență folosită pentru execuție.",
  units: [
    {
      verses: [1, 7],
      heading: "O ceartă despre onoare se transformă în uciderea fraților",
      teaching: teaching(
        "Efraimiții vin din nou cu acuzația că au fost excluși din luptă. În capitolul 8, Ghedeon le răspunsese cu blândețe; Iefta răspunde prin contraacuzație și mobilizare armată.",
        "Ambele părți sunt preocupate de onoare, apartenență și recunoaștere. Vrăjmașul exterior fusese înfrânt, dar mândria netratată produce o rană mai adâncă în interiorul poporului.",
        "Faptul că Iefta fusese respins poate explica sensibilitatea lui, dar nu justifică masacrul. Durerea nevindecată poate deveni cruzime când liderul primește putere fără să învețe pacea.",
      ),
      crossRefs: ["Judecători 8:1-3", "Proverbe 17:14", "Iacov 4:1-2"],
      forYourHeart:
        "Când te simți nerespectat, nu lăsa rana să transforme un frate în vrăjmaș. Oprește conflictul înainte ca nevoia de onoare să ceară un preț pe care nimeni nu-l mai poate întoarce.",
    },
    {
      verses: [8, 10],
      heading: "Ibțan: familie, alianțe și șapte ani de conducere",
      teaching: teaching(
        "Despre Ibțan aflăm mai ales prin familia lui numeroasă și căsătoriile copiilor în afara clanului. Într-o lume tribală, acestea puteau construi alianțe și stabilitate.",
        "Textul nu îl prezintă printr-o mare bătălie. După violența de la vaduri, șapte ani de conducere fără o nouă criză majoră sunt un dar tăcut.",
        "Scriptura consemnează și perioadele în care binele se face prin administrare, relații și continuitate, nu numai prin acte dramatice.",
      ),
      crossRefs: ["Rut 4:13-17", "Proverbe 11:14", "1 Timotei 2:1-2"],
      forYourHeart:
        "Nu căuta numai rolurile în care poți fi erou. O comunitate are nevoie și de oameni care păstrează pacea, construiesc legături și slujesc fără spectacol.",
    },
    {
      verses: [11, 15],
      heading: "Elon și Abdon: slujiri scurte în text, dar reale înaintea lui Dumnezeu",
      teaching: teaching(
        "Elon judecă zece ani, iar Abdon opt. Despre ei ni se spune puțin, însă anii nu dispar din socoteala lui Dumnezeu doar pentru că narațiunea nu oferă detalii.",
        "Abdon are o familie extinsă și resurse vizibile, sugerate de măgarii pe care călăresc fiii și nepoții lui. Cartea nu spune dacă bogăția lui a devenit cursă; pur și simplu notează cadrul conducerii sale.",
        "După lideri cu istorii tulburi, aceste rezumate ne învață să nu confundăm lipsa dramei cu lipsa rostului. Uneori harul se vede tocmai în faptul că nu izbucnește o nouă catastrofă.",
      ),
      crossRefs: ["Psalmul 90:12", "1 Corinteni 15:58", "Evrei 6:10"],
      forYourHeart:
        "Poate că lucrarea ta va încăpea într-o propoziție în memoria oamenilor. Trăiește astfel încât acea propoziție să poată spune simplu: a slujit credincios în vremea lui.",
    },
  ],
  prayer:
    "Doamne, oprește în noi mândria care transformă frații în vrăjmași.\n\nVindecă rănile respingerii înainte ca ele să devină violență și dă-ne răspunsuri care caută pacea.\n\nÎnvață-ne să prețuim slujirea liniștită, anii de stabilitate și credincioșia pe care oamenii poate nu o observă.\n\nFă-ne buni administratori ai vremii noastre. Amin.",
  status: judecatoriStatus(12),
})
