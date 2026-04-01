"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search, Sparkles, MessageCircle, Leaf, Heart } from "lucide-react"

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden" style={{ paddingBottom: "80px" }}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-natural-remedies.png"
          alt="Natural remedies background"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d3b2e]/90 via-[#0d3b2e]/70 to-[#0d3b2e]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d3b2e]/60 via-transparent to-[#e8f5e9]/20" />
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-emerald-400/10 blur-3xl animate-pulse" />
      <div className="absolute bottom-40 right-40 w-48 h-48 rounded-full bg-teal-300/10 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute top-40 left-1/2 w-24 h-24 rounded-full bg-green-200/10 blur-2xl animate-pulse" style={{ animationDelay: "2s" }} />

      {/* Floating Leaf Icons */}
      <div className="absolute top-32 right-1/4 opacity-20 animate-bounce" style={{ animationDuration: "3s" }}>
        <Leaf className="w-8 h-8 text-emerald-300" />
      </div>
      <div className="absolute bottom-32 left-1/3 opacity-15 animate-bounce" style={{ animationDuration: "4s", animationDelay: "1s" }}>
        <Heart className="w-6 h-6 text-green-300" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl space-y-8 pt-8">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
            style={{
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.18)",
              color: "#a7f3d0",
              animation: "fadeInUp 0.6s ease-out",
            }}
          >
            <Sparkles className="w-4 h-4" />
            Trusted by 50,000+ users worldwide
          </div>

          {/* Heading */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight"
            style={{ animation: "fadeInUp 0.8s ease-out 0.1s both" }}
          >
            <span className="text-white">Natural Home Remedies</span>
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #6ee7b7, #34d399, #a7f3d0)",
              }}
            >
              for Everyday Health
            </span>
          </h1>

          {/* Subheading */}
          <p
            className="text-lg sm:text-xl text-emerald-100/80 max-w-2xl leading-relaxed"
            style={{ animation: "fadeInUp 0.8s ease-out 0.2s both" }}
          >
            Find safe and effective remedies for cough, cold, skin care, digestion, and overall wellness — backed by
            traditional wisdom and expert verification.
          </p>

          {/* Search Bar */}
          <div
            className="relative max-w-xl"
            style={{ animation: "fadeInUp 0.8s ease-out 0.3s both" }}
          >
            <div
              className="flex items-center rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.2)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
              }}
            >
              <Search className="w-5 h-5 text-emerald-300 ml-5 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search symptoms or remedies (e.g., headache, turmeric, cough)..."
                className="flex-1 bg-transparent text-white placeholder-emerald-200/50 px-4 py-4 text-sm sm:text-base focus:outline-none"
              />
              <Link href={searchQuery ? `/browse-ailments?q=${encodeURIComponent(searchQuery)}` : "/browse-ailments"}>
                <button
                  className="m-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 cursor-pointer"
                  style={{
                    background: "linear-gradient(135deg, #059669, #10b981)",
                    color: "white",
                    boxShadow: "0 4px 16px rgba(16,185,129,0.4)",
                  }}
                >
                  Search
                </button>
              </Link>
            </div>
          </div>

          {/* CTA Buttons */}
          <div
            className="flex flex-wrap gap-4"
            style={{ animation: "fadeInUp 0.8s ease-out 0.4s both" }}
          >
            <Link href="/browse-ailments">
              <Button
                size="lg"
                className="rounded-xl px-8 py-6 text-base font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #059669, #10b981)",
                  color: "white",
                  boxShadow: "0 4px 24px rgba(16,185,129,0.4)",
                }}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Explore Remedies
              </Button>
            </Link>
            <Link href="#ai-assistant">
              <Button
                size="lg"
                className="rounded-xl px-8 py-6 text-base font-semibold transition-all duration-300 hover:scale-105 cursor-pointer"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  color: "white",
                }}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Talk to AI Health Assistant
              </Button>
            </Link>
          </div>

          {/* Stats Row */}
          <div
            className="flex flex-wrap gap-6 pt-6"
            style={{ animation: "fadeInUp 0.8s ease-out 0.5s both" }}
          >
            {[
              { value: "500+", label: "Home Remedies" },
              { value: "50+", label: "Verified Doctors" },
              { value: "10k+", label: "Happy Users" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center px-5 py-3 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.18)",
                }}
              >
                <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-xs font-medium text-emerald-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0,80 C360,120 720,40 1080,80 C1260,100 1380,60 1440,80 L1440,120 L0,120 Z"
            fill="#f0fdf4"
          />
        </svg>
      </div>
    </section>
  )
}
