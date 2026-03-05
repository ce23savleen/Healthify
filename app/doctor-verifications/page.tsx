"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, ArrowLeft, CheckCircle, Clock, Filter } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

interface Remedy {
  id: number
  title: string
  ailment: string
  description: string
  author: string
  date: string
  status: "pending" | "approved" | "rejected"
  likes: number
}

export default function DoctorVerificationsPage() {
  const { user, isLoggedIn } = useAuth()
  const router = useRouter()
  const [remedies, setRemedies] = useState<Remedy[]>([])
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "approved" | "rejected">("all")
  const [filterAilment, setFilterAilment] = useState<string>("all")
  const [sortBy, setSortBy] = useState<"recent" | "likes">("recent")

  useEffect(() => {
    if (!isLoggedIn || user?.userType !== "doctor") {
      router.push("/login")
      return
    }

    const savedRemedies = JSON.parse(localStorage.getItem("pendingVerifications") || "[]")
    const approvedRemedies = JSON.parse(localStorage.getItem("approvedRemedies") || "[]")
    const allRemedies = [...savedRemedies, ...approvedRemedies]
    setRemedies(allRemedies)
  }, [isLoggedIn, user, router])

  const filteredRemedies = remedies
    .filter((remedy) => filterStatus === "all" || remedy.status === filterStatus)
    .filter((remedy) => filterAilment === "all" || remedy.ailment === filterAilment)
    .sort((a, b) => {
      if (sortBy === "likes") return b.likes - a.likes
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })

  const ailments = Array.from(new Set(remedies.map((r) => r.ailment)))

  const handleApprove = (id: number) => {
    const remedy = remedies.find((r) => r.id === id)
    if (remedy) {
      const updated = remedies.map((r) => (r.id === id ? { ...r, status: "approved" as const } : r))
      setRemedies(updated)

      const pending = updated.filter((r) => r.status === "pending")
      const approved = updated.filter((r) => r.status === "approved")

      localStorage.setItem("pendingVerifications", JSON.stringify(pending))
      localStorage.setItem("approvedRemedies", JSON.stringify(approved))
    }
  }

  const handleReject = (id: number) => {
    const updated = remedies.filter((r) => r.id !== id)
    setRemedies(updated)

    const pending = updated.filter((r) => r.status === "pending")
    localStorage.setItem("pendingVerifications", JSON.stringify(pending))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-6 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Leaf className="w-6 h-6" />
            <span>Healthyify</span>
          </Link>
          <Link href="/">
            <Button className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent border">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-primary mb-8">Remedy Verifications</h1>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground"
                >
                  <option value="all">All</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
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
                    setFilterStatus("all")
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
                <p className="text-muted-foreground">No remedies to verify with current filters.</p>
              </CardContent>
            </Card>
          ) : (
            filteredRemedies.map((remedy) => (
              <Card key={remedy.id} className="hover:shadow-lg transition">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl mb-2">{remedy.title}</CardTitle>
                      <p className="text-teal-600 font-semibold text-sm">{remedy.ailment}</p>
                    </div>
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1 ${
                        remedy.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : remedy.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {remedy.status === "pending" ? (
                        <>
                          <Clock className="w-3 h-3" />
                          Pending
                        </>
                      ) : remedy.status === "approved" ? (
                        <>
                          <CheckCircle className="w-3 h-3" />
                          Approved
                        </>
                      ) : (
                        "Rejected"
                      )}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground mb-4">{remedy.description}</p>
                  <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
                    <span>By {remedy.author}</span>
                    <span>{remedy.date}</span>
                    <span>{remedy.likes} likes</span>
                  </div>
                  {remedy.status === "pending" && (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleApprove(remedy.id)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleReject(remedy.id)}
                        variant="outline"
                        className="bg-transparent text-red-600 hover:text-red-700"
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
