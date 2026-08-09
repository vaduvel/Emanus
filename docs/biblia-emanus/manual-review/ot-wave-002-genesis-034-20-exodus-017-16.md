# Revizie directă VT - valul 002

## Domeniu

- Corpus: Biblia Emanus, Vechiul Testament.
- Val: următoarele 1.000 de versete canonice.
- Interval: `GEN.34.20`-`EXO.17.16`.
- Surse citite: textul românesc BE, WEBU și payload-ul WLC-OSHB blocat în `source-lock.json`.
- Metodă: comparație directă verset cu verset, fără evaluator LLM și fără generare automată de verdicte.
- Stare după val: `in_review`; acest raport nu autorizează publicarea.

## Corecții aplicate

| Referință | Problemă | Corecție |
| --- | --- | --- |
| `EXO.12.37` | Ebraicul `טף` înseamnă copii/cei mici; „cei aflați în întreținerea lor” este o parafrază care pierde referința explicită la copii. | `...în afară de copii.` |
| `EXO.13.17` | Ebraicul `קָרוֹב` înseamnă „aproape”, nu „mai scurt”. | `...deși era aproape...` |
| `EXO.17.16` | `כִּי־יָד עַל־כֵּס יָהּ` include conjuncția `căci` și prepoziția „pe”; formularea anterioară adăuga „ridicată spre”. | `Căci o mână este pe tronul lui Yah!` |

## Diferențe verificate și păstrate

- `EXO.8.16-18`: `כִנִּים` este un termen lexical disputat; „țânțari”, „păduchi” și „musculițe” sunt variante atestate. Nu am înlocuit o decizie documentată doar pentru că WEBU folosește „lice”.
- `EXO.8.21-32`: `עָרֹב` nu identifică explicit specia insectelor; „roiuri de insecte” este păstrat în locul interpretării „muște”.
- `EXO.13.18`: `חֲמֻשִׁים` are variante de traducere precum „înarmați” și „în formație”; formularea actuală rămâne o alegere lexicală documentată, nu o omisiune demonstrată.
- `EXO.15.14`: `חִיל` poate descrie spasme, dureri sau groază în context poetic; diferența față de WEBU este notată pentru revizia lexicală, fără corectură forțată.
- Geneza 34.20-50.26 și Exodul 1.1-17.16 au fost citite integral în ordine. Nu au fost identificate alte omisiuni clare de nume, numere, negații sau propoziții.

## Concluzie a valului

Revizia directă a celor 1.000 de versete este încheiată. Au fost găsite și corectate trei probleme de fidelitate lexicală sau gramaticală. Diferențele rămase sunt marcate pentru decizie editorială, nu transformate în aprobări automate. Dovezile hash-bound trebuie recalculate numai pentru cele trei versete schimbate.
