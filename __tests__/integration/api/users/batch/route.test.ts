// Integration tests for POST /api/users/batch/route.ts

// Mock functions must be declared before jest.mock calls due to hoisting
const mockCreateClientFn = jest.fn()
const mockCreateAdminClientFn = jest.fn()

import { NextRequest } from 'next/server'
import { POST } from '@/app/api/users/batch/route'
import { 
  mockUsers, 
  createSuccessUserResponse, 
  createErrorUserResponse, 
  mockCreateClient,
  mockCreateAdminClient,
  resetSupabaseMocks
} from '../../../../mocks/supabase'
import {
  createAuthenticatedUser,
  expectAuthError,
  expectServerError,
  setupTestEnvironment,
  cleanupTestEnvironment
} from '../../../../helpers/supabase-test-utils'

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

// Helper to create mock batch request
export const createMockBatchRequest = (emails: string[], headers: Record<string, string> = {}): NextRequest => {
  const body = { emails }
  const mockRequest = new Request('http://localhost:3000/api/users/batch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  }) as NextRequest

  // Override json method to return our mock data and avoid body being read issue
  mockRequest.json = jest.fn().mockResolvedValue(body)
  return mockRequest
}

// Helper to assert successful batch creation response
export const expectBatchCreationSuccess = async (response: Response, expectedSuccessCount: number, expectedFailureCount: number = 0) => {
  expect(response.status).toBe(200)
  
  const jsonResponse = await response.json()
  expect(jsonResponse).toHaveProperty('success', true)
  expect(jsonResponse).toHaveProperty('message')
  expect(jsonResponse).toHaveProperty('results')
  expect(Array.isArray(jsonResponse.results)).toBe(true)
  expect(jsonResponse.results).toHaveLength(expectedSuccessCount + expectedFailureCount)
  
  if (expectedFailureCount > 0) {
    expect(jsonResponse.message).toContain(`${expectedSuccessCount} users`)
    expect(jsonResponse.message).toContain(`${expectedFailureCount} failed`)
  } else {
    expect(jsonResponse.message).toContain(`Successfully created ${expectedSuccessCount} users`)
  }
  
  return jsonResponse
}

// Helper to assert batch validation error
export const expectBatchValidationError = async (response: Response, expectedMessage: string = 'Emails array is required') => {
  expect(response.status).toBe(400)
  
  const jsonResponse = await response.json()
  expect(jsonResponse).toHaveProperty('error', expectedMessage)
}

describe('POST /api/users/batch', () => {
  describe('Authentication & Authorization', () => {
    it('should return 401 when user is not authenticated', async () => {
      // Mock unauthenticated user
      const mockClient = mockCreateClient(null)
      mockCreateClientFn.mockResolvedValue(mockClient)
      
      const request = createMockBatchRequest(['test1@example.com', 'test2@example.com'])
      const response = await POST(request)
      
      await expectAuthError(response, 401)
    })

    it('should return 401 when authentication fails with error', async () => {
      // Mock authentication error
      const authError = { message: 'Invalid token' }
      const mockClient = mockCreateClient(null, authError)
      mockCreateClientFn.mockResolvedValue(mockClient)
      
      const request = createMockBatchRequest(['test1@example.com'])
      const response = await POST(request)
      
      await expectAuthError(response, 401)
    })

    it('should return 403 when user has insufficient permissions (lapangan role)', async () => {
      // Mock authenticated lapangan user
      const lapanganUser = createAuthenticatedUser('lapangan')
      const mockClient = mockCreateClient(lapanganUser)
      mockCreateClientFn.mockResolvedValue(mockClient)
      
      const request = createMockBatchRequest(['test1@example.com'])
      const response = await POST(request)
      
      await expectAuthError(response, 403)
    })

    it('should allow access for backoffice role', async () => {
      // Mock authenticated backoffice user
      const backofficeUser = createAuthenticatedUser('backoffice')
      const mockClient = mockCreateClient(backofficeUser)
      mockCreateClientFn.mockResolvedValue(mockClient)
      
      // Mock successful user creation
      const mockAdmin = mockCreateAdminClient(createSuccessUserResponse(mockUsers.newUser))
      mockCreateAdminClientFn.mockReturnValue(mockAdmin)
      
      const request = createMockBatchRequest(['test1@example.com'])
      const response = await POST(request)
      
      expect(response.status).toBe(200)
    })

    it('should allow access for superuser role', async () => {
      // Mock authenticated superuser
      const superuser = createAuthenticatedUser('superuser')
      const mockClient = mockCreateClient(superuser)
      mockCreateClientFn.mockResolvedValue(mockClient)
      
      // Mock successful user creation
      const mockAdmin = mockCreateAdminClient(createSuccessUserResponse(mockUsers.newUser))
      mockCreateAdminClientFn.mockReturnValue(mockAdmin)
      
      const request = createMockBatchRequest(['test1@example.com'])
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

    it('should return 400 when emails field is missing', async () => {
      const request = new Request('http://localhost:3000/api/users/batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      }) as NextRequest
      request.json = jest.fn().mockResolvedValue({})

      const response = await POST(request)
      await expectBatchValidationError(response)
    })

    it('should return 400 when emails is not an array', async () => {
      const request = new Request('http://localhost:3000/api/users/batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emails: 'not-an-array' })
      }) as NextRequest
      request.json = jest.fn().mockResolvedValue({ emails: 'not-an-array' })

      const response = await POST(request)
      await expectBatchValidationError(response)
    })

    it('should return 400 when emails array is empty', async () => {
      const request = createMockBatchRequest([])
      const response = await POST(request)
      
      await expectBatchValidationError(response)
    })

    it('should return 400 when emails array contains invalid email formats', async () => {
      const invalidEmails = ['valid@example.com', 'invalid-email', 'another@invalid']
      const request = createMockBatchRequest(invalidEmails)
      const response = await POST(request)
      
      const jsonResponse = await response.json()
      expect(response.status).toBe(400)
      expect(jsonResponse).toHaveProperty('error', 'Invalid email format')
      expect(jsonResponse).toHaveProperty('invalidEmails')
      expect(jsonResponse.invalidEmails).toEqual(expect.arrayContaining(['invalid-email', 'another@invalid']))
    })

    it('should return 400 when all emails are invalid', async () => {
      const invalidEmails = ['invalid1', 'invalid2', 'invalid3']
      const request = createMockBatchRequest(invalidEmails)
      const response = await POST(request)
      
      const jsonResponse = await response.json()
      expect(response.status).toBe(400)
      expect(jsonResponse).toHaveProperty('error', 'Invalid email format')
      expect(jsonResponse.invalidEmails).toEqual(invalidEmails)
    })
  })

  describe('Batch User Creation', () => {
    beforeEach(() => {
      // Mock authenticated admin user for batch creation tests
      const adminUser = createAuthenticatedUser('superuser')
      const mockClient = mockCreateClient(adminUser)
      mockCreateClientFn.mockResolvedValue(mockClient)
    })

    it('should create a single user successfully', async () => {
      const email = 'single@example.com'
      const expectedUser = {
        id: 'test-newuser-id',
        email,
        user_metadata: {
          nama: email.split('@')[0],
          role: 'lapangan' as const
        }
      }

      const mockAdmin = mockCreateAdminClient(createSuccessUserResponse(expectedUser))
      mockCreateAdminClientFn.mockReturnValue(mockAdmin)
      
      const request = createMockBatchRequest([email])
      const response = await POST(request)
      
      const jsonResponse = await expectBatchCreationSuccess(response, 1, 0)
      expect(jsonResponse.results[0]).toEqual({
        email,
        success: true,
        user: {
          id: expectedUser.id,
          nama: email.split('@')[0],
          email,
          role: 'lapangan'
        }
      })
    })

    it('should create multiple users successfully', async () => {
      const emails = ['user1@example.com', 'user2@example.com', 'user3@example.com']
      
      // Mock successful creation for each user
      const mockAdmin = {
        auth: {
          admin: {
            createUser: jest.fn()
              .mockResolvedValueOnce(createSuccessUserResponse({
                id: 'user1-id',
                email: emails[0],
                user_metadata: { nama: emails[0].split('@')[0], role: 'lapangan' }
              }))
              .mockResolvedValueOnce(createSuccessUserResponse({
                id: 'user2-id',
                email: emails[1],
                user_metadata: { nama: emails[1].split('@')[0], role: 'lapangan' }
              }))
              .mockResolvedValueOnce(createSuccessUserResponse({
                id: 'user3-id',
                email: emails[2],
                user_metadata: { nama: emails[2].split('@')[0], role: 'lapangan' }
              }))
          }
        }
      }
      mockCreateAdminClientFn.mockReturnValue(mockAdmin)
      
      const request = createMockBatchRequest(emails)
      const response = await POST(request)
      
      const jsonResponse = await expectBatchCreationSuccess(response, 3, 0)
      expect(jsonResponse.results).toHaveLength(3)
      jsonResponse.results.forEach((result: { success: boolean; email: string; user?: { id: string; nama: string; email: string; role: string } }, index: number) => {
        expect(result.success).toBe(true)
        expect(result.email).toBe(emails[index])
        expect(result.user).toEqual({
          id: `user${index + 1}-id`,
          nama: emails[index].split('@')[0],
          email: emails[index],
          role: 'lapangan'
        })
      })
    })

    it('should handle partial success with some failures', async () => {
      const emails = ['success1@example.com', 'fail@example.com', 'success2@example.com']
      
      // Mock mixed success/failure responses
      const mockAdmin = {
        auth: {
          admin: {
            createUser: jest.fn()
              .mockResolvedValueOnce(createSuccessUserResponse({
                id: 'success1-id',
                email: emails[0],
                user_metadata: { nama: emails[0].split('@')[0], role: 'lapangan' }
              }))
              .mockResolvedValueOnce(createErrorUserResponse('User already exists'))
              .mockResolvedValueOnce(createSuccessUserResponse({
                id: 'success2-id',
                email: emails[2],
                user_metadata: { nama: emails[2].split('@')[0], role: 'lapangan' }
              }))
          }
        }
      }
      mockCreateAdminClientFn.mockReturnValue(mockAdmin)
      
      const request = createMockBatchRequest(emails)
      const response = await POST(request)
      
      const jsonResponse = await expectBatchCreationSuccess(response, 2, 1)
      expect(jsonResponse.results).toHaveLength(3)
      
      // Check successful results
      expect(jsonResponse.results[0]).toEqual({
        email: emails[0],
        success: true,
        user: {
          id: 'success1-id',
          nama: emails[0].split('@')[0],
          email: emails[0],
          role: 'lapangan'
        }
      })
      
      // Check failed result
      expect(jsonResponse.results[1]).toEqual({
        email: emails[1],
        success: false,
        error: 'User already exists'
      })
      
      // Check second successful result
      expect(jsonResponse.results[2]).toEqual({
        email: emails[2],
        success: true,
        user: {
          id: 'success2-id',
          nama: emails[2].split('@')[0],
          email: emails[2],
          role: 'lapangan'
        }
      })
    })

    it('should handle all failures gracefully', async () => {
      const emails = ['fail1@example.com', 'fail2@example.com']
      
      // Mock all failures
      const mockAdmin = {
        auth: {
          admin: {
            createUser: jest.fn()
              .mockResolvedValueOnce(createErrorUserResponse('User already exists'))
              .mockResolvedValueOnce(createErrorUserResponse('Invalid email domain'))
          }
        }
      }
      mockCreateAdminClientFn.mockReturnValue(mockAdmin)
      
      const request = createMockBatchRequest(emails)
      const response = await POST(request)
      
      const jsonResponse = await expectBatchCreationSuccess(response, 0, 2)
      expect(jsonResponse.results).toHaveLength(2)
      jsonResponse.results.forEach((result: { success: boolean; email: string; error?: string }, index: number) => {
        expect(result.success).toBe(false)
        expect(result.email).toBe(emails[index])
        expect(result.error).toBeDefined()
      })
    })

    it('should use default password and auto-confirm email', async () => {
      const email = 'test@example.com'
      const expectedUser = {
        id: 'test-id',
        email,
        user_metadata: {
          nama: email.split('@')[0],
          role: 'lapangan' as const
        }
      }

      const mockAdmin = {
        auth: {
          admin: {
            createUser: jest.fn().mockResolvedValue(createSuccessUserResponse(expectedUser))
          }
        }
      }
      mockCreateAdminClientFn.mockReturnValue(mockAdmin)
      
      const request = createMockBatchRequest([email])
      await POST(request)
      
      // Verify createUser was called with correct parameters
      expect(mockAdmin.auth.admin.createUser).toHaveBeenCalledWith({
        email,
        password: '12345678',
        email_confirm: true,
        user_metadata: {
          nama: email.split('@')[0],
          role: 'lapangan'
        }
      })
    })

    it('should extract display name from email before @ symbol', async () => {
      const email = 'john.doe@company.com'
      const expectedUser = {
        id: 'test-id',
        email,
        user_metadata: {
          nama: 'john.doe',
          role: 'lapangan' as const
        }
      }

      const mockAdmin = {
        auth: {
          admin: {
            createUser: jest.fn().mockResolvedValue(createSuccessUserResponse(expectedUser))
          }
        }
      }
      mockCreateAdminClientFn.mockReturnValue(mockAdmin)
      
      const request = createMockBatchRequest([email])
      await POST(request)
      
      expect(mockAdmin.auth.admin.createUser).toHaveBeenCalledWith({
        email,
        password: '12345678',
        email_confirm: true,
        user_metadata: {
          nama: 'john.doe',
          role: 'lapangan'
        }
      })
    })

    it('should handle unexpected errors during user creation', async () => {
      const email = 'test@example.com'
      
      const mockAdmin = {
        auth: {
          admin: {
            createUser: jest.fn().mockRejectedValue(new Error('Unexpected database error'))
          }
        }
      }
      mockCreateAdminClientFn.mockReturnValue(mockAdmin)
      
      const request = createMockBatchRequest([email])
      const response = await POST(request)
      
      const jsonResponse = await expectBatchCreationSuccess(response, 0, 1)
      expect(jsonResponse.results[0]).toEqual({
        email,
        success: false,
        error: 'Unexpected database error'
      })
    })
  })

  describe('Error Handling', () => {
    beforeEach(() => {
      // Mock authenticated admin user for error handling tests
      const adminUser = createAuthenticatedUser('superuser')
      const mockClient = mockCreateClient(adminUser)
      mockCreateClientFn.mockResolvedValue(mockClient)
    })

    it('should handle JSON parsing errors', async () => {
      const request = new Request('http://localhost:3000/api/users/batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: 'invalid json'
      }) as NextRequest
      request.json = jest.fn().mockRejectedValue(new Error('Unexpected token in JSON'))

      const response = await POST(request)
      await expectServerError(response)
    })

    it('should handle general server errors', async () => {
      // Mock admin client to throw an error
      mockCreateAdminClientFn.mockImplementation(() => {
        throw new Error('Database connection failed')
      })
      
      const request = createMockBatchRequest(['test@example.com'])
      const response = await POST(request)
      
      await expectServerError(response)
    })
  })

  describe('Edge Cases', () => {
    beforeEach(() => {
      // Mock authenticated admin user for edge case tests
      const adminUser = createAuthenticatedUser('superuser')
      const mockClient = mockCreateClient(adminUser)
      mockCreateClientFn.mockResolvedValue(mockClient)
    })

    it('should handle large batch sizes', async () => {
      const emails = Array.from({ length: 100 }, (_, i) => `user${i + 1}@example.com`)
      
      // Mock successful creation for all users
      const mockAdmin = {
        auth: {
          admin: {
            createUser: jest.fn().mockResolvedValue(createSuccessUserResponse({
              id: 'bulk-user-id',
              email: emails[0],
              user_metadata: { nama: emails[0].split('@')[0], role: 'lapangan' }
            }))
          }
        }
      }
      mockCreateAdminClientFn.mockReturnValue(mockAdmin)
      
      const request = createMockBatchRequest(emails)
      const response = await POST(request)
      
      await expectBatchCreationSuccess(response, 100, 0)
      
      // Verify createUser was called for each email
      expect(mockAdmin.auth.admin.createUser).toHaveBeenCalledTimes(100)
    })

    it('should handle emails with special characters in local part', async () => {
      const emails = ['test.user+tag@example.com', 'user_name@example.com']
      
      const mockAdmin = {
        auth: {
          admin: {
            createUser: jest.fn()
              .mockResolvedValueOnce(createSuccessUserResponse({
                id: 'user1-id',
                email: emails[0],
                user_metadata: { nama: emails[0].split('@')[0], role: 'lapangan' }
              }))
              .mockResolvedValueOnce(createSuccessUserResponse({
                id: 'user2-id',
                email: emails[1],
                user_metadata: { nama: emails[1].split('@')[0], role: 'lapangan' }
              }))
          }
        }
      }
      mockCreateAdminClientFn.mockReturnValue(mockAdmin)
      
      const request = createMockBatchRequest(emails)
      const response = await POST(request)
      
      const jsonResponse = await expectBatchCreationSuccess(response, 2, 0)
      expect(jsonResponse.results[0].user.nama).toBe('test.user+tag')
      expect(jsonResponse.results[1].user.nama).toBe('user_name')
    })

    it('should handle case-insensitive email validation', async () => {
      const emails = ['UPPERCASE@EXAMPLE.COM', 'MixedCase@Example.Com']
      
      const mockAdmin = {
        auth: {
          admin: {
            createUser: jest.fn()
              .mockResolvedValueOnce(createSuccessUserResponse({
                id: 'user1-id',
                email: emails[0],
                user_metadata: { nama: emails[0].split('@')[0], role: 'lapangan' }
              }))
              .mockResolvedValueOnce(createSuccessUserResponse({
                id: 'user2-id',
                email: emails[1],
                user_metadata: { nama: emails[1].split('@')[0], role: 'lapangan' }
              }))
          }
        }
      }
      mockCreateAdminClientFn.mockReturnValue(mockAdmin)
      
      const request = createMockBatchRequest(emails)
      const response = await POST(request)
      
      await expectBatchCreationSuccess(response, 2, 0)
    })
  })
})