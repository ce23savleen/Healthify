"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Leaf,
  LogOut,
  Download,
  Heart,
  Plus,
  FileText,
  Activity,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookmarkCheck,
  Pencil,
  Save,
  Sparkles,
  Shield,
  ChevronRight,
  Camera,
  ImagePlus,
  X,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import HealthAnalytics from "@/components/health-analytics"

export default function UserDashboard() {
  const { user, logout, updateUser } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"profile" | "health" | "remedies" | "saved" | "blogs">("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState({
    name: user?.name || "User",
    email: user?.email || "user@example.com",
    phone: user?.phone || "+1 (555) 123-4567",
    age: user?.age || 28,
    location: user?.location || "New York, USA",
  })

  const [savedRemedies, setSavedRemedies] = useState<any[]>([])
  const [profileImage, setProfileImage] = useState<string | null>(null)

  // Load profile image from localStorage on mount
  useEffect(() => {
    const savedImage = localStorage.getItem("profileImage")
    if (savedImage) setProfileImage(savedImage)
  }, [])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be less than 5MB")
      return
    }
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64 = reader.result as string
      setProfileImage(base64)
      localStorage.setItem("profileImage", base64)
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveImage = () => {
    setProfileImage(null)
    localStorage.removeItem("profileImage")
  }

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

    let pdfContent = "SAVED REMEDIES\n"
    pdfContent += "=" + "=".repeat(49) + "\n\n"

    savedRemedies.forEach((remedy, index) => {
      pdfContent += `${index + 1}. ${remedy.title}\n`
      pdfContent += `   Ailment: ${remedy.ailment}\n`
      pdfContent += `   Author: ${remedy.author}\n`
      pdfContent += `   Description: ${remedy.description}\n`
      pdfContent += `   Saved on: ${remedy.date}\n\n`
    })

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

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const sidebarTabs = [
    { key: "profile" as const, label: "Personal Information", icon: User },
    { key: "health" as const, label: "Health Analytics", icon: Activity },
    { key: "remedies" as const, label: "My Remedies", icon: Leaf },
    { key: "saved" as const, label: "Saved Remedies", icon: BookmarkCheck },
    { key: "blogs" as const, label: "My Blogs", icon: FileText },
  ]

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

      {/* Profile Hero Banner */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #064e3b 0%, #059669 50%, #10b981 100%)",
        }}
      >
        {/* Decorative circles */}
        <div
          className="absolute top-[-60px] right-[-40px] w-[200px] h-[200px] rounded-full opacity-10"
          style={{ background: "white" }}
        />
        <div
          className="absolute bottom-[-30px] left-[10%] w-[120px] h-[120px] rounded-full opacity-10"
          style={{ background: "white" }}
        />
        <div
          className="absolute top-[20px] left-[30%] w-[60px] h-[60px] rounded-full opacity-5"
          style={{ background: "white" }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex items-center gap-6 relative z-10">
          {/* Avatar */}
          {profileImage ? (
            <img
              src={profileImage}
              alt={userData.name}
              className="w-24 h-24 rounded-full object-cover shadow-lg ring-4 ring-white/30"
            />
          ) : (
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold shadow-lg ring-4 ring-white/30"
              style={{
                background: "linear-gradient(135deg, #ecfdf5 0%, #a7f3d0 100%)",
                color: "#064e3b",
              }}
            >
              {getInitials(userData.name)}
            </div>
          )}

          {/* User Info */}
          <div className="text-white">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight capitalize">
              {userData.name}
            </h1>
            <p className="text-emerald-100 mt-1 flex items-center gap-2 text-sm md:text-base">
              <MapPin className="w-4 h-4" />
              {userData.location}
            </p>
            <div className="flex items-center gap-3 mt-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/15 backdrop-blur-sm text-white border border-white/20">
                <Shield className="w-3 h-3" />
                Verified Member
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/15 backdrop-blur-sm text-white border border-white/20">
                <Sparkles className="w-3 h-3" />
                Wellness Enthusiast
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <div className="p-2">
                {sidebarTabs.map((tab) => {
                  const Icon = tab.icon
                  const isActive = activeTab === tab.key
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className="w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 group mb-1 last:mb-0"
                      style={
                        isActive
                          ? {
                              background: "linear-gradient(135deg, #059669, #10b981)",
                              color: "white",
                              boxShadow: "0 4px 12px rgba(5, 150, 105, 0.3)",
                            }
                          : {}
                      }
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                        style={
                          isActive
                            ? { background: "rgba(255,255,255,0.2)" }
                            : { background: "#ecfdf5" }
                        }
                      >
                        <Icon
                          className="w-4 h-4"
                          style={isActive ? { color: "white" } : { color: "#059669" }}
                        />
                      </div>
                      <span className={`text-sm font-medium ${!isActive ? "text-foreground" : ""}`}>
                        {tab.label}
                      </span>
                      {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-3">
            {/* Personal Information Tab */}
            {activeTab === "profile" && (
              <div style={{ animation: "fadeInUp 0.4s ease-out" }}>
                {/* Profile Overview Card */}
                <div
                  className="rounded-2xl overflow-hidden shadow-lg border border-white/60"
                  style={{ background: "linear-gradient(145deg, #ffffff 0%, #f0fdf4 100%)" }}
                >
                  {/* Decorative top gradient bar */}
                  <div
                    className="h-2"
                    style={{ background: "linear-gradient(90deg, #064e3b, #059669, #10b981, #34d399)" }}
                  />

                  {/* Header with glassmorphism */}
                  <div
                    className="px-8 py-6 flex justify-between items-center"
                    style={{
                      background: "linear-gradient(135deg, rgba(240,253,244,0.8), rgba(209,250,229,0.4))",
                      backdropFilter: "blur(12px)",
                      borderBottom: "1px solid rgba(16,185,129,0.12)",
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md"
                        style={{ background: "linear-gradient(135deg, #059669, #10b981)" }}
                      >
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-foreground tracking-tight">Personal Information</h2>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          Manage your personal details and preferences
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() => {
                        if (isEditing) {
                          handleSaveProfile()
                        } else {
                          setIsEditing(true)
                        }
                      }}
                      className="gap-2 rounded-xl px-6 py-2.5 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] text-sm font-semibold"
                      style={
                        isEditing
                          ? { background: "linear-gradient(135deg, #059669, #10b981)" }
                          : { background: "linear-gradient(135deg, #064e3b, #059669)" }
                      }
                    >
                      {isEditing ? (
                        <><Save className="w-4 h-4" /> Save Changes</>
                      ) : (
                        <><Pencil className="w-4 h-4" /> Edit Profile</>
                      )}
                    </Button>
                  </div>

                  {/* Profile Fields */}
                  <div className="p-8">
                    {isEditing ? (
                      <div className="grid gap-6">
                        {/* Profile Photo Upload */}
                        <div className="group">
                          <label className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                            <Camera className="w-4 h-4 text-emerald-600" />
                            Profile Photo
                          </label>
                          <div
                            className="flex items-center gap-6 p-5 rounded-2xl border-2 border-dashed border-emerald-200 transition-all duration-300 hover:border-emerald-400"
                            style={{ background: "linear-gradient(145deg, #f0fdf4, #ffffff)" }}
                          >
                            {/* Current Photo / Placeholder */}
                            <div className="relative shrink-0">
                              {profileImage ? (
                                <div className="relative">
                                  <img
                                    src={profileImage}
                                    alt="Profile"
                                    className="w-20 h-20 rounded-2xl object-cover shadow-md ring-2 ring-emerald-100"
                                  />
                                  <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center shadow-md hover:bg-red-600 transition-colors"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ) : (
                                <div
                                  className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-sm"
                                  style={{ background: "linear-gradient(135deg, #d1fae5, #a7f3d0)" }}
                                >
                                  <User className="w-8 h-8 text-emerald-700" />
                                </div>
                              )}
                            </div>
                            {/* Upload Area */}
                            <div className="flex-1">
                              <label
                                htmlFor="profile-photo-upload"
                                className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.03] active:scale-[0.98]"
                                style={{ background: "linear-gradient(135deg, #059669, #10b981)" }}
                              >
                                <ImagePlus className="w-4 h-4" />
                                {profileImage ? "Change Photo" : "Upload Photo"}
                              </label>
                              <input
                                id="profile-photo-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                              />
                              <p className="text-xs text-muted-foreground mt-2">
                                JPG, PNG or GIF. Max 5MB.
                              </p>
                            </div>
                          </div>
                        </div>
                        {[
                          { icon: User, label: "Full Name", type: "text", field: "name" as const },
                          { icon: Mail, label: "Email Address", type: "email", field: "email" as const },
                          { icon: Phone, label: "Phone Number", type: "tel", field: "phone" as const },
                        ].map((item) => (
                          <div key={item.field} className="group">
                            <label className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                              <item.icon className="w-4 h-4 text-emerald-600" />
                              {item.label}
                            </label>
                            <input
                              type={item.type}
                              value={userData[item.field]}
                              onChange={(e) => setUserData({ ...userData, [item.field]: e.target.value })}
                              className="w-full px-4 py-3.5 rounded-xl border-2 border-emerald-100 bg-white text-foreground transition-all duration-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none hover:border-emerald-200"
                              style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
                            />
                          </div>
                        ))}
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="group">
                            <label className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-emerald-600" />
                              Age
                            </label>
                            <input
                              type="number"
                              value={userData.age}
                              onChange={(e) => setUserData({ ...userData, age: Number.parseInt(e.target.value) })}
                              className="w-full px-4 py-3.5 rounded-xl border-2 border-emerald-100 bg-white text-foreground transition-all duration-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none hover:border-emerald-200"
                              style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
                            />
                          </div>
                          <div className="group">
                            <label className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-emerald-600" />
                              Location
                            </label>
                            <input
                              type="text"
                              value={userData.location}
                              onChange={(e) => setUserData({ ...userData, location: e.target.value })}
                              className="w-full px-4 py-3.5 rounded-xl border-2 border-emerald-100 bg-white text-foreground transition-all duration-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none hover:border-emerald-200"
                              style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="grid sm:grid-cols-2 gap-5">
                        {[
                          { icon: User, label: "Full Name", value: userData.name, gradient: "linear-gradient(135deg, #059669, #10b981)", bgTint: "#ecfdf5", capitalize: true },
                          { icon: Mail, label: "Email Address", value: userData.email, gradient: "linear-gradient(135deg, #0d9488, #14b8a6)", bgTint: "#f0fdfa" },
                          { icon: Phone, label: "Phone Number", value: userData.phone, gradient: "linear-gradient(135deg, #0891b2, #06b6d4)", bgTint: "#ecfeff" },
                          { icon: Calendar, label: "Age", value: `${userData.age} years`, gradient: "linear-gradient(135deg, #d97706, #f59e0b)", bgTint: "#fffbeb" },
                        ].map((item) => (
                          <div
                            key={item.label}
                            className="group relative p-5 rounded-2xl border border-transparent transition-all duration-400 hover:shadow-lg cursor-default overflow-hidden"
                            style={{
                              background: `linear-gradient(145deg, ${item.bgTint}, #ffffff)`,
                              borderColor: "rgba(209,250,229,0.6)",
                            }}
                          >
                            {/* Hover shimmer overlay */}
                            <div
                              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                              style={{
                                background: "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.6) 50%, transparent 70%)",
                                backgroundSize: "200% 100%",
                                animation: "shimmer 2s infinite",
                              }}
                            />
                            <div className="flex items-center gap-4 relative z-10">
                              <div
                                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:rotate-3"
                                style={{ background: item.gradient }}
                              >
                                <item.icon className="w-5 h-5 text-white" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.1em] mb-1">
                                  {item.label}
                                </p>
                                <p className={`text-[17px] font-bold text-foreground truncate ${item.capitalize ? "capitalize" : ""}`}>
                                  {item.value}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}

                        {/* Location Card - Full Width with map-like accent */}
                        <div
                          className="group relative p-5 rounded-2xl border border-transparent transition-all duration-400 hover:shadow-lg cursor-default overflow-hidden sm:col-span-2"
                          style={{
                            background: "linear-gradient(145deg, #f5f3ff, #ffffff)",
                            borderColor: "rgba(209,250,229,0.6)",
                          }}
                        >
                          <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                            style={{
                              background: "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.6) 50%, transparent 70%)",
                              backgroundSize: "200% 100%",
                              animation: "shimmer 2s infinite",
                            }}
                          />
                          <div className="flex items-center gap-4 relative z-10">
                            <div
                              className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:rotate-3"
                              style={{ background: "linear-gradient(135deg, #7c3aed, #8b5cf6)" }}
                            >
                              <MapPin className="w-5 h-5 text-white" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.1em] mb-1">
                                Location
                              </p>
                              <p className="text-[17px] font-bold text-foreground truncate">
                                {userData.location}
                              </p>
                            </div>
                            <div
                              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                              style={{ background: "rgba(124,58,237,0.08)", color: "#7c3aed" }}
                            >
                              <MapPin className="w-3 h-3" />
                              View on map
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Stats Row */}
                <div className="grid grid-cols-3 gap-5 mt-7">
                  {[
                    { icon: Leaf, count: myRemedies.length, label: "Remedies Shared", gradient: "linear-gradient(135deg, #059669, #10b981)", bgGradient: "linear-gradient(145deg, #ecfdf5, #d1fae5)", iconColor: "#059669" },
                    { icon: BookmarkCheck, count: savedRemedies.length, label: "Saved Remedies", gradient: "linear-gradient(135deg, #d97706, #f59e0b)", bgGradient: "linear-gradient(145deg, #fef3c7, #fde68a)", iconColor: "#d97706" },
                    { icon: FileText, count: myBlogs.length, label: "Blogs Written", gradient: "linear-gradient(135deg, #7c3aed, #8b5cf6)", bgGradient: "linear-gradient(145deg, #ede9fe, #ddd6fe)", iconColor: "#7c3aed" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="group relative rounded-2xl border border-white/60 p-6 text-center shadow-md transition-all duration-400 hover:shadow-xl hover:-translate-y-1 cursor-default overflow-hidden"
                      style={{ background: "linear-gradient(145deg, #ffffff, #f0fdf4)" }}
                    >
                      {/* Top accent line */}
                      <div
                        className="absolute top-0 left-[20%] right-[20%] h-[3px] rounded-b-full opacity-60 group-hover:opacity-100 group-hover:left-[10%] group-hover:right-[10%] transition-all duration-500"
                        style={{ background: stat.gradient }}
                      />
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-md"
                        style={{ background: stat.bgGradient }}
                      >
                        <stat.icon className="w-5 h-5" style={{ color: stat.iconColor }} />
                      </div>
                      <p className="text-3xl font-extrabold text-foreground tracking-tight">{stat.count}</p>
                      <p className="text-xs font-medium text-muted-foreground mt-1 tracking-wide">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Account Info Footer */}
                <div
                  className="mt-7 rounded-2xl p-5 flex items-center justify-between"
                  style={{
                    background: "linear-gradient(135deg, rgba(5,150,105,0.06), rgba(16,185,129,0.04))",
                    border: "1px solid rgba(16,185,129,0.12)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, #059669, #10b981)" }}
                    >
                      <Shield className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Account Verified</p>
                      <p className="text-xs text-muted-foreground">Your identity has been verified successfully</p>
                    </div>
                  </div>
                  <span
                    className="px-3 py-1.5 rounded-full text-xs font-semibold"
                    style={{ background: "rgba(16,185,129,0.12)", color: "#059669" }}
                  >
                    ✓ Active
                  </span>
                </div>
              </div>
            )}

            {/* Health Analytics Tab */}
            {activeTab === "health" && <HealthAnalytics />}

            {/* My Remedies Tab */}
            {activeTab === "remedies" && (
              <div style={{ animation: "fadeInUp 0.4s ease-out" }}>
                <Card className="shadow-sm">
                  <CardHeader className="flex justify-between items-center">
                    <CardTitle>My Remedies</CardTitle>
                    <Link href="/explore-community">
                      <Button
                        className="gap-2 rounded-lg shadow-md"
                        style={{ background: "linear-gradient(135deg, #064e3b, #059669)" }}
                      >
                        <Plus className="w-4 h-4" />
                        Add New Remedy
                      </Button>
                    </Link>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {myRemedies.map((remedy) => (
                        <div
                          key={remedy.id}
                          className="p-4 border border-border rounded-xl hover:shadow-md transition-all duration-300 hover:border-emerald-200"
                          style={{ background: "linear-gradient(135deg, #f0fdf4, #ffffff)" }}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-foreground">{remedy.title}</h3>
                            <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-medium">
                              {remedy.ailment}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-sm text-muted-foreground">
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <Heart className="w-4 h-4 text-rose-400" />
                                {remedy.likes} likes
                              </span>
                              <span>{remedy.date}</span>
                            </div>
                            <Button size="sm" variant="outline" className="rounded-lg">
                              Edit
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Saved Remedies Tab */}
            {activeTab === "saved" && (
              <div style={{ animation: "fadeInUp 0.4s ease-out" }}>
                <Card className="shadow-sm">
                  <CardHeader className="flex justify-between items-center">
                    <CardTitle>Saved Remedies ({savedRemedies.length})</CardTitle>
                    <Button
                      onClick={handleDownloadPDF}
                      className="gap-2 rounded-lg shadow-md"
                      style={{ background: "linear-gradient(135deg, #064e3b, #059669)" }}
                    >
                      <Download className="w-4 h-4" />
                      Download as PDF
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {savedRemedies.length > 0 ? (
                      <div className="space-y-4">
                        {savedRemedies.map((remedy) => (
                          <div
                            key={remedy.id}
                            className="p-4 border border-border rounded-xl hover:shadow-md transition-all duration-300 hover:border-emerald-200"
                            style={{ background: "linear-gradient(135deg, #f0fdf4, #ffffff)" }}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-semibold text-foreground">{remedy.title}</h3>
                                <p className="text-sm text-muted-foreground">by {remedy.author}</p>
                              </div>
                              <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-medium">
                                {remedy.ailment}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <p className="text-sm text-muted-foreground">Saved on {remedy.date}</p>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleRemoveSavedRemedy(remedy.id)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-16">
                        <div
                          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                          style={{ background: "linear-gradient(135deg, #ecfdf5, #d1fae5)" }}
                        >
                          <BookmarkCheck className="w-8 h-8 text-emerald-500" />
                        </div>
                        <p className="text-muted-foreground mb-4 text-lg">No saved remedies yet</p>
                        <p className="text-sm text-muted-foreground mb-6">
                          Browse ailments and save remedies you find helpful
                        </p>
                        <Link href="/browse-ailments">
                          <Button
                            className="rounded-lg shadow-md"
                            style={{ background: "linear-gradient(135deg, #064e3b, #059669)" }}
                          >
                            Browse Ailments & Save Remedies
                          </Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* My Blogs Tab */}
            {activeTab === "blogs" && (
              <div style={{ animation: "fadeInUp 0.4s ease-out" }}>
                <Card className="shadow-sm">
                  <CardHeader className="flex justify-between items-center">
                    <CardTitle>My Blogs</CardTitle>
                    <Link href="/blogs">
                      <Button
                        className="gap-2 rounded-lg shadow-md"
                        style={{ background: "linear-gradient(135deg, #064e3b, #059669)" }}
                      >
                        <Plus className="w-4 h-4" />
                        Write New Blog
                      </Button>
                    </Link>
                  </CardHeader>
                  <CardContent>
                    {myBlogs.length > 0 ? (
                      <div className="space-y-4">
                        {myBlogs.map((blog) => (
                          <div
                            key={blog.id}
                            className="p-4 border border-border rounded-xl hover:shadow-md transition-all duration-300 hover:border-emerald-200"
                            style={{ background: "linear-gradient(135deg, #f0fdf4, #ffffff)" }}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-start gap-3">
                                <div
                                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                                  style={{
                                    background: "linear-gradient(135deg, #059669, #10b981)",
                                  }}
                                >
                                  <FileText className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-foreground">{blog.title}</h3>
                                  <p className="text-sm text-muted-foreground">{blog.category}</p>
                                </div>
                              </div>
                              <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-medium">
                                {blog.views} views
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-sm text-muted-foreground">
                              <span>{blog.date}</span>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" className="rounded-lg">
                                  Edit
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-red-600 hover:text-red-700 bg-transparent rounded-lg"
                                >
                                  Delete
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-16">
                        <div
                          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                          style={{ background: "linear-gradient(135deg, #ecfdf5, #d1fae5)" }}
                        >
                          <FileText className="w-8 h-8 text-emerald-500" />
                        </div>
                        <p className="text-muted-foreground mb-4 text-lg">No blogs yet</p>
                        <p className="text-sm text-muted-foreground mb-6">
                          Share your wellness knowledge with the community
                        </p>
                        <Link href="/blogs">
                          <Button
                            className="rounded-lg shadow-md"
                            style={{ background: "linear-gradient(135deg, #064e3b, #059669)" }}
                          >
                            Start Writing
                          </Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
