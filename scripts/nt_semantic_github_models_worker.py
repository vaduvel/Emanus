#!/usr/bin/env python3
from __future__ import annotations

import importlib.util
import json
import os
import time
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BASE_WORKER = ROOT / "scripts/nt_semantic_copilot_worker.py"
MODEL = os.environ.get("NT_SEMANTIC_GITHUB_MODEL", "openai/gpt-4.1")
ENDPOINT = "https://models.github.ai/inference/chat/completions"
API_VERSION = "2026-03-10"

spec = importlib.util.spec_from_file_location("emanus_semantic_base", BASE_WORKER)
if spec is None or spec.loader is None:
    raise RuntimeError("Cannot load semantic base worker")
base = importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)
base.MODEL = f"github-models:{MODEL}"


def call_model(prompt: str, retries: int = 6) -> dict:
    token = os.environ.get("GITHUB_TOKEN")
    if not token:
        raise RuntimeError("GITHUB_TOKEN missing")
    payload = json.dumps(
        {
            "model": MODEL,
            "messages": [
                {
                    "role": "system",
                    "content": "You are a strict source-fidelity editorial reviewer. Follow the user's Romanian instructions exactly and return only valid JSON.",
                },
                {"role": "user", "content": prompt},
            ],
            "temperature": 0.1,
        },
        ensure_ascii=False,
    ).encode("utf-8")
    last = "unknown"
    for attempt in range(1, retries + 1):
        request = urllib.request.Request(
            ENDPOINT,
            data=payload,
            method="POST",
            headers={
                "Accept": "application/vnd.github+json",
                "Authorization": f"Bearer {token}",
                "X-GitHub-Api-Version": API_VERSION,
                "Content-Type": "application/json",
                "User-Agent": "Emanus-NT-Semantic-Review/1.0",
            },
        )
        try:
            with urllib.request.urlopen(request, timeout=base.TIMEOUT) as response:
                data = json.loads(response.read().decode("utf-8"))
            content = data.get("choices", [{}])[0].get("message", {}).get("content")
            if not isinstance(content, str) or not content.strip():
                raise RuntimeError(f"GitHub Models returned no message content: {data}")
            return base.extract_json(content)
        except urllib.error.HTTPError as exc:
            body = exc.read().decode("utf-8", errors="replace")
            last = f"HTTP {exc.code}: {body[-1800:]}"
            if exc.code not in (408, 409, 429, 500, 502, 503, 504):
                break
            retry_after = exc.headers.get("Retry-After")
            if retry_after and retry_after.isdigit():
                delay = min(60, int(retry_after))
            else:
                delay = min(60, 3 * attempt * attempt)
            time.sleep(delay)
        except Exception as exc:
            last = repr(exc)
            if attempt < retries:
                time.sleep(min(30, 2**attempt))
    raise RuntimeError(f"GitHub Models semantic review failed after {retries} attempts: {last}")


base.call_copilot = call_model

if __name__ == "__main__":
    raise SystemExit(base.main())
