import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminLayoutClient } from "./admin-layout-client"
import { AdminLoginForm } from "@/components/admin-login-form"

// List of admin emails - must match the one in other auth files
const ADMIN_EMAILS = ["admin@outsoor.com"]

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isAdmin = user && ADMIN_EMAILS.includes(user.email?.toLowerCase() || "")

  if (!user || !isAdmin) {
    return <AdminLoginForm />
  }

  return (
    <AdminLayoutClient user={user}>
      {children}
    </AdminLayoutClient>
  )
}
