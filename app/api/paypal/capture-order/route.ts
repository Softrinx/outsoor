import { NextRequest, NextResponse } from 'next/server'
import { createPayPalClient, isPayPalConfigured } from '@/lib/paypal-legacy'
import { getCurrentUser } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const sql = getSql()
    // Check if PayPal is configured
    if (!isPayPalConfigured()) {
      return NextResponse.json(
        { error: 'PayPal is not configured' },
        { status: 500 }
      )
    }

    // Get current user
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Parse request body
    const { orderId } = await request.json()

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      )
    }

    // Create PayPal client
    const paypalClient = createPayPalClient()

    // Create capture request
    const captureRequest = new (await import('@paypal/checkout-server-sdk')).orders.OrdersCaptureRequest(orderId)
    captureRequest.prefer("return=representation")
    
    // Capture the payment
    const capture = await paypalClient.execute(captureRequest)

    if (capture.result.status === 'COMPLETED') {
      // TODO: Re-enable database operations when tables are properly set up
      console.log('Payment captured successfully, skipping database operations for now')
      
      /*
      // Update transaction status
      await sql`
        UPDATE credit_transactions 
        SET 
          status = 'completed',
          reference_id = ${orderId},
          metadata = metadata || ${JSON.stringify({
            paypalCaptureId: orderId,
            paypalCaptureStatus: capture.result.status,
            captureTimestamp: new Date().toISOString()
          })}
        WHERE reference_id = ${orderId} AND status = 'pending'
      `

      // Add credits to user account
      const amount = parseFloat(capture.result.purchase_units[0].payments.captures[0].amount.value)
      await sql`
        UPDATE user_credits 
        SET 
          balance = balance + ${amount},
          total_topped_up = total_topped_up + ${amount},
          updated_at = NOW()
        WHERE user_id = ${user.id}
      `
      */

      return NextResponse.json({
        success: true,
        message: 'Payment captured successfully',
        data: {
          orderId,
          status: capture.result.status,
          captureId: orderId,
          amount: capture.result.purchase_units[0].payments.captures[0].amount.value
        }
      })
    } else {
      // TODO: Re-enable database operations when tables are properly set up
      console.log('Payment capture failed, skipping database operations for now')
      
      /*
      // Update transaction status to failed
      await sql`
        UPDATE credit_transactions 
        SET 
          status = 'failed',
          metadata = metadata || ${JSON.stringify({
            paypalCaptureId: orderId,
            paypalCaptureStatus: capture.result.status,
            failureTimestamp: new Date().toISOString()
          })}
        WHERE reference_id = ${orderId} AND status = 'pending'
      `
      */

      return NextResponse.json(
        { error: 'Payment capture failed' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('PayPal capture order error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
