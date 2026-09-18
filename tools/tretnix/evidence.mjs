import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import {
  EVIDENCE_SCHEMA_VERSION,
  TretnixError,
  confineRegularFile,
  confineSourceFile,
  effectiveValidatorCapabilities,
  knowledgeState,
  loadManifest,
  loadTask,
  normalizeRepositoryIdentity,
  pathExists,
  pathMatches,
  readJson,
  prepareValidatorCommand,
  requireKnowledgeContracts,
  resolveExistingInside,
  resolveOutputInside,
  requireRuntimeIgnored,
  sha256,
  stableJson,
  validateEvidence,
  writeJsonAtomic,
  writeTextAtomic,
} from "./core.mjs";
import { preflightRepository } from "./fingerprint.mjs";

export function renderEvidenceReport(evidence) {
  const lines = [
    "# Tretnix Validation Evidence",
    "",
    `- Result: \`${evidence.result}\``,
    `- Run ID: \`${evidence.run_id}\``,
    `- Started: \`${evidence.started_at}\``,
    `- Ended: \`${evidence.ended_at}\``,
    `- Repository: \`${evidence.repository}\``,
    `- Branch: \`${evidence.branch}\``,
    `- HEAD: \`${evidence.head}\``,
    `- Fingerprint: \`${evidence.fingerprint}\``,
    `- Task class: \`${evidence.task_class}\``,
    `- Preflight: \`${evidence.preflight.ok ? "PASS" : "FAIL"}\``,
    "",
    "## Working tree",
    "",
    `- Staged: ${evidence.working_tree.staged.length ? evidence.working_tree.staged.map((item) => `\`${item}\``).join(", ") : "none"}`,
    `- Unstaged: ${evidence.working_tree.unstaged.length ? evidence.working_tree.unstaged.map((item) => `\`${item}\``).join(", ") : "none"}`,
    `- Untracked: ${evidence.working_tree.untracked.length ? evidence.working_tree.untracked.map((item) => `\`${item}\``).join(", ") : "none"}`,
    `- Sensitive paths detected: ${evidence.working_tree.sensitive.length ? evidence.working_tree.sensitive.map((item) => `\`${item}\``).join(", ") : "none"}`,
    "",
    "## Context sources",
    "",
  ];
  if (evidence.sources.length) {
    lines.push("| Source | SHA-256 | Knowledge commit |", "|---|---|---|");
    for (const source of evidence.sources) lines.push(`| \`${source.display_path ?? source.path}\` | \`${source.sha256}\` | ${source.knowledge_commit ? `\`${source.knowledge_commit}\`` : "—"} |`);
  } else lines.push("No task context was materialized for this run.");
  lines.push(
    "",
    "## Validation plan",
    "",
    `- Required capabilities: ${evidence.validation_plan.required_capabilities.length ? evidence.validation_plan.required_capabilities.map((item) => `\`${item}\``).join(", ") : "none"}`,
    `- Missing capabilities: ${evidence.validation_plan.missing_capabilities.length ? evidence.validation_plan.missing_capabilities.map((item) => `\`${item}\``).join(", ") : "none"}`,
    `- Selected validators: ${evidence.validation_plan.selected.length ? evidence.validation_plan.selected.map((item) => `\`${item}\``).join(", ") : "none"}`,
    `- Effective classes: ${evidence.validation_plan.effective_classes.join(", ")}`,
    `- Not executed: ${evidence.validation_plan.not_executed.length ? evidence.validation_plan.not_executed.map((item) => `\`${item.validator_id}:${item.reason}\``).join(", ") : "none"}`,
    "",
    "## Validation",
    "",
    "| Validator | Cache | Exit code | Result | Duration ms |",
    "|---|---:|---:|---|---:|",
  );
  for (const entry of evidence.validation) {
    lines.push(`| \`${entry.validator_id}\` | ${entry.cache} | ${entry.exit_code} | ${entry.result} | ${entry.duration_ms} |`);
  }
  if (!evidence.validation.length) lines.push("| none selected | — | — | NOT_RUN | 0 |");
  lines.push("", "## Automatic gates", "", "| Gate | Status |", "|---|---|");
  for (const gate of evidence.automatic_gates) lines.push(`| ${gate.id} | ${gate.status} |`);
  lines.push("", "## Manual and live gates", "");
  if (evidence.manual_gates.length) {
    lines.push("| Gate | Required | Status |", "|---|---:|---|");
    for (const gate of evidence.manual_gates) lines.push(`| ${gate.id} | ${gate.required ? "yes" : "no"} | ${gate.status} |`);
  } else {
    lines.push("No manual or live gates are declared by the manifest.");
  }
  lines.push("", "## Cache", "");
  lines.push(`- Hits: ${evidence.cache.hits.length ? evidence.cache.hits.map((item) => `\`${item}\``).join(", ") : "none"}`);
  lines.push(`- Misses: ${evidence.cache.misses.length ? evidence.cache.misses.map((item) => `\`${item}\``).join(", ") : "none"}`);
  lines.push(`- Rejections: ${evidence.cache.rejections.length ? evidence.cache.rejections.map((item) => `\`${item}\``).join(", ") : "none"}`);
  lines.push("", "## Safety", "");
  lines.push(`- Forbidden actions observed or blocked: ${evidence.forbidden_actions_observed.length ? evidence.forbidden_actions_observed.join(", ") : "none"}`);
  lines.push("- Cache entries are derived local data and are not an authority over Git or canonical documents.");
  lines.push("- Raw validator stdout/stderr are transient only; output digests are stored in cache metadata, not raw logs.");
  return `${lines.join("\n")}\n`;
}

export async function writeEvidence(repo, evidence) {
  await requireRuntimeIgnored(repo);
  const errors = validateEvidence(evidence);
  if (errors.length) throw new TretnixError("INVALID_EVIDENCE", `Evidence does not satisfy schema v${EVIDENCE_SCHEMA_VERSION}: ${errors.join("; ")}`, { errors });
  if (!/^[0-9A-Za-z._-]+$/.test(evidence.run_id)) throw new TretnixError("UNSAFE_PATH", `Unsafe evidence run ID: ${evidence.run_id}`);
  const runDirectory = await resolveOutputInside(repo, `.tretnix/evidence/${evidence.run_id}`, "evidence run directory");
  await mkdir(runDirectory, { recursive: true });
  const evidencePath = path.join(runDirectory, "evidence.json");
  const reportPath = path.join(runDirectory, "report.md");
  await writeJsonAtomic(evidencePath, evidence, repo);
  await writeTextAtomic(reportPath, renderEvidenceReport(evidence), repo);
  await writeJsonAtomic(path.join(repo, ".tretnix", "runtime", "latest-evidence.json"), {
    schema_version: 1,
    evidence_path: path.relative(repo, evidencePath).replaceAll("\\", "/"),
    report_path: path.relative(repo, reportPath).replaceAll("\\", "/"),
  }, repo);
  return { evidencePath, reportPath };
}

export async function regenerateLatestEvidence(repo, knowledge) {
  await requireRuntimeIgnored(repo);
  const pointerPath = await resolveOutputInside(repo, ".tretnix/runtime/latest-evidence.json", "latest evidence pointer");
  if (!(await pathExists(pointerPath))) throw new TretnixError("MISSING_EVIDENCE", "No previous evidence run is available");
  await confineRegularFile(repo, pointerPath, "latest evidence pointer");
  const pointer = await readJson(pointerPath, "INVALID_EVIDENCE_POINTER");
  for (const key of ["evidence_path", "report_path"]) {
    if (typeof pointer[key] !== "string" || !pathMatches(pointer[key], [".tretnix/evidence/"])) throw new TretnixError("UNSAFE_PATH", `Latest evidence ${key} is outside .tretnix/evidence/`);
  }
  const evidencePath = await resolveExistingInside(repo, pointer.evidence_path, "latest evidence");
  await confineRegularFile(repo, evidencePath, "latest evidence");
  const evidence = await readJson(evidencePath, "INVALID_EVIDENCE_JSON");
  const errors = validateEvidence(evidence);
  if (errors.length) throw new TretnixError("INVALID_EVIDENCE", `Latest evidence is invalid: ${errors.join("; ")}`, { errors });
  const taskIdentity = evidence.state_identity;
  let manifest;
  let manifestPath;
  let loadedTask = null;
  try {
    ({ manifest, manifestPath } = await loadManifest(repo, taskIdentity.manifest_path));
    if (taskIdentity.task_path) loadedTask = await loadTask(repo, taskIdentity.task_path, manifest);
  } catch (error) {
    throw new TretnixError("STALE_EVIDENCE", "Current manifest/task is missing, unsafe or invalid; run a new validation. Historical evidence is preserved.", { cause: error.code });
  }
  const current = await preflightRepository(repo, manifest, manifestPath, { task: loadedTask?.task });
  if (!current.ok || normalizeRepositoryIdentity(evidence.repository) !== normalizeRepositoryIdentity(current.identity.remote) ||
    evidence.branch !== current.identity.branch || evidence.head !== current.fingerprint.head ||
    evidence.fingerprint !== current.fingerprint.fingerprint || evidence.fingerprint_contract_version !== current.fingerprint.contract_version ||
    taskIdentity.manifest_sha256 !== current.fingerprint.manifest_sha256 ||
    taskIdentity.task_sha256 !== (loadedTask ? sha256(stableJson(loadedTask.task, 0)) : null)) {
    throw new TretnixError("STALE_EVIDENCE", "Evidence belongs to a different repository/task state; run a new validation. Historical evidence is preserved.");
  }
  const recordedKnowledge = taskIdentity.knowledge;
  if (!recordedKnowledge || (recordedKnowledge.external && !knowledge)) {
    throw new TretnixError("STALE_EVIDENCE", "Knowledge state cannot be verified; supply --knowledge for an external checkout and run a new validation for legacy evidence.");
  }
  try {
    const knowledgeRoot = await requireKnowledgeContracts(repo, knowledge);
    const actualKnowledge = await knowledgeState(knowledgeRoot, repo);
    if (stableJson(actualKnowledge, 0) !== stableJson(recordedKnowledge, 0)) {
      throw new TretnixError("STALE_EVIDENCE", "Knowledge contracts or checkout changed; run a new validation.");
    }
    for (const source of evidence.sources.filter((entry) => entry.base === "knowledge")) {
      const file = await confineSourceFile(knowledgeRoot, source.path, manifest, "Knowledge evidence source");
      if (sha256(await readFile(file)) !== source.sha256 || source.knowledge_commit !== actualKnowledge.head) {
        throw new TretnixError("STALE_EVIDENCE", "Knowledge context source changed; run a new validation.");
      }
    }
    for (const entry of evidence.validation) {
      if (!entry.command) continue;
      const prepared = await prepareValidatorCommand(repo, entry.command, manifest);
      const validator = manifest.validation.validators.find((candidate) => candidate.id === entry.validator_id);
      if (!validator) throw new TretnixError("STALE_EVIDENCE", "Validator declaration changed; run a new validation.");
      const effective = effectiveValidatorCapabilities(prepared, validator);
      if (entry.runtime_cache_safe !== true || prepared.cacheSafe !== true || current.fingerprint.clean !== true || entry.declared_cacheable !== validator.cacheable ||
        stableJson(entry.declared_capabilities, 0) !== stableJson(validator.capabilities, 0) ||
        stableJson(entry.capabilities, 0) !== stableJson(effective, 0) ||
        entry.capability_basis !== (prepared.attestedCapabilities ? "runtime_profile" : "reviewed_script") ||
        stableJson(entry.reviewed_script, 0) !== stableJson(prepared.scriptPath ? { path: prepared.scriptPath, sha256: prepared.scriptSha256 } : null, 0)) {
        throw new TretnixError("STALE_EVIDENCE", "Validator reuse safety or capability attestation cannot be verified; run a new validation.");
      }
    }
  } catch (error) {
    if (error.code === "STALE_EVIDENCE") throw error;
    throw new TretnixError("STALE_EVIDENCE", "Knowledge or validator state cannot be verified; run a new validation. Historical evidence is preserved.", { cause: error.code });
  }
  const reportPath = await resolveOutputInside(repo, pointer.report_path, "latest evidence report");
  await writeTextAtomic(reportPath, renderEvidenceReport(evidence), repo);
  return { evidencePath, reportPath, evidence };
}
