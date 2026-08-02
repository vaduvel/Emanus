# Plan și registru tehnic — Marcu, Biblia explicată

Data: 2 august 2026

## Livrabilul

Marcu urmează exact modelul Matei (docs/35), Ioan și Geneza:

- `BibleBook` pentru carte, `BibleChapter` pe capitole, `BibleUnit` pe unități de sens;
- textul Cornilescu (RCCV) în câmpul `text`, păstrat separat în `marcuText.ts`;
- explicația originală Emanus în `teaching`, separată vizual și semantic;
- `words`, `crossRefs`, `forYourHeart` și rugăciunea capitolului;
- toate capitolele rămân `status: "in_review"` până la revizia umană.

Sursa de adevăr pentru format este `docs/21-biblia-explicata.md`, limita
doctrinară este `docs/14-carta-doctrinara.md`, iar metoda de lucru cu
transcrierile este `docs/26-cantarirea-transcrierilor.md`.

## Materialul Zac Poonen

Playlistul are **48 de episoade**, fără goluri, și acoperă Marcu 1:1–16:20.
Manifestul complet, cu poziție, pasaj, titlu, ID, durată și URL, este în:

`docs/data/marcu-poonen-playlist.json`

Toate cele 48 de piste `en-orig` au fost verificate ca disponibile la 2 august
2026. Pentru a le descărca local:

```bash
python3 scripts/fetch-poonen.py marcu
```

Rezultatul este în `.research/marcu-poonen/transcripts/` (director ignorat de
Git). Scriptul este versiunea generalizată a lui `fetch-matei-poonen.py` și
citește manifestul din `docs/data/<carte>-poonen-playlist.json`.

## Cum se folosesc transcrierile

Transcrierile sunt numai material de cercetare. Sunt în engleză și **nu se
traduc**: nu se copiază propoziții și nu se traduce predica. Pentru fiecare
unitate:

1. se citește mai întâi textul biblic (RCCV) și contextul întregului capitol;
2. se cântăresc observațiile predicatorului;
3. afirmațiile istorice, lexicale și doctrinare se verifică separat;
4. ce contrazice carta doctrinară se lasă;
5. explicația se scrie de la zero, în română, în registrul Emanus.

Zac Poonen este sursa video principală pentru acoperirea verset cu verset.
Nu este autoritatea finală; Sfânta Scriptură este.

## Structura de cod

```text
packages/shared/src/bible/marcu.ts           # cartea + capitolul 1
packages/shared/src/bible/marcu2.ts          # capitolele următoare
...
packages/shared/src/bible/marcuHelpers.ts
packages/shared/src/bible/marcuPublication.ts
packages/shared/src/bible/marcuText.ts       # cele 678 de versete RCCV
packages/shared/src/bible/index.ts           # asamblarea cărții
scripts/check-marcu.py                       # poarta structurală și editorială
```

## Poarta Marcu

`pnpm check:marcu` verifică: fișierele de capitole, acoperirea verset cu
verset a fiecărui capitol scris, ID-urile unităților, stratul de text (678
versete, fără explicație în el), asamblarea în `index.ts`, registrul de stare
editorială, gardele editoriale obligatorii și manifestul video (48 episoade,
pista `en-orig`, fără transcrieri brute în Git).

Marcu are 16 capitole cu 678 de versete, împărțite astfel:
45, 28, 35, 41, 43, 56, 37, 38, 50, 52, 33, 44, 37, 72, 47, 20.

## Starea scrierii

| Capitol | Versete | Unități | Stare |
| --- | --- | --- | --- |
| 1 | 1–45 | 9 | scris, în revizie |
| 2–16 | — | — | de scris |

Registrul unităților se actualizează pe măsură ce capitolele se scriu.
