import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Security validation for nama field
const validateNama = (nama: string): boolean => {
  // Check for potentially dangerous characters/patterns
  const dangerousPatterns = [
    /<script/i,
    /<[^>]*>/, // General HTML tags (catches <br>, <div>, etc.)
    /javascript:/i,
    /on\w+\s*=/i,
    /['"]\s*;\s*drop/i,
    /union\s+select/i,
    /insert\s+into/i,
    /delete\s+from/i,
    /update\s+set/i
  ]
  
  return !dangerousPatterns.some(pattern => pattern.test(nama))
}

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

    if (authError || !user || !['backoffice', 'superuser'].includes(user.user_metadata.role)) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { nama, email, password, role } = body

    // Validate required fields
    if (!nama || !email || !password || !role) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Email format validation
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Role validation
    const validRoles = ['superuser', 'backoffice', 'lapangan']
    if (!validRoles.includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role' },
        { status: 400 }
      )
    }

    // Security validation for nama
    if (!validateNama(nama)) {
      return NextResponse.json(
        { error: 'Invalid input data' },
        { status: 400 }
      )
    }

    // Business logic validation: role hierarchy
    const currentUserRole = user.user_metadata.role
    
    // Backoffice users cannot create superuser users
    if (currentUserRole === 'backoffice' && role === 'superuser') {
      return NextResponse.json(
        { error: 'Backoffice cannot create superuser' },
        { status: 403 }
      )
    }

    // Create user using admin client
    const adminClient = createAdminClient()
    const { data: authData, error: createError } = await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email since admin is creating the user
      user_metadata: {
        nama,
        role
      }
    })

    if (createError) {
      // Check for duplicate email error
      if (createError.message.includes('already registered') || createError.message.includes('duplicate')) {
        return NextResponse.json(
          { error: 'User already registered' },
          { status: 400 }
        )
      }
      return NextResponse.json(
        { error: createError.message },
        { status: 400 }
      )
    }

    // The trigger will automatically create user profile in users table
    // No manual insertion needed since trigger handles it
    console.log("User created successfully:", authData.user.email)

    return NextResponse.json({
      success: true,
      user: {
        id: authData.user.id,
        nama,
        email,
        role
      }
    })

  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}