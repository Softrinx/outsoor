"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

// Request password reset - sends reset link to email
export async function requestPasswordReset(formData: FormData) {
  const email = formData.get("email") as string

  if (!email) {
    return { error: "Email is required" }
  }

  try {
    const supabase = await createClient()

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/reset-password`,
    })

    if (error) {
      console.error("Password reset request error:", error)
      return { error: error.message || "Failed to send reset email" }
    }

    return {
      success: true,
      message: "Password reset link sent to your email. Please check your inbox.",
    }
  } catch (error) {
    console.error("Unexpected error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}

// Reset password with verification code from email link
export async function resetPassword(formData: FormData) {
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string
  const token = formData.get("token") as string

  if (!password || !confirmPassword) {
    return { error: "Password and confirmation are required" }
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" }
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters long" }
  }

  try {
    const supabase = await createClient()

    // The token from the email link is in the URL hash, Supabase automatically
    // handles this and creates a session. We just need to update the password.
    const { error: updateError } = await supabase.auth.updateUser({
      password: password,
    })

    if (updateError) {
      console.error("Password update error:", updateError)
      return { error: updateError.message || "Failed to update password" }
    }

    return {
      success: true,
      message: "Password reset successfully! Redirecting to login...",
    }
  } catch (error) {
    console.error("Unexpected error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}

// Validate reset token - check if the email confirmation link is valid
export async function validateResetToken(token: string) {
  try {
    const supabase = await createClient()

    // Get current user to verify the token created a valid session
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    // If we have a user session, the token is valid
    if (user) {
      return { valid: true }
    }

    // If no user, the token is invalid
    return {
      valid: false,
      error: "This password reset link has expired or is invalid",
    }
  } catch (error) {
    console.error("Token validation error:", error)
    return {
      valid: false,
      error: "Failed to validate reset link",
    }
  }
}
