import { createHash } from "node:crypto";
import { lstat, mkdir, readFile, realpath, rename, rm, stat, writeFile } from "node:fs/promises";
import { readFileSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

export const PROJECT_SCHEMA_VERSION = 1;
export const TASK_SCHEMA_VERSION = 1;
export const EVIDENCE_SCHEMA_VERSION = 1;
export const RESOLVER_VERSION = "1.2.1";
export const FINGERPRINT_CONTRACT_VERSION = "1.2.1";
export const VALIDATION_CACHE_CONTRACT_VERSION = "1.2.0";
export const TASK_CLASSES = ["docs_only", "frontend", "backend", "security_or_data", "release_or_infra"];
export const REQUIRED_FORBIDDEN_ACTIONS = [
  "stage", "commit", "push", "pull_request", "merge", "deploy", "publish", "migration", "dns",
  "infrastructure_mutation", "provisioning", "secret_mutation", "production_write",
];

const CLASS_CAPABILITY_FLOORS = {
  docs_only: ["static", "whitespace"],
  frontend: ["typecheck", "lint", "test", "build"],
  backend: ["typecheck", "lint", "test", "security"],
  security_or_data: ["static", "test", "security", "whitespace"],
  release_or_infra: ["static", "test", "config", "whitespace"],
};

export class TretnixError extends Error {
  constructor(code, message, details = {}) {
    super(message);
    this.name = "TretnixError";
    this.code = code;
    this.details = details;
  }
}

export function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

export function stableValue(value) {
  if (Array.isArray(value)) return value.map(stableValue);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((key) => [key, stableValue(value[key])]),
    );
  }
  return value;
}

export function stableJson(value, space = 2) {
  return `${JSON.stringify(stableValue(value), null, space)}\n`;
}

export function toPosix(value) {
  return value.replaceAll(path.sep, "/");
}

export function relativePosix(base, target) {
  return toPosix(path.relative(base, target));
}

export function isSafeRelativePath(candidate) {
  if (typeof candidate !== "string" || candidate.trim() === "" || candidate.includes("\0")) return false;
  if (path.isAbsolute(candidate) || path.win32.isAbsolute(candidate) || path.posix.isAbsolute(candidate)) return false;
  return !candidate.replaceAll("\\", "/").split("/").some((segment) => segment === "..");
}

export function resolveInside(base, candidate, label = "path") {
  if (!isSafeRelativePath(candidate)) {
    throw new TretnixError("UNSAFE_PATH", `${label} must be a safe relative path: ${candidate}`);
  }
  const root = path.resolve(base);
  const resolved = path.resolve(root, candidate);
  const relative = path.relative(root, resolved);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new TretnixError("UNSAFE_PATH", `${label} escapes the declared root: ${candidate}`);
  }
  return resolved;
}

function assertContained(root, target, label) {
  const relative = path.relative(root, target);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new TretnixError("UNSAFE_PATH", `${label} resolves outside the declared root`);
  }
}

function sameCanonicalPath(left, right) {
  const normalize = (value) => process.platform === "win32" ? path.resolve(value).toLowerCase() : path.resolve(value);
  return normalize(left) === normalize(right);
}

// Inspect every component using metadata only, including aliases whose target is missing.
export async function inspectPath(base, candidate, manifest = { validation: {} }, label = "path") {
  const root = path.resolve(base);
  const lexical = path.isAbsolute(candidate) ? path.resolve(candidate) : resolveInside(root, candidate, label);
  assertContained(root, lexical, label);
  const rootReal = await realpath(root);
  const relative = relativePosix(root, lexical);
  const aliases = [];
  if (!sameCanonicalPath(root, rootReal)) aliases.push(".");
  let current = root;
  let exists = true;
  for (const segment of path.relative(root, lexical).split(path.sep).filter(Boolean)) {
    current = path.join(current, segment);
    let details;
    try { details = await lstat(current); }
    catch (error) {
      if (["ENOENT", "ENOTDIR"].includes(error.code)) { exists = false; break; }
      throw error;
    }
    if ((current !== lexical || [".tretnix", ".tretnix/cache", ".tretnix/runtime", ".tretnix/evidence"].includes(relativePosix(root, current))) && !details.isDirectory() && !details.isSymbolicLink()) {
      throw new TretnixError("UNSAFE_PATH", `${label} has a non-directory namespace component`);
    }
    if (details.isSymbolicLink()) aliases.push(relativePosix(root, current));
    try {
      const actual = await realpath(current);
      const expected = path.resolve(rootReal, path.relative(root, current));
      if (!sameCanonicalPath(actual, expected)) aliases.push(relativePosix(root, current));
    } catch (error) {
      if (["ENOENT", "ENOTDIR", "ELOOP"].includes(error.code)) { aliases.push(relativePosix(root, current)); exists = false; break; }
      throw error;
    }
  }
  let actual = null;
  if (exists) actual = await realpath(lexical);
  const actualRelative = actual === null ? null : relativePosix(rootReal, actual);
  return {
    lexical,
    exists,
    metadata: {
      path: relative,
      real_path: actualRelative,
      aliases: [...new Set(aliases)],
      sensitive: isSensitiveDeclaredPath(relative, manifest) || (actualRelative !== null && isSensitiveDeclaredPath(actualRelative, manifest)),
    },
    aliased: aliases.length > 0,
  };
}

async function assertUnaliasedPath(base, candidate, label) {
  const inspected = await inspectPath(base, candidate, undefined, label);
  if (inspected.aliased) throw new TretnixError("UNSAFE_PATH", `${label} traverses an alias/reparse point`, { path: inspected.metadata.path, aliases: inspected.metadata.aliases });
  return inspected;
}

async function assertRuntimeNamespace(root, lexical) {
  const segments = lexical.split(path.sep);
  const runtimeIndex = segments.findIndex((segment) => (process.platform === "win32" ? segment.toLowerCase() : segment) === ".tretnix");
  if (runtimeIndex === -1) return;
  const repo = segments.slice(0, runtimeIndex).join(path.sep) || path.parse(root).root;
  for (const relative of [".tretnix", ".tretnix/cache", ".tretnix/cache/context", ".tretnix/cache/validation", ".tretnix/runtime", ".tretnix/evidence"]) {
    const state = await assertUnaliasedPath(repo, relative, "runtime namespace");
    if (state.exists && !(await lstat(state.lexical)).isDirectory()) {
      throw new TretnixError("UNSAFE_PATH", "Runtime namespace components must be real directories", { path: relative });
    }
  }
}

export async function confineExistingPath(base, candidate, label = "path") {
  if (typeof candidate !== "string" || candidate.trim() === "" || candidate.includes("\0")) {
    throw new TretnixError("UNSAFE_PATH", `${label} must be a non-empty path`);
  }
  const root = path.resolve(base);
  const absolute = path.isAbsolute(candidate) || path.win32.isAbsolute(candidate) || path.posix.isAbsolute(candidate);
  const lexical = absolute ? path.resolve(candidate) : resolveInside(root, candidate, label);
  assertContained(root, lexical, label);
  await assertRuntimeNamespace(root, lexical);
  let rootReal;
  let targetReal;
  try {
    [rootReal, targetReal] = await Promise.all([realpath(root), realpath(lexical)]);
  } catch (error) {
    if (error.code === "ENOENT") throw new TretnixError("MISSING_FILE", `Missing ${label}: ${candidate}`);
    throw error;
  }
  assertContained(rootReal, targetReal, label);
  await assertUnaliasedPath(root, lexical, label);
  return lexical;
}

export async function resolveExistingInside(base, candidate, label = "path") {
  if (!isSafeRelativePath(candidate)) throw new TretnixError("UNSAFE_PATH", `${label} must be a safe relative path: ${candidate}`);
  return confineExistingPath(base, candidate, label);
}

export async function confineRegularFile(base, candidate, label = "cache artifact") {
  const target = await confineExistingPath(base, candidate, label);
  if (!(await stat(target)).isFile()) throw new TretnixError("UNSAFE_PATH", `${label} must be a regular file`);
  return target;
}

export async function confineSourceFile(base, candidate, manifest = { validation: {} }, label = "source file") {
  const lexical = path.isAbsolute(candidate) ? path.resolve(candidate) : resolveInside(base, candidate, label);
  const inspected = await inspectPath(base, lexical, manifest, label);
  if (inspected.metadata.sensitive) throw new TretnixError("SENSITIVE_CONTEXT_SOURCE", `${label} is sensitive`);
  const target = await confineRegularFile(base, lexical, label);
  const actual = await realpath(target);
  if (isSensitiveDeclaredPath(relativePosix(await realpath(base), actual), manifest)) throw new TretnixError("SENSITIVE_CONTEXT_SOURCE", `${label} resolves to a sensitive file`);
  return target;
}

export async function resolveOutputInside(base, candidate, label = "output path") {
  if (!isSafeRelativePath(candidate)) throw new TretnixError("UNSAFE_PATH", `${label} must be a safe relative path: ${candidate}`);
  return confineOutputPath(base, candidate, label);
}

export async function confineOutputPath(base, candidate, label = "output path") {
  if (typeof candidate !== "string" || candidate.trim() === "" || candidate.includes("\0")) {
    throw new TretnixError("UNSAFE_PATH", `${label} must be a non-empty path`);
  }
  const root = path.resolve(base);
  const absolute = path.isAbsolute(candidate) || path.win32.isAbsolute(candidate) || path.posix.isAbsolute(candidate);
  const lexical = absolute ? path.resolve(candidate) : resolveInside(root, candidate, label);
  assertContained(root, lexical, label);
  await assertRuntimeNamespace(root, lexical);
  await assertUnaliasedPath(root, lexical, label);
  const rootReal = await realpath(root);
  let ancestor = lexical;
  while (!(await pathExists(ancestor))) {
    const parent = path.dirname(ancestor);
    if (parent === ancestor) throw new TretnixError("UNSAFE_PATH", `Cannot resolve ${label}: ${candidate}`);
    ancestor = parent;
  }
  const ancestorReal = await realpath(ancestor);
  assertContained(rootReal, ancestorReal, label);
  const projected = path.resolve(ancestorReal, path.relative(ancestor, lexical));
  assertContained(rootReal, projected, label);
  return lexical;
}

export async function pathExists(target) {
  try {
    await lstat(target);
    return true;
  } catch (error) {
    if (error.code === "ENOENT") return false;
    throw error;
  }
}

export async function readJson(target, code = "INVALID_JSON") {
  let text;
  try {
    text = await readFile(target, "utf8");
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new TretnixError("MISSING_FILE", `Missing file: ${target}`);
    }
    throw error;
  }
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new TretnixError(code, `Invalid JSON in ${target}: ${error.message}`);
  }
}

export async function writeTextAtomic(target, content, root = null) {
  if (!root) throw new TretnixError("UNSAFE_PATH", "Atomic writes require an explicit authorized root");
  const confinedTarget = await confineOutputPath(root, target, "write target");
  await mkdir(path.dirname(confinedTarget), { recursive: true });
  const temporary = `${confinedTarget}.${process.pid}.tmp`;
  await confineOutputPath(root, temporary, "atomic temporary target");
  await writeFile(temporary, content, { encoding: "utf8", flag: "wx" });
  await rename(temporary, confinedTarget);
}

export async function writeJsonAtomic(target, value, root = null) {
  await writeTextAtomic(target, stableJson(value), root);
}

export function runProcess(executable, args, options = {}) {
  const result = spawnSync(executable, args, {
    cwd: options.cwd,
    encoding: options.binary ? null : "utf8",
    env: options.env ?? process.env,
    maxBuffer: options.maxBuffer ?? 64 * 1024 * 1024,
    shell: false,
    timeout: options.timeout,
    windowsHide: true,
  });
  if (result.error && !(options.allowTimeout && result.error.code === "ETIMEDOUT")) {
    throw new TretnixError("COMMAND_UNAVAILABLE", `${executable} is unavailable: ${result.error.message}`);
  }
  return result;
}

export function runGit(repo, args, { allowFailure = false, binary = false } = {}) {
  const result = runProcess("git", ["-C", repo, ...args], { binary });
  if (!allowFailure && result.status !== 0) {
    const detail = binary
      ? Buffer.concat([result.stdout ?? Buffer.alloc(0), result.stderr ?? Buffer.alloc(0)]).toString("utf8")
      : `${result.stdout ?? ""}${result.stderr ?? ""}`;
    throw new TretnixError("GIT_ERROR", `git ${args.join(" ")} failed: ${detail.trim()}`);
  }
  return result;
}

export function gitText(repo, args, options = {}) {
  return (runGit(repo, args, options).stdout ?? "").trim();
}

export function gitBuffer(repo, args, options = {}) {
  return runGit(repo, args, { ...options, binary: true }).stdout ?? Buffer.alloc(0);
}

export function splitNullBuffer(buffer) {
  return buffer
    .toString("utf8")
    .split("\0")
    .filter(Boolean)
    .map((entry) => entry.replaceAll("\\", "/"));
}

export function normalizeRepositoryIdentity(value) {
  if (!value) return null;
  let normalized = value.trim().replaceAll("\\", "/");
  normalized = normalized.replace(/^git@github\.com:/i, "");
  normalized = normalized.replace(/^https?:\/\/github\.com\//i, "");
  normalized = normalized.replace(/^ssh:\/\/git@github\.com\//i, "");
  normalized = normalized.replace(/\.git\/?$/i, "").replace(/^\/+|\/+$/g, "");
  return normalized.toLowerCase();
}

export function taskRepositoryMatches(taskRepository, manifestRepository, projectId) {
  const task = normalizeRepositoryIdentity(taskRepository);
  const manifest = normalizeRepositoryIdentity(manifestRepository);
  if (task === manifest) return true;
  return task === manifest?.split("/").at(-1) || task === projectId?.toLowerCase();
}

export function isSensitivePath(relative) {
  const normalized = relative.replaceAll("\\", "/");
  const name = normalized.split("/").at(-1)?.toLowerCase() ?? "";
  const publicEnvironmentTemplate = [".env.example", ".env.sample", ".env.template"].includes(name);
  return (
    name === ".env" ||
    (name.startsWith(".env.") && !publicEnvironmentTemplate) ||
    [".npmrc", ".pypirc", ".netrc", "credentials", "credentials.json", "id_rsa", "id_ed25519"].includes(name) ||
    [".pem", ".key", ".p12", ".pfx", ".jks", ".keystore"].some((suffix) => name.endsWith(suffix))
  );
}

export function isRuntimePath(relative) {
  const normalized = relative.replaceAll("\\", "/").replace(/^\.\//, "");
  return normalized === ".tretnix" || normalized.startsWith(".tretnix/") || normalized.startsWith(".git/");
}

export function pathMatches(relative, patterns = []) {
  const normalized = relative.replaceAll("\\", "/").replace(/^\.\//, "");
  return patterns.some((pattern) => {
    const expected = pattern.replaceAll("\\", "/").replace(/^\.\//, "");
    if (expected.endsWith("/**")) return normalized === expected.slice(0, -3) || normalized.startsWith(expected.slice(0, -2));
    if (expected.endsWith("/")) return normalized === expected.slice(0, -1) || normalized.startsWith(expected);
    return normalized === expected;
  });
}

export function isSensitiveDeclaredPath(relative, manifest) {
  const patterns = manifest.validation?.sensitive_path_prefixes ?? [];
  return isSensitivePath(relative) || (process.platform === "win32"
    ? pathMatches(relative.toLowerCase(), patterns.map((entry) => entry.toLowerCase()))
    : pathMatches(relative, patterns));
}

function exactKeys(errors, value, allowed, field) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    errors.push(`${field} must be an object`);
    return false;
  }
  for (const key of Object.keys(value)) if (!allowed.includes(key)) errors.push(`${field}.${key} is not allowed`);
  return true;
}

function requireString(errors, value, field) {
  if (typeof value !== "string" || value.trim() === "") errors.push(`${field} must be a non-empty string`);
}

function requireStringArray(errors, value, field, { nonEmpty = false, enumValues = null, paths = false } = {}) {
  if (!Array.isArray(value) || (nonEmpty && value.length === 0) || value.some((entry) => typeof entry !== "string" || entry.trim() === "")) {
    errors.push(`${field} must be ${nonEmpty ? "a non-empty" : "an"} array of non-empty strings`);
    return;
  }
  if (new Set(value).size !== value.length) errors.push(`${field} must contain unique values`);
  if (enumValues) for (const entry of value) if (!enumValues.includes(entry)) errors.push(`${field} contains unsupported value: ${entry}`);
  if (paths) {
    for (const entry of value) {
      const candidate = entry.endsWith("/**") ? `${entry.slice(0, -2)}placeholder` : entry;
      if (!isSafeRelativePath(candidate)) errors.push(`${field} contains unsafe path: ${entry}`);
    }
  }
}

function requireInteger(errors, value, field, { minimum = null, maximum = null, nullable = false } = {}) {
  if (nullable && value === null) return;
  if (!Number.isInteger(value)) {
    errors.push(`${field} must be ${nullable ? "an integer or null" : "an integer"}`);
    return;
  }
  if (minimum !== null && value < minimum) errors.push(`${field} must be at least ${minimum}`);
  if (maximum !== null && value > maximum) errors.push(`${field} must be at most ${maximum}`);
}

function requireDateTime(errors, value, field) {
  requireString(errors, value, field);
  if (typeof value === "string" && (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/.test(value) || Number.isNaN(Date.parse(value)))) {
    errors.push(`${field} must be an ISO 8601 UTC timestamp`);
  }
}

function requireSha(errors, value, field, length) {
  requireString(errors, value, field);
  if (typeof value === "string" && !new RegExp(`^[0-9a-f]{${length}}$`).test(value)) errors.push(`${field} must be a lowercase hexadecimal digest`);
}

function validateEvidenceIssue(errors, issue, field) {
  if (!exactKeys(errors, issue, ["code", "expected", "actual", "paths"], field)) return;
  requireString(errors, issue.code, `${field}.code`);
  for (const key of ["expected", "actual"]) if (issue[key] !== undefined && issue[key] !== null && typeof issue[key] !== "string") errors.push(`${field}.${key} must be a string or null`);
  if (issue.paths !== undefined) requireStringArray(errors, issue.paths, `${field}.paths`, { paths: true });
}

function validateEvidenceSource(errors, source, field) {
  if (!exactKeys(errors, source, ["base", "path", "display_path", "sha256", "knowledge_commit", "headings", "reason"], field)) return;
  if (!(["repo", "knowledge"].includes(source.base))) errors.push(`${field}.base is unsupported`);
  requireString(errors, source.path, `${field}.path`);
  if (typeof source.path === "string" && !isSafeRelativePath(source.path)) errors.push(`${field}.path must be a safe relative path`);
  requireString(errors, source.display_path, `${field}.display_path`);
  requireSha(errors, source.sha256, `${field}.sha256`, 64);
  if (source.knowledge_commit !== null) requireSha(errors, source.knowledge_commit, `${field}.knowledge_commit`, 40);
  requireStringArray(errors, source.headings, `${field}.headings`);
  requireString(errors, source.reason, `${field}.reason`);
}

function validateEvidenceNotExecuted(errors, entry, field) {
  if (!exactKeys(errors, entry, ["validator_id", "reason"], field)) return;
  requireString(errors, entry.validator_id, `${field}.validator_id`);
  requireString(errors, entry.reason, `${field}.reason`);
}

function validateEvidenceCommand(errors, command, field) {
  if (!exactKeys(errors, command, ["validator_id", "command", "exit_code", "status", "reason"], field)) return;
  requireString(errors, command.validator_id, `${field}.validator_id`);
  if (command.command !== null) requireString(errors, command.command, `${field}.command`);
  requireInteger(errors, command.exit_code, `${field}.exit_code`, { nullable: true });
  if (!["PASS", "FAIL", "TIMEOUT", "UNAVAILABLE", "BLOCKED", "NOT_RUN"].includes(command.status)) errors.push(`${field}.status is unsupported`);
  if (command.reason !== undefined) requireString(errors, command.reason, `${field}.reason`);
}

function validateEvidenceValidation(errors, validation, field) {
  const allowed = ["validator_id", "command", "capabilities", "exit_code", "result", "cache", "duration_ms", "timeout_ms", "cache_key", "cache_rejection", "runtime_version", "started_at", "ended_at", "forbidden_action"];
  if (!exactKeys(errors, validation, allowed, field)) return;
  requireString(errors, validation.validator_id, `${field}.validator_id`);
  if (validation.command !== null) requireString(errors, validation.command, `${field}.command`);
  requireStringArray(errors, validation.capabilities, `${field}.capabilities`, { nonEmpty: true });
  requireInteger(errors, validation.exit_code, `${field}.exit_code`);
  if (!["PASS", "FAIL", "TIMEOUT", "UNAVAILABLE", "BLOCKED"].includes(validation.result)) errors.push(`${field}.result is unsupported`);
  if (!["HIT", "MISS"].includes(validation.cache)) errors.push(`${field}.cache is unsupported`);
  requireInteger(errors, validation.duration_ms, `${field}.duration_ms`, { minimum: 0 });
  if (validation.timeout_ms !== undefined) requireInteger(errors, validation.timeout_ms, `${field}.timeout_ms`, { minimum: 100, maximum: 600000 });
  if (validation.cache_key !== undefined) requireSha(errors, validation.cache_key, `${field}.cache_key`, 64);
  if (validation.cache_rejection !== null && validation.cache_rejection !== undefined) requireString(errors, validation.cache_rejection, `${field}.cache_rejection`);
  if (validation.runtime_version !== undefined) requireString(errors, validation.runtime_version, `${field}.runtime_version`);
  for (const key of ["started_at", "ended_at"]) if (validation[key] !== undefined) requireDateTime(errors, validation[key], `${field}.${key}`);
  if (validation.forbidden_action !== undefined) requireString(errors, validation.forbidden_action, `${field}.forbidden_action`);
}

function validateEvidenceGate(errors, gate, field, manual) {
  if (!exactKeys(errors, gate, ["id", "required", "status"], field)) return;
  requireString(errors, gate.id, `${field}.id`);
  if (manual && typeof gate.required !== "boolean") errors.push(`${field}.required must be a boolean`);
  if (!manual && gate.required !== undefined && typeof gate.required !== "boolean") errors.push(`${field}.required must be a boolean`);
  if (!["PASS", "FAIL", "UNVERIFIED", "NOT_REQUIRED"].includes(gate.status)) errors.push(`${field}.status is unsupported`);
}

function validateContextSource(errors, source, field) {
  if (typeof source === "string") {
    if (!isSafeRelativePath(source)) errors.push(`${field} must be a safe relative path`);
    return;
  }
  if (!exactKeys(errors, source, ["base", "path", "sections", "reason"], field)) return;
  if (source.base !== undefined && !["repo", "knowledge"].includes(source.base)) errors.push(`${field}.base is unsupported`);
  requireString(errors, source.path, `${field}.path`);
  if (typeof source.path === "string" && !isSafeRelativePath(source.path)) errors.push(`${field}.path must be a safe relative path`);
  if (source.sections !== undefined) requireStringArray(errors, source.sections, `${field}.sections`);
  if (source.reason !== undefined) requireString(errors, source.reason, `${field}.reason`);
}

function validateCommand(errors, command, field) {
  if (typeof command === "string") return requireString(errors, command, field);
  if (!command || typeof command !== "object" || Array.isArray(command) || !Object.keys(command).length) {
    errors.push(`${field} must be a command string or platform map`);
    return;
  }
  for (const [platform, value] of Object.entries(command)) requireString(errors, value, `${field}.${platform}`);
}

function validateProjectSemantics(manifest) {
  const errors = [];
  if (!exactKeys(errors, manifest, ["$schema", "schema_version", "project", "sources", "context", "commands", "validation", "gates", "forbidden_automatic_actions"], "manifest")) return errors;
  if (manifest.schema_version !== PROJECT_SCHEMA_VERSION) errors.push("schema_version must equal 1");

  if (exactKeys(errors, manifest.project, ["id", "family", "plan", "repository", "default_branch", "allowed_branch_prefixes"], "project")) {
    for (const key of ["id", "family", "plan", "repository", "default_branch"]) requireString(errors, manifest.project[key], `project.${key}`);
    if (manifest.project.allowed_branch_prefixes !== undefined) requireStringArray(errors, manifest.project.allowed_branch_prefixes, "project.allowed_branch_prefixes");
  }
  if (exactKeys(errors, manifest.sources, ["agents", "status", "local_decisions", "knowledge_tags"], "sources")) {
    for (const key of ["agents", "status", "local_decisions"]) requireStringArray(errors, manifest.sources[key], `sources.${key}`, { paths: true });
    requireStringArray(errors, manifest.sources.knowledge_tags, "sources.knowledge_tags");
  }
  if (exactKeys(errors, manifest.context, ["knowledge_root", "compact_adapters", "tag_sources", "source_allowlists"], "context")) {
    if (manifest.context.knowledge_root !== undefined && manifest.context.knowledge_root !== ".") errors.push("context.knowledge_root must be '.'; use --knowledge for a separate checkout");
    if (!Array.isArray(manifest.context.compact_adapters)) errors.push("context.compact_adapters must be an array");
    else manifest.context.compact_adapters.forEach((source, index) => validateContextSource(errors, source, `context.compact_adapters[${index}]`));
    if (!manifest.context.tag_sources || typeof manifest.context.tag_sources !== "object" || Array.isArray(manifest.context.tag_sources)) errors.push("context.tag_sources must be an object");
    else for (const [tag, sources] of Object.entries(manifest.context.tag_sources)) {
      if (!Array.isArray(sources)) errors.push(`context.tag_sources.${tag} must be an array`);
      else sources.forEach((source, index) => validateContextSource(errors, source, `context.tag_sources.${tag}[${index}]`));
    }
    if (exactKeys(errors, manifest.context.source_allowlists, ["repo", "knowledge"], "context.source_allowlists")) {
      requireStringArray(errors, manifest.context.source_allowlists.repo, "context.source_allowlists.repo", { paths: true });
      requireStringArray(errors, manifest.context.source_allowlists.knowledge, "context.source_allowlists.knowledge", { paths: true });
    }
  }
  if (!manifest.commands || typeof manifest.commands !== "object" || Array.isArray(manifest.commands)) errors.push("commands must be an object");
  else for (const [key, value] of Object.entries(manifest.commands)) if (value !== null) validateCommand(errors, value, `commands.${key}`);

  const validationKeys = ["lockfiles", "generated_paths", "sensitive_path_prefixes", "security_sensitive_prefixes", "docs_only_prefixes", "frontend_prefixes", "backend_prefixes", "release_or_infra_prefixes", "supported_task_classes", "required_capabilities", "allowed_executables", "validators"];
  if (exactKeys(errors, manifest.validation, validationKeys, "validation")) {
    for (const key of ["lockfiles", "generated_paths", "sensitive_path_prefixes", "security_sensitive_prefixes", "docs_only_prefixes", "frontend_prefixes", "backend_prefixes", "release_or_infra_prefixes"]) {
      requireStringArray(errors, manifest.validation[key], `validation.${key}`, { paths: true });
    }
    requireStringArray(errors, manifest.validation.supported_task_classes, "validation.supported_task_classes", { enumValues: TASK_CLASSES });
    requireStringArray(errors, manifest.validation.allowed_executables, "validation.allowed_executables");
    if (!manifest.validation.required_capabilities || typeof manifest.validation.required_capabilities !== "object" || Array.isArray(manifest.validation.required_capabilities)) errors.push("validation.required_capabilities must be an object");
    else {
      for (const key of Object.keys(manifest.validation.required_capabilities)) if (!TASK_CLASSES.includes(key)) errors.push(`validation.required_capabilities.${key} is unsupported`);
      for (const taskClass of manifest.validation.supported_task_classes ?? []) {
        const capabilities = manifest.validation.required_capabilities[taskClass];
        requireStringArray(errors, capabilities, `validation.required_capabilities.${taskClass}`, { nonEmpty: true });
        for (const required of CLASS_CAPABILITY_FLOORS[taskClass]) if (!capabilities?.includes(required)) errors.push(`validation.required_capabilities.${taskClass} must include ${required}`);
      }
    }
    if (!Array.isArray(manifest.validation.validators)) errors.push("validation.validators must be an array");
    else {
      const ids = new Set();
      for (const [index, validator] of manifest.validation.validators.entries()) {
        const field = `validation.validators[${index}]`;
        if (!exactKeys(errors, validator, ["id", "command", "runtime", "task_classes", "capabilities", "deterministic", "cacheable", "contract_version", "timeout_ms"], field)) continue;
        requireString(errors, validator.id, `${field}.id`);
        if (ids.has(validator.id)) errors.push(`${field}.id must be unique`);
        ids.add(validator.id);
        validateCommand(errors, validator.command, `${field}.command`);
        if (validator.runtime !== undefined) requireString(errors, validator.runtime, `${field}.runtime`);
        requireStringArray(errors, validator.task_classes, `${field}.task_classes`, { nonEmpty: true, enumValues: ["all", ...TASK_CLASSES] });
        requireStringArray(errors, validator.capabilities, `${field}.capabilities`, { nonEmpty: true });
        if (typeof validator.deterministic !== "boolean") errors.push(`${field}.deterministic must be a boolean`);
        if (typeof validator.cacheable !== "boolean") errors.push(`${field}.cacheable must be a boolean`);
        requireString(errors, validator.contract_version, `${field}.contract_version`);
        if (!Number.isInteger(validator.timeout_ms) || validator.timeout_ms < 100 || validator.timeout_ms > 600000) errors.push(`${field}.timeout_ms must be an integer from 100 to 600000`);
      }
      const provided = new Set(manifest.validation.validators.flatMap((validator) => validator.capabilities ?? []));
      for (const taskClass of manifest.validation.supported_task_classes ?? []) {
        for (const required of manifest.validation.required_capabilities?.[taskClass] ?? []) if (!provided.has(required)) errors.push(`no validator provides required capability ${required} for ${taskClass}`);
      }
    }
  }
  if (!manifest.gates || typeof manifest.gates !== "object" || Array.isArray(manifest.gates)) errors.push("gates must be an object");
  else {
    for (const gate of ["browser", "backend", "staging", "production"]) if (!(gate in manifest.gates)) errors.push(`gates.${gate} is required`);
    for (const [gate, value] of Object.entries(manifest.gates)) if (typeof value !== "boolean") errors.push(`gates.${gate} must be a boolean`);
  }
  requireStringArray(errors, manifest.forbidden_automatic_actions, "forbidden_automatic_actions", { nonEmpty: true, enumValues: REQUIRED_FORBIDDEN_ACTIONS });
  for (const action of REQUIRED_FORBIDDEN_ACTIONS) if (!manifest.forbidden_automatic_actions?.includes(action)) errors.push(`forbidden_automatic_actions must include ${action}`);
  return errors;
}

function validateTaskSemantics(task) {
  const errors = [];
  if (!exactKeys(errors, task, ["$schema", "task_version", "title", "repository", "objective", "tags", "task_class", "risk", "writer", "allowed_scope", "forbidden", "required_outputs", "required_sources", "expected_branch", "working_tree"], "task")) return errors;
  if (task.task_version !== TASK_SCHEMA_VERSION) errors.push("task_version must equal 1");
  for (const key of ["title", "repository", "objective", "writer"]) requireString(errors, task[key], key);
  for (const key of ["tags", "allowed_scope", "forbidden", "required_outputs"]) requireStringArray(errors, task[key], key, { nonEmpty: true });
  if (!TASK_CLASSES.includes(task.task_class)) errors.push("task_class is unsupported");
  if (!["low", "medium", "high", "critical"].includes(task.risk)) errors.push("risk is unsupported");
  if (!["clean_required", "dirty_allowed"].includes(task.working_tree)) errors.push("working_tree is unsupported");
  if (task.expected_branch !== undefined) requireString(errors, task.expected_branch, "expected_branch");
  if (task.required_sources !== undefined) {
    if (!Array.isArray(task.required_sources)) errors.push("required_sources must be an array");
    else task.required_sources.forEach((source, index) => validateContextSource(errors, source, `required_sources[${index}]`));
  }
  return errors;
}

function validateEvidenceSemantics(evidence) {
  const errors = [];
  const allowed = ["$schema", "schema_version", "run_id", "started_at", "ended_at", "repository", "branch", "head", "fingerprint", "fingerprint_contract_version", "task_class", "state_identity", "preflight", "context", "working_tree", "sources", "validation_plan", "commands", "cache", "validation", "automatic_gates", "manual_gates", "forbidden_actions_observed", "result"];
  if (!exactKeys(errors, evidence, allowed, "evidence")) return errors;
  if (evidence.schema_version !== EVIDENCE_SCHEMA_VERSION) errors.push("schema_version must equal 1");
  requireString(errors, evidence.run_id, "run_id");
  if (typeof evidence.run_id === "string" && !/^[0-9A-Za-z._-]+$/.test(evidence.run_id)) errors.push("run_id contains unsafe characters");
  requireDateTime(errors, evidence.started_at, "started_at");
  requireDateTime(errors, evidence.ended_at, "ended_at");
  if (!Number.isNaN(Date.parse(evidence.started_at)) && !Number.isNaN(Date.parse(evidence.ended_at)) && Date.parse(evidence.ended_at) < Date.parse(evidence.started_at)) errors.push("ended_at must not precede started_at");
  for (const key of ["repository", "branch", "fingerprint_contract_version"]) requireString(errors, evidence[key], key);
  requireSha(errors, evidence.head, "head", 40);
  requireSha(errors, evidence.fingerprint, "fingerprint", 64);
  if (!TASK_CLASSES.includes(evidence.task_class)) errors.push("task_class is unsupported");
  if (!["PASS", "REVIEW_REQUIRED", "FAIL"].includes(evidence.result)) errors.push("result is unsupported");

  if (exactKeys(errors, evidence.preflight, ["ok", "issues"], "preflight")) {
    if (typeof evidence.preflight.ok !== "boolean") errors.push("preflight.ok must be a boolean");
    if (!Array.isArray(evidence.preflight.issues)) errors.push("preflight.issues must be an array");
    else evidence.preflight.issues.forEach((issue, index) => validateEvidenceIssue(errors, issue, `preflight.issues[${index}]`));
    if (evidence.preflight.ok === true && evidence.preflight.issues?.length) errors.push("preflight.ok cannot be true when issues are present");
  }

  if (evidence.context !== null) {
    if (exactKeys(errors, evidence.context, ["cache", "key", "source_count", "bytes", "lines"], "context")) {
      if (!["HIT", "MISS"].includes(evidence.context.cache)) errors.push("context.cache is unsupported");
      requireSha(errors, evidence.context.key, "context.key", 64);
      for (const key of ["source_count", "bytes", "lines"]) requireInteger(errors, evidence.context[key], `context.${key}`, { minimum: 0 });
    }
  }

  if (exactKeys(errors, evidence.working_tree, ["staged", "unstaged", "untracked", "sensitive"], "working_tree")) {
    for (const key of ["staged", "unstaged", "untracked", "sensitive"]) requireStringArray(errors, evidence.working_tree[key], `working_tree.${key}`, { paths: true });
  }

  if (!Array.isArray(evidence.sources)) errors.push("sources must be an array");
  else evidence.sources.forEach((source, index) => validateEvidenceSource(errors, source, `sources[${index}]`));
  if (evidence.context && Array.isArray(evidence.sources) && evidence.context.source_count !== evidence.sources.length) errors.push("context.source_count must equal sources.length");

  if (exactKeys(errors, evidence.validation_plan, ["supported", "effective_classes", "required_capabilities", "provided_capabilities", "missing_capabilities", "selected", "not_executed"], "validation_plan")) {
    if (typeof evidence.validation_plan.supported !== "boolean") errors.push("validation_plan.supported must be a boolean");
    for (const key of ["required_capabilities", "provided_capabilities", "missing_capabilities", "selected"]) requireStringArray(errors, evidence.validation_plan[key], `validation_plan.${key}`);
    if (!Array.isArray(evidence.validation_plan.not_executed)) errors.push("validation_plan.not_executed must be an array");
    else evidence.validation_plan.not_executed.forEach((entry, index) => validateEvidenceNotExecuted(errors, entry, `validation_plan.not_executed[${index}]`));
    if (evidence.validation_plan.supported === false && evidence.validation_plan.missing_capabilities?.length === 0) errors.push("unsupported validation plans must identify a missing capability");
  }

  if (!Array.isArray(evidence.commands)) errors.push("commands must be an array");
  else evidence.commands.forEach((command, index) => validateEvidenceCommand(errors, command, `commands[${index}]`));

  if (exactKeys(errors, evidence.cache, ["context", "hits", "misses", "rejections"], "cache")) {
    if (!["HIT", "MISS", "NOT_RUN"].includes(evidence.cache.context)) errors.push("cache.context is unsupported");
    for (const key of ["hits", "misses", "rejections"]) requireStringArray(errors, evidence.cache[key], `cache.${key}`);
    const overlap = (evidence.cache.hits ?? []).filter((id) => evidence.cache.misses?.includes(id));
    if (overlap.length) errors.push(`cache validator IDs cannot be both hits and misses: ${overlap.join(", ")}`);
  }

  if (!Array.isArray(evidence.validation)) errors.push("validation must be an array");
  else evidence.validation.forEach((entry, index) => validateEvidenceValidation(errors, entry, `validation[${index}]`));

  if (!Array.isArray(evidence.automatic_gates)) errors.push("automatic_gates must be an array");
  else evidence.automatic_gates.forEach((gate, index) => validateEvidenceGate(errors, gate, `automatic_gates[${index}]`, false));
  if (!Array.isArray(evidence.manual_gates)) errors.push("manual_gates must be an array");
  else evidence.manual_gates.forEach((gate, index) => validateEvidenceGate(errors, gate, `manual_gates[${index}]`, true));
  requireStringArray(errors, evidence.forbidden_actions_observed, "forbidden_actions_observed");

  const automaticFailure = evidence.preflight?.ok !== true || evidence.validation_plan?.missing_capabilities?.length > 0 || evidence.validation?.some((entry) => entry.exit_code !== 0 || entry.result !== "PASS") || evidence.automatic_gates?.some((gate) => gate.status !== "PASS");
  const openManual = evidence.manual_gates?.some((gate) => gate.required && gate.status !== "PASS");
  const expectedResult = automaticFailure ? "FAIL" : openManual ? "REVIEW_REQUIRED" : "PASS";
  if (evidence.result !== expectedResult) errors.push(`result must equal ${expectedResult} for the declared gates`);
  if (evidence.state_identity?.task_path !== null && evidence.state_identity?.task_sha256 === null) errors.push("task path requires task digest");
  if (evidence.result === "PASS") {
    if (evidence.preflight?.ok !== true) errors.push("PASS evidence requires a successful preflight");
    if (evidence.validation_plan?.missing_capabilities?.length) errors.push("PASS evidence cannot have missing capabilities");
    if (evidence.validation?.some((entry) => entry.exit_code !== 0 || entry.result !== "PASS")) errors.push("PASS evidence requires every executed validator to pass");
    if (evidence.automatic_gates?.some((gate) => gate.status !== "PASS")) errors.push("PASS evidence requires every automatic gate to pass");
    if (evidence.manual_gates?.some((gate) => gate.required && gate.status !== "PASS")) errors.push("PASS evidence cannot have an unresolved required manual gate");
  }
  return errors;
}

// Only the schema vocabulary used by these three local contracts is supported.
// No remote references, downloads or external schema engine are involved.
export const publishedSchemas = Object.fromEntries(["project", "task", "evidence"].map((kind) => [kind,
  JSON.parse(readFileSync(new URL(`../../schemas/tretnix-${kind}.schema.json`, import.meta.url), "utf8")),
]));

export function validateContractStructure(value, kind, schema = publishedSchemas[kind]) {
  const errors = [];
  function visit(item, rule, root, field) {
    if (rule.$ref) {
      const [file, fragment] = rule.$ref.split("#");
      const referenced = file ? publishedSchemas[file.replace(/^tretnix-|\.schema\.json$/g, "")] : root;
      if (!referenced || !fragment?.startsWith("/")) { errors.push(`${field}: unsupported schema reference`); return; }
      const target = fragment.slice(1).split("/").reduce((node, key) => node?.[key], referenced);
      if (!target) { errors.push(`${field}: missing schema reference`); return; }
      visit(item, target, referenced, field);
      return;
    }
    if (rule.oneOf) {
      const matches = rule.oneOf.filter((alternative) => {
        const start = errors.length;
        visit(item, alternative, root, field);
        const ok = errors.length === start;
        errors.splice(start);
        return ok;
      });
      if (matches.length !== 1) errors.push(`${field}: must match one schema alternative`);
      return;
    }
    if (rule.const !== undefined && item !== rule.const) errors.push(`${field}: invalid constant`);
    if (rule.enum && !rule.enum.includes(item)) errors.push(`${field}: unsupported value`);
    const types = rule.type ? (Array.isArray(rule.type) ? rule.type : [rule.type]) : [];
    const matchesType = (type) => type === "null" ? item === null : type === "array" ? Array.isArray(item) : type === "object" ? !!item && typeof item === "object" && !Array.isArray(item) : type === "integer" ? Number.isInteger(item) : typeof item === type;
    if (types.length && !types.some(matchesType)) { errors.push(`${field}: invalid type`); return; }
    if (typeof item === "string") {
      if (rule.minLength && (item.length < rule.minLength || item.trim() === "")) errors.push(`${field}: empty string`);
      if (rule.pattern && !new RegExp(rule.pattern).test(item)) errors.push(`${field}: invalid pattern`);
      if (rule.format === "date-time") requireDateTime(errors, item, field);
    }
    if (typeof item === "number") {
      if (rule.minimum !== undefined && item < rule.minimum) errors.push(`${field}: below minimum`);
      if (rule.maximum !== undefined && item > rule.maximum) errors.push(`${field}: above maximum`);
    }
    if (Array.isArray(item)) {
      if (rule.minItems && item.length < rule.minItems) errors.push(`${field}: insufficient items`);
      if (rule.uniqueItems && new Set(item.map((entry) => stableJson(entry, 0))).size !== item.length) errors.push(`${field}: duplicate items`);
      if (rule.items) item.forEach((entry, index) => visit(entry, rule.items, root, `${field}[${index}]`));
    } else if (item && typeof item === "object") {
      if (rule.minProperties && Object.keys(item).length < rule.minProperties) errors.push(`${field}: insufficient properties`);
      for (const key of rule.required ?? []) if (!(key in item)) errors.push(`${field}.${key}: required`);
      for (const [key, entry] of Object.entries(item)) {
        const child = rule.properties?.[key];
        if (child) visit(entry, child, root, `${field}.${key}`);
        else if (rule.additionalProperties === false) errors.push(`${field}.${key}: not allowed`);
        else if (rule.additionalProperties && typeof rule.additionalProperties === "object") visit(entry, rule.additionalProperties, root, `${field}.${key}`);
      }
    }
  }
  if (!schema || schema.type !== "object" || !Array.isArray(schema.required) || !schema.properties) return ["invalid schema contract"];
  visit(value, schema, schema, kind);
  return errors;
}

export function validatePublishedContract(kind, value, schema = publishedSchemas[kind]) {
  if (stableJson(schema, 0) !== stableJson(publishedSchemas[kind], 0)) return ["schema differs from the runtime contract"];
  const errors = validateContractStructure(value, kind, schema);
  if (errors.length) return errors;
  return ({ project: validateProjectSemantics, task: validateTaskSemantics, evidence: validateEvidenceSemantics })[kind](value);
}

export const validateProjectManifest = (value) => validatePublishedContract("project", value);
export const validateTaskDescriptor = (value) => validatePublishedContract("task", value);
export const validateEvidence = (value) => validatePublishedContract("evidence", value);

export async function loadManifest(repo, explicitPath) {
  const manifestPath = await confineSourceFile(repo, resolveInside(repo, explicitPath ?? "tretnix.project.json", "project manifest"), undefined, "project manifest");
  const manifest = await readJson(manifestPath, "INVALID_MANIFEST_JSON");
  const errors = validateProjectManifest(manifest);
  if (errors.length) throw new TretnixError("INVALID_MANIFEST", `Invalid project manifest: ${errors.join("; ")}`, { errors });
  return { manifest, manifestPath };
}

export async function loadTask(repo, taskPath, manifest) {
  if (!taskPath) return null;
  const absolute = await confineSourceFile(repo, resolveInside(repo, taskPath, "task descriptor"), manifest, "task descriptor");
  const task = await readJson(absolute, "INVALID_TASK_JSON");
  const errors = validateTaskDescriptor(task);
  if (errors.length) throw new TretnixError("INVALID_TASK", `Invalid task descriptor: ${errors.join("; ")}`, { errors });
  return { task, taskPath: absolute };
}

export function commandForPlatform(command) {
  if (typeof command === "string") return command;
  return command?.[process.platform] ?? command?.default ?? null;
}

export function tokenizeCommand(command) {
  if (typeof command !== "string" || command.trim() === "") throw new TretnixError("UNSAFE_COMMAND", "Validator command is empty");
  if (/[\r\n;&|<>`]/.test(command)) throw new TretnixError("UNSAFE_COMMAND", "Shell operators are not allowed in validator commands");
  const tokens = [];
  let current = "";
  let quote = null;
  for (const character of command) {
    if (quote) {
      if (character === quote) quote = null;
      else current += character;
    } else if (character === '"' || character === "'") quote = character;
    else if (/\s/.test(character)) {
      if (current) {
        tokens.push(current);
        current = "";
      }
    } else current += character;
  }
  if (quote) throw new TretnixError("UNSAFE_COMMAND", "Validator command has an unterminated quote");
  if (current) tokens.push(current);
  if (!tokens.length) throw new TretnixError("UNSAFE_COMMAND", "Validator command is empty");
  return tokens;
}

export function commandExecutable(command) {
  try {
    return tokenizeCommand(command)[0] ?? null;
  } catch {
    return null;
  }
}

export function executableAvailable(executable) {
  if (!executable) return false;
  const locator = process.platform === "win32" ? "where.exe" : "which";
  return runProcess(locator, [executable]).status === 0;
}

export function forbiddenCommandReason(command) {
  const normalized = ` ${command.toLowerCase().replace(/\s+/g, " ")} `;
  const forbidden = [
    [/(^|\s)git\s+add(\s|$)/, "stage"],
    [/(^|\s)git\s+commit(\s|$)/, "commit"],
    [/(^|\s)git\s+(push|pull|fetch)(\s|$)/, "remote_git"],
    [/(^|\s)gh\s+pr\s+(create|merge)(\s|$)/, "pull_request_or_merge"],
    [/(^|\s)(deploy|publish)(\s|$)/, "deploy_or_publish"],
    [/(^|\s)(migrate|migration|db\s+push)(\s|$)/, "migration"],
    [/(^|\s)(dns|secret|secrets|provision)(\s|$)/, "infrastructure_or_secret_mutation"],
  ];
  return forbidden.find(([pattern]) => pattern.test(normalized))?.[1] ?? null;
}

function executableName(executable) {
  return path.basename(executable).toLowerCase().replace(/\.exe$/, "");
}

async function validatePackageScript(repo, executable, args, manifest) {
  const name = executableName(executable);
  let scriptName;
  if (["npm", "pnpm", "yarn"].includes(name)) {
    if (args[0] === "run" && args.length === 2) scriptName = args[1];
    else if (args.length === 1 && ["test", "build"].includes(args[0])) scriptName = args[0];
  } else if (name === "bun" && args[0] === "run" && args.length === 2) scriptName = args[1];
  if (!scriptName) throw new TretnixError("UNSAFE_COMMAND", `${name} validators must invoke one exact package script without forwarded arguments`);
  const packagePath = await resolveExistingInside(repo, "package.json", "package script manifest");
  const packageJson = await readJson(packagePath, "INVALID_PACKAGE_JSON");
  const script = packageJson.scripts?.[scriptName];
  if (typeof script !== "string") throw new TretnixError("UNSAFE_COMMAND", `Package script is missing: ${scriptName}`);
  const reason = forbiddenCommandReason(`${scriptName} ${script}`);
  if (reason) throw new TretnixError("FORBIDDEN_COMMAND", `Package script ${scriptName} requests forbidden action: ${reason}`, { action: reason });
  const inner = tokenizeCommand(script);
  const innerName = executableName(inner[0]);
  if (["powershell", "pwsh", "cmd", "bash", "sh", "zsh", "npm", "pnpm", "yarn", "bun"].includes(innerName)) throw new TretnixError("UNSAFE_COMMAND", `Nested wrapper is not allowed: ${innerName}`);
  return prepareValidatorCommand(repo, script, manifest);
}

export async function prepareValidatorCommand(repo, command, manifest) {
  const reason = forbiddenCommandReason(command);
  if (reason) throw new TretnixError("FORBIDDEN_COMMAND", `Validator command requests forbidden action: ${reason}`, { action: reason });
  const [executable, ...args] = tokenizeCommand(command);
  const name = executableName(executable);
  const reject = () => { throw new TretnixError("UNSAFE_COMMAND", `Unsupported ${name} validator argv grammar`); };
  // Executable paths and unknown profiles cannot expand the approved grammar.
  if (executable !== name && executable.toLowerCase() !== `${name}.exe`) reject();
  if (["powershell", "pwsh"].includes(name)) {
    const prefix = args.slice(0, -2).map((arg) => arg.toLowerCase());
    if (!(prefix.length === 0 || JSON.stringify(prefix) === JSON.stringify(["-noprofile", "-executionpolicy", "bypass"])) || args.at(-2)?.toLowerCase() !== "-file" || !args.at(-1)?.endsWith(".ps1")) reject();
    await confineRegularFile(repo, args.at(-1), "PowerShell validator script");
  } else if (name === "node") {
    const scripts = args[0] === "--test" || args[0] === "--check" ? args.slice(1) : args;
    if (scripts.length !== 1 || scripts[0].startsWith("-") || !/\.(mjs|cjs|js)$/.test(scripts[0])) reject();
    await confineRegularFile(repo, scripts[0], "Node validator script");
  } else if (["python", "python3"].includes(name)) {
    if (args.length !== 1 || args[0].startsWith("-") || !args[0].endsWith(".py")) reject();
    await confineRegularFile(repo, args[0], "Python validator script");
  } else if (name === "git") {
    const forms = [
      ["-c", "core.whitespace=cr-at-eol", "diff", "--check"],
      ["diff", "--check"], ["diff", "--cached", "--check"],
      ["status", "--short"], ["rev-parse", "HEAD"], ["ls-files", "-z"],
    ];
    if (!forms.some((form) => JSON.stringify(form) === JSON.stringify(args))) reject();
  } else if (["npm", "pnpm", "yarn", "bun"].includes(name)) {
    // Execute the checked inner argv directly: no lifecycle hooks or package shell.
    const inner = await validatePackageScript(repo, executable, args, manifest);
    return { ...inner, display: command };
  } else reject();
  return { executable, args, display: command, profile: name };
}

export async function safeClearCache(repo) {
  const cacheRoot = await resolveOutputInside(repo, ".tretnix/cache", "cache root");
  const expected = path.join(repo, ".tretnix", "cache");
  if (path.resolve(cacheRoot) !== path.resolve(expected)) {
    throw new TretnixError("UNSAFE_PATH", `Refusing to clear unexpected cache path: ${cacheRoot}`);
  }
  await rm(cacheRoot, { recursive: true, force: true });
  await mkdir(path.join(cacheRoot, "context"), { recursive: true });
  await mkdir(path.join(cacheRoot, "validation"), { recursive: true });
  return cacheRoot;
}
