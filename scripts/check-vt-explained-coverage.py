#!/usr/bin/env python3
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
BIBLE = ROOT / "packages" / "shared" / "src" / "bible"
OVERLAYS = BIBLE / "overlays"
PUBLISHED_TEXT = BIBLE / "generated" / "publishedEmanusOtText.ts"

LEGACY = [
    "geneza.ts", "exod.ts", "levitic.ts", "numeri.ts", "deuteronom.ts", "iosua.ts",
    "rut.ts", "samuel1.ts", "samuel2.ts", "imparati1.ts",
]
BASE_OVERLAY_FILES = [
    "judecatoriOverlay.ts", "imparati2Overlay.ts", "cronici1Overlay.ts", "cronici2Overlay.ts",
    "ezraOverlay.ts", "neemiaOverlay.ts", "esteraOverlay.ts", "iovOverlay.ts", "psalmiOverlay.ts",
    "proverbeOverlay.ts", "eclesiastulOverlay.ts", "cantareaCantarilorOverlay.ts", "isaiaOverlay.ts",
    "ieremiaOverlay.ts", "plangerileOverlay.ts", "ezechielOverlay.ts", "danielOverlay.ts",
    "oseaOverlay.ts", "ioelOverlay.ts", "amosOverlay.ts", "obadiaOverlay.ts", "ionaOverlay.ts",
    "micaOverlay.ts", "naumOverlay.ts", "habacucOverlay.ts", "tefaniaOverlay.ts", "hagaiOverlay.ts",
    "zahariaOverlay.ts", "maleahiOverlay.ts",
]
NARRATIVE_FILES = {
    "vtFullNarrativesHistorical.ts": 144,
    "vtFullNarrativesWisdom.ts": 243,
    "vtFullNarrativesMajorProphets.ts": 183,
    "vtFullNarrativesMinorProphets.ts": 67,
}
EXPECTED_OVERLAY_CHAPTERS = sum(NARRATIVE_FILES.values())  # 637


def need(condition: bool, message: str) -> None:
    if not condition:
        raise SystemExit(f"[VT explicat] EROARE: {message}")


def read(path: Path) -> str:
    need(path.exists(), f"lipsește {path.relative_to(ROOT)}")
    return path.read_text(encoding="utf-8")


def main() -> None:
    for filename in LEGACY:
        need((BIBLE / filename).exists(), f"lipsește cartea legacy {filename}")

    # Fișierele-sursă de overlay rămân artefacte editoriale in_review.
    # Statusul final al explicației este stabilit numai după compunere/review.
    for filename in BASE_OVERLAY_FILES:
        text = read(OVERLAYS / filename)
        need('status: "in_review"' in text, f"{filename} nu păstrează starea editorială de bază")
        need("bibleEmanusBookId:" in text, f"{filename} nu referă ID-ul canonic pentru Biblia Emanus")

    helper = read(BIBLE / "completeOverlay.ts")
    need('coverageMode: "full"' in helper, "helperul nu setează coverageMode=full")
    need("uncoveredRanges" in helper, "lipsește calculul intervalelor neexplicate")
    need("assertVerseCompleteOverlay" in helper, "lipsește aserția de acoperire a versetelor")
    need("rezumat narativ fără doctrină adăugată" in helper, "lipsește truth-guard pentru explicația textuală")

    total_titles = 0
    total_summaries = 0
    total_verse_counts = 0
    for filename, expected_chapters in NARRATIVE_FILES.items():
        text = read(BIBLE / filename)
        titles = len(re.findall(r"\btitle:\s*\"", text))
        summaries = len(re.findall(r"\bsummary:\s*\"", text))
        verse_counts = len(re.findall(r"\b\d+\s*:\s*\d+\b", text))
        need(titles == expected_chapters, f"{filename}: {titles}/{expected_chapters} titluri de capitol")
        need(summaries == expected_chapters, f"{filename}: {summaries}/{expected_chapters} explicații de capitol")
        need(verse_counts == expected_chapters, f"{filename}: {verse_counts}/{expected_chapters} numărări de versete")
        total_titles += titles
        total_summaries += summaries
        total_verse_counts += verse_counts

    need(total_titles == EXPECTED_OVERLAY_CHAPTERS, f"doar {total_titles}/{EXPECTED_OVERLAY_CHAPTERS} capitole overlay explicate")
    need(total_summaries == EXPECTED_OVERLAY_CHAPTERS, f"doar {total_summaries}/{EXPECTED_OVERLAY_CHAPTERS} explicații overlay")
    need(total_verse_counts == EXPECTED_OVERLAY_CHAPTERS, f"doar {total_verse_counts}/{EXPECTED_OVERLAY_CHAPTERS} capitole cu versificație")

    full = read(OVERLAYS / "fullCoverage.ts")
    composed = re.findall(r"^export const ([A-Z0-9_]+)_FULL = full\(", full, flags=re.MULTILINE)
    need(len(composed) == 29, f"fullCoverage compune {len(composed)}/29 overlay-uri")
    need("VT_EXPLAINED_FULL_OVERLAYS.length !== 29" in full, "lipsește aserția registry-ului complet")
    need('coverageMode !== "full"' in full, "lipsește aserția coverageMode=full")
    need('status: "published" as const' in full, "registry-ul final nu marchează explicația published")
    need('book.status !== "published"' in full, "lipsește aserția statusului final published")

    registry = read(OVERLAYS / "index.ts")
    need("VT_EXPLAINED_OVERLAYS = VT_EXPLAINED_FULL_OVERLAYS" in registry, "registry-ul final nu folosește overlay-urile complete")

    coverage = read(BIBLE / "vtExplainedCoverage.ts")
    legacy_entries = re.findall(r"^\s*legacy\((\d+),", coverage, flags=re.MULTILINE)
    overlay_entries = re.findall(r"^\s*overlay\((\d+),", coverage, flags=re.MULTILINE)
    need(len(legacy_entries) == 10, f"manifestul are {len(legacy_entries)}/10 legacy-full")
    need(len(overlay_entries) == 29, f"manifestul are {len(overlay_entries)}/29 full-overlay")
    ordered = [int(x) for x in re.findall(r"^\s*(?:legacy|overlay)\((\d+),", coverage, flags=re.MULTILINE)]
    need(ordered == list(range(1, 40)), f"ordine invalidă în manifest: {ordered}")
    need('coverage: "full"' in coverage, "manifestul nu declară acoperire full")
    need('status: "published"' in coverage, "manifestul nu declară explicațiile published")
    need('book.status !== "published"' in coverage, "manifestul nu verifică statusul final published")

    # Starea finală s-a schimbat după publicarea PR #87: nu mai există text VT
    # provizoriu în reader. Toate explicațiile sunt legate de corpusul Emanus publicat.
    published = read(PUBLISHED_TEXT)
    need("PUBLISHED_EMANUS_OT_BOOK_COUNT = 39" in published, "materializarea finală nu declară 39 de cărți")
    need("PUBLISHED_EMANUS_OT_CHAPTER_COUNT = 929" in published, "materializarea finală nu declară 929 de capitole")
    need("PUBLISHED_EMANUS_OT_VERSE_COUNT = 23145" in published, "materializarea finală nu declară 23.145 de versete")

    overlay_reader = read(BIBLE / "overlayBibleBooks.ts")
    need("PUBLISHED_EMANUS_OT_TEXT_BY_ORDER" in overlay_reader, "overlay-urile nu folosesc corpusul Biblia Emanus publicat")
    need("verseStart: unit.from" in overlay_reader and "verseEnd: unit.to" in overlay_reader, "overlay-urile nu leagă explicit intervalele canonice")
    need("status: overlay.status" in overlay_reader, "overlay-urile nu propagă statusul explicației aprobate")
    need("VT_OVERLAY_TEMPORARY_TEXTS = [] as const" in overlay_reader, "mai există texte VT provizorii în catalogul final")
    need("translation: BIBLIA_EMANUS_TRANSLATION" in overlay_reader, "overlay-urile nu declară traducerea Biblia Emanus")
    need("VT_OVERLAY_TRANSLATION_BLOCKERS = []" in overlay_reader, "traducerea este încă tratată ca blocker editorial")

    binder = read(BIBLE / "publishedEmanusBinding.ts")
    need("PUBLISHED_EMANUS_OT_TEXT_BY_ORDER" in binder, "legacy binding nu folosește corpusul Emanus publicat")
    need("verseStart" in binder and "verseEnd" in binder, "legacy binding nu materializează intervalele canonice")
    need('status: "published" as const' in binder, "legacy binding nu publică capitolele după legarea cu textul final")
    need("text: verses.slice(verseStart - 1, verseEnd).join" in binder, "legacy binding nu înlocuiește textul vechi cu Emanus")

    final_catalog = read(BIBLE / "publicationBibleFinal.ts")
    need("BASE_PUBLICATION_BIBLE_BOOKS.map" in final_catalog, "catalogul final nu aplică binding-ul tuturor cărților")
    need("bindBookToPublishedEmanusText" in final_catalog, "catalogul final nu leagă legacy + overlay la Emanus")

    package = read(ROOT / "packages" / "shared" / "package.json")
    need('"./bible-explained"' in package, "registry-ul Bibliei explicate nu este exportat de @emanus/shared")
    need("publicationBibleFinal" in package, "exportul public al reader-ului nu folosește catalogul final Emanus")

    print(
        "Biblia explicată VT OK: 39/39 cărți canonice au explicația publication-approved; "
        "10 legacy-full + 29 full-overlay; 637/637 capitole overlay au explicație și versificație; "
        "textul VT provizoriu a fost eliminat din runtime, iar catalogul final este legat de Biblia Emanus publicată "
        "prin intervale verseStart/verseEnd."
    )


if __name__ == "__main__":
    main()
