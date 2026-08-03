#!/usr/bin/env python3
from __future__ import annotations
import json,re
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]; BIBLE=ROOT/"packages"/"shared"/"src"/"bible"; DATA=ROOT/"docs"/"data"
EXPECTED={1: [[1, 9], [10, 17], [18, 25], [26, 31]], 2: [[1, 5], [6, 10], [11, 16]], 3: [[1, 9], [10, 17], [18, 23]], 4: [[1, 5], [6, 13], [14, 21]], 5: [[1, 8], [9, 13]], 6: [[1, 8], [9, 11], [12, 20]], 7: [[1, 9], [10, 16], [17, 24], [25, 40]], 8: [[1, 6], [7, 13]], 9: [[1, 12], [13, 18], [19, 23], [24, 27]], 10: [[1, 5], [6, 13], [14, 22], [23, 33]], 11: [[1, 16], [17, 22], [23, 34]], 12: [[1, 11], [12, 21], [22, 31]], 13: [[1, 3], [4, 7], [8, 13]], 14: [[1, 12], [13, 25], [26, 33], [34, 40]], 15: [[1, 11], [12, 19], [20, 28], [29, 34], [35, 49], [50, 58]], 16: [[1, 4], [5, 12], [13, 24]]}
def err(m): print("::error title=Poarta 1 Corinteni::"+m.replace("%","%25").replace("\n","%0A"))
def main():
 e=[]; idx=(BIBLE/"index.ts").read_text(encoding="utf8"); pub=(BIBLE/"unuCorinteniPublication.ts").read_text(encoding="utf8"); src=(BIBLE/"unuCorinteniSource.ts").read_text(encoding="utf8"); helper=(BIBLE/"unuCorinteniHelpers.ts").read_text(encoding="utf8"); texts=[]; total=0
 for n in range(1,17):
  p=BIBLE/("unuCorinteni.ts" if n==1 else f"unuCorinteni{n}.ts")
  if not p.exists(): e.append(f"1 Corinteni {n}: fișier lipsă"); continue
  t=p.read_text(encoding="utf8"); texts.append(t); found=[(int(a),int(b)) for a,b in re.findall(r"verses:\s*\[(\d+),\s*(\d+)\]",t)]; total+=len(found)
  if found!=[tuple(x) for x in EXPECTED[n]]: e.append(f"1 Corinteni {n}: intervale {found}")
  if not re.search(rf"(?:export )?const UNU_CORINTENI_{n} = unuCorinteniChapter",t): e.append(f"1 Corinteni {n}: declarație lipsă")
 statuses={int(n):s for n,s in re.findall(r'^\s*(\d+):\s*"(draft|in_review|published)",',pub,re.M)}
 if sorted(statuses)!=list(range(1,17)) or any(v!="in_review" for v in statuses.values()): e.append("Toate capitolele trebuie să fie in_review")
 cfg=json.loads((DATA/"1-corinteni-rccv-import.json").read_text(encoding="utf8")); man=json.loads((DATA/"1-corinteni-poonen-source.json").read_text(encoding="utf8"))
 if cfg.get("bookId")!="1CO" or sum(cfg.get("verseCounts",[]))!=437: e.append("Configurația RCCV este greșită")
 if len(man.get("episodes",[]))!=16: e.append("Manifestul trebuie să aibă 16 episoade")
 if cfg.get("sourceSha256") not in src or "https://www.cfcindia.com/verse-by-verse/1-Corinthians" not in src: e.append("Metadata sursei este incompletă")
 if "status: unuCorinteniStatus(input.number)" not in helper: e.append("Starea nu vine din registru")
 if 'import { UNU_CORINTENI } from "./unuCorinteni.js"' not in idx or not re.search(r"BIBLE_BOOKS:\s*BibleBook\[\]\s*=\s*\[[^\]]*\bUNU_CORINTENI\b",idx): e.append("1 Corinteni nu este conectat în catalog")
 book=(BIBLE/"unuCorinteni.ts").read_text(encoding="utf8"); m=re.search(r"export const UNU_CORINTENI: BibleBook = \{.*?chapters:\s*\[(.*?)\]\s*,?\n\}",book,re.S); assembled=[int(x) for x in re.findall(r"\bUNU_CORINTENI_(\d+)\b",m.group(1))] if m else []
 if assembled!=list(range(1,17)): e.append(f"Ordinea capitolelor este {assembled}")
 package=(ROOT/"packages"/"shared"/"package.json").read_text(encoding="utf8")
 if "1-corinteni-rccv-import.json" not in package: e.append("RCCV 1 Corinteni nu este materializat")
 if (ROOT/".github"/"workflows"/"research-1-corinteni.yml").exists(): e.append("Workflow-ul temporar trebuie eliminat")
 low="\n".join(texts).lower(); guards=["nu obligă o victimă să rămână în abuz","nu justifică oprirea tratamentului medical","nu autorizează controlul, degradarea sau abuzul","nu autorizează reducerea la tăcere a unei victime"]
 for g in guards:
  if g not in low: e.append("Lipsește protecția editorială: "+g)
 print(f"Poarta 1 Corinteni: 16 capitole, {total} unități, 437 versete RCCV și 16 episoade CFC.")
 if total!=54: e.append(f"Total unități neașteptat: {total}")
 if e:
  [print("- "+x) or err(x) for x in e]; return 1
 print("Verificarea structurală și editorială 1 Corinteni a trecut."); return 0
if __name__=="__main__": raise SystemExit(main())
