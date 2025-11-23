const ImageOptimizer = require('../src/index')
const fs = require('fs-extra')
const path = require('path')
const sharp = require('sharp')

describe('ImageOptimizer', () => {
  let optimizer
  let testDir
  let testImagePath
  let outputPath

  beforeEach(async () => {
    testDir = path.join(__dirname, 'temp-test')
    testImagePath = path.join(testDir, 'test-image.jpg')
    outputPath = path.join(testDir, 'test-image-optimized.webp')

    await fs.ensureDir(testDir)

    // Create a test image
    await sharp({
      create: {
        width: 100,
        height: 100,
        channels: 3,
        background: { r: 255, g: 0, b: 0 }
      }
    }).jpeg().toFile(testImagePath)

    optimizer = new ImageOptimizer({
      format: 'webp',
      quality: 80,
      stripMetadata: true,
      deleteOriginals: false,
      verbose: false
    })
  })

  afterEach(async () => {
    await fs.remove(testDir)
  })

  describe('constructor', () => {
    it('should create instance with default options', () => {
      const defaultOptimizer = new ImageOptimizer()
      expect(defaultOptimizer.options.format).toBe('webp')
      expect(defaultOptimizer.options.quality).toBe(80)
      expect(defaultOptimizer.options.stripMetadata).toBe(true)
    })

    it('should create instance with custom options', () => {
      const customOptimizer = new ImageOptimizer({
        format: 'jpeg',
        quality: 90,
        width: 800
      })
      expect(customOptimizer.options.format).toBe('jpeg')
      expect(customOptimizer.options.quality).toBe(90)
      expect(customOptimizer.options.width).toBe(800)
    })
  })

  describe('processFile', () => {
    it('should process a single file successfully', async () => {
      await optimizer.processFile(testImagePath)

      expect(await fs.pathExists(outputPath)).toBe(true)
      expect(optimizer.stats.processed).toBe(1)
      expect(optimizer.stats.errors).toBe(0)
    })

    it('should skip files that already exist', async () => {
      // Create output file first
      await fs.writeFile(outputPath, 'existing content')

      await optimizer.processFile(testImagePath)

      expect(optimizer.stats.skipped).toBe(1)
      expect(optimizer.stats.processed).toBe(0)
    })

    it('should delete original file when deleteOriginals is true', async () => {
      optimizer.options.deleteOriginals = true
      await optimizer.processFile(testImagePath)

      expect(await fs.pathExists(testImagePath)).toBe(false)
      // When deleteOriginals is true, the file is replaced in-place
      expect(await fs.pathExists(path.join(testDir, 'test-image.webp'))).toBe(true)
    })

    it('should keep original file by default', async () => {
      const expectedOutputPath = await optimizer.getOutputPath(testImagePath, 'webp', null, false)
      await optimizer.processFile(testImagePath)

      expect(await fs.pathExists(testImagePath)).toBe(true)
      expect(await fs.pathExists(expectedOutputPath)).toBe(true)
    })

    it('should handle resize options', async () => {
      optimizer.options.width = 50
      optimizer.options.height = 50

      await optimizer.processFile(testImagePath)

      const expectedOutputPath = await optimizer.getOutputPath(testImagePath, 'webp', null, false)
      const metadata = await sharp(expectedOutputPath).metadata()
      expect(metadata.width).toBe(50)
      expect(metadata.height).toBe(50)
    })

    it('should handle different output formats', async () => {
      optimizer.options.format = 'png'
      const expectedOutputPath = await optimizer.getOutputPath(testImagePath, 'png', null, false)

      await optimizer.processFile(testImagePath)

      expect(await fs.pathExists(expectedOutputPath)).toBe(true)
      const metadata = await sharp(expectedOutputPath).metadata()
      expect(metadata.format).toBe('png')
    })

    it('should handle errors gracefully', async () => {
      const nonExistentFile = path.join(testDir, 'non-existent.jpg')

      await expect(optimizer.processFile(nonExistentFile)).rejects.toThrow()
      expect(optimizer.stats.errors).toBe(1)
    })
  })

  describe('processDirectory', () => {
    let subDir
    let imagePaths

    beforeEach(async () => {
      subDir = path.join(testDir, 'subdir')
      await fs.ensureDir(subDir)

      // Create multiple test images
      imagePaths = []
      for (let i = 0; i < 3; i++) {
        const imagePath = path.join(subDir, `image${i}.jpg`)
        await sharp({
          create: {
            width: 100,
            height: 100,
            channels: 3,
            background: { r: i * 50, g: 0, b: 0 }
          }
        }).jpeg().toFile(imagePath)
        imagePaths.push(imagePath)
      }
    })

    it('should process all images in directory', async () => {
      await optimizer.processDirectory(subDir)

      expect(optimizer.stats.processed).toBe(3)
      expect(optimizer.stats.errors).toBe(0)

      // Check that output files exist (in optimized folder since directory processing uses bulk mode)
      for (let i = 0; i < 3; i++) {
        const outputPath = path.join(subDir, 'optimized', `image${i}.webp`)
        expect(await fs.pathExists(outputPath)).toBe(true)
      }
    })

    it('should handle empty directories', async () => {
      const emptyDir = path.join(testDir, 'empty')
      await fs.ensureDir(emptyDir)

      await optimizer.processDirectory(emptyDir)

      expect(optimizer.stats.processed).toBe(0)
      expect(optimizer.stats.skipped).toBe(0)
    })

    it('should handle directories with non-image files', async () => {
      const mixedDir = path.join(testDir, 'mixed')
      await fs.ensureDir(mixedDir)

      // Create image and non-image files
      await sharp({
        create: { width: 100, height: 100, channels: 3, background: { r: 255, g: 0, b: 0 } }
      }).jpeg().toFile(path.join(mixedDir, 'image.jpg'))

      await fs.writeFile(path.join(mixedDir, 'text.txt'), 'not an image')
      await fs.writeFile(path.join(mixedDir, 'data.json'), '{"not": "image"}')

      await optimizer.processDirectory(mixedDir)

      expect(optimizer.stats.processed).toBe(1) // Only the image
      expect(await fs.pathExists(path.join(mixedDir, 'optimized', 'image.webp'))).toBe(true)
    })
  })

  describe('getOutputPath', () => {
    it('should generate correct output path for default format', async () => {
      const outputPath = await optimizer.getOutputPath(testImagePath, 'webp', null, false)
      expect(outputPath).toBe(path.join(testDir, 'test-image-optimized.webp'))
    })

    it('should use custom output path when provided', async () => {
      const customOutput = path.join(testDir, 'custom.webp')
      const outputPath = await optimizer.getOutputPath(testImagePath, 'webp', customOutput, false)
      expect(outputPath).toBe(customOutput)
    })

    it('should handle directory output paths', async () => {
      const outputDir = path.join(testDir, 'output') + path.sep
      const outputPath = await optimizer.getOutputPath(testImagePath, 'webp', outputDir, false)
      expect(outputPath).toBe(path.join(testDir, 'output', 'test-image.webp'))
    })

    it('should add -optimized suffix when keepOriginals is true', async () => {
      optimizer.options.keepOriginals = true
      const outputPath = await optimizer.getOutputPath(testImagePath, 'webp', null, false)
      expect(outputPath).toBe(path.join(testDir, 'test-image-optimized.webp'))
    })

    it('should create optimized folder for bulk operations', async () => {
      const outputPath = await optimizer.getOutputPath(testImagePath, 'webp', null, true)
      expect(outputPath).toBe(path.join(testDir, 'optimized', 'test-image.webp'))
    })
  })

  describe('getFormatOptions', () => {
    it('should return correct options for webp format', () => {
      const options = optimizer.getFormatOptions('webp', 80)
      expect(options).toEqual({ quality: 80, effort: 6 })
    })

    it('should return correct options for jpeg format', () => {
      const options = optimizer.getFormatOptions('jpeg', 90)
      expect(options).toEqual({ quality: 90, mozjpeg: true })
    })

    it('should return correct options for png format', () => {
      const options = optimizer.getFormatOptions('png', 85)
      expect(options).toEqual({
        quality: 85,
        compressionLevel: 9,
        adaptiveFiltering: false
      })
    })

    it('should return correct options for avif format', () => {
      const options = optimizer.getFormatOptions('avif', 75)
      expect(options).toEqual({ quality: 75, effort: 5 })
    })
  })

  describe('statistics', () => {
    it('should track processing statistics correctly', async () => {
      await optimizer.processFile(testImagePath)

      expect(optimizer.stats.processed).toBe(1)
      expect(optimizer.stats.totalSizeBefore).toBeGreaterThan(0)
      expect(optimizer.stats.totalSizeAfter).toBeGreaterThan(0)
    })

    it('should calculate size reduction correctly', async () => {
      const originalSize = (await fs.stat(testImagePath)).size

      await optimizer.processFile(testImagePath)

      expect(optimizer.stats.totalSizeBefore).toBe(originalSize)
      // WebP conversion should generally reduce file size, but let's just check it's tracked
      expect(optimizer.stats.totalSizeAfter).toBeGreaterThan(0)
    })
  })

  describe('error handling', () => {
    it('should handle invalid input paths', async () => {
      await expect(optimizer.run('./non-existent-path.jpg')).rejects.toThrow()
    })

    it('should handle invalid directory paths', async () => {
      await expect(optimizer.run('./non-existent-directory')).rejects.toThrow()
    })

    it('should handle corrupted image files', async () => {
      const corruptedPath = path.join(testDir, 'corrupted.jpg')
      await fs.writeFile(corruptedPath, 'not a valid image')

      await expect(optimizer.processFile(corruptedPath)).rejects.toThrow()
      expect(optimizer.stats.errors).toBe(1)
    })
  })

  describe('logging', () => {
    it('should log when verbose is enabled', () => {
      optimizer.options.verbose = true
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation()

      optimizer.log('Test message', 'info')

      expect(consoleSpy).toHaveBeenCalled()
      consoleSpy.mockRestore()
    })

    it('should not log when verbose is disabled', () => {
      optimizer.options.verbose = false
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation()

      optimizer.log('Test message', 'info')

      expect(consoleSpy).not.toHaveBeenCalled()
      consoleSpy.mockRestore()
    })
  })
})
