import { NextRequest, NextResponse } from 'next/server'
import { verifyApiToken } from '@/app/actions/api-tokens'

export async function POST(request: NextRequest) {
  try {
    // 1. Authenticate using API Key
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing or invalid Authorization header' },
        { status: 401 }
      )
    }

    const token = authHeader.split(' ')[1]
    const tokenInfo = await verifyApiToken(token)

    if (!tokenInfo) {
      return NextResponse.json(
        { error: 'Invalid API token' },
        { status: 401 }
      )
    }

    // 2. Define deduction amount (Fixed at 1 USD as requested)
    const DEDUCTION_AMOUNT = 1.00
    const userId = tokenInfo.user_id

    // For now, return dummy response
    const currentBalance = 150.00

    if (currentBalance < DEDUCTION_AMOUNT) {
      return NextResponse.json(
        { 
          error: 'Insufficient credits',
          current_balance: currentBalance,
          required: DEDUCTION_AMOUNT
        },
        { status: 402 } // Payment Required
      )
    }

    // Return Success
    return NextResponse.json({
      success: true,
      message: 'Credits deducted successfully',
      deducted: DEDUCTION_AMOUNT,
      remaining_balance: currentBalance - DEDUCTION_AMOUNT,
      transaction_id: `tx_${Date.now()}`
    })

  } catch (error) {
    console.error('Deduct credits error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
