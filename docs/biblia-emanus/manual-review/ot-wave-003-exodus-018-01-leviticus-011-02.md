# Revizie directă VT - valul 003

## Domeniu

- Corpus: Biblia Emanus, Vechiul Testament.
- Val: următoarele 1.000 de versete canonice.
- Interval: `EXO.18.1`-`LEV.11.2`.
- Surse citite: textul românesc BE, WEBU și payload-ul WLC-OSHB blocat în `source-lock.json`.
- Metodă: comparație directă verset cu verset, fără evaluator LLM și fără generare automată de verdicte.
- Stare după val: `in_review`; acest raport nu autorizează publicarea.

## Corecții aplicate

| Referință | Problemă | Corecție |
| --- | --- | --- |
| `LEV.4.23` | „Comutat” este o eroare lexicală; versetul vorbește despre păcatul comis. | `...păcatul pe care l-a comis...` |
| `LEV.4.28` | „Comutat” este o eroare lexicală în aceeași formulă repetată. | `...păcatul pe care l-a comis.` |
| `LEV.4.35` | „Comutat” este o eroare lexicală în formula despre păcat. | `...păcatul pe care l-a comis...` |
| `LEV.5.10` | „Comutat” nu poate reda verbul ebraic pentru păcat săvârșit. | `...păcatul pe care l-a comis...` |
| `LEV.5.13` | „Comutat” este repetat într-o formulă juridico-rituală și schimbă sensul. | `...păcatul pe care l-a comis...` |
| `LEV.7.33` | Ebraicul `שׁוֹק` desemnează pulpa/coapsa; „spata” desemnează o altă parte anatomică. | `...îi va reveni pulpa dreaptă...` |
| `LEV.8.25` | Aceeași parte din jertfa de consacrare a fost numită greșit „spată”. | `...și pulpa dreaptă.` |
| `LEV.8.26` | Referința la partea jertfei trebuie să rămână „pulpa”, nu „spata”. | `...pe pulpa dreaptă.` |
| `LEV.9.21` | Partea legănată este `שׁוֹק`, nu spata/umărul. | `Piepturile și pulpa dreaptă...` |
| `LEV.10.15` | Formula repetată despre partea ridicată folosea „spata” pentru `שׁוֹק`. | `Vor aduce pulpa ridicată...` |
| `LEV.10.20` | „Explicația” introduce în verset un substantiv interpretativ absent din formularea ebraică. | `...lucrul acesta a fost plăcut în ochii lui.` |

## Diferențe verificate și păstrate

- `EXO.20.6`: `לַאֲלָפִים` permite o redare interpretativă în „până la mii de generații”; nu am schimbat formularea fără un motiv lexical suficient, deoarece sensul numeric și relațional este păstrat în context.
- `EXO.25.5`, `EXO.26.14`, `EXO.35.7`, `EXO.35.23`, `EXO.36.19`, `EXO.39.34`: `עֹרֹת תְּחָשִׁים` are identificare disputată; „piei fine” este păstrat în acord cu nota editorială, fără a impune „piei de animal marin” din WEBU.
- Denumirile pietrelor din veșmintele preoțești au identificări istorico-lexicale nesigure. Nu am înlocuit termenii existenți pe baza unei singure echivalări englezești.
- `LEV.6.21`: formularea despre darul pregătit pe plită este o alegere de redare pentru `בלולה`; nu am tratat diferența de stil față de WEBU ca eroare de sens.
- În locurile unde ebraicul indică `שׁוֹק` am corectat „spata”; utilizările „spată” pentru alți termeni ebraici care denumesc umărul sau partea anterioară a animalului nu au fost schimbate automat.

## Concluzie a valului

Revizia directă a celor 1.000 de versete este încheiată. Au fost găsite și corectate 11 probleme obiective de vocabular, anatomie lexicală și adaos interpretativ. Diferențele rămase sunt marcate pentru decizie editorială, nu transformate în aprobări automate. Dovezile hash-bound au fost recalculate numai pentru cele 11 versete schimbate. Manifestul rămâne `in_review`; acest val nu autorizează publicarea VT.
