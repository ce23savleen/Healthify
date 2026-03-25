"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, ArrowLeft, CheckCircle, Clock, Filter, ShieldCheck, BadgeCheck } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import mockAilmentsData from "@/data/mockAilmentsData"

interface Remedy {
  id: number
  title: string
  ailment: string
  description: string
  author: string
  date: string
  likes: number
  verifiedBy: string[]
}

export default function DoctorVerificationsPage() {
  const { user, isLoggedIn } = useAuth()
  const router = useRouter()
  const [remedies, setRemedies] = useState<Remedy[]>([])
  const [feedFilter, setFeedFilter] = useState<"pending" | "endorsed" | "all">("pending")
  const [filterAilment, setFilterAilment] = useState<string>("all")
  const [sortBy, setSortBy] = useState<"recent" | "likes">("recent")

  const currentDoctorId = user?.id || ""

  useEffect(() => {
    if (!isLoggedIn || user?.userType !== "doctor") {
      router.push("/login")
      return
    }

    // Load remedies from mock data + localStorage
    const allRemedies: Remedy[] = []

    // Pull from mockAilmentsData
    Object.values(mockAilmentsData).forEach((ailment) => {
      ailment.remedies.forEach((r) => {
        allRemedies.push({
          id: r.id,
          title: r.title,
          ailment: ailment.name,
          description: r.description,
          author: r.author,
          date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
          likes: r.likes,
          verifiedBy: [...r.verifiedBy],
        })
      })
    })

    // Also load from localStorage (user-submitted)
    const savedRemedies = JSON.parse(localStorage.getItem("pendingVerifications") || "[]")
    savedRemedies.forEach((r: any) => {
      allRemedies.push({
        ...r,
        verifiedBy: r.verifiedBy || [],
      })
    })

    setRemedies(allRemedies)
  }, [isLoggedIn, user, router])

  // Filter logic: "Pending" = doctor's ID NOT in verifiedBy
  const filteredRemedies = remedies
    .filter((remedy) => {
      if (feedFilter === "pending") return !remedy.verifiedBy.includes(currentDoctorId)
      if (feedFilter === "endorsed") return remedy.verifiedBy.includes(currentDoctorId)
      return true
    })
    .filter((remedy) => filterAilment === "all" || remedy.ailment === filterAilment)
    .sort((a, b) => {
      if (sortBy === "likes") return b.likes - a.likes
      return 0 // default order
    })

  const ailments = Array.from(new Set(remedies.map((r) => r.ailment)))

  const handleEndorse = (id: number) => {
    setRemedies((prev) =>
      prev.map((r) =>
        r.id === id && !r.verifiedBy.includes(currentDoctorId)
          ? { ...r, verifiedBy: [...r.verifiedBy, currentDoctorId] }
          : r
      )
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-primary mb-2">Remedy Verifications</h1>
        <p className="text-muted-foreground mb-8">
          Review and endorse community-submitted remedies to build trust and credibility.
        </p>

        {/* Feed Tabs */}
        <div className="flex gap-3 mb-6">
          {(["pending", "endorsed", "all"] as const).map((tab) => (
            <Button
              key={tab}
              onClick={() => setFeedFilter(tab)}
              className={`${
                feedFilter === tab
                  ? "bg-teal-600 hover:bg-teal-700 text-white"
                  : "bg-card border border-border text-foreground hover:bg-muted"
              }`}
            >
              {tab === "pending" ? "⏳ Pending Review" : tab === "endorsed" ? "✓ Endorsed by You" : "All Remedies"}
            </Button>
          ))}
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Ailment</label>
                <select
                  value={filterAilment}
                  onChange={(e) => setFilterAilment(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground"
                >
                  <option value="all">All Ailments</option>
                  {ailments.map((ailment) => (
                    <option key={ailment} value={ailment}>
                      {ailment}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground"
                >
                  <option value="recent">Most Recent</option>
                  <option value="likes">Most Liked</option>
                </select>
              </div>
              <div className="flex items-end">
                <Button
                  onClick={() => {
                    setFilterAilment("all")
                    setSortBy("recent")
                  }}
                  variant="outline"
                  className="w-full bg-transparent"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Remedies List */}
        <div className="space-y-6">
          {filteredRemedies.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground">
                  {feedFilter === "pending"
                    ? "No remedies awaiting your review. You've endorsed everything!"
                    : "No remedies match current filters."}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredRemedies.map((remedy) => {
              const endorsed = remedy.verifiedBy.includes(currentDoctorId)
              const count = remedy.verifiedBy.length

              return (
                <Card key={remedy.id} className="hover:shadow-lg transition">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl mb-2">{remedy.title}</CardTitle>
                        <p className="text-teal-600 font-semibold text-sm">{remedy.ailment}</p>
                      </div>
                      {/* Verification badge */}
                      {count >= 3 ? (
                        <span className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 text-emerald-700 border border-emerald-300 rounded-full text-xs font-bold whitespace-nowrap shadow-sm">
                          <ShieldCheck className="w-4 h-4" />
                          Verified by {count} Professionals
                        </span>
                      ) : count >= 1 ? (
                        <span className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 border border-blue-200 rounded-full text-xs font-semibold whitespace-nowrap">
                          <BadgeCheck className="w-3.5 h-3.5" />
                          {count} Endorsement{count > 1 ? "s" : ""}
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-full text-xs font-semibold whitespace-nowrap">
                          <Clock className="w-3.5 h-3.5" />
                          Awaiting Review
                        </span>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground mb-4">{remedy.description}</p>
                    <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
                      <span>By {remedy.author}</span>
                      <span>{remedy.date}</span>
                      <span>{remedy.likes} likes</span>
                    </div>
                    <div className="flex gap-3">
                      {endorsed ? (
                        <Button disabled className="bg-emerald-100 text-emerald-700 cursor-default hover:bg-emerald-100">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          ✓ You endorsed this
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleEndorse(remedy.id)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white"
                        >
                          +1 Endorse this Remedy
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}
