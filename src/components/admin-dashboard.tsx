"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Leaf, LayoutDashboard, ShieldCheck, Users, FileWarning, TicketCheck, Database,
  LogOut, Menu, X, Eye, Trash2, Plus, ChevronDown, FileText, AlertTriangle,
  Clock, CheckCircle, TrendingUp, Activity, Search, Bell, Settings,
  UserCheck, UserX, Ban, Shield, Award, GraduationCap, Building2,
  Calendar, Mail, Phone, MapPin, Hash, ExternalLink, ChevronRight,
  ArrowUpRight, ArrowDownRight, Flame, Zap, Star,
} from "lucide-react"
import mockAilmentsData from "@/data/mockAilmentsData"
import { mergeAndSortByName, slugifyAilmentName } from "@/lib/ailment-utils"
import type { AilmentApiResponse, AilmentRecord, CreateAilmentRequest } from "@/types/ailment"

// ─── Types ───
type TabId = "dashboard" | "kyc" | "users" | "content" | "tickets" | "master"

interface SidebarItem { id: TabId; label: string; icon: React.ReactNode; badge?: number }
interface Ticket { id: number; subject: string; user: string; status: "Open" | "In Progress" | "Resolved"; date: string; priority: "Low" | "Medium" | "High" }
type UserStatus = "Active" | "Inactive" | "Banned"
type AppUser = { id: number; name: string; email: string; type: "User" | "Doctor"; status: UserStatus; joined: string; avatar?: string }
interface MasterAilment extends AilmentRecord { source: "static" | "dynamic" }

// ─── Mock Data ───
const initialPendingDoctors = [
  { id: 1, name: "Dr. Meera Patel", email: "meera@clinic.com", specialization: "Ayurveda", license: "AYU-2024-00382", medicalCouncil: "Central Council of Indian Medicine (CCIM)", qualifications: "BAMS, MD (Ayurveda)", experience: "8 years", registrationDate: "Mar 15, 2026", doc: "degree_certificate_meera.pdf", phone: "+91 98765 43210", clinic: "Patel Ayurveda Clinic, Mumbai" },
  { id: 2, name: "Dr. Ravi Shankar", email: "ravi@health.org", specialization: "Naturopathy", license: "NAT-2023-01199", medicalCouncil: "Indian Naturopathy & Yoga Board", qualifications: "BNYS, DNB", experience: "12 years", registrationDate: "Mar 10, 2026", doc: "naturopathy_license_ravi.pdf", phone: "+91 87654 32109", clinic: "Nature Cure Hospital, Delhi" },
  { id: 3, name: "Dr. Ananya Das", email: "ananya@homeo.com", specialization: "Homeopathy", license: "HOM-2025-00045", medicalCouncil: "Central Council of Homeopathy (CCH)", qualifications: "BHMS, MD (Homeopathy)", experience: "5 years", registrationDate: "Mar 20, 2026", doc: "homeopathy_cert_ananya.pdf", phone: "+91 76543 21098", clinic: "Das Homeo Care, Kolkata" },
  { id: 4, name: "Dr. Kiran Joshi", email: "kiran@diet.in", specialization: "Dietetics", license: "DIT-2024-00716", medicalCouncil: "Indian Dietetic Association (IDA)", qualifications: "MSc Nutrition, RD", experience: "6 years", registrationDate: "Mar 25, 2026", doc: "dietetics_degree_kiran.pdf", phone: "+91 65432 10987", clinic: "NutriLife Clinic, Bangalore" },
]

const initialUsers: AppUser[] = [
  { id: 1, name: "Savleen Kaur", email: "savleen@example.com", type: "User", status: "Active", joined: "Jan 12, 2026" },
  { id: 2, name: "Dr. Meera Patel", email: "meera@clinic.com", type: "Doctor", status: "Active", joined: "Feb 3, 2026" },
  { id: 3, name: "Arjun Mehta", email: "arjun@mail.com", type: "User", status: "Inactive", joined: "Mar 1, 2026" },
  { id: 4, name: "Dr. Ravi Shankar", email: "ravi@health.org", type: "Doctor", status: "Active", joined: "Dec 20, 2025" },
  { id: 5, name: "Priyanka Reddy", email: "priyanka@mail.com", type: "User", status: "Active", joined: "Mar 15, 2026" },
  { id: 6, name: "Dr. Ananya Das", email: "ananya@homeo.com", type: "Doctor", status: "Banned", joined: "Nov 8, 2025" },
  { id: 7, name: "Rahul Sharma", email: "rahul@mail.com", type: "User", status: "Active", joined: "Mar 20, 2026" },
  { id: 8, name: "Dr. Kiran Joshi", email: "kiran@diet.in", type: "Doctor", status: "Inactive", joined: "Mar 22, 2026" },
]

const initialContent = [
  { id: 1, type: "Remedy" as const, title: "Bleach gargle for sore throat", author: "user_2389", ailment: "Sore Throat", flagged: true, date: "Mar 26, 2026", severity: "High" as const },
  { id: 2, type: "Comment" as const, title: "This is a scam product, buy mine instead…", author: "spam_account", ailment: "—", flagged: true, date: "Mar 27, 2026", severity: "Critical" as const },
  { id: 3, type: "Remedy" as const, title: "Hydrogen peroxide for acne", author: "user_8712", ailment: "Acne", flagged: true, date: "Mar 25, 2026", severity: "Medium" as const },
  { id: 4, type: "Comment" as const, title: "Abusive language directed at doctor", author: "toxic_42", ailment: "—", flagged: true, date: "Mar 28, 2026", severity: "High" as const },
]

const initialTickets: Ticket[] = [
  { id: 1, subject: "Cannot upload profile picture", user: "savleen@example.com", status: "Open", date: "Mar 28, 2026", priority: "Medium" },
  { id: 2, subject: "Doctor verification taking too long", user: "ravi@health.org", status: "In Progress", date: "Mar 27, 2026", priority: "High" },
  { id: 3, subject: "Incorrect BMI calculation", user: "arjun@mail.com", status: "Open", date: "Mar 26, 2026", priority: "Low" },
  { id: 4, subject: "Payment issue for consultation", user: "priyanka@mail.com", status: "Resolved", date: "Mar 25, 2026", priority: "High" },
]

const initialAilments: MasterAilment[] = Object.values(mockAilmentsData)
  .map((ailment) => ({
    id: `static-${ailment.slug}`,
    slug: ailment.slug,
    name: ailment.name,
    description: ailment.description,
    causes: ailment.causes,
    symptoms: ailment.symptoms,
    prevention: ailment.prevention,
    createdAt: new Date(0).toISOString(),
    updatedAt: new Date(0).toISOString(),
    source: "static" as const,
  }))
  .sort((a, b) => a.name.localeCompare(b.name))

// ─── Sidebar Tabs ───
const makeSidebarItems = (pCount: number, tCount: number): SidebarItem[] => [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
  { id: "kyc", label: "Doctor KYC", icon: <ShieldCheck className="w-5 h-5" />, badge: pCount || undefined },
  { id: "users", label: "User Management", icon: <Users className="w-5 h-5" /> },
  { id: "content", label: "Content Moderation", icon: <FileWarning className="w-5 h-5" /> },
  { id: "tickets", label: "Support Tickets", icon: <TicketCheck className="w-5 h-5" />, badge: tCount || undefined },
  { id: "master", label: "Master Data", icon: <Database className="w-5 h-5" /> },
]

// ═══════════ MAIN COMPONENT ═══════════
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [pendingDoctors, setPendingDoctors] = useState(initialPendingDoctors)
  const [users, setUsers] = useState(initialUsers)
  const [content, setContent] = useState(initialContent)
  const [tickets, setTickets] = useState(initialTickets)
  const [ailments, setAilments] = useState<MasterAilment[]>(initialAilments)

  const mergeWithStaticAilments = (dynamicAilments: AilmentRecord[]): MasterAilment[] => {
    const typedDynamicAilments: MasterAilment[] = dynamicAilments.map((ailment) => ({
      ...ailment,
      source: "dynamic",
    }))

    return mergeAndSortByName(initialAilments, typedDynamicAilments)
  }

  const refreshAilments = async () => {
    try {
      const response = await fetch("/api/ailments", { cache: "no-store" })
      if (!response.ok) {
        setAilments(initialAilments)
        return
      }

      const data = (await response.json()) as AilmentApiResponse
      setAilments(mergeWithStaticAilments(data.ailments))
    } catch (error) {
      console.error("Failed to fetch ailments", error)
      setAilments(initialAilments)
    }
  }

  useEffect(() => {
    void refreshAilments()
  }, [])

  const openTicketCount = tickets.filter(t => t.status !== "Resolved").length
  const sidebarItems = makeSidebarItems(pendingDoctors.length, openTicketCount)

  const switchTab = (id: TabId) => { setActiveTab(id); setSidebarOpen(false) }

  return (
    <div className="min-h-screen flex" style={{ background: "#f8faf9" }}>
      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />}

      {/* ═══ SIDEBAR ═══ */}
      <aside className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-65 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        style={{ background: "linear-gradient(180deg, #064e3b 0%, #022c22 100%)" }}>
        
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-5 shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #10b981, #059669)", boxShadow: "0 2px 8px rgba(16,185,129,0.4)" }}>
              <Leaf className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="font-bold text-lg text-white font-heading">Healthify</span>
          </Link>
          <button className="lg:hidden text-white/60 hover:text-white" onClick={() => setSidebarOpen(false)}><X className="w-5 h-5" /></button>
        </div>

        {/* Admin badge */}
        <div className="px-5 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}>A</div>
            <div>
              <p className="text-white text-sm font-semibold">Admin Panel</p>
              <p className="text-emerald-400/60 text-[11px]">Super Admin</p>
            </div>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {sidebarItems.map(item => (
            <button key={item.id} onClick={() => switchTab(item.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
              style={activeTab === item.id
                ? { background: "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(5,150,105,0.15))", color: "#6ee7b7", borderLeft: "3px solid #10b981" }
                : { color: "rgba(255,255,255,0.55)", borderLeft: "3px solid transparent" }}
              onMouseEnter={e => { if (activeTab !== item.id) e.currentTarget.style.color = "rgba(255,255,255,0.85)"; e.currentTarget.style.background = activeTab === item.id ? "" : "rgba(255,255,255,0.04)" }}
              onMouseLeave={e => { if (activeTab !== item.id) { e.currentTarget.style.color = "rgba(255,255,255,0.55)"; e.currentTarget.style.background = "transparent" } }}>
              {item.icon}
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white" style={{ background: "linear-gradient(135deg, #ef4444, #dc2626)" }}>{item.badge}</span>}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all" style={{ color: "rgba(255,255,255,0.45)" }}
            onMouseEnter={e => { e.currentTarget.style.color = "#fca5a5"; e.currentTarget.style.background = "rgba(239,68,68,0.1)" }}
            onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.45)"; e.currentTarget.style.background = "transparent" }}>
            <LogOut className="w-5 h-5" /> Exit Admin
          </Link>
        </div>
      </aside>

      {/* ═══ MAIN ═══ */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-20 h-16 flex items-center justify-between px-4 lg:px-8 shrink-0"
          style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(209,250,229,0.4)" }}>
          <div className="flex items-center gap-3">
            <button className="lg:hidden text-foreground" onClick={() => setSidebarOpen(true)}><Menu className="w-6 h-6" /></button>
            <h1 className="text-lg font-bold font-heading" style={{ color: "#064e3b" }}>{sidebarItems.find(i => i.id === activeTab)?.label}</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: "#f0fdf4", border: "1px solid #d1fae5" }}>
              <Search className="w-4 h-4" style={{ color: "#6b7280" }} />
              <input placeholder="Search..." className="bg-transparent text-sm outline-none w-32 placeholder-gray-400" style={{ color: "#374151" }} />
            </div>
            <button className="relative p-2 rounded-lg transition hover:bg-emerald-50">
              <Bell className="w-5 h-5" style={{ color: "#6b7280" }} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: "#ef4444" }} />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          {activeTab === "dashboard" && <DashboardHome pendingCount={pendingDoctors.length} userCount={users.length} ticketCount={openTicketCount} onNavigate={switchTab} />}
          {activeTab === "kyc" && <DoctorKYC doctors={pendingDoctors} setDoctors={setPendingDoctors} />}
          {activeTab === "users" && <UserManagement users={users} setUsers={setUsers} />}
          {activeTab === "content" && <ContentModeration content={content} setContent={setContent} />}
          {activeTab === "tickets" && <SupportTickets tickets={tickets} setTickets={setTickets} />}
          {activeTab === "master" && <MasterData ailments={ailments} setAilments={setAilments} refreshAilments={refreshAilments} />}
        </main>
      </div>
    </div>
  )
}

// ═══════════ 1 · DASHBOARD HOME ═══════════
function DashboardHome({ pendingCount, userCount, ticketCount, onNavigate }: { pendingCount: number; userCount: number; ticketCount: number; onNavigate: (id: TabId) => void }) {
  const metrics = [
    { label: "Total Active Users", value: "2,847", change: "+12.5%", up: true, icon: <Users className="w-6 h-6" />, gradient: "linear-gradient(135deg, #059669, #10b981)" },
    { label: "Pending Verifications", value: String(pendingCount), change: "+2 new", up: true, icon: <ShieldCheck className="w-6 h-6" />, gradient: "linear-gradient(135deg, #f59e0b, #fbbf24)" },
    { label: "Open Tickets", value: String(ticketCount), change: "-3 today", up: false, icon: <TicketCheck className="w-6 h-6" />, gradient: "linear-gradient(135deg, #ef4444, #f87171)" },
    { label: "Remedies Submitted", value: "1,234", change: "+8.2%", up: true, icon: <FileText className="w-6 h-6" />, gradient: "linear-gradient(135deg, #8b5cf6, #a78bfa)" },
    { label: "Doctors Onboarded", value: "186", change: "+14 this month", up: true, icon: <Activity className="w-6 h-6" />, gradient: "linear-gradient(135deg, #0891b2, #22d3ee)" },
    { label: "Monthly Growth", value: "+12.4%", change: "vs last month", up: true, icon: <TrendingUp className="w-6 h-6" />, gradient: "linear-gradient(135deg, #059669, #34d399)" },
  ]

  const activities = [
    { text: "Dr. Kiran Joshi submitted KYC documents", time: "2 hours ago", icon: <ShieldCheck className="w-4 h-4" />, color: "#f59e0b" },
    { text: "New remedy flagged for moderation", time: "4 hours ago", icon: <AlertTriangle className="w-4 h-4" />, color: "#ef4444" },
    { text: "Support ticket #2 moved to In Progress", time: "6 hours ago", icon: <Clock className="w-4 h-4" />, color: "#3b82f6" },
    { text: "User savleen@example.com updated profile", time: "8 hours ago", icon: <Users className="w-4 h-4" />, color: "#059669" },
    { text: "New ailment 'Migraine' added to master data", time: "1 day ago", icon: <Database className="w-4 h-4" />, color: "#8b5cf6" },
  ]

  return (
    <div className="space-y-8">
      {/* Metrics Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {metrics.map((m, i) => (
          <div key={m.label} className="relative overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1"
            style={{ background: "white", boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)", animation: `fadeInUp 0.5s ease ${i * 80}ms both` }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 30px rgba(5,150,105,0.12)" }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)" }}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: "#6b7280" }}>{m.label}</p>
                <p className="text-3xl font-bold mt-1" style={{ color: "#064e3b" }}>{m.value}</p>
                <div className="flex items-center gap-1 mt-2">
                  {m.up ? <ArrowUpRight className="w-3.5 h-3.5" style={{ color: "#059669" }} /> : <ArrowDownRight className="w-3.5 h-3.5" style={{ color: "#059669" }} />}
                  <span className="text-xs font-medium" style={{ color: "#059669" }}>{m.change}</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0" style={{ background: m.gradient, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
                {m.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Activity Timeline */}
        <div className="lg:col-span-3 rounded-2xl p-6" style={{ background: "white", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <h3 className="text-lg font-bold mb-5" style={{ color: "#064e3b" }}>Recent Activity</h3>
          <div className="space-y-4">
            {activities.map((a, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl transition hover:bg-emerald-50/50">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${a.color}15`, color: a.color }}>{a.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: "#374151" }}>{a.text}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-2 rounded-2xl p-6" style={{ background: "white", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <h3 className="text-lg font-bold mb-5" style={{ color: "#064e3b" }}>Quick Actions</h3>
          <div className="space-y-3">
            {[
              { label: "Review Doctor KYC", desc: `${pendingCount} pending`, tab: "kyc" as TabId, color: "#f59e0b", icon: <ShieldCheck className="w-5 h-5" /> },
              { label: "Manage Users", desc: `${userCount} total`, tab: "users" as TabId, color: "#059669", icon: <Users className="w-5 h-5" /> },
              { label: "Open Tickets", desc: `${ticketCount} unresolved`, tab: "tickets" as TabId, color: "#ef4444", icon: <TicketCheck className="w-5 h-5" /> },
              { label: "Content Moderation", desc: "4 flagged", tab: "content" as TabId, color: "#8b5cf6", icon: <FileWarning className="w-5 h-5" /> },
            ].map(a => (
              <button key={a.tab} onClick={() => onNavigate(a.tab)}
                className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                style={{ border: "1px solid #f0fdf4" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#f0fdf4"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(5,150,105,0.08)" }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.boxShadow = "none" }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${a.color}15`, color: a.color }}>{a.icon}</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold" style={{ color: "#064e3b" }}>{a.label}</p>
                  <p className="text-xs" style={{ color: "#9ca3af" }}>{a.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4" style={{ color: "#d1d5db" }} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ═══════════ 2 · DOCTOR KYC ═══════════
function DoctorKYC({ doctors, setDoctors }: { doctors: typeof initialPendingDoctors; setDoctors: React.Dispatch<React.SetStateAction<typeof initialPendingDoctors>> }) {
  const [reviewDoctor, setReviewDoctor] = useState<(typeof initialPendingDoctors)[0] | null>(null)
  const handleAction = (id: number) => { setDoctors(prev => prev.filter(d => d.id !== id)); setReviewDoctor(null) }

  return (
    <>
      <div className="rounded-2xl overflow-hidden" style={{ background: "white", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
        <div className="px-6 py-5 flex items-center justify-between" style={{ borderBottom: "1px solid #f0fdf4" }}>
          <div>
            <h3 className="text-lg font-bold" style={{ color: "#064e3b" }}>Pending Doctor Verifications</h3>
            <p className="text-sm mt-0.5" style={{ color: "#9ca3af" }}>{doctors.length} doctors awaiting KYC verification</p>
          </div>
          <div className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: doctors.length > 0 ? "#fef3c7" : "#d1fae5", color: doctors.length > 0 ? "#92400e" : "#047857" }}>
            {doctors.length > 0 ? `${doctors.length} Pending` : "All Clear"}
          </div>
        </div>

        {doctors.length === 0 ? (
          <div className="text-center py-16">
            <CheckCircle className="w-14 h-14 mx-auto mb-3" style={{ color: "#10b981", opacity: 0.5 }} />
            <p style={{ color: "#6b7280" }}>All doctor verifications complete!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "#f8fdf9", borderBottom: "1px solid #e5e7eb" }}>
                  {["Doctor", "Specialization", "License Number", "Medical Council", "Submitted", ""].map(h => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#6b7280" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {doctors.map(doc => (
                  <tr key={doc.id} className="transition hover:bg-emerald-50/30" style={{ borderBottom: "1px solid #f3f4f6" }}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: "linear-gradient(135deg, #059669, #10b981)" }}>
                          {doc.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-semibold" style={{ color: "#064e3b" }}>{doc.name}</p>
                          <p className="text-xs" style={{ color: "#9ca3af" }}>{doc.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: "#ecfdf5", color: "#047857" }}>{doc.specialization}</span>
                    </td>
                    <td className="px-6 py-4">
                      <code className="px-2.5 py-1 rounded-md text-xs font-mono font-semibold" style={{ background: "#f0f9ff", color: "#0369a1", border: "1px solid #bae6fd" }}>{doc.license}</code>
                    </td>
                    <td className="px-6 py-4 text-xs" style={{ color: "#6b7280" }}>{doc.medicalCouncil}</td>
                    <td className="px-6 py-4 text-xs" style={{ color: "#9ca3af" }}>{doc.registrationDate}</td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => setReviewDoctor(doc)} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white transition-all hover:scale-105 cursor-pointer"
                        style={{ background: "linear-gradient(135deg, #059669, #047857)", boxShadow: "0 2px 8px rgba(5,150,105,0.3)" }}>
                        <Eye className="w-3.5 h-3.5" /> Review KYC
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── KYC Review Modal ── */}
      {reviewDoctor && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setReviewDoctor(null)}>
          <div className="rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto" style={{ background: "white", boxShadow: "0 25px 60px rgba(0,0,0,0.25)" }} onClick={e => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4" style={{ background: "linear-gradient(135deg, #064e3b, #047857)", borderRadius: "1rem 1rem 0 0" }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-emerald-900" style={{ background: "rgba(255,255,255,0.9)" }}>
                  {reviewDoctor.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">KYC Verification</h2>
                  <p className="text-emerald-200 text-sm">{reviewDoctor.name}</p>
                </div>
              </div>
              <button onClick={() => setReviewDoctor(null)} className="text-white/60 hover:text-white transition cursor-pointer"><X className="w-5 h-5" /></button>
            </div>

            <div className="grid md:grid-cols-5 gap-0">
              {/* Left — Document Preview (2 cols) */}
              <div className="md:col-span-2 p-6 flex flex-col" style={{ background: "#f8fdf9", borderRight: "1px solid #e5e7eb" }}>
                <h4 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: "#6b7280" }}>Uploaded Certificate</h4>
                <div className="flex-1 flex flex-col items-center justify-center rounded-xl p-8 min-h-60" style={{ border: "2px dashed #d1fae5", background: "white" }}>
                  <FileText className="w-16 h-16 mb-3" style={{ color: "#10b981", opacity: 0.4 }} />
                  <p className="text-sm font-semibold text-center" style={{ color: "#064e3b" }}>{reviewDoctor.doc}</p>
                  <p className="text-xs text-center mt-1" style={{ color: "#9ca3af" }}>Certificate / Degree Document</p>
                  <button className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition cursor-pointer" style={{ background: "#ecfdf5", color: "#047857", border: "1px solid #a7f3d0" }}>
                    <ExternalLink className="w-3.5 h-3.5" /> View Full Document
                  </button>
                </div>
                <div className="mt-4 p-3 rounded-lg" style={{ background: "#fffbeb", border: "1px solid #fde68a" }}>
                  <p className="text-xs font-semibold" style={{ color: "#92400e" }}>⚠ Verify Authenticity</p>
                  <p className="text-xs mt-0.5" style={{ color: "#a16207" }}>Cross-check license with the issuing council before approval.</p>
                </div>
              </div>

              {/* Right — KYC Details (3 cols) */}
              <div className="md:col-span-3 p-6 space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: "#6b7280" }}>Doctor Information</h4>
                {[
                  { label: "Full Name", value: reviewDoctor.name, icon: <UserCheck className="w-4 h-4" /> },
                  { label: "Email", value: reviewDoctor.email, icon: <Mail className="w-4 h-4" /> },
                  { label: "Phone", value: reviewDoctor.phone, icon: <Phone className="w-4 h-4" /> },
                  { label: "Specialization", value: reviewDoctor.specialization, icon: <Award className="w-4 h-4" /> },
                  { label: "Qualifications", value: reviewDoctor.qualifications, icon: <GraduationCap className="w-4 h-4" /> },
                  { label: "Experience", value: reviewDoctor.experience, icon: <Clock className="w-4 h-4" /> },
                  { label: "License Number", value: reviewDoctor.license, icon: <Hash className="w-4 h-4" />, mono: true },
                  { label: "Medical Council", value: reviewDoctor.medicalCouncil, icon: <Shield className="w-4 h-4" /> },
                  { label: "Clinic", value: reviewDoctor.clinic, icon: <Building2 className="w-4 h-4" /> },
                  { label: "Registration Date", value: reviewDoctor.registrationDate, icon: <Calendar className="w-4 h-4" /> },
                ].map(f => (
                  <div key={f.label} className="flex items-start gap-3 py-2" style={{ borderBottom: "1px solid #f3f4f6" }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: "#f0fdf4", color: "#059669" }}>{f.icon}</div>
                    <div>
                      <p className="text-xs uppercase tracking-wider" style={{ color: "#9ca3af" }}>{f.label}</p>
                      {f.mono ? <code className="text-sm font-mono font-semibold" style={{ color: "#0369a1" }}>{f.value}</code> : <p className="text-sm font-semibold" style={{ color: "#064e3b" }}>{f.value}</p>}
                    </div>
                  </div>
                ))}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button onClick={() => handleAction(reviewDoctor.id)} className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.02] cursor-pointer"
                    style={{ background: "linear-gradient(135deg, #059669, #047857)", boxShadow: "0 4px 14px rgba(5,150,105,0.3)" }}>
                    <CheckCircle className="w-4 h-4" /> Approve
                  </button>
                  <button onClick={() => handleAction(reviewDoctor.id)} className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.02] cursor-pointer"
                    style={{ background: "linear-gradient(135deg, #ef4444, #dc2626)", boxShadow: "0 4px 14px rgba(239,68,68,0.3)" }}>
                    <X className="w-4 h-4" /> Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// ═══════════ 3 · USER MANAGEMENT ═══════════
function UserManagement({ users, setUsers }: { users: AppUser[]; setUsers: React.Dispatch<React.SetStateAction<AppUser[]>> }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<"All" | "User" | "Doctor">("All")
  const [statusFilter, setStatusFilter] = useState<"All" | UserStatus>("All")

  const changeStatus = (id: number, newStatus: UserStatus) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: newStatus } : u))
  }

  const filtered = users.filter(u =>
    (u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (typeFilter === "All" || u.type === typeFilter) &&
    (statusFilter === "All" || u.status === statusFilter)
  )

  const statusColors: Record<UserStatus, { bg: string; text: string; border: string; dot: string }> = {
    Active: { bg: "#ecfdf5", text: "#047857", border: "#a7f3d0", dot: "#10b981" },
    Inactive: { bg: "#fffbeb", text: "#92400e", border: "#fde68a", dot: "#f59e0b" },
    Banned: { bg: "#fef2f2", text: "#991b1b", border: "#fecaca", dot: "#ef4444" },
  }

  return (
    <div className="space-y-5">
      {/* Filters Row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#9ca3af" }} />
          <input type="text" placeholder="Search by name or email…" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none transition" style={{ background: "white", border: "1px solid #d1fae5", color: "#374151" }} />
        </div>
        <div className="flex gap-2 flex-wrap">
          {(["All", "User", "Doctor"] as const).map(t => (
            <button key={t} onClick={() => setTypeFilter(t)} className="px-3 py-2 rounded-lg text-xs font-semibold transition cursor-pointer"
              style={typeFilter === t ? { background: "#064e3b", color: "white" } : { background: "white", color: "#6b7280", border: "1px solid #e5e7eb" }}>{t}</button>
          ))}
          <div className="w-px" style={{ background: "#e5e7eb" }} />
          {(["All", "Active", "Inactive", "Banned"] as const).map(s => (
            <button key={s} onClick={() => setStatusFilter(s)} className="px-3 py-2 rounded-lg text-xs font-semibold transition cursor-pointer"
              style={statusFilter === s ? { background: "#064e3b", color: "white" } : { background: "white", color: "#6b7280", border: "1px solid #e5e7eb" }}>{s}</button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "white", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
        <div className="px-6 py-4" style={{ borderBottom: "1px solid #f0fdf4" }}>
          <h3 className="text-lg font-bold" style={{ color: "#064e3b" }}>All Users & Doctors</h3>
          <p className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>{filtered.length} of {users.length} users shown</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "#f8fdf9", borderBottom: "1px solid #e5e7eb" }}>
                {["User", "Email", "Type", "Joined", "Status", "Change Status"].map(h => (
                  <th key={h} className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#6b7280" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(user => {
                const sc = statusColors[user.status]
                return (
                  <tr key={user.id} className="transition hover:bg-emerald-50/30" style={{ borderBottom: "1px solid #f3f4f6" }}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                          style={{ background: user.type === "Doctor" ? "linear-gradient(135deg, #059669, #10b981)" : "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
                          {user.name.charAt(0)}
                        </div>
                        <span className="font-semibold" style={{ color: "#064e3b" }}>{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs" style={{ color: "#6b7280" }}>{user.email}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold"
                        style={{ background: user.type === "Doctor" ? "#ecfdf5" : "#eff6ff", color: user.type === "Doctor" ? "#047857" : "#1d4ed8" }}>{user.type}</span>
                    </td>
                    <td className="px-6 py-4 text-xs" style={{ color: "#9ca3af" }}>{user.joined}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: sc.bg, color: sc.text, border: `1px solid ${sc.border}` }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: sc.dot }} />
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative">
                        <select value={user.status} onChange={e => changeStatus(user.id, e.target.value as UserStatus)}
                          className="appearance-none pl-3 pr-8 py-2 rounded-lg text-xs font-semibold transition cursor-pointer outline-none"
                          style={{ background: sc.bg, color: sc.text, border: `1px solid ${sc.border}` }}>
                          <option value="Active">✅ Active</option>
                          <option value="Inactive">⏸️ Inactive</option>
                          <option value="Banned">🚫 Banned</option>
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" style={{ color: sc.text }} />
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {filtered.length === 0 && <p className="text-center py-10" style={{ color: "#9ca3af" }}>No users match your search.</p>}
        </div>
      </div>
    </div>
  )
}

// ═══════════ 4 · CONTENT MODERATION ═══════════
function ContentModeration({ content, setContent }: { content: typeof initialContent; setContent: React.Dispatch<React.SetStateAction<typeof initialContent>> }) {
  const removeItem = (id: number) => setContent(prev => prev.filter(c => c.id !== id))
  const sevColors: Record<string, { bg: string; text: string }> = {
    Critical: { bg: "#fef2f2", text: "#991b1b" }, High: { bg: "#fff7ed", text: "#9a3412" }, Medium: { bg: "#fffbeb", text: "#92400e" }, Low: { bg: "#f0fdf4", text: "#166534" },
  }

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "white", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
      <div className="px-6 py-5 flex items-center gap-3" style={{ borderBottom: "1px solid #f0fdf4" }}>
        <AlertTriangle className="w-5 h-5" style={{ color: "#ef4444" }} />
        <div>
          <h3 className="text-lg font-bold" style={{ color: "#064e3b" }}>Flagged Content</h3>
          <p className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>{content.length} items require moderation</p>
        </div>
      </div>
      {content.length === 0 ? (
        <div className="text-center py-16"><CheckCircle className="w-14 h-14 mx-auto mb-3" style={{ color: "#10b981", opacity: 0.5 }} /><p style={{ color: "#6b7280" }}>No flagged content. All clear!</p></div>
      ) : (
        <div className="divide-y" style={{ borderColor: "#f3f4f6" }}>
          {content.map(item => {
            const sev = sevColors[item.severity] || sevColors.Medium
            return (
              <div key={item.id} className="px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-3 transition hover:bg-red-50/30">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: item.type === "Remedy" ? "#ecfdf5" : "#eff6ff", color: item.type === "Remedy" ? "#047857" : "#1d4ed8" }}>{item.type}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: sev.bg, color: sev.text }}>{item.severity}</span>
                  </div>
                  <p className="text-sm font-medium truncate" style={{ color: "#374151" }}>{item.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>By <span className="font-mono">{item.author}</span> · {item.date}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => removeItem(item.id)} className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white cursor-pointer transition hover:scale-105"
                    style={{ background: "linear-gradient(135deg, #ef4444, #dc2626)" }}>
                    <Trash2 className="w-3.5 h-3.5 inline mr-1" />Delete
                  </button>
                  <button onClick={() => removeItem(item.id)} className="px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition"
                    style={{ background: "#ecfdf5", color: "#047857", border: "1px solid #a7f3d0" }}>
                    <CheckCircle className="w-3.5 h-3.5 inline mr-1" />Approve
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ═══════════ 5 · SUPPORT TICKETS ═══════════
function SupportTickets({ tickets, setTickets }: { tickets: Ticket[]; setTickets: React.Dispatch<React.SetStateAction<Ticket[]>> }) {
  const changeStatus = (id: number, s: Ticket["status"]) => setTickets(prev => prev.map(t => t.id === id ? { ...t, status: s } : t))
  const sorted = [...tickets].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const prioColors: Record<string, { bg: string; text: string }> = { High: { bg: "#fef2f2", text: "#991b1b" }, Medium: { bg: "#fffbeb", text: "#92400e" }, Low: { bg: "#f3f4f6", text: "#6b7280" } }
  const statColors: Record<string, { bg: string; text: string; border: string }> = {
    Open: { bg: "#fffbeb", text: "#92400e", border: "#fde68a" }, "In Progress": { bg: "#eff6ff", text: "#1d4ed8", border: "#bfdbfe" }, Resolved: { bg: "#ecfdf5", text: "#047857", border: "#a7f3d0" },
  }

  return (
    <div className="space-y-4">
      {sorted.map(ticket => {
        const pc = prioColors[ticket.priority]; const sc = statColors[ticket.status]
        return (
          <div key={ticket.id} className="rounded-2xl p-5 transition-all hover:-translate-y-0.5"
            style={{ background: "white", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", borderLeft: `4px solid ${sc.border}` }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)" }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)" }}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold truncate" style={{ color: "#064e3b" }}>{ticket.subject}</h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0" style={{ background: pc.bg, color: pc.text }}>{ticket.priority}</span>
                </div>
                <p className="text-xs" style={{ color: "#9ca3af" }}>{ticket.user} · {ticket.date}</p>
              </div>
              <div className="relative shrink-0">
                <select value={ticket.status} onChange={e => changeStatus(ticket.id, e.target.value as Ticket["status"])}
                  className="appearance-none pl-3 pr-8 py-2 rounded-lg text-xs font-semibold cursor-pointer outline-none transition"
                  style={{ background: sc.bg, color: sc.text, border: `1px solid ${sc.border}` }}>
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" style={{ color: sc.text }} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ═══════════ 6 · MASTER DATA ═══════════
type AilmentListField = "causes" | "symptoms" | "prevention"

function MasterData({ ailments, setAilments, refreshAilments }: {
  ailments: MasterAilment[]
  setAilments: React.Dispatch<React.SetStateAction<MasterAilment[]>>
  refreshAilments: () => Promise<void>
}) {
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState<CreateAilmentRequest>({
    name: "",
    description: "",
    causes: [],
    symptoms: [],
    prevention: [],
  })
  const [causeInput, setCauseInput] = useState("")
  const [symptomInput, setSymptomInput] = useState("")
  const [preventionInput, setPreventionInput] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null)

  const filtered = ailments.filter((ailment) =>
    ailment.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const addListValue = (field: AilmentListField, value: string, clearField: () => void) => {
    const trimmedValue = value.trim()
    if (!trimmedValue) {
      return
    }

    setFormData((previous) => {
      if (previous[field].includes(trimmedValue)) {
        return previous
      }

      return {
        ...previous,
        [field]: [...previous[field], trimmedValue],
      }
    })

    clearField()
  }

  const removeListValue = (field: AilmentListField, index: number) => {
    setFormData((previous) => ({
      ...previous,
      [field]: previous[field].filter((_, itemIndex) => itemIndex !== index),
    }))
  }

  const handleSubmit = async () => {
    setSubmitError(null)
    setSubmitSuccess(null)

    const name = formData.name.trim()
    const description = formData.description.trim()

    if (!name || !description) {
      setSubmitError("Name and description are required")
      return
    }

    if (formData.causes.length === 0 || formData.symptoms.length === 0 || formData.prevention.length === 0) {
      setSubmitError("Please add at least one cause, symptom, and prevention item")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/ailments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          causes: formData.causes,
          symptoms: formData.symptoms,
          prevention: formData.prevention,
        } satisfies CreateAilmentRequest),
      })

      const data = (await response.json()) as { ailment?: AilmentRecord; error?: string }

      if (!response.ok || !data.ailment) {
        throw new Error(data.error || "Unable to add ailment")
      }

      const createdAilment: MasterAilment = {
        ...data.ailment,
        source: "dynamic",
      }

      setAilments((previousAilments) => mergeAndSortByName(previousAilments, [createdAilment]))
      setFormData({
        name: "",
        description: "",
        causes: [],
        symptoms: [],
        prevention: [],
      })
      setCauseInput("")
      setSymptomInput("")
      setPreventionInput("")
      setSubmitSuccess("Ailment saved successfully")

      await refreshAilments()
    } catch (error) {
      console.error("Failed to save ailment", error)
      setSubmitError(error instanceof Error ? error.message : "Unable to add ailment")
    } finally {
      setIsSubmitting(false)
    }
  }

  const removeAilmentFromView = (slug: string) => {
    setAilments((previous) => previous.filter((ailment) => ailment.slug !== slug))
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 rounded-2xl p-6" style={{ background: "white", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
        <h3 className="text-lg font-bold mb-4" style={{ color: "#064e3b" }}>Add New Ailment</h3>
        <div className="space-y-4">
          <input
            type="text"
            value={formData.name}
            onChange={(event) => setFormData((previous) => ({ ...previous, name: event.target.value }))}
            placeholder="Ailment name"
            className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition"
            style={{ border: "1px solid #d1fae5", color: "#374151", background: "#f8fdf9" }}
          />

          <textarea
            value={formData.description}
            onChange={(event) => setFormData((previous) => ({ ...previous, description: event.target.value }))}
            placeholder="Short description"
            rows={3}
            className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition resize-none"
            style={{ border: "1px solid #d1fae5", color: "#374151", background: "#f8fdf9" }}
          />

          <div className="space-y-2">
            <p className="text-sm font-semibold" style={{ color: "#064e3b" }}>Causes</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={causeInput}
                onChange={(event) => setCauseInput(event.target.value)}
                onKeyDown={(event) => event.key === "Enter" && (event.preventDefault(), addListValue("causes", causeInput, () => setCauseInput("")))}
                placeholder="Add cause"
                className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
                style={{ border: "1px solid #d1fae5", color: "#374151" }}
              />
              <Button type="button" onClick={() => addListValue("causes", causeInput, () => setCauseInput(""))} variant="outline" size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.causes.map((item, index) => (
                <span key={`cause-${index}`} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs" style={{ background: "#ecfdf5", color: "#047857" }}>
                  {item}
                  <button type="button" onClick={() => removeListValue("causes", index)} className="cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold" style={{ color: "#064e3b" }}>Symptoms</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={symptomInput}
                onChange={(event) => setSymptomInput(event.target.value)}
                onKeyDown={(event) => event.key === "Enter" && (event.preventDefault(), addListValue("symptoms", symptomInput, () => setSymptomInput("")))}
                placeholder="Add symptom"
                className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
                style={{ border: "1px solid #d1fae5", color: "#374151" }}
              />
              <Button type="button" onClick={() => addListValue("symptoms", symptomInput, () => setSymptomInput(""))} variant="outline" size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.symptoms.map((item, index) => (
                <span key={`symptom-${index}`} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs" style={{ background: "#eff6ff", color: "#1d4ed8" }}>
                  {item}
                  <button type="button" onClick={() => removeListValue("symptoms", index)} className="cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold" style={{ color: "#064e3b" }}>Prevention</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={preventionInput}
                onChange={(event) => setPreventionInput(event.target.value)}
                onKeyDown={(event) => event.key === "Enter" && (event.preventDefault(), addListValue("prevention", preventionInput, () => setPreventionInput("")))}
                placeholder="Add prevention tip"
                className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
                style={{ border: "1px solid #d1fae5", color: "#374151" }}
              />
              <Button type="button" onClick={() => addListValue("prevention", preventionInput, () => setPreventionInput(""))} variant="outline" size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.prevention.map((item, index) => (
                <span key={`prevention-${index}`} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs" style={{ background: "#fef3c7", color: "#92400e" }}>
                  {item}
                  <button type="button" onClick={() => removeListValue("prevention", index)} className="cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={() => void handleSubmit()}
            disabled={isSubmitting}
            className="w-full py-2.5 rounded-xl text-sm font-bold text-white transition cursor-pointer disabled:opacity-50"
            style={{ background: "linear-gradient(135deg, #059669, #047857)" }}
          >
            <Plus className="w-4 h-4 inline mr-1" />
            {isSubmitting ? "Saving..." : "Save Ailment"}
          </button>

          {submitError && <p className="text-xs text-red-600">{submitError}</p>}
          {submitSuccess && <p className="text-xs text-emerald-700">{submitSuccess}</p>}

          <p className="text-xs" style={{ color: "#9ca3af" }}>
            Total: <span className="font-bold" style={{ color: "#064e3b" }}>{ailments.length}</span> ailments
          </p>
        </div>
      </div>
      <div className="lg:col-span-2 rounded-2xl p-6" style={{ background: "white", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold" style={{ color: "#064e3b" }}>Current Ailments</h3>
          <div className="relative w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#9ca3af" }} />
            <input type="text" placeholder="Filter…" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg text-sm outline-none" style={{ border: "1px solid #d1fae5", color: "#374151" }} />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {filtered.map((ailment) => (
            <div
              key={ailment.slug}
              className="w-full p-3 rounded-xl"
              style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold" style={{ color: "#064e3b" }}>{ailment.name}</p>
                    <span className="text-[10px] uppercase px-2 py-0.5 rounded-full" style={{ background: ailment.source === "dynamic" ? "#dcfce7" : "#e0f2fe", color: ailment.source === "dynamic" ? "#166534" : "#075985" }}>
                      {ailment.source}
                    </span>
                  </div>
                  <p className="text-xs mt-1" style={{ color: "#6b7280" }}>{ailment.description}</p>
                  <p className="text-[11px] mt-1" style={{ color: "#9ca3af" }}>
                    Slug: {slugifyAilmentName(ailment.name)}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-[11px] px-2 py-0.5 rounded-full" style={{ background: "#ecfdf5", color: "#047857" }}>
                      Causes: {ailment.causes.length}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full" style={{ background: "#eff6ff", color: "#1d4ed8" }}>
                      Symptoms: {ailment.symptoms.length}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full" style={{ background: "#fef3c7", color: "#92400e" }}>
                      Prevention: {ailment.prevention.length}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeAilmentFromView(ailment.slug)}
                  className="cursor-pointer"
                  style={{ color: "#ef4444" }}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <p className="text-sm py-4" style={{ color: "#9ca3af" }}>No ailments match your filter.</p>}
        </div>
      </div>
    </div>
  )
}
