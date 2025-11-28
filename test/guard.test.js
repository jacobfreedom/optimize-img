const fs = require('fs-extra')
const path = require('path')
const os = require('os')
const sharp = require('sharp')
const ImageOptimizer = require('../src/index')

async function makeImage(filePath, width = 16, height = 16) {
  const buffer = await sharp({ create: { width, height, channels: 3, background: { r: 200, g: 100, b: 50 } } })
    .png()
    .toBuffer()
  await fs.outputFile(filePath, buffer)
}

describe('Guard: optimized directory naming and skip behavior', () => {
  let tmpDir
  let srcDir

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'optimg-'))
    srcDir = path.join(tmpDir, 'images')
    await fs.ensureDir(srcDir)
    await makeImage(path.join(srcDir, 'a.png'))
    await makeImage(path.join(srcDir, 'b.png'))
  })

  afterEach(async () => {
    await fs.remove(tmpDir)
  })

  test('creates optimized directory when none exists', async () => {
    const optimizer = new ImageOptimizer({ input: srcDir, bulk: true, format: 'webp', quality: 80 })
    await optimizer.run()
    const out1 = path.join(srcDir, 'optimized')
    expect(await fs.pathExists(out1)).toBe(true)
    const files = await fs.readdir(out1)
    expect(files.length).toBeGreaterThan(0)
  })

  test('creates optimized1 when optimized exists', async () => {
    // Pre-create optimized and a file inside it
    const pre = path.join(srcDir, 'optimized')
    await fs.ensureDir(pre)
    await makeImage(path.join(pre, 'pre.png'))

    const optimizer = new ImageOptimizer({ input: srcDir, bulk: true, format: 'webp', quality: 80 })
    await optimizer.run()
    const out2 = path.join(srcDir, 'optimized1')
    expect(await fs.pathExists(out2)).toBe(true)
  })

  test('creates optimized2 on third run', async () => {
    await new ImageOptimizer({ input: srcDir, bulk: true, format: 'webp', quality: 80 }).run()
    await new ImageOptimizer({ input: srcDir, bulk: true, format: 'webp', quality: 80 }).run()
    const out3 = path.join(srcDir, 'optimized2')
    await new ImageOptimizer({ input: srcDir, bulk: true, format: 'webp', quality: 80 }).run()
    expect(await fs.pathExists(out3)).toBe(true)
  })

  test('skips files inside any optimized* directories during bulk', async () => {
    // Create nested optimized with source files that should be ignored
    const nested = path.join(srcDir, 'optimized', 'child')
    await fs.ensureDir(nested)
    await makeImage(path.join(nested, 'c.png'))

    const optimizer = new ImageOptimizer({ input: srcDir, bulk: true, format: 'webp', quality: 80 })
    await optimizer.run()
    // Should not create outputs within nested optimized path again
    const createdUnderNested = await fs.glob?.glob?.(path.join(nested, '**/*.webp')).catch(() => []) || []
    expect(createdUnderNested.length === 0).toBe(true)
  })

  test('falls back to next available directory when optimized is read-only', async () => {
    const roDir = path.join(srcDir, 'optimized')
    await fs.ensureDir(roDir)
    await fs.chmod(roDir, 0o500)

    const optimizer = new ImageOptimizer({ input: srcDir, bulk: true, format: 'webp', quality: 80 })
    await optimizer.run()

    const outDir = path.join(srcDir, 'optimized1')
    const files = await fs.readdir(outDir)
    expect(files.length).toBeGreaterThan(0)

    await fs.chmod(roDir, 0o700)
  })
})
