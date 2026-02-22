"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  ChevronLeft,
  User,
  Home,
  Users,
  LogOut,
  LayoutDashboard,
  Receipt
} from "lucide-react"
import { ModelsnestLogo, ModelsnestLogoCompact } from "@/components/Modelsnest-logo"

interface AdminSidebarProps {
  user: { name: string; email: string; role: string }
  onSidebarToggle?: (isCollapsed: boolean) => void
}

export function AdminSidebar({ user, onSidebarToggle }: AdminSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true)
      } else {
        setIsCollapsed(false)
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    onSidebarToggle?.(isCollapsed)
  }, [isCollapsed, onSidebarToggle])

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed)
  }

  const mainItems = [
    {
      icon: LayoutDashboard,
      label: "Overview",
      href: "/admin",
      active: pathname === "/admin",
    },
    {
      icon: Users,
      label: "Users",
      href: "/admin/users",
      active: pathname === "/admin/users",
    },
    {
      icon: Receipt,
      label: "Invoices & Receipts",
      href: "/admin/invoices",
      active: pathname.startsWith("/admin/invoices"),
    },
     {
      icon: Receipt,
      label: "Transactions",
      href: "/admin/transactions",
      active: pathname.startsWith("/admin/transactions"),
    }
  ]

  return (
    <div 
      className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-[#1a1b1f] to-[#111113] border-r border-[#2d2d32] transition-all duration-300 ease-in-out z-50 ${
        isCollapsed ? "w-[70px] rounded-r-2xl" : "w-[250px] rounded-r-2xl"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-[#2d2d32]">
        {!isCollapsed ? (
          <div className="flex items-center gap-2">
            <ModelsnestLogo size="md" variant="sidebar" />
            <span className="text-xs font-bold text-[#8C5CF7] border border-[#8C5CF7]/30 bg-[#8C5CF7]/10 px-2 py-0.5 rounded">ADMIN</span>
          </div>
        ) : (
          <ModelsnestLogoCompact />
        )}
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleToggle}
          className="p-2 text-[#d1d5db] hover:text-white hover:bg-[#2d2d32] rounded-lg transition-all duration-200"
        >
          <ChevronLeft className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`} />
        </Button>
      </div>

      <div className="p-3">
        <div className="space-y-1">
          {mainItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#d1d5db] hover:text-white hover:bg-[#2d2d32] transition-all duration-200 group ${
                item.active ? "bg-[#6d28d9] text-white" : ""
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && (
                <span className="font-medium truncate">{item.label}</span>
              )}
            </Link>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-[#2d2d32] bg-gradient-to-b from-transparent to-[#111113]">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-gradient-to-br from-[#ef4444] to-[#dc2626] rounded-lg flex items-center justify-center flex-shrink-0">
            <User className="w-4 h-4 text-white" />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-[#d1d5db] truncate">{user.name}</div>
              <div className="text-xs text-[#9ca3af] truncate">{user.email}</div>
            </div>
          )}
        </div>
        
        <Link href="/dashboard">
          <Button 
            variant="outline" 
            size="sm" 
            className={`w-full border-[#2d2d32] text-[#9ca3af] hover:text-white hover:bg-[#2d2d32] ${
              isCollapsed ? "px-2" : ""
            }`}
          >
            <Home className="w-4 h-4 flex-shrink-0" />
            {!isCollapsed && <span className="ml-2">User Dashboard</span>}
          </Button>
        </Link>
      </div>
    </div>
  )
}
