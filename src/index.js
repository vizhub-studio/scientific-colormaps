import { schemes, paletteNames } from "./schemes.js";

export {
  schemes,
  paletteNames,
  scientificColourMapsVersion,
} from "./schemes.js";

/**
 * @typedef {{ reverse?: boolean }} ColormapOptions
 */

/** Compatibility alias for the original Observable notebook's raw lookup tables. */
export const rawschemes = schemes;

/** @type {Map<string, keyof typeof schemes>} */
const byLowerCase = new Map(
  paletteNames.map((name) => [name.toLowerCase(), name]),
);
const hexPattern = /^#[0-9a-f]{6}$/i;

/**
 * @param {string} name
 * @param {ColormapOptions} [options]
 * @returns {{ colors: readonly string[], reverse: boolean }}
 */
function resolvePalette(name, options = {}) {
  if (typeof name !== "string") {
    throw new TypeError("Colormap name must be a string");
  }
  const suffixReverse = name.toLowerCase().endsWith("_r");
  const unmodified = suffixReverse ? name.slice(0, -2) : name;
  const key = byLowerCase.get(unmodified.toLowerCase());
  if (key === undefined) {
    throw new RangeError(`Unknown colormap: ${name}`);
  }
  return {
    colors: schemes[key],
    reverse: Boolean(options.reverse) !== suffixReverse,
  };
}

/**
 * @param {string} hex
 * @returns {[number, number, number]}
 */
function rgb(hex) {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

/**
 * @param {number} value
 * @returns {string}
 */
function toHex(value) {
  return Math.round(value).toString(16).padStart(2, "0");
}

/**
 * @param {readonly string[]} colors
 * @param {number} t
 * @param {boolean} reverse
 * @returns {string}
 */
function interpolate(colors, t, reverse) {
  if (!Number.isFinite(t)) {
    throw new TypeError("Interpolation position must be a finite number");
  }
  const length = colors.length;
  const position = Math.min(1, Math.max(0, t)) * (length - 1);
  const start = Math.floor(position);
  const amount = position - start;
  const first = colors[reverse ? length - 1 - start : start];
  if (amount === 0 || start === length - 1) return first;
  const second = colors[reverse ? length - 2 - start : start + 1];
  const a = rgb(first);
  const b = rgb(second);
  return "#" + a.map((x, i) => toHex(x + (b[i] - x) * amount)).join("");
}

/**
 * Return a fresh copy of the 256-step lookup table; never mutates the exported schemes.
 * @param {string} name
 * @param {ColormapOptions} [options]
 * @returns {string[]}
 */
export function getColormap(name, options) {
  const { colors, reverse } = resolvePalette(name, options);
  const copy = Array.from(colors);
  return reverse ? copy.reverse() : copy;
}

/**
 * Interpolate a named palette in sRGB (piecewise-linear through its 256 samples).
 * @param {string} name
 * @param {number} t
 * @param {ColormapOptions} [options]
 * @returns {string}
 */
export function interpolateColormap(name, t, options) {
  const { colors, reverse } = resolvePalette(name, options);
  return interpolate(colors, t, reverse);
}

/**
 * Construct an interpolator suitable for d3.scaleSequential or Observable Plot.
 * @param {string} name
 * @param {ColormapOptions} [options]
 * @returns {(t: number) => string}
 */
export function createInterpolator(name, options) {
  const { colors, reverse } = resolvePalette(name, options);
  return (t) => interpolate(colors, t, reverse);
}

/**
 * Notebook-style adapter: ramp(schemes.roma)(0.5), or ramp("roma")(0.5).
 * @param {readonly string[] | string} colorsOrName
 * @param {ColormapOptions} [options]
 * @returns {(t: number) => string}
 */
export function ramp(colorsOrName, options = {}) {
  if (typeof colorsOrName === "string") {
    return createInterpolator(colorsOrName, options);
  }
  if (
    !Array.isArray(colorsOrName) ||
    colorsOrName.length < 2 ||
    !colorsOrName.every((c) => typeof c === "string" && hexPattern.test(c))
  ) {
    throw new TypeError(
      "ramp expects a palette name or an array of at least two #rrggbb colors",
    );
  }
  const colors = Array.from(colorsOrName);
  const reverse = Boolean(options.reverse);
  return (t) => interpolate(colors, t, reverse);
}

/**
 * Sample an evenly spaced discrete palette; for count=1 use the midpoint.
 * @param {string} name
 * @param {number} [count]
 * @param {ColormapOptions} [options]
 * @returns {string[]}
 */
export function sampleColormap(name, count = 256, options) {
  if (!Number.isInteger(count) || count < 1 || count > 65536) {
    throw new RangeError("Sample count must be an integer between 1 and 65536");
  }
  const interpolateValue = createInterpolator(name, options);
  return Array.from({ length: count }, (_, index) =>
    interpolateValue(count === 1 ? 0.5 : index / (count - 1)),
  );
}
