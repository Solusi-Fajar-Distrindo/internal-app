"use client"

import { useState } from "react"
import { ModeToggle } from "@/components/mode-toggle"
import { BottomNavigation } from "@/components/ui/bottom-navigation"
import { HomeView } from "@/components/home-view"
import { FormsView } from "@/components/forms-view"
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
        return (
          <div className="slide-up">
            <main className="p-4">
              <h2 className="text-xl font-semibold mb-4">Settings</h2>
              <div className="space-y-4">
                <div className="p-4 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
                  <h3 className="font-medium mb-2">Appearance</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Customize how the app looks</p>
                </div>
                <div className="p-4 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
                  <h3 className="font-medium mb-2">Account</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Manage your account settings</p>
                </div>
                <div className="p-4 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
                  <h3 className="font-medium mb-2">Notifications</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Configure notification preferences</p>
                </div>
              </div>
            </main>
          </div>
        )
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