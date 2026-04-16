"use client"
import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import DoctorConsultation from "@/components/doctor-consultation"

function ConsultDoctorContent() {
  const searchParams = useSearchParams()
  const doctorId = searchParams.get("doctorId")

  return <DoctorConsultation initialDoctorId={doctorId ? Number(doctorId) : undefined} />
}

export default function ConsultDoctorPage() {

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Suspense fallback={<div className="min-h-[60vh]" />}>
        <ConsultDoctorContent />
      </Suspense>
      <Footer />
    </main>
  )
}
