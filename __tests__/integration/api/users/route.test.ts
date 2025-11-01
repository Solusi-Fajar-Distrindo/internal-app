// Integration tests for POST /api/users/route.ts

// Mock functions must be declared before jest.mock calls due to hoisting
const mockCreateClientFn = jest.fn()
const mockCreateAdminClientFn = jest.fn()

import { NextRequest } from 'next/server'
import { POST } from '@/app/api/users/route'
import { 
  mockUsers, 
  createSuccessUserResponse, 
  createErrorUserResponse, 
  mockCreateClient,
  mockCreateAdminClient,
  resetSupabaseMocks
} from '../../../mocks/supabase'
import {
  createMockRequest,
  createAuthenticatedUser,
  testDataFactory,
  expectUserCreationSuccess,
  expectAuthError,
  expectValidationError,
  expectServerError,
  expectDuplicateEmailError,
  expectEmailFormatError,
  expectRoleValidationError,
  expectBusinessLogicError,
  expectSecurityValidationError,
  setupTestEnvironment,
  cleanupTestEnvironment
} from '../../../helpers/supabase-test-utils'

// Mock Supabase modules
jest.mock('@/lib/supabase/server', () => ({
  createClient: mockCreateClientFn
}))

jest.mock('@/lib/supabase/admin', () => ({
  createAdminClient: mockCreateAdminClientFn
}))

// Mock environment variables
beforeAll(() => {
  setupTestEnvironment()
})

afterAll(() => {
  cleanupTestEnvironment()
})

// Reset mocks before each test
beforeEach(() => {
  resetSupabaseMocks()
  mockCreateClientFn.mockClear()
  mockCreateAdminClientFn.mockClear()
})

describe('POST /api/users', () => {
  describe('Authentication & Authorization', () => {
    it('should return 401 when user is not authenticated', async () => {
      // Mock unauthenticated user
      const mockClient = mockCreateClient(null)
      mockCreateClientFn.mockResolvedValue(mockClient)
      
      const request = createMockRequest(testDataFactory.validBackofficeUser())
      const response = await POST(request)
      
      await expectAuthError(response, 401)
    })

    it('should return 401 when authentication fails with error', async () => {
      // Mock authentication error
      const authError = { message: 'Invalid token' }
      const mockClient = mockCreateClient(null, authError)
      mockCreateClientFn.mockResolvedValue(mockClient)
      
      const request = createMockRequest(testDataFactory.validBackofficeUser())
      const response = await POST(request)
      
      await expectAuthError(response, 401)
    })

    it('should return 403 when user has insufficient permissions (lapangan role)', async () => {
      // Mock authenticated lapangan user
      const lapanganUser = createAuthenticatedUser('lapangan')
      const mockClient = mockCreateClient(lapanganUser)
      mockCreateClientFn.mockResolvedValue(mockClient)
      
      const request = createMockRequest(testDataFactory.validBackofficeUser())
      const response = await POST(request)
      
      await expectAuthError(response, 403)
    })

    it('should allow access for backoffice role', async () => {
      // Mock authenticated backoffice user
      const backofficeUser = createAuthenticatedUser('backoffice')
      const mockClient = mockCreateClient(backofficeUser)
      mockCreateClientFn.mockResolvedValue(mockClient)
      
      // Mock successful user creation
      const newUser = mockUsers.newUser
      const mockAdmin = mockCreateAdminClient(createSuccessUserResponse(newUser))
      mockCreateAdminClientFn.mockReturnValue(mockAdmin)
      
      const request = createMockRequest(testDataFactory.validBackofficeUser())
      const response = await POST(request)
      
      expect(response.status).toBe(200)
    })

    it('should allow access for superuser role', async () => {
      // Mock authenticated superuser
      const superuser = createAuthenticatedUser('superuser')
      const mockClient = mockCreateClient(superuser)
      mockCreateClientFn.mockResolvedValue(mockClient)
      
      // Mock successful user creation
      const newUser = mockUsers.newUser
      const mockAdmin = mockCreateAdminClient(createSuccessUserResponse(newUser))
      mockCreateAdminClientFn.mockReturnValue(mockAdmin)
      
      const request = createMockRequest(testDataFactory.validSuperuserUser())
      const response = await POST(request)
      
      expect(response.status).toBe(200)
    })
  })

  describe('Input Validation', () => {
    beforeEach(() => {
      // Mock authenticated admin user for validation tests
      const adminUser = createAuthenticatedUser('superuser')
      const mockClient = mockCreateClient(adminUser)
      mockCreateClientFn.mockResolvedValue(mockClient)
    })

    it('should return 400 when nama is missing', async () => {
      const invalidData = testDataFactory.missingNama()
      const request = createMockRequest(invalidData)
      const response = await POST(request)
      
      await expectValidationError(response)
    })

    it('should return 400 when email is missing', async () => {
      const invalidData = testDataFactory.missingEmail()
      const request = createMockRequest(invalidData)
      const response = await POST(request)
      
      await expectValidationError(response)
    })

    it('should return 400 when password is missing', async () => {
      const invalidData = testDataFactory.missingPassword()
      const request = createMockRequest(invalidData)
      const response = await POST(request)
      
      await expectValidationError(response)
    })

    it('should return 400 when role is missing', async () => {
      const invalidData = testDataFactory.missingRole()
      const request = createMockRequest(invalidData)
      const response = await POST(request)
      
      await expectValidationError(response)
    })

    it('should return 400 when all fields are empty strings', async () => {
      const invalidData = testDataFactory.emptyFields()
      const request = createMockRequest(invalidData)
      const response = await POST(request)
      
      await expectValidationError(response)
    })

    it('should return 400 when request body is empty', async () => {
      const request = createMockRequest({})
      const response = await POST(request)
      
      await expectValidationError(response)
    })

    it('should return 400 when email format is invalid', async () => {
      const invalidEmailData = testDataFactory.invalidEmailFormat()
      
      // Test each invalid email scenario
      for (const testData of invalidEmailData) {
        const request = createMockRequest(testData)
        const response = await POST(request)
        
        await expectEmailFormatError(response)
      }
    })

    it('should return 400 when role is invalid', async () => {
      const invalidRoleData = testDataFactory.invalidRoleFormat()
      
      // Test each invalid role scenario
      for (const testData of invalidRoleData) {
        const request = createMockRequest(testData)
        const response = await POST(request)
        
        await expectRoleValidationError(response)
      }
    })

    it('should return 400 when nama contains special characters', async () => {
      const specialCharacterData = testDataFactory.specialCharacterNama()
      
      // Test each special character scenario
      for (const testData of specialCharacterData) {
        const request = createMockRequest(testData)
        const response = await POST(request)
        
        await expectSecurityValidationError(response)
      }
    })

    it('should return 400 when email already exists in system', async () => {
      // This test would need to mock the database check for existing email
      // For now, we'll test the validation layer
      const existingEmailData = testDataFactory.validBackofficeUser()
      const request = createMockRequest(existingEmailData)
      
      // Mock admin client to simulate existing email error
      const mockAdmin = mockCreateAdminClient(createErrorUserResponse('User already exists'))
      mockCreateAdminClientFn.mockReturnValue(mockAdmin)
      
      const response = await POST(request)
      
      expect(response.status).toBe(400)
      const jsonResponse = await response.json()
      expect(jsonResponse.error).toBe('User already exists')
    })
  })

  describe('User Creation Success', () => {
    beforeEach(() => {
      // Mock authenticated admin user for success tests
      const adminUser = createAuthenticatedUser('superuser')
      const mockClient = mockCreateClient(adminUser)
      mockCreateClientFn.mockResolvedValue(mockClient)
    })

    it('should create a new backoffice user successfully', async () => {
      const userData = testDataFactory.validBackofficeUser()
      const expectedUser = {
        ...userData,
        id: 'test-newuser-id'
      }
      
      // Mock successful user creation
      const mockAdmin = mockCreateAdminClient(createSuccessUserResponse({
        id: expectedUser.id,
        email: expectedUser.email,
        user_metadata: {
          nama: expectedUser.nama,
          role: expectedUser.role
        }
      }))
      mockCreateAdminClientFn.mockReturnValue(mockAdmin)
      
      const request = createMockRequest(userData)
      const response = await POST(request)
      
      await expectUserCreationSuccess(response, expectedUser)
    })

    it('should create a new superuser successfully', async () => {
      const userData = testDataFactory.validSuperuserUser()
      const expectedUser = {
        ...userData,
        id: 'test-newuser-id'
      }
      
      // Mock successful user creation
      const mockAdmin = mockCreateAdminClient(createSuccessUserResponse({
        id: expectedUser.id,
        email: expectedUser.email,
        user_metadata: {
          nama: expectedUser.nama,
          role: expectedUser.role
        }
      }))
      mockCreateAdminClientFn.mockReturnValue(mockAdmin)
      
      const request = createMockRequest(userData)
      const response = await POST(request)
      
      await expectUserCreationSuccess(response, expectedUser)
    })

    it('should create a new lapangan user successfully', async () => {
      const userData = testDataFactory.validLapanganUser()
      const expectedUser = {
        ...userData,
        id: 'test-newuser-id'
      }
      
      // Mock successful user creation
      const mockAdmin = mockCreateAdminClient(createSuccessUserResponse({
        id: expectedUser.id,
        email: expectedUser.email,
        user_metadata: {
          nama: expectedUser.nama,
          role: expectedUser.role
        }
      }))
      mockCreateAdminClientFn.mockReturnValue(mockAdmin)
      
      const request = createMockRequest(userData)
      const response = await POST(request)
      
      await expectUserCreationSuccess(response, expectedUser)
    })

    it('should auto-confirm email for admin-created users', async () => {
      const userData = testDataFactory.validBackofficeUser()
      
      // Mock successful user creation
      const mockAdmin = mockCreateAdminClient(createSuccessUserResponse(mockUsers.newUser))
      mockCreateAdminClientFn.mockReturnValue(mockAdmin)
      
      const request = createMockRequest(userData)
      await POST(request)
      
      // Verify that createUser was called with email_confirm: true
      expect(mockAdmin.auth.admin.createUser).toHaveBeenCalledWith({
        email: userData.email,
        password: userData.password,
        email_confirm: true,
        user_metadata: {
          nama: userData.nama,
          role: userData.role
        }
      })
    })
  })

  describe('Error Handling', () => {
    beforeEach(() => {
      // Mock authenticated admin user for error tests
      const adminUser = createAuthenticatedUser('superuser')
      const mockClient = mockCreateClient(adminUser)
      mockCreateClientFn.mockResolvedValue(mockClient)
    })

    it('should return 400 when user creation fails with duplicate email', async () => {
      const userData = testDataFactory.validBackofficeUser()
      
      // Mock duplicate email error
      const mockAdmin = mockCreateAdminClient(createErrorUserResponse('User already registered'))
      mockCreateAdminClientFn.mockReturnValue(mockAdmin)
      
      const request = createMockRequest(userData)
      const response = await POST(request)
      
      await expectDuplicateEmailError(response)
    })

    it('should return 400 when user creation fails with validation error', async () => {
      const userData = testDataFactory.validBackofficeUser()
      
      // Mock validation error
      const mockAdmin = mockCreateAdminClient(createErrorUserResponse('Invalid password format'))
      mockCreateAdminClientFn.mockReturnValue(mockAdmin)
      
      const request = createMockRequest(userData)
      const response = await POST(request)
      
      expect(response.status).toBe(400)
      const jsonResponse = await response.json()
      expect(jsonResponse.error).toBe('Invalid password format')
    })

    it('should return 500 when unexpected error occurs', async () => {
      const userData = testDataFactory.validBackofficeUser()
      
      // Mock admin client to throw an unexpected error
      const mockAdminClient = {
        auth: {
          admin: {
            createUser: jest.fn().mockRejectedValue(new Error('Database connection failed'))
          }
        }
      }
      mockCreateAdminClientFn.mockReturnValue(mockAdminClient)
      
      const request = createMockRequest(userData)
      const response = await POST(request)
      
      await expectServerError(response)
    })

    it('should handle malformed JSON in request body', async () => {
      // Mock authenticated admin user
      const adminUser = createAuthenticatedUser('superuser')
      const mockClient = mockCreateClient(adminUser)
      mockCreateClientFn.mockResolvedValue(mockClient)
      
      // Create request with invalid JSON
      const mockRequest = {
        json: jest.fn().mockRejectedValue(new Error('Unexpected token in JSON')),
        headers: new Map(),
        url: 'http://localhost:3000/api/users',
        method: 'POST'
      } as unknown as NextRequest
      
      const response = await POST(mockRequest)
      
      await expectServerError(response)
    })
  })

  })

  describe('Business Logic Validation', () => {
    it('should return 403 when backoffice tries to create superuser', async () => {
      // Mock authenticated backoffice user
      const backofficeUser = createAuthenticatedUser('backoffice')
      const mockClient = mockCreateClient(backofficeUser)
      mockCreateClientFn.mockResolvedValue(mockClient)
      
      // Test data: backoffice user trying to create superuser
      const userData = {
        nama: 'Test User',
        email: 'test@example.com',
        password: 'ValidPassword123!',
        role: 'superuser' as const
      }
      const request = createMockRequest(userData)
      const response = await POST(request)
      
      await expectBusinessLogicError(response, 'Backoffice cannot create superuser')
    })

    it('should return 403 when lapangan tries to create any user', async () => {
      // Mock authenticated lapangan user
      const lapanganUser = createAuthenticatedUser('lapangan')
      const mockClient = mockCreateClient(lapanganUser)
      mockCreateClientFn.mockResolvedValue(mockClient)
      
      // Test data: lapangan user trying to create backoffice user
      const userData = testDataFactory.validBackofficeUser()
      const request = createMockRequest(userData)
      const response = await POST(request)
      
      await expectBusinessLogicError(response, 'Insufficient permissions')
    })

    it('should allow backoffice to create backoffice user', async () => {
      // Mock authenticated backoffice user
      const backofficeUser = createAuthenticatedUser('backoffice')
      const mockClient = mockCreateClient(backofficeUser)
      mockCreateClientFn.mockResolvedValue(mockClient)
      
      // Mock successful user creation
      const newUser = mockUsers.newUser
      const mockAdmin = mockCreateAdminClient(createSuccessUserResponse(newUser))
      mockCreateAdminClientFn.mockReturnValue(mockAdmin)
      
      const userData = testDataFactory.validBackofficeUser()
      const request = createMockRequest(userData)
      const response = await POST(request)
      
      await expectUserCreationSuccess(response, userData)
    })

    it('should allow superuser to create any user', async () => {
      // Mock authenticated superuser
      const superuser = createAuthenticatedUser('superuser')
      const mockClient = mockCreateClient(superuser)
      mockCreateClientFn.mockResolvedValue(mockClient)
      
      // Mock successful user creation
      const newUser = mockUsers.newUser
      const mockAdmin = mockCreateAdminClient(createSuccessUserResponse(newUser))
      mockCreateAdminClientFn.mockReturnValue(mockAdmin)
      
      const userData = testDataFactory.validLapanganUser()
      const request = createMockRequest(userData)
      const response = await POST(request)
      
      expect(response.status).toBe(200)
    })
  })

  describe('Security Validation', () => {
    beforeEach(() => {
      // Mock authenticated admin user for security tests
      const adminUser = createAuthenticatedUser('superuser')
      const mockClient = mockCreateClient(adminUser)
      mockCreateClientFn.mockResolvedValue(mockClient)
    })

    it('should return 400 when nama contains XSS attempt', async () => {
      const xssData = testDataFactory.xssAttempt()
      const request = createMockRequest(xssData)
      const response = await POST(request)
      
      await expectSecurityValidationError(response)
    })

    it('should return 400 when nama contains SQL injection attempt', async () => {
      const sqlData = testDataFactory.sqlInjectionAttempt()
      const request = createMockRequest(sqlData)
      const response = await POST(request)
      
      await expectSecurityValidationError(response)
    })
  })

  describe('Integration with Database Trigger', () => {
    beforeEach(() => {
      // Mock authenticated admin user
      const adminUser = createAuthenticatedUser('superuser')
      const mockClient = mockCreateClient(adminUser)
      mockCreateClientFn.mockResolvedValue(mockClient)
    })

    it('should not manually insert user profile (trigger handles it)', async () => {
      const userData = testDataFactory.validBackofficeUser()
      
      // Mock successful user creation
      const mockAdminClient = mockCreateAdminClient(createSuccessUserResponse(mockUsers.newUser))
      mockCreateAdminClientFn.mockReturnValue(mockAdminClient)
      
      const request = createMockRequest(userData)
      await POST(request)
      
      // Verify that only auth.admin.createUser is called
      // No manual database insertion should happen
      expect(mockAdminClient.auth.admin.createUser).toHaveBeenCalledTimes(1)
      
      // Verify the call parameters
      expect(mockAdminClient.auth.admin.createUser).toHaveBeenCalledWith({
        email: userData.email,
        password: userData.password,
        email_confirm: true,
        user_metadata: {
          nama: userData.nama,
          role: userData.role
        }
      })
    })
  })