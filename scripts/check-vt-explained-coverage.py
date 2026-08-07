#!/usr/bin/env python3
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
BIBLE = ROOT / "packages" / "shared" / "src" / "bible"
OVERLAYS = BIBLE / "overlays"

LEGACY = [
    "geneza.ts", "exod.ts", "levitic.ts", "numeri.ts", "deuteronom.ts", "iosua.ts",
    "rut.ts", "samuel1.ts", "samuel2.ts", "imparati1.ts",
]
OVERLAY_FILES = [
    "judecatoriOverlay.ts", "imparati2Overlay.ts", "cronici1Overlay.ts", "cronici2Overlay.ts",
    "ezraOverlay.ts", "neemiaOverlay.ts", "esteraOverlay.ts", "iovOverlay.ts", "psalmiOverlay.ts",
    "proverbeOverlay.ts", "eclesiastulOverlay.ts", "cantareaCantarilorOverlay.ts", "isaiaOverlay.ts",
    "ieremiaOverlay.ts", "plangerileOverlay.ts", "ezechielOverlay.ts", "danielOverlay.ts",
    "oseaOverlay.ts", "ioelOverlay.ts", "amosOverlay.ts", "obadiaOverlay.ts", "ionaOverlay.ts",
    "micaOverlay.ts", "naumOverlay.ts", "habacucOverlay.ts", "tefaniaOverlay.ts", "hagaiOverlay.ts",
    "zahariaOverlay.ts", "maleahiOverlay.ts",
]


def need(condition: bool, message: str) -> None:
    if not condition:
        raise SystemExit(f"[VT explicat] EROARE: {message}")


def main() -> None:
    for filename in LEGACY:
        need((BIBLE / filename).exists(), f"lipsește cartea legacy {filename}")
    for filename in OVERLAY_FILES:
        path = OVERLAYS / filename
        need(path.exists(), f"lipsește overlay-ul {filename}")
        text = path.read_text(encoding="utf-8")
        need('status: "in_review"' in text, f"{filename} nu este in_review")
        need("bibleEmanusBookId:" in text, f"{filename} nu referă Biblia Emanus")

    coverage = (BIBLE / "vtExplainedCoverage.ts").read_text(encoding="utf-8")
    entries = re.findall(r'\{ order: (\d+), id: "([^"]+)", name: "([^"]+)"', coverage)
    need(len(entries) == 39, f"manifestul are {len(entries)}/39 cărți")
    orders = [int(order) for order, _, _ in entries]
    need(orders == list(range(1, 40)), f"ordine invalidă: {orders}")

    registry = (OVERLAYS / "index.ts").read_text(encoding="utf-8")
    exported_overlays = len(re.findall(r'^export \{ .*_EXPLAINED \} from', registry, flags=re.MULTILINE))
    need(exported_overlays == 29, f"registry overlay are {exported_overlays}/29 exporturi")

    print("Biblia explicată VT OK: 39/39 cărți canonice; 10 legacy-full + 29 overlays; toate închise editorial ca in_review.")


if __name__ == "__main__":
    main()
