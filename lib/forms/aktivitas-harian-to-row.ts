import { AktivitasHarianFormData, ProdukDibahas, StatusTahap, KebutuhanDokumen, Kuantitas } from "./aktivitas-harian-types"

function joinSelected(obj: Record<string, boolean> | ProdukDibahas | StatusTahap | KebutuhanDokumen, labels?: Record<string, string>, lainnyaText?: string) {
  const selected = Object.entries(obj)
    .filter(([, v]) => v)
    .map(([k]) => (labels && labels[k] ? labels[k] : k))
  
  // If "lainnya" is selected and additional text is provided, append it
  const hasLainnya = 'lainnya' in obj && obj.lainnya
  const hasOther = 'other' in obj && obj.other
  
  if ((hasLainnya || hasOther) && lainnyaText && lainnyaText.trim()) {
    const lainnyaIndex = selected.findIndex(item => item === 'Lainnya' || item === 'Other')
    if (lainnyaIndex !== -1) {
      selected[lainnyaIndex] = `${selected[lainnyaIndex]}: ${lainnyaText.trim()}`
    }
  }
  
  return selected.join(', ')
}

function serializeKuantitas(kuantitas: Kuantitas) {
  return Object.entries(kuantitas)
    .filter(([, v]) => v && v !== '' && v !== 0 && v !== "0")
    .map(([k, v]) => `${k}: ${v}`)
    .join('; ')
}

export function mapFormToSheetRow(formData: AktivitasHarianFormData, selectedDate?: Date) {
  const produkLabels: Record<string, string> = {
    kasa: 'Kasa',
    kertas: 'Kertas',
    pouch: 'Pouch',
    pensil: 'Pensil',
    collagen: 'Collagen',
    apron: 'Apron',
    lainnya: 'Lainnya'
  }

  const statusLabels: Record<string, string> = {
    prospek: 'Prospek',
    presentasi: 'Presentasi',
    trial: 'Trial',
    negosiasi: 'Negosiasi',
    po: 'PO',
    delivery: 'Delivery',
    closing: 'Closing',
    afterSales: 'After Sales',
    other: 'Other'
  }

  const dokLabels: Record<string, string> = {
    companyProfile: 'Company Profile',
    brosur: 'Brosur',
    sph: 'SPH',
    kakSpesifikasi: 'KAK / Spesifikasi',
    draftKontrak: 'Draft Kontrak',
    formTrial: 'Form Trial',
    other: 'Other'
  }

  const row: Record<string, string | number | boolean> = {
    'Timestamp': new Date().toISOString(),
    'Email Address': formData.email || '',
    'Nama': formData.nama || '',
    'Area': formData.area || '',
    'Tanggal Kegiatan': selectedDate ? selectedDate.toISOString().split('T')[0] : '',
    'Jenis Outlet': formData.jenisOutlet || '',
    'Nama Outlet (RS/PT)': formData.namaOutlet || '',
    'Kota/Kabupaten': formData.kota || '',
    'PIC yang Ditemui': formData.pic || '',
    'Jabatan/Departemen PIC': formData.jabatanPic || '',
    'Nomor HP PIC': formData.hpPic || '',
    'Email PIC': formData.emailPic || '',
    'Tipe Aktivitas': formData.tipeAktivitas || '',
    'Tujuan Kunjungan': formData.tujuanKunjungan || '',
    'Waktu Mulai': formData.waktuMulai || '',
    'Waktu Selesai': formData.waktuSelesai || '',
    'Produk/Segmen Dibahas': joinSelected(formData.produkDibahas, produkLabels, formData.produkLainnya) || '',
    'Minat/Opp Level': formData.minatOppLevel || '',
    'Kuantitas/Estimasi Nilai (isi value per item produk)': serializeKuantitas(formData.kuantitas) || '',
    'Ringkasan Diskusi': formData.ringkasanDiskusi || '',
    'Status Tahap': joinSelected(formData.statusTahap, statusLabels, formData.statusTahapLainnya) || '',
    'Kebutuhan Dokumen': joinSelected(formData.kebutuhanDokumen, dokLabels, formData.kebutuhanDokumenLainnya) || '',
    'Kompetitor Disebut?': formData.competitorDisebut || '',
    'Merek/model kompetitor': formData.merekModelKompetitor || '',
    'Harga kompetitor': formData.hargaKompetitor || '',
    'Tugas Lanjutan': formData.tugasLanjutan || '',
    'Tanggal Jatuh Tempo': formData.tanggalJatuhTempo || ''
  }

  return row
}

export default mapFormToSheetRow
