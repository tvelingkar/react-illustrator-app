module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['test/**/*.ts', 'src/**/*.spec.ts'],
  testResultsProcessor: 'jest-sonar-reporter',
  coverageReporters: ['lcov'],
  coverageProvider: 'v8',
  coverageDirectory: 'coverage/',
  collectCoverage: true,
  projects: [
    /** define paths here if using a monorepo **/
  ],
  moduleNameMapper: {
    /** define module mappings like in tsconfig if using a monorepo and module mapping **/
  },
};