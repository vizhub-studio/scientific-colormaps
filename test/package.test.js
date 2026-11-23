import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const pkg = JSON.parse(
  await readFile(new URL("../package.json", import.meta.url), "utf8"),
);

test("npm exports resolve through package self-reference", async () => {
  const main = await import("@vizhub/scientific-colormaps");
  const schemesModule = await import("@vizhub/scientific-colormaps/schemes");
  assert.equal(main.schemes, schemesModule.schemes);
  assert.equal(main.paletteNames, schemesModule.paletteNames);
  assert.equal(main.sampleColormap("batlow", 3).length, 3);
});

test("npm metadata, exports and license are suitable for publication", () => {
  assert.equal(pkg.name, "@vizhub/scientific-colormaps");
  assert.equal(pkg.license, "MIT");
  assert.equal(pkg.type, "module");
  assert.equal(pkg.publishConfig.access, "public");
  assert.equal(
    pkg.repository.url,
    "git+https://github.com/vizhub-studio/scientific-colormaps.git",
  );
  assert.equal(pkg.exports["."].types, "./src/index.d.ts");
  assert.equal(pkg.exports["./schemes"].default, "./src/schemes.js");
  assert(pkg.files.includes("NOTICE.md"));
  assert(pkg.files.includes("LICENSE"));
});
