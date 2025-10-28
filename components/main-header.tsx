"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, MoreVerticalIcon } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"

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
    ? "sticky top-0 z-50 border-b border-border py-2 backdrop-blur-sm"
    : "border-b border-border py-2 backdrop-blur-sm"

  return (
    <>
      <header className={headerClasses}>
        <div className="desktop-header-margins flex items-center justify-between h-14">
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

          {/* Right side - Action or ModeToggle */}
          <div className="flex items-center">
            {rightAction || <ModeToggle />}
          </div>
        </div>
      </header>

      {/* Add padding below header to account for fixed positioning */}
      {sticky && <div className="h-6" />}
    </>
  )
}