# optimg

High-performance image optimization CLI. Modern formats, bulk directory processing, presets, and safe defaults.

[![npm version](https://img.shields.io/npm/v/optimg-cli.svg)](https://www.npmjs.com/package/optimg-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/badge/GitHub-optimg--cli-181717.svg)](https://github.com/jacobfreedom/optimg-cli)

## ⚡ TL;DR

```bash
optimg ./images --bulk --preset balanced --yes
# For one-off runs without global install:
npx optimg ./images --bulk --preset balanced --yes
```

## 🌟 Why optimg

- Quality-first defaults with predictable outputs
- Fast, parallel processing via Sharp
- Bulk processing for folders and subfolders
- Presets and config for repeatable workflows

## 📦 Installation

- Global (primary)
  ```bash
  npm install -g optimg-cli
  optimg --help
  ```
  - Verify PATH: `which optimg` (macOS/Linux) or `where optimg` (Windows)
  - Prefer global for repeated use, CI/CD, and automation

- Local (project dev dependency)
  ```bash
  npm install optimg-cli --save-dev
  ```
  Add to `package.json` scripts:
  ```json
  {
    "scripts": {
      "optimize": "optimg ./images --bulk --preset balanced"
    }
  }
  ```

- npx (one-off usage)
  ```bash
  npx optimg --help
  npx optimg ./images --bulk --preset balanced --yes
  ```

- Requirements
  - Node.js `>=18.0.0`
  - Sharp prebuilt binaries (most platforms). If install fails on Linux, see Sharp docs for `libvips`/build tools.

## 🚀 Quick Start

- Single file
  ```bash
  optimg photo.jpg                 # WebP by default
  optimg photo.jpg --quality 90
  optimg photo.png --width 800 --format jpeg
  optimg texture.jpg --resize 1/2  # ratio
  optimg photo.jpg --percent 25    # percentage
  optimg input.jpg -o output.webp  # explicit output
  ```

- Directory (bulk)
  ```bash
  optimg ./images --bulk                         # creates ./optimized*
  optimg ./assets --bulk --format webp --quality 75 --parallel 8
  optimg ./images --bulk -o ./optimized/         # custom output root
  ```

## 🔑 Key Concepts

- Defaults
  - Format: `webp`
  - Quality: `80`
  - Lossless: `true` (WebP/AVIF support lossless)
  - Metadata: preserved (`stripMetadata: false`)
  - Keep originals: `true`
  - Parallel: `4`

- Bulk output
  - `--bulk`: writes into `optimized`, then `optimized1`, `optimized2`, …; skips any `optimized*` inputs
  - `--bulk-inplace`: writes next to originals; suffix `-optimized` unless `--delete-originals`

## 🧰 Bulk Modes

- Separate folder (`--bulk`)
  - Preserves directory structure under `optimized*`
  - Guards against nested `optimized/optimized/...`
  ```bash
  optimg ./images --bulk
  optimg ./images --bulk --yes
  ```

- In-place (`--bulk-inplace`)
  - Outputs next to originals; no `optimized*` directories
  - Naming
    - Keep originals: `name-optimized.<ext>`
    - `--delete-originals`: `name.<ext>` replaces original
  - Requirements: read access to inputs, write access to parent directories
  - Supported inputs: `jpeg, jpg, png, webp, gif, tiff, svg, heic, avif`
  - Supported outputs: `webp, jpeg, jpg, png, avif`

  Before → After (nested folders)
  ```txt
  assets/
    ui/icon.png
    photos/sample.jpg

  assets/
    ui/icon-optimized.webp
    ui/icon.png
    photos/sample-optimized.webp
    photos/sample.jpg
  ```

  Examples
  ```bash
  optimg ./assets --bulk-inplace --preset balanced --yes
  optimg ./assets --bulk-inplace --delete-originals --format webp --quality 80 --yes   # not on Windows
  optimg ./assets --bulk-inplace --format webp --no-lossless --quality 80 --yes        # lossy WebP
  ```

  Error handling
  - Missing input path → clear error; verify absolute paths
  - Permission denied (`EACCES`,`EPERM`) → write to a directory you own
  - Low disk space (`ENOSPC`) → free space or change output location
  - Windows: avoid `--delete-originals` (not supported)

## 🧾 CLI Reference (condensed)

- Input/Output
  ```bash
  optimg <input>                 # file or directory
  optimg <input> -o <output>     # explicit output path/dir
  ```

- Format & Quality
  ```bash
  optimg <input> --format webp   # webp, jpeg, png, avif
  optimg <input> --quality 85    # 0–100 (default 80)
  optimg <input> --lossless      # enable lossless
  optimg <input> --loseless      # alias
  optimg <input> --no-lossless   # disable lossless
  ```

- Resizing
  ```bash
  optimg <input> --width 800
  optimg <input> --height 600
  optimg <input> --resize 1/2
  optimg <input> --percent 50
  ```

- Presets
  ```bash
  optimg <input> --preset quality    # default, balanced, quality, performant
  optimg preset                      # list presets
  optimg formats                     # list formats
  ```

- Bulk / parallel / config / verbose
  ```bash
  optimg <dir> --bulk
  optimg <dir> --bulk-inplace
  optimg <dir> --bulk --parallel 8
  optimg <input> --strip-metadata
  optimg <input> --config ./config.json
  optimg <input> --verbose
  optimg <input> --yes
  ```

## 🎮 Real-time 3D Workflows

- Use ratios (`1/2`, `1/4`) to keep texture sets consistent (4K→2K→1K)
- Generate a couple of variants (balanced vs performant), test in-engine under real lights
- Keep originals unless you explicitly use `--delete-originals`

```bash
optimg ./textures/4k --bulk --resize 1/2 --format webp --quality 90
optimg ./textures/2k --bulk --resize 1/2 --format webp --quality 80
optimg ./textures/final --bulk --resize 1/2 --preset performant
```

## 🧾 Metadata & Color Profiles

- Metadata preserved by default (`stripMetadata: false`)
- Color profiles (ICC) kept when metadata is preserved
- Use `--strip-metadata` for privacy or maximal size reduction

```bash
optimg ./photos --bulk --strip-metadata
```

## 🖥️ Platform Notes

- Windows
  - `--delete-originals` is not supported due to file locking behavior
  - Use `--bulk` or `--bulk-inplace` without deletion and clean up manually

- Linux/macOS
  - File operations work with proper permissions

## 📚 Further Docs

- Examples → [docs/EXAMPLES.md](./docs/EXAMPLES.md)
- Troubleshooting → [docs/TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md)
- Configuration & Programmatic Usage → [docs/PROGRAMMATIC_USAGE.md](./docs/PROGRAMMATIC_USAGE.md)
- Test Results → [docs/TEST_RESULTS.md](./docs/TEST_RESULTS.md)

## 🤝 Contributing & License

- License: MIT → `LICENSE`
- Issues: https://github.com/jacobfreedom/optimg-cli/issues
- Discussions: https://github.com/jacobfreedom/optimg-cli/discussions
