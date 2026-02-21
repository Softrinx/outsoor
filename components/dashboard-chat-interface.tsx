"use client"

import { useState, useRef, useEffect } from "react"
import { MessageList } from "@/components/message-list"
import { MessageInput } from "@/components/message-input"
import { ChatWelcome } from "@/components/chat-welcome"
import { sendChatMessage, getChatModels } from "@/app/actions/chat"
import { useChatStream } from "@/hooks/use-chat-stream"
import type { ChatMessage } from "@/lib/chat-api"
import { Button } from "@/components/ui/button"
import { Settings, Plus } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/contexts/themeContext"
import { useSidebar } from "@/components/dashboard-layout-controller"
import type { DashboardUser } from "@/types/dashboard-user"

interface DashboardChatInterfaceProps {
  user: DashboardUser
  sidebarCollapsed?: boolean // kept for backwards compat but ignored — we use context
}

interface UserCredits {
  balance: number
  total_spent: number
  total_topped_up: number
}

export function DashboardChatInterface({ user }: DashboardChatInterfaceProps) {
  const { isDark } = useTheme()
  const { sidebarWidth, isMobile } = useSidebar()

  const [credits, setCredits] = useState<UserCredits | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "system", content: "You are a helpful AI assistant. Be concise and helpful in your responses." },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedModel] = useState("deepseek/deepseek-v3-0324")
  const [models, setModels] = useState<Array<{ id: string; name: string }>>([])
  const [streamingEnabled] = useState(true)
  const [currentStreamingMessage, setCurrentStreamingMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { streamMessage, isStreaming } = useChatStream()

  useEffect(() => {
    fetch("/api/user/credits")
      .then(r => r.ok ? r.json() : null)
      .then(d => d?.success && setCredits(d.credits))
      .catch(() => {})
  }, [])

  const refreshCredits = async () => {
    try {
      const r = await fetch("/api/user/credits")
      if (r.ok) { const d = await r.json(); if (d.success) setCredits(d.credits) }
    } catch {}
  }

  useEffect(() => { getChatModels().then(setModels) }, [])
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, currentStreamingMessage])

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isLoading || isStreaming) return
    const userMessage: ChatMessage = { role: "user", content }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setIsLoading(true)
    setCurrentStreamingMessage("")
    try {
      if (streamingEnabled) {
        await streamMessage(
          updatedMessages, selectedModel,
          (chunk: string) => setCurrentStreamingMessage(prev => prev + chunk),
          (fullMessage: string) => { setMessages([...updatedMessages, { role: "assistant", content: fullMessage }]); setCurrentStreamingMessage("") },
          (error: string) => { setMessages([...updatedMessages, { role: "assistant", content: `Error: ${error}` }]); setCurrentStreamingMessage("") },
        )
      } else {
        const response = await sendChatMessage(updatedMessages)
        setMessages([...updatedMessages, {
          role: "assistant",
          content: response.success ? (response.message ?? "No response generated") : `Error: ${response.error}`,
        }])
      }
    } catch {
      setMessages([...updatedMessages, { role: "assistant", content: "Sorry, I encountered an error. Please try again." }])
      setCurrentStreamingMessage("")
    } finally { setIsLoading(false) }
  }

  const visibleMessages = messages.filter(m => m.role !== "system")
  const hasMessages = visibleMessages.length > 0

  const bg     = isDark ? "#0D0D0F" : "#f8f8f6"
  const card   = isDark ? "#1A1B1F" : "#ffffff"
  const border = isDark ? "#202126" : "#e2e2e0"
  const text   = isDark ? "#ffffff" : "#0a0a0b"
  const muted  = isDark ? "#A0A0A8" : "#71717a"

  /*
    Header left padding:
    - Desktop: sidebarWidth + 16  (content clears the fixed sidebar)
    - Mobile:  56px               (clears the hamburger button which is 40px at left:16)
  */
  const headerPaddingLeft = isMobile ? 56 : sidebarWidth + 16

  /*
    Floating input left offset:
    - Desktop: sidebarWidth  (input bar starts where sidebar ends)
    - Mobile:  0             (full width, sidebar is a drawer)
  */
  const inputLeft = isMobile ? 0 : sidebarWidth

  return (
    <>
      {!isDark && (
        <style>{`
          input, textarea {
            background-color: #ffffff !important;
            color: #0a0a0b !important;
            border-color: #e2e2e0 !important;
          }
          input::placeholder, textarea::placeholder { color: #a1a1aa !important; }
        `}</style>
      )}

      {/* ── HEADER — full viewport width, content offset by sidebar ── */}
      <div
        className="fixed top-0 right-0 z-30 flex items-center justify-between gap-2"
        style={{
          left: 0,
          height: 56,
          paddingLeft: headerPaddingLeft,
          paddingRight: 16,
          borderBottom: `1px solid ${border}`,
          background: card,
          transition: "padding-left 0.28s cubic-bezier(0.25,0.25,0,1)",
        }}
      >
        {/* Left: avatar + name + email */}
        <div className="flex items-center gap-2 min-w-0">
          <Link href="/dashboard/settings" className="flex-shrink-0">
            <div
              className="w-8 h-8 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
              style={{
                background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                borderRadius: 9,
                boxShadow: "0 2px 10px color-mix(in srgb, var(--color-primary) 40%, transparent)",
              }}
            >
              <span className="text-white font-bold text-xs">{user.name?.[0]?.toUpperCase() || "U"}</span>
            </div>
          </Link>
          {/* Name + email — truncate on small screens */}
          <div className="min-w-0 hidden sm:block">
            <p className="text-xs font-bold leading-none truncate" style={{ color: text }}>{user.name || "User"}</p>
            <p className="text-xs mt-0.5 truncate" style={{ color: muted }}>{user.email}</p>
          </div>
          {/* On mobile show just name, no email */}
          <div className="min-w-0 sm:hidden">
            <p className="text-xs font-bold leading-none truncate" style={{ color: text }}>{user.name || "User"}</p>
          </div>
        </div>

        {/* Right: credits + add + settings */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {credits && (
            <button
              onClick={refreshCredits}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs font-mono transition-all"
              style={{
                background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
                border: `1px solid ${border}`, color: text, borderRadius: 8,
              }}
              title="Click to refresh"
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#10b981" }} />
              ${credits.balance.toFixed(2)}
            </button>
          )}

          <Link href="/dashboard/billing">
            <button
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold"
              style={{
                background: "color-mix(in srgb, var(--color-primary) 12%, transparent)",
                border: "1px solid color-mix(in srgb, var(--color-primary) 30%, transparent)",
                color: "var(--color-primary)", borderRadius: 8,
              }}
            >
              <Plus className="w-3 h-3" />
              <span className="hidden sm:inline">Add Credits</span>
            </button>
          </Link>

          <Button variant="ghost" size="sm" style={{ color: muted, padding: "6px" }}>
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* ── BODY — below the fixed header ── */}
      <div
        className="flex flex-col"
        style={{ paddingTop: 56, minHeight: "100svh", background: bg }}
      >
        {!hasMessages ? (
          <div className="flex-1" style={{ background: bg }}>
            <ChatWelcome
              user={user}
              onSuggestion={handleSendMessage}
              onSendMessage={handleSendMessage}
              disabled={isLoading || isStreaming}
            />
          </div>
        ) : (
          <div className="flex-1 flex flex-col min-h-0" style={{ background: bg }}>
            <div className="flex-1 overflow-y-auto px-4 py-4 pb-40">
              <MessageList
                messages={visibleMessages}
                isLoading={isLoading || isStreaming}
                streamingMessage={currentStreamingMessage}
              />
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}
      </div>

      {/* ── FLOATING INPUT — sidebar-aware left offset ── */}
      {hasMessages && (
        <div
          className="fixed bottom-0 z-50 p-4"
          style={{
            left: inputLeft,
            right: 0,
            background: `linear-gradient(to top, ${bg} 70%, transparent)`,
            transition: "left 0.28s cubic-bezier(0.25,0.25,0,1)",
          }}
        >
          <div
            style={{
              maxWidth: 760, margin: "0 auto",
              border: `1px solid ${border}`, borderRadius: 14,
              background: card, overflow: "hidden",
              boxShadow: isDark ? "0 8px 32px rgba(0,0,0,0.5)" : "0 8px 32px rgba(0,0,0,0.08)",
            }}
          >
            <MessageInput
              onSendMessage={handleSendMessage}
              disabled={isLoading || isStreaming}
              placeholder="Continue the conversation..."
            />
          </div>
        </div>
      )}
    </>
  )
}