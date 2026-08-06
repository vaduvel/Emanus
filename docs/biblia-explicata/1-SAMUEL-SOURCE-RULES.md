# 1 Samuel — surse și stare

## Stare

- Carte: **1 Samuel**
- Capitole: **31 / 31**
- Versete Biblia Emanus: **810 / 810**
- Unități explicate: **60**
- Stare editorială: toate capitolele `in_review`
- Ramură: `agent/biblia-explicata-vt-1-samuel`
- Bază stivuită: `agent/biblia-explicata-vt-rut`

## Regula de sursă

- Text biblic: Biblia Emanus, `1SA.1.json`–`1SA.31.json`, copiat identic din ramura `agent/biblia-emanus-ot-and-apocrypha`.
- Explicație doctrinară: transcrierea `.research/poonen-through-the-bible-OT/transcripts/samuel-1.txt`.
- Unde transcriptul nu dezvoltă separat un capitol, explicația rămâne la faptele narațiunii și la temele exprimate de Poonen în secțiunea apropiată; nu se construiește o doctrină nouă.
- Afirmațiile problematice sau imprecise sunt verificate în textul biblic înainte de folosire.
- Cuvintele ebraice sunt note lexicale separate, verificate în WLC-OSHB și introduse numai când lămuresc sensul pasajului.
- Toate capitolele rămân `in_review` până la revizie.

## Firele principale preluate din Poonen

- Ana: rugăciunea care trece de la nevoia personală la nevoia lucrării lui Dumnezeu;
- Eli: pericolul de a-i cinsti pe copii mai mult decât pe Dumnezeu;
- Samuel: «Vorbește, căci robul Tău ascultă» și fidelitatea de a spune tot mesajul;
- chivotul: simbolul și strigătul nu înlocuiesc pocăința;
- fiii lui Samuel: parțialitatea față de familie și numirea fără chemare;
- Saul: calitățile bune de la început și declinul prin nerăbdare, ascultare parțială, frica oamenilor, gelozie și violență;
- David: Dumnezeu privește la inimă; luptele private înaintea lui Goliat; anii de formare în peșteri și deprinderea de a cere călăuzire;
- Ionatan: libertatea de gelozie și recunoașterea ungerii altuia;
- sfârșitul lui Saul: avertismentul că un început bun trebuie păstrat prin ascultare până la capăt.

## Protecții

- Războaiele sunt prezentate în cadrul narațiunii Vechiului Testament și nu autorizează violența religioasă modernă.
- «Duhul rău» care îl tulbură pe Saul nu este folosit pentru a construi o doctrină speculativă despre demoni.
- Episodul mediumului din En-Dor nu este prezentat ca metodă permisă de călăuzire și nu se ia o poziție dogmatică asupra mecanismului apariției.
- Moartea lui Saul nu este prezentată ca model sau justificare pentru sinucidere.

## Validare

```bash
pnpm check:1-samuel
```

Poarta verifică cele 31 de surse Biblia Emanus, 810 versete, 60 de unități continue, registrul editorial, ancorele Poonen și protecțiile pentru ocultism și sinucidere.
