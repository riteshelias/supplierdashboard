"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, TrendingDown, TrendingUp, Users, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface FeedItem {
  id: string
  route: string
  message: string
  type: "drop" | "rise" | "new" | "alert"
  time: string
  detail?: string
}

const initialFeed: FeedItem[] = [
  {
    id: "1",
    route: "BOM–DEL",
    message: "Rank dropped to 5",
    type: "drop",
    time: "Just now",
    detail: "₹380 gap",
  },
  {
    id: "2",
    route: "DEL–BLR",
    message: "New bid opened",
    type: "new",
    time: "2m ago",
    detail: "14 competitors",
  },
  {
    id: "3",
    route: "BOM–GOA",
    message: "Now rank 2",
    type: "rise",
    time: "5m ago",
    detail: "↑ from rank 4",
  },
  {
    id: "4",
    route: "DEL–MAA",
    message: "Price war detected",
    type: "alert",
    time: "8m ago",
    detail: "3 competitors cut prices",
  },
  {
    id: "5",
    route: "BLR–HYD",
    message: "Rank improved to 3",
    type: "rise",
    time: "12m ago",
    detail: "↑ from rank 6",
  },
  {
    id: "6",
    route: "MAA–COK",
    message: "Lost to competitor",
    type: "drop",
    time: "15m ago",
    detail: "₹520 gap",
  },
]

const typeConfig = {
  drop: {
    icon: TrendingDown,
    color: "text-danger",
    bg: "bg-danger/10",
  },
  rise: {
    icon: TrendingUp,
    color: "text-success",
    bg: "bg-success/10",
  },
  new: {
    icon: Users,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  alert: {
    icon: AlertCircle,
    color: "text-warning",
    bg: "bg-warning/10",
  },
}

export function LiveFeed() {
  const [feed, setFeed] = useState(initialFeed)
  const [pulse, setPulse] = useState(false)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true)
      setTimeout(() => setPulse(false), 1000)
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
              pulse ? "bg-primary/20" : "bg-primary/10"
            )}>
              <Activity className={cn(
                "h-5 w-5 transition-colors",
                pulse ? "text-primary animate-pulse" : "text-primary"
              )} />
            </div>
            <CardTitle className="text-lg text-foreground">Live Activity</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success"></span>
            </span>
            <span className="text-xs text-muted-foreground">Live</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-1 px-3">
        {feed.map((item, index) => {
          const config = typeConfig[item.type]
          const Icon = config.icon
          return (
            <div
              key={item.id}
              className={cn(
                "flex items-start gap-3 rounded-lg px-3 py-3 transition-all",
                "border border-transparent hover:border-border hover:bg-secondary/30",
                index === 0 && pulse && "bg-secondary/30"
              )}
            >
              <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", config.bg)}>
                <Icon className={cn("h-4 w-4", config.color)} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-semibold text-foreground">{item.route}</span>
                  <span className="text-[11px] text-muted-foreground">{item.time}</span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-foreground/70">{item.message}</p>
                {item.detail && (
                  <span className={cn("mt-1.5 inline-block rounded-md bg-secondary/50 px-2 py-0.5 text-xs font-medium", config.color)}>
                    {item.detail}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
