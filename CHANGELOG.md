# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- Docs cleanup: Removed in-file test results from `docs/EXAMPLES.md`; kept essential examples.
- Docs transition: Added `docs/TEST_RESULTS.md` as primary showcase and linked from `README.md` and `docs/EXAMPLES.md`.
- Verification: Confirmed presets (`default`, `balanced`, `quality`, `performant`) run with lossless WebP/AVIF by default.

### Added
- New `docs/TEST_RESULTS.md` summarizing recent CLI runs and metrics.

## 1.1.0 - 2025-11-28

### Added
- Guard behavior for bulk runs:
  - Skip processing files under `optimized*` directories
  - Automatic output folder naming: `optimized` → `optimized1` → `optimized2`
  - Improved error messages for permission (`EACCES`, `EPERM`) and disk space (`ENOSPC`)

### Changed
- CLI program name set to `optimg`; removed `optimize-img` alias
- Documentation updated to reflect guard behavior and `npx optimg` usage

## 1.2.1 - 2025-11-28

### Changed
- Documentation: Cleaned `docs/EXAMPLES.md` by removing embedded test results and temporary data; updated references to use `docs/TEST_RESULTS.md`.

### Added
- Test Results: Introduced `docs/TEST_RESULTS.md` with comprehensive results across presets and formats.

### Verification
- Presets & Lossless: Verified that presets merge with default config (`lossless: true`) and that WebP/AVIF encoders receive `lossless` flags (`src/index.js:442–451`).

## 1.2.2 - 2025-11-28

### Changed
- Documentation: Linkified README “Further Docs” bullets to clickable links pointing to `./docs/*` files.
- Documentation: Aligned docs formatting and examples to global `optimg` usage for consistency.
