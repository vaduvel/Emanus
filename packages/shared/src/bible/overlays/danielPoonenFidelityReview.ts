import type { ExplainedBookOverlay, ExplainedOverlayChapter } from "../explainedOverlay.js"

const transcript = ".research/poonen-through-the-bible-OT/transcripts/daniel.txt"

function restoreDaniel2(chapter: ExplainedOverlayChapter): ExplainedOverlayChapter {
  if (chapter.number !== 2) return chapter
  return {
    ...chapter,
    units: chapter.units.map((unit) => {
      if (unit.from !== 31 || unit.to !== 49) return unit
      return {
        ...unit,
        heading: "Statuia, cele patru imperii, cele zece regate și împărăția lui Hristos",
        teaching:
          "Statuia văzută de Nebucadnețar prezintă cursul imperiilor: capul de aur este Babilonul, pieptul și brațele de argint sunt Medo-Persia, pântecele și coapsele de bronz sunt Grecia, iar picioarele de fier sunt Imperiul Roman.\n\nLa sfârșit apar picioarele amestecate din fier și lut. Fierul vorbește despre dictatură, iar lutul despre democrație. Cele zece degete arată zece împărății care vor veni împreună la sfârșitul vremurilor, posibil în Europa, sub conducerea Antihristului, înainte de venirea lui Isus pe pământ.\n\nApoi o piatră tăiată fără ajutorul mâinilor lovește statuia și sfărâmă împărățiile omenești. Piatra devine un munte care umple pământul: este împărăția lui Hristos, ridicată de Dumnezeul cerului, o împărăție care nu va fi distrusă niciodată.\n\nViziunea arată că istoria politică nu merge la întâmplare. Dumnezeu i-a arătat unui împărat păgân cursul imperiilor până la sfârșit și venirea împărăției lui Hristos. Ultimul cuvânt nu îl au Babilonul, Roma sau Antihristul, ci Dumnezeu.",
        source: {
          kind: "poonen",
          transcript,
          anchor:
            "Daniel 2 ... gold Babylon ... silver Medo-Persian ... bronze Grecian ... iron Roman Empire ... iron dictatorship clay democracy ... ten kingdoms possibly in Europe headed by the Antichrist ... rock ... reign of Christ",
        },
        explanationKind: "exposition",
        forYourHeart:
          "Nu-ți ancora speranța în niciun sistem politic. Toate împărățiile omenești trec; împărăția lui Hristos rămâne.",
      }
    }),
  }
}

function restoreDaniel7(chapter: ExplainedOverlayChapter): ExplainedOverlayChapter {
  if (chapter.number !== 7) return chapter
  return {
    ...chapter,
    summary:
      "Daniel vede aceleași patru împărății pe care Nebucadnețar le văzuse în Daniel 2, dar acum ele apar ca fiare. Babilonul, Medo-Persia, Grecia și Roma arată altfel din perspectiva lui Dumnezeu decât în ochii omului. Din a patra împărăție apar zece coarne, o formă finală de zece împărății spre sfârșitul vremurilor, iar peste această scenă se ridică tribunalul ceresc și Fiul Omului primește împărăția veșnică.",
    units: chapter.units.map((unit) => {
      if (unit.from === 1 && unit.to === 8) {
        return {
          ...unit,
          heading: "Patru împărății: metale prețioase pentru om, fiare înaintea lui Dumnezeu",
          teaching:
            "Daniel 7 prezintă aceleași patru împărății din Daniel 2. Nebucadnețar le văzuse ca metale prețioase: aur, argint, bronz și fier. Daniel le vede ca fiare. Diferența arată cele două perspective: omul admiră gloria și puterea imperiilor; Dumnezeu vede caracterul bestial al puterii lumești care trăiește fără supunere față de El.\n\nCele patru împărății sunt Babilonul, Medo-Persia, Grecia și Roma. După căderea lui Alexandru, împărăția greacă se împarte, iar viziunea merge mai departe până la a patra împărăție. Cele zece coarne ale fiarei a patra arată forma finală de zece împărății care se ridică spre sfârșitul vremurilor.\n\nAceastă perspectivă ne învață să nu judecăm lumea după strălucirea ei. Ceea ce omul numește aur poate fi fiară înaintea lui Dumnezeu. Puterea, prestigiul și succesul politic nu sunt dovada aprobării divine.",
          source: {
            kind: "poonen",
            transcript,
            anchor:
              "Daniel 7 ... same four kingdoms ... Nebuchadnezzar saw them as precious metals ... Daniel sees them as wild beasts ... final kingdom with ten horns ... end of time",
          },
          explanationKind: "exposition",
          forYourHeart:
            "Nu te lăsa impresionat de aurul pe care îl vede lumea. Dumnezeu privește caracterul puterii, nu reclama ei.",
        }
      }
      if (unit.from === 15 && unit.to === 28) {
        return {
          ...unit,
          heading: "Cele zece coarne, Antihristul și împărăția dată sfinților",
          teaching:
            "Interpretarea viziunii arată că fiarele sunt împărății și că sfinții Celui Preaînalt vor primi în cele din urmă împărăția. Din a patra împărăție apar zece coarne, iar apoi un corn care vorbește cu aroganță și luptă împotriva sfinților.\n\nAcesta este tabloul final al împărăției legate de Roma și al celor zece împărății de la sfârșitul vremurilor. Din acest cadru se ridică puterea Antihristului, care îi persecută pe sfinți pentru o vreme. Puterea lui pare mare, dar este limitată de hotărârea lui Dumnezeu.\n\nPunctul final nu este victoria fiarei, ci judecata cerului. Cel Îmbătrânit de zile se așază, stăpânirea celui rău este luată, iar împărăția este dată poporului sfinților Celui Preaînalt. Credinciosul trebuie să vadă istoria de la tronul lui Dumnezeu, nu din perspectiva presiunii momentului.",
          source: {
            kind: "poonen",
            transcript,
            anchor:
              "Daniel 7 ... final kingdom with ten horns ... Roman Empire ... end of time ... saints receive the kingdom",
          },
          explanationKind: "exposition",
        }
      }
      return unit
    }),
  }
}

function restoreDaniel9(chapter: ExplainedOverlayChapter): ExplainedOverlayChapter {
  if (chapter.number !== 9) return chapter
  return {
    ...chapter,
    title: "Daniel 9 — Rugăciunea lui Daniel și cele șaptezeci de săptămâni până la Mesia și Antihrist",
    summary:
      "Daniel înțelege din Ieremia că cei șaptezeci de ani se apropie de sfârșit și răspunde prin post și rugăciune: «noi am păcătuit». Gabriel îi descoperă apoi cele șaptezeci de săptămâni, adică 490 de ani. Șaizeci și nouă de săptămâni, 483 de ani, merg de la porunca de reconstruire a Ierusalimului până la Mesia. După moartea lui Mesia rămâne o ultimă perioadă de șapte ani pentru sfârșitul vremurilor, când Antihristul va conduce și va veni persecuția dinaintea revenirii lui Hristos.",
    units: chapter.units.map((unit) => {
      if (unit.from !== 20 || unit.to !== 27) return unit
      return {
        ...unit,
        heading: "490 de ani: 483 până la Mesia și ultima săptămână la sfârșitul vremurilor",
        teaching:
          "Cele șaptezeci de săptămâni înseamnă șaptezeci de perioade de câte șapte, adică 490 de ani. Din acestea, șapte săptămâni plus șaizeci și două de săptămâni înseamnă 69 de săptămâni, 483 de ani. Acest interval începe de la porunca de reconstruire a Ierusalimului și duce până la venirea Celui Uns, Mesia, și la moartea Lui.\n\nProfeția a făcut posibil ca un om care o înțelegea în vremea lui Daniel să știe perioada în care avea să vină Hristos. Mesia este apoi «tăiat», iar cetatea trece prin judecată.\n\nDupă cele 69 de săptămâni rămâne o singură săptămână, șapte ani. Această perioadă este încă viitoare și aparține sfârșitului vremurilor. În acei șapte ani Antihristul va conduce, iar perioada este legată de persecuția și evenimentele care preced revenirea lui Hristos.\n\nAșadar Daniel 9 nu este numai un calcul despre trecut. El leagă prima venire și moartea lui Mesia de evenimentele finale ale istoriei și arată că Dumnezeu a stabilit dinainte limitele timpului în care răul își va desfășura ultima lucrare.",
        source: {
          kind: "poonen",
          transcript,
          anchor:
            "Daniel 9 ... seventy sevens / 490 years ... 69 weeks = 483 years from command to rebuild Jerusalem until the anointed one comes ... a period of seven years left ... at the end of time ... Antichrist will rule",
        },
        explanationKind: "exposition",
        forYourHeart:
          "Dumnezeu nu a pierdut controlul calendarului istoriei. Mesia a venit la vremea hotărâtă, iar și vremea finală a răului are o limită pusă de El.",
      }
    }),
  }
}

function restoreDaniel10(chapter: ExplainedOverlayChapter): ExplainedOverlayChapter {
  if (chapter.number !== 10) return chapter
  return {
    ...chapter,
    summary:
      "Daniel află că rugăciunea i-a fost auzită din prima zi, dar mesagerul a fost împiedicat douăzeci și una de zile de duhul numit căpetenia Persiei. Episodul este înainte de Cruce. După Calvar, Satan și demonii au fost învinși, iar credinciosul operează din poziția biruinței lui Hristos: îl poate pune pe diavol sub picioare și i se poate împotrivi din prima zi în Numele lui Isus, chiar dacă efectele lucrării lui pot lua timp până sunt îndreptate.",
    units: chapter.units.map((unit) => {
      if (unit.from !== 10 || unit.to !== 21) return unit
      return {
        ...unit,
        heading: "Douăzeci și una de zile înainte de Calvar — după Cruce, vrăjmașul este învins",
        teaching:
          "Mesagerul îi spune lui Daniel că rugăciunea lui a fost auzită din prima zi. Răspunsul a întârziat douăzeci și una de zile deoarece un duh rău, căpetenia Persiei, i s-a împotrivit până când Mihail a venit în ajutor. Aici vedem un conflict real în lumea spirituală.\n\nDar trebuie observat locul acestui episod în istoria mântuirii: Daniel trăia înainte de Crucea de la Calvar. Atunci Satan și demonii nu fuseseră încă învinși la Cruce. Noi trăim după Calvar și operăm dintr-o poziție cu totul diferită: diavolul a fost învins prin lucrarea lui Hristos.\n\nDe aceea credinciosul nu trebuie să creadă că are nevoie de douăzeci și una de zile pentru a scoate un demon. Isus nu avea nevoie de douăzeci și una de zile. În Numele lui Isus putem să ne împotrivim diavolului și să-l punem sub picioare din prima zi, pentru că victoria decisivă a fost câștigată la Cruce.\n\nEfectele lucrării diavolului pot lua timp până sunt îndreptate. Dar poziția vrăjmașului nu se schimbă în funcție de cât durează repararea pagubelor: el este un vrăjmaș învins. Aceasta este poziția din care credinciosul se roagă și se împotrivește răului după Calvar.",
        source: {
          kind: "poonen",
          transcript,
          anchor:
            "Daniel 10 ... 21 days ... happened before Calvary's cross ... demons and Satan were defeated on Calvary ... we are post Calvary ... right to put him under our feet ... effects of his work may take time to be rectified ... from day one in Jesus name",
        },
        explanationKind: "exposition",
        forYourHeart:
          "Nu trata diavolul ca pe un rival egal al lui Hristos. Împotrivește-te lui din poziția biruinței câștigate la Calvar.",
      }
    }),
  }
}

function restoreDaniel12(chapter: ExplainedOverlayChapter): ExplainedOverlayChapter {
  if (chapter.number !== 12) return chapter
  return {
    ...chapter,
    summary:
      "Daniel 12 continuă tabloul domniei Antihristului și al strâmtorării finale. Capitolul spune că vor fi două învieri: unii se vor trezi pentru viață veșnică, iar alții pentru rușine și dispreț veșnic. Cei înțelepți vor străluci, iar cei care întorc pe mulți la dreptate vor fi ca stelele. Daniel este chemat să meargă până la sfârșit și primește promisiunea că va sta în partea care i-a fost rânduită.",
    units: chapter.units.map((unit) => {
      if (unit.from !== 1 || unit.to !== 4) return unit
      return {
        ...unit,
        heading: "Antihristul, cele două învieri și cei care întorc pe mulți la dreptate",
        teaching:
          "Capitolul continuă ceea ce a fost descris la sfârșitul capitolului 11: domnia Antihristului și vremea de strâmtorare. Dar puterea lui nu este finalul poveștii. Dumnezeu își păstrează poporul și aduce istoria la judecata și învierea hotărâte de El.\n\nVersetul 2 vorbește despre două învieri: unii se trezesc pentru viață veșnică, iar alții pentru rușine și dispreț veșnic. Moartea nu este sfârșitul omului. Există o înviere spre viață și o înviere spre judecată.\n\nApoi vine un cuvânt foarte practic: cei înțelepți vor străluci ca strălucirea cerului, iar cei care întorc pe mulți la dreptate vor fi ca stelele în veci. Dacă vrei o viață care să aibă valoare veșnică, investește-o în a conduce oamenii spre dreptate, nu doar în a aduna informație despre profeție.\n\nProfeția despre sfârșit trebuie să producă fidelitate. Antihristul are vremea lui limitată; Dumnezeu are ultimul cuvânt; iar slujitorul credincios este chemat să rămână până la sfârșit și să-i ajute pe alții să umble drept.",
        source: {
          kind: "poonen",
          transcript,
          anchor:
            "Daniel 12 ... reign of the Antichrist ... two resurrections in verse 2 ... some to everlasting life some to shame ... those who turn many people to righteousness will shine like the stars",
        },
        explanationKind: "exposition",
        forYourHeart:
          "Nu studia sfârșitul doar ca să știi ce urmează. Trăiește astfel încât să-i întorci pe oameni la dreptate înainte să vină sfârșitul.",
      }
    }),
  }
}

export function restoreDanielPoonenFidelity(book: ExplainedBookOverlay): ExplainedBookOverlay {
  return {
    ...book,
    chapters: book.chapters.map((chapter) =>
      restoreDaniel12(restoreDaniel10(restoreDaniel9(restoreDaniel7(restoreDaniel2(chapter))))),
    ),
  }
}
