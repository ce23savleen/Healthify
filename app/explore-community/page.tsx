"use client"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import CommunityFeed from "@/components/community-feed"

export default function ExploreCommunityPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <CommunityFeed />
      <Footer />
    </main>
  )
}
