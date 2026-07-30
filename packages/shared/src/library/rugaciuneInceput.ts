import type { Lesson } from "../domain.js"

/* Când nu știi ce să spui — lecțiile 1-3. Schela începe și se retrage treptat. */

export const rugInceputL1: Lesson = {
  id: "rug_inceput_l1", courseId: "lib_rug_inceput", order: 1,
  title: "Nu trebuie să găsești cuvintele potrivite", estMinutes: 9,
  anchorRefs: ["Romani 8:26", "Psalmul 62:8"], memoryVerseRef: "Psalmul 62:8",
  steps: [
    { id: "ri1_1", type: "hook", order: 1, bubbles: [
      { from: "guide", text: "Poate începi cu «Doamne...» și apoi nu mai vine nimic. Sau auzi rugăciuni lungi și frumoase și simți că ale tale sună copilărește." },
      { from: "guide", text: "Rugăciunea nu este examen de vorbire. Dumnezeu nu află cât de sincer ești după cât de bine legi propozițiile." },
    ]},
    { id: "ri1_2", type: "scripture", order: 2, scripture: { text: "Și tot astfel și Duhul ne ajută în slăbiciunea noastră, căci nu știm cum trebuie să ne rugăm. Dar însuși Duhul mijlocește pentru noi cu suspine negrăite.", ref: "Romani 8:26" }, bubbles: [
      { from: "guide", text: "Textul nu spune «uneori începătorii nu știu». Spune «nu știm». Neputința de a formula nu te scoate din rugăciune; este chiar locul în care primești ajutor." },
    ]},
    { id: "ri1_3", type: "truth_simple", order: 3, bubbles: [
      { from: "guide", text: "Punctul principal: rugăciunea începe cu prezența, nu cu performanța. Poți veni cu o propoziție, cu tăcere, cu plâns sau cu o întrebare neterminată." },
      { from: "guide", text: "Un copil care spune «Tată, nu știu» nu a eșuat într-o conversație. A spus adevărul în relație." },
    ]},
    { id: "ri1_4", type: "world_vs_truth", order: 4, bubbles: [
      { from: "guide", text: "Citirea greșită: rugăciunea bună trebuie să fie lungă, solemnă și fără ezitare. Iisus a avertizat tocmai împotriva vorbelor multe folosite ca tehnică pentru a fi auzit." },
      { from: "guide", text: "Alta: dacă nu simți nimic, nu te-ai rugat. Prezența Lui este o promisiune, nu o senzație pe care trebuie să o produci." },
    ]},
    { id: "ri1_5", type: "choice", order: 5, choice: { prompt: "Ce te blochează cel mai des?", options: [
      { id: "ri1a", label: "Nu știu cu ce să încep." }, { id: "ri1b", label: "Mi-e rușine de ce trebuie să spun." }, { id: "ri1c", label: "Spun cuvinte, dar simt că vorbesc singur." },
    ]}},
    { id: "ri1_6", type: "how_god_helps", order: 6, bubbles: [
      { from: "guide", text: "Dacă nu știi cum să începi, spune exact asta. Dacă ți-e rușine, începe cu «mi-e rușine». Dacă nu simți nimic, spune «nu Te simt, dar sunt aici»." },
      { from: "guide", text: "Nu trebuie să schimbi adevărul ca să sune mai spiritual. Psalmii au rugăciuni speriate, furioase, obosite și nedumerite." },
    ]},
    { id: "ri1_7", type: "scripture", order: 7, scripture: { text: "Popoare, în orice vreme, încredeți-vă în El, vărsați-vă inimile înaintea Lui! Dumnezeu este adăpostul nostru.", ref: "Psalmul 62:8" }, bubbles: [
      { from: "guide", text: "«Vărsați-vă» nu înseamnă aranjați frumos. Înseamnă aduceți ce este înăuntru așa cum este." },
    ]},
    { id: "ri1_8", type: "step", order: 8, bubbles: [
      { from: "guide", text: "Oprește-te zece secunde. Apoi spune o singură propoziție adevărată: «Doamne, azi...». Nu adăuga nimic doar ca să pară rugăciune." },
    ]},
    { id: "ri1_9", type: "how_god_helps", order: 9, bubbles: [
      { from: "guide", text: "Limita cinstită: faptul că te rogi sincer nu garantează că vei simți imediat pace sau că situația se va schimba. Rugăciunea nu este buton pentru o stare." },
      { from: "guide", text: "Astăzi învățăm doar să venim. Relația începe acolo: nu când reușești să vorbești bine, ci când nu te mai ascunzi." },
    ]},
    { id: "ri1_10", type: "prayer", order: 10, bubbles: [
      { from: "guide", text: "«Doamne, nu știu cum să mă rog. Dar sunt aici. Primește și ce nu pot spune.»" },
    ]},
    { id: "ri1_11", type: "memory_verse", order: 11, scripture: { text: "Vărsați-vă inimile înaintea Lui!", ref: "Psalmul 62:8" } },
  ],
}

export const rugInceputL2: Lesson = {
  id: "rug_inceput_l2", courseId: "lib_rug_inceput", order: 2,
  title: "Cu Cine vorbești?", estMinutes: 10,
  anchorRefs: ["Matei 6:6-9", "Romani 8:15"], memoryVerseRef: "Matei 6:9",
  steps: [
    { id: "ri2_1", type: "hook", order: 1, bubbles: [
      { from: "guide", text: "Rugăciunea se schimbă în funcție de cine crezi că este la celălalt capăt. Dacă vezi un judecător nerăbdător, îți alegi cuvintele. Dacă vezi un mecanism, cauți formula. Dacă vezi un Tată, vii." },
    ]},
    { id: "ri2_2", type: "scripture", order: 2, scripture: { text: "Iată, dar, cum trebuie să vă rugați: «Tatăl nostru care ești în ceruri...»", ref: "Matei 6:9" }, bubbles: [
      { from: "guide", text: "Primul cuvânt din tiparul dat de Iisus nu este «Doamne puternic», «Stăpâne» sau «eu, păcătosul». Este «Tată»." },
      { from: "guide", text: "Nu pentru că Dumnezeu este mai puțin sfânt, ci pentru că Iisus deschide accesul unei relații pe care omul nu și-o putea revendica singur." },
    ]},
    { id: "ri2_3", type: "truth_simple", order: 3, bubbles: [
      { from: "guide", text: "«Tatăl nostru» ține împreună două lucruri: apropiere și măreție. Tată — poți veni. În ceruri — nu vorbești cu o versiune mai mare a unui părinte omenesc." },
      { from: "guide", text: "Dacă experiența cu un părinte a fost dureroasă sau absentă, Biblia nu spune că Dumnezeu seamănă cu acea rană. Spune că El este standardul după care cuvântul Tată trebuie vindecat." },
    ]},
    { id: "ri2_4", type: "scripture", order: 4, scripture: { text: "Și voi n-ați primit un duh de robie, ca să mai aveți frică, ci ați primit un duh de înfiere, care ne face să strigăm: «Ava!», adică «Tată!»", ref: "Romani 8:15" }, bubbles: [
      { from: "guide", text: "«Ava» era adresare de familie, nu formulă ceremonială. Textul o pune în contrast cu robia și frica." },
    ]},
    { id: "ri2_5", type: "world_vs_truth", order: 5, bubbles: [
      { from: "guide", text: "Robul întreabă: am formulat corect, am stat destul, am meritat să fiu ascultat? Fiul spune ce are și rămâne fiu chiar când se bâlbâie." },
      { from: "guide", text: "Rugăciunea creștină nu îl convinge pe Dumnezeu să devină Tată. Vine fiindcă, prin Iisus, ușa a fost deja deschisă." },
    ]},
    { id: "ri2_6", type: "choice", order: 6, choice: { prompt: "Când începi rugăciunea, cine simți că te ascultă?", options: [
      { id: "ri2a", label: "Cineva greu de mulțumit." }, { id: "ri2b", label: "Cineva departe, despre care nu știu ce crede." }, { id: "ri2c", label: "Un Tată la care încă învăț să vin." },
    ]}},
    { id: "ri2_7", type: "how_god_helps", order: 7, bubbles: [
      { from: "guide", text: "Astăzi nu te forța să simți apropierea. Împrumută primul cuvânt al lui Iisus. Spune «Tată» și observă ce reacție apare în tine: liniște, rezistență, teamă sau nimic." },
      { from: "guide", text: "Reacția nu este verdictul despre Dumnezeu. Este doar locul real din care începe conversația voastră." },
    ]},
    { id: "ri2_8", type: "step", order: 8, bubbles: [
      { from: "guide", text: "Completează o singură frază: «Tată, mi-e greu să cred că Tu...». Spune finalul fără să-l corectezi." },
    ]},
    { id: "ri2_9", type: "how_god_helps", order: 9, bubbles: [
      { from: "guide", text: "Limita cinstită: această lecție nu repară într-o zi imaginea de Tată și nu explică de ce ai avut experiențele pe care le-ai avut." },
      { from: "guide", text: "Dacă termenul îți trezește amintiri grele, nu te judeca și nu forța intimitatea. Poți începe cu «Dumnezeule, arată-mi cum ești Tu diferit»." },
    ]},
    { id: "ri2_10", type: "prayer", order: 10, bubbles: [
      { from: "guide", text: "«Tată, numele acesta este ușor sau greu pentru mine. Învață-mă cine ești Tu, nu doar ce am cunoscut eu.»" },
    ]},
    { id: "ri2_11", type: "memory_verse", order: 11, scripture: { text: "Tatăl nostru care ești în ceruri...", ref: "Matei 6:9" } },
  ],
}

export const rugInceputL3: Lesson = {
  id: "rug_inceput_l3", courseId: "lib_rug_inceput", order: 3,
  title: "Patru începuturi simple", estMinutes: 10,
  anchorRefs: ["Psalmul 100:4", "1 Ioan 1:9", "Filipeni 4:6", "Psalmul 18:1"], memoryVerseRef: "Filipeni 4:6",
  steps: [
    { id: "ri3_1", type: "hook", order: 1, bubbles: [
      { from: "guide", text: "Când mintea rămâne goală, nu ai nevoie de un discurs. Ai nevoie de patru uși. Le poți ține minte pe degete: Mulțumesc. Iartă-mă. Te rog. Te iubesc." },
      { from: "guide", text: "Nu este o formulă și nu trebuie să le spui pe toate. Sunt începuturi până când găsești propriile cuvinte." },
    ]},
    { id: "ri3_2", type: "truth_simple", order: 2, bubbles: [
      { from: "guide", text: "Mulțumesc te ajută să numești ce ai primit. Iartă-mă te scoate din ascundere. Te rog aduce nevoia reală. Te iubesc răspunde Persoanei, nu doar darurilor." },
      { from: "guide", text: "Ordinea nu este obligatorie. Uneori singurul lucru cinstit este «Te rog». Uneori nu poți ajunge decât la «Iartă-mă»." },
    ]},
    { id: "ri3_3", type: "scripture", order: 3, scripture: { text: "Nu vă îngrijorați de nimic; ci, în orice lucru, aduceți cererile voastre la cunoștința lui Dumnezeu, prin rugăciuni și cereri, cu mulțumiri.", ref: "Filipeni 4:6" }, bubbles: [
      { from: "guide", text: "Textul nu spune că anxietatea dispare fiindcă ai spus fraza corectă. Spune să aduci orice lucru — inclusiv lucrul care încă te tulbură." },
    ]},
    { id: "ri3_4", type: "world_vs_truth", order: 4, bubbles: [
      { from: "guide", text: "Citirea greșită: dacă mă rog, trebuie să cer numai lucruri spirituale. Iisus a pus pâinea zilnică în rugăciunea-model. Nevoile obișnuite au loc." },
      { from: "guide", text: "Alta: mărturisirea înseamnă să te pedepsești prin cuvinte. În 1 Ioan 1:9, mărturisirea merge spre iertare și curățire, nu spre umilire fără sfârșit." },
    ]},
    { id: "ri3_5", type: "choice", order: 5, choice: { prompt: "Care dintre cele patru îți vine cel mai greu?", options: [
      { id: "ri3a", label: "Mulțumesc — văd mai repede ce lipsește." }, { id: "ri3b", label: "Iartă-mă — mi-e teamă de condamnare." }, { id: "ri3c", label: "Te rog sau Te iubesc — nu știu să cer ori să fiu apropiat." },
    ]}},
    { id: "ri3_6", type: "how_god_helps", order: 6, bubbles: [
      { from: "guide", text: "Nu lucra la degetul ușor. Alege-l pe cel care se blochează. Dacă este «Mulțumesc», numește ceva mic. Dacă este «Iartă-mă», numește fapta, nu identitatea ta. Dacă este «Te rog», cere concret. Dacă este «Te iubesc», poți spune «vreau să învăț să Te iubesc»." },
    ]},
    { id: "ri3_7", type: "quiz", order: 7, quiz: { question: "Ce sunt cele patru începuturi?", options: [
      { text: "Formula obligatorie a unei rugăciuni corecte", correct: false },
      { text: "O schelă temporară care te ajută să găsești propriile cuvinte", correct: true },
      { text: "Patru condiții ca Dumnezeu să răspundă", correct: false },
    ], explanation: "Ele nu cumpără răspunsul și nu trebuie bifate. Sunt puncte de pornire pentru o conversație reală." }},
    { id: "ri3_8", type: "step", order: 8, bubbles: [
      { from: "guide", text: "Ridică patru degete. Spune câte o propoziție scurtă pentru fiecare. Dacă una nu vine, spune «aici nu știu încă» și continuă." },
    ]},
    { id: "ri3_9", type: "how_god_helps", order: 9, bubbles: [
      { from: "guide", text: "Limita cinstită: această structură te poate ajuta să vorbești, dar nu produce apropiere automat și nu îl obligă pe Dumnezeu să răspundă într-un anumit fel." },
      { from: "guide", text: "Ținta cursului este să uiți treptat de schemă, nu să devii dependent de ea." },
    ]},
    { id: "ri3_10", type: "prayer", order: 10, bubbles: [
      { from: "guide", text: "«Mulțumesc pentru ___. Iartă-mă pentru ___. Te rog ___. Te iubesc — sau vreau să învăț să Te iubesc.»" },
    ]},
    { id: "ri3_11", type: "memory_verse", order: 11, scripture: { text: "În orice lucru, aduceți cererile voastre la cunoștința lui Dumnezeu.", ref: "Filipeni 4:6" } },
  ],
}

export const RUGACIUNE_INCEPUT_PART_A: Lesson[] = [rugInceputL1, rugInceputL2, rugInceputL3]
