"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import type { UserRole } from "@/lib/auth"
import { getUser, canAccess } from "@/lib/auth"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRoles?: UserRole[]
}

export function ProtectedRoute({ children, requiredRoles = ["admin", "manager", "user"] }: ProtectedRouteProps) {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const user = getUser()

    if (!user) {
      router.push("/login")
      return
    }

    if (!canAccess(requiredRoles)) {
      router.push("/dashboard/unauthorized")
      return
    }

    setIsAuthorized(true)
  }, [router, requiredRoles])

  if (!mounted || !isAuthorized) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return <>{children}</>
}
