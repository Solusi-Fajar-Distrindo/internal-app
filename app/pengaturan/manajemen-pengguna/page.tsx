"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MainHeader } from "@/components/main-header"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash2, Eye, EyeOff, Upload, X } from "lucide-react"
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
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newUser, setNewUser] = useState({
    nama: '',
    email: '',
    password: '',
    signatureImage: null as File | null
  })

  const togglePasswordVisibility = (userId: number) => {
    setShowPasswords(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }))
  }

  const handleAddUser = () => {
    // Here you would typically send the data to your API
    console.log('Adding user:', newUser)
    
    // For now, just close the dialog and reset form
    setIsAddDialogOpen(false)
    setNewUser({
      nama: '',
      email: '',
      password: '',
      signatureImage: null
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setNewUser(prev => ({ ...prev, signatureImage: file }))
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
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2 w-full sm:w-auto shrink-0 cursor-pointer">
                    <Plus className="h-4 w-4" />
                    <span className="hidden sm:inline">Tambah Pengguna</span>
                    <span className="sm:hidden">Tambah</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Tambah Pengguna Baru</DialogTitle>
                    <DialogDescription>
                      Tambahkan pengguna baru ke dalam sistem. Isi semua informasi yang diperlukan.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="nama">Nama Lengkap</Label>
                      <Input
                        id="nama"
                        placeholder="Masukkan nama lengkap"
                        value={newUser.nama}
                        onChange={(e) => setNewUser(prev => ({ ...prev, nama: e.target.value }))}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="nama@example.com"
                        value={newUser.email}
                        onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Masukkan password"
                        value={newUser.password}
                        onChange={(e) => setNewUser(prev => ({ ...prev, password: e.target.value }))}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="signature">Tanda Tangan</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="signature"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                        />
                        {newUser.signatureImage && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setNewUser(prev => ({ ...prev, signatureImage: null }))}
                            className="flex items-center gap-1 cursor-pointer"
                          >
                            <X className="h-3 w-3" />
                            Hapus
                          </Button>
                        )}
                      </div>
                      {newUser.signatureImage && (
                        <p className="text-xs text-muted-foreground">
                          File dipilih: {newUser.signatureImage.name}
                        </p>
                      )}
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsAddDialogOpen(false)}
                      className="cursor-pointer"
                    >
                      Batal
                    </Button>
                    <Button 
                      type="button" 
                      onClick={handleAddUser}
                      disabled={!newUser.nama || !newUser.email || !newUser.password}
                      className="cursor-pointer"
                    >
                      Tambah Pengguna
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
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
                    <TableHead className="whitespace-nowrap text-right px-4 py-3">Aksi</TableHead>
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