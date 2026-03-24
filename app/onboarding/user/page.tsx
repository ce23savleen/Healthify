"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import OnboardingNavbar from "@/components/onboarding-navbar"
import {
  Leaf,
  ShieldCheck,
  Sparkles,
  Scissors,
  Brain,
  Bone,
  Apple,
} from "lucide-react"

const healthInterests = [
  { id: "digestion", label: "Digestion", icon: Apple },
  { id: "immunity", label: "Immunity", icon: ShieldCheck },
  { id: "skin-care", label: "Skin Care", icon: Sparkles },
  { id: "hair-care", label: "Hair Care", icon: Scissors },
  { id: "stress-relief", label: "Stress Relief", icon: Brain },
  { id: "joint-pain", label: "Joint Pain", icon: Bone },
]

export default function UserOnboarding() {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const { user } = useAuth()
  const router = useRouter()

  const toggleInterest = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const handleContinue = () => {
    localStorage.setItem(
      "healthInterests",
      JSON.stringify(Array.from(selected))
    )
    router.push("/dashboard/user")
  }

  const hasSelection = selected.size > 0

  return (
    <main className="min-h-screen bg-background">
      <OnboardingNavbar />

      <section className="relative bg-gradient-to-br from-teal-50 to-blue-50 min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16">
        {/* Decorative background element */}
        <div className="absolute top-8 right-8 opacity-10">
          <Leaf className="w-48 h-48 text-secondary" />
        </div>

        <div className="w-full max-w-2xl mx-auto text-center space-y-10">
          {/* Greeting */}
          {user?.name && (
            <p className="text-secondary font-semibold text-lg tracking-wide">
              Hi, {user.name}! 👋
            </p>
          )}

          {/* Header */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary leading-tight font-heading">
              Welcome to Healthyify!
            </h1>
            <h2 className="text-xl sm:text-2xl text-primary/80 font-heading font-medium">
              What are you looking to improve today?
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Pick your health interests so we can personalize your experience
              with the most relevant remedies and community posts.
            </p>
          </div>

          {/* Interest Pills Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg mx-auto">
            {healthInterests.map(({ id, label, icon: Icon }) => {
              const isSelected = selected.has(id)
              return (
                <button
                  key={id}
                  onClick={() => toggleInterest(id)}
                  className={`
                    flex items-center justify-center gap-2 px-5 py-3
                    rounded-full border-2 font-medium text-sm sm:text-base
                    transition-all duration-200 cursor-pointer select-none
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                    ${
                      isSelected
                        ? "bg-secondary text-secondary-foreground border-secondary shadow-md scale-[1.03]"
                        : "bg-card text-foreground border-border hover:border-secondary/50 hover:shadow-sm"
                    }
                  `}
                  aria-pressed={isSelected}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{label}</span>
                </button>
              )
            })}
          </div>

          {/* Actions */}
          <div className="space-y-4 pt-2">
            <Button
              onClick={handleContinue}
              disabled={!hasSelection}
              size="lg"
              className={`
                w-full max-w-xs mx-auto text-base rounded-lg shadow-md transition-all duration-200
                ${
                  hasSelection
                    ? "bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                    : "bg-secondary/40 text-secondary-foreground/60 cursor-not-allowed"
                }
              `}
            >
              Continue to Dashboard →
            </Button>

            <Link
              href="/dashboard/user"
              className="block text-sm text-muted-foreground hover:text-secondary transition-colors underline underline-offset-4"
            >
              Skip for now
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
