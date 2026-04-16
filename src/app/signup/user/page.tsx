"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import {
  Leaf,
  Eye,
  EyeOff,
  ChevronDown,
  Search,
  Check,
} from "lucide-react"

const NAME_REGEX = /^[\p{L}\p{M}' -]*$/u

const countryCodes = [
  { code: "+1", country: "US" },
  { code: "+44", country: "UK" },
  { code: "+91", country: "IN" },
  { code: "+61", country: "AU" },
  { code: "+81", country: "JP" },
  { code: "+49", country: "DE" },
  { code: "+33", country: "FR" },
  { code: "+86", country: "CN" },
  { code: "+55", country: "BR" },
  { code: "+7", country: "RU" },
  { code: "+82", country: "KR" },
  { code: "+39", country: "IT" },
  { code: "+34", country: "ES" },
  { code: "+971", country: "AE" },
  { code: "+966", country: "SA" },
  { code: "+65", country: "SG" },
  { code: "+60", country: "MY" },
  { code: "+62", country: "ID" },
  { code: "+234", country: "NG" },
  { code: "+27", country: "ZA" },
  { code: "+52", country: "MX" },
  { code: "+64", country: "NZ" },
  { code: "+48", country: "PL" },
  { code: "+90", country: "TR" },
  { code: "+20", country: "EG" },
  { code: "+92", country: "PK" },
  { code: "+880", country: "BD" },
  { code: "+94", country: "LK" },
  { code: "+977", country: "NP" },
  { code: "+63", country: "PH" },
  { code: "+66", country: "TH" },
  { code: "+84", country: "VN" },
]

const inputClass =
  "w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary transition"

export default function UserSignupPage() {
  const router = useRouter()
  const { login } = useAuth()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [countryCode, setCountryCode] = useState("+91")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [agreed, setAgreed] = useState(false)

  const [ccOpen, setCcOpen] = useState(false)
  const [ccSearch, setCcSearch] = useState("")
  const ccRef = useRef<HTMLDivElement>(null)

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ccRef.current && !ccRef.current.contains(e.target as Node)) {
        setCcOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const filteredCodes = countryCodes.filter(
    (c) =>
      c.code.includes(ccSearch) ||
      c.country.toLowerCase().includes(ccSearch.toLowerCase())
  )

  const validateName = (value: string, field: string) => {
    if (!value.trim()) return `${field} is required`
    if (!NAME_REGEX.test(value))
      return `${field} can only contain letters`
    return ""
  }

  const validate = (): boolean => {
    const e: Record<string, string> = {}
    const fnErr = validateName(firstName, "First name")
    if (fnErr) e.firstName = fnErr
    const lnErr = validateName(lastName, "Last name")
    if (lnErr) e.lastName = lnErr
    if (!email.trim()) e.email = "Email is required"
    if (!phone.trim()) e.phone = "Mobile number is required"
    if (password.length < 8)
      e.password = "Password must be at least 8 characters"
    if (password !== confirmPassword)
      e.confirmPassword = "Passwords do not match"
    if (!agreed) e.agreed = "You must agree to continue"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    const userData = {
      id: Math.random().toString(36).substr(2, 9),
      name: `${firstName.trim()} ${lastName.trim()}`,
      email: email.trim(),
      userType: "user" as const,
      phone: `${countryCode} ${phone}`,
      age: 0,
      location: "",
    }
    login(userData)
    router.push("/onboarding/user")
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-teal-50 to-blue-50 flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center pb-2">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 mb-3"
          >
            <Leaf className="w-6 h-6 text-secondary" />
            <span className="text-2xl font-bold text-primary font-heading">
              Healthyify
            </span>
          </Link>
          <CardTitle className="text-xl font-heading">
            Create Your Account
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Join the community of health-conscious individuals
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-foreground">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => {
                    const v = e.target.value
                    if (NAME_REGEX.test(v)) setFirstName(v)
                  }}
                  placeholder="John"
                  className={inputClass}
                  required
                />
                {errors.firstName && (
                  <p className="text-xs text-destructive">{errors.firstName}</p>
                )}
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-foreground">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => {
                    const v = e.target.value
                    if (NAME_REGEX.test(v)) setLastName(v)
                  }}
                  placeholder="Doe"
                  className={inputClass}
                  required
                />
                {errors.lastName && (
                  <p className="text-xs text-destructive">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-foreground">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={inputClass}
                required
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email}</p>
              )}
            </div>

            {/* Mobile Number with Country Code */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-foreground">
                Mobile Number
              </label>
              <div className="flex gap-2">
                {/* Country code dropdown */}
                <div className="relative w-28 shrink-0" ref={ccRef}>
                  <button
                    type="button"
                    onClick={() => setCcOpen(!ccOpen)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                  >
                    <span>{countryCode}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-muted-foreground transition-transform ${ccOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {ccOpen && (
                    <div className="absolute z-30 mt-1 w-40 bg-card border border-border rounded-lg shadow-xl overflow-hidden">
                      <div className="flex items-center gap-2 px-3 py-2 border-b border-border">
                        <Search className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                        <input
                          type="text"
                          value={ccSearch}
                          onChange={(e) => setCcSearch(e.target.value)}
                          placeholder="Search..."
                          className="w-full bg-transparent text-sm text-foreground placeholder-muted-foreground focus:outline-none"
                          autoFocus
                        />
                      </div>
                      <ul className="max-h-40 overflow-y-auto">
                        {filteredCodes.map((c) => (
                          <li key={c.code + c.country}>
                            <button
                              type="button"
                              onClick={() => {
                                setCountryCode(c.code)
                                setCcOpen(false)
                                setCcSearch("")
                              }}
                              className={`w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-secondary/10 transition ${
                                countryCode === c.code
                                  ? "bg-secondary/10 text-secondary font-medium"
                                  : "text-foreground"
                              }`}
                            >
                              <span>
                                {c.country} {c.code}
                              </span>
                              {countryCode === c.code && (
                                <Check className="w-3.5 h-3.5 text-secondary" />
                              )}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, "")
                    setPhone(v)
                  }}
                  placeholder="9876543210"
                  className={`${inputClass} flex-1`}
                  required
                />
              </div>
              {errors.phone && (
                <p className="text-xs text-destructive">{errors.phone}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-foreground">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 8 characters"
                  className={inputClass}
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-4.5 h-4.5" />
                  ) : (
                    <Eye className="w-4.5 h-4.5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-destructive">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-foreground">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className={inputClass}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                  tabIndex={-1}
                >
                  {showConfirm ? (
                    <EyeOff className="w-4.5 h-4.5" />
                  ) : (
                    <Eye className="w-4.5 h-4.5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-destructive">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Terms */}
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 mt-0.5 accent-secondary"
              />
              <span className="text-sm text-muted-foreground">
                I agree to the{" "}
                <span className="text-secondary underline underline-offset-2 cursor-pointer">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-secondary underline underline-offset-2 cursor-pointer">
                  Privacy Policy
                </span>
              </span>
            </label>
            {errors.agreed && (
              <p className="text-xs text-destructive -mt-2">{errors.agreed}</p>
            )}

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-lg shadow-md text-base py-2.5"
            >
              Create Account
            </Button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">or</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Google Sign Up */}
            <Button
              type="button"
              variant="outline"
              className="w-full rounded-lg text-foreground border-border hover:bg-muted/20 py-2.5"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Sign up with Google
            </Button>

            {/* Apple Sign Up */}
            <Button
              type="button"
              variant="outline"
              className="w-full rounded-lg text-foreground border-border hover:bg-muted/20 py-2.5"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              Sign up with Apple
            </Button>

            {/* Login link */}
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-secondary font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
