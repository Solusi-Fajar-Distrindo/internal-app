"use client"

import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, User, Bell } from "lucide-react"

export function SettingsView() {
  const router = useRouter()

  const settings = [
    {
      title: "Manajemen Pengguna",
      description: "Kelola akun pengguna dan izin akses",
      content: "Tambah, edit, atau hapus pengguna dan konfigurasi tingkat akses",
      icon: Users
    },
    {
      title: "Akun Saya",
      description: "Kelola pengaturan akun Anda",
      content: "Perbarui profil, kata sandi, dan pengaturan keamanan",
      icon: User
    },
    {
      title: "Notifikasi",
      description: "Konfigurasi preferensi notifikasi",
      content: "Kontrol peringatan, suara, dan waktu notifikasi",
      icon: Bell,
      badge: "Segera Tiba"
    }
  ]

  return (
    <div className="slide-up">
      <main className="p-4 pt-0">
        <section className="prose mx-auto max-w-none text-center sm:text-left mb-6">
          <h2 className="text-2xl font-semibold text-black dark:text-zinc-50">Pengaturan</h2>
          <p className="text-zinc-600 dark:text-zinc-400">Kelola preferensi aplikasi Anda</p>
        </section>

        <section className="grid gap-3">
          {settings.map((setting, index) => (
            <Card
              key={index}
              className={`transition-all duration-200 hover:scale-[1.02] hover:shadow-md active:scale-[0.98] ${setting.badge ? "cursor-not-allowed opacity-75" : "cursor-pointer"
                }`}
              onClick={() => {
                if (setting.title === "Akun Saya") {
                  router.push("/akunku")
                } else if (setting.title === "Manajemen Pengguna") {
                  router.push("/pengaturan/manajemen-pengguna")
                }
              }}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <setting.icon className="h-4 w-4 text-primary" />
                    </div>
                    <CardTitle>{setting.title}</CardTitle>
                  </div>
                  {setting.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {setting.badge}
                    </Badge>
                  )}
                </div>
                <CardDescription>{setting.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{setting.content}</p>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>
    </div>
  )
}