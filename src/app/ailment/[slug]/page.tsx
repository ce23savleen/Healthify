"use client"

import { use } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import AilmentDetails from "@/components/ailment-details"
import DoctorRouteGuard from "@/components/doctor-route-guard"

export default function AilmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)

  return (
    <DoctorRouteGuard>
      <main className="min-h-screen bg-background">
        <Navigation />
        <AilmentDetails slug={slug} />
        <Footer />
      </main>
    </DoctorRouteGuard>
  )
}
