"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MainHeader } from "@/components/layout/main-header"
import { AddUserDialog } from "@/components/user-management/add-user-dialog"
import { AddMultipleUsersDialog } from "@/components/user-management/add-multiple-users-dialog"
import { EditUserDialog } from "@/components/user-management/edit-user-dialog"
import { DeleteUserDialog } from "@/components/user-management/delete-user-dialog"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

// Define user type based on database schema
type User = {
  id: string
  nama: string
  email: string
  role: 'lapangan' | 'backoffice' | 'superuser'
  signature_image_url?: string
  created_at?: string
  updated_at?: string
  deleted_at?: string
}

export default function ManajemenPenggunaPage() {
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)
  const supabase = createClient()

  // Adapter function to convert database User to dialog User type
  const userToDialogUser = (user: User) => ({
    id: user.id || "",
    nama: user.nama,
    email: user.email,
    password: '', // Password not stored in database
    role: user.role,
    signatureImage: user.signature_image_url || null
  })

  // Check user authorization
  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()

        if (!user || !['backoffice', 'superuser'].includes(user.user_metadata.role)) {
          router.push('/')
          return
        }

        setUserRole(user.user_metadata.role)
        setAuthorized(true)
      } catch (error) {
        console.error('Error checking authorization:', error)
        setLoading(false) // Stop loading on error
        router.push('/')
      }
    }

    checkAuthorization()
  }, [supabase, router])

  // Fetch users from API
  useEffect(() => {
    if (!authorized) return

    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users?sortBy=created_at&sortOrder=desc')
        const result = await response.json()

        if (!response.ok) {
          console.error('Error fetching users:', result.error)
        } else {
          setUsers(result.data || [])
        }
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [authorized])



  const handleAddUser = async (newUser: any) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      })

      const result = await response.json()

      if (!response.ok) {
        console.error('Error adding user:', result.error)
        // You might want to show a toast notification here
        return
      }

      console.log('User added successfully:', result)

      // Refresh the users list to show the newly created user
      try {
        const response = await fetch('/api/users?sortBy=created_at&sortOrder=desc')
        const refreshResult = await response.json()

        if (response.ok) {
          setUsers(refreshResult.data || [])
        } else {
          console.error('Error refreshing users:', refreshResult.error)
        }
      } catch (error) {
        console.error('Error refreshing users:', error)
      }

  // You might want to show a success toast notification here

    } catch (error) {
      console.error('Error:', error)
    // You might want to show an error toast notification here
    }
  }

  const handleUpdateUser = async (updatedUser: User) => {
    try {
      const { error } = await supabase
        .from('users')
        .update({
          nama: updatedUser.nama,
          email: updatedUser.email,
          role: updatedUser.role,
          signature_image_url: updatedUser.signature_image_url,
          updated_at: new Date().toISOString()
        })
        .eq('id', updatedUser.id)

      if (error) {
        console.error('Error updating user:', error)
      } else {
        // Update the user in the local state
        setUsers(prev => prev.map(user =>
          user.id === updatedUser.id ? { ...user, ...updatedUser } : user
        ))
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleDeleteUser = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('users')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', userId)

      if (error) {
        console.error('Error soft deleting user:', error)
      } else {
        // Remove the user from the local state
        setUsers(prev => prev.filter(user => user.id !== userId))
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleAddMultipleUsers = async (emails: string[]) => {
    try {
      const response = await fetch('/api/users/batch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emails }),
      })

      const result = await response.json()

      if (!response.ok) {
        console.error('Error adding multiple users:', result.error)
        // You might want to show a toast notification here
        return
      }

      console.log('Multiple users result:', result)

      // Refresh the users list to show the newly created users
      try {
        const response = await fetch('/api/users?sortBy=created_at&sortOrder=desc')
        const refreshResult = await response.json()

        if (response.ok) {
          setUsers(refreshResult.data || [])
        } else {
          console.error('Error refreshing users:', refreshResult.error)
        }
      } catch (error) {
        console.error('Error refreshing users:', error)
      }

      // You might want to show a success toast notification here
      // with details about how many succeeded/failed from result.results

    } catch (error) {
      console.error('Error:', error)
      // You might want to show an error toast notification here
    }
  }

  // Show loading or unauthorized state
  if (!authorized) {
    return (
      <div className="slide-up">
        <MainHeader
          title="Manajemen Pengguna"
          description="Kelola akun pengguna dan izin akses"
        />
        <main className="desktop-content-margins p-4 pt-0">
          <Card>
            <CardContent className="flex items-center justify-center py-8">
              <div className="text-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto mb-2"></div>
                <p className="text-muted-foreground">Memeriksa izin akses...</p>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="slide-up">
      <MainHeader 
        title="Manajemen Pengguna"
        description="Kelola akun pengguna dan izin akses"
      />
      <main className="desktop-content-margins p-4 pt-0">

        {/* Users Header Card */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="min-w-0">
                <CardTitle className="text-lg sm:text-xl">Daftar Pengguna</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Total {users.length} pengguna terdaftar
                </CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <AddUserDialog onAddUser={handleAddUser} />
                <AddMultipleUsersDialog onAddMultipleUsers={handleAddMultipleUsers} />
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Users Table Card */}
        <Card className="mt-6">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap px-4 py-3">Nama</TableHead>
                    <TableHead className="whitespace-nowrap px-4 py-3">Email</TableHead>
                    <TableHead className="whitespace-nowrap px-4 py-3">Role</TableHead>
                    <TableHead className="whitespace-nowrap px-4 py-3">Tanda Tangan</TableHead>
                    <TableHead className="whitespace-nowrap text-right px-4 py-3 pr-6">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
              <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                          <span className="ml-2">Memuat data pengguna...</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : users.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        <p className="text-muted-foreground">Tidak ada data pengguna</p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    users.map((user) => (
                      <TableRow key={user.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium px-4 py-4">{user.nama}</TableCell>
                        <TableCell className="px-4 py-4">{user.email}</TableCell>
                        <TableCell className="px-4 py-4">
                        <Badge
                          variant={
                            user.role === "superuser" ? "destructive" :
                              user.role === "backoffice" ? "default" :
                                "secondary"
                          }
                          className="capitalize"
                        >
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-8 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
                            {user.signature_image_url ? (
                              <img 
                                src={user.signature_image_url}
                                alt="Signature"
                                className="max-w-full max-h-full object-contain"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                }}
                              />
                            ) : null}
                            <span className={user.signature_image_url ? "hidden" : ""}>
                              No Image
                            </span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {user.signature_image_url ? "Tersedia" : "Tidak Ada"}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-right px-4 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <EditUserDialog
                            user={userToDialogUser(user)}
                            onUpdateUser={(updatedDialogUser) => {
                              // Convert back to database User type
                              const updatedUser: User = {
                                id: user.id,
                                nama: updatedDialogUser.nama,
                                email: updatedDialogUser.email,
                                role: updatedDialogUser.role as 'lapangan' | 'backoffice' | 'superuser',
                                signature_image_url: updatedDialogUser.signatureImage as string || undefined
                              }
                              handleUpdateUser(updatedUser)
                            }}
                          />
                          <DeleteUserDialog
                            user={userToDialogUser(user)}
                            onDeleteUser={(userId) => handleDeleteUser(user.id)}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                  )}
              </TableBody>
            </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}