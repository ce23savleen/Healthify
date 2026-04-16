import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import CategoriesSection from "@/components/categories-section"
import PopularRemediesSection from "@/components/popular-remedies-section"
import AIAssistantSection from "@/components/ai-assistant-section"
import TestimonialsSection from "@/components/testimonials-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: "#f0fdf4" }}>
      <Navigation />
      <HeroSection />
      <CategoriesSection />
      <PopularRemediesSection />
      <AIAssistantSection />
      <TestimonialsSection />
      <Footer />
    </main>
  )
}
