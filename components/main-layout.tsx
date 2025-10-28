"use client"

import { useState } from "react"
import { ModeToggle } from "@/components/mode-toggle"
import { BottomNavigation } from "@/components/ui/bottom-navigation"
import { HomeView } from "@/components/home-view"
import { FormsView } from "@/components/forms-view"
import { SettingsView } from "@/components/settings-view"
import Image from "next/image"

interface MainLayoutProps {
  children?: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const [activeTab, setActiveTab] = useState("home")

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomeView onNavigate={setActiveTab} />
      case "forms":
        return <FormsView onNavigate={setActiveTab} />
      case "settings":
        return <SettingsView />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans">
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-transparent px-4 py-3 backdrop-blur-sm">
        <div className="mx-auto flex max-w-lg w-full items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Image src="/next.svg" alt="logo" width={28} height={6} className="dark:invert" />
            <h1 className="text-lg font-semibold capitalize">{activeTab}</h1>
          </div>
          <ModeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 pb-20 pt-6">
        {renderContent()}
      </main>

      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}