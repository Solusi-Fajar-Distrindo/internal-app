import type { Config } from 'jest'
import nextJest from 'next/jest.js'
 
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})
 
// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  
  // Transform configuration
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: {
        module: 'CommonJS',
        target: 'ES2020',
      },
    }],
  },
  
  // Module extensions
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  
  // Clear mocks automatically between tests
  clearMocks: true,
  
  // Reset mocks automatically between tests
  resetMocks: true,
  
  // Restore mocks automatically between tests
  restoreMocks: true,
  
  // Test path patterns - exclude fixtures and helpers
  testMatch: [
    '<rootDir>/__tests__/**/*.test.ts',
    '<rootDir>/__tests__/**/*.test.tsx'
  ],
  
  // Ignore patterns for fixtures and helpers
  testPathIgnorePatterns: [
    '<rootDir>/__tests__/fixtures/',
    '<rootDir>/__tests__/helpers/'
  ],
  
  // Module name mapping for easy imports
  moduleNameMapper: {
    '^@/__tests__/fixtures/(.*)$': '<rootDir>/__tests__/fixtures/$1',
    '^@/__tests__/helpers/(.*)$': '<rootDir>/__tests__/helpers/$1',
    '^@/(.*)$': '<rootDir>/$1',
    'google-spreadsheet': '<rootDir>/__tests__/mocks/google-spreadsheet.ts',
    'google-auth-library': '<rootDir>/__tests__/mocks/google-auth-library.ts',
  },
  
  // Coverage configuration
  collectCoverageFrom: [
    'lib/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    'app/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!__tests__/**'
  ],
}
 
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)