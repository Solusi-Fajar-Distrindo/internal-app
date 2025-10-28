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
  tanggal: Date | undefined
  namaAccount: string
  penerimaan: string
  pengeluaran: string
  keterangan: string
}

interface FormData {
  nama: string
  jabatan: string
  area: string
  periode: string
  diajukanOleh: string
  tempatKota: string
  tanggalDiajukan: Date | undefined
}

export default function LaporanKeuanganPage() {
  const [formData, setFormData] = useState<FormData>({
    nama: '',
    jabatan: '',
    area: '',
    periode: '',
    diajukanOleh: '',
    tempatKota: '',
    tanggalDiajukan: undefined
  })
  const [entries, setEntries] = useState<Entry[]>([
    {
      id: '1',
      isOpen: true,
      tanggal: undefined,
      namaAccount: '',
      penerimaan: '0',
      pengeluaran: '0',
      keterangan: ''
    }
  ])

  const calculateTotalPenerimaan = () => {
    return entries.reduce((total, entry) => {
      const penerimaan = parseFloat(entry.penerimaan) || 0
      return total + penerimaan
    }, 0).toString()
  }

  const calculateTotalPengeluaran = () => {
    return entries.reduce((total, entry) => {
      const pengeluaran = parseFloat(entry.pengeluaran) || 0
      return total + pengeluaran
    }, 0).toString()
  }

  const calculateSaldo = () => {
    const totalPenerimaan = parseFloat(calculateTotalPenerimaan()) || 0
    const totalPengeluaran = parseFloat(calculateTotalPengeluaran()) || 0
    return (totalPenerimaan - totalPengeluaran).toString()
  }

  const updateEntry = (id: string, field: keyof Entry, value: string | Date | undefined) => {
    setEntries(prev => prev.map(entry => {
      if (entry.id === id) {
        return { ...entry, [field]: value }
      }
      return entry
    }))
  }

  const addNewEntry = () => {
    const newEntry: Entry = {
      id: Date.now().toString(),
      isOpen: true,
      tanggal: undefined,
      namaAccount: '',
      penerimaan: '0',
      pengeluaran: '0',
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

  const updateFormData = (field: keyof FormData, value: string | Date | undefined) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Laporan keuangan form submitted", { formData, entries })
    // You can add navigation or success handling here
  }

  const formatCurrency = (value: string) => {
    const num = parseFloat(value) || 0
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num)
  }

  return (
    <div className="slide-up">
      <FormHeader
          title="Laporan Keuangan UC"
          description="Buat laporan keuangan kunjungan UC"
        />

      <main className="p-4 pt-0">
        <Card>
          <CardHeader>
            <CardTitle>Form Laporan Keuangan UC</CardTitle>
            <CardDescription>Isi form berikut untuk membuat laporan keuangan kunjungan UC</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Main Form Fields */}
              <div className="space-y-4 p-4 bg-gray-50 dark:bg-primary-foreground rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nama">Nama</Label>
                    <Input
                      id="nama"
                      value={formData.nama}
                      onChange={(e) => updateFormData('nama', e.target.value)}
                      placeholder="Masukkan nama"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="jabatan">Jabatan</Label>
                    <Input
                      id="jabatan"
                      value={formData.jabatan}
                      onChange={(e) => updateFormData('jabatan', e.target.value)}
                      placeholder="Masukkan jabatan"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="area">Area</Label>
                    <Input
                      id="area"
                      value={formData.area}
                      onChange={(e) => updateFormData('area', e.target.value)}
                      placeholder="Masukkan area"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="periode">Periode</Label>
                    <Input
                      id="periode"
                      value={formData.periode}
                      onChange={(e) => updateFormData('periode', e.target.value)}
                      placeholder="Contoh: Januari 2024"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="diajukan-oleh">Diajukan Oleh</Label>
                    <Input
                      id="diajukan-oleh"
                      value={formData.diajukanOleh}
                      onChange={(e) => updateFormData('diajukanOleh', e.target.value)}
                      placeholder="Masukkan nama pengaju"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tempat-kota">Tempat (Kota)</Label>
                    <Input
                      id="tempat-kota"
                      value={formData.tempatKota}
                      onChange={(e) => updateFormData('tempatKota', e.target.value)}
                      placeholder="Masukkan kota"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tanggal-diajukan">Tanggal Diajukan</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={`w-full justify-start text-left font-normal ${!formData.tanggalDiajukan && "text-muted-foreground"
                            }`}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.tanggalDiajukan ? (
                            format(formData.tanggalDiajukan, "PPP", { locale: id })
                          ) : (
                            <span>Pilih tanggal</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.tanggalDiajukan}
                          onSelect={(date) => updateFormData('tanggalDiajukan', date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Summary Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                  <div className="space-y-2">
                    <Label>Total Penerimaan (Auto-Calculated)</Label>
                    <Input
                      value={formatCurrency(calculateTotalPenerimaan())}
                      readOnly
                      className="bg-gray-50 dark:bg-gray-800"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Total Pengeluaran (Auto-Calculated)</Label>
                    <Input
                      value={formatCurrency(calculateTotalPengeluaran())}
                      readOnly
                      className="bg-gray-50 dark:bg-gray-800"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Saldo (Auto-Calculated)</Label>
                    <Input
                      value={formatCurrency(calculateSaldo())}
                      readOnly
                      className="bg-gray-50 dark:bg-gray-800"
                    />
                  </div>
                </div>
              </div>

              {/* Entries Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Detail Transaksi</h3>
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
                          {entry.namaAccount && (
                            <span className="text-sm text-muted-foreground">
                              - {entry.namaAccount}
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
                          <Label htmlFor={`tanggal-${entry.id}`}>Tanggal</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={`w-full justify-start text-left font-normal ${!entry.tanggal && "text-muted-foreground"
                                  }`}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {entry.tanggal ? (
                                  format(entry.tanggal, "PPP", { locale: id })
                                ) : (
                                  <span>Pilih tanggal</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={entry.tanggal}
                                onSelect={(date) => updateEntry(entry.id, 'tanggal', date)}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`nama-account-${entry.id}`}>Nama Account</Label>
                          <Input
                            id={`nama-account-${entry.id}`}
                            value={entry.namaAccount}
                            onChange={(e) => updateEntry(entry.id, 'namaAccount', e.target.value)}
                            placeholder="Masukkan nama account"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`penerimaan-${entry.id}`}>Penerimaan (Rp)</Label>
                          <Input
                            id={`penerimaan-${entry.id}`}
                            type="number"
                            value={entry.penerimaan}
                            onChange={(e) => updateEntry(entry.id, 'penerimaan', e.target.value)}
                            placeholder="0"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`pengeluaran-${entry.id}`}>Pengeluaran (Rp)</Label>
                          <Input
                            id={`pengeluaran-${entry.id}`}
                            type="number"
                            value={entry.pengeluaran}
                            onChange={(e) => updateEntry(entry.id, 'pengeluaran', e.target.value)}
                            placeholder="0"
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
                Buat Laporan Keuangan
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}