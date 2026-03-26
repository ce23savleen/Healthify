"use client"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, User, Stethoscope } from "lucide-react"

export default function SignupPage() {
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
            Join Healthyify
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            How would you like to use the platform?
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <Link
            href="/signup/user"
            className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card hover:border-secondary/50 hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 group-hover:bg-secondary/20 transition">
              <User className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">
                I&apos;m looking for remedies
              </p>
              <p className="text-sm text-muted-foreground">
                Browse ailments, explore community posts, and save remedies
              </p>
            </div>
          </Link>

          <Link
            href="/signup/doctor"
            className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card hover:border-secondary/50 hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition">
              <Stethoscope className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="font-semibold text-foreground">
                I&apos;m a medical professional
              </p>
              <p className="text-sm text-muted-foreground">
                Verify remedies, consult patients, and share expertise
              </p>
            </div>
          </Link>

          <p className="text-center text-sm text-muted-foreground pt-2">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-secondary font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
