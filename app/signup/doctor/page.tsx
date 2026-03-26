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

const defaultQualifications = [
  "MBBS",
  "MD",
  "BAMS (Ayurveda)",
  "BHMS (Homeopathy)",
  "BDS",
  "BUMS (Unani)",
  "BNYS (Naturopathy & Yoga)",
  "B.Sc Nursing",
  "Pharm.D",
  "MPH",
]

const inputClass =
  "w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary transition"

export default function DoctorSignupPage() {
  const router = useRouter()
  const { login } = useAuth()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [countryCode, setCountryCode] = useState("+91")
  const [phone, setPhone] = useState("")
  const [location, setLocation] = useState("")
  const [licenseNumber, setLicenseNumber] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [agreed, setAgreed] = useState(false)

  // Qualification dropdown state
  const [qualifications, setQualifications] = useState(defaultQualifications)
  const [selectedQual, setSelectedQual] = useState("")
  const [qualOpen, setQualOpen] = useState(false)
  const [qualSearch, setQualSearch] = useState("")
  const [showOtherInput, setShowOtherInput] = useState(false)
  const [otherQual, setOtherQual] = useState("")
  const qualRef = useRef<HTMLDivElement>(null)

  // Country code dropdown
  const [ccOpen, setCcOpen] = useState(false)
  const [ccSearch, setCcSearch] = useState("")
  const ccRef = useRef<HTMLDivElement>(null)

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ccRef.current && !ccRef.current.contains(e.target as Node))
        setCcOpen(false)
      if (qualRef.current && !qualRef.current.contains(e.target as Node))
        setQualOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const filteredCodes = countryCodes.filter(
    (c) =>
      c.code.includes(ccSearch) ||
      c.country.toLowerCase().includes(ccSearch.toLowerCase())
  )

  const filteredQualifications = qualifications.filter((q) =>
    q.toLowerCase().includes(qualSearch.toLowerCase())
  )

  const handleSelectQual = (value: string) => {
    if (value === "__other__") {
      setShowOtherInput(true)
      setSelectedQual("")
      setQualOpen(false)
      setQualSearch("")
    } else {
      setSelectedQual(value)
      setShowOtherInput(false)
      setOtherQual("")
      setQualOpen(false)
      setQualSearch("")
    }
  }

  const handleAddCustomQual = () => {
    const trimmed = otherQual.trim()
    if (!trimmed) return
    // Add custom qualification to the list for future selections
    if (!qualifications.includes(trimmed)) {
      setQualifications((prev) => [...prev, trimmed])
    }
    setSelectedQual(trimmed)
    setShowOtherInput(false)
    setOtherQual("")
  }

  const validateName = (value: string, field: string) => {
    if (!value.trim()) return `${field} is required`
    if (!NAME_REGEX.test(value)) return `${field} can only contain letters`
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
    if (!location.trim()) e.location = "Location is required"
    if (!selectedQual && !otherQual.trim())
      e.qualification = "Qualification is required"
    if (!licenseNumber.trim())
      e.licenseNumber = "Registration/license number is required"
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

    // If user typed a custom qualification, ensure it's committed
    const finalQual = selectedQual || otherQual.trim()
    if (!selectedQual && otherQual.trim()) {
      handleAddCustomQual()
    }

    const userData = {
      id: Math.random().toString(36).substr(2, 9),
      name: `${firstName.trim()} ${lastName.trim()}`,
      email: email.trim(),
      userType: "doctor" as const,
      phone: `${countryCode} ${phone}`,
      location: location.trim(),
      specialization: finalQual,
      age: 0,
    }
    login(userData)
    localStorage.setItem(
      "doctorSignupMeta",
      JSON.stringify({
        qualification: finalQual,
        licenseNumber: licenseNumber.trim(),
      })
    )
    router.push("/onboarding/doctor")
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-teal-50 to-blue-50 flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-lg shadow-xl">
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
            Doctor Registration
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Join as a verified medical professional
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
                  placeholder="Sarah"
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
                  placeholder="Johnson"
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
                placeholder="doctor@example.com"
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

            {/* Location */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-foreground">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, State, Country"
                className={inputClass}
                required
              />
              {errors.location && (
                <p className="text-xs text-destructive">{errors.location}</p>
              )}
            </div>

            {/* Qualifications — searchable dropdown with "Other" */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-foreground">
                Qualifications
              </label>
              {!showOtherInput ? (
                <div className="relative" ref={qualRef}>
                  <button
                    type="button"
                    onClick={() => setQualOpen(!qualOpen)}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg border border-border bg-card text-left transition focus:outline-none focus:ring-2 focus:ring-secondary ${
                      selectedQual
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    <span>
                      {selectedQual || "Select your qualification"}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-muted-foreground transition-transform ${qualOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {qualOpen && (
                    <div className="absolute z-30 mt-1 w-full bg-card border border-border rounded-lg shadow-xl overflow-hidden">
                      <div className="flex items-center gap-2 px-3 py-2 border-b border-border">
                        <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                        <input
                          type="text"
                          value={qualSearch}
                          onChange={(e) => setQualSearch(e.target.value)}
                          placeholder="Search qualifications..."
                          className="w-full bg-transparent text-sm text-foreground placeholder-muted-foreground focus:outline-none"
                          autoFocus
                        />
                      </div>
                      <ul className="max-h-48 overflow-y-auto">
                        {filteredQualifications.map((q) => (
                          <li key={q}>
                            <button
                              type="button"
                              onClick={() => handleSelectQual(q)}
                              className={`w-full flex items-center justify-between px-4 py-2.5 text-sm text-left transition hover:bg-secondary/10 ${
                                selectedQual === q
                                  ? "bg-secondary/10 text-secondary font-medium"
                                  : "text-foreground"
                              }`}
                            >
                              <span>{q}</span>
                              {selectedQual === q && (
                                <Check className="w-4 h-4 text-secondary" />
                              )}
                            </button>
                          </li>
                        ))}
                        {/* "Other" option — always visible */}
                        <li className="border-t border-border">
                          <button
                            type="button"
                            onClick={() => handleSelectQual("__other__")}
                            className="w-full px-4 py-2.5 text-sm text-left text-secondary font-medium hover:bg-secondary/10 transition"
                          >
                            + Other (type your own)
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                /* Custom qualification text input */
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={otherQual}
                    onChange={(e) => setOtherQual(e.target.value)}
                    placeholder="Type your qualification"
                    className={`${inputClass} flex-1`}
                    autoFocus
                  />
                  <Button
                    type="button"
                    onClick={handleAddCustomQual}
                    disabled={!otherQual.trim()}
                    className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-lg px-4 shrink-0"
                  >
                    Add
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowOtherInput(false)
                      setOtherQual("")
                    }}
                    className="rounded-lg px-3 shrink-0"
                  >
                    Cancel
                  </Button>
                </div>
              )}
              {errors.qualification && (
                <p className="text-xs text-destructive">
                  {errors.qualification}
                </p>
              )}
            </div>

            {/* Medical License Number */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-foreground">
                Medical Registration / License Number{" "}
                <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
                placeholder="e.g., MCI-12345"
                className={inputClass}
                required
              />
              {errors.licenseNumber && (
                <p className="text-xs text-destructive">
                  {errors.licenseNumber}
                </p>
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
                  Terms & Conditions
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
              Register as Doctor
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
