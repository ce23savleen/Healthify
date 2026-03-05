"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Briefcase, Award, Calendar } from "lucide-react"

const doctorsData = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialization: "Ayurveda",
    qualifications: ["BAMS", "MD (Ayurveda)", "Certified Herbalist"],
    experience: "10 years",
    rating: 4.8,
    reviews: 156,
    location: "Mumbai, India",
    consultationFee: "₹500",
    image: "/professional-female-doctor-ayurveda-specialist.jpg",
    bio: "Specializing in traditional Ayurvedic medicine with a focus on holistic wellness and natural remedies.",
    availability: "Mon-Fri, 10 AM - 6 PM",
  },
  {
    id: 2,
    name: "Dr. Rajesh Kumar",
    specialization: "Homeopathy",
    qualifications: ["BHMS", "MD (Homeopathy)", "Certified Nutritionist"],
    experience: "12 years",
    rating: 4.9,
    reviews: 203,
    location: "Delhi, India",
    consultationFee: "₹450",
    image: "/professional-male-doctor-homeopathy-specialist.jpg",
    bio: "Expert in homeopathic treatments with extensive experience in chronic disease management.",
    availability: "Tue-Sat, 11 AM - 7 PM",
  },
  {
    id: 3,
    name: "Dr. Lisa Anderson",
    specialization: "Naturopathy",
    qualifications: ["ND", "Certified Nutritionist", "Wellness Coach"],
    experience: "8 years",
    rating: 4.7,
    reviews: 128,
    location: "Bangalore, India",
    consultationFee: "₹550",
    image: "/professional-female-doctor-naturopathy-wellness.jpg",
    bio: "Focused on natural healing methods and preventive health care through lifestyle modifications.",
    availability: "Mon-Thu, 9 AM - 5 PM",
  },
  {
    id: 4,
    name: "Dr. Michael Chen",
    specialization: "Traditional Chinese Medicine",
    qualifications: ["DAOM", "Licensed Acupuncturist", "Herbal Medicine Specialist"],
    experience: "15 years",
    rating: 4.9,
    reviews: 287,
    location: "Pune, India",
    consultationFee: "₹600",
    image: "/professional-male-doctor-acupuncture-specialist.jpg",
    bio: "Specializing in acupuncture and herbal medicine with proven results in pain management.",
    availability: "Wed-Sun, 10 AM - 8 PM",
  },
  {
    id: 5,
    name: "Dr. Emma Wilson",
    specialization: "Herbal Medicine",
    qualifications: ["PhD Botany", "Certified Herbalist", "Clinical Herbalist"],
    experience: "9 years",
    rating: 4.8,
    reviews: 167,
    location: "Chennai, India",
    consultationFee: "₹500",
    image: "/professional-female-doctor-herbal-medicine-expert.jpg",
    bio: "Expert in medicinal plants and herbal formulations for various health conditions.",
    availability: "Mon-Fri, 1 PM - 7 PM",
  },
  {
    id: 6,
    name: "Dr. James Wilson",
    specialization: "Integrative Medicine",
    qualifications: ["MD", "Board Certified Integrative Medicine", "Wellness Specialist"],
    experience: "11 years",
    rating: 4.7,
    reviews: 194,
    location: "Hyderabad, India",
    consultationFee: "₹650",
    image: "/professional-male-doctor-integrative-medicine.jpg",
    bio: "Combining conventional and alternative medicine for comprehensive patient care.",
    availability: "Tue-Sat, 9 AM - 6 PM",
  },
]

export default function DoctorConsultation() {
  const [selectedDoctor, setSelectedDoctor] = useState<(typeof doctorsData)[0] | null>(null)
  const [showBooking, setShowBooking] = useState(false)
  const [bookingData, setBookingData] = useState({
    date: "",
    time: "",
    ailment: "",
    description: "",
  })

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Appointment booked with ${selectedDoctor?.name} on ${bookingData.date} at ${bookingData.time}`)
    setShowBooking(false)
    setBookingData({ date: "", time: "", ailment: "", description: "" })
  }

  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Consult a Doctor</h1>
          <p className="text-lg text-muted-foreground">
            Connect with experienced natural medicine practitioners and book your consultation
          </p>
        </div>

        {/* Doctors Grid */}
        {!selectedDoctor ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctorsData.map((doctor) => (
              <Card key={doctor.id} className="hover:shadow-lg transition overflow-hidden">
                {/* Doctor Image */}
                <div className="h-48 overflow-hidden bg-muted">
                  <img
                    src={doctor.image || "/placeholder.svg"}
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <CardContent className="pt-6">
                  {/* Doctor Info */}
                  <h3 className="text-xl font-bold text-foreground mb-1">{doctor.name}</h3>
                  <p className="text-sm text-teal-600 font-semibold mb-3">{doctor.specialization}</p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(doctor.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-foreground">{doctor.rating}</span>
                    <span className="text-xs text-muted-foreground">({doctor.reviews} reviews)</span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4" />
                    {doctor.location}
                  </div>

                  {/* Experience */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Briefcase className="w-4 h-4" />
                    {doctor.experience} experience
                  </div>

                  {/* Consultation Fee */}
                  <p className="text-lg font-bold text-foreground mb-4">{doctor.consultationFee} per consultation</p>

                  {/* View Details Button */}
                  <Button onClick={() => setSelectedDoctor(doctor)} className="w-full bg-teal-600 hover:bg-teal-700">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          /* Doctor Details View */
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Column - Doctor Info */}
            <div className="md:col-span-1">
              <Card>
                <div className="h-64 overflow-hidden bg-muted">
                  <img
                    src={selectedDoctor.image || "/placeholder.svg"}
                    alt={selectedDoctor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="pt-6 space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">{selectedDoctor.name}</h2>
                    <p className="text-teal-600 font-semibold">{selectedDoctor.specialization}</p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(selectedDoctor.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold text-foreground">{selectedDoctor.rating}</span>
                    <span className="text-sm text-muted-foreground">({selectedDoctor.reviews} reviews)</span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {selectedDoctor.location}
                  </div>

                  {/* Availability */}
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {selectedDoctor.availability}
                  </div>

                  {/* Fee */}
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground">Consultation Fee</p>
                    <p className="text-2xl font-bold text-foreground">{selectedDoctor.consultationFee}</p>
                  </div>

                  <Button onClick={() => setShowBooking(true)} className="w-full bg-teal-600 hover:bg-teal-700">
                    Book Appointment
                  </Button>

                  <Button onClick={() => setSelectedDoctor(null)} variant="outline" className="w-full">
                    Back to Doctors
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Details */}
            <div className="md:col-span-2 space-y-6">
              {/* Bio */}
              <Card>
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground leading-relaxed">{selectedDoctor.bio}</p>
                </CardContent>
              </Card>

              {/* Qualifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Qualifications & Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {selectedDoctor.qualifications.map((qual, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <span className="text-teal-600 font-bold">✓</span>
                        <span className="text-foreground">{qual}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Experience */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    Experience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground text-lg font-semibold">{selectedDoctor.experience}</p>
                  <p className="text-muted-foreground mt-2">
                    With over {selectedDoctor.experience.split(" ")[0]} years of experience in{" "}
                    {selectedDoctor.specialization}, {selectedDoctor.name} has helped hundreds of patients achieve
                    better health through natural remedies and holistic approaches.
                  </p>
                </CardContent>
              </Card>

              {/* Booking Form */}
              {showBooking && (
                <Card className="border-teal-600 border-2">
                  <CardHeader>
                    <CardTitle>Book an Appointment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleBookAppointment} className="space-y-4">
                      <div>
                        <label className="text-sm font-semibold text-foreground">Select Date</label>
                        <input
                          type="date"
                          value={bookingData.date}
                          onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground mt-1"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-foreground">Select Time</label>
                        <select
                          value={bookingData.time}
                          onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground mt-1"
                          required
                        >
                          <option value="">Choose a time slot</option>
                          <option value="10:00 AM">10:00 AM</option>
                          <option value="11:00 AM">11:00 AM</option>
                          <option value="2:00 PM">2:00 PM</option>
                          <option value="3:00 PM">3:00 PM</option>
                          <option value="4:00 PM">4:00 PM</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-foreground">Ailment/Concern</label>
                        <input
                          type="text"
                          value={bookingData.ailment}
                          onChange={(e) => setBookingData({ ...bookingData, ailment: e.target.value })}
                          placeholder="e.g., Back Pain, Acne"
                          className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground mt-1"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-foreground">Description</label>
                        <textarea
                          value={bookingData.description}
                          onChange={(e) => setBookingData({ ...bookingData, description: e.target.value })}
                          placeholder="Describe your symptoms or concerns..."
                          className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground mt-1 h-24 resize-none"
                          required
                        />
                      </div>

                      <div className="flex gap-3">
                        <Button type="submit" className="flex-1 bg-teal-600 hover:bg-teal-700">
                          Confirm Booking
                        </Button>
                        <Button
                          type="button"
                          onClick={() => setShowBooking(false)}
                          variant="outline"
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
