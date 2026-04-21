"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CheckCircle, Clock, Filter, ShieldCheck, BadgeCheck, Eye } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import type { EndorseRemedyRequest, RemedyApiError, RemedyRecord, RemediesApiResponse } from "@/types/remedy"

type FeedFilter = "pending" | "endorsed" | "all"
type SortBy = "recent" | "likes"

export default function DoctorVerificationsPage() {
  const { user, isLoggedIn } = useAuth()
  const router = useRouter()
  const [remedies, setRemedies] = useState<RemedyRecord[]>([])
  const [feedFilter, setFeedFilter] = useState<FeedFilter>("pending")
  const [filterAilment, setFilterAilment] = useState<string>("all")
  const [sortBy, setSortBy] = useState<SortBy>("recent")
  const [isLoading, setIsLoading] = useState(false)
  const [loadingError, setLoadingError] = useState<string | null>(null)
  const [selectedRemedy, setSelectedRemedy] = useState<RemedyRecord | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isSubmittingId, setIsSubmittingId] = useState<string | null>(null)

  const currentDoctorId = user?.id || ""

  useEffect(() => {
    if (!isLoggedIn || user?.userType !== "doctor") {
      router.push("/login")
      return
    }

    const fetchRemedies = async () => {
      setIsLoading(true)
      setLoadingError(null)

      try {
        const response = await fetch("/api/remedies?verificationRequested=true", { cache: "no-store" })

        if (!response.ok) {
          throw new Error("Unable to load remedies for verification")
        }

        const data = (await response.json()) as RemediesApiResponse
        setRemedies(data.remedies)
      } catch (error) {
        console.error("Failed to load remedies for doctor verification", error)
        setLoadingError("Unable to load remedies right now. Please refresh and try again.")
      } finally {
        setIsLoading(false)
      }
    }

    void fetchRemedies()
  }, [isLoggedIn, user, router])

  const ailments = useMemo(() => Array.from(new Set(remedies.map((remedy) => remedy.ailment))).sort((a, b) => a.localeCompare(b)), [remedies])

  const filteredRemedies = useMemo(() => {
    return remedies
      .filter((remedy) => {
        if (feedFilter === "pending") {
          return !remedy.endorsedBy.includes(currentDoctorId)
        }

        if (feedFilter === "endorsed") {
          return remedy.endorsedBy.includes(currentDoctorId)
        }

        return true
      })
      .filter((remedy) => filterAilment === "all" || remedy.ailment === filterAilment)
      .sort((a, b) => {
        if (sortBy === "likes") {
          return b.likes - a.likes
        }

        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })
  }, [currentDoctorId, feedFilter, filterAilment, remedies, sortBy])

  const openDetails = (remedy: RemedyRecord) => {
    setSelectedRemedy(remedy)
    setIsDetailOpen(true)
  }

  const handleEndorse = async (remedyId: string) => {
    if (!currentDoctorId) {
      return
    }

    setIsSubmittingId(remedyId)

    try {
      const payload: EndorseRemedyRequest = {
        doctorId: currentDoctorId,
      }

      const response = await fetch(`/api/remedies/${remedyId}/endorse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok && response.status !== 409) {
        const apiError = (await response.json().catch(() => null)) as RemedyApiError | null
        throw new Error(apiError?.error || "Unable to endorse remedy")
      }

      const data = (await response.json()) as { remedy?: RemedyRecord }
      if (!data.remedy) {
        throw new Error("Unexpected response while endorsing remedy")
      }

      setRemedies((prevRemedies) =>
        prevRemedies.map((remedy) => (remedy.id === remedyId ? data.remedy as RemedyRecord : remedy))
      )

      setSelectedRemedy((prevRemedy) =>
        prevRemedy && prevRemedy.id === remedyId ? (data.remedy as RemedyRecord) : prevRemedy
      )
    } catch (error) {
      console.error("Failed to endorse remedy", error)
      alert(error instanceof Error ? error.message : "Unable to endorse remedy")
    } finally {
      setIsSubmittingId(null)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-primary mb-2">Remedy Verifications</h1>
        <p className="text-muted-foreground mb-8">
          Review each full submission before endorsing community remedies.
        </p>

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
              {tab === "pending" ? "Pending Review" : tab === "endorsed" ? "Endorsed by You" : "All Remedies"}
            </Button>
          ))}
        </div>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Ailment</label>
                <select
                  value={filterAilment}
                  onChange={(event) => setFilterAilment(event.target.value)}
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
                  onChange={(event) => setSortBy(event.target.value as SortBy)}
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

        <div className="space-y-6">
          {isLoading && (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">Loading remedies for review...</CardContent>
            </Card>
          )}

          {!isLoading && loadingError && (
            <Card>
              <CardContent className="pt-6 text-center text-red-600">{loadingError}</CardContent>
            </Card>
          )}

          {!isLoading && !loadingError && filteredRemedies.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground">
                  {feedFilter === "pending"
                    ? "No remedies awaiting your review."
                    : "No remedies match your current filters."}
                </p>
              </CardContent>
            </Card>
          ) : null}

          {!isLoading &&
            !loadingError &&
            filteredRemedies.map((remedy) => {
              const endorsed = remedy.endorsedBy.includes(currentDoctorId)
              const count = remedy.endorsedBy.length

              return (
                <Card key={remedy.id} className="hover:shadow-lg transition">
                  <CardHeader>
                    <div className="flex justify-between items-start gap-3">
                      <div>
                        <CardTitle className="text-xl mb-2">{remedy.title}</CardTitle>
                        <p className="text-teal-600 font-semibold text-sm">{remedy.ailment}</p>
                      </div>
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
                    <p
                      className="text-foreground mb-4"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {remedy.description}
                    </p>

                    <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
                      <span>By {remedy.authorName}</span>
                      <span>{new Date(remedy.createdAt).toLocaleDateString()}</span>
                      <span>{remedy.likes} likes</span>
                    </div>

                    <Button onClick={() => openDetails(remedy)} className="bg-teal-600 hover:bg-teal-700 text-white">
                      <Eye className="w-4 h-4 mr-2" />
                      Read Full Submission
                    </Button>

                    {endorsed && (
                      <p className="text-xs text-emerald-700 mt-3 font-medium">You already endorsed this remedy.</p>
                    )}
                  </CardContent>
                </Card>
              )
            })}
        </div>
      </div>

      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="sm:max-w-2xl">
          {selectedRemedy && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedRemedy.title}</DialogTitle>
                <DialogDescription>
                  {selectedRemedy.ailment} by {selectedRemedy.authorName}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                <div>
                  <h3 className="font-semibold mb-1">Full Description</h3>
                  <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">{selectedRemedy.description}</p>
                </div>

                {selectedRemedy.steps.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-1">Steps</h3>
                    <ol className="list-decimal pl-5 space-y-1">
                      {selectedRemedy.steps.map((step, index) => (
                        <li key={`${selectedRemedy.id}-step-${index}`} className="text-sm text-foreground leading-relaxed">
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                <div className="text-sm text-muted-foreground">
                  Endorsements: <span className="font-semibold text-foreground">{selectedRemedy.endorsements}</span>
                </div>
              </div>

              <DialogFooter>
                {selectedRemedy.endorsedBy.includes(currentDoctorId) ? (
                  <Button disabled className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Endorsed
                  </Button>
                ) : (
                  <Button
                    onClick={() => void handleEndorse(selectedRemedy.id)}
                    disabled={isSubmittingId === selectedRemedy.id}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    {isSubmittingId === selectedRemedy.id ? "Endorsing..." : "Endorse Remedy"}
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </main>
  )
}
