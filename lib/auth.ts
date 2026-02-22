import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

// List of admin emails
const ADMIN_EMAILS = ["admin@Modelsnest.com"]

// User type
export type User = {
  id: string
  email: string
  name: string | null
  user_metadata?: Record<string, any>
}

// Require authentication - returns user or redirects to login
export async function requireAuth(): Promise<User> {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect("/login")
  }

  return {
    id: data.user.id,
    email: data.user.email ?? "",
    name:
      (data.user.user_metadata?.name as string | undefined) ??
      (data.user.user_metadata?.full_name as string | undefined) ??
      null,
    user_metadata: data.user.user_metadata,
  }
}

// Get current authenticated user or return null
export async function getCurrentUser(): Promise<User | null> {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    return null
  }

  return {
    id: data.user.id,
    email: data.user.email ?? "",
    name:
      (data.user.user_metadata?.name as string | undefined) ??
      (data.user.user_metadata?.full_name as string | undefined) ??
      null,
    user_metadata: data.user.user_metadata,
  }
}

// Require admin role - returns user or redirects to login
export async function requireAdmin(): Promise<User> {
  const user = await requireAuth()

  if (!ADMIN_EMAILS.includes(user.email?.toLowerCase() || "")) {
    redirect("/login")
  }

  return user
}

// Check if user is admin
export function isAdmin(user: User | null): boolean {
  return !!user && ADMIN_EMAILS.includes(user.email?.toLowerCase() || "")
}

// Check if user is authenticated
export function isAuthenticated(user: User | null): boolean {
  return !!user
}
