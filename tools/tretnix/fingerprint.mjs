import { readFile } from "node:fs/promises";
import path from "node:path";
import {
  FINGERPRINT_CONTRACT_VERSION,
  confineSourceFile,
  gitBuffer,
  gitText,
  isRuntimePath,
  isSensitiveDeclaredPath,
  inspectPath,
  normalizeRepositoryIdentity,
  pathMatches,
  relativePosix,
  sha256,
  splitNullBuffer,
  stableJson,
  taskRepositoryMatches,
} from "./core.mjs";

function listGitPaths(repo, args) {
  return splitNullBuffer(gitBuffer(repo, args)).sort();
}

export function collectWorkingTree(repo, manifest = { validation: {} }, { allowWorktreeDiff = true } = {}) {
  const stagedRaw = listGitPaths(repo, ["diff", "--no-ext-diff", "--no-textconv", "--name-only", "-z", "--cached", "HEAD"]);
  const unstagedRaw = listGitPaths(repo, allowWorktreeDiff
    ? ["diff", "--no-ext-diff", "--no-textconv", "--name-only", "-z"]
    : ["ls-files", "--modified", "-z"]);
  const untrackedRaw = listGitPaths(repo, ["ls-files", "--others", "--exclude-standard", "-z"]);
  const trackedRaw = listGitPaths(repo, ["ls-files", "-z"]);
  const sensitivePredicate = (entry) => isSensitiveDeclaredPath(entry, manifest);
  const relevant = (entries) => entries.filter((entry) => !isRuntimePath(entry) && !sensitivePredicate(entry));
  const sensitive = [...new Set([...trackedRaw, ...stagedRaw, ...unstagedRaw, ...untrackedRaw].filter(sensitivePredicate))].sort();
  return {
    staged: relevant(stagedRaw),
    unstaged: relevant(unstagedRaw),
    untracked: relevant(untrackedRaw),
    sensitive,
  };
}

export async function repositoryFingerprint(repo, manifest, manifestPath, { contentDiff = gitBuffer, readBytes = readFile } = {}) {
  const root = path.resolve(repo);
  const confinedManifestPath = await confineSourceFile(root, manifestPath, manifest, "project manifest");
  const head = gitText(root, ["rev-parse", "HEAD"]);
  const trackedPaths = listGitPaths(root, ["ls-files", "-z"]).filter((entry) => !isRuntimePath(entry));
  const untrackedPaths = listGitPaths(root, ["ls-files", "--others", "--exclude-standard", "-z"]).filter((entry) => !isRuntimePath(entry));
  const lockPaths = [...(manifest.validation?.lockfiles ?? [])].map((entry) => entry.replaceAll("\\", "/")).sort();
  const candidates = [...new Set([...trackedPaths, ...untrackedPaths, ...lockPaths])].sort();
  const unsafe = new Map();
  const sensitive = new Set();
  const inspect = async (relative) => {
    const state = await inspectPath(root, relative, manifest, "fingerprint path");
    if (state.metadata.sensitive) sensitive.add(relative);
    if (state.aliased || state.metadata.sensitive) unsafe.set(relative, { ...state.metadata, exists: state.exists });
    return state;
  };
  // Classify nominal paths, real targets and the entire chain before any byte read or Git content diff.
  for (const relative of candidates) await inspect(relative);
  const workingTree = collectWorkingTree(root, manifest, { allowWorktreeDiff: unsafe.size === 0 });
  for (const relative of workingTree.sensitive) sensitive.add(relative);
  const hashEntry = async (relative) => {
    const state = await inspect(relative);
    if (unsafe.has(relative)) return { path: relative, sha256: null, unreadable: unsafe.get(relative) };
    return { path: relative, sha256: state.exists ? sha256(await readBytes(state.lexical)) : null };
  };
  const untracked = [];
  for (const relative of workingTree.untracked) untracked.push(await hashEntry(relative));
  const manifestHash = sha256(await readBytes(await confineSourceFile(root, confinedManifestPath, manifest, "project manifest")));
  const lockfiles = [];
  for (const relative of lockPaths) lockfiles.push(await hashEntry(relative));
  const tracked = [];
  for (const relative of trackedPaths) {
    if (isSensitiveDeclaredPath(relative, manifest)) continue;
    tracked.push(await hashEntry(relative));
  }
  // Recheck before content-producing Git operations; unreadable state is never exact-state reusable.
  for (const relative of candidates) await inspect(relative);
  workingTree.sensitive = [...sensitive].sort();
  const unsafePaths = [...unsafe.values()];
  const canReadDiff = unsafePaths.length === 0 && workingTree.sensitive.length === 0;
  const diffScope = ["--", ".", ":(exclude).tretnix", ":(exclude).tretnix/**", ":(exclude).git/**"];
  const stagedDiff = canReadDiff ? contentDiff(root, ["diff", "--binary", "--no-ext-diff", "--no-textconv", "--cached", "HEAD", ...diffScope]) : null;
  const unstagedDiff = canReadDiff ? contentDiff(root, ["diff", "--binary", "--no-ext-diff", "--no-textconv", ...diffScope]) : null;
  const changed = [...new Set([...workingTree.staged, ...workingTree.unstaged, ...workingTree.untracked])].sort();
  const generatedPaths = manifest.validation?.generated_paths ?? [];
  const generated = changed.filter((entry) => pathMatches(entry, generatedPaths));
  const undeclaredGenerated = changed.filter(
    (entry) => /(^|\/)(dist|build|coverage|\.next|\.output)\//.test(entry) && !pathMatches(entry, generatedPaths),
  );
  const clean = changed.length === 0 && canReadDiff;
  const payload = clean
    ? {
        contract_version: FINGERPRINT_CONTRACT_VERSION,
        head,
        lockfiles,
        manifest_sha256: manifestHash,
        tracked_worktree_bytes: tracked,
      }
    : {
        contract_version: FINGERPRINT_CONTRACT_VERSION,
        head,
        lockfiles,
        manifest_sha256: manifestHash,
        tracked_worktree_bytes: tracked,
        staged_diff_sha256: stagedDiff === null ? null : sha256(stagedDiff),
        unstaged_diff_sha256: unstagedDiff === null ? null : sha256(unstagedDiff),
        untracked,
        sensitive_paths_present: workingTree.sensitive,
        unreadable_paths: unsafePaths,
      };

  return {
    schema_version: 1,
    contract_version: FINGERPRINT_CONTRACT_VERSION,
    repository_root: root,
    head,
    clean,
    cache_eligible: canReadDiff,
    unreadable_paths: unsafePaths,
    fingerprint: sha256(stableJson(payload, 0)),
    manifest_sha256: manifestHash,
    lockfiles,
    working_tree: workingTree,
    generated_paths: generated,
    undeclared_generated_paths: undeclaredGenerated,
    payload,
  };
}

export function repositoryIdentity(repo, manifest) {
  const topLevel = gitText(repo, ["rev-parse", "--show-toplevel"]);
  const branch = gitText(repo, ["branch", "--show-current"]);
  const remote = gitText(repo, ["remote", "get-url", "origin"], { allowFailure: true });
  return {
    top_level: path.resolve(topLevel),
    requested_root: path.resolve(repo),
    branch,
    remote,
    repository: manifest.project.repository,
    relative_root: relativePosix(path.resolve(topLevel), path.resolve(repo)),
  };
}

export async function preflightRepository(repo, manifest, manifestPath, { requireClean = false, task = null } = {}) {
  const identity = repositoryIdentity(repo, manifest);
  const fingerprint = await repositoryFingerprint(repo, manifest, manifestPath);
  const expected = normalizeRepositoryIdentity(manifest.project.repository);
  const actual = normalizeRepositoryIdentity(identity.remote);
  const allowedPrefixes = manifest.project.allowed_branch_prefixes ?? [];
  const branchAllowed = identity.branch === manifest.project.default_branch || allowedPrefixes.some((prefix) => identity.branch.startsWith(prefix));
  const issues = [];
  if (path.resolve(identity.top_level) !== path.resolve(repo)) issues.push({ code: "WRONG_REPOSITORY_ROOT", actual: identity.top_level });
  if (expected !== actual) issues.push({ code: "UNEXPECTED_REMOTE", expected, actual });
  if (!branchAllowed) issues.push({ code: "UNEXPECTED_BRANCH", actual: identity.branch });
  if (task && !taskRepositoryMatches(task.repository, manifest.project.repository, manifest.project.id)) issues.push({ code: "TASK_REPOSITORY_MISMATCH", actual: task.repository });
  if (task?.expected_branch && task.expected_branch !== identity.branch) issues.push({ code: "UNEXPECTED_TASK_BRANCH", expected: task.expected_branch, actual: identity.branch });
  if ((requireClean || task?.working_tree === "clean_required") && !fingerprint.clean) issues.push({ code: "UNEXPECTED_DIRTY_TREE" });
  if (fingerprint.working_tree.sensitive.length) issues.push({ code: "SENSITIVE_PATH_PRESENT", paths: fingerprint.working_tree.sensitive });
  const aliasedPaths = fingerprint.unreadable_paths.filter((entry) => entry.aliases.length).map((entry) => entry.path);
  if (aliasedPaths.length) issues.push({ code: "ALIASED_PATH_PRESENT", paths: aliasedPaths });
  if (fingerprint.undeclared_generated_paths.length) issues.push({ code: "UNDECLARED_GENERATED_PATH", paths: fingerprint.undeclared_generated_paths });
  return { schema_version: 1, ok: issues.length === 0, identity, fingerprint, issues };
}
