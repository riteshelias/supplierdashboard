"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, ArrowRight, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface LossData {
  id: string
  logo: string
  route: string
  date: string
  pax: number
  rank: string
  priceGap: number
  winProbability: number
  suggestedAction: string
  uplift: number
  currentMargin: number
  suggestedMargin: number
  expectedBookings: number
}

const lossData: LossData[] = [
  {
    id: "1",
    logo: "/logos/indigo.png",
    route: "BOM–DEL",
    date: "31 Mar",
    pax: 223,
    rank: "142",
    priceGap: 480,
    winProbability: 28,
    suggestedAction: "Reduce margin by 1.5%",
    uplift: 24,
    currentMargin: 8.5,
    suggestedMargin: 6.7,
    expectedBookings: 45,
  },
  {
    id: "2",
    logo: "/logos/indigo.png",
    route: "DEL–BLR",
    date: "31 Mar",
    pax: 153,
    rank: "101",
    priceGap: 120,
    winProbability: 62,
    suggestedAction: "Reduce margin by 1.5%",
    uplift: 24,
    currentMargin: 7.2,
    suggestedMargin: 6.7,
    expectedBookings: 28,
  },
  {
    id: "3",
    logo: "/logos/indigo.png",
    route: "BOM–CCU",
    date: "01 Apr",
    pax: 164,
    rank: "89",
    priceGap: 650,
    winProbability: 18,
    suggestedAction: "Reduce margin by 1.5%",
    uplift: 24,
    currentMargin: 9.1,
    suggestedMargin: 6.7,
    expectedBookings: 62,
  },
  {
    id: "4",
    logo: "/logos/akasa.png",
    route: "BLR-MAA",
    date: "31 Mar",
    pax: 73,
    rank: "47",
    priceGap: 220,
    winProbability: 45,
    suggestedAction: "Reduce margin by 1.0%",
    uplift: 21,
    currentMargin: 7.8,
    suggestedMargin: 6.8,
    expectedBookings: 34,
  },
  {
    id: "5",
    logo: "/logos/akasa.png",
    route: "BLR–HYD",
    date: "02 Apr",
    pax: 60,
    rank: "33",
    priceGap: 380,
    winProbability: 32,
    suggestedAction: "Reduce margin by 1.0%",
    uplift: 21,
    currentMargin: 8.0,
    suggestedMargin: 6.5,
    expectedBookings: 19,
  },
  {
    id: "6",
    logo: "/logos/airindia.png",
    route: "MAA–BOM",
    date: "01 Apr",
    pax: 97,
    rank: "67",
    priceGap: 520,
    winProbability: 22,
    suggestedAction: "Reduce margin by 0.7%",
    uplift: 16,
    currentMargin: 8.8,
    suggestedMargin: 6.7,
    expectedBookings: 41,
  },
  {
    id: "7",
    logo: "/logos/airindia.png",
    route: "CCU–DEL",
    date: "02 Apr",
    pax: 191,
    rank: "104",
    priceGap: 290,
    winProbability: 38,
    suggestedAction: "Reduce margin by 0.7%",
    uplift: 16,
    currentMargin: 7.9,
    suggestedMargin: 6.7,
    expectedBookings: 52,
  },
  {
    id: "8",
    logo: "/logos/airindia.png",
    route: "DEL-CCU",
    date: "31 Mar",
    pax: 153,
    rank: "120",
    priceGap: 85,
    winProbability: 71,
    suggestedAction: "Reduce margin by 0.7%",
    uplift: 16,
    currentMargin: 7.0,
    suggestedMargin: 6.7,
    expectedBookings: 18,
  },
  {
    id: "9",
    logo: "/logos/british.png",
    route: "BOM-LON",
    date: "03 Apr",
    pax: 82,
    rank: "39",
    priceGap: 720,
    winProbability: 15,
    suggestedAction: "Reduce margin by 2.4%",
    uplift: 19,
    currentMargin: 9.5,
    suggestedMargin: 6.7,
    expectedBookings: 38,
  },
  {
    id: "10",
    logo: "/logos/etihad.png",
    route: "DEL–DXB",
    date: "01 Apr",
    pax: 101,
    rank: "49",
    priceGap: 340,
    winProbability: 35,
    suggestedAction: "Reduce margin by 1.9%",
    uplift: 23,
    currentMargin: 8.1,
    suggestedMargin: 6.7,
    expectedBookings: 27,
  },
]

function getProbabilityColor(probability: number) {
  if (probability >= 50) return "bg-success/10 text-success border-success/20"
  if (probability >= 30) return "bg-warning/10 text-warning border-warning/20"
  return "bg-danger/10 text-danger border-danger/20"
}

function getRowHighlight(probability: number) {
  if (probability >= 50) return "hover:bg-success/5"
  if (probability >= 30) return "hover:bg-warning/5"
  return "hover:bg-danger/5"
}

export function LossesTable() {
  const [selectedRow, setSelectedRow] = useState<LossData | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleApply = (row: LossData) => {
    setSelectedRow(row)
    setDialogOpen(true)
  }

  const handleConfirm = () => {
    // In a real app, this would send the pricing change to the backend
    setDialogOpen(false)
    setSelectedRow(null)
  }

  const groupedData = lossData.reduce((acc, row) => {
  if (!acc[row.logo]) {
    acc[row.logo] = []
  }
    acc[row.logo].push(row)
    return acc
  }, {} as Record<string, LossData[]>)

  return (
    <>
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-danger/10">
              <AlertTriangle className="h-5 w-5 text-danger" />
            </div>

            <div>
            <CardTitle className="text-lg text-foreground">
              Where You Are Losing
            </CardTitle>

        {/* 🔥 NEW LINE ADDED HERE */}
          <p className="text-sm text-muted-foreground">
            Today: 01/Apr/2026
          </p>

      <CardDescription className="text-muted-foreground">
        Routes with high recovery potential — take action now
      </CardDescription>
    </div>
  </div>

  <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
    12 opportunities
  </Badge>
</div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="max-h-[600px] overflow-auto">
            <Table className="table-fixed w-full">
              <TableHeader>
                <TableRow className="border-border bg-secondary/30 hover:bg-secondary/30">
                  <TableHead className="w-[80px] text-center">Airline</TableHead>
                  <TableHead className="w-[160px] text-center">Route</TableHead>
                  <TableHead className="w-[80px] text-center">Pax</TableHead>
                  <TableHead className="w-[100px] text-center">Bids</TableHead>
                  <TableHead className="w-[120px] text-center">Price Gap</TableHead>
                  <TableHead className="w-[100px] text-center">Win Prob.</TableHead>
                  <TableHead className="w-[240px]">Suggested Action</TableHead>
                  <TableHead className="w-[120px] text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
  {Object.values(groupedData).map((group) =>
    group.map((row, index) => {
      const isFirstRow = index === 0
      const groupSize = group.length

      return (
        <TableRow
          key={row.id}
          className={cn(
            "transition-colors  border-b-0",
            isFirstRow && "border-t border-gray-300 first:border-t-0",
            getRowHighlight(row.winProbability)
      )}>
          {/* Airline Logo */}
          {isFirstRow && (
            <TableCell
              rowSpan={groupSize}
              className="w-[80px] align-top text-center"
            >
            <div className="flex items-center justify-center h-full">
              <img
                src={row.logo}
                alt="airline"
                className="max-h-[36px] w-auto object-contain opacity-90"
            />
          </div>
          </TableCell>
          )}

          {/* Route */}
          <TableCell className="py-1 text-center font-medium text-foreground w-[160px]">
            {row.route}
          </TableCell>

          {/* Pax */}
          <TableCell className="py-1 text-center text-sm text-foreground/80 w-[80px]">
            {row.pax}
          </TableCell>

          {/* Bids */}
          <TableCell className="py-1 text-center w-[100px]">
            <span className="inline-flex items-center rounded bg-secondary px-2 py-0.5 font-mono text-xs font-medium text-foreground">
              {row.rank}
            </span>
          </TableCell>

          {/* Price Gap */}
          <TableCell className="py-1 text-center w-[120px]">
            <span
              className={cn(
                "font-mono text-sm font-semibold tabular-nums",
                row.priceGap > 400
                  ? "text-danger"
                  : row.priceGap > 200
                  ? "text-warning"
                  : "text-foreground/70"
              )}
            >
              ₹{row.priceGap.toLocaleString("en-IN")}
            </span>
          </TableCell>

          {/* Win Prob */}
          <TableCell className="py-1 text-center w-[100px]">
            <Badge
              variant="outline"
              className={cn(
                "px-2.5 py-1 font-mono text-xs font-semibold",
                getProbabilityColor(row.winProbability)
              )}
            >
              {row.winProbability}%
            </Badge>
          </TableCell>

          {/* Suggested Action (ONLY FIRST ROW) */}
          {isFirstRow && (
          <TableCell
            rowSpan={groupSize}
            className="max-w-[220px] py-1 text-sm text-foreground/70 align-top">
            <div className="flex items-center justify-between gap-2">
              <span>{row.suggestedAction}</span>

              <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-xs font-semibold text-success">
                ↑ +{row.uplift}%
              </span>
            </div>
          </TableCell>
          )}

          {/* Apply Button (ONLY FIRST ROW) */}
          <TableCell className="py-1 text-right w-[120px]">
            {isFirstRow && (
              <Button
                size="sm"
                className="bg-success font-semibold text-success-foreground shadow-sm"
                onClick={() => handleApply(row)}
              >
                <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
                Apply
              </Button>
            )}
          </TableCell>
        </TableRow>
      )
    })
  )}
</TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="border-border bg-card sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-foreground">Confirm Pricing Change</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Review the impact before applying this margin adjustment.
            </DialogDescription>
          </DialogHeader>
          {selectedRow && (
            <div className="space-y-4 py-4">
              <div className="rounded-lg border border-border bg-secondary/50 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Route</span>
                  <span className="font-mono font-semibold text-foreground">{selectedRow.route}</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 rounded-lg border border-border bg-secondary/30 p-3 text-center">
                  <p className="text-xs text-muted-foreground">Current Margin</p>
                  <p className="mt-1 text-xl font-bold text-foreground">{selectedRow.currentMargin}%</p>
                </div>
                <ArrowRight className="h-5 w-5 text-primary" />
                <div className="flex-1 rounded-lg border border-primary/30 bg-primary/5 p-3 text-center">
                  <p className="text-xs text-muted-foreground">New Margin</p>
                  <p className="mt-1 text-xl font-bold text-primary">{selectedRow.suggestedMargin}%</p>
                </div>
              </div>

              <div className="space-y-2 rounded-lg border border-border bg-secondary/30 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Win Probability</span>
                  <span className="text-success">
                    {selectedRow.winProbability}% → {Math.min(selectedRow.winProbability + 18, 95)}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Expected Bookings</span>
                  <span className="font-medium text-foreground">+{selectedRow.expectedBookings} this week</span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleConfirm} 
              className="bg-success font-semibold text-success-foreground shadow-md shadow-success/25 hover:bg-success/90 hover:shadow-lg hover:shadow-success/30"
            >
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Confirm & Apply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
