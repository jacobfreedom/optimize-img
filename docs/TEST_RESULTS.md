# Test Results

This document summarizes recent CLI runs against `test-imgs/` using different presets, formats, and bulk modes.

## Dataset

- Source: `./test-imgs/test1` and `./test-imgs/test2` (PNG images)
- Platform: macOS
- Node: >= 18

## Runs

### 1) Bulk on `test1` with `--preset balanced`

- Command: `node bin/cli.js ./test-imgs/test1 --bulk --preset balanced --yes`
- Files processed: 7
- Overall reduction: 39.2% (21.96MB → 13.35MB)
- Average size reduction: 39.4%
- Total saved: 8.61MB
- Avg time/file: 1440ms

### 2) Bulk on `test1` with `--preset performant`

- Command: `node bin/cli.js ./test-imgs/test1 --bulk --preset performant --yes`
- Files processed: 7
- Overall reduction: 39.2% (21.96MB → 13.35MB)
- Average size reduction: 39.4%
- Total saved: 8.61MB
- Avg time/file: 1459ms

Note: For this dataset, `balanced` and `performant` produced identical aggregate reductions.

### 2b) Bulk on `test1` with `--preset default` and `--preset quality`

- Commands:
  - `node bin/cli.js ./test-imgs/test1 --bulk --preset default --yes`
  - `node bin/cli.js ./test-imgs/test1 --bulk --preset quality --yes`
- Files processed: 7 (each run)
- Overall reduction: 39.2% (21.96MB → 13.35MB)
- Average size reduction: 39.4%
- Total saved: 8.61MB
- Observation: Identical results across `default`, `balanced`, `quality`, and `performant` due to lossless WebP encoding.

### 3) Bulk on `test1` with `--format avif --quality 80`

- Command: `node bin/cli.js ./test-imgs/test1 --bulk --format avif --quality 80 --yes`
- Files processed: 7
- Overall reduction: 2.2% (21.96MB → 21.49MB)
- Average size reduction: 0.2%
- Total saved: 487.32KB
- Avg time/file: 5109ms
- Observations:
  - Some PNGs grew when converted to AVIF (e.g., `geustral_init-5.rop_image1.0034.png` and `Screenshot 2025-11-25 at 17.52.33.png`).
  - AVIF may underperform on certain screenshot-style or synthetic textures at quality 80.

### 4) Bulk-Inplace on `test2` with `--preset balanced`

- Command: `node bin/cli.js ./test-imgs/test2 --bulk-inplace --preset balanced --yes`
- Files processed: 21
- Overall reduction: 39.2% (65.88MB → 40.05MB)
- Average size reduction: 39.4%
- Total saved: 25.84MB
- Avg time/file: 1560ms
- Behavior: Outputs optimized files next to originals (preserves directory structure).

## Key Takeaways

- WebP (`balanced` and `performant`) delivered consistent ~39% reductions on this dataset.
- All presets currently run with `lossless: true` for WebP/AVIF; quality values have limited impact under lossless.
- AVIF at quality 80 had mixed results and increased sizes for some files; use selectively and validate on your own assets.
- `--bulk-inplace` is useful when you want optimized files adjacent to sources without creating new folders.

## Reproduce Locally

Run with `npx`:

```bash
npx optimg ./test-imgs/test1 --bulk --preset balanced --yes
npx optimg ./test-imgs/test1 --bulk --preset performant --yes
npx optimg ./test-imgs/test1 --bulk --format avif --quality 80 --yes
npx optimg ./test-imgs/test2 --bulk-inplace --preset balanced --yes
```
