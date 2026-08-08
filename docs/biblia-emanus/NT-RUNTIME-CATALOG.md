# Catalogul runtime al Noului Testament

Fişierul `docs/biblia-emanus/NT-RUNTIME-CATALOG.json` este poarta
separată dintre corpusul de lucru şi aplicaţia publică. El este intenţionat
distinct de câmpurile `status` şi `public` din capitole: acele câmpuri nu sunt
dovadă suficientă de publicare.

Starea iniţială este `withheld`. În această stare generatorul produce un
catalog gol, iar aplicaţia nu importă corpusul materializat.

## Aprobarea unei ediţii

Starea poate deveni `approved` numai după ce manifestul conţine:

- un `releaseId`, data şi cel puţin un semnatar editorial;
- SHA-256 al corpusului materializat curent;
- raza completă de revizie: 27 cărţi, 260 capitole, 7.941 versete;
- cel puţin o dovadă editorială versionată, cu propria cale şi propriul
  SHA-256.

Generatorul refuză o aprobare dacă digestul corpusului sau al dovezii nu mai
corespunde. Astfel, o reparaţie ulterioară invalidează catalogul până la un nou
sign-off explicit.

După o aprobare reală, se rulează:

```sh
pnpm materialize:biblia-emanus-nt
pnpm materialize:biblia-emanus-nt-runtime
pnpm check:biblia-emanus-nt-runtime
pnpm typecheck
pnpm build
```

Nu se schimbă manifestul în `approved` pentru a ocoli auditul: poarta este un
mecanism de livrare, nu o declaraţie că auditul automat este suficient.
