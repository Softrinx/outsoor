#!/usr/bin/env node

/**
 * PayPal Configuration Test Script
 * 
 * This script tests the PayPal configuration and basic functionality.
 * Run with: node scripts/test-paypal-config.js
 */

const path = require('path')
const fs = require('fs')

// Load environment variables
function loadEnvFile() {
  const envPath = path.join(__dirname, '..', '.env')
  
  if (!fs.existsSync(envPath)) {
    console.log('❌ .env file not found')
    console.log('Please create a .env file with your PayPal configuration')
    return false
  }

  const envContent = fs.readFileSync(envPath, 'utf8')
  const envVars = {}

  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=')
    if (key && valueParts.length > 0) {
      let value = valueParts.join('=').replace(/"/g, '').trim()
      // Remove comments (everything after #)
      if (value.includes('#')) {
        value = value.split('#')[0].trim()
      }
      if (value) {
        envVars[key.trim()] = value
      }
    }
  })

  return envVars
}

// Test PayPal configuration
function testPayPalConfig(envVars) {
  console.log('🔍 Testing PayPal Configuration...\n')

  const requiredVars = [
    'PAYPAL_TEST',
    'PAYPAL_CLIENT_ID_SANDBOX',
    'PAYPAL_CLIENT_SECRET_SANDBOX',
    'PAYPAL_CLIENT_ID_LIVE',
    'PAYPAL_CLIENT_SECRET_LIVE'
  ]

  const optionalVars = [
    'PAYPAL_WEBHOOK_ID_SANDBOX',
    'PAYPAL_WEBHOOK_ID_LIVE',
    'NEXT_PUBLIC_APP_URL'
  ]

  let allRequiredPresent = true
  let configValid = true

  // Check required variables
  console.log('📋 Required Environment Variables:')
  requiredVars.forEach(varName => {
    const value = envVars[varName]
    if (value) {
      const maskedValue = value.length > 8 ? `${value.slice(0, 4)}...${value.slice(-4)}` : '***'
      console.log(`  ✅ ${varName}: ${maskedValue}`)
    } else {
      console.log(`  ❌ ${varName}: Missing`)
      allRequiredPresent = false
      configValid = false
    }
  })

  // Check optional variables
  console.log('\n📋 Optional Environment Variables:')
  optionalVars.forEach(varName => {
    const value = envVars[varName]
    if (value) {
      console.log(`  ✅ ${varName}: ${value}`)
    } else {
      console.log(`  ⚠️  ${varName}: Not set`)
    }
  })

  // Check environment configuration
  console.log('\n🌍 Environment Configuration:')
  console.log(`  PAYPAL_TEST raw value: "${envVars.PAYPAL_TEST}"`)
  console.log(`  PAYPAL_TEST type: ${typeof envVars.PAYPAL_TEST}`)
  const isTestMode = envVars.PAYPAL_TEST === 'true'
  console.log(`  isTestMode: ${isTestMode}`)
  console.log(`  Environment: ${isTestMode ? 'Sandbox (Testing)' : 'Live (Production)'}`)
  
  if (isTestMode) {
    console.log(`  Client ID: ${envVars.PAYPAL_CLIENT_ID_SANDBOX ? '✅ Configured' : '❌ Missing'}`)
    console.log(`  Client Secret: ${envVars.PAYPAL_CLIENT_SECRET_SANDBOX ? '✅ Configured' : '❌ Missing'}`)
  } else {
    console.log(`  Client ID: ${envVars.PAYPAL_CLIENT_ID_LIVE ? '✅ Configured' : '❌ Missing'}`)
    console.log(`  Client Secret: ${envVars.PAYPAL_CLIENT_SECRET_LIVE ? '✅ Configured' : '❌ Missing'}`)
  }

  // Check webhook configuration
  console.log('\n🔗 Webhook Configuration:')
  const webhookId = isTestMode ? envVars.PAYPAL_WEBHOOK_ID_SANDBOX : envVars.PAYPAL_WEBHOOK_ID_LIVE
  if (webhookId) {
    console.log(`  ✅ Webhook ID: ${webhookId}`)
  } else {
    console.log(`  ⚠️  Webhook ID: Not configured (real-time updates disabled)`)
  }

  // Check app URL
  console.log('\n🌐 Application Configuration:')
  if (envVars.NEXT_PUBLIC_APP_URL) {
    console.log(`  ✅ App URL: ${envVars.NEXT_PUBLIC_APP_URL}`)
  } else {
    console.log(`  ⚠️  App URL: Not set (using https://Modelsnest.com as default)`)
  }

  return configValid
}

// Test database connection (if possible)
function testDatabaseConnection() {
  console.log('\n🗄️  Database Connection:')
  
  try {
    // This would require the actual database connection
    // For now, just check if DATABASE_URL is set
    const envVars = loadEnvFile()
    if (envVars.DATABASE_URL) {
      console.log('  ✅ DATABASE_URL: Configured')
    } else {
      console.log('  ❌ DATABASE_URL: Missing')
    }
  } catch (error) {
    console.log('  ❌ Database connection test failed')
  }
}

// Main test function
function runTests() {
  console.log('🚀 PayPal Configuration Test Suite\n')
  console.log('=' .repeat(50))

  const envVars = loadEnvFile()
  if (!envVars) {
    process.exit(1)
  }

  const configValid = testPayPalConfig(envVars)
  testDatabaseConnection()

  console.log('\n' + '=' .repeat(50))
  
  if (configValid) {
    console.log('\n✅ PayPal configuration is valid!')
    console.log('\nNext steps:')
    console.log('1. Start your development server: npm run dev')
    console.log('2. Navigate to the billing page to test payments')
    console.log('3. Use PayPal Sandbox test accounts for testing')
    console.log('4. Check the PayPal configuration status in the UI')
  } else {
    console.log('\n❌ PayPal configuration has issues!')
    console.log('\nPlease fix the missing environment variables and run this test again.')
    console.log('\nFor help, see PAYPAL_IMPLEMENTATION.md')
  }

  console.log('\n📚 Documentation: PAYPAL_IMPLEMENTATION.md')
}

// Run tests if this script is executed directly
if (require.main === module) {
  runTests()
}

module.exports = { loadEnvFile, testPayPalConfig, runTests }
