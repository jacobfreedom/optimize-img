Run npm test
  npm test
  shell: C:\Program Files\PowerShell\7\pwsh.EXE -command ". '{0}'"

> optimize-img@1.0.0 test
> jest

PASS test/config.test.js
  Configuration
    loadConfig
      √ should return default config when no config file exists (15 ms)
      √ should load config from .optimize-imgrc (79 ms)
      √ should load config from optimize-img.config.js (45 ms)
      √ should load config from specific path (19 ms)
      √ should apply preset when specified (4 ms)
    getPreset
      √ should return correct default preset (2 ms)
      √ should return correct balanced preset (1 ms)
      √ should return correct quality preset (2 ms)
      √ should return correct performant preset (1 ms)
      √ should return default preset for unknown preset (1 ms)
    listPresets
      √ should return list of available presets (1 ms)
    getSupportedFormats
      √ should return supported input and output formats (1 ms)
    validateQuality
      √ should validate valid quality values (1 ms)
      √ should validate quality from string (1 ms)
      √ should throw error for invalid quality values (25 ms)
    validateFormat
      √ should validate supported output formats (2 ms)
      √ should throw error for unsupported formats (3 ms)
    PRESETS
      √ should contain all expected presets (2 ms)
      √ should have correct preset structures (6 ms)
    DEFAULT_CONFIG
      √ should have correct default configuration (2 ms)

  console.log
    WindowsFileUtils loaded

      at Object.log (src/utils/windowsFileUtils.js:175:9)

  console.log
    WindowsFileUtils loaded

      at Object.log (src/utils/windowsFileUtils.js:175:9)

  console.warn
    Warning: Could not clean up test directory D:\a\optimize-img\optimize-img\test\temp-test: EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'

      85 |       // Only log warnings for EBUSY/EPERM errors, don't fail the test
      86 |       if (error.code === 'EPERM' || error.code === 'EBUSY') {
    > 87 |         console.warn(`Warning: Could not clean up test directory ${testDir}: ${error.message}`)
         |                 ^
      88 |       } else {
      89 |         console.error(`Error cleaning up test directory ${testDir}: ${error.message}`)
      90 |       }

      at Object.warn (test/index.test.js:87:17)

  console.warn
    Warning: Could not clean up test directory D:\a\optimize-img\optimize-img\test\temp-test: EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'

      85 |       // Only log warnings for EBUSY/EPERM errors, don't fail the test
      86 |       if (error.code === 'EPERM' || error.code === 'EBUSY') {
    > 87 |         console.warn(`Warning: Could not clean up test directory ${testDir}: ${error.message}`)
         |                 ^
      88 |       } else {
      89 |         console.error(`Error cleaning up test directory ${testDir}: ${error.message}`)
      90 |       }

      at Object.warn (test/index.test.js:87:17)

  console.warn
    Warning: Could not clean up test directory D:\a\optimize-img\optimize-img\test\temp-test: EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'

      85 |       // Only log warnings for EBUSY/EPERM errors, don't fail the test
      86 |       if (error.code === 'EPERM' || error.code === 'EBUSY') {
    > 87 |         console.warn(`Warning: Could not clean up test directory ${testDir}: ${error.message}`)
         |                 ^
      88 |       } else {
      89 |         console.error(`Error cleaning up test directory ${testDir}: ${error.message}`)
      90 |       }

      at Object.warn (test/index.test.js:87:17)

  console.warn
    Warning: Could not clean up test directory D:\a\optimize-img\optimize-img\test\temp-test: EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'

      85 |       // Only log warnings for EBUSY/EPERM errors, don't fail the test
      86 |       if (error.code === 'EPERM' || error.code === 'EBUSY') {
    > 87 |         console.warn(`Warning: Could not clean up test directory ${testDir}: ${error.message}`)
         |                 ^
      88 |       } else {
      89 |         console.error(`Error cleaning up test directory ${testDir}: ${error.message}`)
      90 |       }

      at Object.warn (test/index.test.js:87:17)

  console.warn
    Warning: Could not clean up test directory D:\a\optimize-img\optimize-img\test\temp-test: EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'

      85 |       // Only log warnings for EBUSY/EPERM errors, don't fail the test
      86 |       if (error.code === 'EPERM' || error.code === 'EBUSY') {
    > 87 |         console.warn(`Warning: Could not clean up test directory ${testDir}: ${error.message}`)
         |                 ^
      88 |       } else {
      89 |         console.error(`Error cleaning up test directory ${testDir}: ${error.message}`)
      90 |       }

      at Object.warn (test/index.test.js:87:17)

  console.warn
    Warning: Could not clean up test directory D:\a\optimize-img\optimize-img\test\temp-test: EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'

      85 |       // Only log warnings for EBUSY/EPERM errors, don't fail the test
      86 |       if (error.code === 'EPERM' || error.code === 'EBUSY') {
    > 87 |         console.warn(`Warning: Could not clean up test directory ${testDir}: ${error.message}`)
         |                 ^
      88 |       } else {
      89 |         console.error(`Error cleaning up test directory ${testDir}: ${error.message}`)
      90 |       }

      at Object.warn (test/index.test.js:87:17)

  console.warn
    Warning: Could not clean up test directory D:\a\optimize-img\optimize-img\test\temp-test: EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'

      85 |       // Only log warnings for EBUSY/EPERM errors, don't fail the test
      86 |       if (error.code === 'EPERM' || error.code === 'EBUSY') {
    > 87 |         console.warn(`Warning: Could not clean up test directory ${testDir}: ${error.message}`)
         |                 ^
      88 |       } else {
      89 |         console.error(`Error cleaning up test directory ${testDir}: ${error.message}`)
      90 |       }

      at Object.warn (test/index.test.js:87:17)

  console.warn
    Warning: Could not clean up test directory D:\a\optimize-img\optimize-img\test\temp-test: EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'

      85 |       // Only log warnings for EBUSY/EPERM errors, don't fail the test
      86 |       if (error.code === 'EPERM' || error.code === 'EBUSY') {
    > 87 |         console.warn(`Warning: Could not clean up test directory ${testDir}: ${error.message}`)
         |                 ^
      88 |       } else {
      89 |         console.error(`Error cleaning up test directory ${testDir}: ${error.message}`)
      90 |       }

      at Object.warn (test/index.test.js:87:17)

  console.warn
    Warning: Could not clean up test directory D:\a\optimize-img\optimize-img\test\temp-test: EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'

      85 |       // Only log warnings for EBUSY/EPERM errors, don't fail the test
      86 |       if (error.code === 'EPERM' || error.code === 'EBUSY') {
    > 87 |         console.warn(`Warning: Could not clean up test directory ${testDir}: ${error.message}`)
         |                 ^
      88 |       } else {
      89 |         console.error(`Error cleaning up test directory ${testDir}: ${error.message}`)
      90 |       }

      at Object.warn (test/index.test.js:87:17)

  console.warn
    Warning: Could not clean up test directory D:\a\optimize-img\optimize-img\test\temp-test: EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'

      85 |       // Only log warnings for EBUSY/EPERM errors, don't fail the test
      86 |       if (error.code === 'EPERM' || error.code === 'EBUSY') {
    > 87 |         console.warn(`Warning: Could not clean up test directory ${testDir}: ${error.message}`)
         |                 ^
      88 |       } else {
      89 |         console.error(`Error cleaning up test directory ${testDir}: ${error.message}`)
      90 |       }

      at Object.warn (test/index.test.js:87:17)

  console.warn
    Warning: Could not clean up test directory D:\a\optimize-img\optimize-img\test\temp-test: EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'

      85 |       // Only log warnings for EBUSY/EPERM errors, don't fail the test
      86 |       if (error.code === 'EPERM' || error.code === 'EBUSY') {
    > 87 |         console.warn(`Warning: Could not clean up test directory ${testDir}: ${error.message}`)
         |                 ^
      88 |       } else {
      89 |         console.error(`Error cleaning up test directory ${testDir}: ${error.message}`)
      90 |       }

      at Object.warn (test/index.test.js:87:17)

  console.warn
    Warning: Could not clean up test directory D:\a\optimize-img\optimize-img\test\temp-test: EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'

      85 |       // Only log warnings for EBUSY/EPERM errors, don't fail the test
      86 |       if (error.code === 'EPERM' || error.code === 'EBUSY') {
    > 87 |         console.warn(`Warning: Could not clean up test directory ${testDir}: ${error.message}`)
         |                 ^
      88 |       } else {
      89 |         console.error(`Error cleaning up test directory ${testDir}: ${error.message}`)
      90 |       }

      at Object.warn (test/index.test.js:87:17)

  console.warn
    Warning: Could not clean up test directory D:\a\optimize-img\optimize-img\test\temp-test: EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'

      85 |       // Only log warnings for EBUSY/EPERM errors, don't fail the test
      86 |       if (error.code === 'EPERM' || error.code === 'EBUSY') {
    > 87 |         console.warn(`Warning: Could not clean up test directory ${testDir}: ${error.message}`)
         |                 ^
      88 |       } else {
      89 |         console.error(`Error cleaning up test directory ${testDir}: ${error.message}`)
      90 |       }

      at Object.warn (test/index.test.js:87:17)

  console.warn
    Warning: Could not clean up test directory D:\a\optimize-img\optimize-img\test\temp-test: EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'

      85 |       // Only log warnings for EBUSY/EPERM errors, don't fail the test
      86 |       if (error.code === 'EPERM' || error.code === 'EBUSY') {
    > 87 |         console.warn(`Warning: Could not clean up test directory ${testDir}: ${error.message}`)
         |                 ^
      88 |       } else {
      89 |         console.error(`Error cleaning up test directory ${testDir}: ${error.message}`)
      90 |       }

      at Object.warn (test/index.test.js:87:17)

  console.warn
    Warning: Could not clean up test directory D:\a\optimize-img\optimize-img\test\temp-test: EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'

      85 |       // Only log warnings for EBUSY/EPERM errors, don't fail the test
      86 |       if (error.code === 'EPERM' || error.code === 'EBUSY') {
    > 87 |         console.warn(`Warning: Could not clean up test directory ${testDir}: ${error.message}`)
         |                 ^
      88 |       } else {
      89 |         console.error(`Error cleaning up test directory ${testDir}: ${error.message}`)
      90 |       }

      at Object.warn (test/index.test.js:87:17)

  console.warn
    Warning: Could not clean up test directory D:\a\optimize-img\optimize-img\test\temp-test: EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'

      85 |       // Only log warnings for EBUSY/EPERM errors, don't fail the test
      86 |       if (error.code === 'EPERM' || error.code === 'EBUSY') {
    > 87 |         console.warn(`Warning: Could not clean up test directory ${testDir}: ${error.message}`)
         |                 ^
      88 |       } else {
      89 |         console.error(`Error cleaning up test directory ${testDir}: ${error.message}`)
      90 |       }

      at Object.warn (test/index.test.js:87:17)

  console.warn
    Warning: Could not clean up test directory D:\a\optimize-img\optimize-img\test\temp-test: EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'

      85 |       // Only log warnings for EBUSY/EPERM errors, don't fail the test
      86 |       if (error.code === 'EPERM' || error.code === 'EBUSY') {
    > 87 |         console.warn(`Warning: Could not clean up test directory ${testDir}: ${error.message}`)
         |                 ^
      88 |       } else {
      89 |         console.error(`Error cleaning up test directory ${testDir}: ${error.message}`)
      90 |       }

      at Object.warn (test/index.test.js:87:17)

  console.warn
    Warning: Could not clean up test directory D:\a\optimize-img\optimize-img\test\temp-test: EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'

      85 |       // Only log warnings for EBUSY/EPERM errors, don't fail the test
      86 |       if (error.code === 'EPERM' || error.code === 'EBUSY') {
    > 87 |         console.warn(`Warning: Could not clean up test directory ${testDir}: ${error.message}`)
         |                 ^
      88 |       } else {
      89 |         console.error(`Error cleaning up test directory ${testDir}: ${error.message}`)
      90 |       }

      at Object.warn (test/index.test.js:87:17)

  console.warn
    Warning: Could not clean up test directory D:\a\optimize-img\optimize-img\test\temp-test: EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'

      85 |       // Only log warnings for EBUSY/EPERM errors, don't fail the test
      86 |       if (error.code === 'EPERM' || error.code === 'EBUSY') {
    > 87 |         console.warn(`Warning: Could not clean up test directory ${testDir}: ${error.message}`)
         |                 ^
      88 |       } else {
      89 |         console.error(`Error cleaning up test directory ${testDir}: ${error.message}`)
      90 |       }

      at Object.warn (test/index.test.js:87:17)

  console.warn
    Warning: Could not clean up test directory D:\a\optimize-img\optimize-img\test\temp-test: EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'

      85 |       // Only log warnings for EBUSY/EPERM errors, don't fail the test
      86 |       if (error.code === 'EPERM' || error.code === 'EBUSY') {
    > 87 |         console.warn(`Warning: Could not clean up test directory ${testDir}: ${error.message}`)
         |                 ^
      88 |       } else {
      89 |         console.error(`Error cleaning up test directory ${testDir}: ${error.message}`)
      90 |       }

      at Object.warn (test/index.test.js:87:17)

  console.warn
    Warning: Could not clean up test directory D:\a\optimize-img\optimize-img\test\temp-test: EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'

      85 |       // Only log warnings for EBUSY/EPERM errors, don't fail the test
      86 |       if (error.code === 'EPERM' || error.code === 'EBUSY') {
    > 87 |         console.warn(`Warning: Could not clean up test directory ${testDir}: ${error.message}`)
         |                 ^
      88 |       } else {
      89 |         console.error(`Error cleaning up test directory ${testDir}: ${error.message}`)
      90 |       }

      at Object.warn (test/index.test.js:87:17)

  console.warn
    Warning: Could not clean up test directory D:\a\optimize-img\optimize-img\test\temp-test: EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'

      85 |       // Only log warnings for EBUSY/EPERM errors, don't fail the test
      86 |       if (error.code === 'EPERM' || error.code === 'EBUSY') {
    > 87 |         console.warn(`Warning: Could not clean up test directory ${testDir}: ${error.message}`)
         |                 ^
      88 |       } else {
      89 |         console.error(`Error cleaning up test directory ${testDir}: ${error.message}`)
      90 |       }

      at Object.warn (test/index.test.js:87:17)

FAIL test/index.test.js (6.293 s)
  ImageOptimizer
    constructor
      √ should create instance with default options (69 ms)
      √ should create instance with custom options (59 ms)
    processFile
      √ should process a single file successfully (239 ms)
      √ should skip files that already exist (56 ms)
      √ should delete original file when deleteOriginals is true (160 ms)
      × should keep original file by default (230 ms)
      √ should handle resize options (400 ms)
      × should handle different output formats (168 ms)
      × should handle errors gracefully (159 ms)
    processDirectory
      × should process all images in directory (176 ms)
      × should handle empty directories (156 ms)
      × should handle directories with non-image files (175 ms)
    getOutputPath
      × should generate correct output path for default format (175 ms)
      × should use custom output path when provided (158 ms)
      × should handle directory output paths (178 ms)
      × should add -optimized suffix when keepOriginals is true (157 ms)
      × should create optimized folder for bulk operations (188 ms)
    getFormatOptions
      × should return correct options for webp format (190 ms)
      × should return correct options for jpeg format (144 ms)
      × should return correct options for png format (179 ms)
      × should return correct options for avif format (185 ms)
    statistics
      × should track processing statistics correctly (173 ms)
      × should calculate size reduction correctly (157 ms)
    error handling
      × should handle invalid input paths (144 ms)
      × should handle invalid directory paths (141 ms)
      × should handle corrupted image files (173 ms)
    logging
      × should log when verbose is enabled (191 ms)
      × should not log when verbose is disabled (151 ms)

  ● ImageOptimizer › processFile › should keep original file by default

    expect(received).toBe(expected) // Object.is equality

    Expected: true
    Received: false

      144 |       await optimizer.processFile(testImagePath)
      145 |
    > 146 |       expect(await fs.pathExists(testImagePath)).toBe(true)
          |                                                  ^
      147 |       expect(await fs.pathExists(expectedOutputPath)).toBe(true)
      148 |     })
      149 |

      at Object.toBe (test/index.test.js:146:50)

  ● ImageOptimizer › processFile › should handle different output formats

    EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'



  ● ImageOptimizer › processFile › should handle errors gracefully

    EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'



  ● ImageOptimizer › processDirectory › should process all images in directory

    EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'



  ● ImageOptimizer › processDirectory › should handle empty directories

    EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'



  ● ImageOptimizer › processDirectory › should handle directories with non-image files

    EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'



  ● ImageOptimizer › getOutputPath › should generate correct output path for default format

    EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'



  ● ImageOptimizer › getOutputPath › should use custom output path when provided

    EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'



  ● ImageOptimizer › getOutputPath › should handle directory output paths

    EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'



  ● ImageOptimizer › getOutputPath › should add -optimized suffix when keepOriginals is true

    EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'



  ● ImageOptimizer › getOutputPath › should create optimized folder for bulk operations

    EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'



  ● ImageOptimizer › getFormatOptions › should return correct options for webp format

    EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'



  ● ImageOptimizer › getFormatOptions › should return correct options for jpeg format

    EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'



  ● ImageOptimizer › getFormatOptions › should return correct options for png format

    EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'



  ● ImageOptimizer › getFormatOptions › should return correct options for avif format

    EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'



  ● ImageOptimizer › statistics › should track processing statistics correctly

    EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'



  ● ImageOptimizer › statistics › should calculate size reduction correctly

    EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'



  ● ImageOptimizer › error handling › should handle invalid input paths

    EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'



  ● ImageOptimizer › error handling › should handle invalid directory paths

    EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'



  ● ImageOptimizer › error handling › should handle corrupted image files

    EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'



  ● ImageOptimizer › logging › should log when verbose is enabled

    EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'



  ● ImageOptimizer › logging › should not log when verbose is disabled

    EBUSY: resource busy or locked, unlink 'D:\a\optimize-img\optimize-img\test\temp-test\test-image-optimized.webp'



  console.log
    stdout: WindowsFileUtils loaded
    
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
       - Processing speed: 6.0 files/second
       - Processing efficiency: 4.8%
    
    Optimization Summary:
       - Files processed: 1
       - Files skipped: 0

      at Object.log (test/cli.test.js:347:15)

  console.log
    stderr:

      at Object.log (test/cli.test.js:348:15)

  console.log
    Files after processing: [ 'test-config.json', 'test-optimized.png' ]

      at Object.log (test/cli.test.js:352:15)

FAIL test/cli.test.js (9.334 s)
  CLI Integration
    help and version
      √ should show help when no arguments provided (550 ms)
      √ should show version (235 ms)
      √ should show help with --help (239 ms)
    preset command
      √ should list available presets (246 ms)
    formats command
      √ should list supported formats (238 ms)
    file processing
      √ should process single file (416 ms)
      √ should process file with custom output (428 ms)
      √ should process file with custom format (410 ms)
      √ should process file with custom quality (446 ms)
      √ should process file with resize options (424 ms)
      √ should process file with preset (429 ms)
      √ should delete originals when specified (377 ms)
      √ should keep metadata when specified (415 ms)
    directory processing
      × should process directory with bulk flag (273 ms)
      × should process directory with custom output (271 ms)
      × should process directory with parallel processing (263 ms)
      × should handle bulk processing with multiple files and parallel operations (regression test) (666 ms)
    error handling
      √ should handle non-existent input file (256 ms)
      √ should handle non-existent directory (249 ms)
      √ should handle invalid quality values (261 ms)
      √ should handle invalid format (253 ms)
    verbose mode
      √ should show verbose output when enabled (436 ms)
    configuration file
      √ should load configuration from file (419 ms)

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

  ● CLI Integration › directory processing › should handle bulk processing with multiple files and parallel operations (regression test)

    expect(received).toBe(expected) // Object.is equality
    Expected: true
    Received: false

      290 |
      291 |       for (let i = 0; i < 10; i++) {
    > 292 |         expect(await fs.pathExists(path.join(subDir, 'optimized', `image${i}.webp`))).toBe(true)
          |                                                                                       ^
      293 |       }
      294 |     })
      295 |   })

      at Object.toBe (test/cli.test.js:292:87)

Test Suites: 2 failed, 1 passed, 3 total
Tests:       26 failed, 45 passed, 71 total
Snapshots:   0 total
Time:        9.599 s
Ran all test suites.
Error: Process completed with exit code 1.
0s
