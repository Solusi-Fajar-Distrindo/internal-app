"use client"

import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MainHeader } from "@/components/layout/main-header"
import { CheckCircle } from "lucide-react"

export default function SuksesPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans">
      <MainHeader
        title="Berhasil"
        description="Form absensi berhasil disubmit"
      />

      <main className="desktop-container desktop-content-margins pb-28 pt-6">
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">
                  Form Berhasil Disubmit!
                </h2>
                <p className="text-muted-foreground">
                  Data absensi aktivitas harian Anda telah berhasil disimpan ke sistem.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-center">
                Apa yang ingin Anda lakukan selanjutnya?
              </h3>
              
              <div className="grid grid-cols-1 gap-4">
                <Button
                  onClick={() => router.push('/home')}
                  className="w-full cursor-pointer"
                  variant="default"
                >
                  Kembali ke Beranda
                </Button>
                
                <Button
                  onClick={() => router.push('/forms/aktivitas-harian')}
                  className="w-full cursor-pointer"
                  variant="secondary"
                >
                  Isi Form Lagi
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}