# Plan și registru tehnic — Matei, Biblia explicată

Data: 2 august 2026

## Livrabilul

Matei **nu este curs** și nu intră în `LessonPlayer`. Este o carte din secțiunea
`Biblia explicată`, în același model ca Geneza și Ioan:

- `BibleBook` pentru carte;
- `BibleChapter` pentru fiecare dintre cele 28 de capitole;
- `BibleUnit` pentru unități mici de sens;
- textul Cornilescu (RCCV) în câmpul `text`;
- explicația originală Emanus în `teaching`, separată vizual și semantic;
- `words`, `crossRefs`, `forYourHeart` și rugăciunea capitolului;
- toate capitolele rămân `status: "in_review"` până la revizia umană.

Sursa de adevăr pentru format este `docs/21-biblia-explicata.md`, iar limita
doctrinară este `docs/14-carta-doctrinara.md`.

## Materialul Zac Poonen

Playlistul are **128 de episoade**, fără goluri, și acoperă Matei 1:1–28:20.
Manifestul complet, cu poziție, pasaj, titlu, ID, durată și URL, este în:

`docs/data/matei-poonen-playlist.json`

Toate cele 128 de piste `en-orig` au fost verificate ca disponibile la 2 august
2026. Pentru a le descărca local:

```bash
python3 scripts/fetch-matei-poonen.py
```

Rezultatul este:

```text
.research/matei-poonen/transcripts/001-2-5Oi2QmtgA.txt
...
.research/matei-poonen/transcripts/128-4MzaFxo08TU.txt
.research/matei-poonen/report.json
```

Directorul `.research/` este ignorat de Git. Scriptul fixează `yt-dlp` la o
versiune care vede toate cele 128 de poziții; versiunea 2026.03.17 se oprea greșit
la 100. Dacă `uvx` nu există, scriptul folosește `yt-dlp` instalat sau creează un
mediu Python local în același director ignorat.

## Cum au fost folosite transcrierile

Transcrierile sunt numai material de cercetare. Nu se copiază propoziții și nu se
traduce predica. Pentru fiecare unitate:

1. se citește mai întâi textul biblic și contextul întregului capitol;
2. se cântăresc observațiile predicatorului;
3. afirmațiile istorice, lexicale și doctrinare se verifică separat;
4. ce contrazice carta doctrinară se lasă;
5. explicația se scrie de la zero în registrul Emanus.

Zac Poonen este sursa video principală pentru acoperirea verset cu verset. Allen
Nolan este sursă secundară, selectivă, pentru introducerea Evangheliei, magi,
pilde, Matei 24–25, patimi și înviere. Niciunul nu este autoritatea finală;
Sfânta Scriptură este.

## Structura de cod implementată

```text
packages/shared/src/bible/matei.ts
packages/shared/src/bible/matei2.ts
...
packages/shared/src/bible/matei28.ts
packages/shared/src/bible/mateiHelpers.ts
packages/shared/src/bible/mateiPublication.ts
packages/shared/src/bible/mateiText.ts
packages/shared/src/bible/index.ts
```

`matei.ts` conține cartea de bază și capitolul 1, după modelul `geneza.ts` și
`ioan.ts`. Celelalte capitole stau separat și sunt asamblate în `bible/index.ts`.
`mateiText.ts` păstrează toate cele 1.071 de versete separat de explicație, iar
`mateiHelpers.ts` oprește la încărcare orice gol, suprapunere sau verset în afara
capitolului. `mateiPublication.ts` ține starea editorială separată de text. Niciun
capitol nu se publică automat: aprobarea se consemnează după procesul din
`docs/36-matei-revizia-umana.md`, apoi se aplică prin `scripts/publica-matei.py`.

## Verificare înainte de predare

```bash
pnpm check:quotes
pnpm check:typos
pnpm check:content
pnpm check:matei
pnpm typecheck
pnpm build
```

În plus, trebuie verificat automat că:

- există exact 28 de capitole, numerotate 1–28;
- ID-urile de carte, capitol și unitate sunt unice;
- unitățile fiecărui capitol acoperă toate versetele o singură dată;
- niciun câmp `text` nu conține explicație;
- starea fiecărui capitol corespunde aprobării din registrul uman.

Poarta `check:matei` verifică în CI exact 28 de capitole, 129 de unități cu ID-uri
unice, 1.071 de versete, ordinea din catalog, protecțiile editoriale sensibile și
manifestul celor 128 de episoade. Toate capitolele rămân `in_review` până când un
revizor uman le citește în context și își asumă publicarea.
