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
  title: "Healthyify - Natural Health Remedies",
  description: "Discover trusted natural health remedies and consult with healthcare professionals",
  generator: "v0.app",
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
