# Rut — surse și reguli pentru Biblia explicată

## Stare

- Carte: **Rut**
- Capitole: **4 / 4**
- Versete Biblia Emanus: **85 / 85**
- Unități explicate: **12**
- Stare editorială: toate capitolele `in_review`
- Ramură: `agent/biblia-explicata-vt-rut`

Acest val pornește numai din ramura `agent/transcrieri-poonen-VT` și din cele patru capitole Biblia Emanus pentru Rut.

## Regula doctrinară

- Textul biblic este Biblia Emanus și rămâne separat de explicație.
- Explicația doctrinară și aplicația urmează transcrierea Poonen `judges-ruth.txt`.
- Reformularea este permisă numai pentru limba română, claritate și structură.
- Nu se adaugă din memoria modelului doctrine sau tipologii pe care transcrierea nu le susține.
- Când o afirmație din transcriere pare greșită, deplasată sau produsă de Whisper, ea se verifică în textul biblic înainte de folosire.

## Ancorele Poonen folosite

- Rut 1: `judges-ruth.txt`, aproximativ liniile 2130–2500 — originea moabită, alegerea la răscruce, „Dumnezeul tău este Dumnezeul meu”, întoarcerea Naomei și fidelitatea Rutiei.
- Rut 2: aproximativ liniile 2450–2660 — Rut nu caută un soț, ci pe Dumnezeu; munca pentru Naomi; bunătatea și protecția lui Boaz; caracterul Rutiei.
- Rut 3: aproximativ liniile 2620–2810 — Naomi caută siguranță pentru Rut; cererea către ruda apropiată; Boaz respectă dreptul rudei mai apropiate.
- Rut 4: aproximativ liniile 2760–3000 — refuzul primei rude, sandala, hotărârea lui Boaz, Obed–Isai–David și „pe cei ce Mă cinstesc îi voi cinsti”.

Corecții făcute prin verificarea Scripturii:

- Originea lui Moab este formulată după Geneza 19:30–38, fără a repeta formularea imprecisă din transcript că Lot ar fi inițiat relația.
- Rut este legată sigur de linia lui David și de genealogia mesianică din Matei 1; nu se afirmă separat o genealogie a Mariei pe care textul biblic nu o declară explicit.

## Cuvinte ebraice

Studiile lexicale sunt un strat separat de explicația Poonen. Termenii incluși sunt:

- `חֶסֶד` — **hesed**, bunătate loială;
- `דָּבְקָה` — **daveqah**, s-a alipit;
- `נָעֳמִי / מָרָא` — **Naomi / Mara**, plăcută / amară;
- `כְּנָפָיו` și `כְנָפֶךָ` — **kenafav / kenafekha**, aripile Lui / aripa ta;
- `מִגֹּאֲלֵנוּ`, `גֹאֵל`, forme ale rădăcinii `גאל` — ruda-răscumpărătoare;
- `מָנוֹחַ` — **manoah**, odihnă și siguranță.

Formele sunt verificate în textul ebraic WLC-OSHB folosit deja la auditul Bibliei Emanus. Notele lexicale explică sensul contextual și nu sunt prezentate ca afirmații ale lui Poonen atunci când transcriptul nu le menționează.

## Validare

```bash
pnpm check:rut
```

Poarta verifică:

- cele patru surse Biblia Emanus;
- toate cele 85 de versete;
- acoperirea continuă prin 12 unități;
- existența ancorelor din transcript;
- statusul `in_review`;
- includerea cărții după Iosua;
- prezența formelor ebraice în notele lexicale.
