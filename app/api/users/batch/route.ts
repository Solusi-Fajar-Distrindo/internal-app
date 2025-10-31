import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Verify the current user is authenticated and is an admin
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    if (!['backoffice', 'superuser'].includes(user.user_metadata.role)) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { emails } = body

    // Validate required fields
    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return NextResponse.json(
        { error: 'Emails array is required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const invalidEmails = emails.filter(email => !emailRegex.test(email))
    
    if (invalidEmails.length > 0) {
      return NextResponse.json(
        { error: 'Invalid email format', invalidEmails },
        { status: 400 }
      )
    }

    const adminClient = createAdminClient()
    const results = []
    const defaultPassword = "12345678"

    for (const email of emails) {
      try {
        // Extract display name from email (before @)
        const displayName = email.split('@')[0]
        
        // Create user using admin client
        const { data: authData, error: createError } = await adminClient.auth.admin.createUser({
          email,
          password: defaultPassword,
          email_confirm: true, // Auto-confirm email since admin is creating the user
          user_metadata: {
            nama: displayName,
            role: 'lapangan' // Default role
          }
        })

        if (createError) {
          results.push({
            email,
            success: false,
            error: createError.message
          })
        } else {
          results.push({
            email,
            success: true,
            user: {
              id: authData.user.id,
              nama: displayName,
              email,
              role: 'lapangan'
            }
          })
        }
      } catch (error) {
        results.push({
          email,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        })
      }
    }

    const successCount = results.filter(r => r.success).length
    const failureCount = results.length - successCount

    return NextResponse.json({
      success: true,
      message: `Successfully created ${successCount} users${failureCount > 0 ? ` (${failureCount} failed)` : ''}`,
      results
    })

  } catch (error) {
    console.error('Error creating multiple users:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}