"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Search, X, ArrowRight, Sparkles, Filter } from "lucide-react"

// Ailments data with descriptions, icons, and image URLs
const ailmentsData: Record<string, Array<{ name: string; description: string; icon: string; image: string; remedyCount: number }>> = {
  A: [
    { name: "Acne", description: "Skin condition with pimples, blackheads, and whiteheads on face and body", icon: "🧴", image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b8?w=400&h=300&fit=crop", remedyCount: 12 },
    { name: "Allergies", description: "Immune system reactions to substances like pollen, dust, or certain foods", icon: "🤧", image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=400&h=300&fit=crop", remedyCount: 9 },
    { name: "Arthritis", description: "Joint inflammation causing pain, swelling, and stiffness in joints", icon: "🦴", image: "https://images.unsplash.com/photo-1559757175-7cb057fba93c?w=400&h=300&fit=crop", remedyCount: 8 },
    { name: "Asthma", description: "Chronic respiratory condition with breathing difficulty and wheezing", icon: "🫁", image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=300&fit=crop", remedyCount: 7 },
    { name: "Anxiety", description: "Mental health condition with excessive worry, nervousness, and restlessness", icon: "😰", image: "https://images.unsplash.com/photo-1541199249251-f713e6145474?w=400&h=300&fit=crop", remedyCount: 11 },
  ],
  B: [
    { name: "Back Pain", description: "Pain in the lower or upper back caused by muscle strain or poor posture", icon: "🔙", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop", remedyCount: 10 },
    { name: "Bronchitis", description: "Inflammation of bronchial tubes causing cough and mucus production", icon: "🫁", image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=400&h=300&fit=crop", remedyCount: 6 },
    { name: "Bloating", description: "Abdominal fullness and swelling often caused by gas or digestive issues", icon: "🫃", image: "https://images.unsplash.com/photo-1505576399279-0d754167860f?w=400&h=300&fit=crop", remedyCount: 8 },
    { name: "Blisters", description: "Fluid-filled skin bumps caused by friction, burns, or infections", icon: "🩹", image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=300&fit=crop", remedyCount: 5 },
  ],
  C: [
    { name: "Common Cold", description: "Viral infection of the nose and throat with sneezing and congestion", icon: "🤒", image: "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=400&h=300&fit=crop", remedyCount: 15 },
    { name: "Cough", description: "Reflex action to clear airways, can be dry or with mucus production", icon: "😷", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop", remedyCount: 14 },
    { name: "Constipation", description: "Difficulty passing stools due to hard, dry bowel movements", icon: "😣", image: "https://images.unsplash.com/photo-1505576399279-0d754167860f?w=400&h=300&fit=crop", remedyCount: 9 },
    { name: "Cramps", description: "Sudden muscle contractions causing sharp pain, often in legs or abdomen", icon: "💪", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop", remedyCount: 7 },
  ],
  D: [
    { name: "Dandruff", description: "Flaky, itchy scalp condition caused by dry skin or fungal growth", icon: "💇", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop", remedyCount: 11 },
    { name: "Depression", description: "Mental health disorder with persistent sadness and loss of interest", icon: "😔", image: "https://images.unsplash.com/photo-1541199249251-f713e6145474?w=400&h=300&fit=crop", remedyCount: 8 },
    { name: "Diarrhea", description: "Frequent loose, watery stools often caused by infection or food", icon: "🤢", image: "https://images.unsplash.com/photo-1505576399279-0d754167860f?w=400&h=300&fit=crop", remedyCount: 10 },
    { name: "Dry Skin", description: "Rough, flaky skin lacking moisture, often worse in cold weather", icon: "🧴", image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b8?w=400&h=300&fit=crop", remedyCount: 9 },
  ],
  E: [
    { name: "Eczema", description: "Chronic skin condition with red, itchy, inflamed patches on skin", icon: "🔴", image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b8?w=400&h=300&fit=crop", remedyCount: 7 },
    { name: "Eye Strain", description: "Eye fatigue from prolonged screen use causing headaches and blurred vision", icon: "👁️", image: "https://images.unsplash.com/photo-1494869042583-f6c911f04b4c?w=400&h=300&fit=crop", remedyCount: 6 },
    { name: "Ear Infection", description: "Bacterial or viral infection in the ear causing pain and hearing issues", icon: "👂", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop", remedyCount: 5 },
  ],
  F: [
    { name: "Fever", description: "Elevated body temperature, often a sign of infection or illness", icon: "🌡️", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop", remedyCount: 12 },
    { name: "Fatigue", description: "Extreme tiredness and lack of energy affecting daily activities", icon: "😴", image: "https://images.unsplash.com/photo-1541199249251-f713e6145474?w=400&h=300&fit=crop", remedyCount: 8 },
    { name: "Fungal Infection", description: "Skin infection caused by fungi, leading to itching and redness", icon: "🦠", image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=300&fit=crop", remedyCount: 6 },
  ],
  G: [
    { name: "Gastritis", description: "Inflammation of stomach lining causing pain, nausea, and bloating", icon: "🏥", image: "https://images.unsplash.com/photo-1505576399279-0d754167860f?w=400&h=300&fit=crop", remedyCount: 7 },
    { name: "Gout", description: "Arthritis form causing sudden, severe joint pain from uric acid buildup", icon: "🦶", image: "https://images.unsplash.com/photo-1559757175-7cb057fba93c?w=400&h=300&fit=crop", remedyCount: 5 },
  ],
  H: [
    { name: "Headache", description: "Pain in any region of the head, from mild to severe intensity", icon: "🤕", image: "https://images.unsplash.com/photo-1541199249251-f713e6145474?w=400&h=300&fit=crop", remedyCount: 13 },
    { name: "Heartburn", description: "Burning sensation in chest caused by acid reflux from the stomach", icon: "🔥", image: "https://images.unsplash.com/photo-1505576399279-0d754167860f?w=400&h=300&fit=crop", remedyCount: 9 },
    { name: "Hemorrhoids", description: "Swollen blood vessels in the rectal area causing discomfort", icon: "💊", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop", remedyCount: 6 },
    { name: "High Blood Pressure", description: "Elevated blood pressure increasing risk of heart disease and stroke", icon: "❤️", image: "https://images.unsplash.com/photo-1559757175-7cb057fba93c?w=400&h=300&fit=crop", remedyCount: 10 },
  ],
  I: [
    { name: "Indigestion", description: "Discomfort in the upper abdomen after eating, with bloating and nausea", icon: "🍽️", image: "https://images.unsplash.com/photo-1505576399279-0d754167860f?w=400&h=300&fit=crop", remedyCount: 11 },
    { name: "Insomnia", description: "Difficulty falling or staying asleep, affecting daily functioning", icon: "🌙", image: "https://images.unsplash.com/photo-1541199249251-f713e6145474?w=400&h=300&fit=crop", remedyCount: 9 },
    { name: "Inflammation", description: "Body's response to injury or infection causing redness, swelling, and pain", icon: "🔴", image: "https://images.unsplash.com/photo-1559757175-7cb057fba93c?w=400&h=300&fit=crop", remedyCount: 8 },
  ],
  J: [
    { name: "Joint Pain", description: "Pain in body joints caused by injury, arthritis, or overuse", icon: "🦴", image: "https://images.unsplash.com/photo-1559757175-7cb057fba93c?w=400&h=300&fit=crop", remedyCount: 10 },
  ],
  K: [
    { name: "Kidney Stones", description: "Hard mineral deposits forming in kidneys causing severe pain", icon: "💎", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop", remedyCount: 6 },
  ],
  L: [
    { name: "Low Energy", description: "Persistent tiredness and reduced vitality affecting daily performance", icon: "🔋", image: "https://images.unsplash.com/photo-1541199249251-f713e6145474?w=400&h=300&fit=crop", remedyCount: 8 },
  ],
  M: [
    { name: "Migraine", description: "Intense headache with throbbing pain, nausea, and light sensitivity", icon: "🤯", image: "https://images.unsplash.com/photo-1541199249251-f713e6145474?w=400&h=300&fit=crop", remedyCount: 9 },
    { name: "Muscle Pain", description: "Soreness in muscles from overexertion, injury, or tension", icon: "💪", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop", remedyCount: 8 },
  ],
  N: [
    { name: "Nausea", description: "Sensation of wanting to vomit, often caused by motion or illness", icon: "🤮", image: "https://images.unsplash.com/photo-1505576399279-0d754167860f?w=400&h=300&fit=crop", remedyCount: 7 },
    { name: "Neck Pain", description: "Stiffness and pain in the neck from poor posture or muscle strain", icon: "🦴", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop", remedyCount: 6 },
  ],
  O: [
    { name: "Obesity", description: "Excess body weight increasing risk of diabetes and heart disease", icon: "⚖️", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop", remedyCount: 8 },
    { name: "Osteoporosis", description: "Weak and brittle bones increasing the risk of fractures", icon: "🦴", image: "https://images.unsplash.com/photo-1559757175-7cb057fba93c?w=400&h=300&fit=crop", remedyCount: 5 },
  ],
  P: [
    { name: "Psoriasis", description: "Autoimmune skin condition with thick, scaly patches on the skin", icon: "🔴", image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b8?w=400&h=300&fit=crop", remedyCount: 6 },
    { name: "Pimples", description: "Inflamed spots on the skin caused by clogged pores and bacteria", icon: "🧴", image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b8?w=400&h=300&fit=crop", remedyCount: 10 },
    { name: "Poor Digestion", description: "Slow or inefficient breakdown of food causing discomfort", icon: "🍽️", image: "https://images.unsplash.com/photo-1505576399279-0d754167860f?w=400&h=300&fit=crop", remedyCount: 9 },
  ],
  Q: [
    { name: "Quit Smoking", description: "Process of stopping tobacco use and managing withdrawal symptoms", icon: "🚭", image: "https://images.unsplash.com/photo-1541199249251-f713e6145474?w=400&h=300&fit=crop", remedyCount: 5 },
  ],
  R: [
    { name: "Rashes", description: "Skin irritation causing redness, itching, and bumps on the skin", icon: "🔴", image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=300&fit=crop", remedyCount: 7 },
    { name: "Rheumatism", description: "Conditions affecting joints and connective tissue causing pain", icon: "🦴", image: "https://images.unsplash.com/photo-1559757175-7cb057fba93c?w=400&h=300&fit=crop", remedyCount: 6 },
  ],
  S: [
    { name: "Sinusitis", description: "Inflammation of sinuses causing nasal congestion and facial pain", icon: "👃", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop", remedyCount: 8 },
    { name: "Sore Throat", description: "Pain and irritation in the throat, often from infection or dryness", icon: "🤒", image: "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=400&h=300&fit=crop", remedyCount: 12 },
    { name: "Stress", description: "Physical and emotional tension from demanding situations", icon: "😫", image: "https://images.unsplash.com/photo-1541199249251-f713e6145474?w=400&h=300&fit=crop", remedyCount: 11 },
    { name: "Skin Irritation", description: "Itching, redness, or swelling of the skin from various causes", icon: "🧴", image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b8?w=400&h=300&fit=crop", remedyCount: 7 },
  ],
  T: [
    { name: "Thyroid Issues", description: "Hormonal imbalance from overactive or underactive thyroid gland", icon: "🦋", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop", remedyCount: 6 },
    { name: "Tension Headache", description: "Mild to moderate head pain from stress or muscle tension", icon: "🤕", image: "https://images.unsplash.com/photo-1541199249251-f713e6145474?w=400&h=300&fit=crop", remedyCount: 8 },
  ],
  U: [
    { name: "Ulcers", description: "Open sores on the stomach lining or intestines causing pain", icon: "🔴", image: "https://images.unsplash.com/photo-1505576399279-0d754167860f?w=400&h=300&fit=crop", remedyCount: 5 },
    { name: "Urinary Tract Infection", description: "Bacterial infection in the urinary system causing burning sensation", icon: "🏥", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop", remedyCount: 7 },
  ],
  V: [
    { name: "Varicose Veins", description: "Enlarged, twisted veins usually in the legs causing discomfort", icon: "🦵", image: "https://images.unsplash.com/photo-1559757175-7cb057fba93c?w=400&h=300&fit=crop", remedyCount: 5 },
  ],
  W: [
    { name: "Weight Loss", description: "Healthy approaches to reduce body weight through diet and exercise", icon: "⚖️", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop", remedyCount: 10 },
    { name: "Wounds", description: "Skin injuries, cuts, or scrapes that need natural healing remedies", icon: "🩹", image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=300&fit=crop", remedyCount: 6 },
  ],
  X: [
    { name: "Xerosis", description: "Abnormally dry skin caused by lack of moisture in the outer skin layer", icon: "🧴", image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b8?w=400&h=300&fit=crop", remedyCount: 4 },
  ],
  Y: [
    { name: "Yeast Infection", description: "Fungal infection caused by Candida, commonly affecting skin and mouth", icon: "🦠", image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=300&fit=crop", remedyCount: 5 },
  ],
  Z: [
    { name: "Zoster", description: "Shingles - painful rash caused by reactivation of varicella-zoster virus", icon: "🔴", image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=300&fit=crop", remedyCount: 4 },
  ],
}

export default function AilmentBrowser() {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [notFoundMessage, setNotFoundMessage] = useState("")

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

  const allAilments = useMemo(() => {
    return Object.values(ailmentsData).flat()
  }, [])

  const suggestions = useMemo(() => {
    if (!searchTerm.trim()) return []
    return allAilments
      .filter((a) => a.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .slice(0, 8)
  }, [searchTerm, allAilments])

  const getDisplayAilments = () => {
    if (searchTerm.trim()) {
      return allAilments.filter((a) => a.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }
    if (selectedLetter) {
      return ailmentsData[selectedLetter] || []
    }
    // Show all ailments by default
    return allAilments
  }

  const displayAilments = getDisplayAilments()

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setShowSuggestions(value.trim().length > 0)
    setNotFoundMessage("")
    if (value.trim()) setSelectedLetter(null)
  }

  const handleSuggestionClick = (ailment: typeof allAilments[0]) => {
    setSearchTerm(ailment.name)
    setShowSuggestions(false)
  }

  const handleSearchSubmit = () => {
    if (searchTerm.trim() && suggestions.length === 0) {
      setNotFoundMessage(`"${searchTerm}" not found in our database`)
      setShowSuggestions(false)
    } else if (suggestions.length > 0) {
      setShowSuggestions(false)
    }
  }

  const totalAilments = allAilments.length
  const letterCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    Object.entries(ailmentsData).forEach(([letter, items]) => {
      counts[letter] = items.length
    })
    return counts
  }, [])

  return (
    <section className="relative overflow-hidden" style={{ background: "#f0fdf4" }}>
      {/* Hero Banner */}
      <div
        className="relative py-20 text-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #064e3b 0%, #065f46 30%, #047857 60%, #059669 100%)",
        }}
      >
        {/* Decorative circles */}
        <div className="absolute top-10 right-20 w-40 h-40 rounded-full opacity-10 blur-3xl" style={{ background: "#6ee7b7" }} />
        <div className="absolute bottom-10 left-20 w-56 h-56 rounded-full opacity-10 blur-3xl" style={{ background: "#a7f3d0" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-5 blur-3xl" style={{ background: "white" }} />

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
            style={{
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(8px)",
              color: "#a7f3d0",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <Filter className="w-4 h-4" />
            {totalAilments} Ailments Available
          </div>

          <h1
            className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight"
            style={{ animation: "fadeInUp 0.6s ease-out" }}
          >
            Browse{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #6ee7b7, #34d399)" }}>
              Ailments
            </span>
          </h1>
          <p className="text-lg text-emerald-200/80 max-w-2xl mx-auto mb-8">
            Explore ailments from A to Z and discover natural remedies backed by traditional wisdom
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <div
              className="flex items-center gap-2 px-5 py-3 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <Search className="w-5 h-5 text-emerald-300" />
              <input
                type="text"
                placeholder="Search ailments... (e.g., headache, cold, acne)"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
                className="flex-1 bg-transparent text-white placeholder-emerald-200/50 outline-none text-sm"
              />
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm("")
                    setShowSuggestions(false)
                    setNotFoundMessage("")
                  }}
                  className="text-emerald-300/60 hover:text-white transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Search Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <div
                className="absolute top-full left-0 right-0 mt-2 rounded-xl overflow-hidden z-50"
                style={{
                  background: "white",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
                }}
              >
                {suggestions.map((ailment) => (
                  <button
                    key={ailment.name}
                    onClick={() => handleSuggestionClick(ailment)}
                    className="w-full flex items-center gap-3 px-4 py-3 transition cursor-pointer"
                    style={{ color: "#374151" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#ecfdf5" }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "white" }}
                  >
                    <span className="text-lg">{ailment.icon}</span>
                    <div className="text-left">
                      <span className="text-sm font-medium">{ailment.name}</span>
                      <p className="text-xs text-gray-400 line-clamp-1">{ailment.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Compact Alphabet Strip */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            <button
              onClick={() => {
                setSelectedLetter(null)
                setSearchTerm("")
                setShowSuggestions(false)
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 cursor-pointer"
              style={{
                background: !selectedLetter ? "linear-gradient(135deg, #059669, #10b981)" : "white",
                color: !selectedLetter ? "white" : "#6b7280",
                border: !selectedLetter ? "none" : "1px solid #e5e7eb",
                boxShadow: !selectedLetter ? "0 2px 8px rgba(5,150,105,0.3)" : "none",
              }}
            >
              All
            </button>
            {alphabet.map((letter) => {
              const count = letterCounts[letter] || 0
              const isActive = selectedLetter === letter
              return (
                <button
                  key={letter}
                  onClick={() => {
                    setSelectedLetter(letter)
                    setSearchTerm("")
                    setShowSuggestions(false)
                    setNotFoundMessage("")
                  }}
                  className="w-8 h-8 rounded-lg text-xs font-bold transition-all duration-300 cursor-pointer relative"
                  style={{
                    background: isActive ? "linear-gradient(135deg, #059669, #10b981)" : "white",
                    color: isActive ? "white" : count > 0 ? "#374151" : "#d1d5db",
                    border: isActive ? "none" : "1px solid #e5e7eb",
                    boxShadow: isActive ? "0 2px 8px rgba(5,150,105,0.3)" : "0 1px 2px rgba(0,0,0,0.04)",
                    transform: isActive ? "scale(1.1)" : "scale(1)",
                  }}
                  title={`${letter} - ${count} ailment${count !== 1 ? "s" : ""}`}
                >
                  {letter}
                  {count > 0 && !isActive && (
                    <span
                      className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full text-[8px] font-bold flex items-center justify-center"
                      style={{ background: "#059669", color: "white" }}
                    >
                      {count}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Section Title */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold" style={{ color: "#064e3b" }}>
              {searchTerm
                ? `Search results for "${searchTerm}"`
                : selectedLetter
                ? `Ailments starting with "${selectedLetter}"`
                : "All Ailments"}
            </h2>
            <p className="text-sm mt-1" style={{ color: "#6b7280" }}>
              {displayAilments.length} ailment{displayAilments.length !== 1 ? "s" : ""} found
            </p>
          </div>
        </div>

        {/* Not Found Message */}
        {notFoundMessage && (
          <div
            className="mb-6 p-4 rounded-xl flex items-center justify-between"
            style={{ background: "#fef2f2", border: "1px solid #fecaca" }}
          >
            <p className="text-sm font-medium" style={{ color: "#dc2626" }}>{notFoundMessage}</p>
            <button onClick={() => setNotFoundMessage("")} className="cursor-pointer">
              <X className="w-4 h-4" style={{ color: "#dc2626" }} />
            </button>
          </div>
        )}

        {/* Ailments Grid */}
        {displayAilments.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {displayAilments.map((ailment) => (
              <Link
                key={ailment.name}
                href={`/ailment/${ailment.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="group block"
              >
                <div
                  className="rounded-2xl overflow-hidden transition-all duration-500"
                  style={{
                    background: "white",
                    border: "1px solid rgba(209,250,229,0.6)",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)"
                    e.currentTarget.style.boxShadow = "0 20px 40px rgba(5,150,105,0.12)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)"
                    e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"
                  }}
                >
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={ailment.image}
                      alt={ailment.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                    {/* Icon Badge */}
                    <div
                      className="absolute top-3 left-3 w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                      style={{
                        background: "rgba(255,255,255,0.9)",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      {ailment.icon}
                    </div>

                    {/* Remedy Count Badge */}
                    <div
                      className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold"
                      style={{
                        background: "rgba(5,150,105,0.85)",
                        color: "white",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      {ailment.remedyCount} remedies
                    </div>

                    {/* Name overlay on image */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-lg font-bold text-white drop-shadow-md">
                        {ailment.name}
                      </h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-3">
                    <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "#6b7280" }}>
                      {ailment.description}
                    </p>

                    {/* View Details CTA */}
                    <div
                      className="flex items-center justify-between pt-2"
                      style={{ borderTop: "1px solid #f3f4f6" }}
                    >
                      <span
                        className="text-xs font-semibold flex items-center gap-1 transition-all duration-300 group-hover:gap-2"
                        style={{ color: "#059669" }}
                      >
                        View Remedies
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                      <div className="flex items-center gap-1">
                        <Sparkles className="w-3 h-3" style={{ color: "#f59e0b" }} />
                        <span className="text-[10px] font-medium" style={{ color: "#9ca3af" }}>
                          Natural cures
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div
            className="text-center py-20 rounded-2xl"
            style={{
              background: "white",
              border: "1px solid #e5e7eb",
            }}
          >
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: "#374151" }}>
              No ailments found
            </h3>
            <p className="text-sm" style={{ color: "#9ca3af" }}>
              Try searching for a different ailment or select another letter
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
