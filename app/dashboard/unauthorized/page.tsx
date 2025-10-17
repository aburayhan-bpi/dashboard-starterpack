"use client"

import { useRouter } from "next/navigation"
import { AlertCircle, ArrowLeft } from "lucide-react"

export default function UnauthorizedPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-error/10 mb-4">
          <AlertCircle className="w-8 h-8 text-error" />
        </div>
        <h1 className="text-3xl font-bold text-foreground dark:text-dark-foreground mb-2">Access Denied</h1>
        <p className="text-foreground-secondary dark:text-dark-foreground-secondary mb-6">
          You don't have permission to access this page. Please contact your administrator.
        </p>
        <button
          onClick={() => router.push("/dashboard")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark text-white font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>
      </div>
    </div>
  )
}
