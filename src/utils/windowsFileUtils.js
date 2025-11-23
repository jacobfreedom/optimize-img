const fs = require('fs-extra')

/**
 * Windows-specific file handling utilities to prevent EPERM and EBUSY errors
 */
class WindowsFileUtils {
  /**
   * Safely remove a file with Windows compatibility
   * @param {string} filePath - Path to the file to remove
   * @param {Object} options - Options for removal
   * @param {number} options.maxRetries - Maximum number of retry attempts (default: 10)
   * @param {number} options.initialDelay - Initial delay in ms (default: 100)
   * @param {number} options.maxDelay - Maximum delay in ms (default: 2000)
   * @returns {Promise<void>}
   */
  static async safeRemove(filePath, options = {}) {
    // Platform-specific defaults for file locking robustness
    const isWindows = process.platform === 'win32'
    const {
      maxRetries = isWindows ? 15 : 5, // More retries for Windows file locking
      initialDelay = isWindows ? 200 : 100, // Longer initial delay for Windows
      maxDelay = isWindows ? 3000 : 1000 // Maximum delay for Windows file operations
    } = options

    let lastError = null
    let delay = initialDelay

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        await fs.remove(filePath)
        return // Success
      } catch (error) {
        lastError = error

        // Only retry on Windows-specific errors
        if (error.code === 'EPERM' || error.code === 'EBUSY') {
          if (attempt < maxRetries) {
            // Exponential backoff with jitter
            await new Promise(resolve => setTimeout(resolve, delay))
            delay = Math.min(delay * 1.5 + Math.random() * 50, maxDelay)
            continue
          }
        }

        // For other errors, fail immediately
        throw error
      }
    }

    // If we get here, all retries failed
    throw new Error(`Failed to remove file ${filePath} after ${maxRetries} attempts: ${lastError.message}`)
  }

  /**
   * Safely write a file with Windows compatibility
   * @param {string} filePath - Path to write the file
   * @param {Buffer|string} data - Data to write
   * @param {Object} options - Options for writing
   * @returns {Promise<void>}
   */
  static async safeWrite(filePath, data, options = {}) {
    const tempPath = `${filePath}.tmp.${Date.now()}`

    try {
      // Write to temporary file first
      await fs.writeFile(tempPath, data, options)

      // If target exists, remove it safely
      if (await fs.pathExists(filePath)) {
        await this.safeRemove(filePath)
      }

      // Rename temp file to final destination
      await fs.rename(tempPath, filePath)
    } catch (error) {
      // Clean up temp file on error
      try {
        await fs.remove(tempPath)
      } catch (cleanupError) {
        // Ignore cleanup errors
      }
      throw error
    }
  }

  /**
   * Wait for file to be available for operations
   * @param {string} filePath - Path to the file
   * @param {Object} options - Options
   * @param {number} options.maxWait - Maximum time to wait in ms (default: 5000)
   * @param {number} options.checkInterval - Interval between checks in ms (default: 100)
   * @returns {Promise<boolean>} - True if file became available, false if timeout
   */
  static async waitForFileAvailability(filePath, options = {}) {
    const {
      maxWait = 5000,
      checkInterval = 100
    } = options

    const startTime = Date.now()

    while (Date.now() - startTime < maxWait) {
      try {
        // Try to access the file
        await fs.access(filePath, fs.constants.F_OK)
        return true
      } catch (error) {
        if (error.code === 'ENOENT') {
          // File doesn't exist, which is fine for some operations
          return true
        }
        // Wait and try again
        await new Promise(resolve => setTimeout(resolve, checkInterval))
      }
    }

    return false
  }

  /**
   * Force cleanup of any file handles (Windows-specific)
   * @param {string} filePath - Path to the file
   * @returns {Promise<void>}
   */
  static async forceCleanup(filePath) {
    if (process.platform !== 'win32') {
      return
    }

    // Multiple strategies to release file locks on Windows
    const strategies = [
      // Strategy 1: Wait with exponential backoff
      async () => {
        for (let i = 0; i < 5; i++) {
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 50))
          try {
            await fs.access(filePath)
            return
          } catch (error) {
            // Continue trying
          }
        }
      },

      // Strategy 2: Try to rename the file (forces Windows to release handles)
      async () => {
        const tempPath = `${filePath}.cleanup.${Date.now()}`
        try {
          await fs.rename(filePath, tempPath)
          await fs.remove(tempPath)
        } catch (error) {
          // Ignore rename errors
        }
      },

      // Strategy 3: Garbage collection hint (if available)
      async () => {
        if (global.gc) {
          global.gc()
          await new Promise(resolve => setTimeout(resolve, 100))
        }
      }
    ]

    for (const strategy of strategies) {
      try {
        await strategy()
      } catch (error) {
        // Continue with next strategy
      }
    }
  }
}

module.exports = WindowsFileUtils

console.log('WindowsFileUtils loaded') // Debug log for loading

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception in WindowsFileUtils:', error)
})
