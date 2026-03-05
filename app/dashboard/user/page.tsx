"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, LogOut, Download, Heart, Plus, FileText } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

export default function UserDashboard() {
  const { user, logout, updateUser } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"profile" | "remedies" | "saved" | "blogs">("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState({
    name: user?.name || "User",
    email: user?.email || "user@example.com",
    phone: user?.phone || "+1 (555) 123-4567",
    age: user?.age || 28,
    location: user?.location || "New York, USA",
  })

  const [savedRemedies, setSavedRemedies] = useState<any[]>([])

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }
    setUserData({
      name: user.name || "User",
      email: user.email || "user@example.com",
      phone: user.phone || "+1 (555) 123-4567",
      age: user.age || 28,
      location: user.location || "New York, USA",
    })
  }, [user, router])

  useEffect(() => {
    const saved = localStorage.getItem("savedRemedies")
    if (saved) {
      const savedIds = JSON.parse(saved)
      const remedies = savedIds
        .map((id: number) => {
          const remedy = localStorage.getItem(`remedy_${id}`)
          return remedy ? JSON.parse(remedy) : null
        })
        .filter(Boolean)
      setSavedRemedies(remedies)
    }
  }, [])

  const myRemedies = [
    {
      id: 1,
      title: "Ginger Tea for Nausea",
      ailment: "Nausea",
      likes: 45,
      date: "Oct 15, 2025",
    },
    {
      id: 2,
      title: "Honey and Lemon for Sore Throat",
      ailment: "Sore Throat",
      likes: 32,
      date: "Oct 10, 2025",
    },
  ]

  const myBlogs = [
    {
      id: 1,
      title: "My Journey with Ayurveda",
      category: "Personal Experience",
      date: "Oct 18, 2025",
      views: 234,
    },
    {
      id: 2,
      title: "Natural Remedies for Better Sleep",
      category: "Wellness",
      date: "Oct 12, 2025",
      views: 156,
    },
  ]

  const handleDownloadPDF = () => {
    if (savedRemedies.length === 0) {
      alert("No saved remedies to download")
      return
    }

    // Create a simple text-based PDF content
    let pdfContent = "SAVED REMEDIES\n"
    pdfContent += "=" + "=".repeat(49) + "\n\n"

    savedRemedies.forEach((remedy, index) => {
      pdfContent += `${index + 1}. ${remedy.title}\n`
      pdfContent += `   Ailment: ${remedy.ailment}\n`
      pdfContent += `   Author: ${remedy.author}\n`
      pdfContent += `   Description: ${remedy.description}\n`
      pdfContent += `   Saved on: ${remedy.date}\n\n`
    })

    // Create blob and download
    const element = document.createElement("a")
    const file = new Blob([pdfContent], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "saved-remedies.txt"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)

    alert("Saved remedies downloaded successfully!")
  }

  const handleRemoveSavedRemedy = (remedyId: number) => {
    setSavedRemedies((prev) => prev.filter((r) => r.id !== remedyId))
    const saved = localStorage.getItem("savedRemedies")
    if (saved) {
      const savedIds = JSON.parse(saved).filter((id: number) => id !== remedyId)
      localStorage.setItem("savedRemedies", JSON.stringify(savedIds))
      localStorage.removeItem(`remedy_${remedyId}`)
    }
  }

  const handleSaveProfile = () => {
    updateUser(userData)
    setIsEditing(false)
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (!user) {
    return null
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
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-primary-foreground hover:opacity-80 transition"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <Card>
              <CardContent className="pt-6 space-y-2">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full text-left px-4 py-2 rounded-lg transition ${
                    activeTab === "profile" ? "bg-teal-600 text-white" : "text-foreground hover:bg-muted"
                  }`}
                >
                  Personal Information
                </button>
                <button
                  onClick={() => setActiveTab("remedies")}
                  className={`w-full text-left px-4 py-2 rounded-lg transition ${
                    activeTab === "remedies" ? "bg-teal-600 text-white" : "text-foreground hover:bg-muted"
                  }`}
                >
                  My Remedies
                </button>
                <button
                  onClick={() => setActiveTab("saved")}
                  className={`w-full text-left px-4 py-2 rounded-lg transition ${
                    activeTab === "saved" ? "bg-teal-600 text-white" : "text-foreground hover:bg-muted"
                  }`}
                >
                  Saved Remedies
                </button>
                <button
                  onClick={() => setActiveTab("blogs")}
                  className={`w-full text-left px-4 py-2 rounded-lg transition ${
                    activeTab === "blogs" ? "bg-teal-600 text-white" : "text-foreground hover:bg-muted"
                  }`}
                >
                  My Blogs
                </button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-3">
            {/* Personal Information Tab */}
            {activeTab === "profile" && (
              <Card>
                <CardHeader className="flex justify-between items-center">
                  <CardTitle>Personal Information</CardTitle>
                  <Button
                    onClick={() => {
                      if (isEditing) {
                        handleSaveProfile()
                      } else {
                        setIsEditing(true)
                      }
                    }}
                    className="bg-teal-600 hover:bg-teal-700"
                  >
                    {isEditing ? "Save" : "Edit"}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <>
                      <div>
                        <label className="text-sm font-semibold text-foreground">Name</label>
                        <input
                          type="text"
                          value={userData.name}
                          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-foreground">Email</label>
                        <input
                          type="email"
                          value={userData.email}
                          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-foreground">Phone</label>
                        <input
                          type="tel"
                          value={userData.phone}
                          onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground mt-1"
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-semibold text-foreground">Age</label>
                          <input
                            type="number"
                            value={userData.age}
                            onChange={(e) => setUserData({ ...userData, age: Number.parseInt(e.target.value) })}
                            className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground mt-1"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-foreground">Location</label>
                          <input
                            type="text"
                            value={userData.location}
                            onChange={(e) => setUserData({ ...userData, location: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground mt-1"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <p className="text-sm text-muted-foreground">Name</p>
                        <p className="text-lg font-semibold text-foreground">{userData.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="text-lg font-semibold text-foreground">{userData.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="text-lg font-semibold text-foreground">{userData.phone}</p>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Age</p>
                          <p className="text-lg font-semibold text-foreground">{userData.age}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Location</p>
                          <p className="text-lg font-semibold text-foreground">{userData.location}</p>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            )}

            {/* My Remedies Tab */}
            {activeTab === "remedies" && (
              <Card>
                <CardHeader className="flex justify-between items-center">
                  <CardTitle>My Remedies</CardTitle>
                  <Link href="/explore-community">
                    <Button className="bg-teal-600 hover:bg-teal-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Remedy
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {myRemedies.map((remedy) => (
                      <div key={remedy.id} className="p-4 border border-border rounded-lg hover:shadow-md transition">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-foreground">{remedy.title}</h3>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{remedy.ailment}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm text-muted-foreground">
                          <div className="flex items-center gap-4">
                            <span>
                              <Heart className="w-4 h-4 inline mr-1" />
                              {remedy.likes} likes
                            </span>
                            <span>{remedy.date}</span>
                          </div>
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Saved Remedies Tab */}
            {activeTab === "saved" && (
              <Card>
                <CardHeader className="flex justify-between items-center">
                  <CardTitle>Saved Remedies ({savedRemedies.length})</CardTitle>
                  <Button onClick={handleDownloadPDF} className="bg-teal-600 hover:bg-teal-700">
                    <Download className="w-4 h-4 mr-2" />
                    Download as PDF
                  </Button>
                </CardHeader>
                <CardContent>
                  {savedRemedies.length > 0 ? (
                    <div className="space-y-4">
                      {savedRemedies.map((remedy) => (
                        <div key={remedy.id} className="p-4 border border-border rounded-lg hover:shadow-md transition">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold text-foreground">{remedy.title}</h3>
                              <p className="text-sm text-muted-foreground">by {remedy.author}</p>
                            </div>
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                              {remedy.ailment}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="text-sm text-muted-foreground">Saved on {remedy.date}</p>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRemoveSavedRemedy(remedy.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground mb-4">No saved remedies yet</p>
                      <Link href="/browse-ailments">
                        <Button className="bg-teal-600 hover:bg-teal-700">Browse Ailments & Save Remedies</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* My Blogs Tab */}
            {activeTab === "blogs" && (
              <Card>
                <CardHeader className="flex justify-between items-center">
                  <CardTitle>My Blogs</CardTitle>
                  <Link href="/blogs">
                    <Button className="bg-teal-600 hover:bg-teal-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Write New Blog
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  {myBlogs.length > 0 ? (
                    <div className="space-y-4">
                      {myBlogs.map((blog) => (
                        <div key={blog.id} className="p-4 border border-border rounded-lg hover:shadow-md transition">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-start gap-3">
                              <FileText className="w-5 h-5 text-teal-600 mt-1" />
                              <div>
                                <h3 className="font-semibold text-foreground">{blog.title}</h3>
                                <p className="text-sm text-muted-foreground">{blog.category}</p>
                              </div>
                            </div>
                            <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded">
                              {blog.views} views
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-sm text-muted-foreground">
                            <span>{blog.date}</span>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                Edit
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600 hover:text-red-700 bg-transparent"
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground mb-4">No blogs yet</p>
                      <Link href="/blogs">
                        <Button className="bg-teal-600 hover:bg-teal-700">Start Writing</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
