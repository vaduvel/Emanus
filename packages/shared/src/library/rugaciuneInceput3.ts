import type { Lesson } from "../domain.js"
import { RUGACIUNE_INCEPUT_PART_B } from "./rugaciuneInceput2.js"

export const rugInceputL7: Lesson = {
  id: "rug_inceput_l7", courseId: "lib_rug_inceput", order: 7,
  title: "Ne iartă precum și noi iertăm", estMinutes: 13,
  anchorRefs: ["Matei 6:12-15", "1 Ioan 1:9", "Efeseni 4:31-32"], memoryVerseRef: "1 Ioan 1:9",
  steps: [
    { id: "ri7_1", type: "hook", order: 1, bubbles: [
      { from: "guide", text: "Rugăciunea lui Iisus ne scoate din două ascunzători: răul pe care l-am făcut și răul pe care îl ținem împotriva altuia." },
    ]},
    { id: "ri7_2", type: "scripture", order: 2, scripture: { text: "Și ne iartă nouă greșelile noastre, precum și noi iertăm greșiților noștri.", ref: "Matei 6:12" } },
    { id: "ri7_3", type: "truth_simple", order: 3, bubbles: [
      { from: "guide", text: "Mărturisirea nu înseamnă «sunt un gunoi», ci «am făcut acest lucru și îl aduc în lumină». Numești fapta fără să o scuzi și fără să-ți transformi greșeala în identitate." },
      { from: "guide", text: "Nu cumpărăm iertarea lui Dumnezeu iertând perfect. Harul primit începe însă să slăbească dreptul pe care credem că îl avem de a trăi din răzbunare." },
    ]},
    { id: "ri7_4", type: "scripture", order: 4, scripture: { text: "Dacă ne mărturisim păcatele, El este credincios și drept ca să ne ierte păcatele și să ne curățească de orice nelegiuire.", ref: "1 Ioan 1:9" } },
    { id: "ri7_5", type: "world_vs_truth", order: 5, bubbles: [
      { from: "guide", text: "Iertarea nu este negarea răului. Nu înseamnă împăcare automată, încredere restaurată instantaneu sau întoarcere într-un loc periculos." },
      { from: "guide", text: "Poți ierta și păstra limita. Poți ierta și raporta infracțiunea. Împăcarea cere adevăr, pocăință și siguranță din partea ambelor persoane." },
    ]},
    { id: "ri7_6", type: "choice", order: 6, choice: { prompt: "Care parte are nevoie de adevăr astăzi?", options: [
      { id: "ri7a", label: "Trebuie să mărturisesc ceva concret." },
      { id: "ri7b", label: "Port răzbunare împotriva cuiva." },
      { id: "ri7c", label: "Sunt presat să mă întorc într-un loc nesigur." },
    ]}},
    { id: "ri7_7", type: "how_god_helps", order: 7, bubbles: [
      { from: "guide", text: "Dacă ai greșit, numește fapta și următorul pas de reparare. Dacă ai fost rănit, poți spune: «Nu numesc mic răul, dar renunț să fac din răzbunare stăpânul meu»." },
      { from: "guide", text: "Dacă ești în pericol, prima ascultare poate fi ieșirea, limita și cererea de ajutor. Nimeni nu trebuie să folosească iertarea pentru a te trimite înapoi la abuz." },
    ]},
    { id: "ri7_8", type: "quiz", order: 8, quiz: { question: "Ce NU cere iertarea?", options: [
      { text: "Să renunți la răzbunare", correct: false },
      { text: "Să numești răul rău", correct: false },
      { text: "Să refaci imediat încrederea și să revii în pericol", correct: true },
    ], explanation: "Iertarea, împăcarea și încrederea sunt lucruri diferite. Siguranța și dreptatea nu sunt dușmanii iertării." }},
    { id: "ri7_9", type: "step", order: 9, bubbles: [
      { from: "guide", text: "Roagă două propoziții: «Iartă-mă pentru ___ și arată-mi cum repar». Apoi: «Aduc înaintea Ta ce mi-a făcut ___. Refuz să trăiesc condus de răzbunare»." },
    ]},
    { id: "ri7_10", type: "how_god_helps", order: 10, bubbles: [
      { from: "guide", text: "Limita cinstită: iertarea poate fi un proces lung. Faptul că durerea revine nu dovedește că ai eșuat." },
    ]},
    { id: "ri7_11", type: "prayer", order: 11, bubbles: [
      { from: "guide", text: "«Tată, aduc în lumină păcatul meu și rana mea. Iartă-mă, curăță-mă și învață-mă să ofer har fără să numesc răul bine.»" },
    ]},
    { id: "ri7_12", type: "memory_verse", order: 12, scripture: { text: "Dacă ne mărturisim păcatele, El este credincios și drept ca să ne ierte.", ref: "1 Ioan 1:9" } },
  ],
}

export const rugInceputL8: Lesson = {
  id: "rug_inceput_l8", courseId: "lib_rug_inceput", order: 8,
  title: "Nu ne lăsa în ispită", estMinutes: 12,
  anchorRefs: ["Matei 6:13", "Iacov 1:13-16", "1 Corinteni 10:12-13"], memoryVerseRef: "Matei 26:41",
  steps: [
    { id: "ri8_1", type: "hook", order: 1, bubbles: [
      { from: "guide", text: "Iisus ne învață să cerem ajutor înainte să cădem, nu doar iertare după. Este rugăciunea omului care și-a recunoscut slăbiciunea." },
    ]},
    { id: "ri8_2", type: "scripture", order: 2, scripture: { text: "Și nu ne duce în ispită, ci izbăvește-ne de cel rău.", ref: "Matei 6:13" } },
    { id: "ri8_3", type: "truth_simple", order: 3, bubbles: [
      { from: "guide", text: "Dumnezeu nu ispitește pe nimeni la rău. Cerem să nu fim lăsați pradă încercării, să fim păziți și să vedem ieșirea înainte ca dorința să ne tragă." },
      { from: "guide", text: "Ispita poate lucra prin firea noastră, presiunea lumii și minciuna celui rău. Nu orice impuls este demon, dar nici nu ignorăm realitatea luptei spirituale." },
    ]},
    { id: "ri8_4", type: "scripture", order: 4, scripture: { text: "Vegheați și rugați-vă, ca să nu cădeți în ispită; duhul, în adevăr, este plin de râvnă, dar carnea este neputincioasă.", ref: "Matei 26:41" } },
    { id: "ri8_5", type: "world_vs_truth", order: 5, bubbles: [
      { from: "guide", text: "Rugăciunea nu înlocuiește ieșirea practică. Dacă ceri protecție, dar păstrezi accesul sau contextul care te trage, ignori o parte din răspuns." },
      { from: "guide", text: "Nici căderea nu dovedește automat că un demon te-a controlat. Responsabilitatea, pocăința, sprijinul și uneori tratamentul rămân necesare." },
    ]},
    { id: "ri8_6", type: "choice", order: 6, choice: { prompt: "Unde trebuie să te rogi înainte, nu doar după?", options: [
      { id: "ri8a", label: "Un obicei, consum sau acces secret." },
      { id: "ri8b", label: "Furie, minciună sau o relație periculoasă." },
      { id: "ri8c", label: "O teamă ori acuzație care revine." },
    ]}},
    { id: "ri8_7", type: "how_god_helps", order: 7, bubbles: [
      { from: "guide", text: "Numește ispita, minciuna din spatele ei și o ieșire. De exemplu: «Când mă simt singur, cred că acest lucru mă va liniști. Astăzi blochez accesul și sun omul care știe lupta mea»." },
    ]},
    { id: "ri8_8", type: "step", order: 8, bubbles: [
      { from: "guide", text: "Completează: «Tată, păzește-mă când ___. Minciuna este ___. Adevărul Tău este ___. Ieșirea mea concretă este ___.»" },
    ]},
    { id: "ri8_9", type: "how_god_helps", order: 9, bubbles: [
      { from: "guide", text: "Dacă lupta implică dependență, auto-vătămare, violență sau pierderea controlului, implică imediat un om sigur și ajutor specializat." },
    ]},
    { id: "ri8_10", type: "prayer", order: 10, bubbles: [
      { from: "guide", text: "«Tată, fă-mă atent, arată-mi ieșirea și dă-mi smerenia să fug și să cer ajutor înainte să ascund.»" },
    ]},
    { id: "ri8_11", type: "memory_verse", order: 11, scripture: { text: "Vegheați și rugați-vă, ca să nu cădeți în ispită.", ref: "Matei 26:41" } },
  ],
}

export const rugInceputL9: Lesson = {
  id: "rug_inceput_l9", courseId: "lib_rug_inceput", order: 9,
  title: "Izbăvește-ne de cel rău", estMinutes: 15,
  anchorRefs: ["Matei 6:13", "Efeseni 6:10-18", "Iacov 4:7"], memoryVerseRef: "Iacov 4:7",
  steps: [
    { id: "ri9_1", type: "hook", order: 1, bubbles: [
      { from: "guide", text: "Rugăciunea Domnului se încheie recunoscând că răul este real și că nu ne putem păzi singuri. Dar nu se termină în frică, ci în dependență de Tatăl." },
    ]},
    { id: "ri9_2", type: "scripture", order: 2, scripture: { text: "Și nu ne duce în ispită, ci izbăvește-ne de cel rău.", ref: "Matei 6:13" } },
    { id: "ri9_3", type: "truth_simple", order: 3, bubbles: [
      { from: "guide", text: "Cel rău nu este egalul lui Dumnezeu. Satan și demonii sunt creaturi limitate, iar Iisus are autoritate asupra lor." },
      { from: "guide", text: "Cerem protecție pentru minte, trup, casă, relații și credință. Ne împotrivim minciunii, fără să diagnosticăm automat fiecare boală, coșmar sau gând ca demon." },
    ]},
    { id: "ri9_4", type: "scripture", order: 4, scripture: { text: "Supuneți-vă, dar, lui Dumnezeu. Împotriviți-vă diavolului, și el va fugi de la voi.", ref: "Iacov 4:7" }, bubbles: [
      { from: "guide", text: "Ordinea contează: întâi supunere lui Dumnezeu, apoi împotrivire. Autoritatea nu vine din volum sau formule, ci din apartenența la Iisus." },
    ]},
    { id: "ri9_5", type: "world_vs_truth", order: 5, bubbles: [
      { from: "guide", text: "Emanus nu se prezintă drept Duhul Sfânt și nu poate declara că cineva are un demon. Pentru manifestări severe este nevoie de oameni maturi și, când există simptome medicale sau psihice, de specialiști." },
      { from: "guide", text: "Rugăciunea și ajutorul medical nu sunt dușmani. Nu opri tratamentul și nu te izola pentru a dovedi credința." },
    ]},
    { id: "ri9_6", type: "choice", order: 6, choice: { prompt: "Pentru ce ceri protecția lui Dumnezeu?", options: [
      { id: "ri9a", label: "Mintea mea și minciunile care mă acuză." },
      { id: "ri9b", label: "Casa, familia și relațiile mele." },
      { id: "ri9c", label: "O luptă pentru care am nevoie și de oameni maturi." },
    ]}},
    { id: "ri9_7", type: "how_god_helps", order: 7, bubbles: [
      { from: "guide", text: "Poți spune ferm: «Iisus este Domn. Aleg adevărul Lui și refuz minciuna care spune ___. Tată, păzește-mă și condu-mă spre ajutorul potrivit»." },
    ]},
    { id: "ri9_8", type: "truth_simple", order: 8, bubbles: [
      { from: "guide", text: "Acest curs aparține Timpului de rugăciune: momentul așezat al zilei în care rămâi înaintea lui Dumnezeu și folosești «Tatăl nostru» ca schelet pentru o conversație adâncă." },
      { from: "guide", text: "Nu transformăm acest tipar în rugăciunea pentru fiecare context. Dimineața, masa, munca, familia, călătoria, vindecarea și celelalte nevoi vor avea rugăciuni distincte." },
    ]},
    { id: "ri9_9", type: "step", order: 9, bubbles: [
      { from: "guide", text: "Pentru Timpul de rugăciune, așază-te fără grabă. Parcurge cu propriile cuvinte: Tatăl; Numele; Împărăția; voia; pâinea și nevoile; iertarea; ispita și izbăvirea de rău." },
    ]},
    { id: "ri9_10", type: "step", order: 10, bubbles: [
      { from: "guide", text: "Nu trebuie să acorzi zilnic același timp fiecărei părți. Tiparul îți păzește direcția, dar conversația rămâne vie: uneori vei rămâne mai mult în mulțumire, alteori în mărturisire, cerere sau tăcere." },
    ]},
    { id: "ri9_11", type: "how_god_helps", order: 11, bubbles: [
      { from: "guide", text: "Pe lângă Timpul de rugăciune, aplicația va avea rugăciuni distincte pentru momente și nevoi: dimineață, seară, masă, muncă, familie, călătorie, cereri, întărire, vindecare, protecție și mijlocire." },
      { from: "guide", text: "Limita cinstită: rugăciunea nu garantează răspunsul, momentul sau senzația dorită. Tăcerea nu dovedește automat o tehnică greșită, credință slabă ori pedeapsă." },
    ]},
    { id: "ri9_12", type: "journal", order: 12, journalPrompt: "Scrie rugăciunea Timpului tău de rugăciune folosind cele șapte mișcări, fără să copiezi formulările lecției. La care parte ai rămas cel mai mult?" },
    { id: "ri9_13", type: "prayer", order: 13, bubbles: [
      { from: "guide", text: "Acum Emanus se oprește. Rămâi tu cu Dumnezeu și roagă-te în cuvintele tale. Aplicația nu te evaluează." },
    ]},
    { id: "ri9_14", type: "memory_verse", order: 14, scripture: { text: "Supuneți-vă lui Dumnezeu. Împotriviți-vă diavolului, și el va fugi de la voi.", ref: "Iacov 4:7" } },
  ],
}

export const RUGACIUNE_INCEPUT_LESSONS: Lesson[] = [
  ...RUGACIUNE_INCEPUT_PART_B,
  rugInceputL7, rugInceputL8, rugInceputL9,
]
