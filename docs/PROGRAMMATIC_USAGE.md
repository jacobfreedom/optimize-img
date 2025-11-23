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