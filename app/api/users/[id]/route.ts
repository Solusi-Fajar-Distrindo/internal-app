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

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const { id: userId } = await params

    const body = await request.json()
    const { nama, email, role, signature_image_url } = body

    // Validate at least one field is provided
    if (!nama && !email && !role && signature_image_url === undefined) {
      return NextResponse.json(
        { error: 'At least one field must be provided for update' },
        { status: 400 }
      )
    }

    // Get the target user to check current role and permissions
    const adminClient = createAdminClient()
    const { data: targetUser, error: fetchError } = await adminClient
      .from('users')
      .select('*')
      .eq('id', userId)
      .is('deleted_at', null)
      .single()

    if (fetchError || !targetUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Business logic validation: role hierarchy
    const currentUserRole = user.user_metadata.role
    const targetUserRole = targetUser.role

    // Backoffice users cannot update superuser users
    if (currentUserRole === 'backoffice' && targetUserRole === 'superuser') {
      return NextResponse.json(
        { error: 'Backoffice cannot update superuser' },
        { status: 403 }
      )
    }

    // Backoffice users cannot upgrade other users to superuser
    if (currentUserRole === 'backoffice' && role === 'superuser') {
      return NextResponse.json(
        { error: 'Backoffice cannot assign superuser role' },
        { status: 403 }
      )
    }

    // Users cannot change their own role (prevent privilege escalation)
    if (user.id === userId && role && role !== currentUserRole) {
      return NextResponse.json(
        { error: 'Cannot change your own role' },
        { status: 403 }
      )
    }

    // Validate email format if provided
    if (email && !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate role if provided
    if (role) {
      const validRoles = ['superuser', 'backoffice', 'lapangan']
      if (!validRoles.includes(role)) {
        return NextResponse.json(
          { error: 'Invalid role' },
          { status: 400 }
        )
      }
    }

    // Security validation for nama if provided
    if (nama && !validateNama(nama)) {
      return NextResponse.json(
        { error: 'Invalid input data' },
        { status: 400 }
      )
    }

    // Check for duplicate email if email is being changed
    if (email && email !== targetUser.email) {
      const { data: existingUser, error: emailCheckError } = await adminClient
        .from('users')
        .select('id')
        .eq('email', email)
        .is('deleted_at', null)
        .single()

      if (emailCheckError && emailCheckError.code !== 'PGRST116') { // PGRST116 is "not found"
        return NextResponse.json(
          { error: 'Error checking email uniqueness' },
          { status: 500 }
        )
      }

      if (existingUser) {
        return NextResponse.json(
          { error: 'Email already exists' },
          { status: 400 }
        )
      }
    }

    // Prepare update data
    const updateData: {
      nama?: string
      email?: string
      role?: string
      signature_image_url?: string | null
      updated_at: string
    } = {
      updated_at: new Date().toISOString()
    }

    if (nama !== undefined) updateData.nama = nama
    if (email !== undefined) updateData.email = email
    if (role !== undefined) updateData.role = role
    if (signature_image_url !== undefined) updateData.signature_image_url = signature_image_url

    // Update user in database
    const { data: updatedUser, error: updateError } = await adminClient
      .from('users')
      .update(updateData)
      .eq('id', userId)
      .select()
      .single()

    if (updateError) {
      console.error('Error updating user:', updateError)
      return NextResponse.json(
        { error: 'Failed to update user' },
        { status: 500 }
      )
    }

    // If email was changed, update it in auth as well
    if (email && email !== targetUser.email) {
      const { error: authUpdateError } = await adminClient.auth.admin.updateUserById(
        userId,
        { email }
      )

      if (authUpdateError) {
        console.error('Error updating user email in auth:', authUpdateError)
        // Note: We don't fail the whole operation if auth update fails,
        // but we log it for monitoring purposes
      }
    }

    return NextResponse.json({
      success: true,
      message: 'User updated successfully',
      user: {
        id: updatedUser.id,
        nama: updatedUser.nama,
        email: updatedUser.email,
        role: updatedUser.role,
        signature_image_url: updatedUser.signature_image_url,
        updated_at: updatedUser.updated_at
      }
    })

  } catch (error) {
    console.error('Error in PATCH /api/users/[id]:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id: userId } = await params

    // Get the target user to check current role and permissions
    const adminClient = createAdminClient()
    const { data: targetUser, error: fetchError } = await adminClient
      .from('users')
      .select('*')
      .eq('id', userId)
      .is('deleted_at', null)
      .single()

    if (fetchError || !targetUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Business logic validation: role hierarchy
    const currentUserRole = user.user_metadata.role
    const targetUserRole = targetUser.role

    // Backoffice users cannot delete superuser users
    if (currentUserRole === 'backoffice' && targetUserRole === 'superuser') {
      return NextResponse.json(
        { error: 'Backoffice cannot delete superuser' },
        { status: 403 }
      )
    }

    // Users cannot delete themselves
    if (user.id === userId) {
      return NextResponse.json(
        { error: 'Cannot delete your own account' },
        { status: 403 }
      )
    }

    // Perform soft delete by setting deleted_at timestamp
    const { error: deleteError } = await adminClient
      .from('users')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', userId)

    if (deleteError) {
      console.error('Error soft deleting user:', deleteError)
      return NextResponse.json(
        { error: 'Failed to delete user' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully',
      user: {
        id: targetUser.id,
        nama: targetUser.nama,
        email: targetUser.email,
        role: targetUser.role
      }
    })

  } catch (error) {
    console.error('Error in DELETE /api/users/[id]:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}