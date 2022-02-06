module.exports = {
  preset: 'ts-jest',
  
  rootDir: "src",
  testMatch: [
    "<rootDir>/**/*.test.ts"
  ],
  automock: false,
  clearMocks: true,
  coverageDirectory: '../coverage',
  coverageThreshold: {
    global: {
      statements: 0,
      branches: 0,
      lines: 0,
      functions: 0
    }
  },
  setupFiles: [
    './jest.setup.ts'
  ],
  moduleDirectories: [
    "<rootDir>/src",
    "node_modules"
  ],
  moduleNameMapper: {}
};
