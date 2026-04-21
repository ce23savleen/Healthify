import { NextResponse } from "next/server"
import { sanitizeStringArray } from "@/lib/ailment-utils"
import { connectToDatabase } from "@/lib/mongodb"
import RemedyModel, { type RemedyDocument } from "@/models/Remedy"
import type { CreateRemedyRequest, RemedyApiError, RemedyRecord, RemediesApiResponse } from "@/types/remedy"

function toRemedyRecord(remedy: RemedyDocument): RemedyRecord {
  return {
    id: remedy.id,
    ailment: remedy.ailment,
    title: remedy.title,
    description: remedy.description,
    steps: remedy.steps,
    requestDoctorVerification: remedy.requestDoctorVerification,
    authorId: remedy.authorId,
    authorName: remedy.authorName,
    mediaUrl: remedy.mediaUrl,
    endorsements: remedy.endorsements,
    endorsedBy: remedy.endorsedBy,
    likes: remedy.likes,
    createdAt: remedy.createdAt.toISOString(),
    updatedAt: remedy.updatedAt.toISOString(),
  }
}

function validateCreatePayload(payload: Partial<CreateRemedyRequest>, steps: string[]): string[] {
  const issues: string[] = []

  if (!payload.ailment || payload.ailment.trim().length === 0) {
    issues.push("Ailment is required")
  }

  if (!payload.title || payload.title.trim().length === 0) {
    issues.push("Title is required")
  }

  if (!payload.description || payload.description.trim().length === 0) {
    issues.push("Description is required")
  }

  if (steps.length === 0) {
    issues.push("At least one step is required")
  }

  if (typeof payload.requestDoctorVerification !== "boolean") {
    issues.push("requestDoctorVerification must be a boolean")
  }

  return issues
}

export async function GET(request: Request): Promise<NextResponse<RemediesApiResponse | RemedyApiError>> {
  try {
    await connectToDatabase()

    const url = new URL(request.url)
    const verificationRequested = url.searchParams.get("verificationRequested")

    const query: { requestDoctorVerification?: boolean } = {}
    if (verificationRequested === "true") {
      query.requestDoctorVerification = true
    }

    const remedies = await RemedyModel.find(query).sort({ createdAt: -1 })

    return NextResponse.json({ remedies: remedies.map((remedy) => toRemedyRecord(remedy)) }, { status: 200 })
  } catch (error) {
    console.error("GET /api/remedies failed", error)
    return NextResponse.json({ error: "Failed to fetch remedies" }, { status: 500 })
  }
}

export async function POST(request: Request): Promise<NextResponse<{ remedy: RemedyRecord } | RemedyApiError>> {
  try {
    await connectToDatabase()

    const payload = (await request.json()) as Partial<CreateRemedyRequest>
    const steps = sanitizeStringArray(Array.isArray(payload.steps) ? payload.steps : [])
    const validationIssues = validateCreatePayload(payload, steps)

    if (validationIssues.length > 0) {
      return NextResponse.json(
        {
          error: "Invalid remedy payload",
          details: validationIssues,
        },
        { status: 400 }
      )
    }

    const remedy = await RemedyModel.create({
      ailment: payload.ailment?.trim(),
      title: payload.title?.trim(),
      description: payload.description?.trim(),
      steps,
      requestDoctorVerification: payload.requestDoctorVerification,
      authorId: payload.authorId?.trim() || undefined,
      authorName: payload.authorName?.trim() || "Anonymous",
      mediaUrl: payload.mediaUrl?.trim() || undefined,
    })

    return NextResponse.json({ remedy: toRemedyRecord(remedy) }, { status: 201 })
  } catch (error) {
    console.error("POST /api/remedies failed", error)
    return NextResponse.json({ error: "Failed to save remedy" }, { status: 500 })
  }
}
