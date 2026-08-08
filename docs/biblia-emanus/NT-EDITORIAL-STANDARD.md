# Standard editorial pentru Noul Testament — Biblia Emanus

Statut: **normativ**

Versiune: `1.0`

Domeniu: cele 27 de cărți și 260 de capitole ale Noului Testament din Biblia Emanus

## 1. Scop și limite

Acest document definește procesul obligatoriu de redactare, auditare și publicare a Noului Testament. El trebuie aplicat împreună cu `TRANSLATION_GUIDE.md`, `AUTOMATED-PUBLICATION.md` și registrul `NT-TEXTUAL-VARIANTS.md`.

În acest standard:

- **TREBUIE** indică o condiție blocantă pentru publicare;
- **NU TREBUIE** indică o interdicție blocantă;
- **AR TREBUI** indică regula implicită, de la care se poate devia numai printr-o decizie editorială justificată;
- **POATE** indică o opțiune care nu schimbă statutul textului.

Automatizarea poate demonstra că procesul declarat a fost urmat pe artefactele fixate. Ea nu poate demonstra că o ediție critică reproduce fără eroare autograful, că o traducere este adevărată teologic sau că o interpretare doctrinară este infailibilă. Nicio stare `approved` nu trebuie descrisă ca dovadă matematică a adevărului teologic.

## 2. Autoritatea și rolul surselor

### 2.1 Ierarhia obligatorie

| Prioritate | Sursă | Rol permis | Rol interzis |
| --- | --- | --- | --- |
| 1 | SBLGNT 1.2 | text critic grecesc de bază și aparat critic principal | identificare automată cu autograful |
| 2 | Textus Receptus public domain | martor grecesc suplimentar pentru tradiția bizantină/receptă și pentru lecturile tradiționale | înlocuire automată a SBLGNT |
| 3 | WEBU, ediția protestantă | punte engleză, segmentare și control auxiliar al sensului | sursă finală a formulării românești |
| 4 | Cornilescu 1924 și BTF, snapshoturi fixate | triangulare românească `comparison-only` | bază de copiere sau autoritate asupra grecei |
| 5 | NTR, consultată extern | al treilea etalon românesc `comparison-only` | stocare integrală în repository sau bază de redactare |

Textul românesc TREBUIE redactat din greaca koine, cu ajutorul punții WEBU. Etaloanele românești se consultă după existența unei redactări independente.

### 2.2 SBLGNT 1.2

Ediția critică de bază este:

- proiect: `SBL Greek New Testament`;
- versiune: `1.2`;
- commit fixat: `c4d241a9c1c479a55b989ba35a4976c1d0b8052c`;
- licență: `CC BY 4.0`;
- repository oficial: `https://github.com/LogosBible/SBLGNT`;
- site oficial: `https://sblgnt.com/`.

Snapshotul TREBUIE să conțină textul, aparatul, licența și metadatele atribuirii. Un branch, un tag mutabil sau un URL fără hash NU este suficient.

SBLGNT este punctul de pornire critic. O abatere de la lectura sa principală este permisă numai când auditul identifică exact unitatea de variație, martorii comparați, efectul semantic și motivul deciziei. O abatere fără această urmă este blocantă.

### 2.3 Textus Receptus

Martorul suplimentar este ediția greacă Textus Receptus distribuită public domain și fixată în `source-lock`. Snapshotul folosit TREBUIE identificat prin ediție, dată, URL și SHA-256. Dacă snapshotul este ediția colationată de Robert Adam Boyd, auditul TREBUIE să păstreze faptul că ea combină edițiile Stephanus 1550, Elzevir 1624 și Scrivener 1881 și notează lecturile minoritare.

TR este consultat obligatoriu pentru:

- versetele tradiționale absente din SBLGNT;
- adaosurile tradiționale din interiorul unui verset;
- pasajele lungi disputate;
- diferențele care afectează direct o afirmație doctrinară;
- diferențele de numerotare și amplasare.

Prezența unei lecturi în TR nu o introduce automat în textul principal. Absența ei din SBLGNT nu permite ascunderea ei. Lectura se păstrează vizibil, cu statut textual explicit, conform `NT-TEXTUAL-VARIANTS.md`.

### 2.4 WEBU

WEBU este domeniu public și poate fi folosit pentru:

- delimitarea inițială a versetelor și paragrafelor;
- detectarea unei propoziții uitate;
- verificarea preliminară a relațiilor sintactice;
- comparația cu o redare engleză independentă.

WEBU NU poate decide o ambiguitate grecească și NU justifică o formulare românească împotriva grecei. Strong-urile sau notele WEBU sunt indicii, nu analiză morfologică suficientă.

### 2.5 Etaloanele românești

Fiecare capitol TREBUIE triangulat cu:

1. Cornilescu 1924, din snapshotul fixat;
2. BTF, din snapshotul fixat;
3. NTR, consultată extern.

Reguli:

- minimum un etalon din familia Cornilescu este obligatoriu;
- textul NTR NU se stochează integral;
- coincidența cu un etalon nu dovedește corectitudinea;
- diferența față de un etalon nu dovedește eroarea;
- etaloanele NU pot scurta, extinde sau armoniza greaca;
- o formulare comună inevitabilă este permisă, dar copierea sistematică este blocantă;
- o lipsă cunoscută dintr-un snapshot TREBUIE declarată; nu poate fi completată prin invenție sau prin atribuirea falsă a textului unei surse.

## 3. Fixarea și trasabilitatea surselor

Pentru fiecare artefact folosit, `source-lock` TREBUIE să înregistreze:

- identificator unic și rol editorial;
- titlu, versiune, limbă și licență;
- URL HTTPS de proveniență;
- commit, când sursa este Git;
- SHA-256 al arhivei și al snapshotului;
- lista fișierelor și hashurile lor;
- data obținerii;
- diferențele de versificație cunoscute.

Auditul unui capitol TREBUIE să indice exact snapshotul și fișierele folosite. Schimbarea textului, aparatului, dicționarului, mapării sau a unei decizii editoriale invalidează digestul capitolului și cere refacerea auditului afectat.

## 4. Metoda de traducere

### 4.1 Fluxul obligatoriu

Pentru fiecare unitate semantică:

1. se fixează textul SBLGNT și intrările corespunzătoare din aparat;
2. se verifică morfologia, sintaxa și relația cu discursul imediat;
3. se verifică TR și, când este necesar, alte ediții critice citate în aparatul SBLGNT;
4. se redactează independent o primă versiune românească;
5. se confruntă redactarea cu WEBU pentru control auxiliar;
6. se verifică omisiunile și adaosurile la nivel de propoziție și verset;
7. se triangulează sensul cu cele trei etaloane românești;
8. se verifică româna, continuitatea și terminologia globală;
9. se justifică toate deciziile materiale și toate abaterile de la regulile implicite;
10. se închid variantele și notele blocante;
11. se recalculează auditul și digestul.

### 4.2 Principii de redactare

Textul TREBUIE să fie:

- complet, fără eliminarea repetițiilor, listelor, binecuvântărilor, avertismentelor sau expresiilor dificile;
- fidel sensului și forței discursului grecesc;
- românesc, nu o calchiere a ordinii engleze sau grecești;
- explicit când greaca este explicită și prudent când greaca este ambiguă;
- lipsit de explicații doctrinare introduse în corpul versetului;
- distinct de formularea sistematică a unei traduceri românești existente.

NU TREBUIE:

- armonizate în tăcere relatările paralele;
- transformate descrierile în porunci;
- atenuate cuvintele despre păcat, judecată, robie, moarte sau pocăință;
- adăugate diagnostice psihologice, medicale ori intenții absente din text;
- rezolvate prin majuscule, pronume sau parafrază ambiguități pe care greaca le păstrează;
- importată o doctrină în sensul lexical al unui singur cuvânt.

### 4.3 Unitatea de traducere

Versetul este unitatea de referință, nu întotdeauna unitatea completă de sens. Auditul TREBUIE să urmărească propoziția, paragraful, argumentul cărții și, pentru citate, contextul veterotestamentar. Împărțirea modernă în versete nu poate rupe o construcție grecească sau muta sensul dintr-un verset în altul.

## 5. Standardul limbii române

### 5.1 Ortografie și tipografie

- Fișierele sunt UTF-8, normalizate Unicode NFC.
- Se folosesc `ă`, `â`, `î`, `ș`, `ț`, niciodată formele cu sedilă `ş`, `ţ`.
- Ghilimelele de nivel întâi sunt `„…”`; în interior se folosesc `«…»`.
- Apostroful, cratima și liniuța se folosesc conform ortografiei românești, nu se copiază mecanic semnele din sursa engleză.
- Punctuația urmează sintaxa românească, păstrând relațiile logice ale grecei.
- Poezia, imnurile și citatele sunt segmentate după structură, fără a inventa paralelisme.

### 5.2 Registru

Româna este actuală, clară și reverentă. Arhaismele se păstrează numai când termenul biblic consacrat este încă inteligibil și mai exact decât alternativa modernă. Limbajul familiar, birocratic sau terapeutic nu înlocuiește forța textului.

Termenii tehnici pot apărea în note. Corpul versetului nu trebuie încărcat cu transliterări, paranteze exegetice sau sinonime succesive.

### 5.3 Majuscule teologice

- Numele și titlurile proprii se scriu cu majusculă: `Dumnezeu`, `Tatăl`, `Fiul`, `Duhul Sfânt`, `Domnul`.
- Pronumele referitoare la Dumnezeu pot fi scrise cu majusculă numai când referentul este neechivoc și regula este aplicată consecvent în aceeași unitate.
- O majusculă NU poate fi folosită pentru a decide un referent ambiguu.
- `DOMNUL` este rezervat convenției pentru tetragrama ebraică și pentru citatele VT în care relația dintre `κύριος` din LXX și `YHWH` a fost verificată și documentată.
- În celelalte contexte NT, `κύριος` divin se redă `Domnul`, nu automat `DOMNUL`.

## 6. Nume proprii și toponime

Forma stabilită TREBUIE păstrată în toate cele 27 de cărți. Orice excepție cere intrare în registrul onomastic.

| Greacă | Forma Biblia Emanus | Regula |
| --- | --- | --- |
| `Ἰησοῦς` | Isus | nu `Iisus`; cazul gramatical se exprimă românește |
| `Χριστός` | Hristos | titlu sau nume după context, fără înlocuirea cu `Mesia` în tăcere |
| `Ἰάκωβος` | Iacov | inclusiv numele cărții, nu `Iacob` sau `James` |
| `Ἰούδας` | Iuda | persoana se distinge de `iudeu` prin context |
| `Πέτρος` | Petru | nu se uniformizează cu `Chifa` |
| `Κηφᾶς` | Chifa | se păstrează când textul are forma aramaică |
| `Σαῦλος` | Saul | se păstrează până și oriunde textul folosește acest nume |
| `Παῦλος` | Pavel | nu se rescrie retroactiv ca Saul |
| `Μαριάμ`, `Μαρία` | Maria | diferența de formă grecească poate fi notată când este relevantă |
| `Ἰουνίαν` | Iunia | Romani 16:7 cere notă pentru variantele de accentuare și interpretare |
| `Ῥαάβ` | Rahav | aceeași formă în genealogii și referințe retrospective |
| `Ἱερουσαλήμ`, `Ἱεροσόλυμα` | Ierusalim | variantele grecești nu produc două nume românești |

Numele care nu apar în tabel se stabilesc după aceste reguli:

1. forma românească biblică inteligibilă este preferată unei transliterări opace;
2. două forme distincte în text nu se contopesc dacă diferența are rol narativ sau teologic;
3. o identificare istorică incertă nu este transformată în certitudine prin nume;
4. forma aleasă, alternativele și motivul se înscriu în registrul onomastic înainte de publicare.

## 7. Glosar grecesc normativ

Tabelul stabilește echivalentul implicit, nu o înlocuire automată. Contextul poate cere altă redare, dar abaterea materială TREBUIE justificată.

| Lemă | Redare implicită | Restricție editorială |
| --- | --- | --- |
| `θεός` | Dumnezeu / dumnezeu | majuscula depinde de referent, nu doar de formă |
| `κύριος` | Domnul / domn / stăpân | se verifică referentul și relația cu `YHWH` în citatele VT |
| `Χριστός` | Hristos | `Mesia` numai când contextul cere explicarea titlului |
| `πνεῦμα` | Duh / duh / suflare / vânt | nu se decide automat persoana Duhului Sfânt |
| `δοῦλος` | rob | `slujitor` numai cu motiv contextual; nu se atenuează robia în tăcere |
| `διάκονος` | slujitor / diacon | funcția instituțională trebuie demonstrată de context |
| `σάρξ` | carne | nu se adaugă `păcătoasă`; sensul metonimic se explică dacă este necesar |
| `σῶμα` | trup | nu se confundă automat cu `σάρξ` |
| `ψυχή` | viață / suflet / persoană | nu presupune automat o antropologie a sufletului nemuritor |
| `δικαιοσύνη` | dreptate | `neprihănire` numai când registrul și contextul o cer |
| `δικαιόω` | a îndreptăți / a declara drept | alegerea juridică sau demonstrativă se justifică din context |
| `πίστις` | credință / credincioșie | genitivul și referentul se analizează, nu se decid confesional |
| `πιστεύω` | a crede / a se încrede | complementul și construcția grecească trebuie păstrate |
| `χάρις` | har | `favoare` sau `mulțumire` numai după funcția din context |
| `ἀγάπη` | dragoste | nu se înlocuiește cu o definiție doctrinară în verset |
| `ἐκκλησία` | biserică / adunare | nu desemnează automat o clădire sau o denominație |
| `εὐαγγέλιον` | Evanghelie / vestea bună | majuscula depinde de folosirea ca nume sau conținut |
| `μετάνοια`, `μετανοέω` | pocăință / a se pocăi | nu se reduce la regret sau emoție |
| `ἁμαρτία` | păcat | nu se neutralizează prin `greșeală` fără motiv lexical |
| `πορνεία` | imoralitate sexuală | termenul nu se generalizează la orice lipsă morală |
| `ἅγιος`, `ἁγιασμός` | sfânt / sfințire | sensul cultic, moral sau identitar se stabilește contextual |
| `νόμος` | Lege / lege | se distinge Torah, o poruncă, un principiu sau o normă civilă |
| `διαθήκη` | legământ | `testament` numai când argumentul juridic o cere explicit |
| `βάπτισμα`, `βαπτίζω` | botez / a boteza | modul nu se introduce lexical dacă pasajul nu îl precizează |
| `μονογενής` | unic / singurul | nu se traduce mecanic `singurul născut` |
| `παράκλητος` | Apărător | `Mângâietor`, `Ajutor` și `Avocat` se păstrează ca alternative explicate |
| `ἱλαστήριον` | mijloc/loc al ispășirii | Romani 3:25 cere o decizie proprie și notă, nu o formulă automată |
| `ἀδελφοί` | frați | includerea femeilor poate fi explicată; `frați și surori` cere context clar |
| `πρεσβύτερος` | prezbiter / bătrân | rolul comunitar și sensul de vârstă se disting |
| `ἐπίσκοπος` | supraveghetor / episcop | forma confesională nu se impune fără analiză istorică și contextuală |
| `ᾅδης` | Locuința morților | nu se confundă automat cu `γέεννα` |
| `γέεννα` | Gheena | se explică separat de `ᾅδης` și de lacul de foc |
| `αἰών`, `αἰώνιος` | veac / veșnic | durata și registrul se justifică din construcție și context |

## 8. Morfologie, sintaxă și discurs

Auditul din greacă TREBUIE să verifice cel puțin:

- lema și forma morfologică a termenilor care poartă decizia;
- subiectul explicit sau implicit și antecedentul pronumelor;
- valoarea genitivului, când alternativele schimbă sensul;
- aspectul verbal, fără echivalarea mecanică a aoristului cu un singur timp românesc;
- participiile și relația lor logică;
- negațiile simple și întărite;
- condițiile, scopul, cauza, consecința și contrastul;
- articolul grecesc, fără transformarea prezenței sau absenței lui într-o regulă doctrinară automată;
- ordinea marcată a cuvintelor, fără calchierea ei când româna ar deveni artificială;
- legăturile cu paragraful, argumentul și genul literar.

Când două analize sunt plauzibile și textul nu decide, traducerea AR TREBUI să păstreze ambiguitatea. Dacă româna obligă la alegere, alternativa se păstrează în notă cu motivul deciziei.

## 9. Citatele din Vechiul Testament și relația cu LXX

Pentru fiecare citat explicit sau formulă compozită, auditul TREBUIE să înregistreze:

- pasajul NT;
- sursa VT propusă;
- forma grecească din SBLGNT;
- forma Septuagintei fixate pentru proiect;
- forma ebraică relevantă din WLC, când există;
- dacă citatul este exact, adaptat, compozit sau aluziv;
- diferențele care afectează sensul;
- dacă `κύριος` din LXX corespunde lui `YHWH`;
- modul în care autorul NT aplică pasajul.

Textul principal traduce forma folosită de autorul NT. NU TREBUIE înlocuită în tăcere cu formularea VT, cu Cornilescu sau cu o armonizare între LXX și textul masoretic.

Un citat compozit păstrează toate sursele identificate. O diferență între LXX și WLC nu este numită automat eroare și nu este eliminată. Când autorul NT atribuie lui Isus un pasaj în care LXX folosește `κύριος` pentru `YHWH`, relația este documentată, nu ascunsă și nici extinsă dincolo de pasaj.

## 10. Variante textuale și versificație

Registrul normativ este `NT-TEXTUAL-VARIANTS.md`. Următoarele reguli sunt obligatorii:

- fiecare intrare relevantă din aparatul SBLGNT este acoperită de audit;
- variantele cu efect semantic, doctrinar, narativ sau de numerotare primesc decizie individuală;
- variantele pur ortografice pot fi grupate, dar acoperirea lor trebuie demonstrată;
- pasajele între paranteze duble din SBLGNT se traduc și se afișează cu statut vizibil;
- versetele tradiționale absente din SBLGNT nu sunt inventate ca text critic principal, dar numărul și lectura TR rămân accesibile și etichetate;
- aceeași propoziție nu poate apărea de două ori pentru a satisface două sisteme de numerotare;
- referința SBLGNT și aliasul tradițional se stochează separat;
- o lectură nerezolvată blochează capitolul și cartea.

## 11. Auditul editorial obligatoriu

### 11.1 Dovada unei decizii

Orice decizie materială TREBUIE să conțină:

- un ID stabil;
- carte, capitol, verset și, când este necesar, segment;
- textul sau lema grecească relevantă;
- lectura SBLGNT și referința din aparat;
- lectura TR, dacă diferă;
- opțiunile românești reale;
- alegerea Biblia Emanus;
- motiv lexical, sintactic și contextual;
- efectul teologic posibil, descris fără a-l folosi drept scurtătură lexicală;
- sursele consultate;
- starea `resolved` sau `unresolved`;
- digestul textului și al surselor auditate.

Formule precum `sună mai bine`, `este mai biblic`, `așa se traduce de obicei` sau `toate verificările au trecut` NU sunt justificări suficiente.

### 11.2 Ce poate valida determinist motorul

Motorul POATE valida:

- identitatea, hashul, licența și inventarul surselor fixate;
- existența exactă a celor 27 de cărți și 260 de capitole;
- acoperirea referințelor din maparea fixată;
- lipsa duplicatelor și a golurilor neexplicate;
- corespondența dintre referințele SBLGNT și aliasurile tradiționale declarate;
- existența aparatului pentru pasajele marcate;
- existența celor trei etaloane și modul lor permis de utilizare;
- formatul UTF-8/NFC, diacriticele și delimitarea ghilimelelor;
- existența și starea tuturor notelor și deciziilor obligatorii;
- consistența identificatorilor, a numelor și a termenilor controlați;
- praguri de lungime, similaritate și convergență ca semnale de risc;
- faptul că digestul corespunde textului, notelor și surselor curente;
- faptul că nu există o decizie declarată `unresolved`.

### 11.3 Ce nu poate valida determinist motorul

Motorul NU POATE demonstra singur:

- că SBLGNT sau TR reproduce exact autograful;
- că alegerea dintre două variante este sigură istoric;
- că o propoziție românească redă complet sensul grecesc;
- că o interpretare este adevărată teologic sau acceptată de toate confesiunile;
- că o ambiguitate a fost rezolvată corect;
- că o asemănare lexicală este sau nu încălcare juridică;
- că un text este pastoral adecvat în toate situațiile;
- că trecerea unui prag statistic înseamnă fidelitate.

Aceste aspecte cer justificare editorială în audit. Politica repository-ului nu impune o aprobare umană separată, dar nu permite înlocuirea argumentului editorial cu un rezultat boolean al scriptului.

### 11.4 Regula fără aprobare umană obligatorie

`humanApprovalRequired: false` rămâne regula proiectului. Ea înseamnă că un capitol poate fi publicat după audit editorial AI complet și verificări deterministe, nu că poate fi publicat fără raționament verificabil.

Oricare dintre următoarele stări este blocantă:

- sursă sau licență nefixată;
- referință grecească lipsă;
- variantă materială fără decizie;
- notă `reviewRequired` nerezolvată;
- omisiune sau adaos neexplicat;
- contradicție între text și motivarea deciziei;
- etalon lipsă sau folosit în alt mod decât `comparison-only`;
- digest învechit;
- abatere de la glosar sau onomastică fără justificare;
- afirmație doctrinară introdusă în traducere fără suport lexical și sintactic.

## 12. Definiția stării `published`

### 12.1 Capitol

Un capitol este gata de publicare numai dacă:

- toate versetele și segmentele din mapare sunt acoperite;
- fiecare propoziție a fost verificată în greacă;
- toate intrările materiale din aparat sunt rezolvate;
- toate citatele VT sunt mapate;
- toate controalele de română, omisiuni, adaosuri și copyright sunt `approved`;
- toate deciziile sunt urmărite și `resolved`;
- digestul textului, notelor și surselor este actual;
- `status` este `published` și `public` este `true` numai după trecerea porții.

### 12.2 Carte

O carte este gata numai dacă toate capitolele ei sunt gata și au fost executate verificările transversale pentru:

- vocabular și nume;
- continuitatea argumentului;
- citate repetate;
- variante care apar în mai multe capitole;
- introducere, titlu și metadate;
- totaluri de capitole și referințe.

### 12.3 Noul Testament

Noul Testament este gata numai dacă:

- toate cele 27 de cărți și 260 de capitole sunt publicate împreună;
- registrul variantelor nu conține nicio intrare nerezolvată;
- terminologia și onomastica au trecut verificarea globală;
- toate citatele VT/LXX au referințe valide;
- toate atribuirile și licențele sunt incluse în produs;
- buildul, testele și poarta Biblia Emanus trec pe commitul care urmează să fie publicat.

## 13. Atribuire și licențiere

Biblia Emanus este pregătită pentru publicare sub `CC BY 4.0`. Atribuirea TREBUIE să includă cel puțin:

- proiectul Biblia Emanus pentru contribuția românească;
- Society of Biblical Literature și Logos Bible Software pentru SBLGNT, conform `CC BY 4.0`;
- identificarea ediției și commitului SBLGNT;
- identificarea celorlalte surse conform licențelor lor;
- mențiunea că etaloanele românești au fost folosite numai comparativ.

Publicarea NU TREBUIE să sugereze că SBL, Logos, editorii TR, WEBU sau editorii traducerilor românești aprobă traducerea Biblia Emanus.
