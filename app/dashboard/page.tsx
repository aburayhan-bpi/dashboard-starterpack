"use client"

import { BarChart3, Users, TrendingUp, Activity } from "lucide-react"

export default function DashboardPage() {
  const stats = [
    {
      label: "Total Users",
      value: "12,543",
      change: "+12.5%",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      label: "Revenue",
      value: "$45,231",
      change: "+8.2%",
      icon: TrendingUp,
      color: "bg-green-500",
    },
    {
      label: "Active Sessions",
      value: "2,847",
      change: "+5.1%",
      icon: Activity,
      color: "bg-purple-500",
    },
    {
      label: "Conversion Rate",
      value: "3.24%",
      change: "+2.3%",
      icon: BarChart3,
      color: "bg-orange-500",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground dark:text-dark-foreground">Dashboard</h1>
        <p className="text-foreground-secondary dark:text-dark-foreground-secondary mt-1">
          Welcome back! Here's your performance overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="bg-background-secondary dark:bg-dark-background-secondary border border-border dark:border-dark-border rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-foreground-secondary dark:text-dark-foreground-secondary mb-1">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-foreground dark:text-dark-foreground">{stat.value}</p>
                  <p className="text-xs text-success mt-2">{stat.change}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-background-secondary dark:bg-dark-background-secondary border border-border dark:border-dark-border rounded-lg p-6">
        <h2 className="text-lg font-bold text-foreground dark:text-dark-foreground mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-lg bg-background dark:bg-dark-background"
            >
              <div>
                <p className="text-sm font-medium text-foreground dark:text-dark-foreground">User activity #{i}</p>
                <p className="text-xs text-foreground-secondary dark:text-dark-foreground-secondary">2 hours ago</p>
              </div>
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Active</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
