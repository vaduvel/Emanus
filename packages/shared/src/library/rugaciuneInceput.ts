import type { Lesson } from "../domain.js"

/* Doamne, învață-mă să mă rog — rugăciunea Domnului ca tipar, nu poezie. */

export const rugInceputL1: Lesson = {
  id: "rug_inceput_l1", courseId: "lib_rug_inceput", order: 1,
  title: "Rugăciunea nu este o poezie", estMinutes: 11,
  anchorRefs: ["Matei 6:5-9", "Matei 26:39-44", "Romani 8:26"], memoryVerseRef: "Matei 6:8",
  steps: [
    { id: "ri1_1", type: "hook", order: 1, bubbles: [
      { from: "guide", text: "Poți ști «Tatăl nostru» pe de rost și totuși să nu-I fi spus lui Dumnezeu nimic din inimă. Poți spune doar «ajută-mă» și aceea să fie o rugăciune adevărată." },
      { from: "guide", text: "Iisus ne-a dat rugăciunea Domnului imediat după ce a avertizat împotriva vorbelor goale. Așadar, nu ne-a dat o poezie magică, ci un tipar viu." },
    ]},
    { id: "ri1_2", type: "scripture", order: 2, scripture: { text: "Când vă rugați, să nu bolborosiți aceleași vorbe, ca păgânii, cărora li se pare că, dacă spun o mulțime de vorbe, vor fi ascultați. Să nu vă asemănați cu ei; căci Tatăl vostru știe de ce aveți trebuință, mai înainte ca să-I cereți voi.", ref: "Matei 6:7-8" } },
    { id: "ri1_3", type: "truth_simple", order: 3, bubbles: [
      { from: "guide", text: "Problema nu este orice repetare. În Ghetsimani, Iisus S-a rugat din nou cu aceleași cuvinte. Problema este repetiția goală, folosită ca tehnică: «dacă spun destul, Dumnezeu va fi obligat să mă audă»." },
      { from: "guide", text: "Nu repeți ca să fii auzit. Vorbești fiindcă Tatăl te cunoaște deja. Rugăciunea nu-I oferă informații lipsă; îți deschide viața înaintea Lui." },
    ]},
    { id: "ri1_4", type: "world_vs_truth", order: 4, bubbles: [
      { from: "guide", text: "Rugăciunea religioasă caută impresie, lungime și formulă. Rugăciunea din inimă poate fi scurtă, stângace și adevărată." },
      { from: "guide", text: "Nici emoția puternică nu este condiție. Poți veni cu tăcere, oboseală sau cu o propoziție neterminată. Duhul ne ajută tocmai când nu știm cum să ne rugăm." },
    ]},
    { id: "ri1_5", type: "choice", order: 5, choice: { prompt: "Ce transformă cel mai des rugăciunea ta într-o recitare?", options: [
      { id: "ri1a", label: "Spun aceleași fraze fără să mă gândesc." },
      { id: "ri1b", label: "Încerc să sun mai spiritual decât sunt." },
      { id: "ri1c", label: "Nu mă rog, fiindcă nu găsesc cuvintele corecte." },
    ]}},
    { id: "ri1_6", type: "scripture", order: 6, scripture: { text: "Și tot astfel și Duhul ne ajută în slăbiciunea noastră, căci nu știm cum trebuie să ne rugăm.", ref: "Romani 8:26" }, bubbles: [
      { from: "guide", text: "Neputința de a formula nu te descalifică. Ea este chiar locul în care primești ajutor." },
    ]},
    { id: "ri1_7", type: "quiz", order: 7, quiz: { question: "Ce interzice Iisus în Matei 6?", options: [
      { text: "Orice rugăciune repetată", correct: false },
      { text: "Repetarea goală folosită pentru a forța ascultarea", correct: true },
      { text: "Rugăciunile mai lungi de un minut", correct: false },
    ], explanation: "Iisus a repetat El Însuși o cerere în Ghetsimani. Avertismentul privește cuvintele goale și încrederea într-o tehnică, nu perseverența sinceră." }},
    { id: "ri1_8", type: "step", order: 8, bubbles: [
      { from: "guide", text: "Completează fără să înfrumusețezi: «Tată, adevărul despre mine astăzi este că...». O singură propoziție sinceră este suficientă." },
    ]},
    { id: "ri1_9", type: "how_god_helps", order: 9, bubbles: [
      { from: "guide", text: "Limita cinstită: sinceritatea nu garantează o senzație imediată sau răspunsul dorit. Rugăciunea este relație, nu buton pentru o stare." },
    ]},
    { id: "ri1_10", type: "prayer", order: 10, bubbles: [
      { from: "guide", text: "«Tată, scapă-mă de cuvintele pe care le spun fără inimă. Sunt aici așa cum sunt. Învață-mă să vorbesc adevărat cu Tine.»" },
    ]},
    { id: "ri1_11", type: "memory_verse", order: 11, scripture: { text: "Tatăl vostru știe de ce aveți trebuință, mai înainte ca să-I cereți voi.", ref: "Matei 6:8" } },
  ],
}

export const rugInceputL2: Lesson = {
  id: "rug_inceput_l2", courseId: "lib_rug_inceput", order: 2,
  title: "Tatăl nostru care ești în ceruri", estMinutes: 11,
  anchorRefs: ["Matei 6:9", "Romani 8:15", "Efeseni 2:18"], memoryVerseRef: "Romani 8:15",
  steps: [
    { id: "ri2_1", type: "hook", order: 1, bubbles: [
      { from: "guide", text: "Rugăciunea se schimbă după cine crezi că este la celălalt capăt. Dacă vezi un judecător nerăbdător, îți măsori cuvintele. Dacă vezi un mecanism, cauți formula. Iisus începe cu «Tată»." },
    ]},
    { id: "ri2_2", type: "scripture", order: 2, scripture: { text: "Iată, dar, cum trebuie să vă rugați: «Tatăl nostru care ești în ceruri...»", ref: "Matei 6:9" } },
    { id: "ri2_3", type: "truth_simple", order: 3, bubbles: [
      { from: "guide", text: "«Tată» înseamnă acces și relație prin Iisus. «Nostru» îmi amintește că nu sunt singurul copil și că rugăciunea mea îi cuprinde și pe alții." },
      { from: "guide", text: "«În ceruri» păstrează măreția Lui. Dumnezeu este apropiat, dar nu este o versiune mai mare a unui părinte omenesc și nu este limitat de rănile familiei tale." },
    ]},
    { id: "ri2_4", type: "scripture", order: 4, scripture: { text: "Și voi n-ați primit un duh de robie, ca să mai aveți frică, ci ați primit un duh de înfiere, care ne face să strigăm: «Ava!», adică «Tată!»", ref: "Romani 8:15" } },
    { id: "ri2_5", type: "world_vs_truth", order: 5, bubbles: [
      { from: "guide", text: "Robul întreabă: «Am formulat corect? Am stat destul? Merit să fiu ascultat?» Copilul vine fiindcă ușa a fost deschisă, chiar când se bâlbâie." },
      { from: "guide", text: "Rugăciunea nu-L convinge pe Dumnezeu să devină Tată. Prin Iisus, venim la Tatăl care ne-a chemat deja aproape." },
    ]},
    { id: "ri2_6", type: "choice", order: 6, choice: { prompt: "Ce auzi în tine când spui «Tată»?", options: [
      { id: "ri2a", label: "Apropiere și siguranță." },
      { id: "ri2b", label: "Teamă, rezistență sau o rană veche." },
      { id: "ri2c", label: "Mai nimic; încă învăț ce înseamnă." },
    ]}},
    { id: "ri2_7", type: "how_god_helps", order: 7, bubbles: [
      { from: "guide", text: "Reacția ta nu este verdictul despre Dumnezeu. Este locul real din care începe conversația. Dacă numele «Tată» doare, poți spune: «Dumnezeule, arată-mi cum ești Tu diferit de ce am cunoscut»." },
    ]},
    { id: "ri2_8", type: "step", order: 8, bubbles: [
      { from: "guide", text: "Transformă începutul în cuvintele tale: «Tată, vin la Tine pentru că...». Apoi adaugă: «Tatăl nostru, aduc înaintea Ta și pe...»." },
    ]},
    { id: "ri2_9", type: "how_god_helps", order: 9, bubbles: [
      { from: "guide", text: "Limita cinstită: o lecție nu repară într-o zi imaginea unui părinte. Nu forța intimitatea și nu te condamna pentru reacțiile formate în durere." },
    ]},
    { id: "ri2_10", type: "prayer", order: 10, bubbles: [
      { from: "guide", text: "«Tată, numele acesta este ușor sau greu pentru mine. Învață-mă cine ești Tu și amintește-mi că nu vin singur.»" },
    ]},
    { id: "ri2_11", type: "memory_verse", order: 11, scripture: { text: "Ați primit un duh de înfiere, care ne face să strigăm: «Ava!», adică «Tată!»", ref: "Romani 8:15" } },
  ],
}

export const rugInceputL3: Lesson = {
  id: "rug_inceput_l3", courseId: "lib_rug_inceput", order: 3,
  title: "Sfințească-se Numele Tău", estMinutes: 10,
  anchorRefs: ["Matei 6:9", "Ezechiel 36:22-23", "1 Petru 1:15-16"], memoryVerseRef: "Matei 6:9",
  steps: [
    { id: "ri3_1", type: "hook", order: 1, bubbles: [
      { from: "guide", text: "După «Tată», Iisus nu începe cu lista de probleme. Întâi ne învață să ridicăm privirea: «Sfințească-se Numele Tău»." },
    ]},
    { id: "ri3_2", type: "scripture", order: 2, scripture: { text: "Tatăl nostru care ești în ceruri! Sfințească-se Numele Tău.", ref: "Matei 6:9" } },
    { id: "ri3_3", type: "truth_simple", order: 3, bubbles: [
      { from: "guide", text: "Nu Îl facem noi sfânt pe Dumnezeu. Cerem ca El să fie cunoscut, cinstit și tratat ca sfânt — întâi în noi, apoi prin noi." },
      { from: "guide", text: "A sfinți Numele Lui înseamnă: «Arată-mi cine ești cu adevărat. Fă ca felul meu de a trăi să nu spună o minciună despre Tine»." },
    ]},
    { id: "ri3_4", type: "world_vs_truth", order: 4, bubbles: [
      { from: "guide", text: "Poți folosi numele lui Dumnezeu și totuși să cauți numai propriul avantaj. Rugăciunea lui Iisus mută centrul: nu «fă-mi numele mare», ci «fă Numele Tău cunoscut»." },
      { from: "guide", text: "Aceasta nu înseamnă să ignori nevoile. Înseamnă să le aduci după ce îți amintești înaintea Cui stai." },
    ]},
    { id: "ri3_5", type: "choice", order: 5, choice: { prompt: "Unde vrei ca viața ta să spună adevărul despre Dumnezeu?", options: [
      { id: "ri3a", label: "În felul în care vorbesc cu oamenii." },
      { id: "ri3b", label: "În muncă, bani și lucrurile ascunse." },
      { id: "ri3c", label: "În felul în care reacționez când sunt rănit." },
    ]}},
    { id: "ri3_6", type: "how_god_helps", order: 6, bubbles: [
      { from: "guide", text: "Transformă propoziția aleasă în cerere concretă. Nu spune doar «fii glorificat». Spune unde: «Păzește-mi limba la întâlnirea de azi» sau «ajută-mă să nu ascund adevărul despre bani»." },
    ]},
    { id: "ri3_7", type: "quiz", order: 7, quiz: { question: "Ce cerem prin «Sfințească-se Numele Tău»?", options: [
      { text: "Să-L facem noi pe Dumnezeu mai sfânt", correct: false },
      { text: "Ca Dumnezeu să fie cunoscut și cinstit ca sfânt, inclusiv prin viața noastră", correct: true },
      { text: "Să nu mai aducem nevoile personale în rugăciune", correct: false },
    ], explanation: "Dumnezeu este deja sfânt. Cerem ca adevărul despre El să devină vizibil în noi și în lume." }},
    { id: "ri3_8", type: "step", order: 8, bubbles: [
      { from: "guide", text: "Completează: «Tată, fă ca Numele Tău să fie cinstit astăzi în felul în care eu...». Numește o situație reală." },
    ]},
    { id: "ri3_9", type: "how_god_helps", order: 9, bubbles: [
      { from: "guide", text: "Limita cinstită: a purta Numele Lui nu înseamnă să pari impecabil. Când greșești, adevărul poate fi arătat și prin mărturisire, reparare și cererea de iertare." },
    ]},
    { id: "ri3_10", type: "prayer", order: 10, bubbles: [
      { from: "guide", text: "«Tată, Tu ești sfânt. Curăță imaginea falsă pe care o port despre Tine și fă ca alegerile mele de astăzi să spună adevărul despre Numele Tău.»" },
    ]},
    { id: "ri3_11", type: "memory_verse", order: 11, scripture: { text: "Sfințească-se Numele Tău.", ref: "Matei 6:9" } },
  ],
}

export const RUGACIUNE_INCEPUT_PART_A: Lesson[] = [rugInceputL1, rugInceputL2, rugInceputL3]
