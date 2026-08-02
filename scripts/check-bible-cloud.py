#!/usr/bin/env python3
"""Verifica barierele de securitate si integrarea Bibliei cloud."""

from __future__ import annotations

import argparse
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
BASE_MIGRATION = ROOT / "supabase/migrations/20260802180000_bible_product.sql"
REVIEW_MIGRATION = ROOT / "supabase/migrations/20260802213000_owner_review_and_progress.sql"


def fail(message: str) -> None:
    print(f"EROARE: {message}", file=sys.stderr)
    raise SystemExit(1)


def check_source() -> None:
    base = BASE_MIGRATION.read_text(encoding="utf-8").lower()
    review = REVIEW_MIGRATION.read_text(encoding="utf-8").lower()
    schema = (ROOT / "supabase/schema.sql").read_text(encoding="utf-8").lower()
    tables = (
        "bible_books",
        "bible_chapters",
        "bible_units",
        "bible_reading_progress",
        "bible_saved_units",
        "bible_notes",
        "app_roles",
        "bible_questions",
    )
    for table in tables:
        if f"create table if not exists public.{table}" not in base:
            fail(f"lipseste tabelul {table} din migrare")
        if f"alter table public.{table} enable row level security" not in base:
            fail(f"RLS nu este activat pe {table}")
        if f"create table if not exists public.{table}" not in schema:
            fail(f"schema consolidata nu include {table}")

    required_base = (
        "bible_reading_progress_own",
        "bible_saved_units_own",
        "bible_notes_own",
        "bible_questions_own_or_staff_read",
        "bible_questions_own_insert",
        "security definer",
        "revoke all on public.app_roles, public.bible_questions from anon, authenticated",
    )
    for marker in required_base:
        if marker not in base:
            fail(f"lipseste bariera SQL de baza: {marker}")

    required_review = (
        "is_editorial_reviewer",
        "bible_books_visible_read",
        "bible_chapters_visible_read",
        "bible_units_visible_read",
        "chapter.status = 'in_review' and public.is_editorial_reviewer()",
        "add column if not exists path_progress",
        "add column if not exists library_done",
        "add column if not exists context_id",
    )
    for marker in required_review:
        if marker not in review:
            fail(f"lipseste regula de revizie a proprietarului: {marker}")

    if "role = 'admin'" not in review:
        fail("reviewerul editorial nu este limitat la rolul admin")
    if re.search(r"status\s*=\s*'draft'.{0,100}is_editorial_reviewer", review, re.DOTALL):
        fail("draftul a fost expus reviewerului; numai in_review trebuie vizibil")
    if "status = 'published'" not in review or "status = 'in_review'" not in review:
        fail("politica nu separa published de in_review")

    if "\\ir " in schema:
        fail("schema.sql contine o comanda psql care nu ruleaza in SQL Editor")

    web_src = ROOT / "apps/web/src"
    forbidden = (
        re.compile(r"import\.meta\.env\.[a-z0-9_]*(?:secret|service_role)", re.IGNORECASE),
        re.compile(r"sb_secret_[a-z0-9_-]{12,}", re.IGNORECASE),
    )
    for path in web_src.rglob("*"):
        if not path.is_file():
            continue
        content = path.read_text(encoding="utf-8", errors="ignore")
        for marker in forbidden:
            if marker.search(content):
                fail(f"secret server-side mentionat in bundle: {path.relative_to(ROOT)}")

    bible_screen = (web_src / "screens/Bible.tsx").read_text(encoding="utf-8")
    if "BIBLE_BOOKS" in bible_screen or "findChapter" in bible_screen:
        fail("ecranul Bibliei importa din nou catalogul editorial in bundle")
    for copy in (
        "în revizie: îl parcurgi în aplicație ca reviewer final",
        "publicul îl va vedea numai după aprobarea și publicarea ta",
    ):
        if copy not in bible_screen.lower():
            fail(f"interfata nu explica starea in_review: {copy}")

    router = (web_src / "router.tsx").read_text(encoding="utf-8")
    app = (web_src / "App.tsx").read_text(encoding="utf-8")
    for route in ('"/biblia-mea"', '"/inbox-intrebari"', '"/auth"'):
        if route not in router:
            fail(f"ruta {route} nu este parsata")
    for component in ("<BibleMine", "<QuestionInbox", "<Auth"):
        if component not in app:
            fail(f"componenta {component} nu este montata")

    workflow = (ROOT / ".github/workflows/ci.yml").read_text(encoding="utf-8")
    for command in ("pnpm check:bible-source", "pnpm check:bible-cloud", "pnpm check:active-content"):
        if command not in workflow:
            fail(f"CI nu ruleaza {command}")

    auth = (web_src / "Auth.tsx").read_text(encoding="utf-8")
    for cleanup in ("clearBiblePersonalLocal", "clearJourneyLocal", "clearUserId"):
        if cleanup not in auth:
            fail(f"deconectarea nu curata datele locale: {cleanup}")

    crisis = (web_src / "Crisis.tsx").read_text(encoding="utf-8")
    if "0800 801 200" in crisis or "0800801200" in crisis:
        fail("numarul neconfirmat este afisat in ecranul de criza")
    active_copy = (web_src / "privacy.ts").read_text(encoding="utf-8")
    if "0800\\s*801\\s*200" not in active_copy or "ajutor medical și specializat" not in active_copy:
        fail("stratul editorial nu neutralizeaza numarul neconfirmat din lectiile vechi")

    cache = (web_src / "bibleContent.ts").read_text(encoding="utf-8")
    for marker in ("peekCloudUser", "account:${peekCloudUser()?.id", "chapterMemory.clear()"):
        if marker not in cache:
            fail("cache-ul editorial nu este izolat pe identitatea cloud")

    print("Biblia cloud: RLS, owner-review, cache, progres, secrete si rute verificate.")


def check_bundle() -> None:
    dist = ROOT / "apps/web/dist"
    if not dist.exists():
        fail("apps/web/dist lipseste; ruleaza build inainte")
    files = [path for path in dist.rglob("*") if path.is_file()]
    if any("bible-content" in path.name.lower() for path in files):
        fail("bundle-ul bible-content a reaparut")
    needles = (b"geneza-50-22-26", "Faceți ucenici din toate neamurile".encode(), b"ioan-21-20-25")
    shared_dist = ROOT / "packages/shared/dist/bible"
    editorial_build = b"".join(path.read_bytes() for path in shared_dist.rglob("*.js"))
    for needle in needles:
        if needle not in editorial_build:
            fail(f"martorul editorial {needle.decode()} nu exista in sursa compilata")
    for path in files:
        if path.suffix not in {".js", ".css", ".html"}:
            continue
        body = path.read_bytes()
        if any(needle in body for needle in needles):
            fail(f"text editorial gasit in bundle: {path.relative_to(ROOT)}")
    print("Bundle Biblia: continutul editorial nu este preincarcat.")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--bundle", action="store_true")
    args = parser.parse_args()
    check_bundle() if args.bundle else check_source()


if __name__ == "__main__":
    main()
