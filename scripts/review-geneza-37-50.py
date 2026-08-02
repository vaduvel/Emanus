from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

REPLACEMENTS = {
  "packages/shared/src/bible/geneza37.ts": [
    ("Haina pomenita aici era o haina lunga, cu maneci, purtata de cei care nu munceau la camp; era semn de cinste si, in unele case, semnul celui pus mai mare peste ceilalti.", "Expresia ebraica pentru haina lui Iosif este greu de talmacit: poate desemna o haina lunga ori bogat lucrata. Textul o arata limpede ca semn al iubirii deosebite a tatalui, dar nu spune sigur ce croiala avea ori ce slujba arata."),
    ("Ia aminte, mai intai, ca visele erau de la Dumnezeu.\\n\\nSe cuvine sa spunem asta de la inceput, ca sa nu-l judecam gresit pe baiat: nu si le-a nascocit singur.\\n\\nS-au implinit intocmai, cuvant cu cuvant, peste douazeci si ceva de ani.", "Ia aminte, mai intai, ca povestirea va arata implinirea viselor.\\n\\nTextul nu spune aici in cuvinte apasate de unde au venit, dar implinirea lor in randuiala providentei ne cere sa nu le tratam ca pe simple nascociri ale baiatului.\\n\\nFratii se vor pleca inaintea lui dupa multi ani."),
  ],
  "packages/shared/src/bible/geneza38.ts": [
    ("Si mai era ceva la mijloc, si se cuvine sa-l spunem: daca Tamar nu avea fiu, mostenirea fratelui mort ramanea la el.\\n\\nAdica se folosea de femeia aceea si o tinea saraca, ca sa iasa el mai bine.", "Unii talcuitori vad aici si un folos material pentru Onan, legat de mostenire. Textul nu spune insa aceasta direct. Ceea ce spune limpede este ca el refuza cu buna stiinta sa ridice samanta fratelui sau, folosindu-se de Tamar fara sa-si implineasca datoria fata de ea."),
    ("Dumnezeu da inapoi cu masura plina celor carora li s-a luat pe nedrept.", "Nasterea celor doi fii arata ca povestea Tamarei nu se incheie in lipsire; totusi, textul nu transforma acest deznodamant intr-o promisiune ca orice pierdere nedreapta va fi rasplatita in acelasi fel in viata aceasta."),
    ("Si de la firul acela, prin veacuri, se ajunge la Cruce.", "Firul rosu ramane amanuntul prin care moasa l-a insemnat pe Zerah; textul nu il explica drept simbol al Crucii. Legatura cu Hristos este data limpede prin genealogia lui Peret, nu prin culoarea firului."),
  ],
  "packages/shared/src/bible/geneza39.ts": [
    ("Un baiat de saptesprezece ani, care fusese cocolosit acasa si nu era invatat cu munca grea, se apuca de treaba intr-o casa straina, intr-o limba straina.", "Un tanar de saptesprezece ani, ajuns rob intr-o casa si intr-o limba straine, se apuca de treaba. Textul nu ne spune cat de deprins fusese cu munca in casa tatalui sau."),
    ("Se cuvine sa luam bine seama: nu se intampla din intamplare ca esti singur cu ispita.\\n\\nSe pregateste — fie de altcineva, fie de inima noastra care isi face loc.\\n\\nSi de aceea, cel intelept se pazeste de locurile in care nu este nimeni.", "Se cuvine sa luam bine seama la primejdia in care a fost pus Iosif: era singur la lucrul lui, iar o persoana cu putere asupra lui l-a apucat de haina. Textul nu pune vina asupra lui pentru faptul ca se afla acolo; raspunderea este a celei care l-a hartuit. Invatatura limpede este raspunsul lui: a fugit cand a putut."),
    ("A iesit afara dezbracat, ca sa ramana curat.", "A iesit lasandu-si haina in mana ei, ca sa ramana curat; textul nu precizeaza cat din imbracaminte ii ramasese."),
  ],
  "packages/shared/src/bible/geneza40.ts": [
    ("Nu era gresit sa ceara. Era gresit sa se sprijine.", "Nu era gresit sa ceara ajutor; textul nu spune ca Iosif si-ar fi mutat nadejdea de la Dumnezeu la paharnic. Invatatura sigura este mai smerita: ajutorul omenesc poate intarzia sau poate fi uitat."),
    ("Sapte sute de zile intre randul acesta si urmatorul.", "Aproape doi ani intre randul acesta si urmatorul."),
  ],
  "packages/shared/src/bible/geneza41.ts": [
    ("tara cea mai invatata a lumii de atunci, cu carti scrise anume pentru talmacirea visurilor.", "o tara vestita pentru invatatura si pentru traditiile ei de talmacire a visurilor."),
    ("Se cuvine sa spunem cinstit: nu pentru Faraon.\\n\\nDumnezeu pregatea painea pentru o casa de saptezeci de suflete din Canaan", "Textul arata ca descoperirea data lui Faraon a pregatit salvarea Egiptului, a popoarelor din jur si a casei lui Iacov. In centrul legamantului se afla si pastrarea familiei din Canaan"),
  ],
  "packages/shared/src/bible/geneza42.ts": [
    ("Egiptul era singura tara cu paine, fiindca Nilul aducea apa din alta parte si fiindca fusese pregatit graul de sapte ani.", "In povestire, Egiptul avea provizii de grau datorita anilor de strangere randuiti de Iosif; oameni din tarile lovite de foamete veneau acolo sa cumpere. Nilul explica rodnicia obisnuita a Egiptului, dar textul pune accentul pe pregatirea dinainte."),
    ("Asprimea aceasta nu este razbunare; este cercetare.", "Desfasurarea povestirii ne ingaduie sa citim asprimea aceasta ca pe o cercetare a fratilor, nu doar ca pe o razbunare; textul nu ne da insa o explicatie directa a tuturor motivelor lui Iosif."),
    ("Simeon era al doilea, si era omul cu sabia de la Sihem.\\n\\nSe cuvine sa luam seama la judecata lui dreapta: nu i-a pedepsit la intamplare, si a crutat tocmai pe cel care il aparase.", "Simeon era al doilea dintre frati, iar Ruben, cel dintai, incercase odinioara sa-l scape. Textul nu spune de ce l-a ales Iosif tocmai pe Simeon; legarea alegerii de sabia de la Sihem ramane doar o posibilitate, nu verdictul capitolului."),
  ],
  "packages/shared/src/bible/geneza43.ts": [
    ("Dumnezeu nu ia niciodata de la om ca sa-l saraceasca.", "In aceasta povestire, Iacov credea ca da la pierdere doi copii, iar Dumnezeu i-a intors trei. Nu facem insa din acest deznodamant o promisiune ca orice pierdere va fi intoarsa in viata aceasta."),
    ("Deci Iosif il invatase pe economul sau despre Dumnezeul lui Israel.", "Vorbele economului arata ca Dumnezeul familiei era pomenit in casa lui Iosif; textul nu ne spune cat stia omul ori cum ajunsese sa vorbeasca astfel."),
  ],
  "packages/shared/src/bible/geneza45.ts": [
    ("se vede ce este iertarea: iertarea nu face de rusine in public pe cel ce a gresit.\\n\\nDragostea acopera o sumedenie de pacate.\\n\\nCine iarta cu adevarat nu strange martori.", "vedem o trasatura frumoasa a iertarii lui Iosif: nu-si expune fratii inaintea curtii. Dragostea nu foloseste adevarul ca spectacol al rusinii. Totusi, in situatii de abuz ori primejdie, cautarea martorilor si a ajutorului potrivit poate fi necesara; acest episod nu cere ascunderea raului."),
    ("Deci intreaga mantuire trecea prin cei sapte ani de foamete, si prin groapa aceea, si prin casa lui Potifar, si prin temnita.", "Astfel a fost pastrata familia prin care avea sa inainteze fagaduinta mesianica. Aceasta este o citire canonica a povestii; Geneza 45 spune direct ca Dumnezeu a pastrat viata familiei si a multor oameni."),
  ],
  "packages/shared/src/bible/geneza46.ts": [
    ("Dumnezeu ii spusese lui Avraam sa nu se duca in Egipt, si Avraam se dusese, si se intamplase ce s-a intamplat cu Sara.\\n\\nLui Isaac ii spusese apasat: nu te pogori in Egipt.", "Avraam se pogorase in Egipt in vreme de foamete, iar urmarea fusese primejdioasa pentru Sara; Geneza nu spune ca primise atunci o interdictie explicita. Lui Isaac, in schimb, Dumnezeu ii spusese apasat: nu te pogori in Egipt."),
    ("nu este o greseala, ci doua feluri de a socoti.\\n\\nStefan vorbea dupa traducerea greceasca a Vechiului Testament, care numara si cativa dintre urmasii lui Iosif nascuti in Egipt.\\n\\nUnul socoteste pe cei ce s-au pogorat, celalalt socoteste toata casa.", "diferenta tine de traditii textuale si de feluri diferite de a delimita familia numarata. Fapte 7 urmeaza forma greaca a Vechiului Testament, care are saptezeci si cinci; textul ebraic al Genezei si Exodului are saptezeci. Explicatia exacta a celor cinci nume in plus cere atentie la listele genealogice, nu o formula prea simpla."),
  ],
  "packages/shared/src/bible/geneza47.ts": [
    ("Sa luam bine seama: nu ii sileste nimeni.\\n\\nEi cer, cu gura lor.", "Sa luam bine seama: ei cer aceasta cu gura lor, dar o fac sub constrangerea cumplita a foametei. Textul nu ne ingaduie sa tratam alegerea lor ca pe una lipsita de presiune."),
    ("In lumea aceea era o dare usoara; mai tarziu, in Israel, proorocul Samuel avea sa spuna ca imparatii vor lua a zecea parte, si o va socoti povara.\\n\\nDeci nu i-a stors.", "O cincime din rod era o dare insemnata, iar comparatia directa cu zeciuiala pomenita de Samuel nu dovedeste singura ca povara era usoara. Textul consemneaza randuiala si recunostinta oamenilor pentru supravietuire, fara sa ne ceara sa o transformam intr-un model economic universal."),
    ("Si tot nu si-au cumparat viata; li s-a dat.", "Prin aceste schimburi au primit hrana care le-a pastrat viata. Aplicarea la har poate fi folositoare omiletic, dar nu trebuie sa stearga faptul narativ ca egiptenii au platit cu bunurile, pamanturile si slujirea lor."),
  ],
  "packages/shared/src/bible/geneza48.ts": [
    ("Ii spune, fara sa spuna: pe mama ta nu am putut sa o duc la Macpela, si de aceea te rog pe tine sa ma duci pe mine.\\n\\nSi ii spune si altceva: fiii tai ii asez in locul celor pe cari nu i-a mai apucat ea sa-i nasca.", "Pomenirea Rahelei leaga ceasul binecuvantarii de rana familiei si de drumul spre Betleem. Textul nu spune insa ca Iacov ar formula aici, pe ascuns, motivul ingroparii sale ori ca nepotii ar inlocui copii pe care Rahela nu i-a mai nascut; acestea raman sugestii omiletice."),
    ("Batranul acesta nu socotea ca sunt trei.\\n\\nIar Ingerul de care vorbeste este Acela cu care se luptase la Iaboc si de la care ceruse binecuvantare.", "Verbul la singular leaga strans invocarea, dar textul nu explica aici raportul dintre Dumnezeu si Inger. Unii crestini vad o aratare a Fiului inainte de intrupare; alti talcuitori inteleg ingerul ca trimis al lui Dumnezeu. Pastram taina deschisa acolo unde capitolul nu o inchide."),
    ("Batranul acela orb a vazut mai departe cu sapte sute de ani decat vedeau ochii lui Iosif.", "Cuvantul batranului a privit mult dincolo de ce vedeau atunci ochii lui Iosif; istoria ulterioara a lui Efraim i-a aratat greutatea."),
  ],
  "packages/shared/src/bible/geneza49.ts": [
    ("Aceasta este cea dintai proorocie lunga din Sfanta Scriptura si cel dintai cantec mare al ei.", "Aceasta este una dintre cele dintai rostiri poetice si profetice ample ale Scripturii."),
    ("din semintia lui Ruben nu a iesit nici un judecator, nici un prooroc, nici un imparat.\\n\\nUn ceas de pofta a costat sute de ani de nimicnicie in neamul lui.", "semintia lui Ruben nu a primit intaietatea si nu a dat dinastia lui Israel. Nu se cuvine insa sa rezumam veacuri intregi drept «nimicnicie» ori sa afirmam mai mult decat pot sustine listele biblice."),
    ("de aceea evreii au citit dintotdeauna randul acesta ca fiind despre Mesia, si asa il citim si noi.", "randul a primit din vechime interpretari mesianice in traditia iudaica si crestina, desi sensul exact al lui «Silo» ramane discutat. Crestinii il citesc in lumina imparatiei lui Hristos."),
  ],
  "packages/shared/src/bible/geneza50.ts": [
    ("Imbalsamarea era mestesugul egiptean prin care se pregatea un trup pentru vesnicie", "Imbalsamarea era mestesugul egiptean prin care se conserva si se pregatea trupul pentru inmormantare, in legatura cu credintele egiptene despre viata de dupa moarte"),
    ("si asa au purtat Israelitii sicriul lui Iosif patru sute de ani, pana in tara fagaduintei.", "iar trupul imbalsamat al lui Iosif a putut fi pastrat pana cand urmasii lui i-au luat osemintele la iesirea din Egipt. Textul nu spune unde ori in ce chip a fost pastrat sicriul in toate acele generatii."),
    ("uneori Dumnezeu ingaduie sa treci tu prin groapa, ca sa fie hraniti oameni pe care nici nu-i cunosti.", "in povestea lui Iosif, Dumnezeu a intors drumul prin groapa spre pastrarea multor vieti. Nu transformam aceasta intr-o explicatie gata facuta pentru suferinta fiecarui om."),
    ("A lasat in mijlocul poporului un sicriu care nu se ingropa.\\n\\nPatru sute de ani, in fiecare zi, oamenii aceia treceau pe langa el.\\n\\nSi sicriul acela le spunea, fara cuvinte, doua lucruri.", "A lasat poporului o porunca legata de osemintele sale, ca marturie ca Egiptul nu era capatul fagaduintei. Scriptura nu spune ca sicriul a ramas neingropat la vedere ori ca oamenii treceau zilnic pe langa el; imaginea poate sluji unei predici, dar nu trebuie prezentata drept fapt istoric."),
  ],
}

changed = 0
for rel, pairs in REPLACEMENTS.items():
    path = ROOT / rel
    text = path.read_text(encoding="utf-8")
    for old, new in pairs:
        if old in text:
            if text.count(old) != 1:
                raise SystemExit(f"Potrivire ne-uniCA ({text.count(old)}): {rel}: {old[:60]}")
            text = text.replace(old, new)
            changed += 1
        elif new not in text:
            raise SystemExit(f"Textul asteptat lipseste: {rel}: {old[:80]}")
    path.write_text(text, encoding="utf-8")

print(f"corectii_aplicate={changed}")
