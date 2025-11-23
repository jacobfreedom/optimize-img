# optimize-img

A high-performance image optimization CLI for developers with modern format support, bulk processing, and presets.

[![npm version](https://badge.fury.io/js/optimize-img.svg)](https://badge.fury.io/js/optimize-img)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/node/v/optimize-img.svg)](https://nodejs.org/)
[![GitHub](https://img.shields.io/badge/GitHub-optimize--img-181717.svg)](https://github.com/jacobfreedom)

---

## ⚡ TL;DR

```bash
npm install -g optimize-img

# Optimize all images in a folder
optimize-img ./images --bulk --preset balanced
```

---

## 🌟 Why optimize-img?

Originally built for **3D texture optimization**, optimize-img has grown into a general-purpose image pipeline that balances:

- **Quality** – sensible defaults that don't wreck your images  
- **Performance** – built on [Sharp](https://sharp.pixelplumbing.com/), highly parallel  
- **Convenience** – presets, bulk mode, config files, and programmatic use

Use it for:

- Web assets (hero images, thumbnails, UI icons)
- Real-time 3D textures (engines, WebGL/WebGPU)
- Photo collections / portfolio exports

---

## ✨ Features at a Glance

- 🚀 **Fast** – Sharp-based, parallel processing (`--parallel`)
- 🧩 **Formats** – WebP (default), JPEG, PNG, AVIF output
- 📁 **Bulk Mode** – `--bulk` recursively processes folders
- 🎛️ **Presets** – `default`, `balanced`, `quality`, `performant`
- 📏 **Resizing** – width/height, ratios (`1/2`, `1/4`), or percent
- 🧾 **Metadata** – **strips EXIF/ICC by default** for privacy/size, `--keep-metadata` if you need it
- 📊 **Stats** – progress bar + before/after size reduction
- 🧪 **3D-Friendly** – ideal for quickly downscaling/testing texture sets

---

## 🔣 Supported Formats
Input
Any format supported by Sharp, including (most common):

JPEG / JPG

PNG

WebP

AVIF

TIFF

Output
Controlled via --format:

webp (default)

jpeg

png

avif

Example:

```bash
# PNG → WebP (default)
optimize-img image.png

# JPEG → AVIF
optimize-img photo.jpg --format avif
```

---

## 📦 Installation

### CLI (Global – recommended)

```bash
npm install -g optimize-img
```

Then:

```bash
optimize-img --help
```

### Project (Local)

```bash
npm install optimize-img
```

To use `optimize-img` in your project's `package.json` scripts, you can add it like this:

```json
{
  "scripts": {
    "optimize": "optimize-img ./path/to/images --bulk --preset balanced"
  }
}
```

Then run it with `npm run optimize`.

### Requirements

* Node.js **>= 18.0.0**
* Sharp prebuilt binaries for most platforms
* Some Linux distros may need `libvips` / build tools → see Sharp docs if install fails

---

## 🚀 Quick Start

### Single File

```bash
# Basic WebP optimization (default format)
optimize-img photo.jpg

# Custom quality
optimize-img photo.jpg --quality 90

# Resize + change format
optimize-img photo.png --width 800 --format jpeg

# Ratio-based resize (50%)
optimize-img texture.jpg --resize 1/2

# Percent-based resize
optimize-img photo.jpg --percent 25

# Explicit output path
optimize-img input.jpg -o output.webp
```

### Bulk / Folders

```bash
# Recursively process a directory (creates ./optimized by default)
optimize-img ./images --bulk

# With custom settings
optimize-img ./assets --bulk --format webp --quality 75 --parallel 8

# Custom output directory
optimize-img ./images --bulk -o ./optimized/
```

---

## 🎛️ Presets

Think of presets as **one-click profiles**:

> `--preset` sets defaults; explicit `--quality` / `--format` override it.

* **default**

  * Quality: `80` WebP
  * For: general projects

* **balanced**

  * Quality: `75` WebP
  * For: production websites where size matters

* **quality**

  * Quality: `90` WebP
  * For: portfolios, photography, quality-critical work

* **performant**

  * Quality: `60` WebP
  * For: bandwidth-sensitive stuff (mobile, thumbnails, etc.)

Examples:

```bash
optimize-img photo.jpg --preset quality
optimize-img ./images --bulk --preset balanced
optimize-img ./images --bulk --preset performant
```

---

## 📏 Resize Options

### Ratios (great for 3D textures / multi-res sets)

```bash
# 4K → 2K
optimize-img texture_4k.jpg --resize 1/2

# 4K → 1K
optimize-img texture_4k.jpg --resize 1/4

# Custom
optimize-img texture.jpg --resize 2/3
```

### Percentages

```bash
optimize-img photo.jpg --percent 50
optimize-img photo.jpg --percent 25
```

### Dimensions

```bash
optimize-img photo.jpg --width 1200
optimize-img photo.jpg --height 800
optimize-img photo.jpg --width 800 --height 600
```

Aspect ratio is preserved unless both width and height force a different ratio.

---

## 🔌 Integrations (optional)

Minimal example with npm scripts:

```json
{
  "scripts": {
    "optimize:images": "optimize-img ./src/assets/images --bulk --preset balanced"
  }
}
```

Run:

```bash
npm run optimize:images
```

---

## 🎮 Real-time 3D / Engine Workflows

`optimize-img` started as a 3D texture tool. Common use:

```bash
# 4K → 2K (high quality)
optimize-img ./textures/4k --bulk --resize 1/2 --format webp --quality 90

# 2K → 1K (mid-tier)
optimize-img ./textures/2k --bulk --resize 1/2 --format webp --quality 80

# Mobile / low-spec
optimize-img ./textures/final --bulk --resize 1/2 --preset performant
```

Typical pattern:

* Use ratios (`1/2`, `1/4`) to keep texture sets consistent (4K→2K→1K).
* Generate a couple of variants (e.g. `balanced` vs `performant`), plug into your engine, see how materials look under real lights.
* Originals are kept unless you pass `--delete-originals`, so you can iterate safely.

It doesn’t replace engine-specific formats (KTX2, BCn…). It’s a fast pre-processing / lookdev step before final import, heavily inspired by how tools like [glTF-Transform](https://gltf-transform.dev/) handle texture workflows. I personally use `optimize-img` to iterate heavily on texture resolution downscaling and quality until I hit the best visual result for a given budget (especially on sensitive materials like fabric). This is built for running multiple itterations for the quality regard. After that, I always run geometry/scene optimization in glTF-Transform.

---

## 📁 Bulk Mode & Safety

What `--bulk` does:

1. Recursively scans a directory
2. Preserves directory structure in the output
3. Never touches originals unless you explicitly opt in

Example folder result:

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

Safety features:

```bash
# Confirmation prompt for bulk by default
optimize-img ./photos --bulk

# Skip prompts (for scripts/CI)
optimize-img ./photos --bulk --yes

# Delete originals ONLY when the optimized file is smaller
optimize-img ./images --bulk --delete-originals
```

---

## 🧾 Metadata & Color Profiles

By default, optimize-img:

* **Strips EXIF + ICC metadata**
* Reduces file size
* Avoids accidental GPS / camera info leaks

This is usually what you want for:

* Web assets
* 3D textures / technical maps
* General image optimization

If you need metadata:

```bash
# CLI
optimize-img ./photos --bulk --keep-metadata
```

Config:

```json
{
  "stripMetadata": false,
  "keepOriginals": true
}
```

**Good rule of thumb:**

* **Keep metadata** for photography / archival / strict color-managed workflows.
* **Strip metadata** (default) for web, apps, and all technical maps (normal/roughness/metalness/etc.) – they don't benefit from EXIF/ICC.

---

## 📊 Output & Stats

Sample output:

```bash
Found 127 image files to process
Progress |████████████████████| 100% | 127/127 Files | ETA: 0s

=== Processing Complete ===
Files processed: 127
Files skipped: 0
Total size reduction: 68.3% (145.2MB → 46.1MB)
Saved: 99.1MB
Processed files saved to: ./vacation-photos/optimized/
```

With `--verbose`:

```bash
Processing: photo.jpg → photo.webp (68.3% reduction)
Original: 2.4MB (2448×3264)
Optimized: 768KB
Format: WebP (quality: 80)
Metadata: Stripped
Processing time: 124ms
```

---

## ⚙️ Configuration

### `.optimize-imgrc`

```json
{
  "format": "webp",
  "quality": 85,
  "stripMetadata": true,
  "keepOriginals": true,
  "parallel": 8,
  "preset": "balanced",
  "width": null,
  "height": null
}
```

### `optimize-img.config.js`

```js
module.exports = {
  format: 'webp',
  quality: 85,
  stripMetadata: true,
  keepOriginals: true,
  parallel: 8,
  preset: 'balanced',

  development: {
    keepOriginals: true,
    verbose: true
  },

  production: {
    preset: 'performant',
    parallel: 16
  }
};
```

> **Note:**
> Config keys use **camelCase** (`stripMetadata`).
> CLI uses **kebab-case** (`--keep-metadata`).
> CLI flags override config.
> If both files exist, `optimize-img.config.js` wins.



---

## 🛠️ Troubleshooting & Examples

To keep this README lean:

* **Examples** → [`docs/EXAMPLES.md`](./docs/EXAMPLES.md)
* **Troubleshooting** → [`docs/TROUBLESHOOTING.md`](./docs/TROUBLESHOOTING.md)
* **Programmatic Usage** → [`docs/PROGRAMMATIC_USAGE.md`](./docs/PROGRAMMATIC_USAGE.md)

You'll find:

* More recipes (web, 3D, photography, CI)
* Performance tips (parallelism, batching)
* Common errors (Sharp install, permissions, unsupported formats)

---

## 📄 License

MIT – see [LICENSE](./LICENSE).

---

## 🤝 Contributing

Issues and PRs welcome.

* 🐛 [GitHub Issues](https://github.com/jacobfreedom/optimize-img/issues)
* 💬 [GitHub Discussions](https://github.com/jacobfreedom/optimize-img/discussions)

---

**Pro tip:**
Start with:

```bash
optimize-img ./images --bulk --preset balanced
```

If it looks good, wire it into your build/CI and forget about it.