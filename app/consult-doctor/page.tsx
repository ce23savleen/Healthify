"use client"
import { useSearchParams } from "next/navigation"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import DoctorConsultation from "@/components/doctor-consultation"

export default function ConsultDoctorPage() {
  const searchParams = useSearchParams()
  const doctorId = searchParams.get("doctorId")

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <DoctorConsultation initialDoctorId={doctorId ? Number(doctorId) : undefined} />
      <Footer />
    </main>
  )
}
