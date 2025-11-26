# optimize-img

A high-performance image optimization CLI for developers with modern format support, bulk processing of folders and subfolders, and presets.

[![npm version](https://badge.fury.io/js/optimize-img.svg)](https://badge.fury.io/js/optimize-img)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
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
- **Convenience** – presets, bulk mode for folders and subfolders, config files, and programmatic use

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
- 🧾 **Metadata** – **preserves EXIF/ICC metadata by default** for archival/color accuracy, `--strip-metadata` if you need privacy/size reduction
- 📊 **Stats** – progress bar + before/after size reduction
- 🧪 **3D-Friendly** – ideal for quickly downscaling/testing texture sets

---

## 🔣 Supported Formats

### Input
Any format supported by Sharp, including (most common): **JPEG / JPG, PNG, WebP, AVIF, TIFF**

### Output
Controlled via `--format`: webp (default), jpeg, png, avif

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

---

## ⚙️ CLI Options

### Basic Options

```bash
# Input/Output
optimize-img <input>                 # Input file or directory
optimize-img <input> -o <output>     # Custom output path

# Format & Quality
optimize-img <input> --format webp   # Output format (webp, jpeg, png, avif)
optimize-img <input> --quality 85    # Quality (0-100, default: 80)

# Resizing
optimize-img <input> --width 800    # Resize width
optimize-img <input> --height 600    # Resize height
optimize-img <input> --resize 1/2   # Resize by ratio
optimize-img <input> --percent 50    # Resize by percentage

# Presets
optimize-img <input> --preset quality    # Quality preset (default, balanced, quality, performant)
```

### Advanced Options

```bash
# Bulk Processing
optimize-img <directory> --bulk          # Process entire directory recursively
optimize-img <directory> --bulk --parallel 8  # Parallel processing

# Metadata & File Operations
optimize-img <input> --strip-metadata     # Remove EXIF/ICC metadata for privacy/size
optimize-img <input> --delete-originals  # Delete original files after optimization

# Configuration
optimize-img <input> --config ./config.json  # Custom configuration file
optimize-img <input> --verbose          # Enable verbose logging
optimize-img <input> --yes              # Skip confirmation prompts
```

### Platform-Specific Notes

- **Windows**: The `--delete-originals` flag is **NOT SUPPORTED** on Windows systems due to fundamental Windows file system locking behavior. Files remain locked and cannot be deleted reliably. Use alternative workflows for Windows environments.
- **Linux/macOS**: File operations generally work as expected with proper permissions.

Use `optimize-img --help` for the complete list of options and descriptions.

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

### ⚠️ Platform Limitations - IMPORTANT

- **Windows**: **`--delete-originals` IS NOT SUPPORTED** - Due to fundamental Windows file system architecture, file deletion operations cannot be guaranteed to work reliably. Files remain locked by the system and third-party applications, making safe deletion impossible.
- **Linux/macOS**: File operations work reliably with proper permissions.

**Windows Workflow Recommendation**:
- Process images without deletion (`optimize-img ./images --bulk`)
- Manually clean up original files when they are not in use
- Use the tool primarily for optimization without automated deletion

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

It doesn’t replace engine-specific formats (KTX2, BCn…). It’s a fast pre-processing / lookdev step before final import, heavily inspired by how tools like [glTF-Transform](https://gltf-transform.dev/) handle texture workflows. I personally use `optimize-img` to iterate heavily on texture resolution downscaling and quality until I hit the best visual result for a given budget (especially on sensitive materials like fabric). 

**This is built for running multiple quality iterations. After that, I always run geometry/scene optimization in glTF-Transform.**

**Additional quality tip:** Keep your normal maps at full 2K quality (optionally WebP for load-time), and use this tool to downscale baseColor + ORM to 1K PNGs. Then convert these two with KTX2 pass. You can even start with 4K source and keep downscale quality testing.

---

## 🧾 Metadata & Color Profiles

By default, optimize-img:

* **Preserves EXIF + ICC metadata**
* Maintains color accuracy and archival information
* Respects photographer and creator metadata

This is usually what you want for:

* Photography and archival workflows
* Color-managed professional workflows
* Projects requiring attribution or copyright information

If you need to remove metadata for privacy or size reduction:

```bash
# CLI
optimize-img ./photos --bulk --strip-metadata
```

Config:

```json
{
  "stripMetadata": false, // metadata preserved by default
  "keepOriginals": true
}
```

**Good rule of thumb:**

* **Preserve metadata** (default) for photography / archival / strict color-managed workflows.
* **Strip metadata** for web, apps, and technical maps when privacy or maximum size reduction is critical.

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



## ⚠️ Error Handling & Platform Notes

### Windows File System Limitations

**File Deletion Issues**: On Windows systems, the `--delete-originals` flag **IS NOT SUPPORTED** due to:
- Fundamental Windows file locking architecture
- System-level file locking by antivirus, file explorers, and other processes
- Permission and security restrictions inherent to Windows
- File system caching and delayed release mechanisms

**Windows-Specific Workflow**:
```bash
# Process without deletion (required for Windows)
optimize-img ./images --bulk

# Manual cleanup required - files cannot be deleted automatically
# Clean up originals manually when files are confirmed not in use
```

**Note**: Windows file system behavior prevents reliable automated deletion. This is a platform limitation, not a tool limitation.

### Common Error Scenarios

1. **File Permission Errors**: Ensure you have write permissions to both input and output directories
2. **Disk Space Issues**: Optimization may require temporary disk space for processing
3. **Unsupported Formats**: Check that input formats are supported by Sharp
4. **Memory Constraints**: Large images may require adequate system memory

### Platform Compatibility

- **Linux/macOS**: Full functionality with reliable file operations
- **Windows**: Optimization works reliably; file deletion may be limited
- **CI/CD Environments**: Use `--yes` flag to skip interactive prompts

## 🛠️ Troubleshooting & Examples

To keep this README lean:

* **Examples** → [`docs/EXAMPLES.md`](./docs/EXAMPLES.md)
* **Troubleshooting** → [`docs/TROUBLESHOOTING.md`](./docs/TROUBLESHOOTING.md)
* **Configuration & Programmatic Usage** → [`docs/PROGRAMMATIC_USAGE.md#configuration`](./docs/PROGRAMMATIC_USAGE.md#configuration)


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

Start with:

```bash
optimize-img ./images --bulk --preset balanced
```

If it looks good, wire it into your build/CI and forget about it.