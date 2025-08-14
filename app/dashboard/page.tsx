"use client"

import { RealDashboard } from "@/components/real-dashboard"
import { GatedAccessChecker } from "@/components/gated-access-checker"

export default function DashboardPage() {
  return (
    <GatedAccessChecker requiredTier={1} requiredLevel={1}>
      <RealDashboard />
    </GatedAccessChecker>
  )
}
