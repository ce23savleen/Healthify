import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import CommunityFeed from "@/components/community-feed"
import { connectToDatabase } from "@/lib/mongodb"
import RemedyModel from "@/models/Remedy"
import type { RemedyRecord } from "@/types/remedy"

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

export default async function ExploreCommunityPage() {
  let communityRemedies: RemedyRecord[] = []

  try {
    await connectToDatabase()

    const remedies = await RemedyModel.find()
      .sort({ createdAt: -1 })
      .lean<DbRemedyResult[]>()

    communityRemedies = remedies
      .map((remedy) => mapDbRemedyToRemedyRecord(remedy))
      .filter((remedy) => remedy.title.trim().length > 0)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  } catch (error) {
    console.error("Failed to fetch community remedies", error)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <CommunityFeed initialRemedies={communityRemedies} />
      <Footer />
    </main>
  )
}
