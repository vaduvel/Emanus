import type { Lesson } from "../domain.js"

export const discernL1: Lesson = {
  id: "spirit_discern_l1", courseId: "spiritual_c2_discernamant", order: 1,
  title: "Firea, lumea și diavolul", estMinutes: 12,
  anchorRefs: ["Iacov 1:13-15", "Efeseni 2:1-3", "1 Petru 5:8-9"], memoryVerseRef: "Iacov 1:14",
  steps: [
    { id: "sd1_1", type: "hook", order: 1, bubbles: [{ from: "guide", text: "Dacă numim orice luptă «demon», pierdem responsabilitatea. Dacă numim totul «doar psihologie», ignorăm un adversar real. Biblia descrie trei fronturi: firea, lumea și diavolul." }]},
    { id: "sd1_2", type: "scripture", order: 2, scripture: { text: "Ci fiecare este ispitit, când este atras de pofta lui însuși și momit.", ref: "Iacov 1:14" } },
    { id: "sd1_3", type: "truth_simple", order: 3, bubbles: [
      { from: "guide", text: "Firea este dorința dezordonată din noi. Lumea este sistemul de valori care normalizează răul. Diavolul minte, ispitește și acuză. Ele se pot suprapune, dar nu sunt același lucru." },
      { from: "guide", text: "Discernământul nu caută o scuză, ci adevărul necesar pentru răspunsul potrivit: pocăință, limită, împotrivire, tratament sau ajutor." },
    ]},
    { id: "sd1_4", type: "choice", order: 4, choice: { prompt: "Ce explicație folosești cel mai repede?", options: [
      { id: "sd1a", label: "«M-a făcut diavolul.»", branchStepId: "sd1_b_devil" },
      { id: "sd1b", label: "«Așa sunt eu și nu mă pot schimba.»", branchStepId: "sd1_b_flesh" },
      { id: "sd1c", label: "«Toți fac asta, deci e normal.»", branchStepId: "sd1_b_world" },
    ]}},
    { id: "sd1_b_devil", type: "how_god_helps", order: 90, bubbles: [{ from: "guide", text: "Influența spirituală nu șterge alegerea. Împotrivirea începe și prin asumare: ce ai ales, ce trebuie mărturisit și ce acces trebuie închis?" }]},
    { id: "sd1_b_flesh", type: "how_god_helps", order: 91, bubbles: [{ from: "guide", text: "Firea nu este identitatea ta finală. În Hristos poți numi dorința fără să-i dai dreptul de a-ți defini viitorul." }]},
    { id: "sd1_b_world", type: "how_god_helps", order: 92, bubbles: [{ from: "guide", text: "Normalizarea nu transformă răul în bine. Întreabă ce iubește și produce obiceiul, nu câți oameni îl practică." }]},
    { id: "sd1_5", type: "quiz", order: 5, quiz: { question: "De ce contează diferențierea celor trei fronturi?", options: [
      { text: "Ca să găsim un vinovat exterior", correct: false },
      { text: "Ca să răspundem adevărat și responsabil", correct: true },
      { text: "Ca să demonstrăm că orice problemă este spirituală", correct: false },
    ], explanation: "Un răspuns potrivit cere un diagnostic smerit: uneori pocăință, alteori împotrivire, limite, îngrijire sau mai multe împreună." }},
    { id: "sd1_6", type: "step", order: 6, bubbles: [{ from: "guide", text: "Pentru o luptă concretă, scrie trei întrebări: «Ce doresc eu? Ce îmi spune mediul? Ce minciună despre Dumnezeu sau mine este repetată?»" }]},
    { id: "sd1_7", type: "prayer", order: 7, bubbles: [{ from: "guide", text: "«Tată, dă-mi adevăr fără scuze și discernământ fără panică. Arată-mi unde trebuie să mă pocăiesc, să mă împotrivesc și să cer ajutor.»" }]},
    { id: "sd1_8", type: "memory_verse", order: 8, scripture: { text: "Fiecare este ispitit, când este atras de pofta lui însuși.", ref: "Iacov 1:14" } },
  ],
}

export const discernL2: Lesson = {
  id: "spirit_discern_l2", courseId: "spiritual_c2_discernamant", order: 2,
  title: "Ispită, acuzație sau convingere?", estMinutes: 12,
  anchorRefs: ["Ioan 16:8", "Romani 8:1", "Apocalipsa 12:10-11"], memoryVerseRef: "Romani 8:1",
  steps: [
    { id: "sd2_1", type: "hook", order: 1, bubbles: [{ from: "guide", text: "Două voci pot spune că ai greșit, dar te duc în direcții opuse. Acuzația spune «ascunde-te, tu ești fără speranță». Convingerea Duhului spune adevărul și deschide drumul pocăinței." }]},
    { id: "sd2_2", type: "scripture", order: 2, scripture: { text: "Acum, dar, nu este nicio osândire pentru cei ce sunt în Hristos Iisus.", ref: "Romani 8:1" } },
    { id: "sd2_3", type: "truth_simple", order: 3, bubbles: [
      { from: "guide", text: "Ispita promite viață prin neascultare. Acuzația transformă fapta în identitate și te izolează. Convingerea numește concret păcatul și te conduce spre lumină, iertare și reparare." },
    ]},
    { id: "sd2_4", type: "choice", order: 4, choice: { prompt: "Ce propoziție auzi cel mai des după ce greșești?", options: [
      { id: "sd2a", label: "«Ascunde; dacă află cineva, s-a terminat.»", branchStepId: "sd2_b_hide" },
      { id: "sd2b", label: "«Tu ești greșeala și nu te mai schimbi.»", branchStepId: "sd2_b_identity" },
      { id: "sd2c", label: "«Mărturisește concret și întoarce-te.»", branchStepId: "sd2_b_return" },
    ]}},
    { id: "sd2_b_hide", type: "how_god_helps", order: 90, bubbles: [{ from: "guide", text: "Izolarea hrănește robia. Alege o persoană sigură și matură căreia îi poți spune adevărul fără spectacol și fără minimalizare." }]},
    { id: "sd2_b_identity", type: "how_god_helps", order: 91, bubbles: [{ from: "guide", text: "Aceasta este condamnare fără Evanghelie. Spune fapta precis, dar răspunde identității false cu Romani 8:1 și cu pasul real al pocăinței." }]},
    { id: "sd2_b_return", type: "how_god_helps", order: 92, bubbles: [{ from: "guide", text: "Convingerea nu este confort superficial. Ea poate durea, dar durerea are ușă: lumină, iertare și o schimbare concretă." }]},
    { id: "sd2_5", type: "quiz", order: 5, quiz: { question: "Care este un semn al convingerii Duhului?", options: [
      { text: "Te definește definitiv prin eșec", correct: false },
      { text: "Numește concret și conduce spre pocăință", correct: true },
      { text: "Îți cere să ascunzi pentru a proteja imaginea", correct: false },
    ], explanation: "Duhul spune adevărul despre păcat fără să nege adevărul despre harul și identitatea oferite în Hristos." }},
    { id: "sd2_6", type: "step", order: 6, bubbles: [{ from: "guide", text: "Împarte o foaie: «fapta mea» și «identitatea pe care acuzația mi-o lipește». Mărturisește fapta; refuză identitatea falsă." }]},
    { id: "sd2_7", type: "prayer", order: 7, bubbles: [{ from: "guide", text: "«Duhule Sfânt, convinge-mă fără să mă lași în condamnare. Dă-mi curaj să ies la lumină și să primesc adevărul lui Hristos.»" }]},
    { id: "sd2_8", type: "memory_verse", order: 8, scripture: { text: "Nu este nicio osândire pentru cei ce sunt în Hristos Iisus.", ref: "Romani 8:1" } },
  ],
}

export const discernL3: Lesson = {
  id: "spirit_discern_l3", courseId: "spiritual_c2_discernamant", order: 3,
  title: "Influență, asuprire și robie", estMinutes: 13,
  anchorRefs: ["Faptele 10:38", "Efeseni 4:25-27", "2 Corinteni 10:3-5"], memoryVerseRef: "2 Corinteni 10:5",
  steps: [
    { id: "sd3_1", type: "hook", order: 1, bubbles: [{ from: "guide", text: "Cuvinte precum «asuprire» și «legătură» sunt folosite foarte diferit. Fără definiții smerite, ele pot descrie orice și pot speria pe oricine." }]},
    { id: "sd3_2", type: "scripture", order: 2, scripture: { text: "Iisus din Nazaret... umbla din loc în loc, făcea bine și vindeca pe toți cei ce erau apăsați de diavolul.", ref: "Faptele 10:38" } },
    { id: "sd3_3", type: "truth_simple", order: 3, bubbles: [
      { from: "guide", text: "Putem vorbi biblic despre influență, apăsare și robie fără să pretindem că măsurăm exact gradul activității demonice. Uităm la adevăr, roade, libertate și context." },
      { from: "guide", text: "Persistența unei lupte nu dovedește singură un demon. Obiceiul, trauma, dependența, mediul, boala și minciuna spirituală se pot suprapune." },
    ]},
    { id: "sd3_4", type: "choice", order: 4, choice: { prompt: "Ce te face să suspectezi o asuprire?", options: [
      { id: "sd3a", label: "O frică sau apăsare care revine.", branchStepId: "sd3_b_pressure" },
      { id: "sd3b", label: "Un păcat sau obicei din care nu ies.", branchStepId: "sd3_b_habit" },
      { id: "sd3c", label: "Cineva mi-a spus că am un duh sau blestem.", branchStepId: "sd3_b_told" },
    ]}},
    { id: "sd3_b_pressure", type: "how_god_helps", order: 90, bubbles: [{ from: "guide", text: "Apăsarea merită luată în serios, dar nu primește automat o etichetă. Notează când apare, ce o intensifică și implică oameni maturi și specialiști dacă îți afectează funcționarea." }]},
    { id: "sd3_b_habit", type: "how_god_helps", order: 91, bubbles: [{ from: "guide", text: "Nu aștepta diagnosticul perfect ca să începi libertatea: mărturisește, închide accesul, cere responsabilizare și primește tratament când este dependență." }]},
    { id: "sd3_b_told", type: "how_god_helps", order: 92, bubbles: [{ from: "guide", text: "Nimeni nu ar trebui să pună prin ecran un diagnostic spiritual asupra ta. Cere textul biblic, dovezile și o evaluare responsabilă; nu primi frica drept revelație." }]},
    { id: "sd3_5", type: "world_vs_truth", order: 5, bubbles: [{ from: "guide", text: "Discernământul sănătos nu banalizează răul spiritual și nici nu transformă persoana în obiectul unui caz spectaculos. Demnitatea și consimțământul rămân." }]},
    { id: "sd3_6", type: "step", order: 6, bubbles: [{ from: "guide", text: "Fă o hartă simplă: simptome, contexte, practici spirituale cunoscute, sănătate, traumă, obiceiuri și oameni de sprijin. Nu trage singur concluzia." }]},
    { id: "sd3_7", type: "prayer", order: 7, bubbles: [{ from: "guide", text: "«Iisuse, adu adevărul Tău în fiecare strat al acestei lupte. Eliberează-mă de minciună și condu-mă spre oamenii și ajutorul potrivit.»" }]},
    { id: "sd3_8", type: "memory_verse", order: 8, scripture: { text: "Orice gând îl facem rob ascultării de Hristos.", ref: "2 Corinteni 10:5" } },
  ],
}

export const SPIRITUAL_DISCERN_PART_A: Lesson[] = [discernL1, discernL2, discernL3]
