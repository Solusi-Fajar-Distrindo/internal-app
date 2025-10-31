// Mock for google-spreadsheet module
/* eslint-disable @typescript-eslint/no-unused-vars */
export class GoogleSpreadsheet {
  constructor(_sheetId: string, _auth?: unknown) {
    // Mock constructor
  }

  async loadInfo(): Promise<void> {
    // Mock implementation
  }

  get sheetsByTitle(): Record<string, unknown> {
    return {
      'Test': {
        addRow: jest.fn().mockResolvedValue(undefined),
      }
    }
  }
}

export default GoogleSpreadsheet