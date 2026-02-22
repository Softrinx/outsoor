"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Search, ArrowLeft, HelpCircle, BookOpen, Users } from "lucide-react"
import { ModelsnestLogo } from "@/components/Modelsnest-logo"

export default function NotFound() {
  const helpfulLinks = [
    {
      title: "Home",
      description: "Return to the main page",
      icon: Home,
      href: "/",
      color: "bg-green-500"
    },
    {
      title: "Help Center",
      description: "Find answers to common questions",
      icon: HelpCircle,
      href: "/help",
      color: "bg-blue-500"
    },
    {
      title: "Documentation",
      description: "Browse our API documentation",
      icon: BookOpen,
      href: "/reference",
      color: "bg-purple-500"
    },
    {
      title: "Community",
      description: "Get help from the community",
      icon: Users,
      href: "/community",
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
          {/* 404 Icon and Title */}
          <div className="mb-8">
            <div className="text-8xl font-bold text-muted-foreground/20 mb-4">404</div>
            <h1 className="text-4xl font-bold text-foreground mb-4">Page Not Found</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search for pages, APIs, or documentation..."
                className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/">
              <Button className="bg-green-500 hover:bg-green-600">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            </Link>
            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>

          {/* Helpful Links */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Helpful Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {helpfulLinks.map((link) => (
                <Link key={link.title} href={link.href}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${link.color}`}></div>
                        <link.icon className="w-6 h-6 text-green-500" />
                        <CardTitle className="text-lg">{link.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm">{link.description}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-muted/30 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-foreground mb-3">Still can't find what you're looking for?</h3>
            <p className="text-muted-foreground mb-4">
              Our support team is here to help you navigate our platform
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
                  <Users className="w-4 h-4 mr-2" />
                  Ask Community
                </Button>
              </Link>
            </div>
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
