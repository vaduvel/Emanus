# Biblia Emanus

Biblia Emanus este o traducere românească nouă, deschisă și redactată cu diacritice corecte. Proiectul pornește de la World English Bible Updated, ediția protestantă de 66 de cărți, și verifică formulările importante în textele biblice originale disponibile legal.

## Stare

- traducere în lucru;
- niciun capitol nu este publicat automat;
- fiecare capitol rămâne `draft` sau `in_review` până la aprobarea umană;
- explicațiile Emanus sunt păstrate separat de textul biblic;
- textul existent RCCV nu este modificat de această ramură;
- nu se afirmă că un draft este lipsit de greșeli doar fiindcă a trecut verificările automate.

## Surse de lucru

1. **Bază engleză:** World English Bible Updated / Protestant Edition (`WEBU-Protestant` / `engwebp`), domeniu public. Textul rezultat nu va fi numit World English Bible.
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
- publicarea cere revizie de limbă română, revizie din ebraică sau greacă, revizie teologică și aprobare finală.

## Flux editorial

1. se fixează pasajul-sursă englez și pasajul ebraic sau grecesc;
2. se înregistrează URL-ul exact și numărul canonic de versete în `source-ledger.json`;
3. se redactează o traducere românească originală;
4. se notează termenii cu mai multe interpretări și variantele textuale;
5. validatorul verifică numerotarea, numărul de versete, proveniența, diacriticele și blocajele de publicare;
6. un revizor de limba română verifică naturalețea și precizia formulării;
7. un revizor competent în limba-sursă verifică fiecare verset în ebraică sau greacă;
8. se face revizia teologică și contextuală fără impunerea unei doctrine în text;
9. proprietarul proiectului dă aprobarea finală;
10. numai după toate aceste etape un capitol poate deveni `approved` sau `published`.

## Regula de siguranță

Niciun model AI și niciun test automat nu poate garanta singur absența absolută a erorilor într-o traducere biblică. Verificările automate reduc erorile tehnice și de proveniență; ele nu înlocuiesc revizia umană a limbilor biblice. Când o formulare este nesigură, ea rămâne marcată pentru revizie și nu este rezolvată în tăcere.

## Progres curent

Sunt redactate ca ciorne **Geneza 1–5**, în total **138 de versete**. Toate rămân `draft`, `public: false`. Registrul surselor și al numărului de versete este în `docs/data/biblia-emanus/source-ledger.json`.
