"use client"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import AilmentDetails from "@/components/ailment-details"

export default function AilmentPage({ params }: { params: { slug: string } }) {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <AilmentDetails slug={params.slug} />
      <Footer />
    </main>
  )
}
