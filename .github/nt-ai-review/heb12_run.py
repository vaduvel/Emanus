#!/usr/bin/env python3
from pathlib import Path

path=Path('.github/nt-ai-review/heb12.py')
source=path.read_text()
old="11:'πᾶσα δὲ παιδεία'"
new="11:'παιδεία πρὸς μὲν'"
assert old in source
source=source.replace(old,new,1)
exec(compile(source,str(path),'exec'),{'__name__':'__main__','__file__':str(path)})
