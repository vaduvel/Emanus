# Geneza — ce mai rămâne de făcut, şi de cine

Tot ce se putea face fără om s-a făcut. Hârtia aceasta spune limpede ce a fost
verificat de maşină şi ce aşteaptă ochi de om.

## Ce este încheiat

- **Textul biblic.** Toate cele 289 de unităţi din Geneza 1–50 au textul adus din
  ediţia Cornilescu 1924, cu diacriticele şi ortografia ei. Nu mai este scris
  din memorie niciun cuvânt de Scriptură. Mecanismul: `scripts/rewrite-bible-text.py`.
- **Colăţionarea.** `docs/22-colationare-geneza.md` a arătat 112 unităţi sub prag
  şi 67 de citări prescurtate; înlocuirea din sursă le-a rezolvat pe toate.
- **Greşelile de literă.** `scripts/fix-known-typos.py`, cu pază în CI.
- **Cuvintele în limba originală.** Toate 196 sunt strânse în
  `docs/24-cuvinte-in-limba-originala.md`. Cele găsite greşite au fost îndreptate
  prin `scripts/fix-hebrew.py`:
  - Geneza 2:25 — forma este de plural (*arummim*, goţi amândoi), nu *arum*;
    jocul de cuvinte cu şiretenia şarpelui din 3:1 rămâne, dar acum e scris drept.
  - Geneza 2:7 — suflarea de viaţă nu se spune numai despre Dumnezeu şi om;
    la Geneza 7:22 se rosteşte şi despre vietăţi. Afirmaţia a fost îngustată.
  - Geneza 4:10 — înţelesul pluralului „sângiuri" ca urmaşii nenăscuţi este
    tâlcuire veche, nu spusă a textului. Acum se arată ca atare.
  - Scrieri greşite ale cuvintelor: Geneza 10 (*toledot*, *ghibor*), 24 (*la-suah*),
    44 (*qesura*).
  - Transliterări nepotrivite între ele: *El Șadai*, *şalom*, *Menaşe*, *Șilo*, *Pereţ*.

## Ce cere om, şi nu se poate altfel

### 1. Cercetarea cuvintelor ebraice într-un lexicon

Cele 196 de afirmaţii au fost scrise din cunoştinţă şi curate de ce era vădit
greşit. Nu au fost încă puse faţă în faţă cu un lexicon. **Ce nu se confirmă, se
scoate** — nu se îndulceşte, se scoate. Lista e gata de lucru în `docs/24`.

Locurile care cer cea mai mare luare-aminte, fiind cele mai greu de sprijinit:

- afirmaţiile cu „cel dintâi loc din Scriptură" (Geneza 6:8 *hen*, 6:18 *berit*,
  8:20 *mizbeah*, 14:19 *El Elion*, 48:15 *ha-roe*, 49:24 *Abir Iaakov*);
- *Șilo* la 49:10, unde am dat trei citiri deodată;
- *Tafnat-Paeneah* la 41:45, cuvânt egiptean, nu ebraic;
- numărul de 110 ani ca viaţă împlinită la egipteni, îmbălsămarea de 40 de zile
  şi jelirea de 70, la Geneza 50.

### 2. Citirea teologică

50 de capitole, 289 de unităţi. **Niciun capitol nu trece pe `published` fără
citire de om.** Toate poartă astăzi `status: "in_review"` şi arată în aplicaţie
semnul „în revizie".

Se poate merge capitol cu capitol: se schimbă `status` în `"published"` în
fişierul capitolului, iar semnul dispare de la sine.

Locurile de citit cu cea mai mare grijă, fiind cele unde textul atinge răni:
Geneza 16:9, 19:8, 19:30-38, 22:9-10, 29:23-25, 30:14-21, 34, 38, 39:19-20,
50:20. Pentru fiecare s-a scris cu măsură, dar măsura se cade cântărită de om.

### 3. Ce nu s-a lămurit şi trebuie hotărât

- **Diacriticele.** Textul biblic le are, explicaţiile nu. Neuniformitatea este
  asumată deocamdată: era mai important ca textul sfânt să fie corect decât
  potrivit la haină cu restul. De hotărât dacă se pun peste tot.
- La Geneza 4:8 lipseşte din textul masoretic ce i-a zis Cain lui Abel;
  am spus-o în explicaţie, dar se cade văzut dacă e spus destul de limpede.

## Datoria de recunoştinţă

Ordinea unităţilor, opririle, observaţiile şi aplicaţiile urmează predica verset
cu verset a păstorului Allen Nolan (Cornerstone Fellowship, Tahlequah). **Niciun
rând nu este copiat** — cuvintele sunt scrise pentru Emanus. Păstorul Nolan nu a
văzut şi nu a încuviinţat nimic din ce este aici; nu se poate spune nicăieri că
ar fi făcut-o. La fiecare carte se pune notă de mulţumire.

## Ce urmează după Geneza

Ioan, apoi Matei, apoi părţile despre Pavel din Fapte; mai departe Levitic,
Proverbe, Isaia; Apocalipsa la urmă. Pentru fiecare carte nouă, textul biblic se
aduce de la început din sursă (`wordproject.org/bibles/ro/<NN>/<cap>.htm`), nu
din memorie.
