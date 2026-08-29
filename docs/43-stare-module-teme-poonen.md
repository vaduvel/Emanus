# Starea modulelor de teme dupa Zac Poonen

Branch: `agent/module-teme-poonen`. PR #16.

## Regula editoriala in vigoare

Inlocuieste regula veche din `docs/41-module-teme-poonen.md`.

- Continutul lectiilor este **invatatura lui Zac Poonen, tradusa fidel** din textul-sursa
  `https://www.cfcindia.com/books/basic-christian-teachings`. Nu este compozitie proprie si nu
  se amesteca material gasit pe web.
- **Traducerea nu este alterare.** Alterare inseamna schimbarea textului, a doctrinei, a
  invataturii sau a ideilor. Noi le pastram: aceleasi argumente, aceeasi ordine, aceleasi
  ilustratii, aceleasi versete.
- Niciun modul nu se scrie inainte de a citi capitolele-sursa pe care le acopera.
- Sursa se atribuie in antetul fiecarui fisier si in campul `source` al cursului.
- Toate cursurile raman `in_review` pana la citirea finala a unui om.

Vezi si `docs/42-sursa-si-atribuire-poonen.md`.

## Cele 14 module - toate scrise si inregistrate

| # | Modul | Fisier | courseId | Lectii | Teme |
| --- | --- | --- | --- | --- | --- |
| 1 | Originea raului si puterea alegerii | `origineaRaului.ts` | `teme_c1_origine` | 5 | 1-5 |
| 2 | De ce a murit Hristos si darul Duhului | `deCeAMuritHristos.ts` | `teme_c2_crucea` | 4 | 6-9 |
| 3 | Cuvantul: hrana, arma si innoirea mintii | `cuvantulHranaSiArma.ts` | `teme_c3_cuvantul` | 3 | 10-12 |
| 4 | Religiozitate sau viata | `religiozitateSauViata.ts` | `teme_c4_religiozitate` | 4 | 13-16 |
| 5 | Faptele moarte si harul | `fapteleMoarteSiHarul.ts` | `teme_c5_fapte_moarte` | 5 | 17-21 |
| 6 | De ce dam gres | `deceDamGres.ts` | `teme_c6_esec` | 4 | 22-24, 72 |
| 7 | Lauda ca arma | `laudaCaArma.ts` | `teme_c7_lauda` | 6 | 25-30 |
| 8 | Scopul lui Dumnezeu si smerenia lui Hristos | `scopulSiSmerenia.ts` | `teme_c8_smerenia` | 4 | 31-34 |
| 9 | Cum a trait Isus | `cumATraitIsus.ts` | `teme_c9_cum_a_trait` | 8 | 35-42 |
| 10 | Tatal, intelepciunea si banii | `tatalSiBanii.ts` | `teme_c10_tatal_banii` | 6 | 43-48 |
| 11 | Casa: sot, sotie, copii | `casaSotSotieCopii.ts` | `teme_c11_casa` | 4 | 49-52 |
| 12 | Tatal nostru, pas cu pas | `tatalNostruPasCuPas.ts` | `teme_c12_rugaciunea` | 6 | 53-58 |
| 13 | Pacatele care ne distrug | `pacateleCareNeDistrug.ts` | `teme_c13_pacate` | 7 | 59-63, 65, 67 |
| 14 | Iertare, minciunile celui rau, voia lui Dumnezeu | `iertareSiVoiaLuiDumnezeu.ts` | `teme_c14_voia_lui` | 6 | 64, 66, 68-71 |

Total: **72 de teme, 72 de lectii**, in `packages/shared/src/teme/`.
`packages/shared/src/teme/index.ts` inregistreaza toate cele 14 cursuri.

## Ce ramane

1. Legarea modulelor in rafturile Bibliotecii (`packages/shared/src/library/index.ts`) - abia
   dupa ce PR #15 (munca agentului desktop) ajunge in `main`, ca sa nu intram peste el.
2. Citirea finala a unui om, curs cu curs, apoi trecerea din `in_review` in `published`.
3. Cererea de permisiune explicita pentru versiunea romana la `cfc@cfcindia.com`
   (consemnata in `docs/42`).
