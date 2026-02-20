import { createServerClient } from "@supabase/ssr"
import type { NextRequest, NextResponse } from "next/server"
import { getSupabaseEnv } from "@/lib/supabase/env"

export function createMiddlewareClient(
  request: NextRequest,
  response: NextResponse
) {
  const { url, publishableKey } = getSupabaseEnv()

  if (!url || !publishableKey) {
    throw new Error(
      "Missing Supabase environment variables. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)."
    )
  }

  return createServerClient(
    url,
    publishableKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )
}
