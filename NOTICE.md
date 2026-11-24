# Attribution and third-party notices

Palette designs and data: Scientific Colour Maps, © Fabio Crameri (2026), release 9.0.0.

- Authoritative release: https://doi.org/10.5281/zenodo.24343380
- Project: https://www.fabiocrameri.ch/colourmaps/
- Scientific reference: Crameri, F. (2018). Scientific colour maps. Zenodo. https://doi.org/10.5281/zenodo.1243862

The generator reads the official archive directly, verifies its published checksum, and preserves the upstream license verbatim in src/upstream-license.txt. Generation fails if an upstream MIT notice cannot be verified; do not release until this file is committed and reviewed. This library's handwritten JavaScript wrapper is MIT licensed.

The previous 8.0.1 dataset was transcribed by https://github.com/justdan96/fabio-crameri-palette-generator; credited for historical conversion. Fil's https://observablehq.com/@fil/colormaps is credited as API inspiration; its code and UI were not copied.

The library version and upstream data version are independent. Pin the previous library release for reproducibility.
