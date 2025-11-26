## 🔧 Programmatic Usage

```js
const ImageOptimizer = require('optimize-img');

const optimizer = new ImageOptimizer({
  format: 'webp',
  quality: 85,
  stripMetadata: false, // metadata preserved by default
  keepOriginals: false,
  width: 1200,
  height: 800,
  verbose: true
});

await optimizer.run('./input.jpg');   // single file
await optimizer.run('./images');      // directory

console.log(`Processed: ${optimizer.stats.processed} files`);
console.log(`Total before: ${optimizer.stats.totalSizeBefore} bytes`);
console.log(`Total after:  ${optimizer.stats.totalSizeAfter} bytes`);
```

**Photography / archival example:**

```js
const photoOptimizer = new ImageOptimizer({
  format: 'jpeg',
  quality: 95,
  // stripMetadata: false (default) - metadata preserved automatically
  keepOriginals: true,
  verbose: true
});

await photoOptimizer.run('./client-photos');
```

---

## ⚙️ Configuration

### `.optimize-imgrc`

```json
{
  "format": "webp",
  "quality": 85,
  "stripMetadata": false, // metadata preserved by default
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
  stripMetadata: false, // metadata preserved by default
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
> CLI uses **kebab-case** (`--strip-metadata`).
> CLI flags override config.
> If both files exist, `optimize-img.config.js` wins.

## ⚠️ Platform-Specific Considerations

### Windows File System Limitations

When using optimize-img programmatically on **Windows systems**, be aware of the following limitations:

```js
// Windows-specific considerations
const optimizer = new ImageOptimizer({
  // File deletion is not supported on Windows
  keepOriginals: true, // Required for Windows compatibility
  
  // Metadata is preserved by default (stripMetadata: false)
  stripMetadata: false,
  
  // Reduce parallel processing on Windows to minimize file contention
  parallel: process.platform === 'win32' ? 2 : 8
});
```

**Key Windows Limitations:**
- **File deletion operations (`keepOriginals: false`) are NOT SUPPORTED** on Windows
- Files remain locked by the operating system and cannot be reliably deleted
- This is a fundamental Windows file system limitation, not a tool limitation

**Recommended Windows Configuration:**
```json
{
  "keepOriginals": true,
  "stripMetadata": false,
  "parallel": 2,
  "verbose": true
}
```