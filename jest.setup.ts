import '@testing-library/jest-dom'

// Store original environment variables
const originalEnv = { ...process.env }

// Mock Web APIs for Next.js API route testing
Object.defineProperty(global, 'Request', {
  value: jest.fn().mockImplementation((input, init) => ({
    json: jest.fn().mockResolvedValue(init?.body || {}),
    headers: new Map(Object.entries(init?.headers || {})),
    url: input || 'http://localhost:3000',
    method: init?.method || 'GET',
    ...init
  }))
})

Object.defineProperty(global, 'Headers', {
  value: jest.fn().mockImplementation((init) => ({
    get: jest.fn((key) => init?.[key] || null),
    set: jest.fn(),
    has: jest.fn(),
    delete: jest.fn(),
    entries: jest.fn().mockReturnValue(Object.entries(init || {}))
  }))
})

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
// This works for both Node.js and jsdom environments
const originalConsole = global.console

beforeEach(() => {
  global.console = {
    ...originalConsole,
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  }
})

afterEach(() => {
  global.console = originalConsole
})