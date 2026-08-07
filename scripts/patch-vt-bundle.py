#!/usr/bin/env python3
"""Păstrează corpusul VT în chunk-uri separate și în afara exportului root shared."""

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def patch_shared_root() -> None:
    path = ROOT / "packages/shared/src/index.ts"
    text = path.read_text(encoding="utf-8")
    line = 'export * from "./bible/index.js"\n'
    if line in text:
        text = text.replace(line, "", 1)
    path.write_text(text, encoding="utf-8")


def patch_vite() -> None:
    path = ROOT / "apps/web/vite.config.ts"
    text = path.read_text(encoding="utf-8")

    if 'import path from "node:path"' not in text:
        anchor = 'import react from "@vitejs/plugin-react"\n'
        if anchor not in text:
            raise SystemExit("vite.config.ts: lipsește importul React folosit ca ancoră")
        text = text.replace(anchor, anchor + 'import path from "node:path"\n', 1)

    if "function bibleChunk(" not in text:
        anchor = 'import { VitePWA } from "vite-plugin-pwa"\n\n'
        if anchor not in text:
            raise SystemExit("vite.config.ts: lipsește ancora VitePWA")
        helper = r'''function bibleChunk(id: string): string | undefined {
  if (!id.includes("packages/shared/dist/bible/")) return undefined

  const file = path.basename(id).replace(/\.js$/, "")

  // Fiecare carte VT rămâne sub limita standard Workbox de 2 MiB, astfel
  // Biblia poate fi precached offline fără să devină un monolit în bundle.
  const books: Array<[RegExp, string]> = [
    [/^geneza/i, "bible-geneza"],
    [/^exod/i, "bible-exod"],
    [/^levitic/i, "bible-levitic"],
    [/^numeri/i, "bible-numeri"],
    [/^deuteronom/i, "bible-deuteronom"],
    [/^iosua/i, "bible-iosua"],
    [/^judecatori/i, "bible-judecatori"],
    [/^rut/i, "bible-rut"],
    [/^samuel/i, "bible-samuel"],
    [/^imparati/i, "bible-imparati"],
    [/^cronici/i, "bible-cronici"],
    [/^ezra/i, "bible-ezra"],
    [/^neemia/i, "bible-neemia"],
    [/^estera/i, "bible-estera"],
    [/^iov/i, "bible-iov"],
    [/^psalm/i, "bible-psalmi"],
    [/^proverbe/i, "bible-proverbe"],
    [/^eclesiast/i, "bible-eclesiastul"],
    [/^cantarea/i, "bible-cantarea"],
    [/^isaia/i, "bible-isaia"],
    [/^ieremia/i, "bible-ieremia"],
    [/^planger/i, "bible-plangerile"],
    [/^ezechiel/i, "bible-ezechiel"],
    [/^daniel/i, "bible-daniel"],
    [/^osea/i, "bible-osea"],
    [/^ioel/i, "bible-ioel"],
    [/^amos/i, "bible-amos"],
    [/^obadia/i, "bible-obadia"],
    [/^iona/i, "bible-iona"],
    [/^mica/i, "bible-mica"],
    [/^naum/i, "bible-naum"],
    [/^habacuc/i, "bible-habacuc"],
    [/^tefania/i, "bible-tefania"],
    [/^hagai/i, "bible-hagai"],
    [/^zaharia/i, "bible-zaharia"],
    [/^maleahi/i, "bible-maleahi"],
  ]

  for (const [pattern, chunk] of books) {
    if (pattern.test(file)) return chunk
  }

  if (
    id.includes("/bible/overlays/") ||
    file.startsWith("vtFullNarratives") ||
    file === "completeOverlay" ||
    file === "explainedOverlay" ||
    file === "vtExplainedCoverage"
  ) {
    return "bible-vt-explanations"
  }

  return "bible-core"
}

'''
        text = text.replace(anchor, anchor + helper, 1)

    old = '          return undefined\n'
    if old in text:
        text = text.replace(old, '          return bibleChunk(id)\n', 1)
    elif '          return bibleChunk(id)\n' not in text:
        raise SystemExit("vite.config.ts: manualChunks nu are ancora așteptată")

    path.write_text(text, encoding="utf-8")


def main() -> None:
    patch_shared_root()
    patch_vite()
    print("Bundle VT: export root eliminat, chunk-uri VT configurate fără mărirea limitei Workbox.")


if __name__ == "__main__":
    main()
