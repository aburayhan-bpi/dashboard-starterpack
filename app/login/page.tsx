"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      if (email && password) {
        const user = {
          id: "1",
          email,
          name: email.split("@")[0],
          role: "admin",
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        }
        localStorage.setItem("user", JSON.stringify(user))
        router.push("/dashboard")
      } else {
        setError("Please fill in all fields")
      }
    } catch (err) {
      setError("Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background-secondary dark:from-dark-background dark:to-dark-background-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary mb-4">
            <div className="w-6 h-6 bg-white rounded-md"></div>
          </div>
          <h1 className="text-3xl font-bold text-foreground dark:text-dark-foreground mb-2">Dashboard</h1>
          <p className="text-foreground-secondary dark:text-dark-foreground-secondary">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {error && <div className="p-3 rounded-lg bg-error/10 border border-error text-error text-sm">{error}</div>}

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-foreground dark:text-dark-foreground mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-foreground-secondary dark:text-dark-foreground-secondary" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-border dark:border-dark-border bg-background dark:bg-dark-background-secondary text-foreground dark:text-dark-foreground placeholder-foreground-secondary dark:placeholder-dark-foreground-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-foreground dark:text-dark-foreground mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-foreground-secondary dark:text-dark-foreground-secondary" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2 rounded-lg border border-border dark:border-dark-border bg-background dark:bg-dark-background-secondary text-foreground dark:text-dark-foreground placeholder-foreground-secondary dark:placeholder-dark-foreground-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-foreground-secondary dark:text-dark-foreground-secondary hover:text-foreground dark:hover:text-dark-foreground"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => router.push("/forgot-password")}
              className="text-sm text-primary hover:text-primary-dark dark:hover:text-primary-light transition-colors"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 rounded-lg bg-primary hover:bg-primary-dark text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 rounded-lg bg-background-secondary dark:bg-dark-background-secondary border border-border dark:border-dark-border">
          <p className="text-xs font-medium text-foreground-secondary dark:text-dark-foreground-secondary mb-2">
            Demo Credentials:
          </p>
          <p className="text-xs text-foreground-secondary dark:text-dark-foreground-secondary">
            Email: <span className="font-mono">demo@example.com</span>
          </p>
          <p className="text-xs text-foreground-secondary dark:text-dark-foreground-secondary">
            Password: <span className="font-mono">password123</span>
          </p>
        </div>
      </div>
    </div>
  )
}
