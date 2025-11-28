# optimg
[![npm version](https://img.shields.io/npm/v/optimg-cli.svg)](https://www.npmjs.com/package/optimg-cli)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](#license)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](#platform-notes)

High-performance image optimization CLI built on Sharp. Great for web assets and real-time 3D texture workflows. Safe by default — keeps originals unless explicitly asked not to.

## TL;DR

- Quick try (no install):
  - `npx optimg ./images --bulk --preset balanced --yes`
- Recommended (global install):
  - `npm install -g optimg-cli`
  - `optimg ./images --bulk --preset balanced --yes`

## Why optimg?
- Fast: Sharp-based pipeline with parallel processing.
- Formats: WebP, JPEG, PNG, AVIF output; broad input support.
- Presets: Default, balanced, quality, performant — sensible profiles for common needs.
- Safe: Originals kept unless `--delete-originals` is used.
- 3D-friendly: Built for iterative texture workflows, ratio-based resizing, and pre-processing before KTX2/BCn.

## Installation

### Global (recommended)
- `npm install -g optimg-cli`
- Verify:
  - `optimg --version`
  - `optimg --help`
  - `optimg formats`
- If permissions fail (macOS/Linux):
  - `npm config set prefix ~/.npm-global`
  - `export PATH=~/.npm-global/bin:$PATH` (add to `.bashrc`/`.zshrc`)
  - `npm install -g optimg-cli`

### npx (one-off and CI)
- `npx optimg ./images --bulk --preset balanced --yes`
- Use when avoiding global install or for ephemeral environments.

## Quick Start

- Single file:
  - `optimg ./photo.jpg --format webp --quality 80`
  - Note: `npx optimg ...` also works if not installed globally.
- Bulk (separate folder):
  - `optimg ./assets --bulk --preset balanced --yes`
  - Creates `./assets/optimized/` (or `optimized1/`, `optimized2/` if needed).
- Bulk in-place:
  - `optimg ./assets --bulk-inplace --preset balanced --yes`
  - Writes outputs next to originals with `-optimized` suffix.

## Key Concepts

- Supported formats
  - Input: JPEG, PNG, WebP, GIF, TIFF, SVG, HEIC, AVIF
  - Output: WebP, JPEG, PNG, AVIF
- Presets
  - | Preset      | Quality | Use Case                           |
    |------------|---------|------------------------------------|
    | default    | 80      | General-purpose                    |
    | balanced   | 75      | Web assets, balance of size/quality|
    | quality    | 90      | Photography, higher fidelity       |
    | performant | 60      | Maximum reduction for performance  |
- Resize options
  - `--width`, `--height`: dimension-based (preserves aspect unless both given).
  - `--resize`: ratio (`0.5`, `1/2`, etc.).
  - `--percent`: percentage (`50` → 50%).
- Metadata behavior
  - Default: Preserve EXIF/ICC (`stripMetadata: false`).
  - Remove with `--strip-metadata` or config.
- Lossless behavior
  - WebP/AVIF default to `lossless: true`.
  - Use `--no-lossless` to allow lossy compression where size reduction matters.
  - JPEG is always lossy; PNG is lossless.

## Bulk Modes

- Mode 1: Separate folder (`--bulk`)
  - Behavior:
    - Recursively scans input directory.
    - Preserves directory structure in `optimized/` folder.
    - Guard behavior:
      - Skips files already under `optimized*`.
      - Auto-increments output folder name: `optimized`, `optimized1`, `optimized2`, …
  - Example (before → after):
    ```txt
    assets/
      images/
        hero.jpg
      textures/
        character.jpg

    assets/optimized/
      images/
        hero.webp
      textures/
        character.webp
    ```
  - Notes:
    - Confirmation prompt by default; use `--yes` in scripts/CI.
    - Originals are untouched unless `--delete-originals` is explicitly set.

- Mode 2: In-place (`--bulk-inplace`)
  - Behavior:
    - Writes outputs next to originals.
    - Uses `-optimized` suffix unless `--delete-originals` is set.
  - Examples:
    ```txt
    images/
      hero.jpg

    images/
      hero-optimized.webp   # after
      hero.jpg
    ```
    ```txt
    assets/
      ui/
        icon.png
      photos/
        sample.jpg

    assets/
      ui/
        icon-optimized.webp
        icon.png
      photos/
        sample-optimized.webp
        sample.jpg
    ```
  - Platform behavior:
    - `--delete-originals` replaces originals with new outputs (not supported on Windows).
  - Recommended flags:
    - Lossy WebP: `--no-lossless --quality 80`
    - Safe runs: `--yes` to skip prompts in CI.

## CLI Reference

- Input/Output
  - `optimg <input>`: file or directory
  - `-o, --output <path>`: output file/dir
- Format/Quality
  - `--format <webp|jpeg|png|avif>`
  - `--quality <0-100>` (WebP/JPEG)
  - `--lossless` (default enabled for WebP/AVIF)
  - `--no-lossless` (disable lossless)
- Resize
  - `--width <px>`, `--height <px>`
  - `--resize <ratio>` (e.g., `0.5`, `1/2`)
  - `--percent <number>` (e.g., `50`)
- Presets
  - `--preset <default|balanced|quality|performant>`
  - `optimg preset` lists available presets.
- Bulk/Parallel
  - `--bulk` (separate folder)
  - `--bulk-inplace` (next to originals)
  - `--parallel <number>` (default: 4)
  - `--yes` (skip prompts)
- Metadata & Config
  - `--strip-metadata` (default: preserved)
  - `--keep-metadata` (explicit preserve)
  - `--config <path>`
- Diagnostics
  - `--verbose` (debug output)
  - `optimg formats` (supported formats)

## Real-time 3D / Engine Workflows

- Ratio-based downscale:
  - `optimg ./textures/4k --bulk --resize 1/2 --format webp --quality 90`
  - `optimg ./textures/2k --bulk --resize 1/2 --format webp --quality 80`
  - `optimg ./textures/final --bulk --resize 1/2 --preset performant`
- Practical tips:
  - Downscale BaseColor/ORM to a target resolution, keep Normal maps higher quality.
  - Use WebP for load-time wins, PNG where lossless technical maps are preferred.
- Scope:
  - optimg is a fast pre-processing / lookdev step.
  - It does not replace engine-specific pipelines like KTX2/BCn.
  - Inspired by effective texture workflows common in glTF toolchains.

## Platform Notes

- Windows:
  - `--delete-originals` is disabled / not supported due to file locking and reliability concerns.
  - Safe workflow: bulk optimize → manually delete originals when satisfied.
- Linux/macOS:
  - Normal behavior with proper permissions.

## Further Docs

- Examples & Recipes → `docs/EXAMPLES.md`
- Troubleshooting → `docs/TROUBLESHOOTING.md`
- Programmatic Usage → `docs/PROGRAMMATIC_USAGE.md`
- Test Results → `docs/TEST_RESULTS.md`

## Contributing

- PRs welcome. Please include tests and update docs where applicable.
- Run tests locally:
  - `npm test`
- Lint:
  - `npm run lint`

## License

MIT