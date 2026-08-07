#!/usr/bin/env python3
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
OVERLAY = ROOT / "packages/shared/src/bible/overlays/imparati2Overlay.ts"
TRANSCRIPT = ROOT / ".research/poonen-through-the-bible-OT/transcripts/kings-2.txt"


def need(cond: bool, msg: str) -> None:
    if not cond:
        raise SystemExit(f"[2 Împărați] EROARE: {msg}")


def main() -> None:
    content = OVERLAY.read_text(encoding="utf-8")
    transcript = TRANSCRIPT.read_text(encoding="utf-8").lower()
    chapters = [int(x) for x in re.findall(r"\bnumber:\s*(\d+),", content)]
    need(chapters == list(range(1, 26)), f"capitole găsite: {chapters}")
    need('bibleEmanusBookId: "2KI"' in content, "lipsește legătura spre Biblia Emanus 2KI")
    need('status: "in_review"' in content, "statusul nu este in_review")
    for anchor in ("double portion", "pour water", "four lepers", "feared the lord", "bronze serpent", "manasseh", "babylon"):
        need(anchor in transcript, f"lipsește ancora din transcript: {anchor}")
    for required in ("WLC-OSHB", "Nehushtan", "pi-șenayim", "nu autorizează violența", "nu oferă creștinilor"):
        need(required.lower() in content.lower(), f"lipsește controlul editorial: {required}")
    print("2 Împărați overlay OK: 25/25 capitole, Biblia Emanus 2KI + kings-2.txt, toate in_review.")


if __name__ == "__main__":
    main()
