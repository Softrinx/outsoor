import { NextResponse } from "next/server"
import { verifyCoinbaseWebhook } from "@/lib/coinbase"
import crypto from "crypto"

export async function POST(req: Request) {
  const rawBody = await req.text()
  const signature = req.headers.get("X-CC-Webhook-Signature")
  const webhookSecret = process.env.COINBASE_COMMERCE_WEBHOOK_SECRET

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "Missing signature or secret" }, { status: 400 })
  }

  try {
    const isValid = verifyCoinbaseWebhook(rawBody, signature, webhookSecret)
    if (!isValid) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    }

    const event = JSON.parse(rawBody)
    const { type, data } = event

    if (type === "charge:confirmed" || type === "charge:resolved") {
      const { metadata, payments } = data
      const userId = metadata?.userId
      const amount = parseFloat(data.pricing.local.amount)
      
      // Ensure we have a valid payment
      const payment = payments && payments.length > 0 ? payments[0] : null
      const transactionId = payment ? payment.transaction_id : data.code

      if (userId && amount > 0) {
        // For now, just log the payment
        console.log(`Processed Coinbase payment: ${data.code} for user ${userId} amount $${amount}`)
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Error processing Coinbase webhook:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
