# @vizhub/scientific-colormaps

An independent, dependency-free npm package of **Fabio Crameri's Scientific Colour Maps**, usable from JavaScript, TypeScript, D3, and Observable Plot. Inspired by [Fil's Observable colormaps notebook](https://observablehq.com/@fil/colormaps); it does **not** copy the notebook's UI code.

**Data snapshot:** Scientific Colour Maps **9.0.0** (2026), from 43 full-resolution 256-step lookup tables. This is a pinned dataset, not a claim to provide the latest release. See [NOTICE.md](NOTICE.md) for provenance and licensing.

## Install

```bash
npm install @vizhub/scientific-colormaps
```

**Release status:** Published on npm as `@vizhub/scientific-colormaps` (maintainer-confirmed November 23, 2026). Run `npm view @vizhub/scientific-colormaps version` to confirm the currently available registry version before announcing or demoing it. The package's declared source version is not a substitute for a live registry check.

## Use

```js
import {
  paletteNames, schemes, ramp, getColormap, scientificColourMapsVersion,
  createInterpolator, interpolateColormap, sampleColormap
} from "@vizhub/scientific-colormaps";

paletteNames;                       // 43 names, e.g. "batlow", "berlin", "roma"
schemes.batlow;                     // readonly 256-element hex array
getColormap("batlow");              // fresh mutable copy
getColormap("batlow_r");            // reversed palette
getColormap("batlow", {reverse:true});
interpolateColormap("berlin", 0.5);  // interpolated #rrggbb
sampleColormap("roma", 7);          // 7 equally spaced hex colors
ramp(schemes.roma)(0.3);            // notebook-style interpolation
ramp("roma")(0.3);
```

### D3

```js
import {scaleSequential} from "d3-scale";
import {createInterpolator} from "@vizhub/scientific-colormaps";

const color = scaleSequential(createInterpolator("vik")).domain([-100,100]);
color(0);
```

There is **no runtime dependency on D3**; pass the returned interpolator wherever a function `(t) => color` is accepted.

## API

- `scientificColourMapsVersion`: pinned upstream dataset version (`"9.0.0"`).

- `paletteNames`: array of 43 canonical camel-case identifiers, frozen.
- `schemes`/`rawschemes`: lookup object of frozen 256-element `#rrggbb` arrays.
- `getColormap(name, {reverse?})`: fresh palette array.
- `interpolateColormap(name, t, {reverse?})`: piecewise-linear interpolation in sRGB, with `t` clamped to `[0,1]`.
- `createInterpolator(name, {reverse?})`: reusable continuous interpolator.
- `ramp(colorsOrName, {reverse?})`: Observable-style interpolation for a name or a custom array of at least two hex colors.
- `sampleColormap(name, count=256, {reverse?})`: discrete colors evenly sampled over the full range, with count 1 using the midpoint.

Names are case-insensitive, and suffix `_r` reverses the order. A `reverse: true` option combined with `_r` reverses twice (restoring the original order). Non-finite inputs, invalid names, and invalid sample counts throw descriptive errors.

## Migration from 0.2.0

The API is unchanged, but upstream revised existing palette RGB values (including `vik`, `berlin`, and the direction of `fes`) and added `delphi`, `ston`, and `batlowO`. Pin 0.2.0 for exact reproduction of the 8.0.1 colors.

## Development

`npm run generate` downloads the canonical, checksum-pinned Zenodo archive with Python 3 and regenerates the committed tables, type names, and upstream license. `npm run generate -- --check` verifies the committed outputs against that archive. A local archive can be supplied with `--archive PATH`.

```bash
npm test
npm pack --dry-run
```

No dependency installation or bundling is required. The package publishes directly from `src/` as ESM with bundled TypeScript declarations.

## Future release checklist

1. Confirm `@vizhub` npm organization ownership and publish permissions; check the already-published version with `npm view @vizhub/scientific-colormaps version` before bumping the package version.
2. Confirm upstream attribution and license terms in `NOTICE.md`.
3. Run `npm test && npm pack --dry-run` in the repository root and confirm the included file list.
4. Publish a new, incremented version with `npm publish --access public` using trusted npm authentication, then confirm that the registry reports that version.
5. Configure npm trusted publishing and provenance if automated releases are desired.

This repository is the canonical standalone package. The corresponding draft in the VizHub application repository is superseded.

## References

- [Fil's Observable notebook](https://observablehq.com/@fil/colormaps)
- [Scientific Colour Maps](https://www.fabiocrameri.ch/colourmaps/)
- [Fabio Crameri, Scientific Colour Maps 9.0.0, DOI 10.5281/zenodo.24343380](https://doi.org/10.5281/zenodo.24343380)
- [Historical 8.0.1 transcription by justdan96](https://github.com/justdan96/fabio-crameri-palette-generator)
