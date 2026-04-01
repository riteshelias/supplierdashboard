"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lightbulb, TrendingUp, Clock, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const recommendations = [
  {
    id: "1",
    title: "Reduce margin by 1.2% on BOM–DEL",
    description: "Increase win rate from 28% to 58%",
    impact: "High Impact",
    impactType: "high",
    metric: "+₹2.4L revenue",
    icon: TrendingUp,
    logo: "/logos/indigo.png",
  },
  {
    id: "2",
    title: "Evening flights underperforming by 22%",
    description: "Consider dynamic pricing for 6PM–10PM slots",
    impact: "Medium Impact",
    impactType: "medium",
    metric: "12 routes affected",
    icon: Clock,
    logo: "/logos/airindia.png",
  },
  {
    id: "3",
    title: "BLR routes showing price sensitivity",
    description: "Small margin cuts could boost volume significantly",
    impact: "High Impact",
    impactType: "high",
    metric: "+85 bookings/week",
    icon: Lightbulb,
    logo: "/logos/akasa.png",
  },
]

export function RecommendedActions() {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Lightbulb className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-lg text-foreground">
            Recommended Actions
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="group rounded-lg border border-border bg-secondary/30 p-4 transition-colors hover:border-primary/30 hover:bg-secondary/50"
          >
            <div className="flex items-start justify-between gap-4">

              {/* LEFT CONTENT */}
              <div className="flex items-start gap-3 flex-1">
                
                {/* ICON */}
                <div
                  className={cn(
                    "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                    rec.impactType === "high"
                      ? "bg-success/10"
                      : "bg-warning/10"
                  )}
                >
                  <rec.icon
                    className={cn(
                      "h-4 w-4",
                      rec.impactType === "high"
                        ? "text-success"
                        : "text-warning"
                    )}
                  />
                </div>

                {/* TEXT */}
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {rec.title}
                  </p>

                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {rec.description}
                  </p>

                  <div className="mt-2 flex items-center gap-3">
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-xs font-medium",
                        rec.impactType === "high"
                          ? "bg-success/10 text-success"
                          : "bg-warning/10 text-warning"
                      )}
                    >
                      {rec.impact}
                    </span>

                    <span className="text-xs text-muted-foreground">
                      {rec.metric}
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE (LOGO + BUTTON) */}
              <div className="flex items-center gap-2 shrink-0">

                {/* LOGO */}
                {rec.logo && (
                  <img
                    src={rec.logo}
                    alt="airline logo"
                    className="h-8 w-auto object-contain opacity-70 group-hover:opacity-100 transition"
                  />
                )}

                {/* ACTION BUTTON */}
                <Button
                  size="sm"
                  variant="ghost"
                  className="opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>

              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}