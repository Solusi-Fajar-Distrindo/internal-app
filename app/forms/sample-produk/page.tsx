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
import { MainHeader } from "@/components/main-header"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface Entry {
  id: string
  isOpen: boolean
  kodeProduk: string
  namaProduk: string
  ukuran: string
  jumlah: string
  satuan: string
  keterangan: string
}

interface FormData {
  namaArea: string
  tempatKota: string
  tanggal: Date | undefined
}

export default function SampleProdukPage() {
  const [formData, setFormData] = useState<FormData>({
    namaArea: '',
    tempatKota: '',
    tanggal: undefined
  })
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [entries, setEntries] = useState<Entry[]>([
    {
      id: '1',
      isOpen: true,
      kodeProduk: '',
      namaProduk: '',
      ukuran: '',
      jumlah: '',
      satuan: '',
      keterangan: ''
    }
  ])

  const updateEntry = (id: string, field: keyof Entry, value: string) => {
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
      kodeProduk: '',
      namaProduk: '',
      ukuran: '',
      jumlah: '',
      satuan: '',
      keterangan: ''
    }
    setEntries(prev => [...prev, newEntry])
  }

  const removeEntry = (id: string) => {
    if (entries.length > 1) {
      setDeleteId(id)
    }
  }

  const confirmDelete = () => {
    if (deleteId) {
      setEntries(prev => prev.filter(entry => entry.id !== deleteId))
      setDeleteId(null)
    }
  }

  const cancelDelete = () => {
    setDeleteId(null)
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
    console.log("Sample produk form submitted", { formData, entries })
    // You can add navigation or success handling here
  }

  return (
    <div className="slide-up">
      <MainHeader
          title="Permintaan Sample Produk"
          description="Request sample produk untuk pelanggan"
        />

      <main className="desktop-content-margins p-4 pt-0">
        <Card>
          <CardHeader>
            <CardTitle>Form Permintaan Sample Produk</CardTitle>
            <CardDescription>Isi form berikut untuk request sample produk</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Main Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-primary-foreground rounded-lg">
                <div className="space-y-2">
                  <Label htmlFor="nama-area">Nama Area</Label>
                  <Input
                    id="nama-area"
                    value={formData.namaArea}
                    onChange={(e) => updateFormData('namaArea', e.target.value)}
                    placeholder="Masukkan nama area"
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
                  <Label htmlFor="tanggal">Tanggal</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`w-full justify-start text-left font-normal ${!formData.tanggal && "text-muted-foreground"
                          }`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.tanggal ? (
                          format(formData.tanggal, "dd-MM-yyyy")
                        ) : (
                          <span>Pilih tanggal</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.tanggal}
                        onSelect={(date) => updateFormData('tanggal', date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Entries Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Detail Sample Produk</h3>
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
                          {entry.namaProduk && (
                            <span className="text-sm text-muted-foreground">
                              - {entry.namaProduk}
                            </span>
                          )}
                        </div>
                        {entries.length > 1 && (
                          <AlertDialog open={deleteId === entry.id} onOpenChange={(open) => !open && setDeleteId(null)}>
                            <AlertDialogTrigger asChild>
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
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Apakah Anda yakin ingin menghapus entry ini? Tindakan ini tidak dapat dibatalkan.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel onClick={cancelDelete}>Batal</AlertDialogCancel>
                                <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
                                  Hapus
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </div>
                    </CollapsibleTrigger>

                    <CollapsibleContent className="space-y-4 pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`kode-produk-${entry.id}`}>Kode Produk</Label>
                          <Input
                            id={`kode-produk-${entry.id}`}
                            value={entry.kodeProduk}
                            onChange={(e) => updateEntry(entry.id, 'kodeProduk', e.target.value)}
                            placeholder="Masukkan kode produk"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`nama-produk-${entry.id}`}>Nama Produk</Label>
                          <Input
                            id={`nama-produk-${entry.id}`}
                            value={entry.namaProduk}
                            onChange={(e) => updateEntry(entry.id, 'namaProduk', e.target.value)}
                            placeholder="Masukkan nama produk"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`ukuran-${entry.id}`}>Ukuran</Label>
                          <Input
                            id={`ukuran-${entry.id}`}
                            value={entry.ukuran}
                            onChange={(e) => updateEntry(entry.id, 'ukuran', e.target.value)}
                            placeholder="Masukkan ukuran"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`jumlah-${entry.id}`}>Jumlah</Label>
                          <Input
                            id={`jumlah-${entry.id}`}
                            type="number"
                            value={entry.jumlah}
                            onChange={(e) => updateEntry(entry.id, 'jumlah', e.target.value)}
                            placeholder="0"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`satuan-${entry.id}`}>Satuan</Label>
                          <Input
                            id={`satuan-${entry.id}`}
                            type="number"
                            value={entry.satuan}
                            onChange={(e) => updateEntry(entry.id, 'satuan', e.target.value)}
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
                Request Sample Produk
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}