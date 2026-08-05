#!/usr/bin/env python3
"""Patch the temporary integrator with explicit source mappings and audited corrections."""
from pathlib import Path
import subprocess

cache_dir = Path("/tmp/biblia-emanus-audit2")
cache_dir.mkdir(parents=True, exist_ok=True)
source_urls = [
    "https://ebible.org/Scriptures/engwebp_usfm.zip",
    "https://ebible.org/Scriptures/hboWLC_usfm.zip",
    "https://ebible.org/Scriptures/ronbtf_usfm.zip",
    "https://ebible.org/Scriptures/ron1924_usfm.zip",
]
for url in source_urls:
    destination = cache_dir / url.rsplit("/", 1)[-1]
    subprocess.run(
        [
            "curl",
            "--fail",
            "--location",
            "--retry", "5",
            "--retry-all-errors",
            "--connect-timeout", "15",
            "--max-time", "120",
            "--user-agent", "Mozilla/5.0 Biblia-Emanus-Audit/2.0",
            "--output", str(destination),
            url,
        ],
        check=True,
    )

path = Path("scripts/upgrade-ot-audit2.py")
text = path.read_text(encoding="utf-8")

patches = [
    (
        '    print(f"[audit2] descarc {url}")\n    with urllib.request.urlopen(url, timeout=120) as response:\n        raw = response.read()\n',
        '    print(f"[audit2] verific {url}")\n'
        '    cached = Path("/tmp/biblia-emanus-audit2") / url.rsplit("/", 1)[-1]\n'
        '    if cached.is_file():\n'
        '        raw = cached.read_bytes()\n'
        '        actual = sha256(raw)\n'
        '        if actual != expected:\n'
        '            raise RuntimeError(f"hash upstream diferit pentru {url}: {actual} != {expected}")\n'
        '        return raw\n'
        '    with urllib.request.urlopen(url, timeout=120) as response:\n'
        '        raw = response.read()\n',
    ),
    (
        '    sources = parse_refs(raw_wlc)\n    if len(targets) != len(sources):\n',
        '    sources = parse_refs(raw_wlc)\n'
        '    # WLC Numbers 25:19 is the opening clause of target Numbers 26:1.\n'
        '    # Keep it in the snapshot and account for it through an explicit coverage extra.\n'
        '    if book == "NUM" and len(sources) == len(targets) + 1 and (25, 19) in sources:\n'
        '        sources = [reference for reference in sources if reference != (25, 19)]\n'
        '    if len(targets) != len(sources):\n',
    ),
    (
        '    lock["versificationRules"] = rules\n'
        '    for cid, record in all_chapters.items():\n'
        '        book, chapter_text = cid.split(".")\n'
        '        chapter = int(chapter_text)\n'
        '        ids = [rule["id"] for rule in rules if rule["bookId"] == book and rule["targetChapter"] == chapter]\n'
        '        if ids:\n'
        '            record["versificationRuleIds"] = ids\n',
        '    lock["versificationRules"] = rules\n'
        '    coverage_extras = [\n'
        '        {\n'
        '            "id": "WLC-NUM-25-19-INTO-26-1",\n'
        '            "sourceLockId": "WLC-NUM",\n'
        '            "bookId": "NUM",\n'
        '            "targetChapter": 26,\n'
        '            "targetVerse": 1,\n'
        '            "sourceChapter": 25,\n'
        '            "sourceVerse": 19,\n'
        '            "reason": "Propoziția numerotată 25:19 în WLC deschide Numeri 26:1 în versificația țintă.",\n'
        '        }\n'
        '    ]\n'
        '    lock["coverageExtras"] = coverage_extras\n'
        '    for cid, record in all_chapters.items():\n'
        '        book, chapter_text = cid.split(".")\n'
        '        chapter = int(chapter_text)\n'
        '        ids = [rule["id"] for rule in rules if rule["bookId"] == book and rule["targetChapter"] == chapter]\n'
        '        if ids:\n'
        '            record["versificationRuleIds"] = ids\n'
        '        extra_ids = [extra["id"] for extra in coverage_extras if extra["bookId"] == book and extra["targetChapter"] == chapter]\n'
        '        if extra_ids:\n'
        '            record["sourceCoverageExtraIds"] = extra_ids\n',
    ),
    (
        '            data = json.loads(path.read_text(encoding="utf-8"))\n'
        '            normalize_chapter(data, snapshot_hash)\n',
        '            data = json.loads(path.read_text(encoding="utf-8"))\n'
        '            if cid == "EXO.37":\n'
        '                verse = next(item for item in data["verses"] if item["number"] == 14)\n'
        '                verse["text"] = "Verigile erau lângă margine, ca locașuri pentru drugii cu care se purta masa."\n'
        '                data["audit"]["romanianLanguage"]["changesApplied"].append(\n'
        '                    "Exodul 37:14 — funcția verigilor este redată mai aproape de ebraicul «locașuri pentru drugi»."\n'
        '                )\n'
        '            normalize_chapter(data, snapshot_hash)\n',
    ),
]

for old, new in patches:
    if old not in text:
        raise SystemExit(f"integration patch target missing: {old[:80]!r}")
    text = text.replace(old, new, 1)

path.write_text(text, encoding="utf-8")
