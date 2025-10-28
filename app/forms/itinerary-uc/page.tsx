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
  outletRekanan: string
  potensi: string
  estimasiBiaya: string
  keterangan: string
}

interface FormData {
  yangMengajukan: string
}

export default function ItineraryUCPage() {
  const [formData, setFormData] = useState<FormData>({
    yangMengajukan: ''
  })
  const [entries, setEntries] = useState<Entry[]>([
    {
      id: '1',
      isOpen: true,
      tanggal: undefined,
      outletRekanan: '',
      potensi: '0',
      estimasiBiaya: '0',
      keterangan: ''
    }
  ])

  const calculateTotalPotensi = () => {
    return entries.reduce((total, entry) => {
      const potensi = parseFloat(entry.potensi) || 0
      return total + potensi
    }, 0).toString()
  }

  const calculateTotalEstimasiBiaya = () => {
    return entries.reduce((total, entry) => {
      const estimasi = parseFloat(entry.estimasiBiaya) || 0
      return total + estimasi
    }, 0).toString()
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
      outletRekanan: '',
      potensi: '0',
      estimasiBiaya: '0',
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
    console.log("Itinerary UC form submitted", { formData, entries })
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
          title="Pengajuan Itinerary UC"
          description="Ajukan itinerary untuk kunjungan UC"
        />

      <main className="p-4 pt-0">
        <Card>
          <CardHeader>
            <CardTitle>Form Pengajuan Itinerary UC</CardTitle>
            <CardDescription>Isi form berikut untuk mengajukan itinerary kunjungan UC</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Main Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-primary-foreground rounded-lg">
                <div className="space-y-2">
                  <Label htmlFor="yang-mengajukan">Yang Mengajukan</Label>
                  <Input
                    id="yang-mengajukan"
                    value={formData.yangMengajukan}
                    onChange={(e) => updateFormData('yangMengajukan', e.target.value)}
                    placeholder="Masukkan nama pengaju"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Total Potensi (Auto)</Label>
                  <Input
                    value={formatCurrency(calculateTotalPotensi())}
                    readOnly
                    className="bg-gray-50 dark:bg-gray-800"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Total Estimasi Biaya (Auto)</Label>
                  <Input
                    value={formatCurrency(calculateTotalEstimasiBiaya())}
                    readOnly
                    className="bg-gray-50 dark:bg-gray-800"
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
                          {entry.outletRekanan && (
                            <span className="text-sm text-muted-foreground">
                              - {entry.outletRekanan}
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
                          <Label htmlFor={`outlet-rekanan-${entry.id}`}>Outlet Rekanan/Tujuan</Label>
                          <Input
                            id={`outlet-rekanan-${entry.id}`}
                            value={entry.outletRekanan}
                            onChange={(e) => updateEntry(entry.id, 'outletRekanan', e.target.value)}
                            placeholder="Masukkan outlet rekanan/tujuan"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`potensi-${entry.id}`}>Potensi (IDR)</Label>
                          <Input
                            id={`potensi-${entry.id}`}
                            type="number"
                            value={entry.potensi}
                            onChange={(e) => updateEntry(entry.id, 'potensi', e.target.value)}
                            placeholder="0"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`estimasi-biaya-${entry.id}`}>Estimasi Biaya (IDR)</Label>
                          <Input
                            id={`estimasi-biaya-${entry.id}`}
                            type="number"
                            value={entry.estimasiBiaya}
                            onChange={(e) => updateEntry(entry.id, 'estimasiBiaya', e.target.value)}
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
                Ajukan Itinerary
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}