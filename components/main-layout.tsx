"use client"

import { usePathname, useRouter } from "next/navigation"
import { ModeToggle } from "@/components/mode-toggle"
import { BottomNavigation } from "@/components/ui/bottom-navigation"
import { HomeView } from "@/components/home-view"
import { FormsView } from "@/components/forms-view"
import { SettingsView } from "@/components/settings-view"
import Image from "next/image"

interface MainLayoutProps {
  children?: React.ReactNode
  activeTab?: string
}

export function MainLayout({ children, activeTab: propActiveTab }: MainLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()

  // Determine active tab from pathname or prop
  const getActiveTabFromPath = () => {
    if (pathname === "/home") return "home"
    if (pathname === "/forms") return "forms"
    if (pathname === "/pengaturan") return "settings"
    return propActiveTab || "home"
  }

  const activeTab = getActiveTabFromPath()

  const handleTabChange = (tab: string) => {
    switch (tab) {
      case "home":
        router.push("/home")
        break
      case "forms":
        router.push("/forms")
        break
      case "settings":
        router.push("/pengaturan")
        break
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomeView onNavigate={handleTabChange} />
      case "forms":
        return <FormsView onNavigate={handleTabChange} />
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

      <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  )
}