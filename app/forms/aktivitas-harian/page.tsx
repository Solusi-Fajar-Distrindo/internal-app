"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { ChevronLeftIcon } from "lucide-react"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

export default function FormsPage() {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [formData, setFormData] = useState({
    email: "user@example.com",
    nama: "",
    area: "",
    jenisOutlet: "",
    namaOutlet: "",
    kota: "",
    pic: "",
    jabatanPic: "",
    hpPic: "",
    emailPic: "",
    tipeAktivitas: "",
    tujuanKunjungan: "",
    waktuMulai: "",
    waktuSelesai: "",
    produkDibahas: {
      kasa: false,
      kertas: false,
      pouch: false,
      pensil: false,
      collagen: false,
      apron: false,
      lainnya: false
    },
    produkLainnya: "",
    minatOppLevel: "",
    kuantitas: "",
    ringkasanDiskusi: "",
    statusTahap: {
      prospek: false,
      presentasi: false,
      trial: false,
      negosiasi: false,
      po: false,
      delivery: false,
      closing: false,
      afterSales: false,
      other: false
    },
    statusTahapLainnya: "",
    kebutuhanDokumen: {
      companyProfile: false,
      brosur: false,
      sph: false,
      kakSpesifikasi: false,
      draftKontrak: false,
      formTrial: false,
      other: false
    },
    kebutuhanDokumenLainnya: "",
    competitorDisebut: "",
    merekModelKompetitor: "",
    hargaKompetitor: "",
    nextAction: "",
    tugasLanjutan: "",
    tanggalJatuhTempo: ""
  })
  const [openSections, setOpenSections] = useState({
    identitas: true,
    outlet: true,
    kategori: true,
    produk: true,
    ringkasan: true,
    nextAction: true
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", { ...formData, tanggal: selectedDate })
    // Handle form submission logic here
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans">
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-transparent py-3 backdrop-blur-sm bg-white/60 dark:bg-neutral-900/60">
        <div className="desktop-container flex w-full items-center justify-between gap-3">
          <div className="desktop-header-margins flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => router.back()}
              className="h-8 w-8"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <h1 className="text-lg font-semibold">Form Absensi</h1>
          </div>
        </div>
      </header>

      <main className="desktop-container desktop-content-margins pb-28 pt-6">
        <Card>
          <CardHeader>
            <CardTitle>Absensi Aktivitas Harian</CardTitle>
            <CardDescription>Isi form absensi aktivitas harian marketing</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Collapsible open={openSections.identitas} onOpenChange={(open) => setOpenSections({ ...openSections, identitas: open })}>
                <Card className="cursor-pointer hover:bg-muted/50  transition-colors">
                  <CollapsibleTrigger asChild>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Identitas dan Waktu</CardTitle>
                        {openSections.identitas ? (
                          <ChevronDownIcon className="h-4 w-4 transition-transform duration-300" />
                        ) : (
                          <ChevronRightIcon className="h-4 w-4 transition-transform duration-300" />
                        )}
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="transition-all duration-300 ease-in-out data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:animate-in data-[state=open]:fade-in">
                    <CardContent className="space-y-4 pt-2">
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
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>

              <Collapsible open={openSections.outlet} onOpenChange={(open) => setOpenSections({ ...openSections, outlet: open })}>
                <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CollapsibleTrigger asChild>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Info Outlet/Kunjungan</CardTitle>
                        {openSections.outlet ? (
                          <ChevronDownIcon className="h-4 w-4 transition-transform duration-300" />
                        ) : (
                          <ChevronRightIcon className="h-4 w-4 transition-transform duration-300" />
                        )}
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="transition-all duration-300 ease-in-out data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:animate-in data-[state=open]:fade-in">
                    <CardContent className="space-y-4 pt-2">
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
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>

              <Collapsible open={openSections.kategori} onOpenChange={(open) => setOpenSections({ ...openSections, kategori: open })}>
                <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CollapsibleTrigger asChild>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Kategori Aktivitas</CardTitle>
                        {openSections.kategori ? (
                          <ChevronDownIcon className="h-4 w-4 transition-transform duration-300" />
                        ) : (
                          <ChevronRightIcon className="h-4 w-4 transition-transform duration-300" />
                        )}
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="transition-all duration-300 ease-in-out data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:animate-in data-[state=open]:fade-in">
                    <CardContent className="space-y-4 pt-2">
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
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>

              <Collapsible open={openSections.produk} onOpenChange={(open) => setOpenSections({ ...openSections, produk: open })}>
                <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CollapsibleTrigger asChild>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Produk/Segmen</CardTitle>
                        {openSections.produk ? (
                          <ChevronDownIcon className="h-4 w-4 transition-transform duration-300" />
                        ) : (
                          <ChevronRightIcon className="h-4 w-4 transition-transform duration-300" />
                        )}
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="transition-all duration-300 ease-in-out data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:animate-in data-[state=open]:fade-in">
                    <CardContent className="space-y-6 pt-2">
                      {/* Produk/Segmen Dibahas */}
                      <div className="space-y-3">
                        <Label className="text-base font-medium">Produk/Segmen Dibahas</Label>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="kasa"
                              checked={formData.produkDibahas.kasa}
                              onCheckedChange={(checked) =>
                                setFormData({
                                  ...formData,
                                  produkDibahas: { ...formData.produkDibahas, kasa: checked as boolean }
                                })
                              }
                            />
                            <Label htmlFor="kasa" className="text-sm">Kasa</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="kertas"
                              checked={formData.produkDibahas.kertas}
                              onCheckedChange={(checked) =>
                                setFormData({
                                  ...formData,
                                  produkDibahas: { ...formData.produkDibahas, kertas: checked as boolean }
                                })
                              }
                            />
                            <Label htmlFor="kertas" className="text-sm">Kertas</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="pouch"
                              checked={formData.produkDibahas.pouch}
                              onCheckedChange={(checked) =>
                                setFormData({
                                  ...formData,
                                  produkDibahas: { ...formData.produkDibahas, pouch: checked as boolean }
                                })
                              }
                            />
                            <Label htmlFor="pouch" className="text-sm">Pouch</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="pensil"
                              checked={formData.produkDibahas.pensil}
                              onCheckedChange={(checked) =>
                                setFormData({
                                  ...formData,
                                  produkDibahas: { ...formData.produkDibahas, pensil: checked as boolean }
                                })
                              }
                            />
                            <Label htmlFor="pensil" className="text-sm">Pensil</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="collagen"
                              checked={formData.produkDibahas.collagen}
                              onCheckedChange={(checked) =>
                                setFormData({
                                  ...formData,
                                  produkDibahas: { ...formData.produkDibahas, collagen: checked as boolean }
                                })
                              }
                            />
                            <Label htmlFor="collagen" className="text-sm">Collagen</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="apron"
                              checked={formData.produkDibahas.apron}
                              onCheckedChange={(checked) =>
                                setFormData({
                                  ...formData,
                                  produkDibahas: { ...formData.produkDibahas, apron: checked as boolean }
                                })
                              }
                            />
                            <Label htmlFor="apron" className="text-sm">Apron</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="lainnya"
                              checked={formData.produkDibahas.lainnya}
                              onCheckedChange={(checked) =>
                                setFormData({
                                  ...formData,
                                  produkDibahas: { ...formData.produkDibahas, lainnya: checked as boolean }
                                })
                              }
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
                        <Label htmlFor="minatOppLevel">Minat/Opp Level</Label>
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
                      <div className="space-y-2">
                        <Label htmlFor="kuantitas">Kuantitas/Estimasi Nilai</Label>
                        <Input
                          id="kuantitas"
                          type="text"
                          placeholder="Masukkan kuantitas/estimasi nilai"
                          value={formData.kuantitas}
                          onChange={(e) => setFormData({ ...formData, kuantitas: e.target.value })}
                        />
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>

              <Collapsible open={openSections.ringkasan} onOpenChange={(open) => setOpenSections({ ...openSections, ringkasan: open })}>
                <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CollapsibleTrigger asChild>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Ringkasan & Hasil</CardTitle>
                        {openSections.ringkasan ? (
                          <ChevronDownIcon className="h-4 w-4 transition-transform duration-300" />
                        ) : (
                          <ChevronRightIcon className="h-4 w-4 transition-transform duration-300" />
                        )}
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="transition-all duration-300 ease-in-out data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:animate-in data-[state=open]:fade-in">
                    <CardContent className="space-y-6 pt-2">
                      {/* Ringkasan Diskusi */}
                      <div className="space-y-2">
                        <Label htmlFor="ringkasanDiskusi">Ringkasan Diskusi</Label>
                        <textarea
                          id="ringkasanDiskusi"
                          placeholder="Masukkan ringkasan diskusi dan hasil"
                          value={formData.ringkasanDiskusi}
                          onChange={(e) => setFormData({ ...formData, ringkasanDiskusi: e.target.value })}
                          className="flex min-h-[80px] w-full rounded-md border border-input bg-card dark:bg-muted px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                              onCheckedChange={(checked) =>
                                setFormData({
                                  ...formData,
                                  statusTahap: { ...formData.statusTahap, prospek: checked as boolean }
                                })
                              }
                            />
                            <Label htmlFor="prospek" className="text-sm">Prospek</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="presentasi"
                              checked={formData.statusTahap.presentasi}
                              onCheckedChange={(checked) =>
                                setFormData({
                                  ...formData,
                                  statusTahap: { ...formData.statusTahap, presentasi: checked as boolean }
                                })
                              }
                            />
                            <Label htmlFor="presentasi" className="text-sm">Presentasi</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="trial"
                              checked={formData.statusTahap.trial}
                              onCheckedChange={(checked) =>
                                setFormData({
                                  ...formData,
                                  statusTahap: { ...formData.statusTahap, trial: checked as boolean }
                                })
                              }
                            />
                            <Label htmlFor="trial" className="text-sm">Trial</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="negosiasi"
                              checked={formData.statusTahap.negosiasi}
                              onCheckedChange={(checked) =>
                                setFormData({
                                  ...formData,
                                  statusTahap: { ...formData.statusTahap, negosiasi: checked as boolean }
                                })
                              }
                            />
                            <Label htmlFor="negosiasi" className="text-sm">Negosiasi</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="po"
                              checked={formData.statusTahap.po}
                              onCheckedChange={(checked) =>
                                setFormData({
                                  ...formData,
                                  statusTahap: { ...formData.statusTahap, po: checked as boolean }
                                })
                              }
                            />
                            <Label htmlFor="po" className="text-sm">PO</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="delivery"
                              checked={formData.statusTahap.delivery}
                              onCheckedChange={(checked) =>
                                setFormData({
                                  ...formData,
                                  statusTahap: { ...formData.statusTahap, delivery: checked as boolean }
                                })
                              }
                            />
                            <Label htmlFor="delivery" className="text-sm">Delivery</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="closing"
                              checked={formData.statusTahap.closing}
                              onCheckedChange={(checked) =>
                                setFormData({
                                  ...formData,
                                  statusTahap: { ...formData.statusTahap, closing: checked as boolean }
                                })
                              }
                            />
                            <Label htmlFor="closing" className="text-sm">Closing</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="afterSales"
                              checked={formData.statusTahap.afterSales}
                              onCheckedChange={(checked) =>
                                setFormData({
                                  ...formData,
                                  statusTahap: { ...formData.statusTahap, afterSales: checked as boolean }
                                })
                              }
                            />
                            <Label htmlFor="afterSales" className="text-sm">After-sales</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="statusTahapOther"
                              checked={formData.statusTahap.other}
                              onCheckedChange={(checked) =>
                                setFormData({
                                  ...formData,
                                  statusTahap: { ...formData.statusTahap, other: checked as boolean }
                                })
                              }
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
                        <Label className="text-base font-medium">Kebutuhan Dokumen</Label>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="companyProfile"
                              checked={formData.kebutuhanDokumen.companyProfile}
                              onCheckedChange={(checked) =>
                                setFormData({
                                  ...formData,
                                  kebutuhanDokumen: { ...formData.kebutuhanDokumen, companyProfile: checked as boolean }
                                })
                              }
                            />
                            <Label htmlFor="companyProfile" className="text-sm">Company profile</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="brosur"
                              checked={formData.kebutuhanDokumen.brosur}
                              onCheckedChange={(checked) =>
                                setFormData({
                                  ...formData,
                                  kebutuhanDokumen: { ...formData.kebutuhanDokumen, brosur: checked as boolean }
                                })
                              }
                            />
                            <Label htmlFor="brosur" className="text-sm">Brosur</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="sph"
                              checked={formData.kebutuhanDokumen.sph}
                              onCheckedChange={(checked) =>
                                setFormData({
                                  ...formData,
                                  kebutuhanDokumen: { ...formData.kebutuhanDokumen, sph: checked as boolean }
                                })
                              }
                            />
                            <Label htmlFor="sph" className="text-sm">SPH</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="kakSpesifikasi"
                              checked={formData.kebutuhanDokumen.kakSpesifikasi}
                              onCheckedChange={(checked) =>
                                setFormData({
                                  ...formData,
                                  kebutuhanDokumen: { ...formData.kebutuhanDokumen, kakSpesifikasi: checked as boolean }
                                })
                              }
                            />
                            <Label htmlFor="kakSpesifikasi" className="text-sm">KAK/Spesifikasi</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="draftKontrak"
                              checked={formData.kebutuhanDokumen.draftKontrak}
                              onCheckedChange={(checked) =>
                                setFormData({
                                  ...formData,
                                  kebutuhanDokumen: { ...formData.kebutuhanDokumen, draftKontrak: checked as boolean }
                                })
                              }
                            />
                            <Label htmlFor="draftKontrak" className="text-sm">Draft Kontak</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="formTrial"
                              checked={formData.kebutuhanDokumen.formTrial}
                              onCheckedChange={(checked) =>
                                setFormData({
                                  ...formData,
                                  kebutuhanDokumen: { ...formData.kebutuhanDokumen, formTrial: checked as boolean }
                                })
                              }
                            />
                            <Label htmlFor="formTrial" className="text-sm">Form Trial</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="dokumenOther"
                              checked={formData.kebutuhanDokumen.other}
                              onCheckedChange={(checked) =>
                                setFormData({
                                  ...formData,
                                  kebutuhanDokumen: { ...formData.kebutuhanDokumen, other: checked as boolean }
                                })
                              }
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
                          <Label htmlFor="competitorDisebut">Competitor Disebut?</Label>
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
                              <Label htmlFor="merekModelKompetitor">Merek/Model Kompetitor</Label>
                              <textarea
                                id="merekModelKompetitor"
                                placeholder="Masukkan merek/model kompetitor"
                                value={formData.merekModelKompetitor}
                                onChange={(e) => setFormData({ ...formData, merekModelKompetitor: e.target.value })}
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-card dark:bg-muted px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                rows={3}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="hargaKompetitor">Harga Kompetitor</Label>
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
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>

              <Collapsible open={openSections.nextAction} onOpenChange={(open) => setOpenSections({ ...openSections, nextAction: open })}>
                <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CollapsibleTrigger asChild>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Next Action</CardTitle>
                        {openSections.nextAction ? (
                          <ChevronDownIcon className="h-4 w-4 transition-transform duration-300" />
                        ) : (
                          <ChevronRightIcon className="h-4 w-4 transition-transform duration-300" />
                        )}
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="transition-all duration-300 ease-in-out data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:animate-in data-[state=open]:fade-in">
                    <CardContent className="space-y-4 pt-2">
                      <div className="space-y-2">
                        <Label htmlFor="nextAction">Tindakan Lanjutan</Label>
                        <Input
                          id="nextAction"
                          type="text"
                          placeholder="Masukkan tindakan lanjutan"
                          value={formData.nextAction}
                          onChange={(e) => setFormData({ ...formData, nextAction: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="tugasLanjutan">Tugas Lanjutan</Label>
                        <textarea
                          id="tugasLanjutan"
                          placeholder="Masukkan detail tugas lanjutan"
                          value={formData.tugasLanjutan}
                          onChange={(e) => setFormData({ ...formData, tugasLanjutan: e.target.value })}
                          className="flex min-h-[80px] w-full rounded-md border border-input bg-card dark:bg-muted px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                                format(new Date(formData.tanggalJatuhTempo), "dd/MM/yyyy", { locale: id })
                              ) : (
                                <span>Pilih tanggal jatuh tempo</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={formData.tanggalJatuhTempo ? new Date(formData.tanggalJatuhTempo) : undefined}
                              onSelect={(date) => setFormData({ ...formData, tanggalJatuhTempo: date ? date.toISOString().split('T')[0] : "" })}
                              locale={id}
                              className="rounded-md"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>

              <Button type="submit" className="w-full cursor-pointer">
                Submit Absensi
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}