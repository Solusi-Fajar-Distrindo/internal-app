"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FormSectionProps } from "@/lib/forms/aktivitas-harian-types"

export function RingkasanSection({ formData, setFormData }: FormSectionProps) {
  const updateStatusTahap = (status: string, checked: boolean) => {
    setFormData({
      ...formData,
      statusTahap: {
        ...formData.statusTahap,
        [status]: checked
      }
    })
  }

  const updateKebutuhanDokumen = (dokumen: string, checked: boolean) => {
    setFormData({
      ...formData,
      kebutuhanDokumen: {
        ...formData.kebutuhanDokumen,
        [dokumen]: checked
      }
    })
  }

  return (
    <div className="space-y-6">
      {/* Ringkasan Diskusi */}
      <div className="space-y-2">
        <Label htmlFor="ringkasanDiskusi">Ringkasan Diskusi</Label>
        <textarea
          id="ringkasanDiskusi"
          placeholder="Masukkan ringkasan diskusi dan hasil"
          value={formData.ringkasanDiskusi}
          onChange={(e) => setFormData({ ...formData, ringkasanDiskusi: e.target.value })}
          className="flex min-h-20 w-full rounded-md border border-input bg-card dark:bg-muted px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          rows={4}
          required
        />
      </div>

      {/* Status Tahap */}
      <div className="space-y-3">
        <Label className="text-base font-medium">Status Tahap</Label>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="prospek"
              checked={formData.statusTahap.prospek}
              onCheckedChange={(checked) => updateStatusTahap('prospek', checked as boolean)}
            />
            <Label htmlFor="prospek" className="text-sm">Prospek</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="presentasi"
              checked={formData.statusTahap.presentasi}
              onCheckedChange={(checked) => updateStatusTahap('presentasi', checked as boolean)}
            />
            <Label htmlFor="presentasi" className="text-sm">Presentasi</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="trial"
              checked={formData.statusTahap.trial}
              onCheckedChange={(checked) => updateStatusTahap('trial', checked as boolean)}
            />
            <Label htmlFor="trial" className="text-sm">Trial</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="negosiasi"
              checked={formData.statusTahap.negosiasi}
              onCheckedChange={(checked) => updateStatusTahap('negosiasi', checked as boolean)}
            />
            <Label htmlFor="negosiasi" className="text-sm">Negosiasi</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="po"
              checked={formData.statusTahap.po}
              onCheckedChange={(checked) => updateStatusTahap('po', checked as boolean)}
            />
            <Label htmlFor="po" className="text-sm">PO</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="delivery"
              checked={formData.statusTahap.delivery}
              onCheckedChange={(checked) => updateStatusTahap('delivery', checked as boolean)}
            />
            <Label htmlFor="delivery" className="text-sm">Delivery</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="closing"
              checked={formData.statusTahap.closing}
              onCheckedChange={(checked) => updateStatusTahap('closing', checked as boolean)}
            />
            <Label htmlFor="closing" className="text-sm">Closing</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="afterSales"
              checked={formData.statusTahap.afterSales}
              onCheckedChange={(checked) => updateStatusTahap('afterSales', checked as boolean)}
            />
            <Label htmlFor="afterSales" className="text-sm">After-sales</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="statusTahapOther"
              checked={formData.statusTahap.other}
              onCheckedChange={(checked) => updateStatusTahap('other', checked as boolean)}
            />
            <Label htmlFor="statusTahapOther" className="text-sm">Other</Label>
          </div>
        </div>
        {formData.statusTahap.other && (
          <div className="space-y-2">
            <Label htmlFor="statusTahapLainnya">Status Lainnya</Label>
            <Input
              id="statusTahapLainnya"
              type="text"
              placeholder="Masukkan status tahap lainnya"
              value={formData.statusTahapLainnya}
              onChange={(e) => setFormData({ ...formData, statusTahapLainnya: e.target.value })}
            />
          </div>
        )}
      </div>

      {/* Kebutuhan Dokumen */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Label className="text-base font-medium">Kebutuhan Dokumen</Label>
          <Badge variant="secondary" className="text-xs">Opsional</Badge>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="companyProfile"
              checked={formData.kebutuhanDokumen.companyProfile}
              onCheckedChange={(checked) => updateKebutuhanDokumen('companyProfile', checked as boolean)}
            />
            <Label htmlFor="companyProfile" className="text-sm">Company profile</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="brosur"
              checked={formData.kebutuhanDokumen.brosur}
              onCheckedChange={(checked) => updateKebutuhanDokumen('brosur', checked as boolean)}
            />
            <Label htmlFor="brosur" className="text-sm">Brosur</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="sph"
              checked={formData.kebutuhanDokumen.sph}
              onCheckedChange={(checked) => updateKebutuhanDokumen('sph', checked as boolean)}
            />
            <Label htmlFor="sph" className="text-sm">SPH</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="kakSpesifikasi"
              checked={formData.kebutuhanDokumen.kakSpesifikasi}
              onCheckedChange={(checked) => updateKebutuhanDokumen('kakSpesifikasi', checked as boolean)}
            />
            <Label htmlFor="kakSpesifikasi" className="text-sm">KAK/Spesifikasi</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="draftKontrak"
              checked={formData.kebutuhanDokumen.draftKontrak}
              onCheckedChange={(checked) => updateKebutuhanDokumen('draftKontrak', checked as boolean)}
            />
            <Label htmlFor="draftKontrak" className="text-sm">Draft Kontak</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="formTrial"
              checked={formData.kebutuhanDokumen.formTrial}
              onCheckedChange={(checked) => updateKebutuhanDokumen('formTrial', checked as boolean)}
            />
            <Label htmlFor="formTrial" className="text-sm">Form Trial</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="dokumenOther"
              checked={formData.kebutuhanDokumen.other}
              onCheckedChange={(checked) => updateKebutuhanDokumen('other', checked as boolean)}
            />
            <Label htmlFor="dokumenOther" className="text-sm">Other</Label>
          </div>
        </div>
        {formData.kebutuhanDokumen.other && (
          <div className="space-y-2">
            <Label htmlFor="kebutuhanDokumenLainnya">Dokumen Lainnya</Label>
            <Input
              id="kebutuhanDokumenLainnya"
              type="text"
              placeholder="Masukkan dokumen lainnya"
              value={formData.kebutuhanDokumenLainnya}
              onChange={(e) => setFormData({ ...formData, kebutuhanDokumenLainnya: e.target.value })}
            />
          </div>
        )}
      </div>

      {/* Competitor Info */}
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="competitorDisebut">Competitor Disebut?</Label>
            <Badge variant="secondary" className="text-xs">Opsional</Badge>
          </div>
          <Select value={formData.competitorDisebut} onValueChange={(value) => setFormData({ ...formData, competitorDisebut: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih opsi" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Ya">Ya</SelectItem>
              <SelectItem value="Tidak">Tidak</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {formData.competitorDisebut === "Ya" && (
          <>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="merekModelKompetitor">Merek/Model Kompetitor</Label>
                <Badge variant="secondary" className="text-xs">Opsional</Badge>
              </div>
              <textarea
                id="merekModelKompetitor"
                placeholder="Masukkan merek/model kompetitor"
                value={formData.merekModelKompetitor}
                onChange={(e) => setFormData({ ...formData, merekModelKompetitor: e.target.value })}
                className="flex min-h-20 w-full rounded-md border border-input bg-card dark:bg-muted px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="hargaKompetitor">Harga Kompetitor</Label>
                <Badge variant="secondary" className="text-xs">Opsional</Badge>
              </div>
              <Input
                id="hargaKompetitor"
                type="text"
                placeholder="Masukkan harga kompetitor"
                value={formData.hargaKompetitor}
                onChange={(e) => setFormData({ ...formData, hargaKompetitor: e.target.value })}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}