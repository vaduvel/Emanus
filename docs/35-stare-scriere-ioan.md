# Starea scrierii pentru Ioan

Data pornirii: 2 august 2026.

Data completarii scrierii initiale: 2 august 2026.

## Stare generala

- Cartea **Ioan** este scrisa acum integral, capitolele **1–21**.
- Toate capitolele raman `in_review`.
- Niciun capitol nu este trecut la `published`.
- Scrierea a fost facuta direct in modelul `BibleChapter` din `packages/shared/src/bible/`.
- Cartea este legata in `packages/shared/src/bible/index.ts`, iar dupa integrarea lucrarilor paralele `BIBLE_BOOKS` contine `GENEZA`, `MATEI` si `IOAN`.

## Valurile de lucru

### Valul 1 — Ioan 1–5

- Scriere initiala: incheiata.
- Baza cartii: `packages/shared/src/bible/ioan.ts`.
- Capitole separate adaugate: `ioan3.ts`, `ioan4.ts`, `ioan5.ts`.
- Legare in index: incheiata.

### Valul 2 — Ioan 6–10

- Scriere initiala: incheiata.
- Capitole separate adaugate: `ioan6.ts` pana la `ioan10.ts`.
- Legare in index: incheiata.

### Valul 3 — Ioan 11–15

- Scriere initiala: incheiata.
- Capitole separate adaugate: `ioan11.ts` pana la `ioan15.ts`.
- Legare in index: incheiata.

### Valul 4 — Ioan 16–21

- Scriere initiala: incheiata.
- Capitole separate adaugate: `ioan16.ts` pana la `ioan21.ts`.
- Legare in index: incheiata.

## Surse si prudenta editoriala

- Directia explicativa principala a ramas Zac Poonen.
- Allen Nolan a ramas sursa secundara, mai ales pentru Ioan 1.
- Robert Breaker a fost folosit numai selectiv si filtrat.
- Formularile raman originale Emanus, fara copiere 1:1.
- Hotarul doctrinar final ramane `docs/14-carta-doctrinara.md`.

## Observatie asupra textului biblic folosit la bootstrap

Pentru mai multe capitole, textul a fost incarcat din eBible. Pentru altele, din cauza timeout-urilor la eBible, bootstrap-ul a folosit provizoriu RMNN din BibleGateway.

Capitolele care cer atentie sporita la citirea finala din acest motiv sunt:

- Ioan 2
- Ioan 4
- Ioan 7
- Ioan 9
- Ioan 11
- Ioan 13
- Ioan 14
- Ioan 19
- Ioan 20

Aceste capitole trebuie citite cu grija la revizia finala, pentru a ramane cat mai aproape de Cornilescu 1924, editia originala.

## Rezultat tehnic

- Branch de lucru: `draft/ioan-kickoff`
- PR de integrare: `#11`
- Dupa completarea capitolelor 16–21 si actualizarea indexului, verificarea `verify` a trecut cu succes.

## Urmatorul pas

- Citire si cantarire finala umana, capitol cu capitol.
- Eventualele indreptari raman in acelasi registru Emanus.
- Publicarea ramane etapa separata de integrarea in repository.

Scrierea initiala a lui Ioan este incheiata. Urmatoarea lucrare pe aceasta carte este revizia finala, nu publicarea automata.
