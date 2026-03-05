"use client"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import AilmentBrowser from "@/components/ailment-browser"

export default function BrowseAilmentsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <AilmentBrowser />
      <Footer />
    </main>
  )
}
