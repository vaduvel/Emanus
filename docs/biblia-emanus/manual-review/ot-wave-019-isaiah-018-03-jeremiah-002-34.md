# Revizie manuala VT - valul 19

- Interval ordinal: `18001-19000`
- Acoperire: `ISA.18.3` - `JER.2.34`
- Versete citite direct: `1000`
- Versete cu text modificat: `189`
- Fisiere de text atinse: `ISA.18.json` - `ISA.66.json`, `JER.1.json`, `JER.2.json`
- Status manifest: `in_review` (neschimbat)

## Metoda

Fiecare verset din interval a fost citit in context, cu textul romanesc asezat langa etalonul englez WEBU si cu identificatorii de sursa fixati in WLC-OSHB/WEBU. Au fost aplicate numai corectii care reparau o diferenta identificabila de sens, o omisiune, o adaugare, o eroare gramaticala sau o delimitare de citat. Nu s-a folosit un model extern si nu s-a generat o aprobare semantica fictiva.

## Exemple de corectii

- `ISA.27.1`: au fost eliminate numele adaugate care nu apar in textul sursa si pastrata enumerarea leviatanului.
- `ISA.30.15`: „intoarcerea si odihna” a fost restaurata in locul formularii care le inversa cu „liniste si odihna”.
- `ISA.33.1`: „nimicitorule” si „tradatorule” au fost separate conform celor doua verbe din sursa.
- `ISA.52.8`: „vor vedea ochi in ochi” nu mai este redat ca „vad ... cum Se intoarce”.
- `ISA.52.15`: „va curata multe neamuri” nu mai este redat ca „va fi o pricina de bucurie”.
- `ISA.53.3-4`: au fost pastrate distinct „boala” si „suferintele”, fara a le comprima intr-o singura idee.
- `ISA.53.11`: „va indreptati pe multi” nu mai este diluat in „ii va pune intr-o stare dupa voia lui Dumnezeu”.
- `ISA.57.19`: „Eu creez rodul buzelor” a fost restaurat in locul formularii „Voi pune lauda pe buze”.
- `ISA.59.9-11`: „dreptatea” a fost separata de „mantuire”, unde textul initial le inversa.
- `ISA.61.11` si `ISA.62.1`: „neprihanirea” nu mai este inlocuita cu „mantuirea” in locurile unde sursa le distinge.
- `ISA.63.1`, `ISA.63.5`, `ISA.63.9`, `ISA.63.12`: au fost reparate actiunea vorbitorului, mirarea, participarea lui Dumnezeu la necaz si referinta la bratul lui Moise.
- `ISA.64.5`: intrebarea despre mantuire nu mai contine adaosul „vom suferi vesnic”.
- `ISA.66.3-4`, `ISA.66.14`, `ISA.66.18`: au fost reparate „binecuvanteaza un idol”, „amagirile lor”, „mana DOMNULUI” si „cunosc faptele si gandurile lor”.
- `JER.1.11`: „ramura de migdal” a fost restaurata in locul lui „veghetor”.
- `JER.2.3`, `JER.2.16`, `JER.2.25`, `JER.2.31`: au fost corectate statutul lui Israel ca „cele dintai roade”, timpul verbal, „strainii” si adresarea „O, generatie”.

## Validare

- `check-biblia-emanus.py`: OK
- `check-biblia-emanus-romanian-quality.py --testament OT`: `929 capitole / 23145 versete / 0 probleme`
- `check-biblia-emanus-ot-semantic-screening.py`: OK; screeningul ramane legat de surse si nu este dovada de publicare
- `check-biblia-emanus-ot-source-evidence.py`: OK; hash-urile au fost regenerate pentru cele `189` de versete schimbate
- `check-biblia-emanus-ot-publication-gate.py`: exit `0`; VT ramane corect `in_review`
- JSON/JSONL parse: OK
- `git diff --check`: OK

Urmatorul interval este ordinal `19001-20000`.
