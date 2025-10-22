"use client"

import * as React from "react"
import { Home, FileText, Settings as SettingsIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface BottomNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const items = [
    { id: "home", label: "Home", icon: Home },
    { id: "forms", label: "Forms", icon: FileText },
    { id: "settings", label: "Settings", icon: SettingsIcon },
  ]

  return (
    // bottom navigation for all screen sizes
    <nav className="fixed bottom-4 left-4 right-4 z-40">
      <div className="mx-auto flex max-w-lg items-center justify-between gap-2 rounded-2xl bg-white/90 px-4 py-3 text-zinc-700 shadow-md backdrop-blur-md dark:bg-black/80 dark:text-zinc-200 dark:shadow-lg dark:shadow-white/5">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "flex flex-col items-center gap-0.5 rounded-lg px-2 py-1 text-sm transition-all duration-200 hover:scale-105",
                isActive && "text-primary bg-primary/10"
              )}
            >
              <Icon className={`h-6 w-6 transition-transform duration-200 ${isActive ? 'scale-110' : ''}`} />
              <span className={`text-sm leading-none transition-all duration-200 ${isActive ? 'font-semibold' : ''}`}>{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default BottomNavigation
