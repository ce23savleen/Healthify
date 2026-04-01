"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Leaf, Menu, X, LogOut } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isLoggedIn, user, logout } = useAuth()
  const router = useRouter()

  const isDoctor = user?.userType === "doctor"

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = isDoctor
    ? [
      { href: "/browse-ailments", label: "Browse Ailments" },
      { href: "/explore-community", label: "Explore Community" },
      { href: "/blogs", label: "Blogs" },
      { href: "/doctor-verifications", label: "Verifications" },
      { href: "/doctor-directory", label: "Doctors" },
    ]
    : [
      { href: "/browse-ailments", label: "Browse Ailments" },
      { href: "/explore-community", label: "Community" },
      { href: "/blogs", label: "Blogs" },
      { href: "/consult-doctor", label: "Consult a Doctor" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ]

  const handleLogout = () => {
    logout()
    router.push("/")
    setMobileMenuOpen(false)
  }

  return (
    <nav
      className="fixed top-0 z-50 w-full transition-all duration-500"
      style={{
        background: scrolled ? "rgba(255,255,255,0.95)" : "rgba(6,78,59,0.65)",
        backdropFilter: "blur(20px)",
        borderBottom: scrolled ? "1px solid rgba(209,250,229,0.5)" : "1px solid rgba(255,255,255,0.12)",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.06)" : "0 2px 20px rgba(0,0,0,0.1)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #10b981, #059669)",
                boxShadow: "0 2px 8px rgba(16,185,129,0.3)",
              }}
            >
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span
              className="font-bold text-xl transition-colors duration-300"
              style={{ color: scrolled ? "#064e3b" : "white" }}
            >
              Healthify
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                style={{
                  color: scrolled ? "#374151" : "rgba(255,255,255,0.85)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#059669"
                  e.currentTarget.style.background = scrolled ? "#ecfdf5" : "rgba(255,255,255,0.1)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = scrolled ? "#374151" : "rgba(255,255,255,0.85)"
                  e.currentTarget.style.background = "transparent"
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {!isLoggedIn ? (
              <>
                <Link href="/login">
                  <Button
                    className="rounded-lg px-4 text-sm font-medium transition-all duration-300"
                    style={{
                      background: "transparent",
                      color: scrolled ? "#064e3b" : "white",
                      border: scrolled ? "1px solid #d1fae5" : "1px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button
                    className="rounded-lg px-5 text-sm font-semibold transition-all duration-300 hover:scale-105"
                    style={{
                      background: "linear-gradient(135deg, #059669, #10b981)",
                      color: "white",
                      boxShadow: "0 2px 12px rgba(16,185,129,0.3)",
                    }}
                  >
                    Get Started
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href={isDoctor ? "/dashboard/doctor" : "/dashboard/user"}>
                  <Button
                    className="rounded-lg px-4 text-sm font-medium"
                    style={{
                      background: scrolled ? "#ecfdf5" : "rgba(255,255,255,0.1)",
                      color: scrolled ? "#064e3b" : "white",
                    }}
                  >
                    {user?.name || "Dashboard"}
                  </Button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 cursor-pointer"
                  style={{
                    color: scrolled ? "#6b7280" : "rgba(255,255,255,0.7)",
                  }}
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg transition-all duration-300 cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            style={{
              color: scrolled ? "#064e3b" : "white",
            }}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className="md:hidden pb-4 space-y-1 rounded-2xl mt-2 p-4"
            style={{
              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(209,250,229,0.5)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
              animation: "fadeInUp 0.3s ease-out",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200"
                style={{ color: "#374151" }}
                onClick={() => setMobileMenuOpen(false)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#ecfdf5"
                  e.currentTarget.style.color = "#059669"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent"
                  e.currentTarget.style.color = "#374151"
                }}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-4 py-2 space-y-2 border-t pt-4" style={{ borderColor: "#d1fae5" }}>
              {!isLoggedIn ? (
                <>
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start text-sm" style={{ color: "#374151" }}>
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                    <Button
                      className="w-full text-sm font-semibold"
                      style={{
                        background: "linear-gradient(135deg, #059669, #10b981)",
                        color: "white",
                      }}
                    >
                      Get Started
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href={isDoctor ? "/dashboard/doctor" : "/dashboard/user"}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button variant="ghost" className="w-full justify-start text-sm" style={{ color: "#374151" }}>
                      {user?.name || "Dashboard"}
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent text-sm"
                    onClick={handleLogout}
                    style={{ borderColor: "#d1fae5", color: "#6b7280" }}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
