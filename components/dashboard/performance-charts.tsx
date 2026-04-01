"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  Legend,
} from "recharts"

const winRateData = [
  { day: "24 Mar", rate: 38, target: 45 },
  { day: "25 Mar", rate: 40, target: 45 },
  { day: "26 Mar", rate: 37, target: 45 },
  { day: "27 Mar", rate: 42, target: 45 },
  { day: "28 Mar", rate: 39, target: 45 },
  { day: "29 Mar", rate: 44, target: 45 },
  { day: "30 Mar", rate: 42, target: 45 },
]

const priceGapData = [
  { day: "24 Mar", gap: 420, avg: 350 },
  { day: "25 Mar", gap: 380, avg: 350 },
  { day: "26 Mar", gap: 450, avg: 350 },
  { day: "27 Mar", gap: 390, avg: 350 },
  { day: "28 Mar", gap: 340, avg: 350 },
  { day: "29 Mar", gap: 310, avg: 350 },
  { day: "30 Mar", gap: 320, avg: 350 },
]

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload) return null
  return (
    <div className="rounded-lg border border-border bg-popover p-3 shadow-lg">
      <p className="mb-2 text-sm font-medium text-foreground">{label}</p>
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2 text-sm">
          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-muted-foreground">{entry.name}:</span>
          <span className="font-medium text-foreground">
            {entry.name.includes("Gap") ? `₹${entry.value}` : `${entry.value}%`}
          </span>
        </div>
      ))}
    </div>
  )
}

export function PerformanceCharts() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Win Rate Chart */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base text-foreground">Win Rate Trend</CardTitle>
              <CardDescription className="text-muted-foreground">
                Last 7 days performance
              </CardDescription>
            </div>
            <Tabs defaultValue="7d" className="w-auto">
              <TabsList className="h-8 bg-secondary">
                <TabsTrigger value="7d" className="h-6 px-2 text-xs">7D</TabsTrigger>
                <TabsTrigger value="30d" className="h-6 px-2 text-xs">30D</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="h-[160px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={winRateData}>
                <defs>
                  <linearGradient id="winRateGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.75 0.15 175)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="oklch(0.75 0.15 175)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0.01 260)" vertical={false} />
                <XAxis
                  dataKey="day"
                  tick={{ fill: "oklch(0.65 0 0)", fontSize: 11 }}
                  axisLine={{ stroke: "oklch(0.28 0.01 260)" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "oklch(0.65 0 0)", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  domain={[30, 50]}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="rate"
                  name="Win Rate"
                  stroke="oklch(0.75 0.15 175)"
                  strokeWidth={2}
                  fill="url(#winRateGradient)"
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  name="Target"
                  stroke="oklch(0.65 0 0)"
                  strokeWidth={1}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex items-center justify-center gap-6 text-xs">
            <div className="flex items-center gap-2">
              <div className="h-2 w-4 rounded bg-primary" />
              <span className="text-muted-foreground">Win Rate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-0.5 w-4 border-t border-dashed border-muted-foreground" />
              <span className="text-muted-foreground">Target (45%)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Price Gap Chart */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base text-foreground">Avg Price Gap Trend</CardTitle>
              <CardDescription className="text-muted-foreground">
                Gap to winning bid
              </CardDescription>
            </div>
            <Tabs defaultValue="7d" className="w-auto">
              <TabsList className="h-8 bg-secondary">
                <TabsTrigger value="7d" className="h-6 px-2 text-xs">7D</TabsTrigger>
                <TabsTrigger value="30d" className="h-6 px-2 text-xs">30D</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="h-[160px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={priceGapData}>
                <defs>
                  <linearGradient id="priceGapGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.8 0.16 85)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="oklch(0.8 0.16 85)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0.01 260)" vertical={false} />
                <XAxis
                  dataKey="day"
                  tick={{ fill: "oklch(0.65 0 0)", fontSize: 11 }}
                  axisLine={{ stroke: "oklch(0.28 0.01 260)" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "oklch(0.65 0 0)", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  domain={[200, 500]}
                  tickFormatter={(value) => `₹${value}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="gap"
                  name="Avg Gap"
                  stroke="oklch(0.8 0.16 85)"
                  strokeWidth={2}
                  fill="url(#priceGapGradient)"
                />
                <Line
                  type="monotone"
                  dataKey="avg"
                  name="Target Gap"
                  stroke="oklch(0.65 0 0)"
                  strokeWidth={1}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex items-center justify-center gap-6 text-xs">
            <div className="flex items-center gap-2">
              <div className="h-2 w-4 rounded bg-warning" />
              <span className="text-muted-foreground">Avg Gap</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-0.5 w-4 border-t border-dashed border-muted-foreground" />
              <span className="text-muted-foreground">Target (₹350)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
