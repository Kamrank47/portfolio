import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

const exists = async (target) => {
  try {
    await stat(target);
    return true;
  } catch {
    return false;
  }
};

const files = (await walk(dist)).filter((file) => file.endsWith(".html"));
const failures = [];

for (const file of files) {
  const html = await readFile(file, "utf8");
  const page = "/" + path.relative(dist, file).replace(/index\.html$/, "").replace(/\\/g, "/");

  const refs = [...html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)].map((match) => match[1]);
  for (const ref of new Set(refs)) {
    const clean = ref.split("#")[0];
    const target = path.join(dist, decodeURIComponent(clean));
    const resolved =
      (await exists(target)) ||
      (await exists(target + ".html")) ||
      (await exists(path.join(target, "index.html")));
    if (!resolved) failures.push(`${page} -> ${ref}`);
  }
}

if (failures.length) {
  console.error("Broken internal references:");
  for (const failure of failures) console.error("  " + failure);
  process.exit(1);
}

console.log(`Checked ${files.length} pages, no broken internal references.`);
