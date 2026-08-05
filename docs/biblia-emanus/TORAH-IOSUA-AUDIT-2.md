# Audit 2.0 — Geneza, Exodul, Leviticul, Numeri, Deuteronomul și Iosua

Data auditului: `2026-08-05`

## Rezultat

- 6 cărți, 211 capitole și 6510 versete;
- toate capitolele sunt `published`, `public: true`;
- snapshot unic: `sha256:045966ba6331fee2d556cb219e4afe4122d027f69971f7f8e4a1e2f7b4595847`;
- WEBU, WLC, Cornilescu 1924 și BTF sunt fixate în snapshot; NTR rămâne extern `comparison-only`;
- fiecare capitol are audit semantic, digest de text și legătură la snapshot;
- diferențele de versificație sunt mapate explicit;
- schimbarea textului sau a snapshotului invalidează automat sigiliul.

## Verificare

```bash
pnpm check:biblia-emanus
pnpm test:biblia-emanus
pnpm seal:biblia-emanus --check --book GEN --book EXO --book LEV --book NUM --book DEU --book JOS
```
