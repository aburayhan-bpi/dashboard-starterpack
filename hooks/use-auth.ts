"use client"

import { useCallback } from "react"
import type { User } from "@/lib/auth"
import { getUser } from "@/lib/auth"

export function useAuth() {
  const user = getUser() as User | null

  const logout = useCallback(() => {
    localStorage.removeItem("user")
  }, [])

  return {
    user,
    logout,
    isAuthenticated: !!user,
  }
}
