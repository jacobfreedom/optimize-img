const fs = require('fs-extra')
const path = require('path')

// Create test directories and files
const testDir = path.join(__dirname, 'fixtures')
const testImagesDir = path.join(testDir, 'images')

beforeAll(async () => {
  // Clean up any existing test directory
  await fs.remove(testDir)

  // Create test directories
  await fs.ensureDir(testImagesDir)

  // Create test configuration files
  await fs.writeJSON(path.join(testDir, '.imgoptimizerc'), {
    format: 'webp',
    quality: 80,
    stripMetadata: true
  })

  await fs.writeFile(path.join(testDir, 'imgoptimize.config.js'), `
    module.exports = {
      format: 'jpeg',
      quality: 85,
      stripMetadata: false
    };
  `)
})

afterAll(async () => {
  // Clean up test directory
  await fs.remove(testDir)
})

// Global test timeout
jest.setTimeout(30000)
