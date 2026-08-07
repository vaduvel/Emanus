#!/usr/bin/env python3
"""Non-bypassable editorial evidence gate for Biblia Emanus' New Testament.

The older chapter-level ``audit`` metadata records that an AI process claimed to
have reviewed a chapter.  It is useful provenance, but it is not evidence that
every verse was actually reviewed.  This module deliberately keeps that
distinction explicit: a publishable NT needs one evidence record for every
main-text verse, tied to the locked source texts and to the exact Romanian
text that is being published.

The gate does *not* claim to prove a translation theologically infallible.  It
proves the much narrower, auditable precondition that an identified editorial
reviewer supplied a non-template, verse-specific review trail against the
locked sources.
"""

from __future__ import annotations

import hashlib
import json
import re
import unicodedata
from collections import Counter
from dataclasses import dataclass
from datetime import date
from pathlib import Path
from typing import Any, Iterable, Mapping


NT_BOOK_IDS = {
    "MAT", "MRK", "LUK", "JHN", "ACT", "ROM", "1CO", "2CO", "GAL", "EPH",
    "PHP", "COL", "1TH", "2TH", "1TI", "2TI", "TIT", "PHM", "HEB", "JAS",
    "1PE", "2PE", "1JN", "2JN", "3JN", "JUD", "REV",
}
APPROVAL_FILENAME = "NT-EDITORIAL-APPROVAL.json"
APPROVAL_METHOD = "verse-by-verse-source-and-romanian-benchmark"
APPROVAL_ROLE = "editorial-reviewer"
ISO_DATE_PATTERN = re.compile(r"^20[0-9]{2}-[01][0-9]-[0-3][0-9]$")
GREEK_LETTER = re.compile(r"[\u0370-\u03ff\u1f00-\u1fff]")
WORD = re.compile(r"[^\W\d_]+", re.UNICODE)


class EditorialGateError(Exception):
    """Raised when a New Testament is not eligible for publication."""


@dataclass(frozen=True)
class QualityIssue:
    reference: str
    code: str
    detail: str


@dataclass(frozen=True)
class EditorialGateSummary:
    verses: int
    corpus_digest: str
    approval_path: Path


def fail(message: str) -> None:
    raise EditorialGateError(message)


def sha256_text(value: str) -> str:
    return "sha256:" + hashlib.sha256(value.encode("utf-8")).hexdigest()


def _reference_sort_key(reference: str, source_data: Mapping[str, Any]) -> tuple[int, int, int]:
    book_id, chapter, verse = reference.split(".")
    return (int(source_data["books"][book_id]["order"]), int(chapter), int(verse))


def _chapter_id(book_id: str, chapter: int) -> str:
    return f"{book_id}.{chapter}"


def _as_reference_strings(references: Iterable[tuple[int, int]]) -> list[str]:
    return [f"{chapter}:{verse}" for chapter, verse in references]


def approval_path_for(data_dir: Path) -> Path:
    """Return the repository-level approval register next to editorial docs."""
    return data_dir.parents[1] / "biblia-emanus" / APPROVAL_FILENAME


def bind_source_reference_mapper(
    source_data: Mapping[str, Any],
    resolver: Any,
) -> dict[str, Any]:
    """Attach the validator's fixed versification resolver to source context.

    ``check-biblia-emanus.py`` owns the mapping rules, including rare
    split/combine cases.  Keeping the resolver injected avoids duplicating that
    delicate implementation here while ensuring the editorial evidence checks
    the same mapping that validates the corpus itself.
    """
    bound = dict(source_data)
    bound["source_references_for_target"] = resolver
    return bound


def _chapter_map_from_disk(data_dir: Path) -> dict[str, dict[str, Any]]:
    chapters: dict[str, dict[str, Any]] = {}
    for path in sorted(data_dir.glob("*.json")):
        try:
            data = json.loads(path.read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError):
            continue
        book_id = data.get("bookId")
        chapter = data.get("chapter")
        if book_id in NT_BOOK_IDS and isinstance(chapter, int) and isinstance(data.get("verses"), list):
            chapters[_chapter_id(book_id, chapter)] = data
    return chapters


def _normalise_for_template_check(value: str) -> str:
    value = unicodedata.normalize("NFKD", value).casefold()
    value = "".join(character for character in value if not unicodedata.combining(character))
    return " ".join(WORD.findall(value))


def _target_texts(
    chapters: Mapping[str, Mapping[str, Any]],
    source_data: Mapping[str, Any],
    ledger_chapters: Mapping[str, Mapping[str, Any]],
) -> dict[str, str]:
    texts: dict[str, str] = {}
    expected_chapter_ids = {
        chapter_id
        for chapter_id, record in ledger_chapters.items()
        if chapter_id.split(".", 1)[0] in NT_BOOK_IDS
        and source_data["books"].get(chapter_id.split(".", 1)[0], {}).get("testament") == "NT"
        and isinstance(record.get("verseNumbers"), list)
    }
    actual_chapter_ids = set(chapters)
    if actual_chapter_ids != expected_chapter_ids:
        missing = sorted(expected_chapter_ids.difference(actual_chapter_ids))
        extra = sorted(actual_chapter_ids.difference(expected_chapter_ids))
        fail(
            "registrul editorial NT nu poate fi evaluat pe un corpus incomplet "
            f"(lipsesc={missing[:3]}, suplimentare={extra[:3]})"
        )

    for chapter_id in sorted(expected_chapter_ids, key=lambda item: _reference_sort_key(f"{item}.1", source_data)):
        data = chapters[chapter_id]
        record = ledger_chapters[chapter_id]
        book_id, chapter_text = chapter_id.split(".")
        chapter = int(chapter_text)
        if data.get("bookId") != book_id or data.get("chapter") != chapter:
            fail(f"{chapter_id}: identitatea capitolului nu corespunde registrului editorial")
        verses = data.get("verses")
        expected_numbers = record.get("verseNumbers")
        if not isinstance(verses, list) or not isinstance(expected_numbers, list):
            fail(f"{chapter_id}: versetele sau registrul de versificație lipsesc")
        numbers = [item.get("number") for item in verses if isinstance(item, dict)]
        if numbers != expected_numbers:
            fail(f"{chapter_id}: versetele nu corespund versificației fixate")
        for verse in verses:
            number = verse["number"]
            text = verse.get("text")
            if not isinstance(text, str) or not text.strip():
                fail(f"{chapter_id}.{number}: text românesc lipsă")
            texts[f"{book_id}.{chapter}.{number}"] = text
    return texts


def nt_corpus_digest(texts: Mapping[str, str], source_data: Mapping[str, Any]) -> str:
    canonical = "\n".join(
        f"{reference}\t{sha256_text(texts[reference])}"
        for reference in sorted(texts, key=lambda item: _reference_sort_key(item, source_data))
    )
    return sha256_text(canonical)


# These are regression sentinels for independently confirmed publication
# failures.  They intentionally complement, rather than replace, the required
# per-verse source evidence below.  Keeping them here means materialization and
# publication cannot bypass known serious defects simply by skipping the
# standalone Romanian-quality command.
GENERIC_QUALITY_PATTERNS: tuple[tuple[re.Pattern[str], str, str], ...] = (
    (re.compile(r"[,;:]\s*-\S"), "punctuation-hyphen-corruption", "cratimă lipită după punctuație"),
    (re.compile(r"\b(?:numite|se)(?:necircumcizie|circumcizie)\b", re.I), "joined-words", "cuvinte lipite"),
    (re.compile(r"\bîn\s+poate\s+vedea\b", re.I), "broken-syntax", "construcție verbală imposibilă"),
    (re.compile(r"\bjudecăm\s+unii\s+pe\s*[,;.]", re.I), "truncated-object", "complement trunchiat"),
    (re.compile(r"\bvă\s+circumcizia\s+un\b", re.I), "noun-used-as-verb", "substantiv folosit ca verb"),
)

KNOWN_SEMANTIC_REGRESSIONS: tuple[tuple[str, re.Pattern[str], str, str], ...] = (
    (
        "MAT.3.12",
        re.compile(r"\bFurculița\s+lui\s+este\s+în\s+mâna\s+lui\b", re.I),
        "winnowing-tool",
        "πτύον este redat eronat ca furculiță în contextul ariei",
    ),
    (
        "MAT.4.24",
        re.compile(r"\boameni\s+chinuiți\s+de\s+lună\b", re.I),
        "lunar-affliction-calque",
        "σεληνιαζομένους este redat printr-un calc românesc lipsit de sens",
    ),
)


def scan_nt_quality(
    chapters: Mapping[str, Mapping[str, Any]],
) -> list[QualityIssue]:
    """Return deterministic Romanian/semantic regression findings for NT text.

    This is a deliberately small set of high-confidence guards.  It must not
    be presented as a full semantic oracle; the individual source evidence
    required by :func:`validate_nt_editorial_approval` is the primary gate.
    """
    issues: list[QualityIssue] = []
    text_by_reference: dict[str, str] = {}
    for chapter_id, data in chapters.items():
        book_id = data.get("bookId")
        chapter = data.get("chapter")
        if book_id not in NT_BOOK_IDS or not isinstance(chapter, int):
            continue
        verses = data.get("verses")
        if not isinstance(verses, list):
            continue
        for verse in verses:
            if not isinstance(verse, dict) or not isinstance(verse.get("number"), int):
                continue
            text = verse.get("text")
            if not isinstance(text, str):
                continue
            reference = f"{book_id}.{chapter}.{verse['number']}"
            text_by_reference[reference] = text
            for pattern, code, detail in GENERIC_QUALITY_PATTERNS:
                if pattern.search(text):
                    issues.append(QualityIssue(reference, code, detail))
    for reference, pattern, code, detail in KNOWN_SEMANTIC_REGRESSIONS:
        text = text_by_reference.get(reference, "")
        if pattern.search(text):
            issues.append(QualityIssue(reference, code, detail))
    return issues


def _parse_iso_date(value: Any, owner: str) -> str:
    if not isinstance(value, str) or not ISO_DATE_PATTERN.match(value):
        fail(f"{owner}: data trebuie să fie ISO YYYY-MM-DD")
    try:
        parsed = date.fromisoformat(value)
    except ValueError:
        fail(f"{owner}: data calendaristică este invalidă")
    if parsed.isoformat() != value:
        fail(f"{owner}: data nu este canonică")
    return value


def _expected_locked_evidence(
    source_data: Mapping[str, Any],
    lock_id: str,
    book_id: str,
    chapter: int,
    verse: int,
) -> tuple[list[str], str]:
    try:
        source_references = source_data["source_references_for_target"](
            lock_id, book_id, chapter, verse
        )
    except KeyError:
        # The validator passes a small adapter in normal operation.  This
        # branch makes the error precise when a caller supplied an incomplete
        # source context rather than silently accepting unverifiable evidence.
        fail(f"{book_id}.{chapter}.{verse}: contextul nu poate mapa sursa {lock_id}")
    texts = source_data["texts"].get(lock_id)
    if not isinstance(texts, Mapping):
        fail(f"{book_id}.{chapter}.{verse}: textul sursei fixate {lock_id} lipsește")
    values: list[str] = []
    for source_reference in source_references:
        value = texts.get(source_reference)
        if not isinstance(value, str) or not value:
            fail(
                f"{book_id}.{chapter}.{verse}: referința sursei {lock_id} "
                f"{source_reference[0]}:{source_reference[1]} lipsește"
            )
        values.append(value)
    return _as_reference_strings(source_references), sha256_text("\n".join(values))


def _validate_locked_source_evidence(
    entry: Mapping[str, Any],
    owner: str,
    source_data: Mapping[str, Any],
    lock_id: str,
    book_id: str,
    chapter: int,
    verse: int,
) -> None:
    if not isinstance(entry, Mapping):
        fail(f"{owner}: dovada pentru {lock_id} trebuie să fie obiect")
    expected_references, expected_digest = _expected_locked_evidence(
        source_data, lock_id, book_id, chapter, verse
    )
    if entry.get("lockId") != lock_id:
        fail(f"{owner}: lockId nu corespunde sursei fixate {lock_id}")
    if entry.get("references") != expected_references:
        fail(f"{owner}: referințele nu corespund mapării fixate pentru {lock_id}")
    if entry.get("textDigest") != expected_digest:
        fail(f"{owner}: digestul textului nu corespunde sursei fixate {lock_id}")


def _validate_external_ntr_evidence(
    entry: Any,
    owner: str,
    chapter: int,
    verse: int,
) -> None:
    if not isinstance(entry, Mapping):
        fail(f"{owner}: dovada NTR externă trebuie să fie obiect")
    if entry.get("references") != [f"{chapter}:{verse}"]:
        fail(f"{owner}: referința NTR trebuie să indice versetul public curent")
    if entry.get("mode") != "external-comparison-only":
        fail(f"{owner}: NTR poate fi folosit doar external-comparison-only")
    url = entry.get("referenceUrl")
    if not isinstance(url, str) or not url.startswith("https://"):
        fail(f"{owner}: URL-ul NTR trebuie să fie HTTPS")
    _parse_iso_date(entry.get("consultedOn"), f"{owner}.consultedOn")


def _contains_casefold(haystack: str, needle: str) -> bool:
    return needle.casefold() in haystack.casefold()


def _validate_rationale(
    value: Any,
    owner: str,
    required_fragments: Iterable[str],
) -> str:
    if not isinstance(value, str) or len(_normalise_for_template_check(value)) < 32:
        fail(f"{owner}: justificarea trebuie să fie individuală și substanțială")
    normalized = _normalise_for_template_check(value)
    template_markers = (
        "fiecare verset a fost verificat",
        "textul principal urmeaza sblgnt",
        "etaloanele romanesti au fost folosite numai pentru verificare",
        "versetele corupte au fost inlocuite",
        "redactare din sblgnt si webu",
    )
    if any(marker in normalized for marker in template_markers):
        fail(f"{owner}: justificarea reproduce un șablon general, nu o decizie de verset")
    for fragment in required_fragments:
        if not _contains_casefold(value, fragment):
            fail(f"{owner}: justificarea trebuie să indice ancora verificată {fragment!r}")
    return normalized


def _validate_decisions(
    decisions: Any,
    owner: str,
    source_text: str,
    target_text: str,
) -> dict[str, str]:
    if not isinstance(decisions, Mapping):
        fail(f"{owner}: lipsesc deciziile editoriale individuale")
    expected = {"sourceLanguage", "romanian", "semantic"}
    if set(decisions) != expected:
        fail(f"{owner}: deciziile trebuie să conțină exact sourceLanguage, romanian și semantic")

    source = decisions["sourceLanguage"]
    romanian = decisions["romanian"]
    semantic = decisions["semantic"]
    if not isinstance(source, Mapping) or not isinstance(romanian, Mapping) or not isinstance(semantic, Mapping):
        fail(f"{owner}: fiecare decizie editorială trebuie să fie obiect")
    source_anchor = source.get("sourceAnchor")
    target_anchor = romanian.get("targetAnchor")
    semantic_source_anchor = semantic.get("sourceAnchor")
    semantic_target_anchor = semantic.get("targetAnchor")
    if not isinstance(source_anchor, str) or not GREEK_LETTER.search(source_anchor):
        fail(f"{owner}.sourceLanguage: ancora trebuie să fie un fragment grecesc verificabil")
    if not _contains_casefold(source_text, source_anchor):
        fail(f"{owner}.sourceLanguage: ancora greacă nu apare în SBLGNT fixat")
    if not isinstance(target_anchor, str) or len(target_anchor.strip()) < 2:
        fail(f"{owner}.romanian: ancora românească lipsește")
    if not _contains_casefold(target_text, target_anchor):
        fail(f"{owner}.romanian: ancora nu apare în textul românesc publicat")
    if semantic_source_anchor != source_anchor or semantic_target_anchor != target_anchor:
        fail(f"{owner}.semantic: ancorele trebuie să lege aceeași decizie greacă și românească")

    return {
        "sourceLanguage": _validate_rationale(
            source.get("rationale"), f"{owner}.sourceLanguage", [source_anchor]
        ),
        "romanian": _validate_rationale(
            romanian.get("rationale"), f"{owner}.romanian", [target_anchor]
        ),
        "semantic": _validate_rationale(
            semantic.get("rationale"), f"{owner}.semantic", [source_anchor, target_anchor]
        ),
    }


def _approval_error_message(errors: list[str]) -> str:
    shown = errors[:100]
    suffix = "" if len(errors) <= len(shown) else f"\n... încă {len(errors) - len(shown)} probleme"
    return "Poarta editorială NT a eșuat:\n" + "\n".join(f"- {item}" for item in shown) + suffix


def validate_nt_editorial_approval(
    data_dir: Path,
    source_data: Mapping[str, Any],
    ledger_chapters: Mapping[str, Mapping[str, Any]],
    chapters: Mapping[str, Mapping[str, Any]] | None = None,
    approval_path: Path | None = None,
) -> EditorialGateSummary:
    """Validate the complete, source-bound NT approval register.

    Callers must provide the already-validated source-lock context.  The
    ``source_references_for_target`` callback inside that context is what binds
    each evidence record to the SBLGNT/WEBU/benchmark verse(s), including
    declared split/combine versification mappings.
    """
    chapters = dict(chapters or _chapter_map_from_disk(data_dir))
    target_texts = _target_texts(chapters, source_data, ledger_chapters)
    issues = scan_nt_quality(chapters)
    errors = [f"{issue.reference}: [{issue.code}] {issue.detail}" for issue in issues]
    path = approval_path or approval_path_for(data_dir)
    if not path.is_file():
        errors.append(
            f"lipsește registrul de aprobare per-verset {path}; "
            "metadatele de audit AI la nivel de capitol nu sunt suficiente"
        )
        raise EditorialGateError(_approval_error_message(errors))
    try:
        approval = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as error:
        errors.append(f"nu pot citi registrul de aprobare {path}: {error}")
        raise EditorialGateError(_approval_error_message(errors)) from error
    if not isinstance(approval, Mapping):
        errors.append("registrul de aprobare trebuie să aibă rădăcină obiect")
        raise EditorialGateError(_approval_error_message(errors))

    if approval.get("schemaVersion") != 1:
        errors.append("registrul de aprobare trebuie să folosească schemaVersion 1")
    if approval.get("status") != "approved":
        errors.append("registrul de aprobare trebuie să aibă status approved")
    try:
        _parse_iso_date(approval.get("approvedOn"), "approval.approvedOn")
    except EditorialGateError as error:
        errors.append(str(error))
    expected_corpus_digest = nt_corpus_digest(target_texts, source_data)
    if approval.get("corpusDigest") != expected_corpus_digest:
        errors.append("digestul registrului nu corespunde textului românesc actual")

    approval_meta = approval.get("approval")
    if not isinstance(approval_meta, Mapping):
        errors.append("registrul de aprobare nu identifică aprobarea editorială")
    else:
        if not isinstance(approval_meta.get("reviewerId"), str) or not approval_meta["reviewerId"].strip():
            errors.append("aprobarea editorială trebuie să identifice reviewerId")
        if approval_meta.get("reviewerType") != "human":
            errors.append("aprobarea editorială NT trebuie emisă de un reviewer uman identificat")
        if approval_meta.get("reviewerRole") != APPROVAL_ROLE:
            errors.append(f"aprobarea editorială trebuie să aibă reviewerRole {APPROVAL_ROLE}")
        if approval_meta.get("method") != APPROVAL_METHOD:
            errors.append("aprobarea editorială nu declară metoda per-verset obligatorie")
        declaration = approval_meta.get("declaration")
        if not isinstance(declaration, str) or len(_normalise_for_template_check(declaration)) < 40:
            errors.append("declarația aprobării editoriale este prea scurtă")

    entries = approval.get("verses")
    if not isinstance(entries, list):
        errors.append("registrul de aprobare trebuie să conțină lista verses")
        raise EditorialGateError(_approval_error_message(errors))
    by_reference: dict[str, Mapping[str, Any]] = {}
    for index, entry in enumerate(entries, start=1):
        if not isinstance(entry, Mapping):
            errors.append(f"verses[{index}]: intrarea trebuie să fie obiect")
            continue
        reference = entry.get("reference")
        if not isinstance(reference, str):
            errors.append(f"verses[{index}]: reference invalidă")
            continue
        if reference in by_reference:
            errors.append(f"{reference}: dovadă editorială duplicată")
            continue
        by_reference[reference] = entry
    expected_references = set(target_texts)
    if set(by_reference) != expected_references:
        missing = sorted(expected_references.difference(by_reference), key=lambda item: _reference_sort_key(item, source_data))
        extra = sorted(set(by_reference).difference(expected_references))
        errors.append(
            "registrul trebuie să acopere exact fiecare verset NT cu text principal "
            f"(lipsesc={missing[:5]}, suplimentare={extra[:5]})"
        )

    rationale_values: dict[str, list[str]] = {"sourceLanguage": [], "romanian": [], "semantic": []}
    for reference in sorted(expected_references.intersection(by_reference), key=lambda item: _reference_sort_key(item, source_data)):
        entry = by_reference[reference]
        book_id, chapter_text, verse_text = reference.split(".")
        chapter, verse = int(chapter_text), int(verse_text)
        owner = f"{reference}"
        target_text = target_texts[reference]
        if entry.get("textDigest") != sha256_text(target_text):
            errors.append(f"{owner}: textDigest nu corespunde versetului românesc actual")
            continue
        sources = entry.get("sources")
        if not isinstance(sources, Mapping):
            errors.append(f"{owner}: lipsesc dovezile de sursă")
            continue
        book = source_data["books"][book_id]
        try:
            _validate_locked_source_evidence(
                sources.get("sblgnt"), owner + ".sources.sblgnt", source_data,
                book["originalLockId"], book_id, chapter, verse,
            )
            _validate_locked_source_evidence(
                sources.get("webu"), owner + ".sources.webu", source_data,
                book["baseLockId"], book_id, chapter, verse,
            )
            benchmarks = sources.get("benchmarks")
            if not isinstance(benchmarks, Mapping):
                fail(f"{owner}.sources: lipsesc dovezile etaloanelor românești")
            expected_benchmark_ids = {
                source_data["files"][lock_id]["benchmarkId"]: lock_id
                for lock_id in book["benchmarkLockIds"]
            }
            if set(benchmarks) != set(expected_benchmark_ids).union({"NTR"}):
                fail(f"{owner}.sources.benchmarks: etaloanele nu corespund surselor fixate")
            for benchmark_id, lock_id in expected_benchmark_ids.items():
                _validate_locked_source_evidence(
                    benchmarks.get(benchmark_id),
                    f"{owner}.sources.benchmarks.{benchmark_id}",
                    source_data, lock_id, book_id, chapter, verse,
                )
            _validate_external_ntr_evidence(
                benchmarks.get("NTR"), f"{owner}.sources.benchmarks.NTR", chapter, verse
            )
            greek_refs, _ = _expected_locked_evidence(
                source_data, book["originalLockId"], book_id, chapter, verse
            )
            greek_text = "\n".join(
                source_data["texts"][book["originalLockId"]][tuple(map(int, item.split(":")))]
                for item in greek_refs
            )
            normalized = _validate_decisions(entry.get("decisions"), owner + ".decisions", greek_text, target_text)
            for kind, value in normalized.items():
                rationale_values[kind].append(value)
        except EditorialGateError as error:
            errors.append(str(error))

    for kind, values in rationale_values.items():
        duplicates = [value for value, count in Counter(values).items() if count > 1]
        if duplicates:
            errors.append(
                f"deciziile {kind} repetă justificări identice; un șablon nu este audit per-verset"
            )
    if errors:
        raise EditorialGateError(_approval_error_message(errors))
    return EditorialGateSummary(len(target_texts), expected_corpus_digest, path)
