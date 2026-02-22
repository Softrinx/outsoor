"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { isAdmin as checkIsAdmin } from "@/lib/admin-utils"

export async function adminLogin(prevState: any, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  try {
    const supabase = await createClient()

    // Sign in with Supabase auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error("Admin login error:", error)
      return { error: error.message || "Invalid credentials" }
    }

    if (!data.user) {
      return { error: "Login failed. Please try again." }
    }

    // Check if user is admin from database
    const userIsAdmin = await checkIsAdmin(supabase, data.user.id)
    
    if (!userIsAdmin) {
      // Sign out if not admin
      await supabase.auth.signOut()
      return { error: "You do not have admin access" }
    }

    // Successfully logged in as admin
    redirect("/admin")
  } catch (error) {
    console.error("Admin login error:", error)
    return { error: "An unexpected error occurred" }
  }
}
