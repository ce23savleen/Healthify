"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2, Bookmark, AlertCircle, X } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import ailmentDetailsData from "@/data/ailment-details"
import remediesData from "@/data/remedies"

export default function AilmentDetails({ slug }: { slug: string }) {
  const { isLoggedIn } = useAuth()
  const [likedRemedies, setLikedRemedies] = useState<number[]>([])
  const [savedRemedies, setSavedRemedies] = useState<number[]>([])
  const [showCommentForm, setShowCommentForm] = useState<number | null>(null)
  const [comments, setComments] = useState<Record<number, Array<{ text: string; author: string }>>>({})
  const [commentText, setCommentText] = useState("")
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [showNotification, setShowNotification] = useState<{ type: string; message: string } | null>(null)
  const [selectedRemedy, setSelectedRemedy] = useState<any>(null)
  const [userSubmittedRemedies, setUserSubmittedRemedies] = useState<any[]>([])

  const ailmentKey = slug.toLowerCase().replace(/-/g, "-")
  const ailment = ailmentDetailsData[ailmentKey] || ailmentDetailsData.acne

  useEffect(() => {
    const submitted = JSON.parse(localStorage.getItem("userSubmittedRemedies") || "[]")
    const filtered = submitted.filter((remedy: any) => remedy.ailment.toLowerCase() === ailment.name.toLowerCase())
    setUserSubmittedRemedies(filtered)
  }, [ailment.name])

  const defaultRemedies = remediesData[ailmentKey] || remediesData.acne
  const allRemedies = [...defaultRemedies, ...userSubmittedRemedies]
  const remedies = allRemedies.sort((a, b) => b.likes - a.likes)

  useEffect(() => {
    const saved = localStorage.getItem("savedRemedies")
    if (saved) {
      setSavedRemedies(JSON.parse(saved))
    }
  }, [])

  const handleProtectedAction = (action: () => void) => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true)
      return
    }
    action()
  }

  const toggleLike = (remedyId: number) => {
    handleProtectedAction(() => {
      setLikedRemedies((prev) => {
        const updated = prev.includes(remedyId) ? prev.filter((id) => id !== remedyId) : [...prev, remedyId]
        if (!prev.includes(remedyId)) {
          showSuccessNotification("Remedy liked successfully")
        }
        return updated
      })
    })
  }

  const toggleSaveRemedy = (remedyId: number, remedyTitle: string) => {
    handleProtectedAction(() => {
      setSavedRemedies((prev) => {
        const updated = prev.includes(remedyId) ? prev.filter((id) => id !== remedyId) : [...prev, remedyId]
        localStorage.setItem("savedRemedies", JSON.stringify(updated))
        if (!prev.includes(remedyId)) {
          localStorage.setItem(
            `remedy_${remedyId}`,
            JSON.stringify({
              id: remedyId,
              title: remedyTitle,
              ailment: ailment.name,
              author: remedies.find((r) => r.id === remedyId)?.author || "Unknown",
              date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
            }),
          )
          showSuccessNotification("Remedy saved successfully")
        }
        return updated
      })
    })
  }

  const handleAddComment = (remedyId: number) => {
    handleProtectedAction(() => {
      if (commentText.trim()) {
        setComments((prev) => ({
          ...prev,
          [remedyId]: [...(prev[remedyId] || []), { text: commentText, author: "You" }],
        }))
        setCommentText("")
        setShowCommentForm(null)
      }
    })
  }

  const handleShare = (remedyTitle: string) => {
    handleProtectedAction(() => {
      const shareText = `Check out this remedy: "${remedyTitle}" on Healthyify - Discover trusted natural health remedies!`

      if (navigator.share) {
        navigator
          .share({
            title: "Healthyify Remedy",
            text: shareText,
            url: window.location.href,
          })
          .catch(() => {})
      } else {
        navigator.clipboard.writeText(shareText)
        showSuccessNotification("Remedy link copied to clipboard!")
      }
    })
  }

  const showSuccessNotification = (message: string) => {
    setShowNotification({ type: "success", message })
    setTimeout(() => setShowNotification(null), 3000)
  }

  return (
    <section className="py-12 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Ailment Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">{ailment.name}</h1>
          <p className="text-lg text-muted-foreground">{ailment.description}</p>
        </div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Causes */}
          <Card>
            <CardHeader>
              <CardTitle>Causes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {ailment.causes.map((cause: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-teal-600 font-bold">•</span>
                    <span className="text-foreground">{cause}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Symptoms */}
          <Card>
            <CardHeader>
              <CardTitle>Symptoms</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {ailment.symptoms.map((symptom: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-teal-600 font-bold">•</span>
                    <span className="text-foreground">{symptom}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Prevention */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Prevention</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {ailment.prevention.map((method: string, idx: number) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                  <span className="text-teal-600 font-bold">✓</span>
                  <span className="text-foreground">{method}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div>
          <h2 className="text-2xl font-bold text-primary mb-6">Recommended Remedies</h2>
          <div className="space-y-6">
            {remedies.map((remedy) => (
              <Card
                key={remedy.id}
                className="hover:shadow-lg transition cursor-pointer"
                onClick={() => setSelectedRemedy(remedy)}
              >
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-foreground mb-2">{remedy.title}</h3>
                    <p className="text-teal-600 font-semibold text-sm">{ailment.name}</p>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <span>By {remedy.author}</span>
                    <span>•</span>
                    <span>
                      {new Date().toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" })}
                    </span>
                  </div>

                  <p className="text-foreground text-sm line-clamp-2 mb-4">{remedy.description}</p>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleLike(remedy.id)
                      }}
                      className={`flex items-center gap-2 px-3 py-1 rounded text-sm font-semibold transition ${
                        likedRemedies.includes(remedy.id)
                          ? "bg-red-500 text-white"
                          : "bg-red-100 text-red-600 hover:bg-red-200"
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${likedRemedies.includes(remedy.id) ? "fill-current" : ""}`} />
                      <span>{remedy.likes + (likedRemedies.includes(remedy.id) ? 1 : 0)}</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleSaveRemedy(remedy.id, remedy.title)
                      }}
                      className={`flex items-center gap-2 px-3 py-1 rounded text-sm font-semibold transition ${
                        savedRemedies.includes(remedy.id)
                          ? "bg-teal-100 text-teal-600"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${savedRemedies.includes(remedy.id) ? "fill-current" : ""}`} />
                      <span>Save</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleProtectedAction(() =>
                          setShowCommentForm(showCommentForm === remedy.id ? null : remedy.id),
                        )
                      }}
                      className="flex items-center gap-2 px-3 py-1 rounded text-sm font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{comments[remedy.id]?.length || 0}</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleShare(remedy.title)
                      }}
                      className="flex items-center gap-2 px-3 py-1 rounded text-sm font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Add Remedy Button */}
          <div className="mt-8 text-center">
            <Link href="/share-remedy">
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
                Share Your Remedy
              </Button>
            </Link>
          </div>
        </div>

        {selectedRemedy && (
          <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <button
                onClick={() => setSelectedRemedy(null)}
                className="mb-6 flex items-center gap-2 text-teal-600 hover:text-teal-700 font-semibold"
              >
                <X className="w-5 h-5" />
                Back
              </button>

              <Card>
                <CardHeader className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-3xl mb-2">{selectedRemedy.title}</CardTitle>
                    <p className="text-teal-600 font-semibold">{ailment.name}</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Author and Date */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground pb-6 border-b border-border">
                    <span>By {selectedRemedy.author}</span>
                    <span>•</span>
                    <span>
                      {new Date().toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" })}
                    </span>
                  </div>

                  {/* Description */}
                  <div>
                    <h4 className="text-lg font-bold text-foreground mb-2">Description</h4>
                    <p className="text-foreground">{selectedRemedy.description}</p>
                  </div>

                  {/* Steps */}
                  <div>
                    <h4 className="text-lg font-bold text-foreground mb-3">Steps</h4>
                    <div className="space-y-3">
                      {[1, 2, 3].map((step) => (
                        <div key={step} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                            {step}
                          </div>
                          <p className="text-foreground pt-1">Step {step} of the remedy preparation</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Important Disclaimer */}
                  <div className="p-4 border-l-4 border-orange-500 bg-orange-50 rounded">
                    <div className="flex gap-3">
                      <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-orange-900 text-sm">Important:</p>
                        <p className="text-orange-800 text-sm">
                          This remedy is shared by community members. Always consult with a healthcare professional
                          before trying any new treatment, especially if you have underlying health conditions.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-4 pb-6 border-b border-border">
                    <button
                      onClick={() => toggleLike(selectedRemedy.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
                        likedRemedies.includes(selectedRemedy.id)
                          ? "bg-red-500 text-white"
                          : "bg-red-100 text-red-600 hover:bg-red-200"
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${likedRemedies.includes(selectedRemedy.id) ? "fill-current" : ""}`} />
                      <span>{selectedRemedy.likes + (likedRemedies.includes(selectedRemedy.id) ? 1 : 0)}</span>
                    </button>

                    <button
                      onClick={() => toggleSaveRemedy(selectedRemedy.id, selectedRemedy.title)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
                        savedRemedies.includes(selectedRemedy.id)
                          ? "bg-teal-100 text-teal-600"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      <Bookmark
                        className={`w-5 h-5 ${savedRemedies.includes(selectedRemedy.id) ? "fill-current" : ""}`}
                      />
                      <span>Save</span>
                    </button>

                    <button
                      onClick={() =>
                        handleProtectedAction(() =>
                          setShowCommentForm(showCommentForm === selectedRemedy.id ? null : selectedRemedy.id),
                        )
                      }
                      className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>{comments[selectedRemedy.id]?.length || 0} comments</span>
                    </button>

                    <button
                      onClick={() => handleShare(selectedRemedy.title)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
                    >
                      <Share2 className="w-5 h-5" />
                      <span>Share</span>
                    </button>
                  </div>

                  {/* Comments Section */}
                  <div>
                    <h4 className="text-lg font-bold text-foreground mb-4">Comments</h4>

                    <div className="mb-6">
                      <textarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Share your thoughts..."
                        className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal-600 mb-3"
                        rows={3}
                      />
                      <Button
                        onClick={() => handleAddComment(selectedRemedy.id)}
                        className="bg-teal-600 hover:bg-teal-700"
                      >
                        Post Comment
                      </Button>
                    </div>

                    {comments[selectedRemedy.id] && comments[selectedRemedy.id].length > 0 && (
                      <div className="space-y-3">
                        {comments[selectedRemedy.id].map((comment, idx) => (
                          <div key={idx} className="p-3 bg-muted rounded-lg">
                            <p className="text-sm font-semibold text-foreground">{comment.author}</p>
                            <p className="text-sm text-muted-foreground mt-1">{comment.text}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {showLoginPrompt && (
          <div className="fixed right-4 bottom-4 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded-lg shadow-lg z-50 max-w-sm">
            <p className="font-semibold mb-2">Please log in first</p>
            <p className="text-sm mb-3">You need to be logged in to perform this action.</p>
            <div className="flex gap-2">
              <Link href="/login">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Login
                </Button>
              </Link>
              <Button size="sm" variant="outline" onClick={() => setShowLoginPrompt(false)} className="bg-transparent">
                Dismiss
              </Button>
            </div>
          </div>
        )}

        {showNotification && (
          <div className="fixed right-4 bottom-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-lg z-50">
            <p className="font-semibold">{showNotification.message}</p>
          </div>
        )}
      </div>
    </section>
  )
}
