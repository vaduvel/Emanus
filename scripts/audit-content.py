#!/usr/bin/env python3
"""Static editorial safety gate for Emanus lesson sources.

This does not replace human theological/editorial review. It blocks regressions
that can be detected reliably in source: duplicate lesson IDs, dangerous
medical/spiritual promises, unsafe child-obedience language, and loss of core
safety wording from sensitive curricula.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LIB = ROOT / "packages" / "shared" / "src" / "library"
FILES = sorted(LIB.glob("*.ts"))

errors: list[str] = []
warnings: list[str] = []

if not FILES:
    errors.append("Nu au fost găsite fișierele bibliotecii.")

texts = {path: path.read_text(encoding="utf-8") for path in FILES}
all_text = "\n".join(texts.values())

# Lesson IDs end in _l<number>; step IDs use other suffixes.
lesson_id_re = re.compile(r'\bid\s*:\s*["\']([A-Za-z0-9_-]+_l\d+)["\']')
locations: dict[str, list[str]] = {}
for path, text in texts.items():
    for match in lesson_id_re.finditer(text):
        line = text.count("\n", 0, match.start()) + 1
        locations.setdefault(match.group(1), []).append(f"{path.relative_to(ROOT)}:{line}")

for lesson_id, refs in sorted(locations.items()):
    if len(refs) > 1:
        errors.append(f"ID de lecție duplicat {lesson_id}: {', '.join(refs)}")

if len(locations) < 259:
    errors.append(f"Au fost găsite doar {len(locations)} ID-uri de lecție; pragul curent este 259.")

prohibited = {
    r"\bai un demon\b": "diagnostic spiritual cert prin ecran",
    r"\bești posedat(?:ă)?\b": "diagnostic de posedare prin ecran",
    r"\bai un duh de\b": "etichetare spirituală automată",
    r"\bvei fi vindecat(?:ă)?\b": "promisiune individuală de vindecare",
    r"\bvindecare garantat(?:ă)?\b": "vindecare garantată",
    r"\boprește tratamentul\b": "abandonarea tratamentului",
    r"\bnu mai lua medicamente\b": "abandonarea medicației",
    r"\bnu ai nevoie de (?:medic|terapeut)\b": "respingerea ajutorului competent",
    r"\bascultă întotdeauna de orice adult\b": "ascultare infantilă absolută",
    r"\biertarea înseamnă să te întorci\b": "iertare confundată cu revenirea în pericol",
    r"(?:\+1\s*)?streak": "gamificare prin streak",
}
for path, text in texts.items():
    for pattern, label in prohibited.items():
        for match in re.finditer(pattern, text, flags=re.IGNORECASE):
            line = text.count("\n", 0, match.start()) + 1
            errors.append(f"{path.relative_to(ROOT)}:{line}: {label}: {match.group(0)!r}")

required_by_file = {
    "traseeCopii.ts": ["adult sigur", "atins nepotrivit", "ajutor profesionist"],
    "sotiLegamant.ts": ["consimțământ", "112", "violență activă"],
    "relatiiComune2.ts": ["consimțământ", "tratament", "terapeut"],
    "relatiiComune3.ts": ["112", "plan de siguranță", "consiliere de cuplu"],
    "rugaciuniContextuale.ts": ["medic", "tratament"],
}
for filename, needles in required_by_file.items():
    path = LIB / filename
    if not path.exists():
        errors.append(f"Lipsește fișierul sensibil obligatoriu: {filename}")
        continue
    lowered = texts[path].lower()
    for needle in needles:
        if needle.lower() not in lowered:
            errors.append(f"{filename}: lipsește protecția editorială obligatorie {needle!r}")

# These need human review, so they are reported but do not block automatically.
for path, text in texts.items():
    if "scripture:{text:" in text.replace(" ", "") and "ref:" not in text:
        warnings.append(f"{path.relative_to(ROOT)}: verifică manual referințele biblice")

print(f"Audit conținut: {len(FILES)} fișiere, {len(locations)} ID-uri de lecție detectate.")
for warning in warnings:
    print(f"AVERTISMENT: {warning}")
if errors:
    print("\nAuditul conținutului a eșuat:")
    for error in errors:
        print(f"- {error}")
    sys.exit(1)
print("Auditul automat de siguranță a trecut.")
