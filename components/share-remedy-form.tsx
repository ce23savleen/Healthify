"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Plus, Upload } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

// Get all available ailments from the ailment data
const ailmentsList = [
  "Acne",
  "Back Pain",
  "Headache",
  "Nausea",
  "Sore Throat",
  "Joint Pain",
  "Skin Irritation",
  "Indigestion",
  "Fever",
  "Cough",
  "Cold",
  "Insomnia",
  "Anxiety",
  "Digestion Issues",
]

export default function ShareRemedyForm() {
  const router = useRouter()
  const { isLoggedIn, user } = useAuth()
  const [previousPage, setPreviousPage] = useState<string>("/")
  const [formData, setFormData] = useState({
    ailment: "",
    title: "",
    description: "",
    steps: [""],
    requestDoctorVerification: false,
  })
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const referrer = document.referrer
      if (referrer && !referrer.includes("/share-remedy")) {
        setPreviousPage(referrer.split(window.location.origin)[1] || "/")
      }
    }
  }, [])

  useEffect(() => {
    if (!isLoggedIn) {
      // Show notification and redirect
      const timer = setTimeout(() => {
        router.push("/login")
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isLoggedIn, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleStepChange = (index: number, value: string) => {
    const newSteps = [...formData.steps]
    newSteps[index] = value
    setFormData((prev) => ({
      ...prev,
      steps: newSteps,
    }))
  }

  const addStep = () => {
    setFormData((prev) => ({
      ...prev,
      steps: [...prev.steps, ""],
    }))
  }

  const removeStep = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index),
    }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files
    if (files) {
      const newFiles = Array.from(files).filter((file) => {
        const isImage = file.type.startsWith("image/")
        const isVideo = file.type.startsWith("video/")
        const isUnder10MB = file.size <= 10 * 1024 * 1024

        if (!isImage && !isVideo) {
          setErrors((prev) => ({
            ...prev,
            files: "Only images and videos are allowed",
          }))
          return false
        }
        if (!isUnder10MB) {
          setErrors((prev) => ({
            ...prev,
            files: "File size must be under 10MB",
          }))
          return false
        }
        return true
      })

      setUploadedFiles((prev) => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.ailment) newErrors.ailment = "Please select an ailment"
    if (!formData.title.trim()) newErrors.title = "Remedy title is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"

    const validSteps = formData.steps.filter((step) => step.trim())
    if (validSteps.length === 0) newErrors.steps = "Please add at least one step"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const newRemedy = {
        id: Date.now(),
        title: formData.title,
        author: user?.name || "Anonymous",
        avatar: "/user-avatar.jpg",
        ailment: formData.ailment,
        description: formData.description,
        steps: formData.steps.filter((step) => step.trim()),
        likes: 0,
        comments: 0,
        isVerified: false,
        isNew: true,
        timestamp: "Just now",
        userSubmitted: true,
        requestDoctorVerification: formData.requestDoctorVerification,
      }

      // Get existing remedies from localStorage
      const existingRemedies = JSON.parse(localStorage.getItem("userSubmittedRemedies") || "[]")

      // Add new remedy
      const updatedRemedies = [newRemedy, ...existingRemedies]
      localStorage.setItem("userSubmittedRemedies", JSON.stringify(updatedRemedies))

      if (formData.requestDoctorVerification) {
        const pendingVerifications = JSON.parse(localStorage.getItem("pendingVerifications") || "[]")
        pendingVerifications.push(newRemedy)
        localStorage.setItem("pendingVerifications", JSON.stringify(pendingVerifications))
      }

      const notification = document.createElement("div")
      notification.className =
        "fixed right-4 bottom-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-lg z-50"
      notification.innerHTML = `
        <p class="font-semibold">Remedy submitted successfully!</p>
        <p class="text-sm">Your remedy will appear in the community feed.</p>
      `
      document.body.appendChild(notification)

      setTimeout(() => {
        notification.remove()
        router.push(previousPage)
      }, 2000)

      // Reset form
      setFormData({
        ailment: "",
        title: "",
        description: "",
        steps: [""],
        requestDoctorVerification: false,
      })
      setUploadedFiles([])
    } catch (error) {
      console.error("Error submitting remedy:", error)
      alert("Error submitting remedy. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    router.back()
  }

  if (!isLoggedIn) {
    return (
      <section className="py-12 bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground mb-4">You need to be logged in to share a remedy.</p>
                <p className="text-sm text-muted-foreground">Redirecting to login...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 bg-background">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Share Your Remedy</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Ailment Dropdown */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Ailment <span className="text-red-500">*</span>
                </label>
                <select
                  name="ailment"
                  value={formData.ailment}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal-600 ${
                    errors.ailment ? "border-red-500" : "border-border"
                  }`}
                >
                  <option value="">Select an ailment</option>
                  {ailmentsList.map((ailment) => (
                    <option key={ailment} value={ailment}>
                      {ailment}
                    </option>
                  ))}
                </select>
                {errors.ailment && <p className="text-red-500 text-sm mt-1">{errors.ailment}</p>}
              </div>

              {/* Remedy Title */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Remedy Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Ginger Tea for Headache Relief"
                  className={`w-full px-4 py-2 rounded-lg border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal-600 ${
                    errors.title ? "border-red-500" : "border-border"
                  }`}
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your remedy and how it helped..."
                  rows={5}
                  className={`w-full px-4 py-2 rounded-lg border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal-600 resize-none ${
                    errors.description ? "border-red-500" : "border-border"
                  }`}
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>

              {/* Steps */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">
                  Steps <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  {formData.steps.map((step, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center font-semibold">
                        {index + 1}
                      </div>
                      <input
                        type="text"
                        value={step}
                        onChange={(e) => handleStepChange(index, e.target.value)}
                        placeholder={`Step ${index + 1}`}
                        className="flex-1 px-4 py-2 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal-600"
                      />
                      {formData.steps.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeStep(index)}
                          className="flex-shrink-0 text-red-500 hover:text-red-700 transition"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {errors.steps && <p className="text-red-500 text-sm mt-2">{errors.steps}</p>}

                <button
                  type="button"
                  onClick={addStep}
                  className="mt-3 flex items-center gap-2 text-teal-600 hover:text-teal-700 font-semibold transition"
                >
                  <Plus className="w-5 h-5" />
                  Add Step
                </button>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Photos / Videos <span className="text-muted-foreground">(Optional)</span>
                </label>
                <label className="flex flex-col items-center justify-center w-full px-4 py-8 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted transition">
                  <div className="flex flex-col items-center justify-center">
                    <Upload className="w-8 h-8 text-teal-600 mb-2" />
                    <p className="text-sm font-semibold text-foreground">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground">Images or videos (Max 10MB)</p>
                  </div>
                  <input type="file" multiple accept="image/*,video/*" onChange={handleFileUpload} className="hidden" />
                </label>
                {errors.files && <p className="text-red-500 text-sm mt-2">{errors.files}</p>}

                {/* Uploaded Files Preview */}
                {uploadedFiles.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="relative group">
                        <div className="w-full h-24 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                          {file.type.startsWith("image/") ? (
                            <img
                              src={URL.createObjectURL(file) || "/placeholder.svg"}
                              alt={`Upload ${index}`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="text-center">
                              <p className="text-xs text-muted-foreground">{file.name}</p>
                              <p className="text-xs text-muted-foreground">Video</p>
                            </div>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Doctor Verification Request */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.requestDoctorVerification}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        requestDoctorVerification: e.target.checked,
                      }))
                    }
                    className="w-5 h-5 rounded border-border cursor-pointer"
                  />
                  <div>
                    <p className="font-semibold text-foreground">Get Doctor Verification</p>
                    <p className="text-sm text-muted-foreground">
                      Request doctors to verify this remedy. Verified remedies get a special badge in the community.
                    </p>
                  </div>
                </label>
              </div>

              {/* Submit and Cancel Buttons */}
              <div className="flex gap-4 pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2"
                >
                  {isSubmitting ? "Submitting..." : "Submit Remedy"}
                </Button>
                <Button
                  type="button"
                  onClick={handleCancel}
                  variant="outline"
                  className="px-8 font-semibold bg-transparent"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
