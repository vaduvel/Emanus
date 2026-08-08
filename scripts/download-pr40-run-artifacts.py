#!/usr/bin/env python3
"""Download GitHub Actions artifacts without leaking GitHub auth across redirects."""
from __future__ import annotations

import argparse
import json
import os
import shutil
import urllib.error
import urllib.request
import zipfile
from pathlib import Path
from typing import Any

REDIRECT_CODES = {301, 302, 303, 307, 308}


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(
        self,
        req: urllib.request.Request,
        fp: Any,
        code: int,
        msg: str,
        headers: Any,
        newurl: str,
    ) -> None:
        return None


def api_json(url: str, token: str) -> dict[str, Any]:
    request = urllib.request.Request(
        url,
        headers={
            "Authorization": f"Bearer {token}",
            "Accept": "application/vnd.github+json",
            "User-Agent": "emanus-pr40-artifact-downloader",
            "X-GitHub-Api-Version": "2022-11-28",
        },
    )
    with urllib.request.urlopen(request, timeout=60) as response:
        return json.load(response)


def signed_download_url(api_url: str, token: str) -> str:
    request = urllib.request.Request(
        api_url,
        headers={
            "Authorization": f"Bearer {token}",
            "Accept": "application/vnd.github+json",
            "User-Agent": "emanus-pr40-artifact-downloader",
            "X-GitHub-Api-Version": "2022-11-28",
        },
    )
    opener = urllib.request.build_opener(NoRedirect())
    try:
        with opener.open(request, timeout=60):
            raise RuntimeError("Artifact endpoint unexpectedly returned bytes without a redirect")
    except urllib.error.HTTPError as error:
        if error.code not in REDIRECT_CODES:
            raise
        location = error.headers.get("Location")
        if not location:
            raise RuntimeError("Artifact redirect omitted the signed Location header") from error
        return location


def download_file(url: str, destination: Path) -> None:
    # The Azure/S3 signed URL authenticates itself. Never forward the GitHub token.
    request = urllib.request.Request(
        url,
        headers={"User-Agent": "emanus-pr40-artifact-downloader"},
    )
    with urllib.request.urlopen(request, timeout=300) as response, destination.open("wb") as output:
        shutil.copyfileobj(response, output, length=1024 * 1024)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--run-id", required=True)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--prefix", default="pr40-")
    parser.add_argument("--require", action="append", default=[])
    args = parser.parse_args()

    token = os.environ.get("GH_TOKEN") or os.environ.get("GITHUB_TOKEN")
    if not token:
        raise SystemExit("GH_TOKEN or GITHUB_TOKEN is required")
    repository = os.environ.get("GITHUB_REPOSITORY")
    if not repository:
        raise SystemExit("GITHUB_REPOSITORY is required")

    listing = api_json(
        f"https://api.github.com/repos/{repository}/actions/runs/{args.run_id}/artifacts?per_page=100",
        token,
    )
    artifacts = list(listing.get("artifacts") or [])
    selected = [
        artifact
        for artifact in artifacts
        if not artifact.get("expired") and str(artifact.get("name", "")).startswith(args.prefix)
    ]
    if not selected:
        raise SystemExit(f"No active artifacts beginning with {args.prefix!r} in run {args.run_id}")

    args.output.mkdir(parents=True, exist_ok=True)
    downloaded: list[str] = []
    for artifact in selected:
        name = str(artifact["name"])
        destination = args.output / name
        archive = args.output / f"{name}.zip"
        if destination.exists():
            shutil.rmtree(destination)
        destination.mkdir(parents=True)
        signed_url = signed_download_url(str(artifact["archive_download_url"]), token)
        download_file(signed_url, archive)
        with zipfile.ZipFile(archive) as bundle:
            bundle.extractall(destination)
        archive.unlink()
        downloaded.append(name)
        print(f"Downloaded {name}")

    missing = sorted(set(args.require).difference(downloaded))
    if missing:
        raise SystemExit(f"Missing required checkpoints: {missing}")
    print(json.dumps({"runId": args.run_id, "downloaded": downloaded}, indent=2))


if __name__ == "__main__":
    main()
