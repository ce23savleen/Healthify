"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, ArrowLeft, Plus, Trash2, Edit2 } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

interface Blog {
  id: number
  title: string
  topic: string
  content: string
  author: string
  date: string
  likes: number
}

export default function DoctorBlogsPage() {
  const { user, isLoggedIn } = useAuth()
  const router = useRouter()
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    topic: "",
    content: "",
  })

  useEffect(() => {
    if (!isLoggedIn || user?.userType !== "doctor") {
      router.push("/login")
      return
    }

    const savedBlogs = JSON.parse(localStorage.getItem("doctorBlogs") || "[]")
    const userBlogs = savedBlogs.filter((blog: Blog) => blog.author === user?.name)
    setBlogs(userBlogs)
  }, [isLoggedIn, user, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.topic || !formData.content) {
      alert("Please fill in all fields")
      return
    }

    const allBlogs = JSON.parse(localStorage.getItem("doctorBlogs") || "[]")

    if (editingId) {
      const updated = allBlogs.map((blog: Blog) =>
        blog.id === editingId
          ? { ...blog, title: formData.title, topic: formData.topic, content: formData.content }
          : blog,
      )
      localStorage.setItem("doctorBlogs", JSON.stringify(updated))
      setBlogs(updated.filter((blog: Blog) => blog.author === user?.name))
      setEditingId(null)
    } else {
      const newBlog: Blog = {
        id: Date.now(),
        title: formData.title,
        topic: formData.topic,
        content: formData.content,
        author: user?.name || "Anonymous",
        date: new Date().toLocaleDateString(),
        likes: 0,
      }
      allBlogs.push(newBlog)
      localStorage.setItem("doctorBlogs", JSON.stringify(allBlogs))
      setBlogs([...blogs, newBlog])
    }

    setFormData({ title: "", topic: "", content: "" })
    setShowForm(false)
  }

  const handleEdit = (blog: Blog) => {
    setFormData({ title: blog.title, topic: blog.topic, content: blog.content })
    setEditingId(blog.id)
    setShowForm(true)
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      const allBlogs = JSON.parse(localStorage.getItem("doctorBlogs") || "[]")
      const updated = allBlogs.filter((blog: Blog) => blog.id !== id)
      localStorage.setItem("doctorBlogs", JSON.stringify(updated))
      setBlogs(blogs.filter((blog) => blog.id !== id))
    }
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-primary">My Blogs</h1>
          <Button
            onClick={() => {
              setShowForm(!showForm)
              setEditingId(null)
              setFormData({ title: "", topic: "", content: "" })
            }}
            className="bg-teal-600 hover:bg-teal-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Blog
          </Button>
        </div>

        {/* Blog Form */}
        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingId ? "Edit Blog" : "Create New Blog"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-foreground">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Blog title"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground">Topic/Ailment</label>
                  <input
                    type="text"
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    placeholder="e.g., Natural Remedies for Acne"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground">Content</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Write your blog content here..."
                    rows={6}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground mt-1"
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
                    {editingId ? "Update Blog" : "Publish Blog"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowForm(false)
                      setEditingId(null)
                      setFormData({ title: "", topic: "", content: "" })
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Blogs List */}
        <div className="space-y-6">
          {blogs.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground">No blogs yet. Create your first blog to get started!</p>
              </CardContent>
            </Card>
          ) : (
            blogs.map((blog) => (
              <Card key={blog.id} className="hover:shadow-lg transition">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl mb-2">{blog.title}</CardTitle>
                      <p className="text-teal-600 font-semibold text-sm">{blog.topic}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(blog)} className="bg-transparent">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(blog.id)}
                        className="bg-transparent text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground mb-4 line-clamp-3">{blog.content}</p>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>{blog.date}</span>
                    <span>{blog.likes} likes</span>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
