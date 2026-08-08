#!/usr/bin/env python3
"""Execute a publication script with audited Hugging Face revisions and retries.

The publication matrix starts many shards concurrently. Querying the Hub API
for the same model SHA from every shard can trigger a 429 before any corpus
work begins. This runner returns the exact revisions recorded by prior green
artifacts and retries only transient idempotent Hugging Face HTTP requests.
It does not change translation, audit, threshold, or publication logic.
"""
from __future__ import annotations

import os
import runpy
import sys
import time
from types import SimpleNamespace
from typing import Any

import requests
from huggingface_hub import HfApi

MODEL_REVISIONS = {
    "Helsinki-NLP/opus-mt-tc-big-en-ro": "3853a10c485323cbcd870553e846071052c0c070",
    "Helsinki-NLP/opus-mt-en-ro": "96e8fea9e44dae942c2e8a9078dc1615dd871ed9",
    "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2": "e8f8c211226b894fcb81acc59f3b34ba3efd5f42",
    "facebook/nllb-200-distilled-600M": "f8d333a098d19b4fd9a8b18f94170487ad3f821d",
    "sentence-transformers/LaBSE": "836121a0533e5664b21c7aacc5d22951f2b8b25b",
}
RETRYABLE_STATUS = {429, 500, 502, 503, 504}
MAX_ATTEMPTS = 6


def install_model_info_pins() -> None:
    original = HfApi.model_info

    def model_info(self: HfApi, repo_id: str, *args: Any, **kwargs: Any) -> Any:
        pinned = MODEL_REVISIONS.get(str(repo_id))
        requested_revision = kwargs.get("revision")
        if pinned is not None and requested_revision in {None, "main"}:
            return SimpleNamespace(sha=pinned)
        return original(self, repo_id, *args, **kwargs)

    HfApi.model_info = model_info  # type: ignore[method-assign]


def install_hub_http_retries() -> None:
    original = requests.sessions.Session.request

    def request(
        self: requests.Session,
        method: str,
        url: str,
        *args: Any,
        **kwargs: Any,
    ) -> requests.Response:
        method_upper = str(method).upper()
        is_hub = "huggingface.co" in str(url)
        if not is_hub or method_upper not in {"GET", "HEAD"}:
            return original(self, method, url, *args, **kwargs)

        for attempt in range(MAX_ATTEMPTS):
            try:
                response = original(self, method, url, *args, **kwargs)
            except (requests.ConnectionError, requests.Timeout) as error:
                if attempt == MAX_ATTEMPTS - 1:
                    raise
                delay = min(60, 5 * (2**attempt))
                print(
                    f"Transient Hugging Face connection failure; retrying in {delay}s: {error}",
                    file=sys.stderr,
                )
                time.sleep(delay)
                continue

            if response.status_code not in RETRYABLE_STATUS or attempt == MAX_ATTEMPTS - 1:
                return response
            retry_after = response.headers.get("Retry-After")
            try:
                delay = int(retry_after) if retry_after else min(60, 5 * (2**attempt))
            except ValueError:
                delay = min(60, 5 * (2**attempt))
            response.close()
            print(
                f"Transient Hugging Face HTTP {response.status_code}; retrying in {delay}s: {url}",
                file=sys.stderr,
            )
            time.sleep(delay)

        raise AssertionError("unreachable")

    requests.sessions.Session.request = request  # type: ignore[method-assign]


def main() -> None:
    if len(sys.argv) < 2:
        raise SystemExit("Usage: run-with-pinned-hf.py SCRIPT [SCRIPT_ARGS ...]")
    target = sys.argv[1]
    os.environ.setdefault("HF_HUB_DISABLE_TELEMETRY", "1")
    install_model_info_pins()
    install_hub_http_retries()
    sys.argv = sys.argv[1:]
    runpy.run_path(target, run_name="__main__")


if __name__ == "__main__":
    main()
