"use client"

import { useState, useEffect, createContext, useContext } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { useTheme } from "@/contexts/themeContext"
import type { DashboardUser } from "@/types/dashboard-user"

// ── Context — any child can read sidebar state ────────────────────────────────
interface SidebarContextValue {
  collapsed: boolean
  isMobile: boolean
  sidebarWidth: number
}
const SidebarContext = createContext<SidebarContextValue>({
  collapsed: false,
  isMobile: false,
  sidebarWidth: 256,
})
export const useSidebar = () => useContext(SidebarContext)

const SIDEBAR_EXPANDED  = 256
const SIDEBAR_COLLAPSED = 72
const MOBILE_BREAKPOINT = 768

interface DashboardLayoutControllerProps {
  user: DashboardUser
  children: React.ReactNode
}

export function DashboardLayoutController({ user, children }: DashboardLayoutControllerProps) {
  const { isDark } = useTheme()
  const [collapsed, setCollapsed] = useState(false)
  const [isMobile, setIsMobile]   = useState(false)

  // On mobile the sidebar is a drawer (overlay), so content takes full width
  const sidebarWidth = isMobile ? 0 : (collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED)

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT
      setIsMobile(mobile)
      if (mobile) setCollapsed(true)
    }
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  const bg = isDark ? "#0D0D0F" : "#f8f8f6"

  return (
    <SidebarContext.Provider value={{ collapsed, isMobile, sidebarWidth }}>
      <div style={{ display: "flex", minHeight: "100svh", background: bg }}>

        {/* Sidebar mounts itself as position:fixed — we just render it */}
        <DashboardSidebar user={user} onSidebarToggle={setCollapsed} />

        {/*
          Content wrapper.
          Desktop → marginLeft = sidebar width, slides with collapse animation.
          Mobile  → marginLeft: 0, sidebar is a drawer overlay so no offset needed.
        */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            minHeight: "100svh",
            background: bg,
            marginLeft: sidebarWidth,
            transition: "margin-left 0.28s cubic-bezier(0.25,0.25,0,1)",
          }}
        >
          {children}
        </div>
      </div>
    </SidebarContext.Provider>
  )
}