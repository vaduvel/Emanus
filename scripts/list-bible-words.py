#!/usr/bin/env python3
"""Strange la un loc toate cuvintele in limba originala din Biblia explicata.

Scrie un raport cu fiecare cuvant, unde apare si ce spunem despre el, ca sa
poata fi cercetate toate deodata. Nu schimba nimic in continut.
"""
import re
from pathlib import Path

BIBLE = Path("packages/shared/src/bible")
RAPORT = Path("docs/24-cuvinte-in-limba-originala.md")

UNITATE = re.compile(r'id:\s*"(geneza-[\d-]+)"(.*?)(?=id:\s*"geneza-|\Z)', re.DOTALL)
CUVANT = re.compile(
    r'\{\s*original:\s*"((?:[^"\\]|\\.)*)",\s*'
    r'transliteration:\s*"((?:[^"\\]|\\.)*)",\s*'
    r'language:\s*"((?:[^"\\]|\\.)*)",\s*'
    r'meaning:\s*"((?:[^"\\]|\\.)*)"',
    re.DOTALL,
)

randu**ri = []
