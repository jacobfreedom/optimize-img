const { exec } = require('child_process')
const path = require('path')
const fs = require('fs-extra')

describe('CLI Integration', () => {
  const cliPath = path.join(__dirname, '../bin/cli.js')
  const testDir = path.join(__dirname, 'temp-cli')
  let testImagePath

  beforeEach(async () => {
    // Ensure clean directory for Windows compatibility
    if (await fs.pathExists(testDir)) {
      await fs.remove(testDir)
    }
    await fs.ensureDir(testDir)
    testImagePath = path.join(testDir, 'test.jpg')

    // Create a simple test image using Windows-compatible approach
    try {
      const sharp = require('sharp')
      const buffer = await sharp({
        create: {
          width: 100,
          height: 100,
          channels: 3,
          background: { r: 255, g: 0, b: 0 }
        }
      }).jpeg().toBuffer()

      await fs.writeFile(testImagePath, buffer)

      // Add small delay for Windows file system to release any potential locks
      if (process.platform === 'win32') {
        await new Promise(resolve => setTimeout(resolve, 50))
      }
    } catch (error) {
      // Fallback for Windows file system issues
      console.warn('Sharp file creation failed in CLI test, using alternative method:', error.message)
      // Create a minimal JPEG buffer manually for testing
      const minimalJpegBuffer = Buffer.from([
        0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10, 0x4A, 0x46, 0x49, 0x46, 0x00, 0x01,
        0x01, 0x01, 0x00, 0x48, 0x00, 0x48, 0x00, 0x00, 0xFF, 0xDB, 0x00, 0x43,
        0x00, 0x08, 0x06, 0x06, 0x07, 0x06, 0x05, 0x08, 0x07, 0x07, 0x07, 0x09,
        0x09, 0x08, 0x0A, 0x0C, 0x14, 0x0D, 0x0C, 0x0B, 0x0B, 0x0C, 0x19, 0x12,
        0x13, 0x0F, 0x14, 0x1D, 0x1A, 0x1F, 0x1E, 0x1D, 0x1A, 0x1C, 0x1C, 0x20,
        0x24, 0x2E, 0x27, 0x20, 0x22, 0x2C, 0x23, 0x1C, 0x1C, 0x28, 0x37, 0x29,
        0x2C, 0x30, 0x31, 0x34, 0x34, 0x34, 0x1F, 0x27, 0x39, 0x3D, 0x38, 0x32,
        0x3C, 0x2E, 0x33, 0x34, 0x32, 0xFF, 0xC0, 0x00, 0x11, 0x08, 0x00, 0x64,
        0x00, 0x64, 0x03, 0x01, 0x22, 0x00, 0x02, 0x11, 0x01, 0x03, 0x11, 0x01,
        0xFF, 0xD9
      ])
      await fs.writeFile(testImagePath, minimalJpegBuffer)

      // Add small delay for Windows file system to release any potential locks
      if (process.platform === 'win32') {
        await new Promise(resolve => setTimeout(resolve, 50))
      }
    }
  })

  afterEach(async () => {
    // Enhanced cleanup for Windows file system compatibility
    try {
      if (process.platform === 'win32') {
        // Use Windows-safe removal with enhanced retry logic
        const WindowsFileUtils = require('../src/utils/windowsFileUtils')
        await WindowsFileUtils.safeRemove(testDir, {
          maxRetries: 15, // More retries for Windows
          initialDelay: 200,
          maxDelay: 3000
        })
      } else {
        await fs.remove(testDir)
      }
    } catch (error) {
      if (error.code === 'EPERM' || error.code === 'EBUSY') {
        // Multiple retry attempts with increasing delays for Windows file locks
        let lastError = error
        for (let attempt = 1; attempt <= 10; attempt++) {
          const delay = attempt * 300 // Increasing delay: 300ms, 600ms, 900ms, etc.
          await new Promise(resolve => setTimeout(resolve, delay))
          try {
            await fs.remove(testDir)
            return // Success, exit cleanup
          } catch (retryError) {
            lastError = retryError
            // Continue to next attempt
          }
        }
        console.warn(`Warning: Could not clean up CLI test directory ${testDir} after 10 attempts: ${lastError.message}`)
      } else {
        console.warn(`Warning: Could not clean up CLI test directory ${testDir}: ${error.message}`)
      }
    }
  })

  function runCLI(args) {
    return new Promise((resolve, reject) => {
      // Add --yes flag to prevent interactive prompts in tests
      const safeArgs = args.includes('--yes') ? args : `${args} --yes`
      // Use cross-platform command execution
      const command = process.platform === 'win32' ? 'node.exe' : 'node'
      exec(`${command} "${cliPath}" ${safeArgs}`, (error, stdout, stderr) => {
        if (error) {
          // Reject with an object that matches the expected format for destructuring
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({ error, stdout, stderr })
        } else {
          resolve({ stdout, stderr })
        }
      })
    })
  }

  describe('help and version', () => {
    it('should show help when no arguments provided', async () => {
      try {
        await runCLI('')
      } catch ({ stdout }) {
        expect(stdout).toContain('Usage:')
        expect(stdout).toContain('optimize-img')
      }
    })

    it('should show version', async () => {
      const { stdout } = await runCLI('--version')
      expect(stdout).toMatch(/\d+\.\d+\.\d+/)
    })

    it('should show help with --help', async () => {
      const { stdout } = await runCLI('--help')
      expect(stdout).toContain('Usage:')
      expect(stdout).toContain('--format')
      expect(stdout).toContain('--quality')
    })
  })

  describe('preset command', () => {
    it('should list available presets', async () => {
      const { stdout } = await runCLI('preset')
      expect(stdout).toContain('Available presets:')
      expect(stdout).toContain('default')
      expect(stdout).toContain('balanced')
      expect(stdout).toContain('quality')
      expect(stdout).toContain('performant')
    })
  })

  describe('formats command', () => {
    it('should list supported formats', async () => {
      const { stdout } = await runCLI('formats')
      expect(stdout).toContain('Supported input formats:')
      expect(stdout).toContain('Supported output formats:')
      expect(stdout).toContain('JPEG')
      expect(stdout).toContain('WebP')
    })
  })

  describe('file processing', () => {
    it('should process single file', async () => {
      const outputPath = path.join(testDir, 'test-optimized.webp')

      await runCLI(`${testImagePath}`)

      expect(await fs.pathExists(outputPath)).toBe(true)
    })

    it('should process file with custom output', async () => {
      const customOutput = path.join(testDir, 'custom.webp')

      await runCLI(`${testImagePath} -o ${customOutput}`)

      expect(await fs.pathExists(customOutput)).toBe(true)
    })

    it('should process file with custom format', async () => {
      const outputPath = path.join(testDir, 'test-optimized.png')

      await runCLI(`${testImagePath} --format png`)

      expect(await fs.pathExists(outputPath)).toBe(true)
    })

    it('should process file with custom quality', async () => {
      const outputPath = path.join(testDir, 'test-optimized.webp')

      await runCLI(`${testImagePath} --quality 90`)

      expect(await fs.pathExists(outputPath)).toBe(true)
    })

    it('should process file with resize options', async () => {
      const outputPath = path.join(testDir, 'test-optimized.webp')

      await runCLI(`${testImagePath} --width 50 --height 50`)

      expect(await fs.pathExists(outputPath)).toBe(true)
    })

    it('should process file with preset', async () => {
      const outputPath = path.join(testDir, 'test-optimized.webp')

      await runCLI(`${testImagePath} --preset quality`)

      expect(await fs.pathExists(outputPath)).toBe(true)
    })

    it('should delete originals when specified', async () => {
      await runCLI(`${testImagePath} --delete-originals --yes`)

      expect(await fs.pathExists(testImagePath)).toBe(false)
      // When deleteOriginals is true, the file is replaced in-place
      expect(await fs.pathExists(path.join(testDir, 'test.webp'))).toBe(true)
    })

    it('should keep metadata when specified', async () => {
      await runCLI(`${testImagePath} --keep-metadata`)

      expect(await fs.pathExists(path.join(testDir, 'test-optimized.webp'))).toBe(true)
    })
  })

  describe('directory processing', () => {
    let subDir

    beforeEach(async () => {
      subDir = path.join(testDir, 'images')
      await fs.ensureDir(subDir)

      // Create multiple test images
      const sharp = require('sharp')
      for (let i = 0; i < 3; i++) {
        await sharp({
          create: {
            width: 100,
            height: 100,
            channels: 3,
            background: { r: i * 50, g: 0, b: 0 }
          }
        }).jpeg().toFile(path.join(subDir, `image${i}.jpg`))
      }
    })

    it('should process directory with bulk flag', async () => {
      await runCLI(`${subDir} --bulk`)

      expect(await fs.pathExists(path.join(subDir, 'optimized', 'image0.webp'))).toBe(true)
      expect(await fs.pathExists(path.join(subDir, 'optimized', 'image1.webp'))).toBe(true)
      expect(await fs.pathExists(path.join(subDir, 'optimized', 'image2.webp'))).toBe(true)
    })

    it('should process directory with custom output', async () => {
      const outputDir = path.join(testDir, 'output')

      await runCLI(`${subDir} --bulk -o ${outputDir}/`)

      expect(await fs.pathExists(path.join(outputDir, 'image0.webp'))).toBe(true)
      expect(await fs.pathExists(path.join(outputDir, 'image1.webp'))).toBe(true)
      expect(await fs.pathExists(path.join(outputDir, 'image2.webp'))).toBe(true)
    })

    it('should process directory with parallel processing', async () => {
      await runCLI(`${subDir} --bulk --parallel 2`)

      expect(await fs.pathExists(path.join(subDir, 'optimized', 'image0.webp'))).toBe(true)
      expect(await fs.pathExists(path.join(subDir, 'optimized', 'image1.webp'))).toBe(true)
      expect(await fs.pathExists(path.join(subDir, 'optimized', 'image2.webp'))).toBe(true)
    })
  })

  describe('error handling', () => {
    it('should handle non-existent input file', async () => {
      try {
        await runCLI('./non-existent.jpg')
      } catch ({ stderr }) {
        expect(stderr).toContain('Error:')
      }
    })

    it('should handle non-existent directory', async () => {
      try {
        await runCLI('./non-existent-dir --bulk')
      } catch ({ stderr }) {
        expect(stderr).toContain('Error:')
      }
    })

    it('should handle invalid quality values', async () => {
      try {
        await runCLI(`${testImagePath} --quality 150`)
      } catch ({ stderr }) {
        expect(stderr).toContain('Error:')
      }
    })

    it('should handle invalid format', async () => {
      try {
        await runCLI(`${testImagePath} --format bmp`)
      } catch ({ stderr }) {
        expect(stderr).toContain('Error:')
      }
    })
  })

  describe('verbose mode', () => {
    it('should show verbose output when enabled', async () => {
      const { stdout } = await runCLI(`${testImagePath} --verbose`)
      expect(stdout).toContain('Processing')
    })
  })

  describe('configuration file', () => {
    it('should load configuration from file', async () => {
      const configPath = path.join(testDir, 'test-config.json')
      await fs.writeJSON(configPath, {
        format: 'png',
        quality: 90
      })

      const { stdout, stderr } = await runCLI(`${testImagePath} --config ${configPath}`)
      console.log('stdout:', stdout)
      console.log('stderr:', stderr)

      // Check what files exist after processing
      const files = await fs.readdir(testDir)
      console.log('Files after processing:', files)

      // The output should be test.png based on the input filename
      expect(await fs.pathExists(path.join(testDir, 'test-optimized.png'))).toBe(true)
    })
  })
})
