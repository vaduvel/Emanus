import type { ExplainedOverlayChapter } from "../explainedOverlay.js"

const n = {
  kind: "biblia-emanus" as const,
  note: "rezumat textual fără doctrină adăugată" as const,
}

export const CANTAREA_DEEPENED: Readonly<Record<number, ExplainedOverlayChapter>> = {
  3: {
    number: 3,
    title: "Căutare, găsire și procesiunea împărătească",
    summary: "Poemul trece de la căutarea nocturnă a celui iubit la o scenă publică de nuntă și procesiune regală. Dorul personal și celebrarea comunitară sunt așezate în aceeași poezie a iubirii.",
    units: [
      { from: 1, to: 2, heading: "Dorul o scoate din pasivitate și o trimite să caute", teaching: "Femeia descrie nopțile în care îl caută pe cel iubit și nu îl găsește. În loc să rămână numai în dor, se ridică și pornește prin cetate, pe străzi și în piețe. Poemul surprinde intensitatea absenței și inițiativa persoanei care iubește, fără să transforme căutarea într-o regulă despre rolurile bărbatului și femeii.", source: n },
      { from: 3, to: 5, heading: "Găsirea aduce apropiere, iar refrenul oprește graba care forțează iubirea", teaching: "După întâlnirea cu străjerii, femeia îl găsește pe cel iubit și îl ține aproape. Îl conduce spre casa mamei, un spațiu familial și sigur. Secțiunea se încheie cu refrenul adresat fiicelor Ierusalimului: iubirea nu trebuie trezită sau forțată înainte de vreme. Dorința intensă nu anulează răbdarea și libertatea relației.", source: n },
      { from: 6, to: 8, heading: "Procesiunea apare din pustiu în parfum și sub pază", teaching: "Poemul schimbă perspectiva și întreabă cine vine din pustiu ca niște coloane de fum, înconjurat de parfumuri. Patul sau lectica lui Solomon este însoțită de războinici pregătiți pentru pericolele nopții. Scena este ceremonială și regală; paza exprimă onoarea și siguranța procesiunii, nu un model de dominare în relația de iubire.", source: n },
      { from: 9, to: 11, heading: "Lectica, coroana și ziua nunții mută iubirea în celebrarea publică", teaching: "Lemnul, argintul, aurul și purpura descriu bogăția vizuală a lecticii regale. Fiicele Sionului sunt chemate să îl privească pe Solomon cu coroana primită în ziua nunții, numită ziua bucuriei inimii lui. Intimitatea din prima parte a capitolului este astfel așezată lângă recunoașterea publică și festivă a legăturii.", source: n },
    ],
  },
  4: {
    number: 4,
    title: "Admirația trupului iubit și imaginea grădinii păstrate",
    summary: "Capitolul este o poezie de admirație conjugală în care frumusețea trupului este descrisă prin imagini ale naturii. Finalul mută imaginea spre o grădină păstrată, plină de parfum și apă vie.",
    units: [
      { from: 1, to: 5, heading: "Privirea iubitoare numește frumusețea fără rușinare", teaching: "Ochii, părul, dinții, buzele, tâmplele, gâtul și sânii sunt descriși prin imagini din lumea turmelor, fructelor, turnurilor și animalelor tinere. Metaforele nu stabilesc un standard universal de frumusețe; ele arată felul în care iubitul vede persoana concretă cu admirație. Trupul conjugal este vorbit fără rușine și fără degradare.", source: n },
      { from: 6, to: 7, heading: "Dorul și admirația ating o afirmație totală despre frumusețe", teaching: "Muntele smirnei și dealul tămâiei continuă limbajul parfumului și al dorinței până la schimbarea zilei. Apoi iubitul spune că ea este frumoasă în întregime. Afirmația aparține limbajului iubirii și aprecierii, nu unei evaluări medicale sau unei pretenții că persoana iubită ar fi literalmente lipsită de orice imperfecțiune umană.", source: n },
      { from: 8, to: 11, heading: "Chemarea spre apropiere este exprimată prin imagini de munți, privire și parfum", teaching: "Iubita este chemată din locuri montane descrise ca îndepărtate și periculoase. O singură privire sau podoabă este suficientă pentru a captiva inima iubitului. Buzele și hainele sunt asociate cu miere și parfum. Limbajul este intens și reciproc erotic, dar rămâne poezie a admirației, nu limbaj de posesie coercitivă.", source: n },
      { from: 12, to: 16, heading: "Grădina închisă devine imaginea intimității păstrate și apoi oferite liber", teaching: "Grădina închisă, izvorul pecetluit, plantele aromate și apa vie descriu frumusețea, exclusivitatea și fertilitatea spațiului intim. Finalul este important pentru reciprocitate: femeia cheamă vânturile și îl invită pe iubitul ei să intre în grădină și să se bucure de roade. Intimitatea nu este luată cu forța, ci oferită prin invitație.", source: n },
    ],
  },
  5: {
    number: 5,
    title: "Întârziere, pierdere și căutarea celui iubit",
    summary: "Capitolul schimbă tonul: o ezitare duce la absența celui iubit, iar căutarea devine dureroasă. Finalul nu se oprește în pierdere, ci o face pe femeie să descrie din nou ce anume iubește la el.",
    units: [
      { from: 1, to: 1, heading: "Scena de intimitate din capitolul anterior ajunge la împlinire", teaching: "Primul verset răspunde invitației din finalul capitolului 4 și descrie intrarea în grădină, gustarea roadelor și bucuria iubirii. Limbajul rămâne poetic și conjugal. Vocea care invită la mâncare și băutură amplifică celebrarea, fără să transforme relația într-un act rușinos sau ascuns de sensul literar al cărții.", source: n },
      { from: 2, to: 6, heading: "Ezitarea mică devine absență atunci când răspunsul vine prea târziu", teaching: "Femeia aude chemarea iubitului, dar răspunde prin motive legate de confort și întârzie deschiderea. Când în cele din urmă se ridică, el a plecat. Mâinile ei sunt pline de smirnă, iar sufletul îi tremură după cuvintele lui, însă ușa deschisă nu mai garantează prezența. Poemul descrie fragilitatea momentului relațional fără a transforma fiecare întârziere într-o vină morală absolută.", source: n },
      { from: 7, to: 8, heading: "Căutarea devine periculoasă, iar violența străjerilor este descrisă fără aprobare", teaching: "Străjerii o găsesc, o lovesc și îi iau vălul. Narațiunea nu oferă nicio justificare pentru această agresiune și nu trebuie citită ca disciplinare legitimă a femeii. Tocmai după această experiență ea cere fiicelor Ierusalimului să îi transmită iubitului că este bolnavă de dragoste, ceea ce păstrează centrul emoțional în dor și pierdere, nu în aprobarea violenței.", source: n },
      { from: 9, to: 16, heading: "Întrebarea comunității o face să articuleze de ce iubitul este unic pentru ea", teaching: "Fiicele Ierusalimului întreabă ce îl face diferit de alții. Răspunsul descrie capul, părul, ochii, obrajii, buzele, mâinile, trupul, picioarele și vorbirea lui prin aur, pietre, parfumuri și natură. Portretul nu pretinde un standard universal pentru bărbați, ci exprimă atracția unei femei față de persoana iubită. Ultima propoziție leagă iubirea de prietenie: acesta este iubitul și acesta este prietenul ei.", source: n },
    ],
  },
  7: {
    number: 7,
    title: "Admirație reciprocă și dorința de a ieși împreună în câmp",
    summary: "Capitolul continuă aprecierea trupului iubit și se mută apoi spre inițiativa femeii de a merge împreună în natură. Iubirea este descrisă ca reciprocă, vie și legată de prezență, nu doar de discurs.",
    units: [
      { from: 1, to: 5, heading: "Admirația pornește de la pași și urcă spre chip", teaching: "Picioarele, coapsele, pântecele, talia, sânii, gâtul, ochii, nasul și capul sunt descrise în succesiune prin bijuterii, grâu, animale tinere, turnuri și peisaje. Metaforele țin de poezia antică a frumuseții. Ele nu formează o listă de criterii corporale obligatorii, ci sunt limbajul personal al admirației dintre doi iubiți.", source: n },
      { from: 6, to: 9, heading: "Frumusețea este legată de dorința de apropiere și de plăcerea reciprocă", teaching: "Iubitul numește frumusețea femeii plăcută și o compară cu palmierul și ciorchinii. Dorința de a se apropia este exprimată direct prin imagini de fruct, parfum și vin. Poemul nu ascunde atracția sexuală din căsătorie și nici nu o transformă într-un discurs rușinos; în același timp, această atracție aparține relației reciproce, nu unui drept unilateral asupra trupului celuilalt.", source: n },
      { from: 10, to: 10, heading: "Apartenența și dorința sunt formulate din perspectiva femeii", teaching: "Femeia spune că este a iubitului ei și că dorința lui este spre ea. În contextul progresului urmărit de Poonen în capitolele tratate de el, formularea arată reciprocitatea relației. În sensul literar imediat, versetul nu anulează identitatea persoanei și nu justifică posesivitatea, ci exprimă siguranța iubirii împărtășite.", source: n },
      { from: 11, to: 13, heading: "Femeia ia inițiativa pentru timp împreună și pentru bucuria iubirii", teaching: "Ea îl invită să iasă în câmp, să rămână în sate și să vadă dacă viile și rodiile au înflorit. Natura devine cadrul unei întâlniri deliberate, nu doar decor. Mandragorele și roadele păstrate lângă ușă duc poemul spre darurile oferite iubitului. Inițiativa femeii arată din nou că iubirea descrisă de carte este reciprocă și participativă.", source: n },
    ],
  },
}
