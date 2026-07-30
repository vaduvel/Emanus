# Audit editorial al conținutului Emanus

Ultima actualizare: 30 iulie 2026

## Scop

Acest document separă verificările automate de revizia umană. Un CI verde nu înseamnă că toate formulările teologice și pastorale au primit aprobarea finală.

## Catalog runtime

- aproximativ 55 de cursuri în catalog;
- 54 vizibile și un curs creator ascuns;
- 44 de cursuri live;
- 259 de lecții live;
- aproximativ 11 cursuri planificate.

Sursa runtime este `packages/shared/src/library/current.ts`.

## Verificări automate active

CI rulează acum:

1. `pnpm check:quotes` — blochează ghilimelele românești care rup șirurile TypeScript;
2. `pnpm check:typos` — blochează lista explicită de typo-uri cunoscute și raportează fișierul și linia;
3. `pnpm check:content` — auditează graful de importuri pornit din `current.ts`;
4. `pnpm typecheck`;
5. `pnpm build`.

Auditul de conținut verifică:

- ID-uri standard duplicate;
- regresia numărului de ID-uri standard din graful runtime;
- promisiuni de vindecare garantată;
- recomandări de oprire a tratamentului sau medicației;
- diagnostic spiritual cert prin ecran;
- ascultare infantilă absolută;
- iertarea confundată cu întoarcerea în pericol;
- gamificarea prin streak în conținut;
- păstrarea formulărilor de siguranță în cursurile despre copii, căsnicie, sexualitate, abuz și rugăciune.

## Probleme remediate

- auditul inițial scana și surse legacy; acum urmărește numai graful runtime;
- pragul auditului a fost calibrat la cele 233 de ID-uri care folosesc convenția `*_l<number>`; acesta este un prag de regresie, nu totalul catalogului;
- mesajele de eroare sunt publicate ca adnotări GitHub Actions;
- potrivirea falsă `rada` din cuvântul `radar` a fost eliminată;
- au fost corectate automat typo-urile cunoscute rămase în lecțiile despre pilde, har și veșnicie;
- workflow-ul temporar care a aplicat corecțiile a fost șters după utilizare;
- CI #93 a încheiat cu `status: completed` și `conclusion: success`.

## Cursuri cu protecții editoriale explicite

- rugăciuni contextuale;
- lumea spirituală și eliberarea;
- traseele pentru copii și adolescenți;
- traseele pentru soți și părinți;
- relații, sexualitate, limite, consimțământ și siguranță;
- partener necredincios și copil îndepărtat.

Aceste protecții nu reprezintă aprobarea finală a fiecărei lecții.

## Revizie umană încă necesară

Pentru toate cele 259 de lecții trebuie verificate manual:

- fidelitatea citatelor biblice și traducerea folosită;
- parafrazele care pot părea citate exacte;
- concordanța dintre `anchorRefs`, `memoryVerseRef` și `scripture.ref`;
- neutralitatea denominațională;
- formulările categorice și promisiunile pastorale;
- diagnosticul spiritual, suferința psihică și tratamentul medical;
- abuzul, consimțământul, iertarea și planul de siguranță;
- siguranța copiilor;
- densitatea textului și lungimea bulelor;
- repetițiile și pașii practici;
- licențierea citatelor și permisiunile pentru surse externe.

## Statut editorial

- **Verificări automate:** active și verzi.
- **Corecții mecanice cunoscute:** aplicate.
- **Revizie pastorală și teologică integrală:** în desfășurare.
- **Aprobare finală a tuturor celor 259 de lecții:** încă neacordată.

## Regula de publicare

Un curs nou nu este considerat publicat doar pentru că fișierul există. Trebuie:

1. conectat la `current.ts`;
2. marcat `live`;
3. inclus în `LIBRARY_LESSONS`;
4. trecut prin verificările CI;
5. introdus în revizia editorială umană.
