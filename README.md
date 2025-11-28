# optimg
[![npm version](https://img.shields.io/npm/v/optimg-cli.svg)](https://www.npmjs.com/package/optimg-cli)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](#license)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](#platform-notes)

High-performance image optimization CLI built on Sharp. Great for web assets and real-time 3D texture workflows. Safe by default — keeps originals unless explicitly asked not to.

## TL;DR
- Quick try:
  - `npx optimg ./images --bulk --preset balanced --yes`
- Recommended (global):
  - `npm install -g optimg-cli`
  - `optimg ./images --bulk --preset balanced --yes`

You can replace `optimg` with `npx optimg` if you don’t want a global install.

## Why optimg?
- Fast: Sharp-based pipeline with parallel processing.
- Formats: Broad input support; outputs WebP, JPEG, PNG, AVIF.
- Presets: `default`, `balanced`, `quality`, `performant`.
- Safe defaults: Originals kept; metadata preserved by default.
- 3D-friendly: Ratio-based resizing and iterative texture workflows.

## Installation

### Global (recommended)
- Install:
  - `npm install -g optimg-cli`
- Verify:
  - `optimg --version`
  - `optimg --help`
  - `optimg formats`
- macOS/Linux (permissions):
  - If `npm -g` fails:
    - `npm config set prefix ~/.npm-global`
    - `export PATH=~/.npm-global/bin:$PATH` (add to shell rc)
    - `npm install -g optimg-cli`

### npx (one-off / CI)
- `npx optimg ./images --bulk --preset balanced --yes`
- Use for quick trials or ephemeral environments.

## Quick Start

- Single file:
  - `optimg ./photo.jpg --format webp --quality 80`

- Bulk (separate folder):
  - `optimg ./assets --bulk --preset balanced --yes`
  - Preserves directory structure under `./assets/optimized/` (auto-increments if needed).

- Bulk in-place:
  - `optimg ./assets --bulk-inplace --preset balanced --yes`
  - Writes outputs next to originals with `-optimized` suffix unless `--delete-originals` is used.

Note: You can replace `optimg` with `npx optimg` if you don’t want a global install.

## Key Concepts

- Supported formats
  - Input: `jpeg`, `jpg`, `png`, `webp`, `gif`, `tiff`, `svg`, `heic`, `avif`
  - Output: `webp`, `jpeg`, `jpg`, `png`, `avif`

- Presets

  | Preset      | Quality | Use case                             |
  |-------------|---------|--------------------------------------|
  | default     | 80      | General-purpose                      |
  | balanced    | 75      | Web assets, size/quality balance     |
  | quality     | 90      | Photography, higher fidelity         |
  | performant  | 60      | Bandwidth-sensitive / thumbnails     |

- Resize options
  - `--width`, `--height`: dimension-based; preserves aspect unless both provided.
  - `--resize`: ratio (e.g., `0.5`, `1/2`).
  - `--percent`: percentage (e.g., `50` → 50%).

- Metadata
  - Default: Preserve EXIF/ICC metadata.
  - Remove with `--strip-metadata` (or via config).

- Lossless (canonical)
  - WebP/AVIF default to `lossless: true`.
  - Turn off with `--no-lossless`.
  - `--loseless` is an alias for `--lossless`.
  - JPEG is lossy by format; PNG is lossless.

## Bulk Modes

- Separate folder (`--bulk`)
  - Behavior:
    - Recursively scans the input directory.
    - Preserves directory structure under `optimized/`.
    - Skips files under existing `optimized*` directories.
    - Auto-increments output folder name when needed (`optimized`, `optimized1`, `optimized2`, …).
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
  - Safe defaults:
    - Confirmation prompt unless `--yes` is provided.
    - Originals not modified unless `--delete-originals` is explicitly used.

- In-place (`--bulk-inplace`)
  - Behavior:
    - Writes outputs next to originals.
    - Adds `-optimized` suffix unless `--delete-originals` is set.
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
  - Suggested flags:
    - Lossy WebP: `--no-lossless --quality 80`
    - Non-interactive runs: `--yes` for scripts/CI.

## CLI Reference (condensed)

- Input/Output
  - `optimg <input>` (file or directory)
  - `-o, --output <path>`

- Format/Quality
  - `--format <webp|jpeg|png|avif>`
  - `--quality <0-100>`
  - `--lossless` (default enabled for WebP/AVIF)
  - `--no-lossless`
  - `--loseless` (alias for `--lossless`)

- Resize
  - `--width <px>`, `--height <px>`
  - `--resize <ratio>`
  - `--percent <number>`

- Presets
  - `--preset <default|balanced|quality|performant>`
  - `optimg preset` shows available presets.

- Bulk/Parallel
  - `--bulk`, `--bulk-inplace`
  - `--parallel <number>` (default: 4)
  - `--yes` (skip prompts)

- Metadata & Config
  - `--strip-metadata` (default: preserved)
  - `--config <path>`

- Diagnostics
  - `--verbose`
  - `optimg formats` (supported formats)

## Real-time 3D / Engine Workflows

- Ratio downscale:
  - `optimg ./textures/4k --bulk --resize 1/2 --format webp --quality 90`
  - `optimg ./textures/2k --bulk --resize 1/2 --format webp --quality 80`
  - `optimg ./textures/final --bulk --resize 1/2 --preset performant`
- Tips:
  - Downscale BaseColor/ORM to target resolution; keep Normal maps higher quality.
  - Use WebP for load-time gains; PNG for lossless technical maps as needed.
- Scope:
  - optimg is a fast pre-processing / lookdev step.
  - Not a replacement for KTX2/BCn pipelines.

## Platform Notes

- Windows:
  - `--delete-originals` is not supported / unreliable due to file locking.
  - Recommended workflow: bulk optimize, then manually delete originals when satisfied.
- Linux/macOS:
  - Normal behavior with proper permissions.

## Further Docs
- Examples & Recipes → `docs/EXAMPLES.md`
- Troubleshooting → `docs/TROUBLESHOOTING.md`
- Programmatic Usage → `docs/PROGRAMMATIC_USAGE.md`
- Test Results → `docs/TEST_RESULTS.md`

## Contributing
- PRs welcome; include tests and update docs where applicable.
- Tests: `npm test`
- Lint: `npm run lint`

## License
MIT