"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Leaf,
  LayoutDashboard,
  ShieldCheck,
  Users,
  FileWarning,
  TicketCheck,
  Database,
  LogOut,
  Menu,
  X,
  Eye,
  Trash2,
  UserX,
  UserCheck,
  Plus,
  ChevronDown,
  FileText,
  AlertTriangle,
  Clock,
  CheckCircle,
  TrendingUp,
  Activity,
  Search,
} from "lucide-react"

// ───────────────────── Types ─────────────────────

type TabId = "dashboard" | "kyc" | "users" | "content" | "tickets" | "master"

interface SidebarItem {
  id: TabId
  label: string
  icon: React.ReactNode
}

interface Ticket {
  id: number
  subject: string
  user: string
  status: "Open" | "In Progress" | "Resolved"
  date: string
  priority: "Low" | "Medium" | "High"
}

type AppUser = {
  id: number
  name: string
  email: string
  type: "User" | "Doctor"
  status: "Active" | "Suspended" | "Banned"
  joined: string
}

// ───────────────────── Mock Data ─────────────────────

const initialPendingDoctors = [
  { id: 1, name: "Dr. Meera Patel", specialization: "Ayurveda", license: "AYU-2024-00382", doc: "degree_meera.pdf" },
  { id: 2, name: "Dr. Ravi Shankar", specialization: "Naturopathy", license: "NAT-2023-01199", doc: "cert_ravi.pdf" },
  { id: 3, name: "Dr. Ananya Das", specialization: "Homeopathy", license: "HOM-2025-00045", doc: "license_ananya.pdf" },
  { id: 4, name: "Dr. Kiran Joshi", specialization: "Dietetics", license: "DIT-2024-00716", doc: "degree_kiran.pdf" },
]

const initialUsers: AppUser[] = [
  { id: 1, name: "Savleen Kaur", email: "savleen@example.com", type: "User", status: "Active", joined: "Jan 12, 2026" },
  { id: 2, name: "Dr. Meera Patel", email: "meera@clinic.com", type: "Doctor", status: "Active", joined: "Feb 3, 2026" },
  { id: 3, name: "Arjun Mehta", email: "arjun@mail.com", type: "User", status: "Suspended", joined: "Mar 1, 2026" },
  { id: 4, name: "Dr. Ravi Shankar", email: "ravi@health.org", type: "Doctor", status: "Active", joined: "Dec 20, 2025" },
  { id: 5, name: "Priyanka Reddy", email: "priyanka@mail.com", type: "User", status: "Active", joined: "Mar 15, 2026" },
  { id: 6, name: "Dr. Ananya Das", email: "ananya@homeo.com", type: "Doctor", status: "Banned", joined: "Nov 8, 2025" },
]

const initialContent = [
  { id: 1, type: "Remedy" as const, title: "Bleach gargle for sore throat", author: "user_2389", ailment: "Sore Throat", flagged: true, date: "Mar 26, 2026" },
  { id: 2, type: "Comment" as const, title: "This is a scam product, buy mine instead…", author: "spam_account", ailment: "—", flagged: true, date: "Mar 27, 2026" },
  { id: 3, type: "Remedy" as const, title: "Hydrogen peroxide for acne", author: "user_8712", ailment: "Acne", flagged: true, date: "Mar 25, 2026" },
  { id: 4, type: "Comment" as const, title: "Abusive language directed at doctor", author: "toxic_42", ailment: "—", flagged: true, date: "Mar 28, 2026" },
]

const initialTickets: Ticket[] = [
  { id: 1, subject: "Cannot upload profile picture", user: "savleen@example.com", status: "Open", date: "Mar 28, 2026", priority: "Medium" },
  { id: 2, subject: "Doctor verification taking too long", user: "ravi@health.org", status: "In Progress", date: "Mar 27, 2026", priority: "High" },
  { id: 3, subject: "Incorrect BMI calculation", user: "arjun@mail.com", status: "Open", date: "Mar 26, 2026", priority: "Low" },
  { id: 4, subject: "Payment issue for consultation", user: "priyanka@mail.com", status: "Resolved", date: "Mar 25, 2026", priority: "High" },
  { id: 5, subject: "Feature request: Dark mode", user: "user789@mail.com", status: "Open", date: "Mar 24, 2026", priority: "Low" },
]

const initialAilments = [
  "Acne", "Acid Reflux", "Anxiety", "Back Pain", "Cold and Flu",
  "Diabetes", "Headache", "Insomnia", "Joint Pain", "Migraine",
  "Nausea", "Sore Throat", "Skin Irritation",
]

// ───────────────────── Sidebar Tabs ─────────────────────

const sidebarItems: SidebarItem[] = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
  { id: "kyc", label: "Doctor KYC", icon: <ShieldCheck className="w-5 h-5" /> },
  { id: "users", label: "User Management", icon: <Users className="w-5 h-5" /> },
  { id: "content", label: "Content Moderation", icon: <FileWarning className="w-5 h-5" /> },
  { id: "tickets", label: "Support Tickets", icon: <TicketCheck className="w-5 h-5" /> },
  { id: "master", label: "Master Data", icon: <Database className="w-5 h-5" /> },
]

// ═══════════════════  MAIN COMPONENT  ═══════════════════

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // ── Shared state lifted to top so views are stateful ──
  const [pendingDoctors, setPendingDoctors] = useState(initialPendingDoctors)
  const [users, setUsers] = useState(initialUsers)
  const [content, setContent] = useState(initialContent)
  const [tickets, setTickets] = useState(initialTickets)
  const [ailments, setAilments] = useState(initialAilments)

  const switchTab = (id: TabId) => {
    setActiveTab(id)
    setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* ─── Mobile overlay ─── */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ═══════════  SIDEBAR  ═══════════ */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-card border-r border-border flex flex-col transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-border shrink-0">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-secondary">
            <Leaf className="w-5 h-5" />
            <span className="font-heading">Healthyify</span>
          </Link>
          <button className="lg:hidden text-foreground" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role label */}
        <div className="px-5 py-3 border-b border-border">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Admin Panel</span>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => switchTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === item.id
                  ? "bg-secondary text-secondary-foreground shadow-sm"
                  : "text-foreground hover:bg-secondary/10"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-border">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-destructive/10 hover:text-destructive transition-all"
          >
            <LogOut className="w-5 h-5" />
            Exit Admin
          </Link>
        </div>
      </aside>

      {/* ═══════════  MAIN  ═══════════ */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-20 h-16 bg-card border-b border-border flex items-center px-4 lg:px-8 shrink-0">
          <button className="lg:hidden mr-3 text-foreground" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold text-primary font-heading">
            {sidebarItems.find((i) => i.id === activeTab)?.label}
          </h1>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          {activeTab === "dashboard" && <DashboardHome pendingCount={pendingDoctors.length} userCount={users.length} ticketCount={tickets.filter((t) => t.status !== "Resolved").length} />}
          {activeTab === "kyc" && <DoctorKYC doctors={pendingDoctors} setDoctors={setPendingDoctors} />}
          {activeTab === "users" && <UserManagement users={users} setUsers={setUsers} />}
          {activeTab === "content" && <ContentModeration content={content} setContent={setContent} />}
          {activeTab === "tickets" && <SupportTickets tickets={tickets} setTickets={setTickets} />}
          {activeTab === "master" && <MasterData ailments={ailments} setAilments={setAilments} />}
        </main>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════
//  1 ·  Dashboard Home
// ═══════════════════════════════════════════════════════

function DashboardHome({ pendingCount, userCount, ticketCount }: { pendingCount: number; userCount: number; ticketCount: number }) {
  const metrics = [
    { label: "Total Active Users", value: "2,847", icon: <Users className="w-6 h-6" />, color: "text-secondary", bg: "bg-secondary/10" },
    { label: "Pending Verifications", value: String(pendingCount), icon: <ShieldCheck className="w-6 h-6" />, color: "text-accent", bg: "bg-accent/10" },
    { label: "Open Support Tickets", value: String(ticketCount), icon: <TicketCheck className="w-6 h-6" />, color: "text-destructive", bg: "bg-destructive/10" },
    { label: "Remedies Submitted", value: "1,234", icon: <FileText className="w-6 h-6" />, color: "text-primary", bg: "bg-primary/10" },
    { label: "Doctors Onboarded", value: "186", icon: <Activity className="w-6 h-6" />, color: "text-secondary", bg: "bg-secondary/10" },
    { label: "Monthly Growth", value: "+12.4%", icon: <TrendingUp className="w-6 h-6" />, color: "text-emerald-600", bg: "bg-emerald-100" },
  ]

  return (
    <div className="space-y-8">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {metrics.map((m) => (
          <Card key={m.label} className="hover:shadow-md transition">
            <CardContent className="pt-6 flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl ${m.bg} flex items-center justify-center shrink-0 ${m.color}`}>
                {m.icon}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{m.label}</p>
                <p className="text-2xl font-bold text-foreground mt-0.5">{m.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick-glance activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { text: "Dr. Kiran Joshi submitted KYC documents", time: "2 hours ago", icon: <ShieldCheck className="w-4 h-4 text-accent" /> },
              { text: "New remedy flagged for moderation", time: "4 hours ago", icon: <AlertTriangle className="w-4 h-4 text-destructive" /> },
              { text: "Support ticket #2 moved to In Progress", time: "6 hours ago", icon: <Clock className="w-4 h-4 text-secondary" /> },
              { text: "User savleen@example.com updated profile", time: "8 hours ago", icon: <Users className="w-4 h-4 text-primary" /> },
              { text: "New ailment 'Migraine' added to master data", time: "1 day ago", icon: <Database className="w-4 h-4 text-secondary" /> },
            ].map((a, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/20 transition">
                <div className="w-8 h-8 rounded-full bg-muted/30 flex items-center justify-center shrink-0">{a.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground truncate">{a.text}</p>
                  <p className="text-xs text-muted-foreground">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ═══════════════════════════════════════════════════════
//  2 ·  Doctor KYC
// ═══════════════════════════════════════════════════════

function DoctorKYC({
  doctors,
  setDoctors,
}: {
  doctors: typeof initialPendingDoctors
  setDoctors: React.Dispatch<React.SetStateAction<typeof initialPendingDoctors>>
}) {
  const [reviewDoctor, setReviewDoctor] = useState<(typeof initialPendingDoctors)[0] | null>(null)

  const handleAction = (id: number) => {
    setDoctors((prev) => prev.filter((d) => d.id !== id))
    setReviewDoctor(null)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Pending Doctor Verifications</CardTitle>
        </CardHeader>
        <CardContent>
          {doctors.length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle className="w-12 h-12 text-secondary mx-auto mb-3 opacity-60" />
              <p className="text-muted-foreground">All doctor verifications are complete!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="pb-3 font-semibold text-muted-foreground">Name</th>
                    <th className="pb-3 font-semibold text-muted-foreground">Specialization</th>
                    <th className="pb-3 font-semibold text-muted-foreground">License Number</th>
                    <th className="pb-3 font-semibold text-muted-foreground text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors.map((doc) => (
                    <tr key={doc.id} className="border-b border-border last:border-0 hover:bg-muted/10 transition">
                      <td className="py-3.5 font-medium text-foreground">{doc.name}</td>
                      <td className="py-3.5 text-foreground">{doc.specialization}</td>
                      <td className="py-3.5">
                        <code className="px-2 py-0.5 bg-secondary/10 text-secondary rounded text-xs font-mono">{doc.license}</code>
                      </td>
                      <td className="py-3.5 text-right">
                        <Button size="sm" onClick={() => setReviewDoctor(doc)} className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                          <Eye className="w-4 h-4 mr-1.5" />
                          Review
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Review Modal ── */}
      {reviewDoctor && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setReviewDoctor(null)}>
          <div className="bg-card rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="text-lg font-bold text-primary font-heading">KYC Review — {reviewDoctor.name}</h2>
              <button onClick={() => setReviewDoctor(null)} className="text-muted-foreground hover:text-foreground transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6 p-6">
              {/* Left — Document preview */}
              <div className="flex flex-col items-center justify-center bg-muted/20 rounded-lg border-2 border-dashed border-border p-8 min-h-65">
                <FileText className="w-16 h-16 text-muted-foreground/40 mb-3" />
                <p className="text-sm font-medium text-foreground mb-1">{reviewDoctor.doc}</p>
                <p className="text-xs text-muted-foreground">PDF / Image preview placeholder</p>
              </div>

              {/* Right — Details */}
              <div className="space-y-5">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Full Name</p>
                  <p className="text-foreground font-semibold">{reviewDoctor.name}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Specialization</p>
                  <p className="text-foreground">{reviewDoctor.specialization}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">License Number</p>
                  <code className="px-3 py-1.5 bg-secondary/10 text-secondary rounded-md text-sm font-mono inline-block">{reviewDoctor.license}</code>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button onClick={() => handleAction(reviewDoctor.id)} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white">
                    <CheckCircle className="w-4 h-4 mr-1.5" />
                    Approve
                  </Button>
                  <Button onClick={() => handleAction(reviewDoctor.id)} className="flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                    <X className="w-4 h-4 mr-1.5" />
                    Reject
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// ═══════════════════════════════════════════════════════
//  3 ·  User Management
// ═══════════════════════════════════════════════════════

function UserManagement({
  users,
  setUsers,
}: {
  users: AppUser[]
  setUsers: React.Dispatch<React.SetStateAction<AppUser[]>>
}) {
  const [searchTerm, setSearchTerm] = useState("")

  const cycleStatus = (id: number) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== id) return u
        const next: AppUser["status"] =
          u.status === "Active" ? "Suspended" : u.status === "Suspended" ? "Banned" : "Active"
        return { ...u, status: next }
      })
    )
  }

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const statusStyles: Record<string, string> = {
    Active: "bg-emerald-100 text-emerald-700",
    Suspended: "bg-amber-100 text-amber-700",
    Banned: "bg-red-100 text-red-700",
  }

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <CardTitle className="text-lg">All Users &amp; Doctors</CardTitle>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name or email…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-card text-foreground text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary transition"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-3 font-semibold text-muted-foreground">Name</th>
                <th className="pb-3 font-semibold text-muted-foreground">Email</th>
                <th className="pb-3 font-semibold text-muted-foreground">Type</th>
                <th className="pb-3 font-semibold text-muted-foreground">Joined</th>
                <th className="pb-3 font-semibold text-muted-foreground">Status</th>
                <th className="pb-3 font-semibold text-muted-foreground text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr key={user.id} className="border-b border-border last:border-0 hover:bg-muted/10 transition">
                  <td className="py-3.5 font-medium text-foreground">{user.name}</td>
                  <td className="py-3.5 text-foreground">{user.email}</td>
                  <td className="py-3.5">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${user.type === "Doctor" ? "bg-secondary/10 text-secondary" : "bg-primary/10 text-primary"}`}>
                      {user.type}
                    </span>
                  </td>
                  <td className="py-3.5 text-muted-foreground">{user.joined}</td>
                  <td className="py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyles[user.status]}`}>{user.status}</span>
                  </td>
                  <td className="py-3.5 text-right">
                    <button
                      onClick={() => cycleStatus(user.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                        user.status === "Active"
                          ? "bg-amber-50 text-amber-700 hover:bg-amber-100"
                          : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                      }`}
                    >
                      {user.status === "Active" ? (
                        <>
                          <UserX className="w-3.5 h-3.5" />
                          Suspend
                        </>
                      ) : (
                        <>
                          <UserCheck className="w-3.5 h-3.5" />
                          Reactivate
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No users match your search.</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// ═══════════════════════════════════════════════════════
//  4 ·  Content Moderation
// ═══════════════════════════════════════════════════════

function ContentModeration({
  content,
  setContent,
}: {
  content: typeof initialContent
  setContent: React.Dispatch<React.SetStateAction<typeof initialContent>>
}) {
  const removeItem = (id: number) => {
    setContent((prev) => prev.filter((c) => c.id !== id))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-destructive" />
          Flagged Content
        </CardTitle>
      </CardHeader>
      <CardContent>
        {content.length === 0 ? (
          <div className="text-center py-12">
            <CheckCircle className="w-12 h-12 text-secondary mx-auto mb-3 opacity-60" />
            <p className="text-muted-foreground">No flagged content. All clear!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-3 font-semibold text-muted-foreground">Type</th>
                  <th className="pb-3 font-semibold text-muted-foreground">Content</th>
                  <th className="pb-3 font-semibold text-muted-foreground">Author</th>
                  <th className="pb-3 font-semibold text-muted-foreground">Date</th>
                  <th className="pb-3 font-semibold text-muted-foreground text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {content.map((item) => (
                  <tr key={item.id} className="border-b border-border last:border-0 hover:bg-muted/10 transition">
                    <td className="py-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${item.type === "Remedy" ? "bg-accent/20 text-accent" : "bg-primary/10 text-primary"}`}>
                        {item.type}
                      </span>
                    </td>
                    <td className="py-3.5 text-foreground max-w-xs truncate">{item.title}</td>
                    <td className="py-3.5 text-muted-foreground font-mono text-xs">{item.author}</td>
                    <td className="py-3.5 text-muted-foreground">{item.date}</td>
                    <td className="py-3.5 text-right">
                      <Button size="sm" onClick={() => removeItem(item.id)} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                        <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                        Delete / Hide
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// ═══════════════════════════════════════════════════════
//  5 ·  Support Tickets
// ═══════════════════════════════════════════════════════

function SupportTickets({
  tickets,
  setTickets,
}: {
  tickets: Ticket[]
  setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>
}) {
  const sorted = [...tickets].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const changeStatus = (id: number, newStatus: Ticket["status"]) => {
    setTickets((prev) => prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t)))
  }

  const statusIcon: Record<string, React.ReactNode> = {
    Open: <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />,
    "In Progress": <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />,
    Resolved: <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />,
  }

  const priorityStyles: Record<string, string> = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-amber-100 text-amber-700",
    Low: "bg-gray-100 text-gray-600",
  }

  return (
    <div className="space-y-4">
      {sorted.map((ticket) => (
        <Card key={ticket.id} className="hover:shadow-md transition">
          <CardContent className="pt-5 pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {statusIcon[ticket.status]}
                  <h3 className="font-semibold text-foreground truncate">{ticket.subject}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${priorityStyles[ticket.priority]}`}>{ticket.priority}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{ticket.user}</span>
                  <span>•</span>
                  <span>{ticket.date}</span>
                </div>
              </div>

              {/* Status dropdown */}
              <div className="relative shrink-0">
                <select
                  value={ticket.status}
                  onChange={(e) => changeStatus(ticket.id, e.target.value as any)}
                  className={`appearance-none pl-3 pr-8 py-1.5 rounded-lg border text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-secondary cursor-pointer ${
                    ticket.status === "Open"
                      ? "border-amber-300 bg-amber-50 text-amber-700"
                      : ticket.status === "In Progress"
                        ? "border-blue-300 bg-blue-50 text-blue-700"
                        : "border-emerald-300 bg-emerald-50 text-emerald-700"
                  }`}
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// ═══════════════════════════════════════════════════════
//  6 ·  Master Data (Taxonomy)
// ═══════════════════════════════════════════════════════

function MasterData({
  ailments,
  setAilments,
}: {
  ailments: string[]
  setAilments: React.Dispatch<React.SetStateAction<string[]>>
}) {
  const [newAilment, setNewAilment] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const addAilment = () => {
    const trimmed = newAilment.trim()
    if (!trimmed) return
    if (ailments.some((a) => a.toLowerCase() === trimmed.toLowerCase())) return
    setAilments((prev) => [...prev, trimmed].sort())
    setNewAilment("")
  }

  const removeAilment = (name: string) => {
    setAilments((prev) => prev.filter((a) => a !== name))
  }

  const filtered = ailments.filter((a) => a.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Add form */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-lg">Add New Ailment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <input
            type="text"
            value={newAilment}
            onChange={(e) => setNewAilment(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addAilment()}
            placeholder="e.g., Bronchitis"
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary transition"
          />
          <Button
            onClick={addAilment}
            disabled={!newAilment.trim()}
            className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Add Ailment
          </Button>
          <p className="text-xs text-muted-foreground">
            Total: <span className="font-semibold text-foreground">{ailments.length}</span> ailments in the database
          </p>
        </CardContent>
      </Card>

      {/* Ailments list */}
      <Card className="lg:col-span-2">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <CardTitle className="text-lg">Current Ailments</CardTitle>
          <div className="relative w-full sm:w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Filter…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-card text-foreground text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary transition"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {filtered.map((ailment) => (
              <span
                key={ailment}
                className="group inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary/10 text-secondary rounded-full text-sm font-medium hover:bg-secondary/20 transition"
              >
                {ailment}
                <button
                  onClick={() => removeAilment(ailment)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive/80"
                  title="Remove"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
            {filtered.length === 0 && (
              <p className="text-muted-foreground text-sm py-4">No ailments match your filter.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
