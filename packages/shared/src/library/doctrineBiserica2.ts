import type { Lesson } from "../domain.js"
import { DOCTRINE_BISERICA_PART_A } from "./doctrineBiserica.js"

export const bisericaL4: Lesson = {
  id: "biserica_l4", courseId: "doctrine_c3_biserica", order: 4,
  title: "Am fost rănit acolo", estMinutes: 12,
  anchorRefs: ["Ioan 9:34-35", "Ioan 13:34-35", "Psalmul 55:12-14"], memoryVerseRef: "Ioan 9:35",
  steps: [
    { id: "bc4_1", type: "hook", order: 1, bubbles: [
      { from: "guide", text: "Dacă ai fost umilit, controlat, exclus, folosit, amenințat sau abuzat într-o comunitate, nu începem prin a explica oamenii care au făcut-o." },
      { from: "guide", text: "Începem cu tine: ce ți s-a făcut a fost real. O funcție spirituală, un verset sau o intenție declarată bună nu transformă răul în bine." },
    ]},
    { id: "bc4_2", type: "name_struggle", order: 2, bubbles: [
      { from: "guide", text: "Rana aceasta este diferită fiindcă s-a produs într-un loc în care nu țineai garda sus. Ai venit să Îl întâlnești pe Dumnezeu și ai fost rănit de cineva care vorbea în numele Lui." },
      { from: "guide", text: "Poate că după aceea ți s-a spus că ești prea sensibil, răzvrătit sau incapabil să ierți. Faptul că încă doare nu dovedește nimic rău despre credința ta." },
    ]},
    { id: "bc4_3", type: "scripture", order: 3, scripture: { text: "Nu un vrăjmaș mă batjocorește, căci aș suferi... ci tu, pe care te socoteam una cu mine, tu, frate de cruce și prieten cu mine! Noi, care trăiam împreună într-o plăcută prietenie și ne duceam împreună cu mulțimea în Casa lui Dumnezeu!", ref: "Psalmul 55:12-14" }, bubbles: [
      { from: "guide", text: "Scriptura are cuvinte pentru trădarea venită de la omul cu care te rugai. Nu îți cere să numești rana mică pentru a-L proteja pe Dumnezeu." },
    ]},
    { id: "bc4_4", type: "truth_simple", order: 4, bubbles: [
      { from: "guide", text: "În Ioan 9, un om vindecat este dat afară din comunitate fiindcă refuză să nege ce i-a făcut Iisus. Versetul următor nu spune că Iisus l-a trimis înapoi să se supună." },
      { from: "guide", text: "Spune că Iisus a auzit și l-a căutat. Afară. Cel exclus de oameni nu fusese exclus de El." },
    ]},
    { id: "bc4_5", type: "scripture", order: 5, scripture: { text: "Isus a auzit că l-au dat afară; și, când l-a găsit, i-a zis: «Crezi tu în Fiul lui Dumnezeu?»", ref: "Ioan 9:35" }, bubbles: [
      { from: "guide", text: "L-a găsit El. Nu i-a cerut omului rănit să găsească drumul înapoi până la cei care îl scoseseră." },
    ]},
    { id: "bc4_6", type: "world_vs_truth", order: 6, bubbles: [
      { from: "guide", text: "Citirea greșită: «nu te uita la oameni, uită-te la Dumnezeu». Sună spiritual, dar poate reduce la tăcere răul. Iisus a spus că oamenii Lui vor fi recunoscuți tocmai după felul în care se iubesc." },
      { from: "guide", text: "Alta: «trebuie să ierți și să revii». Iertarea, împăcarea și întoarcerea sunt lucruri diferite. Împăcarea cere adevăr, responsabilitate și siguranță; întoarcerea într-un loc periculos nu este poruncă." },
    ]},
    { id: "bc4_7", type: "choice", order: 7, choice: { prompt: "Ce a rămas cel mai greu după ce s-a întâmplat?", options: [
      { id: "bc4a", label: "Îl confund pe Dumnezeu cu oamenii care m-au rănit." },
      { id: "bc4b", label: "Nu mai pot avea încredere în niciun lider sau grup." },
      { id: "bc4c", label: "Mă întreb dacă eu am fost problema." },
    ]}},
    { id: "bc4_8", type: "how_god_helps", order: 8, bubbles: [
      { from: "guide", text: "Separă trei propoziții: ce s-a întâmplat; ce ți s-a spus că înseamnă; ce arată Iisus despre asta. Prima cere fapte, a doua poate conține manipulare, iar a treia se verifică în felul în care El tratează oamenii răniți." },
      { from: "guide", text: "Standardul spus de Iisus este dragostea care poate fi văzută, nu loialitatea care trebuie pretinsă. Când standardul nu a fost respectat, vina nu trece automat la omul rănit." },
    ]},
    { id: "bc4_9", type: "scripture", order: 9, scripture: { text: "Prin aceasta vor cunoaște toți că sunteți ucenicii Mei, dacă veți avea dragoste unii pentru alții.", ref: "Ioan 13:35" } },
    { id: "bc4_10", type: "step", order: 10, bubbles: [
      { from: "guide", text: "Scrie doar faptele, fără explicația pe care ai fost obligat să o accepți. Apoi adaugă propoziția: «Doamne, nu Tu mi-ai făcut asta». Nu trebuie să ierți, să explici sau să revii astăzi." },
    ]},
    { id: "bc4_11", type: "how_god_helps", order: 11, bubbles: [
      { from: "guide", text: "Limita cinstită: o lecție nu poate stabili de la distanță ce s-a întâmplat, nu poate media conflictul și nu poate da sfat pastoral pentru abuz sau infracțiune." },
      { from: "guide", text: "Dacă există violență, abuz sexual, amenințare sau pericol actual, caută siguranță și ajutor real: 112 pentru urgență, 119 pentru protecția copilului și 0800 500 333 pentru violență domestică. Rugăciunea nu înlocuiește protecția." },
    ]},
    { id: "bc4_12", type: "memory_verse", order: 12, scripture: { text: "Isus a auzit că l-au dat afară; și, când l-a găsit...", ref: "Ioan 9:35" } },
  ],
}

export const bisericaL5: Lesson = {
  id: "biserica_l5", courseId: "doctrine_c3_biserica", order: 5,
  title: "De ce nu-mi ajunge să cred singur?", estMinutes: 11,
  anchorRefs: ["Evrei 10:24-25", "Galateni 6:2", "Iacov 5:16"], memoryVerseRef: "Galateni 6:2",
  steps: [
    { id: "bc5_1", type: "hook", order: 1, bubbles: [
      { from: "guide", text: "Poți citi Biblia singur, te poți ruga singur și Îl poți întâlni pe Dumnezeu singur. Atunci de ce să riști din nou dezamăgirea oamenilor?" },
      { from: "guide", text: "Pentru că relația cu Dumnezeu este personală, dar în Noul Testament nu este privată. Sunt lucruri pe care nu le poți primi și nici oferi fără alt om." },
    ]},
    { id: "bc5_2", type: "scripture", order: 2, scripture: { text: "Să veghem unii asupra altora, ca să ne îndemnăm la dragoste și la fapte bune. Să nu părăsim adunarea noastră... ci să ne îndemnăm unii pe alții.", ref: "Evrei 10:24-25" }, bubbles: [
      { from: "guide", text: "Motivul din text nu este bifarea unei prezențe. Este «unii pe alții»: să fii cunoscut, încurajat și chemat înapoi când singur nu mai vezi limpede." },
    ]},
    { id: "bc5_3", type: "truth_simple", order: 3, bubbles: [
      { from: "guide", text: "Singur poți acumula informație. Dar nu îți poți purta singur povara și, în același timp, să experimentezi că altcineva o poartă cu tine." },
      { from: "guide", text: "Nu îți poți spune singur «te cunosc și totuși rămân». Nu poți practica răbdarea, iertarea, slujirea și mărturisirea doar în teorie." },
    ]},
    { id: "bc5_4", type: "scripture", order: 4, scripture: { text: "Purtați-vă sarcinile unii altora și veți împlini astfel legea lui Hristos.", ref: "Galateni 6:2" }, bubbles: [
      { from: "guide", text: "Comunitatea sănătoasă nu este locul în care nimeni nu are poveri. Este locul în care povara nu rămâne proprietatea secretă a unui singur om." },
    ]},
    { id: "bc5_5", type: "world_vs_truth", order: 5, bubbles: [
      { from: "guide", text: "Citirea greșită: «Dumnezeu nu primește credința mea dacă nu particip la un program». Mântuirea nu se câștigă prin prezență, iar o perioadă de retragere pentru vindecare nu te scoate din mâna Lui." },
      { from: "guide", text: "Cealaltă: «fiindcă am fost rănit de oameni, nu mai am nevoie de niciun om». Rana explică protecția, dar izolarea prelungită poate lăsa exact rana fără martor, fără ajutor și fără corectare." },
    ]},
    { id: "bc5_6", type: "choice", order: 6, choice: { prompt: "Care este cel mai mic pas sigur pentru tine?", options: [
      { id: "bc5a", label: "Un singur om matur cu care să vorbesc." },
      { id: "bc5b", label: "Un grup mic pe care să-l observ fără promisiuni." },
      { id: "bc5c", label: "Încă nu pot intra; pot doar să cer ajutor să discern." },
    ]}},
    { id: "bc5_7", type: "truth_simple", order: 7, bubbles: [
      { from: "guide", text: "O comunitate sigură nu cere încredere instantanee. O construiește în timp. Întrebările sunt permise, liderii pot fi corectați, banii sunt transparenți, vulnerabilitatea nu este folosită împotriva omului și nimeni nu cere secrete care protejează răul." },
      { from: "guide", text: "Centrul este Iisus, Scriptura poate corecta pe oricine, iar roada se vede mai ales în felul în care sunt tratați oamenii fără putere." },
    ]},
    { id: "bc5_8", type: "quiz", order: 8, quiz: { question: "Care este un semn al unei comunități sănătoase?", options: [
      { text: "Liderul nu poate fi pus la îndoială", correct: false },
      { text: "Toți promit repede loialitate", correct: false },
      { text: "Întrebările sunt permise, iar responsabilitatea îi include și pe lideri", correct: true },
    ], explanation: "Autoritatea fără responsabilitate și loialitatea cerută înaintea încrederii sunt semne de pericol, nu de maturitate." }},
    { id: "bc5_9", type: "step", order: 9, bubbles: [
      { from: "guide", text: "Nu căuta locul perfect și nu promite nimic astăzi. Alege un pas care poate fi retras în siguranță: o conversație, o vizită, o întrebare despre cum sunt protejați copiii și cum este tras la răspundere un lider." },
      { from: "guide", text: "Observă nu doar ce se spune de pe scenă, ci cum sunt tratați oamenii când spun «nu», pun o întrebare sau anunță o problemă." },
    ]},
    { id: "bc5_10", type: "how_god_helps", order: 10, bubbles: [
      { from: "guide", text: "Limita cinstită: Emanus nu poate recomanda de la distanță o comunitate anume și nu poate garanta că un loc este sigur. Nicio comunitate nu este fără greșeli." },
      { from: "guide", text: "Nu îți spunem să pleci de unde ești și nici să revii unde ai fost rănit. Spunem doar ce arată Noul Testament: credința se trăiește cu alți oameni, iar apropierea poate începe cu unul sau doi, în ritmul în care siguranța este dovedită." },
    ]},
    { id: "bc5_11", type: "prayer", order: 11, bubbles: [
      { from: "guide", text: "«Doamne, dă-mi oameni care mă duc spre Tine fără să mă controleze. Și fă-mă și pe mine un om sigur pentru altcineva.»" },
    ]},
    { id: "bc5_12", type: "memory_verse", order: 12, scripture: { text: "Purtați-vă sarcinile unii altora.", ref: "Galateni 6:2" } },
  ],
}

export const DOCTRINE_BISERICA_LESSONS: Lesson[] = [...DOCTRINE_BISERICA_PART_A, bisericaL4, bisericaL5]
