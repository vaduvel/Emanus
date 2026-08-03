import { galateniChapter, teaching } from "./galateniHelpers.js"

/*
 * Textul biblic este materializat separat din RCCV.
 * Explicațiile sunt redactate în română pe baza studiilor verse-by-verse
 * ale lui Zac Poonen, fără copiere 1:1. Daniel rămâne reviewerul final.
 */

export const GALATENI_4 = galateniChapter({
  number: 4,
  title: "Galateni 4 — De la robie la înfiere",
  summary: "Prin Hristos, cei aflați sub robie primesc înfierea și Duhul Fiului strigă în inimă «Ava, Tată». Pavel îi cheamă pe galateni să nu se întoarcă la ritualism și folosește istoria lui Agar și Sara pentru a contrasta robia cu promisiunea.",
  literaryContext: "Pavel dezvoltă imaginea moștenitorului minor din finalul capitolului 3. Apoi apelul devine profund personal, înainte ca argumentul alegoric despre cei doi fii ai lui Avraam să încheie secțiunea.",
  historicalContext: "Observarea zilelor, lunilor și anilor era prezentată ca semn de maturitate religioasă. Pavel o vede ca întoarcere la un sistem de robie atunci când ritualul înlocuiește relația vie cu Dumnezeu.",
  units: [
    {
      verses: [1, 7],
      heading: "Duhul Fiului în inimile noastre",
      teaching: teaching(
        "Moștenitorul minor poate avea drepturi, dar trăiește încă asemenea unui rob. La vremea hotărâtă, Fiul lui Dumnezeu a venit, născut sub Lege, ca să-i răscumpere pe cei de sub Lege și să le dea înfierea.",
        "Duhul Sfânt produce în noi relația Fiului cu Tatăl: «Ava, Tată». Harul nu ne lasă copii iresponsabili; ne crește spre maturitatea fiilor care cunosc voia Tatălui și o împlinesc din dragoste.",
      ),
      crossRefs: ["Romani 8:14-17", "Efeseni 1:5", "Evrei 2:10-11"],
      forYourHeart: "Apropie-te astăzi de Dumnezeu ca de Tatăl tău, nu ca de un stăpân pe care trebuie să-l mituiești.",
    },
    {
      verses: [8, 20],
      heading: "Nu vă întoarceți la forme fără viață",
      teaching: teaching(
        "Galatenii cunoscuseră idolatria, iar acum riscau o altă robie: ritualuri religioase fără realitatea lăuntrică. Zilele și practicile pot avea valoare ca ajutor, dar devin slăbiciune când sunt transformate în condiție de acceptare înaintea lui Dumnezeu.",
        "Pavel nu îi tratează rece; vorbește ca un părinte care dorește ca Hristos să ia chip în ei. Autoritatea spirituală sănătoasă nu produce dependență de lider, nu izolează și nu controlează, ci lucrează până când caracterul lui Hristos se formează în om.",
      ),
      crossRefs: ["Isaia 1:11-17", "Coloseni 2:16-23", "1 Tesaloniceni 2:7-12"],
      forYourHeart: "Întreabă-te dacă practicile tale te conduc la Hristos sau doar îți dau sentimentul că ești superior.",
    },
    {
      verses: [21, 31],
      heading: "Copiii promisiunii, nu ai robiei",
      teaching: teaching(
        "Agar și Ismael ilustrează ceea ce omul produce prin efortul firii, iar Sara și Isaac ceea ce Dumnezeu aduce prin promisiune. Efortul religios poate produce rezultate vizibile, dar nu poate naște viața Duhului.",
        "Credincioșii sunt copii ai promisiunii și sunt chemați să îndepărteze principiul robiei. Această imagine nu autorizează alungarea, disprețuirea sau dezumanizarea oamenilor; conflictul este cu sistemul încrederii în fire, nu cu persoane considerate inferioare.",
      ),
      crossRefs: ["Geneza 16:1-16", "Geneza 21:1-14", "Evrei 11:11-12"],
      forYourHeart: "Renunță la încercarea de a produce prin presiune ceea ce numai Dumnezeu poate naște prin promisiune.",
    },
  ],
  prayer: "Ava, Tată, mulțumesc că m-ai primit ca fiu prin Hristos. Păzește-mă de ritualism, robie și încredere în fire. Formează chipul lui Hristos în mine prin Duhul Tău. Amin.",
})
