"use client"
import Link from "next/link"
import type React from "react"

import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [userType, setUserType] = useState<"user" | "doctor">("user")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const redirectUrl = searchParams.get("redirect") || "/"

  const validate = (): boolean => {
    const e: Record<string, string> = {}
    if (!email.trim()) e.email = "Email is required"
    if (password.length < 8) e.password = "Password must be at least 8 characters"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    const userData = {
      id: Math.random().toString(36).substr(2, 9),
      name: email.split("@")[0],
      email,
      userType,
      phone: "+1 (555) 123-4567",
      age: 28,
      location: "New York, USA",
    }
    login(userData)

    // If doctor, check onboarding. Since this is a fresh login,
    // doctorVerification won't exist → redirect to onboarding.
    if (userType === "doctor") {
      const verification = localStorage.getItem("doctorVerification")
      if (!verification) {
        router.push("/onboarding/doctor")
      } else {
        router.push("/dashboard/doctor")
      }
    } else {
      router.push(redirectUrl)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="w-6 h-6 text-teal-600" />
            <span className="text-2xl font-bold text-primary">Healthyify</span>
          </div>
          <CardTitle>Welcome Back</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            {/* User Type Selection */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Login as:</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="userType"
                    value="user"
                    checked={userType === "user"}
                    onChange={(e) => setUserType(e.target.value as "user" | "doctor")}
                    className="w-4 h-4"
                  />
                  <span className="text-foreground">User</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="userType"
                    value="doctor"
                    checked={userType === "doctor"}
                    onChange={(e) => setUserType(e.target.value as "user" | "doctor")}
                    className="w-4 h-4"
                  />
                  <span className="text-foreground">Doctor</span>
                </label>
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal-600"
                required
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal-600"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-foreground">Remember me</span>
              </label>
              <Link href="#" className="text-teal-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2">
              Login
            </Button>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-teal-600 hover:underline font-semibold">
                Sign up
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
