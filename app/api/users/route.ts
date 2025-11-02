import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

// Types for API responses
interface UserResponse {
  id: string
  nama: string
  email: string
  role: 'lapangan' | 'backoffice' | 'superuser'
  signature_image_url?: string
  created_at?: string
  updated_at?: string
}

interface UsersListResponse {
  success: boolean
  data: UserResponse[]
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

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

export async function GET(request: NextRequest) {
  try {
    // Verify the current user is authenticated and has proper role
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

    // Parse query parameters for pagination and filtering
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const search = searchParams.get('search') || ''
    const role = searchParams.get('role') || ''
    const sortBy = searchParams.get('sortBy') || 'created_at'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    // Validate pagination parameters
    const validLimit = Math.min(Math.max(limit, 1), 100) // Max 100 items per page
    const validPage = Math.max(page, 1)
    const offset = (validPage - 1) * validLimit

    // Build query
    let query = supabase
      .from('users')
      .select('*', { count: 'exact' })
      .is('deleted_at', null) // Only get non-deleted users

    // Apply search filter (search by nama or email)
    if (search) {
      query = query.or(`nama.ilike.%${search}%,email.ilike.%${search}%`)
    }

    // Apply role filter
    if (role && ['lapangan', 'backoffice', 'superuser'].includes(role)) {
      query = query.eq('role', role)
    }

    // Apply sorting
    const validSortFields = ['nama', 'email', 'role', 'created_at', 'updated_at']
    const validSortField = validSortFields.includes(sortBy) ? sortBy : 'created_at'
    const validSortOrder = ['asc', 'desc'].includes(sortOrder) ? sortOrder : 'desc'
    
    query = query.order(validSortField, { ascending: validSortOrder === 'asc' })

    // Apply pagination
    query = query.range(offset, offset + validLimit - 1)

    const { data: users, error, count } = await query

    if (error) {
      console.error('Error fetching users:', error)
      return NextResponse.json(
        { error: 'Failed to fetch users' },
        { status: 500 }
      )
    }

    // Transform data to match UserResponse interface
    const transformedUsers: UserResponse[] = (users || []).map(user => ({
      id: user.id,
      nama: user.nama,
      email: user.email,
      role: user.role,
      signature_image_url: user.signature_image_url,
      created_at: user.created_at,
      updated_at: user.updated_at
    }))

    // Build response with pagination
    const response: UsersListResponse = {
      success: true,
      data: transformedUsers,
      pagination: {
        page: validPage,
        limit: validLimit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / validLimit)
      }
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('Error in GET /api/users:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
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