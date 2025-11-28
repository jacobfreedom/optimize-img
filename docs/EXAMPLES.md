# Examples & Recipes

This file contains detailed examples and recipes for different use cases. For basic usage, see the main README.

## Quick Reference

- **[Web Development](#-web-development-recipes)** - Responsive images, e-commerce, static sites
- **[3D & Game Development](#-3d--game-development)** - Texture pipelines, PBR materials, WebGL optimization
- **[Photography Workflows](#-photography-workflows)** - Client delivery, portfolio optimization
- **[Performance Optimization](#-performance-optimization)** - Large batches, memory management
- **[CI/CD Integration](#-cicd-integration)** - GitHub Actions, GitLab CI, Docker
- **[Advanced Configuration](#-advanced-configuration)** - Multi-format output, environment configs
- **[Test Results](./TEST_RESULTS.md)** - Comprehensive metrics from recent runs

## 📁 Folder Structure Examples

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

# After: optimg ./assets --bulk
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

## 🌐 Web Development Recipes

### Responsive Image Sets

```bash
# Create multiple sizes for responsive images
optimg hero.jpg --width 1920 --format webp --quality 90 -o hero-1920.webp
optimg hero.jpg --width 1200 --format webp --quality 85 -o hero-1200.webp
optimg hero.jpg --width 768 --format webp --quality 80 -o hero-768.webp
optimg hero.jpg --width 480 --format webp --quality 75 -o hero-480.webp
```

### E-commerce Product Images

```bash
# Main product images (high quality)
optimg ./products --bulk --preset quality --width 1200

# Thumbnails (smaller, faster loading)
optimg ./products --bulk --preset performant --width 300 --output ./thumbnails

# Mobile-optimized versions
optimg ./products --bulk --preset balanced --width 600 --output ./mobile
```

### Static Site Generators

```bash
# Hugo/Jekyll/Gatsby workflow
optimg ./static/images --bulk --preset balanced --format webp

# Keep originals for fallback
optimg ./static/images --bulk --preset balanced --format jpeg --output ./static/images/jpeg-fallback
```

## 🎮 3D & Game Development

### Texture Pipeline for Unity/Unreal

```bash
# High-quality base textures
optimg ./textures/source --bulk --resize 1/1 --preset quality --format webp --output ./textures/high

# Medium quality for most objects
optimg ./textures/source --bulk --resize 1/2 --preset balanced --format webp --output ./textures/medium

# Low quality for background/less important objects
optimg ./textures/source --bulk --resize 1/4 --preset performant --format webp --output ./textures/low
```

### PBR Material Textures

```bash
# Albedo/Diffuse maps (keep color accuracy - metadata preserved by default)
optimg ./textures/albedo --bulk --preset quality

# Normal maps (preserve detail - metadata preserved by default)
optimg ./textures/normal --bulk --preset quality --format png

# Roughness/Metalness (technical maps, strip metadata for size)
optimg ./textures/technical --bulk --preset balanced --strip-metadata
```

### WebGL/WebGPU Optimization

```bash
# Power-of-two textures for better GPU performance
optimg ./webgl/textures --bulk --resize 1/2 --width 512 --height 512 --preset performant

# Compressed formats for web
optimg ./webgl/textures --bulk --format webp --quality 75 --preset balanced
```

## 🚀 Performance Optimization

### Large Batch Processing

```bash
# Process thousands of images efficiently
optimg ./massive-collection --bulk --preset performant --parallel 16 --yes

# Split into smaller batches for memory management
for dir in ./batches/*/; do
  optimg "$dir" --bulk --preset balanced --parallel 8
done
```

### Memory-Constrained Environments

```bash
# Reduce memory usage for large files
optimg ./large-images --bulk --preset performant --parallel 2 --quality 70

# Process in stages
optimg ./stage1 --bulk --preset performant
optimg ./stage2 --bulk --preset performant
```



### Optimization Techniques Explained

#### Format-Specific Optimizations

**WebP Optimization (Default)**
- **Quality-based compression**: Adjustable quality setting (0-100)
- **Effort levels**: 0-10 (higher = slower but better compression)
- **Lossless option**: Available for maximum quality preservation
- **Browser support**: 95%+ modern browser compatibility
- **Typical savings**: 25-35% smaller than JPEG, 26% smaller than PNG

**JPEG Optimization**
- **MozJPEG encoder**: Advanced JPEG encoding for better compression
- **Progressive encoding**: Faster perceived loading
- **Chroma subsampling**: 4:2:0 for better compression
- **Quantization tables**: Optimized for human visual perception
- **Typical savings**: 10-20% smaller than standard JPEG

**PNG Optimization**
- **Adaptive filtering**: Dynamic filter selection per scanline
- **Compression levels**: 0-9 (balance between speed and size)
- **Color type optimization**: Automatic color type selection
- **Palette reduction**: 8-bit palette when beneficial
- **Typical savings**: 15-25% smaller than standard PNG

**AVIF Optimization**
- **Advanced video codec**: Based on AV1 video format
- **HDR support**: High dynamic range images
- **Wide color gamut**: Rec2020 color space support
- **Lossless option**: Available for archival quality
- **Typical savings**: 50% smaller than JPEG, 20% smaller than WebP

#### Resize and Scaling Optimizations

**Dimension-based Resizing**
- **Lanczos3 filtering**: High-quality downsampling
- **Gamma correction**: Proper color space handling
- **Sharpening**: Optional post-resize sharpening
- **Aspect ratio preservation**: Automatic cropping or padding

**Ratio-based Resizing**
- **Floating-point precision**: Accurate ratio calculations
- **Fraction support**: "1/2" or "2/3" ratio inputs
- **Minimum size enforcement**: Prevents over-compression
- **Upsampling prevention**: Won't enlarge images beyond original

**Percentage-based Resizing**
- **Precise calculations**: Maintains exact proportions
- **Batch consistency**: Same percentage applied to all images
- **Size validation**: Ensures minimum viable dimensions

#### Metadata and Color Management

**Metadata Stripping**
- **EXIF removal**: Camera settings, GPS data, timestamps
- **ICC profile handling**: Optional color profile preservation
- **XMP data**: Adobe-specific metadata removal
- **Comments**: Text annotations removal
- **Privacy benefits**: Reduces file fingerprinting

**Color Profile Management**
- **ICC profile embedding**: Optional color accuracy preservation
- **sRGB conversion**: Standard color space normalization
- **Gamut mapping**: Proper color space conversions
- **Rendering intent**: Perceptual vs. relative colorimetric

#### Performance Optimizations

**Parallel Processing**
- **Worker pool**: Configurable parallel workers (default: 4)
- **Memory management**: Prevents memory exhaustion
- **Load balancing**: Even distribution across CPU cores
- **Error isolation**: Individual file failures don't affect others

**Memory Efficiency**
- **Streaming processing**: Minimal memory footprint
- **Chunk-based operations**: Prevents memory spikes
- **Garbage collection**: Automatic cleanup between files
- **Buffer reuse**: Efficient memory allocation

**I/O Optimization**
- **Asynchronous operations**: Non-blocking file operations
- **Directory caching**: Faster repeated directory access
- **Progress tracking**: Real-time progress updates
- **Error recovery**: Graceful handling of I/O failures

## 📸 Photography Workflows

### Client Photo Delivery

```bash
# High-resolution finals (metadata preserved by default for copyright)
optimg ./client-photos --bulk --preset quality --format jpeg

# Web gallery (smaller, faster - strip metadata for privacy/size)
optimg ./client-photos --bulk --preset balanced --width 1200 --format webp --strip-metadata --output ./web-gallery

# Social media versions
optimg ./client-photos --bulk --preset performant --width 1080 --format jpeg --output ./social
```

### Portfolio Optimization

```bash
# Full resolution for download
optimg ./portfolio --bulk --preset quality --format jpeg --output ./portfolio/full

# Web display
optimg ./portfolio --bulk --preset balanced --width 1600 --format webp --output ./portfolio/web

# Thumbnails
optimg ./portfolio --bulk --preset performant --width 400 --format webp --output ./portfolio/thumbs
```

## CI/CD Integration

### GitHub Actions

```yaml
name: Optimize Images
on:
  push:
    paths:
      - 'images/**'

jobs:
  optimize:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install optimg-cli
        run: npm install -g optimg-cli
      
      - name: Optimize images
        run: optimg ./images --bulk --preset balanced
      
      - name: Commit changes
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add .
          git diff --staged --quiet || git commit -m "Optimize images"
          git push
```

### GitLab CI

```yaml
optimize-images:
  image: node:18
  script:
    - npm install -g optimg-cli
    - optimg ./images --bulk --preset balanced
  only:
    changes:
      - images/**/*
```

### Docker

```dockerfile
FROM node:18-alpine

RUN npm install -g optimg-cli

WORKDIR /app
COPY images/ ./images/

RUN optimg ./images --bulk --preset balanced

CMD ["optimg", "--help"]
```

## 🔧 Advanced Configuration

### Environment-Specific Configs

```js
// optimg.config.js
module.exports = {
  format: 'webp',
  quality: 85,
  stripMetadata: false, // metadata preserved by default
  keepOriginals: true,
  parallel: 8,
  preset: 'balanced',

  development: {
    keepOriginals: true,
    verbose: true,
    preset: 'default'
  },

  staging: {
    preset: 'balanced',
    parallel: 12
  },

  production: {
    preset: 'performant',
    parallel: 16,
    stripMetadata: false // metadata preserved by default
  }
};
```

### Multi-Format Output

```bash
# Generate multiple formats for broad compatibility
for format in webp jpeg png; do
  optimg ./images --bulk --format $format --output ./optimized/$format
done
```

## 📊 Performance & Results

For comprehensive, up-to-date test runs and metrics, see `docs/TEST_RESULTS.md`.

## 🎯 Best Practices

### General Guidelines

1. **Start Conservative**: Use `--preset balanced` first, then adjust based on results
2. **Test First**: Process a few images before running bulk operations
3. **Keep Originals**: Use `keepOriginals: true` until you're confident with results
4. **Use Parallel Processing**: Set `--parallel` to your CPU core count for best performance

### Format Selection

- **WebP**: Best for web, good compression and quality
- **JPEG**: Use for photography when WebP isn't supported
- **PNG**: Use for graphics, screenshots, or when transparency is needed
- **AVIF**: Best compression, but slower processing and limited support

### Quality Settings

- **Quality 90-95**: Photography, portfolios, archival work
- **Quality 75-85**: General web use, good balance
- **Quality 60-75**: Thumbnails, previews, bandwidth-sensitive applications
- **Quality 50-60**: Maximum compression, acceptable quality loss

### Troubleshooting Tips

If you encounter issues:

- **Windows users**: Check [Windows-specific troubleshooting](./TROUBLESHOOTING.md#windows-issues) for file system limitations and EPERM errors
- **Memory issues**: Reduce `--parallel` setting or process smaller batches
- **Quality concerns**: Use `--verbose` flag to see detailed processing information
- **Format problems**: Run `optimg formats` to see supported formats

---

*For detailed troubleshooting, see [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)*
