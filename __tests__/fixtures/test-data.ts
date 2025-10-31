export const mockFormData = {
  email: 'john.doe@example.com',
  nama: 'John Doe',
  area: 'Jakarta',
  jenisOutlet: 'Modern Market',
  namaOutlet: 'Test Outlet',
  kota: 'Jakarta',
  pic: 'Jane Smith',
  jabatanPic: 'Manager',
  hpPic: '08123456789',
  emailPic: 'jane.smith@example.com',
  tipeAktivitas: 'Kunjungan Rutin',
  tujuanKunjungan: 'Presentasi Produk',
  waktuMulai: '09:00',
  waktuSelesai: '10:00',
  produkDibahas: {
    kasa: true,
    kertas: false,
    pouch: true,
    pensil: false,
    collagen: false,
    apron: false,
    lainnya: false
  },
  produkLainnya: '',
  minatOppLevel: 'Tinggi',
  kuantitas: {
    kasa: '100',
    kertas: '0',
    pouch: '50',
    pensil: '0',
    collagen: '0',
    apron: '0',
    lainnya: '0'
  },
  ringkasanDiskusi: 'Diskusi produk berjalan baik',
  statusTahap: {
    prospek: true,
    presentasi: false,
    trial: false,
    negosiasi: false,
    po: false,
    delivery: false,
    closing: false,
    afterSales: false,
    other: false
  },
  statusTahapLainnya: '',
  kebutuhanDokumen: {
    companyProfile: true,
    brosur: false,
    sph: true,
    kakSpesifikasi: false,
    draftKontrak: false,
    formTrial: false,
    other: false
  },
  kebutuhanDokumenLainnya: '',
  competitorDisebut: 'Competitor A',
  merekModelKompetitor: 'Brand X Model Y',
  hargaKompetitor: 'Rp 100.000',
  nextAction: 'Follow up dalam 3 hari',
  tugasLanjutan: 'Kirim quotation',
  tanggalJatuhTempo: '2024-01-20'
}

export const mockSheetRow = {
  'Timestamp': expect.any(String),
  'Email Address': 'john.doe@example.com',
  'Nama': 'John Doe',
  'Area': 'Jakarta',
  'Tanggal Kegiatan': '',
  'Jenis Outlet': 'Modern Market',
  'Nama Outlet (RS/PT)': 'Test Outlet',
  'Kota/Kabupaten': 'Jakarta',
  'PIC yang Ditemui': 'Jane Smith',
  'Jabatan/Departemen PIC': 'Manager',
  'Nomor HP PIC': '08123456789',
  'Email PIC': 'jane.smith@example.com',
  'Tipe Aktivitas': 'Kunjungan Rutin',
  'Tujuan Kunjungan': 'Presentasi Produk',
  'Waktu Mulai': '09:00',
  'Waktu Selesai': '10:00',
  'Produk/Segmen Dibahas': 'Kasa, Pouch',
  'Minat/Opp Level': 'Tinggi',
  'Kuantitas/Estimasi Nilai (isi value per item produk)': 'kasa: 100; pouch: 50',
  'Ringkasan Diskusi': 'Diskusi produk berjalan baik',
  'Status Tahap': 'Prospek',
  'Kebutuhan Dokumen': 'Company Profile, SPH',
  'Kompetitor Disebut?': 'Competitor A',
  'Merek/model kompetitor': 'Brand X Model Y',
  'Harga kompetitor': 'Rp 100.000',
  'Tugas Lanjutan': 'Kirim quotation',
  'Tanggal Jatuh Tempo': '2024-01-20'
}

export const mockGoogleSheetsResponse = {
  spreadsheetId: 'test-sheet-id',
  title: 'Test Spreadsheet',
  sheets: [
    {
      properties: {
        sheetId: '12345',
        title: 'Aktivitas Harian Log',
        index: 0
      }
    }
  ]
}

export const mockSheet = {
  title: 'Aktivitas Harian Log',
  rowCount: 1000,
  columnCount: 20,
  addRow: jest.fn().mockResolvedValue({
    _sheet: { title: 'Aktivitas Harian Log' },
    _rowNumber: 1,
    _rawData: ['John Doe', '2024-01-15', 'Test Outlet']
  })
}