# Biblia explicată — Vechiul Testament canonic complet

## Stare finală a conținutului

**Acoperire: 39 / 39 de cărți canonice ale Vechiului Testament, Geneza–Maleahi.**

În acest document, `full` înseamnă acum mai mult decât prezență structurală:

- fiecare carte este prezentă;
- fiecare capitol este prezent;
- fiecare interval de versete al celor 29 de cărți overlay este acoperit de cel puțin o explicație;
- unitățile doctrinare existente din Zac Poonen sunt păstrate;
- intervalele pe care Poonen nu le dezvoltă suficient primesc numai explicația textuală/narativă a ceea ce spune Biblia Emanus, fără doctrină, tipologie sau aplicație inventată;
- toate materialele noi rămân `in_review` până la revizia editorială finală și integrarea în `main`.

## Formatele

### `legacy-full` — 10 cărți

1. Geneza
2. Exodul
3. Leviticul
4. Numeri
5. Deuteronomul
6. Iosua
7. Rut
8. 1 Samuel
9. 2 Samuel
10. 1 Împărați

Acestea folosesc formatul complet existent. Geneza păstrează fluxul editorial Allen/Nolan; celelalte folosesc fluxul Poonen existent.

### `full-overlay` — 29 de cărți / 637 de capitole

1. Judecători — 21
2. 2 Împărați — 25
3. 1 Cronici — 29
4. 2 Cronici — 36
5. Ezra — 10
6. Neemia — 13
7. Estera — 10
8. Iov — 42
9. Psalmii — 150
10. Proverbele — 31
11. Eclesiastul — 12
12. Cântarea Cântărilor — 8
13. Isaia — 66
14. Ieremia — 52
15. Plângerile lui Ieremia — 5
16. Ezechiel — 48
17. Daniel — 12
18. Osea — 14
19. Ioel — 3
20. Amos — 9
21. Obadia — 1
22. Iona — 4
23. Mica — 7
24. Naum — 3
25. Habacuc — 3
26. Țefania — 3
27. Hagai — 2
28. Zaharia — 14
29. Maleahi — 4

**Total overlay: 637 capitole.**

Overlay-ul nu copiază textul biblic. Fiecare carte referă `bibleEmanusBookId`, iar textul este rezolvat din Biblia Emanus. Explicația rămâne un strat separat.

## Cele trei straturi de adevăr

### 1. Text biblic — Biblia Emanus

Biblia Emanus este sursa textului afișat și a versificației. Explicația nu rescrie versetele.

### 2. Explicație doctrinară — Zac Poonen / sursa editorială stabilită

Pentru Exod–Daniel, baza locală este:

`.research/poonen-through-the-bible-OT/`

Manifestul corpusului confirmă 21 de fișiere și 25 de episoade, Exod–Daniel. Unitățile care provin din transcript păstrează `source.kind = "poonen"` și ancora de sursă.

Pentru Osea–Maleahi, corpusul local nu avea încă transcript; au fost folosite episoadele/structura oficială CFC India `Through The Bible`, marcate distinct cu `source.kind = "poonen-official"`.

Textul protejat al predicilor nu este reprodus integral; materialul Emanus este formulat în propriile cuvinte și păstrează trasabilitatea sursei.

### 3. Explicație textuală de completare — Biblia Emanus

Când Poonen nu dezvoltă separat un capitol sau un interval, sistemul **nu inventează doctrina care lipsește**.

În schimb, intervalul primește o explicație textuală care spune ce se întâmplă sau ce afirmă pasajul însuși. Aceste unități au:

`source.kind = "biblia-emanus"`

și nota:

`rezumat narativ fără doctrină adăugată`

Acest strat este folosit exclusiv pentru acoperire textuală, nu pentru a introduce concluzii doctrinare noi.

## Ebraica

Cuvintele ebraice intră numai când sunt importante pentru sens. Ele sunt un strat lexical separat, verificat în WLC-OSHB.

O notă lexicală:

- nu este prezentată drept idee a lui Poonen dacă el nu explică acel cuvânt;
- nu construiește doctrine din etimologii speculative;
- nu transformă un posibil sens lexical în singurul sens al pasajului.

## Reguli doctrinare

1. Text biblic: Biblia Emanus.
2. Doctrină/aplicație: numai în limitele Poonen sau ale sursei editoriale stabilite.
3. Gol în Poonen: numai explicație textuală din Biblia Emanus.
4. Afirmație discutabilă a sursei: este limitată de text și marcată drept interpretare când Scriptura nu o afirmă explicit.
5. Părerea unui personaj biblic nu devine automat doctrina cărții. Exemplu: discursurile prietenilor lui Iov sunt explicate ca discursurile lor; Iov 42 păstrează evaluarea lui Dumnezeu.
6. Aplicația tipologică nu șterge sensul istoric/literar.
7. Narațiunile despre război, sinucidere, abuz, violență sexuală, divorț și judecată nu sunt transformate în permisiuni moderne pentru rău.
8. Profeția apocaliptică este descrisă textual; schemele interpretative Poonen rămân interpretări Poonen unde textul nu oferă aceeași certitudine.

## Judecători

PR-ul vechi #46 rămâne metodologic depășit și nu trebuie folosit drept sursă finală.

`Judecători v2` păstrează unitățile transcript-backed din `judges-ruth.txt`. În registry-ul final, capitolele și intervalele neacoperite de transcript sunt completate numai cu rezumat textual din Biblia Emanus.

## Implementare

Helper:

`packages/shared/src/bible/completeOverlay.ts`

Datele complete de capitol:

- `vtFullNarrativesHistorical.ts` — 144 capitole
- `vtFullNarrativesWisdom.ts` — 243 capitole
- `vtFullNarrativesMajorProphets.ts` — 183 capitole
- `vtFullNarrativesMinorProphets.ts` — 67 capitole

Compoziția finală:

`packages/shared/src/bible/overlays/fullCoverage.ts`

Registry-ul canonic:

`packages/shared/src/bible/overlays/index.ts`

Export public al pachetului:

`@emanus/shared/bible-explained`

Manifest 39/39:

`packages/shared/src/bible/vtExplainedCoverage.ts`

## Validare

```bash
python3 scripts/check-vt-explained-coverage.py
```

Poarta verifică static:

- cele 10 cărți `legacy-full`;
- cele 29 de overlay-uri de bază și `bibleEmanusBookId`;
- cele 637/637 explicații de capitol și cele 637 seturi de versificație;
- compoziția celor 29 de `*_FULL`;
- `coverageMode = "full"`;
- registry-ul final bazat pe `VT_EXPLAINED_FULL_OVERLAYS`;
- manifestul cu 39/39 cărți în ordine;
- exportul public `@emanus/shared/bible-explained`.

La runtime, `assertVerseCompleteOverlay()` refuză o carte dacă după compoziție rămâne vreun interval de versete neacoperit.

## Ce nu înseamnă „terminat”

`39/39 full` descrie **acoperirea conținutului Bibliei explicate**, nu aprobarea finală de publicare.

Toate materialele nou create rămân `in_review`. Înainte de `main` rămân:

- typecheck/build/CI;
- revizia editorială finală;
- integrarea UI a registry-ului complet, dacă reader-ul curent încă folosește doar formatul legacy.

Cărțile deuterocanonice/ortodoxe, extensiile etiopiene și textele selectate de la Marea Moartă sunt un corpus separat și nu intră în acest 39/39.
