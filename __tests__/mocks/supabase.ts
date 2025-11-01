// Mock implementations for Supabase clients and related utilities

export interface MockUser {
  id: string
  email: string
  user_metadata: {
    nama: string
    role: 'superuser' | 'backoffice' | 'lapangan'
  }
}

export interface MockAuthResponse {
  data: { user: MockUser | null }
  error: { message: string } | null
}

export interface MockCreateUserResponse {
  data: { user: MockUser }
  error: { message: string } | null
}

// Mock user data for testing
export const mockUsers: Record<string, MockUser> = {
  superuser: {
    id: 'test-superuser-id',
    email: 'superuser@test.com',
    user_metadata: {
      nama: 'Test Superuser',
      role: 'superuser'
    }
  },
  backoffice: {
    id: 'test-backoffice-id',
    email: 'backoffice@test.com',
    user_metadata: {
      nama: 'Test Backoffice',
      role: 'backoffice'
    }
  },
  lapangan: {
    id: 'test-lapangan-id',
    email: 'lapangan@test.com',
    user_metadata: {
      nama: 'Test Lapangan',
      role: 'lapangan'
    }
  },
  newUser: {
    id: 'test-newuser-id',
    email: 'newuser@test.com',
    user_metadata: {
      nama: 'Test New User',
      role: 'backoffice'
    }
  }
}

// Mock server client (for authentication)
export const createMockSupabaseServer = (user: MockUser | null = null, authError: { message: string } | null = null) => ({
  auth: {
    getUser: jest.fn().mockResolvedValue({
      data: { user },
      error: authError
    })
  }
})

// Mock admin client (for user creation)
export const createMockSupabaseAdmin = (createUserResponse: MockCreateUserResponse) => ({
  auth: {
    admin: {
      createUser: jest.fn().mockResolvedValue(createUserResponse)
    }
  }
})

// Helper to create successful user creation response
export const createSuccessUserResponse = (user: MockUser): MockCreateUserResponse => ({
  data: { user },
  error: null
})

// Helper to create error user creation response
export const createErrorUserResponse = (errorMessage: string): MockCreateUserResponse => ({
  data: { user: {} as MockUser },
  error: { message: errorMessage }
})

// Helper to create authentication error response
export const createAuthErrorResponse = (errorMessage: string): MockAuthResponse => ({
  data: { user: null },
  error: { message: errorMessage }
})

// Mock module factory functions
let mockServerClient: ReturnType<typeof createMockSupabaseServer> | null = null
let mockAdminClient: ReturnType<typeof createMockSupabaseAdmin> | null = null

export const mockCreateClient = (user: MockUser | null = null, authError: { message: string } | null = null) => {
  mockServerClient = createMockSupabaseServer(user, authError)
  return mockServerClient
}

export const mockCreateAdminClient = (createUserResponse: MockCreateUserResponse) => {
  mockAdminClient = createMockSupabaseAdmin(createUserResponse)
  return mockAdminClient
}

// Reset all Supabase mocks
export const resetSupabaseMocks = () => {
  jest.clearAllMocks()
  mockServerClient = null
  mockAdminClient = null
}

// Export mock getters for the module mocks
export const getMockServerClient = () => mockServerClient
export const getMockAdminClient = () => mockAdminClient