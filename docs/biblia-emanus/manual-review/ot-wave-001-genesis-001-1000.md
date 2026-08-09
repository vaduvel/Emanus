# Revizie manuală VT - valul 001

## Domeniu

- Corpus: Biblia Emanus, Vechiul Testament.
- Val: primele 1.000 de versete canonice.
- Interval: `GEN.1.1`-`GEN.34.19`.
- Surse citite: textul românesc BE, WEBU și payload-ul WLC-OSHB blocat în `source-lock.json`.
- Metodă: comparație directă verset cu verset, fără evaluator LLM local și fără generare automată de verdicte.
- Stare după val: `in_review`; acest raport nu autorizează publicarea.

## Corecții aplicate

| Referință | Problemă | Corecție |
| --- | --- | --- |
| `GEN.19.15` | `ba'avon` denumește nelegiuirea/vina cetății, nu o „pedeapsă” introdusă de traducere. | `...ca să nu pieri din cauza nelegiuirii cetății.` |
| `GEN.22.23` | Dublare tipografică: `i i-a`. | `i-a`. |

## Diferențe verificate și păstrate

Următoarele nu au fost modificate deoarece sunt opțiuni lexicale sau interpretative atestate de textul ebraic și de WEBU, nu omisiuni demonstrabile:

- `GEN.3.16`: `עִצְּבוֹנֵךְ` și `וְהֵרֹנֵךְ` permit redarea durerii/trudei și a sarcinii; formularea actuală trebuie păstrată în revizia lexicală următoare, fără a inventa o doctrină.
- `GEN.3.18`: subiectul verbului este pământul; pronumele românesc se referă la pământul din versetul precedent.
- `GEN.5.2`: `אָדָם` poate fi redat „Adam” sau „om”; alegerea actuală păstrează valoarea semantică a substantivului și nu adaugă o persoană.
- `GEN.6.3`: `יָדֹון` are o discuție lexicală reală („a stărui”, „a se lupta”, „a rămâne”); „nu va rămâne” nu este o omisiune demonstrabilă.
- `GEN.16.13`: ultima propoziție este ambiguă în ebraică; BE păstrează o redare literală, iar WEBU folosește o interpretare diferită.
- `GEN.18.19`: `יְדַעְתִּיו` poate fi redat „l-am cunoscut” sau „l-am ales” în contextul legământului; nu s-a schimbat fără motiv suficient.
- `GEN.21.9`: `מְצַחֵק` poate însemna râzând/jucându-se/batjocorind; textul BE nu adaugă un obiect care nu apare în ebraică.
- `GEN.27.36`: `וַיַּעְקְבֵנִי` exprimă ideea de a suplanta/înșela; formularea actuală este compatibilă cu sensul contextual, dar rămâne notată pentru triangularea românească.
- `GEN.27.39`: `מִן` permite interpretări diferite în construcția despre belșugul pământului; diferența față de WEBU este documentată ca variantă de traducere, nu este corectată automat.
- `GEN.30.20`: `יִזְבְּלֵנִי` poate susține „mă va cinsti” sau „va locui cu mine”; formularea actuală este o alegere lexicală, nu o adăugare doctrinară.
- `GEN.33.11`: `בִּרְכָתִי` este literal „binecuvântarea mea”, deși contextul o folosește ca dar; BE păstrează termenul ebraic.

## Concluzie a valului

Lectura directă a celor 1.000 de versete este încheiată. Au fost găsite două erori obiective și au fost corectate. Diferențele rămase sunt marcate pentru decizie editorială lexicală; nu sunt transformate în „aprobări” automate. Dovezile hash-bound vor fi regenerate numai după închiderea corecțiilor și a jurnalului pentru acest val.
