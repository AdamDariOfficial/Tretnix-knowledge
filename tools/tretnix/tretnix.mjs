#!/usr/bin/env node
import path from "node:path";
import { pathToFileURL } from "node:url";
import {
  TretnixError,
  confineExistingPath,
  commandForPlatform,
  executableAvailable,
  effectiveValidatorCapabilities,
  prepareValidatorCommand,
  preparedExecutableAvailable,
  resolveKnowledgeRoot,
  knowledgeContractChecks,
  requireKnowledgeContracts,
  requireRuntimeIgnored,
  loadManifest,
  loadTask,
  normalizeRepositoryIdentity,
  safeClearCache,
  stableJson,
  writeJsonAtomic,
} from "./core.mjs";
import { preflightRepository, repositoryIdentity } from "./fingerprint.mjs";
import { resolveContext } from "./context.mjs";
import { cacheStatus, validateRepository } from "./validate.mjs";
import { regenerateLatestEvidence } from "./evidence.mjs";

function parseArgs(argv) {
  const [command, subcommand, ...rest] = argv;
  const options = {};
  const positional = [];
  const values = command === "cache" ? rest : [subcommand, ...rest].filter((entry) => entry !== undefined);
  for (let index = 0; index < values.length; index += 1) {
    const value = values[index];
    if (value.startsWith("--")) {
      const key = value.slice(2).replaceAll("-", "_");
      if (values[index + 1] && !values[index + 1].startsWith("--")) options[key] = values[++index];
      else options[key] = true;
    } else positional.push(value);
  }
  return { command, subcommand: command === "cache" ? subcommand : null, options, positional };
}

function usage() {
  return `Tretnix Development OS v1\n\nCommands:\n  doctor --repo <path> [--knowledge <path>]\n  preflight --repo <path> [--require-clean]\n  context --repo <path> --task <descriptor> [--knowledge <path>]\n  validate --repo <path> [--task <descriptor>] [--knowledge <path>]\n  evidence --repo <path> [--knowledge <path>]\n  cache status --repo <path>\n  cache clear --repo <path>\n`;
}

export async function preflight(repo, manifest, manifestPath, requireClean = false) {
  const result = await preflightRepository(repo, manifest, manifestPath, { requireClean });
  await writeJsonAtomic(path.join(repo, ".tretnix", "runtime", "preflight.json"), result, repo);
  return result;
}

export async function doctor(repo, manifest, manifestPath, knowledge) {
  const confinedManifestPath = await confineExistingPath(repo, manifestPath, "project manifest");
  const checks = [];
  checks.push({ id: "node", status: "PASS", version: process.version });
  checks.push({ id: "git", status: executableAvailable("git") ? "PASS" : "FAIL" });
  checks.push({ id: "manifest", status: "PASS", path: confinedManifestPath });
  const knowledgeRoot = await resolveKnowledgeRoot(repo, knowledge);
  checks.push(...await knowledgeContractChecks(knowledgeRoot));
  try {
    checks.push({ id: "runtime_ignore", status: "PASS", ...await requireRuntimeIgnored(repo) });
  } catch (error) {
    checks.push({ id: "runtime_ignore", status: "FAIL", error: error.code, message: error.message });
  }
  const identity = repositoryIdentity(repo, manifest);
  checks.push({
    id: "repository_identity",
    status: normalizeRepositoryIdentity(identity.remote) === normalizeRepositoryIdentity(manifest.project.repository) ? "PASS" : "FAIL",
    expected: manifest.project.repository,
    actual: identity.remote,
  });
  for (const validator of manifest.validation.validators) {
    const command = commandForPlatform(validator.command);
    try {
      if (!command) throw new TretnixError("COMMAND_UNAVAILABLE", "No command configured for this platform");
      const prepared = await prepareValidatorCommand(repo, command, manifest);
      effectiveValidatorCapabilities(prepared, validator);
      checks.push({ id: `command:${validator.id}`, status: preparedExecutableAvailable(prepared) ? "PASS" : "UNAVAILABLE", command, executable: prepared.executable, args: prepared.args, profile: prepared.profile });
    } catch (error) {
      const status = ["COMMAND_UNAVAILABLE", "MISSING_FILE"].includes(error.code) ? "UNAVAILABLE" : ["INVALID_PACKAGE_JSON", "INVALID_MANIFEST"].includes(error.code) ? "MALFORMED" : "UNSAFE";
      checks.push({ id: `command:${validator.id}`, status, command, error: error.code, message: error.message });
    }
  }
  return { schema_version: 1, ok: checks.every((entry) => entry.status === "PASS"), checks };
}

async function main() {
  const parsed = parseArgs(process.argv.slice(2));
  if (!parsed.command || parsed.command === "help" || parsed.options.help) {
    process.stdout.write(usage());
    return 0;
  }
  const repo = path.resolve(parsed.options.repo ?? process.cwd());
  const { manifest, manifestPath } = await loadManifest(repo, parsed.options.manifest);
  if (parsed.command === "doctor") {
    const result = await doctor(repo, manifest, manifestPath, parsed.options.knowledge);
    process.stdout.write(stableJson(result));
    return result.ok ? 0 : 2;
  }
  if (parsed.command === "preflight") {
    const result = await preflight(repo, manifest, manifestPath, parsed.options.require_clean === true);
    process.stdout.write(stableJson(result));
    return result.ok ? 0 : 2;
  }
  if (parsed.command === "context") {
    if (!parsed.options.task) throw new TretnixError("MISSING_ARGUMENT", "context requires --task <descriptor>");
    const { task, taskPath } = await loadTask(repo, parsed.options.task, manifest);
    const knowledge = await requireKnowledgeContracts(repo, parsed.options.knowledge);
    await requireRuntimeIgnored(repo);
    const gate = await preflightRepository(repo, manifest, manifestPath, { task });
    await writeJsonAtomic(path.join(repo, ".tretnix", "runtime", "preflight.json"), gate, repo);
    if (!gate.ok) throw new TretnixError("PREFLIGHT_FAILED", "Context resolution stopped because project identity/state preflight failed", { issues: gate.issues });
    const result = await resolveContext({ repo, knowledge, manifest, manifestPath, task, taskPath });
    process.stdout.write(stableJson(result));
    return 0;
  }
  if (parsed.command === "validate") {
    const knowledge = await requireKnowledgeContracts(repo, parsed.options.knowledge);
    await requireRuntimeIgnored(repo);
    const loadedTask = parsed.options.task ? await loadTask(repo, parsed.options.task, manifest) : null;
    const gate = await preflightRepository(repo, manifest, manifestPath, { task: loadedTask?.task ?? null });
    let contextResult = null;
    if (gate.ok && loadedTask) contextResult = await resolveContext({ repo, knowledge, manifest, manifestPath, task: loadedTask.task, taskPath: loadedTask.taskPath });
    const result = await validateRepository({ repo, knowledge, manifest, manifestPath, task: loadedTask?.task ?? null, taskPath: loadedTask?.taskPath ?? null, contextResult });
    process.stdout.write(stableJson({
      result: result.evidence.result,
      task_class: result.taskClass,
      fingerprint: result.fingerprint.fingerprint,
      cache: result.evidence.cache,
      evidence: path.relative(repo, result.outputs.evidencePath).replaceAll("\\", "/"),
      report: path.relative(repo, result.outputs.reportPath).replaceAll("\\", "/"),
      validation: result.validations,
    }));
    return result.evidence.result === "FAIL" ? 1 : 0;
  }
  if (parsed.command === "evidence") {
    const result = await regenerateLatestEvidence(repo, parsed.options.knowledge);
    process.stdout.write(stableJson({ evidence: result.evidencePath, report: result.reportPath, result: result.evidence.result }));
    return 0;
  }
  if (parsed.command === "cache" && ["clear", "status"].includes(parsed.subcommand)) {
    const gate = await preflightRepository(repo, manifest, manifestPath);
    if (!gate.ok) throw new TretnixError("PREFLIGHT_FAILED", "Cache command stopped because project identity/state preflight failed", { issues: gate.issues });
    if (parsed.subcommand === "clear") {
      const cleared = await safeClearCache(repo);
      process.stdout.write(stableJson({ status: "CLEARED", path: cleared }));
    } else process.stdout.write(stableJson({ schema_version: 1, cache: await cacheStatus(repo) }));
    return 0;
  }
  throw new TretnixError("UNKNOWN_COMMAND", `Unknown command: ${parsed.command}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try {
    process.exitCode = await main();
  } catch (error) {
    const code = error instanceof TretnixError ? error.code : "UNEXPECTED_ERROR";
    process.stderr.write(stableJson({ error: code, message: error.message, details: error.details ?? {} }));
    process.exitCode = 1;
  }
}
