"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"

/**
 * Wraps any page that a doctor should not access until onboarding is complete.
 * If the logged-in user is a doctor whose verification has not been submitted,
 * they are redirected back to /onboarding/doctor.
 *
 * For non-doctor users (or guests) the children render normally — other auth
 * guards on those pages handle their own access control.
 */
export default function DoctorRouteGuard({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoggedIn, isDoctorOnboarded } = useAuth()
  const router = useRouter()

  const shouldRedirect =
    isLoggedIn && user?.userType === "doctor" && !isDoctorOnboarded

  useEffect(() => {
    if (shouldRedirect) {
      router.replace("/onboarding/doctor")
    }
  }, [shouldRedirect, router])

  if (shouldRedirect) {
    return null
  }

  return <>{children}</>
}
