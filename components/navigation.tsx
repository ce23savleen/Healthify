"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Leaf, Menu, X, LogOut } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isLoggedIn, user, logout } = useAuth()
  const router = useRouter()

  const isDoctor = user?.userType === "doctor"

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
        { href: "/explore-community", label: "Explore Community" },
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
    <nav className="fixed top-0 z-50 w-full bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-secondary">
            <Leaf className="w-6 h-6" />
            <span>Healthyify</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground hover:text-secondary transition font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {!isLoggedIn ? (
              <>
                <Link href="/login">
                  <Button className="bg-muted/20 text-foreground hover:bg-muted/30 rounded-lg shadow-sm">Login</Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-lg shadow-md">
                    Get Started
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href={isDoctor ? "/dashboard/doctor" : "/dashboard/user"}>
                  <Button className="bg-muted/20 text-foreground hover:bg-muted/30 rounded-lg shadow-sm">
                    {user?.name || "Dashboard"}
                  </Button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 text-foreground hover:bg-muted/20 rounded-lg transition shadow-sm"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="w-6 h-6 text-foreground" /> : <Menu className="w-6 h-6 text-foreground" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-4 py-2 space-y-2 border-t border-border pt-4">
              {!isLoggedIn ? (
                <>
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-secondary hover:bg-secondary/90">Get Started</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href={isDoctor ? "/dashboard/doctor" : "/dashboard/user"}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button variant="ghost" className="w-full justify-start">
                      {user?.name || "Dashboard"}
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full bg-transparent" onClick={handleLogout}>
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
