# Module noi pe teme — maparea completa a celor 72 de mesaje

Sursa de inspiratie: seria „Basic Christian Teachings" (Zac Poonen), 72 de mesaje scurte,
disponibila si in forma scrisa pe cfcindia. Se adauga materialul din seriile conexe
(A Life Of Fullness, Being Faithful, Come Up Higher, The Miracles Of Jesus,
Young Men Who Pleased God, Winning God's Approval, Beginnings Of The Christian Life).

## Regula editoriala

Aceeasi ca la Biblia explicata:

- explicatiile se redacteaza in romana, cu firul doctrinar pastrat, fara traducere sau copiere 1:1;
- sursa se consemneaza aici, nu in interfata;
- fiecare lectie intra `in_review` si nu devine publica inaintea reviziei umane finale;
- Scriptura ramane separata vizual si semantic de explicatie.

## De ce 14 module, nu 8

Prima propunere acoperea doar ~36 din cele 72 de teme. Maparea de mai jos acopera
intreaga serie. Numerele din paranteze sunt pozitiile din seria originala.

| # | Modul | Lectii | Teme acoperite |
| --- | --- | --- | --- |
| 1 | Originea raului si puterea alegerii | 5 | 01-05 |
| 2 | De ce a murit Hristos si darul Duhului | 4 | 06-09 |
| 3 | Cuvantul ca hrana, arma si innoire a mintii | 3 | 10-12 |
| 4 | Religiozitate sau viata | 4 | 13-16 |
| 5 | Faptele moarte si harul | 4 | 18-21 |
| 6 | De ce dam gres | 4 | 22-24, 72 |
| 7 | Lauda ca arma | 6 | 25-30 |
| 8 | Scopul lui Dumnezeu si smerenia lui Hristos | 4 | 31-34 |
| 9 | Cum a trait Isus | 8 | 35-42 |
| 10 | Tatal, intelepciunea si banii | 6 | 43-48 |
| 11 | Casa: sot, sotie, copii | 4 | 49-52 |
| 12 | Tatal nostru, pas cu pas | 6 | 53-58 |
| 13 | Iertare, minciunile celui rau, voia lui Dumnezeu | 6 | 64, 66, 68-71 |
| 14 | De confirmat din sursa | ~8 | 17, 59-63, 65, 67 |

Total: aproximativ 72 de lectii.

## Observatie despre modulul 14

Pozitiile 17, 59-63, 65 si 67 nu apar in listarea publica pe care am putut sa o citesc.
Inainte de scriere trebuie confirmate din sursa, ca sa nu inventam teme inexistente.

## Module secundare, din seriile conexe

- Minunile lui Isus (8) — narativ, bun pentru inceput de drum;
- Un tanar care I-a placut lui Dumnezeu (4, Iosif) — pentru adolescenti;
- Viata din belsug (10) — se leaga direct de Ioan, deja scris;
- Inceputurile vietii crestine (4) — pocainta si primii pasi;
- Pregatire pentru slujire in biserica (16) — util, dar nu pentru userul obisnuit; ultimul la rand.

## Ordinea de scriere propusa

1. De ce dam gres — cea mai mare nevoie reala a userului;
2. Lauda ca arma — nu exista nimic pe tema asta in aplicatie;
3. Cum aflu voia lui Dumnezeu (parte din modulul 13);
4. Tatal nostru, pas cu pas;
5. Faptele moarte si harul;
6. restul, in ordinea tabelului.

## Legarea in aplicatie

Modulele se scriu in `packages/shared/src/teme/`, cu index propriu, ca sa nu intre in
conflict cu munca in curs din `packages/shared/src/library/`. Legarea in rafturile
Bibliotecii se face intr-un singur pas, dupa ce PR-ul de integrare in curs ajunge in `main`.
