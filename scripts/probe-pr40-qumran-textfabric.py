#!/usr/bin/env python3
"""Probe Text-Fabric extraction for the exact Qumran manuscript map.

The output proves which node types and text formats reproduce each selected
scroll. It records small samples only; the full candidate corpus is created by
a later gate once this probe is deterministic.
"""
from __future__ import annotations

import json
import subprocess
from pathlib import Path
from typing import Any

from tf.fabric import Fabric

ROOT = Path(__file__).resolve().parents[1]
CACHE = ROOT / ".cache" / "etcbc-dss-probe"
OUT = ROOT / "docs" / "biblia-emanus" / "PR40-QUMRAN-TEXTFABRIC-PROBE.json"
REPO = "https://github.com/ETCBC/dss.git"
COMMIT = "2403d16654984fc5567a5bd263086d9ad2a7a1dd"
SELECTED = [
    "1QS", "1QSa", "1QSb", "1Q20", "1Q23", "2Q26", "4Q203", "4Q206",
    "4Q530", "4Q531", "4Q532", "4Q533", "6Q8", "1QpHab", "1QHa",
    "4Q400", "11Q19", "1QM", "11Q5", "4Q381",
]


def clone() -> Path:
    if CACHE.exists():
        subprocess.check_call(["rm", "-rf", str(CACHE)])
    CACHE.parent.mkdir(parents=True, exist_ok=True)
    subprocess.check_call(["git", "clone", "--no-checkout", REPO, str(CACHE)])
    subprocess.check_call(["git", "checkout", COMMIT], cwd=CACHE)
    return CACHE / "tf" / "2.0"


def safe_text(T: Any, node: int, formats: list[str]) -> dict[str, str]:
    rendered: dict[str, str] = {}
    for fmt in formats:
        try:
            value = T.text(node, fmt=fmt)
        except Exception as error:  # noqa: BLE001
            rendered[fmt] = f"<ERROR {type(error).__name__}: {error}>"
            continue
        if value:
            rendered[fmt] = value[:1000]
    try:
        default = T.text(node)
    except Exception as error:  # noqa: BLE001
        rendered["<default>"] = f"<ERROR {type(error).__name__}: {error}>"
    else:
        if default:
            rendered["<default>"] = default[:1000]
    return rendered


def main() -> None:
    tf_dir = clone()
    TF = Fabric(locations=str(tf_dir), silent="deep")
    api = TF.load(
        "scroll fragment line chapter book glyph glyphe glypho g_cons full fulle fullo after lang",
        silent="deep",
    )
    if api is None:
        raise SystemExit("Text-Fabric could not load the DSS features")
    F, L, T = api.F, api.L, api.T
    node_types = {
        level[0]: {"averageSlots": level[1], "firstNode": level[2], "lastNode": level[3]}
        for level in F.otype.all
    }
    formats = sorted(T.formats)
    scroll_nodes = list(F.otype.s("scroll"))
    by_name = {F.scroll.v(node): node for node in scroll_nodes if F.scroll.v(node)}
    records: dict[str, Any] = {}
    missing: list[str] = []

    for scroll in SELECTED:
        node = by_name.get(scroll)
        if node is None:
            missing.append(scroll)
            continue
        descendants: dict[str, list[int]] = {}
        for node_type in ("fragment", "chapter", "line", "word", "sign", "glyph"):
            try:
                values = list(L.d(node, otype=node_type))
            except Exception:  # noqa: BLE001
                values = []
            if values:
                descendants[node_type] = values
        sample_type = next((kind for kind in ("line", "fragment", "chapter", "word") if descendants.get(kind)), None)
        samples: list[dict[str, Any]] = []
        if sample_type:
            for sample_node in descendants[sample_type][:5]:
                samples.append(
                    {
                        "node": sample_node,
                        "nodeType": sample_type,
                        "fragment": F.fragment.v(sample_node),
                        "line": F.line.v(sample_node),
                        "chapter": F.chapter.v(sample_node),
                        "texts": safe_text(T, sample_node, formats),
                    }
                )
        records[scroll] = {
            "node": node,
            "descendantCounts": {kind: len(values) for kind, values in descendants.items()},
            "sampleNodeType": sample_type,
            "samples": samples,
            "scrollText": safe_text(T, node, formats),
        }

    payload = {
        "schemaVersion": 1,
        "repository": REPO,
        "commit": COMMIT,
        "tfDirectory": str(tf_dir.relative_to(CACHE)),
        "nodeTypes": node_types,
        "textFormats": formats,
        "scrollCount": len(scroll_nodes),
        "selectedCount": len(SELECTED),
        "resolvedCount": len(records),
        "missing": missing,
        "scrolls": records,
        "readyForFullExtraction": not missing and all(
            record["sampleNodeType"] and record["samples"] for record in records.values()
        ),
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({
        "nodeTypes": list(node_types),
        "textFormats": formats,
        "resolved": len(records),
        "missing": missing,
        "readyForFullExtraction": payload["readyForFullExtraction"],
    }, ensure_ascii=False, indent=2))
    if missing or not payload["readyForFullExtraction"]:
        raise SystemExit("Text-Fabric probe is incomplete; inspect report")


if __name__ == "__main__":
    main()
