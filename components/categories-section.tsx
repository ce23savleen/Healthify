"use client"

import Link from "next/link"
import {
  Thermometer,
  Sparkles,
  Salad,
  Scissors,
  Shield,
  Brain,
} from "lucide-react"

const categories = [
  {
    icon: Thermometer,
    title: "Cough & Cold",
    description: "Natural relief for sore throat, runny nose, and congestion",
    color: "#059669",
    lightColor: "#d1fae5",
    ailment: "common-cold",
  },
  {
    icon: Sparkles,
    title: "Skin Care",
    description: "Glow naturally with herbal treatments for all skin types",
    color: "#f59e0b",
    lightColor: "#fef3c7",
    ailment: "acne",
  },
  {
    icon: Salad,
    title: "Digestion",
    description: "Soothe bloating, acidity, and improve gut health",
    color: "#10b981",
    lightColor: "#d1fae5",
    ailment: "indigestion",
  },
  {
    icon: Scissors,
    title: "Hair Care",
    description: "Fight dandruff, hair fall, and promote healthy growth",
    color: "#8b5cf6",
    lightColor: "#ede9fe",
    ailment: "dandruff",
  },
  {
    icon: Shield,
    title: "Immunity",
    description: "Boost your natural defense system with proven remedies",
    color: "#0891b2",
    lightColor: "#cffafe",
    ailment: "fever",
  },
  {
    icon: Brain,
    title: "Stress Relief",
    description: "Calm your mind with time-tested relaxation techniques",
    color: "#ec4899",
    lightColor: "#fce7f3",
    ailment: "anxiety",
  },
]

export default function CategoriesSection() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "#f0fdf4" }}>
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-30 blur-3xl" style={{ background: "radial-gradient(circle, #a7f3d0, transparent)" }} />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #6ee7b7, transparent)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold"
            style={{ background: "#d1fae5", color: "#059669" }}
          >
            <Shield className="w-4 h-4" />
            Browse Categories
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight"
            style={{ color: "#064e3b" }}
          >
            What Are You Looking For?
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#6b7280" }}>
            Explore remedies by category and find the natural solution for your health needs
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <Link href={`/ailment/${category.ailment}`} key={index}>
                <div
                  className="group relative rounded-2xl p-8 cursor-pointer transition-all duration-500 overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.7)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.8)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                    animationDelay: `${index * 0.1}s`,
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.style.transform = "translateY(-8px)"
                    el.style.boxShadow = `0 20px 40px ${category.color}20`
                    el.style.borderColor = `${category.color}40`
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.style.transform = "translateY(0)"
                    el.style.boxShadow = "0 4px 20px rgba(0,0,0,0.04)"
                    el.style.borderColor = "rgba(255,255,255,0.8)"
                  }}
                >
                  {/* Gradient background on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${category.lightColor}, rgba(255,255,255,0.9))`,
                    }}
                  />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                      style={{
                        background: `linear-gradient(135deg, ${category.color}15, ${category.color}25)`,
                        border: `1px solid ${category.color}20`,
                      }}
                    >
                      <Icon className="w-8 h-8" style={{ color: category.color }} />
                    </div>

                    {/* Text */}
                    <h3 className="text-xl font-bold mb-2 transition-colors duration-300" style={{ color: "#1f2937" }}>
                      {category.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#6b7280" }}>
                      {category.description}
                    </p>

                    {/* Arrow indicator */}
                    <div
                      className="mt-4 inline-flex items-center gap-1 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-2"
                      style={{ color: category.color }}
                    >
                      Explore →
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
