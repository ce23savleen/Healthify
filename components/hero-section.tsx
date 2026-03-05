import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-teal-50 to-blue-50 py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
              Discover Trusted Natural <span className="text-teal-600">Health Remedies</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Join a community where expert knowledge meets traditional wisdom. Share, discover, and verify natural
              health remedies with doctor-approved insights.
            </p>
            <div className="flex gap-4">
              <Link href="/browse-ailments">
                <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
                  Browse Ailments →
                </Button>
              </Link>
              <Link href="/explore-community">
                <Button size="lg" variant="outline">
                  Explore Community
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-96 rounded-lg overflow-hidden">
            <img
              src="/herbal-tea-with-flowers-and-herbs.jpg"
              alt="Herbal tea with natural remedies"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
