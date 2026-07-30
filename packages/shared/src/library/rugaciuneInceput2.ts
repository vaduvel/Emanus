import type { Lesson } from "../domain.js"
import { RUGACIUNE_INCEPUT_PART_A } from "./rugaciuneInceput.js"

export const rugInceputL4: Lesson = {
  id: "rug_inceput_l4", courseId: "lib_rug_inceput", order: 4,
  title: "Tatăl nostru, fără grabă", estMinutes: 12,
  anchorRefs: ["Matei 6:9-13", "Luca 11:1-4"], memoryVerseRef: "Matei 6:9-10",
  steps: [
    { id: "ri4_1", type: "hook", order: 1, bubbles: [
      { from: "guide", text: "Ucenicii nu I-au cerut lui Iisus o explicație despre rugăciune. I-au spus: «Doamne, învață-ne să ne rugăm». Răspunsul Lui a fost scurt și suficient pentru o viață întreagă." },
      { from: "guide", text: "Astăzi nu recităm repede. Luăm fiecare mișcare și o traducem în viața ta." },
    ]},
    { id: "ri4_2", type: "scripture", order: 2, scripture: { text: "Iată, dar, cum trebuie să vă rugați: «Tatăl nostru care ești în ceruri! Sfințească-se Numele Tău; vie Împărăția Ta; facă-se voia Ta, precum în cer și pe pământ.»", ref: "Matei 6:9-10" } },
    { id: "ri4_3", type: "truth_simple", order: 3, bubbles: [
      { from: "guide", text: "«Tatăl nostru» — vin ca fiu și nu vin singur. «Sfințească-se Numele Tău» — înainte de problema mea, îmi amintesc cine ești Tu." },
      { from: "guide", text: "«Vie Împărăția Ta» — adu felul Tău de a conduce în locul acesta. «Facă-se voia Ta» — îți spun ce vreau, dar nu transform dorința mea în stăpân." },
    ]},
    { id: "ri4_4", type: "scripture", order: 4, scripture: { text: "Pâinea noastră cea de toate zilele dă-ne-o nouă astăzi; și ne iartă nouă greșelile noastre, precum și noi iertăm greșiților noștri; și nu ne duce în ispită, ci izbăvește-ne de cel rău.", ref: "Matei 6:11-13" } },
    { id: "ri4_5", type: "truth_simple", order: 5, bubbles: [
      { from: "guide", text: "«Pâinea de azi» — nevoia concretă, nu rușinoasă. «Iartă-ne» — aduc ce am făcut fără să-mi schimb numele în greșeala mea." },
      { from: "guide", text: "«Precum iertăm» — harul primit începe să curgă, dar iertarea nu înseamnă împăcare automată sau revenire în pericol. «Izbăvește-ne» — recunosc că am nevoie de protecție și ajutor." },
    ]},
    { id: "ri4_6", type: "world_vs_truth", order: 6, bubbles: [
      { from: "guide", text: "Citirea greșită: «Tatăl nostru» este o incantație care funcționează dacă este repetată exact. Iisus tocmai avertizase împotriva repetării folosite ca metodă de a forța ascultarea." },
      { from: "guide", text: "Rugăciunea poate fi rostită exact și cu inimă, dar poate fi și scheletul pe care pui propriile cuvinte." },
    ]},
    { id: "ri4_7", type: "choice", order: 7, choice: { prompt: "La care propoziție te oprești astăzi?", options: [
      { id: "ri4a", label: "Pâinea de azi — am o nevoie concretă." }, { id: "ri4b", label: "Iartă-ne — port ceva ascuns." }, { id: "ri4c", label: "Facă-se voia Ta — mi-e greu să las controlul." },
    ]}},
    { id: "ri4_8", type: "how_god_helps", order: 8, bubbles: [
      { from: "guide", text: "Nu parcurge restul doar ca să termini. Ia propoziția aleasă și adaugă după ea trei fraze ale tale. De exemplu: «Pâinea noastră... Tată, luna aceasta mă sperie. Am nevoie de lucru și de înțelepciune pentru bani.»" },
      { from: "guide", text: "Tiparul lui Iisus este suficient de mare pentru închinare, nevoi, vină, relații, ispită și frică — fără să-ți ia vocea." },
    ]},
    { id: "ri4_9", type: "quiz", order: 9, quiz: { question: "Cum folosești rugăciunea «Tatăl nostru» în acest curs?", options: [
      { text: "Ca formulă care garantează răspunsul", correct: false },
      { text: "Ca tipar în care pui cuvintele și viața ta", correct: true },
      { text: "Ca text pe care începătorii trebuie să-l evite", correct: false },
    ], explanation: "Iisus a dat un tipar simplu. Îl putem rosti și îl putem desface în propriile noastre cuvinte, fără a-l trata ca mecanism." }},
    { id: "ri4_10", type: "how_god_helps", order: 10, bubbles: [
      { from: "guide", text: "Limita cinstită: propoziția «facă-se voia Ta» nu explică de ce Dumnezeu permite un anumit lucru și nu trebuie folosită pentru a cere cuiva să accepte abuzul, boala fără tratament sau nedreptatea fără ajutor." },
      { from: "guide", text: "Predarea voii nu este pasivitate. Poți cere intervenția lui Dumnezeu și, în același timp, poți suna medicul, poliția, avocatul sau omul care te poate ajuta." },
    ]},
    { id: "ri4_11", type: "prayer", order: 11, bubbles: [
      { from: "guide", text: "Roagă-te acum doar propoziția aleasă și cele trei fraze ale tale. Nu trebuie să termini toată rugăciunea." },
    ]},
    { id: "ri4_12", type: "memory_verse", order: 12, scripture: { text: "Tatăl nostru care ești în ceruri... vie Împărăția Ta; facă-se voia Ta.", ref: "Matei 6:9-10" } },
  ],
}

export const rugInceputL5: Lesson = {
  id: "rug_inceput_l5", courseId: "lib_rug_inceput", order: 5,
  title: "Acum rămâi tu cu El", estMinutes: 10,
  anchorRefs: ["Psalmul 139:1-4", "Matei 6:7-8", "Psalmul 13:1-2"], memoryVerseRef: "Psalmul 139:4",
  steps: [
    { id: "ri5_1", type: "hook", order: 1, bubbles: [
      { from: "guide", text: "Până aici ai primit propoziții, patru începuturi și tiparul lui Iisus. Ținta nu este să devii bun la scheme. Ținta este să poți rămâne tu înaintea Lui când schema dispare." },
      { from: "guide", text: "Astăzi Emanus vorbește mai puțin. Nu pentru că ai absolvit rugăciunea, ci pentru că rugăciunea nu trebuie să depindă de aplicație." },
    ]},
    { id: "ri5_2", type: "scripture", order: 2, scripture: { text: "Căci nu-mi ajunge cuvântul pe limbă, și Tu, Doamne, îl și cunoști în totul.", ref: "Psalmul 139:4" }, bubbles: [
      { from: "guide", text: "Nu vorbești ca să Îi oferi informații lipsă. Vorbești ca să nu mai porți singur ceea ce El deja cunoaște." },
    ]},
    { id: "ri5_3", type: "truth_simple", order: 3, bubbles: [
      { from: "guide", text: "Rugăciunea liberă poate avea trei mișcări foarte simple: spune ce este adevărat; cere ce dorești; rămâi suficient de liniștit încât să nu umpli tot spațiul din frică." },
      { from: "guide", text: "Tăcerea nu este o metodă prin care produci o voce. Este prezență fără obligația de a vorbi continuu." },
    ]},
    { id: "ri5_4", type: "world_vs_truth", order: 4, bubbles: [
      { from: "guide", text: "Citirea greșită: orice gând apărut în liniște este mesaj de la Dumnezeu. Nu. Gândurile pot veni din memorie, teamă, dorință sau imaginație." },
      { from: "guide", text: "Emanus nu se dă drept vocea lui Dumnezeu. Orice impresie trebuie cercetată prin Scriptură, caracterul lui Iisus și, când contează mult, prin oameni maturi și siguri." },
    ]},
    { id: "ri5_5", type: "choice", order: 5, choice: { prompt: "Ce este adevărat în tine chiar acum?", options: [
      { id: "ri5a", label: "Am ceva concret de cerut." }, { id: "ri5b", label: "Sunt supărat sau dezamăgit de Dumnezeu." }, { id: "ri5c", label: "Nu simt nimic și nu am nimic de spus." },
    ]}},
    { id: "ri5_6", type: "how_god_helps", order: 6, bubbles: [
      { from: "guide", text: "Dacă ai o cerere, spune-o direct. Dacă ești supărat, Psalmul 13 îți dă voie să întrebi «până când?». Dacă nu simți nimic, poți rămâne două minute fără să falsifici o stare." },
      { from: "guide", text: "Sinceritatea nu este lipsă de respect. În Psalmi, oamenii Îi vorbesc lui Dumnezeu tocmai fiindcă relația este suficient de reală pentru adevăr." },
    ]},
    { id: "ri5_7", type: "scripture", order: 7, scripture: { text: "Până când, Doamne, mă vei uita neîncetat? Până când Îți vei ascunde Fața de mine? Până când voi avea sufletul plin de griji și inima plină de necazuri în fiecare zi?", ref: "Psalmul 13:1-2" }, bubbles: [
      { from: "guide", text: "Aceasta este rugăciune biblică. Nu rezolvă tensiunea în prima propoziție și nu pretinde că omul simte ce nu simte." },
    ]},
    { id: "ri5_8", type: "step", order: 8, bubbles: [
      { from: "guide", text: "Pune telefonul cu fața în jos pentru două minute. Spune adevărul, cere ce dorești și lasă apoi puțină tăcere. Nu vâna o experiență și nu evalua dacă a ieșit bine." },
    ]},
    { id: "ri5_9", type: "how_god_helps", order: 9, bubbles: [
      { from: "guide", text: "Limita cinstită: rugăciunea nu garantează răspunsul dorit, momentul dorit sau o senzație de apropiere. Nu știm de ce unele cereri rămân mult timp fără răspunsul pe care îl așteptăm." },
      { from: "guide", text: "Dacă tăcerea continuă, nu înseamnă automat că ai greșit tehnica, că ai credință slabă sau că Dumnezeu te pedepsește. Relația poate continua și în anotimpul în care nu simți nimic." },
    ]},
    { id: "ri5_10", type: "journal", order: 10, journalPrompt: "Cum ai vorbi cu Dumnezeu dacă ai ști că nu trebuie să sune frumos și că nimeni nu te evaluează? Scrie exact așa." },
    { id: "ri5_11", type: "prayer", order: 11, bubbles: [
      { from: "guide", text: "Nu îți dau o rugăciune de repetat astăzi. Închide aplicația și spune-I tu următoarea propoziție." },
    ]},
    { id: "ri5_12", type: "memory_verse", order: 12, scripture: { text: "Nu-mi ajunge cuvântul pe limbă, și Tu, Doamne, îl și cunoști în totul.", ref: "Psalmul 139:4" }, bubbles: [
      { from: "guide", text: "Cursul s-a terminat. Schela poate rămâne jos." },
    ]},
  ],
}

export const RUGACIUNE_INCEPUT_LESSONS: Lesson[] = [...RUGACIUNE_INCEPUT_PART_A, rugInceputL4, rugInceputL5]
