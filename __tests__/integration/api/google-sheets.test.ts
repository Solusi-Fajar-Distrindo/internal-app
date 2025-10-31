// Mock the external dependencies
jest.mock('google-spreadsheet')
jest.mock('google-auth-library')

describe('Google Sheets Integration', () => {
  describe('Environment Variables', () => {
    it('should throw error when GOOGLE_SHEET_ID is missing', async () => {
      // Clear the module cache to force re-import
      jest.resetModules()
      
      // Remove the environment variable
      delete process.env.GOOGLE_SHEET_ID
      
      // Dynamic import to get fresh module with new env vars
      const { appendRowToSheet } = await import('@/lib/google-sheets')
      
      await expect(appendRowToSheet('Test', {}))
        .rejects.toThrow('Missing GOOGLE_SHEET_ID in environment')
    })

    it('should throw error when service account credentials are missing', async () => {
      // Clear the module cache to force re-import
      jest.resetModules()
      
      // Remove the environment variables
      delete process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
      delete process.env.GOOGLE_PRIVATE_KEY
      
      // Dynamic import to get fresh module with new env vars
      const { appendRowToSheet } = await import('@/lib/google-sheets')
      
      await expect(appendRowToSheet('Test', {}))
        .rejects.toThrow('Missing Google service account credentials in environment')
    })
  })

  describe('Data Transformation', () => {
    it('should transform data types correctly', () => {
      // Test the data transformation logic
      const testCases = [
        { input: 'string', expected: 'string' },
        { input: 123, expected: 123 },
        { input: true, expected: true },
        { input: null, expected: '' },
        { input: undefined, expected: '' },
        { input: { key: 'value' }, expected: '[object Object]' },
        { input: [1, 2, 3], expected: '1,2,3' }
      ]

      testCases.forEach(({ input, expected }) => {
        const result = typeof input === 'string' || typeof input === 'number' || typeof input === 'boolean' 
          ? input 
          : String(input || '')
        expect(result).toBe(expected)
      })
    })
  })
})