"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function AkunkuPage() {
  const [displayName, setDisplayName] = useState("John Doe")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [signatureFile, setSignatureFile] = useState<File | null>(null)
  const [signaturePreview, setSignaturePreview] = useState("/api/placeholder/200/100")

  const handleSignatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSignatureFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setSignaturePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveProfile = () => {
    // Handle profile save logic here
    console.log("Saving profile:", { displayName })
    alert("Profil berhasil diperbarui!")
  }

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert("Kata sandi baru tidak cocok!")
      return
    }
    // Handle password change logic here
    console.log("Changing password")
    alert("Kata sandi berhasil diubah!")
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  const handleSignatureUpload = () => {
    if (signatureFile) {
      // Handle signature upload logic here
      console.log("Uploading signature:", signatureFile)
      alert("Tanda tangan berhasil diunggah!")
    }
  }

  return (
    <div className="slide-up">
      <main className="p-4 pt-0">
        <section className="prose mx-auto max-w-none text-center sm:text-left mb-6">
          <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">Akun Saya</h1>
          <p className="text-zinc-600 dark:text-zinc-400">Kelola pengaturan dan preferensi akun Anda</p>
        </section>

        <section className="space-y-6">
          {/* Profile Information */}
          <Card>
            <CardHeader>
              <CardTitle>Informasi Profil</CardTitle>
              <CardDescription>Perbarui nama tampilan dan informasi pribadi Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value="john.doe@example.com"
                  disabled
                  className="bg-zinc-100 dark:bg-zinc-800 cursor-not-allowed"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="displayName">Nama Tampilan</Label>
                <Input
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Masukkan nama tampilan Anda"
                />
              </div>
              <Button onClick={handleSaveProfile} className="w-full">
                Simpan Profil
              </Button>
            </CardContent>
          </Card>

          {/* Password Change */}
          <Card>
            <CardHeader>
              <CardTitle>Ubah Kata Sandi</CardTitle>
              <CardDescription>Perbarui kata sandi Anda untuk menjaga keamanan akun</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Kata Sandi Saat Ini</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Masukkan kata sandi saat ini"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">Kata Sandi Baru</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Masukkan kata sandi baru"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Konfirmasi Kata Sandi Baru</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Konfirmasi kata sandi baru"
                />
              </div>
              <Button onClick={handlePasswordChange} className="w-full">
                Ubah Kata Sandi
              </Button>
            </CardContent>
          </Card>

          {/* Signature Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Tanda Tangan Digital</CardTitle>
              <CardDescription>Unggah tanda tangan digital Anda untuk dokumen</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signature">Gambar Tanda Tangan</Label>
                <Input
                  id="signature"
                  type="file"
                  accept="image/*"
                  onChange={handleSignatureChange}
                  className="cursor-pointer"
                />
              </div>
              {signaturePreview && (
                <div className="space-y-2">
                  <Label>Pratinjau</Label>
                  <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg p-4">
                    <img
                      src={signaturePreview}
                      alt="Pratinjau tanda tangan"
                      className="max-h-24 mx-auto object-contain"
                    />
                  </div>
                </div>
              )}
              <Button 
                onClick={handleSignatureUpload} 
                className="w-full"
                disabled={!signatureFile}
              >
                Unggah Tanda Tangan
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}