import type { Lesson } from "../domain.js"
import { RUGACIUNE_INCEPUT_PART_A } from "./rugaciuneInceput.js"

export const rugInceputL4: Lesson = {
  id: "rug_inceput_l4", courseId: "lib_rug_inceput", order: 4,
  title: "Vie Împărăția Ta", estMinutes: 11,
  anchorRefs: ["Matei 6:10", "Luca 17:20-21", "Romani 14:17"], memoryVerseRef: "Matei 6:10",
  steps: [
    { id: "ri4_1", type: "hook", order: 1, bubbles: [
      { from: "guide", text: "De multe ori ne rugăm: «Doamne, ajută planul meu». Iisus ne învață o cerere mai mare: «Adu aici felul Tău de a conduce»." },
    ]},
    { id: "ri4_2", type: "scripture", order: 2, scripture: { text: "Vie Împărăția Ta.", ref: "Matei 6:10" } },
    { id: "ri4_3", type: "truth_simple", order: 3, bubbles: [
      { from: "guide", text: "Împărăția lui Dumnezeu este domnia Lui: adevărul Lui în locul minciunii, dreptatea în locul nedreptății, împăcarea în locul urii și libertatea în locul robiei." },
      { from: "guide", text: "Ea a venit prin Iisus, lucrează acum în cei care Îi aparțin și va fi văzută deplin când El va restaura toate lucrurile." },
    ]},
    { id: "ri4_4", type: "world_vs_truth", order: 4, bubbles: [
      { from: "guide", text: "«Vie Împărăția Ta» nu înseamnă «fă tabăra mea religioasă mai puternică». Împărăția nu este proprietatea unei denominațiuni, a unui partid sau a unei națiuni." },
      { from: "guide", text: "Cererea începe în mine: «Condu Tu locul în care eu vreau să controlez, să mă răzbun sau să mă ascund»." },
    ]},
    { id: "ri4_5", type: "scripture", order: 5, scripture: { text: "Căci Împărăția lui Dumnezeu nu este mâncare și băutură, ci neprihănire, pace și bucurie în Duhul Sfânt.", ref: "Romani 14:17" } },
    { id: "ri4_6", type: "choice", order: 6, choice: { prompt: "Unde ai nevoie să vină felul Lui de a conduce?", options: [
      { id: "ri4a", label: "În mine: gânduri, frică sau un obicei ascuns." },
      { id: "ri4b", label: "În casă: ceartă, răceală sau nedreptate." },
      { id: "ri4c", label: "În jur: muncă, comunitate sau o suferință." },
    ]}},
    { id: "ri4_7", type: "how_god_helps", order: 7, bubbles: [
      { from: "guide", text: "Nu te opri la «binecuvântează». Numește cum ar arăta domnia Lui acolo: adevăr spus cu dragoste, o limită sănătoasă, pâine pentru cineva, împăcare sau curajul de a cere ajutor." },
    ]},
    { id: "ri4_8", type: "step", order: 8, bubbles: [
      { from: "guide", text: "Completează: «Tată, vie Împărăția Ta în ___. Începe în mine prin ___. Arată-mi pasul pe care îl pot face astăzi»." },
    ]},
    { id: "ri4_9", type: "how_god_helps", order: 9, bubbles: [
      { from: "guide", text: "Limita cinstită: nu orice situație se schimbă imediat și nu orice victorie este spectaculoasă. Uneori venirea Împărăției se vede într-un adevăr spus, într-o masă împărțită sau într-un rău pe care refuzi să-l continui." },
    ]},
    { id: "ri4_10", type: "prayer", order: 10, bubbles: [
      { from: "guide", text: "«Tată, vie Împărăția Ta în mine și în locul pe care l-am numit. Condu Tu ce am încercat să controlez și fă-mă disponibil pentru binele pe care vrei să-l lucrezi.»" },
    ]},
    { id: "ri4_11", type: "memory_verse", order: 11, scripture: { text: "Vie Împărăția Ta.", ref: "Matei 6:10" } },
  ],
}

export const rugInceputL5: Lesson = {
  id: "rug_inceput_l5", courseId: "lib_rug_inceput", order: 5,
  title: "Facă-se voia Ta", estMinutes: 12,
  anchorRefs: ["Matei 6:10", "Matei 26:36-44", "Iacov 4:13-15"], memoryVerseRef: "Matei 6:10",
  steps: [
    { id: "ri5_1", type: "hook", order: 1, bubbles: [
      { from: "guide", text: "«Facă-se voia Ta» poate suna ca o renunțare fără voce. Dar în Ghetsimani, Iisus a spus clar ce dorea înainte să Se predea voii Tatălui." },
    ]},
    { id: "ri5_2", type: "scripture", order: 2, scripture: { text: "Tată, dacă este cu putință, depărtează de la Mine paharul acesta! Totuși nu cum voiesc Eu, ci cum voiești Tu.", ref: "Matei 26:39" } },
    { id: "ri5_3", type: "truth_simple", order: 3, bubbles: [
      { from: "guide", text: "Predarea biblică are ambele propoziții: «asta doresc» și «mă încred în Tine mai mult decât în perspectiva mea». Nu trebuie să ascunzi cererea pentru a părea supus." },
      { from: "guide", text: "Voia lui Dumnezeu nu este o ghicitoare pe care o descoperi prin panică. Începi cu ceea ce a descoperit deja în Scriptură: adevăr, dragoste, sfințenie, dreptate și înțelepciune." },
    ]},
    { id: "ri5_4", type: "world_vs_truth", order: 4, bubbles: [
      { from: "guide", text: "Predarea nu este pasivitate. «Facă-se voia Ta» nu înseamnă să rămâi în abuz, să refuzi medicul, să nu raportezi o infracțiune sau să numești orice tragedie dorința lui Dumnezeu." },
      { from: "guide", text: "Poți să te încrezi în Dumnezeu și simultan să acționezi: să pui o limită, să suni poliția, să urmezi tratamentul ori să ceri sfat matur." },
    ]},
    { id: "ri5_5", type: "choice", order: 5, choice: { prompt: "Unde îți este cel mai greu să lași controlul?", options: [
      { id: "ri5a", label: "Într-un rezultat pe care îl doresc mult." },
      { id: "ri5b", label: "În viitor, bani sau sănătate." },
      { id: "ri5c", label: "În viața cuiva pe care încerc să-l schimb." },
    ]}},
    { id: "ri5_6", type: "how_god_helps", order: 6, bubbles: [
      { from: "guide", text: "Spune întâi cererea fără ocol: «Tată, eu vreau...». Apoi predarea: «Totuși, nu văd tot ce vezi Tu. Nu vreau să păcătuiesc ca să obțin acest lucru»." },
      { from: "guide", text: "Încheie cu disponibilitate: «Arată-mi ascultarea de astăzi». Voia Lui pentru următorul pas este adesea mai clară decât harta întregului viitor." },
    ]},
    { id: "ri5_7", type: "quiz", order: 7, quiz: { question: "Ce înseamnă predarea voii?", options: [
      { text: "Să nu mai spui ce dorești", correct: false },
      { text: "Să numești dorința, dar să nu o transformi în stăpân", correct: true },
      { text: "Să accepți orice rău fără să cauți ajutor", correct: false },
    ], explanation: "Iisus Și-a spus dorința și apoi S-a încredințat Tatălui. Predarea nu anulează adevărul, discernământul sau acțiunea responsabilă." }},
    { id: "ri5_8", type: "step", order: 8, bubbles: [
      { from: "guide", text: "Roagă-te în trei fraze: «Eu doresc ___. Mă tem că ___. Totuși aleg să nu ies din adevărul Tău pentru a controla rezultatul»." },
    ]},
    { id: "ri5_9", type: "how_god_helps", order: 9, bubbles: [
      { from: "guide", text: "Limita cinstită: nu putem explica prin această propoziție de ce Dumnezeu permite fiecare suferință. Nu o folosim ca răspuns rapid pentru omul aflat în doliu sau durere." },
    ]},
    { id: "ri5_10", type: "prayer", order: 10, bubbles: [
      { from: "guide", text: "«Tată, Ți-am spus ce doresc. Păzește-mă să nu mă pierd încercând să controlez rezultatul. Facă-se voia Ta în mine, precum în cer.»" },
    ]},
    { id: "ri5_11", type: "memory_verse", order: 11, scripture: { text: "Facă-se voia Ta, precum în cer și pe pământ.", ref: "Matei 6:10" } },
  ],
}

export const rugInceputL6: Lesson = {
  id: "rug_inceput_l6", courseId: "lib_rug_inceput", order: 6,
  title: "Pâinea noastră de astăzi", estMinutes: 11,
  anchorRefs: ["Matei 6:11", "Exodul 16:13-21", "Filipeni 4:6"], memoryVerseRef: "Matei 6:11",
  steps: [
    { id: "ri6_1", type: "hook", order: 1, bubbles: [
      { from: "guide", text: "Iisus pune mâncarea în rugăciunea-model. Facturile, munca, sănătatea și masa de astăzi nu sunt prea obișnuite pentru Tatăl." },
    ]},
    { id: "ri6_2", type: "scripture", order: 2, scripture: { text: "Pâinea noastră cea de toate zilele dă-ne-o nouă astăzi.", ref: "Matei 6:11" } },
    { id: "ri6_3", type: "truth_simple", order: 3, bubbles: [
      { from: "guide", text: "Pâinea este nevoia reală: hrană, adăpost, lucru, putere, înțelepciune și ajutor. «Astăzi» ne mută din iluzia controlului asupra întregului viitor în dependența zilei prezente." },
      { from: "guide", text: "«Noastră» lărgește cererea: nu cer doar pentru masa mea, ci devin atent la omul a cărui pâine poate trece astăzi prin mâna mea." },
    ]},
    { id: "ri6_4", type: "world_vs_truth", order: 4, bubbles: [
      { from: "guide", text: "Credința nu înseamnă să ceri succes fără efort. Te rogi pentru lucru și apoi lucrezi cinstit; ceri pâine și înveți să administrezi; ceri ajutor și răspunzi când ajutorul vine prin oameni." },
      { from: "guide", text: "Nici lipsa nu dovedește automat lipsa credinței. Sărăcia nu este verdict spiritual, iar omul în nevoie nu trebuie rușinat." },
    ]},
    { id: "ri6_5", type: "choice", order: 5, choice: { prompt: "Care este pâinea ta pentru ziua aceasta?", options: [
      { id: "ri6a", label: "O nevoie materială sau legată de muncă." },
      { id: "ri6b", label: "Putere, sănătate ori odihnă pentru azi." },
      { id: "ri6c", label: "Înțelepciune sau ajutorul unui om." },
    ]}},
    { id: "ri6_6", type: "how_god_helps", order: 6, bubbles: [
      { from: "guide", text: "Cere concret, fără formule: suma, conversația, puterea pentru o sarcină sau masa de care ai nevoie. Apoi întreabă: «Ce pas responsabil pot face astăzi?»" },
    ]},
    { id: "ri6_7", type: "step", order: 7, bubbles: [
      { from: "guide", text: "Roagă-te pentru zi și lucru: «Îți mulțumesc pentru dimineața aceasta. Dă-mi minte limpede, mâini cinstite și puterea necesară. Păzește-mă de scurtături și arată-mi cui pot face bine prin munca mea»." },
    ]},
    { id: "ri6_8", type: "step", order: 8, bubbles: [
      { from: "guide", text: "La masă, nu recita în grabă. Numește darul: «Îți mulțumesc pentru hrana aceasta și pentru mâinile prin care a ajuns la noi. Fă-ne atenți la cei care nu au»." },
    ]},
    { id: "ri6_9", type: "how_god_helps", order: 9, bubbles: [
      { from: "guide", text: "Limita cinstită: această cerere nu garantează prosperitate sau lipsa necazurilor. Uneori răspunsul vine prin muncă, comunitate și ajutor specializat; cererea nu le înlocuiește." },
    ]},
    { id: "ri6_10", type: "prayer", order: 10, bubbles: [
      { from: "guide", text: "«Tată, pâinea mea pentru astăzi este ___. Îți cer ajutorul și îți ofer pasul pe care îl pot face. Arată-mi și pâinea altuia pe care ai pus-o în mâna mea.»" },
    ]},
    { id: "ri6_11", type: "memory_verse", order: 11, scripture: { text: "Pâinea noastră cea de toate zilele dă-ne-o nouă astăzi.", ref: "Matei 6:11" } },
  ],
}

export const RUGACIUNE_INCEPUT_PART_B: Lesson[] = [
  ...RUGACIUNE_INCEPUT_PART_A,
  rugInceputL4, rugInceputL5, rugInceputL6,
]
