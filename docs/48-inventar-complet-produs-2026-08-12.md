# Emanus - inventar complet de produs si repository

Data auditului: 12 august 2026

Repository: `vaduvel/Emanus`

Baza auditata: `origin/main` la `d61f87cd12158bcf8699fbe35c1545b22a264f3d`

Branch raport: `codex/full-product-inventory-2026-08-12`

## 1. Verdict executiv

Emanus nu este inca o aplicatie gata de lansare, dar are deja cea mai mare parte a fundamentului editorial si o parte importanta din motorul de produs. Situatia reala este:

| Zona | Ce exista | Stare reala |
| --- | --- | --- |
| Biblia Emanus | 66 carti, 1.189 capitole, 31.086 versete | Validata in PR #91, nu este inca in `main` |
| Biblia explicata VT | 39 carti, 929 capitole, 2.737 unitati explicative | Validata in PR #85 si inclusa in istoricul PR #91 |
| Biblia explicata NT | 27 carti, 260 capitole, 970 unitati explicative, legate de 7.941 versete | Validata in PR #89, separata de PR #91 |
| Porti si trasee pastorale | 10 camere, 41 usi pastorale, 3 intrari de explorare, 15 trasee, 103 lectii, 15 punti | Validat in PR #88; 4 trasee si 10 usi sunt intentionat blocate |
| Cele trei experiente zilnice | Devotional 365, Mesajul zilei, Pergament si Candela | Integrate in `main`; datele sunt locale, nu sincronizate in cloud |
| Biblioteca actuala | 13 rafturi, 55 cursuri, 259 lectii | Integrata in `main`; 44 cursuri live si 11 planificate |
| Cursuri suplimentare | 15 cursuri / 63 lectii in PR #10; 14 module / 72 lectii in PR #16 | Material bun, dar neintegrat si inca in review editorial |
| Drumul Emaus | Harta, lectii, ramificatii si progres exista in mai multe implementari | Nucleul exista; forma finala trebuie consolidata din PR #88, #4 si designul nou |
| Ucenicie | Arhitectura, surse, harta curriculara si 8 module Must Know | Documentata pe branch local; continutul runtime nu este scris/integrat |
| Gamificare | Motor XP, nivel, streak, badge, certificate, axe de crestere si unlock | Cod existent, dar nu este conectat coerent la biblioteca si la navigatia activa |
| Conturi si cloud | API, Prisma, Supabase pentru JourneyState, modele de progres/jurnal | Partial; identitatea si sincronizarea completa nu sunt production-ready |
| Comunitate, mentorat, familie | Modele, API si ecrane partiale | Majoritatea nu sunt conectate la routerul activ |
| Creator | Carta, sablon, reguli de validare si raft ascuns | Guvernanta exista; produsul de creator nu este construit |
| Audio si widgeturi native | Idei si metadate | Nu exista implementare audio sau widget nativ |

Concluzia operationala: produsul final imediat nu este `main`, ci combinatia controlata dintre **PR #91 + PR #89 rebasat + PR #88**, peste care se consolideaza playerul conversational, biblioteca si infrastructura existenta in `main`.

## 2. Ce este sursa de adevar

### 2.0 Metoda auditului

- Toate cele 91 PR-uri au fost inventariate dupa stare, draft/ready, branch, baza si titlu.
- Toate cele 98 ramuri remote au fost comparate cu `origin/main` dupa SHA, data, ahead/behind, stare merged si asociere cu PR.
- Toate cele 54 ramuri locale si toate worktree-urile au fost inventariate.
- Ramurile finale si ramurile cu munca unica au fost inspectate la nivel de fisiere, continut, scripturi de validare si integrare.
- Lanturile istorice deja continute intr-un PR final au fost clasificate ca superseded, nu recitite ca produse independente.
- `main`, PR #91, PR #89 si PR #88 au fost validate in checkout-uri curate, cu dependente instalate separat.

### 2.1 Starea Git

- `origin/main` este compilabil si are CI, dar nu contine inca toate integrarile finale.
- Repository-ul are 91 PR-uri: 68 deschise, 14 merged si 9 inchise.
- Dintre cele 68 deschise, 26 sunt draft.
- Exista 98 ramuri remote si 54 ramuri locale.
- Exista 66 worktree-uri locale, dintre care 44 sunt marcate `prunable`.
- Checkout-ul principal `/Users/vaduvageorge/Desktop/emanus` este pe `pr-83`, la 147 commituri in urma si 110 inainte fata de `origin/main`.
- Acel checkout are 58 fisiere modificate si 21 intrari untracked de nivel superior. Contine modificari Biblia, scripturi de audit si artefacte generate care nu trebuie sterse sau presupuse integrate.

### 2.2 Regula recomandata

1. Nu se mai dezvolta pe checkout-ul murdar `pr-83`.
2. Se face backup separat al modificarilor locale si se clasifica in: deja incluse in PR-urile finale, unice si utile, generate/temporare.
3. Orice integrare noua porneste din `origin/main` curat.
4. PR-urile vechi in lant nu se mai merguiesc individual daca exista un PR final care le contine.

## 3. Biblia Emanus

### 3.1 Textul biblic complet - PR #91

PR #91, `codex/biblia-emanus-complete-publication`, este integrarea canonica propusa pentru Biblia Emanus completa:

- 66 de carti in canonul protestant;
- 1.189 capitole;
- 31.086 versete;
- VT: 39 carti, 929 capitole, 23.145 versete;
- NT: 27 carti, 260 capitole, 7.941 versete;
- runtime materializat pentru web;
- catalog NT aprobat;
- testele unitare, typecheck-ul si build-ul au trecut local in checkout curat;
- externalizarea corpusului reduce chunk-ul principal fata de implementarile vechi.

Validari executate pe PR #91:

- `pnpm check:biblia-emanus`: OK;
- 87 teste unitare: OK;
- materializare NT: 27/27, 260/260, 7.941/7.941;
- poarta runtime NT: OK;
- poarta publicare VT: OK;
- `pnpm typecheck`: OK;
- `pnpm build`: OK.

Observatie de guvernanta: manifestul intern pastreaza provenienta si licentele surselor lingvistice si ale materialelor auxiliare. Copy-ul public poate ramane cel stabilit pentru produs, dar afirmatiile juridice externe trebuie sa ramana separate de verdictul tehnic al CI.

### 3.2 Biblia explicata VT - PR #85

PR #85, `agent/biblia-explicata-vt-integration-clean`, contine:

- 39/39 carti;
- 929/929 capitole;
- 2.737 unitati explicative legate de textul Biblia Emanus VT;
- toate check-urile GitHub verzi;
- este stramos Git al PR #91, deci continutul lui nu trebuie integrat inca o data separat daca se merge-uieste PR #91.

### 3.3 Biblia explicata NT - PR #89

PR #89, `agent/biblia-explicata-nt-integration-clean`, contine:

- 27/27 carti;
- 260/260 capitole;
- 970/970 unitati source-first;
- 7.941 intrari de verset legate de Biblia Emanus NT finala;
- zero completari generice si zero relativizari editoriale detectate de gate-uri;
- status runtime `published` dupa materializarea canonica locala;
- typecheck si build verzi local.

PR #89 si PR #91 nu pot fi merguite orbeste. Simularea de merge a identificat conflicte in exact patru fisiere:

- `apps/web/src/screens/Bible.tsx`;
- `package.json`;
- `packages/shared/package.json`;
- `packages/shared/src/bible/types.ts`.

Ordinea corecta este PR #91, apoi rebase PR #89 peste noul `main`, rezolvarea celor patru conflicte in favoarea corpusului externalizat si rerularea tuturor gate-urilor Biblia Explicata NT.

### 3.4 Ce trebuie inchis dupa integrare

- PR-urile #17-25 sunt valuri sursa NT explicat si sunt depasite de #89.
- PR-urile #27-39 si #44 sunt etape vechi ale traducerii si sunt depasite de #91.
- PR-urile #46-82 sunt valuri VT explicat si sunt depasite de #85/#91.
- PR #83 este handoff-ul vechi de review NT si este depasit de #89/#91.
- PR-urile #40-43 contin deuterocanon, texte etiopiene si Qumran, in afara scopului actual de 66 de carti. Trebuie arhivate separat, nu amestecate cu Biblia canonica runtime.

## 4. Portile, traseele si Drumul Emaus

### 4.1 Integrarea principala - PR #88

PR #88, `codex/porti-runtime-integration`, este implementarea cea mai apropiata de forma actuala a produsului:

- 10 camere;
- 41 usi pastorale plus 3 intrari de explorare;
- 15 trasee;
- 103 lectii de traseu;
- 15 punti personalizate catre Drumul Emaus;
- harta interactiva `EmmausMap`;
- 11 trasee review-uite si 34 usi startabile;
- `check:porti`, typecheck si build trecute.

Traseele au intre 5 si 9 lectii. Majoritatea au 7 lectii.

Blocari editoriale intentionate:

- trasee: `path_divort`, `path_tristete`, `path_anxietate`, `path_legatura`;
- usi: anxietate, avort, tristete, divort, casnicie rece, inselat, conflict in familie, copil departe, cresterea copiilor si parinti varstnici.

Aceste blocari nu sunt bug-uri. Ele indica faptul ca materialul sensibil nu trebuie expus pana la finalizarea review-ului pastoral si de siguranta.

### 4.2 PR #84

PR #84 este explicit un banc de test si titlul spune `NU SE FACE MERGE`. Continutul lui este stramos al PR #88. Dupa integrarea #88 trebuie inchis, nu merguit.

### 4.3 PR #4 - playerul conversational si infrastructura

PR #4 contine multa infrastructura utila:

- player conversational modern;
- alegeri si ramificatii;
- livrare de continut prin Supabase;
- backup cloud;
- siguranta pentru criza;
- incarcare lazy a Bibliei;
- cursuri interactive de formare si recuperare.

Totusi, este vechi, mare si in conflict cu `main`. Nu trebuie merguit integral. Se extrag selectiv componentele care lipsesc dupa integrarea #91/#89/#88, se porteaza peste arhitectura curenta si apoi PR #4 se inchide.

### 4.4 Forma vizuala finala

Implementarea tehnica a hartii exista, dar designul final stabilit este mai bogat: o harta ilustrata, explorabila, cu zone dezvaluite progresiv, statii SVG, stare curenta iluminata si continut viitor ascuns. Lista verticala de pasi nu trebuie sa fie experienta principala.

## 5. Cele trei experiente zilnice

PR #5 este merged in `main` si a livrat:

### 5.1 Devotional 365

- 365 zile scrise;
- verset, meditatie, intrebare, rugaciune si pas practic;
- progres local;
- reluare fara penalizare si fara presiune de streak.

### 5.2 Mesajul zilei

- 193 carduri in catalogul curent;
- alegere dupa stare;
- export imagine si share;
- link public;
- regula de nerepetare.

### 5.3 Pergament si Candela

- experienta de dimineata si seara;
- 34 versete organizate pe 7 sectiuni/stari;
- jurnal scurt seara;
- animatii si schimbare dupa ora.

### 5.4 Limitarea comuna

Starea acestor experiente este salvata in `localStorage`. Ele functioneaza offline, dar nu au sincronizare intre dispozitive si nu sunt parte dintr-un cont utilizator production-ready.

## 6. Biblioteca de cursuri

### 6.1 Biblioteca integrata in `main`

Catalogul actual are:

- 13 rafturi;
- 55 cursuri;
- 44 cursuri live;
- 11 cursuri planificate;
- 259 lectii;
- toate ID-urile sunt unice si toate referintele de lectie se rezolva.

Rafturile acopera: temelia, intrebari mari, Cuvantul, rugaciunea, casa, viata zilnica, copii, creatori, identitate si vocatie, viata de barbat, viata de femeie, relatii/sexualitate/siguranta si lumea nevazuta/libertatea.

Lectiile nu sunt plain text. Modelul curent foloseste etape precum:

- hook;
- alegere;
- numirea luptei;
- Scriptura;
- adevar simplu;
- quiz;
- cum ajuta Dumnezeu;
- pas practic;
- verset de memorat;
- lume versus adevar;
- rugaciune;
- jurnal;
- check-in.

Problema principala este ca motorul de reward nu este conectat la acest catalog: cele 259 lectii actuale nu au pasi de reward, desi motorul de gamificare exista separat.

### 6.2 PR #10 - cursuri Nolan

PR #10 adauga 15 cursuri si 63 lectii conversationale, grupate in patru module:

- Dumnezeu si adevar;
- inima, caracter si alegeri;
- intelepciune si ucenicie;
- Hristos si speranta.

Lectiile includ alegeri, ramuri, Scriptura, quiz, aplicatie, jurnal, rugaciune, verset de memorat si declaratie de curs. PR-ul este draft si trebuie rebasat si revizuit inainte de integrare.

### 6.3 PR #16 - 72 teme Poonen

PR #16 contine 14 module si 72 lectii/teme. Toate sunt `in_review` si nu sunt legate de biblioteca runtime. Trebuie pastrate cerintele de trasabilitate a sursei si apoi convertite in schema actuala a bibliotecii.

### 6.4 Ramuri tematice fara PR final

- `agent/module-ocult-newage`: material pentru Mijlocitorul, New Age, vrajitorie si libertate spirituala. Ramura este veche si trebuie extrasa selectiv, nu merguita.
- `agent/transcrieri-nolan-emotional-baggage`: transcrieri si surse pentru bagaj emotional; material editorial, nu feature gata.
- `agent/biblia-explicata-vt-judecatori`: val vechi, depasit de integrarea VT explicata finala.

## 7. Ucenicie

Branch-ul local `codex/ucenicie-source-architecture` contine cinci commituri peste PR #88 si aproximativ 2.600 de linii de documentatie si guvernanta. Exista:

- arhitectura source-first;
- audit al canalelor si surselor;
- control de fidelitate semantica;
- reguli pentru transcripturi si reformulare;
- model de stare, harta, bucla zilnica si retentie;
- backlog curricular Must Know.

Cele opt module Must Know propuse sunt:

1. De ce am nevoie de mantuire.
2. Ce a facut Isus la cruce si prin inviere.
3. Cum primesc mantuirea.
4. Ce inseamna sa apartin lui Hristos.
5. Cum umblu in mantuire.
6. Cuvantul, rugaciunea si Duhul Sfant.
7. Biserica, botezul si Cina Domnului.
8. Rod, slujire si trimitere.

Starea reala a Uceniciei este `source_mapping`: avem arhitectura si sursele, dar nu avem inca un curriculum runtime complet. Nu trebuie prezentata utilizatorului ca feature terminat.

## 8. Gamificare si Centrul de dezvoltare

### 8.1 Ce exista

Motorul din shared suporta:

- XP si nivel;
- streak;
- badge-uri;
- certificate;
- axe de crestere;
- deblocarea modulelor;
- eligibilitate pentru mentorat.

Prisma are modele pentru progres, stare de crestere, jurnal si comunitate. Exista un Dashboard care afiseaza streak, badge-uri, radar de crestere, certificate si mentor eligibility.

### 8.2 Ce lipseste

- Dashboard-ul nu este rutat in aplicatia activa.
- Biblioteca actuala nu emite consecvent reward-uri.
- Nu exista o economie coerenta intre lectii, trasee, practici si Centrul de dezvoltare.
- Nu exista o regula unica de progres intre localStorage, API, Prisma si Supabase.
- Gamificarea trebuie sa incurajeze practica reala, nu acumularea artificiala de puncte.

### 8.3 Branch-uri de design utile

- `spec/drumul-emaus`: doua commituri de specificatie pentru centru de progres, algoritm, ilustratii si harta vizuala. Ramura este veche, dar documentatia poate fi portata.
- Designurile Figma trebuie folosite ca tinta vizuala, nu ca sursa de stare sau logica.

## 9. Conturi, cloud, comunitate si mentorat

### 9.1 Backend existent

Monorepo-ul contine:

- React/Vite PWA;
- API Express;
- Prisma/DB;
- pachet shared pentru continut;
- shell Capacitor.

API-ul are rute pentru lectii, progres, diagnostic, dashboard, mentorat, recomandari, crestere, rugaciune, Ebenezer, familie, criza, comunitate si push.

### 9.2 Riscuri production

- API-ul accepta un `x-user-id` arbitrar si foloseste implicit un utilizator demo; nu exista middleware de autentificare verificata end-to-end.
- Sesiunea web foloseste inca date locale ca stare de autentificare.
- Supabase sincronizeaza doar o parte din JourneyState; localStorage ramane sursa principala pentru multe ecrane.
- Bookmark-urile Biblia, istoricul, intrebarile, notitele si experientele zilnice nu au o memorie cloud comuna.
- Branch-ul inchis `codex/bible-cloud-sync` contine o implementare partiala utila, dar este vechi si legat de vechiul corpus RCCV. Se extrage doar logica independenta de continut.
- Fallback-ul API fara baza de date expune doar un seed minim; nu reprezinta produsul complet.

### 9.3 Ecrane existente, dar inactive

Exista ecrane pentru Auth, Categories, Community, Dashboard, Ebenezer, Family, Mentorat, Onboarding, GrowthOnboarding, PrayerCoach si Recommendation. Ele nu sunt toate montate in routerul activ si nu trebuie numarate ca feature-uri livrate.

## 10. Creator

Exista fundatia editoriala:

- sablon de curs cu 12 campuri;
- carta doctrinara;
- angajament pentru creator;
- reguli de siguranta si validare;
- deep-link-uri pe usa;
- raft de creator ascuns/gated in biblioteca.

Nu exista inca:

- dashboard creator;
- upload si management media;
- workflow draft -> review -> approved -> published;
- preview complet;
- moderare si audit in UI;
- continut pilot publicat in raftul Creator.

Verdict: guvernanta este documentata, produsul Creator nu este construit.

## 11. Design system, navigatie si runtime mobil

### 11.1 Design system

Exista un pachet intern `apps/web/src/ds` cu Button, Card, Field, ListRow, Chip, Badge, Progress, Avatar, Segmented, Placeholder, Skeleton, Stack, Sheet, Toast si token-uri light/dark. Adoptarea lui pe ecranele vechi este partiala.

### 11.2 Navigatie

Routerul principal expune Azi, Intrare, Lectie, Rugaciuni, Biblioteca, Biblia, Intreaba, Final, Criza, Devotional, Pergament, Candela, Mesaj, Legamant si Design System.

Bottom navigation are acum patru destinatii active: Azi, Biblia, Intreaba si Rugaciuni. Tinta de produs are cinci: Azi, Biblia, Intreaba, Ai mei si Eu. Ecranele nu trebuie mapate artificial; `Ai mei` si `Eu` au nevoie de fluxuri reale conectate.

### 11.3 Mobil nativ, audio si widget

- Aplicatia este in primul rand PWA.
- `apps/mobile` este doar un shell Capacitor minim; proiectele iOS/Android native nu sunt versionate complet.
- Nu exista player audio, Media Session, speech synthesis sau catalog audio runtime.
- Nu exista widget iOS/Android pentru versetul zilei.
- Audio Biblia Emanus si Biblia explicata audio necesita pipeline de generare, QA, storage, manifest pe capitole, player si suport background.

## 12. Performanta

Build-ul `main` trece, dar are un chunk principal de aproximativ 1,16 MB minificat si un precache service worker de aproximativ 2,75 MiB. PR #88 ajunge la un chunk de continut de aproximativ 600 KB si precache de circa 3,15 MiB.

PR #91 demonstreaza directia corecta: corpusul Biblia este materializat in fisiere publice si chunk-ul principal scade la aproximativ 235 KB, cu precache de circa 1,61 MiB.

Regula de integrare: corpusurile mari, explicatiile si cursurile trebuie incarcate lazy si versionate, nu importate integral in bundle-ul initial.

### 12.1 Matrice de validare executata

| Checkout | Validari executate | Rezultat |
| --- | --- | --- |
| `origin/main` | install offline/frozen, typecheck, build | Verde |
| PR #91 | gate Biblia completa, 87 teste, materializare, runtime gates, typecheck, build | Verde local; GitHub are si o rulare duplicata anulata, nu un defect de cod |
| PR #89 | recovery, source-first, binding final, runtime gate, typecheck, build | Verde local; trebuie rerulat dupa rebase pe #91 |
| PR #88 | `check:porti`, typecheck, build | Verde local si in GitHub |

Nu a fost declarat un build combinat #91 + #89 + #88 deoarece #89 si #91 au conflictele descrise mai sus. Verdictul final de release se poate da numai dupa integrarea lor in aceeasi ramura.

## 13. Ordinea recomandata de executie

### Faza 0 - Protejarea muncii locale

1. Se arhiveaza checkout-ul murdar `pr-83` fara reset sau stergere.
2. Se compara cele 58 modificari si artefactele untracked cu PR #91/#89.
3. Se salveaza doar munca unica; fisierele generate se regenereaza din pipeline.
4. Se curata ulterior worktree-urile prunable numai dupa confirmarea backup-ului.

### Faza 1 - Biblia completa

1. Merge PR #91.
2. Rebase PR #89 peste noul `main`.
3. Rezolvare controlata a celor patru conflicte.
4. Rulare completa gate-uri Biblia, explained binding, typecheck si build.
5. Merge PR #89.
6. Inchidere PR-uri si ramuri istorice superseded.

### Faza 2 - Portile si Drumul Emaus

1. Rebase PR #88 peste Biblia integrata.
2. Rulare `check:porti`, typecheck, build si test mobil.
3. Merge PR #88.
4. Inchidere PR #84.
5. Portare selectiva din PR #4 a playerului, cloud content si sigurantei care lipsesc.

### Faza 3 - Biblioteca

1. Stabilizare schema unica de curs si lectie.
2. Rebase si review PR #10.
3. Transformare PR #16 din inventar editorial in module runtime.
4. Extractie selectiva din ramurile tematice.
5. Lazy loading pentru catalog si lectii.

### Faza 4 - Produsul utilizatorului

1. Autentificare reala si un singur ID verificat.
2. Sincronizare cloud pentru progres, Biblie, jurnal si experiente zilnice.
3. Navigatie finala cu Azi, Biblia, Intreaba, Ai mei si Eu.
4. Conectarea Dashboard/Centrului de dezvoltare.
5. Gamificare legata de practici verificabile, nu doar completari.
6. Comunitate, mentorat si rugaciune cu politici de siguranta.

### Faza 5 - Ucenicie si extensii

1. Integrarea documentatiei `codex/ucenicie-source-architecture`.
2. Scrierea si validarea celor opt module Must Know.
3. Deblocare numai dupa finalul Drumului Emaus.
4. Creator pilot, apoi workflow complet.
5. Audio Biblia Emanus si Biblia explicata.
6. Shell nativ si widgeturi.

## 14. Definitia reala de "aplicatia este in picioare"

Aplicatia poate fi considerata baza integrata numai cand:

- PR #91, #89 si #88 sunt in acelasi `main`;
- build-ul si toate gate-urile sunt verzi pe combinatia finala, nu separat;
- login-ul produce o identitate verificata;
- progresul este sincronizat si recuperabil;
- cele cinci taburi deschid functii reale;
- playerul lectiilor ruleaza toate tipurile de pas si ramificatie;
- Biblia si explicatiile se incarca lazy;
- portile blocate nu pot fi accesate accidental;
- utilizatorul poate parcurge cap-coada Poarta -> traseu -> punte -> Drumul Emaus -> Ucenicie;
- continutul sensibil are fallback de criza si iesire sigura;
- testele mobile acopera onboarding, reluare, offline si schimbare de dispozitiv.

## 15. Clasificarea PR-urilor

### Integrare imediata

- #91 Biblia Emanus completa si Biblia explicata VT.
- #89 Biblia explicata NT, dupa rebase pe #91.
- #88 Porti, trasee si punti, dupa Biblia integrata.

### Extractie selectiva

- #4 player conversational si infrastructura Supabase/siguranta.
- #10 cursurile Nolan.
- #16 modulele tematice Poonen.
- #13 cloud Bible, numai logica independenta de RCCV.

### Nu se merge-uiesc direct

- #84 banc de test.
- #17-25, #27-39, #44 si #46-83: valuri istorice/superseded.
- #40-43: corpusuri in afara scope-ului canonic curent.

## Anexa A - toate PR-urile

Format: `# | stare | mod | branch | titlu`.

| # | Stare | Mod | Branch | Titlu |
| ---: | --- | --- | --- | --- |
| #91 | OPEN | ready | `codex/biblia-emanus-complete-publication` | Biblia Emanus completă — VT + NT gata de folosit în aplicație |
| #90 | MERGED | ready | `codex/pr85-runtime-fix` | Fix runtime Biblia Emanus pentru PR #85 |
| #89 | OPEN | ready | `agent/biblia-explicata-nt-integration-clean` | Biblia Emanus NT Explicată — GATA DE FOLOSIT (27/27 · 260/260 · 970/970) |
| #88 | OPEN | ready | `codex/porti-runtime-integration` | Integrează porțile pastorale și punțile în runtime |
| #87 | MERGED | ready | `codex/vt-publication-repair` | Biblia Emanus VT: gata pentru publicare |
| #86 | MERGED | ready | `agent/biblia-explicata-vt-final-audit` | VT: final explanation audit guards |
| #85 | OPEN | ready | `agent/biblia-explicata-vt-integration-clean` | Biblia Emanus VT Explicată — GATA DE PUBLICAT (39/39 · 929/929) |
| #84 | OPEN | draft | `agent/porti-continut-v1` | [BANC DE TEST — NU SE FACE MERGE] Porti: continut nou pentru usile greutate, temelie si divort |
| #83 | OPEN | draft | `codex/nt-ai-review-handoff` | NT editorial review — 260/260 chapters; final approval gate pending |
| #82 | OPEN | ready | `agent/biblia-explicata-vt-complet` | Biblia explicată VT: acoperire finală 39/39 |
| #81 | OPEN | ready | `agent/biblia-explicata-vt-maleahi` | Biblia explicată VT: Maleahi complet |
| #80 | OPEN | ready | `agent/biblia-explicata-vt-zaharia` | Biblia explicată VT: Zaharia complet |
| #79 | OPEN | ready | `agent/biblia-explicata-vt-hagai` | Biblia explicată VT: Hagai complet |
| #78 | OPEN | ready | `agent/biblia-explicata-vt-tefania` | Biblia explicată VT: Țefania complet |
| #77 | OPEN | ready | `agent/biblia-explicata-vt-habacuc` | Biblia explicată VT: Habacuc complet |
| #76 | OPEN | ready | `agent/biblia-explicata-vt-naum` | Biblia explicată VT: Naum complet |
| #75 | OPEN | ready | `agent/biblia-explicata-vt-mica` | Biblia explicată VT: Mica complet |
| #74 | OPEN | ready | `agent/biblia-explicata-vt-iona` | Biblia explicată VT: Iona complet |
| #73 | OPEN | ready | `agent/biblia-explicata-vt-obadia` | Biblia explicată VT: Obadia complet |
| #72 | OPEN | ready | `agent/biblia-explicata-vt-amos` | Biblia explicată VT: Amos complet |
| #71 | OPEN | ready | `agent/biblia-explicata-vt-ioel` | Biblia explicată VT: Ioel complet |
| #70 | OPEN | ready | `agent/biblia-explicata-vt-osea` | Biblia explicată VT: Osea complet |
| #69 | OPEN | ready | `agent/biblia-explicata-vt-judecatori-v2` | Biblia explicată VT: Judecători v2 transcript-backed |
| #68 | OPEN | ready | `agent/biblia-explicata-vt-daniel` | Biblia explicată VT: Daniel complet |
| #67 | OPEN | ready | `agent/biblia-explicata-vt-ezechiel` | Biblia explicată VT: Ezechiel complet |
| #66 | OPEN | ready | `agent/biblia-explicata-vt-plangerile` | Biblia explicată VT: Plângerile complet |
| #65 | OPEN | ready | `agent/biblia-explicata-vt-ieremia` | Biblia explicată VT: Ieremia complet |
| #64 | OPEN | ready | `agent/biblia-explicata-vt-isaia` | Biblia explicată VT: Isaia complet |
| #63 | OPEN | ready | `agent/biblia-explicata-vt-cantarea-cantarilor` | Biblia explicată VT: Cântarea Cântărilor complet |
| #62 | OPEN | ready | `agent/biblia-explicata-vt-eclesiastul` | Biblia explicată VT: Eclesiastul complet |
| #61 | OPEN | ready | `agent/biblia-explicata-vt-proverbe` | Biblia explicată VT: Proverbele complet |
| #60 | OPEN | ready | `agent/biblia-explicata-vt-psalmi` | Biblia explicată VT: Psalmii complet |
| #59 | OPEN | ready | `agent/biblia-explicata-vt-iov` | Biblia explicată VT: Iov complet |
| #58 | OPEN | ready | `agent/biblia-explicata-vt-estera` | Biblia explicată VT: Estera complet |
| #57 | OPEN | ready | `agent/biblia-explicata-vt-neemia` | Biblia explicată VT: Neemia complet |
| #56 | OPEN | ready | `agent/biblia-explicata-vt-ezra` | Biblia explicată VT: Ezra complet |
| #55 | OPEN | ready | `agent/biblia-explicata-vt-2-cronici` | Biblia explicată VT: 2 Cronici complet |
| #54 | OPEN | ready | `agent/biblia-explicata-vt-1-cronici` | Biblia explicată VT: 1 Cronici complet |
| #53 | OPEN | ready | `agent/biblia-explicata-vt-2-imparati` | Biblia explicată VT: 2 Împărați complet |
| #52 | OPEN | ready | `agent/biblia-explicata-vt-1-imparati` | Biblia explicată VT: 1 Împărați complet |
| #51 | OPEN | ready | `agent/biblia-explicata-vt-2-samuel` | Biblia explicată VT: 2 Samuel complet |
| #50 | OPEN | ready | `agent/biblia-explicata-vt-1-samuel` | Biblia explicată VT: 1 Samuel complet |
| #49 | MERGED | ready | `agent/pr40-repair-remaining-3` | Repair Didascalia, Temple Scroll and Additional Psalms |
| #48 | OPEN | ready | `agent/biblia-explicata-vt-rut` | Biblia explicată VT: Rut complet |
| #47 | CLOSED | ready | `agent/pr40-publish-61-esg-fix` | Trigger repaired PR40 61-work publication |
| #46 | OPEN | draft | `agent/biblia-explicata-vt-continuare` | DRAFT — Judecători de refăcut strict după transcriere |
| #45 | OPEN | ready | `agent/transcrieri-poonen-VT` | Transcrieri Vechiul Testament (Poonen) - Numeri, Deuteronom, Iosua |
| #44 | OPEN | ready | `agent/complete-new-testament` | Noul Testament complet - Marcu, Matei, Ioan și module aferente |
| #43 | MERGED | ready | `agent/biblia-emanus-pr40-final` | Publish the 61 verified PR40 works |
| #42 | CLOSED | draft | `agent/biblia-emanus-all-pr40-rebuild` | Rebuild and publish every authentic work from PR #40 |
| #41 | OPEN | draft | `agent/biblia-emanus-ot-repair5` | Repair and publish remaining Old Testament and verified deuterocanon |
| #40 | OPEN | draft | `agent/biblia-emanus-ot-and-apocrypha` | Biblia Emanus — Old Testament, Deuterocanon, Ethiopian Apocrypha & Qumran (64 books, 1,450 chapters) |
| #39 | MERGED | ready | `agent/biblia-emanus-nt-repair` | Publish repaired Biblia Emanus New Testament — audit 4.0 |
| #38 | CLOSED | draft | `agent/biblia-emanus-nt-audit3` | [SUPERSEDED by #39] Biblia Emanus NT audit 3.0 |
| #37 | CLOSED | draft | `codex/biblia-emanus-new-testament` | [SUPERSEDED by #39] Biblia Emanus New Testament draft |
| #36 | MERGED | ready | `agent/biblia-emanus-main-integration` | Integrate Biblia Emanus 2.0 into main |
| #35 | OPEN | draft | `agent/biblia-emanus-ot-audit2` | Upgrade Pentateuh books to Biblia Emanus audit engine 2.0 |
| #34 | OPEN | draft | `agent/biblia-emanus-pentateuh` | Integrate Biblia Emanus — Pentateuh |
| #33 | OPEN | ready | `codex/biblia-emanus-editorial-gate` | Finalize automated Biblia Emanus audit for Genesis and Joshua |
| #32 | OPEN | draft | `agent/biblia-emanus-iosua` | Audit and publish Biblia Emanus — Iosua |
| #31 | OPEN | draft | `agent/biblia-emanus-exodul` | Audit and publish Biblia Emanus — Exodul |
| #30 | OPEN | draft | `agent/biblia-emanus-leviticul` | Audit and publish Biblia Emanus — Leviticul |
| #29 | OPEN | draft | `agent/biblia-emanus-numeri` | Audit and publish Biblia Emanus — Numeri |
| #28 | OPEN | draft | `agent/biblia-emanus-deuteronomul` | Audit and publish Biblia Emanus — Deuteronomul |
| #27 | OPEN | draft | `agent/biblia-emanus` | Start Biblia Emanus Romanian translation |
| #26 | CLOSED | draft | `agent/complete-new-testament` | [LEGACY ARCHIVE] RCCV New Testament app catalog and CFC lessons |
| #25 | OPEN | draft | `agent/1-tesaloniceni` | Add 1 Tesaloniceni from Zac Poonen source series |
| #24 | OPEN | draft | `agent/coloseni` | Add Coloseni from Zac Poonen source series |
| #23 | OPEN | draft | `agent/filipeni` | Add Filipeni from Zac Poonen source series |
| #22 | OPEN | draft | `agent/efeseni` | Add Efeseni from Zac Poonen source series |
| #21 | OPEN | draft | `agent/galateni` | Add Galateni from Zac Poonen source series |
| #20 | OPEN | draft | `agent/2-corinteni` | Add 2 Corinteni from Zac Poonen source series |
| #19 | OPEN | draft | `agent/1-corinteni` | Add 1 Corinteni from Zac Poonen source series |
| #18 | OPEN | draft | `agent/romani` | Add Romani from Zac Poonen source series |
| #17 | OPEN | draft | `agent/fapte-apostolilor` | Add Faptele Apostolilor from Zac Poonen source series |
| #16 | OPEN | draft | `agent/module-teme-poonen` | feat(module): teme noi - maparea celor 72 si primul modul |
| #15 | OPEN | draft | `agent/integrate-biblical-review` | Integrate Bible review, owner preview, safety and progress |
| #14 | CLOSED | draft | `agent/fix-trust-progress-safety` | fix: separate library progress and restore trust copy |
| #13 | CLOSED | draft | `codex/bible-cloud-sync` | feat(biblia): adauga memoria cloud si inboxul pastoral |
| #12 | CLOSED | ready | `codex/matei-verse-by-verse` | feat(biblia): Matei complet si integrarea Ioan |
| #11 | OPEN | draft | `draft/ioan-kickoff` | feat(biblia): scrie Ioan 1-21 |
| #10 | OPEN | draft | `codex/nolan-short-courses` | Add 15 interactive biblical formation courses |
| #9 | MERGED | ready | `review/geneza-12-25-v2` | Revizie AI Geneza 12–25: certitudini, istorie și aplicații sensibile |
| #8 | MERGED | ready | `review/geneza-26-36` | Revizie doctrinara si pastorala Geneza 26-36 |
| #7 | MERGED | ready | `review/geneza-37-50` | Revizie editorială Geneza 37–50 |
| #6 | MERGED | ready | `codex/complete-nolan-playlist` | docs: completeaza playlistul Geneza si transcrierile lipsa |
| #5 | MERGED | ready | `spec/devotional-mesaj-borcan` | Devoțional 365 + Mesajul zilei + Pergament & Candelă (fazele A–G) |
| #4 | OPEN | ready | `codex/repair-lessons-player-platform` | Rebuild conversational lessons and Supabase content delivery |
| #3 | MERGED | ready | `codex/fix-ci-pnpm-version` | Fix pnpm setup in CI |
| #2 | MERGED | ready | `codex/fix-quotes-build` | fix: ghilimele romanesti, typecheck si lockfile |
| #1 | CLOSED | draft | `feat/phase-1-foundation` | Phase 1 — Fundația platformei (monorepo, model de date, API skeleton, seed adolescenți) |

## Anexa B - toate ramurile remote

Format: `branch | SHA | data | in urma | inainte | merged | PR`.

| Branch | SHA | Data | In urma | Inainte | Merged | PR |
| --- | --- | --- | ---: | ---: | --- | --- |
| `agent/1-corinteni` | `27f373ad` | 2026-08-03 | 166 | 223 | false | #19 OPEN draft |
| `agent/1-tesaloniceni` | `bceb0278` | 2026-08-03 | 166 | 336 | false | #25 OPEN draft |
| `agent/2-corinteni` | `e53e1c45` | 2026-08-03 | 166 | 241 | false | #20 OPEN draft |
| `agent/biblia-emanus` | `d36aeea0` | 2026-08-04 | 166 | 514 | false | #27 OPEN draft |
| `agent/biblia-emanus-all-pr40-rebuild` | `19f1c92c` | 2026-08-05 | 161 | 118 | false | #42 CLOSED draft |
| `agent/biblia-emanus-deuteronomul` | `1301c210` | 2026-08-04 | 166 | 533 | false | #28 OPEN draft |
| `agent/biblia-emanus-exodul` | `6f5bf9f1` | 2026-08-04 | 166 | 555 | false | #31 OPEN draft |
| `agent/biblia-emanus-iosua` | `5501d0b6` | 2026-08-04 | 166 | 549 | false | #32 OPEN draft |
| `agent/biblia-emanus-leviticul` | `196b6fc2` | 2026-08-04 | 166 | 563 | false | #30 OPEN draft |
| `agent/biblia-emanus-main-integration` | `8ac318f4` | 2026-08-05 | 163 | 5 | false | #36 MERGED |
| `agent/biblia-emanus-nt-audit3` | `e288d966` | 2026-08-05 | 162 | 111 | false | #38 CLOSED draft |
| `agent/biblia-emanus-nt-repair` | `53834f32` | 2026-08-05 | 162 | 157 | false | #39 MERGED |
| `agent/biblia-emanus-numeri` | `06bff6f4` | 2026-08-04 | 166 | 534 | false | #29 OPEN draft |
| `agent/biblia-emanus-ot-and-apocrypha` | `5a958c99` | 2026-08-05 | 166 | 544 | false | #40 OPEN draft |
| `agent/biblia-emanus-ot-audit2` | `46d48ccb` | 2026-08-05 | 166 | 570 | false | #35 OPEN draft |
| `agent/biblia-emanus-ot-repair5` | `b201aa22` | 2026-08-05 | 161 | 77 | false | #41 OPEN draft |
| `agent/biblia-emanus-pentateuh` | `056e015e` | 2026-08-05 | 166 | 520 | false | #34 OPEN draft |
| `agent/biblia-emanus-pr40-final` | `c0baa701` | 2026-08-06 | 161 | 272 | false | #43 MERGED |
| `agent/biblia-emanus-pr40-wave6` | `7aa32b87` | 2026-08-06 | 161 | 200 | false | - |
| `agent/biblia-explicata-nt-integration-clean` | `6ec6ae93` | 2026-08-12 | 12 | 856 | false | #89 OPEN |
| `agent/biblia-explicata-vt-1-cronici` | `a14dafdc` | 2026-08-07 | 166 | 512 | false | #54 OPEN |
| `agent/biblia-explicata-vt-1-imparati` | `9a77c744` | 2026-08-06 | 166 | 502 | false | #52 OPEN |
| `agent/biblia-explicata-vt-1-samuel` | `36e2b467` | 2026-08-06 | 166 | 477 | false | #50 OPEN |
| `agent/biblia-explicata-vt-2-cronici` | `5b00aeb9` | 2026-08-07 | 166 | 514 | false | #55 OPEN |
| `agent/biblia-explicata-vt-2-imparati` | `1d83b0e8` | 2026-08-07 | 166 | 508 | false | #53 OPEN |
| `agent/biblia-explicata-vt-2-samuel` | `3fb9bceb` | 2026-08-06 | 166 | 490 | false | #51 OPEN |
| `agent/biblia-explicata-vt-amos` | `402f70f4` | 2026-08-07 | 166 | 549 | false | #72 OPEN |
| `agent/biblia-explicata-vt-cantarea-cantarilor` | `790b8109` | 2026-08-07 | 166 | 530 | false | #63 OPEN |
| `agent/biblia-explicata-vt-complet` | `96e6a1fc` | 2026-08-07 | 166 | 720 | false | #82 OPEN |
| `agent/biblia-explicata-vt-continuare` | `f6dd169c` | 2026-08-06 | 166 | 468 | false | #46 OPEN draft |
| `agent/biblia-explicata-vt-daniel` | `f4da87d4` | 2026-08-07 | 166 | 540 | false | #68 OPEN |
| `agent/biblia-explicata-vt-eclesiastul` | `be9f8352` | 2026-08-07 | 166 | 528 | false | #62 OPEN |
| `agent/biblia-explicata-vt-estera` | `1d0e13a1` | 2026-08-07 | 166 | 520 | false | #58 OPEN |
| `agent/biblia-explicata-vt-ezechiel` | `b83d0285` | 2026-08-07 | 166 | 538 | false | #67 OPEN |
| `agent/biblia-explicata-vt-ezra` | `62f454af` | 2026-08-07 | 166 | 516 | false | #56 OPEN |
| `agent/biblia-explicata-vt-final-audit` | `937cce48` | 2026-08-08 | 147 | 478 | false | #86 MERGED |
| `agent/biblia-explicata-vt-habacuc` | `e038665f` | 2026-08-07 | 166 | 559 | false | #77 OPEN |
| `agent/biblia-explicata-vt-hagai` | `2fb33f28` | 2026-08-07 | 166 | 563 | false | #79 OPEN |
| `agent/biblia-explicata-vt-ieremia` | `27322354` | 2026-08-07 | 166 | 534 | false | #65 OPEN |
| `agent/biblia-explicata-vt-integration-clean` | `8a0109f7` | 2026-08-09 | 12 | 672 | false | #85 OPEN |
| `agent/biblia-explicata-vt-ioel` | `3e6f1f22` | 2026-08-07 | 166 | 547 | false | #71 OPEN |
| `agent/biblia-explicata-vt-iona` | `4535a996` | 2026-08-07 | 166 | 553 | false | #74 OPEN |
| `agent/biblia-explicata-vt-iov` | `c299017d` | 2026-08-07 | 166 | 522 | false | #59 OPEN |
| `agent/biblia-explicata-vt-isaia` | `65676bc3` | 2026-08-07 | 166 | 532 | false | #64 OPEN |
| `agent/biblia-explicata-vt-judecatori` | `9537d665` | 2026-08-04 | 166 | 46 | false | - |
| `agent/biblia-explicata-vt-judecatori-v2` | `dce081e0` | 2026-08-07 | 166 | 542 | false | #69 OPEN |
| `agent/biblia-explicata-vt-maleahi` | `c7912260` | 2026-08-07 | 166 | 567 | false | #81 OPEN |
| `agent/biblia-explicata-vt-mica` | `5cd0466c` | 2026-08-07 | 166 | 555 | false | #75 OPEN |
| `agent/biblia-explicata-vt-naum` | `1322f22c` | 2026-08-07 | 166 | 557 | false | #76 OPEN |
| `agent/biblia-explicata-vt-neemia` | `3c87e31f` | 2026-08-07 | 166 | 518 | false | #57 OPEN |
| `agent/biblia-explicata-vt-obadia` | `3e87458b` | 2026-08-07 | 166 | 551 | false | #73 OPEN |
| `agent/biblia-explicata-vt-osea` | `3563a5e4` | 2026-08-07 | 166 | 545 | false | #70 OPEN |
| `agent/biblia-explicata-vt-plangerile` | `95e8a3a6` | 2026-08-07 | 166 | 536 | false | #66 OPEN |
| `agent/biblia-explicata-vt-proverbe` | `cbfd5f60` | 2026-08-07 | 166 | 526 | false | #61 OPEN |
| `agent/biblia-explicata-vt-psalmi` | `0072f820` | 2026-08-07 | 166 | 524 | false | #60 OPEN |
| `agent/biblia-explicata-vt-rut` | `766ff653` | 2026-08-06 | 166 | 461 | false | #48 OPEN |
| `agent/biblia-explicata-vt-tefania` | `cf2396cb` | 2026-08-07 | 166 | 561 | false | #78 OPEN |
| `agent/biblia-explicata-vt-zaharia` | `b37369e6` | 2026-08-07 | 166 | 565 | false | #80 OPEN |
| `agent/coloseni` | `22acfd28` | 2026-08-03 | 166 | 315 | false | #24 OPEN draft |
| `agent/complete-new-testament` | `3d305d2b` | 2026-08-06 | 166 | 355 | false | #26 CLOSED draft |
| `agent/efeseni` | `a1624dcb` | 2026-08-03 | 166 | 278 | false | #22 OPEN draft |
| `agent/fapte-apostolilor` | `1c92fb1a` | 2026-08-03 | 166 | 188 | false | #17 OPEN draft |
| `agent/filipeni` | `80e28287` | 2026-08-03 | 166 | 295 | false | #23 OPEN draft |
| `agent/fix-trust-progress-safety` | `adac53a0` | 2026-08-02 | 163 | 4 | false | #14 CLOSED draft |
| `agent/galateni` | `1bb2d9e0` | 2026-08-03 | 166 | 259 | false | #21 OPEN draft |
| `agent/integrate-biblical-review` | `82e79f9f` | 2026-08-03 | 166 | 173 | false | #15 OPEN draft |
| `agent/module-ocult-newage` | `289f64aa` | 2026-08-03 | 166 | 56 | false | - |
| `agent/module-teme-poonen` | `a08a8137` | 2026-08-03 | 163 | 37 | false | #16 OPEN draft |
| `agent/porti-continut-v1` | `c25f267a` | 2026-08-08 | 32 | 67 | false | #84 OPEN draft |
| `agent/pr40-publish-61-esg-fix` | `f59cf807` | 2026-08-06 | 154 | 2 | false | #47 CLOSED |
| `agent/pr40-repair-remaining-3` | `4f70791b` | 2026-08-08 | 140 | 0 | true | #49 MERGED |
| `agent/pr43-disable-diagnostic-probes` | `010128fe` | 2026-08-06 | 161 | 267 | false | - |
| `agent/pr43-emergency-cleanup-windows` | `c632aa47` | 2026-08-06 | 161 | 262 | false | - |
| `agent/romani` | `2b4728db` | 2026-08-03 | 166 | 205 | false | #18 OPEN draft |
| `agent/transcrieri-nolan-emotional-baggage` | `436d3a51` | 2026-08-03 | 166 | 47 | false | - |
| `agent/transcrieri-poonen-VT` | `fd9442e6` | 2026-08-07 | 166 | 449 | false | #45 OPEN |
| `ci-sandbox` | `851336c2` | 2026-08-08 | 32 | 0 | true | - |
| `codex/bible-cloud-sync` | `8c9e44b8` | 2026-08-02 | 166 | 33 | false | #13 CLOSED draft |
| `codex/biblia-emanus-complete-publication` | `ede98abc` | 2026-08-11 | 12 | 673 | false | #91 OPEN |
| `codex/biblia-emanus-editorial-gate` | `ce18ae1b` | 2026-08-04 | 166 | 550 | false | #33 OPEN |
| `codex/biblia-emanus-new-testament` | `066c1a60` | 2026-08-05 | 166 | 560 | false | #37 CLOSED draft |
| `codex/complete-nolan-playlist` | `d4d9b635` | 2026-08-02 | 182 | 1 | false | #6 MERGED |
| `codex/fix-ci-pnpm-version` | `72d44a0d` | 2026-07-30 | 390 | 0 | true | #3 MERGED |
| `codex/fix-quotes-build` | `9734a825` | 2026-07-30 | 393 | 3 | false | #2 MERGED |
| `codex/matei-verse-by-verse` | `fe97a4de` | 2026-08-02 | 166 | 48 | false | #12 CLOSED |
| `codex/nolan-short-courses` | `22b67799` | 2026-08-02 | 209 | 21 | false | #10 OPEN draft |
| `codex/nt-ai-review-handoff` | `2ed6fda4` | 2026-08-10 | 147 | 525 | false | #83 OPEN draft |
| `codex/porti-runtime-integration` | `ad8510ab` | 2026-08-09 | 12 | 71 | false | #88 OPEN |
| `codex/repair-lessons-player-platform` | `e19f05df` | 2026-08-01 | 209 | 20 | false | #4 OPEN |
| `codex/supabase-course-content` | `ee78620b` | 2026-07-30 | 382 | 1 | false | - |
| `draft/ioan-kickoff` | `53926e98` | 2026-08-02 | 167 | 29 | false | #11 OPEN draft |
| `main` | `d61f87cd` | 2026-08-10 | 0 | 0 | true | - |
| `review/geneza-12-25-v2` | `80f882e7` | 2026-08-02 | 174 | 2 | false | #9 MERGED |
| `review/geneza-26-36` | `1f4a238c` | 2026-08-02 | 174 | 10 | false | #8 MERGED |
| `review/geneza-37-50` | `1286d3df` | 2026-08-02 | 174 | 4 | false | #7 MERGED |
| `spec/devotional-mesaj-borcan` | `60dd285f` | 2026-08-08 | 33 | 0 | true | #5 MERGED |
| `spec/drumul-emaus` | `65e30d88` | 2026-08-03 | 163 | 2 | false | - |
| `temp/genesis-txt-export` | `fdcaf5a6` | 2026-08-12 | 12 | 674 | false | - |

## Anexa C - toate ramurile locale

Format: `branch | SHA | data | upstream | ultimul commit`.

| Branch | SHA | Data | Upstream | Ultimul commit |
| --- | --- | --- | --- | --- |
| `agent/biblia-emanus` | `7e0f02be` | 2026-08-04 | `origin/agent/biblia-emanus` | merge: integrate Numeri (NUM 1-36) |
| `agent/biblia-emanus-deuteronomul` | `2f8edf6a` | 2026-08-04 | `origin/agent/biblia-emanus-deuteronomul` | feat(biblia-emanus): adauga Deuteronomul valul 7 (DEU 31-34) |
| `agent/biblia-emanus-exodul` | `e4bf47ee` | 2026-08-05 | `origin/agent/biblia-emanus-exodul` | fix(exodus): retranslate EXO 6-12 to pure Romanian (partial fix) |
| `agent/biblia-emanus-leviticul` | `3007dda4` | 2026-08-04 | `origin/agent/biblia-emanus-leviticul` | feat(biblia-emanus): adaugă Leviticul 26–27 |
| `agent/biblia-emanus-numeri` | `2fb383ba` | 2026-08-04 | `origin/agent/biblia-emanus-numeri` | feat(biblia-emanus): adauga capitolele 31-36 din Numeri |
| `agent/biblia-emanus-ot-and-apocrypha` | `f019bed1` | 2026-08-05 | `origin/agent/biblia-emanus-ot-and-apocrypha` | feat(bible): publish and audit complete OT, Deuterocanon, Ethiopian Apocrypha & Qumran (64 books, 1,450 chapters) |
| `agent/module-teme-poonen` | `3e9a5cd9` | 2026-08-03 | `origin/agent/module-teme-poonen` | docs: regula editoriala corecta (traducere fidela) si starea celor 14 module |
| `agent/pr40-repair-remaining-3` | `4f014295` | 2026-08-07 | `origin/agent/pr40-repair-remaining-3` | chore(pr40): bump repair trigger after ESG count fix |
| `agent/transcrieri-nolan-emotional-baggage` | `436d3a51` | 2026-08-03 | `origin/agent/transcrieri-nolan-emotional-baggage` | Manifest transcrieri Emotional Baggage |
| `agent/transcrieri-poonen-VT` | `fd9442e6` | 2026-08-07 | `origin/agent/transcrieri-poonen-VT` | fix(bible): corectează typo-ul 'isprvi' din exod39.ts |
| `codex/bible-cloud-sync` | `8c9e44b8` | 2026-08-02 | `origin/codex/bible-cloud-sync` | feat(biblia): adauga memoria cloud si inboxul pastoral |
| `codex/biblia-emanus-complete-publication` | `ede98abc` | 2026-08-11 | `origin/codex/biblia-emanus-complete-publication` | feat(biblia): publish complete Biblia Emanus canon |
| `codex/biblia-emanus-editorial-gate` | `ce18ae1b` | 2026-08-04 | `origin/codex/biblia-emanus-editorial-gate` | feat: finalizeaza auditul automat Biblia Emanus |
| `codex/biblia-emanus-new-testament` | `066c1a60` | 2026-08-05 | `origin/codex/biblia-emanus-new-testament` | feat(biblia-nt): traduceri române pentru 139 capitole NT (in_review) |
| `codex/complete-nolan-playlist` | `d4d9b635` | 2026-08-02 | `origin/codex/complete-nolan-playlist` | docs: completeaza playlistul Geneza si transcrierile lipsa |
| `codex/fix-ci-pnpm-version` | `72d44a0d` | 2026-07-30 | `origin/codex/fix-ci-pnpm-version` | fix(ci): build db package before typecheck |
| `codex/fix-quotes-build` | `9734a825` | 2026-07-30 | `origin/codex/fix-quotes-build` | chore: add pnpm lockfile |
| `codex/full-product-inventory-2026-08-12` | `d61f87cd` | 2026-08-10 | `origin/main` | ci(nt): test zero-credit local Qwen3 final editorial reviewer |
| `codex/harden-and-curriculum` | `9ec396da` | 2026-07-28 | `-` | docs: harta - usile devin 11 plus o iesire; separa pozitiile fata de Dumnezeu de momentele de intrare |
| `codex/matei-verse-by-verse` | `89065880` | 2026-08-02 | `origin/codex/matei-verse-by-verse` | Merge remote-tracking branch 'origin/codex/matei-verse-by-verse' into codex/matei-verse-by-verse |
| `codex/nolan-short-courses` | `22b67799` | 2026-08-02 | `origin/codex/nolan-short-courses` | feat: add interactive biblical formation courses |
| `codex/nt-agent-act` | `2260149c` | 2026-08-07 | `-` | Add native dispatch fallback for PR40 repair |
| `codex/nt-agent-general` | `2260149c` | 2026-08-07 | `-` | Add native dispatch fallback for PR40 repair |
| `codex/nt-agent-jhn` | `2260149c` | 2026-08-07 | `-` | Add native dispatch fallback for PR40 repair |
| `codex/nt-agent-luk` | `2260149c` | 2026-08-07 | `-` | Add native dispatch fallback for PR40 repair |
| `codex/nt-agent-mat` | `2260149c` | 2026-08-07 | `-` | Add native dispatch fallback for PR40 repair |
| `codex/nt-agent-mrk` | `2260149c` | 2026-08-07 | `-` | Add native dispatch fallback for PR40 repair |
| `codex/nt-agent-pastoral` | `2260149c` | 2026-08-07 | `-` | Add native dispatch fallback for PR40 repair |
| `codex/nt-agent-paul` | `2260149c` | 2026-08-07 | `-` | Add native dispatch fallback for PR40 repair |
| `codex/nt-editorial-documentation` | `66deaeab` | 2026-08-04 | `-` | docs(biblia): definește standardul editorial pentru NT |
| `codex/nt-final-verse-review` | `aa97c332` | 2026-08-11 | `origin/codex/nt-ai-review-handoff` | feat(biblia): publish final Biblia Emanus New Testament |
| `codex/nt-personal-review-wave-001` | `7be254ff` | 2026-08-09 | `-` | docs(nt): add personal review work report |
| `codex/nt-publication-repair` | `2260149c` | 2026-08-07 | `origin/main` | Add native dispatch fallback for PR40 repair |
| `codex/nt-versification-manifest` | `fc25e184` | 2026-08-04 | `-` | feat(biblia): fixeaza versificatia Noului Testament |
| `codex/ot-poetic-eccsng-20260807` | `8af677ee` | 2026-08-07 | `-` | chore: retrage VT canonic pentru audit strict |
| `codex/ot-poetic-job-20260807` | `8af677ee` | 2026-08-07 | `-` | chore: retrage VT canonic pentru audit strict |
| `codex/ot-poetic-pro-20260807` | `8af677ee` | 2026-08-07 | `-` | chore: retrage VT canonic pentru audit strict |
| `codex/ot-poetic-psa1-20260807` | `8af677ee` | 2026-08-07 | `-` | chore: retrage VT canonic pentru audit strict |
| `codex/ot-poetic-psa2-20260807` | `8af677ee` | 2026-08-07 | `-` | chore: retrage VT canonic pentru audit strict |
| `codex/ot-poetic-psa3-20260807` | `8af677ee` | 2026-08-07 | `-` | chore: retrage VT canonic pentru audit strict |
| `codex/porti-runtime-integration` | `ad8510ab` | 2026-08-09 | `origin/codex/porti-runtime-integration` | fix: intareste continutul pastoral si limitele de siguranta |
| `codex/pr85-runtime-fix` | `8d5ecb70` | 2026-08-09 | `origin/codex/pr85-runtime-fix` | ci: handle stacked VT pull requests |
| `codex/pr89-finalize-1786467585` | `6ec6ae93` | 2026-08-12 | `origin/agent/biblia-explicata-nt-integration-clean` | Materialize blocked NT review snapshots with canonical binding |
| `codex/repair-daily-features` | `7bca97c4` | 2026-08-02 | `-` | refactor(devotional): devotionalul e pentru toti, fara comutator de varsta |
| `codex/repair-lessons-player-platform` | `e19f05df` | 2026-08-01 | `origin/codex/repair-lessons-player-platform` | Merge remote-tracking branch 'origin/main' into codex/repair-lessons-player-platform |
| `codex/supabase-course-content` | `ee78620b` | 2026-07-30 | `origin/codex/supabase-course-content` | feat: deliver lesson content from Supabase |
| `codex/ucenicie-source-architecture` | `c21a03b1` | 2026-08-10 | `-` | docs: separă fidelitatea de parafrazarea mecanică |
| `codex/vt-publication-repair` | `21f48894` | 2026-08-09 | `origin/codex/vt-publication-repair` | feat: publica Biblia Emanus VT validata integral |
| `main` | `9ec396da` | 2026-07-28 | `origin/main` | docs: harta - usile devin 11 plus o iesire; separa pozitiile fata de Dumnezeu de momentele de intrare |
| `pr-83` | `c3e20a74` | 2026-08-07 | `-` | fix(biblia): complete AI editorial review for all 7,941 NT verses |
| `subagent-Agent-Biblia-Emanus---Deuteronomul--DEU--self-a7126995` | `9ec396da` | 2026-07-28 | `-` | docs: harta - usile devin 11 plus o iesire; separa pozitiile fata de Dumnezeu de momentele de intrare |
| `subagent-Agent-Biblia-Emanus---Exodul--EXO--self-cc671d95` | `9ec396da` | 2026-07-28 | `-` | docs: harta - usile devin 11 plus o iesire; separa pozitiile fata de Dumnezeu de momentele de intrare |
| `subagent-Agent-Biblia-Emanus---Leviticul--LEV--self-b79009f3` | `9ec396da` | 2026-07-28 | `-` | docs: harta - usile devin 11 plus o iesire; separa pozitiile fata de Dumnezeu de momentele de intrare |
| `subagent-Agent-Biblia-Emanus---Numeri--NUM--self-b539da83` | `9ec396da` | 2026-07-28 | `-` | docs: harta - usile devin 11 plus o iesire; separa pozitiile fata de Dumnezeu de momentele de intrare |
