# Dovada VT canonic

Un audit de capitol sau existența unui fișier WLC nu dovedește că textul românesc a fost verificat. Publicarea VT cere un record JSONL pentru fiecare dintre cele 23.145 de versete.

Fiecare record este legat prin hash de:

- textul românesc din capitolul Emanus;
- versetele WLC/OSHB și maparea lor de versificație;
- versetul WEBU folosit ca punte.

Recordul trebuie să conțină verdicturi separate pentru omisiuni, adaosuri, sens, nume, numere și negații. Toate verdicturile trebuie să fie `approved`, cu motivare concretă, iar recordul trebuie sigilat cu `recordSha256`.

Verificatorul din `scripts/check-biblia-emanus-ot-source-evidence.py` blochează:

- lipsa sau duplicarea unui verset;
- verdicturi la nivel de capitol;
- hashuri stale pentru textul românesc, sursa ebraică sau WEBU;
- mapări de versificație care nu corespund `source-lock.json`;
- verdicturi `unresolved`, identificatori de revizor generici sau metode declarative de tip coverage-only.

Artefactul nu trebuie generat cu valori implicite. Pentru fiecare verset trebuie să existe o comparație reală, documentată, între ebraică, puntea WEBU și română.

## Coada de revizie

Comanda de mai jos produce o coadă JSONL pentru toate versetele canonice, cu
hashurile textului românesc, ale ebraicii fixate și ale punții WEBU:

```sh
python3 scripts/generate-biblia-emanus-ot-review-queue.py \
  --output /tmp/emanus-ot-review-queue.jsonl
```

Coada este în mod intenționat `unresolved`: ea pregătește comparația, nu o
declară făcută. Numai un record cu toate cele șase concluzii concrete și
aprobate poate intra în `ot-source-evidence.jsonl` și deschide poarta de
publicare.

## Evaluator AI extern

`scripts/review-biblia-emanus-ot-with-openai-compatible.py` trimite fiecare
verset, împreună cu WLC/OSHB și WEBU fixate, la un endpoint compatibil OpenAI.
Scriptul este reluabil: păstrează rândurile deja scrise în shard și nu aprobă
un rând dacă modelul nu aprobă explicit toate cele șase controale cu justificări
concrete în română.

Se începe cu un pilot mic, apoi se rulează pe fiecare carte într-un shard
separat. Cheia nu se scrie în repository.

```sh
export OPENAI_API_KEY='...'
pnpm review:biblia-emanus-ot -- \
  --book GEN \
  --model <model-validat> \
  --limit 10 \
  --output /tmp/emanus-ot-GEN.jsonl
```

După pilot, shardurile validate se unesc exclusiv cu
`scripts/merge-biblia-emanus-ot-source-evidence.py`; această comandă refuză
atât acoperirea parțială, cât și rândurile stale sau neaprobate.
