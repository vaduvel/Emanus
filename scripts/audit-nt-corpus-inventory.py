#!/usr/bin/env python3
"""Inventory reproducible red flags in the published Biblia Emanus NT corpus.

This is deliberately a *triage* tool, not a replacement for a Greek-to-Romanian
editorial review.  It reads the active JSON corpus and the three Romanian
public-domain benchmark texts embedded in the pinned NT snapshot, then emits
mechanical, lexical, and reference-divergence signals per verse.
"""

from __future__ import annotations

import argparse
from collections import Counter, defaultdict
from dataclasses import dataclass, asdict
from difflib import SequenceMatcher
import json
from pathlib import Path
import re
import statistics
import sys
import zipfile


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs" / "data" / "biblia-emanus"
SNAPSHOT = DATA / "sources" / "nt-sblgnt-1.2.zip"
NT = {
    "MAT", "MRK", "LUK", "JHN", "ACT", "ROM", "1CO", "2CO", "GAL", "EPH",
    "PHP", "COL", "1TH", "2TH", "1TI", "2TI", "TIT", "PHM", "HEB", "JAS",
    "1PE", "2PE", "1JN", "2JN", "3JN", "JUD", "REV",
}
SOURCES = {
    "BTF": "btf/{book}.usfm",
    "Biblia Libera": "biblia-libera/{book}.usfm",
    "Cornilescu 1924": "cornilescu1924/{book}.usfm",
    "WEBP": "webp/{book}.usfm",
}
USFM_CHAPTER = re.compile(r"^\\c\s+([1-9][0-9]*)\b")
USFM_VERSE = re.compile(r"^\\v\s+([1-9][0-9]*)(?:-[1-9][0-9]*)?\s*(.*)$")
CONTINUATION = re.compile(r"^\\(?:p|m|q[0-9]*|qm[0-9]*|li[0-9]*|pi[0-9]*|pc|pr|cls|nb|b)(?:\s|$)")
WORD = re.compile(r"[A-Za-zĂÂÎȘȚăâîșț]+(?:[-’'][A-Za-zĂÂÎȘȚăâîșț]+)*")
PUNCTUATION_HYPHEN = re.compile(r"[,;:.!?]-")
NO_SPACE_AFTER_COMMA = re.compile(r"[,;:]\S")
OPEN_QUOTE = "„"
CLOSE_QUOTES = "”»"
TAIL_WORDS = {
    "a", "ai", "al", "ale", "alei", "am", "an", "asupra", "atât", "că", "ca",
    "care", "ce", "cel", "cei", "cele", "ci", "cu", "către", "de", "decât", "din",
    "dintre", "după", "fără", "în", "înainte", "între", "la", "le", "lui", "mai",
    "ne", "nu", "o", "ori", "pe", "pentru", "prin", "sau", "se", "și", "să", "te",
    "un", "unei", "unor", "vă",
}


def strip_usfm(value: str) -> str:
    value = re.sub(r"\\(?:f|x)\s.*?\\(?:f|x)\*", " ", value)
    value = re.sub(r"\\w\s+([^|\\]+)(?:\|[^\\]*)?\\w\*", r"\1", value)
    value = re.sub(r"\\[+a-zA-Z0-9-]+\*?", " ", value)
    value = re.sub(r"\|\S+", " ", value)
    return re.sub(r"\s+", " ", value).strip()


def parse_usfm(raw: bytes) -> dict[tuple[int, int], str]:
    text = raw.decode("utf-8-sig")
    chapter: int | None = None
    current: tuple[int, int] | None = None
    verses: dict[tuple[int, int], str] = {}
    for line in text.splitlines():
        chapter_match = USFM_CHAPTER.match(line)
        if chapter_match:
            chapter = int(chapter_match.group(1))
            current = None
            continue
        verse_match = USFM_VERSE.match(line)
        if verse_match and chapter is not None:
            current = (chapter, int(verse_match.group(1)))
            value = strip_usfm(verse_match.group(2))
            if value:
                verses[current] = value
            else:
                current = None
            continue
        if current is not None and (CONTINUATION.match(line) or (line and not line.startswith("\\"))):
            value = strip_usfm(line)
            if value:
                verses[current] += " " + value
    return verses


def normalize(text: str) -> str:
    return " ".join(word.lower().replace("’", "'") for word in WORD.findall(text))


def tokens(text: str) -> list[str]:
    return [word.lower().replace("’", "'") for word in WORD.findall(text)]


def jaccard(a: str, b: str) -> float:
    left, right = set(tokens(a)), set(tokens(b))
    return len(left & right) / max(1, len(left | right))


def clean_tail(text: str) -> str:
    found = tokens(text)
    return found[-1] if found else ""


def active_verses() -> dict[str, str]:
    result: dict[str, str] = {}
    for path in sorted(DATA.glob("*.json")):
        value = json.loads(path.read_text(encoding="utf-8"))
        book = value.get("bookId")
        if book not in NT or not isinstance(value.get("chapter"), int):
            continue
        for verse in value.get("verses", []):
            if isinstance(verse, dict) and isinstance(verse.get("number"), int):
                result[f"{book}.{value['chapter']}.{verse['number']}"] = str(verse.get("text", ""))
    return result


def snapshot_verses() -> dict[str, dict[str, str]]:
    result: dict[str, dict[str, str]] = {name: {} for name in SOURCES}
    with zipfile.ZipFile(SNAPSHOT) as archive:
        for name, pattern in SOURCES.items():
            for book in NT:
                parsed = parse_usfm(archive.read(pattern.format(book=book)))
                for (chapter, verse), text in parsed.items():
                    result[name][f"{book}.{chapter}.{verse}"] = text
    return result


class Spellcheck:
    def __init__(self, prefix: Path | None):
        self.dictionary = None
        self.cache: dict[str, bool] = {}
        if prefix is None:
            return
        try:
            sys.path.insert(0, str(prefix.parent / "python"))
            from spylls.hunspell import Dictionary  # type: ignore
            self.dictionary = Dictionary.from_files(str(prefix))
        except Exception as error:  # pragma: no cover - optional dependency
            print(f"warning: Romanian spellcheck unavailable: {error}", file=sys.stderr)

    def ok(self, word: str) -> bool:
        if self.dictionary is None:
            return True
        if word in self.cache:
            return self.cache[word]
        value = bool(self.dictionary.lookup(word))
        self.cache[word] = value
        return value


def possible_join(word: str, spelling: Spellcheck, known: set[str]) -> list[str]:
    """Return plausible two-word decompositions of an unrecognised long token."""
    if len(word) < 10 or spelling.ok(word):
        return []
    candidates = []
    for index in range(3, len(word) - 2):
        left, right = word[:index], word[index:]
        if (spelling.ok(left) or left in known) and (spelling.ok(right) or right in known):
            candidates.append(f"{left} {right}")
    return candidates[:4]


@dataclass
class Finding:
    ref: str
    score: int
    flags: list[str]
    text: str
    bt: str | None
    libera: str | None
    cornilescu: str | None
    webp: str | None
    overlap: dict[str, float]
    ratio_to_btf_libera_median: float | None
    unknown_tokens: list[str]


def likely_obsolete_i_to_a(corpus: dict[str, str], spelling: Spellcheck) -> list[dict[str, str]]:
    """Find likely old-spelling tokens where only î→â produces a valid word.

    This deliberately avoids treating every interior ``î`` as an error: compounds
    such as ``preaînalt`` are legitimate.  It only records a token when the
    Romanian spellchecker rejects the source form and accepts the corresponding
    form with ``â``.
    """
    if spelling.dictionary is None:
        return []
    pattern = re.compile(r"(?<=[a-zăâîșț])î(?=[a-zăâîșț])")
    rows = []
    for ref, text in corpus.items():
        for word in tokens(text):
            if not pattern.search(word) or spelling.ok(word):
                continue
            replacement = pattern.sub("â", word)
            if spelling.ok(replacement):
                rows.append({"ref": ref, "observed": word, "modern": replacement})
    return rows


def source_profile(
    name: str,
    corpus: dict[str, str],
    spelling: Spellcheck,
    *,
    spellcheck_applicable: bool = True,
) -> dict[str, int | float | bool | None]:
    strings = list(corpus.values())
    punctuation = sum(bool(PUNCTUATION_HYPHEN.search(value)) for value in strings)
    tails = sum(clean_tail(value) in TAIL_WORDS for value in strings)
    unknown = 0
    total = 0
    if spelling.dictionary is not None and spellcheck_applicable:
        for value in strings:
            for word in tokens(value):
                total += 1
                if not spelling.ok(word):
                    unknown += 1
    return {
        "verses": len(strings),
        "punctuation_hyphen_verses": punctuation,
        "function_word_tail_verses": tails,
        "spell_unknown_tokens": unknown,
        "spell_total_tokens": total,
        "spell_unknown_rate": round(unknown / total, 6) if total else None,
        "spellcheck_applicable": spellcheck_applicable,
    }


def build_findings(active: dict[str, str], refs: dict[str, dict[str, str]], spelling: Spellcheck) -> tuple[list[Finding], dict[str, int]]:
    reference_vocabulary = {
        word
        for source in ("BTF", "Biblia Libera", "Cornilescu 1924")
        for text in refs[source].values()
        for word in tokens(text)
    }
    active_counts = Counter(word for text in active.values() for word in tokens(text))
    findings: list[Finding] = []
    signal_counts: Counter[str] = Counter()
    for ref, text in active.items():
        benchmark = {name: refs[name].get(ref) for name in ("BTF", "Biblia Libera", "Cornilescu 1924")}
        webp = refs["WEBP"].get(ref)
        flags: list[str] = []
        score = 0
        if PUNCTUATION_HYPHEN.search(text):
            flags.append("punctuation-before-hyphen")
            score += 8
        if NO_SPACE_AFTER_COMMA.search(text):
            # Legal compact constructions are rare in Romanian prose; leave the context for review.
            flags.append("no-space-after-comma/semicolon/colon")
            score += 2
        if text.count(OPEN_QUOTE) != sum(text.count(char) for char in CLOSE_QUOTES):
            flags.append("unbalanced-Romanian-quotes")
            score += 6
        if clean_tail(text) in TAIL_WORDS:
            flags.append(f"ends-with-function-word:{clean_tail(text)}")
            score += 5
        current_tokens = tokens(text)
        unknown = sorted({
            word for word in current_tokens
            if not spelling.ok(word)
            and word not in reference_vocabulary
            and active_counts[word] <= 2
            and len(word) >= 5
        })
        joins = []
        for word in unknown:
            decompositions = possible_join(word, spelling, reference_vocabulary)
            if decompositions:
                joins.append(f"{word}=>{'|'.join(decompositions)}")
        if joins:
            flags.append("possible-concatenated-token:" + ";".join(joins))
            score += 8
        if unknown:
            flags.append("rare-spell-unknown:" + ",".join(unknown[:8]))
            score += min(4, len(unknown))
        overlaps = {name: round(jaccard(text, value), 4) for name, value in benchmark.items() if value}
        if len(current_tokens) >= 8 and overlaps and max(overlaps.values()) < 0.12:
            flags.append("very-low-lexical-overlap-with-all-available-RO-benchmarks")
            score += 2
        pair = [benchmark[name] for name in ("BTF", "Biblia Libera") if benchmark[name]]
        ratio = None
        if pair:
            denominator = statistics.median(len(tokens(item)) for item in pair)
            if denominator:
                ratio = round(len(current_tokens) / denominator, 4)
                if ratio < 0.45 or ratio > 1.8:
                    flags.append(f"word-count-outlier:{ratio}")
                    score += 2
        if flags:
            for flag in flags:
                signal_counts[flag.split(":", 1)[0]] += 1
            findings.append(Finding(
                ref=ref, score=score, flags=flags, text=text,
                bt=benchmark["BTF"], libera=benchmark["Biblia Libera"],
                cornilescu=benchmark["Cornilescu 1924"], webp=webp,
                overlap=overlaps, ratio_to_btf_libera_median=ratio,
                unknown_tokens=unknown,
            ))
    findings.sort(key=lambda item: (-item.score, item.ref))
    return findings, dict(signal_counts)


def markdown_report(payload: dict[str, object], findings: list[Finding], top: int) -> str:
    summary = payload["summary"]
    profiles = payload["source_profiles"]
    lines = [
        "# NT corpus triage inventory (automated)",
        "",
        "This is a reproducible triage output. A flag is not by itself a translation verdict; rows need editorial/source review.",
        "",
        "## Coverage",
        "",
        f"- active NT verses: {summary['active_verses']}",
        f"- BTF aligned references: {summary['aligned_references']['BTF']}",
        f"- Biblia Libera aligned references: {summary['aligned_references']['Biblia Libera']}",
        f"- Cornilescu 1924 aligned references: {summary['aligned_references']['Cornilescu 1924']}",
        "",
        "## Mechanical source profiles",
        "",
        "| Corpus | Verses | punctuation-before-hyphen | function-word tails | spell unknown rate |",
        "| --- | ---: | ---: | ---: | ---: |",
    ]
    for name in ("BE active", "BTF", "Biblia Libera", "Cornilescu 1924"):
        profile = profiles[name]
        rate = profile["spell_unknown_rate"]
        rendered_rate = f"{rate:.4%}" if isinstance(rate, float) else "n/a (ro-Cyrl)"
        lines.append(
            f"| {name} | {profile['verses']} | {profile['punctuation_hyphen_verses']} | "
            f"{profile['function_word_tail_verses']} | {rendered_rate} |"
        )
    lines.extend([
        "",
        "## Highest-scoring triage rows",
        "",
        "The baseline comparison texts are shown only as audit evidence. This report makes no recommendation to copy them.",
        "",
    ])
    for item in findings[:top]:
        lines.extend([
            f"### {item.ref} (signal score {item.score})",
            "",
            f"- signals: {'; '.join(item.flags)}",
            f"- BE: {item.text}",
            f"- BTF: {item.bt or '—'}",
            f"- Biblia Libera: {item.libera or '—'}",
            f"- Cornilescu 1924: {item.cornilescu or '—'}",
            f"- WEBP: {item.webp or '—'}",
            "",
        ])
    return "\n".join(lines)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--out", type=Path, default=Path("/private/tmp/nt-corpus-inventory.json"))
    parser.add_argument("--markdown", type=Path, default=Path("/private/tmp/nt-corpus-inventory.md"))
    parser.add_argument("--top", type=int, default=80)
    parser.add_argument(
        "--dictionary-prefix", type=Path,
        default=Path("/private/tmp/emanus-corpus-inventory-assets/ro-index"),
        help="Hunspell prefix; uses sibling python/ for optional spylls installation.",
    )
    args = parser.parse_args()
    active = active_verses()
    references = snapshot_verses()
    spelling = Spellcheck(args.dictionary_prefix if args.dictionary_prefix.with_suffix(".dic").is_file() else None)
    findings, signals = build_findings(active, references, spelling)
    obsolete_i_to_a = likely_obsolete_i_to_a(active, spelling)
    aligned = {
        name: sum(reference in source for reference in active)
        for name, source in references.items() if name != "WEBP"
    }
    payload = {
        "method": {
            "active": "docs/data/biblia-emanus/*.json with NT book ids",
            "benchmarks": "BTF, Biblia Libera, Cornilescu 1924 from pinned nt-sblgnt-1.2.zip",
            "english_bridge": "WEBP from the same snapshot",
            "signals": [
                "punctuation/quote defects", "function-word truncation", "Hunspell rare unknown tokens",
                "plausible concatenated tokens", "very low Romanian lexical overlap", "length outliers",
            ],
            "limitation": "Mechanical and lexical signals only; human source-language review is required to confirm semantic defects.",
        },
        "summary": {
            "active_verses": len(active),
            "aligned_references": aligned,
            "signal_counts": signals,
            "flagged_verses": len(findings),
            "likely_nonstandard_i_to_a_tokens": len(obsolete_i_to_a),
        },
        "source_profiles": {
            "BE active": source_profile("BE active", active, spelling),
            "BTF": source_profile("BTF", references["BTF"], spelling),
            "Biblia Libera": source_profile("Biblia Libera", references["Biblia Libera"], spelling),
            "Cornilescu 1924": source_profile(
                "Cornilescu 1924", references["Cornilescu 1924"], spelling,
                spellcheck_applicable=False,
            ),
        },
        "likely_nonstandard_i_to_a": obsolete_i_to_a,
        "findings": [asdict(item) for item in findings],
    }
    args.out.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    args.markdown.write_text(markdown_report(payload, findings, args.top) + "\n", encoding="utf-8")
    print(json.dumps(payload["summary"], ensure_ascii=False, indent=2))
    print(f"wrote {args.out}")
    print(f"wrote {args.markdown}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
