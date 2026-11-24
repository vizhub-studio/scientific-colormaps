import test from "node:test";
import assert from "node:assert/strict";
import {
  schemes,
  scientificColourMapsVersion,
  rawschemes,
  paletteNames,
  ramp,
  getColormap,
  interpolateColormap,
  createInterpolator,
  sampleColormap,
} from "../src/index.js";

test("source is 42 complete 256-color lookup tables", () => {
  assert.equal(paletteNames.length, 42);
  assert.equal(scientificColourMapsVersion, "9.0.0");
  assert(!paletteNames.includes("naviaW"));
  assert.throws(() => getColormap("naviaW"), RangeError);
  for (const name of ["delphi", "ston", "batlowO"])
    assert(paletteNames.includes(name));
  assert.equal(rawschemes, schemes);
  assert(Object.isFrozen(schemes));
  assert(Object.isFrozen(paletteNames));
  assert.deepEqual(Object.keys(schemes), paletteNames);
  for (const name of paletteNames) {
    assert.equal(schemes[name].length, 256, name);
    assert(Object.isFrozen(schemes[name]), name);
    for (const hex of schemes[name]) assert.match(hex, /^#[0-9a-f]{6}$/i);
  }
});

test("all named palettes resolve with exact endpoints and reversal", () => {
  for (const name of paletteNames) {
    assert.equal(interpolateColormap(name, 0), schemes[name][0]);
    assert.equal(interpolateColormap(name + "_r", 0), schemes[name][255]);
  }
});

test("lookup returns a fresh array and supports names, suffixes, and options", () => {
  const normal = getColormap("BaTlOw");
  const reversed = getColormap("batlow_r");
  assert.deepEqual(normal, schemes.batlow);
  assert.deepEqual(reversed, [...normal].reverse());
  assert.deepEqual(getColormap("batlow", { reverse: true }), reversed);
  assert.deepEqual(getColormap("batlow_r", { reverse: true }), normal);
  normal[0] = "#000000";
  assert.notEqual(normal, schemes.batlow);
  assert.equal(schemes.batlow[0], reversed[255]);
});

test("exact endpoints, clamping, and reversals", () => {
  const interp = createInterpolator("berlin");
  assert.equal(interp(0), schemes.berlin[0]);
  assert.equal(interp(1), schemes.berlin[255]);
  assert.equal(interp(-100), schemes.berlin[0]);
  assert.equal(interp(100), schemes.berlin[255]);
  assert.equal(interpolateColormap("berlin_r", 0), schemes.berlin[255]);
  assert.equal(interpolateColormap("berlin_r", 1), schemes.berlin[0]);
});

test("all original 256 discrete steps are recovered exactly", () => {
  for (const name of paletteNames) {
    assert.deepEqual(sampleColormap(name, 256), schemes[name], name);
  }
});

test("interpolation and notebook-style ramp", () => {
  const custom = ramp(["#000000", "#ffffff"]);
  assert.equal(custom(0.5), "#808080");
  assert.equal(custom(0.25), "#404040");
  assert.equal(ramp(["#000000", "#ffffff"], { reverse: true })(0), "#ffffff");
  assert.equal(ramp(schemes.roma)(0), schemes.roma[0]);
  assert.equal(ramp("roma")(1), schemes.roma[255]);
  assert.equal(
    sampleColormap("berlin", 1)[0],
    interpolateColormap("berlin", 0.5),
  );
  assert.deepEqual(sampleColormap("roma", 2), [
    schemes.roma[0],
    schemes.roma[255],
  ]);
});

test("invalid names, samples, and interpolator arguments fail", () => {
  assert.throws(() => getColormap("does-not-exist"), RangeError);
  assert.throws(() => getColormap(null), TypeError);
  assert.throws(() => sampleColormap("roma", 0), RangeError);
  assert.throws(() => sampleColormap("roma", 2.5), RangeError);
  assert.throws(() => sampleColormap("roma", 65537), RangeError);
  assert.throws(() => createInterpolator("roma")(Number.NaN), TypeError);
  assert.throws(() => ramp([]), TypeError);
  assert.throws(() => ramp(["red", "blue"]), TypeError);
});
