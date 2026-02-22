import { getAdminStats } from "@/app/actions/admin"
import { Users, DollarSign, Activity, TrendingUp, ArrowUpRight } from "lucide-react"

export default async function AdminPage() {
  const stats = await getAdminStats()

  const margin = stats.totalRevenue > 0
    ? (((stats.totalRevenue - stats.totalUsageCost) / stats.totalRevenue) * 100).toFixed(1)
    : "0.0"

  const cards = [
    {
      label: "Total Users",
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      sub: "Registered accounts",
    },
    {
      label: "Total Revenue",
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      sub: "All-time collected",
    },
    {
      label: "Usage Cost",
      value: `$${stats.totalUsageCost.toFixed(2)}`,
      icon: Activity,
      sub: "All-time API spend",
    },
    {
      label: "Gross Margin",
      value: `${margin}%`,
      icon: TrendingUp,
      sub: "Revenue minus costs",
    },
  ]

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--color-bg)", color: "var(--color-text)" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Page header */}
        <div
          className="flex items-end justify-between pb-8"
          style={{ borderBottom: "1px solid var(--color-border)" }}
        >
          <div className="flex flex-col gap-2">
            <span
              className="text-xs uppercase tracking-wider font-semibold"
              style={{ color: "var(--color-primary)" }}
            >
              Admin
            </span>
            <h1
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: "-0.04em",
                color: "var(--color-text)",
              }}
            >
              Overview
            </h1>
          </div>

          <div className="flex items-center gap-2 pb-1">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: "var(--color-success)", animation: "pulse 2s ease-in-out infinite" }}
            />
            <span className="text-sm" style={{ color: "var(--color-text-muted)" }}>
              Live data
            </span>
          </div>
        </div>

        {/* Stat cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          style={{ borderBottom: "1px solid var(--color-border)" }}
        >
          {cards.map((card, i) => (
            <div
              key={card.label}
              className="relative flex flex-col gap-6 p-8"
              style={{
                borderRight: i < cards.length - 1 ? "1px solid var(--color-border)" : "none",
              }}
            >
              {/* icon + label */}
              <div className="flex items-start justify-between">
                <div
                  className="w-9 h-9 flex items-center justify-center"
                  style={{ border: "1px solid var(--color-border)", color: "var(--color-primary)" }}
                >
                  <card.icon className="w-4 h-4" />
                </div>
                <ArrowUpRight className="w-3.5 h-3.5" style={{ color: "var(--color-text-muted)", opacity: 0.5 }} />
              </div>

              {/* value */}
              <div className="flex flex-col gap-1">
                <span
                  style={{
                    fontSize: "clamp(1.5rem, 3vw, 2rem)",
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {card.value}
                </span>
                <span
                  className="text-sm font-semibold"
                  style={{ color: "var(--color-text)" }}
                >
                  {card.label}
                </span>
                <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                  {card.sub}
                </span>
              </div>

              {/* corner glow on first card */}
              {i === 0 && (
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "120px",
                    height: "120px",
                    background: "radial-gradient(circle at top right, color-mix(in srgb, var(--color-primary) 12%, transparent), transparent 70%)",
                    pointerEvents: "none",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Revenue vs cost breakdown */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2"
          style={{ borderBottom: "1px solid var(--color-border)" }}
        >
          {/* Revenue bar */}
          <div
            className="flex flex-col gap-5 p-8 lg:p-10"
            style={{ borderRight: "1px solid var(--color-border)" }}
          >
            <span
              className="text-xs uppercase tracking-wider font-semibold"
              style={{ color: "var(--color-text-muted)" }}
            >
              Revenue vs Cost
            </span>

            {[
              { label: "Revenue", value: stats.totalRevenue, color: "var(--color-primary)" },
              { label: "Cost",    value: stats.totalUsageCost, color: "var(--color-secondary)" },
              { label: "Profit",  value: stats.totalRevenue - stats.totalUsageCost, color: "var(--color-success)" },
            ].map((row) => {
              const pct = stats.totalRevenue > 0
                ? Math.min(100, (row.value / stats.totalRevenue) * 100)
                : 0
              return (
                <div key={row.label} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold" style={{ color: "var(--color-text)" }}>
                      {row.label}
                    </span>
                    <span className="text-sm font-bold" style={{ color: row.color }}>
                      ${row.value.toFixed(2)}
                    </span>
                  </div>
                  <div
                    className="h-1.5 w-full"
                    style={{ background: "var(--color-border)" }}
                  >
                    <div
                      className="h-full"
                      style={{ width: `${pct}%`, background: row.color, transition: "width 0.6s ease" }}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Quick stats table */}
          <div className="flex flex-col p-8 lg:p-10 gap-5">
            <span
              className="text-xs uppercase tracking-wider font-semibold"
              style={{ color: "var(--color-text-muted)" }}
            >
              Key Metrics
            </span>
            <div style={{ border: "1px solid var(--color-border)" }}>
              {[
                { label: "Revenue per user",  value: stats.totalUsers > 0 ? `$${(stats.totalRevenue / stats.totalUsers).toFixed(2)}` : "—" },
                { label: "Cost per user",     value: stats.totalUsers > 0 ? `$${(stats.totalUsageCost / stats.totalUsers).toFixed(2)}` : "—" },
                { label: "Gross margin",      value: `${margin}%` },
                { label: "Profit",            value: `$${(stats.totalRevenue - stats.totalUsageCost).toFixed(2)}` },
              ].map((row, i, arr) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between px-5 py-4"
                  style={{ borderBottom: i < arr.length - 1 ? "1px solid var(--color-border)" : "none" }}
                >
                  <span className="text-sm" style={{ color: "var(--color-text-muted)" }}>{row.label}</span>
                  <span className="text-sm font-bold" style={{ color: "var(--color-text)" }}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
      `}</style>
    </div>
  )
}