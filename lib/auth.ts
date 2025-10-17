export type UserRole = "admin" | "manager" | "user"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar: string
}

export const rolePermissions: Record<UserRole, string[]> = {
  admin: ["view_dashboard", "manage_users", "view_analytics", "manage_reports", "manage_settings"],
  manager: ["view_dashboard", "view_users", "view_analytics", "view_reports"],
  user: ["view_dashboard"],
}

export function hasPermission(role: UserRole, permission: string): boolean {
  return rolePermissions[role]?.includes(permission) ?? false
}

export function getUser(): User | null {
  if (typeof window === "undefined") return null
  const user = localStorage.getItem("user")
  return user ? JSON.parse(user) : null
}

export function canAccess(requiredRole: UserRole[]): boolean {
  const user = getUser()
  if (!user) return false
  return requiredRole.includes(user.role)
}
