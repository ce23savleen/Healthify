import { Schema, model, models, type HydratedDocument, type Model } from "mongoose"

export interface IRemedy {
  ailment: string
  title: string
  description: string
  steps: string[]
  requestDoctorVerification: boolean
  authorId?: string
  authorName: string
  mediaUrl?: string
  endorsements: number
  endorsedBy: string[]
  likes: number
  createdAt: Date
  updatedAt: Date
}

export type RemedyDocument = HydratedDocument<IRemedy>

const remedySchema = new Schema<IRemedy>(
  {
    ailment: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    steps: {
      type: [String],
      required: true,
      default: [],
    },
    requestDoctorVerification: {
      type: Boolean,
      required: true,
      default: false,
      index: true,
    },
    authorId: {
      type: String,
      required: false,
      trim: true,
    },
    authorName: {
      type: String,
      required: true,
      trim: true,
      default: "Anonymous",
    },
    mediaUrl: {
      type: String,
      required: false,
      trim: true,
    },
    endorsements: {
      type: Number,
      required: true,
      default: 0,
    },
    endorsedBy: {
      type: [String],
      required: true,
      default: [],
    },
    likes: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const RemedyModel = (models.Remedy as Model<IRemedy>) || model<IRemedy>("Remedy", remedySchema)

export default RemedyModel
