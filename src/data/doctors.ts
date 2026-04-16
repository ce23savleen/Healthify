export interface Doctor {
  id: number
  name: string
  specialty: string
  experience: string
  rating: number
  reviews: number
  location: string
  availability: string
  bio: string
  image?: string
}

export const doctorsData: Doctor[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "General Medicine",
    experience: "15 years",
    rating: 4.8,
    reviews: 245,
    location: "New York, NY",
    availability: "Mon-Fri 9AM-5PM",
    bio: "Board-certified family physician with expertise in preventive care and chronic disease management."
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Cardiology",
    experience: "12 years",
    rating: 4.9,
    reviews: 189,
    location: "Los Angeles, CA",
    availability: "Tue-Sat 8AM-4PM",
    bio: "Specialized in cardiovascular health, preventive cardiology, and heart disease treatment."
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Dermatology",
    experience: "10 years",
    rating: 4.7,
    reviews: 156,
    location: "Chicago, IL",
    availability: "Mon-Thu 10AM-6PM",
    bio: "Expert in skin conditions, cosmetic dermatology, and skin cancer prevention."
  },
  {
    id: 4,
    name: "Dr. David Kim",
    specialty: "Pediatrics",
    experience: "8 years",
    rating: 4.6,
    reviews: 134,
    location: "Houston, TX",
    availability: "Mon-Fri 8AM-3PM",
    bio: "Dedicated pediatrician focused on child health, development, and family wellness."
  },
  {
    id: 5,
    name: "Dr. Lisa Thompson",
    specialty: "Internal Medicine",
    experience: "18 years",
    rating: 4.8,
    reviews: 267,
    location: "Phoenix, AZ",
    availability: "Mon-Wed 9AM-5PM",
    bio: "Comprehensive internal medicine specialist with focus on adult health and preventive care."
  }
]

export const getBestDoctor = (): Doctor => {
  return doctorsData.reduce((best, current) =>
    current.rating > best.rating ? current : best
  )
}

export const getDoctorsBySpecialty = (specialty: string): Doctor[] => {
  return doctorsData.filter(doctor =>
    doctor.specialty.toLowerCase().includes(specialty.toLowerCase())
  )
}