# @vizhub/scientific-colormaps

An independent, dependency-free npm package of **Fabio Crameri's Scientific Colour Maps**, usable from JavaScript, TypeScript, D3, and Observable Plot. Inspired by [Fil's Observable colormaps notebook](https://observablehq.com/@fil/colormaps).

**Data snapshot:** Scientific Colour Maps **8.0.1** (2023).

## Install

```bash
npm install @vizhub/scientific-colormaps
```

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

## References

- [Fil's Observable notebook](https://observablehq.com/@fil/colormaps)
- [Scientific Colour Maps](https://www.fabiocrameri.ch/colourmaps/)
- [Fabio Crameri, Scientific Colour Maps 8.0.1, DOI 10.5281/zenodo.8409685](https://doi.org/10.5281/zenodo.8409685)
