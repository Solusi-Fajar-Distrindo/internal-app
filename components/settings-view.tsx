"use client"

import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export function SettingsView() {
  const router = useRouter()

  const settings = [
    {
      title: "Manajemen Pengguna",
      description: "Kelola akun pengguna dan izin akses",
      content: "Tambah, edit, atau hapus pengguna dan konfigurasi tingkat akses"
    },
    {
      title: "Akun",
      description: "Kelola pengaturan akun Anda",
      content: "Perbarui profil, kata sandi, dan pengaturan keamanan"
    },
    {
      title: "Notifikasi",
      description: "Konfigurasi preferensi notifikasi",
      content: "Kontrol peringatan, suara, dan waktu notifikasi"
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
              className="cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
              onClick={() => setting.title === "Akun" && router.push("/akunku")}
            >
              <CardHeader>
                <CardTitle>{setting.title}</CardTitle>
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