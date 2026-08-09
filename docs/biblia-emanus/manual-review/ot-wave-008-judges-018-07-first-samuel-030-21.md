# Revizie directa VT - valul 008

## Domeniu

- Interval canonic: `JDG.18.7` - `1SA.30.21`.
- Volum: 1.000 de versete VT, in ordinea canonica a sursei Emanus.
- Comparatie directa: textul romanesc Emanus, WEBU si WLC/OSHB fixate local.
- Metoda: lectura si comparatie directa, verset cu verset; fara evaluator LLM.
- Manifestul nu a fost schimbat. VT ramane `in_review` si nu este declarat publicat.

## Corectii aplicate

Au fost corectate 83 de referinte. Au fost schimbate numai omisiuni, inversari de sens, termeni care schimbau actiunea, diferente verificabile fata de WLC/WEBU, acorduri sau ghilimele care alterau lectura.

| Referinte | Corectie |
| --- | --- |
| `JDG.19.2`, `JDG.19.8`, `JDG.20.10`, `JDG.20.16` | A fost restaurat verbul direct pentru nelegiuirea tiitoarei, a fost adaugata masa omisa, subiectul miseliei a fost corectat la oamenii din Ghibeea, iar „stangaci” a fost restaurat. |
| `RUT.2.21`, `RUT.3.14`, `RUT.4.1` | A fost restaurat „tot secerisul meu”, a fost eliminata ambiguitatea sexuala introdusa in locul ideii ca nu se putea recunoaste nimeni, iar „s-a oprit” a devenit „s-a asezat”. |
| `1SA.6.6`, `1SA.6.18`, `1SA.7.6`, `1SA.7.14`, `1SA.8.6` | Au fost corectate sensul lucrarii lui Dumnezeu asupra egiptenilor, relatia cu piatra cea mare, judecarea poporului de catre Samuel, hotarul recuperat de Israel si rugaciunea omisa a lui Samuel. |
| `1SA.8.13`, `1SA.8.16`, `1SA.9.22`, `1SA.9.24`, `1SA.9.26`, `1SA.10.27` | Au fost restaurate ocupatiile fetelor, „tinerii” in loc de „boi”, fraze lipsa, sensul „ca sa te trimit” si ghilimelele exterioare in plus. |
| `1SA.11.3`, `1SA.11.5`, `1SA.12.11`, `1SA.12.12`, `1SA.13.1`, `1SA.13.9`, `1SA.13.21` | Au fost restaurate „vom iesi la tine”, informarea lui Saul, numele ebraic `Bedan`, clauza ca DOMNUL era Imparatul lor, actiunea omisa a lui Saul si pretul ebraic `un pim`. |
| `1SA.14.13`, `1SA.14.28`, `1SA.14.29`, `1SA.14.34`, `1SA.14.35`, `1SA.14.39`, `1SA.14.42`, `1SA.14.45`, `1SA.14.51` | Au fost restaurate actiunile si propozitiile omise, inclusiv „a omorat”, poporul sleit, jertfirea, alegerea lui Ionatan, salvarea lui Ionatan si relatia corecta dintre Chis, Ner, Saul si Abner. |
| `1SA.15.6`, `1SA.15.11`, `1SA.15.12`, `1SA.15.28`, `1SA.16.4`, `1SA.16.12` | Au fost adaugati chenitii care au plecat, mania lui Samuel, monumentul ridicat pentru sine de Saul, „aproapele tau”, formula „vii cu pace?” si „rumen” in loc de „balai”. |
| `1SA.17.13`, `1SA.17.15`, `1SA.17.20`, `1SA.17.26`, `1SA.17.29`, `1SA.17.35`, `1SA.17.39` | Au fost corectate acordul, mersul lui David intre Saul si Betleem, locul carelor, ocara de peste Israel, motivul lui David, barba ursului/leului si scoaterea armurii. |
| `1SA.18.10`, `1SA.18.21`, `1SA.18.25`, `1SA.19.8`, `1SA.19.13`, `1SA.19.17`, `1SA.19.24` | A fost restaurat faptul ca Saul a prorocit, planul atribuit explicit lui Saul, intentia de a-l da pe David in mana filistenilor, uciderea intr-un mare macel, perna de par de capra, replica Micalei si ghilimelele exterioare corecte. |
| `1SA.20.11`, `1SA.20.17`, `1SA.20.21`, `1SA.20.30`, `1SA.20.31`, `1SA.20.34`, `1SA.21.2`, `1SA.22.5`, `1SA.22.14` | Au fost restaurate iesirea pe camp, juramantul repetat, avertizarea dupa sageti, insulta directa, „nu vei fi intarit”, rusinea lui Ionatan, tinerii trimisi, sosirea in padurea Heret si functia lui David de capetenie a garzii. |
| `1SA.23.5`, `1SA.23.29`, `1SA.24.3`, `1SA.24.5`, `1SA.24.17`, `1SA.24.22`, `1SA.25.22`, `1SA.25.29`, `1SA.25.36`, `1SA.25.38`, `1SA.25.39`, `1SA.25.44` | Au fost corectate macelul filistenilor, ghilimelele narative, actiunea directa „si-a facut nevoile”, mustrarea inimii, „mai drept”, blestemul asupra vrajmasilor lui David, subiectul aruncarii cu prastia, repetitia, moartea explicita a lui Nabal, trimiterea dupa Abigail si ghilimelele in plus. |
| `1SA.26.25`, `1SA.27.12`, `1SA.28.13`, `1SA.28.17`, `1SA.29.11`, `1SA.30.11`, `1SA.30.13`, `1SA.30.17` | Au fost eliminate ghilimelele exterioare in plus, „un dumnezeu” a ramas explicit, a fost restaurat „aproapele tau”, dimineata, faptul ca egipteanul a mancat, boala de acum trei zile si intervalul „din amurg pana in seara zilei urmatoare”. |

## Discrepanta WLC - WEBU

`1SA.13.1` nu are aceeasi traditie numerica in cele doua etaloane: WLC/OSHB are literal „fiul unui an cand a inceput sa domneasca” si doi ani de domnie, in timp ce WEBU R5 afiseaza treizeci de ani si patruzeci si doi de ani. Textul Emanus urmeaza WLC/OSHB, iar diferenta este consemnata in dovada numerica a versetului; nu a fost ascunsa prin aliniere automata la WEBU.

## Decizii de conservare

Au fost pastrate formularile poetice si arhaice atunci cand sensul nu era alterat. Nu au fost introduse explicatii teologice, diagnostice sau completari care nu rezulta din textul sursa. Nu am folosit un evaluator LLM pentru a decide modificarile.

## Validare

- `python3 scripts/check-biblia-emanus.py` - exit `0`.
- `python3 scripts/check-biblia-emanus-romanian-quality.py --testament OT` - exit `0`, 0 probleme.
- `python3 scripts/check-biblia-emanus-ot-semantic-screening.py` - exit `0`, 23.145 versete legate; 60 raman in coada de verificare.
- `python3 scripts/check-biblia-emanus-ot-source-evidence.py` - exit `0`.
- `python3 scripts/check-biblia-emanus-ot-publication-gate.py` - exit `0`, VT ramane `in_review`.
- `git diff --check` - exit `0`.
- JSON si JSONL - parsare valida.

Pentru cele 83 de referinte modificate au fost recalculte hash-urile din `ot-semantic-screening.jsonl` si `ot-source-evidence.jsonl`. Dovezile leaga continutul actual; nu transforma automat valul in publicare.
