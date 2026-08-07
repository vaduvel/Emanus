# Biblia explicată — valul 1 Cronici

- Carte: **1 Cronici**
- Capitole structurale: **29 / 29**
- Stare: `in_review`
- Biblia Emanus: `1CH`
- Transcript: `.research/poonen-through-the-bible-OT/transcripts/chronicles-ezra.txt`
- Mod: `transcript-focused` — Poonen nu reexplică toate pasajele deja tratate în Samuel/Împărați; nu sunt inventate comentarii pentru goluri.

## Focare explicate

- capitolele 1–9: genealogia și faptul că Dumnezeu cunoaște persoanele pe nume;
- 4: Iabeț și rugăciunea lui;
- 12: oamenii care îl recunosc pe David înainte de succes, Amasai;
- 13: consultarea liderilor;
- 22: David pregătește templul pe care nu el îl va construi;
- 28: transferul responsabilității spre Solomon;
- 29: dărnicia și recunoașterea că totul vine de la Dumnezeu.

## Ebraică

- `יַעְבֵּץ` (`Ya'beț`) — jocul lexical al numelui cu durerea din 1 Cronici 4:9, verificat în WLC-OSHB.

## Validare

```bash
python3 scripts/check-overlay-book.py \
  --file packages/shared/src/bible/overlays/cronici1Overlay.ts \
  --chapters 29 --book-id 1CH \
  --transcript .research/poonen-through-the-bible-OT/transcripts/chronicles-ezra.txt \
  --anchor Jabez --anchor Amasai --anchor "chapter 22"
```
