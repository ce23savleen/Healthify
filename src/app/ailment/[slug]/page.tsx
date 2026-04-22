import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import AilmentDetails from "@/components/ailment-details"
import DoctorRouteGuard from "@/components/doctor-route-guard"
import mockAilmentsData, { type MockAilment } from "@/data/mockAilmentsData"
import { connectToDatabase } from "@/lib/mongodb"
import AilmentModel from "@/models/Ailment"
import RemedyModel from "@/models/Remedy"
import type { RemedyRecord } from "@/types/remedy"

interface DbAilmentResult {
  slug?: unknown
  name?: unknown
  description?: unknown
  causes?: unknown
  symptoms?: unknown
  prevention?: unknown
}

interface DbRemedyResult {
  _id?: unknown
  ailment?: unknown
  title?: unknown
  description?: unknown
  steps?: unknown
  requestDoctorVerification?: unknown
  authorId?: unknown
  authorName?: unknown
  mediaUrl?: unknown
  endorsements?: unknown
  endorsedBy?: unknown
  likes?: unknown
  createdAt?: unknown
  updatedAt?: unknown
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

function toBoolean(value: unknown): boolean {
  return typeof value === "boolean" ? value : false
}

function toNumber(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0
}

function toOptionalString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value : undefined
}

function toIsoString(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString()
  }

  if (typeof value === "string") {
    const parsed = new Date(value)
    if (!Number.isNaN(parsed.getTime())) {
      return parsed.toISOString()
    }
  }

  return new Date(0).toISOString()
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function mapDbRemedyToRemedyRecord(remedy: DbRemedyResult): RemedyRecord {
  const id = typeof remedy._id === "string"
    ? remedy._id
    : remedy._id && typeof remedy._id === "object" && "toString" in remedy._id
      ? String(remedy._id)
      : ""

  return {
    id,
    ailment: typeof remedy.ailment === "string" ? remedy.ailment : "",
    title: typeof remedy.title === "string" ? remedy.title : "",
    description: typeof remedy.description === "string" ? remedy.description : "",
    steps: toStringArray(remedy.steps),
    requestDoctorVerification: toBoolean(remedy.requestDoctorVerification),
    authorId: toOptionalString(remedy.authorId),
    authorName: typeof remedy.authorName === "string" && remedy.authorName.trim().length > 0
      ? remedy.authorName
      : "Anonymous",
    mediaUrl: toOptionalString(remedy.mediaUrl),
    endorsements: toNumber(remedy.endorsements),
    endorsedBy: toStringArray(remedy.endorsedBy),
    likes: toNumber(remedy.likes),
    createdAt: toIsoString(remedy.createdAt),
    updatedAt: toIsoString(remedy.updatedAt),
  }
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
  let recommendedRemedies: RemedyRecord[] = []

  try {
    await connectToDatabase()

    if (!staticAilment) {
      const dbAilment = await AilmentModel.findOne({ slug: normalizedSlug }).lean<DbAilmentResult | null>()

      if (dbAilment) {
        fallbackAilment = mapDbAilmentToMockAilment(dbAilment, normalizedSlug)
      }
    }

    const ailmentName = staticAilment?.name || fallbackAilment?.name || toTitleFromSlug(normalizedSlug)
    const escapedSlug = escapeRegex(normalizedSlug)
    const escapedAilmentName = escapeRegex(ailmentName)

    const remedies = await RemedyModel.find({
      $and: [
        {
          $or: [
            { ailment: { $regex: `^${escapedSlug}$`, $options: "i" } },
            { ailment: { $regex: `^${escapedAilmentName}$`, $options: "i" } },
          ],
        },
        { endorsements: { $gt: 0 } },
      ],
    })
      .sort({ endorsements: -1 })
      .lean<DbRemedyResult[]>()

    const mappedRemedies = remedies
      .map((remedy) => mapDbRemedyToRemedyRecord(remedy))
      .filter((remedy) => remedy.title.trim().length > 0)

    recommendedRemedies = mappedRemedies
      .filter((remedy) => remedy.endorsements > 0)
      .sort((a, b) => b.endorsements - a.endorsements)
  } catch (error) {
    console.error("Failed to resolve ailment/remedies from database", error)
  }

  return (
    <DoctorRouteGuard>
      <main className="min-h-screen bg-background">
        <Navigation />
        <AilmentDetails
          slug={normalizedSlug}
          fallbackAilment={fallbackAilment}
          recommendedRemedies={recommendedRemedies}
          useDatabaseRemedies
        />
        <Footer />
      </main>
    </DoctorRouteGuard>
  )
}
