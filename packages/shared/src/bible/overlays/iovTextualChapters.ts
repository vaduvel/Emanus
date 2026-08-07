import type { ExplainedOverlayChapter } from "../explainedOverlay.js"

const n = { kind: "biblia-emanus" as const, note: "rezumat narativ fără doctrină adăugată" as const }

export const IOV_TEXTUAL_CHAPTERS: Readonly<Record<number, ExplainedOverlayChapter>> = {
  7: {
    number: 7,
    title: "Iov descrie viața ca muncă grea și Îi cere lui Dumnezeu să-i lase puțin răgaz",
    summary: "Discursul început în capitolul 6 se întoarce de la prieteni spre Dumnezeu. Iov compară viața cu slujba grea a unui muncitor, descrie nopțile fără odihnă și întreabă de ce suferința lui este cercetată clipă de clipă.",
    units: [
      { from: 1, to: 10, heading: "Zile ca ale unui lucrător care așteaptă plata și nopți fără odihnă", teaching: "Iov își descrie viața prin imaginea muncitorului care așteaptă sfârșitul zilei și a robului care dorește umbră. În locul odihnei primește luni de suferință și nopți în care timpul se târăște. Apoi își amintește cât de repede trec zilele și cât de definitivă pare moartea din perspectiva durerii lui.", source: n },
      { from: 11, to: 21, heading: "Iov vorbește fără să-și ascundă amărăciunea și întreabă de ce este cercetat neîncetat", teaching: "Pentru că suferința îl apasă, Iov spune că nu își va opri gura și Îi vorbește lui Dumnezeu din neliniștea sufletului. Somnul nu îi aduce scăpare, iar întrebările lui ajung la sensul atenției divine asupra omului: de ce este încercat în fiecare clipă și de ce vina lui, dacă există, nu este îndepărtată? Textul redă rugăciunea unui om aflat în agonie, nu o explicație finală a caracterului lui Dumnezeu.", source: n },
    ],
  },
  8: {
    number: 8,
    title: "Bildad apără dreptatea lui Dumnezeu, dar aplică prea simplu principiul la cazul lui Iov",
    summary: "Bildad îl mustră pe Iov și argumentează că Dumnezeu nu răstoarnă dreptatea. El apelează la tradiția generațiilor și promite un final bun omului curat, dar presupune că situația lui Iov poate fi explicată direct prin această schemă.",
    units: [
      { from: 1, to: 7, heading: "Dumnezeu nu strâmbă dreptatea — concluzia despre copiii lui Iov este însă a lui Bildad", teaching: "Bildad începe cu o afirmație adevărată despre Dumnezeu: El nu pervertește dreptatea. Apoi aplică imediat principiul la moartea copiilor lui Iov și sugerează că au fost dați în mâna propriei fărădelegi. Prologul cărții nu autorizase această explicație, astfel încât cuvintele lui Bildad trebuie păstrate ca argument al personajului, nu ca verdict narativ asupra copiilor.", source: n },
      { from: 8, to: 19, heading: "Tradiția generațiilor și imaginile plantei fără apă", teaching: "Bildad îl invită pe Iov să cerceteze învățătura generațiilor trecute și folosește papirusul, trestia și pânza de păianjen pentru a descrie cât de fragilă este speranța celui care Îl uită pe Dumnezeu. Argumentul lui este coerent ca înțelepciune generală, dar cartea testează tocmai folosirea mecanică a unei reguli generale pentru fiecare suferință particulară.", source: n },
      { from: 20, to: 22, heading: "Bildad promite că Dumnezeu nu leapădă omul fără vină", teaching: "Discursul se încheie afirmând că Dumnezeu nu leapădă omul integru și nu întărește mâna răufăcătorilor. Bildad anticipează un posibil final de bucurie pentru Iov, dar condiționează argumentul de propria lui presupunere despre cauza suferinței.", source: n },
    ],
  },
  9: {
    number: 9,
    title: "Iov recunoaște măreția lui Dumnezeu și simte că nu are un arbitru între el și Cel Atotputernic",
    summary: "Iov răspunde lui Bildad: știe că un om nu poate câștiga ușor un proces înaintea lui Dumnezeu. El descrie puterea Creatorului, apoi mărturisește că distanța dintre el și Dumnezeu îl face să tânjească după un mijlocitor.",
    units: [
      { from: 1, to: 13, heading: "Cine poate disputa cu Dumnezeul care mută munții și poruncește creației?", teaching: "Iov este de acord că omul nu poate fi drept înaintea lui Dumnezeu prin simpla confruntare juridică. El descrie înțelepciunea și puterea Celui care mută munții, zguduie pământul, poruncește soarelui și face constelațiile. Măreția divină devine pentru Iov motiv de uimire, dar și de teamă în situația lui.", source: n },
      { from: 14, to: 24, heading: "Chiar dacă ar avea dreptate în cazul lui, Iov nu se simte capabil să-și susțină cauza", teaching: "Iov spune că nu și-ar putea alege cuvintele ca să răspundă și că, în starea actuală, nu se poate bizui pe propria percepție pentru a-și demonstra nevinovăția. El descrie lumea din perspectiva durerii ca un loc în care cel fără vină și cel rău pot fi loviți de aceeași nenorocire. Aceste cuvinte sunt lamentația lui, nu concluzia finală a cărții despre guvernarea lui Dumnezeu.", source: n },
      { from: 25, to: 35, heading: "Zilele fug, iar Iov tânjește după cineva care să-și pună mâna peste amândoi", teaching: "Iov compară zilele cu un alergător și o corabie rapidă, apoi revine la imposibilitatea de a se curăți singur înaintea unui Dumnezeu incomparabil. Pentru că Dumnezeu nu este un om cu care să intre într-un proces de la egal la egal, Iov spune că lipsește un arbitru care să-și pună mâna peste amândoi și să îndepărteze frica.", source: n },
    ],
  },
  10: {
    number: 10,
    title: "Iov Îl întreabă pe Creator de ce lucrarea mâinilor Lui este acum zdrobită",
    summary: "Iov își continuă rugăciunea fără a-și ascunde dezgustul față de viață. El cere să i se arate acuzația, amintește cu uimire felul în care Dumnezeu l-a format și întreabă de ce a fost adus la viață pentru o asemenea suferință.",
    units: [
      { from: 1, to: 7, heading: "«Arată-mi pentru ce Te cerți cu mine»", teaching: "Iov decide să vorbească din amărăciune și Îi cere lui Dumnezeu să nu-l condamne fără să-i arate cauza. Întrebările lui pun în contrast cunoașterea lui Dumnezeu cu judecata omenească: Dumnezeu nu vede limitat și nu are nevoie de timp ca să descopere faptele, iar Iov spune că El știe că nu este vinovat de crimele presupuse de prieteni.", source: n },
      { from: 8, to: 17, heading: "Mâinile care l-au format sunt aceleași de care Iov se teme acum", teaching: "Iov amintește că Dumnezeu l-a modelat, i-a dat viață și i-a păstrat duhul. Tocmai de aceea suferința este greu de înțeles: omul format cu grijă simte acum că Creatorul îl urmărește pentru vină și aduce martori împotriva lui. Textul păstrează tensiunea trăită de Iov fără să confirme că Dumnezeu îl tratează realmente ca pe un criminal.", source: n },
      { from: 18, to: 22, heading: "Iov cere puțin răgaz înainte de țara întunericului", teaching: "Finalul revine la dorința ca nașterea să nu fi avut loc și la apropierea morții. Iov cere ca Dumnezeu să-Și retragă privirea pentru câteva clipe de ușurare înainte de a merge în locul pe care îl descrie prin întuneric și dezordine.", source: n },
    ],
  },
  11: {
    number: 11,
    title: "Țofar îl acuză pe Iov de vorbire multă și îi cere să se pocăiască de un păcat presupus",
    summary: "Al treilea prieten intră în discuție cu cea mai directă mustrare. Țofar afirmă măreția nepătrunsă a lui Dumnezeu și îi promite lui Iov speranță dacă își îndreaptă inima, dar pornește de la presupunerea că suferința dovedește o vină mai mare decât recunoaște Iov.",
    units: [
      { from: 1, to: 6, heading: "Țofar dorește ca Dumnezeu să-i arate lui Iov că primește chiar mai puțin decât ar merita", teaching: "Țofar tratează discursurile lui Iov ca pe vorbe care trebuie reduse la tăcere și spune că ar dori ca Dumnezeu Însuși să-i descopere tainele înțelepciunii. Concluzia lui că Dumnezeu uită o parte din nelegiuirea lui Iov este afirmația prietenului; prologul nu spusese că necazul este pedeapsa unei vinovății ascunse.", source: n },
      { from: 7, to: 12, heading: "Înălțimea și adâncimea înțelepciunii lui Dumnezeu depășesc cercetarea omului", teaching: "Țofar întreabă dacă Iov poate ajunge la marginile desăvârșirii Celui Atotputernic și folosește dimensiunile cerului, Locuinței morților, pământului și mării. El subliniază că Dumnezeu vede falsitatea omului și nu are nevoie să fie informat despre ea.", source: n },
      { from: 13, to: 20, heading: "Țofar promite lumină și siguranță dacă Iov își îndepărtează nelegiuirea", teaching: "Ultima parte îi cere lui Iov să-și îndrepte inima, să întindă mâinile spre Dumnezeu și să îndepărteze nelegiuirea din cort. Țofar descrie apoi o viață luminoasă și sigură, în contrast cu pierderea speranței celor răi. Problema cărții nu este că pocăința ar fi rea, ci că Țofar o prescrie pe baza unei diagnostici pe care narațiunea nu a confirmat-o.", source: n },
    ],
  },
  12: {
    number: 12,
    title: "Iov ironizează monopolul prietenilor asupra înțelepciunii și proclamă puterea lui Dumnezeu",
    summary: "Iov răspunde că nu este inferior prietenilor și că până și creația mărturisește stăpânirea lui Dumnezeu. El descrie apoi felul în care Dumnezeu poate răsturna sfatul, puterea, conducătorii și popoarele.",
    units: [
      { from: 1, to: 6, heading: "«Odată cu voi va muri și înțelepciunea?»", teaching: "Iov răspunde ironic pretenției prietenilor de a deține explicația. El spune că are și el pricepere și că omul care strigă către Dumnezeu poate ajunge obiect de batjocură pentru cel aflat în siguranță. Versetele descriu contrastul dureros dintre necazul lui și liniștea unor oameni violenți.", source: n },
      { from: 7, to: 12, heading: "Animalele, păsările, pământul și peștii mărturisesc mâna Creatorului", teaching: "Iov spune că lumea creată însăși poate învăța că viața fiecărei făpturi și suflarea omului sunt în mâna DOMNULUI. Apoi compară discernerea cuvintelor cu gustarea hranei și recunoaște valoarea experienței și vârstei fără să le facă infailibile.", source: n },
      { from: 13, to: 25, heading: "Dumnezeu răstoarnă planuri, dezbracă regi și schimbă poziția popoarelor", teaching: "Iov dezvoltă o descriere amplă a suveranității lui Dumnezeu asupra naturii, sfătuitorilor, judecătorilor, regilor, preoților, bătrânilor și națiunilor. Puterea și înțelepciunea nu aparțin definitiv niciunei instituții umane; Dumnezeu poate ridica și poate răsturna ceea ce oamenii consideră stabil.", source: n },
    ],
  },
  13: {
    number: 13,
    title: "Iov îi numește pe prieteni «doctori de nimic» și cere să-și poată prezenta cauza înaintea lui Dumnezeu",
    summary: "După ce afirmă că știe lucrurile invocate de prieteni, Iov îi acuză că Îl apără pe Dumnezeu prin argumente false. El este dispus să riște și să vorbească direct înaintea Lui, cerând doar să nu fie zdrobit de frică înainte de a-și prezenta cauza.",
    units: [
      { from: 1, to: 12, heading: "A vorbi fals pentru Dumnezeu nu Îl onorează", teaching: "Iov spune că a văzut și a înțeles lucrurile despre care prietenii îi vorbesc și că ar prefera să vorbească direct cu Cel Atotputernic. El îi numește pe prieteni falsificatori și doctori fără valoare și îi întreabă dacă este corect să fie părtinitori față de Dumnezeu folosind argumente neadevărate. Cartea nu cere apărarea lui Dumnezeu prin inventarea unei vinovății la cel care suferă.", source: n },
      { from: 13, to: 19, heading: "Iov își asumă riscul de a-și apăra căile înaintea Lui", teaching: "Iov le cere celorlalți să tacă și spune că își va lua viața în mâini pentru a vorbi. El exprimă simultan riscul și speranța că prezentarea sinceră a cauzei înaintea lui Dumnezeu poate deveni izbăvirea lui, deoarece un om nelegiuit nu ar veni astfel înaintea Lui.", source: n },
      { from: 20, to: 28, heading: "Două cereri: îndepărtează mâna și frica, apoi arată-mi fărădelegile", teaching: "Pentru a putea vorbi, Iov cere ca apăsarea mâinii lui Dumnezeu și groaza să fie îndepărtate. Apoi Îl invită pe Dumnezeu să cheme și el să răspundă sau invers și întreabă concret care sunt nelegiuirile lui. Finalul descrie sentimentul de a fi urmărit pentru păcate vechi și de a se descompune ca o haină mâncată de molii.", source: n },
    ],
  },
  14: {
    number: 14,
    title: "Iov privește fragilitatea omului și tânjește după posibilitatea unei rechemări din moarte",
    summary: "Discursul se mută de la procesul personal la condiția omului: viața este scurtă și plină de necaz. Un copac tăiat poate odrăsli din nou, dar omul pare să dispară; în această tensiune Iov își imaginează că Dumnezeu l-ar ascunde și apoi l-ar chema din nou.",
    units: [
      { from: 1, to: 6, heading: "Puține zile, multă tulburare și o limită pe care omul nu o poate trece", teaching: "Iov descrie omul născut din femeie ca având puține zile, înflorind și ofilindu-se ca floarea și fugind ca umbra. El Îl întreabă pe Dumnezeu de ce cercetează atât de strict o ființă atât de fragilă și cere puțină odihnă în timpul limitat care i-a fost măsurat.", source: n },
      { from: 7, to: 12, heading: "Un copac tăiat poate odrăsli, dar moartea omului pare fără întoarcere", teaching: "Imaginea copacului introduce un contrast dureros: chiar dacă rădăcina îmbătrânește, la mirosul apei poate înmuguri. Omul însă moare și, din perspectiva lui Iov, nu se ridică în ritmul obișnuit al lumii până când cerurile nu vor mai fi.", source: n },
      { from: 13, to: 17, heading: "«M-ai chema și Ți-aș răspunde» — o speranță formulată în mijlocul întrebării", teaching: "Iov își imaginează că Dumnezeu l-ar ascunde în Locuința morților până trece mânia și apoi i-ar fixa un timp pentru a-Și aminti de el. Întrebarea «dacă moare omul, va trăi din nou?» este urmată de imaginea unei chemări la care Iov ar răspunde și a dorului Creatorului după lucrarea mâinilor Sale.", source: n },
      { from: 18, to: 22, heading: "Muntele se surpă, stânca se mută, iar omul simte că speranța îi este erodată", teaching: "Finalul revine la imaginile eroziunii: muntele cade, piatra este tocită de apă, iar speranța omului pare nimicită. Iov descrie moartea ca despărțire de ceea ce se întâmplă cu familia rămasă și ca experiență a durerii propriei ființe.", source: n },
    ],
  },
  15: {
    number: 15,
    title: "Elifaz îl acuză pe Iov că își sapă singur cauza și descrie din nou neliniștea celui rău",
    summary: "În al doilea ciclu de discursuri, Elifaz devine mai aspru. El contestă cuvintele și pretenția lui Iov la înțelepciune, apoi oferă o descriere lungă a terorii și instabilității celui nelegiuit, lăsând implicit ca Iov să se recunoască în ea.",
    units: [
      { from: 1, to: 16, heading: "Elifaz transformă cuvintele durerii în dovadă împotriva lui Iov", teaching: "Elifaz îi spune lui Iov că răspunsurile lui sunt vânt și că propria gură îl condamnă. El întreabă dacă Iov a fost primul om și dacă are acces exclusiv la sfatul lui Dumnezeu, apoi revine la argumentul impurității omului. Tonul arată cum dialogul se mută de la încercarea de consolare la contestarea caracterului celui care suferă.", source: n },
      { from: 17, to: 35, heading: "Portretul celui rău devine avertisment indirect pentru Iov", teaching: "Elifaz prezintă ceea ce spune că înțelepții au transmis: cel rău trăiește în teamă, se ridică împotriva lui Dumnezeu, iar bogăția și casa lui nu rămân. Imaginile pântecelui care zămislește necaz și naște minciună încheie discursul. Cartea nu confirmă că fiecare detaliu al portretului descrie situația lui Iov.", source: n },
    ],
  },
  16: {
    number: 16,
    title: "Iov îi numește pe prieteni mângâietori obositori și caută un martor în cer",
    summary: "Iov răspunde că ar putea rosti aceleași discursuri dacă rolurile ar fi inversate, dar ar prefera să întărească. El descrie atacul pe care îl simte din partea lui Dumnezeu și a oamenilor, apoi afirmă că martorul lui este în cer.",
    units: [
      { from: 1, to: 5, heading: "«Mângâietori supărăcioși sunteți toți»", teaching: "Iov spune că a auzit multe asemenea cuvinte și îi numește pe prieteni mângâietori care nu aduc ușurare. Dacă locurile ar fi schimbate, spune el, ar putea și el să țină discursuri împotriva lor, dar ar putea alege să-i întărească prin cuvinte.", source: n },
      { from: 6, to: 17, heading: "Suferința este percepută ca o țintire continuă", teaching: "Iov spune că nici vorbirea, nici tăcerea nu îi reduc durerea și descrie în imagini foarte dure sentimentul că Dumnezeu l-a frânt, l-a dat celor răi și îl folosește ca țintă. El insistă că nu există violență în mâinile lui și că rugăciunea lui este curată. Acesta este limbajul experienței sale, nu o autorizare a concluziei că Dumnezeu este crud.", source: n },
      { from: 18, to: 22, heading: "«Martorul meu este în cer»", teaching: "Iov cere pământului să nu-i acopere sângele și spune că are în cer un martor și un garant. În timp ce prietenii îl batjocoresc și ochii îi varsă lacrimi înaintea lui Dumnezeu, el tânjește după cineva care să pledeze între om și Dumnezeu așa cum cineva ar pleda pentru prietenul său.", source: n },
    ],
  },
  17: {
    number: 17,
    title: "Iov se simte aproape de mormânt și nu găsește în explicațiile prietenilor speranța promisă",
    summary: "Răspunsul continuă cu sentimentul că viața lui se stinge. Iov cere un garant la Dumnezeu, descrie batjocura din jur și întreabă unde mai poate fi găsită speranța lui dacă mormântul devine singura casă vizibilă.",
    units: [
      { from: 1, to: 9, heading: "Batjocura îl înconjoară, dar Iov cere un garant la Dumnezeu", teaching: "Iov spune că duhul îi este frânt și mormintele îl așteaptă, în timp ce batjocoritorii sunt înaintea lui. El Îi cere lui Dumnezeu să pună zălog pentru el, deoarece nu găsește în jur pe cineva care să-i dea mâna. Versetele continuă cu efectul scandalos pe care cazul lui îl are asupra celor care privesc.", source: n },
      { from: 10, to: 16, heading: "Ziua s-a întunecat, iar Iov întreabă unde este speranța pe care ceilalți o promit", teaching: "Iov îi invită pe prieteni să revină cu argumentele lor, dar spune că nu găsește între ei un om cu adevărat înțelept. Planurile lui s-au rupt, iar dacă Locuința morților este casa lui și putrezirea îi devine familie, întrebarea finală este cine mai poate vedea speranța lui.", source: n },
    ],
  },
  18: {
    number: 18,
    title: "Bildad descrie stingerea luminii celui rău și îl lasă pe Iov sub amenințarea propriului portret",
    summary: "Bildad răspunde indignat și oferă o descriere sistematică a destinului celui rău: capcane, teroare, boală, pierderea casei și dispariția numelui. În contextul dialogului, portretul funcționează ca insinuare împotriva lui Iov.",
    units: [
      { from: 1, to: 4, heading: "Bildad se simte disprețuit de răspunsurile lui Iov", teaching: "Discursul începe cu reproșul că Iov îi tratează pe prieteni ca pe niște animale fără pricepere. Bildad îi cere să se oprească și întreabă dacă ordinea pământului trebuie schimbată de dragul furiei lui.", source: n },
      { from: 5, to: 21, heading: "Lumina, pașii, casa și numele celui rău dispar", teaching: "Restul capitolului construiește un tablou al celui rău: lumina i se stinge, merge în capcane, teroarea îl urmărește, puterea îi este mâncată, casa devine pustie și numele îi dispare. Bildad încheie numind aceasta locuința celui care nu-L cunoaște pe Dumnezeu. Cartea nu confirmă că diagnosticul lui despre Iov este corect.", source: n },
    ],
  },
  19: {
    number: 19,
    title: "În mijlocul izolării, Iov afirmă că Răscumpărătorul lui trăiește",
    summary: "Iov le cere prietenilor să înceteze zdrobirea prin cuvinte și descrie cum rude, cunoscuți, slujitori și chiar cei apropiați s-au îndepărtat. În centrul lamentației apare afirmația lui despre un Răscumpărător viu și dorința de a-L vedea pe Dumnezeu.",
    units: [
      { from: 1, to: 6, heading: "«De zece ori m-ați ocărât» — prietenii adaugă durere peste durere", teaching: "Iov întreabă cât timp îi vor zdrobi sufletul prin cuvinte și spune că, chiar dacă ar fi greșit, greșeala lui ar rămâne problema lui înaintea lui Dumnezeu. El percepe starea actuală ca pe o plasă în care a fost prins, nu ca pe dovada oferită de prieteni.", source: n },
      { from: 7, to: 20, heading: "Drumul este închis, rudele uită, iar omul suferind devine străin în propria casă", teaching: "Iov descrie lipsa de răspuns la strigăt, pierderea cinstei și izolarea socială. Frații, cunoscuții, rudele, oaspeții, slujitorii, soția și copiii nu mai răspund ca înainte. Durerea fizică și socială se împletesc până la imaginea de a fi scăpat numai cu pielea dinților.", source: n },
      { from: 21, to: 27, heading: "«Știu că Răscumpărătorul meu trăiește»", teaching: "Iov cere milă de la prietenii care îl urmăresc cu acuzații și dorește ca vorbele lui să fie scrise permanent. Apoi afirmă că Răscumpărătorul lui trăiește și că, dincolo de distrugerea trupului, dorește să-L vadă pe Dumnezeu cu propriii ochi. Textul exprimă una dintre cele mai puternice speranțe ale lui Iov în mijlocul cărții.", source: n },
      { from: 28, to: 29, heading: "Iov îi avertizează pe acuzatori că și judecata îi privește", teaching: "Ultimele versete întorc avertismentul spre prieteni: dacă ei continuă să spună că rădăcina necazului se găsește în el și să-l persecute astfel, trebuie să se teamă și ei de sabie și de judecată.", source: n },
    ],
  },
  20: {
    number: 20,
    title: "Țofar insistă că triumful celui rău este scurt și că dulceața păcatului devine otravă",
    summary: "Țofar răspunde cu un nou discurs despre destinul celui rău. El descrie plăcerea răului ca pe ceva păstrat dulce în gură, dar transformat în venin, iar câștigul nedrept ca pe ceva ce nu poate fi păstrat.",
    units: [
      { from: 1, to: 11, heading: "Triumful celui rău este descris ca foarte scurt", teaching: "Țofar spune că înțelegerea lui îl obligă să răspundă și afirmă ca principiu vechi că bucuria celui fără Dumnezeu durează puțin. Chiar dacă înălțimea lui ajunge până la cer, va dispărea și cei care îl văzuseră vor întreba unde este.", source: n },
      { from: 12, to: 22, heading: "Răul păstrat dulce în gură se schimbă în venin", teaching: "Imaginea centrală a discursului descrie răul ca pe o mâncare dulce păstrată sub limbă care devine otravă în stomac. Țofar vorbește apoi despre bogății înghițite și vărsate, despre exploatarea săracilor și despre neliniștea care rămâne chiar în mijlocul belșugului.", source: n },
      { from: 23, to: 29, heading: "Țofar descrie mânia ca porția finală a celui rău", teaching: "Ultima parte adună imagini de săgeți, foc și cer care descoperă nelegiuirea și încheie numind aceasta partea dată de Dumnezeu omului rău. În dialog, Țofar folosește doctrina retribuției ca explicație implicită pentru cazul lui Iov, deși cititorul știe din prolog că situația lui Iov nu a început astfel.", source: n },
    ],
  },
  21: {
    number: 21,
    title: "Iov răspunde: cei răi nu sunt întotdeauna pedepsiți imediat, iar realitatea nu încape în schema prietenilor",
    summary: "Iov îi roagă pe prieteni să-l asculte și le contestă modelul simplu de retribuție. El observă că oameni răi pot trăi mult, pot prospera și pot muri în pace, în timp ce alții mor în amărăciune.",
    units: [
      { from: 1, to: 6, heading: "Mai întâi ascultați, apoi batjocoriți dacă mai puteți", teaching: "Iov cere prietenilor o ascultare reală înainte de răspuns. El spune că plângerea lui nu este doar înaintea oamenilor și că, atunci când privește realitatea pe care urmează să o descrie, el însuși este cuprins de groază.", source: n },
      { from: 7, to: 16, heading: "Iov observă prosperitatea unor oameni care Îi spun lui Dumnezeu să plece de la ei", teaching: "Iov întreabă de ce cei răi pot trăi, îmbătrâni, vedea familii stabile și proprietăți prospere. El descrie oameni care nu doresc căile lui Dumnezeu și totuși își petrec zilele în bunăstare. Iov nu aprobă respingerea lui Dumnezeu, ci contestă ideea că judecata temporală apare mereu imediat și vizibil.", source: n },
      { from: 17, to: 26, heading: "Nu toți oamenii primesc aceeași experiență înainte de moarte", teaching: "Iov întreabă cât de des se stinge efectiv candela celor răi așa cum afirmă prietenii și discută ideea pedepsei copiilor pentru vina părinților. Apoi pune alături doi oameni: unul moare în putere și liniște, altul moare cu suflet amar, iar amândoi ajung în țărână.", source: n },
      { from: 27, to: 34, heading: "Explicațiile prietenilor sunt contrazise chiar de ceea ce observă călătorii", teaching: "Iov spune că știe gândurile prin care prietenii vor să dovedească vinovăția lui și îi trimite la mărturia oamenilor care au călătorit și au văzut cum cel rău poate fi cruțat în ziua nenorocirii și onorat până la mormânt. El încheie spunând că răspunsurile lor nu îl mângâie deoarece rămân false față de realitate.", source: n },
    ],
  },
  22: {
    number: 22,
    title: "Elifaz trece de la presupuneri la acuzații concrete pe care prologul nu le susține",
    summary: "În al treilea discurs, Elifaz susține că Dumnezeu nu câștigă nimic din dreptatea omului și îl acuză pe Iov de exploatare, lipsă de milă și nedreptate. Apoi îl cheamă să se împace cu Dumnezeu și îi promite restaurare.",
    units: [
      { from: 1, to: 11, heading: "Acuzațiile devin specifice: gajuri, lipsa apei și nedreptatea față de vulnerabili", teaching: "Elifaz întreabă dacă evlavia lui Iov ar putea aduce vreun folos lui Dumnezeu și apoi răspunde la necaz printr-o listă de crime: luarea hainelor ca gaj, refuzul apei și pâinii, trimiterea văduvei cu mâna goală și zdrobirea orfanilor. Aceste acuzații nu apar în prolog și vor contrasta cu mărturia lui Iov despre viața lui în capitolul 31.", source: n },
      { from: 12, to: 20, heading: "Elifaz îl avertizează să nu creadă că întunericul ascunde faptele de Dumnezeu", teaching: "Elifaz vorbește despre înălțimea lui Dumnezeu și ironizează ideea că norii L-ar împiedica să vadă. Apoi descrie calea veche a celor răi luați înainte de vreme și bucuria celor drepți la căderea lor.", source: n },
      { from: 21, to: 30, heading: "Chemarea la împăcare este adevărată ca principiu, dar este aplicată unui diagnostic inventat", teaching: "Discursul se încheie invitându-l pe Iov să se împace cu Dumnezeu, să primească Legea și să se întoarcă la Cel Atotputernic. Sunt promise pace, restaurare și eficiență în rugăciune. Problema nu este chemarea la Dumnezeu, ci faptul că Elifaz o întemeiază pe vina specifică pe care tocmai a atribuit-o fără dovadă lui Iov.", source: n },
    ],
  },
  23: {
    number: 23,
    title: "Iov ar vrea să ajungă la scaunul lui Dumnezeu și crede că ar fi ascultat, dar nu Îl poate găsi",
    summary: "Iov răspunde prin dorința de a-și prezenta cauza direct înaintea lui Dumnezeu. El este convins că ar putea înțelege răspunsul și că ar ieși ca aurul din încercare, însă experimentează absența lui Dumnezeu din orice direcție în care Îl caută.",
    units: [
      { from: 1, to: 7, heading: "Iov caută locul în care și-ar putea prezenta cauza", teaching: "Iov spune că plângerea lui rămâne amară și dorește să știe unde Îl poate găsi pe Dumnezeu pentru a ajunge la scaunul Lui. Și-ar așeza argumentele înaintea Lui și ar asculta răspunsul, având speranța că Dumnezeu nu l-ar zdrobi pur și simplu prin putere, ci ar lua seama la cauza unui om drept.", source: n },
      { from: 8, to: 12, heading: "Nu Îl vede în nicio direcție, dar afirmă că Dumnezeu îi cunoaște calea", teaching: "Iov caută înainte, înapoi, la stânga și la dreapta fără să-L poată percepe. Totuși spune că Dumnezeu cunoaște drumul pe care merge și că după încercare ar ieși ca aurul. El își mărturisește și atașamentul față de pașii și cuvintele lui Dumnezeu.", source: n },
      { from: 13, to: 17, heading: "Același Dumnezeu căutat este și Cel de care Iov se teme", teaching: "Iov recunoaște că Dumnezeu este unul și nimeni nu Îl poate întoarce de la ceea ce hotărăște. Această suveranitate nu îi aduce aici liniște, ci teamă, deoarece Iov nu cunoaște încă scopul prin care trece și se simte copleșit de întuneric.", source: n },
    ],
  },
  24: {
    number: 24,
    title: "Iov enumeră nedreptăți care par să continue fără o zi vizibilă de judecată",
    summary: "Continuând răspunsul la schema prietenilor, Iov întreabă de ce cei care Îl cunosc pe Dumnezeu nu văd mereu zilele judecății. El descrie confiscări, exploatarea săracilor, crimă și adulter ascunse în întuneric.",
    units: [
      { from: 1, to: 12, heading: "Hotare mutate, turme furate și oameni săraci împinși la margine", teaching: "Iov descrie oameni care mută hotarele, fură turme, iau măgarul orfanului și boul văduvei și îi scot pe săraci din drum. Cei vulnerabili ajung să caute hrană în pustiu, să lucreze viile altora și să doarmă fără acoperământ, în timp ce strigătul celor răniți se ridică din cetate.", source: n },
      { from: 13, to: 17, heading: "Ucigașul, hoțul și adulterul aleg întunericul", teaching: "O altă categorie este formată din cei care se răzvrătesc împotriva luminii. Ucigașul se ridică devreme, hoțul lucrează noaptea, iar adulterul așteaptă amurgul și își acoperă fața, tratând întunericul ca spațiu de siguranță pentru rău.", source: n },
      { from: 18, to: 25, heading: "Iov discută fragilitatea celor răi, dar refuză simplificarea timpului în care vine plata", teaching: "Finalul vorbește despre rapiditatea dispariției, uitarea din mormânt și frângerea nedreptății, dar și despre faptul că Dumnezeu poate prelungi viața celor puternici. Iov încheie provocând pe cineva să dovedească faptul că observația lui despre complexitatea realității este falsă.", source: n },
    ],
  },
  25: {
    number: 25,
    title: "Bildad reduce ultimul lui discurs la măreția lui Dumnezeu și micimea omului",
    summary: "Ultimul discurs foarte scurt al lui Bildad afirmă stăpânirea și pacea lui Dumnezeu și întreabă cum ar putea omul să fie curat înaintea Lui. Luna și stelele sunt palide în comparație cu sfințenia divină.",
    units: [
      { from: 1, to: 6, heading: "Măreția Creatorului este folosită din nou ca argument împotriva omului", teaching: "Bildad spune că domnia și frica aparțin lui Dumnezeu, ale Cărui oști nu pot fi numărate, și întreabă cum poate omul născut din femeie să fie curat. El compară chiar luna și stelele cu lumina lui Dumnezeu, apoi folosește limbaj foarte depreciativ despre om. Discursul exprimă perspectiva lui Bildad și nu este ultimul cuvânt al cărții despre demnitatea sau relația omului cu Creatorul.", source: n },
    ],
  },
  26: {
    number: 26,
    title: "Iov ironizează ajutorul primit și descrie măreția lui Dumnezeu ca fiind numai «marginile căilor Lui»",
    summary: "Iov întreabă sarcastic ce ajutor a oferit Bildad unui om fără putere, apoi rostește el însuși o descriere a stăpânirii lui Dumnezeu asupra morții, cerului, apelor și mării. Toate acestea sunt numite doar margini ale căilor Sale.",
    units: [
      { from: 1, to: 4, heading: "Ce fel de ajutor a fost oferit celui fără putere?", teaching: "Iov răspunde sarcastic întrebând cum l-a ajutat Bildad pe cel fără putere și cum i-a făcut cunoscută înțelepciunea. Întrebarea nu contestă că Bildad a rostit lucruri despre măreția lui Dumnezeu, ci dacă acele cuvinte au fost răspunsul potrivit omului aflat în fața lui.", source: n },
      { from: 5, to: 14, heading: "Locuința morților, cerul, norii și marea sunt sub stăpânirea Lui", teaching: "Iov descrie chiar el puterea lui Dumnezeu asupra lumii nevăzute și văzute: întinde nordul peste gol, suspendă pământul, ține apele în nori și liniștește marea. Finalul spune că acestea sunt doar marginile căilor Sale și că omul aude numai un murmur slab; tunetul puterii Lui depășește înțelegerea.", source: n },
    ],
  },
  27: {
    number: 27,
    title: "Iov refuză să-și declare vinovăția numai pentru a se potrivi teoriei prietenilor",
    summary: "Iov își continuă apărarea și spune că, atâta timp cât trăiește, nu va rosti minciună și nu își va lepăda integritatea. Apoi descrie partea celui rău, folosind limbaj asemănător prietenilor, dar fără a accepta că acest portret îl definește pe el.",
    units: [
      { from: 1, to: 6, heading: "«Până la moarte nu-mi voi lepăda integritatea»", teaching: "Iov jură înaintea Dumnezeului viu că nu va lăsa buzele să rostească neadevăr și refuză să le dea dreptate prietenilor printr-o mărturisire falsă. El spune că își ține dreptatea și că inima nu îl condamnă pentru zilele vieții sale.", source: n },
      { from: 7, to: 23, heading: "Iov descrie speranța fragilă și moștenirea celui rău", teaching: "Restul discursului vorbește despre lipsa speranței celui fără Dumnezeu când îi este luată viața și despre consecințe care ajung asupra familiei, averii și siguranței. Iov poate afirma realitatea judecății fără să accepte formula prietenilor că orice necaz actual dovedește automat o vină ascunsă.", source: n },
    ],
  },
  28: {
    number: 28,
    title: "Omul găsește metale în adâncuri, dar nu poate mina înțelepciunea",
    summary: "Un poem despre înțelepciune întrerupe disputa: omul pătrunde în întunericul pământului după aur și pietre, dar înțelepciunea nu se găsește în mine și nu poate fi cumpărată. Numai Dumnezeu îi cunoaște calea, iar pentru om frica de DOMNUL este înțelepciunea.",
    units: [
      { from: 1, to: 11, heading: "Tehnica omului pătrunde în locuri pe care animalele nu le cunosc", teaching: "Poemul descrie mine de argint, aur, fier și aramă, tuneluri săpate în întuneric și oameni care răstoarnă munții pentru pietre prețioase. Capacitatea umană de cercetare este impresionantă și poate scoate la lumină lucruri ascunse adânc în pământ.", source: n },
      { from: 12, to: 22, heading: "Înțelepciunea nu are un preț pe piața aurului și pietrelor", teaching: "Întrebarea repetată este unde se găsește înțelepciunea. Adâncul și marea spun că nu este în ele, iar aurul, argintul, onixul, safirul și cristalul nu o pot cumpăra sau egala. Capacitatea de a găsi resurse rare nu înseamnă automat acces la sens și înțelepciune.", source: n },
      { from: 23, to: 28, heading: "Dumnezeu cunoaște calea înțelepciunii, iar omului îi spune să se teamă de DOMNUL", teaching: "Dumnezeu vede marginile pământului și așază greutate vântului, măsură apelor și cale fulgerului. El vede și întemeiază înțelepciunea, iar concluzia adresată omului este că frica de DOMNUL este înțelepciunea și depărtarea de rău este priceperea.", source: n },
    ],
  },
  29: {
    number: 29,
    title: "Iov își amintește zilele când prezența lui Dumnezeu, familia și respectul cetății îl înconjurau",
    summary: "Iov privește înapoi spre viața de dinaintea suferinței. El își amintește apropierea lui Dumnezeu, copiii, belșugul și onoarea publică, apoi explică de ce oamenii îl respectau: apăra pe sărac, orfan, văduvă și pe cel fără ajutor.",
    units: [
      { from: 1, to: 6, heading: "Dorul după lunile în care lumina lui Dumnezeu îi călăuzea casa", teaching: "Iov dorește din nou zilele când simțea paza și lumina lui Dumnezeu, când copiii îi erau în jur și casa avea belșug. Memoria fericirii trecute face suferința actuală mai acută, dar oferă și contextul pentru afirmațiile despre viața lui publică.", source: n },
      { from: 7, to: 17, heading: "Cinstea de la poartă era legată de dreptatea făcută celor vulnerabili", teaching: "La poarta cetății, tinerii se retrăgeau, bătrânii se ridicau, iar conducătorii tăceau când Iov vorbea. El explică această reputație prin felul în care îl scăpa pe sărac, ajuta orfanul și văduva, era ochi pentru orb și picior pentru șchiop și frângea colții celui nedrept.", source: n },
      { from: 18, to: 25, heading: "Iov se aștepta la un final lung și stabil în rolul de sfătuitor", teaching: "Pe baza acelei vieți, Iov se aștepta să moară în casa lui după multe zile, ca un copac bine udat. Cuvintele lui erau așteptate, oamenii primeau sfatul și el stătea ca unul care mângâie pe cei întristați. Capitolul pregătește contrastul brutal din capitolul 30.", source: n },
    ],
  },
  30: {
    number: 30,
    title: "Omul respectat la poartă devine acum batjocura celor mai tineri",
    summary: "Iov contrastează trecutul onorat cu prezentul umilit. Oameni pe care îi considera lipsiți de statut îl batjocoresc, trupul și sufletul se prăbușesc, iar rugăciunea lui pare fără răspuns.",
    units: [
      { from: 1, to: 15, heading: "Respectul public este înlocuit de cântece de batjocură", teaching: "Iov descrie grupuri de oameni marginalizați pe care în trecut nici nu i-ar fi pus lângă câinii turmei și spune că acum fiii lor râd de el. Ei îi scuipă înainte, îi blochează drumul și îi nimicesc demnitatea, iar terorile vin asupra lui ca un vânt.", source: n },
      { from: 16, to: 23, heading: "Durerea nu doarme, iar Iov simte că strigătul lui rămâne fără răspuns", teaching: "Sufletul lui Iov se varsă, oasele îl dor noaptea și haina pare să-l strângă. El spune că Dumnezeu l-a aruncat în noroi și că stă înaintea Lui strigând fără un răspuns pe care să-l poată percepe, convins că este împins spre casa morții.", source: n },
      { from: 24, to: 31, heading: "Cel care plângea pentru nenorocirea altuia găsește acum numai jale pentru sine", teaching: "Iov întreabă dacă omul care cade nu întinde mâna și amintește că el însuși plângea pentru cel aflat în necaz și pentru sărac. Când aștepta binele a venit răul, iar trupul lui este descris prin febră și înnegrire; harpa și fluierul au ajuns instrumente ale plângerii.", source: n },
    ],
  },
  33: {
    number: 33,
    title: "Elihu îi răspunde lui Iov și afirmă că Dumnezeu poate vorbi în mai multe feluri",
    summary: "După introducerea din capitolul 32, Elihu se adresează direct lui Iov. El spune că este om ca și el, contestă ideea că Dumnezeu nu răspunde și descrie visele, suferința și intervenția unui mijlocitor ca moduri prin care omul poate fi oprit de la groapă.",
    units: [
      { from: 1, to: 7, heading: "Elihu promite să vorbească fără să-l strivească prin rang sau frică", teaching: "Elihu îi cere lui Iov să asculte și spune că va vorbi dintr-o inimă sinceră. El amintește că și el este făcut din lut și că Iov nu trebuie să se teamă de o presiune supraomenească din partea lui. Aceasta îl distinge în introducere de imaginea unui adversar inaccesibil pe care Iov o asociase cu procesul înaintea lui Dumnezeu.", source: n },
      { from: 8, to: 13, heading: "Elihu rezumă afirmația lui Iov și contestă concluzia că Dumnezeu refuză orice răspuns", teaching: "Elihu spune că l-a auzit pe Iov declarându-și curăția și plângându-se că Dumnezeu caută motive împotriva lui. Răspunsul lui este că Dumnezeu este mai mare decât omul și că omul nu Îl poate chema la socoteală ca și cum ar fi egalul Lui pentru faptul că nu răspunde în forma așteptată.", source: n },
      { from: 14, to: 22, heading: "Visul și suferința sunt descrise ca mijloace prin care omul poate fi oprit de la mândrie", teaching: "Elihu afirmă că Dumnezeu vorbește într-un fel și apoi în altul, chiar dacă omul nu observă. El descrie avertismentul prin vis și disciplina prin durere pe pat ca moduri prin care omul poate fi întors de la planurile sale și păzit de mândrie și de groapă.", source: n },
      { from: 23, to: 30, heading: "Un mesager care arată calea dreaptă și restaurarea omului", teaching: "Elihu introduce imaginea unui mesager sau mijlocitor care îi arată omului ce este drept, urmată de milă, răscumpărare și refacere. Omul se roagă, vede fața lui Dumnezeu cu bucurie și mărturisește că a păcătuit, iar Elihu spune că Dumnezeu poate face acestea de mai multe ori pentru a întoarce sufletul de la groapă.", source: n },
      { from: 31, to: 33, heading: "Elihu îi oferă lui Iov loc să răspundă", teaching: "La final, Elihu îi cere lui Iov să asculte, dar îi spune și că dacă are ceva de spus poate răspunde, deoarece dorește justificarea lui. Dacă nu, să continue să asculte și Elihu îi va vorbi despre înțelepciune.", source: n },
    ],
  },
  34: {
    number: 34,
    title: "Elihu apără dreptatea lui Dumnezeu și critică acuzația că ascultarea nu ar aduce folos",
    summary: "Elihu se adresează celor înțelepți din jur, citează afirmații ale lui Iov și argumentează că Dumnezeu nu face răul și nu judecă părtinitor. El insistă că toți oamenii depind de suflarea Creatorului.",
    units: [
      { from: 1, to: 9, heading: "Elihu îi cheamă pe cei care ascultă să cerceteze cuvintele", teaching: "Elihu îi invită pe cei înțelepți să aleagă ce este drept așa cum gura gustă mâncarea. El rezumă afirmația lui Iov că este drept și că a fost rănit în judecata sa și adaugă acuzația că Iov ar fi spus că omul nu câștigă nimic din plăcerea de Dumnezeu.", source: n },
      { from: 10, to: 15, heading: "Departe de Dumnezeu să facă răul; toată făptura depinde de suflarea Lui", teaching: "Elihu afirmă direct că răul și nedreptatea sunt incompatibile cu Dumnezeu și că El răsplătește omul după căile lui. Apoi spune că nimeni nu I-a încredințat pământul ca unui administrator și că, dacă Și-ar retrage suflarea, toată făptura ar pieri.", source: n },
      { from: 16, to: 30, heading: "Judecătorul regilor și săracilor nu are nevoie de o investigație ca omul", teaching: "Elihu întreabă dacă cineva care urăște dreptatea ar putea conduce și descrie pe Dumnezeu ca nepărtinitor față de prinți, bogați și săraci, deoarece toți sunt lucrarea mâinilor Lui. El poate răsturna popoare și conducători și vede căile oamenilor fără întuneric care să-i ascundă.", source: n },
      { from: 31, to: 37, heading: "Discursul se încheie criticând felul în care Iov a vorbit sub presiune", teaching: "Elihu imaginează o mărturisire prin care omul recunoaște disciplina și cere să-i fie arătat ce nu vede, apoi întreabă dacă răsplata trebuie să urmeze condițiile lui Iov. Finalul spune că Iov ar trebui încercat în continuare pentru răspunsurile lui și îl acuză că adaugă răzvrătire prin cuvinte.", source: n },
    ],
  },
  35: {
    number: 35,
    title: "Elihu discută întrebarea dacă dreptatea omului Îl face dator pe Dumnezeu",
    summary: "Elihu răspunde ideii că Iov nu vede un folos clar din dreptatea lui. El afirmă că răul și dreptatea omului îi ating în primul rând pe oameni, apoi vorbește despre strigătele celor apăsați și despre așteptarea unui Dumnezeu nevăzut.",
    units: [
      { from: 1, to: 8, heading: "Păcatul și dreptatea omului nu Îl transformă pe Dumnezeu într-un beneficiar dependent", teaching: "Elihu întreabă ce îi poate face omului Dumnezeu prin mulțimea păcatelor sau ce primește de la el prin dreptate, privind spre înălțimea cerurilor. Concluzia lui este că răul și dreptatea au efecte reale asupra altor oameni, în timp ce Dumnezeu nu devine dependent de performanța creaturii.", source: n },
      { from: 9, to: 16, heading: "Oamenii strigă sub apăsare, dar Elihu spune că strigătul trebuie să devină căutare a Creatorului", teaching: "Elihu observă că mulțimea apăsărilor produce strigăte, dar întreabă unde este căutarea lui Dumnezeu, Cel care dă cântări în noapte și învață omul. El spune că mândria și deșertăciunea pot face strigătul zadarnic și îl cheamă pe Iov să aștepte chiar când spune că nu Îl vede.", source: n },
    ],
  },
  36: {
    number: 36,
    title: "Elihu continuă: Dumnezeu este puternic, dar nu disprețuiește, și poate folosi suferința pentru instruire",
    summary: "Elihu cere încă puțină răbdare și dezvoltă tema puterii drepte a lui Dumnezeu. El descrie disciplina ca posibilă instruire pentru cei legați în necaz și îl avertizează pe Iov să nu lase mânia să-i deformeze răspunsul.",
    units: [
      { from: 1, to: 4, heading: "Elihu anunță că argumentul lui despre Dumnezeu nu s-a încheiat", teaching: "Elihu îi cere lui Iov să-l mai îngăduie puțin și spune că mai are cuvinte pentru Dumnezeu. El își revendică o cunoaștere adusă de departe și promite că argumentele nu vor fi minciună.", source: n },
      { from: 5, to: 15, heading: "Dumnezeu este puternic și poate deschide urechea prin necaz", teaching: "Elihu spune că Dumnezeu este puternic fără să disprețuiască pe nimeni și că nu păstrează viața celui rău, dar face dreptate celui sărac. Despre cei legați în necaz spune că Dumnezeu le arată faptele și mândria, le deschide urechea la disciplină și le cere întoarcere; suferința poate deveni în această prezentare un loc al instruirii, nu o dovadă automată a unei crime ascunse.", source: n },
      { from: 16, to: 23, heading: "Elihu îl avertizează pe Iov să nu transforme necazul în dispreț și mânie", teaching: "Discursul aplică principiul direct la Iov: el putea fi scos într-un loc larg, dar este acum prins în judecată. Elihu îl avertizează că mânia și mărimea răscumpărării nu trebuie să-l împingă spre batjocură sau spre dorința nopții în care popoarele dispar.", source: n },
      { from: 24, to: 33, heading: "În loc să-L judece pe Dumnezeu, Elihu îl cheamă pe Iov să-I mărească lucrarea", teaching: "Finalul schimbă tonul spre creație: oamenii văd lucrarea lui Dumnezeu de la depărtare, anii Lui nu pot fi cercetați, iar ciclul apei, norii, tunetul și fulgerele depășesc priceperea. Capitolul se încheie cu furtuna apropiindu-se și pregătind răspunsul lui Dumnezeu.", source: n },
    ],
  },
  37: {
    number: 37,
    title: "Elihu privește furtuna și îl cheamă pe Iov să se oprească înaintea minunilor lui Dumnezeu",
    summary: "Ultimul discurs al lui Elihu urmărește tunetul, fulgerul, zăpada, ploaia și vânturile ca lucrări ale lui Dumnezeu. El îl cheamă pe Iov să ia seama la minuni și încheie spunând că Cel Atotputernic este prea mare pentru a fi cercetat deplin.",
    units: [
      { from: 1, to: 13, heading: "Tunetul, fulgerul, zăpada și ploaia împlinesc scopuri pe care omul nu le controlează", teaching: "Elihu spune că inima îi tremură la glasul tunetului și descrie fulgerul întins sub cer. Apoi vorbește despre zăpadă, ploi, frig și vânt și spune că Dumnezeu poate folosi norii pentru disciplină, pentru pământ sau pentru bunătate.", source: n },
      { from: 14, to: 20, heading: "«Oprește-te și ia seama la minunile lui Dumnezeu»", teaching: "Iov este chemat să stea și să privească lucrările pe care nu le poate explica sau controla: echilibrarea norilor, lumina, căldura și întinderea cerului. Elihu întreabă cum ar putea omul întunecat în cunoaștere să-I spună lui Dumnezeu ce trebuie să-I declare.", source: n },
      { from: 21, to: 24, heading: "Lumina se arată după vânt, iar măreția Celui Atotputernic cere teamă", teaching: "Finalul folosește lumina care nu se vede până când vântul curăță cerul și splendoarea venită din nord. Elihu spune că Cel Atotputernic este mare în putere, dreptate și neprihănire și nu asuprește, de aceea oamenii se tem de El.", source: n },
    ],
  },
  38: {
    number: 38,
    title: "DOMNUL răspunde din furtună și îl întreabă pe Iov unde era când a fost întemeiată lumea",
    summary: "După toate discursurile oamenilor, Dumnezeu îi răspunde lui Iov printr-o serie de întrebări. Ele nu oferă o explicație simplă a prologului, ci lărgesc perspectiva spre fundațiile pământului, marea, zorii, lumina, vremea și hrănirea animalelor.",
    units: [
      { from: 1, to: 3, heading: "Răspunsul vine din furtună și începe cu o chemare la ascultare", teaching: "DOMNUL îi răspunde lui Iov din furtună și întreabă cine întunecă sfatul prin cuvinte fără cunoaștere. Iov este chemat să se încingă și să răspundă la întrebările care urmează.", source: n },
      { from: 4, to: 15, heading: "Temeliile pământului, hotarul mării și porunca dată zorilor", teaching: "Dumnezeu îl întreabă pe Iov unde era când pământul a fost întemeiat, cine i-a stabilit măsurile și cine a pus mării hotar. Apoi trece la dimineață și zori, care schimbă fața pământului și scot la lumină ceea ce era ascuns.", source: n },
      { from: 16, to: 24, heading: "Adâncul, porțile morții și locul luminii depășesc experiența lui Iov", teaching: "Întrebările coboară la izvoarele mării și porțile morții, apoi se mută la întinderea pământului și la căile luminii și întunericului. Iov este întrebat dacă le cunoaște locuința și drumul, punând limitele experienței omenești alături de amploarea creației.", source: n },
      { from: 25, to: 38, heading: "Calea fulgerului, ploaia peste pustiu și ordinea cerului", teaching: "Dumnezeu întreabă cine deschide canalul ploii și calea fulgerului, inclusiv peste regiuni fără oameni, cine dă naștere gheții și cine leagă constelațiile. Întrebările leagă fenomenele naturale de o ordine mai largă decât folosul imediat al omului.", source: n },
      { from: 39, to: 41, heading: "Leoaica și corbul primesc hrană dincolo de administrarea omului", teaching: "Capitolul se încheie mutând atenția de la cosmos la animale. Iov este întrebat dacă el vânează pentru leoaică sau pregătește hrana corbului când puii strigă, pregătind seria de întrebări despre lumea animală din capitolul următor.", source: n },
    ],
  },
  39: {
    number: 39,
    title: "Dumnezeu îl poartă pe Iov prin lumea animalelor pe care omul nu o controlează",
    summary: "Întrebările continuă cu caprele de munte, măgarul sălbatic, boul sălbatic, struțul, calul de război, șoimul și vulturul. Fiecare făptură are un mod de viață care nu depinde de administrarea lui Iov.",
    units: [
      { from: 1, to: 12, heading: "Nașterea animalelor sălbatice și libertatea pe care omul nu o domesticește", teaching: "Iov este întrebat dacă știe timpul nașterii caprelor de munte și dacă urmărește viața cerboaicelor. Apoi Dumnezeu descrie măgarul sălbatic, căruia i-a dat pustia drept casă, și boul sălbatic, pe care omul nu îl poate obliga să lucreze ogorul sau să aducă recolta după voia sa.", source: n },
      { from: 13, to: 18, heading: "Struțul: o combinație de limitări și capacități neobișnuite", teaching: "Struțul este descris prin aripi, ouă lăsate pe pământ și o aparentă lipsă de grijă, iar textul spune că Dumnezeu nu i-a dat aceeași înțelepciune ca altor făpturi. Totuși, când aleargă, poate râde de cal și călăreț; făptura nu încape într-o simplă clasificare de «bună» sau «rea» după utilitatea umană.", source: n },
      { from: 19, to: 25, heading: "Calul de război primește puterea și nu se întoarce de la luptă", teaching: "Dumnezeu îl întreabă pe Iov dacă el a dat calului puterea, coama și curajul. Animalul este descris lovind pământul, bucurându-se de putere și alergând spre arme, sunetul trâmbiței și mirosul luptei.", source: n },
      { from: 26, to: 30, heading: "Șoimul și vulturul zboară și cuibăresc fără porunca lui Iov", teaching: "Ultimele întrebări privesc zborul șoimului și cuibul înalt al vulturului. Puii vulturului găsesc hrană acolo unde sunt trupuri, iar Iov este confruntat încă o dată cu o lume vie care funcționează fără comanda lui.", source: n },
    ],
  },
  41: {
    number: 41,
    title: "Leviatanul arată o putere pe care omul nu o poate trata ca pe un animal domestic",
    summary: "După Behemot, Dumnezeu descrie Leviatanul prin întrebări despre capturare, îmblânzire și luptă. Portretul devine tot mai poetic și mai amenințător, până când făptura este numită rege peste cei mândri.",
    units: [
      { from: 1, to: 11, heading: "Dacă omul nu poate stăpâni Leviatanul, cu atât mai puțin Îl poate pune pe Creator în datorie", teaching: "Întrebările încep practic: poate Iov prinde Leviatanul cu undița, îi poate lega limba, îl poate transforma în animal de companie sau marfă? Ideea culminează cu faptul că speranța de a-l învinge este înșelătoare și cu întrebarea mai mare: cine poate sta înaintea Creatorului dacă nici această făptură nu poate fi tratată cu ușurință?
", source: n },
      { from: 12, to: 24, heading: "Trupul lui Leviatan este descris ca o armură greu de pătruns", teaching: "Dumnezeu trece la membre, putere, fălci, dinți și solzi, descriind corpul ca închis și greu de străpuns. Imaginile suflării și focului intensifică portretul poetic al unei creaturi care inspiră teamă și rezistă instrumentelor omului.", source: n },
      { from: 25, to: 34, heading: "Armele omului par paie înaintea lui, iar finalul îl numește rege peste cei mândri", teaching: "Când Leviatanul se ridică, vitejii se tem; sabia, sulița, săgeata și praștia sunt descrise ca ineficiente. Mișcarea lui tulbură adâncul, iar capitolul se încheie spunând că privește de sus tot ce este înalt și este rege peste fiii mândriei. În cadrul răspunsului divin, Iov este chemat să-și recunoască limitele înaintea unei creații pe care nu o stăpânește.", source: n },
    ],
  },
}
