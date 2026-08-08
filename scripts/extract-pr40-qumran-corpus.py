#!/usr/bin/env python3
"""Build the authentic fragment-based Qumran corpus replacing PR #40 placeholders.

The source is the pinned ETCBC/dss Text-Fabric dataset. Output is deliberately
organized by manuscript, fragment, and line. It never turns reconstructed
columns or modern editorial divisions into invented Bible-like chapters.

The ETCBC/Abegg data is restricted to noncommercial redistribution. Therefore
this corpus is isolated under CC BY-NC 4.0-compatible research terms and is not
part of the commercial/canonical Biblia Emanus license bundle.
"""
from __future__ import annotations

import hashlib
import json
import shutil
import subprocess
from pathlib import Path
from typing import Any

from tf.fabric import Fabric

ROOT = Path(__file__).resolve().parents[1]
CACHE = ROOT / ".cache" / "etcbc-dss-corpus"
OUT = ROOT / "docs" / "data" / "biblia-emanus-qumran-source"
REPORT = ROOT / "docs" / "biblia-emanus" / "PR40-QUMRAN-SOURCE-CORPUS.json"
REPOSITORY = "https://github.com/ETCBC/dss.git"
COMMIT = "2403d16654984fc5567a5bd263086d9ad2a7a1dd"

COLLECTIONS: dict[str, dict[str, Any]] = {
    "COMM_REG": {
        "name": "Regula Comunității și anexele ei",
        "witnesses": ["1QS", "1QSa", "1QSb"],
        "description": "1QS, Regula Congregației și Regula Binecuvântărilor",
    },
    "GEN_APO": {
        "name": "Apocriful Genezei",
        "witnesses": ["1Q20"],
        "description": "Ediție fragmentară a manuscrisului aramaic 1Q20",
    },
    "GIANTS": {
        "name": "Cartea Uriașilor — martori din deșertul Iudeii",
        "witnesses": ["1Q23", "2Q26", "4Q203", "4Q206", "4Q530", "4Q531", "4Q532", "4Q533", "6Q8"],
        "description": "Colecție de fragmente aramaice; nu este o reconstrucție continuă a cărții",
    },
    "HAB_COM": {
        "name": "Comentariul la Habacuc",
        "witnesses": ["1QpHab"],
        "description": "Pesher Habacuc, manuscrisul 1QpHab",
    },
    "HODAYOT": {
        "name": "Imnurile de mulțumire",
        "witnesses": ["1QHa"],
        "description": "Hodayot, manuscrisul 1QHa, păstrat fragmentar",
    },
    "SABB_SAC": {
        "name": "Cântările Jertfei de Sabat",
        "witnesses": ["4Q400"],
        "description": "Martorul 4Q400; ediție a fragmentelor disponibile în dataset",
    },
    "TEMP_SCR": {
        "name": "Sulul Templului",
        "witnesses": ["11Q19"],
        "description": "Sulul Templului 11Q19, organizat după fragmente și linii",
    },
    "WAR_SCR": {
        "name": "Sulul Războiului",
        "witnesses": ["1QM"],
        "description": "Regula Războiului 1QM, organizată după fragmente și linii",
    },
    "ADD_PSA": {
        "name": "Psalmi și compoziții poetice suplimentare de la Qumran",
        "witnesses": ["11Q5", "4Q381"],
        "description": "Colecție de fragmente poetice; nu este etichetată automat drept Psalmii 152–155",
    },
}


def clone_source() -> Path:
    if CACHE.exists():
        shutil.rmtree(CACHE)
    CACHE.parent.mkdir(parents=True, exist_ok=True)
    subprocess.check_call(["git", "clone", "--no-checkout", REPOSITORY, str(CACHE)])
    subprocess.check_call(["git", "checkout", COMMIT], cwd=CACHE)
    return CACHE / "tf" / "2.0"


def clean_text(value: Any) -> str:
    return " ".join(str(value or "").replace("\u00a0", " ").split())


def first_feature(F: Any, nodes: list[int], feature: str) -> str | None:
    accessor = getattr(F, feature, None)
    if accessor is None:
        return None
    for node in nodes:
        value = accessor.v(node)
        if value not in {None, ""}:
            return str(value)
    return None


def sha_text(value: str) -> str:
    return hashlib.sha256(value.encode("utf-8")).hexdigest()


def main() -> None:
    tf_dir = clone_source()
    TF = Fabric(locations=str(tf_dir), silent="deep")
    api = TF.load(
        "scroll fragment line chapter book glyph glyphe glypho g_cons full fulle fullo after lang",
        silent="deep",
    )
    if api is None:
        raise SystemExit("Text-Fabric could not load the pinned DSS dataset")
    F, L, T = api.F, api.L, api.T

    OUT.mkdir(parents=True, exist_ok=True)
    for path in OUT.glob("*.json"):
        path.unlink()

    scroll_nodes = list(F.otype.s("scroll"))
    by_name = {str(F.scroll.v(node)): node for node in scroll_nodes if F.scroll.v(node)}
    all_expected = {witness for item in COLLECTIONS.values() for witness in item["witnesses"]}
    missing = sorted(all_expected - set(by_name))
    if missing:
        raise SystemExit(f"Pinned DSS dataset lacks required witnesses: {missing}")

    report: dict[str, Any] = {
        "schemaVersion": 2,
        "source": {
            "repository": REPOSITORY,
            "commit": COMMIT,
            "textFabricVersion": "2.0",
            "licensePolicy": "Noncommercial research redistribution; derived Romanian edition CC BY-NC 4.0",
        },
        "collections": {},
        "witnesses": {},
        "totalLacunae": [],
        "blocking": [],
    }

    witness_to_collection = {
        witness: collection_id
        for collection_id, metadata in COLLECTIONS.items()
        for witness in metadata["witnesses"]
    }

    for witness in sorted(all_expected):
        node = by_name[witness]
        fragment_nodes = list(L.d(node, otype="fragment"))
        if not fragment_nodes:
            report["blocking"].append({"witness": witness, "code": "NO_FRAGMENTS"})
            continue

        fragments: list[dict[str, Any]] = []
        seen_line_keys: set[tuple[str, str]] = set()
        diplomatic_parts: list[str] = []
        normalized_parts: list[str] = []
        line_total = 0
        total_lacunae = 0

        for fragment_node in fragment_nodes:
            fragment_id = str(F.fragment.v(fragment_node) or fragment_node)
            line_nodes = list(L.d(fragment_node, otype="line"))
            lines: list[dict[str, Any]] = []
            for line_node in line_nodes:
                line_id = str(F.line.v(line_node) or line_node)
                key = (fragment_id, line_id)
                if key in seen_line_keys:
                    report["blocking"].append(
                        {"witness": witness, "fragment": fragment_id, "line": line_id, "code": "DUPLICATE_LINE_KEY"}
                    )
                    continue
                seen_line_keys.add(key)
                words = list(L.d(line_node, otype="word"))
                diplomatic = clean_text(T.text(line_node, fmt="text-orig-extra"))
                normalized = clean_text(T.text(line_node, fmt="text-orig-full"))
                transliteration = clean_text(T.text(line_node, fmt="text-source-extra"))
                normalized_transliteration = clean_text(T.text(line_node, fmt="text-source-full"))
                language = first_feature(F, words, "lang")

                is_total_lacuna = not diplomatic and not normalized and bool(normalized_transliteration)
                if not diplomatic and not normalized and not normalized_transliteration:
                    report["blocking"].append(
                        {"witness": witness, "fragment": fragment_id, "line": line_id, "code": "UNEXPLAINED_EMPTY_SOURCE_LINE"}
                    )
                if is_total_lacuna:
                    total_lacunae += 1
                    report["totalLacunae"].append(
                        {
                            "witness": witness,
                            "fragment": fragment_id,
                            "line": line_id,
                            "sourceMarker": normalized_transliteration,
                            "translationPolicy": "Do not reconstruct or translate; display as a completely lost line.",
                        }
                    )

                line_record = {
                    "line": line_id,
                    "language": language,
                    "diplomatic": diplomatic,
                    "normalized": normalized,
                    "transliterationDiplomatic": transliteration,
                    "transliterationNormalized": normalized_transliteration,
                    "wordCount": len(words),
                    "hasLacunae": is_total_lacuna or diplomatic != normalized,
                    "isTotalLacuna": is_total_lacuna,
                    "translationAllowed": not is_total_lacuna,
                }
                if is_total_lacuna:
                    line_record["displayPlaceholder"] = "[…]"
                    line_record["editorialNote"] = "Linie complet pierdută în manuscris; nu se reconstituie text."
                lines.append(line_record)

                structural_marker = diplomatic or (f"<TOTAL-LACUNA:{normalized_transliteration}>" if is_total_lacuna else "<EMPTY>")
                normalized_marker = normalized or (f"<TOTAL-LACUNA:{normalized_transliteration}>" if is_total_lacuna else "<EMPTY>")
                diplomatic_parts.append(f"{fragment_id}:{line_id}\t{structural_marker}")
                normalized_parts.append(f"{fragment_id}:{line_id}\t{normalized_marker}")
                line_total += 1
            fragments.append(
                {
                    "fragment": fragment_id,
                    "lineCount": len(lines),
                    "totalLacunaCount": sum(1 for line in lines if line["isTotalLacuna"]),
                    "lines": lines,
                }
            )

        witness_document = {
            "schemaVersion": 2,
            "collectionId": witness_to_collection[witness],
            "witness": witness,
            "status": "source_verified",
            "public": False,
            "publicationForm": "fragment-edition",
            "license": "CC BY-NC 4.0 for derived Romanian research edition",
            "source": {
                "repository": REPOSITORY,
                "commit": COMMIT,
                "dataset": "ETCBC/dss Text-Fabric 2.0",
                "sourceTextRole": "Hebrew/Aramaic diplomatic and normalized transcription",
            },
            "fragmentCount": len(fragments),
            "lineCount": line_total,
            "totalLacunaCount": total_lacunae,
            "sourceDigest": sha_text("\n".join(diplomatic_parts)),
            "normalizedDigest": sha_text("\n".join(normalized_parts)),
            "fragments": fragments,
        }
        (OUT / f"{witness}.json").write_text(
            json.dumps(witness_document, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        report["witnesses"][witness] = {
            "collectionId": witness_to_collection[witness],
            "fragmentCount": len(fragments),
            "lineCount": line_total,
            "totalLacunaCount": total_lacunae,
            "sourceDigest": witness_document["sourceDigest"],
            "normalizedDigest": witness_document["normalizedDigest"],
        }

    for collection_id, metadata in COLLECTIONS.items():
        resolved = [witness for witness in metadata["witnesses"] if witness in report["witnesses"]]
        collection_doc = {
            "schemaVersion": 2,
            "id": collection_id,
            "name": metadata["name"],
            "description": metadata["description"],
            "category": "Qumran / manuscrise din deșertul Iudeii",
            "status": "source_verified" if len(resolved) == len(metadata["witnesses"]) else "source_review",
            "public": False,
            "runtimeEnabled": False,
            "publicationForm": "fragment-collection",
            "license": "CC BY-NC 4.0 for derived Romanian research edition",
            "witnesses": resolved,
            "warning": "Lacunele și reconstrucțiile editoriale sunt păstrate; colecția nu reprezintă un text continuu complet.",
            "totalLacunaPolicy": "Linia este afișată ca […] și nu primește traducere inventată.",
        }
        (OUT / f"{collection_id}.manifest.json").write_text(
            json.dumps(collection_doc, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        report["collections"][collection_id] = {
            "name": metadata["name"],
            "expectedWitnesses": metadata["witnesses"],
            "resolvedWitnesses": resolved,
            "ready": len(resolved) == len(metadata["witnesses"]),
        }
        if len(resolved) != len(metadata["witnesses"]):
            report["blocking"].append({"collectionId": collection_id, "code": "INCOMPLETE_WITNESS_SET"})

    report["summary"] = {
        "collections": len(COLLECTIONS),
        "expectedWitnesses": len(all_expected),
        "resolvedWitnesses": len(report["witnesses"]),
        "fragments": sum(item["fragmentCount"] for item in report["witnesses"].values()),
        "lines": sum(item["lineCount"] for item in report["witnesses"].values()),
        "totalLacunae": len(report["totalLacunae"]),
        "blockingIssues": len(report["blocking"]),
        "sourceCorpusReady": not report["blocking"],
    }
    REPORT.parent.mkdir(parents=True, exist_ok=True)
    REPORT.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(report["summary"], ensure_ascii=False, indent=2))
    if report["blocking"]:
        raise SystemExit("Qumran source corpus has blocking issues; inspect report")


if __name__ == "__main__":
    main()
