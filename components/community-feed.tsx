"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2, CheckCircle, AlertCircle } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

type FilterType = "trending" | "new" | "verified"

// Sample community remedies data
const defaultCommunityRemedies = [
  {
    id: 1,
    title: "Ginger Tea for Nausea",
    author: "Dr. Sarah Johnson",
    avatar: "/doctor-avatar.png",
    ailment: "Nausea",
    description:
      "Fresh ginger tea has been proven to reduce nausea effectively. Boil fresh ginger slices in water for 10 minutes and drink warm.",
    steps: [
      "Slice fresh ginger root into thin pieces",
      "Boil water and add ginger slices",
      "Simmer for 10 minutes",
      "Strain and drink warm with honey if desired",
    ],
    likes: 542,
    comments: 23,
    isVerified: true,
    isNew: false,
    timestamp: "2 days ago",
  },
  {
    id: 2,
    title: "Honey and Lemon for Sore Throat",
    author: "Emma Wilson",
    avatar: "/user-avatar.jpg",
    ailment: "Sore Throat",
    description:
      "Mix warm water with honey and fresh lemon juice. This combination soothes the throat and provides relief from pain.",
    steps: [
      "Warm a glass of water (not boiling)",
      "Add 1 tablespoon of raw honey",
      "Squeeze fresh lemon juice",
      "Mix well and drink slowly",
    ],
    likes: 487,
    comments: 18,
    isVerified: false,
    isNew: false,
    timestamp: "3 days ago",
  },
  {
    id: 3,
    title: "Turmeric Milk for Joint Pain",
    author: "Dr. Rajesh Kumar",
    avatar: "/doctor-avatar.png",
    ailment: "Joint Pain",
    description:
      "Golden milk with turmeric and black pepper reduces inflammation. Drink before bed for best results. The curcumin in turmeric is highly effective.",
    steps: [
      "Heat 1 cup of milk",
      "Add 1/2 teaspoon turmeric powder",
      "Add a pinch of black pepper",
      "Stir well and drink warm before bed",
    ],
    likes: 623,
    comments: 31,
    isVerified: true,
    isNew: false,
    timestamp: "1 day ago",
  },
  {
    id: 4,
    title: "Aloe Vera for Skin Irritation",
    author: "Michael Chen",
    avatar: "/user-avatar.jpg",
    ailment: "Skin Irritation",
    description: "Fresh aloe vera gel applied directly to irritated skin provides instant cooling and healing relief.",
    steps: [
      "Extract fresh aloe vera gel from the leaf",
      "Clean the affected area gently",
      "Apply aloe vera gel directly",
      "Leave for 15-20 minutes and rinse",
    ],
    likes: 234,
    comments: 12,
    isVerified: false,
    isNew: true,
    timestamp: "Just now",
  },
  {
    id: 5,
    title: "Apple Cider Vinegar for Digestion",
    author: "Dr. Lisa Anderson",
    avatar: "/doctor-avatar.png",
    ailment: "Indigestion",
    description:
      "One tablespoon of apple cider vinegar in warm water before meals aids digestion and reduces bloating. Clinically proven benefits.",
    steps: [
      "Mix 1 tablespoon of apple cider vinegar in warm water",
      "Add a teaspoon of honey",
      "Drink 15 minutes before meals",
      "Repeat 2-3 times daily",
    ],
    likes: 456,
    comments: 27,
    isVerified: true,
    isNew: false,
    timestamp: "5 hours ago",
  },
  {
    id: 6,
    title: "Peppermint Oil for Headaches",
    author: "James Wilson",
    avatar: "/user-avatar.jpg",
    ailment: "Headache",
    description:
      "Apply diluted peppermint oil to temples and forehead for quick headache relief. Works within 15 minutes.",
    steps: [
      "Dilute peppermint oil with coconut oil (1:3 ratio)",
      "Apply to temples gently",
      "Massage forehead in circular motions",
      "Relax in a quiet place for 15 minutes",
    ],
    likes: 389,
    comments: 19,
    isVerified: false,
    isNew: true,
    timestamp: "2 hours ago",
  },
]

interface Comment {
  id: number
  author: string
  text: string
  timestamp: string
}

export default function CommunityFeed() {
  const { isLoggedIn, user } = useAuth()
  const [filter, setFilter] = useState<FilterType>("trending")
  const [likedRemedies, setLikedRemedies] = useState<number[]>([])
  const [communityRemedies, setCommunityRemedies] = useState(defaultCommunityRemedies)
  const [selectedRemedy, setSelectedRemedy] = useState<(typeof defaultCommunityRemedies)[0] | null>(null)
  const [remedyComments, setRemedyComments] = useState<Record<number, Comment[]>>({})
  const [commentText, setCommentText] = useState("")

  useEffect(() => {
    const userSubmittedRemedies = JSON.parse(localStorage.getItem("userSubmittedRemedies") || "[]")
    if (userSubmittedRemedies.length > 0) {
      setCommunityRemedies([...userSubmittedRemedies, ...defaultCommunityRemedies])
    }
    const savedComments = localStorage.getItem("remedyComments")
    if (savedComments) {
      setRemedyComments(JSON.parse(savedComments))
    }
  }, [])

  const getFilteredRemedies = () => {
    let filtered = [...communityRemedies]

    if (filter === "trending") {
      filtered.sort((a, b) => b.likes - a.likes)
    } else if (filter === "new") {
      filtered.sort((a, b) => {
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

  const toggleLike = (remedyId: number) => {
    setLikedRemedies((prev) => (prev.includes(remedyId) ? prev.filter((id) => id !== remedyId) : [...prev, remedyId]))
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

  return (
    <section className="py-12 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {!selectedRemedy ? (
          <>
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-primary mb-4">Community Feed</h1>
              <p className="text-lg text-muted-foreground">
                Discover the most helpful remedies shared by our community and verified by doctors
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-4 mb-8">
              <Button
                onClick={() => setFilter("trending")}
                className={`${
                  filter === "trending"
                    ? "bg-teal-600 hover:bg-teal-700 text-white"
                    : "bg-card border border-border text-foreground hover:bg-muted"
                }`}
              >
                Trending
              </Button>
              <Button
                onClick={() => setFilter("new")}
                className={`${
                  filter === "new"
                    ? "bg-teal-600 hover:bg-teal-700 text-white"
                    : "bg-card border border-border text-foreground hover:bg-muted"
                }`}
              >
                New
              </Button>
              <Button
                onClick={() => setFilter("verified")}
                className={`${
                  filter === "verified"
                    ? "bg-teal-600 hover:bg-teal-700 text-white"
                    : "bg-card border border-border text-foreground hover:bg-muted"
                }`}
              >
                Verified by Doctors
              </Button>
            </div>

            {/* Remedies Feed */}
            <div className="space-y-6">
              {filteredRemedies.map((remedy) => (
                <Card
                  key={remedy.id}
                  className="hover:shadow-lg transition cursor-pointer"
                  onClick={() => setSelectedRemedy(remedy)}
                >
                  <CardContent className="pt-6">
                    {/* Header with Author Info */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={remedy.avatar || "/placeholder.svg"}
                          alt={remedy.author}
                          className="w-10 h-10 rounded-full bg-muted"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-foreground">{remedy.author}</h3>
                            {remedy.isVerified && <CheckCircle className="w-4 h-4 text-teal-600" />}
                          </div>
                          <p className="text-xs text-muted-foreground">{remedy.timestamp}</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                        {remedy.ailment}
                      </span>
                    </div>

                    {/* Remedy Title and Description */}
                    <h2 className="text-xl font-bold text-foreground mb-2">{remedy.title}</h2>
                    <p className="text-foreground mb-4">{remedy.description}</p>

                    {/* Badges */}
                    <div className="flex gap-2 mb-4">
                      {remedy.isVerified && (
                        <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-semibold">
                          ✓ Doctor Verified
                        </span>
                      )}
                      {remedy.isNew && (
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                          New
                        </span>
                      )}
                    </div>

                    {/* Interaction Buttons */}
                    <div className="flex items-center gap-6 pt-4 border-t border-border">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleLike(remedy.id)
                        }}
                        className="flex items-center gap-2 text-muted-foreground hover:text-teal-600 transition"
                      >
                        <Heart
                          className={`w-5 h-5 ${likedRemedies.includes(remedy.id) ? "fill-teal-600 text-teal-600" : ""}`}
                        />
                        <span className="text-sm">{remedy.likes + (likedRemedies.includes(remedy.id) ? 1 : 0)}</span>
                      </button>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 text-muted-foreground hover:text-teal-600 transition"
                      >
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-sm">{remedy.comments + (remedyComments[remedy.id]?.length || 0)}</span>
                      </button>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 text-muted-foreground hover:text-teal-600 transition"
                      >
                        <Share2 className="w-5 h-5" />
                        <span className="text-sm">Share</span>
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-12">
              <Button size="lg" variant="outline">
                Load More Remedies
              </Button>
            </div>
          </>
        ) : (
          /* Remedy Detail View - Matching Remedy Card Structure */
          <div>
            <Button onClick={() => setSelectedRemedy(null)} variant="outline" className="mb-6">
              ← Back to Feed
            </Button>

            <Card>
              <CardContent className="pt-8">
                {/* Title */}
                <h1 className="text-3xl font-bold text-foreground mb-2">{selectedRemedy.title}</h1>

                {/* Ailment Category */}
                <p className="text-teal-600 font-semibold text-lg mb-4">{selectedRemedy.ailment}</p>

                {/* Author Info */}
                <div className="flex items-center gap-2 mb-6 pb-6 border-b border-border">
                  <span className="text-foreground">
                    By {selectedRemedy.author} • {selectedRemedy.timestamp}
                  </span>
                </div>

                {/* Description Section */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-4">Description</h2>
                  <p className="text-foreground leading-relaxed">{selectedRemedy.description}</p>
                </div>

                {/* Steps Section */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-4">Steps</h2>
                  <div className="space-y-3">
                    {selectedRemedy.steps.map((step, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-semibold text-sm">
                          {index + 1}
                        </div>
                        <p className="text-foreground pt-1">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Important Warning Box */}
                <div className="mb-8 p-4 bg-orange-50 border-l-4 border-orange-500 rounded">
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-orange-900 mb-1">Important:</p>
                      <p className="text-orange-800">
                        This remedy is shared by community members. Always consult with a healthcare professional before
                        trying any new treatment, especially if you have underlying health conditions.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-6 pt-6 border-t border-border mb-8">
                  <button
                    onClick={() => toggleLike(selectedRemedy.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-pink-50 rounded-lg text-muted-foreground hover:text-teal-600 transition"
                  >
                    <Heart
                      className={`w-5 h-5 ${likedRemedies.includes(selectedRemedy.id) ? "fill-teal-600 text-teal-600" : ""}`}
                    />
                    <span className="font-semibold">
                      {selectedRemedy.likes + (likedRemedies.includes(selectedRemedy.id) ? 1 : 0)}
                    </span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-muted-foreground hover:text-teal-600 transition">
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-semibold">
                      {selectedRemedy.comments + (remedyComments[selectedRemedy.id]?.length || 0)} comments
                    </span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-muted-foreground hover:text-teal-600 transition">
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                </div>

                {/* Comments Section */}
                <div className="border-t border-border pt-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Comments</h2>

                  {/* Comment Input */}
                  {isLoggedIn ? (
                    <div className="mb-8">
                      <textarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Share your thoughts..."
                        className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal-600 resize-none"
                        rows={4}
                      />
                      <Button
                        onClick={handlePostComment}
                        disabled={!commentText.trim()}
                        className="mt-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold"
                      >
                        Post Comment
                      </Button>
                    </div>
                  ) : (
                    <p className="text-muted-foreground mb-8">Please log in to post a comment.</p>
                  )}

                  {/* Comments List */}
                  <div className="space-y-4">
                    {(remedyComments[selectedRemedy.id] || []).map((comment) => (
                      <div key={comment.id} className="p-4 bg-muted rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-semibold text-foreground">{comment.author}</p>
                          <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                        </div>
                        <p className="text-foreground">{comment.text}</p>
                      </div>
                    ))}
                    {(!remedyComments[selectedRemedy.id] || remedyComments[selectedRemedy.id].length === 0) && (
                      <p className="text-muted-foreground text-center py-8">
                        No comments yet. Be the first to comment!
                      </p>
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
