"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

interface FormsViewProps {
  onNavigate: (tab: string) => void
}

export function FormsView({ onNavigate }: FormsViewProps) {
  const forms = [
    {
      title: "Pengajuan Dana Promosi",
      description: "Ajukan dana untuk kegiatan promosi",
      content: "Klik untuk mengajukan dana promosi"
    },
    {
      title: "Pengajuan Itinerary UC",
      description: "Ajukan itinerary untuk kunjungan UC",
      content: "Klik untuk mengajukan itinerary"
    },
    {
      title: "Permintaan Sample Produk",
      description: "Request sample produk untuk pelanggan",
      content: "Klik untuk request sample produk"
    },
    {
      title: "Trial",
      description: "Ajukan trial produk untuk pelanggan",
      content: "Klik untuk mengajukan trial"
    },
    {
      title: "Laporan Keuangan UC",
      description: "Buat laporan keuangan kunjungan UC",
      content: "Klik untuk membuat laporan keuangan"
    }
  ]

  return (
    <div className="slide-up">
      <main className="p-4">
        <section className="prose mx-auto max-w-none text-center sm:text-left mb-6">
          <h2 className="text-2xl font-semibold text-black dark:text-zinc-50">Forms</h2>
          <p className="text-zinc-600 dark:text-zinc-400">Pilih form yang ingin Anda akses</p>
        </section>

        <section className="grid gap-3">
          {forms.map((form, index) => (
            <Card
              key={index}
              className="cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
            >
              <CardHeader>
                <CardTitle>{form.title}</CardTitle>
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