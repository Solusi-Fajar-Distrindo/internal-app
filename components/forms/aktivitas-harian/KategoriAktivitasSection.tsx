"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FormSectionProps } from "@/lib/forms/aktivitas-harian-types"

export function KategoriAktivitasSection({ formData, setFormData }: FormSectionProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="tipeAktivitas">Tipe Aktivitas</Label>
        <Select value={formData.tipeAktivitas} onValueChange={(value) => setFormData({ ...formData, tipeAktivitas: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih tipe aktivitas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Visit Onsite">Visit Onsite</SelectItem>
            <SelectItem value="Meeting Online">Meeting Online</SelectItem>
            <SelectItem value="Presentasi">Presentasi</SelectItem>
            <SelectItem value="Follow-up">Follow-up</SelectItem>
            <SelectItem value="Delivery">Delivery</SelectItem>
            <SelectItem value="After Sales">After Sales</SelectItem>
            <SelectItem value="Lainnya">Lainnya</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tujuanKunjungan">Tujuan Kunjungan</Label>
        <Select value={formData.tujuanKunjungan} onValueChange={(value) => setFormData({ ...formData, tujuanKunjungan: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih tujuan kunjungan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Prospek Awal">Prospek Awal</SelectItem>
            <SelectItem value="Presentasi Produk">Presentasi Produk</SelectItem>
            <SelectItem value="Diskusi Teknis">Diskusi Teknis</SelectItem>
            <SelectItem value="Negosiasi Harga">Negosiasi Harga</SelectItem>
            <SelectItem value="Trial/Demo">Trial/Demo</SelectItem>
            <SelectItem value="Pengambilan/Pengantaran">Pengambilan/Pengantaran</SelectItem>
            <SelectItem value="After-sales/Support">After-sales/Support</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="waktuMulai">Waktu Mulai</Label>
          <Input
            id="waktuMulai"
            type="time"
            value={formData.waktuMulai}
            onChange={(e) => setFormData({ ...formData, waktuMulai: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="waktuSelesai">Waktu Selesai</Label>
          <Input
            id="waktuSelesai"
            type="time"
            value={formData.waktuSelesai}
            onChange={(e) => setFormData({ ...formData, waktuSelesai: e.target.value })}
            required
          />
        </div>
      </div>
    </div>
  )
}