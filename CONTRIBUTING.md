# Contributing to optimg

Thank you for your interest in contributing to optimg! This document provides guidelines and information for contributors.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct:

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on constructive criticism
- Respect differing viewpoints and experiences

## How to Contribute

### Reporting Issues

Before creating an issue, please:

1. Check existing issues to avoid duplicates
2. Use the issue templates when available
3. Provide detailed information:
   - Node.js version
   - Operating system
   - Complete error messages
   - Steps to reproduce
   - Expected vs actual behavior

### Suggesting Features

We welcome feature suggestions! Please:

1. Check if the feature has already been suggested
2. Explain the use case and benefits
3. Provide examples of how it would work
4. Consider implementation complexity

### Pull Requests

#### Before You Start

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make sure your code follows our style guidelines
4. Write or update tests for your changes
5. Update documentation if needed

#### Code Style

We use ESLint with Standard configuration:

```bash
npm run lint        # Check for style issues
npm run lint:fix    # Auto-fix style issues
```

#### Testing

All contributions must include tests:

```bash
npm test            # Run all tests
npm run test:coverage  # Run tests with coverage report
```

#### Commit Messages

Use clear, descriptive commit messages:

```
feat: add AVIF format support
fix: handle corrupted JPEG files gracefully
docs: update installation instructions
test: add unit tests for config validation
```

#### Pull Request Process

1. Update the README.md with details of changes if applicable
2. Ensure all tests pass and coverage remains high
3. Update the CHANGELOG.md with your changes
4. Request review from maintainers
5. Address review feedback promptly

## Development Setup

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn

### Local Development

```bash
# Clone your fork
git clone https://github.com/yourusername/optimg-cli.git
cd optimg-cli

# Install dependencies
npm install

# Run tests
npm test

# Run linting
npm run lint

# Test CLI locally
npm link
optimg --help
```

### Project Structure

```
optimg-cli/
├── src/                    # Core library code
│   ├── index.js           # Main ImageOptimizer class
│   └── config.js          # Configuration and presets
├── bin/                   # CLI entry point
│   └── cli.js            # Command-line interface
├── test/                  # Test files
├── docs/                  # Documentation
└── examples/              # Usage examples
```

## Areas for Contribution

### High Priority

- **Performance optimizations**: Faster processing, better memory usage
- **Format support**: Additional input/output formats
- **Error handling**: Better error messages and recovery
- **Testing**: Increase test coverage, add integration tests

### Medium Priority

- **Documentation**: More examples, tutorials, API docs
- **Configuration**: More preset options, custom profiles
- **CLI improvements**: Better progress indicators, interactive mode
- **Integration**: CI/CD templates, Docker support

### Low Priority

- **GUI**: Desktop application wrapper
- **Web interface**: Browser-based tool
- **Plugins**: Extensible architecture for custom processors

## Questions?

Feel free to:

- Open an issue for questions
- Join discussions in existing issues
- Contact maintainers directly

## Recognition

Contributors will be recognized in:

- The project README
- Release notes
- GitHub contributors page

Thank you for helping make optimg better!
