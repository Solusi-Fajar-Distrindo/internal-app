"use client"

import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeftIcon } from "lucide-react"

export default function ItineraryUCPage() {
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("Itinerary UC form submitted")
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
            <h2 className="text-2xl font-semibold text-black dark:text-zinc-50">Pengajuan Itinerary UC</h2>
            <p className="text-zinc-600 dark:text-zinc-400">Ajukan itinerary untuk kunjungan UC</p>
          </section>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Form Pengajuan Itinerary UC</CardTitle>
            <CardDescription>Isi form berikut untuk mengajukan itinerary kunjungan UC</CardDescription>
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
                <Label htmlFor="nama-uc">Nama UC/Outlet</Label>
                <Input id="nama-uc" name="nama-uc" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="alamat-uc">Alamat UC</Label>
                <Textarea id="alamat-uc" name="alamat-uc" rows={3} required />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tanggal-kunjungan">Tanggal Kunjungan</Label>
                  <Input id="tanggal-kunjungan" type="date" name="tanggal-kunjungan" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="waktu-kunjungan">Waktu Kunjungan</Label>
                  <Input id="waktu-kunjungan" type="time" name="waktu-kunjungan" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tujuan-kunjungan">Tujuan Kunjungan</Label>
                <Textarea id="tujuan-kunjungan" name="tujuan-kunjungan" rows={4} required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="agenda">Agenda Kunjungan</Label>
                <Textarea id="agenda" name="agenda" rows={4} required />
              </div>

              <Button type="submit" className="w-full">
                Ajukan Itinerary
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}