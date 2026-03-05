"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, X } from "lucide-react"

// Sample ailments data
const ailmentsData: Record<string, string[]> = {
  A: ["Acne", "Allergies", "Arthritis", "Asthma", "Anxiety"],
  B: ["Back Pain", "Bronchitis", "Bloating", "Blisters"],
  C: ["Common Cold", "Cough", "Constipation", "Cramps"],
  D: ["Dandruff", "Depression", "Diarrhea", "Dry Skin"],
  E: ["Eczema", "Eye Strain", "Ear Infection"],
  F: ["Fever", "Fatigue", "Fungal Infection"],
  G: ["Gastritis", "Gout"],
  H: ["Headache", "Heartburn", "Hemorrhoids", "High Blood Pressure"],
  I: ["Indigestion", "Insomnia", "Inflammation"],
  J: ["Joint Pain"],
  K: ["Kidney Stones"],
  L: ["Low Energy"],
  M: ["Migraine", "Muscle Pain"],
  N: ["Nausea", "Neck Pain"],
  O: ["Obesity", "Osteoporosis"],
  P: ["Psoriasis", "Pimples", "Poor Digestion"],
  Q: ["Quit Smoking"],
  R: ["Rashes", "Rheumatism"],
  S: ["Sinusitis", "Sore Throat", "Stress", "Skin Irritation"],
  T: ["Thyroid Issues", "Tension Headache"],
  U: ["Ulcers", "Urinary Tract Infection"],
  V: ["Varicose Veins"],
  W: ["Weight Loss", "Wounds"],
  X: ["Xerosis"],
  Y: ["Yeast Infection"],
  Z: ["Zoster"],
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
    return allAilments.filter((ailment) => ailment.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 8)
  }, [searchTerm, allAilments])

  const getFilteredAilments = () => {
    if (!selectedLetter) return []
    let ailments = ailmentsData[selectedLetter] || []

    if (searchTerm) {
      ailments = ailments.filter((ailment) => ailment.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    return ailments
  }

  const filteredAilments = getFilteredAilments()

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setShowSuggestions(value.trim().length > 0)
    setNotFoundMessage("")
  }

  const handleSuggestionClick = (ailment: string) => {
    const letter = ailment.charAt(0).toUpperCase()
    setSelectedLetter(letter)
    setSearchTerm(ailment)
    setShowSuggestions(false)
  }

  const handleSearchSubmit = () => {
    if (searchTerm.trim() && suggestions.length === 0) {
      setNotFoundMessage(`"${searchTerm}" not found in our database`)
      setShowSuggestions(false)
    } else if (suggestions.length > 0) {
      const firstMatch = suggestions[0]
      const letter = firstMatch.charAt(0).toUpperCase()
      setSelectedLetter(letter)
      setShowSuggestions(false)
    }
  }

  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Browse Ailments</h1>
          <p className="text-lg text-muted-foreground">
            Select a letter to explore ailments and discover natural remedies
          </p>
        </div>

        <div className="mb-8 relative">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search ailments..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearchSubmit()}
                className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm("")
                    setShowSuggestions(false)
                    setNotFoundMessage("")
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              )}

              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50">
                  {suggestions.map((ailment) => (
                    <button
                      key={ailment}
                      onClick={() => handleSuggestionClick(ailment)}
                      className="w-full text-left px-4 py-2 hover:bg-muted transition text-foreground first:rounded-t-lg last:rounded-b-lg"
                    >
                      {ailment}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Button onClick={handleSearchSubmit} className="bg-teal-600 hover:bg-teal-700">
              Search
            </Button>
          </div>

          {notFoundMessage && (
            <div className="fixed right-4 top-24 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg z-50 max-w-sm">
              <div className="flex justify-between items-start">
                <p className="font-semibold">{notFoundMessage}</p>
                <button onClick={() => setNotFoundMessage("")} className="text-red-700 hover:text-red-900">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-red-600 mt-1">Please try searching for a different ailment.</p>
            </div>
          )}
        </div>

        {/* Alphabet Grid */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-foreground mb-4">Select a Letter</h2>
          <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-13 gap-2">
            {alphabet.map((letter) => (
              <button
                key={letter}
                onClick={() => {
                  setSelectedLetter(letter)
                  setSearchTerm("")
                  setShowSuggestions(false)
                  setNotFoundMessage("")
                }}
                className={`py-3 px-2 rounded-lg font-semibold transition ${
                  selectedLetter === letter
                    ? "bg-teal-600 text-white"
                    : "bg-card border border-border text-foreground hover:bg-muted"
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {/* Ailments List */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Ailments Column */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>{selectedLetter ? `Ailments starting with ${selectedLetter}` : "Select a letter"}</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedLetter ? (
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {filteredAilments.length > 0 ? (
                      filteredAilments.map((ailment) => (
                        <Link
                          key={ailment}
                          href={`/ailment/${ailment.toLowerCase().replace(/\s+/g, "-")}`}
                          className="block p-3 rounded-lg bg-muted hover:bg-teal-100 transition text-foreground hover:text-teal-700 font-medium"
                        >
                          {ailment}
                        </Link>
                      ))
                    ) : (
                      <p className="text-muted-foreground">No ailments found</p>
                    )}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Select a letter to view ailments</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Details Column */}
          <div className="md:col-span-2">
            {selectedLetter && filteredAilments.length > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>Ailments Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Click on any ailment from the list to view detailed information including causes, symptoms,
                    prevention methods, and community-shared remedies.
                  </p>
                  <div className="space-y-3">
                    {filteredAilments.slice(0, 3).map((ailment) => (
                      <div key={ailment} className="p-4 border border-border rounded-lg">
                        <h3 className="font-semibold text-foreground mb-2">{ailment}</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Explore natural remedies and expert advice for {ailment.toLowerCase()}
                        </p>
                        <Link href={`/ailment/${ailment.toLowerCase().replace(/\s+/g, "-")}`}>
                          <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                            View Details <ChevronRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground py-12">
                    Select a letter and an ailment to view detailed information
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
