# Revizie directă VT - valul 004

## Domeniu

- Corpus: Biblia Emanus, Vechiul Testament.
- Val: următoarele 1.000 de versete canonice.
- Interval: `LEV.11.3`-`NUM.10.11`.
- Surse citite: textul românesc BE, WEBU și payload-ul WLC-OSHB blocat în `source-lock.json`.
- Metodă: comparație directă verset cu verset, fără evaluator LLM și fără generare automată de verdicte.
- Stare după val: `in_review`; acest raport nu autorizează publicarea.

## Corecții aplicate

| Referință | Problemă | Corecție |
| --- | --- | --- |
| `LEV.11.3` | „Gheare” introduce o parte anatomică absentă din descrierea copitei. | `...copita despicată, adică despărțită în două...` |
| `LEV.11.26` | Aceeași adăugire „gheare” apare într-o regulă despre copita despicată. | `...copita despărțită în două...` |
| `LEV.13.5` | „Neschimbată în ochii lui” nu redă adjectivul ebraic pentru o leziune palidă/diminuată și adaugă o perspectivă absentă aici. | `...dacă rana a rămas palidă...` |
| `LEV.13.7` | „Eczemă” este un diagnostic modern impus peste termenul ebraic disputat `mispaḥat`. | `...dacă erupția se va întinde...` |
| `LEV.13.8` | Aceeași problemă de diagnostic modern în versetul următor. | `...dacă erupția s-a întins...` |
| `LEV.13.39` | „Eczemă albă” transformă o descriere de pată albă într-un diagnostic medical. | `...este o pată albă izbucnită pe piele...` |
| `LEV.14.3` | „Preotul să ieși” este o formă gramaticală greșită pentru narațiunea la viitor. | `Preotul va ieși afară din tabără și îl va examina...` |
| `LEV.14.41` | „Va radia” și „au ras-o” sunt alegeri lexicale greșite pentru răzuirea tencuielii; locul necurat din afara cetății trebuie păstrat. | `Va răzui... tencuiala pe care au răzuit-o... într-un loc necurat din afara cetății.` |
| `LEV.14.56` | „Eczemă” introduce din nou un diagnostic modern pentru `mispaḥat`. | `...pentru umflătură, pentru erupție și pentru pată...` |
| `LEV.17.6` | „Va ardă” este o conjugare imposibilă. | `...și va arde grăsimea...` |
| `LEV.18.14` | „Să nu te meargă” este o eroare gramaticală și pierde verbul „a se apropia”. | `...să nu te apropii de nevasta lui...` |
| `LEV.18.19` | „Să nu te apropi” este o formă verbală incompletă. | `Să nu te apropii de o femeie...` |
| `LEV.18.25` | Timpul prezent „pedepsesc” nu redă forma verbală la trecut din textul ebraic. | `...de aceea am pedepsit-o pentru nelegiuirea ei...` |
| `LEV.18.28` | „Varsa” nu are diacritica și forma corectă a verbului. | `...nu vă va vărsa...` |
| `LEV.19.14` | „Orbitor” este o eroare de formă pentru substantivul „orb”. | `...înaintea orbului...` |
| `LEV.19.33` | „Să nu-l asuprit” este o formă verbală greșită, iar adresarea era amestecată între singular și plural. | `Dacă un străin va locui cu voi în țara voastră, să nu-l asupriți.` |
| `LEV.20.15` | „Să-l ucideți” era corupt în „să-l ucidăți”, iar construcția era neclară. | `...iar voi să ucideți animalul.` |
| `LEV.20.22` | „Varse” este o formă fără diacritică și nu este forma corectă a verbului. | `...ca să nu vă verse țara...` |
| `LEV.20.24` | Cliticul „vă-am” este greșit. | `...Care v-a separat de alte popoare!` |
| `LEV.21.20` | `ʾāšek` desemnează testiculele, nu rinichii. | `...sau care are testiculele vătămate.` |
| `LEV.22.3` | „Se va adresa lucrurilor sfinte” nu redă verbul ebraic pentru apropierea de lucrurile sfinte. | `...care se va apropia de lucrurile sfinte...` |
| `LEV.23.30` | „Îl voi nimicit” combină greșit viitorul cu forma de perfect. | `...îl voi nimici...` |
| `LEV.23.32` | „Praznui” nu are diacritica necesară. | `...veți prăznui Sabatul vostru.` |
| `LEV.23.39` | Aceeași formă fără diacritică în descrierea sărbătorii. | `...veți prăznui sărbătoarea DOMNULUI...` |
| `LEV.25.2` | Aceeași formă fără diacritică în porunca despre anul sabatic. | `...pământul să prăznuiască un Sabat...` |
| `LEV.25.3` | „Curăți” este forma greșită pentru conjunctivul verbului „a curăța”. | `...să-ți cureți via...` |
| `LEV.25.4` | Aceeași conjugare greșită. | `...via ta să nu o cureți.` |
| `LEV.25.14` | Persoana era amestecată: „vindeți” cu „aproapelui tău”. | `...aproapelui vostru... din mâna aproapelui vostru...` |
| `LEV.25.15` | „Să cumpări” este o formă verbală greșită. | `Să cumperi de la aproapele tău...` |
| `LEV.26.16` | „Tuberculoza” impune un diagnostic medical modern peste `šaḥep̄eṯ`, termen pentru boală mistuitoare/consumare. | `...groaza, boala mistuitoare și febra...` |
| `NUM.5.15` | Articolele „o dar” nu respectă genul substantivului; formula repetată trebuie să fie coerentă. | `...un dar de cereale al geloziei, un dar de cereale de aducere aminte...` |
| `NUM.5.26` | „Arardă” este o eroare de tastare. | `...să o ardă pe altar...` |
| `NUM.6.20` | `šōq` desemnează pulpa/coapsa, nu spata. | `...împreună cu pieptul legănat și pulpa legănată.` |
| `NUM.7.13`, `NUM.7.19`, `NUM.7.25`, `NUM.7.31`, `NUM.7.37`, `NUM.7.43`, `NUM.7.49`, `NUM.7.55`, `NUM.7.61`, `NUM.7.67`, `NUM.7.73`, `NUM.7.79` | Formula repetată „o dar de cereale” are acord gramatical greșit în toate cele 12 ofrande. | `...pentru un dar de cereale.` |
| `NUM.8.21` | „De păcat” adaugă o vină morală explicită acolo unde versetul descrie curățirea rituală a leviților. | `Leviții s-au curățit și și-au spălat hainele...` |

## Diferențe verificate și păstrate

- Repetiția detaliată a ofrandelor din Numeri 7 a fost păstrată; s-a reparat doar acordul gramatical repetat, fără comprimarea textului.
- „Eczemă” a fost eliminat în locurile unde termenul ebraic descrie o erupție sau o pată, nu o boală modernă identificabilă cu certitudine. Nota editorială existentă pentru `mispaḥat` rămâne aliniată cu „erupție”.
- „Tuberculoză” a fost înlocuită cu „boală mistuitoare” pentru a nu prezenta ca diagnostic cert o identificare medicală modernă a termenului ebraic.
- Termenii anatomici „pulpa” și „testiculele” au fost corectați numai acolo unde payload-ul ebraic și contextul WEBU indică explicit aceste părți; utilizările pentru alți termeni anatomici nu au fost schimbate automat.
- Denumirile și formulele cultice care admit diferențe de tradiție nu au fost rescrise doar pentru preferință stilistică.

## Validare

- `check-biblia-emanus.py`: exit 0.
- `check-biblia-emanus-romanian-quality.py --testament OT`: 0 probleme.
- `check-biblia-emanus-ot-semantic-screening.py`: 23.145 versete legate de surse; 60 în coada de verificare.
- `check-biblia-emanus-ot-source-evidence.py`: 23.145 versete cu surse fixate și dovadă per-verset.
- `check-biblia-emanus-ot-publication-gate.py`: exit 0, dar VT rămâne `in_review`.
- `git diff --check`: exit 0.

## Concluzie a valului

Revizia directă a celor 1.000 de versete este încheiată. Au fost corectate 46 de versete pentru erori gramaticale, forme corupte, diagnostice moderne introduse fără suport și diferențe lexicale clare față de ebraică. Dovezile hash-bound au fost recalibrate numai pentru aceste 46 de referințe. Manifestul rămâne `in_review`; acest val nu autorizează publicarea VT.
