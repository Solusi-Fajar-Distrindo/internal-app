"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MainHeader } from "@/components/main-header"
import { AddUserDialog } from "@/components/add-user-dialog"
import { AddMultipleUsersDialog } from "@/components/add-multiple-users-dialog"
import { EditUserDialog } from "@/components/edit-user-dialog"
import { DeleteUserDialog } from "@/components/delete-user-dialog"
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

  // Fetch users from Supabase
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .is('deleted_at', null)
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Error fetching users:', error)
        } else {
          setUsers(data || [])
        }
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [supabase])



  const handleAddUser = (newUser: any) => {
    // Here you would typically send the data to your API
    console.log('Adding user:', newUser)
    
    // For now, just add to the users array with a new ID
    const tempUser: User = {
      id: `temp-${Date.now()}`,
      nama: newUser.nama,
      email: newUser.email,
      role: newUser.role,
      signature_image_url: newUser.signatureImage || "/api/placeholder/150/50"
    }
    setUsers(prev => [...prev, tempUser])
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

  const handleAddMultipleUsers = (emails: string[]) => {
    console.log('Adding multiple users:', emails)

    // Create users from emails with default role
    const newUsers: User[] = emails.map((email, index) => {
      return {
        id: `temp-multi-${Date.now()}-${index}`,
        nama: email.split('@')[0], // Use email prefix as name
        email: email,
        role: "lapangan", // Default role
        signature_image_url: "/api/placeholder/150/50"
      }
    })

    setUsers(prev => [...prev, ...newUsers])
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