"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"

interface HomeViewProps {
  onNavigate?: (tab: string) => void
}

export function HomeView({ onNavigate }: HomeViewProps) {
  const router = useRouter()

  return (
    <div className="slide-up">
      <section className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
        <div className="w-48 h-auto sm:w-60 shrink-0">
          <img
            src="/logo/SFD_Logo_Full_Transparent_BW.svg"
            alt="Solusi Fajar Distrindo Logo"
            className="w-full h-full object-contain dark:invert"
          />
        </div>
        <div className="prose max-w-none sm:ml-4">
          <h2 className="text-2xl font-semibold text-black dark:text-zinc-50">Selamat Datang!👋</h2>
          <p className="text-zinc-600 dark:text-zinc-400">Aplikasi Internal Solusi Fajar Distrindo</p>
        </div>
      </section>

      <section className="mt-6 grid gap-3">
        <Card
          className="cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
          onClick={() => router.push("/forms/aktivitas-harian")}
        >
          <CardHeader>
            <CardTitle>Aktivitas Harian</CardTitle>
            <CardDescription>Absensi aktivitas harian</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Klik untuk melanjutkan ke form absensi</p>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}