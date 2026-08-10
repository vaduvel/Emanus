#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const dir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-reviewed-recovered")
const manifestPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-reviewed-recovered-manifest.json")
const targetFile = path.join(dir, "02-marcu.json")
const TRANSCRIPT_COMMIT = "fe97a4dee2849aaf4573a1046397b5194a171b4e"

function fail(message) { console.error(`[NT Poonen fidelity Mark 14-16] ${message}`); process.exit(1) }
function stable(value) { return JSON.stringify(value, null, 2) + "\n" }
function sha256(value) { return crypto.createHash("sha256").update(value).digest("hex") }

const EPISODES = {
  41: { passage: "Marcu 14:1-11", path: ".research/marcu-poonen/transcripts/041-lpY1yve1Nr4.txt", blobSha: "11967f5a3ef3b53e227d96cce88f19842de34799" },
  42: { passage: "Marcu 14:12-28", path: ".research/marcu-poonen/transcripts/042-AvFzdVpuCy0.txt", blobSha: "973674fc07bd33f03a5fe7a4f550776a452d3592" },
  43: { passage: "Marcu 14:29-36", path: ".research/marcu-poonen/transcripts/043-2AWaSiYFtX8.txt", blobSha: "5ddbeb4fb539201be43f17bc71383c23668a5143" },
  44: { passage: "Marcu 14:37-60", path: ".research/marcu-poonen/transcripts/044-fimUPWIsTeE.txt", blobSha: "4e214b4c5c2ae517e60fa8b2d716182048853719" },
  45: { passage: "Marcu 14:61-15:15", path: ".research/marcu-poonen/transcripts/045-kfGqSv1iV1s.txt", blobSha: "041d28b212bc72a5d74515201299a1d8d49248c1" },
  46: { passage: "Marcu 15:16-38", path: ".research/marcu-poonen/transcripts/046-QKHn1Itx4ow.txt", blobSha: "8cafff2cb174b733d6c9cff93e1e180b34a0866a" },
  47: { passage: "Marcu 15:39-16:13", path: ".research/marcu-poonen/transcripts/047-o7eDMcWVib4.txt", blobSha: "d264973cee1d0a311bb1bdcea71660b4dd9cc65f" },
  48: { passage: "Marcu 16:14-20", path: ".research/marcu-poonen/transcripts/048-OY9FmpABjkY.txt", blobSha: "a88e65007f3bd939e680d0c04ded59912fc13b71" },
}

const PATCHES = [
  {
    chapter: 14, from: 1, to: 11, episodes: [41],
    teaching: `În timp ce conducătorii caută o cale să-L omoare pe Isus, o femeie intră în casa lui Simon și sparge un vas cu mir foarte scump peste capul Lui. Ceilalți calculează prețul și numesc gestul risipă. Isus îl numește «un lucru frumos». Ea nu face ceea ce ar fi fost maxim eficient financiar; face ceea ce dragostea ei întreagă vede că este potrivit pentru Domnul.

Expunerea păstrează în centru cuvintele lui Isus: «Ea a făcut ce a putut.» Dumnezeu nu cere de la om ceea ce nu i-a dat, dar caută o inimă care nu păstrează rezerva pentru sine. Femeia nu toarnă câteva picături și apoi închide vasul pentru altă zi; sparge vasul. Gestul devine o imagine a unei vieți turnate fără rest la picioarele Domnului.

Contrastul cu Iuda este intenționat. Un ucenic apropiat de Isus poate ajunge să calculeze valoarea Domnului prin bani. Ioan arată că Iuda iubea banii, iar Marcu îl prezintă mergând la preoți imediat după episodul în care femeia «risipește» ceva scump pentru Isus. Iubirea banilor și devotamentul fără rezervă merg în direcții opuse.

Isus spune că fapta ei va fi pomenită oriunde va fi vestită Evanghelia. Ea pregătise trupul Lui pentru îngropare, poate fără să înțeleagă toate implicațiile. Ascultarea iubirii poate ajunge să slujească planului lui Dumnezeu mai adânc decât poate explica omul în momentul acțiunii.`,
    forYourHeart: "Nu întreba numai cât trebuie să-I dai Domnului. Întreabă dacă mai păstrezi pentru tine partea pe care dragostea ar vrea s-o verse la picioarele Lui.",
  },
  {
    chapter: 14, from: 12, to: 31, episodes: [42, 43],
    explanationSource: "poonen-transcript-primary+canonical-exegesis",
    researchSources: ["Exod 12", "1 Corinteni 10:16-17", "1 Corinteni 11:23-26", "Luca 22:31-34"],
    teaching: `Pregătirea Paștelui arată din nou că Isus nu este surprins de evenimente. Ucenicii găsesc exact omul și camera despre care le spusese. El merge spre moarte în controlul voii Tatălui, nu ca victimă a unui plan care I-a scăpat de sub control.

La masă, Isus spune că unul dintre cei doisprezece Îl va trăda. Faptul că Iuda fusese aproape de Domnul, primise responsabilitate și lucrase între ceilalți nu îl păzise automat. Expunerea continuă avertismentul început mai devreme: un început real nu ne scutește de nevoia de a păzi inima până la sfârșit, iar iubirea banilor poate crește în ascuns până când omul îl vinde pe Cel pe care cândva L-a urmat.

Pâinea frântă și paharul Legământului mută Paștele spre cruce. În această expunere, Cina nu este numai amintirea unui trup rănit fizic, ci chemarea la părtășie cu viața Lui dată și cu o voie proprie frântă înaintea Tatălui. «Acesta este sângele Meu» vestește prețul noului Legământ și iertarea prin moartea Lui. Paharul nu ne cheamă să ne mântuim prin propria suferință; ne face să ne amintim de sângele Lui și de seriozitatea unei vieți care, în urma Lui, rezistă păcatului și își predă voia.

După Cină, Isus vorbește despre un pahar viitor în Împărăție și apoi cântă împreună cu ucenicii înainte de Ghetsimani. Crucea nu este întâmpinată fără durere, dar nici fără speranță. El știe unde merge și știe că moartea nu este ultimul cuvânt.

Când spune că toți se vor poticni, Petru se declară excepția: chiar dacă toți cad, el nu va cădea. Isus nu este impresionat de încrederea puternică în sine. Tocmai Petru va descoperi cât de slabă este firea. Predica vede aici o lecție indispensabilă pentru conducere spirituală: omul puternic trebuie adus la frângere, ca după aceea să nu-i mai disprețuiască pe cei slabi și să nu-și mai pună nădejdea în propria hotărâre.`,
    forYourHeart: "Nu-ți construi fidelitatea pe promisiunea că tu vei fi excepția care nu cade. Hrănește-te din har, păzește-ți inima și lasă-L pe Dumnezeu să frângă încrederea în tine însuți.",
  },
  {
    chapter: 14, from: 32, to: 52, episodes: [43, 44],
    teaching: `În Ghetsimani, Isus spune că sufletul Lui este cuprins de o întristare până la moarte. Nu cosmetizează durerea. Cere Tatălui, dacă este posibil, să îndepărteze paharul și, în aceeași rugăciune, își predă voia: «nu ce voiesc Eu, ci ce voiești Tu». În această expunere, paharul este legat mai ales de ruptura părtășiei cu Tatăl pe care o va purta când va lua păcatul omenirii. Nu frica de cuie este prezentată drept centrul agoniei, ci prețul spiritual al purtării păcatului.

El le cere lui Petru, Iacov și Ioan să vegheze cu El. Isus trăise în dependență și părtășie, nu într-o spiritualitate de erou izolat. Există momente când omul lui Dumnezeu dorește ca frații apropiați să stea în rugăciune cu el. Ucenicii adorm. Petru, care se lăudase cel mai tare, este cel pe care Isus îl confruntă direct: «Simone, dormi?» Cu cât profesăm mai mult devotament, cu atât este mai grav să transformăm cuvintele, cântările și promisiunile în formule pe care nu intenționăm să le trăim.

«Vegheați și rugați-vă ca să nu intrați în ispită.» Spiritul este binevoitor, dar carnea este slabă. Expunerea insistă că Isus a luat adevărata slăbiciune a firii omenești și a biruit ispitele prin dependență de Tatăl și prin Duhul. Ucenicii aveau intenții bune, dar nu își cunoșteau slăbiciunea; fiindcă nu au vegheat și nu s-au rugat, în ora încercării Petru scoate sabia, ceilalți fug, iar mai târziu Petru se leapădă.

Isus repetă aceeași rugăciune. Repetarea nu este automat «repetiție goală»; problema este rugăciunea fără inimă. Când povara este reală, aceleași cuvinte pot fi strigate din nou și din nou înaintea lui Dumnezeu.

Când Iuda vine cu mulțimea, Isus este pregătit. Trădarea prin sărut arată cât de religios poate arăta falsul. Petru, nepregătit prin rugăciune, răspunde cu sabia. Isus răspunde fără panică și se supune împlinirii Scripturii. Ucenicii fug. Cuvintele mari ale serii sunt testate în câteva minute; ceea ce îi păstrează pe oameni în ispită nu este promisiunea lor despre sine, ci dependența de Dumnezeu.`,
    forYourHeart: "Nu aștepta ora ispitei ca să începi să te rogi. Veghează înainte, recunoaște slăbiciunea firii și predă-I Tatălui voia ta chiar când paharul pe care îl îngăduie doare.",
  },
  {
    chapter: 14, from: 53, to: 72, episodes: [44, 45],
    teaching: `Înaintea Sinedriului apar mărturii care nu se potrivesc. Unele folosesc chiar cuvinte apropiate de ceea ce Isus spusese despre Templu, dar Marcu le numește mărturii false. Expunerea scoate de aici o lecție importantă: minciuna nu stă numai în cuvinte inventate. Poți cita cuvintele reale ale cuiva și totuși să minți prin context, intenție și spirit, dacă le folosești ca să creezi o impresie falsă.

Isus tace sub acuzațiile false. Nu își cheltuiește energia apărându-și reputația. Își încredințează cauza Celui care judecă drept. Dar când marele preot Îl întreabă despre identitatea Lui — dacă este Hristosul, Fiul Celui binecuvântat — Isus răspunde: «Eu sunt» și mărturisește deschis adevărul pentru care va fi condamnat. Tăcerea creștină nu este negarea lui Hristos. Putem refuza autoapărarea și, în același timp, trebuie să ne deschidem gura când suntem întrebați dacă Îi aparținem Lui.

Marele preot, om religios care cunoștea Scriptura, Îl condamnă ca hulitor. Prejudecata poate face un om foarte biblic și foarte religios complet orb față de adevărul aflat înaintea lui. Religia nu protejează automat de împietrire; tocmai lumina repetat refuzată poate întări inima.

În curte, Petru este testat nu de o armată, ci de o slujnică. Omul care declarase că va muri cu Isus ajunge să spună că nu-L cunoaște și chiar să blesteme și să jure. Expunerea nu îl privește cu superioritate, ci ne cere să vedem în el slăbiciunea propriei firi. Fără har, suntem capabili de lucruri pe care astăzi le considerăm imposibile pentru noi.

Cocoșul cântă, Petru își amintește cuvântul și începe să plângă. Aici începe schimbarea lui. Frângerea nu este doar rușine care ne face să fugim de Dumnezeu, ci durerea care ne face să încetăm să ne mai încredem în noi. Acest om zdrobit va putea, prin harul și puterea Duhului, să stea mai târziu public pentru Hristos.`,
    forYourHeart: "Când ești acuzat fals, nu trebuie să-ți salvezi cu orice preț reputația. Dar când este vorba de apartenența la Hristos, nu-L nega. Iar dacă ai căzut, lasă păcatul să te ducă la frângere, nu la deznădejde.",
  },
  {
    chapter: 15, from: 1, to: 15, episodes: [45],
    teaching: `Dimineața, conducătorii religioși Îl predau pe Isus lui Pilat. Acuzațiile sunt multe, iar Isus nu se apără. Pilat este uimit de un prizonier care nu luptă pentru propria achitare. Din nou, tăcerea Lui nu înseamnă slăbiciune, ci încredințarea cauzei Tatălui.

Pilat vede că preoții L-au dat din invidie și știe că Isus este nevinovat. Totuși nu este suficient să cunoști adevărul în interior. Mulțimea cere pe Baraba, iar Pilat vrea «să mulțumească mulțimea». Aici este păcatul compromisului: omul știe ce este drept, dar își protejează poziția, slujba, siguranța sau popularitatea făcând lucrul greșit.

Expunerea refuză să ne lase să-l judecăm pe Pilat de la distanță. Același spirit apare când la serviciu, în școală, în familie sau în biserică știm ce este drept și totuși alegem răul pentru că ne temem ce vor spune oamenii sau ce vom pierde. Adevărul cunoscut, dar sacrificat pentru avantaj, devine vină reală.

Baraba, vinovat de răzvrătire și omor, este eliberat, iar Isus, singurul nevinovat, este dat să fie răstignit. Schimbul face vizibilă și logica Evangheliei: cel vinovat pleacă liber, iar Cel drept merge spre condamnare. Marcu nu prezintă crucea ca eșecul unui om bun, ci ca drumul voit al Fiului care Își dă viața pentru cei vinovați.`,
    forYourHeart: "Nu te mulțumi să știi în secret ce este drept. Când adevărul te costă poziția sau aprobarea, refuză spiritul lui Pilat și alege ascultarea.",
  },
  {
    chapter: 15, from: 16, to: 32, episodes: [46],
    teaching: `Soldații Îl îmbracă în purpură, Îi pun o cunună de spini, Îl lovesc, Îl scuipă și Îi mimează închinarea. Puterea omenească dezlănțuită asupra celui neajutorat arată cât de crudă poate deveni firea când crede că nu va da socoteală. Isus nu răspunde cu blestem, amenințare sau răzbunare. Își încredințează cauza Celui care judecă drept.

Simon din Cirene este forțat de soldați să poarte crucea. Expunerea face o distincție sănătoasă: soldații pot constrânge, Hristos cheamă. Când Isus spune «ia-ți crucea», El spune «dacă vrea cineva să vină după Mine». Moartea față de sine nu este produsă prin control religios exercitat asupra altora; este un răspuns voluntar al ucenicului la chemarea Domnului.

Isus refuză vinul cu smirnă care I-ar fi amorțit simțurile. Predica folosește imaginea ca avertisment împotriva vieții anesteziate spiritual de bani, confort și preocupări pământești. El rămâne treaz în ceasul crucii, pentru că încă are de iubit, de iertat și de împlinit voia Tatălui.

Trecătorii și conducătorii Îl provoacă să demonstreze puterea coborând de pe cruce. El refuză să fie magicianul unei demonstrații. În Vechiul Legământ, puterea lui Dumnezeu este adesea văzută prin izbăvirea omului din primejdie. Crucea arată o dimensiune mai adâncă a puterii Noului Legământ: Dumnezeu poate păstra un Om complet credincios chiar atunci când nu Îl scoate din suferință.

«Pe alții i-a salvat; pe Sine nu Se poate salva» este spus ca batjocură și, fără să vrea, descrie logica jertfei. Tocmai pentru a-i salva pe alții nu Se salvează pe Sine. Ucenicul nu este chemat să caute suferința, dar nici să folosească puterea, drepturile sau darurile numai pentru autoprotecție când dragostea cere dăruire.`,
    forYourHeart: "Nu cere mereu ca puterea lui Dumnezeu să se dovedească prin scăpare. Cere harul de a rămâne credincios și fără răzbunare chiar atunci când Tatăl te conduce printr-o cruce, nu în jurul ei.",
  },
  {
    chapter: 15, from: 33, to: 41, episodes: [46, 47],
    explanationSource: "poonen-transcript-primary+canonical-exegesis",
    researchSources: ["Psalmul 22", "Isaia 53", "2 Corinteni 5:21", "Evrei 10:19-22", "Romani 8:3"],
    teaching: `De la amiază până la ora a noua întunericul acoperă țara. Expunerea vede aceste ore ca centrul spiritual al crucii: Cel care nu cunoscuse păcat este făcut păcat pentru noi, poartă judecata și intră în părăsirea pe care păcatul o aduce. Strigătul «Dumnezeul Meu, Dumnezeul Meu, de ce M-ai părăsit?» nu este rebeliune. Chiar în întuneric El spune încă «Dumnezeul Meu».

Predica insistă că suferința spirituală a crucii este incomparabil mai adâncă decât rana cuielor. Relația de părtășie cu Tatăl, trăită neîntrerupt în viața Lui pământească, este atinsă de purtarea păcatului lumii. Această formulare trebuie citită împreună cu întregul canon despre unitatea Tatălui și Fiului și despre lucrarea ispășitoare; nu trebuie transformată într-o speculație ontologică despre destrămarea Dumnezeirii. Accentul expunerii este prețul real al păcatului și al răscumpărării.

Când Isus moare, perdeaua Templului se rupe de sus în jos. Dumnezeu deschide calea spre Locul Preasfânt. În această expunere, perdeaua este legată tipologic de «carne» și de calea nouă și vie din Evrei 10: Hristos a trăit în adevărata noastră umanitate, a fost ispitit și nu a cedat păcatului, iar prin moartea Lui calea spre părtășia cu Dumnezeu este deschisă. Tipologia predicii nu trebuie confundată cu o afirmație că însăși materia trupului ar fi rea; Noul Testament condamnă păcatul, nu trupul creat de Dumnezeu.

Centurionul, un om obișnuit cu răstignirile, vede felul în care Isus moare și spune că Acesta era Fiul lui Dumnezeu. Expunerea pune accentul nu numai pe întuneric și semne, ci pe atitudinea Celui răstignit: fără blestem, fără răzbunare, cu predare. «Fiii lui Dumnezeu» sunt făcuți vizibili când caracterul crucii apare în ei: când, sub presiune, nu întorc răul cu rău.

Femeile care Îl urmaseră și Îi slujiseră rămân martore. Crucea nu transformă ucenicia într-o competiție pentru vizibilitate. Credincioșia celor care au rămas aproape în ceasul cel mai întunecat este văzută de Dumnezeu chiar când nu ocupă centrul scenei.`,
    forYourHeart: "Privește crucea până când păcatul nu mai pare mic și răzbunarea nu mai pare justificată. Calea deschisă spre Tatăl trece prin harul lui Hristos și produce în noi caracterul Lui.",
  },
  {
    chapter: 15, from: 42, to: 47, episodes: [47],
    teaching: `Iosif din Arimateea este un membru important al Sfatului și totuși își face curaj să meargă la Pilat pentru trupul lui Isus. Petru avusese ani de privilegiu lângă Domnul și tocmai se lepădase; un om mult mai puțin vizibil iese acum în față. Aceasta ne amintește că Dumnezeu nu clasifică oamenii după reputația lor anterioară și că, în momente decisive, cei din urmă pot deveni cei dintâi prin curajul credinței.

Pilat verifică dacă Isus a murit cu adevărat, iar trupul este coborât, înfășurat și pus într-un mormânt săpat în stâncă. Înmormântarea este reală, nu simbolică. Evanghelia nu trece de la o moarte aparentă la o înviere spiritualizată; trupul mort este așezat într-un mormânt, iar femeile văd locul.

Expunerea observă și împlinirea Scripturii prin mormântul unui om bogat. Planul lui Dumnezeu continuă să se împlinească exact când totul pare pierdut. Ucenicii văd o piatră la intrare; Dumnezeu vede deja dimineața învierii.`,
    forYourHeart: "Nu presupune că ai ratat pentru totdeauna locul în lucrarea lui Dumnezeu fiindcă altcineva a avut mai multe privilegii. Fii credincios și curajos în momentul pe care El ți-l dă.",
  },
  {
    chapter: 16, from: 1, to: 8, episodes: [47],
    teaching: `Femeile vin foarte devreme cu mirodenii și se întreabă cine va rostogoli piatra. Când ajung, problema pe care nu o puteau rezolva este deja rezolvată. Piatra mare este dată la o parte, iar mormântul nu mai conține trupul lui Isus. Dumnezeu poate lucra înainte ca noi să ajungem la locul în care încă ne întrebăm cum va fi îndepărtat obstacolul.

Mesajul este simplu și central: Cel răstignit a fost înviat. Moartea, marele dușman al omului, a fost biruită. Expunerea leagă învierea de puterea lui Dumnezeu care lucrează după cruce: omul este chemat să accepte slăbiciunea crucii față de sine pentru a trăi nu prin propria putere, ci prin puterea lui Dumnezeu.

Apoi vine una dintre cele mai tandre expresii ale capitolului: «spuneți ucenicilor Lui și lui Petru». Petru știa că se lepădase și se putea considera exclus. Domnul îl numește în mod special. Frângerea pentru păcat nu îl face pe om indezirabil pentru har; tocmai omul care plânge sincer pentru că L-a dezonorat pe Domnul trebuie să audă că planul lui Dumnezeu nu s-a terminat cu el.

Femeile fug cu teamă și uimire. Marcu 16:1–8 nu idealizează martorii. Învierea îi întâlnește pe oameni reali — speriați, confuzi și lenți la credință — și începe să-i transforme. Puterea învierii nu are nevoie ca martorul să fie mai întâi eroul propriei povești.`,
    forYourHeart: "Când te uiți la o piatră prea mare, amintește-ți că Dumnezeu poate lucra înainte să ajungi. Iar dacă ai căzut ca Petru, lasă pocăința să te frângă, dar nu refuza mesajul harului care îți spune și ție pe nume să vii din nou după Domnul.",
  },
  {
    chapter: 16, from: 9, to: 14, episodes: [47, 48],
    explanationSource: "poonen-transcript-primary+textual-criticism",
    researchSources: ["SBLGNT Marcu 16", "MRK.16 Biblia Emanus editorialNotes", "Luca 24", "Ioan 20"],
    teaching: `În finalul lung al lui Marcu, Isus Se arată mai întâi Mariei Magdalena, apoi la doi ucenici și, în cele din urmă, celor unsprezece. Maria, femeia din care fuseseră scoase șapte duhuri, devine primul martor al învierii în această relatare. Harul poate lua un om din cea mai adâncă robie și îl poate face martor al Celui înviat.

Expunerea subliniază și demnitatea femeii ca martor al învierii, păstrând în același timp propria poziție complementariană despre rolurile de conducere și învățătură în adunare. Aceasta este poziția doctrinară a sursei; faptul incontestabil în narațiune este că Maria primește și duce vestea învierii.

Reacția apostolilor este necredința. Maria vorbește — nu cred. Cei doi vorbesc — nu cred. Când Isus li Se arată, îi mustră pentru necredință și împietrirea inimii. Expunerea consideră necredința un păcat mult mai grav decât o tratăm adesea: anxietatea și refuzul de a ne sprijini pe promisiunile lui Dumnezeu nu sunt doar trăsături de temperament. Viața creștină, mântuirea și sfințirea sunt trăite prin credință.

Există însă o chestiune textuală care trebuie spusă limpede. Marcu 16:9–20 este păstrat în multe manuscrise și în tradiția bisericească, dar lipsește din unele dintre cele mai vechi mărturii importante și SBLGNT îl marchează cu paranteze duble. Biblia Emanus păstrează integral aceste versete cu `textualStatus: double-bracketed` și păstrează separat și finalul scurt. Poonen expune versetele 9–20 ca parte a textului primit; această explicație păstrează fidel expunerea lui, dar nu ascunde starea critic-textuală și nu pretinde că predica rezolvă disputa manuscriselor.`,
    forYourHeart: "Nu lăsa slăbiciunea trecutului să te facă să crezi că nu mai poți fi martor. Dar nici nu transforma credința într-un motiv să ignori dovezile textuale; adevărul nu are nevoie de ascunderea complexității manuscriselor.",
  },
  {
    chapter: 16, from: 15, to: 20, episodes: [48],
    explanationSource: "poonen-transcript-primary+textual-criticism+canonical-exegesis",
    researchSources: ["Matei 28:18-20", "Fapte 1:8", "Fapte 16:16-18", "Fapte 28:1-6", "Coloseni 2:14-15", "1 Corinteni 12-14", "MRK.16 Biblia Emanus editorialNotes"],
    teaching: `În finalul lung, Isus îi trimite să vestească Evanghelia întregii creații. Expunerea insistă că aceasta este responsabilitatea întregii Biserici, deși nu fiecare credincios are darul de evanghelist. Toți sunt chemați să fie martori, iar cei chemați în mod special ca evangheliști duc mesajul mai departe. Dar Marea Trimitere din Marcu trebuie ținută împreună cu Matei 28: nu este suficient să obții o decizie inițială; oamenii trebuie făcuți ucenici și învățați să păzească poruncile lui Hristos.

«Cine crede și este botezat...» păstrează ordinea credință apoi botez. Condamnarea este legată în propoziția următoare de necredință, nu de lipsa unui act magic. În expunere, botezul urmează credinței și este parte din ascultarea ucenicului; mântuirea nu este cumpărată prin apă.

Semnele enumerate — alungarea demonilor, limbi noi, protecția în fața șerpilor sau otrăvii și vindecarea bolnavilor — sunt tratate de Poonen ca lucrări supranaturale reale ale Duhului, nu ca elemente încheiate obligatoriu cu epoca apostolilor. Poziția sursei este continuistă: darurile Duhului, inclusiv limbile și vindecările, pot lucra și astăzi. Aceasta rămâne poziția expunerii, nu o definiție lexicală.

În același timp, predica respinge folosirea lor ca spectacol. Credinciosul nu caută oameni demonizați ca să demonstreze puterea, nu caută șerpi și nu bea otravă pentru a-L testa pe Dumnezeu. Pavel nu a căutat vipera din Fapte 28; a fost protejat când primejdia a apărut în cursul ascultării. Puterea lui Dumnezeu este pentru necesitatea misiunii, nu pentru magie religioasă.

Poonen leagă alungarea demonilor de biruința lui Hristos la cruce și vorbirea în limbi de rugăciunea sau lauda în care duhul omului se exprimă dincolo de limitele minții. Aceste afirmații pneumatologice trebuie păstrate ca poziția sursei și cercetate separat în corpusul canonic, nu reduse la slogan și nici transformate în condiție universală că orice credincios trebuie să manifeste fiecare semn.

Domnul Se înalță și Se așază la dreapta lui Dumnezeu, iar ucenicii pleacă să predice. Ultima propoziție păstrează echilibrul: «Domnul lucra împreună cu ei». Misiunea adevărată nu este omul care inventează un proiect și cere apoi binecuvântarea lui Dumnezeu; este cooperarea cu Domnul în lucrarea la care El trimite, prin puterea Duhului și sub autoritatea Cuvântului.

Și aici rămâne aceeași notă critic-textuală: această secțiune 16:15–20 aparține finalului lung marcat `double-bracketed` în Biblia Emanus/SBLGNT. O explicăm fidel pentru că este parte a tradiției textuale și a corpusului de predici folosit, dar statutul manuscrisului este păstrat vizibil și nu este rezolvat prin autoritatea predicatorului.`,
    forYourHeart: "Fii martor, nu magician. Mergi unde te trimite Domnul, fă ucenici, caută puterea Duhului și lasă semnele în mâna Lui. Credința adevărată nu Îl testează pe Dumnezeu și nu ascunde adevărul textual.",
  },
]

if (!fs.existsSync(targetFile) || !fs.existsSync(manifestPath)) fail("reviewed Marcu corpus/manifest missing")
const book = JSON.parse(fs.readFileSync(targetFile, "utf8"))
const reviewed = []
for (const patch of PATCHES) {
  const chapter = (book.chapters ?? []).find((item) => item.number === patch.chapter)
  if (!chapter) fail(`Marcu ${patch.chapter}: chapter missing`)
  const unit = (chapter.units ?? []).find((item) => item.verseStart === patch.from && item.verseEnd === patch.to)
  if (!unit) fail(`Marcu ${patch.chapter}:${patch.from}-${patch.to}: target unit missing`)
  const primarySources = patch.episodes.map((episodeNumber) => {
    const episode = EPISODES[episodeNumber]
    if (!episode) fail(`Marcu ${patch.chapter}:${patch.from}-${patch.to}: episode ${episodeNumber} missing`)
    return { kind: "poonen-transcript", episode: episodeNumber, commitSha: TRANSCRIPT_COMMIT, path: episode.path, blobSha: episode.blobSha, passage: episode.passage }
  })
  unit.teaching = patch.teaching
  unit.forYourHeart = patch.forYourHeart
  unit.explanationKind = "exposition"
  unit.explanationSource = patch.explanationSource ?? "poonen-transcript-primary"
  if (Array.isArray(unit.words) && unit.words.length) {
    unit.wordSource = "Lexical/textual research tracked separately against SBLGNT/STEPBible TBESG; sermon doctrine, typology and manuscript judgments are not relabeled as lexical facts"
  }
  unit.sourceFidelity = {
    reviewState: "reviewed-against-raw-transcript",
    policy: "poonen-primary-research-only-where-source-is-thin",
    primarySources,
    ...(patch.researchSources?.length ? { supplementalResearch: { kind: patch.explanationSource?.includes("textual-criticism") ? "textual-criticism+canonical-exegesis" : "canonical-exegesis", sources: patch.researchSources, rule: "supplements/checks source without attributing research or textual-critical conclusions to the sermon" } } : {}),
  }
  reviewed.push({ ref: unit.ref, episodes: [...patch.episodes] })
}
fs.writeFileSync(targetFile, stable(book), "utf8")
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"))
const manifestBooks = []
let reviewedUnits = 0
for (const file of fs.readdirSync(dir).filter((name) => name.endsWith(".json")).sort()) {
  const full = path.join(dir, file)
  const data = JSON.parse(fs.readFileSync(full, "utf8"))
  const rendered = stable(data)
  reviewedUnits += (data.chapters ?? []).reduce((sum, chapter) => sum + (chapter.units ?? []).filter((unit) => unit.sourceFidelity?.reviewState === "reviewed-against-raw-transcript").length, 0)
  manifestBooks.push({ id: data.id, bookId: data.bookId, name: data.name, chapters: data.chapters?.length ?? 0, units: (data.chapters ?? []).reduce((sum, chapter) => sum + (chapter.units?.length ?? 0), 0), sha256: sha256(rendered) })
}
manifest.books = manifestBooks
manifest.counts = { ...manifest.counts, poonenRawTranscriptReviewedUnits: reviewedUnits }
fs.writeFileSync(manifestPath, stable(manifest), "utf8")
console.log(`NT Poonen fidelity Mark 14-16: ${reviewed.length} units reviewed; ${reviewedUnits} total raw-transcript-reviewed units.`)
