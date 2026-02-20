"use server"

import { createClient } from "@/lib/supabase/server"

export async function getUserTokens() {
  try {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return { success: false, error: "Not authenticated", data: [] }
    }

    // Return dummy API tokens
    return {
      success: true,
      data: [
        {
          id: "token_1",
          name: "Production API",
          token: "sk_live_51234567890abcdefg...",
          created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          last_used: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          status: "active",
        },
        {
          id: "token_2",
          name: "Development API",
          token: "sk_test_51234567890abcdefg...",
          created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
          last_used: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          status: "active",
        },
      ],
    }
  } catch (error) {
    console.error("Error getting tokens:", error)
    return { success: false, error: "Failed to load API tokens", data: [] }
  }
}

export async function createApiToken(formData: FormData) {
  try {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return { success: false, error: "Not authenticated" }
    }

    const name = formData.get("name") as string

    if (!name) {
      return { success: false, error: "Token name is required" }
    }

    // Return dummy token
    return {
      success: true,
      message: "API token created successfully",
      token: `sk_live_${Math.random().toString(36).substring(2, 50)}`,
      data: {
        id: `token_${Date.now()}`,
        name,
        created_at: new Date().toISOString(),
      },
    }
  } catch (error) {
    console.error("Error creating token:", error)
    return { success: false, error: "Failed to create API token" }
  }
}

export async function regenerateToken(formData: FormData) {
  try {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return { success: false, error: "Not authenticated" }
    }

    const tokenId = formData.get("tokenId") as string

    if (!tokenId) {
      return { success: false, error: "Token ID is required" }
    }

    // Return regenerated token
    return {
      success: true,
      message: "API token regenerated successfully",
      token: `sk_live_${Math.random().toString(36).substring(2, 50)}`,
      data: {
        id: tokenId,
        created_at: new Date().toISOString(),
      },
    }
  } catch (error) {
    console.error("Error regenerating token:", error)
    return { success: false, error: "Failed to regenerate API token" }
  }
}

export async function deleteToken(formData: FormData) {
  try {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return { success: false, error: "Not authenticated" }
    }

    const tokenId = formData.get("tokenId") as string

    if (!tokenId) {
      return { success: false, error: "Token ID is required" }
    }

    // Return success
    return {
      success: true,
      message: "API token deleted successfully",
    }
  } catch (error) {
    console.error("Error deleting token:", error)
    return { success: false, error: "Failed to delete API token" }
  }
}

export async function getUserIntegrations() {
  try {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return { success: false, error: "Not authenticated", data: [] }
    }

    // Return dummy integrations
    return {
      success: true,
      data: [
        {
          id: "int_1",
          name: "Slack",
          status: "connected",
          connected_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: "int_2",
          name: "Discord",
          status: "connected",
          connected_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ],
    }
  } catch (error) {
    console.error("Error getting integrations:", error)
    return { success: false, error: "Failed to load integrations", data: [] }
  }
}

export async function verifyApiToken(token: string) {
  // For now, verify against dummy tokens or return null
  if (token.startsWith("sk_")) {
    return {
      id: "token_1",
      user_id: "user_123",
      token: token,
    }
  }
  return null
}
