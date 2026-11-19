# @vizhub/scientific-colormaps

An independent, dependency-free npm package of **Fabio Crameri's Scientific Colour Maps**, usable from JavaScript, TypeScript, D3, and Observable Plot. Inspired by [Fil's Observable colormaps notebook](https://observablehq.com/@fil/colormaps); it does **not** copy the notebook's UI code.

**Data snapshot:** Scientific Colour Maps **8.0.1** (2023), from 40 full-resolution 256-step lookup tables. This is a pinned dataset, not a claim to provide the latest release. See [NOTICE.md](NOTICE.md) for provenance and licensing.

## Install

```bash
npm install @vizhub/scientific-colormaps
```

**Release status:** The initial npm publication is pending. Confirm access to the `@vizhub` npm organization before publishing.

## Use

```js
import {
  paletteNames, schemes, ramp, getColormap,
  createInterpolator, interpolateColormap, sampleColormap
} from "@vizhub/scientific-colormaps";

paletteNames;                       // 40 names, e.g. "batlow", "berlin", "roma"
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

- `paletteNames`: array of 40 canonical camel-case identifiers, frozen.
- `schemes`/`rawschemes`: lookup object of frozen 256-element `#rrggbb` arrays.
- `getColormap(name, {reverse?})`: fresh palette array.
- `interpolateColormap(name, t, {reverse?})`: piecewise-linear interpolation in sRGB, with `t` clamped to `[0,1]`.
- `createInterpolator(name, {reverse?})`: reusable continuous interpolator.
- `ramp(colorsOrName, {reverse?})`: Observable-style interpolation for a name or a custom array of at least two hex colors.
- `sampleColormap(name, count=256, {reverse?})`: discrete colors evenly sampled over the full range, with count 1 using the midpoint.

Names are case-insensitive, and suffix `_r` reverses the order. A `reverse: true` option combined with `_r` reverses twice (restoring the original order). Non-finite inputs, invalid names, and invalid sample counts throw descriptive errors.

## Development

```bash
npm test
npm pack --dry-run
```

No dependency installation or bundling is required. The package publishes directly from `src/` as ESM with bundled TypeScript declarations.

## Release checklist

1. Confirm `@vizhub` npm organization ownership and publish permissions.
2. Confirm upstream attribution and license terms in `NOTICE.md`.
3. Run `npm test && npm pack --dry-run` in the repository root and confirm the included file list.
4. Publish `npm publish --access public` from the repository root using trusted npm authentication.
5. Configure npm trusted publishing and provenance if automated releases are desired.

This repository is the canonical standalone package. The corresponding draft in the VizHub application repository is superseded.

## References

- [Fil's Observable notebook](https://observablehq.com/@fil/colormaps)
- [Scientific Colour Maps](https://www.fabiocrameri.ch/colourmaps/)
- [Fabio Crameri, Scientific Colour Maps 8.0.1, DOI 10.5281/zenodo.8409685](https://doi.org/10.5281/zenodo.8409685)
- [Transcription/generator by justdan96](https://github.com/justdan96/fabio-crameri-palette-generator)
