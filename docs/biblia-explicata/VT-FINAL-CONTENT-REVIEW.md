# Vechiul Testament — review final de conținut

Data: 2026-08-08

## Verdict

**EXPLANATION_LAYER_REVIEWED_929_OF_929 — SOURCE_FIRST — CI_PENDING**

Acest document privește numai stratul **Biblia explicată VT**. Traducerea Biblia Emanus este un flux separat.

Acoperire:

- 39 / 39 cărți;
- 929 / 929 capitole;
- 10 `legacy-full` = 292 capitole;
- 29 `full-overlay` = 637 capitole.

## Regula care controlează ediția

Unde Poonen/CFC dezvoltă pasajul, explicația lui are prioritate editorială și este păstrată fidel. Nu o relativizăm prin formule de tip «o posibilă interpretare», «este disputat», «nu este doctrina Emanus» sau «textul nu spune explicit» atunci când acestea sunt introduse doar pentru a-i slăbi concluzia.

Explicația generală/canonică intră numai unde sursa nu dezvoltă punctul respectiv. `textual-overview` este fallback conservator pentru goluri.

Numele sursei moderne rămâne intern; cititorul primește explicația direct.

## Ce a fost retras din review-ul anterior

Override-urile introduse în ultima trecere asupra **Exod 21, Levitic 25 și Iosua 6/7/10/11** au fost eliminate complet și nu mai fac parte din materialul final.

Documentația veche care le numea «corecții doctrinare finale» era depășită și a fost înlocuită.

## Ce a fost restaurat după transcript

Au primit straturi finale de fidelitate, după review-urile vechi:

- Judecători 4;
- Estera 1, 2, 8;
- Iov 29, 31, 42;
- Psalmii 32, 51, 69, 73, 74, 103, 105;
- Proverbe 3, 22, 23, 31;
- Cântarea Cântărilor 1, 2, 4, 5, 8;
- Isaia 7, 10, 11, 14;
- Ieremia 23, 29, 31;
- Ezechiel 14, 16, 28, 36, 43, 47, 48;
- Daniel 2, 3, 4, 6, 7, 9, 10, 12;
- 1 Samuel 16, 28;
- 2 Samuel 24.

Scopul acestor straturi nu este să adauge o nouă doctrină, ci să împiedice review-urile ulterioare să schimbe doctrina deja prezentă în materialul-sursă.

## Review capitol cu capitol

`check:vt-chapter-review` parcurge materialul final capitol cu capitol, nu doar pe totaluri. Cere fiecărui capitol:

- titlu + rezumat;
- explicație nenulă;
- `teaching` nenul;
- provenance valid;
- `explanationKind` valid;
- continuitate de versete la overlay;
- truth-guards pentru `textual-overview`;
- surse pentru `canonical-exegesis`;
- WLC-OSHB pentru notele ebraice.

Scriptul trebuie să închidă exact:

- 10 cărți legacy / 292 capitole;
- 29 overlay / 637 capitole;
- 39 cărți / 929 capitole total.

Matricea celor 39 de cărți este în `VT-CHAPTER-BY-CHAPTER-REVIEW-2026-08-08.md`.

## Gate de fidelitate

`check:vt-poonen-fidelity` verifică rezultatul final după toate transformările. Pentru capitolele care au fost vulnerabile la diluare cere simultan provenance Poonen și păstrarea unor afirmații distinctive din transcript.

Acest gate acoperă, între altele:

- acoperire vs. curățire în Psalmul 32;
- inima frântă la Cruce în Psalmul 69;
- rațiunea sub Duhul Sfânt în Proverbe 3;
- vinul de la Cana în Proverbe 23;
- străjerii legaliști în Cântarea 5;
- Lucifer și cele cinci «eu voi» în Isaia 14;
- Satan/Edenul dintâi în Ezechiel 28;
- sfințenia absolută în Ezechiel 43;
- zece regate/Antihrist în Daniel 2/7/9;
- poziția post-Calvar în Daniel 10;
- cele două învieri în Daniel 12;
- pierderea ungerii și degenerarea lui Saul în 1 Samuel 16/28;
- numărul/puterea armatei și jertfa care costă în 2 Samuel 24.

## Unde completarea generală rămâne corectă

Dacă Poonen nu dezvoltă punctul, explicația directă a textului poate rămâne. Exemple re-verificate:

- mecanica «duhului de minciună» din 1 Împărați 22;
- detaliile despre captive din Numeri 31;
- cazurile juridice din Deuteronom 22;
- nota lexicală `ra` din Isaia 45:7;
- capitolele care sunt numai `textual-overview`.

Aceste completări nu au voie să suprascrie concluzia unei unități Poonen.

## Copy public și provenance

Provenance-ul nominal rămâne intern. `publicationBible.ts` elimină numele modern, `explanationSource` și limbajul intern despre transcript din obiectul cititorului.

Sanitizarea copy-ului nu are voie să schimbe doctrina; ea schimbă numai atribuirea în formulare directă și gramaticală.

## Separarea explicației de text

Statusul explicației și statusul textului biblic rămân separate:

- explicație `published` + text `biblia-emanus` → poate fi deschis în reader;
- explicație `published` + text `temporary-editorial` → reader-ul rămâne `in_review`.

Prin urmare acest review nu declară traducerea Biblia Emanus terminată.

## Gate-uri înainte de merge/release

Trebuie să treacă:

1. `check:vt-explained`;
2. `check:vt-legacy-provenance`;
3. `check:vt-poonen-fidelity`;
4. `check:vt-chapter-review`;
5. `check:vt-publication`;
6. shared typecheck;
7. shared build;
8. `git diff --check`;
9. rezolvarea conflictelor PR #85 cu `main`.

GitHub nu raporta încă workflow runs/status checks pentru ultimul head la momentul acestui update. CI nu este declarat verde fără dovadă.

## Concluzie

**Ultimul review editorial acoperă explicațiile tuturor celor 929 de capitole VT și aplică regula source-first cerută pentru materialul Poonen.**

Publicarea tehnică rămâne condiționată de gate-uri și de integrarea PR-ului; traducerea Bibliei rămâne în fluxul ei separat.
