"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function UserReportPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/reports"
          className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Reports
        </Link>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-foreground dark:text-dark-foreground">User Report</h1>
        <p className="text-foreground-secondary dark:text-dark-foreground-secondary mt-1">
          User activity and engagement metrics
        </p>
      </div>

      <div className="bg-background-secondary dark:bg-dark-background-secondary border border-border dark:border-dark-border rounded-lg p-8 text-center">
        <p className="text-foreground-secondary dark:text-dark-foreground-secondary">User report content goes here</p>
      </div>
    </div>
  )
}
