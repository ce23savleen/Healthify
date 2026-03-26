"use client"

import Link from "next/link"
import { Leaf, LogOut } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

export default function OnboardingNavbar() {
  const { logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <nav className="fixed top-0 z-50 w-full bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl text-secondary"
          >
            <Leaf className="w-6 h-6" />
            <span>Healthyify</span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 text-foreground hover:bg-muted/20 rounded-lg transition"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden sm:inline text-sm font-medium">
              Logout
            </span>
          </button>
        </div>
      </div>
    </nav>
  )
}
