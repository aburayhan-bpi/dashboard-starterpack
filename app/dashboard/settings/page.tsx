"use client"

import { useState } from "react"
import { Bell, Lock, Globe } from "lucide-react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    twoFactorAuth: true,
    publicProfile: false,
  })

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const settingGroups = [
    {
      title: "Notifications",
      icon: Bell,
      items: [
        {
          key: "emailNotifications" as const,
          label: "Email Notifications",
          description: "Receive email updates about your account",
        },
        {
          key: "pushNotifications" as const,
          label: "Push Notifications",
          description: "Receive push notifications on your device",
        },
      ],
    },
    {
      title: "Security",
      icon: Lock,
      items: [
        {
          key: "twoFactorAuth" as const,
          label: "Two-Factor Authentication",
          description: "Add an extra layer of security to your account",
        },
      ],
    },
    {
      title: "Privacy",
      icon: Globe,
      items: [
        {
          key: "publicProfile" as const,
          label: "Public Profile",
          description: "Make your profile visible to other users",
        },
      ],
    },
  ]

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground dark:text-dark-foreground">Settings</h1>
        <p className="text-foreground-secondary dark:text-dark-foreground-secondary mt-1">
          Manage your account preferences and settings
        </p>
      </div>

      {/* Settings Groups */}
      {settingGroups.map((group) => {
        const Icon = group.icon
        return (
          <div
            key={group.title}
            className="bg-background-secondary dark:bg-dark-background-secondary border border-border dark:border-dark-border rounded-lg overflow-hidden"
          >
            {/* Group Header */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-border dark:border-dark-border bg-background dark:bg-dark-background">
              <Icon className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold text-foreground dark:text-dark-foreground">{group.title}</h2>
            </div>

            {/* Group Items */}
            <div className="divide-y divide-border dark:divide-dark-border">
              {group.items.map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between p-6 hover:bg-background dark:hover:bg-dark-background transition-colors"
                >
                  <div>
                    <p className="font-medium text-foreground dark:text-dark-foreground">{item.label}</p>
                    <p className="text-sm text-foreground-secondary dark:text-dark-foreground-secondary mt-1">
                      {item.description}
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle(item.key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings[item.key] ? "bg-primary" : "bg-foreground-secondary dark:bg-dark-foreground-secondary"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings[item.key] ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )
      })}

      {/* Save Button */}
      <button className="w-full px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark text-white font-medium transition-colors">
        Save Changes
      </button>
    </div>
  )
}
