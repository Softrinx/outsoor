# PayPal Payment Implementation

This document describes the complete PayPal payment system implementation for the Modelsnest application.

## Features

- ✅ **Real-time Payment Processing**: Instant payment status updates via webhooks
- ✅ **Environment Support**: Automatic switching between Sandbox and Live environments
- ✅ **Multiple Payment Methods**: PayPal accounts and credit/debit cards
- ✅ **Secure Integration**: Server-side payment processing with client-side UI
- ✅ **Webhook Handling**: Real-time payment notifications
- ✅ **Status Tracking**: Live payment status updates
- ✅ **Error Handling**: Comprehensive error handling and user feedback

## Environment Configuration

### Required Environment Variables

Create a `.env` file in your project root with the following variables:

```bash
# PayPal Configuration
PAYPAL_TEST=true  # Set to 'false' for live environment

# Sandbox Environment (for testing)
PAYPAL_CLIENT_ID_SANDBOX=your_sandbox_client_id
PAYPAL_CLIENT_SECRET_SANDBOX=your_sandbox_client_secret

# Live Environment (for production)
PAYPAL_CLIENT_ID_LIVE=your_live_client_id
PAYPAL_CLIENT_SECRET_LIVE=your_live_client_secret

# Optional: Webhook IDs for real-time updates
PAYPAL_WEBHOOK_ID_SANDBOX=your_sandbox_webhook_id
PAYPAL_WEBHOOK_ID_LIVE=your_live_webhook_id

# App URL for PayPal redirects
NEXT_PUBLIC_APP_URL=https://Modelsnest.com  # or your production URL
```

### Environment Switching

The system automatically detects the environment based on `PAYPAL_TEST`:

- **`PAYPAL_TEST=true`**: Uses Sandbox credentials and endpoints
- **`PAYPAL_TEST=false`**: Uses Live credentials and endpoints

## Architecture

### Backend Components

1. **PayPal Configuration (`lib/paypal.ts`)**
   - Environment detection and credential management
   - PayPal client creation
   - Configuration validation

2. **API Routes**
   - `/api/paypal/create-order`: Creates PayPal payment orders
   - `/api/paypal/capture-order`: Captures authorized payments
   - `/api/paypal/webhook`: Handles real-time payment notifications
   - `/api/paypal/order-status`: Checks payment status
   - `/api/paypal/client-id`: Provides client ID to frontend
   - `/api/paypal/config-status`: Configuration validation

3. **Database Integration**
   - Transaction tracking with status updates
   - Credit balance management
   - Payment metadata storage

### Frontend Components

1. **PayPalButton (`components/paypal-button.tsx`)**
   - Main payment button component
   - PayPal JavaScript SDK integration
   - Payment flow management

2. **PayPalStatusChecker (`components/paypal-status-checker.tsx`)**
   - Real-time payment status updates
   - Automatic status polling
   - Visual status indicators

3. **PayPalConfigChecker (`components/paypal-config-checker.tsx`)**
   - Configuration validation
   - Environment information display
   - Setup guidance

4. **Updated TopUpDialog (`components/top-up-dialog.tsx`)**
   - Integrated PayPal payment flow
   - Payment method selection
   - Enhanced user experience

## Payment Flow

### 1. Order Creation
```typescript
// User selects amount and payment method
// System creates PayPal order via API
POST /api/paypal/create-order
{
  "amount": 100,
  "currency": "USD"
}
```

### 2. User Authorization
- User is redirected to PayPal
- User authorizes payment (PayPal account or card)
- PayPal redirects back to application

### 3. Payment Capture
```typescript
// System captures the authorized payment
POST /api/paypal/capture-order
{
  "orderId": "paypal_order_id"
}
```

### 4. Real-time Updates
- Webhook notifications for payment events
- Database updates for transaction status
- User balance updates

## Webhook Events

The system handles the following PayPal webhook events:

- `PAYMENT.CAPTURE.COMPLETED`: Payment successfully captured
- `PAYMENT.CAPTURE.DENIED`: Payment denied
- `PAYMENT.CAPTURE.REFUNDED`: Payment refunded
- `CHECKOUT.ORDER.APPROVED`: Order approved by user
- `CHECKOUT.ORDER.CANCELLED`: Order cancelled by user

## Security Features

1. **Server-side Processing**: All payment operations happen on the server
2. **Webhook Verification**: Basic webhook signature validation
3. **User Authentication**: All API routes require user authentication
4. **Environment Isolation**: Clear separation between test and live environments
5. **Error Handling**: Comprehensive error handling without exposing sensitive data

## Testing

### Sandbox Environment
1. Set `PAYPAL_TEST=true` in your `.env` file
2. Use PayPal Sandbox test accounts
3. Test with various payment scenarios

### Test Cards
Use PayPal's test credit card numbers:
- Visa: 4032030000000000
- Mastercard: 5424000000000000
- American Express: 378282246310005

## Production Deployment

### 1. Environment Setup
```bash
PAYPAL_TEST=false
PAYPAL_CLIENT_ID_LIVE=your_live_client_id
PAYPAL_CLIENT_SECRET_LIVE=your_live_client_secret
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

### 2. Webhook Configuration
1. Go to PayPal Developer Dashboard
2. Create webhook for your production domain
3. Add webhook ID to environment variables

### 3. SSL Requirements
- Production must use HTTPS
- Webhook endpoints must be publicly accessible
- Valid SSL certificate required

## Error Handling

### Common Errors and Solutions

1. **"PayPal is not configured"**
   - Check environment variables
   - Verify `.env` file exists
   - Restart application after changes

2. **"Client ID not found"**
   - Verify `PAYPAL_CLIENT_ID_*` variables
   - Check environment switching logic

3. **"Webhook signature verification failed"**
   - Verify webhook ID configuration
   - Check webhook endpoint accessibility

4. **"Payment capture failed"**
   - Check PayPal order status
   - Verify payment authorization
   - Review error logs

## Monitoring and Logging

### Log Levels
- **Info**: Payment creation, completion, status updates
- **Warning**: Webhook verification issues, retry attempts
- **Error**: Payment failures, API errors, configuration issues

### Key Metrics
- Payment success rate
- Average processing time
- Error frequency by type
- Webhook delivery success rate

## Troubleshooting

### Payment Not Processing
1. Check PayPal configuration status
2. Verify environment variables
3. Check browser console for errors
4. Review server logs

### Webhook Not Receiving Events
1. Verify webhook URL accessibility
2. Check webhook ID configuration
3. Test webhook endpoint manually
4. Review PayPal webhook settings

### Environment Issues
1. Clear browser cache
2. Restart development server
3. Verify `.env` file changes
4. Check environment variable loading

## Support

For PayPal-specific issues:
1. Check PayPal Developer Documentation
2. Review PayPal Developer Dashboard
3. Contact PayPal Developer Support

For implementation issues:
1. Review this documentation
2. Check application logs
3. Verify configuration
4. Test with sandbox environment first

## Future Enhancements

- [ ] Enhanced webhook signature verification
- [ ] Payment retry mechanisms
- [ ] Advanced fraud detection
- [ ] Multi-currency support
- [ ] Subscription billing
- [ ] Payment analytics dashboard
- [ ] A/B testing for payment flows
- [ ] Mobile-optimized payment experience
