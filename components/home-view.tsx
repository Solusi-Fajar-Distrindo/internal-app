"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

interface HomeViewProps {
  onNavigate: (tab: string) => void
}

export function HomeView({ onNavigate }: HomeViewProps) {
  return (
    <div className="slide-up">
      <section className="prose mx-auto max-w-none text-center sm:text-left">
        <h2 className="text-2xl font-semibold text-black dark:text-zinc-50">Selamat Datang!</h2>
        <p className="text-zinc-600 dark:text-zinc-400">This app is mobile-first and includes a bottom navigation bar. Use the buttons below to explore.</p>
      </section>

      <section className="mt-6 grid gap-3">
        <Card className="cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-md active:scale-[0.98]">
          <CardHeader>
            <CardTitle>Marketing - Aktivitas Harian</CardTitle>
            <CardDescription>Absensi aktivitas harian. Klik untuk melanjutkan ke form absensi</CardDescription>
          </CardHeader>
        </Card>
      </section>
    </div>
  )
}