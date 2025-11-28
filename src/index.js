const sharp = require('sharp')
const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const cliProgress = require('cli-progress')
const glob = require('glob')
const pLimit = require('p-limit')
const { validateQuality, validateFormat } = require('./config')
// Windows file utilities disabled - using standard fs operations only

class ImageOptimizer {
  constructor(options = {}) {
    this.options = {
      format: 'webp',
      quality: 80,
      stripMetadata: false,
      keepOriginals: true,
      parallel: 4,
      verbose: false,
      width: null,
      height: null,
      resize: null,
      percent: null,
      lossless: false,
      ...options
    }

    this.stats = {
      processed: 0,
      skipped: 0,
      errors: 0,
      totalSizeBefore: 0,
      totalSizeAfter: 0,
      fileDetails: [], // Store detailed information for each processed file
      startTime: null,
      endTime: null
    }

    this.progressBar = null
    this.spinner = null
  }

  log(message, level = 'info') {
    if (this.options.verbose) {
      const timestamp = new Date().toISOString()
      const colors = {
        info: chalk.blue,
        success: chalk.green,
        warning: chalk.yellow,
        error: chalk.red
      }
      console.log(colors[level](`[${timestamp}] ${message}`))
    }
  }

  formatFileSize(bytes) {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  async run() {
    try {
      const { input } = this.options
      const inputPath = path.resolve(input)

      if (!await fs.pathExists(inputPath)) {
        throw new Error(`Input path does not exist: ${input}`)
      }

      const stats = await fs.stat(inputPath)
      this.stats.startTime = Date.now()

      if (stats.isDirectory()) {
        await this.processDirectory(inputPath)
      } else {
        await this.processFile(inputPath)
      }

      this.stats.endTime = Date.now()
      this.printSummary()
    } catch (error) {
      this.log(`Error during processing: ${error.message}`, 'error')
      throw error
    }
  }

  async processDirectory(dirPath) {
    this.log(`Processing directory: ${dirPath}`, 'info')

    const pattern = path.join(dirPath, '**/*.{jpg,jpeg,png,webp,gif,tiff,svg,heic,avif}')
    const files = await glob.glob(pattern, {
      caseSensitiveMatch: false,
      ignore: [
        path.join(dirPath, '**/optimized/**'),
        path.join(dirPath, '**/optimized*/**')
      ]
    })

    if (files.length === 0) {
      console.log(chalk.yellow('No supported image files found in directory'))
      return
    }

    console.log(chalk.blue(`Found ${files.length} image files to process`))

    // Determine a single output directory for this bulk run unless a custom output was provided
    let bulkOutputDir = null
    const hasCustomOutput = !!this.options.output
    if (!hasCustomOutput) {
      bulkOutputDir = await this.resolveOptimizedDir(dirPath)
      try {
        await fs.ensureDir(bulkOutputDir)
      } catch (dirErr) {
        if (dirErr && (dirErr.code === 'EACCES' || dirErr.code === 'EPERM')) {
          throw new Error(`Permission denied creating output directory: ${bulkOutputDir}. Try a different output path or adjust permissions.`)
        }
        if (dirErr && dirErr.code === 'ENOSPC') {
          throw new Error('Not enough disk space to create output directory')
        }
        throw dirErr
      }
    }

    this.progressBar = new cliProgress.SingleBar({
      format: 'Progress |{bar}| {percentage}% | {value}/{total} Files | ETA: {eta}s',
      barCompleteChar: '\u2588',
      barIncompleteChar: '\u2591',
      hideCursor: true
    })

    this.progressBar.start(files.length, 0)

    const limit = pLimit(parseInt(this.options.parallel, 10))

    const promises = files.map(filePath =>
      limit(async () => {
        try {
          // For bulk operations, ensure a single output directory per run
          const originalOutput = this.options.output
          if (bulkOutputDir && !hasCustomOutput) {
            this.options.output = bulkOutputDir + path.sep
          }
          await this.processFile(filePath, true)
          if (!hasCustomOutput) {
            this.options.output = originalOutput
          }
          this.progressBar.increment()
        } catch (error) {
          this.log(`Error processing ${filePath}: ${error.message}`, 'error')
          this.stats.errors++
          this.progressBar.increment()
        }
      })
    )

    await Promise.all(promises)
    this.progressBar.stop()
  }

  async processFile(inputPath, bulkMode = false) {
    this.log(`Processing file: ${inputPath}`, 'info')

    const { format, quality, stripMetadata, deleteOriginals, width, height, resize, percent, output } = this.options
    let sharpInstance = null

    try {
      // Validate inputs
      const validatedQuality = validateQuality(quality)
      const validatedFormat = validateFormat(format)

      // Generate output path
      const outputPath = await this.getOutputPath(inputPath, validatedFormat, output, bulkMode)

      // Check if output already exists
      if (await fs.pathExists(outputPath)) {
        this.log(`Output file already exists, skipping: ${outputPath}`, 'warning')
        this.stats.skipped++
        return
      }

      // Get original file size
      const originalSize = (await fs.stat(inputPath)).size
      this.stats.totalSizeBefore += originalSize

      // Store file details for reporting
      const fileDetail = {
        inputPath,
        originalSize,
        outputPath: null,
        newSize: 0,
        reduction: 0,
        processingTime: 0,
        startTime: Date.now()
      }

      // Ensure output directory exists (guard permission and ENOSPC errors)
      try {
        await fs.ensureDir(path.dirname(outputPath))
      } catch (dirErr) {
        if (dirErr && (dirErr.code === 'EACCES' || dirErr.code === 'EPERM')) {
          throw new Error(`Permission denied creating output directory: ${path.dirname(outputPath)}. Try a different output path or adjust permissions.`)
        }
        if (dirErr && dirErr.code === 'ENOSPC') {
          throw new Error('Not enough disk space to create output directory')
        }
        throw dirErr
      }

      // Process image with Windows file lock prevention
      if (process.platform === 'win32') {
        // On Windows, read file to buffer first to avoid file locks
        const fileBuffer = await fs.readFile(inputPath)
        sharpInstance = sharp(fileBuffer)
      } else {
        sharpInstance = sharp(inputPath)
      }

      // Apply resize if specified
      if (width || height) {
        // Validate width and height parameters (minimum 1 pixel, no maximum cap)
        if (width && width <= 0) {
          throw new Error(`Invalid width: ${width}. Must be at least 1`)
        }
        if (height && height <= 0) {
          throw new Error(`Invalid height: ${height}. Must be at least 1`)
        }

        const resizeOptions = {}
        if (width) resizeOptions.width = parseInt(width, 10)
        if (height) resizeOptions.height = parseInt(height, 10)
        resizeOptions.fit = 'inside'
        resizeOptions.withoutEnlargement = true

        sharpInstance = sharpInstance.resize(resizeOptions)
      } else if (resize) {
        // Handle ratio-based resizing (e.g., 0.5 or 1/2)
        let ratio
        if (resize.includes('/')) {
          const parts = resize.split('/')
          ratio = parseFloat(parts[0]) / parseFloat(parts[1])
        } else {
          ratio = parseFloat(resize)
        }

        if (ratio <= 0) {
          throw new Error(`Invalid resize ratio: ${resize}. Must be greater than 0`)
        }

        const metadata = await sharpInstance.metadata()
        const resizeOptions = {
          width: Math.round(metadata.width * ratio),
          height: Math.round(metadata.height * ratio),
          fit: 'inside',
          withoutEnlargement: true
        }

        sharpInstance = sharpInstance.resize(resizeOptions)
      } else if (percent) {
        // Handle percentage-based resizing
        const percentage = parseFloat(percent)
        if (percentage <= 0) {
          throw new Error(`Invalid percentage: ${percent}. Must be greater than 0`)
        }

        const metadata = await sharpInstance.metadata()
        const ratio = percentage / 100
        const resizeOptions = {
          width: Math.round(metadata.width * ratio),
          height: Math.round(metadata.height * ratio),
          fit: 'inside',
          withoutEnlargement: true
        }

        sharpInstance = sharpInstance.resize(resizeOptions)
      }

      // Apply format-specific options
      const formatOptions = this.getFormatOptions(validatedFormat, validatedQuality)

      // Strip metadata if requested
      if (!stripMetadata) {
        // Only preserve metadata if explicitly requested
        sharpInstance = sharpInstance.withMetadata()
      }

      // Write output using buffer approach for Windows compatibility
      const outputBuffer = await sharpInstance.toFormat(validatedFormat, formatOptions).toBuffer()

      // Write output file using standard fs operations
      try {
        await fs.writeFile(outputPath, outputBuffer)
      } catch (writeErr) {
        if (writeErr && (writeErr.code === 'EACCES' || writeErr.code === 'EPERM')) {
          throw new Error(`Permission denied writing output file: ${outputPath}`)
        }
        if (writeErr && writeErr.code === 'ENOSPC') {
          throw new Error('Not enough disk space to write output file')
        }
        throw writeErr
      }

      // Get new file size
      const newSize = (await fs.stat(outputPath)).size
      this.stats.totalSizeAfter += newSize

      // Update file details
      fileDetail.outputPath = outputPath
      fileDetail.newSize = newSize
      fileDetail.reduction = ((originalSize - newSize) / originalSize * 100)
      fileDetail.processingTime = Date.now() - fileDetail.startTime

      // Delete original if requested (with Windows limitations)
      if (deleteOriginals && inputPath !== outputPath) {
        try {
          await fs.remove(inputPath)
          this.log(`Deleted original file: ${inputPath}`, 'info')
        } catch (deleteError) {
          // Warn about Windows file system limitations
          if (process.platform === 'win32') {
            this.log('Warning: Could not delete original file on Windows due to file system constraints. File may be locked or in use.', 'warning')
          } else {
            this.log(`Warning: Could not delete original file ${inputPath}: ${deleteError.message}`, 'warning')
          }
        }
      }

      this.stats.processed++
      this.stats.fileDetails.push(fileDetail)

      const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1)
      this.log(`Processed: ${inputPath} → ${outputPath} (${savings}% reduction)`, 'success')
    } catch (error) {
      this.stats.errors++
      this.log(`Error processing ${inputPath}: ${error.message}`, 'error')
      throw error
    } finally {
      // Ensure Sharp instance is cleaned up to prevent file locks on Windows
      if (sharpInstance) {
        try {
          // Force cleanup of Sharp instance
          if (typeof sharpInstance.destroy === 'function') {
            sharpInstance.destroy()
          }
          sharpInstance = null

          // Enhanced cleanup for Windows file system
          if (process.platform === 'win32') {
            // Force garbage collection if available
            if (global.gc) {
              global.gc()
            }

            // Wait for file system to stabilize
            await new Promise(resolve => setTimeout(resolve, 100))

            // Cleanup any lingering file handles
            try {
              if (inputPath && await fs.pathExists(inputPath)) {
                // Basic cleanup - Windows-specific force cleanup disabled
                await new Promise(resolve => setTimeout(resolve, 100))
              }
            } catch (cleanupError) {
              // Ignore cleanup errors for input path
            }
          }
        } catch (cleanupError) {
          this.log(`Warning: Error cleaning up Sharp instance: ${cleanupError.message}`, 'warning')
        }
      }
    }
  }

  async getOutputPath(inputPath, format, customOutput, bulk = false) {
    if (customOutput) {
      // If custom output is a directory, preserve filename
      if (customOutput.endsWith('/') || customOutput.endsWith('\\')) {
        const basename = path.basename(inputPath, path.extname(inputPath))
        return path.join(customOutput, `${basename}.${format}`)
      }
      return customOutput
    }

    const inputDir = path.dirname(inputPath)
    const inputName = path.basename(inputPath, path.extname(inputPath))

    // For bulk operations, create an optimized folder with guard naming
    if (bulk) {
      const optimizedDir = await this.resolveOptimizedDir(inputDir)
      await fs.ensureDir(optimizedDir)
      return path.join(optimizedDir, `${inputName}.${format}`)
    }

    // For single files: add suffix by default, replace in-place only when delete-originals is specified
    if (this.options.deleteOriginals) {
      return path.join(inputDir, `${inputName}.${format}`)
    }

    // Add suffix to preserve original
    return path.join(inputDir, `${inputName}-optimized.${format}`)
  }

  async resolveOptimizedDir(baseDir) {
    // If we are already inside an optimized* directory, place outputs in the next sibling under the parent
    const baseName = path.basename(baseDir)
    let targetRoot = baseDir
    let parentDir = path.dirname(baseDir)
    if (/^optimized\d*$/.test(baseName)) {
      targetRoot = parentDir
      parentDir = path.dirname(parentDir)
    }

    // Determine next available optimized directory name
    const names = ['optimized']
    for (let i = 1; i <= 100; i++) names.push(`optimized${i}`)

    for (const name of names) {
      const candidate = path.join(targetRoot, name)
      // If "optimized" already exists, continue until we find the first non-existing candidate
      if (!await fs.pathExists(candidate)) {
        return candidate
      }
    }
    // Fallback: last candidate
    return path.join(targetRoot, 'optimized100')
  }

  getFormatOptions(format, quality) {
    switch (format.toLowerCase()) {
      case 'webp':
        return { quality, effort: 6, lossless: !!this.options.lossless }
      case 'jpeg':
      case 'jpg':
        return { quality, mozjpeg: true }
      case 'png':
        return { quality, compressionLevel: 9, adaptiveFiltering: false }
      case 'avif':
        return { quality, effort: 5, lossless: !!this.options.lossless }
      default:
        return { quality }
    }
  }

  printSummary() {
    console.log('\n' + chalk.green('=== Processing Complete ==='))
    console.log(chalk.blue(`Files processed: ${this.stats.processed}`))
    console.log(chalk.yellow(`Files skipped: ${this.stats.skipped}`))

    if (this.stats.errors > 0) {
      console.log(chalk.red(`Errors: ${this.stats.errors}`))
    }

    if (this.stats.processed > 0 && this.stats.totalSizeBefore > 0) {
      const totalTime = this.stats.endTime - this.stats.startTime

      // Detailed file-by-file report
      console.log('\n' + chalk.cyan('=== Detailed File Report ==='))

      this.stats.fileDetails.forEach((file, index) => {
        const originalSize = this.formatFileSize(file.originalSize)
        const newSize = this.formatFileSize(file.newSize)
        const reduction = file.reduction.toFixed(1)
        const saved = this.formatFileSize(file.originalSize - file.newSize)
        const processingTime = file.processingTime > 1000
          ? `${(file.processingTime / 1000).toFixed(2)}s`
          : `${file.processingTime}ms`

        console.log(chalk.white(`${index + 1}. ${path.basename(file.inputPath)}`))
        console.log(chalk.gray(`   Path: ${file.inputPath}`))
        console.log(chalk.gray(`   Original: ${originalSize} → Optimized: ${newSize}`))
        console.log(chalk.green(`   Reduction: ${reduction}% (Saved: ${saved})`))
        console.log(chalk.blue(`   Processing time: ${processingTime}`))
        console.log('')
      })

      // Comprehensive metrics calculation
      const totalSavings = ((this.stats.totalSizeBefore - this.stats.totalSizeAfter) / this.stats.totalSizeBefore * 100).toFixed(1)
      const sizeBeforeMB = (this.stats.totalSizeBefore / 1024 / 1024).toFixed(2)
      const sizeAfterMB = (this.stats.totalSizeAfter / 1024 / 1024).toFixed(2)
      const totalSavedBytes = this.stats.totalSizeBefore - this.stats.totalSizeAfter
      const totalSavedFormatted = this.formatFileSize(totalSavedBytes)

      // Average calculations
      const avgOriginalSize = this.stats.totalSizeBefore / this.stats.processed
      const avgOptimizedSize = this.stats.totalSizeAfter / this.stats.processed
      const avgReduction = this.stats.fileDetails.reduce((sum, file) => sum + file.reduction, 0) / this.stats.fileDetails.length
      const avgProcessingTime = this.stats.fileDetails.reduce((sum, file) => sum + file.processingTime, 0) / this.stats.fileDetails.length

      // Performance metrics
      const filesPerSecond = this.stats.processed / (totalTime / 1000)
      const totalProcessingTime = this.stats.fileDetails.reduce((sum, file) => sum + file.processingTime, 0)
      const efficiency = (totalProcessingTime / totalTime * 100).toFixed(1)

      console.log('\n' + chalk.cyan('=== Comprehensive Metrics ==='))
      console.log(chalk.blue('File Statistics:'))
      console.log(chalk.white(`   - Average original file size: ${this.formatFileSize(avgOriginalSize)}`))
      console.log(chalk.white(`   - Average optimized file size: ${this.formatFileSize(avgOptimizedSize)}`))
      console.log(chalk.white(`   - Average size reduction: ${avgReduction.toFixed(1)}%`))
      console.log(chalk.white(`   - Total storage saved: ${totalSavedFormatted}`))
      console.log(chalk.white(`   - Overall size reduction: ${totalSavings}% (${sizeBeforeMB}MB → ${sizeAfterMB}MB)`))

      console.log(chalk.blue('\nPerformance Metrics:'))
      console.log(chalk.white(`   - Total processing time: ${(totalTime / 1000).toFixed(2)}s`))
      console.log(chalk.white(`   - Average time per file: ${avgProcessingTime.toFixed(0)}ms`))
      console.log(chalk.white(`   - Processing speed: ${filesPerSecond.toFixed(1)} files/second`))
      console.log(chalk.white(`   - Processing efficiency: ${efficiency}%`))

      console.log(chalk.blue('\nOptimization Summary:'))
      console.log(chalk.green(`   - Files processed: ${this.stats.processed}`))
      console.log(chalk.yellow(`   - Files skipped: ${this.stats.skipped}`))
      if (this.stats.errors > 0) {
        console.log(chalk.red(`   - Errors encountered: ${this.stats.errors}`))
      }
    }
  }
}

module.exports = ImageOptimizer
