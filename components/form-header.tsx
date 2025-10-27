"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon } from "lucide-react"

interface FormHeaderProps {
  title: string
  description: string
  showBackButton?: boolean
  backButtonText?: string
}

export function FormHeader({ 
  title, 
  description, 
  showBackButton = true, 
  backButtonText = "Kembali" 
}: FormHeaderProps) {
  const router = useRouter()

  return (
    <div className="mb-6">
      {showBackButton && (
        <Button 
          variant="ghost" 
          onClick={() => router.back()}
          className="mb-4"
        >
          <ChevronLeftIcon className="h-4 w-4 mr-2" />
          {backButtonText}
        </Button>
      )}
      
      <section className="prose mx-auto max-w-none text-center sm:text-left">
        <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
        <p className="text-zinc-600 dark:text-zinc-400">{description}</p>
      </section>
    </div>
  )
}