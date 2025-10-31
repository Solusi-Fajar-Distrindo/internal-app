// Mock for google-auth-library module
/* eslint-disable @typescript-eslint/no-unused-vars */
export class JWT {
  constructor(_options: {
    email: string;
    key: string;
    scopes: string[];
  }) {
    // Mock constructor
  }

  async authorize(): Promise<void> {
    // Mock implementation
  }
}

export default JWT