const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL

const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY

export function getSupabaseEnv() {
  return {
    url: supabaseUrl,
    publishableKey: supabasePublishableKey,
  }
}

export function hasSupabaseEnv() {
  return Boolean(supabaseUrl && supabasePublishableKey)
}
