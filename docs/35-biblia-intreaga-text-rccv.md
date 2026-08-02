# Biblia întreagă în aplicaţie — textul RCCV

Hotărârea, spusă scurt: **în aplicaţie intră Biblia toată**. Cât apucăm să explicăm,
stă explicat; restul stă ca text curat, de citit. Textul biblic **nu se desparte** de
explicaţie acolo unde explicaţia există — unităţile rămân cum sunt.

---

## 1. Pricina: ortografia din 1924 nu se mai citeşte

Până acum am scris textul biblic în ortografia ediţiei originale din 1924:

> Iar naşterea lui Isus Hristos a fost aşa: Maria, mama Lui, era logodită cu Iosif;
> şi înainte ca să locuiască ei împreună, ea s'a aflat însărcinată **dela** Duhul
> **Sfînt**.

Suntem în 2026. Un om tânăr care deschide aplicaţia şi dă peste *sînt*, *dela*,
*s'a*, *cari*, *întunerec* — se opreşte la a treia propoziţie. Pia declarăm pe faţă:
ortografia aceea a fost o greşeală de al noastră, nu o credincioşie.

---

## 2. Ediţia aleasă: RCCV

**Protestant Romanian Corrected Cornilescu Version** (RCCV) — acelaşi Cornilescu,
cu ortografia adusă la zi. Nu e traducere nouă; sunt aceleaşi cuvinte:

> Iar naşterea lui Isus Hristos a fost aşa: Maria, mama Lui, era logodită cu Iosif;
> şi, înainte ca să locuiască ei împreună, ea **s-a** aflat însărcinată **de la**
> Duhul **Sfânt**.

Ce se schimbă: *sînt* → *sunt*, *dela* → *de la*, *s'a* → *s-a*, *gînd* → *gând*,
*întunerec* → *întuneric*, iar ghilimelele ,, `` devin „ ”.

**Lucrul cel mai bun:** învăţătura scrisă până acum rămâne întreagă. Cuvintele
ebraice, trimiterile, „Pentru inima ta" — toate stau pe aceleaşi cuvinte româneşti.

---

## 3. Drepturile — se spune drept, nu se ascunde

Situl `bible-api.com` scrie la fiecare răspuns `"translation_note": "Public Domain"`,
iar `open-bibles` la fel. **Nu ne rezemăm pe eticheta aceea.**

Dumitru Cornilescu a murit în 1975. În România şi în Uniunea Europeană, drepturile
patrimoniale ţin 70 de ani de la moartea autorului — adică până în 2045. Tribunalul
Bucureşti a hotărât în 2008 că Biblia Cornilescu **nu** este în domeniul public în
România; drepturile sunt ţinute prin BFBS şi Societatea Biblică Interconfesională
(SBIR). „Public domain" de pe siturile acelea este o socoteală americană (tipărit
înainte de 1929), nu una românească.

Nu există nicio traducere modernă şi limpede care să fie **sigur** liberă: Gala
Galaction 1938 iese în 2032, Biblia 1914 e tot atât de greu de citit, iar NTR este a
Biblicăi, cu drepturi rezervate.

**Ce facem.** Mergem mai departe cu RCCV, cum face toată lumea, fiindcă Emanus e
fără bani, numai pe donaţii (D-009). Şi, în acelaşi timp, **se scrie la SBIR** şi se
cere încuviinţare în scris pentru folosinţă necomercială. Până vine răspunsul, în
subsolul secţiunii Biblia stă mulţumirea şi izvorul. **Aceasta este o hotărâre de
luat de om, nu de agent.**

---

## 4. De unde se ia textul

| Izvor | Ce dă | Bun de |
|---|---|---|
| `seven1m/open-bibles`, fişierul `ron-rccv.usfx.xml` | Biblia întreagă, XML USFX | **fişierul de temelie** |
| `bible-api.com/<carte>+<cap>?translation=rccv` | JSON, capitol cu capitol | îndreptat capitole răzleţe |
| `thiagobodruk/bible`, `ro_cornilescu.json` | JSON gata făcut | de verificat — poate fi ortografia veche |

Se ia **cel dintâi**. Este chiar fişierul din spatele lui `bible-api.com`, deci
acelaşi text pe care l-am probat cu mâna.

---

## 5. Ce se cere agentului cu reţea

Se pune câte un fişier de carte, aici:

```
packages/shared/src/bible/text/ro-rccv/<id-carte>.json
```

Pildă: `geneza.json`, `matei.json`, `fapte.json`. Numele fişierului este acelaşi cu
`id`-ul cărţii din `packages/shared/src/bible/types.ts`.

Tiparul dinăuntru:

```json
{
  "id": "geneza",
  "name": "Geneza",
  "abbrev": "Gen",
  "testament": "vt",
  "order": 1,
  "chapters": [
    [
      "La început, Dumnezeu a făcut cerurile și pământul.",
      "Pământul era pustiu și gol; peste fața adâncului de ape era întuneric..."
    ]
  ]
}
```

### Trei reguli la scriere

1. **Virgulă, nu sedilă.** RCCV vine cu ş şi ţ (sedilă, U+015F şi U+0163). Se schimbă
   în ș şi ț (virgulă dedesubt, U+0219 şi U+021B), şi la fel majusculele.
2. **Nimic în plus în text.** Fără număr de verset înăuntru, fără spaţii la capăt,
   fără titluri de secţiune. Un verset = un şir. Versetul 1 stă la locul 0.
3. **Numele cărţilor în româneşte**, cum le ştie omul de la amvon: Geneza, Exodul,
   Leviticul, Numeri, Deuteronomul... Matei, Marcu, Luca, Ioan, Faptele apostolilor.

La urmă, un `index.json` cu lista celor 66 de cărţi în ordine, cu `id`, `name`,
`testament`, `order` şi numărul de capitole.

---

## 6. Cum se leagă în aplicaţie

Două straturi, fără să se schimbe nimic din ce stă acum în picioare:

- **Capitolul explicat** — `BibleChapter` cu unităţile lui, cum îl avem la Geneza.
  Textul stă în unitate, lângă învăţătură. Nu se atinge.
- **Capitolul necitit încă de noi** — se ia din `text/ro-rccv/<carte>.json` şi se
  arată curat, verset cu verset.

Ruta `/biblia/:carte/:capitol` caută întâi capitolul explicat. Dacă nu-l găseşte sau
nu e `published`, arată textul simplu, cu un rând cinstit dedesubt:

> *La capitolul acesta n-am ajuns încă cu explicaţia. Citeşte-l aşa cum este —
> Cuvântul lucrează şi fără notă de subsol.*

Aşa, secţiunea Biblia e întreagă din ziua dintâi, iar explicaţiile cresc în ea, una
câte una.

---

## 7. Ce nu se face

- Nu se pune VDC 2014 de pe `bible.com` — acolo drepturile sunt limpezi şi ale
  altcuiva.
- Nu se amestecă două ediţii în aceeaşi carte.
- Nu se îndreaptă textul RCCV după capul nostru. Dacă un verset pare greşit, se
  scrie într-o fişă de îndreptat, nu se schimbă pe tăcute.
