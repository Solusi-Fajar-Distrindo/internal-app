// Test utilities for Supabase-related integration tests

import { NextRequest } from 'next/server'
import { MockUser } from '../mocks/supabase'

export interface TestUserData {
  nama: string
  email: string
  password: string
  role: 'superuser' | 'backoffice' | 'lapangan'
}

export interface TestResponse {
  status: number
  json: () => Promise<Record<string, unknown>>
}

// Helper to create mock NextRequest for testing
export const createMockRequest = (body: TestUserData | Partial<TestUserData>, headers: Record<string, string> = {}): NextRequest => {
  const mockRequest = new Request('http://localhost:3000/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: JSON.stringify(body)
  }) as NextRequest

  // Override json method to return our mock data
  mockRequest.json = jest.fn().mockResolvedValue(body)

  return mockRequest
}

// Helper to create mock authenticated user
export const createAuthenticatedUser = (role: MockUser['user_metadata']['role']): MockUser => {
  const baseUser = {
    id: `test-${role}-id`,
    email: `${role}@test.com`,
    user_metadata: {
      nama: `Test ${role.charAt(0).toUpperCase() + role.slice(1)}`,
      role
    }
  }
  return baseUser
}

// Helper to create valid test user data
export const createValidUserData = (overrides: Partial<TestUserData> = {}): TestUserData => {
  const defaultData: TestUserData = {
    nama: 'Test User',
    email: 'testuser@example.com',
    password: 'testPassword123',
    role: 'backoffice'
  }
  return { ...defaultData, ...overrides }
}

// Helper to create invalid test user data for validation testing
export const createInvalidUserData = (fieldToOmit: keyof TestUserData): Partial<TestUserData> => {
  const validData = createValidUserData()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [fieldToOmit]: omitted, ...invalidData } = validData
  return invalidData
}

// Helper to create user data with invalid email
export const createInvalidEmailData = (): TestUserData => {
  return createValidUserData({
    email: 'invalid-email-format'
  })
}

// Helper to create user data with invalid role
export const createInvalidRoleData = (): TestUserData => {
  return createValidUserData({
    role: 'invalid-role' as 'superuser' | 'backoffice' | 'lapangan'
  })
}

// Helper to create user data with empty strings
export const createEmptyStringData = (): Partial<TestUserData> => {
  return {
    nama: '',
    email: '',
    password: '',
    role: '' as 'superuser' | 'backoffice' | 'lapangan'
  }
}

// Helper to create user data with invalid email formats
export const createInvalidEmailFormatData = (): TestUserData[] => {
  return [
    createValidUserData({
      nama: 'Test User',
      email: 'invalid-email', // Missing @ symbol
      role: 'backoffice'
    }),
    createValidUserData({
      nama: 'Test User',
      email: 'test@', // Incomplete email
      role: 'backoffice'
    }),
    createValidUserData({
      nama: 'Test User',
      email: '@example.com', // Missing local part
      role: 'backoffice'
    }),
    createValidUserData({
      nama: 'Test User',
      email: 'test.example', // Missing TLD
      role: 'backoffice'
    }),
    createValidUserData({
      nama: 'Test User',
      email: 'test@.com', // Missing domain
      role: 'backoffice'
    }),
    createValidUserData({
      nama: 'Test User',
      email: 'test test@example.com', // Space in email
      role: 'backoffice'
    })
  ]
}

// Helper to create user data with invalid roles
export const createInvalidRolesData = (): TestUserData[] => {
  return [
    createValidUserData({
      nama: 'Test User',
      email: 'test@example.com',
      password: 'ValidPassword123!',
      role: 'admin' as 'superuser' | 'backoffice' | 'lapangan', // Not in allowed roles
    }),
    createValidUserData({
      nama: 'Test User',
      email: 'test@example.com',
      password: 'ValidPassword123!',
      role: 'manager' as 'superuser' | 'backoffice' | 'lapangan', // Not in allowed roles
    })
  ]
}

// Helper to create user data with special characters in nama
export const createSpecialCharacterNamaData = (): TestUserData[] => {
  return [
    createValidUserData({
      nama: '<script>alert("xss")</script>', // XSS attempt
      email: 'test@example.com',
      password: 'ValidPassword123!',
      role: 'backoffice'
    }),
    createValidUserData({
      nama: "'; DROP TABLE users; --", // SQL injection attempt
      email: 'test@example.com',
      password: 'ValidPassword123!',
      role: 'backoffice'
    }),
    createValidUserData({
      nama: 'Test<br>User', // HTML tag attempt
      email: 'test@example.com',
      password: 'ValidPassword123!',
      role: 'backoffice'
    })
  ]
}

// Helper to create XSS attempt data
export const createXSSAttemptData = (): TestUserData => {
  return createValidUserData({
    nama: '<script>alert("xss")</script>',
    email: 'test@example.com',
    password: 'ValidPassword123!',
    role: 'backoffice'
  })
}

// Helper to create SQL injection attempt data
export const createSQLInjectionAttemptData = (): TestUserData => {
  return createValidUserData({
    nama: "'; DROP TABLE users; --",
    email: 'test@example.com',
    password: 'ValidPassword123!',
    role: 'backoffice'
  })
}

// Helper to create business logic validation data
export const createBusinessLogicTestData = {
  // Test role hierarchy: backoffice user trying to create superuser
  backofficeCreatingSuperuser: {
    creatorRole: 'backoffice',
    targetUserRole: 'superuser',
    shouldFail: true,
    description: 'Backoffice cannot create superuser'
  },
  
  // Test role hierarchy: lapangan user trying to create any user
  lapanganCreatingUser: {
    creatorRole: 'lapangan',
    targetUserRole: 'backoffice',
    shouldFail: true,
    description: 'Lapangan cannot create users'
  },
  
  // Test role hierarchy: backoffice creating backoffice (should succeed)
  backofficeCreatingBackoffice: {
    creatorRole: 'backoffice',
    targetUserRole: 'backoffice',
    shouldFail: false,
    description: 'Backoffice can create backoffice'
  },
  
  // Test role hierarchy: superuser creating any user (should succeed)
  superuserCreatingUser: {
    creatorRole: 'superuser',
    targetUserRole: 'lapangan',
    shouldFail: false,
    description: 'Superuser can create any user'
  }
}

// Helper to assert successful user creation response
export const expectUserCreationSuccess = async (response: TestResponse, expectedUser: Partial<TestUserData>) => {
  expect(response.status).toBe(200)
  
  const jsonResponse = await response.json()
  expect(jsonResponse).toHaveProperty('success', true)
  expect(jsonResponse).toHaveProperty('user')
  
  const { user } = jsonResponse
  expect(user).toHaveProperty('id')
  expect(user).toHaveProperty('nama', expectedUser.nama)
  expect(user).toHaveProperty('email', expectedUser.email)
  expect(user).toHaveProperty('role', expectedUser.role)
}

// Helper to assert authentication error response
export const expectAuthError = async (response: TestResponse, expectedStatus: number = 401) => {
  expect(response.status).toBe(expectedStatus)
  
  const jsonResponse = await response.json()
  expect(jsonResponse).toHaveProperty('error')
  
  if (expectedStatus === 401) {
    expect(jsonResponse.error).toBe('Unauthorized')
  } else if (expectedStatus === 403) {
    expect(jsonResponse.error).toBe('Insufficient permissions')
  }
}

// Helper to assert validation error response
export const expectValidationError = async (response: TestResponse, expectedMessage: string = 'Missing required fields') => {
  expect(response.status).toBe(400)
  
  const jsonResponse = await response.json()
  expect(jsonResponse).toHaveProperty('error', expectedMessage)
}

// Helper to assert server error response
export const expectServerError = async (response: TestResponse) => {
  expect(response.status).toBe(500)
  
  const jsonResponse = await response.json()
  expect(jsonResponse).toHaveProperty('error', 'Internal server error')
}

// Helper to assert duplicate email error
export const expectDuplicateEmailError = async (response: TestResponse) => {
  expect(response.status).toBe(400)
  
  const jsonResponse = await response.json()
  expect(jsonResponse).toHaveProperty('error')
  const errorMessage = jsonResponse.error as string
  expect(
    errorMessage.includes('already registered') || errorMessage.includes('duplicate')
  ).toBe(true)
}

// Helper to assert email format validation error
export const expectEmailFormatError = async (response: TestResponse) => {
  expect(response.status).toBe(400)
  
  const jsonResponse = await response.json()
  expect(jsonResponse).toHaveProperty('error')
  expect(jsonResponse.error).toBe('Invalid email format')
}

// Helper to assert password strength validation error
export const expectPasswordStrengthError = async (response: TestResponse) => {
  expect(response.status).toBe(400)
  
  const jsonResponse = await response.json()
  expect(jsonResponse).toHaveProperty('error')
  expect(jsonResponse.error).toBe('Password is too weak')
}

// Helper to assert role validation error
export const expectRoleValidationError = async (response: TestResponse) => {
  expect(response.status).toBe(400)
  
  const jsonResponse = await response.json()
  expect(jsonResponse).toHaveProperty('error')
  expect(jsonResponse.error).toBe('Invalid role')
}

// Helper to assert business logic validation error
export const expectBusinessLogicError = async (response: TestResponse, expectedMessage: string) => {
  expect(response.status).toBe(403)
  
  const jsonResponse = await response.json()
  expect(jsonResponse).toHaveProperty('error')
  expect(jsonResponse.error).toBe(expectedMessage)
}

// Helper to assert security validation error (XSS/SQL injection)
export const expectSecurityValidationError = async (response: TestResponse) => {
  expect(response.status).toBe(400)
  
  const jsonResponse = await response.json()
  expect(jsonResponse).toHaveProperty('error')
  expect(jsonResponse.error).toBe('Invalid input data')
}

// Test data factory for different scenarios
export const testDataFactory = {
  // Valid user creation data
  validBackofficeUser: (): TestUserData => createValidUserData({
    nama: 'Backoffice User',
    email: 'backoffice@example.com',
    role: 'backoffice'
  }),
  
  validSuperuserUser: (): TestUserData => createValidUserData({
    nama: 'Superuser User',
    email: 'superuser@example.com',
    role: 'superuser'
  }),
  
  validLapanganUser: (): TestUserData => createValidUserData({
    nama: 'Lapangan User',
    email: 'lapangan@example.com',
    role: 'lapangan'
  }),

  bussinessLogicTest: (): Record<string, Record<string, string | boolean>> => createBusinessLogicTestData,
  
  // Invalid data scenarios
  missingNama: (): Partial<TestUserData> => createInvalidUserData('nama'),
  missingEmail: (): Partial<TestUserData> => createInvalidUserData('email'),
  missingPassword: (): Partial<TestUserData> => createInvalidUserData('password'),
  missingRole: (): Partial<TestUserData> => createInvalidUserData('role'),
  invalidEmail: (): TestUserData => createInvalidEmailData(),
  invalidEmailFormat: (): TestUserData[] => createInvalidEmailFormatData(),
  invalidRoleFormat: (): TestUserData[] => createInvalidRolesData(),
  specialCharacterNama: (): TestUserData[] => createSpecialCharacterNamaData(),
  xssAttempt: (): TestUserData => createXSSAttemptData(),
  sqlInjectionAttempt: (): TestUserData => createSQLInjectionAttemptData(),
  invalidRole: (): TestUserData => createInvalidRoleData(),
  emptyFields: (): Partial<TestUserData> => createEmptyStringData()
}

// Environment setup helper for tests
export const setupTestEnvironment = () => {
  // Set required environment variables for testing
  process.env.NEXT_PUBLIC_SUPABASE_URL = 'http://localhost:54321'
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key'
  process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-service-role-key'
}

// Cleanup helper for tests
export const cleanupTestEnvironment = () => {
  // Clean up environment variables
  delete process.env.NEXT_PUBLIC_SUPABASE_URL
  delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  delete process.env.SUPABASE_SERVICE_ROLE_KEY
}