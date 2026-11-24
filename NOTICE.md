# Attribution and third-party notices

## Package implementation

The independently written JavaScript/TypeScript wrapper and generation scripts are MIT licensed by VizHub, Inc. See LICENSE. The wrapper does not incorporate Fil's notebook UI or the historical conversion script.

## Scientific Colour Maps data

Palette designs and data: Scientific Colour Maps, © Fabio Crameri (2026), release 9.0.0.

- Authoritative release: https://doi.org/10.5281/zenodo.24343380
- Project: https://www.fabiocrameri.ch/colourmaps/
- Scientific reference: Crameri, F. (2018). Scientific colour maps. Zenodo. https://doi.org/10.5281/zenodo.1243862
- Pinned archive: ScientificColourMaps9.zip, MD5 316c0cdbcec46d377f74c6c59523c7f0.
- Archive license source: ScientificColourMaps9/+LICENCE.pdf.

The new tables must be extracted directly from the checksum-verified official archive and committed as static hex values. The upstream license must be reviewed and reproduced in the distributed package. Although earlier releases are MIT-licensed, the exact 9.0.0 PDF notice is still being verified; do not publish or merge the migration until confirmed. Do not assume the wrapper's MIT license overrides upstream terms. Normal package CI does not fetch the archive.

## Inspiration and historical provenance

- Fil's Observable notebook, https://observablehq.com/@fil/colormaps, inspired the API. Its notebook-specific license could not be verified from the public page. The related historical Gist https://gist.github.com/Fil/99c87f8cea688ffbe8a42243b95974ca declares MIT in .block metadata and CC BY 4.0 in its README. These conflicting labels are not treated as permission to copy notebook code; no such code or UI is incorporated in the new implementation.
- The previous 8.0.1 dataset was transcribed from Fabio Crameri's palette data by https://github.com/justdan96/fabio-crameri-palette-generator (March 2024). GitHub reports no repository license and no LICENSE file was found. The historical converter is credited; its script is not bundled or used by the new generator. The 9.0.0 migration replaces all historical converted data directly from the original source.

The library version and upstream data version are independent. Pin the previous library release for reproducibility.
