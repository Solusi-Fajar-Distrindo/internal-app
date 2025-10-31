export interface ProdukDibahas {
  kasa: boolean
  kertas: boolean
  pouch: boolean
  pensil: boolean
  collagen: boolean
  apron: boolean
  lainnya: boolean
}

export interface Kuantitas {
  kasa: string
  kertas: string
  pouch: string
  pensil: string
  collagen: string
  apron: string
  lainnya: string
}

export interface StatusTahap {
  prospek: boolean
  presentasi: boolean
  trial: boolean
  negosiasi: boolean
  po: boolean
  delivery: boolean
  closing: boolean
  afterSales: boolean
  other: boolean
}

export interface KebutuhanDokumen {
  companyProfile: boolean
  brosur: boolean
  sph: boolean
  kakSpesifikasi: boolean
  draftKontrak: boolean
  formTrial: boolean
  other: boolean
}

export interface AktivitasHarianFormData {
  email: string
  nama: string
  area: string
  jenisOutlet: string
  namaOutlet: string
  kota: string
  pic: string
  jabatanPic: string
  hpPic: string
  emailPic: string
  tipeAktivitas: string
  tujuanKunjungan: string
  waktuMulai: string
  waktuSelesai: string
  produkDibahas: ProdukDibahas
  produkLainnya: string
  minatOppLevel: string
  kuantitas: Kuantitas
  ringkasanDiskusi: string
  statusTahap: StatusTahap
  statusTahapLainnya: string
  kebutuhanDokumen: KebutuhanDokumen
  kebutuhanDokumenLainnya: string
  competitorDisebut: string
  merekModelKompetitor: string
  hargaKompetitor: string
  nextAction: string
  tugasLanjutan: string
  tanggalJatuhTempo: string
}

export interface OpenSections {
  identitas: boolean
  outlet: boolean
  kategori: boolean
  produk: boolean
  ringkasan: boolean
  nextAction: boolean
}

export interface FormSectionProps {
  formData: AktivitasHarianFormData
  setFormData: (data: AktivitasHarianFormData | ((prev: AktivitasHarianFormData) => AktivitasHarianFormData)) => void
  selectedDate: Date | undefined
  setSelectedDate: (date: Date | undefined) => void
}