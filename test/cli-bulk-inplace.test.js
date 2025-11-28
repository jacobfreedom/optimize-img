const fs = require('fs-extra')
const path = require('path')
const sharp = require('sharp')
const { spawnSync } = require('child_process')

describe('CLI bulk-inplace behavior', () => {
  const tmpDir = path.join(__dirname, 'tmp-cli-bulk-inplace')
  const subDir = path.join(tmpDir, 'a')
  const input1 = path.join(tmpDir, 'one.png')
  const input2 = path.join(subDir, 'two.png')

  beforeAll(async () => {
    await fs.ensureDir(subDir)
    const mk = async p => sharp({ create: { width: 32, height: 32, channels: 3, background: { r: 200, g: 100, b: 50 } } }).png().toFile(p)
    await mk(input1)
    await mk(input2)
  })

  afterAll(async () => {
    await fs.remove(tmpDir)
  })

  test('outputs next to originals with -optimized suffix', async () => {
    const r = spawnSync('node', ['bin/cli.js', tmpDir, '--bulk-inplace', '--preset', 'balanced', '--format', 'webp', '--yes'], { cwd: path.join(__dirname, '..') })
    expect(r.status).toBe(0)
    expect(await fs.pathExists(path.join(tmpDir, 'one-optimized.webp'))).toBe(true)
    expect(await fs.pathExists(path.join(subDir, 'two-optimized.webp'))).toBe(true)
  })
})
