import { NextResponse } from "next/server"
import { sanitizeStringArray, slugifyAilmentName } from "@/lib/ailment-utils"
import { connectToDatabase } from "@/lib/mongodb"
import AilmentModel, { type AilmentDocument } from "@/models/Ailment"
import type { AilmentApiError, AilmentApiResponse, AilmentRecord, CreateAilmentRequest } from "@/types/ailment"

function toAilmentRecord(ailment: AilmentDocument): AilmentRecord {
  return {
    id: ailment.id,
    slug: ailment.slug,
    name: ailment.name,
    description: ailment.description,
    causes: ailment.causes,
    symptoms: ailment.symptoms,
    prevention: ailment.prevention,
    createdAt: ailment.createdAt.toISOString(),
    updatedAt: ailment.updatedAt.toISOString(),
  }
}

function validateCreatePayload(payload: Partial<CreateAilmentRequest>, causes: string[], symptoms: string[], prevention: string[]): string[] {
  const issues: string[] = []

  if (!payload.name || payload.name.trim().length === 0) {
    issues.push("Name is required")
  }

  if (!payload.description || payload.description.trim().length === 0) {
    issues.push("Description is required")
  }

  if (causes.length === 0) {
    issues.push("At least one cause is required")
  }

  if (symptoms.length === 0) {
    issues.push("At least one symptom is required")
  }

  if (prevention.length === 0) {
    issues.push("At least one prevention item is required")
  }

  return issues
}

export async function GET(): Promise<NextResponse<AilmentApiResponse | AilmentApiError>> {
  try {
    await connectToDatabase()

    const ailments = await AilmentModel.find({}).sort({ name: 1 })
    return NextResponse.json({ ailments: ailments.map((ailment) => toAilmentRecord(ailment)) }, { status: 200 })
  } catch (error) {
    console.error("GET /api/ailments failed", error)
    return NextResponse.json({ error: "Failed to fetch ailments" }, { status: 500 })
  }
}

export async function POST(request: Request): Promise<NextResponse<{ ailment: AilmentRecord } | AilmentApiError>> {
  try {
    await connectToDatabase()

    const payload = (await request.json()) as Partial<CreateAilmentRequest>

    const name = payload.name?.trim() ?? ""
    const description = payload.description?.trim() ?? ""
    const causes = sanitizeStringArray(Array.isArray(payload.causes) ? payload.causes : [])
    const symptoms = sanitizeStringArray(Array.isArray(payload.symptoms) ? payload.symptoms : [])
    const prevention = sanitizeStringArray(Array.isArray(payload.prevention) ? payload.prevention : [])

    const validationIssues = validateCreatePayload(payload, causes, symptoms, prevention)
    if (validationIssues.length > 0) {
      return NextResponse.json(
        {
          error: "Invalid ailment payload",
          details: validationIssues,
        },
        { status: 400 }
      )
    }

    const slug = slugifyAilmentName(name)
    const existingAilment = await AilmentModel.findOne({ slug })
    if (existingAilment) {
      return NextResponse.json({ error: "An ailment with this name already exists" }, { status: 409 })
    }

    const ailment = await AilmentModel.create({
      name,
      slug,
      description,
      causes,
      symptoms,
      prevention,
    })

    return NextResponse.json({ ailment: toAilmentRecord(ailment) }, { status: 201 })
  } catch (error) {
    console.error("POST /api/ailments failed", error)

    const message = error instanceof Error ? error.message : "Failed to save ailment"
    return NextResponse.json(
      {
        error: "Failed to save ailment",
        details: [message],
      },
      { status: 500 }
    )
  }
}
