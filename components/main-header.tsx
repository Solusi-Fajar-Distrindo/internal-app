"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, MoreVerticalIcon } from "lucide-react"

interface MainHeaderProps {
  title: string
  description?: string
  showBackButton?: boolean
  backButtonText?: string
  sticky?: boolean
  rightAction?: React.ReactNode
}

export function MainHeader({ 
  title, 
  description,
  showBackButton = true, 
  backButtonText = "Kembali",
  sticky = true,
  rightAction
}: MainHeaderProps) {
  const router = useRouter()

  const headerClasses = sticky
    ? "sticky top-0 z-50 bg-background border-b border-border py-2"
    : "border-b border-border py-2"

  return (
    <>
      <header className={headerClasses}>
        <div className="flex items-center justify-between h-14 px-4">
          {/* Left side - Back button */}
          <div className="flex items-center">
            {showBackButton && (
              <Button
                variant="ghost" 
                size="icon"
                onClick={() => router.back()}
                className="h-9 w-9 hover:bg-accent/50 transition-colors"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </Button>
            )}
          </div>

          {/* Center - Title */}
          <div className="flex-1 text-center px-4 min-w-0">
            <h1 className="text-base font-semibold text-foreground truncate">
              {title}
            </h1>
            {description && (
              <p className="text-xs text-muted-foreground truncate mt-0.5">
                {description}
              </p>
            )}
          </div>

          {/* Right side - Action or spacer */}
          <div className="flex items-center">
            {rightAction || <div className="h-9 w-9" />}
          </div>
        </div>
      </header>

      {/* Add padding below header to account for fixed positioning */}
      {sticky && <div className="h-6" />}
    </>
  )
}