"use client"

import { useState, useRef } from "react"
import { Send, Zap, Cpu, Paperclip, Search, Lightbulb, Flame, FileText, Target, Sparkles } from "lucide-react"
import { OutsoorLogo } from "@/components/outsoor-logo"
import { useTheme } from "@/contexts/themeContext"
import type { DashboardUser } from "@/types/dashboard-user"

interface ChatWelcomeProps {
  user: DashboardUser
  onSuggestion: (suggestion: string) => void
  onSendMessage: (message: string) => void
  disabled?: boolean
}

export function ChatWelcome({ user, onSuggestion, onSendMessage, disabled = false }: ChatWelcomeProps) {
  const { isDark } = useTheme()
  const [message, setMessage] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const bg       = isDark ? "#0D0D0F" : "#f8f8f6"
  const card     = isDark ? "#1A1B1F" : "#ffffff"
  const border   = isDark ? "#202126" : "#e2e2e0"
  const text     = isDark ? "#ffffff" : "#0a0a0b"
  const muted    = isDark ? "#A0A0A8" : "#71717a"
  const chipBg   = isDark ? "#202126" : "#f0f0ee"
  const chipText = isDark ? "#A0A0A8" : "#52525b"

  const quickActions = [
    { title: "Think Bigger",      icon: <Sparkles  className="w-3.5 h-3.5" />, prompt: "Help me think beyond conventional boundaries and explore innovative solutions" },
    { title: "Deep Search",       icon: <Search    className="w-3.5 h-3.5" />, prompt: "Perform a comprehensive analysis and deep dive into this topic" },
    { title: "Brainstorm Mode",   icon: <Lightbulb className="w-3.5 h-3.5" />, prompt: "Generate creative ideas and brainstorm multiple approaches" },
    { title: "Quick Fire",        icon: <Flame     className="w-3.5 h-3.5" />, prompt: "Give me rapid, concise insights and quick solutions" },
    { title: "Insight Generator", icon: <FileText  className="w-3.5 h-3.5" />, prompt: "Analyze this and provide key insights and actionable recommendations" },
  ]

  const features = [
    { icon: <Cpu    className="w-5 h-5" />, title: "Limitless Cognitive Power",    description: "Get bold, original insights that push boundaries and unlock new possibilities, all in real-time." },
    { icon: <Zap    className="w-5 h-5" />, title: "Zero-Lag, Full Awareness",     description: "Receive instant, context-sensitive responses that adjust seamlessly to your needs and workflow." },
    { icon: <Target className="w-5 h-5" />, title: "Intuition Meets Intelligence", description: "Enjoy human-like, intuitive interactions with AI that processes ideas and thinks faster than any human." },
  ]

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (message.trim() && !disabled) { onSendMessage(message.trim()); setMessage("") }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSubmit() }
  }

  // Auto-grow textarea
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
    const ta = textareaRef.current
    if (ta) { ta.style.height = "auto"; ta.style.height = Math.min(ta.scrollHeight, 160) + "px" }
  }

  return (
    <div style={{
      minHeight: "100%", background: bg,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: "32px 16px", textAlign: "center",
    }}>

      {/* Light mode textarea override */}
      {!isDark && (
        <style>{`
          textarea {
            background-color: transparent !important;
            color: #0a0a0b !important;
            border: none !important;
            outline: none !important;
          }
          textarea::placeholder { color: #a1a1aa !important; }
        `}</style>
      )}

      {/* Logo */}
      <div style={{ marginBottom: 20 }}>
        <OutsoorLogo size="xl" />
      </div>

      {/* Headline */}
      <div style={{ marginBottom: 36 }}>
        <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.04em", marginBottom: 10 }}>
          <span style={{ background: "linear-gradient(90deg, #5567F7, #8C5CF7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Hey {user.name ?? "there"}!
          </span>
          {" "}
          <span style={{ color: text }}>How can I help?</span>
        </h1>
        <p style={{ fontSize: 14, color: muted, maxWidth: 460, margin: "0 auto", lineHeight: 1.7 }}>
          Enterprise-Grade Custom Models, Zero Infrastructure Hassle
        </p>
      </div>

      {/* Chat input box — textarea, auto-grows */}
      <div style={{ width: "100%", maxWidth: 680, marginBottom: 40 }}>
        <form onSubmit={handleSubmit}>
          <div style={{
            background: card, border: `1px solid ${border}`, borderRadius: 16, padding: "16px",
            boxShadow: isDark ? "0 8px 32px rgba(0,0,0,0.4)" : "0 8px 32px rgba(0,0,0,0.07)",
          }}>
            {/* Textarea row */}
            <div style={{ display: "flex", alignItems: "flex-end", gap: 10, marginBottom: 12 }}>
              <button type="button" style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: muted, flexShrink: 0, marginBottom: 2 }}>
                <Paperclip className="w-4 h-4" />
              </button>

              {/* TEXTAREA — not input */}
              <textarea
                ref={textareaRef}
                value={message}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Ask Anything..."
                disabled={disabled}
                rows={1}
                style={{
                  flex: 1, background: "transparent", border: "none", outline: "none", resize: "none",
                  fontSize: 15, fontWeight: 500, color: text, lineHeight: 1.6,
                  minWidth: 0, overflowY: "hidden", fontFamily: "inherit",
                }}
              />

              <button
                type="submit"
                disabled={!message.trim() || disabled}
                style={{
                  background: "linear-gradient(135deg, #8C5CF7, #3B1F82)",
                  border: "none", borderRadius: 10, padding: "8px 10px",
                  cursor: message.trim() && !disabled ? "pointer" : "not-allowed",
                  opacity: !message.trim() || disabled ? 0.4 : 1,
                  flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 2,
                }}
              >
                <Send className="w-4 h-4" style={{ color: "#fff" }} />
              </button>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: border, marginBottom: 12 }} />

            {/* Quick action chips */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {quickActions.map(action => (
                <button
                  key={action.title}
                  type="button"
                  onClick={() => onSuggestion(action.prompt)}
                  disabled={disabled}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "6px 12px", fontSize: 12, fontWeight: 600,
                    background: chipBg, color: chipText,
                    border: `1px solid ${border}`, borderRadius: 8,
                    cursor: disabled ? "not-allowed" : "pointer",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "color-mix(in srgb, var(--color-primary) 12%, transparent)"
                    e.currentTarget.style.borderColor = "color-mix(in srgb, var(--color-primary) 40%, transparent)"
                    e.currentTarget.style.color = "var(--color-primary)"
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = chipBg
                    e.currentTarget.style.borderColor = border
                    e.currentTarget.style.color = chipText
                  }}
                >
                  <span style={{ color: "var(--color-primary)" }}>{action.icon}</span>
                  {action.title}
                </button>
              ))}
            </div>
          </div>
        </form>
      </div>

      {/* Feature cards — gap-px grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 1, width: "100%", maxWidth: 860,
        background: border, border: `1px solid ${border}`,
        borderRadius: 16, overflow: "hidden",
      }}>
        {features.map(f => (
          <div key={f.title}
            style={{ background: card, padding: "20px 20px", textAlign: "left", transition: "background 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.03)" : "#fafaf8"}
            onMouseLeave={e => e.currentTarget.style.background = card}
          >
            <div style={{
              width: 40, height: 40, borderRadius: 10, marginBottom: 12,
              background: "linear-gradient(135deg, #5567F7, #8C5CF7)",
              display: "flex", alignItems: "center", justifyContent: "center", color: "#fff",
            }}>
              {f.icon}
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: text, marginBottom: 6 }}>{f.title}</div>
            <div style={{ fontSize: 12, color: muted, lineHeight: 1.7 }}>{f.description}</div>
          </div>
        ))}
      </div>
    </div>
  )
}