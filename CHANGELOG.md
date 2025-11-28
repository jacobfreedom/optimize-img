# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial release of optimize-img
- Comprehensive image optimization tool with WebP/JPEG/PNG/AVIF support
- Single-file and bulk processing modes
- Configurable presets (default, balanced, quality, performant)
- CLI interface with comprehensive options
- Configuration file support (.imgoptimizerc)
- Progress indicators and detailed statistics
- Parallel processing for bulk operations
- Comprehensive test suite with Jest
- Full documentation with examples
- CI/CD workflows for testing and deployment

### Features
- **Core Functionality**:
  - Single-file processing: `optimize-img input.jpg`
  - Bulk processing: `optimize-img ./images --bulk`
  - Multiple output formats (WebP, JPEG, PNG, AVIF)
  - Quality control (0-100%)
  - Resize with aspect ratio preservation
  - Metadata stripping option
  - Original file preservation option

- **CLI Interface**:
  - Intuitive command-line interface
  - Help system (`--help`)
  - Version information (`--version`)
  - Verbose mode for debugging
  - Custom output paths
  - Parallel processing control

- **Configuration System**:
  - Preset optimization profiles
  - JSON and JavaScript config files
  - Environment-specific settings
  - Override options via CLI

- **Performance**:
  - Built on Sharp for high performance
  - Parallel processing support
  - Memory-efficient streaming
  - Progress tracking with ETA

- **Developer Experience**:
  - Comprehensive API documentation
  - TypeScript definitions
  - Extensive test coverage
  - Clear error messages
  - Debugging tools

### Technical Implementation
- Node.js >= 18.0.0 support
- Sharp integration for image processing
- Commander.js for CLI parsing
- Progress bars with cli-progress
- Configuration with cosmiconfig
- Parallel processing with p-limit
- Comprehensive error handling
- Cross-platform compatibility

### Documentation
- Complete README with installation and usage
- API documentation for programmatic usage
- Troubleshooting guide with common issues
- Examples for various use cases
- Contributing guidelines
- MIT license

### Testing
- Unit tests for core functionality
- Integration tests for CLI
- Configuration validation tests
- Error handling tests
- Multi-platform CI testing
- Coverage reporting

### Deployment
- Automated npm publishing
- GitHub releases
- Multi-platform testing
- Security scanning with CodeQL
- Dependency vulnerability checks
## 1.1.0 - 2025-11-28

### Added
- Guard behavior for bulk runs:
  - Skip processing files under `optimized*` directories
  - Automatic output folder naming: `optimized` → `optimized1` → `optimized2`
  - Improved error messages for permission (`EACCES`, `EPERM`) and disk space (`ENOSPC`)

### Changed
- CLI program name set to `optimg` (kept `optimize-img` alias)
- Documentation updated to reflect guard behavior and `optimg` command usage
