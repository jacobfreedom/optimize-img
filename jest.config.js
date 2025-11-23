module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: [
    'src/**/*.js',
    'bin/**/*.js',
    '!src/**/*.test.js',
    '!bin/**/*.test.js'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  testMatch: [
    '**/test/**/*.test.js'
  ],
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/test/setup.js']
};