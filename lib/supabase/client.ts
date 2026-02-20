import { createBrowserClient } from '@supabase/ssr'
import { getSupabaseEnv } from '@/lib/supabase/env'

export function createClient() {
  const { url, publishableKey } = getSupabaseEnv()

  if (!url || !publishableKey) {
    throw new Error(
      'Missing Supabase environment variables. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY).'
    )
  }

  // Create a supabase client on the browser with project's credentials
  return createBrowserClient(
    url,
    publishableKey
  )
}
