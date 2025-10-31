"use client"

import { useState } from "react"
import { AktivitasHarianFormData, OpenSections } from "./aktivitas-harian-types"

const initialFormData: AktivitasHarianFormData = {
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
  kuantitas: {
    kasa: "",
    kertas: "",
    pouch: "",
    pensil: "",
    collagen: "",
    apron: "",
    lainnya: ""
  },
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
}

const initialOpenSections: OpenSections = {
  identitas: true,
  outlet: true,
  kategori: true,
  produk: true,
  ringkasan: true,
  nextAction: true
}

export function useAktivitasHarianForm() {
  const [formData, setFormData] = useState<AktivitasHarianFormData>(initialFormData)
  const [openSections, setOpenSections] = useState<OpenSections>(initialOpenSections)

  const updateFormData = (updates: Partial<AktivitasHarianFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }

  const updateNestedField = <T extends keyof AktivitasHarianFormData>(
    field: T,
    nestedField: string,
    value: boolean | string
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: {
        ...(prev[field] as unknown as Record<string, boolean | string>),
        [nestedField]: value
      }
    }))
  }

  const toggleSection = (section: keyof OpenSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const resetForm = () => {
    setFormData(initialFormData)
    setOpenSections(initialOpenSections)
  }

  return {
    formData,
    setFormData,
    updateFormData,
    updateNestedField,
    openSections,
    setOpenSections,
    toggleSection,
    resetForm
  }
}