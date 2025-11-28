const {
  loadConfig,
  getPreset,
  listPresets,
  getSupportedFormats,
  validateQuality,
  validateFormat,
  PRESETS,
  DEFAULT_CONFIG
} = require('../src/config')
const fs = require('fs-extra')
const path = require('path')

describe('Configuration', () => {
  let testDir
  let originalCwd

  beforeEach(async () => {
    originalCwd = process.cwd()
    testDir = path.join(__dirname, 'temp-config')
    await fs.ensureDir(testDir)
    process.chdir(testDir)
  })

  afterEach(async () => {
    process.chdir(originalCwd)
    await fs.remove(testDir)
  })

  describe('loadConfig', () => {
    it('should return default config when no config file exists', async () => {
      const config = await loadConfig()
      expect(config).toEqual(expect.objectContaining(DEFAULT_CONFIG))
    })

    it('should load config from .optimize-imgrc', async () => {
      const customConfig = {
        format: 'jpeg',
        quality: 90,
        stripMetadata: false
      }

      await fs.writeJSON(path.join(testDir, '.optimize-imgrc'), customConfig)
      const config = await loadConfig()

      expect(config.format).toBe('jpeg')
      expect(config.quality).toBe(90)
      expect(config.stripMetadata).toBe(false)
    })

    it('should load config from optimize-img.config.js', async () => {
      const customConfig = `
        module.exports = {
          format: 'png',
          quality: 95,
          keepOriginals: true
        };
      `

      await fs.writeFile(path.join(testDir, 'optimize-img.config.js'), customConfig)
      const config = await loadConfig()

      expect(config.format).toBe('png')
      expect(config.quality).toBe(95)
      expect(config.keepOriginals).toBe(true)
    })

    it('should load config from specific path', async () => {
      const configPath = path.join(testDir, 'custom-config.json')
      const customConfig = { format: 'avif', quality: 70 }

      await fs.writeJSON(configPath, customConfig)
      const config = await loadConfig(configPath)

      expect(config.format).toBe('avif')
      expect(config.quality).toBe(70)
    })

    it('should apply preset when specified', async () => {
      const configWithPreset = {
        preset: 'quality',
        parallel: 8
      }

      await fs.writeJSON(path.join(testDir, '.optimize-imgrc'), configWithPreset)
      const config = await loadConfig()

      expect(config.format).toBe('webp')
      expect(config.quality).toBe(90)
      expect(config.parallel).toBe(8)
    })
  })

  describe('getPreset', () => {
    it('should return correct default preset', () => {
      const preset = getPreset('default')
      expect(preset).toEqual({
        format: 'webp',
        quality: 80,
        stripMetadata: true,
        keepOriginals: true
      })
    })

    it('should return correct balanced preset', () => {
      const preset = getPreset('balanced')
      expect(preset).toEqual({
        format: 'webp',
        quality: 75,
        stripMetadata: true,
        keepOriginals: true
      })
    })

    it('should return correct quality preset', () => {
      const preset = getPreset('quality')
      expect(preset).toEqual({
        format: 'webp',
        quality: 90,
        stripMetadata: false,
        keepOriginals: true
      })
    })

    it('should return correct performant preset', () => {
      const preset = getPreset('performant')
      expect(preset).toEqual({
        format: 'webp',
        quality: 60,
        stripMetadata: false,
        keepOriginals: true
      })
    })

    it('should return default preset for unknown preset', () => {
      const preset = getPreset('unknown')
      expect(preset).toEqual(PRESETS.default)
    })
  })

  describe('listPresets', () => {
    it('should return list of available presets', () => {
      const presets = listPresets()
      expect(presets).toEqual(['default', 'balanced', 'quality', 'performant'])
    })
  })

  describe('getSupportedFormats', () => {
    it('should return supported input and output formats', () => {
      const formats = getSupportedFormats()
      expect(formats).toEqual({
        input: ['jpeg', 'jpg', 'png', 'webp', 'gif', 'tiff', 'svg', 'heic', 'avif'],
        output: ['webp', 'jpeg', 'jpg', 'png', 'avif']
      })
    })
  })

  describe('validateQuality', () => {
    it('should validate valid quality values', () => {
      expect(validateQuality(0)).toBe(0)
      expect(validateQuality(50)).toBe(50)
      expect(validateQuality(100)).toBe(100)
    })

    it('should validate quality from string', () => {
      expect(validateQuality('75')).toBe(75)
    })

    it('should throw error for invalid quality values', () => {
      expect(() => validateQuality(-1)).toThrow('Quality must be a number between 0 and 100')
      expect(() => validateQuality(101)).toThrow('Quality must be a number between 0 and 100')
      expect(() => validateQuality('invalid')).toThrow('Quality must be a number between 0 and 100')
    })
  })

  describe('validateFormat', () => {
    it('should validate supported output formats', () => {
      expect(validateFormat('webp')).toBe('webp')
      expect(validateFormat('jpeg')).toBe('jpeg')
      expect(validateFormat('JPEG')).toBe('jpeg')
      expect(validateFormat('PNG')).toBe('png')
      expect(validateFormat('avif')).toBe('avif')
    })

    it('should throw error for unsupported formats', () => {
      expect(() => validateFormat('bmp')).toThrow('Unsupported format: bmp')
      expect(() => validateFormat('tiff')).toThrow('Unsupported format: tiff')
    })
  })

  describe('PRESETS', () => {
    it('should contain all expected presets', () => {
      expect(PRESETS).toHaveProperty('default')
      expect(PRESETS).toHaveProperty('balanced')
      expect(PRESETS).toHaveProperty('quality')
      expect(PRESETS).toHaveProperty('performant')
    })

    it('should have correct preset structures', () => {
      Object.values(PRESETS).forEach(preset => {
        expect(preset).toHaveProperty('format')
        expect(preset).toHaveProperty('quality')
        expect(preset).toHaveProperty('stripMetadata')
        expect(preset).toHaveProperty('keepOriginals')
        expect(typeof preset.format).toBe('string')
        expect(typeof preset.quality).toBe('number')
        expect(typeof preset.stripMetadata).toBe('boolean')
        expect(typeof preset.keepOriginals).toBe('boolean')
      })
    })
  })

  describe('DEFAULT_CONFIG', () => {
    it('should have correct default configuration', () => {
      expect(DEFAULT_CONFIG).toEqual({
        format: 'webp',
        quality: 80,
        stripMetadata: true,
        keepOriginals: true,
        parallel: 4,
        verbose: false,
        preset: 'default',
        width: null,
        height: null,
        lossless: false
      })
    })
  })
})
