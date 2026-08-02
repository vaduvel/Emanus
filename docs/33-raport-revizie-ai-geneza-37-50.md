# Raport de revizie AI — Geneza 37–50

Data: 2026-08-02

## Intinderea reviziei

Au fost citite integral capitolele `geneza37.ts`–`geneza50.ts`, dupa masura din `docs/29-raport-revizie-ai-geneza-1-11.md` si in limitele cartei doctrinare din `docs/14-carta-doctrinara.md`.

Revizia a urmarit in mod deosebit:

- presupuneri prezentate drept afirmatii ale textului;
- ebraica, istorie si cronologie formulate cu siguranta mai mare decat permit sursele;
- imagini de predica prezentate drept fapte;
- interpretari tipologice ori doctrinare prezentate drept singura citire;
- aplicatii sensibile care pot muta raspunderea asupra celui ranit;
- promisiuni largite dincolo de cuprinsul pasajului;
- afirmatiile editoriale deschise din Geneza 48–50.

## Rezultat

Au fost pregatite **34 de indreptari** in 13 fisiere de capitol. Registrul bisericesc, ritmul omiletic si explicatia duhovniceasca au fost pastrate; au fost schimbate numai formularile care cereau mai mult decat putea purta textul.

### Directii principale

- **Geneza 37:** haina lui Iosif si provenienta viselor sunt formulate cu rezerva ceruta de termenul ebraic si de naratiune.
- **Geneza 38:** motivul material atribuit lui Onan ramane posibilitate, nu fapt; gemenii nu mai devin promisiune universala de compensare; firul rosu nu mai este declarat drum direct spre Cruce.
- **Geneza 39:** sunt scoase presupunerile despre cresterea lui Iosif, iesirea lui complet dezbracat si formularea care putea pune asupra victimei raspunderea pentru izolarea in care a fost hartuita.
- **Geneza 40–41:** cererea de ajutor a lui Iosif nu mai este descrisa ca sprijinire gresita pe om; cronologia si afirmatiile despre Egipt sunt temperate; salvarea prin foamete nu este restransa numai la casa lui Iacov.
- **Geneza 42–44:** motivele lui Iosif si alegerea lui Simeon sunt prezentate ca lecturi ale naratiunii, nu ca verdicte; promisiunile largite si detaliile atribuite economului sunt restranse la ce spune textul.
- **Geneza 45:** iertarea lui Iosif nu mai este transformata intr-o regula care ar cere ascunderea abuzului ori renuntarea la martori si ajutor; legatura mesianica ramane lectura canonica explicita.
- **Geneza 46:** este corectata afirmatia ca Avraam primise interdictie sa mearga in Egipt; diferenta 70/75 este legata de traditiile textuale, nu simplificata excesiv.
- **Geneza 47:** foametea este recunoscuta drept constrangere reala; politica lui Iosif nu mai este aparata prin comparatii economice nesigure; aplicatia despre har nu sterge costul platit de egipteni.
- **Geneza 48:** afirmatiile editoriale despre Rahela, Inger si cronologia lui Efraim raman talcuiri deschise, nu informatii din text.
- **Geneza 49:** sunt temperate superlativele istorico-literare, verdictul despre Ruben si pretentia ca interpretarea lui Silo ar fi fost uniforma dintotdeauna.
- **Geneza 50:** sunt corectate afirmatiile despre imbalsamare si pastrarea sicriului; imaginea sicriului vazut zilnic timp de patru sute de ani este marcata drept omiletica; providenta din viata lui Iosif nu este impusa drept explicatie gata facuta fiecarei suferinte.

## Rezerve ramase

1. Capitolul 47 ramane dificil moral si economic. Textul consemneaza politica lui Iosif, dar nu ofera un verdict explicit; revizia refuza atat condamnarea grabita, cat si apararea apologetica totala.
2. `Silo` din Geneza 49:10 ramane un termen disputat. Lectura mesianica este pastrata ca lectura crestina veche, nu ca unica posibilitate lexicala.
3. Identitatea `Ingerului` din Geneza 48:16 ramane deschisa. Legatura cu Fiul preintrupat poate fi mentionata, nu declarata de verset.
4. Tipologia Iosif–Hristos si Iuda–Hristos ramane folositoare canonic, dar este marcata drept tipologie, nu drept sens lexical explicit al fiecarui amanunt.
5. Capitolele raman `in_review`, conform procesului stabilit; revizia AI nu inlocuieste citirea si aprobarea umana dinaintea publicarii.

## Verificare

Modificarile sunt aplicate prin `scripts/review-geneza-37-50.py`, care valideaza fiecare potrivire si este idempotent. Fluxul de CI al ramurii ruleaza:

- `pnpm check:quotes`;
- `pnpm check:typos`;
- `pnpm build:shared`;
- `pnpm check:content`.
