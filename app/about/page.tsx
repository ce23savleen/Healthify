import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">About Healthyify</h1>
            <p className="text-lg text-muted-foreground">
              Bridging traditional wisdom with modern healthcare through community-driven natural remedies
            </p>
          </div>

          {/* Mission Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground leading-relaxed">
                Healthyify is dedicated to empowering individuals to take control of their health through trusted
                natural remedies and expert guidance. We believe that the best healthcare combines the wisdom of
                traditional medicine with modern scientific validation.
              </p>
              <p className="text-foreground leading-relaxed">
                Our platform connects users with verified natural health solutions, experienced practitioners, and a
                supportive community of health-conscious individuals all working towards better wellness.
              </p>
            </CardContent>
          </Card>

          {/* Values Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Our Core Values</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Trust & Verification",
                  description:
                    "All remedies are verified by certified medical professionals to ensure safety and efficacy.",
                },
                {
                  title: "Community Wisdom",
                  description:
                    "We celebrate the collective knowledge of our community while maintaining scientific rigor.",
                },
                {
                  title: "Accessibility",
                  description:
                    "Natural health solutions should be accessible to everyone, regardless of background or location.",
                },
                {
                  title: "Holistic Health",
                  description:
                    "We promote comprehensive wellness that addresses physical, mental, and emotional health.",
                },
              ].map((value, idx) => (
                <Card key={idx}>
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <CheckCircle2 className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-foreground mb-2">{value.title}</h3>
                        <p className="text-muted-foreground">{value.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Why Choose Us */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Why Choose Healthyify?</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[
                  "Doctor-verified remedies from certified natural medicine practitioners",
                  "Comprehensive A-Z directory of ailments with detailed information",
                  "Active community sharing real experiences and proven solutions",
                  "Direct consultation with qualified doctors and specialists",
                  "Personalized dashboards to track your health journey",
                  "PDF downloads of remedy collections for offline access",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  )
}
