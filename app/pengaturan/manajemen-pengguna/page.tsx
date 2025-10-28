"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MainHeader } from "@/components/main-header"
import { AddUserDialog } from "@/components/add-user-dialog"
import { Edit, Trash2, Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

// Sample user data
const users = [
  {
    id: 1,
    nama: "Ahmad Wijaya",
    email: "ahmad.wijaya@example.com",
    password: "********",
    signatureImage: "/api/placeholder/150/50"
  },
  {
    id: 2,
    nama: "Siti Nurhaliza",
    email: "siti.nurhaliza@example.com",
    password: "********",
    signatureImage: "/api/placeholder/150/50"
  },
  {
    id: 3,
    nama: "Budi Santoso",
    email: "budi.santoso@example.com",
    password: "********",
    signatureImage: "/api/placeholder/150/50"
  },
  {
    id: 4,
    nama: "Dewi Lestari",
    email: "dewi.lestari@example.com",
    password: "********",
    signatureImage: "/api/placeholder/150/50"
  },
  {
    id: 5,
    nama: "Eko Prasetyo",
    email: "eko.prasetyo@example.com",
    password: "********",
    signatureImage: "/api/placeholder/150/50"
  }
]

export default function ManajemenPenggunaPage() {
  const router = useRouter()
  const [showPasswords, setShowPasswords] = useState<{ [key: number]: boolean }>({})

  const togglePasswordVisibility = (userId: number) => {
    setShowPasswords(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }))
  }

  const handleAddUser = (newUser: any) => {
    // Here you would typically send the data to your API
    console.log('Adding user:', newUser)
    
    // For now, just log the data
    // In a real app, you would update the users array here
  }

  return (
    <div className="slide-up">
      <MainHeader 
        title="Manajemen Pengguna"
        description="Kelola akun pengguna dan izin akses"
      />
      <main className="p-4 pt-0">

        {/* Users Table */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="min-w-0">
                <CardTitle className="text-lg sm:text-xl">Daftar Pengguna</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Total {users.length} pengguna terdaftar
                </CardDescription>
              </div>
              <AddUserDialog onAddUser={handleAddUser} />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap px-4 py-3">Nama</TableHead>
                    <TableHead className="whitespace-nowrap px-4 py-3">Email</TableHead>
                    <TableHead className="whitespace-nowrap px-4 py-3">Password</TableHead>
                    <TableHead className="whitespace-nowrap px-4 py-3">Tanda Tangan</TableHead>
                    <TableHead className="whitespace-nowrap text-right px-4 py-3 pr-6">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium px-4 py-4">{user.nama}</TableCell>
                    <TableCell className="px-4 py-4">{user.email}</TableCell>
                    <TableCell className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm">
                          {showPasswords[user.id] ? "password123" : user.password}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => togglePasswordVisibility(user.id)}
                          className="h-7 w-7 p-0 hover:bg-muted cursor-pointer"
                        >
                          {showPasswords[user.id] ? (
                            <EyeOff className="h-3 w-3" />
                          ) : (
                            <Eye className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-8 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
                          <img 
                            src={user.signatureImage} 
                            alt="Signature" 
                            className="max-w-full max-h-full object-contain"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.nextElementSibling?.classList.remove('hidden');
                            }}
                          />
                          <span className="hidden">No Image</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          Tersedia
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-right px-4 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-muted cursor-pointer"
                          title="Lihat Detail"
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-muted cursor-pointer"
                          title="Edit"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                          title="Hapus"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}