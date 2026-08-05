#!/usr/bin/env python3
"""Copy only the validated Biblia Emanus 2.0 deliverable onto current main."""
from __future__ import annotations

import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE_BRANCH = "agent/biblia-emanus-ot-audit2"
SOURCE_SHA = "46d48ccb8c60e9fc41e3b09d98c7eccc99f984c0"


def sh(*args: str) -> str:
    return subprocess.check_output(args, cwd=ROOT, text=True).strip()


actual = sh("git", "rev-parse", f"origin/{SOURCE_BRANCH}")
if actual != SOURCE_SHA:
    raise SystemExit(f"Sursa auditului s-a schimbat: {actual} != {SOURCE_SHA}")

paths = [
    "docs/biblia-emanus",
    "docs/data/biblia-emanus",
    "scripts/check-biblia-emanus.py",
    "scripts/test_biblia_emanus.py",
    "scripts/seal-biblia-emanus.py",
]
subprocess.run(
    ["git", "checkout", f"origin/{SOURCE_BRANCH}", "--", *paths],
    cwd=ROOT,
    check=True,
)

package_path = ROOT / "package.json"
package = json.loads(package_path.read_text(encoding="utf-8"))
scripts = package.setdefault("scripts", {})
scripts["check:biblia-emanus"] = "python3 scripts/check-biblia-emanus.py"
scripts["test:biblia-emanus"] = "python3 -m unittest scripts/test_biblia_emanus.py"
scripts["seal:biblia-emanus"] = "python3 scripts/seal-biblia-emanus.py"
package_path.write_text(json.dumps(package, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

ci = '''name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm

      - name: Install
        run: pnpm install --frozen-lockfile

      # Ghilimelele romanesti inchise cu " ASCII rup stringurile TypeScript.
      - name: Verifica ghilimelele
        run: pnpm check:quotes

      - name: Verifica typo-urile cunoscute
        run: pnpm check:typos

      - name: Verifica siguranta continutului
        run: pnpm check:content

      - name: Verifica aprobarea Genezei
        run: pnpm check:bible-publication

      - name: Verifica Biblia Emanus 2.0
        run: pnpm check:biblia-emanus

      - name: Testeaza poarta Biblia Emanus 2.0
        run: pnpm test:biblia-emanus

      - name: Verifica sigiliul celor sase carti
        run: >-
          pnpm seal:biblia-emanus --check
          --book GEN --book EXO --book LEV --book NUM --book DEU --book JOS

      - name: Typecheck
        run: pnpm typecheck

      - name: Build
        run: pnpm build
'''
(ROOT / ".github" / "workflows" / "ci.yml").write_text(ci, encoding="utf-8")

integration_doc = ROOT / "docs" / "biblia-emanus" / "MAIN-INTEGRATION.md"
integration_doc.write_text(
    "# Integrarea Biblia Emanus 2.0 în main\n\n"
    "Acest lot introduce exclusiv traducerea și motorul de audit Biblia Emanus 2.0.\n\n"
    "- 6 cărți;\n"
    "- 211 capitole;\n"
    "- 6.510 versete;\n"
    "- 1.255 de note editoriale;\n"
    "- snapshot SHA-256 `045966ba6331fee2d556cb219e4afe4122d027f69971f7f8e4a1e2f7b4595847`;\n"
    "- validator, teste negative și sigiliu permanent în CI.\n\n"
    "Nu sunt preluate schimbările istorice ale aplicației sau conținutul separat «Biblia explicată».\n",
    encoding="utf-8",
)

print("[main-integration] Biblia Emanus 2.0 pregătită pentru verificare pe baza main.")
