"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { MainHeader } from "@/components/layout/main-header"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"

interface UserProfile {
  id: string
  nama: string
  email: string
  role: string
  signature_image_url?: string
  created_at: string
  updated_at: string
}

export default function AkunkuPage() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [signatureFile, setSignatureFile] = useState<File | null>(null)
  const [signaturePreview, setSignaturePreview] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [isUploadingSignature, setIsUploadingSignature] = useState(false)

  const supabase = createClient()

  // Helper function to get role display text and variant
  const getRoleDisplay = (role: string) => {
    switch (role) {
      case 'superuser':
        return { text: 'Super User', variant: 'destructive' as const }
      case 'backoffice':
        return { text: 'Back Office', variant: 'default' as const }
      case 'lapangan':
        return { text: 'Lapangan', variant: 'secondary' as const }
      default:
        return { text: role, variant: 'outline' as const }
    }
  }

  // Fetch user profile on component mount
  useEffect(() => {
    fetchUserProfile()
  }, [])

  const fetchUserProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        toast.error("User not authenticated")
        return
      }

      const { data: profile, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) {
        console.error('Error fetching user profile:', error)
        toast.error("Gagal memuat profil pengguna")
        return
      }

      setUserProfile(profile)
      setDisplayName(profile.nama || "")
      setEmail(profile.email || "")
      setSignaturePreview(profile.signature_image_url || "")
    } catch (error) {
      console.error('Error in fetchUserProfile:', error)
      toast.error("Terjadi kesalahan saat memuat profil")
    } finally {
      setIsLoading(false)
    }
  }

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

  const handleSaveProfile = async () => {
    if (!userProfile) return

    setIsSaving(true)
    try {
      const { error } = await supabase
        .from('users')
        .update({
          nama: displayName,
          updated_at: new Date().toISOString()
        })
        .eq('id', userProfile.id)

      if (error) {
        console.error('Error updating profile:', error)
        toast.error("Gagal memperbarui profil")
        return
      }

      setUserProfile(prev => prev ? { ...prev, nama: displayName } : null)
      toast.success("Profil berhasil diperbarui!")
    } catch (error) {
      console.error('Error in handleSaveProfile:', error)
      toast.error("Terjadi kesalahan saat memperbarui profil")
    } finally {
      setIsSaving(false)
    }
  }

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Kata sandi baru tidak cocok!")
      return
    }

    if (newPassword.length < 6) {
      toast.error("Kata sandi baru minimal 6 karakter!")
      return
    }

    setIsChangingPassword(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        toast.error("User not authenticated")
        return
      }

      // First verify current password by attempting to sign in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email!,
        password: currentPassword
      })

      if (signInError) {
        toast.error("Kata sandi saat ini salah!")
        return
      }

      // Update password
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      })

      if (error) {
        console.error('Error updating password:', error)
        toast.error("Gagal mengubah kata sandi")
        return
      }

      toast.success("Kata sandi berhasil diubah!")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (error) {
      console.error('Error in handlePasswordChange:', error)
      toast.error("Terjadi kesalahan saat mengubah kata sandi")
    } finally {
      setIsChangingPassword(false)
    }
  }

  const handleSignatureUpload = async () => {
    if (!signatureFile || !userProfile) return

    setIsUploadingSignature(true)
    try {
      // Generate unique filename
      const fileExt = signatureFile.name.split('.').pop()
      const fileName = `signatures/${userProfile.id}.${fileExt}`

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('signatures')
        .upload(fileName, signatureFile, {
          cacheControl: '3600',
          upsert: true
        })

      if (uploadError) {
        console.error('Error uploading signature:', uploadError)
        toast.error("Gagal mengunggah tanda tangan")
        return
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('signatures')
        .getPublicUrl(fileName)

      // Update user profile with signature URL
      const { data: updateData, error: updateError } = await supabase
        .from('users')
        .update({
          signature_image_url: publicUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', userProfile.id)
        .select() // Add .select() to return the updated data

      if (updateError) {
        console.error('Error updating signature URL:', updateError)
        toast.error("Gagal memperbarui URL tanda tangan")
        return
      }

      // Check if update was successful
      if (updateData && updateData.length > 0) {
        setUserProfile(prev => prev ? { ...prev, signature_image_url: publicUrl } : null)
        setSignaturePreview(publicUrl)
        setSignatureFile(null)
        toast.success("Tanda tangan berhasil diunggah!")
      } else {
        toast.error("Tidak ada perubahan pada profil")
      }
    } catch (error) {
      console.error('Error in handleSignatureUpload:', error)
      toast.error("Terjadi kesalahan saat mengunggah tanda tangan")
    } finally {
      setIsUploadingSignature(false)
    }
  }

  if (isLoading) {
    return (
      <div className="slide-up">
        <MainHeader
          title="Akun Saya"
          description="Kelola pengaturan dan preferensi akun Anda"
          showBackButton={true}
        />
        <main className="desktop-content-margins p-4 pt-0">
          <div className="flex items-center justify-center min-h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
              <p className="text-muted-foreground">Memuat profil...</p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="slide-up">
      <MainHeader
        title="Akun Saya"
        description="Kelola pengaturan dan preferensi akun Anda"
        showBackButton={true}
      />
      <main className="desktop-content-margins p-4 pt-0">
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
                  value={email}
                  disabled
                  className="bg-zinc-100 dark:bg-zinc-800 cursor-not-allowed"
                />
              </div>
              {userProfile && (
                <div className="space-y-2">
                  <Label>Role</Label>
                  <div className="flex items-center space-x-2">
                    <Badge variant={getRoleDisplay(userProfile.role).variant}>
                      {getRoleDisplay(userProfile.role).text}
                    </Badge>
                    <span className="text-sm text-muted-foreground">(Tidak dapat diubah)</span>
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="displayName">Nama Tampilan</Label>
                <Input
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Masukkan nama tampilan Anda"
                />
              </div>
              <Button
                onClick={handleSaveProfile}
                className="w-full"
                disabled={isSaving || !displayName.trim()}
              >
                {isSaving ? "Menyimpan..." : "Simpan Profil"}
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
              <Button
                onClick={handlePasswordChange}
                className="w-full"
                disabled={isChangingPassword || !currentPassword || !newPassword || !confirmPassword}
              >
                {isChangingPassword ? "Mengubah..." : "Ubah Kata Sandi"}
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
              <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-4">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Penting:</strong> Pastikan gambar tanda tangan Anda memiliki background transparan.
                  Gunakan tools seperti <a
                    href="https://www.remove.bg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono bg-blue-100 dark:bg-blue-900 px-1 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors underline"
                  >
                    remove.bg
                  </a> atau
                  editor gambar lainnya untuk membuat background transparan sebelum mengunggah.
                </p>
              </div>
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
                disabled={!signatureFile || isUploadingSignature}
              >
                {isUploadingSignature ? "Mengunggah..." : "Unggah Tanda Tangan"}
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}