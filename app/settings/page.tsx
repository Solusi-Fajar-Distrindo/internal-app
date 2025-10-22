import Image from "next/image"
import { ModeToggle } from '@/components/mode-toggle'

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <header className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Image src="/next.svg" alt="logo" width={28} height={6} className="dark:invert" />
          <h1 className="text-lg font-semibold">Settings</h1>
        </div>
        <ModeToggle />
      </header>

      <main className="p-4">
        <p className="text-zinc-600 dark:text-zinc-400">This is a placeholder Settings page. Wire up your settings here.</p>
      </main>
    </div>
  )
}
