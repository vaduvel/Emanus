#!/usr/bin/env python3
from __future__ import annotations

import importlib.util
import json
import os
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OLD_PATH = Path(os.environ.get("OLD_PIPELINE", "scripts/tmp-old-pipeline.generated.py"))
SPEC = importlib.util.spec_from_file_location("old_nt_pipeline_final", OLD_PATH)
assert SPEC and SPEC.loader
old = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = old
SPEC.loader.exec_module(old)

NT = set(old.validator.NT_CHAPTER_COUNTS)
REPLACEMENTS = {
    "Cuvîntul": "Cuvântul",
    "Cuvînt": "Cuvânt",
    "dupăce": "după ce",
    "Dupăce": "După ce",
    "s'o": "s-o",
    "S'o": "S-o",
    "mîntuirii": "mântuirii",
    "mîncat": "mâncat",
    "mîncat-o": "mâncat-o",
    "mîni": "mâini",
    "zicînd": "zicând",
    "frecîndu-le": "frecându-le",
    "vînturilor": "vânturilor",
}
MANUAL = {
    "EPH.4.19": "Ei au ajuns insensibili și s-au dedat desfrânării, ca să practice cu lăcomie orice fel de necurăție.",
    "EPH.5.26": "ca s-o sfințească, după ce a curățit-o prin spălarea cu apă, prin Cuvânt,",
    "JHN.7.19": "Nu v-a dat Moise Legea? Și totuși niciunul dintre voi nu împlinește Legea. De ce căutați să Mă ucideți?",
    "LUK.6.1": "Într-o zi de Sabat, Isus trecea prin lanurile de grâu. Ucenicii Lui smulgeau spice, le frecau în mâini și le mâncau.",
    "LUK.8.25": "El le-a zis: «Unde vă este credința?» Cuprinși de teamă și uimire, își spuneau unul altuia: «Cine este Acesta, de poruncește chiar și vânturilor și apei, iar ele Îl ascultă?»",
}

changed = []
for path in sorted(old.DATA_DIR.glob("*.json"), key=old.validator.chapter_sort_key):
    match = old.CHAPTER_FILE.match(path.name)
    if not match or match.group(1) not in NT:
        continue
    data = old.validator.load_json(path)
    for verse in data["verses"]:
        ref = f"{data['bookId']}.{data['chapter']}.{verse['number']}"
        before = verse["text"]
        after = MANUAL.get(ref, before)
        for source, target in REPLACEMENTS.items():
            after = after.replace(source, target)
        if after != before:
            verse["text"] = after
            changed.append({"ref": ref, "before": before, "after": after})
    old.normalize_chapter_quotes(data["verses"])
    data["status"] = "approved"
    data["public"] = False
    data["audit"]["textDigest"] = old.validator.chapter_text_digest(data)
    data["audit"]["contentDigest"] = old.validator.chapter_content_digest(data)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

out = ROOT / "tmp-nt-repair"
out.mkdir(exist_ok=True)
(out / "final-fixes.json").write_text(json.dumps(changed, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(json.dumps({"finalFixes": len(changed)}, ensure_ascii=False))
