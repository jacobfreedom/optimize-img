# API Documentation

## Table of Contents

- [ImageOptimizer Class](#imageoptimizer-class)
- [Configuration](#configuration)
- [Presets](#presets)
- [Error Handling](#error-handling)
- [Events](#events)

## ImageOptimizer Class

The main class for image optimization operations.

### Constructor

```javascript
const ImageOptimizer = require('optimg-cli');

const optimizer = new ImageOptimizer(options);
```

#### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `format` | string | 'webp' | Output format (webp, jpeg, png, avif) |
| `quality` | number | 80 | Quality setting (0-100) |
| `stripMetadata` | boolean | false | Strip image metadata (preserved by default) |
| `keepOriginals` | boolean | false | Keep original files after processing |
| `width` | number \| null | null | Resize width (maintains aspect ratio) |
| `height` | number \| null | null | Resize height (maintains aspect ratio) |
| `parallel` | number | 4 | Number of parallel processes |
| `verbose` | boolean | false | Enable verbose logging |
| `preset` | string | 'default' | Optimization preset |

### Methods

#### `run(input)`

Process a single file or directory.

```javascript
try {
  await optimizer.run('./image.jpg');
  console.log('Optimization complete');
} catch (error) {
  console.error('Optimization failed:', error.message);
}
```

**Parameters:**
- `input` (string): Path to file or directory

**Returns:** Promise<void>

**Throws:**
- `Error` if input path doesn't exist
- `Error` if image processing fails
- `Error` if output cannot be written

#### `processFile(filePath)`

Process a single image file.

```javascript
try {
  await optimizer.processFile('./photo.jpg');
} catch (error) {
  console.error('File processing failed:', error.message);
}
```

**Parameters:**
- `filePath` (string): Path to image file

**Returns:** Promise<void>

#### `processDirectory(dirPath)`

Process all images in a directory.

```javascript
try {
  await optimizer.processDirectory('./images');
} catch (error) {
  console.error('Directory processing failed:', error.message);
}
```

**Parameters:**
- `dirPath` (string): Path to directory

**Returns:** Promise<void>

### Properties

#### `stats`

Processing statistics object.

```javascript
console.log(optimizer.stats);
// {
//   processed: 10,
//   skipped: 2,
//   errors: 0,
//   totalSizeBefore: 5242880,
//   totalSizeAfter: 2097152
// }
```

**Properties:**
- `processed` (number): Number of successfully processed files
- `skipped` (number): Number of skipped files
- `errors` (number): Number of files with errors
- `totalSizeBefore` (number): Total size of input files in bytes
- `totalSizeAfter` (number): Total size of output files in bytes

#### `options`

Current configuration options.

```javascript
console.log(optimizer.options);
// {
//   format: 'webp',
//   quality: 80,
//   stripMetadata: false, // metadata preserved by default
//   ...
// }
```

## Configuration

### Loading Configuration

```javascript
const { loadConfig } = require('optimg-cli/src/config');

// Load from default locations
const config = await loadConfig();

// Load from specific file
const config = await loadConfig('./my-config.json');
```

### Configuration File Formats

#### JSON (.imgoptimizerc)

```json
{
  "format": "webp",
  "quality": 85,
  "stripMetadata": false, // metadata preserved by default
  "keepOriginals": false,
  "parallel": 8,
  "preset": "balanced"
}
```

#### JavaScript (imgoptimize.config.js)

```javascript
module.exports = {
  format: 'webp',
  quality: 85,
  stripMetadata: false, // metadata preserved by default
  keepOriginals: false,
  parallel: 8,
  preset: 'balanced',
  width: null,
  height: null
};
```

## Presets

### Available Presets

```javascript
const { getPreset, listPresets } = require('optimg-cli/src/config');

// Get specific preset
const preset = getPreset('quality');
console.log(preset);
// {
//   format: 'webp',
//   quality: 90,
//   stripMetadata: false,
//   keepOriginals: true
// }

// List all presets
const presets = listPresets();
console.log(presets);
// ['default', 'balanced', 'quality', 'size']
```

### Custom Presets

```javascript
const { PRESETS } = require('optimg-cli/src/config');

// Add custom preset
PRESETS.custom = {
  format: 'avif',
  quality: 70,
  stripMetadata: false, // metadata preserved by default
  keepOriginals: false
};
```

## Error Handling

### Common Errors

```javascript
try {
  await optimizer.run('./nonexistent.jpg');
} catch (error) {
  if (error.message.includes('does not exist')) {
    console.error('Input file not found');
  } else if (error.message.includes('Unsupported format')) {
    console.error('File format not supported');
  } else {
    console.error('Unknown error:', error.message);
  }
}
```

### Validation Functions

```javascript
const { validateQuality, validateFormat } = require('optimg-cli/src/config');

try {
  const quality = validateQuality(85); // Returns 85
  const format = validateFormat('webp'); // Returns 'webp'
} catch (error) {
  console.error('Validation failed:', error.message);
}
```

## Events

### Processing Events

```javascript
const optimizer = new ImageOptimizer({ verbose: true });

// Log processing events
optimizer.log('Starting optimization', 'info');
optimizer.log('File processed successfully', 'success');
optimizer.log('Warning: Large file size', 'warning');
optimizer.log('Error: Unsupported format', 'error');
```

### Progress Tracking

```javascript
const optimizer = new ImageOptimizer({ verbose: true });

// Monitor progress
optimizer.run('./images').then(() => {
  console.log('Completed:', optimizer.stats);
});
```

## Advanced Usage

### Custom Processing Pipeline

```javascript
const ImageOptimizer = require('optimg-cli');

class CustomOptimizer extends ImageOptimizer {
  async processFile(inputPath) {
    // Custom preprocessing
    console.log(`Processing: ${inputPath}`);
    
    // Call parent method
    await super.processFile(inputPath);
    
    // Custom postprocessing
    console.log(`Completed: ${inputPath}`);
  }
}
```

### Batch Processing with Progress

```javascript
const optimizer = new ImageOptimizer({
  format: 'webp',
  quality: 80,
  verbose: true
});

const files = ['./img1.jpg', './img2.png', './img3.tiff'];

for (const file of files) {
  try {
    await optimizer.processFile(file);
    console.log(`Progress: ${optimizer.stats.processed}/${files.length}`);
  } catch (error) {
    console.error(`Failed: ${file} - ${error.message}`);
  }
}

console.log('Final stats:', optimizer.stats);
```

## TypeScript Support

```typescript
import ImageOptimizer from 'optimg-cli';
import { ImageOptimizerOptions, ProcessingStats } from 'optimg-cli';

const options: ImageOptimizerOptions = {
  format: 'webp',
  quality: 85,
  stripMetadata: false // metadata preserved by default
};

const optimizer = new ImageOptimizer(options);
const stats: ProcessingStats = optimizer.stats;

## ⚠️ Platform-Specific Considerations

### Windows File System Limitations

When using the optimg API on **Windows systems**, be aware of the following limitations:

```javascript
// Windows-specific configuration
const windowsOptimizer = new ImageOptimizer({
  // File deletion is not supported on Windows
  keepOriginals: true, // Required for Windows compatibility
  
  // Metadata is preserved by default
  stripMetadata: false,
  
  // Reduce parallel processing on Windows to minimize file contention
  parallel: process.platform === 'win32' ? 2 : 8,
  
  // Enable verbose logging for debugging Windows-specific issues
  verbose: true
});
```

**Key Windows Limitations:**
- **File deletion operations (`keepOriginals: false`) are NOT SUPPORTED** on Windows
- Files remain locked by the operating system and cannot be reliably deleted
- This is a fundamental Windows file system limitation, not a tool limitation

**Recommended Windows Configuration:**
```javascript
{
  keepOriginals: true,    // Required - file deletion not supported
  stripMetadata: false,   // Default - metadata preserved
  parallel: 2,           // Reduced parallel processing
  verbose: true          // Enhanced logging for debugging
}
```
```
