Run npm test
  npm test
  shell: C:\Program Files\PowerShell\7\pwsh.EXE -command ". '{0}'"

> optimize-img@1.0.0 test
> jest

PASS test/config.test.js
  Configuration
    loadConfig
      √ should return default config when no config file exists (16 ms)
      √ should load config from .optimize-imgrc (84 ms)
      √ should load config from optimize-img.config.js (21 ms)
      √ should load config from specific path (25 ms)
      √ should apply preset when specified (5 ms)
    getPreset
      √ should return correct default preset (3 ms)
      √ should return correct balanced preset (1 ms)
      √ should return correct quality preset (1 ms)
      √ should return correct performant preset (2 ms)
      √ should return default preset for unknown preset (1 ms)
    listPresets
      √ should return list of available presets (2 ms)
    getSupportedFormats
      √ should return supported input and output formats (1 ms)
    validateQuality
      √ should validate valid quality values (2 ms)
      √ should validate quality from string (1 ms)
      √ should throw error for invalid quality values (23 ms)
    validateFormat
      √ should validate supported output formats (2 ms)
      √ should throw error for unsupported formats (4 ms)
    PRESETS
      √ should contain all expected presets (3 ms)
      √ should have correct preset structures (4 ms)
    DEFAULT_CONFIG
      √ should have correct default configuration (2 ms)

  console.log
    stdout: 
    === Processing Complete ===
    Files processed: 1
    Files skipped: 0
    
    === Detailed File Report ===
    1. test.jpg
       Path: D:\a\optimize-img\optimize-img\test\temp-cli\test.jpg
       Original: 343 B → Optimized: 126 B
       Reduction: 63.3% (Saved: 217 B)
       Processing time: 8ms
    
    
    === Comprehensive Metrics ===
    File Statistics:
       - Average original file size: 343 B
       - Average optimized file size: 126 B
       - Average size reduction: 63.3%
       - Total storage saved: 217 B
       - Overall size reduction: 63.3% (0.00MB → 0.00MB)
    
    Performance Metrics:
       - Total processing time: 0.17s
       - Average time per file: 8ms
       - Processing speed: 5.8 files/second
       - Processing efficiency: 4.6%
    
    Optimization Summary:
       - Files processed: 1
       - Files skipped: 0

      at Object.log (test/cli.test.js:321:15)

  console.log
    stderr:

      at Object.log (test/cli.test.js:322:15)

  console.log
    Files after processing: [ 'test-config.json', 'test-optimized.png' ]

      at Object.log (test/cli.test.js:326:15)

FAIL test/cli.test.js (9.363 s)
  CLI Integration
    help and version
      √ should show help when no arguments provided (469 ms)
      √ should show version (278 ms)
      √ should show help with --help (273 ms)
    preset command
      √ should list available presets (272 ms)
    formats command
      √ should list supported formats (266 ms)
    file processing
      √ should process single file (447 ms)
      √ should process file with custom output (462 ms)
      √ should process file with custom format (451 ms)
      √ should process file with custom quality (447 ms)
      √ should process file with resize options (455 ms)
      √ should process file with preset (450 ms)
      √ should delete originals when specified (396 ms)
      √ should keep metadata when specified (452 ms)
    directory processing
      × should process directory with bulk flag (304 ms)
      × should process directory with custom output (296 ms)
      × should process directory with parallel processing (297 ms)
    error handling
      √ should handle non-existent input file (281 ms)
      √ should handle non-existent directory (299 ms)
      √ should handle invalid quality values (281 ms)
      √ should handle invalid format (296 ms)
    verbose mode
      √ should show verbose output when enabled (454 ms)
    configuration file
      √ should load configuration from file (518 ms)

  ● CLI Integration › directory processing › should process directory with bulk flag

    expect(received).toBe(expected) // Object.is equality

    Expected: true
    Received: false

      245 |       await runCLI(`${subDir} --bulk`)
      246 |
    > 247 |       expect(await fs.pathExists(path.join(subDir, 'optimized', 'image0.webp'))).toBe(true)
          |                                                                                  ^
      248 |       expect(await fs.pathExists(path.join(subDir, 'optimized', 'image1.webp'))).toBe(true)
      249 |       expect(await fs.pathExists(path.join(subDir, 'optimized', 'image2.webp'))).toBe(true)
      250 |     })

      at Object.toBe (test/cli.test.js:247:82)

  ● CLI Integration › directory processing › should process directory with custom output

    expect(received).toBe(expected) // Object.is equality

    Expected: true
    Received: false

      255 |       await runCLI(`${subDir} --bulk -o ${outputDir}/`)
      256 |
    > 257 |       expect(await fs.pathExists(path.join(outputDir, 'image0.webp'))).toBe(true)
          |                                                                        ^
      258 |       expect(await fs.pathExists(path.join(outputDir, 'image1.webp'))).toBe(true)
      259 |       expect(await fs.pathExists(path.join(outputDir, 'image2.webp'))).toBe(true)
      260 |     })

      at Object.toBe (test/cli.test.js:257:72)

  ● CLI Integration › directory processing › should process directory with parallel processing

    expect(received).toBe(expected) // Object.is equality

    Expected: true
    Received: false

      263 |       await runCLI(`${subDir} --bulk --parallel 2`)
      264 |
    > 265 |       expect(await fs.pathExists(path.join(subDir, 'optimized', 'image0.webp'))).toBe(true)
          |                                                                                  ^
      266 |       expect(await fs.pathExists(path.join(subDir, 'optimized', 'image1.webp'))).toBe(true)
      267 |       expect(await fs.pathExists(path.join(subDir, 'optimized', 'image2.webp'))).toBe(true)
      268 |     })

      at Object.toBe (test/cli.test.js:265:82)

  console.warn
    Warning: Could not clean up test directory D:\a\optimize-img\optimize-img\test\temp-test after 10 attempts: EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'

      101 |           }
      102 |         }
    > 103 |         console.warn(`Warning: Could not clean up test directory ${testDir} after 10 attempts: ${lastError.message}`)
          |                 ^
      104 |       } else {
      105 |         console.warn(`Warning: Could not clean up test directory ${testDir}: ${error.message}`)
      106 |       }

      at Object.warn (test/index.test.js:103:17)

  console.warn
    Warning: Could not clean up test directory D:\a\optimize-img\optimize-img\test\temp-test after 10 attempts: EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'

      101 |           }
      102 |         }
    > 103 |         console.warn(`Warning: Could not clean up test directory ${testDir} after 10 attempts: ${lastError.message}`)
          |                 ^
      104 |       } else {
      105 |         console.warn(`Warning: Could not clean up test directory ${testDir}: ${error.message}`)
      106 |       }

      at Object.warn (test/index.test.js:103:17)

  console.warn
    Warning: Could not clean up test directory D:\a\optimize-img\optimize-img\test\temp-test after 10 attempts: EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'

      101 |           }
      102 |         }
    > 103 |         console.warn(`Warning: Could not clean up test directory ${testDir} after 10 attempts: ${lastError.message}`)
          |                 ^
      104 |       } else {
      105 |         console.warn(`Warning: Could not clean up test directory ${testDir}: ${error.message}`)
      106 |       }

      at Object.warn (test/index.test.js:103:17)

  console.warn
    Warning: Could not clean up test directory D:\a\optimize-img\optimize-img\test\temp-test after 10 attempts: EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'

      101 |           }
      102 |         }
    > 103 |         console.warn(`Warning: Could not clean up test directory ${testDir} after 10 attempts: ${lastError.message}`)
          |                 ^
      104 |       } else {
      105 |         console.warn(`Warning: Could not clean up test directory ${testDir}: ${error.message}`)
      106 |       }

      at Object.warn (test/index.test.js:103:17)

  console.warn
    Warning: Could not clean up test directory D:\a\optimize-img\optimize-img\test\temp-test after 10 attempts: EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'

      101 |           }
      102 |         }
    > 103 |         console.warn(`Warning: Could not clean up test directory ${testDir} after 10 attempts: ${lastError.message}`)
          |                 ^
      104 |       } else {
      105 |         console.warn(`Warning: Could not clean up test directory ${testDir}: ${error.message}`)
      106 |       }

      at Object.warn (test/index.test.js:103:17)

  console.warn
    Warning: Could not clean up test directory D:\a\optimize-img\optimize-img\test\temp-test after 10 attempts: EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'

      101 |           }
      102 |         }
    > 103 |         console.warn(`Warning: Could not clean up test directory ${testDir} after 10 attempts: ${lastError.message}`)
          |                 ^
      104 |       } else {
      105 |         console.warn(`Warning: Could not clean up test directory ${testDir}: ${error.message}`)
      106 |       }

      at Object.warn (test/index.test.js:103:17)

  console.warn
    Warning: Could not clean up test directory D:\a\optimize-img\optimize-img\test\temp-test after 10 attempts: EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'

      101 |           }
      102 |         }
    > 103 |         console.warn(`Warning: Could not clean up test directory ${testDir} after 10 attempts: ${lastError.message}`)
          |                 ^
      104 |       } else {
      105 |         console.warn(`Warning: Could not clean up test directory ${testDir}: ${error.message}`)
      106 |       }

      at Object.warn (test/index.test.js:103:17)

  console.warn
    Warning: Could not clean up test directory D:\a\optimize-img\optimize-img\test\temp-test after 10 attempts: EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'

      101 |           }
      102 |         }
    > 103 |         console.warn(`Warning: Could not clean up test directory ${testDir} after 10 attempts: ${lastError.message}`)
          |                 ^
      104 |       } else {
      105 |         console.warn(`Warning: Could not clean up test directory ${testDir}: ${error.message}`)
      106 |       }

      at Object.warn (test/index.test.js:103:17)

  console.warn
    Warning: Could not clean up test directory D:\a\optimize-img\optimize-img\test\temp-test after 10 attempts: EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'

      101 |           }
      102 |         }
    > 103 |         console.warn(`Warning: Could not clean up test directory ${testDir} after 10 attempts: ${lastError.message}`)
          |                 ^
      104 |       } else {
      105 |         console.warn(`Warning: Could not clean up test directory ${testDir}: ${error.message}`)
      106 |       }

      at Object.warn (test/index.test.js:103:17)

  console.warn
    Warning: Could not clean up test directory D:\a\optimize-img\optimize-img\test\temp-test after 10 attempts: EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'

      101 |           }
      102 |         }
    > 103 |         console.warn(`Warning: Could not clean up test directory ${testDir} after 10 attempts: ${lastError.message}`)
          |                 ^
      104 |       } else {
      105 |         console.warn(`Warning: Could not clean up test directory ${testDir}: ${error.message}`)
      106 |       }

      at Object.warn (test/index.test.js:103:17)

  console.warn
    Warning: Could not clean up test directory D:\a\optimize-img\optimize-img\test\temp-test after 10 attempts: EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'

      101 |           }
      102 |         }
    > 103 |         console.warn(`Warning: Could not clean up test directory ${testDir} after 10 attempts: ${lastError.message}`)
          |                 ^
      104 |       } else {
      105 |         console.warn(`Warning: Could not clean up test directory ${testDir}: ${error.message}`)
      106 |       }

      at Object.warn (test/index.test.js:103:17)

  console.warn
    Warning: Could not clean up test directory D:\a\optimize-img\optimize-img\test\temp-test after 10 attempts: EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'

      101 |           }
      102 |         }
    > 103 |         console.warn(`Warning: Could not clean up test directory ${testDir} after 10 attempts: ${lastError.message}`)
          |                 ^
      104 |       } else {
      105 |         console.warn(`Warning: Could not clean up test directory ${testDir}: ${error.message}`)
      106 |       }

      at Object.warn (test/index.test.js:103:17)

  console.warn
    Warning: Could not clean up test directory D:\a\optimize-img\optimize-img\test\temp-test after 10 attempts: EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'

      101 |           }
      102 |         }
    > 103 |         console.warn(`Warning: Could not clean up test directory ${testDir} after 10 attempts: ${lastError.message}`)
          |                 ^
      104 |       } else {
      105 |         console.warn(`Warning: Could not clean up test directory ${testDir}: ${error.message}`)
      106 |       }

      at Object.warn (test/index.test.js:103:17)

  console.warn
    Warning: Could not clean up test directory D:\a\optimize-img\optimize-img\test\temp-test after 10 attempts: EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'

      101 |           }
      102 |         }
    > 103 |         console.warn(`Warning: Could not clean up test directory ${testDir} after 10 attempts: ${lastError.message}`)
          |                 ^
      104 |       } else {
      105 |         console.warn(`Warning: Could not clean up test directory ${testDir}: ${error.message}`)
      106 |       }

      at Object.warn (test/index.test.js:103:17)

  console.warn
    Warning: Could not clean up test directory D:\a\optimize-img\optimize-img\test\temp-test after 10 attempts: EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'

      101 |           }
      102 |         }
    > 103 |         console.warn(`Warning: Could not clean up test directory ${testDir} after 10 attempts: ${lastError.message}`)
          |                 ^
      104 |       } else {
      105 |         console.warn(`Warning: Could not clean up test directory ${testDir}: ${error.message}`)
      106 |       }

      at Object.warn (test/index.test.js:103:17)

  console.warn
    Warning: Could not clean up test directory D:\a\optimize-img\optimize-img\test\temp-test after 10 attempts: EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'

      101 |           }
      102 |         }
    > 103 |         console.warn(`Warning: Could not clean up test directory ${testDir} after 10 attempts: ${lastError.message}`)
          |                 ^
      104 |       } else {
      105 |         console.warn(`Warning: Could not clean up test directory ${testDir}: ${error.message}`)
      106 |       }

      at Object.warn (test/index.test.js:103:17)

  console.warn
    Warning: Could not clean up test directory D:\a\optimize-img\optimize-img\test\temp-test after 10 attempts: EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'

      101 |           }
      102 |         }
    > 103 |         console.warn(`Warning: Could not clean up test directory ${testDir} after 10 attempts: ${lastError.message}`)
          |                 ^
      104 |       } else {
      105 |         console.warn(`Warning: Could not clean up test directory ${testDir}: ${error.message}`)
      106 |       }

      at Object.warn (test/index.test.js:103:17)

  console.warn
    Warning: Could not clean up test directory D:\a\optimize-img\optimize-img\test\temp-test after 10 attempts: EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'

      101 |           }
      102 |         }
    > 103 |         console.warn(`Warning: Could not clean up test directory ${testDir} after 10 attempts: ${lastError.message}`)
          |                 ^
      104 |       } else {
      105 |         console.warn(`Warning: Could not clean up test directory ${testDir}: ${error.message}`)
      106 |       }

      at Object.warn (test/index.test.js:103:17)
console.warn
    Warning: Could not clean up test directory D:\a\optimize-img\optimize-img\test\temp-test after 10 attempts: EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'

      101 |           }
      102 |         }
    > 103 |         console.warn(`Warning: Could not clean up test directory ${testDir} after 10 attempts: ${lastError.message}`)
          |                 ^
      104 |       } else {
      105 |         console.warn(`Warning: Could not clean up test directory ${testDir}: ${error.message}`)
      106 |       }

      at Object.warn (test/index.test.js:103:17)

  console.warn
    Warning: Could not clean up test directory D:\a\optimize-img\optimize-img\test\temp-test after 10 attempts: EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'

      101 |           }
      102 |         }
    > 103 |         console.warn(`Warning: Could not clean up test directory ${testDir} after 10 attempts: ${lastError.message}`)
          |                 ^
      104 |       } else {
      105 |         console.warn(`Warning: Could not clean up test directory ${testDir}: ${error.message}`)
      106 |       }

      at Object.warn (test/index.test.js:103:17)

  console.warn
    Warning: Could not clean up test directory D:\a\optimize-img\optimize-img\test\temp-test after 10 attempts: EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'

      101 |           }
      102 |         }
    > 103 |         console.warn(`Warning: Could not clean up test directory ${testDir} after 10 attempts: ${lastError.message}`)
          |                 ^
      104 |       } else {
      105 |         console.warn(`Warning: Could not clean up test directory ${testDir}: ${error.message}`)
      106 |       }

      at Object.warn (test/index.test.js:103:17)

Terminate batch job (Y/N)? 
Error: The operation was canceled.
