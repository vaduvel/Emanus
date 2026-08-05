#!/usr/bin/env python3
"""Validate Biblia Emanus provenance, source snapshots, and publication gates."""

from __future__ import annotations

import hashlib
import json
import re
import sys
import unicodedata
import zipfile
from difflib import SequenceMatcher
from pathlib import Path
from statistics import median
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "docs" / "data" / "biblia-emanus"
MANIFEST_PATH = DATA_DIR / "manifest.json"
SHA256_PATTERN = re.compile(r"^[0-9a-f]{64}$")
ISO_DATE_PATTERN = re.compile(r"^20[0-9]{2}-[01][0-9]-[0-3][0-9]$")
ALLOWED_STATUSES = {"draft", "in_review", "approved", "published"}
ALLOWED_REVIEW_VALUES = {"pending", "approved", "changes_requested"}
ALLOWED_NOTE_RESOLUTION_VALUES = {"pending", "needs_ai_review", "resolved"}
ROMANIAN_DIACRITICS = set("ăâîșțĂÂÎȘȚ")
FORBIDDEN_SEDILLA = set("şţŞŢ")
LEGACY_REVIEW_KEYS = {"romanianLanguage", "theologicalContext", "finalApproval"}
LEGACY_SOURCE_KEYS = {"sourceLanguage", "biblicalHebrew", "biblicalGreek"}
AUTOMATED_REVIEW_KEYS = {
    "aiSourceLanguage",
    "aiRomanianLanguage",
    "aiTheologicalContext",
    "omissionAddition",
    "benchmarkComparison",
    "copyrightDistance",
    "criticalIssues",
}
BENCHMARK_CHECK_KEYS = {
    "omissions",
    "additions",
    "meaning",
    "romanianNaturalness",
    "theologicalNeutrality",
    "copyrightSimilarity",
}
BOOK_NAMES = {
    "GEN": "Geneza",
    "EXO": "Exodul",
    "LEV": "Leviticul",
    "NUM": "Numeri",
    "DEU": "Deuteronomul",
    "JOS": "Iosua",
    "JDG": "Judecători",
    "RUT": "Rut",
    "1SA": "1 Samuel",
    "2SA": "2 Samuel",
    "1KI": "1 Împărați",
    "2KI": "2 Împărați",
    "1CH": "1 Cronicile",
    "2CH": "2 Cronicile",
    "EZR": "Ezra",
    "NEH": "Neemia",
    "EST": "Estera",
    "JOB": "Iov",
    "PSA": "Psalmii",
    "PRO": "Proverbele",
    "ECC": "Eclesiastul",
    "SNG": "Cântarea Cântărilor",
    "ISA": "Isaia",
    "JER": "Ieremia",
    "LAM": "Plângerile lui Ieremia",
    "EZK": "Ezechiel",
    "DAN": "Daniel",
    "HOS": "Osea",
    "JOL": "Ioel",
    "AMO": "Amos",
    "OBA": "Obadia",
    "JON": "Iona",
    "MIC": "Mica",
    "NAM": "Naum",
    "HAB": "Habacuc",
    "ZEP": "Țefania",
    "HAG": "Hagai",
    "ZEC": "Zaharia",
    "MAL": "Maleahi",
    "TOB": "Tobit",
    "JDT": "Iudita",
    "ESG": "Estera Greacă",
    "WIS": "Înțelepciunea lui Solomon",
    "SIR": "Înțelepciunea lui Sirah",
    "BAR": "Baruh",
    "1MA": "1 Macabei",
    "2MA": "2 Macabei",
    "3MA": "3 Macabei",
    "1ES": "3 Ezdra",
    "MAN": "Rugăciunea lui Manase",
    "PS2": "Psalmul 151",
    "ENO": "1 Enoh",
    "JUB": "Jubileele",
    "4BA": "4 Baruh (Rămășițele lui Ieremia)",
    "DID": "Didascalia etiopiană",
    "GEN_APO": "Apocriful Genezei (1Q20)",
    "COMM_REG": "Regula Comunității (1QS)",
    "WAR_SCR": "Sulul Războiului (1QM)",
    "HAB_COM": "Comentariul la Habacuc (1QpHab)",
    "HODAYOT": "Imnurile de mulțumire (1QH)",
    "SABB_SAC": "Cântările Jertfei de Sabat",
    "TEMP_SCR": "Sulul Templului (11QT)",
    "ADD_PSA": "Psalmii suplimentari (152-155)",
    "GIANTS": "Cartea Uriașilor (4Q203)",
}
BOOK_ORDER = {
    "GEN": 1,
    "EXO": 2,
    "LEV": 3,
    "NUM": 4,
    "DEU": 5,
    "JOS": 6,
    "JDG": 7,
    "RUT": 8,
    "1SA": 9,
    "2SA": 10,
    "1KI": 11,
    "2KI": 12,
    "1CH": 13,
    "2CH": 14,
    "EZR": 15,
    "NEH": 16,
    "EST": 17,
    "JOB": 18,
    "PSA": 19,
    "PRO": 20,
    "ECC": 21,
    "SNG": 22,
    "ISA": 23,
    "JER": 24,
    "LAM": 25,
    "EZK": 26,
    "DAN": 27,
    "HOS": 28,
    "JOL": 29,
    "AMO": 30,
    "OBA": 31,
    "JON": 32,
    "MIC": 33,
    "NAM": 34,
    "HAB": 35,
    "ZEP": 36,
    "HAG": 37,
    "ZEC": 38,
    "MAL": 39,
    "TOB": 40,
    "JDT": 41,
    "ESG": 42,
    "WIS": 43,
    "SIR": 44,
    "BAR": 45,
    "1MA": 46,
    "2MA": 47,
    "3MA": 48,
    "1ES": 49,
    "MAN": 50,
    "PS2": 51,
    "ENO": 52,
    "JUB": 53,
    "4BA": 54,
    "DID": 55,
    "GEN_APO": 56,
    "COMM_REG": 57,
    "WAR_SCR": 58,
    "HAB_COM": 59,
    "HODAYOT": 60,
    "SABB_SAC": 61,
    "TEMP_SCR": 62,
    "ADD_PSA": 63,
    "GIANTS": 64,
}


