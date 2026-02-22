import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { createCoinbaseCharge } from "@/lib/coinbase"
import { getAppUrl } from "@/lib/get-app-url"

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { amount } = await req.json()

    if (!amount || amount < 0.01) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 })
    }

    // Canonical base URL (prevents accidental localhost redirects in production)
    const appUrl = getAppUrl(req)

    const chargeData = {
      name: "Modelsnest Credits Top-up",
      description: `Top-up $${amount} credits`,
      pricing_type: "fixed_price" as const,
      local_price: {
        amount: amount.toString(),
        currency: "USD",
      },
      metadata: {
        userId: user.id,
        userEmail: user.email,
        type: "topup",
      },
      redirect_url: `${appUrl}/dashboard/billing#success`,
      cancel_url: `${appUrl}/dashboard/billing#cancelled`,
    }

    const charge = await createCoinbaseCharge(chargeData)

    return NextResponse.json({ charge })
  } catch (error) {
    console.error("Error creating Coinbase charge:", error)
    return NextResponse.json(
      { error: "Failed to create charge" },
      { status: 500 }
    )
  }
}
