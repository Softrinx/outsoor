"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { requestPasswordReset } from "@/app/actions/auth"
import { Loader2, Mail, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"

export function ForgotPasswordForm() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [resetToken, setResetToken] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    const result = await requestPasswordReset(formData)

    if (result.error) {
      setError(result.error)
    } else {
      setSuccess(result.message || "Reset link sent successfully!")
      // For testing purposes - remove in production
      const maybeResetToken = (result as { resetToken?: string }).resetToken
      if (typeof maybeResetToken === "string") {
        setResetToken(maybeResetToken)
      }
    }

    setIsLoading(false)
  }

  if (success) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <h1 className="text-3xl font-bold gradient-text mb-2">Check Your Email</h1>
          <p className="text-muted-foreground">{success}</p>
        </div>

        {/* For testing purposes - remove in production */}
        {resetToken && (
          <div className="glass-effect-strong rounded-xl p-4 border border-blue-500/30 backdrop-blur-xl mb-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-blue-400"></div>
              <p className="text-sm text-blue-300 font-medium">Testing Mode</p>
            </div>
            <p className="text-xs text-blue-200 mb-2">Use this link to reset your password:</p>
            <Link
              href={`/reset-password?token=${resetToken}`}
              className="text-xs text-blue-300 hover:text-blue-200 underline break-all"
            >
              /reset-password?token={resetToken}
            </Link>
          </div>
        )}

        <div className="space-y-4">
          <Button
            onClick={() => {
              setSuccess(null)
              setResetToken(null)
            }}
            variant="outline"
            className="w-full glass-effect-strong border-white/20 hover:border-primary/60 h-12 rounded-xl backdrop-blur-xl transition-all duration-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Send Another Reset Link
          </Button>

          <Link href="/login">
            <Button className="w-full btn-primary h-12 text-base font-semibold rounded-xl glass-effect-strong hover-lift transition-all duration-300 border border-primary/30">
              Back to Sign In
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">Reset Password</h1>
        <p className="text-muted-foreground">
          Enter your email address and we'll send you a link to reset your password
        </p>
      </div>

      <form action={handleSubmit} className="space-y-6">
        {error && (
          <div className="glass-effect-red rounded-xl p-4 border border-red-500/30 backdrop-blur-xl">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-400"></div>
              <p className="text-sm text-red-300 font-medium">{error}</p>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <Label htmlFor="email" className="text-sm font-semibold text-foreground/90 flex items-center gap-2">
            <Mail className="w-4 h-4 text-primary" />
            Email Address
          </Label>
          <div className="relative">
            <Input
              id="email"
              name="email"
              type="email"
              required
              className="glass-effect-strong border-white/20 focus:border-primary/60 focus:ring-primary/30 h-12 pl-4 pr-4 rounded-xl backdrop-blur-xl transition-all duration-300 hover-border-green"
              placeholder="Enter your email address"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full btn-primary h-12 text-base font-semibold rounded-xl glass-effect-strong hover-lift transition-all duration-300 border border-primary/30"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Sending reset link...
            </>
          ) : (
            <>
              <Mail className="mr-2 h-4 w-4" />
              Send Reset Link
            </>
          )}
        </Button>
      </form>
    </div>
  )
}
