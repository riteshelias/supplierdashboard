"use client"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Target, IndianRupee, Trophy, RefreshCw } from "lucide-react"

const kpis = [
  {
    title: "Participated Bids Today",
    value: "1,250",
    subline1: "₹1.87 Cr.",
    change: "+12%",
    trend: "up",
    icon: Target,
    description: "vs yesterday",
  },
  {
    title: "Win Rate Today",
    value: "14%",
    subLine1: "175 Bids",
    subLine2: "₹26.25 Lacs",
    change: "+3.2%",
    trend: "up",
    icon: Trophy,
    description: "based on participated",
  },
  {
    title: "Bids Lost Today",
    value: "86%",
    subLine1: "1,075 Bids",
    subLine2: "₹1.61 Cr.",
    change: "-₹45",
    trend: "down",
    icon: IndianRupee,
    description: "improving",
  },
  {
    title: "Potential Bids Tomorrow",
    value: "1,850 Bids",
    change: "this week",
    trend: "neutral",
    icon: RefreshCw,
    description: "actionable opportunities",
  },
]

export function KPICards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi) => (
        <Card key={kpi.title} className="border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                <kpi.icon className="h-5 w-5 text-primary" />
              </div>
              {kpi.trend !== "neutral" && (
                <div
                  className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                    kpi.trend === "up"
                      ? "bg-success/15 text-success"
                      : "bg-danger/15 text-danger"
                  }`}
                >
                  {kpi.trend === "up" ? (
                    <TrendingUp className="h-3.5 w-3.5" />
                  ) : (
                    <TrendingDown className="h-3.5 w-3.5" />
                  )}
                  {kpi.change}
                </div>
              )}
              {kpi.trend === "neutral" && (
                <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground">{kpi.change}</span>
              )}
            </div>
            <div className="mt-4">
              <div className="text-left">
            <p className="mt-1 text-sm font-medium text-foreground/80">{kpi.title}</p>
            <p className="text-2xl font-semibold text-foreground">{kpi.value}</p>

            {(kpi.subLine1 || kpi.subLine2) && (
                <div className="mt-1 text-xl text-muted-foreground space-y-0.5">
            {kpi.subLine1 && <p>{kpi.subLine1}</p>}
            {kpi.subLine2 && <p>{kpi.subLine2}</p>}
            </div>
            )}
            </div>
              
            </div>
            <p className="mt-3 text-xs text-muted-foreground">{kpi.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
