"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { FormSectionProps } from "@/lib/forms/aktivitas-harian-types"

export function IdentitasSection({ formData, setFormData, selectedDate, setSelectedDate }: FormSectionProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          disabled
          className="bg-muted"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="nama">Nama</Label>
        <Input
          id="nama"
          type="text"
          placeholder="Masukkan nama lengkap"
          value={formData.nama}
          onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="area">Area</Label>
        <Input
          id="area"
          type="text"
          placeholder="Masukkan area kerja"
          value={formData.area}
          onChange={(e) => setFormData({ ...formData, area: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Tanggal Kegiatan</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              {selectedDate ? (
                format(selectedDate, "dd/MM/yyyy", { locale: id })
              ) : (
                <span>Pilih tanggal</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              locale={id}
              className="rounded-md"
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}