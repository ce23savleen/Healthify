import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"
import Chatbot from "@/components/chatbot"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-heading",
})

export const metadata: Metadata = {
  title: "Healthify - Natural Home Remedies for Everyday Health",
  description: "Discover safe and effective natural home remedies for cough, cold, skin, digestion, and wellness. Find trusted remedies backed by traditional wisdom and expert verification.",
  keywords: "home remedies, natural remedies, health, wellness, ayurveda, herbal medicine, cough remedy, skin care",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body>
        <AuthProvider>
          <div className="pt-16">{children}</div>
          <Chatbot />
        </AuthProvider>
      </body>
    </html>
  )
}
