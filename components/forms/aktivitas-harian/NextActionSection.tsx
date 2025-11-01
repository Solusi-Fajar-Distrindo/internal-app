"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { FormSectionProps } from "@/lib/forms/aktivitas-harian-types"

export function NextActionSection({ formData, setFormData }: FormSectionProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="tugasLanjutan">Tugas Lanjutan</Label>
        <textarea
          id="tugasLanjutan"
          placeholder="Masukkan detail tugas lanjutan"
          value={formData.tugasLanjutan}
          onChange={(e) => setFormData({ ...formData, tugasLanjutan: e.target.value })}
          className="flex min-h-20 w-full rounded-md border border-input bg-card dark:bg-muted px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label>Tanggal Jatuh Tempo</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              {formData.tanggalJatuhTempo ? (
                format(new Date(formData.tanggalJatuhTempo + 'T00:00:00'), "dd/MM/yyyy", { locale: id })
              ) : (
                <span>Pilih tanggal jatuh tempo</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={formData.tanggalJatuhTempo ? new Date(formData.tanggalJatuhTempo) : undefined}
              onSelect={(date) => {
                if (date) {
                  // Format date as YYYY-MM-DD using local timezone
                  const year = date.getFullYear()
                  const month = String(date.getMonth() + 1).padStart(2, '0')
                  const day = String(date.getDate()).padStart(2, '0')
                  const dateString = `${year}-${month}-${day}`
                  setFormData({ ...formData, tanggalJatuhTempo: dateString })
                } else {
                  setFormData({ ...formData, tanggalJatuhTempo: "" })
                }
              }}
              locale={id}
              className="rounded-md"
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}