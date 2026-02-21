"use client"

import { Activity, Users, Zap, TrendingUp } from "lucide-react"
import { useTheme } from "@/contexts/themeContext"

export function DashboardStats() {
  const { isDark } = useTheme()

  const card   = isDark ? "var(--color-surface-1)" : "#ffffff"
  const border = isDark ? "var(--color-border)"    : "#e2e2e0"
  const text   = isDark ? "var(--color-text)"      : "#0a0a0b"
  const muted  = isDark ? "#71717a"                : "#71717a"

  const stats = [
    { title: "API Calls",     value: "12,345",  change: "+12%", icon: Activity,   color: "#6366f1" },
    { title: "Active Models", value: "50+",     change: "+8%",  icon: Zap,        color: "#10b981" },
    { title: "Avg Latency",   value: "<200ms",  change: "-4ms", icon: TrendingUp, color: "#f59e0b" },
    { title: "Uptime",        value: "99.99%",  change: "+0.1%", icon: Users,     color: "#06b6d4" },
  ]

  return (
    <>
      {stats.map(stat => (
        <div key={stat.title}
          style={{
            background: card, border: `1px solid ${border}`, borderRadius: 12,
            padding: "20px 24px", display: "flex", flexDirection: "column", gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: muted }}>{stat.title}</span>
            <div style={{ width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
              background: `${stat.color}18`, border: `1px solid ${stat.color}30` }}>
              <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
            </div>
          </div>
          <div>
            <div style={{ fontSize: 26, fontWeight: 900, color: text, letterSpacing: "-0.04em", fontFamily: "monospace" }}>
              {stat.value}
            </div>
            <div style={{ fontSize: 11, color: muted, marginTop: 4 }}>
              <span style={{ color: "#10b981", fontWeight: 700 }}>{stat.change}</span> from last month
            </div>
          </div>
        </div>
      ))}
    </>
  )
}