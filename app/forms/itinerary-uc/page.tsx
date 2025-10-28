"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FormHeader } from "@/components/form-header"

export default function ItineraryUCPage() {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("Itinerary UC form submitted")
    // You can add navigation or success handling here
  }

  return (
    <div className="slide-up">
      <FormHeader
          title="Pengajuan Itinerary UC"
          description="Ajukan itinerary untuk kunjungan UC"
        />
      <main className="p-4 pt-0">
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