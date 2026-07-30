#!/usr/bin/env python3
from pathlib import Path

p = Path("packages/shared/src/library/index.ts")
s = p.read_text(encoding="utf-8")

if 'PILDE_VESNICIA_LESSONS' not in s:
    s = s.replace(
        'import { PILDE_IMPARATIA_LESSONS } from "./pildeImparatia2.js"',
        'import { PILDE_IMPARATIA_LESSONS } from "./pildeImparatia2.js"\nimport { PILDE_VESNICIA_LESSONS } from "./pildeVesnicia2.js"',
    )
    s = s.replace(
        'export * from "./pildeImparatia2.js"',
        'export * from "./pildeImparatia2.js"\nexport * from "./pildeVesnicia.js"\nexport * from "./pildeVesnicia2.js"',
    )

old = '''      plannedLessons: 5,
      lessonIds: [],
      state: "planned",
      source: "docs/16-modul-pilde.md §Cursul 4",'''
new = '''      plannedLessons: 5,
      lessonIds: [
        "pilda_bogatul_nebun",
        "pilda_bogatul_lazar",
        "pilda_iconomul_viclean",
        "pilda_nunta_imparatului",
        "pilda_judecatorul_nedrept",
      ],
      state: "live",
      source: "docs/16-modul-pilde.md §Cursul 4",'''
if old in s:
    s = s.replace(old, new, 1)

needle = '  ...PILDE_IMPARATIA_LESSONS,\n]'
if needle in s and '  ...PILDE_VESNICIA_LESSONS,\n]' not in s:
    s = s.replace(needle, '  ...PILDE_IMPARATIA_LESSONS,\n  ...PILDE_VESNICIA_LESSONS,\n]')

s = s.replace('  "parables_c4_vesnicia",\n', '')
p.write_text(s, encoding="utf-8")
