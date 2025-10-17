"use client"

import { BarChart3, TrendingUp, Users, Activity } from "lucide-react"

export default function AnalyticsPage() {
  const metrics = [
    { label: "Page Views", value: "124,532", change: "+12.5%", icon: BarChart3 },
    { label: "Unique Visitors", value: "45,231", change: "+8.2%", icon: Users },
    { label: "Bounce Rate", value: "32.5%", change: "-2.3%", icon: Activity },
    { label: "Avg. Session", value: "4m 32s", change: "+1.8%", icon: TrendingUp },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground dark:text-dark-foreground">Analytics</h1>
        <p className="text-foreground-secondary dark:text-dark-foreground-secondary mt-1">
          Track your application performance and user behavior
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon
          return (
            <div
              key={metric.label}
              className="bg-background-secondary dark:bg-dark-background-secondary border border-border dark:border-dark-border rounded-lg p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-foreground-secondary dark:text-dark-foreground-secondary mb-1">
                    {metric.label}
                  </p>
                  <p className="text-2xl font-bold text-foreground dark:text-dark-foreground">{metric.value}</p>
                  <p className="text-xs text-success mt-2">{metric.change}</p>
                </div>
                <div className="p-3 rounded-lg bg-primary/10">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-background-secondary dark:bg-dark-background-secondary border border-border dark:border-dark-border rounded-lg p-6 h-80 flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-12 h-12 text-foreground-secondary dark:text-dark-foreground-secondary mx-auto mb-2 opacity-50" />
            <p className="text-foreground-secondary dark:text-dark-foreground-secondary">Chart placeholder</p>
          </div>
        </div>
        <div className="bg-background-secondary dark:bg-dark-background-secondary border border-border dark:border-dark-border rounded-lg p-6 h-80 flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="w-12 h-12 text-foreground-secondary dark:text-dark-foreground-secondary mx-auto mb-2 opacity-50" />
            <p className="text-foreground-secondary dark:text-dark-foreground-secondary">Chart placeholder</p>
          </div>
        </div>
      </div>
    </div>
  )
}
