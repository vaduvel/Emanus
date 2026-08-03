# Biblia explicata

## De ce

Toata lumea are Biblia in telefon. Nimeni nu o are explicata. Oamenii citesc si nu
inteleg, fiindca nimeni nu le sta alaturi la text. Emanus nu adauga inca o Biblie
in lista. Adauga Biblia cu explicatia deja langa verset.

Modelul de referinta este invatatura verset cu verset a pastorului Allen Nolan
(Cornerstone Fellowship, Tahlequah, Oklahoma): oprire pe fiecare sintagma, cuvantul
din ebraica sau greaca lamurit, contextul povestit, aplicatia la inima. Preluam
felul de a invata, nu formularea lui.

## Unde intra in aplicatie

**In tabul „Biblia\", al doilea din cele cinci taburi ale machetei.**

Macheta (`emanus-mockup.html`) prevede cinci taburi-verbe: Azi, Biblia, Intreaba,
Ai mei, Eu. Tabul „Biblia\" este marcat acolo drept **gaura majora**: README spune
ca „Cuvantul din Biblie este adevarul\", dar in aplicatie Biblia nu se poate
deschide. In cod nu exista niciun fisier `Bible*.tsx`, iar `router.tsx` nu are
nicio ruta de Biblie.

Deci nu se face un tab nou. **Biblia explicata este continutul care umple un tab
deja proiectat si inca gol.**

### Ecranele

| Ecran | Ruta | Ce contine |
| --- | --- | --- |
| Biblia — acasa | `/biblia` | Cartile scrise pana acum, unde ai ramas, cautare, intrarea pe durere |
| Capitol | `/biblia/:carte/:capitol` | Textul curat, cu explicatia pliata sub fiecare unitate |
| Unitate | in pagina capitolului | Verset, invatatura, cuvinte, trimiteri, „Pentru inima ta\" |

Actiunile de sub text, deja schitate in macheta: **Salveaza**, **Trimite**,
**Intreaba**. Butonul Intreaba duce conversatia in tabul „Intreaba\", cu versetul
ca punct de plecare.

Textul biblic ramane intotdeauna in strat propriu, vizibil separat de explicatie.
Cititorul trebuie sa vada dintr-o privire ce este Scriptura si ce este comentariu.

## Modelul de date

`packages/shared/src/bible/types.ts`

- `BibleBook` — cartea, cu blurb si capitole
- `BibleChapter` — titlu, rezumat, context literar, context istoric, unitati, rugaciune, statut
- `BibleUnit` — un verset sau un grup mic: `text`, `teaching`, `words`, `crossRefs`, `forYourHeart`
- `WordStudy` — cuvantul original, transliterarea, limba, intelesul
- `BibleStatus` — `draft` / `in_review` / `published`

Un capitol se deschide cititorului numai cand ajunge `published`, adica dupa ce a
fost citit de un om. Nu punem pe jumatate.

Modelul sta separat de `Lesson` si `Course`. Biblia explicata nu este un curs cu
pasi, XP si recompense. Este text de referinta cu straturi.

## Textul biblic

**Cornilescu, editia corectata (RCCV, 2013).** Ortografie moderna, domeniu public.
RCCV = Romanian Corrected Cornilescu Version; sursa de colationare:
https://github.com/seven1m/open-bibles (ron-rccv.usfx.xml).
Editia originala 1924 (ortografie veche) si editia revizuita (2014, VDC, sub
drepturi) nu se folosesc.

## Explicatia

Scrisa integral pentru Emanus. Ideile, faptele istorice si sensurile cuvintelor
ebraice si grecesti nu apartin nimanui; formularea unui autor apartine autorului.
Cercetam din surse, dar propozitiile sunt ale noastre.

## Registrul (obligatoriu)

Asezat, bisericesc, de amvon. Grav si cald. Adresare la persoana a doua singular,
dar cu respect.

Formule proprii:

- „Sa ne oprim aici si sa nu trecem mai departe cu usurinta\"
- „Ia aminte la...\" / „Sa luam bine seama\"
- „Se cuvine sa fim cinstiti cu textul\"
- „Domnul Isus\", „Sfanta Scriptura\", „Duhul Sfant\"
- „Pentru inima ta\" — titlul sectiunii de aplicatie

Nu se folosesc niciodata: expresii din vorbirea de fiecare zi, anglicisme, jargon,
formulari care fac textul sa sune „nou\".

## Structura unei unitati

1. Citatul biblic, ca bloc, neatins
2. Oprire pe fiecare sintagma
3. Cuvantul ebraic sau grecesc, cu transliterare si inteles simplu
4. Contextul istoric si cultural, povestit, nu insirat
5. Trimiteri la alte locuri din Scriptura
6. Semnificatia duhovniceasca
7. „Pentru inima ta\"
8. Rugaciune, la sfarsitul capitolului

## Ordinea de scriere

Hotarata impreuna cu autorul proiectului. Se merge pe rand, o carte terminata
inainte de a incepe alta.

### Intai

1. **Geneza, capitolele 1—50** — in lucru. Se duce pana la capat, fara sarituri.

### Dupa Geneza (se hotaraste ordinea exacta atunci)

2. **Ioan** — cea mai dorita. „Ioan e perfect sa il avem.\"
3. **Matei**
4. **Fapte, partile despre Pavel** — nu toata cartea, ci viata si drumurile lui
   Pavel, asa cum se vad in Fapte.

Cu acestea patru, spunea autorul proiectului, „e perfect ca inceput\".

### Mai departe, dupa nevoie

- **Levitic** — greu de inteles pentru cei mai multi, si tocmai de aceea de mare
  folos explicat: jertfele, curatirea, sfintenia, si cum arata toate spre Domnul
  Isus.
- **Proverbe** — intelepciunea pentru viata de fiecare zi.
- **Isaia** — proorocia si Robul Domnului.
- **Apocalipsa** — de scris cu multa masura, dupa ce restul stau in picioare.

Cele mai multe dintre acestea sunt si cartile pe care Allen Nolan le-a parcurs
verset cu verset: Geneza (studiu in 89 de parti, capitolele 1—50), Apocalipsa,
Exod, Levitic, cartile de intelepciune.

## Ce ramane de facut in cod

- `apps/web/src/screens/Bible.tsx` si ruta `/biblia` in `router.tsx`
- legarea in bara de cinci taburi (sarcina Codex, impreuna cu restul barei)
- cuplarea celor 38 de etichete de nevoi la intrarea pe durere
