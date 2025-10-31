import { NextResponse } from 'next/server'
import { appendRowToSheet } from '@/lib/google-sheets'
import { mapFormToSheetRow } from '@/lib/forms/aktivitas-harian-to-row'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { formData, selectedDate } = body

    if (!formData) {
      return NextResponse.json({ success: false, error: 'Missing formData' }, { status: 400 })
    }

    const selected = selectedDate ? new Date(selectedDate) : undefined
    const row = mapFormToSheetRow(formData, selected)

    await appendRowToSheet('Aktivitas Harian Log', row)

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    console.error('Error in submit-aktivitas-harian:', err)
    const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 })
  }
}
