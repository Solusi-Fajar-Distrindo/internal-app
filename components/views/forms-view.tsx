"use client"

import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface FormsViewProps {
  onNavigate: (tab: string) => void
}

export function FormsView({ onNavigate }: FormsViewProps) {
  const router = useRouter()

  const forms = [
    {
      title: "Pengajuan Dana Promosi",
      description: "Ajukan dana untuk kegiatan promosi",
      content: "Klik untuk mengajukan dana promosi",
      route: "/forms/dana-promosi"
    },
    {
      title: "Pengajuan Itinerary UC",
      description: "Ajukan itinerary untuk kunjungan UC",
      content: "Klik untuk mengajukan itinerary",
      route: "/forms/itinerary-uc"
    },
    {
      title: "Permintaan Sample Produk",
      description: "Request sample produk untuk pelanggan",
      content: "Klik untuk request sample produk",
      route: "/forms/sample-produk"
    },
    {
      title: "Laporan Keuangan UC",
      description: "Buat laporan keuangan kunjungan UC",
      content: "Klik untuk membuat laporan keuangan",
      route: "/forms/laporan-keuangan"
    },
    {
      title: "Trial",
      description: "Ajukan trial produk untuk pelanggan",
      content: "Klik untuk mengajukan trial",
      route: "/forms/trial",
      badge: "Segera Tiba"
    }
  ]

  return (
    <div className="slide-up">
      <main className="pb-4">
        <section className="prose mx-auto max-w-none text-center sm:text-left mb-6">
          <h2 className="text-2xl font-semibold text-black dark:text-zinc-50">Forms</h2>
          <p className="text-zinc-600 dark:text-zinc-400">Pilih form yang ingin Anda akses</p>
        </section>

        <section className="grid gap-3">
          {forms.map((form, index) => (
            <Card
              key={index}
              className={`transition-all duration-200 hover:scale-[1.02] hover:shadow-md active:scale-[0.98] ${form.badge ? "cursor-not-allowed opacity-75" : "cursor-pointer"
                }`}
              onClick={() => {
                if (!form.badge) {
                  router.push(form.route)
                }
              }}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{form.title}</CardTitle>
                  {form.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {form.badge}
                    </Badge>
                  )}
                </div>
                <CardDescription>{form.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{form.content}</p>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>
    </div>
  )
}