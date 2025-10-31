import { GoogleSpreadsheet } from "google-spreadsheet"
import { JWT } from 'google-auth-library'

let doc: GoogleSpreadsheet | null = null

async function getDoc() {
  const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID
  const SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY

  if (!SPREADSHEET_ID) {
    throw new Error('Missing GOOGLE_SHEET_ID in environment')
  }

  if (doc) return doc
  
  if (!SERVICE_ACCOUNT_EMAIL || !PRIVATE_KEY) {
    throw new Error('Missing Google service account credentials in environment')
  }

  // private key from env often contains literal "\n", convert back to real newlines
  const privateKey = PRIVATE_KEY.replace(/\\n/g, '\n')

  // Create JWT client for service account authentication
  const serviceAccountJWT = new JWT({
    email: SERVICE_ACCOUNT_EMAIL,
    key: privateKey,
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets',
      'https://www.googleapis.com/auth/drive.file'
    ]
  })

  // Initialize GoogleSpreadsheet with JWT auth
  doc = new GoogleSpreadsheet(SPREADSHEET_ID!, serviceAccountJWT)

  await doc.loadInfo()
  return doc
}

export async function appendRowToSheet(sheetTitle: string, row: Record<string, unknown>) {
  const d = await getDoc()
  await d.loadInfo()
  const sheet = d.sheetsByTitle[sheetTitle]
  if (!sheet) throw new Error(`Sheet with title "${sheetTitle}" not found`)

  // Convert row values to strings for sheet compatibility
  const stringRow: Record<string, string | number | boolean> = {}
  Object.entries(row).forEach(([key, value]) => {
    stringRow[key] = typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean' 
      ? value 
      : String(value || '')
  })

  const added = await sheet.addRow(stringRow)
  return added
}

export async function loadSheetTitles() {
  const d = await getDoc()
  return Object.values(d.sheetsById).map(s => s.title)
}

export const googleSheetsUtils = {
  appendRowToSheet,
  loadSheetTitles
}

export default googleSheetsUtils
