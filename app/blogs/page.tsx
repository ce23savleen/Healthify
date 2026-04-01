"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2, Calendar, User, Clock, ArrowLeft, BookOpen, Feather, TrendingUp } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

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
    readTime: "5 min read",
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
    readTime: "4 min read",
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
    readTime: "6 min read",
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
    readTime: "7 min read",
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
    readTime: "5 min read",
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
    readTime: "8 min read",
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

  const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
    "Ayurveda Basics": { bg: "#ecfdf5", text: "#047857", border: "#a7f3d0" },
    "Nutrition": { bg: "#fefce8", text: "#a16207", border: "#fde68a" },
    "Herbal Remedies": { bg: "#fef2f2", text: "#b91c1c", border: "#fecaca" },
    "Lifestyle": { bg: "#eff6ff", text: "#1d4ed8", border: "#bfdbfe" },
    "Mind-Body": { bg: "#faf5ff", text: "#7c3aed", border: "#ddd6fe" },
    "Detox": { bg: "#fff7ed", text: "#c2410c", border: "#fed7aa" },
  }

  return (
    <main className="min-h-screen" style={{ background: "#f8fdf9" }}>
      <Navigation />
      
      {/* Background Section with Image */}
      <div className="relative">
        {!selectedBlog && (
          <>
            {/* Hero with Background Image */}
            <div className="relative overflow-hidden" style={{ minHeight: "380px" }}>
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src="/blog-ayurveda-background.png"
                  alt=""
                  className="w-full h-full object-cover"
                  style={{ filter: "blur(1px)" }}
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0" style={{
                  background: "linear-gradient(135deg, rgba(6, 78, 59, 0.88) 0%, rgba(4, 120, 87, 0.82) 40%, rgba(5, 150, 105, 0.78) 70%, rgba(13, 148, 136, 0.82) 100%)"
                }} />
              </div>
              
              {/* Decorative Light Effects */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10" style={{
                  background: "radial-gradient(circle, white 0%, transparent 60%)"
                }} />
                <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full opacity-5" style={{
                  background: "radial-gradient(circle, white 0%, transparent 60%)"
                }} />
              </div>

              {/* Hero Content */}
              <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm">
                    <Feather className="w-5 h-5 text-amber-300" />
                  </div>
                  <span className="text-emerald-200 text-sm font-medium tracking-wide uppercase">Ancient Wisdom, Modern Insights</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5" style={{ letterSpacing: "-0.02em" }}>
                  Ayurvedic Wellness Blog
                </h1>
                <p className="text-lg md:text-xl text-emerald-100/80 max-w-2xl leading-relaxed">
                  Discover ancient wisdom and modern insights on natural health and wellness, curated by expert Ayurvedic practitioners
                </p>

                {/* Stats Row */}
                <div className="flex flex-wrap gap-6 mt-10">
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl" style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)" }}>
                    <BookOpen className="w-4 h-4 text-emerald-200" />
                    <span className="text-white font-semibold text-sm">6 Articles</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl" style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)" }}>
                    <TrendingUp className="w-4 h-4 text-emerald-200" />
                    <span className="text-white font-semibold text-sm">6 Categories</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl" style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)" }}>
                    <Heart className="w-4 h-4 text-emerald-200" />
                    <span className="text-white font-semibold text-sm">1,868 Likes</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {!selectedBlog ? (
            <>
              {/* Category Filter */}
              <div className="flex gap-3 mb-10 flex-wrap" style={{ marginTop: "-2rem" }}>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setFilter(category)}
                    className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300"
                    style={
                      filter === category
                        ? {
                            background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
                            color: "white",
                            boxShadow: "0 4px 14px rgba(5, 150, 105, 0.4)",
                            transform: "translateY(-1px)",
                          }
                        : {
                            background: "rgba(255,255,255,0.9)",
                            color: "#064e3b",
                            border: "1px solid #d1fae5",
                            backdropFilter: "blur(8px)",
                            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                          }
                    }
                  >
                    {category === "all" ? "All" : category}
                  </button>
                ))}
              </div>

              {/* Featured Blog (First Blog Larger) */}
              {filteredBlogs.length > 0 && (
                <div className="mb-10">
                  <Card
                    className="group overflow-hidden border-0 cursor-pointer"
                    onClick={() => setSelectedBlog(filteredBlogs[0])}
                    style={{
                      background: "rgba(255,255,255,0.9)",
                      backdropFilter: "blur(12px)",
                      borderRadius: "1.25rem",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04)",
                      transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = "0 12px 40px rgba(5, 150, 105, 0.15), 0 4px 12px rgba(0,0,0,0.08)"
                      e.currentTarget.style.transform = "translateY(-4px)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04)"
                      e.currentTarget.style.transform = "translateY(0)"
                    }}
                  >
                    <div className="grid md:grid-cols-2">
                      {/* Featured Image */}
                      <div className="relative h-64 md:h-80 overflow-hidden">
                        <img
                          src={filteredBlogs[0].image || "/placeholder.svg"}
                          alt={filteredBlogs[0].title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent 60%, rgba(255,255,255,0.3) 100%)" }} />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1.5 rounded-full text-xs font-bold text-white" style={{
                            background: categoryColors[filteredBlogs[0].category]?.text || "#047857",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
                          }}>
                            ★ Featured
                          </span>
                        </div>
                      </div>
                      {/* Featured Content */}
                      <div className="p-6 md:p-8 flex flex-col justify-center">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 w-fit" style={{
                          background: categoryColors[filteredBlogs[0].category]?.bg || "#ecfdf5",
                          color: categoryColors[filteredBlogs[0].category]?.text || "#047857",
                          border: `1px solid ${categoryColors[filteredBlogs[0].category]?.border || "#a7f3d0"}`,
                        }}>
                          {filteredBlogs[0].category}
                        </span>
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 group-hover:text-teal-700 transition-colors">
                          {filteredBlogs[0].title}
                        </h2>
                        <p className="text-muted-foreground mb-5 leading-relaxed">{filteredBlogs[0].excerpt}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-5">
                          <div className="flex items-center gap-1.5">
                            <User className="w-4 h-4" />
                            {filteredBlogs[0].author}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            {filteredBlogs[0].date}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            {filteredBlogs[0].readTime}
                          </div>
                        </div>
                        <div className="flex items-center gap-5">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleLike(filteredBlogs[0].id)
                            }}
                            className="flex items-center gap-1.5 text-sm transition-all duration-300"
                            style={{ color: likedBlogs.includes(filteredBlogs[0].id) ? "#dc2626" : "#6b7280" }}
                          >
                            <Heart className={`w-4 h-4 ${likedBlogs.includes(filteredBlogs[0].id) ? "fill-red-500 text-red-500" : ""}`} />
                            <span className="font-medium">{filteredBlogs[0].likes + (likedBlogs.includes(filteredBlogs[0].id) ? 1 : 0)}</span>
                          </button>
                          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <MessageCircle className="w-4 h-4" />
                            <span className="font-medium">{filteredBlogs[0].comments + (blogComments[filteredBlogs[0].id]?.length || 0)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {/* Blogs Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBlogs.slice(1).map((blog, index) => (
                  <Card
                    key={blog.id}
                    className="group overflow-hidden border-0 cursor-pointer"
                    onClick={() => setSelectedBlog(blog)}
                    style={{
                      background: "rgba(255,255,255,0.9)",
                      backdropFilter: "blur(12px)",
                      borderRadius: "1rem",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
                      transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                      animationDelay: `${index * 100}ms`,
                      animation: "fadeInUp 0.6s ease forwards",
                      opacity: 0,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = "0 8px 30px rgba(5, 150, 105, 0.15), 0 4px 12px rgba(0,0,0,0.08)"
                      e.currentTarget.style.transform = "translateY(-6px)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)"
                      e.currentTarget.style.transform = "translateY(0)"
                    }}
                  >
                    {/* Blog Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={blog.image || "/placeholder.svg"}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%)" }} />
                      
                      {/* Read Time Badge */}
                      <div className="absolute top-3 right-3">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold text-white backdrop-blur-md flex items-center gap-1" style={{
                          background: "rgba(0,0,0,0.4)",
                        }}>
                          <Clock className="w-3 h-3" />
                          {blog.readTime}
                        </span>
                      </div>
                    </div>

                    <CardContent className="p-5">
                      {/* Category Badge */}
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3" style={{
                        background: categoryColors[blog.category]?.bg || "#ecfdf5",
                        color: categoryColors[blog.category]?.text || "#047857",
                        border: `1px solid ${categoryColors[blog.category]?.border || "#a7f3d0"}`,
                      }}>
                        {blog.category}
                      </span>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-teal-700 transition-colors duration-300">
                        {blog.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">{blog.excerpt}</p>

                      {/* Author and Date */}
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4 pb-4 border-b border-emerald-100/60">
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center">
                            <User className="w-3 h-3 text-white" />
                          </div>
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
                          className="flex items-center gap-1.5 transition-all duration-300 hover:scale-105"
                          style={{ color: likedBlogs.includes(blog.id) ? "#dc2626" : "#6b7280" }}
                        >
                          <Heart
                            className={`w-4 h-4 transition-all duration-300 ${likedBlogs.includes(blog.id) ? "fill-red-500 text-red-500" : ""}`}
                          />
                          <span className="font-medium">{blog.likes + (likedBlogs.includes(blog.id) ? 1 : 0)}</span>
                        </button>
                        <div className="flex items-center gap-1.5">
                          <MessageCircle className="w-4 h-4" />
                          <span className="font-medium">{blog.comments + (blogComments[blog.id]?.length || 0)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            /* Blog Detail View */
            <div className="max-w-3xl mx-auto" style={{ animation: "fadeInUp 0.5s ease forwards" }}>
              <button
                onClick={() => setSelectedBlog(null)}
                className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 rounded-full text-sm font-semibold text-teal-700 transition-all duration-300 hover:gap-3"
                style={{
                  background: "rgba(255,255,255,0.8)",
                  border: "1px solid #d1fae5",
                  backdropFilter: "blur(8px)",
                }}
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blogs
              </button>

              <Card className="overflow-hidden border-0" style={{
                background: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(12px)",
                borderRadius: "1.25rem",
                boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
              }}>
                {/* Blog Image Hero */}
                <div className="relative h-72 md:h-96 overflow-hidden">
                  <img
                    src={selectedBlog.image || "/placeholder.svg"}
                    alt={selectedBlog.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0" style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 40%, transparent 60%)"
                  }} />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1.5 rounded-full text-xs font-bold text-white" style={{
                        background: categoryColors[selectedBlog.category]?.text || "#047857",
                      }}>
                        {selectedBlog.category}
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold text-white backdrop-blur-md flex items-center gap-1" style={{
                        background: "rgba(255,255,255,0.15)",
                      }}>
                        <Clock className="w-3 h-3" />
                        {selectedBlog.readTime}
                      </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>
                      {selectedBlog.title}
                    </h1>
                  </div>
                </div>

                <CardContent className="p-6 md:p-8">
                  {/* Author and Meta */}
                  <div className="flex items-center gap-4 mb-8 pb-6 border-b border-emerald-100">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{selectedBlog.author}</p>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {selectedBlog.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {selectedBlog.readTime}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mb-8">
                    <p className="text-[16px] text-foreground leading-[1.8] first-letter:text-4xl first-letter:font-bold first-letter:text-teal-600 first-letter:float-left first-letter:mr-2 first-letter:mt-1">
                      {selectedBlog.content}
                    </p>
                  </div>

                  {/* Engagement */}
                  <div className="flex items-center gap-4 pt-6 border-t border-emerald-100 mb-8">
                    <button
                      onClick={() => toggleLike(selectedBlog.id)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
                      style={{
                        background: likedBlogs.includes(selectedBlog.id) ? "linear-gradient(135deg, #fef2f2, #fee2e2)" : "#fef2f2",
                        color: likedBlogs.includes(selectedBlog.id) ? "#dc2626" : "#6b7280",
                        border: likedBlogs.includes(selectedBlog.id) ? "1px solid #fca5a5" : "1px solid #fecdd3",
                      }}
                    >
                      <Heart
                        className={`w-5 h-5 ${likedBlogs.includes(selectedBlog.id) ? "fill-red-500 text-red-500" : ""}`}
                      />
                      {selectedBlog.likes + (likedBlogs.includes(selectedBlog.id) ? 1 : 0)}
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-muted-foreground transition-all duration-300" style={{
                      background: "#f3f4f6",
                      border: "1px solid #e5e7eb",
                    }}>
                      <MessageCircle className="w-5 h-5" />
                      {selectedBlog.comments + (blogComments[selectedBlog.id]?.length || 0)} comments
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
                          placeholder="Share your thoughts on this article..."
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
                      {(blogComments[selectedBlog.id] || []).map((comment) => (
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
                      {(!blogComments[selectedBlog.id] || blogComments[selectedBlog.id].length === 0) && (
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
      </div>
      <Footer />
    </main>
  )
}
