import type { Lesson } from "../domain.js"

export const blestemL1: Lesson = {
  id: "spirit_blestem_l1", courseId: "spiritual_c3_blessings", order: 1,
  title: "Ce este un blestem în Biblie?", estMinutes: 12,
  anchorRefs: ["Deuteronomul 28", "Proverbele 26:2", "Galateni 3:13"], memoryVerseRef: "Galateni 3:13",
  steps: [
    { id: "sb1_1", type: "hook", order: 1, bubbles: [{ from: "guide", text: "Nu orice serie de necazuri este dovada unui blestem. În Biblie, blestemul apare în cadrul legământului, al judecății și al cuvintelor rostite; nu este o explicație automată pentru tot ce merge rău." }]},
    { id: "sb1_2", type: "scripture", order: 2, scripture: { text: "Cum sare vrabia încoace și încolo și cum zboară rândunica, așa nu nimerește blestemul neîntemeiat.", ref: "Proverbele 26:2" } },
    { id: "sb1_3", type: "truth_simple", order: 3, bubbles: [{ from: "guide", text: "Cuvintele pot răni și păcatul are consecințe, dar nu fiecare insultă primește putere magică. Credinciosul nu trăiește căutând permanent o formulă ascunsă care îi controlează viața." }]},
    { id: "sb1_4", type: "choice", order: 4, choice: { prompt: "De ce te temi?", options: [
      { id: "sb1a", label: "Cineva a rostit ceva rău asupra mea.", branchStepId: "sb1_b_words" },
      { id: "sb1b", label: "Necazurile repetate par un tipar.", branchStepId: "sb1_b_pattern" },
      { id: "sb1c", label: "Mi s-a spus că am un blestem ascuns.", branchStepId: "sb1_b_told" },
    ]}},
    { id: "sb1_b_words", type: "how_god_helps", order: 90, bubbles: [{ from: "guide", text: "Nu primi cuvântul omului ca verdict mai mare decât Evanghelia. Poți respinge minciuna fără un ritual de panică." }]},
    { id: "sb1_b_pattern", type: "how_god_helps", order: 91, bubbles: [{ from: "guide", text: "Un tipar cere cercetare: alegeri, mediu, traumă, nedreptate, boală și dimensiune spirituală. Repetiția singură nu pune diagnosticul." }]},
    { id: "sb1_b_told", type: "how_god_helps", order: 92, bubbles: [{ from: "guide", text: "Emanus nu confirmă diagnostice spirituale prin ecran. Cere temeiul biblic și implică oameni maturi care te cunosc." }]},
    { id: "sb1_5", type: "scripture", order: 5, scripture: { text: "Hristos ne-a răscumpărat din blestemul Legii, făcându-Se blestem pentru noi.", ref: "Galateni 3:13" } },
    { id: "sb1_6", type: "prayer", order: 6, bubbles: [{ from: "guide", text: "«Iisuse, îmi așez siguranța în lucrarea Ta, nu în frica unor cuvinte ascunse. Condu-mă în adevăr și pocăință, nu în superstiție.»" }]},
    { id: "sb1_7", type: "memory_verse", order: 7, scripture: { text: "Hristos ne-a răscumpărat din blestemul Legii.", ref: "Galateni 3:13" } },
  ],
}

export const blestemL2: Lesson = {
  id: "spirit_blestem_l2", courseId: "spiritual_c3_blessings", order: 2,
  title: "Ce se transmite între generații?", estMinutes: 13,
  anchorRefs: ["Exodul 20:5-6", "Ezechiel 18:19-20", "1 Petru 1:18-19"], memoryVerseRef: "Ezechiel 18:20",
  steps: [
    { id: "sb2_1", type: "hook", order: 1, bubbles: [{ from: "guide", text: "Familiile transmit consecințe, răni, obiceiuri, credințe și modele de relaționare. Dar Biblia nu spune că un copil poartă automat vina morală a strămoșului." }]},
    { id: "sb2_2", type: "scripture", order: 2, scripture: { text: "Fiul nu va purta nelegiuirea tatălui său, și tatăl nu va purta nelegiuirea fiului său.", ref: "Ezechiel 18:20" } },
    { id: "sb2_3", type: "truth_simple", order: 3, bubbles: [{ from: "guide", text: "Consecința poate traversa generații fără ca vina să se moștenească identic. În Hristos, trecutul familiei poate fi numit și întrerupt; nu devine identitatea sau sentința ta." }]},
    { id: "sb2_4", type: "choice", order: 4, choice: { prompt: "Ce tipar recunoști?", options: [
      { id: "sb2a", label: "Dependență, violență sau abandon.", branchStepId: "sb2_b_harm" },
      { id: "sb2b", label: "Frică, rușine sau control.", branchStepId: "sb2_b_inner" },
      { id: "sb2c", label: "Practici spirituale străine de Hristos.", branchStepId: "sb2_b_occult" },
    ]}},
    { id: "sb2_b_harm", type: "how_god_helps", order: 90, bubbles: [{ from: "guide", text: "Ruperea tiparului cere siguranță, limite, adevăr, vindecare și uneori intervenție legală sau tratament — nu doar o declarație." }]},
    { id: "sb2_b_inner", type: "how_god_helps", order: 91, bubbles: [{ from: "guide", text: "Aceste tipare se pot învăța profund. Rugăciunea și terapia competentă pot lucra împreună fără competiție." }]},
    { id: "sb2_b_occult", type: "how_god_helps", order: 92, bubbles: [{ from: "guide", text: "Poți renunța la practica pe care ai cunoscut-o fără să inventezi o listă de păcate ale strămoșilor pe care nu le cunoști." }]},
    { id: "sb2_5", type: "step", order: 5, bubbles: [{ from: "guide", text: "Scrie: «ce am primit», «ce aleg să nu continui» și «ce practică nouă pun în loc». Nu te acuza pentru originea ta; asumă următorul pas." }]},
    { id: "sb2_6", type: "prayer", order: 6, bubbles: [{ from: "guide", text: "«Tată, Îți aduc istoria familiei mele. Vindecă ce m-a rănit, iartă ce am continuat eu și învață-mă un drum nou în Hristos.»" }]},
    { id: "sb2_7", type: "memory_verse", order: 7, scripture: { text: "Fiul nu va purta nelegiuirea tatălui său.", ref: "Ezechiel 18:20" } },
  ],
}

export const blestemL3: Lesson = {
  id: "spirit_blestem_l3", courseId: "spiritual_c3_blessings", order: 3,
  title: "Practici oculte și renunțare", estMinutes: 14,
  anchorRefs: ["Deuteronomul 18:9-14", "Faptele 19:18-20", "Coloseni 1:13-14"], memoryVerseRef: "Coloseni 1:13",
  steps: [
    { id: "sb3_1", type: "hook", order: 1, bubbles: [{ from: "guide", text: "Astrologia, divinația, chemarea spiritelor și magia promit cunoaștere sau control fără încredere în Dumnezeu. Biblia nu le tratează ca jocuri neutre." }]},
    { id: "sb3_2", type: "scripture", order: 2, scripture: { text: "El ne-a izbăvit de sub puterea întunericului și ne-a strămutat în Împărăția Fiului dragostei Lui.", ref: "Coloseni 1:13" } },
    { id: "sb3_3", type: "truth_simple", order: 3, bubbles: [{ from: "guide", text: "Renunțarea înseamnă să numești practica reală, să te întorci de la ea și să alegi domnia lui Iisus. Nu este magie inversă și nu cere să inventezi contacte pe care nu le-ai avut." }]},
    { id: "sb3_4", type: "choice", order: 4, choice: { prompt: "Unde te afli?", options: [
      { id: "sb3a", label: "Am practicat conștient ceva ocult.", branchStepId: "sb3_b_known" },
      { id: "sb3b", label: "Am participat fără să înțeleg.", branchStepId: "sb3_b_unknown" },
      { id: "sb3c", label: "Mă tem de un obiect sau loc.", branchStepId: "sb3_b_object" },
    ]}},
    { id: "sb3_b_known", type: "how_god_helps", order: 90, bubbles: [{ from: "guide", text: "Mărturisește practica pe nume, renunță la ea și închide accesul concret. Nu ai nevoie de limbaj spectaculos." }]},
    { id: "sb3_b_unknown", type: "how_god_helps", order: 91, bubbles: [{ from: "guide", text: "Poți aduce înaintea lui Dumnezeu ceea ce știi acum. Eliberarea nu depinde de memoria perfectă a fiecărui detaliu." }]},
    { id: "sb3_b_object", type: "how_god_helps", order: 92, bubbles: [{ from: "guide", text: "Un obiect nu este mai puternic decât Hristos. Îndepărtarea lui poate exprima ruperea de practică, dar nu este ritual care Îl obligă pe Dumnezeu." }]},
    { id: "sb3_5", type: "step", order: 5, bubbles: [{ from: "guide", text: "Numește doar practicile reale. Oprește-le, îndepărtează accesul și spune unui credincios matur care poate rămâne lângă tine fără panică." }]},
    { id: "sb3_6", type: "prayer", order: 6, bubbles: [{ from: "guide", text: "«Doamne Iisuse, renunț la ___. Aleg să Îți aparțin și să caut adevărul și ajutorul numai sub domnia Ta. Închide ce am deschis și învață-mă ascultarea.»" }]},
    { id: "sb3_7", type: "memory_verse", order: 7, scripture: { text: "El ne-a izbăvit de sub puterea întunericului.", ref: "Coloseni 1:13" } },
  ],
}

export const SPIRITUAL_BLESTEM_PART_A: Lesson[] = [blestemL1, blestemL2, blestemL3]
