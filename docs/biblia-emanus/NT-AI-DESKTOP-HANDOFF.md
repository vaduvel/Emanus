# NT AI Desktop Handoff

Acest document este handoff-ul complet pentru un agent desktop care trebuie să PREIA ȘI SĂ TERMINE integral revizia editorială AI a Noului Testament din proiectul Biblia Emanus.

Nu da doar un plan. Lucrează efectiv în repository, verifică starea reală, continuă revizia, rulează validările, fă commiturile și continuă carte după carte până la final.

## 1. Repository / PR / branch

Repository:
`vaduvel/Emanus`

PR de lucru:
`#83`

Branch:
`codex/nt-ai-review-handoff`

Runbook obligatoriu:
`docs/biblia-emanus/NT-AI-REVIEW-RUNBOOK.md`

Arhiva sursă fixată:
`docs/data/biblia-emanus/sources/nt-sblgnt-1.2.zip`

SHA256 așteptat:
`29b8762199eb87757ec36961097b817cb2b569557d95348a70fac66c0262f424`

Ținta completă a NT:
`7.941 versete`

IMPORTANT:
PR body este depășit și poate raporta încă 821/7.941.
NU folosi PR body drept sursă pentru progres.
Calculează progresul real din fișierele de capitol, metadata AI, jurnalele de review și git history.

Head verificat imediat înainte de acest handoff:
`a707a2721ba1645e74398a2e495f497b9f6814a4`

ÎNAINTE DE ORICE MODIFICARE, verifică dacă branch-ul a avansat de atunci.

## 2. Ce a fost făcut înainte de preluarea ta

Baseline-ul existent înaintea lucrării agentului anterior era:

`821 / 7.941` versete revizuite.

Cele 42 de capitole deja revizuite în acel baseline:

- 1JN 1–5
- 1PE 1–5
- 1TH 1–5
- 1TI 1–6
- 2JN 1
- 2PE 1–3
- 2TH 1–3
- 2TI 1–4
- 3JN 1
- COL 1–4
- JUD 1
- PHM 1
- TIT 1–3

Agentul anterior a continuat lucrarea pe același branch.

A revizuit complet FILIPENI / PHP 1–4:
`104 versete`.

Exemple de corecții făcute în Filipeni:

### PHP 1
- vv.16–17: ordinea și sensul conform SBLGNT;
- corectat defectul românesc din v.17;
- v.24 și v.30: reparată concordanța/pluralul.

### PHP 2
- vv.7–8: reparată o formulare/calchiere duplicată;
- v.22: corectat sensul sursei;
- analizate explicit `ἁρπαγμός` din v.6 și `ἐπέχοντες` din v.16.

### PHP 3
- v.16: eliminată extensia provenită din tradiția TR care nu este în textul principal SBLGNT;
- corectată sintaxa românească.

### PHP 4
- v.13: eliminată formularea TR/RP cu „Hristos” acolo unde SBLGNT are sensul „Cel care mă întărește”;
- v.23: eliminată terminația de tip TR și adus textul la SBLGNT: „cu duhul vostru”.

Un commit de referință din această muncă:
`bc183001a5b30cecf6f8cdd6066e9988416b1229` (PHP 2)

Un validator verde de referință pentru PHP 3:
- workflow run `31205433605`
- job `92955133368`

Ulterior au fost terminate prin același proces și:
- EFESENI / EPH
- EVREI / HEB
- IACOV / JAS

Ultimul total verificat la punctul de handoff:
`1.491 / 7.941` versete revizuite, aproximativ `18,8%`.

Rămâneau:
`6.450 versete`.

Următoarea carte era:
`GALATENI / GAL`.

ATENȚIE:
Acest număr este punctul de handoff, nu o presupunere pe care trebuie să o păstrezi orbește.

Primul tău pas este să recalculezi starea reală.
Dacă există commituri mai noi și GAL a fost parțial sau complet revizuit, NU dubla munca. Continuă de la primul capitol/verset nerevizuit real.

## 3. Ultima problemă tehnică observată

Ultimul workflow observat pe head-ul de mai sus:

Workflow:
`NT AI Review Validate`

Run:
`31236709224`

Job:
`93050425948`

Rezultat:
`FAILURE`

Era în zona pregătirii/continuării pentru GAL.

Nu presupune motivul eșecului.
Deschide logul și identifică exact cauza.

Dacă ai GitHub CLI, poți folosi de exemplu:

```bash
gh run view 31236709224 --repo vaduvel/Emanus
gh run view 31236709224 --repo vaduvel/Emanus --job 93050425948 --log
```

Dacă problema este doar infrastructura temporară folosită de agentul anterior și tu poți lucra direct local, nu este obligatoriu să continui acea infrastructură.

Desktop-ul are un avantaj: poți lucra direct cu fișierele, ZIP-ul și Git, fără să transformi fiecare operație editorială într-un GitHub Action.

## 4. Primii pași obligatorii

Lucrează pe un checkout curat.

Rulează:

```bash
git status --short
git fetch --all --prune
git switch codex/nt-ai-review-handoff
```

NU executa `reset --hard` sau alte comenzi distructive dacă există modificări locale necunoscute.

Inspectează mai întâi:

```bash
git status
git branch -vv
git log --oneline --decorate -n 100
```

Dacă branch-ul local este curat și poate fi actualizat fast-forward:

```bash
git pull --ff-only origin codex/nt-ai-review-handoff
```

Apoi citește INTEGRAL:

`docs/biblia-emanus/NT-AI-REVIEW-RUNBOOK.md`

Runbook-ul din branch este autoritatea procedurală.
Nu lucra după memoria acestui document dacă runbook-ul conține o cerință mai nouă și compatibilă cu scopul proiectului.

Verifică arhiva:

```bash
sha256sum docs/data/biblia-emanus/sources/nt-sblgnt-1.2.zip
```

Rezultatul TREBUIE să fie:

`29b8762199eb87757ec36961097b817cb2b569557d95348a70fac66c0262f424`

Dacă hash-ul nu corespunde, OPREȘTE modificările editoriale și investighează.

## 5. Recalculează starea reală

Înainte să traduci/revizuiești orice verset:

1. inspectează git history pentru commiturile de review;
2. inventariază jurnalele `docs/biblia-emanus/NT-AI-REVIEW-BATCH-*.md`;
3. inspectează metadata din fișierele NT `docs/data/biblia-emanus/*.json`;
4. determină exact care capitole au review AI valid;
5. însumează numărul exact de versete din acele capitole.

Nu considera „reviewed” doar pentru că un fișier a fost atins.
Capitolul trebuie să aibă metadata/evidence conform runbook-ului.

Compară rezultatul cu punctul de handoff:
`1.491 / 7.941`.

Dacă ai mai mult, continuă de la starea mai nouă.

## 6. Sursele editoriale

Textul grec de bază este:
`SBLGNT 1.2`.

Folosește și apparatus-ul SBLGNT pentru variante.

TR este DOAR martor textual pentru variante.
Nu transforma automat o citire specifică TR în textul principal dacă SBLGNT nu o susține.

Sursele românești/engleze auxiliare existente în snapshot sunt benchmark-uri de traducere/formulare, conform runbook-ului.

Pentru GAL, intrările din arhivă sunt:

- `sblgnt/text/GAL.txt`
- `sblgnt/apparatus/text/GAL.txt`
- `tr/GAL.usfm`
- `webp/GAL.usfm`
- `btf/GAL.usfm`
- `cornilescu1924/GAL.usfm`
- `biblia-libera/GAL.usfm`

Extrage sursele o singură dată pentru toată cartea, nu o dată pentru fiecare verset.

## 7. Regula editorială esențială

Pentru FIECARE verset nerevizuit:

- citește textul SBLGNT;
- verifică apparatus-ul unde există variantă;
- verifică TR doar ca martor textual;
- consultă benchmark-urile disponibile când sunt utile;
- compară textul românesc Emanus existent;
- corectează orice:
  - omisiune;
  - adaos;
  - negație greșită;
  - pronume greșit;
  - persoană/număr greșit;
  - sens lexical greșit;
  - relație sintactică greșită;
  - variantă textuală introdusă greșit;
  - calchiere românească nefirească;
  - formulare neclară;
  - repetiție accidentală;
  - acord defect;
  - punctuație care schimbă sensul.

Nu este suficient un script mecanic.
Review-ul trebuie să fie semantic, verset cu verset.

În același timp, NU rescrie inutil versetele bune.
Dacă textul Emanus este corect și natural, poate fi păstrat.

## 8. Despre traducerile românești existente

A existat o discuție despre accelerarea lucrării folosind o traducere românească deja existentă drept bază.

NU presupune că Cornilescu 1924 poate fi copiat liber doar pentru că este vechi.

În runbook-ul actual, traducerile auxiliare NU trebuie copiate automat.

Default-ul tău este:
**CONTINUĂ METODOLOGIA ACTUALĂ.**

Dacă vrei să schimbi metodologia și să folosești o traducere românească drept text de bază, fă asta NUMAI după ce:

1. verifici documentat că traducerea este public-domain sau are licență deschisă/permisivă compatibilă;
2. verifici drepturile de modificare și redistribuire;
3. documentezi atribuirea necesară;
4. modifici runbook-ul într-un commit separat de metodologie;
5. schimbi metadata astfel încât să spună adevărul: „base translation adapted/reviewed”, nu „traducere independentă”;
6. păstrezi SBLGNT drept autoritate textuală;
7. continui verificarea fiecărui verset împotriva grecei.

Nu face schimbarea de metodologie implicit sau pe jumătate.

## 9. Metadata fiecărui capitol

Respectă schema reală din repo și runbook.

Review-ul trebuie identificat explicit ca AI.

În munca precedentă au fost folosite concepte precum:

- reviewer type: `ai`
- engine: `Codex / GPT-5`
- method: `verse-by-verse-source-and-benchmark`
- runId: unic pentru batch/capitol

IMPORTANT:
Tu trebuie să fii factual în metadata.

Nu pretinde că ești exact motorul vechi dacă nu e adevărat.
Folosește identificarea cerută de schema/runbook-ul actual sau actualizează metadata în mod transparent dacă este necesar.

Nu marca drept „consultată” o sursă pe care nu ai consultat-o.

`editorialNotes` trebuie să descrie materialele decizii editoriale, nu să fie doar text generic repetat.

Elimină evidence stale dacă runbook-ul/scripturile actuale cer asta.

## 10. Digesturi

După modificarea unui capitol, recalculează digesturile cerute.

Funcțiile canonice se află în:
`scripts/check-biblia-emanus.py`

În special:
- `chapter_text_digest`
- `chapter_content_digest`

NU inventa hash-uri manual.

## 11. Journal pentru fiecare capitol

Creează journalul conform modelului existent:

`docs/biblia-emanus/NT-AI-REVIEW-BATCH-YYYY-MM-DD-<BOOK>.<chapter>.md`

De exemplu:
`docs/biblia-emanus/NT-AI-REVIEW-BATCH-2026-08-08-GAL.1.md`

Journalul trebuie să aibă evidence/decizie pentru FIECARE verset al capitolului, inclusiv cele pe care le-ai păstrat neschimbate.

Nu scrie doar „capitol verificat”.
Trebuie să fie trasabil faptul că fiecare verset a fost evaluat.

## 12. Status de publicare

PÂNĂ LA FINALUL ÎNTREGULUI NT:

`status` trebuie să rămână:
`"in_review"`

`public` trebuie să rămână:
`false`

Nu publica individual cărți sau capitole pe parcurs.
Nu schimba aceste valori doar pentru că un capitol este editorial terminat.

NT-ul este publicat/promovat atomic NUMAI după ce toate cele 7.941 de versete au fost revizuite și registrul final este complet.

## 13. Commiturile editoriale

Pentru fiecare capitol, commitul editorial trebuie să fie mic și izolat.

Ideal, exact două fișiere:

1. fișierul JSON al capitolului;
2. journalul acelui capitol.

Exemplu GAL 1:

- `docs/data/biblia-emanus/GAL.1.json`
- `docs/biblia-emanus/NT-AI-REVIEW-BATCH-2026-08-08-GAL.1.md`

NU folosi:

```bash
git add .
```

Folosește explicit:

```bash
git add docs/data/biblia-emanus/GAL.1.json \
        docs/biblia-emanus/NT-AI-REVIEW-BATCH-2026-08-08-GAL.1.md
```

Apoi verifică:

```bash
git diff --cached --name-only
```

Trebuie să vezi doar fișierele intenționate.

După commit:

```bash
git show --stat --oneline HEAD
git diff --name-only HEAD^ HEAD
```

Nu amesteca workflow-uri, scripturi temporare, queue regeneration, documentație sau alte capitole în același commit editorial.

Infrastructure/methodology/queue = commit separat.

## 14. Validările obligatorii după fiecare capitol

După FIECARE batch/capitol, rulează:

```bash
pnpm check:biblia-emanus
python3 scripts/check-biblia-emanus-romanian-quality.py
pnpm check:biblia-emanus-nt-withheld
python3 scripts/withhold-biblia-emanus-nt.py --check
pnpm check:biblia-emanus-nt-runtime
pnpm test:biblia-emanus
git diff --check
```

Dacă ai modificat/regenerat editorial review queue, rulează și:

```bash
python3 scripts/build-nt-editorial-review-queue.py --check
```

NU continua peste o validare roșie fără să înțelegi și să repari cauza.
Nu „faci verde” validatorul prin slăbirea lui doar pentru a trece.

## 15. Cum să lucrezi rapid fără să sacrifici review-ul

Pipeline-ul vechi era lent pentru că orchestram prea multe operații prin GitHub Actions.

Tu ești desktop agent, deci optimizează.

Pentru fiecare CARTE:

A. extrage toate sursele o singură dată;

B. încarcă toate capitolele cărții;

C. fă analiza semantică a întregii cărți într-un pass coerent;

D. pregătește corecțiile și journalele tuturor capitolelor;

E. aplică apoi SECVENȚIAL:

- capitol 1 → validări complete → commit izolat;
- capitol 2 → validări complete → commit izolat;
- etc.

Poți instala/cache-ui dependențele o singură dată pentru carte.

Dacă toate commiturile sunt făcute local și validate la starea lor, poți împinge branch-ul după un grup de commituri curate.
Dar fiecare capitol trebuie să rămână commit separat.

## 16. Unde continui acum

După ce recalculezi progresul:

Dacă GAL nu a fost încă revizuit, începe cu `GAL.1`.

GAL are 6 capitole.

Deschide:

- `docs/data/biblia-emanus/GAL.1.json`
- `docs/data/biblia-emanus/GAL.2.json`
- `docs/data/biblia-emanus/GAL.3.json`
- `docs/data/biblia-emanus/GAL.4.json`
- `docs/data/biblia-emanus/GAL.5.json`
- `docs/data/biblia-emanus/GAL.6.json`

și sursele GAL enumerate mai sus.

Dacă GAL este deja parțial făcut în commituri apărute după acest handoff, continuă cu primul capitol GAL fără review valid.

Dacă GAL este complet, determină următoarea carte direct din editorial queue / metadata curentă.

NU ghici ordinea după acest document.

## 17. După GAL

Repetă aceeași procedură:

- identifică următoarea carte nerevizuită;
- încarcă sursele;
- review verset cu verset;
- corectează;
- metadata;
- digest;
- journal per verse;
- validări;
- commit per capitol;
- actualizează progresul;
- următoarea carte.

Continuă până la `7.941 / 7.941`.

Nu te opri după o carte ca să spui doar că ai putea continua.
Dacă mediul și timpul permit, CONTINUĂ EFECTIV.

Raportează periodic progresul în format scurt:

```text
DONE: X / 7.941
BOOK: <carte>
LAST COMMIT: <sha>
GATES: GREEN/FAIL
NEXT: <carte.capitol>
```

## 18. Temporary infrastructure

Poți găsi infrastructură temporară de la agentul anterior în:

`.github/nt-ai-review/`

și workflow-uri precum:

- `.github/workflows/nt-ai-review-validate.yml`
- `.github/workflows/nt-ai-review-commit.yml`
- `.github/workflows/nt-ai-model-probe.yml`

Există și scripturi temporare pentru PHP etc.

Nu confunda aceste fișiere cu output-ul editorial.

Dacă nu mai sunt necesare, curățarea lor se face într-un commit separat de infrastructură.
NU le șterge în același commit cu un capitol biblic.

## 19. Lucruri interzise

- NU integra PR #44.
- NU pretinde human review.
- NU marca versete ca revizuite fără evaluare reală.
- NU inventa evidence.
- NU inventa surse consultate.
- NU copia automat o traducere cu drepturi neclare.
- NU promova automat TR peste SBLGNT.
- NU publica NT parțial.
- NU folosi `git add .`.
- NU amesteca infrastructura cu commiturile editoriale.
- NU modifica testele/validatorii doar ca să ascunzi o eroare.
- NU te baza pe PR body pentru count.

## 20. Finalul NT

Când TOATE cele 7.941 versete sunt efectiv revizuite:

trebuie completat registrul final:
`NT-EDITORIAL-APPROVAL.json`

Acesta trebuie să conțină:
`7.941 evidence records INDIVIDUALE`, câte unul pentru fiecare verset.

Nu crea un registru fictiv cu range-uri generice.

Verifică:
- 7.941 versete reviewate;
- 7.941 evidence records;
- niciun capitol lipsă;
- toate digesturile valide;
- toate jurnalele necesare;
- source archive hash corect;
- toate testele verzi.

Rulează toate gate-urile finale.

NUMAI DUPĂ CE TOTUL ESTE VERDE urmează procedura atomică de promotion/publication din runbook.

Nu inventa comanda de promotion.
Citește scripturile și runbook-ul și folosește exact procedura prevăzută în repository.

## 21. Definition of done

Lucrarea este „GATA” numai dacă simultan:

- [ ] 7.941 / 7.941 versete au review AI real
- [ ] fiecare verset are evidence individual
- [ ] `NT-EDITORIAL-APPROVAL.json` este complet și valid
- [ ] toate source digests sunt corecte
- [ ] toate chapter digests sunt corecte
- [ ] toate jurnalele cerute există
- [ ] toate gate-urile sunt GREEN
- [ ] `git diff --check` este GREEN
- [ ] nu există modificări accidentale/untracked relevante
- [ ] nu există capitole omise
- [ ] nu există claims false de human review
- [ ] nu există surse pretins consultate dar neconsultate
- [ ] branch-ul conține commiturile curate și trasabile
- [ ] promotion/publication s-a făcut doar conform runbook-ului
- [ ] PR #83 reflectă în final progresul real

Până atunci NU spune „gata”.

## 22. Acțiunea ta acum

Începe imediat prin:

1. inspectarea branch-ului actual;
2. verificarea head-ului față de `a707a2721ba1645e74398a2e495f497b9f6814a4`;
3. citirea integrală a runbook-ului;
4. recalcularea progresului real;
5. investigarea runului eșuat `31236709224` / job `93050425948`;
6. determinarea primului capitol nerevizuit;
7. continuarea efectivă a lucrării, cel mai probabil din GAL;
8. validare + commit după fiecare capitol;
9. repetare până la `7.941/7.941`.

Nu cere confirmare după fiecare capitol.
Nu te opri pentru a redacta un nou plan dacă poți executa.
Folosește Git și repository-ul ca sursă de adevăr.
