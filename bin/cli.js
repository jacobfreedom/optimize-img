#!/usr/bin/env node

const { Command } = require('commander')
const chalk = require('chalk')
const { version } = require('../package.json')
const ImageOptimizer = require('../src/index')
const { loadConfig } = require('../src/config')

const program = new Command()

program
  .name('optimg')
  .description('A comprehensive, high-performance image optimization tool')
  .version(version, '-v, --version', 'output the current version')

program
  .argument('[input]', 'Input file or directory path')
  .option('-o, --output <path>', 'Output file or directory path')
  .option('-f, --format <format>', 'Output format (webp, jpeg, png, avif)')
  .option('-q, --quality <number>', 'Quality setting (0-100)', '80')
  .option('-w, --width <number>', 'Resize width (maintains aspect ratio)')
  .option('-h, --height <number>', 'Resize height (maintains aspect ratio)')
  .option('-r, --resize <value>', 'Resize by ratio (e.g., 0.5 for 50%, 1/2 for half size)')
  .option('-p, --percent <number>', 'Resize by percentage (e.g., 50 for 50%)')
  .option('--preset <preset>', 'Optimization preset (default, balanced, quality, performant)', 'default')
  .option('--keep-metadata', 'Preserve EXIF/ICC metadata (default: metadata is stripped)')
  .option('--delete-originals', 'Delete original files after optimization (use with caution)')
  .option('--bulk', 'Process entire directory (creates optimized folder)')
  .option('--bulk-inplace', 'Process entire directory in-place (outputs next to originals)')
  .option('--parallel <number>', 'Number of parallel processes', '4')
  .option('--verbose', 'Enable verbose logging')
  .option('--config <path>', 'Path to configuration file')
  .option('--yes', 'Skip confirmation prompts (use with caution)')
  .option('--lossless', 'Use lossless compression when supported')
  .option('--loseless', 'Alias for --lossless')
  .action(async (input, options) => {
    try {
      if (!input) {
        console.error(chalk.red('Error: Input file or directory is required'))
        program.help()
        process.exit(1)
      }

      // Show warnings and confirmations for deletion
      if (options.deleteOriginals && !options.yes) {
        console.log(chalk.yellow('⚠️  WARNING: Original images will be deleted after optimization!'))
        console.log(chalk.yellow('   This action cannot be undone.'))
        console.log(chalk.yellow('   Use --yes to skip this confirmation'))

        const readline = require('readline')
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout
        })

        const answer = await new Promise(resolve => {
          rl.question(chalk.blue('Do you want to delete original files? (y/N): '), resolve)
        })
        rl.close()

        if (answer.toLowerCase() !== 'y' && answer.toLowerCase() !== 'yes') {
          console.log(chalk.red('Operation cancelled.'))
          process.exit(0)
        }
      }

      // Validate resize options
      const resizeOptions = []
      if (options.resize) resizeOptions.push('--resize')
      if (options.percent) resizeOptions.push('--percent')

      // Width and height are complementary, so count them as one option together
      const hasWidthHeight = options.width || options.height
      if (hasWidthHeight && resizeOptions.length > 0) {
        console.error(chalk.red('Error: Cannot combine width/height with resize/percent options'))
        console.error(chalk.red(`You provided: --width/height and ${resizeOptions.join(', ')}`))
        process.exit(1)
      }

      if (resizeOptions.length > 1) {
        console.error(chalk.red('Error: Only one resize option can be used at a time'))
        console.error(chalk.red(`You provided: ${resizeOptions.join(', ')}`))
        process.exit(1)
      }

      const config = await loadConfig(options.config)

      // Get the raw args to detect which options were explicitly provided
      const rawArgs = process.argv.slice(2) // Remove node and script name

      // Check which options were explicitly provided vs defaults
      const explicitOptions = {
        format: rawArgs.some(arg => arg === '-f' || arg === '--format'),
        quality: rawArgs.some(arg => arg === '-q' || arg === '--quality'),
        width: rawArgs.some(arg => arg === '-w' || arg === '--width'),
        height: rawArgs.some(arg => arg === '-h' || arg === '--height'),
        resize: rawArgs.some(arg => arg === '-r' || arg === '--resize'),
        percent: rawArgs.some(arg => arg === '-p' || arg === '--percent'),
        output: rawArgs.some(arg => arg === '-o' || arg === '--output'),
        preset: rawArgs.some(arg => arg === '--preset'),
        keepMetadata: rawArgs.some(arg => arg === '--keep-metadata'),
        deleteOriginals: rawArgs.some(arg => arg === '--delete-originals'),
        bulk: rawArgs.some(arg => arg === '--bulk'),
        bulkInplace: rawArgs.some(arg => arg === '--bulk-inplace'),
        parallel: rawArgs.some(arg => arg === '--parallel'),
        verbose: rawArgs.some(arg => arg === '--verbose'),
        lossless: rawArgs.some(arg => arg === '--lossless' || arg === '--loseless')
      }

      // Merge config with CLI options, prioritizing explicitly provided CLI options
      const finalOptions = {
        ...config,
        input,
        verbose: explicitOptions.verbose ? options.verbose : (config.verbose || options.verbose)
      }

      // Only override config values if explicitly provided in CLI
      if (explicitOptions.format) finalOptions.format = options.format
      if (explicitOptions.quality) finalOptions.quality = parseInt(options.quality)
      if (explicitOptions.width) finalOptions.width = parseInt(options.width)
      if (explicitOptions.height) finalOptions.height = parseInt(options.height)
      if (explicitOptions.resize) finalOptions.resize = options.resize
      if (explicitOptions.percent) finalOptions.percent = options.percent
      if (explicitOptions.output) finalOptions.output = options.output
      if (explicitOptions.preset) finalOptions.preset = options.preset
      if (explicitOptions.keepMetadata) finalOptions.stripMetadata = false
      if (explicitOptions.deleteOriginals) finalOptions.deleteOriginals = true
      if (explicitOptions.bulk) finalOptions.bulk = true
      if (explicitOptions.parallel) finalOptions.parallel = parseInt(options.parallel)
      if (explicitOptions.lossless) finalOptions.lossless = true
      if (explicitOptions.bulkInplace) finalOptions.bulkInplace = true

      const optimizer = new ImageOptimizer(finalOptions)

      await optimizer.run()
    } catch (error) {
      console.error(chalk.red('Error:'), error.message)
      if (options.verbose) {
        console.error(error.stack)
      }
      process.exit(1)
    }
  })

program
  .command('preset')
  .description('Show available presets')
  .action(() => {
    console.log(chalk.blue('Available presets:'))
    console.log('  default   - WebP 80% quality, balanced optimization')
    console.log('  balanced  - WebP 75% quality, good balance')
    console.log('  quality   - WebP 90% quality, minimal compression')
    console.log('  performant - WebP 60% quality, maximum compression for performance')
  })

program
  .command('formats')
  .description('Show supported formats')
  .action(() => {
    console.log(chalk.blue('Supported input formats:'))
    console.log('  JPEG, PNG, WebP, GIF, TIFF, SVG, HEIC, AVIF')
    console.log(chalk.blue('Supported output formats:'))
    console.log('  WebP, JPEG, PNG, AVIF')
  })

if (process.argv.length === 2) {
  program.help()
}

program.parse()
