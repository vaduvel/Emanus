# Registrul variantelor textuale NT — Biblia Emanus

Statut: **normativ**

Versiune: `1.0`

Text critic de bază: SBLGNT 1.2, commit `c4d241a9c1c479a55b989ba35a4976c1d0b8052c`

## 1. Scop

Acest registru stabilește cum sunt tratate diferențele dintre SBLGNT, aparatul său, Textus Receptus și numerotarea tradițională. El nu reproduce un aparat critic complet și nu declară că o ediție modernă este identică autografului.

Obiectivele sunt:

- să nu dispară nicio propoziție din cauza unei diferențe de versificație;
- să nu intre în textul critic principal o lectură tradițională fără etichetă;
- să nu fie ascunsă incertitudinea manuscrisă;
- să nu fie duplicat același text sub două numere;
- să existe o decizie urmărită pentru fiecare variantă materială;
- să fie blocată publicarea cât timp o decizie este nerezolvată.

## 2. Surse și terminologie

- **SBL**: lectura din textul principal SBLGNT 1.2.
- **Aparat SBL**: variantele înregistrate în aparatul SBLGNT 1.2.
- **TR**: snapshotul public-domain Textus Receptus fixat în `source-lock`.
- **Lectură tradițională**: lectură cunoscută din TR și din numerotarea istorică românească, dar absentă sau diferită în SBL.
- **Text principal**: traducerea românească a lecturii editoriale adoptate.
- **Notă textuală**: explicație vizibilă care păstrează alternativa, dovezile și statutul.
- **Referință-sursă**: cartea, capitolul și versetul în SBLGNT.
- **Alias tradițional**: referința folosită de traducerile cu altă segmentare.

SBLGNT este baza critică, dar nu este imun la revizie. TR este martor suplimentar, nu arbitru automat. WEBU și traducerile românești pot semnala o problemă, dar nu pot decide lectura grecească.

## 3. Clase de variante

| Clasă | Descriere | Tratament minim |
| --- | --- | --- |
| `A` | pasaj lung disputat sau bloc extins | text vizibil, marcaj înaintea pasajului, notă și decizie individuală |
| `B` | verset tradițional complet absent din SBL | număr/alias păstrat, lectura TR vizibilă ca tradițională, nu ca SBL |
| `C` | variantă materială în interiorul unui verset | text principal plus notă cu alternativa și efectul semantic |
| `D` | diferență de amplasare, împărțire sau numerotare | mapare fără pierdere și fără duplicare |
| `E` | variantă ortografică sau fără efect traductologic | poate fi auditată grupat, cu acoperire demonstrată |

O variantă poate avea mai multe clase. Clasa mai severă stabilește cerința de afișare.

## 4. Schema obligatorie a unei decizii

Fiecare variantă materială TREBUIE să aibă o înregistrare echivalentă semantic cu:

```json
{
  "id": "NT-ROM-16-24-27",
  "passage": "Romani 16:24-27",
  "classes": ["C", "D"],
  "sblgnt": {
    "version": "1.2",
    "commit": "c4d241a9c1c479a55b989ba35a4976c1d0b8052c",
    "mainTextStatus": "documented",
    "apparatusReference": "Rom 16:24"
  },
  "tr": {
    "lockId": "pinned-source-id",
    "readingStatus": "documented"
  },
  "decision": "descrierea exactă a lecturii adoptate",
  "display": "main|marked-main|traditional-note|alias",
  "rationale": "motiv lexical, textual și contextual",
  "evidence": ["source references"],
  "state": "resolved"
}
```

Reguli:

- `id` rămâne stabil după publicare;
- nu se stochează doar concluzia, ci și alternativele reale;
- `rationale` nu poate fi un simplu scor sau verdict automat;
- `state: unresolved` blochează capitolul, cartea și publicarea NT;
- schimbarea textului, sursei sau deciziei invalidează digestul;
- o lectură absentă din SBL nu poate purta eticheta `SBL main`.

## 5. Regula de afișare

Cititorul trebuie să poată distinge fără cunoștințe tehnice:

1. textul principal adoptat;
2. un pasaj prezent, dar disputat textual;
3. o lectură tradițională absentă din baza critică;
4. o diferență exclusivă de numerotare.

Marcajul nu trebuie să sugereze că pasajul este lipsit de valoare spirituală și nici că statutul lui textual este sigur. Nota trebuie să fie neutră, precisă și accesibilă.

Pentru aceeași propoziție pot exista mai multe referințe, dar un singur corp de text. Căutarea, salvarea și distribuirea unui alias trebuie să conducă la unitatea canonică, nu la o copie.

## 6. Pasaje extinse disputate

### 6.1 Marcu 16:9-20 — finalul lung

ID: `NT-MRK-16-09-20`

Clasă: `A`

Fapte stabilite pentru ediția de bază:

- SBLGNT 1.2 păstrează Marcu 16:9-20 între paranteze duble;
- după Marcu 16:8, SBLGNT păstrează și finalul scurt ca lectură alternativă, tot marcată;
- tradiția manuscrisă conține mai multe finaluri și combinații.

Decizia Biblia Emanus:

- Marcu 16:9-20 se traduce integral și se afișează în fluxul capitolului;
- înainte de versetul 9 apare un marcaj textual vizibil;
- nota explică pe scurt că cele mai vechi mărturii importante nu conțin finalul lung și că alte mărturii îl păstrează;
- finalul scurt este tradus în nota textuală, nu introdus ca verset principal fără număr;
- formulările din pasaj nu sunt armonizate cu Matei, Luca, Ioan sau Fapte;
- auditul nu poate declara autenticitatea pasajului ca certitudine demonstrată automat.

Orice ediție care ascunde marcajul sau elimină pasajul fără notă este neconformă.

### 6.2 Ioan 7:53-8:11 — femeia prinsă în adulter

ID: `NT-JHN-07-53-08-11`

Clasă: `A`, `D`

Fapte stabilite pentru ediția de bază:

- pasajul este inclus în SBLGNT 1.2 între paranteze duble;
- versiunea 1.2 a adăugat pasajul în distribuția SBLGNT;
- tradiția manuscrisă îl omite sau îl amplasează în poziții diferite.

Decizia Biblia Emanus:

- pasajul se traduce integral și se afișează la Ioan 7:53-8:11;
- marcajul începe înainte de Ioan 7:53 și se încheie după Ioan 8:11;
- nota precizează statutul și variația de amplasare;
- formulările secundare din unele manuscrise nu se amestecă într-un text compozit;
- pasajul nu este folosit drept dovadă că SBLGNT îl consideră nedisputat.

### 6.3 Luca 22:43-44 — îngerul și sudoarea

ID: `NT-LUK-22-43-44`

Clasă: `C`

SBLGNT marchează unitatea ca disputată. Biblia Emanus o traduce și o afișează, cu notă textuală înaintea unității. Comparația dintre `ca niște picături/cheaguri de sânge` și o afirmație medicală literală trebuie păstrată la nivelul sintaxei grecești; traducerea nu introduce un diagnostic medical.

## 7. Versete tradiționale absente din SBLGNT

Următoarele 15 numere tradiționale nu au verset principal corespunzător în SBLGNT 1.2:

| Carte | Versete |
| --- | --- |
| Matei | 17:21; 18:11; 23:14 |
| Marcu | 7:16; 9:44; 9:46; 11:26; 15:28 |
| Luca | 17:36; 23:17 |
| Ioan | 5:4 |
| Fapte | 8:37; 15:34; 24:7; 28:29 |

Pentru fiecare:

- numărul tradițional rămâne căutabil;
- lectura grecească TR și o traducere românească independentă se păstrează într-o notă cu statut `traditional-reading`;
- nota identifică exact snapshotul TR;
- lectura nu este numărată ca verset principal SBL;
- versetul nu apare ca șir gol și nu este copiat dintr-o traducere românească;
- nota spune `absent din textul principal SBLGNT`, nu `scos din Biblie`;
- pasajul paralel probabil nu este prezentat automat drept sursa copierii scribale fără justificare.

La Ioan 5, auditul verifică separat și extensia tradițională din 5:3 despre așteptarea mișcării apei; ea nu trebuie ascunsă doar pentru că numărul principal disputat este 5:4.

## 8. Adaosuri tradiționale materiale în interiorul versetelor

Lista de mai jos este un registru minim, nu exhaustiv. Toate intrările materiale din aparatul SBLGNT rămân obligatorii.

| ID | Pasaj | Diferență care trebuie documentată |
| --- | --- | --- |
| `NT-MAT-06-13B` | Matei 6:13 | doxologia Rugăciunii Domnești din tradiția receptă |
| `NT-MAT-24-36` | Matei 24:36 | prezența sau absența expresiei despre Fiul |
| `NT-MRK-01-01` | Marcu 1:1 | prezența expresiei `Fiul lui Dumnezeu` |
| `NT-MRK-09-29` | Marcu 9:29 | `rugăciune` sau `rugăciune și post` |
| `NT-LUK-02-14` | Luca 2:14 | forma care produce `bunăvoință` sau `oamenii bunăvoinței` |
| `NT-LUK-23-34A` | Luca 23:34 | rugăciunea `Tată, iartă-i...` |
| `NT-JHN-01-18` | Ioan 1:18 | `Dumnezeu, Cel unic` și lectura `Fiul unic` |
| `NT-ACT-20-28` | Fapte 20:28 | `biserica lui Dumnezeu/Domnului` și construcția despre sânge |
| `NT-1TI-03-16` | 1 Timotei 3:16 | `Cel ce` și lectura TR `Dumnezeu` |
| `NT-JUD-01-05` | Iuda 5 | `Isus`, `Domnul` sau `Dumnezeu` ca subiect al izbăvirii |
| `NT-1JN-05-07-08` | 1 Ioan 5:7-8 | Comma Johanneum din tradiția receptă |
| `NT-REV-22-14` | Apocalipsa 22:14 | `își spală hainele` sau `împlinesc poruncile` |
| `NT-REV-22-19` | Apocalipsa 22:19 | `pomul vieții` sau `cartea vieții` |

Regula de bază este lectura SBLGNT. Dacă Biblia Emanus adoptă altă lectură, abaterea trebuie justificată individual și nu poate fi produsă prin simpla majoritate a etaloanelor românești.

Pentru `NT-1JN-05-07-08`, Comma Johanneum se păstrează vizibil în nota tradițională și NU intră în textul principal fără o decizie critică explicită. Importanța doctrinară nu înlocuiește analiza textuală.

## 9. Romani 16:24-27

ID: `NT-ROM-16-24-27`

Clasă: `C`, `D`

Problema:

- fișierul textual SBLGNT 1.2 se încheie la Romani 16:24 cu formula de har prezentă în tradiția receptă;
- aparatul SBL arată că formula din 16:24 lipsește din WH, Tregelles și NA28, dar apare în RP;
- același aparat păstrează doxologia critică numerotată 16:25-27;
- tradiția manuscrisă amplasează doxologia după capitolul 14, după capitolul 15, la finalul capitolului 16, în mai multe poziții sau o omite.

Decizia Biblia Emanus:

1. doxologia se păstrează integral ca Romani 16:25-27 în textul principal;
2. greaca doxologiei se ia din intrarea fixată a aparatului SBL și este auditată ca sursă, nu reconstituită dintr-o traducere;
3. formula de har din 16:24 rămâne vizibilă ca lectură tradițională TR, marcată textual;
4. celelalte amplasări sunt documentate în notă, fără duplicarea doxologiei la capitolul 14 sau 15;
5. parserul nu poate declara capitolul complet dacă a citit doar fișierul plat SBL și a omis 16:25-27;
6. auditul verifică separat conținutul, amplasarea și numerotarea.

Aceasta este o excepție obligatorie de ingestie. Nu este permisă scurtarea binecuvântării/doxologiei din cauza structurii fișierului sursă.

## 10. Fapte 19:40-41

ID: `NT-ACT-19-40-41`

Clasă: `D`

SBLGNT include în 19:40 atât motivul juridic al riscului de acuzație, cât și propoziția finală despre eliberarea adunării. Unele sisteme tradiționale separă ultima propoziție ca 19:41.

Decizia Biblia Emanus:

- unitatea canonică urmează referința SBL `Fapte 19:40`;
- `Fapte 19:41` este alias tradițional către propoziția finală;
- textul propoziției apare o singură dată;
- căutarea după oricare referință o găsește;
- auditul de acoperire acceptă diferența numai dacă maparea declarată este prezentă și exactă.

## 11. 2 Corinteni 13:12-14

ID: `NT-2CO-13-12-14`

Clasă: `D`

Maparea SBLGNT este:

- 13:12: sărutarea sfântă și salutul tuturor sfinților;
- 13:13: binecuvântarea trinitară.

Numerotarea tradițională des întâlnită este:

- 13:12: sărutarea sfântă;
- 13:13: salutul tuturor sfinților;
- 13:14: binecuvântarea.

Decizia Biblia Emanus:

- referința-sursă rămâne SBL 13:12-13;
- segmentele primesc aliasurile tradiționale 13:12-14;
- binecuvântarea este păstrată integral;
- segmentarea nu poate elimina, concatena greșit sau duplica salutul;
- distribuirea unei referințe tradiționale conduce la segmentul exact.

## 12. 3 Ioan 14-15

ID: `NT-3JN-01-14-15`

Clasă: `D`

SBLGNT are 15 versete:

- versetul 14 conține speranța întâlnirii și a vorbirii față în față;
- versetul 15 conține pacea și saluturile finale.

Unele traduceri tradiționale reunesc ambele segmente în versetul 14.

Decizia Biblia Emanus:

- unitățile-sursă SBL 14 și 15 rămân distincte;
- referința tradițională 14 poate funcționa ca alias de interval pentru 14-15;
- textul finalului apare integral o singură dată;
- numărul 15 nu este eliminat din sursa critică pentru a imita etaloanele.

## 13. Apocalipsa 12:18 și 13:1

ID: `NT-REV-12-18-13-01`

Clasă: `C`, `D`

SBLGNT are Apocalipsa 12:18: `καὶ ἐστάθη ἐπὶ τὴν ἄμμον τῆς θαλάσσης` și începe 13:1 cu viziunea fiarei. Aparatul înregistrează:

- `ἐστάθη`: `el a stat/s-a așezat`, lectura SBL, WH, Tregelles și NA28;
- `ἐστάθην`: `am stat/m-am așezat`, lectura RP/TR.

În unele numerotări tradiționale, propoziția este atașată începutului din 13:1.

Decizia Biblia Emanus:

- textul principal urmează SBL: subiectul este dragonul și referința este 12:18;
- lectura la persoana întâi se păstrează în nota textuală;
- referința tradițională `Apocalipsa 13:1a` devine alias către 12:18;
- partea despre fiara care se ridică din mare rămâne `Apocalipsa 13:1`;
- propoziția nu este dublată la granița capitolelor;
- nota explică faptul că schimbarea unei singure litere schimbă persoana verbului și continuitatea narativă.

## 14. Alte diferențe de versificație

Registrul de mai sus nu autorizează presupunerea că acestea sunt singurele diferențe. Înainte de publicarea fiecărei cărți, motorul și auditul editorial TREBUIE să compare lista exactă de referințe pentru:

- SBLGNT 1.2;
- TR fixat;
- WEBU fixat;
- Cornilescu 1924 fixat;
- BTF fixat.

Orice referință lipsă, suplimentară, reunită sau împărțită produce o intrare de clasa `B` sau `D`. O listă de excepții derivată dintr-o altă ediție nu poate fi refolosită fără verificare pe snapshoturile curente.

## 15. Acoperirea aparatului

Fiecare capitol TREBUIE să declare:

- numărul intrărilor de aparat aferente;
- ID-urile variantelor materiale;
- numărul variantelor de clasa `E` auditate grupat;
- zero intrări materiale nerezolvate;
- digestul aparatului și al deciziilor.

O bifă globală `apparatusReviewed: true` fără număr, ID-uri și digest nu este suficientă.

Auditul automat poate confirma că toate intrările au o stare și că digestul corespunde. El nu poate decide prin numărare care lectură este cea mai veche sau care interpretare teologică este adevărată.

## 16. Criterii de blocare

Publicarea este blocată dacă:

- un pasaj de clasa `A` nu are marcaj vizibil;
- un verset de clasa `B` nu are lectură tradițională și proveniență;
- o variantă de clasa `C` nu are efectul semantic explicat;
- o mapare de clasa `D` pierde sau dublează text;
- aparatul conține o unitate materială fără ID;
- decizia invocă doar o traducere românească;
- lectura declarată nu corespunde snapshotului;
- nota afirmă mai mult decât permit dovezile;
- starea este diferită de `resolved`;
- digestul nu mai corespunde textului și surselor.

## 17. Formularea notelor pentru cititor

Notele AR TREBUI să folosească formulări de tipul:

- `Unele manuscrise păstrează și lectura...`;
- `Textul principal SBLGNT nu include acest verset; lectura tradițională este...`;
- `Alte mărturii amplasează această doxologie după...`;
- `Numerotarea diferă; textul apare integral la...`.

Notele NU TREBUIE să spună fără dovadă:

- `verset scos din Biblie`;
- `text corupt intenționat`;
- `SBLGNT este originalul demonstrat`;
- `TR este întotdeauna forma inspirată`;
- `majoritatea traducerilor dovedește lectura`;
- `CI a aprobat teologia pasajului`.

Transparența textuală protejează integritatea textului și încrederea cititorului mai bine decât certitudinea artificială.
