"use client"

import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeftIcon } from "lucide-react"

export default function DanaPromosiPage() {
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("Dana promosi form submitted")
    // You can add navigation or success handling here
  }

  return (
    <div className="slide-up">
      <main className="p-4">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => router.back()}
            className="mb-4"
          >
            <ChevronLeftIcon className="h-4 w-4 mr-2" />
            Kembali
          </Button>
          
          <section className="prose mx-auto max-w-none text-center sm:text-left">
            <h2 className="text-2xl font-semibold text-black dark:text-zinc-50">Pengajuan Dana Promosi</h2>
            <p className="text-zinc-600 dark:text-zinc-400">Ajukan dana untuk kegiatan promosi</p>
          </section>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Form Pengajuan Dana Promosi</CardTitle>
            <CardDescription>Isi form berikut untuk mengajukan dana promosi</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nama">Nama Lengkap</Label>
                  <Input id="nama" name="nama" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" name="email" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="judul-promosi">Judul Kegiatan Promosi</Label>
                <Input id="judul-promosi" name="judul-promosi" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="deskripsi">Deskripsi Kegiatan</Label>
                <Textarea id="deskripsi" name="deskripsi" rows={4} required />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tanggal-mulai">Tanggal Mulai</Label>
                  <Input id="tanggal-mulai" type="date" name="tanggal-mulai" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tanggal-selesai">Tanggal Selesai</Label>
                  <Input id="tanggal-selesai" type="date" name="tanggal-selesai" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="jumlah-dana">Jumlah Dana yang Diajukan (Rp)</Label>
                <Input id="jumlah-dana" type="number" name="jumlah-dana" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rincian">Rincian Penggunaan Dana</Label>
                <Textarea id="rincian" name="rincian" rows={4} required />
              </div>

              <Button type="submit" className="w-full">
                Ajukan Dana Promosi
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}