# Vechiul Testament explicat — audit final al explicațiilor

Data: 2026-08-08

## Verdict

**EXPLANATIONS_REVIEWED_929_OF_929 — SOURCE_FIDELITY_COMPLETE — CI_PENDING**

Acest verdict privește numai stratul explicativ al Vechiului Testament. Traducerea Biblia Emanus este un flux separat.

Ultimul review consemnat aici este review editorial AI. Nu este prezentat drept review uman.

## Acoperire

- 39 / 39 cărți canonice VT;
- 929 / 929 capitole canonice;
- 10 cărți `legacy-full`, 292 capitole;
- 29 cărți `full-overlay`, 637 capitole;
- toate cele 29 overlay-uri finale sunt `coverageMode = full` și `status = published` la nivelul explicației.

Review-ul capitol-cu-capitol este documentat separat în `VT-CHAPTER-BY-CHAPTER-REVIEW-2026-08-08.md`.

## Regula editorială autoritativă

1. **Poonen/CFC are prioritate acolo unde dezvoltă pasajul.** Explicația, doctrina, tipologia și aplicația lui sunt păstrate; un review ulterior nu are voie să le dilueze, relativizeze, generalizeze sau înlocuiască.
2. `canonical-exegesis` și cercetarea generală sunt permise numai pentru puncte/pasaje pe care sursa principală nu le dezvoltă.
3. `textual-overview` este fallback pentru goluri: explicație directă a textului, fără doctrină, aplicație pastorală sau lexic inventat.
4. Provenance-ul cu numele sursei rămâne intern. Cititorul primește explicația direct, fără Poonen/CFC/transcript în copy.
5. Textul biblic nu este modificat de review-ul explicațiilor.
6. Înlocuirea ulterioară a textului de lucru cu Biblia Emanus nu cere refacerea explicației, dacă referințele și versificația rămân compatibile.

Această regulă înlocuiește formularea veche conform căreia review-ul putea «corecta» o explicație Poonen prin exegeză generală sau eticheta automat interpretările lui drept disputate.

## Corecție de metodologie făcută în ultimul review

Au fost retrase complet override-urile editoriale introduse asupra:

- Exod 21;
- Levitic 25;
- Iosua 6, 7, 10, 11.

Cărțile au revenit la explicațiile lor anterioare; aceste override-uri nu mai fac parte din verdictul final.

În schimb, re-auditul a căutat exact locurile în care un review ulterior păstrase provenance Poonen, dar îi slăbise concluzia în text. Aceste locuri au primit un strat final de fidelitate, aplicat după review-urile vechi.

## Zone Poonen restaurate explicit

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

Exemple de învățături care nu mai sunt diluate:

- Psalmul 32: Vechiul Legământ avea iertare/acoperire; curățirea vine prin sângele lui Isus după Cruce;
- Psalmul 69: Isus a murit de inimă frântă;
- Psalmul 73: nu răspândi îndoiala nerezolvată ca să nu distrugi credința altora;
- Proverbe 23: vinul alcoolic/fermentat din avertisment nu este tipul de vin făcut de Isus la Cana;
- Isaia 14: Lucifer, cele cinci «eu voi» și contrastul cu voia Tatălui;
- Ezechiel 28: Satan, Edenul anterior și căderea prin mândrie;
- Ezechiel 43: legea fundamentală a bisericii Noului Legământ este sfințenia absolută;
- Daniel 9: 483 de ani până la Mesia + ultima perioadă de șapte ani cu Antihristul;
- Daniel 10: poziția post-Calvar față de Satan și demoni;
- Daniel 12: două învieri;
- Iov 42: ajungerea la zero și rugăciunea pentru persecutori înaintea binecuvântării duble;
- 2 Samuel 24: David se uită la număr/puterea armatei și refuză să ofere lui Dumnezeu ceva care nu îl costă.

## Completări generale păstrate numai în goluri

Au fost verificate explicit cazuri în care sursa nu dezvoltă punctul tehnic, iar completarea generală poate rămâne, de exemplu:

- 1 Împărați 22 — mecanica «duhului de minciună»;
- Numeri 31 — detalii despre captive pe care sursa nu le dezvoltă;
- Deuteronom 22 — cazurile juridice/sexuale neexplicate material în transcript;
- Isaia 45:7 — nota lexicală pentru `ra`;
- alte capitole fără expunere doctrinară — `textual-overview`.

O completare generală nu are voie să contrazică o unitate Poonen existentă.

## Provenance legacy

`check:vt-legacy-provenance` verifică în cele 10 cărți legacy:

- `explanationKind`;
- `explanationSource`;
- zero aplicație/lexic inventat în `textual-overview`;
- `wordSource = WLC-OSHB` pentru notele ebraice.

## Gate nou: fidelitatea doctrinei-sursă

`check:vt-poonen-fidelity` rulează pe materialul final, după toate review-urile.

El cere pentru capitolele sensibile:

- unitate finală `exposition` cu `source.kind = poonen` la overlay-uri;
- provenance Poonen în unitățile legacy restaurate;
- păstrarea în `teaching` a afirmațiilor distinctive din transcript.

Astfel nu mai este posibil să păstrăm doar metadata Poonen în timp ce copy-ul îi schimbă doctrina.

## Gate nou: review 929/929

`check:vt-chapter-review` parcurge individual fiecare capitol final, Geneza 1 — Maleahi 4, și verifică:

- număr canonic continuu;
- titlu și rezumat;
- cel puțin o unitate explicativă;
- `teaching` nenul;
- provenance și `explanationKind` valide;
- continuitatea intervalelor de versete pentru overlay;
- truth-guard pentru `textual-overview`;
- surse pentru `canonical-exegesis`;
- WLC-OSHB pentru notele ebraice;
- totalurile exacte 292 legacy + 637 overlay = 929.

## Copy public

`publicationBible.ts` păstrează regula:

- fără nume modern al sursei în UI;
- fără `explanationSource` în obiectul public;
- fără limbaj intern despre transcript;
- attribution cleanup gramatical, nu simpla ștergere oarbă a numelui.

Această neutralizare privește numai atribuirea; nu are voie să schimbe doctrina explicației.

## Separarea explicației de textul Bibliei

Aprobarea explicației nu publică automat un text `temporary-editorial`.

- explicație `published` + text `biblia-emanus` → reader-ul poate publica;
- explicație `published` + text `temporary-editorial` → reader-ul rămâne `in_review`.

Prin urmare traducerea nu este blocker pentru review-ul explicației, dar rămâne gate separat pentru afișarea publică a textului biblic.

## Gate-uri înainte de merge/release

Trebuie să treacă:

1. `check:vt-explained`;
2. `check:vt-legacy-provenance`;
3. `check:vt-poonen-fidelity`;
4. `check:vt-chapter-review`;
5. `check:vt-publication`;
6. typecheck `@emanus/shared`;
7. build `@emanus/shared`;
8. `git diff --check`;
9. rezolvarea conflictelor PR #85 cu `main`.

La momentul acestui update, GitHub nu raporta încă workflow runs/status checks pentru ultimul head. Prin urmare **CI nu este declarat verde fără dovadă**.

## Concluzie

**Review-ul editorial al explicațiilor VT acoperă 39/39 cărți și 929/929 capitole, iar fidelitatea față de Poonen este acum regula dominantă și este protejată prin gate separat.**

Merge/release rămâne tehnic condiționat de trecerea gate-urilor și de rezolvarea conflictelor de integrare. Traducerea Biblia Emanus rămâne un flux separat.
