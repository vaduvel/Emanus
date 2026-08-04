from __future__ import annotations

import importlib.util
import json
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location(
    "materialize_biblia_emanus_nt",
    ROOT / "scripts" / "materialize-biblia-emanus-nt.py",
)
assert SPEC is not None and SPEC.loader is not None
materializer = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(materializer)


class BibliaEmanusNtMaterializerTests(unittest.TestCase):
    def test_rendered_typescript_keeps_text_and_critical_notes(self) -> None:
        payload = {
            "MAT": {
                "1": {
                    "verses": {"1": "Cartea nașterii lui Isus Hristos."},
                    "textualStatuses": {"1": "double-bracketed"},
                    "notes": [
                        {
                            "verse": 2,
                            "kind": "absent-from-critical-main-text",
                            "note": "Numărul este rezervat.",
                        }
                    ],
                    "alternateEndings": [],
                }
            }
        }
        rendered = materializer.render_typescript(payload)
        self.assertIn("BIBLIA_EMANUS_NT_TEXT", rendered)
        self.assertIn("Cartea nașterii lui Isus Hristos.", rendered)
        self.assertIn("absent-from-critical-main-text", rendered)
        self.assertNotIn("DE TRADUS", rendered)

    def test_unpublished_chapter_cannot_be_materialized(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            books = []
            for book_index in range(27):
                book_id = f"X{book_index:02d}"
                chapters = []
                chapter_count = 260 // 27 + (1 if book_index < 260 % 27 else 0)
                for chapter_number in range(1, chapter_count + 1):
                    chapters.append({"number": chapter_number, "verseNumbers": [1]})
                    (root / f"{book_id}.{chapter_number}.json").write_text(
                        json.dumps(
                            {
                                "translation": "BE",
                                "bookId": book_id,
                                "chapter": chapter_number,
                                "status": "published",
                                "public": True,
                                "verses": [{"number": 1, "text": "Text românesc."}],
                                "referenceNotes": [],
                                "editorialNotes": [],
                                "alternateEndings": [],
                            }
                        ),
                        encoding="utf-8",
                    )
                books.append({"id": book_id, "chapters": chapters})
            (root / "X00.1.json").write_text(
                json.dumps(
                    {
                        "translation": "BE",
                        "bookId": "X00",
                        "chapter": 1,
                        "status": "in_review",
                        "public": False,
                        "verses": [{"number": 1, "text": "Text românesc."}],
                    }
                ),
                encoding="utf-8",
            )
            versification = root / "versification.json"
            versification.write_text(
                json.dumps(
                    {
                        "totals": {
                            "books": 27,
                            "chapters": 260,
                            "versesWithMainText": 7941,
                        },
                        "books": books,
                    }
                ),
                encoding="utf-8",
            )
            with self.assertRaisesRegex(
                materializer.MaterializationError, "numai capitole published/public"
            ):
                materializer.build_payload(root, versification)


if __name__ == "__main__":
    unittest.main()
