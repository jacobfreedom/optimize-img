const fs = require('fs-extra')
const path = require('path')
const sharp = require('sharp')
const { spawnSync } = require('child_process')

describe('CLI --no-lossless option', () => {
  const tmpDir = path.join(__dirname, 'tmp-cli-lossless')
  const inputPath = path.join(tmpDir, 'sample.png')

  beforeAll(async () => {
    await fs.ensureDir(tmpDir)
    const img = sharp({ create: { width: 64, height: 64, channels: 3, background: { r: 50, g: 160, b: 220 } } })
    await img.png().toFile(inputPath)
  })

  afterAll(async () => {
    await fs.remove(tmpDir)
  })

  test('produces outputs and accepts --no-lossless flag', async () => {
    const outLossless = path.join(tmpDir, 'sample-optimized.webp')
    const outLossy = path.join(tmpDir, 'sample-lossy.webp')

    const r1 = spawnSync('node', ['bin/cli.js', inputPath, '--format', 'webp', '--yes'], { cwd: path.join(__dirname, '..') })
    expect(r1.status).toBe(0)
    expect(await fs.pathExists(outLossless)).toBe(true)

    const r2 = spawnSync('node', ['bin/cli.js', inputPath, '--format', 'webp', '--no-lossless', '--output', outLossy, '--yes'], { cwd: path.join(__dirname, '..') })
    expect(r2.status).toBe(0)
    expect(await fs.pathExists(outLossy)).toBe(true)
  })
})
