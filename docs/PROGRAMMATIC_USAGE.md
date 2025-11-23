## 🔧 Programmatic Usage

```js
const ImageOptimizer = require('optimize-img');

const optimizer = new ImageOptimizer({
  format: 'webp',
  quality: 85,
  stripMetadata: true,
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
  stripMetadata: false, // keep EXIF/ICC
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