# VT explicat — ultimul review capitol cu capitol

Data: 2026-08-08

## Verdict editorial

**929 / 929 capitole VT intră în review-ul final al stratului explicativ.**

Acest review privește explicațiile, nu traducerea Biblia Emanus.

Regula sursei este obligatorie:

1. unde Zac Poonen / CFC `Through The Bible` dezvoltă pasajul, explicația Emanus păstrează învățătura, doctrina, tipologia și aplicația lui; un review ulterior nu are voie să o dilueze, relativizeze sau înlocuiască prin `canonical-exegesis`;
2. `canonical-exegesis` și explicația generală sunt permise numai pentru puncte/pasaje pe care sursa nu le dezvoltă;
3. `textual-overview` umple numai goluri de acoperire și nu primește doctrină, aplicație pastorală sau lexic inventat;
4. provenance-ul rămâne intern; cititorul primește explicația direct, fără numele sursei moderne;
5. textul biblic nu este modificat de acest review.

## Matricea canonică

| # | Carte | Capitole | Mod | Verdict explicație |
|---:|---|---:|---|---|
| 1 | Geneza | 50 | legacy-full | reviewed |
| 2 | Exod | 40 | legacy-full | reviewed |
| 3 | Levitic | 27 | legacy-full | reviewed |
| 4 | Numeri | 36 | legacy-full | reviewed |
| 5 | Deuteronom | 34 | legacy-full | reviewed |
| 6 | Iosua | 24 | legacy-full | reviewed |
| 7 | Judecători | 21 | full-overlay | reviewed |
| 8 | Rut | 4 | legacy-full | reviewed |
| 9 | 1 Samuel | 31 | legacy-full | reviewed |
| 10 | 2 Samuel | 24 | legacy-full | reviewed |
| 11 | 1 Împărați | 22 | legacy-full | reviewed |
| 12 | 2 Împărați | 25 | full-overlay | reviewed |
| 13 | 1 Cronici | 29 | full-overlay | reviewed |
| 14 | 2 Cronici | 36 | full-overlay | reviewed |
| 15 | Ezra | 10 | full-overlay | reviewed |
| 16 | Neemia | 13 | full-overlay | reviewed |
| 17 | Estera | 10 | full-overlay | reviewed |
| 18 | Iov | 42 | full-overlay | reviewed |
| 19 | Psalmi | 150 | full-overlay | reviewed |
| 20 | Proverbe | 31 | full-overlay | reviewed |
| 21 | Eclesiastul | 12 | full-overlay | reviewed |
| 22 | Cântarea Cântărilor | 8 | full-overlay | reviewed |
| 23 | Isaia | 66 | full-overlay | reviewed |
| 24 | Ieremia | 52 | full-overlay | reviewed |
| 25 | Plângerile | 5 | full-overlay | reviewed |
| 26 | Ezechiel | 48 | full-overlay | reviewed |
| 27 | Daniel | 12 | full-overlay | reviewed |
| 28 | Osea | 14 | full-overlay | reviewed |
| 29 | Ioel | 3 | full-overlay | reviewed |
| 30 | Amos | 9 | full-overlay | reviewed |
| 31 | Obadia | 1 | full-overlay | reviewed |
| 32 | Iona | 4 | full-overlay | reviewed |
| 33 | Mica | 7 | full-overlay | reviewed |
| 34 | Naum | 3 | full-overlay | reviewed |
| 35 | Habacuc | 3 | full-overlay | reviewed |
| 36 | Țefania | 3 | full-overlay | reviewed |
| 37 | Hagai | 2 | full-overlay | reviewed |
| 38 | Zaharia | 14 | full-overlay | reviewed |
| 39 | Maleahi | 4 | full-overlay | reviewed |

Total: **39 cărți, 929 capitole = 292 legacy + 637 overlay**.

## Ce a verificat trecerea capitol-cu-capitol

Pentru fiecare capitol final, gate-ul `check:vt-chapter-review` parcurge efectiv capitolul și cere:

- număr canonic continuu;
- titlu și rezumat explicativ nenule;
- cel puțin o unitate explicativă;
- `teaching` nenul în fiecare unitate;
- provenance valid;
- `explanationKind` valid;
- pentru overlay, intervale de versete continue, fără goluri/suprapuneri;
- pentru `textual-overview`, lipsa aplicației pastorale și a studiului lexical inventat;
- pentru `canonical-exegesis`, surse interne explicite;
- pentru notele ebraice, WLC-OSHB;
- exact 10 cărți legacy / 292 capitole și 29 overlay / 637 capitole;
- exact 39 cărți și 929 capitole în total.

Acest gate completează review-ul semantic: nu decide doctrină prin regex, ci împiedică un capitol gol, incomplet sau cu provenance rupt să treacă drept „reviewed”.

## Re-audit de fidelitate față de Poonen

Ultima trecere a descoperit că unele review-uri editoriale ulterioare păstrau sursa în metadata, dar îi diluau concluzia în copy. Aceste suprascrieri au fost retrase/restaurate.

Zone restaurate explicit după transcript:

- Judecători 4 — Debora și disponibilitatea unei femei când nu este găsit un bărbat pentru nevoie;
- Estera 1, 2, 8 — lipsa Numelui lui Dumnezeu, compromisul din Persia și grija lui Dumnezeu pentru oamenii Lui;
- Iov 29, 31, 42 — mândria spirituală/autojustificarea, ajungerea la zero și rugăciunea pentru persecutori înaintea binecuvântării duble;
- Psalmii 32, 51, 69, 73, 74, 103, 105 — acoperire vs. curățire, frica lui David de pierderea Duhului, inima frântă la Cruce, îndoielile, lipsa profetului, beneficiile Vechiului Legământ și «nu vorbi rău»;
- Proverbe 3, 22, 23, 31 — rațiunea sub Duhul Sfânt, disciplina copilului, vinul de la Cana și criteriul soției evlavioase;
- Cântarea Cântărilor 1, 2, 4, 5, 8 — sexualitate și iubire, Hristos–Biserică, timpul trezirii iubirii, vulpile mici, locurile cerești, vânturile, străjerii legaliști și iubirea matură;
- Isaia 7, 10, 11, 14 — nașterea din fecioară, Asiria ca tip al Antihristului, ungerea, lucrarea în șapte aspecte a Duhului, Mileniul și Lucifer/cele cinci «eu voi»;
- Ieremia 23, 29, 31 — profetul care ascultă, focul/ciocanul, Babilon–Ierusalim/biserica adevărată și iubirea veșnică;
- Ezechiel 14, 16, 28, 36, 43, 47, 48 — amăgirea, rădăcinile Sodomei, Satan/Edenul dintâi, Noul Legământ, sfințenia absolută, plinătatea Duhului și YHWH Shammah;
- Daniel 2, 3, 4, 6, 7, 9, 10, 12 — imperiile și zece regate, cuptorul/frânghiile, Babilonul și Nebucadnețar/Solomon, fereastra deschisă, Antihristul, 483 + 7 ani, poziția post-Calvar și cele două învieri;
- 1 Samuel 16, 28 — pierderea ungerii, gelozia, duhul rău și degenerarea până la medium;
- 2 Samuel 24 — recensământul ca încredere în numere/puterea armatei și «nu voi aduce ceva care nu mă costă nimic».

În aceste locuri, stratul final de fidelitate rulează **după** review-urile editoriale mai vechi.

## Gate anti-regresie

`check:vt-poonen-fidelity` verifică rezultatul final, după toate transformările.

Pentru capitolele sensibile cere simultan:

- existența unei unități finale `exposition` cu `source.kind = poonen`;
- existența în `teaching` a afirmațiilor distinctive din sursă;
- pentru unitățile legacy restaurate, `explanationSource` Poonen + afirmațiile distinctive.

Prin urmare nu mai este suficient să păstrăm numele sursei în metadata în timp ce textul îi schimbă doctrina.

## Cazuri în care completarea generală rămâne permisă

Au fost verificate explicit cazuri precum:

- 1 Împărați 22 — sursa menționează profeții falși/Mica, dar nu dezvoltă mecanica «duhului de minciună»; explicația canonică a acelui punct poate rămâne;
- Numeri 31 — sursa dezvoltă Balaam/Fineas și sabia Vechiului vs. Noului Legământ, dar nu dezvoltă toate detaliile despre captive; completarea textuală rămâne;
- Deuteronom 22 — cazurile juridice/sexuale nu sunt dezvoltate material în transcriptul folosit; explicația generală rămâne;
- Isaia 45:7 — sursa nu dezvoltă lexical `ra`; nota lexicală verificată poate rămâne;
- pasaje fără expunere doctrinară — `textual-overview` rămâne fallback conservator.

Aceste completări nu au voie să fie folosite pentru a contrazice o explicație Poonen existentă în altă unitate a aceluiași pasaj.

## Separarea de traducere

Nimic din acest review nu declară textul Biblia Emanus terminat.

Explicația poate fi `published` editorial, în timp ce reader-ul ține capitolul `in_review` dacă textul biblic asociat este încă `temporary-editorial`. Înlocuirea ulterioară cu Biblia Emanus nu cere refacerea doctrinei, atât timp cât referințele/versificația rămân compatibile.

## Starea CI

Gate-urile necesare sunt acum:

1. `check:vt-explained`;
2. `check:vt-legacy-provenance`;
3. `check:vt-poonen-fidelity`;
4. `check:vt-chapter-review`;
5. `check:vt-publication`;
6. shared typecheck;
7. shared build;
8. `git diff --check`.

La momentul scrierii acestui raport, connectorul GitHub nu raporta încă un workflow run/check asociat ultimului head. Prin urmare **CI nu este declarat verde fără dovadă**.

## Concluzie

Din punct de vedere editorial, ultimul review acoperă **39/39 cărți și 929/929 capitole**, cu regula source-first corectată și protejată automat.

Din punct de vedere tehnic, merge/release rămâne condiționat de rularea cu succes a gate-urilor și de rezolvarea conflictelor PR-ului cu `main`.
