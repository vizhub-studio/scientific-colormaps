/** Canonical palette identifiers (case-insensitive when passed to functions). */
export type ColormapName =
  | "acton"
  | "bam"
  | "bamO"
  | "bamako"
  | "batlow"
  | "batlowK"
  | "batlowW"
  | "berlin"
  | "bilbao"
  | "broc"
  | "brocO"
  | "buda"
  | "bukavu"
  | "cork"
  | "corkO"
  | "davos"
  | "devon"
  | "fes"
  | "glasgow"
  | "grayC"
  | "hawaii"
  | "imola"
  | "lajolla"
  | "lapaz"
  | "lipari"
  | "lisbon"
  | "managua"
  | "navia"
  | "naviaW"
  | "nuuk"
  | "oleron"
  | "oslo"
  | "roma"
  | "romaO"
  | "tofino"
  | "tokyo"
  | "turku"
  | "vanimo"
  | "vik"
  | "vikO";
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
