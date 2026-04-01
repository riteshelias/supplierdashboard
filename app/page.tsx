import { Sidebar } from "@/components/dashboard/sidebar"
import { Topbar } from "@/components/dashboard/topbar"
import { KPICards } from "@/components/dashboard/kpi-cards"
import { LossesTable } from "@/components/dashboard/losses-table"
import { RecommendedActions } from "@/components/dashboard/recommended-actions"
import { LiveFeed } from "@/components/dashboard/live-feed"
import { PerformanceCharts } from "@/components/dashboard/performance-charts"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="pl-60">
        {/* Top bar */}
        <Topbar />

        {/* Dashboard content */}
        <main className="p-6">
          {/* KPI Cards Row */}
          <section className="mb-6">
            <KPICards />
          </section>

          {/* Primary Table - Full Width Dominant */}
          <section className="mb-6">
            <LossesTable />
          </section>

          {/* Secondary content grid */}
          <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
            {/* Left column - Actions and compact charts */}
            <div className="space-y-6">
              {/* Recommended Actions */}
              <RecommendedActions />

              {/* Performance Charts - Compact */}
              <PerformanceCharts />
            </div>

            {/* Right column - Live Feed */}
            <div>
              <LiveFeed />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
