'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MessageCircle, Send } from 'lucide-react'
import { doctorsData, getBestDoctor, getDoctorsBySpecialty, type Doctor } from '@/data/doctors'
import remediesData from '@/data/remedies'

interface Message {
  role: 'user' | 'bot'
  content: string
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

function getBotResponse(message: string): { response: string; shouldNavigate: boolean; doctorInfo?: Doctor } {
  const msg = message.toLowerCase()

  // Check for remedy requests
  const remedyKeywords = ['remedies', 'remedy', 'cure', 'treatment', 'home remedy', 'natural remedy']
  const hasRemedyKeyword = remedyKeywords.some(keyword => msg.includes(keyword))

  if (hasRemedyKeyword) {
    // Try to find the disease name in the message
    for (const disease of Object.keys(remediesData)) {
      if (msg.includes(disease.replace('-', ' ')) || msg.includes(disease)) {
        const remedies = remediesData[disease]
        return {
          response: formatRemedies(disease.replace('-', ' '), remedies),
          shouldNavigate: false
        }
      }
    }

    // If no specific disease found, suggest browsing ailments
    return {
      response: "I can help you find home remedies for various conditions! Try asking for specific remedies like 'acne remedies' or 'headache remedies'. You can also browse all available remedies in the Browse Ailments section.",
      shouldNavigate: false
    }
  }

  // Check for doctor consultation requests
  if (msg.includes('consult') && (msg.includes('doctor') || msg.includes('best') || msg.includes('good'))) {
    const bestDoctor = getBestDoctor()
    return {
      response: `Here's our top-rated doctor for consultation:\n\n**${bestDoctor.name}**\nSpecialty: ${bestDoctor.specialty}\nExperience: ${bestDoctor.experience}\nRating: ${bestDoctor.rating}⭐ (${bestDoctor.reviews} reviews)\nLocation: ${bestDoctor.location}\n\nI'll take you to the consultation page now.`,
      shouldNavigate: true,
      doctorInfo: bestDoctor
    }
  }

  if (msg.includes('find') && msg.includes('doctor')) {
    const bestDoctor = getBestDoctor()
    return {
      response: `I found our highest-rated doctor for you:\n\n**${bestDoctor.name}**\nSpecialty: ${bestDoctor.specialty}\nExperience: ${bestDoctor.experience}\nRating: ${bestDoctor.rating}⭐\n\nWould you like to consult with this doctor?`,
      shouldNavigate: false
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
      const botResponse: Message = { role: 'bot', content: botResult.response }
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