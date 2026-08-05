#!/usr/bin/env python3
from __future__ import annotations

import json
import os
import urllib.request

payload = {
    "model": "openai/gpt-4.1",
    "temperature": 0,
    "max_tokens": 300,
    "messages": [
        {
            "role": "system",
            "content": "Ești traducător biblic român. Răspunde exclusiv JSON valid, fără markdown.",
        },
        {
            "role": "user",
            "content": (
                "Tradu independent în română naturală, cu diacritice, fără a copia o versiune românească. "
                "Autoritate greacă SBLGNT: ὁ γὰρ θεὸς οὕτως ἠγάπησεν τὸν κόσμον. "
                "Punte WEBU: For God so loved the world. "
                "Returnează {\"text\":\"...\",\"source_check\":\"approved\"}."
            ),
        },
    ],
}
request = urllib.request.Request(
    "https://models.github.ai/inference/chat/completions",
    data=json.dumps(payload).encode("utf-8"),
    headers={
        "Authorization": f"Bearer {os.environ['GITHUB_TOKEN']}",
        "Content-Type": "application/json",
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2026-03-10",
    },
    method="POST",
)
with urllib.request.urlopen(request, timeout=120) as response:
    body = json.load(response)
content = body["choices"][0]["message"]["content"]
print("MODEL_OK")
print(content)
