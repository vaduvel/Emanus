# Automation script to generate Exodus waves 2 to 8
import json
import urllib.request
import re
from pathlib import Path
from build_wave_installer import build_wave, DATA_DIR, EXO_VERSE_COUNTS, make_chapter

# Helper to fetch WEBU text
def get_webu_verses(ch):
    url = f"https://ebible.org/engwebp/EXO{ch:02d}.htm"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    html = urllib.request.urlopen(req).read().decode("utf-8")
    matches = re.findall(r"class=\"verse\"\s+id=\"V(\\d+)\">(\\d+)&#160;</span>(.*?)(?=<span class=\"verse\"|<div class=\"footnote\"|<ul class=\"tnav\"|$)", html, re.DOTALL)
    res = []
    for m in matches:
        text = re.sub(r"<a [^>]*>.*?</a>", "", m[2])
        text = re.sub(r"<[^>]+>", "", text)
        text = text.replace("&#160;", " ").replace("&nbsp;", " ").replace("\n", " ")
        text = " ".join(text.split())
        res.append((int(m[0]), text))
    return res

print("Helper ready")
