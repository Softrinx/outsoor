"use server"

import { createClient } from "@/lib/supabase/server"

export async function getBillingInfo() {
  try {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return { success: false, error: "Not authenticated" }
    }

    // Return dummy billing data for now
    return {
      success: true,
      data: {
        credits: {
          balance: 150.00,
          total_spent: 275.50,
          total_topped_up: 425.50,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        transactions: [
          {
            id: "tx_1",
            type: "topup",
            amount: 100,
            description: "PayPal top-up",
            status: "completed",
            created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: "tx_2",
            type: "usage",
            amount: 50.25,
            description: "API usage charges",
            status: "completed",
            created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: "tx_3",
            type: "topup",
            amount: 325.50,
            description: "Credit card top-up",
            status: "completed",
            created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
          },
        ],
        monthlyUsage: [
          { month: new Date(Date.now() - 0 * 30 * 24 * 60 * 60 * 1000).toISOString(), total_cost: 42.50, usage_count: 156 },
          { month: new Date(Date.now() - 1 * 30 * 24 * 60 * 60 * 1000).toISOString(), total_cost: 65.00, usage_count: 248 },
          { month: new Date(Date.now() - 2 * 30 * 24 * 60 * 60 * 1000).toISOString(), total_cost: 168.00, usage_count: 412 },
        ],
        user: {
          id: user.id,
          email: user.email,
          name: user.user_metadata?.name ?? null,
        },
      },
    }
  } catch (error) {
    console.error("Error getting billing info:", error)
    return { success: false, error: "Failed to load billing information" }
  }
}

export async function getUsageAnalytics(days: number = 30) {
  try {
    // Return dummy usage analytics
    return {
      success: true,
      data: {
        serviceBreakdown: [
          { service_type: "api_calls", total_cost: 45.50, usage_count: 234, total_tokens: 125000 },
          { service_type: "chat", total_cost: 28.75, usage_count: 89, total_tokens: 87500 },
          { service_type: "embeddings", total_cost: 15.25, usage_count: 156, total_tokens: 62000 },
        ],
        dailyUsage: [
          { date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toDateString(), daily_cost: 8.50, daily_requests: 32 },
          { date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toDateString(), daily_cost: 12.25, daily_requests: 45 },
          { date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toDateString(), daily_cost: 10.75, daily_requests: 38 },
          { date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toDateString(), daily_cost: 9.00, daily_requests: 34 },
          { date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toDateString(), daily_cost: 11.50, daily_requests: 42 },
          { date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toDateString(), daily_cost: 14.00, daily_requests: 51 },
          { date: new Date().toDateString(), daily_cost: 6.25, daily_requests: 22 },
        ],
        period: days,
      },
    }
  } catch (error) {
    console.error("Error getting usage analytics:", error)
    return { success: false, error: "Failed to load usage analytics" }
  }
}

export async function createTopUp(formData: FormData) {
  try {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return { success: false, error: "Not authenticated" }
    }

    const amount = Number(formData.get("amount"))

    if (!amount || amount <= 0) {
      return { success: false, error: "Invalid amount" }
    }

    // Return success with dummy transaction data
    return {
      success: true,
      message: `Successfully added $${amount} to your account`,
      data: {
        id: `tx_${Date.now()}`,
        amount,
        created_at: new Date().toISOString(),
      },
    }
  } catch (error) {
    console.error("Error creating top-up:", error)
    return { success: false, error: "Failed to process top-up" }
  }
}

export async function recordUsage(usage: any) {
  // This is a placeholder for usage recording via Supabase in future
  return { success: true }
}

export async function getPaymentMethods() {
  return {
    success: true,
    data: [{ id: "paypal", name: "PayPal", type: "digital_wallet" }],
  }
}
