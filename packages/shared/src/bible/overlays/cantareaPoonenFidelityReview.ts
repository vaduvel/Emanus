import type { ExplainedBookOverlay, ExplainedOverlayChapter } from "../explainedOverlay.js"

const transcript = ".research/poonen-through-the-bible-OT/transcripts/song-of-solomon.txt"
const source = (anchor: string) => ({ kind: "poonen" as const, transcript, anchor })

function restoreCantarea1(chapter: ExplainedOverlayChapter): ExplainedOverlayChapter {
  if (chapter.number !== 1) return chapter
  return {
    ...chapter,
    title: "Cântarea 1 — Sexualitatea sfântă în căsătorie și dragostea Miresei pentru Hristos",
    summary:
      "Cartea trebuie citită în două feluri: ca relație reală între soț și soție și ca imagine a relației dintre Hristos și Biserică. Sexualitatea creată de Dumnezeu este bună, sfântă și curată în locul rânduit de El; relația sexuală fără iubire este demonică și aparține folosirii rele a darului lui Dumnezeu. Căsătoria are nevoie de apreciere și comunicare, iar spiritual credinciosul trebuie să crească de la iubirea care caută ce primește la o devoțiune în care Hristos Însuși este suficient.",
    units: chapter.units.map((unit) => {
      if (unit.from === 1 && unit.to === 4) {
        return {
          ...unit,
          heading: "Dumnezeu a creat sexualitatea bună și sfântă — iar cartea vorbește și despre Hristos și Biserică",
          teaching:
            "Dumnezeu a creat relația sexuală în căsătorie și, după ce i-a creat pe Adam și Eva și le-a spus să se înmulțească, a numit creația «foarte bună». Ceea ce Dumnezeu a creat și a numit bun nu trebuie numit necurat. Lumea poate folosi rău un dar bun al lui Dumnezeu, dar abuzul nu face darul însuși rău.\n\nRelația sexuală trebuie unită cu iubirea. Relația sexuală fără iubire este demonică, satanică și aparține iadului, pentru că persoana este folosită în loc să fie iubită. În căsătorie, sexualitatea este sfântă, curată și una dintre legăturile prin care soțul și soția sunt uniți.\n\nCartea subliniază de aceea aprecierea și comunicarea. Soțul și soția nu trebuie să se ia unul pe altul ca pe ceva garantat. Ei trebuie să-și exprime aprecierea și să vorbească unul cu altul cu dragoste.\n\nÎn același timp, Cântarea este și o imagine a lui Hristos și a Bisericii. Trebuie citită în ambele feluri: ca relație soț–soție și ca relație Hristos–Mireasă. Devotamentul față de Hristos este temelia oricărei slujiri; dacă această iubire scade, slujirea își pierde valoarea.",
          source: source(
            "Song of Solomon ... basically teaches two things ... sexual relationship and marriage ... God created it ... very good ... any sexual relationship without love is demonic, satanic, belongs to hell ... appreciation ... communication ... Christ and the church",
          ),
          explanationKind: "exposition",
          forYourHeart:
            "Nu numi necurat ceea ce Dumnezeu a creat sfânt și nu despărți niciodată sexualitatea de iubire. Iar în slujire, păstrează dragostea pentru Hristos mai presus de activitate.",
        }
      }
      if (unit.from === 5 && unit.to === 8) {
        return {
          ...unit,
          heading: "«Sunt întunecată, dar frumoasă» — Dumnezeu privește inima, iar via ta trebuie păzită",
          teaching:
            "Mireasa se simte inferioară femeilor rafinate ale Ierusalimului: este o fată de la țară, arsă de soare, și spune că este întunecată. Totuși ea este frumoasă în ochii mirelui. Așa lucrează Hristos: El nu alege după aparență, inteligență, educație, familie sau capacități naturale, ci privește la inima devotată Lui.\n\nEste important ca un credincios să știe că este primit în Hristos și că Dumnezeu Se bucură de el. Poți să te simți mai puțin capabil, mai puțin educat sau inferior altora; valoarea ta înaintea Domnului nu vine din comparația cu ei.\n\nVersetul 6 spune: «m-au pus păzitoare a viilor, dar via mea nu mi-am păzit-o». Viile altora sunt lucrarea și slujirea; via mea este propria mea viață și umblare cu Dumnezeu. Aceasta este o greșeală frecventă a predicatorilor și slujitorilor: păzesc viile altora și își neglijează propria vie.\n\nNicio lucrare pentru alții nu poate compensa neglijarea propriei vieți cu Dumnezeu. Mai întâi păzește-ți via, apoi slujește în viile încredințate ție.",
          source: source(
            "I am dark ... beautiful ... village girl ... God looks for qualities of the heart ... own vineyard I have not kept ... other vineyards are my ministry ... my vineyard is my life",
          ),
          explanationKind: "exposition",
          words: unit.words,
          forYourHeart:
            "Nu lăsa lucrarea pentru alții să-ți mănânce propria viață cu Dumnezeu. Via ta trebuie păzită înainte de toate celelalte vii.",
        }
      }
      if (unit.from === 9 && unit.to === 17) {
        return {
          ...unit,
          heading: "Aprecierea și comunicarea fac parte din iubire",
          teaching:
            "Cântarea arată un soț și o soție care își exprimă aprecierea. Aceasta lipsește adesea din căsnicii: oamenii ajung să se ia unul pe altul ca pe ceva garantat. Soțul trebuie să se bucure de soția lui, iar soția de soțul ei; aprecierea trebuie spusă, nu doar presupusă.\n\nÎn iubirea imatură, fiecare se gândește mai mult la ce poate primi de la celălalt. De obicei bărbatul vrea sex, iar femeia vrea siguranță. Fiecare caută ceva. Iubirea matură crește dincolo de acest centru al sinelui și începe să întrebe: «ce pot da eu?»\n\nAcelași lucru este adevărat în relația cu Dumnezeu. La început omul poate veni pentru cer, vindecare, binecuvântare, prosperitate sau chiar ungere și slujire. Maturitatea ajunge să spună: «Doamne, nu am nevoie de nimic ca motiv să Te iubesc; Te am pe Tine și aceasta îmi este de ajuns».\n\nIsus a venit pe pământ nu întrebând ce poate primi de la oameni, ci ce poate da. Aceasta este direcția în care trebuie să crească iubirea noastră, atât în căsătorie, cât și față de Domnul.",
          source: source(
            "appreciating one another ... communication ... immature love ... the man usually wants sex and the girl usually wants security ... mature love ... what can I give ... I have You and that's enough",
          ),
          explanationKind: "exposition",
        }
      }
      return unit
    }),
  }
}

function restoreCantarea2(chapter: ExplainedOverlayChapter): ExplainedOverlayChapter {
  if (chapter.number !== 2) return chapter
  return {
    ...chapter,
    title: "Cântarea 2 — Nu trezi iubirea înainte de vreme și prinde vulpile mici",
    summary:
      "Mireasa spune că este un trandafir al Șaronului și un crin al văilor; aceste cuvinte nu sunt un titlu biblic pentru Isus. Capitolul avertizează să nu fie trezită iubirea înainte de vreme; pentru un tânăr aceasta înseamnă să fie foarte atent cu sentimentele și să nu trezească iubirea până când căsătoria este realist aproape, aproximativ în șase luni până la un an. Vulpile mici sunt micile iritații și păcate care, dacă nu sunt prinse repede, strică via iubirii.",
    units: chapter.units.map((unit) => {
      if (unit.from === 1 && unit.to === 7) {
        return {
          ...unit,
          heading: "Trandafirul Șaronului nu este Isus — și iubirea nu trebuie trezită prea devreme",
          teaching:
            "În versetul 1 vorbește mireasa: «sunt un trandafir al Șaronului, un crin al văilor». De aceea expresia nu este, în acest text, un titlu al lui Isus. A-L numi pe Isus «trandafirul Șaronului» sau «crinul văilor» din acest verset nu este scriptural; aici mireasa vorbește despre ea însăși.\n\nApoi vine avertismentul: «nu treziți iubirea până nu-i vine vremea». Tinerii trebuie să fie foarte atenți cu sentimentele lor. Nu este înțelept să trezești o legătură romantică atunci când nu ești aproape de posibilitatea reală a căsătoriei.\n\nCa regulă practică, iubirea nu trebuie trezită până când ești cam la șase luni până la un an de posibilitatea căsătoriei. Altfel omul deschide emoții puternice pe care apoi trebuie să le poarte timp îndelungat fără cadrul potrivit.\n\nDragostea nu trebuie forțată și nici trezită prematur. Există un timp potrivit, iar autocontrolul înainte de acel timp este o protecție, nu o pierdere.",
          source: source(
            "rose of Sharon ... does not refer to Jesus Christ ... totally unscriptural ... don't awaken love until the time is right ... within about six months to a year of the possibility of getting married",
          ),
          explanationKind: "exposition",
        }
      }
      if (unit.from === 8 && unit.to === 14) {
        return {
          ...unit,
          heading: "Ascuns în Stâncă împreună cu Hristos",
          teaching:
            "Mirele vine și o cheamă pe mireasă să se ridice și să vină. Imaginea porumbiței ascunse în crăpăturile stâncii este o imagine frumoasă a credinciosului ascuns în Hristos, Stânca.\n\nSiguranța noastră nu stă în cât de puternici suntem noi, ci în locul în care suntem ascunși. Când viața este în Hristos, omul poate răspunde chemării Mirelui și poate merge cu El.\n\nRelația cu Hristos nu este numai doctrină despre El, ci apropiere, voce recunoscută și răspuns la chemarea Lui. Mireasa știe glasul Mirelui și dorește prezența lui.",
          source: source(
            "my lover comes leaping ... dove hidden in the rock ... beautiful picture of our being hidden in Christ",
          ),
          explanationKind: "exposition",
        }
      }
      if (unit.from === 15 && unit.to === 17) {
        return {
          ...unit,
          heading: "Prinde repede vulpile mici care distrug via iubirii",
          teaching:
            "«Prindeți vulpile mici înainte să strice via.» Vulpile mari se văd ușor; cele mici intră fără să fie observate și pot distruge treptat rodul.\n\nÎn căsătorie, acestea sunt micile iritații ale vieții zilnice: un ton ascuțit, o reacție repetată, o supărare păstrată, un obicei aparent neînsemnat. Oamenii pot evita lucrurile mari și totuși să lase aceste lucruri mici să roadă dragostea zi după zi.\n\nAcelași principiu este adevărat spiritual. Păcatele «mici» tolerate devin periculoase tocmai fiindcă nu par dramatice. Trebuie prinse repede, înainte să se înmulțească și să strice via.\n\nNu aștepta ca o problemă mică să devină o criză mare. Judec-o repede, cere iertare repede și păstrează via iubirii curată.",
          source: source(
            "catch the little foxes quickly before they ruin the vineyard of your love ... little irritations, little sharp voice ... those little foxes are the things that destroy a marriage",
          ),
          explanationKind: "exposition",
          forYourHeart:
            "Lucrurile mici repetate pot distruge ceea ce o singură criză mare nu a reușit. Prinde vulpile cât sunt încă mici.",
        }
      }
      return unit
    }),
  }
}

function restoreCantarea4(chapter: ExplainedOverlayChapter): ExplainedOverlayChapter {
  if (chapter.number !== 4) return chapter
  return {
    ...chapter,
    summary:
      "Mirele vorbește mult despre frumusețea miresei, semn al creșterii iubirii: pe măsură ce omul crește spiritual, aude mai mult aprecierea Domnului decât își vorbește el însuși despre iubirea sa. Mirele o cheamă în locurile înalte; spiritual, acestea sunt locurile cerești unde există și lei și pantere — principate și puteri demonice — dar mireasa merge acolo împreună cu Hristos și le biruiește. Ea este o grădină privată pentru Mire, iar la final primește deopotrivă vântul rece al încercării și vântul de sud al binecuvântării, dacă amândouă fac să iasă parfumul grădinii.",
    units: chapter.units.map((unit) => {
      if (unit.from === 8 && unit.to === 11) {
        return {
          ...unit,
          heading: "Cu Mirele în locurile cerești, împotriva principatelor și puterilor",
          teaching:
            "Mirele o cheamă pe mireasă să urce cu el. Spiritual, aceasta este chemarea la o viață în locurile cerești cu Hristos. Acolo există și lei și pantere: demoni, principate și puteri. Dar mireasa nu merge singură; Mirele spune în esență: «tu și Eu suntem împreună acolo».\n\nCredinciosul nu este chemat să trăiască toată viața la nivelul lucrurilor pământești. Hristos îl ridică într-o poziție spirituală din care lucrurile pământului devin mici și lupta cu puterile întunericului este purtată împreună cu El.\n\nMireasa care merge cu Mirele nu fuge de confruntarea spirituală. Ea este gata să întâlnească aceste puteri și să le biruiască prin unirea ei cu Hristos.\n\nPuterea nu vine din curajul ei natural, ci din faptul că este cu Mirele. El o cheamă sus și El o face puternică pentru luptă.",
          source: source(
            "chapter four ... come with me from Lebanon ... higher plane ... lions and panthers there in the heavenly places ... demons and principalities and powers ... you and I are together there ... overcome them",
          ),
          explanationKind: "exposition",
        }
      }
      if (unit.from === 12 && unit.to === 16) {
        return {
          ...unit,
          heading: "O grădină privată pentru Hristos — în încercare și în binecuvântare",
          teaching:
            "Mirele o numește «grădină privată». Viața miresei îi aparține Mirelui. Inima nu este deschisă ca un teren comun pentru bani, promovare, reputație și alte iubiri care vor să ocupe locul Lui. Este păstrată pentru Hristos.\n\nApoi mireasa spune: «trezește-te, vânt de nord; vino, vânt de sud». Vântul de nord este vântul rece al suferinței, adversității și încercării. Vântul de sud este vântul binecuvântării, încurajării, prosperității și fericirii.\n\nMireasa ajunge la locul în care spune că nu contează care vânt vine, dacă prin el parfumul grădinii se răspândește pentru Mire. Nu Îl iubește pe Domnul numai când vântul este cald și plăcut. Acceptă și încercarea dacă aceasta face viața ei mai plăcută Lui.\n\nAceasta este consacrare matură: «grădina mea este a Ta; trimite vântul pe care îl alegi Tu, dacă viața mea va aduce parfum pentru Tine».",
          source: source(
            "private garden ... north wind is suffering adversity trials ... south wind blessing encouragement prosperity happiness ... it doesn't matter which wind it is",
          ),
          explanationKind: "exposition",
          forYourHeart:
            "Poți spune Domnului nu doar «trimite binecuvântarea», ci «trimite vântul pe care îl alegi Tu, dacă viața mea va aduce parfum pentru Tine»?",
        }
      }
      return unit
    }),
  }
}

function restoreCantarea5(chapter: ExplainedOverlayChapter): ExplainedOverlayChapter {
  if (chapter.number !== 5) return chapter
  return {
    ...chapter,
    title: "Cântarea 5 — Când Mirele cheamă, străjerii legaliști și Mirele care rămâne cel mai frumos",
    summary:
      "Mireasa amână să răspundă chemării Mirelui, iar când în cele din urmă deschide, el a plecat. În căutarea lui întâlnește străjerii, imagine a prezbiterilor și predicatorilor legaliști care pot răni și expune public o mireasă devotată. Totuși ea nu renunță la Mire. Când este întrebată ce are el atât de deosebit, îl descrie și încheie: «acesta este iubitul meu și acesta este prietenul meu». Relația cu Hristos trebuie să ajungă la o asemenea iubire personală.",
    units: chapter.units.map((unit) => {
      if (unit.from === 1 && unit.to === 6) {
        return {
          ...unit,
          heading: "Nu spune Mirelui «nu acum» când te cheamă",
          teaching:
            "Mirele bate și cere să i se deschidă, dar mireasa răspunde: «nu acum; mi-am scos haina, mi-am spălat picioarele». Comoditatea momentului devine mai importantă decât răspunsul imediat la chemarea lui. Când în cele din urmă se ridică și deschide, mirele a plecat.\n\nAceasta se aplică direct relației cu Hristos. Domnul poate să te cheme să lași deoparte o conversație, o lectură, o activitate sau confortul și să petreci timp cu El. Uneori El testează dacă este într-adevăr mai important pentru tine decât ceea ce faci în acel moment.\n\nDacă răspunsul este mereu «după încă cincisprezece minute», părtășia se răcește. Devotamentul se vede în promptitudinea cu care inima răspunde când Mirele cheamă.\n\nMireasa descoperă durerea de a fi tratat chemarea Lui ca pe ceva ce poate fi amânat. Aceasta o împinge să-L caute cu și mai multă seriozitate.",
          source: source(
            "chapter 5 ... open to me ... Lord, not right now ... 15 minutes ... he's gone ... Lord tests whether he is more important",
          ),
          explanationKind: "exposition",
        }
      }
      if (unit.from === 7 && unit.to === 8) {
        return {
          ...unit,
          heading: "Străjerii: prezbiteri și predicatori legaliști care rănesc Mireasa",
          teaching:
            "Străjerii o găsesc, o lovesc, o rănesc și îi smulg vălul. Spiritual, străjerii sunt prezbiteri și predicatori care ar trebui să ajute poporul lui Dumnezeu, dar care pot fi legaliști și lipsiți de adevărata devoțiune față de Hristos.\n\nUn om poate ști să predea multe lucruri din Scriptură și totuși să nu-i conducă pe oameni la devotament față de Isus Hristos. Dacă ești prezbiter, nu este suficient să-i înveți pe oameni Biblia; întrebarea este dacă îi conduci la iubire și devoțiune pentru Hristos.\n\nAstfel de străjeri pot răni o mireasă sinceră prin cuvinte și o pot expune public — imaginea vălului smuls vorbește despre rușine publică. Autoritatea religioasă fără inima Mirelui poate deveni foarte crudă.\n\nMireasa însă nu abandonează căutarea din cauza străjerilor. Rănită de liderii religioși, ea continuă să-L caute pe Mire. Relația ei cu Hristos nu depinde de cât de bine s-au purtat liderii cu ea.",
          source: source(
            "watchmen ... elders of a church ... legalists ... struck her and wounded her ... tore off her veil ... public disgrace ... if you're an elder ... not enough teaching people the Bible ... leading them to devotion to Christ",
          ),
          explanationKind: "exposition",
          forYourHeart:
            "Dacă un lider religios te-a rănit, nu-l lăsa să-ți fure și Mirele. Continuă să-L cauți pe Hristos.",
        }
      }
      if (unit.from === 9 && unit.to === 16) {
        return {
          ...unit,
          heading: "«Acesta este iubitul meu și acesta este prietenul meu»",
          teaching:
            "Fiicele Ierusalimului o întreabă ce are iubitul ei atât de deosebit încât îl caută în felul acesta. Mireasa răspunde descriindu-l cu admirație și ajunge la concluzia: «este cu totul minunat; acesta este iubitul meu și acesta este prietenul meu».\n\nÎn căsătorie, soțul și soția trebuie să ajungă și cei mai apropiați prieteni. Relația nu poate fi redusă la responsabilități, casă sau sexualitate; prietenia, conversația și bucuria de persoana celuilalt fac parte din iubire.\n\nSpiritual, Isus trebuie să devină Prietenul cel mai mare al credinciosului. Nu numai Mântuitor, nu numai Învățător și nu numai Cel de la care cerem lucruri, ci Persoana pe care o iubim și cu care dorim părtășie.\n\nMireasa nu răspunde cu o doctrină despre mire, ci cu admirație personală. Aceasta este devoțiunea pe care Cântarea urmărește să o trezească față de Hristos.",
          source: source(
            "he's altogether lovely ... he is my beloved and my friend ... wife your best friend ... Jesus greatest friend",
          ),
          explanationKind: "exposition",
        }
      }
      return unit
    }),
  }
}

function restoreCantarea8(chapter: ExplainedOverlayChapter): ExplainedOverlayChapter {
  if (chapter.number !== 8) return chapter
  return {
    ...chapter,
    summary:
      "Capitolul 8 este culmea iubirii mature. Iubirea este tare ca moartea, nu poate fi stinsă de ape și nu poate fi cumpărată. În relația cu Hristos, maturitatea ajunge să spună: «nu am nevoie de proprietate, bani, sănătate, prosperitate sau nici măcar de o slujire ca motiv să Te iubesc; Te am pe Tine și aceasta îmi este de ajuns». Întrebarea nu mai este «ce pot primi de la Domnul?», ci «ce poate primi Domnul din viața mea?». ",
    units: chapter.units.map((unit) => {
      if (unit.from !== 5 || unit.to !== 7) return unit
      return {
        ...unit,
        heading: "Iubirea matură: «Te am pe Tine și aceasta îmi este de ajuns»",
        teaching:
          "Iubirea este tare ca moartea. Ape mari nu o pot stinge, iar dacă un om ar da toate averile casei lui pentru iubire, ar fi disprețuit. Iubirea adevărată nu este de vânzare și nu rămâne numai cât timp primește beneficii.\n\nAceasta este maturitatea la care trebuie să ajungă relația cu Hristos. La început putem veni la Domnul întrebând: «mă duci în cer? mă vindeci? mă binecuvântezi? îmi dai prosperitate? mă ungi ca să am o slujire puternică?» Toate acestea încă se învârt în jurul a ceea ce primim.\n\nIubirea matură spune: «Doamne, nu am nevoie de proprietate, bani, sănătate, prosperitate și nici măcar de slujire ca motiv să Te iubesc. Te am pe Tine și aceasta îmi este de ajuns. Cum poți primi Tu mai mult din viața mea?»\n\nAici iubirea nu mai întreabă ce poate scoate din relație. Îl iubește pe Mire pentru cine este El. Aceasta este culmea spre care crește mireasa de-a lungul întregii cărți.",
        source: source(
          "chapter eight ... mature love ... I don't need property ... money ... health ... ministry ... I have you and that's enough ... not what I can get out of the Lord, but what the Lord can get out of me",
        ),
        explanationKind: "exposition",
        forYourHeart:
          "Dacă Dumnezeu nu ți-ar da nimic din lucrurile pe care le dorești, ar rămâne Hristos Însuși suficient pentru inima ta?",
      }
    }),
  }
}

export function restoreCantareaPoonenFidelity(book: ExplainedBookOverlay): ExplainedBookOverlay {
  return {
    ...book,
    chapters: book.chapters.map((chapter) =>
      restoreCantarea8(restoreCantarea5(restoreCantarea4(restoreCantarea2(restoreCantarea1(chapter))))),
    ),
  }
}
