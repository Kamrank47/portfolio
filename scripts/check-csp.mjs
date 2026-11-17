import { readFile, readdir } from "node:fs/promises";
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

const problems = [];
const files = (await walk(dist)).filter((file) => file.endsWith(".html"));

for (const file of files) {
  const html = await readFile(file, "utf8");
  const page = "/" + path.relative(dist, file).replace(/\\/g, "/");

  for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script[^>]*>/gi)) {
    const attrs = match[1];
    const body = match[2].trim();
    const isData = /application\/ld\+json/i.test(attrs);
    const hasSrc = /\bsrc=/.test(attrs);
    if (!isData && !hasSrc && body.length > 0) {
      problems.push(`${page}: inline script would be blocked by script-src 'self'`);
    }
  }

  if (/\sstyle="/i.test(html)) {
    problems.push(`${page}: inline style attribute would be blocked by style-src 'self'`);
  }

  if (/\son(click|load|error|mouseover|submit)\s*=/i.test(html)) {
    problems.push(`${page}: inline event handler would be blocked by script-src 'self'`);
  }
}

if (problems.length) {
  console.error("CSP guard failed:");
  for (const problem of problems) console.error("  " + problem);
  process.exit(1);
}

console.log(`CSP guard passed for ${files.length} pages.`);
