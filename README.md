# Optimize-img

A comprehensive, high-performance image optimization tool for developers with modern format support, bulk processing, and configurable presets.

[![npm version](https://badge.fury.io/js/optimize-img.svg)](https://badge.fury.io/js/optimize-img)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/node/v/optimize-img.svg)](https://nodejs.org/)
[![GitHub](https://img.shields.io/badge/GitHub-optimize--img-181717.svg)](https://github.com/jacobfreedom/optimize-img)

## 🌟 Why Optimize-img?

Originally built for high-quality 3D texture optimization with precise material control, this tool has evolved into a comprehensive image processing solution that balances **quality**, **performance**, and **ease of use**. Whether you're optimizing website assets, real-time textures, or photo collections, it handles the complexity so you can focus on your project.

## ✨ Features

- 🚀 **High Performance**: Built on [Sharp](https://sharp.pixelplumbing.com/), the fastest image processing library
- 🎯 **Multiple Formats**: WebP, JPEG, PNG, AVIF support with intelligent format selection
- 📁 **Bulk Processing**: Process entire directories recursively with parallel processing
- ⚙️ **Configurable Presets**: Default, balanced, quality, and performant presets for different use cases
- 📏 **Flexible Resizing**: Pixel dimensions, ratio-based (1/2, 1/4), or percentage scaling
- 🎨 **Metadata Control**: Strip or preserve EXIF data and color profiles
- 📊 **Progress Tracking**: Visual progress bars and detailed statistics
- 🔧 **CLI & Programmatic**: Use as a command-line tool or Node.js module
- 📦 **Zero Config**: Works out of the box with sensible defaults
- 🛡️ **Safe Operations**: Originals preserved by default, explicit deletion required
- 🎮 **3D Texture Optimization**: Built for real-time 3D / engine texture workflows

## 📦 Installation

### Global Installation (Recommended for CLI usage)

```bash
npm install -g optimize-img
```

### Local Installation (For development integration)

```bash
npm install optimize-img
```

### Development Setup

```bash
# Clone the repository
git clone https://github.com/jacobfreedom/optimize-img.git
cd optimize-img

# Install dependencies
npm install

# Run tests
npm test

# Link for local development
npm link
```

### Requirements

- Node.js >= 18.0.0
- Uses Sharp with prebuilt binaries for most platforms
- On some Linux systems you might need additional build tools / libvips – see Sharp's docs if installation fails

## 🚀 Quick Start

### Single File Optimization

```bash
# Optimize to WebP (default) - optimized for web delivery
optimize-img photo.jpg

# Optimize with custom quality
optimize-img photo.jpg --quality 90

# Resize and convert format
optimize-img photo.png --width 800 --format jpeg

# Resize by ratio (50% reduction) - perfect for 3D textures!
optimize-img photo.jpg --resize 0.5
optimize-img texture.jpg --resize 1/2    # Same as 0.5
optimize-img texture.jpg --resize 1/4    # 25% of original size

# Resize by percentage (25% of original)
optimize-img photo.jpg --percent 25

# Specify output location
optimize-img input.jpg -o output.webp
```

### Bulk Processing (Recursive Folder Support)

```bash
# Process entire directory recursively (creates 'optimized' folder)
optimize-img ./images --bulk

# Process nested folder structures
optimize-img ./assets --bulk --format webp --quality 75 --parallel 8

# Keep originals and specify output directory
optimize-img ./images --bulk -o ./optimized/

# Process only specific formats
optimize-img ./photos --bulk --format webp --resize 1/2
```

### Using Presets

```bash
# Use quality preset (90% WebP) - best for portfolio images
optimize-img photo.jpg --preset quality

# Use performant preset (60% WebP) - maximum compression for web
optimize-img ./images --bulk --preset performant

# Use balanced preset (75% WebP) - sweet spot for most projects
optimize-img ./assets --bulk --preset balanced

# List available presets
optimize-img preset
```

## 📋 Command Line Options

| Option | Description | Default | Example |
|--------|-------------|---------|---------|
| `-o, --output <path>` | Output file or directory path | Auto-generated | `-o ./optimized/` |
| `-f, --format <format>` | Output format (webp, jpeg, png, avif) | webp | `-f png` |
| `-q, --quality <number>` | Quality setting (0-100) | 80 | `-q 90` |
| `-w, --width <number>` | Resize width (maintains aspect ratio) | - | `-w 800` |
| `-h, --height <number>` | Resize height (maintains aspect ratio) | - | `-h 600` |
| `-r, --resize <value>` | Resize by ratio (e.g., 0.5 for 50%, 1/2 for half) | - | `-r 1/2` `-r 1/4` |
| `-p, --percent <number>` | Resize by percentage (e.g., 50 for 50%) | - | `-p 25` |
| `--preset <preset>` | Optimization preset | default | `--preset quality` |
| `--keep-metadata` | Preserve EXIF/ICC metadata | false (metadata stripped by default) | `--keep-metadata` |
| `--delete-originals` | Delete original files after optimization (use with caution) | false | `--delete-originals` |
| `--bulk` | Process entire directory recursively | false | `--bulk` |
| `--parallel <number>` | Number of parallel processes | 4 | `--parallel 8` |
| `--verbose` | Enable verbose logging | false | `--verbose` |
| `--config <path>` | Path to configuration file | Auto-detected | `--config ./my-config.json` |
| `--yes` | Skip confirmation prompts (use with caution) | false | `--yes` |

## 📊 Presets Explained

Think of presets as "one-click optimization modes" for different scenarios:

**Preset Override Rules:**
- `--preset` sets default `format` and `quality`
- Explicit `--quality` / `--format` on the CLI override the preset

### 🎯 Default Preset
- **Quality**: 80% WebP
- **Use Case**: General purpose, balanced optimization
- **Result**: Optimized for web delivery with excellent quality retention
- **Perfect for**: Most websites, general image optimization

### ⚖️ Balanced Preset  
- **Quality**: 75% WebP
- **Use Case**: Production websites where file size matters
- **Result**: Optimized for production use with good quality retention
- **Perfect for**: E-commerce, blogs, content sites

### 🎨 Quality Preset
- **Quality**: 90% WebP  
- **Use Case**: Portfolio, photography, where quality is paramount
- **Result**: Optimized for quality-critical applications with minimal compression
- **Perfect for**: Artist portfolios, photography websites, print preparation

### 📦 Performant Preset
- **Quality**: 60% WebP
- **Use Case**: Maximum compression for bandwidth-critical applications
- **Result**: Maximum compression for performance-critical applications
- **Perfect for**: Mobile apps, email attachments, thumbnails

## 🎯 Resize Options Deep Dive

### Ratio-Based Resizing (Recommended for 3D Textures)

```bash
# Half size - perfect for 2K→1K texture downscaling
optimize-img texture_2k.jpg --resize 1/2

# Quarter size - for 4K→1K or aggressive optimization  
optimize-img texture_4k.jpg --resize 1/4

# Custom ratios work too
optimize-img image.jpg --resize 3/4    # 75% of original
optimize-img image.jpg --resize 2/3    # 66% of original
```

**💡 Why Use Ratios?**
- **Predictable**: 1/2 always means half, regardless of original size
- **3D-friendly**: Great for building multi-res texture sets (4K → 2K → 1K)
- **Performance**: Reduces memory usage by 75% (1/2) or ~93% (1/4)

### Percentage-Based Resizing

```bash
# Common percentages for web optimization
optimize-img photo.jpg --percent 50    # Half size
optimize-img photo.jpg --percent 25    # Quarter size  
optimize-img photo.jpg --percent 75    # Three-quarter size
```

### Dimension-Based Resizing

```bash
# Fixed dimensions (maintains aspect ratio)
optimize-img photo.jpg --width 1200
optimize-img photo.jpg --height 800
optimize-img photo.jpg --width 800 --height 600
```

## 🌐 Web Development Integration

### Development Workflow

```bash
# Add to package.json scripts
{
  "scripts": {
    "optimize:images": "optimize-img ./src/assets/images --bulk --preset balanced",
    "optimize:thumbnails": "optimize-img ./src/assets/thumbs --bulk --resize 1/2 --preset performant",
    "build:images": "npm run optimize:images && npm run optimize:thumbnails"
  }
}
```

### Build Tool Integration

```bash
# Webpack/Vite plugin approach
# Run before build
optimize-img ./public/images --bulk --preset balanced --yes

# CI/CD Pipeline (GitHub Actions)
- name: Optimize Images
  run: |
    npm install -g optimize-img
    optimize-img ./public/images --bulk --preset balanced --yes
```

### Performance Guidelines

**For Hero Images:**
```bash
# Full-width heroes (1920px)
optimize-img hero.jpg --width 1920 --quality 85 --format webp

# Content heroes (1200px) 
optimize-img hero.jpg --width 1200 --quality 80 --format webp
```

**For Content Images:**
```bash
# Blog post images
optimize-img article.jpg --width 800 --quality 75 --format webp

# Thumbnails
optimize-img thumb.jpg --resize 1/4 --quality 70 --format webp
```

**For Icons/Graphics:**
```bash
# UI icons (use PNG for transparency)
optimize-img icon.png --resize 1/2 --format png

# Simple graphics (WebP is fine)
optimize-img graphic.jpg --resize 1/2 --format webp
```

## 🎮 Real-time 3D Workflows

`optimize-img` was originally built for 3D textures, so it fits nicely into real-time 3D workflows (engines like Unity/Unreal, custom WebGL/WebGPU renderers, DCC previews, and games) where you need quick downscales and quality checks.

### Typical 3D texture workflow

```bash
# Step 1: Downscale high-res textures (4K → 2K)
optimize-img ./textures/source_4k --bulk --resize 1/2 --format webp --quality 90

# Step 2: Generate another level (2K → 1K)
optimize-img ./textures/source_2k --bulk --resize 1/2 --format webp --quality 80

# Step 3: Create a "mobile" / low-spec variant
optimize-img ./textures/final --bulk --resize 1/2 --preset performant
```

### How 3D artists usually use it

**Fast downscaling**: Use `--resize 1/2`, `1/4`, etc. to quickly create multiple resolution sets (4K → 2K → 1K) while keeping proportions consistent.

**Material quality testing**: Run a couple of variants (`--preset balanced` vs `--preset performant` or different `--quality` values), plug them into your engine, and see how materials behave under real lighting and post-processing.

**Safe iteration**: Originals are preserved by default, so you can experiment with compression levels and resolutions without risking your source texture library.

It's not meant to replace engine-specific texture formats (KTX2, BCn, etc.), but it's a fast, safe pre-processing step for preparing and evaluating textures before they go into your runtime pipeline.

## 📁 Bulk Processing & Folder Operations

### Understanding Bulk Mode

When you use `--bulk`, the tool:

1. **Scans recursively**: Finds images in all subdirectories
2. **Preserves structure**: Creates parallel folder structure in `optimized/` folder
3. **Processes safely**: Won't overwrite originals (unless you explicitly want to)
4. **Reports progress**: Shows detailed progress and statistics

### Folder Structure Examples

```
# Before processing
project/
├── assets/
│   ├── images/
│   │   ├── heroes/
│   │   │   └── hero1.jpg
│   │   ├── products/
│   │   │   ├── product1.png
│   │   │   └── product2.png
│   │   └── icons/
│   │       └── icon.svg
│   └── textures/
│       ├── character.jpg
│       └── environment.png

# After: optimize-img ./assets --bulk
project/
├── assets/
│   ├── images/
│   │   ├── heroes/
│   │   │   └── hero1.jpg
│   │   ├── products/
│   │   │   ├── product1.png
│   │   │   └── product2.png
│   │   └── icons/
│   │       └── icon.svg
│   ├── textures/
│   │   ├── character.jpg
│   │   └── environment.png
│   └── optimized/  ← New folder created
│       ├── images/
│       │   ├── heroes/
│       │   │   └── hero1.webp
│       │   ├── products/
│       │   │   ├── product1.webp
│       │   │   └── product2.webp
│       │   └── icons/
│       │       └── icon.webp
│       └── textures/
│           ├── character.webp
│           └── environment.webp
```

### Safety Features

**Confirmation Prompts:**
```bash
# This will show a warning and ask for confirmation
optimize-img ./photos --bulk

# Skip confirmation (use in scripts/automation)
optimize-img ./photos --bulk --yes
```

**Keep Originals Mode:**
```bash
# Never delete originals, create optimized copies
optimize-img ./images --bulk

# Custom output directory with originals preserved
optimize-img ./images --bulk -o ./compressed/
```

### Deletion Process (When using --delete-originals)

**What gets deleted:**
- Only the specific files that were successfully processed
- Only after the optimized version is confirmed written
- Only if the optimized version is smaller than the original

**What stays safe:**
- Files that failed processing
- Files that resulted in larger output (rare but possible)
- Files in subdirectories (bulk creates new structure)
- Non-image files (automatically skipped)

## 🔬 Technical Factors Affecting Optimization

### Image Characteristics That Influence Results

**Color Complexity:**
- Images with many similar colors (skies, gradients) compress better than busy, high-contrast images
- Photographs with smooth color transitions achieve better compression than graphics with sharp edges
- Dark images generally compress better than bright, colorful ones

**Content Type Impact:**
- **Photographs**: Natural color gradients compress efficiently, especially with WebP
- **Screenshots/UI**: Sharp edges and text may show artifacts at lower quality settings
- **Graphics/Logos**: Vector-like graphics with flat colors compress well but may need higher quality
- **Textures**: 3D textures with repeating patterns achieve excellent compression ratios

**Resolution Considerations:**
- Higher resolution images provide more room for compression optimization
- Downsampling (1/2, 1/4 ratios) significantly reduces file size while maintaining visual quality
- Tested with images up to ~22K on the long edge for professional workflows

**Format-Specific Factors:**
- **WebP**: Best overall compression, supports transparency, ideal for web
- **JPEG**: Excellent for photographs, poor for graphics with sharp edges
- **PNG**: Lossless, best for graphics with transparency, larger file sizes
- **AVIF**: Superior compression but longer processing time, emerging standard

### Metadata and Color Profiles

**EXIF Data:** Professional photos contain camera settings, GPS data, thumbnails
**Color Profiles**: sRGB, Adobe RGB, ProPhoto RGB affect color accuracy
**ICC Profiles**: Ensure consistent color across devices and browsers

**Recommendation:** By default, optimize-img strips EXIF and ICC metadata to reduce file size and avoid leaking GPS/camera data. Use `--keep-metadata` if you need to preserve metadata for photography, archival, or strict color management workflows.

## 📊 Output & Statistics

### What You'll See During Processing

```bash
$ optimize-img ./vacation-photos --bulk --preset balanced

Found 127 image files to process
Progress |████████████████████| 100% | 127/127 Files | ETA: 0s

=== Processing Complete ===
Files processed: 127
Files skipped: 0
Total size reduction: 68.3% (145.2MB → 46.1MB)
Saved: 99.1MB

Processed files saved to: ./vacation-photos/optimized/
Original files: Preserved (default behavior)
```

### Understanding the Statistics

- **Files processed**: Successfully converted images
- **Files skipped**: Already optimized, unsupported format, or errors
- **Total size reduction**: Overall compression percentage
- **Saved**: Disk space freed up (when originals are deleted)

### Per-File Reporting (with --verbose)

```bash
$ optimize-img photo.jpg --verbose

Processing: photo.jpg → photo.webp (68.3% reduction)
Original: 2.4MB (2448×3264)
Optimized: 768KB (2448×3264) 
Format: WebP (quality: 80)
Metadata: Stripped
Processing time: 124ms
```

## ⚙️ Configuration File

Create a `.optimize-imgrc` file in your project root for consistent settings:

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

Or use `optimize-img.config.js` for more flexibility:

```javascript
module.exports = {
  format: 'webp',
  quality: 85,
  stripMetadata: true,
  keepOriginals: true,
  parallel: 8,
  preset: 'balanced',
  // Environment-specific settings
  development: {
    keepOriginals: true,
    verbose: true
  },
  production: {
    preset: 'performant',
    parallel: 16
  }
}
```

**Note:** Config keys use camelCase (`stripMetadata`), CLI options use kebab-case (`--keep-metadata`). CLI flags override config files. If both `.optimize-imgrc` and `optimize-img.config.js` are present, the JS config takes precedence.

## 🔧 Programmatic Usage

```javascript
const ImageOptimizer = require('optimize-img')

const optimizer = new ImageOptimizer({
  format: 'webp',
  quality: 85,
  stripMetadata: true,  // Default: strips metadata for web optimization
  keepOriginals: false,
  width: 1200,
  height: 800,
  verbose: true
})

// Process single file
await optimizer.run('./input.jpg')

// Process directory
await optimizer.run('./images')

// Access statistics
console.log(`Processed: ${optimizer.stats.processed} files`)
console.log(`Total size before: ${optimizer.stats.totalSizeBefore} bytes`)
console.log(`Total size after: ${optimizer.stats.totalSizeAfter} bytes`)
```

### Photography / Archival Work
```javascript
// Preserve metadata for professional photography
const photoOptimizer = new ImageOptimizer({
  format: 'jpeg',
  quality: 95,
  stripMetadata: false,  // Keep EXIF/ICC for color accuracy
  keepOriginals: true,
  verbose: true
})

await photoOptimizer.run('./client-photos')
```

## 🛠️ Troubleshooting

### Common Issues & Solutions

**"Permission denied" errors**
```bash
# Fix ownership
sudo chown -R $(whoami) ./images

# Or run with appropriate permissions
sudo optimize-img ./system-images --bulk --yes
```

**"Unsupported format" errors**
```bash
# Check what formats are supported
optimize-img formats

# Convert to supported format first
# (Use ImageMagick or similar for conversion)
```

**Memory issues with large files**
```bash
# Reduce parallel processing
optimize-img ./large-images --bulk --parallel 2

# Process in smaller batches
optimize-img ./large-images/part1 --bulk
optimize-img ./large-images/part2 --bulk
```

**Processing is slow**
```bash
# Increase parallel processing (if you have CPU cores)
optimize-img ./images --bulk --parallel 16

# Use faster preset
optimize-img ./images --bulk --preset performant
```

**Files aren't getting smaller**
```bash
# Check if files are already optimized
optimize-img ./images --bulk --verbose

# Try more aggressive settings
optimize-img ./images --bulk --preset performant --quality 60
```

### Debug Mode

```bash
# Enable verbose logging for detailed information
optimize-img ./images --bulk --verbose

# Test with a single file first
optimize-img test-image.jpg --verbose --quality 80
```

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

**Copyright (c) 2024 Jakub Svoboda** (https://github.com/jacobfreedom)

This is an open-source project. Feel free to use, modify, and distribute according to the MIT license terms.

## 🤝 Contributing

We welcome contributions! Whether it's bug reports, feature requests, or code contributions, please check out our [Contributing Guide](CONTRIBUTING.md) to get started.

## 🙏 Credits

- **Created by**: [Jakub Svoboda](https://github.com/jacobfreedom) - Originally built for 3D texture optimization
- **Powered by**: [Sharp](https://sharp.pixelplumbing.com/) - High performance image processing
- **CLI Framework**: [Commander.js](https://github.com/tj/commander.js/) - Excellent CLI framework
- **Inspired by**: [glTF Transform](https://gltf-transform.dev/) - Real-time 3D model & texture optimization tool

## 📞 Support

- 📖 **Documentation**: Check this README first
- 🐛 **Issues**: [GitHub Issues](https://github.com/jacobfreedom/optimize-img/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/jacobfreedom/optimize-img/discussions)
- 📧 **Direct Contact**: Reach out through GitHub

---

**Pro Tip**: Start with the `--preset balanced` option for most projects. It provides excellent compression with minimal quality loss, perfect for web deployment!