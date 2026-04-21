import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import AilmentDetails from "@/components/ailment-details"
import DoctorRouteGuard from "@/components/doctor-route-guard"
import mockAilmentsData, { type MockAilment } from "@/data/mockAilmentsData"
import { connectToDatabase } from "@/lib/mongodb"
import AilmentModel from "@/models/Ailment"

interface DbAilmentResult {
  slug?: unknown
  name?: unknown
  description?: unknown
  causes?: unknown
  symptoms?: unknown
  prevention?: unknown
}

function toTitleFromSlug(slug: string): string {
  return slug
    .split("-")
    .filter((segment) => segment.length > 0)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ")
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value.filter((item): item is string => typeof item === "string" && item.trim().length > 0)
}

function mapDbAilmentToMockAilment(dbAilment: DbAilmentResult, fallbackSlug: string): MockAilment {
  const mappedSlug = typeof dbAilment.slug === "string" && dbAilment.slug.trim().length > 0
    ? dbAilment.slug
    : fallbackSlug

  const mappedName = typeof dbAilment.name === "string" && dbAilment.name.trim().length > 0
    ? dbAilment.name
    : toTitleFromSlug(fallbackSlug)

  const mappedDescription = typeof dbAilment.description === "string"
    ? dbAilment.description
    : ""

  return {
    slug: mappedSlug,
    name: mappedName,
    description: mappedDescription,
    causes: toStringArray(dbAilment.causes),
    symptoms: toStringArray(dbAilment.symptoms),
    prevention: toStringArray(dbAilment.prevention),
    remedies: [],
  }
}

export default async function AilmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const normalizedSlug = slug.toLowerCase()

  // Keep static lookup as the first source of truth.
  const staticAilment = mockAilmentsData[normalizedSlug]
  let fallbackAilment: MockAilment | null = null

  if (!staticAilment) {
    try {
      await connectToDatabase()
      const dbAilment = await AilmentModel.findOne({ slug: normalizedSlug }).lean<DbAilmentResult | null>()

      if (dbAilment) {
        fallbackAilment = mapDbAilmentToMockAilment(dbAilment, normalizedSlug)
      }
    } catch (error) {
      console.error("Failed to resolve ailment from database", error)
    }
  }

  return (
    <DoctorRouteGuard>
      <main className="min-h-screen bg-background">
        <Navigation />
        <AilmentDetails slug={normalizedSlug} fallbackAilment={fallbackAilment} />
        <Footer />
      </main>
    </DoctorRouteGuard>
  )
}
