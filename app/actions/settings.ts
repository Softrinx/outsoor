"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function updateUserProfile(formData: FormData) {
  const supabase = await createClient()
  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) {
    return { success: false, error: "Not authenticated" }
  }

  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string

    const updates: any = {}

    // Update email if changed
    if (email && email !== user.email) {
      const { error: emailError } = await supabase.auth.updateUser({ email })
      if (emailError) {
        return { success: false, error: `Email update failed: ${emailError.message}` }
      }
      updates.email = email
    }

    // Update name in user metadata
    if (name !== (user.user_metadata?.name || "")) {
      const { error: metaError } = await supabase.auth.updateUser({
        data: { name }
      })
      if (metaError) {
        return { success: false, error: `Profile update failed: ${metaError.message}` }
      }
      updates.name = name
    }

    return {
      success: true,
      message: "Profile updated successfully",
      data: updates
    }
  } catch (error) {
    console.error("Profile update error:", error)
    return { success: false, error: "Failed to update profile" }
  }
}

export async function changePassword(formData: FormData) {
  const supabase = await createClient()
  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) {
    return { success: false, error: "Not authenticated" }
  }

  try {
    const newPassword = formData.get("newPassword") as string
    const confirmPassword = formData.get("confirmPassword") as string

    if (!newPassword || !confirmPassword) {
      return { success: false, error: "Password fields are required" }
    }

    if (newPassword !== confirmPassword) {
      return { success: false, error: "Passwords do not match" }
    }

    if (newPassword.length < 8) {
      return { success: false, error: "Password must be at least 8 characters" }
    }

    const { error } = await supabase.auth.updateUser({ password: newPassword })

    if (error) {
      return { success: false, error: `Password change failed: ${error.message}` }
    }

    return { success: true, message: "Password changed successfully" }
  } catch (error) {
    console.error("Password change error:", error)
    return { success: false, error: "Failed to change password" }
  }
}

export async function logoutUser() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/login")
}
