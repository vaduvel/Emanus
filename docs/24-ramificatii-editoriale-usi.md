# Ramificatii editoriale pentru traseele din Usi

## Scop

Ramificarea nu este un ornament si nu se aplica automat tuturor lectiilor.
O selectie primeste ramura numai cand alegerea utilizatorului schimba raspunsul
pastoral, limita de siguranta sau urmatorul adevar care trebuie spus.

Ramura actuala din player este un raspuns editorial scurt. Dupa acel raspuns,
utilizatorul revine in firul principal al lectiei. Ea nu poate inlocui un traseu
complet si nu trebuie folosita ca substitut pentru un curs lipsa.

## Matrice obligatorie

| Traseu | Lectie / selectie | De ce se ramifica |
| --- | --- | --- |
| `path_acasa` | `rusine_l1 / r1_3` | Nevoia de curatare, convingerea ca a trecut limita si rusinea fara concluzie cer raspunsuri diferite. |
| `path_acasa` | `rusine_l4 / r4_5` | Acceptarea iertarii si neputinta de a opri comportamentul nu sunt acelasi blocaj. |
| `path_acasa` | `rusine_l5 / r5_ownership` | Separa vina proprie de abuz, constrangere sau o situatie amestecata. |
| `path_neiertare` | `neiertare_l6 / n6_readiness` | Diferentiaza alegerea iertarii, dorinta fara disponibilitate si teama ca iertarea obliga la contact. |
| `path_aproape` | `aproape_l1 / a1_3` | Rugaciunea fara raspuns, distanta aparuta in timp si lipsa unei metode nu au acelasi raspuns. |
| `path_schimbare` | `schimbare_l1 / s1_3` | Dependenta, starea emotionala persistenta si reactia care raneste cer limite si ajutor diferite. |
| `path_har` | `har_l1 / h1_3` | Performanta, amorteala si frica de pedeapsa pornesc din imagini diferite despre Dumnezeu. |
| `path_impreuna` | `impreuna_l1 / im1_3` | Lipsa oamenilor, lipsa intelegerii si respingerea intr-un loc de incredere cer pasi diferiti. |

Fiecare optiune din selectiile de mai sus trebuie sa aiba `branchStepId`, iar
tinta trebuie sa contina un raspuns editorial real. Validatorul release-ului
blocheaza publicarea daca matricea nu mai este respectata.

## Excluderi intentionate

- `path_temelie` ramane liniar: este un traseu doctrinar, nu o conversatie de
  triere pastorala.
- `path_umblare` ramane liniar: este o practica de aprofundare aleasa direct,
  nu un traseu pornit dintr-o rana.
- quiz-urile nu se ramifica. Ele verifica intelegerea si afiseaza explicatia
  raspunsului corect.
- check-in-urile nu diagnosticheaza si nu schimba teologia lectiei.
- jurnalele, reflectiile si declaratiile pastreaza raspunsul liber; textul
  privat nu este analizat automat.
- `neiertare_o2 / o2_reflect` permite selectii multiple. Optiunile se pot
  suprapune, deci nu alegem arbitrar o singura ramura.

## Limita structurala descoperita

Usile `doliu`, `boala` si `de_ce_permis` intra acum in `path_neiertare`.
Primele doua lectii ale traseului vorbesc util despre suferinta si despre
caracterul lui Dumnezeu, dar lectiile urmatoare presupun existenta unui om care
a produs rana si conduc spre o declaratie de iertare.

Un mesaj conditionat nu rezolva aceasta nepotrivire. Inainte de lansarea
productiei, aceste usi au nevoie de un traseu separat despre suferinta, doliu si
intrebarea „de ce?”, sau de continut conditionat persistent la nivel de curs.
Nu cerem utilizatorului sa ierte o persoana atunci cand rana lui nu are un
agresor.
