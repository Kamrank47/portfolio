import { chromium } from "playwright-core";
import { mkdir, readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import os from "node:os";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public", "resume");

async function findChromium() {
  if (process.env.CHROMIUM_PATH && existsSync(process.env.CHROMIUM_PATH)) {
    return process.env.CHROMIUM_PATH;
  }

  const cache = path.join(os.homedir(), ".cache", "ms-playwright");
  if (existsSync(cache)) {
    const entries = (await readdir(cache)).filter((name) => name.startsWith("chromium-"));
    entries.sort().reverse();
    for (const entry of entries) {
      for (const dir of ["chrome-linux64", "chrome-linux", "chrome-mac", "chrome-win"]) {
        const candidate = path.join(cache, entry, dir, "chrome");
        if (existsSync(candidate)) return candidate;
      }
    }
  }

  for (const candidate of [
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/usr/bin/google-chrome",
  ]) {
    if (existsSync(candidate)) return candidate;
  }

  throw new Error("No Chromium found. Set CHROMIUM_PATH or run npx playwright install chromium.");
}

const builds = [
  {
    source: "cv/reference.html",
    pdf: "Kamran-Hashmi-CV.pdf",
    preview: "preview-reference.png",
  },
  {
    source: "cv/modern.html",
    pdf: "Kamran-Hashmi-CV-Modern.pdf",
    preview: "preview-modern.png",
  },
];

const executablePath = await findChromium();
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ executablePath });

for (const build of builds) {
  const page = await browser.newPage({ viewport: { width: 794, height: 1123 } });
  const url = pathToFileURL(path.join(root, build.source)).href;
  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);

  await page.pdf({
    path: path.join(outDir, build.pdf),
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  await page.setViewportSize({ width: 794, height: 1123 });
  await page.screenshot({
    path: path.join(outDir, build.preview),
    clip: { x: 0, y: 0, width: 794, height: 1123 },
  });

  const info = await stat(path.join(outDir, build.pdf));
  console.log(`${build.pdf}  ${(info.size / 1024).toFixed(0)} KB`);
  await page.close();
}

const og = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await og.goto(pathToFileURL(path.join(root, "cv", "og.html")).href, { waitUntil: "networkidle" });
await og.evaluate(() => document.fonts.ready);
await og.screenshot({ path: path.join(root, "public", "og.png") });
console.log("og.png  1200x630");
await og.close();

await browser.close();
