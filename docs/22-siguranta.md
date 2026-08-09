# 22 — Siguranta, safeguarding si ce masuram

Status: politica activa. Orice lectie, ecran sau functie noua se verifica impotriva acestui document inainte de a fi scrisa in cod.

---

## 0. Propozitia care sta la vedere

**"Emanus nu inlocuieste medicul, psihologul, poliția sau 112."**

Unde apare, fara sa fie ascunsa in setari:

1. Pe ecranul de intrare (`Doors`), in nota de jos, alaturi de "Nu iti cerem bani, nu iti cerem date si nu iti dam note."
2. In bara de ajutor (`.helpbar`), prezenta pe toate ecranele, care duce la ecranul de criza.
3. La primul pas al oricarei lectii care atinge abuz, violenta, dependenta, depresie, post sau autovatamare.

Nu o formulam ca disclaimer juridic. O formulam ca grija: omul trebuie sa inteleaga ca aplicatia il insoteste, nu il trateaza.

---

## 1. Ce nu facem niciodata

- **Nu diagnosticam.** Cele sapte camere sunt tipare spirituale dominante folosite pentru orientare initiala. Nu sunt un diagnostic si nu se comunica niciodata omului ca eticheta.
- **Nu punem vina pe om.** Nicio lectie nu spune "boala ta e ca nu crezi X". Anxietatea, tristetea, epuizarea, insomnia pot avea cauze medicale: tiroida, trauma, lipsa de somn, medicatie, boala. Cand un simptom poate fi medical, trimitem la medic in acelasi pas in care il numim.
- **Nu facem interogatoriu si nu construim profil psihologic.** Onboardingul nu are nicio intrebare despre om. Singura informatie pastrata este usa aleasa.
- **Nu cerem bani pentru nimic.** Donatiile sunt singura sursa de venit si nu deblocheaza continut.
- **Nu inlocuim comunitatea reala.** Aplicatia spune explicit, in lectiile de final de drum, ca omul are nevoie de oameni.
- **Nu promitem vindecare, minune, insanatosire sau rezultat.** Promitem insotire.
- **Nu cerem omului sa contacteze pe cineva care i-a facut rau.**

---

## 2. Avertisment inaintea lectiilor grele

Lectiile care ating abuz, violenta domestica, agresiune sexuala, avort, dependenta, autovatamare, doliu prin sinucidere primesc, **inainte de primul pas**, un ecran scurt:

> Ce urmeaza atinge [subiectul]. Poti opri oricand si poti reveni. Daca acum ești in pericol sau te gandesti sa iti faci rau, apasa aici.

Cu doua actiuni: **Continua** si **Am nevoie de ajutor acum** (duce la ecranul de criza).

Avertismentul nu se dilueaza in text. E ecran separat.

---

## 3. Ecranul de criza — numere reale

Accesibil permanent din `.helpbar`, fara sa fie nevoie de cont si fara sa treaca prin nicio lectie.

| Situatie | Numar |
| --- | --- |
| Urgenta, pericol imediat | **112** |
| Copii si adolescenti (Telefonul Copilului) | **116 111** |
| Suport emotional / gand de suicid | **116 123** |
| TelVerde Antisuicid (program limitat) | **0800 801 200** |
| Violenta domestica | **0800 500 333** |

Reguli pe ecranul de criza:

- Zero versete inaintea numerelor. Numerele sunt primele pe ecran.
- Zero intrebari. Nu cerem omului sa descrie ce se intampla.
- Un singur rand dupa numere: "Nu ești singur. Suna. Ne intoarcem la drum cand ești in siguranta."
- Numerele nu se schimba fara verificare pe sursa oficiala.

---

## 4. Iertare ≠ impacare ≠ intoarcere in pericol

Aceasta este politica, nu o nuanta de lectie. Se aplica in tot continutul despre neiertare, familie, casnicie, abuz.

- **Iertarea** este ce faci tu inaintea lui Dumnezeu cu datoria pe care ti-o datoreaza cineva.
- **Impacarea** cere doua persoane si cere schimbare reala din partea celui care a facut raul.
- **Intoarcerea intr-un loc unde ești lovit, umilit sau in pericol nu este iertare si nu este ascultare.**

Pasii `n6_3`, `n6_4`, `n6_5` din `neiertareC.ts` sunt implementarea acestei politici si sunt **nenegociabili**. Nu se rescriu, nu se scurteaza, nu se muta mai tarziu in lectie.

La fel, `u5_7` (postul: nu se practica in tratament, tulburari de alimentatie, sarcina, alaptare) si `u6_8` (depresia cere medic, nu post) din `umblareB.ts` sunt **nenegociabili**.

---

## 5. Minori si oameni vulnerabili

- Continutul pentru adolescenti este **separat**. Nu servim adolescentilor lectii scrise pentru adulti despre infidelitate, pornografie, avort, divort.
- Cele sase lectii pentru adolescenti (folderul `adolescenti/`) se migreaza in arhitectura noua **numai** dupa ce trec prin acest document.
- In continutul pentru adolescenti, orice pas care atinge abuz duce la **116 111**, nu la 116 123.
- Nu cerem nicaieri varsta, adresa, scoala, numele parintilor, fotografii.
- Nu exista mesagerie privata intre utilizatori si nu va exista fara moderare umana.

---

## 6. Inainte de comunitate

Zona de comunitate **nu se lanseaza** pana nu exista, scrise si aplicate:

1. Reguli publice de postare, la vedere inainte de prima postare.
2. Buton de raportare pe fiecare postare, cu destinatie reala.
3. Cel putin un moderator uman responsabil, cu nume.
4. Interdictie de sfat medical, financiar si juridic intre utilizatori.
5. Interdictie de solicitare de bani intre utilizatori.
6. Zero acces pentru conturi de minori la mesaje private.

---

## 7. Inainte de mentorat

Mentoratul **nu se lanseaza** pana nu exista:

1. Verificare de identitate a mentorului.
2. Acord semnat: mentorul nu da sfat medical, nu cere bani, nu cere intalniri private cu minori, nu foloseste relatia pentru recrutare.
3. Regula "doi adulti" pentru orice interactiune cu un minor.
4. Canal de reclamatie direct catre echipa, nu catre mentor.
5. Posibilitatea utilizatorului de a intrerupe relatia dintr-un singur pas, fara explicatii.

Acelasi standard se aplica creatorilor de cursuri: cursul intra in aplicatie doar dupa validarea de doctrina si dupa validarea de siguranta.

---

## 8. Ce masuram si ce nu iese niciodata din telefon

### Ce masuram, anonim, la nivel de produs

Fara identitate, fara profil, fara continut scris de om:

1. Cate persoane deschid ecranul de intrare si cate apasa o usa (abandonul la uși).
2. Care uși sunt apasate cel mai des.
3. Cati incep prima lectie dupa ce au ales o usa.
4. La ce pas se opreste lectia (numarul pasului, nu ce a scris omul).
5. Cati revin dupa doua zile.
6. Cati ating ecranul de criza (numar, nu cine).

Asta e tot. Serveste unui singur scop: sa vedem unde pierdem omul si sa reparam drumul.

### Ce nu iese niciodata din telefon fara actiunea explicita a omului

- **Jurnalul.** Tot ce scrie omul in pasii de jurnal.
- **Rugaciunile** si notele de raspuns.
- Orice text liber.

Acestea stau in `localStorage` (`emanus_journey_v1`) si urca in Supabase **doar** in randul propriului utilizator, sub politici `journey_own` / `journal_own` / `prayers_own`. Nimeni din echipa nu citeste jurnalul cuiva. Nu exista ecran de administrare care sa arate text de jurnal.

**Cum se spune omului, in aplicatie:** textul de sub primul camp de rugaciune se schimba dupa configuratie (`privacyLine()` in `Today.tsx`). Cand backupul in cloud e activ, NU scriem "nu pleaca nicaieri de pe telefonul tau" — scriem ca se salveaza si intr-un spatiu de backup legat doar de el. O promisiune de confidentialitate care nu e adevarata e mai grava decat lipsa promisiunii.

### Ce nu masuram deloc

- **Nu te masuram pe tine.** Fara XP, fara serie, fara nivel, fara procent, fara "ziua X din Y". Absenta schimba doar tonul, niciodata scorul.
- Fara clasamente, fara comparatii intre utilizatori, fara badge-uri publice.
- Pasul de tip `reward` din player nu afiseaza puncte sau insigne. Campul `reward.xp` a ramas in tipuri din prima iteratie, e 0 in tot continutul nou si e ignorat deliberat la randare.

### Reguli tehnice

- Cheia secreta Supabase nu intra niciodata in `apps/web`.
- Repo-ul care contine chei de exemplu rămâne fara valori reale (`.env.example`).
- Orice cheie expusă se roteste, nu se ascunde.

---

## 9. Stergerea si controlul omului asupra datelor

- Un singur pas, vizibil, care sterge tot: jurnal, rugaciuni, drum, progres.
- "Ce ai scris rămâne al tău, oricare drum alegi" — schimbarea drumului nu sterge jurnalul.
- "Nu ma mai regasesc aici. Vreau alt drum." este vizibil pe ecranul de azi, nu in setari.
- Nu exista cont obligatoriu pentru a folosi aplicatia.

---

## 10. Cine e autorul si cine raspunde

Aici au fost amestecate multa vreme doua lucruri diferite. Se separa definitiv.

### 10.1 Autorul lectiilor: Emanus

Lectiile din aplicatie **nu au autor uman afisat**. Autorul este **Emanus**, iar sursa este **Biblia**. Nu punem nume de persoana pe ele, din trei motive:

1. **Siguranta.** Un nume de om sugereaza o persoana reala care citeste jurnalul si raspunsurile. Nu citeste nimeni. De aceea vocea din chat se prezinta ca Emanus (`GUIDE_NAME` in `LessonPlayer.tsx`), nu ca om.
2. **Autoritatea sta in text, nu in autor.** Fiecare afirmatie tare din lectie sta pe o referinta din Scriptura, la vedere, cu explicatie. Cine verifica, verifica versetul, nu reputatia cuiva.
3. **Nu construim cult de personalitate.** Aplicatia nu duce omul la un om. Il duce la Iisus.

Consecinta practica: **nu se blocheaza scrierea de continut** pentru lipsa unui nume de autor. Cele 35 de lectii care lipsesc se pot scrie acum.

### 10.2 Autorii apar cand apar creatorii

Cand se deschide zona pentru creatori — influenceri, pastori, oameni care aduc public in aplicatie — **acele** lectii au autor cu nume si fata, pentru ca omul trebuie sa stie de la cine primeste. Regula:

- Lectiile de baza ale aplicatiei: fara autor, semnate Emanus.
- Lectiile de creator: cu autor la vedere, dupa sablon, dupa validare de doctrina si de siguranta (§7).
- Nu se amesteca. Omul vede clar ce e continut de baza si ce e continut al unui creator.

### 10.3 Responsabilul de siguranta: are nevoie de un om real

Asta **nu** poate fi "Emanus". Nu e o chestiune de voce, e o chestiune de cineva care raspunde la telefon:

- verifica numerele de urgenta o data la sase luni;
- primeste rapoartele si reclamatiile;
- decide retragerea unui continut sau a unui creator;
- raspunde de continutul pentru minori.

Pana la lansarea publica, acest rol e al proprietarului aplicatiei, prin lipsa altcuiva. Nu e nevoie sa fie afisat in fiecare lectie, dar trebuie sa existe o adresa de contact reala in aplicatie si un om in spatele ei.

**Ce rămâne blocat de §10.3, si numai asta:** comunitatea, mentoratul si publicarea de lectii de creator. Nu continutul de baza.

---

## 11. Verificarea inainte de fiecare lectie noua

O lectie nu intra in cod daca nu trece toate liniile:

- [ ] Nu pune vina pe om pentru un simptom care poate fi medical.
- [ ] Nu cere iertare ca pretext pentru intoarcere in pericol.
- [ ] Are avertisment separat daca atinge abuz, violenta, dependenta, autovatamare.
- [ ] Nu cere date personale.
- [ ] Nu promite rezultat.
- [ ] Niciun verset citat gol; niciun cuvant de biserica neexplicat.
- [ ] Se termina cu un pas concret pentru astazi, nu cu o tema.
- [ ] Nu e fundatura: exista drum mai departe dupa ultimul pas.
- [ ] Vocea nu are nume de om si nu pretinde ca citeste ce a scris omul.
