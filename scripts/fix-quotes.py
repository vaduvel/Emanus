#!/usr/bin/env python3
"""Repara ghilimelele romanesti inchise cu " in interiorul stringurilor TS.

Bug: la scrierea lectiilor s-a folosit ghilimeaua de deschidere U+201E
dar cea de inchidere a fost scrisa ca " ASCII neescapat, care termina
stringul TypeScript. Rezultat: stringuri neterminate si erori in cascada.

Regula de corectie, deterministica:
  parcurgem fisierul caracter cu caracter, tinand minte daca suntem intr-un
  string; in interiorul unui string numaram ghilimelele de deschidere U+201E
  nefinalizate; cand intalnim un " ASCII si exista o deschidere nefinalizata,
  acel " este ghilimea de inchidere si devine U+201D; altfel este
  delimitatorul stringului si se lasa neatins.

Plase de siguranta:
  - ghilimelele deja corecte (U+201D sau escape \\u201d) scad contorul, ca sa nu
    fie inghitit delimitatorul real al stringului;
  - daca pe restul liniei nu mai exista nicio ghilimea ASCII, ghilimeaua curenta
    este tratata ca delimitator real (caz de deschidere fara inchidere);
  - comentariile (// si /* */) sunt sarite, ca textele din ele sa nu deregleze
    scanarea;
  - modulele TypeScript generate din corpusul Biblia Emanus sunt ignorate: ele
    reproduc byte-for-byte textul canonic publicat si nu sunt sursa editoriala
    pe care acest fixer are voie s-o rescrie.

Utilizare:
  python3 scripts/fix-quotes.py                 # repara tot packages/ si apps/
  python3 scripts/fix-quotes.py --check         # nu scrie nimic, doar raporteaza
  python3 scripts/fix-quotes.py cale/fisier.ts  # doar fisierele date
"""

import os
import sys

OPEN_Q = "\u201e"
CLOSE_Q = "\u201d"
GENERATED_EMANUS_RUNTIME = "/packages/shared/src/bible/generated/publishedEmanusOtText/"


def is_generated_emanus_runtime(path: str) -> bool:
    normalized = "/" + os.path.abspath(path).replace("\\", "/").lstrip("/")
    return GENERATED_EMANUS_RUNTIME in normalized


def fix_source(src: str):
    out = []
    i = 0
    n = len(src)
    fixes = []
    line = 1

    while i < n:
        ch = src[i]

        if ch == "\n":
            out.append(ch)
            line += 1
            i += 1
            continue

        # comentariu pe o linie
        if ch == "/" and i + 1 < n and src[i + 1] == "/":
            j = src.find("\n", i)
            j = n if j == -1 else j
            out.append(src[i:j])
            i = j
            continue

        # comentariu bloc
        if ch == "/" and i + 1 < n and src[i + 1] == "*":
            j = src.find("*/", i + 2)
            j = n if j == -1 else j + 2
            chunk = src[i:j]
            out.append(chunk)
            line += chunk.count("\n")
            i = j
            continue

        # string / template literal
        if ch in ('"', "'", "`"):
            delim = ch
            out.append(ch)
            i += 1
            pending = 0
            while i < n:
                c = src[i]
                if c == "\\":  # escape: caracterul urmator e literal
                    seq = src[i:i + 6].lower()
                    if seq == "\\u201d" and pending > 0:
                        pending -= 1
                    elif seq == "\\u201e":
                        pending += 1
                    out.append(src[i:i + 2])
                    i += 2
                    continue
                if c == "\n":
                    out.append(c)
                    line += 1
                    i += 1
                    if delim == "`":
                        continue
                    break
                if c == OPEN_Q:
                    pending += 1
                    out.append(c)
                    i += 1
                    continue
                if c == CLOSE_Q:
                    if pending > 0:
                        pending -= 1
                    out.append(c)
                    i += 1
                    continue
                if c == delim:
                    eol = src.find("\n", i + 1)
                    eol = n if eol == -1 else eol
                    rest = src[i + 1:eol]
                    if pending > 0 and '"' not in rest:
                        pending = 0
                    if pending > 0 and delim == '"':
                        out.append(CLOSE_Q)
                        fixes.append(line)
                        pending -= 1
                        i += 1
                        continue
                    out.append(c)
                    i += 1
                    break
                out.append(c)
                i += 1
            continue

        out.append(ch)
        i += 1

    return "".join(out), fixes


def walk(targets):
    for t in targets:
        if os.path.isfile(t):
            if not is_generated_emanus_runtime(t):
                yield t
            continue
        for root, dirs, files in os.walk(t):
            dirs[:] = [d for d in dirs if d not in ("node_modules", "dist", ".git")]
            for f in files:
                if f.endswith((".ts", ".tsx")):
                    path = os.path.join(root, f)
                    if is_generated_emanus_runtime(path):
                        continue
                    yield path


def main(argv):
    check = "--check" in argv
    args = [a for a in argv if not a.startswith("--")]
    targets = args or ["packages", "apps"]

    total = 0
    touched = 0
    for path in walk(targets):
        with open(path, encoding="utf-8") as fh:
            src = fh.read()
        if OPEN_Q not in src:
            continue
        fixed, fixes = fix_source(src)
        if not fixes:
            continue
        touched += 1
        total += len(fixes)
        lines = sorted(set(fixes))
        shown = ", ".join(str(x) for x in lines[:12])
        more = " ..." if len(lines) > 12 else ""
        print(f"{path}: {len(fixes)} ghilimele, linii {shown}{more}")
        if not check:
            with open(path, "w", encoding="utf-8") as fh:
                fh.write(fixed)

    verb = "de reparat" if check else "reparate"
    print(f"\nTotal: {total} ghilimele {verb} in {touched} fisiere.")
    return 1 if (check and total) else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
