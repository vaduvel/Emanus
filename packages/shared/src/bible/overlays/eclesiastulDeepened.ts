import type { ExplainedOverlayChapter } from "../explainedOverlay.js"

const n = {
  kind: "biblia-emanus" as const,
  note: "rezumat textual fără doctrină adăugată" as const,
}

export const ECLESIASTUL_DEEPENED: Readonly<Record<number, ExplainedOverlayChapter>> = {
  4: {
    number: 4,
    title: "Asuprire, rivalitate și valoarea tovărășiei",
    summary: "Qohelet privește lacrimile celor asupriți, competiția care împinge munca, singurătatea omului care acumulează fără cineva apropiat și avantajul a doi oameni care se pot ajuta. Finalul observă cât de trecătoare este și popularitatea politică.",
    units: [
      { from: 1, to: 3, heading: "Lacrimile celor asupriți și lipsa unui mângâietor", teaching: "Qohelet privește direct spre cei apăsați și repetă faptul că nu au mângâietor, în timp ce puterea stă de partea asupritorilor. Limbajul foarte întunecat despre morți și cei încă nenăscuți exprimă oroarea unei lumi în care nedreptatea pare fără ieșire; nu este o poruncă de a disprețui viața, ci o observație radicală asupra suferinței «sub soare».", source: n },
      { from: 4, to: 8, heading: "Munca din rivalitate și acumularea fără relație nu aduc odihnă", teaching: "Priceperea și munca pot fi alimentate de comparație și invidie, ceea ce transformă succesul într-o altă formă de deșertăciune. Qohelet nu laudă lenevia: nebunul care își încrucișează mâinile se distruge. Dar nici cele două mâini pline de trudă fără odihnă nu sunt idealul. Omul singur care acumulează fără copil sau frate este întrebat pentru cine își refuză binele vieții.", source: n },
      { from: 9, to: 12, heading: "Doi se pot ridica, încălzi și apăra mai bine decât unul", teaching: "Avantajul tovărășiei este descris prin situații concrete: munca are rod comun, cel căzut poate fi ridicat, frigul este suportat împreună, iar atacul este mai greu împotriva celor uniți. Funia împletită în trei fire întărește imaginea rezistenței prin legături multiple; textul vorbește despre valoarea relației, nu despre o formulă numerică obligatorie pentru orice situație.", source: n },
      { from: 13, to: 16, heading: "Înțelepciunea poate ridica un om sărac, dar popularitatea politică rămâne trecătoare", teaching: "Un tânăr sărac și înțelept poate fi mai bun decât un rege bătrân care nu mai primește sfat. Qohelet observă cât de repede se poate schimba ordinea socială și cât de mare poate deveni mulțimea din jurul noului conducător. Totuși generația următoare poate să nu se mai bucure de el; succesul public nu scapă de caracterul trecător al vieții sub soare.", source: n },
    ],
  },
  6: {
    number: 6,
    title: "Bogăția fără puterea de a te bucura și dorința care nu se satură",
    summary: "Capitolul descrie omul care primește bogăție, onoare și familie, dar nu poate gusta binele lor. Dorința continuă poate transforma belșugul într-o altă formă de gol, iar omul rămâne limitat în fața lucrurilor pe care nu le poate controla sau cunoaște.",
    units: [
      { from: 1, to: 2, heading: "Poți avea resurse fără să poți primi bucuria lor", teaching: "Qohelet numește un rău greu situația în care Dumnezeu îi permite omului să aibă bogăție, avere și onoare, dar omul nu ajunge să se bucure de ele, iar altul le consumă. Distincția este importantă: posesia și capacitatea de a primi binele din ceea ce ai nu sunt același lucru.", source: n },
      { from: 3, to: 6, heading: "Viața lungă și familia numeroasă nu pot compensa lipsa binelui trăit", teaching: "Chiar o sută de copii și mulți ani sunt puse sub semnul întrebării dacă omul nu se bucură de bine și ajunge la moarte fără odihnă sau onoare. Comparația dură cu copilul născut mort exprimă cât de inutilă îi pare lui Qohelet o existență foarte lungă care nu ajunge niciodată să primească binele ei. Textul reflectă perspectiva sa asupra vieții trecătoare și nu diminuează valoarea persoanelor care au murit înainte de naștere.", source: n },
      { from: 7, to: 9, heading: "Apetitul continuă, iar dorința care rătăcește poate consuma viața", teaching: "Omul muncește pentru gură, dar apetitul nu ajunge niciodată la o satisfacție finală. Înțeleptul și nebunul, bogatul și săracul rămân în aceeași condiție de dorință. Qohelet preferă ceea ce ochii pot primi în prezent poftei care rătăcește fără capăt după ceea ce nu are.", source: n },
      { from: 10, to: 12, heading: "Omul nu poate disputa ca egal cu Cel mai puternic și nu cunoaște tot viitorul", teaching: "Ceea ce există a fost deja numit, iar omul rămâne om, incapabil să câștige o dispută cu Cel mai puternic. Multe cuvinte nu elimină deșertăciunea. Capitolul se încheie cu două limite: omul nu știe singur ce este cel mai bun pentru toate zilele vieții sale și nu poate spune complet ce va fi după el sub soare.", source: n },
    ],
  },
  8: {
    number: 8,
    title: "Înțelepciune sub autoritate și nedreptatea pe care omul nu o poate explica deplin",
    summary: "Qohelet discută purtarea înaintea regelui, limitele puterii omului asupra morții și situațiile în care cei răi primesc temporar onoare, iar cei drepți suferă. El se întoarce la limita înțelepciunii de a descifra toate lucrările lui Dumnezeu.",
    units: [
      { from: 1, to: 5, heading: "Înțelepciunea schimbă purtarea omului înaintea autorității", teaching: "Înțelepciunea luminează fața și schimbă asprimea omului. Qohelet sfătuiește ascultare față de porunca regelui și prudență în prezența puterii, mai ales când un jurământ față de Dumnezeu este implicat. Totuși textul nu declară orice ordin regal moral prin simplul fapt că este ordin; tema este discernământul omului aflat într-o structură de autoritate.", source: n },
      { from: 6, to: 9, heading: "Timpul, viitorul și moartea pun limite oricărei puteri omenești", teaching: "Există timp și judecată pentru lucruri, dar omul nu cunoaște viitorul și nu controlează momentul în care acesta vine. Nimeni nu stăpânește vântul sau duhul, nimeni nu are autoritate absolută asupra zilei morții și nimeni nu poate scăpa prin răutate de toate consecințele. Chiar exercitarea puterii de către un om asupra altuia poate ajunge spre răul celui puternic.", source: n },
      { from: 10, to: 14, heading: "Întârzierea judecății poate încuraja răul, iar experiența vizibilă nu pare întotdeauna dreaptă", teaching: "Qohelet vede oameni răi îngropați cu onoare și observă că atunci când sentința împotriva răului nu vine repede, inima oamenilor poate deveni mai îndrăzneață în păcat. El afirmă totuși că binele aparține celui care se teme de Dumnezeu, deși observă sub soare situații în care drepții primesc ceea ce pare soarta răilor și răii primesc ceea ce pare soarta drepților. Cartea nu cosmetizează această tensiune.", source: n },
      { from: 15, to: 17, heading: "Bucuria simplă este primită în timp ce misterul lucrării lui Dumnezeu rămâne", teaching: "În fața lucrurilor pe care nu le poate explica, Qohelet recomandă primirea mâncării, băuturii și bucuriei care însoțesc munca în zilele date omului. Apoi recunoaște limita cercetării: omul poate veghea zi și noapte, poate pretinde că știe, dar nu descoperă complet lucrarea lui Dumnezeu sub soare. Înțelepciunea autentică include recunoașterea lucrurilor pe care nu le poate controla sau explica.", source: n },
    ],
  },
  9: {
    number: 9,
    title: "Moartea comună, valoarea vieții prezente și înțelepciunea care poate fi ignorată",
    summary: "Qohelet privește faptul că drepții și răii mor deopotrivă, apoi îndeamnă omul să primească viața, mâncarea, relațiile și munca drept daruri în timpul pe care îl are. Finalul arată că înțelepciunea poate salva o cetate și totuși să fie repede uitată.",
    units: [
      { from: 1, to: 6, heading: "Privită numai sub soare, moartea îi ajunge pe toți", teaching: "Qohelet pune faptele celor drepți și înțelepți în mâna lui Dumnezeu, dar observă că experiența imediată nu îi permite omului să citească simplu iubirea sau ura din împrejurări. Curat și necurat, bun și păcătos ajung deopotrivă la moarte. Limbajul despre cei morți care nu mai participă la ceea ce se întâmplă sub soare descrie perspectiva existenței pământești și nu anulează revelația biblică despre înviere și judecată.", source: n },
      { from: 7, to: 10, heading: "Primește hrana, bucuria, iubirea și munca în timpul vieții pe care o ai", teaching: "În fața caracterului trecător al vieții, Qohelet nu recomandă abandonul, ci primirea lucrurilor simple: pâine, băutură, haine, relația cu persoana iubită și munca. Bucuria nu este prezentată ca negare a morții, ci ca răspuns la faptul că zilele sunt limitate. Ceea ce mâna găsește de făcut trebuie făcut cu puterea disponibilă, pentru că oportunitățile acestei vieți nu rămân la nesfârșit.", source: n },
      { from: 11, to: 12, heading: "Rezultatul nu aparține automat celui mai rapid, puternic sau priceput", teaching: "Cursa nu este câștigată întotdeauna de cel mai rapid și nici războiul de cel mai tare. Înțelepciunea, bogăția și priceperea nu elimină timpul și împrejurările care îi ating pe oameni. Omul nici nu își cunoaște momentul, iar calamitatea poate veni pe neașteptate ca plasa peste pești sau lațul peste păsări.", source: n },
      { from: 13, to: 18, heading: "Înțelepciunea poate salva și totuși rămâne fără recunoaștere", teaching: "Qohelet povestește despre o cetate mică amenințată de un rege puternic și un om sărac a cărui înțelepciune o salvează. Totuși omul este uitat. Înțelepciunea este mai bună decât puterea, dar cuvintele săracului pot fi disprețuite. Cuvintele liniștite ale înțeleptului valorează mai mult decât strigătul conducătorului nebunilor, iar un singur păcătos poate distruge mult bine.", source: n },
    ],
  },
  10: {
    number: 10,
    title: "Puțină nebunie poate strica multă onoare",
    summary: "Capitolul adună observații despre nebunie în conducere, răspunsul calm la mânia superiorului, munca făcută fără pricepere, vorbirea nebunului și o societate slăbită de lideri imaturi și administrare neglijentă.",
    units: [
      { from: 1, to: 4, heading: "O greșeală mică poate cântări greu, iar calmul poate opri escaladarea", teaching: "Muștele moarte care strică parfumul devin imagine pentru puțina nebunie care poate cântări mai mult decât multă înțelepciune și onoare. Orientarea inimii celui înțelept și a nebunului merge în direcții opuse și se face vizibilă chiar pe drum. Dacă mânia conducătorului se ridică, Qohelet recomandă să nu abandonezi impulsiv locul, deoarece calmul poate liniști greșeli mari.", source: n },
      { from: 5, to: 10, heading: "Ordinea socială se poate răsturna, iar munca fără pricepere mărește pericolul", teaching: "Qohelet vede nebunia ridicată în poziții înalte și oameni potriviți așezați jos. Slujitori călare și prinți mergând pe jos exprimă această inversare. Apoi imaginile gropii, zidului, pietrei și lemnului arată că munca are riscuri reale. Fierul neascuțit cere mai multă forță; înțelepciunea ajută omul să lucreze mai eficient și mai sigur.", source: n },
      { from: 11, to: 15, heading: "Vorbirea nebunului îl consumă și se extinde dincolo de ceea ce poate cunoaște", teaching: "Farmecul nu ajută dacă șarpele a mușcat deja; competența aplicată prea târziu nu repară orice consecință. Cuvintele înțeleptului aduc favoare, dar buzele nebunului îl înghit. Vorbirea lui începe în nebunie și se termină în răutate, iar numărul mare de cuvinte nu îi oferă cunoașterea viitorului. Munca lui îl obosește tocmai pentru că nu știe nici drumul de bază.", source: n },
      { from: 16, to: 20, heading: "Conducerea imatură și neglijența slăbesc o țară și o casă", teaching: "O țară suferă când conducerea este imatură și își organizează viața în jurul ospățului, în timp ce conducerea disciplinată știe când este timpul potrivit pentru masă și responsabilitate. Lenea lasă grinzile să se lase și casa să picure. Banii sunt descriși realist ca răspunzând multor nevoi materiale, fără a fi transformați în bine suprem. Finalul avertizează asupra vorbirii nechibzuite despre cei puternici, pentru că vorbele pot călători mai departe decât crede omul.", source: n },
    ],
  },
  11: {
    number: 11,
    title: "Acționează în mijlocul incertitudinii și amintește-ți că tinerețea trece",
    summary: "Qohelet folosește imagini ale comerțului, semănatului și vremii pentru a spune că omul nu controlează toate rezultatele și totuși trebuie să lucreze. Finalul cheamă tânărul să se bucure de viață fără să uite responsabilitatea înaintea lui Dumnezeu.",
    units: [
      { from: 1, to: 2, heading: "Împarte și investește fără iluzia că poți prevedea tot răul viitor", teaching: "Imaginea pâinii trimise pe ape și împărțirea unei părți către șapte sau opt oameni exprimă acțiune și distribuirea riscului într-un viitor necunoscut. Qohelet nu oferă o formulă financiară precisă, ci subliniază că omul trebuie să lucreze și să împartă fără să pretindă că știe ce nenorocire va veni pe pământ.", source: n },
      { from: 3, to: 6, heading: "Cel care așteaptă condiții perfecte nu va semăna", teaching: "Norii, ploaia, căderea copacului și vântul arată o lume în care multe procese nu sunt controlate de om. Dacă agricultorul urmărește continuu vântul perfect, nu seamănă; dacă se teme de fiecare nor, nu seceră. După cum omul nu cunoaște complet drumul vântului sau formarea vieții în pântece, nu cunoaște toate lucrările lui Dumnezeu. Tocmai de aceea este chemat să semene dimineața și să nu își odihnească mâna seara.", source: n },
      { from: 7, to: 8, heading: "Lumina este plăcută, dar multe zile nu elimină realitatea întunericului", teaching: "Viața și vederea luminii sunt numite bune. Omul care trăiește mulți ani este chemat să se bucure de ei, dar și să își amintească zilele întunericului. Bucuria lucidă nu neagă moartea; tocmai conștiența limitei face ca prezentul să fie primit fără pretenția că va dura pentru totdeauna.", source: n },
      { from: 9, to: 10, heading: "Tinerețea poate fi trăită cu bucurie, dar nu fără răspundere", teaching: "Tânărul este chemat să se bucure de tinerețe și să își urmeze drumul cu ochii deschiși, însă propoziția despre judecata lui Dumnezeu pune limite dorinței. Bucuria nu este licență pentru rău. Mânia și răul trebuie îndepărtate, pentru că tinerețea și zorii vieții sunt și ele trecătoare.", source: n },
    ],
  },
}
