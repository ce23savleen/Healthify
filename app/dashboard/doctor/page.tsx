"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Leaf,
  LogOut,
  Calendar,
  Users,
  CheckCircle,
  Clock,
  BookOpen,
  Bookmark,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Award,
  Building2,
  Pencil,
  Save,
  Shield,
  Sparkles,
  ChevronRight,
  Camera,
  ImagePlus,
  X,
  Heart,
  Star,
  Stethoscope,
  GraduationCap,
  FileText,
  TrendingUp,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  Eye,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import DoctorRouteGuard from "@/components/doctor-route-guard"

export default function DoctorDashboard() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<
    "profile" | "appointments" | "patients" | "approved" | "pending" | "blogs" | "saved"
  >("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [doctorData, setDoctorData] = useState({
    name: user?.name || "Dr. Sarah Johnson",
    email: user?.email || "sarah@example.com",
    phone: user?.phone || "+1 (555) 987-6543",
    specialization: user?.specialization || "Ayurveda",
    qualifications: "BAMS, MD (Ayurveda)",
    experience: "10 years",
    clinic: "Wellness Clinic, New York",
  })
  const [pendingVerifications, setPendingVerifications] = useState<any[]>([])
  const [blogs, setBlogs] = useState<any[]>([])
  const [savedRemedies, setSavedRemedies] = useState<any[]>([])
  const [profileImage, setProfileImage] = useState<string | null>(null)

  useEffect(() => {
    const savedImage = localStorage.getItem("doctorProfileImage")
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
      localStorage.setItem("doctorProfileImage", base64)
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveImage = () => {
    setProfileImage(null)
    localStorage.removeItem("doctorProfileImage")
  }

  useEffect(() => {
    const pending = JSON.parse(localStorage.getItem("pendingVerifications") || "[]")
    setPendingVerifications(pending)

    const allBlogs = JSON.parse(localStorage.getItem("doctorBlogs") || "[]")
    const userBlogs = allBlogs.filter((blog: any) => blog.author === user?.name)
    setBlogs(userBlogs)

    const saved = JSON.parse(localStorage.getItem("savedRemedies") || "[]")
    setSavedRemedies(saved)
  }, [user?.name])

  const handleVerifyRemedy = (remedyId: number) => {
    const remedy = pendingVerifications.find((r) => r.id === remedyId)
    if (remedy) {
      remedy.isVerified = true
      const updated = pendingVerifications.filter((r) => r.id !== remedyId)
      setPendingVerifications(updated)
      localStorage.setItem("pendingVerifications", JSON.stringify(updated))

      const approvedRemedies = JSON.parse(localStorage.getItem("approvedRemedies") || "[]")
      approvedRemedies.push(remedy)
      localStorage.setItem("approvedRemedies", JSON.stringify(approvedRemedies))

      alert("Remedy verified successfully!")
    }
  }

  const handleRejectRemedy = (remedyId: number) => {
    const updated = pendingVerifications.filter((r) => r.id !== remedyId)
    setPendingVerifications(updated)
    localStorage.setItem("pendingVerifications", JSON.stringify(updated))
  }

  const upcomingAppointments = [
    {
      id: 1,
      patientName: "John Doe",
      date: "Oct 25, 2025",
      time: "2:00 PM",
      ailment: "Acne",
      status: "Confirmed",
    },
    {
      id: 2,
      patientName: "Jane Smith",
      date: "Oct 25, 2025",
      time: "3:30 PM",
      ailment: "Back Pain",
      status: "Pending",
    },
    {
      id: 3,
      patientName: "Mike Johnson",
      date: "Oct 26, 2025",
      time: "10:00 AM",
      ailment: "Headache",
      status: "Confirmed",
    },
  ]

  const patientsConsulted = [
    { id: 1, name: "John Doe", lastVisit: "Oct 20, 2025", ailment: "Acne", status: "Treated" },
    { id: 2, name: "Jane Smith", lastVisit: "Oct 18, 2025", ailment: "Back Pain", status: "Follow-up" },
    { id: 3, name: "Mike Johnson", lastVisit: "Oct 15, 2025", ailment: "Headache", status: "Treated" },
    { id: 4, name: "Sarah Williams", lastVisit: "Oct 12, 2025", ailment: "Anxiety", status: "Ongoing" },
  ]

  const approvedRemedies = [
    {
      id: 1,
      title: "Turmeric Milk for Joint Pain",
      ailment: "Joint Pain",
      approvedDate: "Oct 18, 2025",
      likes: 623,
    },
    {
      id: 2,
      title: "Apple Cider Vinegar for Digestion",
      ailment: "Indigestion",
      approvedDate: "Oct 16, 2025",
      likes: 456,
    },
    {
      id: 3,
      title: "Ginger Tea for Nausea",
      ailment: "Nausea",
      approvedDate: "Oct 14, 2025",
      likes: 542,
    },
  ]

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
    { key: "appointments" as const, label: "Upcoming Appointments", icon: Calendar, badge: upcomingAppointments.length },
    { key: "patients" as const, label: "Patients Consulted", icon: Users },
    { key: "pending" as const, label: "Verifications", icon: Clock, badge: pendingVerifications.length > 0 ? pendingVerifications.length : undefined },
    { key: "approved" as const, label: "Your Remedies", icon: CheckCircle },
    { key: "blogs" as const, label: "Your Blogs", icon: BookOpen },
    { key: "saved" as const, label: "Saved Remedies", icon: Bookmark },
  ]

  return (
    <DoctorRouteGuard>
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-6 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Leaf className="w-6 h-6" />
            <span>Healthyify</span>
          </Link>
          <button
            onClick={() => {
              logout()
              router.push("/")
            }}
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
        <div
          className="absolute bottom-[10px] right-[25%] w-[80px] h-[80px] rounded-full opacity-5"
          style={{ background: "white" }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex items-center gap-6 relative z-10">
          {/* Avatar */}
          {profileImage ? (
            <img
              src={profileImage}
              alt={doctorData.name}
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
              {getInitials(doctorData.name)}
            </div>
          )}

          {/* Doctor Info */}
          <div className="text-white">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight capitalize">
              {doctorData.name}
            </h1>
            <p className="text-emerald-100 mt-1 flex items-center gap-2 text-sm md:text-base">
              <Stethoscope className="w-4 h-4" />
              {doctorData.specialization} Specialist
            </p>
            <div className="flex items-center gap-3 mt-3 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/15 backdrop-blur-sm text-white border border-white/20">
                <Shield className="w-3 h-3" />
                Verified Doctor
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/15 backdrop-blur-sm text-white border border-white/20">
                <Sparkles className="w-3 h-3" />
                {doctorData.experience} Experience
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/15 backdrop-blur-sm text-white border border-white/20">
                <MapPin className="w-3 h-3" />
                {doctorData.clinic}
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
                      className="w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 group mb-1 last:mb-0 relative"
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
                      {!isActive && tab.badge && tab.badge > 0 && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 bg-red-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold">
                          {tab.badge}
                        </span>
                      )}
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
                          Manage your professional details and credentials
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() => setIsEditing(!isEditing)}
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
                            <div className="flex-1">
                              <label
                                htmlFor="doctor-photo-upload"
                                className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.03] active:scale-[0.98]"
                                style={{ background: "linear-gradient(135deg, #059669, #10b981)" }}
                              >
                                <ImagePlus className="w-4 h-4" />
                                {profileImage ? "Change Photo" : "Upload Photo"}
                              </label>
                              <input
                                id="doctor-photo-upload"
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
                          { icon: Stethoscope, label: "Specialization", type: "text", field: "specialization" as const },
                          { icon: GraduationCap, label: "Qualifications", type: "text", field: "qualifications" as const },
                          { icon: Briefcase, label: "Experience", type: "text", field: "experience" as const },
                          { icon: Building2, label: "Clinic", type: "text", field: "clinic" as const },
                        ].map((item) => (
                          <div key={item.field} className="group">
                            <label className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                              <item.icon className="w-4 h-4 text-emerald-600" />
                              {item.label}
                            </label>
                            <input
                              type={item.type}
                              value={doctorData[item.field]}
                              onChange={(e) => setDoctorData({ ...doctorData, [item.field]: e.target.value })}
                              className="w-full px-4 py-3.5 rounded-xl border-2 border-emerald-100 bg-white text-foreground transition-all duration-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none hover:border-emerald-200"
                              style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="grid sm:grid-cols-2 gap-5">
                        {[
                          { icon: User, label: "Full Name", value: doctorData.name, gradient: "linear-gradient(135deg, #059669, #10b981)", bgTint: "#ecfdf5", capitalize: true },
                          { icon: Mail, label: "Email Address", value: doctorData.email, gradient: "linear-gradient(135deg, #0d9488, #14b8a6)", bgTint: "#f0fdfa" },
                          { icon: Phone, label: "Phone Number", value: doctorData.phone, gradient: "linear-gradient(135deg, #0891b2, #06b6d4)", bgTint: "#ecfeff" },
                          { icon: Stethoscope, label: "Specialization", value: doctorData.specialization, gradient: "linear-gradient(135deg, #d97706, #f59e0b)", bgTint: "#fffbeb" },
                          { icon: GraduationCap, label: "Qualifications", value: doctorData.qualifications, gradient: "linear-gradient(135deg, #7c3aed, #8b5cf6)", bgTint: "#f5f3ff" },
                          { icon: Briefcase, label: "Experience", value: doctorData.experience, gradient: "linear-gradient(135deg, #dc2626, #ef4444)", bgTint: "#fef2f2" },
                        ].map((item) => (
                          <div
                            key={item.label}
                            className="group relative p-5 rounded-2xl border border-transparent transition-all duration-400 hover:shadow-lg cursor-default overflow-hidden"
                            style={{
                              background: `linear-gradient(145deg, ${item.bgTint}, #ffffff)`,
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

                        {/* Clinic Card - Full Width */}
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
                              style={{ background: "linear-gradient(135deg, #059669, #10b981)" }}
                            >
                              <Building2 className="w-5 h-5 text-white" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.1em] mb-1">
                                Clinic
                              </p>
                              <p className="text-[17px] font-bold text-foreground truncate">
                                {doctorData.clinic}
                              </p>
                            </div>
                            <div
                              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                              style={{ background: "rgba(5,150,105,0.08)", color: "#059669" }}
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
                    { icon: Users, count: patientsConsulted.length, label: "Patients Consulted", gradient: "linear-gradient(135deg, #059669, #10b981)", bgGradient: "linear-gradient(145deg, #ecfdf5, #d1fae5)", iconColor: "#059669" },
                    { icon: CheckCircle, count: approvedRemedies.length, label: "Remedies Approved", gradient: "linear-gradient(135deg, #d97706, #f59e0b)", bgGradient: "linear-gradient(145deg, #fef3c7, #fde68a)", iconColor: "#d97706" },
                    { icon: BookOpen, count: blogs.length, label: "Blogs Published", gradient: "linear-gradient(135deg, #7c3aed, #8b5cf6)", bgGradient: "linear-gradient(145deg, #ede9fe, #ddd6fe)", iconColor: "#7c3aed" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="group relative rounded-2xl border border-white/60 p-6 text-center shadow-md transition-all duration-400 hover:shadow-xl hover:-translate-y-1 cursor-default overflow-hidden"
                      style={{ background: "linear-gradient(145deg, #ffffff, #f0fdf4)" }}
                    >
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
                      <p className="text-sm font-semibold text-foreground">Medical License Verified</p>
                      <p className="text-xs text-muted-foreground">Your credentials have been verified successfully</p>
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

            {/* Upcoming Appointments Tab */}
            {activeTab === "appointments" && (
              <div style={{ animation: "fadeInUp 0.4s ease-out" }}>
                <div
                  className="rounded-2xl overflow-hidden shadow-lg border border-white/60"
                  style={{ background: "linear-gradient(145deg, #ffffff 0%, #f0fdf4 100%)" }}
                >
                  <div
                    className="h-2"
                    style={{ background: "linear-gradient(90deg, #064e3b, #059669, #10b981, #34d399)" }}
                  />
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
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-foreground tracking-tight">Upcoming Appointments</h2>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {upcomingAppointments.length} appointments scheduled
                        </p>
                      </div>
                    </div>
                    <div
                      className="px-4 py-2 rounded-xl text-sm font-semibold"
                      style={{ background: "rgba(5,150,105,0.08)", color: "#059669" }}
                    >
                      Today: {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </div>
                  </div>

                  <div className="p-8 space-y-4">
                    {upcomingAppointments.map((appointment, index) => (
                      <div
                        key={appointment.id}
                        className="group relative p-5 rounded-2xl border border-transparent transition-all duration-300 hover:shadow-lg overflow-hidden"
                        style={{
                          background: `linear-gradient(145deg, ${appointment.status === "Confirmed" ? "#ecfdf5" : "#fffbeb"}, #ffffff)`,
                          borderColor: appointment.status === "Confirmed" ? "rgba(209,250,229,0.6)" : "rgba(253,230,138,0.6)",
                          animationDelay: `${index * 0.1}s`,
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
                        <div className="flex items-center justify-between relative z-10">
                          <div className="flex items-center gap-4">
                            <div
                              className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-md transition-all duration-300 group-hover:scale-110"
                              style={{
                                background: appointment.status === "Confirmed"
                                  ? "linear-gradient(135deg, #059669, #10b981)"
                                  : "linear-gradient(135deg, #d97706, #f59e0b)",
                              }}
                            >
                              <span className="text-white text-lg font-bold">
                                {appointment.patientName.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-bold text-foreground text-base">{appointment.patientName}</h3>
                              <p className="text-sm text-muted-foreground flex items-center gap-2 mt-0.5">
                                <AlertCircle className="w-3.5 h-3.5" />
                                {appointment.ailment}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-sm font-semibold text-foreground">{appointment.date}</p>
                              <p className="text-xs text-muted-foreground">{appointment.time}</p>
                            </div>
                            <span
                              className="text-xs px-3 py-1.5 rounded-full font-semibold"
                              style={
                                appointment.status === "Confirmed"
                                  ? { background: "rgba(5,150,105,0.12)", color: "#059669" }
                                  : { background: "rgba(217,119,6,0.12)", color: "#d97706" }
                              }
                            >
                              {appointment.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Patients Consulted Tab */}
            {activeTab === "patients" && (
              <div style={{ animation: "fadeInUp 0.4s ease-out" }}>
                <div
                  className="rounded-2xl overflow-hidden shadow-lg border border-white/60"
                  style={{ background: "linear-gradient(145deg, #ffffff 0%, #f0fdf4 100%)" }}
                >
                  <div
                    className="h-2"
                    style={{ background: "linear-gradient(90deg, #064e3b, #059669, #10b981, #34d399)" }}
                  />
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
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-foreground tracking-tight">Patients Consulted</h2>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {patientsConsulted.length} patients in your records
                        </p>
                      </div>
                    </div>
                    <div
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
                      style={{ background: "rgba(5,150,105,0.08)", color: "#059669" }}
                    >
                      <TrendingUp className="w-4 h-4" />
                      All Records
                    </div>
                  </div>

                  <div className="p-8">
                    {/* Table Header */}
                    <div className="grid grid-cols-4 gap-4 px-5 py-3 rounded-xl mb-3" style={{ background: "rgba(5,150,105,0.05)" }}>
                      <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.1em]">Patient</span>
                      <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.1em]">Ailment</span>
                      <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.1em]">Last Visit</span>
                      <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.1em]">Status</span>
                    </div>
                    <div className="space-y-3">
                      {patientsConsulted.map((patient, index) => (
                        <div
                          key={patient.id}
                          className="group grid grid-cols-4 gap-4 items-center p-4 rounded-2xl border border-transparent transition-all duration-300 hover:shadow-md overflow-hidden"
                          style={{
                            background: "linear-gradient(145deg, #f0fdf4, #ffffff)",
                            borderColor: "rgba(209,250,229,0.6)",
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-all duration-300 group-hover:scale-105"
                              style={{ background: "linear-gradient(135deg, #059669, #10b981)" }}
                            >
                              <span className="text-white text-sm font-bold">{patient.name.charAt(0)}</span>
                            </div>
                            <span className="font-semibold text-foreground text-sm">{patient.name}</span>
                          </div>
                          <span className="text-sm text-foreground">{patient.ailment}</span>
                          <span className="text-sm text-muted-foreground">{patient.lastVisit}</span>
                          <span
                            className="text-xs px-3 py-1.5 rounded-full font-semibold w-fit"
                            style={
                              patient.status === "Treated"
                                ? { background: "rgba(5,150,105,0.12)", color: "#059669" }
                                : patient.status === "Follow-up"
                                ? { background: "rgba(217,119,6,0.12)", color: "#d97706" }
                                : { background: "rgba(124,58,237,0.12)", color: "#7c3aed" }
                            }
                          >
                            {patient.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Verifications Tab */}
            {activeTab === "pending" && (
              <div style={{ animation: "fadeInUp 0.4s ease-out" }}>
                <div
                  className="rounded-2xl overflow-hidden shadow-lg border border-white/60"
                  style={{ background: "linear-gradient(145deg, #ffffff 0%, #f0fdf4 100%)" }}
                >
                  <div
                    className="h-2"
                    style={{ background: "linear-gradient(90deg, #064e3b, #059669, #10b981, #34d399)" }}
                  />
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
                        style={{ background: "linear-gradient(135deg, #d97706, #f59e0b)" }}
                      >
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-foreground tracking-tight">Remedy Verifications</h2>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {pendingVerifications.length} pending for your review
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    {pendingVerifications.length === 0 ? (
                      <div className="text-center py-16">
                        <div
                          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                          style={{ background: "linear-gradient(135deg, #ecfdf5, #d1fae5)" }}
                        >
                          <CheckCircle className="w-8 h-8 text-emerald-500" />
                        </div>
                        <p className="text-muted-foreground mb-2 text-lg font-semibold">All caught up!</p>
                        <p className="text-sm text-muted-foreground">No pending verifications at the moment.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {pendingVerifications.map((remedy) => (
                          <div
                            key={remedy.id}
                            className="group p-5 rounded-2xl border border-transparent transition-all duration-300 hover:shadow-lg overflow-hidden"
                            style={{
                              background: "linear-gradient(145deg, #fffbeb, #ffffff)",
                              borderColor: "rgba(253,230,138,0.6)",
                            }}
                          >
                            <div className="flex items-start gap-4">
                              <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm mt-0.5"
                                style={{ background: "linear-gradient(135deg, #d97706, #f59e0b)" }}
                              >
                                <AlertCircle className="w-5 h-5 text-white" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-bold text-foreground mb-1">{remedy.title}</h3>
                                <p className="text-sm text-muted-foreground mb-1">{remedy.ailment}</p>
                                <p className="text-sm text-foreground mb-4 leading-relaxed">{remedy.description}</p>
                                <div className="flex gap-3">
                                  <Button
                                    onClick={() => handleVerifyRemedy(remedy.id)}
                                    className="gap-2 rounded-xl shadow-md text-sm"
                                    style={{ background: "linear-gradient(135deg, #059669, #10b981)" }}
                                  >
                                    <ThumbsUp className="w-4 h-4" />
                                    Verify
                                  </Button>
                                  <Button
                                    onClick={() => handleRejectRemedy(remedy.id)}
                                    variant="outline"
                                    className="gap-2 rounded-xl text-sm hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                                  >
                                    <ThumbsDown className="w-4 h-4" />
                                    Reject
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Approved Remedies Tab */}
            {activeTab === "approved" && (
              <div style={{ animation: "fadeInUp 0.4s ease-out" }}>
                <div
                  className="rounded-2xl overflow-hidden shadow-lg border border-white/60"
                  style={{ background: "linear-gradient(145deg, #ffffff 0%, #f0fdf4 100%)" }}
                >
                  <div
                    className="h-2"
                    style={{ background: "linear-gradient(90deg, #064e3b, #059669, #10b981, #34d399)" }}
                  />
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
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-foreground tracking-tight">Your Remedies</h2>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {approvedRemedies.length} remedies approved and published
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 space-y-4">
                    {approvedRemedies.map((remedy, index) => (
                      <div
                        key={remedy.id}
                        className="group p-5 rounded-2xl border border-transparent transition-all duration-300 hover:shadow-lg overflow-hidden"
                        style={{
                          background: "linear-gradient(145deg, #ecfdf5, #ffffff)",
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
                        <div className="flex items-center justify-between relative z-10">
                          <div className="flex items-center gap-4">
                            <div
                              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-all duration-300 group-hover:scale-105"
                              style={{ background: "linear-gradient(135deg, #059669, #10b981)" }}
                            >
                              <Leaf className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h3 className="font-bold text-foreground">{remedy.title}</h3>
                              <p className="text-sm text-muted-foreground mt-0.5">
                                {remedy.ailment} · Approved on {remedy.approvedDate}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span
                              className="flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-full"
                              style={{ background: "rgba(239,68,68,0.08)", color: "#ef4444" }}
                            >
                              <Heart className="w-3.5 h-3.5" />
                              {remedy.likes}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Your Blogs Tab */}
            {activeTab === "blogs" && (
              <div style={{ animation: "fadeInUp 0.4s ease-out" }}>
                <div
                  className="rounded-2xl overflow-hidden shadow-lg border border-white/60"
                  style={{ background: "linear-gradient(145deg, #ffffff 0%, #f0fdf4 100%)" }}
                >
                  <div
                    className="h-2"
                    style={{ background: "linear-gradient(90deg, #064e3b, #059669, #10b981, #34d399)" }}
                  />
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
                        style={{ background: "linear-gradient(135deg, #7c3aed, #8b5cf6)" }}
                      >
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-foreground tracking-tight">Your Blogs</h2>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          Share medical knowledge with your patients
                        </p>
                      </div>
                    </div>
                    <Link href="/doctor-blogs">
                      <Button
                        className="gap-2 rounded-xl px-6 py-2.5 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] text-sm font-semibold"
                        style={{ background: "linear-gradient(135deg, #064e3b, #059669)" }}
                      >
                        <BookOpen className="w-4 h-4" />
                        Manage Blogs
                      </Button>
                    </Link>
                  </div>

                  <div className="p-8">
                    {blogs.length === 0 ? (
                      <div className="text-center py-16">
                        <div
                          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                          style={{ background: "linear-gradient(135deg, #ede9fe, #ddd6fe)" }}
                        >
                          <BookOpen className="w-8 h-8 text-purple-500" />
                        </div>
                        <p className="text-muted-foreground mb-2 text-lg font-semibold">No blogs yet</p>
                        <p className="text-sm text-muted-foreground mb-6">
                          Share your medical expertise with the community
                        </p>
                        <Link href="/doctor-blogs">
                          <Button
                            className="rounded-xl shadow-md"
                            style={{ background: "linear-gradient(135deg, #064e3b, #059669)" }}
                          >
                            Create Your First Blog
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {blogs.slice(0, 3).map((blog: any) => (
                          <div
                            key={blog.id}
                            className="group p-5 rounded-2xl border border-transparent transition-all duration-300 hover:shadow-lg overflow-hidden"
                            style={{
                              background: "linear-gradient(145deg, #f5f3ff, #ffffff)",
                              borderColor: "rgba(221,214,254,0.6)",
                            }}
                          >
                            <div className="flex items-start gap-4">
                              <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm mt-0.5"
                                style={{ background: "linear-gradient(135deg, #7c3aed, #8b5cf6)" }}
                              >
                                <FileText className="w-5 h-5 text-white" />
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between items-start mb-1">
                                  <h3 className="font-bold text-foreground">{blog.title}</h3>
                                  <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">
                                    {blog.topic}
                                  </span>
                                </div>
                                <p className="text-sm text-foreground line-clamp-2 mb-2 leading-relaxed">{blog.content}</p>
                                <div className="flex justify-between text-xs text-muted-foreground">
                                  <span>{blog.date}</span>
                                  <span className="flex items-center gap-1">
                                    <Heart className="w-3 h-3" />
                                    {blog.likes} likes
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Saved Remedies Tab */}
            {activeTab === "saved" && (
              <div style={{ animation: "fadeInUp 0.4s ease-out" }}>
                <div
                  className="rounded-2xl overflow-hidden shadow-lg border border-white/60"
                  style={{ background: "linear-gradient(145deg, #ffffff 0%, #f0fdf4 100%)" }}
                >
                  <div
                    className="h-2"
                    style={{ background: "linear-gradient(90deg, #064e3b, #059669, #10b981, #34d399)" }}
                  />
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
                        style={{ background: "linear-gradient(135deg, #d97706, #f59e0b)" }}
                      >
                        <Bookmark className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-foreground tracking-tight">Saved Remedies</h2>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {savedRemedies.length} remedies bookmarked for reference
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    {savedRemedies.length === 0 ? (
                      <div className="text-center py-16">
                        <div
                          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                          style={{ background: "linear-gradient(135deg, #fef3c7, #fde68a)" }}
                        >
                          <Bookmark className="w-8 h-8 text-amber-500" />
                        </div>
                        <p className="text-muted-foreground mb-2 text-lg font-semibold">No saved remedies yet</p>
                        <p className="text-sm text-muted-foreground mb-6">
                          Browse ailments and save remedies for quick reference
                        </p>
                        <Link href="/browse-ailments">
                          <Button
                            className="rounded-xl shadow-md"
                            style={{ background: "linear-gradient(135deg, #064e3b, #059669)" }}
                          >
                            Browse Ailments & Save Remedies
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {savedRemedies.map((remedy: any, idx: number) => (
                          <div
                            key={idx}
                            className="group p-5 rounded-2xl border border-transparent transition-all duration-300 hover:shadow-lg overflow-hidden"
                            style={{
                              background: "linear-gradient(145deg, #fffbeb, #ffffff)",
                              borderColor: "rgba(253,230,138,0.6)",
                            }}
                          >
                            <div className="flex items-center gap-4">
                              <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-all duration-300 group-hover:scale-105"
                                style={{ background: "linear-gradient(135deg, #d97706, #f59e0b)" }}
                              >
                                <Bookmark className="w-5 h-5 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-foreground mb-0.5">{remedy.title}</h3>
                                <p className="text-sm text-muted-foreground">{remedy.ailment}</p>
                              </div>
                              <span className="text-xs text-muted-foreground whitespace-nowrap">
                                Saved on {remedy.date}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </DoctorRouteGuard>
  )
}
