"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [isTransitioning, setIsTransitioning] = React.useState(false)

  const toggleTheme = () => {
    setIsTransitioning(true)
    setTheme(theme === "dark" ? "light" : "dark")

    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false)
    }, 300)
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className={cn(
        "relative overflow-hidden",
        isTransitioning && "animate-pulse"
      )}
    >
      <Sun className={cn(
        "h-[1.2rem] w-[1.2rem] transition-all duration-500 ease-in-out",
        "scale-100 rotate-0 dark:scale-0 dark:-rotate-90",
        isTransitioning && "animate-spin"
      )} />
      <Moon className={cn(
        "absolute h-[1.2rem] w-[1.2rem] transition-all duration-500 ease-in-out",
        "scale-0 rotate-90 dark:scale-100 dark:rotate-0",
        isTransitioning && "animate-spin"
      )} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
