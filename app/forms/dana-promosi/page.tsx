"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { PlusIcon, ChevronDownIcon, ChevronRightIcon, TrashIcon, CalendarIcon } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { FormHeader } from "@/components/form-header"

interface Entry {
  id: string
  isOpen: boolean
  cabang: string
  periode: string
  outlet: string
  kodePelanggan: string
  produk: string
  noFaktur: string
  tanggalFaktur: Date | undefined
  unitQty: string
  hna: string
  totalSales: string
  discountOnFaktur: string
  discountOffFaktur: string
  nilai: string
  keterangan: string
}

interface FormData {
  pelangganOutlet: string
  periode: string
  yangMengajukan: string
}

export default function DanaPromosiPage() {
  const [formData, setFormData] = useState<FormData>({
    pelangganOutlet: '',
    periode: '',
    yangMengajukan: ''
  })
  const [entries, setEntries] = useState<Entry[]>([
    {
      id: '1',
      isOpen: true,
      cabang: '',
      periode: '',
      outlet: '',
      kodePelanggan: '',
      produk: '',
      noFaktur: '',
      tanggalFaktur: undefined,
      unitQty: '',
      hna: '',
      totalSales: '0',
      discountOnFaktur: '',
      discountOffFaktur: '',
      nilai: '0',
      keterangan: ''
    }
  ])

  const calculateTotalSales = (unitQty: string, hna: string) => {
    const qty = parseFloat(unitQty) || 0
    const hnaValue = parseFloat(hna) || 0
    return (qty * hnaValue).toString()
  }

  const calculateNilai = (totalSales: string, discountOffFaktur: string) => {
    const sales = parseFloat(totalSales) || 0
    const discount = parseFloat(discountOffFaktur) || 0
    const discountMultiplier = (100 - discount) / 100
    return (sales * discountMultiplier).toString()
  }

  const updateEntry = (id: string, field: keyof Entry, value: string | Date | undefined) => {
    setEntries(prev => prev.map(entry => {
      if (entry.id === id) {
        const updatedEntry = { ...entry, [field]: value }

        // Auto-calculate Total Sales when unitQty or hna changes
        if (field === 'unitQty' || field === 'hna') {
          updatedEntry.totalSales = calculateTotalSales(
            field === 'unitQty' ? value as string : entry.unitQty,
            field === 'hna' ? value as string : entry.hna
          )
        }

        // Auto-calculate Nilai when totalSales or discountOffFaktur changes
        if (field === 'totalSales' || field === 'discountOffFaktur') {
          updatedEntry.nilai = calculateNilai(
            field === 'totalSales' ? value as string : entry.totalSales,
            field === 'discountOffFaktur' ? value as string : entry.discountOffFaktur
          )
        }

        return updatedEntry
      }
      return entry
    }))
  }

  const addNewEntry = () => {
    const newEntry: Entry = {
      id: Date.now().toString(),
      isOpen: true,
      cabang: '',
      periode: '',
      outlet: '',
      kodePelanggan: '',
      produk: '',
      noFaktur: '',
      tanggalFaktur: undefined,
      unitQty: '',
      hna: '',
      totalSales: '0',
      discountOnFaktur: '',
      discountOffFaktur: '',
      nilai: '0',
      keterangan: ''
    }
    setEntries(prev => [...prev, newEntry])
  }

  const removeEntry = (id: string) => {
    if (entries.length > 1) {
      setEntries(prev => prev.filter(entry => entry.id !== id))
    }
  }

  const toggleEntry = (id: string) => {
    setEntries(prev => prev.map(entry =>
      entry.id === id ? { ...entry, isOpen: !entry.isOpen } : entry
    ))
  }

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Dana promosi form submitted", { formData, entries })
    // You can add navigation or success handling here
  }

  return (
    <div className="slide-up">
      <main className="p-4 pt-0">
        <FormHeader
          title="Pengajuan Dana Promosi"
          description="Ajukan dana untuk kegiatan promosi"
        />

        <Card>
          <CardHeader>
            <CardTitle>Form Pengajuan Dana Promosi</CardTitle>
            <CardDescription>Isi form berikut untuk mengajukan dana promosi</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Main Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-primary-foreground rounded-lg">
                <div className="space-y-2">
                  <Label htmlFor="pelanggan-outlet">Pelanggan/Outlet</Label>
                  <Input
                    id="pelanggan-outlet"
                    value={formData.pelangganOutlet}
                    onChange={(e) => updateFormData('pelangganOutlet', e.target.value)}
                    placeholder="Masukkan pelanggan/outlet"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="periode-utama">Periode</Label>
                  <Input
                    id="periode-utama"
                    value={formData.periode}
                    onChange={(e) => updateFormData('periode', e.target.value)}
                    placeholder="Contoh: Januari 2024"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="yang-mengajukan">Yang Mengajukan</Label>
                  <Input
                    id="yang-mengajukan"
                    value={formData.yangMengajukan}
                    onChange={(e) => updateFormData('yangMengajukan', e.target.value)}
                    placeholder="Masukkan nama pengaju"
                  />
                </div>
              </div>

              {/* Entries Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Detail Entries</h3>
                {entries.map((entry, index) => (
                  <Collapsible
                    key={entry.id}
                    open={entry.isOpen}
                    onOpenChange={() => toggleEntry(entry.id)}
                  >
                    <CollapsibleTrigger asChild>
                      <div className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <div className="flex items-center space-x-2">
                          {entry.isOpen ? (
                            <ChevronDownIcon className="h-4 w-4" />
                          ) : (
                            <ChevronRightIcon className="h-4 w-4" />
                          )}
                          <h3 className="font-medium">Entry #{index + 1}</h3>
                          {entry.outlet && (
                            <span className="text-sm text-muted-foreground">
                              - {entry.outlet}
                            </span>
                          )}
                        </div>
                        {entries.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              removeEntry(entry.id)
                            }}
                            className="text-red-500 hover:text-red-700 cursor-pointer"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </CollapsibleTrigger>

                    <CollapsibleContent className="space-y-4 pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`cabang-${entry.id}`}>Cabang</Label>
                          <Input
                            id={`cabang-${entry.id}`}
                            value={entry.cabang}
                            onChange={(e) => updateEntry(entry.id, 'cabang', e.target.value)}
                            placeholder="Masukkan cabang"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`periode-${entry.id}`}>Periode</Label>
                          <Input
                            id={`periode-${entry.id}`}
                            value={entry.periode}
                            onChange={(e) => updateEntry(entry.id, 'periode', e.target.value)}
                            placeholder="Contoh: Januari 2024"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`outlet-${entry.id}`}>Outlet/Pelanggan</Label>
                          <Input
                            id={`outlet-${entry.id}`}
                            value={entry.outlet}
                            onChange={(e) => updateEntry(entry.id, 'outlet', e.target.value)}
                            placeholder="Masukkan outlet/pelanggan"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`kode-pelanggan-${entry.id}`}>Kode Pelanggan</Label>
                          <Input
                            id={`kode-pelanggan-${entry.id}`}
                            value={entry.kodePelanggan}
                            onChange={(e) => updateEntry(entry.id, 'kodePelanggan', e.target.value)}
                            placeholder="Masukkan kode pelanggan"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`produk-${entry.id}`}>Produk</Label>
                          <Input
                            id={`produk-${entry.id}`}
                            value={entry.produk}
                            onChange={(e) => updateEntry(entry.id, 'produk', e.target.value)}
                            placeholder="Masukkan produk"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`no-faktur-${entry.id}`}>No. Faktur</Label>
                          <Input
                            id={`no-faktur-${entry.id}`}
                            value={entry.noFaktur}
                            onChange={(e) => updateEntry(entry.id, 'noFaktur', e.target.value)}
                            placeholder="Masukkan nomor faktur"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`tanggal-faktur-${entry.id}`}>Tanggal Faktur</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={`w-full justify-start text-left font-normal ${!entry.tanggalFaktur && "text-muted-foreground"
                                  }`}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {entry.tanggalFaktur ? (
                                  format(entry.tanggalFaktur, "PPP", { locale: id })
                                ) : (
                                  <span>Pilih tanggal</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={entry.tanggalFaktur}
                                onSelect={(date) => updateEntry(entry.id, 'tanggalFaktur', date)}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`unit-qty-${entry.id}`}>Unit Qty</Label>
                          <Input
                            id={`unit-qty-${entry.id}`}
                            type="number"
                            value={entry.unitQty}
                            onChange={(e) => updateEntry(entry.id, 'unitQty', e.target.value)}
                            placeholder="0"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`hna-${entry.id}`}>HNA</Label>
                          <Input
                            id={`hna-${entry.id}`}
                            type="number"
                            value={entry.hna}
                            onChange={(e) => updateEntry(entry.id, 'hna', e.target.value)}
                            placeholder="0"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`total-sales-${entry.id}`}>Total Sales (Auto-Calculated)</Label>
                          <Input
                            id={`total-sales-${entry.id}`}
                            type="number"
                            value={entry.totalSales}
                            readOnly
                            className="bg-gray-50 dark:bg-gray-800"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`discount-on-faktur-${entry.id}`}>Discount on Faktur (%)</Label>
                          <Input
                            id={`discount-on-faktur-${entry.id}`}
                            type="number"
                            value={entry.discountOnFaktur}
                            onChange={(e) => updateEntry(entry.id, 'discountOnFaktur', e.target.value)}
                            placeholder="0"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`discount-off-faktur-${entry.id}`}>Discount off Faktur (%)</Label>
                          <Input
                            id={`discount-off-faktur-${entry.id}`}
                            type="number"
                            value={entry.discountOffFaktur}
                            onChange={(e) => updateEntry(entry.id, 'discountOffFaktur', e.target.value)}
                            placeholder="0"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`nilai-${entry.id}`}>Nilai (Auto-Calculated)</Label>
                          <Input
                            id={`nilai-${entry.id}`}
                            type="number"
                            value={entry.nilai}
                            readOnly
                            className="bg-gray-50 dark:bg-gray-800"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`keterangan-${entry.id}`}>Keterangan</Label>
                        <Textarea
                          id={`keterangan-${entry.id}`}
                          value={entry.keterangan}
                          onChange={(e) => updateEntry(entry.id, 'keterangan', e.target.value)}
                          placeholder="Masukkan keterangan tambahan"
                          rows={3}
                        />
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>

              <div className="flex justify-center">
                <Button
                  type="button"
                  variant="outline"
                  onClick={addNewEntry}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <PlusIcon className="h-4 w-4" />
                  <span>Tambah Entry Baru</span>
                </Button>
              </div>

              <Button type="submit" className="w-full cursor-pointer">
                Ajukan Dana Promosi
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}