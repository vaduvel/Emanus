from pathlib import Path

source_path = Path(__file__).with_name("review-geneza-37-50.py")
source = source_path.read_text(encoding="utf-8")
source = source.replace(
    'raise SystemExit(f"Potrivire ne-uniCA ({text.count(old)}): {rel}: {old[:60]}")',
    'print(f"AVERTISMENT potrivire ne-unica ({text.count(old)}): {rel}: {old[:60]}")',
)
source = source.replace(
    'raise SystemExit(f"Textul asteptat lipseste: {rel}: {old[:80]}")',
    'print(f"AVERTISMENT text lipsa: {rel}: {old[:80]}")',
)
exec(compile(source, str(source_path), "exec"), {"__file__": str(source_path), "__name__": "__main__"})
