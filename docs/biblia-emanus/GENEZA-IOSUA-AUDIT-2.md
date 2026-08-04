# Audit 2.0 — Geneza și Iosua

Data auditului: `2026-08-04`

## Rezultat

- Geneza: 50 de capitole, 1.533 de versete;
- Iosua: 24 de capitole, 658 de versete;
- total: 74 de capitole, 2.191 de versete și 580 de note editoriale;
- statut final: `published`, `public: true`;
- snapshot surse: `sha256:a7f6c529a1fd8c45522f6cdaea89f3a1698d7e434a9a5acb9f9eeec5962ac931`.

## Controale executate

- acoperire completă WEB Protestant Edition, WLC, Cornilescu 1924 și BTF;
- maparea diferenței de versificație din Geneza 31:55 și 32:1–32;
- reunirea continuărilor poetice USFM în versetul corect;
- comparație deterministă pentru fiecare dintre cele 2.191 de versete;
- audit AI din ebraică, audit românesc și audit teologic/canonic;
- triangulare cu Cornilescu 1924, BTF și NTR;
- verificarea tuturor notelor și variantelor textuale;
- sigiliu SHA-256 distinct pentru textul fiecărui capitol;
- teste negative pentru omisiuni, audit învechit și note nerezolvate.

## Corecții editoriale aplicate

- uniformizare `Rahav`, `Sihem` și `Galaad`;
- corectarea formulărilor din Geneza 1:20, 31:2 și 50:20;
- corectarea răspunsului Căpeteniei din Iosua 5:14;
- corectarea continuității citatelor în Geneza 1, 3 și 4;
- sincronizarea deciziilor editoriale care descriau formulări vechi;
- documentarea și rezolvarea fără armonizare forțată a variantelor din Geneza 24:7, 36:16 și 49:10;
- înlocuirea vechii aprobări declarative cu verificări bazate pe snapshot și digest.

## Regula păstrată

Etaloanele românești nu pot scurta sau extinde originalul. Dacă un etalon fragmentează un verset pe mai multe linii, motorul reunește toate liniile. Dacă etaloanele diferă, decizia este justificată din WLC și documentată în nota editorială.

## Comenzi de reproducere

```bash
pnpm check:biblia-emanus
pnpm test:biblia-emanus
pnpm seal:biblia-emanus --check --book GEN --book JOS
```

Următoarele cărți vor folosi aceeași poartă după stabilizarea textelor lor: Exod, Leviticul, Numeri și Deuteronomul.
