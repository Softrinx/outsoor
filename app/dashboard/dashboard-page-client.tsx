"use client"

import { DashboardLayoutController } from "@/components/dashboard-layout-controller"
import { DashboardChatInterface }    from "@/components/dashboard-chat-interface"
import { ApiTokensMain }             from "@/components/api-tokens-main"
import { BillingMain }               from "@/components/billing-main"
import { SettingsMain }              from "@/components/settings-main"
import { SecurityMain }              from "@/components/security-main"
import { NotificationsMain }         from "@/components/notifications-main"
import { ModelsMain }                from "@/components/models-main"
import { ModelsDocsIndex }           from "@/components/models-docs-index"
import { ModelDocsPage }             from "@/components/model-docs-page"
import { DashboardMain }             from "@/components/dashboard-main"
import { usePathname }               from "next/navigation"
import type { User } from "@/lib/auth"

interface DashboardPageClientProps {
  user: User
}

export function DashboardPageClient({ user }: DashboardPageClientProps) {
  const pathname = usePathname()

  const renderContent = () => {
    if (pathname === "/dashboard") {
      return <DashboardChatInterface user={user} />
    }
    if (pathname === "/dashboard/apis") {
      return <ApiTokensMain user={user} />
    }
    if (pathname === "/dashboard/billing") {
      return <BillingMain user={user} />
    }
    if (pathname === "/dashboard/settings") {
      return <SettingsMain user={user} />
    }
    if (pathname === "/dashboard/security") {
      return <SecurityMain user={user} />
    }
    if (pathname === "/dashboard/notifications") {
      return <NotificationsMain user={user} />
    }
    if (pathname === "/dashboard/models") {
      return <ModelsMain user={user} />
    }
    if (pathname === "/dashboard/models/docs") {
      return <ModelsDocsIndex user={user} />
    }
    if (pathname.startsWith("/dashboard/models/docs/")) {
      const modelSlug = pathname.split("/").pop()
      return <ModelDocsPage user={user} modelSlug={modelSlug ?? ""} />
    }
    // Default — API store / dashboard overview
    return <DashboardMain user={user} />
  }

  return (
    // DashboardLayoutController renders the sidebar internally
    // and gives content the correct margin automatically —
    // mobile: margin 0 (sidebar is a drawer overlay, no gap)
    // desktop: margin = sidebar width, animates on collapse
    <DashboardLayoutController user={user}>
      {renderContent()}
    </DashboardLayoutController>
  )
}