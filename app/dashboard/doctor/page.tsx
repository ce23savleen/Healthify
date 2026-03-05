"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, LogOut, Calendar, Users, CheckCircle, Clock, BookOpen, Bookmark } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

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
    { id: 1, name: "John Doe", lastVisit: "Oct 20, 2025", ailment: "Acne" },
    { id: 2, name: "Jane Smith", lastVisit: "Oct 18, 2025", ailment: "Back Pain" },
    { id: 3, name: "Mike Johnson", lastVisit: "Oct 15, 2025", ailment: "Headache" },
    { id: 4, name: "Sarah Williams", lastVisit: "Oct 12, 2025", ailment: "Anxiety" },
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-6 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Leaf className="w-6 h-6" />
            <span>Healthyify</span>
          </Link>
          <Button
            onClick={() => {
              logout()
              router.push("/")
            }}
            className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent border"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
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
                  onClick={() => setActiveTab("appointments")}
                  className={`w-full text-left px-4 py-2 rounded-lg transition ${
                    activeTab === "appointments" ? "bg-teal-600 text-white" : "text-foreground hover:bg-muted"
                  }`}
                >
                  Upcoming Appointments
                </button>
                <button
                  onClick={() => setActiveTab("patients")}
                  className={`w-full text-left px-4 py-2 rounded-lg transition ${
                    activeTab === "patients" ? "bg-teal-600 text-white" : "text-foreground hover:bg-muted"
                  }`}
                >
                  Patients Consulted
                </button>
                <button
                  onClick={() => setActiveTab("pending")}
                  className={`w-full text-left px-4 py-2 rounded-lg transition relative ${
                    activeTab === "pending" ? "bg-teal-600 text-white" : "text-foreground hover:bg-muted"
                  }`}
                >
                  Verifications
                  {pendingVerifications.length > 0 && (
                    <span className="absolute right-2 top-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {pendingVerifications.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("approved")}
                  className={`w-full text-left px-4 py-2 rounded-lg transition ${
                    activeTab === "approved" ? "bg-teal-600 text-white" : "text-foreground hover:bg-muted"
                  }`}
                >
                  Your Remedies
                </button>
                <button
                  onClick={() => setActiveTab("blogs")}
                  className={`w-full text-left px-4 py-2 rounded-lg transition ${
                    activeTab === "blogs" ? "bg-teal-600 text-white" : "text-foreground hover:bg-muted"
                  }`}
                >
                  Your Blogs
                </button>
                <button
                  onClick={() => setActiveTab("saved")}
                  className={`w-full text-left px-4 py-2 rounded-lg transition ${
                    activeTab === "saved" ? "bg-teal-600 text-white" : "text-foreground hover:bg-muted"
                  }`}
                >
                  Saved Remedies
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
                  <Button onClick={() => setIsEditing(!isEditing)} className="bg-teal-600 hover:bg-teal-700">
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
                          value={doctorData.name}
                          onChange={(e) => setDoctorData({ ...doctorData, name: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-foreground">Email</label>
                        <input
                          type="email"
                          value={doctorData.email}
                          onChange={(e) => setDoctorData({ ...doctorData, email: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-foreground">Phone</label>
                        <input
                          type="tel"
                          value={doctorData.phone}
                          onChange={(e) => setDoctorData({ ...doctorData, phone: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-foreground">Specialization</label>
                        <input
                          type="text"
                          value={doctorData.specialization}
                          onChange={(e) => setDoctorData({ ...doctorData, specialization: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-foreground">Qualifications</label>
                        <input
                          type="text"
                          value={doctorData.qualifications}
                          onChange={(e) => setDoctorData({ ...doctorData, qualifications: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-foreground">Experience</label>
                        <input
                          type="text"
                          value={doctorData.experience}
                          onChange={(e) => setDoctorData({ ...doctorData, experience: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-foreground">Clinic</label>
                        <input
                          type="text"
                          value={doctorData.clinic}
                          onChange={(e) => setDoctorData({ ...doctorData, clinic: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground mt-1"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <p className="text-sm text-muted-foreground">Name</p>
                        <p className="text-lg font-semibold text-foreground">{doctorData.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="text-lg font-semibold text-foreground">{doctorData.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="text-lg font-semibold text-foreground">{doctorData.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Specialization</p>
                        <p className="text-lg font-semibold text-foreground">{doctorData.specialization}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Qualifications</p>
                        <p className="text-lg font-semibold text-foreground">{doctorData.qualifications}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Experience</p>
                        <p className="text-lg font-semibold text-foreground">{doctorData.experience}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Clinic</p>
                        <p className="text-lg font-semibold text-foreground">{doctorData.clinic}</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Upcoming Appointments Tab */}
            {activeTab === "appointments" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Upcoming Appointments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="p-4 border border-border rounded-lg hover:shadow-md transition"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-foreground">{appointment.patientName}</h3>
                            <p className="text-sm text-muted-foreground">{appointment.ailment}</p>
                          </div>
                          <span
                            className={`text-xs px-2 py-1 rounded font-semibold ${
                              appointment.status === "Confirmed"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {appointment.status}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {appointment.date} at {appointment.time}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Patients Consulted Tab */}
            {activeTab === "patients" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Patients Consulted
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {patientsConsulted.map((patient) => (
                      <div key={patient.id} className="p-4 border border-border rounded-lg hover:shadow-md transition">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-foreground">{patient.name}</h3>
                            <p className="text-sm text-muted-foreground">Ailment: {patient.ailment}</p>
                          </div>
                          <span className="text-xs text-muted-foreground">{patient.lastVisit}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Verifications Tab */}
            {activeTab === "pending" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Remedy Verifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {pendingVerifications.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">No pending verifications at the moment.</p>
                  ) : (
                    <div className="space-y-4">
                      {pendingVerifications.map((remedy) => (
                        <div key={remedy.id} className="p-4 border border-border rounded-lg hover:shadow-md transition">
                          <div className="mb-3">
                            <h3 className="font-semibold text-foreground">{remedy.title}</h3>
                            <p className="text-sm text-muted-foreground">{remedy.ailment}</p>
                          </div>
                          <p className="text-sm text-foreground mb-3">{remedy.description}</p>
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleVerifyRemedy(remedy.id)}
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              Verify
                            </Button>
                            <Button
                              onClick={() => handleRejectRemedy(remedy.id)}
                              variant="outline"
                              className="bg-transparent"
                            >
                              Reject
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Approved Remedies Tab */}
            {activeTab === "approved" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Your Remedies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {approvedRemedies.map((remedy) => (
                      <div key={remedy.id} className="p-4 border border-border rounded-lg hover:shadow-md transition">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-foreground">{remedy.title}</h3>
                            <p className="text-sm text-muted-foreground">{remedy.ailment}</p>
                          </div>
                          <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded font-semibold">
                            {remedy.likes} likes
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">Approved on {remedy.approvedDate}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Your Blogs Tab */}
            {activeTab === "blogs" && (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      Your Blogs
                    </CardTitle>
                    <Link href="/doctor-blogs">
                      <Button className="bg-teal-600 hover:bg-teal-700">Manage Blogs</Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  {blogs.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">No blogs yet. Create your first blog!</p>
                  ) : (
                    <div className="space-y-4">
                      {blogs.slice(0, 3).map((blog) => (
                        <div key={blog.id} className="p-4 border border-border rounded-lg hover:shadow-md transition">
                          <h3 className="font-semibold text-foreground mb-1">{blog.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{blog.topic}</p>
                          <p className="text-sm text-foreground line-clamp-2 mb-2">{blog.content}</p>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{blog.date}</span>
                            <span>{blog.likes} likes</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Saved Remedies Tab */}
            {activeTab === "saved" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bookmark className="w-5 h-5" />
                    Saved Remedies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {savedRemedies.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">No saved remedies yet.</p>
                  ) : (
                    <div className="space-y-4">
                      {savedRemedies.map((remedy, idx) => (
                        <div key={idx} className="p-4 border border-border rounded-lg hover:shadow-md transition">
                          <h3 className="font-semibold text-foreground mb-1">{remedy.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{remedy.ailment}</p>
                          <p className="text-xs text-muted-foreground">Saved on {remedy.date}</p>
                        </div>
                      ))}
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
