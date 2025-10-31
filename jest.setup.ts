import '@testing-library/jest-dom'

// Store original environment variables
const originalEnv = { ...process.env }

// Mock environment variables - set defaults for all tests
beforeEach(() => {
  process.env.GOOGLE_SHEET_ID = 'test-sheet-id'
  process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL = 'test@example.com'
  process.env.GOOGLE_PRIVATE_KEY = '-----BEGIN PRIVATE KEY-----\ntest-key\n-----END PRIVATE KEY-----\n'
})

// Restore original environment variables after each test
afterEach(() => {
  process.env = originalEnv
})

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  // Uncomment to ignore a specific log level
  // log: jest.fn(),
  // debug: jest.fn(),
  // info: jest.fn(),
  // warn: jest.fn(),
  // error: jest.fn(),
}