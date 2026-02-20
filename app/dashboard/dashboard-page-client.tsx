"use client"

import { useState, useEffect } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardChatInterface } from "@/components/dashboard-chat-interface"
import { ApiTokensMain } from "@/components/api-tokens-main"
import { BillingMain } from "@/components/billing-main"
import { SettingsMain } from "@/components/settings-main"
import { SecurityMain } from "@/components/security-main"
import { NotificationsMain } from "@/components/notifications-main"
import { ModelsMain } from "@/components/models-main"
import { ModelsDocsIndex } from "@/components/models-docs-index"
import { ModelDocsPage } from "@/components/model-docs-page"
import { usePathname } from "next/navigation"
import type { User } from "@/lib/auth"

interface DashboardPageClientProps {
  user: User
}

export function DashboardPageClient({ user }: DashboardPageClientProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true) // Start collapsed on mobile
  const pathname = usePathname()

  // Auto-collapse on mobile, expand on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarCollapsed(true)
      } else {
        setIsSidebarCollapsed(false)
      }
    }

    // Set initial state
    handleResize()

    // Add event listener
    window.addEventListener('resize', handleResize)
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleSidebarToggle = (isCollapsed: boolean) => {
    setIsSidebarCollapsed(isCollapsed)
  }

  // Render different content based on the current route
  const renderContent = () => {
    if (pathname === "/dashboard") {
      return <DashboardChatInterface user={user} sidebarCollapsed={isSidebarCollapsed} />
    } else if (pathname === "/dashboard/apis") {
      return <ApiTokensMain user={user} />
    } else if (pathname === "/dashboard/billing") {
      return <BillingMain user={user} />
    } else if (pathname === "/dashboard/settings") {
      return <SettingsMain user={user} />
    } else if (pathname === "/dashboard/security") {
      return <SecurityMain user={user} />
    } else if (pathname === "/dashboard/notifications") {
      return <NotificationsMain user={user} />
    } else if (pathname === "/dashboard/models") {
      return <ModelsMain user={user} />
    } else if (pathname === "/dashboard/models/docs") {
      return <ModelsDocsIndex user={user} />
    } else if (pathname.startsWith("/dashboard/models/docs/")) {
      const modelSlug = pathname.split("/").pop()
      return <ModelDocsPage user={user} modelSlug={modelSlug || ""} />
    }
    // Default to chat interface
    return <DashboardChatInterface user={user} sidebarCollapsed={isSidebarCollapsed} />
  }

  return (
    <div className="min-h-screen bg-[#0d0d0f]">
      <DashboardSidebar user={user} onSidebarToggle={handleSidebarToggle} />
      <div 
        className={`transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? "ml-[70px]" : "ml-[250px]"
        }`}
      >
        {renderContent()}
      </div>
    </div>
  )
}
