"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { SIDEBAR_ITEMS } from "@/lib/constants"
import { Icons } from "@/components/icons"
import { useAuth } from "@/hooks/use-auth"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  isCollapsed: boolean
}

export function Sidebar({ isOpen, onClose, isCollapsed }: SidebarProps) {
  const pathname = usePathname()
  const { user } = useAuth()

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/")

  // Filter items based on user role
  const visibleItems = SIDEBAR_ITEMS.filter((item) => item.roles.includes(user?.role || "user"))

  return (
    <>
      {/* Mobile Overlay with blur effect */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-white dark:bg-slate-950 border-r border-gray-200 dark:border-slate-800 transition-all duration-300 z-50 lg:z-auto lg:relative lg:translate-x-0 ${
          isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"
        } ${isCollapsed ? "lg:w-20" : "lg:w-64"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-slate-800">
          {!isCollapsed && (
            <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <span className="text-white text-sm font-bold">D</span>
              </div>
              <span className="text-gray-900 dark:text-white">Dashboard</span>
            </Link>
          )}
          {isCollapsed && (
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center mx-auto">
              <span className="text-white text-sm font-bold">D</span>
            </div>
          )}
          <button
            onClick={onClose}
            className="lg:hidden text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            aria-label="Close sidebar"
          >
            <Icons.X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {visibleItems.map((item) => {
            const IconComponent = Icons[item.icon as keyof typeof Icons]
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  isActive(item.href)
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
                }`}
                onClick={onClose}
              >
                {IconComponent && <IconComponent className="w-5 h-5 flex-shrink-0" />}
                {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-slate-800">
          <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
            {!isCollapsed && <p>© 2025 Dashboard</p>}
          </div>
        </div>
      </aside>
    </>
  )
}
