"use client"

import { useState, useEffect } from "react"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Delhi, India",
    avatar: "PS",
    rating: 5,
    text: "This remedy worked perfectly for my cold! The ginger honey tea cleared my congestion within a day. Healthify is my go-to for natural remedies now.",
    remedy: "Ginger Honey Tea",
    color: "#059669",
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    location: "Mumbai, India",
    avatar: "RK",
    rating: 5,
    text: "Turmeric golden milk has been a game changer for my joint pain. I've been using it for 3 months and the inflammation has reduced significantly.",
    remedy: "Turmeric Golden Milk",
    color: "#d97706",
  },
  {
    id: 3,
    name: "Ananya Patel",
    location: "Bangalore, India",
    avatar: "AP",
    rating: 4,
    text: "The aloe vera skin treatment from Healthify cleared my acne in just 2 weeks! I love that all remedies are natural and have no side effects.",
    remedy: "Aloe Vera Treatment",
    color: "#10b981",
  },
  {
    id: 4,
    name: "Sanjay Mehta",
    location: "Chennai, India",
    avatar: "SM",
    rating: 5,
    text: "The peppermint tea remedy for digestion is amazing. I used to suffer from bloating after every meal. Now I just have a cup of mint tea and feel great!",
    remedy: "Peppermint Tea",
    color: "#0891b2",
  },
  {
    id: 5,
    name: "Neha Gupta",
    location: "Kolkata, India",
    avatar: "NG",
    rating: 5,
    text: "I love the AI health assistant! It helped me find the perfect remedy for my insomnia. Warm milk with nutmeg has improved my sleep quality dramatically.",
    remedy: "Warm Nutmeg Milk",
    color: "#8b5cf6",
  },
  {
    id: 6,
    name: "Arjun Singh",
    location: "Pune, India",
    avatar: "AS",
    rating: 4,
    text: "The coconut oil hair treatment stopped my hair fall within a month. The step-by-step instructions make it so easy to follow. Highly recommend!",
    remedy: "Coconut Oil Treatment",
    color: "#ec4899",
  },
]

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [itemsPerView, setItemsPerView] = useState(3)

  useEffect(() => {
    const updateView = () => {
      setItemsPerView(window.innerWidth >= 768 ? 3 : 1)
    }
    updateView()
    window.addEventListener("resize", updateView)
    return () => window.removeEventListener("resize", updateView)
  }, [])

  const maxIndex = Math.max(0, testimonials.length - itemsPerView)

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
    }, 4000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, maxIndex])

  const goTo = (index: number) => {
    setActiveIndex(Math.max(0, Math.min(index, maxIndex)))
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 8000)
  }

  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "#f0fdf4" }}>
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 20% 50%, #059669 1px, transparent 1px), radial-gradient(circle at 80% 50%, #059669 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold"
            style={{ background: "#dbeafe", color: "#2563eb" }}
          >
            <Star className="w-4 h-4" />
            Testimonials
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight" style={{ color: "#064e3b" }}>
            What Our Users Say
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#6b7280" }}>
            Real stories from real people who found relief through natural remedies
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={() => goTo(activeIndex - 1)}
            disabled={activeIndex === 0}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-30 disabled:hover:scale-100 cursor-pointer"
            style={{
              background: "white",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <ChevronLeft className="w-5 h-5" style={{ color: "#064e3b" }} />
          </button>
          <button
            onClick={() => goTo(activeIndex + 1)}
            disabled={activeIndex >= maxIndex}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-30 disabled:hover:scale-100 cursor-pointer"
            style={{
              background: "white",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <ChevronRight className="w-5 h-5" style={{ color: "#064e3b" }} />
          </button>

          {/* Cards Container */}
          <div className="overflow-hidden px-2">
            <div
              className="flex gap-6 transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${activeIndex * (100 / itemsPerView)}%)`,
              }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex-shrink-0 w-full md:w-[calc(33.333%-16px)]"
                >
                  <div
                    className="h-full rounded-2xl p-7 relative overflow-hidden transition-all duration-500"
                    style={{
                      background: "rgba(255,255,255,0.8)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255,255,255,0.9)",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)"
                      e.currentTarget.style.boxShadow = "0 12px 40px rgba(5,150,105,0.1)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)"
                      e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.04)"
                    }}
                  >
                    {/* Quote Icon */}
                    <div className="absolute top-4 right-4 opacity-10">
                      <Quote className="w-12 h-12" style={{ color: testimonial.color }} />
                    </div>

                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4"
                          style={{
                            color: i < testimonial.rating ? "#f59e0b" : "#e5e7eb",
                            fill: i < testimonial.rating ? "#f59e0b" : "transparent",
                          }}
                        />
                      ))}
                    </div>

                    {/* Text */}
                    <p className="text-sm leading-relaxed mb-6" style={{ color: "#4b5563" }}>
                      &ldquo;{testimonial.text}&rdquo;
                    </p>

                    {/* Remedy Tag */}
                    <div
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-5"
                      style={{
                        background: `${testimonial.color}10`,
                        color: testimonial.color,
                      }}
                    >
                      Used: {testimonial.remedy}
                    </div>

                    {/* User Info */}
                    <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid #f3f4f6" }}>
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white"
                        style={{ background: `linear-gradient(135deg, ${testimonial.color}, ${testimonial.color}cc)` }}
                      >
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold" style={{ color: "#1f2937" }}>
                          {testimonial.name}
                        </h4>
                        <p className="text-xs" style={{ color: "#9ca3af" }}>
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="transition-all duration-300 rounded-full cursor-pointer"
                style={{
                  width: activeIndex === i ? "32px" : "8px",
                  height: "8px",
                  background: activeIndex === i ? "#059669" : "#d1d5db",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
