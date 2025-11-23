Run npm test
  npm test
  shell: C:\Program Files\PowerShell\7\pwsh.EXE -command ". '{0}'"

> optimize-img@1.0.0 test
> jest

PASS test/config.test.js
  Configuration
    loadConfig
      √ should return default config when no config file exists (14 ms)
      √ should load config from .optimize-imgrc (36 ms)
      √ should load config from optimize-img.config.js (23 ms)
      √ should load config from specific path (17 ms)
      √ should apply preset when specified (4 ms)
    getPreset
      √ should return correct default preset (2 ms)
      √ should return correct balanced preset (1 ms)
      √ should return correct quality preset (2 ms)
      √ should return correct performant preset (1 ms)
      √ should return default preset for unknown preset (2 ms)
    listPresets
      √ should return list of available presets (1 ms)
    getSupportedFormats
      √ should return supported input and output formats (2 ms)
    validateQuality
      √ should validate valid quality values (2 ms)
      √ should validate quality from string (1 ms)
      √ should throw error for invalid quality values (28 ms)
    validateFormat
      √ should validate supported output formats (2 ms)
      √ should throw error for unsupported formats (6 ms)
    PRESETS
      √ should contain all expected presets (3 ms)
      √ should have correct preset structures (7 ms)
    DEFAULT_CONFIG
      √ should have correct default configuration (1 ms)

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
       Processing time: 9ms
    
    
    === Comprehensive Metrics ===
    File Statistics:
       - Average original file size: 343 B
       - Average optimized file size: 126 B
       - Average size reduction: 63.3%
       - Total storage saved: 217 B
       - Overall size reduction: 63.3% (0.00MB → 0.00MB)
    
    Performance Metrics:
       - Total processing time: 0.17s
       - Average time per file: 9ms
       - Processing speed: 6.0 files/second
       - Processing efficiency: 5.4%
    
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

FAIL test/cli.test.js (8.741 s)
  CLI Integration
    help and version
      √ should show help when no arguments provided (377 ms)
      √ should show version (240 ms)
      √ should show help with --help (238 ms)
    preset command
      √ should list available presets (248 ms)
    formats command
      √ should list supported formats (236 ms)
    file processing
      √ should process single file (429 ms)
      √ should process file with custom output (428 ms)
      √ should process file with custom format (420 ms)
      √ should process file with custom quality (419 ms)
      √ should process file with resize options (417 ms)
      √ should process file with preset (430 ms)
      √ should delete originals when specified (373 ms)
      √ should keep metadata when specified (417 ms)
    directory processing
      × should process directory with bulk flag (272 ms)
      × should process directory with custom output (265 ms)
      × should process directory with parallel processing (273 ms)
    error handling
      √ should handle non-existent input file (253 ms)
      √ should handle non-existent directory (252 ms)
      √ should handle invalid quality values (245 ms)
      √ should handle invalid format (256 ms)
    verbose mode
      √ should show verbose output when enabled (466 ms)
    configuration file
      √ should load configuration from file (461 ms)

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

FAIL test/index.test.js (662.736 s)
  ImageOptimizer
    constructor
      √ should create instance with default options (66 ms)
      √ should create instance with custom options (55 ms)
    processFile
      √ should process a single file successfully (224 ms)
      √ should skip files that already exist (56 ms)
      √ should delete original file when deleteOriginals is true (177 ms)
      × should keep original file by default (214 ms)
      × should handle resize options (30215 ms)
      × should handle different output formats (30002 ms)
      × should handle errors gracefully (30004 ms)
    processDirectory
      × should process all images in directory (30001 ms)
      × should handle empty directories (30016 ms)
      × should handle directories with non-image files (30005 ms)
    getOutputPath
      × should generate correct output path for default format (30001 ms)
      × should use custom output path when provided (30000 ms)
      × should handle directory output paths (30001 ms)
      × should add -optimized suffix when keepOriginals is true (30002 ms)
      × should create optimized folder for bulk operations (30003 ms)
    getFormatOptions
      × should return correct options for webp format (30012 ms)
      × should return correct options for jpeg format (30008 ms)
      × should return correct options for png format (30009 ms)
      × should return correct options for avif format (30006 ms)
    statistics
      × should track processing statistics correctly (30010 ms)
      × should calculate size reduction correctly (30001 ms)
    error handling
      × should handle invalid input paths (30002 ms)
      × should handle invalid directory paths (30013 ms)
      × should handle corrupted image files (30007 ms)
    logging
      × should log when verbose is enabled (30008 ms)
      × should not log when verbose is disabled (30006 ms)

  ● ImageOptimizer › processFile › should keep original file by default

    expect(received).toBe(expected) // Object.is equality

    Expected: true
    Received: false

      160 |       await optimizer.processFile(testImagePath)
      161 |
    > 162 |       expect(await fs.pathExists(testImagePath)).toBe(true)
          |                                                  ^
      163 |       expect(await fs.pathExists(expectedOutputPath)).toBe(true)
      164 |     })
      165 |

      at Object.toBe (test/index.test.js:162:50)

  ● ImageOptimizer › processFile › should handle resize options

    thrown: "Exceeded timeout of 30000 ms for a hook.
    Add a timeout value to this test to increase the timeout, if this is a long-running test. See https://jestjs.io/docs/api#testname-fn-timeout."

      72 |   })
      73 |
    > 74 |   afterEach(async () => {
         |   ^
      75 |     // Enhanced cleanup for Windows file system compatibility
      76 |     try {
      77 |       if (process.platform === 'win32') {

      at afterEach (test/index.test.js:74:3)
      at Object.describe (test/index.test.js:6:1)

  ● ImageOptimizer › processFile › should handle different output formats

    EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'



  ● ImageOptimizer › processFile › should handle different output formats

    thrown: "Exceeded timeout of 30000 ms for a hook.
    Add a timeout value to this test to increase the timeout, if this is a long-running test. See https://jestjs.io/docs/api#testname-fn-timeout."

      72 |   })
      73 |
    > 74 |   afterEach(async () => {
         |   ^
      75 |     // Enhanced cleanup for Windows file system compatibility
      76 |     try {
      77 |       if (process.platform === 'win32') {

      at afterEach (test/index.test.js:74:3)
      at Object.describe (test/index.test.js:6:1)

  ● ImageOptimizer › processFile › should handle errors gracefully

    EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'



  ● ImageOptimizer › processFile › should handle errors gracefully

    thrown: "Exceeded timeout of 30000 ms for a hook.
    Add a timeout value to this test to increase the timeout, if this is a long-running test. See https://jestjs.io/docs/api#testname-fn-timeout."

      72 |   })
      73 |
    > 74 |   afterEach(async () => {
         |   ^
      75 |     // Enhanced cleanup for Windows file system compatibility
      76 |     try {
      77 |       if (process.platform === 'win32') {

      at afterEach (test/index.test.js:74:3)
      at Object.describe (test/index.test.js:6:1)

  ● ImageOptimizer › processDirectory › should process all images in directory

    EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'



  ● ImageOptimizer › processDirectory › should process all images in directory

    thrown: "Exceeded timeout of 30000 ms for a hook.
    Add a timeout value to this test to increase the timeout, if this is a long-running test. See https://jestjs.io/docs/api#testname-fn-timeout."

      72 |   })
      73 |
    > 74 |   afterEach(async () => {
         |   ^
      75 |     // Enhanced cleanup for Windows file system compatibility
      76 |     try {
      77 |       if (process.platform === 'win32') {

      at afterEach (test/index.test.js:74:3)
      at Object.describe (test/index.test.js:6:1)

  ● ImageOptimizer › processDirectory › should handle empty directories

    EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'



  ● ImageOptimizer › processDirectory › should handle empty directories

    thrown: "Exceeded timeout of 30000 ms for a hook.
    Add a timeout value to this test to increase the timeout, if this is a long-running test. See https://jestjs.io/docs/api#testname-fn-timeout."

      72 |   })
      73 |
    > 74 |   afterEach(async () => {
         |   ^
      75 |     // Enhanced cleanup for Windows file system compatibility
      76 |     try {
      77 |       if (process.platform === 'win32') {

      at afterEach (test/index.test.js:74:3)
      at Object.describe (test/index.test.js:6:1)

  ● ImageOptimizer › processDirectory › should handle directories with non-image files

    EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'



  ● ImageOptimizer › processDirectory › should handle directories with non-image files

    thrown: "Exceeded timeout of 30000 ms for a hook.
    Add a timeout value to this test to increase the timeout, if this is a long-running test. See https://jestjs.io/docs/api#testname-fn-timeout."

      72 |   })
      73 |
    > 74 |   afterEach(async () => {
         |   ^
      75 |     // Enhanced cleanup for Windows file system compatibility
      76 |     try {
      77 |       if (process.platform === 'win32') {

      at afterEach (test/index.test.js:74:3)
      at Object.describe (test/index.test.js:6:1)

  ● ImageOptimizer › getOutputPath › should generate correct output path for default format

    EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'



  ● ImageOptimizer › getOutputPath › should generate correct output path for default format

    thrown: "Exceeded timeout of 30000 ms for a hook.
    Add a timeout value to this test to increase the timeout, if this is a long-running test. See https://jestjs.io/docs/api#testname-fn-timeout."

      72 |   })
      73 |
    > 74 |   afterEach(async () => {
         |   ^
      75 |     // Enhanced cleanup for Windows file system compatibility
      76 |     try {
      77 |       if (process.platform === 'win32') {

      at afterEach (test/index.test.js:74:3)
      at Object.describe (test/index.test.js:6:1)

  ● ImageOptimizer › getOutputPath › should use custom output path when provided

    EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'



  ● ImageOptimizer › getOutputPath › should use custom output path when provided

    thrown: "Exceeded timeout of 30000 ms for a hook.
    Add a timeout value to this test to increase the timeout, if this is a long-running test. See https://jestjs.io/docs/api#testname-fn-timeout."

      72 |   })
      73 |
    > 74 |   afterEach(async () => {
         |   ^
      75 |     // Enhanced cleanup for Windows file system compatibility
      76 |     try {
      77 |       if (process.platform === 'win32') {

      at afterEach (test/index.test.js:74:3)
      at Object.describe (test/index.test.js:6:1)

  ● ImageOptimizer › getOutputPath › should handle directory output paths

    EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'



  ● ImageOptimizer › getOutputPath › should handle directory output paths

    thrown: "Exceeded timeout of 30000 ms for a hook.
    Add a timeout value to this test to increase the timeout, if this is a long-running test. See https://jestjs.io/docs/api#testname-fn-timeout."

      72 |   })
      73 |
    > 74 |   afterEach(async () => {
         |   ^
      75 |     // Enhanced cleanup for Windows file system compatibility
      76 |     try {
      77 |       if (process.platform === 'win32') {

      at afterEach (test/index.test.js:74:3)
      at Object.describe (test/index.test.js:6:1)

  ● ImageOptimizer › getOutputPath › should add -optimized suffix when keepOriginals is true

    EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'



  ● ImageOptimizer › getOutputPath › should add -optimized suffix when keepOriginals is true

    thrown: "Exceeded timeout of 30000 ms for a hook.
    Add a timeout value to this test to increase the timeout, if this is a long-running test. See https://jestjs.io/docs/api#testname-fn-timeout."

      72 |   })
      73 |
    > 74 |   afterEach(async () => {
         |   ^
      75 |     // Enhanced cleanup for Windows file system compatibility
      76 |     try {
      77 |       if (process.platform === 'win32') {

      at afterEach (test/index.test.js:74:3)
      at Object.describe (test/index.test.js:6:1)

  ● ImageOptimizer › getOutputPath › should create optimized folder for bulk operations

    EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'



  ● ImageOptimizer › getOutputPath › should create optimized folder for bulk operations

    thrown: "Exceeded timeout of 30000 ms for a hook.
    Add a timeout value to this test to increase the timeout, if this is a long-running test. See https://jestjs.io/docs/api#testname-fn-timeout."

      72 |   })
      73 |
    > 74 |   afterEach(async () => {
         |   ^
      75 |     // Enhanced cleanup for Windows file system compatibility
      76 |     try {
      77 |       if (process.platform === 'win32') {

      at afterEach (test/index.test.js:74:3)
      at Object.describe (test/index.test.js:6:1)

  ● ImageOptimizer › getFormatOptions › should return correct options for webp format

    EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'



  ● ImageOptimizer › getFormatOptions › should return correct options for webp format

    thrown: "Exceeded timeout of 30000 ms for a hook.
    Add a timeout value to this test to increase the timeout, if this is a long-running test. See https://jestjs.io/docs/api#testname-fn-timeout."

      72 |   })
      73 |
    > 74 |   afterEach(async () => {
         |   ^
      75 |     // Enhanced cleanup for Windows file system compatibility
      76 |     try {
      77 |       if (process.platform === 'win32') {

      at afterEach (test/index.test.js:74:3)
      at Object.describe (test/index.test.js:6:1)

  ● ImageOptimizer › getFormatOptions › should return correct options for jpeg format

    EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'



  ● ImageOptimizer › getFormatOptions › should return correct options for jpeg format

    thrown: "Exceeded timeout of 30000 ms for a hook.
    Add a timeout value to this test to increase the timeout, if this is a long-running test. See https://jestjs.io/docs/api#testname-fn-timeout."

      72 |   })
      73 |
    > 74 |   afterEach(async () => {
         |   ^
      75 |     // Enhanced cleanup for Windows file system compatibility
      76 |     try {
      77 |       if (process.platform === 'win32') {

      at afterEach (test/index.test.js:74:3)
      at Object.describe (test/index.test.js:6:1)

  ● ImageOptimizer › getFormatOptions › should return correct options for png format

    EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'



  ● ImageOptimizer › getFormatOptions › should return correct options for png format

    thrown: "Exceeded timeout of 30000 ms for a hook.
    Add a timeout value to this test to increase the timeout, if this is a long-running test. See https://jestjs.io/docs/api#testname-fn-timeout."

      72 |   })
      73 |
    > 74 |   afterEach(async () => {
         |   ^
      75 |     // Enhanced cleanup for Windows file system compatibility
      76 |     try {
      77 |       if (process.platform === 'win32') {

      at afterEach (test/index.test.js:74:3)
      at Object.describe (test/index.test.js:6:1)

  ● ImageOptimizer › getFormatOptions › should return correct options for avif format

    EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'



  ● ImageOptimizer › getFormatOptions › should return correct options for avif format

    thrown: "Exceeded timeout of 30000 ms for a hook.
    Add a timeout value to this test to increase the timeout, if this is a long-running test. See https://jestjs.io/docs/api#testname-fn-timeout."

      72 |   })
      73 |
    > 74 |   afterEach(async () => {
         |   ^
      75 |     // Enhanced cleanup for Windows file system compatibility
      76 |     try {
      77 |       if (process.platform === 'win32') {

      at afterEach (test/index.test.js:74:3)
      at Object.describe (test/index.test.js:6:1)

  ● ImageOptimizer › statistics › should track processing statistics correctly

    EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'



  ● ImageOptimizer › statistics › should track processing statistics correctly

    thrown: "Exceeded timeout of 30000 ms for a hook.
    Add a timeout value to this test to increase the timeout, if this is a long-running test. See https://jestjs.io/docs/api#testname-fn-timeout."

      72 |   })
      73 |
    > 74 |   afterEach(async () => {
         |   ^
      75 |     // Enhanced cleanup for Windows file system compatibility
      76 |     try {
      77 |       if (process.platform === 'win32') {

      at afterEach (test/index.test.js:74:3)
      at Object.describe (test/index.test.js:6:1)

  ● ImageOptimizer › statistics › should calculate size reduction correctly

    EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'



  ● ImageOptimizer › statistics › should calculate size reduction correctly

    thrown: "Exceeded timeout of 30000 ms for a hook.
    Add a timeout value to this test to increase the timeout, if this is a long-running test. See https://jestjs.io/docs/api#testname-fn-timeout."

      72 |   })
      73 |
    > 74 |   afterEach(async () => {
         |   ^
      75 |     // Enhanced cleanup for Windows file system compatibility
      76 |     try {
      77 |       if (process.platform === 'win32') {

      at afterEach (test/index.test.js:74:3)
      at Object.describe (test/index.test.js:6:1)

  ● ImageOptimizer › error handling › should handle invalid input paths

    EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'



  ● ImageOptimizer › error handling › should handle invalid input paths

    thrown: "Exceeded timeout of 30000 ms for a hook.
    Add a timeout value to this test to increase the timeout, if this is a long-running test. See https://jestjs.io/docs/api#testname-fn-timeout."

      72 |   })
      73 |
    > 74 |   afterEach(async () => {
         |   ^
      75 |     // Enhanced cleanup for Windows file system compatibility
      76 |     try {
      77 |       if (process.platform === 'win32') {

      at afterEach (test/index.test.js:74:3)
      at Object.describe (test/index.test.js:6:1)

  ● ImageOptimizer › error handling › should handle invalid directory paths

    EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'



  ● ImageOptimizer › error handling › should handle invalid directory paths

    thrown: "Exceeded timeout of 30000 ms for a hook.
    Add a timeout value to this test to increase the timeout, if this is a long-running test. See https://jestjs.io/docs/api#testname-fn-timeout."

      72 |   })
      73 |
    > 74 |   afterEach(async () => {
         |   ^
      75 |     // Enhanced cleanup for Windows file system compatibility
      76 |     try {
      77 |       if (process.platform === 'win32') {

      at afterEach (test/index.test.js:74:3)
      at Object.describe (test/index.test.js:6:1)

  ● ImageOptimizer › error handling › should handle corrupted image files

    EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'



  ● ImageOptimizer › error handling › should handle corrupted image files

    thrown: "Exceeded timeout of 30000 ms for a hook.
    Add a timeout value to this test to increase the timeout, if this is a long-running test. See https://jestjs.io/docs/api#testname-fn-timeout."

      72 |   })
      73 |
    > 74 |   afterEach(async () => {
         |   ^
      75 |     // Enhanced cleanup for Windows file system compatibility
      76 |     try {
      77 |       if (process.platform === 'win32') {

      at afterEach (test/index.test.js:74:3)
      at Object.describe (test/index.test.js:6:1)

  ● ImageOptimizer › logging › should log when verbose is enabled

    EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'



  ● ImageOptimizer › logging › should log when verbose is enabled

    thrown: "Exceeded timeout of 30000 ms for a hook.
    Add a timeout value to this test to increase the timeout, if this is a long-running test. See https://jestjs.io/docs/api#testname-fn-timeout."

      72 |   })
      73 |
    > 74 |   afterEach(async () => {
         |   ^
      75 |     // Enhanced cleanup for Windows file system compatibility
      76 |     try {
      77 |       if (process.platform === 'win32') {

      at afterEach (test/index.test.js:74:3)
