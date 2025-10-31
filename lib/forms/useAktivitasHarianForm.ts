"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { AktivitasHarianFormData, OpenSections } from "./aktivitas-harian-types"

const initialFormData: AktivitasHarianFormData = {
  email: "",
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
  const supabase = createClient()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          // Update form with user data from auth
          setFormData(prev => ({
            ...prev,
            email: user.email || "",
            nama: user.user_metadata?.nama || user.email?.split('@')[0] || ""
          }))
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchUserData()
  }, [supabase])

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