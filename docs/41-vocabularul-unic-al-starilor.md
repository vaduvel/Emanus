# 41. Vocabularul unic al starilor

Hotarare de lucru. Aplicatia are astazi DOUA vocabulare ale durerii, care nu se
vorbesc intre ele:

1. Cele 7 stari din check-in (`MessageMood` in `packages/shared/src/messageCards.ts`):
   obosit, speriat, vinovat, in_asteptare, singur, recunoscator, fara_directie.
2. Cele 14 usi din "Cand te doare, citeste" (`NEVOI` in `apps/web/src/screens/Bible.tsx`):
   mi-a murit cineva, boala si spital, s-a rupt casa mea, si asa mai departe.

Cele 14 sunt mai adevarate. "Sunt obosit" e o stare; "mi-a murit cineva" e o
viata. Omul care si-a ingropat tatal, cand apasa la check-in, nu are ce alege.

**Hotararea: un singur vocabular pentru toata aplicatia.** Aceleasi stari aleg
pergamentul, pornesc cautarea in Biblia explicata si stau la check-in.

---

## 1. Cele 20 de stari

Doua feluri: `durere` (cele 14 usi de acum, plus doua adaugate) si `stare` (ce
nu e durere, dar are nevoie de un cuvant).

| # | id | Eticheta pentru om | Fel | Tinta de carduri |
|---|----|--------------------|-----|------------------|
| 1 | `doliu` | Mi-a murit cineva | durere | 12 |
| 2 | `boala` | Boala si spital | durere | 10 |
| 3 | `casa_rupta` | S-a rupt casa mea | durere | 10 |
| 4 | `bani` | Bani si datorii | durere | 8 |
| 5 | `departe` | Sunt departe de ai mei | durere | 8 |
| 6 | `patima_bautura` | Beau. Nu ma pot opri | durere | 8 |
| 7 | `pofta` | Pofta care ma tine | durere | 8 |
| 8 | `neiertare` | Nu pot sa iert in familie | durere | 12 |
| 9 | `rusine` | Mi-e rusine de ce am facut | durere | 16 |
| 10 | `frica_moarte` | Mi-e frica de moarte | durere | 8 |
| 11 | `rugaciune_fara_raspuns` | Ma rog si nu simt nimic | durere | 10 |
| 12 | `de_ce` | De ce a ingaduit Dumnezeu | durere | 10 |
| 13 | `ocult` | Am umblat cu descantece | durere | 6 |
| 14 | `copil_departat` | Copilul meu s-a departat | durere | 10 |
| 15 | `singur` | Sunt singur | durere | 18 |
| 16 | `frica` | Mi-e frica de ce vine | durere | 18 |
| 17 | `obosit` | Sunt obosit, nu mai pot | stare | 20 |
| 18 | `fara_directie` | Nu stiu incotro | stare | 14 |
| 19 | `in_asteptare` | Astept ceva si intarzie | stare | 12 |
| 20 | `recunoscator` | Vreau sa multumesc | stare | 10 |

Starile 15 si 16 sunt adaugate fata de cele 14 usi. Singuratatea si frica de zi
cu zi sunt cele mai dese stari ale omului si nu aveau usa a lor: usa 5 era numai
despre departarea de loc, iar usa 10 numai despre moarte.

Suma tintelor: 228 de locuri. Cum un card sta in medie pe 1,6 stari, inseamna
cam **145-160 de carduri** cu totul. NU 365: devotionalul e picatura de fiecare
zi, pergamentul se deschide cand doare.

### Cate stari se arata deodata

Douazeci de butoane inseamna un perete. La check-in se arata **opt** (obosit,
frica, singur, rusine, fara_directie, in_asteptare, recunoscator, plus cea mai
des apasata de omul acela pana atunci), si dedesubt un rand: "altceva ma apasa".
Acolo se deschid toate douazeci. In "Cand te doare, citeste" se arata toate,
pentru ca acolo omul vine anume dupa durerea lui.

---

## 2. Versetele-ancora pentru fiecare stare

Acestea sunt locurile din care se scriu cardurile. Nu sunt o limita: sunt
temelia. Un card se scrie NUMAI pe un verset real, iar trimiterea apare pe card
(regula din `messageCards.ts`, docs/27 SS3.2, D-005).

1. **doliu** - Ioan 11:25-26; Psalmul 23:4; Psalmul 34:18; Psalmul 56:8;
   1 Tesaloniceni 4:13-14; 2 Corinteni 1:3-4; Isaia 25:8; Apocalipsa 21:4
2. **boala** - Psalmul 41:3; Psalmul 103:2-3; Psalmul 73:26; Isaia 41:10;
   Marcu 5:34; Iacov 5:14-15; 2 Corinteni 12:9
3. **casa_rupta** - Psalmul 147:3; Psalmul 68:6; Isaia 54:5-6; Osea 2:14-15;
   Ioel 2:25; Romani 12:18; Psalmul 34:18
4. **bani** - Matei 6:25-26; Matei 6:33; Psalmul 37:25; Psalmul 34:10;
   Filipeni 4:19; Proverbele 3:9-10; 1 Timotei 6:6-8; Evrei 13:5
5. **departe** - Geneza 28:15; Psalmul 121:8; Psalmul 139:7-10; Isaia 43:2;
   Deuteronom 31:6; Ioan 14:18
6. **patima_bautura** - Psalmul 40:2; Ioan 8:36; Romani 6:14;
   1 Corinteni 10:13; 2 Corinteni 5:17; Efeseni 5:18; Tit 2:11-12
7. **pofta** - Iov 31:1; Psalmul 51:10; Matei 5:8; Romani 13:14;
   1 Corinteni 6:19-20; 2 Timotei 2:22; 1 Ioan 2:16-17
8. **neiertare** - Geneza 50:20; Matei 6:14-15; Matei 18:21-22; Luca 6:37;
   Romani 12:19; Efeseni 4:31-32; Coloseni 3:13
9. **rusine** - Psalmul 34:5; Psalmul 103:12; Isaia 1:18; Isaia 61:7;
   Luca 15:20; Romani 8:1; Romani 10:11; 1 Ioan 1:9
10. **frica_moarte** - Psalmul 23:4; Ioan 11:25; 1 Corinteni 15:55-57;
    Filipeni 1:21; 2 Timotei 1:10; Evrei 2:14-15; Apocalipsa 1:17-18
11. **rugaciune_fara_raspuns** - Psalmul 13:1-2; Psalmul 22:1-2; Psalmul 40:1;
    Isaia 55:8-9; Habacuc 2:3; Luca 18:1-8; Romani 8:26
12. **de_ce** - Deuteronom 29:29; Iov 38:1-4; Isaia 55:8-9; Geneza 50:20;
    Ioan 9:1-3; Romani 8:28; 2 Corinteni 4:17-18
13. **ocult** - Deuteronom 18:10-12; Isaia 8:19; Psalmul 121:2; Ioan 8:12;
    Fapte 19:18-19; Coloseni 1:13; 1 Ioan 4:4
14. **copil_departat** - Proverbele 22:6; Isaia 49:25; Ieremia 31:16-17;
    Luca 15:20; Fapte 16:31; Psalmul 126:5-6; 2 Petru 3:9
15. **singur** - Deuteronom 31:8; Psalmul 68:6; Psalmul 139:7-10;
    Isaia 49:15-16; Ioan 14:18; Evrei 13:5; Matei 28:20
16. **frica** - Psalmul 27:1; Psalmul 56:3; Isaia 41:10; Isaia 43:1-2;
    Matei 6:34; Ioan 14:27; 2 Timotei 1:7; 1 Ioan 4:18
17. **obosit** - Exod 33:14; Psalmul 23:2-3; Psalmul 127:2; Isaia 40:29-31;
    Matei 11:28-30; Galateni 6:9; 1 Petru 5:7
18. **fara_directie** - Psalmul 32:8; Psalmul 37:23; Psalmul 119:105;
    Proverbele 3:5-6; Isaia 30:21; Ieremia 29:11; Iacov 1:5
19. **in_asteptare** - Psalmul 27:14; Psalmul 40:1; Eclesiastul 3:11;
    Plangerile lui Ieremia 3:25-26; Isaia 40:31; Habacuc 2:3; Romani 8:25
20. **recunoscator** - Psalmul 103:1-2; Psalmul 107:1; Psalmul 118:24;
    Efeseni 5:20; Coloseni 3:15-17; 1 Tesaloniceni 5:18; Iacov 1:17

---

## 3. Unde suntem acum: 13 stari din 20 nu au NIMIC

Cele 45 de carduri de azi, dupa mutarea pe vocabularul nou:

| Stare | Carduri acum | Lipsesc |
|-------|--------------|---------|
| obosit | 13 | 7 |
| frica | 11 | 7 |
| rusine | 12 | 4 |
| singur | 11 | 7 |
| fara_directie | 14 | 0 |
| in_asteptare | 10 | 2 |
| recunoscator | 4 | 6 |
| doliu | 0 | 12 |
| boala | 0 | 10 |
| casa_rupta | 0 | 10 |
| bani | 0 | 8 |
| departe | 0 | 8 |
| patima_bautura | 0 | 8 |
| pofta | 0 | 8 |
| neiertare | 0 | 12 |
| frica_moarte | 0 | 8 |
| rugaciune_fara_raspuns | 0 | 10 |
| de_ce | 0 | 10 |
| ocult | 0 | 6 |
| copil_departat | 0 | 10 |

Treisprezece stari din douazeci nu au niciun card scris anume pentru ele. Pe axa
`relationships` exista astazi UN singur card in tot fisierul (Psalmul 68:6),
desi lunile 5 si 6 din devotional sunt tocmai iertarea si "ai tai".

### Ordinea scrierii

1. **Intai golurile mari de durere**: doliu, neiertare, copil_departat,
   casa_rupta, boala (54 de carduri). Acestea sunt durerile care duc omul la
   aplicatie, si acum nu gaseste nimic.
2. **Apoi legaturile si patimile**: pofta, patima_bautura, rusine (in plus),
   de_ce, rugaciune_fara_raspuns.
3. **La urma completarile**: bani, departe, frica_moarte, ocult, recunoscator,
   plus intregirea starilor care stau deja bine.

---

## 4. Mutarea celor 45 de carduri (nu se arunca niciunul)

Potrivirea de temelie intre vechi si nou:

- `obosit` -> `obosit`
- `speriat` -> `frica`
- `vinovat` -> `rusine`
- `singur` -> `singur`
- `in_asteptare` -> `in_asteptare`
- `recunoscator` -> `recunoscator`
- `fara_directie` -> `fara_directie`

Peste asta, aceste carduri primesc stari noi, pentru ca versetul lor le duce
acolo:

| Card | Primeste in plus |
|------|------------------|
| `msg_tata_a_alergat` (Luca 15:20) | `copil_departat` |
| `msg_lacrimile` (Psalmul 56:8) | `doliu` |
| `msg_aproape_de_inima_zdrobita` (Psalmul 34:18) | `doliu`, `casa_rupta` |
| `msg_libertate` (Ioan 8:36) | `patima_bautura`, `pofta` |
| `msg_inima_noua` (Ezechiel 36:26) | `patima_bautura`, `pofta` |
| `msg_puterea_in_slabiciune` (2 Corinteni 12:9) | `boala` |
| `msg_pasarile_cerului` (Matei 6:26) | `bani` |
| `msg_unde_sa_ma_duc` (Psalmul 139:7-8) | `departe` |
| `msg_nu_minte` (Habacuc 2:3) | `rugaciune_fara_raspuns` |
| `msg_toate_lucrurile` (Romani 8:28) | `de_ce` |
| `msg_nu_te_las_orfan` (Ioan 14:18) | `doliu` |
| `msg_tata_al_orfanilor` (Psalmul 68:6) | `casa_rupta` |

---

## 5. Ce se schimba in cod

1. **Fisier nou** `packages/shared/src/needs.ts`:
   `export type NeedId = ...` (cele 20) si `export const NEEDS: Need[]` cu
   `{ id, label, kind: "durere" | "stare", showAtCheckin: boolean, order }`.
   Acesta devine singurul loc unde traiesc etichetele.
2. **`messageCards.ts`**: campul `moods: MessageMood[]` devine
   `needs: NeedId[]`. `MessageMood` ramane o vreme ca nume vechi, ca sa nu se
   rupa nimic, dar nu se mai foloseste la carduri noi.
3. **`Bible.tsx`**: `NEVOI` nu-si mai tine etichetele lui. Ia `NEEDS` din
   pachetul comun si pastreaza numai `cuvinte` (cuvintele de cautare in text),
   mutate intr-o harta `NeedId -> string[]`.
4. **`pickMessageCard`**: primeste `need?: NeedId` in loc de `mood?`.
5. **`dailyGifts.ts`**: `lastMood()` / `setLastMood()` devin `lastNeed()` /
   `setLastNeed()`.
6. **Ocolirea repetarii se muta pe verset, nu pe card.** Acum se tin minte
   `id`-uri de card. Daca sunt trei carduri pe Ioan 14:18, omul le poate primi
   trei zile la rand si i se pare ca se repeta. Se tine minte `verseRef`.
   `NO_REPEAT_DAYS` ramane 60.
7. **Verificare noua** `check:pergament`: pica build-ul daca o stare are mai
   putine carduri decat un prag (deocamdata 4) sau daca vreun card nu trece de
   `isCardAnchored`.

---

## 6. Reguli pentru cardurile noi

1. **Un card, un unghi - nu un verset, un card.** Ioan 14:18 poate naste trei
   pergamente deosebite: pentru copilul ramas fara parinte, pentru omul de dupa
   despartire, pentru cel caruia i se pare ca Dumnezeu tace. Acelasi verset,
   alta rana. Asa se ajunge la 150 fara sa cautam locuri rare si fara sa ne
   intindem la versete rastalmacite.
2. **Parafraza scurteaza, nu adauga.** Se muta de la plural la singular, se
   taie ce nu incape pe card. Nu se pune in gura lui Dumnezeu nimic nou.
3. **Unde versetul se rastalmaceste des, cardul pune piedica.** Asa cum s-a
   facut la Romani 8:28: "Nu tot ce ti se intampla e bun. Dar Eu lucrez spre
   bine si din ce e rau." La fel se cere la Ieremia 29:11 si la
   Proverbele 22:6, care se folosesc gresit cel mai des.
4. **La durerile grele, fara graba spre incheiere fericita.** La `doliu`,
   `de_ce`, `rugaciune_fara_raspuns` se scrie si din Psalmii de plangere
   (13, 22, 88), nu numai din fagaduinte. Omul zdrobit simte cand e grabit.
5. **Fundal dupa greutate**: `pergament-umbra` la durerile grele,
   `pergament-cald` la mangaiere si multumire, `pergament` la restul.
6. **Aceeasi poarta de om ca la Biblie.** Sunt parafraze puse in gura lui
   Dumnezeu. La 45 se poate citi totul pe apucate; la 150, daca poarta nu se
   pune de la inceput, nu se mai pune niciodata.
7. **La `ocult`, `patima_bautura` si `frica_moarte`**: cardul nu tine loc de
   ajutor. Sub el sta si randul catre `/criza` si numerele 112, 116 111,
   116 123 (docs/22-siguranta).

---

## 7. Ce ramane de hotarat de om

- Daca la `ocult` se scrie deloc in pergamente sau numai in Biblia explicata.
  Este singura stare unde un card scurt poate face mai mult rau decat bine.
- Daca `casa_rupta` se desparte in doua ("sotul m-a lasat" si "eu am plecat"),
  pentru ca mangaierea nu este aceeasi.
