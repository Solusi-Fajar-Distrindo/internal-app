"use client"

import { useState } from "react"
import { ModeToggle } from "@/components/mode-toggle"
import { BottomNavigation } from "@/components/ui/bottom-navigation"
import Image from "next/image"

interface MainLayoutProps {
  children?: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const [activeTab, setActiveTab] = useState("home")

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="slide-up">
            <section className="prose mx-auto max-w-none text-center sm:text-left">
              <h2 className="text-2xl font-semibold text-black dark:text-zinc-50">Welcome</h2>
              <p className="text-zinc-600 dark:text-zinc-400">This app is mobile-first and includes a bottom navigation bar. Use the buttons below to explore.</p>
            </section>

            <section className="mt-6 grid gap-3">
              <button 
                onClick={() => setActiveTab("forms")}
                className="rounded-lg bg-white/60 p-4 shadow-sm dark:bg-neutral-900/60 text-left hover:bg-white/80 dark:hover:bg-neutral-900/80 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                Open Forms
              </button>
              <button 
                onClick={() => setActiveTab("settings")}
                className="rounded-lg bg-white/60 p-4 shadow-sm dark:bg-neutral-900/60 text-left hover:bg-white/80 dark:hover:bg-neutral-900/80 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                Open Settings
              </button>
            </section>
          </div>
        )
      case "forms":
        return (
          <div className="slide-up">
            <main className="p-4">
              <p className="text-zinc-600 dark:text-zinc-400">This is a placeholder Forms page. Add your forms UI here.</p>
              <div className="mt-4">
                <button 
                  onClick={() => setActiveTab("home")}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
                >
                  Back to Home
                </button>
              </div>
            </main>
          </div>
        )
      case "settings":
        return (
          <div className="slide-up">
            <main className="p-4">
              <p className="text-zinc-600 dark:text-zinc-400">This is a placeholder Settings page. Wire up your settings here.</p>
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

      <main className="mx-auto max-w-lg px-4 pb-28 pt-6 sm:pt-32 sm:pb-28">
        {renderContent()}
      </main>

      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}