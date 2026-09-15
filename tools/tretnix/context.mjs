import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import {
  RESOLVER_VERSION,
  TretnixError,
  confineExistingPath,
  confineRegularFile,
  confineSourceFile,
  gitText,
  isSensitiveDeclaredPath,
  pathMatches,
  pathExists,
  readJson,
  relativePosix,
  resolveExistingInside,
  resolveOutputInside,
  sha256,
  stableJson,
  taskRepositoryMatches,
  writeJsonAtomic,
  writeTextAtomic,
} from "./core.mjs";

function headingLevel(line) {
  return line.match(/^(#{1,6})\s/)?.[1].length ?? null;
}

export function extractMarkdownSection(text, heading) {
  const lines = text.replaceAll("\r\n", "\n").split("\n");
  const start = lines.findIndex((line) => line.trimEnd() === heading);
  if (start === -1) throw new TretnixError("MISSING_CONTEXT", `Heading not found: ${heading}`);
  const level = headingLevel(lines[start]);
  let end = lines.length;
  for (let index = start + 1; index < lines.length; index += 1) {
    const candidate = headingLevel(lines[index]);
    if (candidate && candidate <= level) {
      end = index;
      break;
    }
  }
  return lines.slice(start, end).join("\n").trimEnd();
}

function normalizeSource(entry, defaults = {}) {
  if (typeof entry === "string") return { base: defaults.base ?? "repo", path: entry, reason: defaults.reason ?? "declared source" };
  return { base: entry.base ?? defaults.base ?? "repo", path: entry.path, sections: entry.sections ?? [], reason: entry.reason ?? defaults.reason ?? "declared source" };
}

function sourceKey(entry) {
  return `${entry.base}:${entry.path}:${(entry.sections ?? []).join("|")}`;
}

function dedupeSources(sources) {
  const seen = new Set();
  return sources.filter((source) => {
    const key = sourceKey(source);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function materializeSource(source, roots, knowledgeCommit, manifest) {
  if (!source.path || typeof source.path !== "string") throw new TretnixError("MISSING_CONTEXT", "Context source has no path");
  const baseRoot = source.base === "knowledge" ? roots.knowledge : roots.repo;
  if (!baseRoot) throw new TretnixError("MISSING_CONTEXT", `No root configured for source base: ${source.base}`);
  const allowlist = manifest.context.source_allowlists?.[source.base] ?? [];
  if (!pathMatches(source.path, allowlist)) throw new TretnixError("CONTEXT_SOURCE_NOT_ALLOWED", `Context source is outside the ${source.base} allowlist: ${source.path}`);
  if (isSensitiveDeclaredPath(source.path, manifest)) throw new TretnixError("SENSITIVE_CONTEXT_SOURCE", `Sensitive context source is forbidden: ${source.base}:${source.path}`);
  let absolute;
  try {
    absolute = await confineSourceFile(baseRoot, source.path, manifest, "context source");
  } catch (error) {
    if (error.code === "MISSING_FILE") throw new TretnixError("MISSING_CONTEXT", `Required context source is missing: ${source.base}:${source.path}`);
    throw error;
  }
  const bytes = await readFile(absolute);
  const decoded = bytes.toString("utf8");
  if (bytes.includes(0) || decoded.includes("\uFFFD")) throw new TretnixError("INVALID_CONTEXT_SOURCE", `Context source is not valid UTF-8 text: ${source.base}:${source.path}`);
  const text = decoded.replaceAll("\r\n", "\n");
  const sections = source.sections ?? [];
  const excerpt = sections.length ? sections.map((heading) => extractMarkdownSection(text, heading)).join("\n\n") : text.trimEnd();
  return {
    base: source.base,
    path: relativePosix(baseRoot, absolute),
    display_path: `${source.base}:${relativePosix(baseRoot, absolute)}`,
    sha256: sha256(bytes),
    knowledge_commit: path.resolve(baseRoot) === path.resolve(roots.knowledge) ? knowledgeCommit : null,
    headings: sections,
    reason: source.reason,
    excerpt,
  };
}

function renderPack(task, selected, key) {
  const lines = [
    "# Tretnix Task Context",
    "",
    `- Resolver version: \`${RESOLVER_VERSION}\``,
    `- Context key: \`${key}\``,
    `- Task: ${task.title}`,
    `- Repository: \`${task.repository}\``,
    `- Tags: ${[...task.tags].sort().map((tag) => `\`${tag}\``).join(", ")}`,
    "",
    "This file is deterministic, derived context. Canonical sources retain authority.",
    "",
  ];
  for (const source of selected) {
    lines.push(`## ${source.display_path}`);
    lines.push("");
    lines.push(`- SHA-256: \`${source.sha256}\``);
    lines.push(`- Knowledge commit: ${source.knowledge_commit ? `\`${source.knowledge_commit}\`` : "not applicable"}`);
    lines.push(`- Heading: ${source.headings.length ? source.headings.map((entry) => `\`${entry}\``).join(", ") : "complete file"}`);
    lines.push(`- Inclusion reason: ${source.reason}`);
    lines.push("");
    lines.push(source.excerpt);
    lines.push("");
  }
  return `${lines.join("\n").trimEnd()}\n`;
}

export async function resolveContext({ repo, knowledge, manifest, manifestPath, task, taskPath }) {
  const repoRoot = path.resolve(repo);
  const confinedManifestPath = await confineSourceFile(repoRoot, manifestPath, manifest, "project manifest");
  const confinedTaskPath = await confineSourceFile(repoRoot, taskPath, manifest, "task descriptor");
  if (!taskRepositoryMatches(task.repository, manifest.project.repository, manifest.project.id)) {
    throw new TretnixError("TASK_REPOSITORY_MISMATCH", `Task repository does not match the project manifest: ${task.repository}`);
  }
  const knowledgeRoot = knowledge ? path.resolve(knowledge) : repoRoot;
  const knowledgeCommit = gitText(knowledgeRoot, ["rev-parse", "HEAD"]);
  const sources = [];
  sources.push(...manifest.sources.local_decisions.map((entry) => normalizeSource(entry, { base: "repo", reason: "Layer A approved local decisions" })));
  sources.push(...manifest.sources.agents.map((entry) => normalizeSource(entry, { base: "repo", reason: "Layer A repository instructions" })));
  sources.push(...manifest.sources.status.map((entry) => normalizeSource(entry, { base: "repo", reason: "Layer A current status" })));
  for (const entry of manifest.context?.compact_adapters ?? []) sources.push(normalizeSource(entry, { base: "knowledge", reason: "Layer A compact adapter" }));

  const unknownTags = [];
  for (const tag of [...task.tags].sort()) {
    const mapped = manifest.context?.tag_sources?.[tag];
    if (!mapped) {
      unknownTags.push(tag);
      continue;
    }
    for (const entry of mapped) sources.push(normalizeSource(entry, { base: "knowledge", reason: `Layer B task tag: ${tag}` }));
  }
  if (unknownTags.length) {
    throw new TretnixError("MISSING_CONTEXT", `No deterministic context mapping for task tags: ${unknownTags.join(", ")}`, { unknown_tags: unknownTags });
  }
  for (const entry of task.required_sources ?? []) sources.push(normalizeSource(entry, { reason: "Layer C task-required source" }));

  const manifestBytes = await readFile(confinedManifestPath);
  const taskBytes = await readFile(confinedTaskPath);
  const selected = [];
  selected.push({
    base: "repo",
    path: relativePosix(repoRoot, confinedManifestPath),
    display_path: `repo:${relativePosix(repoRoot, confinedManifestPath)}`,
    sha256: sha256(manifestBytes),
    knowledge_commit: repoRoot === knowledgeRoot ? knowledgeCommit : null,
    headings: [],
    reason: "Layer A project manifest",
    excerpt: manifestBytes.toString("utf8").replaceAll("\r\n", "\n").trimEnd(),
  });
  selected.push({
    base: "repo",
    path: relativePosix(repoRoot, confinedTaskPath),
    display_path: `repo:${relativePosix(repoRoot, confinedTaskPath)}`,
    sha256: sha256(taskBytes),
    knowledge_commit: repoRoot === knowledgeRoot ? knowledgeCommit : null,
    headings: [],
    reason: "Layer A task descriptor",
    excerpt: taskBytes.toString("utf8").replaceAll("\r\n", "\n").trimEnd(),
  });
  for (const source of dedupeSources(sources)) selected.push(await materializeSource(source, { repo: repoRoot, knowledge: knowledgeRoot }, knowledgeCommit, manifest));

  const agentsHashes = selected.filter((entry) => manifest.sources.agents.some((agent) => (typeof agent === "string" ? agent : agent.path) === entry.path)).map((entry) => entry.sha256);
  const statusHashes = selected.filter((entry) => manifest.sources.status.some((status) => (typeof status === "string" ? status : status.path) === entry.path)).map((entry) => entry.sha256);
  const keyPayload = {
    knowledge_commit: knowledgeCommit,
    project_manifest_sha256: sha256(manifestBytes),
    task_descriptor_sha256: sha256(taskBytes),
    agents_sha256: agentsHashes,
    local_status_sha256: statusHashes,
    ordered_selected_source_sha256s: selected.map((entry) => `${entry.display_path}:${entry.sha256}:${entry.headings.join("|")}`),
    task_tags: [...task.tags].sort(),
    resolver_version: RESOLVER_VERSION,
  };
  const key = sha256(stableJson(keyPayload, 0));
  const cacheDirectory = await resolveOutputInside(repoRoot, `.tretnix/cache/context/${key}`, "context cache entry");
  const cachePack = path.join(cacheDirectory, "TASK_CONTEXT.md");
  const cacheMetadata = path.join(cacheDirectory, "metadata.json");
  let cache = "MISS";
  let rejection = null;
  let pack;
  const packExists = await pathExists(cachePack);
  const metadataExists = await pathExists(cacheMetadata);
  if (packExists !== metadataExists) rejection = "INCOMPLETE_CACHE";
  if (packExists && metadataExists) {
    try {
      await confineRegularFile(cacheDirectory, cacheMetadata);
      await confineRegularFile(cacheDirectory, cachePack);
      const metadata = await readJson(cacheMetadata, "CORRUPT_CACHE");
      const cached = await readFile(cachePack, "utf8");
      if (metadata.schema_version !== 1 || metadata.resolver_version !== RESOLVER_VERSION || metadata.key !== key || metadata.pack_sha256 !== sha256(cached)) {
        throw new TretnixError("STALE_CACHE", "Context cache metadata does not match the current contract");
      }
      pack = cached;
      cache = "HIT";
    } catch (error) {
      if (error.code === "UNSAFE_PATH") throw error;
      rejection = error.code ?? "CORRUPT_CACHE";
    }
  }
  if (cache === "MISS") {
    pack = renderPack(task, selected, key);
    await mkdir(cacheDirectory, { recursive: true });
    await writeTextAtomic(cachePack, pack, repoRoot);
    await writeJsonAtomic(cacheMetadata, {
      schema_version: 1,
      resolver_version: RESOLVER_VERSION,
      key,
      pack_sha256: sha256(pack),
      selected_sources: selected.map(({ excerpt, ...entry }) => entry),
      key_payload: keyPayload,
    }, repoRoot);
  }
  const runtimeDirectory = await resolveOutputInside(repoRoot, ".tretnix/runtime", "context runtime directory");
  await writeTextAtomic(path.join(runtimeDirectory, "TASK_CONTEXT.md"), pack, repoRoot);
  const result = {
    schema_version: 1,
    resolver_version: RESOLVER_VERSION,
    cache,
    cache_rejection: rejection,
    key,
    output: path.join(runtimeDirectory, "TASK_CONTEXT.md"),
    source_count: selected.length,
    bytes: Buffer.byteLength(pack),
    lines: pack.split("\n").length - 1,
    sources: selected.map(({ excerpt, ...entry }) => entry),
  };
  await writeJsonAtomic(path.join(runtimeDirectory, "context.json"), result, repoRoot);
  return result;
}
