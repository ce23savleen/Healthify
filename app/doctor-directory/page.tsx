"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, ArrowLeft, Star, MapPin, Briefcase } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

interface Doctor {
  id: number
  name: string
  specialization: string
  experience: string
  location: string
  rating: number
  reviews: number
  consultationFee: string
}

const doctorsData: Doctor[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialization: "Ayurveda",
    experience: "10 years",
    location: "New York, USA",
    rating: 4.8,
    reviews: 245,
    consultationFee: "$50",
  },
  {
    id: 2,
    name: "Dr. Rajesh Kumar",
    specialization: "Homeopathy",
    experience: "15 years",
    location: "Los Angeles, USA",
    rating: 4.9,
    reviews: 312,
    consultationFee: "$45",
  },
  {
    id: 3,
    name: "Dr. Lisa Anderson",
    specialization: "Naturopathy",
    experience: "8 years",
    location: "Chicago, USA",
    rating: 4.7,
    reviews: 189,
    consultationFee: "$55",
  },
  {
    id: 4,
    name: "Dr. Michael Chen",
    specialization: "Traditional Chinese Medicine",
    experience: "12 years",
    location: "San Francisco, USA",
    rating: 4.8,
    reviews: 267,
    consultationFee: "$60",
  },
]

export default function DoctorDirectoryPage() {
  const { isLoggedIn } = useAuth()
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-6 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Leaf className="w-6 h-6" />
            <span>Healthyify</span>
          </Link>
          <Link href="/">
            <Button className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent border">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-primary mb-2">Doctor Directory</h1>
        <p className="text-lg text-muted-foreground mb-8">Connect with certified medical professionals</p>

        {/* Doctors Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {doctorsData.map((doctor) => (
            <Card key={doctor.id} className="hover:shadow-lg transition overflow-hidden">
              <CardHeader>
                <CardTitle className="text-xl mb-2">{doctor.name}</CardTitle>
                <p className="text-teal-600 font-semibold text-sm mb-3">{doctor.specialization}</p>
                <div className="flex items-center gap-2 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(doctor.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                    />
                  ))}
                  <span className="text-sm font-semibold text-foreground">{doctor.rating}</span>
                  <span className="text-xs text-muted-foreground">({doctor.reviews} reviews)</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {doctor.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Briefcase className="w-4 h-4" />
                  {doctor.experience} experience
                </div>
                <p className="text-lg font-bold text-foreground">{doctor.consultationFee} per consultation</p>
                <Link href="/consult-doctor">
                  <Button className="w-full bg-teal-600 hover:bg-teal-700">Book Consultation</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
