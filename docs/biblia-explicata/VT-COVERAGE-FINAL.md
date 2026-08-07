# Biblia explicată — Vechiul Testament canonic complet

## Stare

**Acoperire structurală: 39 / 39 de cărți ale Vechiului Testament canonic protestant, Geneza–Maleahi.**

Toate materialele noi sunt `in_review`. „Complet” în acest document înseamnă că fiecare carte este prezentă în arhitectura Bibliei explicate și că sursa de explicație a fost definită; nu înseamnă că revizia umană finală sau integrarea în `main` a fost făcută.

## Cele două formate existente

### Formatul anterior — `legacy-full` — 10 cărți

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

Geneza folosește fluxul editorial anterior bazat pe Allen Nolan. Exod–Iosua și Rut–1 Împărați folosesc corpusul Poonen pregătit în repo și structura de explicație existentă.

### Formatul nou — explanation overlay — 29 de cărți

1. Judecători
2. 2 Împărați
3. 1 Cronici
4. 2 Cronici
5. Ezra
6. Neemia
7. Estera
8. Iov
9. Psalmii
10. Proverbele
11. Eclesiastul
12. Cântarea Cântărilor
13. Isaia
14. Ieremia
15. Plângerile lui Ieremia
16. Ezechiel
17. Daniel
18. Osea
19. Ioel
20. Amos
21. Obadia
22. Iona
23. Mica
24. Naum
25. Habacuc
26. Țefania
27. Hagai
28. Zaharia
29. Maleahi

Overlay-ul nu copiază textul biblic. Fiecare carte referă `bibleEmanusBookId`, iar textul trebuie rezolvat din Biblia Emanus. Explicația rămâne un strat separat.

## Sursele explicației

### Exod–Daniel

Corpus local:

`.research/poonen-through-the-bible-OT/`

Manifestul local confirmă 21 de fișiere / 25 de episoade, Exodus–Daniel. Pentru că Poonen face în multe episoade overview, noul format folosește `coverageMode: "transcript-focused"`: toate capitolele există structural, dar explicație este adăugată numai acolo unde sursa dezvoltă tema/pasajul suficient.

### Osea–Maleahi

Corpusul local se oprește la Daniel. Pentru a închide VT fără a inventa explicații, Osea–Maleahi folosesc direct sursa oficială CFC India `Through The Bible` pentru Zac Poonen, prin episoadele și structura editorială oficială a celor 12 profeți mici.

Aceste unități folosesc `source.kind = "poonen-official"` și păstrează URL-ul oficial și secțiunea sursă. Textul Poonen nu este copiat; explicația Emanus este parafrazată în limitele temei oficiale și ale textului Biblia Emanus.

## Regula doctrinară

1. **Textul biblic:** exclusiv Biblia Emanus.
2. **Explicația doctrinară:** Poonen / sursa editorială stabilită pentru carte.
3. **Gol în sursă:** nu se inventează doctrină; capitolul rămâne structural și cititorul vede textul Biblia Emanus.
4. **Afirmație discutabilă a sursei:** se limitează prin textul biblic și este marcată ca interpretare când Scriptura nu o afirmă explicit.
5. **Ebraică:** numai termeni importanți pentru sens, verificați în WLC-OSHB; nota lexicală nu este atribuită lui Poonen dacă nu vine de la el.
6. **Aplicație tipologică:** nu înlocuiește sensul istoric al textului.
7. **Pasaje sensibile:** narațiunile despre război, sinucidere, abuz, violență sexuală, divorț sau judecată nu sunt transformate în permisiuni moderne pentru rău.

## Judecători

PR-ul vechi #46 este metodologic depășit și nu trebuie folosit drept sursă finală. `Judecători v2` este varianta transcript-backed: Biblia Emanus `JDG` + `judges-ruth.txt`, fără explicațiile suplimentare inventate în primul draft.

## Profeții mici

Sursele oficiale Poonen folosite:

- Osea + Ioel — `Hosea, Joel`
- Amos + Obadia — `Amos, Obadiah`
- Iona + Mica — `Jonah, Micah`
- Naum + Habacuc — `Nahum, Habakkuk`
- Țefania + Hagai — `Zephaniah, Haggai`
- Zaharia — `Zechariah`
- Maleahi — `Malachi`

Structura oficială Poonen este păstrată în fiecare val, inclusiv cele șapte poveri din Maleahi și cele cinci secțiuni mari din Zaharia.

## Validare

```bash
python3 scripts/check-vt-explained-coverage.py
```

Poarta verifică:

- cele 10 cărți în formatul vechi;
- cele 29 de overlay-uri;
- `bibleEmanusBookId` pentru overlay-uri;
- statusul `in_review`;
- 39 de intrări canonice în ordine Geneza–Maleahi;
- registry-ul celor 29 de overlay-uri.

## Ce NU intră în acest „39/39”

Această închidere privește **VT-ul canonic de 39 de cărți, Geneza–Maleahi**.

Cărțile deuterocanonice/ortodoxe, extensiile etiopiene și textele selectate de la Marea Moartă din Biblia Emanus sunt un corpus separat. Ele nu sunt declarate „Biblia explicată terminată” prin acest val, deoarece corpusul Poonen `Through The Bible` folosit aici urmează canonul de 66 de cărți și nu oferă aceeași bază pentru acele texte suplimentare.
