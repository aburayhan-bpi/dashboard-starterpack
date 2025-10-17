"use client"

import { useState, useEffect } from "react"
import { Mail, Calendar, Edit2 } from "lucide-react"

interface UserData {
  id: string
  email: string
  name: string
  role: string
  avatar: string
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserData | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "" })

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsed = JSON.parse(userData)
      setUser(parsed)
      setFormData({ name: parsed.name, email: parsed.email })
    }
  }, [])

  const handleSave = () => {
    if (user) {
      const updated = { ...user, ...formData }
      localStorage.setItem("user", JSON.stringify(updated))
      setUser(updated)
      setIsEditing(false)
    }
  }

  if (!user) return null

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground dark:text-dark-foreground">Profile</h1>
        <p className="text-foreground-secondary dark:text-dark-foreground-secondary mt-1">
          Manage your account information
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-background-secondary dark:bg-dark-background-secondary border border-border dark:border-dark-border rounded-lg p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar || "/placeholder.svg"}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h2 className="text-2xl font-bold text-foreground dark:text-dark-foreground">{user.name}</h2>
              <p className="text-sm text-foreground-secondary dark:text-dark-foreground-secondary capitalize">
                {user.role}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark text-white font-medium transition-colors"
          >
            <Edit2 className="w-4 h-4" />
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>

        {/* Info */}
        <div className="space-y-4">
          {isEditing ? (
            <>
              <div>
                <label className="block text-sm font-medium text-foreground dark:text-dark-foreground mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-border dark:border-dark-border bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground dark:text-dark-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-border dark:border-dark-border bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <button
                onClick={handleSave}
                className="w-full px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark text-white font-medium transition-colors"
              >
                Save Changes
              </button>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3 text-foreground-secondary dark:text-dark-foreground-secondary">
                <Mail className="w-5 h-5" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-foreground-secondary dark:text-dark-foreground-secondary">
                <Calendar className="w-5 h-5" />
                <span>Joined on {new Date().toLocaleDateString()}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
