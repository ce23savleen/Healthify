import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Users, BookOpen } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Doctor Verified",
    description: "Get access to remedies verified by certified medical professionals, ensuring safety and efficacy.",
    image: "/doctor-consulting-patient.png",
  },
  {
    icon: Users,
    title: "Community Wisdom",
    description: "Share your experiences and learn from others in a trusted community of health-conscious individuals.",
    image: "/people-exercising-together-outdoors.jpg",
  },
  {
    icon: BookOpen,
    title: "Comprehensive Directory",
    description:
      "Browse an extensive A-Z directory of ailments with detailed information on causes, prevention, and treatments.",
    image: "/herbs-and-natural-remedies-on-table.jpg",
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Why Choose Healthyify?</h2>
          <p className="text-lg text-muted-foreground">Everything you need for trusted natural health solutions</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition">
                <div className="h-48 overflow-hidden">
                  <img
                    src={feature.image || "/placeholder.svg"}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-teal-600" />
                    </div>
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
