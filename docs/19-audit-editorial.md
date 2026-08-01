# Audit editorial al conținutului Emanus

Ultima actualizare: 1 august 2026

## Scop

Acest document separă verificările automate de revizia umană. Un CI verde nu înseamnă că toate formulările teologice și pastorale au primit aprobarea finală.

## Catalog runtime

- 55 de cursuri în catalog;
- 54 vizibile și un curs creator ascuns;
- 44 de cursuri live;
- 11 cursuri planificate;
- 259 de lecții de bibliotecă și 61 de lecții de traseu;
- 320 de lecții unice în release, grupate în 53 de cursuri/trasee publicate.

Sursa runtime este `packages/shared/src/library/current.ts`.

## Verificări automate active

CI rulează acum:

1. `pnpm check:quotes` — blochează ghilimelele românești care rup șirurile TypeScript;
2. `pnpm check:typos` — blochează lista explicită de typo-uri cunoscute și raportează fișierul și linia;
3. `pnpm check:content` — auditează graful de importuri pornit din `current.ts`;
4. `pnpm validate:content-release` — validează manifestul exact care poate ajunge în Supabase;
5. `pnpm check:bible-catalog`;
6. `pnpm typecheck`;
7. `pnpm build`.

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

Validatorul de release verifică suplimentar:

- fiecare lecție are `anchorRefs`, `memoryVerseRef` și citate biblice ne-goale;
- fiecare referință citată sau memorată este acoperită de temeiurile lecției, inclusiv subintervale de versete;
- cele 41 de lecții sensibile declarate editorial primesc exact poarta de siguranță canonică;
- nicio lecție nu poate adăuga ori pierde o poartă de siguranță în afara politicii explicite;
- fiecare ramură obligatorie duce la un răspuns pastoral real;
- fiecare curs cere răspuns liber, selecție multiplă și declarație finală;
- un curs `live` care declară revizie doctrinară, pastorală, clinică sau de safeguarding nu se publică până când toate aprobările sunt în date.

## Probleme remediate

- auditul inițial scana și surse legacy; acum urmărește numai graful runtime;
- pragul auditului a fost calibrat la ID-urile care folosesc convenția `*_l<number>`; acesta este un prag de regresie, nu totalul catalogului;
- mesajele de eroare sunt publicate ca adnotări GitHub Actions;
- potrivirea falsă `rada` din cuvântul `radar` a fost eliminată;
- au fost corectate automat typo-urile cunoscute rămase în lecțiile despre pilde, har și veșnicie;
- workflow-ul temporar care a aplicat corecțiile a fost șters după utilizare;
- neconcordanțele dintre șapte versete memorate și `anchorRefs` au fost corectate;
- porțile de siguranță nu mai depind de copiere manuală în fiecare fișier, ci de `packages/shared/src/editorialPolicy.ts`.

## Cursuri cu protecții editoriale explicite

- rugăciuni contextuale;
- lumea spirituală și eliberarea;
- traseele pentru copii și adolescenți;
- traseele pentru soți și părinți;
- relații, sexualitate, limite, consimțământ și siguranță;
- partener necredincios și copil îndepărtat.

Aceste protecții nu reprezintă aprobarea finală a fiecărei lecții.

## Revizie umană încă necesară

Pentru toate cele 320 de lecții trebuie verificate manual:

- fidelitatea citatelor biblice și traducerea folosită;
- parafrazele care pot părea citate exacte;
- sensul și folosirea în context a referințelor; concordanța mecanică dintre `anchorRefs`, `memoryVerseRef` și `scripture.ref` este acum verificată în CI;
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
- **Aprobare finală a tuturor celor 320 de lecții:** încă neacordată.

## Regula de publicare

Un curs nou nu este considerat publicat doar pentru că fișierul există. Trebuie:

1. conectat la `current.ts`;
2. marcat `live`;
3. inclus în `LIBRARY_LESSONS`;
4. trecut prin verificările CI;
5. introdus în revizia editorială umană;
6. dacă declară `requiredReviews`, are toate valorile corespunzătoare în `approvedReviews`.

Un fișier de curs sensibil poate exista ca draft și poate trece verificările mecanice fără să devină public. Starea `planned`, lipsa `lessonIds` publice și poarta de revizie îl țin închis până la aprobarea reală; nu se înscriu aprobări fictive doar pentru a trece CI.
