import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import { performance } from "node:perf_hooks";
import {
  EVIDENCE_SCHEMA_VERSION,
  TASK_CLASSES,
  VALIDATION_CACHE_CONTRACT_VERSION,
  TretnixError,
  commandForPlatform,
  confineRegularFile,
  confineSourceFile,
  executableAvailable,
  pathExists,
  pathMatches,
  prepareValidatorCommand,
  readJson,
  resolveOutputInside,
  runProcess,
  sha256,
  stableJson,
  writeJsonAtomic,
} from "./core.mjs";
import { preflightRepository, repositoryFingerprint } from "./fingerprint.mjs";
import { writeEvidence } from "./evidence.mjs";

export { TASK_CLASSES };

export function effectiveTaskClasses(paths, manifest, requested) {
  if (requested) {
    if (!TASK_CLASSES.includes(requested)) throw new TretnixError("UNSUPPORTED_TASK_CLASS", `Unsupported task class: ${requested}`);
  }
  const validation = manifest.validation ?? {};
  const classes = new Set(requested ? [requested] : []);
  for (const entry of paths) {
    let matched = false;
    for (const [taskClass, prefixes] of [
      ["security_or_data", validation.security_sensitive_prefixes],
      ["release_or_infra", validation.release_or_infra_prefixes],
      ["backend", validation.backend_prefixes], ["frontend", validation.frontend_prefixes],
    ]) if (pathMatches(entry, prefixes ?? [])) { classes.add(taskClass); matched = true; }
    if (!matched) classes.add(pathMatches(entry, validation.docs_only_prefixes ?? []) ? "docs_only" : "security_or_data");
  }
  if (!classes.size) classes.add("docs_only");
  return [...classes].sort();
}

export function classifyTask(paths, manifest, requested) {
  const classes = effectiveTaskClasses(paths, manifest, requested);
  return ["security_or_data", "release_or_infra", "backend", "frontend", "docs_only"].find((entry) => classes.includes(entry));
}

function runtimeVersion(runtime) {
  if (runtime === "node") return process.version;
  if (runtime === "git") return `${runProcess("git", ["--version"]).stdout}`.trim();
  if (runtime === "powershell") return `${runProcess("powershell", ["-NoProfile", "-Command", "$PSVersionTable.PSVersion.ToString()"]).stdout}`.trim();
  if (runtime === "python") {
    const result = runProcess("python", ["--version"]);
    return `${result.stdout ?? ""}${result.stderr ?? ""}`.trim();
  }
  return `${runtime ?? "unknown"}:${process.platform}`;
}

function runId(fingerprint) {
  return `${new Date().toISOString().replace(/[:.]/g, "-")}-${fingerprint.slice(0, 12)}`;
}

export function validationPlan(manifest, taskClass) {
  const classes = Array.isArray(taskClass) ? taskClass : [taskClass];
  const unsupported = classes.filter((entry) => !manifest.validation.supported_task_classes.includes(entry));
  const supported = unsupported.length === 0;
  const matching = supported ? manifest.validation.validators.filter((validator) => validator.task_classes.includes("all") || classes.some((entry) => validator.task_classes.includes(entry))) : [];
  const required = [...new Set(classes.flatMap((entry) => manifest.validation.required_capabilities[entry] ?? []))].sort();
  const provided = [...new Set(matching.flatMap((validator) => validator.capabilities))].sort();
  const missing = [...required.filter((capability) => !provided.includes(capability)), ...unsupported.map((entry) => `unsupported_task_class:${entry}`)];
  const selectedIds = new Set(matching.map((validator) => validator.id));
  const notExecuted = manifest.validation.validators
    .filter((validator) => !selectedIds.has(validator.id))
    .map((validator) => ({ validator_id: validator.id, reason: supported ? "NOT_REQUIRED_FOR_TASK_CLASS" : "UNSUPPORTED_TASK_CLASS" }));
  return {
    supported,
    effective_classes: classes,
    required_capabilities: required,
    provided_capabilities: provided,
    missing_capabilities: missing,
    selected: matching.map((validator) => validator.id),
    not_executed: notExecuted,
    validators: matching,
  };
}

export function validationCacheKey(keyPayload) {
  return sha256(stableJson(keyPayload, 0));
}

async function cachedResult(repo, cacheDirectory, key, validator) {
  const metadataPath = path.join(cacheDirectory, "metadata.json");
  if (!(await pathExists(metadataPath))) return { hit: false, rejection: null };
  try {
    await confineRegularFile(cacheDirectory, metadataPath);
    // Legacy logs are never read, but even their presence must be confined.
    for (const name of ["stdout.log", "stderr.log"]) {
      const target = path.join(cacheDirectory, name);
      if (await pathExists(target)) await confineRegularFile(cacheDirectory, target);
    }
    const metadata = await readJson(metadataPath, "CORRUPT_CACHE");
    if (
      metadata.schema_version !== 1 ||
      metadata.cache_contract_version !== VALIDATION_CACHE_CONTRACT_VERSION ||
      metadata.key !== key ||
      metadata.validator_contract_version !== validator.contract_version ||
      metadata.exit_code !== 0 ||
      metadata.reusable !== true
    ) return { hit: false, rejection: "STALE_CACHE" };
    if (!metadata.result || metadata.result.validator_id !== validator.id || metadata.result.command !== commandForPlatform(validator.command) || metadata.result.exit_code !== 0 || metadata.result.result !== "PASS" ||
      !/^[0-9a-f]{64}$/.test(metadata.stdout_sha256 ?? "") || !/^[0-9a-f]{64}$/.test(metadata.stderr_sha256 ?? "") ||
      metadata.result_sha256 !== sha256(stableJson(metadata.result, 0)) ||
      Object.keys(metadata.result).some((name) => !["validator_id", "command", "capabilities", "exit_code", "result", "cache", "duration_ms", "timeout_ms", "cache_key", "cache_rejection", "runtime_version", "started_at", "ended_at"].includes(name))) return { hit: false, rejection: "INCOMPLETE_CACHE" };
    return { hit: true, metadata };
  } catch (error) {
    if (error.code === "UNSAFE_PATH") throw error;
    return { hit: false, rejection: error.code ?? "CORRUPT_CACHE" };
  }
}

function rejectedValidator(validator, command, code, result, rejection, details = {}) {
  return {
    validator_id: validator.id,
    command,
    capabilities: validator.capabilities,
    exit_code: code,
    result,
    cache: "MISS",
    duration_ms: 0,
    cache_rejection: rejection,
    ...details,
  };
}

function sanitizedValidatorEnv(repo) {
  const allowed = new Set(["PATH", "PATHEXT", "SYSTEMROOT", "WINDIR", "COMSPEC", "TEMP", "TMP", "USERPROFILE", "LANG", "LC_ALL"]);
  const env = {};
  for (const [key, value] of Object.entries(process.env)) if (allowed.has(key.toUpperCase()) && value !== undefined) env[key] = value;
  return {
    ...env,
    CI: "1",
    NO_COLOR: "1",
    TRETNIX_VALIDATION: "1",
    GIT_CONFIG_COUNT: "1",
    GIT_CONFIG_KEY_0: "safe.directory",
    GIT_CONFIG_VALUE_0: path.resolve(repo),
  };
}

async function executeValidator(repo, manifest, validator, fingerprint, plan) {
  const command = commandForPlatform(validator.command);
  if (!command) return rejectedValidator(validator, null, 127, "UNAVAILABLE", "NO_PLATFORM_COMMAND");
  let prepared;
  try {
    prepared = await prepareValidatorCommand(repo, command, manifest);
  } catch (error) {
    const forbiddenAction = error.code === "FORBIDDEN_COMMAND" ? error.details.action ?? "forbidden" : "unsafe_validator_command";
    return rejectedValidator(validator, command, 126, "BLOCKED", error.code ?? "UNSAFE_COMMAND", { forbidden_action: forbiddenAction });
  }
  if (!executableAvailable(prepared.executable)) return rejectedValidator(validator, command, 127, "UNAVAILABLE", "COMMAND_UNAVAILABLE");

  const runtime = runtimeVersion(validator.runtime ?? prepared.profile);
  const keyPayload = {
    repository_fingerprint: fingerprint.fingerprint,
    effective_classes: plan.effective_classes,
    required_capabilities: plan.required_capabilities,
    selected_validators: plan.selected,
    validator_id: validator.id,
    exact_command: command,
    relevant_runtime_version: runtime,
    cache_contract_version: VALIDATION_CACHE_CONTRACT_VERSION,
    validator_contract_version: validator.contract_version,
  };
  const key = validationCacheKey(keyPayload);
  const cacheDirectory = await resolveOutputInside(repo, `.tretnix/cache/validation/${key}`, "validation cache entry");
  const cacheable = validator.deterministic === true && validator.cacheable === true && fingerprint.cache_eligible;
  let cacheRejection = null;
  if (cacheable) {
    const cached = await cachedResult(repo, cacheDirectory, key, validator);
    if (cached.hit) return { ...cached.metadata.result, cache: "HIT", duration_ms: 0, cache_key: key, cache_rejection: null };
    cacheRejection = cached.rejection;
  }

  const startedAt = new Date().toISOString();
  const started = performance.now();
  const execution = runProcess(prepared.executable, prepared.args, { cwd: repo, env: sanitizedValidatorEnv(repo), timeout: validator.timeout_ms, allowTimeout: true });
  const duration = Math.round(performance.now() - started);
  const endedAt = new Date().toISOString();
  const timedOut = execution.error?.code === "ETIMEDOUT";
  const stdout = execution.stdout ?? "";
  const stderr = execution.stderr ?? "";
  await mkdir(cacheDirectory, { recursive: true });
  const exitCode = timedOut ? 124 : execution.status ?? 1;
  const result = {
    validator_id: validator.id,
    command,
    capabilities: validator.capabilities,
    exit_code: exitCode,
    result: timedOut ? "TIMEOUT" : exitCode === 0 ? "PASS" : "FAIL",
    cache: "MISS",
    duration_ms: duration,
    timeout_ms: validator.timeout_ms,
    cache_key: key,
    cache_rejection: cacheRejection,
    runtime_version: runtime,
    started_at: startedAt,
    ended_at: endedAt,
  };
  await writeJsonAtomic(path.join(cacheDirectory, "metadata.json"), {
    schema_version: 1,
    cache_contract_version: VALIDATION_CACHE_CONTRACT_VERSION,
    validator_contract_version: validator.contract_version,
    key,
    key_payload: keyPayload,
    exit_code: result.exit_code,
    reusable: cacheable && result.exit_code === 0,
    stdout_sha256: sha256(stdout),
    stderr_sha256: sha256(stderr),
    result_sha256: sha256(stableJson(result, 0)),
    result,
  }, repo);
  return result;
}

export async function validateRepository({ repo, manifest, manifestPath, task = null, taskPath = null, contextResult = null }) {
  if (task && taskPath) await confineSourceFile(repo, taskPath, manifest, "task descriptor");
  const startedAt = new Date().toISOString();
  const preflight = await preflightRepository(repo, manifest, manifestPath, { task });
  const fingerprint = preflight.fingerprint ?? await repositoryFingerprint(repo, manifest, manifestPath);
  const paths = [...new Set([...fingerprint.working_tree.staged, ...fingerprint.working_tree.unstaged, ...fingerprint.working_tree.untracked])].sort();
  const taskClass = classifyTask(paths, manifest, task?.task_class);
  const plan = validationPlan(manifest, effectiveTaskClasses(paths, manifest, task?.task_class));
  const validations = [];
  if (preflight.ok && plan.missing_capabilities.length === 0) {
    for (const validator of plan.validators) validations.push(await executeValidator(repo, manifest, validator, fingerprint, plan));
  } else {
    for (const validator of plan.validators) plan.not_executed.push({ validator_id: validator.id, reason: preflight.ok ? "MISSING_CAPABILITY" : "PREFLIGHT_FAILED" });
    plan.selected = [];
  }
  const manualGates = Object.entries(manifest.gates ?? {}).map(([id, required]) => ({ id, required, status: required ? "UNVERIFIED" : "NOT_REQUIRED" }));
  const forbiddenActions = validations.filter((entry) => entry.forbidden_action).map((entry) => `${entry.validator_id}:${entry.forbidden_action}`);
  const validationFailed = validations.some((entry) => entry.exit_code !== 0);
  const automaticGates = [
    { id: "preflight", status: preflight.ok ? "PASS" : "FAIL" },
    { id: "validation_plan", status: plan.missing_capabilities.length ? "FAIL" : "PASS" },
    ...validations.map((entry) => ({ id: `validator:${entry.validator_id}`, status: entry.exit_code === 0 ? "PASS" : "FAIL" })),
  ];
  const failed = !preflight.ok || plan.missing_capabilities.length > 0 || validationFailed;
  const evidence = {
    schema_version: EVIDENCE_SCHEMA_VERSION,
    run_id: runId(fingerprint.fingerprint),
    started_at: startedAt,
    ended_at: new Date().toISOString(),
    repository: manifest.project.repository,
    branch: preflight.identity.branch,
    head: fingerprint.head,
    fingerprint: fingerprint.fingerprint,
    fingerprint_contract_version: fingerprint.contract_version,
    task_class: taskClass,
    state_identity: {
      manifest_path: path.relative(repo, manifestPath).replaceAll("\\", "/"),
      manifest_sha256: fingerprint.manifest_sha256,
      task_path: task && taskPath ? path.relative(repo, taskPath).replaceAll("\\", "/") : null,
      task_sha256: task ? sha256(stableJson(task, 0)) : null,
    },
    preflight: { ok: preflight.ok, issues: preflight.issues },
    context: contextResult ? { cache: contextResult.cache, key: contextResult.key, source_count: contextResult.source_count, bytes: contextResult.bytes, lines: contextResult.lines } : null,
    working_tree: fingerprint.working_tree,
    sources: contextResult?.sources ?? [{ base: "repo", path: path.relative(repo, manifestPath).replaceAll("\\", "/"), display_path: "repo:tretnix.project.json", sha256: fingerprint.manifest_sha256, knowledge_commit: null, headings: [], reason: "Project manifest" }],
    validation_plan: {
      supported: plan.supported,
      effective_classes: plan.effective_classes,
      required_capabilities: plan.required_capabilities,
      provided_capabilities: plan.provided_capabilities,
      missing_capabilities: plan.missing_capabilities,
      selected: plan.selected,
      not_executed: plan.not_executed,
    },
    commands: [
      ...validations.map((entry) => ({ validator_id: entry.validator_id, command: entry.command, exit_code: entry.exit_code, status: entry.result })),
      ...plan.not_executed.map((entry) => ({ validator_id: entry.validator_id, command: null, exit_code: null, status: "NOT_RUN", reason: entry.reason })),
    ],
    cache: {
      context: contextResult?.cache ?? "NOT_RUN",
      hits: validations.filter((entry) => entry.cache === "HIT").map((entry) => entry.validator_id),
      misses: validations.filter((entry) => entry.cache === "MISS").map((entry) => entry.validator_id),
      rejections: validations.filter((entry) => entry.cache_rejection).map((entry) => `${entry.validator_id}:${entry.cache_rejection}`),
    },
    validation: validations,
    automatic_gates: automaticGates,
    manual_gates: manualGates,
    forbidden_actions_observed: forbiddenActions,
    result: failed ? "FAIL" : manualGates.some((gate) => gate.required) ? "REVIEW_REQUIRED" : "PASS",
  };
  const outputs = await writeEvidence(repo, evidence);
  return { preflight, fingerprint, taskClass, plan, validations, evidence, outputs };
}

export async function cacheStatus(repo) {
  const status = {};
  for (const kind of ["context", "validation"]) {
    const directory = await resolveOutputInside(repo, `.tretnix/cache/${kind}`, `${kind} cache directory`);
    if (!(await pathExists(directory))) status[kind] = { entries: 0 };
    else status[kind] = { entries: (await readdir(directory, { withFileTypes: true })).filter((entry) => entry.isDirectory()).length };
  }
  return status;
}
