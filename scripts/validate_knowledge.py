#!/usr/bin/env python3
"""Validate the Tretnix knowledge repository without external dependencies."""

from __future__ import annotations

import hashlib
import json
import re
import subprocess
import sys
from pathlib import Path
from urllib.parse import unquote

ROOT = Path(__file__).resolve().parents[1]
REQUIRED_PATHS = [
    "README.md",
    "AGENTS.md",
    "TRETNIX_MASTER_CONTEXT.md",
    "DEVELOPMENT_STANDARDS.md",
    "DECISIONS.md",
    "REPOSITORY_INDEX.md",
    "CURRENT_STATE.md",
    "SOURCE_ARTIFACT_REGISTER.md",
    "templates/READ_ONLY_AUDIT.md",
    "compiled/README.md",
]
CANONICAL_METADATA_FILES = [
    "README.md",
    "TRETNIX_MASTER_CONTEXT.md",
    "DEVELOPMENT_STANDARDS.md",
    "DECISIONS.md",
    "REPOSITORY_INDEX.md",
    "HOSPITALITY_FAMILY.md",
    "BEAUTY_WELLNESS_FAMILY.md",
    "PROFESSIONAL_SERVICES_FAMILY.md",
    "HOME_LOCAL_SERVICES_FAMILY.md",
    "PORTFOLIO_AND_VERTICALS.md",
    "CURRENT_STATE.md",
    "CHAT_RETENTION_AND_HANDOFF.md",
    "SOURCE_ARTIFACT_REGISTER.md",
]
LOCAL_LINK_RE = re.compile(r"(?<!!)\[[^\]]*\]\(([^)]+)\)")
DECISION_RE = re.compile(r"^## TRX-DEC-(\d{3})\b", re.MULTILINE)
SENSITIVE_SUFFIXES = {".pem", ".key", ".p12", ".pfx"}
SENSITIVE_NAMES = {".env", ".env.local", ".env.production", ".env.development"}


def fail(errors: list[str], message: str) -> None:
    errors.append(message)


def normalized_manifest_bytes(path: Path) -> bytes:
    """Return bytes in the LF form used by the imported source manifests."""
    return path.read_bytes().replace(b"\r\n", b"\n")


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def tracked_files() -> list[Path]:
    try:
        result = subprocess.run(
            ["git", "ls-files", "-z"],
            cwd=ROOT,
            check=True,
            capture_output=True,
        )
    except (OSError, subprocess.CalledProcessError):
        return [path.relative_to(ROOT) for path in ROOT.rglob("*") if path.is_file()]
    return [Path(item.decode("utf-8")) for item in result.stdout.split(b"\0") if item]


def validate_required_paths(errors: list[str]) -> None:
    for relative in REQUIRED_PATHS:
        if not (ROOT / relative).exists():
            fail(errors, f"missing required path: {relative}")


def validate_utf8_and_metadata(errors: list[str]) -> None:
    for path in ROOT.rglob("*.md"):
        try:
            path.read_text(encoding="utf-8")
        except UnicodeDecodeError as exc:
            fail(errors, f"invalid UTF-8: {path.relative_to(ROOT)} ({exc})")

    for relative in CANONICAL_METADATA_FILES:
        path = ROOT / relative
        if not path.is_file():
            continue
        text = path.read_text(encoding="utf-8")
        if "**Versione:**" not in text:
            fail(errors, f"missing Versione metadata: {relative}")
        if "**Aggiornato:**" not in text:
            fail(errors, f"missing Aggiornato metadata: {relative}")


def validate_local_links(errors: list[str]) -> None:
    for path in ROOT.rglob("*.md"):
        text = path.read_text(encoding="utf-8")
        for match in LOCAL_LINK_RE.finditer(text):
            raw_target = match.group(1).strip()
            if raw_target.startswith("<") and raw_target.endswith(">"):
                raw_target = raw_target[1:-1]
            if not raw_target or raw_target.startswith(("#", "http://", "https://", "mailto:", "tel:")):
                continue
            clean_target = unquote(raw_target.split("#", 1)[0].split("?", 1)[0])
            if not clean_target:
                continue
            target = (path.parent / clean_target).resolve()
            try:
                target.relative_to(ROOT.resolve())
            except ValueError:
                fail(errors, f"local link escapes repository: {path.relative_to(ROOT)} -> {raw_target}")
                continue
            if not target.exists():
                fail(errors, f"broken local link: {path.relative_to(ROOT)} -> {raw_target}")


def validate_json(errors: list[str]) -> None:
    for path in ROOT.rglob("*.json"):
        try:
            json.loads(path.read_text(encoding="utf-8"))
        except (UnicodeDecodeError, json.JSONDecodeError) as exc:
            fail(errors, f"invalid JSON: {path.relative_to(ROOT)} ({exc})")


def validate_decisions(errors: list[str]) -> None:
    path = ROOT / "DECISIONS.md"
    if not path.is_file():
        return
    ids = [int(value) for value in DECISION_RE.findall(path.read_text(encoding="utf-8"))]
    if not ids:
        fail(errors, "no TRX-DEC identifiers found")
        return
    if len(ids) != len(set(ids)):
        fail(errors, "duplicate TRX-DEC identifier")
    if ids != sorted(ids):
        fail(errors, "TRX-DEC identifiers are not ordered")
    expected = list(range(1, max(ids) + 1))
    if ids != expected:
        missing = sorted(set(expected) - set(ids))
        fail(errors, f"TRX-DEC sequence has gaps: {missing}")


def validate_family_manifests(errors: list[str]) -> None:
    for manifest_path in sorted((ROOT / "family-kits").glob("*/MANIFEST.json")):
        try:
            manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
        except (UnicodeDecodeError, json.JSONDecodeError):
            continue
        base = manifest_path.parent
        entries = manifest.get("files")
        if not isinstance(entries, list):
            fail(errors, f"manifest files is not a list: {manifest_path.relative_to(ROOT)}")
            continue
        seen: set[str] = set()
        for entry in entries:
            if not isinstance(entry, dict):
                fail(errors, f"invalid manifest entry: {manifest_path.relative_to(ROOT)}")
                continue
            relative = entry.get("path")
            expected_size = entry.get("size", entry.get("size_bytes"))
            expected_hash = entry.get("sha256")
            if not isinstance(relative, str) or not relative:
                fail(errors, f"manifest entry without path: {manifest_path.relative_to(ROOT)}")
                continue
            if relative in seen:
                fail(errors, f"duplicate manifest path: {manifest_path.relative_to(ROOT)} -> {relative}")
            seen.add(relative)
            target = base / relative
            if not target.is_file():
                fail(errors, f"manifest file missing: {target.relative_to(ROOT)}")
                continue
            normalized = normalized_manifest_bytes(target)
            if expected_size is not None and len(normalized) != expected_size:
                fail(errors, f"manifest normalized size mismatch: {target.relative_to(ROOT)}")
            if isinstance(expected_hash, str) and sha256_bytes(normalized) != expected_hash.lower():
                fail(errors, f"manifest normalized SHA-256 mismatch: {target.relative_to(ROOT)}")


def validate_sensitive_tracked_files(errors: list[str]) -> None:
    for relative in tracked_files():
        name = relative.name.lower()
        if name in SENSITIVE_NAMES or relative.suffix.lower() in SENSITIVE_SUFFIXES:
            fail(errors, f"sensitive file is tracked: {relative.as_posix()}")
        if "(2)" in relative.name:
            fail(errors, f"historical duplicate suffix is tracked outside canonical naming: {relative.as_posix()}")


def main() -> int:
    errors: list[str] = []
    validate_required_paths(errors)
    validate_utf8_and_metadata(errors)
    validate_local_links(errors)
    validate_json(errors)
    validate_decisions(errors)
    validate_family_manifests(errors)
    validate_sensitive_tracked_files(errors)

    if errors:
        print("Tretnix knowledge validation: FAILED", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        return 1

    markdown_count = sum(1 for _ in ROOT.rglob("*.md"))
    json_count = sum(1 for _ in ROOT.rglob("*.json"))
    print("Tretnix knowledge validation: PASSED")
    print(f"Markdown files checked: {markdown_count}")
    print(f"JSON files checked: {json_count}")
    print("Decision sequence, local links, LF-normalized family manifests and tracked sensitive filenames: valid")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
