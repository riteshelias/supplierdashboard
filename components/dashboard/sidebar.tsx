"use client"

import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Zap,
  Lightbulb,
  SlidersHorizontal,
  BarChart3,
  Bell,
  Settings,
  Plane,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", icon: LayoutDashboard, current: true },
  { name: "Live Bids", icon: Zap, current: false },
  { name: "Bid History", icon: Lightbulb, current: false },
  { name: "Pricing Controls", icon: SlidersHorizontal, current: false },
  { name: "Analytics & Reports", icon: BarChart3, current: false },
  { name: "Alerts", icon: Bell, current: false },
  { name: "Settings", icon: Settings, current: false },
]

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-60 flex-col border-r border-border bg-sidebar">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-4">
        <div className="flex items-center">
          <img
            src="/logos/oji_logo.png"
            alt="OJi"
            className="h-10 w-auto object-contain"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => (
          <button
            key={item.name}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              item.current
                ? "bg-sidebar-accent text-sidebar-primary"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.name}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-4">
        <p className="text-xs text-muted-foreground">
          Pricing Decision Engine v2.4
        </p>
      </div>
    </aside>
  )
}
