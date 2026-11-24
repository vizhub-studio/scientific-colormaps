import type { ColormapName } from "./palette-names.js";
export type { ColormapName } from "./palette-names.js";
export declare const scientificColourMapsVersion: "9.0.0";
export interface ColormapOptions {
  readonly reverse?: boolean;
}
export declare const schemes: Readonly<Record<ColormapName, readonly string[]>>;
export declare const rawschemes: typeof schemes;
export declare const paletteNames: readonly ColormapName[];
export declare function getColormap(
  name: ColormapName | string,
  options?: ColormapOptions,
): string[];
export declare function interpolateColormap(
  name: ColormapName | string,
  t: number,
  options?: ColormapOptions,
): string;
export declare function createInterpolator(
  name: ColormapName | string,
  options?: ColormapOptions,
): (t: number) => string;
export declare function ramp(
  colorsOrName: readonly string[] | ColormapName | string,
  options?: ColormapOptions,
): (t: number) => string;
export declare function sampleColormap(
  name: ColormapName | string,
  count?: number,
  options?: ColormapOptions,
): string[];
