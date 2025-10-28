"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, X } from "lucide-react"
import { useState, useEffect } from "react"

interface User {
  id: number
  nama: string
  email: string
  password: string
  role: string
  signatureImage: string | File | null
}

interface EditUserDialogProps {
  user: User
  onUpdateUser: (user: User) => void
  trigger?: React.ReactNode
}

export function EditUserDialog({ user, onUpdateUser, trigger }: EditUserDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [editedUser, setEditedUser] = useState<User>(user)

  useEffect(() => {
    setEditedUser(user)
  }, [user])

  const handleUpdateUser = () => {
    if (!editedUser.nama || !editedUser.email || !editedUser.password || !editedUser.role) {
      return
    }
    
    onUpdateUser(editedUser)
    setIsOpen(false)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setEditedUser(prev => ({ ...prev, signatureImage: file }))
  }

  const handleClose = () => {
    setIsOpen(false)
    setEditedUser(user)
  }

  const defaultTrigger = (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 w-8 p-0 hover:bg-muted cursor-pointer"
      title="Edit"
    >
      <Edit className="h-3 w-3" />
    </Button>
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Pengguna</DialogTitle>
          <DialogDescription>
            Perbarui informasi pengguna. Simpan perubahan untuk melanjutkan.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="nama">Nama Lengkap</Label>
            <Input
              id="nama"
              placeholder="Masukkan nama lengkap"
              value={editedUser.nama}
              onChange={(e) => setEditedUser(prev => ({ ...prev, nama: e.target.value }))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="nama@example.com"
              value={editedUser.email}
              onChange={(e) => setEditedUser(prev => ({ ...prev, email: e.target.value }))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Masukkan password"
              value={editedUser.password}
              onChange={(e) => setEditedUser(prev => ({ ...prev, password: e.target.value }))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="role">Role</Label>
            <Select value={editedUser.role} onValueChange={(value) => setEditedUser(prev => ({ ...prev, role: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lapangan">Lapangan</SelectItem>
                <SelectItem value="backoffice">Back Office</SelectItem>
                <SelectItem value="superuser">Super User</SelectItem>
              </SelectContent>
            </Select>
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
              {editedUser.signatureImage && typeof editedUser.signatureImage !== 'string' && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setEditedUser(prev => ({ ...prev, signatureImage: null }))}
                  className="flex items-center gap-1 cursor-pointer"
                >
                  <X className="h-3 w-3" />
                  Hapus
                </Button>
              )}
            </div>
            {editedUser.signatureImage && (
              <p className="text-xs text-muted-foreground">
                {typeof editedUser.signatureImage === 'string' 
                  ? 'File saat ini: Tersedia' 
                  : `File dipilih: ${(editedUser.signatureImage as File).name}`
                }
              </p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            className="cursor-pointer"
          >
            Batal
          </Button>
          <Button 
            type="button" 
            onClick={handleUpdateUser}
            disabled={!editedUser.nama || !editedUser.email || !editedUser.password || !editedUser.role}
            className="cursor-pointer"
          >
            Simpan Perubahan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}