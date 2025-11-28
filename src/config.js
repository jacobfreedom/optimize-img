const { cosmiconfigSync } = require('cosmiconfig')
const path = require('path')

const PRESETS = {
  default: {
    format: 'webp',
    quality: 80,
    stripMetadata: true,
    keepOriginals: true
  },
  balanced: {
    format: 'webp',
    quality: 75,
    stripMetadata: true,
    keepOriginals: true
  },
  quality: {
    format: 'webp',
    quality: 90,
    stripMetadata: false,
    keepOriginals: true
  },
  performant: {
    format: 'webp',
    quality: 60,
    stripMetadata: false,
    keepOriginals: true
  }
}

const SUPPORTED_FORMATS = {
  input: ['jpeg', 'jpg', 'png', 'webp', 'gif', 'tiff', 'svg', 'heic', 'avif'],
  output: ['webp', 'jpeg', 'jpg', 'png', 'avif']
}

const DEFAULT_CONFIG = {
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
}

async function loadConfig(configPath) {
  const explorerPrimary = cosmiconfigSync('optimg')
  const explorerLegacy = cosmiconfigSync('optimize-img')

  let result
  if (configPath) {
    const resolved = path.resolve(configPath)
    result = explorerPrimary.load(resolved) || explorerLegacy.load(resolved)
  } else {
    result = explorerPrimary.search() || explorerLegacy.search()
  }

  const config = result ? result.config : {}

  // Normalize common misspelling: "loseless" → "lossless"
  if (config && typeof config === 'object') {
    if (Object.prototype.hasOwnProperty.call(config, 'loseless') && !Object.prototype.hasOwnProperty.call(config, 'lossless')) {
      config.lossless = config.loseless
      delete config.loseless
    }
  }

  // Apply preset if specified
  if (config.preset && PRESETS[config.preset]) {
    const merged = {
      ...DEFAULT_CONFIG,
      ...PRESETS[config.preset],
      ...config
    }
    return merged
  }

  const merged = {
    ...DEFAULT_CONFIG,
    ...config
  }
  return merged
}

function getPreset(presetName) {
  return PRESETS[presetName] || PRESETS.default
}

function listPresets() {
  return Object.keys(PRESETS)
}

function getSupportedFormats() {
  return SUPPORTED_FORMATS
}

function validateQuality(quality) {
  const q = parseInt(quality, 10)
  if (isNaN(q) || q < 0 || q > 100) {
    throw new Error('Quality must be a number between 0 and 100')
  }
  return q
}

function validateFormat(format) {
  if (!SUPPORTED_FORMATS.output.includes(format.toLowerCase())) {
    throw new Error(`Unsupported format: ${format}. Supported: ${SUPPORTED_FORMATS.output.join(', ')}`)
  }
  return format.toLowerCase()
}

module.exports = {
  loadConfig,
  getPreset,
  listPresets,
  getSupportedFormats,
  validateQuality,
  validateFormat,
  PRESETS,
  DEFAULT_CONFIG
}
