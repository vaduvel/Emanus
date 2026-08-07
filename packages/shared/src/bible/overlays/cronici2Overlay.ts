import {
  assertCompleteOverlay,
  transcriptFocusedChapters,
  type ExplainedBookOverlay,
  type ExplainedOverlayChapter,
} from "../explainedOverlay.js"

const transcript = ".research/poonen-through-the-bible-OT/transcripts/chronicles-ezra.txt"
const p = (anchor: string) => ({ kind: "poonen" as const, transcript, anchor })
const n = { kind: "biblia-emanus" as const, note: "rezumat narativ fără doctrină adăugată" as const }

const focused: Record<number, ExplainedOverlayChapter> = {
  1: {
    number: 1,
    title: "Solomon cere înțelepciune înainte de bogăție și putere",
    summary: "După întărirea domniei, Solomon merge la altarul din Gabaon. Dumnezeu îl invită să ceară, iar regele cere înțelepciune și pricepere pentru conducerea poporului; bogăția și cinstea îi sunt apoi adăugate.",
    units: [
      { from: 1, to: 6, heading: "Domnia este întărită, iar Solomon caută pe Dumnezeu la Gabaon", teaching: "Capitolul începe spunând că Solomon este întărit în împărăție și că DOMNUL era cu el. Regele adună conducătorii și merge cu adunarea la cortul întâlnirii din Gabaon, unde aduce jertfe pe altarul de aramă.", source: n },
      { from: 7, to: 13, heading: "Cererea lui Solomon este legată de responsabilitatea de a conduce poporul", teaching: "Când Dumnezeu îi spune să ceară ce dorește, Solomon amintește bunătatea arătată lui David și propria responsabilitate asupra unui popor numeros. El cere înțelepciune și cunoaștere ca să poată ieși și intra înaintea poporului, iar răspunsul spune că bogăția, averea și cinstea îi vor fi date în plus.", source: n },
      { from: 14, to: 17, heading: "Bogăția, carele și comerțul regal cresc", teaching: "Ultimele versete descriu acumularea carelor și călăreților, abundența argintului și aurului și comerțul cu cai și care. Cronicarul trece astfel de la cererea de înțelepciune la resursele foarte mari ale curții lui Solomon.", source: n },
    ],
  },
  2: {
    number: 2,
    title: "Solomon pregătește templul prin oameni, materiale și cooperarea cu Hiram",
    summary: "Regele numără lucrătorii, îi cere lui Hiram din Tir lemn și un meșter priceput și explică măreția Casei pe care vrea să o zidească. Hiram răspunde prin materiale și prin trimiterea lui Huram-Abi.",
    units: [
      { from: 1, to: 2, heading: "Munca este organizată înainte de începerea construcției", teaching: "Solomon hotărăște să zidească o Casă pentru Numele DOMNULUI și o casă regală, apoi repartizează zeci de mii de oameni pentru transport, tăiere în munte și supravegherea lucrului. Pregătirea proiectului începe cu distribuirea responsabilităților.", source: n },
      { from: 3, to: 10, heading: "Solomon îi explică lui Hiram scopul Casei și cere lemn și pricepere", teaching: "Mesajul către Hiram leagă construcția de arderea tămâiei, pâinea punerii înainte și jertfele regulate. Solomon declară că Dumnezeu este mai mare decât toți dumnezeii și recunoaște că nicio clădire nu Îl poate cuprinde, apoi cere cedru, chiparos, lemn de santal și un meșter priceput.", source: n },
      { from: 11, to: 16, heading: "Hiram răspunde și îl trimite pe Huram-Abi", teaching: "Hiram răspunde în scris binecuvântând pe Dumnezeul lui Israel pentru că i-a dat lui David un fiu priceput și promite materialele cerute. El îl trimite și pe Huram-Abi, descris ca lucrător priceput în mai multe materiale și capabil să colaboreze cu meșterii lui David și Solomon.", source: n },
      { from: 17, to: 18, heading: "Străinii din țară sunt numărați pentru munca proiectului", teaching: "Solomon numără străinii aflați în țara lui Israel și îi distribuie între purtători de poveri, tăietori în munte și supraveghetori. Capitolul încheie pregătirea prin această structură mare de muncă.", source: n },
    ],
  },
  3: {
    number: 3,
    title: "Templul începe pe muntele Moria, pe locul pregătit de David",
    summary: "Solomon începe construcția Casei la Ierusalim, pe muntele Moria și pe aria lui Ornan. Capitolul descrie dimensiunile, materialele, Locul Preasfânt, heruvimii, perdeaua și cei doi stâlpi.",
    units: [
      { from: 1, to: 2, heading: "Locul templului leagă proiectul lui Solomon de aria lui Ornan", teaching: "Construcția începe la Ierusalim pe muntele Moria, în locul pregătit de David pe aria lui Ornan. Cronicarul notează și momentul începerii lucrării în domnia lui Solomon.", source: n },
      { from: 3, to: 7, heading: "Dimensiuni, pridvor, lemn și aur pentru Casa lui Dumnezeu", teaching: "Sunt date măsuri pentru temelie și pridvor, iar interiorul este acoperit cu lemn și aur. Pietre prețioase și decorații apar în descriere, subliniind investiția extraordinară în spațiul destinat închinării.", source: n },
      { from: 8, to: 14, heading: "Locul Preasfânt, heruvimii și perdeaua", teaching: "Locul Preasfânt este descris separat, cu aur, heruvimi mari ale căror aripi se întind peste încăpere și o perdea lucrată cu culori și heruvimi. Capitolul concentrează aici simbolurile spațiului interior al sanctuarului.", source: n },
      { from: 15, to: 17, heading: "Iachin și Boaz la intrarea templului", teaching: "Doi stâlpi mari sunt ridicați înaintea Casei, împodobiți și numiți Iachin și Boaz. Ei încheie descrierea arhitecturală a capitolului prin elementele vizibile de la intrare.", source: n },
    ],
  },
  4: {
    number: 4,
    title: "Altarul, marea de aramă și vasele templului",
    summary: "După clădire, sunt descrise obiectele mari ale curții și ale Casei: altarul de aramă, marea, lighenele, sfeșnicele, mesele, curțile și numeroase vase făcute de Huram și Solomon.",
    units: [
      { from: 1, to: 6, heading: "Altarul, marea și lighenele pentru curățire", teaching: "Capitolul începe cu altarul de aramă și cu marea turnată, susținută de doisprezece boi. Sunt adăugate zece lighene pentru spălarea lucrurilor folosite la arderile-de-tot, în timp ce marea este asociată cu spălarea preoților.", source: n },
      { from: 7, to: 10, heading: "Sfeșnice, mese și curți", teaching: "Zece sfeșnice și zece mese sunt așezate potrivit rânduielii, sunt făcute o sută de potire, iar curtea preoților și curtea cea mare sunt delimitate. Marea este așezată în partea dreaptă a Casei.", source: n },
      { from: 11, to: 18, heading: "Huram termină lucrările de aramă", teaching: "Huram produce vase, lopeți, potire, stâlpi, capiteluri, rețele, boi, marea și alte obiecte. Ele sunt turnate în câmpia Iordanului, iar cantitatea de aramă este atât de mare încât greutatea nu este calculată.", source: n },
      { from: 19, to: 22, heading: "Obiectele de aur pentru interiorul Casei", teaching: "Solomon face altarul de aur, mesele, sfeșnicele, florile, candelele, mucările și alte unelte din aur curat. Descrierea se încheie cu ușile și intrările acoperite cu aur.", source: n },
    ],
  },
  5: {
    number: 5,
    title: "Chivotul intră în templu, iar slava DOMNULUI umple Casa",
    summary: "Lucrările sunt terminate, obiectele închinate de David sunt aduse în vistierii, iar chivotul este purtat în Locul Preasfânt. Când preoții și cântăreții se unesc în laudă, norul slavei umple Casa.",
    units: [
      { from: 1, to: 1, heading: "Lucrările se încheie, iar darurile lui David sunt aduse în vistierii", teaching: "După terminarea construcției, Solomon aduce în templu argintul, aurul și obiectele pe care David le consacrase și le așază între comorile Casei lui Dumnezeu.", source: n },
      { from: 2, to: 10, heading: "Chivotul este adus din cetatea lui David în Locul Preasfânt", teaching: "Bătrânii și conducătorii sunt adunați, leviții ridică chivotul și obiectele sanctuarului, iar Solomon și adunarea aduc jertfe. Chivotul este așezat sub aripile heruvimilor, iar textul notează că în el se aflau tablele puse acolo de Moise la Horeb.", source: n },
      { from: 11, to: 14, heading: "Cântăreții și trâmbițele devin ca un singur glas, iar norul umple Casa", teaching: "Preoții ies din sanctuar, iar leviții cântăreți cu instrumentele și o sută douăzeci de preoți cu trâmbițe laudă împreună bunătatea și îndurarea DOMNULUI. Atunci Casa este umplută de nor, iar preoții nu mai pot continua slujirea din cauza slavei.", source: n },
    ],
  },
  6: {
    number: 6,
    title: "Solomon binecuvântează adunarea și se roagă ca Dumnezeu să audă din cer",
    summary: "Regele interpretează templul ca împlinire a promisiunii făcute lui David, apoi se așază înaintea altarului și rostește o rugăciune amplă pentru dreptate, iertare, ploaie, străin, război și întoarcere din exil.",
    units: [
      { from: 1, to: 11, heading: "Casa este legată de promisiunea făcută lui David", teaching: "Solomon se întoarce spre adunare și amintește dorința lui David de a zidi Casa, alegerea Ierusalimului și alegerea fiului care avea să construiască. El spune că a dus la îndeplinire ceea ce DOMNUL rostise și că chivotul legământului este așezat în Casă.", source: n },
      { from: 12, to: 21, heading: "Nici cerurile nu-L pot cuprinde, dar Solomon cere ca rugăciunea spre acest loc să fie auzită", teaching: "Solomon îngenunchează înaintea adunării și recunoaște că nici cerurile cerurilor nu Îl pot cuprinde pe Dumnezeu. Templul nu este prezentat ca un container al lui Dumnezeu, ci ca locul spre care rugăciunea este orientată, iar regele cere ca Dumnezeu să audă din locuința Lui cerească și să ierte.", source: n },
      { from: 22, to: 23, heading: "Când un caz ajunge înaintea altarului, dreptatea să fie făcută", teaching: "Prima situație concretă din rugăciune este un conflict între oameni în care jurământul ajunge înaintea altarului. Solomon cere ca Dumnezeu să audă, să judece și să dea fiecăruia după dreptatea sau vinovăția lui.", source: n },
      { from: 24, to: 27, heading: "Înfrângerea și seceta sunt legate de chemarea la întoarcere", teaching: "Solomon se roagă pentru situații în care Israel este înfrânt sau cerul este închis și poporul se întoarce, mărturisește Numele și se roagă. Cererea este ca Dumnezeu să ierte, să arate calea bună și să dea din nou ploaie.", source: n },
      { from: 28, to: 31, heading: "Foametea, boala și necazul personal sunt aduse înaintea lui Dumnezeu", teaching: "Rugăciunea enumeră foamete, ciumă, secetă, lăcuste, asediu și alte lovituri, apoi ajunge la rugăciunea fiecărui om care își cunoaște rana și durerea. Solomon cere ca Dumnezeu să audă și să răsplătească după inimă, pe care numai El o cunoaște.", source: n },
      { from: 32, to: 33, heading: "Și străinul care vine pentru Numele DOMNULUI să fie auzit", teaching: "Solomon include explicit străinul care nu este din Israel, dar vine dintr-o țară depărtată pentru Numele lui Dumnezeu. Scopul cererii este ca popoarele pământului să cunoască Numele și să se teamă de Dumnezeu.", source: n },
      { from: 34, to: 39, heading: "Războiul și exilul: rugăciune pentru poporul care se întoarce din inimă", teaching: "Regele cere ajutor când poporul merge la luptă pe calea trimisă de Dumnezeu, apoi privește chiar spre posibilitatea exilului din cauza păcatului. Dacă în captivitate oamenii își vin în fire, se întorc și se roagă, Solomon cere ca Dumnezeu să audă și să le susțină cauza.", source: n },
      { from: 40, to: 42, heading: "Rugăciunea se încheie cerând atenția lui Dumnezeu și amintirea bunătății față de David", teaching: "Ultimele versete cer ca ochii și urechile lui Dumnezeu să fie deschise spre rugăciunea acestui loc și Îl cheamă simbolic să intre în odihnă împreună cu chivotul puterii. Finalul invocă bunătățile arătate lui David.", source: n },
    ],
  },
  7: {
    number: 7,
    title: "Focul cade, templul este dedicat, iar Dumnezeu răspunde lui Solomon",
    summary: "La sfârșitul rugăciunii, focul mistuie jertfa și slava umple Casa. După sărbătoare, Dumnezeu îi apare lui Solomon și leagă rugăciunea, smerirea și întoarcerea de iertare, dar avertizează și asupra abandonării legământului.",
    units: [
      { from: 1, to: 3, heading: "Focul și slava răspund rugăciunii de dedicare", teaching: "Când Solomon termină rugăciunea, focul coboară și mistuie jertfele, iar slava DOMNULUI umple Casa. Poporul se pleacă și laudă bunătatea și îndurarea Lui.", source: n },
      { from: 4, to: 10, heading: "Jertfe numeroase și o sărbătoare prelungită în jurul dedicării", teaching: "Solomon și poporul aduc un număr foarte mare de jertfe, iar preoții și leviții slujesc. Dedicarea altarului și sărbătoarea țin mai multe zile, după care poporul pleacă spre case cu bucurie pentru binele făcut lui David, Solomon și Israel.", source: n },
      { from: 11, to: 16, heading: "Dumnezeu spune că a auzit rugăciunea și descrie întoarcerea poporului", teaching: "Dumnezeu îi apare lui Solomon și spune că a ales Casa. În situații de secetă, lăcuste sau ciumă, răspunsul cerut poporului care poartă Numele Lui este smerirea, rugăciunea, căutarea feței Lui și întoarcerea de la căile rele; răspunsul promis este auzirea, iertarea și vindecarea țării lor în cadrul legământului lui Israel.", source: n },
      { from: 17, to: 22, heading: "Promisiunea pentru tron este însoțită de avertismentul abandonării", teaching: "Solomon este chemat să umble înaintea lui Dumnezeu ca David, iar continuitatea tronului este legată de fidelitate. În același timp, textul avertizează că abandonarea poruncilor și slujirea altor dumnezei vor duce la smulgerea din țară și la transformarea Casei într-un semn al judecății.", source: n },
    ],
  },
  8: {
    number: 8,
    title: "Proiectele lui Solomon, administrarea țării și ritmul slujirii templului",
    summary: "După construirea templului și palatului, Solomon întărește cetăți, organizează munca și administrația, mută fiica lui Faraon și păstrează rânduielile cultice stabilite pentru templu.",
    units: [
      { from: 1, to: 6, heading: "Cetăți reconstruite, depozite și fortificații", teaching: "Solomon reconstruiește cetăți primite sau cucerite, întărește zone strategice și ridică cetăți pentru provizii, care și călăreți. Capitolul prezintă infrastructura dezvoltată după marile proiecte de la Ierusalim.", source: n },
      { from: 7, to: 10, heading: "Popoarele rămase sunt puse la muncă, iar israeliții primesc roluri militare și de conducere", teaching: "Descendenții popoarelor canaanite rămase în țară sunt folosiți pentru muncă obligatorie, în timp ce israeliții sunt descriși ca războinici și conducători. Sunt amintiți și supraveghetorii lucrărilor regelui.", source: n },
      { from: 11, to: 16, heading: "Casa regală și slujirea templului sunt ținute în cadre distincte", teaching: "Solomon mută fiica lui Faraon din cetatea lui David, apoi textul revine la jertfele regulate, sabate, luni noi și sărbători și la cetele preoților și leviților rânduite de David. Cronicarul subliniază că lucrarea Casei era organizată pe zile și responsabilități.", source: n },
      { from: 17, to: 18, heading: "Flota ajunge la Ofir și aduce aur", teaching: "Hiram trimite corăbii și marinari pricepuți, iar oamenii lui Solomon merg la Ofir și aduc o mare cantitate de aur. Finalul capitolului leagă domnia și de comerțul maritim internațional.", source: n },
    ],
  },
  9: {
    number: 9,
    title: "Împărăteasa din Seba vede înțelepciunea și bogăția lui Solomon",
    summary: "O regină străină vine să-l testeze pe Solomon și pleacă impresionată de răspunsuri, ordine și închinare. Capitolul adună apoi bogăția, comerțul și faima regelui înainte de moartea lui.",
    units: [
      { from: 1, to: 12, heading: "Întrebările împărătesei sunt urmate de recunoașterea înțelepciunii lui Solomon", teaching: "Împărăteasa din Seba vine cu întrebări grele și cu daruri. După ce Solomon îi răspunde și ea vede casa, masa, slujitorii și urcarea spre Casa DOMNULUI, spune că realitatea depășește vestea auzită și Îl binecuvântează pe Dumnezeu pentru alegerea regelui spre dreptate.", source: n },
      { from: 13, to: 21, heading: "Aurul, scuturile, tronul și vasele descriu bogăția curții", teaching: "Cronicarul enumeră venitul anual de aur, scuturi, tronul de fildeș și aur, vasele și comerțul maritim. Argintul este descris ca foarte comun la Ierusalim în această perioadă.", source: n },
      { from: 22, to: 28, heading: "Regii caută înțelepciunea lui Solomon, iar comerțul și armata cresc", teaching: "Faima lui Solomon atrage regi care vin să-i audă înțelepciunea și aduc daruri. El adună care și călăreți, extinde resursele și domină peste regatele din jur într-o perioadă de mare putere politică.", source: n },
      { from: 29, to: 31, heading: "Domnia lui Solomon se încheie și Roboam îi urmează", teaching: "Ultimele versete trimit la izvoarele istorice despre Solomon, rezumă cei patruzeci de ani de domnie și consemnează moartea și îngroparea lui. Roboam devine împărat în locul său, pregătind ruptura din capitolul următor.", source: n },
    ],
  },
  10: {
    number: 10,
    title: "Roboam respinge sfatul bătrânilor și răspunde poporului cu un jug mai greu",
    summary: "La Sihem, Israel cere ușurarea muncii impuse de Solomon. Roboam compară sfatul bătrânilor cu sfatul tinerilor crescuți cu el și alege răspunsul dur, iar regatul se rupe.",
    units: [
      { from: 1, to: 5, heading: "Poporul cere un jug mai ușor", teaching: "Roboam merge la Sihem pentru încoronare, iar Ieroboam este chemat înapoi. Adunarea spune că jugul pus de Solomon fusese greu și cere ca munca și povara să fie ușurate, promițând slujire în schimb.", source: n },
      { from: 6, to: 11, heading: "Bătrânii recomandă bunătate, tinerii recomandă intimidare", teaching: "Sfetnicii bătrâni îl îndeamnă pe Roboam să se poarte cu bunătate și să vorbească favorabil poporului. Regele părăsește sfatul lor și consultă tinerii crescuți împreună cu el, care îi propun să amenințe cu o povară și mai grea.", source: n },
      { from: 12, to: 15, heading: "Roboam răspunde aspru, iar cronicarul leagă întorsătura de cuvântul rostit mai înainte", teaching: "La întoarcerea poporului, Roboam repetă sfatul tinerilor și refuză cererea. Cronicarul notează că împăratul nu a ascultat poporul și așază această întorsătură în legătură cu împlinirea cuvântului rostit prin Ahia despre Ieroboam.", source: n },
      { from: 16, to: 19, heading: "Israel se desparte de casa lui David", teaching: "Când vede că regele nu ascultă, Israel răspunde că nu are parte cu David și pleacă la corturi. Roboam continuă să domnească peste copiii lui Israel care locuiau în cetățile lui Iuda, iar Adoram este ucis când este trimis la popor.", source: n },
    ],
  },
  11: {
    number: 11,
    title: "Roboam oprește războiul cu frații lui și întărește Iuda",
    summary: "După ruperea regatului, Roboam vrea să recupereze Israelul prin război, dar ascultă cuvântul transmis prin Șemaia. Apoi fortifică cetățile, iar preoți și leviți părăsesc regatul de nord și vin la Ierusalim.",
    units: [
      { from: 1, to: 4, heading: "Cuvântul lui Dumnezeu oprește un război între frați", teaching: "Roboam adună o armată mare din Iuda și Beniamin pentru a readuce Israelul sub stăpânirea lui. Prin Șemaia vine însă porunca să nu lupte împotriva fraților lor, iar oamenii ascultă și se întorc acasă.", source: n },
      { from: 5, to: 12, heading: "Roboam fortifică cetățile și le aprovizionează", teaching: "Regele locuiește la Ierusalim și construiește sau întărește o serie de cetăți din Iuda și Beniamin, punând conducători, provizii, scuturi și sulițe. Regatul sudic este astfel consolidat după ruptura politică.", source: n },
      { from: 13, to: 17, heading: "Preoții și leviții părăsesc regatul de nord și întăresc Iuda trei ani", teaching: "Leviții din întreg Israelul vin în Iuda după ce Ieroboam și fiii lui îi îndepărtează de slujirea preoțească și organizează un alt cult. Oameni care își pun inima să-L caute pe DOMNUL îi urmează la Ierusalim, iar textul spune că astfel regatul lui Roboam este întărit timp de trei ani.", source: n },
      { from: 18, to: 23, heading: "Familia lui Roboam și pregătirea succesiunii", teaching: "Ultima secțiune enumeră soțiile și copiii lui Roboam și spune că Maaca și fiul ei Abia primesc o poziție deosebită. Roboam își răspândește fiii prin cetățile întărite și le dă resurse, pregătind administrarea și succesiunea.", source: n },
    ],
  },
  12: {
    number: 12,
    title: "Când Roboam se întărește, părăsește Legea; invazia lui Șișac îl smerește",
    summary: "După stabilizarea domniei, Roboam și poporul se abat. Egiptul invadează, prorocul Șemaia explică situația, iar smerirea conducătorilor aduce o limitare a distrugerii, nu dispariția consecințelor.",
    units: [
      { from: 1, to: 4, heading: "Puterea dobândită este urmată de părăsirea Legii", teaching: "Textul leagă direct momentul întăririi domniei de abandonarea Legii de către Roboam și Israelul aflat cu el. În al cincilea an, Șișac al Egiptului urcă împotriva Ierusalimului cu o armată foarte mare și cucerește cetățile întărite.", source: n },
      { from: 5, to: 8, heading: "«Voi M-ați părăsit, și Eu v-am lăsat» — conducătorii se smeresc", teaching: "Șemaia îi spune regelui și conducătorilor că invazia este legată de părăsirea DOMNULUI. Ei răspund recunoscând dreptatea Lui, iar textul spune că, deoarece s-au smerit, nu vor fi nimiciți complet; totuși vor sluji lui Șișac și vor cunoaște diferența dintre slujirea lui Dumnezeu și slujirea împărățiilor.", source: n },
      { from: 9, to: 12, heading: "Aurul este luat, iar scuturile de aur sunt înlocuite cu scuturi de aramă", teaching: "Șișac ia comorile Casei și palatului, inclusiv scuturile de aur ale lui Solomon. Roboam le înlocuiește cu scuturi de aramă păzite de garda palatului. Cronicarul notează totuși că, deoarece regele s-a smerit, mânia s-a întors și lucruri bune mai erau în Iuda.", source: n },
      { from: 13, to: 16, heading: "Rezumatul domniei: Roboam nu și-a pregătit inima să caute pe DOMNUL", teaching: "Finalul rezumă domnia de șaptesprezece ani și oferă evaluarea că Roboam a făcut rău pentru că nu și-a pus inima să-L caute pe DOMNUL. Moartea lui face loc domniei lui Abia.", source: n },
    ],
  },
  13: {
    number: 13,
    title: "Abia confruntă regatul lui Ieroboam și câștigă după ce Iuda strigă către DOMNUL",
    summary: "Abia intră în război cu o armată mai mică și rostește un discurs despre casa lui David, preoție și cult. Ieroboam pregătește o ambuscadă, dar Iuda strigă către Dumnezeu și Israel este înfrânt.",
    units: [
      { from: 1, to: 3, heading: "Două armate foarte inegale se așază față în față", teaching: "Abia începe domnia în Iuda și intră în război cu Ieroboam. Cronicarul oferă numere foarte mari pentru ambele armate, cea a lui Israel fiind de două ori mai numeroasă decât cea a lui Iuda.", source: n },
      { from: 4, to: 12, heading: "Abia invocă legământul davidic și diferența dintre cele două sisteme de cult", teaching: "De pe muntele Țemaraim, Abia argumentează că împărăția dată casei lui David și preoția fiilor lui Aaron au fost abandonate de regatul lui Ieroboam, unde fuseseră făcuți viței de aur și preoți după altă rânduială. Discursul este cuvântul regelui în contextul războiului și trebuie citit ca atare, chiar dacă cronicarul îl așază favorabil înaintea rezultatului.", source: n },
      { from: 13, to: 18, heading: "Ambuscada îi înconjoară, dar Iuda strigă și preoții sună din trâmbițe", teaching: "Ieroboam trimite o ambuscadă în spatele lui Iuda. Când oamenii văd lupta în față și în spate, strigă către DOMNUL, iar preoții sună din trâmbițe. Israel este înfrânt, iar cronicarul explică biruința prin sprijinirea lui Iuda pe Dumnezeul părinților lor.", source: n },
      { from: 19, to: 22, heading: "Abia câștigă cetăți, iar puterea lui Ieroboam scade", teaching: "Abia urmărește pe Ieroboam și ia mai multe cetăți. Ieroboam nu își mai recapătă puterea în zilele lui Abia, în timp ce Abia este descris crescând în putere și familie înainte ca istoria lui să fie trimisă la izvoare profetice.", source: n },
    ],
  },
  14: {
    number: 14,
    title: "Asa îndepărtează idolatria, întărește cetățile și strigă către DOMNUL împotriva unei armate uriașe",
    summary: "Într-o perioadă de pace, Asa face reforme și folosește timpul pentru fortificare. Când Zerah etiopianul vine cu o armată covârșitoare, regele se roagă și Iuda câștigă.",
    units: [
      { from: 1, to: 8, heading: "Pacea este folosită pentru reformă și pregătire", teaching: "Asa este prezentat făcând ce este bine, îndepărtând altare străine și chemând Iuda să caute pe DOMNUL și să împlinească Legea. În anii de odihnă, construiește și întărește cetăți și organizează o armată echipată.", source: n },
      { from: 9, to: 15, heading: "«Ajută-ne, căci pe Tine ne sprijinim»", teaching: "Zerah vine cu o armată foarte mare, iar Asa iese în întâmpinare. Rugăciunea lui spune că pentru Dumnezeu nu există diferență între a ajuta pe cel puternic și pe cel fără putere și cere ajutor pentru că Iuda se sprijină pe El. Armata adversă este înfrântă, iar oamenii se întorc cu multă pradă.", source: n },
    ],
  },
  15: {
    number: 15,
    title: "Asa caută pe DOMNUL și primește chemarea de a rămâne cu El",
    summary: "Prorocul Azaria îl încurajează pe Asa: DOMNUL este cu cei care sunt cu El. Regele îndepărtează idolii și întărește legământul.",
    units: [{ from: 1, to: 19, heading: "Un început bun trebuie continuat", teaching: "Poonen amintește începutul lui Asa ca exemplu al unui om care, în strâmtorare, s-a întors la DOMNUL și L-a căutat. Capitolul păstrează chemarea profetică la curaj și la o inimă care Îl caută pe Dumnezeu. Transcriptul pregătește însă contrastul din capitolul următor: un început de dependență nu garantează că omul va continua la fel.", source: p("Asa ... in their distress they turned to the Lord and they sought him"), forYourHeart: "Nu trăi numai din amintirea unei perioade în care te-ai sprijinit pe Dumnezeu. Credincioșia trebuie reînnoită în următoarea criză." }],
  },
  16: {
    number: 16,
    title: "Asa se sprijină pe Siria, iar văzătorul îi spune ce a pierdut",
    summary: "Asa caută o alianță politică împotriva lui Baeșa și îl închide pe Hanani când acesta îl confruntă. Capitolul conține declarația despre ochii DOMNULUI care străbat tot pământul.",
    units: [
      { from: 1, to: 10, heading: "Ochii DOMNULUI caută inimi întregi", teaching: "Poonen contrastează trecutul lui Asa, când se sprijinise pe DOMNUL, cu această criză, când se sprijină pe împăratul Siriei. El se oprește în mod special la 2 Cronici 16:9: ochii DOMNULUI străbat tot pământul ca să Se arate tare pentru cei a căror inimă este întreagă față de El. Pentru Poonen, slujirea nu trebuie construită prin alergarea după oameni potriviți, ci prin credincioșie și încrederea că Dumnezeu vede și aduce oamenii pe care îi caută.", source: p("second chronicles 16 9 ... eyes of the Lord moved to and fro throughout the whole earth"), words: [{ original: "שָׁלֵם", transliteration: "șalem", language: "ebraica", meaning: "întreg, complet, nedivizat. În 16:9 descrie inima orientată fără împărțire spre Dumnezeu, nu perfecțiunea fără greșeală.", verseRef: "2 Cronici 16:9", lexicalSource: "WLC-OSHB" }] },
      { from: 11, to: 14, heading: "Un om care respinge mustrarea poate încheia mai slab decât a început", teaching: "După confruntare, Asa se mânie pe văzător și apasă și pe alți oameni. Transcriptul folosește povestea pentru avertismentul că un om care a avut credință reală poate deveni defensiv și autosuficient mai târziu. Textul despre boala lui nu este folosit pentru a condamna medicina; problema explicită a narațiunii este direcția inimii lui și refuzul de a-L căuta pe DOMNUL.", source: p("Asa ... did not trust the Lord ... compromised") },
    ],
  },
  17: {
    number: 17,
    title: "Iosafat întărește Iuda și trimite învățători cu Cartea Legii prin cetăți",
    summary: "Iosafat caută pe Dumnezeul părinților săi, îndepărtează practici idolatre și își întărește regatul. O echipă de căpetenii, leviți și preoți merge prin Iuda învățând poporul din Cartea Legii.",
    units: [
      { from: 1, to: 6, heading: "Iosafat caută pe Dumnezeu și își întărește inima în căile Lui", teaching: "Regele fortifică Iuda și este descris umblând în căile de început ale lui David și căutând pe Dumnezeul părinților, nu Baalii. Cronicarul spune că inima lui s-a întărit în căile DOMNULUI și leagă aceasta de îndepărtarea înălțimilor și Așerelor.", source: n },
      { from: 7, to: 9, heading: "Cartea Legii este dusă prin cetăți și predată poporului", teaching: "În al treilea an, Iosafat trimite căpetenii împreună cu leviți și preoți să învețe în cetățile lui Iuda. Ei au cu ei Cartea Legii DOMNULUI și străbat cetățile învățând poporul.", source: n },
      { from: 10, to: 19, heading: "Frica de DOMNUL oprește atacurile, iar armata este organizată", teaching: "Cronicarul spune că frica de DOMNUL cade peste regatele din jur, astfel încât nu pornesc război împotriva lui Iosafat. Unele popoare aduc daruri, iar regele construiește cetăți și depozite și organizează oameni de război pe familii și comandanți.", source: n },
    ],
  },
  18: {
    number: 18,
    title: "Mica nu își ajustează mesajul la consensul celor mulți",
    summary: "Iosafat intră într-o alianță cu Ahab. Sute de proroci susțin campania, dar Mica refuză să repete mesajul majorității și spune numai ceea ce primește de la DOMNUL.",
    units: [{ from: 1, to: 34, heading: "«Ce-mi va spune DOMNUL, aceea voi vorbi»", teaching: "Poonen se oprește la presiunea pusă asupra lui Mica să își armonizeze mesajul cu al celorlalți proroci. Răspunsul lui este simplu: nu va repeta consensul doar pentru că este consens. Pentru transcript aceasta definește slujirea profetică: ascultarea de Dumnezeu mai presus de dorința de a fi acceptat de lideri sau de grup. Episodul nu justifică automat pe orice voce minoritară; adevărul nu este stabilit nici de majoritate, nici de singurătate, ci de fidelitatea față de Dumnezeu și cuvântul Lui.", source: p("Micaiah ... what the Lord tells me I'll speak ... not going to repeat what everybody else is saying"), forYourHeart: "Nu întreba mai întâi ce spune tabăra ta. Întreabă dacă ceea ce spui poate sta în lumină înaintea lui Dumnezeu și a Scripturii." }],
  },
  19: {
    number: 19,
    title: "Iosafat este mustrat pentru alianță, apoi așază judecători care trebuie să judece pentru DOMNUL",
    summary: "După întoarcerea din războiul lui Ahab, văzătorul Iehu îl confruntă pe Iosafat. Regele continuă reforma și le spune judecătorilor că nu judecă doar pentru oameni, ci înaintea lui Dumnezeu.",
    units: [
      { from: 1, to: 3, heading: "Alianța cu cel rău este mustrată, dar binele din Iosafat nu este șters", teaching: "Iehu îl întâmpină pe Iosafat și îl întreabă dacă trebuia să ajute pe cel rău și să iubească pe cei care urăsc pe DOMNUL. Mustrarea este serioasă, dar văzătorul adaugă că lucruri bune au fost găsite în rege, între care îndepărtarea Așerelor și orientarea inimii spre căutarea lui Dumnezeu.", source: n },
      { from: 4, to: 7, heading: "Judecătorii sunt avertizați că judecata lor se face înaintea lui Dumnezeu", teaching: "Iosafat merge prin popor și îl aduce înapoi la DOMNUL, apoi așază judecători în cetăți. El le spune să ia seama la ce fac pentru că judecă pentru DOMNUL, la care nu este nedreptate, părtinire sau mită.", source: n },
      { from: 8, to: 11, heading: "La Ierusalim sunt rânduiți leviți, preoți și capi de familie pentru judecată", teaching: "Regele stabilește și la Ierusalim un cadru de judecată format din leviți, preoți și capi de familie. Le cere să lucreze în frica DOMNULUI, cu credincioșie și inimă întreagă și separă responsabilitățile religioase de cele regale prin conducători desemnați.", source: n },
    ],
  },
  20: {
    number: 20,
    title: "Iosafat caută pe DOMNUL în fața invaziei, iar Iuda intră în luptă prin rugăciune și laudă",
    summary: "O coaliție mare vine împotriva lui Iuda. Iosafat proclamă post, se roagă înaintea adunării, primește un cuvânt prin Iahaziel și merge spre câmpul de luptă cu cântăreții înainte; dușmanii se distrug între ei.",
    units: [
      { from: 1, to: 4, heading: "Frica îl conduce pe Iosafat să caute pe DOMNUL și să proclame post", teaching: "Când află că o mulțime mare vine împotriva lui, Iosafat se teme și își îndreaptă fața să-L caute pe DOMNUL. El vestește un post în tot Iuda, iar oamenii se adună din cetăți să ceară ajutor.", source: n },
      { from: 5, to: 13, heading: "Rugăciunea recunoaște puterea lui Dumnezeu și neputința poporului", teaching: "În curtea Casei, Iosafat amintește stăpânirea lui Dumnezeu, istoria țării și promisiunea ascultării rugăciunii din acest loc. El spune deschis că poporul nu are putere împotriva mulțimii și nu știe ce să facă, dar ochii lor sunt îndreptați spre Dumnezeu.", source: n },
      { from: 14, to: 19, heading: "Duhul vine peste Iahaziel: «lupta nu este a voastră, ci a lui Dumnezeu»", teaching: "În mijlocul adunării, Duhul DOMNULUI vine peste Iahaziel, care spune poporului să nu se teamă și anunță că nu va trebui să lupte în modul obișnuit, ci să stea și să vadă izbăvirea. Iosafat și poporul se pleacă, iar leviții se ridică pentru laudă.", source: n },
      { from: 20, to: 26, heading: "Cântăreții merg înainte, iar coaliția se întoarce împotriva ei însăși", teaching: "Dimineața, Iosafat cheamă poporul să creadă pe DOMNUL și prorocii Lui și pune cântăreți care laudă frumusețea sfințeniei. În timp ce cântă, armatele adversare ajung să se distrugă între ele, iar Iuda găsește câmpul plin de pradă pe care o strânge timp de trei zile.", source: n },
      { from: 27, to: 30, heading: "Iuda se întoarce cu bucurie, iar regatul primește odihnă", teaching: "Poporul se întoarce la Ierusalim cu instrumente și intră în Casa DOMNULUI. Când regatele aud cum Dumnezeu a luptat împotriva dușmanilor lui Israel, frica vine peste ele, iar împărăția lui Iosafat are liniște.", source: n },
      { from: 31, to: 37, heading: "Finalul domniei păstrează și o nouă alianță nereușită", teaching: "Rezumatul domniei spune că Iosafat a făcut ce era drept, deși înălțimile nu au fost îndepărtate complet și poporul nu își pregătise încă inima. Mai târziu, alianța comercială cu Ahazia este mustrată prin Eliezer, iar corăbiile construite împreună sunt sfărâmate.", source: n },
    ],
  },
  21: {
    number: 21,
    title: "Ioram ucide pe frații lui, abandonează calea lui Iosafat și își încheie domnia fără cinste",
    summary: "După moartea lui Iosafat, Ioram își consolidează tronul prin uciderea fraților, urmează calea casei lui Ahab și pierde controlul asupra unor teritorii. O scrisoare a lui Ilie anunță judecata, iar domnia se încheie în invazie și boală.",
    units: [
      { from: 1, to: 4, heading: "Tronul este consolidat prin uciderea fraților", teaching: "Iosafat le dă fiilor lui daruri și cetăți, dar împărăția o lasă lui Ioram ca întâi născut. Odată întărit pe tron, Ioram își ucide frații și mai mulți conducători ai lui Israel, transformând succesiunea într-un act de sânge.", source: n },
      { from: 5, to: 11, heading: "Căsătoria cu casa lui Ahab este urmată de idolatrie și revolte", teaching: "Ioram este descris mergând în calea regilor lui Israel deoarece avea de soție o fiică a lui Ahab. Edomul și Libna se răscoală, iar regele ridică înălțimi și împinge Iuda spre necredincioșie. Totuși, casa lui David nu este nimicită datorită legământului amintit de cronicar.", source: n },
      { from: 12, to: 15, heading: "Scrisoarea lui Ilie numește crimele și anunță judecata", teaching: "Ioram primește o scrisoare de la Ilie care contrastează calea lui cu cea a lui Iosafat și Asa, îi amintește că și-a ucis frații mai buni decât el și anunță lovituri asupra familiei, averii și trupului său.", source: n },
      { from: 16, to: 20, heading: "Invazia și boala lasă un sfârșit descris fără regret public", teaching: "Filistenii și arabii atacă, iau averea și familia regelui, iar numai Ahazia rămâne dintre fii. Ioram este apoi lovit de o boală grea și moare după doi ani de suferință. Cronicarul notează că poporul nu îi face arderea de cinste a părinților și că pleacă fără să lase regret.", source: n },
    ],
  },
  22: {
    number: 22,
    title: "Ahazia urmează sfatul casei lui Ahab, iar Atalia încearcă apoi să distrugă familia regală",
    summary: "Ahazia domnește puțin și se aliază cu Ioram al Israelului, ajungând în calea lui Iehu. După moartea lui, Atalia ucide urmașii regali, dar Ioșabeat îl ascunde pe copilul Ioas în Casa lui Dumnezeu.",
    units: [
      { from: 1, to: 6, heading: "Ahazia este condus de sfetnicii casei lui Ahab", teaching: "Locuitorii Ierusalimului îl pun împărat pe Ahazia, singurul fiu rămas după atacurile precedente. Mama lui, Atalia, și casa lui Ahab îi devin sfetnici, iar el merge în alianță cu Ioram împotriva Siriei și îl vizitează după rănire.", source: n },
      { from: 7, to: 9, heading: "Vizita la Ioram îl așază pe Ahazia în calea judecății lui Iehu", teaching: "Cronicarul spune că venirea lui Ahazia la Ioram a fost spre pierderea lui. Iehu, însărcinat să lovească casa lui Ahab, îi găsește și pe conducătorii lui Iuda asociați cu Ahazia, iar regele este prins și ucis; totuși este îngropat pentru amintirea lui Iosafat.", source: n },
      { from: 10, to: 12, heading: "Atalia ucide urmașii, dar Ioas este ascuns șase ani în templu", teaching: "Atalia încearcă să distrugă toată sămânța regală, însă Ioșabeat, sora lui Ahazia și soția preotului Iehoiada, îl ia pe copilul Ioas și îl ascunde împreună cu doica lui. El rămâne șase ani în Casa lui Dumnezeu în timp ce Atalia domnește peste țară.", source: n },
    ],
  },
  23: {
    number: 23,
    title: "Iehoiada îl încoronează pe Ioas, Atalia este înlăturată și cultul lui Baal este distrus",
    summary: "În al șaptelea an, Iehoiada organizează preoții, leviții și căpeteniile pentru a-l proteja și prezenta pe moștenitorul davidic. Ioas este încoronat, Atalia este scoasă din Casa DOMNULUI, iar poporul încheie legământ și înlătură templul lui Baal.",
    units: [
      { from: 1, to: 7, heading: "Iehoiada construiește o alianță și organizează paza Casei", teaching: "Preotul Iehoiada îi atrage pe căpetenii într-un legământ, iar aceștia adună leviți și capi de familie din Iuda. Planul stabilește pozițiile preoților, leviților și gărzilor pentru sabat și păstrarea regelui în siguranță.", source: n },
      { from: 8, to: 11, heading: "Fiul împăratului este scos, încoronat și proclamat", teaching: "Leviții și Iuda împlinesc planul, primesc armele păstrate de David și înconjoară pe rege. Ioas este adus afară, primește coroana și mărturia, este uns și poporul strigă: «Trăiască împăratul!».", source: n },
      { from: 12, to: 15, heading: "Atalia intră și strigă «Vânzare!», dar este scoasă din templu", teaching: "Atalia aude zgomotul, vine la Casa DOMNULUI și îl vede pe rege la locul lui. Ea își rupe hainele și strigă trădare, iar Iehoiada poruncește să fie scoasă afară și executată la intrarea porții cailor, nu în incinta templului.", source: n },
      { from: 16, to: 21, heading: "Legământul este refăcut, casa lui Baal este distrusă și Ioas este așezat pe tron", teaching: "Iehoiada face un legământ între el, popor și rege ca să fie poporul DOMNULUI. Mulțimea dărâmă casa lui Baal, omoară pe preotul lui și reorganizează slujirea Casei după rânduielile davidice, apoi îl duce pe Ioas la palat și cetatea se liniștește.", source: n },
    ],
  },
  24: {
    number: 24,
    title: "Ioas repară templul cât timp îl ascultă pe Iehoiada, apoi se întoarce împotriva mustrării",
    summary: "În prima parte a domniei, Ioas strânge bani și repară Casa. După moartea lui Iehoiada, ascultă de conducători care reintroduc idolatria și poruncește uciderea lui Zaharia, fiul preotului care îl salvase.",
    units: [
      { from: 1, to: 3, heading: "Ioas face ce este drept în zilele lui Iehoiada", teaching: "Ioas începe să domnească la șapte ani și este descris făcând ce este drept cât timp trăiește preotul Iehoiada. Acesta îi ia și două soții, iar casa regală primește fii și fiice.", source: n },
      { from: 4, to: 14, heading: "O ladă pentru daruri finanțează repararea Casei", teaching: "Ioas vrea să repare templul și îi cheamă pe preoți și leviți să strângă bani. Pentru că lucrarea întârzie, este făcută o ladă la poarta Casei, iar poporul și conducătorii aduc cu bucurie. Meșterii folosesc banii pentru restaurare, iar surplusul ajunge în vasele slujirii.", source: n },
      { from: 15, to: 16, heading: "Iehoiada moare bătrân și este îngropat între împărați", teaching: "Iehoiada moare la o vârstă foarte înaintată și primește o onoare neobișnuită: este îngropat în cetatea lui David între împărați pentru binele făcut în Israel față de Dumnezeu și Casa Lui.", source: n },
      { from: 17, to: 22, heading: "După moartea mentorului, Ioas ascultă de conducători și îl ucide pe Zaharia", teaching: "Conducătorii vin înaintea lui Ioas, iar regele îi ascultă; Casa DOMNULUI este părăsită și idolatria revine. Proorocii avertizează fără rezultat, iar când Duhul lui Dumnezeu vine peste Zaharia, fiul lui Iehoiada, acesta este omorât cu pietre la porunca regelui. Textul subliniază că Ioas nu își amintește bunătatea arătată de tatăl lui Zaharia.", source: n },
      { from: 23, to: 27, heading: "O armată siriană mică învinge Iuda, iar slujitorii îl ucid pe Ioas", teaching: "La sfârșitul anului, sirienii vin cu o armată relativ mică și lovesc Iuda și Ierusalimul. Ioas rămâne grav rănit, iar propriii slujitori conspiră împotriva lui pentru sângele fiului lui Iehoiada și îl omoară. Este îngropat în cetatea lui David, dar nu în mormintele împăraților.", source: n },
    ],
  },
  25: {
    number: 25,
    title: "Amația ascultă parțial, câștigă în Edom și apoi se închină dumnezeilor învinși",
    summary: "Amația începe cu ascultare incompletă, renunță la mercenarii din Israel la cuvântul unui om al lui Dumnezeu și câștigă războiul, dar aduce apoi idolii Edomului și ajunge în război cu Israelul.",
    units: [
      { from: 1, to: 4, heading: "Drept, dar nu cu inimă întreagă", teaching: "Amația este descris făcând ce este drept, dar nu cu o inimă întreagă. După întărirea domniei îi pedepsește pe ucigașii tatălui său, însă nu îi omoară pe copiii lor, invocând porunca Legii despre responsabilitatea individuală.", source: n },
      { from: 5, to: 10, heading: "O sută de talanți nu sunt motiv să păstreze o alianță greșită", teaching: "Amația organizează armata și angajează o sută de mii de oameni din Israel pentru o sută de talanți. Un om al lui Dumnezeu îi spune să nu ia cu el armata regatului de nord; când regele întreabă despre banii deja plătiți, răspunsul este că DOMNUL poate să-i dea mult mai mult. Amația îi trimite înapoi, iar aceștia pleacă mânioși.", source: n },
      { from: 11, to: 16, heading: "După victorie, Amația aduce acasă dumnezeii celor pe care tocmai i-a învins", teaching: "Amația învinge Edomul, dar apoi aduce dumnezeii seiriților și se închină lor. Un proroc îl confruntă cu contradicția: de ce caută dumnezeii unui popor care nu și-a putut salva propriul popor? Regele îi cere să tacă, iar profetul anunță că refuzul sfatului conduce spre nimicire.", source: n },
      { from: 17, to: 24, heading: "Provocarea adresată lui Ioas se termină prin înfrângerea lui Iuda", teaching: "Amația îl provoacă pe Ioas al Israelului, care răspunde prin pilda spinului și cedrului și îl avertizează că succesul împotriva Edomului i-a ridicat inima. Amația nu ascultă, este înfrânt, iar zidul Ierusalimului este spart și comorile sunt luate.", source: n },
      { from: 25, to: 28, heading: "Ultimii ani se încheie prin conspirație", teaching: "Amația mai trăiește după moartea lui Ioas, dar de la momentul în care se abate de la DOMNUL se formează o conspirație împotriva lui. Fuge la Lachis, este urmărit și ucis, apoi este adus și îngropat cu părinții lui.", source: n },
    ],
  },
  26: {
    number: 26,
    title: "Ozia prosperă cât Îl caută pe Dumnezeu, apoi mândria îl duce în templu unde nu are dreptul să slujească",
    summary: "Ozia dezvoltă armata, agricultura și fortificațiile lui Iuda și devine foarte puternic. Când puterea îi ridică inima, intră să ardă tămâie, se împotrivește preoților și este lovit de lepră.",
    units: [
      { from: 1, to: 5, heading: "Cât timp Îl caută pe DOMNUL, Dumnezeu îl face să propășească", teaching: "Ozia devine împărat la șaisprezece ani și face ce este drept. Cronicarul spune că, în zilele lui Zaharia care îl învăța frica de Dumnezeu, regele Îl caută pe DOMNUL și că atâta timp cât Îl caută, Dumnezeu îi dă izbândă.", source: n },
      { from: 6, to: 15, heading: "Victoriile, zidurile, agricultura și mașinile de război îi cresc puterea", teaching: "Ozia luptă cu filistenii și alte popoare, primește tribut, construiește turnuri, sapă fântâni și dezvoltă agricultura. Armata este bine organizată și echipată, iar la Ierusalim apar dispozitive pentru apărarea zidurilor; faima lui se răspândește deoarece este ajutat până ajunge foarte puternic.", source: n },
      { from: 16, to: 20, heading: "Când ajunge puternic, inima se înalță și intră să ardă tămâie", teaching: "Textul leagă direct puterea de momentul mândriei: Ozia intră în templu pentru a arde tămâie, o slujire rezervată preoților urmași ai lui Aaron. Azaria și optzeci de preoți îi stau împotrivă; regele se mânie, iar lepra îi apare pe frunte înaintea lor.", source: n },
      { from: 21, to: 23, heading: "Ozia trăiește izolat, iar Iotam conduce casa și poporul", teaching: "Regele rămâne lepros până la moarte, locuiește într-o casă separată și este exclus de la Casa DOMNULUI. Fiul său Iotam preia conducerea palatului și judecarea poporului, iar după moarte Ozia este îngropat lângă mormintele împăraților.", source: n },
    ],
  },
  27: {
    number: 27,
    title: "Iotam devine puternic pentru că își rânduiește căile înaintea DOMNULUI",
    summary: "Domnia lui Iotam este scurt descrisă prin construcții, o victorie asupra amoniților și evaluarea că regele își rânduia căile înaintea lui Dumnezeu, chiar dacă poporul continua să se strice.",
    units: [
      { from: 1, to: 2, heading: "Iotam face ce este drept fără să repete intrarea tatălui în templu", teaching: "Iotam este descris după modelul bun al tatălui său, cu precizarea că nu intră în templu cum făcuse Ozia. În același timp, cronicarul notează că poporul continua să se strice, separând evaluarea regelui de starea generală a comunității.", source: n },
      { from: 3, to: 6, heading: "Construcții, victorie și o putere legată de căi bine rânduite", teaching: "Regele construiește la poarta de sus a Casei și pe zidul Ofelului, ridică cetăți și turnuri și îi învinge pe amoniți, care îi plătesc tribut. Versetul 6 rezumă creșterea lui prin faptul că își rânduia căile înaintea DOMNULUI Dumnezeului său.", source: n },
      { from: 7, to: 9, heading: "Domnia lui Iotam se încheie, iar Ahaz îi urmează", teaching: "Ultimele versete trimit la izvoarele despre războaiele și căile lui Iotam, notează vârsta și durata domniei și consemnează moartea și îngroparea lui în cetatea lui David. Fiul său Ahaz devine împărat.", source: n },
    ],
  },
  28: {
    number: 28,
    title: "Ahaz se afundă în idolatrie și caută ajutor la Asiria în timp ce Iuda este lovit",
    summary: "Ahaz abandonează modelul lui David, practică idolatrie și sacrificii grave și ajunge sub atacuri din Siria, Israel, Edom și Filistia. Chiar în strâmtorare, el continuă să se îndepărteze și închide Casa DOMNULUI.",
    units: [
      { from: 1, to: 4, heading: "Ahaz urmează practicile idolatre ale popoarelor", teaching: "Regele este evaluat negativ de la început: face chipuri pentru Baali, arde tămâie și își trece fiii prin foc după practicile popoarelor. Închinarea lui este răspândită pe înălțimi și sub copaci, nu centrată în legământul Casei lui Dumnezeu.", source: n },
      { from: 5, to: 8, heading: "Siria și Israel lovesc Iuda și iau mulți prizonieri", teaching: "Ahaz este dat în mâna Siriei și a Israelului, iar pierderile sunt foarte mari. Pecah ucide mulți oameni într-o singură zi, iar o mare mulțime de femei și copii este dusă captivă spre Samaria.", source: n },
      { from: 9, to: 15, heading: "Prorocul Oded oprește transformarea fraților în robi", teaching: "Oded iese înaintea armatei Israelului și spune că victoria a fost îngăduită din cauza mâniei asupra lui Iuda, dar că furia cuceritorilor a ajuns până la cer și că vor să-i facă robi pe propriii frați. Câțiva conducători se opun aducerii captivilor, îi îmbracă, hrănesc, îngrijesc și îi conduc la Ierihon.", source: n },
      { from: 16, to: 21, heading: "Ahaz cere ajutor Asiriei, dar plătește fără să primească salvarea dorită", teaching: "Sub presiunea edomiților și filistenilor, Ahaz trimite după ajutor la împărații Asiriei. El ia din Casa DOMNULUI și din palat pentru a oferi daruri, dar textul spune că Tiglat-Pileser îl strâmtorează în loc să-l întărească.", source: n },
      { from: 22, to: 27, heading: "În necaz, Ahaz devine și mai necredincios", teaching: "Capitolul spune explicit că în vremea strâmtorării Ahaz păcătuiește și mai mult. El jertfește dumnezeilor Damascului pe care îi consideră ajutători ai Siriei, strânge și sfărâmă uneltele Casei, închide ușile templului și ridică altare în Ierusalim și în cetățile lui Iuda.", source: n },
    ],
  },
  29: {
    number: 29,
    title: "Ezechia redeschide templul și cheamă leviții să curețe ceea ce generația precedentă abandonase",
    summary: "În primul an al domniei, Ezechia repară ușile Casei și adună preoții și leviții. Templul este curățit, jertfele sunt reluate, cântarea revine și adunarea se bucură de o restaurare produsă repede.",
    units: [
      { from: 1, to: 11, heading: "Prima prioritate a lui Ezechia este redeschiderea și sfințirea Casei", teaching: "Ezechia face ce este drept și, chiar în prima lună a domniei, deschide și repară ușile templului. El cheamă preoții și leviții să se sfințească, numește necredincioșia părinților și le cere să nu fie nepăsători față de slujirea pentru care au fost aleși.", source: n },
      { from: 12, to: 19, heading: "Leviții scot necurăția și încheie curățirea în șaisprezece zile", teaching: "Familiile levitice răspund, se sfințesc și intră să curețe Casa. Obiectele pe care Ahaz le lepădase sunt pregătite din nou, iar după șaisprezece zile conducătorii vin la Ezechia și raportează că templul, altarul și uneltele sunt gata.", source: n },
      { from: 20, to: 30, heading: "Jertfa, sângele și cântarea reîncep înaintea adunării", teaching: "Ezechia adună conducătorii, aduce jertfe pentru împărăție, sanctuar și Iuda și poruncește leviților să stea cu instrumentele rânduite de David. Când începe arderea-de-tot începe și cântarea, iar regele și adunarea se pleacă.", source: n },
      { from: 31, to: 36, heading: "Poporul aduce jertfe de bunăvoie, iar leviții ajută preoții prea puțini", teaching: "După consacrarea inițială, Ezechia cheamă adunarea să aducă jertfe și mulțumiri. Numărul animalelor este atât de mare încât preoții sunt insuficienți pentru jupuire, iar leviții îi ajută. Capitolul se încheie cu bucurie pentru faptul că lucrul fusese pregătit repede.", source: n },
    ],
  },
  30: {
    number: 30,
    title: "Ezechia invită întreg Israelul la Paște, iar Dumnezeu ascultă rugăciunea pentru cei nepregătiți ceremonial",
    summary: "Iuda și restul semințiilor primesc scrisori să vină la Ierusalim pentru un Paște ținut în luna a doua. Unii batjocoresc invitația, alții se smeresc; mulți vin fără curățirea cerută, iar Ezechia se roagă pentru cei care și-au îndreptat inima să-L caute pe Dumnezeu.",
    units: [
      { from: 1, to: 5, heading: "Paștele este mutat în luna a doua pentru că oamenii și preoții nu sunt pregătiți", teaching: "Ezechia și adunarea hotărăsc să țină Paștele la Ierusalim, dar nu la data obișnuită deoarece preoții nu se sfințiseră în număr suficient și poporul nu se adunase. Este aleasă luna a doua și hotărârea este extinsă prin invitație de la Beer-Șeba până la Dan.", source: n },
      { from: 6, to: 12, heading: "Curierii cheamă rămășița lui Israel; unii râd, alții se smeresc", teaching: "Scrisorile îi cheamă pe oamenii rămași după Asiria să se întoarcă la DOMNUL, să nu fie ca părinții lor și să vină la sanctuar. În Efraim și Manase mulți râd și batjocoresc solii, dar unii se smeresc și vin; în Iuda, textul spune că mâna lui Dumnezeu le dă o singură inimă.", source: n },
      { from: 13, to: 20, heading: "Altarele străine sunt îndepărtate, iar Ezechia se roagă pentru cei necurățiți", teaching: "O mare adunare îndepărtează altarele din Ierusalim și ține Paștele. Mulți veniți din nord nu se curățiseră după rânduială, iar leviții pregătesc jertfele pentru ei. Ezechia se roagă ca DOMNUL cel bun să ierte pe fiecare care și-a pregătit inima să-L caute, chiar dacă nu este curățit după regulile sanctuarului, iar textul spune că DOMNUL îl ascultă și vindecă poporul.", source: n },
      { from: 21, to: 27, heading: "Șapte zile de bucurie devin paisprezece", teaching: "Israelul adunat ține sărbătoarea cu cântare și învățătură, iar Ezechia vorbește inimii leviților pricepuți. Adunarea hotărăște să mai țină încă șapte zile, astfel încât bucuria de la Ierusalim este descrisă ca nemaivăzută din zilele lui Solomon; rugăciunea preoților ajunge la cer.", source: n },
    ],
  },
  31: {
    number: 31,
    title: "După sărbătoare, idolii sunt îndepărtați și slujirea templului primește o susținere ordonată",
    summary: "Participanții la Paște ies și distrug obiectele idolatre, iar Ezechia reorganizează cetele preoților și leviților. Zeciuielile formează grămezi mari, sunt create magazii și responsabilități pentru distribuire.",
    units: [
      { from: 1, to: 1, heading: "Sărbătoarea este urmată de îndepărtarea idolatriei", teaching: "Când sărbătoarea se încheie, israeliții ies în cetățile lui Iuda, Beniamin, Efraim și Manase și distrug stâlpii, Așerele, înălțimile și altarele asociate idolatriei, apoi fiecare se întoarce la proprietatea lui.", source: n },
      { from: 2, to: 10, heading: "Cetele sunt reorganizate, iar poporul aduce primele roade și zeciuieli", teaching: "Ezechia stabilește din nou cetele preoților și leviților și contribuie personal pentru jertfele regulate. Poporul primește porunca să dea partea slujitorilor templului și aduce atât de mult încât se formează grămezi; preotul Azaria explică belșugul prin faptul că oamenii au început să aducă darurile cerute.", source: n },
      { from: 11, to: 19, heading: "Magaziile și distribuirea sunt puse sub supraveghere", teaching: "Ezechia poruncește pregătirea încăperilor pentru daruri, iar mai mulți leviți primesc răspundere asupra depozitării și distribuirii către preoți, leviți și familiile lor după cetăți și registre.", source: n },
      { from: 20, to: 21, heading: "Rezumatul lui Ezechia: bine, drept și adevărat, cu toată inima", teaching: "Capitolul încheie spunând că Ezechia a făcut ce era bine, drept și adevărat înaintea DOMNULUI și că în tot ce a început pentru slujirea Casei, Lege și poruncă L-a căutat pe Dumnezeu cu toată inima. Textul adaugă că astfel a izbutit.", source: n },
    ],
  },
  32: {
    number: 32,
    title: "Ezechia primește izbăvire, vindecare și apoi este testat prin succes",
    summary: "După amenințarea lui Sanherib și vindecarea lui Ezechia, capitolul spune că inima regelui se înalță și că Dumnezeu îl lasă pentru o vreme ca să fie încercat în legătură cu solii Babilonului.",
    units: [
      { from: 1, to: 23, heading: "Primejdia este întâmpinată prin pregătire și rugăciune", teaching: "Capitolul reia invazia Asiriei și izbăvirea descrisă în Împărați. Transcriptul nu repetă toate detaliile, ci se concentrează mai târziu pe testul inimii lui Ezechia. Prima parte rămâne în cadrul narațiunii: regele organizează apărarea, încurajează poporul și se roagă împreună cu Isaia.", source: n },
      { from: 24, to: 33, heading: "Un miracol mare poate deveni ocazia unei mândrii mari", teaching: "Poonen se oprește la vindecarea lui Ezechia și la semnul extraordinar asociat ei, apoi la solii veniți să întrebe despre minune. 2 Cronici spune că Dumnezeu l-a lăsat singur pentru a-l încerca și a face cunoscut ce era în inima lui. Transcriptul folosește scena ca avertisment: poți mărturisi despre o lucrare reală a lui Dumnezeu într-un mod care mută gloria spre tine. Ezechia se smerește, dar finalul vieții lui păstrează această avertizare.", source: p("chapter 32 ... Hezekiah ... God left Hezekiah alone to test him"), forYourHeart: "După o intervenție mare a lui Dumnezeu, păzește mai atent cine ajunge în centrul poveștii pe care o spui." },
    ],
  },
  33: {
    number: 33,
    title: "Manase se smerește în robie, iar Amon refuză smerirea tatălui său",
    summary: "După ani de idolatrie și rău, Manase este dus în robie, se smerește și este restaurat. Fiul său Amon repetă idolatria, dar nu și pocăința, iar domnia lui se încheie prin conspirație.",
    units: [
      { from: 1, to: 20, heading: "Cronici păstrează pocăința pe care Împărați nu o povestește", teaching: "Poonen evidențiază tocmai diferența dintre relatări: 2 Cronici consemnează că Manase, după ce a fost prins și dus la Babilon, s-a smerit mult înaintea Dumnezeului părinților săi, s-a rugat și a fost restaurat. Apoi îndepărtează dumnezeii străini. Pentru Poonen, această consemnare arată cât de important este faptul pocăinței finale; un trecut foarte rău nu face întoarcerea imposibilă.", source: p("chapter 33 verse 13 ... Manasseh ... repented ... removed the foreign gods"), forYourHeart: "Nu folosi gravitatea trecutului ca argument că întoarcerea nu mai are rost. Pocăința adevărată se vede și în ceea ce scoți din viață după ce te întorci." },
      { from: 21, to: 25, heading: "Amon repetă păcatul lui Manase, dar nu smerirea lui", teaching: "Amon face ce este rău și jertfește chipurilor făcute de tatăl său, dar cronicarul subliniază contrastul: nu se smerește cum se smerise Manase, ci își înmulțește vina. Slujitorii lui conspiră și îl omoară, iar poporul îi execută pe conspiratori și îl pune împărat pe Iosia.", source: n },
    ],
  },
  34: {
    number: 34,
    title: "Iosia caută pe Dumnezeu, curăță țara și redescoperă Cartea Legii",
    summary: "Regele începe să-L caute pe Dumnezeu încă tânăr și extinde reforma până în fostele teritorii nordice. În timpul reparării templului este găsită Cartea Legii, iar citirea ei îl duce la smerire și la reînnoirea legământului.",
    units: [
      { from: 1, to: 7, heading: "Iosia începe să-L caute pe Dumnezeu și curăță Iuda și Israelul", teaching: "Iosia devine împărat la opt ani, iar în al optulea an începe să-L caute pe Dumnezeul lui David. Din al doisprezecelea an curăță Iuda și Ierusalimul de înălțimi, Așere și chipuri și extinde acțiunea în cetățile lui Manase, Efraim, Simeon și până la Neftali.", source: n },
      { from: 8, to: 13, heading: "Banii adunați sunt folosiți pentru repararea Casei", teaching: "În al optsprezecelea an, după curățarea țării și Casei, Iosia trimite responsabili să repare templul. Banii strânși sunt dați meșterilor și lucrătorilor, iar leviții pricepuți supraveghează lucrările.", source: n },
      { from: 14, to: 21, heading: "Hilkia găsește Cartea Legii, iar Iosia își rupe hainele când o aude", teaching: "În timp ce sunt scoși banii, preotul Hilkia găsește Cartea Legii lui Moise. Șafan o duce regelui și citește din ea; Iosia își rupe hainele și recunoaște că mânia este mare deoarece părinții nu au păzit cuvintele cărții, apoi trimite să întrebe pe DOMNUL.", source: n },
      { from: 22, to: 28, heading: "Hulda anunță judecata, dar și faptul că smerirea lui Iosia a fost auzită", teaching: "Prorocița Hulda confirmă judecata asupra locului și locuitorilor din cauza idolatriei, dar transmite regelui un mesaj distinct: deoarece inima lui s-a înduioșat, s-a smerit și a plâns, Dumnezeu l-a auzit și nu va vedea nenorocirea care vine asupra locului în zilele sale.", source: n },
      { from: 29, to: 33, heading: "Cartea este citită adunării, iar regele încheie legământ", teaching: "Iosia adună bătrânii și poporul, citește în auzul lor cuvintele Cărții Legământului și încheie legământ să-L urmeze pe DOMNUL cu toată inima. El îndepărtează urâciunile din teritoriile lui Israel și îi face pe cei prezenți să slujească pe Dumnezeul lor în zilele lui.", source: n },
    ],
  },
  35: {
    number: 35,
    title: "Iosia ține un Paște mare și apoi moare în lupta cu Neco",
    summary: "După reforma Legii, Iosia organizează Paștele la Ierusalim cu preoți, leviți și daruri numeroase. Mai târziu intră în conflict cu Neco al Egiptului, refuză avertismentul și este rănit mortal.",
    units: [
      { from: 1, to: 6, heading: "Preoții și leviții sunt așezați la slujbă pentru Paște", teaching: "Iosia ține Paștele în ziua stabilită, le cere preoților să-și împlinească slujba și leviților să pună chivotul în Casa construită de Solomon, să nu îl mai poarte pe umeri și să se pregătească potrivit familiilor și rânduielilor davidice.", source: n },
      { from: 7, to: 19, heading: "Darurile regale și slujirea ordonată produc un Paște descris ca fără precedent din zilele lui Samuel", teaching: "Iosia oferă din turmele sale, conducătorii adaugă daruri, iar preoții și leviții pregătesc jertfele și împart poporului după casele părintești. Cântăreții și păzitorii rămân la posturi. Cronicarul spune că un asemenea Paște nu fusese ținut în Israel din zilele prorocului Samuel.", source: n },
      { from: 20, to: 24, heading: "Iosia iese împotriva lui Neco și nu ascultă cuvintele care îl avertizează", teaching: "După toate aceste lucruri, Neco al Egiptului merge spre nord, iar Iosia iese împotriva lui. Neco îi trimite mesaj că nu are război cu Iuda și spune că Dumnezeu i-a poruncit să se grăbească; cronicarul afirmă că Iosia nu ascultă cuvintele lui Neco venite din gura lui Dumnezeu, se deghizează pentru luptă și este rănit de arcași.", source: n },
      { from: 25, to: 27, heading: "Ieremia și poporul plâng moartea lui Iosia", teaching: "Ieremia rostește o cântare de jale pentru Iosia, iar cântăreții păstrează memoria lui în plângeri. Ultimele versete trimit la izvoarele despre faptele, bunătatea și căile regelui.", source: n },
    ],
  },
  36: {
    number: 36,
    title: "Ultimii regi, exilul și porunca lui Cirus de a reconstrui",
    summary: "După Iosia, regii se succed rapid și Ierusalimul intră tot mai mult sub control străin. Mesagerii sunt batjocoriți până la distrugerea cetății și exil, dar cartea se termină cu decretul persan care redeschide drumul spre Ierusalim.",
    units: [
      { from: 1, to: 4, heading: "Ioahaz domnește trei luni și este înlocuit de Neco", teaching: "Poporul îl pune împărat pe Ioahaz, dar după trei luni Neco îl înlătură, impune tribut țării și îl face rege pe Eliachim, căruia îi schimbă numele în Ioiachim. Ioahaz este dus în Egipt.", source: n },
      { from: 5, to: 8, heading: "Ioiachim face rău și ajunge sub puterea Babilonului", teaching: "Ioiachim domnește unsprezece ani și este evaluat negativ. Nebucadnețar urcă împotriva lui și îl leagă pentru a-l duce la Babilon, iar vase din Casa DOMNULUI ajung și ele în templul babilonian.", source: n },
      { from: 9, to: 10, heading: "Ioiachin domnește foarte puțin și este dus la Babilon", teaching: "Ioiachin are o domnie de numai câteva luni înainte ca Nebucadnețar să-l ducă la Babilon împreună cu obiecte scumpe din Casa DOMNULUI. Zedechia, ruda lui, este pus împărat peste Iuda și Ierusalim.", source: n },
      { from: 11, to: 21, heading: "Avertismente batjocorite până când nu mai există remediu", teaching: "Textul descrie o acumulare: DOMNUL trimite mesageri, poporul îi batjocorește, iar mânia ajunge la punctul în care narațiunea spune că nu mai este remediu. Poonen se oprește la versetul 21 și la cei șaptezeci de ani, legând exilul de sabatele neglijate ale țării. Nu orice necaz de șaptezeci de ani trebuie interpretat prin această schemă; este explicația pe care Cronici o oferă pentru acest exil istoric.", source: p("chapter 36 verse 21 ... sent to Babylon for 70 years ... did not give the land their sabbath") },
      { from: 22, to: 23, heading: "Cartea se încheie cu porunca lui Cirus: «să se suie»", teaching: "După judecată apare o deschidere: Cirus proclamă întoarcerea și reconstruirea Casei. Aceleași versete vor deschide cartea Ezra, legând exilul de restaurare.", source: n },
    ],
  },
}

const CRONICI2_OVERLAY: ExplainedBookOverlay = {
  bookId: "2-cronici",
  bibleEmanusBookId: "2CH",
  name: "2 Cronici",
  testament: "vt",
  order: 14,
  transcript,
  status: "in_review",
  coverageMode: "transcript-focused",
  chapters: transcriptFocusedChapters("2 Cronici", 36, focused),
}

export const CRONICI2_EXPLAINED = assertCompleteOverlay(CRONICI2_OVERLAY, 36)
