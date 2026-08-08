import type { ExplainedBookOverlay, ExplainedOverlayChapter } from "../explainedOverlay.js"

const transcript = ".research/poonen-through-the-bible-OT/transcripts/judges-ruth.txt"
const p = (anchor: string) => ({ kind: "poonen" as const, transcript, anchor })

const reviewedChapters: Record<number, ExplainedOverlayChapter> = {
  16: {
    number: 16,
    title: "Samson: o lucrare puternică și o viață privată care se prăbușește",
    summary:
      "Samson continuă să se apropie de femei filistene, ajunge legat de Dalila și își dezvăluie secretul consacrării. Când părul îi este tăiat, el pornește ca mai înainte fără să știe că DOMNUL Se depărtase de el; este prins și orbit. Poonen folosește finalul lui ca avertisment sever: succesul public și darul spiritual nu sunt dovada că viața privată este sănătoasă. În ultimele clipe, Samson Îl cheamă din nou pe DOMNUL și moare când templul lui Dagon se prăbușește.",
    units: [
      {
        from: 1,
        to: 3,
        heading: "Puterea rămâne vizibilă chiar când slăbiciunea morală rămâne netratată",
        teaching:
          "Capitolul începe cu Samson mergând la Gaza și intrând la o prostituată. Filistenii îl pândesc, dar la miezul nopții el smulge porțile cetății și le poartă pe înălțime. Narațiunea ține astfel alături două realități incomode: puterea lui extraordinară nu a dispărut imediat când conduita lui sexuală a devenit compromisă.\n\nPoonen insistă tocmai asupra acestui pericol în viața slujitorilor: faptul că Dumnezeu continuă să folosească un om sau că oamenii continuă să fie binecuvântați prin lucrarea lui nu dovedește automat că Dumnezeu aprobă tot ce se întâmplă în viața lui privată. Darul nu este certificat de caracter.\n\nAceasta este o avertizare împotriva unei logici foarte periculoase: «încă am putere, încă am rezultate, deci sunt bine cu Dumnezeu». Samson putea încă ridica porțile Gazei; problema inimii lui nu era prin aceasta vindecată.",
        source: p("Samson ... wonderful ministry ... many people blessed ... man himself"),
        explanationKind: "exposition",
        forYourHeart:
          "Nu folosi faptul că încă ai dar, rezultate sau influență ca dovadă că un compromis ascuns este tolerat de Dumnezeu.",
      },
      {
        from: 4,
        to: 14,
        heading: "Dalila și jocul repetat cu locul în care Samson era slab",
        teaching:
          "Samson o iubește pe Dalila, iar domnitorii filistenilor îi promit bani ca să afle de unde vine puterea lui. Ea îl presează repetat, iar Samson răspunde de mai multe ori cu explicații false despre cum ar putea fi legat. De fiecare dată, exact metoda pe care i-o spune este încercată asupra lui.\n\nAici pericolul nu este numai că Samson are o slăbiciune; este că se joacă repetat lângă ea. După prima încercare ar fi trebuit să știe fără îndoială ce urmărește Dalila. Cu toate acestea, el rămâne și mută conversația tot mai aproape de adevăr.\n\nPoonen pune Samson în contrast cu Iosif. Iosif, când este presat sexual de soția lui Potifar, refuză și în cele din urmă fuge. Samson, dimpotrivă, continuă să se așeze în mediul care îl trage spre cădere. Aplicația lui Poonen este directă: un om poate fi uns și folosit și totuși să fie ruinat prin domeniul sexual dacă nu îl păzește.\n\nNu transformăm aceasta într-o acuzație generică împotriva femeilor. În text, Dalila îl trădează deliberat pentru bani, iar Samson este responsabil pentru alegerile lui repetate. Lecția nu este «femeile sunt pericolul», ci că omul care își cunoaște slăbiciunea și continuă să o hrănească nu trebuie să se mire când compromisul îl prinde.",
        source: p("Samson ... went down to women ... contrast to Joseph ... Delilah"),
        explanationKind: "exposition",
        forYourHeart:
          "Dacă ai văzut deja de trei ori unde te duce o relație, un site, o conversație sau un obicei, nu numi a patra apropiere «doar curiozitate». Fugi înainte să nu mai poți.",
      },
      {
        from: 15,
        to: 22,
        heading: "«DOMNUL Se depărtase de el» — iar Samson nu știa",
        teaching:
          "Dalila îl presează până când sufletul lui este istovit, iar Samson îi spune tot ce are în inimă despre nazireatul lui și despre părul care nu fusese tăiat. Poonen descrie imaginea foarte direct: Samson ajunge cu capul în poala Dalilei și îi dezvăluie secretul cel mai lăuntric.\n\nCând părul este tăiat și Dalila strigă din nou că filistenii sunt peste el, Samson spune în sine că va ieși «ca mai înainte» și se va scutura. Acesta este poate cel mai înfricoșător rând din poveste: «nu știa că DOMNUL Se depărtase de el». Omul se baza pe experiența precedentă și presupunea că puterea va fi prezentă fiindcă fusese prezentă de atâtea ori înainte.\n\nPoonen folosește tocmai această cădere pentru slujitorii lui Dumnezeu. Poți ajunge atât de obișnuit cu ungerea, darul sau succesul de ieri încât să presupui că ele îți garantează ziua de azi, chiar când ai cedat în domeniul pe care Dumnezeu te chema să-l păzești.\n\nFilistenii îl prind, îi scot ochii și îl pun să macine în închisoare. Poonen leagă orbirea lui Samson de faptul că ochii și dorințele lui îl trăseseră repetat spre femeile pe care le dorea. Aceasta este aplicația predicatorului, nu explicația explicită a naratorului pentru pedeapsă; textul spune faptul orbirii, iar Poonen îl folosește ca avertisment moral.\n\nVersetul 22 adaugă însă un detaliu de speranță: părul începe din nou să crească. Nu înseamnă că părul avea putere magică. Nazireatul era semnul consacrării, iar povestea pregătește ultima rugăciune a lui Samson către Dumnezeu.",
        source: p("head on Delilah's lap ... revealed his innermost secrets ... lost his power ... eyes were blinded"),
        explanationKind: "exposition",
        forYourHeart:
          "Cel mai periculos moment nu este numai când ai pierdut puterea, ci când încă presupui că poți ieși «ca mai înainte». Nu trăi din ungerea de ieri.",
      },
      {
        from: 23,
        to: 31,
        heading: "Ultima rugăciune a lui Samson și sfârșitul din templul lui Dagon",
        teaching:
          "Domnitorii filistenilor se adună să aducă o mare jertfă lui Dagon și atribuie dumnezeului lor capturarea lui Samson. Samson este adus ca obiect de batjocură înaintea mulțimii, iar templul este plin de bărbați și femei, cu aproximativ trei mii de persoane pe acoperiș.\n\nÎn această stare Samson Îl cheamă din nou pe DOMNUL: «Doamne Dumnezeule, adu-Ți aminte de mine... întărește-mă numai de data aceasta». Narațiunea arată că ultima lui putere nu vine dintr-o tehnică și nici din simplul fapt că părul crescuse, ci din Dumnezeu către care se roagă.\n\nSamson cere să moară împreună cu filistenii, împinge stâlpii, iar clădirea se prăbușește peste conducători și peste oamenii din ea. Textul spune că morții pe care i-a ucis la moarte au fost mai mulți decât cei uciși în viața lui. Nu ascundem caracterul violent al finalului și nu îl transformăm într-un model pentru sinucidere, atentat sau «martiriu» provocat. Acesta este finalul unui judecător din conflictul Israel–Filistia, nu o poruncă pentru creștini.\n\nMesajul central al lui Poonen este altul și este suficient de sever: Samson avusese o lucrare extraordinară și mulți oameni fuseseră binecuvântați, dar omul însuși fusese aproape ruinat prin lipsa de veghere în viața lui personală. Slujirea publică nu poate compensa caracterul privat.\n\nTotuși, ultima rugăciune împiedică povestea să devină numai cinism. Samson, orbit și umilit, se întoarce spre Dumnezeul de la care îi venise puterea. Eșecul lui are consecințe teribile, dar el nu este prezentat ca om pe care Dumnezeu nu-l mai poate auzi niciodată; Evrei 11 îl va numi mai târziu între oamenii credinței.",
        source: p("message of Samson ... wonderful ministry ... many people blessed ... man himself"),
        explanationKind: "exposition",
        forYourHeart:
          "Dacă ai căzut, nu transforma consecințele în motiv să nu te mai rogi. Dar dacă încă stai în picioare, nu folosi harul restaurării ca scuză să continui jocul cu păcatul.",
      },
    ],
  },
}

export function reviewJudecatoriExplanations(book: ExplainedBookOverlay): ExplainedBookOverlay {
  return {
    ...book,
    chapters: book.chapters.map((chapter) => reviewedChapters[chapter.number] ?? chapter),
  }
}
