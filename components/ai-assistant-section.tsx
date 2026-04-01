"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Sparkles, MessageCircle, X, Leaf } from "lucide-react"

const quickSuggestions = [
  "Remedies for headache",
  "How to boost immunity?",
  "Best remedy for cough",
  "Skin care tips",
  "Digestion problems",
  "Hair fall remedies",
]

const botResponses: Record<string, string> = {
  headache:
    "For headaches, try applying peppermint oil to your temples or drink ginger tea with honey. A cold compress on the forehead for 15 minutes also works wonders! 🌿",
  immunity:
    "To boost immunity naturally, try Turmeric Golden Milk daily, eat citrus fruits, take Tulsi (Holy Basil) tea, and include garlic & ginger in your meals! 🛡️",
  cough:
    "For cough relief, mix honey with warm water and lemon. Turmeric milk before bed is also highly effective. Steam inhalation with eucalyptus oil can clear congestion! 🍯",
  skin:
    "For glowing skin, apply fresh aloe vera gel, use a turmeric and honey face mask, and drink plenty of water. Rose water toner works great too! ✨",
  digestion:
    "For digestive issues, drink warm water with lemon in the morning, chew fennel seeds after meals, and try peppermint tea. Ginger also stimulates digestion! 🌱",
  hair:
    "For hair health, massage warm coconut oil weekly, use an egg and yogurt hair mask, rinse with apple cider vinegar, and eat iron-rich foods! 💇",
  default:
    "I can help you find natural remedies for various health conditions! Try asking about headaches, cough, skin care, immunity, digestion, or hair care. You can also browse our full remedy library! 🌿",
}

function getAIResponse(message: string): string {
  const msg = message.toLowerCase()
  if (msg.includes("headache") || msg.includes("head pain") || msg.includes("migraine")) return botResponses.headache
  if (msg.includes("immunity") || msg.includes("immune") || msg.includes("boost")) return botResponses.immunity
  if (msg.includes("cough") || msg.includes("cold") || msg.includes("sore throat")) return botResponses.cough
  if (msg.includes("skin") || msg.includes("acne") || msg.includes("glow") || msg.includes("face")) return botResponses.skin
  if (msg.includes("digest") || msg.includes("stomach") || msg.includes("bloat") || msg.includes("gas")) return botResponses.digestion
  if (msg.includes("hair") || msg.includes("dandruff") || msg.includes("scalp")) return botResponses.hair
  return botResponses.default
}

interface ChatMessage {
  role: "user" | "bot"
  content: string
}

export default function AIAssistantSection() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "bot",
      content: "👋 Hello! I'm your AI Health Assistant. Ask me about any symptom or health concern, and I'll suggest natural home remedies for you!",
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = (message?: string) => {
    const msgToSend = message || input
    if (!msgToSend.trim()) return

    setMessages((prev) => [...prev, { role: "user", content: msgToSend }])
    setInput("")
    setIsTyping(true)

    setTimeout(() => {
      const response = getAIResponse(msgToSend)
      setMessages((prev) => [...prev, { role: "bot", content: response }])
      setIsTyping(false)
    }, 800)
  }

  return (
    <section id="ai-assistant" className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #064e3b, #065f46, #047857)" }}>
      {/* Background Decorations */}
      <div className="absolute top-10 right-10 w-64 h-64 rounded-full opacity-10 blur-3xl" style={{ background: "#6ee7b7" }} />
      <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full opacity-10 blur-3xl" style={{ background: "#a7f3d0" }} />
      <div className="absolute top-1/2 left-1/4 opacity-5">
        <Leaf className="w-48 h-48 text-white rotate-45" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold"
              style={{
                background: "rgba(167,243,208,0.15)",
                color: "#a7f3d0",
                border: "1px solid rgba(167,243,208,0.2)",
              }}
            >
              <Bot className="w-4 h-4" />
              AI-Powered Assistant
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Your Personal{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #6ee7b7, #34d399)" }}>
                Health Guide
              </span>
            </h2>

            <p className="text-lg leading-relaxed" style={{ color: "rgba(167,243,208,0.7)" }}>
              Our AI-powered assistant helps you find the right remedies instantly. Simply describe your symptoms or ask
              about any health concern, and get personalized natural remedy suggestions.
            </p>

            <div className="space-y-4">
              {[
                "Instant remedy suggestions based on symptoms",
                "Personalized health tips and recommendations",
                "Browse remedies, navigate pages, and more",
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(52,211,153,0.2)" }}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                  </div>
                  <span className="text-emerald-100/80 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Chat Widget */}
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "0 24px 64px rgba(0,0,0,0.3)",
            }}
          >
            {/* Chat Header */}
            <div
              className="flex items-center gap-3 px-6 py-4"
              style={{
                background: "linear-gradient(135deg, rgba(16,185,129,0.3), rgba(5,150,105,0.3))",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div className="relative">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}
                >
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-400 border-2 border-[#064e3b]" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm">Healthify AI Assistant</h4>
                <p className="text-xs" style={{ color: "#6ee7b7" }}>Online • Ready to help</p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="h-80 overflow-y-auto px-4 py-4 space-y-4" style={{ scrollBehavior: "smooth" }}>
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                    style={{
                      background: msg.role === "user" ? "linear-gradient(135deg, #3b82f6, #2563eb)" : "linear-gradient(135deg, #10b981, #059669)",
                    }}
                  >
                    {msg.role === "user" ? (
                      <User className="w-3.5 h-3.5 text-white" />
                    ) : (
                      <Bot className="w-3.5 h-3.5 text-white" />
                    )}
                  </div>
                  <div
                    className="max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed"
                    style={{
                      background:
                        msg.role === "user"
                          ? "linear-gradient(135deg, #3b82f6, #2563eb)"
                          : "rgba(255,255,255,0.1)",
                      color: "white",
                      borderBottomRightRadius: msg.role === "user" ? "4px" : "16px",
                      borderBottomLeftRadius: msg.role === "bot" ? "4px" : "16px",
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2.5">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}
                  >
                    <Bot className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div
                    className="px-4 py-3 rounded-2xl"
                    style={{ background: "rgba(255,255,255,0.1)" }}
                  >
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-300 animate-bounce" />
                      <div className="w-2 h-2 rounded-full bg-emerald-300 animate-bounce" style={{ animationDelay: "0.15s" }} />
                      <div className="w-2 h-2 rounded-full bg-emerald-300 animate-bounce" style={{ animationDelay: "0.3s" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            <div className="px-4 pb-2">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {quickSuggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(suggestion)}
                    className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105 cursor-pointer"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      color: "#a7f3d0",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(167,243,208,0.15)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.08)"
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Input */}
            <div className="px-4 pb-4">
              <div
                className="flex items-center gap-2 rounded-2xl px-4"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Describe your symptom..."
                  className="flex-1 bg-transparent text-white placeholder-emerald-200/40 py-3.5 text-sm focus:outline-none"
                />
                <button
                  onClick={() => handleSend()}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
                  style={{
                    background: "linear-gradient(135deg, #10b981, #059669)",
                  }}
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
