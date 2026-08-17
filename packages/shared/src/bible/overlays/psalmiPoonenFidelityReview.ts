import type { ExplainedBookOverlay, ExplainedOverlayChapter } from "../explainedOverlay.js"

const transcript = ".research/poonen-through-the-bible-OT/transcripts/psalms.txt"
const source = (anchor: string) => ({ kind: "poonen" as const, transcript, anchor })

function restorePsalm32(chapter: ExplainedOverlayChapter): ExplainedOverlayChapter {
  if (chapter.number !== 32) return chapter

  return {
    ...chapter,
    title: "Psalmul 32 — Fericirea iertării, păcatul acoperit și curățirea adusă prin sângele lui Isus",
    summary:
      "David vorbește despre fericirea omului a cărui fărădelege este iertată și al cărui păcat este acoperit. Tăcerea asupra păcatului îl usucă pe om, dar mărturisirea aduce iertare. În Vechiul Legământ era iertare și acoperire a păcatului; curățirea păcatului a venit după moartea lui Isus, prin sângele Lui. După iertare, omul este chemat să primească învățătura și călăuzirea lui Dumnezeu și să nu mai fie încăpățânat.",
    units: chapter.units.map((unit) => {
      if (unit.from !== 1 || unit.to !== 5) return unit
      return {
        ...unit,
        heading: "Iertat și acoperit — iar sângele lui Isus aduce curățirea",
        teaching:
          "Psalmul începe cu fericirea omului a cărui fărădelege este iertată și al cărui păcat este acoperit. David descrie apoi ce s-a întâmplat cât timp a tăcut: puterea i se usca și mâna lui Dumnezeu apăsa asupra lui. Când și-a recunoscut păcatul și nu și-a mai ascuns nelegiuirea, a primit iertare.\n\nÎn Vechiul Legământ găsim iertare și acoperirea păcatului. Curățirea păcatului a venit după moartea lui Isus: sângele lui Isus ne curățește. Jertfele vechi arătau înainte spre lucrarea deplină care avea să fie făcută prin Hristos.\n\nDe aceea, pentru creștin, vestea bună nu este numai că vina este iertată și acoperită, ci că sângele lui Isus curățește de păcat. Nu trebuie să ne întoarcem de la realitatea Noului Legământ la umbra celui vechi.\n\nDrumul spre această libertate începe cu adevărul înaintea lui Dumnezeu. David nu mai ascunde, nu mai justifică și nu mai păstrează păcatul în tăcere; îl mărturisește. Dumnezeu răspunde prin iertare, iar omul iertat poate merge mai departe sub călăuzirea Lui.",
        source: source(
          "Psalm 32 ... whose sin is covered, not cleansed ... There's no cleansing of sin in the Old Covenant ... There's forgiveness and covering. Cleansing came only after Jesus died. The blood of Jesus cleanses us.",
        ),
        explanationKind: "exposition",
        forYourHeart:
          "Nu ascunde păcatul înaintea lui Dumnezeu. Mărturisește-l, primește iertarea și trăiește în curățirea pe care sângele lui Isus o aduce în Noul Legământ.",
      }
    }),
  }
}

function restorePsalm51(chapter: ExplainedOverlayChapter): ExplainedOverlayChapter {
  if (chapter.number !== 51) return chapter

  return {
    ...chapter,
    title: "Psalmul 51 — Spală-mă, creează în mine o inimă curată și nu lua Duhul Tău de la mine",
    summary:
      "David scrie acest psalm după păcatul cu Bat-Șeba. El cere să fie spălat, recunoaște că Dumnezeu dorește adevăr în omul dinăuntru, cere o inimă curată și un duh statornic și se roagă: «nu lua Duhul Tău cel Sfânt de la mine». Aceasta era frica lui cea mai mare. Apoi cere să-i fie redată bucuria mântuirii și promite să-i învețe pe alții căile lui Dumnezeu.",
    units: chapter.units.map((unit) => {
      if (unit.from === 1 && unit.to === 6) {
        return {
          ...unit,
          heading: "Spală-mă și pune adevăr în omul dinăuntru",
          teaching:
            "David scrie după păcatul cu Bat-Șeba și vine la Dumnezeu fără să-și ascundă vina. El cere milă, ștergerea fărădelegii și spălare. Pocăința nu este numai regret pentru consecințe; este dorința de a fi curățit.\n\nÎn versetul 6, David recunoaște că Dumnezeu dorește adevăr în omul dinăuntru. Problema păcatului nu este numai fapta văzută în afară, ci lipsa adevărului în inimă. De aceea David cere ca Dumnezeu să lucreze în interior, acolo unde s-au născut minciuna și păcatul.\n\nAceasta este pocăința reală: omul încetează să-și apere imaginea și vrea adevăr înaintea lui Dumnezeu. Nu cere doar să scape de pedeapsă, ci să fie spălat și schimbat.",
          source: source("Psalm 51 ... David wrote when he sinned with Bathsheba ... wash me Lord ... truth in the inward parts"),
          explanationKind: "exposition",
        }
      }
      if (unit.from === 7 && unit.to === 12) {
        return {
          ...unit,
          heading: "Creează în mine o inimă curată — și nu lua Duhul Tău de la mine",
          teaching:
            "David cere curățire, o inimă curată și un duh statornic. El nu se mulțumește să fie iertat în exterior; vrea ca Dumnezeu să facă ceva nou înăuntrul lui.\n\nApoi vine versetul care arată frica lui cea mai mare: «nu mă lepăda de la Fața Ta și nu lua de la mine Duhul Tău cel Sfânt». Mai mult decât pierderea tronului, a reputației sau a confortului, David se teme să nu piardă prezența și Duhul lui Dumnezeu.\n\nAceasta arată ce prețuia cu adevărat. Omul poate pierde multe lucruri și totuși să rămână bogat dacă Îl are pe Dumnezeu; dar succesul exterior nu poate înlocui prezența Lui.\n\nDavid cere apoi: «dă-mi iarăși bucuria mântuirii Tale». Păcatul îi luase bucuria. Restaurarea nu este doar o schimbare de situație, ci revenirea bucuriei unei relații drepte cu Dumnezeu.",
          source: source(
            "Psalm 51 ... create in me a clean heart ... verse 11 ... that's what he scared about the most ... don't take your Holy Spirit from me Lord ... restore to me the joy",
          ),
          explanationKind: "exposition",
          words: [
            {
              original: "לֵב טָהוֹר בְּרָא־לִי",
              transliteration: "lev tahor bera-li",
              language: "ebraica",
              meaning: "creează pentru mine/în mine o inimă curată",
              verseRef: "Psalmul 51:10",
              lexicalSource: "WLC-OSHB",
            },
          ],
          forYourHeart:
            "Ce te sperie mai mult să pierzi: confortul și reputația, sau prezența lui Dumnezeu? David știa ce era cu adevărat de neînlocuit.",
        }
      }
      return unit
    }),
  }
}

function restorePsalm69(chapter: ExplainedOverlayChapter): ExplainedOverlayChapter {
  if (chapter.number !== 69) return chapter
  return {
    ...chapter,
    title: "Psalmul 69 — Suferința lui Hristos și inima frântă la Cruce",
    summary:
      "Psalmul 69 vorbește profetic despre suferința lui Hristos: ura fără temei, râvna pentru Casa lui Dumnezeu, ocara, oțetul dat în sete și inima frântă. Isus a murit literalmente de inimă frântă; când sulița I-a străpuns coasta, sângele și apa care au curs confirmă această realitate. După suferință, psalmul se ridică spre laudă, înălțare și restaurarea Sionului.",
    units: chapter.units.map((unit) => {
      if (unit.from === 13 && unit.to === 29) {
        return {
          ...unit,
          heading: "«Ocara mi-a frânt inima» — Isus a murit de inimă frântă",
          teaching:
            "Psalmul vorbește despre ocara care frânge inima și despre oțetul dat celui însetat. Aceste detalii privesc înainte spre Crucea lui Hristos.\n\nIsus a murit literalmente de inimă frântă. Medicii care au studiat descrierea Crucii au arătat aceasta, iar când sulița a străpuns coasta Lui au ieșit sânge și apă. Ceea ce Psalmul 69 spune despre inima frântă a fost literalmente adevărat în suferința Lui.\n\nDurerea Crucii nu a fost numai durere fizică. Hristos a purtat ocara, respingerea și povara păcatului. Inima Lui a fost frântă în această suferință pentru noi.\n\nDe aceea Crucea trebuie privită nu doar ca un eveniment exterior, ci ca expresia iubirii care a mers până la capăt și a purtat ceea ce noi meritam.",
          source: source(
            "Psalm 69 ... reproach has broken my heart ... doctors who've studied the description of the cross ... Jesus died of a broken heart ... spear pierced his side ... blood and water flowed out ... literally true",
          ),
          explanationKind: "exposition",
          forYourHeart:
            "Crucea arată cât de departe a mers iubirea lui Hristos pentru tine. Nu trata ușor păcatul pentru care inima Lui a fost frântă.",
        }
      }
      return unit
    }),
  }
}

function restorePsalm73(chapter: ExplainedOverlayChapter): ExplainedOverlayChapter {
  if (chapter.number !== 73) return chapter
  return {
    ...chapter,
    summary:
      "Asaf aproape alunecă atunci când vede prosperitatea celor răi. El își dă seama însă că, dacă ar fi răspândit îndoielile lui printre alții, le-ar fi putut distruge credința. Lecția este directă: dacă ai îndoieli, ține-le pentru tine și nu-i poticni pe alții; există un răspuns, iar răspunsul se găsește în prezența lui Dumnezeu. Acolo Asaf înțelege sfârșitul și ajunge la mărturisirea: «Pe cine am eu în cer afară de Tine?».",
    units: chapter.units.map((unit) => {
      if (unit.from === 15 && unit.to === 20) {
        return {
          ...unit,
          heading: "Nu răspândi îndoielile și nu distruge credința altora",
          teaching:
            "Asaf spune că, dacă ar fi vorbit mai departe exact gândurile lui din vremea crizei, ar fi trădat generația copiilor lui Dumnezeu. Aici este o lecție foarte importantă despre îndoială.\n\nUnii oameni își răspândesc îndoielile peste tot, iar după cinci ani găsesc răspunsul. Dar în acei cinci ani pot să fi distrus credința multor oameni cu întrebările pe care le-au aruncat asupra lor.\n\nDacă ai îndoieli, ține-le pentru tine. Nu-i poticni pe alții. Există un răspuns. Asaf spune că nu a putut înțelege până când a intrat în prezența lui Dumnezeu; acolo a văzut lucrurile din perspectiva sfârșitului.\n\nNu orice întrebare trebuie transformată imediat într-un mesaj public. Mai întâi intră în prezența lui Dumnezeu, așteaptă lumina Lui și lasă-L să-ți arate răspunsul înainte să pui povara nelămuririi tale peste credința altora.",
          source: source(
            "Psalm 73 ... if you have some doubts keep it to yourself. Don't stumble other people. There is an answer for it ... I couldn't understand it until I went into God's presence",
          ),
          explanationKind: "exposition",
          forYourHeart:
            "Nu transforma o îndoială nerezolvată într-un mesaj pentru alții. Du-o mai întâi în prezența lui Dumnezeu și așteaptă răspunsul Lui.",
        }
      }
      return unit
    }),
  }
}

function restorePsalm74(chapter: ExplainedOverlayChapter): ExplainedOverlayChapter {
  if (chapter.number !== 74) return chapter
  return {
    ...chapter,
    summary:
      "Psalmul 74 descrie un popor ale cărui locuri sfinte au fost devastate și al cărui semn cel mai grav este exprimat în versetul 9: nu mai văd semnele lor, nu mai este niciun profet și nimeni nu știe cât va dura. Acesta este singurul verset din Biblie care arată un semn că Dumnezeu a părăsit un popor: nu mai există glas profetic. Psalmul cheamă apoi la amintirea lucrărilor lui Dumnezeu și la rugăciune pentru intervenția Lui din nou.",
    units: chapter.units.map((unit) => {
      if (unit.from >= 1 && unit.from <= 12) {
        return {
          ...unit,
          heading: "Semnul că Dumnezeu a părăsit un popor: nu mai este profet",
          teaching:
            "Vrăjmașii au intrat în locul sfânt, și-au pus semnele acolo și au ars locurile de închinare. Dar versetul 9 arată semnul cel mai grav: «nu mai vedem semnele noastre; nu mai este niciun proroc și nu mai este nimeni printre noi care să știe până când».\n\nAcesta este singurul verset din Biblie care învață că un semn că Dumnezeu a părăsit un popor este lipsa profetului. Clădirile pot exista, activitatea poate continua, dar dacă Dumnezeu nu mai are un glas profetic care să spună poporului adevărul Lui, situația este foarte gravă.\n\nBiserica are nevoie nu doar de predici, programe și activitate, ci de oameni care aud de la Dumnezeu și vorbesc cuvântul Lui fără compromis. Absența unui astfel de glas este o pierdere mai serioasă decât pierderea unei clădiri.\n\nPsalmistul nu se resemnează. El își amintește lucrările lui Dumnezeu din trecut și Îl cheamă să Se ridice din nou pentru cauza Lui.",
          source: source(
            "Psalm 74 ... enemies got into your church ... defiled your holy place ... verse 9 ... the only verse in the Bible that teaches that one mark that God has forsaken a people is ... no prophet",
          ),
          explanationKind: "exposition",
          forYourHeart:
            "Nu măsura viața unei biserici doar prin activitate. Întreabă dacă Dumnezeu mai are acolo un glas care spune adevărul Lui.",
        }
      }
      return unit
    }),
  }
}

function restorePsalm103(chapter: ExplainedOverlayChapter): ExplainedOverlayChapter {
  if (chapter.number !== 103) return chapter
  return {
    ...chapter,
    summary:
      "David își cheamă sufletul să nu uite binefacerile DOMNULUI. El iartă toate păcatele, vindecă toate bolile, răscumpără viața, încununează cu bunătate și satisface cu bine. Iertarea și vindecarea erau beneficii disponibile în Vechiul Legământ. Tocmai de aceea întrebarea Evangheliei Noului Legământ este: ce ne-a adus Hristos mai mult? Biruința asupra păcatului, părtășirea naturii dumnezeiești și viața în Trupul lui Hristos aparțin acestei bogății mai mari.",
    units: chapter.units.map((unit) => {
      if (unit.from !== 1 || unit.to !== 5) return unit
      return {
        ...unit,
        heading: "Iertarea și vindecarea existau deja — ce aduce Noul Legământ mai mult?",
        teaching:
          "«Binecuvântează, suflete, pe DOMNUL și nu uita niciuna din binefacerile Lui.» David putea spune: «El îmi iartă toate păcatele» și «El îmi vindecă toate bolile». Aceasta dovedește că iertarea și vindecarea erau disponibile în Vechiul Legământ.\n\nBeneficiile vechiului legământ includeau iertarea, vindecarea, răscumpărarea vieții, bunătatea și binecuvântările prin care Dumnezeu purta de grijă poporului Său. Dacă acestea existau deja, Evanghelia Noului Legământ nu poate fi redusă la promisiunea acelorași beneficii.\n\nÎn Noul Legământ vine ceva mai mare: păcatul nu mai trebuie să stăpânească asupra noastră; Dumnezeu ne dă tot ce privește viața și evlavia și ne face părtași naturii Sale; ne așază într-un Trup în care trăim în părtășie cu ceilalți credincioși.\n\nDe aceea nu trebuie să predicăm Evanghelia ca și cum ținta ei cea mai înaltă ar fi doar iertarea, sănătatea și prosperitatea. Hristos ne aduce într-o viață de biruință asupra păcatului și de părtășie cu Dumnezeu.",
        source: source(
          "Psalm 103 ... forgives all my sins ... heals all your diseases ... that was also available under the old covenant ... old covenant benefits ... what is the new covenant gospel ... victory over sin",
        ),
        explanationKind: "exposition",
        forYourHeart:
          "Nu te opri la lucrurile pe care Dumnezeu le dădea deja în Vechiul Legământ. Caută viața de biruință și părtășie pentru care Hristos a adus Noul Legământ.",
      }
    }),
  }
}

function restorePsalm105(chapter: ExplainedOverlayChapter): ExplainedOverlayChapter {
  if (chapter.number !== 105) return chapter
  return {
    ...chapter,
    summary:
      "Psalmul își amintește legământul și protecția lui Dumnezeu asupra patriarhilor, apoi viața lui Iosif. «Nu vă atingeți de unșii Mei și nu faceți rău prorocilor Mei» devine un avertisment să nu vorbim rău despre slujitorii lui Dumnezeu. Putem spune că nu suntem de acord cu o lucrare sau cu felul în care cineva înțelege Scriptura, dar nu trebuie să trecem la vorbire de rău. Apoi Iosif arată cum Dumnezeu formează omul prin așteptare înainte să-i dea responsabilitate.",
    units: chapter.units.map((unit) => {
      if (unit.from === 1 && unit.to === 15) {
        return {
          ...unit,
          heading: "Nu vorbi rău despre unșii și prorocii lui Dumnezeu",
          teaching:
            "Psalmul spune: «Nu vă atingeți de unșii Mei și nu faceți rău prorocilor Mei». Acesta este un cuvânt de care trebuie să ne temem când vorbim despre oamenii pe care Dumnezeu îi folosește.\n\nPutem să nu fim de acord cu lucrarea cuiva. Putem spune deschis: «nu sunt de acord cu felul acesta de slujire» sau «nu înțeleg Scriptura în felul acesta și nu cred că aceasta este calea în care Isus vrea să se facă lucrarea». Dar există o diferență între dezacord și vorbirea de rău.\n\nNu trebuie să calomniem, să disprețuim sau să ne hrănim inima cu atacuri împotriva slujitorilor lui Dumnezeu. Dumnezeu Își păzește oamenii, iar gura noastră trebuie păzită în felul în care vorbim despre ei.\n\nAceastă frică de Dumnezeu nu cere să numești corect ceea ce crezi că este greșit. Poonen însuși spune că poate afirma «nu sunt de acord»; limita este trecerea de la discernământ la vorbire de rău.",
          source: source(
            "Psalm 105 ... I will not speak evil of them, but I will say I don't agree with their ministry ... touch not my anointed and don't do any harm to my prophets",
          ),
          explanationKind: "exposition",
          forYourHeart:
            "Învață să spui «nu sunt de acord» fără să-ți hrănești inima și gura cu vorbire de rău.",
        }
      }
      return unit
    }),
  }
}

export function restorePsalmiPoonenFidelity(book: ExplainedBookOverlay): ExplainedBookOverlay {
  return {
    ...book,
    chapters: book.chapters.map((chapter) =>
      restorePsalm105(
        restorePsalm103(
          restorePsalm74(restorePsalm73(restorePsalm69(restorePsalm51(restorePsalm32(chapter))))),
        ),
      ),
    ),
  }
}
