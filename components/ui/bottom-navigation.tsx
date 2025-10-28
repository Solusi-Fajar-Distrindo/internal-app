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
    { id: "settings", label: "Pengaturan", icon: SettingsIcon },
  ]

  return (
    // bottom navigation docked to bottom of page
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-zinc-200 dark:border-zinc-800 bg-white/90 backdrop-blur-md dark:bg-black/80">
      <div className="mx-auto flex max-w-lg items-center justify-between gap-2 px-4 py-3 text-zinc-700 dark:text-zinc-200">
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
                "flex flex-col items-center gap-0.5 rounded-lg px-2 py-1 text-sm transition-all duration-200 hover:scale-105 cursor-pointer",
                isActive && "text-primary bg-primary/10"
              )}
            >
              <Icon
                className={`h-6 w-6 transition-all duration-200 ${isActive
                  ? 'scale-110 fill-current'
                  : 'scale-100'
                  }`}
              />
              <span className={`text-sm leading-none transition-all duration-200 ${isActive
                ? 'font-semibold text-primary'
                : 'font-normal text-zinc-600 dark:text-zinc-400'
                }`}>{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default BottomNavigation
