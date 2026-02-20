import { requireAuth } from "@/lib/auth"
import { DashboardPageClient } from "./dashboard-page-client"
import type { Metadata } from "next"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Manage your AI APIs, monitor usage, and access developer tools in your Outsoor dashboard.",
  robots: {
    index: false,
    follow: false,
  },
}

export default async function DashboardPage() {
  const user = await requireAuth()

  return <DashboardPageClient user={user} />
}
