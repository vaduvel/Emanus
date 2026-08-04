# Biblia Emanus

Biblia Emanus este o traducere românească nouă, deschisă și redactată cu diacritice corecte. Proiectul pornește de la World English Bible Updated, ediția protestantă de 66 de cărți, și verifică formulările importante în textele biblice originale disponibile legal.

## Stare

- traducere în lucru;
- Geneza 1–20 există numai ca ciornă editorială;
- niciun capitol nu este publicat automat;
- fiecare capitol rămâne `draft` sau `in_review` până la aprobarea umană;
- explicațiile Emanus sunt păstrate separat de textul biblic;
- textul existent RCCV nu este modificat de această ramură.

## Surse de lucru

1. **Bază engleză:** World English Bible Updated / Protestant Edition (`WEBU` / `engwebp`), domeniu public. Textul rezultat nu va fi numit World English Bible.
2. **Vechiul Testament:** Westminster Leningrad Codex prin Open Scriptures Hebrew Bible. Textul WLC este declarat domeniu public; datele de analiză OSHB cer atribuire.
3. **Noul Testament:** SBL Greek New Testament, licență Creative Commons Attribution 4.0.

## Principii

- fidelitate față de sensul textului, nu copiere mecanică a ordinii engleze;
- română actuală, naturală și reverentă;
- diacritice Unicode corecte: `ă`, `â`, `î`, `ș`, `ț`;
- fără formele vechi cu sedilă: `ş`, `ţ`;
- fără copiere din traduceri românești protejate;
- variantele textuale și termenii ambigui sunt documentați, nu ascunși;
- un text generat sau propus de AI este doar ciornă editorială;
- publicarea cere revizie de limbă română, revizie biblică și aprobare finală.

## Flux editorial

1. se fixează pasajul-sursă englez și pasajul ebraic sau grecesc;
2. se redactează o traducere românească originală;
3. se notează termenii cu mai multe interpretări;
4. se verifică fidelitatea, limba și diacriticele;
5. se compară cu originalul, nu se copiază formulări din ediții românești;
6. capitolul trece din `draft` în `in_review`;
7. doar un reviewer uman îl poate marca `approved` sau `published`.

## Progres curent

`docs/data/biblia-emanus/` conține ciornele complete pentru Geneza 1–20: 20 de capitole și 514 versete. Fiecare capitol are sursele exacte, numărul canonic de versete și note editoriale pentru termenii sau variantele care cer revizie.

Trecerea tuturor testelor automate confirmă structura, proveniența declarată și blocajele tehnice; nu înlocuiește revizia umană din ebraică, revizia limbii române sau aprobarea teologică finală.
