# Biblia explicată — Vechiul Testament canonic complet

## Stare finală a conținutului

**Acoperire explicații: 39 / 39 de cărți canonice ale Vechiului Testament, Geneza–Maleahi.**

În acest document, `full` descrie acoperirea explicației, nu aprobarea finală de publicare:

- fiecare carte este prezentă;
- fiecare capitol este prezent;
- fiecare interval de versete al celor 29 de cărți overlay este acoperit de cel puțin o explicație;
- unitățile doctrinare existente din Zac Poonen/CFC sunt păstrate;
- intervalele pe care Poonen nu le dezvoltă suficient primesc numai un overview textual/narativ, fără doctrină, tipologie sau aplicație inventată;
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

Explicația și textul biblic sunt două straturi independente. Overlay-ul nu încorporează o anumită traducere în explicație; textul este rezolvat prin `bibleEmanusBookId` și catalogul de text materializat. Asta permite înlocuirea traducerii fără rescrierea explicației.

## Text biblic de lucru

### Judecători–Daniel — Biblia Emanus validată

Pentru cele 17 cărți overlay Judecători–Daniel, textul materializat trebuie să treacă toate condițiile:

- `translation: BE`;
- `published`;
- `public: true`;
- toate câmpurile de review aprobate;
- sursă engleză WEBU-Protestant;
- sursă ebraică WLC-OSHB;
- numerotare continuă și text nenul pentru fiecare verset.

În catalog au `textStage = "biblia-emanus"` și `translationLabel = "Biblia Emanus"`.

### Osea–Maleahi — text provizoriu editorial

Explicațiile celor 12 profeți mici nu mai sunt blocate de faptul că traducerea Biblia Emanus este încă în lucru.

Pentru Osea–Maleahi este materializat temporar textul biblic disponibil în corpusul de lucru, exclusiv ca suport editorial. Aceste cărți au:

`textStage = "temporary-editorial"`

și eticheta:

`Text biblic provizoriu pentru lucru editorial — de înlocuit cu Biblia Emanus`

Acest text nu este declarat Biblia Emanus și nu este release text. Când traducerea BE este gata, se înlocuiește numai matricea de versete; explicațiile, sursele Poonen/CFC și structura unităților rămân neschimbate.

Toate capitolele overlay sunt în continuare `in_review`, deci această strategie nu transformă textul provizoriu într-o publicare accidentală.

## Cele trei straturi de adevăr

### 1. Text biblic

Textul biblic rămâne separat de explicație. Pentru Judecători–Daniel este Biblia Emanus validată; pentru Osea–Maleahi este un strat provizoriu marcat explicit, destinat înlocuirii.

### 2. Explicație doctrinară — Zac Poonen / sursa editorială stabilită

Pentru Exod–Daniel, baza locală este:

`.research/poonen-through-the-bible-OT/`

Manifestul corpusului confirmă 21 de fișiere și 25 de episoade, Exod–Daniel. Unitățile care provin din transcript păstrează `source.kind = "poonen"` și ancora de sursă.

Pentru Osea–Maleahi, corpusul local nu avea transcript complet; au fost folosite materialele oficiale CFC India `Through The Bible`, marcate distinct cu `source.kind = "poonen-official"`.

Materialul Emanus este formulat în propriile cuvinte și păstrează trasabilitatea sursei.

### 3. Explicație textuală de completare — Emanus

Când Poonen nu dezvoltă separat un capitol sau un interval, sistemul **nu inventează doctrina care lipsește**.

Intervalul primește un overview textual care spune ce se întâmplă sau ce afirmă pasajul însuși. Aceste unități au:

`source.kind = "biblia-emanus"`

și nota:

`rezumat narativ fără doctrină adăugată`

Denumirea `source.kind` este istorică pentru acest strat editorial și nu înseamnă că textul biblic temporar Osea–Maleahi este deja traducerea Biblia Emanus.

Overview-urile textuale nu primesc automat `forYourHeart` și nu primesc studii lexicale inventate.

## Ebraica

Cuvintele ebraice intră numai când sunt importante pentru sens. Ele sunt un strat lexical separat, verificat în WLC-OSHB.

O notă lexicală:

- nu este prezentată drept idee a lui Poonen dacă el nu explică acel cuvânt;
- nu construiește doctrine din etimologii speculative;
- nu transformă un posibil sens lexical în singurul sens al pasajului.

## Reguli doctrinare

1. Textul biblic și explicația sunt straturi separate.
2. Doctrină/aplicație: numai în limitele Poonen/CFC sau ale sursei editoriale stabilite.
3. Gol în Poonen: numai overview textual, fără doctrină nouă.
4. Afirmație discutabilă a sursei: este limitată de text și marcată drept interpretare când Scriptura nu o afirmă explicit.
5. Părerea unui personaj biblic nu devine automat doctrina cărții.
6. Aplicația tipologică nu șterge sensul istoric/literar.
7. Narațiunile despre război, sinucidere, abuz, violență sexuală, divorț și judecată nu sunt transformate în permisiuni moderne pentru rău.
8. Profeția apocaliptică este descrisă textual; schemele interpretative Poonen rămân interpretări Poonen unde textul nu oferă aceeași certitudine.
9. Un text marcat `temporary-editorial` nu poate fi etichetat Biblia Emanus.

## Implementare

Helper de acoperire:

`packages/shared/src/bible/completeOverlay.ts`

Date complete de capitol:

- `vtFullNarrativesHistorical.ts` — 144 capitole
- `vtFullNarrativesWisdom.ts` — 243 capitole
- `vtFullNarrativesMajorProphets.ts` — 183 capitole
- `vtFullNarrativesMinorProphets.ts` — 67 capitole

Compoziția finală:

`packages/shared/src/bible/overlays/fullCoverage.ts`

Registry-ul explicațiilor:

`packages/shared/src/bible/overlays/index.ts`

Textul de lucru materializat:

`packages/shared/src/bible/generated/vtCanonicalText/`

Adaptorul overlay → cititor:

`packages/shared/src/bible/overlayBibleBooks.ts`

Catalogul cititorului editorial:

`packages/shared/src/bible/publicationBible.ts`

Exporturi publice:

- `@emanus/shared/bible-explained`
- `@emanus/shared/bible-publication`

Manifest 39/39:

`packages/shared/src/bible/vtExplainedCoverage.ts`

## Validare

```bash
pnpm check:vt-explained
pnpm check:vt-publication
pnpm typecheck
pnpm build
```

Porțile verifică:

- cele 10 cărți `legacy-full`;
- 29 de overlay-uri complete;
- 637/637 capitole overlay;
- acoperirea intervalelor de versete;
- toate materialele overlay `in_review`;
- sursa fiecărei unități și separarea `exposition` / `textual-overview`;
- 29/29 texte de lucru;
- exact 17 cărți cu text Biblia Emanus validat;
- exact 12 cărți cu text provizoriu marcat explicit;
- imposibilitatea de a pune aplicație pastorală sau studiu lexical inventat pe overview-ul textual.

La runtime, `assertVerseCompleteOverlay()` refuză o carte dacă după compoziție rămâne vreun interval de versete neacoperit.

## Ce nu înseamnă „terminat”

`39/39 full` descrie **acoperirea conținutului Bibliei explicate**, nu aprobarea finală de publicare.

Înainte de publicare rămân:

- înlocuirea textelor Osea–Maleahi cu Biblia Emanus finală;
- revizia editorială umană;
- schimbarea controlată a statusurilor din `in_review` în `published`;
- merge-ul în ramura de produs după CI verde.

Cărțile deuterocanonice/ortodoxe, extensiile etiopiene și textele selectate de la Marea Moartă sunt un corpus separat și nu intră în acest 39/39.
