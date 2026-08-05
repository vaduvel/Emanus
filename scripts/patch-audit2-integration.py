#!/usr/bin/env python3
"""Patch the temporary integrator to teach engine 2.0 explicit source-verse merges."""
from pathlib import Path

path = Path("scripts/upgrade-ot-audit2.py")
text = path.read_text(encoding="utf-8")

replacements = [
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
        '    validator = validator.replace(\'"GEN": "Geneza", "EXO": "Exod",\', \'"GEN": "Geneza", "EXO": "Exodul",\')\n'
        '    validator_path.write_text(validator, encoding="utf-8")\n',
        '''    validator = validator.replace('"GEN": "Geneza", "EXO": "Exod",', '"GEN": "Geneza", "EXO": "Exodul",')

    old_ledger_rules = ''' + repr('''        expected_rule_ids = [
            rule["id"]
            for rule in source_data["rules"]
            if rule["bookId"] == book_id and rule["targetChapter"] == int(chapter_text)
        ]
        actual_rule_ids = record.get("versificationRuleIds", [])
        if actual_rule_ids != expected_rule_ids:
            fail(f"source-ledger.json: reguli de versificație incorecte pentru {chapter_id}")
        normalized[chapter_id] = record
''') + '''
    new_ledger_rules = ''' + repr('''        expected_rule_ids = [
            rule["id"]
            for rule in source_data["rules"]
            if rule["bookId"] == book_id and rule["targetChapter"] == int(chapter_text)
        ]
        actual_rule_ids = record.get("versificationRuleIds", [])
        if actual_rule_ids != expected_rule_ids:
            fail(f"source-ledger.json: reguli de versificație incorecte pentru {chapter_id}")
        expected_extra_ids = [
            extra["id"]
            for extra in source_data["coverageExtras"]
            if extra["bookId"] == book_id and extra["targetChapter"] == int(chapter_text)
        ]
        actual_extra_ids = record.get("sourceCoverageExtraIds", [])
        if actual_extra_ids != expected_extra_ids:
            fail(f"source-ledger.json: reguli suplimentare de acoperire incorecte pentru {chapter_id}")
        normalized[chapter_id] = record
''') + '''
    if old_ledger_rules not in validator:
        raise RuntimeError("validator ledger patch target missing")
    validator = validator.replace(old_ledger_rules, new_ledger_rules)

    old_before_books = ''' + repr('''    for book_id, book in books.items():
        base_id = book.get("baseLockId")
''') + '''
    new_before_books = ''' + repr('''    coverage_extras = lock.get("coverageExtras", [])
    if not isinstance(coverage_extras, list):
        fail("source-lock.json: coverageExtras trebuie să fie listă")
    extra_ids: set[str] = set()
    for index, extra in enumerate(coverage_extras, start=1):
        if not isinstance(extra, dict):
            fail(f"source-lock.json: coverage extra {index} este invalid")
        extra_id = extra.get("id")
        if not isinstance(extra_id, str) or not extra_id or extra_id in extra_ids:
            fail(f"source-lock.json: id invalid pentru coverage extra {index}")
        extra_ids.add(extra_id)
        lock_id = extra.get("sourceLockId")
        if lock_id not in files or files[lock_id].get("role") != "original":
            fail(f"source-lock.json: sursă invalidă în coverage extra {extra_id}")
        book_id = extra.get("bookId")
        if book_id not in books or files[lock_id].get("bookId") != book_id:
            fail(f"source-lock.json: carte invalidă în coverage extra {extra_id}")
        for key in ("targetChapter", "targetVerse", "sourceChapter", "sourceVerse"):
            if not isinstance(extra.get(key), int) or extra[key] < 1:
                fail(f"source-lock.json: {key} invalid în coverage extra {extra_id}")
        if (extra["sourceChapter"], extra["sourceVerse"]) not in texts[lock_id]:
            fail(f"source-lock.json: referința sursă lipsește în coverage extra {extra_id}")
        if not isinstance(extra.get("reason"), str) or not extra["reason"].strip():
            fail(f"source-lock.json: motivarea lipsește în coverage extra {extra_id}")

    for book_id, book in books.items():
        base_id = book.get("baseLockId")
''') + '''
    if old_before_books not in validator:
        raise RuntimeError("validator coverage-extra patch target missing")
    validator = validator.replace(old_before_books, new_before_books)

    old_return = ''' + repr('''        "rules": rules,
        "ruleIds": rule_ids,
        "thresholds": thresholds,
''') + '''
    new_return = ''' + repr('''        "rules": rules,
        "ruleIds": rule_ids,
        "coverageExtras": coverage_extras,
        "coverageExtraIds": extra_ids,
        "thresholds": thresholds,
''') + '''
    if old_return not in validator:
        raise RuntimeError("validator return patch target missing")
    validator = validator.replace(old_return, new_return)

    old_coverage_setup = ''' + repr('''    rules = source_data["rules"]
    consumed: dict[str, set[tuple[int, int]]] = {lock_id: set() for lock_id in references}
''') + '''
    new_coverage_setup = ''' + repr('''    rules = source_data["rules"]
    coverage_extras = source_data["coverageExtras"]
    extras_by_target: dict[tuple[str, int, int], list[dict[str, Any]]] = {}
    for extra in coverage_extras:
        extras_by_target.setdefault(
            (extra["bookId"], extra["targetChapter"], extra["targetVerse"]), []
        ).append(extra)
    consumed: dict[str, set[tuple[int, int]]] = {lock_id: set() for lock_id in references}
''') + '''
    if old_coverage_setup not in validator:
        raise RuntimeError("validator coverage setup patch target missing")
    validator = validator.replace(old_coverage_setup, new_coverage_setup)

    old_consume = ''' + repr('''            consumed[original_lock].add(original_reference)
    for lock_id, source_references in references.items():
''') + '''
    new_consume = ''' + repr('''            consumed[original_lock].add(original_reference)
            for extra in extras_by_target.get((book_id, chapter, verse), []):
                extra_lock = extra["sourceLockId"]
                extra_reference = (extra["sourceChapter"], extra["sourceVerse"])
                if extra_reference not in references[extra_lock]:
                    fail(
                        f"source-lock.json: lipsește extra {extra_lock} "
                        f"{extra_reference[0]}:{extra_reference[1]}"
                    )
                consumed[extra_lock].add(extra_reference)
    for lock_id, source_references in references.items():
''') + '''
    if old_consume not in validator:
        raise RuntimeError("validator extra consumption patch target missing")
    validator = validator.replace(old_consume, new_consume)
    validator_path.write_text(validator, encoding="utf-8")

    tests_path = ROOT / "scripts" / "test_biblia_emanus.py"
    tests = tests_path.read_text(encoding="utf-8")
    marker = "    def test_changed_text_invalidates_ai_audit(self) -> None:\n"
    new_test = ''' + repr('''    def test_numbers_26_1_source_merge_is_explicit(self) -> None:
        extras = self.source_data["coverageExtras"]
        self.assertIn(
            {
                "id": "WLC-NUM-25-19-INTO-26-1",
                "sourceLockId": "WLC-NUM",
                "bookId": "NUM",
                "targetChapter": 26,
                "targetVerse": 1,
                "sourceChapter": 25,
                "sourceVerse": 19,
                "reason": "Propoziția numerotată 25:19 în WLC deschide Numeri 26:1 în versificația țintă.",
            },
            extras,
        )

''') + '''
    if marker not in tests:
        raise RuntimeError("test insertion target missing")
    tests_path.write_text(tests.replace(marker, new_test + marker), encoding="utf-8")
''',
    ),
]

for old, new in replacements:
    if old not in text:
        raise SystemExit(f"patch target missing: {old[:80]!r}")
    text = text.replace(old, new, 1)

path.write_text(text, encoding="utf-8")
