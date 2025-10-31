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

export function OutletInfoSection({ formData, setFormData }: FormSectionProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="jenisOutlet">Jenis Outlet</Label>
        <Select value={formData.jenisOutlet} onValueChange={(value) => setFormData({ ...formData, jenisOutlet: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih jenis outlet" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="RS">RS</SelectItem>
            <SelectItem value="Klinik">Klinik</SelectItem>
            <SelectItem value="Apotek">Apotek</SelectItem>
            <SelectItem value="PT">PT</SelectItem>
            <SelectItem value="lainnya">Lainnya</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="namaOutlet">Nama Outlet (RS/PT)</Label>
        <Input
          id="namaOutlet"
          type="text"
          placeholder="Masukkan nama outlet"
          value={formData.namaOutlet}
          onChange={(e) => setFormData({ ...formData, namaOutlet: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="kota">Kota/Kabupaten</Label>
        <Input
          id="kota"
          type="text"
          placeholder="Masukkan kota/kabupaten"
          value={formData.kota}
          onChange={(e) => setFormData({ ...formData, kota: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="pic">PIC yang Ditemui</Label>
        <Input
          id="pic"
          type="text"
          placeholder="Masukkan nama PIC"
          value={formData.pic}
          onChange={(e) => setFormData({ ...formData, pic: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="jabatanPic">Jabatan/Departemen PIC</Label>
        <Input
          id="jabatanPic"
          type="text"
          placeholder="Masukkan jabatan/departemen PIC"
          value={formData.jabatanPic}
          onChange={(e) => setFormData({ ...formData, jabatanPic: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="hpPic">Nomor HP PIC</Label>
        <Input
          id="hpPic"
          type="text"
          placeholder="Masukkan nomor HP PIC"
          value={formData.hpPic}
          onChange={(e) => setFormData({ ...formData, hpPic: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="emailPic">Email PIC</Label>
        <Input
          id="emailPic"
          type="email"
          placeholder="Masukkan email PIC"
          value={formData.emailPic}
          onChange={(e) => setFormData({ ...formData, emailPic: e.target.value })}
          required
        />
      </div>
    </div>
  )
}