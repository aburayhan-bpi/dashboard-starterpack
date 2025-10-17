"use client"

import Link from "next/link"
import { FileText, ArrowRight } from "lucide-react"

export default function ReportsPage() {
  const reports = [
    {
      title: "Sales Report",
      description: "Comprehensive sales data and trends",
      href: "/dashboard/reports/sales",
      icon: FileText,
    },
    {
      title: "User Report",
      description: "User activity and engagement metrics",
      href: "/dashboard/reports/users",
      icon: FileText,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground dark:text-dark-foreground">Reports</h1>
        <p className="text-foreground-secondary dark:text-dark-foreground-secondary mt-1">
          Access detailed reports and analytics
        </p>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((report) => {
          const Icon = report.icon
          return (
            <Link
              key={report.title}
              href={report.href}
              className="group bg-background-secondary dark:bg-dark-background-secondary border border-border dark:border-dark-border rounded-lg p-6 hover:shadow-lg hover:border-primary transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <ArrowRight className="w-5 h-5 text-foreground-secondary dark:text-dark-foreground-secondary group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-foreground dark:text-dark-foreground mb-1">{report.title}</h3>
              <p className="text-sm text-foreground-secondary dark:text-dark-foreground-secondary">
                {report.description}
              </p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
