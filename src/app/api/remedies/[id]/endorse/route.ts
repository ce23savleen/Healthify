import { Types } from "mongoose"
import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import RemedyModel, { type RemedyDocument } from "@/models/Remedy"
import type { EndorseRemedyRequest, RemedyApiError, RemedyRecord } from "@/types/remedy"

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

export async function POST(
  request: Request,
  context: { params: { id: string } }
): Promise<NextResponse<{ remedy: RemedyRecord } | RemedyApiError>> {
  try {
    await connectToDatabase()

    const remedyId = context.params.id
    if (!Types.ObjectId.isValid(remedyId)) {
      return NextResponse.json({ error: "Invalid remedy id" }, { status: 400 })
    }

    const payload = (await request.json()) as Partial<EndorseRemedyRequest>
    const doctorId = payload.doctorId?.trim()

    if (!doctorId) {
      return NextResponse.json({ error: "doctorId is required" }, { status: 400 })
    }

    const updatedRemedy = await RemedyModel.findOneAndUpdate(
      {
        _id: remedyId,
        endorsedBy: { $ne: doctorId },
      },
      {
        $addToSet: { endorsedBy: doctorId },
        $inc: { endorsements: 1 },
      },
      {
        new: true,
      }
    )

    if (updatedRemedy) {
      return NextResponse.json({ remedy: toRemedyRecord(updatedRemedy) }, { status: 200 })
    }

    const existingRemedy = await RemedyModel.findById(remedyId)
    if (!existingRemedy) {
      return NextResponse.json({ error: "Remedy not found" }, { status: 404 })
    }

    if (existingRemedy.endorsedBy.includes(doctorId)) {
      return NextResponse.json({ remedy: toRemedyRecord(existingRemedy) }, { status: 409 })
    }

    return NextResponse.json({ error: "Failed to endorse remedy" }, { status: 500 })
  } catch (error) {
    console.error("POST /api/remedies/[id]/endorse failed", error)
    return NextResponse.json({ error: "Failed to endorse remedy" }, { status: 500 })
  }
}
