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

export function ProdukSection({ formData, setFormData }: FormSectionProps) {
  const updateProdukDibahas = (produk: string, checked: boolean) => {
    setFormData({
      ...formData,
      produkDibahas: {
        ...formData.produkDibahas,
        [produk]: checked
      }
    })
  }

  const updateKuantitas = (produk: string, value: string) => {
    setFormData({
      ...formData,
      kuantitas: {
        ...formData.kuantitas,
        [produk]: value
      }
    })
  }

  return (
    <div className="space-y-6">
      {/* Produk/Segmen Dibahas */}
      <div className="space-y-3">
        <Label className="text-base font-medium">Produk/Segmen Dibahas</Label>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="kasa"
              checked={formData.produkDibahas.kasa}
              onCheckedChange={(checked) => updateProdukDibahas('kasa', checked as boolean)}
            />
            <Label htmlFor="kasa" className="text-sm">Kasa</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="kertas"
              checked={formData.produkDibahas.kertas}
              onCheckedChange={(checked) => updateProdukDibahas('kertas', checked as boolean)}
            />
            <Label htmlFor="kertas" className="text-sm">Kertas</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="pouch"
              checked={formData.produkDibahas.pouch}
              onCheckedChange={(checked) => updateProdukDibahas('pouch', checked as boolean)}
            />
            <Label htmlFor="pouch" className="text-sm">Pouch</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="pensil"
              checked={formData.produkDibahas.pensil}
              onCheckedChange={(checked) => updateProdukDibahas('pensil', checked as boolean)}
            />
            <Label htmlFor="pensil" className="text-sm">Pensil</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="collagen"
              checked={formData.produkDibahas.collagen}
              onCheckedChange={(checked) => updateProdukDibahas('collagen', checked as boolean)}
            />
            <Label htmlFor="collagen" className="text-sm">Collagen</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="apron"
              checked={formData.produkDibahas.apron}
              onCheckedChange={(checked) => updateProdukDibahas('apron', checked as boolean)}
            />
            <Label htmlFor="apron" className="text-sm">Apron</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="lainnya"
              checked={formData.produkDibahas.lainnya}
              onCheckedChange={(checked) => updateProdukDibahas('lainnya', checked as boolean)}
            />
            <Label htmlFor="lainnya" className="text-sm">Lainnya</Label>
          </div>
        </div>
        {formData.produkDibahas.lainnya && (
          <div className="space-y-2">
            <Label htmlFor="produkLainnya">Produk Lainnya</Label>
            <Input
              id="produkLainnya"
              type="text"
              placeholder="Masukkan nama produk lainnya"
              value={formData.produkLainnya}
              onChange={(e) => setFormData({ ...formData, produkLainnya: e.target.value })}
            />
          </div>
        )}
      </div>

      {/* Minat/Opp Level */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="minatOppLevel">Minat/Opp Level</Label>
          <Badge variant="secondary" className="text-xs">Opsional</Badge>
        </div>
        <Select value={formData.minatOppLevel} onValueChange={(value) => setFormData({ ...formData, minatOppLevel: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih minat/opportunity level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Low">Low</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="High">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Kuantitas/Estimasi Nilai */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Label className="text-base font-medium">Kuantitas/Estimasi Nilai per Produk</Label>
          <Badge variant="secondary" className="text-xs">Opsional</Badge>
        </div>
        {formData.produkDibahas.kasa && (
          <div className="space-y-2">
            <Label htmlFor="kuantitas-kasa">Kuantitas Kasa</Label>
            <Input
              id="kuantitas-kasa"
              type="text"
              placeholder="Masukkan kuantitas/estimasi nilai kasa"
              value={formData.kuantitas.kasa}
              onChange={(e) => updateKuantitas('kasa', e.target.value)}
            />
          </div>
        )}
        {formData.produkDibahas.kertas && (
          <div className="space-y-2">
            <Label htmlFor="kuantitas-kertas">Kuantitas Kertas</Label>
            <Input
              id="kuantitas-kertas"
              type="text"
              placeholder="Masukkan kuantitas/estimasi nilai kertas"
              value={formData.kuantitas.kertas}
              onChange={(e) => updateKuantitas('kertas', e.target.value)}
            />
          </div>
        )}
        {formData.produkDibahas.pouch && (
          <div className="space-y-2">
            <Label htmlFor="kuantitas-pouch">Kuantitas Pouch</Label>
            <Input
              id="kuantitas-pouch"
              type="text"
              placeholder="Masukkan kuantitas/estimasi nilai pouch"
              value={formData.kuantitas.pouch}
              onChange={(e) => updateKuantitas('pouch', e.target.value)}
            />
          </div>
        )}
        {formData.produkDibahas.pensil && (
          <div className="space-y-2">
            <Label htmlFor="kuantitas-pensil">Kuantitas Pensil</Label>
            <Input
              id="kuantitas-pensil"
              type="text"
              placeholder="Masukkan kuantitas/estimasi nilai pensil"
              value={formData.kuantitas.pensil}
              onChange={(e) => updateKuantitas('pensil', e.target.value)}
            />
          </div>
        )}
        {formData.produkDibahas.collagen && (
          <div className="space-y-2">
            <Label htmlFor="kuantitas-collagen">Kuantitas Collagen</Label>
            <Input
              id="kuantitas-collagen"
              type="text"
              placeholder="Masukkan kuantitas/estimasi nilai collagen"
              value={formData.kuantitas.collagen}
              onChange={(e) => updateKuantitas('collagen', e.target.value)}
            />
          </div>
        )}
        {formData.produkDibahas.apron && (
          <div className="space-y-2">
            <Label htmlFor="kuantitas-apron">Kuantitas Apron</Label>
            <Input
              id="kuantitas-apron"
              type="text"
              placeholder="Masukkan kuantitas/estimasi nilai apron"
              value={formData.kuantitas.apron}
              onChange={(e) => updateKuantitas('apron', e.target.value)}
            />
          </div>
        )}
        {formData.produkDibahas.lainnya && (
          <div className="space-y-2">
            <Label htmlFor="kuantitas-lainnya">Kuantitas {formData.produkLainnya || 'Lainnya'}</Label>
            <Input
              id="kuantitas-lainnya"
              type="text"
              placeholder="Masukkan kuantitas/estimasi nilai produk lainnya"
              value={formData.kuantitas.lainnya}
              onChange={(e) => updateKuantitas('lainnya', e.target.value)}
            />
          </div>
        )}
        {!formData.produkDibahas.kasa &&
          !formData.produkDibahas.kertas &&
          !formData.produkDibahas.pouch &&
          !formData.produkDibahas.pensil &&
          !formData.produkDibahas.collagen &&
          !formData.produkDibahas.apron &&
          !formData.produkDibahas.lainnya && (
            <p className="text-sm text-muted-foreground italic">
              Pilih minimal satu produk untuk mengisi kuantitas
            </p>
          )}
      </div>
    </div>
  )
}