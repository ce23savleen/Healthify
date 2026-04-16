"use client"
import { Suspense } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import AilmentBrowser from "@/components/ailment-browser"

export default function BrowseAilmentsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Suspense fallback={<div className="min-h-[60vh]" />}>
        <AilmentBrowser />
      </Suspense>
      <Footer />
    </main>
  )
}
