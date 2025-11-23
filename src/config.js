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
    stripMetadata: true,
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
  height: null
}

async function loadConfig(configPath) {
  const explorer = cosmiconfigSync('optimize-img')

  let result
  if (configPath) {
    result = explorer.load(path.resolve(configPath))
  } else {
    result = explorer.search()
  }

  const config = result ? result.config : {}

  // Apply preset if specified
  if (config.preset && PRESETS[config.preset]) {
    return {
      ...DEFAULT_CONFIG,
      ...PRESETS[config.preset],
      ...config
    }
  }

  return {
    ...DEFAULT_CONFIG,
    ...config
  }
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
