# Biblia Emanus

Biblia Emanus este o traducere românească nouă, deschisă și redactată cu diacritice corecte. Proiectul pornește de la World English Bible Updated, ediția protestantă de 66 de cărți, și verifică formulările importante în textele biblice originale disponibile legal.

## Stare

- traducere în lucru;
- **Geneza 1–50 și Iosua 1–24 au trecut poarta automată 2.0**;
- sunt publicate 74 de capitole și 2.191 de versete;
- explicațiile Emanus sunt păstrate separat de textul biblic;
- textul existent RCCV nu este modificat de această ramură;
- aprobarea AI la nivel de capitol nu este suficientă pentru Noul Testament;
- Noul Testament rămâne nepublicabil până când toate cele 7.941 de versete au dovezi editoriale individuale în `NT-EDITORIAL-APPROVAL.json`;
- un capitol NT devine public numai după fixarea surselor, revizia editorială per-verset identificată (umană sau AI trasabilă) și trecerea porții descrise în `AUTOMATED-PUBLICATION.md`.

## Surse de lucru

1. **Bază engleză:** World English Bible Updated / Protestant Edition (`WEBU` / `engwebp`), domeniu public. Textul rezultat nu va fi numit World English Bible.
2. **Vechiul Testament:** Westminster Leningrad Codex prin Open Scriptures Hebrew Bible. Textul WLC este declarat domeniu public; datele de analiză OSHB cer atribuire.
3. **Noul Testament:** SBL Greek New Testament, licență Creative Commons Attribution 4.0.
4. **Etaloane românești fixate:** Cornilescu 1924 și BTF, ambele distribuite de eBible ca domeniu public.
5. **Etalon extern:** NTR, consultat `comparison-only`, fără stocarea textului integral.

## Principii

- fidelitate față de sensul textului, nu copiere mecanică a ordinii engleze;
- română actuală, naturală și reverentă;
- diacritice Unicode corecte: `ă`, `â`, `î`, `ș`, `ț`;
- fără formele vechi cu sedilă: `ş`, `ţ`;
- fără copiere din traduceri românești protejate;
- traducerile românești existente sunt folosite numai pentru triangularea sensului;
- comparația include minimum trei traduceri și cel puțin una din familia Cornilescu;
- potrivirea exactă cu o traducere nu este necesară și nu reprezintă singură dovada corectitudinii;
- variantele textuale și termenii ambigui sunt documentați și rezolvați înainte de publicare.

## Flux editorial și de publicare

1. se fixează pasajul-sursă englez și pasajul ebraic sau grecesc;
2. se redactează o traducere românească originală;
3. se execută independent revizia AI din limba-sursă;
4. se execută revizia AI de limba română;
5. se execută revizia AI teologică și canonică;
6. se compară sensul cu minimum trei traduceri românești, fără copierea sau stocarea integrală a textelor protejate;
7. se verifică omisiunile, adaosurile și distanța de copyright;
8. se rezolvă toate notele și variantele textuale critice;
9. se recalculează comparațiile deterministe din snapshoturile fixate;
10. auditul AI este legat prin SHA-256 de textul și sursele exacte, dar rămâne dovadă de proces, nu de corectitudine semantică;
11. pentru NT, un reviewer editorial identificat completează registrul per-verset: digesturi ale surselor, ancore grecești/românești și justificarea individuală; un reviewer AI declară și sistemul, plus identificatorul rulării;
12. numai când registrul complet și toate controalele sunt `approved`, capitolul NT poate trece la `published` și `public: true`.

## Licență

Biblia Emanus este pregătită pentru publicare sub `CC BY 4.0`, cu atribuirea proiectului și a surselor relevante.

Trecerea porții demonstrează trasabilitatea procesului editorial declarat; nu este o certificare a infailibilității textuale, teologice sau confesionale.

## Progres curent

`docs/data/biblia-emanus/` conține 471 de capitole înregistrate, inclusiv corpusul NT de 27 de cărți, 260 de capitole și 7.941 de versete. Prezența sa în repository nu înseamnă publicare: până la repararea textului și la registrul editorial complet, NT este doar un corpus în revizie, chiar dacă metadate istorice îl marchează altfel.

Geneza și Iosua sunt `published` după trecerea porții automate 2.0. Orice extindere a publicării NT se face numai după stabilizarea textului, evidența per-verset și verificarea tuturor porților.
