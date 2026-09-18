import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, realpath, rename, rm, symlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { execFileSync, spawnSync } from "node:child_process";
import {
  loadManifest,
  loadTask,
  isSensitivePath,
  prepareValidatorCommand,
  effectiveValidatorCapabilities,
  readJson,
  safeClearCache,
  validateEvidence,
  validateProjectManifest,
  validateTaskDescriptor,
  validateContractStructure,
  validatePublishedContract,
  publishedSchemas,
  writeJsonAtomic,
  sha256,
  inspectPath,
  requireRuntimeIgnored,
} from "../core.mjs";
import { resolveContext } from "../context.mjs";
import { regenerateLatestEvidence, writeEvidence } from "../evidence.mjs";
import { repositoryFingerprint } from "../fingerprint.mjs";
import { cacheStatus, classifyTask, effectiveTaskClasses, validateRepository, validationCacheKey, validationPlan } from "../validate.mjs";
import { doctor, preflight } from "../tretnix.mjs";

const temporaryRoots = [];
const cliPath = path.resolve(import.meta.dirname, "..", "tretnix.mjs");

for (const state of ["tracked clean", "tracked modified", "staged", "untracked", "lockfile"]) {
  test(`Gate B R1 general fingerprint refuses internal sensitive junction: ${state}`, async () => {
    const fixture = await createFixture();
    const marker = `SYNTHETIC_GATEB_R1_${state.replaceAll(" ", "_")}`;
    const publicRoot = path.join(fixture.repo, "public");
    const privateRoot = path.join(fixture.repo, "private");
    const relative = "public/input.txt";
    await mkdir(publicRoot);
    await mkdir(privateRoot);
    await writeFile(path.join(privateRoot, "input.txt"), marker);
    await writeFile(path.join(publicRoot, "input.txt"), state === "tracked clean" ? marker : "original safe bytes");
    await writeFile(path.join(fixture.repo, ".gitignore"), ".tretnix/\n.env*\nprivate/\n");
    if (state === "lockfile") {
      fixture.manifest.validation.lockfiles = [relative];
      await writeJsonAtomic(fixture.manifestPath, fixture.manifest, fixture.repo);
    }
    git(fixture.repo, "add", ".");
    if (["untracked", "lockfile"].includes(state)) git(fixture.repo, "rm", "--cached", relative);
    git(fixture.repo, "commit", "-m", "test: prepare internal alias fixture");
    const baseline = await repositoryFingerprint(fixture.repo, fixture.manifest, fixture.manifestPath);
    if (state === "staged") {
      await writeFile(path.join(publicRoot, "input.txt"), "safe staged delta");
      git(fixture.repo, "add", relative);
    }
    await rename(publicRoot, path.join(path.dirname(fixture.repo), "saved-public"));
    await symlink(privateRoot, publicRoot, "junction");
    let safeReads = 0;
    let sensitiveByteReads = 0;
    let contentDiffCalls = 0;
    const result = await repositoryFingerprint(fixture.repo, fixture.manifest, fixture.manifestPath, {
      readBytes: async (target) => {
        const actual = await realpath(target);
        if (actual === privateRoot || actual.startsWith(`${privateRoot}${path.sep}`)) {
          sensitiveByteReads += 1;
          throw new Error("Sensitive byte reader reached");
        }
        safeReads += 1;
        return readFile(target);
      },
      contentDiff: () => { contentDiffCalls += 1; throw new Error("Content diff reached"); },
    });
    assert.ok(safeReads > 0);
    assert.equal(sensitiveByteReads, 0);
    assert.equal(contentDiffCalls, 0);
    assert.equal(result.cache_eligible, false);
    assert.equal(result.clean, false);
    assert.notEqual(result.fingerprint, baseline.fingerprint);
    assert.equal(result.payload.staged_diff_sha256, null);
    assert.equal(result.payload.unstaged_diff_sha256, null);
    assert.ok(result.working_tree.sensitive.some((entry) => entry.startsWith("public")));
    assert.ok(result.unreadable_paths.some((entry) => entry.path.startsWith("public") && entry.sensitive && entry.aliases.includes("public") && entry.real_path.startsWith("private")));
    assert.ok(!JSON.stringify(result).includes(marker));
    assert.ok(!JSON.stringify(result).includes(sha256(marker)));
    if (state === "staged") assert.ok(result.working_tree.staged.includes(relative));
    if (state === "lockfile") assert.equal(result.lockfiles.find((entry) => entry.path === relative).sha256, null);
    const preflightResult = await preflight(fixture.repo, fixture.manifest, fixture.manifestPath);
    assert.equal(preflightResult.ok, false);
    const validation = await validateRepository(fixture);
    assert.equal(validation.validations.length, 0);
    assert.equal(validation.evidence.result, "FAIL");
    const serialized = await readFile(validation.outputs.evidencePath, "utf8");
    assert.ok(!serialized.includes(marker) && !serialized.includes(sha256(marker)));
  });
}

test("Gate B R1 benign and dangling internal aliases remain non-cacheable and observable", async () => {
  const fixture = await createFixture();
  await mkdir(path.join(fixture.repo, "public"));
  await writeFile(path.join(fixture.repo, "public", "input.txt"), "safe");
  git(fixture.repo, "add", ".");
  git(fixture.repo, "commit", "-m", "test: prepare benign alias");
  await rename(path.join(fixture.repo, "public"), path.join(fixture.repo, "other"));
  await symlink(path.join(fixture.repo, "other"), path.join(fixture.repo, "public"), "junction");
  const first = await repositoryFingerprint(fixture.repo, fixture.manifest, fixture.manifestPath);
  assert.equal(first.cache_eligible, false);
  assert.ok(first.unreadable_paths.some((entry) => entry.path === "public/input.txt" && !entry.sensitive));
  await rm(path.join(fixture.repo, "other"), { recursive: true });
  const second = await repositoryFingerprint(fixture.repo, fixture.manifest, fixture.manifestPath);
  assert.equal(second.cache_eligible, false);
  assert.notEqual(first.fingerprint, second.fingerprint);
  assert.ok(second.unreadable_paths.some((entry) => !entry.exists && entry.aliases.includes("public")));
});

for (const pattern of ["private/**", "private/input.txt"]) {
  test(`Gate B R1 real target sensitivity respects declared pattern ${pattern}`, async () => {
    const fixture = await createFixture();
    fixture.manifest.validation.sensitive_path_prefixes = [pattern];
    await mkdir(path.join(fixture.repo, "public"));
    await mkdir(path.join(fixture.repo, "private"));
    await writeFile(path.join(fixture.repo, "public/input.txt"), "safe");
    await writeFile(path.join(fixture.repo, "private/input.txt"), "SYNTHETIC_PATTERN_SECRET");
    git(fixture.repo, "add", "public/input.txt");
    git(fixture.repo, "commit", "-m", "test: prepare declared pattern alias");
    await rename(path.join(fixture.repo, "public"), path.join(path.dirname(fixture.repo), "saved-public"));
    await symlink(path.join(fixture.repo, "private"), path.join(fixture.repo, "public"), "junction");
    const result = await repositoryFingerprint(fixture.repo, fixture.manifest, fixture.manifestPath, {
      readBytes: (target) => {
        assert.ok(!target.includes(`${path.sep}public${path.sep}`) && !target.includes(`${path.sep}private${path.sep}`));
        return readFile(target);
      },
      contentDiff: () => { throw new Error("Content diff reached"); },
    });
    assert.equal(result.cache_eligible, false);
    assert.ok(result.working_tree.sensitive.includes("public/input.txt"));
    assert.ok(result.unreadable_paths.some((entry) => entry.path === "public/input.txt" && entry.sensitive));
    assert.ok(!JSON.stringify(result).includes(sha256("SYNTHETIC_PATTERN_SECRET")));
  });
}

for (const runtimePath of [".tretnix", ".tretnix/cache", ".tretnix/cache/context", ".tretnix/cache/validation", ".tretnix/runtime", ".tretnix/evidence"]) {
  test(`Gate B R1 runtime namespace rejects internal junction at ${runtimePath} and preserves tracked source`, async () => {
    const fixture = await createFixture();
    const sourceRoot = path.join(fixture.repo, "public");
    const sentinelRelative = "public/cache/tracked-source.txt";
    const sentinel = path.join(fixture.repo, sentinelRelative);
    await mkdir(path.dirname(sentinel), { recursive: true });
    await writeFile(sentinel, "SYNTHETIC_TRACKED_SOURCE_SENTINEL");
    git(fixture.repo, "add", ".");
    git(fixture.repo, "commit", "-m", "test: prepare runtime source sentinel");
    const normal = await validateRepository(fixture);
    const context = await resolveContext(fixture);
    const alias = path.join(fixture.repo, runtimePath);
    await rename(alias, path.join(path.dirname(fixture.repo), "saved-runtime"));
    await symlink(sourceRoot, alias, "junction");
    const initialSourceStatus = git(fixture.repo, "status", "--short", "--", "public");
    const unsafe = (error) => error.code === "UNSAFE_PATH" && /alias|reparse/.test(error.message);
    await assert.rejects(() => safeClearCache(fixture.repo), unsafe);
    await assert.rejects(() => cacheStatus(fixture.repo), unsafe);
    await assert.rejects(() => resolveContext(fixture), unsafe);
    await assert.rejects(() => validateRepository(fixture), unsafe);
    await assert.rejects(() => regenerateLatestEvidence(fixture.repo), unsafe);
    await assert.rejects(() => writeEvidence(fixture.repo, normal.evidence), unsafe);
    await assert.rejects(() => writeJsonAtomic(path.join(fixture.repo, ".tretnix/runtime/probe.json"), {}, fixture.repo), unsafe);
    assert.equal(await readFile(sentinel, "utf8"), "SYNTHETIC_TRACKED_SOURCE_SENTINEL");
    assert.equal(git(fixture.repo, "ls-files", "--", sentinelRelative), sentinelRelative);
    assert.equal(git(fixture.repo, "status", "--short", "--", "public"), initialSourceStatus);
    assert.equal(initialSourceStatus, "");
    assert.ok(!git(fixture.repo, "status", "--short").split("\n").some((line) => /^ D|^D /.test(line)));
    assert.ok(context.output.startsWith(path.join(fixture.repo, ".tretnix")));
  });
}

test("Gate B R1 canonical runtime namespace supports normal cache and evidence lifecycle", async () => {
  const fixture = await createFixture();
  addReusableGitValidator(fixture);
  await safeClearCache(fixture.repo);
  assert.equal((await inspectPath(fixture.repo, ".tretnix")).aliased, false);
  assert.equal((await resolveContext(fixture)).cache, "MISS");
  assert.equal((await resolveContext(fixture)).cache, "HIT");
  const first = await validateRepository(fixture);
  const second = await validateRepository(fixture);
  assert.equal(first.validations[0].cache, "MISS");
  assert.equal(second.validations[0].cache, "MISS");
  assert.equal(second.validations[1].cache, "HIT");
  await assert.rejects(() => regenerateLatestEvidence(fixture.repo), { code: "STALE_EVIDENCE" });
  await safeClearCache(fixture.repo);
  assert.equal((await cacheStatus(fixture.repo)).context.entries, 0);
  assert.ok((await readFile(second.outputs.evidencePath)).length > 0);
  assert.ok((await readFile(second.outputs.reportPath)).length > 0);
});

function git(repo, ...args) {
  return execFileSync("git", ["-C", repo, ...args], { encoding: "utf8" }).trim();
}

async function createFixture(name = "repo with spaces") {
  const parent = await mkdtemp(path.join(os.tmpdir(), "tretnix-os-tests-"));
  temporaryRoots.push(parent);
  const repo = path.join(parent, name);
  await mkdir(repo, { recursive: true });
  git(repo, "init", "-b", "main");
  git(repo, "config", "user.email", "tests@tretnix.invalid");
  git(repo, "config", "user.name", "Tretnix Tests");
  git(repo, "config", "core.autocrlf", "false");
  git(repo, "remote", "add", "origin", "https://github.com/AdamDariOfficial/Tretnix-knowledge.git");
  const manifest = {
    $schema: "schemas/tretnix-project.schema.json",
    schema_version: 1,
    project: {
      id: "example",
      family: "tretnix",
      plan: "internal",
      repository: "AdamDariOfficial/Tretnix-knowledge",
      default_branch: "main",
      allowed_branch_prefixes: ["test/"],
    },
    sources: { agents: ["AGENTS.md"], status: ["STATUS.md"], local_decisions: [], knowledge_tags: ["docs_only", "security"] },
    context: {
      knowledge_root: ".",
      compact_adapters: [],
      source_allowlists: {
        repo: ["AGENTS.md", "STATUS.md", "STANDARDS.md", "task.json", "docs/**"],
        knowledge: ["AGENTS.md", "STATUS.md", "STANDARDS.md", "task.json", "docs/**"],
      },
      tag_sources: {
        docs_only: [],
        security: [{ base: "knowledge", path: "STANDARDS.md", sections: ["## Security"], reason: "security rules" }],
      },
    },
    commands: { install: null, typecheck: null, lint: null, test: null, build: null },
    validation: {
      lockfiles: [],
      generated_paths: ["dist/generated.txt"],
      sensitive_path_prefixes: ["private/", "secrets/"],
      security_sensitive_prefixes: ["server/", "tretnix.project.json"],
      docs_only_prefixes: ["docs/", "AGENTS.md", "STATUS.md", "STANDARDS.md"],
      frontend_prefixes: ["ui/"],
      backend_prefixes: ["api/"],
      release_or_infra_prefixes: ["infra/"],
      supported_task_classes: ["docs_only", "security_or_data", "release_or_infra"],
      required_capabilities: {
        docs_only: ["static", "whitespace"],
        security_or_data: ["static", "test", "security", "whitespace"],
        release_or_infra: ["static", "test", "config", "whitespace"],
      },
      allowed_executables: [],
      validators: [
        {
          id: "fixture-pass",
          command: "node fixture-validator.mjs",
          runtime: "node",
          task_classes: ["all"],
          capabilities: ["static", "whitespace", "test", "security", "config"],
          reviewed_script: { validator_id: "fixture-pass", path: "fixture-validator.mjs", sha256: sha256("process.stdout.write('fixture pass\\n');\n"), capabilities: ["static", "whitespace", "test", "security", "config"] },
          deterministic: true,
          cacheable: true,
          contract_version: "1.1.0",
          timeout_ms: 30000,
        },
      ],
    },
    gates: { browser: true, backend: false, staging: true, production: true },
    forbidden_automatic_actions: ["stage", "commit", "push", "pull_request", "merge", "deploy", "publish", "migration", "dns", "infrastructure_mutation", "provisioning", "secret_mutation", "production_write"],
  };
  const task = {
    task_version: 1,
    title: "Fixture task",
    repository: "example",
    objective: "Exercise deterministic context and validation.",
    tags: ["docs_only"],
    task_class: "docs_only",
    risk: "low",
    writer: "codex",
    allowed_scope: ["docs/"],
    forbidden: ["deploy"],
    required_outputs: ["evidence"],
    working_tree: "dirty_allowed",
  };
  await writeFile(path.join(repo, ".gitignore"), ".tretnix/\n.env*\n", "utf8");
  await writeFile(path.join(repo, "AGENTS.md"), "# Agents\n\nRules.\n", "utf8");
  await writeFile(path.join(repo, "STATUS.md"), "# Status\n\nCurrent.\n", "utf8");
  await writeFile(path.join(repo, "STANDARDS.md"), "# Standards\n\n## Security\n\nSecure.\n\n## Other\n\nOther.\n", "utf8");
  await writeFile(path.join(repo, "fixture-validator.mjs"), "process.stdout.write('fixture pass\\n');\n", "utf8");
  await mkdir(path.join(repo, "schemas"), { recursive: true });
  for (const kind of ["project", "task", "evidence"]) await writeFile(path.join(repo, "schemas", `tretnix-${kind}.schema.json`), JSON.stringify(publishedSchemas[kind]), "utf8");
  await writeJsonAtomic(path.join(repo, "tretnix.project.json"), manifest, repo);
  await writeJsonAtomic(path.join(repo, "task.json"), task, repo);
  await mkdir(path.join(repo, "templates"), { recursive: true });
  await writeJsonAtomic(path.join(repo, "templates", "TRETNIX_PROJECT_MANIFEST.json"), manifest, repo);
  await writeJsonAtomic(path.join(repo, "templates", "TRETNIX_TASK_DESCRIPTOR.json"), task, repo);
  await writeJsonAtomic(path.join(repo, "templates", "TRETNIX_EVIDENCE_SCHEMA.json"), {
    schema_version: 1,
    run_id: "fixture",
    started_at: "2026-09-14T00:00:00.000Z",
    ended_at: "2026-09-14T00:00:01.000Z",
    repository: "AdamDariOfficial/Tretnix-knowledge",
    branch: "main",
    head: "0".repeat(40),
    fingerprint: "0".repeat(64),
    fingerprint_contract_version: "1.1.0",
    task_class: "docs_only",
    state_identity: { manifest_path: "tretnix.project.json", manifest_sha256: "0".repeat(64), task_path: null, task_sha256: null },
    preflight: { ok: true, issues: [] },
    context: null,
    working_tree: { staged: [], unstaged: [], untracked: [], sensitive: [] },
    sources: [],
    validation_plan: { supported: true, effective_classes: ["docs_only"], required_capabilities: ["static", "whitespace"], provided_capabilities: ["static", "whitespace"], missing_capabilities: [], selected: [], not_executed: [] },
    commands: [],
    cache: { context: "NOT_RUN", hits: [], misses: [], rejections: [] },
    validation: [],
    automatic_gates: [{ id: "preflight", status: "PASS" }],
    manual_gates: [{ id: "browser", required: false, status: "UNVERIFIED" }],
    forbidden_actions_observed: [],
    result: "PASS",
  }, repo);
  git(repo, "add", ".");
  git(repo, "commit", "-m", "test: create fixture");
  return { repo, manifestPath: path.join(repo, "tretnix.project.json"), taskPath: path.join(repo, "task.json"), manifest, task };
}

test.after(async () => {
  for (const root of temporaryRoots) await rm(root, { recursive: true, force: true });
});

test("Gate B sensitive staged and unstaged paths never reach content readers", async () => {
  const fixture = await createFixture();
  const secretPath = path.join(fixture.repo, ".env.local");
  await writeFile(secretPath, "SYNTHETIC_SECRET_FIRST");
  git(fixture.repo, "add", "-f", ".env.local");
  const reads = [];
  const readers = {
    contentDiff: () => assert.fail("Sensitive presence must abort every content diff"),
    readBytes: async (target) => {
      reads.push(target);
      assert.notEqual(target, secretPath, "Sensitive bytes must never be read");
      return readFile(target);
    },
  };
  const staged = await repositoryFingerprint(fixture.repo, fixture.manifest, fixture.manifestPath, readers);
  assert.equal(staged.cache_eligible, false);
  assert.equal(staged.payload.staged_diff_sha256, null);
  git(fixture.repo, "commit", "-m", "test: track synthetic sensitive fixture");
  await writeFile(secretPath, "SYNTHETIC_SECRET_SECOND");
  const unstaged = await repositoryFingerprint(fixture.repo, fixture.manifest, fixture.manifestPath, readers);
  assert.equal(unstaged.cache_eligible, false);
  assert.equal(unstaged.payload.unstaged_diff_sha256, null);
  assert.ok(reads.length > 0, "Reader instrumentation must actually run for safe files");
});

for (const [label, commands] of [
  ["eval equals", ["node --eval=process.exit(0) fixture-validator.mjs", "node --eval process.exit(0) fixture-validator.mjs"]],
  ["concatenated short eval", ["node -eprocess.exit(0) fixture-validator.mjs", "node -p1 fixture-validator.mjs"]],
  ["Python inline and module", ["python -cprint(1) fixture.py", "python -c print(1) fixture.py", "python -mfixture fixture.py", "python -Im fixture.py"]],
  ["preload loader import and arbitrary flags", ["node --require=fixture-validator.mjs fixture-validator.mjs", "node -rfixture-validator.mjs fixture-validator.mjs", "node --loader=fixture-validator.mjs fixture-validator.mjs", "node --import=fixture-validator.mjs fixture-validator.mjs", "node --inspect fixture-validator.mjs", "powershell -NoProfile -File fixture.ps1 -Command echo", "pwsh -File fixture.ps1 -ecZ2l0"]],
]) test(`Gate B argv rejects ${label}`, async () => {
  const fixture = await createFixture();
  await writeFile(path.join(fixture.repo, "fixture.py"), "print(1)");
  await writeFile(path.join(fixture.repo, "fixture.ps1"), "Write-Output 'fixture'");
  for (const command of commands) await assert.rejects(() => prepareValidatorCommand(fixture.repo, command, fixture.manifest), (error) => error.code === "UNSAFE_COMMAND", command);
});

test("Gate B argv accepts only necessary local forms and unwraps packages without hooks", async () => {
  const fixture = await createFixture();
  await writeFile(path.join(fixture.repo, "fixture.py"), "print(1)");
  await writeFile(path.join(fixture.repo, "fixture.ps1"), "Write-Output 'fixture'");
  for (const command of ["node fixture-validator.mjs", "node --check fixture-validator.mjs", "node --test fixture-validator.mjs", "python fixture.py", "powershell -NoProfile -ExecutionPolicy Bypass -File fixture.ps1", "git -c core.whitespace=cr-at-eol diff --check"]) assert.ok((await prepareValidatorCommand(fixture.repo, command, fixture.manifest)).args.length > 0);
  await writeJsonAtomic(path.join(fixture.repo, "package.json"), { scripts: { test: "node fixture-validator.mjs", pretest: "git push" } }, fixture.repo);
  const prepared = await prepareValidatorCommand(fixture.repo, "npm run test", fixture.manifest);
  assert.equal(prepared.executable, "node");
  assert.deepEqual(prepared.args, ["fixture-validator.mjs"]);
  fixture.manifest.validation.allowed_executables = ["rm"];
  for (const command of ["rm victim.txt", "git -c alias.diff=!echo diff --check", "git diff --output=victim.txt", "node fixture-validator.mjs --eval=1"]) await assert.rejects(() => prepareValidatorCommand(fixture.repo, command, fixture.manifest), (error) => error.code === "UNSAFE_COMMAND");
});

for (const artifact of ["TASK_CONTEXT.md", "metadata.json"]) test(`Gate B context child ${artifact} junction escape fails before read`, async () => {
  const fixture = await createFixture();
  const context = await resolveContext(fixture);
  const directory = path.join(fixture.repo, ".tretnix", "cache", "context", context.key);
  const outside = path.join(path.dirname(fixture.repo), "outside-cache");
  await mkdir(outside);
  await writeFile(path.join(outside, artifact), "SYNTHETIC_OUTSIDE_SECRET");
  const child = path.join(directory, artifact);
  await rm(child);
  await symlink(outside, child, "junction");
  await assert.rejects(() => resolveContext(fixture), (error) => error.code === "UNSAFE_PATH");
  assert.equal(await readFile(path.join(outside, artifact), "utf8"), "SYNTHETIC_OUTSIDE_SECRET");
});

for (const artifact of ["metadata.json", "stdout.log", "stderr.log"]) test(`Gate B validation child ${artifact} junction escape fails closed`, async () => {
  const fixture = await createFixture();
  addReusableGitValidator(fixture);
  const first = await validateRepository(fixture);
  const directory = path.join(fixture.repo, ".tretnix", "cache", "validation", first.validations[1].cache_key);
  const outside = path.join(path.dirname(fixture.repo), "outside-validation");
  await mkdir(outside);
  const child = path.join(directory, artifact);
  await rm(child, { force: true });
  await symlink(outside, child, "junction");
  await assert.rejects(() => validateRepository(fixture), (error) => error.code === "UNSAFE_PATH");
});

test("Gate B non-regular context cache child fails closed", async () => {
  const fixture = await createFixture();
  const context = await resolveContext(fixture);
  const child = path.join(fixture.repo, ".tretnix", "cache", "context", context.key, "metadata.json");
  await rm(child);
  await mkdir(child);
  await assert.rejects(() => resolveContext(fixture), (error) => error.code === "UNSAFE_PATH");
});

test("Gate B requested docs cannot downgrade security and changed plan invalidates cache", async () => {
  const fixture = await createFixture();
  const first = await validateRepository(fixture);
  await mkdir(path.join(fixture.repo, "server"));
  await writeFile(path.join(fixture.repo, "server", "auth.mjs"), "export const secure = true;");
  const second = await validateRepository(fixture);
  assert.equal(second.taskClass, "security_or_data");
  assert.ok(second.plan.required_capabilities.includes("security"));
  assert.ok(second.plan.effective_classes.includes("docs_only"));
  assert.equal(second.validations[0].cache, "MISS");
  assert.notEqual(first.validations[0].cache_key, second.validations[0].cache_key);
  const raised = await validateRepository({ ...fixture, task: { ...fixture.task, task_class: "release_or_infra" } });
  assert.ok(raised.plan.required_capabilities.includes("config"));
  assert.notEqual(raised.validations[0].cache_key, second.validations[0].cache_key);
});

test("Gate B mixed release and security requires the union and both validators", async () => {
  const fixture = await createFixture();
  fixture.manifest.validation.validators = [
    { ...fixture.manifest.validation.validators[0], id: "security", task_classes: ["security_or_data"], capabilities: ["static", "test", "security", "whitespace"], reviewed_script: { ...fixture.manifest.validation.validators[0].reviewed_script, validator_id: "security", capabilities: ["static", "test", "security", "whitespace"] } },
    { ...fixture.manifest.validation.validators[0], id: "release", task_classes: ["release_or_infra"], capabilities: ["static", "test", "config", "whitespace"], reviewed_script: { ...fixture.manifest.validation.validators[0].reviewed_script, validator_id: "release", capabilities: ["static", "test", "config", "whitespace"] } },
  ];
  const classes = effectiveTaskClasses(["server/auth.mjs", "infra/config.json"], fixture.manifest, "docs_only");
  const plan = await validationPlan(fixture.repo, fixture.manifest, classes);
  assert.deepEqual(plan.selected, ["security", "release"]);
  assert.deepEqual(plan.missing_capabilities, []);
  assert.ok(plan.required_capabilities.includes("security") && plan.required_capabilities.includes("config"));
  for (const directory of ["server", "infra"]) await mkdir(path.join(fixture.repo, directory));
  await writeFile(path.join(fixture.repo, "server", "auth.mjs"), "export const secure = true;");
  await writeFile(path.join(fixture.repo, "infra", "config.json"), "{}");
  const result = await validateRepository(fixture);
  assert.deepEqual(result.evidence.validation_plan.effective_classes, classes);
  assert.deepEqual(result.validations.map((entry) => entry.validator_id), ["security", "release"]);
  fixture.manifest.validation.validators.pop();
  const missing = await validationPlan(fixture.repo, fixture.manifest, classes);
  assert.ok(missing.missing_capabilities.includes("config"));
});

for (const change of ["working tree", "branch", "HEAD", "manifest", "task", "remote"]) test(`Gate B PASS evidence rejects stale ${change} and preserves history`, async () => {
  const fixture = await createFixture();
  fixture.manifest.gates = { browser: false, backend: false, staging: false, production: false };
  await writeJsonAtomic(fixture.manifestPath, fixture.manifest, fixture.repo);
  const result = await validateRepository(fixture);
  assert.equal(result.evidence.result, "PASS");
  await assert.rejects(() => regenerateLatestEvidence(fixture.repo), { code: "STALE_EVIDENCE" });
  const originalEvidence = await readFile(result.outputs.evidencePath);
  const originalReport = await readFile(result.outputs.reportPath);
  if (change === "working tree") await writeFile(path.join(fixture.repo, "new.txt"), "delta");
  if (change === "branch") git(fixture.repo, "switch", "-c", "test/stale");
  if (change === "HEAD") git(fixture.repo, "commit", "--allow-empty", "-m", "test: advance HEAD");
  if (change === "manifest") { fixture.manifest.project.plan = "changed"; await writeJsonAtomic(fixture.manifestPath, fixture.manifest, fixture.repo); }
  if (change === "task") { fixture.task.title = "changed"; await writeJsonAtomic(fixture.taskPath, fixture.task, fixture.repo); }
  if (change === "remote") git(fixture.repo, "remote", "set-url", "origin", "https://github.com/owner/wrong.git");
  await assert.rejects(() => regenerateLatestEvidence(fixture.repo), (error) => error.code === "STALE_EVIDENCE");
  const cli = spawnSync(process.execPath, [cliPath, "evidence", "--repo", fixture.repo], { encoding: "utf8" });
  assert.equal(cli.status, 1);
  assert.equal(JSON.parse(cli.stderr).error, "STALE_EVIDENCE");
  assert.deepEqual(await readFile(result.outputs.evidencePath), originalEvidence);
  assert.deepEqual(await readFile(result.outputs.reportPath), originalReport);
});

test("Gate B published contracts and runtime conform on templates and mutations", async () => {
  const fixture = await createFixture();
  const { evidence } = await validateRepository(fixture);
  const validators = { project: validateProjectManifest, task: validateTaskDescriptor, evidence: validateEvidence };
  for (const [kind, value, mutations] of [
    ["project", fixture.manifest, [(x) => delete x.validation.lockfiles, (x) => x.validation.validators[0].id = "BAD ID", (x) => x.context.knowledge_root = "../outside", (x) => x.commands.test = 7, (x) => x.sources.status = ["../outside"], (x) => x.sources.agents = ["\u0000"], (x) => x.project.id = " ", (x) => x.validation.required_capabilities.docs_only = [], (x) => x.forbidden_automatic_actions.pop()]],
    ["task", fixture.task, [(x) => delete x.task_class, (x) => delete x.working_tree, (x) => x.tags = [""], (x) => x.extra = true, (x) => x.required_sources = [{ path: "../outside" }]]],
    ["evidence", evidence, [(x) => x.working_tree.staged = ["../outside"], (x) => x.validation[0].stdout_log = ".tretnix/cache/validation/raw.log", (x) => x.context = {}, (x) => x.started_at = "2026-09-14T00:00:00+02:00", (x) => x.result = "PASS", (x) => x.validation_plan.effective_classes = [], (x) => delete x.state_identity]],
  ]) {
    const schema = JSON.parse(await readFile(path.join(fixture.repo, "schemas", `tretnix-${kind}.schema.json`), "utf8"));
    assert.deepEqual(validateContractStructure(value, kind, schema), []);
    assert.deepEqual(validatePublishedContract(kind, value, schema), validators[kind](value));
    for (const [index, mutate] of mutations.entries()) {
      const candidate = structuredClone(value); mutate(candidate);
      const structuralErrors = validateContractStructure(candidate, kind, schema);
      if (kind === "evidence" && index === 4) {
        assert.deepEqual(structuralErrors, [], "Result/gate coherence is an explicitly declared Tretnix semantic invariant");
        assert.ok(schema["x-tretnix-semantics"].some((rule) => rule.startsWith("result is FAIL")));
      } else assert.ok(structuralErrors.length > 0, `${kind}: published structure must independently reject mutation ${index}`);
      const schemaErrors = validatePublishedContract(kind, candidate, schema);
      assert.ok(schemaErrors.length > 0, `${kind}: mutation must be rejected`);
      assert.deepEqual(schemaErrors, validators[kind](candidate));
    }
  }
  const platform = structuredClone(fixture.manifest); platform.commands.test = { win32: "node fixture-validator.mjs", default: "node fixture-validator.mjs" };
  assert.deepEqual(validateProjectManifest(platform), []);
});

test("Gate B doctor rejects valid JSON that is not the actual schema contract", async () => {
  const fixture = await createFixture();
  assert.equal((await doctor(fixture.repo, fixture.manifest, fixture.manifestPath)).ok, true);
  await writeFile(path.join(fixture.repo, "schemas", "tretnix-task.schema.json"), "{}");
  const invalid = await doctor(fixture.repo, fixture.manifest, fixture.manifestPath);
  assert.equal(invalid.ok, false);
  assert.equal(invalid.checks.find((entry) => entry.id === "task_schema").status, "FAIL");
});

test("Gate B local decisions enter Layer A and invalidate context cache", async () => {
  const fixture = await createFixture();
  fixture.manifest.sources.local_decisions = ["docs/DECISIONS.md"];
  await mkdir(path.join(fixture.repo, "docs"));
  await writeFile(path.join(fixture.repo, "docs", "DECISIONS.md"), "# Approved decision\n\nLOCAL_DECISION_MARKER");
  await writeJsonAtomic(fixture.manifestPath, fixture.manifest, fixture.repo);
  const first = await resolveContext(fixture);
  assert.match(await readFile(first.output, "utf8"), /LOCAL_DECISION_MARKER/);
  assert.equal(first.sources.find((entry) => entry.path === "docs/DECISIONS.md").reason, "Layer A approved local decisions");
  await writeFile(path.join(fixture.repo, "docs", "DECISIONS.md"), "# Approved decision\n\nUPDATED_DECISION");
  const second = await resolveContext(fixture);
  assert.notEqual(first.key, second.key);
  assert.equal(second.cache, "MISS");
});

test("Gate B tracked LF and CRLF differ even when Git normalizes both as clean", async () => {
  const fixture = await createFixture();
  git(fixture.repo, "config", "core.autocrlf", "true");
  await writeFile(path.join(fixture.repo, ".gitattributes"), "STATUS.md text eol=crlf\n");
  git(fixture.repo, "add", ".gitattributes", "STATUS.md");
  git(fixture.repo, "commit", "-m", "test: normalized tracked EOL");
  await writeFile(path.join(fixture.repo, "STATUS.md"), "# Status\n\nCurrent.\n");
  assert.equal(git(fixture.repo, "diff", "--name-only"), "");
  const lf = await repositoryFingerprint(fixture.repo, fixture.manifest, fixture.manifestPath);
  await writeFile(path.join(fixture.repo, "STATUS.md"), "# Status\r\n\r\nCurrent.\r\n");
  assert.equal(git(fixture.repo, "diff", "--name-only"), "");
  const crlf = await repositoryFingerprint(fixture.repo, fixture.manifest, fixture.manifestPath);
  assert.equal(lf.clean, true); assert.equal(crlf.clean, true);
  assert.notEqual(lf.fingerprint, crlf.fingerprint);
});

test("Gate B synthetic stdout and stderr secrets are never persisted", async () => {
  const fixture = await createFixture();
  const marker = "SYNTHETIC_SECRET_DO_NOT_PERSIST_90210";
  await writeFile(path.join(fixture.repo, "fixture-validator.mjs"), `process.stdout.write('${marker}'); process.stderr.write('${marker}');\n`);
  fixture.manifest.validation.validators[0].reviewed_script.sha256 = sha256(`process.stdout.write('${marker}'); process.stderr.write('${marker}');\n`);
  const first = await validateRepository(fixture);
  assert.equal(first.validations[0].result, "PASS");
  async function inspect(directory) {
    const { readdir } = await import("node:fs/promises");
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const target = path.join(directory, entry.name);
      if (entry.isDirectory()) await inspect(target);
      else { assert.doesNotMatch(await readFile(target, "utf8"), new RegExp(marker)); assert.ok(!entry.name.endsWith(".log")); }
    }
  }
  await inspect(path.join(fixture.repo, ".tretnix"));
  const second = await validateRepository(fixture);
  assert.equal(second.validations[0].cache, "MISS");
  await inspect(path.join(fixture.repo, ".tretnix"));
});

test("Gate B evidence template obeys automatic and manual result semantics", async () => {
  const template = JSON.parse(await readFile(new URL("../../../templates/TRETNIX_EVIDENCE_SCHEMA.json", import.meta.url), "utf8"));
  assert.equal(template.result, "PASS");
  assert.deepEqual(validateEvidence(template), []);
  const open = structuredClone(template); open.manual_gates[0].required = true; open.manual_gates[0].status = "UNVERIFIED";
  assert.ok(validateEvidence(open).length > 0);
  open.result = "REVIEW_REQUIRED"; assert.deepEqual(validateEvidence(open), []);
  open.automatic_gates[0].status = "FAIL"; assert.ok(validateEvidence(open).length > 0);
  open.result = "FAIL"; assert.deepEqual(validateEvidence(open), []);
});

test("Gate B internal source junction cannot alias sensitive bytes", async () => {
  const fixture = await createFixture();
  await mkdir(path.join(fixture.repo, "private"));
  await mkdir(path.join(fixture.repo, "docs"));
  await writeFile(path.join(fixture.repo, "private", "source.md"), "SYNTHETIC_PRIVATE_SOURCE");
  await writeJsonAtomic(path.join(fixture.repo, "private", "manifest.json"), fixture.manifest, fixture.repo);
  await symlink(path.join(fixture.repo, "private"), path.join(fixture.repo, "docs", "alias"), "junction");
  fixture.task.required_sources = [{ base: "repo", path: "docs/alias/source.md" }];
  await assert.rejects(() => resolveContext(fixture), (error) => error.code === "SENSITIVE_CONTEXT_SOURCE");
  await assert.rejects(() => repositoryFingerprint(fixture.repo, fixture.manifest, path.join(fixture.repo, "docs", "alias", "manifest.json"), { readBytes: () => assert.fail("Sensitive manifest bytes must not be read") }), (error) => error.code === "SENSITIVE_CONTEXT_SOURCE");
});

test("Gate B direct validation API confines task path before execution", async () => {
  const fixture = await createFixture();
  const outside = path.join(path.dirname(fixture.repo), "outside-task.json");
  await writeFile(outside, JSON.stringify(fixture.task));
  await assert.rejects(() => validateRepository({ ...fixture, taskPath: outside }), (error) => error.code === "UNSAFE_PATH");
  assert.equal((await cacheStatus(fixture.repo)).validation.entries, 0);
});

test("Gate B overlapping security and release prefix retains both classes", async () => {
  const fixture = await createFixture();
  fixture.manifest.validation.release_or_infra_prefixes.push("server/");
  const classes = effectiveTaskClasses(["server/auth.mjs"], fixture.manifest, "docs_only");
  assert.deepEqual(classes, ["docs_only", "release_or_infra", "security_or_data"]);
  const plan = await validationPlan(fixture.repo, fixture.manifest, classes);
  assert.ok(plan.required_capabilities.includes("security"));
  assert.ok(plan.required_capabilities.includes("config"));
});

test("Gate B atomic temporary child cannot overwrite an existing file or escape", async () => {
  const fixture = await createFixture();
  const target = path.join(fixture.repo, "safe-output.json");
  const temporary = `${target}.${process.pid}.tmp`;
  await writeFile(temporary, "PRESERVE_EXISTING_TEMP");
  await assert.rejects(() => writeJsonAtomic(target, {}, fixture.repo), (error) => error.code === "EEXIST");
  assert.equal(await readFile(temporary, "utf8"), "PRESERVE_EXISTING_TEMP");
  await rm(temporary);
  const outside = path.join(path.dirname(fixture.repo), "outside-atomic");
  await mkdir(outside);
  await symlink(outside, temporary, "junction");
  await assert.rejects(() => writeJsonAtomic(target, {}, fixture.repo), (error) => error.code === "UNSAFE_PATH");
});

test("manifest validation rejects incomplete or invalid input", () => {
  assert.ok(validateProjectManifest({ schema_version: 0 }).length > 0);
});

test("context cache is content-addressed, deterministic and tag-scoped", async () => {
  const fixture = await createFixture();
  const first = await resolveContext(fixture);
  const firstBytes = await readFile(first.output);
  assert.equal(first.cache, "MISS");
  assert.equal(firstBytes.includes(Buffer.from("## knowledge:STANDARDS.md")), false, "docs-only task must not include the security source block");
  const second = await resolveContext(fixture);
  assert.equal(second.cache, "HIT");
  assert.deepEqual(await readFile(second.output), firstBytes);

  await writeFile(path.join(fixture.repo, "STATUS.md"), "# Status\n\nCurrent!\n", "utf8");
  const sourceChanged = await resolveContext(fixture);
  assert.equal(sourceChanged.cache, "MISS");
  assert.notEqual(sourceChanged.key, first.key);
  await writeFile(path.join(fixture.repo, "STATUS.md"), "# Status\n\nCurrent.\n", "utf8");
  const restored = await resolveContext(fixture);
  assert.equal(restored.cache, "HIT");
  assert.equal(restored.key, first.key);

  const manifest = JSON.parse(await readFile(fixture.manifestPath, "utf8"));
  manifest.commands.test = "node --test";
  await writeJsonAtomic(fixture.manifestPath, manifest, fixture.repo);
  const manifestChanged = await resolveContext({ ...fixture, manifest });
  assert.equal(manifestChanged.cache, "MISS");
  assert.notEqual(manifestChanged.key, first.key);
});

test("security context includes exact section and missing context fails explicitly", async () => {
  const fixture = await createFixture("security context");
  fixture.task.tags = ["security"];
  await writeJsonAtomic(fixture.taskPath, fixture.task, fixture.repo);
  const result = await resolveContext(fixture);
  const pack = await readFile(result.output, "utf8");
  assert.match(pack, /## Security/);
  assert.doesNotMatch(pack, /## Other/);
  fixture.task.tags = ["unknown-tag"];
  await writeJsonAtomic(fixture.taskPath, fixture.task, fixture.repo);
  await assert.rejects(() => resolveContext(fixture), (error) => error.code === "MISSING_CONTEXT");
  fixture.task.tags = ["security"];
  fixture.task.required_sources = [{ base: "repo", path: "docs/missing.md" }];
  await writeJsonAtomic(fixture.taskPath, fixture.task, fixture.repo);
  await assert.rejects(() => resolveContext(fixture), (error) => error.code === "MISSING_CONTEXT");
});

test("corrupt and old context cache entries are rejected and rebuilt", async () => {
  const fixture = await createFixture("corrupt cache");
  const first = await resolveContext(fixture);
  const metadataPath = path.join(fixture.repo, ".tretnix", "cache", "context", first.key, "metadata.json");
  await writeFile(metadataPath, "{broken", "utf8");
  const corrupt = await resolveContext(fixture);
  assert.equal(corrupt.cache, "MISS");
  assert.equal(corrupt.cache_rejection, "CORRUPT_CACHE");
  await rm(path.join(fixture.repo, ".tretnix", "cache", "context", first.key, "TASK_CONTEXT.md"));
  const incomplete = await resolveContext(fixture);
  assert.equal(incomplete.cache, "MISS");
  assert.equal(incomplete.cache_rejection, "INCOMPLETE_CACHE");
  const metadata = await readJson(metadataPath);
  metadata.schema_version = 0;
  await writeJsonAtomic(metadataPath, metadata, fixture.repo);
  const old = await resolveContext(fixture);
  assert.equal(old.cache, "MISS");
  assert.equal(old.cache_rejection, "STALE_CACHE");
});

test("context cache invalidates on AGENTS and selected Knowledge source changes", async () => {
  const fixture = await createFixture("knowledge invalidation");
  const first = await resolveContext(fixture);
  await writeFile(path.join(fixture.repo, "AGENTS.md"), "# Agents\n\nRules changed.\n", "utf8");
  const agentsChanged = await resolveContext(fixture);
  assert.equal(agentsChanged.cache, "MISS");
  assert.notEqual(agentsChanged.key, first.key);

  fixture.task.tags = ["security"];
  await writeJsonAtomic(fixture.taskPath, fixture.task, fixture.repo);
  const securityFirst = await resolveContext(fixture);
  await writeFile(path.join(fixture.repo, "STANDARDS.md"), "# Standards\n\n## Security\n\nSecure changed.\n\n## Other\n\nOther.\n", "utf8");
  const knowledgeChanged = await resolveContext(fixture);
  assert.equal(knowledgeChanged.cache, "MISS");
  assert.notEqual(knowledgeChanged.key, securityFirst.key);
});

test("fingerprint distinguishes staged, unstaged, untracked, EOL and generated states", async () => {
  const fixture = await createFixture("fingerprint states");
  const clean = await repositoryFingerprint(fixture.repo, fixture.manifest, fixture.manifestPath);
  const cleanAgain = await repositoryFingerprint(fixture.repo, fixture.manifest, fixture.manifestPath);
  assert.equal(clean.clean, true);
  assert.equal(clean.fingerprint, cleanAgain.fingerprint);

  await writeFile(path.join(fixture.repo, "untracked.txt"), "a", "utf8");
  const untrackedA = await repositoryFingerprint(fixture.repo, fixture.manifest, fixture.manifestPath);
  assert.deepEqual(untrackedA.working_tree.untracked, ["untracked.txt"]);
  await writeFile(path.join(fixture.repo, "untracked.txt"), "b", "utf8");
  const untrackedB = await repositoryFingerprint(fixture.repo, fixture.manifest, fixture.manifestPath);
  assert.notEqual(untrackedA.fingerprint, untrackedB.fingerprint);
  await rm(path.join(fixture.repo, "untracked.txt"));
  assert.equal((await repositoryFingerprint(fixture.repo, fixture.manifest, fixture.manifestPath)).fingerprint, clean.fingerprint);

  await writeFile(path.join(fixture.repo, "STATUS.md"), "# Status\r\n\r\nStaged.\r\n", "utf8");
  git(fixture.repo, "add", "STATUS.md");
  await writeFile(path.join(fixture.repo, "STATUS.md"), "# Status\n\nChanged.\n", "utf8");
  const both = await repositoryFingerprint(fixture.repo, fixture.manifest, fixture.manifestPath);
  assert.deepEqual(both.working_tree.staged, ["STATUS.md"]);
  assert.deepEqual(both.working_tree.unstaged, ["STATUS.md"]);
  assert.notEqual(both.fingerprint, clean.fingerprint);

  await writeFile(path.join(fixture.repo, "eol.txt"), "line\n", "utf8");
  const lf = await repositoryFingerprint(fixture.repo, fixture.manifest, fixture.manifestPath);
  await writeFile(path.join(fixture.repo, "eol.txt"), "line\r\n", "utf8");
  const crlf = await repositoryFingerprint(fixture.repo, fixture.manifest, fixture.manifestPath);
  assert.notEqual(lf.fingerprint, crlf.fingerprint, "LF/CRLF byte changes must affect exact-state equivalence");

  await mkdir(path.join(fixture.repo, "dist"), { recursive: true });
  await writeFile(path.join(fixture.repo, "dist", "generated.txt"), "generated", "utf8");
  await mkdir(path.join(fixture.repo, "build"), { recursive: true });
  await writeFile(path.join(fixture.repo, "build", "out.txt"), "undeclared", "utf8");
  const generated = await repositoryFingerprint(fixture.repo, fixture.manifest, fixture.manifestPath);
  assert.ok(generated.generated_paths.includes("dist/generated.txt"));
  assert.ok(generated.undeclared_generated_paths.includes("build/out.txt"));
});

test("fingerprint covers lockfile, manifest and combined staged/unstaged/untracked states", async () => {
  const fixture = await createFixture("combined fingerprint");
  fixture.manifest.validation.lockfiles = ["package-lock.json"];
  await writeFile(path.join(fixture.repo, "package-lock.json"), "{\"lockfileVersion\":1}\n", "utf8");
  await writeJsonAtomic(fixture.manifestPath, fixture.manifest, fixture.repo);
  git(fixture.repo, "add", "tretnix.project.json", "package-lock.json");
  git(fixture.repo, "commit", "-m", "test: add lockfile");
  const clean = await repositoryFingerprint(fixture.repo, fixture.manifest, fixture.manifestPath);

  await writeFile(path.join(fixture.repo, "package-lock.json"), "{\"lockfileVersion\":2}\n", "utf8");
  const lockChanged = await repositoryFingerprint(fixture.repo, fixture.manifest, fixture.manifestPath);
  assert.notEqual(lockChanged.fingerprint, clean.fingerprint);
  assert.notEqual(lockChanged.lockfiles[0].sha256, clean.lockfiles[0].sha256);

  await writeFile(path.join(fixture.repo, "STATUS.md"), "# Status\n\nStaged.\n", "utf8");
  git(fixture.repo, "add", "STATUS.md");
  await writeFile(path.join(fixture.repo, "STATUS.md"), "# Status\n\nStaged and unstaged.\n", "utf8");
  await writeFile(path.join(fixture.repo, "notes.txt"), "untracked\n", "utf8");
  const combined = await repositoryFingerprint(fixture.repo, fixture.manifest, fixture.manifestPath);
  assert.ok(combined.working_tree.staged.includes("STATUS.md"));
  assert.ok(combined.working_tree.unstaged.includes("STATUS.md"));
  assert.ok(combined.working_tree.untracked.includes("notes.txt"));

  fixture.manifest.project.plan = "changed";
  await writeJsonAtomic(fixture.manifestPath, fixture.manifest, fixture.repo);
  const manifestChanged = await repositoryFingerprint(fixture.repo, fixture.manifest, fixture.manifestPath);
  assert.notEqual(manifestChanged.manifest_sha256, combined.manifest_sha256);
  assert.notEqual(manifestChanged.fingerprint, combined.fingerprint);
});

test("sensitive tracked paths disable cache eligibility without storing their content", async () => {
  const fixture = await createFixture("sensitive path");
  await writeFile(path.join(fixture.repo, ".env.local"), "SECRET=do-not-record\n", "utf8");
  git(fixture.repo, "add", "-f", ".env.local");
  const fingerprint = await repositoryFingerprint(fixture.repo, fixture.manifest, fixture.manifestPath);
  assert.equal(fingerprint.cache_eligible, false);
  assert.deepEqual(fingerprint.working_tree.sensitive, [".env.local"]);
  assert.doesNotMatch(JSON.stringify(fingerprint), /do-not-record/);
});

test("validation cache misses, hits, invalidates and preserves manual gates", async () => {
  const fixture = await createFixture("validation cache");
  addReusableGitValidator(fixture);
  const first = await validateRepository(fixture);
  assert.deepEqual(first.evidence.cache.misses, ["fixture-pass", "git-diff-check"]);
  assert.equal(first.evidence.result, "REVIEW_REQUIRED");
  assert.ok(first.evidence.manual_gates.every((gate) => gate.status === (gate.required ? "UNVERIFIED" : "NOT_REQUIRED")));
  const second = await validateRepository(fixture);
  assert.deepEqual(second.evidence.cache.hits, ["git-diff-check"]);
  assert.deepEqual(second.evidence.cache.misses, ["fixture-pass"]);

  await writeFile(path.join(fixture.repo, "delta.txt"), "x", "utf8");
  const changed = await validateRepository(fixture);
  assert.deepEqual(changed.evidence.cache.misses, ["fixture-pass", "git-diff-check"]);
  await rm(path.join(fixture.repo, "delta.txt"));
  const restored = await validateRepository(fixture);
  assert.deepEqual(restored.evidence.cache.hits, ["git-diff-check"]);

  fixture.manifest.validation.validators[0].contract_version = "1.0.1";
  const contractChanged = await validateRepository(fixture);
  assert.deepEqual(contractChanged.evidence.cache.misses, ["fixture-pass"]);
});

test("failed, unavailable and forbidden validators do not become cached PASS", async () => {
  const fixture = await createFixture("validator failures");
  fixture.manifest.gates = {};
  await writeFile(path.join(fixture.repo, "fail-validator.mjs"), "process.exit(7);\n", "utf8");
  fixture.manifest.validation.validators = [
    { id: "fail", command: "node fail-validator.mjs", runtime: "node", task_classes: ["all"], capabilities: ["static", "whitespace", "test", "security"], reviewed_script: { validator_id: "fail", path: "fail-validator.mjs", sha256: sha256("process.exit(7);\n"), capabilities: ["static", "whitespace", "test", "security"] }, deterministic: true, cacheable: true, contract_version: "1.1.0", timeout_ms: 30000 },
    { id: "missing", command: { unavailable_platform: "node fixture-validator.mjs" }, task_classes: ["all"], capabilities: ["static"], deterministic: true, cacheable: true, contract_version: "1.1.0", timeout_ms: 30000 },
    { id: "blocked", command: "git push origin main", runtime: "git", task_classes: ["all"], capabilities: ["static"], deterministic: true, cacheable: true, contract_version: "1.1.0", timeout_ms: 30000 },
  ];
  const result = await validateRepository(fixture);
  assert.equal(result.evidence.result, "FAIL");
  assert.deepEqual(result.validations.map((entry) => entry.exit_code), [7, 127, 126]);
  assert.deepEqual(result.evidence.forbidden_actions_observed, ["blocked:remote_git"]);
  const repeated = await validateRepository(fixture);
  assert.ok(repeated.validations.every((entry) => entry.cache === "MISS"));
});

test("classification is conservative for docs, security and ambiguous changes", async () => {
  const fixture = await createFixture("classification");
  assert.equal(classifyTask(["docs/readme.md"], fixture.manifest), "docs_only");
  assert.equal(classifyTask(["server/auth.mjs"], fixture.manifest), "security_or_data");
  assert.equal(classifyTask(["unknown.bin"], fixture.manifest), "security_or_data");
});

test("preflight catches wrong remote, branch, dirty state and undeclared generated files", async () => {
  const fixture = await createFixture("preflight failures");
  const ok = await preflight(fixture.repo, fixture.manifest, fixture.manifestPath, true);
  assert.equal(ok.ok, true);
  fixture.manifest.project.repository = "owner/wrong";
  git(fixture.repo, "switch", "-c", "unexpected");
  await mkdir(path.join(fixture.repo, "build"), { recursive: true });
  await writeFile(path.join(fixture.repo, "build", "out.txt"), "x", "utf8");
  const failed = await preflight(fixture.repo, fixture.manifest, fixture.manifestPath, true);
  const codes = failed.issues.map((issue) => issue.code);
  assert.ok(codes.includes("UNEXPECTED_REMOTE"));
  assert.ok(codes.includes("UNEXPECTED_BRANCH"));
  assert.ok(codes.includes("UNEXPECTED_DIRTY_TREE"));
  assert.ok(codes.includes("UNDECLARED_GENERATED_PATH"));
});

test("invalid JSON manifest and missing source produce explicit errors", async () => {
  const fixture = await createFixture("invalid inputs");
  await writeFile(fixture.manifestPath, "{invalid", "utf8");
  await assert.rejects(() => loadManifest(fixture.repo), (error) => error.code === "INVALID_MANIFEST_JSON");
});

test("manifest, task and generated evidence satisfy strict runtime contracts", async () => {
  const fixture = await createFixture("schema contracts");
  assert.deepEqual(validateProjectManifest(fixture.manifest), []);
  assert.deepEqual(validateTaskDescriptor(fixture.task), []);

  const extra = structuredClone(fixture.manifest);
  extra.unexpected = true;
  assert.match(validateProjectManifest(extra).join(";"), /not allowed/);
  const weakened = structuredClone(fixture.manifest);
  weakened.forbidden_automatic_actions = ["commit"];
  assert.ok(validateProjectManifest(weakened).length > 0);
  const unsafe = structuredClone(fixture.manifest);
  unsafe.context.source_allowlists.repo = ["../outside"];
  assert.ok(validateProjectManifest(unsafe).length > 0);

  const result = await validateRepository(fixture);
  assert.deepEqual(validateEvidence(result.evidence), []);
  assert.equal(result.evidence.manual_gates.length, 4);
  assert.ok(result.evidence.manual_gates.every((gate) => gate.status === (gate.required ? "UNVERIFIED" : "NOT_REQUIRED")));
  assert.ok(result.evidence.automatic_gates.every((gate) => gate.status === "PASS"));
});

test("evidence runtime validation rejects malformed nested structures", async () => {
  const fixture = await createFixture("nested evidence contract");
  const { evidence } = await validateRepository(fixture);
  assert.deepEqual(validateEvidence(evidence), []);

  const mutations = [
    (candidate) => { candidate.sources[0].sha256 = "invalid"; },
    (candidate) => { candidate.sources[0].unexpected = true; },
    (candidate) => { candidate.commands[0].exit_code = "0"; },
    (candidate) => { candidate.validation[0].cache_key = "invalid"; },
    (candidate) => { candidate.validation[0].stdout_log = "../outside.log"; },
    (candidate) => { candidate.automatic_gates[0].status = "UNKNOWN"; },
    (candidate) => { candidate.manual_gates[0].required = "yes"; },
    (candidate) => { candidate.cache.hits = [candidate.cache.misses[0]]; },
    (candidate) => { candidate.preflight.issues = [{ actual: "missing code" }]; },
    (candidate) => { candidate.validation_plan.not_executed = [{ validator_id: "v" }]; },
  ];
  for (const mutate of mutations) {
    const candidate = structuredClone(evidence);
    mutate(candidate);
    assert.ok(validateEvidence(candidate).length > 0);
  }

  const falsePass = structuredClone(evidence);
  falsePass.result = "PASS";
  assert.match(validateEvidence(falsePass).join(";"), /required manual gate/);
});

test("context source policy blocks secrets, undeclared paths and traversal before reading", async () => {
  assert.equal(isSensitivePath(".env.local"), true);
  assert.equal(isSensitivePath(".env.example"), false);
  assert.equal(isSensitivePath("config/.env.template"), false);
  const fixture = await createFixture("context containment");
  await writeFile(path.join(fixture.repo, ".env"), "SECRET=must-not-appear\n", "utf8");
  fixture.manifest.context.source_allowlists.repo.push(".env");
  fixture.task.required_sources = [{ base: "repo", path: ".env" }];
  await writeJsonAtomic(fixture.taskPath, fixture.task, fixture.repo);
  await assert.rejects(() => resolveContext(fixture), (error) => error.code === "SENSITIVE_CONTEXT_SOURCE");

  fixture.task.required_sources = [{ base: "repo", path: "fixture-validator.mjs" }];
  await writeJsonAtomic(fixture.taskPath, fixture.task, fixture.repo);
  await assert.rejects(() => resolveContext(fixture), (error) => error.code === "CONTEXT_SOURCE_NOT_ALLOWED");

  fixture.task.required_sources = [{ base: "repo", path: "../outside.md" }];
  assert.ok(validateTaskDescriptor(fixture.task).length > 0);
  await assert.rejects(() => loadManifest(fixture.repo, "../tretnix.project.json"), (error) => error.code === "UNSAFE_PATH");
  await assert.rejects(() => loadTask(fixture.repo, "../task.json"), (error) => error.code === "UNSAFE_PATH");
});

test("direct exported APIs confine manifest and task paths independently of the CLI", async () => {
  const fixture = await createFixture("direct API containment");
  const outside = path.join(path.dirname(fixture.repo), "outside-api");
  await mkdir(outside, { recursive: true });
  const outsideManifest = path.join(outside, "tretnix.project.json");
  const outsideTask = path.join(outside, "task.json");
  await writeJsonAtomic(outsideManifest, fixture.manifest, outside);
  await writeJsonAtomic(outsideTask, fixture.task, outside);

  await assert.rejects(() => repositoryFingerprint(fixture.repo, fixture.manifest, outsideManifest), (error) => error.code === "UNSAFE_PATH");
  await assert.rejects(() => repositoryFingerprint(fixture.repo, fixture.manifest, "../outside-api/tretnix.project.json"), (error) => error.code === "UNSAFE_PATH");
  await assert.rejects(() => resolveContext({ ...fixture, manifestPath: outsideManifest }), (error) => error.code === "UNSAFE_PATH");
  await assert.rejects(() => resolveContext({ ...fixture, taskPath: outsideTask }), (error) => error.code === "UNSAFE_PATH");
  await assert.rejects(() => writeJsonAtomic(outsideManifest, fixture.manifest, fixture.repo), (error) => error.code === "UNSAFE_PATH");
  await assert.rejects(() => writeJsonAtomic(fixture.taskPath, fixture.task), (error) => error.code === "UNSAFE_PATH");

  await symlink(outside, path.join(fixture.repo, "linked-api"), "junction");
  await assert.rejects(() => repositoryFingerprint(fixture.repo, fixture.manifest, path.join(fixture.repo, "linked-api", "tretnix.project.json")), (error) => error.code === "UNSAFE_PATH");
  await assert.rejects(() => resolveContext({ ...fixture, taskPath: path.join(fixture.repo, "linked-api", "task.json") }), (error) => error.code === "UNSAFE_PATH");
  await assert.rejects(() => writeJsonAtomic(path.join(fixture.repo, "linked-api", "output.json"), {}, fixture.repo), (error) => error.code === "UNSAFE_PATH");
  await rm(path.join(fixture.repo, "linked-api"), { recursive: true, force: true });

  const contained = await repositoryFingerprint(fixture.repo, fixture.manifest, fixture.manifestPath);
  assert.match(contained.fingerprint, /^[0-9a-f]{64}$/);
});

test("application task classes remain fail-closed until a repository configures them", async () => {
  const fixture = await createFixture("unsupported application classes");
  for (const taskClass of ["frontend", "backend"]) {
    const plan = await validationPlan(fixture.repo, fixture.manifest, taskClass);
    assert.equal(plan.supported, false);
    assert.deepEqual(plan.selected, []);
    assert.deepEqual(plan.missing_capabilities, [`unsupported_task_class:${taskClass}`]);
  }
});

test("symlink and latest-evidence traversal cannot escape the repository", async () => {
  const fixture = await createFixture("symlink containment");
  const outside = path.join(path.dirname(fixture.repo), "outside");
  await mkdir(outside, { recursive: true });
  await writeFile(path.join(outside, "outside.md"), "outside\n", "utf8");
  await mkdir(path.join(fixture.repo, "docs"), { recursive: true });
  await symlink(outside, path.join(fixture.repo, "docs", "linked"), "junction");
  fixture.task.required_sources = [{ base: "repo", path: "docs/linked/outside.md" }];
  await writeJsonAtomic(fixture.taskPath, fixture.task, fixture.repo);
  await assert.rejects(() => resolveContext(fixture), (error) => error.code === "UNSAFE_PATH");
  await rm(path.join(fixture.repo, "docs", "linked"), { recursive: true, force: true });

  const validation = await validateRepository({ ...fixture, task: null });
  await writeJsonAtomic(path.join(fixture.repo, ".tretnix", "runtime", "latest-evidence.json"), {
    schema_version: 1,
    evidence_path: "../outside/evidence.json",
    report_path: "../outside/report.md",
  }, fixture.repo);
  await assert.rejects(() => regenerateLatestEvidence(fixture.repo), (error) => error.code === "UNSAFE_PATH");
  assert.ok(validation.outputs.evidencePath.startsWith(path.join(fixture.repo, ".tretnix", "evidence")));
});

test("validation cache rejects corrupt, incomplete and old entries and runtime changes alter keys", async () => {
  const fixture = await createFixture("validation cache failures");
  addReusableGitValidator(fixture);
  const first = await validateRepository(fixture);
  const key = first.validations[1].cache_key;
  const directory = path.join(fixture.repo, ".tretnix", "cache", "validation", key);
  const metadataPath = path.join(directory, "metadata.json");

  await writeFile(metadataPath, "{broken", "utf8");
  const corrupt = await validateRepository(fixture);
  assert.equal(corrupt.validations[1].cache_rejection, "CORRUPT_CACHE");
  const broken = await readJson(metadataPath);
  delete broken.result;
  await writeJsonAtomic(metadataPath, broken, fixture.repo);
  const incomplete = await validateRepository(fixture);
  assert.equal(incomplete.validations[1].cache_rejection, "INCOMPLETE_CACHE");
  const metadata = await readJson(metadataPath);
  metadata.cache_contract_version = "0.0.0";
  await writeJsonAtomic(metadataPath, metadata, fixture.repo);
  const stale = await validateRepository(fixture);
  assert.equal(stale.validations[1].cache_rejection, "STALE_CACHE");

  const payload = { repository_fingerprint: "a", validator_id: "v", exact_command: "node v.mjs", relevant_runtime_version: "node-a", cache_contract_version: "1", validator_contract_version: "1" };
  assert.notEqual(validationCacheKey(payload), validationCacheKey({ ...payload, relevant_runtime_version: "node-b" }));
});

test("validator execution is shell-free, wrapper-resistant and deterministic on timeout", async () => {
  const fixture = await createFixture("validator safety");
  for (const command of [
    "powershell -Command git status",
    "pwsh -EncodedCommand Z2l0IHB1c2g=",
    "cmd /c git status",
    "bash -c git status",
    "npm run deploy",
  ]) await assert.rejects(() => prepareValidatorCommand(fixture.repo, command, fixture.manifest), (error) => ["UNSAFE_COMMAND", "FORBIDDEN_COMMAND"].includes(error.code));

  await writeJsonAtomic(path.join(fixture.repo, "package.json"), { scripts: { unsafe: "node -e console.log('unsafe')" } }, fixture.repo);
  await assert.rejects(() => prepareValidatorCommand(fixture.repo, "npm run unsafe", fixture.manifest), (error) => error.code === "UNSAFE_COMMAND");

  await writeFile(path.join(fixture.repo, "timeout-validator.mjs"), "await new Promise((resolve) => setTimeout(resolve, 5000));\n", "utf8");
  fixture.manifest.validation.validators = [{
    id: "timeout",
    command: "node timeout-validator.mjs",
    runtime: "node",
    task_classes: ["all"],
    capabilities: ["static", "whitespace", "test", "security"],
    reviewed_script: { validator_id: "timeout", path: "timeout-validator.mjs", sha256: sha256("await new Promise((resolve) => setTimeout(resolve, 5000));\n"), capabilities: ["static", "whitespace", "test", "security"] },
    deterministic: true,
    cacheable: true,
    contract_version: "1.1.0",
    timeout_ms: 100,
  }];
  const result = await validateRepository(fixture);
  assert.equal(result.validations[0].result, "TIMEOUT");
  assert.equal(result.validations[0].exit_code, 124);
  assert.equal(result.evidence.result, "FAIL");
  const repeated = await validateRepository(fixture);
  assert.equal(repeated.validations[0].cache, "MISS");
});

test("security-sensitive changes invalidate exact-state validation proof", async () => {
  const fixture = await createFixture("security invalidation");
  addReusableGitValidator(fixture);
  fixture.task.task_class = "security_or_data";
  const first = await validateRepository(fixture);
  const second = await validateRepository(fixture);
  assert.equal(first.validations[0].cache, "MISS");
  assert.equal(second.validations[0].cache, "MISS");
  assert.equal(second.validations[1].cache, "HIT");
  await mkdir(path.join(fixture.repo, "server"), { recursive: true });
  await writeFile(path.join(fixture.repo, "server", "auth.mjs"), "export const secure = true;\n", "utf8");
  const changed = await validateRepository(fixture);
  assert.equal(changed.taskClass, "security_or_data");
  assert.equal(changed.validations[0].cache, "MISS");
  assert.equal(changed.validations[1].cache, "MISS");
  assert.notEqual(changed.fingerprint.fingerprint, first.fingerprint.fingerprint);
});

test("CLI integration covers doctor, preflight, context, validate, evidence and cache lifecycle", async () => {
  const fixture = await createFixture("CLI repo with spaces");
  const invoke = (...args) => spawnSync(process.execPath, [cliPath, ...args], { cwd: fixture.repo, encoding: "utf8", windowsHide: true });
  const commands = [
    ["doctor", "--repo", fixture.repo],
    ["preflight", "--repo", fixture.repo],
    ["context", "--repo", fixture.repo, "--task", "task.json"],
    ["validate", "--repo", fixture.repo, "--task", "task.json"],
  ];
  for (const args of commands) {
    const result = invoke(...args);
    assert.equal(result.status, 0, `${args[0]} failed: ${result.stderr}`);
  }
  const pointer = await readJson(path.join(fixture.repo, ".tretnix", "runtime", "latest-evidence.json"));
  const generatedEvidence = await readJson(path.join(fixture.repo, pointer.evidence_path));
  assert.deepEqual(validateEvidence(generatedEvidence), []);
  assert.ok(generatedEvidence.sources.length >= 4);
  assert.deepEqual(generatedEvidence.manual_gates.map((gate) => gate.id).sort(), ["backend", "browser", "production", "staging"]);
  assert.ok(generatedEvidence.manual_gates.every((gate) => gate.status === (gate.required ? "UNVERIFIED" : "NOT_REQUIRED")));
  const before = invoke("cache", "status", "--repo", fixture.repo);
  assert.equal(before.status, 0, before.stderr);
  const beforeJson = JSON.parse(before.stdout);
  assert.ok(beforeJson.cache.context.entries > 0);
  assert.ok(beforeJson.cache.validation.entries > 0);
  const cleared = invoke("cache", "clear", "--repo", fixture.repo);
  assert.equal(cleared.status, 0, cleared.stderr);
  const after = JSON.parse(invoke("cache", "status", "--repo", fixture.repo).stdout);
  assert.deepEqual(after.cache, { context: { entries: 0 }, validation: { entries: 0 } });
  const evidence = invoke("evidence", "--repo", fixture.repo);
  assert.equal(evidence.status, 1, evidence.stderr);
  assert.equal(JSON.parse(evidence.stderr).error, "STALE_EVIDENCE");
  assert.equal(git(fixture.repo, "status", "--porcelain"), "", "ignored CLI output must not dirty the fixture repository");
});

test("cache clear refuses a cache junction that resolves outside the repository", async () => {
  const fixture = await createFixture("cache junction safety");
  const outside = path.join(path.dirname(fixture.repo), "outside-cache");
  await mkdir(outside, { recursive: true });
  await mkdir(path.join(fixture.repo, ".tretnix"), { recursive: true });
  await symlink(outside, path.join(fixture.repo, ".tretnix", "cache"), "junction");
  await assert.rejects(() => safeClearCache(fixture.repo), (error) => error.code === "UNSAFE_PATH");
  assert.equal(await readFile(path.join(outside, "sentinel.txt"), "utf8").catch(() => "missing"), "missing");
});

async function applicationFixture() {
  const app = await createFixture("separate application");
  const knowledge = await createFixture("canonical Knowledge");
  git(app.repo, "remote", "set-url", "origin", "https://github.com/owner/example.git");
  app.manifest.project.repository = "owner/example";
  await writeJsonAtomic(path.join(app.repo, "tretnix.project.json"), app.manifest, app.repo);
  await assert.rejects(() => doctor(app.repo, app.manifest, app.manifestPath), { code: "MISSING_KNOWLEDGE_ROOT" });
  await rm(path.join(app.repo, "schemas"), { recursive: true });
  await rm(path.join(app.repo, "templates"), { recursive: true });
  git(app.repo, "add", ".");
  git(app.repo, "commit", "-m", "test: separate application contracts");
  return { ...app, knowledge: knowledge.repo };
}

function addReusableGitValidator(fixture) {
  fixture.manifest.validation.validators.push({
    id: "git-diff-check", command: "git -c core.whitespace=cr-at-eol diff --check", runtime: "git",
    task_classes: ["all"], capabilities: ["whitespace"], deterministic: true, cacheable: true,
    contract_version: "1.1.0", timeout_ms: 30000,
  });
}

function useApplicationProfile(fixture, command, capability, script = null) {
  if (fixture.manifest.validation.validators.length === 1) {
    const original = fixture.manifest.validation.validators[0];
    fixture.manifest.validation.validators.push({ ...original, id: "fixture-capability-proof", reviewed_script: { ...original.reviewed_script, validator_id: "fixture-capability-proof" } });
  }
  const validator = fixture.manifest.validation.validators[0];
  validator.command = command;
  validator.capabilities = [capability];
  if (script) validator.reviewed_script = { validator_id: validator.id, path: script.path, sha256: script.sha256, capabilities: [capability] };
  else delete validator.reviewed_script;
}

test("application doctor and full CLI lifecycle use separate Knowledge without copies", async () => {
  const fixture = await applicationFixture();
  const result = await doctor(fixture.repo, fixture.manifest, fixture.manifestPath, fixture.knowledge);
  assert.equal(result.ok, true);
  for (const check of result.checks.filter((entry) => entry.id.endsWith("_schema"))) {
    assert.ok(check.path.startsWith(fixture.knowledge + path.sep));
    assert.ok(check.template.startsWith(fixture.knowledge + path.sep));
  }
  await assert.rejects(() => doctor(fixture.repo, fixture.manifest, fixture.manifestPath), { code: "MISSING_KNOWLEDGE_ROOT" });
  const invoke = (...args) => spawnSync(process.execPath, [cliPath, ...args, "--repo", fixture.repo], { encoding: "utf8", windowsHide: true });
  assert.equal(JSON.parse(invoke("doctor").stderr).error, "MISSING_KNOWLEDGE_ROOT");
  for (const args of [
    ["doctor", "--knowledge", fixture.knowledge], ["preflight"],
    ["context", "--task", "task.json", "--knowledge", fixture.knowledge],
    ["validate", "--task", "task.json", "--knowledge", fixture.knowledge],
  ]) {
    const execution = invoke(...args);
    assert.equal(execution.status, 0, `${args[0]}: ${execution.stderr}`);
  }
  const replay = invoke("evidence", "--knowledge", fixture.knowledge);
  assert.equal(replay.status, 1);
  assert.equal(JSON.parse(replay.stderr).error, "STALE_EVIDENCE");
  const context = await resolveContext({ ...fixture, task: { ...fixture.task, tags: ["security"] } });
  const selected = context.sources.find((source) => source.display_path === "knowledge:STANDARDS.md");
  assert.equal(selected.knowledge_commit, git(fixture.knowledge, "rev-parse", "HEAD"));
  assert.equal(git(fixture.repo, "status", "--porcelain"), "");
  assert.equal(git(fixture.knowledge, "status", "--porcelain"), "");
});

test("external Knowledge contract drift makes evidence stale without changing the application", async () => {
  const fixture = await applicationFixture();
  await validateRepository({ ...fixture, knowledge: fixture.knowledge, task: null, taskPath: null });
  await assert.rejects(() => regenerateLatestEvidence(fixture.repo), { code: "STALE_EVIDENCE" });
  const contract = path.join(fixture.knowledge, "schemas/tretnix-project.schema.json");
  await writeFile(contract, `${await readFile(contract, "utf8")}\n`);
  await assert.rejects(() => regenerateLatestEvidence(fixture.repo, fixture.knowledge), { code: "STALE_EVIDENCE" });
  assert.equal(git(fixture.repo, "status", "--porcelain"), "");
});

test("external Knowledge context-source drift makes evidence stale", async () => {
  const fixture = await applicationFixture();
  fixture.task.tags = ["security"];
  await writeJsonAtomic(path.join(fixture.repo, "task.json"), fixture.task, fixture.repo);
  git(fixture.repo, "add", "task.json");
  git(fixture.repo, "commit", "-m", "test: select Knowledge source");
  const contextResult = await resolveContext(fixture);
  await validateRepository({ ...fixture, contextResult });
  await writeFile(path.join(fixture.knowledge, "STANDARDS.md"), "# Standards\n\n## Security\n\nChanged.\n");
  await assert.rejects(() => regenerateLatestEvidence(fixture.repo, fixture.knowledge), { code: "STALE_EVIDENCE" });
});

test("validation refuses a context snapshot after its Knowledge source changes", async () => {
  const fixture = await applicationFixture();
  fixture.task.tags = ["security"];
  const contextResult = await resolveContext(fixture);
  await writeFile(path.join(fixture.knowledge, "STANDARDS.md"), "# Standards\n\n## Security\n\nChanged.\n");
  await assert.rejects(() => validateRepository({ ...fixture, contextResult }), { code: "STALE_KNOWLEDGE" });
});

test("unfingerprinted installed validator state cannot replay a PASS", async () => {
  const fixture = await createFixture();
  await installFixtureBins(fixture);
  useApplicationProfile(fixture, "bun run tsc", "typecheck");
  const result = await validateRepository(fixture);
  assert.equal(result.validations[0].result, "PASS");
  await writeFile(path.join(fixture.repo, "node_modules/typescript/bin/tsc"), "console.log('changed ignored validator');\n");
  await assert.rejects(() => regenerateLatestEvidence(fixture.repo), { code: "STALE_EVIDENCE" });
});

test("separate Knowledge rejects mismatched/malformed contracts and escaped roots", async () => {
  const fixture = await applicationFixture();
  const schema = path.join(fixture.knowledge, "schemas/tretnix-project.schema.json");
  await writeFile(schema, '{"type":"object","required":[],"properties":{}}');
  assert.equal((await doctor(fixture.repo, fixture.manifest, fixture.manifestPath, fixture.knowledge)).ok, false);
  await assert.rejects(() => resolveContext(fixture), { code: "INVALID_KNOWLEDGE_CONTRACT" });
  await assert.rejects(() => validateRepository(fixture), { code: "INVALID_KNOWLEDGE_CONTRACT" });
  await assert.rejects(() => readFile(path.join(fixture.repo, ".tretnix/runtime/context.json")), { code: "ENOENT" });
  await writeFile(schema, 'invalid json');
  await assert.rejects(() => doctor(fixture.repo, fixture.manifest, fixture.manifestPath, fixture.knowledge), { code: "INVALID_SCHEMA_JSON" });
  await writeFile(schema, JSON.stringify(publishedSchemas.project));
  const alias = path.join(path.dirname(fixture.repo), "knowledge-alias");
  await symlink(fixture.knowledge, alias, "junction");
  await assert.rejects(() => doctor(fixture.repo, fixture.manifest, fixture.manifestPath, alias), { code: "UNSAFE_PATH" });
  await assert.rejects(() => doctor(fixture.repo, fixture.manifest, fixture.manifestPath, path.join(fixture.knowledge, "schemas")), { code: "UNSAFE_PATH" });
  await assert.rejects(() => doctor(fixture.repo, fixture.manifest, fixture.manifestPath, path.join(fixture.knowledge, "missing")), { code: "MISSING_KNOWLEDGE_ROOT" });
  await writeFile(path.join(fixture.knowledge, "templates/TRETNIX_TASK_DESCRIPTOR.json"), '{}');
  assert.equal((await doctor(fixture.repo, fixture.manifest, fixture.manifestPath, fixture.knowledge)).ok, false);
});

for (const base of ["repo", "knowledge"]) test(`application source confinement is independent for ${base}`, async () => {
  const fixture = await applicationFixture();
  fixture.manifest.context.source_allowlists[base].push("../outside.md", "linked/**");
  fixture.task.required_sources = [{ base, path: "../outside.md" }];
  await assert.rejects(() => resolveContext(fixture), { code: "UNSAFE_PATH" });
  const root = base === "repo" ? fixture.repo : fixture.knowledge;
  await mkdir(path.join(root, "docs"));
  await symlink(path.join(root, "docs"), path.join(root, "linked"), "junction");
  fixture.task.required_sources = [{ base, path: "linked/input.md" }];
  await writeFile(path.join(root, "docs/input.md"), "Safe but aliased");
  await assert.rejects(() => resolveContext(fixture), { code: "UNSAFE_PATH" });
});

test("unignored runtime blocks every writer before the first output, doctor stays read-only", async () => {
  const fixture = await createFixture();
  await writeFile(path.join(fixture.repo, ".gitignore"), ".env*\n");
  const result = await doctor(fixture.repo, fixture.manifest, fixture.manifestPath);
  assert.equal(result.checks.find((entry) => entry.id === "runtime_ignore").error, "RUNTIME_NOT_IGNORED");
  for (const writer of [
    () => preflight(fixture.repo, fixture.manifest, fixture.manifestPath),
    () => resolveContext(fixture), () => validateRepository(fixture),
    () => regenerateLatestEvidence(fixture.repo), () => safeClearCache(fixture.repo),
    () => writeEvidence(fixture.repo, {}),
    () => writeJsonAtomic(path.join(fixture.repo, ".tretnix/runtime/probe.json"), {}, fixture.repo),
  ]) await assert.rejects(writer, { code: "RUNTIME_NOT_IGNORED" });
  for (const command of ["preflight", "context", "validate", "evidence"]) {
    const execution = spawnSync(process.execPath, [cliPath, command, "--repo", fixture.repo, "--task", "task.json"], { encoding: "utf8", windowsHide: true });
    assert.equal(JSON.parse(execution.stderr).error, "RUNTIME_NOT_IGNORED");
  }
  await assert.rejects(() => readFile(path.join(fixture.repo, ".tretnix")), { code: "ENOENT" });
});

test("runtime requires portable whole-directory ignore and rejects local/global-only or tracked output", async () => {
  const fixture = await createFixture();
  await writeFile(path.join(fixture.repo, ".gitignore"), ".env*\n");
  await writeFile(path.join(fixture.repo, ".git/info/exclude"), ".tretnix/\n");
  await assert.rejects(() => requireRuntimeIgnored(fixture.repo), { code: "RUNTIME_NOT_IGNORED" });
  await writeFile(path.join(fixture.repo, ".git/info/exclude"), "");
  const globalIgnore = path.join(path.dirname(fixture.repo), "global-ignore");
  await writeFile(globalIgnore, ".tretnix/\n");
  git(fixture.repo, "config", "core.excludesFile", globalIgnore);
  await assert.rejects(() => requireRuntimeIgnored(fixture.repo), { code: "RUNTIME_NOT_IGNORED" });
  for (const pattern of [".tretnix/runtime/\n", ".tretnix/\n!.tretnix/\n", ".tretnix/*\n"]) {
    await writeFile(path.join(fixture.repo, ".gitignore"), pattern);
    await assert.rejects(() => requireRuntimeIgnored(fixture.repo), { code: "RUNTIME_NOT_IGNORED" });
  }
  await writeFile(path.join(fixture.repo, ".gitignore"), "/.tretnix/\n");
  assert.equal((await requireRuntimeIgnored(fixture.repo)).portable, true);
  await mkdir(path.join(fixture.repo, ".tretnix"));
  await writeFile(path.join(fixture.repo, ".tretnix/tracked.json"), '{}');
  git(fixture.repo, "add", "-f", ".tretnix/tracked.json");
  await assert.rejects(() => requireRuntimeIgnored(fixture.repo), { code: "RUNTIME_NOT_IGNORED" });
});

async function installFixtureBins(fixture) {
  const profiles = [["tsc", "typescript", "bin/tsc", "--noEmit"], ["eslint", "eslint", "bin/eslint.js", "."], ["vite", "vite", "bin/vite.js", "build"]];
  const packageJson = { devDependencies: {}, scripts: { test: "node --experimental-strip-types local-test.ts", pretest: "git push", posttest: "git commit" } };
  for (const [name, dependency, target, arg] of profiles) {
    packageJson.devDependencies[dependency] = "1.0.0";
    packageJson.scripts[name] = `${name} ${arg}`;
    const directory = path.join(fixture.repo, "node_modules", dependency);
    await mkdir(path.join(directory, "bin"), { recursive: true });
    await writeFile(path.join(directory, "package.json"), JSON.stringify({ name: dependency, version: "1.0.0", bin: { [name]: target } }));
    await writeFile(path.join(directory, target), "console.log('local dependency validator');\n");
  }
  await writeFile(path.join(fixture.repo, "package.json"), JSON.stringify(packageJson));
  await writeFile(path.join(fixture.repo, "local-test.ts"), "const value: number = 1; console.log(value);\n");
  await writeFile(path.join(fixture.repo, ".gitignore"), ".tretnix/\nnode_modules/\n.env*\n");
  return profiles;
}

test("reviewed local application profiles unwrap bun scripts, pin Node, and never use hooks or cache", async () => {
  const fixture = await createFixture();
  const profiles = await installFixtureBins(fixture);
  for (const [name, dependency, target, arg] of profiles) {
    for (const command of [`${name} ${arg}`, `bun run ${name}`]) {
      const prepared = await prepareValidatorCommand(fixture.repo, command, fixture.manifest);
      assert.equal(prepared.executable, process.execPath);
      assert.deepEqual(prepared.args, [path.join(fixture.repo, "node_modules", dependency, target), arg]);
      assert.equal(prepared.cacheSafe, false);
    }
  }
  useApplicationProfile(fixture, "bun run tsc", "typecheck");
  git(fixture.repo, "add", ".");
  git(fixture.repo, "commit", "-m", "test: local validator fixture");
  for (const command of ["bun run tsc", "bun run eslint", "bun run vite", "bun run test"]) {
    const capability = command === "bun run tsc" ? "typecheck" : command === "bun run eslint" ? "lint" : command === "bun run vite" ? "build" : "test";
    useApplicationProfile(fixture, command, capability, command === "bun run test" ? { path: "local-test.ts", sha256: sha256("const value: number = 1; console.log(value);\n") } : null);
    const first = await validateRepository(fixture);
    const second = await validateRepository(fixture);
    assert.equal(first.validations[0].result, "PASS");
    assert.equal(second.validations[0].result, "PASS");
    assert.equal(second.validations[0].cache, "MISS");
  }
  assert.equal(git(fixture.repo, "status", "--porcelain"), "");
});

test("application grammar rejects extra flags, injections, forwarded args, wrappers and hidden forbidden actions", async () => {
  const fixture = await createFixture();
  await installFixtureBins(fixture);
  for (const command of [
    "tsc --noEmit --project other.json", "tsc --watch", "tsc", "eslint src", "eslint . --fix",
    "vite dev", "vite preview", "vite build --mode development", "vite --host",
    "node --experimental-strip-types --eval=1", "node --experimental-strip-types local-test.ts other.ts",
    "node --experimental-strip-types local-test.ts --import=x", "node --import=x local-test.ts",
    "node --loader=x local-test.ts", "node -r x local-test.ts", "node --eval=1 local-test.ts",
    "bun run tsc -- --noEmit", "bun run test extra", "bun run pretest", "bun run posttest",
  ]) await assert.rejects(() => prepareValidatorCommand(fixture.repo, command, fixture.manifest), (error) => ["UNSAFE_COMMAND", "FORBIDDEN_COMMAND"].includes(error.code), command);
  for (const script of ["sh -c 'tsc --noEmit'", "npm run tsc", "bun run tsc", "git push origin main", "node local-test.ts; git add ."]) {
    await writeFile(path.join(fixture.repo, "package.json"), JSON.stringify({ scripts: { test: script } }));
    await assert.rejects(() => prepareValidatorCommand(fixture.repo, "bun run test", fixture.manifest), (error) => ["UNSAFE_COMMAND", "FORBIDDEN_COMMAND"].includes(error.code));
  }
});

test("local bin profile rejects installed identity/bin traversal and directory aliases", async () => {
  const fixture = await createFixture();
  await installFixtureBins(fixture);
  const installed = path.join(fixture.repo, "node_modules/typescript/package.json");
  for (const [name, bin] of [["typescript", "../escape.js"], ["typescript", "/outside.js"], ["typescript", "bin/custom.js"], ["impostor", "bin/tsc"]]) {
    await writeFile(installed, JSON.stringify({ name, version: "1.0.0", bin: { tsc: bin } }));
    await assert.rejects(() => prepareValidatorCommand(fixture.repo, "tsc --noEmit", fixture.manifest), { code: "UNSAFE_COMMAND" });
  }
  await installFixtureBins(fixture);
  const bin = path.join(fixture.repo, "node_modules/typescript/bin");
  const saved = path.join(path.dirname(fixture.repo), "saved-bin");
  await rename(bin, saved);
  await symlink(saved, bin, "junction");
  await assert.rejects(() => prepareValidatorCommand(fixture.repo, "tsc --noEmit", fixture.manifest), { code: "UNSAFE_PATH" });
  await assert.rejects(() => prepareValidatorCommand(fixture.repo, "node --experimental-strip-types ../escape.ts", fixture.manifest), { code: "UNSAFE_PATH" });
  await mkdir(path.join(fixture.repo, "tests"));
  await rename(path.join(fixture.repo, "local-test.ts"), path.join(fixture.repo, "tests/local-test.ts"));
  await symlink(path.join(fixture.repo, "tests"), path.join(fixture.repo, "alias-tests"), "junction");
  await assert.rejects(() => prepareValidatorCommand(fixture.repo, "node --experimental-strip-types alias-tests/local-test.ts", fixture.manifest), { code: "UNSAFE_PATH" });
});

test("missing project dependencies are UNAVAILABLE with no global substitution or installation", async () => {
  const fixture = await createFixture();
  await installFixtureBins(fixture);
  // A .bin shim is deliberately never consulted, even when the real dependency is missing.
  await mkdir(path.join(fixture.repo, "node_modules/.bin"));
  await writeFile(path.join(fixture.repo, "node_modules/.bin/tsc"), "global impostor");
  await rm(path.join(fixture.repo, "node_modules/typescript"), { recursive: true });
  await assert.rejects(() => prepareValidatorCommand(fixture.repo, "bun run tsc", fixture.manifest), { code: "COMMAND_UNAVAILABLE" });
  const fakeGlobal = path.join(path.dirname(fixture.repo), "fake-global");
  await mkdir(fakeGlobal);
  await writeFile(path.join(fakeGlobal, process.platform === "win32" ? "tsc.cmd" : "tsc"), "impostor");
  const probe = spawnSync(process.execPath, ["--input-type=module", "-e", 'import {loadManifest,prepareValidatorCommand} from "./tools/tretnix/core.mjs"; const repo=process.argv[1]; const {manifest}=await loadManifest(repo); try { await prepareValidatorCommand(repo,"bun run tsc",manifest); process.stdout.write("UNEXPECTED_PASS"); } catch (error) { process.stdout.write(error.code); }', fixture.repo], {
    cwd: path.resolve(import.meta.dirname, "../../.."),
    env: { ...process.env, PATH: `${fakeGlobal}${path.delimiter}${process.env.PATH ?? ""}` },
    encoding: "utf8", windowsHide: true,
  });
  assert.equal(probe.status, 0, probe.stderr);
  assert.equal(probe.stdout, "COMMAND_UNAVAILABLE");
  useApplicationProfile(fixture, "bun run tsc", "typecheck");
  const result = await validateRepository(fixture);
  assert.equal(result.validations[0].result, "UNAVAILABLE");
  assert.equal(result.validations[0].exit_code, 127);
  assert.deepEqual(result.evidence.forbidden_actions_observed, []);
  const diagnostic = await doctor(fixture.repo, fixture.manifest, fixture.manifestPath);
  assert.equal(diagnostic.checks.find((entry) => entry.id.startsWith("command:")).status, "UNAVAILABLE");
});

test("doctor distinguishes available effective Node, unavailable, unsafe and malformed without executing", async () => {
  const fixture = await createFixture();
  await installFixtureBins(fixture);
  for (const [command, status] of [["bun run test", "PASS"], ["bun run tsc", "PASS"], ["vite dev", "UNSAFE"], ["node missing.mjs", "UNAVAILABLE"]]) {
    fixture.manifest.validation.validators[0].command = command;
    if (command === "bun run test") {
      fixture.manifest.validation.validators[0].capabilities = ["test"];
      fixture.manifest.validation.validators[0].reviewed_script = { validator_id: "fixture-pass", path: "local-test.ts", sha256: sha256("const value: number = 1; console.log(value);\n"), capabilities: ["test"] };
    } else {
      delete fixture.manifest.validation.validators[0].reviewed_script;
      if (command === "bun run tsc") fixture.manifest.validation.validators[0].capabilities = ["typecheck"];
    }
    const result = await doctor(fixture.repo, fixture.manifest, fixture.manifestPath);
    assert.equal(result.checks.find((entry) => entry.id.startsWith("command:")).status, status);
  }
  await writeFile(path.join(fixture.repo, "package.json"), "malformed");
  fixture.manifest.validation.validators[0].command = "bun run test";
  const result = await doctor(fixture.repo, fixture.manifest, fixture.manifestPath);
  assert.equal(result.checks.find((entry) => entry.id.startsWith("command:")).status, "MALFORMED");
  await assert.rejects(() => readFile(path.join(fixture.repo, ".tretnix")), { code: "ENOENT" });
});

test("F-01 ignored validator input changes force real execution and make evidence non-replayable", async () => {
  const fixture = await createFixture();
  const script = 'import { readFileSync, appendFileSync } from "node:fs";\nconst value = readFileSync("node_modules/probe.txt", "utf8");\nappendFileSync("node_modules/runs.txt", `${value}\\n`);\n';
  await writeFile(path.join(fixture.repo, ".gitignore"), ".tretnix/\nnode_modules/\n.env*\n");
  await mkdir(path.join(fixture.repo, "node_modules"));
  await writeFile(path.join(fixture.repo, "node_modules/probe.txt"), "first");
  await writeFile(path.join(fixture.repo, "fixture-validator.mjs"), script);
  fixture.manifest.validation.validators[0].reviewed_script.sha256 = sha256(script);
  await writeJsonAtomic(fixture.manifestPath, fixture.manifest, fixture.repo);
  git(fixture.repo, "add", ".");
  git(fixture.repo, "commit", "-m", "test: reviewed validator with ignored input");
  const first = await validateRepository(fixture);
  assert.equal(first.validations[0].result, "PASS");
  assert.equal(first.validations[0].cache, "MISS");
  assert.equal(await readFile(path.join(fixture.repo, "node_modules/runs.txt"), "utf8"), "first\n");
  await writeFile(path.join(fixture.repo, "node_modules/probe.txt"), "second");
  await assert.rejects(() => regenerateLatestEvidence(fixture.repo), { code: "STALE_EVIDENCE" });
  const second = await validateRepository(fixture);
  assert.equal(second.fingerprint.fingerprint, first.fingerprint.fingerprint);
  assert.equal(second.validations[0].cache, "MISS");
  assert.equal(await readFile(path.join(fixture.repo, "node_modules/runs.txt"), "utf8"), "first\nsecond\n");
  const metadata = await readJson(path.join(fixture.repo, ".tretnix/cache/validation", second.validations[0].cache_key, "metadata.json"));
  assert.equal(metadata.reusable, false);
  assert.equal(second.validations[0].declared_cacheable, true);
  assert.equal(second.validations[0].runtime_cache_safe, false);
});

test("F-01 reviewed scripts and fixed package bins never inherit manifest cacheability", async () => {
  const fixture = await createFixture();
  await installFixtureBins(fixture);
  for (const command of ["node fixture-validator.mjs", "node --check fixture-validator.mjs", "node --test fixture-validator.mjs", "node --experimental-strip-types local-test.ts", "tsc --noEmit", "eslint .", "vite build", "bun run tsc", "bun run test"]) {
    const prepared = await prepareValidatorCommand(fixture.repo, command, fixture.manifest);
    assert.equal(prepared.cacheSafe, false, command);
  }
  for (const command of ["git -c core.whitespace=cr-at-eol diff --check", "git diff --check", "git status --short", "git rev-parse HEAD", "git ls-files -z"]) {
    const prepared = await prepareValidatorCommand(fixture.repo, command, fixture.manifest);
    assert.equal(prepared.cacheSafe, command === "git -c core.whitespace=cr-at-eol diff --check", command);
  }
});

test("F-01 Git whitespace proof reuses only a clean tree", async () => {
  const fixture = await createFixture();
  addReusableGitValidator(fixture);
  const cleanFirst = await validateRepository(fixture);
  const cleanSecond = await validateRepository(fixture);
  assert.equal(cleanFirst.fingerprint.clean, true);
  assert.equal(cleanFirst.validations[1].cache, "MISS");
  assert.equal(cleanSecond.validations[1].cache, "HIT");
  await writeFile(path.join(fixture.repo, "STATUS.md"), "# Status\n\nChanged.\n");
  const dirtyFirst = await validateRepository(fixture);
  const dirtySecond = await validateRepository(fixture);
  assert.equal(dirtyFirst.fingerprint.clean, false);
  assert.equal(dirtyFirst.validations[1].cache, "MISS");
  assert.equal(dirtySecond.validations[1].cache, "MISS");
  assert.equal(dirtySecond.validations[1].runtime_cache_safe, false);
  await assert.rejects(() => regenerateLatestEvidence(fixture.repo), { code: "STALE_EVIDENCE" });
});

test("OR-01 tracked mutation blocks a later valid Git cache HIT and current evidence", async () => {
  const fixture = await createFixture();
  addReusableGitValidator(fixture);
  const script = 'import { existsSync, writeFileSync } from "node:fs";\nif (existsSync("node_modules/trigger")) writeFileSync("STATUS.md", "# Status\\n\\nChanged.  \\n");\n';
  await writeFile(path.join(fixture.repo, ".gitignore"), ".tretnix/\nnode_modules/\n.env*\n");
  await writeFile(path.join(fixture.repo, "fixture-validator.mjs"), script);
  fixture.manifest.validation.validators[0].reviewed_script.sha256 = sha256(script);
  await writeJsonAtomic(fixture.manifestPath, fixture.manifest, fixture.repo);
  git(fixture.repo, "add", ".");
  git(fixture.repo, "commit", "-m", "test: conditional tracked mutation validator");

  const seed = await validateRepository(fixture);
  assert.equal(seed.fingerprint.clean, true);
  assert.equal(seed.validations[1].cache, "MISS");
  const pointerPath = path.join(fixture.repo, ".tretnix/runtime/latest-evidence.json");
  const pointerBefore = await readFile(pointerPath, "utf8");
  await mkdir(path.join(fixture.repo, "node_modules"));
  await writeFile(path.join(fixture.repo, "node_modules/trigger"), "mutate");
  const before = await repositoryFingerprint(fixture.repo, fixture.manifest, fixture.manifestPath);
  assert.equal(before.fingerprint, seed.fingerprint.fingerprint);
  await assert.rejects(() => validateRepository(fixture), { code: "APPLICATION_STATE_DRIFT" });
  assert.match(await readFile(path.join(fixture.repo, "STATUS.md"), "utf8"), /Changed\.  /);
  assert.notEqual((await repositoryFingerprint(fixture.repo, fixture.manifest, fixture.manifestPath)).fingerprint, seed.fingerprint.fingerprint);
  assert.equal(await readFile(pointerPath, "utf8"), pointerBefore);
});

test("OR-01 final executed validator mutation aborts before successful evidence", async () => {
  const fixture = await createFixture();
  const script = 'import { writeFileSync } from "node:fs";\nwriteFileSync("STATUS.md", "# Status\\n\\nChanged.\\n");\n';
  await writeFile(path.join(fixture.repo, "fixture-validator.mjs"), script);
  fixture.manifest.validation.validators[0].reviewed_script.sha256 = sha256(script);
  await writeJsonAtomic(fixture.manifestPath, fixture.manifest, fixture.repo);
  git(fixture.repo, "add", ".");
  git(fixture.repo, "commit", "-m", "test: final tracked mutator");
  await assert.rejects(() => validateRepository(fixture), { code: "APPLICATION_STATE_DRIFT" });
  assert.match(await readFile(path.join(fixture.repo, "STATUS.md"), "utf8"), /Changed\./);
  await assert.rejects(() => readFile(path.join(fixture.repo, ".tretnix/runtime/latest-evidence.json")), { code: "ENOENT" });
});

test("OR-01 self-modifying reviewed script loses attestation and current proof", async () => {
  const fixture = await createFixture();
  const script = 'import { appendFileSync } from "node:fs";\nappendFileSync("fixture-validator.mjs", "// changed\\n");\n';
  await writeFile(path.join(fixture.repo, "fixture-validator.mjs"), script);
  fixture.manifest.validation.validators[0].reviewed_script.sha256 = sha256(script);
  await writeJsonAtomic(fixture.manifestPath, fixture.manifest, fixture.repo);
  git(fixture.repo, "add", ".");
  git(fixture.repo, "commit", "-m", "test: self-modifying reviewed validator");
  await assert.rejects(() => validateRepository(fixture), (error) => error.code === "APPLICATION_STATE_DRIFT" && error.details.reason === "ATTESTED_SCRIPT_CHANGED");
  assert.match(await readFile(path.join(fixture.repo, "fixture-validator.mjs"), "utf8"), /\/\/ changed/);
  await assert.rejects(() => readFile(path.join(fixture.repo, ".tretnix/runtime/latest-evidence.json")), { code: "ENOENT" });
});

test("F-02 fixed profiles reject capability escalation while legitimate mappings remain valid", async () => {
  const fixture = await createFixture();
  await installFixtureBins(fixture);
  for (const [command, allowed, forbidden] of [["tsc --noEmit", "typecheck", ["security", "build"]], ["eslint .", "lint", ["build", "security"]], ["vite build", "build", ["security", "arbitrary"]], ["git -c core.whitespace=cr-at-eol diff --check", "whitespace", ["test"]]]) {
    const prepared = await prepareValidatorCommand(fixture.repo, command, fixture.manifest);
    assert.deepEqual(effectiveValidatorCapabilities(prepared, { id: "fixed", capabilities: [allowed] }), [allowed]);
    for (const claim of forbidden) assert.throws(() => effectiveValidatorCapabilities(prepared, { id: "fixed", capabilities: [claim] }), { code: "UNATTESTED_CAPABILITY" });
  }
  useApplicationProfile(fixture, "tsc --noEmit", "security");
  fixture.manifest.validation.validators[1].capabilities = ["static", "whitespace", "test", "config"];
  fixture.manifest.validation.validators[1].reviewed_script.capabilities = ["static", "whitespace", "test", "config"];
  const plan = await validationPlan(fixture.repo, fixture.manifest, "security_or_data");
  assert.ok(plan.missing_capabilities.includes("security"));
  const validation = await validateRepository({ ...fixture, task: { ...fixture.task, task_class: "security_or_data" } });
  assert.equal(validation.evidence.result, "FAIL");
  assert.ok(validation.evidence.validation_plan.missing_capabilities.includes("security"));
});

test("F-02 reviewed script attestation binds path, bytes and explicit capability set", async () => {
  const fixture = await createFixture();
  const validator = fixture.manifest.validation.validators[0];
  const prepared = await prepareValidatorCommand(fixture.repo, validator.command, fixture.manifest);
  assert.deepEqual(effectiveValidatorCapabilities(prepared, validator), validator.capabilities);
  const original = structuredClone(validator.reviewed_script);
  for (const invalid of [
    null,
    { ...original, path: "../fixture-validator.mjs" },
    { ...original, path: path.join(fixture.repo, "fixture-validator.mjs") },
    { ...original, path: "other-validator.mjs" },
    { ...original, sha256: "0".repeat(64) },
    { ...original, capabilities: ["static"] },
    { ...original, capabilities: [...original.capabilities, "build"] },
    { ...original, validator_id: "different-validator" },
    { ...original, capabilities: ["static", "static"] },
    { ...original, unexpected: true },
  ]) {
    if (invalid === null) delete validator.reviewed_script;
    else validator.reviewed_script = invalid;
    assert.throws(() => effectiveValidatorCapabilities(prepared, validator), { code: "UNATTESTED_CAPABILITY" });
  }
  validator.reviewed_script = original;
  validator.capabilities = [...validator.capabilities, "build"];
  assert.throws(() => effectiveValidatorCapabilities(prepared, validator), { code: "UNATTESTED_CAPABILITY" });
  validator.capabilities.pop();
  assert.notDeepEqual(validateProjectManifest({ ...fixture.manifest, validation: { ...fixture.manifest.validation, validators: [{ ...validator, reviewed_script: { ...original, validator_id: "different-validator" } }] } }), []);
  await writeFile(path.join(fixture.repo, "other-validator.mjs"), await readFile(path.join(fixture.repo, "fixture-validator.mjs")));
  validator.command = "node other-validator.mjs";
  const sameBytesDifferentPath = await prepareValidatorCommand(fixture.repo, validator.command, fixture.manifest);
  assert.throws(() => effectiveValidatorCapabilities(sameBytesDifferentPath, validator), { code: "UNATTESTED_CAPABILITY" });
  validator.command = "node fixture-validator.mjs";
  await writeFile(path.join(fixture.repo, "fixture-validator.mjs"), "process.exit(0);\n");
  const changed = await prepareValidatorCommand(fixture.repo, validator.command, fixture.manifest);
  assert.throws(() => effectiveValidatorCapabilities(changed, validator), { code: "UNATTESTED_CAPABILITY" });
  const stalePlan = await validationPlan(fixture.repo, fixture.manifest, "docs_only");
  assert.ok(stalePlan.missing_capabilities.includes("static"));
});

test("F-02 attestation cannot bypass grammar, containment or fixed-profile ceilings", async () => {
  const fixture = await createFixture();
  const validator = fixture.manifest.validation.validators[0];
  validator.reviewed_script = { ...validator.reviewed_script, win32: { ...validator.reviewed_script } };
  assert.notDeepEqual(validateProjectManifest(fixture.manifest), []);
  validator.reviewed_script = { path: "../outside.mjs", sha256: "0".repeat(64), capabilities: ["static"] };
  assert.notDeepEqual(validateProjectManifest(fixture.manifest), []);
  validator.reviewed_script = { path: "fixture-validator.mjs", sha256: "0".repeat(64), capabilities: ["static"] };
  for (const command of ["node ../outside.mjs", "node C:/outside.mjs", "sh -c node fixture-validator.mjs", "node --import=fixture-validator.mjs fixture-validator.mjs", "evil fixture-validator.mjs"]) {
    await assert.rejects(() => prepareValidatorCommand(fixture.repo, command, fixture.manifest), (error) => ["UNSAFE_PATH", "UNSAFE_COMMAND"].includes(error.code));
  }
  await assert.rejects(() => prepareValidatorCommand(fixture.repo, "node missing.mjs", fixture.manifest), { code: "MISSING_FILE" });
  await mkdir(path.join(fixture.repo, "safe"));
  await writeFile(path.join(fixture.repo, "safe/probe.mjs"), "process.exit(0);\n");
  await symlink(path.join(fixture.repo, "safe"), path.join(fixture.repo, "aliased"), "junction");
  await assert.rejects(() => prepareValidatorCommand(fixture.repo, "node aliased/probe.mjs", fixture.manifest), { code: "UNSAFE_PATH" });
  await installFixtureBins(fixture);
  const fixed = await prepareValidatorCommand(fixture.repo, "tsc --noEmit", fixture.manifest);
  validator.capabilities = ["typecheck"];
  validator.reviewed_script = { path: "fixture-validator.mjs", sha256: "0".repeat(64), capabilities: ["typecheck"] };
  assert.throws(() => effectiveValidatorCapabilities(fixed, validator), { code: "UNATTESTED_CAPABILITY" });
});
