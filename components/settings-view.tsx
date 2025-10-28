"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export function SettingsView() {
  const settings = [
    {
      title: "User Management",
      description: "Manage user accounts and permissions",
      content: "Add, edit, or remove users and configure access levels"
    },
    {
      title: "Account",
      description: "Manage your account settings",
      content: "Update profile, password, and security settings"
    },
    {
      title: "Notifications",
      description: "Configure notification preferences",
      content: "Control alerts, sounds, and notification timing"
    }
  ]

  return (
    <div className="slide-up">
      <main className="p-4 pt-0">
        <section className="prose mx-auto max-w-none text-center sm:text-left mb-6">
          <h2 className="text-2xl font-semibold text-black dark:text-zinc-50">Settings</h2>
          <p className="text-zinc-600 dark:text-zinc-400">Manage your app preferences</p>
        </section>

        <section className="grid gap-3">
          {settings.map((setting, index) => (
            <Card
              key={index}
              className="cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
            >
              <CardHeader>
                <CardTitle>{setting.title}</CardTitle>
                <CardDescription>{setting.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{setting.content}</p>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>
    </div>
  )
}