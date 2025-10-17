"use client"

import type React from "react"

interface Column<T> {
  key: keyof T
  label: string
  render?: (value: T[keyof T], row: T) => React.ReactNode
  sortable?: boolean
  width?: string
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  loading?: boolean
  emptyMessage?: string
}

export function DataTable<T extends { id: string | number }>({
  columns,
  data,
  loading = false,
  emptyMessage = "No data available",
}: DataTableProps<T>) {
  if (loading) {
    return (
      <div className="bg-background-secondary dark:bg-dark-background-secondary rounded-lg border border-border dark:border-dark-border p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="bg-background-secondary dark:bg-dark-background-secondary rounded-lg border border-border dark:border-dark-border p-8">
        <div className="text-center">
          <p className="text-foreground-secondary dark:text-dark-foreground-secondary">{emptyMessage}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border dark:border-dark-border">
      <table className="w-full">
        <thead>
          <tr className="bg-background-secondary dark:bg-dark-background-secondary border-b border-border dark:border-dark-border">
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className="px-6 py-3 text-left text-sm font-semibold text-foreground dark:text-dark-foreground"
                style={{ width: column.width }}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={row.id}
              className={`border-b border-border dark:border-dark-border hover:bg-background-secondary dark:hover:bg-dark-background-secondary transition-colors ${
                rowIndex % 2 === 0 ? "bg-background dark:bg-dark-background" : ""
              }`}
            >
              {columns.map((column) => (
                <td
                  key={`${row.id}-${String(column.key)}`}
                  className="px-6 py-4 text-sm text-foreground dark:text-dark-foreground"
                >
                  {column.render ? column.render(row[column.key], row) : String(row[column.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
