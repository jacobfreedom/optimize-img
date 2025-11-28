# Troubleshooting Guide

Common issues and their solutions when using optimize-img.

## Quick Reference

- **[Installation Issues](#-installation-issues)** - Sharp install failures, permission errors
- **[Runtime Issues](#-runtime-issues)** - File not found, unsupported formats, output conflicts
- **[Performance Issues](#-performance-issues)** - Memory issues, slow processing
- **[Quality Issues](#-quality-issues)** - Poor output quality, color accuracy problems
- **[Configuration Issues](#-configuration-issues)** - Config file problems, preset issues
- **[Platform-Specific Issues](#-platform-specific-issues)** - Windows, macOS, Linux solutions
- **[Debug Mode](#getting-help)** - Verbose logging and diagnostics

> **Need examples?** See [EXAMPLES.md](./EXAMPLES.md) for usage recipes and best practices.

## 🚨 Installation Issues

### Sharp Installation Fails

**Problem**: `npm install` fails with Sharp-related errors

**Solutions**:

```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# Install Sharp with prebuilt binaries
npm install sharp --ignore-scripts=false

# On Ubuntu/Debian, install build dependencies
sudo apt-get update
sudo apt-get install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

# On macOS, install Xcode command line tools
xcode-select --install

# On CentOS/RHEL/Fedora
sudo yum install gcc-c++ cairo-devel pango-devel libjpeg-turbo-devel giflib-devel

# On Windows, install windows-build-tools (if needed)
npm install --global windows-build-tools
```

### Permission Errors During Global Install

**Problem**: `npm install -g optimize-img` fails with permission errors

**Solutions**:

```bash
# Use npm's global directory (recommended)
npm config set prefix ~/.npm-global
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
npm install -g optimize-img

# Or use npx instead of global install
npx optimize-img --help

# Or fix npm permissions (use with caution)
sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}
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

## 🖥️ Platform-Specific Issues

### Windows Issues

**Problem**: File permission errors, Sharp crashes, EPERM/EBUSY errors during file operations

**Important Note**: The `--delete-originals` flag is **NOT SUPPORTED** on Windows systems due to fundamental Windows file system architecture limitations. Files remain locked by the system and cannot be reliably deleted.

**Solutions**:

```bash
# Run as Administrator for file access permissions
# Or use Windows Subsystem for Linux (WSL) for better file system compatibility

# Check antivirus software - may block file operations
# Add optimize-img to antivirus exclusions

# Use shorter paths (Windows path length limitations)
cd /d C:\short\path
optimize-img . --bulk

# Close any image viewers that might lock files
```

**Windows Test Environment Issues**:

If you encounter "EPERM: operation not permitted, unlink" errors during testing:

1. **File Lock Issues**: Windows may lock files temporarily
   - Ensure no image viewers or editors are open
   - Close Windows Explorer windows showing the target directory
   - Wait a few seconds between operations

2. **Antivirus Interference**: Windows Defender or third-party antivirus may block file operations
   - Add your project directory to antivirus exclusions
   - Temporarily disable real-time protection during bulk operations

3. **Sharp Library Compatibility**: Ensure proper Sharp installation
   ```bash
   npm rebuild sharp
   # or
   npm install sharp --force
   ```

**Windows Bulk Processing Issues**:

If you encounter "EBUSY: resource busy or locked" errors during bulk directory processing:

1. **File System Limitations**: Windows file locking is fundamental to the OS architecture
   - Files remain locked by system processes, antivirus, and other applications
   - Automatic deletion operations cannot be guaranteed to work reliably
   - This is a platform limitation, not a tool limitation

2. **Recommended Workflow**:
   - Process images without deletion (`optimize-img ./images --bulk`)
   - Manually clean up original files when they are not in use
   - Use the tool primarily for optimization without automated deletion

3. **Alternative Approaches**:
   - Use Windows Subsystem for Linux (WSL) for better file system compatibility
   - Schedule cleanup operations during low-activity periods
   - Use dedicated file management tools for bulk deletion

**Windows-Specific Configuration**:

For optimal Windows performance, consider these settings:

```json
{
  "parallel": 2,
  "keepOriginals": true,
  "stripMetadata": false,
  "verbose": true
}
```

This configuration reduces parallel processing (which can minimize file contention), preserves originals (avoiding deletion operations), and enables verbose logging for debugging.

### macOS Issues

**Problem**: Sharp installation or runtime errors

**Solutions**:

```bash
# Install Xcode command line tools
xcode-select --install

# If that doesn't work, try:
sudo xcode-select --reset

# For M1/M2 Macs, ensure Rosetta is installed
softwareupdate --install-rosetta --agree-to-license

# Check for conflicting Sharp versions
npm ls sharp
```

### Linux Issues

**Problem**: Missing system dependencies

**Solutions**:

```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

# CentOS/RHEL/Fedora
sudo yum install gcc-c++ cairo-devel pango-devel libjpeg-turbo-devel giflib-devel

# Alpine Linux (Docker)
apk add --no-cache gcc g++ make libc6-compat
```

## Community Support

- **GitHub Issues**: Report bugs and request features
- **Discussions**: Ask questions and share experiences
- **Wiki**: Community-maintained documentation
- **Stack Overflow**: Tag questions with `optimize-img`
## Nested optimized folders

If you see `optimized/optimized/...` structures from previous runs:

- Use the new guard behavior: bulk mode now skips any `optimized*` directories
- Subsequent runs place outputs into `optimized1`, then `optimized2`, etc.

Example:
```bash
optimg ./images --bulk             # → ./images/optimized/
optimg ./images --bulk             # → ./images/optimized1/
optimg ./images --bulk             # → ./images/optimized2/
```

If permission or disk space errors occur, check directory write permissions and free disk space. The CLI will surface clear messages.
