"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Star,
  MapPin,
  Briefcase,
  Award,
  Calendar,
  Search,
  Filter,
  ChevronRight,
  Clock,
  DollarSign,
  CheckCircle,
  Users,
  Heart,
  Shield,
  Sparkles,
  Stethoscope,
  ArrowLeft,
  Phone,
  Video,
  MessageCircle,
} from "lucide-react"

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

const specializations = ["All", "Ayurveda", "Homeopathy", "Naturopathy", "Traditional Chinese Medicine", "Herbal Medicine", "Integrative Medicine"]

export default function DoctorConsultation({ initialDoctorId }: { initialDoctorId?: number }) {
  const [selectedDoctor, setSelectedDoctor] = useState<(typeof doctorsData)[0] | null>(null)
  const [showBooking, setShowBooking] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpecialization, setSelectedSpecialization] = useState("All")
  const [bookingData, setBookingData] = useState({
    date: "",
    time: "",
    ailment: "",
    description: "",
  })

  // Auto-select doctor if navigated from chatbot with doctorId
  useEffect(() => {
    if (initialDoctorId) {
      const doctor = doctorsData.find((d) => d.id === initialDoctorId)
      if (doctor) {
        setSelectedDoctor(doctor)
      }
    }
  }, [initialDoctorId])

  const filteredDoctors = doctorsData.filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSpecialization = selectedSpecialization === "All" || doctor.specialization === selectedSpecialization
    return matchesSearch && matchesSpecialization
  })

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Appointment booked with ${selectedDoctor?.name} on ${bookingData.date} at ${bookingData.time}`)
    setShowBooking(false)
    setBookingData({ date: "", time: "", ailment: "", description: "" })
  }

  return (
    <section className="py-0 bg-background">
      {/* Hero Banner */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #064e3b 0%, #059669 50%, #10b981 100%)",
        }}
      >
        {/* Decorative elements */}
        <div className="absolute top-[-60px] right-[-40px] w-[200px] h-[200px] rounded-full opacity-10" style={{ background: "white" }} />
        <div className="absolute bottom-[-30px] left-[10%] w-[120px] h-[120px] rounded-full opacity-10" style={{ background: "white" }} />
        <div className="absolute top-[20px] left-[60%] w-[80px] h-[80px] rounded-full opacity-5" style={{ background: "white" }} />
        <div className="absolute bottom-[10px] right-[20%] w-[50px] h-[50px] rounded-full opacity-5" style={{ background: "white" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative z-10">
          <div className="flex items-center gap-6">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(12px)" }}
            >
              <Stethoscope className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Consult a Doctor
              </h1>
              <p className="text-emerald-100 mt-2 text-base md:text-lg max-w-2xl">
                Connect with experienced natural medicine practitioners and book your consultation
              </p>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center gap-6 mt-8 flex-wrap">
            {[
              { icon: Shield, text: "Verified Doctors" },
              { icon: Users, text: "10,000+ Consultations" },
              { icon: Star, text: "4.8 Avg Rating" },
              { icon: Clock, text: "Quick Appointments" },
            ].map((item) => (
              <span
                key={item.text}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white/10 backdrop-blur-sm text-white border border-white/15"
              >
                <item.icon className="w-4 h-4" />
                {item.text}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Doctors Grid View */}
        {!selectedDoctor ? (
          <>
            {/* Search and Filter Bar */}
            <div
              className="rounded-2xl p-6 mb-8 shadow-lg border border-white/60"
              style={{ background: "linear-gradient(145deg, #ffffff, #f0fdf4)" }}
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search doctors by name, specialization, or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-emerald-100 bg-white text-foreground transition-all duration-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none hover:border-emerald-200"
                    style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
                  />
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Filter className="w-4 h-4 text-muted-foreground hidden md:block" />
                  {specializations.map((spec) => (
                    <button
                      key={spec}
                      onClick={() => setSelectedSpecialization(spec)}
                      className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap"
                      style={
                        selectedSpecialization === spec
                          ? {
                              background: "linear-gradient(135deg, #059669, #10b981)",
                              color: "white",
                              boxShadow: "0 4px 12px rgba(5, 150, 105, 0.3)",
                            }
                          : {
                              background: "#f0fdf4",
                              color: "#064e3b",
                              border: "1px solid rgba(209,250,229,0.8)",
                            }
                      }
                    >
                      {spec}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground text-sm">
                Showing <span className="font-bold text-foreground">{filteredDoctors.length}</span> doctors
              </p>
            </div>

            {/* Doctor Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map((doctor, index) => (
                <div
                  key={doctor.id}
                  className="group rounded-2xl overflow-hidden shadow-md border border-white/60 transition-all duration-400 hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
                  style={{
                    background: "linear-gradient(145deg, #ffffff, #f0fdf4)",
                    animation: `fadeInUp 0.4s ease-out ${index * 0.1}s both`,
                  }}
                  onClick={() => setSelectedDoctor(doctor)}
                >
                  {/* Doctor Image with Overlay */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={doctor.image || "/placeholder.svg"}
                      alt={doctor.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: "linear-gradient(to top, rgba(6,78,59,0.7), transparent 60%)" }}
                    />
                    {/* Rating Badge */}
                    <div
                      className="absolute top-4 right-4 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg"
                      style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(8px)" }}
                    >
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-bold text-foreground">{doctor.rating}</span>
                    </div>
                    {/* Specialization Badge */}
                    <div
                      className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg"
                      style={{ background: "linear-gradient(135deg, #059669, #10b981)", color: "white" }}
                    >
                      {doctor.specialization}
                    </div>
                  </div>

                  {/* Doctor Info */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-emerald-700 transition-colors">
                      {doctor.name}
                    </h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "#ecfdf5" }}>
                          <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                        </div>
                        {doctor.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "#ecfdf5" }}>
                          <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                        </div>
                        {doctor.experience} experience
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "#ecfdf5" }}>
                          <Users className="w-3.5 h-3.5 text-emerald-600" />
                        </div>
                        {doctor.reviews} reviews
                      </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid rgba(209,250,229,0.6)" }}>
                      <div>
                        <p className="text-xs text-muted-foreground">Consultation</p>
                        <p className="text-lg font-bold text-foreground">{doctor.consultationFee}</p>
                      </div>
                      <Button
                        className="gap-2 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.03] text-sm font-semibold"
                        style={{ background: "linear-gradient(135deg, #064e3b, #059669)" }}
                      >
                        View Profile
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredDoctors.length === 0 && (
              <div className="text-center py-20">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ background: "linear-gradient(135deg, #ecfdf5, #d1fae5)" }}
                >
                  <Search className="w-10 h-10 text-emerald-400" />
                </div>
                <p className="text-lg font-semibold text-foreground mb-2">No doctors found</p>
                <p className="text-muted-foreground text-sm">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </>
        ) : (
          /* Doctor Details View */
          <div style={{ animation: "fadeInUp 0.4s ease-out" }}>
            {/* Back Button */}
            <button
              onClick={() => setSelectedDoctor(null)}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-6 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to all doctors
            </button>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Left Column - Doctor Info */}
              <div className="md:col-span-1">
                <div
                  className="rounded-2xl overflow-hidden shadow-lg border border-white/60 sticky top-8"
                  style={{ background: "linear-gradient(145deg, #ffffff, #f0fdf4)" }}
                >
                  {/* Image */}
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={selectedDoctor.image || "/placeholder.svg"}
                      alt={selectedDoctor.name}
                      className="w-full h-full object-cover"
                    />
                    <div
                      className="absolute bottom-0 left-0 right-0 p-4"
                      style={{ background: "linear-gradient(to top, rgba(6,78,59,0.8), transparent)" }}
                    >
                      <span
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{ background: "linear-gradient(135deg, #059669, #10b981)", color: "white" }}
                      >
                        {selectedDoctor.specialization}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-5">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground tracking-tight">{selectedDoctor.name}</h2>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(selectedDoctor.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <span className="font-bold text-foreground text-sm">{selectedDoctor.rating}</span>
                        <span className="text-xs text-muted-foreground">({selectedDoctor.reviews} reviews)</span>
                      </div>
                    </div>

                    {/* Quick Info Cards */}
                    <div className="space-y-3">
                      {[
                        { icon: MapPin, text: selectedDoctor.location, gradient: "linear-gradient(135deg, #059669, #10b981)" },
                        { icon: Calendar, text: selectedDoctor.availability, gradient: "linear-gradient(135deg, #7c3aed, #8b5cf6)" },
                        { icon: Briefcase, text: `${selectedDoctor.experience} experience`, gradient: "linear-gradient(135deg, #0891b2, #06b6d4)" },
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-3 rounded-xl"
                          style={{ background: "rgba(5,150,105,0.04)", border: "1px solid rgba(209,250,229,0.4)" }}
                        >
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                            style={{ background: item.gradient }}
                          >
                            <item.icon className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-sm text-foreground font-medium">{item.text}</span>
                        </div>
                      ))}
                    </div>

                    {/* Fee */}
                    <div
                      className="p-4 rounded-xl text-center"
                      style={{ background: "linear-gradient(135deg, rgba(5,150,105,0.06), rgba(16,185,129,0.04))", border: "1px solid rgba(16,185,129,0.12)" }}
                    >
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Consultation Fee</p>
                      <p className="text-3xl font-extrabold text-foreground">{selectedDoctor.consultationFee}</p>
                      <p className="text-xs text-muted-foreground mt-1">per session</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <Button
                        onClick={() => setShowBooking(true)}
                        className="w-full gap-2 rounded-xl py-3 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] text-sm font-semibold"
                        style={{ background: "linear-gradient(135deg, #064e3b, #059669)" }}
                      >
                        <Calendar className="w-4 h-4" />
                        Book Appointment
                      </Button>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { icon: Phone, label: "Call" },
                          { icon: Video, label: "Video" },
                          { icon: MessageCircle, label: "Chat" },
                        ].map((action) => (
                          <button
                            key={action.label}
                            className="flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all duration-300 hover:shadow-md text-muted-foreground hover:text-emerald-600"
                            style={{ background: "#f0fdf4", border: "1px solid rgba(209,250,229,0.6)" }}
                          >
                            <action.icon className="w-4 h-4" />
                            <span className="text-xs font-medium">{action.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Details */}
              <div className="md:col-span-2 space-y-6">
                {/* Bio Card */}
                <div
                  className="rounded-2xl overflow-hidden shadow-lg border border-white/60"
                  style={{ background: "linear-gradient(145deg, #ffffff, #f0fdf4)" }}
                >
                  <div className="h-1.5" style={{ background: "linear-gradient(90deg, #064e3b, #059669, #10b981, #34d399)" }} />
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
                        style={{ background: "linear-gradient(135deg, #059669, #10b981)" }}
                      >
                        <Heart className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground">About</h3>
                    </div>
                    <p className="text-foreground leading-relaxed">{selectedDoctor.bio}</p>
                  </div>
                </div>

                {/* Qualifications Card */}
                <div
                  className="rounded-2xl overflow-hidden shadow-lg border border-white/60"
                  style={{ background: "linear-gradient(145deg, #ffffff, #f0fdf4)" }}
                >
                  <div className="h-1.5" style={{ background: "linear-gradient(90deg, #7c3aed, #8b5cf6, #a78bfa)" }} />
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
                        style={{ background: "linear-gradient(135deg, #7c3aed, #8b5cf6)" }}
                      >
                        <Award className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground">Qualifications & Certifications</h3>
                    </div>
                    <div className="space-y-3">
                      {selectedDoctor.qualifications.map((qual, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-3 rounded-xl transition-all duration-300 hover:shadow-sm"
                          style={{ background: "linear-gradient(145deg, #f5f3ff, #ffffff)", border: "1px solid rgba(221,214,254,0.4)" }}
                        >
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                            style={{ background: "linear-gradient(135deg, #7c3aed, #8b5cf6)" }}
                          >
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-foreground font-medium text-sm">{qual}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Experience Card */}
                <div
                  className="rounded-2xl overflow-hidden shadow-lg border border-white/60"
                  style={{ background: "linear-gradient(145deg, #ffffff, #f0fdf4)" }}
                >
                  <div className="h-1.5" style={{ background: "linear-gradient(90deg, #0891b2, #06b6d4, #22d3ee)" }} />
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
                        style={{ background: "linear-gradient(135deg, #0891b2, #06b6d4)" }}
                      >
                        <Briefcase className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground">Experience</h3>
                    </div>
                    <div
                      className="p-4 rounded-xl mb-3"
                      style={{ background: "linear-gradient(145deg, #ecfeff, #ffffff)", border: "1px solid rgba(165,243,252,0.4)" }}
                    >
                      <p className="text-2xl font-extrabold text-foreground">{selectedDoctor.experience}</p>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      With over {selectedDoctor.experience.split(" ")[0]} years of experience in{" "}
                      {selectedDoctor.specialization}, {selectedDoctor.name} has helped hundreds of patients achieve
                      better health through natural remedies and holistic approaches.
                    </p>
                  </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { icon: Users, count: selectedDoctor.reviews, label: "Happy Patients", gradient: "linear-gradient(135deg, #059669, #10b981)", bgGradient: "linear-gradient(145deg, #ecfdf5, #d1fae5)", iconColor: "#059669" },
                    { icon: Star, count: selectedDoctor.rating, label: "Average Rating", gradient: "linear-gradient(135deg, #d97706, #f59e0b)", bgGradient: "linear-gradient(145deg, #fef3c7, #fde68a)", iconColor: "#d97706" },
                    { icon: Award, count: selectedDoctor.qualifications.length, label: "Certifications", gradient: "linear-gradient(135deg, #7c3aed, #8b5cf6)", bgGradient: "linear-gradient(145deg, #ede9fe, #ddd6fe)", iconColor: "#7c3aed" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="group relative rounded-2xl border border-white/60 p-5 text-center shadow-md transition-all duration-400 hover:shadow-xl hover:-translate-y-1 cursor-default overflow-hidden"
                      style={{ background: "linear-gradient(145deg, #ffffff, #f0fdf4)" }}
                    >
                      <div
                        className="absolute top-0 left-[20%] right-[20%] h-[3px] rounded-b-full opacity-60 group-hover:opacity-100 group-hover:left-[10%] group-hover:right-[10%] transition-all duration-500"
                        style={{ background: stat.gradient }}
                      />
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-sm transition-all duration-300 group-hover:scale-110"
                        style={{ background: stat.bgGradient }}
                      >
                        <stat.icon className="w-5 h-5" style={{ color: stat.iconColor }} />
                      </div>
                      <p className="text-2xl font-extrabold text-foreground">{stat.count}</p>
                      <p className="text-[11px] font-medium text-muted-foreground mt-1 tracking-wide">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Booking Form */}
                {showBooking && (
                  <div
                    className="rounded-2xl overflow-hidden shadow-xl border-2"
                    style={{
                      background: "linear-gradient(145deg, #ffffff, #f0fdf4)",
                      borderColor: "#059669",
                      animation: "fadeInUp 0.4s ease-out",
                    }}
                  >
                    <div className="h-2" style={{ background: "linear-gradient(90deg, #064e3b, #059669, #10b981, #34d399)" }} />
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-6">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
                          style={{ background: "linear-gradient(135deg, #059669, #10b981)" }}
                        >
                          <Calendar className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-foreground">Book an Appointment</h3>
                      </div>

                      <form onSubmit={handleBookAppointment} className="space-y-5">
                        <div className="grid md:grid-cols-2 gap-5">
                          <div>
                            <label className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-emerald-600" />
                              Select Date
                            </label>
                            <input
                              type="date"
                              value={bookingData.date}
                              onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                              className="w-full px-4 py-3.5 rounded-xl border-2 border-emerald-100 bg-white text-foreground transition-all duration-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none hover:border-emerald-200"
                              style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
                              required
                            />
                          </div>

                          <div>
                            <label className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                              <Clock className="w-4 h-4 text-emerald-600" />
                              Select Time
                            </label>
                            <select
                              value={bookingData.time}
                              onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                              className="w-full px-4 py-3.5 rounded-xl border-2 border-emerald-100 bg-white text-foreground transition-all duration-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none hover:border-emerald-200"
                              style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
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
                        </div>

                        <div>
                          <label className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                            <Stethoscope className="w-4 h-4 text-emerald-600" />
                            Ailment/Concern
                          </label>
                          <input
                            type="text"
                            value={bookingData.ailment}
                            onChange={(e) => setBookingData({ ...bookingData, ailment: e.target.value })}
                            placeholder="e.g., Back Pain, Acne"
                            className="w-full px-4 py-3.5 rounded-xl border-2 border-emerald-100 bg-white text-foreground transition-all duration-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none hover:border-emerald-200"
                            style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
                            required
                          />
                        </div>

                        <div>
                          <label className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                            <MessageCircle className="w-4 h-4 text-emerald-600" />
                            Description
                          </label>
                          <textarea
                            value={bookingData.description}
                            onChange={(e) => setBookingData({ ...bookingData, description: e.target.value })}
                            placeholder="Describe your symptoms or concerns..."
                            className="w-full px-4 py-3.5 rounded-xl border-2 border-emerald-100 bg-white text-foreground transition-all duration-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none hover:border-emerald-200 h-28 resize-none"
                            style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
                            required
                          />
                        </div>

                        <div className="flex gap-4 pt-2">
                          <Button
                            type="submit"
                            className="flex-1 gap-2 rounded-xl py-3 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] text-sm font-semibold"
                            style={{ background: "linear-gradient(135deg, #064e3b, #059669)" }}
                          >
                            <CheckCircle className="w-4 h-4" />
                            Confirm Booking
                          </Button>
                          <Button
                            type="button"
                            onClick={() => setShowBooking(false)}
                            variant="outline"
                            className="flex-1 rounded-xl py-3 text-sm font-semibold hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
