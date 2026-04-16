"use client"

import {
  useState,
  useRef,
  useEffect,
  type DragEvent,
  type ChangeEvent,
} from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import OnboardingNavbar from "@/components/onboarding-navbar"
import {
  Leaf,
  Upload,
  Lock,
  FileText,
  X,
  ChevronDown,
  Search,
  Check,
  Camera,
  User,
} from "lucide-react"

const defaultSpecializations = [
  "Ayurveda",
  "Naturopathy",
  "Dietetics",
  "General Physician",
  "Homeopathy",
  "Dermatology",
  "Cardiology",
  "Orthopedics",
  "Pediatrics",
  "Psychiatry",
]

const genderOptions = ["Male", "Female", "Non-binary", "Prefer not to say"]

const inputClass =
  "w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary transition"

export default function DoctorOnboarding() {
  const { user, updateUser, completeDoctorOnboarding } = useAuth()
  const router = useRouter()

  // Profile picture
  const [profilePic, setProfilePic] = useState<string | null>(null)
  const profileInputRef = useRef<HTMLInputElement>(null)

  // Form fields
  const [gender, setGender] = useState("")
  const [experience, setExperience] = useState("")
  const [clinicName, setClinicName] = useState("")

  // Specialization — searchable + "Other" dynamic logic
  const [specializations, setSpecializations] = useState(
    defaultSpecializations
  )
  const [selectedSpec, setSelectedSpec] = useState(user?.specialization || "")
  const [specOpen, setSpecOpen] = useState(false)
  const [specSearch, setSpecSearch] = useState("")
  const [showOtherSpec, setShowOtherSpec] = useState(false)
  const [otherSpec, setOtherSpec] = useState("")
  const specRef = useRef<HTMLDivElement>(null)

  // Document upload
  const [docFile, setDocFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const docInputRef = useRef<HTMLInputElement>(null)

  const [isSubmitting, setIsSubmitting] = useState(false)

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (specRef.current && !specRef.current.contains(e.target as Node))
        setSpecOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  // --- Profile picture handlers ---
  const handleProfilePicSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith("image/")) return
    const reader = new FileReader()
    reader.onload = (ev) => setProfilePic(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  // --- Specialization handlers ---
  const filteredSpecs = specializations.filter((s) =>
    s.toLowerCase().includes(specSearch.toLowerCase())
  )

  const handleSelectSpec = (value: string) => {
    if (value === "__other__") {
      setShowOtherSpec(true)
      setSelectedSpec("")
      setSpecOpen(false)
      setSpecSearch("")
    } else {
      setSelectedSpec(value)
      setShowOtherSpec(false)
      setOtherSpec("")
      setSpecOpen(false)
      setSpecSearch("")
    }
  }

  const handleAddCustomSpec = () => {
    const trimmed = otherSpec.trim()
    if (!trimmed) return
    if (!specializations.includes(trimmed)) {
      setSpecializations((prev) => [...prev, trimmed])
    }
    setSelectedSpec(trimmed)
    setShowOtherSpec(false)
    setOtherSpec("")
  }

  // --- Document upload handlers ---
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped && isValidDoc(dropped)) setDocFile(dropped)
  }
  const handleDocSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (selected && isValidDoc(selected)) setDocFile(selected)
  }
  const isValidDoc = (f: File) => {
    const validTypes = ["application/pdf", "image/jpeg", "image/jpg"]
    if (!validTypes.includes(f.type)) {
      alert("Please upload a PDF or JPG file.")
      return false
    }
    if (f.size > 10 * 1024 * 1024) {
      alert("File size must be under 10 MB.")
      return false
    }
    return true
  }
  const removeDoc = () => {
    setDocFile(null)
    if (docInputRef.current) docInputRef.current.value = ""
  }

  // --- Validation ---
  const finalSpec = selectedSpec || otherSpec.trim()
  const isFormValid =
    profilePic &&
    gender &&
    experience.trim() &&
    Number(experience) >= 0 &&
    finalSpec &&
    docFile

  // --- Submit ---
  const handleSubmit = () => {
    if (!isFormValid) return
    setIsSubmitting(true)

    if (!selectedSpec && otherSpec.trim()) handleAddCustomSpec()

    updateUser({ specialization: finalSpec, location: clinicName.trim() || user?.location })
    localStorage.setItem(
      "doctorVerification",
      JSON.stringify({
        specialization: finalSpec,
        gender,
        experience,
        clinicName: clinicName.trim(),
        fileName: docFile!.name,
        submittedAt: new Date().toISOString(),
        status: "pending",
      })
    )
    completeDoctorOnboarding()

    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/dashboard/doctor")
    }, 600)
  }

  return (
    <main className="min-h-screen bg-background">
      <OnboardingNavbar />

      <section className="relative bg-linear-to-br from-teal-50 to-blue-50 min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16">
        <div className="absolute top-8 right-8 opacity-10 pointer-events-none">
          <Leaf className="w-48 h-48 text-secondary" />
        </div>

        <div className="w-full max-w-xl mx-auto space-y-8">
          {/* Greeting */}
          {user?.name && (
            <p className="text-center text-secondary font-semibold text-lg tracking-wide">
              Hi, Dr. {user.name}! 👋
            </p>
          )}

          {/* Header */}
          <div className="text-center space-y-3">
            <h1 className="text-3xl sm:text-4xl font-bold text-primary leading-tight font-heading">
              Complete Your Professional Profile
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              We need a few details to verify your medical credentials and
              personalize your Healthyify experience.
            </p>
          </div>

          {/* Form Card */}
          <Card className="border border-border shadow-lg">
            <CardContent className="pt-6 space-y-6">
              {/* ======== Profile Picture Upload ======== */}
              <div className="flex flex-col items-center gap-3">
                <label className="text-sm font-semibold text-foreground">
                  Profile Picture <span className="text-destructive">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => profileInputRef.current?.click()}
                  className="relative w-28 h-28 rounded-full border-2 border-dashed border-border bg-card hover:border-secondary/50 transition-all overflow-hidden group focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
                >
                  {profilePic ? (
                    <img
                      src={profilePic}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                      <User className="w-8 h-8" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                </button>
                <p className="text-xs text-muted-foreground">
                  Click to upload a photo
                </p>
                <input
                  ref={profileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePicSelect}
                  className="hidden"
                />
              </div>

              {/* ======== Gender ======== */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">
                  Gender <span className="text-destructive">*</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {genderOptions.map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGender(g)}
                      className={`px-4 py-2 rounded-full border text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-1 ${
                        gender === g
                          ? "bg-secondary text-secondary-foreground border-secondary shadow-sm"
                          : "bg-card text-foreground border-border hover:border-secondary/50"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* ======== Experience ======== */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">
                  Experience (years) <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={experience}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, "")
                    setExperience(v)
                  }}
                  placeholder="e.g., 10"
                  className={inputClass}
                />
              </div>

              {/* ======== Specialization — searchable with "Other" ======== */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">
                  Specialization <span className="text-destructive">*</span>
                </label>

                {!showOtherSpec ? (
                  <div className="relative" ref={specRef}>
                    <button
                      type="button"
                      onClick={() => setSpecOpen(!specOpen)}
                      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg border border-border bg-card text-left transition focus:outline-none focus:ring-2 focus:ring-secondary ${
                        selectedSpec
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      <span>
                        {selectedSpec || "Select your specialization"}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-muted-foreground transition-transform ${specOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {specOpen && (
                      <div className="absolute z-20 mt-1 w-full bg-card border border-border rounded-lg shadow-xl overflow-hidden">
                        <div className="flex items-center gap-2 px-3 py-2 border-b border-border">
                          <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                          <input
                            type="text"
                            value={specSearch}
                            onChange={(e) => setSpecSearch(e.target.value)}
                            placeholder="Search specializations..."
                            className="w-full bg-transparent text-sm text-foreground placeholder-muted-foreground focus:outline-none"
                            autoFocus
                          />
                        </div>
                        <ul className="max-h-48 overflow-y-auto">
                          {filteredSpecs.map((s) => (
                            <li key={s}>
                              <button
                                type="button"
                                onClick={() => handleSelectSpec(s)}
                                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm text-left transition hover:bg-secondary/10 ${
                                  selectedSpec === s
                                    ? "bg-secondary/10 text-secondary font-medium"
                                    : "text-foreground"
                                }`}
                              >
                                <span>{s}</span>
                                {selectedSpec === s && (
                                  <Check className="w-4 h-4 text-secondary" />
                                )}
                              </button>
                            </li>
                          ))}
                          <li className="border-t border-border">
                            <button
                              type="button"
                              onClick={() => handleSelectSpec("__other__")}
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
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={otherSpec}
                      onChange={(e) => setOtherSpec(e.target.value)}
                      placeholder="Type your specialization"
                      className={`${inputClass} flex-1`}
                      autoFocus
                    />
                    <Button
                      type="button"
                      onClick={handleAddCustomSpec}
                      disabled={!otherSpec.trim()}
                      className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-lg px-4 shrink-0"
                    >
                      Add
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowOtherSpec(false)
                        setOtherSpec("")
                      }}
                      className="rounded-lg px-3 shrink-0"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>

              {/* ======== Clinic / Hospital Name (Optional) ======== */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">
                  Clinic / Hospital Name{" "}
                  <span className="text-muted-foreground font-normal">
                    (Optional)
                  </span>
                </label>
                <input
                  type="text"
                  value={clinicName}
                  onChange={(e) => setClinicName(e.target.value)}
                  placeholder="e.g., Apollo Hospital"
                  className={inputClass}
                />
              </div>

              {/* ======== Document Upload ======== */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">
                  Upload Degree / Registration Certificate{" "}
                  <span className="text-destructive">*</span>
                </label>

                {!docFile ? (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => docInputRef.current?.click()}
                    className={`relative flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-8 cursor-pointer transition-all duration-200 ${
                      isDragging
                        ? "border-secondary bg-secondary/10 scale-[1.01]"
                        : "border-border bg-card hover:border-secondary/50 hover:bg-secondary/5"
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                      <Upload className="w-6 h-6 text-secondary" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-foreground">
                        Drag & drop your file here, or{" "}
                        <span className="text-secondary underline underline-offset-2">
                          browse
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Accepted formats: PDF, JPG — Max 10 MB
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-3 rounded-lg border border-secondary/30 bg-secondary/5 px-4 py-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <FileText className="w-5 h-5 text-secondary shrink-0" />
                      <span className="text-sm font-medium text-foreground truncate">
                        {docFile.name}
                      </span>
                      <span className="text-xs text-muted-foreground shrink-0">
                        ({(docFile.size / 1024).toFixed(0)} KB)
                      </span>
                    </div>
                    <button
                      onClick={removeDoc}
                      className="p-1 rounded-full hover:bg-destructive/10 transition"
                      aria-label="Remove file"
                    >
                      <X className="w-4 h-4 text-destructive" />
                    </button>
                  </div>
                )}

                <input
                  ref={docInputRef}
                  type="file"
                  accept=".pdf,.jpg,.jpeg"
                  onChange={handleDocSelect}
                  className="hidden"
                />
              </div>

              {/* ======== Submit ======== */}
              <Button
                onClick={handleSubmit}
                disabled={!isFormValid || isSubmitting}
                size="lg"
                className={`w-full text-base rounded-lg shadow-md transition-all duration-200 ${
                  isFormValid
                    ? "bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                    : "bg-secondary/40 text-secondary-foreground/60 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? "Submitting…" : "Submit for Verification"}
              </Button>

              {/* Security Note */}
              <div className="flex items-center justify-center gap-2 pt-1">
                <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">
                  Your documents are securely encrypted and used strictly for
                  verification.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}
