"use client"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import DoctorConsultation from "@/components/doctor-consultation"

export default function ConsultDoctorPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <DoctorConsultation />
      <Footer />
    </main>
  )
}
