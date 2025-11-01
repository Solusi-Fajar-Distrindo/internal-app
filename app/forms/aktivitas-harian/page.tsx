"use client"

import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MainHeader } from "@/components/main-header"
import { CollapsibleFormSection } from "@/components/forms/CollapsibleFormSection"
import { IdentitasSection } from "@/components/forms/aktivitas-harian/IdentitasSection"
import { OutletInfoSection } from "@/components/forms/aktivitas-harian/OutletInfoSection"
import { KategoriAktivitasSection } from "@/components/forms/aktivitas-harian/KategoriAktivitasSection"
import { ProdukSection } from "@/components/forms/aktivitas-harian/ProdukSection"
import { RingkasanSection } from "@/components/forms/aktivitas-harian/RingkasanSection"
import { NextActionSection } from "@/components/forms/aktivitas-harian/NextActionSection"
import { useAktivitasHarianForm } from "@/lib/forms/useAktivitasHarianForm"

export default function FormsPage() {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const { formData, setFormData, openSections, toggleSection, resetForm } = useAktivitasHarianForm()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/submit-aktivitas-harian', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData, selectedDate: selectedDate?.toISOString() })
      })

      const data = await res.json()
      if (res.ok && data.success) {
        toast.success('Form submitted successfully and saved to Google Sheets')
        router.push('/forms/aktivitas-harian/sukses')
      } else {
        console.error('Submission error', data)
        toast.error('Failed to submit form: ' + (data.error || 'unknown error'))
      }
    } catch (err) {
      console.error(err)
      toast.error('An unexpected error occurred while submitting the form.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans">
      <MainHeader
        title="Form Absensi"
        description="Isi form absensi aktivitas harian marketing"
      />

      <main className="desktop-container desktop-content-margins pb-28 pt-6">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Absensi Aktivitas Harian</CardTitle>
            <CardDescription>Isi form absensi aktivitas harian marketing</CardDescription>
          </CardHeader>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-4">
          <CollapsibleFormSection
            title="Identitas dan Waktu"
            isOpen={openSections.identitas}
            onOpenChange={() => toggleSection('identitas')}
          >
            <IdentitasSection
              formData={formData}
              setFormData={setFormData}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </CollapsibleFormSection>

          <CollapsibleFormSection
            title="Info Outlet/Kunjungan"
            isOpen={openSections.outlet}
            onOpenChange={() => toggleSection('outlet')}
          >
            <OutletInfoSection
              formData={formData}
              setFormData={setFormData}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </CollapsibleFormSection>

          <CollapsibleFormSection
            title="Kategori Aktivitas"
            isOpen={openSections.kategori}
            onOpenChange={() => toggleSection('kategori')}
          >
            <KategoriAktivitasSection
              formData={formData}
              setFormData={setFormData}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </CollapsibleFormSection>

          <CollapsibleFormSection
            title="Produk/Segmen"
            isOpen={openSections.produk}
            onOpenChange={() => toggleSection('produk')}
          >
            <ProdukSection
              formData={formData}
              setFormData={setFormData}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </CollapsibleFormSection>

          <CollapsibleFormSection
            title="Ringkasan & Hasil"
            isOpen={openSections.ringkasan}
            onOpenChange={() => toggleSection('ringkasan')}
          >
            <RingkasanSection
              formData={formData}
              setFormData={setFormData}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </CollapsibleFormSection>

          <CollapsibleFormSection
            title="Next Action"
            isOpen={openSections.nextAction}
            onOpenChange={() => toggleSection('nextAction')}
          >
            <NextActionSection
              formData={formData}
              setFormData={setFormData}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </CollapsibleFormSection>

          <Card className="mt-6">
            <CardContent>
              <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Absensi'}
              </Button>
            </CardContent>
          </Card>
        </form>
      </main>
    </div>
  )
}