import type { Lesson } from "../domain.js"
import { SPIRITUAL_BLESTEM_PART_A } from "./spiritualBlesteme.js"

const l4: Lesson = {
  id: "spirit_blestem_l4", courseId: "spiritual_c3_blessings", order: 4,
  title: "Ce înseamnă o ușă deschisă?", estMinutes: 12,
  anchorRefs: ["Efeseni 4:25-32", "Romani 6:12-14", "Iacov 4:7"], memoryVerseRef: "Efeseni 4:27",
  steps: [
    { id: "sb4_1", type: "hook", order: 1, bubbles: [{ from: "guide", text: "«Ușă deschisă» este o imagine pastorală, nu un mecanism prin care orice greșeală introduce automat un demon. Scriptura avertizează totuși să nu oferim teren minciunii și păcatului persistent." }]},
    { id: "sb4_2", type: "scripture", order: 2, scripture: { text: "Să nu dați prilej diavolului.", ref: "Efeseni 4:27" } },
    { id: "sb4_3", type: "truth_simple", order: 3, bubbles: [{ from: "guide", text: "În context, Pavel vorbește despre minciună, mânie, furt și cuvinte stricate. Răspunsul este pocăință concretă și un mod nou de viață, nu vânătoarea unui ritual secret." }]},
    { id: "sb4_4", type: "choice", order: 4, choice: { prompt: "Unde este nevoie de un pas concret?", options: [
      { id: "sb4a", label: "Un păcat pe care îl ascund.", branchStepId: "sb4_b_hide" },
      { id: "sb4b", label: "Un acces sau context pe care îl păstrez.", branchStepId: "sb4_b_access" },
      { id: "sb4c", label: "Mă tem de o ușă pe care nu o pot identifica.", branchStepId: "sb4_b_fear" },
    ]}},
    { id: "sb4_b_hide", type: "how_god_helps", order: 90, bubbles: [{ from: "guide", text: "Ieși la lumină cu fapta reală și cere responsabilizare. Nu ai nevoie să inventezi o cauză spirituală mai spectaculoasă." }]},
    { id: "sb4_b_access", type: "how_god_helps", order: 91, bubbles: [{ from: "guide", text: "Închide accesul practic: contact, aplicație, bani, obiect sau loc. Rugăciunea și ascultarea merg împreună." }]},
    { id: "sb4_b_fear", type: "how_god_helps", order: 92, bubbles: [{ from: "guide", text: "Libertatea nu depinde de identificarea perfectă a unei uși ascunse. Adu ce știi și încrede-te în lumina lui Hristos." }]},
    { id: "sb4_5", type: "step", order: 5, bubbles: [{ from: "guide", text: "Numește fapta, mărturisește-o, îndepărtează accesul și pune în loc practica opusă din Efeseni 4." }]},
    { id: "sb4_6", type: "prayer", order: 6, bubbles: [{ from: "guide", text: "«Tată, aduc în lumină ___. Renunț la minciună și aleg ascultarea. Nu vreau să ofer teren celui rău.»" }]},
    { id: "sb4_7", type: "memory_verse", order: 7, scripture: { text: "Să nu dați prilej diavolului.", ref: "Efeseni 4:27" } },
  ],
}

const l5: Lesson = {
  id: "spirit_blestem_l5", courseId: "spiritual_c3_blessings", order: 5,
  title: "Legături relaționale și iertare", estMinutes: 13,
  anchorRefs: ["Efeseni 4:31-32", "Romani 12:17-21", "Matei 18:15-17"], memoryVerseRef: "Efeseni 4:32",
  steps: [
    { id: "sb5_1", type: "hook", order: 1, bubbles: [{ from: "guide", text: "Expresia «legătură sufletească» este folosită adesea pentru orice relație intensă. Biblia vorbește mai concret despre atașament, legământ, păcat, amărăciune și responsabilitate." }]},
    { id: "sb5_2", type: "truth_simple", order: 2, bubbles: [{ from: "guide", text: "Iertarea poate rupe stăpânirea răzbunării, dar nu șterge automat trauma și nu cere reluarea unei relații nesigure. Limitele și dreptatea rămân." }]},
    { id: "sb5_3", type: "choice", order: 3, choice: { prompt: "Ce te ține legat?", options: [
      { id: "sb5a", label: "Dorul și dependența de o relație toxică.", branchStepId: "sb5_b_toxic" },
      { id: "sb5b", label: "Amărăciunea pentru ce mi s-a făcut.", branchStepId: "sb5_b_bitter" },
      { id: "sb5c", label: "Rușinea pentru ce am făcut eu.", branchStepId: "sb5_b_shame" },
    ]}},
    { id: "sb5_b_toxic", type: "how_god_helps", order: 90, bubbles: [{ from: "guide", text: "Ruperea contactului poate fi necesară. Nu confunda dorul cu porunca de a reveni în pericol." }]},
    { id: "sb5_b_bitter", type: "how_god_helps", order: 91, bubbles: [{ from: "guide", text: "Poți renunța la răzbunare fără să minimalizezi răul și fără să renunți la dreptate." }]},
    { id: "sb5_b_shame", type: "how_god_helps", order: 92, bubbles: [{ from: "guide", text: "Mărturisește, repară unde este posibil și primește iertarea. Autopedepsirea nu plătește ce Hristos a purtat." }]},
    { id: "sb5_4", type: "step", order: 4, bubbles: [{ from: "guide", text: "Scrie separat: ce ierți, ce limită păstrezi, ce repari și ce ajutor îți trebuie. Nu le amesteca într-o singură declarație." }]},
    { id: "sb5_5", type: "prayer", order: 5, bubbles: [{ from: "guide", text: "«Iisuse, eliberează-mă de răzbunare, dependență și rușine. Dă-mi har să iert, curaj să păstrez limite și lumină să repar ce îmi aparține.»" }]},
    { id: "sb5_6", type: "memory_verse", order: 6, scripture: { text: "Iertați-vă unul pe altul, cum v-a iertat și Dumnezeu pe voi în Hristos.", ref: "Efeseni 4:32" } },
  ],
}

const l6: Lesson = {
  id: "spirit_blestem_l6", courseId: "spiritual_c3_blessings", order: 6,
  title: "Nu trăi căutând următorul blestem", estMinutes: 12,
  anchorRefs: ["Coloseni 2:13-15", "Galateni 3:13-14", "Romani 8:31-39"], memoryVerseRef: "Coloseni 2:15",
  steps: [
    { id: "sb6_1", type: "hook", order: 1, bubbles: [{ from: "guide", text: "Un sistem bazat pe frică găsește mereu încă un blestem, încă un nume și încă o sesiune. Evanghelia mută centrul de la misterul ascuns la lucrarea publică a crucii." }]},
    { id: "sb6_2", type: "scripture", order: 2, scripture: { text: "A dezbrăcat domniile și stăpânirile și le-a făcut de ocară înaintea lumii, după ce a ieșit biruitor asupra lor prin cruce.", ref: "Coloseni 2:15" } },
    { id: "sb6_3", type: "truth_simple", order: 3, bubbles: [{ from: "guide", text: "Pocăința este continuă, dar viața creștină nu este investigație nesfârșită a întunericului. Identitatea și siguranța stau în Hristos." }]},
    { id: "sb6_4", type: "quiz", order: 4, quiz: { question: "Care este centrul libertății?", options: [
      { text: "Să identifici fiecare cauză ascunsă", correct: false },
      { text: "Crucea, domnia lui Iisus și ascultarea de El", correct: true },
      { text: "Să repeți o formulă fără greșeală", correct: false },
    ], explanation: "Adevărul despre trecut contează, dar eliberarea nu este ținută captivă de memoria sau analiza perfectă a omului." }},
    { id: "sb6_5", type: "journal", order: 5, journalPrompt: "Ce teamă despre trecut ai tratat ca fiind mai puternică decât lucrarea lui Hristos? Ce adevăr îi răspunde?" },
    { id: "sb6_6", type: "prayer", order: 6, bubbles: [{ from: "guide", text: "«Iisuse, mă pocăiesc de ce cunosc și refuz frica fără sfârșit. Crucea Ta este centrul libertății mele. Învață-mă să trăiesc în lumină.»" }]},
    { id: "sb6_7", type: "memory_verse", order: 7, scripture: { text: "A ieșit biruitor asupra lor prin cruce.", ref: "Coloseni 2:15" } },
  ],
}

export const SPIRITUAL_BLESTEM_LESSONS: Lesson[] = [...SPIRITUAL_BLESTEM_PART_A, l4, l5, l6]
