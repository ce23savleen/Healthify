"use client"

import { useState } from "react"
import Link from "next/link"
import { Bookmark, BookmarkCheck, Clock, Users, ArrowRight, Star } from "lucide-react"

const popularRemedies = [
  {
    id: 1,
    title: "Turmeric Golden Milk",
    image: "/remedy-turmeric-milk.png",
    category: "Immunity",
    rating: 4.8,
    reviews: 342,
    ingredients: ["Turmeric", "Warm Milk", "Black Pepper", "Honey"],
    steps: "Mix turmeric with warm milk, add a pinch of black pepper and honey. Drink before bedtime.",
    benefits: "Anti-inflammatory, boosts immunity, improves sleep quality",
    time: "5 mins",
    ailment: "inflammation",
  },
  {
    id: 2,
    title: "Ginger Honey Lemon Tea",
    image: "/remedy-ginger-honey.png",
    category: "Cough & Cold",
    rating: 4.9,
    reviews: 567,
    ingredients: ["Fresh Ginger", "Honey", "Lemon", "Warm Water"],
    steps: "Brew fresh ginger slices in hot water for 5 mins, add honey and lemon juice.",
    benefits: "Soothes sore throat, relieves congestion, rich in Vitamin C",
    time: "10 mins",
    ailment: "cough",
  },
  {
    id: 3,
    title: "Aloe Vera Skin Treatment",
    image: "/remedy-aloe-vera.png",
    category: "Skin Care",
    rating: 4.7,
    reviews: 289,
    ingredients: ["Fresh Aloe Vera", "Rose Water", "Vitamin E"],
    steps: "Extract fresh aloe vera gel, mix with rose water. Apply on skin for 20 minutes.",
    benefits: "Heals acne, moisturizes skin, reduces inflammation",
    time: "25 mins",
    ailment: "acne",
  },
  {
    id: 4,
    title: "Peppermint Digestive Tea",
    image: "/remedy-peppermint.png",
    category: "Digestion",
    rating: 4.6,
    reviews: 478,
    ingredients: ["Fresh Peppermint Leaves", "Hot Water", "Honey"],
    steps: "Steep fresh peppermint leaves in hot water for 5-7 minutes. Add honey to taste.",
    benefits: "Relieves bloating, eases stomach pain, reduces nausea",
    time: "7 mins",
    ailment: "bloating",
  },
]

export default function PopularRemediesSection() {
  const [bookmarked, setBookmarked] = useState<Set<number>>(new Set())

  const toggleBookmark = (id: number) => {
    setBookmarked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #f0fdf4, #ffffff, #f0fdf4)" }}>
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5C15 5 5 15 5 30s10 25 25 25 25-10 25-25S45 5 30 5zm0 40c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15z' fill='%23059669' fill-opacity='1'/%3E%3C/svg%3E")`,
        backgroundSize: "60px 60px",
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold"
            style={{ background: "#fef3c7", color: "#d97706" }}
          >
            <Star className="w-4 h-4" />
            Most Popular
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight" style={{ color: "#064e3b" }}>
            Popular Home Remedies
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#6b7280" }}>
            Discover the most loved and effective natural remedies from our community
          </p>
        </div>

        {/* Remedies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularRemedies.map((remedy, index) => (
            <div
              key={remedy.id}
              className="group relative rounded-2xl overflow-hidden transition-all duration-500"
              style={{
                background: "rgba(255,255,255,0.8)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.9)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)"
                e.currentTarget.style.boxShadow = "0 20px 50px rgba(5,150,105,0.15)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)"
              }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={remedy.image}
                  alt={remedy.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                {/* Category Badge */}
                <div
                  className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: "rgba(255,255,255,0.9)",
                    backdropFilter: "blur(8px)",
                    color: "#059669",
                  }}
                >
                  {remedy.category}
                </div>

                {/* Bookmark Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    toggleBookmark(remedy.id)
                  }}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
                  style={{
                    background: bookmarked.has(remedy.id) ? "#059669" : "rgba(255,255,255,0.9)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {bookmarked.has(remedy.id) ? (
                    <BookmarkCheck className="w-4 h-4 text-white" />
                  ) : (
                    <Bookmark className="w-4 h-4" style={{ color: "#6b7280" }} />
                  )}
                </button>

                {/* Rating */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full" style={{
                    background: "rgba(0,0,0,0.5)",
                    backdropFilter: "blur(8px)",
                  }}>
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-semibold text-white">{remedy.rating}</span>
                    <span className="text-xs text-white/60">({remedy.reviews})</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 space-y-3">
                <h3 className="text-lg font-bold" style={{ color: "#1f2937" }}>
                  {remedy.title}
                </h3>

                {/* Ingredients */}
                <div className="flex flex-wrap gap-1.5">
                  {remedy.ingredients.slice(0, 3).map((ingredient) => (
                    <span
                      key={ingredient}
                      className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                      style={{ background: "#ecfdf5", color: "#059669" }}
                    >
                      {ingredient}
                    </span>
                  ))}
                  {remedy.ingredients.length > 3 && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium" style={{ background: "#f3f4f6", color: "#6b7280" }}>
                      +{remedy.ingredients.length - 3}
                    </span>
                  )}
                </div>

                {/* Steps Preview */}
                <p className="text-sm leading-relaxed line-clamp-2" style={{ color: "#6b7280" }}>
                  {remedy.steps}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-1 text-xs" style={{ color: "#9ca3af" }}>
                    <Clock className="w-3.5 h-3.5" />
                    <span>{remedy.time}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs" style={{ color: "#9ca3af" }}>
                    <Users className="w-3.5 h-3.5" />
                    <span>{remedy.reviews} tried this</span>
                  </div>
                </div>

                {/* Read More */}
                <Link
                  href={`/ailment/${remedy.ailment}`}
                  className="w-full mt-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 group/btn cursor-pointer"
                  style={{
                    background: "linear-gradient(135deg, #ecfdf5, #d1fae5)",
                    color: "#059669",
                    border: "1px solid #a7f3d020",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "linear-gradient(135deg, #059669, #10b981)"
                    e.currentTarget.style.color = "white"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "linear-gradient(135deg, #ecfdf5, #d1fae5)"
                    e.currentTarget.style.color = "#059669"
                  }}
                >
                  Read More
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/browse-ailments"
            className="px-8 py-4 rounded-2xl text-base font-semibold transition-all duration-300 hover:scale-105 inline-flex items-center gap-2 cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #059669, #10b981)",
              color: "white",
              boxShadow: "0 4px 24px rgba(16,185,129,0.3)",
            }}
          >
            View All Remedies
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
