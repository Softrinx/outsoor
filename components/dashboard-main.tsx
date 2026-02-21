"use client"

import { useState } from "react"
import { Search, Star, Users, ExternalLink, Zap, TrendingUp } from "lucide-react"
import { useTheme } from "@/contexts/themeContext"
import type { DashboardUser } from "@/types/dashboard-user"

interface DashboardMainProps {
  user: DashboardUser
}

const categories = [
  "All", "Social media", "AI", "Agents", "Lead generation",
  "E-commerce", "SEO tools", "Jobs", "MCP servers", "News",
  "Real estate", "Developer tools", "Travel", "Automation",
]

const apiServices = [
  { title: "Website Content Crawler", description: "Crawl websites and extract text content to feed AI models, LLM applications, vector databases, or RAG pipelines.", provider: "Apify", icon: "🌐", users: "69K", rating: 4.4, color: "#f97316", tag: "Popular" },
  { title: "Apollo Scraper", description: "Scrape up to 50,000 leads per search URL. Perfect for sales teams and lead generation workflows.", provider: "Code Pioneer", icon: "⚡", users: "58K", rating: 4.1, color: "#eab308", tag: "Trending" },
  { title: "TikTok Scraper", description: "Extract data from TikTok videos, hashtags, and users. Use URLs or search terms to scrape profiles and posts.", provider: "Clockworks", icon: "🎵", users: "60K", rating: 4.5, color: "#ec4899", tag: "Hot" },
  { title: "Google Maps Scraper", description: "Extract data from thousands of Google Maps locations including reviews, contact info, opening hours, and images.", provider: "Compass", icon: "🗺️", users: "148K", rating: 4.1, color: "#10b981", tag: "Top rated" },
  { title: "Instagram Scraper", description: "Scrape Instagram posts, profiles, hashtags, photos, and comments using one or more Instagram URLs.", provider: "Apify", icon: "📸", users: "123K", rating: 4.1, color: "#8b5cf6", tag: "Popular" },
  { title: "LinkedIn Scraper", description: "Extract LinkedIn profiles, job listings, company data, and connections at scale for recruitment and sales.", provider: "DataMiner", icon: "💼", users: "94K", rating: 4.3, color: "#0ea5e9", tag: "New" },
]

export function DashboardMain({ user }: DashboardMainProps) {
  const { isDark } = useTheme()
  const [activeCategory, setActiveCategory] = useState("All")
  const [search, setSearch] = useState("")

  const bg     = isDark ? "var(--color-bg)"        : "#f8f8f6"
  const card   = isDark ? "var(--color-surface-1)" : "#ffffff"
  const border = isDark ? "var(--color-border)"    : "#e2e2e0"
  const text   = isDark ? "var(--color-text)"      : "#0a0a0b"
  const muted  = isDark ? "#71717a"                : "#71717a"
  const subtle = isDark ? "#52525b"                : "#a1a1aa"

  const filtered = apiServices.filter(s =>
    (activeCategory === "All" || s.tag === activeCategory || s.provider === activeCategory) &&
    (search === "" || s.title.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: bg, minHeight: "100svh" }}>

      {!isDark && (
        <style>{`
          input, textarea, select {
            background-color: #ffffff !important;
            color: #0a0a0b !important;
            border-color: #e2e2e0 !important;
          }
          input::placeholder { color: #a1a1aa !important; }
        `}</style>
      )}

      {/* ── HEADER ── */}
      <div style={{ padding: "32px 32px 0", borderBottom: `1px solid ${border}`, background: card }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div className="flex flex-col items-center gap-4 pb-6">
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5" style={{ color: "var(--color-primary)" }} />
                <span className="text-xs font-mono uppercase tracking-widest" style={{ color: "var(--color-primary)" }}>API Store</span>
              </div>
              <h1 className="text-3xl font-black text-center" style={{ color: text, letterSpacing: "-0.04em" }}>
                6,000+ pre-built APIs
              </h1>
              <p className="text-sm text-center" style={{ color: muted }}>
                Web scraping, automation, data extraction — plug in and go.
              </p>
            </div>

            {/* Search */}
            <div style={{ position: "relative", width: "100%", maxWidth: 480 }}>
              <Search className="w-4 h-4" style={{
                position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: muted, pointerEvents: "none",
              }} />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search APIs, tools, providers…"
                style={{
                  width: "100%", paddingLeft: 40, paddingRight: 16, height: 44,
                  background: isDark ? "rgba(255,255,255,0.04)" : "#f0f0ee",
                  border: `1px solid ${border}`, borderRadius: 10,
                  color: text, fontSize: 14, outline: "none",
                }}
                onFocus={e => e.currentTarget.style.borderColor = "var(--color-primary)"}
                onBlur={e => e.currentTarget.style.borderColor = border}
              />
            </div>
          </div>

          {/* Category tabs */}
          <div style={{ display: "flex", overflowX: "auto", gap: 0, marginBottom: -1 }}>
            {categories.map(c => (
              <button key={c}
                onClick={() => setActiveCategory(c)}
                style={{
                  padding: "10px 16px", fontSize: 13, fontWeight: 600, whiteSpace: "nowrap",
                  color: activeCategory === c ? "var(--color-primary)" : muted,
                  background: "transparent", border: "none", cursor: "pointer",
                  borderBottom: `2px solid ${activeCategory === c ? "var(--color-primary)" : "transparent"}`,
                  transition: "all 0.15s",
                }}
                onMouseEnter={e => { if (activeCategory !== c) e.currentTarget.style.color = text }}
                onMouseLeave={e => { if (activeCategory !== c) e.currentTarget.style.color = muted }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ flex: 1, padding: "28px 32px", maxWidth: 1280, width: "100%", margin: "0 auto", boxSizing: "border-box" }}>

        {/* Section heading */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-black" style={{ color: text, letterSpacing: "-0.03em" }}>
              {activeCategory === "All" ? "All APIs" : activeCategory}
            </h2>
            <p className="text-xs mt-0.5" style={{ color: muted }}>
              {filtered.length} results{search ? ` for "${search}"` : ""}
            </p>
          </div>
          <div className="flex items-center gap-1 text-xs" style={{ color: "var(--color-primary)" }}>
            <TrendingUp className="w-3.5 h-3.5" />
            <span className="font-semibold">View all →</span>
          </div>
        </div>

        {/* API Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 1,
          background: border,
          border: `1px solid ${border}`,
          borderRadius: 12,
          overflow: "hidden",
          marginBottom: 24,
        }}>
          {filtered.map(service => (
            <div key={service.title}
              style={{ background: card, padding: "20px", display: "flex", flexDirection: "column", gap: 12, cursor: "pointer", transition: "background 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.025)" : "#fafaf8"}
              onMouseLeave={e => e.currentTarget.style.background = card}
            >
              {/* Top */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                  background: `${service.color}18`, border: `1px solid ${service.color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
                }}>
                  {service.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: text, lineHeight: 1.2 }}>{service.title}</span>
                    <span style={{
                      fontSize: 10, fontWeight: 700, padding: "2px 6px",
                      background: `${service.color}18`, color: service.color,
                      border: `1px solid ${service.color}30`, borderRadius: 4,
                    }}>{service.tag}</span>
                  </div>
                  <span style={{ fontSize: 11, color: subtle, marginTop: 2, display: "block" }}>{service.provider}</span>
                </div>
              </div>

              {/* Description */}
              <p style={{ fontSize: 12, color: muted, lineHeight: 1.7, flex: 1,
                overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const }}>
                {service.description}
              </p>

              {/* Footer */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: muted }}>
                    <Users className="w-3.5 h-3.5" />
                    {service.users}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: muted }}>
                    <Star className="w-3.5 h-3.5" style={{ fill: "#fbbf24", color: "#fbbf24" }} />
                    {service.rating}
                  </div>
                </div>
                <button style={{
                  display: "flex", alignItems: "center", gap: 4, padding: "5px 10px", fontSize: 11, fontWeight: 600,
                  background: "color-mix(in srgb, var(--color-primary) 10%, transparent)",
                  color: "var(--color-primary)", border: "1px solid color-mix(in srgb, var(--color-primary) 25%, transparent)",
                  borderRadius: 6, cursor: "pointer",
                }}>
                  <ExternalLink className="w-3 h-3" /> Use API
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{
          padding: "32px", border: `1px solid ${border}`, borderRadius: 12, background: card,
          display: "flex", flexDirection: "column", gap: 16,
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 280 }}>
              <h3 style={{ fontSize: 20, fontWeight: 900, color: text, letterSpacing: "-0.03em", marginBottom: 8 }}>
                Need a custom scraper?
              </h3>
              <p style={{ fontSize: 13, color: muted, lineHeight: 1.7, maxWidth: 480 }}>
                Our expert team builds tailored web data pipelines with guaranteed quality and availability. Focus on your business — we handle the infrastructure.
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
              <button style={{
                padding: "10px 20px", fontSize: 13, fontWeight: 700,
                background: "var(--color-primary)", color: "#fff", border: "none",
                borderRadius: 8, cursor: "pointer",
                boxShadow: "0 4px 16px color-mix(in srgb, var(--color-primary) 35%, transparent)",
              }}>Learn more</button>
              <button style={{
                padding: "10px 20px", fontSize: 13, fontWeight: 600,
                background: "transparent", color: text, border: `1px solid ${border}`,
                borderRadius: 8, cursor: "pointer",
              }}>Contact sales</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}