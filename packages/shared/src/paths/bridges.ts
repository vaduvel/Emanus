/*
 * Punțile — ce se spune la capătul unui parcurs, înainte de Drumul Emaus.
 *
 * Unde stă puntea în lanț
 * -----------------------
 * ușă → siguranță → intrare contextuală → parcurs pastoral → PUNTE →
 * alegere opțională → Umblare
 *
 * Strategia aplicației
 * --------------------
 * Omul poate intra prin cinci locuri: Porți, categorii, Bibliotecă, cele trei
 * lucruri mici de zi cu zi, sau direct pe Drumul Emaus. Cine intră printr-o
 * Poartă sau printr-o categorie și își termină primul parcurs nu se oprește
 * acolo: este dus la Drumul Emaus. Abia după ce încheie drumul și închide
 * harta începe Ucenicia. Puntea este exact locul în care se face predarea.
 *
 * De ce fiecare ușă are puntea ei
 * --------------------------------
 * Un singur text general ar suna a reclamă. Omul care tocmai a ieșit din doliu
 * și omul care tocmai a ieșit din datorii nu pot fi trimiși mai departe cu
 * aceeași propoziție. Fiecare punte vorbește în limba durerii prin care a
 * intrat omul și abia pe urmă arată drumul.
 *
 * Forma fiecărei punți
 * ---------------------
 *   lookBack   — ce a făcut aici, spus scurt și fără lingușire
 *   nameIt     — ce NU s-a terminat; puntea nu minte că s-a rezolvat tot
 *   handoff    — trei replici care deschid Drumul Emaus din durerea lui
 *   invitation — o singură propoziție, invitație, nu îmbrânceală
 *
 * Reguli ținute aici
 * ------------------
 * 1. Nu se citește niciun verset și nu se pune nimic între semne de citare.
 *    Textul din Luca 24 nu a fost încă verificat după Cornilescu 1924, iar
 *    regula casei este limpede: textul se aduce verificat sau nu se pune
 *    deloc. Aici drumul este doar povestit în proză.
 * 2. Nu se numără nimic și nu se dă niciun punctaj (docs/22 §8).
 * 3. Nu se promite vindecare și nu se spune «acum ești gata».
 * 4. Nimeni nu este împins. Fiecare punte lasă loc de «nu acum».
 * 5. Se scriu cu majusculă pronumele pentru Dumnezeu (El, Lui, Se), niciodată
 *    verbele. Deci „fără ca ei să știe cine este", cu ș mic.
 */

export type PathBridge = {
  pathId: string
  title: string
  lookBack: string
  nameIt: string
  handoff: string[]
  invitation: string
}

/*
 * Partea comună a Drumului Emaus, spusă o singură dată aici ca să nu se
 * repete în cincisprezece locuri. Fiecare punte o folosește în a doua replică
 * din handoff, îmbrăcată în durerea ușii ei.
 */
export const EMMAUS_HANDOFF_CORE =
  "Doi oameni mergeau spre un sat, la capătul celei mai negre zile din viața lor. Vorbeau între ei despre ce se prăbușise. Cineva S-a apropiat și a mers alături de ei o bucată bună de drum, fără ca ei să știe cine este."

export const PATH_BRIDGES: PathBridge[] = [
  {
    pathId: "path_acasa",
    title: "Ai intrat înapoi în casă",
    lookBack:
      "Ai venit pe ușa pe care scria «sunt prea murdar» și ai rămas până la capăt. Ai spus lucruri pe care nu le spusesei nimănui.",
    nameIt:
      "Nu îți spun că rușinea a plecat de tot. Se mai întoarce, mai ales seara. Îți spun că acum știi ce să faci când se întoarce.",
    handoff: [
      "Mai este ceva și nu vreau să pleci fără să îți spun.",
      "Doi oameni mergeau spre un sat, la capătul celei mai negre zile din viața lor. Se întorceau acasă cu tot ce credeau ei că s-a terminat. Cineva S-a apropiat și a mers alături de ei, fără ca ei să știe cine este.",
      "Este un drum întreg despre asta, și începe exact de unde ești tu acum: cu un om care se întoarce acasă și nu știe încă cine merge lângă el."
    ],
    invitation:
      "Dacă vrei, mergem pe drumul acela. Dacă nu vrei acum, rămâne deschis și mâine."
  },
  {
    pathId: "path_neiertare",
    title: "Ai pus jos o greutate",
    lookBack:
      "Ai lucrat la ceva ce cei mai mulți oameni ocolesc toată viața. Ai spus cu gura ta ce ți s-a făcut și ce porți de atunci.",
    nameIt:
      "Nu înseamnă că s-a încheiat. Iertarea nu se face o dată, se face de multe ori, pentru același lucru. Iar unele legături rămân rupte și asta nu este vina ta.",
    handoff: [
      "Mai este ceva de spus înainte să ieși de aici.",
      "Doi oameni mergeau spre un sat, la capătul celei mai negre zile din viața lor, și își spuneau unul altuia cât de nedrept fusese tot. Cineva S-a apropiat și a mers alături de ei, fără ca ei să știe cine este.",
      "Nu i-a certat că sunt amărâți. I-a lăsat să vorbească și pe urmă le-a așezat totul altfel. Este un drum întreg despre asta."
    ],
    invitation:
      "Îl putem lua împreună, când vrei tu."
  },
  {
    pathId: "path_divort",
    title: "Ai trecut prin partea cea mai grea",
    lookBack:
      "Ai stat de vorbă despre lucruri pe care mulți le țin ascunse ani de zile: ce s-a rupt, ce te doare și ce crezi că spune Dumnezeu despre tine acum.",
    nameIt:
      "Nu s-a așezat totul. Mai sunt zile grele, iar întrebările despre viitor nu au primit toate un răspuns. Așa este cinstit să îți spun.",
    handoff: [
      "Înainte să închizi, un singur lucru.",
      "Doi oameni mergeau spre un sat, după ce li se năruise tot ce așteptaseră. Nu mai speraseră nimic de la ziua aceea. Cineva S-a apropiat și a mers alături de ei, fără ca ei să știe cine este.",
      "Ce mi se pare cel mai important: nu i-a așteptat să se adune. A mers cu ei așa năruiți cum erau. Este un drum întreg despre asta."
    ],
    invitation:
      "Când te simți în stare, începem drumul. Nu astăzi, dacă nu vrei astăzi."
  },
  {
    pathId: "path_suferinta",
    title: "Nu ai rămas singur în asta",
    lookBack:
      "Ai venit cu o durere care nu are explicație frumoasă și nu ai primit una ieftină. Ai spus întrebările așa cum sunt ele, inclusiv pe cele care supără oamenii.",
    nameIt:
      "Durerea nu a fost luată. Nici nu ți-am promis așa ceva. S-a schimbat doar cine merge cu tine prin ea.",
    handoff: [
      "Mai țin de tine două minute, atât.",
      "Doi oameni mergeau spre un sat, la capătul celei mai negre zile din viața lor. Cineva S-a apropiat și a mers alături de ei o bucată bună de drum, fără ca ei să știe cine este. Și i-a întrebat întâi despre ce vorbesc.",
      "A întrebat, deși știa. Asta face cu durerea: nu o sărește, o ascultă. Este un drum întreg despre asta și trece pe la cruce, nu pe lângă ea."
    ],
    invitation:
      "Dacă vrei să mergem, mergem încet. Nu se grăbește nimeni."
  },
  {
    pathId: "path_temelie",
    title: "Întrebările tale au avut loc aici",
    lookBack:
      "Ai adus îndoieli pe care în alte locuri ești învățat să le ascunzi. Le-am luat pe rând și nu ți-a cerut nimeni să te prefaci că nu le ai.",
    nameIt:
      "Nu ai acum toate răspunsurile și nici nu le vei avea. Ai altceva: știi că poți întreba fără să pierzi ceva.",
    handoff: [
      "Mai este un lucru care ți se potrivește în chip deosebit.",
      "Doi oameni mergeau spre un sat și tocmai își pierduseră tot ce crezuseră. Vorbeau despre nădejdea lor ca despre ceva trecut. Cineva S-a apropiat și a mers alături de ei, fără ca ei să știe cine este.",
      "Nu le-a cerut să creadă mai tare. Le-a deschis Scripturile de la un capăt la altul, până când au văzut singuri. Este un drum întreg despre asta."
    ],
    invitation:
      "Dacă vrei să vezi întregul, de acolo se începe."
  },
  {
    pathId: "path_aproape",
    title: "Tăcerea nu înseamnă plecare",
    lookBack:
      "Ai venit cu uscăciunea și cu senzația că vorbești într-un perete. Ai rămas și ai continuat să vorbești, ceea ce este mai mult decât fac cei mai mulți.",
    nameIt:
      "Poate că încă nu simți mare lucru. Sentimentul se întoarce când se întoarce; nu el este dovada.",
    handoff: [
      "Un singur lucru înainte să pleci.",
      "Doi oameni mergeau spre un sat și Cineva mergea lângă ei, ceas după ceas, fără ca ei să știe cine este. Erau lângă El și nu știau. Și-au dat seama abia mai târziu, seara, la masă.",
      "Deci se poate ca El să fie alături și tu să nu simți nimic. Asta nu este eșecul tău. Este un drum întreg despre asta."
    ],
    invitation:
      "Mergem pe el când vrei. Nu îți cere să simți nimic ca să începi."
  },
  {
    pathId: "path_schimbare",
    title: "Ai spus adevărul întreg",
    lookBack:
      "Ai numit lucrul care te ține, cu cifre și cu vreme, fără să rotunjești în jos. Foarte puțini oameni ajung aici.",
    nameIt:
      "Nu ești liber pentru că ai terminat un parcurs. Drumul este lung, se face cu oameni și, unde trebuie, cu un medic. Pot fi și căderi, iar o cădere nu șterge ce ai făcut.",
    handoff: [
      "Mai am ceva pentru tine, și cred că este partea cea mai bună.",
      "Doi oameni mergeau spre un sat, la capătul celei mai negre zile din viața lor. Cineva S-a apropiat și a mers alături de ei, fără ca ei să știe cine este.",
      "Nu i-a îndreptat, nu le-a ținut predică și nu le-a cerut să se adune întâi. A mers cu ei. Puterea de care ai nevoie nu vine din voința ta, ci de la Cel care merge alături."
    ],
    invitation:
      "Când ești gata, începem drumul acela."
  },
  {
    pathId: "path_tristete",
    title: "Ai răzbit până aici",
    lookBack:
      "Zilele acestea au fost grele și totuși ai deschis de fiecare dată. Nu este un fleac; când ești în tristețe, și lucrurile mici cântăresc mult.",
    nameIt:
      "Dacă încă este greu, nu ai greșit nimic. Tristețea grea nu se rezolvă dintr-un parcurs, iar dacă ține, medicul și psihologul rămân pasul următor, nu un semn de slăbiciune.",
    handoff: [
      "Un singur lucru și te las.",
      "Doi oameni mergeau spre un sat, cu fețele triste, la capătul celei mai negre zile din viața lor. Cineva S-a apropiat și a mers alături de ei, fără ca ei să știe cine este.",
      "Nu le-a spus să zâmbească. A mers cu ei așa triști cum erau, tot drumul. Este un drum întreg despre asta."
    ],
    invitation:
      "Când ai putere, îl începem. Nu se pierde dacă întârzii."
  },
  {
    pathId: "path_anxietate",
    title: "Ai învățat să respiri aici",
    lookBack:
      "Ai lucrat cu frica în loc să fugi de ea. Ai învățat ce faci când te apucă și cui îi spui.",
    nameIt:
      "Frica va mai veni. Nu înseamnă că nu a mers nimic. Înseamnă doar că acum ai unde să te duci cu ea, iar dacă este multă, medicul rămâne pasul următor.",
    handoff: [
      "Încă un lucru, scurt.",
      "Doi oameni mergeau spre un sat, speriați de tot ce se întâmplase în ziua aceea și fără să știe ce urmează. Cineva S-a apropiat și a mers alături de ei, fără ca ei să știe cine este.",
      "Nu le-a spus «nu vă mai temeți» și atât. A mers cu ei până s-a făcut seară. Este un drum întreg despre asta."
    ],
    invitation:
      "Dacă vrei, îl luăm pe bucăți mici. Așa este făcut."
  },
  {
    pathId: "path_greutate",
    title: "Ai dus greul până la capăt",
    lookBack:
      "Ai venit cu o povară și nu ai fugit de ea. Ai spus-o și ai rămas până la ultima zi.",
    nameIt:
      "Povara poate fi încă acolo. Nu ți-am promis că se ridică la comandă. Ți-am arătat cine o duce împreună cu tine.",
    handoff: [
      "Un ultim lucru.",
      "Doi oameni mergeau spre un sat, la capătul celei mai negre zile din viața lor. Cineva S-a apropiat și a mers alături de ei, fără ca ei să știe cine este.",
      "Cu asta începe un drum întreg, și este cel mai bun lucru pe care ți-l pot da de aici."
    ],
    invitation:
      "Când vrei, îl deschidem."
  },
  {
    pathId: "path_har",
    title: "Nu mai plătești pentru un loc",
    lookBack:
      "Ai venit crezând că ești iubit cât de bun ești. Ai lucrat exact la asta, care este credința greșită cea mai greu de scos din om.",
    nameIt:
      "Vechiul obicei se întoarce. Te vei surprinde iar ținând socoteala. Diferența este că acum îți dai seama.",
    handoff: [
      "Mai am un lucru și este exact pe măsura ta.",
      "Doi oameni mergeau spre un sat, după ce dăduseră greș în tot ce speraseră. Nu făcuseră nimic ca să merite ce a urmat. Cineva S-a apropiat și a mers alături de ei, fără ca ei să știe cine este.",
      "El a venit la ei, nu ei la El. Așa lucrează harul, și este un drum întreg despre asta."
    ],
    invitation:
      "Nu trebuie să fii pregătit ca să începi. Asta era și ideea."
  },
  {
    pathId: "path_impreuna",
    title: "Nu mai ești singur în sală",
    lookBack:
      "Ai venit din singurătate sau dintr-o respingere și ai lucrat la partea cea mai grea: să te apropii din nou de oameni, după ce te-au durut.",
    nameIt:
      "Poate încă nu ai pe nimeni. Un parcurs nu îți aduce prieteni; îți arată doar de unde încep. Restul cere timp și câteva încercări.",
    handoff: [
      "Un singur lucru și am terminat.",
      "Doi oameni mergeau spre un sat, la capătul celei mai negre zile din viața lor. Erau doi, nu unul. Cineva S-a apropiat și a mers alături de ei, fără ca ei să știe cine este.",
      "Iar la capăt, când L-au cunoscut, primul lucru pe care l-au făcut a fost să se întoarcă la ai lor și să le spună. Drumul acesta se termină în oameni, nu în singurătate."
    ],
    invitation:
      "Dacă vrei să vezi tot drumul, începem când îmi spui."
  },
  {
    pathId: "path_legatura",
    title: "Ai încercat, și asta contează",
    lookBack:
      "Ai venit dintr-o legătură ruptă și nu ai fugit de partea ta. Ai spus și ce ți s-a făcut, și ce ai făcut.",
    nameIt:
      "Poate nu s-a reparat. Unele legături nu se refac, iar împăcarea nu depinde numai de tine. Ai făcut ce ținea de tine și atât ți se cerea.",
    handoff: [
      "Mai rămâi o clipă, atât.",
      "Doi oameni mergeau spre un sat și vorbeau între ei despre tot ce se stricase. Cineva S-a apropiat și a mers alături de ei, fără ca ei să știe cine este.",
      "S-a băgat în vorba lor și i-a întrebat despre ce este cearta. Așa intră în legăturile stricate: întrebând, nu dând verdicte. Este un drum întreg despre asta."
    ],
    invitation:
      "Când vrei, mergem pe el împreună."
  },
  {
    pathId: "path_paine",
    title: "Valorezi mai mult decât aduci în casă",
    lookBack:
      "Ai venit numărându-te în lei și în ore muncite. Ai lucrat la grijă, la rușinea de a nu ajunge și la ce crezi că valorezi.",
    nameIt:
      "Banii nu s-au făcut mai mulți și nu ți-am promis asta niciodată. S-a schimbat cine ține socoteala pentru tine.",
    handoff: [
      "Un singur lucru și închidem.",
      "Doi oameni mergeau spre un sat, la capătul celei mai negre zile din viața lor. Cineva S-a apropiat și a mers alături de ei, fără ca ei să știe cine este.",
      "L-au cunoscut abia seara, la masă, când a luat pâinea și a frânt-o. Nu într-o predică, ci la masă, la lucrul cel mai obișnuit din lume. Este un drum întreg despre asta."
    ],
    invitation:
      "Dacă vrei să vezi unde duce, de aici pornim."
  },
  {
    pathId: "path_umblare",
    title: "Ai așezat un ritm",
    lookBack:
      "Ai lucrat la umblarea de fiecare zi, care este partea cea mai puțin spectaculoasă și cea mai de folos.",
    nameIt:
      "Vor veni zile în care nu deschizi și săptămâni în care uiți. Nu se strică nimic. Te întorci de unde ai rămas, fără să plătești nimic pentru lipsa ta.",
    handoff: [
      "Și acum partea pentru care erau bune toate astea.",
      "Doi oameni mergeau spre un sat și Cineva a mers alături de ei, lămurindu-le Scripturile pe tot drumul, fără ca ei să știe cine este.",
      "Mai târziu și-au spus unul altuia că le ardea inima în ei când le vorbea pe drum. Umblarea zilnică la asta duce, și drumul îl poți lua acum."
    ],
    invitation:
      "Este pasul următor și te așteaptă."
  }
]

/*
 * Căutare după pathId. Întoarce undefined pentru un parcurs fără punte scrisă,
 * ca ecranul de final să poată cădea înapoi pe textul lui obișnuit.
 */
export function bridgeForPath(pathId: string): PathBridge | undefined {
  return PATH_BRIDGES.find((bridge) => bridge.pathId === pathId)
}
