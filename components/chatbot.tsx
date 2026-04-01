'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MessageCircle, Send, Star, MapPin, Briefcase, ExternalLink } from 'lucide-react'
import { doctorsData, getBestDoctor, getDoctorsBySpecialty, type Doctor } from '@/data/doctors'
import remediesData from '@/data/remedies'

interface Message {
  role: 'user' | 'bot'
  content: string
  doctorProfile?: Doctor
  doctorProfiles?: Doctor[]
}

const quickOptions = [
  "Consult a doctor",
  "Find best doctor",
  "Browse ailments",
  "Health dashboard",
  "Doctor directory",
  "Share remedy"
]

const navigationMap: Record<string, string> = {
  'consult doctor': '/consult-doctor',
  'consult a doctor': '/consult-doctor',
  'consult me': '/consult-doctor',
  'dashboard': '/dashboard/user',
  'browse ailments': '/browse-ailments',
  'doctor directory': '/doctor-directory',
  'blogs': '/blogs',
  'community': '/explore-community',
  'login': '/login',
  'signup': '/signup',
  'contact': '/contact',
  'about': '/about',
  'share remedy': '/share-remedy',
  'doctor blogs': '/doctor-blogs',
  'doctor verifications': '/doctor-verifications',
}

function formatRemedies(disease: string, remedies: any[]): string {
  if (!remedies || remedies.length === 0) {
    return `Sorry, I don't have remedies for ${disease} yet. You can check the Browse Ailments section for more information.`
  }

  let response = `Here are some home remedies for ${disease}:\n\n`

  remedies.forEach((remedy, index) => {
    const verifiedBadge = remedy.isVerified ? "✅ " : ""
    const authorType = remedy.userContributed ? "Community" : "Professional"
    response += `${index + 1}. **${verifiedBadge}${remedy.title}**\n`
    response += `   By: ${remedy.author} (${authorType})\n`
    response += `   ${remedy.likes} likes\n`
    response += `   ${remedy.description}\n\n`
  })

  response += "Remember: These are home remedies and not medical advice. Consult a healthcare professional for serious conditions."

  return response
}

// Map of specialty synonyms/keywords to database specialty names
const specialtyKeywords: Record<string, string[]> = {
  'general medicine': ['general', 'general medicine', 'gp', 'family doctor', 'family medicine', 'general physician', 'general practitioner', 'fever', 'cold', 'flu'],
  'cardiology': ['cardiology', 'cardiologist', 'heart', 'heart doctor', 'cardiac', 'chest pain', 'blood pressure'],
  'dermatology': ['dermatology', 'dermatologist', 'skin', 'skin doctor', 'acne', 'rash', 'eczema'],
  'pediatrics': ['pediatrics', 'pediatrician', 'child', 'children', 'child doctor', 'kids', 'baby doctor'],
  'internal medicine': ['internal medicine', 'internist', 'internal'],
  'gynecology': ['gynecology', 'gynecologist', 'gynaecologist', 'gynaecology', 'gynec', 'ob-gyn', 'obgyn', 'obstetrics', 'women health', 'pregnancy', 'maternity'],
  'orthopedics': ['orthopedics', 'orthopedic', 'orthopaedic', 'bone', 'bone doctor', 'joint', 'fracture', 'spine'],
  'neurology': ['neurology', 'neurologist', 'brain', 'brain doctor', 'nerve', 'migraine', 'headache doctor'],
  'psychiatry': ['psychiatry', 'psychiatrist', 'mental health', 'mental', 'anxiety', 'depression', 'counselor', 'therapist'],
  'ophthalmology': ['ophthalmology', 'ophthalmologist', 'eye', 'eye doctor', 'vision', 'optometrist'],
  'dentistry': ['dentistry', 'dentist', 'dental', 'tooth', 'teeth'],
  'ent': ['ent', 'ear nose throat', 'ear', 'throat', 'nose', 'otolaryngologist', 'sinus'],
  'urology': ['urology', 'urologist', 'kidney', 'kidney doctor', 'bladder'],
  'oncology': ['oncology', 'oncologist', 'cancer', 'tumor', 'tumour'],
  'endocrinology': ['endocrinology', 'endocrinologist', 'diabetes', 'thyroid', 'hormone'],
  'pulmonology': ['pulmonology', 'pulmonologist', 'lung', 'lung doctor', 'asthma', 'breathing', 'respiratory'],
  'gastroenterology': ['gastroenterology', 'gastroenterologist', 'stomach', 'stomach doctor', 'digestion', 'liver', 'gastro'],
}

function detectSpecialty(msg: string): string | null {
  for (const [specialty, keywords] of Object.entries(specialtyKeywords)) {
    for (const keyword of keywords) {
      if (msg.includes(keyword)) {
        return specialty
      }
    }
  }
  return null
}

function getBotResponse(message: string): { response: string; shouldNavigate: boolean; doctorInfo?: Doctor; doctorList?: Doctor[] } {
  const msg = message.toLowerCase()

  // Check for remedy requests
  const remedyKeywords = ['remedies', 'remedy', 'cure', 'treatment', 'home remedy', 'natural remedy']
  const hasRemedyKeyword = remedyKeywords.some(keyword => msg.includes(keyword))

  if (hasRemedyKeyword) {
    for (const disease of Object.keys(remediesData)) {
      if (msg.includes(disease.replace('-', ' ')) || msg.includes(disease)) {
        const remedies = remediesData[disease]
        return {
          response: formatRemedies(disease.replace('-', ' '), remedies),
          shouldNavigate: false
        }
      }
    }
    return {
      response: "I can help you find home remedies for various conditions! Try asking for specific remedies like 'acne remedies' or 'headache remedies'. You can also browse all available remedies in the Browse Ailments section.",
      shouldNavigate: false
    }
  }

  // Check for doctor consultation / recommendation requests
  const isDoctorQuery = (
    msg.includes('consult') || msg.includes('find') || msg.includes('recommend') ||
    msg.includes('suggest') || msg.includes('need') || msg.includes('show') ||
    msg.includes('list') || msg.includes('available') || msg.includes('looking for')
  ) && (
    msg.includes('doctor') || msg.includes('specialist') || msg.includes('physician') ||
    detectSpecialty(msg) !== null
  )

  if (isDoctorQuery) {
    const specialty = detectSpecialty(msg)

    if (specialty) {
      // Search by specialty in the database
      const matchedDoctors = getDoctorsBySpecialty(specialty)

      if (matchedDoctors.length > 0) {
        return {
          response: `I found ${matchedDoctors.length} ${specialty} specialist${matchedDoctors.length > 1 ? 's' : ''} for you:`,
          shouldNavigate: false,
          doctorList: matchedDoctors
        }
      } else {
        // No exact match — show all available doctors as recommendations
        return {
          response: `We don't have a ${specialty} specialist in our database yet, but here are all our available doctors who might help you:`,
          shouldNavigate: false,
          doctorList: doctorsData
        }
      }
    }

    // Generic "consult a doctor" — show all doctors
    return {
      response: `Here are all our available doctors. You can choose one to consult:`,
      shouldNavigate: false,
      doctorList: doctorsData
    }
  }

  // "find best doctor" specifically
  if (msg.includes('find') && msg.includes('best')) {
    const bestDoctor = getBestDoctor()
    return {
      response: `I found our highest-rated doctor for you:`,
      shouldNavigate: false,
      doctorInfo: bestDoctor
    }
  }

  if (msg.includes('dashboard')) {
    return {
      response: "To check your health stats, go to the Dashboard section.",
      shouldNavigate: true
    }
  }
  if (msg.includes('ailment') || msg.includes('browse')) {
    return {
      response: "You can browse ailments from the Browse Ailments page.",
      shouldNavigate: true
    }
  }
  if (msg.includes('doctor') && msg.includes('directory')) {
    return {
      response: "I'll take you to the Doctor Directory to find healthcare professionals.",
      shouldNavigate: true
    }
  }
  if (msg.includes('blog') || msg.includes('article')) {
    return {
      response: "Check out health blogs in the Blogs section.",
      shouldNavigate: true
    }
  }
  if (msg.includes('community')) {
    return {
      response: "Join discussions in the Explore Community section.",
      shouldNavigate: true
    }
  }
  if (msg.includes('login') || msg.includes('signup')) {
    return {
      response: "Use the Login or Signup pages to access your account.",
      shouldNavigate: true
    }
  }
  if (msg.includes('help') || msg.includes('what can you do')) {
    return {
      response: "I can help you find information about features, services, and content in the app. I can guide you to different sections like Dashboard, Browse Ailments, Doctor Directory, and more. I can also help you find and consult with doctors, and share home remedies for various conditions!",
      shouldNavigate: false
    }
  }
  if (msg.includes('navigate') || msg.includes('how to')) {
    return {
      response: "Use the navigation menu at the top. For example, click on 'Browse Ailments' to explore health conditions, or 'Dashboard' for your personal health overview.",
      shouldNavigate: false
    }
  }
  if (msg.includes('search')) {
    return {
      response: "Use the search bar at the top to find what you're looking for quickly.",
      shouldNavigate: false
    }
  }
  return {
    response: "I'm here to help with navigation and information about Healthify. Try asking about specific features like dashboard, ailments, or doctors. You can also ask for home remedies like 'acne remedies' or 'headache remedies'.",
    shouldNavigate: false
  }
}

function DoctorProfileCard({ doctor, onViewProfile }: { doctor: Doctor; onViewProfile: (doctor: Doctor) => void }) {
  return (
    <div className="mt-2 rounded-lg border border-teal-200 bg-gradient-to-br from-teal-50 to-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-teal-600 px-3 py-2">
        <h4 className="text-white font-bold text-sm">{doctor.name}</h4>
        <p className="text-teal-100 text-xs">{doctor.specialty}</p>
      </div>
      {/* Body */}
      <div className="p-3 space-y-2">
        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${i < Math.floor(doctor.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
            />
          ))}
          <span className="text-xs font-semibold text-slate-700 ml-1">{doctor.rating}</span>
          <span className="text-xs text-slate-500">({doctor.reviews} reviews)</span>
        </div>
        {/* Details */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <MapPin className="w-3 h-3 text-teal-600" />
            {doctor.location}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <Briefcase className="w-3 h-3 text-teal-600" />
            {doctor.experience} experience
          </div>
        </div>
        {/* Bio */}
        <p className="text-xs text-slate-600 leading-relaxed">{doctor.bio}</p>
        {/* CTA */}
        <Button
          onClick={() => onViewProfile(doctor)}
          size="sm"
          className="w-full bg-teal-600 hover:bg-teal-700 text-white text-xs h-8 gap-1"
        >
          <ExternalLink className="w-3 h-3" />
          View Full Profile
        </Button>
      </div>
    </div>
  )
}

export default function Chatbot() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: 'Hello! I\'m your health assistant. I can help you find information about features, services, and guide you through the app. I can also help you consult with doctors and share home remedies for various conditions! How can I assist you today?' }
  ])
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = (message?: string) => {
    const msgToSend = message || input
    if (!msgToSend.trim()) return
    const userMessage: Message = { role: 'user', content: msgToSend }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    // Bot response
    setTimeout(() => {
      const botResult = getBotResponse(msgToSend)
      const botResponse: Message = { role: 'bot', content: botResult.response, doctorProfile: botResult.doctorInfo, doctorProfiles: botResult.doctorList }
      setMessages(prev => [...prev, botResponse])

      // Check for navigation
      if (botResult.shouldNavigate) {
        setTimeout(() => {
          // Find matching navigation path
          const path = Object.entries(navigationMap).find(([key]) =>
            msgToSend.toLowerCase().includes(key)
          )?.[1] || '/consult-doctor'
          router.push(path)
          setOpen(false)
        }, 1000) // Faster navigation
      }
    }, 500) // Faster response
  }

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 rounded-full w-12 h-12 p-0 z-50"
        size="icon"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md w-[95vw] sm:w-[420px] h-[650px] flex flex-col overflow-hidden rounded-xl border border-slate-200 shadow-lg bg-white">
          <DialogHeader>
            <DialogTitle>Health Chatbot</DialogTitle>
          </DialogHeader>
          <ScrollArea className="flex-1 p-0 overflow-hidden">
            <div
              ref={scrollRef}
              className="space-y-3 h-full overflow-y-auto px-3 pb-4 scroll-smooth"
              style={{ scrollBehavior: 'smooth' }}
            >
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-lg whitespace-pre-line text-sm ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-slate-100 text-slate-800'}`}>
                    {msg.content}
                    {msg.doctorProfile && (
                      <DoctorProfileCard
                        doctor={msg.doctorProfile}
                        onViewProfile={(doctor) => {
                          router.push(`/consult-doctor?doctorId=${doctor.id}`)
                          setOpen(false)
                        }}
                      />
                    )}
                    {msg.doctorProfiles && msg.doctorProfiles.map((doc) => (
                      <DoctorProfileCard
                        key={doc.id}
                        doctor={doc}
                        onViewProfile={(doctor) => {
                          router.push(`/consult-doctor?doctorId=${doctor.id}`)
                          setOpen(false)
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          <div className="p-3 border-t bg-white space-y-2">
            <div className="flex flex-wrap gap-2">
              {quickOptions.map((option, idx) => (
                <Button key={idx} variant="outline" size="sm" onClick={() => handleSend(option)}>
                  {option}
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 min-w-0"
              />
              <Button onClick={() => handleSend()} size="icon" className="h-10 w-10 p-0">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}