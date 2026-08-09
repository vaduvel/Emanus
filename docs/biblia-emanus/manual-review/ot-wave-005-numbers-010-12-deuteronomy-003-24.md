# Revizie directă VT - valul 005

## Domeniu

- Interval canonic: `NUM.10.12` - `DEU.3.24`.
- Volum: 1.000 de versete VT, în ordinea canonica a sursei Emanus.
- Comparatie directa: textul romanesc Emanus, WEBU si WLC/OSHB fixate local.
- Metoda: lectura si comparatie directa, verset cu verset; fara evaluator LLM.
- Manifestul nu a fost schimbat. VT ramane `in_review` si nu este declarat publicat.

## Corectii aplicate

| Referinte | Corectie |
| --- | --- |
| `NUM.13.29` | „Amalecitii locuiesc” -> „Amalec locuieste”; subiectul este singular. |
| `NUM.14.12`, `NUM.14.15` | „il voi nimici” -> „il voi dezmosteni”; „vei ucid” -> „vei ucide”. |
| `NUM.15.9`, `NUM.28.8` | Acord gramatical: „o dar” / „aceeasi dar” -> „un dar” / „acelasi dar”. |
| `NUM.15.14`, `NUM.15.15`, `NUM.15.21`, `NUM.15.23`, `NUM.18.23`, `NUM.35.29` | „in neamurile voastre” -> „de-a lungul generatiilor voastre”; formulare romaneasca corecta pentru referinta la generatii. |
| `NUM.15.21` | „prima voastra maia” -> „primul vostru aluat”. |
| `NUM.15.22` | „porunci pe care le-a vorbit DOMNUL lui Moise” -> „porunci pe care DOMNUL i le-a spus lui Moise”. |
| `NUM.16.6`, `NUM.16.11`, `NUM.16.16`, `NUM.16.40`, `NUM.26.9`, `NUM.26.10` | „ceta” -> „ceata”. |
| `NUM.16.26` | „piroti” -> „pieriti”. |
| `NUM.16.39` | „fusera arsi” -> „fusesera arsi”. |
| `NUM.17.8` | „odrasline” -> „odraslise”. |
| `NUM.18.18` | „spata dreapta” -> „pulpa dreapta”. |
| `NUM.20.13`, `NUM.20.27` | Au fost corectate majuscula interna „A fost” si prepozitia gresita „in sub”. |
| `NUM.21.2`, `NUM.21.3`, `NUM.21.5` | Au fost corectate acordul si formele „nimicii” / „hrana”. |
| `NUM.22.17` | „iti voi da mari cinstei” -> „te voi cinsti foarte mult”. |
| `NUM.25.17` | „madianiti” -> „madianiți”. |
| `NUM.26.15` | „țiefroniților” -> „țefoniților”. |
| `NUM.27.7`, `NUM.27.8` | „a stramuta mostenirea” -> „a trece mostenirea”; verbul este clar si gramatical. |
| `NUM.30.12`, `NUM.31.3`, `NUM.32.10`, `NUM.35.16` | Au fost corectate typo-urile „But”, „iplineasca”, „A jurat” si „un unealta”. |
| `DEU.1.4`, `DEU.2.24`, `DEU.2.26`, `DEU.2.30`, `DEU.3.2`, `DEU.3.6` | „Hesbon” -> „Heșbon” pentru transliterare consecventă în corpus. |
| `DEU.2.28` | „beu” -> „beau”. |
| `DEU.2.30` | „ii imbolnavise inima” -> „ii facuse inima indaratnica”; sensul expresiei este pastrat fara o formulare medicala moderna. |
| `DEU.3.1` | „sa lucreze la Edrei” -> „sa lupte la Edrei”. |

## Decizii de conservare

Nu au fost schimbati termenii pentru care sursele permit mai multe optiuni legitime, inclusiv „taurini”, „uriași” si „mana inalta”. Nu au fost introduse explicatii teologice sau completari care nu apar in text.

## Validare

- `python3 scripts/check-biblia-emanus.py` - exit `0`.
- `python3 scripts/check-biblia-emanus-romanian-quality.py --testament OT` - exit `0`, 0 probleme.
- `python3 scripts/check-biblia-emanus-ot-semantic-screening.py` - exit `0`.
- `python3 scripts/check-biblia-emanus-ot-source-evidence.py` - exit `0`.
- `python3 scripts/check-biblia-emanus-ot-publication-gate.py` - exit `0`, VT ramane `in_review`.
- `git diff --check` - exit `0`.

Pentru cele 44 de referinte modificate au fost recalculte hash-urile din `ot-semantic-screening.jsonl` si `ot-source-evidence.jsonl`. Dovezile nu modifica textul si nu transforma automat valul in publicare.
