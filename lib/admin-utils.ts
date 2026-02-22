import type { SupabaseClient } from "@supabase/supabase-js"

/**
 * Check if a user is an admin using any Supabase client
 * @param supabase - Supabase client instance
 * @param userId - User ID to check
 * @returns Promise<boolean> - true if user is admin, false otherwise
 */
export async function isAdmin(supabase: SupabaseClient, userId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", userId)
    .single()
  
  if (error || !data) {
    return false
  }
  
  return data.is_admin === true
}

/**
 * Get user profile including admin status
 * @param supabase - Supabase client instance
 * @param userId - User ID
 */
export async function getUserProfile(supabase: SupabaseClient, userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single()
  
  if (error || !data) {
    return null
  }
  
  return data
}
