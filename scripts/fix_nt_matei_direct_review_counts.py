#!/usr/bin/env python3
from pathlib import Path

path = Path("scripts/materialize_nt_manual_semantic_matei_direct.py")
source = path.read_text(encoding="utf-8")

old_counts = "EXPECTED_REWRITES = 90\nEXPECTED_KEEPS = 35"
new_counts = "EXPECTED_REWRITES = 89\nEXPECTED_KEEPS = 36"
if old_counts in source:
    if source.count(old_counts) != 1:
        raise SystemExit("[Matei direct invariant fix] expected exactly one frozen 90/35 invariant")
    source = source.replace(old_counts, new_counts)
elif new_counts not in source:
    raise SystemExit("[Matei direct invariant fix] neither expected 90/35 nor corrected 89/36 invariant found")

old_sha_check = '''            reconstructed = " ".join(words)\n            if sha(reconstructed) != meta.get("transcriptSha256"):\n                # The representation generator hashes its normalized split/join text. Fail closed if that invariant changes.\n                fail(f"representation {rep_no}: reconstructed transcript SHA drifted")\n            representation_cache[rep_no] = meta\n'''
new_sha_check = '''            source_rep_file = meta.get("sourceRepresentationFile")\n            if not isinstance(source_rep_file, str) or not source_rep_file:\n                fail(f"representation {rep_no}: sourceRepresentationFile missing")\n            source_rep = load(DATA / "nt-semantic-transcript-representations" / source_rep_file)\n            source_text = str(source_rep.get("text") or "")\n            if not source_text:\n                fail(f"representation {rep_no}: persistent source representation text missing")\n            if source_rep.get("transcriptSha256") != meta.get("transcriptSha256"):\n                fail(f"representation {rep_no}: persistent source representation SHA metadata drift")\n            if sha(source_text) != meta.get("transcriptSha256"):\n                fail(f"representation {rep_no}: persistent source representation text SHA drift")\n            source_words = source_text.split()\n            if len(source_words) != meta.get("wordCount"):\n                fail(f"representation {rep_no}: persistent source word count drift")\n            if words != source_words:\n                fail(f"representation {rep_no}: chunk sequence no longer reproduces persistent source words")\n            representation_cache[rep_no] = meta\n'''
if old_sha_check in source:
    if source.count(old_sha_check) != 1:
        raise SystemExit("[Matei direct invariant fix] expected exactly one reconstructed SHA validation block")
    source = source.replace(old_sha_check, new_sha_check)
elif new_sha_check not in source:
    raise SystemExit("[Matei direct invariant fix] transcript validation block did not match expected old or corrected form")

path.write_text(source, encoding="utf-8")
print("Matei direct invariants corrected: 89/36 counts; chunk sequence verified against SHA-bound persistent source text.")
