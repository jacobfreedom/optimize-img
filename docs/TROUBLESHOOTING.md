# Troubleshooting Guide

## Common Issues and Solutions

### Installation Issues

#### "npm install" fails with Sharp errors

**Problem**: Sharp installation fails with native module compilation errors.

**Solutions**:

1. **Update Node.js**: Ensure you're using Node.js >= 18.0.0
   ```bash
   node --version
   ```

2. **Clear npm cache**:
   ```bash
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Install build tools** (if needed):
   ```bash
   # macOS
   xcode-select --install
   
   # Ubuntu/Debian
   sudo apt-get install build-essential
   
   # Windows
   npm install --global windows-build-tools
   ```

#### "Permission denied" during global installation

**Problem**: Cannot install globally due to permission issues.

**Solutions**:

1. **Use npx** (recommended):
   ```bash
   npx optimize-img image.jpg
   ```

2. **Fix npm permissions**:
   ```bash
   mkdir ~/.npm-global
   npm config set prefix '~/.npm-global'
   echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
   source ~/.bashrc
   ```

### Runtime Issues

#### "Input path does not exist"

**Problem**: Specified file or directory cannot be found.

**Solutions**:

1. **Check file path**:
   ```bash
   ls -la ./your-image.jpg
   ```

2. **Use absolute paths**:
   ```bash
   optimize-img /full/path/to/image.jpg
   ```

3. **Check file permissions**:
   ```bash
   ls -la ./your-image.jpg
   chmod +r ./your-image.jpg
   ```

#### "Unsupported format" errors

**Problem**: File format is not supported.

**Solutions**:

1. **Check supported formats**:
   ```bash
   optimize-img formats
   ```

2. **Convert to supported format first**:
   ```bash
   # Convert HEIC to JPEG first
   sips -s format jpeg input.heic --out input.jpg
   optimize-img input.jpg
   ```

3. **Update file extension**:
   ```bash
   # Sometimes files have wrong extensions
   file ./image.jpg  # Check actual format
   mv ./image.jpg ./image.png  # Rename if needed
   ```

#### "Output file already exists"

**Problem**: Output file would overwrite existing file.

**Solutions**:

1. **Specify different output**:
   ```bash
   optimize-img input.jpg -o output-new.webp
   ```

2. **Remove existing files**:
   ```bash
   rm ./output.webp
   optimize-img input.jpg
   ```

3. **Use different format**:
   ```bash
   optimize-img input.jpg --format jpeg
   ```

### Performance Issues

#### "Out of memory" with large files

**Problem**: Processing fails due to memory constraints.

**Solutions**:

1. **Reduce parallel processing**:
   ```bash
   optimize-img ./large-images --bulk --parallel 2
   ```

2. **Process in smaller batches**:
   ```bash
   # Process subdirectories separately
   optimize-img ./images/batch1 --bulk
   optimize-img ./images/batch2 --bulk
   ```

3. **Increase Node.js memory limit**:
   ```bash
   node --max-old-space-size=4096 $(which optimize-img) ./images --bulk
   ```

#### Slow processing with many files

**Problem**: Bulk processing is too slow.

**Solutions**:

1. **Increase parallel processing**:
   ```bash
   optimize-img ./images --bulk --parallel 8
   ```

2. **Use faster preset**:
   ```bash
   optimize-img ./images --bulk --preset performant
   ```

3. **Process only specific formats**:
   ```bash
   # Process only JPEG files
   find ./images -name "*.jpg" -exec optimize-img {} \;
   ```

### Quality Issues

#### "Output quality is poor"

**Problem**: Optimized images look worse than expected.

**Solutions**:

1. **Use higher quality setting**:
   ```bash
   optimize-img input.jpg --quality 90
   ```

2. **Use quality preset**:
   ```bash
   optimize-img input.jpg --preset quality
   ```

3. **Try different format**:
   ```bash
   optimize-img input.jpg --format png  # Lossless
   ```

#### "Colors look different"

**Problem**: Color accuracy issues after optimization.

**Solutions**:

1. **Preserve color profiles**:
   ```bash
   # Use --keep-metadata to preserve color profiles and EXIF data
   optimize-img input.jpg --keep-metadata
   # Or use custom config
   optimize-img input.jpg --config ./preserve-color-profile.json
   ```

2. **Use specific color space**:
   ```bash
   # Process with Sharp directly for advanced options
   sharp input.jpg --withMetadata --to-file output.webp
   ```

### Configuration Issues

#### "Configuration file not found"

**Problem**: Custom configuration file cannot be loaded.

**Solutions**:

1. **Check file path**:
   ```bash
   ls -la ./my-config.json
   ```

2. **Use absolute path**:
   ```bash
   optimize-img input.jpg --config /full/path/to/config.json
   ```

3. **Verify JSON syntax**:
   ```bash
   node -e "console.log(JSON.parse(require('fs').readFileSync('./config.json')))"
   ```

#### "Preset not recognized"

**Problem**: Custom or misspelled preset name.

**Solutions**:

1. **List available presets**:
   ```bash
   optimize-img preset
   ```

2. **Check spelling**:
   ```bash
   # Correct: --preset quality
   # Incorrect: --preset high-quality
   ```

3. **Use full configuration**:
   ```bash
   # Instead of preset, use individual options
   optimize-img input.jpg --format webp --quality 90
   ```

## Getting Help

### Debug Mode

Enable verbose logging to see detailed information:

```bash
optimize-img input.jpg --verbose
```

### System Information

Gather system information for bug reports:

```bash
# Node.js version
node --version

# npm version
npm --version

# OS information
uname -a  # Linux/macOS
systeminfo  # Windows

# Sharp version
npm list sharp
```

### Performance Profiling

Profile processing performance:

```bash
# Time the operation
time optimize-img ./images --bulk

# Monitor memory usage
node --inspect $(which optimize-img) ./images --bulk
```

### File Information

Debug specific files:

```bash
# Check file format
file ./problematic-image.jpg

# Check image metadata
identify -verbose ./problematic-image.jpg  # ImageMagick
sharp ./problematic-image.jpg --metadata   # Sharp CLI
```

## Reporting Issues

When reporting issues, please include:

1. **Command used** (with sensitive paths redacted)
2. **Complete error message**
3. **Node.js version** (`node --version`)
4. **Operating system**
5. **Sample file** (if possible)
6. **Expected vs actual behavior**

### Issue Template

```markdown
**Description:**
Brief description of the issue

**Command:**
```bash
optimize-img input.jpg --format webp --quality 80
```

**Error:**
```
Error: Unsupported format
```

**Environment:**
- Node.js: v18.17.0
- OS: Ubuntu 22.04
- optimize-img: v1.0.0

**Expected:**
Image should be converted to WebP format

**Actual:**
Error about unsupported format
```

## Community Support

- **GitHub Issues**: Report bugs and request features
- **Discussions**: Ask questions and share experiences
- **Wiki**: Community-maintained documentation
- **Stack Overflow**: Tag questions with `optimize-img`