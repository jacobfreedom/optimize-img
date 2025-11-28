const fs = require('fs-extra')
const path = require('path')
const sharp = require('sharp')
const ImageOptimizer = require('../src/index')

describe('Lossless compression behavior', () => {
  const tmpDir = path.join(__dirname, 'tmp')
  const inputPath = path.join(tmpDir, 'sample.png')

  beforeAll(async () => {
    await fs.ensureDir(tmpDir)
    // Create a small sample PNG (lossless source)
    const img = sharp({
      create: {
        width: 64,
        height: 64,
        channels: 3,
        background: { r: 120, g: 80, b: 200 }
      }
    })
    await img.png().toFile(inputPath)
  })

  afterAll(async () => {
    await fs.remove(tmpDir)
  })

  test('respects default and override for lossless flag', async () => {
    const defaultOpt = new ImageOptimizer()
    expect(defaultOpt.options.lossless).toBe(true)

    const lossyOut = path.join(tmpDir, 'sample-optimized.webp')
    const losslessOut = path.join(tmpDir, 'sample-lossless.webp')

    const lossy = new ImageOptimizer({ input: inputPath, format: 'webp', quality: 80, lossless: false, output: lossyOut })
    await lossy.run()

    const lossless = new ImageOptimizer({ input: inputPath, format: 'webp', quality: 80, lossless: true, output: losslessOut })
    await lossless.run()

    expect(await fs.pathExists(lossyOut)).toBe(true)
    expect(await fs.pathExists(losslessOut)).toBe(true)
  })
})
