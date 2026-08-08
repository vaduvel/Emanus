import type { Lesson } from "../domain.js"

/*
 * TEMELIA — camera 3. Lecțiile 4-5. Vezi antetul din `temelieA.ts`.
 *
 * Lecția 4 pune pretențiile lui Iisus înainte de orice cerere de decizie.
 * Lecția 5 e scrisă pentru ușa `alte_credinte` și se poartă cu respect:
 * nu se râde de nimeni, nu se cere niciun ritual, nicio ardere de obiecte și
 * nicio listă de fapte. Conține trimiterea la un om real și la 116 123 pentru
 * cine rămâne cu frică (docs/22 §1: nu diagnosticăm și nu punem vina pe om).
 */

export const temelieL4: Lesson = {
  id: "temelie_l4",
  courseId: "path_temelie",
  order: 4,
  title: "Nu o religie, un Om",
  estMinutes: 12,
  anchorRefs: ["Marcu 2:1-12", "Ioan 8:56-59"],
  memoryVerseRef: "Ioan 14:6",
  steps: [
    {
      id: "t4_1",
      type: "check_in",
      order: 1,
      choice: {
        prompt: "Cine crezi că a fost Iisus? Răspunde cum gândeai înainte de lecția asta.",
        options: [
          {
            id: "t4_c_invatator",
            label: "Un învățător bun",
            feedback: "E cea mai comodă variantă. Vedem azi dacă a lăsat-o pe masă.",
          },
          {
            id: "t4_c_legenda",
            label: "Un personaj în mare parte legendar",
            feedback: "Atunci uită-te azi la ce se pretinde în text, indiferent cine l-a scris.",
          },
          {
            id: "t4_c_fiul",
            label: "Fiul lui Dumnezeu",
            feedback: "Bine. Lecția îți arată de unde vine asta, nu doar că se spune.",
          },
          {
            id: "t4_c_nimic",
            label: "Nu m-am gândit niciodată serios",
            feedback: "Atunci azi e prima dată. Nu e târziu.",
          },
        ],
      },
    },
    {
      id: "t4_2",
      type: "hook",
      order: 2,
      bubbles: [
        { from: "guide", text: "Creștinismul nu începe cu un set de reguli. Începe cu o persoană." },
        {
          from: "guide",
          text: "Și persoana asta a spus despre sine niște lucruri care nu se pot trece cu vederea politicos.",
        },
      ],
    },
    {
      id: "t4_3",
      type: "scripture",
      order: 3,
      bubbles: [
        {
          from: "guide",
          text: "Patru oameni au desfăcut acoperișul unei case ca să coboare un paralitic în fața Lui. Toată lumea aștepta o vindecare. El spune altceva:",
        },
      ],
      scripture: {
        text: "«Fiule, păcatele îți sunt iertate!» Unii din cărturari, care erau de față, se gândeau în inimile lor: «Cum vorbește Omul acesta astfel? Hulește! Cine poate să ierte păcatele decât numai Dumnezeu?»",
        ref: "Marcu 2:5-7",
      },
    },
    {
      id: "t4_4",
      type: "truth_simple",
      order: 4,
      bubbles: [
        { from: "guide", text: "Cărturarii nu s-au supărat pentru că a fost bun cu omul." },
        {
          from: "guide",
          text: "S-au supărat pentru că iertarea unui păcat făcut altcuiva nu e treaba unui trecător. Au înțeles perfect ce spunea.",
        },
      ],
    },
    {
      id: "t4_5",
      type: "step",
      order: 5,
      bubbles: [
        {
          from: "guide",
          text: "Și apoi a făcut ceva verificabil pe loc, tocmai ca să nu rămână la vorbe:",
        },
      ],
      scripture: {
        text: "«Dar, ca să știți că Fiul omului are putere pe pământ să ierte păcatele — Ție îți poruncesc», a zis El slăbănogului, «scoală-te, ridică-ți patul și du-te acasă.»",
        ref: "Marcu 2:10-11",
      },
    },
    {
      id: "t4_6",
      type: "world_vs_truth",
      order: 6,
      bubbles: [
        { from: "guide", text: "Ce se spune: a fost un învățător bun, ca mulți alții." },
        {
          from: "guide",
          text: "Un învățător bun nu iartă păcate făcute altcuiva, nu primește închinare și nu spune despre sine ce urmează.",
        },
      ],
    },
    {
      id: "t4_7",
      type: "scripture",
      order: 7,
      scripture: {
        text: "Iisus le-a zis: «Adevărat, adevărat vă spun că, mai înainte ca să se nască Avraam, sunt Eu.» La auzul acestor vorbe, au luat pietre ca să arunce în El.",
        ref: "Ioan 8:58-59",
      },
    },
    {
      id: "t4_8",
      type: "truth_simple",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text: "«Eu sunt» e numele pe care Dumnezeu Îl dă lui Moise la rugul aprins. Ascultătorii Lui știau asta pe de rost.",
        },
        {
          from: "guide",
          text: "Au ridicat pietre în aceeași secundă. Pentru ei nu era o metaforă frumoasă.",
        },
      ],
    },
    {
      id: "t4_9",
      type: "quiz",
      order: 9,
      quiz: {
        question: "De ce au ridicat pietre după Ioan 8:58?",
        options: [
          { text: "Pentru că vorbea prea mult în public", correct: false },
          { text: "Pentru că a folosit despre Sine numele lui Dumnezeu", correct: true },
          { text: "Pentru că vindecase în ziua de sabat", correct: false },
        ],
        explanation: "Reacția lor arată ce au înțeles. Nimeni nu ridică pietre pentru o metaforă.",
      },
    },
    {
      id: "t4_10",
      type: "multi_choice",
      order: 10,
      multiChoice: {
        prompt:
          "Dacă cineva spune despre sine lucrurile astea, câte variante rămân pe masă? Bifează ce ți se pare posibil.",
        minSelections: 1,
        options: [
          {
            id: "t4_m_mint",
            label: "A mințit, știind că minte",
            feedback: "E o variantă. Atunci a murit pentru o minciună pe care o putea retrage.",
          },
          {
            id: "t4_m_gresit",
            label: "S-a înșelat pe sine",
            feedback: "E o variantă. Atunci a fost un om profund tulburat, nu un învățător de morală.",
          },
          {
            id: "t4_m_adevar",
            label: "A spus adevărul",
            feedback: "E o variantă. Și e singura în care restul are sens.",
          },
          {
            id: "t4_m_bun",
            label: "A fost doar un învățător bun",
            feedback:
              "Asta e singura variantă pe care El nu a lăsat-o pe masă. Nu poți păstra bunătatea și arunca pretenția — sunt în aceeași propoziție.",
          },
        ],
      },
    },
    {
      id: "t4_11",
      type: "how_god_helps",
      order: 11,
      bubbles: [
        { from: "guide", text: "De ce contează asta pentru tine, azi?" },
        {
          from: "guide",
          text: "Pentru că schimbă întrebarea. Nu «pot să țin niște reguli?», ci «am de-a face cu o Persoană?».",
        },
        { from: "guide", text: "Regulile nu caută pe nimeni. O Persoană, da." },
      ],
    },
    {
      id: "t4_12",
      type: "memory_verse",
      order: 12,
      scripture: {
        text: "Iisus i-a zis: «Eu sunt calea, adevărul și viața. Nimeni nu vine la Tatăl decât prin Mine.»",
        ref: "Ioan 14:6",
      },
    },
    {
      id: "t4_13",
      type: "prayer",
      order: 13,
      bubbles: [
        {
          from: "guide",
          text: "«Dacă ești cine ai spus că ești, vreau să Te cunosc ca pe o persoană, nu ca pe o idee. Dacă nu ești, nu vreau să mă mint singur.»",
        },
      ],
    },
    {
      id: "t4_14",
      type: "journal",
      order: 14,
      journalPrompt: "Care dintre cele patru variante ți-e cel mai greu să o elimini? Scrie de ce.",
      reward: { xp: 0 },
    },
  ],
}

export const temelieL5: Lesson = {
  id: "temelie_l5",
  courseId: "path_temelie",
  order: 5,
  title: "Energii, karma, univers: ce era adevărat și ce nu",
  estMinutes: 13,
  anchorRefs: ["Fapte 17:22-28", "Coloseni 1:16-17"],
  memoryVerseRef: "Fapte 17:27",
  steps: [
    {
      id: "t5_1",
      type: "check_in",
      order: 1,
      bubbles: [
        { from: "guide", text: "Lecția asta se poartă cu respect. Nu se râde de nimeni aici." },
        {
          from: "guide",
          text: "Nu ți se cere să povestești nimănui ce ai făcut și nu ți se cere nicio listă.",
        },
      ],
      choice: {
        prompt: "Ce ai crezut sau ai practicat? Alege ce se apropie cel mai mult.",
        options: [
          { id: "t5_c_energii", label: "Energii, vindecare, cristale" },
          { id: "t5_c_karma", label: "Karma și reîncarnare" },
          { id: "t5_c_univers", label: "«Universul» ca putere care răspunde" },
          { id: "t5_c_astro", label: "Astrologie, numerologie, tarot" },
          { id: "t5_c_amestec", label: "Nimic anume, un amestec din toate" },
        ],
      },
    },
    {
      id: "t5_2",
      type: "hook",
      order: 2,
      bubbles: [
        { from: "guide", text: "Cei mai mulți oameni nu ajung acolo din prostie." },
        {
          from: "guide",
          text: "Ajung pentru că au simțit că e mai mult decât materie și pentru că nimeni din biserică nu le-a răspuns la întrebare.",
        },
      ],
    },
    {
      id: "t5_3",
      type: "truth_simple",
      order: 3,
      bubbles: [
        { from: "guide", text: "Începem cu ce ai avut dreptate. Trei lucruri, și nu sunt mici." },
        { from: "guide", text: "Că există mai mult decât ce se vede. Adevărat." },
        { from: "guide", text: "Că faptele au consecințe reale, nu doar sociale. Adevărat." },
        {
          from: "guide",
          text: "Că simți că e ceva de curățat în tine. Adevărat, și e cea mai importantă dintre cele trei.",
        },
      ],
    },
    {
      id: "t5_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        { from: "guide", text: "Ce se spune: toate drumurile duc în același loc." },
        {
          from: "guide",
          text: "Ce se vede când te uiți de aproape: seamănă la întrebări și diferă complet la răspuns. Nu e o nuanță.",
        },
      ],
    },
    {
      id: "t5_5",
      type: "scripture",
      order: 5,
      bubbles: [
        {
          from: "guide",
          text: "Pavel ajunge în Atena, un oraș plin de altare pentru zei străini. Uită-te cum începe:",
        },
      ],
      scripture: {
        text: "«Bărbați atenieni! În toate privințele vă găsesc foarte religioși. Căci, pe când străbăteam cetatea voastră și mă uitam la lucrurile la care vă închinați voi, am descoperit chiar și un altar pe care este scris: „Unui Dumnezeu necunoscut!” Ei bine, ceea ce voi cinstiți fără să cunoașteți, aceea vă vestesc eu.»",
        ref: "Fapte 17:22-23",
      },
    },
    {
      id: "t5_6",
      type: "truth_simple",
      order: 6,
      bubbles: [
        { from: "guide", text: "Pavel nu a râs de ei și nu le-a spus că sunt proști." },
        {
          from: "guide",
          text: "A pornit de la un altar pe care îl aveau deja și, câteva versete mai jos, le citează propriii poeți.",
        },
        { from: "guide", text: "Căutarea lor nu era greșită. Adresa era." },
      ],
    },
    {
      id: "t5_7",
      type: "how_god_helps",
      order: 7,
      bubbles: [
        { from: "guide", text: "Acum diferența, pe scurt, fără politețuri." },
        {
          from: "guide",
          text: "Karma spune: plătești tu, până se echilibrează. Nu se termină niciodată, pentru că nu poți plăti înapoi ce ai făcut deja.",
        },
        {
          from: "guide",
          text: "Crucea spune: a plătit Altcineva, o dată, definitiv. De asta creștinismul nu are trepte de purificare și nu are vieți următoare în care să repari.",
        },
        {
          from: "guide",
          text: "Iar «universul» nu are nume și nu are față. Nu poți vorbi cu o forță și nu poți fi iubit de o lege. Aici, Dumnezeu are un nume și S-a arătat într-un Om.",
        },
      ],
    },
    {
      id: "t5_8",
      type: "scripture",
      order: 8,
      scripture: {
        text: "Pentru că prin El au fost făcute toate lucrurile care sunt în ceruri și pe pământ, cele văzute și cele nevăzute… Toate au fost făcute prin El și pentru El. El este mai înainte de toate lucrurile și toate se țin prin El.",
        ref: "Coloseni 1:16-17",
      },
    },
    {
      id: "t5_9",
      type: "quiz",
      order: 9,
      quiz: {
        question: "Care e diferența de fond dintre karma și cruce?",
        options: [
          { text: "Cine plătește", correct: true },
          { text: "Cât de repede vine consecința", correct: false },
          { text: "Nu e nicio diferență reală", correct: false },
        ],
        explanation:
          "Amândouă spun că fapta contează. Una spune că plătești tu, la nesfârșit. Cealaltă spune că s-a plătit deja, o dată.",
      },
    },
    {
      id: "t5_10",
      type: "reflection",
      order: 10,
      bubbles: [
        { from: "guide", text: "Nu contează atât ce ai practicat. Contează ce căutai când ai mers acolo." },
      ],
      response: {
        prompt: "Ce căutai, de fapt? Un rând.",
        placeholder: "Liniște, control, un semn, o vindecare, o explicație…",
        required: false,
        minLength: 3,
      },
    },
    {
      id: "t5_11",
      type: "step",
      order: 11,
      bubbles: [
        {
          from: "guide",
          text: "Nu îți cerem niciun ritual, nu îți cerem să arzi nimic și nu îți cerem o listă cu ce ai făcut. Cine îți cere asta ca să fii primit, îți cere greșit.",
        },
        {
          from: "guide",
          text: "Dacă ai rămas cu frică, cu coșmaruri sau cu senzația că nu ești liber, vorbește cu un om real — un păstor, un consilier. Nu cu o aplicație. Noi nu putem face asta de aici.",
        },
        {
          from: "guide",
          text: "Iar dacă frica te ține treaz nopți la rând, mergi și la medic. Poți suna 116 123, gratuit, oricând. Nu e lipsă de credință.",
        },
        {
          from: "guide",
          text: "Pasul de azi e o propoziție: «Vreau să vorbesc cu Cineva care are nume, nu cu o forță.»",
        },
      ],
    },
    {
      id: "t5_12",
      type: "memory_verse",
      order: 12,
      scripture: {
        text: "…ca ei să caute pe Dumnezeu și să se silească să-L găsească bâjbâind, măcar că nu este departe de fiecare din noi.",
        ref: "Fapte 17:27",
      },
    },
    {
      id: "t5_13",
      type: "prayer",
      order: 13,
      bubbles: [
        {
          from: "guide",
          text: "«Am căutat în locuri în care nu erai. Nu am căutat degeaba, dar am căutat greșit. Dacă ai un nume, spune-mi-l Tu.»",
        },
      ],
    },
    {
      id: "t5_14",
      type: "journal",
      order: 14,
      journalPrompt:
        "Ce ți-a dat, concret, ce ai practicat înainte? Și ce nu ți-a dat niciodată, oricât ai fi încercat?",
      bubbles: [{ from: "guide", text: "Rămâne pe telefonul tău. Nu îl citește nimeni." }],
      reward: { xp: 0 },
    },
  ],
}
