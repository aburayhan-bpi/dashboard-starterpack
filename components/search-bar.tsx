"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"

interface SearchBarProps {
  placeholder?: string
  onSearch?: (query: string) => void
  debounceMs?: number
}

export function SearchBar({ placeholder = "Search...", onSearch, debounceMs = 300 }: SearchBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get("search") || "")
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (debounceTimer) {
      clearTimeout(debounceTimer)
    }

    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams)

      if (query.trim()) {
        params.set("search", query)
        params.set("page", "1") // Reset to first page on search
      } else {
        params.delete("search")
      }

      router.push(`?${params.toString()}`)
      onSearch?.(query)
    }, debounceMs)

    setDebounceTimer(timer)

    return () => clearTimeout(timer)
  }, [query, router, searchParams, onSearch, debounceMs])

  const handleClear = () => {
    setQuery("")
  }

  return (
    <div className="relative">
      <Search className="absolute left-3 top-3 w-5 h-5 text-foreground-secondary dark:text-dark-foreground-secondary" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2 rounded-lg border border-border dark:border-dark-border bg-background dark:bg-dark-background-secondary text-foreground dark:text-dark-foreground placeholder-foreground-secondary dark:placeholder-dark-foreground-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
      />
      {query && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-3 text-foreground-secondary dark:text-dark-foreground-secondary hover:text-foreground dark:hover:text-dark-foreground"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}
