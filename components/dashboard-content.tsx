"use client"

import { ArrowRight, Code, Database, Shield, TrendingUp, Zap, Globe } from "lucide-react"
import { useTheme } from "@/contexts/themeContext"

export function DashboardContent() {
  const { isDark } = useTheme()

  const card   = isDark ? "var(--color-surface-1)" : "#ffffff"
  const border = isDark ? "var(--color-border)"    : "#e2e2e0"
  const text   = isDark ? "var(--color-text)"      : "#0a0a0b"
  const muted  = isDark ? "#71717a"                : "#71717a"

  const features = [
    { title: "API Integration",   description: "Connect your applications with our powerful unified API endpoints. One key, 50+ models.", icon: Code,       color: "#6366f1" },
    { title: "Data Analytics",    description: "Get real-time insights from your usage data with advanced analytics and visualisation.",   icon: Database,   color: "#06b6d4" },
    { title: "Security",          description: "Enterprise-grade security, SOC 2 compliance, and end-to-end TLS 1.3 on all traffic.",    icon: Shield,     color: "#ef4444" },
    { title: "Performance",       description: "Sub-200ms median latency across all endpoints with 99.99% uptime SLA guaranteed.",       icon: Zap,        color: "#10b981" },
    { title: "Global Reach",      description: "Serve customers worldwide with edge infrastructure and auto-scaling on demand.",          icon: Globe,      color: "#f59e0b" },
    { title: "Cost Efficiency",   description: "Transparent pay-as-you-go pricing at $0.001/1K tokens. No subscriptions, no surprises.", icon: TrendingUp, color: "#8b5cf6" },
  ]

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: 1,
      background: border,
      border: `1px solid ${border}`,
      borderRadius: 12,
      overflow: "hidden",
    }}>
      {features.map(f => (
        <div key={f.title}
          style={{ background: card, padding: "24px", display: "flex", flexDirection: "column", gap: 14, cursor: "pointer", transition: "background 0.15s" }}
          onMouseEnter={e => e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.025)" : "#fafaf8"}
          onMouseLeave={e => e.currentTarget.style.background = card}
        >
          <div style={{ width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
            background: `${f.color}18`, border: `1px solid ${f.color}30` }}>
            <f.icon className="w-4 h-4" style={{ color: f.color }} />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: text, marginBottom: 6 }}>{f.title}</div>
            <div style={{ fontSize: 12, color: muted, lineHeight: 1.7 }}>{f.description}</div>
          </div>
          <button style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600,
            color: "var(--color-primary)", background: "none", border: "none", cursor: "pointer", padding: 0, marginTop: "auto" }}>
            Learn more <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  )
}