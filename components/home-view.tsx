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
      <section className="prose mx-auto max-w-none text-center sm:text-left">
        <h2 className="text-2xl font-semibold text-black dark:text-zinc-50">Selamat Datang!👋</h2>
        <p className="text-zinc-600 dark:text-zinc-400">Aplikasi Internal Solusi Fajar Distrindo</p>
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