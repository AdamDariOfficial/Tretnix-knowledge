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
    "UX_UI_QUALITY_SYSTEM.md",
    "DECISIONS.md",
    "REPOSITORY_INDEX.md",
    "HOSPITALITY_FAMILY.md",
    "BEAUTY_WELLNESS_FAMILY.md",
    "PROFESSIONAL_SERVICES_FAMILY.md",
    "HOME_LOCAL_SERVICES_FAMILY.md",
    "PORTFOLIO_AND_VERTICALS.md",
    "CASE_STUDY_STANDARD.md",
    "CURRENT_STATE.md",
    "CHAT_RETENTION_AND_HANDOFF.md",
    "SOURCE_ARTIFACT_REGISTER.md",
    "DEVELOPMENT_OS.md",
    "BACKUP_AND_DISASTER_RECOVERY.md",
    "tretnix.project.json",
    "templates/READ_ONLY_AUDIT.md",
    "templates/CONTROLLED_CHANGE_PACKAGE_MANIFEST.md",
    "skills/CONTROLLED_CHANGE_PACKAGE.md",
    "compiled/README.md",
    "compiled/CHATGPT_PROJECT_INSTRUCTIONS.md",
    "compiled/CHATGPT_PROJECT_INSTRUCTIONS_COMPACT.md",
    "compiled/CHATGPT_KNOWLEDGE_ROUTER.md",
    "compiled/CHATGPT_WORKSTREAM_PLAYBOOK.md",
    "compiled/CODEX_GLOBAL_AGENTS.md",
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
PUBLIC_ENVIRONMENT_TEMPLATES = {".env.example", ".env.sample", ".env.template"}
TEXT_EXTENSIONS = {
    ".md", ".json", ".py", ".ps1", ".psm1", ".yml", ".yaml",
    ".txt", ".toml", ".ini", ".cfg", ".csv", ".ts", ".tsx",
    ".js", ".jsx", ".css", ".scss", ".html", ".xml",
}
TEXT_NAMES = {".gitignore", ".gitattributes", ".editorconfig"}

AUTHORITY_REQUIRED_MARKERS = {
    "TRETNIX_MASTER_CONTEXT.md": [
        "CURRENT_STATE.md\n= snapshot trasversale datato",
        "REPOSITORY_INDEX.md\n= inventario",
        "non registra baseline operative correnti",
    ],
    "CURRENT_STATE.md": [
        "non viene hardcodedato nello snapshot",
        "snapshot trasversale datato",
    ],
    "REPOSITORY_INDEX.md": [
        "non hardcodea il proprio `main`",
        "Non è il registro live",
    ],
    "PORTFOLIO_AND_VERTICALS.md": [
        "TRX-DEC-041",
        "Lovable non è un prerequisito generale",
    ],
    "PROFESSIONAL_SERVICES_FAMILY.md": [
        "provenance storica",
        "IMPLEMENTATION_AUTHORIZED",
    ],
    "HOME_LOCAL_SERVICES_FAMILY.md": [
        "provenance storica",
        "IMPLEMENTATION_AUTHORIZED",
    ],
    ".github/workflows/knowledge-validation.yml": [
        "actions/setup-node@v4",
        "node --test tools/tretnix/tests/tretnix.test.mjs",
    ],
}

AUTHORITY_FORBIDDEN_MARKERS = {
    "CURRENT_STATE.md": [
        "Baseline `main` corrente verificata",
        "Tretnix-knowledge main@",
    ],
    "REPOSITORY_INDEX.md": [
        "Baseline `main` verificata corrente",
        "Tretnix-knowledge main@",
    ],
    "TRETNIX_MASTER_CONTEXT.md": ["futuro Forno Lume BUSINESS PLUS"],
    "PORTFOLIO_AND_VERTICALS.md": ["abbonamenti necessari attivi;"],
    "PROFESSIONAL_SERVICES_FAMILY.md": ["L'avvio richiede abbonamenti attivi"],
    "HOME_LOCAL_SERVICES_FAMILY.md": ["L'avvio richiede abbonamenti attivi"],
    "family-kits/professional-services-v1.0/README.md": [
        "implementazione bloccata fino all'attivazione degli abbonamenti"
    ],
    "family-kits/home-local-services-v1.0/README.md": [
        "implementazione bloccata fino all'attivazione degli abbonamenti"
    ],
}

ADAPTER_REQUIRED_MARKERS = {
    "compiled/README.md": [
        "CHATGPT_KNOWLEDGE_ROUTER.md",
        "CHATGPT_WORKSTREAM_PLAYBOOK.md",
    ],
    "compiled/CHATGPT_PROJECT_INSTRUCTIONS.md": [
        "UNSUPPORTED_IN_CURRENT_SESSION",
        "compiled/CHATGPT_KNOWLEDGE_ROUTER.md",
        "compiled/CHATGPT_WORKSTREAM_PLAYBOOK.md",
    ],
    "compiled/CHATGPT_PROJECT_INSTRUCTIONS_COMPACT.md": [
        "UNSUPPORTED_IN_CURRENT_SESSION",
        "compiled/CHATGPT_KNOWLEDGE_ROUTER.md",
        "compiled/CHATGPT_WORKSTREAM_PLAYBOOK.md",
    ],
    "compiled/CHATGPT_KNOWLEDGE_ROUTER.md": [
        "## Ambiguit",
        "## Regola di sufficienza",
        "non diventano istruzioni correnti",
    ],
    "compiled/CHATGPT_WORKSTREAM_PLAYBOOK.md": [
        "UNSUPPORTED_IN_CURRENT_SESSION",
        "## 11. Capability check",
        "## 12. Regola anti-loop",
    ],
    "compiled/CODEX_GLOBAL_AGENTS.md": [
        "historical START activation gates",
        "PREPARATION_COMPLETE",
    ],
}

ADAPTER_FORBIDDEN_MARKERS = {
    "compiled/CHATGPT_KNOWLEDGE_ROUTER.md": [
        "CURRENT / BASELINE / HISTORICAL / DERIVED",
        "## Lifecycle taxonomy",
        "## Tassonomia lifecycle",
    ],
}

def fail(errors: list[str], message: str) -> None:
    errors.append(message)


def normalized_manifest_bytes(path: Path) -> bytes:
    """Return bytes in the LF form used by the imported source manifests."""
    return path.read_bytes().replace(b"\r\n", b"\n")


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def repository_source_files(pattern: str):
    """Yield source files while excluding Git internals and derived Development OS runtime."""
    for path in ROOT.rglob(pattern):
        relative = path.relative_to(ROOT)
        if path.is_file() and relative.parts[0] not in {".git", ".tretnix"}:
            yield path


def tracked_files() -> list[Path]:
    try:
        result = subprocess.run(
            ["git", "ls-files", "-z"],
            cwd=ROOT,
            check=True,
            capture_output=True,
        )
    except (OSError, subprocess.CalledProcessError):
        return [path.relative_to(ROOT) for path in repository_source_files("*")]
    return [Path(item.decode("utf-8")) for item in result.stdout.split(b"\0") if item]


def validate_required_paths(errors: list[str]) -> None:
    for relative in REQUIRED_PATHS:
        if not (ROOT / relative).exists():
            fail(errors, f"missing required path: {relative}")


def validate_utf8_and_metadata(errors: list[str]) -> None:
    for path in repository_source_files("*.md"):
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
    for path in repository_source_files("*.md"):
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
    for path in repository_source_files("*.json"):
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
        sensitive_environment = name == ".env" or (name.startswith(".env.") and name not in PUBLIC_ENVIRONMENT_TEMPLATES)
        if sensitive_environment or relative.suffix.lower() in SENSITIVE_SUFFIXES:
            fail(errors, f"sensitive file is tracked: {relative.as_posix()}")
        if "(2)" in relative.name:
            fail(errors, f"historical duplicate suffix is tracked outside canonical naming: {relative.as_posix()}")



def validate_git_whitespace(errors: list[str]) -> None:
    for arguments, label in (
        (["git", "-c", "core.whitespace=cr-at-eol", "diff", "--check"], "git diff --check"),
        (["git", "-c", "core.whitespace=cr-at-eol", "diff", "--cached", "--check"], "git diff --cached --check"),
    ):
        try:
            result = subprocess.run(arguments, cwd=ROOT, capture_output=True, text=True)
        except OSError as exc:
            fail(errors, f"{label} unavailable: {exc}")
            continue
        if result.returncode != 0:
            detail = (result.stdout + result.stderr).strip().replace("\n", " | ")
            fail(errors, f"{label} failed: {detail}")


def validate_untracked_text_whitespace(errors: list[str]) -> None:
    try:
        result = subprocess.run(
            ["git", "ls-files", "--others", "--exclude-standard", "-z"],
            cwd=ROOT,
            check=True,
            capture_output=True,
        )
    except (OSError, subprocess.CalledProcessError) as exc:
        fail(errors, f"unable to enumerate untracked files: {exc}")
        return

    for raw in result.stdout.split(b"\0"):
        if not raw:
            continue
        relative = Path(raw.decode("utf-8"))
        path = ROOT / relative
        if not path.is_file():
            continue
        if path.suffix.lower() not in TEXT_EXTENSIONS and path.name.lower() not in TEXT_NAMES:
            continue
        try:
            lines = path.read_text(encoding="utf-8").splitlines()
        except UnicodeDecodeError as exc:
            fail(errors, f"invalid UTF-8 in untracked text file: {relative} ({exc})")
            continue
        for line_number, line in enumerate(lines, start=1):
            if line.endswith((" ", "\t")):
                fail(errors, f"trailing whitespace in untracked file: {relative}:{line_number}")


def validate_marker_contracts(errors: list[str]) -> None:
    for relative, markers in {**AUTHORITY_REQUIRED_MARKERS, **ADAPTER_REQUIRED_MARKERS}.items():
        path = ROOT / relative
        if not path.is_file():
            continue
        text = path.read_text(encoding="utf-8")
        for marker in markers:
            if marker not in text:
                fail(errors, f"missing semantic contract marker: {relative} -> {marker}")

    for relative, markers in {**AUTHORITY_FORBIDDEN_MARKERS, **ADAPTER_FORBIDDEN_MARKERS}.items():
        path = ROOT / relative
        if not path.is_file():
            continue
        text = path.read_text(encoding="utf-8")
        for marker in markers:
            if marker in text:
                fail(errors, f"forbidden stale/drift marker: {relative} -> {marker}")


def _reviewed_script_entries(value):
    if not isinstance(value, dict):
        return []
    if "path" in value:
        return [value]
    entries = []
    for key in ("win32", "default"):
        entry = value.get(key)
        if isinstance(entry, dict):
            entries.append(entry)
    return entries


def validate_reviewed_script_hashes(errors: list[str]) -> None:
    manifest_path = ROOT / "tretnix.project.json"
    if not manifest_path.is_file():
        return
    try:
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    except (UnicodeDecodeError, json.JSONDecodeError):
        return

    validators = manifest.get("validation", {}).get("validators", [])
    if not isinstance(validators, list):
        fail(errors, "tretnix.project.json validation.validators is not a list")
        return

    root_real = ROOT.resolve()
    for validator in validators:
        if not isinstance(validator, dict):
            continue
        validator_id = validator.get("id", "<unknown>")
        for entry in _reviewed_script_entries(validator.get("reviewed_script")):
            relative = entry.get("path")
            expected = entry.get("sha256")
            if not isinstance(relative, str) or not isinstance(expected, str):
                fail(errors, f"invalid reviewed_script declaration: {validator_id}")
                continue
            target = (ROOT / relative).resolve()
            try:
                target.relative_to(root_real)
            except ValueError:
                fail(errors, f"reviewed_script escapes repository: {validator_id} -> {relative}")
                continue
            if not target.is_file():
                fail(errors, f"reviewed_script file missing: {validator_id} -> {relative}")
                continue
            actual = sha256_bytes(normalized_manifest_bytes(target))
            if actual != expected.lower():
                fail(errors, f"reviewed_script SHA-256 mismatch: {validator_id} -> {relative}")

def main() -> int:
    errors: list[str] = []
    validate_required_paths(errors)
    validate_utf8_and_metadata(errors)
    validate_local_links(errors)
    validate_json(errors)
    validate_decisions(errors)
    validate_family_manifests(errors)
    validate_marker_contracts(errors)
    validate_reviewed_script_hashes(errors)
    validate_sensitive_tracked_files(errors)
    validate_git_whitespace(errors)
    validate_untracked_text_whitespace(errors)

    if errors:
        print("Tretnix knowledge validation: FAILED", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        return 1

    markdown_count = sum(1 for _ in repository_source_files("*.md"))
    json_count = sum(1 for _ in repository_source_files("*.json"))
    print("Tretnix knowledge validation: PASSED")
    print(f"Markdown files checked: {markdown_count}")
    print(f"JSON files checked: {json_count}")
    print("Decision sequence, local links, family manifests, authority/adapter contracts, reviewed-script hashes and whitespace: valid")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
