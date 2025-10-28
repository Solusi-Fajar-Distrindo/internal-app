"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, X } from "lucide-react"
import { useState } from "react"

interface NewUser {
  nama: string
  email: string
  password: string
  signatureImage: File | null
}

interface AddUserDialogProps {
  onAddUser: (user: NewUser) => void
  trigger?: React.ReactNode
}

export function AddUserDialog({ onAddUser, trigger }: AddUserDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [newUser, setNewUser] = useState<NewUser>({
    nama: '',
    email: '',
    password: '',
    signatureImage: null
  })

  const handleAddUser = () => {
    if (!newUser.nama || !newUser.email || !newUser.password) {
      return
    }
    
    onAddUser(newUser)
    setIsOpen(false)
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

  const handleClose = () => {
    setIsOpen(false)
    setNewUser({
      nama: '',
      email: '',
      password: '',
      signatureImage: null
    })
  }

  const defaultTrigger = (
    <Button className="flex items-center gap-2 w-full sm:w-auto shrink-0 cursor-pointer">
      <Plus className="h-4 w-4" />
      <span className="hidden sm:inline">Tambah Pengguna</span>
      <span className="sm:hidden">Tambah</span>
    </Button>
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
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
            onClick={handleClose}
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
  )
}