"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2, Calendar, User } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

const ayurvedicBlogs = [
  {
    id: 1,
    title: "Understanding Doshas: The Foundation of Ayurveda",
    author: "Dr. Rajesh Kumar",
    date: "Oct 20, 2025",
    category: "Ayurveda Basics",
    image: "/ayurveda-doshas-vata-pitta-kapha.jpg",
    excerpt:
      "Learn about the three fundamental doshas in Ayurveda - Vata, Pitta, and Kapha - and how they influence your health and personality.",
    content:
      "The three doshas are the fundamental energies that govern all biological and psychological functions in the body. Vata represents movement and space, Pitta represents transformation and fire, while Kapha represents structure and stability. Understanding your unique dosha constitution is the first step towards achieving optimal health through Ayurvedic practices.",
    likes: 234,
    comments: 18,
  },
  {
    id: 2,
    title: "Seasonal Eating According to Ayurveda",
    author: "Dr. Priya Sharma",
    date: "Oct 18, 2025",
    category: "Nutrition",
    image: "/ayurvedic-seasonal-foods-diet.jpg",
    excerpt: "Discover how to align your diet with the seasons to maintain balance and prevent seasonal ailments.",
    content:
      "Ayurveda teaches us that eating seasonally is crucial for maintaining health. In spring, favor light and warming foods. Summer calls for cooling foods like coconut and cucumber. Autumn requires grounding foods, while winter needs warming and nourishing meals. This seasonal approach helps your body adapt naturally to environmental changes.",
    likes: 189,
    comments: 12,
  },
  {
    id: 3,
    title: "The Power of Turmeric: Golden Spice of Health",
    author: "Dr. Amit Patel",
    date: "Oct 15, 2025",
    category: "Herbal Remedies",
    image: "/turmeric-golden-milk-ayurveda-health.jpg",
    excerpt:
      "Explore the incredible healing properties of turmeric and how to incorporate it into your daily wellness routine.",
    content:
      "Turmeric, known as the golden spice, has been used in Ayurveda for thousands of years. Its active compound, curcumin, has powerful anti-inflammatory and antioxidant properties. From golden milk to turmeric-infused foods, this versatile spice can help reduce inflammation, boost immunity, and support overall wellness.",
    likes: 456,
    comments: 34,
  },
  {
    id: 4,
    title: "Ayurvedic Daily Routine (Dinacharya) for Optimal Health",
    author: "Dr. Neha Gupta",
    date: "Oct 12, 2025",
    category: "Lifestyle",
    image: "/ayurvedic-daily-routine-morning-ritual.jpg",
    excerpt:
      "Master the ancient practice of Dinacharya to establish a healthy daily routine that supports your natural rhythms.",
    content:
      "Dinacharya, or daily routine, is a cornerstone of Ayurvedic wellness. It includes practices like oil massage, tongue scraping, meditation, and yoga. By following a consistent daily routine aligned with your dosha, you can improve digestion, boost energy, enhance mental clarity, and prevent disease.",
    likes: 312,
    comments: 25,
  },
  {
    id: 5,
    title: "Meditation and Pranayama: Breathing Life into Wellness",
    author: "Dr. Vikram Singh",
    date: "Oct 10, 2025",
    category: "Mind-Body",
    image: "/pranayama-meditation-breathing-yoga.jpg",
    excerpt:
      "Learn how pranayama and meditation can balance your mind, body, and spirit according to Ayurvedic principles.",
    content:
      "Pranayama, the practice of controlled breathing, is fundamental to Ayurvedic wellness. Different breathing techniques balance different doshas. Meditation calms the mind and reduces stress. Together, these practices enhance mental clarity, emotional balance, and spiritual growth.",
    likes: 278,
    comments: 21,
  },
  {
    id: 6,
    title: "Detoxification Through Ayurvedic Panchakarma",
    author: "Dr. Anjali Verma",
    date: "Oct 8, 2025",
    category: "Detox",
    image: "/panchakarma-ayurvedic-detox-cleanse.jpg",
    excerpt:
      "Understand the ancient detoxification therapy of Panchakarma and how it can rejuvenate your body and mind.",
    content:
      "Panchakarma is a comprehensive detoxification and rejuvenation therapy in Ayurveda. It includes five main procedures designed to eliminate toxins and restore balance. This powerful treatment can help reset your system, improve digestion, boost immunity, and promote longevity.",
    likes: 389,
    comments: 28,
  },
]

interface Comment {
  id: number
  author: string
  text: string
  timestamp: string
}

export default function BlogsPage() {
  const { isLoggedIn, user } = useAuth()
  const [selectedBlog, setSelectedBlog] = useState<(typeof ayurvedicBlogs)[0] | null>(null)
  const [likedBlogs, setLikedBlogs] = useState<number[]>([])
  const [filter, setFilter] = useState<string>("all")
  const [blogComments, setBlogComments] = useState<Record<number, Comment[]>>({})
  const [commentText, setCommentText] = useState("")

  useEffect(() => {
    const savedComments = localStorage.getItem("blogComments")
    if (savedComments) {
      setBlogComments(JSON.parse(savedComments))
    }
  }, [])

  const categories = ["all", ...new Set(ayurvedicBlogs.map((blog) => blog.category))]

  const filteredBlogs = filter === "all" ? ayurvedicBlogs : ayurvedicBlogs.filter((blog) => blog.category === filter)

  const toggleLike = (blogId: number) => {
    setLikedBlogs((prev) => (prev.includes(blogId) ? prev.filter((id) => id !== blogId) : [...prev, blogId]))
  }

  const handlePostComment = () => {
    if (!commentText.trim() || !selectedBlog || !isLoggedIn) return

    const newComment: Comment = {
      id: Date.now(),
      author: user?.name || "Anonymous",
      text: commentText,
      timestamp: "Just now",
    }

    const updatedComments = {
      ...blogComments,
      [selectedBlog.id]: [...(blogComments[selectedBlog.id] || []), newComment],
    }

    setBlogComments(updatedComments)
    localStorage.setItem("blogComments", JSON.stringify(updatedComments))
    setCommentText("")
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!selectedBlog ? (
          <>
            {/* Header */}
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-primary mb-4">Ayurvedic Wellness Blog</h1>
              <p className="text-lg text-muted-foreground">
                Discover ancient wisdom and modern insights on natural health and wellness
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex gap-3 mb-8 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`${
                    filter === category
                      ? "bg-teal-600 hover:bg-teal-700 text-white"
                      : "bg-card border border-border text-foreground hover:bg-muted"
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div>

            {/* Blogs Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.map((blog) => (
                <Card
                  key={blog.id}
                  className="hover:shadow-lg transition cursor-pointer overflow-hidden"
                  onClick={() => setSelectedBlog(blog)}
                >
                  {/* Blog Image */}
                  <div className="h-48 overflow-hidden bg-muted">
                    <img
                      src={blog.image || "/placeholder.svg"}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <CardContent className="pt-6">
                    {/* Category Badge */}
                    <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-semibold mb-3">
                      {blog.category}
                    </span>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">{blog.title}</h3>

                    {/* Excerpt */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{blog.excerpt}</p>

                    {/* Author and Date */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4 pb-4 border-b border-border">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {blog.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {blog.date}
                      </div>
                    </div>

                    {/* Engagement Stats */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleLike(blog.id)
                        }}
                        className="flex items-center gap-1 hover:text-teal-600 transition"
                      >
                        <Heart
                          className={`w-4 h-4 ${likedBlogs.includes(blog.id) ? "fill-teal-600 text-teal-600" : ""}`}
                        />
                        {blog.likes + (likedBlogs.includes(blog.id) ? 1 : 0)}
                      </button>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        {blog.comments + (blogComments[blog.id]?.length || 0)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          /* Blog Detail View */
          <div className="max-w-3xl mx-auto">
            <Button onClick={() => setSelectedBlog(null)} variant="outline" className="mb-6">
              ← Back to Blogs
            </Button>

            <Card>
              {/* Blog Image */}
              <div className="h-96 overflow-hidden bg-muted">
                <img
                  src={selectedBlog.image || "/placeholder.svg"}
                  alt={selectedBlog.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <CardContent className="pt-8">
                {/* Category and Meta */}
                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-border">
                  <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold">
                    {selectedBlog.category}
                  </span>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <User className="w-4 h-4" />
                    {selectedBlog.author}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {selectedBlog.date}
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-4xl font-bold text-foreground mb-6">{selectedBlog.title}</h1>

                {/* Content */}
                <p className="text-lg text-foreground leading-relaxed mb-8">{selectedBlog.content}</p>

                {/* Engagement */}
                <div className="flex items-center gap-6 pt-6 border-t border-border mb-8">
                  <button
                    onClick={() => toggleLike(selectedBlog.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-pink-50 rounded-lg text-muted-foreground hover:text-teal-600 transition"
                  >
                    <Heart
                      className={`w-5 h-5 ${likedBlogs.includes(selectedBlog.id) ? "fill-teal-600 text-teal-600" : ""}`}
                    />
                    <span className="font-semibold">
                      {selectedBlog.likes + (likedBlogs.includes(selectedBlog.id) ? 1 : 0)}
                    </span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-muted-foreground hover:text-teal-600 transition">
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-semibold">
                      {selectedBlog.comments + (blogComments[selectedBlog.id]?.length || 0)} comments
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
                    {(blogComments[selectedBlog.id] || []).map((comment) => (
                      <div key={comment.id} className="p-4 bg-muted rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-semibold text-foreground">{comment.author}</p>
                          <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                        </div>
                        <p className="text-foreground">{comment.text}</p>
                      </div>
                    ))}
                    {(!blogComments[selectedBlog.id] || blogComments[selectedBlog.id].length === 0) && (
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
    </div>
  )
}
