"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MainHeader } from "@/components/layout/main-header"

export default function TrialPage() {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("Trial form submitted")
    // You can add navigation or success handling here
  }

  return (
    <div className="slide-up">
      <MainHeader
          title="Trial Produk"
          description="Ajukan trial produk untuk pelanggan"
        />
      <main className="desktop-content-margins p-4 pt-0">
        <Card>
          <CardHeader>
            <CardTitle>Form Pengajuan Trial Produk</CardTitle>
            <CardDescription>Isi form berikut untuk mengajukan trial produk</CardDescription>
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
                <Label htmlFor="nama-pelanggan">Nama Pelanggan</Label>
                <Input id="nama-pelanggan" name="nama-pelanggan" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="nama-perusahaan">Nama Perusahaan</Label>
                <Input id="nama-perusahaan" name="nama-perusahaan" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="alamat-pelanggan">Alamat Pelanggan</Label>
                <Textarea id="alamat-pelanggan" name="alamat-pelanggan" rows={3} required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="produk-trial">Produk untuk Trial</Label>
                <Textarea id="produk-trial" name="produk-trial" rows={4} placeholder="Sebutkan jenis produk yang akan ditrial" required />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tanggal-mulai">Tanggal Mulai Trial</Label>
                  <Input id="tanggal-mulai" type="date" name="tanggal-mulai" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tanggal-selesai">Tanggal Selesai Trial</Label>
                  <Input id="tanggal-selesai" type="date" name="tanggal-selesai" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tujuan-trial">Tujuan Trial</Label>
                <Textarea id="tujuan-trial" name="tujuan-trial" rows={3} required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="catatan">Catatan Tambahan</Label>
                <Textarea id="catatan" name="catatan" rows={3} />
              </div>

              <Button type="submit" className="w-full">
                Ajukan Trial
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}