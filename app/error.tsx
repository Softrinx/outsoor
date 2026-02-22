"use client"

import React, { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, RefreshCw, Bug, AlertTriangle, HelpCircle, ArrowLeft } from "lucide-react"
import { ModelsnestLogo } from "@/components/Modelsnest-logo"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error)
    
    // You can also send this to your error tracking service like Sentry
    // Sentry.captureException(error)
  }, [error])

  const errorDetails = {
    message: error.message || "Something went wrong",
    stack: error.stack,
    digest: error.digest
  }

  const helpfulActions = [
    {
      title: "Try Again",
      description: "Reload the page and try again",
      icon: RefreshCw,
      action: reset,
      variant: "default" as const,
      color: "bg-green-500"
    },
    {
      title: "Go Home",
      description: "Return to the main page",
      icon: Home,
      href: "/",
      variant: "outline" as const,
      color: "bg-blue-500"
    },
    {
      title: "Help Center",
      description: "Find solutions to common issues",
      icon: HelpCircle,
      href: "/help",
      variant: "outline" as const,
      color: "bg-purple-500"
    },
    {
      title: "Go Back",
      description: "Return to the previous page",
      icon: ArrowLeft,
      action: () => window.history.back(),
      variant: "outline" as const,
      color: "bg-orange-500"
    }
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <ModelsnestLogo size="lg" variant="header" />
            <div className="flex items-center gap-4">
              <Link href="/help">
                <Button variant="ghost" size="sm">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Help
                </Button>
              </Link>
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Error Icon and Title */}
          <div className="mb-8">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-12 h-12 text-red-500" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">Something Went Wrong</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We encountered an unexpected error. Don't worry, our team has been notified and is working to fix it.
            </p>
          </div>

          {/* Error Details (Collapsible) */}
          <div className="mb-8">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 justify-center">
                  <Bug className="w-5 h-5 text-muted-foreground" />
                  Error Details
                </CardTitle>
                <CardDescription>
                  Technical information about what went wrong
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-left space-y-3">
                  <div>
                    <span className="font-medium text-sm text-muted-foreground">Error Message:</span>
                    <p className="text-sm font-mono bg-muted p-2 rounded mt-1 break-words">
                      {errorDetails.message}
                    </p>
                  </div>
                  {errorDetails.digest && (
                    <div>
                      <span className="font-medium text-sm text-muted-foreground">Error ID:</span>
                      <p className="text-sm font-mono bg-muted p-2 rounded mt-1">
                        {errorDetails.digest}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-6">What would you like to do?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {helpfulActions.map((action) => (
                <Card key={action.title} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${action.color}`}></div>
                      <action.icon className="w-6 h-6 text-green-500" />
                      <CardTitle className="text-lg">{action.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm mb-4">{action.description}</CardDescription>
                    {action.href ? (
                      <Link href={action.href}>
                        <Button variant={action.variant} className="w-full">
                          {action.title}
                        </Button>
                      </Link>
                    ) : (
                      <Button 
                        variant={action.variant} 
                        className="w-full"
                        onClick={action.action}
                      >
                        {action.title}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Support Information */}
          <div className="bg-muted/30 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-foreground mb-3">Need additional help?</h3>
            <p className="text-muted-foreground mb-4">
              If this error persists, our support team is ready to help you resolve it
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/help">
                <Button variant="outline">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Visit Help Center
                </Button>
              </Link>
              <Link href="/community">
                <Button variant="outline">
                  <Bug className="w-4 h-4 mr-2" />
                  Report Issue
                </Button>
              </Link>
            </div>
          </div>

          {/* Error Reporting Note */}
          <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <p className="text-sm text-blue-600 dark:text-blue-400">
              💡 <strong>Tip:</strong> This error has been automatically reported to our team. 
              If you have additional context, please share it in our community forum.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/20 py-6">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Modelsnest. All rights reserved. | 
            <Link href="/help" className="text-green-500 hover:text-green-600 ml-1">
              Need help?
            </Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
