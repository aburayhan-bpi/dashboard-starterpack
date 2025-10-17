"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Mail, ArrowLeft } from "lucide-react"

type Step = "email" | "otp" | "password"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>("email")
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      if (email) {
        setStep("otp")
      } else {
        setError("Please enter your email")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      if (otp.length === 6) {
        setStep("password")
      } else {
        setError("Please enter a valid OTP")
      }
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      if (newPassword === confirmPassword && newPassword.length >= 8) {
        router.push("/login")
      } else {
        setError("Passwords do not match or are too short")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background-secondary dark:from-dark-background dark:to-dark-background-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <button
          onClick={() => router.push("/login")}
          className="flex items-center gap-2 text-primary hover:text-primary-dark mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Login</span>
        </button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground dark:text-dark-foreground mb-2">Reset Password</h1>
          <p className="text-foreground-secondary dark:text-dark-foreground-secondary">
            {step === "email" && "Enter your email to receive an OTP"}
            {step === "otp" && "Enter the OTP sent to your email"}
            {step === "password" && "Create a new password"}
          </p>
        </div>

        {/* Email Step */}
        {step === "email" && (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            {error && <div className="p-3 rounded-lg bg-error/10 border border-error text-error text-sm">{error}</div>}
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
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-border dark:border-dark-border bg-background dark:bg-dark-background-secondary text-foreground dark:text-dark-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 rounded-lg bg-primary hover:bg-primary-dark text-white font-medium transition-colors disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        )}

        {/* OTP Step */}
        {step === "otp" && (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            {error && <div className="p-3 rounded-lg bg-error/10 border border-error text-error text-sm">{error}</div>}
            <div>
              <label className="block text-sm font-medium text-foreground dark:text-dark-foreground mb-2">
                Enter OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="000000"
                maxLength={6}
                className="w-full px-4 py-2 rounded-lg border border-border dark:border-dark-border bg-background dark:bg-dark-background-secondary text-foreground dark:text-dark-foreground text-center text-2xl tracking-widest font-mono focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <p className="text-xs text-foreground-secondary dark:text-dark-foreground-secondary mt-2">
                Check your email for the 6-digit code
              </p>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 rounded-lg bg-primary hover:bg-primary-dark text-white font-medium transition-colors disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}

        {/* Password Step */}
        {step === "password" && (
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            {error && <div className="p-3 rounded-lg bg-error/10 border border-error text-error text-sm">{error}</div>}
            <div>
              <label className="block text-sm font-medium text-foreground dark:text-dark-foreground mb-2">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 rounded-lg border border-border dark:border-dark-border bg-background dark:bg-dark-background-secondary text-foreground dark:text-dark-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground dark:text-dark-foreground mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 rounded-lg border border-border dark:border-dark-border bg-background dark:bg-dark-background-secondary text-foreground dark:text-dark-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 rounded-lg bg-primary hover:bg-primary-dark text-white font-medium transition-colors disabled:opacity-50"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
