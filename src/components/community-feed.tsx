"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, MessageCircle, Share2, CheckCircle, AlertCircle, TrendingUp, Sparkles, ShieldCheck, Flame, Clock, ArrowRight, BookOpen } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import type { RemedyRecord } from "@/types/remedy"

type FilterType = "trending" | "new" | "verified"

interface CommunityRemedy {
  id: number
  title: string
  author: string
  avatar: string
  ailment: string
  image: string
  description: string
  steps: string[]
  likes: number
  comments: number
  endorsements: number
  isVerified: boolean
  isNew: boolean
  timestamp: string
  createdAt: string
}

interface CommunityFeedProps {
  initialRemedies?: RemedyRecord[]
}

function toStableNumericId(value: string): number {
  let hash = 0

  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0
  }

  return Math.abs(hash) || 1
}

function toDisplayDate(isoDate: string): string {
  const parsed = new Date(isoDate)
  if (Number.isNaN(parsed.getTime())) {
    return "Unknown date"
  }

  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

function toRemedyImage(remedy: RemedyRecord): string {
  const titleLower = `${remedy.title} ${remedy.description}`.toLowerCase()
  const imageMap: Record<string, string> = {
    ginger: "/remedy-ginger-tea.png",
    honey: "/remedy-honey-lemon.png",
    turmeric: "/remedy-turmeric-milk.png",
    aloe: "/remedy-aloe-vera-skin.png",
    peppermint: "/remedy-peppermint-oil.png",
    mint: "/remedy-peppermint-oil.png",
    vinegar: "/remedy-apple-cider.png",
  }

  return Object.entries(imageMap).find(([key]) => titleLower.includes(key))?.[1] || "/herbs-and-natural-remedies-on-table.jpg"
}

function mapRemedyRecordToCommunityRemedy(remedy: RemedyRecord): CommunityRemedy {
  const createdAt = new Date(remedy.createdAt)
  const hoursSinceCreated = (Date.now() - createdAt.getTime()) / (1000 * 60 * 60)

  return {
    id: toStableNumericId(remedy.id),
    title: remedy.title,
    author: remedy.authorName,
    avatar: "/placeholder-user.jpg",
    ailment: remedy.ailment,
    image: toRemedyImage(remedy),
    description: remedy.description,
    steps: remedy.steps,
    likes: remedy.likes,
    comments: 0,
    endorsements: remedy.endorsements,
    isVerified: remedy.endorsements > 0,
    isNew: Number.isFinite(hoursSinceCreated) ? hoursSinceCreated <= 24 : false,
    timestamp: toDisplayDate(remedy.createdAt),
    createdAt: remedy.createdAt,
  }
}

interface Comment {
  id: number
  author: string
  text: string
  timestamp: string
}

export default function CommunityFeed({ initialRemedies = [] }: CommunityFeedProps) {
  const { isLoggedIn, user } = useAuth()
  const [filter, setFilter] = useState<FilterType>("new")
  const [userRatings, setUserRatings] = useState<Record<number, number>>({})
  const [hoveredStar, setHoveredStar] = useState<{ remedyId: number; star: number } | null>(null)
  const mappedInitialRemedies = initialRemedies.map((remedy) => mapRemedyRecordToCommunityRemedy(remedy))
  const communityRemedies = mappedInitialRemedies
  const [selectedRemedy, setSelectedRemedy] = useState<CommunityRemedy | null>(null)
  const [remedyComments, setRemedyComments] = useState<Record<number, Comment[]>>({})
  const [commentText, setCommentText] = useState("")

  useEffect(() => {
    const savedComments = localStorage.getItem("remedyComments")
    if (savedComments) {
      setRemedyComments(JSON.parse(savedComments))
    }
  }, [])

  const getFilteredRemedies = (): CommunityRemedy[] => {
    let filtered = [...communityRemedies]

    if (filter === "trending") {
      filtered.sort((a, b) => b.likes - a.likes)
    } else if (filter === "new") {
      filtered.sort((a, b) => {
        const aDate = a.createdAt ? new Date(a.createdAt).getTime() : 0
        const bDate = b.createdAt ? new Date(b.createdAt).getTime() : 0

        if (aDate > 0 && bDate > 0) {
          return bDate - aDate
        }

        const timeOrder: Record<string, number> = {
          "Just now": 0,
          "2 hours ago": 1,
          "5 hours ago": 2,
          "1 day ago": 3,
          "2 days ago": 4,
          "3 days ago": 5,
        }
        return (
          (timeOrder[a.timestamp as keyof typeof timeOrder] || 999) -
          (timeOrder[b.timestamp as keyof typeof timeOrder] || 999)
        )
      })
    } else if (filter === "verified") {
      filtered = filtered.filter((r) => r.isVerified)
      filtered.sort((a, b) => b.likes - a.likes)
    }

    return filtered
  }

  const handleRate = (remedyId: number, rating: number) => {
    setUserRatings((prev) => ({ ...prev, [remedyId]: rating }))
  }

  const getAverageRating = (remedy: { likes: number }, remedyId: number): number => {
    const baseRating = Math.min(5, Math.max(3.0, 3.0 + (remedy.likes / 250)))
    const userRating = userRatings[remedyId]
    if (userRating) {
      return Math.round(((baseRating + userRating) / 2) * 10) / 10
    }
    return Math.round(baseRating * 10) / 10
  }

  const handlePostComment = () => {
    if (!commentText.trim() || !selectedRemedy || !isLoggedIn) return

    const newComment: Comment = {
      id: Date.now(),
      author: user?.name || "Anonymous",
      text: commentText,
      timestamp: "Just now",
    }

    const updatedComments = {
      ...remedyComments,
      [selectedRemedy.id]: [...(remedyComments[selectedRemedy.id] || []), newComment],
    }

    setRemedyComments(updatedComments)
    localStorage.setItem("remedyComments", JSON.stringify(updatedComments))
    setCommentText("")
  }

  const filteredRemedies = getFilteredRemedies()

  const filters = [
    { key: "trending" as FilterType, label: "Trending", icon: <TrendingUp className="w-4 h-4" /> },
    { key: "new" as FilterType, label: "New", icon: <Sparkles className="w-4 h-4" /> },
    { key: "verified" as FilterType, label: "Verified by Doctors", icon: <ShieldCheck className="w-4 h-4" /> },
  ]

  return (
    <section className="py-16 min-h-screen" style={{ background: "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 30%, #f0f9ff 60%, #f0fdf4 100%)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {!selectedRemedy ? (
          <>
            {/* Hero Header */}
            <div className="relative mb-12 rounded-2xl overflow-hidden" style={{
              background: "linear-gradient(135deg, #064e3b 0%, #047857 40%, #059669 70%, #0d9488 100%)"
            }}>
              {/* Decorative Elements */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-10 -right-10 w-60 h-60 rounded-full opacity-10" style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }} />
                <div className="absolute -bottom-20 -left-10 w-80 h-80 rounded-full opacity-10" style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }} />
                <div className="absolute top-1/2 right-1/4 w-32 h-32 rounded-full opacity-5" style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }} />
              </div>

              <div className="relative px-8 py-12 md:px-12 md:py-16">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm">
                    <Flame className="w-5 h-5 text-amber-300" />
                  </div>
                  <span className="text-emerald-200 text-sm font-medium tracking-wide uppercase">Community Powered</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ letterSpacing: "-0.02em" }}>
                  Community Feed
                </h1>
                <p className="text-lg text-emerald-100/80 max-w-2xl leading-relaxed">
                  Discover the most helpful natural remedies shared by our community and verified by trusted healthcare professionals
                </p>

                {/* Stats Row */}
                <div className="flex flex-wrap gap-6 mt-8">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-emerald-200" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">2,400+</p>
                      <p className="text-emerald-200/60 text-xs">Remedies</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4 text-emerald-200" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">850+</p>
                      <p className="text-emerald-200/60 text-xs">Doctor Verified</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                      <Star className="w-4 h-4 text-emerald-200" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">4.5★</p>
                      <p className="text-emerald-200/60 text-xs">Avg Rating</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-3 mb-10 flex-wrap">
              {filters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300"
                  style={
                    filter === f.key
                      ? {
                        background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
                        color: "white",
                        boxShadow: "0 4px 14px rgba(5, 150, 105, 0.4)",
                        transform: "translateY(-1px)",
                      }
                      : {
                        background: "rgba(255,255,255,0.8)",
                        color: "#064e3b",
                        border: "1px solid #d1fae5",
                        backdropFilter: "blur(8px)",
                      }
                  }
                >
                  {f.icon}
                  {f.label}
                </button>
              ))}
            </div>

            {/* Remedies Feed — Modern Cards with Images */}
            {communityRemedies.length === 0 ? (
              <Card>
                <CardContent className="py-10 text-center">
                  <p className="text-muted-foreground">No community remedies shared yet. Be the first!</p>
                </CardContent>
              </Card>
            ) : filteredRemedies.length === 0 ? (
              <Card>
                <CardContent className="py-10 text-center">
                  <p className="text-muted-foreground">No remedies match the selected filter.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {filteredRemedies.map((remedy, index) => (
                <Card
                  key={remedy.id}
                  className="group overflow-hidden border-0 cursor-pointer"
                  onClick={() => setSelectedRemedy(remedy)}
                  style={{
                    background: "rgba(255,255,255,0.85)",
                    backdropFilter: "blur(12px)",
                    borderRadius: "1rem",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
                    transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    animationDelay: `${index * 80}ms`,
                    animation: "fadeInUp 0.6s ease forwards",
                    opacity: 0,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 8px 30px rgba(5, 150, 105, 0.15), 0 4px 12px rgba(0,0,0,0.08)"
                    e.currentTarget.style.transform = "translateY(-4px)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)"
                    e.currentTarget.style.transform = "translateY(0)"
                  }}
                >
                  {/* Remedy Image */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={remedy.image || "/placeholder.svg"}
                      alt={remedy.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0" style={{
                      background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)"
                    }} />

                    {/* Ailment Badge - on image */}
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1.5 rounded-full text-xs font-bold text-white backdrop-blur-md" style={{
                        background: "rgba(5, 150, 105, 0.85)",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
                      }}>
                        {remedy.ailment}
                      </span>
                    </div>

                    {/* Badges on image */}
                    <div className="absolute bottom-3 left-3 flex gap-2">
                      {remedy.isVerified && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold text-white backdrop-blur-md" style={{
                          background: "rgba(13, 148, 136, 0.85)",
                        }}>
                          <CheckCircle className="w-3 h-3" />
                          Verified
                        </span>
                      )}
                      {remedy.isNew && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold text-white backdrop-blur-md" style={{
                          background: "rgba(245, 158, 11, 0.85)",
                        }}>
                          <Sparkles className="w-3 h-3" />
                          New
                        </span>
                      )}
                    </div>
                  </div>

                  <CardContent className="p-5">
                    {/* Header with Author Info */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-emerald-100 shrink-0">
                        <img
                          src={remedy.avatar || "/placeholder-user.jpg"}
                          alt={remedy.author}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-semibold text-foreground text-sm truncate">{remedy.author}</h3>
                          {remedy.isVerified && <CheckCircle className="w-3.5 h-3.5 text-teal-600 shrink-0" />}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {remedy.timestamp}
                        </div>
                      </div>
                    </div>

                    {/* Remedy Title */}
                    <h2 className="text-lg font-bold text-foreground mb-2 group-hover:text-teal-700 transition-colors duration-300 line-clamp-2">{remedy.title}</h2>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">{remedy.description}</p>

                    {/* Interaction Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-emerald-100/60">
                      <div className="flex items-center gap-5">
                        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                          {[1, 2, 3, 4, 5].map((star) => {
                            const avg = getAverageRating(remedy, remedy.id)
                            const hovered = hoveredStar?.remedyId === remedy.id ? hoveredStar.star : 0
                            const displayRating = hovered || userRatings[remedy.id] || avg
                            const filled = star <= Math.round(displayRating)
                            return (
                              <button
                                key={star}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleRate(remedy.id, star)
                                }}
                                onMouseEnter={() => setHoveredStar({ remedyId: remedy.id, star })}
                                onMouseLeave={() => setHoveredStar(null)}
                                className="transition-all duration-200 hover:scale-125 cursor-pointer p-0 border-0 bg-transparent"
                              >
                                <Star
                                  className={`w-4 h-4 transition-colors duration-200 ${
                                    filled ? "fill-amber-400 text-amber-400" : "text-gray-300"
                                  }`}
                                />
                              </button>
                            )
                          })}
                          <span className="text-sm font-medium text-slate-500 ml-0.5">
                            {getAverageRating(remedy, remedy.id).toFixed(1)}
                          </span>
                        </div>
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-teal-600 transition-all duration-300"
                        >
                          <MessageCircle className="w-4.5 h-4.5" />
                          <span className="font-medium">{remedy.comments + (remedyComments[remedy.id]?.length || 0)}</span>
                        </button>
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <ShieldCheck className="w-4 h-4" />
                          <span className="font-medium">{remedy.endorsements}</span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-teal-600 transition-all duration-300"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
                ))}
              </div>
            )}

            {/* Load More Button */}
            {communityRemedies.length > 0 && filteredRemedies.length > 0 && (
              <div className="text-center mt-14">
              <button
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-teal-700 transition-all duration-300 hover:gap-4"
                style={{
                  background: "rgba(255,255,255,0.8)",
                  border: "2px solid #d1fae5",
                  backdropFilter: "blur(8px)",
                  boxShadow: "0 2px 8px rgba(5, 150, 105, 0.1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "linear-gradient(135deg, #059669, #047857)"
                  e.currentTarget.style.color = "white"
                  e.currentTarget.style.borderColor = "transparent"
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(5, 150, 105, 0.35)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.8)"
                  e.currentTarget.style.color = "#047857"
                  e.currentTarget.style.borderColor = "#d1fae5"
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(5, 150, 105, 0.1)"
                }}
              >
                Load More Remedies
                <ArrowRight className="w-4 h-4" />
              </button>
              </div>
            )}
          </>
        ) : (
          /* Remedy Detail View */
          <div className="max-w-3xl mx-auto" style={{ animation: "fadeInUp 0.5s ease forwards" }}>
            <button
              onClick={() => setSelectedRemedy(null)}
              className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 rounded-full text-sm font-semibold text-teal-700 transition-all duration-300 hover:gap-3"
              style={{
                background: "rgba(255,255,255,0.8)",
                border: "1px solid #d1fae5",
                backdropFilter: "blur(8px)",
              }}
            >
              ← Back to Feed
            </button>

            <Card className="overflow-hidden border-0" style={{
              background: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(12px)",
              borderRadius: "1.25rem",
              boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            }}>
              {/* Detail Image */}
              <div className="relative h-72 md:h-96 overflow-hidden">
                <img
                  src={selectedRemedy.image || "/placeholder.svg"}
                  alt={selectedRemedy.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{
                  background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)"
                }} />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex gap-2 mb-3">
                    <span className="px-3 py-1.5 rounded-full text-xs font-bold text-white backdrop-blur-md" style={{
                      background: "rgba(5, 150, 105, 0.85)",
                    }}>
                      {selectedRemedy.ailment}
                    </span>
                    {selectedRemedy.isVerified && (
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold text-white backdrop-blur-md" style={{
                        background: "rgba(13, 148, 136, 0.85)",
                      }}>
                        <CheckCircle className="w-3 h-3" />
                        Doctor Verified
                      </span>
                    )}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>
                    {selectedRemedy.title}
                  </h1>
                </div>
              </div>

              <CardContent className="p-6 md:p-8">
                {/* Author Info */}
                <div className="flex items-center gap-3 mb-8 pb-6 border-b border-emerald-100">
                  <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-emerald-200">
                    <img src={selectedRemedy.avatar || "/placeholder-user.jpg"} alt={selectedRemedy.author} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">{selectedRemedy.author}</span>
                      {selectedRemedy.isVerified && <CheckCircle className="w-4 h-4 text-teal-600" />}
                    </div>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {selectedRemedy.timestamp}
                    </span>
                    <span className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <ShieldCheck className="w-3 h-3" />
                      {selectedRemedy.endorsements} endorsements
                    </span>
                  </div>
                </div>

                {/* Description Section */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 rounded-full bg-teal-500" />
                    Description
                  </h2>
                  <p className="text-foreground leading-relaxed text-[15px]">{selectedRemedy.description}</p>
                </div>

                {/* Steps Section */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 rounded-full bg-teal-500" />
                    How to Prepare
                  </h2>
                  <div className="space-y-3">
                    {selectedRemedy.steps.map((step, index) => (
                      <div key={index} className="flex items-start gap-4 p-3 rounded-xl transition-colors hover:bg-emerald-50/60">
                        <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm text-white" style={{
                          background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
                          boxShadow: "0 2px 6px rgba(5, 150, 105, 0.3)"
                        }}>
                          {index + 1}
                        </div>
                        <p className="text-foreground pt-1 text-[15px]">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Important Warning Box */}
                <div className="mb-8 p-5 rounded-xl" style={{
                  background: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)",
                  border: "1px solid #fde68a",
                }}>
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-amber-900 mb-1">Important Disclaimer</p>
                      <p className="text-amber-800 text-sm leading-relaxed">
                        This remedy is shared by community members. Always consult with a healthcare professional before
                        trying any new treatment, especially if you have underlying health conditions.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4 pt-6 border-t border-emerald-100 mb-8">
                  <div className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl" style={{
                    background: "#fffbeb",
                    border: "1px solid #fde68a",
                  }}>
                    {[1, 2, 3, 4, 5].map((star) => {
                      const avg = getAverageRating(selectedRemedy, selectedRemedy.id)
                      const hovered = hoveredStar?.remedyId === selectedRemedy.id ? hoveredStar.star : 0
                      const displayRating = hovered || userRatings[selectedRemedy.id] || avg
                      const filled = star <= Math.round(displayRating)
                      return (
                        <button
                          key={star}
                          onClick={() => handleRate(selectedRemedy.id, star)}
                          onMouseEnter={() => setHoveredStar({ remedyId: selectedRemedy.id, star })}
                          onMouseLeave={() => setHoveredStar(null)}
                          className="transition-all duration-200 hover:scale-125 cursor-pointer p-0 border-0 bg-transparent"
                        >
                          <Star
                            className={`w-5 h-5 transition-colors duration-200 ${
                              filled ? "fill-amber-400 text-amber-400" : "text-gray-300"
                            }`}
                          />
                        </button>
                      )
                    })}
                    <span className="text-sm font-semibold text-slate-500 ml-1">
                      {getAverageRating(selectedRemedy, selectedRemedy.id).toFixed(1)}
                    </span>
                  </div>
                  <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-muted-foreground transition-all duration-300" style={{
                    background: "#f3f4f6",
                    border: "1px solid #e5e7eb",
                  }}>
                    <MessageCircle className="w-5 h-5" />
                    {selectedRemedy.comments + (remedyComments[selectedRemedy.id]?.length || 0)} comments
                  </button>
                  <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-muted-foreground transition-all duration-300" style={{
                    background: "#f3f4f6",
                    border: "1px solid #e5e7eb",
                  }}>
                    <Share2 className="w-5 h-5" />
                    Share
                  </button>
                </div>

                {/* Comments Section */}
                <div className="border-t border-emerald-100 pt-8">
                  <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <div className="w-1 h-6 rounded-full bg-teal-500" />
                    Comments
                  </h2>

                  {/* Comment Input */}
                  {isLoggedIn ? (
                    <div className="mb-8">
                      <textarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Share your experience or thoughts..."
                        className="w-full px-4 py-3 rounded-xl border border-emerald-200 bg-emerald-50/30 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none transition-all duration-300"
                        rows={4}
                      />
                      <Button
                        onClick={handlePostComment}
                        disabled={!commentText.trim()}
                        className="mt-3 rounded-xl font-semibold text-white"
                        style={{
                          background: commentText.trim() ? "linear-gradient(135deg, #059669 0%, #047857 100%)" : "#d1d5db",
                          boxShadow: commentText.trim() ? "0 4px 12px rgba(5, 150, 105, 0.3)" : "none"
                        }}
                      >
                        Post Comment
                      </Button>
                    </div>
                  ) : (
                    <div className="mb-8 p-4 rounded-xl text-center" style={{ background: "#f0fdf4", border: "1px dashed #86efac" }}>
                      <p className="text-muted-foreground">Please log in to post a comment.</p>
                    </div>
                  )}

                  {/* Comments List */}
                  <div className="space-y-4">
                    {(remedyComments[selectedRemedy.id] || []).map((comment) => (
                      <div key={comment.id} className="p-4 rounded-xl" style={{ background: "#f0fdf4", border: "1px solid #d1fae5" }}>
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-semibold text-foreground text-sm">{comment.author}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {comment.timestamp}
                          </p>
                        </div>
                        <p className="text-foreground text-sm leading-relaxed">{comment.text}</p>
                      </div>
                    ))}
                    {(!remedyComments[selectedRemedy.id] || remedyComments[selectedRemedy.id].length === 0) && (
                      <div className="text-center py-10">
                        <MessageCircle className="w-10 h-10 text-emerald-200 mx-auto mb-3" />
                        <p className="text-muted-foreground">
                          No comments yet. Be the first to comment!
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  )
}
