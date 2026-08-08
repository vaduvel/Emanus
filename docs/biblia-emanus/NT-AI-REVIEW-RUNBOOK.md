# Runbook de execuție — revizia AI a Noului Testament

Acest document este instrucțiunea de lucru pentru agentul Git care continuă
revizia. Nu există un reviewer uman separat: fiecare decizie trebuie făcută,
verificată și înregistrată de agentul AI identificat. Noul Testament nu se
publică parțial.

## Starea de predare

- Baza acestui handoff: commitul `bb953506`.
- Revizuite și documentate: **821 din 7.941 versete** (42 capitole-loturi,
  10,34%).
- Toate cele 260 de capitole NT rămân `status: "in_review"` și
  `public: false`; catalogul runtime este `withheld`.
- Coada globală este un artefact generat. Ea nu reprezintă aprobare.
- Loturile `COL.2` și `COL.4` au intrat accidental în commitul mixt
  `bb953506`, al cărui mesaj se referă la `COL.1`. Nu se rescrie istoricul;
  jurnalele lor și metadatele capitolelor sunt sursa de trasabilitate.

## Reguli care nu se negociază

1. Se revizuiește **fiecare verset** al fiecărui capitol, nu numai versetele
   semnalate de scripturi. Un rezultat „0 probleme” al unui validator nu este
   verdict semantic.
2. Textul principal se confruntă direct cu instantaneul fixat SBLGNT 1.2 și
   cu aparatul lui. TR este martor de variante. WEBP, BTF, Cornilescu 1924 și
   Biblia Liberă sunt comparații auxiliare, nu text principal.
3. Nu se copiază o traducere românească. Se redactează română proprie, apoi se
   confruntă cu etaloanele.
4. Nu se pretinde consultarea unei surse care nu a fost consultată. Dacă NTR
   nu a fost folosită, se marchează explicit `consultedInBatch: false` și se
   spune aceasta în jurnal.
5. Nu se setează `approved`, `published`, `public: true`, nu se materializează
   corpusul runtime și nu se creează registrul canonic de aprobare incomplet.
6. Nu se folosește `git add .`. Un lot normal conține un singur
   `docs/data/biblia-emanus/<CARTE>.<capitol>.json` și jurnalul lui; coada
   globală se regenerează numai într-un commit central.

## Fluxul pentru un capitol

1. Alege un singur fișier, de exemplu `PHP.1.json`, și citește întregul text
   existent. Descarcă textele fixate din arhiva locală, fără a presupune că o
   versiune web este identică:

   ```sh
   unzip -p docs/data/biblia-emanus/sources/nt-sblgnt-1.2.zip sblgnt/text/PHP.txt
   unzip -p docs/data/biblia-emanus/sources/nt-sblgnt-1.2.zip sblgnt/apparatus/text/PHP.txt
   unzip -p docs/data/biblia-emanus/sources/nt-sblgnt-1.2.zip tr/PHP.usfm
   unzip -p docs/data/biblia-emanus/sources/nt-sblgnt-1.2.zip webp/PHP.usfm
   unzip -p docs/data/biblia-emanus/sources/nt-sblgnt-1.2.zip btf/PHP.usfm
   unzip -p docs/data/biblia-emanus/sources/nt-sblgnt-1.2.zip cornilescu1924/PHP.usfm
   unzip -p docs/data/biblia-emanus/sources/nt-sblgnt-1.2.zip biblia-libera/PHP.usfm
   ```

2. Compară verset cu verset, în ordine. Verifică sensul, negările,
   persoanele/pronumele, timpul şi diateza verbală, referentul pronumelor,
   omisiunile/adaosurile, citatele, numele proprii, româna firească și
   variantele SBL/TR. Corectează textul în fișierul capitolului.

3. Actualizează numai metadate factuale. Pentru un lot AI, folosește un
   `audit.reviewAgent` identificabil (`type: "ai"`, `engine: "Codex / GPT-5"`,
   un `runId` unic), data reală, acoperirea exactă a versetelor și metoda
   `verse-by-verse-source-and-benchmark`. Elimină afirmațiile istorice despre
   modele sau surse dacă nu pot fi demonstrate. Păstrează statutul
   `in_review`/`public: false`.

4. Pentru orice variantă materială, ambiguitate semantică sau alegere
   românească disputabilă, adaugă în `editorialNotes` o notă cu: ancora greacă,
   decizia, alternativele, motivul și starea `resolved`. Nu transforma o
   inferență de traducere într-o „variantă textuală”.

5. Creează `docs/biblia-emanus/NT-AI-REVIEW-BATCH-YYYY-MM-DD-<CARTE>.<capitol>.md`.
   Jurnalul trebuie să declare clar: identitatea/rularea AI, sursele efectiv
   consultate, faptul că lotul nu este aprobare, și o ancoră/decizie pentru
   fiecare verset.

6. Recalculează digesturile după ultima modificare. Nu le inventa:

   ```sh
   python3 - <<'PY'
   import json, runpy
   from pathlib import Path
   validator = runpy.run_path('scripts/check-biblia-emanus.py')
   data = json.loads(Path('docs/data/biblia-emanus/PHP.1.json').read_text())
   print(validator['chapter_text_digest'](data))
   print(validator['chapter_content_digest'](data))
   PY
   ```

   Scrie valorile rezultate în `audit.textDigest` și `audit.contentDigest`,
   apoi rulează din nou comanda pentru a confirma egalitatea.

7. Verifică lotul și întregul corpus înainte de commit:

   ```sh
   pnpm check:biblia-emanus
   python3 scripts/check-biblia-emanus-romanian-quality.py
   python3 scripts/withhold-biblia-emanus-nt.py --check
   pnpm check:biblia-emanus-nt-runtime
   pnpm test:biblia-emanus
   git diff --check
   ```

   Dacă una dintre aceste comenzi eșuează, se repară cauza; nu se schimbă
   statusul doar pentru a face verificarea verde.

8. Commitul este izolat:

   ```sh
   git add docs/data/biblia-emanus/PHP.1.json \
     docs/biblia-emanus/NT-AI-REVIEW-BATCH-YYYY-MM-DD-PHP.1.md
   git commit -m 'fix(biblia): review Philippians 1 against SBLGNT'
   ```

## Integrare periodică

După un grup de loturi finalizate, pe un worktree curat:

```sh
python3 scripts/build-nt-editorial-review-queue.py
python3 scripts/build-nt-editorial-review-queue.py --check
pnpm check:biblia-emanus
python3 scripts/check-biblia-emanus-romanian-quality.py
git diff --check
```

Commitul central include numai coada regenerată și, dacă este actualizat,
`NT-REMEDIATION-STATUS-YYYY-MM-DD.md` cu numărul calculat de versete/loturi.
Nu lăsa coada nestabilă între ramuri: digesturile ei trebuie să corespundă
ultimului text al corpusului.

## Dovada finală înainte de publicare

Jurnalele de capitol sunt necesare, dar nu suficiente. După ce toate cele
7.941 de versete sunt revizuite, se construiește o singură dată registrul
canonic `docs/biblia-emanus/NT-EDITORIAL-APPROVAL.json`, valid față de
`NT-EDITORIAL-APPROVAL.schema.json`. El trebuie să conțină exact 7.941 de
intrări, câte una pentru fiecare referință, fiecare legată de:

- digestul textului românesc curent;
- referințele și digesturile surselor fixate SBLGNT, WEBP și BTF;
- benchmarkurile cerute de carte (cu lacune declarate numai unde permit
  sursele fixate);
- ancora sursei, ancora românească și justificări individuale, netemplate;
- identitatea AI, sistemul și `reviewerRunId` ale aprobării finale.

Nu se creează un registru cu justificări copiate sau cu surse neverificate.
Orice schimbare ulterioară a textului invalidează dovada versetului afectat și
impune revizuirea lui.

Numai când registrul complet este prezent și toate verificările de mai jos
trec, agentul poate simula, apoi executa, promovarea atomică:

```sh
pnpm check:biblia-emanus
python3 scripts/check-biblia-emanus-romanian-quality.py
python3 scripts/build-nt-editorial-review-queue.py --check
python3 scripts/withhold-biblia-emanus-nt.py --check
pnpm check:biblia-emanus-nt-runtime
pnpm check:biblia-emanus-nt-editorial
python3 scripts/seal-biblia-emanus.py --book MAT --engine 'Codex / GPT-5' --check
```

Pentru că poarta editorială verifică întregul NT, simularea cu `--book MAT`
nu este o aprobare parțială; este doar o probă a promovării după ce registrul
global este complet. După aceea se rulează explicit numai cele 27 de cărți NT
(nu implicit toate cărțile din repository), apoi se regenerează artefactele:

```sh
python3 scripts/seal-biblia-emanus.py --engine 'Codex / GPT-5' \
  --book MAT --book MRK --book LUK --book JHN --book ACT --book ROM \
  --book 1CO --book 2CO --book GAL --book EPH --book PHP --book COL \
  --book 1TH --book 2TH --book 1TI --book 2TI --book TIT --book PHM \
  --book HEB --book JAS --book 1PE --book 2PE --book 1JN --book 2JN \
  --book 3JN --book JUD --book REV
python3 scripts/materialize-biblia-emanus-nt.py
python3 scripts/materialize-biblia-emanus-nt-runtime-catalog.py
python3 scripts/build-nt-editorial-review-queue.py
```

Se rulează apoi din nou toate verificările. Publicarea este un commit atomic
separat, cu modificările de status, manifest, materializare și catalog produse
de scripturi, nu editate manual.

## Interdicții de handoff

- Nu se ocolește poarta prin editarea manuală a `generated.ts`, a catalogului
  runtime sau a statutului `published`.
- Nu se declară „revizie umană”; este revizie AI trasabilă.
- Nu se integrează PR #44: este produs diferit, incompatibil cu această
  strategie de publicare.
- Nu se împinge un lot care nu are text, digesturi și jurnal coerente.
