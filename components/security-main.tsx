"use client"

import { useState } from "react"
import { useTheme } from "@/contexts/themeContext"
import { useSidebar } from "@/components/dashboard-layout-controller"
import {
  Shield, Key, Lock, Eye, EyeOff, Smartphone, CheckCircle,
  AlertTriangle, UserCheck, Info, Copy, RefreshCw, X,
  Monitor, Globe, Zap,
} from "lucide-react"
import type { DashboardUser } from "@/types/dashboard-user"

interface SecurityMainProps { user: DashboardUser }

// ── Password strength ────────────────────────────────────────────────────────
function passwordStrength(pw: string): { score: number; label: string; color: string } {
  if (!pw) return { score: 0, label: "", color: "transparent" }
  let score = 0
  if (pw.length >= 8)  score++
  if (pw.length >= 12) score++
  if (/[A-Z]/.test(pw)) score++
  if (/[0-9]/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++
  if (score <= 1) return { score, label: "Weak",   color: "#ef4444" }
  if (score <= 3) return { score, label: "Fair",   color: "#f59e0b" }
  if (score === 4) return { score, label: "Good",  color: "#6366f1" }
  return               { score, label: "Strong", color: "#10b981" }
}

// ── Toggle ───────────────────────────────────────────────────────────────────
function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange} style={{
      width: 44, height: 24, borderRadius: 12, padding: 2, border: "none",
      background: on ? "var(--color-primary)" : "rgba(128,128,128,0.25)",
      cursor: "pointer", transition: "background 0.2s", flexShrink: 0, position: "relative",
    }}>
      <div style={{
        width: 20, height: 20, borderRadius: "50%", background: "#fff",
        position: "absolute", top: 2, left: on ? 22 : 2,
        transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
      }} />
    </button>
  )
}

// ── Password input ────────────────────────────────────────────────────────────
function PasswordInput({ label, value, onChange, placeholder, card, border, text, muted }: any) {
  const [show, setShow] = useState(false)
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: muted, marginBottom: 8 }}>{label}</div>
      <div style={{ position: "relative" }}>
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            width: "100%", height: 42, paddingLeft: 14, paddingRight: 44,
            background: card, border: `1px solid ${border}`,
            fontSize: 13, color: text, outline: "none", boxSizing: "border-box",
            fontFamily: show ? "inherit" : "monospace", letterSpacing: show ? "normal" : "0.1em",
          }}
          onFocus={e => e.currentTarget.style.borderColor = "var(--color-primary)"}
          onBlur={e => e.currentTarget.style.borderColor = border}
        />
        <button onClick={() => setShow(s => !s)} style={{
          position: "absolute", right: 0, top: 0, height: "100%", width: 40,
          background: "transparent", border: "none", cursor: "pointer", color: muted,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )
}

export function SecurityMain({ user }: SecurityMainProps) {
  const { isDark } = useTheme()
  const { sidebarWidth, isMobile } = useSidebar()

  const bg     = isDark ? "#0D0D0F" : "#f8f8f6"
  const card   = isDark ? "#1A1B1F" : "#ffffff"
  const card2  = isDark ? "#141416" : "#f4f4f2"
  const border = isDark ? "#202126" : "#e2e2e0"
  const text   = isDark ? "#ffffff" : "#0a0a0b"
  const muted  = isDark ? "#71717a" : "#71717a"
  const subtle = isDark ? "#52525b" : "#a1a1aa"

  const headerPaddingLeft = isMobile ? 56 : sidebarWidth + 24

  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" })
  const [twoFactor, setTwoFactor] = useState(false)
  const [totp, setTotp]           = useState<string | null>(null)
  const [toast, setToast]         = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [saving, setSaving]       = useState(false)

  const strength = passwordStrength(passwords.new)
  const mismatch = passwords.confirm.length > 0 && passwords.new !== passwords.confirm

  const showToast = (type: "success" | "error", text: string) => {
    setToast({ type, text }); setTimeout(() => setToast(null), 3200)
  }

  const handlePasswordChange = async () => {
    if (!passwords.current || !passwords.new || !passwords.confirm) return showToast("error", "All fields are required")
    if (passwords.new !== passwords.confirm) return showToast("error", "New passwords do not match")
    if (strength.score < 3) return showToast("error", "Please choose a stronger password")
    setSaving(true)
    await new Promise(r => setTimeout(r, 900)) // replace with real API call
    setSaving(false)
    setPasswords({ current: "", new: "", confirm: "" })
    showToast("success", "Password updated successfully")
  }

  const handleToggle2FA = () => {
    if (!twoFactor) {
      setTotp("JBSWY3DPEHPK3PXP") // replace with real TOTP secret from API
      setTwoFactor(true)
      showToast("success", "2FA enabled — scan the QR code in your authenticator app")
    } else {
      setTwoFactor(false)
      setTotp(null)
      showToast("success", "2FA disabled")
    }
  }

  const loginHistory = [
    { id: 1, device: "Chrome on Windows",  location: "Nairobi, KE",  time: "Just now",   status: "success", current: true  },
    { id: 2, device: "Safari on iPhone",   location: "London, UK",    time: "2 days ago", status: "success", current: false },
    { id: 3, device: "Firefox on Mac",     location: "Unknown",       time: "4 days ago", status: "failed",  current: false },
  ]

  const recommendations = [
    { done: passwords.new === "" && true, label: "Strong password set",          sub: "At least 12 characters with mixed types"        },
    { done: twoFactor,                    label: "Two-factor authentication",    sub: "TOTP authenticator app enabled"                  },
    { done: true,                         label: "Email verified",               sub: `Verified at ${user.email}`                      },
    { done: false,                        label: "Passkey registered",           sub: "Add a hardware security key for maximum security" },
  ]

  return (
    <div style={{ minHeight: "100svh", background: bg }}>

      {!isDark && (
        <style>{`
          input[type="password"], input[type="text"] {
            background-color: #ffffff !important;
            color: #0a0a0b !important;
            border-color: #e2e2e0 !important;
          }
          input::placeholder { color: #a1a1aa !important; }
        `}</style>
      )}

      {/* ── HEADER ── */}
      <div className="fixed top-0 right-0 z-30 flex items-center justify-between gap-3"
        style={{ left: 0, height: 56, paddingLeft: headerPaddingLeft, paddingRight: 20,
          borderBottom: `1px solid ${border}`, background: card,
          transition: "padding-left 0.28s cubic-bezier(0.25,0.25,0,1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(239,68,68,0.10)", border: "1px solid rgba(239,68,68,0.22)" }}>
            <Shield className="w-4 h-4" style={{ color: "#ef4444" }} />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: text, letterSpacing: "-0.03em", lineHeight: 1 }}>Security</div>
            <div style={{ fontSize: 11, color: muted, marginTop: 1 }}>Auth & tokens</div>
          </div>
        </div>
        {/* Security score */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 12px",
          background: twoFactor ? "rgba(16,185,129,0.08)" : "rgba(245,158,11,0.08)",
          border: `1px solid ${twoFactor ? "rgba(16,185,129,0.22)" : "rgba(245,158,11,0.22)"}`,
          borderRadius: 8 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: twoFactor ? "#10b981" : "#f59e0b" }} />
          <span style={{ fontSize: 12, fontWeight: 700, color: twoFactor ? "#10b981" : "#f59e0b" }}>
            {twoFactor ? "Secure" : "Improve security"}
          </span>
        </div>
      </div>

      {/* ── BODY ── */}
      <div style={{ paddingTop: 56 }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 20px", display: "flex", flexDirection: "column", gap: 24 }}>

          <div>
            <h1 style={{ fontSize: "clamp(1.3rem,3vw,1.8rem)", fontWeight: 900, color: text, letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 6 }}>
              Account security
            </h1>
            <p style={{ fontSize: 13, color: muted }}>Manage your password, two-factor authentication, and active sessions.</p>
          </div>

          {/* Toast */}
          {toast && (
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px",
              background: toast.type === "success" ? "rgba(16,185,129,0.08)" : "rgba(239,68,68,0.08)",
              border: `1px solid ${toast.type === "success" ? "rgba(16,185,129,0.25)" : "rgba(239,68,68,0.25)"}` }}>
              {toast.type === "success"
                ? <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: "#10b981" }} />
                : <AlertTriangle className="w-4 h-4 flex-shrink-0" style={{ color: "#ef4444" }} />}
              <span style={{ fontSize: 13, color: toast.type === "success" ? "#10b981" : "#ef4444", flex: 1 }}>{toast.text}</span>
              <button onClick={() => setToast(null)} style={{ background: "none", border: "none", cursor: "pointer", color: muted }}>
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* ── SECURITY SCORE ── */}
          <div style={{ border: `1px solid ${border}`, overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: `1px solid ${border}`, background: card,
              display: "flex", alignItems: "center", gap: 10 }}>
              <Zap className="w-4 h-4" style={{ color: "#f59e0b" }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: text }}>Security checklist</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px,1fr))", gap: 1, background: border }}>
              {recommendations.map(r => (
                <div key={r.label} style={{ background: card, padding: "14px 16px", display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", flexShrink: 0, marginTop: 1,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: r.done ? "rgba(16,185,129,0.12)" : "rgba(245,158,11,0.10)",
                    border: `1px solid ${r.done ? "rgba(16,185,129,0.25)" : "rgba(245,158,11,0.25)"}` }}>
                    {r.done
                      ? <CheckCircle className="w-3 h-3" style={{ color: "#10b981" }} />
                      : <AlertTriangle className="w-3 h-3" style={{ color: "#f59e0b" }} />}
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: text }}>{r.label}</div>
                    <div style={{ fontSize: 11, color: muted, marginTop: 2, lineHeight: 1.5 }}>{r.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── CHANGE PASSWORD ── */}
          <div style={{ border: `1px solid ${border}`, overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 20px",
              borderBottom: `1px solid ${border}`, background: card }}>
              <div style={{ width: 34, height: 34, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                background: "rgba(99,102,241,0.10)", border: "1px solid rgba(99,102,241,0.22)" }}>
                <Key className="w-4 h-4" style={{ color: "#6366f1" }} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: text }}>Change password</div>
                <div style={{ fontSize: 11, color: muted, marginTop: 1 }}>Use a strong, unique password you don't use elsewhere</div>
              </div>
            </div>

            <div style={{ background: card2, padding: "20px", display: "flex", flexDirection: "column", gap: 14 }}>
              <PasswordInput label="Current password" value={passwords.current} onChange={(v: string) => setPasswords(p => ({ ...p, current: v }))}
                placeholder="Enter current password" card={card} border={border} text={text} muted={muted} />
              <PasswordInput label="New password" value={passwords.new} onChange={(v: string) => setPasswords(p => ({ ...p, new: v }))}
                placeholder="Enter new password" card={card} border={border} text={text} muted={muted} />

              {/* Strength meter */}
              {passwords.new && (
                <div>
                  <div style={{ display: "flex", gap: 4, marginBottom: 6 }}>
                    {[1,2,3,4,5].map(i => (
                      <div key={i} style={{ flex: 1, height: 3, borderRadius: 2,
                        background: i <= strength.score ? strength.color : isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
                        transition: "background 0.2s" }} />
                    ))}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 11, color: subtle }}>Password strength</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: strength.color }}>{strength.label}</span>
                  </div>
                </div>
              )}

              <PasswordInput label="Confirm new password" value={passwords.confirm} onChange={(v: string) => setPasswords(p => ({ ...p, confirm: v }))}
                placeholder="Confirm new password" card={card} border={border} text={text} muted={muted} />

              {/* Mismatch warning */}
              {mismatch && (
                <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 10px",
                  background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
                  <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#ef4444" }} />
                  <span style={{ fontSize: 11, color: "#ef4444" }}>Passwords do not match</span>
                </div>
              )}

              <button onClick={handlePasswordChange} disabled={saving || mismatch}
                style={{ display: "flex", alignItems: "center", gap: 7, padding: "10px 18px", width: "fit-content",
                  background: saving ? "rgba(99,102,241,0.5)" : "#6366f1", border: "none", color: "#fff",
                  fontSize: 13, fontWeight: 700, cursor: saving || mismatch ? "not-allowed" : "pointer",
                  opacity: mismatch ? 0.5 : 1, transition: "opacity 0.15s" }}>
                {saving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Lock className="w-3.5 h-3.5" />}
                {saving ? "Updating…" : "Update password"}
              </button>
            </div>
          </div>

          {/* ── 2FA ── */}
          <div style={{ border: `1px solid ${border}`, overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 20px",
              borderBottom: `1px solid ${border}`, background: card }}>
              <div style={{ width: 34, height: 34, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                background: "rgba(16,185,129,0.10)", border: "1px solid rgba(16,185,129,0.22)" }}>
                <Smartphone className="w-4 h-4" style={{ color: "#10b981" }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: text }}>Two-factor authentication</div>
                <div style={{ fontSize: 11, color: muted, marginTop: 1 }}>Require a code from your authenticator app on login</div>
              </div>
              <Toggle on={twoFactor} onChange={handleToggle2FA} />
            </div>

            {twoFactor && totp && (
              <div style={{ background: card2, padding: "20px", display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px",
                  background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.22)" }}>
                  <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: "#10b981" }} />
                  <span style={{ fontSize: 12, color: "#10b981", fontWeight: 600 }}>2FA is active — your account has an extra layer of protection</span>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
                    Manual entry key
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <code style={{ flex: 1, padding: "10px 14px", background: card, border: `1px solid ${border}`,
                      fontFamily: "monospace", fontSize: 13, letterSpacing: "0.2em", color: text }}>{totp}</code>
                    <button onClick={() => navigator.clipboard.writeText(totp)}
                      style={{ width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center",
                        background: "transparent", border: `1px solid ${border}`, cursor: "pointer", color: muted }}>
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p style={{ fontSize: 11, color: subtle, marginTop: 8 }}>
                    Enter this key in Google Authenticator, Authy, or 1Password.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* ── LOGIN HISTORY ── */}
          <div style={{ border: `1px solid ${border}`, overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 20px",
              borderBottom: `1px solid ${border}`, background: card }}>
              <div style={{ width: 34, height: 34, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                background: "rgba(139,92,246,0.10)", border: "1px solid rgba(139,92,246,0.22)" }}>
                <UserCheck className="w-4 h-4" style={{ color: "#8b5cf6" }} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: text }}>Active sessions</div>
                <div style={{ fontSize: 11, color: muted, marginTop: 1 }}>Recent login activity across your devices</div>
              </div>
            </div>

            {loginHistory.map((l, i) => (
              <div key={l.id} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "14px 20px",
                background: l.current ? (isDark ? "rgba(99,102,241,0.04)" : "rgba(99,102,241,0.02)") : card,
                borderBottom: i < loginHistory.length - 1 ? `1px solid ${border}` : "none",
                borderLeft: l.current ? "2px solid var(--color-primary)" : "2px solid transparent",
              }}>
                <div style={{ width: 32, height: 32, borderRadius: 7, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
                  background: l.status === "success" ? "rgba(16,185,129,0.10)" : "rgba(239,68,68,0.10)",
                  border: `1px solid ${l.status === "success" ? "rgba(16,185,129,0.22)" : "rgba(239,68,68,0.22)"}` }}>
                  <Monitor className="w-3.5 h-3.5" style={{ color: l.status === "success" ? "#10b981" : "#ef4444" }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: text }}>{l.device}</span>
                    {l.current && (
                      <span style={{ fontSize: 10, fontWeight: 700, padding: "1px 6px",
                        background: "color-mix(in srgb, var(--color-primary) 12%, transparent)",
                        color: "var(--color-primary)", border: "1px solid color-mix(in srgb, var(--color-primary) 25%, transparent)" }}>
                        This device
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 11, color: subtle, marginTop: 2 }}>
                    <Globe className="w-3 h-3 inline mr-1" style={{ verticalAlign: "-1px" }} />
                    {l.location} · {l.time}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
                  {l.status === "success"
                    ? <CheckCircle className="w-4 h-4" style={{ color: "#10b981" }} />
                    : <AlertTriangle className="w-4 h-4" style={{ color: "#ef4444" }} />}
                  <span style={{ fontSize: 11, fontWeight: 600, color: l.status === "success" ? "#10b981" : "#ef4444" }}>
                    {l.status === "success" ? "Verified" : "Failed"}
                  </span>
                </div>
              </div>
            ))}

            <div style={{ padding: "12px 20px", borderTop: `1px solid ${border}`, background: card2 }}>
              <button style={{ fontSize: 12, fontWeight: 600, color: "#ef4444", background: "none", border: "none", cursor: "pointer" }}>
                Sign out all other sessions
              </button>
            </div>
          </div>

          {/* Info note */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "4px 0" }}>
            <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: subtle }} />
            <span style={{ fontSize: 11, color: subtle, lineHeight: 1.6 }}>
              If you notice any suspicious login activity, change your password immediately and contact support.
            </span>
          </div>

        </div>
      </div>
    </div>
  )
}