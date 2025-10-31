import { mapFormToSheetRow } from '@/lib/forms/aktivitas-harian-to-row'
import { mockFormData, mockSheetRow } from '@/__tests__/fixtures/test-data'

describe('Form to Sheet Row Mapping', () => {
  describe('mapFormToSheetRow', () => {
    it('should map form data to sheet row correctly', () => {
      const result = mapFormToSheetRow(mockFormData)
      
      expect(result).toEqual(
        expect.objectContaining({
          'Email Address': 'john.doe@example.com',
          'Nama': 'John Doe',
          'Area': 'Jakarta',
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
        })
      )
    })

    it('should handle empty produkDibahas', () => {
      const emptyFormData = {
        ...mockFormData,
        produkDibahas: {
          kasa: false,
          kertas: false,
          pouch: false,
          pensil: false,
          collagen: false,
          apron: false,
          lainnya: false
        }
      }

      const result = mapFormToSheetRow(emptyFormData)
      
      expect(result['Produk/Segmen Dibahas']).toBe('')
    })

    it('should handle single selected produk', () => {
      const singleProductData = {
        ...mockFormData,
        produkDibahas: {
          kasa: true,
          kertas: false,
          pouch: false,
          pensil: false,
          collagen: false,
          apron: false,
          lainnya: false
        }
      }

      const result = mapFormToSheetRow(singleProductData)
      
      expect(result['Produk/Segmen Dibahas']).toBe('Kasa')
    })

    it('should handle all produk selected', () => {
      const allProductsData = {
        ...mockFormData,
        produkDibahas: {
          kasa: true,
          kertas: true,
          pouch: true,
          pensil: true,
          collagen: true,
          apron: true,
          lainnya: true
        }
      }

      const result = mapFormToSheetRow(allProductsData)
      
      expect(result['Produk/Segmen Dibahas']).toBe('Kasa, Kertas, Pouch, Pensil, Collagen, Apron, Lainnya')
    })

    it('should handle empty statusTahap', () => {
      const emptyStatusData = {
        ...mockFormData,
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
        }
      }

      const result = mapFormToSheetRow(emptyStatusData)
      
      expect(result['Status Tahap']).toBe('')
    })

    it('should handle multiple statusTahap', () => {
      const multipleStatusData = {
        ...mockFormData,
        statusTahap: {
          prospek: true,
          presentasi: true,
          trial: false,
          negosiasi: false,
          po: false,
          delivery: false,
          closing: false,
          afterSales: false,
          other: false
        }
      }

      const result = mapFormToSheetRow(multipleStatusData)
      
      expect(result['Status Tahap']).toBe('Prospek, Presentasi')
    })

    it('should handle empty kuantitas', () => {
      const emptyKuantitasData = {
        ...mockFormData,
        kuantitas: {
          kasa: '',
          kertas: '',
          pouch: '',
          pensil: '',
          collagen: '',
          apron: '',
          lainnya: ''
        }
      }

      const result = mapFormToSheetRow(emptyKuantitasData)
      
      expect(result['Kuantitas/Estimasi Nilai (isi value per item produk)']).toBe('')
    })

    it('should handle partial kuantitas', () => {
      const partialKuantitasData = {
        ...mockFormData,
        kuantitas: {
          kasa: '100',
          kertas: '0',
          pouch: '50',
          pensil: '0',
          collagen: '0',
          apron: '0',
          lainnya: '0'
        }
      }

      const result = mapFormToSheetRow(partialKuantitasData)
      
      expect(result['Kuantitas/Estimasi Nilai (isi value per item produk)']).toBe('kasa: 100; pouch: 50')
    })

    it('should handle empty kebutuhanDokumen', () => {
      const emptyDokumenData = {
        ...mockFormData,
        kebutuhanDokumen: {
          companyProfile: false,
          brosur: false,
          sph: false,
          kakSpesifikasi: false,
          draftKontrak: false,
          formTrial: false,
          other: false
        }
      }

      const result = mapFormToSheetRow(emptyDokumenData)
      
      expect(result['Kebutuhan Dokumen']).toBe('')
    })

    it('should handle all kebutuhanDokumen selected', () => {
      const allDokumenData = {
        ...mockFormData,
        kebutuhanDokumen: {
          companyProfile: true,
          brosur: true,
          sph: true,
          kakSpesifikasi: true,
          draftKontrak: true,
          formTrial: true,
          other: true
        }
      }

      const result = mapFormToSheetRow(allDokumenData)
      
      expect(result['Kebutuhan Dokumen']).toBe('Company Profile, Brosur, SPH, KAK / Spesifikasi, Draft Kontrak, Form Trial, Other')
    })

    it('should handle empty ringkasanDiskusi', () => {
      const emptyRingkasanData = {
        ...mockFormData,
        ringkasanDiskusi: ''
      }

      const result = mapFormToSheetRow(emptyRingkasanData)
      
      expect(result['Ringkasan Diskusi']).toBe('')
    })

    it('should handle selectedDate parameter', () => {
      const selectedDate = new Date('2024-01-20')
      const result = mapFormToSheetRow(mockFormData, selectedDate)
      
      expect(result['Tanggal Kegiatan']).toBe('2024-01-20')
    })

    it('should use empty string when selectedDate is not provided', () => {
      const result = mapFormToSheetRow(mockFormData)
      
      expect(result['Tanggal Kegiatan']).toBe('')
    })

    it('should handle special characters in ringkasanDiskusi', () => {
      const specialCharsData = {
        ...mockFormData,
        ringkasanDiskusi: 'Test dengan karakter khusus: @#$%^&*()_+-=[]{}|;:,.<>?'
      }

      const result = mapFormToSheetRow(specialCharsData)
      
      expect(result['Ringkasan Diskusi']).toBe('Test dengan karakter khusus: @#$%^&*()_+-=[]{}|;:,.<>?')
    })

    it('should handle very long ringkasanDiskusi', () => {
      const longRingkasan = 'A'.repeat(1000)
      const longRingkasanData = {
        ...mockFormData,
        ringkasanDiskusi: longRingkasan
      }

      const result = mapFormToSheetRow(longRingkasanData)
      
      expect(result['Ringkasan Diskusi']).toBe(longRingkasan)
    })

    it('should handle numeric values in kuantitas as strings', () => {
      const stringKuantitasData = {
        ...mockFormData,
        kuantitas: {
          kasa: '100',
          kertas: '0',
          pouch: '50',
          pensil: '0',
          collagen: '0',
          apron: '0',
          lainnya: '0'
        }
      }

      const result = mapFormToSheetRow(stringKuantitasData)
      
      expect(result['Kuantitas/Estimasi Nilai (isi value per item produk)']).toBe('kasa: 100; pouch: 50')
    })

    it('should handle decimal values in kuantitas', () => {
      const decimalKuantitasData = {
        ...mockFormData,
        kuantitas: {
          kasa: '100.5',
          kertas: '0',
          pouch: '50.25',
          pensil: '0',
          collagen: '0',
          apron: '0',
          lainnya: '0'
        }
      }

      const result = mapFormToSheetRow(decimalKuantitasData)
      
      expect(result['Kuantitas/Estimasi Nilai (isi value per item produk)']).toBe('kasa: 100.5; pouch: 50.25')
    })

    it('should handle produkLainnya when lainnya is selected with text', () => {
      const dataWithLainnya = {
        ...mockFormData,
        produkDibahas: {
          kasa: true,
          kertas: false,
          pouch: false,
          pensil: false,
          collagen: false,
          apron: false,
          lainnya: true
        },
        produkLainnya: 'Produk Kustom'
      }

      const result = mapFormToSheetRow(dataWithLainnya)
      
      expect(result['Produk/Segmen Dibahas']).toBe('Kasa, Lainnya: Produk Kustom')
    })

    it('should handle produkLainnya when only lainnya is selected', () => {
      const dataWithOnlyLainnya = {
        ...mockFormData,
        produkDibahas: {
          kasa: false,
          kertas: false,
          pouch: false,
          pensil: false,
          collagen: false,
          apron: false,
          lainnya: true
        },
        produkLainnya: 'Produk Spesial'
      }

      const result = mapFormToSheetRow(dataWithOnlyLainnya)
      
      expect(result['Produk/Segmen Dibahas']).toBe('Lainnya: Produk Spesial')
    })

    it('should handle produkLainnya when lainnya is selected but text is empty', () => {
      const dataWithEmptyLainnya = {
        ...mockFormData,
        produkDibahas: {
          kasa: true,
          kertas: false,
          pouch: false,
          pensil: false,
          collagen: false,
          apron: false,
          lainnya: true
        },
        produkLainnya: ''
      }

      const result = mapFormToSheetRow(dataWithEmptyLainnya)
      
      expect(result['Produk/Segmen Dibahas']).toBe('Kasa, Lainnya')
    })

    it('should handle produkLainnya when lainnya is selected but text is only whitespace', () => {
      const dataWithWhitespaceLainnya = {
        ...mockFormData,
        produkDibahas: {
          kasa: true,
          kertas: false,
          pouch: false,
          pensil: false,
          collagen: false,
          apron: false,
          lainnya: true
        },
        produkLainnya: '   \n\t   '
      }

      const result = mapFormToSheetRow(dataWithWhitespaceLainnya)
      
      expect(result['Produk/Segmen Dibahas']).toBe('Kasa, Lainnya')
    })

    it('should handle statusTahapLainnya when other is selected', () => {
      const dataWithOtherStatus = {
        ...mockFormData,
        statusTahap: {
          prospek: true,
          presentasi: false,
          trial: false,
          negosiasi: false,
          po: false,
          delivery: false,
          closing: false,
          afterSales: false,
          other: true
        },
        statusTahapLainnya: 'Status Kustom'
      }

      const result = mapFormToSheetRow(dataWithOtherStatus)
      
      expect(result['Status Tahap']).toBe('Prospek, Other: Status Kustom')
    })

    it('should handle statusTahapLainnya when only other is selected', () => {
      const dataWithOnlyOtherStatus = {
        ...mockFormData,
        statusTahap: {
          prospek: false,
          presentasi: false,
          trial: false,
          negosiasi: false,
          po: false,
          delivery: false,
          closing: false,
          afterSales: false,
          other: true
        },
        statusTahapLainnya: 'Status Unik'
      }

      const result = mapFormToSheetRow(dataWithOnlyOtherStatus)
      
      expect(result['Status Tahap']).toBe('Other: Status Unik')
    })

    it('should handle statusTahapLainnya when other is selected but text is empty', () => {
      const dataWithEmptyOtherStatus = {
        ...mockFormData,
        statusTahap: {
          prospek: true,
          presentasi: false,
          trial: false,
          negosiasi: false,
          po: false,
          delivery: false,
          closing: false,
          afterSales: false,
          other: true
        },
        statusTahapLainnya: ''
      }

      const result = mapFormToSheetRow(dataWithEmptyOtherStatus)
      
      expect(result['Status Tahap']).toBe('Prospek, Other')
    })

    it('should handle kebutuhanDokumenLainnya when other is selected', () => {
      const dataWithOtherDoc = {
        ...mockFormData,
        kebutuhanDokumen: {
          companyProfile: true,
          brosur: false,
          sph: false,
          kakSpesifikasi: false,
          draftKontrak: false,
          formTrial: false,
          other: true
        },
        kebutuhanDokumenLainnya: 'Dokumen Kustom'
      }

      const result = mapFormToSheetRow(dataWithOtherDoc)
      
      expect(result['Kebutuhan Dokumen']).toBe('Company Profile, Other: Dokumen Kustom')
    })

    it('should handle kebutuhanDokumenLainnya when only other is selected', () => {
      const dataWithOnlyOtherDoc = {
        ...mockFormData,
        kebutuhanDokumen: {
          companyProfile: false,
          brosur: false,
          sph: false,
          kakSpesifikasi: false,
          draftKontrak: false,
          formTrial: false,
          other: true
        },
        kebutuhanDokumenLainnya: 'Dokumen Spesial'
      }

      const result = mapFormToSheetRow(dataWithOnlyOtherDoc)
      
      expect(result['Kebutuhan Dokumen']).toBe('Other: Dokumen Spesial')
    })

    it('should handle kebutuhanDokumenLainnya when other is selected but text is empty', () => {
      const dataWithEmptyOtherDoc = {
        ...mockFormData,
        kebutuhanDokumen: {
          companyProfile: true,
          brosur: false,
          sph: false,
          kakSpesifikasi: false,
          draftKontrak: false,
          formTrial: false,
          other: true
        },
        kebutuhanDokumenLainnya: ''
      }

      const result = mapFormToSheetRow(dataWithEmptyOtherDoc)
      
      expect(result['Kebutuhan Dokumen']).toBe('Company Profile, Other')
    })

    it('should handle multiple lainnya fields simultaneously', () => {
      const dataWithMultipleLainnya = {
        ...mockFormData,
        produkDibahas: {
          kasa: true,
          kertas: false,
          pouch: false,
          pensil: false,
          collagen: false,
          apron: false,
          lainnya: true
        },
        produkLainnya: 'Produk Kustom',
        statusTahap: {
          prospek: false,
          presentasi: false,
          trial: false,
          negosiasi: false,
          po: false,
          delivery: false,
          closing: false,
          afterSales: false,
          other: true
        },
        statusTahapLainnya: 'Status Kustom',
        kebutuhanDokumen: {
          companyProfile: false,
          brosur: false,
          sph: false,
          kakSpesifikasi: false,
          draftKontrak: false,
          formTrial: false,
          other: true
        },
        kebutuhanDokumenLainnya: 'Dokumen Kustom'
      }

      const result = mapFormToSheetRow(dataWithMultipleLainnya)
      
      expect(result['Produk/Segmen Dibahas']).toBe('Kasa, Lainnya: Produk Kustom')
      expect(result['Status Tahap']).toBe('Other: Status Kustom')
      expect(result['Kebutuhan Dokumen']).toBe('Other: Dokumen Kustom')
    })
  })
})