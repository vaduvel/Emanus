from pathlib import Path
from collections import Counter

ROOT = Path(__file__).resolve().parents[1]
changes = []

def rep(rel, old, new, label):
    p = ROOT / rel
    text = p.read_text()
    n = text.count(old)
    if n != 1:
        raise SystemExit(f"{rel}: expected one match for {label!r}, found {n}")
    p.write_text(text.replace(old, new))
    changes.append((rel, label))

# Geneza 26
p="packages/shared/src/bible/geneza26.ts"
rep(p,"a astupa fantanile cuiva era chipul cel mai aspru de a-i spune sa plece, si totodata o mare risipa, fiindca o fantana se sapa cu multa truda si uneori ani de zile.","astuparea fantanilor lipsea o gospodarie de apa si putea sili o familie sa plece; textul subliniaza astfel gravitatea conflictului, fara sa ne spuna cat dura saparea unei fantani.","context istoric despre fantani")
rep(p,"Filistenii de la Gherar din vremea aceasta erau o asezare mica, nu poporul razboinic de mai tarziu, din vremea lui Samson si a lui David.","Denumirea «filisteni» din istorisirea patriarhilor ridica intrebari istorice discutate; capitolul ii prezinta simplu ca locuitorii tinutului Gherar, fara sa-i identifice in amanunt cu filistenii de mai tarziu.","filistenii din Gherar")
rep(p,"Rebeca nu ii era sora nici pe jumatate, cum fusese Sara pentru Avraam. Ii era verisoara de-a doua.\n\nDeci este minciuna curata.","Rebeca nu ii era sora. Era ruda lui, dar cuvantul rostit locuitorilor ascundea faptul esential ca era nevasta lui.\n\nDeci era o minciuna menita sa-l apere pe el si sa o puna pe ea in primejdie.","rudenia Rebecai")
rep(p,"Se cuvine sa spunem limpede ce era amar. Nu neamul lor, ci inchinarea. Femeile acelea aduceau in casa alti dumnezei.","Textul spune numai ca aceste casatorii au fost o mare amaraciune pentru Isaac si Rebeca. Legatura cu inchinarea canaanita este plauzibila in lumina Scripturii mai largi, dar Geneza 26 nu precizeaza aici pricina.","amaraciunea parintilor")
rep(p,"In aceeasi zi in care se face pace, se gaseste apa.\n\nDe cate ori apa noastra este ingropata tocmai sub o cearta nelamurita.","In aceeasi zi in care se face pace, se gaseste apa.\n\nAlaturarea este frumoasa pentru predica, dar textul nu spune ca impacarea a produs gasirea apei. Putem primi imaginea fara a o transforma intr-o promisiune.","pacea si apa")

# Geneza 27
p="packages/shared/src/bible/geneza27.ts"
rep(p,"Tabletile din tinutul acela arata ca astfel de cuvinte rostite pe patul de moarte erau primite chiar si de judecatori ca dovada. Mancarea gustoasa cerea vanat, socotit mancare de sarbatoare. Pieile de ied din soiul de acolo aveau par lung si aspru, apropiat de parul omenesc.","In lumea veche, binecuvantarea familiala avea greutate juridica si religioasa, dar capitolul insusi este temeiul principal pentru caracterul ei solemn. Vanatul era mancarea preferata a lui Isaac, iar pieile iezilor au fost folosite pentru a imita mainile paroase ale lui Esau; textul nu ne da mai multe amanunte despre soiul caprelor.","context istoric al binecuvantarii")
rep(p,"Omul acesta stia fagaduinta. Rebeca o auzise de la Dumnezeu insusi, inainte ca baietii sa se nasca: cel mai mare va sluji celui mai mic.","Rebeca primise fagaduinta inainte ca baietii sa se nasca: cel mai mare va sluji celui mai mic. Textul nu spune daca sau cand i-a povestit-o lui Isaac, asa ca nu putem face din aceasta o vina dovedita a lui.","ce stia Isaac")
rep(p,"Nu cheama toata casa, cum s-ar fi cuvenit la o binecuvantare. Il cheama pe unul singur, pe ascuns.\n\nCe se face pe ascuns intr-o casa aduce totdeauna nenorocire.","Il cheama pe Esau singur. Textul nu spune daca binecuvantarea trebuia rostita inaintea intregii case si nici daca Isaac urmarea taina; putem observa lipsa celorlalti fara sa-i atribuim o intentie pe care nu o cunoastem.","binecuvantarea in taina")
rep(p,"Si sa cantarim bine de ce se cutremura.\n\nNu de furie ca a fost inselat. Ci fiindca a inteles, dintr-o data, ca s-a impotrivit lui Dumnezeu.","Textul nu ne spune de ce se cutremura atat de tare: poate fi spaima inselarii, recunoasterea lucrarii lui Dumnezeu sau amandoua. Sa pastram cutremurul lui Isaac fara sa-i citim sigur gandurile.","motivul cutremurului")
rep(p,"Dumnezeu si-a tinut fagaduinta, iar Iacov a platit pretul vicleniei lui pana la ultimul ban.","Dumnezeu Si-a tinut fagaduinta, iar istorisirea arata urmari grele ale vicleniei lui Iacov. Nu fiecare suferinta de mai tarziu poate fi numita cu siguranta o plata directa pentru aceasta fapta.","plata vicleniei")
rep(p,"Inseamna ca sunt hotarari care nu se mai pot desface. Ziua vanduta nu se mai cumpara. Sunt lacrimi de parere de rau pentru urmari, si sunt lacrimi de pocainta pentru pacat; iar aici se plange dupa ce s-a pierdut, nu pentru ce s-a facut.","Inseamna ca hotararea binecuvantarii nu a mai putut fi schimbata. Evrei 12 ne avertizeaza asupra dispretului lui Esau fata de dreptul de intai nascut, dar nu ne da acces deplin la toate miscările inimii lui; sa nu transformam lacrimile lui intr-un diagnostic spiritual sigur.","lacrimile lui Esau")
rep(p,"Nu a trimis niciodata. Nu se mai scrie nicaieri in Scriptura ca l-ar fi revazut. Cand se va intoarce el, ea nu va mai fi.","Scriptura nu consemneaza ca ar fi trimis dupa el sau ca l-ar fi revazut. Tacerea textului lasa despartirea dureroasa, dar nu ne ingaduie sa povestim ca fapt ultimele ei zile.","despartirea de Rebeca")

# Geneza 28
p="packages/shared/src/bible/geneza28.ts"
rep(p,"In toata acea lume, oamenii credeau ca zeii locuiesc fiecare in tinutul lui si ca de aceea trebuie sa te inchini altui zeu cand treci hotarul; de aceea fagaduinta ca Domnul merge cu el pe drum era ceva cu totul nou. Turnurile in trepte pe care le zideau popoarele de acolo, ca acela din Babel, aveau o scara pe care se credea ca zeii coboara la oameni; iar aici Dumnezeu arata scara adevarata, si nu una zidita de mana omului.","In religiile vechi ale tinutului, zeii erau adesea legati de locuri si sanctuare; de aceea fagaduinta ca Domnul il pazeste pe Iacov oriunde merge este izbitoare. Unii cercetatori compara scara din vis cu templele in trepte ale lumii vechi, dar Geneza nu face ea insasi aceasta identificare.","religia si scarile lumii vechi")
rep(p,"Dumnezeul cel Atotputernic; Numele sub care Dumnezeu Se arata cand implineste ce este cu neputinta firii.","Dumnezeul cel Atotputernic, redarea traditionala a numelui El Șadai; etimologia exacta a numelui este discutata.","sensul El Sadai")
rep(p,"Intai se suiau.\n\nAdica erau deja aici, jos, langa el, inainte ca el sa fi vazut ceva.","Intai se suiau.\n\nImaginea poate mangaia prin gandul ca slujirea cereasca era deja in lucrare, dar textul nu explica de ce ordinea este aceasta.","ordinea ingerilor")
rep(p,"Deci scara nu este un lucru, ci o Persoana.\n\nEl este drumul dintre cer si pamantul acesta pe care noi ne culcam cu piatra sub cap.","In Ioan 1:51, Domnul Isus reia imaginea si o leaga de Fiul omului. Crestinii pot vedea aici o implinire in Hristos, fara sa pretinda ca Iacov a inteles atunci tot ce avea sa descopere Evanghelia.","scara si Hristos")
rep(p,"Dumnezeu isi leaga prezenta de implinirea cuvantului Sau. Cu alte cuvinte: nu plec de langa tine cat inca mai am ceva de facut cu tine.\n\nIar Cuvantul Lui nu se sfarseste niciodata de implinit.","Dumnezeu Isi leaga prezenta de implinirea acestei fagaduinte date lui Iacov: il va pazi si il va aduce inapoi. Nu largim automat acest «pana» intr-o promisiune nelimitata pentru orice imprejurare; pentru nadejdea noastra folosim fagaduintele adresate limpede credinciosilor in restul Scripturii.","limitele fagaduintei")
rep(p,"Sa cantarim bine ce face aici. Ia fagaduintele lui Dumnezeu si le preface in conditii de targ.\n\nEste tocmai omul pe care il stim: cel care s-a targuit pentru dreptul de intai nascut cu o strachina de linte.\n\nAcum se targuieste cu Dumnezeu.","Formularea poate suna ca un targ, dar ebraica ingaduie si citirea «daca/fiindca Dumnezeu va fi cu mine». Crestinii au inteles juruinta in ambele feluri; se cuvine sa pastram rezerva si sa observam, in orice caz, cat de stangaci raspunde Iacov la un har spus fara conditii.","juruinta lui Iacov")

# Geneza 29
p="packages/shared/src/bible/geneza29.ts"
rep(p,"Un drumet obosit, dupa sute de kilometri pe jos, misca singur o piatra pe care o miscau mai multi barbati.\n\nDe unde puterea? Textul nu ne lamureste, dar spune de trei ori intr-un singur rand aceeasi vorba", "Un drumet ajuns dupa un drum lung misca piatra pe care pastorii asteptau s-o dea la o parte impreuna.\n\nTextul nu ne spune daca piatra cerea neaparat puterea mai multor barbati si nici ce i-a dat lui Iacov putere; spune insa de trei ori intr-un singur rand aceeasi vorba", "puterea lui Iacov")
rep(p,"Asa este dragostea adevarata: nu socoteste pretul.","Dragostea lui Iacov i-a schimbat simtirea anilor. Putem primi imaginea ca indemn la rabdare, fara sa facem din ea o masura universala a «dragostei adevarate».","dragostea si pretul")
rep(p,"Dumnezeu nu a pus la cale inselaciunea lui Laban. Dar a ingaduit ca omul sa-si vada pacatul in oglinda.","Dumnezeu nu a pus la cale inselaciunea lui Laban. Naratiunea construieste o oglinda limpede intre inselarea facuta de Iacov si cea suferita de el; textul nu spune insa direct ca Dumnezeu a randuit frauda drept pedeapsa.","oglinda inselarii")
rep(p,"Nimeni nu o intreaba nimic. Este data, dusa, descoperita si tinuta.","Textul nu consemneaza consimtamantul sau cuvintele Leii. Ea este data, dusa, descoperita si tinuta; tacerea naratiunii ne cere grija, nu dreptul de a spune sigur tot ce a gandit ori a ales.","glasul Leii")
rep(p,"Dar a incetat sa mai ceara de la un om ce numai Dumnezeu putea sa-i dea.","Pentru intaia data in sirul acestor nume, Lea nu-l mai pomeneste pe Iacov, ci lauda pe Domnul. Putem vedea aici o intoarcere a privirii ei, fara sa pretindem ca stim ca orice dor dupa dragostea sotului a incetat atunci.","lauda Leii")

# Geneza 30
p="packages/shared/src/bible/geneza30.ts"
rep(p,"Mandragora era o planta cu radacina groasa si fructe galbene, mirositoare, despre care se credea in tot Rasaritul ca ajuta la zamislire.","Mandragora era o planta cunoscuta in lumea veche si legata in unele traditii de dragoste si rodire; textul nu afirma ca avea putere de a ajuta la zamislire.","mandragorele")
rep(p,"Tatal lui, Isaac, cand a vazut ca Rebeca este stearpa, s-a rugat Domnului pentru nevasta lui, si a staruit douazeci de ani.","Tatal lui, Isaac, se rugase Domnului pentru Rebeca, iar Domnul ii ascultase rugaciunea. Cronologia arata douazeci de ani intre casatorie si nasterea gemenilor, dar textul nu spune ca aceeasi rugaciune a fost rostita staruitor in tot acest timp.","rugaciunea lui Isaac")
rep(p,"A treia oara in cartea aceasta se incearca acelasi lucru.\n\nSara facuse asa cu Agar", "Se incearca din nou o cale asemanatoare celei urmate de Sara cu Agar", "numararea roabelor")
rep(p,"Frumos, fiindca este intaia oara cand femeia aceasta cere ceva de la Dumnezeu, nu de la un om si nu de la o radacina de pe camp.","Frumos, fiindca acum cererea este indreptata spre Domnul, nu spre un om ori spre o radacina de pe camp. Textul spusese deja ca Dumnezeu a ascultat-o, asa ca nu putem numi aceasta neaparat intaia ei rugaciune.","rugaciunea Rahelei")
rep(p,"Din Iosif va iesi omul cel mai curat din toata cartea Genezei", "Iosif va deveni unul dintre chipurile cele mai luminoase ale credinciosiei din Geneza", "evaluarea lui Iosif")
rep(p,"Iar cererea Rahelei a fost ascultata: va mai avea un fiu, pe Beniamin — dar cu pretul vietii ei.\n\nSe cuvine sa luam seama la asta cu multa cinste. Nu tot ce cerem noi este bine sa vina asa cum cerem.","Rahela va mai avea un fiu, pe Beniamin, si va muri la nastere. Textul nu spune ca moartea ei a fost pretul cererii si nu folosim tragedia ca avertisment impotriva rugaciunii; o lasam ca durere a istorisirii.","cererea si moartea Rahelei")
rep(p,"Era un obicei de pe atunci, o socoteala a pastorilor, care nu are nici o legatura cu felul in care se mostenesc insusirile la animale.\n\nSe cuvine sa spunem limpede: nu nuielele au facut mieii pestriti.","Gestul reflecta o credinta veche despre influenta imaginilor vazute la imperechere, nu o explicatie genetica valabila. Capitolul urmator pune sporirea turmei pe seama lucrarii lui Dumnezeu; de aceea nu transformam nuielele intr-o tehnica si nici nu pretindem ca naratiunea ne explica mecanismul biologic.","nuielele si genetica")

# Geneza 31
p="packages/shared/src/bible/geneza31.ts"
rep(p,"dupa randuielile din tinutul acela, cine ii avea in mana putea ridica pretentii asupra averii familiei, ceea ce lamureste de ce Laban a alergat sapte zile dupa ei", "au fost propuse mai multe explicatii pentru furt, inclusiv valoarea lor religioasa sau familiala; textul nu spune ca posesorul lor primea drept de mostenire si nu reduce urmarirea lui Laban la acest motiv", "terafimii si mostenirea")
rep(p,"Rahela va muri tanara, pe drum, la nasterea celui de al doilea fiu — dupa ce Iacov va rosti, fara sa stie, un blestem asupra celui la care se vor gasi idolii.\n\nNu punem in text ce nu scrie. Textul nu leaga cele doua lucruri. Dar ne cutremuram cand le citim unul dupa altul.","Mai tarziu Rahela va muri la nasterea lui Beniamin. Textul nu leaga moartea ei de furtul idolilor sau de vorba lui Iacov, asa ca nu lasam nici macar prin sugestie impresia unui blestem implinit.","Rahela si blestemul")
rep(p,"Cine strange atatia oameni si merge sapte zile nu merge sa sarute pe nimeni.","Urmarirea de sapte zile cu oamenii lui arata gravitatea conflictului. Laban spune ca ar fi vrut o despartire cu saruturi si cantece, dar textul nu ne lasa sa stabilim cu siguranta tot ce intentiona sa faca inainte de vis.","intentia lui Laban")
rep(p,"Si mai poarta in el, poate, amintirea muntelui Moria, unde Isaac zacuse legat pe lemne.","Unii cititori aud aici si un ecou al cutremurului lui Isaac inaintea lui Dumnezeu; textul nu leaga insa numele de Moria.","Frica lui Isaac si Moria")
rep(p,"Sunt legaturi care nu se pot vindeca, si care se pot doar incheia cinstit.\n\nNu tot ce se rupe se lipeste in viata aceasta.\n\nUneori, cel mai bun lucru pe care il pot face doi oameni este sa se desparta fara sa-si mai faca rau, si sa lase judecata in mana lui Dumnezeu.","Legamantul lor arata ca uneori pacea cere un hotar limpede, nu o apropiere prefacuta. Nu facem insa din istoria lor o reteta pentru casnicii, familii sau situatii de abuz; hotarele serioase se cauta cu ajutorul unor oameni de incredere si, cand este nevoie, al serviciilor specializate.","aplicatia despre despartire")

# Geneza 32
p="packages/shared/src/bible/geneza32.ts"
rep(p,"O ceata de patru sute de oameni era o mica ostire, cate strangea in vremea aceea o capetenie care putea sa nimiceasca o tabara. Darul trimis inainte, turma dupa turma, era chipul obisnuit de a-l imbuna pe un stapanitor mai puternic; numarul vitelor din darul lui Iacov era o avere mare.","Patru sute de oameni puteau parea o forta amenintatoare pentru o tabara de familie, desi textul nu spune cu ce gand veneau. Darul trimis turma dupa turma urmareste chiar in cuvintele lui Iacov sa-l imblanzeasca pe Esau si reprezenta o parte insemnata din averea lui.","cei patru sute si darul")
rep(p,"Taberele acelea sunt si acum acolo. Numai ca noi nu le vedem.","Scriptura ne da in alte locuri fagaduinte despre slujirea ingerilor, dar nu transformam vedenia particulara a lui Iacov intr-o afirmatie ca aceeasi tabara sta nevazuta langa fiecare cititor.","largirea vedeniei")
rep(p,"Dumnezeu asteapta sa fim singuri.","In istorisirea aceasta, Iacov ramane singur inaintea intalnirii care il schimba. Putem cauta linistea inaintea lui Dumnezeu, fara sa spunem ca El lucreaza numai dupa ce ne izoleaza.","singuratatea lui Iacov")
rep(p,"ca aceasta este o aratare a lui Dumnezeu in chip de om, si ca multi vad in ea o umbra a Fiului, Cel care avea sa Se faca om cu adevarat.","ca Iacov a intalnit tainic pe Dumnezeu in acest «om»; unii crestini vad aici si o aratare a Fiului inainte de intrupare, dar textul nu hotaraste explicit aceasta identificare.","identitatea luptatorului")
rep(p,"Adica: apucator de calcai. Inlocuitor. Inselator.","Numele este legat in Geneza de calcai si de jocul de cuvinte despre inlocuire. Traducerea directa «inselator» este prea sigura pentru o etimologie discutata, chiar daca viata lui Iacov cunoscuse inselaciunea.","etimologia lui Iacov")
rep(p,"De atunci nu a mai putut alerga. Nu a mai putut fugi de nimeni, cum fugise de Esau si de Laban.\n\nA trebuit sa se sprijine.\n\nLa sfarsitul vietii, cand va binecuvanta pe fiii lui Iosif, se va scrie ca s-a inchinat rezemat pe varful toiagului sau.\n\nToiagul de care se sprijinea era din pricina noptii aceleia.","In dimineata aceea schiopata. Textul nu spune cat a durat rana si nici nu leaga toiagul de la sfarsitul vietii de aceasta lovitura; imaginea sprijinirii ramane frumoasa numai daca este numita ca aplicare, nu ca fapt dovedit.","durata schiopatarii")
rep(p,"Sunt oameni care poarta o schiopatare de la o intalnire cu Dumnezeu: o boala, o pierdere, o slabiciune care nu s-a dus niciodata.\n\nSi tocmai ea ii tine aproape.","Uneori o slabiciune ramasa ne invata sa ne sprijinim pe har, asa cum marturiseste Pavel despre tepusul lui. Nu atribuim insa bolile sau pierderile cititorului unei lovituri date de Dumnezeu si nu promitem ca durerea il va tine automat aproape.","aplicatia despre boala")

# Geneza 33
p="packages/shared/src/bible/geneza33.ts"
rep(p,"Dumnezeu topise ura aceea, in tacere, in douazeci de ani, fara ca Iacov sa stie nimic.","Textul nu ne povesteste cum s-a schimbat Esau in cei douazeci de ani. Putem vedea providenta lui Dumnezeu in impacare, fara sa afirmam ca stim in ce clipa sau prin ce lucrare i s-a schimbat inima.","schimbarea lui Esau")
rep(p,"Adica: iti dau inapoi binecuvantarea pe care ti-am luat-o.\n\nAsa arata pocainta adevarata: nu numai parere de rau, ci mana intinsa cu ce ai luat.","Folosirea aceluiasi cuvant poate suna ca un ecou al binecuvantarii furate, iar darul are chipul unei restituiri. Textul nu spune insa ca binecuvantarea legamantului putea fi data inapoi prin vite.","darul ca binecuvantare")
rep(p,"Se cuvine sa spunem limpede: nu a ajuns niciodata in Seir.","Naratiunea spune ca s-a dus la Sucot si apoi la Sihem, nu la Seir; ea nu consemneaza daca Iacov l-a vizitat vreodata mai tarziu pe Esau.","drumul spre Seir")
rep(p,"Un altar bun, dar intr-un loc unde nu fusese chemat.","Un altar adevarat, intr-un loc pe care textul nu-l numeste rau. Totusi, Betel ramanea locul juruintii, iar in capitolul 35 Dumnezeu il va chema sa mearga acolo.","altarul din Sihem")
rep(p,"Si ce a iesit din popasul acesta se citeste in capitolul urmator, care este unul dintre cele mai grele din toata cartea.","Capitolul urmator povesteste tragedia Dinei la Sihem. Asezarea celor doua capitole ne invita la cumpatare, dar nu spunem ca oprirea tatalui a cauzat silnicia facuta fetei.","popasul si Dina")

# Geneza 34
p="packages/shared/src/bible/geneza34.ts"
rep(p,'title: "Geneza 34 — Ce a costat popasul la Sihem"','title: "Geneza 34 — Dina, viclesugul si violenta"',"titlu fara invinovatire")
rep(p,"In lumea aceea, o fata siluita ramanea, de obicei, fara nadejde de casatorie, iar familia ei purta rusinea; de aceea se cerea de multe ori ca cel vinovat sa o ia de nevasta si sa plateasca zestrea.","In lumea veche, violenta sexuala era tratata adesea prin negocieri intre familii, iar zestrea si casatoria puteau intra in discutie. Acest context explica vorbele barbatilor, dar nu transforma o casatorie cu agresorul in reparatie si nu muta rusinea asupra fetei.","context sensibil despre victima")
rep(p,"Capitolul acesta este pretul popasului de la sfarsitul capitolului dinainte: Iacov trebuia sa mearga la Betel, si s-a oprit la Sihem.","Capitolul acesta urmeaza popasului de la Sihem si arata ce s-a intamplat acolo. Textul nu spune ca silnicia Dinei a fost pedeapsa pentru oprirea lui Iacov si nu folosim asezarea geografica pentru a invinovati victima sau familia.","cauzalitatea popasului")
rep(p,"Si se cuvine sa spunem, cu tristete, ca omul acesta — care se luptase toata noaptea cu Dumnezeu si primise nume nou — nu misca un deget pentru fata lui.","Iacov asteapta pana se intorc fiii de la pasune. Textul nu ne spune daca tacerea lui a fost socoteala, spaima sau neputinta; il putem critica pentru ce va spune la sfarsit, dar nu ii atribuim aici sigur indiferenta.","tacerea lui Iacov")
rep(p,"Cand un tata tace, mania se muta in copii, si acolo nu mai are masura.\n\nSe cuvine sa luam invatatura de aici: tacerea nu este intotdeauna intelepciune. Uneori este numai neputinta.","Tacerea poate lasa un gol primejdios, dar nu punem macelul fiilor in seama unei singure reactii a tatalui. Fiecare ramane raspunzator pentru propria fapta.","tacerea si mania fiilor")
rep(p,"Dumnezeu poate lua o ravna salbateca si, in ani, sa o curete si sa o puna la lucrul Lui.\n\nNu incuviinteaza salbaticia. Dar nu leapada omul.","Mai tarziu semintia lui Levi va primi slujire in Israel, dar aceasta chemare nu curata retrospectiv macelul si nu ne ingaduie sa numim sabia o ravna folositoare lui Dumnezeu.","Levi si violenta")
rep(p,"Deci Dumnezeu a pastrat pentru fapta aceasta un singur cuvant, si acela este blestemata sa fie mania.","Mai tarziu Iacov va judeca fapta prin cuvintele: «blestemata sa fie mania lor». Aceasta este marturia patriarhului pastrata de Scriptura; nu o prezentam ca un citat rostit direct de Dumnezeu.","cine rosteste judecata")
rep(p,"Iar Dumnezeu, care aude glasul unei roabe fugite in pustie si vede pe cea neiubita in patul ei, o vede si pe fata aceasta, chiar daca textul o lasa tacuta.","Iar Dumnezeu, care aude glasul unei roabe fugite in pustie si vede pe cea neiubita, o vede si pe fata aceasta, chiar daca textul o lasa tacuta. Daca aceste randuri ating o rana personala sau o primejdie prezenta, lectia nu poate tine locul ajutorului: vorbeste cu o persoana de incredere ori cu un serviciu specializat; in pericol imediat suna la 112, iar minorii pot suna la 116 111.","formular de siguranta")

# Geneza 35
p="packages/shared/src/bible/geneza35.ts"
rep(p,"idolii aceia erau acolo de douazeci de ani.\n\nRahela ii furase de la Laban. Se cara cu ei prin pustie, in tara fagaduintei, in cortul in care se rugau.\n\nSi barbatul acela stiuse, sau macar banuise, si tacuse.","cel putin unii idoli venisera din casa lui Laban, iar acum se aflau si alti dumnezei straini si cercei in tabara largita. Textul nu spune ca Iacov stiuse douazeci de ani de toti sau ca ii ingaduise constient.","vechimea idolilor")
rep(p,"aici, cand se pomeneste doica Rebecii, aflam pe ocolite ca Rebeca insasi murise.\n\nMoartea ei nu se scrie nicaieri.\n\nMama care ii spusese lui Iacov cateva zile nu l-a mai vazut niciodata.","pomenirea doicii Rebecii ne aminteste de casa veche, dar nu ne spune cand a murit Rebeca si nici daca mama si fiul s-au mai vazut. Scriptura nu consemneaza moartea ei, iar tacerea aceasta nu trebuie umpluta cu certitudini.","moartea Rebecai")
rep(p,"Dar ne oprim si ne cutremuram: nu tot ce cerem cu strigat este bine sa vina asa cum am cerut.\n\nDe aceea ne rugam si zicem: faca-se voia Ta.","Moartea la nastere este povestita ca tragedie, nu ca raspuns primejdios la rugaciunea ei de odinioara. Ne rugam «faca-se voia Ta» din incredere, nu din teama ca Dumnezeu ar pedepsi o cerere prin darul primit.","Rahela si rugaciunea")
rep(p,"Era o mana intinsa spre capatania familiei, peste un tata slabit de jale.","In lumea veche, culcarea cu femeia capului de familie putea avea si o dimensiune de pretentie la autoritate, dar textul nu explica motivul lui Ruben; nu il stabilim ca fapt.","motivul lui Ruben")
rep(p,"Se cuvine sa spunem cinstit: tacerea aceasta a fost o vina.","Textul nu descrie reactia imediata a lui Israel dincolo de faptul ca a aflat. Mai tarziu va rosti judecata asupra lui Ruben; nu numim sigur vina o tacere pe care naratiunea doar o lasa nespusa.","reactia lui Israel")
rep(p,"Doi frati care se despartisera cu o sabie ridicata stau acum, batrani, la acelasi mormant, si sapa impreuna.","Doi frati care se despartisera cu amenintarea lui Esau stau acum la acelasi mormant si isi ingroapa tatal impreuna.","cine a vrut sa ucida")

# Geneza 36
p="packages/shared/src/bible/geneza36.ts"
rep(p,"Iar Amalec, nascut aici dintr-o tiitoare, va ajunge cel dintai popor care se lupta cu Israel dupa iesirea din Egipt, si vrajmasul lui de veacuri.","Amalec, pomenit aici ca fiu al Timnei si al lui Elifaz, va da numele poporului care se lupta cu Israel dupa iesirea din Egipt. Genealogia nu explica ostilitatea prin statutul mamei sale.","Amalec si Timna")
rep(p,"Dumnezeu nu trece cu vederea pe cei pe care nu i-a ales pentru o lucrare anume.\n\nAlegerea nu este dispret.","Dumnezeu nu trece cu vederea ramura care nu poarta linia legamantului in aceasta naratiune.\n\nAlegerea pentru linia fagaduintei nu ne da voie sa dispretuim un om sau un neam.","alegerea lui Esau")
rep(p,"Tot din neamul acesta va fi Haman Agaghitul, care a vrut sa piarda tot poporul in zilele Esterei.","Traditia a legat uneori numele «Agaghit» al lui Haman de Amalec, dar textul Esterei nu traseaza explicit genealogia lui pana la acest Amalec.","Haman Agaghitul")
rep(p,"Ana acesta a gasit izvoarele calde in pustie, cand pastea magarii tatalui sau.","Ana acesta a gasit ceea ce Cornilescu reda prin «izvoarele calde» in pustie, cand pastea magarii tatalui sau; sensul cuvantului ebraic este nesigur, iar alte traduceri il redau diferit.","izvoarele lui Ana")
rep(p,"Dumnezeu Se apropie de oameni care sunt la treaba lor.","In multe istorisiri biblice Dumnezeu ii intalneste pe oameni in mijlocul muncii lor; aici insa textul consemneaza doar descoperirea lui Ana, nu o aratare divina.","Ana la treaba")
rep(p,"Esau are imparati cu sute de ani inaintea lui Israel.","Lista spune ca Edom a avut imparati inainte de a domni un imparat peste Israel. Textul nu precizeaza aici numarul anilor si nu cere o cronologie mai exacta.","cronologia imparatilor")
rep(p,"de ce merge mai repede cel care nu-L cauta pe Dumnezeu?", "de ce pare uneori ca prospera mai repede cel din afara liniei fagaduintei? Textul nu spune ca fiecare edomit din lista nu-L cauta pe Dumnezeu", "judecata asupra edomitilor")
rep(p,"Ne este data ca sa vedem cat de repede se poate ridica un om fara Dumnezeu, si cat de incet lucreaza Dumnezeu in cei ai Sai.","Ne este data ca sa vedem ca ridicarea politica rapida nu este aceeasi cu purtarea fagaduintei si ca Dumnezeu lucreaza adesea pe cai mai lente decat asteptarile noastre.","oameni fara Dumnezeu")

counts = Counter(rel for rel, _ in changes)
report = f'''# Raport de revizie AI — Geneza 26–36

Data: 2026-08-02

## Intinderea reviziei

Au fost citite integral capitolele `geneza26.ts`–`geneza36.ts`, dupa masura din `docs/29-raport-revizie-ai-geneza-1-11.md` si carta doctrinara `docs/14-carta-doctrinara.md`.

Revizia a cautat in mod special:

- afirmatii istorice sau ebraice spuse mai sigur decat permit sursele;
- ganduri si motive atribuite personajelor fara sprijin explicit;
- imagini omiletice prezentate drept sens unic al textului;
- relatii cauzale intre pacat si suferinta pe care naratiunea nu le afirma;
- largirea fagaduintelor date patriarhilor intr-o promisiune generala;
- aplicatii sensibile despre casnicie, abuz, violenta, boala si moarte;
- formulari care ar putea invinovati victima, mai ales in Geneza 34.

## Rezultat

Au fost facute **{len(changes)} de indreptari** in **{len(counts)} capitole**.

''' + '\n'.join(f'- `{rel}` — {counts[rel]} indreptari' for rel in sorted(counts)) + '''

## Indreptari principale

- contextul despre fantani, filisteni, binecuvantari familiale, terafimi si regii Edomului a fost formulat cu rezerva ceruta de text;
- `El Șadai`, numele lui Iacov/Israel si termenul despre descoperirea lui Ana nu mai primesc etimologii mai sigure decat ingaduie datele;
- gandurile lui Isaac, Rebeca, Laban, Lea, Rahela, Ruben si Esau nu mai sunt povestite drept fapte acolo unde Scriptura tace;
- scara de la Betel si lupta de la Iaboc pastreaza lectura crestina, dar tipologia este numita ca lectura, nu ca propozitie explicita a Genezei;
- juruinta lui Iacov din Geneza 28 ramane deschisa celor doua citiri gramaticale uzuale, fara verdictul simplist ca ar fi doar un targ;
- rugaciunile si cererile Rahelei nu mai sunt legate de moartea ei ca pret, avertisment sau blestem implinit;
- nuielele din Geneza 30 nu mai sunt tratate ca mecanism biologic si nici negate printr-o certitudine pe care naratiunea nu o explica;
- impacarea cu Esau ramane lucrare providentiala, fara afirmatia nesprijinita ca stim exact cum si cand Dumnezeu i-a schimbat inima;
- oprirea la Sihem nu mai este prezentata drept cauza silniciei Dinei;
- Geneza 34 nu mai pune tacerea lui Iacov drept cauza unica a macelului si nu foloseste chemarea ulterioara a lui Levi pentru a spiritualiza violenta;
- capitolul sensibil despre Dina include acum indrumare explicita spre ajutor real si numerele de siguranta cerute de carta doctrinara;
- moartea Rebecai, durata schiopatarii lui Iacov si motivele lui Ruben raman in limitele a ceea ce textul spune;
- Amalec nu mai este explicat prin statutul mamei sale, iar legatura lui Haman cu acest Amalec este marcata drept traditie, nu genealogie demonstrata.

## Stare

Toate capitolele raman `in_review`. Revizia AI curata formularile si reduce riscul pastoral, dar nu inlocuieste lectura umana finala si aprobarea de publicare.

## Rezerve

- Nu a fost schimbat textul biblic Cornilescu inclus in campurile `text`; revizia a vizat explicatia, contextul si aplicatia.
- Cateva legaturi tipologice au fost pastrate in registru bisericesc, dar delimitate explicit de afirmatia directa a Genezei.
- Geneza 34 necesita in continuare lectura umana atenta, tocmai fiindca trateaza violenta sexuala, razbunarea si tacerea victimei.
'''
(ROOT / "docs/32-raport-revizie-ai-geneza-26-36.md").write_text(report)

# Helper-ele nu trebuie sa ramana in PR.
(ROOT / "scripts/review-geneza-26-36.py").unlink()
(ROOT / ".github/workflows/review-geneza-26-36.yml").unlink()
print(f"Applied {len(changes)} corrections across {len(counts)} files")
