export const ziuaInchinareLesson = [];
const now = new Date();

ziuaInchinareLesson.push(
 {
    type: "info",
    from: "left",
    content: "Imaginează-ți o barcă fără busolă, plutind pe ocean. Asta e viața fără scop: multă mișcare, dar niciodată nu ajungi nicăieri. Mulți cred că tragedia vieții este moartea, dar cea mai mare tragedie este să trăiești fără să știi de ce ai fost creat.",
    timestamp: now
  },

  // Problemă umană
  {
    type: "info",
    from: "left",
    content: "Toți avem planuri. Visăm, facem liste, ne dorim mereu “ceva mai mult”. Și totuși, rămâne un gol pe care nu îl poate umple nimic, nici succesul, nici banii. De ce? Pentru că doar Creatorul tău știe scopul pentru care te-a creat.",
    timestamp: new Date(now.getTime() + 7000)
  },

  // Adevărul biblic central
  {
    type: "bible",
    from: "left",
    content: [
      "Proverbe 19:21 – 'Multe planuri sunt în inima omului, dar hotărârea Domnului, aceea se va împlini.'",
      "Efeseni 2:10 – 'Căci noi suntem lucrarea Lui, creați în Hristos Isus pentru faptele bune pe care Dumnezeu le-a pregătit mai dinainte ca să umblăm în ele.'"
    ],
    timestamp: new Date(now.getTime() + 14000)
  },

  // Explicație/Ilustrare
  {
    type: "info",
    from: "left",
    content: "Gândește-te: Un cuțit nu e făcut să bată cuie, iar un pește nu e creat să zboare. Tot ce a fost creat are un scop. La fel și tu! Dacă nu știi de ce ai fost creat, vei folosi greșit viața ta. Mulți Îl cunosc pe Dumnezeu doar din povești sau minuni, dar puțini ajung să-I cunoască 'mintea' – adică să intre într-o relație reală cu El.",
    timestamp: new Date(now.getTime() + 21000)
  },

  // Întrebări pentru ascultător (user)
  {
    type: "question",
    from: "right",
    question: "Tu de ce crezi că ai fost creat?",
    options: [
      "Să am o viață liniștită",
      "Să am succes și să fiu fericit",
      "Să Îl cunosc pe Dumnezeu și planul Lui",
      "Nu știu încă răspunsul"
    ],
    showResults: true,
    results: [10, 20, 55, 15],
    correct: [2],
    timestamp: new Date(now.getTime() + 26000)
  },

  // Răspuns la întrebarea “de ce să mă rog dacă Dumnezeu e suveran?”
  {
    type: "info",
    from: "left",
    content: "Poate te-ai întrebat: 'Dacă Dumnezeu e suveran și oricum face ce vrea, mai are rost să Îl caut, să mă rog, să vreau să Îi cunosc voia?' Răspunsul biblic este acesta: Dumnezeu este suveran peste Cuvântul Său. El nu-și calcă promisiunile, dar alege să lucreze cu oamenii. Rugăciunea nu schimbă caracterul lui Dumnezeu, ci ne aliniază pe noi cu scopul Lui.",
    timestamp: new Date(now.getTime() + 31000)
  },

  // Exemplu de aplicare: Dumnezeu alege să colaboreze cu omul
  {
    type: "bible",
    from: "left",
    content: [
      "Ieremia 29:13 – 'Mă veți căuta și Mă veți găsi dacă Mă veți căuta cu toată inima.'",
      "Iacov 4:8 – 'Apropiați-vă de Dumnezeu și El Se va apropia de voi.'"
    ],
    timestamp: new Date(now.getTime() + 37000)
  },

  // Aplicație practică: pași clari
  {
    type: "info",
    from: "left",
    content: "Cum începi? 1. Roagă-te sincer: 'Doamne, nu vreau doar să aud despre Tine, vreau să Te cunosc. Arată-mi scopul meu.' 2. Citește Scriptura dorind să descoperi gândul lui Dumnezeu. 3. Pune întrebări reale. 4. Ascultă răspunsurile: uneori vin prin gânduri, alteori prin oameni sau circumstanțe. 5. Notează ce descoperi.",
    timestamp: new Date(now.getTime() + 43000)
  },

  // Challenge (provocare de decizie)
  {
    type: "question",
    from: "right",
    question: "Ești gata să-I ceri azi lui Dumnezeu să-ți arate scopul Lui pentru viața ta?",
    options: [
      "Da, vreau să încep această călătorie!",
      "Vreau să încerc, dar am nevoie de ajutor",
      "Nu sunt pregătit încă"
    ],
    showResults: true,
    results: [60, 30, 10],
    correct: [0],
    timestamp: new Date(now.getTime() + 48000)
  },

  // Încheiere motivațională
  {
    type: "info",
    from: "left",
    content: "Nu lăsa să treacă încă o zi fără să faci acest pas. Cunoașterea lui Dumnezeu nu e rezervată 'super-creștinilor', ci e pentru oricine Îl caută sincer. Ieremia 29:13 spune: 'Mă veți căuta și Mă veți găsi dacă Mă veți căuta cu toată inima.' Când Îl vei cunoaște pe Dumnezeu, vei descoperi sensul vieții tale. Azi poate fi ziua când începi adevărata călătorie.",
    timestamp: new Date(now.getTime() + 53000)
  }
);



