"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FormHeader } from "@/components/form-header"

export default function LaporanKeuanganPage() {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("Laporan keuangan form submitted")
    // You can add navigation or success handling here
  }

  return (
    <div className="slide-up">
      <main className="p-4 pt-0">
        <FormHeader
          title="Laporan Keuangan UC"
          description="Buat laporan keuangan kunjungan UC"
        />

        <Card>
          <CardHeader>
            <CardTitle>Form Laporan Keuangan UC</CardTitle>
            <CardDescription>Isi form berikut untuk membuat laporan keuangan kunjungan UC</CardDescription>
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tanggal-kunjungan">Tanggal Kunjungan</Label>
                  <Input id="tanggal-kunjungan" type="date" name="tanggal-kunjungan" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="periode-laporan">Periode Laporan</Label>
                  <Input id="periode-laporan" name="periode-laporan" placeholder="Contoh: Januari 2024" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="total-pendapatan">Total Pendapatan (Rp)</Label>
                <Input id="total-pendapatan" type="number" name="total-pendapatan" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="total-pengeluaran">Total Pengeluaran (Rp)</Label>
                <Input id="total-pengeluaran" type="number" name="total-pengeluaran" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rincian-pendapatan">Rincian Pendapatan</Label>
                <Textarea id="rincian-pendapatan" name="rincian-pendapatan" rows={4} placeholder="Jelaskan sumber-sumber pendapatan" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rincian-pengeluaran">Rincian Pengeluaran</Label>
                <Textarea id="rincian-pengeluaran" name="rincian-pengeluaran" rows={4} placeholder="Jelaskan item-item pengeluaran" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="catatan">Catatan Tambahan</Label>
                <Textarea id="catatan" name="catatan" rows={3} placeholder="Informasi tambahan mengenai laporan" />
              </div>

              <Button type="submit" className="w-full">
                Buat Laporan Keuangan
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}