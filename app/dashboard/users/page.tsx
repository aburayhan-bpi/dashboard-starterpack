"use client"

import { useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { SearchBar } from "@/components/search-bar"
import { DataTable } from "@/components/data-table"
import { Pagination } from "@/components/pagination"
import { ProtectedRoute } from "@/components/protected-route"
import { Mail, MapPin, Calendar } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "inactive"
  joinDate: string
  location: string
}

// Mock data
const mockUsers: User[] = Array.from({ length: 47 }, (_, i) => ({
  id: `user-${i + 1}`,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: ["Admin", "Manager", "User"][i % 3],
  status: i % 4 === 0 ? "inactive" : "active",
  joinDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "short", day: "numeric" },
  ),
  location: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"][i % 5],
}))

export default function UsersPage() {
  const searchParams = useSearchParams()
  const currentPage = Number.parseInt(searchParams.get("page") || "1")
  const searchQuery = searchParams.get("search") || ""
  const itemsPerPage = 10

  // Filter and search
  const filteredUsers = useMemo(() => {
    return mockUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.location.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [searchQuery])

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const columns = [
    {
      key: "name" as const,
      label: "Name",
      render: (value: string, row: User) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
            {value.charAt(0)}
          </div>
          <span className="font-medium">{value}</span>
        </div>
      ),
    },
    {
      key: "email" as const,
      label: "Email",
      render: (value: string) => (
        <div className="flex items-center gap-2 text-foreground-secondary dark:text-dark-foreground-secondary">
          <Mail className="w-4 h-4" />
          {value}
        </div>
      ),
    },
    {
      key: "role" as const,
      label: "Role",
      render: (value: string) => (
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">{value}</span>
      ),
    },
    {
      key: "status" as const,
      label: "Status",
      render: (value: "active" | "inactive") => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            value === "active"
              ? "bg-success/10 text-success"
              : "bg-foreground-secondary/10 text-foreground-secondary dark:bg-dark-foreground-secondary/10 dark:text-dark-foreground-secondary"
          }`}
        >
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      ),
    },
    {
      key: "location" as const,
      label: "Location",
      render: (value: string) => (
        <div className="flex items-center gap-2 text-foreground-secondary dark:text-dark-foreground-secondary">
          <MapPin className="w-4 h-4" />
          {value}
        </div>
      ),
    },
    {
      key: "joinDate" as const,
      label: "Join Date",
      render: (value: string) => (
        <div className="flex items-center gap-2 text-foreground-secondary dark:text-dark-foreground-secondary">
          <Calendar className="w-4 h-4" />
          {value}
        </div>
      ),
    },
  ]

  return (
    <ProtectedRoute requiredRoles={["admin", "manager"]}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground dark:text-dark-foreground">Users</h1>
          <p className="text-foreground-secondary dark:text-dark-foreground-secondary mt-1">
            Manage and view all users in your system
          </p>
        </div>

        {/* Search */}
        <SearchBar placeholder="Search by name, email, or location..." />

        {/* Table */}
        <DataTable columns={columns} data={paginatedUsers} emptyMessage="No users found" />

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredUsers.length}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </ProtectedRoute>
  )
}
